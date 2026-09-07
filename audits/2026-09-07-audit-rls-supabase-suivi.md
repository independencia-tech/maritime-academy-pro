# Audit RLS Supabase — suivi de l'audit du 2026-08-01

Date : 2026-09-07
Portée : projet Supabase actuel (`tygbbjfhvgowgdtgfgaw`, "maritime-academy-pro-prod")
Fait suite à `audits/2026-08-01-audit-rls-supabase.md` — dont plusieurs constats sont aujourd'hui obsolètes (le projet a changé deux fois depuis).

## Méthode

Contrairement à l'audit du 08-01 (limité à des sondes REST en lecture seule faute d'accès direct), cette reprise dispose de :
- `npx supabase db advisors --linked` (linter sécurité officiel Supabase)
- `npx supabase db query --linked -f <fichier.sql>` avec `SET ROLE postgres` pour interroger directement `pg_catalog`/`information_schema` (lecture seule, aucune écriture)
- `npx supabase projects list` pour vérifier l'état réel des anciens projets côté compte

Toutes les requêtes exécutées sont des `SELECT` sur les catalogues système — aucune donnée applicative n'a été lue, modifiée ou supprimée.

## 1. Suivi des points de l'audit 08-01

| Point (08-01) | État vérifié aujourd'hui |
|---|---|
| Projet abandonné `awtxugfakdarzvgwxwvw` toujours actif | **Résolu.** Supprimé le 2026-08-01 (même jour que l'audit), confirmé par le message du commit `6769a3e` : *"Replaces: awtxugfakdarzvgwxwvw (deleted 2026-08-01, test users only)"*. |
| Projet "actuel" de l'époque `rcbrixqpvvhgmtfbdrxp` | **Également abandonné depuis, et confirmé supprimé aujourd'hui.** L'app a basculé vers un 3ᵉ projet dès le 2026-08-02 (commit `90b1895`). `npx supabase projects list` confirme que seuls deux projets existent encore sur le compte : le projet actuel (`tygbbjfhvgowgdtgfgaw`) et un projet sans rapport (`paxflow-prod`) — `rcbrixqpvvhgmtfbdrxp` n'existe plus du tout. |
| `.env` à purger de l'historique git | **Non applicable / déjà safe.** `.env` n'apparaît dans aucun commit de l'historique (`git log --all -- .env` vide), et aucune clé/URL de l'ancien projet `awtxugfakdarzvgwxwvw` ou `rcbrixqpvvhgmtfbdrxp` n'a été trouvée committée nulle part (`git log --all -S "<ref>"` ne remonte que des mentions dans des commentaires de migration, jamais la clé elle-même). |
| `user_profiles`/`user_progress` inexistantes sur le projet actuel | **Obsolète.** Les deux tables existent depuis la migration `20260802000000_recreate_schema_new_project.sql`. Voir section 2 pour leur état RLS réel. |
| `MAP_ADMIN_2024` codé en dur côté client | **Non re-vérifié dans cette passe** — hors périmètre RLS strict, à reprendre séparément si besoin. |

## 2. État RLS actuel — les 6 tables `public`

Toutes ont RLS activé (`relrowsecurity = true`) :

| Table | RLS | Policies `authenticated` | Policies `anon`/`public` |
|---|---|---|---|
| `profiles` | ✅ | SELECT/INSERT/UPDATE/DELETE, `auth.uid()=id` | SELECT `USING(true)` — public par design, déjà validé le 08-01 |
| `user_profiles` | ✅ | SELECT/INSERT/UPDATE, `auth.uid()=user_id` | **aucune** |
| `user_progress` | ✅ | SELECT/INSERT/UPDATE, `auth.uid()=user_id` | **aucune** |
| `lesson_scores` | ✅ | SELECT/INSERT/UPDATE, `auth.uid()=user_id` | **aucune** |
| `exam_attempts` | ✅ | SELECT/INSERT **seulement** (pas d'UPDATE/DELETE — journal append-only, conforme à la conception documentée) | **aucune** |
| `exam_attempt_answers` | ✅ | SELECT/INSERT via jointure sur `exam_attempts.user_id = auth.uid()` (pas de colonne `user_id` directe, conforme à la conception documentée) | **aucune** |

Les 3 tables les plus récentes (`lesson_scores`, `exam_attempts`, `exam_attempt_answers`, créées via migrations trackées en septembre) sont correctement conçues — rien à signaler sur leurs policies.

## 3. Trouvaille confirmée — `user_profiles.tier` toujours auto-modifiable (reconfirmation live, périmètre plus large que documenté)

**Déjà connu et sciemment différé (mémoire `project_status_card_bugfix.md`, 2026-08-31, décision utilisateur : pas de correctif avant lancement commercial).** Revérifié en direct aujourd'hui, et le périmètre réel est **plus large que ce qui était documenté** : ce n'est pas seulement `tier` qui est concerné — **toutes les colonnes de `user_profiles`** (y compris `tier`, `user_id`) ont un GRANT `INSERT`/`UPDATE`/`SELECT`/`REFERENCES` ouvert à `authenticated` **et à `anon`**, alors que la migration `20260802000000_...sql` ne déclare qu'un GRANT `INSERT`/`UPDATE` restreint à `(name, lang, dept, updated_at)` — un GRANT plus ancien et plus large, jamais révoqué (vraisemblablement posé manuellement avant l'existence du suivi de migrations par CLI), reste actif en plus de celui déclaré.

**Impact réel, vérifié contre les policies RLS actuelles :**
- Pour `anon` : **sans impact pratique.** Aucune policy RLS n'autorise `anon`/`public` sur `user_profiles` (aucune ligne à `INSERT`/`SELECT`/`UPDATE`) — le refus par défaut de RLS s'applique malgré le GRANT trop large. C'est un défaut de rigueur (principe du moindre privilège non respecté), pas une brèche exploitable aujourd'hui.
- Pour `authenticated` : **exploitable, confirmé.** La policy UPDATE (`auth.uid() = user_id`) autorise légitimement un utilisateur à modifier sa propre ligne — mais comme `tier` n'est pas exclu du GRANT colonne, **n'importe quel utilisateur connecté peut s'auto-attribuer `premium_plus`** via un simple appel `supabase.from('user_profiles').update({tier:'premium_plus'}).eq('user_id', monId)` depuis la console du navigateur, en contournant entièrement l'AdminPanel. `user_id` lui-même n'est pas exploitable de la même façon malgré le GRANT — le `WITH CHECK (auth.uid() = user_id)` de la policy rejette toute tentative de réaffecter `user_id` à quelqu'un d'autre.

**Aucun changement appliqué** — même statut que la décision du 08-31 (différé, documenté dans `TODO.md`), sauf si tu veux revoir cette décision maintenant que l'ampleur réelle est confirmée plus précisément.

## 4. Nouvelles trouvailles (jamais auditées avant)

**a) GRANT table-level `anon` trop large sur `profiles`/`user_profiles`/`user_progress`** — les 3 tables historiques (créées avant le suivi CLI) accordent `DELETE, INSERT, SELECT, UPDATE` au niveau table à `anon` (identique à `authenticated`), sans lien avec ce qui devrait réellement être exposé à un appelant non authentifié. **Sans impact pratique aujourd'hui** (RLS bloque `anon` par défaut sur ces 3 tables faute de policy le concernant, sauf le SELECT public intentionnel sur `profiles`), mais c'est un vrai écart au principe du moindre privilège : ça ne tient que parce qu'aucune policy `anon` n'a jamais été ajoutée par erreur sur ces tables. Un futur ajout de policy mal scopée deviendrait immédiatement exploitable sans qu'on s'en rende compte, puisque le GRANT est déjà ouvert.

