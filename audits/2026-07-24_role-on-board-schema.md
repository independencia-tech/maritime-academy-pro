# Role On Board — Schéma technique (Mission A, structure uniquement)

**Date :** 2026-07-24
**Type de mission :** Conception de schéma — aucun contenu pédagogique ou éditorial créé.

## Contexte / Objectif

Role On Board est le futur guide opérationnel de chaque rang maritime dans MAP, positionné en Layer 0 (libre, indépendant du profil utilisateur, de la progression, du Billing et de MAP Core), au même titre que Ships Library et Maritime Lexicon. Cette mission ne produit aucun contenu de fiche : elle définit uniquement le schéma TypeScript (`roleOnBoardRegistry.ts`) et le composant de rendu partagé (`RoleOnBoardShared.tsx`), sur la base de décisions produit déjà figées et fournies dans la mission — sans réinterprétation ni structure alternative.

---

## Recherche préalable (conventions existantes vérifiées avant conception)

- **`shipsLibraryIndex.ts`** : registre plat `Partial<Record<VesselTypeId, ReturnType<typeof lazy>>>`, convention de nommage `SCREAMING_SNAKE_CASE` pour le const exporté (`SHIPS_LIBRARY_INDEX`), même schéma que `RANK_REGISTRY` / `VESSEL_TYPE_REGISTRY` / `LESSON_REGISTRY`.
- **`LessonShared.tsx`** (`src/components/`) : module partagé réel et déjà utilisé par de nombreux fichiers `Lesson*.tsx` (import relatif `./LessonShared`), exportant `C` (palette), `T` (chaînes d'interface fixes, les 4 langues **obligatoires**), `Stars`, `Card`, `GLine`, `SL`, ainsi que `QuizComp`/`QuestionBank` (moteurs de quiz — non pertinents pour Role On Board, qui n'a ni quiz ni XP).
- **Maritime Lexicon** (`LexiqueMaritime.tsx`) : confirmé Layer 0/libre/indépendant (`access:"free"`, `totalLessons:0`, routé indépendamment dans `MaritimeApp.tsx` sans vérification de plan). Son `LexiconEntry` exige les 4 langues sur les champs principaux (`en/fr/es/pt` requis), avec seulement `def_es?`/`def_pt?` rendus optionnels au cas par cas — aucun type de traduction partielle nommé et réutilisable n'existe.
- **i18n existant dans les registres** (`rankRegistry.ts:19`, `vesselTypeRegistry.ts:30`) : les deux définissent inline le même type anonyme `{ fr: string; en: string; es: string; pt: string }` (4 langues obligatoires), sans type nommé partagé. **Aucun mécanisme de traduction partielle avec repli n'existe déjà dans le dépôt** — la mission demandait de "réutiliser le mécanisme i18n et le fallback déjà existants", mais la recherche confirme qu'aucun mécanisme de ce type n'existe à réutiliser littéralement. Une fonction de résolution minimale a donc été ajoutée dans `roleOnBoardRegistry.ts` (voir plus bas) — ce n'est pas un second système parallèle, seulement le point de résolution nécessaire pour que le type `LocalizedText` imposé par la mission soit exploitable.
- **Identifiants réutilisables** : `LessonId = string` (`lessonRegistry.ts:18`), `VesselTypeId` (union de 24 littéraux, `vesselTypeRegistry.ts:12-25`), `RankId` (union de 15 littéraux, `rankRegistry.ts:8-13`).

---

## Fichiers créés

1. **`src/core/roleOnBoardRegistry.ts`** — schéma de données + registre vide + fonctions de résolution i18n.
2. **`src/components/RoleOnBoardShared.tsx`** — composant de rendu partagé, réutilisant `C`/`Card`/`GLine`/`SL`/`Stars` de `LessonShared.tsx`.

Aucun registre existant (`lessonRegistry.ts`, `rankRegistry.ts`, `vesselTypeRegistry.ts`) n'a été modifié — uniquement référencés en lecture par import de type.

---

## Schéma TypeScript complet (`src/core/roleOnBoardRegistry.ts`)

