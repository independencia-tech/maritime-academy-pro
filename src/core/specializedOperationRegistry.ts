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
export type CommunicationParty =
  | "deck" | "engine" | "bridge" | "installation" | "deck_team";

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