**b) `TRUNCATE` accordé à `anon` ET `authenticated` sur les 6 tables**, y compris les 3 tables récentes autrement propres. `TRUNCATE` n'est pas filtré par RLS (Postgres ne l'évalue jamais au niveau ligne). **Non exploitable via l'API REST actuelle** — PostgREST ne mappe aucune méthode HTTP vers `TRUNCATE` (seulement SELECT/INSERT/UPDATE/DELETE + RPC), donc ce GRANT n'est pas atteignable par un appel `anon`/`authenticated` normal aujourd'hui. Reste une non-conformité au moindre privilège à corriger si un jour un canal d'exécution SQL brut est exposé (fonction RPC, outil admin, etc.).

**c) Fonction `rls_auto_enable()` — flag du linter, faux positif fonctionnel.** `SECURITY DEFINER`, exécutable en théorie par `anon`/`authenticated` via `/rest/v1/rpc/rls_auto_enable`. Vérifiée directement : c'est une fonction `RETURNS event_trigger` (active RLS automatiquement sur toute nouvelle table créée dans `public`) — Postgres refuse nativement l'appel direct d'une fonction de ce type hors du mécanisme d'event trigger lui-même, donc l'exécution via RPC échoue systématiquement en pratique malgré le GRANT EXECUTE. Absente de toutes les migrations trackées — probablement posée par Supabase lui-même en tooling de plateforme, pas par ce projet. Rien à corriger, juste documenté.

**d) Suggestion du linter, hors RLS** : "Leaked Password Protection" désactivée côté Auth (vérification HaveIBeenPwned). Réglage du dashboard Supabase Auth, pas du code — à activer si souhaité, aucun risque à le laisser tel quel dans l'immédiat.

## Conclusion

Rien de nouveau côté exposition externe (les deux anciens projets sont bel et bien supprimés, `.env` n'a jamais fuité). La seule brèche réellement exploitable reste celle déjà connue et sciemment différée par toi (auto-attribution de `tier`), mais son périmètre exact est maintenant documenté précisément (toutes les colonnes de `user_profiles`, pas seulement `tier` — même si `tier` est la seule dont l'exploitation a un impact produit réel). Les autres trouvailles (b, c, d) sont des écarts de rigueur sans impact pratique aujourd'hui, à corriger par hygiène plutôt que par urgence.

## Non vérifié / hors de portée de cette passe

