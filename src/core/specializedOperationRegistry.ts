// ── specializedOperationRegistry.ts ──────────────────────────────
// Single source of truth for MAP's Specialized Operations content.
//
// Builds on vesselTypeRegistry.ts (VesselTypeId) and rankRegistry.ts
// (RankId). Reuses roleOnBoardRegistry.ts's LocalizedText / MapReference /
// PracticalScenario / ProfessionalResponsibilityMatrix types rather than
// duplicating them — this file only adds the shapes that genuinely don't
// exist yet (operation phases, communication touchpoints, exercises, the
// branching interactive scenario).
//
// Not reusing roleOnBoardRegistry.ts's OperationalPhaseId: that taxonomy
// (pre_departure_preparation, anchoring, port_operations, ...) is a
// career-wide, generic phase list and does not fit an operation like AHTS
// anchor handling / rig mooring, whose own chronology is specific to itself
// (see the AHTS Anchor Handling & Rig Mooring specification, Part 2). Each
// operation instead defines its own phase order.
//
// Populated with one full example — the AHTS Anchor Handling & Rig Mooring
// prototype — to validate the schema against real, complete content, not a
// placeholder. Not yet imported by MaritimeApp.tsx, Dashboard.tsx, or any
// navigation/progression code; that wiring is a later integration step.

import type { RankId } from "./rankRegistry";
import type { VesselTypeId } from "./vesselTypeRegistry";
import type {
  LocalizedText,
  MapReference,
  PracticalScenario,
  ProfessionalResponsibilityMatrix,
} from "./roleOnBoardRegistry";

export type SpecializedOperationId = string;

// ── OPERATION PHASES ──────────────────────────────────────────────
// Each operation defines its own phase ids and their display order — see
// header note above on why roleOnBoardRegistry.ts's OperationalPhaseId
// isn't reused here.
export type OperationPhaseId = string;

// An entry in the phase order is either a single phase id, or an array of
// ids that run concurrently — surfaced by the AHTS Fire Response
// specification (Phases B/C/D there start simultaneously; a flat
// OperationPhaseId[] would misrepresent that as a strict sequence, both in
// the rendered walkthrough and in a sequence-reordering exercise's
// correctOrder). Only one level of grouping — nothing in either AHTS
// specification needs more.
export type OperationPhaseOrderEntry = OperationPhaseId | OperationPhaseId[];

export interface OperationPhase {
  id: OperationPhaseId;
  title: LocalizedText;
  overview?: LocalizedText;
  steps?: LocalizedText[];
  bestPractices?: LocalizedText[];
  commonMistakes?: LocalizedText[];
  mapReferences?: MapReference[];
  /** Marks a point the spec called out for future SVG illustration — no asset exists yet. */
  hasIllustrationPlaceholder?: boolean;
}

// ── COMMUNICATION TOUCHPOINTS ─────────────────────────────────────
// Scoped deliberately: only interactions that directly influence the
// operation, not general bridge/engine-room communication.
//
// "assisted_vessel" added for the Tugboat operation (architecture audit):
// distinct from "installation", which represents a fixed platform/rig.
// The tug's external coordination party is a moving vessel's own
// bridge/pilot team — not a fixed structure — so reusing "installation"
// would have been a semantic stretch rather than a genuine fit.
//
// "transferee" added for the OSV Personnel Transfer operation: a visiting
// individual being moved between vessel and platform, not a MAP crew rank
// (RankId) and not any existing external party. Deliberately not folded
// into an existing touchpoint the way a minor contingency branch would be
// — the transferee's own hold authority is this operation's single most
// repeated, load-bearing thread, not a one-off mention.
//
// "terminal" added for the Container Ship stowage plan verification
// operation: a land-based shore crane operator/planning office, distinct
// from "installation" (a fixed offshore platform/rig) and from every other
// existing party. Recurs across all nine communication touchpoints and is
// the counterparty in this operation's signature stop-authority moment
// (the vessel halting equipment it doesn't itself operate) — genuinely
// load-bearing, not a one-off.
//
// "shore_fire_brigade" added for the Container Ship cargo fire operation:
// shore-side professional fire/emergency responders, distinct from
// "terminal" (a different organization and authority — crane/planning
// staff don't fight fires). Recurs across four communication touchpoints
// and is the counterparty in this operation's own architecturally new
// moment — firefighting command itself passing to an external party,
// unlike every prior emergency, which kept the vessel's own crew in
// command throughout.
export type CommunicationParty =
  | "deck" | "engine" | "bridge" | "installation" | "deck_team" | "assisted_vessel" | "transferee" | "terminal" | "shore_fire_brigade";

export interface CommunicationTouchpoint {
  id: string;
  /** Links back to the OperationPhase this touchpoint occurs during, when it's phase-specific. */
  phaseId?: OperationPhaseId;
  from: CommunicationParty;
  to: CommunicationParty;
  trigger: LocalizedText;
  content: LocalizedText;
  whyItMatters: LocalizedText;
}

// ── ROLE ON VESSEL ────────────────────────────────────────────────
// Per-rank identity within this specific operation on this specific vessel
// type — distinct from responsibilityMatrix below, which is the detailed
// task-by-task breakdown, not the rank's overall identity in the operation.
export interface RoleOnVesselEntry {
  rankId: RankId;
  identity: LocalizedText;
}

// ── EXERCISES ──────────────────────────────────────────────────────
// Three exercise types, matching the specification's "Advanced Exercises
// Envisageable" section. sequence_reordering and error_identification (in
// its richer form) are net-new interaction patterns relative to MAP's
// existing linear QuestionBank engine (LessonShared.tsx) — SpecializedLessonShared
// implements them directly rather than routing through QuestionBank.
export type ExerciseType = "sequence_reordering" | "error_identification" | "readiness_checklist";

export interface SequenceReorderingItem {
  id: string;
  label: LocalizedText;
}

export interface SequenceReorderingExercise {
  type: "sequence_reordering";
  id: string;
  targetRanks: RankId[];
  prompt: LocalizedText;
  items: SequenceReorderingItem[];
  /**
   * Item ids in correct order. An entry that is itself an array means those
   * item ids may appear in any order relative to each other at that
   * position — same concurrency need as OperationPhaseOrderEntry above.
   */
  correctOrder: (string | string[])[];
}

export interface ErrorIdentificationChoice {
  id: string;
  label: LocalizedText;
  isError: boolean;
  explanation: LocalizedText;
}

export interface ErrorIdentificationExercise {
  type: "error_identification";
  id: string;
  targetRanks: RankId[];
  scenario: LocalizedText;
  choices: ErrorIdentificationChoice[];
}

// Renamed from PreOperationCheckItem/Exercise (architecture audit round 3,
// finding 2): the mechanic — identify which items are still outstanding —
// generalized to a stand-down/resumption readiness gate in the AHTS Fire
// Response specification, not just a pre-operation gate. The name now
// matches both uses.
export interface ReadinessChecklistItem {
  id: string;
  label: LocalizedText;
  /** Whether this readiness item is already satisfied in the given scenario snapshot. */
  isSatisfied: boolean;
}

export interface ReadinessChecklistExercise {
  type: "readiness_checklist";
  id: string;
  targetRanks: RankId[];
  scenario: LocalizedText;
  items: ReadinessChecklistItem[];
}

export type SpecializedExercise =
  | SequenceReorderingExercise
  | ErrorIdentificationExercise
  | ReadinessChecklistExercise;

// ── INTERACTIVE SCENARIO ──────────────────────────────────────────
// Nested tree, not a flat node-id graph — deliberate for now: the
// specification caps this prototype at 2 decision levels, and a flat graph
// model would generalize for depth this content doesn't have yet. Flagged
// in the architecture audit as the one shape most likely to be revisited
// once Fire Response's scenarios are specified.
export interface ScenarioOption {
  id: string;
  label: LocalizedText;
  consequence: LocalizedText;
  feedback: LocalizedText;
  isRecommended?: boolean;
  next?: ScenarioDecisionNode;
}

export interface ScenarioDecisionNode {
  id: string;
  situation: LocalizedText;
  options: ScenarioOption[];
}

export interface InteractiveScenario {
  id: string;
  title: LocalizedText;
  /** The rank whose seat this scenario is written from. */
  seatRankId: RankId;
  root: ScenarioDecisionNode;
}

// ── BEST PRACTICES / COMMON ERRORS RECAP ──────────────────────────
export interface BestPracticesTheme {
  theme: LocalizedText;
  bestPractices: LocalizedText[];
  commonErrors: LocalizedText[];
}

// ── SPECIALIZED OPERATION ─────────────────────────────────────────
// One entry per operation (e.g. one AHTS operation, later a second AHTS
// operation for Fire Response, later other vessel types). Every content
// section beyond the required core is optional, matching the
// block-independence principle already used in roleOnBoardRegistry.ts's
// ── SUPERVISION REQUIREMENTS ──────────────────────────────────────
// Formalizes the "participates under supervision" pattern (step 6,
// industrialization decision) — it showed up independently in both AHTS
// operations' OS entries, always as prose inside responsibilityMatrix's
// iExecute/iDoNotAuthorize text. Two independent occurrences were treated
// as enough evidence to generalize, per the same "derive from real need"
// principle used throughout. Deliberately additive, not a replacement for
// responsibilityMatrix: the prose still carries the "why" and the
// operation-specific task list; this only makes the supervised/autonomous
// distinction itself queryable as data instead of buried in text.
//
// Not merged into roleOnBoardRegistry.ts's shared ProfessionalResponsibilityMatrix
// type — that type is reused as-is by both roleOnBoardRegistry.ts (career-wide
// rank cards) and this file, and this concept is specific to a rank's
// standing within one operation, not a career-wide property. Extending the
// shared type would have been changing roleOnBoardRegistry.ts's own schema
// for a need that only exists here.
export interface SupervisionRequirement {
  requiresDirectSupervision: boolean;
  /** Which rank(s) must be providing that direct supervision, when requiresDirectSupervision is true. */
  supervisedBy?: RankId[];
}

// ── RESPONSIBILITY LEVEL ──────────────────────────────────────────
// CPLA closeout decision for Specialized Operations V1 (AHTS prototypes):
// formalizes each rank's overall participation level in an operation as
// structured data, not just prose — the same substance already existed in
// every roleOnVessel/responsibilityMatrix entry written so far (e.g. "aft-
// deck execution lead" for Bosun, "under the Bosun" for AB), just not in a
// queryable shape. Deliberately not built to drive anything automatically
// yet (no exercise filtering, no scoring) — that's an explicitly future
// goal; this is only the data itself, kept minimal on purpose.
//
// Overlaps in substance with SupervisionRequirement.requiresDirectSupervision
// for a rank marked "supervised" here — both now express the same underlying
// fact two different ways (a category vs. a boolean). Left as two separate
// fields rather than merged/deprecating SupervisionRequirement, since that
// type still carries information this one doesn't (supervisedBy: which
// rank(s) provide the supervision) and merging them wasn't part of this
// request — flagging the duplication rather than resolving it unasked.
export type ResponsibilityLevel = "lead" | "perform" | "supervised" | "support" | "observe";

// RoleOnBoardCard — SpecializedLessonShared must render conditionally per
// section rather than assuming full population.
export interface SpecializedOperation {
  operationId: SpecializedOperationId;
  vesselTypeId: VesselTypeId;
  department: "deck" | "engine" | "safety";

  title: LocalizedText;
  introduction: LocalizedText;
  objectives: LocalizedText[];
  context: LocalizedText;

  operationPhaseOrder: OperationPhaseOrderEntry[];
  operationPhases: Record<OperationPhaseId, OperationPhase>;

  communicationTouchpoints?: CommunicationTouchpoint[];

  roleOnVessel?: RoleOnVesselEntry[];
  responsibilityMatrix?: Partial<Record<RankId, ProfessionalResponsibilityMatrix>>;
  supervisionRequirements?: Partial<Record<RankId, SupervisionRequirement>>;
  responsibilityLevels?: Partial<Record<RankId, ResponsibilityLevel>>;

  exercises?: SpecializedExercise[];
  practicalScenarios?: PracticalScenario[];
  interactiveScenarios?: InteractiveScenario[];

  bestPracticesRecap?: BestPracticesTheme[];

  status: "draft" | "active" | "deprecated";
}

export const SPECIALIZED_OPERATION_REGISTRY: Record<SpecializedOperationId, SpecializedOperation> = {
  ahts_anchor_handling_rig_mooring: {
    operationId: "ahts_anchor_handling_rig_mooring",
    vesselTypeId: "ahts",
    department: "deck",
    status: "draft",

    title: { en: "AHTS — Anchor Handling & Rig Mooring Operations" },
    introduction: {
      en: "Rig mooring is the operation that defines the AHTS as a vessel type. When an offshore rig or floating installation needs to hold position, it does not rely on its own propulsion — it relies on a multi-point anchor spread laid, tensioned, and later recovered by an AHTS. This module covers the full AHTS anchor-handling cycle: rig mooring (deploying and tensioning a multi-point anchor spread) and rig unmooring (recovering that spread). It does not cover conventional quayside mooring/unmooring, which is a generic Deck skill common to virtually every vessel type. A structural feature of this operation shapes several sections below: ownership and dependency are not the same department. The operation belongs to Deck/Offshore Operations, but it cannot run without Engine — winches, hydraulic power packs, propulsion, thrusters, and electrical supply all have to be available and monitored throughout.",
    },
    objectives: [
      { en: "Describe the full chronology of an AHTS rig mooring and rig unmooring operation, from pre-operation checks through final anchor recovery, and distinguish it clearly from berth mooring/unmooring." },
      { en: "Identify the deck equipment involved (stern roller, winches, shark jaw / towing pins, chain stopper) and its role at each stage of anchor deployment and recovery." },
      { en: "Explain the specific hazards of anchor-handling operations (chain/wire parting under extreme tension, capsize risk from excessive lateral pull, moving-load injury on an open aft deck) and the controls used against them." },
      { en: "Identify who does what during this specific operation on an AHTS, including where Deck decisions genuinely depend on Engine-supplied systems." },
      { en: "Recognize correct versus incorrect sequencing and communication during the operation, and respond appropriately to a developing incident during anchor handling." },
      { en: "Recognize the boundaries of a junior deck rating's (OS) role in this operation — supervised participation only, no autonomous winch responsibility, no wire/chain decisions." },
    ],
    context: {
      en: "This is MAP's first Specialized Operations content, distinct from the existing Deck/Engine/Safety lesson tracks and from the static Ships Library card (Ahts.tsx). It extends that card rather than replacing it. Ownership sits with Deck/Offshore Operations; Engine appears throughout as a dependency the operation genuinely relies on. This module is scoped to the AHTS only and does not assume or imply any future vessel-family roadmap.",
    },

    operationPhaseOrder: [
      "pre_operation_preparation",
      "positioning_approach",
      "anchor_deployment",
      "tensioning_verification",
      "anchor_recovery",
      "securing_departure",
    ],
    operationPhases: {
      pre_operation_preparation: {
        id: "pre_operation_preparation",
        title: { en: "Pre-Operation Preparation" },
        steps: [
          { en: "Toolbox talk / pre-job safety meeting covering the specific mooring pattern, sea state limits, and job-specific hazards." },
          { en: "Review of the installation's mooring/anchor pattern (bearings and distances of each anchor leg)." },
          { en: "Weather window confirmation against anchor-handling limits." },
          { en: "Deck equipment check: winches, stern roller, shark jaw / towing pins, chasers, work wire and guide wires, anchor buoys and pendant wires." },
          { en: "Aft deck exclusion zones established and briefed." },
          { en: "Communication protocol confirmed: bridge to installation, and internal Deck-Engine readiness confirmation before starting." },
        ],
        bestPractices: [
          { en: "No anchor-handling operation begins without an explicit ready confirmation from Engine on winch hydraulics and propulsion/DP availability." },
        ],
        hasIllustrationPlaceholder: true,
      },
      positioning_approach: {
        id: "positioning_approach",
        title: { en: "Positioning & Approach" },
        steps: [
          { en: "AHTS maneuvers to the installation's stern or designated pick-up point per the mooring pattern, using DP where fitted or conventional close-quarters maneuvering otherwise." },
          { en: "Retrieval of the anchor chain/wire pendant from the installation, or connection to a pre-laid mooring buoy/pendant." },
          { en: "Continuous DGPS position monitoring begins and runs through anchor drop." },
        ],
        bestPractices: [
          { en: "Positioning is confirmed against the plan before any load is taken on deck equipment, not adjusted afterward." },
        ],
      },
      anchor_deployment: {
        id: "anchor_deployment",
        title: { en: "Anchor Deployment (per leg)" },
        overview: { en: "Repeated for each mooring point in the pattern." },
        steps: [
          { en: "Anchor paid out over the stern roller under controlled winch tension." },
          { en: "Chain/wire run controlled through the shark jaw / towing pins as it pays out, preventing uncontrolled surge." },
          { en: "AHTS runs out to the plotted anchor position for this leg." },
          { en: "Anchor lowered/planted at the drop point, position confirmed against the plan." },
          { en: "Sequence repeats for each remaining leg." },
        ],
        bestPractices: [
          { en: "One leg is completed and verified before starting the next — legs are not worked in parallel." },
        ],
        hasIllustrationPlaceholder: true,
      },
      tensioning_verification: {
        id: "tensioning_verification",
        title: { en: "Tensioning & Verification" },
        steps: [
          { en: "Each mooring line is tensioned to the specified pre-tension using the winch, monitored via load/tension readout." },
          { en: "Final tension confirmed and logged per leg." },
          { en: "Once all legs are set and tensioned, final position and tension report is passed to the installation." },
        ],
        bestPractices: [
          { en: "Tensioning is done incrementally with continuous monitoring, not run to target tension in one motion." },
        ],
      },
      anchor_recovery: {
        id: "anchor_recovery",
        title: { en: "Anchor Recovery (Unmooring, per leg)" },
        steps: [
          { en: "Tension release begins under controlled winch pay-out — the highest-risk step in the operation." },
          { en: "Anchor is walked in via the winch as the AHTS moves toward the leg's position." },
          { en: "Line is guided back through the shark jaw / towing pins as it comes aboard." },
          { en: "Anchor is recovered onto the stern roller / deck." },
          { en: "Sequence repeats leg by leg until the spread is fully recovered." },
        ],
        bestPractices: [
          { en: "Exclusion zones are re-briefed before recovery starts, even if unchanged since deployment — recovery is a distinct hazard state, not deployment's automatic mirror." },
        ],
      },
      securing_departure: {
        id: "securing_departure",
        title: { en: "Securing for Transit & Departure" },
        steps: [
          { en: "Anchors and gear secured for sea transit." },
          { en: "Deck stowage and lashing checked before the AHTS clears the location." },
          { en: "Final documentation completed (mooring/unmooring report)." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "engine_ready_confirmation", phaseId: "pre_operation_preparation", from: "engine", to: "bridge", trigger: { en: "Before operation start" }, content: { en: "Confirmation that winches, hydraulic power packs, propulsion, and thrusters/DP are available and nominal." }, whyItMatters: { en: "This is the ready gate — the operation does not start without it." } },
      { id: "engine_status_ongoing", phaseId: "tensioning_verification", from: "engine", to: "deck", trigger: { en: "Continuous, or on any deviation" }, content: { en: "Status of hydraulic pressure/winch response; any developing anomaly." }, whyItMatters: { en: "A hydraulic issue shows up first as inconsistent winch response during tensioning — reporting it early is what lets Deck pause before it becomes a parted-line event." } },
      { id: "engine_failure_report", from: "engine", to: "bridge", trigger: { en: "System failure or degradation (loss of hydraulic pressure, propulsion/DP fault)" }, content: { en: "Immediate report of the failure and its operational impact." }, whyItMatters: { en: "Deck's response depends entirely on Engine surfacing this promptly — this is the one message type where a delay directly creates a safety event." } },
      { id: "deck_response_to_engine", from: "deck", to: "engine", trigger: { en: "Deck decision made in response to a reported issue" }, content: { en: "What Deck is doing in response (holding position, pausing pay-out, etc.) and what Engine needs to sustain in the meantime." }, whyItMatters: { en: "Closes the loop and confirms Engine's status report was received and acted on." } },
      { id: "bosun_task_briefing", from: "deck_team", to: "deck_team", trigger: { en: "Before each leg" }, content: { en: "Task assignment and exclusion-zone reminder." }, whyItMatters: { en: "Re-briefing before recovery specifically is a named best practice, not a one-time thing." } },
      { id: "stop_work_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe observation (line behavior, deck condition, personnel in exclusion zone)" }, content: { en: "Immediate stop-work call." }, whyItMatters: { en: "Anyone on deck can halt the operation — authority to stop is not rank-gated, only authority to resume is." } },
      { id: "installation_plan_confirmation", phaseId: "pre_operation_preparation", from: "bridge", to: "installation", trigger: { en: "Before operation start" }, content: { en: "Confirmation of the mooring pattern/plan, weather go/no-go." }, whyItMatters: { en: "The plan originates from the installation — this is where the AHTS confirms it is working from the current, correct version." } },
      { id: "installation_position_check", phaseId: "positioning_approach", from: "bridge", to: "installation", trigger: { en: "During approach/positioning" }, content: { en: "Position confirmation against the plan." }, whyItMatters: { en: "Positioning accuracy is the entire point of this phase — this is a live check, not a one-off." } },
      { id: "installation_tension_report", phaseId: "tensioning_verification", from: "bridge", to: "installation", trigger: { en: "After each leg tensioned" }, content: { en: "Final tension and position report per leg." }, whyItMatters: { en: "The installation needs this to confirm its own mooring status leg by leg, not only at the end." } },
      { id: "installation_go_no_go", from: "bridge", to: "installation", trigger: { en: "Any deviation from plan (weather, equipment issue, position off-plan)" }, content: { en: "Go/no-go call." }, whyItMatters: { en: "The installation has standing to pause or abort jointly with the AHTS — this is not a one-sided AHTS decision." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Overall command and final authority for the operation. More directly engaged than on a generic vessel: conning the vessel through precise, load-critical maneuvers relative to the installation, and holding go/no-go authority jointly with the installation's mooring supervisor." } },
      { rankId: "chief_officer", identity: { en: "Operational command of the anchor-handling task itself — tension/load judgment, leg-by-leg execution decisions, and the operational go/no-go calls that feed the Master's overall authority. The AHTS's signature officer role." } },
      { rankId: "oow", identity: { en: "Supports positioning and monitoring: DGPS position tracking against the mooring plan, watchkeeping continuity, and relaying status between bridge and deck." } },
      { rankId: "bosun", identity: { en: "Aft-deck execution lead. Runs the physical anchor-handling sequence at the point of highest risk — the exposed aft deck, stern roller, shark jaw/towing pins." } },
      { rankId: "ab", identity: { en: "Core aft-deck execution crew under the Bosun, physically handling gear through each phase of deployment and recovery. Skilled, high-consequence work rather than general seamanship." } },
      { rankId: "os", identity: { en: "Junior deck rating, present under direct supervision for tasks compatible with their level only. Developmental role — learning the operation by assisting on its margins, not a defined operational function in its own right." } },
      { rankId: "chief_engineer", identity: { en: "Owns system readiness and availability for the duration of the operation: hydraulic power packs, winch systems, propulsion, and (where fitted) DP and thrusters. Reports and sustains rather than decides." } },
      { rankId: "second_engineer", identity: { en: "Works under the Chief Engineer on the same systems, typically the more hands-on monitoring/response role during the operation itself." } },
    ],

    responsibilityMatrix: {
      os: {
        iExecute: [{ en: "Assigned supervised tasks only (e.g. general deck support, lashing/stowage assistance), always under direct AB/Bosun supervision." }],
        iMonitor: [{ en: "Completion of my own assigned task." }],
        iReport: [{ en: "Status of my own assigned task, to the Bosun/AB supervising me." }],
        iDoNotAuthorize: [{ en: "Winch operation, wire/chain handling decisions, unsupervised presence in the exclusion zone, resuming the operation after a stop." }],
      },
      ab: {
        iExecute: [{ en: "Physical handling of anchor-handling gear (stern roller, shark jaw/towing pins, wire/chain pay-out and recovery) under the Bosun's direction." }],
        iMonitor: [{ en: "Line behavior/tension indicators at the working level, deck conditions, exclusion-zone compliance." }],
        iReport: [{ en: "Unsafe conditions or gear anomalies to the Bosun." }],
        iDoNotAuthorize: [{ en: "Tension targets, sequencing/timing between legs, direct communication with the installation." }],
      },
      bosun: {
        iExecute: [{ en: "Leads the aft-deck anchor-handling sequence, assigns AB/OS tasks, directs winch operation at the working level." }],
        iMonitor: [{ en: "Deck-team safety and exclusion-zone enforcement, equipment condition throughout deployment and recovery." }],
        iReport: [{ en: "Leg/task completion and deck-level issues to the Chief Officer/OOW." }],
        iDoNotAuthorize: [{ en: "Tension targets or go/no-go calls on anchor handling; direct operational communication with the installation's mooring supervisor." }],
      },
      oow: {
        iExecute: [{ en: "DGPS position tracking against the mooring plan, relays status between bridge and deck, may conn the vessel under the Master's direction." }],
        iMonitor: [{ en: "Positioning accuracy, watch continuity, Engine status reports as relayed." }],
        iReport: [{ en: "Positioning deviations to the Chief Officer/Master, external comms updates as directed." }],
        iDoNotAuthorize: [{ en: "Anchor-handling sequencing decisions, independent go/no-go calls." }],
      },
      chief_officer: {
        iExecute: [{ en: "Operational command of anchor handling — tension/load judgment, leg-by-leg execution decisions, direction of the Bosun." }],
        iMonitor: [{ en: "Progress across all legs, Engine system status reports, weather/conditions." }],
        iReport: [{ en: "Operational go/no-go recommendations and status to the Master; tension/position reports to the installation." }],
        iDoNotAuthorize: [{ en: "Overriding the Master's overall command or final go/no-go; directing Engine's internal system management." }],
      },
      master: {
        iExecute: [{ en: "Overall command, vessel positioning/conning relative to the installation, final go/no-go authority held jointly with the installation." }],
        iMonitor: [{ en: "Full operation status via the Chief Officer, Engine readiness, weather." }],
        iReport: [{ en: "To company/installation per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on anchor-handling deck tasks — execution is delegated to the Chief Officer and Bosun." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Prepares and maintains readiness of winches, hydraulic power packs, propulsion, thrusters/DP, and electrical supply before and during the operation." }],
        iMonitor: [{ en: "Continuous system performance during the operation, early signs of degradation." }],
        iReport: [{ en: "Pre-operation readiness confirmation, and immediate failure/anomaly reports to the bridge/Chief Officer." }],
        iDoNotAuthorize: [{ en: "Anchor-handling sequencing or tension decisions; direction of the deck team." }],
      },
      second_engineer: {
        iExecute: [{ en: "Hands-on monitoring of and immediate response to system anomalies, under the Chief Engineer's direction." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer, who consolidates and reports upward." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer — no anchor-handling decision authority." }],
      },
    },
    supervisionRequirements: {
      os: { requiresDirectSupervision: true, supervisedBy: ["ab", "bosun"] },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "support",
      bosun: "lead",
      ab: "perform",
      os: "supervised",
      chief_engineer: "support",
      second_engineer: "support",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "os", "ab", "bosun"],
        prompt: { en: "Put the six phases of an AHTS rig mooring operation in the correct order." },
        items: [
          { id: "pre_operation_preparation", label: { en: "Pre-Operation Preparation" } },
          { id: "positioning_approach", label: { en: "Positioning & Approach" } },
          { id: "anchor_deployment", label: { en: "Anchor Deployment" } },
          { id: "tensioning_verification", label: { en: "Tensioning & Verification" } },
          { id: "anchor_recovery", label: { en: "Anchor Recovery" } },
          { id: "securing_departure", label: { en: "Securing for Transit & Departure" } },
        ],
        correctOrder: ["pre_operation_preparation", "positioning_approach", "anchor_deployment", "tensioning_verification", "anchor_recovery", "securing_departure"],
      },
      {
        type: "error_identification",
        id: "err_recovery_no_rebrief",
        targetRanks: ["bosun", "oow", "chief_officer"],
        scenario: { en: "During an anchor recovery, the Bosun moves the deck team straight into breaking out the first anchor without re-briefing the exclusion zone, since it was already briefed before deployment earlier that day." },
        choices: [
          { id: "c1", label: { en: "Skipping the exclusion-zone re-brief before recovery" }, isError: true, explanation: { en: "Recovery is a distinct hazard state from deployment, not its automatic mirror — the exclusion zone must be re-briefed before recovery starts even if unchanged since deployment." } },
          { id: "c2", label: { en: "Using the stern roller for anchor recovery" }, isError: false, explanation: { en: "This is standard, correct equipment use for recovery." } },
          { id: "c3", label: { en: "Recovering the anchor leg by leg rather than all at once" }, isError: false, explanation: { en: "Correct practice — one leg is completed and verified before the next begins." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "preop_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team reports ready and weather is within limits. Review the readiness snapshot below before authorizing the operation to begin." },
        items: [
          { id: "weather_window", label: { en: "Weather window confirmed against anchor-handling limits" }, isSatisfied: true },
          { id: "exclusion_zone", label: { en: "Aft deck exclusion zones established and briefed" }, isSatisfied: true },
          { id: "engine_ready", label: { en: "Engine ready confirmation received (winches, hydraulics, propulsion/DP)" }, isSatisfied: false },
          { id: "mooring_plan", label: { en: "Installation's mooring pattern reviewed and confirmed current" }, isSatisfied: true },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "Two of six anchor legs are set and tensioned. The weather window is closing faster than forecast, with sea state approaching the operation's limit." },
        mission: { en: "Decide how to proceed with the remaining legs." },
        expectedActions: [
          { en: "Chief Officer flags the developing weather to the Master." },
          { en: "Master and the installation's mooring supervisor make the go/no-go call jointly." },
          { en: "Operation is paused or the remaining legs are re-sequenced/deferred rather than rushed to finish." },
        ],
        why: [{ en: "Tests that go/no-go is recognized as a joint AHTS/installation decision, not a unilateral one, and that partial completion is an acceptable, planned outcome." }],
        commonMistakes: [
          { en: "Chief Officer decides alone to push through remaining legs to avoid returning later." },
          { en: "Master defers entirely to installation pressure without an independent read of conditions." },
        ],
        safetyPoints: [{ en: "A closing weather window is exactly the condition under which line/chain-parting risk rises fastest." }],
      },
      {
        situation: { en: "During anchor recovery, tension release does not produce the expected gradual walk-in — the anchor appears fouled or embedded and is resisting more than normal." },
        mission: { en: "Recover the anchor without an uncontrolled load release." },
        expectedActions: [
          { en: "Bosun halts further pay-out change and re-confirms the exclusion zone." },
          { en: "Bosun reports the anomaly up to the Chief Officer." },
          { en: "Recovery proceeds only under closer-than-normal tension monitoring, not forced." },
        ],
        why: [{ en: "Operationalizes the operation's highest-risk step: stored energy release from a fouled anchor breaking free unpredictably." }],
        commonMistakes: [{ en: "Treating resistance as a mechanical problem to force through with more winch power." }],
        safetyPoints: [{ en: "Exclusion zone discipline matters more here than at any other point in the operation." }],
      },
      {
        situation: { en: "Mid-tensioning on a leg, the Second Engineer notices inconsistent hydraulic pressure and reports it to the Chief Officer." },
        mission: { en: "Respond to the report correctly, per each rank's defined boundary." },
        expectedActions: [
          { en: "Chief Officer holds current tension rather than continuing toward target." },
          { en: "Engine continues diagnosing and reports resolution or escalation." },
          { en: "Chief Officer does not direct Engine's internal troubleshooting; Engine does not decide when to resume." },
        ],
        why: [{ en: "Exercises the core Deck/Engine boundary: reports and sustains versus decides." }],
        commonMistakes: [
          { en: "Chief Officer pushes to finish tensioning despite the report." },
          { en: "Second Engineer unilaterally tells Deck to resume once the system seems to stabilize." },
        ],
        safetyPoints: [{ en: "This is the scenario type where a delayed response directly creates a safety event." }],
      },
      {
        situation: { en: "During securing/stowage, the Bosun is briefly pulled away to handle an unrelated deck issue while an OS is mid-task on a supervised, non-critical assignment." },
        mission: { en: "Determine what the OS should do in the supervision gap." },
        expectedActions: [
          { en: "OS pauses the task and does not improvise or extend scope in the Bosun's absence." },
          { en: "OS waits for supervision to resume or flags another qualified crew member before continuing." },
        ],
        why: [{ en: "Direct test of the participates-under-supervision boundary: supervision is a continuous condition, not a one-time assignment." }],
        commonMistakes: [
          { en: "OS continues working unsupervised on the assumption the task is basically done or not risky enough to matter." },
          { en: "Bosun does not formally hand off supervision before stepping away." },
        ],
        safetyPoints: [{ en: "Non-critical describes the task's normal risk level, not a license to proceed without the supervision the task was scoped around." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_hydraulic_anomaly",
        title: { en: "Hydraulic Pressure Anomaly During Tensioning" },
        seatRankId: "chief_officer",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Chief Officer, mid-way through tensioning leg 4 of 6. Tensioning has been proceeding incrementally, as it should. The Second Engineer reports inconsistent hydraulic pressure on the winch system.",
          },
          options: [
            {
              id: "a_continue",
              label: { en: "Continue tensioning to target — the fluctuation is probably minor and stopping costs time on a leg that's nearly done." },
              consequence: { en: "Pressure continues to degrade under sustained load. Winch response becomes visibly inconsistent while the line is still under load." },
              feedback: { en: "This is the failure mode the Deck/Engine communication protocol exists to prevent. Engine's report was the early-warning signal specifically because it comes before winch response visibly degrades." },
              next: {
                id: "level_2_a",
                situation: { en: "Pressure has dropped enough that the winch is losing consistent tension control on a leg still under significant load." },
                options: [
                  { id: "a1", label: { en: "Force the winch to hold position regardless." }, consequence: { en: "Risk of an uncontrolled load event increases further." }, feedback: { en: "Forcing a degraded system against a loaded line is the worst available option here." } },
                  { id: "a2", label: { en: "Execute an emergency controlled release of tension." }, consequence: { en: "The immediate load is relieved, but this is a reactive, higher-risk maneuver that a hold-and-diagnose response at Level 1 would have avoided entirely." }, feedback: { en: "Better than forcing the winch, but this branch exists to show that A's initial 'probably fine' removed the calmer options that were available earlier." } },
                  { id: "a3", label: { en: "Stop all winch action and call the Bridge/Master immediately." }, consequence: { en: "The situation is escalated and stabilized under the Master's authority." }, feedback: { en: "Correct once the situation has moved beyond routine Deck/Engine coordination — this is now approaching the emergency-escalation boundary." }, isRecommended: true },
                ],
              },
            },
            {
              id: "b_hold",
              label: { en: "Hold current tension, do not advance further, and wait for Engine's diagnosis." },
              consequence: { en: "Tension is held stable while the Second Engineer diagnoses the anomaly. No further load is added during the uncertain period." },
              feedback: { en: "This matches the Deck/Engine protocol precisely — Deck's response to an Engine report is to pause and hold, not push through or guess at the diagnosis." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The Second Engineer reports the pressure issue was a transient valve fault, now resolved, and confirms the system is nominal." },
                options: [
                  { id: "b1", label: { en: "Resume tensioning immediately at the previous rate to make up time." }, consequence: { en: "Tensioning proceeds at normal rate without extra vigilance." }, feedback: { en: "Treats the resolution as 'back to normal' rather than warranting continued attentiveness." } },
                  { id: "b2", label: { en: "Resume tensioning incrementally with closer monitoring than before." }, consequence: { en: "Tensioning completes normally, with the anomaly fully accounted for." }, feedback: { en: "Correct — proportionate response that respects both the incremental-tensioning practice and the fact that a resolved anomaly still warrants heightened monitoring." }, isRecommended: true },
                  { id: "b3", label: { en: "Request Engine run a full system check before resuming at all." }, consequence: { en: "The operation is delayed for a check the Engineer's report did not indicate was necessary." }, feedback: { en: "Over-corrects — treats a confirmed-resolved transient fault as if it were still open." } },
                ],
              },
            },
            {
              id: "c_abort",
              label: { en: "Abort the leg immediately and release tension." },
              consequence: { en: "The leg is safely stood down with no equipment stressed further, but tensioning on this leg has to restart from scratch, and the installation's mooring supervisor will need an explanation." },
              feedback: { en: "Not unsafe, but more conservative than the situation calls for — a report of 'inconsistent pressure' is a hold-and-diagnose signal, not yet an abort signal. This carries a real cost that a hold-and-diagnose response would have avoided." },
              next: {
                id: "level_2_c",
                situation: { en: "The installation's mooring supervisor asks, over the bridge-to-installation channel, why the leg was stood down." },
                options: [
                  { id: "c1", label: { en: "Give a vague answer to avoid the conversation." }, consequence: { en: "The installation is left without a clear picture of the AHTS's operational status." }, feedback: { en: "Undermines the trust the communication channel depends on." } },
                  { id: "c2", label: { en: "Explain the pressure report and the decision to abort rather than risk it." }, consequence: { en: "The installation understands the decision but not that a less costly option existed." }, feedback: { en: "Honest, but incomplete." } },
                  { id: "c3", label: { en: "Explain the report, and acknowledge that hold-and-diagnose would likely have avoided the delay." }, consequence: { en: "The installation gets a full, honest account of the judgment call, including its tradeoff." }, feedback: { en: "The honest, judgment-showing answer — owns the more conservative call without pretending it was the only safe option." }, isRecommended: true },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Sequencing & Execution" },
        bestPractices: [
          { en: "One leg is completed and verified before the next begins." },
          { en: "Tensioning is done incrementally with continuous monitoring, never run to target in one motion." },
          { en: "Recovery is treated as its own hazard state — exclusion zones are re-briefed even if unchanged." },
        ],
        commonErrors: [
          { en: "Rushing to complete a nearly-done leg instead of pausing on a developing anomaly." },
          { en: "Treating resistance during anchor recovery as a mechanical problem to force through." },
        ],
      },
      {
        theme: { en: "Deck / Engine Coordination" },
        bestPractices: [
          { en: "No operation begins without an explicit readiness confirmation from Engine." },
          { en: "Engine reports and sustains systems; Deck decides how to respond." },
          { en: "A hold-and-diagnose response to an Engine status report is the default." },
        ],
        commonErrors: [
          { en: "Deck ignoring or minimizing an Engine status report because the operation is close to a milestone." },
          { en: "Engine unilaterally deciding when Deck should resume." },
          { en: "Chief Officer attempting to direct Engine's internal troubleshooting." },
        ],
      },
      {
        theme: { en: "Communication & Authority" },
        bestPractices: [
          { en: "Go/no-go is a joint call between the AHTS and the installation's mooring supervisor." },
          { en: "Position and tension are reported to the installation leg-by-leg." },
          { en: "A conservative call that turns out costlier than necessary is explained honestly to the installation." },
        ],
        commonErrors: [
          { en: "Pushing through deteriorating conditions unilaterally to avoid an uncomfortable conversation." },
          { en: "Giving a vague explanation instead of an honest account of the judgment call made." },
        ],
      },
      {
        theme: { en: "Supervision & Rank Boundaries" },
        bestPractices: [
          { en: "Stop-work authority belongs to anyone on deck; resume authority does not." },
          { en: "OS participation is scoped to supervised, non-critical tasks only." },
          { en: "When supervision is interrupted, the supervised task pauses." },
        ],
        commonErrors: [
          { en: "An OS continuing a task unsupervised because it seems basically done or low-risk." },
          { en: "A Bosun stepping away from a supervisory role without a formal handoff." },
          { en: "Chief Officer overriding the Master's final go/no-go authority." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "Exclusion-zone discipline is tightest during anchor break-out and any moment of unexpected resistance." },
          { en: "A closing weather window is grounds to pause or defer remaining legs, not to rush completion." },
        ],
        commonErrors: [
          { en: "Treating 'we're almost finished' as a reason to accept more risk rather than less." },
        ],
      },
    ],
  },

  ahts_anchor_handling_fire_response: {
    operationId: "ahts_anchor_handling_fire_response",
    vesselTypeId: "ahts",
    department: "deck",
    status: "draft",

    title: { en: "AHTS — Fire Response During Anchor Handling Operations" },
    introduction: {
      en: "This module picks up where Mooring/Unmooring leaves off, deliberately: it places a fire aboard the AHTS during, or immediately after, an anchor-handling operation — specifically a hydraulic system fire originating in the winch/power-pack equipment already established as central to that operation. Hydraulic fluid under the high pressure these systems run at is a distinctive fire hazard: a ruptured line can atomize fluid into a fine mist that ignites on contact with a hot surface, producing a fast-developing fire that's easy to miss until it's already established. This module does not re-teach fire triangle theory, extinguisher types, or PPE basics — that foundation is assumed. A fire breaking out on the aft deck mid-operation doesn't happen in isolation: there may still be an anchor leg under load, a wire under tension, or a partially-recovered anchor on deck. Full firefighting response and rendering that rigging safe don't run in sequence, they run in tension with each other, competing for the same crew and the same moments. This module also resolves something Mooring/Unmooring never had to: command authority changes shape the instant a fire is declared — a standard maritime emergency-response principle, not a MAP-specific invention.",
    },
    objectives: [
      { en: "Recognize the specific fire signature of a hydraulic system failure (mist/spray ignition on a hot surface) as distinct from a general combustible or electrical fire, and understand why it develops differently." },
      { en: "Describe the sequence of actions required to safely interrupt an in-progress anchor-handling operation when a fire breaks out — securing or rendering safe any loaded rigging alongside the fire response, not instead of it." },
      { en: "Explain the command-authority shift that occurs the instant a fire is declared: the Master assumes overall emergency command regardless of what operation was underway, and the Chief Officer's role shifts from anchor-handling command to on-scene commander for the fire response itself." },
      { en: "Explain how the Engine department's role changes under this specific emergency — from routine system monitoring to active emergency system isolation — and identify who does what as a result." },
      { en: "Recognize correct versus incorrect prioritization when firefighting response and operation-securing actions compete for the same moments and the same crew." },
    ],
    context: {
      en: "Second AHTS Specialized Operations prototype, per doctrine the one meant to stress the architecture built for the first. Reuses the same vessel, the same equipment (stern roller, winches, hydraulic power packs), and several of the same ranks as Mooring/Unmooring, but introduces genuinely new demands: an emergency interrupting a routine operation, competing-priority decision-making, and a real command-authority handoff. Deliberately not duplicative of MAP's existing generic firefighting module (LessonSafetyS4_L1-L7) — this module assumes that foundation and adds only what's specific to this vessel, this equipment, and this operational moment. Command structure for this emergency: the instant the fire is declared, the Master assumes overall emergency command regardless of what operation was underway — the anchor-handling operation is interrupted or rendered as safe as the fire situation permits, not the other way around. The Chief Officer's role shifts from anchor-handling command authority to on-scene commander for the fire response on deck. The OOW remains on the bridge in support of the Master. Because the fire originates in an Engine-owned system, the Chief Engineer's role shifts from Mooring/Unmooring's 'reports and sustains' boundary to direct action: system-isolation authority for the hydraulic/electrical source, plus coordination with the bridge on system status. The Second Engineer executes the isolation under the Chief Engineer's direction — same reporting relationship as normal operations, different and more urgent action. Firefighting systems are deliberately kept generic: 'the vessel's fixed and portable firefighting systems appropriate to a Class B fire, per the vessel's SMS and Fire Safety Plan' rather than assuming a specific extinguishing configuration for this AHTS.",
    },

    operationPhaseOrder: [
      "detection_and_alert",
      ["command_transfer_and_alarm", "securing_the_rig", "system_isolation"],
      "firefighting_response",
      "fire_out_and_securing",
      "stand_down_and_post_incident",
    ],
    operationPhases: {
      detection_and_alert: {
        id: "detection_and_alert",
        title: { en: "Detection & Initial Alert" },
        steps: [
          { en: "First crew member to notice smoke, flame, or an unusual hydraulic system sound/smell raises the alert immediately — shout, nearest alarm point, or radio call to the bridge." },
        ],
        bestPractices: [
          { en: "Priority is alert-first; a hydraulic mist fire can flash and spread faster than a typical solid-fuel fire, so an immediate solo extinguisher attempt before raising the alert is not assumed as the right first move." },
        ],
        hasIllustrationPlaceholder: true,
      },
      command_transfer_and_alarm: {
        id: "command_transfer_and_alarm",
        title: { en: "Command Transfer & General Alarm" },
        overview: { en: "Runs concurrently with Securing the Rig and System Isolation — all three start the instant the alert is raised." },
        steps: [
          { en: "Master assumes overall emergency command instantly, regardless of the anchor-handling operation's state." },
          { en: "General/fire alarm sounded ship-wide; muster arrangements begin per the vessel's SMS." },
          { en: "Chief Officer's role shifts from anchor-handling command authority to on-scene commander for the fire response." },
          { en: "OOW remains on the bridge supporting the Master: navigation, communications, vessel positioning if still relevant." },
        ],
        bestPractices: [
          { en: "This handoff happens immediately and explicitly — not once the anchor-handling situation feels 'under control.'" },
        ],
      },
      securing_the_rig: {
        id: "securing_the_rig",
        title: { en: "Rendering the Anchor-Handling Operation Safe" },
        overview: { en: "Runs concurrently with Command Transfer and System Isolation." },
        steps: [
          { en: "Deck team assesses whether the currently-loaded wire/anchor can be safely held in its current state." },
          { en: "If tension can be held without further endangering personnel near the fire source, the winch is stopped and held — not continued, not released uncontrolled." },
          { en: "If deteriorating conditions make holding unsafe, an emergency response to the loaded rig becomes necessary." },
          { en: "Exclusion zone is re-established/expanded to account for both the anchor-handling hazard and the fire simultaneously." },
        ],
      },
      system_isolation: {
        id: "system_isolation",
        title: { en: "System Isolation (Engine)" },
        overview: { en: "Runs concurrently with Command Transfer and Securing the Rig." },
        steps: [
          { en: "Chief Engineer directs isolation of the hydraulic and electrical supply to the affected system — cutting the fuel source feeding the mist fire, and removing electrical sources that could complicate firefighting or cause re-ignition." },
          { en: "Second Engineer executes the isolation under the Chief Engineer's direction." },
          { en: "Chief Engineer coordinates with the bridge throughout on system status." },
        ],
        bestPractices: [
          { en: "Isolating the fuel source is treated as equally urgent as the firefighting response itself, not a follow-up step once flames are visible." },
        ],
      },
      firefighting_response: {
        id: "firefighting_response",
        title: { en: "Firefighting Response" },
        steps: [
          { en: "Chief Officer, as on-scene commander, directs the deck fire team using the vessel's fixed and portable firefighting systems appropriate to a Class B fire, per the vessel's SMS and Fire Safety Plan." },
          { en: "Attack proceeds once system isolation is removing the fuel source, in coordination with Engine's status reports." },
          { en: "Awareness of re-flash risk from hot hydraulic components persists even after visible flame is knocked down." },
        ],
        hasIllustrationPlaceholder: true,
      },
      fire_out_and_securing: {
        id: "fire_out_and_securing",
        title: { en: "Fire Out, Securing & Re-Ignition Watch" },
        steps: [
          { en: "Fire confirmed out by the on-scene commander; area cooled and monitored for re-ignition given residual heat in hydraulic components." },
          { en: "Chief Engineer confirms the isolated system is not to be re-energized until inspected — explicit, not assumed." },
        ],
        bestPractices: [
          { en: "This confirmation is explicit and cannot be assumed just because the fire is visibly out." },
        ],
      },
      stand_down_and_post_incident: {
        id: "stand_down_and_post_incident",
        title: { en: "Stand-Down & Post-Incident" },
        steps: [
          { en: "Master stands down the emergency once satisfied the situation is fully resolved." },
          { en: "Muster/roll call confirms all crew accounted for; medical check if needed." },
          { en: "Incident documented." },
          { en: "Separate, still-open decision: whether and how to resume the anchor-handling operation, depending entirely on what state the rig was left in during the Securing phase." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "initial_alert", phaseId: "detection_and_alert", from: "deck_team", to: "bridge", trigger: { en: "Fire/smoke/anomaly detected" }, content: { en: "Immediate alert: location, what's observed." }, whyItMatters: { en: "Everything downstream depends on this reaching the bridge without delay." } },
      { id: "command_transfer_confirmation", phaseId: "command_transfer_and_alarm", from: "bridge", to: "deck", trigger: { en: "Immediately on alert" }, content: { en: "Explicit assumption of emergency command by the Master; Chief Officer's role confirmed as on-scene commander." }, whyItMatters: { en: "An authority handoff, not a status report — has to be unambiguous, since the Chief Officer's decision-making authority itself changes at this moment." } },
      { id: "onscene_status_to_bridge", from: "deck", to: "bridge", trigger: { en: "Continuous during the incident" }, content: { en: "Chief Officer reports fire status, rig status, and crew status to the Master." }, whyItMatters: { en: "Recontextualizes Mooring/Unmooring's operational-recommendation touchpoint — same relationship, incident status content." } },
      { id: "rig_hold_release_authorization", phaseId: "securing_the_rig", from: "deck_team", to: "deck", trigger: { en: "Once the hold/release assessment is made" }, content: { en: "Chief Officer (on-scene commander) authorizes whether the loaded wire is held or emergency-released." }, whyItMatters: { en: "This is the on-scene commander's decision to make, not something the deck team resolves autonomously under pressure." } },
      { id: "isolation_confirmation", phaseId: "system_isolation", from: "engine", to: "bridge", trigger: { en: "Immediately on alert" }, content: { en: "Confirmation that hydraulic/electrical isolation of the affected system is underway." }, whyItMatters: { en: "Emergency equivalent of a readiness gate — urgent and one-directional, isolate first, confirm as it happens." } },
      { id: "isolation_direction", phaseId: "system_isolation", from: "engine", to: "engine", trigger: { en: "Immediately on alert" }, content: { en: "Chief Engineer directs the Second Engineer to execute the isolation." }, whyItMatters: { en: "Same reporting relationship as normal operations — Chief Engineer directs, Second Engineer executes — but the action itself has shifted from monitoring to emergency isolation." } },
      { id: "fire_out_report", phaseId: "fire_out_and_securing", from: "deck", to: "bridge", trigger: { en: "Fire confirmed out" }, content: { en: "Chief Officer reports fire out, transitioning to re-ignition watch." }, whyItMatters: { en: "The Master's stand-down decision depends on this being reported explicitly, not assumed from the absence of further reports." } },
      { id: "system_safe_confirmation", phaseId: "fire_out_and_securing", from: "engine", to: "bridge", trigger: { en: "Fire confirmed out" }, content: { en: "Confirmation that the isolated system is not to be re-energized until inspected." }, whyItMatters: { en: "Cannot be assumed just because the fire is visibly out." } },
      { id: "installation_incident_notification", phaseId: "command_transfer_and_alarm", from: "bridge", to: "installation", trigger: { en: "Immediately after command transfer" }, content: { en: "Bridge notifies the installation's mooring supervisor of the emergency and its operational impact — anchor-handling support is now unavailable." }, whyItMatters: { en: "The installation's own mooring operation is directly affected — a natural extension of the joint-decision relationship already established in Mooring/Unmooring." } },
      { id: "installation_outcome_notification", phaseId: "stand_down_and_post_incident", from: "bridge", to: "installation", trigger: { en: "Once stood down" }, content: { en: "Bridge informs the installation of the outcome and whether/when anchor-handling support can resume." }, whyItMatters: { en: "Closes the loop opened by the incident notification; ties to the still-open resumption decision." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Fire emergency commander. In Mooring/Unmooring, centered on load-critical conning and shared go/no-go authority with the installation. Here, the Master assumes overall emergency command the instant the alarm is raised, regardless of what was underway, directs the ship's overall response, and holds the stand-down decision." } },
      { rankId: "chief_officer", identity: { en: "The sharpest identity shift of any rank in this operation. In Mooring/Unmooring, owned anchor-handling operational command. Here, that authority is set aside the instant command transfers, and the Chief Officer becomes on-scene commander for the fire response: directing the firefighting attack and authorizing whether the loaded rig is held or emergency-released." } },
      { rankId: "oow", identity: { en: "In Mooring/Unmooring, supported positioning and DGPS tracking for the anchor-handling operation. Here, the OOW's position on the bridge doesn't change, but its purpose does: navigation, communications, and positioning now in direct support of the Master's emergency command." } },
      { rankId: "bosun", identity: { en: "In Mooring/Unmooring, aft-deck execution lead for anchor handling. Here, typically the first responder on deck — often the one who detects and reports the fire — and leads the deck team into firefighting response while also handling whatever rig-securing action is required. Now two simultaneous objects of attention instead of one." } },
      { rankId: "ab", identity: { en: "In Mooring/Unmooring, core aft-deck execution crew handling anchor gear under the Bosun. Here, becomes fire-team crew while potentially still needed for rig-securing action alongside firefighting — attention split between two live hazards rather than one controlled operation." } },
      { rankId: "os", identity: { en: "In Mooring/Unmooring, a junior deck rating permitted supervised, non-critical tasks only. Here, that boundary tightens rather than loosens: no hands-on role near the fire or the loaded rig at all — limited to muster support, headcount assistance, or runner/messenger duties away from the immediate hazard zone, under direct supervision." } },
      { rankId: "chief_engineer", identity: { en: "In Mooring/Unmooring, owned system readiness and reported/sustained systems without deciding anchor-handling actions. Here, that boundary shifts to direct action: system-isolation authority for the hydraulic/electrical source, plus ongoing coordination with the bridge on system status." } },
      { rankId: "second_engineer", identity: { en: "In Mooring/Unmooring, hands-on monitoring and response under the Chief Engineer's direction. Here, the same hierarchical relationship holds, but the action changes: executing the emergency isolation directly, under the Chief Engineer's direction, rather than routine system monitoring." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Assumes overall emergency command instantly on alarm, regardless of the operation underway; directs the ship's overall response; decides stand-down." }],
        iMonitor: [{ en: "Overall incident status via the Chief Officer (on-scene) and Chief Engineer (isolation); crew accounted for." }],
        iReport: [{ en: "To company/authorities per standing orders; confirms the outcome to the installation via the bridge channel." }],
        iDoNotAuthorize: [{ en: "Hands-on firefighting or rig-securing tasks — delegated to the Chief Officer as on-scene commander." }],
      },
      chief_officer: {
        iExecute: [{ en: "On-scene command of the fire response — directs the firefighting attack; authorizes whether the loaded rig is held or emergency-released." }],
        iMonitor: [{ en: "Fire status, rig status, and crew status on deck throughout." }],
        iReport: [{ en: "Continuous status to the Master; confirms fire out and the transition to re-ignition watch." }],
        iDoNotAuthorize: [{ en: "Overriding the Master's overall command or stand-down decision; directing Engine's internal isolation procedure (may only request/receive status)." }],
      },
      oow: {
        iExecute: [{ en: "Navigation, communications, and vessel positioning in support of the Master's emergency command." }],
        iMonitor: [{ en: "Vessel position/status; incoming reports as relayed to the Master." }],
        iReport: [{ en: "Positioning/navigation status to the Master; relays external communications (e.g. to the installation) as directed." }],
        iDoNotAuthorize: [{ en: "Independent command decisions during the emergency; deck-level firefighting or rig-securing decisions." }],
      },
      bosun: {
        iExecute: [{ en: "Detects/reports the fire if first on scene; leads the deck fire team's response and any rig-securing action, under the Chief Officer's on-scene direction." }],
        iMonitor: [{ en: "Fire behavior, rig status, and deck-team safety throughout." }],
        iReport: [{ en: "Status and developments to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "The hold/release decision on the loaded rig (Chief Officer's call); does not act as on-scene commander." }],
      },
      ab: {
        iExecute: [{ en: "Fire-team and rig-securing tasks as directed by the Bosun." }],
        iMonitor: [{ en: "Immediate hazard conditions in their own work area." }],
        iReport: [{ en: "Unsafe conditions or developments to the Bosun." }],
        iDoNotAuthorize: [{ en: "Tactical firefighting decisions, the hold/release decision, direct communication with the bridge." }],
      },
      os: {
        iExecute: [{ en: "Muster support, headcount assistance, or runner/messenger duties, under direct supervision, away from the immediate hazard zone only." }],
        iMonitor: [{ en: "Status of their own assigned task only — nothing safety-critical." }],
        iReport: [{ en: "Task status to the supervising rank." }],
        iDoNotAuthorize: [{ en: "Any hands-on role near the fire or the loaded rig; any independent action during the emergency." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Directs emergency isolation of the hydraulic/electrical source; coordinates with the bridge on system status throughout." }],
        iMonitor: [{ en: "Isolation progress; residual hazard (heat, potential re-ignition) in the affected system." }],
        iReport: [{ en: "Isolation status to the bridge/Master; confirms the system is not to be re-energized until inspected." }],
        iDoNotAuthorize: [{ en: "Firefighting tactics or the rig hold/release decision — those stay Deck's authority even though the fire's source is Engine's own system." }],
      },
      second_engineer: {
        iExecute: [{ en: "Executes the emergency isolation directly, under the Chief Engineer's direction." }],
        iMonitor: [{ en: "The isolation action and immediate system status at the working level." }],
        iReport: [{ en: "Status to the Chief Engineer, who consolidates and reports to the bridge." }],
        iDoNotAuthorize: [{ en: "Independent isolation decisions or any firefighting/rig decision — same boundary as the Chief Engineer, at a working level." }],
      },
    },
    supervisionRequirements: {
      os: { requiresDirectSupervision: true, supervisedBy: ["ab", "bosun"] },
    },
    // chief_engineer/second_engineer differ from their Mooring/Unmooring
    // level ("support" in both — "reports and sustains", no operational
    // decisions) — confirmed deliberate, not an inconsistency. Here, per
    // this operation's own text, the Chief Engineer "directs emergency
    // isolation" and "coordinates with the bridge" — an active, directing
    // role within the isolation domain, not a monitoring one — hence
    // "lead" (of that domain, not of the operation as a whole). The Second
    // Engineer "executes the isolation directly, under the Chief
    // Engineer's direction" — the same shape as AB under the Bosun —
    // hence "perform" rather than staying "support".
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "support",
      bosun: "lead",
      ab: "perform",
      os: "supervised",
      chief_engineer: "lead",
      second_engineer: "perform",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_fire",
        targetRanks: ["deck_cadet", "os", "ab", "bosun"],
        prompt: { en: "Put the phases of this fire response in the correct order. Some phases happen at the same time — the checker accepts any order between items that are genuinely concurrent." },
        items: [
          { id: "detection_and_alert", label: { en: "Detection & Initial Alert" } },
          { id: "command_transfer_and_alarm", label: { en: "Command Transfer & General Alarm" } },
          { id: "securing_the_rig", label: { en: "Rendering the Anchor-Handling Operation Safe" } },
          { id: "system_isolation", label: { en: "System Isolation (Engine)" } },
          { id: "firefighting_response", label: { en: "Firefighting Response" } },
          { id: "fire_out_and_securing", label: { en: "Fire Out, Securing & Re-Ignition Watch" } },
          { id: "stand_down_and_post_incident", label: { en: "Stand-Down & Post-Incident" } },
        ],
        correctOrder: [
          "detection_and_alert",
          ["command_transfer_and_alarm", "securing_the_rig", "system_isolation"],
          "firefighting_response",
          "fire_out_and_securing",
          "stand_down_and_post_incident",
        ],
      },
      {
        type: "error_identification",
        id: "err_command_not_transferred",
        targetRanks: ["chief_officer", "oow", "master"],
        scenario: { en: "The Master has assumed emergency command and the general alarm has sounded. The Chief Officer continues directing the anchor-handling tensioning on leg 4 for another minute before turning attention to the fire." },
        choices: [
          { id: "c1", label: { en: "Chief Officer continuing to direct anchor-handling tensioning instead of shifting to on-scene commander" }, isError: true, explanation: { en: "Command transfer happens instantly on alarm, not once the anchor-handling situation reaches a convenient pause point — the single most load-bearing rule in this operation." } },
          { id: "c2", label: { en: "Chief Engineer directing the Second Engineer to begin isolation immediately" }, isError: false, explanation: { en: "Correct — matches the established direct/execute hierarchy and the urgency principle." } },
          { id: "c3", label: { en: "A crew member calling a stop when conditions become unsafe" }, isError: false, explanation: { en: "Correct — stop-work authority is universal and not rank-gated, unchanged from Mooring/Unmooring." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_standdown_fire",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The fire is out and the deck team is standing by. Review the readiness snapshot below before the Master declares stand-down and before any decision to resume anchor-handling." },
        items: [
          { id: "fire_out_monitored", label: { en: "Fire confirmed out and monitored for re-ignition" }, isSatisfied: true },
          { id: "crew_mustered", label: { en: "Crew mustered and accounted for" }, isSatisfied: true },
          { id: "installation_notified", label: { en: "Installation notified of the outcome" }, isSatisfied: true },
          { id: "system_reenergize_confirmed", label: { en: "Chief Engineer has confirmed the isolated system is inspected and safe to re-energize" }, isSatisfied: false },
          { id: "rig_status_assessed", label: { en: "Rig status assessed to determine whether/how anchor-handling can resume" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "The Chief Officer is mid-way through a tensioning judgment call on leg 3 when a crew member reports fire at the power pack. The Master immediately assumes emergency command over the ship's general alarm." },
        mission: { en: "Determine what the Chief Officer does in the following seconds." },
        expectedActions: [{ en: "Chief Officer immediately sets aside the tensioning decision and transitions to on-scene commander for the fire response — not 'just a moment, let me finish this call first.'" }],
        why: [{ en: "Tests that command transfer happens instantly on alarm, not once a convenient pause point in the anchor-handling operation arrives — the single most load-bearing new rule in this module." }],
        commonMistakes: [{ en: "Chief Officer tries to complete or safely wrap up the tensioning judgment before shifting attention to the fire; treats the two roles as something to time-share." }],
        safetyPoints: [{ en: "A few seconds' delay in this handoff is exactly the kind of gap that turns a contained incident into an uncontained one." }],
      },
      {
        situation: { en: "Fire is spreading near the winch control position while leg 4 is still under significant tension. The Bosun, on scene, has to decide fast whether the line can be safely held or needs emergency release." },
        mission: { en: "Determine who makes this call and how." },
        expectedActions: [{ en: "Bosun assesses and reports the situation to the Chief Officer (on-scene commander); the hold/release decision itself is the Chief Officer's authorization, not the Bosun's to make alone, even under extreme time pressure." }],
        why: [{ en: "Directly tests whether the responsibility matrix's hold/release boundary for Bosun/AB actually holds when there's no time to spare — the boundary that's easiest to justify abandoning 'just this once.'" }],
        commonMistakes: [{ en: "Bosun makes the call unilaterally because 'there wasn't time to ask'; Chief Officer, once informed, second-guesses a decision that was never actually theirs to have skipped." }],
        safetyPoints: [{ en: "The chain of authority exists precisely for high-pressure moments like this one." }],
      },
      {
        situation: { en: "The fire is out and cooling has begun. A crew member suggests re-energizing the isolated hydraulic system quickly so the operation can resume once things calm down — the Chief Engineer hasn't yet given the explicit safe-to-re-energize confirmation." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "No re-energizing until the Chief Engineer's explicit confirmation is given — visible fire-out is not the same as confirmed system safety." }],
        why: [{ en: "Operationalizes the rule that this confirmation is explicit, not assumed — the natural moment for this mistake to happen is exactly when everyone is relieved and eager to get back to work." }],
        commonMistakes: [{ en: "Treating 'the fire's out' and 'the system's safe' as the same fact; rushing resumption because the anchor-handling operation was already mid-sequence when it was interrupted." }],
        safetyPoints: [{ en: "Residual heat in hydraulic components is exactly the re-ignition risk this rule exists to guard against." }],
      },
      {
        situation: { en: "During the fire response, an OS — wanting to help — moves toward the fire team to assist directly, rather than staying at their assigned muster-support task." },
        mission: { en: "Determine the correct response from the OS and from supervising crew." },
        expectedActions: [{ en: "OS is redirected away from the hazard zone to their assigned supervised task; no hands-on role near the fire or the loaded rig, consistent with the tightened OS boundary for this operation." }],
        why: [{ en: "Makes the OS restriction concrete — good intentions under emergency conditions are exactly when a junior rating is most likely to overstep a boundary meant to protect them." }],
        commonMistakes: [{ en: "Fire team allows the OS to help 'since every hand counts in an emergency' — a reasonable-sounding instinct that directly contradicts the established boundary." }],
        safetyPoints: [{ en: "'Every hand counts' is true for muster and support tasks, not for tasks requiring competence and judgment the OS hasn't yet developed." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_isolation_authority",
        title: { en: "Isolation Authority Under Time Pressure" },
        seatRankId: "chief_engineer",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Chief Engineer. The fire alarm sounds — hydraulic mist fire reported at the winch power pack, mid-way through leg 4's tensioning. You hold system-isolation authority and must coordinate with the bridge throughout. The exact fault location within the hydraulic circuit isn't fully confirmed yet.",
          },
          options: [
            {
              id: "a_isolate_broadly",
              label: { en: "Personally begin isolating broadly — cut hydraulic/electrical supply across the wider system, accepting some unaffected circuits going down too, to be safe and fast." },
              consequence: { en: "You're now occupied hands-on with isolation instead of directing and coordinating. The Second Engineer is left without direction. Unaffected circuits go dark, complicating the ship's overall situational awareness during the emergency." },
              feedback: { en: "Speed was right, but the execution wasn't — isolation is the Second Engineer's task under your direction, not something you do personally instead of directing and coordinating with the bridge." },
              next: {
                id: "level_2_a",
                situation: { en: "With your hands full and unaffected systems down, the bridge urgently needs a system status update you haven't sent." },
                options: [
                  { id: "a1", label: { en: "Keep working hands-on and report later." }, consequence: { en: "The bridge continues operating without current system status during an active emergency." }, feedback: { en: "Delays the one thing the bridge most needs from you right now." } },
                  { id: "a2", label: { en: "Stop, hand the hands-on work to the Second Engineer, and report to the bridge immediately." }, consequence: { en: "Delegation and bridge coordination are both re-established, later than ideal but correctly." }, feedback: { en: "Correct — re-establishes the delegation that should have happened at Level 1 and prioritizes the bridge coordination that got skipped." }, isRecommended: true },
                  { id: "a3", label: { en: "Send a brief, incomplete update through a third party without stopping your own work." }, consequence: { en: "The bridge gets a fragmented picture and you're still not directing the Second Engineer." }, feedback: { en: "Half-measure — doesn't fix either problem." } },
                ],
              },
            },
            {
              id: "b_confirm_first",
              label: { en: "Pause briefly to confirm the exact affected circuit before isolating, then isolate precisely." },
              consequence: { en: "Isolation is delayed while the fault is confirmed. The fire has slightly more fuel-feed time than necessary during that window." },
              feedback: { en: "Precision isn't wrong, but the timing is — isolating the fuel source is exactly as urgent as the firefighting response itself, not a step that waits for full confirmation first." },
              next: {
                id: "level_2_b",
                situation: { en: "The fault is now precisely confirmed and isolation proceeds cleanly — but time was lost getting here." },
                options: [
                  { id: "b1", label: { en: "Proceed calmly, treating the delay as an acceptable cost of precision." }, consequence: { en: "The delay goes unacknowledged." }, feedback: { en: "Understates a real tradeoff that was made." } },
                  { id: "b2", label: { en: "Proceed immediately, and explicitly flag to the bridge that the response was slower than it should have been." }, consequence: { en: "The bridge gets an honest account alongside the completed isolation." }, feedback: { en: "Correct — the same value Mooring/Unmooring's own interactive scenario rewarded: owning a suboptimal call rather than letting it pass silently." }, isRecommended: true },
                  { id: "b3", label: { en: "Proceed and don't mention the delay since the outcome turned out fine." }, consequence: { en: "The bridge never learns the response could have started sooner." }, feedback: { en: "The outcome being fine doesn't make the omission honest." } },
                ],
              },
            },
            {
              id: "c_delegate_and_coordinate",
              label: { en: "Direct the Second Engineer to begin isolation immediately, while you separately coordinate with the bridge on what's visible and known so far." },
              consequence: { en: "The Second Engineer begins isolating without delay. Your parallel bridge coordination gives the Master and Chief Officer real-time system status while the fire response proceeds." },
              feedback: { en: "Correct — matches both the urgency principle and the established hierarchy without letting one displace the other." },
              isRecommended: true,
              next: {
                id: "level_2_c",
                situation: { en: "The Second Engineer reports the primary isolation complete — but a secondary hydraulic line near the fire area still shows residual pressure, not yet confirmed safe." },
                options: [
                  { id: "c1", label: { en: "Report 'system isolated' to the bridge as complete and safe." }, consequence: { en: "The bridge believes the area is fully safe when it isn't yet confirmed." }, feedback: { en: "Overstates safety — exactly what the explicit-confirmation rule exists to prevent." } },
                  { id: "c2", label: { en: "Report the primary isolation complete, but explicitly flag the secondary line as unconfirmed and requiring further check." }, consequence: { en: "The bridge has a precise, honest picture of what's actually confirmed." }, feedback: { en: "Correct — precise, honest status reporting that doesn't overstate safety." }, isRecommended: true },
                  { id: "c3", label: { en: "Direct the Second Engineer to handle the secondary line too, without updating the bridge on the interim status." }, consequence: { en: "The bridge is left without visibility into an open safety item." }, feedback: { en: "Leaves the bridge blind to something it needs to know." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Command Transfer & Authority" },
        bestPractices: [
          { en: "Command transfer happens instantly on alarm, regardless of what operation was underway." },
          { en: "The Chief Officer's shift to on-scene commander is a hard handoff, not a time-share between roles." },
          { en: "The hold/release decision on a loaded rig under fire conditions is always the on-scene commander's authorization, never the deck team's alone." },
        ],
        commonErrors: [
          { en: "Trying to finish an anchor-handling judgment call before shifting attention to the fire." },
          { en: "Deck crew making the hold/release call unilaterally because 'there wasn't time to ask.'" },
        ],
      },
      {
        theme: { en: "Concurrent Action" },
        bestPractices: [
          { en: "Command transfer, rendering the rig safe, and system isolation all begin simultaneously — none waits for the others to finish." },
          { en: "Isolating the fuel source is treated as equally urgent as the firefighting response itself." },
        ],
        commonErrors: [
          { en: "Treating the operation's phases as a strict sequence when several are explicitly concurrent." },
          { en: "Pausing isolation to fully confirm the fault location before acting, when the urgency principle calls for isolating now and refining after." },
        ],
      },
      {
        theme: { en: "Deck / Engine Coordination (Emergency Mode)" },
        bestPractices: [
          { en: "The Chief Engineer directs, the Second Engineer executes — the same hierarchy as normal operations, only the action changes." },
          { en: "Isolation authority and bridge coordination run in parallel, not one after the other." },
        ],
        commonErrors: [
          { en: "The Chief Engineer personally doing hands-on isolation instead of directing and coordinating." },
          { en: "The Second Engineer acting before receiving direction from the Chief Engineer." },
        ],
      },
      {
        theme: { en: "Communication Under Pressure" },
        bestPractices: [
          { en: "Status reports stay honest and precise even when the news is a self-inflicted delay or an incomplete result." },
          { en: "System safety is confirmed explicitly, never assumed from a fire being visibly out or from partial isolation progress." },
        ],
        commonErrors: [
          { en: "Reporting a system as fully isolated and safe when a secondary concern is still unconfirmed." },
          { en: "Treating 'the fire's out' and 'the system's confirmed safe' as the same fact." },
        ],
      },
      {
        theme: { en: "Supervision & Rank Boundaries" },
        bestPractices: [
          { en: "The OS boundary tightens under fire conditions rather than loosening — no hands-on role near the fire or the loaded rig." },
        ],
        commonErrors: [
          { en: "Allowing an eager OS to help directly with firefighting 'since every hand counts.'" },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "Residual heat in hydraulic components after a fire is visibly out is treated as a real re-ignition risk requiring active monitoring." },
          { en: "The rig-resumption decision is treated as fully separate from the fire-response decision." },
        ],
        commonErrors: [
          { en: "Rushing to re-energize isolated systems or resume the anchor-handling operation because it was already mid-sequence when interrupted." },
        ],
      },
    ],
  },

  psv_multi_fluid_cargo_transfer: {
    operationId: "psv_multi_fluid_cargo_transfer",
    vesselTypeId: "psv",
    department: "deck",
    status: "draft",

    title: { en: "PSV — Multi-Fluid Cargo Transfer to a Platform" },
    introduction: {
      en: "The PSV's identity is logistics: regular, repetitive supply runs to offshore installations, carrying deck cargo and multiple different fluids simultaneously in separate tanks, each needing its own dedicated pumping system to avoid cross-contamination. This is a different kind of operation from anything in the AHTS content: not a single high-tension maneuver, but a disciplined, multi-stream logistics operation where the main hazard isn't a parting wire, it's getting something wrong across several simultaneous transfer lines at once, while holding position on DP the entire time with no anchor to fall back on. This module covers a full cargo/fluid transfer alongside a platform: deck cargo handling, connecting and running multiple simultaneous fluid transfer lines, and maintaining DP position throughout. Where AHTS's defining risk was catastrophic (a parted line, a capsizing pull), PSV's defining risk is procedural and compounding: cross-contamination between fluids, position-keeping discipline sustained over a long transfer, and coordination across several concurrent tasks rather than one sequential one.",
    },
    objectives: [
      { en: "Describe the full sequence of a PSV cargo/fluid transfer alongside a platform, from approach and DP set-up through cargo/fluid transfer to disconnection and departure." },
      { en: "Explain why cross-contamination between distinct fluid cargoes is this operation's signature risk, and identify the discipline (dedicated lines/pumps, verification before transfer) that prevents it." },
      { en: "Explain the role DP plays in this operation — sustained position-keeping without anchoring, for the full duration of the transfer — and why that's a materially different demand from AHTS's anchor-handling maneuvers." },
      { en: "Identify who does what during this operation on a PSV specifically, including how DP responsibility is distributed compared to AHTS's Mooring/Unmooring." },
      { en: "Recognize correct versus incorrect handling of a developing cross-contamination risk or a DP position deviation during transfer." },
    ],
    context: {
      en: "First Specialized Operations content for a vessel type other than AHTS. Deliberately does not reuse AHTS's anchor-handling shape — the signature risk (contamination discipline across simultaneous fluid streams) and the signature technology (sustained DP through an entire multi-stage operation, not just during positioning) are both new territory relative to anything AHTS covered. Extends Psv.tsx's Ships Library card the same way the AHTS modules extended Ahts.tsx. Deck cargo lifts are performed by the installation's crane (standard industry practice, though not explicitly stated in Psv.tsx's own text). Fluid connections are described generically as the vessel's dedicated transfer lines and pumping systems, rather than asserting hard-arm vs. hose specifics. Not assuming any specific DP class/redundancy for this vessel.",
    },

    operationPhaseOrder: [
      "pre_transfer_planning",
      "dp_approach_position_setup",
      "deck_cargo_handling",
      "fluid_transfer_setup_verification",
      "fluid_transfer",
      "disconnection_final_verification",
      "departure",
    ],
    operationPhases: {
      pre_transfer_planning: {
        id: "pre_transfer_planning",
        title: { en: "Pre-Transfer Planning" },
        steps: [
          { en: "Toolbox talk covering the specific cargo/fluid manifest for this call: what's being loaded/unloaded, which fluids, quantities." },
          { en: "Review of the installation's transfer plan and requirements." },
          { en: "Weather window check against this operation's DP and transfer limits." },
          { en: "Deck equipment check: securing points, transfer lines, pumps, manifolds." },
          { en: "Each fluid line is verified as correctly matched to its intended tank/pump before anything is connected — the first of two deliberate contamination-prevention checkpoints." },
          { en: "DP system check: thrusters, position reference systems, DP alert limits set." },
          { en: "Communication protocol with the installation confirmed." },
        ],
        bestPractices: [
          { en: "The fluid-line-to-tank verification happens here, on paper, before the vessel is even alongside — not discovered as a problem once transfer is already underway." },
        ],
      },
      dp_approach_position_setup: {
        id: "dp_approach_position_setup",
        title: { en: "DP Approach & Position Set-Up" },
        overview: { en: "Continuous DP monitoring begins here and does not stop until disconnection is complete — a sustained background condition for the rest of the operation, not a one-off maneuver." },
        steps: [
          { en: "PSV maneuvers to station near the platform under DP control." },
          { en: "DP position established and verified within the required tolerance." },
        ],
        hasIllustrationPlaceholder: true,
      },
      deck_cargo_handling: {
        id: "deck_cargo_handling",
        title: { en: "Deck Cargo Handling" },
        steps: [
          { en: "The installation's crane lifts containers/equipment on and off the PSV's deck." },
          { en: "Deck crew guides loads using tag lines to control swing, and directs the lift visually/by radio." },
          { en: "Cargo is secured to standard lashing points as it comes aboard, or as it's prepared for departure." },
        ],
        bestPractices: [
          { en: "Deck crew never work directly under a suspended load — guided from the side via tag lines." },
        ],
      },
      fluid_transfer_setup_verification: {
        id: "fluid_transfer_setup_verification",
        title: { en: "Fluid Transfer Set-Up & Verification" },
        steps: [
          { en: "The correct transfer line is connected to the corresponding tank/pump per the plan." },
          { en: "A second, independent verification is completed before flow starts — the deliberate double-check on the operation's signature risk." },
          { en: "Confirmation exchanged with the installation that both sides are ready to transfer." },
        ],
        bestPractices: [
          { en: "The second verification is done by someone other than whoever made the connection — an independent check, not a self-check." },
        ],
      },
      fluid_transfer: {
        id: "fluid_transfer",
        title: { en: "Fluid Transfer" },
        steps: [
          { en: "Transfer proceeds under continuous monitoring: flow rate, tank levels, line integrity." },
          { en: "Multiple fluids may transfer across the call, but each stays isolated to its own dedicated line and pump throughout." },
          { en: "DP position continuously held and monitored in parallel." },
        ],
        bestPractices: [
          { en: "Any unplanned change in flow rate or pressure is treated as a potential line-integrity issue to be checked immediately, not something to note and revisit later." },
        ],
        hasIllustrationPlaceholder: true,
      },
      disconnection_final_verification: {
        id: "disconnection_final_verification",
        title: { en: "Disconnection & Final Verification" },
        steps: [
          { en: "Transfer lines disconnected and secured per fluid type." },
          { en: "Final verification that no cross-contamination occurred during the operation." },
          { en: "Deck cargo handling completes if not already finished." },
          { en: "The DP continuous-monitoring condition ends here, once all connections to the platform are clear." },
        ],
      },
      departure: {
        id: "departure",
        title: { en: "Departure" },
        steps: [
          { en: "Final checks completed; DP control released." },
          { en: "PSV departs the installation and sets course." },
          { en: "Documentation of the completed transfer (cargo/fluid manifest reconciliation)." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "engine_ready_confirmation", phaseId: "pre_transfer_planning", from: "engine", to: "bridge", trigger: { en: "Before the operation starts" }, content: { en: "Confirmation that DP thrusters and fluid transfer pump systems are available and nominal." }, whyItMatters: { en: "Two distinct systems depend on Engine here (position-keeping and cargo transfer), not just one as in AHTS — the combined readiness gate for both." } },
      { id: "engine_status_ongoing", from: "engine", to: "bridge", trigger: { en: "Continuous, or on any deviation" }, content: { en: "Status of thruster/pump performance; any developing anomaly." }, whyItMatters: { en: "Same reports-and-sustains boundary as AHTS — an anomaly can affect either DP position or the transfer itself." } },
      { id: "ab_reports_connection", phaseId: "fluid_transfer_setup_verification", from: "deck_team", to: "deck_team", trigger: { en: "Transfer line connected" }, content: { en: "AB reports the connection made to the Bosun." }, whyItMatters: { en: "First half of the operation's signature double-check." } },
      { id: "bosun_verifies_to_co", phaseId: "fluid_transfer_setup_verification", from: "deck_team", to: "deck", trigger: { en: "Following the connection report" }, content: { en: "Bosun independently verifies the line-to-tank match and confirms to the Chief Officer." }, whyItMatters: { en: "The verification is done by someone other than whoever made the connection — an independent check, not a self-check." } },
      { id: "crane_lift_coordination", phaseId: "deck_cargo_handling", from: "deck_team", to: "installation", trigger: { en: "During each crane lift" }, content: { en: "Bosun coordinates tag-line guidance and lift start/stop directly with the installation's crane operator." }, whyItMatters: { en: "Real-time coordination with an external operator controlling the load — a touchpoint type with no AHTS equivalent." } },
      { id: "flow_anomaly_report", phaseId: "fluid_transfer", from: "deck_team", to: "deck", trigger: { en: "Any unplanned flow rate/pressure change" }, content: { en: "Deck crew reports immediately to the Chief Officer." }, whyItMatters: { en: "Treated as a potential line-integrity issue to check now, not note for later." } },
      { id: "stop_work_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe observation" }, content: { en: "Universal stop-work call." }, whyItMatters: { en: "Not rank-gated, unchanged by vessel type." } },
      { id: "installation_plan_confirmation", phaseId: "pre_transfer_planning", from: "bridge", to: "installation", trigger: { en: "Before the operation starts" }, content: { en: "Confirmation that the cargo/fluid manifest and transfer plan match." }, whyItMatters: { en: "Confirms both sides are working from the current plan, anchored to a manifest rather than an anchor pattern." } },
      { id: "installation_on_station_confirmation", phaseId: "dp_approach_position_setup", from: "bridge", to: "installation", trigger: { en: "Once DP position is established" }, content: { en: "Bridge confirms on-station and within tolerance." }, whyItMatters: { en: "Cargo/fluid operations don't begin until this is confirmed both internally and to the installation." } },
      { id: "installation_ready_to_transfer", phaseId: "fluid_transfer_setup_verification", from: "bridge", to: "installation", trigger: { en: "Once the independent line verification is complete" }, content: { en: "Chief Officer confirms ready-to-transfer to the installation." }, whyItMatters: { en: "Neither side unilaterally opens a line." } },
      { id: "installation_completion_confirmation", phaseId: "disconnection_final_verification", from: "bridge", to: "installation", trigger: { en: "Transfer and disconnection complete" }, content: { en: "Chief Officer confirms completion and no cross-contamination to the installation." }, whyItMatters: { en: "Closes the loop opened at the ready-to-transfer confirmation." } },
      { id: "departure_clearance", phaseId: "departure", from: "bridge", to: "installation", trigger: { en: "Ready to leave station" }, content: { en: "Bridge requests/receives departure clearance." }, whyItMatters: { en: "Final external touchpoint before DP control is released." } },
      { id: "dp_deviation_alert", phaseId: "fluid_transfer", from: "bridge", to: "bridge", trigger: { en: "Any DP position deviation during the continuous monitoring window (Phase B through F)" }, content: { en: "OOW alerts the Master/Chief Officer immediately; a pause-or-continue decision follows from the Master." }, whyItMatters: { en: "Not a discrete phase-bound touchpoint but a standing one for the entire transfer window — the communication-layer expression of the sustained DP condition." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Overall command, with a distinctive PSV-specific dimension: collision-risk oversight for an operation where the vessel is never moored or anchored, only held in place by DP for its entire duration. Where the AHTS Master's authority centered on a handful of load-critical maneuvers, here it centers on sustained risk oversight over a position-keeping condition that runs continuously for hours, not minutes." } },
      { rankId: "chief_officer", identity: { en: "Operational command of the cargo/fluid transfer sequence: owns the contamination-prevention discipline, receives the Bosun's independent verification, and gives the go before any line opens. The direct equivalent of the AHTS Chief Officer's anchor-handling command — but the judgment being exercised is procedural discipline and verification rigor, not tension/load calculation under physical force." } },
      { rankId: "oow", identity: { en: "DP-qualified, and materially more central to this operation than the OOW's role in AHTS Mooring/Unmooring. There, OOW supported positioning during specific maneuvers; here, OOW holds standing responsibility for continuous DP monitoring across the entire cargo/fluid transfer window — a sustained watch responsibility rather than a supporting role during discrete moments." } },
      { rankId: "bosun", identity: { en: "Deck cargo handling lead, and the independent verifier in the operation's contamination double-check chain. A different flavor of lead than the AHTS Bosun's high-tension physical execution role: here, leadership is as much about coordination (directing crane lifts with the installation's crane operator, running the verification discipline) as hands-on deck work." } },
      { rankId: "ab", identity: { en: "Deck crew: cargo handling, connecting transfer lines (the first half of the double-check), tag-line guidance during crane lifts. Structurally the same perform-under-the-Bosun's-direction role as the AHTS AB, but the tasks are logistics and connection discipline rather than anchor-handling gear under load." } },
      { rankId: "os", identity: { en: "Junior deck rating, supervised, non-critical tasks only — same restrictive principle carried over from AHTS, applied to this operation's own hazard profile: no role in fluid line connection or verification, no presence in an active crane-lift zone, under direct supervision throughout." } },
      { rankId: "chief_engineer", identity: { en: "Owns dual-system readiness: DP thrusters and fluid transfer pumps, where AHTS's Chief Engineer owned a single system (winch hydraulics). In this operation the role stays in the reports-and-sustains mold established in AHTS Mooring/Unmooring." } },
      { rankId: "second_engineer", identity: { en: "Hands-on monitoring and response under the Chief Engineer's direction, same shape as the AHTS equivalent." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Overall command; DP oversight authority; decides pause/abort on a reported DP deviation." }],
        iMonitor: [{ en: "Overall operation status via the Chief Officer and OOW; DP deviation alerts." }],
        iReport: [{ en: "To company/authorities per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on cargo/fluid transfer tasks — delegated to the Chief Officer and Bosun." }],
      },
      chief_officer: {
        iExecute: [{ en: "Operational command of the cargo/fluid transfer sequence; receives the Bosun's independent verification; gives the go before any line opens; confirms completion and no cross-contamination to the installation." }],
        iMonitor: [{ en: "Transfer progress across all lines, deck cargo handling status, DP status as relayed." }],
        iReport: [{ en: "Ready-to-transfer and completion confirmations to the installation; status to the Master." }],
        iDoNotAuthorize: [{ en: "Overriding the Master's pause/abort authority on a DP deviation; directing Engine's internal system management." }],
      },
      oow: {
        iExecute: [{ en: "Continuous DP monitoring throughout the transfer window; navigation and communications support." }],
        iMonitor: [{ en: "DP position against tolerance, continuously, not just during approach." }],
        iReport: [
          { en: "Any deviation beyond tolerance immediately to the Master/Chief Officer." },
          { en: "When asked, an informed recommendation on whether to pause or continue — while the pause/abort decision itself remains the Master's." },
        ],
        iDoNotAuthorize: [{ en: "The pause/abort decision itself (reports and may recommend, but the Master decides); cargo/fluid transfer sequencing." }],
      },
      bosun: {
        iExecute: [{ en: "Leads deck cargo handling; independently verifies the AB's fluid line connection against the plan; coordinates crane lifts directly with the installation's crane operator." }],
        iMonitor: [{ en: "Deck team safety during lifts and connections; accuracy of the line-to-tank match." }],
        iReport: [{ en: "Verification confirmation to the Chief Officer; unsafe conditions during lifts." }],
        iDoNotAuthorize: [{ en: "The ready-to-transfer go (Chief Officer's call); self-certifying a line connection they made themselves." }],
      },
      ab: {
        iExecute: [{ en: "Cargo handling; connects transfer lines; tag-line guidance during crane lifts." }],
        iMonitor: [{ en: "Line condition, flow/pressure indicators at the working level during transfer." }],
        iReport: [{ en: "Connection made, to the Bosun for independent verification; any unplanned flow/pressure change to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Verifying their own connection; the transfer go/no-go." }],
      },
      os: {
        iExecute: [{ en: "Assigned supervised, non-critical tasks only, away from crane-lift zones and fluid connection points." }],
        iMonitor: [{ en: "Status of their own assigned task only." }],
        iReport: [{ en: "Task status to the supervising rank (AB/Bosun)." }],
        iDoNotAuthorize: [{ en: "Any role in fluid line connection or verification; unsupervised presence in an active crane-lift zone; independent action." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Prepares and maintains DP thruster and fluid transfer pump system readiness." }],
        iMonitor: [{ en: "Continuous thruster/pump performance throughout the operation." }],
        iReport: [{ en: "Pre-operation readiness confirmation; any anomaly to the bridge immediately." }],
        iDoNotAuthorize: [{ en: "Cargo/fluid transfer sequencing or DP pause/abort decisions; direction of the deck team." }],
      },
      second_engineer: {
        iExecute: [{ en: "Hands-on monitoring of and response to system anomalies, under the Chief Engineer's direction." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer, who consolidates and reports upward." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer, at a working level." }],
      },
    },
    supervisionRequirements: {
      os: { requiresDirectSupervision: true, supervisedBy: ["ab", "bosun"] },
    },
    // oow is "perform" here, diverging from "support" in both AHTS
    // operations — confirmed deliberate, not an inconsistency. OOW's
    // continuous DP monitoring is the actual core activity being executed
    // for this operation's defining technology, not passive readiness/
    // reporting like AHTS's Chief Engineer in Mooring/Unmooring. The
    // divergence also encodes, as data, the "materially more central"
    // contrast already stated in roleOnVessel's prose.
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      bosun: "lead",
      ab: "perform",
      os: "supervised",
      chief_engineer: "support",
      second_engineer: "support",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_psv",
        targetRanks: ["deck_cadet", "os", "ab", "bosun"],
        prompt: { en: "Put the seven phases of a PSV multi-fluid cargo transfer in the correct order." },
        items: [
          { id: "pre_transfer_planning", label: { en: "Pre-Transfer Planning" } },
          { id: "dp_approach_position_setup", label: { en: "DP Approach & Position Set-Up" } },
          { id: "deck_cargo_handling", label: { en: "Deck Cargo Handling" } },
          { id: "fluid_transfer_setup_verification", label: { en: "Fluid Transfer Set-Up & Verification" } },
          { id: "fluid_transfer", label: { en: "Fluid Transfer" } },
          { id: "disconnection_final_verification", label: { en: "Disconnection & Final Verification" } },
          { id: "departure", label: { en: "Departure" } },
        ],
        correctOrder: ["pre_transfer_planning", "dp_approach_position_setup", "deck_cargo_handling", "fluid_transfer_setup_verification", "fluid_transfer", "disconnection_final_verification", "departure"],
      },
      {
        type: "error_identification",
        id: "err_self_certified_connection",
        targetRanks: ["bosun", "chief_officer", "ab"],
        scenario: { en: "An AB connects a fluid transfer line and, since the Bosun is occupied elsewhere, verifies the connection themselves before flow starts. The Bosun separately coordinates a crane lift with the installation's crane operator. The OOW reports a DP deviation to the Master immediately upon detection." },
        choices: [
          { id: "c1", label: { en: "AB verifying their own fluid line connection before transfer" }, isError: true, explanation: { en: "The independent verification must come from someone other than whoever made the connection — self-certification defeats the entire purpose of the double-check." } },
          { id: "c2", label: { en: "Bosun coordinating a crane lift directly with the installation's crane operator" }, isError: false, explanation: { en: "Correct — this real-time coordination is within the Bosun's own execute scope." } },
          { id: "c3", label: { en: "OOW reporting a DP deviation to the Master immediately upon detection" }, isError: false, explanation: { en: "Correct — matches the standing DP-monitoring responsibility and the principle of reporting before a hard limit is breached." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_pretransfer_psv",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team reports ready and weather is within limits. Review the readiness snapshot below before authorizing the operation to begin." },
        items: [
          { id: "weather_window", label: { en: "Weather window confirmed against DP and transfer limits" }, isSatisfied: true },
          { id: "line_verification", label: { en: "Fluid line-to-tank verification completed at the manifold" }, isSatisfied: true },
          { id: "plan_reviewed", label: { en: "Installation's transfer plan reviewed and confirmed current" }, isSatisfied: true },
          { id: "engine_ready", label: { en: "Chief Engineer readiness confirmation received (thrusters, pumps)" }, isSatisfied: false },
          { id: "dp_alert_limits", label: { en: "DP alert limits set" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "The AB who just connected a fluid line offers to verify it themselves, since the Bosun is occupied elsewhere and the schedule is tight." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "Verification is never self-certified — the Chief Officer and deck team wait for the Bosun (or another qualified independent verifier), even if it costs time." }],
        why: [{ en: "Tests whether the operation's signature discipline holds under the most realistic pressure to skip it: time, not recklessness." }],
        commonMistakes: [{ en: "AB and a nearby colleague agree the connection 'looks right' and proceed without a genuine independent check from someone at the Bosun's level." }],
        safetyPoints: [{ en: "Cross-contamination isn't always immediately visible — the entire point of an independent check is catching what the person who made the connection might miss precisely because they made it." }],
      },
      {
        situation: { en: "Partway through fluid transfer, the OOW notices the vessel drifting slightly beyond the DP tolerance band." },
        mission: { en: "Determine the correct response chain." },
        expectedActions: [{ en: "OOW reports immediately to the Master; the Master decides whether to pause the transfer while the deviation is corrected — not the Chief Officer or deck team deciding unilaterally." }],
        why: [{ en: "Tests the DP-deviation authority chain — a live hazard the moment lines are physically connected to a fixed installation." }],
        commonMistakes: [{ en: "Chief Officer, focused on the transfer sequence, decides to keep going without waiting for the Master's call." }],
        safetyPoints: [{ en: "A drifting vessel with fluid lines still connected to a platform is a real collision and line-parting risk." }],
      },
      {
        situation: { en: "During a cargo lift, a swell causes the suspended load to swing unexpectedly close to deck crew positioned nearby." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "Bosun immediately calls for the lift to be paused via the crane operator; deck crew clears the immediate area; the lift resumes only once conditions are reassessed as safe." }],
        why: [{ en: "Tests real-time coordination authority with an external operator under a developing hazard — a touchpoint type unique to this operation." }],
        commonMistakes: [{ en: "Deck crew tries to physically fend off or redirect the swinging load instead of clearing the area and calling for the lift to pause." }],
        safetyPoints: [{ en: "A swinging suspended load is one of the most common real-world causes of serious injury in this kind of operation." }],
      },
      {
        situation: { en: "Short-handed on deck, someone suggests having the OS assist with connecting a fluid transfer line — 'it's just holding a hose in place.'" },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The OS is not assigned to fluid line connection or verification tasks under any circumstance in this operation, regardless of how minor the specific task seems; a qualified AB or Bosun handles it instead." }],
        why: [{ en: "Continues the OS-boundary thread from every Specialized Operations module so far — tests whether a task category boundary can be bent by how minor a specific instance looks." }],
        commonMistakes: [{ en: "Treating a task as basically safe is used to justify bending the boundary, rather than recognizing the boundary was never about how hard the task looks." }],
        safetyPoints: [{ en: "The boundary exists specifically because fluid connection touches this operation's central risk — a mistaken connection could cost far more than being short-handed for a few minutes." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_dp_drift_response",
        title: { en: "A Developing DP Drift During Transfer" },
        seatRankId: "oow",
        root: {
          id: "level_1",
          situation: {
            en: "You are the OOW, DP-qualified, monitoring position continuously during fluid transfer. You notice the vessel has begun drifting — position is approaching the edge of the DP tolerance band, but hasn't exceeded it yet.",
          },
          options: [
            {
              id: "a_wait",
              label: { en: "Wait and watch — it's still within tolerance, no need to alarm anyone yet." },
              consequence: { en: "The drift continues. By the time it's reported, less time margin remains to respond." },
              feedback: { en: "Technically within the letter of 'report on deviation beyond tolerance', but given the collision risk that exists the entire time lines are connected to the platform, the trend itself — not just the breach — is what should trigger a report." },
              next: {
                id: "level_2_a",
                situation: { en: "The drift has continued and is now right at the edge of the tolerance limit." },
                options: [
                  { id: "a1", label: { en: "Continue waiting since it hasn't technically breached yet." }, consequence: { en: "The margin to respond keeps shrinking." }, feedback: { en: "Compounds the original delay." } },
                  { id: "a2", label: { en: "Report now, immediately." }, consequence: { en: "The Master is informed, later than ideal but before an actual breach." }, feedback: { en: "Correct — the right action, just later than it should have been." }, isRecommended: true },
                  { id: "a3", label: { en: "Report but downplay it as 'probably nothing'." }, consequence: { en: "The Master receives an unclear picture of the actual urgency." }, feedback: { en: "Reporting without an honest sense of urgency undermines the report's purpose." } },
                ],
              },
            },
            {
              id: "b_report",
              label: { en: "Report immediately to the Master, even though tolerance hasn't technically been exceeded yet." },
              consequence: { en: "The Master is informed early, with time to assess before the situation becomes urgent." },
              feedback: { en: "Correct — matches the pattern established across this content of proactive escalation before a hard limit is breached." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The Master, informed early, asks you directly for a recommendation on whether to pause the transfer or continue monitoring." },
                options: [
                  { id: "b1", label: { en: "Recommend continuing since tolerance is still technically fine." }, consequence: { en: "The transfer continues without addressing the developing trend." }, feedback: { en: "Underweights the trend that prompted the report in the first place." } },
                  { id: "b2", label: { en: "Recommend pausing proactively given the trend." }, consequence: { en: "The Master pauses the transfer with the position issue addressed before it becomes critical." }, feedback: { en: "Correct — an informed recommendation, with the Master still holding the actual decision, is exactly the right shape of this authority relationship." }, isRecommended: true },
                  { id: "b3", label: { en: "Decline to give a recommendation, deferring entirely to the Master." }, consequence: { en: "The Master has to decide without the input they explicitly asked for." }, feedback: { en: "Not unsafe, but unhelpful — when directly asked for input the Master needs, declining isn't a neutral choice." } },
                ],
              },
            },
            {
              id: "c_self_correct",
              label: { en: "Attempt to address the drift yourself first, without telling anyone, then report once resolved." },
              consequence: { en: "The correction attempt doesn't behave predictably, and no one else is aware anything is developing." },
              feedback: { en: "The most concerning option — modifying the vessel's position-keeping behavior without informing command, while connected to a platform, is exactly what the reporting structure exists to prevent." },
              next: {
                id: "level_2_c",
                situation: { en: "The correction attempt hasn't stabilized things, and the Chief Officer — unaware anything is wrong — is about to open another fluid line per the transfer plan." },
                options: [
                  { id: "c1", label: { en: "Let the new line open as planned since you're still working on it and don't want to cause alarm." }, consequence: { en: "Another line opens while position is uncertain, compounding the risk." }, feedback: { en: "Allows a preventable risk to compound." } },
                  { id: "c2", label: { en: "Immediately halt and report everything to the Master before the new line opens." }, consequence: { en: "The situation is disclosed and addressed before it compounds further." }, feedback: { en: "Correct — stop concealing the issue and report immediately, especially urgent before an action that would compound the risk." }, isRecommended: true },
                  { id: "c3", label: { en: "Quietly stop the correction attempt and hope position stabilizes without saying anything." }, consequence: { en: "The Chief Officer proceeds with no knowledge of the unresolved issue." }, feedback: { en: "Leaves the real risk completely undisclosed." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Contamination-Prevention Discipline" },
        bestPractices: [
          { en: "Fluid line-to-tank verification happens on paper, at the manifold, before the vessel is even alongside." },
          { en: "The verification before flow starts is independent — done by someone other than whoever made the connection, never self-certified." },
          { en: "Any unplanned flow rate or pressure change is treated as a potential line-integrity issue to check immediately." },
        ],
        commonErrors: [
          { en: "Agreeing a connection 'looks right' and skipping a genuine independent check under time pressure." },
          { en: "Handing a fluid-connection task to an unqualified rating because it seems minor." },
        ],
      },
      {
        theme: { en: "DP Position-Keeping" },
        bestPractices: [
          { en: "DP monitoring is continuous from position set-up through disconnection — a sustained condition, not a one-off maneuver." },
          { en: "A developing drift is reported before tolerance is technically breached." },
          { en: "When asked for a recommendation, the OOW gives one — an informed input, with the Master still holding the actual decision." },
        ],
        commonErrors: [
          { en: "Waiting to report a drift until tolerance is fully exceeded, losing response-time margin." },
          { en: "Attempting to self-correct a position issue without informing command." },
          { en: "Deciding to keep going on a DP deviation report without waiting for the Master's call." },
        ],
      },
      {
        theme: { en: "Deck / Engine Coordination" },
        bestPractices: [
          { en: "Chief Engineer's readiness confirmation covers both systems this operation depends on — DP thrusters and transfer pumps." },
          { en: "Engine reports any anomaly in either system immediately; Deck decides how to respond." },
        ],
        commonErrors: [
          { en: "Treating DP-thruster and pump-system readiness as separate gates instead of a combined one." },
        ],
      },
      {
        theme: { en: "Coordination with the Installation" },
        bestPractices: [
          { en: "Crane lift coordination with the installation's crane operator is real-time and direct." },
          { en: "A swinging load is met with a paused lift and a cleared area, not physical intervention." },
          { en: "Ready-to-transfer and completion confirmations are exchanged explicitly — neither side unilaterally opens or closes a line." },
        ],
        commonErrors: [
          { en: "Trying to physically fend off or redirect a swinging suspended load instead of clearing and calling for a pause." },
        ],
      },
      {
        theme: { en: "Supervision & Rank Boundaries" },
        bestPractices: [
          { en: "The OS boundary is about task category, not the perceived difficulty of a specific instance." },
        ],
        commonErrors: [
          { en: "Assigning a simple-looking fluid-connection task to an OS because the crew is short-handed." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "The independent verification and the continuous DP watch are both treated as non-negotiable even under schedule pressure." },
        ],
        commonErrors: [
          { en: "Letting schedule pressure justify skipping a check 'just this once.'" },
        ],
      },
    ],
  },

  psv_dp_loss_emergency_disconnect: {
    operationId: "psv_dp_loss_emergency_disconnect",
    vesselTypeId: "psv",
    department: "deck",
    status: "draft",

    title: { en: "PSV — DP Loss & Emergency Disconnect During Transfer" },
    introduction: {
      en: "This module places a DP failure — the vessel losing reliable position-keeping — during an active multi-fluid transfer, while lines are still physically connected to the platform. This is the most PSV/OSV-specific emergency category possible: it exists only because this vessel type depends on DP rather than anchoring or mooring. Where AHTS's Fire Response emergency originated inside the vessel and threatened a physically loaded rig, this emergency originates in the vessel's relationship to an external fixed point via the one thing holding that relationship together — DP. If position isn't recovered or the vessel doesn't disconnect in time, the consequences chain directly back into operation one's own signature risk: a forced or uncontrolled disconnect risks spilled fluid and cross-contamination, on top of collision and parted-line risks.",
    },
    objectives: [
      { en: "Recognize a developing DP problem as an emergency distinct from a routine deviation — the point at which position-keeping can no longer be trusted, not just watched." },
      { en: "Describe the sequence of actions required to safely disconnect from a platform under time pressure while a position problem is actively developing." },
      { en: "Explain how command authority is distributed during this specific emergency, including where it differs from AHTS Fire Response's single on-scene-commander model." },
      { en: "Explain the Engine department's role in this emergency — attempting to diagnose and restore thruster/DP function, the mirror image of Fire Response's isolate-the-system role." },
      { en: "Recognize correct versus incorrect prioritization between attempting to recover position and initiating emergency disconnect, when the two pull in different directions." },
    ],
    context: {
      en: "Second PSV operation, continuing directly from operation one's fluid transfer setup. Command structure: the Master assumes overall emergency command instantly on declaration, the same general principle as AHTS Fire Response, but distributed across three simultaneous tracks rather than a single on-scene commander — the OOW takes the active technical lead on the DP problem itself, the Chief Officer directs deck-side emergency disconnect preparation, and the Chief Engineer diagnoses and attempts to restore thruster/DP function, all in parallel under the Master. Not assuming a specific DP failure mechanism (thruster failure vs. reference-system loss vs. environmental force) — described generically as a developing DP position problem. Emergency disconnect systems described generically as the vessel's emergency disconnect systems for fluid transfer lines, not a specific coupling technology.",
    },

    operationPhaseOrder: [
      "dp_problem_detection_alert",
      "command_split_activation",
      ["dp_recovery_attempt", "disconnect_preparation", "thruster_diagnosis"],
      "decision_recover_or_disconnect",
      "emergency_disconnect_execution",
      "clear_of_platform_stand_down",
      "post_incident",
    ],
    operationPhases: {
      dp_problem_detection_alert: {
        id: "dp_problem_detection_alert",
        title: { en: "DP Problem Detection & Alert" },
        steps: [
          { en: "OOW notices the developing DP position problem — not a routine deviation, but position control becoming genuinely unreliable." },
          { en: "OOW immediately alerts the Master." },
          { en: "Master assesses severity and declares an emergency if warranted." },
        ],
        bestPractices: [
          { en: "The threshold for declaring this an emergency is deliberately lower than the routine 'report on any deviation' standard — this is about control itself becoming untrustworthy, not just position drifting." },
        ],
      },
      command_split_activation: {
        id: "command_split_activation",
        title: { en: "Command Split & Response Activation" },
        steps: [
          { en: "Master assumes overall emergency command, regardless of the transfer's state." },
          { en: "OOW takes the active technical lead on the DP problem itself, under the Master's command." },
          { en: "Chief Officer begins directing deck-side preparation for emergency disconnect, in parallel." },
          { en: "Chief Engineer begins diagnosing the thruster/DP system issue, in parallel." },
        ],
        bestPractices: [
          { en: "All three tracks activate simultaneously — disconnect preparation is not delayed to see whether recovery succeeds first." },
        ],
      },
      dp_recovery_attempt: {
        id: "dp_recovery_attempt",
        title: { en: "DP Recovery Attempt" },
        overview: { en: "Runs concurrently with Disconnect Preparation and Thruster Diagnosis." },
        steps: [
          { en: "OOW works to diagnose and recover reliable DP control." },
          { en: "Continuous reporting of recovery status to the Master." },
          { en: "Direct coordination with the Chief Engineer on the shared technical problem." },
        ],
        hasIllustrationPlaceholder: true,
      },
      disconnect_preparation: {
        id: "disconnect_preparation",
        title: { en: "Disconnect Preparation" },
        overview: { en: "Runs concurrently with DP Recovery Attempt and Thruster Diagnosis." },
        steps: [
          { en: "Chief Officer directs the deck team to stage the emergency disconnect systems and ready the fluid lines for rapid disconnection." },
          { en: "Any active crane operation is halted and secured." },
          { en: "Bosun and AB execute the preparation under the Chief Officer's direction." },
        ],
      },
      thruster_diagnosis: {
        id: "thruster_diagnosis",
        title: { en: "Thruster Diagnosis" },
        overview: { en: "Runs concurrently with DP Recovery Attempt and Disconnect Preparation." },
        steps: [
          { en: "Chief Engineer attempts to diagnose and restore thruster/DP function." },
          { en: "Reports status continuously to the bridge." },
          { en: "Direct coordination with the OOW on the shared technical problem." },
        ],
      },
      decision_recover_or_disconnect: {
        id: "decision_recover_or_disconnect",
        title: { en: "Decision: Recover or Disconnect" },
        steps: [
          { en: "Based on the OOW's recovery status and the Chief Officer's disconnect readiness, the Master decides whether position has been sufficiently recovered to continue, or whether emergency disconnect must proceed." },
          { en: "If recovered: the operation may resume from where it left off." },
          { en: "If not recovered: emergency disconnect proceeds." },
        ],
        hasIllustrationPlaceholder: true,
      },
      emergency_disconnect_execution: {
        id: "emergency_disconnect_execution",
        title: { en: "Emergency Disconnect Execution" },
        overview: { en: "Conditional — only proceeds if the decision phase calls for disconnect." },
        steps: [
          { en: "Fluid transfer lines disconnected via the vessel's emergency disconnect systems." },
          { en: "Vessel moves clear of the platform using whatever propulsion/DP capability remains." },
          { en: "Deck team clear of hazard areas during the move-off." },
        ],
      },
      clear_of_platform_stand_down: {
        id: "clear_of_platform_stand_down",
        title: { en: "Clear of Platform & Stand-Down" },
        steps: [
          { en: "Vessel confirmed clear at a safe distance." },
          { en: "Master stands down the emergency once satisfied." },
          { en: "Muster/headcount confirms all crew accounted for." },
        ],
      },
      post_incident: {
        id: "post_incident",
        title: { en: "Post-Incident" },
        steps: [
          { en: "Assessment of DP system status and what remains connected or disconnected." },
          { en: "Incident documented." },
          { en: "Separate, still-open decision: whether and how to resume the transfer operation, depending entirely on what state the connection was left in." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "initial_alert", phaseId: "dp_problem_detection_alert", from: "bridge", to: "bridge", trigger: { en: "DP problem detected" }, content: { en: "OOW immediately alerts the Master: nature and severity of the developing position problem." }, whyItMatters: { en: "Same proactive-reporting principle as operation one, now at a higher-stakes threshold — control itself, not just position drift." } },
      { id: "master_activates_oow", phaseId: "command_split_activation", from: "bridge", to: "bridge", trigger: { en: "Emergency declared" }, content: { en: "Master activates the OOW as active technical lead on the DP problem." }, whyItMatters: { en: "Part of the simultaneous three-track activation, not a delayed handoff." } },
      { id: "master_activates_co", phaseId: "command_split_activation", from: "bridge", to: "deck", trigger: { en: "Emergency declared" }, content: { en: "Master activates the Chief Officer to direct deck-side disconnect preparation." }, whyItMatters: { en: "Disconnect preparation begins immediately, not after the recovery attempt's outcome is known." } },
      { id: "master_activates_ce", phaseId: "command_split_activation", from: "bridge", to: "engine", trigger: { en: "Emergency declared" }, content: { en: "Master activates the Chief Engineer to diagnose the thruster/DP issue." }, whyItMatters: { en: "The third simultaneous track — technical diagnosis begins alongside, not after, the other two." } },
      { id: "oow_recovery_status", phaseId: "dp_recovery_attempt", from: "bridge", to: "bridge", trigger: { en: "Continuous during the response" }, content: { en: "OOW reports ongoing DP recovery status to the Master." }, whyItMatters: { en: "Feeds directly into the recover-or-disconnect decision." } },
      { id: "co_disconnect_readiness_status", phaseId: "disconnect_preparation", from: "deck", to: "bridge", trigger: { en: "Continuous during the response" }, content: { en: "Chief Officer reports ongoing disconnect-readiness status to the Master." }, whyItMatters: { en: "The other half of the decision — is the deck actually ready to disconnect if ordered." } },
      { id: "ce_diagnosis_status", phaseId: "thruster_diagnosis", from: "engine", to: "bridge", trigger: { en: "Continuous during the response" }, content: { en: "Chief Engineer reports ongoing thruster diagnosis status to the Master." }, whyItMatters: { en: "The technical basis for whether recovery is realistic." } },
      { id: "oow_ce_direct_coordination", phaseId: "dp_recovery_attempt", from: "bridge", to: "engine", trigger: { en: "Throughout the concurrent response" }, content: { en: "OOW and Chief Engineer coordinate directly on the shared technical problem, in parallel with both separately reporting to the Master." }, whyItMatters: { en: "The one touchpoint in this operation with no equivalent in either prior module — peer coordination between two ranks working the same problem from opposite ends, not a hierarchical report." } },
      { id: "oow_recommendation", phaseId: "decision_recover_or_disconnect", from: "bridge", to: "bridge", trigger: { en: "At the decision point" }, content: { en: "OOW gives an informed recommendation — recover or disconnect — alongside the raw status." }, whyItMatters: { en: "Mirrors the recommend-when-asked pattern already built into the OOW's responsibilityMatrix in operation one — the Master decides, but doesn't decide blind." } },
      { id: "co_directs_disconnect_execution", phaseId: "emergency_disconnect_execution", from: "deck", to: "deck_team", trigger: { en: "Disconnect ordered" }, content: { en: "Chief Officer directs the Bosun/AB team through the disconnect sequence." }, whyItMatters: { en: "Real-time execution direction, same shape as operation one's deck-team coordination." } },
      { id: "stop_work_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe observation" }, content: { en: "Universal stop-work / clear-the-area call." }, whyItMatters: { en: "Not rank-gated, unchanged by operation." } },
      { id: "installation_emergency_notification", phaseId: "command_split_activation", from: "bridge", to: "installation", trigger: { en: "Emergency declared" }, content: { en: "Bridge notifies the installation of the developing DP problem and its potential impact." }, whyItMatters: { en: "More urgent than either prior operation's installation notification — the installation's own structure is what's potentially at risk." } },
      { id: "installation_disconnect_confirmation", phaseId: "emergency_disconnect_execution", from: "bridge", to: "installation", trigger: { en: "Disconnect executing" }, content: { en: "Bridge confirms disconnect is underway/complete." }, whyItMatters: { en: "The installation needs to know its own side of the connection is clear too." } },
      { id: "installation_clear_confirmation", phaseId: "clear_of_platform_stand_down", from: "bridge", to: "installation", trigger: { en: "Vessel confirmed clear" }, content: { en: "Bridge confirms safe distance reached." }, whyItMatters: { en: "Closes the immediate danger window for both parties." } },
      { id: "installation_outcome_notification", phaseId: "post_incident", from: "bridge", to: "installation", trigger: { en: "Once stood down" }, content: { en: "Bridge informs the installation of the outcome and whether/when the transfer can resume." }, whyItMatters: { en: "Same closing-the-loop pattern as both prior operations' post-incident notifications." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Assumes overall emergency command instantly on declaration, the same general principle carried from Fire Response. But where Fire Response's Master delegated to a single on-scene commander, here the Master oversees three parallel response tracks at once and holds the convergence decision itself — a materially busier, more directly technical command role than either prior emergency." } },
      { rankId: "oow", identity: { en: "The sharpest identity shift of any rank in this operation. In operation one, OOW held a standing monitoring responsibility. Here, OOW becomes the active technical lead attempting to diagnose and recover DP control itself. Same rank, same underlying domain, but the posture changes from watching to working the problem directly." } },
      { rankId: "chief_officer", identity: { en: "In operation one, owned the cargo/fluid transfer sequence and its contamination discipline. Here, that authority is set aside, and the Chief Officer directs the deck-side emergency disconnect — a real parallel to the AHTS Chief Officer's shift in Fire Response, but as one of three simultaneous command tracks under the Master, not the sole on-scene commander." } },
      { rankId: "bosun", identity: { en: "Executes the emergency disconnect under the Chief Officer's direction. Operation one's defining Bosun trait — the independent verification, the deliberate double-check — is not this operation's focus: a genuine emergency disconnect runs on speed and direction-following, not elaborate cross-checking, and that contrast is itself part of what this operation teaches." } },
      { rankId: "ab", identity: { en: "Executes disconnect tasks under the Bosun's direction. Same perform identity as operation one and both AHTS operations — the task content changes, the shape of the role doesn't." } },
      { rankId: "os", identity: { en: "With two simultaneous hazard fronts active, the restriction tightens further rather than staying at operation one's level: no role anywhere near the disconnect points, limited strictly to muster/support tasks under direct supervision." } },
      { rankId: "chief_engineer", identity: { en: "In operation one, owned dual-system readiness in the reports-and-sustains mold. Here, shifts to active diagnosis and an attempted restoration of thruster/DP function — the mirror image of the AHTS Chief Engineer's Fire Response shift (isolate a system) rather than a repeat of it." } },
      { rankId: "second_engineer", identity: { en: "Executes under the Chief Engineer's direction, same shape as every prior operation — but the work is assisting with diagnosis and restoration attempts, distinct from Fire Response's isolation execution and operation one's routine monitoring." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Assumes overall emergency command instantly; oversees the three concurrent response tracks; decides recover-or-disconnect at the convergence point; decides stand-down." }],
        iMonitor: [{ en: "Status from all three tracks — the OOW's recovery attempt, the Chief Officer's disconnect readiness, the Chief Engineer's diagnosis; crew accounted for." }],
        iReport: [{ en: "To company/authorities per standing orders; notifies the installation of the emergency and outcome via the bridge channel." }],
        iDoNotAuthorize: [{ en: "Hands-on DP recovery work, deck disconnect execution, or thruster diagnosis — delegated to the OOW, Chief Officer, and Chief Engineer respectively." }],
      },
      oow: {
        iExecute: [{ en: "Active technical lead diagnosing and attempting to recover DP control; direct coordination with the Chief Engineer on the shared technical problem." }],
        iMonitor: [{ en: "DP recovery progress, continuously." }],
        iReport: [{ en: "Continuous recovery status to the Master; an informed recover-or-disconnect recommendation at the decision point." }],
        iDoNotAuthorize: [{ en: "The recover-or-disconnect decision itself (recommends, the Master decides); directing deck-side disconnect preparation." }],
      },
      chief_officer: {
        iExecute: [{ en: "Directs deck-side emergency disconnect preparation and execution; halts and secures any active crane operation." }],
        iMonitor: [{ en: "Disconnect readiness and deck-team safety throughout." }],
        iReport: [{ en: "Continuous disconnect-readiness status to the Master; confirms disconnect executing/complete to the bridge and installation." }],
        iDoNotAuthorize: [{ en: "The recover-or-disconnect decision itself; directing the OOW's DP recovery work or the Chief Engineer's diagnosis." }],
      },
      bosun: {
        iExecute: [{ en: "Executes the emergency disconnect sequence under the Chief Officer's direction." }],
        iMonitor: [{ en: "Deck-team safety during disconnect execution." }],
        iReport: [{ en: "Status and developments to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "The disconnect-ordered decision itself (the Master's call); independent deviation from the Chief Officer's direction." }],
      },
      ab: {
        iExecute: [{ en: "Physical disconnect tasks as directed by the Bosun." }],
        iMonitor: [{ en: "Immediate hazard conditions in their own work area during disconnect." }],
        iReport: [{ en: "Unsafe conditions to the Bosun." }],
        iDoNotAuthorize: [{ en: "Disconnect sequencing decisions; independent action." }],
      },
      os: {
        iExecute: [{ en: "Muster/support tasks only, under direct supervision, away from all disconnect points." }],
        iMonitor: [{ en: "Status of their own assigned task only." }],
        iReport: [{ en: "Task status to the supervising rank." }],
        iDoNotAuthorize: [{ en: "Any role near disconnect points; any independent action during the emergency." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Diagnoses and attempts to restore thruster/DP function; direct coordination with the OOW on the shared technical problem." }],
        iMonitor: [{ en: "Thruster/DP system status, continuously." }],
        iReport: [{ en: "Continuous diagnosis status to the Master; direct coordination updates to the OOW." }],
        iDoNotAuthorize: [{ en: "The recover-or-disconnect decision itself; directing deck-side disconnect actions." }],
      },
      second_engineer: {
        iExecute: [{ en: "Assists the Chief Engineer's diagnosis and restoration attempt directly." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer, who consolidates and reports upward." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer, at a working level." }],
      },
    },
    supervisionRequirements: {
      os: { requiresDirectSupervision: true, supervisedBy: ["ab", "bosun"] },
    },
    // Two divergences from PSV operation one, both confirmed deliberate,
    // not inconsistencies:
    // - oow: "lead" here vs "perform" in op 1. Here OOW autonomously
    //   directs its own recovery effort as the domain expert (only
    //   reporting/recommending upward, not executing under someone else's
    //   direction) -- matching the "lead of a domain" pattern Fire
    //   Response established (Chief Officer/Bosun/Chief Engineer can
    //   simultaneously each be "lead" of their own track), not the
    //   "perform under direction" shape op 1's OOW had.
    // - bosun: "perform" here vs "lead" in op 1. Op 1's Bosun led deck
    //   cargo handling AND was the independent verifier -- real decision-
    //   adjacent authority. Here, per roleOnVessel's own text, the Bosun
    //   purely executes the Chief Officer's disconnect direction; the
    //   verification/lead trait is explicitly not this operation's focus.
    responsibilityLevels: {
      master: "lead",
      oow: "lead",
      chief_officer: "lead",
      bosun: "perform",
      ab: "perform",
      os: "supervised",
      chief_engineer: "lead",
      second_engineer: "perform",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_psv_dp_loss",
        targetRanks: ["deck_cadet", "os", "ab", "bosun"],
        prompt: { en: "Put the phases of this DP loss and emergency disconnect response in the correct order. Three phases happen at the same time — the checker accepts any order between items that are genuinely concurrent." },
        items: [
          { id: "dp_problem_detection_alert", label: { en: "DP Problem Detection & Alert" } },
          { id: "command_split_activation", label: { en: "Command Split & Response Activation" } },
          { id: "dp_recovery_attempt", label: { en: "DP Recovery Attempt" } },
          { id: "disconnect_preparation", label: { en: "Disconnect Preparation" } },
          { id: "thruster_diagnosis", label: { en: "Thruster Diagnosis" } },
          { id: "decision_recover_or_disconnect", label: { en: "Decision: Recover or Disconnect" } },
          { id: "emergency_disconnect_execution", label: { en: "Emergency Disconnect Execution" } },
          { id: "clear_of_platform_stand_down", label: { en: "Clear of Platform & Stand-Down" } },
          { id: "post_incident", label: { en: "Post-Incident" } },
        ],
        correctOrder: [
          "dp_problem_detection_alert",
          "command_split_activation",
          ["dp_recovery_attempt", "disconnect_preparation", "thruster_diagnosis"],
          "decision_recover_or_disconnect",
          "emergency_disconnect_execution",
          "clear_of_platform_stand_down",
          "post_incident",
        ],
      },
      {
        type: "error_identification",
        id: "err_delayed_disconnect_prep",
        targetRanks: ["chief_officer", "master", "oow"],
        scenario: { en: "The Chief Officer delays starting deck-side disconnect preparation to wait and see if the OOW's DP recovery attempt succeeds first. The Chief Engineer coordinates directly with the OOW on the thruster/DP problem while also reporting status to the Master. The Bosun executes the disconnect sequence exactly as directed by the Chief Officer." },
        choices: [
          { id: "c1", label: { en: "Chief Officer delaying disconnect preparation to wait on the recovery attempt's outcome" }, isError: true, explanation: { en: "All three tracks activate simultaneously — disconnect preparation is never delayed pending the recovery attempt's outcome, even when recovery looks likely to succeed." } },
          { id: "c2", label: { en: "Chief Engineer coordinating directly with the OOW while also reporting to the Master" }, isError: false, explanation: { en: "Correct — matches the established direct-coordination-plus-reporting-up pattern unique to this operation." } },
          { id: "c3", label: { en: "Bosun executing the disconnect sequence exactly as directed by the Chief Officer" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_standdown_psv_dp_loss",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The vessel is clear of the platform and the deck team is standing by. Review the readiness snapshot below before the Master declares stand-down and before any decision to resume the transfer." },
        items: [
          { id: "vessel_clear", label: { en: "Vessel confirmed clear at a safe distance" }, isSatisfied: true },
          { id: "crew_mustered", label: { en: "Crew mustered and accounted for" }, isSatisfied: true },
          { id: "installation_notified", label: { en: "Installation notified of the outcome" }, isSatisfied: true },
          { id: "dp_status_confirmed", label: { en: "DP system status assessed and confirmed by the Chief Engineer" }, isSatisfied: false },
          { id: "connection_state_documented", label: { en: "Connection/disconnection state fully documented to inform the resumption decision" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "The OOW reports the DP problem seems minor and recovery looks likely. The Chief Officer considers holding off on deck-side disconnect preparation to avoid unnecessary work and crew alarm." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer begins disconnect preparation immediately regardless of how promising the recovery attempt looks, per the simultaneous-activation principle." }],
        why: [{ en: "Tests whether the no-delay rule holds precisely when skipping parallel preparation feels most reasonable." }],
        commonMistakes: [{ en: "Reasoning that preparing to disconnect while the OOW seems confident is wasted effort or an overreaction." }],
        safetyPoints: [{ en: "If recovery unexpectedly fails and disconnect prep hasn't started, the vessel loses exactly the time margin that parallel activation exists to protect." }],
      },
      {
        situation: { en: "The OOW's assessment of the DP problem's cause differs from the Chief Engineer's — their direct coordination has surfaced two different theories about what's wrong." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "Both continue reporting their own status and theory independently to the Master rather than forcing agreement between themselves first; the Master, informed of the disagreement itself, factors that uncertainty into the recover-or-disconnect decision." }],
        why: [{ en: "Tests that the direct OOW/Chief Engineer coordination channel doesn't become a place where disagreement gets silently resolved before the Master ever sees it." }],
        commonMistakes: [{ en: "OOW and Chief Engineer quietly settling on one theory to present a unified picture to the Master, hiding genuine uncertainty." }],
        safetyPoints: [{ en: "The Master's decision is only as good as the information reaching them — a false consensus is more dangerous than visible disagreement." }],
      },
      {
        situation: { en: "At the decision point, the OOW reports DP control has been recovered — but only barely, within tolerance with little margin." },
        mission: { en: "Determine the correct recommendation and decision." },
        expectedActions: [{ en: "The OOW's recommendation reflects the marginal nature of the recovery honestly; the Master weighs the thin margin against the readiness of the disconnect option before deciding whether to resume or disconnect anyway as a precaution." }],
        why: [{ en: "Tests that recovered isn't treated as binary — a barely-adequate recovery is a different decision than a solid one, even though both technically clear the same threshold." }],
        commonMistakes: [{ en: "Treating back-within-tolerance as equivalent to problem-solved and resuming without weighing the thin margin." }],
        safetyPoints: [{ en: "A marginal recovery could revert — the decision should account for that possibility, not just the current instant's reading." }],
      },
      {
        situation: { en: "During the emergency disconnect, the deck is short-handed and someone suggests the OS help hold or guide a line near a disconnect point." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The OS stays at assigned muster/support tasks, away from all disconnect points, regardless of how short-handed the deck team is." }],
        why: [{ en: "Continues the OS-boundary thread across every Specialized Operations module — tests whether the boundary holds under the most acute time and hazard pressure yet." }],
        commonMistakes: [{ en: "Treating the emergency itself as justification for bending the boundary, when the emergency is exactly why the boundary should hold hardest." }],
        safetyPoints: [{ en: "The boundary was tightened for emergency conditions specifically — an emergency isn't an exception to it, it's the reason for it." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_marginal_recovery_decision",
        title: { en: "A Marginal Recovery — Resume, Disconnect, or Wait?" },
        seatRankId: "master",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Master. The emergency was declared several minutes ago; all three response tracks are active. The OOW now reports that DP control has been recovered — but marginally, within tolerance with little margin to spare. The Chief Officer confirms disconnect preparation is staged and ready, unused so far.",
          },
          options: [
            {
              id: "a_resume",
              label: { en: "Resume the transfer immediately — recovery is confirmed within tolerance, get back to schedule." },
              consequence: { en: "The transfer resumes. Shortly after, the marginal recovery shows signs of degrading again." },
              feedback: { en: "Treats 'within tolerance' as equivalent to 'solved.' A thin margin is a different situation than a solid one, even when both technically clear the same threshold." },
              next: {
                id: "level_2_a",
                situation: { en: "The marginal recovery has degraded again — the position problem is redeveloping while the transfer is now actively running once more." },
                options: [
                  { id: "a1", label: { en: "Continue the transfer since stopping again seems disruptive." }, consequence: { en: "The position problem worsens while the transfer continues." }, feedback: { en: "Compounds the original miscalculation." } },
                  { id: "a2", label: { en: "Immediately order disconnect given the redeveloping problem." }, consequence: { en: "The vessel disconnects and clears, later than it should have but before the situation worsened further." }, feedback: { en: "Correct — exactly what the thin margin at Level 1 should have anticipated; further hesitation would have compounded the original mistake." }, isRecommended: true },
                  { id: "a3", label: { en: "Order another pause without disconnecting, to reassess." }, consequence: { en: "Valuable time passes without addressing an already-demonstrated problem." }, feedback: { en: "The problem has already shown itself twice now — further reassessment delays an already-clear answer." } },
                ],
              },
            },
            {
              id: "b_disconnect",
              label: { en: "Order the disconnect anyway, despite the technical recovery, given how thin the margin is." },
              consequence: { en: "The vessel disconnects and clears safely. Once stood down, questions arise about whether disconnecting was necessary given DP was technically within tolerance." },
              feedback: { en: "Not unsafe — a defensible precaution — but discards a recovery that might have held, at real cost, without first checking whether the thin margin was stable or actively failing." },
              next: {
                id: "level_2_b",
                situation: { en: "The installation and company want to understand why disconnect was ordered when DP was technically within tolerance." },
                options: [
                  { id: "b1", label: { en: "Defend the decision as fully justified without qualification." }, consequence: { en: "The explanation reads as rigid rather than honest about the judgment call made." }, feedback: { en: "Overstates certainty that wasn't actually there at the time." } },
                  { id: "b2", label: { en: "Explain the reasoning honestly — the margin was too thin to trust, a defensible precaution even if it turns out to have been avoidable." }, consequence: { en: "The installation and company receive a clear, honest account of the judgment call and its cost." }, feedback: { en: "Correct — the same value rewarded in both AHTS operations' interactive scenarios: own a conservative call, cost and all." }, isRecommended: true },
                  { id: "b3", label: { en: "Deflect, downplaying that a judgment call was made at all." }, consequence: { en: "The installation and company are left without a real understanding of what happened." }, feedback: { en: "Undermines the trust the reporting relationship depends on." } },
                ],
              },
            },
            {
              id: "c_hold",
              label: { en: "Hold the current state — pause the transfer without disconnecting, and observe briefly before deciding either way." },
              consequence: { en: "The brief observation window lets you see whether the marginal recovery is holding steady or continuing to degrade — and since disconnect preparation was already staged, it remains immediately available if needed." },
              feedback: { en: "Correct — this is exactly why parallel activation mattered earlier: the option to observe first and decide with real evidence exists only because disconnect readiness was never delayed waiting on the recovery attempt." },
              isRecommended: true,
              next: {
                id: "level_2_c",
                situation: { en: "After a brief observation window, the OOW reports the marginal recovery is holding steady, not degrading." },
                options: [
                  { id: "c1", label: { en: "Resume the transfer now that stability is confirmed." }, consequence: { en: "The transfer resumes on the basis of a verified, stable recovery rather than an untested one." }, feedback: { en: "Correct — the observation window did exactly its job: confirming genuine stability rather than a fragile recovery about to fail." }, isRecommended: true },
                  { id: "c2", label: { en: "Disconnect anyway out of continued caution despite the stable reading." }, consequence: { en: "A stable, verified recovery is discarded anyway." }, feedback: { en: "Ignores the evidence the observation window was specifically taken to gather." } },
                  { id: "c3", label: { en: "Continue holding indefinitely without deciding either way." }, consequence: { en: "The operation stalls with no resolution despite having the evidence needed to decide." }, feedback: { en: "The observation window has already answered the question — further indecision serves no purpose now." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Simultaneous Activation" },
        bestPractices: [
          { en: "All three response tracks activate the instant the emergency is declared, none waiting on the others." },
          { en: "Disconnect preparation is never delayed pending the recovery attempt's outcome, even when recovery looks likely to succeed." },
        ],
        commonErrors: [
          { en: "Reasoning that preparing to disconnect while recovery seems confident is wasted effort or an overreaction." },
        ],
      },
      {
        theme: { en: "The OOW / Chief Engineer Technical Partnership" },
        bestPractices: [
          { en: "OOW and Chief Engineer coordinate directly on the shared technical problem, in parallel with both independently reporting to the Master." },
          { en: "Disagreement between them is surfaced to the Master, not quietly resolved into a false consensus first." },
        ],
        commonErrors: [
          { en: "Settling on one theory between themselves to present a unified picture, hiding genuine uncertainty from the Master." },
        ],
      },
      {
        theme: { en: "Judging a Marginal Recovery" },
        bestPractices: [
          { en: "Recovered is not treated as binary — a thin-margin recovery is a different decision than a solid one." },
          { en: "A brief, deliberate observation window before committing either way costs nothing when disconnect readiness was never delayed." },
        ],
        commonErrors: [
          { en: "Treating back-within-tolerance as equivalent to problem-solved and resuming without weighing the margin." },
          { en: "Discarding a recovery that might have held without first checking whether it was stable or actively failing." },
        ],
      },
      {
        theme: { en: "Communication Under Pressure" },
        bestPractices: [
          { en: "A conservative call that turns out costlier than necessary is explained honestly afterward, not defended rigidly or downplayed." },
        ],
        commonErrors: [
          { en: "Defending a judgment call without qualification, or deflecting to avoid acknowledging a judgment call was made at all." },
        ],
      },
      {
        theme: { en: "Supervision & Rank Boundaries" },
        bestPractices: [
          { en: "The OS boundary holds hardest precisely during the emergency it was tightened for." },
        ],
        commonErrors: [
          { en: "Treating an active emergency as justification to bend the boundary, when the emergency is exactly why the boundary exists." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "A redeveloping problem after a marginal recovery is met with immediate disconnect, not further hesitation." },
          { en: "The resumption decision remains fully separate from the emergency-response decision, dependent on documented connection state." },
        ],
        commonErrors: [
          { en: "Continuing a resumed transfer despite a redeveloping problem because stopping again feels disruptive." },
        ],
      },
    ],
  },

  tugboat_ship_assist_maneuvering: {
    operationId: "tugboat_ship_assist_maneuvering",
    vesselTypeId: "tugboat",
    department: "deck",
    status: "draft",

    title: { en: "Tugboat — Close-Quarters Ship-Assist Maneuvering" },
    introduction: {
      en: "Every operation in this catalog so far has been about a vessel managing its own systems and position. This module is different in shape: a tug's entire operational challenge during a ship-assist maneuver is reactive and relational — continuously adapting push/pull force and position in response to a large vessel under pilotage that is itself moving, turning, and adjusting speed in confined port waters. The tug doesn't control the situation; it responds to it, in real time, at close quarters, with collision as the immediate consequence of a slow or wrong response. The tug's defining technology is azimuth (Z-drive) thrusters — 360°-steerable propulsion giving disproportionate agility and pulling force. This module is deliberately built around that maneuvering precision, not around towline tension — Tugboat.tsx's stated risks (towline rupture, whiplash, girding capsize) closely mirror AHTS's own signature risk profile, and centering this operation there would earn no genuinely new ground.",
    },
    objectives: [
      { en: "Describe the sequence of a tug's push/pull assist maneuver alongside a large vessel in a confined port area, from approach through the assist itself to release and departure." },
      { en: "Explain why this operation's central challenge is reactive and relational — continuously adapting to the assisted ship's own movements — rather than managing the tug's own internal systems." },
      { en: "Explain the role azimuth thrusters play in enabling precise, rapidly-adjustable push/pull force." },
      { en: "Identify who does what during this operation on a tug specifically, including how the smaller, more hands-on Master role differs from AHTS/PSV's larger command structures." },
      { en: "Recognize correct versus incorrect coordination when the assisted ship's movements change unexpectedly mid-maneuver." },
    ],
    context: {
      en: "Third vessel type in the catalog, first outside offshore support (AHTS/PSV). Deliberately not centered on towline tension or girding risk, despite that being Tugboat.tsx's most prominent stated hazard — that territory is already AHTS's. Crew roster reflects Tugboat.tsx's own stated positions (Master, Chief Officer, Able Seaman, Chief Engineer) rather than the 8-rank template used in every prior operation — no OOW, Bosun, OS, or Second Engineer, because this vessel type's own established content doesn't place them here. Line-free model: pure position/thrust coordination, no connecting line, to keep the operation's angle clean of AHTS's tension-based territory. Not asserting specific tug-handling technique vocabulary beyond generic positioning and thrust application.",
    },

    operationPhaseOrder: [
      "pre_assist_briefing",
      "approach_initial_positioning",
      "active_push_pull_assistance",
      "adapting_unexpected_movement",
      "release_departure",
    ],
    operationPhases: {
      pre_assist_briefing: {
        id: "pre_assist_briefing",
        title: { en: "Pre-Assist Briefing & Positioning Plan" },
        steps: [
          { en: "Toolbox talk covering the specific assist plan: which vessel, which maneuver (berthing or unberthing), expected push/pull positions." },
          { en: "Communication with the assisted ship's pilot to confirm the plan." },
          { en: "Review of port/waterway constraints — confined space, other traffic." },
          { en: "Chief Engineer confirms thruster readiness." },
        ],
      },
      approach_initial_positioning: {
        id: "approach_initial_positioning",
        title: { en: "Approach & Initial Positioning" },
        steps: [
          { en: "Tug maneuvers to its assigned position relative to the assisted ship under azimuth thruster control." },
          { en: "Position is confirmed with the pilot before any push/pull force is applied." },
        ],
        hasIllustrationPlaceholder: true,
      },
      active_push_pull_assistance: {
        id: "active_push_pull_assistance",
        title: { en: "Active Push/Pull Assistance" },
        overview: { en: "Not a one-time step — an ongoing control loop for the duration of the assist: read the assisted ship's movement, adjust position and thrust, repeat." },
        steps: [
          { en: "Tug applies push or pull force as directed by the pilot." },
          { en: "Position and thrust are continuously adjusted as the assisted ship moves." },
          { en: "Constant real-time communication with the pilot (generic commands — push, ease, stop)." },
          { en: "Continuous collision-avoidance vigilance given close proximity." },
        ],
        bestPractices: [
          { en: "Thrust is adjusted incrementally in response to the assisted ship's actual movement, not applied and left static — the tug is always reading and reacting, never just holding a fixed setting." },
        ],
      },
      adapting_unexpected_movement: {
        id: "adapting_unexpected_movement",
        title: { en: "Adapting to Unexpected Movement" },
        steps: [
          { en: "If the assisted ship's movement changes unexpectedly, the tug rapidly repositions and adjusts force to match." },
          { en: "If the situation becomes genuinely unsafe, the tug disengages and backs off rather than continuing to try to compensate." },
        ],
        bestPractices: [
          { en: "Disengaging is treated as a legitimate, non-failure outcome — not a last resort to be avoided at the cost of pushing a losing position." },
        ],
      },
      release_departure: {
        id: "release_departure",
        title: { en: "Release & Departure" },
        steps: [
          { en: "Pilot releases the tug from the assist once the maneuver is complete." },
          { en: "Tug backs off to a safe distance." },
          { en: "Assist documented — vessel, duration, any incidents." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "assist_plan_confirmation", phaseId: "pre_assist_briefing", from: "bridge", to: "assisted_vessel", trigger: { en: "Before the assist starts" }, content: { en: "Confirmation of the assist plan — which maneuver, expected positions." }, whyItMatters: { en: "Same confirm-the-current-plan pattern as every prior operation's external channel." } },
      { id: "engine_ready_confirmation", phaseId: "pre_assist_briefing", from: "engine", to: "bridge", trigger: { en: "Before the assist starts" }, content: { en: "Confirmation thruster systems are available and nominal." }, whyItMatters: { en: "The single readiness gate this operation needs — no dual-system complexity like PSV's DP-plus-pumps." } },
      { id: "position_confirmation", phaseId: "approach_initial_positioning", from: "bridge", to: "assisted_vessel", trigger: { en: "Position established" }, content: { en: "Confirmation the tug is in position and ready to apply force." }, whyItMatters: { en: "Force is never applied before this is confirmed both internally and externally." } },
      { id: "ongoing_push_pull_coordination", phaseId: "active_push_pull_assistance", from: "assisted_vessel", to: "bridge", trigger: { en: "Continuous for the duration of the assist" }, content: { en: "Real-time push/ease/stop commands from the pilot; continuous position/status feedback from the tug." }, whyItMatters: { en: "Not a discrete, phase-bound touchpoint but the operation's primary channel throughout — the communication-layer expression of the reactive control loop." } },
      { id: "disengage_notification", phaseId: "adapting_unexpected_movement", from: "bridge", to: "assisted_vessel", trigger: { en: "Tug initiates disengagement" }, content: { en: "Explicit communication that the tug is backing off due to an unsafe developing situation." }, whyItMatters: { en: "The pilot needs to know immediately that assist force is being withdrawn." } },
      { id: "stop_flag_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe observation" }, content: { en: "Universal stop/flag call." }, whyItMatters: { en: "Same carried-forward principle as every prior operation — not rank-gated." } },
      { id: "release_confirmation", phaseId: "release_departure", from: "assisted_vessel", to: "bridge", trigger: { en: "Maneuver complete" }, content: { en: "Pilot releases the tug from the assist." }, whyItMatters: { en: "The tug doesn't withdraw force unilaterally — release is confirmed, not assumed." } },
      { id: "departure_confirmation", phaseId: "release_departure", from: "bridge", to: "assisted_vessel", trigger: { en: "Clear of the assisted ship" }, content: { en: "Confirmation of departure." }, whyItMatters: { en: "Closes the loop." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "The most distinctive command identity in the catalog. On every prior operation, the Master held authority and oversight while others executed. Here, given the tug's small crew and the precision-maneuvering nature of the work, the Master personally conns the tug during the push/pull assist — operating the azimuth thruster controls directly, not delegating execution while retaining only decision authority. Command authority and hands-on execution are the same person, at the same moment." } },
      { rankId: "chief_officer", identity: { en: "Direct support to the Master throughout the maneuver: handling pilot communications, monitoring proximity and collision risk, maintaining situational awareness the Master — occupied with the controls — can't fully hold alone. Ready to take the conn if required. A tighter, more continuously-engaged support role than any prior operation's second-in-command, a direct consequence of the crew's small size." } },
      { rankId: "ab", identity: { en: "A genuinely lighter role than any prior operation's AB. With no line work in this line-free model and no cargo handling, the AB's role here is visual lookout and general deck readiness — present and ready if a deck-level task arises, but this operation's core challenge doesn't route through the AB the way AHTS's and PSV's did." } },
      { rankId: "chief_engineer", identity: { en: "Owns thruster system readiness and continuous monitoring throughout the assist — the same reports-and-sustains identity as AHTS's and PSV's Chief Engineers in their own routine operations. Given some tugs run with a single engineering officer, this role also carries more weight per-person than on a larger vessel, though the shape of the responsibility doesn't change." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Personally conns the tug during the push/pull assist, operating the azimuth thrusters directly; holds overall command and the disengage decision." }],
        iMonitor: [{ en: "The assisted ship's movement and position continuously; proximity and collision risk." }],
        iReport: [{ en: "To company per standing orders; communicates disengagement to the pilot when initiated." }],
        iDoNotAuthorize: [{ en: "Departing from the pilot's directed maneuver without communicating the change — even hands-on, coordination isn't unilateral." }],
      },
      chief_officer: {
        iExecute: [{ en: "Handles pilot communications; monitors proximity and collision risk; ready to take the conn if required." }],
        iMonitor: [{ en: "Situational awareness the Master, occupied with the controls, can't fully hold alone." }],
        iReport: [{ en: "Status to the Master; relays pilot commands." }],
        iDoNotAuthorize: [{ en: "Operating the thrusters unless actually taking the conn; the disengage decision, unless the conn has been formally handed over." }],
      },
      ab: {
        iExecute: [{ en: "Visual lookout; general deck readiness for any task that arises." }],
        iMonitor: [{ en: "Deck-level conditions." }],
        iReport: [{ en: "Any observation to the bridge." }],
        iDoNotAuthorize: [{ en: "Maneuvering decisions; independent action beyond the assigned lookout/readiness role." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Prepares and maintains thruster system readiness throughout the assist." }],
        iMonitor: [{ en: "Continuous thruster performance." }],
        iReport: [{ en: "Pre-assist readiness confirmation; any anomaly to the bridge immediately." }],
        iDoNotAuthorize: [{ en: "Maneuvering decisions; direction of the bridge team." }],
      },
    },
    // No supervisionRequirements entry: this vessel's own established crew
    // (Tugboat.tsx) has no junior/cadet rating on this roster at all — not
    // an oversight, a genuine difference from every AHTS/PSV operation.
    responsibilityLevels: {
      master: "lead",
      chief_officer: "support",
      ab: "observe",
      chief_engineer: "support",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_tugboat",
        targetRanks: ["deck_cadet", "ab"],
        prompt: { en: "Put the five phases of a tugboat ship-assist maneuver in the correct order." },
        items: [
          { id: "pre_assist_briefing", label: { en: "Pre-Assist Briefing & Positioning Plan" } },
          { id: "approach_initial_positioning", label: { en: "Approach & Initial Positioning" } },
          { id: "active_push_pull_assistance", label: { en: "Active Push/Pull Assistance" } },
          { id: "adapting_unexpected_movement", label: { en: "Adapting to Unexpected Movement" } },
          { id: "release_departure", label: { en: "Release & Departure" } },
        ],
        correctOrder: ["pre_assist_briefing", "approach_initial_positioning", "active_push_pull_assistance", "adapting_unexpected_movement", "release_departure"],
      },
      {
        type: "error_identification",
        id: "err_informal_conn_transfer",
        targetRanks: ["chief_officer", "master", "ab"],
        scenario: { en: "The Chief Officer takes independent maneuvering action without the conn being formally handed over by the Master. The AB reports an observed hazard to the bridge. The Master communicates a course deviation to the pilot before acting on it." },
        choices: [
          { id: "c1", label: { en: "Chief Officer taking independent maneuvering action without a formal conn handover" }, isError: true, explanation: { en: "Operating the thrusters requires actually taking the conn, not just being ready to — an informal takeover isn't authorized regardless of intent." } },
          { id: "c2", label: { en: "AB reporting an observed hazard to the bridge" }, isError: false, explanation: { en: "Correct — matches the assigned lookout/readiness role." } },
          { id: "c3", label: { en: "Master communicating a course deviation to the pilot before acting on it" }, isError: false, explanation: { en: "Correct — even hands-on, coordination isn't unilateral." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_preassist_tugboat",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The tug is standing by and the assist is scheduled to begin shortly. Review the readiness snapshot below before starting." },
        items: [
          { id: "assist_plan_confirmed", label: { en: "Assist plan confirmed with the pilot" }, isSatisfied: true },
          { id: "waterway_reviewed", label: { en: "Waterway and traffic conditions reviewed" }, isSatisfied: true },
          { id: "position_plan_confirmed", label: { en: "Initial position plan confirmed" }, isSatisfied: true },
          { id: "engine_ready", label: { en: "Chief Engineer thruster readiness confirmed" }, isSatisfied: false },
          { id: "lookout_briefed", label: { en: "AB briefed on lookout duties for this specific assist" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "During a busy moment, the Chief Officer notices the Master seems to be struggling to react fast enough to the assisted ship's movement and considers just taking over the thruster controls directly to help." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer explicitly requests and receives a formal handover of the conn from the Master before touching the controls — never takes over informally, even with good intentions." }],
        why: [{ en: "Tests whether the conn-transfer boundary holds under exactly the pressure that makes it most tempting to skip." }],
        commonMistakes: [{ en: "Reasoning that grabbing the controls to help is obviously fine given the circumstances, without a formal handover." }],
        safetyPoints: [{ en: "Two people making uncoordinated inputs to the same thrusters at the same critical moment is more dangerous than one person reacting a beat slower." }],
      },
      {
        situation: { en: "Mid-assist, conditions deteriorate to the point where disengaging is the correct call, but the assist is nearly complete." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Master disengages when the situation is genuinely unsafe, regardless of how close the assist is to completion." }],
        why: [{ en: "Tests whether disengaging-is-not-a-failure holds at the moment it's hardest to accept." }],
        commonMistakes: [{ en: "Pushing to complete the assist because backing off so close to the end feels like an avoidable failure." }],
        safetyPoints: [{ en: "The assist can always be re-attempted; a collision cannot be undone." }],
      },
      {
        situation: { en: "The assist is proceeding smoothly. The AB, on lookout, notices something developing that isn't yet clearly dangerous." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The AB reports the observation to the bridge immediately, even though it's not yet clearly an emergency and the maneuver is going smoothly." }],
        why: [{ en: "Tests whether the AB's genuinely lighter lookout role still gets treated as real and load-bearing, since it's this operation's only deck-level coverage while the bridge team is fully occupied with the maneuver." }],
        commonMistakes: [{ en: "Hesitating to report something uncertain, not wanting to interrupt a maneuver that's going well." }],
        safetyPoints: [{ en: "The bridge team's attention is entirely consumed by the maneuver — the AB's lookout is genuinely the only coverage for anything outside that focus." }],
      },
      {
        situation: { en: "The assisted ship makes a slightly larger-than-expected turn; the instinct is to apply a strong, large correction rather than a proportionate one." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "Adjustments are made incrementally and proportionately to the actual movement observed, not with large, reactive over-corrections." }],
        why: [{ en: "Tests the failure mode in the opposite direction from under-reacting." }],
        commonMistakes: [{ en: "Treating any unexpected movement as cause for a dramatic correction, which can itself create a new close-quarters hazard." }],
        safetyPoints: [{ en: "An overcorrection in tight quarters can put the tug somewhere more dangerous than the original deviation would have." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_uncertain_observation",
        title: { en: "An Uncertain Observation During a Smooth Assist" },
        seatRankId: "ab",
        root: {
          id: "level_1",
          situation: {
            en: "You are the AB, on lookout during a smooth-going assist. You notice something developing — not clearly dangerous yet, could be nothing. The bridge team is fully occupied with the maneuver itself.",
          },
          options: [
            {
              id: "a_silent",
              label: { en: "Say nothing for now — it's probably nothing, and the bridge team is clearly busy." },
              consequence: { en: "Nobody else is watching that area. What you noticed continues developing without anyone aware of it." },
              feedback: { en: "Silence isn't a neutral choice here — your lookout is genuinely the only coverage for anything outside the maneuver itself, precisely because the bridge team's attention is fully consumed." },
              next: {
                id: "level_2_a",
                situation: { en: "What you noticed has become clearly more concerning. You're the only one who's known about it from the start." },
                options: [
                  { id: "a1", label: { en: "Report now, but downplay how long you've known." }, consequence: { en: "The bridge gets an incomplete picture of how long this has been developing." }, feedback: { en: "Understates something the bridge team actually needs to know." } },
                  { id: "a2", label: { en: "Report now, fully honest that you noticed it earlier and didn't say anything." }, consequence: { en: "The bridge team gets an accurate picture of how long this has been developing." }, feedback: { en: "Correct — full, honest disclosure, including the delay, is what's actually needed to assess the situation." }, isRecommended: true },
                  { id: "a3", label: { en: "Stay quiet a bit longer, unsure how the delay will be received." }, consequence: { en: "The situation continues developing with still nobody else aware." }, feedback: { en: "Compounds the original delay further." } },
                ],
              },
            },
            {
              id: "b_report",
              label: { en: "Report it immediately to the bridge, even though it's not clearly dangerous yet." },
              consequence: { en: "The bridge team is informed early, while the situation is still manageable." },
              feedback: { en: "Correct — a junior rank's job with uncertain information is to escalate it, not privately decide it isn't worth mentioning." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The bridge team, occupied with the maneuver, simply says 'keep an eye on it' without acting further." },
                options: [
                  { id: "b1", label: { en: "Consider the job done since it was reported and acknowledged." }, consequence: { en: "Active monitoring stops even though nothing has actually changed." }, feedback: { en: "Treats a single report as satisfying an ongoing responsibility." } },
                  { id: "b2", label: { en: "Continue actively monitoring and report again if anything changes." }, consequence: { en: "Any further development gets caught and reported promptly." }, feedback: { en: "Correct — reporting once doesn't end the lookout responsibility, it's ongoing for the whole assist." }, isRecommended: true },
                  { id: "b3", label: { en: "Stop watching that area now that it's the bridge's responsibility." }, consequence: { en: "The only coverage for that area is withdrawn." }, feedback: { en: "The bridge's acknowledgment doesn't replace the lookout — it was never redundant coverage." } },
                ],
              },
            },
            {
              id: "c_self_monitor",
              label: { en: "Keep watching closely yourself for a bit longer, and only report if it clearly gets worse." },
              consequence: { en: "You continue monitoring alone. The bridge team has no idea anything is being watched." },
              feedback: { en: "Not the same situation as hold-and-verify seen elsewhere in this content — those involved someone with full information deciding how to act. Here, the decision is whether to report at all, and uncertain information from a lookout should be escalated, not privately managed." },
              next: {
                id: "level_2_c",
                situation: { en: "The bridge team, fully occupied, never had any independent chance to notice what you're still quietly watching. It's now clearly a real hazard." },
                options: [
                  { id: "c1", label: { en: "Report now, immediately." }, consequence: { en: "The bridge is finally informed, later than it should have been." }, feedback: { en: "Correct, though late — this is the direct cost of the earlier delay: the bridge had zero independent chance to catch this." }, isRecommended: true },
                  { id: "c2", label: { en: "Keep monitoring a bit more to be fully sure first." }, consequence: { en: "The delay continues even as the hazard has already become clear." }, feedback: { en: "There's nothing left to verify — the hazard is already confirmed." } },
                  { id: "c3", label: { en: "Report now, but treat it as no big deal since it hasn't become dangerous yet." }, consequence: { en: "The bridge receives a misleadingly casual account of a real hazard." }, feedback: { en: "Understates a situation that's already been confirmed as a real hazard." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Reactive & Relational Maneuvering" },
        bestPractices: [
          { en: "Thrust is adjusted incrementally in response to the assisted ship's actual movement, never applied and left static." },
          { en: "Adjustments are proportionate to the actual movement observed — over-correction is its own hazard." },
        ],
        commonErrors: [
          { en: "Treating any unexpected movement as cause for a dramatic correction, which can create a new close-quarters hazard." },
        ],
      },
      {
        theme: { en: "Conn Authority & Transfer" },
        bestPractices: [
          { en: "The conn is formally handed over before anyone but the current holder touches the thrusters." },
        ],
        commonErrors: [
          { en: "Grabbing the controls to help during a busy moment without a formal handover." },
        ],
      },
      {
        theme: { en: "Disengagement as a Legitimate Outcome" },
        bestPractices: [
          { en: "Disengaging is a legitimate response to a genuinely unsafe situation, regardless of how close the assist is to completion." },
        ],
        commonErrors: [
          { en: "Pushing to complete a nearly-finished assist because backing off feels like an avoidable failure." },
        ],
      },
      {
        theme: { en: "The Lookout Role" },
        bestPractices: [
          { en: "The AB's lookout is treated as genuine, load-bearing coverage — the only observation outside the maneuver itself." },
          { en: "Uncertain observations are escalated, not privately managed by the person who noticed them." },
        ],
        commonErrors: [
          { en: "Hesitating to report something uncertain, not wanting to interrupt a maneuver that's going well." },
          { en: "Treating a single report as satisfying an ongoing responsibility." },
        ],
      },
      {
        theme: { en: "Reporting Uncertain Information" },
        bestPractices: [
          { en: "A junior rank's role with ambiguous information is to escalate it — the judgment of whether it matters belongs to whoever receives the report." },
          { en: "When a report was delayed, the delay itself is disclosed honestly, not downplayed." },
        ],
        commonErrors: [
          { en: "Deciding uncertain information probably isn't worth mentioning before anyone senior has had the chance to judge that." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "Coordination stays two-way even when one person is hands-on executing — a deviation is communicated before acting on it, not after." },
        ],
        commonErrors: [
          { en: "Treating the Master's hands-on control of the maneuver as license to act unilaterally without communicating changes." },
        ],
      },
    ],
  },

  tugboat_thruster_failure_emergency: {
    operationId: "tugboat_thruster_failure_emergency",
    vesselTypeId: "tugboat",
    department: "deck",
    status: "draft",

    title: { en: "Tugboat — Thruster/Steering Failure During Close-Quarters Assist" },
    introduction: {
      en: "This operation places a thruster or steering failure during an active close-quarters push/pull assist — the tug's only means of controlling position and avoiding collision with the much larger assisted vessel degrades or fails, at exactly the moment proximity makes any loss of control immediately dangerous. Two genuinely new threads converge here. First: the single-engineer crew reality established in operation one means there may be no Second Engineer to share the diagnostic and response burden with — every AHTS/PSV Engine-department emergency so far has had two engineers, one directing and one executing; here it may be one person doing both, alone. Second: because the tug's own loss of control directly threatens the assisted vessel — not a fixed installation — this is the catalog's first genuinely reciprocal emergency. The other vessel isn't just notified and left waiting; it may need to actively maneuver away itself, in real time, based on what the tug tells it.",
    },
    objectives: [
      { en: "Recognize a developing thruster/steering problem as requiring immediate notification to the assisted vessel, given the collision risk it creates for both vessels — not just the tug." },
      { en: "Describe the sequence of actions required when propulsion or steering control degrades during an active close-quarters assist." },
      { en: "Explain how the sole engineering officer diagnoses and responds to this emergency alone, without a Second Engineer to share the workload." },
      { en: "Explain how command and execution authority shift when the Master's own ability to maneuver the vessel is directly compromised by the failure itself." },
      { en: "Recognize correct versus incorrect prioritization between attempting to diagnose or restore propulsion and immediately alerting the assisted vessel to the danger." },
    ],
    context: {
      en: "Second Tugboat operation, continuing directly from operation one's push/pull assist setup, mid-maneuver. Not a variation on operation one's adapting-to-unexpected-movement phase — that was about the assisted ship's movement changing; this is about the tug's own capability to respond failing, a different failure mode entirely. The sole engineering officer is modeled as both director and executor of their own diagnosis, the same reasoning already used for the Master's dual authority/execution role in operation one. The assisted vessel may need to take real evasive action based on what the tug reports — a two-sided emergency response, not a one-sided notification. Not assuming a specific technical failure mode (partial vs. total thruster loss, steering gear vs. power failure) — described generically as a developing thruster/steering problem. If outside assistance is needed, the request goes through the appropriate channel (port authority/VTS/another vessel) — kept generic rather than adding a third CommunicationParty value for what is a contingency branch, not this operation's core content.",
    },

    operationPhaseOrder: [
      "failure_detection_alert",
      "immediate_notification_assisted_vessel",
      ["chief_engineer_diagnosis", "bridge_side_danger_management"],
      "decision_regain_control_or_request_assistance",
      "stabilization_clear_or_assisted_recovery",
      "stand_down_post_incident",
    ],
    operationPhases: {
      failure_detection_alert: {
        id: "failure_detection_alert",
        title: { en: "Failure Detection & Alert" },
        steps: [
          { en: "Whoever is at the controls notices thruster/steering response degrading — commands aren't translating into expected vessel movement." },
          { en: "Immediate alert to the rest of the crew." },
        ],
        bestPractices: [
          { en: "Given close proximity to the assisted vessel, this is treated as urgent from the first sign of degraded response, not gradually assessed before raising concern." },
        ],
      },
      immediate_notification_assisted_vessel: {
        id: "immediate_notification_assisted_vessel",
        title: { en: "Immediate Notification to Assisted Vessel" },
        steps: [
          { en: "The assisted vessel is notified immediately — essentially simultaneous with internal alert, not after diagnostic attempts begin." },
        ],
        bestPractices: [
          { en: "Notification is prioritized ahead of diagnosis. The other vessel's safety depends on knowing now, not once the tug has a clearer picture of what's wrong." },
        ],
      },
      chief_engineer_diagnosis: {
        id: "chief_engineer_diagnosis",
        title: { en: "Chief Engineer Diagnosis" },
        overview: { en: "Runs concurrently with Bridge-Side Danger Management." },
        steps: [
          { en: "The sole engineering officer attempts to diagnose and restore thruster/steering function, alone — no Second Engineer to share the workload or provide a second opinion." },
          { en: "Reports status continuously to the bridge." },
        ],
        hasIllustrationPlaceholder: true,
      },
      bridge_side_danger_management: {
        id: "bridge_side_danger_management",
        title: { en: "Bridge-Side Danger Management" },
        overview: { en: "Runs concurrently with Chief Engineer Diagnosis." },
        steps: [
          { en: "The bridge team communicates the developing situation to the assisted vessel as it evolves." },
          { en: "Works with whatever control remains to minimize drift and closing distance." },
          { en: "The AB's lookout becomes the primary real-time gauge of closing distance and drift." },
        ],
      },
      decision_regain_control_or_request_assistance: {
        id: "decision_regain_control_or_request_assistance",
        title: { en: "Decision: Regain Control or Request Assistance" },
        steps: [
          { en: "Based on the Chief Engineer's diagnosis status and the drift/danger situation, a decision is made: if sufficient control can be regained, the crew continues managing the situation with the tug's own resources; if not, outside assistance is requested." },
        ],
        bestPractices: [
          { en: "Outside assistance is treated as a legitimate, planned-for outcome, not an unexamined assumption that the crew always can resolve it alone." },
        ],
        hasIllustrationPlaceholder: true,
      },
      stabilization_clear_or_assisted_recovery: {
        id: "stabilization_clear_or_assisted_recovery",
        title: { en: "Stabilization & Clear (or Assisted Recovery)" },
        steps: [
          { en: "If control is regained: the tug moves to a safe distance under whatever control is available; the situation stabilizes." },
          { en: "If outside assistance was requested: the tug maintains the safest possible position while awaiting help, managed collaboratively with the assisted vessel and whoever is responding." },
        ],
      },
      stand_down_post_incident: {
        id: "stand_down_post_incident",
        title: { en: "Stand-Down & Post-Incident" },
        steps: [
          { en: "Muster/headcount; incident documented." },
          { en: "Assessment of thruster system status." },
          { en: "Separate, still-open decision: whether the tug can safely resume operations or needs to return to port." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "internal_alert", phaseId: "failure_detection_alert", from: "bridge", to: "bridge", trigger: { en: "Degraded response noticed" }, content: { en: "Immediate internal alert to the rest of the crew." }, whyItMatters: { en: "Same urgency principle as every prior detection touchpoint." } },
      { id: "assisted_vessel_notification", phaseId: "immediate_notification_assisted_vessel", from: "bridge", to: "assisted_vessel", trigger: { en: "Immediately on detection" }, content: { en: "Notification of the developing thruster/steering problem." }, whyItMatters: { en: "Prioritized ahead of diagnosis — the other vessel's safety depends on knowing now." } },
      { id: "assisted_vessel_response_report", phaseId: "bridge_side_danger_management", from: "assisted_vessel", to: "bridge", trigger: { en: "Continuous, as the situation evolves" }, content: { en: "The assisted vessel reports its own response — evasive action taken, intentions." }, whyItMatters: { en: "The catalog's first two-way emergency channel — every prior external touchpoint was one-directional; here the other party actively reports back what it's doing, because their response and the tug's are interdependent." } },
      { id: "tug_status_updates", phaseId: "bridge_side_danger_management", from: "bridge", to: "assisted_vessel", trigger: { en: "Continuous" }, content: { en: "Updates on the tug's own status and drift." }, whyItMatters: { en: "The other half of the same two-way exchange." } },
      { id: "chief_engineer_status", phaseId: "chief_engineer_diagnosis", from: "engine", to: "bridge", trigger: { en: "Continuous" }, content: { en: "Diagnosis and restoration status." }, whyItMatters: { en: "Same reports-and-sustains-or-directs shape as every prior Engine touchpoint, but from a single officer with no peer to coordinate with." } },
      { id: "ab_lookout_reports", phaseId: "bridge_side_danger_management", from: "deck_team", to: "bridge", trigger: { en: "Continuous" }, content: { en: "Closing distance and drift observations." }, whyItMatters: { en: "The lookout role becomes the primary real-time gauge of danger during this emergency — its clearest load-bearing moment yet." } },
      { id: "decision_communication", phaseId: "decision_regain_control_or_request_assistance", from: "bridge", to: "bridge", trigger: { en: "Decision point" }, content: { en: "Master communicates the decision to regain control internally or, if needed, to request outside assistance through the appropriate channel (port authority, VTS, or another vessel)." }, whyItMatters: { en: "The first operation where this decision genuinely has two legitimate branches, not one expected outcome. The exact external recipient of an assistance request is kept out of the party model deliberately — it isn't this operation's core content, and no existing CommunicationParty value fits it any better than \"installation\" fit the assisted vessel in operation one." } },
      { id: "stop_flag_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe observation" }, content: { en: "Universal stop/flag call." }, whyItMatters: { en: "Same carried-forward principle as every prior operation." } },
      { id: "outcome_notification", phaseId: "stand_down_post_incident", from: "bridge", to: "assisted_vessel", trigger: { en: "Once stood down" }, content: { en: "Outcome and resumption status." }, whyItMatters: { en: "Same closing-the-loop pattern as every prior operation's post-incident notification." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Continues attempting to work with whatever degraded thruster/steering control remains throughout the emergency. Holds overall command the entire time. Where operation one's Master combined hands-on execution with authority by design, here that combination continues under duress, not by choice but by necessity: there's no working system for anyone else to take over." } },
      { rankId: "chief_officer", identity: { en: "In operation one, supported the Master and stood ready to take the conn. Here, with the Master fighting for whatever control remains and unable to split attention, the Chief Officer becomes the primary holder of the external coordination effort: running the two-way exchange with the assisted vessel, relaying the Chief Engineer's diagnosis status, holding the overall situational picture. A genuine shift from readiness-to-support toward autonomously running their own piece of the crisis." } },
      { rankId: "ab", identity: { en: "The lookout role from operation one becomes this emergency's primary real-time danger gauge — closing distance and drift toward the assisted vessel. The stakes are far higher here, but the nature of the task doesn't change: still observation and reporting, not hands-on execution." } },
      { rankId: "chief_engineer", identity: { en: "In operation one, owned thruster readiness in the reports-and-sustains mold. Here, alone — no Second Engineer — diagnosing and attempting to restore function is entirely this rank's own autonomous effort. The same shift AHTS's Fire Response and PSV's DP-loss operation both made under their own emergencies." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Continues working whatever degraded thruster/steering control remains; holds overall command throughout; decides regain-control-or-request-assistance at the convergence point." }],
        iMonitor: [{ en: "The Chief Engineer's diagnosis status, the Chief Officer's coordination status, overall danger level (drift/proximity)." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Overriding the Chief Officer's judgment on communication content with the assisted vessel; directing the Chief Engineer's internal diagnostic approach." }],
      },
      chief_officer: {
        iExecute: [{ en: "Runs the two-way coordination with the assisted vessel — relaying updates, receiving their response actions; relays the Chief Engineer's diagnosis status; holds the overall situational picture." }],
        iMonitor: [{ en: "The assisted vessel's own response and maneuvering; overall coordination status." }],
        iReport: [{ en: "Continuous situational updates to the Master; communicates directly with the assisted vessel." }],
        iDoNotAuthorize: [{ en: "The regain-control-or-request-assistance decision itself (the Master's call); directing the Chief Engineer's diagnostic work." }],
      },
      ab: {
        iExecute: [{ en: "Continuous lookout — closing distance and drift toward the assisted vessel." }],
        iMonitor: [{ en: "Proximity and collision risk in real time." }],
        iReport: [{ en: "Immediate reports to the bridge on any change in distance or drift." }],
        iDoNotAuthorize: [{ en: "Any hands-on maneuvering or communication role; independent action beyond the lookout/reporting role." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Diagnoses and attempts to restore thruster/steering function, alone." }],
        iMonitor: [{ en: "Own diagnostic progress, continuously." }],
        iReport: [{ en: "Continuous status to the bridge." }],
        iDoNotAuthorize: [{ en: "The regain-control-or-request-assistance decision itself; directing the bridge team's coordination or positioning efforts." }],
      },
    },
    // chief_officer and chief_engineer both shift "support" (op 1) -> "lead"
    // here, confirmed deliberate. chief_officer: no longer just ready to
    // take the conn -- autonomously runs the entire external coordination
    // effort as their own domain. chief_engineer: the third occurrence of
    // the support->lead emergency-diagnosis shift across the catalog
    // (following AHTS Fire Response and PSV's DP-loss operation), now a
    // genuinely established archetype rather than a one-off.
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      ab: "observe",
      chief_engineer: "lead",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_tugboat_thruster",
        targetRanks: ["deck_cadet", "ab"],
        prompt: { en: "Put the phases of this thruster/steering failure response in the correct order. Two phases happen at the same time — the checker accepts any order between items that are genuinely concurrent." },
        items: [
          { id: "failure_detection_alert", label: { en: "Failure Detection & Alert" } },
          { id: "immediate_notification_assisted_vessel", label: { en: "Immediate Notification to Assisted Vessel" } },
          { id: "chief_engineer_diagnosis", label: { en: "Chief Engineer Diagnosis" } },
          { id: "bridge_side_danger_management", label: { en: "Bridge-Side Danger Management" } },
          { id: "decision_regain_control_or_request_assistance", label: { en: "Decision: Regain Control or Request Assistance" } },
          { id: "stabilization_clear_or_assisted_recovery", label: { en: "Stabilization & Clear (or Assisted Recovery)" } },
          { id: "stand_down_post_incident", label: { en: "Stand-Down & Post-Incident" } },
        ],
        correctOrder: [
          "failure_detection_alert",
          "immediate_notification_assisted_vessel",
          ["chief_engineer_diagnosis", "bridge_side_danger_management"],
          "decision_regain_control_or_request_assistance",
          "stabilization_clear_or_assisted_recovery",
          "stand_down_post_incident",
        ],
      },
      {
        type: "error_identification",
        id: "err_delayed_notification",
        targetRanks: ["chief_officer", "master", "ab"],
        scenario: { en: "The Chief Officer waits to notify the assisted vessel until after the Chief Engineer's diagnosis is complete. The AB continuously reports closing distance and drift to the bridge. The Chief Engineer diagnoses the thruster problem alone and reports status to the bridge." },
        choices: [
          { id: "c1", label: { en: "Chief Officer waiting to notify the assisted vessel until after diagnosis is complete" }, isError: true, explanation: { en: "Notification happens immediately, essentially simultaneous with internal alert, not after diagnostic attempts." } },
          { id: "c2", label: { en: "AB continuously reporting closing distance and drift to the bridge" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "Chief Engineer diagnosing the thruster problem alone and reporting status to the bridge" }, isError: false, explanation: { en: "Correct — matches the established solo-diagnosis pattern." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_standdown_tugboat_thruster",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The vessel is stabilized and clear. Review the readiness snapshot below before the Master declares stand-down and before any decision to resume operations." },
        items: [
          { id: "vessel_stabilized", label: { en: "Vessel confirmed clear/stabilized at a safe distance" }, isSatisfied: true },
          { id: "crew_mustered", label: { en: "Crew mustered and accounted for" }, isSatisfied: true },
          { id: "assisted_vessel_informed", label: { en: "Assisted vessel informed of the outcome" }, isSatisfied: true },
          { id: "thruster_status_assessed", label: { en: "Chief Engineer confirms thruster system status fully assessed" }, isSatisfied: false },
          { id: "resume_or_port_decided", label: { en: "Decision made on whether the tug can resume operations or needs to return to port" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "Immediately after noticing degraded thruster response, there's an instinct to quickly check what's wrong before radioing the assisted vessel, to avoid causing alarm over something that might be minor." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The assisted vessel is notified immediately, before any diagnostic attempt, regardless of how minor the problem might turn out to be." }],
        why: [{ en: "Tests whether the notify-first principle holds against the instinct to know more before saying something." }],
        commonMistakes: [{ en: "Delaying notification by even a short diagnostic check, reasoning a false alarm would be worse than a short delay." }],
        safetyPoints: [{ en: "The other vessel's own safety depends on knowing as early as possible." }],
      },
      {
        situation: { en: "The Chief Engineer's diagnosis reveals the problem isn't something they can resolve alone with what's aboard; requesting outside assistance means acknowledging it can't be handled internally." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Master requests outside assistance once it's genuinely needed, without delaying to first exhaust every possible self-resolution attempt." }],
        why: [{ en: "Tests whether outside-assistance-as-a-legitimate-outcome holds against the instinct to keep trying alone." }],
        commonMistakes: [{ en: "Delaying the request for help out of a sense the crew should handle it themselves." }],
        safetyPoints: [{ en: "A tug with a large vessel nearby and no propulsion is a developing hazard for as long as help is delayed." }],
      },
      {
        situation: { en: "With the bridge team fully occupied, the AB's drift/distance reports become, for a period, the most current information anyone has about how dangerous the situation actually is." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The AB continues reporting distance and drift changes promptly and clearly, recognizing this may be the only real-time picture the bridge team has." }],
        why: [{ en: "Tests whether the AB's reporting discipline holds when it's genuinely the most consequential information in the operation." }],
        commonMistakes: [{ en: "Hesitating or under-communicating under pressure, exactly when clear, frequent reporting matters most." }],
        safetyPoints: [{ en: "A role that looks minor on paper can become the single most important source of information in a genuine emergency." }],
      },
      {
        situation: { en: "The tug reports its situation to the assisted vessel, but the assisted vessel's own response doesn't match what the tug's crew expected." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer continues the coordination exchange, seeking clarification rather than assuming the worst or acting unilaterally based on an assumption." }],
        why: [{ en: "Tests the two-way coordination dynamic under its most stressful condition." }],
        commonMistakes: [{ en: "Assuming the assisted vessel understands the danger and is responding appropriately without confirming it." }],
        safetyPoints: [{ en: "In a reciprocal emergency, an assumption about the other vessel's actions is exactly the kind of gap that turns a manageable situation into a collision." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_ambiguous_reply",
        title: { en: "An Ambiguous Reply From the Assisted Vessel" },
        seatRankId: "chief_officer",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Chief Officer. The thruster/steering problem was just detected and you've sent the immediate notification to the assisted vessel. The Chief Engineer is beginning diagnosis alone. The assisted vessel's reply comes back — but it's incomplete, and doesn't clearly confirm they understood the danger or what they're doing about it.",
          },
          options: [
            {
              id: "a_assume",
              label: { en: "Assume they understood and are handling it appropriately — move on to internal coordination." },
              consequence: { en: "No further contact is made. The exchange is treated as resolved." },
              feedback: { en: "Assuming the best from an ambiguous reply is exactly the failure mode this coordination role exists to prevent — a reciprocal emergency depends on confirmed understanding, not assumed understanding." },
              next: {
                id: "level_2_a",
                situation: { en: "It later becomes clear the assisted vessel did not understand the danger and has taken no evasive action." },
                options: [
                  { id: "a1", label: { en: "Continue as before since it seems too late to change anything." }, consequence: { en: "The situation continues developing without correction." }, feedback: { en: "It isn't too late — this compounds the original assumption." } },
                  { id: "a2", label: { en: "Immediately re-contact the assisted vessel with a clearer, more explicit warning." }, consequence: { en: "The assisted vessel is now clearly informed and can respond appropriately." }, feedback: { en: "Correct — fixing a mistake in your own domain is your responsibility, not something to hand off." }, isRecommended: true },
                  { id: "a3", label: { en: "Escalate to the Master to handle it directly instead." }, consequence: { en: "The Master becomes involved in fixing a coordination gap that was still directly resolvable." }, feedback: { en: "Avoidable — this remains resolvable within your own domain." } },
                ],
              },
            },
            {
              id: "b_clarify",
              label: { en: "Immediately follow up, seeking explicit clarification before considering the notification handled." },
              consequence: { en: "The exchange continues until the situation is genuinely clear on both sides." },
              feedback: { en: "Correct — this coordination channel is your own domain now, and resolving ambiguity in it directly is the job." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The assisted vessel clarifies they are taking appropriate action. Meanwhile, the Chief Engineer reports the diagnosis isn't going well — outside assistance may be needed soon." },
                options: [
                  { id: "b1", label: { en: "Wait for the Chief Engineer to fully exhaust diagnostic options before mentioning this to the Master." }, consequence: { en: "The Master is informed later than necessary." }, feedback: { en: "Delays information the Master needs for the upcoming decision." } },
                  { id: "b2", label: { en: "Relay the Chief Engineer's status to the Master promptly, including the developing possibility outside assistance may be needed." }, consequence: { en: "The Master has a complete, timely picture for the upcoming decision." }, feedback: { en: "Correct — the Master's decision at the convergence point can't be well-informed without this." }, isRecommended: true },
                  { id: "b3", label: { en: "Decide independently to request outside assistance without involving the Master first." }, consequence: { en: "A decision reserved for the Master is made without them." }, feedback: { en: "Oversteps the boundary between leading communication and making the assistance-request decision, which stays the Master's alone." } },
                ],
              },
            },
            {
              id: "c_escalate",
              label: { en: "Escalate directly to the Master, unsure whether the assisted vessel understood." },
              consequence: { en: "The Master becomes involved in a coordination question that was still resolvable directly." },
              feedback: { en: "Not wrong to eventually involve the Master if genuinely stuck, but premature here — you haven't yet tried to resolve the ambiguity yourself." },
              next: {
                id: "level_2_c",
                situation: { en: "The Master, now involved, asks you directly what you think the assisted vessel's ambiguous reply meant, since the Master wasn't part of that exchange." },
                options: [
                  { id: "c1", label: { en: "Admit uncertainty and defer entirely back to the Master without offering an assessment." }, consequence: { en: "The Master is left to interpret an exchange they weren't part of." }, feedback: { en: "Avoids a responsibility that's genuinely yours to carry." } },
                  { id: "c2", label: { en: "Give an honest, informed assessment of what's most likely happening, while noting the genuine uncertainty." }, consequence: { en: "The Master gets a useful, honest picture to work from." }, feedback: { en: "Correct — escalating didn't remove the responsibility to actually interpret an exchange you were part of." }, isRecommended: true },
                  { id: "c3", label: { en: "Claim more confidence in the interpretation than actually exists to seem more helpful." }, consequence: { en: "The Master acts on a false sense of certainty." }, feedback: { en: "Overstates certainty that isn't actually there." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Notify Before Diagnose" },
        bestPractices: [
          { en: "The assisted vessel is notified immediately, essentially simultaneous with internal alert — before any diagnostic attempt." },
        ],
        commonErrors: [
          { en: "Delaying notification by even a short diagnostic check, reasoning a false alarm would be worse than a short delay." },
        ],
      },
      {
        theme: { en: "Solo Diagnosis" },
        bestPractices: [
          { en: "The sole engineering officer diagnoses and reports status continuously, with no Second Engineer to share the workload or provide a second opinion." },
        ],
        commonErrors: [],
      },
      {
        theme: { en: "Outside Assistance as a Legitimate Outcome" },
        bestPractices: [
          { en: "Requesting outside assistance is treated as legitimate once genuinely needed, not delayed to first exhaust every self-resolution attempt." },
        ],
        commonErrors: [
          { en: "Delaying the request for help out of a sense the crew should handle it themselves." },
        ],
      },
      {
        theme: { en: "The Lookout Role at Its Highest Stakes" },
        bestPractices: [
          { en: "The AB continues reporting distance and drift promptly and clearly, recognizing this may be the only real-time picture the bridge team has." },
        ],
        commonErrors: [
          { en: "Hesitating or under-communicating under pressure, exactly when clear, frequent reporting matters most." },
        ],
      },
      {
        theme: { en: "Two-Way Coordination Under Uncertainty" },
        bestPractices: [
          { en: "Ambiguous replies from the assisted vessel are resolved directly, not assumed favorably." },
          { en: "The Chief Officer's coordination domain includes resolving its own ambiguity before escalating." },
          { en: "Status is relayed to the Master promptly and completely, including developing possibilities not yet certain." },
        ],
        commonErrors: [
          { en: "Assuming the assisted vessel understood and is responding appropriately without confirming it." },
          { en: "Deciding independently on something that remains the Master's authority, even while autonomously leading the coordination effort." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "The Master continues working whatever degraded control remains rather than stepping back to pure command, since there's no working system for anyone else to take over." },
        ],
        commonErrors: [
          { en: "Treating the emergency's severity as a reason to skip the same coordination discipline that applies in calmer moments." },
        ],
      },
    ],
  },

  osv_personnel_transfer_crane_basket: {
    operationId: "osv_personnel_transfer_crane_basket",
    vesselTypeId: "osv",
    department: "deck",
    status: "draft",

    title: { en: "OSV — Personnel Transfer via Crane-Basket" },
    introduction: {
      en: "Every operation in this catalog so far has centered on equipment, a fluid, a vessel's own position, or a vessel's relationship to something else — never on a person. This module covers personnel transfer between the OSV and an offshore platform via crane-basket, under DP station-keeping: moving a technician or crew member suspended in a basket, timed against wave motion, between two positions. The central hazard here — swing, fall, or crush injury to a person mid-transfer — is categorically different from every risk covered so far, which have all ultimately been about equipment, fluid, or vessel safety, never a person's physical safety during the operation itself. DP remains present, as stable positioning is a precondition for a safe transfer, but it isn't this operation's defining drama the way sustained DP monitoring was for PSV's first operation — the real content here is the transfer sequence itself and the judgment calls around it.",
    },
    objectives: [
      { en: "Describe the sequence of a personnel transfer via crane-basket between the OSV and a platform, from pre-transfer checks through the transfer itself to completion." },
      { en: "Explain why this operation's central hazard — human safety during transfer — is categorically different from every equipment or environmental risk covered by prior operations." },
      { en: "Explain DP's role here as a precondition for safe transfer, not the operation's central technical challenge." },
      { en: "Identify who does what during this operation on an OSV specifically." },
      { en: "Recognize correct versus incorrect prioritization when weather or sea-state conditions are marginal for a safe transfer." },
    ],
    context: {
      en: "First OSV operation, fourth vessel type in the catalog (grouped with PSV on the original roadmap but scoped separately, since OSV's Ships Library content closely mirrors PSV's on every point except personnel transfer). Deliberately not centered on DP loss/collision risk (already PSV op 2's territory) or deck cargo handling (already PSV op 1's territory). Crane-basket transfer is the primary method covered; gangway transfer is not covered in this operation, a real scope narrowing. The person being transferred is not modeled as a formal rank — RankId is a shared type across MAP's whole platform (career-progression positions, not visiting personnel) — their safety-relevant behavior is described as procedural content and, where genuinely load-bearing, as a dedicated CommunicationParty (\"transferee\"), not a responsibilityMatrix entry. Not asserting specific equipment technical detail (basket/net type, exact weight limits, motion-compensation technology).",
    },

    operationPhaseOrder: [
      "pre_transfer_checks_weather_assessment",
      "dp_position_setup",
      "go_no_go_decision_marginal_conditions",
      "transfer_execution",
      "confirmation_sequence_completion",
      "departure_documentation",
    ],
    operationPhases: {
      pre_transfer_checks_weather_assessment: {
        id: "pre_transfer_checks_weather_assessment",
        title: { en: "Pre-Transfer Checks & Weather Assessment" },
        steps: [
          { en: "Toolbox talk covering the specific transfer: who's being moved, direction, sequence." },
          { en: "Weather and sea-state assessed against this vessel's established transfer limits." },
          { en: "Crane and basket equipment inspected." },
          { en: "The transferee is briefed on the procedure, safety instructions, and timing method." },
          { en: "Communication with the platform confirmed." },
        ],
      },
      dp_position_setup: {
        id: "dp_position_setup",
        title: { en: "DP Position Set-Up" },
        steps: [
          { en: "OSV maneuvers to station near the platform under DP control." },
          { en: "Position confirmed stable within the required tolerance before any transfer begins." },
        ],
        bestPractices: [
          { en: "The transfer never begins on the assumption that position will stabilize once underway — it's confirmed stable first." },
        ],
      },
      go_no_go_decision_marginal_conditions: {
        id: "go_no_go_decision_marginal_conditions",
        title: { en: "Go/No-Go Decision Under Marginal Conditions" },
        steps: [
          { en: "If conditions are clearly within limits, the transfer proceeds." },
          { en: "If conditions are marginal, a deliberate go/no-go judgment is made rather than defaulting to either extreme." },
        ],
        bestPractices: [
          { en: "Marginal conditions are treated as requiring an active decision, not resolved by inertia or automatic caution." },
        ],
      },
      transfer_execution: {
        id: "transfer_execution",
        title: { en: "Transfer Execution (per person)" },
        overview: { en: "Repeated for each transferee if multiple people require transfer." },
        steps: [
          { en: "The transferee boards the basket/net under crew supervision." },
          { en: "The crane lifts and swings the basket from vessel deck to platform (or the reverse), timed against wave motion." },
          { en: "The transferee's own judgment plays a real role in timing their own step-off, per the briefed procedure." },
          { en: "The crew monitors the lift continuously, ready to signal a hold or stop if conditions change mid-lift." },
        ],
        bestPractices: [
          { en: "Any crew member can call a hold on the lift at any point — the universal stop-work principle applied to a live human transfer." },
        ],
        hasIllustrationPlaceholder: true,
      },
      confirmation_sequence_completion: {
        id: "confirmation_sequence_completion",
        title: { en: "Confirmation & Sequence Completion" },
        steps: [
          { en: "The receiving party confirms safe arrival." },
          { en: "If multiple people require transfer, the sequence repeats for each." },
          { en: "Once all transfers are complete, the crane/basket is secured." },
        ],
      },
      departure_documentation: {
        id: "departure_documentation",
        title: { en: "Departure & Documentation" },
        steps: [
          { en: "DP control released, or the vessel repositions for other work." },
          { en: "Transfer(s) documented." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "plan_confirmation", phaseId: "pre_transfer_checks_weather_assessment", from: "bridge", to: "installation", trigger: { en: "Before the transfer" }, content: { en: "Confirmation of who's being transferred, direction, sequence." }, whyItMatters: { en: "Same confirm-the-plan pattern as every prior external channel." } },
      { id: "transferee_briefing", phaseId: "pre_transfer_checks_weather_assessment", from: "deck_team", to: "transferee", trigger: { en: "Before the transfer" }, content: { en: "Safety briefing: procedure, timing method, what to expect." }, whyItMatters: { en: "The first briefing touchpoint in the catalog aimed at someone who isn't OSV crew at all." } },
      { id: "transferee_readiness_confirmation", phaseId: "pre_transfer_checks_weather_assessment", from: "transferee", to: "deck_team", trigger: { en: "After briefing" }, content: { en: "Confirmation of understanding and readiness." }, whyItMatters: { en: "The transferee isn't just briefed and moved — their own confirmed readiness is part of the record." } },
      { id: "on_station_confirmation", phaseId: "dp_position_setup", from: "bridge", to: "installation", trigger: { en: "DP position established" }, content: { en: "Confirmation on-station and within tolerance." }, whyItMatters: { en: "Same pattern as PSV op 1's equivalent." } },
      { id: "joint_go_no_go", phaseId: "go_no_go_decision_marginal_conditions", from: "bridge", to: "installation", trigger: { en: "Marginal conditions" }, content: { en: "Joint go/no-go — both vessels have a stake, since the platform is receiving the person." }, whyItMatters: { en: "Mirrors the joint-decision pattern already established for AHTS/PSV external channels, extended here because the platform's own crew are the ones receiving a person under uncertain conditions." } },
      { id: "transfer_signals", phaseId: "transfer_execution", from: "deck_team", to: "transferee", trigger: { en: "During the actual lift" }, content: { en: "Real-time signals — hold, proceed, stop — exchanged both ways." }, whyItMatters: { en: "The transferee's own signal counts, not just the crew's." } },
      { id: "transferee_hold_call", phaseId: "transfer_execution", from: "transferee", to: "deck_team", trigger: { en: "Transferee is not ready or comfortable" }, content: { en: "The transferee can call a hold themselves." }, whyItMatters: { en: "Extends the universal stop-work principle to include the one person whose safety is most immediately at stake — the first operation where that principle applies to someone who isn't crew." } },
      { id: "arrival_confirmation", phaseId: "confirmation_sequence_completion", from: "installation", to: "bridge", trigger: { en: "Transfer complete" }, content: { en: "Confirmation of safe arrival." }, whyItMatters: { en: "Standard closing-the-loop pattern." } },
      { id: "outcome_documentation", phaseId: "departure_documentation", from: "bridge", to: "installation", trigger: { en: "Once complete" }, content: { en: "Documentation/outcome." }, whyItMatters: { en: "Same as every prior operation's post-operation notification." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Holds the go/no-go authority for marginal conditions, jointly with the platform. Closer to AHTS Mooring/Unmooring's Master identity (overall authority, joint decision-making with an external party) than to any emergency-command shift seen elsewhere in the catalog — this is a routine operation, and the Master's role reflects that." } },
      { rankId: "chief_officer", identity: { en: "Directs the transfer sequence itself and communicates with the installation — this vessel's version of the pattern established across every first operation in the catalog: the Chief Officer owns the operation's signature activity." } },
      { rankId: "oow", identity: { en: "DP-qualified, holds continuous position-keeping responsibility throughout the lift. Present and genuinely necessary, but DP here is a precondition for safety, not this operation's central technical drama." } },
      { rankId: "bosun", identity: { en: "Operates and directs the crane and basket, leading the physical deck-level execution of the transfer. The hands-on execution lead, in the same shape as every prior operation's Bosun identity." } },
      { rankId: "ab", identity: { en: "Assists with crane operation and physical rigging/positioning of the basket, executing under the Bosun's direction — the same perform shape as every prior AB." } },
      { rankId: "chief_engineer", identity: { en: "Owns DP thruster and crane system readiness — the reports-and-sustains mold shared by every routine-operation Chief Engineer across the catalog." } },
      { rankId: "second_engineer", identity: { en: "Hands-on monitoring and response under the Chief Engineer's direction, same shape as every prior operation's Second Engineer." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Holds overall command; decides go/no-go for marginal conditions jointly with the platform; decides whether the transfer proceeds or is deferred." }],
        iMonitor: [{ en: "Weather/sea-state trend; overall operation status via the Chief Officer and OOW." }],
        iReport: [{ en: "To company per standing orders; joint go/no-go communication with the installation." }],
        iDoNotAuthorize: [{ en: "Hands-on crane operation or transfer execution — delegated to the Chief Officer and Bosun." }],
      },
      chief_officer: {
        iExecute: [{ en: "Directs the transfer sequence; communicates with the installation on plan, sequence, and completion." }],
        iMonitor: [{ en: "Transfer progress, crew and transferee readiness, overall coordination." }],
        iReport: [{ en: "Status to the Master; confirmations to the installation." }],
        iDoNotAuthorize: [{ en: "The go/no-go decision on marginal conditions — the Master's call, jointly with the installation." }],
      },
      oow: {
        iExecute: [{ en: "Continuous DP monitoring throughout the transfer window." }],
        iMonitor: [{ en: "DP position against tolerance." }],
        iReport: [{ en: "Any deviation to the Master/Chief Officer." }],
        iDoNotAuthorize: [{ en: "Transfer sequencing decisions." }],
      },
      bosun: {
        iExecute: [{ en: "Operates and directs the crane and basket; leads the physical transfer execution; briefs the transferee alongside the deck team." }],
        iMonitor: [{ en: "Deck team and transferee safety during the lift; ready to call a hold." }],
        iReport: [{ en: "Status to the Chief Officer; unsafe conditions." }],
        iDoNotAuthorize: [{ en: "The go/no-go decision; overriding a hold called by the transferee themselves — their own signal stands regardless of what the Bosun observes." }],
      },
      ab: {
        iExecute: [{ en: "Assists crane operation; physical rigging and positioning of the basket." }],
        iMonitor: [{ en: "Immediate hazard conditions during the lift." }],
        iReport: [{ en: "Unsafe conditions to the Bosun." }],
        iDoNotAuthorize: [{ en: "Crane operation decisions; independent action." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Prepares and maintains DP thruster and crane system readiness." }],
        iMonitor: [{ en: "Continuous system performance." }],
        iReport: [{ en: "Pre-operation readiness confirmation; anomalies to the bridge." }],
        iDoNotAuthorize: [{ en: "Transfer sequencing or go/no-go decisions." }],
      },
      second_engineer: {
        iExecute: [{ en: "Hands-on monitoring and response under the Chief Engineer's direction." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      bosun: "lead",
      ab: "perform",
      chief_engineer: "support",
      second_engineer: "support",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_osv_personnel",
        targetRanks: ["deck_cadet", "ab", "bosun"],
        prompt: { en: "Put the six phases of an OSV personnel transfer in the correct order." },
        items: [
          { id: "pre_transfer_checks_weather_assessment", label: { en: "Pre-Transfer Checks & Weather Assessment" } },
          { id: "dp_position_setup", label: { en: "DP Position Set-Up" } },
          { id: "go_no_go_decision_marginal_conditions", label: { en: "Go/No-Go Decision Under Marginal Conditions" } },
          { id: "transfer_execution", label: { en: "Transfer Execution" } },
          { id: "confirmation_sequence_completion", label: { en: "Confirmation & Sequence Completion" } },
          { id: "departure_documentation", label: { en: "Departure & Documentation" } },
        ],
        correctOrder: ["pre_transfer_checks_weather_assessment", "dp_position_setup", "go_no_go_decision_marginal_conditions", "transfer_execution", "confirmation_sequence_completion", "departure_documentation"],
      },
      {
        type: "error_identification",
        id: "err_override_transferee_hold",
        targetRanks: ["bosun", "chief_officer", "ab"],
        scenario: { en: "The Bosun overrides a hold called by the transferee, judging the situation to actually be safe. The Chief Officer communicates the transfer plan to the installation before the operation begins. The OOW reports a DP deviation to the Master immediately upon detection." },
        choices: [
          { id: "c1", label: { en: "Bosun overriding a hold called by the transferee" }, isError: true, explanation: { en: "The transferee's own signal stands regardless of what the Bosun observes — overriding it is never authorized." } },
          { id: "c2", label: { en: "Chief Officer communicating the transfer plan to the installation before the operation begins" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "OOW reporting a DP deviation to the Master immediately upon detection" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_pretransfer_osv",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team reports ready and the transferee has been briefed. Review the readiness snapshot below before authorizing the transfer to begin." },
        items: [
          { id: "plan_confirmed", label: { en: "Transfer plan confirmed with the installation" }, isSatisfied: true },
          { id: "weather_assessed", label: { en: "Weather and sea-state assessed against transfer limits" }, isSatisfied: true },
          { id: "transferee_briefed", label: { en: "Transferee briefed and confirmed readiness" }, isSatisfied: true },
          { id: "engine_ready", label: { en: "Chief Engineer confirms DP thruster and crane system readiness" }, isSatisfied: false },
          { id: "dp_on_station", label: { en: "DP position confirmed stable and on-station" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "During the lift, the transferee signals hesitation, but the crew's own assessment is that conditions look fine and the lift is nearly complete." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The crew honors the transferee's signal immediately — pausing or holding the lift — regardless of the crew's own read on conditions." }],
        why: [{ en: "Tests whether the transferee's hold authority holds under exactly the pressure that makes it tempting to override." }],
        commonMistakes: [{ en: "Continuing the lift because the crew's own assessment contradicts the transferee's signal." }],
        safetyPoints: [{ en: "The transferee is the one person whose physical safety is most immediately at stake — their signal isn't just data to weigh, it's decisive." }],
      },
      {
        situation: { en: "Conditions are right at the edge of the established transfer limits, and there's schedule pressure — the platform needs the person transferred urgently." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Master makes a genuine go/no-go assessment based on conditions, not schedule pressure — deferring the transfer if conditions don't support it." }],
        why: [{ en: "Tests whether the marginal-conditions judgment holds against external pressure that has nothing to do with the actual safety assessment." }],
        commonMistakes: [{ en: "Letting the platform's stated urgency influence the go/no-go call itself." }],
        safetyPoints: [{ en: "Schedule pressure from a legitimate operational need doesn't change what the weather is actually doing." }],
      },
      {
        situation: { en: "The installation, eager to receive the technician, indicates they think conditions are fine; the OSV's own bridge team has a different read." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The joint go/no-go decision requires both parties' genuine agreement — the OSV doesn't defer to the installation's more optimistic read if its own assessment says otherwise." }],
        why: [{ en: "Tests whether joint decision genuinely means both parties' independent judgment matters." }],
        commonMistakes: [{ en: "Deferring to the installation's read because they're the ones needing the person." }],
        safetyPoints: [{ en: "A joint decision is only meaningful if either party's genuine safety concern can hold the line." }],
      },
      {
        situation: { en: "The transferee seems visibly nervous before the lift, but hasn't explicitly raised a concern or called a hold." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The crew proactively checks in with the transferee rather than waiting for them to explicitly speak up." }],
        why: [{ en: "Tests whether the transferee's agency is actively supported, not just nominally available." }],
        commonMistakes: [{ en: "Treating silence as equivalent to readiness, without actively checking." }],
        safetyPoints: [{ en: "The hold authority only works if the transferee actually feels able to use it — the crew's active check-in is what makes that real." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_ambiguous_signal",
        title: { en: "An Ambiguous Signal Mid-Lift" },
        seatRankId: "bosun",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Bosun, directing the crane-basket transfer. Mid-lift, the transferee gives an ambiguous signal — not a clear hold call, but a hesitation, a delayed movement, something that could mean they're not ready, or could just be normal caution.",
          },
          options: [
            {
              id: "a_continue",
              label: { en: "Continue the lift smoothly — the signal wasn't a clear hold call, and stopping now might be more disruptive than continuing." },
              consequence: { en: "The lift completes without incident, but the ambiguity was never actually resolved." },
              feedback: { en: "Treats 'not a clear stop signal' as equivalent to 'safe to continue' — exactly the reasoning the transferee's hold authority exists to override." },
              next: {
                id: "level_2_a",
                situation: { en: "After the lift completes, the transferee reports they felt unsafe and weren't given a real chance to signal clearly." },
                options: [
                  { id: "a1", label: { en: "Note it as a minor issue since the transfer completed safely." }, consequence: { en: "The gap in the response goes unaddressed." }, feedback: { en: "A safe outcome doesn't validate a decision that ignored a real signal." } },
                  { id: "a2", label: { en: "Treat it seriously — acknowledge the gap and reinforce the procedure for recognizing ambiguous signals." }, consequence: { en: "The gap is addressed before it recurs with someone less fortunate." }, feedback: { en: "Correct — the transfer completing safely doesn't retroactively validate ignoring the signal." }, isRecommended: true },
                  { id: "a3", label: { en: "Attribute it to the transferee being overly cautious rather than a real gap in the response." }, consequence: { en: "The actual gap in the crew's response is never addressed." }, feedback: { en: "Shifts responsibility away from the decision that actually needs review." } },
                ],
              },
            },
            {
              id: "b_hold",
              label: { en: "Immediately hold the lift and check in with the transferee directly, even though it wasn't an unambiguous stop signal." },
              consequence: { en: "The lift pauses safely, and you get a direct answer from the one person best positioned to give it." },
              feedback: { en: "Correct — any ambiguous signal is treated as a reason to pause and check, not a reason to keep going and hope it resolves itself." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The transferee confirms clearly, once asked directly, that they're fine — it was just an awkward movement, not distress." },
                options: [
                  { id: "b1", label: { en: "Resume immediately without having actually obtained a clear confirmation." }, consequence: { en: "The lift resumes on an assumption rather than a real answer." }, feedback: { en: "Skips the actual confirmation the hold was meant to obtain." } },
                  { id: "b2", label: { en: "Resume once the transferee has explicitly and clearly confirmed readiness." }, consequence: { en: "The lift resumes on a genuine, confirmed basis." }, feedback: { en: "Correct — acting on the transferee's genuine, explicit confirmation respects both safety and their own agency." }, isRecommended: true },
                  { id: "b3", label: { en: "Abort the transfer entirely out of excess caution even though they've now clearly confirmed." }, consequence: { en: "The transferee's own clear confirmation is disregarded." }, feedback: { en: "Disrespects the confirmation once it's actually been given." } },
                ],
              },
            },
            {
              id: "c_ask_without_stopping",
              label: { en: "Ask the transferee to confirm whether they want to continue, without pausing the physical lift itself yet." },
              consequence: { en: "The check-in happens, but the transferee is still in motion while it does." },
              feedback: { en: "Well-intentioned, but insufficient — if the hesitation reflects genuine distress, continuing the physical motion during the check-in doesn't actually address it." },
              next: {
                id: "level_2_c",
                situation: { en: "The lift continues while awaiting a reply; the transferee, still mid-motion, becomes visibly more distressed and unable to respond clearly." },
                options: [
                  { id: "c1", label: { en: "Continue since stopping now mid-lift seems more disruptive." }, consequence: { en: "The transferee's distress continues unaddressed." }, feedback: { en: "Compounds the original gap." } },
                  { id: "c2", label: { en: "Immediately stop the lift despite being mid-motion." }, consequence: { en: "The lift stops, later and less smoothly than it would have at Level 1." }, feedback: { en: "Correct, though harder than it would have been — the direct cost of not pausing when the ambiguity first appeared." }, isRecommended: true },
                  { id: "c3", label: { en: "Speed up the lift to get it over with quickly." }, consequence: { en: "The transferee's distress is compounded by the increased speed." }, feedback: { en: "Makes the situation worse, not better." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Honoring the Transferee's Agency" },
        bestPractices: [
          { en: "The transferee's own signal is decisive, not just data to weigh against the crew's judgment." },
          { en: "Any ambiguous signal is treated as a reason to pause and check, not a reason to continue." },
          { en: "Once the transferee explicitly confirms readiness, that confirmation is acted on." },
        ],
        commonErrors: [
          { en: "Continuing because a signal wasn't a clear stop call, treating ambiguity as safe by default." },
          { en: "Checking in without actually pausing the physical motion that's the real source of risk." },
        ],
      },
      {
        theme: { en: "Proactive Check-Ins" },
        bestPractices: [
          { en: "The crew proactively checks in with a visibly nervous transferee rather than waiting for them to explicitly raise a concern." },
        ],
        commonErrors: [
          { en: "Treating silence as equivalent to readiness." },
        ],
      },
      {
        theme: { en: "Marginal Conditions Judgment" },
        bestPractices: [
          { en: "The go/no-go assessment is based on actual conditions, not schedule pressure from either side." },
          { en: "Marginal conditions require an active decision, not resolution by inertia or automatic caution." },
        ],
        commonErrors: [
          { en: "Letting the platform's stated urgency influence the safety assessment itself." },
        ],
      },
      {
        theme: { en: "Joint Decision-Making with the Installation" },
        bestPractices: [
          { en: "A joint go/no-go decision requires both parties' genuine, independent agreement." },
        ],
        commonErrors: [
          { en: "Deferring to the installation's more optimistic read because they're the ones needing the person transferred." },
        ],
      },
      {
        theme: { en: "DP as a Precondition, Not the Drama" },
        bestPractices: [
          { en: "Position is confirmed stable before the transfer begins, never assumed to stabilize once underway." },
        ],
        commonErrors: [],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "Stopping mid-motion, however disruptive, is always available and always used when genuinely needed." },
        ],
        commonErrors: [
          { en: "Treating a transfer that completed safely as proof the process along the way was adequate." },
        ],
      },
    ],
  },

  osv_crane_basket_malfunction_suspended: {
    operationId: "osv_crane_basket_malfunction_suspended",
    vesselTypeId: "osv",
    department: "deck",
    status: "draft",

    title: { en: "OSV — Crane/Basket Malfunction with Transferee Suspended" },
    introduction: {
      en: "This operation places a mechanical failure of the crane/basket system — jammed, stuck, or a crane malfunction — while the transferee is suspended mid-lift, caught between the OSV's deck and the platform, not in the water. This is deliberately not a generic Man Overboard scenario — MAP already covers that territory — it stays specific to this equipment and this exact suspended-in-transit moment. The transferee's role shifts from operation one's active, agency-holding participant to someone increasingly constrained by the malfunction itself: still able to communicate their own condition, but no longer able to act the way they could when the system worked normally. This operation's central tension — attempt to diagnose and restore normal crane function, or execute an emergency procedure to get the person down safely now — echoes the diagnose-vs-act decision every prior vessel's second operation has explored in its own equipment-specific way.",
    },
    objectives: [
      { en: "Recognize a developing crane/basket malfunction as an emergency requiring immediate response, given a person is directly at risk while suspended." },
      { en: "Describe the sequence of actions when the transfer device fails to operate normally mid-lift." },
      { en: "Explain how the transferee's role shifts from operation one's active participant to someone constrained by the malfunction — still communicating their condition, but with reduced ability to act." },
      { en: "Explain the tension between attempting to diagnose or restore normal crane function and executing an emergency lowering procedure." },
      { en: "Recognize correct versus incorrect prioritization when the platform's own crew may need to be involved in the response." },
    ],
    context: {
      en: "Second OSV operation, continuing directly from operation one's transfer setup. Deliberately not a generic overboard/water-rescue scenario — that territory is already covered elsewhere in MAP; this stays specific to the OSV's crane/basket equipment and the suspended, in-transit moment. The Chief Engineer shifts from operation one's routine readiness role to actively diagnosing the crane system specifically — the fourth occurrence of the same support-to-lead emergency-diagnosis archetype already established by AHTS Fire Response, PSV's DP-loss operation, and Tugboat's thruster-failure operation. Not asserting specific backup/manual-override mechanical details for this crane system — kept generic.",
    },

    operationPhaseOrder: [
      "malfunction_detection_alert",
      "immediate_communication_transferee_platform",
      ["crane_diagnosis", "emergency_lowering_preparation", "platform_coordination"],
      "decision_restore_or_emergency_lowering",
      "execution",
      "confirmation_stand_down",
    ],
    operationPhases: {
      malfunction_detection_alert: {
        id: "malfunction_detection_alert",
        title: { en: "Malfunction Detection & Alert" },
        steps: [
          { en: "Whoever is operating or monitoring the crane notices it isn't responding normally — jammed, stuck, not moving as commanded." },
          { en: "Immediate alert to the rest of the crew." },
        ],
      },
      immediate_communication_transferee_platform: {
        id: "immediate_communication_transferee_platform",
        title: { en: "Immediate Communication to Transferee & Platform" },
        steps: [
          { en: "The transferee is immediately informed of the situation." },
          { en: "The platform is notified, given their potential involvement in the response." },
        ],
        bestPractices: [
          { en: "The transferee is told what's happening, not just monitored — silence in this moment would be far worse for someone who can no longer act on their own." },
        ],
      },
      crane_diagnosis: {
        id: "crane_diagnosis",
        title: { en: "Crane Diagnosis" },
        overview: { en: "Runs concurrently with Emergency Lowering Preparation and Platform Coordination." },
        steps: [
          { en: "The Chief Engineer attempts to diagnose and restore normal crane function." },
          { en: "Reports status continuously to the bridge." },
        ],
        hasIllustrationPlaceholder: true,
      },
      emergency_lowering_preparation: {
        id: "emergency_lowering_preparation",
        title: { en: "Emergency Lowering Preparation" },
        overview: { en: "Runs concurrently with Crane Diagnosis and Platform Coordination." },
        steps: [
          { en: "The deck team, led by the Bosun, stages the emergency/backup lowering procedure as a parallel option." },
          { en: "The transferee is kept informed of what's being prepared." },
        ],
      },
      platform_coordination: {
        id: "platform_coordination",
        title: { en: "Platform Coordination" },
        overview: { en: "Runs concurrently with Crane Diagnosis and Emergency Lowering Preparation." },
        steps: [
          { en: "The Chief Officer coordinates with the platform on the situation, including whether their assistance may be needed." },
        ],
      },
      decision_restore_or_emergency_lowering: {
        id: "decision_restore_or_emergency_lowering",
        title: { en: "Decision: Restore Normal Operation or Execute Emergency Lowering" },
        steps: [
          { en: "Based on the Chief Engineer's diagnosis status and the transferee's own reported condition, a decision is made: if the crane can be quickly restored, normal operation resumes; if not — or if the transferee's condition doesn't allow for further waiting — emergency lowering proceeds." },
        ],
        bestPractices: [
          { en: "The transferee's own reported condition is weighed directly in this decision, not treated as secondary to the technical diagnosis." },
        ],
        hasIllustrationPlaceholder: true,
      },
      execution: {
        id: "execution",
        title: { en: "Execution" },
        steps: [
          { en: "If restored: the lift resumes under careful monitoring." },
          { en: "If emergency lowering: the backup procedure is executed to safely bring the transferee down, coordinated with the platform if their involvement is needed." },
        ],
      },
      confirmation_stand_down: {
        id: "confirmation_stand_down",
        title: { en: "Confirmation & Stand-Down" },
        steps: [
          { en: "The transferee is confirmed safe." },
          { en: "Muster/headcount; incident documented." },
          { en: "Assessment of crane system status; separate decision on whether operations can resume or need to pause for repair." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "internal_alert", phaseId: "malfunction_detection_alert", from: "bridge", to: "bridge", trigger: { en: "Malfunction noticed" }, content: { en: "Immediate internal alert." }, whyItMatters: { en: "Same urgency principle as every prior detection touchpoint." } },
      { id: "transferee_notification", phaseId: "immediate_communication_transferee_platform", from: "deck_team", to: "transferee", trigger: { en: "Immediately" }, content: { en: "Informed of the situation." }, whyItMatters: { en: "Clear communication matters more here than in op 1, since the transferee can no longer act on their own." } },
      { id: "platform_notification", phaseId: "immediate_communication_transferee_platform", from: "bridge", to: "installation", trigger: { en: "Immediately" }, content: { en: "Notification, including potential need for platform assistance." }, whyItMatters: { en: "Mirrors the reciprocal-notification pattern established for external parties across the catalog." } },
      { id: "transferee_condition_reports", phaseId: "crane_diagnosis", from: "transferee", to: "deck_team", trigger: { en: "Continuous during the response" }, content: { en: "Reports on their own condition." }, whyItMatters: { en: "A status report feeding into someone else's decision, since the transferee's ability to act has been constrained by the malfunction itself — genuinely distinct from operation one's timing/readiness signals." } },
      { id: "chief_engineer_status", phaseId: "crane_diagnosis", from: "engine", to: "bridge", trigger: { en: "Continuous" }, content: { en: "Crane diagnosis status." }, whyItMatters: { en: "Same reports-and-sustains-or-directs shape as every prior Engine touchpoint under this kind of emergency." } },
      { id: "lowering_prep_updates", phaseId: "emergency_lowering_preparation", from: "deck_team", to: "transferee", trigger: { en: "Ongoing during preparation" }, content: { en: "Kept informed of what's being prepared." }, whyItMatters: { en: "Continues the immediate-communication principle — informed, even while unable to act." } },
      { id: "platform_coordination_updates", phaseId: "platform_coordination", from: "bridge", to: "installation", trigger: { en: "Ongoing" }, content: { en: "Situation updates, potential assistance coordination." }, whyItMatters: { en: "The platform-coordination track's own communication." } },
      { id: "decision_communication", phaseId: "decision_restore_or_emergency_lowering", from: "bridge", to: "bridge", trigger: { en: "Decision point" }, content: { en: "Restore normal operation or execute emergency lowering." }, whyItMatters: { en: "Explicitly informed by both the technical diagnosis and the transferee's own reported condition — neither one alone decides it." } },
      { id: "stop_flag_call", from: "deck_team", to: "deck_team", trigger: { en: "Any unsafe development during execution" }, content: { en: "Stop/flag call." }, whyItMatters: { en: "The universal stop-work principle, adapted to this operation's actual moment — during the resolution itself, not a lift in progress." } },
      { id: "transferee_safety_confirmation", phaseId: "confirmation_stand_down", from: "transferee", to: "deck_team", trigger: { en: "Once resolved" }, content: { en: "Confirmation of safety." }, whyItMatters: { en: "Closes the loop on the person directly, not just the equipment." } },
      { id: "outcome_notification", phaseId: "confirmation_stand_down", from: "bridge", to: "installation", trigger: { en: "Once stood down" }, content: { en: "Outcome and status." }, whyItMatters: { en: "Same closing-the-loop pattern as every prior post-incident notification." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Holds overall emergency command, per the same general principle used across every emergency operation in the catalog. The ultimate restore-or-emergency-lower decision is theirs, informed by the Chief Engineer's diagnosis and the transferee's own reported condition." } },
      { rankId: "chief_officer", identity: { en: "In operation one, directed the transfer sequence broadly. Here, the transfer itself has stalled, so the role narrows into specifically leading the platform-coordination track: communicating the situation and managing whether the platform's own crew need to be involved." } },
      { rankId: "oow", identity: { en: "Continues the same DP-monitoring role as operation one. Position-keeping relative to the platform remains a precondition throughout this emergency, under more pressure but not fundamentally different in character." } },
      { rankId: "bosun", identity: { en: "In operation one, operated the crane and led physical execution under normal conditions. Here, with the crane malfunctioning, that leadership redirects entirely to preparing and executing the emergency lowering procedure." } },
      { rankId: "ab", identity: { en: "Assists the Bosun in preparing and executing the emergency lowering procedure — the same perform-under-the-Bosun's-direction shape as operation one, redirected to this operation's actual crisis." } },
      { rankId: "chief_engineer", identity: { en: "In operation one, held routine crane and DP readiness in the reports-and-sustains mold. Here, shifts to actively diagnosing the crane system specifically — the fourth occurrence of the same support-to-lead emergency-diagnosis archetype already established by AHTS Fire Response, PSV's DP-loss operation, and Tugboat's thruster-failure operation." } },
      { rankId: "second_engineer", identity: { en: "Shifts from operation one's routine monitoring toward hands-on execution under the Chief Engineer's active direction, following the same pattern AHTS and PSV both used for their own Second Engineers under this exact kind of emergency." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Holds overall emergency command; decides restore-or-emergency-lower at the convergence point; decides stand-down." }],
        iMonitor: [{ en: "The Chief Engineer's diagnosis status, the Bosun's lowering-prep readiness, the Chief Officer's platform-coordination status, the transferee's reported condition." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on crane diagnosis, emergency lowering execution, or platform coordination — delegated to the Chief Engineer, Bosun, and Chief Officer respectively." }],
      },
      chief_officer: {
        iExecute: [{ en: "Leads platform coordination — communicates the situation, manages potential platform involvement." }],
        iMonitor: [{ en: "The platform's own response and readiness to assist if needed." }],
        iReport: [{ en: "Status to the Master; communicates with the installation." }],
        iDoNotAuthorize: [{ en: "The restore-or-emergency-lower decision itself; directing the Chief Engineer's diagnosis or the Bosun's lowering preparation." }],
      },
      oow: {
        iExecute: [{ en: "Continuous DP monitoring throughout the emergency." }],
        iMonitor: [{ en: "DP position against tolerance." }],
        iReport: [{ en: "Any deviation to the Master/Chief Officer." }],
        iDoNotAuthorize: [{ en: "Crane-response decisions." }],
      },
      bosun: {
        iExecute: [{ en: "Leads preparation and execution of the emergency lowering procedure; keeps the transferee informed throughout." }],
        iMonitor: [{ en: "The transferee's condition and safety during preparation and execution." }],
        iReport: [{ en: "Status to the Master; the transferee's reported condition, relayed onward." }],
        iDoNotAuthorize: [{ en: "The restore-or-emergency-lower decision itself; directing the Chief Engineer's diagnosis." }],
      },
      ab: {
        iExecute: [{ en: "Assists the Bosun in preparing and executing the emergency lowering procedure." }],
        iMonitor: [{ en: "Immediate hazard conditions during preparation and execution." }],
        iReport: [{ en: "Unsafe conditions to the Bosun." }],
        iDoNotAuthorize: [{ en: "Independent action; lowering-procedure sequencing decisions." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Diagnoses and attempts to restore normal crane function." }],
        iMonitor: [{ en: "Own diagnostic progress, continuously." }],
        iReport: [{ en: "Continuous status to the bridge." }],
        iDoNotAuthorize: [{ en: "The restore-or-emergency-lower decision itself; directing the Bosun's lowering preparation." }],
      },
      second_engineer: {
        iExecute: [{ en: "Assists the Chief Engineer's diagnosis directly, hands-on." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      bosun: "lead",
      ab: "perform",
      chief_engineer: "lead",
      second_engineer: "perform",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order_osv_crane",
        targetRanks: ["deck_cadet", "ab", "bosun"],
        prompt: { en: "Put the phases of this crane/basket malfunction response in the correct order. Three phases happen at the same time — the checker accepts any order between items that are genuinely concurrent." },
        items: [
          { id: "malfunction_detection_alert", label: { en: "Malfunction Detection & Alert" } },
          { id: "immediate_communication_transferee_platform", label: { en: "Immediate Communication to Transferee & Platform" } },
          { id: "crane_diagnosis", label: { en: "Crane Diagnosis" } },
          { id: "emergency_lowering_preparation", label: { en: "Emergency Lowering Preparation" } },
          { id: "platform_coordination", label: { en: "Platform Coordination" } },
          { id: "decision_restore_or_emergency_lowering", label: { en: "Decision: Restore or Execute Emergency Lowering" } },
          { id: "execution", label: { en: "Execution" } },
          { id: "confirmation_stand_down", label: { en: "Confirmation & Stand-Down" } },
        ],
        correctOrder: [
          "malfunction_detection_alert",
          "immediate_communication_transferee_platform",
          ["crane_diagnosis", "emergency_lowering_preparation", "platform_coordination"],
          "decision_restore_or_emergency_lowering",
          "execution",
          "confirmation_stand_down",
        ],
      },
      {
        type: "error_identification",
        id: "err_delayed_lowering_prep",
        targetRanks: ["bosun", "chief_officer", "chief_engineer"],
        scenario: { en: "The Bosun waits for the Chief Engineer's diagnosis to complete before beginning emergency lowering preparation. The Chief Officer coordinates with the platform on potential assistance while diagnosis and lowering prep continue. The Master weighs the transferee's own reported condition alongside the technical diagnosis before deciding." },
        choices: [
          { id: "c1", label: { en: "Bosun waiting for diagnosis to complete before beginning emergency lowering preparation" }, isError: true, explanation: { en: "Preparation is never delayed pending diagnosis's outcome — the tracks activate simultaneously." } },
          { id: "c2", label: { en: "Chief Officer coordinating with the platform while diagnosis and lowering prep continue" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "Master weighing the transferee's reported condition alongside the technical diagnosis" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "readiness_standdown_osv_crane",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The transferee is confirmed safe. Review the readiness snapshot below before the Master declares stand-down and before any decision to resume operations." },
        items: [
          { id: "transferee_safe", label: { en: "Transferee confirmed safe" }, isSatisfied: true },
          { id: "crew_mustered", label: { en: "Crew mustered and accounted for" }, isSatisfied: true },
          { id: "platform_informed", label: { en: "Platform informed of the outcome" }, isSatisfied: true },
          { id: "crane_status_assessed", label: { en: "Chief Engineer confirms crane system status fully assessed" }, isSatisfied: false },
          { id: "resume_or_repair_decided", label: { en: "Decision made on whether transfer operations can resume or need to pause for repair" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "The Chief Engineer's diagnosis looks promising early on; the Bosun considers holding off on preparing the emergency lowering procedure to avoid unnecessary work." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Bosun begins preparation immediately regardless of how promising the diagnosis looks." }],
        why: [{ en: "Tests whether the no-delay rule holds precisely when skipping parallel preparation feels most reasonable." }],
        commonMistakes: [{ en: "Reasoning that preparing the backup procedure while diagnosis seems to be working is wasted effort." }],
        safetyPoints: [{ en: "If the diagnosis unexpectedly fails and preparation hasn't started, the person suspended loses exactly the time margin parallel activation exists to protect." }],
      },
      {
        situation: { en: "The transferee reports they're uncomfortable but not in acute distress, and doesn't explicitly ask to be brought down immediately." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The crew treats the transferee's reported discomfort as a real, weighted input into the restore-or-lower decision — not requiring an explicit request before it counts." }],
        why: [{ en: "Tests whether the transferee's condition reports are honored proactively, even though their agency here is more constrained than in operation one." }],
        commonMistakes: [{ en: "Waiting for the transferee to explicitly demand immediate action before factoring their discomfort into the decision." }],
        safetyPoints: [{ en: "A constrained transferee may not have the same ability to insist on their own behalf as in operation one." }],
      },
      {
        situation: { en: "The platform offers to send personnel or equipment to assist, but it's unclear whether that assistance is actually necessary given the OSV's own response is progressing." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer gives the platform an honest, current assessment of whether assistance is needed, rather than reflexively accepting or declining." }],
        why: [{ en: "Tests the platform-coordination track's own judgment." }],
        commonMistakes: [{ en: "Declining assistance reflexively to appear self-sufficient, or accepting it reflexively without assessing whether it's actually needed." }],
        safetyPoints: [{ en: "An honest assessment either way serves the transferee's safety better than a reflexive answer in either direction." }],
      },
      {
        situation: { en: "Mid-diagnosis, the crane briefly starts responding to commands again; there's a temptation to declare the malfunction resolved and resume the lift immediately." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Engineer confirms the system is genuinely, reliably restored — not just momentarily responsive — before the Master authorizes resuming." }],
        why: [{ en: "Operationalizes the explicit-confirmation-before-resuming principle already established in Fire Response's Phase F, applied here to a mechanical system with a person's safety directly riding on it." }],
        commonMistakes: [{ en: "Treating a single positive response from the crane as proof the malfunction is fully resolved." }],
        safetyPoints: [{ en: "A malfunction that briefly clears and then recurs, with someone already resuming the lift, is worse than the original stall." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_uncertain_finding",
        title: { en: "An Uncertain Finding During Diagnosis" },
        seatRankId: "second_engineer",
        root: {
          id: "level_1",
          situation: {
            en: "You are the Second Engineer, working hands-on on the crane mechanism under the Chief Engineer's direction. During physical inspection, you discover something suggesting the problem might be more serious than initially assumed — not just a simple jam, but a sign involving the load-bearing mechanism itself.",
          },
          options: [
            {
              id: "a_wait",
              label: { en: "Keep working the problem yourself a bit longer to be sure before saying anything." },
              consequence: { en: "The finding stays with you, unreported, while the situation continues developing." },
              feedback: { en: "Uncertainty is exactly the reason to report, not the reason to wait — the Chief Engineer's overall assessment is incomplete without what you've found." },
              next: {
                id: "level_2_a",
                situation: { en: "The Bosun's emergency lowering preparation is ready, and the Master needs the Chief Engineer's full, current assessment to decide — the finding you're still sitting on could change that assessment significantly." },
                options: [
                  { id: "a1", label: { en: "Continue holding off since you still want to be sure." }, consequence: { en: "The decision proceeds without information that could have changed it." }, feedback: { en: "Compounds the original delay at the worst possible moment." } },
                  { id: "a2", label: { en: "Report now, immediately, even though the decision point is imminent." }, consequence: { en: "The Chief Engineer's assessment is updated just in time." }, feedback: { en: "Correct — the approaching decision point doesn't reduce the need to report, it increases it." }, isRecommended: true },
                  { id: "a3", label: { en: "Let it go since the decision seems to be happening without needing it." }, consequence: { en: "The decision is made without information that could have changed it." }, feedback: { en: "The finding's relevance doesn't disappear just because a decision is imminent." } },
                ],
              },
            },
            {
              id: "b_report",
              label: { en: "Immediately report the finding to the Chief Engineer, even though you're not certain what it means." },
              consequence: { en: "The Chief Engineer's diagnosis now includes information they didn't have a moment ago." },
              feedback: { en: "Correct — reporting uncertain findings promptly is what lets the person holding the diagnostic authority make a fully informed call." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The Chief Engineer asks you to help assess how serious the finding is before reporting further to the bridge." },
                options: [
                  { id: "b1", label: { en: "Give a confident-sounding answer despite genuine uncertainty, to seem helpful." }, consequence: { en: "The Chief Engineer reports to the bridge based on overstated confidence." }, feedback: { en: "Overstates certainty that isn't actually there." } },
                  { id: "b2", label: { en: "Give an honest assessment of what you know and don't know." }, consequence: { en: "The Chief Engineer reports an accurate, appropriately qualified picture to the bridge." }, feedback: { en: "Correct — honest assessment with uncertainty acknowledged is what the situation actually needs." }, isRecommended: true },
                  { id: "b3", label: { en: "Defer entirely, saying you don't know enough to say anything." }, consequence: { en: "The Chief Engineer gets no useful input despite your direct observation." }, feedback: { en: "Avoids contributing something genuinely useful, even if imperfect." } },
                ],
              },
            },
            {
              id: "c_fix_independently",
              label: { en: "Try to fix or address what you've found yourself, without necessarily interrupting the Chief Engineer's own work." },
              consequence: { en: "You act independently on something outside your own authority to decide." },
              feedback: { en: "Oversteps the established boundary — assisting hands-on under the Chief Engineer's direction doesn't include independently deciding how to respond to a new finding." },
              next: {
                id: "level_2_c",
                situation: { en: "Your attempt doesn't fully resolve the issue and may have changed something about the situation — the Chief Engineer is about to report a diagnosis to the bridge that no longer reflects current reality." },
                options: [
                  { id: "c1", label: { en: "Stay quiet since the attempt didn't work anyway." }, consequence: { en: "The Chief Engineer reports outdated information to the bridge." }, feedback: { en: "Compounds the original overstep with a second one." } },
                  { id: "c2", label: { en: "Immediately tell the Chief Engineer what you did and how it may have changed things." }, consequence: { en: "The Chief Engineer's report to the bridge reflects current, accurate reality." }, feedback: { en: "Correct — the Chief Engineer needs accurate, current information before reporting outdated status." }, isRecommended: true },
                  { id: "c3", label: { en: "Quietly undo the attempt without mentioning it." }, consequence: { en: "The Chief Engineer remains unaware of what actually happened." }, feedback: { en: "Leaves the Chief Engineer working from an incomplete picture." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Simultaneous Activation" },
        bestPractices: [
          { en: "All three response tracks activate the instant the emergency is declared, none waiting on the others." },
          { en: "Emergency lowering preparation is never delayed pending diagnosis's outcome, even when diagnosis looks promising." },
        ],
        commonErrors: [
          { en: "Reasoning that preparing the backup procedure while diagnosis seems to be working is wasted effort." },
        ],
      },
      {
        theme: { en: "Honoring the Transferee's Condition Reports" },
        bestPractices: [
          { en: "The transferee is kept informed throughout, even though they can no longer act on their own." },
          { en: "Their reported condition is weighed directly in the restore-or-lower decision, not treated as secondary to the technical diagnosis." },
        ],
        commonErrors: [
          { en: "Waiting for the transferee to explicitly demand immediate action before factoring their discomfort into the decision." },
        ],
      },
      {
        theme: { en: "Honest Platform Coordination" },
        bestPractices: [
          { en: "The platform receives an honest, current assessment of whether its assistance is actually needed." },
        ],
        commonErrors: [
          { en: "Declining assistance reflexively to appear self-sufficient, or accepting it reflexively without assessing actual need." },
        ],
      },
      {
        theme: { en: "Confirming Genuine Restoration" },
        bestPractices: [
          { en: "The crane is confirmed genuinely, reliably restored — not just momentarily responsive — before normal operation resumes." },
        ],
        commonErrors: [
          { en: "Treating a single positive response from the crane as proof the malfunction is fully resolved." },
        ],
      },
      {
        theme: { en: "Reporting Uncertain Findings" },
        bestPractices: [
          { en: "Uncertain findings are reported immediately, not held until confidence is higher." },
          { en: "When asked for a judgment call under uncertainty, the honest answer is given, including what isn't known." },
          { en: "Independent action taken outside one's own authority is disclosed immediately if it affects information others are about to rely on." },
        ],
        commonErrors: [
          { en: "Waiting to be sure before reporting something uncertain." },
          { en: "Acting independently on a finding instead of reporting it to whoever holds the diagnostic authority." },
        ],
      },
      {
        theme: { en: "Safety-Critical Moments" },
        bestPractices: [
          { en: "The approach of a decision point increases the urgency of reporting relevant information, not decreases it." },
        ],
        commonErrors: [
          { en: "Letting an imminent decision become a reason to stay quiet rather than a reason to speak up." },
        ],
      },
    ],
  },

  container_stowage_plan_verification: {
    operationId: "container_stowage_plan_verification",
    vesselTypeId: "container_ship",
    department: "deck",
    status: "draft",

    title: { en: "Container Ship — Stowage Plan Verification During Loading/Discharge" },
    introduction: {
      en: "This operation centers on verifying a stowage plan against what's actually being loaded during cargo operations at a terminal — catching discrepancies between the plan and reality (wrong container, wrong position, wrong weight) before they compound into a stability problem. This is a genuinely different operational shape from everything built so far: not a physical hazard to manage or a system to operate, but a verification discipline to maintain under commercial schedule pressure. The vessel's own crew doesn't operate the lifting equipment at all — that belongs entirely to the terminal's shore crane operators — making this the catalog's first operation where the vessel's role is purely supervisory, and the first coordinating with a land-based party rather than a platform or another vessel. Deliberately not re-teaching stability theory, already covered elsewhere in MAP — this is about the operational discipline of catching a plan discrepancy before it becomes a stability problem, not the underlying physics.",
    },
    objectives: [
      { en: "Describe the sequence of verifying a stowage plan against actual cargo operations during loading and discharge at a terminal." },
      { en: "Explain why this operation's central tension is a plan-versus-reality verification discipline, not a physical hazard response — and how that differs from every prior operation in the catalog." },
      { en: "Explain the vessel's purely supervisory relationship to the terminal's own lifting equipment and crew." },
      { en: "Identify who does what during this operation on a container ship specifically." },
      { en: "Recognize correct versus incorrect prioritization when schedule pressure competes with verification thoroughness." },
    ],
    context: {
      en: "Deliberately not re-teaching stability theory — this operation applies it, the same theory-vs-application split that made AHTS Fire Response legitimate against the generic Safety firefighting lessons. The terminal's shore crane operators are neither an offshore installation, a moving assisted vessel, nor an individual transferee — a land-based cargo operator with no prior analog in the catalog, represented by a new \"terminal\" CommunicationParty. Every prior operation's time pressure came from a developing hazard or emergency; here the pressure is commercial and routine, competing directly with verification thoroughness in an otherwise normal operation. Roster follows ContainerShip.tsx's own stated positions: Master, Chief Officer, OOW, Bosun, AB, Chief Engineer, Second/Third Engineer — no OS mentioned in the vessel's own content, so none assumed here. Not asserting specific stability calculation methods or numeric thresholds — kept procedural and generic.",
    },

    operationPhaseOrder: [
      "pre_loading_plan_review",
      "loading_discharge_sequence_begins",
      "continuous_verification",
      "discrepancy_response_under_schedule_pressure",
      "stability_confirmation",
      "departure_clearance",
    ],
    operationPhases: {
      pre_loading_plan_review: {
        id: "pre_loading_plan_review",
        title: { en: "Pre-Loading Plan Review" },
        steps: [
          { en: "The Chief Officer reviews the stowage plan received from the terminal/planning office before loading begins." },
          { en: "Confirms the plan aligns with the vessel's known stability and structural constraints." },
          { en: "Briefs the deck team on the plan and what to watch for during loading." },
        ],
      },
      loading_discharge_sequence_begins: {
        id: "loading_discharge_sequence_begins",
        title: { en: "Loading/Discharge Sequence Begins" },
        steps: [
          { en: "Terminal crane operators begin lifting containers per the plan's sequence." },
          { en: "Vessel crew is positioned to observe and verify each lift against the plan." },
        ],
        bestPractices: [
          { en: "Verification begins with the first lift, not after some initial trust-building period — the plan is checked from container one." },
        ],
      },
      continuous_verification: {
        id: "continuous_verification",
        title: { en: "Continuous Verification" },
        overview: { en: "An ongoing cycle for the duration of loading/discharge, not a one-time check: each container's position, weight, and sequence is verified against the plan as it's loaded." },
        steps: [
          { en: "Each lift is checked against the plan as it happens." },
          { en: "Discrepancies — wrong container in the wrong slot, unexpected weight, out-of-sequence loading — are caught and flagged immediately, not batched for later review." },
        ],
        hasIllustrationPlaceholder: true,
      },
      discrepancy_response_under_schedule_pressure: {
        id: "discrepancy_response_under_schedule_pressure",
        title: { en: "Discrepancy Response Under Schedule Pressure" },
        steps: [
          { en: "When a discrepancy is caught, the Chief Officer assesses whether it's a minor correction (re-sequence, note and continue) or something requiring the operation to pause." },
          { en: "Communication with the terminal to correct or clarify." },
        ],
        bestPractices: [
          { en: "The assessment is made on the discrepancy's actual stability relevance, not on how much it would cost the schedule to address properly." },
        ],
      },
      stability_confirmation: {
        id: "stability_confirmation",
        title: { en: "Stability Confirmation" },
        steps: [
          { en: "Once loading/discharge is complete, final stability is confirmed against the plan — verifying what was actually loaded matches what was planned, not assuming it does because no major discrepancy was flagged." },
        ],
      },
      departure_clearance: {
        id: "departure_clearance",
        title: { en: "Departure Clearance" },
        steps: [
          { en: "Final checks completed." },
          { en: "Departure preparations; schedule confirmed." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "terminal_provides_plan", phaseId: "pre_loading_plan_review", from: "terminal", to: "deck", trigger: { en: "Before loading begins" }, content: { en: "The stowage plan itself." }, whyItMatters: { en: "The plan originates externally — the vessel doesn't design it, it verifies it." } },
      { id: "plan_confirmed_to_terminal", phaseId: "pre_loading_plan_review", from: "deck", to: "terminal", trigger: { en: "Plan reviewed" }, content: { en: "Confirmation the plan is acceptable and operations may begin." }, whyItMatters: { en: "Same confirm-before-starting pattern as every prior pre-operation channel." } },
      { id: "chief_engineer_ballast_report", phaseId: "pre_loading_plan_review", from: "engine", to: "deck", trigger: { en: "Before loading begins" }, content: { en: "Current ballast and fuel state." }, whyItMatters: { en: "A real input to the stability picture alongside cargo weight — grounds the Chief Engineer's involvement in this operation genuinely, not arbitrarily." } },
      { id: "lift_by_lift_coordination", phaseId: "continuous_verification", from: "terminal", to: "deck_team", trigger: { en: "Continuous through loading/discharge" }, content: { en: "Lift-by-lift coordination and verification." }, whyItMatters: { en: "The operation's primary channel — real-time, not checkpoint-based." } },
      { id: "discrepancy_flagged_to_terminal", phaseId: "continuous_verification", from: "deck", to: "terminal", trigger: { en: "Discrepancy caught" }, content: { en: "Immediate flag of the mismatch." }, whyItMatters: { en: "Not batched for later review — flagged the instant it's caught." } },
      { id: "correction_clarification_exchange", phaseId: "discrepancy_response_under_schedule_pressure", from: "terminal", to: "deck", trigger: { en: "Discrepancy flagged" }, content: { en: "Correction or clarification exchanged." }, whyItMatters: { en: "Resolving the specific mismatch before proceeding." } },
      { id: "halt_terminal_operation", phaseId: "discrepancy_response_under_schedule_pressure", from: "deck", to: "terminal", trigger: { en: "Discrepancy assessed as stability-relevant" }, content: { en: "The vessel halts the terminal's loading operation." }, whyItMatters: { en: "Architecturally distinctive — the vessel has final authority over what affects its own stability, even though it doesn't operate the equipment doing the lifting. A different shape of stop-work than any prior operation: halting someone else's equipment, not one's own." } },
      { id: "stability_confirmed_to_master", phaseId: "stability_confirmation", from: "deck", to: "bridge", trigger: { en: "Loading/discharge complete" }, content: { en: "Final stability confirmed against the plan." }, whyItMatters: { en: "Explicit confirmation, not assumed from the absence of major flagged discrepancies." } },
      { id: "departure_clearance_to_terminal", phaseId: "departure_clearance", from: "bridge", to: "terminal", trigger: { en: "Ready to depart" }, content: { en: "Departure clearance." }, whyItMatters: { en: "Standard closing touchpoint." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Holds overall command and backs the Chief Officer's authority to halt the terminal's operation with the full weight of command, but delegates the actual verification work entirely to the Chief Officer, who owns it per the vessel's own stated content. A more background, oversight-focused role than most first operations' Masters — appropriate to a routine, non-emergency operation." } },
      { rankId: "chief_officer", identity: { en: "The signature role for this operation, explicitly named in the vessel's own content as responsible for the loading plan and stability. Owns the entire verification discipline: pre-loading plan review, continuous verification oversight, discrepancy assessment, and the authority to halt the terminal's loading operation. This vessel's version of the pattern already established across every first operation in the catalog — but here, \"owning the signature activity\" means owning a verification and judgment discipline, not a physical coordination task." } },
      { rankId: "oow", identity: { en: "A genuine departure from every prior operation. Every previous OOW identity centered on navigation or DP. Here, alongside at a terminal with no navigation happening, that role has nothing to attach to — the OOW instead becomes part of the deck team directly supporting the Chief Officer's verification work, lift by lift. Not a diminished OOW, but a genuinely different application of the rank to a context where its usual defining task simply doesn't apply." } },
      { rankId: "bosun", identity: { en: "Leads the physical deck team positioned to observe and verify lifts. The hands-on execution lead in the same shape as every prior operation's Bosun, except here \"execution\" means verification and observation, not physical handling — the terminal's crane does the actual lifting." } },
      { rankId: "ab", identity: { en: "Assists with verification: physically checking container markings and positions against the plan, executing under the Bosun's direction — the same \"perform\" shape as every prior AB, redirected to a checking task rather than a handling one." } },
      { rankId: "chief_engineer", identity: { en: "A narrower role than in most operations: reports current ballast and fuel state as a real input to the overall stability picture, alongside cargo weight. Not \"owns crane or DP readiness\" the way other operations' Chief Engineers do — specifically the ballast/fuel component of stability." } },
      { rankId: "second_engineer", identity: { en: "Assists the Chief Engineer with ballast/fuel management — the same \"perform\" shape as every prior Second Engineer, in a lighter role given this operation's Deck-centric focus." } },
      { rankId: "third_engineer", identity: { en: "Continues normal engine room watchkeeping and stands by on engine controls during the port stay, alongside the Second Engineer. Unlike the Second Engineer, the Third Engineer has no direct external reporting role in the stability verification process itself." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Holds overall command; backs the Chief Officer's halt authority with command weight; grants final departure clearance." }],
        iMonitor: [{ en: "Overall operation status via the Chief Officer; any escalated discrepancy." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on verification work or discrepancy assessment — delegated to the Chief Officer." }],
      },
      chief_officer: {
        iExecute: [{ en: "Reviews and confirms the stowage plan; oversees continuous verification; assesses discrepancies; authorizes halting the terminal's operation if stability-relevant; confirms final stability against the plan." }],
        iMonitor: [{ en: "Every lift against the plan, continuously; ballast/fuel state as reported by the Chief Engineer." }],
        iReport: [{ en: "Plan confirmation and discrepancy flags to the terminal; stability confirmation to the Master." }],
        iDoNotAuthorize: [{ en: "Departure clearance itself — the Master's call, informed by the Chief Officer's stability confirmation." }],
      },
      oow: {
        iExecute: [{ en: "Supports the Chief Officer's verification work directly, as part of the deck team checking lifts against the plan." }],
        iMonitor: [{ en: "Lift-by-lift accuracy alongside the rest of the deck team." }],
        iReport: [{ en: "Any discrepancy noticed to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Discrepancy assessment or the halt decision." }],
      },
      bosun: {
        iExecute: [{ en: "Leads the physical deck team positioned to observe and verify lifts." }],
        iMonitor: [{ en: "The deck team's verification accuracy and safety during loading/discharge." }],
        iReport: [{ en: "Status and discrepancies to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "The halt decision; direct communication with the terminal on operational decisions." }],
      },
      ab: {
        iExecute: [{ en: "Physically checks container markings and positions against the plan, under the Bosun's direction." }],
        iMonitor: [{ en: "Immediate accuracy of the containers they're checking." }],
        iReport: [{ en: "Discrepancies to the Bosun." }],
        iDoNotAuthorize: [{ en: "Independent action; discrepancy assessment." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Reports current ballast and fuel state to the Chief Officer." }],
        iMonitor: [{ en: "Ballast/fuel state throughout loading/discharge as it may shift." }],
        iReport: [{ en: "Updates to the Chief Officer as the loading condition changes." }],
        iDoNotAuthorize: [{ en: "Stowage or discrepancy decisions." }],
      },
      second_engineer: {
        iExecute: [{ en: "Assists the Chief Engineer with ballast/fuel management." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer." }],
      },
      third_engineer: {
        iExecute: [{ en: "Maintains engine room watch during loading/discharge, standing by on engine controls." }],
        iMonitor: [{ en: "Routine engine room parameters during the port stay." }],
        iReport: [{ en: "Routine watch status to the Second Engineer/Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Any stowage or discrepancy decision; direct reporting to the Chief Officer on stability matters — that channel runs through the Chief Engineer." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      bosun: "lead",
      ab: "perform",
      chief_engineer: "support",
      second_engineer: "support",
      third_engineer: "observe",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "ab", "oow"],
        prompt: { en: "Put the six phases of the stowage plan verification operation in the correct order." },
        items: [
          { id: "pre_loading_plan_review", label: { en: "Pre-Loading Plan Review" } },
          { id: "loading_discharge_sequence_begins", label: { en: "Loading/Discharge Sequence Begins" } },
          { id: "continuous_verification", label: { en: "Continuous Verification" } },
          { id: "discrepancy_response_under_schedule_pressure", label: { en: "Discrepancy Response Under Schedule Pressure" } },
          { id: "stability_confirmation", label: { en: "Stability Confirmation" } },
          { id: "departure_clearance", label: { en: "Departure Clearance" } },
        ],
        correctOrder: ["pre_loading_plan_review", "loading_discharge_sequence_begins", "continuous_verification", "discrepancy_response_under_schedule_pressure", "stability_confirmation", "departure_clearance"],
      },
      {
        type: "error_identification",
        id: "err_schedule_over_stability",
        targetRanks: ["chief_officer", "oow", "bosun"],
        scenario: { en: "The Chief Officer notes a stability-relevant discrepancy but decides to let loading continue to stay on schedule, planning to address it later. The AB reports a discrepancy immediately to the Bosun upon noticing it. The Chief Engineer reports updated ballast state as the loading condition changes." },
        choices: [
          { id: "c1", label: { en: "Letting loading continue to stay on schedule, planning to address a stability-relevant discrepancy later" }, isError: true, explanation: { en: "Violates the explicit rule that the assessment is made on actual stability relevance, not on what addressing it properly would cost the schedule." } },
          { id: "c2", label: { en: "The AB reporting a discrepancy immediately to the Bosun upon noticing it" }, isError: false, explanation: { en: "Correct — discrepancies are reported the instant they're caught, not batched." } },
          { id: "c3", label: { en: "The Chief Engineer reporting updated ballast state as the loading condition changes" }, isError: false, explanation: { en: "Correct — ballast/fuel state is a real, ongoing input to the stability picture." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "preloading_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team is briefed and the terminal reports ready to begin. Review the readiness snapshot below before authorizing loading to start." },
        items: [
          { id: "plan_reviewed", label: { en: "Stowage plan reviewed and confirmed against vessel constraints" }, isSatisfied: true },
          { id: "deck_team_briefed", label: { en: "Deck team briefed on the plan and verification procedure" }, isSatisfied: true },
          { id: "terminal_readiness", label: { en: "Terminal confirms readiness to begin per the plan" }, isSatisfied: true },
          { id: "ballast_fuel_report", label: { en: "Chief Engineer reports current ballast and fuel state" }, isSatisfied: false },
          { id: "master_final_review", label: { en: "Master's final review of the plan completed" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "Late in the loading sequence, with the terminal moving quickly to stay on schedule, a discrepancy is noticed that looks minor but hasn't been fully assessed." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer takes the time to properly assess the discrepancy's actual stability relevance before deciding to continue or pause, regardless of how close to schedule the operation is running." }],
        why: [{ en: "Tests whether the stability-relevance-not-schedule-cost principle holds at exactly the moment schedule pressure is highest." }],
        commonMistakes: [{ en: "Rushing the assessment or assuming it's minor because addressing it properly would risk the schedule." }],
        safetyPoints: [{ en: "A discrepancy that looks minor under time pressure is exactly the kind that gets waved through incorrectly." }],
      },
      {
        situation: { en: "A discrepancy is assessed as genuinely stability-relevant, requiring the terminal's loading operation to pause — but the terminal's own crew pushes back, wanting to continue." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer holds the halt, communicating clearly why, even though the vessel doesn't control the terminal's equipment or crew." }],
        why: [{ en: "Tests the vessel's genuine authority over its own stability even when it has no operational control over the equipment causing the situation." }],
        commonMistakes: [{ en: "Deferring to the terminal's pushback because the vessel doesn't actually operate the crane." }],
        safetyPoints: [{ en: "Authority over what affects the vessel's own stability doesn't depend on who's operating the equipment." }],
      },
      {
        situation: { en: "Loading completes with no significant discrepancies having been flagged during the process; there's a temptation to skip the final stability confirmation as a formality." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The final stability confirmation against the plan is performed explicitly, not skipped because nothing significant came up during loading." }],
        why: [{ en: "Operationalizes the explicit-confirmation-not-assumed principle already established across the catalog, applied here to a verification-heavy operation where it's especially tempting to treat a clean process as proof of a clean outcome." }],
        commonMistakes: [{ en: "Treating the absence of flagged discrepancies during loading as equivalent to confirmed final stability." }],
        safetyPoints: [{ en: "A clean loading process and confirmed final stability are two different facts — the second one still needs to be explicitly checked." }],
      },
      {
        situation: { en: "After halting the terminal's operation over a discrepancy, it turns out the correction needed was more minor than first assessed — but the halt still cost real time." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer explains the reasoning honestly to the terminal — the discrepancy warranted the check, even if the actual correction needed was smaller than initially feared." }],
        why: [{ en: "Tests whether a costly-in-hindsight but reasonable-at-the-time call gets explained honestly, echoing the established value from earlier operations' interactive scenarios." }],
        commonMistakes: [{ en: "Downplaying or over-apologizing for the halt once it turns out to have been more cautious than strictly necessary." }],
        safetyPoints: [{ en: "A halt that turns out to have cost more than it needed to isn't the same as a halt that was wrong to call — being clear about that distinction to the terminal protects the discipline for next time." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_discrepancy_under_schedule_pressure",
        title: { en: "A Discrepancy Late in a Fast-Moving Loading Operation" },
        seatRankId: "chief_officer",
        root: {
          id: "level_1",
          situation: { en: "You are the Chief Officer. Loading is well underway and the terminal is moving quickly to hold the schedule. During continuous verification, you notice a discrepancy between what's being loaded and the stowage plan. It doesn't look serious at first glance, but you haven't actually assessed it yet." },
          options: [
            {
              id: "a_assume_minor",
              label: { en: "Assume it's minor and let loading continue at pace, to avoid slowing the terminal down." },
              consequence: { en: "Loading continues without the discrepancy having actually been assessed." },
              feedback: { en: "An unassessed discrepancy that 'looks minor' is exactly the kind that gets waved through incorrectly — appearance under time pressure isn't assessment." },
              next: {
                id: "level_2_a",
                situation: { en: "Further into the operation, the discrepancy turns out to be more significant than it looked — it has real stability relevance. Stopping now, later than it should have been caught, will cost more schedule time than it would have earlier, and the terminal is not expecting a halt at this stage." },
                options: [
                  { id: "a1", label: { en: "Let loading continue anyway, since stopping now is even more disruptive than it would have been earlier." }, consequence: { en: "The vessel proceeds with an unresolved, genuine stability-relevant discrepancy." }, feedback: { en: "The cost of stopping late doesn't change whether stopping is necessary." } },
                  { id: "a2", label: { en: "Halt now and address it, even though it's later and costlier than it should have been." }, consequence: { en: "The discrepancy is resolved, later than it needed to be." }, feedback: { en: "Correct, though the earlier assumption already cost time that a prompt assessment would have saved." }, isRecommended: true },
                  { id: "a3", label: { en: "Defer to the terminal's schedule and quietly flag it for review only after loading finishes." }, consequence: { en: "The discrepancy remains unresolved throughout the rest of loading." }, feedback: { en: "A stability-relevant discrepancy doesn't wait for a convenient moment to be addressed." } },
                ],
              },
            },
            {
              id: "b_assess_properly",
              label: { en: "Take the time to properly assess the discrepancy's actual stability relevance before deciding anything." },
              consequence: { en: "The discrepancy is now genuinely understood, not just estimated by appearance." },
              feedback: { en: "Correct — the assessment needs the same rigor regardless of how much schedule pressure is on the operation." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The assessment confirms the discrepancy is genuinely stability-relevant and loading needs to pause. The terminal's crew pushes back, wanting to continue rather than stop their crane." },
                options: [
                  { id: "b1", label: { en: "Defer to the terminal's pushback, since the vessel doesn't operate their crane." }, consequence: { en: "Loading continues despite a confirmed stability-relevant discrepancy." }, feedback: { en: "Authority over what affects the vessel's own stability doesn't depend on who operates the equipment causing it." } },
                  { id: "b2", label: { en: "Hold the halt and clearly communicate to the terminal why it's necessary." }, consequence: { en: "Loading pauses while the discrepancy is corrected." }, feedback: { en: "Correct — the vessel's stability authority stands even over equipment it doesn't control, and explaining why keeps the terminal's cooperation." }, isRecommended: true },
                  { id: "b3", label: { en: "Halt the operation without explaining the reason, to avoid a discussion." }, consequence: { en: "Loading stops, but the terminal is left without a reason for the delay." }, feedback: { en: "The halt itself is correct, but withholding the reason undermines the terminal's ability to cooperate and erodes trust for next time." } },
                ],
              },
            },
            {
              id: "c_delegate_to_ab",
              label: { en: "Ask the AB, who is closest to the discrepancy, to assess it and report back." },
              consequence: { en: "The AB reports back with an observation, but not a stability judgment." },
              feedback: { en: "The AB's role is to report discrepancies accurately, not to judge their stability relevance — that judgment belongs to you." },
              next: {
                id: "level_2_c",
                situation: { en: "The AB's report is useful but inconclusive — it doesn't tell you whether the discrepancy is actually stability-relevant. The terminal is waiting to know whether to continue." },
                options: [
                  { id: "c1", label: { en: "Treat the AB's report as sufficient and let loading continue on that basis." }, consequence: { en: "A decision with real stability consequences is made without an actual stability assessment." }, feedback: { en: "The AB's observation was never a substitute for your own assessment." } },
                  { id: "c2", label: { en: "Thank the AB for the report and personally assess the discrepancy's stability relevance before deciding." }, consequence: { en: "The discrepancy is now genuinely assessed at the right level." }, feedback: { en: "Correct — the AB's report is useful input, but the stability judgment itself is yours to make." }, isRecommended: true },
                  { id: "c3", label: { en: "Disregard the AB's report since it wasn't the assessment you needed." }, consequence: { en: "Useful firsthand information about the discrepancy goes unused." }, feedback: { en: "The report was incomplete for the decision, not worthless — it should inform your own assessment, not be thrown out." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Verification Discipline Under Schedule Pressure" },
        bestPractices: [
          { en: "Every discrepancy is assessed for its actual stability relevance, regardless of how close to schedule the operation is running." },
          { en: "The rigor of the assessment doesn't shrink as schedule pressure grows." },
        ],
        commonErrors: [
          { en: "Assuming a discrepancy is minor because a proper assessment would cost time the schedule doesn't have." },
          { en: "Letting how late in the operation a discrepancy is caught change whether it gets addressed." },
        ],
      },
      {
        theme: { en: "Stop Authority Over Equipment the Vessel Doesn't Operate" },
        bestPractices: [
          { en: "The vessel's authority to halt a stability-relevant loading operation holds even though the terminal, not the vessel, operates the crane." },
          { en: "A halt is communicated to the terminal with a clear reason, preserving cooperation for the rest of the operation." },
        ],
        commonErrors: [
          { en: "Deferring to the terminal's pushback because the vessel doesn't control the equipment causing the issue." },
          { en: "Halting without explaining why, leaving the terminal unable to cooperate effectively." },
        ],
      },
      {
        theme: { en: "Explicit Confirmation, Not Assumed Correctness" },
        bestPractices: [
          { en: "Final stability confirmation against the plan is performed explicitly at the end of loading, every time." },
        ],
        commonErrors: [
          { en: "Treating an absence of flagged discrepancies during loading as equivalent to confirmed final stability." },
          { en: "Skipping the final confirmation as a formality because the process looked clean." },
        ],
      },
      {
        theme: { en: "Honest Terminal Communication" },
        bestPractices: [
          { en: "When a halt turns out to have cost more than the eventual correction needed, the reasoning behind the original call is explained honestly." },
        ],
        commonErrors: [
          { en: "Downplaying or over-apologizing for a halt that turns out, in hindsight, to have been more cautious than strictly necessary." },
        ],
      },
      {
        theme: { en: "The Right Level for a Stability Judgment" },
        bestPractices: [
          { en: "Discrepancies are reported accurately by whoever is closest to them; whether a discrepancy is actually stability-relevant is judged by the Chief Officer." },
        ],
        commonErrors: [
          { en: "Treating a crew member's firsthand report as a substitute for the Chief Officer's own stability assessment." },
          { en: "Disregarding a firsthand report as unhelpful just because it doesn't itself resolve the stability question." },
        ],
      },
      {
        theme: { en: "OOW's Role During a Port Stay" },
        bestPractices: [
          { en: "With no navigation content applicable during the port stay, the OOW's watchkeeping attention shifts to supporting the deck team's verification work." },
        ],
        commonErrors: [
          { en: "Treating the OOW's role during loading as idle or secondary because it doesn't resemble underway watchkeeping." },
        ],
      },
      {
        theme: { en: "Ballast and Fuel as Stability Inputs" },
        bestPractices: [
          { en: "The Chief Engineer's ballast and fuel status reports are factored into the stability picture directly, alongside the stowage plan itself." },
        ],
        commonErrors: [
          { en: "Treating the final stability confirmation as a stowage-plan-only check, without the Chief Engineer's ballast and fuel input." },
        ],
      },
    ],
  },

  container_cargo_fire_undeclared_dg: {
    operationId: "container_cargo_fire_undeclared_dg",
    vesselTypeId: "container_ship",
    department: "deck",
    status: "draft",

    title: { en: "Container Ship — Cargo Fire (Undeclared Dangerous Goods) During Loading/Discharge" },
    introduction: {
      en: "During loading or discharge at the terminal, a fire breaks out in the container stack — most often traced to undeclared or mis-declared dangerous goods reacting inside a sealed box. This is a fundamentally different fire hazard from anything built so far: AHTS Fire Response was an open-deck fire the crew could see, approach, and fight directly with extinguishers and hoses. A container fire is largely inaccessible — the crew cannot open a sealed box of unknown contents to fight what's inside, and doing so without knowing whether it holds something explosive, toxic, or water-reactive is itself a hazard. The operational discipline here is detection, exclusion, and external cooling/isolation — not direct attack — combined with the genuine uncertainty of not knowing exactly what's burning. This directly interrupts op1's own operational context: the loading/discharge operation halts the instant the fire is confirmed, the same terminal and \"terminal\" party from op1 carries forward, and the vessel's response now runs alongside — and depends on — external shore-based emergency services in a way no prior operation has needed.",
    },
    objectives: [
      { en: "Describe the sequence of detecting and responding to a container fire during loading/discharge, particularly one linked to undeclared dangerous goods." },
      { en: "Explain why this operation's central hazard is fundamentally different from AHTS Fire Response — a sealed, inaccessible fire under genuine content-uncertainty, met with exclusion and external cooling rather than direct attack." },
      { en: "Explain the vessel's and terminal's shared response, including when and why the vessel halts loading/discharge and engages external shore-based emergency services." },
      { en: "Identify who does what during this operation on a container ship specifically." },
      { en: "Recognize correct versus incorrect action under uncertainty about a container's actual contents — including the boundary against approaching or opening a container without knowing what's inside, and against assuming a fire is fully resolved just because visible flame is gone." },
    ],
    context: {
      en: "This operation is the stress test interrupting op1's own activity — the fire breaks out during the same loading/discharge operation, at the same terminal, not in a separate underway scenario, following the same routine-then-emergency pairing confirmed for every prior vessel. AHTS Fire Response is a directly-fought, visible, open-deck fire; this is a sealed-container fire the crew cannot get inside of, compounded by not reliably knowing what's actually burning — a different hazard shape, not a reskin. A container fire of this severity brings in shore-side fire brigade / port emergency services, a different party from the terminal's crane operators/planning office already in the schema — represented by a new \"shore_fire_brigade\" CommunicationParty, confirmed load-bearing across the communication, practical-case, and interactive-scenario content. Same 8-rank roster as op1 (Master, Chief Officer, OOW, Bosun, AB, Chief Engineer, Second Engineer, Third Engineer). Not asserting specific firefighting agents, IMDG classes, or extinguishing system specifics — kept procedural and generic.",
    },

    operationPhaseOrder: [
      "detection_and_alert",
      ["command_transfer_and_terminal_halt", "exclusion_zone_and_muster", "external_cooling_response"],
      "shore_fire_brigade_engagement",
      "continuous_monitoring_under_uncertainty",
      "fire_out_and_reignition_watch",
      "resumption_decision",
    ],
    operationPhases: {
      detection_and_alert: {
        id: "detection_and_alert",
        title: { en: "Detection and Alert" },
        steps: [
          { en: "Smoke or fire is observed in the container stack — often by the deck team conducting the loading/discharge verification work, sometimes by the terminal." },
          { en: "Immediate alert raised: location, what's observed, any visible markings suggesting dangerous goods." },
        ],
      },
      command_transfer_and_terminal_halt: {
        id: "command_transfer_and_terminal_halt",
        title: { en: "Command Transfer and Terminal Halt" },
        steps: [
          { en: "Command transfers explicitly to the Chief Officer as on-scene commander." },
          { en: "The terminal's loading/discharge operation is halted immediately and unconditionally." },
          { en: "Shore-side fire brigade is called in." },
        ],
      },
      exclusion_zone_and_muster: {
        id: "exclusion_zone_and_muster",
        title: { en: "Exclusion Zone and Muster" },
        steps: [
          { en: "An exclusion zone is established around the affected stack." },
          { en: "Non-essential personnel are mustered clear." },
        ],
      },
      external_cooling_response: {
        id: "external_cooling_response",
        title: { en: "External Cooling Response" },
        steps: [
          { en: "Fire main/water spray directed onto the affected and adjacent containers from a safe distance." },
          { en: "No attempt made to open or access the source container — content and hazard are unknown." },
        ],
      },
      shore_fire_brigade_engagement: {
        id: "shore_fire_brigade_engagement",
        title: { en: "Shore Fire Brigade Engagement" },
        steps: [
          { en: "On arrival, shore-side fire brigade assumes the primary firefighting role; the Chief Officer coordinates with them on-scene." },
          { en: "Handover of what's known so far: location, behavior observed, any cargo documentation available on the affected container(s)." },
        ],
      },
      continuous_monitoring_under_uncertainty: {
        id: "continuous_monitoring_under_uncertainty",
        title: { en: "Continuous Monitoring Under Uncertainty" },
        overview: { en: "An ongoing cycle for the duration of the response, not a one-time check." },
        steps: [
          { en: "Fire behavior and spread to adjacent containers monitored continuously." },
          { en: "Exclusion zone reassessed and adjusted as conditions change." },
        ],
        hasIllustrationPlaceholder: true,
      },
      fire_out_and_reignition_watch: {
        id: "fire_out_and_reignition_watch",
        title: { en: "Fire Confirmed Out and Re-Ignition Watch" },
        steps: [
          { en: "Fire declared out, jointly assessed by shore fire brigade and the vessel — not assumed from the absence of visible flame." },
          { en: "Transition to re-ignition watch." },
        ],
      },
      resumption_decision: {
        id: "resumption_decision",
        title: { en: "Resumption Decision" },
        steps: [
          { en: "Joint decision — vessel, terminal, and shore authorities as relevant — on whether and when loading/discharge can resume." },
          { en: "Any affected container(s) addressed per applicable procedure before resumption." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "initial_alert", phaseId: "detection_and_alert", from: "deck_team", to: "bridge", trigger: { en: "Fire/smoke observed in the container stack" }, content: { en: "Immediate alert: location, what's observed, any visible dangerous-goods markings." }, whyItMatters: { en: "Everything downstream depends on this reaching the bridge without delay." } },
      { id: "command_transfer_confirmation", phaseId: "command_transfer_and_terminal_halt", from: "bridge", to: "deck", trigger: { en: "Immediately on alert" }, content: { en: "Explicit assumption of emergency command by the Master; Chief Officer's role confirmed as on-scene commander." }, whyItMatters: { en: "An authority handoff, mirroring every prior emergency operation's command-transfer touchpoint." } },
      { id: "terminal_halt_notification", phaseId: "command_transfer_and_terminal_halt", from: "deck", to: "terminal", trigger: { en: "Immediately on alert" }, content: { en: "Loading/discharge operation halted unconditionally." }, whyItMatters: { en: "Unlike op1's discretionary halt, this one requires no judgment call — immediate and unconditional the instant a fire is confirmed." } },
      { id: "shore_fire_brigade_called", phaseId: "command_transfer_and_terminal_halt", from: "deck", to: "shore_fire_brigade", trigger: { en: "Immediately on alert" }, content: { en: "Shore-side fire brigade called in." }, whyItMatters: { en: "The vessel's own resources are for containment and cooling, not full resolution of an unknown-contents fire." } },
      { id: "onscene_status_to_bridge", phaseId: "continuous_monitoring_under_uncertainty", from: "deck", to: "bridge", trigger: { en: "Continuous during the incident" }, content: { en: "Chief Officer reports fire status, exclusion zone status, and crew status to the Master." }, whyItMatters: { en: "Same relationship as every prior emergency — the Master's overall command still depends on continuous on-scene reporting." } },
      { id: "shore_fire_brigade_handover", phaseId: "shore_fire_brigade_engagement", from: "deck", to: "shore_fire_brigade", trigger: { en: "On shore fire brigade's arrival" }, content: { en: "Handover of what's known: location, behavior observed, any available cargo documentation." }, whyItMatters: { en: "The vessel's account is the best available information about a hazard whose exact nature isn't confirmed." } },
      { id: "shore_fire_brigade_command", phaseId: "shore_fire_brigade_engagement", from: "shore_fire_brigade", to: "deck", trigger: { en: "Once on-scene" }, content: { en: "Shore fire brigade assumes primary firefighting role, coordinating ongoing action with the Chief Officer." }, whyItMatters: { en: "Architecturally distinctive — firefighting command itself passes to the external party; the vessel's on-scene commander coordinates rather than retains command, unlike every prior emergency." } },
      { id: "fire_out_confirmation", phaseId: "fire_out_and_reignition_watch", from: "shore_fire_brigade", to: "deck", trigger: { en: "Fire appears out" }, content: { en: "Joint confirmation the fire is out." }, whyItMatters: { en: "Not assumed from the absence of visible flame — the same explicit-confirmation discipline as AHTS Fire Response." } },
      { id: "fire_out_report_to_master", phaseId: "fire_out_and_reignition_watch", from: "deck", to: "bridge", trigger: { en: "Fire confirmed out" }, content: { en: "Chief Officer reports fire out, transitioning to re-ignition watch." }, whyItMatters: { en: "The Master's stand-down decision depends on this being reported explicitly." } },
      { id: "resumption_go_no_go", phaseId: "resumption_decision", from: "bridge", to: "terminal", trigger: { en: "Re-ignition watch period elapsed without incident" }, content: { en: "Joint go/no-go decision on resuming loading/discharge." }, whyItMatters: { en: "Echoes the joint go/no-go pattern already established for the installation relationship in AHTS — here between vessel and terminal." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "In op1, a background, oversight-focused role, backing the Chief Officer's halt authority with command weight. Here, assumes overall emergency command the instant the alarm is raised — the same authority-assumption shape as every prior emergency operation's Master — directs the ship's overall response, and holds the stand-down and resumption decisions." } },
      { rankId: "chief_officer", identity: { en: "In op1, owned the entire verification discipline outright. Here, becomes on-scene commander the instant command transfers — the same authority shift as AHTS Fire Response's Chief Officer — but with a further narrowing no prior operation has had: once shore fire brigade arrives, firefighting command itself passes to them, and the Chief Officer coordinates rather than retains command." } },
      { rankId: "oow", identity: { en: "In op1, already a genuine departure — no navigation to attach to, so the OOW joined the deck team's verification work instead. Here, that departure compounds: supporting the Master's emergency command (communications, tracking the exclusion zone) with no navigation or DP thread to have departed from in the first place, unlike every prior emergency operation's OOW." } },
      { rankId: "bosun", identity: { en: "In op1, led the deck team's observation and verification work. Here, leads the deck team into mustering clear of the exclusion zone and supporting its enforcement — a more restrained execution role than any prior emergency Bosun; direct attack on the fire itself is explicitly not the deck team's role at all." } },
      { rankId: "ab", identity: { en: "In op1, assisted with verification checks under the Bosun. Here, follows the Bosun into exclusion-zone compliance and may assist with external cooling equipment under direction — supporting containment, not attacking the fire itself." } },
      { rankId: "chief_engineer", identity: { en: "In op1, a narrow ballast/fuel reporting role. Here, a different narrow role: ensuring the vessel's fire main and water supply capability is available to support the external cooling response — a genuine engine-department input to this operation's containment effort." } },
      { rankId: "second_engineer", identity: { en: "Assists the Chief Engineer with fire main/water supply support — the same \"perform\" shape as every prior Second Engineer, redirected to this operation's specific technical need." } },
      { rankId: "third_engineer", identity: { en: "In op1, \"observe\" level, routine watchkeeping with no direct role. Here, continues engine room watch and readiness — a genuine if minimal contribution; machinery space operation and standby readiness still matter even during an on-deck emergency." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Assumes overall emergency command; directs the ship's overall response; holds the stand-down and resumption decisions jointly with the terminal/shore authorities." }],
        iMonitor: [{ en: "Overall incident status via the Chief Officer; shore fire brigade's assessment." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on firefighting/containment actions — delegated to the Chief Officer and shore fire brigade." }],
      },
      chief_officer: {
        iExecute: [{ en: "Assumes on-scene command; directs the deck team's exclusion-zone and cooling response; coordinates with shore fire brigade once on-scene; confirms fire-out status jointly with them." }],
        iMonitor: [{ en: "Fire status and exclusion-zone integrity continuously; shore fire brigade's assessment and instructions." }],
        iReport: [{ en: "Fire status to the Master continuously; handover information to shore fire brigade." }],
        iDoNotAuthorize: [{ en: "Overriding shore fire brigade's firefighting decisions once they've assumed command of that effort; the Master's overall stand-down/resumption authority." }],
      },
      oow: {
        iExecute: [{ en: "Supports the Master's emergency command — communications, tracking exclusion-zone status." }],
        iMonitor: [{ en: "Communications flow and exclusion-zone reporting." }],
        iReport: [{ en: "Status updates as directed by the Master." }],
        iDoNotAuthorize: [{ en: "Independent command decisions." }],
      },
      bosun: {
        iExecute: [{ en: "Leads the deck team into mustering clear of the exclusion zone; supports its enforcement; directs the AB in supporting the external cooling response as instructed." }],
        iMonitor: [{ en: "Deck team compliance and safety within the exclusion zone." }],
        iReport: [{ en: "Status to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Any direct attack on the fire itself; independent communication with shore fire brigade." }],
      },
      ab: {
        iExecute: [{ en: "Complies with muster/exclusion-zone direction; assists with external cooling equipment under the Bosun's direction." }],
        iMonitor: [{ en: "Own immediate safety and exclusion-zone compliance." }],
        iReport: [{ en: "Observations to the Bosun." }],
        iDoNotAuthorize: [{ en: "Independent action; approaching the source container." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Ensures fire main and water supply capability is available to support the external cooling response; directs the Second Engineer accordingly." }],
        iMonitor: [{ en: "Fire main/water supply system status throughout the incident." }],
        iReport: [{ en: "System status and any degradation to the Chief Officer/bridge." }],
        iDoNotAuthorize: [{ en: "Firefighting or exclusion-zone decisions themselves." }],
      },
      second_engineer: {
        iExecute: [{ en: "Assists the Chief Engineer with fire main/water supply support." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer." }],
      },
      third_engineer: {
        iExecute: [{ en: "Maintains engine room watch and machinery readiness throughout the incident." }],
        iMonitor: [{ en: "Routine engine room parameters." }],
        iReport: [{ en: "Routine watch status to the Second Engineer/Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Any fire response or exclusion-zone decision." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      bosun: "lead",
      ab: "perform",
      chief_engineer: "lead",
      second_engineer: "support",
      third_engineer: "observe",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "ab", "oow"],
        prompt: { en: "Put the phases of the cargo fire response in the correct order." },
        items: [
          { id: "detection_and_alert", label: { en: "Detection and Alert" } },
          { id: "command_transfer_and_terminal_halt", label: { en: "Command Transfer and Terminal Halt" } },
          { id: "exclusion_zone_and_muster", label: { en: "Exclusion Zone and Muster" } },
          { id: "external_cooling_response", label: { en: "External Cooling Response" } },
          { id: "shore_fire_brigade_engagement", label: { en: "Shore Fire Brigade Engagement" } },
          { id: "continuous_monitoring_under_uncertainty", label: { en: "Continuous Monitoring Under Uncertainty" } },
          { id: "fire_out_and_reignition_watch", label: { en: "Fire Confirmed Out and Re-Ignition Watch" } },
          { id: "resumption_decision", label: { en: "Resumption Decision" } },
        ],
        correctOrder: [
          "detection_and_alert",
          ["command_transfer_and_terminal_halt", "exclusion_zone_and_muster", "external_cooling_response"],
          "shore_fire_brigade_engagement",
          "continuous_monitoring_under_uncertainty",
          "fire_out_and_reignition_watch",
          "resumption_decision",
        ],
      },
      {
        type: "error_identification",
        id: "err_container_approach",
        targetRanks: ["ab", "bosun", "chief_officer"],
        scenario: { en: "The AB, closest to the fire, opens the container door slightly to see what's burning. The Chief Officer coordinates with shore fire brigade rather than independently directing how to attack the fire once they've assumed command. The Chief Engineer proactively reports fire main/water supply status as conditions develop." },
        choices: [
          { id: "c1", label: { en: "Opening the container door slightly to see what's burning" }, isError: true, explanation: { en: "Violates the explicit boundary against approaching or opening a container of unknown contents, given the possible explosive, toxic, or water-reactive hazard inside." } },
          { id: "c2", label: { en: "The Chief Officer coordinating with shore fire brigade rather than independently directing the firefighting once they've assumed command" }, isError: false, explanation: { en: "Correct — matches the established boundary that firefighting command passes to shore fire brigade on arrival." } },
          { id: "c3", label: { en: "The Chief Engineer proactively reporting fire main/water supply status as conditions develop" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "resumption_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The fire appears out and the re-ignition watch period has elapsed. Review the readiness snapshot below before authorizing loading/discharge to resume." },
        items: [
          { id: "fire_out_joint_confirmation", label: { en: "Fire jointly confirmed out by shore fire brigade and the vessel" }, isSatisfied: true },
          { id: "reignition_watch_elapsed", label: { en: "Re-ignition watch period elapsed without incident" }, isSatisfied: true },
          { id: "shore_fire_brigade_signoff", label: { en: "Shore fire brigade's sign-off received" }, isSatisfied: true },
          { id: "terminal_area_inspected", label: { en: "Terminal's own equipment and adjacent stack area inspected and cleared" }, isSatisfied: false },
          { id: "master_resumption_decision", label: { en: "Master's final resumption decision completed" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "A crew member nearest to the fire feels the urge to open or approach the container to understand what's happening, especially with shore fire brigade not yet on-scene and minutes feeling critical." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The crew member maintains distance and continues exclusion-zone/cooling work; does not attempt to open or approach the source container, regardless of the urgency felt." }],
        why: [{ en: "Tests whether the explicit no-approach boundary holds under the pressure of feeling like doing something more direct would help." }],
        commonMistakes: [{ en: "Acting on the instinct to help faster by approaching the container." }],
        safetyPoints: [{ en: "An unknown-contents container fire carries a hazard that outweighs the instinct to act faster." }],
      },
      {
        situation: { en: "Shore fire brigade arrives and takes a different tactical approach than the Chief Officer would have chosen." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer coordinates with shore fire brigade's approach rather than pushing for the vessel's own preferred method, since firefighting command has passed to them." }],
        why: [{ en: "Tests whether the authority handoff is honored even when the vessel's own commander disagrees with the specific tactic." }],
        commonMistakes: [{ en: "Second-guessing or pushing back on shore fire brigade's decisions once they've assumed command of the firefighting effort." }],
        safetyPoints: [{ en: "The authority handoff to shore fire brigade isn't conditional on the vessel agreeing with every tactical choice." }],
      },
      {
        situation: { en: "Visible flame is gone and the situation looks resolved, but shore fire brigade hasn't yet given joint confirmation." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer waits for an explicit joint confirmation with shore fire brigade before declaring the fire out and moving toward re-ignition watch." }],
        why: [{ en: "Operationalizes the explicit-confirmation-not-assumed principle for a case where appearance is especially misleading — smoldering dangerous-goods cargo can reignite invisibly." }],
        commonMistakes: [{ en: "Treating the absence of visible flame as sufficient confirmation without the actual joint sign-off." }],
        safetyPoints: [{ en: "A sealed or smoldering container fire can look resolved while still active inside." }],
      },
      {
        situation: { en: "The instant the fire is confirmed, the terminal's crane operators — mid-lift elsewhere in the stack — hesitate, treating the halt like op1's usual discretionary, justified stop." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer makes clear this halt is unconditional and immediate — not a stability-relevance judgment call — and expects compliance without the back-and-forth appropriate to op1's scenario." }],
        why: [{ en: "Tests whether the crew recognizes and communicates the difference between this operation's unconditional emergency halt and op1's discretionary one, even though both rest on the same underlying stop-authority relationship with the terminal." }],
        commonMistakes: [{ en: "Treating this halt with the same discretionary back-and-forth communication style as op1's stability-relevance calls." }],
        safetyPoints: [{ en: "An active fire emergency requires an immediate, unconditional halt — not a negotiated one." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_watch_discipline_during_the_emergency",
        title: { en: "Standing Watch Below While the Emergency Unfolds Above" },
        seatRankId: "third_engineer",
        root: {
          id: "level_1",
          situation: { en: "You are the Third Engineer, on watch in the engine control room during the fire emergency. Your role has simply been to maintain machinery readiness and watch continuity while everything else happens above, out of your sight. Informal word reaches you through engine-room chatter that the fire might already be handled." },
          options: [
            {
              id: "a_ease_off",
              label: { en: "Quietly ease off full readiness, since it sounds like it's probably fine." },
              consequence: { en: "Machinery readiness is reduced on the basis of unofficial word, without anyone above being aware of it." },
              feedback: { en: "Unofficial word isn't a confirmation — readiness stays at the level instructed until it's actually relayed through the proper channel." },
              next: {
                id: "level_2_a",
                situation: { en: "A complication develops — a re-ignition concern is still being assessed above — and machinery readiness is now not what it should be, because it was quietly eased off without authorization." },
                options: [
                  { id: "a1", label: { en: "Continue as is, hoping it still resolves fine." }, consequence: { en: "Readiness stays compromised through a moment that may need it most." }, feedback: { en: "Compounds the original problem at the worst possible moment." } },
                  { id: "a2", label: { en: "Immediately restore full readiness and disclose that it had been eased off." }, consequence: { en: "Readiness is corrected, and whoever's coordinating the response now has an accurate picture." }, feedback: { en: "Correct — restoring readiness matters, but so does disclosing that it had lapsed, so the response isn't relying on a false assumption." }, isRecommended: true },
                  { id: "a3", label: { en: "Quietly restore full readiness without mentioning it had been eased off." }, consequence: { en: "Readiness is corrected, but no one else knows it had ever lapsed." }, feedback: { en: "Leaves whoever's coordinating the response working from an incomplete picture of what actually happened." } },
                ],
              },
            },
            {
              id: "b_maintain_readiness",
              label: { en: "Maintain full readiness exactly as instructed until official confirmation comes through the proper channel." },
              consequence: { en: "Readiness stays exactly where it needs to be, regardless of informal word." },
              feedback: { en: "Correct — the instruction stands until it's actually changed through the proper channel, not because of what's overheard." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "Official confirmation that the fire is out is relayed through the Second Engineer: readiness can now be stepped down per instruction." },
                options: [
                  { id: "b1", label: { en: "Comply immediately and step down readiness per the instruction." }, consequence: { en: "Readiness is adjusted correctly, on the correct basis." }, feedback: { en: "Correct — this is exactly what the proper channel is for." }, isRecommended: true },
                  { id: "b2", label: { en: "Refuse to step down without independently double-checking through your own unofficial channel first." }, consequence: { en: "The instruction is delayed while an unnecessary independent check is carried out." }, feedback: { en: "The proper channel is what makes an instruction trustworthy — independently second-guessing it adds friction without adding safety." } },
                  { id: "b3", label: { en: "Step down readiness but don't confirm receipt of the instruction back up the chain." }, consequence: { en: "Readiness is adjusted, but whoever gave the instruction doesn't know it was received and acted on." }, feedback: { en: "Closing the loop is part of the instruction being properly carried out, not an optional extra." } },
                ],
              },
            },
            {
              id: "c_leave_post",
              label: { en: "Leave your post briefly to see for yourself what's happening on deck." },
              consequence: { en: "The watch station is unattended for a period." },
              feedback: { en: "Watch continuity is the one thing this role owns outright during the incident — leaving it unattended isn't yours to decide, however understandable the concern." },
              next: {
                id: "level_2_c",
                situation: { en: "While away from the station, a routine machinery parameter needing attention was missed." },
                options: [
                  { id: "c1", label: { en: "Return and say nothing, since nothing serious actually happened." }, consequence: { en: "The lapse in watch coverage goes unreported." }, feedback: { en: "Misses the point — leaving the post was the actual problem, regardless of how it turned out this time." } },
                  { id: "c2", label: { en: "Return immediately and report having left the post and what may have been missed while away." }, consequence: { en: "Whoever's responsible for the engine room has an accurate picture and can check what was missed." }, feedback: { en: "Correct — disclosing the lapse is what lets it actually be checked, rather than just hoped it didn't matter." }, isRecommended: true },
                  { id: "c3", label: { en: "Explain the lapse by pointing to needing to check on the situation above." }, consequence: { en: "The explanation shifts focus to justification rather than the missed parameter itself." }, feedback: { en: "Deflects rather than owns the lapse — the reason for leaving doesn't change what needs to be reported and checked." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "The No-Approach Boundary" },
        bestPractices: [
          { en: "A container of unknown contents is never opened or approached directly, regardless of urgency or proximity." },
          { en: "Response stays limited to exclusion, containment, and external cooling until the hazard is actually known." },
        ],
        commonErrors: [
          { en: "Acting on the instinct to help faster by approaching or opening the source container." },
        ],
      },
      {
        theme: { en: "An Unconditional Halt, Not a Discretionary One" },
        bestPractices: [
          { en: "Once a fire is confirmed, the terminal's operation halts immediately and unconditionally — no stability-relevance assessment required." },
        ],
        commonErrors: [
          { en: "Treating this halt with the same discretionary back-and-forth communication appropriate to a stability-relevance judgment call." },
        ],
      },
      {
        theme: { en: "Honoring the Authority Handoff to Shore Fire Brigade" },
        bestPractices: [
          { en: "Once shore fire brigade assumes command of the firefighting effort, the vessel coordinates with their approach rather than pushing its own." },
        ],
        commonErrors: [
          { en: "Second-guessing or pushing back on shore fire brigade's tactical decisions once they've assumed command." },
        ],
      },
      {
        theme: { en: "Joint Confirmation, Not Assumed From Appearance" },
        bestPractices: [
          { en: "The fire is declared out only once shore fire brigade and the vessel jointly confirm it, not from the absence of visible flame alone." },
        ],
        commonErrors: [
          { en: "Treating a lack of visible flame as sufficient confirmation on its own." },
        ],
      },
      {
        theme: { en: "Watch Discipline on a Peripheral Role" },
        bestPractices: [
          { en: "Instructed readiness levels are maintained exactly as given until changed through the proper channel — not adjusted based on informal word." },
          { en: "The watch station is not left unattended, however understandable the concern about what's happening elsewhere." },
        ],
        commonErrors: [
          { en: "Easing off instructed readiness because informal word suggests the situation is resolved." },
          { en: "Leaving a watch post to check on an emergency happening elsewhere." },
        ],
      },
      {
        theme: { en: "Disclosing Lapses and Independent Action" },
        bestPractices: [
          { en: "Any lapse — readiness eased without authorization, a post left unattended — is disclosed immediately, not just quietly corrected." },
        ],
        commonErrors: [
          { en: "Quietly correcting a lapse without disclosing that it happened, leaving others working from an incomplete picture." },
        ],
      },
      {
        theme: { en: "Engine Department's Containment Role" },
        bestPractices: [
          { en: "Fire main and water supply capability is actively ensured and reported by the engine department throughout the incident, not treated as automatically available." },
        ],
        commonErrors: [
          { en: "Assuming fire main/water supply capability is available without it being actively confirmed and maintained." },
        ],
      },
    ],
  },

  lng_cargo_transfer_cooldown_to_loading: {
    operationId: "lng_cargo_transfer_cooldown_to_loading",
    vesselTypeId: "lng_carrier",
    department: "deck",
    status: "draft",

    title: { en: "LNG Carrier — Cargo Transfer: Tank Cooldown Through Loading" },
    introduction: {
      en: "This operation covers the LNG carrier's own defining task: transferring liquefied natural gas at -163°C between the vessel and a terminal. Unlike every prior cargo operation in the catalog, this one has a genuine mandatory precondition that must be satisfied before cargo transfer can even begin — the tanks must be cooled down first. Loading LNG into a tank that hasn't been properly cooled risks thermal shock to the containment system. No other operation built so far has this shape: every prior cargo operation begins once the crew is ready; this one has a distinct, hazardous preparatory phase that is itself part of the operation, not just a checklist gate. Once transfer begins, Boil-Off Gas — natural gas that evaporates from the cargo by its physical nature — must be continuously managed throughout, whether burned as fuel or reliquefied, adding a persistent background condition running alongside the transfer itself.",
    },
    objectives: [
      { en: "Describe the sequence of an LNG cargo transfer, from tank cooldown through loading/discharge to disconnection." },
      { en: "Explain why tank cooldown is a mandatory, hazardous precondition rather than a simple readiness check — and how that differs from every prior cargo operation in the catalog." },
      { en: "Explain the continuous Boil-Off Gas management running throughout the operation." },
      { en: "Identify who does what during this operation on an LNG carrier specifically." },
      { en: "Recognize correct versus incorrect prioritization when temperature/pressure monitoring competes with schedule pressure." },
    ],
    context: {
      en: "The vessel's own defining task, the same 'owns the signature activity' pattern established across every first operation in the catalog — but here that activity has a mandatory hazardous precondition no prior operation has had. The card's own 'Gas Engineer (gas systems specialist)' position — Boil-Off Gas management, cryogenic systems — is folded into the Second Engineer rather than added as a new RankId, per explicit confirmation: this maps onto the Engine Department's already-established Chief Engineer (overall readiness) / Second Engineer (hands-on technical execution) relationship. Roster is 7 ranks (Master, Chief Officer, OOW, AB, Chief Engineer, Second Engineer, Third Engineer) — no Bosun, confirmed absent from this vessel's own stated crew rather than an ambiguous omission. Not asserting specific cryogenic temperature thresholds, containment system engineering details, or Boil-Off Gas handling specifics — kept procedural and generic.",
    },

    operationPhaseOrder: [
      "pre_cooldown_preparation",
      "tank_cooldown",
      "cryogenic_arm_connection_and_initial_loading",
      "continuous_loading_with_bog_management",
      "loading_complete_verification",
      "disconnection_and_departure_preparation",
    ],
    operationPhases: {
      pre_cooldown_preparation: {
        id: "pre_cooldown_preparation",
        title: { en: "Pre-Cooldown Preparation" },
        steps: [
          { en: "Cargo tanks inspected and confirmed ready." },
          { en: "Cryogenic arm connection readiness confirmed with the terminal." },
          { en: "Gas detection systems checked." },
          { en: "Communication protocol confirmed with the terminal." },
        ],
      },
      tank_cooldown: {
        id: "tank_cooldown",
        title: { en: "Tank Cooldown" },
        steps: [
          { en: "Tanks cooled gradually toward cargo temperature, avoiding thermal shock to the containment system." },
          { en: "Continuous temperature monitoring throughout." },
        ],
        bestPractices: [
          { en: "Cooldown rate is governed by the containment system's tolerance, not by how much time the terminal schedule would prefer it take." },
        ],
      },
      cryogenic_arm_connection_and_initial_loading: {
        id: "cryogenic_arm_connection_and_initial_loading",
        title: { en: "Cryogenic Arm Connection and Initial Loading" },
        steps: [
          { en: "Cryogenic arms connected." },
          { en: "Loading begins at a reduced rate to verify system integrity before ramping to full rate." },
        ],
      },
      continuous_loading_with_bog_management: {
        id: "continuous_loading_with_bog_management",
        title: { en: "Continuous Loading with Boil-Off Gas Management" },
        overview: { en: "An ongoing cycle for the duration of loading, not a one-time check: temperature, pressure, and Boil-Off Gas levels are monitored continuously as cargo is transferred." },
        steps: [
          { en: "Loading proceeds at full rate once initial verification is complete." },
          { en: "Boil-Off Gas — naturally evaporating from the cargo — is continuously managed throughout, whether used as fuel or reliquefied." },
          { en: "Temperature and pressure monitored continuously against safe limits." },
        ],
        hasIllustrationPlaceholder: true,
      },
      loading_complete_verification: {
        id: "loading_complete_verification",
        title: { en: "Loading Complete: Verification" },
        steps: [
          { en: "Final quantity confirmed and documentation completed." },
          { en: "Confirmation exchanged with the terminal that transfer is complete." },
        ],
      },
      disconnection_and_departure_preparation: {
        id: "disconnection_and_departure_preparation",
        title: { en: "Disconnection and Departure Preparation" },
        steps: [
          { en: "Cryogenic arms disconnected." },
          { en: "Final checks completed." },
          { en: "Departure preparations; schedule confirmed." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "terminal_readiness_confirmation", phaseId: "pre_cooldown_preparation", from: "terminal", to: "deck", trigger: { en: "Before cooldown begins" }, content: { en: "Terminal confirms cryogenic arm and berth readiness." }, whyItMatters: { en: "The plan/readiness originates externally, same confirm-before-starting pattern as every prior pre-operation channel." } },
      { id: "engine_gas_systems_readiness", phaseId: "pre_cooldown_preparation", from: "engine", to: "deck", trigger: { en: "Before cooldown begins" }, content: { en: "Confirmation that gas systems, Boil-Off Gas equipment, and containment monitoring are ready." }, whyItMatters: { en: "Engine's readiness underpins the entire operation — the same dependency thread AHTS first established, here specific to gas systems." } },
      { id: "cooldown_authorization", phaseId: "pre_cooldown_preparation", from: "deck", to: "terminal", trigger: { en: "Pre-cooldown checks complete" }, content: { en: "Vessel confirms readiness to begin cooldown." }, whyItMatters: { en: "Same confirm-before-starting pattern." } },
      { id: "cooldown_status_ongoing", phaseId: "tank_cooldown", from: "deck", to: "bridge", trigger: { en: "Continuous during cooldown" }, content: { en: "Chief Officer reports cooldown progress and temperature readings to the Master." }, whyItMatters: { en: "The Master's overall awareness depends on this, echoing every prior operation's ongoing-status relationship." } },
      { id: "cooldown_complete_confirmation", phaseId: "tank_cooldown", from: "deck", to: "terminal", trigger: { en: "Cooldown complete" }, content: { en: "Vessel confirms tanks are at cargo temperature, ready for arm connection." }, whyItMatters: { en: "Explicit confirmation, not assumed from elapsed time alone." } },
      { id: "initial_loading_verification", phaseId: "cryogenic_arm_connection_and_initial_loading", from: "deck", to: "terminal", trigger: { en: "After reduced-rate loading begins" }, content: { en: "Confirmation that system integrity checks passed; ready to ramp to full rate." }, whyItMatters: { en: "The reduced-rate verification step exists specifically to catch a problem before committing to full-rate transfer." } },
      { id: "bog_status_ongoing", phaseId: "continuous_loading_with_bog_management", from: "engine", to: "deck", trigger: { en: "Continuous during loading" }, content: { en: "Second Engineer reports Boil-Off Gas management status and any temperature/pressure deviation to the Chief Officer." }, whyItMatters: { en: "A real, ongoing Engine input to the Deck-owned cargo operation — continuous rather than a single report, unlike Container Ship's ballast/fuel touchpoint." } },
      { id: "loading_status_to_bridge", phaseId: "continuous_loading_with_bog_management", from: "deck", to: "bridge", trigger: { en: "Continuous during loading" }, content: { en: "Chief Officer reports loading progress and any deviation to the Master." }, whyItMatters: { en: "Same ongoing-status relationship." } },
      { id: "quantity_confirmation", phaseId: "loading_complete_verification", from: "terminal", to: "deck", trigger: { en: "Loading complete" }, content: { en: "Final quantity and documentation exchanged." }, whyItMatters: { en: "Closes the transfer with an explicit, mutual record." } },
      { id: "departure_clearance", phaseId: "disconnection_and_departure_preparation", from: "bridge", to: "terminal", trigger: { en: "Ready to depart" }, content: { en: "Departure clearance." }, whyItMatters: { en: "Standard closing touchpoint, matches every prior operation's departure/closing touchpoint." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Overall command, oversight-focused rather than hands-on — the same background role as every routine first operation's Master except AHTS, where load-critical conning kept the Master more directly engaged. No equivalent physical maneuvering here." } },
      { rankId: "chief_officer", identity: { en: "The signature role, explicitly named in the vessel's own content as responsible for cryogenic cargo operations. Owns the entire transfer discipline: authorizing cooldown, overseeing loading, coordinating with the terminal throughout." } },
      { rankId: "oow", identity: { en: "The second occurrence of Container Ship op1's genuine departure. Alongside at a terminal with no navigation happening, the OOW's usual defining task doesn't apply here either — joins the deck-side operational support instead." } },
      { rankId: "ab", identity: { en: "Assists with cryogenic arm connection and deck-level monitoring, reporting directly to the Chief Officer. The second occurrence of Tugboat's reduced-hierarchy shape — no Bosun intermediary here either." } },
      { rankId: "chief_engineer", identity: { en: "Owns overall gas-systems and Boil-Off Gas readiness before and during the operation — reports and sustains rather than executes hands-on, the same support shape as every prior routine-operation Chief Engineer." } },
      { rankId: "second_engineer", identity: { en: "Absorbs the card's 'Gas Engineer' specialist duties: continuous hands-on Boil-Off Gas management and cryogenic-systems monitoring throughout loading, not just assisting the Chief Engineer at working level. The fold changes the weight of this rank's role, not just its label." } },
      { rankId: "third_engineer", identity: { en: "Continues routine engine-room watch and readiness, supporting the Second Engineer's more specialized focus — the same lighter role as Container Ship's Third Engineer." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Holds overall command; authorizes cooldown to begin, informed by the Chief Officer's readiness assessment; grants final departure clearance." }],
        iMonitor: [{ en: "Overall operation status via the Chief Officer." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on cooldown/loading execution — delegated to the Chief Officer." }],
      },
      chief_officer: {
        iExecute: [{ en: "Confirms pre-cooldown readiness; authorizes cooldown; oversees loading; coordinates with the terminal throughout; confirms transfer complete." }],
        iMonitor: [{ en: "Cooldown and loading progress continuously; Boil-Off Gas status as reported by the Second Engineer." }],
        iReport: [{ en: "Status to the Master; confirmations to the terminal." }],
        iDoNotAuthorize: [{ en: "Departure clearance itself — the Master's call." }],
      },
      oow: {
        iExecute: [{ en: "Supports the Chief Officer's cargo-operation oversight directly, as part of the deck-side team." }],
        iMonitor: [{ en: "Status alongside the rest of the deck-side team." }],
        iReport: [{ en: "Observations to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Cooldown/loading decisions." }],
      },
      ab: {
        iExecute: [{ en: "Assists with cryogenic arm connection and deck-level monitoring, under the Chief Officer's direct direction." }],
        iMonitor: [{ en: "Immediate deck-level indicators." }],
        iReport: [{ en: "Observations directly to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Independent action; cooldown/loading decisions." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Ensures overall gas-systems and Boil-Off Gas readiness before and during the operation; directs the Second Engineer." }],
        iMonitor: [{ en: "Overall system health throughout." }],
        iReport: [{ en: "Readiness confirmation and any significant deviation to the Chief Officer/bridge." }],
        iDoNotAuthorize: [{ en: "Cargo-operation decisions themselves." }],
      },
      second_engineer: {
        iExecute: [{ en: "Owns continuous, hands-on Boil-Off Gas management and cryogenic-systems monitoring throughout loading — the absorbed specialist gas-systems role." }],
        iMonitor: [{ en: "Temperature, pressure, and Boil-Off Gas levels continuously." }],
        iReport: [{ en: "Status and any deviation directly to the Chief Officer, alongside the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Cargo-operation decisions themselves; overriding the Chief Engineer's overall system-readiness authority." }],
      },
      third_engineer: {
        iExecute: [{ en: "Maintains routine engine-room watch, supporting the Second Engineer's specialized focus." }],
        iMonitor: [{ en: "Routine engine-room parameters." }],
        iReport: [{ en: "Routine watch status to the Second Engineer/Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Any cargo-operation or gas-systems decision." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      ab: "perform",
      chief_engineer: "support",
      second_engineer: "lead",
      third_engineer: "observe",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "ab", "oow"],
        prompt: { en: "Put the six phases of the LNG cargo transfer in the correct order." },
        items: [
          { id: "pre_cooldown_preparation", label: { en: "Pre-Cooldown Preparation" } },
          { id: "tank_cooldown", label: { en: "Tank Cooldown" } },
          { id: "cryogenic_arm_connection_and_initial_loading", label: { en: "Cryogenic Arm Connection and Initial Loading" } },
          { id: "continuous_loading_with_bog_management", label: { en: "Continuous Loading with Boil-Off Gas Management" } },
          { id: "loading_complete_verification", label: { en: "Loading Complete: Verification" } },
          { id: "disconnection_and_departure_preparation", label: { en: "Disconnection and Departure Preparation" } },
        ],
        correctOrder: ["pre_cooldown_preparation", "tank_cooldown", "cryogenic_arm_connection_and_initial_loading", "continuous_loading_with_bog_management", "loading_complete_verification", "disconnection_and_departure_preparation"],
      },
      {
        type: "error_identification",
        id: "err_cooldown_rate_over_schedule",
        targetRanks: ["chief_officer", "oow", "ab"],
        scenario: { en: "The Chief Officer accelerates tank cooldown to save time, despite temperature readings suggesting the faster rate risks thermal shock. The AB reports a deck-level anomaly immediately to the Chief Officer upon noticing it. The Second Engineer reports a Boil-Off Gas deviation as conditions change." },
        choices: [
          { id: "c1", label: { en: "Accelerating tank cooldown to save time despite temperature readings suggesting risk" }, isError: true, explanation: { en: "Violates the explicit rule that cooldown rate is governed by the containment system's tolerance, not by schedule pressure." } },
          { id: "c2", label: { en: "The AB reporting a deck-level anomaly immediately to the Chief Officer" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "The Second Engineer reporting a Boil-Off Gas deviation as conditions change" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "precooldown_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team is briefed and the terminal reports ready. Review the readiness snapshot below before authorizing cooldown to begin." },
        items: [
          { id: "terminal_berth_readiness", label: { en: "Cryogenic arm and berth readiness confirmed with the terminal" }, isSatisfied: true },
          { id: "gas_detection_checked", label: { en: "Gas detection systems checked" }, isSatisfied: true },
          { id: "terminal_confirms_readiness", label: { en: "Terminal confirms readiness to begin" }, isSatisfied: true },
          { id: "engine_gas_systems_readiness", label: { en: "Engine confirms gas-systems and Boil-Off Gas equipment readiness" }, isSatisfied: false },
          { id: "master_authorization", label: { en: "Master's authorization to begin cooldown completed" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "Cooldown is behind the terminal's preferred schedule; temperature readings suggest a faster rate might still be within tolerance, but it's a genuine judgment call under time pressure." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer assesses the rate strictly against containment tolerance, not against the schedule, and only adjusts pace if genuinely safe to do so." }],
        why: [{ en: "Tests whether the rate-governed-by-tolerance-not-schedule principle holds under real pressure." }],
        commonMistakes: [{ en: "Accelerating cooldown primarily to satisfy the schedule." }],
        safetyPoints: [{ en: "Thermal shock risk doesn't shrink because the terminal is in a hurry." }],
      },
      {
        situation: { en: "Cooldown has been running for the expected duration, and there's a temptation to proceed to arm connection since 'enough time has passed.'" },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer confirms cooldown complete based on actual temperature readings, not elapsed time alone." }],
        why: [{ en: "Operationalizes the explicit-confirmation-not-assumed principle for a case where elapsed time is a misleading proxy." }],
        commonMistakes: [{ en: "Treating elapsed time as sufficient confirmation without checking actual temperature." }],
        safetyPoints: [{ en: "Cooldown progress depends on real conditions, not a fixed clock." }],
      },
      {
        situation: { en: "The Second Engineer notices an ambiguous Boil-Off Gas reading during continuous loading — might be a sensor issue, might be a real deviation." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Second Engineer reports the ambiguous reading immediately rather than waiting to be sure." }],
        why: [{ en: "Tests whether the elevated Second Engineer role still defers to reporting uncertainty immediately, rather than treating the expanded ownership as a reason to resolve it alone first." }],
        commonMistakes: [{ en: "Waiting to independently diagnose before reporting, given the increased sense of ownership." }],
        safetyPoints: [{ en: "Owning a domain doesn't mean resolving every uncertainty alone before it's shared." }],
      },
      {
        situation: { en: "A reported Boil-Off Gas deviation triggers a response, but it later turns out to be a sensor error, not a real deviation." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Second Engineer reports the false alarm honestly and clearly, rather than downplaying the earlier report now that it's turned out to be nothing." }],
        why: [{ en: "Echoes the established honest-reporting value already proven in the catalog — a call that turns out unnecessary in hindsight isn't the same as a wrong call." }],
        commonMistakes: [{ en: "Downplaying or over-apologizing for a report that turned out to be unnecessary." }],
        safetyPoints: [{ en: "A correctly reported false alarm keeps the reporting discipline intact regardless of outcome." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_ownership_versus_authority",
        title: { en: "Expanded Ownership, Not Expanded Authority" },
        seatRankId: "second_engineer",
        root: {
          id: "level_1",
          situation: { en: "You are the Second Engineer. With the gas-systems specialist role now genuinely yours, you notice Boil-Off Gas pressure trending slightly outside the normal band during loading. It's within your growing expertise to judge, and you could adjust the reliquefaction/venting balance yourself to correct it." },
          options: [
            {
              id: "a_adjust_unilaterally",
              label: { en: "Adjust the settings yourself immediately, since this is now genuinely your domain to manage." },
              consequence: { en: "The adjustment is made without the Chief Officer or Chief Engineer being aware it happened." },
              feedback: { en: "Owning the technical domain doesn't extend to deciding a cargo-operation-relevant adjustment alone — that boundary doesn't move just because your expertise has grown." },
              next: {
                id: "level_2_a",
                situation: { en: "The adjustment has a side effect that touches the loading rate itself — something the Chief Officer wasn't told was happening and now needs to account for." },
                options: [
                  { id: "a1", label: { en: "Don't mention it, since it was a technical engine-side matter." }, consequence: { en: "The Chief Officer manages the loading rate without knowing why it's behaving as it is." }, feedback: { en: "An effect that reaches the cargo operation isn't a purely engine-side matter anymore." } },
                  { id: "a2", label: { en: "Immediately report what was done and its effect on the loading rate." }, consequence: { en: "The Chief Officer now has an accurate picture to manage the operation with." }, feedback: { en: "Correct — disclosing the action and its effect is what lets the Chief Officer actually account for it." }, isRecommended: true },
                  { id: "a3", label: { en: "Quietly revert the adjustment without mentioning any of it." }, consequence: { en: "The trend returns, and no one else knows what happened in between." }, feedback: { en: "Leaves the Chief Officer working from an incomplete picture of what actually occurred." } },
                ],
              },
            },
            {
              id: "b_report_before_acting",
              label: { en: "Report the trend to the Chief Officer and Chief Engineer before making any adjustment, even though you could technically act." },
              consequence: { en: "The cargo-operation authority is informed before anything changes." },
              feedback: { en: "Correct — technical ownership of the gas systems doesn't include unilateral authority over something that touches the cargo operation." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "Informed, the Chief Officer asks you to proceed with the adjustment under your own technical judgment, given your expertise." },
                options: [
                  { id: "b1", label: { en: "Proceed with the adjustment, now explicitly authorized." }, consequence: { en: "The adjustment is made with the cargo-operation authority's knowledge and consent." }, feedback: { en: "Correct — this is exactly what reporting before acting was for." }, isRecommended: true },
                  { id: "b2", label: { en: "Refuse to act at all, insisting on further approval even though it was just given." }, consequence: { en: "The correction is delayed by an unnecessary extra round of approval-seeking." }, feedback: { en: "The authorization just given is real — insisting on more adds friction without adding safety." } },
                  { id: "b3", label: { en: "Proceed with the adjustment but don't report the outcome once it's done." }, consequence: { en: "The Chief Officer doesn't know whether the adjustment resolved the trend." }, feedback: { en: "Closing the loop on an authorized action is part of carrying it out properly, not optional." } },
                ],
              },
            },
            {
              id: "c_wait_and_monitor",
              label: { en: "Wait and monitor a bit longer before deciding anything, since it's only a slight trend so far." },
              consequence: { en: "The trend continues developing while no one outside the engine room is aware of it." },
              feedback: { en: "A developing trend during an active cargo operation is exactly the kind of thing that should be shared promptly, not watched quietly." },
              next: {
                id: "level_2_c",
                situation: { en: "The trend has continued past the point where monitoring alone is enough, and the cargo operation has continued the whole time without anyone else aware of it." },
                options: [
                  { id: "c1", label: { en: "Continue waiting, since it's still framed as just a trend." }, consequence: { en: "The delay compounds at the point where it matters most." }, feedback: { en: "Compounds the original delay at the worst possible moment." } },
                  { id: "c2", label: { en: "Report it now, even though you were hoping to have a fuller picture first." }, consequence: { en: "The Chief Officer is finally informed, later than ideal but before further delay." }, feedback: { en: "Correct, though the earlier wait already cost time that a prompt report would have saved." }, isRecommended: true },
                  { id: "c3", label: { en: "Attempt to adjust it yourself now, since it's gone on long enough to justify acting." }, consequence: { en: "The same unilateral-authority boundary is crossed, just later." }, feedback: { en: "How long the trend has gone on doesn't change where the authority boundary sits." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Cooldown Rate Governed by Tolerance, Not Schedule" },
        bestPractices: [
          { en: "Cooldown proceeds at the rate the containment system tolerates, regardless of terminal schedule pressure." },
        ],
        commonErrors: [
          { en: "Accelerating cooldown primarily to satisfy the schedule rather than the system's actual tolerance." },
        ],
      },
      {
        theme: { en: "Explicit Confirmation, Not Elapsed Time" },
        bestPractices: [
          { en: "Cooldown completion is confirmed from actual temperature readings, not from how much time has passed." },
        ],
        commonErrors: [
          { en: "Treating elapsed time as sufficient confirmation that cooldown is complete." },
        ],
      },
      {
        theme: { en: "Boil-Off Gas as a Continuous Background Condition" },
        bestPractices: [
          { en: "Boil-Off Gas is monitored continuously throughout loading, not checked periodically." },
        ],
        commonErrors: [
          { en: "Treating Boil-Off Gas monitoring as a periodic check rather than a continuous one." },
        ],
      },
      {
        theme: { en: "Expanded Ownership, Not Expanded Authority" },
        bestPractices: [
          { en: "Technical ownership of the gas systems is reported to the cargo-operation authority before acting on anything that touches the operation itself, however confident the technical judgment." },
          { en: "Once explicitly authorized, action proceeds — insisting on further approval past that point adds friction without adding safety." },
        ],
        commonErrors: [
          { en: "Treating expanded technical ownership as unilateral authority over a cargo-operation-relevant decision." },
          { en: "Refusing to act after authorization has already been explicitly given." },
        ],
      },
      {
        theme: { en: "Reporting Regardless of Outcome" },
        bestPractices: [
          { en: "A deviation is reported honestly whether or not it later turns out to matter." },
        ],
        commonErrors: [
          { en: "Downplaying or over-apologizing for a report that turned out to be a false alarm." },
        ],
      },
      {
        theme: { en: "Roles Without Their Usual Anchor" },
        bestPractices: [
          { en: "When a rank's usual defining task doesn't apply in a given context — no navigation for the OOW, no Bosun layer for the AB — the rank's contribution shifts to what the operation actually needs, not diminished, just redirected." },
        ],
        commonErrors: [
          { en: "Treating a rank's redirected role as a lesser one because it doesn't match its usual shape." },
        ],
      },
    ],
  },

  lng_cargo_leak_containment_failure: {
    operationId: "lng_cargo_leak_containment_failure",
    vesselTypeId: "lng_carrier",
    department: "deck",
    status: "draft",

    title: { en: "LNG Carrier — Cargo Leak During Transfer (Containment/Connection Failure)" },
    introduction: {
      en: "During cargo transfer — mid-loading, the Continuous Loading with Boil-Off Gas Management phase of op1 — a connection or containment issue develops, causing a cryogenic LNG leak. This is a genuinely multi-faceted hazard, not a single one: immediate cold-injury risk to anyone near the leak (frostbite, cryogenic burns), a flammable vapor cloud forming as the leaked LNG vaporizes (explosion risk if it reaches an ignition source), and an open structural question about the containment system's integrity. The operational discipline here is escalation prevention, not direct response to an already-realized hazard: immediate stop-transfer, personnel evacuation from the affected area, ignition-source elimination, and continuous vapor monitoring — the goal is to resolve the leak before it becomes a fire or an injury, not to fight one that's already happened. This is fundamentally different from AHTS Fire Response and Container Ship's cargo fire, both of which begin with a fire already burning; this operation's entire discipline is built around never reaching that point.",
    },
    objectives: [
      { en: "Describe the sequence of responding to a cryogenic leak during cargo transfer, from detection through stand-down." },
      { en: "Explain why this operation's central discipline is escalation prevention — stop transfer, isolate, eliminate ignition sources, manage vapor — rather than direct fire response, and how that differs from AHTS Fire Response and Container Ship's cargo fire." },
      { en: "Explain the combined cold-injury and explosion-risk hazard a cryogenic leak presents, and how the response addresses both simultaneously." },
      { en: "Identify who does what during this operation on an LNG carrier specifically." },
      { en: "Recognize correct versus incorrect prioritization under a developing hazard whose full extent — structural, thermal, explosive — isn't immediately known." },
    ],
    context: {
      en: "This operation interrupts op1's own activity directly — the leak develops mid-loading, at the same terminal, following the same routine-then-emergency pairing confirmed across every vessel so far. AHTS Fire Response and Container Ship's cargo fire are both post-ignition response operations; this one is pre-ignition prevention. Carries forward op1's 7-rank roster (Master, Chief Officer, OOW, AB, Chief Engineer, Second Engineer, Third Engineer, no Bosun) unchanged. No new CommunicationParty needed — unlike Container Ship's fire, leak isolation here is inherently the vessel's own systems work, the same expanded Second Engineer ownership established in op1; the terminal remains the only external party, and the halt is a coordinated joint action rather than a unilateral stop-work order, since LNG transfer runs through both ship and terminal cryogenic systems together. Not asserting specific gas detection thresholds, vapor dispersal modeling, or cryogenic injury treatment protocols — kept procedural and generic.",
    },

    operationPhaseOrder: [
      "leak_detection_and_alert",
      ["command_transfer_and_transfer_halt", "exclusion_zone_and_evacuation", "ignition_source_elimination"],
      "vapor_monitoring_and_leak_assessment",
      "leak_isolation",
      "confirmed_contained_and_standdown",
      "resumption_decision",
    ],
    operationPhases: {
      leak_detection_and_alert: {
        id: "leak_detection_and_alert",
        title: { en: "Leak Detection and Alert" },
        steps: [
          { en: "Leak detected — via gas detection alarm, visual observation (vapor or frost), or a crew member noticing an anomaly." },
          { en: "Immediate alert raised: location, what's observed." },
        ],
      },
      command_transfer_and_transfer_halt: {
        id: "command_transfer_and_transfer_halt",
        title: { en: "Command Transfer and Transfer Halt" },
        steps: [
          { en: "Command transfers explicitly to the Chief Officer as on-scene commander." },
          { en: "Cargo transfer halted immediately, coordinated with the terminal." },
        ],
      },
      exclusion_zone_and_evacuation: {
        id: "exclusion_zone_and_evacuation",
        title: { en: "Exclusion Zone and Evacuation" },
        steps: [
          { en: "An exclusion zone established around the affected area." },
          { en: "Non-essential personnel evacuated clear." },
        ],
      },
      ignition_source_elimination: {
        id: "ignition_source_elimination",
        title: { en: "Ignition-Source Elimination" },
        steps: [
          { en: "All potential ignition sources in the affected area secured or shut down." },
        ],
      },
      vapor_monitoring_and_leak_assessment: {
        id: "vapor_monitoring_and_leak_assessment",
        title: { en: "Vapor Monitoring and Leak Assessment" },
        overview: { en: "An ongoing cycle for the duration of the response, not a one-time check." },
        steps: [
          { en: "Gas detection readings monitored continuously." },
          { en: "Leak behavior assessed: contained, growing, or stable." },
          { en: "Vapor cloud direction and dispersal monitored." },
        ],
        hasIllustrationPlaceholder: true,
      },
      leak_isolation: {
        id: "leak_isolation",
        title: { en: "Leak Isolation" },
        steps: [
          { en: "Once assessed, the affected connection or system is isolated (valves closed, system isolated) to stop the leak." },
          { en: "The Second Engineer's cryogenic-systems expertise — the same expanded ownership established in op1 — directly informs this action." },
        ],
      },
      confirmed_contained_and_standdown: {
        id: "confirmed_contained_and_standdown",
        title: { en: "Confirmed Contained and Stand-Down" },
        steps: [
          { en: "Leak confirmed stopped and area confirmed safe — not assumed from the absence of visible vapor." },
          { en: "Transition to reduced-alert monitoring." },
        ],
      },
      resumption_decision: {
        id: "resumption_decision",
        title: { en: "Resumption Decision" },
        steps: [
          { en: "Joint decision — vessel and terminal — on whether and when cargo transfer can resume." },
          { en: "The affected connection or system addressed per applicable procedure before resumption." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "leak_alert", phaseId: "leak_detection_and_alert", from: "deck_team", to: "bridge", trigger: { en: "Leak detected" }, content: { en: "Immediate alert: location, what's observed." }, whyItMatters: { en: "Everything downstream depends on this reaching the bridge without delay." } },
      { id: "command_transfer_confirmation", phaseId: "command_transfer_and_transfer_halt", from: "bridge", to: "deck", trigger: { en: "Immediately on alert" }, content: { en: "Explicit assumption of emergency command by the Master; Chief Officer confirmed as on-scene commander." }, whyItMatters: { en: "An authority handoff, mirroring every prior emergency operation's command-transfer touchpoint." } },
      { id: "transfer_halt_notification", phaseId: "command_transfer_and_transfer_halt", from: "deck", to: "terminal", trigger: { en: "Immediately on alert" }, content: { en: "Cargo transfer halted immediately." }, whyItMatters: { en: "A coordinated joint action, not a unilateral stop-work order — LNG transfer runs through both ship and terminal systems together." } },
      { id: "engine_isolation_readiness", phaseId: "command_transfer_and_transfer_halt", from: "engine", to: "deck", trigger: { en: "Immediately on alert" }, content: { en: "Second Engineer confirms readiness to assess and isolate the affected system." }, whyItMatters: { en: "Grounds Engine's role in this specific emergency, echoing every prior operation's Engine-readiness touchpoint." } },
      { id: "onscene_status_to_bridge", phaseId: "vapor_monitoring_and_leak_assessment", from: "deck", to: "bridge", trigger: { en: "Continuous during the incident" }, content: { en: "Chief Officer reports leak status, exclusion zone status, and crew status to the Master." }, whyItMatters: { en: "Same ongoing-status relationship as every prior emergency." } },
      { id: "leak_assessment_to_terminal", phaseId: "vapor_monitoring_and_leak_assessment", from: "deck", to: "terminal", trigger: { en: "Continuous during the incident" }, content: { en: "Vessel keeps the terminal informed of leak status and vapor dispersal direction." }, whyItMatters: { en: "The terminal's own personnel and equipment may be affected by vapor dispersal — a shared-risk situation, not vessel-only." } },
      { id: "isolation_authorization", phaseId: "leak_isolation", from: "deck", to: "engine", trigger: { en: "Leak assessed" }, content: { en: "Chief Officer authorizes the Second Engineer to isolate the affected system." }, whyItMatters: { en: "Directly echoes op1's authority-boundary lesson: expanded technical ownership still isolates the system once authorized, not unilaterally." } },
      { id: "isolation_confirmation", phaseId: "leak_isolation", from: "engine", to: "deck", trigger: { en: "Isolation complete" }, content: { en: "Second Engineer confirms the affected system is isolated and the leak has stopped." }, whyItMatters: { en: "Closes the loop on the authorized action." } },
      { id: "contained_confirmation", phaseId: "confirmed_contained_and_standdown", from: "deck", to: "bridge", trigger: { en: "Leak confirmed contained" }, content: { en: "Chief Officer reports leak contained and area confirmed safe, transitioning to reduced-alert monitoring." }, whyItMatters: { en: "Not assumed from the absence of visible vapor — the same explicit-confirmation discipline as every prior emergency." } },
      { id: "resumption_go_no_go", phaseId: "resumption_decision", from: "bridge", to: "terminal", trigger: { en: "Reduced-alert monitoring period elapsed without incident" }, content: { en: "Joint go/no-go decision on resuming cargo transfer." }, whyItMatters: { en: "Echoes the joint go/no-go pattern established across the catalog." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "In op1, a background, oversight-focused role. Here, assumes overall emergency command the instant the alarm is raised — the same authority-assumption shape as every prior emergency operation's Master." } },
      { rankId: "chief_officer", identity: { en: "In op1, owned the transfer discipline outright. Here, becomes on-scene commander: directing the exclusion zone and evacuation, coordinating the joint halt with the terminal, and authorizing the Second Engineer's isolation action." } },
      { rankId: "oow", identity: { en: "The second occurrence of Container Ship op2's compounded departure: already had no navigation to depart from in op1, and here supports the Master's emergency command (communications, exclusion-zone tracking) the same way." } },
      { rankId: "ab", identity: { en: "In op1, worked directly under the Chief Officer with no Bosun intermediary. Here, follows into evacuation and exclusion-zone compliance the same way — the no-Bosun structure carries into the emergency unchanged." } },
      { rankId: "chief_engineer", identity: { en: "Oversees and coordinates the engine department's overall response and readiness — but the actual isolation work is executed by the Second Engineer, not the Chief Engineer directly, since that domain is already the Second Engineer's per op1." } },
      { rankId: "second_engineer", identity: { en: "Directly executes leak isolation once authorized by the Chief Officer — the emergency application of the exact domain ownership established in op1's lead level. The authority-boundary lesson from op1's interactive scenario applies literally here." } },
      { rankId: "third_engineer", identity: { en: "Continues routine engine-room watch and readiness during the incident — the same lighter role as op1 and as Container Ship's Third Engineer." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Assumes overall emergency command; directs the ship's overall response; holds the stand-down and resumption decisions jointly with the terminal." }],
        iMonitor: [{ en: "Overall incident status via the Chief Officer." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on leak response actions — delegated to the Chief Officer and Second Engineer." }],
      },
      chief_officer: {
        iExecute: [{ en: "Assumes on-scene command; directs the exclusion zone and evacuation; coordinates the joint transfer halt with the terminal; authorizes the Second Engineer's isolation action; confirms leak contained." }],
        iMonitor: [{ en: "Leak status and exclusion-zone integrity continuously; isolation progress as reported by the Second Engineer." }],
        iReport: [{ en: "Status to the Master continuously; status to the terminal." }],
        iDoNotAuthorize: [{ en: "The Master's overall stand-down/resumption authority." }],
      },
      oow: {
        iExecute: [{ en: "Supports the Master's emergency command — communications, tracking exclusion-zone status." }],
        iMonitor: [{ en: "Communications flow and exclusion-zone reporting." }],
        iReport: [{ en: "Status updates as directed by the Master." }],
        iDoNotAuthorize: [{ en: "Independent command decisions." }],
      },
      ab: {
        iExecute: [{ en: "Complies with evacuation/exclusion-zone direction under the Chief Officer's direct direction." }],
        iMonitor: [{ en: "Own immediate safety and exclusion-zone compliance." }],
        iReport: [{ en: "Observations directly to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Independent action; approaching the affected area." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Oversees and coordinates the engine department's overall response; confirms readiness to support the Second Engineer's isolation work." }],
        iMonitor: [{ en: "Overall engine-department status throughout the incident." }],
        iReport: [{ en: "Status to the Chief Officer/bridge." }],
        iDoNotAuthorize: [{ en: "Cargo-operation decisions themselves." }],
      },
      second_engineer: {
        iExecute: [{ en: "Directly executes leak isolation once authorized by the Chief Officer — the emergency application of the cryogenic-systems domain already owned from op1." }],
        iMonitor: [{ en: "Isolation progress and system status continuously." }],
        iReport: [{ en: "Status directly to the Chief Officer, alongside the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Acting before the Chief Officer's authorization — the same boundary established in op1's interactive scenario, holding under emergency conditions too." }],
      },
      third_engineer: {
        iExecute: [{ en: "Maintains routine engine-room watch and readiness throughout the incident." }],
        iMonitor: [{ en: "Routine engine-room parameters." }],
        iReport: [{ en: "Routine watch status to the Second Engineer/Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Any leak-response decision." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      ab: "perform",
      chief_engineer: "support",
      second_engineer: "lead",
      third_engineer: "observe",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "ab", "oow"],
        prompt: { en: "Put the phases of the LNG cargo leak response in the correct order." },
        items: [
          { id: "leak_detection_and_alert", label: { en: "Leak Detection and Alert" } },
          { id: "command_transfer_and_transfer_halt", label: { en: "Command Transfer and Transfer Halt" } },
          { id: "exclusion_zone_and_evacuation", label: { en: "Exclusion Zone and Evacuation" } },
          { id: "ignition_source_elimination", label: { en: "Ignition-Source Elimination" } },
          { id: "vapor_monitoring_and_leak_assessment", label: { en: "Vapor Monitoring and Leak Assessment" } },
          { id: "leak_isolation", label: { en: "Leak Isolation" } },
          { id: "confirmed_contained_and_standdown", label: { en: "Confirmed Contained and Stand-Down" } },
          { id: "resumption_decision", label: { en: "Resumption Decision" } },
        ],
        correctOrder: [
          "leak_detection_and_alert",
          ["command_transfer_and_transfer_halt", "exclusion_zone_and_evacuation", "ignition_source_elimination"],
          "vapor_monitoring_and_leak_assessment",
          "leak_isolation",
          "confirmed_contained_and_standdown",
          "resumption_decision",
        ],
      },
      {
        type: "error_identification",
        id: "err_unauthorized_isolation",
        targetRanks: ["ab", "oow", "chief_officer"],
        scenario: { en: "The Second Engineer isolates the affected system immediately upon noticing the leak, without waiting for the Chief Officer's authorization. The AB complies with the evacuation direction immediately upon being told to move clear. The Chief Officer authorizes the Second Engineer's isolation only after the leak has been assessed." },
        choices: [
          { id: "c1", label: { en: "The Second Engineer isolating the system immediately without waiting for authorization" }, isError: true, explanation: { en: "Violates the explicit boundary established in op1 and carried into this emergency: technical ownership doesn't include unilateral authority over an action that affects the cargo operation." } },
          { id: "c2", label: { en: "The AB complying with the evacuation direction immediately" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "The Chief Officer authorizing isolation only after the leak has been assessed" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "resumption_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The leak appears contained and the reduced-alert monitoring period has elapsed. Review the readiness snapshot below before authorizing cargo transfer to resume." },
        items: [
          { id: "leak_confirmed_stopped", label: { en: "Leak confirmed stopped and area confirmed safe" }, isSatisfied: true },
          { id: "monitoring_period_elapsed", label: { en: "Reduced-alert monitoring period elapsed without incident" }, isSatisfied: true },
          { id: "system_inspected", label: { en: "Affected connection/system inspected and cleared" }, isSatisfied: false },
          { id: "terminal_equipment_inspected", label: { en: "Terminal's own equipment inspected and cleared" }, isSatisfied: false },
          { id: "master_resumption_decision", label: { en: "Master's final resumption decision completed" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "The Second Engineer, closest to the affected system and most qualified to assess it, feels the urge to isolate it immediately rather than wait for the Chief Officer's authorization, given how time-sensitive a leak feels." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Second Engineer reports the assessment to the Chief Officer and waits for authorization before isolating, even under the urgency." }],
        why: [{ en: "Tests whether the authority boundary from op1 holds under the added pressure of an actual emergency, not just a slow trend." }],
        commonMistakes: [{ en: "Acting immediately given technical confidence and the sense that this situation is more urgent than the routine lesson it echoes." }],
        safetyPoints: [{ en: "The person best positioned to act correctly isn't always the person authorized to decide when to act." }],
      },
      {
        situation: { en: "Visible vapor is gone and the situation looks resolved." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer confirms the leak contained based on gas detection readings and the Second Engineer's system confirmation, not visual appearance alone." }],
        why: [{ en: "Operationalizes the explicit-confirmation-not-assumed principle, adapted from 'not assumed from absence of visible flame' to gas detection readings." }],
        commonMistakes: [{ en: "Treating the absence of visible vapor as sufficient confirmation." }],
        safetyPoints: [{ en: "A cryogenic leak can stop being visible before it's actually stopped." }],
      },
      {
        situation: { en: "Unlike Container Ship's unilateral halt over equipment the vessel doesn't operate, this transfer halt needs both ship and terminal systems to actually stop." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer coordinates explicitly with the terminal to confirm both sides have actually halted, not just announcing the vessel's own halt and assuming the terminal follows." }],
        why: [{ en: "Tests whether the crew recognizes this halt's genuinely different shape from Container Ship's precedent, even though both involve halting a cargo operation during an emergency." }],
        commonMistakes: [{ en: "Treating this halt with the same 'announced and done' framing as Container Ship's unilateral stop-authority moment." }],
        safetyPoints: [{ en: "A halt depending on two parties' equipment isn't complete until both sides have confirmed." }],
      },
      {
        situation: { en: "Early in the response, the actual severity of the leak isn't yet clear — could be minor, could be more serious." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer reports the genuinely uncertain picture honestly to the Master, rather than downplaying or overstating it to seem more in control." }],
        why: [{ en: "Echoes the established honest-assessment-under-uncertainty value already proven in the catalog." }],
        commonMistakes: [{ en: "Overstating confidence to seem in control, or downplaying the situation to avoid alarming the Master." }],
        safetyPoints: [{ en: "An honest, appropriately uncertain report is what lets the Master make a genuinely informed decision." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_deferring_to_owned_expertise",
        title: { en: "Senior Rank, Junior Domain" },
        seatRankId: "chief_engineer",
        root: {
          id: "level_1",
          situation: { en: "You are the Chief Engineer. The Second Engineer is executing the leak isolation — the domain that's genuinely theirs, established back when the gas-systems specialist role was folded into their position. You have deep technical experience too, and as the senior engine authority, part of you wants to step in and take over directly." },
          options: [
            {
              id: "a_take_over",
              label: { en: "Step in and take over the isolation work directly, since you're the senior authority with deep experience." },
              consequence: { en: "Two people are now effectively working the same system without clear coordination." },
              feedback: { en: "Seniority doesn't override domain ownership that's already been deliberately established — that ownership doesn't move just because you technically could act." },
              next: {
                id: "level_2_a",
                situation: { en: "The overlap creates real confusion — the Chief Officer had specifically authorized the Second Engineer, and now it's unclear who's actually directing the isolation." },
                options: [
                  { id: "a1", label: { en: "Continue directing the work yourself, since you are more experienced." }, consequence: { en: "The confusion persists through the isolation itself." }, feedback: { en: "Experience doesn't resolve a coordination problem that experience itself created." } },
                  { id: "a2", label: { en: "Step back, and clearly explain to the Chief Officer and Second Engineer why." }, consequence: { en: "Clear ownership is restored, and both understand what happened." }, feedback: { en: "Correct — stepping back matters, but so does explaining it, so the moment doesn't just quietly resolve without anyone understanding what went wrong." }, isRecommended: true },
                  { id: "a3", label: { en: "Quietly disengage without saying anything about it." }, consequence: { en: "The confusion is no longer visible, but neither is what actually caused it." }, feedback: { en: "Leaves the Chief Officer and Second Engineer without the context to avoid the same overlap next time." } },
                ],
              },
            },
            {
              id: "b_stay_in_oversight",
              label: { en: "Stay in the coordination/oversight role, supporting the Second Engineer's ownership of this domain rather than stepping in." },
              consequence: { en: "The isolation proceeds with clear, single ownership." },
              feedback: { en: "Correct — the Second Engineer's ownership of this domain doesn't need your seniority added on top of it to be legitimate." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "The Second Engineer flags something they're not fully sure about during the isolation — a moment where your experience could genuinely help." },
                options: [
                  { id: "b1", label: { en: "Take over the isolation yourself, given the flagged uncertainty." }, consequence: { en: "The Second Engineer's ownership of the task is set aside." }, feedback: { en: "A flagged uncertainty is a request for input, not an invitation to take over." } },
                  { id: "b2", label: { en: "Offer your input and expertise directly, without taking over the actual execution." }, consequence: { en: "The Second Engineer gets the benefit of your experience while retaining ownership of the task." }, feedback: { en: "Correct — this is exactly what supporting the domain, rather than overriding it, looks like." }, isRecommended: true },
                  { id: "b3", label: { en: "Stay silent, since it's still technically the Second Engineer's domain." }, consequence: { en: "Useful expertise goes unshared at the moment it was actually asked for." }, feedback: { en: "Offering input when it's genuinely sought isn't the same as taking over — withholding it isn't the correct read of the boundary either." } },
                ],
              },
            },
            {
              id: "c_watch_silently",
              label: { en: "Watch closely and only intervene if something seems to go wrong, without saying anything either way in the meantime." },
              consequence: { en: "You continue observing without engaging." },
              feedback: { en: "Silent monitoring isn't really support — if something is worth watching for, it's worth being available to discuss, not just privately tracked." },
              next: {
                id: "level_2_c",
                situation: { en: "Something does start to look concerning, but having stayed silent the whole time, the moment to flag it early has largely passed." },
                options: [
                  { id: "c1", label: { en: "Continue watching, still without saying anything." }, consequence: { en: "The concerning sign goes unaddressed." }, feedback: { en: "Compounds the original silence at the point it matters most." } },
                  { id: "c2", label: { en: "Speak up now, even though it's later than it should have been." }, consequence: { en: "The concern is finally shared, later than ideal." }, feedback: { en: "Correct, though the earlier silence already cost time that speaking up sooner would have saved." }, isRecommended: true },
                  { id: "c3", label: { en: "Take over directly now, since silent watching hasn't resolved anything." }, consequence: { en: "The same ownership boundary is crossed, just by a different route." }, feedback: { en: "How long you've been silently watching doesn't change where the ownership boundary sits." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Escalation Prevention, Not Fire Response" },
        bestPractices: [
          { en: "Every action during a leak is aimed at preventing ignition and injury before they happen, not responding to them after the fact." },
        ],
        commonErrors: [
          { en: "Treating the leak response as a smaller version of a fire response, rather than a genuinely different, prevention-first discipline." },
        ],
      },
      {
        theme: { en: "The Authority Boundary Holds Under Real Pressure" },
        bestPractices: [
          { en: "The Second Engineer reports an assessment and waits for authorization before isolating the system, even under the urgency of an actual emergency." },
        ],
        commonErrors: [
          { en: "Treating technical confidence and time pressure as sufficient reason to act before authorization." },
        ],
      },
      {
        theme: { en: "Explicit Confirmation, Not Visual Appearance" },
        bestPractices: [
          { en: "The leak is confirmed contained from gas detection readings and system confirmation, not from the absence of visible vapor." },
        ],
        commonErrors: [
          { en: "Treating the absence of visible vapor as sufficient confirmation that the leak has stopped." },
        ],
      },
      {
        theme: { en: "A Coordinated Halt, Not a Unilateral One" },
        bestPractices: [
          { en: "The transfer halt is confirmed explicitly with the terminal, since it depends on both ship and terminal systems actually stopping." },
        ],
        commonErrors: [
          { en: "Announcing the vessel's own halt and assuming the terminal has stopped without confirming it." },
        ],
      },
      {
        theme: { en: "Honest Reporting Under Real Uncertainty" },
        bestPractices: [
          { en: "The leak's severity is reported honestly, including what isn't yet known, rather than rounded up or down to seem more in control." },
        ],
        commonErrors: [
          { en: "Overstating confidence or downplaying the situation to manage how it's perceived rather than to inform the decision." },
        ],
      },
      {
        theme: { en: "Seniority Doesn't Override Established Domain Ownership" },
        bestPractices: [
          { en: "A senior rank supports a junior rank's legitimately owned technical domain rather than stepping in over it, offering expertise when it's sought rather than taking over execution." },
        ],
        commonErrors: [
          { en: "Treating seniority as grounds to take over a domain that's already been deliberately established as someone else's." },
          { en: "Silently monitoring without engaging, rather than being available to genuinely support." },
        ],
      },
    ],
  },

  oil_tanker_cargo_loading_inert_gas_management: {
    operationId: "oil_tanker_cargo_loading_inert_gas_management",
    vesselTypeId: "oil_tanker",
    department: "deck",
    status: "draft",

    title: { en: "Oil Tanker — Cargo Loading Operations with Inert Gas System Management" },
    introduction: {
      en: "This operation covers the oil tanker's own defining task: loading crude oil or refined product cargo through the manifold and cargo pumps, with the vessel's central safety discipline — inert gas system (IGS) management — running throughout. The card's own stated risks are explicit: explosion and fire from hydrocarbon vapors, and static electricity hazard specifically during loading. The IGS exists precisely to prevent that explosive atmosphere from forming in the tanks in the first place, by keeping oxygen content below the level that could support combustion. No prior operation in the catalog covers this kind of proactive atmosphere-control discipline — AHTS Fire Response and Container Ship's cargo fire both begin after ignition; this operation's entire purpose is making sure that moment never arrives.",
    },
    objectives: [
      { en: "Describe the sequence of a cargo loading operation via manifold and cargo pumps, from pre-loading preparation through completion." },
      { en: "Explain the role of the inert gas system in preventing an explosive tank atmosphere, and why this is a continuous discipline rather than a one-time check." },
      { en: "Explain the static electricity precautions specific to loading operations." },
      { en: "Identify who does what during this operation on an oil tanker specifically." },
      { en: "Recognize correct versus incorrect prioritization when schedule pressure competes with IGS/ullage monitoring discipline." },
    ],
    context: {
      en: "The vessel's own defining task, the same 'owns the signature activity' pattern established across every first operation in the catalog. Scoped to loading specifically (not discharge) — discharge introduces Crude Oil Washing, a distinct technique using the cargo itself to clean tanks, which doesn't apply to loading and is left out rather than conflating two different cargo flows into one operation. The card's own 'Pumpman (cargo pump specialist)' position is folded into AB rather than a new RankId, per confirmed decision — Deck-side per the card's own wording, unlike LNG's Engine-side Gas Engineer. Roster is 7 ranks (Master, Chief Officer, OOW, AB, Chief Engineer, Second Engineer, Third Engineer) — no Bosun, confirmed absent from this vessel's own stated crew, read the same way as LNG's clean list. Not asserting specific IGS oxygen thresholds, static electricity engineering specifics, or Crude Oil Washing procedural details — kept procedural and generic.",
    },

    operationPhaseOrder: [
      "pre_loading_preparation",
      "manifold_connection_and_initial_loading",
      "continuous_loading_with_igs_and_ullage_monitoring",
      "loading_complete_verification",
      "disconnection_and_departure_preparation",
    ],
    operationPhases: {
      pre_loading_preparation: {
        id: "pre_loading_preparation",
        title: { en: "Pre-Loading Preparation" },
        steps: [
          { en: "Manifold connection readiness confirmed with the terminal." },
          { en: "Inert gas system checked and confirmed the tank atmosphere is already within safe limits." },
          { en: "Static electricity precautions briefed to the deck team." },
          { en: "Ballast plan reviewed." },
          { en: "Communication protocol confirmed with the terminal." },
        ],
      },
      manifold_connection_and_initial_loading: {
        id: "manifold_connection_and_initial_loading",
        title: { en: "Manifold Connection and Initial Loading" },
        steps: [
          { en: "Manifold connected." },
          { en: "Loading begins at a reduced rate to verify system integrity before ramping to full rate." },
        ],
      },
      continuous_loading_with_igs_and_ullage_monitoring: {
        id: "continuous_loading_with_igs_and_ullage_monitoring",
        title: { en: "Continuous Loading with IGS and Ullage Monitoring" },
        overview: { en: "An ongoing cycle for the duration of loading, not a one-time check: the tank atmosphere, cargo levels, and static electricity precautions are all monitored continuously as cargo is transferred." },
        steps: [
          { en: "Loading proceeds at full rate once initial verification is complete." },
          { en: "Inert gas system continuously monitored — oxygen content and pressure kept within safe limits throughout." },
          { en: "Ullage and sounding measurements taken continuously against the loading plan." },
          { en: "Static electricity precautions maintained throughout." },
          { en: "Ballasting coordinated in parallel to maintain trim and stability as cargo is loaded." },
        ],
        hasIllustrationPlaceholder: true,
      },
      loading_complete_verification: {
        id: "loading_complete_verification",
        title: { en: "Loading Complete: Verification" },
        steps: [
          { en: "Final ullage and quantity confirmed and documentation completed." },
          { en: "Confirmation exchanged with the terminal that loading is complete." },
        ],
      },
      disconnection_and_departure_preparation: {
        id: "disconnection_and_departure_preparation",
        title: { en: "Disconnection and Departure Preparation" },
        steps: [
          { en: "Manifold disconnected." },
          { en: "Final checks completed." },
          { en: "Departure preparations; schedule confirmed." },
        ],
      },
    },

    communicationTouchpoints: [
      { id: "terminal_readiness_confirmation", phaseId: "pre_loading_preparation", from: "terminal", to: "deck", trigger: { en: "Before loading begins" }, content: { en: "Terminal confirms manifold and berth readiness." }, whyItMatters: { en: "The plan/readiness originates externally, same confirm-before-starting pattern as every prior pre-operation channel." } },
      { id: "engine_igs_plant_readiness", phaseId: "pre_loading_preparation", from: "engine", to: "deck", trigger: { en: "Before loading begins" }, content: { en: "Confirmation that the inert gas plant is operating normally and available throughout loading." }, whyItMatters: { en: "Echoes AHTS's original ownership/dependency framing — Deck owns the cargo operation, Engine supplies the critical inerting equipment it depends on." } },
      { id: "loading_authorization", phaseId: "pre_loading_preparation", from: "deck", to: "terminal", trigger: { en: "Pre-loading checks complete" }, content: { en: "Vessel confirms readiness to begin loading." }, whyItMatters: { en: "Same confirm-before-starting pattern." } },
      { id: "initial_loading_verification", phaseId: "manifold_connection_and_initial_loading", from: "deck", to: "terminal", trigger: { en: "After reduced-rate loading begins" }, content: { en: "Confirmation that system integrity checks passed; ready to ramp to full rate." }, whyItMatters: { en: "The reduced-rate verification step exists specifically to catch a problem before committing to full-rate transfer." } },
      { id: "igs_status_ongoing", phaseId: "continuous_loading_with_igs_and_ullage_monitoring", from: "engine", to: "deck", trigger: { en: "Continuous during loading" }, content: { en: "Engine reports inert gas plant status and any deviation to the Chief Officer." }, whyItMatters: { en: "A real, ongoing Engine input to the Deck-owned cargo operation, mirroring LNG's Boil-Off Gas touchpoint but specific to the inerting plant." } },
      { id: "loading_status_to_bridge", phaseId: "continuous_loading_with_igs_and_ullage_monitoring", from: "deck", to: "bridge", trigger: { en: "Continuous during loading" }, content: { en: "Chief Officer reports loading progress, ullage readings, and any deviation to the Master." }, whyItMatters: { en: "Same ongoing-status relationship as every prior operation." } },
      { id: "quantity_confirmation", phaseId: "loading_complete_verification", from: "terminal", to: "deck", trigger: { en: "Loading complete" }, content: { en: "Final ullage/quantity and documentation exchanged." }, whyItMatters: { en: "Closes the transfer with an explicit, mutual record." } },
      { id: "departure_clearance", phaseId: "disconnection_and_departure_preparation", from: "bridge", to: "terminal", trigger: { en: "Ready to depart" }, content: { en: "Departure clearance." }, whyItMatters: { en: "Standard closing touchpoint." } },
    ],

    roleOnVessel: [
      { rankId: "master", identity: { en: "Overall command, oversight-focused rather than hands-on — the same background role as every routine first operation's Master except AHTS." } },
      { rankId: "chief_officer", identity: { en: "The signature role, explicitly named in the vessel's own content as responsible for cargo operations. Owns the entire loading discipline: manifold connection oversight, continuous IGS and ullage monitoring, ballasting coordination, coordinating with the terminal throughout." } },
      { rankId: "oow", identity: { en: "The third confirmed occurrence of the no-navigation-to-attach-to departure (after Container Ship, LNG). At a terminal with no navigation happening, joins the deck-side operational support instead." } },
      { rankId: "ab", identity: { en: "Absorbs the card's 'Pumpman' cargo-pump specialist duties. Operates cargo pumps under the Chief Officer's direction, working directly without a Bosun intermediary — the third confirmed occurrence of that structural shape (after Tugboat, LNG)." } },
      { rankId: "chief_engineer", identity: { en: "Owns the inert gas plant's readiness and maintenance before and during the operation — reports and sustains rather than executes hands-on, the same support shape as every prior routine-operation Chief Engineer." } },
      { rankId: "second_engineer", identity: { en: "Assists the Chief Engineer with the inert gas plant at working level — the standard perform/support template, not elevated the way LNG's Second Engineer was, since the specialist duty folded in here (Pumpman) is Deck-side, not Engine-side." } },
      { rankId: "third_engineer", identity: { en: "Continues routine engine-room watch and readiness, supporting the Second Engineer — the same lighter role as Container Ship's and LNG's Third Engineer." } },
    ],

    responsibilityMatrix: {
      master: {
        iExecute: [{ en: "Holds overall command; authorizes loading to begin, informed by the Chief Officer's readiness assessment; grants final departure clearance." }],
        iMonitor: [{ en: "Overall operation status via the Chief Officer." }],
        iReport: [{ en: "To company per standing orders." }],
        iDoNotAuthorize: [{ en: "Hands-on loading execution — delegated to the Chief Officer." }],
      },
      chief_officer: {
        iExecute: [{ en: "Confirms pre-loading readiness; authorizes loading; oversees IGS and ullage monitoring and ballasting; coordinates with the terminal throughout; confirms loading complete." }],
        iMonitor: [{ en: "Loading progress, IGS status, and ullage readings continuously." }],
        iReport: [{ en: "Status to the Master; confirmations to the terminal." }],
        iDoNotAuthorize: [{ en: "Departure clearance itself — the Master's call." }],
      },
      oow: {
        iExecute: [{ en: "Supports the Chief Officer's cargo-operation oversight directly, as part of the deck-side team." }],
        iMonitor: [{ en: "Status alongside the rest of the deck-side team." }],
        iReport: [{ en: "Observations to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Loading decisions." }],
      },
      ab: {
        iExecute: [{ en: "Operates cargo pumps and manifold equipment under the Chief Officer's direction, applying the absorbed Pumpman specialization." }],
        iMonitor: [{ en: "Immediate pump/manifold-level indicators." }],
        iReport: [{ en: "Observations directly to the Chief Officer." }],
        iDoNotAuthorize: [{ en: "Independent action; loading rate or sequencing decisions." }],
      },
      chief_engineer: {
        iExecute: [{ en: "Ensures the inert gas plant's readiness before and during the operation; directs the Second Engineer." }],
        iMonitor: [{ en: "Overall plant health throughout." }],
        iReport: [{ en: "Readiness confirmation and any significant deviation to the Chief Officer/bridge." }],
        iDoNotAuthorize: [{ en: "Cargo-operation decisions themselves." }],
      },
      second_engineer: {
        iExecute: [{ en: "Assists the Chief Engineer with the inert gas plant at working level." }],
        iMonitor: [{ en: "The same systems at working level." }],
        iReport: [{ en: "Status to the Chief Engineer." }],
        iDoNotAuthorize: [{ en: "The same boundary as the Chief Engineer." }],
      },
      third_engineer: {
        iExecute: [{ en: "Maintains routine engine-room watch, supporting the Second Engineer." }],
        iMonitor: [{ en: "Routine engine-room parameters." }],
        iReport: [{ en: "Routine watch status to the Second Engineer/Chief Engineer." }],
        iDoNotAuthorize: [{ en: "Any cargo-operation or IGS-plant decision." }],
      },
    },
    responsibilityLevels: {
      master: "lead",
      chief_officer: "lead",
      oow: "perform",
      ab: "perform",
      chief_engineer: "support",
      second_engineer: "support",
      third_engineer: "observe",
    },

    exercises: [
      {
        type: "sequence_reordering",
        id: "seq_phase_order",
        targetRanks: ["deck_cadet", "ab", "oow"],
        prompt: { en: "Put the five phases of the oil tanker cargo loading operation in the correct order." },
        items: [
          { id: "pre_loading_preparation", label: { en: "Pre-Loading Preparation" } },
          { id: "manifold_connection_and_initial_loading", label: { en: "Manifold Connection and Initial Loading" } },
          { id: "continuous_loading_with_igs_and_ullage_monitoring", label: { en: "Continuous Loading with IGS and Ullage Monitoring" } },
          { id: "loading_complete_verification", label: { en: "Loading Complete: Verification" } },
          { id: "disconnection_and_departure_preparation", label: { en: "Disconnection and Departure Preparation" } },
        ],
        correctOrder: ["pre_loading_preparation", "manifold_connection_and_initial_loading", "continuous_loading_with_igs_and_ullage_monitoring", "loading_complete_verification", "disconnection_and_departure_preparation"],
      },
      {
        type: "error_identification",
        id: "err_skipped_monitoring",
        targetRanks: ["chief_officer", "ab", "oow"],
        scenario: { en: "The Chief Officer skips a scheduled ullage check to save time since loading seems to be going smoothly. The AB reports an inert gas system reading deviation immediately to the Chief Officer upon noticing it. Engine reports inert gas plant status as conditions change." },
        choices: [
          { id: "c1", label: { en: "Skipping a scheduled ullage check since loading seems to be going smoothly" }, isError: true, explanation: { en: "Violates the explicit rule that atmosphere and cargo-level monitoring is continuous, not conditional on how smoothly things appear to be going." } },
          { id: "c2", label: { en: "The AB reporting an inert gas system deviation immediately upon noticing it" }, isError: false, explanation: { en: "Correct." } },
          { id: "c3", label: { en: "Engine reporting inert gas plant status as conditions change" }, isError: false, explanation: { en: "Correct." } },
        ],
      },
      {
        type: "readiness_checklist",
        id: "preloading_readiness_snapshot",
        targetRanks: ["chief_officer", "master"],
        scenario: { en: "The deck team is briefed and the terminal reports ready. Review the readiness snapshot below before authorizing loading to begin." },
        items: [
          { id: "terminal_berth_readiness", label: { en: "Manifold and berth readiness confirmed with the terminal" }, isSatisfied: true },
          { id: "igs_checked", label: { en: "Inert gas system checked, tank atmosphere confirmed within safe limits" }, isSatisfied: true },
          { id: "static_electricity_briefed", label: { en: "Static electricity precautions briefed to the deck team" }, isSatisfied: true },
          { id: "engine_igs_plant_readiness", label: { en: "Engine confirms inert gas plant readiness" }, isSatisfied: false },
          { id: "ballast_plan_reviewed", label: { en: "Ballast plan reviewed and confirmed" }, isSatisfied: false },
        ],
      },
    ],

    practicalScenarios: [
      {
        situation: { en: "Loading is running smoothly and ahead of schedule; there's a temptation to skip or space out ullage checks since everything seems fine." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer maintains the full monitoring schedule regardless of how smoothly things appear to be going." }],
        why: [{ en: "Tests whether continuous monitoring holds when there's no apparent problem yet." }],
        commonMistakes: [{ en: "Reducing monitoring frequency because nothing has gone wrong so far." }],
        safetyPoints: [{ en: "Monitoring exists precisely to catch a problem before it's visible — skipping it because things look fine defeats the purpose." }],
      },
      {
        situation: { en: "A minor task unrelated to cargo operations seems like it could be done quickly during active loading, technically outside the precise precaution zone." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "Static electricity precautions are maintained strictly for the full duration of loading, without exceptions for tasks that seem minor or unrelated." }],
        why: [{ en: "Tests whether the precaution discipline holds for something that doesn't feel directly related to cargo handling." }],
        commonMistakes: [{ en: "Making an exception for a task that seems unrelated or low-risk." }],
        safetyPoints: [{ en: "The explosive atmosphere risk doesn't care whether the ignition source was cargo-related or not." }],
      },
      {
        situation: { en: "The AB, using their absorbed Pumpman expertise, notices something suggesting a faster loading rate would still be safe, and considers adjusting the pump rate directly." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The AB reports the observation to the Chief Officer rather than adjusting the rate independently." }],
        why: [{ en: "Tests whether the deliberately-not-elevated AB level holds in a concrete moment — skilled execution doesn't come with independent decision authority here, unlike LNG's Second Engineer." }],
        commonMistakes: [{ en: "Adjusting the rate independently given genuine technical confidence." }],
        safetyPoints: [{ en: "Skilled execution and decision authority are two different things — this operation's own responsibility structure established that boundary explicitly." }],
      },
      {
        situation: { en: "Loading appears complete based on pump behavior, but final ullage confirmation hasn't yet been formally taken." },
        mission: { en: "Determine the correct response." },
        expectedActions: [{ en: "The Chief Officer confirms loading complete from the actual final ullage/quantity measurement, not from pump behavior alone." }],
        why: [{ en: "Operationalizes the explicit-confirmation-not-assumed principle, adapted to this operation's own signature measurement." }],
        commonMistakes: [{ en: "Treating apparent pump behavior as sufficient confirmation without taking the final measurement." }],
        safetyPoints: [{ en: "Confirmed completion depends on the actual measurement, not an inference from how the process looked." }],
      },
    ],

    interactiveScenarios: [
      {
        id: "scenario_1_skilled_execution_bounded_authority",
        title: { en: "Confident Judgment, Not Independent Authority" },
        seatRankId: "ab",
        root: {
          id: "level_1",
          situation: { en: "You are the AB, operating the cargo pumps under the Chief Officer's direction. Your absorbed Pumpman training lets you read the pump and ullage trends clearly, and you notice the loading rate could safely go faster than currently instructed." },
          options: [
            {
              id: "a_increase_unilaterally",
              label: { en: "Increase the pump rate yourself, since your technical read is confident and this is your area of skill." },
              consequence: { en: "The rate changes without the Chief Officer's knowledge." },
              feedback: { en: "Skilled execution and rate/sequencing authority are two different things — your confidence in the read doesn't extend to deciding the rate independently." },
              next: {
                id: "level_2_a",
                situation: { en: "The inert gas system readings shift as a result — faster loading affects vapor displacement — in a way the Chief Officer wasn't tracking for a rate they didn't know had changed." },
                options: [
                  { id: "a1", label: { en: "Continue at the faster rate, since it still seems fine." }, consequence: { en: "The Chief Officer keeps monitoring against a rate that no longer matches what's actually happening." }, feedback: { en: "Compounds the original problem — the Chief Officer's whole monitoring picture is now built on wrong information." } },
                  { id: "a2", label: { en: "Immediately report the change and revert to the instructed rate." }, consequence: { en: "The Chief Officer's monitoring picture is corrected." }, feedback: { en: "Correct — disclosing and reverting is what lets the Chief Officer's oversight actually mean something again." }, isRecommended: true },
                  { id: "a3", label: { en: "Quietly revert to the instructed rate without mentioning any of it." }, consequence: { en: "The rate is correct again, but the IGS deviation the Chief Officer noticed is never explained." }, feedback: { en: "Leaves the Chief Officer without the context to understand what actually happened to the readings." } },
                ],
              },
            },
            {
              id: "b_report_and_wait",
              label: { en: "Report the observation to the Chief Officer and wait for their decision." },
              consequence: { en: "The Chief Officer now has your technical read to inform the rate decision." },
              feedback: { en: "Correct — your skilled observation is valuable input; the rate decision itself still belongs to the Chief Officer." },
              isRecommended: true,
              next: {
                id: "level_2_b",
                situation: { en: "Informed, the Chief Officer decides to increase the rate based on your input, and explicitly directs the new rate." },
                options: [
                  { id: "b1", label: { en: "Proceed at the newly directed rate." }, consequence: { en: "The rate changes with the Chief Officer's explicit direction and knowledge." }, feedback: { en: "Correct — this is exactly what reporting first was for." }, isRecommended: true },
                  { id: "b2", label: { en: "Still hesitate to increase, second-guessing the explicit direction just given." }, consequence: { en: "The correction is delayed by unnecessary hesitation." }, feedback: { en: "The direction just given is real — hesitating past that point adds friction without adding safety." } },
                  { id: "b3", label: { en: "Increase the rate, but push it further than what was actually directed, given your continued confidence." }, consequence: { en: "The rate now exceeds what the Chief Officer actually authorized." }, feedback: { en: "Oversteps the explicit direction given — confidence doesn't extend the authorization beyond what was actually granted." } },
                ],
              },
            },
            {
              id: "c_increase_and_mention_later",
              label: { en: "Increase the rate slightly, planning to mention it to the Chief Officer afterward if asked." },
              consequence: { en: "The rate changes quietly, with disclosure deferred to a later, uncertain moment." },
              feedback: { en: "Planning to explain only if asked isn't the same as reporting — it leaves the decision about whether this matters entirely up to chance." },
              next: {
                id: "level_2_c",
                situation: { en: "Before you've mentioned anything, the Chief Officer notices the rate is different than instructed during a routine check and asks about it." },
                options: [
                  { id: "c1", label: { en: "Downplay it, framing it as basically the same as what was instructed." }, consequence: { en: "The Chief Officer is given an inaccurate picture of what actually happened." }, feedback: { en: "Minimizing what happened compounds the original lack of disclosure with an inaccurate account." } },
                  { id: "c2", label: { en: "Explain fully and honestly what was done and why, now that it's been noticed." }, consequence: { en: "The Chief Officer gets an accurate account, later than it should have come." }, feedback: { en: "Correct, though disclosing only once asked is still later than the moment actually called for." }, isRecommended: true },
                  { id: "c3", label: { en: "Describe it as a small necessary correction rather than acknowledging it was an independent judgment call." }, consequence: { en: "The Chief Officer doesn't get an accurate picture of what actually happened or why." }, feedback: { en: "Reframing an independent decision as a minor correction misrepresents what actually occurred." } },
                ],
              },
            },
          ],
        },
      },
    ],

    bestPracticesRecap: [
      {
        theme: { en: "Continuous Monitoring, Regardless of How Smoothly Things Look" },
        bestPractices: [
          { en: "Inert gas system and ullage monitoring continue on schedule regardless of how smoothly the loading appears to be going." },
        ],
        commonErrors: [
          { en: "Reducing monitoring frequency because nothing has gone wrong so far." },
        ],
      },
      {
        theme: { en: "Static Electricity Precautions Hold for Everything" },
        bestPractices: [
          { en: "Static electricity precautions apply for the full duration of loading, without exceptions for tasks that seem minor or unrelated to cargo handling." },
        ],
        commonErrors: [
          { en: "Making an exception for a task that seems low-risk or unrelated to the cargo itself." },
        ],
      },
      {
        theme: { en: "Skilled Execution, Not Independent Authority" },
        bestPractices: [
          { en: "A skilled technical observation is reported to the Chief Officer; the rate or sequencing decision itself stays with the Chief Officer." },
          { en: "Once explicitly directed, the AB proceeds exactly at the rate given — not beyond it, whatever the underlying confidence." },
        ],
        commonErrors: [
          { en: "Acting on a confident technical read without reporting it first." },
          { en: "Exceeding an explicit direction because of continued personal confidence in the judgment." },
        ],
      },
      {
        theme: { en: "Proactive Disclosure, Not Disclosure-If-Asked" },
        bestPractices: [
          { en: "An independent judgment call is disclosed proactively, not held back until someone happens to notice and ask." },
        ],
        commonErrors: [
          { en: "Planning to explain an independent action only if it's noticed, rather than reporting it at the time." },
          { en: "Downplaying or reframing an independent decision once it's been noticed, rather than describing it accurately." },
        ],
      },
      {
        theme: { en: "Explicit Confirmation, Not Inferred From Appearance" },
        bestPractices: [
          { en: "Loading completion is confirmed from the actual final ullage/quantity measurement, not inferred from pump behavior." },
        ],
        commonErrors: [
          { en: "Treating apparent pump behavior as sufficient confirmation without taking the final measurement." },
        ],
      },
      {
        theme: { en: "Engine's Dependency Role" },
        bestPractices: [
          { en: "The inert gas plant's readiness is actively confirmed and monitored by Engine throughout, not assumed to simply be available." },
        ],
        commonErrors: [
          { en: "Assuming inert gas plant readiness without it being actively confirmed and maintained." },
        ],
      },
    ],
  },
};

export function getSpecializedOperation(id: SpecializedOperationId): SpecializedOperation | undefined {
  return SPECIALIZED_OPERATION_REGISTRY[id];
}

export function getSpecializedOperationsByVesselType(vesselTypeId: VesselTypeId): SpecializedOperation[] {
  return Object.values(SPECIALIZED_OPERATION_REGISTRY).filter((op) => op.vesselTypeId === vesselTypeId);
}

// ── DEV-ONLY INTEGRITY CHECK ──────────────────────────────────────
// Each operation defines its own OperationPhaseId set rather than sharing a
// generic enum (see header note) — a deliberate tradeoff from the
// architecture audit: it means a typo in operationPhaseOrder or
// operationPhases isn't a compile error, only a silently-missing or
// silently-unreachable phase at render time. This warns loudly in dev
// instead, without affecting production behavior.
function checkOperationPhaseIntegrity(op: SpecializedOperation): string[] {
  const problems: string[] = [];
  const phaseKeys = new Set(Object.keys(op.operationPhases));
  const flatIds = op.operationPhaseOrder.flat();
  const orderedIds = new Set(flatIds);
  for (const id of flatIds) {
    if (!phaseKeys.has(id)) problems.push(`operationPhaseOrder references "${id}", which has no entry in operationPhases.`);
  }
  for (const key of phaseKeys) {
    if (!orderedIds.has(key)) problems.push(`operationPhases has "${key}", which is missing from operationPhaseOrder (it will never render).`);
  }
  return problems;
}

if (import.meta.env?.DEV) {
  for (const op of Object.values(SPECIALIZED_OPERATION_REGISTRY)) {
    const problems = checkOperationPhaseIntegrity(op);
    if (problems.length) {
      console.warn(`[specializedOperationRegistry] "${op.operationId}" has phase-order/phase-key mismatches:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
    }
  }
}
