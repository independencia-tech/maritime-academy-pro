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
export type CommunicationParty =
  | "deck" | "engine" | "bridge" | "installation" | "deck_team" | "assisted_vessel";

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