```ts
import type { RankId } from "./rankRegistry";
import type { LessonId } from "./lessonRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";

// ── I18N ──────────────────────────────────────────────────────
export type SupportedLanguage = "en" | "fr" | "es" | "pt";
export type LocalizedText = Partial<Record<SupportedLanguage, string>>;

export function resolveLocalizedText(
  text: LocalizedText | undefined,
  lang: SupportedLanguage
): string | undefined {
  if (!text) return undefined;
  return text[lang] ?? text.en;
}

export function resolveLocalizedTextList(
  items: LocalizedText[] | undefined,
  lang: SupportedLanguage
): string[] {
  if (!items) return [];
  const out: string[] = [];
  for (const item of items) {
    const resolved = resolveLocalizedText(item, lang);
    if (resolved) out.push(resolved);
  }
  return out;
}

// ── MAP REFERENCES ───────────────────────────────────────────
export type MapReferenceKind = "lesson" | "vesselType" | "external";

export interface MapReference {
  kind: MapReferenceKind;
  lessonId?: LessonId;
  vesselTypeId?: VesselTypeId;
  externalCode?: string;
  label?: LocalizedText;
}

// ── OPERATIONAL PHASES ───────────────────────────────────────
export type OperationalPhaseId =
  | "pre_departure_preparation"
  | "departure_manoeuvres"
  | "navigation"
  | "anchoring"
  | "port_operations"
  | "ship_to_ship_operations"
  | "maintenance"
  | "emergency_situations";

export const OPERATIONAL_PHASE_ORDER: OperationalPhaseId[] = [
  "pre_departure_preparation",
  "departure_manoeuvres",
  "navigation",
  "anchoring",
  "port_operations",
  "ship_to_ship_operations",
  "maintenance",
  "emergency_situations",
];

export interface OperationalPhase {
  overview?: LocalizedText;
  responsibilities?: LocalizedText[];
  equipment?: LocalizedText[];
  risks?: LocalizedText[];
  bestPractices?: LocalizedText[];
  commonMistakes?: LocalizedText[];
  professionalTips?: LocalizedText[];
  mapReferences?: MapReference[];
  notes?: LocalizedText;
}

export type OperationalPhases = Partial<Record<OperationalPhaseId, OperationalPhase>>;

// ── AUTHORITY LIMITS ─────────────────────────────────────────
export interface AuthorityLimits {
  youCan?: LocalizedText[];
  youCannot?: LocalizedText[];
}

// ── PROFESSIONAL RESPONSIBILITY MATRIX ───────────────────────
export interface ProfessionalResponsibilityMatrix {
  iExecute?: LocalizedText[];
  iMonitor?: LocalizedText[];
  iReport?: LocalizedText[];
  iDoNotAuthorize?: LocalizedText[];
}

// ── MEDIA ─────────────────────────────────────────────────────
export type RoleOnBoardMediaKind = "image" | "video" | "diagram" | "document";

export interface RoleOnBoardMediaItem {
  kind: RoleOnBoardMediaKind;
  caption?: LocalizedText;
  src?: string;
}

// ── ROLE ON BOARD CARD ────────────────────────────────────────
export interface RoleOnBoardCard {
  rankId: RankId;
  roleOverview?: LocalizedText[];
  organizationalPosition?: LocalizedText[];
  professionalSkills?: LocalizedText[];
  operationalPhases?: OperationalPhases;
  practicalScenarios?: LocalizedText[];
  professionalTips?: LocalizedText[];
  professionalMindset?: LocalizedText[];
  professionalDocumentation?: LocalizedText[];
  environmentalResponsibilities?: LocalizedText[];
  authorityLimits?: AuthorityLimits;
  commonMistakes?: LocalizedText[];
  careerProgression?: LocalizedText[];
  mapResources?: MapReference[];
  responsibilityMatrix?: ProfessionalResponsibilityMatrix;
  media?: RoleOnBoardMediaItem[];
}

// ── REGISTRY ──────────────────────────────────────────────────
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
```

### Correspondance avec les 15 sections listées dans la mission

| # | Section demandée | Champ du schéma |
|---|---|---|
| 1 | Présentation du métier | `roleOverview` |
| 2 | Position dans l'organisation | `organizationalPosition` |
| 3 | Compétences professionnelles | `professionalSkills` |
| 4 | operationalPhases (8 phases, structure commune) | `operationalPhases` |
| 5 | Practical Scenarios | `practicalScenarios` |
| 6 | Professional Tips | `professionalTips` (niveau fiche — distinct du `professionalTips` propre à chaque phase) |
| 7 | Professional Mindset | `professionalMindset` |
| 8 | Documentation professionnelle | `professionalDocumentation` |
| 9 | Responsabilités environnementales | `environmentalResponsibilities` |
| 10 | Limites d'autorité (You can / You cannot) | `authorityLimits` |
| 11 | Common Mistakes | `commonMistakes` (niveau fiche — distinct du `commonMistakes` propre à chaque phase) |
| 12 | Évolution professionnelle | `careerProgression` |
| 13 | Ressources MAP | `mapResources` |
| 14 | Professional Responsibility Matrix | `responsibilityMatrix` |
| 15 | Support multimédia évolutif | `media` |

