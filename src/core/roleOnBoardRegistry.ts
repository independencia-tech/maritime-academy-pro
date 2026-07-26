// ── roleOnBoardRegistry.ts ──────────────────────────────────────
// This registry is the single source of truth for Role On Board data used by MAP.
//
// Layer 0, like Ships Library and Maritime Lexicon: free, independent of
// user profile, progression, MAP Core or Billing. One card = one complete
// rank (RankId), not one card per rank x phase. 15 cards at completion
// (7 Deck + 8 Engine), indexed by the RankId already defined in
// rankRegistry.ts (not modified here — this file only references it by id).
//
// Schema-only foundation: this file defines the data model and a
// documentary example (see audits/2026-07-24_role-on-board-schema.md), but
// ships with an EMPTY registry. No pedagogical/editorial content is
// authored here. No UI currently reads this file.

import type { RankId } from "./rankRegistry";
import type { LessonId } from "./lessonRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";

// ── I18N ──────────────────────────────────────────────────────
// Content strings accept PARTIAL translations — a card can exist in a
// single language without the other 3 being present, and must not error or
// render an empty block for a missing language. "en" is the recommended
// reference language when resolving a fallback (see resolveLocalizedText
// below). This is distinct from RoleOnBoardShared's own fixed UI chrome
// strings (button labels, section titles), which — like LessonShared.tsx's
// `T` — are authored ahead of time by developers and therefore keep the
// existing required-all-4-languages convention already used across MAP
// (rankRegistry.ts, vesselTypeRegistry.ts). Only user/editorial CONTENT
// uses this partial type.
export type SupportedLanguage = "en" | "fr" | "es" | "pt";
export type LocalizedText = Partial<Record<SupportedLanguage, string>>;

// No pre-existing partial-translation resolver was found elsewhere in the
// repo to reuse (rankRegistry.ts / vesselTypeRegistry.ts both require all 4
// languages inline; lessonRegistry.ts carries no display text at all) — this
// is the single, minimal resolution helper for LocalizedText, not a second
// parallel i18n system.
export function resolveLocalizedText(
  text: LocalizedText | undefined,
  lang: SupportedLanguage
): string | undefined {
  if (!text) return undefined;
  return text[lang] ?? text.en;
}

// Resolves a list of LocalizedText items to display strings for `lang`,
// dropping any item that has neither `lang` nor the "en" fallback — so a
// partially-translated list never renders an empty bullet.
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
// "MAP References" (per operational phase) and "Ressources MAP" (card-level
// section) must be structured, typed references — not free URLs or plain
// text. Reuses LessonId / VesselTypeId where a reference genuinely points
// at existing MAP content. No such registry-backed id exists yet for
// regulatory/external references (e.g. an STCW code), so "external" is a
// small local strict type rather than a bare string embedded directly in a
// reference list.
export type MapReferenceKind = "lesson" | "vesselType" | "external";

export interface MapReference {
  kind: MapReferenceKind;
  /** Required when kind === "lesson". */
  lessonId?: LessonId;
  /** Required when kind === "vesselType". */
  vesselTypeId?: VesselTypeId;
  /** Required when kind === "external" (e.g. a regulatory code such as "STCW III/1") — no MAP registry exists for this yet. */
  externalCode?: string;
  /** Optional author-provided display label — lessonRegistry.ts carries no title text to look up automatically. */
  label?: LocalizedText;
}

// ── OPERATIONAL PHASES ───────────────────────────────────────
// The 8 operational phases share ONE common structure (OperationalPhase),
// stored in a single `operationalPhases` block keyed by phase id — not a
// plain array — so each phase has a stable identifier for links, UI
// anchors, display order and future cross-references.
export type OperationalPhaseId =
  | "pre_departure_preparation"
  | "departure_manoeuvres"
  | "navigation"
  | "anchoring"
  | "port_operations"
  | "ship_to_ship_operations"
  | "maintenance"
  | "emergency_situations";

// Canonical display order for the 8 phases (matches the order they were
// specified in). RoleOnBoardShared iterates this array rather than
// `Object.keys(operationalPhases)`, whose key order is not a reliable
// display-order guarantee.
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

// Every field is independently optional — a phase only fills in what's
// relevant to it, the schema itself never changes.
export type OperationalPhases = Partial<Record<OperationalPhaseId, OperationalPhase>>;

// ── ORGANIZATIONAL POSITION ──────────────────────────────────
// The 4 relationship dimensions from the original product vision document
// (Reports to / Works with / Mentors / Supports) — not a flat text list.
export interface OrganizationalPosition {
  reportsTo?: LocalizedText[];
  worksWith?: LocalizedText[];
  mentors?: LocalizedText[];
  supports?: LocalizedText[];
}

// ── PROFESSIONAL SKILLS ──────────────────────────────────────
// Each skill can link to one or more MAP references (e.g. the lessons that
// teach it) — not a flat text list.
export interface ProfessionalSkill {
  label: LocalizedText;
  mapReferences?: MapReference[];
}

// ── PRACTICAL SCENARIOS ───────────────────────────────────────
// A practical scenario is a 7-dimension business object, not a paragraph of
// text: the situation, the mission to accomplish, the expected actions, why
// they matter, common mistakes, safety points, and MAP references — each
// independently optional except situation/mission, which anchor the
// scenario itself.
export interface PracticalScenario {
  situation: LocalizedText;
  mission: LocalizedText;
  expectedActions?: LocalizedText[];
  why?: LocalizedText[];
  commonMistakes?: LocalizedText[];
  safetyPoints?: LocalizedText[];
  mapReferences?: MapReference[];
}

// ── AUTHORITY LIMITS ─────────────────────────────────────────
export interface AuthorityLimits {
  youCan?: LocalizedText[];
  youCannot?: LocalizedText[];
}

// ── PROFESSIONAL RESPONSIBILITY MATRIX ───────────────────────
// The 4 responsibility dimensions are NOT repeated per phase — they form a
// single end-of-card summary section.
export interface ProfessionalResponsibilityMatrix {
  iExecute?: LocalizedText[];
  iMonitor?: LocalizedText[];
  iReport?: LocalizedText[];
  iDoNotAuthorize?: LocalizedText[];
}

// ── MEDIA ─────────────────────────────────────────────────────
// No media-asset registry exists elsewhere in the repo, so this is a small
// local strict type (kind + optional caption + optional source), evolving
// as media support grows — not a bare string.
export type RoleOnBoardMediaKind = "image" | "video" | "diagram" | "document";

export interface RoleOnBoardMediaItem {
  kind: RoleOnBoardMediaKind;
  caption?: LocalizedText;
  /** Local asset path or URL. Free-form: no asset-id registry exists to reuse. */
  src?: string;
}

// ── ROLE ON BOARD CARD ────────────────────────────────────────
// One card per RankId. Every section is independently optional
// (block-independence principle): RoleOnBoardShared must render
// conditionally per section and keep working normally when a section is
// absent — never an error, never a default empty block.
export interface RoleOnBoardCard {
  rankId: RankId;

  /** Présentation du métier */
  roleOverview?: LocalizedText[];
  /** Position dans l'organisation */
  organizationalPosition?: OrganizationalPosition;
  /** Compétences professionnelles */
  professionalSkills?: ProfessionalSkill[];
  /** The 8 operational phases, keyed by OperationalPhaseId. */
  operationalPhases?: OperationalPhases;
  /** Practical Scenarios */
  practicalScenarios?: PracticalScenario[];
  /** Professional Tips — card-wide, distinct from each phase's own professionalTips. */
  professionalTips?: LocalizedText[];
  /** Professional Mindset */
  professionalMindset?: LocalizedText[];
  /** Documentation professionnelle */
  professionalDocumentation?: LocalizedText[];
  /** Responsabilités environnementales */
  environmentalResponsibilities?: LocalizedText[];
  /** Limites d'autorité (You can / You cannot) */
  authorityLimits?: AuthorityLimits;
  /** Common Mistakes — card-wide, distinct from each phase's own commonMistakes. */
  commonMistakes?: LocalizedText[];
  /** Évolution professionnelle */
  careerProgression?: LocalizedText[];
  /** Ressources MAP */
  mapResources?: MapReference[];
  /** Professional Responsibility Matrix (single end-of-card summary). */
  responsibilityMatrix?: ProfessionalResponsibilityMatrix;
  /** Support multimédia évolutif */
  media?: RoleOnBoardMediaItem[];
}

