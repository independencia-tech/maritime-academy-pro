# Role On Board — Able Seaman : résolution des MAP References (Mission D, proposition uniquement)

**Date :** 2026-07-25
**Type de mission :** Recherche/proposition de correspondances — aucune modification de fichier, aucun contenu rédigé.

## Contexte / Objectif

La fiche Able Seaman (Role On Board) contient de nombreux placeholders `[à résoudre en Mission D]` à la place de références `lessonId` réelles. Cette mission identifie les `lessonId` réels de `lessonRegistry.ts` correspondant à chaque emplacement, avec vérification systématique de leur existence et de leur intitulé réel, un niveau de confiance par proposition, et sans forcer de correspondance faible — sans encore les intégrer au contenu final de la fiche.

## Méthodologie et constat préalable important

`lessonRegistry.ts` ne porte **aucun champ de titre** (l'interface `LessonRegistryItem` n'a que `department`, `moduleId`, `difficulty`, `targetRanks`, etc. — pas de `title`/`label`). Les titres réels des leçons vivent dans `Dashboard.tsx` (`MODULES`). La vérification a donc été faite en deux temps pour chaque proposition : (1) confirmer que le `lessonId` existe littéralement comme clé dans `LESSON_REGISTRY` (`src/core/lessonRegistry.ts`, lu intégralement), (2) confirmer l'intitulé réel de la leçon en le recoupant avec `Dashboard.tsx` (`MODULES`), qui est la seule source de titres exacts.

**Constat majeur, à connaître avant de lire le tableau :** les modules Safety (`s1` à `s6` — COLREG Safety, EPIRB/SART/GMDSS, Secourisme STCW, Firefighting, Lifeboats/Liferafts/HRU, Ship Safety Operations & Emergency Readiness) **n'ont aucune entrée dans `lessonRegistry.ts`**. J'ai vérifié l'intégralité du fichier ligne par ligne : il ne contient que `deck_colreg_l1`, `deck_meteo_l1`–`l7`, la série `e1`–`e7` (Engine) et la série `d1`–`d6` + `d5` (Deck) au format `d{n}-l{n}`. **Aucune clé `s1-l1` etc. n'existe.** De même, le module Meteorology (`d7`) n'a **pas** d'entrées au format `d7-l1`..`d7-l7` — seulement l'ancien format `deck_meteo_l1`..`deck_meteo_l7` (conservé tel quel lors d'une mission précédente). Ce sont deux points structurels qui limitent fortement les correspondances possibles pour tout ce qui touche à la sécurité/urgence, malgré l'existence réelle du contenu correspondant dans l'application — signalé systématiquement ci-dessous plutôt que contourné.

---

## 1. Professional Skills (10 compétences)