**Note de conception — doublons intentionnels non fusionnés :** `Common Mistakes` et `Professional Tips` apparaissent à la fois au niveau de la fiche (générique, valable pour tout le rang) et au niveau de chaque phase opérationnelle (contextuel à cette phase précise). La mission liste explicitement les deux comme sections distinctes du point 2 tout en les incluant dans la structure de `OperationalPhase` au point 3 — ce n'est pas une redondance à corriger, les deux niveaux ont un sens différent et ont été conservés tels quels, conformément à l'instruction de ne rien fusionner pour atteindre un compte précis.

---

## Décisions de conception motivées (là où la mission ne détaillait pas la forme interne)

La mission fixait précisément `OperationalPhaseId`, `OperationalPhases`, `SupportedLanguage`, `LocalizedText` et les 4 dimensions de la matrice de responsabilité. Pour les 15 sections et les champs internes de `OperationalPhase` non détaillés au niveau du type, les choix suivants ont été faits, dans l'esprit explicite de la mission ("listes ouvertes, longueur variable, pas de nombre fixe de champs") :

- **Toute section "contenu" est un tableau `LocalizedText[]`**, y compris celles qui pourraient sembler être un texte narratif unique (ex. `roleOverview`, `professionalMindset`) — un tableau à un seul élément couvre aussi bien ce cas, tout en gardant un rendu générique uniforme dans `RoleOnBoardShared` (une seule fonction `Section`/`TextList` pour tout).
- **`MapReference`** (point 7) : `kind: "lesson" | "vesselType" | "external"`. Réutilise `LessonId`/`VesselTypeId` par import de type quand la référence pointe vers du contenu MAP réel. `externalCode` (chaîne) reste nécessaire pour les références réglementaires externes (ex. un code STCW) car aucun registre de ce type n'existe dans le dépôt — c'est un type local strict (`MapReference`), pas une chaîne libre directement dans la liste. `label` optionnel permet un intitulé d'affichage fourni par l'auteur, car `lessonRegistry.ts` ne porte aucun texte de titre à résoudre automatiquement.
- **`RoleOnBoardMediaItem`** (support multimédia) : aucun registre d'assets média n'existe dans le dépôt — type local strict `{ kind; caption?; src? }`. `src` reste une chaîne (chemin/URL), car un identifiant d'asset n'a pas d'équivalent réutilisable ailleurs.
- **Résolution i18n (`resolveLocalizedText` / `resolveLocalizedTextList`)** : comme noté plus haut, aucun mécanisme existant à réutiliser littéralement n'a été trouvé — fonction minimale ajoutée, "en" comme repli recommandé (conforme au texte de la mission), retourne `undefined` plutôt qu'une chaîne vide si rien n'est disponible, pour que l'appelant puisse ne rien afficher plutôt que d'afficher un bloc vide.

Ces choix n'affectent aucune des structures explicitement imposées par la mission (elles sont reprises telles quelles) — ils comblent uniquement les zones que la mission qualifiait elle-même de "listes ouvertes" ou de "type local strict à définir".

---

## Composant partagé (`src/components/RoleOnBoardShared.tsx`)

- Réutilise `C`, `Card`, `GLine`, `SL`, `Stars` importés de `./LessonShared` (import relatif, comme le font déjà les fichiers `Lesson*.tsx`) — pas de duplication d'un système visuel parallèle. Ne réutilise pas `QuizComp`/`QuestionBank` (hors sujet, Role On Board n'a ni quiz ni XP).
- Déclare son propre bloc `T` de chaînes d'interface (titres de section, "Retour", libellés des 8 phases, etc.), avec les 4 langues **obligatoires** — même convention que `LessonShared.T`, car ce sont des chaînes d'interface développeur, pas le contenu éditorial partiel `LocalizedText` d'une fiche. Aucun texte éditorial n'est rédigé — uniquement des libellés d'interface (conforme au point 8).
- `RoleOnBoardShared({ rankId, lang, onBack })` : résout la fiche via `getRoleOnBoardCard(rankId)`. Si absente, affiche un unique message de repli (`t.noData`) sans erreur. Si présente, délègue à `RoleOnBoardCardBody`, qui rend **chaque section indépendamment et conditionnellement** — une section vide ou absente ne produit jamais de bloc vide (vérifié pour les 15 sections, y compris le bloc `operationalPhases`, où chaque phase individuelle est elle-même rendue conditionnellement, et chaque champ interne d'une phase l'est aussi).
- Les phases opérationnelles sont itérées dans l'ordre canonique `OPERATIONAL_PHASE_ORDER` (pas `Object.keys()`, dont l'ordre n'est pas garanti fiable pour l'affichage), conformément au point 3 sur la nécessité d'un ordre d'affichage stable.

---

## Exemple documentaire (illustratif uniquement — non exécuté, non ajouté au registre de production)

