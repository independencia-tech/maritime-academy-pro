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

// ── REGISTRY ──────────────────────────────────────────────────
// Indexed by RankId (rankRegistry.ts is the source of truth for valid ids).
// Partial: currently populated for "ab" only — remaining ranks are still
// pending content.
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {
  ab: AB_CARD,
};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
