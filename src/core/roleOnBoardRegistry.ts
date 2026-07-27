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

// ── REGISTRY ──────────────────────────────────────────────────
// Indexed by RankId (rankRegistry.ts is the source of truth for valid ids).
// Partial: currently populated for "ab", "bosun", "oow" and "chief_officer"
// — remaining ranks are still pending content.
export const ROLE_ON_BOARD_REGISTRY: Partial<Record<RankId, RoleOnBoardCard>> = {
  ab: AB_CARD,
  bosun: BOSUN_CARD,
  oow: OOW_CARD,
  chief_officer: CHIEF_OFFICER_CARD,
};

export function getRoleOnBoardCard(rankId: RankId): RoleOnBoardCard | undefined {
  return ROLE_ON_BOARD_REGISTRY[rankId];
}