Cet exemple utilise le `RankId` existant `"ab"` (Matelot Qualifié / Able Seaman, confirmé présent dans `rankRegistry.ts`) uniquement pour illustrer la **forme** de l'objet. Le texte est un contenu-témoin explicitement générique, pas du contenu professionnel réel — il ne figure dans aucun fichier source, uniquement ici à titre de documentation.

```ts
// Exemple illustratif uniquement — ne pas exécuter, ne pas ajouter à
// ROLE_ON_BOARD_REGISTRY. Sert seulement à montrer la forme de l'objet.
const exampleCard: RoleOnBoardCard = {
  rankId: "ab",

  roleOverview: [
    { en: "[Illustrative placeholder] General description of the AB role.", fr: "[Exemple] Description générale du rôle de Matelot Qualifié." },
  ],

  organizationalPosition: [
    { en: "[Illustrative placeholder] Reports to the Bosun / OOW." },
  ],

  professionalSkills: [
    { en: "[Illustrative placeholder] Example skill statement." },
  ],

  operationalPhases: {
    departure_manoeuvres: {
      overview: { en: "[Illustrative placeholder] Overview text for this phase." },
      responsibilities: [{ en: "[Illustrative placeholder] Example responsibility." }],
      equipment: [{ en: "[Illustrative placeholder] Example equipment item." }],
      risks: [{ en: "[Illustrative placeholder] Example risk." }],
      bestPractices: [{ en: "[Illustrative placeholder] Example best practice." }],
      commonMistakes: [{ en: "[Illustrative placeholder] Example phase-specific mistake." }],
      professionalTips: [{ en: "[Illustrative placeholder] Example phase-specific tip." }],
      mapReferences: [
        { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
      ],
      notes: { en: "[Illustrative placeholder] Optional note." },
    },
    // Only phases relevant to this rank would be filled in practice —
    // the other 7 OperationalPhaseId keys are simply absent, not empty objects.
  },

  practicalScenarios: [{ en: "[Illustrative placeholder] Example scenario." }],
  professionalTips: [{ en: "[Illustrative placeholder] Card-wide tip, not tied to one phase." }],
  professionalMindset: [{ en: "[Illustrative placeholder] Example mindset statement." }],
  professionalDocumentation: [{ en: "[Illustrative placeholder] Example documentation reference." }],
  environmentalResponsibilities: [{ en: "[Illustrative placeholder] Example environmental duty." }],

  authorityLimits: {
    youCan: [{ en: "[Illustrative placeholder] Example permitted action." }],
    youCannot: [{ en: "[Illustrative placeholder] Example action requiring authorization." }],
  },

  commonMistakes: [{ en: "[Illustrative placeholder] Card-wide mistake, not tied to one phase." }],
  careerProgression: [{ en: "[Illustrative placeholder] Example next step (e.g. towards Bosun)." }],

  mapResources: [
    { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } },
    { kind: "external", externalCode: "STCW II/4" },
  ],

  responsibilityMatrix: {
    iExecute: [{ en: "[Illustrative placeholder] Example executed task." }],
    iMonitor: [{ en: "[Illustrative placeholder] Example monitored condition." }],
    iReport: [{ en: "[Illustrative placeholder] Example reportable observation." }],
    iDoNotAuthorize: [{ en: "[Illustrative placeholder] Example action outside this rank's authority." }],
  },

  media: [
    { kind: "diagram", caption: { en: "[Illustrative placeholder] Example diagram caption." } },
  ],
};
```

Note sur la traduction partielle : l'exemple ci-dessus est volontairement incomplet (uniquement `en`, parfois `fr`) pour démontrer que le schéma compile et s'affiche correctement avec des traductions partielles, sans qu'aucune des 3 autres langues ne soit requise — exactement l'exigence du point 5 de la mission.

---

## Fichiers créés (résumé)

- `src/core/roleOnBoardRegistry.ts` — schéma + registre vide + résolveurs i18n. Aucun registre existant modifié.
- `src/components/RoleOnBoardShared.tsx` — composant de rendu partagé, réutilise `LessonShared.tsx`.

## Build

`vite build` ✓ et `tsc --noEmit` ✓ sans erreur sur les deux nouveaux fichiers (une erreur de typage initiale sur des appels `<SL icon=.. text=..>` sans prop `color` explicite a été détectée par `tsc` et corrigée — `SL` dans `LessonShared.tsx` n'a pas de valeur par défaut pour `color` dans sa déstructuration, donc TypeScript l'infère comme requis à l'usage).

## Statut

**Schéma et composant terminés, aucun contenu de fiche créé.** Le registre `ROLE_ON_BOARD_REGISTRY` est vide en production (0 fiche). Aucune fiche pilote n'a été ajoutée au fichier source — uniquement l'exemple documentaire ci-dessus, non exécuté. Aucun commit, aucun push — en attente de votre confirmation.