| Placeholder | Proposed lessonId | Lesson title (en) | Confidence | Justification |
|---|---|---|---|---|
| Lookout | `d3-l2` | Lights & Shapes | High | Reconnaissance visuelle des feux/marques de jour des autres navires — cœur de la vigie (COLREG Règle 5). Vérifié : clé présente dans `LESSON_REGISTRY`, titre confirmé dans `Dashboard.tsx` (module d3, lesson l2). |
| Lookout | `d3-l3` | Sound Signals & Fog | High | Vigie par l'ouïe en visibilité réduite — complément direct et distinct du précédent (visuel vs sonore). Vérifié idem. |
| Steering | — | — | — | **Aucune correspondance forte trouvée.** `d1-l5` (Compass & Headings) est la leçon la plus proche (cap au compas), mais ne traite pas la tenue de barre / les ordres de barre eux-mêmes — Low, écarté conformément à la règle. Une future leçon dédiée à la conduite du navire / aux ordres de barre serait plus appropriée (Specialized Operations ou futur module Seamanship). |
| Mooring Operations | `d6-l4` | Mooring Operations | High | Correspondance directe, titre identique. Vérifié : clé présente, titre confirmé (module d6, lesson l4). |
| Anchoring Assistance | `d6-l3` | Anchoring & Anchor Types | High | Correspondance directe. Vérifié : clé présente, titre confirmé (module d6, lesson l3). |
| Rope Work (Knots, Splicing) | `d6-l1` | Ropes & Fibres | High | Théorie des cordages — base du sujet. Vérifié : clé présente, titre confirmé. |
| Rope Work (Knots, Splicing) | `d6-l2` | Knots & Splices | High | Technique de nœuds/épissures — complément direct et distinct (théorie vs pratique). Vérifié : clé présente, titre confirmé. |
| Communication & SMCP | `d3-l5` | VHF Radio Procedures | Medium | Un AB assure des veilles VHF ; pertinent mais couvre la radio plus largement que la communication SMCP générale. Vérifié : clé présente, titre confirmé (module d3, lesson l5). |
| Communication & SMCP | `d4-l4` | Navigation & Maneuvering | Medium | Phraséologie SMCP de manœuvre (postes d'amarrage, ordres) pertinente pour un AB, mais leçon conçue plus largement pour l'officier de quart. Vérifié : clé présente, titre confirmé (module d4, lesson l4). |
| Safety & Emergency Response | — | — | — | **Aucune correspondance trouvée dans `lessonRegistry.ts`.** Le contenu le plus pertinent existe réellement dans l'application (module Safety `s6` — "Ship Safety Operations & Emergency Readiness", `s4` — "Firefighting", `s5` — "Lifeboats, Liferafts & HRU") mais **aucun de ces modules n'a de `lessonId` enregistré**. Ne pas forcer une correspondance hors sujet — signalé comme lacune de registre à combler séparément, pas de vague pédagogique à ce niveau. |
| Basic Maintenance & Greasing | — | — | — | **Aucune correspondance trouvée.** Aucune leçon Deck ne couvre l'entretien/graissage courant côté pont (le seul contenu "Maintenance" enregistré, `e1-l6`, appartient au département Engine — non pertinent pour un rôle Deck). Candidat pour une future leçon Seamanship ou Specialized Operations. |
| Painting & Corrosion Prevention | — | — | — | **Aucune correspondance trouvée.** Aucune leçon existante (Deck ou autre) ne couvre la peinture/prévention de la corrosion. Candidat pour une future leçon. |
| Teamwork & Following Instructions Precisely | — | — | — | **Aucune correspondance forte trouvée dans le registre.** Le contenu idéal existe réellement (`s1-l1` "Human Factors: Why Collisions Really Happen", `s1-l2` "Bridge Team Coordination During Collision Risk") mais le module Safety `s1` n'a aucun `lessonId` enregistré — même lacune que pour Safety & Emergency Response. Ne pas remplacer par une correspondance approximative issue d'un autre module. |

## 2. Operational Phases (8 phases)

| Placeholder | Proposed lessonId | Lesson title (en) | Confidence | Justification |
|---|---|---|---|---|
| Pre-departure Preparation | `d1-l2` | The Ship | Medium | Familiarisation générale du navire, pertinente en préparation mais pas une checklist de départ dédiée — aucune leçon plus directe trouvée. |
| Departure Manoeuvres | `d6-l4` | Mooring Operations | High | Larguer les amarres est l'action centrale de l'AB au départ. Vérifié. |
| Departure Manoeuvres | `d4-l4` | Navigation & Maneuvering | Medium | Phraséologie SMCP de manœuvre au départ, complément pertinent mais non spécifique à l'AB. Vérifié. |
| Navigation | `d1-l6` | Practical Navigation | High | Correspondance directe et large sur la navigation pratique. Vérifié. |
| Navigation | `d1-l5` | Compass & Headings | Medium | Élément concret de navigation (tenue du cap), complément du précédent. Vérifié. |
| Anchoring | `d6-l3` | Anchoring & Anchor Types | High | Correspondance directe, même leçon que la compétence "Anchoring Assistance" — cohérent, pas dupliqué artificiellement. Vérifié. |
| Port Operations | `d4-l2` | Port & VTS Communications | High | Correspondance directe sur les opérations portuaires. Vérifié. |
| Port Operations | `d6-l4` | Mooring Operations | High | L'amarrage est l'activité AB centrale en opération portuaire. Vérifié. |
| Ship-to-Ship Operations | — | — | — | **Aucune correspondance trouvée.** Aucune leçon (Deck ou autre) ne couvre les opérations navire-à-navire. C'est exactement le type de contenu que la mission anticipe pour un futur module Specialized Operations — signalé comme tel plutôt que forcé sur une leçon vaguement adjacente (ex. cargaison Engine, hors sujet et hors département). |
| Maintenance | — | — | — | **Aucune correspondance trouvée** (même constat que "Basic Maintenance & Greasing" ci-dessus). |
| Emergency Situations | `d3-l7` | GMDSS & Distress Signals | Medium | Seule leçon réellement enregistrée directement liée à l'urgence (signaux de détresse). Le contenu idéal (modules Safety `s1`, `s4`, `s5`, `s6`) existe dans l'application mais n'est pas enregistré dans `lessonRegistry.ts` — signalé, pas contourné par une correspondance de complaisance. |

## 3. Practical Scenarios

| Placeholder | Proposed lessonId | Lesson title (en) | Confidence | Justification |
|---|---|---|---|---|
| Scenario 1 — Line parts during departure | `d6-l4` | Mooring Operations | High | Correspondance directe et évidente (rupture d'amarre = sujet central de la leçon). Vérifié. Le volet "réaction d'urgence" idéal (`s6-l2` "Common Ship Emergencies & Immediate Actions") existe dans l'app mais n'est pas enregistré dans `lessonRegistry.ts` — même lacune que plus haut, signalée plutôt que comblée par un autre `lessonId`. |
| Scenario 2 — Anchor dragging | `d6-l3` | Anchoring & Anchor Types | High | Correspondance directe. Vérifié. |
| Scenario 2 — Anchor dragging | `deck_meteo_l5` | Tropical and Dangerous Phenomena | Medium | Le chasse-mouillage survient typiquement par gros temps — angle météo complémentaire et distinct. Vérifié : clé `deck_meteo_l5` présente (et non `d7-l5`, qui n'existe pas), titre confirmé (module d7, lesson l5). |
| Scenario 3 — Unauthorized visitor at gangway | `d2-l9` | Piracy & Security | Medium | Meilleure correspondance disponible dans le registre pour un sujet de sécurité/accès à bord (cadre légal ISPS-adjacent), mais l'angle du scénario (contrôle d'accès en passerelle/coupée) est traité de façon plus opérationnelle et directe dans `s6-l1` ("Safety Patrol & Hazard Recognition"), non enregistré dans `lessonRegistry.ts`. Correspondance retenue comme raisonnable (pas Low) car le sujet sécurité/accès est réellement couvert, mais signalée comme indirecte. |

## 4. MAP Resources

### a) Lesson references (nécessitent un lessonId réel)

**"Relevant Seamanship lessons (mooring, anchoring, rope work, watchkeeping)"**

| Proposed lessonId | Lesson title (en) | Confidence | Justification |
|---|---|---|---|
| `d6-l4` | Mooring Operations | High | Correspond littéralement à "mooring". Vérifié. |
| `d6-l3` | Anchoring & Anchor Types | High | Correspond littéralement à "anchoring". Vérifié. |
| `d6-l1` | Ropes & Fibres | High | Correspond à "rope work". Vérifié. |
| `d6-l2` | Knots & Splices | High | Correspond à "rope work" (volet technique). Vérifié. |
| — | — | — | **"Watchkeeping" : aucune correspondance forte trouvée.** Aucune leçon Deck enregistrée ne couvre spécifiquement la veille/le quart au niveau rating. `d4-l1` (Bridge Watch & Reporting) existe mais cible le niveau officier — écarté (Low) plutôt que forcé. |

**"Relevant Safety lessons (STCW Basic Safety Training, emergency procedures, fire prevention)"**

**Aucune correspondance possible — à signaler explicitement.** Comme établi en introduction, aucun `lessonId` du module Safety (`s1` à `s6`) n'existe dans `lessonRegistry.ts`. Le contenu réel le plus pertinent dans l'application serait `s4` (Firefighting), `s5` (Lifeboats, Liferafts & HRU) et `s6` (Ship Safety Operations & Emergency Readiness), mais aucun ne peut être cité comme `lessonId` tant que le registre n'est pas peuplé pour ce département. Ce n'est pas une absence de contenu dans l'app — c'est une absence d'enregistrement dans `lessonRegistry.ts`, à traiter comme telle.

### b) Platform resources (pas de lessonId requis — confirmé)

Confirmé : Maritime Lexicon, SMCP reference, COLREG reference, Maritime AI Assistant, Career Roadmap, CV Builder, Guide to Certifications, futur Role On Board – Bosun. Ces éléments restent des références textuelles/de service (type `MapReference.kind === "external"` dans le schéma déjà figé), pas des leçons — aucune tentative d'y associer un `lessonId` inventé.

---

## Complément Safety (2026-07-25) — re-résolution des 5 emplacements laissés en attente

`lessonRegistry.ts` contient désormais les 36 entrées Safety (`s1` à `s6`), `department: "safety"`, `targetRanks[]` et `difficulty` peuplés. Les 5 emplacements ci-dessous, laissés sans correspondance forte faute de registre à l'époque, ont été re-résolus. Vérification systématique effectuée pour chacun : existence du `lessonId` dans `LESSON_REGISTRY`, et — nouveau point de vigilance rendu possible par le peuplement — cohérence avec le rang cité : une leçon Safety dont `targetRanks[]` **n'inclut pas `ab`** n'est pas une référence appropriée pour la fiche Able Seaman, même si son sujet est pertinent.

| Emplacement | Proposed lessonId | Lesson title | Confidence | Justification |
|---|---|---|---|---|
| Skill "Safety & Emergency Response" | `s6-l2` | Common Ship Emergencies & Immediate Actions | High | Correspondance directe et littérale avec "Emergency Response". `targetRanks` = tous rangs Deck + Engine (`foundation`), `ab` inclus. Vérifié. |
| Skill "Safety & Emergency Response" | `s4-l3` | Portable Firefighting | High | Compétence concrète de lutte incendie portable, cœur de "Safety & Emergency Response" pour un AB. `targetRanks` tous rangs, `ab` inclus. Vérifié. |
| Skill "Safety & Emergency Response" | `s5-l1` | Lifeboats: Launching & Handling | High | Compétence concrète de sauvetage, troisième angle distinct (urgence générale / incendie / survie) sans redondance avec les deux précédentes. `targetRanks` tous rangs, `ab` inclus. Vérifié. |
| Skill "Teamwork & Following Instructions Precisely" | — | — | — | **`s1-l1` et `s1-l2` existent désormais dans le registre (vérifié) mais sont écartées** : leur `targetRanks[]` est `oow, chief_officer, master` uniquement — `ab` n'y figure pas. Il ne serait pas cohérent de les citer comme référence MAP sur une fiche destinée à un rang auquel ces leçons ne s'adressent pas. |
| Skill "Teamwork & Following Instructions Precisely" | `s6-l4` | Emergency Reporting & Initial Response | High | Meilleure correspondance disponible et cohérente avec le rang : "the first responder doesn't solve the emergency, they correctly trigger the whole rescue chain" — décrit précisément la discipline de suivre la procédure et de déclencher la chaîne d'alerte correctement, cœur du travail d'équipe/consigne pour un AB. `targetRanks` tous rangs, `ab` inclus. Vérifié. |
| Phase "Emergency Situations" | `s6-l2` | Common Ship Emergencies & Immediate Actions | High | Remplace `d3-l7` (Medium, proposition initiale) — correspondance plus directe et sur un module explicitement nommé "Emergency Readiness". `ab` inclus. Vérifié. |
| Phase "Emergency Situations" | `s5-l1` | Lifeboats: Launching & Handling | High | Complète `s6-l2` sur l'angle abandon/survie, distinct de la réaction immédiate. `ab` inclus. Vérifié. Note : `s1` (COLREG Safety) examiné mais écarté — `targetRanks[]` = officiers uniquement, `ab` non inclus. `d3-l7` (GMDSS & Distress Signals, Deck, proposition initiale) reste une référence valable en complément si le Product Owner souhaite conserver l'angle communication de détresse, mais n'est plus la meilleure correspondance de premier plan. |
| MAP Resources — "Relevant Safety lessons (STCW BST, emergency procedures, fire prevention)" | `s3-l1` | Scene Safety & Primary Survey (DRABC) | High | Point d'entrée du volet Elementary First Aid (EFA) de STCW BST, tous rangs, `ab` inclus. Vérifié. |
| MAP Resources — "Relevant Safety lessons" | `s4-l1` | Fire Behaviour & Early Fire Recognition | High | Point d'entrée du volet Fire Prevention & Fire Fighting de STCW BST, tous rangs, `ab` inclus. Vérifié. |
| MAP Resources — "Relevant Safety lessons" | `s6-l1` | Safety Patrol & Hazard Recognition | High | Point d'entrée du volet culture sécurité / préparation aux urgences, tous rangs, `ab` inclus. Vérifié. Les trois références couvrent les trois angles cités dans le placeholder (premiers secours, procédures d'urgence, prévention incendie) sans redondance. |
| Scenario 3 (Unauthorized visitor at gangway) | `s6-l1` | Safety Patrol & Hazard Recognition | High | Remplace `d2-l9` (Medium, proposition initiale) comme référence principale — confirmé comme la meilleure correspondance : "how do you prevent an incident from being born before it becomes an emergency" décrit exactement la vigilance/reconnaissance de danger attendue face à un visiteur non autorisé à la coupée. `targetRanks` tous rangs, `ab` inclus. Vérifié. `d2-l9` (Piracy & Security, Deck) reste pertinent en complément pour l'angle cadre légal/ISPS, mais `s6-l1` devient la référence de premier plan, plus opérationnelle. |

**Constat transversal de ce complément :** le fait de disposer désormais des `targetRanks[]` réels a permis de détecter que certaines leçons pédagogiquement pertinentes par leur sujet (`s1-l1`, `s1-l2`) ne le sont pas pour ce rang précis une fois le registre consulté — un contrôle qui n'était pas possible lors du rapport initial (registre Safety alors inexistant). C'est un argument supplémentaire pour toujours vérifier `targetRanks[]`, pas seulement l'existence du `lessonId`, avant de citer une référence MAP sur une fiche de rang donné — à retenir pour les prochaines résolutions de MAP References (Bosun, OOW, etc.).

---

## Résumé — vérification anti-surréférencement

Fréquence d'apparition de chaque `lessonId` proposé à travers l'ensemble de la fiche :

| lessonId | Occurrences | Emplacements |
|---|---|---|
| `d6-l4` (Mooring Operations) | 4 | Skill Mooring, Phase Departure, Phase Port Operations, Scenario 1 |
| `d6-l3` (Anchoring & Anchor Types) | 3 | Skill Anchoring, Phase Anchoring, Scenario 2 |
| `d1-l5` / `d1-l6` / `d4-l4` / `d6-l1` / `d6-l2` | 2 chacun | voir tableaux ci-dessus |
| Tous les autres | 1 | — |

**`d6-l4` (Mooring Operations) est la leçon la plus référencée (4 fois).** Ce n'est pas anormal en soi — l'amarrage est objectivement une compétence centrale et récurrente du rôle AB (compétence propre, phase de départ, phase portuaire, scénario de rupture d'amarre sont quatre angles pédagogiques réellement distincts sur le même sujet, pas une réutilisation par défaut) — mais **à surveiller** : si de futures phases ou sections venaient encore s'appuyer sur cette même leçon sans angle nouveau, ce serait le signal d'une leçon "universelle" comblant artificiellement des emplacements plutôt qu'un vrai lien pédagogique. `d6-l3` (Anchoring, 3 occurrences) est dans une situation similaire et mérite la même vigilance.

## Statut

**Proposition terminée, aucune intégration effectuée — y compris le complément Safety.** Rapport de correspondances uniquement — aucun fichier de contenu ni `lessonRegistry.ts` modifié. Les 5 emplacements laissés en attente dans le rapport initial (faute de registre Safety) ont été re-résolus dans la section "Complément Safety" ci-dessus, désormais tous en confiance High. Le blocage structurel signalé initialement (absence des modules `s1`–`s6` dans `lessonRegistry.ts`) est levé — le registre est peuplé depuis. Le format `d7-l*` reste inexistant (seul l'ancien format `deck_meteo_l1`..`l7` existe pour la météo), sans incidence sur les emplacements traités dans ce rapport.
