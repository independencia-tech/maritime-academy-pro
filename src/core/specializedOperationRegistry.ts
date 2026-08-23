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
export type ExerciseType = "sequence_reordering" | "error_identification" | "pre_operation_check";

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
  /** Item ids in correct order. */
  correctOrder: string[];
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

export interface PreOperationCheckItem {
  id: string;
  label: LocalizedText;
  /** Whether this readiness item is already satisfied in the given scenario snapshot. */
  isSatisfied: boolean;
}

export interface PreOperationCheckExercise {
  type: "pre_operation_check";
  id: string;
  targetRanks: RankId[];
  scenario: LocalizedText;
  items: PreOperationCheckItem[];
}

export type SpecializedExercise =
  | SequenceReorderingExercise
  | ErrorIdentificationExercise
  | PreOperationCheckExercise;

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

  operationPhaseOrder: OperationPhaseId[];
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
        type: "pre_operation_check",
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
  const orderedIds = new Set(op.operationPhaseOrder);
  for (const id of op.operationPhaseOrder) {
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