// ── ABLE SEAMAN (ab) ──────────────────────────────────────────
// First real card in production. mapReferences resolved and verified
// against lessonRegistry.ts before integration (see
// audits/2026-07-25_role-on-board-ab-mapreferences.md for the resolution
// work). "external" mapResources externalCode values (MARITIME_LEXICON,
// SMCP, COLREG, AI_ASSISTANT, CAREER_ROADMAP, CV_BUILDER,
// CERTIFICATION_GUIDE, ROLE_ON_BOARD_BOSUN) are intentionally provisional —
// to be harmonized in a future Layer 0 services mission, not here.
const AB_CARD: RoleOnBoardCard = {
  rankId: "ab",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Able Seaman (AB) is a certificated deck rating who performs the practical seamanship duties essential to the safe operation of the vessel — mooring, anchoring, steering, lookout, cargo assistance, and general maintenance of deck equipment and structures." },
    { en: "The AB holds a valid STCW II/4 certificate, which distinguishes them from an Ordinary Seaman (OS): they are qualified to stand an independent lookout, take the wheel under an officer's direction, and be assigned unsupervised practical tasks appropriate to their certification." },
    { en: "The AB's value to the vessel lies in reliable execution: deck officers direct and coordinate operations, but it is the AB who physically carries out mooring operations, maintains the deck in seaworthy condition, and stands watch as an extra set of eyes and hands on the bridge or on deck." },
    { en: "A capable AB is expected to work with minimal supervision on routine tasks, follow orders precisely and without improvisation on critical operations (steering commands, mooring signals), and report abnormal situations promptly through the chain of command." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Bosun (for day-to-day deck work assignment)" },
      { en: "Officer of the Watch / OOW (during watchkeeping and navigation duties)" },
    ],
    worksWith: [
      { en: "Other ABs and Ordinary Seamen on deck operations" },
      { en: "Bosun for maintenance planning" },
      { en: "Deck officers during mooring, anchoring, and watch handovers" },
    ],
    mentors: [
      { en: "Bosun and senior ABs, who guide practical technique (knots, splicing, mooring signals, steering)" },
      { en: "Chief Officer, who oversees overall deck competency development" },
    ],
    supports: [
      { en: "Ordinary Seamen, Deck Cadets, and newly assigned crew members during familiarization and practical seamanship activities" },
    ],
  },

  professionalSkills: [
    { label: { en: "Lookout" }, mapReferences: [{ kind: "lesson", lessonId: "d3-l2", label: { en: "Lights & Shapes" } }, { kind: "lesson", lessonId: "d3-l3", label: { en: "Sound Signals & Fog" } }] },
    { label: { en: "Steering" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l9" }] },
    { label: { en: "Mooring Operations" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } }] },
    { label: { en: "Anchoring Assistance" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } }] },
    { label: { en: "Rope Work (Knots, Splicing)" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l1", label: { en: "Ropes & Fibres" } }, { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } }] },
    { label: { en: "Communication & SMCP" }, mapReferences: [{ kind: "lesson", lessonId: "d3-l5", label: { en: "VHF Radio Procedures" } }, { kind: "lesson", lessonId: "d4-l4", label: { en: "Navigation & Maneuvering" } }] },
    { label: { en: "Safety & Emergency Response" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l2" }, { kind: "lesson", lessonId: "s4-l3" }, { kind: "lesson", lessonId: "s5-l1" }] },
    { label: { en: "Basic Maintenance & Greasing" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }] },
    { label: { en: "Painting & Corrosion Prevention" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l7" }] },
    { label: { en: "Teamwork & Following Instructions Precisely" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l4" }] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before the vessel gets underway, the AB carries out the practical preparation of the deck, mooring equipment, and safety systems that departure depends on. This is largely hands-on, checklist-driven work performed under the direction of the Bosun or OOW — the AB does not decide what needs preparing, but is responsible for doing it correctly, on time, and reporting task completion and any defect or abnormal condition identified during the preparation." },
      responsibilities: [
        { en: "Prepare mooring lines and wires on deck — flake, coil, or fake them so they run freely without fouling during letting go" },
        { en: "Check and prepare mooring winches, capstans, and windlass for operation" },
        { en: "Verify that fenders, if used, are rigged and in good condition" },
        { en: "Assist in checking that hatches, doors, and openings affecting seaworthiness are properly secured" },
        { en: "Test and report the condition of deck lighting required for the departure" },
        { en: "Assist the Bosun in general deck walk-round prior to departure, reporting any loose or unsecured equipment" },
        { en: "Ensure the assigned mooring station is clean, clear, and free of unnecessary obstacles before standby" },
        { en: "Standby at assigned mooring station once instructed by the OOW or Bosun" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Mooring lines, wires, and associated fittings (bollards, fairleads, chocks)" },
        { en: "Mooring winches, capstan, windlass" },
        { en: "Fenders and fender lines" },
        { en: "Deck lighting at mooring stations" },
      ],
      risks: [
        { en: "Crushing or entanglement injury from mooring lines under tension or from rotating winch drums" },
        { en: "Slips, trips, and falls on deck due to poorly stowed lines or wet surfaces" },
        { en: "Being struck by a parting mooring line (snap-back) if lines are old, damaged, or under excessive load" },
        { en: "Injury from unsecured equipment shifting or falling during final deck preparations" },
        { en: "Miscommunication during departure preparations leading to unsafe or incomplete readiness" },
      ],
      bestPractices: [
        { en: "Always coil or flake lines so they can run out freely without kinks or fouling" },
        { en: "Inspect mooring lines and wires for visible damage before use — report any degraded line rather than using it" },
        { en: "Never stand in the bight of a line or within its potential snap-back zone" },
        { en: "Wear full PPE throughout deck preparation, even for routine tasks" },
        { en: "Confirm with the Bosun or OOW that a task is complete rather than assuming it is understood" },
        { en: "Maintain good housekeeping throughout the preparation to keep escape routes and working areas clear" },
      ],
      commonMistakes: [
        { en: "Coiling lines carelessly, leading to fouling or jamming during departure manoeuvres" },
        { en: "Standing in the snap-back zone while handling lines under tension" },
        { en: "Leaving loose tools or equipment on deck after preparation work" },
        { en: "Reporting equipment ready without physically verifying its operational condition" },
      ],
      professionalTips: [
        { en: "A few extra minutes spent flaking a line properly saves confusion and delay during departure — rushed preparation is the most common cause of mooring problems" },
        { en: "Get into the habit of visually checking every line's condition, not just its position — a line that looks fine coiled can still be damaged internally" },
        { en: "If something looks wrong, say so immediately — a Bosun would always rather hear about a problem before departure than during it" },
        { en: "Develop a personal routine before every departure. Experienced ABs rarely rely on memory alone — they follow the same systematic visual checks every time" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l2", label: { en: "The Ship" } }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the AB executes the mooring station work directed by the OOW or Bosun via radio or hand signals — letting go lines in the correct sequence, handling wires under load, and keeping the mooring party and surroundings safe as the vessel clears the berth. Timing, precision, and disciplined communication are critical throughout the departure manoeuvre." },
      responsibilities: [
        { en: "Stand by at the assigned mooring station, ready to act on command" },
        { en: "Let go lines and wires in the sequence and timing instructed by the OOW/Bosun" },
        { en: "Operate the mooring winch to heave in or slack lines as directed" },
        { en: "Communicate line status clearly and immediately (e.g. \"last line let go\", \"line fouled\") to the Bosun or OOW" },
        { en: "Recover, coil, and stow lines and wires once let go, keeping deck clear for manoeuvring" },
        { en: "Handle and adjust fenders as the vessel moves away from the berth" },
        { en: "Remain alert to unexpected vessel movement or line behaviour and warn nearby personnel immediately if a hazard develops" },
        { en: "Report any equipment failure (winch, line, communication) immediately" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Mooring lines, wires, and associated fittings" },
        { en: "Mooring winches, capstan" },
        { en: "Fenders and fender lines" },
        { en: "Portable radio or established hand-signal system for communication with the bridge/Bosun" },
      ],
      risks: [
        { en: "Snap-back injury or death from a parting line or wire under tension" },
        { en: "Crushing or entanglement in winch drums, bollards, or fairleads" },
        { en: "Being caught between the line and a fixed point (bollard, fairlead, capstan) while handling load" },
        { en: "Falling into the water between the vessel and the quay" },
        { en: "Miscommunication or delayed signal leading to a line being let go at the wrong moment" },
        { en: "Unexpected vessel movement caused by wind, current, or passing traffic" },
        { en: "Loss of situational awareness of the vessel's movement relative to the quay and other vessels" },
      ],
      bestPractices: [
        { en: "Always identify and stay clear of the snap-back zone before a line comes under load" },
        { en: "Confirm every order before acting on it if there is any doubt — never assume the instruction" },
        { en: "Keep constant visual or radio contact with the Bosun/OOW throughout the manoeuvre" },
        { en: "Handle winches with full attention — never operate controls while distracted or looking away" },
        { en: "Maintain good housekeeping at the mooring station so lines run freely and the area stays safe to move in" },
        { en: "Keep escape routes clear and always know where your safe retreat path is before lines come under tension" },
        { en: "Report \"line away\" or \"all clear\" promptly so the bridge has an accurate picture of the vessel's status" },
      ],
      commonMistakes: [
        { en: "Letting go a line without explicit confirmation from the OOW or Bosun" },
        { en: "Standing within the snap-back zone while a line is under tension" },
        { en: "Losing focus on the winch controls while talking or looking elsewhere" },
        { en: "Delaying the report of a fouled or jammed line, hoping to clear it alone first" },
        { en: "Coiling lines carelessly under time pressure, creating a hazard for the next operation" },
      ],
      professionalTips: [
        { en: "Departure is not the time to improvise — if the sequence given doesn't make sense, ask before acting, not after" },
        { en: "Keep one hand free and your footing secure at all times; never let line-handling compromise your own balance" },
        { en: "Experienced ABs treat every line as if it could part — respect for tension under load never becomes routine, no matter how many times the manoeuvre is repeated" },
        { en: "A calm, clear voice on the radio is as important as a steady hand on the winch — panic in communication spreads faster than any mechanical failure" },
        { en: "Watch the whole operation, not only your own task. Good ABs develop situational awareness beyond their immediate station" },
      ],
      mapReferences: [
        { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
        { kind: "lesson", lessonId: "d4-l4", label: { en: "Navigation & Maneuvering" } },
      ],
    },

    navigation: {
      overview: { en: "During navigation, the AB's role shifts from active line-handling to sustained watchkeeping support: standing an effective lookout, steering when ordered, and assisting the OOW in maintaining a safe navigational watch. The work is less physically intense than mooring but demands continuous alertness over long periods — lapses in concentration here are harder to notice and can have equally serious consequences." },
      responsibilities: [
        { en: "Act as lookout, maintaining a continuous visual and aural watch for other vessels, navigational hazards, and any unusual conditions" },
        { en: "Steer the vessel on the course or heading ordered by the OOW, using wheel orders precisely and without deviation" },
        { en: "Report immediately anything sighted or heard that may affect the safety of navigation (lights, vessels, floating objects, sound signals)" },
        { en: "Observe and report changes in weather, visibility, or sea conditions that may affect navigation" },
        { en: "Assist the OOW with routine bridge tasks as instructed (e.g. logging, adjusting equipment, relaying messages)" },
        { en: "Carry out scheduled rounds of the deck and accessible spaces when assigned, checking for fire, flooding, security, or equipment issues" },
        { en: "Perform light maintenance or housekeeping tasks on the bridge or deck when not required for direct watch duties" },
        { en: "Hand over watch information accurately and completely at the end of a watch period" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task (foul weather gear, safety shoes; helmet/gloves for rounds involving machinery spaces)" },
        { en: "Steering wheel / steering control station" },
        { en: "Binoculars" },
        { en: "Bridge communication equipment (radio, sound-powered telephone, intercom)" },
        { en: "Torch/flashlight for rounds" },
      ],
      risks: [
        { en: "Loss of concentration during lookout duty, leading to a missed hazard, vessel, or signal" },
        { en: "Steering error under pressure (wrong wheel order executed, delayed response) affecting the vessel's safety" },
        { en: "Misreporting or failing to report a sighted hazard promptly" },
        { en: "Fatigue-related impairment during long or night watches" },
        { en: "Reduced situational awareness caused by over-familiarity during routine voyages" },
        { en: "Injury during rounds in poorly lit, wet, or confined spaces" },
        { en: "Miscommunication at watch handover, leading to loss of important information" },
      ],
      bestPractices: [
        { en: "Repeat every wheel order back to the OOW before and after executing it, to confirm mutual understanding" },
        { en: "Report anything sighted or heard immediately, even if uncertain of its significance — let the OOW decide its relevance" },
        { en: "Maintain lookout from a position with the best possible visibility, moving as needed rather than staying comfortable in one spot" },
        { en: "Keep bridge conversations professional and avoid unnecessary distractions during watchkeeping" },
        { en: "Stay physically alert during rounds — do not rush through checks to finish quickly" },
        { en: "Give a clear, complete handover at the end of watch, covering course, traffic, weather, and any ongoing issues" },
        { en: "Manage personal fatigue proactively — request relief or report drowsiness rather than pushing through unsafely" },
      ],
      commonMistakes: [
        { en: "Executing a wheel order without repeating it back for confirmation" },
        { en: "Becoming distracted (conversation, phone, daydreaming) during lookout duty" },
        { en: "Assuming another lookout or bridge team member has already noticed the same hazard" },
        { en: "Delaying or downplaying the report of something unusual, assuming it is not important" },
        { en: "Rushing through rounds without actually checking the items on the list" },
        { en: "Giving an incomplete or rushed handover at the end of watch" },
      ],
      professionalTips: [
        { en: "Good lookout is active, not passive — deliberately scan the horizon in sectors rather than staring blankly ahead" },
        { en: "When steering, anticipate the vessel's response rather than reacting only after it drifts off course" },
        { en: "If a wheel order seems unusual or unclear, query it immediately — a moment's clarification is far better than a wrong course held with confidence" },
        { en: "Treat every round as if it were the one that finds the real problem — complacency is the main reason rounds fail to catch early warning signs" },
        { en: "The best lookout is often the one who reports early, even if the observation later proves insignificant. Silence is a greater risk than a false alarm" },
      ],
      mapReferences: [
        { kind: "lesson", lessonId: "d1-l6", label: { en: "Practical Navigation" } },
        { kind: "lesson", lessonId: "d1-l5", label: { en: "Compass & Headings" } },
        { kind: "lesson", lessonId: "d1-l9" },
        { kind: "lesson", lessonId: "d1-l10" },
      ],
    },

    anchoring: {
      overview: { en: "Anchoring calls on the AB to prepare, operate, and monitor the anchoring equipment with precision, under the direct supervision of the OOW or Bosun. Unlike mooring alongside, the vessel is not made fast to a fixed structure — the vessel's safety depends on the anchor holding and on continuous monitoring of the anchoring situation. The AB's attentiveness at the windlass and during anchor watch is central to keeping the vessel safe at anchor." },
      responsibilities: [
        { en: "Prepare the windlass and anchor for letting go, removing securing devices as instructed" },
        { en: "Stand by at the forecastle, ready to let go the anchor on command" },
        { en: "Let go the anchor and pay out or heave in chain as directed, reporting the amount of chain out" },
        { en: "Report the direction and tendency of the chain (leading ahead, astern, up-and-down, etc.) as observed" },
        { en: "Monitor the anchor and chain for any sign of dragging, jerking, or abnormal strain" },
        { en: "Maintain continuous communication with the bridge throughout anchoring operations and immediately acknowledge instructions received" },
        { en: "Assist in weighing anchor, operating the windlass and reporting chain markings as it comes in" },
        { en: "Participate in anchor watch as assigned, reporting position checks and any change in weather or vessel movement" },
        { en: "Secure the anchor and windlass properly once the operation is complete" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Windlass and anchor chain" },
        { en: "Chain stopper / bow stopper" },
        { en: "Portable radio or established communication system with the bridge" },
        { en: "Torch/flashlight for night operations" },
      ],
      risks: [
        { en: "Crushing or entanglement injury from the anchor chain or windlass machinery" },
        { en: "Being struck by a suddenly running chain if the brake fails or is released unexpectedly" },
        { en: "Falling from the forecastle or into the hawse pipe area" },
        { en: "Failure to detect anchor dragging in time, risking grounding or collision" },
        { en: "Unexpected vessel movement caused by wind, current, or tidal changes during anchoring operations" },
        { en: "Noise-related communication breakdown at the windlass during letting go or heaving" },
        { en: "Fatigue or loss of attentiveness during extended anchor watch periods" },
      ],
      bestPractices: [
        { en: "Always confirm the windlass brake is properly set and tested before letting go" },
        { en: "Keep hands, feet, and clothing clear of the chain and windlass moving parts at all times" },
        { en: "Report chain tendency and amount out clearly and promptly, without waiting to be asked" },
        { en: "Never rush chain handling. Controlled operations are always safer than fast operations" },
        { en: "Take and log position checks at the required interval during anchor watch, not only when something seems wrong" },
        { en: "Report any unusual vibration, sound, or movement of the chain immediately, rather than waiting to confirm it first" },
        { en: "Keep the forecastle area clear and well organized before and during anchoring operations" },
      ],
      commonMistakes: [
        { en: "Standing too close to the chain or in line with the hawse pipe while it is running" },
        { en: "Failing to report chain tendency accurately, leading to a misjudged assessment of the vessel's position" },
        { en: "Becoming complacent during a long anchor watch and missing early signs of dragging" },
        { en: "Operating the windlass controls without a clear, confirmed signal from the bridge" },
        { en: "Leaving the windlass or chain insecure after completing the operation" },
      ],
      professionalTips: [
        { en: "Learn to read the chain as it comes in or goes out — its angle and behaviour tell you as much as any instrument" },
        { en: "During anchor watch, treat a quiet night the same as an active one; dragging often begins gradually and without obvious warning" },
        { en: "Good anchor work depends on clear, early communication — call out changes before they become problems, not after" },
        { en: "Respect the chain at all times: it carries enormous force silently, and complacency around it has cost lives on many vessels" },
        { en: "Experienced ABs learn to combine what they see, hear, and feel — the behaviour of the chain, the sound of the windlass, and the vessel's movement together provide the clearest picture of what the anchor is doing" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } }],
    },

    port_operations: {
      overview: { en: "While alongside, the AB's work shifts from manoeuvring to sustained presence and vigilance: standing gangway watch, maintaining security and access control, monitoring the moorings as conditions and tide change, and assisting with general deck operations associated with cargo handling or port activities, as applicable to the vessel type. Port stays bring the ship into contact with people and organizations outside the crew — stevedores, agents, authorities, visitors — and the AB is often the first point of contact and the first line of security for the vessel." },
      responsibilities: [
        { en: "Stand gangway watch, controlling access to the vessel and recording persons boarding or leaving as required" },
        { en: "Verify the identity and authorization of visitors, contractors, and shore personnel before granting access" },
        { en: "Monitor mooring lines regularly during the port stay, adjusting for tidal changes, tonnage changes, or passing traffic surge" },
        { en: "Assist with rigging and monitoring the gangway, ensuring it remains safely secured and adjusted for tide or draft changes" },
        { en: "Carry out general security rounds of the vessel as assigned, reporting any unauthorized access or suspicious activity" },
        { en: "Assist in general cargo-related tasks common across vessel types (e.g. hatch covers, lashing/securing equipment, deck preparation) under officer direction" },
        { en: "Maintain fire watch or pollution prevention watch during specific operations (e.g. bunkering, hot work) as assigned" },
        { en: "Maintain a clean and safe working area around the gangway and deck access points throughout the port stay" },
        { en: "Report any deficiency observed at the berth (fenders, shore ropes, gangway safety net, lighting) to the OOW or Bosun" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Gangway, gangway safety net, and associated rigging equipment" },
        { en: "Mooring lines and fenders" },
        { en: "Access control log / visitor log" },
        { en: "Portable radio for communication with the OOW or duty officer" },
      ],
      risks: [
        { en: "Unauthorized boarding or security breach if access control is not properly maintained" },
        { en: "Falling from the gangway, especially in poor weather, at night, or if the gangway is improperly rigged" },
        { en: "Mooring line failure from unmonitored changes in tide, draft, or traffic surge" },
        { en: "Slips, trips, and falls on a busy, cluttered deck during cargo-related activity" },
        { en: "Fire or pollution incident during high-risk operations (bunkering, hot work) if watch duties are neglected" },
        { en: "Distraction caused by multiple simultaneous activities during busy port operations, increasing the likelihood of overlooking hazards" },
        { en: "Miscommunication with shore personnel or agents due to language barriers or unclear procedures" },
      ],
      bestPractices: [
        { en: "Check the identity and purpose of every visitor before allowing access — never assume familiarity is authorization" },
        { en: "Inspect and adjust the gangway regularly throughout the stay, particularly as tide or draft changes" },
        { en: "Walk the full length of the mooring lines periodically rather than checking only from a fixed point" },
        { en: "Stay alert and present during fire or pollution watch duties — these are dedicated tasks, not something to combine with other work" },
        { en: "Keep the access log accurate and up to date at all times, not filled in retrospectively" },
        { en: "Remain approachable but professionally alert — good security relies on observation as much as on procedure" },
        { en: "Report unfamiliar or unusual activity around the vessel immediately, even if it later proves harmless" },
      ],
      commonMistakes: [
        { en: "Allowing access to visitors without proper verification because they \"look official\" or are expected" },
        { en: "Failing to re-check mooring lines and gangway rigging as tide or cargo operations change the vessel's draft" },
        { en: "Leaving the gangway or security watch unattended, even briefly, without arranging relief" },
        { en: "Treating fire or pollution watch as a passive formality rather than an active duty" },
        { en: "Not reporting minor deficiencies at the berth because they seem too small to matter" },
      ],
      professionalTips: [
        { en: "A port stay is not \"downtime\" for vigilance — more people move on and off the vessel in port than at any other time, and that is exactly when security matters most" },
        { en: "Get into the habit of physically checking mooring tension, not just looking at it — a line can look taut while already carrying far more load than it should" },
        { en: "Treat every visitor courteously but firmly; professionalism at the gangway reflects on the whole vessel" },
        { en: "When in doubt about anyone's authorization, escalate to the OOW rather than deciding alone — it is never the wrong call to ask" },
        { en: "Port routines change from berth to berth. Never assume today's operation will be identical to yesterday's — review the plan every time" },
      ],
      mapReferences: [
        { kind: "lesson", lessonId: "d4-l2", label: { en: "Port & VTS Communications" } },
        { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
      ],
    },

    ship_to_ship_operations: {
      overview: { en: "Ship-to-Ship (STS) operations bring two vessels together at sea or at anchor to transfer cargo, fuel, or supplies — bunkering, replenishment, or cargo transfer between hulls. Unlike alongside operations, both vessels are typically moving relative to the water and to each other, and the margin for error in fendering, mooring, and communication is smaller. The AB's role is centred on rigging and monitoring the interface between the two vessels, continuously monitoring and promptly reporting any change in their relative position or motion." },
      responsibilities: [
        { en: "Rig and deploy fenders between the vessels as directed, ensuring correct positioning and secure attachment" },
        { en: "Handle mooring lines and wires specific to the STS operation, following the sequence and timing instructed by the OOW/Bosun" },
        { en: "Monitor fender position and condition continuously throughout the operation, reporting any shifting, chafing, or damage" },
        { en: "Assist in rigging and monitoring transfer equipment (hoses, cargo transfer gear) as instructed, without operating systems outside AB competency" },
        { en: "Maintain continuous visual watch on the relative movement and separation between the two vessels" },
        { en: "Verify that the working area remains clear of unnecessary personnel and loose equipment throughout the STS operation" },
        { en: "Communicate promptly and clearly with the Bosun/OOW regarding any change in mooring tension, fender condition, or vessel movement" },
        { en: "Assist in emergency quick-release procedures if an emergency disconnection or separation is ordered" },
        { en: "Assist in un-rigging and recovering fenders and mooring equipment once the operation is complete" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest, and flotation aid where required)" },
        { en: "Fenders (pneumatic or other type as fitted) and fender lines" },
        { en: "Mooring lines and wires specific to STS operations" },
        { en: "Portable radio for communication with the OOW/Bosun and, where applicable, the other vessel's crew" },
        { en: "Emergency quick-release equipment" },
      ],
      risks: [
        { en: "Crushing injury between the two vessels or between the vessel and fenders if separation is lost" },
        { en: "Snap-back or line failure from lines and wires under unusually high or variable load" },
        { en: "Fender failure or displacement, allowing hull contact between vessels" },
        { en: "Falling overboard between vessels, with reduced chance of rescue due to the confined space" },
        { en: "Sudden relative movement of the vessels caused by swell, wind, or wake from passing traffic" },
        { en: "Failure of communication or radio equipment during a critical stage of the operation" },
        { en: "Miscommunication between the two vessels' crews, particularly where language or procedure differs" },
      ],
      bestPractices: [
        { en: "Check fender rigging and attachment points thoroughly before the operation begins, not only visually but physically" },
        { en: "Monitor the separation distance and relative motion of the vessels continuously — do not rely solely on the bridge team's assessment" },
        { en: "Report any change in fender condition or mooring load immediately, however minor it may appear" },
        { en: "Know the location and operation of emergency quick-release equipment before the operation starts, not only when needed" },
        { en: "Keep communication concise and standardized, particularly when working with a crew from another vessel or company" },
        { en: "Remain aware of changes in weather and sea state, as even small variations can quickly affect vessel movement during STS operations" },
        { en: "Stay clear of the space between the vessels whenever possible; work from a position that does not depend on the gap staying constant" },
      ],
      commonMistakes: [
        { en: "Treating fender checks as a one-time task rather than a continuous monitoring duty throughout the operation" },
        { en: "Underestimating how quickly relative vessel movement can change in swell or wake conditions" },
        { en: "Delaying the report of a fender or mooring issue, hoping it stabilizes on its own" },
        { en: "Not knowing where the emergency quick-release equipment is located or how to operate it before it is needed" },
        { en: "Working or standing in the gap between the vessels longer than necessary" },
      ],
      professionalTips: [
        { en: "STS work rewards preparation more than speed — a well-rigged fender system prevents far more problems than a fast reaction after something goes wrong" },
        { en: "Treat the space between two vessels as inherently dangerous at all times, not only when it visibly narrows" },
        { en: "When working with an unfamiliar crew or company, confirm communication procedures and signals before the operation begins, not during it" },
        { en: "Experienced ABs develop a feel for the rhythm of the two vessels moving together — any break in that rhythm is worth reporting immediately, even without a clear reason why" },
        { en: "Never hesitate to report something that \"doesn't feel right.\" Experience often begins with noticing subtle changes before they become obvious problems" },
      ],
    },

    maintenance: {
      overview: { en: "Maintenance is where the AB's daily contribution to the vessel is least visible but most constant: preserving the ship against the slow, continuous attack of corrosion, wear, and weathering. Unlike the other phases, this work is rarely urgent — its value lies in consistency and thoroughness over time, not in reacting to a single event. A vessel's condition after years at sea reflects, more than anything else, the quality of routine maintenance carried out by its deck crew." },
      responsibilities: [
        { en: "Carry out chipping, scaling, and rust removal on deck and superstructure surfaces as assigned" },
        { en: "Prepare surfaces properly (cleaning, priming) before painting, following the sequence instructed by the Bosun" },
        { en: "Apply paint and coatings correctly, protecting surrounding equipment, fittings, and walkways from overspray or drips" },
        { en: "Grease and lubricate deck machinery, wires, and moving equipment according to the maintenance schedule" },
        { en: "Inspect assigned equipment and structures for early signs of corrosion, wear, or damage, reporting findings to the Bosun" },
        { en: "Maintain mooring lines, wires, and rigging equipment in good condition, reporting wear or damage rather than continuing to use degraded equipment" },
        { en: "Protect surrounding equipment and the marine environment from contamination during maintenance activities, using covers or containment where required" },
        { en: "Keep deck stores, paint lockers, and maintenance equipment properly organized and stowed" },
        { en: "Carry out general housekeeping and upkeep of assigned areas as part of routine deck work" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, eye protection, respiratory protection where required)" },
        { en: "Chipping hammers, needle guns, wire brushes, scrapers" },
        { en: "Paint, primer, brushes, rollers, spray equipment" },
        { en: "Grease guns and lubricants" },
        { en: "Hand tools appropriate to the assigned task" },
      ],
      risks: [
        { en: "Eye or skin injury from chipping, scaling, or handling chemicals and paint" },
        { en: "Respiratory harm from paint fumes, rust dust, or inadequate ventilation in enclosed spaces" },
        { en: "Falls from height or overside when working on masts, superstructure, or the ship's side" },
        { en: "Musculoskeletal strain from repetitive or prolonged manual maintenance tasks" },
        { en: "Fire risk from improperly stored paint, solvents, or oily rags" },
        { en: "Slips on freshly painted or greased surfaces if the area is not properly marked" },
        { en: "Injury resulting from the improper use or poor condition of hand and power tools" },
      ],
      bestPractices: [
        { en: "Always use the correct PPE for the specific task, not a general assumption of what \"should be enough\"" },
        { en: "Prepare a surface fully and correctly before painting — a rushed preparation undermines even the best paint job" },
        { en: "Store paints, solvents, and oily rags in designated, ventilated locations, away from ignition sources" },
        { en: "Mark off freshly painted, greased, or wet areas clearly to prevent slips or accidental damage" },
        { en: "Report early signs of corrosion or wear immediately rather than waiting for the next scheduled inspection" },
        { en: "Inspect tools and equipment before use, removing damaged or defective items from service immediately" },
        { en: "Follow the maintenance schedule and grease/inspection intervals precisely, rather than by rough estimation" },
      ],
      commonMistakes: [
        { en: "Skipping proper surface preparation to save time before painting" },
        { en: "Leaving tools, paint tins, or oily rags unstowed after finishing a task" },
        { en: "Working without correct PPE because a task \"looks\" low-risk" },
        { en: "Ignoring early signs of corrosion because the area is not scheduled for inspection yet" },
        { en: "Overusing or underusing grease and lubricant rather than following the specified quantity and interval" },
      ],
      professionalTips: [
        { en: "Good maintenance is preventive, not corrective — the goal is to never let a small problem become a big one" },
        { en: "A ship that is well maintained is also a safer ship: rust hides structural weakness, and neglected machinery fails without warning" },
        { en: "Take pride in the finish of your work — a properly prepared and painted surface lasts years longer than a rushed one" },
        { en: "Treat every maintenance task as if the vessel's long-term condition depends on it, because in a very real sense, it does" },
        { en: "Experienced ABs never walk past a defect assuming someone else will report it. Small observations made today prevent major repairs tomorrow" },
      ],
      mapReferences: [
        { kind: "lesson", lessonId: "d6-l6" },
        { kind: "lesson", lessonId: "d6-l7" },
      ],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared — fire, flooding, man overboard, abandon ship, or any other alarm — the AB's role is not to decide what response is needed, but to react immediately, correctly, and without hesitation according to the vessel's emergency organization. Detailed procedures for each type of emergency are covered in the Safety curriculum; this phase focuses on how an AB is expected to behave once an emergency begins — the discipline, speed, and communication that make the difference between an organized response and confusion." },
      responsibilities: [
        { en: "Recognize emergency alarms and signals immediately and respond without waiting for confirmation or further instruction" },
        { en: "Proceed directly and promptly to the assigned emergency station, following the vessel's muster list" },
        { en: "Report to the designated team leader on arrival, confirming presence and readiness" },
        { en: "Follow instructions precisely and without improvisation, even under stress or incomplete information" },
        { en: "Use assigned emergency equipment correctly, based on prior training and drills" },
        { en: "Protect yourself first so that you remain capable of assisting others throughout the emergency response" },
        { en: "Assist and account for other crew members within the assigned team, reporting anyone missing or in difficulty" },
        { en: "Communicate clearly and calmly with the team leader or bridge, using established terms and procedures" },
        { en: "Remain at post or continue assigned tasks until explicitly released or redirected by the team leader" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list (firefighting outfit, immersion suit, lifejacket, etc.)" },
        { en: "Portable radio or other communication equipment designated for the emergency team" },
        { en: "Emergency equipment specific to the assigned role (as covered in Safety training — e.g. fire hose, EEBD, rescue equipment)" },
      ],
      risks: [
        { en: "Delayed or hesitant response, reducing the effectiveness of the vessel's overall emergency action" },
        { en: "Confusion or miscommunication under stress, leading to incomplete or inaccurate reporting" },
        { en: "Acting outside instructions or improvising beyond one's role, disrupting the team's coordinated response" },
        { en: "Failure to account for all team members, delaying recognition of someone missing or injured" },
        { en: "Panic or loss of composure affecting both personal safety and the wider team's effectiveness" },
        { en: "Loss of situational awareness due to stress, noise, or rapidly changing conditions" },
      ],
      bestPractices: [
        { en: "Treat every drill with the same seriousness as a real emergency — muscle memory built in drills is what holds up under real pressure" },
        { en: "Move quickly but under control to the muster station; running carelessly creates new hazards" },
        { en: "Report clearly and factually — state what you observe, not what you assume" },
        { en: "Stay within your assigned role and station unless explicitly redirected" },
        { en: "Support and reassure less experienced crew members without compromising your own readiness to act" },
        { en: "Maintain awareness of your surroundings while remaining focused on your assigned duty" },
      ],
      commonMistakes: [
        { en: "Hesitating to respond while waiting for someone else to confirm the alarm is real" },
        { en: "Leaving the muster station or assigned post without being released" },
        { en: "Reporting vague or incomplete information instead of clear, specific observations" },
        { en: "Attempting to handle a situation alone rather than working within the team structure" },
        { en: "Treating drills as a routine formality rather than genuine practice" },
      ],
      professionalTips: [
        { en: "The best response in an emergency is rarely improvised — it is the result of having taken every prior drill seriously" },
        { en: "Speak clearly and briefly during an emergency; long explanations slow down the team's response" },
        { en: "Confidence under pressure comes from knowing your role so well that you don't have to think about it — that only comes from practice" },
        { en: "A calm, disciplined AB at their post is often what allows the rest of the team to stay focused and effective" },
        { en: "Discipline is contagious in an emergency. When one crew member remains calm and follows procedures, others are more likely to do the same" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l2" }, { kind: "lesson", lessonId: "s5-l1" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "While letting go the last spring line during departure, the line suddenly parts under load, whipping back across the deck." },
      mission: { en: "React safely, protect yourself and nearby crew, and alert the Bosun/OOW immediately." },
      expectedActions: [
        { en: "Move clear of the line's path the moment it parts" },
        { en: "Check yourself and nearby crew for injury" },
        { en: "Warn nearby personnel to stay clear of the area until the situation is under control" },
        { en: "Report \"line parted\" immediately over radio, specifying which line and its condition" },
        { en: "Do not attempt to retrieve or handle the parted line until instructed" },
      ],
      why: [{ en: "A parted line under tension can travel with lethal force across a wide arc — personal safety comes before any concern about the equipment or the delay caused." }],
      commonMistakes: [
        { en: "Freezing in place instead of moving clear" },
        { en: "Attempting to grab or stop the line as it releases" },
        { en: "Delaying the report while assessing the situation alone" },
      ],
      safetyPoints: [{ en: "Always work outside the identified snap-back zone before a line is under load — this scenario is exactly why that practice exists." }],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } }],
    },
    {
      situation: { en: "During a night anchor watch, you notice the vessel's position has shifted further than expected between two routine checks, and the chain feels different underfoot at the windlass." },
      mission: { en: "Confirm and report the observation promptly and accurately, without delaying while seeking absolute certainty." },
      expectedActions: [
        { en: "Take an immediate position fix and compare it to the last logged position" },
        { en: "Check chain tendency and any unusual vibration" },
        { en: "Report to the OOW immediately with the specific observation (\"position has moved approximately X, chain tendency has changed\"), not a vague concern" },
      ],
      why: [{ en: "Dragging anchor is a slow-developing but serious risk — early, specific reporting gives the OOW the maximum time to assess and respond before the situation becomes critical." }],
      commonMistakes: [
        { en: "Waiting for the next scheduled check to confirm before reporting" },
        { en: "Reporting only a vague feeling (\"something seems off\") instead of concrete observations" },
        { en: "Assuming a slight shift is within normal swing" },
      ],
      safetyPoints: [{ en: "Anchor watch requires treating every check with the same attention, especially during quiet periods — dragging rarely announces itself dramatically." }],
      mapReferences: [
        { kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } },
        { kind: "lesson", lessonId: "deck_meteo_l5", label: { en: "Tropical and Dangerous Phenomena" } },
      ],
    },
    {
      situation: { en: "A person you do not recognize approaches the gangway during a port stay, claiming to be an agent's representative but without visible identification or prior notice from the OOW." },
      mission: { en: "Control access to the vessel without creating unnecessary conflict, while ensuring no unauthorized boarding occurs." },
      expectedActions: [
        { en: "Politely but firmly request identification and the purpose of the visit" },
        { en: "Remain courteous throughout the interaction, regardless of the visitor's attitude" },
        { en: "Do not allow boarding until authorization is confirmed" },
        { en: "Contact the OOW immediately to verify before granting access" },
        { en: "Log the visitor once cleared" },
      ],
      why: [{ en: "Gangway watch is the vessel's first line of security — a moment of hesitation or misplaced courtesy is exactly how unauthorized access happens." }],
      commonMistakes: [
        { en: "Allowing access because the person \"seems legitimate\" or is in a hurry" },
        { en: "Failing to verify with the OOW before granting boarding" },
        { en: "Not logging the visitor because the interaction felt informal" },
      ],
      safetyPoints: [{ en: "Never let social pressure override the verification procedure — professionalism and firmness are not in conflict." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },
  ],

  professionalTips: [
    { en: "Respect for the sea and for the vessel is not optional — the moment routine breeds carelessness is the moment accidents happen." },
    { en: "Always confirm before acting when there is any doubt about an order. A brief clarification costs seconds; a wrong action can cost far more." },
    { en: "Take pride in every task, however small — coiling a line neatly, keeping a clean workspace, or checking a detail twice are all part of professional seamanship, not extra effort." },
    { en: "Learn from every experienced Bosun, AB, or officer you sail with. Every vessel and every crew has something to teach, even after years at sea." },
    { en: "Report honestly, including your own mistakes. A crew that hides small errors eventually misses a big one." },
    { en: "Physical fitness and rest matter as much as skill — a tired or unfit AB is a liability to the whole crew, however capable on paper." },
    { en: "Treat every piece of equipment as if your life, or someone else's, depends on its condition — because it often does." },
    { en: "Consistency builds trust faster than any single act of skill. Officers and Bosuns rely most on ABs whose standard of work never varies." },
    { en: "Professional seamanship is built on discipline, humility, and continuous learning. No matter how experienced you become, there is always something new to observe, improve, or learn at sea." },
  ],

  professionalMindset: [
    { en: "Always plan with a margin of safety. An experienced AB never assumes the minimum will be enough — extra chain, extra line, extra time, extra caution are what absorb the unexpected. Planning to the exact limit leaves no room for error." },
    { en: "Anticipate before you are asked. Rather than waiting for an instruction, a professional AB starts thinking one step ahead: what will be needed next, what could go wrong, what should already be ready." },
    { en: "Protect the equipment before it needs repairing. Prevention is always cheaper, safer, and faster than correction. An experienced AB thinks in terms of avoiding damage, not just fixing it afterward." },
    { en: "Put the safety of the crew before your own comfort or convenience. A professional AB accepts extra effort, discomfort, or delay if it means the team stays safer — this is a basic expectation of shipboard life, not an exceptional virtue." },
    { en: "Assume conditions can change quickly. Weather, traffic, mechanical status, and even people's attention can shift without warning. A professional mindset stays ready to adjust rather than assuming today will unfold exactly as planned." },
    { en: "Think in terms of what could go wrong, not just what should go right. This is not pessimism — it is preparation. Experienced seafarers habitually ask \"what if\" before starting a task, not after something fails." },
    { en: "Accept correction without taking it personally. Being corrected by a Bosun or officer is part of how skill is built at sea, not a judgment of character. A professional AB listens, adjusts, and moves on." },
    { en: "Never let confidence replace verification. Even a task performed a hundred times before deserves the same check as the first time — familiarity is where mistakes quietly creep in." },
  ],

  professionalDocumentation: [
    { en: "Deck Logbook — The AB does not maintain the logbook directly, but contributes the information recorded in it: times of mooring operations, anchor letting go/weighing, watch handovers, and any incident observed. Accuracy in what is reported directly affects the accuracy of what is logged." },
    { en: "Checklists (departure, arrival, anchoring, STS, safety rounds) — The AB is often the one physically completing checklist items. A checklist is only as reliable as the honesty and thoroughness of the person completing it — ticking a box without actually verifying the item defeats its purpose." },
    { en: "Watch handover notes — Even where the OOW holds ultimate responsibility for the watch record, the AB's accurate verbal handover (course, traffic, ongoing tasks, anything unusual) is what allows that record to be correct." },
    { en: "Maintenance and defect reports — When the AB identifies wear, damage, or a defect, reporting it clearly and specifically (what, where, how severe) ensures it is properly recorded and actioned, rather than lost in a vague verbal mention." },
    { en: "Access/visitor logs (during port operations) — The AB completing gangway watch is directly responsible for the accuracy of this log — who boarded, when, and for what purpose — even though it may be reviewed or countersigned by an officer." },
    { en: "Why this matters: Ship's records are not paperwork for its own sake — they are the vessel's legal and operational memory. An AB who understands this treats every contribution to documentation — however small — as part of the vessel's accountability, not as an administrative afterthought." },
  ],

  environmentalResponsibilities: [
    { en: "Waste segregation and disposal — Sort waste correctly according to the vessel's Garbage Management Plan and dispose of it only in designated receptacles. Never discard any waste overboard without explicit confirmation that it is permitted under MARPOL Annex V for the current location." },
    { en: "Oil and fuel handling — Handle oil, fuel, and lubricants with care to prevent spills, particularly during bunkering, transfer, or maintenance work. Use drip trays and containment where required, and report any leak or spill immediately, however small. Stop work and notify the responsible officer immediately if a spill cannot be safely contained." },
    { en: "Prohibited discharges — Never discharge oil, oily water, garbage, or chemicals overboard except through equipment and procedures explicitly authorized and operated under an officer's direction. What may seem like a minor shortcut can constitute a serious MARPOL violation with legal consequences." },
    { en: "Reporting environmental incidents — Report any sighting of a sheen on the water, an unexplained smell, or any sign of contamination immediately to the OOW or Bosun, regardless of whether you caused it or simply observed it. Record or preserve relevant information if instructed, without attempting to investigate beyond your assigned role." },
    { en: "Sediment and residue control — Keep deck areas, drains, and scuppers clear of paint chips, rust, oil residue, or debris that could enter the water, particularly during maintenance and painting work." },
    { en: "Why this matters: Environmental protection is part of everyday seamanship, not a separate activity; small routine actions performed correctly every day prevent the majority of pollution incidents. An AB who treats these rules seriously protects the environment, the vessel's certification, the company's reputation, and their own career." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Carry out assigned tasks independently once properly instructed, without requiring step-by-step supervision" },
      { en: "Take the wheel and execute steering orders under the direction of the OOW" },
      { en: "Stand an independent lookout and report anything observed directly to the OOW" },
      { en: "Operate mooring winches, windlass, and deck machinery as instructed and trained" },
      { en: "Verify visitor identification at the gangway and control access according to established procedure" },
      { en: "Report a defect, hazard, or abnormal condition directly to the Bosun or OOW at any time, without needing prior permission to speak up" },
      { en: "Refuse to proceed with a task if you believe it to be unsafe, and report your concern immediately to the Bosun or OOW" },
    ],
    youCannot: [
      { en: "Decide independently to deviate from an order or a planned sequence of operations, even if you believe you have a better method" },
      { en: "Authorize the boarding of a visitor without confirmation from the OOW or duty officer" },
      { en: "Discharge oil, oily water, garbage, or any regulated substance overboard without explicit authorization and officer supervision" },
      { en: "Sign, validate, or certify official ship's documents or records as the final authority" },
      { en: "Take command of an emergency response or redirect other crew members outside your own assigned role" },
      { en: "Operate equipment or systems outside your training and certification, even if technically capable of doing so" },
      { en: "Leave an assigned post (watch, gangway, muster station) without being properly relieved or explicitly released" },
      { en: "Bypass the chain of command by issuing operational instructions to personnel outside your assigned responsibilities, except where immediate action is required to prevent imminent injury or serious danger" },
    ],
  },

  commonMistakes: [
    { en: "Assuming instead of confirming — Acting on what you think was said or meant, rather than confirming it, is one of the most common sources of error at every stage of shipboard work." },
    { en: "Letting familiarity replace verification — Treating a routine task as \"already known\" and skipping the checks that would normally apply is how experienced crew members, not just beginners, end up involved in incidents." },
    { en: "Staying silent about uncertainty — Not asking a question or not reporting doubt, out of concern about appearing inexperienced, removes a safety layer that exists precisely for that situation." },
    { en: "Underestimating small deviations — Treating a minor delay, a slightly off procedure, or a small deficiency as insignificant, when small deviations are frequently how larger incidents begin." },
    { en: "Working outside your assigned role under pressure — Taking on a task, a decision, or an instruction that belongs to someone else, even with good intentions, disrupts the coordination the whole team depends on." },
    { en: "Prioritizing speed over correctness — Rushing a task to finish faster, when the actual time saved is minimal compared to the risk introduced by skipping a step." },
    { en: "Losing situational awareness — Becoming so focused on a single task that you stop observing what is happening around you, missing changes that may affect your own safety or the operation as a whole." },
    { en: "Failing to report your own mistakes — Concealing or minimizing an error you made, rather than reporting it, prevents the team from correcting its consequences and learning from it." },
  ],

  careerProgression: [
    { en: "Next role: Bosun — the natural progression from Able Seaman, taking on responsibility for organizing and supervising deck work, mentoring junior ratings, and acting as the main link between deck officers and the ratings on deck." },
    { en: "Skills to develop: Delegation and task organization (moving from executing tasks to assigning and overseeing them); clear written and verbal communication for coordinating a team; deeper technical judgment on maintenance planning and equipment condition; the ability to train and correct junior crew constructively; situational awareness and operational planning — coordinating several tasks simultaneously while maintaining an overall view of the operation and the safety of the team." },
    { en: "Recommended experience: A solid period serving as AB across a broad range of deck operations (mooring, anchoring, navigation watch, port operations, maintenance, and emergency drills). Exposure to specialized operations such as STS, offshore support, or tanker operations further strengthens readiness where relevant to the vessel type." },
    { en: "Certificates typically required: Certificates required vary by flag State, company policy, and national administration. Typical requirements include valid STCW certification appropriate to the role, together with any additional endorsements required for the vessel type or trade." },
    { en: "Recommended MAP courses: Role On Board – Bosun (when available); Seamanship (operation coordination); Leadership Fundamentals; Specialized Operations (depending on vessel type); Career Navigator (career progression planning)." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
    { kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } },
    { kind: "lesson", lessonId: "d6-l1", label: { en: "Ropes & Fibres" } },
    { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping" } },
    { kind: "lesson", lessonId: "d6-l6", label: { en: "Basic Maintenance & Greasing" } },
    { kind: "lesson", lessonId: "d6-l7", label: { en: "Painting & Corrosion Prevention" } },
    { kind: "lesson", lessonId: "s3-l1", label: { en: "Scene Safety & Primary Survey (DRABC)" } },
    { kind: "lesson", lessonId: "s4-l1", label: { en: "Fire Behaviour & Early Fire Recognition" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — deck and seamanship terminology" } },
    { kind: "external", externalCode: "SMCP", label: { en: "SMCP (Standard Marine Communication Phrases) reference" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_BOSUN", label: { en: "Role On Board — Bosun (when published)" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Mooring, unmooring, and anchoring operations as directed" },
      { en: "Steering and lookout duties during navigation watch" },
      { en: "Deck maintenance, painting, and corrosion prevention tasks" },
      { en: "Gangway watch and access control during port stays" },
      { en: "Fender rigging and line handling during STS operations" },
      { en: "Assigned emergency response actions at my designated station" },
    ],
    iMonitor: [
      { en: "Condition and tension of mooring lines throughout port stays and anchoring" },
      { en: "Anchor chain tendency and vessel position during anchor watch" },
      { en: "Fender condition and vessel separation during STS operations" },
      { en: "Equipment condition during routine rounds and maintenance work" },
      { en: "Access points and unusual activity around the vessel while on security duty" },
      { en: "The safety of my immediate working area before, during, and after every assigned task" },
    ],
    iReport: [
      { en: "Any defect, damage, or abnormal condition observed in equipment or machinery" },
      { en: "Any hazard, unusual sighting, or safety concern during watchkeeping or rounds" },
      { en: "Any sign of anchor dragging, mooring line failure, or vessel movement outside expected limits" },
      { en: "Any environmental incident, spill, or pollution risk observed" },
      { en: "My own errors or mistakes, without concealment or delay" },
    ],
    iDoNotAuthorize: [
      { en: "Boarding of visitors or contractors without officer confirmation" },
      { en: "Discharge of oil, oily water, garbage, or regulated substances overboard" },
      { en: "Deviation from an instructed sequence of operations based on personal judgment alone" },
      { en: "Final validation or certification of official ship's documents and records" },
      { en: "Direction of other crew members or emergency response efforts outside my assigned role" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "[placeholder] Deck layout showing typical mooring stations and equipment positions for an AB." } },
    { kind: "diagram", caption: { en: "[placeholder] Snap-back zone illustration for mooring line operations." } },
    { kind: "image", caption: { en: "[placeholder] Correctly rigged fender and mooring line setup during STS operations." } },
    { kind: "video", caption: { en: "[placeholder] Demonstration of proper line coiling and flaking technique." } },
    { kind: "document", caption: { en: "[placeholder] Sample gangway visitor log format." } },
  ],
};

// ── BOSUN ─────────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-25_role-on-board-bosun-mapreferences.md) and the
// Product Owner's final decisions on that report. Locations with no
// validated correspondence are left as mapReferences: [] intentionally
// (candidates for a future Leadership/Supervision module, not filled
// with approximate matches).
const BOSUN_CARD: RoleOnBoardCard = {
  rankId: "bosun",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Bosun (Boatswain) organizes, allocates and supervises the execution of the daily deck work planned by the deck officers. Unlike the AB, who executes assigned tasks, the Bosun translates officers' instructions into organized, safe, and properly executed deck work carried out by the deck crew." },
    { en: "The Bosun is expected to ensure that work is completed safely, efficiently, and to the standard expected by the deck officers before reporting it as complete." },
    { en: "The Bosun does not decide navigational strategy or operational priorities — those remain with the OOW and Chief Officer — but is the person officers rely on to keep deck work organized and to standard, without direct officer supervision at every step." },
    { en: "A capable Bosun combines strong practical seamanship (built through years as an AB) with the ability to organize a team, train junior ratings, and maintain discipline and standards on deck." },
    { en: "The Bosun's authority is operational and practical, not decisional: they enforce standards, allocate work, and escalate anything beyond their authority — they do not set the vessel's course, approve deviations from procedure, or make decisions reserved for the officer corps." },
    { en: "The Bosun leads by example. Junior ratings learn not only from the Bosun's instructions, but also from the Bosun's own professional conduct, discipline, and seamanship." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Chief Officer (primary)" },
      { en: "OOW during watch-related deck operations" },
    ],
    worksWith: [
      { en: "Deck officers for daily work planning" },
      { en: "AB and OS teams for task execution" },
      { en: "Engine department counterparts during joint operations (mooring assistance, STS, emergency drills)" },
    ],
    mentors: [
      { en: "Experienced Bosuns (during the seafarer's development toward the role)" },
      { en: "Chief Officer" },
    ],
    supports: [
      { en: "AB, OS, and Deck Cadets — the Bosun trains, corrects, and organizes their daily work, ensuring junior ratings understand both the task and the safety expectations" },
    ],
  },

  professionalSkills: [
    { label: { en: "Team organization & delegation" } },
    { label: { en: "Communication with deck officers" }, mapReferences: [{ kind: "lesson", lessonId: "d4-l1" }, { kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Deck work planning" } },
    { label: { en: "Training junior ratings" } },
    { label: { en: "Advanced seamanship (mooring, anchoring, rigging)" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l1" }, { kind: "lesson", lessonId: "d6-l2" }, { kind: "lesson", lessonId: "d6-l3" }, { kind: "lesson", lessonId: "d6-l4" }] },
    { label: { en: "Equipment oversight" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }] },
    { label: { en: "Worksite coordination" } },
    { label: { en: "Safety leadership" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l6" }] },
    { label: { en: "Reporting" }, mapReferences: [{ kind: "lesson", lessonId: "d4-l1" }, { kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Conflict resolution" } },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Bosun translates the Chief Officer's instructions into an organized deck work plan: assigning mooring stations, allocating preparation tasks among the deck crew, and personally verifying that the work has been carried out correctly before reporting readiness. The Bosun does not typically prepare each piece of equipment personally — the value added is in organizing the team efficiently, catching gaps before they become problems, and standing as the operational point of accountability for deck readiness before departure." },
      responsibilities: [
        { en: "Receive departure instructions and priorities from the Chief Officer and translate them into specific task assignments for the deck crew" },
        { en: "Allocate ABs and OS to mooring stations and preparation tasks based on experience and the demands of the operation" },
        { en: "Personally verify the condition of mooring equipment through inspection and crew feedback before authorizing its operational use within the team's preparation" },
        { en: "Verify that assigned tasks (line preparation, fender rigging, deck walk-round) have been completed to standard before reporting readiness upward" },
        { en: "Brief the deck crew on the specific departure plan — sequence, expected conditions, any non-routine elements" },
        { en: "Confirm with the Chief Officer or OOW that the deck team is ready and stationed, and relay any last-minute equipment or personnel concern" },
        { en: "Ensure PPE compliance and safe working practices are respected across the team during preparation" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Mooring lines, wires, winches, windlass — verified at organizational/oversight level, not only hands-on" },
        { en: "Fenders and deck lighting — verified as part of the readiness check" },
        { en: "Departure checklist / work list" },
        { en: "Communication equipment (radio) for coordinating with the bridge and the deck team simultaneously" },
      ],
      risks: [
        { en: "A gap in task allocation leading to an unprepared mooring station discovered too late" },
        { en: "Reporting readiness without having personally verified the work, based only on assumption that assigned tasks were completed" },
        { en: "Crew members assuming someone else has completed a critical preparation task because responsibilities were not clearly assigned" },
        { en: "Miscommunication between the Bosun's instructions and the crew's understanding, leading to incomplete preparation" },
        { en: "Injury to a crew member due to inadequate briefing on a non-routine element of the departure plan" },
        { en: "Equipment defects missed because oversight relied solely on the crew's own reporting rather than independent verification" },
      ],
      bestPractices: [
        { en: "Always verify completed work personally rather than relying solely on a crew member's report that a task is 'done'" },
        { en: "Brief the team clearly before work begins, not only afterward when correcting mistakes" },
        { en: "Allocate tasks according to each crew member's experience — pair less experienced ratings with more experienced ones on critical stations" },
        { en: "Walk the entire deck before reporting readiness — never assume that one completed area reflects the condition of the whole operation" },
        { en: "Report readiness to the bridge only once genuinely confident in the team's preparation, not under time pressure alone" },
      ],
      commonMistakes: [
        { en: "Assigning tasks without clearly briefing the sequence or expectations" },
        { en: "Reporting the deck 'ready' without a personal verification pass" },
        { en: "Overloading experienced crew members while under-supervising less experienced ones" },
        { en: "Becoming the best worker instead of remaining the team leader" },
        { en: "Failing to escalate an equipment concern because it seems minor at the organizational level" },
        { en: "Losing track of the overall picture while personally absorbed in a single task" },
      ],
      professionalTips: [
        { en: "A Bosun's real preparation work happens before the crew's — anticipate what could go wrong in the plan itself, not only in its execution" },
        { en: "Trust your team, but verify their work — this is not a lack of confidence, it is the standard expected of the role" },
        { en: "The way you brief a team shapes how well they execute — a rushed, unclear briefing produces a rushed, unclear departure" },
        { en: "An excellent Bosun is measured not by how hard they work alone, but by how consistently the entire deck team performs under their leadership" },
      ],
      mapReferences: [],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Bosun coordinates the mooring stations in real time, relaying orders from the OOW to the deck team and ensuring each station executes correctly and safely. Unlike the AB, who handles a single station, the Bosun holds situational awareness across the whole operation — maintaining an accurate operational picture of every mooring station so the bridge can make informed decisions throughout the manoeuvre." },
      responsibilities: [
        { en: "Position at the most critical or complex mooring station, or move between stations as needed to maintain oversight of the whole operation" },
        { en: "Relay orders from the OOW/bridge to each mooring station clearly and without delay" },
        { en: "Continuously monitor communications to ensure bridge orders are correctly understood and acknowledged by every station" },
        { en: "Confirm each station's status back to the bridge (line away, station clear, equipment issue) in a consolidated, reliable manner" },
        { en: "Monitor the whole deck team's execution, correcting technique or positioning in real time if a station is not performing safely" },
        { en: "Resolve routine deck-level issues within Bosun authority and immediately escalate any issue affecting the overall manoeuvre, vessel safety, or bridge decision-making" },
        { en: "Ensure PPE and snap-back zone discipline are respected across all stations simultaneously, not only the one directly supervised" },
        { en: "Report any equipment failure or safety concern to the OOW immediately, with enough detail for the bridge to assess the situation" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Portable radio — the primary tool of the role during this phase, used continuously to relay information between stations and the bridge" },
        { en: "Station list / mooring arrangement plan" },
        { en: "Mooring lines, wires, winches, capstan — overseen across multiple stations rather than operated directly at every moment" },
        { en: "Fenders" },
      ],
      risks: [
        { en: "Loss of overview if the Bosun becomes absorbed in a single station's execution during a critical moment elsewhere" },
        { en: "Delayed or garbled relay of bridge orders to a station, causing a mistimed action" },
        { en: "Multiple stations requesting attention simultaneously, causing prioritization errors" },
        { en: "Failure to notice a developing hazard at a station not currently being directly observed" },
        { en: "Making a decision beyond Bosun authority (e.g. altering the departure sequence) instead of escalating to the OOW" },
        { en: "Same physical risks as the AB at any station personally supervised (snap-back, crushing, falling) — the Bosun is not exempt from these simply by virtue of rank" },
      ],
      bestPractices: [
        { en: "Position yourself where you can see or reach the most stations, not necessarily the busiest one" },
        { en: "Repeat back every bridge order before relaying it to a station, to avoid introducing an error in the relay itself" },
        { en: "Actively move between stations during the operation rather than remaining fixed at one point throughout" },
        { en: "Make quick operational decisions confidently within your authority, but escalate anything touching the sequence or safety of the overall manoeuvre" },
        { en: "Maintain calm and consistent radio discipline — your tone influences the entire deck team's confidence during the manoeuvre" },
        { en: "Keep the bridge informed proactively — a station gone quiet is often more concerning than one reporting a problem" },
      ],
      commonMistakes: [
        { en: "Staying at one station for the entire manoeuvre and losing awareness of the others" },
        { en: "Relaying an order inaccurately or with unnecessary delay" },
        { en: "Hesitating to make a minor on-the-spot decision that clearly falls within Bosun authority, slowing the whole operation" },
        { en: "Trying to solve every problem personally instead of directing the appropriate crew member to resolve it" },
        { en: "Failing to notice or address unsafe technique at a station because attention is fixed elsewhere" },
        { en: "Not reporting a resolved issue back to the bridge, leaving the OOW with an outdated picture of the deck's status" },
      ],
      professionalTips: [
        { en: "During departure, your eyes and radio matter more than your hands — the value you add is coordination, not personally handling every line" },
        { en: "A good Bosun is heard clearly and briefly on the radio — clarity under time pressure is a skill worth deliberately practicing" },
        { en: "Trust your ABs to execute; your job is to watch the whole picture they cannot see from their individual stations" },
        { en: "The stations that never call in are not necessarily the ones with nothing to report — check on them, don't just wait to be told" },
        { en: "The bridge should never have to guess what is happening on deck — your communication keeps both teams operating as one" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4" }, { kind: "lesson", lessonId: "d4-l4" }],
    },

    navigation: {
      overview: { en: "During navigation, the Bosun's presence on the bridge is occasional rather than continuous — the watch itself is run by the OOW, with an AB at the wheel and on lookout. The Bosun's role during this phase centres on helping implement the deck officers' watch and work schedule by organizing the deck crew, monitoring fatigue in daily operations, and ensuring that assigned duties are carried out by fit and properly briefed crew members." },
      responsibilities: [
        { en: "Implement and coordinate the deck crew's watch and daywork rotation established by the Chief Officer" },
        { en: "Assign and brief crew members sent on scheduled rounds, and review their reports for completeness before passing them to the OOW" },
        { en: "Coordinate routine daywork (maintenance, painting, housekeeping) so it does not conflict with watch duties or rest periods" },
        { en: "Step in personally to take the wheel, stand lookout, or carry out a round if the schedule or an unexpected absence requires it" },
        { en: "Monitor the general fitness and alertness of the deck team, addressing fatigue or performance concerns before they affect watch safety" },
        { en: "Report any fatigue concern that cannot be resolved through routine team organization to the Chief Officer or OOW" },
        { en: "Relay any recurring or pattern-based issue observed during rounds (e.g. repeated minor defects in the same area) to the OOW or Chief Officer, rather than treating each report in isolation" },
        { en: "Ensure PPE and safe procedure are respected during rounds and daywork, even when not personally present at every task" },
      ],
      equipment: [
        { en: "Watch and rest-hour schedule / rotation plan" },
        { en: "Work schedule / daily work board" },
        { en: "Personal protective equipment appropriate to the task if personally standing in" },
        { en: "Torch/flashlight, radio — if personally carrying out a round or relief duty" },
        { en: "Rounds checklist / reporting log used by the deck crew" },
      ],
      risks: [
        { en: "Fatigue accumulating across the deck crew due to poor rotation planning, increasing the risk of a lapse during watch duties" },
        { en: "A recurring minor issue going unnoticed as a pattern because each round report is reviewed in isolation" },
        { en: "Routine work gradually drifting into watch time because priorities were not continuously adjusted" },
        { en: "A gap in rounds or watch coverage caused by unclear rotation planning, particularly during crew changes or absences" },
        { en: "Losing track of individual crew members' rest status while focused on the day's task list" },
        { en: "Same physical risks as the AB when personally standing a watch or round" },
      ],
      bestPractices: [
        { en: "Plan the rotation with margin, not to the exact legal minimum — unexpected absences or delays should not immediately create a rest violation" },
        { en: "Review rounds reports for patterns over time, not only for the specific issue mentioned in a given report" },
        { en: "Walk the deck regularly rather than managing the team only through reports" },
        { en: "Keep daywork flexible enough to be paused or reassigned if it starts to encroach on rest periods or watch coverage" },
        { en: "When personally standing in for a watch or round, apply the exact same standard expected of any AB — rank does not lower the bar" },
      ],
      commonMistakes: [
        { en: "Planning the rotation around workload alone, without sufficient margin for rest requirements" },
        { en: "Treating each round report as a standalone item rather than watching for recurring patterns" },
        { en: "Prioritizing daywork completion over protecting rest periods" },
        { en: "Assuming an experienced AB needs less supervision and gradually losing awareness of that person's workload or fatigue" },
        { en: "Lowering personal standards when stepping in briefly, on the assumption that 'it's only for a short while'" },
      ],
      professionalTips: [
        { en: "A tired crew is an unreliable crew, no matter how skilled — protecting rest is as much a safety responsibility as any physical task" },
        { en: "Patterns matter more than single reports — three small defects reported separately in the same area are one real problem, not three" },
        { en: "The Bosun who checks in on the crew before being asked builds more trust than one who only reacts to complaints" },
        { en: "When you occasionally step into an AB's duties, do it to support the team — not because you have stopped leading it" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l10" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Bosun takes personal charge at the forecastle — this is one of the phases where the Bosun's own hands-on judgment matters most, personally directing and, where appropriate, operating the windlass while continuously interpreting the behaviour of the anchor chain and the forecastle situation. At the same time, the Bosun remains the deck team's single voice to the bridge, consolidating what is observed at the forecastle into clear, timely reports that let the OOW manage the anchoring operation with confidence." },
      responsibilities: [
        { en: "Verify that the forecastle is fully prepared before the anchor is walked out or let go, including personnel readiness, equipment readiness and communication checks" },
        { en: "Personally take charge of the windlass operation, directing the exact pace of paying out or heaving in chain based on the bridge's instructions and the forecastle team's observations" },
        { en: "Position and brief the forecastle team clearly before the operation, assigning specific observation and safety roles (chain tendency, brake, area clearance)" },
        { en: "Relay chain-out amount, tendency, and any abnormal behaviour to the bridge promptly and precisely, consolidating the team's observations into a single clear report" },
        { en: "Personally judge and confirm when the anchor is holding versus dragging, escalating any uncertainty to the OOW immediately rather than waiting for it to resolve itself" },
        { en: "Maintain direct oversight of the forecastle team's safety throughout the operation, correcting positioning or technique in real time" },
        { en: "Organize and brief the anchor watch rotation during extended periods at anchor, ensuring each watchkeeper understands what to monitor and when to escalate" },
        { en: "Ensure the anchor and windlass are properly secured at the end of the operation and confirm this to the bridge" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Windlass and anchor chain — operated directly, not only supervised" },
        { en: "Chain stopper / bow stopper" },
        { en: "Anchor markings / chain markings" },
        { en: "Portable radio for continuous communication with the bridge" },
        { en: "Anchor watch schedule / log" },
      ],
      risks: [
        { en: "Misjudging chain tendency or dragging due to divided attention between hands-on windlass work and team supervision" },
        { en: "Misinterpreting chain behaviour because visibility, weather, or vessel movement makes observation more difficult" },
        { en: "Delayed escalation of a dragging concern because the Bosun attempts to confirm it alone before reporting" },
        { en: "A forecastle team member positioned unsafely near the chain because briefing was rushed or incomplete" },
        { en: "An anchor watch handover that fails to convey what to monitor, leaving a gap in vigilance" },
        { en: "Same physical risks as the AB at the forecastle (crushing, entanglement, falling) — hands-on involvement does not reduce personal exposure to these risks" },
      ],
      bestPractices: [
        { en: "Brief the forecastle team on roles and hazards before the anchor is prepared, not while the chain is already running" },
        { en: "Report chain tendency and amount out as observed, even if the picture is not yet fully clear — the bridge can combine partial information faster than it can wait for certainty" },
        { en: "Keep communications concise, standardized and continuous — the bridge depends on timely updates more than lengthy explanations" },
        { en: "Rotate attention deliberately between the windlass, the chain, and the team — do not fixate on one at the expense of the others" },
        { en: "Treat every anchor watch handover as a full briefing, not a formality — the incoming watchkeeper should know exactly what 'normal' looks like" },
        { en: "When uncertain whether the anchor is dragging, report the uncertainty itself rather than waiting to resolve it privately" },
      ],
      commonMistakes: [
        { en: "Becoming so focused on the windlass that team safety at the forecastle is not actively monitored" },
        { en: "Waiting to confirm a dragging concern personally before informing the bridge, losing valuable response time" },
        { en: "Rushing the pre-operation briefing because the team has 'done this before'" },
        { en: "Reporting conclusions instead of observations (e.g. 'Anchor is fine' instead of 'Seven shackles on deck, chain leading 10 degrees to port, moderate tension')" },
        { en: "Handing over the anchor watch with only a status update, not a full explanation of what to watch for" },
        { en: "Treating a quiet anchor watch period as a reason to relax attention to the same standard as an active one" },
      ],
      professionalTips: [
        { en: "At the forecastle, your hands and your eyes work on the equipment — your voice works for the bridge. Never let one silence the other" },
        { en: "Dragging usually begins as a collection of small indications rather than one obvious sign. Experienced Bosuns learn to recognize the pattern early and report it without hesitation" },
        { en: "The quality of an anchor watch handover is measured by how quickly the next watchkeeper could take over without needing to ask a single question" },
        { en: "Confidence at the windlass comes from repetition, but respect for the chain should never fade with experience" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l3" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Bosun organizes and oversees the deck team's port duties — gangway watch rotation, security rounds, mooring monitoring, and cargo-related deck work — while ensuring that non-routine issues are escalated promptly to the appropriate deck officer. Port stays bring a higher volume of external contacts (agents, contractors, authorities, visitors) and a wider range of simultaneous activity than any other phase, and the Bosun's main value is keeping this activity organized and safe." },
      responsibilities: [
        { en: "Organize and brief the gangway watch and security round rotation, ensuring each crew member understands access control procedures and reporting expectations" },
        { en: "Coordinate mooring line monitoring throughout the port stay, ensuring adjustments for tide, draft, or traffic surge are actually carried out, not just scheduled" },
        { en: "Allocate and oversee deck crew support for cargo-related operations (hatch covers, lashing, deck preparation), coordinating timing with cargo officers as needed" },
        { en: "Coordinate routine deck-side interactions with contractors under the Chief Officer's instructions, ensuring the deck crew understands its support role and safety boundaries" },
        { en: "Personally verify or address any access control uncertainty escalated by a gangway watchkeeper (e.g. an unclear visitor situation) before it becomes a delay or a security gap" },
        { en: "Ensure fire watch or pollution prevention watch during high-risk port operations (bunkering, hot work) is properly assigned, briefed, and not combined with other duties" },
        { en: "Relay any recurring deficiency at the berth (fenders, gangway condition, lighting) to the Chief Officer, especially if repeated across port calls" },
        { en: "Maintain visibility across the whole port workload — gangway, moorings, cargo support, maintenance — rather than becoming absorbed in a single task" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Gangway watch schedule / access control log" },
        { en: "Visitor passes / access authorization records (where applicable)" },
        { en: "Portable radio for coordinating across multiple simultaneous activities" },
        { en: "Mooring lines and fenders — overseen across the whole berth, not one station" },
        { en: "Port work plan / cargo support schedule, where applicable" },
      ],
      risks: [
        { en: "A security gap created by an unclear visitor situation not escalated promptly by a gangway watchkeeper" },
        { en: "Mooring adjustments falling behind schedule because attention is absorbed by cargo-related coordination" },
        { en: "Fire or pollution watch duties becoming diluted by being combined informally with other tasks" },
        { en: "A recurring berth deficiency going unreported because each occurrence is treated as an isolated, minor issue" },
        { en: "Conflicting operational priorities (cargo, mooring adjustments, contractors, visitors) leading to delayed supervision of a critical activity" },
        { en: "Loss of overview of the whole port workload due to the higher number of simultaneous activities compared to other phases" },
      ],
      bestPractices: [
        { en: "Set clear escalation criteria for gangway watchkeepers before the port stay begins — what to handle directly, what to escalate immediately" },
        { en: "Physically check mooring conditions periodically rather than relying solely on watchkeeper reports" },
        { en: "Treat fire and pollution watch as protected, dedicated duties when assigning port workload — never double up these roles informally" },
        { en: "Keep the Chief Officer informed of changing priorities before they become operational conflicts" },
        { en: "Track recurring issues across port calls, not just within a single stay, to identify patterns worth escalating" },
        { en: "Walk the full extent of the port workload periodically — gangway, moorings, cargo support areas — to maintain a genuine overview" },
      ],
      commonMistakes: [
        { en: "Allowing gangway watchkeepers to resolve ambiguous access situations alone rather than setting clear escalation expectations in advance" },
        { en: "Letting mooring checks slip during busy cargo periods, assuming they can wait" },
        { en: "Assigning fire or pollution watch duties alongside other tasks under workload pressure" },
        { en: "Assuming that familiar contractors or frequent visitors no longer require the same level of access control discipline" },
        { en: "Treating each berth deficiency report as new information rather than checking for a pattern" },
        { en: "Becoming absorbed in one visible activity (e.g. cargo support) while losing track of quieter but equally important duties (gangway, moorings)" },
      ],
      professionalTips: [
        { en: "Port stays test your ability to keep several things going at once — the skill is not doing everything yourself, but continually deciding where your attention adds the greatest value at that moment" },
        { en: "A gangway watch that never asks a question is not necessarily a well-run one — make sure your team knows it's expected to escalate, not just to cope" },
        { en: "The busiest-looking activity is not always the one that most needs your attention — a quiet mooring line under increasing tension deserves the same vigilance as active cargo work" },
        { en: "Recurring small problems at the same berth are worth mentioning even if each one seems minor on its own — patterns are information" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l2" }, { kind: "lesson", lessonId: "d6-l4" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations combine the technical demands of Anchoring (hands-on expertise, precise reading of load and behaviour) with the coordination demands of Departure Manoeuvres (multiple positions, continuous relay to the bridge) — but with a smaller margin for error, since two vessels are moving relative to each other rather than one vessel relative to a fixed berth. The Bosun leads the deck team's rigging and monitoring work at the interface between the two hulls, providing the bridge with a continuous, accurate operational picture of the interface between both vessels throughout the operation." },
      responsibilities: [
        { en: "Verify that all personnel understand the designated exclusion zones and safe escape routes before the vessels come alongside" },
        { en: "Organize and brief the deck team on fender and mooring rigging specific to the STS operation, assigning clear positions and observation roles before work begins" },
        { en: "Personally verify fender attachment and positioning before the operation starts, not relying solely on the team's report that rigging is complete" },
        { en: "Maintain continuous oversight of fender condition and inter-vessel separation throughout the operation, consolidating team observations into clear reports to the bridge" },
        { en: "Coordinate operationally with the designated counterpart on the other vessel whenever required, while respecting each vessel's chain of command" },
        { en: "Ensure the working area between the vessels is kept clear of unnecessary personnel and equipment throughout the operation" },
        { en: "Confirm the deck team's familiarity with emergency quick-release procedures before the operation begins, and personally coordinate their execution if an emergency separation is ordered" },
        { en: "Relay any change in fender condition, mooring load, or relative vessel movement to the bridge immediately, however minor it may appear" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest, flotation aid where required)" },
        { en: "Fenders and fender lines — overseen and personally verified, not only supervised remotely" },
        { en: "Mooring lines and wires specific to STS operations" },
        { en: "STS mooring arrangement / rigging plan" },
        { en: "Portable radio for coordination with the bridge and, where applicable, the other vessel's crew" },
        { en: "Emergency quick-release equipment" },
      ],
      risks: [
        { en: "Divided attention between personally verifying rigging and maintaining oversight of the whole interface between the vessels" },
        { en: "Conflicting information received from different observation points leading to an incorrect overall assessment if not verified" },
        { en: "Miscommunication with an unfamiliar counterpart crew, particularly where procedures or language differ" },
        { en: "A change in fender condition or vessel separation not reported promptly because it seemed to stabilize on its own" },
        { en: "A team member positioned in or near the gap between the vessels longer than necessary due to unclear briefing" },
        { en: "Delayed coordination of an emergency quick-release if roles were not clearly assigned beforehand" },
        { en: "Same physical risks as the AB during STS operations (crushing, falling overboard between hulls) — personal involvement in rigging does not reduce this exposure" },
      ],
      bestPractices: [
        { en: "Brief the team thoroughly on fender rigging, monitoring roles, and emergency procedures before the operation begins, not as it unfolds" },
        { en: "Verify fender attachment and rigging personally before confirming readiness to the bridge" },
        { en: "Establish clear communication procedures and signals with an unfamiliar counterpart crew before the operation starts, not during it" },
        { en: "Acknowledge every critical report received from the team so that no observation is assumed to have gone unheard" },
        { en: "Treat every report of changing separation or fender condition as worth relaying immediately, even if it later proves minor" },
        { en: "Keep the team's positions actively monitored throughout — do not assume initial positioning remains safe as the operation progresses" },
      ],
      commonMistakes: [
        { en: "Confirming rigging readiness based on the team's report alone, without personal verification" },
        { en: "Focusing attention only on the point where work is actively taking place, instead of monitoring the entire interface between both vessels" },
        { en: "Underestimating how quickly relative vessel movement can change in swell, wind, or wake conditions" },
        { en: "Assuming a counterpart crew from another company follows the same procedures without confirming beforehand" },
        { en: "Delaying the report of a fender or mooring concern while attempting to assess its significance alone" },
        { en: "Allowing a team member to remain in the gap between vessels longer than the task strictly requires" },
      ],
      professionalTips: [
        { en: "STS success is built before the operation starts — a properly briefed and rigged team prevents far more problems than a fast response after something goes wrong" },
        { en: "When working with an unfamiliar crew, invest in clear communication early; assumptions about shared procedure are a common source of confusion" },
        { en: "Treat the space between two vessels as inherently dangerous throughout the operation, not only when it visibly narrows" },
        { en: "If there is uncertainty about the safety of the operation, communicate it immediately rather than waiting for certainty" },
        { en: "Your greatest contribution during STS is early recognition and early communication — the bridge can only react to information it receives" },
      ],
      mapReferences: [],
    },

    maintenance: {
      overview: { en: "Maintenance is where the Bosun's planning and technical judgment combine most visibly: translating the vessel's maintenance schedule into a practical work plan, assigning the right tasks to the right crew members, and personally verifying that the standard of work protects the ship over the long term. Unlike the AB, whose focus is the task in front of them, the Bosun must balance the maintenance workload against watch duties, weather windows, and the varying skill levels of the deck team — while remaining accountable for the quality of the deck team's maintenance work and for keeping the Chief Officer accurately informed of the deck's condition." },
      responsibilities: [
        { en: "Translate the vessel's planned maintenance schedule into a practical daywork plan, sequencing tasks around weather, watch rotation, and available crew" },
        { en: "Verify that maintenance tools and equipment are serviceable before assigning work, removing defective equipment from use when necessary" },
        { en: "Assign maintenance tasks according to each crew member's skill level, pairing less experienced ratings with more experienced ones on technical work (e.g. surface preparation, painting)" },
        { en: "Personally verify critical stages of the work and inspect completed tasks, checking preparation quality and application standard before considering a task finished" },
        { en: "Identify and prioritize early signs of corrosion or wear observed during rounds or reported by the crew, escalating anything beyond routine surface treatment to the Chief Officer" },
        { en: "Ensure the correct products (paint, primer, grease) and PPE are used for each task, in line with the vessel's procedures and the PMS" },
        { en: "Maintain deck stores, paint lockers, and maintenance equipment in an organized, safe, and properly stocked condition" },
        { en: "Report overall maintenance progress and any recurring or structural concern to the Chief Officer, distinguishing between routine upkeep and issues requiring officer-level decision" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task (helmet, gloves, safety shoes, eye and respiratory protection where required)" },
        { en: "Planned Maintenance System (PMS) records and schedule" },
        { en: "Manufacturer instructions / technical specifications where required" },
        { en: "Chipping, scaling, and painting tools and materials — allocated and overseen across the team" },
        { en: "Grease guns and lubricants — allocated according to specification, not general habit" },
        { en: "Deck stores and paint locker inventory" },
      ],
      risks: [
        { en: "Maintenance tasks assigned without matching crew skill level, leading to substandard work or safety incidents" },
        { en: "Experienced crew repeatedly assigned the same work, limiting the development of junior ratings and creating unnecessary dependence on a few individuals" },
        { en: "A recurring corrosion or wear issue treated repeatedly as routine surface work rather than escalated as a structural concern" },
        { en: "Maintenance schedule slipping due to poor sequencing around weather windows or watch demands" },
        { en: "Incorrect product use (wrong paint, incompatible grease) due to insufficient verification against the PMS" },
        { en: "Loss of oversight of overall deck condition while focused on a single ongoing task" },
      ],
      bestPractices: [
        { en: "Plan maintenance work around realistic weather windows rather than optimistic ones — a rushed job in poor conditions rarely holds" },
        { en: "Personally verify critical stages and inspect finished work — a good result can still come from a shortcut that will fail later" },
        { en: "Pair experience deliberately: junior ratings learn technique from senior ones, not only from instructions" },
        { en: "Use maintenance work as an opportunity to coach and assess crew competence, not only to complete the planned task" },
        { en: "Track recurring maintenance issues across time and location, not only as isolated tasks, to catch developing structural problems early" },
        { en: "Keep the PMS and actual deck condition consistent — do not let paperwork and reality drift apart" },
      ],
      commonMistakes: [
        { en: "Assigning technical tasks without considering the experience level of the crew member" },
        { en: "Keeping the most experienced crew members on every critical task instead of progressively developing the rest of the team" },
        { en: "Treating a recurring corrosion issue as routine because it has always been handled the same way before" },
        { en: "Approving finished work based on a quick visual check rather than verifying preparation quality underneath" },
        { en: "Letting maintenance planning become reactive, only responding to problems rather than following a proactive schedule" },
        { en: "Allowing deck stores or the paint locker to become disorganized, slowing down future tasks and creating fire or safety risks" },
      ],
      professionalTips: [
        { en: "The best maintenance decisions are made before the work starts — sequencing, assignment, and preparation matter more than speed of execution" },
        { en: "The team quickly learns which standard you actually enforce — not the one written in the procedures, but the one you consistently accept" },
        { en: "Corrosion tells a story over time — comparing today's observation to previous reports often reveals more than a single inspection ever could" },
        { en: "Training junior ratings during maintenance work is one of the most effective ways to build a stronger deck team, not just a byproduct of getting the job done" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Bosun's role shifts from organizing daily work to leading a team under pressure at an assigned emergency station — directing the crew's actions, maintaining accountability for everyone under their charge, and serving as the operational link between the emergency team and the officer in command, ensuring that orders are understood, executed, and accurately reported back. Detailed procedures for each type of emergency are covered in the Safety curriculum; this phase focuses on how the Bosun is expected to lead once an emergency begins." },
      responsibilities: [
        { en: "Proceed immediately to the assigned emergency station and take charge of organizing the team present, following the vessel's muster list and emergency organization" },
        { en: "Verify that the assigned emergency station is operationally ready upon arrival, identifying any immediate equipment or personnel issue before the response develops further" },
        { en: "Maintain continuous accountability for the assigned team throughout the emergency, not only during the initial muster" },
        { en: "Translate orders received from the officer in command into clear, specific actions for the team, verifying that each member understands their task" },
        { en: "Maintain direct oversight of the team's safety and equipment use throughout the emergency, correcting unsafe action immediately" },
        { en: "Consolidate observations from team members into clear, factual reports to the officer in command or bridge, rather than passing along raw or conflicting information" },
        { en: "Make immediate operational decisions on matters within their authority (e.g. reallocating a task among the team) while escalating anything affecting the overall response or vessel safety" },
        { en: "Maintain calm, clear communication and set the tone for the team's discipline throughout the emergency, regardless of personal uncertainty about the situation" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list (firefighting outfit, immersion suit, lifejacket, etc.)" },
        { en: "Portable radio or other communication equipment designated for the emergency team" },
        { en: "Muster list and emergency organization reference" },
        { en: "Team accountability / personnel checklist (where used by company procedures)" },
        { en: "Emergency equipment specific to the assigned station (as covered in Safety training)" },
      ],
      risks: [
        { en: "Delayed or unclear direction to the team due to hesitation in translating orders into specific action" },
        { en: "Failure to account for all team members promptly, delaying recognition of someone missing or in difficulty" },
        { en: "Passing along conflicting or unverified information from the team without consolidating it into a clear picture" },
        { en: "Loss of situational awareness because all attention becomes focused on one immediate problem within the emergency station" },
        { en: "Team discipline breaking down under stress if the Bosun's own composure is visibly shaken" },
        { en: "Making a decision beyond Bosun authority instead of escalating to the officer in command" },
        { en: "Same physical risks as any crew member at the emergency station — leadership responsibility does not reduce personal exposure" },
      ],
      bestPractices: [
        { en: "Take the muster count immediately and repeat it as the team's composition changes during the response" },
        { en: "Translate every order into a specific, concrete instruction for each team member — never assume the order alone is enough guidance" },
        { en: "Report clearly and factually to command — state what is confirmed and what is still uncertain, rather than blending the two" },
        { en: "Reassess the team's situation regularly as the emergency evolves rather than assuming the initial plan remains appropriate" },
        { en: "Maintain visible calm and discipline, even when personally uncertain — the team takes its cue from the Bosun's demeanour" },
        { en: "Make quick decisions confidently within your authority, but escalate anything touching the overall response or vessel safety without delay" },
      ],
      commonMistakes: [
        { en: "Hesitating to give specific direction, leaving team members waiting for instructions that never fully arrive" },
        { en: "Failing to re-verify the team count as members move or are reassigned during the response" },
        { en: "Relaying every individual team member's raw observation to command instead of consolidating them into one clear report" },
        { en: "Attempting to perform every critical task personally instead of continuing to lead and coordinate the team" },
        { en: "Allowing visible panic or hesitation to spread confidence loss through the team" },
        { en: "Attempting to resolve a situation beyond Bosun authority rather than escalating it promptly" },
      ],
      professionalTips: [
        { en: "In an emergency, your team follows your tone as much as your instructions — steady communication is itself a form of leadership" },
        { en: "Translate, don't just transmit — an order relayed word-for-word is not the same as an order made actionable for the specific people in front of you" },
        { en: "Command can only act on the information it receives — a consolidated, accurate report is more valuable than several raw ones" },
        { en: "The standard your team demonstrates during an emergency is usually the standard you demanded during every drill beforehand" },
      ],
      mapReferences: [],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "While anchoring, one crew member at the forecastle reports the chain 'seems fine,' while another, positioned differently, mentions the chain angle looks unusual. The two observations are not fully consistent." },
      mission: { en: "Reconcile the conflicting observations quickly and give the bridge a single, reliable assessment rather than passing along two different impressions." },
      expectedActions: [
        { en: "Personally check the chain tendency and windlass condition directly rather than choosing between the two reports" },
        { en: "Ask each crew member a specific, clarifying question rather than accepting a vague impression" },
        { en: "Report to the bridge only once you have a consolidated, confident picture — or explicitly report the uncertainty if it cannot yet be resolved" },
        { en: "Continue monitoring after the initial report and update the bridge if the situation becomes clearer or changes" },
      ],
      why: [{ en: "Passing along one of two conflicting reports without verification risks giving the bridge a false sense of certainty in either direction — the Bosun's role is to resolve the ambiguity, not transmit it." }],
      commonMistakes: [
        { en: "Picking the more reassuring of the two reports without checking" },
        { en: "Relaying both reports to the bridge without adding a personal assessment" },
        { en: "Delaying the report altogether while trying to fully resolve the disagreement alone" },
      ],
      safetyPoints: [
        { en: "A dragging anchor is a slow-developing risk — an unresolved ambiguity at the forecastle should never be allowed to delay the bridge's awareness of a possible problem." },
        { en: "When uncertainty affects navigational safety, early reporting is safer than delayed certainty." },
      ],
      mapReferences: [],
    },
    {
      situation: { en: "You are planning the day's maintenance tasks. Your most experienced AB is available, and assigning the technical painting task to them would be the fastest, safest option — as it has been on every previous occasion." },
      mission: { en: "Balance the immediate efficiency of the day's work against the longer-term development of the rest of the deck team." },
      expectedActions: [
        { en: "Consider pairing a less experienced rating with the technical task under closer supervision, rather than defaulting to the same experienced AB" },
        { en: "Select the learning opportunity deliberately, not automatically — only when the task, conditions, and available supervision make it appropriate" },
        { en: "Brief the less experienced rating clearly and check in more frequently during the task" },
        { en: "If time or conditions genuinely do not allow this, note it and plan differently for the next opportunity rather than letting it become a permanent pattern" },
      ],
      why: [{ en: "Repeatedly assigning critical work to the same experienced crew member is efficient in the short term but limits the development of the rest of the team and creates unnecessary dependence on one individual." }],
      commonMistakes: [
        { en: "Always defaulting to the same experienced crew member without noticing the pattern" },
        { en: "Assuming junior ratings will 'naturally' develop skills without deliberate assignment and supervision" },
      ],
      safetyPoints: [{ en: "Supervised skill development does not mean lowering the safety standard — closer Bosun oversight compensates for the junior rating's lesser experience." }],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l7" }],
    },
    {
      situation: { en: "A gangway watchkeeper radios you, unsure whether to allow a visitor aboard — the person has partial identification but no confirmation from the agent was received in advance." },
      mission: { en: "Resolve the uncertainty quickly without creating an unnecessary security gap or an unnecessary delay for a legitimate visitor." },
      expectedActions: [
        { en: "Do not instruct the watchkeeper to 'use their judgment' and move on — personally verify the visitor's identity and purpose, or escalate to the OOW/duty officer if verification cannot be completed at your level" },
        { en: "Confirm the decision clearly back to the watchkeeper before ending the exchange" },
        { en: "Inform the Chief Officer or OOW afterwards if the situation reveals a recurring weakness in access control procedures" },
      ],
      why: [{ en: "An unclear instruction ('figure it out') passes the Bosun's uncertainty down to a less experienced crew member rather than resolving it — the Bosun's role is to remove ambiguity, not delegate it under pressure." }],
      commonMistakes: [
        { en: "Giving a vague answer that leaves the watchkeeper still uncertain" },
        { en: "Deciding based on convenience (letting the visitor in to avoid delay) rather than verification" },
        { en: "Failing to close the loop with a clear final instruction" },
      ],
      safetyPoints: [{ en: "Every access decision should be traceable to a clear verification step — never to an assumption made under time pressure." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },
  ],

  professionalTips: [
    { en: "Your value is measured by your team's performance, not your own — the moment you catch yourself doing every critical task personally, you have stopped leading and started competing with your own crew." },
    { en: "Verify before you trust, then trust without micromanaging — responsibility grows when people know they will be supported and held accountable." },
    { en: "Say it once, clearly, and check understanding — clear communication is confirmed by understanding, not by speaking." },
    { en: "The standard you accept on a quiet day is the standard your team will default to under pressure — consistency matters more than occasional strictness." },
    { en: "Develop your team deliberately, not accidentally — every task is an opportunity to build a more capable crew, not just to get the job done." },
    { en: "Early escalation gives officers more options than late escalation ever can." },
    { en: "Lead by example without needing to prove it constantly — your crew notices consistent professionalism far more than occasional displays of skill." },
    { en: "A calm, organized Bosun makes an organized deck team — calm is contagious, but so is panic." },
    { en: "Never allow routine to replace attention — familiar tasks deserve the same discipline as unfamiliar ones." },
    { en: "Being a Bosun is not simply being a very experienced AB — it is a different job, built on organizing, coordinating, verifying, and developing others, not on personal execution alone." },
  ],

  professionalMindset: [
    { en: "Think in terms of the team's picture, not your own task. An AB focuses on doing their job well; a Bosun must constantly hold a mental map of what every station, every crew member, and every ongoing task is doing at once." },
    { en: "Assume information is incomplete until verified. A single report, a single observation, a single crew member's impression is a starting point, not a conclusion — the Bosun's job is to build the most reliable operational picture possible before acting or reporting." },
    { en: "See routine as the moment risk hides best. The most dangerous point in most operations is not the unfamiliar one — it is the familiar one, repeated so often that attention quietly drops." },
    { en: "Measure success by what your team can do without you, not by what you can do yourself. A Bosun who has built a genuinely capable team can step away briefly without the operation losing quality — that capability is the real achievement." },
    { en: "Treat every instruction you give as something that must be understood, not just heard. Communication ends only when the other person can perform the task correctly." },
    { en: "Hold two timeframes at once: today's task and the team's long-term development. The fastest solution today (assigning the same experienced hand again) is not always the best decision for the team's future capability." },
    { en: "Accept that authority is operational, not absolute. A Bosun organizes, decides, and acts within a real scope — but always within a chain of command that extends above them, never around it, and strengthens it by providing reliable execution and timely escalation." },
    { en: "Recognize that your composure is a resource the team draws on. In a difficult moment, the crew is watching how you react as much as listening to what you say — your emotional discipline becomes operational discipline for the team." },
    { en: "Think beyond today's operation. Every report, every inspection, every maintenance task, and every briefing contributes to the long-term condition of the vessel and the capability of the crew." },
  ],

  professionalDocumentation: [
    { en: "Deck Logbook — The Bosun does not maintain the logbook directly, but often provides the verified operational summary from which several logbook entries are prepared: mooring operations, rounds, maintenance completed, and incidents observed." },
    { en: "Planned Maintenance System (PMS) records — The Bosun bridges the gap between paperwork and reality: verifying that completed work is properly reflected in the PMS, and flagging any discrepancy between what is recorded and what is actually observed on deck. The Bosun also reports when planned maintenance cannot be completed as scheduled, helping keep the PMS realistic rather than artificially up to date." },
    { en: "Checklists (departure, arrival, anchoring, STS, safety rounds) — The Bosun often reviews, verifies, or countersigns checklists completed by the crew, adding a layer of verification beyond the individual rating's own check. A checklist approved by the Bosun should reflect something they have genuinely confirmed, not simply trusted." },
    { en: "Watch and rest-hour records — The Bosun contributes factual information about crew deployment and actual work performed, supporting accurate records without becoming responsible for regulatory compliance." },
    { en: "Maintenance and defect reports — The Bosun consolidates individual crew observations into clear, prioritized reports for the Chief Officer, distinguishing routine items from anything requiring officer-level decision. Recurring observations should be linked together whenever they indicate a developing trend rather than treated as isolated events." },
    { en: "Access/visitor logs (during port operations) — The Bosun helps ensure the accuracy of this log across the whole port stay, spot-checking entries and resolving any gap or ambiguity escalated by a gangway watchkeeper." },
    { en: "Why this matters: As information moves up from individual crew members to the officers, the Bosun is often the last point where accuracy can still be verified before it becomes an official record. A Bosun who treats this consolidation role seriously protects the integrity of the vessel's records — and therefore the quality of the operational decisions based on them." },
  ],

  environmentalResponsibilities: [
    { en: "Waste segregation and disposal oversight — The Bosun ensures the deck crew correctly sorts and disposes of waste according to the vessel's Garbage Management Plan, correcting improper practices early before they become accepted team habits." },
    { en: "Oil and fuel handling supervision — During bunkering, transfer, or maintenance work involving oil or fuel, the Bosun verifies that drip trays, containment, and spill-response readiness are actually in place — not just assumed — before work begins, and verifies that every crew member understands their assigned role before the operation begins." },
    { en: "Prohibited discharges — team awareness — The Bosun ensures every crew member understands and consistently follows the rule that no oil, oily water, garbage, or chemical may be discharged overboard without explicit authorization and officer supervision, and immediately corrects any shortcut observed, however minor it appears." },
    { en: "Reporting environmental incidents — The Bosun consolidates and escalates any environmental observation from the team (a sheen, an unusual smell, visible contamination) to the OOW or Chief Officer promptly. The Bosun should distinguish confirmed facts from observations requiring further investigation, while ensuring both are reported appropriately." },
    { en: "Sediment and residue control — The Bosun organizes maintenance and painting work so that deck areas, drains, and scuppers remain clear of paint chips, rust, or oil residue, and verifies this as part of closing out a maintenance task. Environmental protection should be considered part of completing the task — not an additional clean-up activity after the work is finished." },
    { en: "Good housekeeping — The Bosun promotes clean, orderly deck operations where spills, loose materials, and unnecessary waste are prevented through disciplined daily housekeeping rather than corrected only after they become a problem." },
    { en: "Why this matters: Environmental compliance on deck depends less on individual knowledge and more on consistent team habits — a single well-informed Bosun who tolerates shortcuts under time pressure undermines the standard for the whole team. The Bosun's role is to build a team culture where environmentally responsible practice is simply the normal way of working." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Allocate and reallocate deck crew tasks based on experience, workload, and operational priorities established by the officers" },
      { en: "Make immediate operational decisions on deck-level matters (e.g. reassigning a crew member, adjusting a work sequence) within the operational intent established by the officers, without waiting for officer instruction on routine matters" },
      { en: "Suspend or reorganize routine deck work when operational priorities change, ensuring the team remains aligned with the officers' intent" },
      { en: "Review, verify, or countersign checklists and reports completed by the deck crew before passing them to the officers" },
      { en: "Correct unsafe technique or non-compliant behaviour observed in any member of the deck team, on the spot" },
      { en: "Refuse to proceed with a task, or direct the team to stop, if you judge it unsafe, until the situation has been reassessed with the appropriate officer" },
      { en: "Personally operate equipment (windlass, winches) when your direct involvement is warranted by the complexity or criticality of the situation" },
      { en: "Escalate any concern — equipment, personnel, or procedural — directly to the Chief Officer or OOW without needing prior approval to raise it" },
    ],
    youCannot: [
      { en: "Decide navigational strategy, operational priorities, or departure/arrival sequencing — these remain with the OOW and Chief Officer" },
      { en: "Authorize the boarding of a visitor or contractor without confirmation from the OOW or duty officer" },
      { en: "Discharge oil, oily water, garbage, or any regulated substance overboard without explicit authorization and officer supervision" },
      { en: "Sign or approve official ship's documents or records as the final authority — that responsibility remains with the officers" },
      { en: "Alter the vessel's planned maintenance schedule or safety procedures on your own judgment, except where immediate safety requires temporarily stopping or delaying work until officers are informed" },
      { en: "Take command of an emergency response beyond your assigned station, or redirect resources belonging to another team without the officer in command's authorization" },
      { en: "Assume regulatory responsibility for crew rest-hour compliance — you contribute accurate information, but the Chief Officer holds this accountability" },
      { en: "Bypass the chain of command by making a decision that affects the overall operation, vessel safety, or another department, without escalating first" },
    ],
  },

  commonMistakes: [
    { en: "Confusing leadership with personal execution — Continuing to work as if you were still the most experienced AB, instead of organizing, verifying, and developing the team around you." },
    { en: "Accepting a lower standard because a task is routine — Letting familiar operations receive less attention or verification than unfamiliar ones, when routine is exactly where risk tends to hide." },
    { en: "Passing along unverified information — Relaying a crew member's report to the officers without first adding your own verification or clearly distinguishing confirmed facts from unverified observations." },
    { en: "Defaulting to the same experienced crew member — Repeatedly assigning critical tasks to whoever is fastest or most reliable today, at the cost of developing the rest of the team over time." },
    { en: "Giving unclear or incomplete instructions — Assuming communication was successful simply because the instruction was delivered, rather than confirming actual understanding before work begins." },
    { en: "Trying to supervise every detail personally — Spending so much time controlling individual tasks that you lose the ability to coordinate the operation as a whole." },
    { en: "Hesitating to escalate — Waiting for a situation to become undeniable before informing an officer, rather than raising a developing concern early when more options are still available." },
    { en: "Losing the overall picture — Becoming absorbed in a single task or station and failing to notice a developing issue elsewhere on deck." },
    { en: "Letting personal composure slip visibly under pressure — Allowing the team to sense hesitation, because uncertainty spreads through a team faster than the original problem itself." },
  ],

  careerProgression: [
    { en: "Next role: Officer of the Watch (OOW) — a significant step, requiring both formal certification and a transition from supervising work on deck to being directly responsible for the safe conduct of the navigational watch." },
    { en: "Skills to develop: Navigational theory and certification (chartwork, COLREG application at officer level, watchkeeping regulations); bridge resource management and decision-making under time pressure; the ability to integrate information from multiple sources (radar, AIS, ECDIS, visual, weather) into a single navigational picture, extending the consolidation skills already built as Bosun to a new domain; formal reporting and record-keeping at officer level." },
    { en: "Recommended experience: A solid period as Bosun across the full range of deck operations (mooring, anchoring, port work, maintenance, STS, emergency response), with demonstrated reliability in consolidating information and communicating clearly with the bridge — this operational experience helps establish the professional credibility on which an OOW's independence is built." },
    { en: "Certificates typically required: Certificates required vary by flag State, company policy, and national administration. Progression to OOW typically requires completion of an approved officer training program and the corresponding STCW certificate of competency (Officer in Charge of a Navigational Watch), together with any additional endorsements required for the vessel type or trade." },
    { en: "Recommended MAP courses: Navigation & Bridge Watchkeeping; Leadership & Bridge Resource Management; Role On Board – Officer of the Watch (when available); Specialized Operations (depending on vessel type); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving from Bosun to OOW means shifting your primary focus from supervising people to managing the safe operation of the vessel. Leadership remains important, but navigational judgment, situational awareness, and independent decision-making become your defining responsibilities." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
    { kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } },
    { kind: "lesson", lessonId: "d6-l1", label: { en: "Ropes & Fibres" } },
    { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } },
    { kind: "lesson", lessonId: "d6-l6", label: { en: "Basic Maintenance & Greasing" } },
    { kind: "lesson", lessonId: "d6-l7", label: { en: "Painting & Corrosion Prevention" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — terminology related to seamanship, deck operations, equipment, and supervision" } },
    { kind: "external", externalCode: "SMCP", label: { en: "SMCP (Standard Marine Communication Phrases) reference" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore deck arrangements, equipment, and operational characteristics across different vessel types" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on supervision, deck operations, STCW requirements, and operational best practices" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Bosun to Officer of the Watch and beyond" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time, certificates, and supervisory responsibilities and leadership experience gained as Bosun" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_AB", label: { en: "Role On Board — Able Seaman" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_OOW", label: { en: "Role On Board — Officer of the Watch (when published)" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Organization and allocation of the deck team's daily work" },
      { en: "Personal operation of windlass and mooring equipment when direct involvement is warranted" },
      { en: "Verification and countersigning of checklists and reports completed by the deck crew" },
      { en: "Team briefing before departure, anchoring, port operations, and STS operations" },
      { en: "Assigned emergency response actions and team leadership at my designated station" },
    ],
    iMonitor: [
      { en: "Condition, performance, and coordination of the deck team across multiple simultaneous activities" },
      { en: "Fatigue, rest rotation, and overall fitness of the deck crew" },
      { en: "Quality and standard of completed maintenance and operational work" },
      { en: "Recurring patterns in defect reports, rounds, or berth conditions" },
      { en: "Team safety and PPE compliance across all deck activities, not only the task directly supervised" },
    ],
    iReport: [
      { en: "A consolidated and verified operational picture, highlighting priorities, risks, and any issue requiring officer-level attention" },
      { en: "Any recurring or structural concern that goes beyond routine surface treatment or maintenance" },
      { en: "Any fatigue, competence, or performance concern affecting the deck team" },
      { en: "Any environmental observation or incident, distinguishing confirmed facts from observations requiring further verification" },
      { en: "My own uncertainty when a situation cannot be fully resolved at my level" },
    ],
    iDoNotAuthorize: [
      { en: "Boarding of visitors or contractors without officer confirmation" },
      { en: "Discharge of oil, oily water, garbage, or regulated substances overboard" },
      { en: "Deviation from navigational strategy, operational priorities, or departure/arrival sequencing" },
      { en: "Final approval or signature of official ship's documents and records" },
      { en: "Command of an emergency response or redirection of resources beyond my assigned station and authority" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Deck team organization chart showing the Bosun's position between officers and ratings." } },
    { kind: "diagram", caption: { en: "Mooring station layout showing typical Bosun positioning during departure/arrival manoeuvres." } },
    { kind: "image", caption: { en: "Example of a completed and verified deck maintenance checklist." } },
    { kind: "video", caption: { en: "Demonstration of an effective pre-departure team briefing." } },
    { kind: "document", caption: { en: "Sample consolidated deck status report format for the bridge." } },
  ],
};

// ── REGISTRY ──────────────────────────────────────────────────
// Indexed by RankId (rankRegistry.ts is the source of truth for valid ids).
// Partial: currently populated for "ab" and "bosun" — remaining ranks are
// still pending content.
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {
  ab: AB_CARD,
  bosun: BOSUN_CARD,
};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
