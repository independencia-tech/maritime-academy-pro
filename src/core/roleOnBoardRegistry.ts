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

// ── OOW ───────────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-26_role-on-board-oow-mapreferences.md) and the
// Product Owner's final decisions on that report. Locations with no
// validated correspondence are left as mapReferences: [] intentionally
// (candidates for future lessons — Passage Planning, STS Operations,
// Pilotage/BRM — not filled with approximate matches).
const OOW_CARD: RoleOnBoardCard = {
  rankId: "oow",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Officer of the Watch (OOW) is the officer directly responsible for making navigational decisions for the safe conduct of the vessel during their assigned watch period — managing collision risk, weather, lookout, and the vessel's immediate safety in real time, and directing the bridge team (helmsman, lookout) accordingly. Unlike the Bosun, who organizes and coordinates deck work, the OOW makes navigational decisions and answers for them." },
    { en: "The OOW exercises authority delegated by the Master for the duration of the watch, but never delegated accountability for professional judgment: within that scope, the OOW acts independently, but always within the Master's standing orders and the vessel's passage plan, escalating anything beyond their authority or judgment immediately." },
    { en: "A capable OOW combines certified professional competence (COLREG, navigation, watchkeeping regulations) with continuous situational awareness, sound judgment under uncertainty, and clear command of the bridge team — the OOW is rarely alone in a literal sense, but is always the one who must decide." },
    { en: "The OOW does not manage the deck department's daily organization (that remains the Chief Officer's and Bosun's domain), while remaining ready to direct deck operations whenever they affect the safety of navigation (e.g. anchoring, departure, mooring, man overboard)." },
    { en: "Where the Bosun's judgment resolves ambiguity at the deck-team level, the OOW's judgment resolves ambiguity at the level of the vessel itself — a wrong call here has consequences for the whole ship, not just a task or a team." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Master (ultimate authority at all times)" },
      { en: "Chief Officer (for administrative and departmental matters outside the watch itself)" },
    ],
    worksWith: [
      { en: "Other OOWs during watch handovers" },
      { en: "Bosun and deck crew during watch-related deck operations (rounds, mooring, anchoring)" },
      { en: "Engine department OOW/duty engineer for cross-department coordination" },
      { en: "Pilots and VTS during pilotage and port approaches" },
    ],
    mentors: [
      { en: "Master and senior officers, who guide the OOW's professional development toward Chief Mate certification" },
    ],
    supports: [
      { en: "Deck cadets and bridge trainees during bridge familiarization and training" },
      { en: "The Bosun and deck crew, whom the OOW directs during watch-related operations without managing their daily work organization" },
    ],
  },

  professionalSkills: [
    { label: { en: "Collision avoidance and COLREG application" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l8" }] },
    { label: { en: "Bridge resource management and team communication" }, mapReferences: [{ kind: "lesson", lessonId: "d4-l1" }, { kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Situational awareness and information integration (radar, AIS, ECDIS, visual, weather)" }, mapReferences: [{ kind: "lesson", lessonId: "d3-l6" }] },
    { label: { en: "Passage planning execution and monitoring" } },
    { label: { en: "Watchkeeping organization and handover discipline" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Emergency response and decision-making under pressure" }, mapReferences: [{ kind: "lesson", lessonId: "d3-l7" }] },
    { label: { en: "Pilotage and port approach coordination" }, mapReferences: [{ kind: "lesson", lessonId: "d4-l2" }] },
    { label: { en: "Navigational equipment operation and troubleshooting" }, mapReferences: [{ kind: "lesson", lessonId: "d3-l6" }] },
    { label: { en: "Regulatory compliance and record-keeping at officer level" } },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the OOW's focus is not organizing the deck team (that is the Bosun's responsibility) but ensuring the vessel is navigationally ready to proceed safely: the passage plan is complete and appropriate, navigational equipment is functioning, and the Master's standing orders and pilotage arrangements are understood. The OOW verifies navigational readiness as part of the vessel's overall readiness, then reports that assessment to the Master — the OOW does not personally prepare mooring equipment, but must be satisfied that the vessel, not just the deck, is ready to get underway." },
      responsibilities: [
        { en: "Prepare or review the passage plan for the upcoming departure and initial route, verifying it against charts, notices to mariners, and known hazards" },
        { en: "Test and confirm the operational status of navigational equipment (radar, ECDIS, gyro, GPS, engine telegraph, whistle) required for departure" },
        { en: "Confirm tidal, weather, and traffic conditions relevant to the departure window with the Master, and assess their impact on the intended departure" },
        { en: "Liaise with the pilot (if embarked) or confirm pilotage arrangements, and brief or receive briefing on the passage plan as appropriate" },
        { en: "Confirm with the Bosun/Chief Officer that the deck team is ready and stationed, without personally managing the deck preparation itself" },
        { en: "Verify communication equipment (VHF, internal comms) is operational and appropriate channels are set" },
        { en: "Verify that any limitations affecting navigation (equipment defects, temporary restrictions, chart corrections, standing orders) have been identified and considered before departure" },
        { en: "Report navigational readiness to the Master, distinct from and in addition to the deck team's readiness reported by the Bosun/Chief Officer" },
      ],
      equipment: [
        { en: "Passage plan, charts (paper and/or ECDIS), notices to mariners" },
        { en: "Navigational equipment (radar, ECDIS, gyro/magnetic compass, GPS, echo sounder)" },
        { en: "Engine order telegraph / communication with the engine room" },
        { en: "VHF radio, whistle, navigation lights" },
        { en: "Bridge checklists" },
        { en: "Master's standing orders and night order book" },
      ],
      risks: [
        { en: "An incomplete or unverified passage plan discovered only after departure has begun" },
        { en: "A navigational equipment fault not detected before departure, discovered only when needed" },
        { en: "Miscommunication with the pilot or Master regarding the passage plan or specific hazards" },
        { en: "Confusing navigational readiness with deck readiness, and reporting one as if it covered the other" },
        { en: "Proceeding under time pressure without having genuinely verified all navigational elements" },
      ],
      bestPractices: [
        { en: "Treat passage plan review as a genuine check, not a formality — verify it against current charts and notices, not from memory of a similar route" },
        { en: "Test every piece of navigational equipment intended for use during departure, not only the ones expected to be needed immediately. If any critical equipment is unavailable or degraded, ensure the Master is informed before departure decisions are made" },
        { en: "Confirm pilotage arrangements and communicate clearly with the pilot before the vessel gets underway, not after" },
        { en: "Keep navigational readiness and deck readiness as clearly distinct reports to the Master — do not blend them into a single assumption" },
        { en: "Raise any uncertainty about the passage plan or conditions with the Master before departure, not once underway" },
      ],
      commonMistakes: [
        { en: "Reviewing the passage plan superficially because the route is familiar" },
        { en: "Assuming navigational equipment is functional because it was working on the previous watch" },
        { en: "Reporting 'ready' to the Master based on deck readiness alone, without a separate navigational verification" },
        { en: "Failing to brief or receive a proper briefing from the pilot before departure" },
        { en: "Proceeding with an unresolved uncertainty about weather, traffic, or the passage plan under pressure to depart on schedule" },
      ],
      professionalTips: [
        { en: "A passage plan is only as good as the last time it was actually checked against current information — familiarity is not verification" },
        { en: "The OOW's readiness report to the Master should never be a formality — it is a professional confirmation that the navigational picture has genuinely been checked" },
        { en: "Build a habit of testing equipment deliberately, not just observing that it appears to be running" },
        { en: "A good relationship with the pilot starts with a clear, complete briefing — ambiguity here carries into the whole passage" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d3-l6" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the OOW directs the actual conduct of the vessel — ordering the helm, coordinating with the engine room, and managing the ship's movement away from the berth — while relying on the Bosun to supervise the technical execution of line-handling. The OOW's focus is the vessel's behaviour in the water: its position relative to the berth, other traffic, and the passage ahead." },
      responsibilities: [
        { en: "Direct the helm and engine orders required to manoeuvre the vessel safely away from the berth, in line with the passage plan and pilot's guidance if embarked" },
        { en: "Maintain continuous situational awareness of the vessel's position relative to the berth, other vessels, and the surrounding channel throughout the manoeuvre" },
        { en: "Continuously reassess whether the manoeuvre remains consistent with the passage plan and current conditions, adapting only when safety requires it" },
        { en: "Communicate clearly with the Bosun regarding the sequence of letting go lines, confirming readiness before ordering the next step" },
        { en: "Monitor engine response and vessel behaviour against what was ordered, and determine promptly whether corrective action or escalation is required" },
        { en: "Coordinate with the pilot (if embarked), respecting their conduct of the vessel while maintaining an independent assessment of the situation at all times, and retaining the Master's overriding authority and the OOW's own duty to intervene if safety requires it" },
        { en: "Confirm each mooring station's status as relayed by the Bosun, integrating it into the overall picture of the manoeuvre's progress" },
        { en: "Report to the Master any deviation from the plan, unexpected vessel behaviour, or traffic development requiring their attention" },
      ],
      equipment: [
        { en: "Helm, engine order telegraph, bridge navigation equipment (radar, ECDIS, gyro)" },
        { en: "Thruster controls (where fitted)" },
        { en: "VHF radio for communication with the Bosun, pilot, tugs (if used), and VTS/port control" },
        { en: "Passage plan and berth/channel chart" },
        { en: "Whistle and navigation lights" },
      ],
      risks: [
        { en: "Misjudging the vessel's position or movement relative to the berth or channel during a critical stage of the manoeuvre" },
        { en: "Ordering an action based on an assumption about mooring station readiness that has not actually been confirmed" },
        { en: "Delayed recognition that the vessel is not responding to helm or engine orders as expected" },
        { en: "Ambiguity in authority during pilotage — hesitating to intervene when the OOW's own judgment indicates a safety concern" },
        { en: "Loss of shared situational awareness between bridge team members due to ineffective communication" },
        { en: "Losing track of surrounding traffic while focused on the departure sequence itself" },
      ],
      bestPractices: [
        { en: "Confirm mooring station status explicitly before ordering the next step of the sequence — never assume based on elapsed time alone" },
        { en: "Cross-check the vessel's actual behaviour against the expected response to every helm or engine order" },
        { en: "Maintain a clear, standing awareness of surrounding traffic throughout the manoeuvre, not only at its start" },
        { en: "With a pilot embarked, monitor their conduct actively and be prepared to question or intervene if something appears unsafe — respect for the pilot's role does not remove the OOW's own responsibility" },
        { en: "Keep the bridge team informed of significant developments so everyone shares the same operational picture" },
        { en: "Report any deviation from the plan to the Master immediately, rather than waiting to see if it resolves on its own" },
      ],
      commonMistakes: [
        { en: "Ordering the next step of the departure sequence based on assumed timing rather than confirmed station status" },
        { en: "Failing to notice early that the vessel is not responding as expected to helm or engine orders" },
        { en: "Deferring entirely to the pilot's judgment without maintaining independent situational awareness" },
        { en: "Becoming absorbed in the mooring sequence and losing awareness of another vessel or hazard in the vicinity" },
        { en: "Delaying a report to the Master about a developing concern, hoping it will resolve before it needs to be raised" },
      ],
      professionalTips: [
        { en: "Trust the Bosun's station reports, but keep building your own independent picture of the vessel's overall movement — the two should confirm each other, not replace each other" },
        { en: "A pilot's presence changes who conducts the vessel, not who is responsible for its safety — stay engaged, not passive" },
        { en: "The moment you notice the vessel is not behaving as expected is the moment to act, not the moment to keep watching to be sure" },
        { en: "Departure manoeuvres reward officers who manage their attention deliberately, constantly reprioritizing as the manoeuvre evolves" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l4" }],
    },

    navigation: {
      overview: { en: "Navigation is where the OOW's core responsibility is exercised continuously: maintaining a safe navigational watch, applying COLREG to avoid collision, monitoring the vessel's progress against the passage plan, and directing the bridge team throughout. Unlike the Bosun, who organizes the deck crew's watch rotation, the OOW is the one who decides — course changes, speed adjustments, actions to avoid another vessel — and answers personally for those decisions. Safe navigation is not achieved by reacting quickly to danger, but by recognizing developing situations early enough that decisive action remains simple and effective." },
      responsibilities: [
        { en: "Maintain a continuous and effective lookout, by sight, hearing, and all available means (radar, AIS, ECDIS), appropriate to the prevailing circumstances and conditions" },
        { en: "Assess risk of collision with any observed vessel and take early, substantial action in accordance with COLREG when required, well before a close-quarters situation develops" },
        { en: "Monitor the vessel's position against the passage plan continuously, verifying progress by more than one method where possible" },
        { en: "Continuously reassess previous navigational decisions as conditions evolve, adapting the plan whenever safety requires" },
        { en: "Direct the helmsman with clear, standard orders, and verify the vessel's response matches what was ordered" },
        { en: "Integrate radar, AIS, ECDIS, and visual information into a single, coherent picture of the surrounding traffic and navigational situation, rather than relying on any single source alone" },
        { en: "Communicate significant navigational decisions or developments to the Master, in accordance with standing orders, and call the Master without hesitation when required" },
        { en: "Brief the bridge team clearly on the current situation, particularly during watch handover, ensuring the incoming OOW has a complete and accurate picture" },
        { en: "Record navigational events, decisions, and observations accurately in the deck logbook or bridge record" },
      ],
      equipment: [
        { en: "Radar, ARPA, AIS, ECDIS, gyro/magnetic compass, echo sounder" },
        { en: "Bridge alarm / BNWAS (where fitted)" },
        { en: "VHF radio, sound signalling equipment" },
        { en: "Passage plan, charts, Master's standing orders and night order book" },
        { en: "Binoculars" },
      ],
      risks: [
        { en: "Misjudging risk of collision or delaying action until a close-quarters situation has already developed" },
        { en: "Over-reliance on a single source of information (e.g. ECDIS or radar alone) without cross-checking against others" },
        { en: "Confirmation bias — interpreting new information only in a way that supports an earlier assessment instead of reassessing the situation objectively" },
        { en: "Loss of situational awareness due to fatigue, distraction, or prolonged routine watches" },
        { en: "Failing to call the Master when required by standing orders, out of reluctance to escalate a developing situation" },
        { en: "An incomplete or unclear watch handover leading to a gap in the incoming OOW's understanding of the situation" },
        { en: "Miscommunication with the helmsman leading to an incorrect or delayed response to an order" },
      ],
      bestPractices: [
        { en: "Treat every vessel sighted as requiring an assessment, however routine the traffic appears" },
        { en: "Take early and substantial action when risk of collision exists — a small, early alteration is safer and clearer than a late, sharp one" },
        { en: "Think ahead of the vessel, not only around it — continuously anticipate where today's traffic picture will be in the next several minutes" },
        { en: "Cross-check radar, AIS, ECDIS, and visual observation against each other continuously, rather than trusting one source in isolation" },
        { en: "Call the Master proactively in any situation covered by standing orders, or whenever genuinely uncertain — this is a standing invitation, not a last resort" },
        { en: "Give a complete, honest handover at the end of watch, including anything unresolved or uncertain, not only what went well" },
        { en: "Manage personal fatigue and the bridge team's alertness actively, requesting relief or additional support when needed" },
      ],
      commonMistakes: [
        { en: "Delaying collision avoidance action while waiting for more certainty than the situation allows" },
        { en: "Trusting a single navigational source (e.g. ECDIS track) without independently verifying the vessel's actual position" },
        { en: "Becoming mentally committed to an initial assessment despite changing evidence" },
        { en: "Treating a night order or standing order as optional guidance rather than a clear instruction from the Master" },
        { en: "Rushing or shortening a watch handover because the relieving officer is 'familiar with the situation already'" },
        { en: "Hesitating to escalate a developing concern, hoping it will resolve before the Master needs to be informed" },
      ],
      professionalTips: [
        { en: "COLREG gives you the rules, but judgment tells you when to apply them early enough to matter — waiting for certainty is often waiting too long" },
        { en: "No single piece of equipment tells the whole story — the OOW's real skill is combining several imperfect pictures into one reliable one" },
        { en: "Calling the Master is never a sign of weakness; it is exactly what the role and the standing orders expect of you" },
        { en: "The quality of your watch is measured as much by the clarity of your handover as by how the watch itself was conducted" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l10" }, { kind: "lesson", lessonId: "d1-l9" }, { kind: "lesson", lessonId: "d1-l8" }, { kind: "lesson", lessonId: "d3-l6" }, { kind: "lesson", lessonId: "d1-l6" }],
    },

    anchoring: {
      overview: { en: "While the Bosun takes charge at the forecastle, the OOW conducts the anchoring operation from the bridge — selecting or confirming the anchoring position, directing the timing and method of letting go, and monitoring the vessel's position continuously afterward to detect dragging before it becomes a safety concern. The OOW's judgment here is less about the mechanics of the anchor and chain, and more about whether the vessel is, and remains, in a safe position relative to the seabed, other vessels, and the surrounding area. Anchoring is not the end of navigation — it is a different phase of navigation requiring continuous assessment." },
      responsibilities: [
        { en: "Select or confirm the anchoring position, verifying depth, holding ground, swinging room, and proximity to other vessels or hazards against the chart" },
        { en: "Direct the approach to the anchoring position, ordering engine and helm as required, and communicate the plan clearly to the forecastle team via the Bosun" },
        { en: "Order the anchor let go at the appropriate position and moment, and confirm chain paid out matches the intended scope for the depth and conditions" },
        { en: "Verify that the vessel has settled as expected after anchoring before considering the operation complete" },
        { en: "Continuously monitor the vessel's position after anchoring, using multiple methods (visual bearings, radar, GPS) to detect any sign of dragging" },
        { en: "Integrate the Bosun's forecastle reports (chain tendency, amount out) with the bridge's own positional data into a single assessment of the vessel's status" },
        { en: "Reassess the anchoring position's safety as conditions change (wind, tide, traffic), and take action (veering more chain, weighing anchor) if the position is no longer adequate" },
        { en: "Communicate any developing concern about dragging or position to the Master immediately, in line with standing orders" },
        { en: "Organize and confirm the anchor watch arrangement with the Bosun, ensuring the bridge maintains its own independent monitoring in parallel" },
      ],
      equipment: [
        { en: "Chart, radar, GPS/ECDIS for position monitoring and dragging detection" },
        { en: "Anchor alarm (GPS/ECDIS), where fitted" },
        { en: "VHF radio or bridge-to-forecastle communication with the Bosun" },
        { en: "Visual bearings / azimuth compass for independent position checks" },
        { en: "Anchor watch log / position-fixing schedule" },
      ],
      risks: [
        { en: "Selecting or confirming an anchoring position without adequately verifying holding ground, depth, or swinging room" },
        { en: "Relying solely on the forecastle's report of chain tendency without independently verifying the vessel's position from the bridge" },
        { en: "Delayed recognition of dragging because position checks are too infrequent or inconsistent in method" },
        { en: "Confirmation bias after anchoring — interpreting minor position changes as normal without reassessing whether conditions have changed" },
        { en: "Failing to reassess the anchoring position as conditions change, assuming the initial assessment remains valid indefinitely" },
        { en: "Miscommunication between the bridge and forecastle regarding chain amount, tendency, or an emerging concern" },
      ],
      bestPractices: [
        { en: "Verify the anchoring position against the chart and known conditions before committing to it, not only against general familiarity with the area" },
        { en: "Establish a clear reference point immediately after anchoring so that any subsequent movement can be assessed objectively" },
        { en: "Fix the vessel's position by more than one independent method, at an interval appropriate to the conditions, not only when something seems wrong" },
        { en: "Treat the Bosun's forecastle reports and the bridge's own instruments as two independent checks that should agree — investigate promptly if they do not" },
        { en: "Reassess the anchorage explicitly whenever wind, tide, or traffic conditions change materially, rather than assuming the original assessment still holds" },
        { en: "Communicate proactively with the Master about any developing concern, however early or uncertain" },
      ],
      commonMistakes: [
        { en: "Confirming an anchoring position based on habit or convenience rather than a genuine check against current conditions" },
        { en: "Treating the forecastle's report as the only source of truth about the vessel's position, without independent verification from the bridge" },
        { en: "Fixing position too infrequently during quiet periods, then discovering a significant drift too late" },
        { en: "Failing to adjust chain scope or reposition when conditions change materially after the initial anchoring" },
        { en: "Delaying escalation to the Master while attempting to confirm a dragging concern alone" },
      ],
      professionalTips: [
        { en: "An anchoring position that was safe when chosen is not guaranteed to remain safe — reassessing it is a continuous responsibility, not a one-time decision" },
        { en: "The forecastle's judgment and the bridge's instruments should tell the same story — when they don't, that disagreement is itself important information" },
        { en: "Dragging is far easier to manage when caught early through routine position checks than when it is discovered late through a sudden, obvious shift" },
        { en: "A calm, well-organized anchor watch on the bridge is as much a discipline as a well-run watch underway — the vessel is still your responsibility, even at rest" },
      ],
      mapReferences: [],
    },

    port_operations: {
      overview: { en: "While alongside, the OOW's watch responsibility shifts from active navigation to maintaining the vessel's safety and readiness at the berth — overseeing gangway security at the officer level, monitoring the vessel's condition relative to the berth, and remaining the officer responsible for operational decisions affecting the vessel's safety and immediate readiness while alongside. The Bosun organizes and runs the deck team's port workload; the OOW ensures that workload never compromises the vessel's overall safety, security, or readiness." },
      responsibilities: [
        { en: "Confirm the mooring and gangway watch arrangements established by the Bosun are adequate for the port stay's conditions (traffic, tide, security level)" },
        { en: "Maintain oversight of the vessel's security level and access control policy, escalating or making decisions on ambiguous situations referred up by the Bosun" },
        { en: "Monitor the vessel's condition relative to the berth (draft, trim, mooring tension) as cargo or ballast operations proceed, coordinating with cargo officers as relevant" },
        { en: "Monitor weather and port conditions continuously, reassessing whether they affect the vessel's safety alongside or its readiness to depart" },
        { en: "Ensure fire watch, pollution prevention watch, or other high-risk operation safeguards (bunkering, hot work) are properly authorized and not compromised by workload pressure" },
        { en: "Liaise with agents, authorities, or surveyors as required by the Master, distinct from the Bosun's coordination of contractor deck work" },
        { en: "Maintain awareness of the vessel's readiness to get underway if required unexpectedly (e.g. weather, emergency), and communicate any factor affecting that readiness to the Master" },
        { en: "Record port-related navigational and security events in the deck logbook, distinct from the Bosun's own operational reports" },
      ],
      equipment: [
        { en: "Access control log, security level documentation (ISPS)" },
        { en: "CCTV / security monitoring system (where fitted)" },
        { en: "VHF radio, internal communication with the Bosun and duty engineer" },
        { en: "Draft/trim monitoring instruments" },
        { en: "Passage plan readiness reference (for unplanned departure)" },
      ],
      risks: [
        { en: "A security escalation from the gangway watch not receiving prompt officer-level attention or decision" },
        { en: "Draft or trim changes during cargo/ballast operations not being monitored closely enough to detect an issue with berth clearance or stability" },
        { en: "High-risk operations (bunkering, hot work) proceeding without proper authorization or oversight due to competing priorities" },
        { en: "Complacency during long port stays leading to reduced vigilance" },
        { en: "Reduced readiness to get underway unexpectedly not being recognized or communicated in time" },
        { en: "Ambiguity between the OOW's security/safety oversight and the Bosun's operational coordination, leading to a gap where neither addresses an issue" },
      ],
      bestPractices: [
        { en: "Set clear escalation criteria for gangway watchkeepers before the port stay begins so ambiguous security situations reach the OOW promptly" },
        { en: "Monitor draft and trim actively during cargo or ballast operations, not only at the start and end of the port stay" },
        { en: "Verify personally that fire and pollution watch arrangements are genuinely in place during high-risk operations, not only scheduled" },
        { en: "Regularly reassess whether conditions alongside have changed, even if no report has been received" },
        { en: "Maintain a clear mental picture of what would be required to get underway on short notice, updating it as conditions change" },
        { en: "Keep the Master informed of any factor — security, technical, or environmental — that could affect the vessel's readiness or safety while alongside" },
      ],
      commonMistakes: [
        { en: "Treating gangway security as entirely the Bosun's responsibility rather than maintaining officer-level oversight of escalations" },
        { en: "Failing to notice a gradual change in draft or trim during cargo operations because attention is focused elsewhere" },
        { en: "Allowing a high-risk operation to proceed informally without confirming proper authorization" },
        { en: "Losing track of the vessel's readiness to depart while absorbed in routine port administration" },
        { en: "Assuming the Bosun's operational reports cover everything relevant to the vessel's overall safety, without independent officer-level verification" },
      ],
      professionalTips: [
        { en: "Port stays can feel administratively quiet, but the vessel's safety obligations do not pause — maintain the same standard of attention as during navigation, adapted to a different set of risks" },
        { en: "The Bosun runs the deck team's port workload; your job is to make sure that workload never creates a safety or security gap the team cannot see from where they stand" },
        { en: "Know, at any moment during a port stay, what it would take to get the vessel ready to move — this awareness costs little to maintain and matters enormously if it is suddenly needed" },
        { en: "Security escalations deserve the same seriousness as a navigational one — a gangway watch that hesitates to call you is a bigger risk than the situation it was unsure about" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l2" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations place the OOW in direct command of the vessel's approach, positioning, and station-keeping alongside another vessel — a task requiring precise ship-handling and continuous judgment, since two vessels are moving relative to each other rather than one vessel relative to a fixed berth. While the Bosun leads the deck team's rigging and monitoring at the interface between the hulls, the OOW is responsible for the vessel's actual manoeuvring and for the decision to proceed, hold position, or abort if conditions deteriorate. Throughout the operation, the OOW continuously reassesses whether the conditions that justified proceeding still exist." },
      responsibilities: [
        { en: "Plan and direct the approach to the other vessel, using helm, engine, and thrusters (where fitted) to achieve and maintain a safe closing speed and angle" },
        { en: "Maintain continuous situational awareness of the relative position, speed, and motion of both vessels throughout the approach and the operation" },
        { en: "Communicate clearly with the other vessel's bridge team (or through an agreed common frame, e.g. the Master's designated liaison), establishing procedures before the approach begins" },
        { en: "Continuously verify that both vessels continue to operate under the same shared understanding of the manoeuvre and its current status" },
        { en: "Integrate the Bosun's reports on fender condition and mooring status with the bridge's own assessment of relative vessel motion into a single operational picture" },
        { en: "Decide whether to continue, hold, or abort the approach or the operation itself if conditions (weather, sea state, traffic, equipment) develop unfavourably" },
        { en: "Direct or coordinate emergency separation procedures if ordered, ensuring both the deck team and the counterpart vessel are aware of the action being taken" },
        { en: "Communicate any developing concern about vessel separation, weather, or equipment to the Master immediately, in line with standing orders" },
      ],
      equipment: [
        { en: "Helm, engine order telegraph, thruster controls (where fitted)" },
        { en: "Radar, ECDIS, AIS for relative motion monitoring" },
        { en: "Mooring load monitoring or tension indicators (where fitted)" },
        { en: "VHF radio for communication with the Bosun, the counterpart vessel, and the Master" },
        { en: "Passage plan / STS operational plan, weather and sea state information" },
      ],
      risks: [
        { en: "Misjudging the approach speed or angle, resulting in an unsafe closing rate or contact between vessels" },
        { en: "Relying on the counterpart vessel's assumed procedures without confirming them beforehand, particularly with an unfamiliar company or crew" },
        { en: "Loss of shared situational awareness between the two bridge teams despite ongoing communication" },
        { en: "Delayed recognition that relative vessel motion has become unsafe due to changing weather or sea state" },
        { en: "Hesitating to abort or hold the operation once already committed, despite developing signs that conditions are no longer safe" },
        { en: "Miscommunication between the OOW and the Bosun regarding fender or mooring status during a rapidly evolving situation" },
      ],
      bestPractices: [
        { en: "Confirm communication procedures and abort criteria with the counterpart vessel before the approach begins, not during it" },
        { en: "Monitor relative motion continuously throughout the operation, not only during the approach phase" },
        { en: "Set a personal threshold for aborting or holding the operation before it begins, and act on it without hesitation if conditions reach it" },
        { en: "Reconfirm critical assumptions whenever conditions change rather than relying on the original briefing alone" },
        { en: "Treat the Bosun's fender and mooring reports as one input among several — combine them with the bridge's own assessment of relative motion" },
        { en: "Communicate proactively with the Master about any deteriorating condition, rather than waiting until the situation has clearly become unsafe" },
      ],
      commonMistakes: [
        { en: "Committing to the approach without a clear, mutually confirmed understanding of procedures with the counterpart vessel" },
        { en: "Continuing an operation past a developing safety concern because significant time or effort has already been invested" },
        { en: "Underestimating how quickly relative vessel motion can change in swell, wind, or wake conditions" },
        { en: "Treating the Bosun's reports as sufficient on their own, without maintaining independent bridge-level assessment" },
        { en: "Delaying a decision to abort or hold, hoping conditions will improve on their own" },
      ],
      professionalTips: [
        { en: "Decide your abort criteria before you need them — a threshold set in advance is followed more reliably than one decided under pressure" },
        { en: "STS success depends on precise, continuous ship-handling — small, early corrections are far safer than large, late ones" },
        { en: "Two ships moving together create their own dynamics; do not assume experience with one vessel type automatically transfers to another" },
        { en: "The hardest decision in STS is often not how to proceed, but when to stop — protect your ability to make that call by not waiting too long" },
      ],
      mapReferences: [],
    },

    maintenance: {
      overview: { en: "Unlike the Bosun, who organizes and inspects deck maintenance work, the OOW's maintenance responsibility centres on the navigational and safety-critical equipment their watch depends on — verifying that equipment defects are properly recorded, reported, and followed up, and ensuring that no piece of bridge or navigational equipment is silently tolerated as 'not quite right.' The OOW does not typically perform technical repairs personally, but is the one who identifies, assesses, documents, and escalates any degradation that could affect the safety of navigation." },
      responsibilities: [
        { en: "Test and verify navigational and bridge equipment during routine watch duties, not only when a defect is suspected" },
        { en: "Record any equipment defect, degradation, or irregularity accurately and promptly in the appropriate log, distinguishing confirmed faults from suspected ones" },
        { en: "Report navigational equipment defects to the Master and, where relevant, coordinate with the Chief Officer or duty engineer for repair or workaround" },
        { en: "Verify that a reported defect has actually been addressed before considering it resolved, rather than assuming a report alone closes the matter" },
        { en: "Assess the operational impact of any outstanding defect on the current or upcoming passage, adjusting watch practices (e.g. increased reliance on other methods) accordingly" },
        { en: "Verify that any temporary operational limitations or alternative procedures resulting from equipment defects are understood and consistently applied throughout the watch" },
        { en: "Ensure required navigational publications, charts, and software (ECDIS updates, notices to mariners) are current and correctly applied" },
        { en: "Communicate any degraded equipment status clearly during watch handover, so the incoming OOW inherits an accurate picture, not an assumption of full functionality" },
      ],
      equipment: [
        { en: "Bridge equipment log / defect reporting system" },
        { en: "Planned Maintenance System (PMS) interface or defect tracking system (where applicable)" },
        { en: "Navigational publications, chart correction records, ECDIS software update status" },
        { en: "Backup or alternative navigational methods relevant to any degraded equipment" },
        { en: "Master's standing orders regarding equipment defects and reporting thresholds" },
      ],
      risks: [
        { en: "A navigational equipment defect going unreported because it seems minor or is expected to resolve itself" },
        { en: "Continuing to rely on a piece of equipment as if fully functional after a defect has been identified but not yet resolved" },
        { en: "Normalization of deviance — gradually accepting degraded equipment as 'normal' because it has been operating that way for some time" },
        { en: "An incomplete watch handover leaving the incoming OOW unaware of a known degradation" },
        { en: "Outdated charts or publications being used because updates were not verified or applied" },
        { en: "Assuming a reported defect has been fixed without confirming the repair was actually completed" },
      ],
      bestPractices: [
        { en: "Test equipment actively during the watch, not only reactively when something seems wrong" },
        { en: "Record defects factually and specifically — what is affected, since when, and what has been done about it" },
        { en: "Adjust watch practices immediately when equipment is degraded, rather than waiting for the repair before compensating" },
        { en: "Whenever possible, verify degraded equipment using an independent method rather than relying on repeated readings from the same source" },
        { en: "Verify chart corrections and publication updates are current before relying on them, particularly before an unfamiliar passage" },
        { en: "Include the full, current status of any equipment defect in every watch handover, without exception" },
      ],
      commonMistakes: [
        { en: "Not reporting a minor equipment irregularity because it does not yet affect the current watch" },
        { en: "Continuing normal watch practice as if equipment were fully functional after a defect has been identified" },
        { en: "Passing along a defect report from a previous watch without personally verifying its current status" },
        { en: "Relying on outdated charts or publications because updates were not checked" },
        { en: "Giving an incomplete handover that omits a known equipment limitation, leaving the next OOW to discover it independently" },
      ],
      professionalTips: [
        { en: "An unreported defect is worse than a reported one — the OOW who says nothing has not made the equipment work, only made the risk invisible" },
        { en: "Treat 'it's probably fine' as a signal to check, not a conclusion — equipment degradation rarely announces itself clearly" },
        { en: "A watch handover that mentions every known limitation, however minor, is worth more than one that sounds reassuring but leaves gaps" },
        { en: "Good watchkeeping habits assume equipment can fail — build in the cross-checks that make a single defect survivable, not catastrophic" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d3-l6" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the OOW's first responsibility is often the one most easily overlooked under pressure: the vessel must still be safely conducted, even while the emergency itself is being managed. Depending on the nature of the emergency, the OOW may be the one who first recognizes and raises the alarm, the one who continues to navigate the vessel while others respond, or the one who takes on a specific emergency role under the Master's direction. Detailed procedures for each type of emergency are covered in the Safety curriculum; this phase focuses on how the OOW is expected to think and act once an emergency begins. An emergency changes the priorities of navigation, but it never removes the responsibility to navigate safely." },
      responsibilities: [
        { en: "Recognize and raise the alarm immediately upon detecting an emergency, providing an initial, accurate assessment (nature, location, immediate risk) to the Master" },
        { en: "Continue to ensure the safe navigation of the vessel throughout the emergency, unless explicitly relieved of the watch or directed otherwise by the Master" },
        { en: "Confirm explicitly whenever responsibility for the conduct of the vessel is transferred, relieved, or resumed during the emergency" },
        { en: "Take the specific emergency role assigned by the muster list or the Master's direction, integrating it with ongoing navigational responsibility where both apply" },
        { en: "Maintain clear, calm communication with the Master and bridge team, providing updates as the situation develops rather than waiting to be asked" },
        { en: "Adjust the vessel's course, speed, or position as required by the emergency (e.g. manoeuvring for a man overboard recovery, positioning for firefighting or damage control support)" },
        { en: "Coordinate with other departments (engine, safety teams) through the bridge as the vessel's point of navigational continuity during the response" },
        { en: "Record key times, decisions, and communications accurately as the emergency unfolds, to the extent practicable without compromising the response itself" },
        { en: "Reassess continuously whether the vessel's position, heading, or speed remain appropriate as the emergency and its response evolve" },
      ],
      equipment: [
        { en: "Bridge communication equipment (radio, internal comms, alarms)" },
        { en: "Emergency checklists / quick-reference cards specific to the bridge role in various emergency types" },
        { en: "Emergency manoeuvring information / bridge contingency procedures (where applicable)" },
        { en: "Manoeuvring equipment (helm, engine controls, thrusters) as required to support the emergency response" },
        { en: "Muster list and emergency organization reference" },
      ],
      risks: [
        { en: "Losing focus on the vessel's safe navigation while attention is consumed by the emergency itself" },
        { en: "Tunnel vision — focusing exclusively on the emergency while losing awareness of the wider navigational picture" },
        { en: "Delayed or unclear initial alarm and assessment, slowing the overall response" },
        { en: "Confusion between navigational responsibility and an assigned emergency role when both apply simultaneously" },
        { en: "Miscommunication with the Master or bridge team under the stress of a developing situation" },
        { en: "Failing to reassess the vessel's course, speed, or position as the emergency response itself changes the surrounding circumstances (e.g. other vessels approaching to assist)" },
      ],
      bestPractices: [
        { en: "Raise the alarm the moment an emergency is recognized — a slightly imperfect early report is more valuable than a delayed, complete one" },
        { en: "Never let the emergency response cause navigation to be forgotten — explicitly confirm who is conducting the vessel at every stage" },
        { en: "Communicate proactively and specifically with the Master, rather than waiting to be asked for an update" },
        { en: "Reduce uncertainty by communicating intentions as well as observations whenever time permits" },
        { en: "Keep manoeuvring decisions during an emergency deliberate and clearly communicated, even under time pressure" },
        { en: "Continuously reassess the surrounding situation as the response unfolds — other vessels, changing weather, or drifting position can all change what 'safe navigation' requires" },
      ],
      commonMistakes: [
        { en: "Becoming absorbed in the emergency response and neglecting the vessel's ongoing safe navigation" },
        { en: "Delaying the initial alarm while trying to fully confirm the situation first" },
        { en: "Assuming someone else is conducting the vessel when no explicit handover of that responsibility has occurred" },
        { en: "Providing updates to the Master only when asked, rather than proactively as the situation develops" },
        { en: "Failing to reassess navigational safety as the emergency response itself changes the surrounding circumstances" },
      ],
      professionalTips: [
        { en: "In any emergency, someone must still be navigating the vessel — make sure that responsibility is never left ambiguous, especially if you are also assigned another role" },
        { en: "An early, imperfect alarm saves more time than a late, polished one — raise it the moment you recognize the situation" },
        { en: "The Master relies on the OOW to keep the navigational picture current throughout an emergency — this responsibility does not pause because something more dramatic is happening" },
        { en: "The discipline you bring to an emergency reflects the discipline you have practiced during every routine watch beforehand" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d3-l7" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "During a night watch, radar shows a target on a steady bearing with decreasing range — a possible risk of collision — but visibility is reduced and the target's aspect is not yet clearly confirmed visually." },
      mission: { en: "Decide and act early enough that any necessary action remains simple and unambiguous to the other vessel." },
      expectedActions: [
        { en: "Do not wait for full visual confirmation before assessing the situation — treat a steady bearing with decreasing range as a developing risk of collision" },
        { en: "Take early and substantial action in accordance with COLREG once risk is assessed, rather than a late, minor adjustment" },
        { en: "Inform the Master if the situation approaches any threshold defined in standing orders" },
        { en: "Continue to monitor and reassess as the situation develops, adjusting action if the target's behaviour changes" },
      ],
      why: [{ en: "Waiting for full certainty before acting is itself a delay that narrows the safety margin — COLREG's requirement for early, substantial action exists precisely because late action is harder for both vessels to interpret correctly. Good watchkeeping manages uncertainty rather than waiting for it to disappear." }],
      commonMistakes: [
        { en: "Waiting for visual confirmation before beginning any assessment" },
        { en: "Taking a small, ambiguous action instead of an early, clear one" },
        { en: "Failing to inform the Master because the situation 'isn't serious yet'" },
      ],
      safetyPoints: [{ en: "A single radar contact assessed early and calmly is far safer than the same contact reassessed in a panic once it has become a close-quarters situation." }],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l8" }],
    },
    {
      situation: { en: "Midway through a demanding watch in traffic, a crew member reports that the ECDIS has briefly frozen and recovered on its own. It appears to be working normally now." },
      mission: { en: "Decide whether 'working normally now' is sufficient, or whether the defect requires further action despite the immediate pressure of the watch." },
      expectedActions: [
        { en: "Record the defect as reported, even though it appears resolved" },
        { en: "Cross-check the vessel's position independently (radar, GPS, visual) rather than trusting the ECDIS alone for the remainder of the watch" },
        { en: "Consider whether temporary compensatory measures remain appropriate until the defect has been formally investigated" },
        { en: "Report the defect to the Master and, where relevant, to the department responsible for equipment follow-up" },
        { en: "Include the full defect history in the watch handover, regardless of whether it recurs again before the watch ends" },
      ],
      why: [{ en: "An intermittent defect that 'resolves itself' is not the same as a resolved defect — treating it as closed risks normalization of a deviance that could recur at a worse moment." }],
      commonMistakes: [
        { en: "Assuming the equipment is fine because it currently displays normally" },
        { en: "Not reporting the defect because the watch is busy" },
        { en: "Omitting the incident from the handover because 'it's working again now'" },
      ],
      safetyPoints: [{ en: "The absence of a current symptom is not evidence of a resolved cause — independent verification remains necessary until the defect is properly investigated." }],
      mapReferences: [],
    },
    {
      situation: { en: "A pilot is conducting the vessel's approach to berth. The OOW notices the vessel's position relative to a moored vessel appears closer than expected, though the pilot has given no indication of concern." },
      mission: { en: "Decide whether and how to raise the observation without undermining the pilot's conduct of the vessel, while preserving the OOW's own responsibility for the vessel's safety." },
      expectedActions: [
        { en: "Raise the observation clearly and promptly with the pilot and/or Master — do not stay silent out of deference to the pilot's authority" },
        { en: "Express the concern using objective bridge information (distance, closing rate, bearing) rather than personal opinion whenever possible" },
        { en: "Be prepared to escalate to the Master immediately if the concern is not adequately addressed" },
        { en: "Continue independent monitoring throughout the approach regardless of the pilot's reassurance" },
      ],
      why: [{ en: "The presence of a pilot changes who conducts the vessel, not who remains responsible for its safety — the OOW's silence in the face of a genuine concern removes a safety layer that exists precisely for this situation." }],
      commonMistakes: [
        { en: "Staying silent to avoid appearing to question the pilot's judgment" },
        { en: "Raising a vague concern instead of a specific, actionable observation" },
        { en: "Stopping independent monitoring once the concern has been raised once" },
      ],
      safetyPoints: [{ en: "Respect for the pilot's expertise and the OOW's duty to intervene are not in conflict — professional pilots expect and welcome a clear, factual observation from the bridge team." }],
      mapReferences: [],
    },
  ],

  professionalTips: [
    { en: "Decide early, act clearly — the value of a good decision decreases the longer it is delayed, even if the decision itself doesn't change." },
    { en: "Treat every readiness report you give as a professional declaration, not a routine statement — the Master depends on its accuracy, not its reassurance." },
    { en: "No single instrument tells the whole story — build your situational picture from multiple sources, and trust none of them blindly." },
    { en: "Calling the Master is never a failure — it is exactly what your role and the standing orders require of a professional officer." },
    { en: "An unreported defect is more dangerous than a reported one — silence does not make equipment work; it only hides the risk." },
    { en: "Respect for a pilot's expertise and your own duty to intervene are not in conflict — raise any genuine concern clearly and factually, every time." },
    { en: "A watch handover is only as good as its honesty — include what went well and what remains uncertain, not just what is convenient to report." },
    { en: "Manage your attention deliberately — the busiest-looking problem is not always the one that most needs it right now." },
    { en: "Being an OOW is not simply about knowing the rules — it is about applying professional judgment continuously under uncertainty and accepting personal accountability for every decision made." },
    { en: "Good watchkeeping is measured not by the absence of problems, but by how early they are recognised and how effectively they are managed." },
  ],

  professionalMindset: [
    { en: "Think in terms of risk trajectory, not just current state. A situation is rarely dangerous the moment it is first observed — it becomes dangerous through how it develops. An OOW watches where things are heading, not only where they are now." },
    { en: "Treat certainty as a luxury you rarely have. Waiting for full confirmation before deciding is itself a decision — often the wrong one. Professional judgment means acting responsibly on the best available picture, not the perfect one." },
    { en: "See yourself as personally accountable, not merely present. A watch is not something you attend — it is something you answer for. Every course held, every action taken or not taken, traces back to a decision you made." },
    { en: "Assume every source of information is partial. Radar, AIS, ECDIS, and visual observation each tell part of the story. The OOW's real skill is integrating them into one coherent navigational picture, without over-trusting any single one." },
    { en: "Recognize that authority and responsibility are not always in the same place. A pilot may conduct the vessel; the Master holds ultimate command — but the OOW's own responsibility for the vessel's safety never transfers away simply because someone else is also involved." },
    { en: "Hold the whole navigational picture, even while managing one part of it. An emergency, a defect, or a single close-quarters situation can dominate your attention — but the vessel's overall situation does not pause while your focus narrows." },
    { en: "Treat routine watches with the same discipline as difficult ones. The habits that hold up during a genuine emergency are the same ones practiced, or neglected, during a thousand ordinary watches beforehand." },
    { en: "Remain willing to revise your assessment. The first explanation that fits the situation is not always the correct one. Professional judgment includes recognizing when new information requires abandoning an earlier conclusion." },
    { en: "Accept that communication is part of navigation, not separate from it. A decision made correctly but never communicated to the Master, the pilot, or the bridge team is only half complete — the vessel's safety depends on a shared operational picture, not just individual judgment." },
  ],

  professionalDocumentation: [
    { en: "Deck Logbook — The OOW is normally responsible for personally recording navigational events during their watch: course and speed changes, position fixes, sightings, communications with the Master or pilot, and any incident. Unlike the Bosun, who consolidates information for others to log, the OOW's entries are often the primary legal record of what happened during navigation." },
    { en: "Passage plan and chart records — The OOW verifies and, where required, annotates the passage plan and charts (paper or ECDIS) with actual track, position fixes, and any deviation from the planned route, ensuring the navigational record accurately reflects the voyage actually conducted, not merely the voyage originally planned." },
    { en: "Bridge equipment defect log — The OOW records equipment irregularities factually and promptly, distinguishing confirmed defects from suspected ones, and follows through to confirm resolution rather than leaving an entry open indefinitely." },
    { en: "Watch handover record — The OOW's handover, whether written, verbal, or both depending on company procedure, must accurately convey the navigational picture, outstanding concerns, ongoing issues, and any assumptions that still require verification to the incoming OOW." },
    { en: "Master's standing orders and night order book — The OOW reads, acknowledges, and applies these instructions, and signs or confirms understanding as required by company procedure — this is not paperwork to skim, but the Master's explicit direction for the watch." },
    { en: "Bridge operational checklists — Before departure, arrival, pilot boarding, restricted visibility, heavy weather, or other critical phases, the OOW completes or contributes to bridge checklists as required by company procedures, ensuring that recorded confirmations reflect actions actually completed rather than assumptions." },
    { en: "Incident and near-miss reports — When an incident or near-miss occurs during the OOW's watch, they contribute an accurate, factual account, distinguishing what was directly observed, what was reported by others, and what is inferred, in support of the vessel's safety management system." },
    { en: "Why this matters: Unlike most other records aboard, many entries the OOW makes carry direct legal and regulatory weight — in an investigation, the deck logbook and passage plan records are often the primary evidence of what actually happened during navigation. An OOW who treats this documentation with the same seriousness as the navigational decisions themselves protects the vessel, supports regulatory compliance, and preserves the integrity of the factual record." },
  ],

  environmentalResponsibilities: [
    { en: "Discharge authorization and oversight — Where company procedures assign this responsibility, the OOW authorizes and directly oversees any permitted discharge conducted during the watch (e.g. treated bilge water via the Oily Water Separator, within MARPOL limits and documented zones), verifying the equipment and conditions genuinely permit it before authorizing the action." },
    { en: "MARPOL zone awareness — The OOW verifies the vessel's position against applicable MARPOL Annex zones (special areas, ECAs) before any discharge decision, ensuring the passage plan and watch practices account for any zone-specific restriction along the route." },
    { en: "Oil Record Book entries — Where the OOW is designated to make or verify Oil Record Book entries during their watch, these must accurately and promptly reflect any operation covered by MARPOL Annex I, recorded as it occurs rather than reconstructed afterward." },
    { en: "Immediate pollution prevention measures — When there is a risk of pollution, the OOW takes immediate actions within their authority to minimize or prevent environmental harm while informing the Master without delay, ensuring that environmental protection begins before the formal reporting process." },
    { en: "Reporting environmental incidents — The OOW who observes or is informed of a sheen, unusual discharge, or any sign of pollution reports it to the Master immediately, distinguishing confirmed observation from suspicion, and ensures the vessel's position and time are accurately recorded alongside the report, preserving any factual information that may later support the investigation." },
    { en: "Weather routing and emission awareness — Where the passage plan includes environmental objectives such as fuel-efficient routing or measures supporting the vessel's CII/EEXI strategy, the OOW follows the approved plan during the watch and does not alter routing solely for efficiency without proper authorization." },
    { en: "Why this matters: Environmental compliance at the OOW level is not a matter of general awareness — it involves specific, documented, and legally consequential decisions made during the watch. An OOW who authorizes a discharge, records an entry, or reports an incident is creating a record that regulators, auditors, and investigators may rely on directly. Precision and honesty in these decisions protect the vessel's compliance, the company's reputation, and the integrity of the environmental record." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Make independent navigational decisions during your watch (course, speed, collision avoidance action) within the Master's standing orders and the passage plan" },
      { en: "Call the Master at any time, for any reason, without needing to justify the call in advance" },
      { en: "Take early and substantial action to avoid risk of collision, in accordance with COLREG, without waiting for prior approval" },
      { en: "Direct the helmsman, lookout, and bridge team during your watch, including assigning specific tasks and correcting technique on the spot, while maintaining effective Bridge Resource Management" },
      { en: "Authorize permitted discharges during your watch where company procedures assign you this responsibility, after verifying conditions genuinely permit it" },
      { en: "Raise a concern or objection to a pilot's conduct of the vessel, and escalate to the Master if the concern is not adequately addressed" },
      { en: "Adjust course, speed, or manoeuvring as required to respond to a developing emergency, before or, where necessary, without waiting for the Master to arrive on the bridge" },
      { en: "Temporarily suspend an operation under your control (pilotage, departure, approach, transfer) when continuing would present an immediate risk, while informing the Master as soon as practicable" },
      { en: "Refuse to proceed with an action you judge unsafe, and report your decision and reasoning immediately to the Master" },
    ],
    youCannot: [
      { en: "Deviate from the Master's standing orders or the approved passage plan without authorization, except where immediate safety requires it, followed by immediate notification to the Master" },
      { en: "Alter the vessel's routing solely for fuel efficiency or environmental optimization without proper authorization, where this deviates from an officer-approved plan" },
      { en: "Assume conduct of the vessel from a pilot without clear communication and, where required, the Master's awareness" },
      { en: "Certify or resolve an equipment defect as fixed based on your own assessment alone, where company procedure requires technical confirmation" },
      { en: "Manage the deck department's daily work organization or discipline — this remains with the Chief Officer and Bosun" },
      { en: "Take command of the vessel in place of the Master, except where explicitly authorized by standing orders or where the Master's incapacity or absence requires immediate action to protect the vessel" },
      { en: "Omit or alter a factual entry in the deck logbook, passage plan record, or Oil Record Book to make a situation appear other than what actually occurred" },
      { en: "Delegate responsibility for the safety of the watch, even when individual tasks are assigned to others" },
      { en: "Bypass the chain of command by making a decision affecting the vessel's overall safety, another department, or company policy, without promptly informing the Master" },
    ],
  },

  commonMistakes: [
    { en: "Waiting for certainty before deciding — Delaying action until a situation is fully confirmed, when professional judgment means acting responsibly on the best available picture well before that point." },
    { en: "Trusting a single source of information — Relying on one instrument, one report, or one impression as if it were the complete picture, rather than cross-checking it against others." },
    { en: "Treating a readiness or handover report as a formality — Confirming that everything is 'fine' without having genuinely verified it, because the report is expected rather than because it is true." },
    { en: "Hesitating to call the Master — Avoiding or delaying a call out of concern about appearing unable to handle the situation, when the role explicitly expects and requires that call." },
    { en: "Deferring entirely to a pilot's judgment — Treating the pilot's presence as removing the OOW's own responsibility for the vessel's safety, rather than maintaining independent assessment throughout." },
    { en: "Letting an unresolved concern go unreported — Continuing to operate as normal despite an equipment defect, a navigational doubt, or an environmental risk, hoping it resolves itself before it needs to be raised." },
    { en: "Confusing routine with reduced vigilance — Applying less attention or verification to a familiar situation than to an unfamiliar one, when routine is where risk most often goes unnoticed." },
    { en: "Becoming mentally committed to an initial assessment — Continuing to interpret new information in a way that supports an earlier conclusion, rather than genuinely reassessing when the evidence changes." },
    { en: "Losing track of the whole picture while managing one part of it — Allowing an emergency, a defect, or a single close-quarters situation to absorb all attention, while the vessel's broader situation continues to evolve." },
    { en: "Assuming silence means everything is normal — Interpreting the absence of reports, alarms, or requests as evidence that the situation is under control, instead of actively confirming that conditions remain as expected." },
    { en: "Allowing time pressure to narrow judgment — Believing that being busy justifies skipping a verification or delaying a communication, when pressure is often the moment disciplined routines matter most." },
  ],

  careerProgression: [
    { en: "Next role: Chief Officer (Chief Mate) — a significant step, requiring further certification and a shift from standing an individual navigational watch to managing the deck department as a whole: cargo operations, stability, planning, and the coordination of the ship's entire deck organization on behalf of the Master." },
    { en: "Skills to develop: Cargo operations and stability calculations; departmental planning and resource management across multiple simultaneous activities (not just one watch); leadership and decision-making beyond the bridge — developing the ability to coordinate people, resolve operational conflicts, mentor junior officers, and maintain departmental standards over time rather than during a single watch; broader regulatory and commercial responsibility (port state control, class surveys, charter party requirements); the ability to represent the Master's authority across the whole deck department, not just during a single watch." },
    { en: "Recommended experience: A solid period as OOW across the full range of navigational and watchkeeping situations (pilotage, restricted visibility, emergency response, multiple vessel types if possible), with demonstrated reliability in independent judgment and communication with the Master — this operational experience builds the professional credibility on which a Chief Officer's departmental authority is built." },
    { en: "Certificates typically required: Certificates required vary by flag State, company policy, and national administration. Progression to Chief Officer typically requires the corresponding STCW certificate of competency (Chief Mate), sufficient certified sea time as OOW, and any additional endorsements required for the vessel type or trade." },
    { en: "Recommended MAP courses: Cargo Operations & Stability; Ship Management & Departmental Planning; Role On Board – Chief Officer (when available); Specialized Operations (depending on vessel type); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving from OOW to Chief Officer means shifting your primary focus from conducting a single watch to managing the deck department's entire operation across every watch, every day. Navigational judgment remains essential, but planning, delegation, and departmental accountability become your defining responsibilities. Success as a Chief Officer is measured less by how well you personally perform each task, and more by how effectively the entire deck department performs under your leadership." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping" } },
    { kind: "lesson", lessonId: "d1-l5", label: { en: "Compass & Headings" } },
    { kind: "lesson", lessonId: "d1-l6", label: { en: "Practical Navigation" } },
    { kind: "lesson", lessonId: "d3-l2", label: { en: "Lights & Shapes" } },
    { kind: "lesson", lessonId: "d3-l3", label: { en: "Sound Signals & Fog" } },
    { kind: "lesson", lessonId: "d3-l5", label: { en: "VHF Radio Procedures" } },
    { kind: "lesson", lessonId: "d4-l1", label: { en: "Bridge Watch & Reporting" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "lesson", lessonId: "s6-l6", label: { en: "Safety Culture & Professional Responsibility" } },
    { kind: "lesson", lessonId: "d1-l8", label: { en: "Advanced COLREG" } },
    { kind: "lesson", lessonId: "d3-l6", label: { en: "AIS & Electronic Navigation" } },
    { kind: "lesson", lessonId: "d3-l7", label: { en: "GMDSS & Distress Signals" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — navigation, bridge, and watchkeeping terminology" } },
    { kind: "external", externalCode: "SMCP", label: { en: "SMCP (Standard Marine Communication Phrases) reference" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on STCW OOW certification requirements by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore bridge arrangements, navigational equipment, and operational characteristics across different vessel types to understand how watchkeeping practices adapt between ships" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on navigation, watchkeeping, COLREG, or STCW requirements" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from OOW to Chief Officer and beyond" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time, certificates, and watchkeeping responsibilities gained as OOW" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_BOSUN", label: { en: "Role On Board — Bosun" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_CHIEF_OFFICER", label: { en: "Role On Board — Chief Officer (when published)" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Navigational decisions during my watch (course, speed, collision avoidance action) within standing orders and the passage plan" },
      { en: "Direct conduct of the vessel during departure, arrival, anchoring, and STS manoeuvres, where assigned to the watch and within the Master's standing orders" },
      { en: "Deck logbook, passage plan annotations, and Oil Record Book entries where assigned" },
      { en: "Bridge team direction (helm orders, lookout tasking) and coordination of communication with the Master, pilot, engine room, and shore authorities as required, throughout my watch" },
      { en: "Immediate emergency actions and manoeuvring required by a developing situation within my watchkeeping responsibility" },
    ],
    iMonitor: [
      { en: "The vessel's position, course, and speed against the passage plan continuously" },
      { en: "Risk of collision from all observed or detected traffic" },
      { en: "Navigational and bridge equipment status and reliability" },
      { en: "The vessel's readiness to get underway at all times, including while alongside or at anchor" },
      { en: "Shared situational awareness across the bridge team, including during pilotage or STS operations" },
    ],
    iReport: [
      { en: "Any deviation from the passage plan, standing orders, or expected vessel behaviour" },
      { en: "Any equipment defect, distinguishing confirmed faults from suspected ones" },
      { en: "Any environmental incident or pollution risk, distinguishing confirmed observation from suspicion" },
      { en: "My own uncertainty when a situation cannot be fully resolved at my level" },
      { en: "A complete and honest watch handover, including anything unresolved" },
    ],
    iDoNotAuthorize: [
      { en: "Deviation from the Master's standing orders or approved passage plan without proper authorization" },
      { en: "Discharge of oil, oily water, garbage, or regulated substances outside my assigned authority or documented conditions" },
      { en: "Assumption of conduct of the vessel from a pilot without clear communication and Master awareness" },
      { en: "Alteration of the deck department's daily organization — this remains with the Chief Officer and Bosun" },
      { en: "My own delegation of responsibility for the safety of the watch, even when individual tasks are assigned to others" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Bridge layout showing typical OOW watchkeeping position and equipment arrangement." } },
    { kind: "diagram", caption: { en: "COLREG collision avoidance decision flow (early action, substantial action, ample time/room)." } },
    { kind: "image", caption: { en: "Example of a properly completed passage plan with annotated track and position fixes." } },
    { kind: "video", caption: { en: "Demonstration of a complete and effective watch handover between two OOWs." } },
    { kind: "document", caption: { en: "Sample bridge equipment defect log entry." } },
  ],
};

// ── CHIEF OFFICER ─────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-26_role-on-board-chief-officer-mapreferences.md) and the
// Product Owner's final decisions on that report. e1-l3 and d4-l5 are
// explicitly flagged as partial/foundation-level coverage — no dedicated
// officer-level Cargo Operations & Stability lesson exists yet. Locations
// with no validated correspondence are left as mapReferences: []
// intentionally (candidates for future lessons — Leadership/Supervision,
// Cargo Operations & Stability — not filled with approximate matches).
const CHIEF_OFFICER_CARD: RoleOnBoardCard = {
  rankId: "chief_officer",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Chief Officer (Chief Mate) is the head of the deck department, responsible for cargo operations, stability, deck maintenance planning, and the overall organization and performance of the deck team — OOWs, Bosun, and ratings — on behalf of the Master. Unlike the OOW, who manages the safe conduct of a single watch, the Chief Officer manages the safe operation of the deck department, ensuring consistent operational standards across every watch, every operation, and every day." },
    { en: "The Chief Officer holds direct responsibility for cargo and ballast operations (planning, stability, stress calculations) and for ensuring the vessel remains safely loaded and stable throughout the voyage — a technical, operational, and statutory responsibility distinct from anything at the OOW or Bosun level." },
    { en: "The Chief Officer plans and oversees the deck department's maintenance program, safety drills, and administrative requirements (certificates, surveys, port state control), coordinating resources across multiple simultaneous priorities while ensuring routine operations continue safely despite competing priorities." },
    { en: "The Chief Officer supervises and develops the OOWs and the Bosun, ensuring consistent standards across watches and operations, and acts on behalf of the Master for the routine management of the deck department whenever the Master is not directly exercising that authority." },
    { en: "Where the OOW's judgment resolves ambiguity at the level of a single watch, the Chief Officer's judgment resolves ambiguity at the level of the department as a whole — balancing cargo, safety, maintenance, and personnel simultaneously, often under commercial and regulatory pressure." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Master (direct report, second-in-command of the vessel)" },
    ],
    worksWith: [
      { en: "OOWs for watch standards and cargo/navigation coordination" },
      { en: "Bosun for deck team organization and maintenance" },
      { en: "Chief Engineer for cross-department coordination (stability, ballast, dry-dock)" },
      { en: "Surveyors, port state control, agents, and charterers for cargo and certification matters" },
      { en: "Terminal representatives and stevedores during cargo operations" },
    ],
    mentors: [
      { en: "Master, whose operational judgment and command experience prepare the Chief Officer for future command responsibilities" },
    ],
    supports: [
      { en: "OOWs, whom the Chief Officer supervises and develops toward their own further certification" },
      { en: "The Bosun, whose deck organization the Chief Officer directs at a departmental level" },
    ],
  },

  professionalSkills: [
    { label: { en: "Cargo operations planning and execution" }, mapReferences: [{ kind: "lesson", lessonId: "d4-l5" }] },
    { label: { en: "Stability, stress, and loading calculations" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l3" }] },
    { label: { en: "Risk assessment and operational prioritization" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l5" }] },
    { label: { en: "Departmental planning and resource management" } },
    { label: { en: "Supervision and development of OOWs and the Bosun" } },
    { label: { en: "Safety management and drills coordination" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l6" }] },
    { label: { en: "Regulatory compliance and certification management (port state control, class, flag state)" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }] },
    { label: { en: "Commercial coordination (charterers, agents, surveyors)" } },
    { label: { en: "Emergency command support and departmental crisis coordination" }, mapReferences: [{ kind: "lesson", lessonId: "s4-l7" }] },
    { label: { en: "Departmental communication and reporting to the Master" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l10" }, { kind: "lesson", lessonId: "d4-l1" }] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Chief Officer's responsibility is neither the OOW's navigational verification nor the Bosun's deck team organization — it is confirming that the vessel's cargo, stability, and departmental readiness are all sound, and that the reports from both the OOW and the Bosun form a consistent, complete picture before the Chief Officer reports departmental readiness to the Master. The Chief Officer's role is to ensure that no unresolved departmental uncertainty reaches the Master disguised as readiness. The Chief Officer does not personally test navigational equipment or inspect every mooring line, but is accountable for the overall soundness of the department's preparation." },
      responsibilities: [
        { en: "Verify final stability and stress calculations against the actual loaded condition, confirming the vessel is safely configured for the intended departure and passage" },
        { en: "Review and reconcile the OOW's navigational readiness report and the Bosun's deck team readiness report into a single departmental assessment" },
        { en: "Confirm that any outstanding cargo, maintenance, or certification matter does not compromise the vessel's readiness to depart safely" },
        { en: "Verify that drills, certificates, or surveys due before departure have been completed or are not overdue in a way that would affect the vessel's compliance" },
        { en: "Resolve any discrepancy between the OOW's and Bosun's reports personally, rather than passing an unreconciled picture to the Master" },
        { en: "Prioritize unresolved issues according to their operational impact, ensuring that critical deficiencies are addressed before non-critical administrative matters" },
        { en: "Report departmental readiness to the Master, distinct from and encompassing both navigational and deck team readiness" },
        { en: "Coordinate with the Chief Engineer to confirm cross-departmental readiness factors affecting stability or departure (ballast, trim) are aligned" },
      ],
      equipment: [
        { en: "Stability and stress calculation software/booklet, loading computer" },
        { en: "Cargo and ballast plan, draft survey records" },
        { en: "Cargo documentation (loading plan, cargo manifest, dangerous goods documentation where applicable)" },
        { en: "Certificate and survey tracking system" },
        { en: "Departmental readiness checklist consolidating navigational and deck inputs" },
      ],
      risks: [
        { en: "Reporting departmental readiness to the Master without genuinely reconciling the OOW's and Bosun's separate reports" },
        { en: "A stability or stress calculation error going unnoticed because it was not independently verified against the actual loaded condition" },
        { en: "An overdue certificate, survey, or drill being overlooked amid cargo and departure pressures" },
        { en: "Assuming cross-departmental readiness (e.g. engine room ballast operations) without direct confirmation from the Chief Engineer" },
        { en: "Allowing commercial departure pressure to influence technical readiness decisions" },
        { en: "Deferring to the OOW's or Bosun's assessment entirely without personally verifying the areas for which the Chief Officer is accountable" },
      ],
      bestPractices: [
        { en: "Treat the OOW's and Bosun's readiness reports as inputs to be reconciled, not as a completed picture to simply relay upward" },
        { en: "Verify stability and stress figures against the actual condition, not only the planned one, before departure" },
        { en: "Track certificates, surveys, and drill schedules proactively, rather than discovering an overdue item under departure pressure" },
        { en: "Confirm cross-departmental factors directly with the Chief Engineer rather than assuming alignment" },
        { en: "Resolve the highest-risk uncertainties first before refining lower-priority issues" },
        { en: "Resolve any discrepancy or uncertainty before reporting readiness to the Master, even if it requires a short delay" },
      ],
      commonMistakes: [
        { en: "Relaying the OOW's and Bosun's reports to the Master without adding a personal, reconciled assessment" },
        { en: "Trusting planned stability figures without confirming them against the actual loaded condition" },
        { en: "Overlooking a certificate or survey deadline because attention is focused on cargo or departure logistics" },
        { en: "Assuming engine room readiness factors are aligned without direct confirmation" },
        { en: "Reporting readiness under time pressure without having genuinely resolved an open question" },
      ],
      professionalTips: [
        { en: "Departmental readiness is not the sum of two separate reports — it is the Chief Officer's own reconciled judgment built from them" },
        { en: "A stability calculation is only as reliable as the data it is built on — verify the data, not just the arithmetic" },
        { en: "Certificates and surveys rarely become urgent gradually — track them continuously so they never become a departure-day surprise" },
        { en: "Cross-departmental readiness depends on direct confirmation, not assumption — a five-minute conversation with the Chief Engineer prevents most surprises" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l3" }, { kind: "lesson", lessonId: "d2-l1" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Chief Officer is typically stationed as officer-in-charge of a mooring station (commonly forward), providing qualified technical judgment and decision authority at that station — distinct from the Bosun's hands-on organization of the crew executing the lines, and distinct from the OOW's conduct of the vessel from the bridge. The Chief Officer's role is to translate the bridge's orders into precise station-level decisions, verify the technical condition of equipment under load, and report back information the bridge can rely on without further interpretation. The Chief Officer ensures that the bridge receives technically validated information from the station, allowing manoeuvring decisions to be based on reliable, interpreted reports rather than raw observations." },
      responsibilities: [
        { en: "Take charge of the assigned mooring station as the responsible officer, with authority to make station-level decisions within the sequence ordered by the bridge" },
        { en: "Verify the technical condition of lines, wires, and winches under load, and decide whether continued use is safe as the manoeuvre progresses" },
        { en: "Relay precise, technical reports to the bridge (line status, remaining capacity, any developing issue) rather than passing along the crew's raw observations unfiltered" },
        { en: "Coordinate directly with the Bosun regarding crew positioning and technique at the station, without duplicating the Bosun's day-to-day team management" },
        { en: "Anticipate how developments at the station may affect the overall manoeuvre, reporting emerging risks before they become operational constraints" },
        { en: "Assess whether trim or draft changes during the manoeuvre (e.g. ballast shifting) remain within safe limits, escalating to the bridge if a stability concern develops" },
        { en: "Confirm station readiness and completion to the bridge clearly and promptly, enabling the OOW to sequence the overall manoeuvre with confidence" },
        { en: "Report any equipment failure, technical concern, or safety issue at the station immediately, with a professional assessment of its severity" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the station" },
        { en: "Mooring lines, wires, winches — assessed at a technical/decision level, distinct from the Bosun's operational oversight" },
        { en: "Mooring arrangement plan / station layout" },
        { en: "Portable radio for communication with the bridge and the Bosun" },
        { en: "Trim/draft reference information relevant to the manoeuvre" },
      ],
      risks: [
        { en: "Making a station-level decision that conflicts with the bridge's overall sequencing due to incomplete communication" },
        { en: "Relaying an imprecise or overly raw report to the bridge, forcing the OOW to interpret rather than act" },
        { en: "Focusing exclusively on the assigned station while losing awareness of how its status affects the overall manoeuvre" },
        { en: "Missing a developing equipment issue because attention is divided between technical assessment and station coordination" },
        { en: "Failing to recognize a trim or stability implication of the manoeuvre in time to escalate it" },
        { en: "Undermining the Bosun's crew coordination by duplicating instructions rather than working through them" },
      ],
      bestPractices: [
        { en: "Confirm the overall manoeuvre sequence with the bridge before the station begins acting, to avoid a station-level decision conflicting with the bridge's plan" },
        { en: "Report station status in terms the bridge can act on directly — specific, technical, and unambiguous" },
        { en: "Report significant trends, not only current conditions, whenever they may influence the bridge's next decision" },
        { en: "Work through the Bosun for crew-level coordination rather than issuing parallel instructions to individual crew members" },
        { en: "Maintain awareness of trim and draft implications throughout the manoeuvre, not only at its start and end" },
        { en: "Escalate any technical concern the moment it is identified, rather than attempting to resolve it alone under time pressure" },
      ],
      commonMistakes: [
        { en: "Acting on a station-level judgment without confirming it aligns with the bridge's overall sequence" },
        { en: "Passing along an unfiltered crew observation instead of a clear professional assessment" },
        { en: "Duplicating the Bosun's instructions to the crew, creating confusion about who is directing the team" },
        { en: "Missing a stability or trim implication because attention is fixed on the mechanics of the station" },
        { en: "Delaying the report of a technical concern while attempting to manage it independently first" },
      ],
      professionalTips: [
        { en: "Your value at the station is precision — the bridge should never have to ask a follow-up question to understand your report" },
        { en: "Authority at a station means making the right call within its scope, not making every call — work with the Bosun, not around them" },
        { en: "A departure manoeuvre involves more than lines and winches; keep the vessel's overall condition in view, not just the equipment in front of you" },
        { en: "The station that reports clearly and promptly is the one the bridge trusts most during the next manoeuvre" },
      ],
      mapReferences: [],
    },

    navigation: {
      overview: { en: "During navigation, the Chief Officer stands their own watch under the same principles covered in the OOW curriculum, but their departmental responsibility extends well beyond that single watch: overseeing the standard of watchkeeping across all OOWs, monitoring the vessel's stability and cargo condition throughout the passage, and progressing the department's administrative and planning work toward the next port. The Chief Officer ensures that watchkeeping remains a consistent departmental standard rather than the individual performance of separate officers. Where the OOW's judgment is confined to the watch in front of them, the Chief Officer's judgment spans the entire passage and every watch within it." },
      responsibilities: [
        { en: "Stand a navigational watch to the same standard expected of any OOW, applying the same judgment, COLREG application, and reporting discipline" },
        { en: "Review other OOWs' logbook entries, handover records, and reported incidents across the voyage, identifying any pattern or standard requiring correction" },
        { en: "Monitor the vessel's stability and cargo condition throughout the passage (e.g. ballast changes, weather routing effects on stress), adjusting the plan if conditions require it" },
        { en: "Identify opportunities to improve departmental procedures or watchkeeping practices based on operational experience gathered during the passage" },
        { en: "Progress passage-related administrative work (arrival documentation, cargo planning for the next port, certificate tracking) between watches, without compromising watchkeeping duties" },
        { en: "Address any watchkeeping standard or competency concern identified in another OOW directly and constructively, escalating to the Master only if it cannot be resolved departmentally" },
        { en: "Coordinate with the Master on the overall passage plan's progress and any adjustment required by weather, traffic, or operational developments" },
        { en: "Maintain departmental readiness for the next port throughout the passage, rather than leaving preparation until arrival is imminent" },
      ],
      equipment: [
        { en: "Standard bridge navigational equipment (as OOW, during own watch)" },
        { en: "Stability and stress monitoring tools, voyage cargo/ballast plan" },
        { en: "Passage plan revisions and weather routing updates" },
        { en: "Departmental planning documents (arrival checklist, next-port cargo plan, certificate tracker)" },
        { en: "Logbook and handover records across all watches, for review" },
      ],
      risks: [
        { en: "A recurring watchkeeping standard issue across OOWs going unaddressed because each incident is reviewed in isolation" },
        { en: "Correcting individual mistakes without addressing the underlying systemic cause affecting multiple watches" },
        { en: "Stability or cargo condition drifting from the planned state during the passage without being actively monitored" },
        { en: "Departmental administrative work being deferred until arrival, creating avoidable pressure at the port" },
        { en: "Addressing a competency concern with an OOW too bluntly or too late, damaging trust rather than correcting the standard" },
        { en: "Becoming so focused on departmental oversight that personal watchkeeping standards during one's own watch slip" },
      ],
      bestPractices: [
        { en: "Review logbook and handover records across the voyage for patterns, not only isolated incidents" },
        { en: "Monitor stability and cargo condition proactively during the passage, not only at scheduled calculation points" },
        { en: "Progress next-port preparation incrementally throughout the passage, rather than compressing it into the final approach" },
        { en: "Use routine passage periods to strengthen departmental standards before deficiencies become incidents" },
        { en: "Address a standard or competency concern early, directly, and constructively — the goal is correction, not blame" },
        { en: "Hold your own watch to the same standard you expect from every other OOW" },
      ],
      commonMistakes: [
        { en: "Reviewing each OOW's watch in isolation rather than looking for patterns across the voyage" },
        { en: "Assuming stability and cargo condition remain as planned without active monitoring during the passage" },
        { en: "Deferring all administrative and next-port preparation until the final approach" },
        { en: "Avoiding a difficult conversation about a watchkeeping standard until it becomes a more serious incident" },
        { en: "Holding a personal watchkeeping standard lower than the one expected of the OOWs being supervised" },
      ],
      professionalTips: [
        { en: "Supervising other officers' watches means reading between the lines of a logbook, not just checking that entries exist" },
        { en: "The passage is your best opportunity to prepare the next port gradually — use it, rather than compressing everything into the final hours" },
        { en: "A direct, early, and respectful correction protects both the standard and the relationship — waiting rarely improves either" },
        { en: "You cannot credibly hold others to a standard you do not hold yourself during your own watch" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l10" }, { kind: "lesson", lessonId: "d1-l9" }, { kind: "lesson", lessonId: "d1-l8" }, { kind: "lesson", lessonId: "d3-l6" }, { kind: "lesson", lessonId: "d1-l6" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Chief Officer is typically the responsible officer at the forecastle, providing the same technical judgment and decision authority as during departure — verifying equipment condition, relaying precise reports to the bridge, and supporting the OOW's assessment of the vessel's position. Where this differs from a routine mooring station, the Chief Officer also carries a departmental responsibility that extends beyond the operation itself: the implications of an extended stay at anchor on stability, cargo condition, and departmental planning, particularly if the anchorage is prolonged or unplanned. The Chief Officer transforms an anchoring operation into a managed operational period, ensuring both the immediate safety of the vessel and the efficient use of the time that follows." },
      responsibilities: [
        { en: "Take charge of the forecastle as the responsible officer, verifying windlass and chain condition and directing the pace of paying out or heaving in based on the bridge's instructions" },
        { en: "Relay precise, technical chain reports (amount out, tendency, load indications) to the bridge, consolidating forecastle observations into a single professional assessment" },
        { en: "Assess the operational and departmental implications of an extended or unplanned period at anchor (crew rest planning, maintenance opportunities, stability/ballast condition) and advise the Master accordingly" },
        { en: "Review and reprioritize departmental activities as the expected duration of the anchorage changes, ensuring resources remain focused on the highest operational priorities" },
        { en: "Coordinate with the Bosun on forecastle team organization and anchor watch rotation, without duplicating the Bosun's crew-level direction" },
        { en: "Monitor cargo and stability condition throughout an extended anchorage, adjusting ballast or reporting any change in the vessel's configuration as required" },
        { en: "Liaise with the agent or company, where relevant, on the operational or commercial consequences of anchoring delays (e.g. notice of readiness, demurrage implications), distinct from the technical anchoring operation itself" },
        { en: "Ensure departmental work (maintenance, drills, administrative tasks) is planned productively during an extended anchor period rather than left idle" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the forecastle" },
        { en: "Windlass, anchor chain — assessed at a technical/decision level, distinct from the Bosun's operational oversight" },
        { en: "Anchor plan / anchorage instructions (where applicable)" },
        { en: "Portable radio for communication with the bridge and the Bosun" },
        { en: "Stability/ballast reference relevant to an extended anchorage" },
        { en: "Commercial/administrative documentation relevant to anchoring delays (notice of readiness, agent correspondence), where applicable" },
      ],
      risks: [
        { en: "Relaying an imprecise or overly raw chain report to the bridge, forcing the OOW to interpret rather than act" },
        { en: "Failing to recognize the departmental or commercial implications of an anchoring delay until they become urgent" },
        { en: "Continuing to plan on the basis of the original schedule despite a significant change in the expected duration of the anchorage" },
        { en: "Cargo or stability condition drifting during an extended anchorage without active monitoring" },
        { en: "Departmental work remaining unplanned during an extended anchor period, wasting an available opportunity" },
        { en: "Duplicating the Bosun's forecastle team direction rather than working through them" },
      ],
      bestPractices: [
        { en: "Report chain status in precise, technical terms the bridge can act on directly, exactly as during departure manoeuvres" },
        { en: "Anticipate the departmental consequences of an anchorage extending beyond its planned duration, rather than waiting for the delay to become significant" },
        { en: "Review departmental priorities whenever the expected departure time changes significantly" },
        { en: "Use an extended anchor period productively — maintenance, drills, or administrative work that would otherwise compete with watchkeeping time" },
        { en: "Maintain direct communication with the agent or company on any commercial implication of the delay, keeping the Master informed" },
        { en: "Work through the Bosun for forecastle team coordination rather than issuing parallel instructions" },
      ],
      commonMistakes: [
        { en: "Treating an extended anchorage purely as a waiting period rather than an opportunity for departmental progress" },
        { en: "Failing to flag the commercial or operational consequences of a delay until asked" },
        { en: "Allowing cargo or stability condition to drift unmonitored during a prolonged stay at anchor" },
        { en: "Passing an unfiltered forecastle observation to the bridge instead of a clear technical assessment" },
        { en: "Undermining the Bosun's direction of the forecastle team by issuing separate instructions" },
      ],
      professionalTips: [
        { en: "An anchorage is rarely just 'waiting' from a departmental point of view — treat it as time to be used, not time to get through" },
        { en: "The same precision expected of your reports during departure applies at anchor — the bridge relies on your assessment either way" },
        { en: "Commercial and operational consequences of a delay are easier to manage when raised early, not once they have already become a problem" },
        { en: "Supporting the OOW's judgment on the vessel's position does not mean silence — a second technical perspective from the forecastle adds real value" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l3" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Chief Officer holds direct responsibility for cargo operations — planning, supervising loading/discharging, and ensuring stability and stress remain within safe limits throughout — while also overseeing the deck department's port workload alongside the Bosun and OOW. Unlike at sea, where the Chief Officer's role is largely oversight and standard-setting, in port the Chief Officer becomes the vessel's primary interface with cargo interests: terminal, surveyors, charterers, and agents, while remaining accountable for the ship's safety and compliance throughout. The Chief Officer balances operational safety, commercial efficiency, and regulatory compliance throughout the port stay, ensuring that none is achieved at the expense of the others." },
      responsibilities: [
        { en: "Prepare and execute the cargo plan, sequencing loading or discharging operations to maintain safe stability, stress, and trim throughout the operation" },
        { en: "Continuously monitor stability and stress during cargo operations, halting or adjusting the sequence if calculated limits are approached" },
        { en: "Liaise directly with the terminal, stevedores, and surveyors on cargo operation progress, timing, and any technical or commercial issue arising" },
        { en: "Anticipate the impact of operational delays or cargo plan changes on the remainder of the port stay, adjusting departmental priorities accordingly" },
        { en: "Oversee the Bosun's and OOW's port workload (gangway security, mooring monitoring, high-risk operations) at a departmental level, intervening only where cargo operations create additional demands or risks" },
        { en: "Coordinate with the Chief Engineer on ballast operations required to support the cargo plan and maintain vessel stability" },
        { en: "Ensure required cargo documentation (loading plan, manifest, dangerous goods declarations, draft surveys) is accurate, complete, and available as required by the terminal or authorities" },
        { en: "Manage competing priorities during port stay — cargo operations, maintenance, administrative deadlines, crew rest — resolving conflicts and escalating to the Master when departmental resources are insufficient" },
        { en: "Report cargo operation progress, any deviation from plan, and departmental readiness for departure to the Master throughout the port stay" },
      ],
      equipment: [
        { en: "Cargo plan, stability/stress calculation software, loading computer" },
        { en: "Cargo documentation (manifest, dangerous goods declarations, draft survey records)" },
        { en: "Terminal loading/discharging sequence and cargo operation timetable" },
        { en: "Communication equipment for coordination with terminal, surveyors, and the bridge/Bosun" },
        { en: "Departmental port workload plan (in coordination with the Bosun and OOW)" },
      ],
      risks: [
        { en: "Continuing cargo operations without adequately monitoring stability or stress as the loaded condition changes" },
        { en: "Miscommunication with the terminal or surveyor leading to a discrepancy between the planned and actual cargo operation" },
        { en: "Allowing multiple small operational changes to accumulate without reassessing their combined impact on the cargo plan" },
        { en: "Cargo documentation being incomplete or inaccurate, creating delay or compliance exposure" },
        { en: "Competing port priorities (cargo, maintenance, administration) overwhelming departmental capacity without clear prioritization" },
        { en: "Deferring to the terminal's schedule pressure at the expense of a genuine stability or safety check" },
      ],
      bestPractices: [
        { en: "Monitor stability and stress continuously throughout cargo operations, not only at the planned checkpoints" },
        { en: "Maintain direct, proactive communication with the terminal and surveyors rather than waiting for a discrepancy to surface on its own" },
        { en: "Reassess the cargo plan whenever significant operational conditions change, rather than relying on the original sequence alone" },
        { en: "Verify cargo documentation accuracy before it is required, not under the pressure of an imminent deadline" },
        { en: "Prioritize departmental port workload explicitly, communicating trade-offs to the Bosun, OOW, and Master rather than leaving them implicit" },
        { en: "Treat terminal schedule pressure as an input to manage, not a reason to skip a genuine safety verification" },
      ],
      commonMistakes: [
        { en: "Allowing cargo operations to proceed on assumption rather than continuously verified stability data" },
        { en: "Accepting a terminal's or surveyor's assessment without independent verification when a discrepancy is plausible" },
        { en: "Discovering a documentation gap only when it is urgently needed rather than verifying it in advance" },
        { en: "Allowing commercial or schedule pressure to compress or skip a safety check" },
        { en: "Failing to communicate departmental priority trade-offs clearly, leaving the Bosun or OOW to guess at what matters most" },
      ],
      professionalTips: [
        { en: "Cargo operations reward continuous verification, not periodic checkpoints — stability can shift meaningfully between calculations if not actively tracked" },
        { en: "A good working relationship with the terminal is built on clear, proactive communication, not on hoping problems resolve themselves" },
        { en: "Documentation errors are far cheaper to fix before they are needed than during a surveyor's or authority's review" },
        { en: "Port stays test your ability to prioritize visibly — a department that understands the trade-offs performs better than one left to guess" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l5" }, { kind: "lesson", lessonId: "e1-l3" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations are, from the Chief Officer's perspective, a complete operational event to be planned and orchestrated — not simply a mooring exercise or a cargo transfer, but the coordination of both together, alongside every departmental resource required to support them. Where the Bosun executes and coordinates the mooring station and the OOW ensures the vessel's safe manoeuvring and station-keeping, the Chief Officer plans the STS operation as a whole: cargo transfer sequencing and stability, departmental resource allocation, regulatory compliance, and the commercial and operational consequences of any deviation from plan." },
      responsibilities: [
        { en: "Prepare the overall STS operational plan, integrating the cargo transfer sequence, mooring/fender arrangement, and departmental resource allocation into a single coordinated plan" },
        { en: "Liaise directly with the counterpart vessel's Chief Officer or cargo team (or floating terminal representative) to align procedures, timing, and safety requirements before the operation begins" },
        { en: "Oversee fender and mooring rigging standards alongside the Bosun, verifying readiness before the approach begins, without duplicating the Bosun's crew-level direction" },
        { en: "Plan and directly manage the cargo transfer sequence (if applicable), ensuring stability and stress remain within safe limits as cargo is transferred" },
        { en: "Continuously monitor stability and cargo condition throughout the transfer, halting or adjusting the operation if calculated limits are approached" },
        { en: "Coordinate with the Chief Engineer on ballast operations required to support the transfer and maintain vessel stability" },
        { en: "Coordinate emergency shutdown or disconnection procedures for the cargo transfer with the counterpart vessel, distinct from the mooring emergency release covered by the deck team" },
        { en: "Ensure required cargo transfer and regulatory documentation (transfer plan, quantities, sampling records, compliance certificates where applicable) is accurate and complete" },
        { en: "Manage the operational and commercial consequences of any delay, pause, or change to the STS plan, liaising with surveyors, agents, or charterer representatives as required" },
        { en: "Report STS operation progress and any developing concern to the Master throughout the operation" },
      ],
      equipment: [
        { en: "STS operational plan (mooring arrangement, cargo transfer plan, stability/stress calculation tools)" },
        { en: "Cargo transfer documentation (quantities, sampling records, checklists, compliance certificates)" },
        { en: "Communication equipment for liaison with the counterpart vessel's cargo team, the bridge/Bosun, and shore-based parties (agent, surveyor) where relevant" },
        { en: "Emergency shutdown/disconnection procedures specific to the cargo transfer system" },
      ],
      risks: [
        { en: "Planning the mooring and cargo transfer elements of the operation separately rather than as a single coordinated plan" },
        { en: "Cargo transfer proceeding without adequate stability monitoring as the loaded condition changes on both vessels" },
        { en: "Miscommunication with the counterpart vessel's cargo team regarding procedures, timing, or an emerging concern" },
        { en: "Emergency shutdown coordination being unclear between the two vessels if an incident develops" },
        { en: "Documentation or regulatory compliance discrepancies between the two vessels' records" },
        { en: "Allowing commercial pressure (charter party timing) to influence a technical decision about pausing or slowing the operation" },
        { en: "Failing to anticipate the operational or commercial consequences of a delay until it has already become significant" },
      ],
      bestPractices: [
        { en: "Treat the STS operation as one integrated plan from the outset — mooring, cargo transfer, and departmental resourcing should be prepared together, not separately" },
        { en: "Confirm transfer procedures and terminology with the counterpart vessel's cargo team before the operation begins, particularly with an unfamiliar company" },
        { en: "Monitor stability and cargo condition continuously throughout the transfer, not only at planned checkpoints" },
        { en: "Establish and confirm emergency shutdown procedures and communication signals with the counterpart vessel before starting" },
        { en: "Reconcile quantity, documentation, and compliance records with the counterpart vessel as the operation proceeds, not only at completion" },
        { en: "Anticipate the operational and commercial consequences of a delay early, engaging agents or surveyors proactively rather than reactively" },
        { en: "Treat commercial time pressure as a factor to manage, not a reason to bypass a genuine stability or safety check" },
      ],
      commonMistakes: [
        { en: "Treating the mooring and cargo transfer as two separate operations rather than one coordinated plan" },
        { en: "Assuming the counterpart vessel's cargo team follows the same procedures without confirming beforehand" },
        { en: "Continuing the transfer without reassessing stability as conditions change" },
        { en: "Leaving emergency shutdown coordination undefined until an emergency actually develops" },
        { en: "Reconciling documentation only after the operation is complete, when a discrepancy is harder to resolve" },
        { en: "Allowing schedule or commercial pressure to delay a necessary pause in the operation" },
        { en: "Failing to flag the commercial or operational consequences of a delay until asked" },
      ],
      professionalTips: [
        { en: "An STS operation is only as coordinated as its weakest link — plan it as one system, not as a mooring exercise plus a separate cargo transfer" },
        { en: "Stability during a transfer is a moving target — treat every calculation as provisional until the next one confirms it" },
        { en: "The relationship with a counterpart vessel's Chief Officer sets the tone for the whole operation — clear, professional communication reduces friction when something needs to change" },
        { en: "Commercial pressure to keep operations moving is real, but it is not a technical argument — treat it as such" },
        { en: "The Chief Officer who has anticipated the consequences of a delay is never caught explaining one after the fact" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l5" }, { kind: "lesson", lessonId: "e1-l3" }],
    },

    maintenance: {
      overview: { en: "While the Bosun organizes and executes deck maintenance work and the OOW ensures navigational equipment reliability, the Chief Officer owns the department's maintenance system as a whole: translating the vessel's Planned Maintenance System into a realistic schedule, tracking certificates and surveys, and ensuring maintenance never becomes the department's lowest priority under commercial or operational pressure. The Chief Officer ensures that maintenance remains a continuous management process rather than a series of isolated repair activities. The Chief Officer does not typically perform maintenance tasks personally, but is accountable for whether the deck department's material condition genuinely reflects what the PMS and certification records claim." },
      responsibilities: [
        { en: "Translate the vessel's Planned Maintenance System into a realistic, prioritized schedule, balancing maintenance against cargo operations, watchkeeping, and crew rest" },
        { en: "Track certificates, surveys, and class requirements proactively, ensuring nothing becomes overdue under operational pressure" },
        { en: "Review the Bosun's maintenance reports for patterns and structural concerns, distinguishing routine upkeep from issues requiring budget, spare parts, or shore-side support" },
        { en: "Verify that the PMS and the actual material condition of the deck department remain consistent, investigating any discrepancy rather than assuming the records are accurate" },
        { en: "Evaluate maintenance effectiveness periodically, adjusting departmental priorities when recurring defects indicate that the current strategy is no longer sufficient" },
        { en: "Prioritize maintenance and certification work against competing departmental demands, escalating to the Master when resources are genuinely insufficient" },
        { en: "Coordinate with the Chief Engineer and, where relevant, shore-side technical staff on maintenance items requiring cross-departmental resources or expertise" },
        { en: "Plan for dry-dock, survey, or major maintenance periods well in advance, ensuring the department is prepared rather than reacting under deadline pressure" },
      ],
      equipment: [
        { en: "Planned Maintenance System (PMS) records and scheduling tools" },
        { en: "Certificate and survey tracking system" },
        { en: "Survey reports and class inspection findings" },
        { en: "Budget/spare parts request and tracking system" },
        { en: "Bosun's maintenance reports and defect logs, for review" },
      ],
      risks: [
        { en: "Maintenance being deprioritized indefinitely under commercial or operational pressure, until a deferred item becomes urgent" },
        { en: "A discrepancy between the PMS records and actual material condition going unnoticed because records are trusted without verification" },
        { en: "Maintaining compliance on paper while the department's actual condition progressively deteriorates" },
        { en: "A certificate or survey becoming overdue because tracking was reactive rather than proactive" },
        { en: "Treating a recurring Bosun-reported issue as routine when it actually reflects a structural or budgetary problem" },
        { en: "Being unprepared for a dry-dock or major survey period because planning began too late" },
      ],
      bestPractices: [
        { en: "Build maintenance and certification tracking into routine departmental planning, not as a separate task addressed only when urgent" },
        { en: "Verify the PMS against actual material condition periodically, rather than assuming paperwork and reality remain aligned" },
        { en: "Use survey findings and recurring defects to refine future maintenance priorities rather than treating them as isolated events" },
        { en: "Review the Bosun's reports for recurring patterns across time, not only as isolated maintenance items" },
        { en: "Escalate resource shortfalls (budget, spare parts, manpower) early, rather than absorbing the risk silently" },
        { en: "Begin dry-dock and major survey planning well ahead of the deadline, building in margin for the unexpected" },
      ],
      commonMistakes: [
        { en: "Allowing maintenance to be pushed back repeatedly under operational pressure without ever formally reprioritizing it" },
        { en: "Trusting PMS records without periodically verifying them against the deck department's actual condition" },
        { en: "Reacting to certificate or survey deadlines only once they become urgent" },
        { en: "Treating a recurring maintenance issue reported by the Bosun as routine without asking why it keeps recurring" },
        { en: "Starting dry-dock or major survey preparation too close to the deadline to manage it comfortably" },
      ],
      professionalTips: [
        { en: "A Planned Maintenance System is only useful if it reflects reality — treat any gap between the two as more urgent than it might appear" },
        { en: "Certificates and surveys rarely become urgent gradually — the Chief Officer who tracks them continuously never faces a departure-day surprise" },
        { en: "A recurring defect report is rarely bad luck twice — it is usually a signal worth investigating once" },
        { en: "The department that is ready for dry-dock months in advance spends far less time firefighting than the one that starts preparing at the last minute" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Chief Officer typically takes command of a designated emergency team (e.g. fire party, damage control team) or a specific zone of the vessel, translating the Master's overall strategy into a coordinated team response and providing the Master with a consolidated, reliable picture of that team's situation. Where the OOW ensures the vessel continues to be safely navigated and the Bosun leads a team's execution at their station, the Chief Officer commands at a broader level: integrating multiple team inputs, making tactical decisions within their assigned area, and serving as the Master's most senior operational link to the response itself." },
      responsibilities: [
        { en: "Take command of the assigned emergency team or zone immediately, establishing communication with all team members and confirming the team's readiness and understanding of the situation" },
        { en: "Translate the Master's overall strategy into specific tactical actions for the assigned team, adjusting the approach as the situation develops" },
        { en: "Consolidate reports from Bosuns, team leaders, or individual crew members within the assigned area into a single, reliable assessment for the Master" },
        { en: "Make tactical decisions within the assigned area of responsibility (e.g. deploying resources, adjusting firefighting strategy, prioritizing search areas) without waiting for instruction on matters within that authority" },
        { en: "Continuously reassess whether the assigned tactical response remains aligned with the Master's overall strategy as the emergency evolves, adapting promptly when conditions change" },
        { en: "Assess and communicate the evolving risk within the assigned area (e.g. structural integrity, spreading fire, flooding progression) to inform the Master's overall decision-making" },
        { en: "Coordinate with other department heads (Chief Engineer, Safety Officer) through the Master where the emergency spans multiple areas of the vessel" },
        { en: "Maintain accountability for all personnel within the assigned team or zone throughout the emergency, reporting any casualty or missing person immediately" },
        { en: "Record key decisions, actions, and communications within the assigned area as the emergency unfolds, to the extent practicable without compromising the response" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear appropriate to the assigned role (firefighting outfit, damage control equipment, etc.)" },
        { en: "Portable radio or other communication equipment designated for team and command-level communication" },
        { en: "Muster list, emergency organization reference, and any zone-specific emergency plan" },
        { en: "Damage control plans and vessel emergency drawings" },
        { en: "Stability/damage control reference relevant to the assigned area, where applicable" },
      ],
      risks: [
        { en: "Delayed or unclear tactical direction to the team due to hesitation in translating the Master's strategy into specific action" },
        { en: "Consolidating team reports inaccurately, giving the Master an unreliable picture of the assigned area's situation" },
        { en: "Making a tactical decision that conflicts with the Master's overall strategy due to incomplete communication" },
        { en: "Continuing to pursue an initially appropriate tactic after conditions have changed, without reassessing its suitability" },
        { en: "Losing track of personnel within the assigned team or zone as the response evolves" },
        { en: "Tunnel vision on the assigned area, losing awareness of how it relates to the vessel's overall emergency response" },
        { en: "Miscommunication with other department heads when the emergency spans multiple areas of the vessel" },
      ],
      bestPractices: [
        { en: "Confirm understanding of the Master's overall strategy before translating it into tactical action for the team" },
        { en: "Consolidate team reports into clear, factual assessments — state what is confirmed and what remains uncertain" },
        { en: "Make confident tactical decisions within your assigned authority, but escalate anything that could affect the Master's overall strategy" },
        { en: "Regularly reassess whether tactical actions remain consistent with the evolving overall strategy" },
        { en: "Maintain continuous accountability for personnel within your area, reassessing as the team's composition or positioning changes" },
        { en: "Communicate proactively with the Master and other department heads, rather than waiting to be asked for an update" },
      ],
      commonMistakes: [
        { en: "Hesitating to give specific tactical direction, leaving the team without clear action" },
        { en: "Relaying unfiltered or unreconciled reports to the Master instead of a consolidated professional assessment" },
        { en: "Making a tactical decision beyond the assigned authority without confirming alignment with the Master's strategy" },
        { en: "Losing track of personnel accountability while focused on the technical aspects of the response" },
        { en: "Failing to communicate how the assigned area's situation relates to the vessel's broader emergency" },
      ],
      professionalTips: [
        { en: "Your team looks to you to turn the Master's strategy into something they can actually do — vague direction produces a vague response" },
        { en: "A consolidated, honest report from your area is worth more to the Master than several raw ones — that synthesis is your primary contribution" },
        { en: "Tactical authority within your zone is real, but it exists inside the Master's overall strategy — confident action and clear escalation are not in conflict" },
        { en: "The discipline your team shows in a real emergency reflects how seriously your drills were run beforehand — as their commander, that standard starts with you" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s4-l7" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "The OOW reports the vessel navigationally ready for departure. Separately, the Bosun mentions in passing that one mooring winch was 'a bit slow' during testing, without flagging it as a defect requiring escalation." },
      mission: { en: "Decide whether to report departmental readiness to the Master as stated, or to resolve the discrepancy first." },
      expectedActions: [
        { en: "Do not relay the OOW's readiness report as if it already covered the deck team's equipment status" },
        { en: "Personally clarify the Bosun's comment — is the winch safe to use, marginal, or unsafe" },
        { en: "Resolve the ambiguity before reporting readiness, even if it takes a few extra minutes" },
        { en: "Report departmental readiness to the Master only once genuinely reconciled, not as two separate inputs" },
      ],
      why: [{ en: "A vague comment mentioned in passing is not the same as a resolved technical assessment — the Chief Officer's role is precisely to catch this kind of unreconciled detail before it reaches the Master disguised as readiness. Readiness is an integrated assessment, not the sum of independent reports." }],
      commonMistakes: [
        { en: "Relaying the OOW's report without checking whether the Bosun's comment changes the picture" },
        { en: "Treating 'a bit slow' as acceptable without a real technical judgment" },
        { en: "Reporting readiness under time pressure rather than resolving the ambiguity first" },
      ],
      safetyPoints: [{ en: "An unclear equipment status at departure is exactly the kind of small, unresolved uncertainty that the Chief Officer exists to catch before it becomes an operational problem." }],
      mapReferences: [],
    },
    {
      situation: { en: "The Bosun's maintenance reports show the same minor hydraulic leak on a cargo crane reappearing for the third consecutive port call, each time 'fixed' temporarily. The vessel is under commercial pressure to maintain a tight port schedule." },
      mission: { en: "Decide whether to continue treating this as routine maintenance or to address it as a structural issue, despite the schedule pressure." },
      expectedActions: [
        { en: "Recognize the pattern across the three reports rather than treating this occurrence in isolation" },
        { en: "Investigate the underlying cause rather than authorizing another temporary fix" },
        { en: "Escalate the need for proper repair or shore-side support to the Master, even if it affects the schedule" },
        { en: "Communicate the decision and its reasoning clearly to relevant parties (Master, possibly the terminal/agent if it affects timing)" },
      ],
      why: [{ en: "A defect that recurs despite repeated 'fixes' is not a maintenance task anymore — it is a signal that the current approach is not addressing the actual cause, and continuing to defer it risks a more serious failure at a worse moment. The decision is not about today's leak, but about the credibility of the department's maintenance strategy." }],
      commonMistakes: [
        { en: "Approving another temporary fix because the schedule doesn't allow time for a proper one" },
        { en: "Treating each occurrence as unrelated to the previous two" },
        { en: "Avoiding the conversation about schedule impact because it is uncomfortable" },
      ],
      safetyPoints: [{ en: "Recurring defects on cargo-handling equipment carry real risk to personnel and cargo — commercial pressure is a factor to manage, not a reason to defer a genuine technical decision." }],
      mapReferences: [],
    },
    {
      situation: { en: "Midway through an STS cargo transfer, your vessel's figures and the counterpart vessel's figures for quantity transferred differ by a small but non-trivial margin. The counterpart's Chief Officer suggests it's likely a minor instrumentation difference and proposes continuing." },
      mission: { en: "Decide whether to accept this explanation and continue, or to pause and reconcile the discrepancy first." },
      expectedActions: [
        { en: "Do not accept an unverified explanation for a documented discrepancy, however plausible it sounds" },
        { en: "Request that both vessels compare methods and figures before continuing" },
        { en: "Pause or slow the operation if the discrepancy cannot be quickly explained" },
        { en: "Document the discrepancy and its resolution clearly, regardless of outcome" },
      ],
      why: [{ en: "A quantity discrepancy during a cargo transfer has direct commercial, contractual, and sometimes safety implications — accepting a plausible-sounding explanation without verification transfers the Chief Officer's professional judgment to someone with different interests in the outcome." }],
      commonMistakes: [
        { en: "Accepting the counterpart's explanation to avoid friction or delay" },
        { en: "Failing to document the discrepancy clearly at the time it was noticed" },
        { en: "Resuming the transfer before the figures are actually reconciled" },
      ],
      safetyPoints: [{ en: "An unresolved quantity discrepancy is exactly the kind of ambiguity that should pause a technical operation until genuinely clarified. Verification protects both vessels equally by ensuring operational decisions remain evidence-based rather than assumption-based." }],
      mapReferences: [],
    },
  ],

  professionalTips: [
    { en: "Readiness is never the sum of separate reports — it is your own reconciled judgment built from them. Never relay an unresolved discrepancy upward disguised as certainty." },
    { en: "Think in patterns, not incidents — the same small defect appearing three times is not bad luck, it is a signal about your department's system, not a coincidence." },
    { en: "Commercial and operational pressure are real inputs to manage, never technical arguments in themselves — treat schedule urgency as a factor, not as a reason to skip verification." },
    { en: "A plausible explanation is not the same as a verified one — professional courtesy toward another officer never substitutes for confirming the facts yourself." },
    { en: "Your value is measured by the reliability of what reaches the Master, not by the volume of information you pass along — synthesis is your primary contribution, not relay." },
    { en: "Anticipate consequences before they become visible — the Chief Officer who has already considered 'what happens if this delay continues' is never caught explaining one after the fact." },
    { en: "Documentation and reality must be checked against each other continuously — a system that looks compliant on paper can still be silently drifting from what is actually true on deck." },
    { en: "Delegate the execution, never the accountability — the Bosun executes, the OOWs conduct their watches, but the departmental outcome remains yours to answer for." },
    { en: "The Master should never have to integrate your department's information themselves — your responsibility is to deliver a coherent operational picture, not disconnected facts." },
    { en: "Being a Chief Officer is not about knowing more than a Bosun or an OOW — it is about integrating what they know, what the situation requires, and what the Master needs, into one coherent, dependable decision." },
  ],

  professionalMindset: [
    { en: "Think in systems, not incidents. A single defect, a single delay, a single discrepancy is rarely the real subject — the Chief Officer looks for what the pattern reveals about the department's underlying condition." },
    { en: "Treat every report as an input, never as a finished conclusion. Information from the OOW, the Bosun, a surveyor, or a counterpart vessel each carries a partial truth — your role is to reconcile them into one reliable picture, not to relay the first one that arrives." },
    { en: "Hold multiple time horizons simultaneously. A cargo operation happening now, a certificate due next month, and a dry-dock a year away all compete for attention — the Chief Officer manages the present without losing sight of what is coming." },
    { en: "See documentation as a claim to be verified, not a fact to be trusted. The PMS, the cargo plan, the stability calculation all describe an intended reality — your judgment is what confirms whether that description still matches what is actually true." },
    { en: "Accept that authority operates within someone else's strategy. Tactical decisions within your department are yours to make confidently, but they exist inside the Master's overall intent — integration means fitting your decisions into that larger picture, not replacing it." },
    { en: "Recognize that pressure is information, not instruction. Commercial urgency, schedule pressure, or a counterpart's confidence all shape the situation you are deciding in — but none of them make the decision for you." },
    { en: "Understand that your synthesis is the product, not the raw material. The Master does not need every detail you have gathered — the Master needs the coherent, reconciled judgment you have built from them." },
    { en: "Delegate execution deliberately, but never delegate accountability. Trusting the Bosun and the OOWs to do their work well does not transfer your responsibility for the departmental outcome — it is simply how that responsibility is properly exercised." },
    { en: "Measure success by the quality of the department's decisions, not by the number of decisions you make. A well-led department solves many problems before they ever require your intervention." },
  ],

  professionalDocumentation: [
    { en: "Cargo and stability documentation — The Chief Officer prepares, verifies, or approves the cargo plan, loading/discharging sequence, and stability/stress calculations, ensuring these documents reflect the vessel's actual condition throughout the operation, not only the planned one. These records often carry direct commercial and legal weight (charter party compliance, cargo claims)." },
    { en: "Certificates and survey records — The Chief Officer maintains oversight of the deck department's certificates, class survey status, and port state control history, ensuring records are current and genuinely reflect the vessel's compliance status, not merely its paperwork." },
    { en: "Planned Maintenance System (PMS) governance — The Chief Officer is accountable for the accuracy of PMS records relative to the deck department's actual material condition, periodically verifying that documentation and reality have not drifted apart." },
    { en: "Deck logbook oversight — While individual OOWs make their own entries, the Chief Officer reviews logbook entries across the department for consistency, completeness, and pattern, using them as a management tool rather than only a legal record." },
    { en: "Oil Record Book and environmental compliance records — The Chief Officer oversees the accuracy and completeness of these records at a departmental level, ensuring entries made by different OOWs remain consistent and genuinely reflect operations conducted." },
    { en: "Cargo transfer and STS documentation — The Chief Officer ensures transfer quantities, sampling records, and compliance certificates are accurate and reconciled with the counterpart vessel, resolving discrepancies before they become disputes." },
    { en: "Incident, near-miss, and audit findings — The Chief Officer contributes departmental-level analysis to incident reports and internal/external audit findings, distinguishing isolated events from patterns requiring a change in departmental practice." },
    { en: "Why this matters: The Chief Officer's documentation responsibility is different in kind from the OOW's or the Bosun's — it is not primarily about personally recording events, but about governing whether the department's entire body of records remains an honest, reconciled reflection of reality. Cargo, stability, and certification records in particular carry legal, commercial, and safety consequences well beyond the vessel itself — a Chief Officer who treats this governance role seriously protects the vessel, the company, and the integrity of every decision built on these records. Reliable documentation is not the end product of good leadership — it is the evidence that good leadership has been consistently exercised." },
  ],

  environmentalResponsibilities: [
    { en: "MARPOL compliance governance — The Chief Officer ensures the deck department's environmental practices (discharge authorization, waste segregation, cargo-related pollution prevention) remain consistent across all OOWs and all watches, rather than varying by individual officer's interpretation." },
    { en: "Oil Record Book and Garbage Record Book oversight — The Chief Officer verifies these records are accurate, complete, and consistent across entries made by different OOWs, investigating any discrepancy rather than assuming each entry is independently correct." },
    { en: "Cargo-related environmental risk — During cargo and ballast operations, the Chief Officer ensures environmental safeguards (tank cleaning procedures, ballast water management, cargo residue handling) are properly planned and followed, particularly where commercial schedule pressure could tempt a shortcut." },
    { en: "STS and cargo transfer environmental oversight — The Chief Officer ensures environmental precautions during cargo transfers (containment, spill response readiness) are genuinely in place, not only documented, especially when coordinating with an unfamiliar counterpart vessel." },
    { en: "Reporting and escalation — When an environmental incident or near-miss occurs anywhere in the deck department's operations, the Chief Officer ensures it is reported accurately and promptly to the Master, and that the underlying cause — not only the immediate event — is investigated." },
    { en: "Balancing environmental compliance against commercial pressure — The Chief Officer resists allowing schedule or commercial pressure to compromise a genuine environmental safeguard, treating such pressure as a factor to manage rather than a justification for a shortcut." },
    { en: "Why this matters: Environmental compliance at the Chief Officer level is a question of departmental consistency, not individual awareness — a single OOW's lapse or a single cargo operation's shortcut can create legal, commercial, and reputational exposure for the entire vessel and company. The Chief Officer who ensures environmental standards are applied uniformly, verified honestly, and never quietly compromised under pressure protects not only compliance on paper, but the department's actual environmental performance. Environmental compliance becomes sustainable only when it is embedded in the department's daily decisions rather than depending on the vigilance of individual officers." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Plan, prepare, and execute cargo operations, including sequencing loading/discharging and making stability decisions within your professional competence" },
      { en: "Halt or adjust a cargo operation if stability, stress, or safety limits are approached, without waiting for the Master's prior approval" },
      { en: "Supervise and correct OOWs and the Bosun on departmental standards, including addressing a competency concern directly" },
      { en: "Make tactical decisions within an assigned emergency command role, without waiting for instruction on matters within that authority" },
      { en: "Resolve discrepancies between departmental reports (OOW, Bosun, surveyor, counterpart vessel) before they reach the Master, rather than passing them along unreconciled" },
      { en: "Prioritize and reallocate departmental resources (maintenance, personnel, administrative work) in response to changing operational demands" },
      { en: "Liaise directly with terminals, surveyors, agents, and counterpart vessels on technical and operational matters within your responsibility" },
      { en: "Escalate any concern — technical, commercial, or personnel-related — directly to the Master without needing prior justification" },
    ],
    youCannot: [
      { en: "Deviate from the Master's overall strategy or standing orders without authorization, except where immediate safety requires it, followed by immediate notification to the Master" },
      { en: "Take command of the vessel in place of the Master, except where explicitly authorized by standing orders or where the Master's incapacity or absence requires immediate action" },
      { en: "Approve a cargo operation, stability configuration, or departure that you know or suspect to be unsafe, regardless of commercial or schedule pressure" },
      { en: "Certify departmental compliance (certificates, surveys, environmental records) as satisfactory without genuine verification, based on documentation alone" },
      { en: "Allow commercial or operational pressure to override a genuine safety, stability, or environmental concern" },
      { en: "Treat unresolved uncertainty as if it were already resolved — when significant doubt remains, your authority requires clarification or escalation, not assumption" },
      { en: "Bypass the Master when a decision affects the vessel's overall safety, another department, or matters beyond your departmental authority" },
      { en: "Delegate accountability for the department's overall performance, even when individual tasks and decisions are properly assigned to OOWs, the Bosun, or other crew members" },
      { en: "Omit, alter, or allow to be altered any factual entry in cargo, stability, environmental, or certification records to present a situation as other than what actually occurred" },
    ],
  },

  commonMistakes: [
    { en: "Relaying unreconciled information upward — Passing the OOW's and Bosun's reports to the Master as if they already formed a coherent picture, instead of personally resolving any discrepancy first." },
    { en: "Treating isolated incidents as unrelated — Reviewing each defect, delay, or deviation on its own, rather than recognizing when several similar occurrences reveal a systemic issue." },
    { en: "Trusting documentation over verified reality — Accepting that the PMS, cargo plan, or certificate records are accurate because they exist, without periodically confirming they still reflect the department's actual condition." },
    { en: "Allowing commercial or schedule pressure to influence a technical decision — Treating urgency as a reason to skip a genuine safety, stability, or environmental verification, rather than as a factor to manage alongside it." },
    { en: "Confusing departmental autonomy with independence from the Master's strategy — Making a decision that technically falls within your authority but conflicts with the Master's overall intent, without confirming alignment first." },
    { en: "Absorbing accountability without delegating properly — Attempting to personally verify or control every detail instead of trusting the Bosun and OOWs to execute well within a properly organized system." },
    { en: "Deferring a difficult conversation about standards — Avoiding addressing a recurring competency or compliance concern with an officer or the Bosun until it becomes a more serious incident." },
    { en: "Accepting a plausible explanation without verification — Allowing a counterpart's, surveyor's, or officer's reasonable-sounding account of a discrepancy to substitute for actually confirming the facts." },
    { en: "Failing to distinguish between what is urgent and what is important — Allowing immediate operational demands to consistently displace long-term departmental priorities such as maintenance planning, crew development, or certification readiness." },
    { en: "Reacting to problems instead of anticipating them — Managing certificates, maintenance, or departmental readiness only once they become urgent, rather than tracking them continuously." },
  ],

  careerProgression: [
    { en: "Next role: Master — the culmination of the deck department progression, requiring a shift from managing the deck department to bearing ultimate legal and operational responsibility for the entire vessel, its crew, and its safe conduct, on behalf of the owner and flag State." },
    { en: "Skills to develop: Integration across all departments (Deck, Engine, Safety), not only Deck; strategic decision-making under commercial, operational, and regulatory pressure at the level of the whole vessel; representation of the vessel to owners, charterers, authorities, and the public; final accountability for crew welfare, vessel safety, and company policy; the ability to set the vessel's overall strategic intent that Chief Officers and OOWs will translate into departmental and watch-level decisions." },
    { en: "Recommended experience: A solid period as Chief Officer across the full range of departmental responsibilities (cargo operations, stability, maintenance governance, emergency command, environmental compliance), with demonstrated reliability in delivering the Master with reconciled, trustworthy departmental assessments — this integrative credibility is the foundation on which command authority is built." },
    { en: "Certificates typically required: Certificates required vary by flag State, company policy, and national administration. Progression to Master typically requires the corresponding STCW certificate of competency (Master Mariner), sufficient certified sea time as Chief Officer, and any additional endorsements required for the vessel type or trade." },
    { en: "Recommended MAP courses: Ship Command & Crisis Leadership; Cross-Departmental Integration (Deck/Engine/Safety); Regulatory and Commercial Responsibility at Command Level; Role On Board – Master (when available); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving from Chief Officer to Master means shifting your integration from a single department to the entire vessel — cargo, navigation, engine, safety, crew, and company interests all become inputs to a single strategic judgment. The skills the Chief Officer has already built (reconciling reports, thinking in patterns, resisting pressure, verifying reality against documentation) do not change — only the scope to which they are applied. Success as a Master is measured by the vessel's ability to operate safely, compliantly, and effectively as a whole, under a single coherent strategic intent. The Chief Officer becomes ready for command when they no longer see the Deck Department as the center of the vessel, but as one essential part of a much larger operational system." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d1-l8", label: { en: "Advanced COLREG" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering & Helm Orders" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping Organization" } },
    { kind: "lesson", lessonId: "s6-l6", label: { en: "Safety Culture & Professional Responsibility" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "lesson", lessonId: "e1-l3", label: { en: "Stability & Loading (foundation-level; partial coverage — no dedicated officer-level Cargo Operations & Stability lesson exists yet)" } },
    { kind: "lesson", lessonId: "d4-l5", label: { en: "Cargo Operations (SMCP) — vocabulary, documentation, stowage & lashing" } },
    { kind: "lesson", lessonId: "d2-l1", label: { en: "SOLAS" } },
    { kind: "lesson", lessonId: "s4-l7", label: { en: "Fire Command, Teams & Damage Control" } },
    { kind: "lesson", lessonId: "s6-l5", label: { en: "Permit to Work & Risk Assessment" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — cargo, stability, and departmental management terminology" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on STCW Chief Mate certification requirements by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore cargo arrangements, stability characteristics, and departmental organization across different vessel types" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on cargo operations, stability, departmental management, or STCW requirements" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Chief Officer to Master" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time, certificates, and departmental management experience gained as Chief Officer" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_BOSUN", label: { en: "Role On Board — Bosun" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_OOW", label: { en: "Role On Board — Officer of the Watch" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_MASTER", label: { en: "Role On Board — Master (when published)" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Cargo operation planning, sequencing, and stability/stress calculations" },
      { en: "My own navigational watch, to the same standard expected of any OOW" },
      { en: "Technical station-level decisions during departure, arrival, anchoring, and STS operations" },
      { en: "Departmental resource prioritization and reallocation in response to changing operational demands" },
      { en: "Tactical decisions within my assigned emergency command role" },
    ],
    iMonitor: [
      { en: "Consistency of navigational and departmental standards across all OOWs and the Bosun" },
      { en: "Stability, stress, and cargo condition throughout every phase of operation" },
      { en: "Alignment between documentation (PMS, certificates, cargo/environmental records) and the department's actual condition" },
      { en: "Recurring patterns across defects, incidents, or discrepancies rather than isolated occurrences" },
      { en: "Cross-department interfaces affecting Deck operations (Engine, Safety, terminal, contractors), ensuring coordination remains effective throughout the operation" },
      { en: "The department's readiness for certification, survey, and dry-dock requirements" },
    ],
    iReport: [
      { en: "A reconciled departmental assessment to the Master, never an unresolved collection of separate reports" },
      { en: "Any technical, commercial, or personnel-related concern requiring the Master's decision" },
      { en: "Any discrepancy identified with a counterpart vessel, surveyor, or terminal, distinguishing confirmed facts from unverified explanations" },
      { en: "Any recurring pattern suggesting a systemic issue in departmental practice" },
      { en: "My own uncertainty when a situation cannot be fully resolved at the departmental level" },
    ],
    iDoNotAuthorize: [
      { en: "Deviation from the Master's overall strategy or standing orders without proper authorization" },
      { en: "A cargo operation, stability configuration, or departure known or suspected to be unsafe" },
      { en: "Certification of departmental compliance based on documentation alone, without genuine verification" },
      { en: "Commercial or schedule pressure overriding a genuine safety, stability, or environmental concern" },
      { en: "My own delegation of accountability for the department's overall performance, even when individual tasks are properly assigned" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Cargo stowage and stability diagram showing loading sequence and stress distribution." } },
    { kind: "diagram", caption: { en: "Deck department organization chart showing the Chief Officer's coordination role between OOWs, Bosun, and other departments." } },
    { kind: "image", caption: { en: "Example of a completed and reconciled cargo/stability calculation printout." } },
    { kind: "video", caption: { en: "Demonstration of a departmental readiness briefing before departure." } },
    { kind: "document", caption: { en: "Sample PMS discrepancy investigation record." } },
  ],
};

// ── MASTER ────────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-27_role-on-board-master-mapreferences.md) and the
// Product Owner's final decisions on that report. s5-l4 (Abandon Ship &
// Survival Leadership, featuring the Costa Concordia case study) and
// d3-l7 (GMDSS & Distress Signals) are new discoveries not used on any
// prior card. Locations with no validated correspondence are left as
// mapReferences: [] intentionally (candidates for a future Command
// Decision-Making / Cross-Departmental Integration module — departure
// manoeuvres/pilotage-BRM, anchoring risk judgment, cross-departmental
// report reconciliation, weather routing judgment, strategic
// decision-making under uncertainty).
const MASTER_CARD: RoleOnBoardCard = {
  rankId: "master",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Master is the person in ultimate command of the vessel, holding final legal and operational responsibility for the safety of the ship, its crew, its cargo, and the marine environment, at all times and under all circumstances. Unlike the Chief Officer, who integrates the deck department's operations, the Master integrates every department — Deck, Engine, Safety — along with the vessel's commercial, regulatory, and human dimensions, into a single coherent command." },
    { en: "The Master's authority is the highest aboard the vessel and cannot be delegated away: officers act with authority delegated by the Master, but the Master's own accountability for the vessel's safe operation is never transferred, regardless of how much is properly delegated to the Chief Officer, Chief Engineer, or OOWs." },
    { en: "The Master sets the vessel's overall strategic intent — passage strategy, risk tolerance, priorities under pressure — which the Chief Officer, Chief Engineer, and OOWs translate into departmental and watch-level decisions; the Master does not need to make every decision personally, but is accountable for the quality of the system that makes them." },
    { en: "The Master represents the vessel and the company to owners, charterers, authorities, and the public, and bears personal legal responsibility under flag State and international law (SOLAS, MARPOL, ISM Code) that no other person aboard carries in the same way." },
    { en: "Where the Chief Officer's judgment resolves ambiguity at the level of the deck department, the Master's judgment resolves ambiguity at the level of the entire vessel and its voyage — balancing safety, commercial pressure, crew welfare, and regulatory compliance simultaneously, often with incomplete information and no one above to escalate to." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "The company (owner/operator), typically through the Designated Person Ashore (DPA) under the ISM Code" },
      { en: "Ultimately accountable to flag State authorities and international maritime law" },
    ],
    worksWith: [
      { en: "Chief Officer and Chief Engineer as heads of the vessel's two main departments" },
      { en: "Pilots, port authorities, and VTS during navigation and port calls" },
      { en: "Charterers, agents, and surveyors on commercial and compliance matters" },
      { en: "The company's shore-based management on operational and strategic matters" },
    ],
    mentors: [
      { en: "The Master typically receives no onboard mentor — professional development at this level comes from experience, company training, peer Masters, and external command courses; the Master instead becomes the primary mentor for the Chief Officer's own development toward command" },
    ],
    supports: [
      { en: "The Chief Officer and Chief Engineer, whom the Master trusts to manage their departments while remaining the final point of decision and accountability" },
      { en: "The whole crew, whose welfare and safety the Master is ultimately responsible for" },
    ],
  },

  professionalSkills: [
    { label: { en: "Strategic decision-making under uncertainty and incomplete information" } },
    { label: { en: "Cross-departmental integration (Deck, Engine, Safety)" } },
    { label: { en: "Crisis command and emergency leadership" }, mapReferences: [{ kind: "lesson", lessonId: "s4-l7" }, { kind: "lesson", lessonId: "s5-l4" }] },
    { label: { en: "Legal and regulatory accountability (SOLAS, MARPOL, ISM Code, flag State law)" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }, { kind: "lesson", lessonId: "d2-l2" }, { kind: "lesson", lessonId: "d2-l3" }, { kind: "lesson", lessonId: "d2-l8" }] },
    { label: { en: "Commercial and company relationship management (owners, charterers, DPA)" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l7" }, { kind: "lesson", lessonId: "d2-l10" }] },
    { label: { en: "Crew welfare, discipline, and human resource leadership" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l4" }] },
    { label: { en: "External representation (authorities, port state control, media/public where relevant)" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l8" }] },
    { label: { en: "Risk tolerance calibration and final safety authority" } },
    { label: { en: "Governance of the vessel's overall documentation and compliance system" }, mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }, { kind: "lesson", lessonId: "d2-l8" }] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Master's responsibility is not to personally verify each departmental readiness report — that is the Chief Officer's and Chief Engineer's role — but to receive, question, and ultimately own the final decision to proceed. The Master integrates the Chief Officer's departmental readiness (navigation, cargo, deck) with the Chief Engineer's readiness (propulsion, machinery, power) into a single command decision, and is personally accountable for that decision regardless of how sound each department's individual input appeared. The Master commands through department heads, not by replacing them." },
      responsibilities: [
        { en: "Receive and question the Chief Officer's consolidated departmental readiness report, probing any area that seems uncertain rather than accepting it at face value" },
        { en: "Receive and question the Chief Engineer's readiness report on propulsion, machinery, and power generation in the same manner" },
        { en: "Confirm the passage plan's overall appropriateness — route, weather routing, port and pilotage arrangements — as the final decision-maker, even though the OOW and Chief Officer prepared it" },
        { en: "Weigh commercial, schedule, and charter party pressure against the vessel's genuine readiness, making the final call to proceed or delay" },
        { en: "Verify that the vessel's certificates, manning, and documentation are legally sufficient for the intended voyage, ultimately the Master's personal responsibility under flag State law" },
        { en: "Assess overall crew readiness (fatigue, morale, and operational effectiveness) across all departments" },
        { en: "Make the final decision to sail, communicating it clearly to both department heads and, where required, to the company or port authorities" },
      ],
      equipment: [
        { en: "Consolidated departmental readiness reports (Deck and Engine)" },
        { en: "Passage plan, charts, weather routing information" },
        { en: "Risk assessment / voyage risk review" },
        { en: "Certificate and manning documentation" },
        { en: "Company standing instructions / voyage orders, where applicable" },
      ],
      risks: [
        { en: "Accepting a departmental readiness report without genuinely questioning it, treating consolidation by the Chief Officer or Chief Engineer as equivalent to personal verification" },
        { en: "Overconfidence in experienced department heads leading to insufficient questioning" },
        { en: "Allowing commercial or schedule pressure to override a genuine doubt about readiness" },
        { en: "A legal or certification gap being overlooked because departmental reports did not flag it" },
        { en: "Crew fatigue or morale issues at a whole-vessel level going unnoticed because each department reports only its own condition" },
        { en: "Deciding to sail without having actually resolved a raised uncertainty, hoping it will not matter" },
      ],
      bestPractices: [
        { en: "Ask direct, specific questions of both department heads rather than accepting a general assurance that 'everything is ready'" },
        { en: "Treat commercial pressure as one input among several, never as the deciding factor over a genuine safety concern" },
        { en: "Personally verify the vessel's legal and certification standing before departure, rather than assuming departmental reports cover it" },
        { en: "Look across departments for crew welfare patterns (fatigue, morale) that neither department alone would necessarily flag" },
        { en: "Never sail with an unresolved doubt — resolve it, delay, or accept the risk consciously and explicitly, but never by default" },
      ],
      commonMistakes: [
        { en: "Treating a department head's readiness report as a substitute for the Master's own judgment rather than an input to it" },
        { en: "Allowing schedule pressure to quietly lower the threshold for what counts as 'ready'" },
        { en: "Assuming legal and certification compliance without personal verification" },
        { en: "Missing a whole-vessel welfare issue because it was never anyone's job to look across departments" },
        { en: "Sailing with a known unresolved concern in the hope that it will not materialize" },
      ],
      professionalTips: [
        { en: "Your signature on the decision to sail carries weight that no departmental report can substitute for — question before you sign" },
        { en: "Commercial pressure will always argue for departure; your job is to make sure safety gets an equally clear voice in that decision" },
        { en: "The certificates and documentation are your personal legal exposure — verify them as such, not as paperwork someone else handles" },
        { en: "A vessel is only as ready as its most tired or most anxious crew member — look at the whole crew, not just the reports" },
        { en: "Command is not about knowing everything yourself; it is about ensuring that every critical question has been asked before committing the ship to sea" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }, { kind: "lesson", lessonId: "d2-l8" }, { kind: "lesson", lessonId: "e1-l3" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Master is typically present on the bridge, retaining ultimate authority over the vessel's conduct even when the OOW is executing the manoeuvre or a pilot is directing it. The Master does not need to give every order personally, but is the final authority who can intervene, override, or take direct conduct of the vessel at any moment the situation requires it. With a pilot embarked, the Master's role is distinctive: the pilot provides local expertise and conducts the vessel, but command and ultimate responsibility for the vessel's safety never leave the Master. The Master remains responsible for the vessel's safety even when every manoeuvring order originates from another qualified person." },
      responsibilities: [
        { en: "Be present on the bridge for departure, maintaining situational awareness of the manoeuvre without necessarily conducting it personally" },
        { en: "Monitor the OOW's or pilot's conduct of the vessel, intervening decisively if safety requires it, regardless of who is currently directing the manoeuvre" },
        { en: "Establish clear communication and expectations with an embarked pilot before the manoeuvre begins, confirming the pilot understands the vessel's characteristics and the Master's expectations for intervention" },
        { en: "Retain final authority over all manoeuvring decisions, including engine and helm orders, even when delegated to the OOW or followed from the pilot's direction" },
        { en: "Make the final call on any ambiguous or borderline situation arising during the manoeuvre (e.g. tug availability, traffic conflict, marginal weather) that exceeds the OOW's or pilot's authority to resolve alone" },
        { en: "Confirm with the Chief Officer that mooring stations are ready and coordinated before committing to the manoeuvre" },
        { en: "Confirm with the Chief Engineer that propulsion and steering remain fully available throughout the manoeuvre" },
        { en: "Communicate any decision to deviate from the standard departure procedure clearly to all parties involved (OOW, pilot, Chief Officer) before acting on it" },
      ],
      equipment: [
        { en: "Full bridge navigational and communication equipment" },
        { en: "Passage plan, berth/channel chart, pilot card (vessel particulars for the pilot)" },
        { en: "Engine status / propulsion availability information" },
        { en: "VHF radio for communication with tugs, VTS, and the pilot" },
      ],
      risks: [
        { en: "Deferring too completely to an embarked pilot's judgment, losing the independent readiness to intervene if something goes wrong" },
        { en: "Hesitating to override the OOW or pilot when a genuine safety concern arises, out of reluctance to disrupt an ongoing manoeuvre" },
        { en: "Unclear communication with the pilot about expectations, leading to ambiguity about who is truly in control if a problem develops" },
        { en: "Loss of bridge team coordination due to unclear distribution of authority between Master, Pilot, and OOW" },
        { en: "Being drawn into managing operational detail personally, losing the overview needed to catch a developing problem" },
        { en: "Delaying a difficult decision (e.g. aborting the departure) due to commercial or schedule pressure" },
      ],
      bestPractices: [
        { en: "Set clear expectations with the pilot before the manoeuvre begins — respect their expertise while making the Master's intervention authority explicit" },
        { en: "Maintain enough distance from the operational detail to preserve the overview needed to intervene at the right moment" },
        { en: "Intervene decisively and without hesitation the moment a genuine safety concern is identified — a pilot's presence does not remove this responsibility" },
        { en: "Confirm departmental readiness (mooring, engine) directly rather than assuming it because the manoeuvre has begun" },
        { en: "Treat commercial or schedule pressure as a factor to weigh, never as a reason to proceed past a genuine safety doubt" },
      ],
      commonMistakes: [
        { en: "Treating a pilot's presence as removing the Master's own responsibility to intervene if necessary" },
        { en: "Hesitating to override an ongoing manoeuvre out of social or professional reluctance to contradict the OOW or pilot" },
        { en: "Losing the overview needed to catch a developing problem by becoming absorbed in operational detail" },
        { en: "Failing to set clear intervention expectations with the pilot before the manoeuvre begins" },
        { en: "Allowing schedule pressure to delay a necessary decision to pause or abort the departure" },
      ],
      professionalTips: [
        { en: "A pilot conducts the vessel; the Master commands it — both facts must remain true throughout the manoeuvre, never just one" },
        { en: "The right moment to intervene is the moment you notice the concern, not the moment you are certain it is serious" },
        { en: "Presence on the bridge is not passive — your attention during a routine departure is what makes a sudden intervention possible when it matters" },
        { en: "Respect for a pilot's skill and willingness to override them when necessary are not in tension — both are part of exercising command properly" },
        { en: "Good Masters intervene early enough that the bridge team understands why the intervention was necessary, not after the situation has already become critical" },
      ],
      mapReferences: [],
    },

    navigation: {
      overview: { en: "During navigation, the Master typically does not stand a routine watch — that is the responsibility of the OOWs and the Chief Officer — but sets the framework within which every watch operates: standing orders, night orders, and clear criteria for when to be called. The Master's presence during navigation is felt through this framework and through decisive intervention when called, not through constant personal conduct of the vessel. Legal responsibility for the vessel's navigation remains with the Master at all times, whether or not the Master is physically on the bridge. The Master's role is to design a navigation system that remains safe even when the Master is not physically on the bridge." },
      responsibilities: [
        { en: "Issue clear, specific standing orders and night orders that leave no genuine ambiguity about when an OOW must call the Master" },
        { en: "Respond immediately and fully to any call from the OOW, treating every call as legitimate rather than questioning the OOW's judgment in calling" },
        { en: "Review the passage plan's overall strategy periodically during the voyage, adjusting for weather, traffic, or operational developments beyond the OOW's or Chief Officer's authority to decide alone" },
        { en: "Approve any major deviation from the passage plan that exceeds the delegated authority of the bridge team" },
        { en: "Maintain awareness of the Chief Officer's oversight of watchkeeping standards across all OOWs, intervening personally only where a departmental correction is insufficient" },
        { en: "Define and communicate the vessel's operational risk tolerance for the voyage (e.g. weather routing decisions, speed versus schedule trade-offs), which the Chief Officer and OOWs then apply" },
        { en: "Be genuinely available when required, ensuring rest and personal routine do not create reluctance in the OOW to call when standing orders require it" },
        { en: "Take direct conduct of the vessel when the situation genuinely requires the Master's personal judgment, not only the OOW's" },
      ],
      equipment: [
        { en: "Standing orders and night order book (authored and maintained by the Master)" },
        { en: "Standing Orders / Night Orders record" },
        { en: "Passage plan, weather routing information, voyage strategy documentation" },
        { en: "Bridge communication equipment for being called at any hour" },
      ],
      risks: [
        { en: "Standing orders vague enough that OOWs remain uncertain about when a call is genuinely required" },
        { en: "Standing orders becoming outdated as the voyage or operating conditions evolve" },
        { en: "Creating, even unintentionally, a culture where OOWs hesitate to call due to the Master's visible fatigue or irritation at being woken" },
        { en: "Losing track of the voyage's overall strategic picture by remaining too detached from routine navigation" },
        { en: "Delaying a strategic passage decision (e.g. weather routing) until it becomes urgent rather than addressing it proactively" },
        { en: "Undermining the Chief Officer's watchkeeping oversight by intervening in departmental matters that should be resolved at that level" },
      ],
      bestPractices: [
        { en: "Write standing and night orders with genuine specificity — vague thresholds produce hesitant OOWs" },
        { en: "Respond to every call as if it were legitimate, regardless of how it turns out — this is what sustains a culture of calling early" },
        { en: "Review the voyage's strategic picture periodically, not only when prompted by an OOW's call" },
        { en: "Make risk tolerance decisions (weather routing, schedule trade-offs) explicitly and communicate them clearly, rather than leaving OOWs to infer them" },
        { en: "Trust the Chief Officer's departmental oversight of watchkeeping standards, intervening personally only when genuinely necessary" },
      ],
      commonMistakes: [
        { en: "Writing standing orders vague enough to leave OOWs uncertain about when to call" },
        { en: "Reacting to a call with visible frustration, teaching the bridge team to delay or avoid calling next time" },
        { en: "Becoming so detached from routine navigation that a strategic passage decision is made too late" },
        { en: "Micromanaging watchkeeping standards that the Chief Officer is already handling appropriately" },
        { en: "Leaving risk tolerance decisions implicit, forcing OOWs to guess what the Master would accept" },
      ],
      professionalTips: [
        { en: "The quality of your standing orders is measured by how confidently an OOW can decide, alone at 3 a.m., whether to call you" },
        { en: "How you respond to being called shapes whether you are called again when it truly matters — protect that instinct in your bridge team" },
        { en: "Command at sea is often exercised through the orders you have already given, not the ones you give in the moment" },
        { en: "Trusting the Chief Officer's oversight is not distance from navigation — it is how command scales across an entire voyage" },
        { en: "Good Masters create bridge teams that know exactly when to think independently and exactly when to ask for help" },
      ],
      mapReferences: [],
    },

    anchoring: {
      overview: { en: "For routine anchoring in a well-known, low-risk area, the Master typically delegates the operation to the OOW and Chief Officer, who apply the same judgment described in their own curricula. The Master's distinct role emerges when the anchorage carries elevated risk — congested waters, marginal holding ground, forecast deterioration, or a politically or commercially sensitive location — where the decision to anchor, remain, or reposition exceeds what should be decided at the department level alone. The Master's presence and judgment become directly engaged exactly where the routine ends. The Master's role begins where routine anchoring decisions become command decisions." },
      responsibilities: [
        { en: "Decide whether a given anchorage's risk profile (congestion, holding ground, forecast weather) requires the Master's personal authorization before anchoring, rather than leaving it entirely to the OOW and Chief Officer" },
        { en: "Be called and personally engaged when dragging, deteriorating conditions, or an emerging conflict with other vessels or authorities is reported, rather than treated as a routine departmental matter" },
        { en: "Make the final decision on remaining at anchor, repositioning, or getting underway when conditions deteriorate beyond what the bridge team's delegated authority covers" },
        { en: "Weigh the commercial and operational consequences of a prolonged or unplanned anchorage against the vessel's safety, making the final call when these interests are in tension" },
        { en: "Confirm with the Chief Officer and Chief Engineer that the vessel retains genuine readiness to get underway throughout an extended anchor period, particularly in a higher-risk anchorage" },
        { en: "Communicate directly with the company, agent, or authorities when an anchoring decision has significant commercial, legal, or diplomatic implications" },
        { en: "Authorize any exceptional anchoring strategy that departs from normal company procedures when immediate safety requires it, documenting the reasons for the decision" },
      ],
      equipment: [
        { en: "Chart and passage plan reference for the anchorage area" },
        { en: "Weather forecast and routing information" },
        { en: "Anchor watch reports and bridge situation reports" },
        { en: "Company/agent communication channels for commercially or legally significant anchoring decisions" },
      ],
      risks: [
        { en: "Treating every anchorage as routine, missing the specific conditions that actually warranted the Master's personal engagement" },
        { en: "Being called too late because standing orders did not clearly define the threshold for an anchoring-related call" },
        { en: "Allowing commercial pressure (avoiding delay, demurrage) to override a genuine safety concern about remaining at a deteriorating anchorage" },
        { en: "Assuming the vessel's readiness to get underway remains intact during an extended anchorage without direct confirmation" },
        { en: "Failing to reassess the anchorage as conditions evolve, assuming yesterday's decision remains valid today" },
        { en: "Underestimating the escalation potential of an anchorage in a congested, politically sensitive, or otherwise non-routine location" },
      ],
      bestPractices: [
        { en: "Define, in standing orders, which anchoring conditions require the Master's personal decision rather than departmental judgment alone" },
        { en: "Treat any report of dragging, deteriorating weather, or a developing conflict at anchor as requiring direct Master engagement, not routine departmental handling" },
        { en: "Weigh commercial consequences explicitly and transparently against safety, rather than letting one silently dominate the decision" },
        { en: "Confirm underway readiness directly during an extended or higher-risk anchorage, rather than assuming it remains as it was" },
        { en: "Engage the company or agent proactively when an anchoring decision has commercial, legal, or diplomatic weight" },
      ],
      commonMistakes: [
        { en: "Leaving anchoring entirely to the department level even in a genuinely higher-risk situation that warranted the Master's engagement" },
        { en: "Standing orders vague enough that the bridge team is uncertain when an anchoring situation requires a call" },
        { en: "Allowing schedule or commercial pressure to delay a necessary decision to reposition or get underway" },
        { en: "Assuming readiness to get underway without confirming it directly during a prolonged anchor period" },
        { en: "Underestimating a non-routine anchorage's potential to escalate into a commercial, legal, or diplomatic matter" },
      ],
      professionalTips: [
        { en: "Most anchorages are genuinely routine — your judgment is in recognizing quickly which ones are not" },
        { en: "A dragging report at anchor deserves the same urgency as a collision risk at sea — treat it accordingly" },
        { en: "Commercial consequences of a delay are real, but they are never a reason to accept a safety risk you would not otherwise accept" },
        { en: "An anchorage that seems calm today can become the vessel's most consequential decision of the voyage if conditions or circumstances shift" },
        { en: "Good Masters review an anchorage continuously, not just the decision that placed the vessel there" },
      ],
      mapReferences: [],
    },

    port_operations: {
      overview: { en: "While alongside, the Chief Officer manages cargo operations and the Bosun and OOW manage deck workload and security, but the Master becomes the vessel's primary representative to the outside world — port authorities, Port State Control, agents, charterers, and, where relevant, the media or public. The Master's distinct contribution in port is less about the cargo itself and more about the vessel's standing: its compliance, its reputation, and its relationships with the parties who can grant or withhold operational freedom. The Master's authority in port extends beyond ship operations to protecting the vessel's legal standing, commercial interests, and professional reputation." },
      responsibilities: [
        { en: "Receive and personally engage with Port State Control inspections, class surveyors, or authorities when they require the Master's direct involvement, rather than delegating entirely to the Chief Officer" },
        { en: "Set the vessel's security level and access policy in line with the ISPS Code, authorizing any deviation or exceptional access decision that exceeds the Chief Officer's or OOW's delegated authority" },
        { en: "Maintain the primary relationship with the agent and charterer's representatives on matters affecting the vessel's schedule, commercial standing, or legal exposure" },
        { en: "Make the final decision on any dispute or discrepancy with the terminal, surveyor, or charterer that the Chief Officer cannot resolve at a technical level" },
        { en: "Approve any decision to suspend cargo operations or delay departure when safety, compliance, or legal considerations require it" },
        { en: "Authorize crew changes, shore leave policy, and provisioning decisions affecting the whole vessel, balancing crew welfare against port-specific constraints" },
        { en: "Represent the vessel and company appropriately in any interaction with port officials, media, or the public, protecting both the vessel's legal standing and the company's reputation" },
        { en: "Confirm with the Chief Officer and Chief Engineer that the vessel's overall readiness to depart is genuinely sound before authorizing departure preparations" },
      ],
      equipment: [
        { en: "Certificates, class documentation, and PSC deficiency records" },
        { en: "ISPS security plan and access control documentation" },
        { en: "Port regulations and local authority instructions" },
        { en: "Agent, charterer, and company communication channels" },
        { en: "Crew list, rest-hour records, and provisioning/welfare documentation" },
      ],
      risks: [
        { en: "Delegating a Port State Control or authority interaction entirely to the Chief Officer when the Master's personal engagement was actually required or expected" },
        { en: "Allowing commercial or charterer pressure to influence a decision that should rest on safety or compliance grounds alone" },
        { en: "An access control or security level decision being made without the Master's awareness when it exceeds departmental authority" },
        { en: "Losing track of a dispute with the terminal or charterer because it was assumed to be a technical matter the Chief Officer would resolve alone" },
        { en: "Failing to recognize that a commercial discussion has evolved into a legal issue requiring immediate company involvement" },
        { en: "Representing the vessel or company poorly in an external interaction, creating legal or reputational exposure beyond the immediate issue" },
      ],
      bestPractices: [
        { en: "Be personally present and engaged for inspections or interactions that carry genuine legal or commercial weight, rather than delegating by default" },
        { en: "Set clear, explicit criteria for what security or access decisions require the Master's authorization" },
        { en: "Maintain direct, proactive contact with the agent and charterer rather than relying solely on the Chief Officer's operational updates" },
        { en: "Treat crew welfare decisions (shore leave, rest, provisioning) as a whole-vessel responsibility, not an afterthought to cargo operations" },
        { en: "Prepare for external representation deliberately — know what can and cannot be said or committed to on the company's behalf" },
      ],
      commonMistakes: [
        { en: "Assuming a Port State Control or authority matter is purely technical and delegating it away from the Master's own engagement" },
        { en: "Allowing schedule or commercial pressure from the charterer to quietly influence a compliance or safety decision" },
        { en: "Being unaware of a security or access decision made at the departmental level that exceeded delegated authority" },
        { en: "Neglecting the primary relationship with the agent or charterer, leaving the Chief Officer to manage commercial matters beyond their authority" },
        { en: "Speaking or committing to something externally without appreciating its legal or commercial consequence for the company" },
      ],
      professionalTips: [
        { en: "Port State Control does not just inspect the vessel — it forms an impression of its Master; be present and engaged, not just compliant" },
        { en: "The relationships you maintain with agents and charterers outside of any crisis are what make navigating an actual crisis with them possible" },
        { en: "Every external representation of the vessel is also a representation of the company — know the difference between what is yours to decide and what is not" },
        { en: "Crew welfare in port is not separate from vessel safety — a well-rested, fairly treated crew is a safer crew at sea" },
        { en: "A Master's credibility is built long before a dispute arises; professionalism in routine interactions is part of command" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d2-l8" }, { kind: "lesson", lessonId: "d2-l4" }, { kind: "lesson", lessonId: "d2-l1" }, { kind: "lesson", lessonId: "d2-l10" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations combine every dimension the Master has already engaged with in other phases — commanding through department heads, weighing commercial pressure against safety, and representing the vessel externally — concentrated into a single, higher-risk operation. The Master authorizes the STS operation itself, is typically present or immediately available throughout, and holds final authority over whether to proceed, pause, or abort, particularly when conditions or counterpart behaviour raise concerns beyond what the Chief Officer or OOW can resolve alone. The Master's responsibility extends beyond the safety of one vessel to the safe coordination of two command teams operating together." },
      responsibilities: [
        { en: "Authorize the STS operation in advance, confirming the plan, the counterpart vessel's suitability, and the conditions under which the operation will proceed" },
        { en: "Be present on the bridge or immediately available throughout the operation, given its elevated risk relative to routine manoeuvring" },
        { en: "Establish command-level contact with the counterpart vessel's Master before the operation begins, confirming mutual understanding of procedures, abort criteria, and communication protocols" },
        { en: "Make the final decision to proceed, pause, or abort the operation when conditions (weather, counterpart readiness, technical concerns) exceed the Chief Officer's or OOW's authority to decide alone" },
        { en: "Weigh commercial pressure (charter party timing, cargo value) against genuine safety concerns, retaining final authority over any decision to continue under marginal conditions" },
        { en: "Authorize emergency separation if required, ensuring the decision and its reasoning are clearly communicated to both vessels and the company" },
        { en: "Ensure the company or relevant authorities are informed of the operation's outcome, particularly if it was aborted, delayed, or encountered a significant issue" },
        { en: "Ensure that lessons learned from any significant STS event are reported and incorporated into future operational planning" },
      ],
      equipment: [
        { en: "STS operational plan and counterpart vessel compatibility documentation" },
        { en: "STS checklist and emergency contingency procedures" },
        { en: "Bridge communication equipment for direct contact with the counterpart vessel's Master" },
        { en: "Weather and sea state forecast relevant to the operation's risk assessment" },
        { en: "Company communication channels for authorization and reporting" },
      ],
      risks: [
        { en: "Authorizing an STS operation without genuinely verifying the counterpart vessel's suitability or the conditions supporting it" },
        { en: "Being insufficiently engaged or available during the operation, leaving a genuinely elevated risk decision to be made without the Master's judgment" },
        { en: "Allowing commercial pressure to influence the decision to proceed or continue under marginal conditions" },
        { en: "Assuming that both vessels share the same operational standards without confirming them explicitly" },
        { en: "Miscommunication or unclear command-level understanding with the counterpart vessel's Master before the operation begins" },
        { en: "Hesitating to abort once significant resources or time have already been committed to the operation" },
      ],
      bestPractices: [
        { en: "Treat STS authorization as a genuine decision, not a formality — verify the plan and the counterpart vessel's suitability personally" },
        { en: "Establish direct Master-to-Master contact with the counterpart vessel before the operation, confirming shared understanding of abort criteria" },
        { en: "Remain present or immediately available throughout the operation, given its elevated risk compared to routine manoeuvring" },
        { en: "Treat commercial pressure as an input to weigh, never as the deciding factor over a genuine safety concern" },
        { en: "Report the operation's outcome to the company proactively, particularly if it did not proceed as planned" },
      ],
      commonMistakes: [
        { en: "Authorizing an STS operation as a routine formality without genuinely assessing its specific risk" },
        { en: "Being unavailable or insufficiently engaged during the operation despite its elevated risk profile" },
        { en: "Allowing commercial pressure (cargo value, schedule) to influence a decision that should rest on safety grounds" },
        { en: "Failing to establish clear command-level communication with the counterpart vessel before the operation begins" },
        { en: "Hesitating to abort due to the resources or time already invested in the operation" },
      ],
      professionalTips: [
        { en: "An STS operation is authorized twice — once on paper before it begins, and once in your genuine judgment that conditions still support it" },
        { en: "A Master-to-Master conversation before the operation sets the tone for how quickly and clearly a real problem will be communicated later" },
        { en: "The commercial value of a cargo transfer is never a reason to accept a risk you would not otherwise accept" },
        { en: "Presence during an STS operation is not symbolic — it is what makes a timely abort decision possible" },
        { en: "The safest STS operations are those where both Masters are equally willing to stop the operation before a minor concern becomes a major incident" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l5" }, { kind: "lesson", lessonId: "e1-l3" }, { kind: "lesson", lessonId: "d2-l7" }],
    },

    maintenance: {
      overview: { en: "The Chief Officer and Chief Engineer each govern their department's maintenance system; the Master's distinct responsibility is to ensure these two systems remain coordinated and adequately resourced, and to make the strategic decisions — deferring a repair, requesting additional budget, scheduling a dry-dock — that exceed either department head's authority alone. The Master is ultimately accountable to the company and to class for the vessel's overall material condition, regardless of which department a given deficiency originates in. The Master's responsibility is not to manage maintenance tasks, but to ensure the vessel's long-term material integrity is protected through sound strategic decisions." },
      responsibilities: [
        { en: "Review consolidated maintenance status from both the Chief Officer and Chief Engineer, identifying any cross-departmental resource conflict or priority requiring the Master's decision" },
        { en: "Authorize or escalate to the company any maintenance expenditure, spare parts request, or shore-side support exceeding departmental budget authority" },
        { en: "Make the final decision on deferring a non-critical repair against operational or commercial priorities, weighing the risk explicitly rather than allowing deferral to become default" },
        { en: "Ensure that any accepted maintenance risk is formally communicated, documented, and periodically reviewed until resolved" },
        { en: "Plan and negotiate dry-dock or major survey timing with the company, balancing the vessel's actual material condition against commercial and schedule considerations" },
        { en: "Ensure that a maintenance deficiency identified by either department is not silently absorbed at the departmental level when it has vessel-wide safety or compliance implications" },
        { en: "Maintain the company's confidence in the vessel's material condition through honest, proactive reporting, rather than allowing gaps to surface only during an external inspection" },
      ],
      equipment: [
        { en: "Consolidated maintenance and PMS status from both Deck and Engine departments" },
        { en: "Risk register / deferred defects list" },
        { en: "Class survey schedule and dry-dock planning documentation" },
        { en: "Company budget and technical support communication channels" },
      ],
      risks: [
        { en: "A cross-departmental maintenance priority conflict (Deck versus Engine) being resolved informally rather than through a genuine Master-level decision" },
        { en: "Deferring a repair repeatedly under operational pressure until deferral becomes the default rather than a conscious, documented decision" },
        { en: "Normalizing degraded equipment because it has continued operating without immediate failure" },
        { en: "Discovering a significant material deficiency only during an external inspection because it was not proactively reported to the company" },
        { en: "Dry-dock or major survey planning being driven primarily by commercial schedule rather than the vessel's genuine material condition" },
        { en: "Assuming departmental maintenance reports are complete and accurate without periodically verifying them personally" },
      ],
      bestPractices: [
        { en: "Review both departments' maintenance status together periodically, looking specifically for conflicts or gaps neither department alone would surface" },
        { en: "Treat every deferral decision as a conscious, documented choice, not a default outcome of competing pressures" },
        { en: "Report the vessel's genuine material condition to the company proactively, before an external inspection forces the issue" },
        { en: "Negotiate dry-dock and major survey timing based on the vessel's actual condition, using commercial factors as one input among several" },
        { en: "Periodically verify departmental maintenance reports personally, rather than assuming their completeness" },
      ],
      commonMistakes: [
        { en: "Allowing a cross-departmental resource conflict to persist unresolved because it falls between the Chief Officer's and Chief Engineer's separate authorities" },
        { en: "Letting repeated deferrals of a non-critical repair become an unconscious pattern rather than an explicit decision" },
        { en: "Being surprised by a material deficiency during an external inspection that internal reporting should have already surfaced" },
        { en: "Allowing commercial schedule to dictate dry-dock timing without genuinely weighing the vessel's material condition" },
        { en: "Trusting departmental maintenance reports without any personal verification" },
      ],
      professionalTips: [
        { en: "The company trusts your account of the vessel's condition more than any report — make sure that trust is earned through honesty, not convenience" },
        { en: "A deferred repair is a decision, not a default — treat it that way every time" },
        { en: "Dry-dock timing is one of the most consequential decisions you make for the vessel's long-term condition — protect it from being driven by schedule alone" },
        { en: "The Master who reports problems before they are discovered externally builds more credibility than the one who reports only good news" },
        { en: "Good Masters protect the vessel's future condition, not only its ability to complete today's voyage" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d2-l1" }, { kind: "lesson", lessonId: "d2-l8" }],
    },

    emergency_situations: {
      overview: { en: "When a major emergency develops, the Master becomes the single point of ultimate decision for the entire vessel — setting the overall strategy that the Chief Officer, Chief Engineer, and OOWs translate into departmental and tactical action, and making the decisions no one else aboard has the authority to make: overall priorities when they conflict, the decision to abandon ship, and communication with the company and external rescue authorities. The Master does not personally fight the fire or plug the leak, but is accountable for the strategy that determines whether the response succeeds. In a major emergency, every tactical action on board should support a single command strategy defined by the Master." },
      responsibilities: [
        { en: "Take command of the overall emergency response immediately, establishing clear communication with all department heads and confirming the muster and emergency organization is functioning" },
        { en: "Set the overall strategic priority when competing interests conflict (e.g. life safety versus vessel salvage versus environmental protection), communicating this clearly to all department heads" },
        { en: "Receive consolidated situation reports from the Chief Officer, Chief Engineer, and any other team leader, integrating them into a single command picture rather than acting on any one report alone" },
        { en: "Make the final decision to continue fighting to save the vessel, to abandon ship, or to request external assistance (SAR, salvage, other vessels), based on the integrated situation and available expertise" },
        { en: "Authorize the transition from one emergency phase to another (response, stabilization, recovery), ensuring the command strategy evolves with the situation" },
        { en: "Communicate directly and promptly with the company (DPA) and, where required, coast guard or SAR authorities, providing an accurate and updated picture of the situation" },
        { en: "Reassess the overall strategy continuously as the emergency evolves, adjusting priorities and resource allocation as new information arrives from department heads" },
        { en: "Ensure accountability for all persons aboard throughout the emergency, personally confirming the muster is complete and accurate before any major decision (e.g. abandon ship) is finalized" },
        { en: "Debrief and ensure lessons from the emergency are captured and reported to the company once the situation is resolved" },
      ],
      equipment: [
        { en: "Full bridge and emergency communication equipment, including satellite communication with the company and authorities" },
        { en: "Muster list, emergency organization plan, and stability/damage control references" },
        { en: "Emergency response procedures and contingency plans" },
        { en: "SAR and distress communication equipment (GMDSS)" },
        { en: "Company emergency contact and DPA communication channels" },
      ],
      risks: [
        { en: "Making tactical decisions personally instead of setting strategy and trusting department heads to execute it, losing the overview needed for command" },
        { en: "Delaying the decision to abandon ship or request external assistance out of reluctance to accept the severity of the situation" },
        { en: "Acting on one department head's report without integrating it with others, missing a critical factor from elsewhere on the vessel" },
        { en: "Allowing cognitive overload to narrow situational awareness, focusing on one problem while missing a more critical developing threat elsewhere" },
        { en: "Losing track of personnel accountability during a fast-moving emergency, delaying recognition of someone missing" },
        { en: "Underestimating how quickly a situation can escalate, continuing with an initial strategy after conditions have fundamentally changed" },
        { en: "Miscommunicating or delaying communication with the company or external authorities, losing valuable time or support" },
      ],
      bestPractices: [
        { en: "Set the overall strategy clearly and let department heads execute the tactics within their zones — resist the pull toward personal tactical involvement" },
        { en: "Integrate every department head's report into a single command picture before making a major decision, rather than acting on the most recent or most urgent-sounding one" },
        { en: "Communicate proactively and continuously with the company and authorities, even before a final decision is needed" },
        { en: "Reassess the overall strategy explicitly and regularly as the emergency evolves, rather than assuming the initial plan remains correct" },
        { en: "Maintain personal, continuous accountability for all persons aboard throughout the emergency, verifying rather than assuming" },
      ],
      commonMistakes: [
        { en: "Becoming personally absorbed in tactical detail at the expense of the overall strategic command" },
        { en: "Hesitating on a major decision (abandon ship, external assistance) until the situation has deteriorated further than necessary" },
        { en: "Acting on an incomplete or unreconciled picture because reports from different areas were not properly integrated" },
        { en: "Losing track of personnel accountability while managing multiple simultaneous demands" },
        { en: "Continuing an initial strategy without adapting it as the emergency's nature or severity changes" },
      ],
      professionalTips: [
        { en: "Your job in a major emergency is to think, not to fight — the moment you start doing a department head's job, no one is doing yours" },
        { en: "The decision to call for help or abandon ship is never a failure of command — delaying it out of pride is" },
        { en: "A consolidated, integrated picture from all departments is worth more than any single urgent-sounding report — build it deliberately" },
        { en: "The muster count is not a formality during an emergency — it is the one piece of information you can never afford to get wrong" },
        { en: "How you led during routine operations is what your crew draws on when you lead them through a real emergency" },
        { en: "The crew will often remember the clarity of your decisions more than the complexity of the emergency itself" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s4-l7" }, { kind: "lesson", lessonId: "s5-l4" }, { kind: "lesson", lessonId: "d3-l7" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "The Chief Officer reports the vessel ready to proceed through a challenging strait, having reconciled all deck-level concerns. Separately, the Chief Engineer mentions that one of two generators is running 'a bit hotter than usual' but is not flagging it as a defect requiring delay." },
      mission: { en: "Decide whether to proceed as scheduled or resolve the engineering comment first, weighing the schedule pressure of the strait's tidal window against an unconfirmed technical concern." },
      expectedActions: [
        { en: "Do not treat the Chief Officer's readiness report as covering the whole vessel" },
        { en: "Personally question the Chief Engineer's comment — is this within normal parameters, or a developing issue" },
        { en: "Consider whether additional technical assessment or monitoring is required before committing the vessel to a phase where recovery options become limited" },
        { en: "Resolve the ambiguity before committing to the tidal window, even if it means missing it" },
        { en: "Make the final decision explicitly, documenting the reasoning either way" },
      ],
      why: [{ en: "A comment mentioned without escalation is not the same as a resolved technical assessment — the Master's role is to ensure genuine integration between departments before a decision with real consequences (a committed passage through a challenging strait) is made, not to let scheduling urgency substitute for it." }],
      commonMistakes: [
        { en: "Treating the Chief Officer's readiness as sufficient without checking the engineering comment" },
        { en: "Allowing the tidal window to pressure a decision before the concern is resolved" },
        { en: "Failing to document why the decision was made either way" },
      ],
      safetyPoints: [{ en: "A committed passage through a challenging strait is a poor moment to discover an unresolved technical concern — resolve it while the option to delay still exists." }],
      mapReferences: [],
    },
    {
      situation: { en: "Weather routing shows a developing system that would justify a significant, costly deviation to avoid the worst of it. The charterer's representative contacts you directly, expressing strong preference for staying on the direct route to meet a laycan deadline." },
      mission: { en: "Decide the vessel's routing strategy, weighing the charterer's commercial pressure against your own safety judgment." },
      expectedActions: [
        { en: "Acknowledge the charterer's commercial interest without allowing it to substitute for your own weather and safety assessment" },
        { en: "Make the routing decision based on the vessel's safety and the crew's welfare first" },
        { en: "Communicate the decision and its reasoning clearly and professionally to the charterer, rather than avoiding the conversation" },
        { en: "Document the decision and the weather data supporting it" },
      ],
      why: [{ en: "The Master's authority over the vessel's safety cannot be delegated to commercial interests, however legitimate those interests are — a charterer's preference is an input to communicate around, never a factor that overrides a genuine weather-based safety judgment. Professional disagreement with commercial stakeholders is part of command when safety requires it." }],
      commonMistakes: [
        { en: "Allowing the charterer's direct contact to create pressure that influences the routing decision" },
        { en: "Avoiding a difficult conversation with the charterer by simply complying" },
        { en: "Failing to document the weather data and reasoning behind the decision" },
      ],
      safetyPoints: [{ en: "A significant weather deviation decided too late, under commercial pressure, is far more dangerous and far more costly than one decided early and communicated clearly." }],
      mapReferences: [],
    },
    {
      situation: { en: "A fire has broken out in a machinery space. The Chief Officer reports the deck team's muster as complete. Minutes later, the Chief Engineer's muster report for the engine team is still pending, and initial indications suggest one engine crew member may be unaccounted for." },
      mission: { en: "Decide how to proceed with the overall emergency strategy while this personnel discrepancy remains unresolved." },
      expectedActions: [
        { en: "Do not treat the deck team's completed muster as sufficient to consider the overall muster resolved" },
        { en: "Personally confirm the status of the engine team's muster before finalizing any major strategic decision" },
        { en: "Avoid making assumptions based on incomplete reports; require positive confirmation before treating any personnel status as resolved" },
        { en: "Treat the possible missing crew member as the immediate priority alongside the firefighting response, not as a secondary concern" },
        { en: "Communicate clearly to all department heads that the muster remains open until confirmed complete" },
      ],
      why: [{ en: "A partial muster is not a complete muster — the Master's responsibility for personnel accountability does not end when the first department reports in; treating an unresolved personnel status as settled risks a catastrophic gap in exactly the moment it matters most." }],
      commonMistakes: [
        { en: "Treating the deck team's completed muster as representative of the whole vessel" },
        { en: "Allowing the firefighting response to overshadow an unresolved personnel discrepancy" },
        { en: "Delaying escalation of the missing crew member possibility while waiting for more certainty" },
      ],
      safetyPoints: [{ en: "In any emergency, an unresolved muster discrepancy is itself an emergency — it should never wait quietly behind the more visible problem." }],
      mapReferences: [{ kind: "lesson", lessonId: "s4-l7" }, { kind: "lesson", lessonId: "s5-l4" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  ],

  professionalTips: [
    { en: "Command through your department heads, never around them — the moment you start doing their job personally, you have stopped doing yours." },
    { en: "Integrate before you decide — a report from one department is an input, never the whole picture; the picture is yours to build." },
    { en: "Commercial pressure will always have a voice — your job is to make sure safety has an equally clear one in every decision that matters." },
    { en: "Calling for help, delaying departure, or aborting an operation is never a failure of command — hesitating to do so out of pride is, because protecting lives and the vessel is the purpose of command, not preserving appearances." },
    { en: "Your standing orders and the culture you build around being called are what keep the vessel safe when you are not physically present." },
    { en: "A muster count, a certificate, a maintenance deferral — treat every piece of documentation as your personal legal and professional responsibility, not administrative background noise." },
    { en: "Every external interaction — with authorities, charterers, or the media — represents the vessel and the company; know precisely what is yours to decide and what is not." },
    { en: "The crew remembers the clarity of your decisions more than the complexity of the situations that required them." },
    { en: "Command is not measured by how many decisions you make yourself, but by how reliably the system you have built produces good ones when you are not physically present." },
    { en: "The higher you rise in command, the less your value comes from solving problems yourself and the more it comes from creating a ship where the right people solve the right problems at the right time." },
  ],

  professionalMindset: [
    { en: "Think in terms of the whole vessel, not any single department. A problem raised by the Chief Engineer, the Chief Officer, or an external party is never the whole picture — the Master's mind holds the vessel as one system, not a collection of separate reports." },
    { en: "Treat authority as something that flows through people, not around them. Command is exercised by setting strategy and trusting department heads to execute it — the impulse to solve a problem personally is usually a sign that trust, not the problem, needs attention." },
    { en: "Assume that certainty is rare and that decisions must still be made. Waiting for complete information before deciding is itself a decision, usually the wrong one — command means acting responsibly on the best integrated picture available, not the perfect one. The objective is not certainty, but responsible judgment under uncertainty." },
    { en: "See commercial and external pressure as permanent features of the environment, not obstacles to be removed. Charterers, schedules, and authorities will always have interests — the Master's judgment exists precisely to weigh those interests against safety, not to wish them away." },
    { en: "Recognize that your own accountability never transfers, no matter how much authority is properly delegated. Every officer aboard acts with delegated authority; only the Master's accountability for the vessel's overall safety has nowhere further to be delegated." },
    { en: "Understand that documentation and reality must be held to the same standard as any operational decision. A certificate, a muster, a maintenance record are not administrative background — they are claims about reality that the Master is personally answerable for." },
    { en: "Hold multiple time horizons at once. Today's passage, this quarter's maintenance budget, and the vessel's long-term material condition all compete for attention — the Master manages the present without mortgaging the future. Avoid solving today's problem by creating tomorrow's larger one." },
    { en: "Accept that command is proven less in crisis than in the years of routine that precede it. The standing orders written, the calls answered without irritation, the honest reports sent before they were required — these are what a crew actually draws on when a real emergency arrives." },
    { en: "Measure your effectiveness by what the vessel can do without your direct involvement. A Master who has built a genuinely capable command team can be temporarily unavailable without the vessel's safety depending on it — that capability, not personal indispensability, is the real achievement of command." },
  ],

  professionalDocumentation: [
    { en: "Official Logbook — The Master is the ultimate legal custodian of the vessel's official logbook, personally responsible for its accuracy and completeness even where entries are made by officers. In many jurisdictions, specific entries (crew events, disciplinary matters, major incidents) require the Master's personal signature or entry." },
    { en: "Certificates and statutory documents — The Master holds final personal responsibility for the vessel carrying valid, current certificates (safety, load line, pollution prevention, ISM/ISPS) — not merely for their existence, but for their genuine validity relative to the vessel's actual condition, including ensuring that no certificate is relied upon when the vessel's actual condition no longer supports its validity." },
    { en: "Safety Management System (SMS) and ISM Code compliance — The Master ensures the vessel operates in accordance with the company's SMS, reporting non-conformities to the Designated Person Ashore (DPA) and ensuring the system is a living practice aboard, not only a shelf of manuals." },
    { en: "Oil Record Book and environmental compliance records — While the Chief Officer governs the accuracy of these records at a departmental level, the Master carries the final personal legal accountability for their truthfulness — falsification of these records is a criminal matter in most jurisdictions, and the Master's signature or oversight carries that weight." },
    { en: "Incident, casualty, and near-miss reporting — The Master ensures any reportable incident is accurately and promptly reported to the company, flag State, and other authorities as required, distinguishing confirmed facts from matters still under investigation, and resists any pressure — internal or external — to minimize or delay a report. Initial reports must be factual, timely, and clearly distinguish confirmed information from assumptions or developing information." },
    { en: "Crew documentation — The Master oversees the accuracy of crew certificates, contracts, discharge books, and rest-hour records at a whole-vessel level, ensuring the vessel's manning remains genuinely compliant, not merely paper-compliant." },
    { en: "Communication with the company (DPA) and authorities — The Master maintains a documented, honest record of significant communications with the company and external authorities, recognizing that this correspondence often becomes the primary evidence of the Master's judgment in any subsequent review or investigation." },
    { en: "Why this matters: The Master's documentation responsibility is different in kind from every other rank aboard — it carries personal legal and criminal liability under flag State and international law (SOLAS, MARPOL, ISM Code), not only commercial or professional consequence. A Master who treats the vessel's documentary record with the same seriousness as any operational decision protects the vessel, the crew, the company, and their own personal legal standing — because in an investigation, the record is very often the only account of events anyone outside the vessel will ever see. Professional documentation is therefore not separate from command — it is one of the ways command is exercised and later judged." },
  ],

  environmentalResponsibilities: [
    { en: "Final legal accountability for MARPOL compliance — The Master carries personal legal and often criminal liability for the vessel's compliance with MARPOL across all departments, distinct from the Chief Officer's and Chief Engineer's departmental governance of their own records and practices." },
    { en: "Authorizing exceptional environmental decisions — The Master makes or ratifies any decision that departs from standard environmental procedure under exceptional circumstances (e.g. an emergency discharge to protect life or the vessel), ensuring that any departure from normal procedure remains strictly within the limits permitted by international law and is fully documented." },
    { en: "Environmental incident command — When a pollution incident occurs or is imminent, the Master takes command of the response strategy, coordinating departmental action, activating the vessel's Shipboard Oil Pollution Emergency Plan (SOPEP) or equivalent, and ensuring the company and authorities are notified without delay. The Master ensures that environmental response priorities are coordinated with life-saving and vessel safety priorities, recognizing that these objectives may compete during a major emergency." },
    { en: "Balancing environmental compliance against commercial and operational pressure — The Master ensures that schedule, cost, or charterer pressure never compromises a genuine environmental safeguard, and personally resolves any situation where departmental judgment and commercial pressure are in conflict." },
    { en: "Company and regulatory relationship on environmental matters — The Master represents the vessel in environmental matters with Port State Control, class, and the company's DPA, ensuring the vessel's environmental standing is protected and accurately represented externally." },
    { en: "Culture of environmental compliance — The Master ensures environmental responsibility is treated as integral to the vessel's operation across all departments, not as a compliance formality separate from commercial and operational priorities, building this culture through personal example, clear expectations, and consistent decision-making." },
    { en: "Why this matters: Environmental compliance failures carry among the most severe legal, financial, and reputational consequences a Master and company can face — criminal liability, vessel detention, and significant financial penalties are all realistic outcomes of a poorly managed environmental incident or a falsified record. The Master who ensures genuine compliance, decisive incident command, and an honest relationship with authorities protects not only the vessel and company, but their own personal legal standing and professional future. Environmental leadership is therefore not a separate responsibility of command — it is one of the standards by which command itself is judged." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Make the final decision on any matter affecting the vessel's safety, navigation, or the safety of life, overriding any officer's decision or any external party's preference when safety requires it" },
      { en: "Deviate from the passage plan, standing procedures, or company instructions when the safety of the vessel, crew, or environment requires it, reporting the deviation and its reasoning afterward" },
      { en: "Authorize emergency actions (including emergency discharges to protect life or the vessel) that would not be permitted under normal circumstances, provided they remain within the bounds of international law" },
      { en: "Overrule a pilot's conduct of the vessel, or take direct command from any officer, at any moment the Master judges necessary" },
      { en: "Make the final decision to abandon ship, request external assistance, or divert to a port of refuge, based on the Master's integrated judgment of the situation" },
      { en: "Discipline crew members and make decisions regarding crew welfare, repatriation, or medical evacuation within the Master's authority under maritime law and company policy" },
      { en: "Communicate directly with authorities, media, or the public on matters concerning the vessel, within the limits of the Master's authority to represent the company" },
      { en: "Refuse an instruction from the company or charterer that the Master judges would compromise the safety of the vessel, crew, or environment" },
      { en: "Request clarification, additional resources, or shore-based expertise whenever the situation exceeds the information reasonably available on board" },
    ],
    youCannot: [
      { en: "Direct the vessel or crew to act in violation of international law (SOLAS, MARPOL, COLREG) or the flag State's requirements, regardless of company or commercial pressure to do so" },
      { en: "Falsify, omit, or authorize the falsification of any official record (logbook, Oil Record Book, certificates) to misrepresent what actually occurred" },
      { en: "Delegate personal accountability for the vessel's overall safety and compliance, even where operational authority is properly delegated to department heads" },
      { en: "Ignore or override the company's Safety Management System without proper justification and reporting through the Designated Person Ashore" },
      { en: "Withhold or delay a legally required report of an incident, casualty, or environmental event to the company, flag State, or relevant authorities" },
      { en: "Allow commercial or charter party pressure to override a genuine safety, stability, or environmental concern" },
      { en: "Act outside the vessel's certified capabilities or beyond what the vessel's certificates and documentation legally permit" },
      { en: "Ignore credible safety concerns raised by any crew member solely because of rank or position" },
      { en: "Use emergency powers for convenience rather than genuine necessity" },
      { en: "Exercise command carelessly on the assumption that ultimate authority removes the need to question, verify, or integrate information before deciding" },
    ],
  },

  commonMistakes: [
    { en: "Doing a department head's job instead of commanding through them — Stepping in to personally solve a Chief Officer's or Chief Engineer's problem, rather than setting strategy and trusting them to execute it, quietly eroding both their development and the Master's own overview." },
    { en: "Acting on one report instead of an integrated picture — Making a major decision based on whichever department's input arrived first or sounded most urgent, rather than deliberately reconciling all available information." },
    { en: "Letting commercial or schedule pressure quietly shift the safety threshold — Allowing charterer, company, or schedule pressure to gradually lower what counts as an acceptable risk, without ever making that shift a conscious, examined decision." },
    { en: "Trusting documentation without verifying reality — Assuming certificates, records, and departmental reports accurately reflect the vessel's actual condition, without periodically confirming this personally." },
    { en: "Hesitating on a major decision out of reluctance to accept its consequences — Delaying a call for assistance, an abandon ship decision, or an unfavorable report because accepting it feels like a personal or professional failure, while the time lost to indecision can quietly close off the safest options still available." },
    { en: "Creating a culture where officers hesitate to call or report — Reacting to being woken, questioned, or given bad news in a way that teaches the bridge team or department heads to delay next time." },
    { en: "Treating documentation as administrative rather than personal legal exposure — Signing, approving, or overlooking a record without recognizing that it may become the primary evidence of the Master's own judgment in a future investigation." },
    { en: "Confusing ultimate authority with license to decide carelessly — Assuming that being the final decision-maker removes the need to question, verify, and integrate information before acting." },
    { en: "Neglecting the routine in favor of the exceptional — Underinvesting in the standing orders, culture, and systems that determine how the vessel performs during an actual emergency, focusing attention only once a crisis has already begun — the quality of an emergency response is usually determined long before the emergency itself occurs." },
  ],

  careerProgression: [
    { en: "Next steps: The Master rank has no higher position within the deck department hierarchy — it is the culmination of the seagoing career progression from Deck Cadet through Chief Officer. Further progression typically takes one of several directions: command of larger or more complex vessel types, senior/fleet Master roles within a company, or a transition ashore into roles such as Marine Superintendent, DPA, fleet manager, or maritime training and pilotage." },
    { en: "Skills to develop for continued command growth: Deeper specialization in complex vessel types or high-value/high-risk trades (LNG, chemical, deep-sea offshore); company-level fleet management and policy-setting if moving toward a superintendent or DPA role; mentorship and formal development of future Masters, extending the command judgment built over a career to shaping the next generation of officers; broader business and regulatory literacy if a shore-based transition is anticipated." },
    { en: "Recommended experience: A demonstrated record of sound command judgment across a range of vessel types, operating conditions, and situations — including at least one genuinely challenging emergency or high-pressure commercial situation handled well — builds the professional reputation on which further command opportunities or a shore-based transition are typically built." },
    { en: "Certificates typically required: Requirements vary by flag State, company policy, and the specific next step. Command of a larger or more complex vessel type may require additional certification or endorsements (e.g. tanker/gas/chemical endorsements, ice navigation, polar code). A transition to a superintendent or DPA role typically requires demonstrated seagoing command experience together with company-specific or shore-based management training, rather than an additional STCW certificate." },
    { en: "Recommended MAP courses: Fleet & Company Management; Marine Superintendency & Shore-Based Roles; Mentorship & Command Development (training future Chief Officers and Masters); Specialized Vessel Type Certification (as relevant); Career Navigator (career progression planning)." },
    { en: "Mindset for continued growth: Reaching Master does not mean command stops developing — it means the terrain changes. Continued growth as a Master means deepening judgment across more complex vessels and situations, and eventually deciding whether your greatest value lies in commanding one more ship well, or in shaping how an entire fleet, company, or the next generation of officers commands theirs. Either path continues the same core work: building systems, people, and judgment that keep vessels safe long after any single decision has been made." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d1-l8", label: { en: "Advanced COLREG" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering & Helm Orders" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping Organization" } },
    { kind: "lesson", lessonId: "s6-l6", label: { en: "Safety Culture & Professional Responsibility" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "lesson", lessonId: "s4-l7", label: { en: "Fire Command, Teams & Damage Control" } },
    { kind: "lesson", lessonId: "d2-l1", label: { en: "SOLAS" } },
    { kind: "lesson", lessonId: "e1-l3", label: { en: "Stability & Loading (foundation-level resource used to support command-level understanding until dedicated command-level content is introduced)" } },
    { kind: "lesson", lessonId: "d2-l2", label: { en: "MARPOL — Law, Sanctions & Liabilities" } },
    { kind: "lesson", lessonId: "d2-l3", label: { en: "STCW — Training, Certification & Responsibilities" } },
    { kind: "lesson", lessonId: "d2-l4", label: { en: "MLC 2006 — Seafarer Rights & Responsibilities" } },
    { kind: "lesson", lessonId: "d2-l7", label: { en: "Maritime Liability & Insurance" } },
    { kind: "lesson", lessonId: "d2-l8", label: { en: "Ports & Flag States" } },
    { kind: "lesson", lessonId: "d2-l9", label: { en: "Piracy & Maritime Security" } },
    { kind: "lesson", lessonId: "d2-l10", label: { en: "Arbitration & Maritime Dispute Resolution" } },
    { kind: "lesson", lessonId: "d3-l7", label: { en: "GMDSS & Distress Signals" } },
    { kind: "lesson", lessonId: "s5-l4", label: { en: "Abandon Ship & Survival Leadership" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — command, legal, and regulatory terminology" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on STCW Master certification requirements by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore command bridge arrangements and operational characteristics across different vessel types" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on command decisions, regulatory compliance, or STCW requirements" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize post-command career paths (fleet command, shore-based roles, superintendency)" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document command experience, certificates, and leadership achievements as Master" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_CHIEF_OFFICER", label: { en: "Role On Board — Chief Officer" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_OOW", label: { en: "Role On Board — Officer of the Watch" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_BOSUN", label: { en: "Role On Board — Bosun" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "The final decision on any matter affecting the vessel's safety, navigation, or the safety of life" },
      { en: "Direct command of the vessel during high-risk manoeuvres or emergencies, when personal conduct is genuinely required" },
      { en: "Authorization of any emergency action, exceptional deviation, or departure from standard procedure" },
      { en: "Communication with the company (DPA), authorities, agents, and charterers on matters of significant consequence" },
      { en: "The final decision to sail, remain in port, anchor, abandon ship, or seek external assistance" },
    ],
    iMonitor: [
      { en: "Consistency and integration between the Deck and Engine departments' reports, plans, and priorities" },
      { en: "The vessel's overall material condition, certification, and compliance status relative to what documentation claims" },
      { en: "Crew welfare, fatigue, and morale across the whole vessel, not within a single department" },
      { en: "The company's and external parties' (charterer, authority) pressure relative to the vessel's genuine safety and compliance needs" },
      { en: "The vessel's readiness to respond to a major emergency at all times, including during routine operations" },
    ],
    iReport: [
      { en: "A reconciled, whole-vessel assessment to the company (DPA), never a collection of separate departmental reports" },
      { en: "Any reportable incident, casualty, or environmental event, accurately, promptly, and distinguishing confirmed facts from matters under investigation" },
      { en: "Any deviation from standing instructions, the passage plan, or company procedure, together with its reasoning" },
      { en: "Any recurring or systemic issue across departments suggesting a need for company-level attention or resource" },
      { en: "My own uncertainty when a situation cannot be fully resolved with the information and resources available aboard" },
    ],
    iDoNotAuthorize: [
      { en: "Any action that violates international law (SOLAS, MARPOL, COLREG) or flag State requirements, regardless of commercial or company pressure" },
      { en: "Falsification, omission, or alteration of any official record to misrepresent what actually occurred" },
      { en: "Delegation of my own accountability for the vessel's overall safety and compliance, even where operational authority is properly assigned to department heads" },
      { en: "Commercial or schedule pressure overriding a genuine safety, stability, or environmental concern" },
      { en: "The use of emergency or command authority for convenience rather than genuine necessity" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Ship command organization chart showing the Master's position relative to the company (DPA), Chief Officer, and Chief Engineer." } },
    { kind: "diagram", caption: { en: "Command decision flow during a major emergency (Master strategy → department head tactics → execution)." } },
    { kind: "image", caption: { en: "Example of a Master's night order book entry." } },
    { kind: "video", caption: { en: "Demonstration of a Master-to-Master STS pre-operation briefing." } },
    { kind: "document", caption: { en: "Sample incident report format for company (DPA) and flag State notification." } },
  ],
};

// ── DECK CADET ────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-28_role-on-board-deck-cadet-mapreferences.md) and the
// Product Owner's final decisions on that report. All lessonId used are
// foundation-level lessons whose targetRanks explicitly include
// "deck_cadet". Locations with no validated correspondence are left as
// mapReferences: [] intentionally (ship_to_ship_operations phase, and
// several behavioral/meta skills — observation, TRB documentation,
// clarifying questions, instruction-following — that no existing lesson
// content covers).
const DECK_CADET_CARD: RoleOnBoardCard = {
  rankId: "deck_cadet",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Deck Cadet is a trainee officer undergoing structured seagoing training toward an Officer of the Watch certificate, working under structured supervision provided by the Chief Officer, OOWs, Bosun, and experienced ratings to build the practical experience required alongside academic study. Unlike every other rank on this ladder, the Cadet's primary task aboard is not independent execution — it is supervised learning, observation, and the accumulation of documented training records." },
    { en: "The Cadet participates in real deck operations — mooring, anchoring, cargo watches, bridge familiarization — but always under supervision, and never bears independent operational responsibility the way an AB or OS does; a Cadet's mistake is expected to be caught and corrected by the supervising officer or rating, not carried through to consequence. The level of supervision may gradually decrease as competence is demonstrated, but responsibility remains with the supervising officer or rating." },
    { en: "The Cadet's success is measured differently from every other rank: not by flawless execution, but by demonstrated understanding, genuine curiosity, and progress recorded in the Training Record Book (TRB) that will support certification as an OOW." },
    { en: "The Cadet works closely with the Bosun and ABs for deck operations, and with OOWs for bridge familiarization and navigational training — building relationships and reputation that often shape how quickly they are trusted with real responsibility once qualified." },
    { en: "Where every other rank on this ladder is evaluated on the quality of their decisions or execution, the Cadet is evaluated on the quality of their learning — asking good questions, seeking clarification rather than guessing, and building the foundation of judgment that will define their entire career." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Chief Officer (overall training oversight)" },
      { en: "Bosun (day-to-day deck task supervision)" },
      { en: "OOWs (bridge watch familiarization)" },
    ],
    worksWith: [
      { en: "AB and OS, from whom the Cadet learns practical seamanship directly" },
      { en: "Other cadets (Deck and Engine) during shared training activities" },
    ],
    mentors: [
      { en: "Chief Officer, who typically oversees the Cadet's Training Record Book and certification progress" },
      { en: "The Bosun and senior ABs, who mentor practical deck skills" },
      { en: "OOWs, who mentor navigational and watchkeeping familiarization" },
    ],
    supports: [
      { en: "The Cadet contributes as a team member but holds no supervisory responsibility" },
    ],
  },

  professionalSkills: [
    { label: { en: "Observation and active learning under supervision" } },
    { label: { en: "Professional conduct and integration into the deck team" } },
    { label: { en: "Basic seamanship (ropework, mooring assistance, deck maintenance) under guidance" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l1" }, { kind: "lesson", lessonId: "d6-l2" }, { kind: "lesson", lessonId: "d6-l4" }, { kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }] },
    { label: { en: "Bridge familiarization and basic navigational terminology" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l5" }, { kind: "lesson", lessonId: "d1-l6" }, { kind: "lesson", lessonId: "d1-l9" }, { kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Training Record Book (TRB) documentation and self-assessment" } },
    { label: { en: "Asking clarifying questions and seeking guidance appropriately" } },
    { label: { en: "Basic safety awareness and PPE compliance" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }] },
    { label: { en: "Following instructions precisely and reporting task completion honestly" } },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Cadet's role is to observe and assist under direct supervision — following the Bosun or an assigned AB during deck checks, and shadowing the OOW during navigational readiness verification, without independently deciding or confirming anything. The value of this phase for the Cadet is not in completing tasks alone, but in seeing how experienced crew members actually verify readiness — what they check, what they ask, and what they consider 'good enough.' Observation is an active responsibility — the Cadet should seek to understand not only what is done, but why it is done." },
      responsibilities: [
        { en: "Assist the Bosun or an assigned AB with assigned pre-departure tasks (mooring line inspection, equipment checks) exactly as instructed, without making independent judgment calls" },
        { en: "Observe the OOW's navigational readiness verification when permitted, asking questions afterward rather than interrupting the process" },
        { en: "Report completion of an assigned task honestly and promptly, including anything unclear or not fully understood" },
        { en: "Request feedback from the supervising officer or rating after completing assigned tasks, using it to improve future performance" },
        { en: "Record relevant training observations in the Training Record Book, connecting what was observed to the required competencies" },
        { en: "Ask for clarification immediately when an instruction is not understood, rather than proceeding on a guess" },
        { en: "Follow all PPE and safety requirements exactly as instructed, without exception" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed by the supervising officer or rating" },
        { en: "Training Record Book (TRB)" },
        { en: "Notebook or equivalent for capturing observations and questions" },
      ],
      risks: [
        { en: "Guessing at an unclear instruction rather than asking, risking an incorrectly completed task" },
        { en: "Attempting a task beyond current competence without supervision present" },
        { en: "Remaining passive during training, waiting to be taught instead of actively observing and learning" },
        { en: "Missing the learning value of the phase by focusing only on completing an assigned task mechanically" },
        { en: "Failing to record observations promptly, losing detail relevant to TRB competency requirements" },
      ],
      bestPractices: [
        { en: "Ask questions before starting an unfamiliar task, not partway through it" },
        { en: "Treat every assigned task as an opportunity to understand why it matters, not only how to do it" },
        { en: "Record TRB observations as soon as possible after the activity, while details are still fresh" },
        { en: "Report honestly when something was not fully understood, rather than implying it was" },
      ],
      commonMistakes: [
        { en: "Proceeding on a guess rather than asking for clarification" },
        { en: "Treating a task as complete without genuinely understanding what it verified or why" },
        { en: "Waiting too long after an activity to record TRB observations, losing useful detail" },
        { en: "Hesitating to ask a question out of concern it might seem inexperienced" },
      ],
      professionalTips: [
        { en: "Asking a good question is not a sign of inexperience — it is exactly what this stage of training expects of you" },
        { en: "The habits you build now — asking, observing, recording — are the same habits that will make you a good OOW later" },
        { en: "A task done correctly but not understood teaches you far less than a task you had to ask about" },
        { en: "Your reputation as a Cadet is built more by your willingness to learn than by pretending to already know" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l5" }, { kind: "lesson", lessonId: "d6-l4" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Cadet is assigned to a mooring station or the bridge purely as an observer and light assistant, never as a decision-maker or independent executor. The value of this phase is watching the coordination between the bridge, the Chief Officer or Bosun at the station, and the deck team in real time — how orders are given, repeated, and confirmed — while staying completely out of the way of any actual safety-critical action. Every departure is a learning opportunity to connect classroom knowledge with real shipboard practice." },
      responsibilities: [
        { en: "Follow the exact position and instructions given by the supervising officer or rating, never moving independently within the operational area" },
        { en: "Observe the sequence of orders and their execution (e.g. line handling, engine/helm commands relayed) without attempting to participate beyond what is explicitly assigned" },
        { en: "Observe how standard communication phrases and closed-loop communication are used during the manoeuvre, noting examples in the Training Record Book" },
        { en: "Ask questions once the manoeuvre is safely completed, not during active operations" },
        { en: "Record observations about the manoeuvre's coordination and communication in the Training Record Book" },
        { en: "Remain alert to PPE and personal safety at all times, particularly regarding snap-back zones and moving equipment" },
        { en: "Report immediately to the supervising officer or rating if given an instruction that seems unclear or unsafe, rather than acting on it uncertainly" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed (helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Moving into a hazardous area (snap-back zone, line of tension) due to inexperience or momentary inattention" },
        { en: "Attempting to assist beyond the assigned task, creating confusion or risk during a safety-critical operation" },
        { en: "Focusing so closely on the assigned activity that important lessons from the overall operation are missed" },
        { en: "Asking a question at a moment that distracts the supervising officer or rating during active operations" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned and do only what has been explicitly assigned, however tempting it is to help further" },
        { en: "Watch the whole coordination — bridge to station, station to team — not just the immediate task in front of you" },
        { en: "Save questions for after the manoeuvre, when the supervising officer or rating can actually engage with them" },
        { en: "Treat every manoeuvre as a chance to see the same principles applied slightly differently, and note what varies and what stays constant" },
      ],
      commonMistakes: [
        { en: "Wandering into a hazardous area out of curiosity or inattention" },
        { en: "Trying to help beyond the assigned role, adding risk rather than value during a safety-critical operation" },
        { en: "Interrupting active communication with a question that could wait" },
        { en: "Watching only the task directly assigned and missing the broader coordination taking place" },
      ],
      professionalTips: [
        { en: "During a manoeuvre, your job is to be exactly where you are told and nowhere else — this is not a limitation, it is the safest way to learn from a genuinely dangerous operation" },
        { en: "The best departures to learn from are the routine ones — pay attention to how little drama a well-run manoeuvre actually has" },
        { en: "What separates a good future officer from an average one often starts here: noticing not just what people do, but why they do it in that order" },
        { en: "The safest Cadets are usually the ones who observe first, understand second, and act only when instructed" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4" }, { kind: "lesson", lessonId: "d1-l9" }],
    },

    navigation: {
      overview: { en: "During navigation, the Cadet's primary activity is bridge familiarization — standing alongside the OOW during watches, learning to use navigational equipment under direct supervision, and gradually taking on simple, closely monitored tasks (plotting a position, taking a bearing) as competence is demonstrated. The Cadet never stands an independent watch or bears responsibility for the vessel's safety; every action is checked by the supervising OOW before or as it is relied upon." },
      responsibilities: [
        { en: "Stand watch alongside the OOW as assigned, observing lookout technique, equipment use, and decision-making without independently acting on what is seen" },
        { en: "Perform simple, supervised tasks (position plotting, taking a bearing, logging an observation) only as explicitly assigned, with the OOW verifying the result" },
        { en: "Ask the OOW to explain reasoning behind a decision or action when the opportunity allows, rather than assuming understanding" },
        { en: "Record navigational observations, terminology, and procedures in the Training Record Book, connecting them to required competencies" },
        { en: "Report anything observed that seems unusual or unclear to the OOW immediately, rather than assuming it is not worth mentioning" },
        { en: "Follow bridge etiquette and communication discipline exactly as demonstrated, including proper use of standard phrases" },
      ],
      equipment: [
        { en: "Bridge navigational equipment, used only under direct supervision" },
        { en: "Training Record Book" },
        { en: "Notebook for capturing terminology and procedures" },
      ],
      risks: [
        { en: "Acting on an observation or task result without having it verified by the OOW, treating a supervised task as if it were independent" },
        { en: "Assuming understanding of an explanation without actually confirming it through a follow-up question" },
        { en: "Disturbing the OOW's concentration during a genuinely demanding moment of the watch with a question that could wait" },
        { en: "Losing engagement during long, uneventful watch periods, missing the value of quieter observation" },
      ],
      bestPractices: [
        { en: "Treat every supervised task as an opportunity for the OOW to check your understanding, not as an independent responsibility" },
        { en: "Time questions for appropriate moments — quieter periods of the watch rather than active decision-making" },
        { en: "Use quiet periods of the watch actively, reviewing terminology or procedures rather than disengaging" },
        { en: "Confirm understanding of an explanation by restating it in your own words when appropriate" },
      ],
      commonMistakes: [
        { en: "Treating a supervised task result as final without waiting for the OOW's verification" },
        { en: "Nodding along to an explanation without genuinely understanding it" },
        { en: "Asking a question at a moment that interrupts the OOW's attention during a critical task" },
        { en: "Mentally disengaging during quiet watch periods instead of using them to learn" },
      ],
      professionalTips: [
        { en: "The OOW you shadow today is showing you what a normal watch actually looks like — pay attention even when nothing dramatic is happening" },
        { en: "A quiet watch is not wasted time — it is often the best time to ask questions and absorb detail" },
        { en: "Every task you're given supervised is a task you'll eventually do alone — learn it as if that day were coming soon, because it is" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l5" }, { kind: "lesson", lessonId: "d1-l6" }, { kind: "lesson", lessonId: "d1-l10" }, { kind: "lesson", lessonId: "d1-l9" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Cadet may be positioned at the forecastle with the Bosun's team or on the bridge with the OOW, depending on training needs — either way, purely as an observer of how the anchor is prepared, let go, and monitored, and how information flows between the forecastle and the bridge. This phase offers a clear, physical demonstration of the coordination the Cadet has only seen described until now: two teams working from a shared plan, communicating constantly to keep the vessel safe." },
      responsibilities: [
        { en: "Follow the exact position and role assigned (forecastle or bridge), observing without independently acting on what is seen" },
        { en: "Watch how chain amount, tendency, and load are reported from the forecastle and interpreted on the bridge, noting the vocabulary and format used" },
        { en: "Observe how the anchor watch is organized and what is monitored once the vessel has anchored, if the training schedule includes this" },
        { en: "Ask questions once the operation is safely completed, focusing on how the forecastle and bridge information were combined into a single decision" },
        { en: "Record observations of the anchoring sequence and communication in the Training Record Book" },
        { en: "Remain alert to PPE and personal safety at all times, particularly regarding the windlass and moving chain if positioned at the forecastle" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Standing too close to the windlass or chain out of curiosity, without recognizing the hazard" },
        { en: "Missing the coordination between forecastle and bridge by focusing only on the immediate physical action in front of you" },
        { en: "Assuming the anchor is 'just resting' once let go, missing the ongoing monitoring that follows" },
        { en: "Failing to connect what is observed at anchoring to the broader principle of combining information from multiple sources into one decision" },
      ],
      bestPractices: [
        { en: "Whichever position you are assigned, actively look for how information travels to the other location — this is the real lesson of the phase" },
        { en: "Note the exact phrases used to report chain status — this vocabulary will matter directly once you stand your own watch" },
        { en: "Ask specifically how the forecastle's report and the bridge's own observation were reconciled, if anything seemed to differ between them" },
        { en: "Treat the anchor watch, if you observe one, as seriously as the anchoring operation itself — the vessel's safety does not end when the chain stops running" },
      ],
      commonMistakes: [
        { en: "Standing closer to moving equipment than necessary out of curiosity" },
        { en: "Treating anchoring as a single event rather than an operation that continues with monitoring afterward" },
        { en: "Watching only the physical action without paying attention to the communication that coordinates it" },
        { en: "Assuming that once anchored, nothing more needs active attention" },
      ],
      professionalTips: [
        { en: "Anchoring is one of the clearest places to see how two separate viewpoints — forecastle and bridge — are combined into a single, reliable picture" },
        { en: "The vocabulary you hear used to report chain status is not casual language — it is a precise, standardized way of describing exactly what is happening" },
        { en: "Watching the anchor watch, if you get the chance, teaches you as much as watching the anchor go down — vigilance that continues quietly is easy to underestimate" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l3" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Cadet is exposed to the widest variety of activity in the whole training programme — gangway watch, cargo operations, security procedures, and interactions with agents, surveyors, and shore personnel — always under supervision and never with independent authority over any of it. Port stays are an opportunity to see how many different roles and interests come together around a single vessel, and how the deck team keeps track of it all without losing focus." },
      responsibilities: [
        { en: "Stand gangway watch only alongside a supervising rating or officer, observing access control procedures without independently deciding who may board" },
        { en: "Assist with cargo-related deck tasks as assigned, under direct supervision, without making independent judgments about safety or sequencing" },
        { en: "Observe interactions between the vessel's officers and external parties (agents, surveyors, terminal staff) when permitted, noting how professional communication is conducted" },
        { en: "Ask questions about port procedures and documentation once appropriate, rather than during an active task or a busy exchange with an external party" },
        { en: "Record observations about port operations and security procedures in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed, particularly around cargo operations and equipment in use" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Making an independent decision at the gangway (e.g. about a visitor) without recognizing this is never the Cadet's role to decide alone" },
        { en: "Standing too close to active cargo operations out of curiosity, without recognizing the hazard" },
        { en: "Missing the variety of activity happening simultaneously in port by focusing narrowly on one assigned task" },
        { en: "Interrupting an officer's interaction with an external party with a question that could wait" },
      ],
      bestPractices: [
        { en: "Treat every gangway watch as an observation opportunity, even when supervised — notice what triggers escalation to an officer" },
        { en: "Stay at a safe distance from active cargo operations unless directly assigned a task within them" },
        { en: "Watch how officers interact with agents, surveyors, and terminal staff — professional communication with external parties is a skill you will need directly one day" },
        { en: "Save procedural questions for a quieter moment, not during an active exchange or task" },
      ],
      commonMistakes: [
        { en: "Assuming a minor gangway decision can be made independently because it seems obvious" },
        { en: "Getting too close to cargo operations out of curiosity rather than maintaining a safe observation distance" },
        { en: "Focusing only on the assigned task and missing the broader port activity happening around it" },
        { en: "Asking a question at a moment that interrupts an officer's professional interaction with an external party" },
      ],
      professionalTips: [
        { en: "Port stays compress an enormous amount of learning into a short time — pay attention to everything happening, not only your assigned task" },
        { en: "The way officers speak to agents, surveyors, and terminal staff is a skill in itself — watch it as closely as you watch any technical procedure" },
        { en: "A gangway watch looks simple until you notice how many small judgment calls the supervising rating or officer is actually making" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l2" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations are among the most demanding evolutions a Cadet will observe, combining precise ship-handling, rigging, and continuous communication between two vessels. The Cadet's role is strictly observational and supervised — positioned safely away from the interface between the hulls, watching how the deck team, the bridge, and the counterpart vessel coordinate under conditions that leave very little margin for error." },
      responsibilities: [
        { en: "Remain in the exact position assigned by the supervising officer or rating, well clear of the area between the two vessels at all times" },
        { en: "Observe fender rigging, mooring arrangement, and the deck team's coordination without participating beyond any explicitly assigned task" },
        { en: "Watch how communication is maintained between the bridge, the deck team, and the counterpart vessel, noting the discipline and precision involved" },
        { en: "Ask questions once the operation is safely completed, focusing on what determined the pace and sequencing of the operation" },
        { en: "Record observations about STS coordination and communication in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed, with particular attention to the heightened risk of this operation" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed, including flotation aid where required" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Underestimating the danger of the space between the two vessels because it is only being observed, not worked in" },
        { en: "Moving closer to the operation out of curiosity, without recognizing how quickly conditions can change" },
        { en: "Missing the significance of small, continuous corrections and reports, focusing only on the visible rigging work" },
        { en: "Assuming the operation is routine because it appears calm, without recognizing the constant vigilance that keeps it that way" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned, regardless of how safe the operation appears to be proceeding" },
        { en: "Pay close attention to the small, continuous communications — they are the real substance of how the operation stays safe" },
        { en: "Notice how quickly the deck team and bridge respond to a minor change, even one that never becomes a problem" },
        { en: "Treat the apparent calm of a well-run STS operation as evidence of vigilance, not the absence of risk" },
      ],
      commonMistakes: [
        { en: "Standing closer to the operation than assigned, misjudging the risk because nothing appears to be happening" },
        { en: "Focusing only on the physical rigging and missing the communication that actually coordinates the operation" },
        { en: "Mistaking a smoothly run operation for a low-risk one" },
        { en: "Losing attention during a long or repetitive phase of the operation" },
      ],
      professionalTips: [
        { en: "STS operations look calm when they are going well — that calm is the product of constant, careful attention, not its absence" },
        { en: "The space between two vessels deserves more respect than almost anything else you will observe at sea — watch it from a safe distance and take that seriously" },
        { en: "What you're really watching in an STS operation is trust — between the bridge and the deck team, and between two separate crews who rarely know each other well" },
      ],
      mapReferences: [],
    },

    maintenance: {
      overview: { en: "Maintenance is where the Cadet gets the most hands-on experience of the whole training programme — assisting the Bosun and ABs with real deck maintenance tasks under close supervision, learning proper technique from the very people who perform it daily. Unlike the more observational phases, maintenance offers genuine opportunities to practice skills directly, provided every task is properly supervised and the Cadet never exceeds their demonstrated competence." },
      responsibilities: [
        { en: "Assist with assigned maintenance tasks (chipping, painting, greasing, rope work) exactly as instructed, under direct supervision from the Bosun or an assigned AB" },
        { en: "Ask for a demonstration before attempting an unfamiliar task, rather than guessing at the correct technique" },
        { en: "Report task progress and completion honestly, including any part not confidently understood" },
        { en: "Observe how the Bosun inspects work and decides whether it meets standard, connecting this to the broader concept of quality verification" },
        { en: "Record maintenance skills practiced and techniques learned in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed for the specific task" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task" },
        { en: "Maintenance tools and materials, used only as instructed and under supervision" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Attempting a task technique without having it properly demonstrated first, risking poor quality work or injury" },
        { en: "Overstating confidence in a task to avoid appearing inexperienced, then performing it incorrectly" },
        { en: "Missing the opportunity to understand why a maintenance standard exists, treating the task only as a mechanical action" },
        { en: "Using tools or products incorrectly due to insufficient supervision or unclear instruction" },
      ],
      bestPractices: [
        { en: "Ask to see a task demonstrated before attempting it yourself, even if it looks straightforward" },
        { en: "Be honest about your confidence level for a given task — supervision exists precisely to catch what you don't yet know" },
        { en: "Watch how the Bosun or AB inspects finished work, not only how they perform it" },
        { en: "Use every maintenance task as a chance to build real technique, since these are skills you will rely on directly as an AB or officer later" },
      ],
      commonMistakes: [
        { en: "Attempting a technique without asking for a demonstration first" },
        { en: "Claiming more confidence in a task than is genuinely felt, out of concern about appearing inexperienced" },
        { en: "Treating a maintenance task as a box to check rather than a skill to build" },
        { en: "Rushing a task without a clear understanding of the standard it needs to meet" },
      ],
      professionalTips: [
        { en: "There is no reward for pretending to already know a technique — asking for a demonstration is exactly what this stage of your career is for" },
        { en: "The maintenance skills you build now as a Cadet are the same ones you'll be expected to already have as an AB — take them seriously" },
        { en: "Watching how work gets inspected teaches you as much as watching how it gets done" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Cadet has an assigned station on the muster list, like every other crew member, but their role there is strictly supervised — following the instructions of the officer or rating in charge of that station, never acting independently. Drills and, if it ever occurs, a genuine emergency are among the most important learning moments of the whole training programme: the Cadet is seeing, in real time, how the calm structure they have observed during routine operations holds up under pressure." },
      responsibilities: [
        { en: "Proceed immediately to the assigned muster station upon hearing the alarm, exactly as required by the muster list" },
        { en: "Follow the instructions of the officer or rating in charge of the station precisely, without independently deciding on an action" },
        { en: "Observe how the station is organized, how the team leader communicates, and how information flows to and from command during drills" },
        { en: "Ask questions after a drill is complete, focusing on what was done and why, rather than during the exercise itself" },
        { en: "Record observations from drills and, if applicable, genuine emergencies in the Training Record Book" },
        { en: "Take every drill as seriously as a genuine emergency, participating fully rather than treating it as a formality" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Treating a drill as a formality rather than genuine practice, reducing its training value" },
        { en: "Acting on personal initiative during an emergency or drill rather than following the station leader's instructions" },
        { en: "Missing the value of the drill by focusing only on personal actions rather than observing the team's overall coordination" },
        { en: "Failing to ask questions afterward, losing the opportunity to understand decisions made under pressure" },
      ],
      bestPractices: [
        { en: "Treat every drill with full seriousness — the habits practiced in a drill are the ones that will actually be used in a real emergency" },
        { en: "Follow the station leader's instructions precisely, even if the reason is not yet fully clear — ask afterward" },
        { en: "Watch how the team leader communicates under pressure, not only what actions are performed" },
        { en: "Use the post-drill debrief actively, asking specific questions about decisions or communications observed" },
      ],
      commonMistakes: [
        { en: "Going through the motions of a drill without genuine engagement" },
        { en: "Acting independently during an emergency situation instead of following the assigned station leader" },
        { en: "Focusing only on personal tasks during a drill and missing the broader team coordination" },
        { en: "Skipping the opportunity to ask questions once a drill is complete" },
      ],
      professionalTips: [
        { en: "How you take a drill is how you will take the real thing — there is no separate 'serious mode' you can switch into later" },
        { en: "The calmest-looking emergency responses are usually the ones that have been drilled the most seriously, not the ones with the least at stake" },
        { en: "Watching a team leader communicate clearly under pressure during a drill teaches you more about leadership than almost anything else in your training" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l2" }, { kind: "lesson", lessonId: "s6-l1" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "An AB asks you to 'clean up that area' before painting begins, but does not specify exactly what needs to be removed or how thoroughly. You are fairly sure you understand what is meant." },
      mission: { en: "Decide whether to proceed on your best understanding or clarify the instruction first." },
      expectedActions: [
        { en: "Ask a quick clarifying question before starting, even if you feel reasonably confident" },
        { en: "Confirm the expected standard (how clean, what specifically to remove) rather than assuming" },
        { en: "Proceed only once the instruction is genuinely clear" },
        { en: "Report back honestly if partway through the task you realize your understanding was incomplete" },
      ],
      why: [{ en: "'Fairly sure' is not the same as certain, and a Cadet's job at this stage is to build the habit of confirming understanding, not to prove independence by guessing correctly. Asking costs a few seconds; redoing a task, or doing it to the wrong standard, costs more." }],
      commonMistakes: [
        { en: "Proceeding on assumption to avoid seeming unsure" },
        { en: "Not mentioning partway through that the instruction turned out to be less clear than expected" },
        { en: "Completing the task to a standard that was never actually confirmed" },
      ],
      safetyPoints: [{ en: "Some 'clean up' tasks involve residue or materials with real handling requirements — an unclarified instruction can turn a simple task into a safety issue." }],
      mapReferences: [],
    },
    {
      situation: { en: "During a supervised task, you notice an experienced AB skip a step that you learned in your training is supposed to be mandatory. The AB does not seem concerned, and the task is completed without incident." },
      mission: { en: "Decide how to respond to what you observed, given your position as a Cadet with no supervisory authority." },
      expectedActions: [
        { en: "Do not confront the AB directly or assume you must have misunderstood the training material" },
        { en: "Note the observation clearly and factually in your Training Record Book or personal notes" },
        { en: "Raise the question with your supervising officer (e.g. Chief Officer) at an appropriate moment, framed as a genuine question rather than an accusation" },
        { en: "Let the officer determine what, if anything, needs to be addressed" },
      ],
      why: [{ en: "A Cadet has no authority to correct a rating's practice directly, but observing a discrepancy between trained standard and actual practice is exactly the kind of learning moment the TRB exists to capture — the right response is to raise it through the proper channel, not to ignore it or act on it alone." }],
      commonMistakes: [
        { en: "Assuming the shortcut must be fine simply because an experienced person did it without consequence" },
        { en: "Saying nothing at all, losing a genuine learning opportunity" },
        { en: "Confronting the AB directly, which is outside the Cadet's role" },
      ],
      safetyPoints: [{ en: "The absence of an immediate consequence does not mean a skipped safety step was actually safe — this is precisely the kind of normalization that a fresh, trained perspective can help catch." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l6" }],
    },
    {
      situation: { en: "You are shadowing a busy OOW during a demanding watch in traffic. The OOW is moving quickly between tasks, and you are struggling to follow everything that is happening." },
      mission: { en: "Decide how to handle feeling behind without disrupting the OOW's ability to manage the situation." },
      expectedActions: [
        { en: "Do not pretend to understand more than you do" },
        { en: "Stay out of the OOW's way and avoid asking questions during the busiest moments" },
        { en: "Observe as much as you can even if you cannot follow every detail" },
        { en: "Ask your questions afterward, once the watch has calmed or ended, being specific about what you did not follow" },
      ],
      why: [{ en: "A demanding watch is not the moment for a Cadet's questions, however genuine — the OOW's full attention belongs to the situation, and a Cadet's role there is to absorb what can be absorbed and fill the gaps afterward through honest, specific questions." }],
      commonMistakes: [
        { en: "Interrupting the OOW during a busy moment with a question that could wait" },
        { en: "Pretending to have followed everything to avoid looking lost" },
        { en: "Failing to follow up afterward, letting the confusion simply pass unaddressed" },
      ],
      safetyPoints: [{ en: "A distracted OOW during a genuinely demanding watch is a real safety risk — protecting the OOW's attention during those moments is itself part of the Cadet's responsibility." }],
      mapReferences: [],
    },
  ],

  professionalTips: [
    { en: "Ask questions at the right moment, not the most convenient one — timing your question well is itself a professional skill you are building." },
    { en: "Never pretend to understand something you don't — a Cadet who admits confusion learns faster than one who hides it." },
    { en: "Every task, however small, is either done correctly and understood, or it isn't worth much — chase the understanding, not just the completion." },
    { en: "Your Training Record Book is not paperwork — it is the only record that will later prove you actually learned what you experienced." },
    { en: "Watch how experienced crew members handle the moments that don't go according to plan — that is where the real skill shows." },
    { en: "Observation is not passive — a Cadet who is genuinely watching is doing real work, even standing still." },
    { en: "The reputation you build as a Cadet follows you into your first real rank — professionalism now shapes the trust you're given later." },
    { en: "You are not expected to know yet — you are expected to want to know, and to say so honestly when you don't." },
  ],

  professionalMindset: [
    { en: "See yourself as a learner, not yet an operator. Every task assigned to you is a training opportunity first and a job second — your value at this stage is measured by what you understand, not by what you can do unsupervised." },
    { en: "Treat supervision as protection, not restriction. The close oversight you experience now exists to let you build real skill safely — it is not a lack of trust, it is exactly the structure every officer before you learned within." },
    { en: "Assume your understanding is partial until confirmed. A task that seems obvious may still hide a detail you have not yet encountered — checking your understanding is a habit, not a sign of weakness." },
    { en: "Notice the gap between what is trained and what is practiced. Real shipboard life sometimes differs from what you learned ashore — your job is to observe this honestly and raise it through the proper channel, not to silently adopt or silently reject it." },
    { en: "Hold two roles at once: contributing crew member and active learner. You are genuinely useful to the team even while you are still learning — these two things are not in tension, they happen together." },
    { en: "Recognize that today's supervised task is tomorrow's independent responsibility. Every skill you practice under guidance now is one you will eventually perform alone — learn it as if that day were close, because it is." },
    { en: "Accept that your questions serve everyone, not just you. A clarifying question asked at the right moment protects the task, the team, and your own understanding all at once." },
  ],

  professionalDocumentation: [
    { en: "Training Record Book (TRB) — The Cadet's primary and most important document, recording tasks observed and performed, competencies demonstrated, and reflections on what was learned. Unlike every other document on this ladder, the TRB exists entirely for the Cadet's own benefit — it is the official evidence of seagoing training that supports certification as an OOW." },
    { en: "Sea time and service records — The Cadet ensures their sea time is accurately recorded and confirmed by the Master or Chief Officer as required by flag State and STCW regulations, since this record directly determines eligibility for certification exams." },
    { en: "Task and competency sign-offs — Where the training programme requires a supervising officer's or rating's signature confirming a specific competency has been demonstrated, the Cadet ensures this is obtained honestly, only once the competency is genuinely understood, not simply completed once." },
    { en: "Personal notes and observations — Beyond the formal TRB, the Cadet is encouraged to keep personal notes on procedures, terminology, and situations observed, supporting deeper understanding and later exam preparation." },
    { en: "Why this matters: Every other rank's documentation exists to prove something happened correctly aboard the vessel; the Cadet's documentation exists to prove that genuine learning happened within the Cadet. A TRB completed honestly, thoroughly, and with real reflection is worth far more — both for certification and for the Cadet's actual competence later — than one filled in quickly to satisfy a requirement. The habits of honest, careful documentation built here will carry directly into the professional documentation responsibilities of every rank that follows." },
  ],

  environmentalResponsibilities: [
    { en: "Following environmental procedures under supervision — The Cadet follows all waste segregation, discharge, and pollution prevention procedures exactly as instructed, without independently deciding how a substance or waste item should be handled." },
    { en: "Observing environmental decision-making — The Cadet watches how the Bosun, OOW, or Chief Officer make environmental decisions (e.g. authorizing a discharge, handling a reported sheen) and asks questions afterward to understand the reasoning, particularly the reference to MARPOL zones and documentation." },
    { en: "Reporting anything observed — If the Cadet notices anything unusual (an unexpected discharge, an unclear waste handling practice), they report it to a supervising officer or rating immediately rather than assuming it is not their place to mention it." },
    { en: "Building environmental awareness for future responsibility — The Cadet records observations about environmental procedures and decision-making in the Training Record Book, recognizing that environmental compliance responsibility will grow substantially at every rank ahead." },
    { en: "Why this matters: The Cadet carries no independent environmental authority, but the habits of attention and honest reporting built now are exactly what will be expected, at a much higher level of responsibility, once qualified as an officer. A Cadet who learns to notice and question environmental practice early builds the foundation for the environmental governance responsibilities that await at every subsequent rank." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Ask questions of any crew member or officer to clarify an instruction or understand a procedure" },
      { en: "Report anything observed that seems unclear, unsafe, or inconsistent with training, to a supervising officer or rating" },
      { en: "Refuse to proceed with a task you do not understand or feel unprepared for, requesting clarification or demonstration first" },
      { en: "Request feedback on your performance from any supervising officer or rating" },
    ],
    youCannot: [
      { en: "Perform any task independently without a supervising officer or rating present or explicitly authorizing it" },
      { en: "Make any decision affecting the vessel's safety, navigation, cargo, or operations — every action is supervised and verified" },
      { en: "Stand an independent watch, gangway duty, or emergency station role without direct supervision" },
      { en: "Correct or discipline any crew member, regardless of what is observed — any concern is raised through a supervising officer, never acted on directly" },
      { en: "Assume that a task performed correctly once means it can now be performed unsupervised" },
      { en: "Sign off, verify, or confirm any operational readiness, safety check, or compliance matter on the vessel's behalf" },
      { en: "Represent the vessel or the company in any interaction with external parties (agents, surveyors, authorities)" },
    ],
  },

  commonMistakes: [
    { en: "Pretending to understand instead of asking — Nodding along or proceeding on a guess to avoid appearing inexperienced, rather than confirming genuine understanding." },
    { en: "Treating supervision as a formality — Going through the motions of an assigned task without engaging with why it matters or what standard it needs to meet." },
    { en: "Waiting to be taught instead of actively observing — Remaining passive during training, expecting knowledge to arrive rather than seeking it out through active attention and questions." },
    { en: "Interrupting at the wrong moment — Asking a genuine question during a busy or safety-critical moment instead of saving it for an appropriate time." },
    { en: "Filling in the Training Record Book carelessly — Completing TRB entries quickly to satisfy a requirement rather than reflecting honestly on what was actually learned." },
    { en: "Overestimating readiness after a single supervised success — Assuming a task performed correctly once under supervision means it can now be performed independently." },
    { en: "Staying silent about something inconsistent or unclear — Noticing a gap between trained standard and observed practice, or an unclear instruction, and saying nothing rather than raising it appropriately." },
    { en: "Confusing eagerness to help with readiness to act alone — Attempting to assist beyond an assigned role during a safety-critical operation, adding risk rather than value." },
  ],

  careerProgression: [
    { en: "Next role: Ordinary Seaman (OS) or, depending on the training pathway and company structure, direct progression toward Officer of the Watch certification upon completing sea time and academic requirements — the Cadet's path is defined by the specific cadetship programme and flag State requirements rather than a single universal next step." },
    { en: "Skills to develop: Consistent, hands-on seamanship competence (ropework, mooring, maintenance) to the standard expected of an AB; growing confidence in bridge watchkeeping fundamentals; the discipline of thorough, honest self-documentation that will carry into professional documentation at every future rank; increasing initiative within the bounds of what is actually authorized." },
    { en: "Recommended experience: Completion of the required sea time with genuine, varied exposure across departments and operations (not just repeated familiar tasks), a Training Record Book reflecting real engagement and reflection rather than minimal compliance, and demonstrated reliability and honesty in reporting — the qualities supervising officers remember when a Cadet is later trusted with real responsibility." },
    { en: "Certificates typically required: Requirements vary significantly by flag State, training institution, and company cadetship structure. Progression typically requires completion of approved sea time, a satisfactorily completed Training Record Book, and passing the required academic and practical examinations for the OOW certificate of competency." },
    { en: "Recommended MAP courses: All foundational Deck lessons (seamanship, navigation, safety) relevant to the cadetship syllabus; Role On Board – Able Seaman and Officer of the Watch (to preview both possible near-term paths); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving beyond Cadet means the supervision that has protected you begins to lighten, and the habits built now — asking rather than guessing, documenting honestly, observing actively — become the foundation you will rely on the first time no one is checking your work. The transition is not from learner to non-learner; it is from a learner who is watched closely to one who must watch themselves." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d1-l5", label: { en: "Compass & Headings" } },
    { kind: "lesson", lessonId: "d1-l6", label: { en: "Practical & Astronomical Navigation" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering & Helm Orders" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping Organization" } },
    { kind: "lesson", lessonId: "d6-l1", label: { en: "Ropes & Fibres" } },
    { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } },
    { kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } },
    { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
    { kind: "lesson", lessonId: "d6-l6", label: { en: "Basic Maintenance & Greasing" } },
    { kind: "lesson", lessonId: "d6-l7", label: { en: "Painting & Corrosion Prevention" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — foundational seamanship and navigation terminology" } },
    { kind: "external", externalCode: "SMCP", label: { en: "SMCP (Standard Marine Communication Phrases) reference" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on cadetship structure, sea time requirements, and OOW certification pathway by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore vessel types and basic layouts to build early familiarity" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on training requirements, TRB documentation, or basic seamanship" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Deck Cadet through to Officer of the Watch" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time and early training achievements" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_AB", label: { en: "Role On Board — Able Seaman" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_OOW", label: { en: "Role On Board — Officer of the Watch" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Assigned tasks exactly as instructed, under direct supervision, without independent judgment" },
      { en: "Training Record Book entries, honestly and promptly after each relevant activity" },
      { en: "Requests for clarification, demonstration, or feedback whenever needed" },
    ],
    iMonitor: [
      { en: "My own understanding of each task, procedure, or explanation, checking rather than assuming it is complete" },
      { en: "How experienced crew members and officers coordinate, communicate, and make decisions, as a continuous learning activity" },
      { en: "Any gap between what I was trained to expect and what I observe in actual practice" },
    ],
    iReport: [
      { en: "Task completion, honestly, including anything not fully understood" },
      { en: "Anything observed that seems unclear, unsafe, or inconsistent with training, to a supervising officer or rating" },
      { en: "My own uncertainty whenever a task or instruction is not genuinely clear" },
    ],
    iDoNotAuthorize: [
      { en: "Any independent decision affecting the vessel's safety, navigation, cargo, or operations" },
      { en: "My own progression to unsupervised task performance, without explicit confirmation from a supervising officer or rating" },
      { en: "Any correction or instruction directed at another crew member, regardless of what is observed" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Cadetship training pathway showing sea time milestones toward OOW certification." } },
    { kind: "image", caption: { en: "Example of a completed Training Record Book (TRB) entry." } },
    { kind: "diagram", caption: { en: "Deck department organization chart showing the Cadet's position and reporting lines." } },
    { kind: "video", caption: { en: "Demonstration of a well-conducted supervised task (e.g. mooring line inspection with an AB)." } },
    { kind: "document", caption: { en: "Sample sea time / service record confirmation form." } },
  ],
};

// ── ORDINARY SEAMAN ───────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-28_role-on-board-os-mapreferences.md) and the
// Product Owner's final decisions on that report. All lessonId used are
// foundation-level lessons whose targetRanks explicitly include "os".
// Locations with no validated correspondence are left as
// mapReferences: [] intentionally (all 3 practical scenarios, and
// several behavioral/meta skills — instruction-following, technique
// building through repetition, honest self-reporting, professional
// conduct — that no existing lesson content covers).
const OS_CARD: RoleOnBoardCard = {
  rankId: "os",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Ordinary Seaman (OS) is a rating in active training toward Able Seaman qualification, performing real deck tasks under closer supervision than an AB, while building the sea time, competence, and confidence required for full unsupervised responsibility. Unlike the Deck Cadet, whose primary role is observation and academic certification, the OS is a working member of the deck team from day one — but unlike the AB, the OS is not yet trusted to judge independently when a situation departs from the routine." },
    { en: "The OS executes assigned tasks (mooring assistance, rope work, watchkeeping support, basic maintenance) under the direct guidance of the Bosun or an assigned AB, with supervision focused on technique, safety, and building genuine competence rather than simply completing the task." },
    { en: "The OS's progression toward AB is measured by demonstrated reliability across a widening range of tasks — the supervising Bosun or AB gradually extends the OS's scope as trust in their judgment and technique grows, rather than through a fixed timeline alone." },
    { en: "The OS works most closely with the Bosun and ABs, who directly train and correct their technique day to day, and increasingly stands basic watch duties (lookout, steering under supervision) as competence is demonstrated." },
    { en: "Where the AB is trusted to execute a task correctly and flag anything unusual, the OS is still building that judgment — an OS's role is to execute precisely what is instructed, ask when uncertain, and let the supervising AB or Bosun catch what the OS cannot yet be expected to catch alone." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Bosun (day-to-day task supervision and training)" },
      { en: "OOW (during watch duties)" },
    ],
    worksWith: [
      { en: "AB, from whom the OS learns technique and judgment directly on a daily basis" },
      { en: "Deck Cadets, with whom the OS may share some training activities" },
    ],
    mentors: [
      { en: "The Bosun and experienced ABs, who directly train and correct the OS's technique and judgment" },
    ],
    supports: [
      { en: "The OS does not yet supervise anyone, but may assist a Deck Cadet with basic technique under an AB's or the Bosun's oversight" },
    ],
  },

  professionalSkills: [
    { label: { en: "Basic seamanship execution (ropework, mooring, anchoring assistance) under supervision" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l1" }, { kind: "lesson", lessonId: "d6-l2" }, { kind: "lesson", lessonId: "d6-l3" }, { kind: "lesson", lessonId: "d6-l4" }] },
    { label: { en: "Following instructions precisely and asking when uncertain" } },
    { label: { en: "Basic watchkeeping support (lookout, supervised steering)" }, mapReferences: [{ kind: "lesson", lessonId: "d1-l9" }, { kind: "lesson", lessonId: "d1-l10" }] },
    { label: { en: "Building technique and judgment through repetition and feedback" } },
    { label: { en: "Basic safety awareness and PPE compliance" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }] },
    { label: { en: "Deck maintenance and painting under guidance" }, mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }] },
    { label: { en: "Honest self-assessment and reporting of task completion" } },
    { label: { en: "Professional conduct and reliability within the deck team" } },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the OS carries out assigned preparation tasks directly — mooring line handling, deck equipment checks, basic rigging — under the supervision of the Bosun or an assigned AB, who verifies the work rather than performing it. Unlike the Deck Cadet, who mainly observes this phase, the OS is genuinely executing real tasks; unlike the AB, the OS's work is checked closely rather than trusted on sight." },
      responsibilities: [
        { en: "Carry out assigned pre-departure tasks (mooring line preparation, fender rigging, deck walk-round assistance) to the standard demonstrated by the supervising AB or Bosun" },
        { en: "Report task completion clearly and honestly, flagging anything uncertain rather than assuming it is fine" },
        { en: "Ask for clarification or a demonstration before attempting an unfamiliar task or technique" },
        { en: "Follow all PPE and safety requirements exactly as instructed" },
        { en: "Accept correction from the supervising AB or Bosun as part of building competence, adjusting technique accordingly" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Mooring lines, fenders, basic deck equipment, used under supervision" },
        { en: "Departure checklist / work list, as directed by the Bosun" },
      ],
      risks: [
        { en: "Attempting an unfamiliar task without asking for guidance, risking incorrect execution" },
        { en: "Reporting a task as complete without genuinely confirming it meets the expected standard" },
        { en: "Reacting defensively to correction rather than using it to improve technique" },
        { en: "Working carelessly under time pressure, missing a step that a supervisor would have caught" },
      ],
      bestPractices: [
        { en: "Ask for a demonstration before attempting an unfamiliar task, even under time pressure" },
        { en: "Report honestly on task completion, including anything not fully confident about" },
        { en: "Treat correction from the Bosun or an AB as direct, valuable training, not criticism" },
        { en: "Work at a pace that allows genuine attention to the task, not just speed" },
      ],
      commonMistakes: [
        { en: "Guessing at an unfamiliar task rather than asking" },
        { en: "Overstating confidence in completed work to avoid seeming inexperienced" },
        { en: "Taking correction personally rather than using it to improve" },
        { en: "Rushing a task to the point of missing a step" },
      ],
      professionalTips: [
        { en: "Every task you're checked on now is a task you'll be trusted with alone soon — use the supervision while you have it" },
        { en: "Being corrected is not a setback in your training — it's the training working as intended" },
        { en: "The AB you work under today learned exactly the same way you are now" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the OS is assigned to a mooring station under the direct supervision of the Bosun or an assigned AB, executing line-handling tasks as instructed while being watched closely for technique and safety. Unlike the AB, who is trusted to handle the station's full sequence independently, the OS carries out specific, assigned actions within the sequence, with the supervising AB or Bosun coordinating the overall station." },
      responsibilities: [
        { en: "Execute assigned line-handling tasks (letting go, tending, heaving) exactly as instructed by the supervising AB or Bosun" },
        { en: "Maintain awareness of snap-back zones and other hazards at all times, applying training rather than relying solely on being told" },
        { en: "Report completion of an assigned action immediately and clearly, so the station's coordination is not delayed" },
        { en: "Ask for clarification if an instruction is unclear, rather than guessing during an active manoeuvre" },
        { en: "Follow PPE and safety requirements exactly, with no exceptions during active operations" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Mooring lines, wires, winches — operated under supervision" },
        { en: "Portable radio, if assigned for communication within the station" },
      ],
      risks: [
        { en: "Misjudging a hazard (snap-back zone, line under tension) due to still-developing experience" },
        { en: "Executing an action slightly differently from what was instructed, disrupting the station's coordination" },
        { en: "Hesitating or freezing when uncertain, rather than asking for immediate clarification" },
        { en: "Losing focus during a routine-seeming manoeuvre, missing an early sign of a developing issue" },
      ],
      bestPractices: [
        { en: "Apply hazard awareness training actively, not only when specifically reminded" },
        { en: "Execute exactly what is instructed — if something seems different from what you expected, ask rather than adjusting on your own" },
        { en: "Communicate task completion clearly and promptly, in the terms used by the rest of the team" },
        { en: "Stay mentally engaged even during a routine, well-practiced manoeuvre" },
      ],
      commonMistakes: [
        { en: "Underestimating a hazard because the manoeuvre feels routine" },
        { en: "Adjusting an instruction based on personal judgment rather than confirming first" },
        { en: "Staying silent when uncertain instead of asking immediately" },
        { en: "Losing attention during a manoeuvre that has gone smoothly so far" },
      ],
      professionalTips: [
        { en: "The hazards at a mooring station don't become less real just because the manoeuvre is routine — stay alert every time" },
        { en: "If an instruction seems off, say so immediately — a moment's clarification is always faster than fixing a mistake" },
        { en: "The technique you build now, under close supervision, is what will let you run a station independently as an AB" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4" }],
    },

    navigation: {
      overview: { en: "During navigation, the OS begins standing basic watch duties — lookout and, as competence is demonstrated, supervised steering — under the direct oversight of the OOW. Unlike the Deck Cadet, who mainly observes the watch, the OS is genuinely performing watch functions; unlike the AB, the OS's lookout and steering are more closely monitored, and the OS is not yet expected to independently judge the significance of what is observed." },
      responsibilities: [
        { en: "Maintain an attentive, continuous lookout as assigned, reporting anything observed to the OOW immediately, without first deciding whether it matters" },
        { en: "Execute steering orders precisely as given, repeating them back exactly as trained, once assigned to the wheel under supervision" },
        { en: "Ask the OOW to clarify an order or observation that is not fully understood, rather than guessing" },
        { en: "Report any difficulty maintaining focus or any personal limitation (fatigue, discomfort) honestly, rather than pushing through silently" },
        { en: "Follow bridge communication discipline exactly as demonstrated, including standard phrases and reporting formats" },
      ],
      equipment: [
        { en: "Binoculars, as assigned for lookout duty" },
        { en: "Helm, under direct OOW supervision" },
        { en: "Bridge communication equipment, as instructed" },
      ],
      risks: [
        { en: "Filtering observations before reporting them, deciding something is 'probably nothing' rather than letting the OOW judge its significance" },
        { en: "Executing a steering order slightly incorrectly due to inexperience, without immediately flagging the uncertainty" },
        { en: "Losing concentration during a long or uneventful watch period" },
        { en: "Hesitating to report personal fatigue or difficulty out of concern it reflects poorly" },
      ],
      bestPractices: [
        { en: "Report every observation to the OOW, however minor it seems — judging significance is the OOW's role, not yet the OS's" },
        { en: "Repeat every steering order back exactly, and confirm execution clearly" },
        { en: "Ask for clarification immediately if an order or explanation is not understood" },
        { en: "Be honest about fatigue or difficulty maintaining focus — this protects the watch, not just yourself" },
      ],
      commonMistakes: [
        { en: "Deciding an observation is not worth reporting rather than letting the OOW assess it" },
        { en: "Executing a steering order with uncertainty rather than confirming it first" },
        { en: "Disengaging mentally during a quiet watch instead of maintaining active attention" },
        { en: "Staying silent about fatigue or difficulty to avoid seeming inexperienced" },
      ],
      professionalTips: [
        { en: "Report everything you see — the OOW would always rather hear about something unimportant than miss something that mattered" },
        { en: "Precision in repeating and executing an order matters more than speed — get it exactly right, every time" },
        { en: "The watch discipline you build now as an OS is the same discipline that will define you as an AB and, eventually, as an officer" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d1-l9" }, { kind: "lesson", lessonId: "d1-l10" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the OS works at the forecastle under the direct supervision of the Bosun or an assigned AB, assisting with the windlass and chain while being closely monitored for technique and hazard awareness. Unlike the AB, who is trusted to judge chain tendency and load independently, the OS executes assigned actions and reports observations directly to the supervising AB or Bosun, who interprets and consolidates them for the bridge." },
      responsibilities: [
        { en: "Assist with windlass operation and chain handling exactly as instructed by the supervising AB or Bosun" },
        { en: "Report chain observations (amount out, visible tendency) directly and factually to the supervising AB or Bosun, without interpreting their significance" },
        { en: "Maintain constant hazard awareness around the windlass and moving chain, applying training actively rather than needing repeated reminders" },
        { en: "Ask for clarification before attempting an unfamiliar action at the forecastle" },
        { en: "Follow PPE and safety requirements exactly, with particular attention to the windlass and chain" },
      ],
      equipment: [
        { en: "Personal protective equipment (safety helmet, gloves, safety shoes, high-visibility vest)" },
        { en: "Windlass and anchor chain, operated under direct supervision" },
        { en: "Portable radio, if assigned for forecastle communication" },
      ],
      risks: [
        { en: "Misjudging the hazard posed by moving chain or the windlass due to still-developing experience" },
        { en: "Interpreting a chain observation instead of reporting it factually, potentially distorting the information reaching the Bosun or AB" },
        { en: "Standing in an unsafe position out of habit or inattention rather than active awareness" },
        { en: "Hesitating to report an observation because it seems minor or uncertain" },
      ],
      bestPractices: [
        { en: "Report chain observations factually and immediately — let the supervising AB or Bosun interpret what they mean" },
        { en: "Treat hazard awareness at the forecastle as continuous, not something to remember only when reminded" },
        { en: "Ask before attempting anything unfamiliar with the windlass or chain" },
        { en: "Stay in the position assigned by the supervising AB or Bosun, adjusting only when instructed" },
      ],
      commonMistakes: [
        { en: "Deciding a chain observation is not significant before reporting it" },
        { en: "Relaxing hazard awareness once the anchor is let go, assuming the highest-risk moment has passed" },
        { en: "Standing closer to moving equipment than instructed out of familiarity" },
        { en: "Guessing at an unfamiliar windlass action rather than asking" },
      ],
      professionalTips: [
        { en: "Report what you see, not what you think it means — that judgment call belongs to the AB or Bosun for now" },
        { en: "The chain and windlass deserve the same respect on your hundredth anchoring as on your first" },
        { en: "Precision in your reports at the forecastle is what earns you the trust to interpret them yourself, later, as an AB" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l3" }],
    },

    port_operations: {
      overview: { en: "While alongside, the OS carries out assigned port duties — gangway watch support, mooring line monitoring, cargo-related deck assistance — under the supervision of the Bosun or an assigned AB, with less independent decision-making than an AB but more genuine responsibility than a Cadet. Port stays offer the OS repeated, varied practice across many of the tasks that will define their work as an AB." },
      responsibilities: [
        { en: "Stand gangway watch alongside a supervising rating or officer, following access control procedures exactly and escalating any uncertain situation immediately rather than deciding alone" },
        { en: "Assist with mooring line monitoring and adjustment as instructed, reporting any change in tension or condition to the supervising AB or Bosun" },
        { en: "Carry out assigned cargo-related deck tasks under direct supervision, without independently judging safety or sequencing" },
        { en: "Ask for clarification on any port procedure or documentation task not fully understood" },
        { en: "Follow PPE and safety requirements exactly, particularly around cargo operations and access control" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Access control log / gangway watch materials, as directed" },
        { en: "Mooring lines, monitored under supervision" },
      ],
      risks: [
        { en: "Making an independent decision at the gangway about an uncertain visitor situation, rather than escalating immediately" },
        { en: "Missing a gradual change in mooring line tension due to inexperience or divided attention" },
        { en: "Attempting a cargo-related task beyond current competence without asking first" },
        { en: "Losing track of the variety of activity happening simultaneously in port, focusing narrowly on one task" },
      ],
      bestPractices: [
        { en: "Escalate any uncertain gangway situation immediately — this is never a decision to make alone at this stage" },
        { en: "Check mooring line condition attentively and regularly, not only when specifically told to" },
        { en: "Ask before attempting an unfamiliar cargo-related task, however routine it may look" },
        { en: "Stay aware of the broader port activity around your assigned task, not just the task itself" },
      ],
      commonMistakes: [
        { en: "Deciding a gangway situation is minor enough to handle alone" },
        { en: "Assuming mooring lines are fine without actively checking them" },
        { en: "Attempting a cargo task without confirming the correct technique first" },
        { en: "Focusing so narrowly on one task that broader port activity goes unnoticed" },
      ],
      professionalTips: [
        { en: "At the gangway, when in doubt, escalate — every experienced rating started exactly where you are now" },
        { en: "Port stays are some of the best training opportunities you'll get — pay attention to everything, not just what you're assigned" },
        { en: "The habits of asking and escalating you build now are what will make you a reliable AB later, not a limitation you'll eventually outgrow" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d4-l2" }, { kind: "lesson", lessonId: "d6-l4" }],
    },

    ship_to_ship_operations: {
      overview: { en: "STS operations are demanding for every rank aboard, and for the OS this phase is strictly limited to closely supervised, well-defined tasks — assisting with fender or mooring rigging under the direct oversight of the Bosun or an assigned AB, positioned well clear of the interface between the two vessels. The OS's role here is deliberately narrow, given the elevated risk of the operation and the OS's still-developing experience." },
      responsibilities: [
        { en: "Carry out assigned rigging or monitoring tasks exactly as instructed by the supervising AB or Bosun, without independently expanding the assigned role" },
        { en: "Remain in the exact position assigned, well clear of the space between the two vessels at all times" },
        { en: "Report any observation (fender condition, mooring load, unusual movement) directly and factually to the supervising AB or Bosun" },
        { en: "Ask for clarification before attempting any unfamiliar action related to the operation" },
        { en: "Follow PPE and safety requirements exactly, including flotation aid where required" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed, including flotation aid where required" },
        { en: "Fenders and mooring lines, handled under direct supervision" },
      ],
      risks: [
        { en: "Underestimating the danger of the space between the two vessels due to inexperience" },
        { en: "Reporting an observation with a personal interpretation rather than the plain fact observed" },
        { en: "Drifting from the assigned position, even slightly, during a long or repetitive phase of the operation" },
        { en: "Hesitating to report a minor change, uncertain whether it is worth mentioning" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned throughout the operation, regardless of how calm it appears" },
        { en: "Report observations factually and immediately — let the supervising AB or Bosun assess their significance" },
        { en: "Ask before attempting anything not explicitly assigned, however capable you may feel" },
        { en: "Treat every STS operation with the same level of attention, regardless of how many you have done" },
      ],
      commonMistakes: [
        { en: "Moving closer to the interface between the vessels out of curiosity or to get a better view" },
        { en: "Deciding an observation is too minor to mention" },
        { en: "Assuming familiarity with a task after only one or two supervised attempts" },
        { en: "Losing attentiveness during a long or uneventful phase of the operation" },
      ],
      professionalTips: [
        { en: "STS operations are exactly where the gap between 'supervised' and 'independent' matters most — respect the boundary of your assigned role" },
        { en: "Your job here is to be a reliable set of eyes and hands within a narrow, well-defined task — that narrowness is intentional, not a limitation" },
        { en: "The AB or Bosun supervising you is watching how carefully you follow instructions here — it shapes how much independence you're given next time" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l4" }],
    },

    maintenance: {
      overview: { en: "Maintenance is where the OS gets substantial hands-on practice, working directly alongside the Bosun and ABs on real deck maintenance tasks — chipping, painting, greasing, rope work — with growing independence as technique and reliability are demonstrated. This phase offers some of the clearest, most frequent opportunities for the OS to close the gap toward AB-level competence." },
      responsibilities: [
        { en: "Carry out assigned maintenance tasks to the technique demonstrated by the supervising AB or Bosun, asking for a demonstration before attempting anything unfamiliar" },
        { en: "Report task progress and completion honestly, including any part not confidently understood or executed" },
        { en: "Accept inspection and correction of completed work as a normal, expected part of the task, not a sign of failure" },
        { en: "Follow product, tool, and PPE requirements exactly as instructed for each specific task" },
        { en: "Take on progressively more complex maintenance tasks as the supervising AB or Bosun extends trust, without requesting more responsibility than has been offered" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task" },
        { en: "Maintenance tools and materials, used under supervision that decreases as competence is demonstrated" },
        { en: "Product specifications as directed by the Bosun or PMS" },
      ],
      risks: [
        { en: "Attempting a technique without a proper demonstration, risking poor-quality work or injury" },
        { en: "Overstating confidence in a task to avoid seeming inexperienced, leading to substandard or unsafe execution" },
        { en: "Using the wrong product or technique due to insufficient supervision or unclear instruction" },
        { en: "Becoming frustrated by close supervision rather than recognizing it as the path to greater independence" },
      ],
      bestPractices: [
        { en: "Ask for a demonstration before attempting any unfamiliar maintenance task or technique" },
        { en: "Report your confidence level honestly for each task — supervision is calibrated to what you actually know, not what you claim to know" },
        { en: "Welcome inspection of your work as feedback that improves your technique, not as a judgment of your worth" },
        { en: "Use each maintenance task to build genuine skill, since these are exactly the competencies expected of an AB" },
      ],
      commonMistakes: [
        { en: "Attempting an unfamiliar technique without asking for a demonstration" },
        { en: "Claiming more confidence in a task than is genuinely felt" },
        { en: "Rushing through inspection or correction instead of absorbing the feedback" },
        { en: "Resenting close supervision instead of using it to build toward independence" },
      ],
      professionalTips: [
        { en: "There's no benefit to pretending you already know a technique — every AB you work under once stood exactly where you are" },
        { en: "The maintenance skills you build now, carefully and correctly, are what will let you work independently and safely as an AB" },
        { en: "How you respond to correction says more about your future as a seafarer than how quickly you complete a task" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "d6-l6" }, { kind: "lesson", lessonId: "d6-l7" }, { kind: "lesson", lessonId: "d6-l1" }, { kind: "lesson", lessonId: "d6-l2" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the OS proceeds to an assigned muster station and carries out real tasks as part of the emergency team, under the direct instruction of the officer or rating in charge — a genuine operational role, not just observation, but still closely directed rather than independently judged. The OS's contribution during a drill or real emergency is measured by how precisely instructions are followed and how reliably the OS performs an assigned function under pressure." },
      responsibilities: [
        { en: "Proceed immediately to the assigned muster station upon hearing the alarm, exactly as required by the muster list" },
        { en: "Carry out the specific task assigned by the officer or rating in charge of the station (e.g. handling equipment, assisting with a task) precisely as instructed" },
        { en: "Report task completion or any difficulty immediately and clearly to the station leader" },
        { en: "Ask for clarification if an instruction during a drill is not understood, rather than guessing" },
        { en: "Take every drill with full seriousness, treating it as genuine practice for the emergency response expected of an AB" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list" },
        { en: "Emergency equipment specific to the assigned station, used under direct supervision" },
      ],
      risks: [
        { en: "Hesitating or improvising when an instruction is unclear, rather than asking immediately" },
        { en: "Treating a drill as less serious than a genuine emergency, reducing its training value" },
        { en: "Losing focus on the assigned task while trying to observe the broader response" },
        { en: "Reporting task completion inaccurately under pressure, rather than confirming it is genuinely done" },
      ],
      bestPractices: [
        { en: "Execute the assigned task precisely, and confirm completion clearly to the station leader" },
        { en: "Ask immediately if an instruction is unclear — hesitation costs more time than a quick question" },
        { en: "Treat every drill exactly as you would a genuine emergency, building the habits that will matter when it counts" },
        { en: "Stay focused on your assigned task first, understanding the broader response through the post-drill debrief" },
      ],
      commonMistakes: [
        { en: "Guessing at an unclear instruction instead of asking immediately" },
        { en: "Going through the motions of a drill without full engagement" },
        { en: "Becoming distracted by the wider situation instead of completing the assigned task" },
        { en: "Reporting a task as done before genuinely confirming it" },
      ],
      professionalTips: [
        { en: "In an emergency, precision and speed both matter — but precision comes first, because a fast mistake is still a mistake" },
        { en: "The habits you build in every drill are the habits that will actually show up in a real emergency — there is no separate 'serious mode'" },
        { en: "Being reliably instructable under pressure is exactly what earns you more independent responsibility during the next drill" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l2" }, { kind: "lesson", lessonId: "s6-l1" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "You are assigned to grease a winch, a task you have done successfully several times before. This time, the fitting looks slightly different from what you remember, and you're not entirely sure the grease gun connects the same way." },
      mission: { en: "Decide whether to proceed based on your prior experience or check first." },
      expectedActions: [
        { en: "Do not proceed based on assumed familiarity when something looks different from what you remember" },
        { en: "Ask the supervising AB or Bosun to confirm before proceeding" },
        { en: "Explain specifically what looks different, rather than a vague 'I'm not sure'" },
        { en: "Proceed only once the difference is explained or resolved" },
      ],
      why: [{ en: "Prior success with a similar task is not the same as certainty about this specific one — the moment something looks different is exactly the moment an OS should check, not push through on memory of how it usually goes." }],
      commonMistakes: [
        { en: "Proceeding anyway because the task feels familiar overall" },
        { en: "Assuming the difference is unimportant without asking" },
        { en: "Forcing a fitting that doesn't feel quite right rather than stopping to check" },
      ],
      safetyPoints: [{ en: "Equipment that looks slightly different may have a different specification or condition — forcing an unfamiliar fitting risks both the equipment and personal injury." }],
      mapReferences: [],
    },
    {
      situation: { en: "An AB corrects your knot technique in front of another crew member, in a tone that feels more critical than helpful. The correction itself seems accurate." },
      mission: { en: "Decide how to respond, given that the correction is useful but the delivery felt uncomfortable." },
      expectedActions: [
        { en: "Separate the content of the correction from how it was delivered" },
        { en: "Accept and apply the technical correction, since it is accurate" },
        { en: "Avoid responding defensively or visibly resentful, even if the moment felt uncomfortable" },
        { en: "If the pattern of harsh delivery continues and genuinely affects your ability to learn, raise it privately with the Bosun rather than reacting in the moment" },
      ],
      why: [{ en: "An OS's job is to build competence as efficiently as possible, and rejecting accurate feedback because of how it was delivered slows that progress — the correction's value doesn't depend on its tone, even when the tone could have been better." }],
      commonMistakes: [
        { en: "Becoming defensive or dismissive because of how the correction felt" },
        { en: "Letting one uncomfortable moment affect willingness to accept future feedback" },
        { en: "Escalating the tone issue immediately rather than absorbing the technical point first" },
      ],
      safetyPoints: [],
      mapReferences: [],
    },
    {
      situation: { en: "During a busy maintenance period, an AB working nearby asks you to quickly help with something outside what the Bosun originally assigned you — nothing dangerous, just outside your current task." },
      mission: { en: "Decide whether to help immediately or check with your supervising Bosun first." },
      expectedActions: [
        { en: "Briefly confirm with the AB whether this replaces or adds to your assigned task" },
        { en: "If there's any doubt about priority or whether the Bosun should know, mention it — a quick word is enough, not a formal request" },
        { en: "Help if it's clearly minor and within your competence, but stay aware of your original assigned task once done" },
        { en: "If genuinely unsure, ask rather than simply assuming it's fine" },
      ],
      why: [{ en: "An OS is still building the judgment to weigh competing instructions from different people — a quick check protects against confusion or an assigned task being quietly dropped, without requiring the OS to treat every small request as a major decision." }],
      commonMistakes: [
        { en: "Dropping the assigned task without a word to anyone" },
        { en: "Refusing to help at all out of rigid adherence to the original assignment" },
        { en: "Helping without any communication, leaving the Bosun unaware of where their assigned task stands" },
      ],
      safetyPoints: [],
      mapReferences: [],
    },
  ],

  professionalTips: [
    { en: "Report what you observe, not what you assume it means — that judgment call still belongs to the AB, Bosun, or OOW supervising you." },
    { en: "When something looks even slightly different from what you expected, that's the moment to check, not to rely on memory." },
    { en: "Correction is not criticism of your worth — it's the fastest path to becoming the AB you're training to be." },
    { en: "Ask before you assume, especially when instructions from different people seem to overlap or conflict." },
    { en: "The supervision you have now won't last forever — use it deliberately, while it's there, to build habits that will hold up without it." },
    { en: "Precision matters more than speed at this stage — a fast, careless action teaches you less than a slow, correct one." },
    { en: "Every task you're trusted with a little more independence on is a task you earned trust on before — reliability compounds." },
    { en: "Being an OS is not about proving you're ready for more responsibility — it's about actually becoming ready, one demonstrated task at a time." },
  ],

  professionalMindset: [
    { en: "See yourself as building toward independence, not yet possessing it. Every task you execute is real work, but the judgment behind it still belongs to whoever supervises you — your role is to execute precisely and flag what you notice, not to decide what matters." },
    { en: "Treat close supervision as the mechanism of your progress, not a ceiling on it. The scope of what you're trusted with grows exactly as fast as your demonstrated reliability — supervision is not a fixed limitation, it is a responsive one." },
    { en: "Assume familiarity is not the same as certainty. A task you've done successfully before can still hide a detail worth checking — the habit of verifying, even when confident, is what will make you a trustworthy AB." },
    { en: "Separate the accuracy of feedback from the way it was delivered. A correction can be worth applying even when it didn't feel good to receive — your job is to extract the useful part, not to judge the tone." },
    { en: "Recognize that reporting factually, without interpreting, is itself a skill. Passing along exactly what you observed — not what you think it means — gives your supervisor a cleaner picture than a filtered or pre-judged one." },
    { en: "Hold competing instructions as something to clarify, not something to silently resolve alone. When two people ask different things of you, a quick check protects everyone's plan — it is not a sign you can't manage the situation." },
    { en: "Accept that trust is built specifically, not generally. Being trusted with one task doesn't automatically extend to another — each new piece of responsibility is usually earned on its own terms." },
  ],

  professionalDocumentation: [
    { en: "Sea time and service records — The OS's sea time is recorded and confirmed as required by flag State regulations, directly supporting eventual eligibility for AB certification — accuracy here matters as much as it does for a Cadet's TRB, even though the OS's daily work looks more like an AB's." },
    { en: "Task completion reporting — When the OS reports a task as complete to the supervising Bosun or AB, this report is often taken at face value for routine matters — making honest, accurate reporting a genuine professional responsibility, not just good practice." },
    { en: "Maintenance and defect observations — When the OS notices something during a task (a developing defect, an unusual condition), reporting it clearly and factually to the Bosun or AB contributes directly to the department's maintenance records, even though the OS does not maintain those records personally." },
    { en: "Training and competency progress — Where the company or training pathway tracks the OS's demonstrated competencies toward AB qualification, the OS ensures this record is accurate and genuinely reflects tasks performed and supervision received, rather than tasks merely attempted." },
    { en: "Why this matters: The OS's documentation responsibility sits between the Cadet's (proving learning happened) and the AB's (a trusted, independent account of work performed): the OS's reports are increasingly relied upon at face value, even while the work itself remains supervised. Building the habit of accurate, honest reporting now — about tasks completed, competencies genuinely demonstrated, and things noticed but not yet understood — is what will make the OS's future reports as an AB something the whole department can trust without double-checking." },
  ],

  environmentalResponsibilities: [
    { en: "Following environmental procedures in real tasks — The OS applies waste segregation, product handling, and pollution prevention procedures exactly as instructed during maintenance, mooring, and deck tasks — this is not observation, it is genuine practice that the OS will rely on independently as an AB." },
    { en: "Reporting anything unusual immediately — If the OS notices an unexpected discharge, spill, or unclear waste handling situation during a task, they report it to the supervising AB or Bosun immediately, rather than deciding independently whether it is significant enough to mention." },
    { en: "Correct product and material handling — The OS follows instructions precisely regarding which products, materials, and disposal methods apply to a given task, asking for clarification rather than assuming when uncertain." },
    { en: "Building environmental discipline through repetition — Each task where environmental procedure is followed correctly under supervision builds the habit that will define the OS's independent practice as an AB, where verification will no longer be automatic." },
    { en: "Why this matters: The OS's environmental responsibility is no longer just about noticing and learning, as it was for the Cadet — it is about correctly executing real environmental procedures in real tasks, with the safety net of supervision still in place. The habits built now, particularly around reporting anything unusual immediately rather than filtering it, are exactly what will protect the vessel's environmental compliance once that supervision naturally decreases." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Execute assigned tasks within your demonstrated competence, under the supervision of the Bosun or an assigned AB" },
      { en: "Ask any crew member or officer to clarify an instruction or demonstrate a technique" },
      { en: "Report anything observed that seems unclear, unsafe, or worth mentioning, to your supervising AB, Bosun, or officer" },
      { en: "Refuse to proceed with a task you do not understand or feel unprepared for, requesting clarification first" },
      { en: "Escalate a gangway or access situation immediately if uncertain, rather than deciding alone" },
      { en: "Request feedback on your performance from your supervising AB or Bosun" },
    ],
    youCannot: [
      { en: "Perform a task independently without supervision, unless explicitly authorized by the Bosun or supervising AB for that specific task" },
      { en: "Interpret or judge the significance of an observation on the vessel's behalf — report it factually and let the supervising AB, Bosun, or OOW assess it" },
      { en: "Make an independent decision at the gangway or regarding access control" },
      { en: "Stand an independent watch, gangway duty, or emergency station role without direct supervision" },
      { en: "Correct or discipline another crew member, regardless of what is observed" },
      { en: "Sign off, verify, or confirm any operational readiness, safety check, or compliance matter on the vessel's behalf" },
      { en: "Represent the vessel or the company in any interaction with external parties (agents, surveyors, authorities)" },
    ],
  },

  commonMistakes: [
    { en: "Relying on memory instead of verifying — Assuming a task is understood because it resembles one done before, without checking whether this specific instance is genuinely the same." },
    { en: "Filtering observations before reporting — Deciding something is 'probably not worth mentioning' instead of reporting it factually and letting the supervising AB, Bosun, or OOW judge its significance." },
    { en: "Overstating confidence to avoid seeming inexperienced — Claiming to understand or be ready for a task rather than honestly flagging uncertainty, risking a poorly executed or unsafe outcome." },
    { en: "Taking correction personally rather than practically — Reacting defensively to feedback instead of separating its accuracy from how it felt to receive." },
    { en: "Silently resolving competing instructions — Choosing between two different requests from different people without a quick check, risking confusion or a dropped task." },
    { en: "Mistaking one success for readiness — Assuming that performing a task correctly once under supervision means it can now be performed independently." },
    { en: "Losing engagement during routine or quiet moments — Treating a repetitive task or an uneventful watch period as a time to disengage rather than to keep building attentiveness and technique." },
    { en: "Escalating too slowly or not at all — Hesitating to report an uncertain situation (a gangway concern, an unclear instruction, a possible hazard) out of concern about seeming unsure." },
  ],

  careerProgression: [
    { en: "Next role: Able Seaman (AB) — the next step in the deck rating progression, marking the transition from supervised task execution to trusted, independent responsibility for a full range of deck duties without close oversight." },
    { en: "Skills to develop: Consistent, reliable technique across the full range of basic seamanship tasks (ropework, mooring, anchoring, maintenance) without requiring correction; the judgment to recognize when a situation departs from the routine and to act or escalate appropriately; independent watchkeeping competence (lookout, steering) to the standard expected without direct oversight; the confidence to make sound decisions within a defined scope, rather than deferring every judgment call upward." },
    { en: "Recommended experience: A demonstrated track record across a wide range of tasks and conditions — not just repeated familiar ones — with consistent reliability, honest reporting, and a visible pattern of the supervising Bosun or AB extending trust and independence over time; sufficient sea time and watchkeeping experience as required for AB certification." },
    { en: "Certificates typically required: Requirements vary by flag State and company policy. Progression to AB typically requires the corresponding STCW certificate of competency (Able Seafarer Deck), a minimum period of qualifying sea service, and completion of any required practical and safety training." },
    { en: "Recommended MAP courses: All foundational Deck lessons relevant to AB competency (advanced seamanship, watchkeeping, safety); Role On Board – Able Seaman (to preview the next step in detail); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving from OS to AB means the supervision that has shaped your technique begins to step back, and the judgment you've only practiced under guidance becomes something you exercise on your own. The transition is not about knowing more than you did as an OS — it is about being trusted to act on what you already know, and to recognize, without being told, when a situation calls for more than routine execution." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "d1-l5", label: { en: "Compass & Headings" } },
    { kind: "lesson", lessonId: "d1-l6", label: { en: "Practical & Astronomical Navigation" } },
    { kind: "lesson", lessonId: "d1-l9", label: { en: "Steering & Helm Orders" } },
    { kind: "lesson", lessonId: "d1-l10", label: { en: "Watchkeeping Organization" } },
    { kind: "lesson", lessonId: "d6-l1", label: { en: "Ropes & Fibres" } },
    { kind: "lesson", lessonId: "d6-l2", label: { en: "Knots & Splices" } },
    { kind: "lesson", lessonId: "d6-l3", label: { en: "Anchoring & Anchor Types" } },
    { kind: "lesson", lessonId: "d6-l4", label: { en: "Mooring Operations" } },
    { kind: "lesson", lessonId: "d6-l6", label: { en: "Basic Maintenance & Greasing" } },
    { kind: "lesson", lessonId: "d6-l7", label: { en: "Painting & Corrosion Prevention" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "lesson", lessonId: "d4-l2", label: { en: "Port & VTS Communications" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — foundational seamanship and navigation terminology" } },
    { kind: "external", externalCode: "SMCP", label: { en: "SMCP (Standard Marine Communication Phrases) reference" } },
    { kind: "external", externalCode: "COLREG", label: { en: "COLREG reference" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on AB certification requirements and qualifying sea service by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore vessel types and basic layouts to build familiarity across different ships" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on task technique, certification requirements, or basic seamanship" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Ordinary Seaman through to Able Seaman and beyond" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time and demonstrated competencies" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_DECK_CADET", label: { en: "Role On Board — Deck Cadet" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_AB", label: { en: "Role On Board — Able Seaman" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Assigned deck tasks (ropework, mooring, maintenance) to the technique demonstrated, under supervision that decreases as competence is shown" },
      { en: "Basic watchkeeping duties (lookout, supervised steering) as assigned" },
      { en: "Task completion reports, honestly and promptly" },
    ],
    iMonitor: [
      { en: "My own technique and understanding against what has been demonstrated, checking rather than assuming" },
      { en: "Hazards directly relevant to my assigned task (moving equipment, snap-back zones, chain, cargo areas)" },
      { en: "Any change or difference from what was expected in a task I've done before" },
    ],
    iReport: [
      { en: "Task completion or difficulty, honestly and without overstating confidence" },
      { en: "Any observation (chain tendency, fender condition, unusual situation) factually, without interpreting its significance" },
      { en: "Any uncertain gangway or access situation, immediately, for escalation" },
    ],
    iDoNotAuthorize: [
      { en: "Any independent decision affecting the vessel's safety, navigation, cargo, or access control" },
      { en: "My own progression to unsupervised task performance, without confirmation from the supervising AB or Bosun" },
      { en: "Any correction or instruction directed at another crew member" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "OS training progression showing widening task scope as competence is demonstrated." } },
    { kind: "image", caption: { en: "Example of a properly rigged mooring station with an OS assisting an AB." } },
    { kind: "diagram", caption: { en: "Deck department organization chart showing the OS's position between Deck Cadet and AB." } },
    { kind: "video", caption: { en: "Demonstration of proper technique feedback between an AB and an OS." } },
    { kind: "document", caption: { en: "Sample sea time / competency progress record for AB certification." } },
  ],
};

// ── ENGINE CADET ───────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-29_role-on-board-engine-cadet-mapreferences.md) and the
// Product Owner's final decisions on that report. All lessonId used are
// verified to exist in lessonRegistry.ts and to target "engine_cadet".
// Locations with no validated correspondence are left as
// mapReferences: [] intentionally (practical scenario 1, and several
// behavioral/meta skills — active observation, TRB documentation, asking
// clarifying questions, honest task reporting, professional
// curiosity/conduct — that no existing lesson content covers).
const ENGINE_CADET_CARD: RoleOnBoardCard = {
  rankId: "engine_cadet",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Engine Cadet is a trainee officer undergoing structured seagoing training toward an Engineer Officer of the Watch certificate, working under structured supervision provided by the Chief Engineer, watchkeeping engineers, and experienced ratings (Motorman, Oiler) to build the practical experience required alongside academic study. Like the Deck Cadet, the Engine Cadet's primary task aboard is not independent execution — it is supervised learning, observation, and the accumulation of documented training records." },
    { en: "The Cadet participates in real engine room operations — watchkeeping, maintenance, monitoring, machinery rounds and routine inspections — but always under supervision, and never bears independent operational responsibility the way a Motorman or Oiler does; a Cadet's mistake is expected to be caught and corrected by the supervising engineer or rating, not carried through to consequence. The level of supervision may gradually decrease as competence is demonstrated, but responsibility remains with the supervising engineer or rating." },
    { en: "The Cadet's success is measured differently from every operational rank: not by flawless execution, but by demonstrated understanding, genuine curiosity, and progress recorded in the Training Record Book (TRB) that will support certification as an Engineer Officer of the Watch." },
    { en: "The Cadet works closely with the Motorman and Oiler for hands-on engine room tasks, and with watchkeeping engineers for machinery space familiarization and monitoring — building relationships and reputation that often shape how quickly they are trusted with real responsibility once qualified." },
    { en: "Where every operational rank in the engine department is evaluated on the quality of their decisions or execution, the Cadet is evaluated on the quality of their learning — asking good questions, seeking clarification rather than guessing, and building the foundation of judgment that will define their entire career." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Chief Engineer (overall training oversight)" },
      { en: "Watchkeeping engineers (engine room watch familiarization)" },
    ],
    worksWith: [
      { en: "Experienced Motormen, Oilers, and engine officers, from whom the Cadet learns hands-on engine room practice directly" },
      { en: "Other cadets (Deck and Engine) during shared training activities" },
    ],
    mentors: [
      { en: "Chief Engineer, who typically oversees the Cadet's Training Record Book and certification progress" },
      { en: "Experienced Motormen and Oilers, who mentor practical engine room skills" },
      { en: "Watchkeeping engineers, who mentor monitoring and watchkeeping familiarization" },
    ],
    supports: [
      { en: "The Cadet contributes as a team member but holds no supervisory responsibility" },
    ],
  },

  professionalSkills: [
    { label: { en: "Observation and active learning under supervision" }, mapReferences: [] },
    { label: { en: "Professional conduct and integration into the engine team" }, mapReferences: [] },
    { label: { en: "Basic engine room tasks (rounds assistance, basic maintenance) under guidance" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }] },
    { label: { en: "Engine room familiarization, basic machinery identification, and technical terminology" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l1" }, { kind: "lesson", lessonId: "e1-l2" }] },
    { label: { en: "Training Record Book (TRB) documentation and self-assessment" }, mapReferences: [] },
    { label: { en: "Asking clarifying questions and seeking guidance appropriately" }, mapReferences: [] },
    { label: { en: "Basic safety awareness and PPE compliance in the engine room environment" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l3" }] },
    { label: { en: "Following instructions precisely and reporting task completion honestly" }, mapReferences: [] },
    { label: { en: "Maintaining curiosity, professionalism, and a willingness to learn from feedback" }, mapReferences: [] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Cadet's role is to observe and assist under direct supervision in the engine room — following the watchkeeping engineer or an assigned Motorman/Oiler during pre-departure checks (main engine readiness, auxiliary systems, fuel and lubrication levels), without independently deciding or confirming anything. The value of this phase for the Cadet is not in completing checks alone, but in seeing how experienced engine room personnel actually verify readiness — what they check, what they ask, and what they consider 'good enough' before reporting the engine room ready to the bridge." },
      responsibilities: [
        { en: "Assist the watchkeeping engineer or an assigned Motorman/Oiler with assigned pre-departure checks (fluid levels, auxiliary machinery status, standby equipment) exactly as instructed, without making independent judgment calls" },
        { en: "Observe how the Chief Engineer or watchkeeping engineer verifies main engine and propulsion readiness, asking questions afterward rather than interrupting the process" },
        { en: "Report completion of an assigned check honestly and promptly, including anything unclear or not fully understood" },
        { en: "Record relevant training observations in the Training Record Book, connecting what was observed to the required competencies" },
        { en: "Ask for clarification immediately when an instruction is not understood, rather than proceeding on a guess" },
        { en: "Follow all PPE and safety requirements exactly as instructed, without exception, given the specific hazards of the engine room environment" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed by the supervising engineer or rating (ear protection, safety shoes, coveralls)" },
        { en: "Training Record Book (TRB)" },
        { en: "Notebook or equivalent for capturing observations and questions" },
      ],
      risks: [
        { en: "Guessing at an unclear instruction rather than asking, risking an incorrectly completed check" },
        { en: "Attempting a task beyond current competence without supervision present, particularly around moving or hot machinery" },
        { en: "Missing the learning value of the phase by focusing only on completing an assigned check mechanically" },
        { en: "Failing to record observations promptly, losing detail relevant to TRB competency requirements" },
      ],
      bestPractices: [
        { en: "Ask questions before starting an unfamiliar check, not partway through it" },
        { en: "Treat every assigned check as an opportunity to understand why it matters, not only how to do it" },
        { en: "Record TRB observations as soon as possible after the activity, while details are still fresh" },
        { en: "Report honestly when something was not fully understood, rather than implying it was" },
      ],
      commonMistakes: [
        { en: "Proceeding on a guess rather than asking for clarification" },
        { en: "Treating a check as complete without genuinely understanding what it verified or why" },
        { en: "Waiting too long after an activity to record TRB observations, losing useful detail" },
        { en: "Hesitating to ask a question out of concern it might seem inexperienced" },
      ],
      professionalTips: [
        { en: "Asking a good question is not a sign of inexperience — it is exactly what this stage of training expects of you" },
        { en: "The habits you build now — asking, observing, recording — are the same habits that will make you a good engineer officer later" },
        { en: "A check done correctly but not understood teaches you far less than one you had to ask about" },
        { en: "Your reputation as a Cadet is built more by your willingness to learn than by pretending to already know" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }, { kind: "lesson", lessonId: "e2-l1" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Cadet is positioned in the engine room or engine control room purely as an observer and light assistant, never as a decision-maker or independent executor. The value of this phase is watching how the engine room responds in real time to bridge orders — engine telegraph commands, standby procedures, and the coordination between the watchkeeping engineer and the bridge — while staying completely out of the way of any actual safety-critical action." },
      responsibilities: [
        { en: "Remain in the position assigned by the supervising engineer, observing without independently acting on what is seen" },
        { en: "Observe how engine orders from the bridge are received, confirmed, and executed, noting the communication discipline involved" },
        { en: "Ask questions once the manoeuvre is safely completed, not during active operations" },
        { en: "Record observations about engine room coordination and communication with the bridge in the Training Record Book" },
        { en: "Remain alert to PPE and personal safety at all times, particularly regarding moving machinery, heat sources, and noise" },
        { en: "Report immediately to the supervising engineer if given an instruction that seems unclear or unsafe, rather than acting on it uncertainly" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed (ear protection, safety shoes, coveralls)" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Standing too close to moving machinery or a hazardous area due to inexperience or momentary inattention" },
        { en: "Attempting to assist beyond the assigned task, creating confusion or risk during a safety-critical operation" },
        { en: "Missing the coordination between the engine room and the bridge by focusing narrowly on one detail" },
        { en: "Asking a question at a moment that distracts the supervising engineer during active operations" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned and do only what has been explicitly assigned, however tempting it is to help further" },
        { en: "Watch the whole coordination — bridge to engine room, engine room to team — not just the immediate task in front of you" },
        { en: "Save questions for after the manoeuvre, when the supervising engineer can actually engage with them" },
        { en: "Treat every departure as a chance to see the same principles applied slightly differently, and note what varies and what stays constant" },
      ],
      commonMistakes: [
        { en: "Wandering into a hazardous area out of curiosity or inattention" },
        { en: "Trying to help beyond the assigned role, adding risk rather than value during a safety-critical operation" },
        { en: "Interrupting active communication with a question that could wait" },
        { en: "Watching only the task directly assigned and missing the broader coordination taking place" },
      ],
      professionalTips: [
        { en: "During a manoeuvre, your job is to be exactly where you are told and nowhere else — this is not a limitation, it is the safest way to learn from a genuinely demanding operation" },
        { en: "The best departures to learn from are the routine ones — pay attention to how little drama a well-run manoeuvre actually has" },
        { en: "What separates a good future engineer officer from an average one often starts here: noticing not just what people do, but why they do it in that order" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }],
    },

    navigation: {
      overview: { en: "During navigation, the Cadet's primary activity is engine room familiarization — standing alongside the watchkeeping engineer, learning to read gauges, monitor parameters, and use engine room equipment under direct supervision, and gradually taking on simple, closely monitored tasks (recording readings, checking a specific parameter) as competence is demonstrated. The Cadet never stands an independent watch or bears responsibility for the machinery's safe operation; every action is checked by the supervising engineer before or as it is relied upon." },
      responsibilities: [
        { en: "Stand watch alongside the watchkeeping engineer as assigned, observing monitoring technique, equipment use, and decision-making without independently acting on what is seen" },
        { en: "Perform simple, supervised tasks (recording a parameter, logging an observation) only as explicitly assigned, with the watchkeeping engineer verifying the result" },
        { en: "Ask the watchkeeping engineer to explain reasoning behind a decision or action when the opportunity allows, rather than assuming understanding" },
        { en: "Record engine room observations, terminology, and procedures in the Training Record Book, connecting them to required competencies" },
        { en: "Report anything observed that seems unusual or unclear to the watchkeeping engineer immediately, rather than assuming it is not worth mentioning" },
        { en: "Follow engine room communication discipline exactly as demonstrated, including proper use of standard phrases and reporting formats" },
      ],
      equipment: [
        { en: "Engine room monitoring and control equipment, used only under direct supervision" },
        { en: "Training Record Book" },
        { en: "Notebook for capturing terminology and procedures" },
      ],
      risks: [
        { en: "Acting on an observation or task result without having it verified by the watchkeeping engineer, treating a supervised task as if it were independent" },
        { en: "Assuming understanding of an explanation without actually confirming it through a follow-up question" },
        { en: "Disturbing the watchkeeping engineer's concentration during a genuinely demanding moment of the watch with a question that could wait" },
        { en: "Losing engagement during long, uneventful watch periods, missing the value of quieter observation" },
      ],
      bestPractices: [
        { en: "Treat every supervised task as an opportunity for the watchkeeping engineer to check your understanding, not as an independent responsibility" },
        { en: "Time questions for appropriate moments — quieter periods of the watch rather than active decision-making" },
        { en: "Use quiet periods of the watch actively, reviewing terminology or procedures rather than disengaging" },
        { en: "Confirm understanding of an explanation by restating it in your own words when appropriate" },
      ],
      commonMistakes: [
        { en: "Treating a supervised task result as final without waiting for the watchkeeping engineer's verification" },
        { en: "Nodding along to an explanation without genuinely understanding it" },
        { en: "Asking a question at a moment that interrupts the watchkeeping engineer's attention during a critical task" },
        { en: "Mentally disengaging during quiet watch periods instead of using them to learn" },
      ],
      professionalTips: [
        { en: "The watchkeeping engineer you shadow today is showing you what a normal watch actually looks like — pay attention even when nothing dramatic is happening" },
        { en: "A quiet watch is not wasted time — it is often the best time to ask questions and absorb detail" },
        { en: "Every task you're given supervised is a task you'll eventually do alone — learn it as if that day were coming soon, because it is" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Cadet remains in the engine room or engine control room, observing how the engine team supports the operation — maintaining machinery readiness for a possible unplanned departure, and responding to any bridge request related to propulsion or auxiliary systems. Unlike the deck team, who handle the anchor directly, the engine room's role during anchoring is quieter but still essential: staying prepared while apparently idle." },
      responsibilities: [
        { en: "Remain in the position assigned by the supervising engineer, observing without independently acting on what is seen" },
        { en: "Observe how the engine room maintains readiness during an extended anchor period (standby status, auxiliary machinery monitoring), noting what is actively checked versus assumed" },
        { en: "Ask questions once the operation allows, focusing on what the engine room specifically monitors or prepares during anchoring" },
        { en: "Record observations about engine room readiness and communication with the bridge in the Training Record Book" },
        { en: "Remain alert to PPE and personal safety at all times, particularly if assigned tasks involve moving machinery" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Assuming the engine room has 'nothing to do' during anchoring and disengaging from observation" },
        { en: "Missing the quiet but continuous monitoring that keeps the vessel ready for an unplanned departure" },
        { en: "Standing in an unsafe position near machinery out of inattention rather than active awareness" },
        { en: "Failing to connect the readiness maintained at anchor to the broader principle of continuous vigilance" },
      ],
      bestPractices: [
        { en: "Treat the apparent quiet of anchoring in the engine room as evidence of ongoing readiness, not evidence that nothing is happening" },
        { en: "Ask specifically what the watchkeeping engineer checks during an anchor period that might otherwise go unnoticed" },
        { en: "Note how quickly the engine room could respond if the bridge requested unplanned engine readiness" },
        { en: "Stay engaged even during a phase that looks uneventful — this is often where habits of attentiveness are tested most" },
      ],
      commonMistakes: [
        { en: "Assuming the engine room is essentially inactive during anchoring" },
        { en: "Losing attentiveness because the phase appears to have little visible activity" },
        { en: "Standing closer to machinery than necessary out of habit or inattention" },
        { en: "Missing the connection between quiet readiness and genuine operational vigilance" },
      ],
      professionalTips: [
        { en: "Anchoring reveals a quieter side of engine room discipline — readiness maintained without visible action is still real work" },
        { en: "The engine room's job during anchoring is to be ready for anything, without being told exactly what that 'anything' might be" },
        { en: "Watching how vigilance is maintained during a quiet phase teaches you as much as watching an active manoeuvre" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }, { kind: "lesson", lessonId: "e2-l1" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Cadet is exposed to a wide variety of engine room activity — maintenance work, bunkering support, cargo pump operation (if applicable to the vessel type), and interactions with shore engineers or surveyors — always under supervision and never with independent authority over any of it. Port stays are an opportunity to see how engine room work intensifies when the vessel is stationary, in contrast to the steady rhythm of a sea passage." },
      responsibilities: [
        { en: "Assist with engine room maintenance tasks as assigned, under direct supervision, without making independent judgments about safety or sequencing" },
        { en: "Observe bunkering operations or cargo pump support (if applicable) when permitted, noting the precautions taken and the communication involved" },
        { en: "Observe interactions between engine officers and external parties (shore engineers, surveyors) when permitted, noting how professional communication is conducted" },
        { en: "Ask questions about port procedures once appropriate, rather than during an active task or a busy exchange with an external party" },
        { en: "Record observations about port engine room operations in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed, particularly around bunkering and maintenance activities" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Standing too close to active bunkering or maintenance work out of curiosity, without recognizing the hazard" },
        { en: "Attempting to assist beyond an assigned task during a busy or safety-critical port operation" },
        { en: "Missing the variety of activity happening simultaneously in the engine room during port stay by focusing narrowly on one task" },
        { en: "Interrupting an officer's interaction with an external party with a question that could wait" },
      ],
      bestPractices: [
        { en: "Stay at a safe distance from active bunkering or maintenance work unless directly assigned a task within it" },
        { en: "Watch how officers interact with shore engineers and surveyors — professional communication with external parties is a skill you will need directly one day" },
        { en: "Save procedural questions for a quieter moment, not during an active exchange or task" },
        { en: "Treat every port stay as an opportunity to see maintenance work you might not encounter during a routine sea passage" },
      ],
      commonMistakes: [
        { en: "Getting too close to bunkering or maintenance activity out of curiosity rather than maintaining a safe observation distance" },
        { en: "Focusing only on the assigned task and missing the broader engine room activity happening around it" },
        { en: "Asking a question at a moment that interrupts an officer's professional interaction with an external party" },
        { en: "Treating a busy port stay as less structured than a routine watch, and losing attentiveness as a result" },
      ],
      professionalTips: [
        { en: "Port stays compress an enormous amount of learning into a short time — pay attention to everything happening, not only your assigned task" },
        { en: "Bunkering and major maintenance work often only happen in port — these are opportunities you won't get at sea" },
        { en: "The way officers speak to shore engineers and surveyors is a skill in itself — watch it as closely as you watch any technical procedure" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }, { kind: "lesson", lessonId: "e6-l1" }],
    },

    ship_to_ship_operations: {
      overview: { en: "During STS operations, the Cadet remains in the engine room, observing how the engine team supports the operation — maintaining propulsion and manoeuvring readiness throughout, and assisting with cargo pump or ballast operations if the vessel type requires it. The Cadet's role is strictly observational and supervised, given the elevated risk of the overall operation and the coordination required between the engine room, the bridge, and the counterpart vessel." },
      responsibilities: [
        { en: "Remain in the position assigned by the supervising engineer, observing without independently acting on what is seen" },
        { en: "Observe how the engine room maintains readiness to manoeuvre throughout the operation, noting what is monitored continuously" },
        { en: "Observe cargo pump or ballast operations, if assigned to assist, exactly as instructed and without expanding the assigned role" },
        { en: "Ask questions once the operation is safely completed, focusing on how the engine room's readiness supported the overall operation" },
        { en: "Record observations about engine room coordination during STS in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed, with particular attention to the heightened risk of this operation" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Underestimating the importance of continuous engine room readiness because the visible action is happening elsewhere on the vessel" },
        { en: "Attempting to assist beyond an assigned task during a high-risk operation" },
        { en: "Missing the significance of continuous monitoring, focusing only on any visible pump or valve operation" },
        { en: "Assuming the engine room's role is minor because it is less visible than the deck team's" },
      ],
      bestPractices: [
        { en: "Recognize that engine room readiness during STS is as critical as the visible rigging work happening on deck, even though it is less visible" },
        { en: "Stay exactly where positioned, regardless of how routine the operation appears to be proceeding" },
        { en: "Pay attention to how quickly the engine room could respond to an unplanned request from the bridge" },
        { en: "Treat every STS operation with the same level of attention, regardless of how many you have observed" },
      ],
      commonMistakes: [
        { en: "Assuming the engine room's contribution is secondary because the main visible activity is elsewhere" },
        { en: "Losing attentiveness because the engine room's part of the operation appears uneventful" },
        { en: "Attempting to help with cargo pump or ballast operations beyond what was assigned" },
        { en: "Missing how continuous readiness, not a single visible action, is what makes the engine room's contribution real" },
      ],
      professionalTips: [
        { en: "STS operations depend on more than what is visible on deck — the engine room's continuous readiness is part of what keeps the whole operation safe" },
        { en: "What looks like waiting in the engine room during STS is often active monitoring — learn to recognize the difference" },
        { en: "The coordination between the engine room and the bridge during STS is a preview of the communication discipline you will need as a watchkeeping officer" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }, { kind: "lesson", lessonId: "e6-l1" }, { kind: "lesson", lessonId: "e6-l2" }],
    },

    maintenance: {
      overview: { en: "Maintenance is where the Cadet gets the most hands-on experience of the whole training programme — assisting the Motorman, Oiler, and engineers with real engine room maintenance tasks under close supervision, learning proper technique from the very people who perform it daily. Unlike the more observational phases, maintenance offers genuine opportunities to practice skills directly, provided every task is properly supervised and the Cadet never exceeds their demonstrated competence." },
      responsibilities: [
        { en: "Assist with assigned maintenance tasks (routine rounds, basic component maintenance, cleaning, lubrication) exactly as instructed, under direct supervision from the Motorman, Oiler, or an assigned engineer" },
        { en: "Ask for a demonstration before attempting an unfamiliar task, rather than guessing at the correct technique" },
        { en: "Report task progress and completion honestly, including any part not confidently understood" },
        { en: "Observe how the supervising rating or engineer inspects work and decides whether it meets standard, connecting this to the broader concept of quality verification" },
        { en: "Record maintenance skills practiced and techniques learned in the Training Record Book" },
        { en: "Follow all PPE and safety requirements exactly as instructed for the specific task, particularly around hot surfaces, moving parts, and chemical handling" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task" },
        { en: "Maintenance tools and materials, used only as instructed and under supervision" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Attempting a task technique without having it properly demonstrated first, risking poor quality work or injury" },
        { en: "Overstating confidence in a task to avoid appearing inexperienced, then performing it incorrectly" },
        { en: "Missing the opportunity to understand why a maintenance standard exists, treating the task only as a mechanical action" },
        { en: "Using tools, products, or procedures incorrectly due to insufficient supervision or unclear instruction, with particular risk given the hazards of the engine room environment" },
      ],
      bestPractices: [
        { en: "Ask to see a task demonstrated before attempting it yourself, even if it looks straightforward" },
        { en: "Be honest about your confidence level for a given task — supervision exists precisely to catch what you don't yet know" },
        { en: "Watch how the supervising rating or engineer inspects finished work, not only how they perform it" },
        { en: "Use every maintenance task as a chance to build real technique, since these are skills you will rely on directly as a Motorman, Oiler, or officer later" },
      ],
      commonMistakes: [
        { en: "Attempting a technique without asking for a demonstration first" },
        { en: "Claiming more confidence in a task than is genuinely felt, out of concern about appearing inexperienced" },
        { en: "Treating a maintenance task as a box to check rather than a skill to build" },
        { en: "Rushing a task without a clear understanding of the standard it needs to meet" },
      ],
      professionalTips: [
        { en: "There is no reward for pretending to already know a technique — asking for a demonstration is exactly what this stage of your career is for" },
        { en: "The maintenance skills you build now as a Cadet are the same ones you'll be expected to already have as a rating or officer — take them seriously" },
        { en: "Watching how work gets inspected teaches you as much as watching how it gets done" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Cadet has an assigned station on the muster list, like every other crew member, but their role there is strictly supervised — following the instructions of the officer or rating in charge of that station, never acting independently. Drills and, if it ever occurs, a genuine emergency are among the most important learning moments of the whole training programme: the Cadet is seeing, in real time, how the calm structure they have observed during routine engine room operations holds up under pressure." },
      responsibilities: [
        { en: "Proceed immediately to the assigned muster station upon hearing the alarm, exactly as required by the muster list" },
        { en: "Follow the instructions of the officer or rating in charge of the station precisely, without independently deciding on an action" },
        { en: "Observe how the station is organized, how the team leader communicates, and how information flows to and from command during drills" },
        { en: "Ask questions after a drill is complete, focusing on what was done and why, rather than during the exercise itself" },
        { en: "Record observations from drills and, if applicable, genuine emergencies in the Training Record Book" },
        { en: "Take every drill as seriously as a genuine emergency, participating fully rather than treating it as a formality" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list" },
        { en: "Training Record Book" },
      ],
      risks: [
        { en: "Treating a drill as a formality rather than genuine practice, reducing its training value" },
        { en: "Acting on personal initiative during an emergency or drill rather than following the station leader's instructions" },
        { en: "Missing the value of the drill by focusing only on personal actions rather than observing the team's overall coordination" },
        { en: "Failing to ask questions afterward, losing the opportunity to understand decisions made under pressure" },
      ],
      bestPractices: [
        { en: "Treat every drill with full seriousness — the habits practiced in a drill are the ones that will actually be used in a real emergency" },
        { en: "Follow the station leader's instructions precisely, even if the reason is not yet fully clear — ask afterward" },
        { en: "Watch how the team leader communicates under pressure, not only what actions are performed" },
        { en: "Use the post-drill debrief actively, asking specific questions about decisions or communications observed" },
      ],
      commonMistakes: [
        { en: "Going through the motions of a drill without genuine engagement" },
        { en: "Acting independently during an emergency situation instead of following the assigned station leader" },
        { en: "Focusing only on personal tasks during a drill and missing the broader team coordination" },
        { en: "Skipping the opportunity to ask questions once a drill is complete" },
      ],
      professionalTips: [
        { en: "How you take a drill is how you will take the real thing — there is no separate 'serious mode' you can switch into later" },
        { en: "The calmest-looking emergency responses are usually the ones that have been drilled the most seriously, not the ones with the least at stake" },
        { en: "Watching a team leader communicate clearly under pressure during a drill teaches you more about leadership than almost anything else in your training" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l8" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "An Oiler asks you to 'clean up around that pump' before a scheduled inspection, but does not specify exactly what needs to be removed or to what standard. You are fairly sure you understand what is meant." },
      mission: { en: "Decide whether to proceed on your best understanding or clarify the instruction first." },
      expectedActions: [
        { en: "Ask a quick clarifying question before starting, even if you feel reasonably confident" },
        { en: "Confirm the expected standard (how thoroughly, what specifically to remove or avoid disturbing) rather than assuming" },
        { en: "Proceed only once the instruction is genuinely clear" },
        { en: "Report back honestly if partway through the task you realize your understanding was incomplete" },
      ],
      why: [{ en: "'Fairly sure' is not the same as certain, and a Cadet's job at this stage is to build the habit of confirming understanding, not to prove independence by guessing correctly. Asking costs a few seconds; redoing a task around sensitive equipment, or doing it to the wrong standard before an inspection, costs more." }],
      commonMistakes: [
        { en: "Proceeding on assumption to avoid seeming unsure" },
        { en: "Not mentioning partway through that the instruction turned out to be less clear than expected" },
        { en: "Completing the task to a standard that was never actually confirmed" },
      ],
      safetyPoints: [{ en: "Cleaning around machinery may involve chemicals, hot surfaces, or components that should not be disturbed — an unclarified instruction can turn a simple task into a safety or equipment issue." }],
      mapReferences: [],
    },
    {
      situation: { en: "During a supervised task, you notice an experienced Motorman skip a step that you learned in your training is supposed to be mandatory. The Motorman does not seem concerned, and the task is completed without incident." },
      mission: { en: "Decide how to respond to what you observed, given your position as a Cadet with no supervisory authority." },
      expectedActions: [
        { en: "Do not confront the Motorman directly or assume you must have misunderstood the training material" },
        { en: "Note the observation clearly and factually in your Training Record Book or personal notes" },
        { en: "Raise the question with your supervising officer (e.g. Chief Engineer) at an appropriate moment, framed as a genuine question rather than an accusation" },
        { en: "Let the officer determine what, if anything, needs to be addressed" },
      ],
      why: [{ en: "A Cadet has no authority to correct a rating's practice directly, but observing a discrepancy between trained standard and actual practice is exactly the kind of learning moment the TRB exists to capture — the right response is to raise it through the proper channel, not to ignore it or act on it alone." }],
      commonMistakes: [
        { en: "Assuming the shortcut must be fine simply because an experienced person did it without consequence" },
        { en: "Saying nothing at all, losing a genuine learning opportunity" },
        { en: "Confronting the Motorman directly, which is outside the Cadet's role" },
      ],
      safetyPoints: [{ en: "The absence of an immediate consequence does not mean a skipped safety step was actually safe — this is precisely the kind of normalization that a fresh, trained perspective can help catch." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l6" }, { kind: "lesson", lessonId: "s6-l3" }],
    },
    {
      situation: { en: "You are shadowing a busy watchkeeping engineer during a demanding period with multiple alarms and parameter checks happening in quick succession. You are struggling to follow everything that is happening." },
      mission: { en: "Decide how to handle feeling behind without disrupting the engineer's ability to manage the situation." },
      expectedActions: [
        { en: "Do not pretend to understand more than you do" },
        { en: "Stay out of the engineer's way and avoid asking questions during the busiest moments" },
        { en: "Observe as much as you can even if you cannot follow every detail" },
        { en: "Ask your questions afterward, once the watch has calmed or ended, being specific about what you did not follow" },
      ],
      why: [{ en: "A demanding watch is not the moment for a Cadet's questions, however genuine — the engineer's full attention belongs to the situation, and a Cadet's role there is to absorb what can be absorbed and fill the gaps afterward through honest, specific questions." }],
      commonMistakes: [
        { en: "Interrupting the engineer during a busy moment with a question that could wait" },
        { en: "Pretending to have followed everything to avoid looking lost" },
        { en: "Failing to follow up afterward, letting the confusion simply pass unaddressed" },
      ],
      safetyPoints: [{ en: "A distracted watchkeeping engineer during a genuinely demanding period is a real safety risk — protecting the engineer's attention during those moments is itself part of the Cadet's responsibility." }],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l7" }],
    },
  ],

  professionalTips: [
    { en: "Ask questions at the right moment, not the most convenient one — timing your question well is itself a professional skill you are building." },
    { en: "Never pretend to understand something you don't — a Cadet who admits confusion learns faster than one who hides it." },
    { en: "Every task, however small, is either done correctly and understood, or it isn't worth much — chase the understanding, not just the completion." },
    { en: "Your Training Record Book is not paperwork — it is the only record that will later prove you actually learned what you experienced." },
    { en: "Watch how experienced engine room personnel handle the moments that don't go according to plan — that is where the real skill shows." },
    { en: "Observation is not passive — a Cadet who is genuinely watching gauges, listening to machinery, and following reasoning is doing real work, even standing still." },
    { en: "The reputation you build as a Cadet follows you into your first real rank — professionalism now shapes the trust you're given later." },
    { en: "You are not expected to know yet — you are expected to want to know, and to say so honestly when you don't." },
  ],

  professionalMindset: [
    { en: "See yourself as a learner, not yet an operator. Every task assigned to you is a training opportunity first and a job second — your value at this stage is measured by what you understand, not by what you can do unsupervised." },
    { en: "Treat supervision as protection, not restriction. The close oversight you experience now exists to let you build real skill safely in an environment full of genuine hazards — it is not a lack of trust, it is exactly the structure every engineer before you learned within." },
    { en: "Assume your understanding is partial until confirmed. A task that seems obvious may still hide a detail you have not yet encountered — checking your understanding is a habit, not a sign of weakness." },
    { en: "Notice the gap between what is trained and what is practiced. Real engine room life sometimes differs from what you learned ashore — your job is to observe this honestly and raise it through the proper channel, not to silently adopt or silently reject it." },
    { en: "Hold two roles at once: contributing crew member and active learner. You are genuinely useful to the team even while you are still learning — these two things are not in tension, they happen together." },
    { en: "Recognize that today's supervised task is tomorrow's independent responsibility. Every skill you practice under guidance now is one you will eventually perform alone — learn it as if that day were close, because it is." },
    { en: "Accept that your questions serve everyone, not just you. A clarifying question asked at the right moment protects the task, the machinery, the team, and your own understanding all at once." },
  ],

  professionalDocumentation: [
    { en: "Training Record Book (TRB) — The Cadet's primary and most important document, recording engine room tasks observed and performed, competencies demonstrated, and reflections on what was learned. Unlike every operational rank's documentation, the TRB exists entirely for the Cadet's own benefit — it is the official evidence of seagoing training that supports certification as an Engineer Officer of the Watch." },
    { en: "Sea time and service records — The Cadet ensures their sea time is accurately recorded and confirmed by the Chief Engineer or Master as required by flag State and STCW regulations, since this record directly determines eligibility for certification exams." },
    { en: "Task and competency sign-offs — Where the training programme requires a supervising officer's or rating's signature confirming a specific competency has been demonstrated, the Cadet ensures this is obtained honestly, only once the competency is genuinely understood, not simply completed once." },
    { en: "Personal notes and observations — Beyond the formal TRB, the Cadet is encouraged to keep personal notes on machinery systems, procedures, and terminology observed, supporting deeper understanding and later exam preparation." },
    { en: "Why this matters: Every operational rank's documentation exists to prove something happened correctly aboard the vessel; the Cadet's documentation exists to prove that genuine learning happened within the Cadet. A TRB completed honestly, thoroughly, and with real reflection is worth far more — both for certification and for the Cadet's actual competence later — than one filled in quickly to satisfy a requirement. The habits of honest, careful documentation built here will carry directly into the professional documentation responsibilities of every rank that follows." },
  ],

  environmentalResponsibilities: [
    { en: "Following environmental procedures under supervision — The Cadet follows all waste segregation, oil handling, and pollution prevention procedures exactly as instructed, without independently deciding how a substance or waste item should be handled." },
    { en: "Observing environmental decision-making — The Cadet watches how the Chief Engineer or watchkeeping engineer make environmental decisions (e.g. authorizing a bilge water discharge, handling an oil record book entry) and asks questions afterward to understand the reasoning, particularly the reference to MARPOL requirements and documentation." },
    { en: "Reporting anything observed — If the Cadet notices anything unusual (an unexpected leak, an unclear waste handling practice), they report it to a supervising officer or rating immediately rather than assuming it is not their place to mention it." },
    { en: "Building environmental awareness for future responsibility — The Cadet records observations about environmental procedures and decision-making in the Training Record Book, recognizing that environmental compliance responsibility will grow substantially at every rank ahead, particularly given how central it is to the engine department's daily work." },
    { en: "Why this matters: The Cadet carries no independent environmental authority, but the habits of attention and honest reporting built now are exactly what will be expected, at a much higher level of responsibility, once qualified as an officer. A Cadet who learns to notice and question environmental practice early builds the foundation for the environmental governance responsibilities that await at every subsequent rank — responsibilities that, in the engine department, are rarely far from any given day's work." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Ask questions of any crew member or officer to clarify an instruction or understand a procedure" },
      { en: "Report anything observed that seems unclear, unsafe, or inconsistent with training, to a supervising officer or rating" },
      { en: "Refuse to proceed with a task you do not understand or feel unprepared for, requesting clarification or demonstration first" },
      { en: "Request feedback on your performance from any supervising officer or rating" },
    ],
    youCannot: [
      { en: "Perform any task independently without a supervising officer or rating present or explicitly authorizing it" },
      { en: "Make any decision affecting the vessel's safety, machinery operation, or environmental compliance — every action is supervised and verified" },
      { en: "Stand an independent watch, or emergency station role, without direct supervision" },
      { en: "Correct or discipline any crew member, regardless of what is observed — any concern is raised through a supervising officer, never acted on directly" },
      { en: "Assume that a task performed correctly once means it can now be performed unsupervised" },
      { en: "Sign off, verify, or confirm any operational readiness, safety check, or compliance matter on the vessel's behalf" },
      { en: "Represent the vessel or the company in any interaction with external parties (shore engineers, surveyors, authorities)" },
    ],
  },

  commonMistakes: [
    { en: "Pretending to understand instead of asking — Nodding along or proceeding on a guess to avoid appearing inexperienced, rather than confirming genuine understanding." },
    { en: "Treating supervision as a formality — Going through the motions of an assigned task without engaging with why it matters or what standard it needs to meet." },
    { en: "Waiting to be taught instead of actively observing — Remaining passive during training, expecting knowledge to arrive rather than seeking it out through active attention and questions." },
    { en: "Interrupting at the wrong moment — Asking a genuine question during a busy or safety-critical moment instead of saving it for an appropriate time." },
    { en: "Filling in the Training Record Book carelessly — Completing TRB entries quickly to satisfy a requirement rather than reflecting honestly on what was actually learned." },
    { en: "Overestimating readiness after a single supervised success — Assuming a task performed correctly once under supervision means it can now be performed independently." },
    { en: "Staying silent about something inconsistent or unclear — Noticing a gap between trained standard and observed practice, or an unclear instruction, and saying nothing rather than raising it appropriately." },
    { en: "Confusing eagerness to help with readiness to act alone — Attempting to assist beyond an assigned role during a safety-critical operation, adding risk rather than value." },
  ],

  careerProgression: [
    { en: "Next role: Wiper or, depending on the training pathway and company structure, direct progression toward Engineer Officer of the Watch certification upon completing sea time and academic requirements — the Cadet's path is defined by the specific cadetship programme and flag State requirements rather than a single universal next step. Engine room rating structures (Wiper, Motorman, Oiler) vary between companies and vessel types, and the Cadet's actual next step should be confirmed against their specific training programme." },
    { en: "Skills to develop: Consistent, hands-on engine room competence (basic maintenance, rounds, monitoring) to the standard expected of an experienced rating; growing confidence in watchkeeping fundamentals; the discipline of thorough, honest self-documentation that will carry into professional documentation at every future rank; increasing initiative within the bounds of what is actually authorized." },
    { en: "Recommended experience: Completion of the required sea time with genuine, varied exposure across engine room systems and operations (not just repeated familiar tasks), a Training Record Book reflecting real engagement and reflection rather than minimal compliance, and demonstrated reliability and honesty in reporting — the qualities supervising officers remember when a Cadet is later trusted with real responsibility." },
    { en: "Certificates typically required: Requirements vary significantly by flag State, training institution, and company cadetship structure. Progression typically requires completion of approved sea time, a satisfactorily completed Training Record Book, and passing the required academic and practical examinations for the Engineer Officer of the Watch certificate of competency." },
    { en: "Recommended MAP courses: All foundational Engine lessons (machinery systems, watchkeeping, safety) relevant to the cadetship syllabus; Role On Board – Fourth Engineer (to preview the officer path); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving beyond Cadet means the supervision that has protected you begins to lighten, and the habits built now — asking rather than guessing, documenting honestly, observing actively — become the foundation you will rely on the first time no one is checking your work. The transition is not from learner to non-learner; it is from a learner who is watched closely to one who must watch themselves." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "e1-l1", label: { en: "Main Engine" } },
    { kind: "lesson", lessonId: "e1-l2", label: { en: "Auxiliaries & Electricity" } },
    { kind: "lesson", lessonId: "e1-l3", label: { en: "Stability & Loading" } },
    { kind: "lesson", lessonId: "e1-l4", label: { en: "Fire Safety & CO2 System" } },
    { kind: "lesson", lessonId: "e1-l5", label: { en: "Survival & EPIRB" } },
    { kind: "lesson", lessonId: "e1-l6", label: { en: "Maintenance & Troubleshooting" } },
    { kind: "lesson", lessonId: "e1-l7", label: { en: "Engine Watchkeeping" } },
    { kind: "lesson", lessonId: "e1-l8", label: { en: "Emergency Procedures" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "lesson", lessonId: "s6-l2", label: { en: "Common Ship Emergencies & Immediate Actions" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — foundational engine room and machinery terminology" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on cadetship structure, sea time requirements, and Engineer Officer of the Watch certification pathway by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore vessel types and basic machinery layouts to build early familiarity" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on training requirements, TRB documentation, or basic engine room practice" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Engine Cadet through to Engineer Officer" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time and early training achievements" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_FOURTH_ENGINEER", label: { en: "Role On Board — Fourth Engineer" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Assigned tasks exactly as instructed, under direct supervision, without independent judgment" },
      { en: "Training Record Book entries, honestly and promptly after each relevant activity" },
      { en: "Requests for clarification, demonstration, or feedback whenever needed" },
    ],
    iMonitor: [
      { en: "My own understanding of each task, procedure, or explanation, checking rather than assuming it is complete" },
      { en: "How experienced engine room personnel and officers coordinate, communicate, and make decisions, as a continuous learning activity" },
      { en: "Any gap between what I was trained to expect and what I observe in actual practice" },
    ],
    iReport: [
      { en: "Task completion, honestly, including anything not fully understood" },
      { en: "Anything observed that seems unclear, unsafe, or inconsistent with training, to a supervising officer or rating" },
      { en: "My own uncertainty whenever a task or instruction is not genuinely clear" },
    ],
    iDoNotAuthorize: [
      { en: "Any independent decision affecting the vessel's safety, machinery operation, or environmental compliance" },
      { en: "My own progression to unsupervised task performance, without explicit confirmation from a supervising officer or rating" },
      { en: "Any correction or instruction directed at another crew member, regardless of what is observed" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Cadetship training pathway showing sea time milestones toward Engineer Officer certification." } },
    { kind: "image", caption: { en: "Example of a completed Training Record Book (TRB) entry." } },
    { kind: "diagram", caption: { en: "Engine department organization chart showing the Cadet's position and reporting lines." } },
    { kind: "video", caption: { en: "Demonstration of a well-conducted supervised task (e.g. basic maintenance with a Motorman)." } },
    { kind: "document", caption: { en: "Sample sea time / service record confirmation form." } },
  ],
};

// ── WIPER ──────────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-29_role-on-board-wiper-mapreferences.md) and the
// Product Owner's final decisions on that report. All lessonId used are
// verified to exist in lessonRegistry.ts and to target "wiper" — unlike
// the Engine Cadet card, targetRanks was a real constraint here: e1-l3,
// e1-l7, e4-l2, e6-l1 and e6-l2 all exclude "wiper" and were therefore
// never proposed. Locations with no validated correspondence are left as
// mapReferences: [] intentionally (practical scenario 2, and several
// behavioral/meta skills — instruction-following, technique building
// through repetition, honest task reporting, professional conduct — that
// no existing lesson content covers).
const WIPER_CARD: RoleOnBoardCard = {
  rankId: "wiper",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Wiper is the entry-level rating in the engine department, responsible for basic cleaning, housekeeping, and simple assistance tasks in the engine room under the direct supervision of the Motorman, Oiler, or watchkeeping engineer. Unlike the Engine Cadet, whose role is primarily supervised learning, the Wiper is a genuine working member of the engine team — but unlike the Motorman or Oiler, the Wiper's scope of independent judgment remains deliberately narrow." },
    { en: "The Wiper executes clearly defined, lower-risk tasks (cleaning, basic housekeeping, simple tool and material handling) while building the foundational competence and reliability that will support progression to Motorman or Oiler. The Wiper is not yet trusted to interpret ambiguous situations independently — that judgment still belongs to the supervising rating or officer." },
    { en: "The Wiper's progression is measured by demonstrated reliability, attention to safety, and a growing familiarity with the engine room environment — the supervising Motorman, Oiler, or engineer gradually extends the Wiper's scope of tasks as trust and competence grow." },
    { en: "The Wiper works most closely with the Motorman and Oiler, who directly guide and correct technique day to day, and may occasionally assist an Engine Cadet with basic tasks under a senior rating's oversight." },
    { en: "Where the Motorman or Oiler is trusted to execute a task independently and flag anything unusual, the Wiper's role is to execute precisely what is instructed, maintain a clean and safe working environment, and let the supervising rating or officer catch what the Wiper cannot yet be expected to catch alone." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Motorman or Oiler (day-to-day task supervision)" },
      { en: "Watchkeeping engineer (during watch-related tasks)" },
    ],
    worksWith: [
      { en: "Motorman and Oiler, from whom the Wiper learns technique and engine room practice directly" },
      { en: "Engine Cadets, whom the Wiper may occasionally assist with basic tasks under supervision" },
    ],
    mentors: [
      { en: "The Motorman, Oiler, and watchkeeping engineers, who directly guide and correct the Wiper's technique and judgment" },
    ],
    supports: [
      { en: "The Wiper does not yet supervise anyone, but may assist an Engine Cadet with basic technique under a senior rating's or engineer's oversight" },
    ],
  },

  professionalSkills: [
    { label: { en: "Basic cleaning and housekeeping in the engine room environment" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }] },
    { label: { en: "Following instructions precisely and asking when uncertain" }, mapReferences: [] },
    { label: { en: "Basic tool and material handling under supervision" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }] },
    { label: { en: "Basic safety awareness and PPE compliance" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l3" }, { kind: "lesson", lessonId: "s6-l1" }] },
    { label: { en: "Building technique and reliability through repetition and feedback" }, mapReferences: [] },
    { label: { en: "Honest self-assessment and reporting of task completion" }, mapReferences: [] },
    { label: { en: "Professional conduct and reliability within the engine team" }, mapReferences: [] },
    { label: { en: "Basic familiarity with engine room equipment and terminology" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l1" }, { kind: "lesson", lessonId: "e1-l2" }] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Wiper's role is to carry out assigned cleaning and basic preparation tasks in the engine room — ensuring the working environment is clean, tools and materials are in order, and simple checks are completed exactly as instructed by the supervising Motorman, Oiler, or engineer. Unlike the Engine Cadet, who mainly observes this phase, the Wiper is genuinely executing real tasks; unlike the Motorman or Oiler, the Wiper's tasks remain limited to lower-risk, clearly defined actions." },
      responsibilities: [
        { en: "Carry out assigned pre-departure cleaning and housekeeping tasks in the engine room, ensuring the working environment meets the standard expected before departure" },
        { en: "Assist the Motorman, Oiler, or engineer with simple preparation tasks (handing tools, basic checks) exactly as instructed" },
        { en: "Report task completion clearly and honestly, flagging anything uncertain rather than assuming it is fine" },
        { en: "Ask for clarification before attempting an unfamiliar task" },
        { en: "Follow all PPE and safety requirements exactly as instructed, given the specific hazards of the engine room environment" },
      ],
      equipment: [
        { en: "Personal protective equipment (ear protection, safety shoes, coveralls, gloves)" },
        { en: "Cleaning materials and basic hand tools, used as instructed" },
        { en: "Departure checklist / work list, as directed by the supervising rating or engineer" },
      ],
      risks: [
        { en: "Attempting an unfamiliar task without asking for guidance, risking incorrect execution or injury" },
        { en: "Reporting a task as complete without genuinely confirming it meets the expected standard" },
        { en: "Working carelessly under time pressure, missing a step that a supervisor would have caught" },
        { en: "Underestimating the hazards of the engine room environment because assigned tasks appear low-risk" },
      ],
      bestPractices: [
        { en: "Ask for a demonstration before attempting an unfamiliar task, even under time pressure" },
        { en: "Report honestly on task completion, including anything not fully confident about" },
        { en: "Treat every task, however simple, as an opportunity to build reliability and technique" },
        { en: "Maintain constant awareness of engine room hazards, even during routine cleaning tasks" },
      ],
      commonMistakes: [
        { en: "Guessing at an unfamiliar task rather than asking" },
        { en: "Overstating confidence in completed work to avoid seeming inexperienced" },
        { en: "Rushing a task to the point of missing a step" },
        { en: "Treating a cleaning or housekeeping task as unimportant compared to more technical work" },
      ],
      professionalTips: [
        { en: "A clean, well-organized engine room is not a minor detail — it directly affects safety and how quickly problems can be spotted" },
        { en: "Every task you're checked on now is a task you'll be trusted with more independence on soon — use the supervision while you have it" },
        { en: "The Motorman or Oiler you work under today started exactly where you are now" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l3" }, { kind: "lesson", lessonId: "e1-l6" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Wiper remains in the engine room under the direct supervision of the Motorman, Oiler, or watchkeeping engineer, carrying out any assigned lower-risk task while staying well clear of any safety-critical action. The Wiper's contribution during this phase is limited but real — supporting the team's readiness without independently monitoring or interpreting what is happening." },
      responsibilities: [
        { en: "Remain in the position assigned by the supervising rating or engineer, carrying out only the specific task instructed" },
        { en: "Assist with any simple, assigned task (handing tools, basic housekeeping) without independently expanding the assigned role" },
        { en: "Report completion of an assigned action immediately and clearly" },
        { en: "Ask for clarification if an instruction is unclear, rather than guessing during an active manoeuvre" },
        { en: "Follow PPE and safety requirements exactly, with no exceptions during active operations" },
      ],
      equipment: [
        { en: "Personal protective equipment (ear protection, safety shoes, coveralls, gloves)" },
        { en: "Basic tools and materials, used under supervision" },
      ],
      risks: [
        { en: "Standing too close to moving machinery or a hazardous area due to inexperience or momentary inattention" },
        { en: "Attempting to assist beyond the assigned task, creating confusion or risk during a safety-critical operation" },
        { en: "Hesitating or freezing when uncertain, rather than asking for immediate clarification" },
        { en: "Losing focus during a routine-seeming manoeuvre, missing an early sign of a developing issue" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned and do only what has been explicitly assigned" },
        { en: "Apply hazard awareness training actively, not only when specifically reminded" },
        { en: "Communicate task completion clearly and promptly, in the terms used by the rest of the team" },
        { en: "Stay mentally engaged even during a routine, well-practiced manoeuvre" },
      ],
      commonMistakes: [
        { en: "Underestimating a hazard because the manoeuvre feels routine" },
        { en: "Attempting a task beyond what was assigned, rather than confirming first" },
        { en: "Staying silent when uncertain instead of asking immediately" },
        { en: "Losing attention during a manoeuvre that has gone smoothly so far" },
      ],
      professionalTips: [
        { en: "The hazards in the engine room don't become less real just because the manoeuvre is routine — stay alert every time" },
        { en: "If an instruction seems unclear, say so immediately — a moment's clarification is always faster than fixing a mistake" },
        { en: "Reliability in small, assigned tasks is exactly what builds the trust needed for greater responsibility later" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }, { kind: "lesson", lessonId: "s6-l3" }],
    },

    navigation: {
      overview: { en: "During navigation, the Wiper carries out routine cleaning, housekeeping, and simple assigned tasks in the engine room, occasionally alongside the watchkeeping engineer or an assigned Motorman/Oiler. Unlike the Motorman or Oiler, who may take on watch duties, the Wiper does not stand an independent watch — their contribution during this phase is steady, reliable task execution that keeps the engine room clean, organized, and ready for inspection at any time." },
      responsibilities: [
        { en: "Carry out assigned cleaning, housekeeping, and basic tasks throughout the watch period, as directed by the supervising rating or engineer" },
        { en: "Report anything observed that seems unusual (a leak, an unfamiliar noise, a loose fitting) to the supervising rating or engineer immediately, without deciding whether it is significant" },
        { en: "Ask for clarification if an instruction is unclear, rather than guessing" },
        { en: "Maintain a clean, organized, and safe working environment throughout the watch" },
        { en: "Follow engine room communication discipline exactly as demonstrated, including proper use of standard phrases when reporting" },
      ],
      equipment: [
        { en: "Cleaning materials and basic hand tools" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Deciding an observation is not worth reporting rather than letting the supervising rating or engineer assess it" },
        { en: "Losing concentration during a long or repetitive task, missing something worth reporting" },
        { en: "Neglecting housekeeping standards during a quiet period, assuming it matters less when nothing else is happening" },
        { en: "Standing too close to machinery while cleaning, out of habit or inattention" },
      ],
      bestPractices: [
        { en: "Report every observation to the supervising rating or engineer, however minor it seems" },
        { en: "Maintain the same standard of housekeeping and attentiveness throughout the watch, not only when directly supervised" },
        { en: "Ask for clarification immediately if an instruction or observation is not understood" },
        { en: "Treat every cleaning task as an opportunity to notice the engine room's normal condition, so anything unusual stands out" },
      ],
      commonMistakes: [
        { en: "Deciding an observation is not worth reporting" },
        { en: "Letting housekeeping standards slip during a quiet or repetitive period" },
        { en: "Standing closer to machinery than necessary while cleaning" },
        { en: "Disengaging mentally during a long watch instead of maintaining active attention" },
      ],
      professionalTips: [
        { en: "A clean engine room isn't just tidy — it's easier to spot when something is wrong" },
        { en: "Report everything you notice — the watchkeeping engineer would rather hear about something unimportant than miss something that mattered" },
        { en: "The discipline you build in routine tasks now is the same discipline that will define you as a Motorman or Oiler" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }, { kind: "lesson", lessonId: "e1-l6" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Wiper continues assigned engine room tasks — cleaning, housekeeping, and simple assistance — while the engine team maintains readiness for a possible unplanned departure. The Wiper's contribution during this phase is largely unchanged from routine navigation: steady, reliable task execution, with continued attention to anything unusual that might affect the engine room's readiness." },
      responsibilities: [
        { en: "Carry out assigned cleaning, housekeeping, and basic tasks as instructed during the anchor period" },
        { en: "Report anything observed that seems unusual to the supervising rating or engineer, without deciding whether it matters" },
        { en: "Maintain the same standard of attentiveness and safety awareness as during active navigation, even though the vessel is not underway" },
        { en: "Ask for clarification if an instruction is unclear" },
        { en: "Follow PPE and safety requirements exactly as instructed" },
      ],
      equipment: [
        { en: "Cleaning materials and basic hand tools" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Assuming tasks matter less during anchoring because the vessel is stationary" },
        { en: "Missing an observation worth reporting due to reduced attentiveness during a quieter phase" },
        { en: "Standing too close to machinery while cleaning, out of habit or inattention" },
        { en: "Treating an extended anchor period as a reason to relax standards" },
      ],
      bestPractices: [
        { en: "Maintain the same standard of attention and safety awareness during anchoring as during any other phase" },
        { en: "Report anything unusual immediately, regardless of how quiet the period seems" },
        { en: "Use routine tasks during anchoring as an opportunity to reinforce good habits" },
        { en: "Stay aware that the engine room's readiness matters even when the vessel is not moving" },
      ],
      commonMistakes: [
        { en: "Relaxing attentiveness because the vessel is at anchor" },
        { en: "Assuming a quiet period means observations are less important" },
        { en: "Standing closer to machinery than necessary while cleaning" },
        { en: "Treating routine tasks as less significant during anchoring than during navigation" },
      ],
      professionalTips: [
        { en: "The vessel being at anchor doesn't mean the engine room stops needing attention — readiness continues quietly" },
        { en: "Consistency in your standards, whether underway or at anchor, is exactly what builds a reputation for reliability" },
        { en: "A quiet period is a good time to build the habits that will matter during a busier one" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Wiper is exposed to more intensive engine room activity — maintenance work, bunkering support, and cargo pump operation if applicable — carrying out assigned cleaning, housekeeping, and simple assistance tasks under supervision. Port stays intensify the pace of engine room work, and the Wiper's reliability in routine tasks becomes especially valuable when the team's attention is stretched across more activity." },
      responsibilities: [
        { en: "Carry out assigned cleaning and housekeeping tasks in support of maintenance or bunkering activity, exactly as instructed" },
        { en: "Assist with simple tasks during bunkering or cargo pump operations (if applicable) only as explicitly assigned, without expanding the assigned role" },
        { en: "Report anything unusual observed during port activity to the supervising rating or engineer immediately" },
        { en: "Ask for clarification on any unfamiliar task before attempting it" },
        { en: "Follow PPE and safety requirements exactly as instructed, particularly around bunkering and maintenance activities" },
      ],
      equipment: [
        { en: "Cleaning materials and basic hand tools" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Standing too close to active bunkering or maintenance work out of curiosity, without recognizing the hazard" },
        { en: "Attempting to assist beyond an assigned task during a busy or safety-critical port operation" },
        { en: "Missing an observation worth reporting due to the increased pace and activity in port" },
        { en: "Neglecting housekeeping standards under time pressure" },
      ],
      bestPractices: [
        { en: "Stay at a safe distance from active bunkering or maintenance work unless directly assigned a task within it" },
        { en: "Maintain housekeeping standards even under the increased pace of a port stay" },
        { en: "Report anything unusual immediately, even during a busy period" },
        { en: "Ask before attempting an unfamiliar task, however routine it may look under time pressure" },
      ],
      commonMistakes: [
        { en: "Getting too close to bunkering or maintenance activity out of curiosity" },
        { en: "Letting housekeeping standards slip because the pace of work has increased" },
        { en: "Attempting a task beyond what was assigned during a busy period" },
        { en: "Failing to report something unusual because attention is stretched across more activity" },
      ],
      professionalTips: [
        { en: "Port stays test whether your habits hold up under a faster pace — that's exactly when good habits matter most" },
        { en: "Bunkering and major maintenance work happen more often in port — pay close attention to what you're allowed to observe" },
        { en: "Reliable, careful task execution during a busy port stay is noticed and remembered" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }, { kind: "lesson", lessonId: "e4-l1" }],
    },

    ship_to_ship_operations: {
      overview: { en: "During STS operations, the Wiper remains in the engine room, carrying out assigned cleaning, housekeeping, or simple assistance tasks while the engine team maintains propulsion and manoeuvring readiness throughout the operation. The Wiper's role here is deliberately narrow, given the elevated risk of the overall operation and the coordination required between the engine room, the bridge, and the counterpart vessel." },
      responsibilities: [
        { en: "Carry out assigned tasks exactly as instructed by the supervising rating or engineer, without independently expanding the assigned role" },
        { en: "Remain in the position assigned throughout the operation" },
        { en: "Report anything unusual observed to the supervising rating or engineer immediately" },
        { en: "Ask for clarification before attempting any unfamiliar action related to the operation" },
        { en: "Follow PPE and safety requirements exactly as instructed, with particular attention to the heightened risk of this operation" },
      ],
      equipment: [
        { en: "Personal protective equipment as instructed" },
        { en: "Basic tools and materials, used under direct supervision" },
      ],
      risks: [
        { en: "Underestimating the importance of continuous readiness because the visible action is happening elsewhere on the vessel" },
        { en: "Attempting to assist beyond an assigned task during a high-risk operation" },
        { en: "Assuming a minor observation is not worth reporting during a busy operation" },
        { en: "Losing attentiveness during a long or repetitive phase of the operation" },
      ],
      bestPractices: [
        { en: "Stay exactly where positioned throughout the operation, regardless of how routine it appears" },
        { en: "Report observations immediately, however minor they seem" },
        { en: "Ask before attempting anything not explicitly assigned" },
        { en: "Treat every STS operation with the same level of attention, regardless of how many you have experienced" },
      ],
      commonMistakes: [
        { en: "Assuming your task is unimportant because the main visible activity is elsewhere" },
        { en: "Losing attentiveness because the engine room's part of the operation appears uneventful" },
        { en: "Deciding an observation is too minor to mention" },
        { en: "Attempting to help beyond the assigned task" },
      ],
      professionalTips: [
        { en: "STS operations depend on more than what is visible on deck — every reliable task in the engine room supports the whole operation's safety" },
        { en: "Your attentiveness during a routine-looking phase is exactly what makes a fast response possible if something changes" },
        { en: "The habits of precision and reliability you build here are the same ones that will define you at a higher rank" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },

    maintenance: {
      overview: { en: "Maintenance is where the Wiper gets the most hands-on experience and the clearest opportunities to build technique — assisting the Motorman, Oiler, and engineers with real engine room maintenance tasks under close supervision. This phase offers genuine opportunities to practice skills directly, provided every task is properly supervised and the Wiper never exceeds their demonstrated competence." },
      responsibilities: [
        { en: "Assist with assigned maintenance tasks (cleaning, basic component maintenance, lubrication support, parts handling) exactly as instructed, under direct supervision from the Motorman, Oiler, or an assigned engineer" },
        { en: "Ask for a demonstration before attempting an unfamiliar task, rather than guessing at the correct technique" },
        { en: "Report task progress and completion honestly, including any part not confidently understood" },
        { en: "Observe how the supervising rating or engineer inspects work and decides whether it meets standard" },
        { en: "Follow all PPE and safety requirements exactly as instructed for the specific task, particularly around hot surfaces, moving parts, and chemical handling" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task" },
        { en: "Maintenance tools and materials, used only as instructed and under supervision" },
      ],
      risks: [
        { en: "Attempting a task technique without having it properly demonstrated first, risking poor quality work or injury" },
        { en: "Overstating confidence in a task to avoid appearing inexperienced, then performing it incorrectly" },
        { en: "Missing the opportunity to understand why a maintenance standard exists, treating the task only as a mechanical action" },
        { en: "Using tools, products, or procedures incorrectly due to insufficient supervision or unclear instruction" },
      ],
      bestPractices: [
        { en: "Ask to see a task demonstrated before attempting it yourself, even if it looks straightforward" },
        { en: "Be honest about your confidence level for a given task — supervision is calibrated to what you actually know, not what you claim to know" },
        { en: "Watch how the supervising rating or engineer inspects finished work, not only how they perform it" },
        { en: "Use every maintenance task as a chance to build real technique, since these are skills you will rely on directly as a Motorman or Oiler later" },
      ],
      commonMistakes: [
        { en: "Attempting a technique without asking for a demonstration first" },
        { en: "Claiming more confidence in a task than is genuinely felt, out of concern about appearing inexperienced" },
        { en: "Treating a maintenance task as a box to check rather than a skill to build" },
        { en: "Rushing a task without a clear understanding of the standard it needs to meet" },
      ],
      professionalTips: [
        { en: "There is no reward for pretending to already know a technique — asking for a demonstration is exactly what this stage of your career is for" },
        { en: "The maintenance skills you build now as a Wiper are the same ones you'll be expected to already have as a Motorman or Oiler — take them seriously" },
        { en: "Watching how work gets inspected teaches you as much as watching how it gets done" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Wiper proceeds to an assigned muster station and carries out real tasks as part of the emergency team, under the direct instruction of the officer or rating in charge — a genuine operational role, not just observation, but still closely directed rather than independently judged. The Wiper's contribution during a drill or real emergency is measured by how precisely instructions are followed and how reliably an assigned function is performed under pressure." },
      responsibilities: [
        { en: "Proceed immediately to the assigned muster station upon hearing the alarm, exactly as required by the muster list" },
        { en: "Carry out the specific task assigned by the officer or rating in charge of the station precisely as instructed" },
        { en: "Report task completion or any difficulty immediately and clearly to the station leader" },
        { en: "Ask for clarification if an instruction during a drill is not understood, rather than guessing" },
        { en: "Take every drill with full seriousness, treating it as genuine practice for the emergency response expected at every rank" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list" },
        { en: "Emergency equipment specific to the assigned station, used under direct supervision" },
      ],
      risks: [
        { en: "Hesitating or improvising when an instruction is unclear, rather than asking immediately" },
        { en: "Treating a drill as less serious than a genuine emergency, reducing its training value" },
        { en: "Losing focus on the assigned task while trying to observe the broader response" },
        { en: "Reporting task completion inaccurately under pressure, rather than confirming it is genuinely done" },
      ],
      bestPractices: [
        { en: "Execute the assigned task precisely, and confirm completion clearly to the station leader" },
        { en: "Ask immediately if an instruction is unclear — hesitation costs more time than a quick question" },
        { en: "Treat every drill exactly as you would a genuine emergency, building the habits that will matter when it counts" },
        { en: "Stay focused on your assigned task first, understanding the broader response through the post-drill debrief" },
      ],
      commonMistakes: [
        { en: "Guessing at an unclear instruction instead of asking immediately" },
        { en: "Going through the motions of a drill without full engagement" },
        { en: "Becoming distracted by the wider situation instead of completing the assigned task" },
        { en: "Reporting a task as done before genuinely confirming it" },
      ],
      professionalTips: [
        { en: "In an emergency, precision and speed both matter — but precision comes first, because a fast mistake is still a mistake" },
        { en: "The habits you build in every drill are the habits that will actually show up in a real emergency — there is no separate 'serious mode'" },
        { en: "Being reliably instructable under pressure is exactly what earns you more independent responsibility during the next drill" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l8" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "You are assigned to clean an area using a product you don't recognize from previous tasks. The label is partially worn and you're not entirely sure what it is or how it should be used." },
      mission: { en: "Decide whether to proceed using your best guess or check first." },
      expectedActions: [
        { en: "Do not use an unfamiliar product based on assumption" },
        { en: "Ask the supervising Motorman, Oiler, or engineer to confirm what it is and how it should be used" },
        { en: "Wait for confirmation before proceeding" },
        { en: "Report clearly if you cannot identify the product at all" },
      ],
      why: [{ en: "Chemicals in the engine room can have specific handling requirements, incompatibilities with certain surfaces, or safety precautions that are not obvious from a worn label — proceeding on a guess risks both the task and personal safety." }],
      commonMistakes: [
        { en: "Using the product anyway because it 'looks similar' to something familiar" },
        { en: "Guessing at the correct method rather than asking" },
        { en: "Not mentioning the unclear labeling at all" },
      ],
      safetyPoints: [{ en: "Unlabeled or partially labeled chemicals should never be used without confirmation — this applies even under time pressure or when a task seems urgent." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l3" }],
    },
    {
      situation: { en: "A Motorman corrects the same aspect of your technique for the third time. You feel you understand what's being asked but keep making the same small mistake under pressure." },
      mission: { en: "Decide how to respond to repeated correction on the same point." },
      expectedActions: [
        { en: "Acknowledge the correction without becoming defensive, even though it's the third time" },
        { en: "Ask directly what specifically is going wrong, rather than assuming you already understand" },
        { en: "Consider whether slowing down or a different approach would help avoid the same mistake" },
        { en: "Thank the Motorman for the patience shown rather than treating the repetition as a sign of failure" },
      ],
      why: [{ en: "Repeated correction on the same point usually means the underlying cause hasn't been identified yet, not that the correction itself is unnecessary — asking specifically what's going wrong is more useful than simply promising to try harder." }],
      commonMistakes: [
        { en: "Becoming visibly frustrated or defensive at being corrected again" },
        { en: "Assuming you understand without actually confirming what specifically keeps going wrong" },
        { en: "Avoiding the conversation about why the mistake keeps recurring" },
      ],
      safetyPoints: [],
      mapReferences: [],
    },
    {
      situation: { en: "While cleaning around a piece of equipment, you notice a small amount of fluid that doesn't look like it belongs there. It's a small amount, and you're not sure if it's normal or worth mentioning." },
      mission: { en: "Decide whether to report the observation or continue with the task." },
      expectedActions: [
        { en: "Report the observation to the supervising rating or engineer immediately, factually describing what you saw (location, amount, appearance)" },
        { en: "Do not attempt to clean it up or investigate it yourself before reporting" },
        { en: "Do not decide in advance that it's 'probably nothing'" },
      ],
      why: [{ en: "A small amount of unexpected fluid can be the earliest visible sign of a developing leak — the Wiper's job is to report what is observed factually, not to judge its significance, which belongs to someone with more experience and context." }],
      commonMistakes: [
        { en: "Deciding the observation is too minor to mention" },
        { en: "Cleaning it up before reporting it, losing the chance for anyone to assess it" },
        { en: "Assuming someone else has probably already noticed" },
      ],
      safetyPoints: [{ en: "Reporting small, early signs promptly is exactly what prevents them from becoming larger problems — this is one of the most valuable things a Wiper can do." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },
  ],

  professionalTips: [
    { en: "Report what you observe, not what you assume it means — that judgment call belongs to the Motorman, Oiler, or engineer supervising you." },
    { en: "When something is unfamiliar — a product, a fitting, a procedure — that's the moment to ask, not to guess based on something similar." },
    { en: "Repeated correction usually means the real cause hasn't been found yet — ask specifically what's going wrong, rather than just trying harder at the same thing." },
    { en: "A clean, well-organized engine room is not a minor task — it is what makes problems easier to spot for everyone." },
    { en: "Precision matters more than speed at this stage — a fast, careless action teaches you less than a slow, correct one." },
    { en: "The supervision you have now won't last forever — use it deliberately, while it's there, to build habits that will hold up without it." },
    { en: "Every task you're trusted with a little more independence on is a task you earned trust on before — reliability compounds." },
    { en: "Being a Wiper is not about proving you're ready for more responsibility — it's about actually becoming ready, one demonstrated task at a time." },
  ],

  professionalMindset: [
    { en: "See yourself as building toward independence, not yet possessing it. Every task you execute is real work, but the judgment behind it still belongs to whoever supervises you — your role is to execute precisely and flag what you notice, not to decide what matters." },
    { en: "Treat close supervision as the mechanism of your progress, not a ceiling on it. The scope of what you're trusted with grows exactly as fast as your demonstrated reliability — supervision is not a fixed limitation, it is a responsive one." },
    { en: "Assume the unfamiliar deserves a question, not a guess. An unlabeled product, an unusual fitting, an unexpected observation — these are exactly the moments where checking first protects you and the task." },
    { en: "Recognize that a clean, organized environment is part of the work, not separate from it. Housekeeping in the engine room isn't a lesser task compared to technical work — it directly supports safety and makes problems visible sooner." },
    { en: "Accept that repeated correction is information, not judgment. If the same mistake keeps happening, the goal is to understand why, not simply to feel bad about it or promise to try harder." },
    { en: "Recognize that reporting factually, without interpreting, is itself a skill. Passing along exactly what you observed — not what you think it means — gives your supervisor a cleaner picture than a filtered or pre-judged one." },
    { en: "Accept that trust is built specifically, not generally. Being trusted with one task doesn't automatically extend to another — each new piece of responsibility is usually earned on its own terms." },
  ],

  professionalDocumentation: [
    { en: "Sea time and service records — The Wiper's sea time is recorded and confirmed as required by flag State regulations, directly supporting eventual eligibility for Motorman or Oiler certification — accuracy here matters just as much as at every other rank." },
    { en: "Task completion reporting — When the Wiper reports a task as complete to the supervising rating or engineer, this report is often taken at face value for routine matters — making honest, accurate reporting a genuine professional responsibility, not just good practice." },
    { en: "Maintenance and defect observations — When the Wiper notices something during a task (a developing leak, an unusual condition), reporting it clearly and factually to the supervising rating or engineer contributes directly to the department's maintenance records, even though the Wiper does not maintain those records personally." },
    { en: "Training and competency progress — Where the company or training pathway tracks the Wiper's demonstrated competencies toward Motorman or Oiler qualification, the Wiper ensures this record is accurate and genuinely reflects tasks performed and supervision received, rather than tasks merely attempted." },
    { en: "Why this matters: The Wiper's documentation responsibility sits at the foundation of what every subsequent rank builds on: honest, accurate reporting of tasks completed, competencies genuinely demonstrated, and things noticed but not yet understood. Building this habit now — before it carries any formal weight — is what will make the Wiper's future reports as a Motorman, Oiler, or officer something the whole department can trust without double-checking." },
  ],

  environmentalResponsibilities: [
    { en: "Following environmental procedures in real tasks — The Wiper applies waste segregation, product handling, and pollution prevention procedures exactly as instructed during cleaning and maintenance tasks — this is genuine practice, not observation, and it is exactly what the Wiper will rely on independently at a higher rank." },
    { en: "Correct product and material handling — The Wiper follows instructions precisely regarding which cleaning products, materials, and disposal methods apply to a given task, asking for clarification rather than assuming when uncertain, particularly with unfamiliar or partially labeled products." },
    { en: "Reporting anything unusual immediately — If the Wiper notices an unexpected discharge, spill, leak, or unclear waste handling situation during a task, they report it to the supervising rating or engineer immediately, rather than deciding independently whether it is significant enough to mention." },
    { en: "Building environmental discipline through repetition — Each task where environmental procedure is followed correctly under supervision builds the habit that will define the Wiper's independent practice at a higher rank, where verification will no longer be automatic." },
    { en: "Why this matters: The Wiper's environmental responsibility is about correctly executing real procedures in real tasks, with the safety net of supervision still in place. The habits built now, particularly around reporting anything unusual immediately rather than filtering it, are exactly what will protect the vessel's environmental compliance once that supervision naturally decreases — and given how central these procedures are to daily engine room work, this foundation matters early." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Execute assigned tasks within your demonstrated competence, under the supervision of the Motorman, Oiler, or engineer" },
      { en: "Ask any crew member or officer to clarify an instruction or demonstrate a technique" },
      { en: "Report anything observed that seems unclear, unsafe, or worth mentioning, to your supervising rating or officer" },
      { en: "Refuse to proceed with a task you do not understand or feel unprepared for, requesting clarification first" },
      { en: "Request feedback on your performance from your supervising rating or officer" },
    ],
    youCannot: [
      { en: "Perform a task independently without supervision, unless explicitly authorized by the supervising rating or engineer for that specific task" },
      { en: "Interpret or judge the significance of an observation on the vessel's behalf — report it factually and let the supervising rating or engineer assess it" },
      { en: "Stand an independent watch or emergency station role without direct supervision" },
      { en: "Correct or discipline another crew member, regardless of what is observed" },
      { en: "Sign off, verify, or confirm any operational readiness, safety check, or compliance matter on the vessel's behalf" },
      { en: "Represent the vessel or the company in any interaction with external parties (shore engineers, surveyors, authorities)" },
    ],
  },

  commonMistakes: [
    { en: "Relying on assumption instead of verifying — Using an unfamiliar product or attempting an unfamiliar task based on how similar it seems to something known, without checking first." },
    { en: "Filtering observations before reporting — Deciding something is 'probably not worth mentioning' instead of reporting it factually and letting the supervising rating or engineer judge its significance." },
    { en: "Overstating confidence to avoid seeming inexperienced — Claiming to understand or be ready for a task rather than honestly flagging uncertainty, risking a poorly executed or unsafe outcome." },
    { en: "Taking correction personally rather than practically — Reacting defensively to repeated feedback instead of asking specifically what keeps going wrong." },
    { en: "Treating housekeeping as less important than technical tasks — Letting cleaning and organization standards slip under the assumption that this work matters less than more visible tasks." },
    { en: "Mistaking one success for readiness — Assuming that performing a task correctly once under supervision means it can now be performed independently." },
    { en: "Losing engagement during routine or quiet moments — Treating a repetitive task or a quiet period as a time to disengage rather than to keep building attentiveness and technique." },
    { en: "Escalating too slowly or not at all — Hesitating to report an uncertain situation (an unusual observation, an unclear instruction) out of concern about seeming unsure." },
  ],

  careerProgression: [
    { en: "Next role: Motorman or Oiler, depending on company structure and vessel type — engine room rating progression varies between companies, and some vessels do not distinguish these as separate roles from one another. The Wiper's actual next step should be confirmed against their specific company's structure." },
    { en: "Skills to develop: Consistent, reliable technique across the full range of basic engine room tasks (cleaning, basic maintenance, material handling) without requiring correction; growing familiarity with engine room systems and terminology; the judgment to recognize when a situation departs from the routine and to report or escalate appropriately; increasing initiative within the bounds of what is actually authorized." },
    { en: "Recommended experience: A demonstrated track record across a wide range of tasks and conditions, with consistent reliability, honest reporting, and a visible pattern of the supervising Motorman, Oiler, or engineer extending trust and independence over time; sufficient sea time as required for further certification." },
    { en: "Certificates typically required: Requirements vary by flag State and company policy. Progression typically requires a minimum period of qualifying sea service and completion of any required basic training and safety certification relevant to the next rating role." },
    { en: "Recommended MAP courses: All foundational Engine lessons relevant to Motorman/Oiler competency (engine systems, maintenance, watchkeeping basics, safety); Role On Board – Fourth Engineer (to preview the officer path); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving beyond Wiper means the supervision that has shaped your technique begins to step back, and the judgment you've only practiced under guidance becomes something you exercise on your own. The transition is not about knowing more than you did as a Wiper — it is about being trusted to act on what you already know, and to recognize, without being told, when a situation calls for more than routine execution." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "e1-l1", label: { en: "Main Engine" } },
    { kind: "lesson", lessonId: "e1-l2", label: { en: "Auxiliaries & Electricity" } },
    { kind: "lesson", lessonId: "e1-l4", label: { en: "Fire Safety & CO2 System" } },
    { kind: "lesson", lessonId: "e1-l5", label: { en: "Survival & EPIRB" } },
    { kind: "lesson", lessonId: "e1-l6", label: { en: "Maintenance & Troubleshooting" } },
    { kind: "lesson", lessonId: "e1-l8", label: { en: "Emergency Procedures" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "lesson", lessonId: "s6-l3", label: { en: "PPE, Safe Behaviour & Human Factors" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — foundational engine room and machinery terminology" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on rating structure, sea time requirements, and Motorman/Oiler certification pathway by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore vessel types and basic machinery layouts to build familiarity across different ships" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on task technique, certification requirements, or basic engine room practice" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Wiper through to Motorman/Oiler and beyond" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time and demonstrated competencies" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_ENGINE_CADET", label: { en: "Role On Board — Engine Cadet" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_FOURTH_ENGINEER", label: { en: "Role On Board — Fourth Engineer" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "Assigned cleaning, housekeeping, and basic engine room tasks, under supervision that decreases as competence is demonstrated" },
      { en: "Basic assistance tasks (tool handling, material handling) as instructed" },
      { en: "Task completion reports, honestly and promptly" },
    ],
    iMonitor: [
      { en: "My own technique and understanding against what has been demonstrated, checking rather than assuming" },
      { en: "Hazards directly relevant to my assigned task (moving equipment, chemicals, hot surfaces, confined spaces)" },
      { en: "The general condition of the engine room environment during routine tasks" },
    ],
    iReport: [
      { en: "Task completion or difficulty, honestly and without overstating confidence" },
      { en: "Any observation (unusual fluid, unfamiliar smell, unclear labeling) factually, without interpreting its significance" },
      { en: "Any uncertain situation immediately, for escalation" },
    ],
    iDoNotAuthorize: [
      { en: "Any independent decision affecting the vessel's safety, machinery operation, or environmental compliance" },
      { en: "My own progression to unsupervised task performance, without confirmation from the supervising rating or engineer" },
      { en: "Any correction or instruction directed at another crew member" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Wiper task scope showing widening responsibilities as competence is demonstrated toward Motorman/Oiler." } },
    { kind: "image", caption: { en: "Example of proper PPE and cleaning technique in an engine room environment." } },
    { kind: "diagram", caption: { en: "Engine department organization chart showing the Wiper's position between Engine Cadet and Motorman/Oiler." } },
    { kind: "video", caption: { en: "Demonstration of correct product handling and labeling verification." } },
    { kind: "document", caption: { en: "Sample sea time / competency progress record for Motorman/Oiler certification." } },
  ],
};

// ── MOTORMAN ───────────────────────────────────────────────────
// mapReferences resolved via Mission D (see
// audits/2026-07-30_role-on-board-motorman-mapreferences.md) and the
// Product Owner's final decisions on that report. All lessonId used are
// verified to exist in lessonRegistry.ts and to target "motorman". As
// identified in the Mission D report, e1-l7 (Engine Watchkeeping) — the
// most directly relevant lesson for this card's watch-support content —
// excludes "motorman" from its targetRanks; this is a real content gap,
// not a behavioral/meta skill gap, and was deliberately NOT corrected
// here (targetRanks in lessonRegistry.ts was left untouched per explicit
// instruction). Locations with no validated correspondence are left as
// mapReferences: [] intentionally (practical scenario 2, the
// "Watch-support duties" skill — blocked by the e1-l7 exclusion — and
// several behavioral/meta skills that no existing lesson content covers).
const MOTORMAN_CARD: RoleOnBoardCard = {
  rankId: "motorman",

  // ─────────────────────────────────────────────
  // FONDATIONS
  // ─────────────────────────────────────────────
  roleOverview: [
    { en: "The Motorman is an engine room rating with a broader scope of responsibility than the Wiper — carrying out maintenance tasks, assisting during watchkeeping, operating basic engine room equipment, and performing routine inspections with a growing degree of independent judgment. Unlike the Wiper, whose tasks remain deliberately narrow and closely supervised, the Motorman is trusted to complete a wider range of tasks with less constant oversight, while still working under the direction of the Oiler, watchkeeping engineer, or Chief Engineer for anything beyond routine, well-defined work." },
    { en: "The Motorman's judgment is exercised within a defined scope: recognizing when a routine task requires escalation, and recognizing abnormal sounds, vibrations, leaks, or operating conditions that require reporting, correctly interpreting instructions without needing every detail specified, and maintaining safe, reliable execution across a wider variety of engine room tasks than the Wiper handles. The Motorman is not yet expected to interpret ambiguous or unfamiliar situations independently at the level of an Oiler or officer — that judgment still belongs above the Motorman when a situation genuinely departs from the routine." },
    { en: "The Motorman's progression is measured by demonstrated competence across a widening range of maintenance and watch-support tasks, and by the confidence the Oiler, watchkeeping engineer, or Chief Engineer places in the Motorman's judgment as that competence is repeatedly demonstrated." },
    { en: "The Motorman works closely with the Oiler and watchkeeping engineers, often assisting directly during watch duties and maintenance work, and may help coach a Wiper on straightforward tasks under the oversight of a senior rating or engineer." },
    { en: "Where the Wiper executes precisely defined, lower-risk tasks under close supervision, the Motorman is trusted to complete a broader set of tasks correctly with less constant checking — but still defers upward the moment a situation requires judgment beyond what has been explicitly covered. Knowing when to stop and seek guidance is part of the Motorman's professional competence, not a sign of weakness." },
  ],

  organizationalPosition: {
    reportsTo: [
      { en: "Oiler or watchkeeping engineer (day-to-day task supervision and watch-related duties)" },
      { en: "Chief Engineer (overall standards and training)" },
    ],
    worksWith: [
      { en: "Oiler, with whom the Motorman frequently works during watchkeeping and maintenance" },
      { en: "Wiper, whom the Motorman may coach on straightforward tasks under senior oversight" },
      { en: "Watchkeeping engineers, during watch-support duties" },
    ],
    mentors: [
      { en: "The Oiler and watchkeeping engineers, who guide the Motorman's technique and judgment" },
      { en: "The Chief Engineer, who oversees standards and training progression across the rating structure" },
    ],
    supports: [
      { en: "The Motorman may help coach a Wiper on straightforward tasks, but does so under the oversight of a senior rating or engineer rather than as an independent supervisory responsibility" },
    ],
  },

  professionalSkills: [
    { label: { en: "Engine room maintenance execution across a range of tasks" }, mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }] },
    { label: { en: "Watch-support duties and basic monitoring assistance" }, mapReferences: [] },
    { label: { en: "Recognizing when a task requires escalation beyond routine execution" }, mapReferences: [] },
    { label: { en: "Following instructions precisely while exercising sound judgment within a defined scope" }, mapReferences: [] },
    { label: { en: "Basic safety awareness and PPE compliance" }, mapReferences: [{ kind: "lesson", lessonId: "s6-l3" }, { kind: "lesson", lessonId: "s6-l1" }] },
    { label: { en: "Guiding junior ratings (Wiper) on straightforward tasks under senior oversight" }, mapReferences: [] },
    { label: { en: "Honest self-assessment and reporting of task completion and observations" }, mapReferences: [] },
    { label: { en: "Professional conduct and reliability within the engine team" }, mapReferences: [] },
  ],

  // ─────────────────────────────────────────────
  // LES 8 PHASES OPÉRATIONNELLES
  // ─────────────────────────────────────────────
  operationalPhases: {
    pre_departure_preparation: {
      overview: { en: "Before departure, the Motorman carries out a wider range of pre-departure checks than the Wiper — fluid levels, auxiliary machinery status, basic system checks — with a degree of independent judgment about what 'normal' looks like, while still escalating anything uncertain to the Oiler, watchkeeping engineer, or Chief Engineer rather than deciding alone. The Motorman's contribution here is genuine technical verification, not just task completion, though the final judgment on overall readiness remains with the supervising engineer." },
      responsibilities: [
        { en: "Carry out assigned pre-departure checks (fluid levels, auxiliary machinery status, standby equipment) with judgment about what constitutes a normal reading or condition, escalating anything uncertain" },
        { en: "Assist the watchkeeping engineer or Oiler with main engine and propulsion readiness verification, contributing observations rather than only following instructions step by step" },
        { en: "Report check results clearly and honestly, distinguishing what was confirmed normal from what requires further attention" },
        { en: "Ask for clarification when a reading or condition is genuinely ambiguous, rather than assuming it is fine or assuming it is a problem" },
        { en: "Follow all PPE and safety requirements exactly as instructed" },
      ],
      equipment: [
        { en: "Personal protective equipment (ear protection, safety shoes, coveralls, gloves)" },
        { en: "Engine room monitoring instruments and basic tools" },
        { en: "Departure checklist / work list" },
      ],
      risks: [
        { en: "Misjudging a borderline reading as normal without escalating it, when a more experienced rating or engineer would have flagged it" },
        { en: "Overstating confidence in a check result to move faster, missing something that needed attention" },
        { en: "Escalating every minor variation unnecessarily, rather than developing genuine judgment about what warrants attention" },
        { en: "Rushing checks under time pressure, missing a step that would normally be caught" },
      ],
      bestPractices: [
        { en: "Develop a genuine sense of what 'normal' looks like for each system, rather than mechanically following a checklist without understanding it" },
        { en: "Escalate anything genuinely uncertain, but distinguish uncertainty from routine variation as your judgment develops" },
        { en: "Report specific, factual observations rather than vague reassurances" },
        { en: "Ask the Oiler or watchkeeping engineer to explain their reasoning when a borderline reading is discussed, to build your own judgment over time" },
      ],
      commonMistakes: [
        { en: "Treating a borderline reading as acceptable without genuinely evaluating it" },
        { en: "Escalating routine variations unnecessarily out of excess caution, without developing real judgment" },
        { en: "Reporting a vague 'all fine' instead of specific, factual results" },
        { en: "Rushing pre-departure checks because they feel routine" },
      ],
      professionalTips: [
        { en: "Your judgment on what's 'normal' is being built right now, check by check — take each one seriously, not just as a box to tick" },
        { en: "The line between a variation and a genuine concern is exactly what experience teaches you — ask about the ones you're unsure of" },
        { en: "A Motorman who reports specific observations, not just conclusions, is far more useful to whoever makes the final readiness call" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l1" }, { kind: "lesson", lessonId: "e2-l1" }],
    },

    departure_manoeuvres: {
      overview: { en: "During departure manoeuvres, the Motorman assists in the engine room or engine control room with a more active role than the Wiper — supporting the watchkeeping engineer's execution of engine telegraph commands and standby procedures, and contributing observations about engine response rather than only executing assigned tasks. The Motorman does not make manoeuvring decisions, but is trusted to notice and report when something doesn't look or sound right." },
      responsibilities: [
        { en: "Assist the watchkeeping engineer with executing engine orders and monitoring engine response, escalating anything that seems abnormal" },
        { en: "Maintain awareness of engine parameters and behaviour throughout the manoeuvre, reporting observations rather than waiting to be asked" },
        { en: "Carry out assigned tasks precisely, while contributing relevant observations when appropriate" },
        { en: "Ask for clarification if an instruction is unclear, rather than guessing during an active manoeuvre" },
        { en: "Follow PPE and safety requirements exactly, with no exceptions during active operations" },
      ],
      equipment: [
        { en: "Personal protective equipment (ear protection, safety shoes, coveralls, gloves)" },
        { en: "Engine room monitoring and control equipment, used under supervision" },
        { en: "Portable radio, if assigned for communication" },
      ],
      risks: [
        { en: "Noticing an abnormal engine response but hesitating to report it, assuming the watchkeeping engineer has already seen it" },
        { en: "Misjudging the significance of an observation, either over- or under-reporting its urgency" },
        { en: "Standing too close to moving machinery due to inattention during a demanding moment" },
        { en: "Losing focus during a routine-seeming manoeuvre, missing an early sign of a developing issue" },
      ],
      bestPractices: [
        { en: "Report engine observations proactively rather than waiting to be asked, particularly anything that departs from what's expected" },
        { en: "Trust your growing sense of what's normal, but escalate genuine uncertainty rather than deciding alone" },
        { en: "Stay engaged throughout the manoeuvre, even when it is proceeding smoothly" },
        { en: "Communicate observations clearly and specifically, using the terminology the team relies on" },
      ],
      commonMistakes: [
        { en: "Assuming someone else has already noticed an abnormal observation" },
        { en: "Either over-escalating minor variations or under-reporting genuine concerns, without a clear sense of the difference yet" },
        { en: "Losing attentiveness during a routine manoeuvre" },
        { en: "Communicating an observation vaguely rather than specifically" },
      ],
      professionalTips: [
        { en: "A Motorman who reports early and factually is more valuable than one who waits to be sure — let the watchkeeping engineer decide what matters" },
        { en: "Developing your sense of what's routine versus what's genuinely worth flagging takes deliberate attention, manoeuvre after manoeuvre" },
        { en: "Precision in communication is what makes your observations actually useful under time pressure" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l1" }],
    },

    navigation: {
      overview: { en: "During navigation, the Motorman regularly assists the watchkeeping engineer with monitoring duties — reading gauges, checking parameters, conducting rounds — with a genuine contribution to the watch rather than only performing assigned tasks. The Motorman does not stand an independent watch, but is trusted to interpret routine readings and flag genuine concerns without needing every observation double-checked." },
      responsibilities: [
        { en: "Assist the watchkeeping engineer with monitoring tasks (parameter checks, rounds, logging) with growing independence in interpreting routine readings" },
        { en: "Report anything observed that departs from normal conditions promptly and specifically, distinguishing what seems routine from what seems genuinely concerning" },
        { en: "Ask the watchkeeping engineer to clarify reasoning behind a decision when the opportunity allows, to build understanding for future independent judgment" },
        { en: "Carry out rounds and checks thoroughly, understanding what each check verifies rather than treating it mechanically" },
        { en: "Follow engine room communication discipline exactly as demonstrated, including proper use of standard phrases and reporting formats" },
      ],
      equipment: [
        { en: "Engine room monitoring and control equipment" },
        { en: "Rounds checklist / logging materials" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Misjudging a reading as routine when it actually warranted escalation, due to still-developing judgment" },
        { en: "Becoming overconfident in interpreting readings independently before genuine competence supports it" },
        { en: "Losing concentration during a long or repetitive round, missing something worth reporting" },
        { en: "Treating a round as a mechanical checklist rather than a genuine verification of engine room condition" },
      ],
      bestPractices: [
        { en: "Build genuine understanding of what each reading or check verifies, not just how to record it" },
        { en: "Report observations with the specific reasoning behind your assessment, so the watchkeeping engineer can quickly confirm or correct your judgment" },
        { en: "Ask about borderline cases actively, using them as opportunities to develop judgment" },
        { en: "Maintain the same thoroughness on a routine round as on one where something seems unusual" },
      ],
      commonMistakes: [
        { en: "Treating a reading as routine without genuinely evaluating it against what's normal" },
        { en: "Assuming independent judgment is appropriate before it has actually been demonstrated and confirmed" },
        { en: "Rushing through a round mechanically instead of genuinely checking each item" },
        { en: "Failing to ask about a borderline case, missing a chance to build judgment" },
      ],
      professionalTips: [
        { en: "The gap between recording a reading and understanding what it means is exactly where your judgment develops — don't skip past it" },
        { en: "Every borderline case you ask about now builds the instinct you'll rely on later as an Oiler" },
        { en: "A thorough, engaged round on a quiet day is what makes you reliable on a demanding one" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e2-l3" }, { kind: "lesson", lessonId: "e2-l1" }],
    },

    anchoring: {
      overview: { en: "During anchoring, the Motorman assists the watchkeeping engineer in maintaining machinery readiness for a possible unplanned departure — monitoring auxiliary systems, conducting rounds, and contributing genuine observations about the engine room's standby condition. The Motorman's role during this phase closely resembles routine navigation, but with particular attention to readiness rather than active operation." },
      responsibilities: [
        { en: "Assist with monitoring auxiliary machinery and standby systems during the anchor period, interpreting routine readings with growing independence" },
        { en: "Report anything observed that seems to depart from normal readiness conditions promptly and specifically" },
        { en: "Conduct rounds thoroughly, understanding what each check confirms about the engine room's readiness to respond if required" },
        { en: "Ask for clarification on borderline observations, rather than assuming they are fine or assuming they require escalation" },
        { en: "Follow PPE and safety requirements exactly as instructed" },
      ],
      equipment: [
        { en: "Engine room monitoring equipment" },
        { en: "Rounds checklist / logging materials" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Assuming the anchor period requires less attention because the vessel is stationary, missing a genuine readiness concern" },
        { en: "Misjudging a borderline reading during an extended, quieter period due to reduced vigilance" },
        { en: "Treating routine rounds during anchoring as less important than during active navigation" },
        { en: "Standing too close to machinery during checks, out of habit or inattention" },
      ],
      bestPractices: [
        { en: "Maintain the same standard of attentiveness and thoroughness during anchoring as during active navigation" },
        { en: "Treat readiness monitoring as a genuine, ongoing responsibility rather than a formality during a quiet period" },
        { en: "Report borderline observations for discussion, using them to build judgment" },
        { en: "Stay aware that the engine room's readiness matters continuously, even when the vessel is not underway" },
      ],
      commonMistakes: [
        { en: "Relaxing vigilance because the vessel is at anchor" },
        { en: "Treating extended anchor periods as a reason to reduce the thoroughness of rounds" },
        { en: "Missing a genuine readiness concern due to reduced attentiveness during a quiet phase" },
        { en: "Standing closer to machinery than necessary during routine checks" },
      ],
      professionalTips: [
        { en: "Readiness during anchoring isn't passive — it's continuously verified, even when nothing visible is happening" },
        { en: "A quiet anchor period is a good time to sharpen your judgment on borderline readings, without the pressure of active manoeuvring" },
        { en: "The habits of thoroughness you maintain during quiet periods are what carry through when the pace picks up again" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e2-l1" }],
    },

    port_operations: {
      overview: { en: "While alongside, the Motorman takes on a more active role in engine room activity — supporting maintenance work, bunkering operations, and cargo pump support where applicable — with genuine technical contribution rather than only assisting. Port stays intensify the pace of engine room work, and the Motorman's growing competence becomes particularly valuable when multiple activities compete for the team's attention." },
      responsibilities: [
        { en: "Carry out assigned maintenance tasks with growing independence, escalating anything beyond demonstrated competence" },
        { en: "Assist with bunkering operations or cargo pump support (if applicable), contributing genuine technical observations rather than only following instructions" },
        { en: "Report anything unusual observed during port activity promptly and specifically to the supervising engineer or Oiler" },
        { en: "Ask for clarification on any task genuinely beyond current competence, rather than attempting it based on general familiarity" },
        { en: "Follow PPE and safety requirements exactly as instructed, particularly around bunkering and maintenance activities" },
      ],
      equipment: [
        { en: "Engine room maintenance tools and materials" },
        { en: "Bunkering or cargo pump equipment, where applicable and under appropriate supervision" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Overestimating competence during a busy port stay and attempting a task beyond genuine readiness" },
        { en: "Missing an observation worth reporting due to the increased pace and simultaneous activity in port" },
        { en: "Standing too close to active bunkering work due to inattention under pressure" },
        { en: "Neglecting thoroughness under time pressure during a demanding port stay" },
      ],
      bestPractices: [
        { en: "Distinguish honestly between tasks within your demonstrated competence and those still requiring supervision, even under time pressure" },
        { en: "Maintain thoroughness and attentiveness despite the increased pace of a port stay" },
        { en: "Report observations proactively, even during a busy period when attention is stretched" },
        { en: "Ask for clarification before attempting a genuinely unfamiliar task, regardless of time pressure" },
      ],
      commonMistakes: [
        { en: "Attempting a task beyond genuine competence because the pace of the port stay creates pressure to appear capable" },
        { en: "Letting thoroughness slip because of the increased pace of work" },
        { en: "Failing to report something unusual because attention is stretched across more activity" },
        { en: "Standing too close to bunkering or maintenance work under time pressure" },
      ],
      professionalTips: [
        { en: "Port stays test whether your judgment holds up under pressure — that's exactly when honest self-assessment matters most" },
        { en: "The busiest moments are when observations matter most, not when they're easiest to skip" },
        { en: "Genuine competence, demonstrated consistently, is what earns you more responsibility during the next port call" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }, { kind: "lesson", lessonId: "e6-l1" }],
    },

    ship_to_ship_operations: {
      overview: { en: "During STS operations, the Motorman assists in the engine room with a more active role than the Wiper — supporting propulsion and manoeuvring readiness, and contributing to cargo pump or ballast operations where the vessel type requires it. The Motorman's judgment here remains within a defined scope: contributing genuine technical observations while deferring to the watchkeeping engineer or Oiler for any decision beyond routine execution, given the elevated risk of the operation." },
      responsibilities: [
        { en: "Assist with maintaining propulsion and manoeuvring readiness throughout the operation, monitoring relevant parameters with growing independence" },
        { en: "Support cargo pump or ballast operations (if applicable), contributing technical observations rather than only following instructions" },
        { en: "Report anything unusual observed promptly and specifically to the supervising engineer or Oiler" },
        { en: "Ask for clarification before attempting any task genuinely beyond demonstrated competence" },
        { en: "Follow PPE and safety requirements exactly as instructed, with particular attention to the heightened risk of this operation" },
      ],
      equipment: [
        { en: "Engine room monitoring and control equipment" },
        { en: "Cargo pump or ballast system equipment, where applicable" },
        { en: "Personal protective equipment as instructed" },
      ],
      risks: [
        { en: "Underestimating the importance of continuous readiness because the visible action is happening elsewhere on the vessel" },
        { en: "Overestimating competence to handle an unfamiliar aspect of cargo pump or ballast operations under pressure" },
        { en: "Missing a significant observation due to divided attention across multiple monitored parameters" },
        { en: "Losing attentiveness during a long or repetitive phase of the operation" },
      ],
      bestPractices: [
        { en: "Maintain continuous, active monitoring throughout the operation, regardless of how routine it appears" },
        { en: "Distinguish honestly between tasks within your competence and those requiring escalation, given the elevated risk of STS operations" },
        { en: "Report observations promptly and specifically, especially anything that could affect the overall operation's safety" },
        { en: "Treat every STS operation with full attention, regardless of prior experience" },
      ],
      commonMistakes: [
        { en: "Assuming the engine room's contribution is secondary because the main visible activity is elsewhere" },
        { en: "Attempting to handle an unfamiliar situation independently rather than escalating given the operation's elevated risk" },
        { en: "Missing an observation due to attention divided across multiple systems" },
        { en: "Losing attentiveness because the engine room's part of the operation appears uneventful" },
      ],
      professionalTips: [
        { en: "STS operations reward the Motorman who knows precisely where their competence ends and escalation begins" },
        { en: "Continuous readiness during STS depends on active monitoring, not passive waiting — stay engaged throughout" },
        { en: "The judgment you build here, knowing when to act and when to escalate, is exactly what defines a reliable Oiler later" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e6-l1" }, { kind: "lesson", lessonId: "e6-l2" }],
    },

    maintenance: {
      overview: { en: "Maintenance is where the Motorman's broader scope of responsibility is most visible — carrying out a wide range of maintenance tasks with growing independence, while still escalating anything beyond demonstrated competence to the Oiler, watchkeeping engineer, or Chief Engineer. Unlike the Wiper, whose maintenance role remains closely supervised, the Motorman is trusted to complete many tasks correctly with less constant checking, and may guide a Wiper on straightforward technique under senior oversight." },
      responsibilities: [
        { en: "Carry out a wide range of assigned maintenance tasks (component maintenance, lubrication, basic repairs, inspections) with growing independence as competence is demonstrated" },
        { en: "Recognize when a maintenance task exceeds demonstrated competence and escalate rather than attempting it based on general familiarity" },
        { en: "Report task progress and completion honestly, including genuine assessment of what was found and what was done" },
        { en: "Help coach a Wiper on straightforward maintenance technique when appropriate, under the oversight of a senior rating or engineer" },
        { en: "Follow all PPE and safety requirements exactly as instructed, particularly around hot surfaces, moving parts, and chemical handling" },
      ],
      equipment: [
        { en: "Personal protective equipment appropriate to the task" },
        { en: "Maintenance tools and materials, used with growing independence" },
        { en: "Planned Maintenance System (PMS) references, where accessible to the rating structure" },
      ],
      risks: [
        { en: "Attempting a maintenance task beyond genuine competence, risking poor quality work, equipment damage, or injury" },
        { en: "Overstating confidence in a completed task rather than honestly reporting uncertainty" },
        { en: "Missing an underlying issue by treating a task as routine when it actually revealed something worth escalating" },
        { en: "Coaching a Wiper on a technique not yet fully mastered, passing along an incomplete or incorrect method" },
      ],
      bestPractices: [
        { en: "Distinguish honestly between tasks within demonstrated competence and those requiring escalation, even when time pressure encourages moving forward alone" },
        { en: "Report specific, factual findings from maintenance work, not just 'task complete'" },
        { en: "Verify your own technique is genuinely correct before coaching a Wiper on it" },
        { en: "Use every maintenance task as an opportunity to build toward the broader competence expected of an Oiler" },
      ],
      commonMistakes: [
        { en: "Attempting a task beyond genuine competence to avoid appearing limited" },
        { en: "Reporting a task as complete without genuinely confirming the quality of the work" },
        { en: "Missing a developing issue because a task was treated as routine" },
        { en: "Coaching a Wiper on technique that hasn't itself been fully verified as correct" },
      ],
      professionalTips: [
        { en: "Knowing precisely where your competence ends is more valuable than appearing to know everything" },
        { en: "A maintenance task done thoroughly and reported honestly builds more trust than one rushed to completion" },
        { en: "Coaching a Wiper well means being certain of your own technique first — check yourself before you teach" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }],
    },

    emergency_situations: {
      overview: { en: "When an emergency is declared, the Motorman proceeds to an assigned muster station and takes on a genuine operational role within the emergency team — often a more substantial task than the Wiper's, given the Motorman's broader technical competence — while still following the direction of the officer or rating in charge of the station rather than making independent decisions about the overall response." },
      responsibilities: [
        { en: "Proceed immediately to the assigned muster station upon hearing the alarm, exactly as required by the muster list" },
        { en: "Carry out the assigned task within the emergency team competently and reliably, contributing technical judgment within the scope instructed by the station leader" },
        { en: "Report task completion, difficulty, or any relevant observation clearly and promptly to the station leader" },
        { en: "Ask for clarification if an instruction during a drill or emergency is not understood, rather than guessing" },
        { en: "Take every drill with full seriousness, treating it as genuine practice for the emergency response expected at every rank" },
      ],
      equipment: [
        { en: "Personal protective equipment and emergency-specific gear as assigned by the muster list" },
        { en: "Emergency equipment specific to the assigned station" },
      ],
      risks: [
        { en: "Hesitating or improvising when an instruction is unclear, rather than asking immediately" },
        { en: "Overestimating the scope of independent decision-making appropriate during a genuine emergency" },
        { en: "Missing a relevant technical observation while focused narrowly on the assigned task" },
        { en: "Treating a drill as less serious than a genuine emergency, reducing its training value" },
      ],
      bestPractices: [
        { en: "Execute the assigned task competently and confirm completion clearly to the station leader" },
        { en: "Contribute relevant technical observations, but defer decisions about the overall response to the station leader" },
        { en: "Ask immediately if an instruction is unclear — hesitation costs more time than a quick question" },
        { en: "Treat every drill exactly as you would a genuine emergency, building the habits that will matter when it counts" },
      ],
      commonMistakes: [
        { en: "Guessing at an unclear instruction instead of asking immediately" },
        { en: "Assuming a level of independent authority during an emergency beyond what has actually been granted" },
        { en: "Missing a technical observation relevant to the response because attention is narrowly focused" },
        { en: "Going through the motions of a drill without full engagement" },
      ],
      professionalTips: [
        { en: "Your technical competence is valuable during an emergency, but it supports the station leader's decisions — it doesn't replace them" },
        { en: "The habits you build in every drill are the habits that will actually show up in a real emergency — there is no separate 'serious mode'" },
        { en: "Being reliably competent and clearly communicative under pressure is exactly what earns you more responsibility as an Oiler" },
      ],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l8" }, { kind: "lesson", lessonId: "s6-l2" }],
    },
  },

  // ─────────────────────────────────────────────
  // IDENTITÉ PROFESSIONNELLE
  // ─────────────────────────────────────────────
  practicalScenarios: [
    {
      situation: { en: "During a routine round, you note a temperature reading that's slightly higher than what you remember from previous rounds, but still within the range marked as acceptable on the gauge. You're not sure if this is normal variation or worth mentioning." },
      mission: { en: "Decide whether to report the observation or continue the round without mentioning it." },
      expectedActions: [
        { en: "Report the observation factually to the Oiler or watchkeeping engineer, including the specific reading and how it compares to what you recall from previous rounds" },
        { en: "Do not decide in advance that it's 'probably normal variation'" },
        { en: "Continue the round as normal after reporting, unless instructed otherwise" },
      ],
      why: [{ en: "A reading within the acceptable range can still be worth flagging if it represents a meaningful change from what's normally observed — the Motorman's growing judgment is exactly about noticing these small shifts, not about deciding alone whether they matter." }],
      commonMistakes: [
        { en: "Assuming a reading within range doesn't need mentioning" },
        { en: "Waiting until the next round to see if it changes before saying anything" },
        { en: "Reporting vaguely ('something seemed a bit off') instead of the specific reading and comparison" },
      ],
      safetyPoints: [{ en: "Small, early shifts in readings are often the first visible sign of a developing issue — reporting them factually, even within acceptable range, is part of building genuine engine room vigilance." }],
      mapReferences: [{ kind: "lesson", lessonId: "s6-l1" }],
    },
    {
      situation: { en: "A Wiper asks you to show them how to complete a specific maintenance task. You've done it a few times yourself, but you're not entirely certain you're doing it exactly the right way." },
      mission: { en: "Decide whether to coach the Wiper based on what you know, or address your own uncertainty first." },
      expectedActions: [
        { en: "Be honest with yourself about your own uncertainty before coaching someone else" },
        { en: "Verify the correct technique with the Oiler or a senior engineer before demonstrating it to the Wiper" },
        { en: "If verification isn't immediately possible, tell the Wiper honestly that you want to confirm the technique first rather than teaching something uncertain" },
      ],
      why: [{ en: "Coaching someone on an unverified technique risks passing along an incomplete or incorrect method that then has to be corrected later — the Motorman's own competence should be genuinely confirmed before it's taught to someone else." }],
      commonMistakes: [
        { en: "Coaching based on assumed competence to appear capable in front of a junior rating" },
        { en: "Teaching a technique without checking it first, even when uncertain" },
        { en: "Avoiding the conversation about your own uncertainty out of concern about how it looks" },
      ],
      safetyPoints: [{ en: "An incorrectly taught technique can compound across two people rather than one — verifying your own competence first protects both the immediate task and everyone who learns from you." }],
      mapReferences: [],
    },
    {
      situation: { en: "While carrying out a routine maintenance task you've done many times before, you find something that doesn't match what you'd normally expect — slightly more wear, or a component that looks different than usual. It's not clearly a problem, but it's not clearly nothing either." },
      mission: { en: "Decide whether to complete the task as planned or escalate before proceeding." },
      expectedActions: [
        { en: "Pause the task and report the specific observation to the Oiler, watchkeeping engineer, or Chief Engineer" },
        { en: "Describe exactly what looks different, rather than a general sense that 'something's off'" },
        { en: "Wait for guidance before continuing or completing the task, rather than proceeding based on your own assessment alone" },
      ],
      why: [{ en: "A maintenance task revealing an unexpected condition is exactly the kind of situation that exceeds the Motorman's defined scope of independent judgment — pausing to escalate protects against completing a task in a way that might mask or worsen an underlying issue." }],
      commonMistakes: [
        { en: "Completing the task as planned because the unexpected finding isn't clearly a problem" },
        { en: "Deciding alone that it's probably fine based on limited experience" },
        { en: "Failing to describe the observation specifically enough for someone else to assess it properly" },
      ],
      safetyPoints: [{ en: "An unexpected finding during routine maintenance is often the earliest and clearest opportunity to catch a developing issue — treating it as worth pausing for is exactly the right instinct at this stage of experience." }],
      mapReferences: [{ kind: "lesson", lessonId: "e1-l6" }],
    },
  ],

  professionalTips: [
    { en: "Know precisely where your competence ends — that boundary, honestly recognized, is more valuable than appearing to know everything." },
    { en: "Report specific observations, not vague impressions — 'this reading is higher than usual' is far more useful than 'something seems a bit off.'" },
    { en: "A reading within acceptable range can still be worth flagging if it represents a genuine change — your growing judgment is about noticing shifts, not deciding alone what they mean." },
    { en: "Verify your own technique before coaching someone else on it — an unverified method taught to a junior rating compounds the risk, not just the convenience." },
    { en: "Escalating is not a failure of independence — it's exactly what your defined scope of judgment is supposed to produce when a situation genuinely calls for it." },
    { en: "The gap between recording something and understanding it is where your judgment actually develops — don't rush past it." },
    { en: "Consistency across routine and demanding moments is what earns you the trust that defines an Oiler." },
    { en: "Being a Motorman means exercising real judgment within a real scope — not guessing beyond it, and not hiding behind excessive caution either." },
  ],

  professionalMindset: [
    { en: "Think in terms of a defined scope, not a fixed ceiling. Your judgment operates within real boundaries today, but those boundaries expand as competence is demonstrated — the scope itself is not static." },
    { en: "Treat 'borderline' as a category worth reporting, not resolving alone. A reading within range that still feels different from normal is exactly the kind of observation your role exists to surface, not to quietly settle." },
    { en: "Assume your own technique needs verification before it becomes someone else's. What you believe you know correctly should be confirmed, not just repeated, especially once you start coaching a junior rating." },
    { en: "Recognize that escalation is a demonstration of judgment, not an absence of it. Recognizing the edge of your competence and acting accordingly is itself the skill being built at this stage." },
    { en: "Hold two things at once: growing independence and continued deference. You are trusted with more than the Wiper, but that trust exists inside limits — both are true simultaneously, not in tension." },
    { en: "See specific, factual reporting as the currency of trust. The more precisely you describe what you observed, the more useful your reports become — and the more independence you're likely to be given next." },
    { en: "Accept that consistency, not occasional brilliance, is what defines reliability. A Motorman who performs the same way on a quiet day and a demanding one is the one who earns the next level of trust." },
  ],

  professionalDocumentation: [
    { en: "Sea time and service records — The Motorman's sea time is recorded and confirmed as required by flag State regulations, directly supporting eventual eligibility for Oiler certification." },
    { en: "Maintenance and rounds reporting — When the Motorman reports on a maintenance task or a round, the report is increasingly relied upon as a genuine technical account — not just confirmation that a task was completed, but an honest assessment of what was found and what it means." },
    { en: "Task and competency sign-offs — Where the training or certification pathway requires a supervising rating's or engineer's signature confirming a specific competency has been demonstrated, the Motorman ensures this reflects genuinely verified competence, not simply repeated attempts." },
    { en: "Contribution to defect and observation records — When the Motorman notices something during a task (a borderline reading, an unexpected finding), reporting it clearly and factually contributes directly to the department's maintenance and defect records, even though the Motorman does not maintain those records personally." },
    { en: "Why this matters: As the Motorman's scope of independent judgment widens, so does the weight placed on their reports — a supervising engineer increasingly relies on the Motorman's account of a task or observation without independently re-verifying every detail. Building a track record of honest, specific, and accurate reporting now is what allows that trust to keep expanding toward the fuller responsibility expected of an Oiler." },
  ],

  environmentalResponsibilities: [
    { en: "Executing environmental procedures with growing independence — The Motorman applies waste segregation, product handling, and pollution prevention procedures across a wider range of tasks than the Wiper, with growing independence in recognizing what a given task requires." },
    { en: "Recognizing borderline environmental situations — The Motorman is expected to notice and report situations that aren't clearly a violation but depart from normal conditions (an unusual amount of residue, an ambiguous disposal situation), rather than deciding alone whether they matter." },
    { en: "Correct product and material handling — The Motorman follows procedures precisely regarding products, materials, and disposal methods, escalating genuinely unfamiliar or ambiguous situations rather than assuming familiarity covers them." },
    { en: "Contributing to environmental compliance through consistent practice — Each task where environmental procedure is genuinely understood and correctly applied — not just followed mechanically — builds the judgment that will define the Motorman's independent practice as an Oiler." },
    { en: "Why this matters: The Motorman's environmental responsibility now includes a genuine element of judgment — recognizing borderline situations and reporting them factually, rather than simply executing fixed procedures. This is exactly the transition from following rules to understanding why they exist, and it is what prepares the Motorman for the fuller environmental judgment expected at the Oiler level and beyond." },
  ],

  authorityLimits: {
    youCan: [
      { en: "Execute a wide range of engine room tasks within your demonstrated competence, with reduced supervision compared to a Wiper" },
      { en: "Exercise judgment on routine, well-defined situations (interpreting a normal reading, deciding a task is genuinely complete) within your demonstrated competence" },
      { en: "Coach a Wiper on straightforward, verified technique, under the oversight of a senior rating or engineer" },
      { en: "Ask any crew member or officer to clarify an instruction, verify a technique, or confirm a borderline observation" },
      { en: "Report anything observed that seems unclear, unsafe, or worth mentioning, to your supervising rating or officer" },
      { en: "Refuse to proceed with a task genuinely beyond your demonstrated competence, requesting clarification or escalation first" },
      { en: "Request feedback on your performance from your supervising rating or officer" },
    ],
    youCannot: [
      { en: "Make an independent decision on a situation that departs from the routine or falls outside your demonstrated competence" },
      { en: "Interpret or judge the significance of a genuinely borderline or unusual observation on the vessel's behalf — report it factually and let the supervising rating or engineer assess it" },
      { en: "Coach a junior rating on a technique you have not personally verified as correct" },
      { en: "Stand an independent watch or emergency station role without direct supervision" },
      { en: "Correct or discipline another crew member as a supervisory action, regardless of what is observed" },
      { en: "Sign off, verify, or confirm any operational readiness, safety check, or compliance matter on the vessel's behalf" },
      { en: "Represent the vessel or the company in any interaction with external parties (shore engineers, surveyors, authorities)" },
    ],
  },

  commonMistakes: [
    { en: "Treating a borderline observation as settled instead of reporting it — Deciding alone that a reading within range or an unusual finding is probably fine, rather than reporting it factually and letting someone else assess it." },
    { en: "Overestimating competence under time or social pressure — Attempting a task genuinely beyond demonstrated competence to avoid appearing limited, particularly during a busy port stay or in front of a junior rating." },
    { en: "Coaching before verifying your own technique — Teaching a Wiper a method that hasn't itself been confirmed as correct, compounding any error across two people." },
    { en: "Reporting conclusions instead of specific observations — Passing along a vague impression ('seems fine,' 'something's off') instead of the specific reading, comparison, or detail that would let someone else assess it properly." },
    { en: "Confusing growing independence with unlimited independence — Assuming that increased trust in routine matters extends automatically to situations that genuinely depart from the routine." },
    { en: "Over-escalating out of excess caution — Reporting every minor, expected variation as if it were significant, rather than developing genuine judgment about what warrants attention." },
    { en: "Relaxing thoroughness during quiet or repetitive periods — Treating a routine round or a quiet phase as less deserving of full attention than a busy or demanding one." },
    { en: "Hesitating to escalate a genuine uncertainty — Delaying or avoiding a report on something ambiguous out of concern that it might turn out to be nothing." },
  ],

  careerProgression: [
    { en: "Next role: Oiler, or in some company structures a broader watchkeeping rating role — the exact progression depends on the company's rating structure and vessel type, since Motorman and Oiler roles vary in how distinctly they are separated between companies." },
    { en: "Skills to develop: Broader independent judgment across a wider range of engine room situations, including genuinely ambiguous or unfamiliar ones; deeper technical understanding of engine systems beyond routine maintenance and monitoring; the confidence to make sound decisions within an expanding scope, while still knowing when a situation exceeds even that expanded scope; growing responsibility for the technical development of junior ratings." },
    { en: "Recommended experience: A demonstrated track record of sound judgment across a wide range of routine and borderline situations, with consistent, specific, and honest reporting; a visible pattern of the Oiler, watchkeeping engineer, or Chief Engineer extending trust and independence over time; sufficient sea time as required for further certification." },
    { en: "Certificates typically required: Requirements vary by flag State and company policy. Progression typically requires a minimum period of qualifying sea service and completion of any required training and certification relevant to the Oiler role." },
    { en: "Recommended MAP courses: All foundational and intermediate Engine lessons relevant to Oiler competency (engine systems, maintenance, watchkeeping, safety); Role On Board – Fourth Engineer (to preview the officer path); Career Navigator (career progression planning)." },
    { en: "Mindset for the next step: Moving from Motorman to Oiler means the scope of your judgment continues to widen, but the underlying discipline stays the same — recognizing what you genuinely know, reporting what you observe factually, and escalating what falls outside your competence. The transition is not about eliminating that discipline; it's about applying it across a broader and more demanding range of situations." },
  ],

  mapResources: [
    { kind: "lesson", lessonId: "e1-l1", label: { en: "Main Engine" } },
    { kind: "lesson", lessonId: "e1-l2", label: { en: "Auxiliaries & Electricity" } },
    { kind: "lesson", lessonId: "e1-l4", label: { en: "Fire Safety & CO2 System" } },
    { kind: "lesson", lessonId: "e1-l5", label: { en: "Survival & EPIRB" } },
    { kind: "lesson", lessonId: "e1-l6", label: { en: "Maintenance & Troubleshooting" } },
    { kind: "lesson", lessonId: "e1-l8", label: { en: "Emergency Procedures" } },
    { kind: "lesson", lessonId: "s6-l1", label: { en: "Safety Patrol & Hazard Recognition" } },
    { kind: "lesson", lessonId: "s6-l3", label: { en: "PPE, Safe Behaviour & Human Factors" } },
    { kind: "external", externalCode: "MARITIME_LEXICON", label: { en: "Maritime Lexicon — foundational engine room and machinery terminology" } },
    { kind: "external", externalCode: "CERTIFICATION_GUIDE", label: { en: "Guide to Certifications — for details on rating structure, sea time requirements, and Oiler certification pathway by flag State" } },
    { kind: "external", externalCode: "SHIPS_LIBRARY", label: { en: "Ships Library — explore vessel types and basic machinery layouts to build familiarity across different ships" } },
    { kind: "external", externalCode: "AI_ASSISTANT", label: { en: "Maritime AI Assistant — for questions on task technique, certification requirements, or engine room practice" } },
    { kind: "external", externalCode: "CAREER_ROADMAP", label: { en: "Career Roadmap — to visualize the path from Motorman through to Oiler and beyond" } },
    { kind: "external", externalCode: "CV_BUILDER", label: { en: "CV Builder — to document sea time and demonstrated competencies" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_WIPER", label: { en: "Role On Board — Wiper" } },
    { kind: "external", externalCode: "ROLE_ON_BOARD_FOURTH_ENGINEER", label: { en: "Role On Board — Fourth Engineer" } },
  ],

  responsibilityMatrix: {
    iExecute: [
      { en: "A wide range of engine room maintenance, monitoring, and watch-support tasks, with growing independence as competence is demonstrated" },
      { en: "Routine judgment calls within my demonstrated competence (interpreting normal readings, assessing task completion)" },
      { en: "Task and observation reports, honestly and with specific factual detail" },
    ],
    iMonitor: [
      { en: "My own technique and understanding against demonstrated competence, checking rather than assuming readiness for a new task" },
      { en: "Engine room parameters and conditions during rounds and watch-support duties, distinguishing normal variation from genuine concern" },
      { en: "The technique of a Wiper I may be coaching, verifying my own competence before teaching it" },
    ],
    iReport: [
      { en: "Task completion, honestly, distinguishing genuine confidence from uncertainty" },
      { en: "Any borderline or unusual observation factually, without deciding alone whether it matters" },
      { en: "My own uncertainty whenever a situation approaches the edge of my demonstrated competence" },
    ],
    iDoNotAuthorize: [
      { en: "Any independent decision on a situation that departs from the routine or falls outside my demonstrated competence" },
      { en: "My own progression to a wider scope of independent judgment, without confirmation from the supervising rating or engineer" },
      { en: "Coaching a junior rating on a technique I have not personally verified as correct" },
    ],
  },

  media: [
    { kind: "diagram", caption: { en: "Motorman task scope showing widening judgment as competence is demonstrated toward Oiler." } },
    { kind: "image", caption: { en: "Example of a properly conducted engine room round with logged parameters." } },
    { kind: "diagram", caption: { en: "Engine department organization chart showing the Motorman's position between Wiper and Oiler." } },
    { kind: "video", caption: { en: "Demonstration of coaching a Wiper on a verified maintenance technique." } },
    { kind: "document", caption: { en: "Sample sea time / competency progress record for Oiler certification." } },
  ],
};

// ── REGISTRY ──────────────────────────────────────────────────
// Indexed by RankId (rankRegistry.ts is the source of truth for valid ids).
// Partial: currently populated for "ab", "bosun", "oow", "chief_officer",
// "master", "deck_cadet", "os", "engine_cadet", "wiper" and "motorman" —
// remaining ranks are still pending content.
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {
  ab: AB_CARD,
  bosun: BOSUN_CARD,
  oow: OOW_CARD,
  chief_officer: CHIEF_OFFICER_CARD,
  master: MASTER_CARD,
  deck_cadet: DECK_CADET_CARD,
  os: OS_CARD,
  engine_cadet: ENGINE_CADET_CARD,
  wiper: WIPER_CARD,
  motorman: MOTORMAN_CARD,
};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