- `MAP_ADMIN_2024` (mot de passe admin client) — non re-testé dans cette passe.
- Policies/grants sur des schémas autres que `public` (`auth`, `storage`, etc.) — non examinés.

## Correctif appliqué (2026-09-07, suite à la décision de traiter maintenant)

**Migration `20260907000000_harden_rls_grants.sql`, appliquée en production.** Backup préalable : script de rollback exact (restaure l'état de GRANT précédent) conservé hors dépôt, dans le scratchpad de session — pas de `pg_dump` nécessaire puisque la migration ne touche aucune donnée, uniquement des ACL.

**État post-migration vérifié directement (`information_schema.column_privileges`/`table_privileges`, `pg_event_trigger`, `db advisors`) :**
- `user_profiles` : `anon` n'a plus aucun accès. `authenticated` garde SELECT/INSERT/UPDATE sur toutes les colonnes utiles (name, lang, dept, ship, target, level, duration, time, who, updated_at). `tier` est passé à SELECT seul (plus d'INSERT/UPDATE). `user_id` est passé à SELECT+INSERT seul (pas d'UPDATE, conforme à l'intention déjà déclarée par les migrations précédentes).
- `profiles`/`user_progress` : `anon` réduit exactement à ce que les policies prévoient (SELECT public sur `profiles` uniquement, rien sur `user_progress`).
- `lesson_scores`/`exam_attempts`/`exam_attempt_answers` : TRUNCATE/TRIGGER/REFERENCES retirés, plus aucun accès `anon`.
- `rls_auto_enable()` : EXECUTE retiré de `PUBLIC`/`anon`/`authenticated` (seul `postgres` le garde). L'event trigger `ensure_rls` (`ddl_command_end`) reste actif et fonctionnel — confirmé après coup.
- `npx supabase db advisors --linked --type security` : les 2 warnings sur `rls_auto_enable()` ont disparu. Reste uniquement l'avertissement Auth "Leaked Password Protection Disabled" (réglage dashboard, hors périmètre de cette migration).

**Test fonctionnel sur comptes jetables (2 `auth.users` disposables, méthode `SET LOCAL role authenticated` + `request.jwt.claim.sub`, nettoyage complet vérifié à 0 ligne restante) :**
- ✅ Cas positif : l'utilisateur A modifie `name`/`lang`/`who` sur sa propre ligne — accepté.
- ✅ Cas négatif (la brèche visée) : l'utilisateur A tente de passer son propre `tier` à `premium_plus` — rejeté, `42501: permission denied for table user_profiles`.
- ✅ Isolation croisée lecture : l'utilisateur A ne voit aucune ligne appartenant à l'utilisateur B (0 ligne).
- ✅ Isolation croisée écriture : l'utilisateur A tente de modifier la ligne de l'utilisateur B — 0 ligne affectée, donnée de B inchangée. **Confirme au passage que `AdminPanel.tsx`'s `grantPremium`/`revokePremium` n'ont jamais réellement fonctionné pour un autre utilisateur que soi-même** (même comportement avant/après cette migration — pas une régression introduite ici, mais bon à savoir : documenté dans `TODO.md`).

**Aucune action corrective destructive** : uniquement des `REVOKE`/`GRANT`, aucune donnée applicative modifiée hors des lignes de test créées et supprimées dans le cadre de la vérification.

## Suivi (2026-09-07, même jour) — cause racine trouvée en créant la table `certificates`

En vérifiant les GRANT de `certificates` (nouvelle table, chantier certificats), trouvé qu'elle héritait déjà de `TRUNCATE`/`REFERENCES`/`TRIGGER`/`MAINTAIN` pour `anon` **avant même** l'exécution de sa propre migration. Cause identifiée via `pg_default_acl` : une règle `ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public` accordait automatiquement ces privilèges à `anon`/`authenticated` sur **toute nouvelle table** créée par le rôle `postgres` — le rôle sous lequel `supabase db push` exécute les migrations. Sans correctif, chaque future table créée par migration aurait recommencé avec le même écart que celui fermé plus haut dans ce document, table par table, indéfiniment.

**Corrigé** via `20260907020000_fix_certificates_and_default_acl.sql` : nettoyage de `certificates` (même méthode REVOKE puis GRANT explicite) + `ALTER DEFAULT PRIVILEGES ... REVOKE TRUNCATE, REFERENCES, TRIGGER, MAINTAIN ON TABLES FROM anon, authenticated` pour que ça ne se reproduise plus. **Vérifié par la preuve directe** : création d'une table de test jetable (`_acl_probe_test`) après le correctif → 0 ligne de GRANT pour `anon`/`authenticated` (`information_schema.table_privileges` vide), table supprimée immédiatement après. `supabase db advisors` reste propre (seul l'item Auth hors-périmètre persiste).

Non touché : la règle par défaut appartenant à `supabase_admin` (bootstrapping interne Supabase, pas déclenchée par les migrations `db push` qui s'exécutent en `postgres` — confirmé, `certificates` n'a hérité que du sous-ensemble `postgres`, pas du set complet `supabase_admin`).
