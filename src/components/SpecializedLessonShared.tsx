// ── SpecializedLessonShared.tsx ──────────────────────────────────
// Shared rendering/interaction engine for MAP's Specialized Operations
// content, built directly from the AHTS Anchor Handling & Rig Mooring
// prototype (see specializedOperationRegistry.ts) rather than an abstract
// template. Typed (no @ts-nocheck) per the architecture audit decision —
// this component carries real interaction state (exercise answers,
// branching scenario progress), unlike the static Ships Library cards
// (Ahts.tsx / Psv.tsx) that precedent was drawn from for visual style only.
//
// Self-contained: owns its own exercise/scenario state and exposes an
// optional onComplete callback, the same shape QuestionBank already uses in
// LessonShared.tsx. Not wired into MaritimeApp.tsx/Dashboard.tsx/progression
// yet — that integration is a later step.

import { useEffect, useMemo, useState } from "react";
import { C, Card, SL, GLine, T } from "./LessonShared";
import {
  resolveLocalizedText,
  type SupportedLanguage,
  type LocalizedText,
} from "@/core/roleOnBoardRegistry";
import { getRankMeta, type RankId } from "@/core/rankRegistry";
import type {
  SpecializedOperation,
  OperationPhase,
  OperationPhaseOrderEntry,
  CommunicationTouchpoint,
  CommunicationParty,
  RoleOnVesselEntry,
  ResponsibilityLevel,
  SpecializedExercise,
  SequenceReorderingExercise,
  ErrorIdentificationExercise,
  ReadinessChecklistExercise,
  InteractiveScenario,
  ScenarioDecisionNode,
} from "@/core/specializedOperationRegistry";
import { getSpecializedOperationsByVesselType } from "@/core/specializedOperationRegistry";
import type { VesselTypeId } from "@/core/vesselTypeRegistry";
import {
  optionQuality,
  scoreExercise,
  scoreOperation,
  type OperationScore,
  type ExerciseResult,
  type OptionQuality,
} from "@/core/specialtyExamEngine";
import {
  recordSpecialtyAttempt,
  getShipOperationScores,
  type SpecialtyItemRecord,
} from "@/core/specialtyExamPersistence";
import { getLatestExamAttempt, canAttemptExam, EXAM_COOLDOWN_DAYS } from "@/core/examEngine";
import { supabase } from "@/integrations/supabase/client";

// ── i18n helper ───────────────────────────────────────────────────
function tx(text: LocalizedText | undefined, lang: SupportedLanguage): string {
  return resolveLocalizedText(text, lang) ?? "";
}

// Fixed UI chrome (button labels, section titles) — required-all-4-languages
// convention, same as T in LessonShared.tsx and NAV_T in MaritimeApp.tsx.
// Distinct from the editorial CONTENT in specializedOperationRegistry.ts,
// which is English-first per doctrine and uses LocalizedText's partial
// fallback-to-en instead.
const UI = {
  en: {
    badge: "Specialized Operations", illustrationPlanned: "Illustration planned for this step",
    objectives: "Objectives", context: "Context",
    walkthrough: "Operation Walkthrough", communication: "Operational Communication",
    roleOnVessel: "Role on this Vessel", responsibilities: "Responsibilities by Rank",
    exercises: "Advanced Exercises", scenarios: "Practical Cases", interactive: "Interactive Scenario",
    recap: "Best Practices & Common Errors",
    iExecute: "I execute", iMonitor: "I monitor", iReport: "I report", iDoNotAuthorize: "I do not authorize",
    bestPractices: "Best practices", commonErrors: "Common errors", commonMistakes: "Common mistakes",
    situation: "Situation", mission: "Mission", expectedActions: "Expected actions", why: "Why it matters",
    safetyPoints: "Safety points",
    checkOrder: "Check order", moveUp: "Move up", moveDown: "Move down", correct: "Correct order",
    incorrect: "Not quite — try again",
    checkAnswers: "Check answers", checkReadiness: "Check readiness",
    continueBtn: "Continue", finishScenario: "Finish scenario", restartScenario: "Restart scenario",
    scenarioComplete: "Scenario complete", scenarioSeat: "Seat",
    markOutstanding: "Mark the items that are still outstanding", outstanding: "Outstanding", satisfied: "Satisfied",
    concurrentPhases: "Happens at the same time", requiresSupervision: "Supervised only",
    levelLead: "Lead", levelPerform: "Perform", levelSupervised: "Supervised", levelSupport: "Support", levelObserve: "Observe",
  },
  fr: {
    badge: "Opérations Spécialisées", illustrationPlanned: "Illustration prévue pour cette étape",
    objectives: "Objectifs", context: "Contexte",
    walkthrough: "Déroulement de l'opération", communication: "Communication opérationnelle",
    roleOnVessel: "Rôle à bord de ce navire", responsibilities: "Responsabilités par rang",
    exercises: "Exercices avancés", scenarios: "Cas pratiques", interactive: "Scénario interactif",
    recap: "Bonnes pratiques et erreurs courantes",
    iExecute: "J'exécute", iMonitor: "Je surveille", iReport: "Je rapporte", iDoNotAuthorize: "Je n'autorise pas",
    bestPractices: "Bonnes pratiques", commonErrors: "Erreurs courantes", commonMistakes: "Erreurs courantes",
    situation: "Situation", mission: "Mission", expectedActions: "Actions attendues", why: "Pourquoi c'est important",
    safetyPoints: "Points de sécurité",
    checkOrder: "Vérifier l'ordre", moveUp: "Monter", moveDown: "Descendre", correct: "Ordre correct",
    incorrect: "Pas tout à fait — réessaie",
    checkAnswers: "Vérifier les réponses", checkReadiness: "Vérifier la préparation",
    continueBtn: "Continuer", finishScenario: "Terminer le scénario", restartScenario: "Recommencer le scénario",
    scenarioComplete: "Scénario terminé", scenarioSeat: "Poste",
    markOutstanding: "Coche les points qui restent à régler", outstanding: "À régler", satisfied: "Acquis",
    concurrentPhases: "Se déroule en même temps", requiresSupervision: "Sous supervision uniquement",
    levelLead: "Responsable", levelPerform: "Exécute", levelSupervised: "Sous supervision", levelSupport: "Soutien", levelObserve: "Observateur",
  },
  es: {
    badge: "Operaciones Especializadas", illustrationPlanned: "Ilustración prevista para este paso",
    objectives: "Objetivos", context: "Contexto",
    walkthrough: "Desarrollo de la operación", communication: "Comunicación operativa",
    roleOnVessel: "Rol a bordo de este buque", responsibilities: "Responsabilidades por rango",
    exercises: "Ejercicios avanzados", scenarios: "Casos prácticos", interactive: "Escenario interactivo",
    recap: "Buenas prácticas y errores comunes",
    iExecute: "Yo ejecuto", iMonitor: "Yo superviso", iReport: "Yo informo", iDoNotAuthorize: "Yo no autorizo",
    bestPractices: "Buenas prácticas", commonErrors: "Errores comunes", commonMistakes: "Errores comunes",
    situation: "Situación", mission: "Misión", expectedActions: "Acciones esperadas", why: "Por qué es importante",
    safetyPoints: "Puntos de seguridad",
    checkOrder: "Comprobar el orden", moveUp: "Subir", moveDown: "Bajar", correct: "Orden correcto",
    incorrect: "No del todo — inténtalo de nuevo",
    checkAnswers: "Comprobar respuestas", checkReadiness: "Comprobar preparación",
    continueBtn: "Continuar", finishScenario: "Terminar escenario", restartScenario: "Reiniciar escenario",
    scenarioComplete: "Escenario completado", scenarioSeat: "Puesto",
    markOutstanding: "Marca los puntos que aún están pendientes", outstanding: "Pendiente", satisfied: "Cumplido",
    concurrentPhases: "Ocurre al mismo tiempo", requiresSupervision: "Solo bajo supervisión",
    levelLead: "Responsable", levelPerform: "Ejecuta", levelSupervised: "Bajo supervisión", levelSupport: "Apoyo", levelObserve: "Observador",
  },
  pt: {
    badge: "Operações Especializadas", illustrationPlanned: "Ilustração planeada para esta etapa",
    objectives: "Objetivos", context: "Contexto",
    walkthrough: "Desenvolvimento da operação", communication: "Comunicação operacional",
    roleOnVessel: "Função a bordo deste navio", responsibilities: "Responsabilidades por posto",
    exercises: "Exercícios avançados", scenarios: "Casos práticos", interactive: "Cenário interativo",
    recap: "Boas práticas e erros comuns",
    iExecute: "Eu executo", iMonitor: "Eu monitorizo", iReport: "Eu reporto", iDoNotAuthorize: "Eu não autorizo",
    bestPractices: "Boas práticas", commonErrors: "Erros comuns", commonMistakes: "Erros comuns",
    situation: "Situação", mission: "Missão", expectedActions: "Ações esperadas", why: "Por que é importante",
    safetyPoints: "Pontos de segurança",
    checkOrder: "Verificar a ordem", moveUp: "Subir", moveDown: "Descer", correct: "Ordem correta",
    incorrect: "Não é bem isso — tenta novamente",
    checkAnswers: "Verificar respostas", checkReadiness: "Verificar prontidão",
    continueBtn: "Continuar", finishScenario: "Terminar cenário", restartScenario: "Reiniciar cenário",
    scenarioComplete: "Cenário concluído", scenarioSeat: "Posto",
    markOutstanding: "Assinala os pontos que ainda estão pendentes", outstanding: "Pendente", satisfied: "Cumprido",
    concurrentPhases: "Acontece ao mesmo tempo", requiresSupervision: "Apenas sob supervisão",
    levelLead: "Responsável", levelPerform: "Executa", levelSupervised: "Sob supervisão", levelSupport: "Apoio", levelObserve: "Observador",
  },
} as const;

function ui(key: keyof typeof UI.en, lang: SupportedLanguage): string {
  return UI[lang][key];
}

// Communication-party labels — same fixed-UI-chrome convention as UI above.
const PARTY_LABEL: Record<SupportedLanguage, Record<CommunicationParty, string>> = {
  en: { deck: "Deck", engine: "Engine", bridge: "Bridge", installation: "Installation", deck_team: "Deck Team", assisted_vessel: "Assisted Vessel", transferee: "Transferee", terminal: "Terminal", shore_fire_brigade: "Shore Fire Brigade", shore_authorities: "Shore Authorities", process_control: "Process Control", science_team: "Science Team", warranty_surveyor: "Marine Warranty Surveyor", passenger_services: "Passenger Services", guest_services: "Guest Services", shore_base: "Shore Base" },
  fr: { deck: "Pont", engine: "Machine", bridge: "Passerelle", installation: "Installation", deck_team: "Équipe de pont", assisted_vessel: "Navire assisté", transferee: "Personne transférée", terminal: "Terminal", shore_fire_brigade: "Pompiers portuaires", shore_authorities: "Autorités à terre", process_control: "Salle de contrôle Process", science_team: "Équipe scientifique", warranty_surveyor: "Expert maritime indépendant", passenger_services: "Service Passagers", guest_services: "Service Invités", shore_base: "Base à terre" },
  es: { deck: "Cubierta", engine: "Máquinas", bridge: "Puente de mando", installation: "Instalación", deck_team: "Equipo de cubierta", assisted_vessel: "Buque asistido", transferee: "Persona transferida", terminal: "Terminal", shore_fire_brigade: "Bomberos portuarios", shore_authorities: "Autoridades en tierra", process_control: "Sala de control de Proceso", science_team: "Equipo científico", warranty_surveyor: "Perito marítimo independiente", passenger_services: "Servicio de Pasajeros", guest_services: "Servicio de Invitados", shore_base: "Base en tierra" },
  pt: { deck: "Convés", engine: "Máquinas", bridge: "Ponte de comando", installation: "Instalação", deck_team: "Equipa de convés", assisted_vessel: "Navio assistido", transferee: "Pessoa transferida", terminal: "Terminal", shore_fire_brigade: "Bombeiros portuários", shore_authorities: "Autoridades em terra", process_control: "Sala de controlo de Processo", science_team: "Equipa científica", warranty_surveyor: "Perito marítimo independente", passenger_services: "Serviço de Passageiros", guest_services: "Serviço de Convidados", shore_base: "Base em terra" },
};

function partyLabel(party: CommunicationParty, lang: SupportedLanguage): string {
  return PARTY_LABEL[lang][party] ?? party;
}

// Rank display label — reuses rankRegistry.ts's own localized label via
// getRankMeta/resolveLocalizedText, the same pattern RoleOnBoardShared.tsx
// already uses, instead of formatting the raw rankId.
function rankLabel(rankId: RankId, lang: SupportedLanguage): string {
  const meta = getRankMeta(rankId);
  return (meta ? resolveLocalizedText(meta.label, lang) : undefined) ?? rankId.replace(/_/g, " ");
}

const RESPONSIBILITY_LEVEL_KEY: Record<ResponsibilityLevel, keyof typeof UI.en> = {
  lead: "levelLead", perform: "levelPerform", supervised: "levelSupervised", support: "levelSupport", observe: "levelObserve",
};
const RESPONSIBILITY_LEVEL_COLOR: Record<ResponsibilityLevel, string> = {
  lead: C.gold, perform: C.blue2, supervised: C.orange, support: C.teal, observe: "rgba(240,244,255,0.5)",
};

// Compares a flat, learner-produced order against a correctOrder that may
// contain concurrent groups (see OperationPhaseOrderEntry's header note) —
// a group slot accepts any permutation of its ids at that position.
function matchesCorrectOrder(order: string[], correctOrder: (string | string[])[]): boolean {
  let pos = 0;
  for (const slot of correctOrder) {
    if (Array.isArray(slot)) {
      const chunk = order.slice(pos, pos + slot.length);
      const chunkSet = new Set(chunk);
      if (chunkSet.size !== slot.length || !slot.every((id) => chunkSet.has(id))) return false;
      pos += slot.length;
    } else {
      if (order[pos] !== slot) return false;
      pos += 1;
    }
  }
  return pos === order.length;
}

// ── shared primitives ─────────────────────────────────────────────
function Prose({ children }: { children: string }) {
  if (!children) return null;
  return <div style={{ fontSize: 13, color: "rgba(240,244,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{children}</div>;
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13, color: "rgba(240,244,255,0.82)", lineHeight: 1.75 }}>
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

function SubLabel({ text, color }: { text: string; color?: string }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: color || C.blue2, margin: "10px 0 4px" }}>{text}</div>;
}

// ── Part 1 — intro / objectives / context ─────────────────────────
function IntroSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const L = ui, t = (x: LocalizedText | undefined) => tx(x, lang);
  return (
    <>
      <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.gold}` }}>
        <Prose>{t(op.introduction)}</Prose>
      </Card>
      <SL icon="🎯" text={L("objectives", lang)} color={C.blue2} />
      <Card style={{ marginBottom: 14 }}>
        <BulletList items={op.objectives.map(t)} />
      </Card>
      <SL icon="🧭" text={L("context", lang)} color={C.teal} />
      <Card style={{ marginBottom: 14 }}>
        <Prose>{t(op.context)}</Prose>
      </Card>
    </>
  );
}

// ── Part 2 — operation walkthrough ────────────────────────────────
function PhaseCard({ phase, lang }: { phase: OperationPhase; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const illustrationLabel = ui("illustrationPlanned", lang);
  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4 }}>{t(phase.title)}</div>
      {phase.overview ? <Prose>{t(phase.overview)}</Prose> : null}
      {phase.steps?.length ? <ol style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13, color: "rgba(240,244,255,0.85)", lineHeight: 1.75 }}>
        {phase.steps.map((s, i) => <li key={i}>{t(s)}</li>)}
      </ol> : null}
      {phase.bestPractices?.length ? <>
        <SubLabel text="✓" color={C.green} />
        <BulletList items={phase.bestPractices.map(t)} />
      </> : null}
      {phase.commonMistakes?.length ? <>
        <SubLabel text="⚠" color={C.red} />
        <BulletList items={phase.commonMistakes.map(t)} />
      </> : null}
      {phase.hasIllustrationPlaceholder ? (
        <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, border: `1px dashed ${C.border}`, fontSize: 11, color: "rgba(240,244,255,0.5)" }}>
          🖼 {illustrationLabel}
        </div>
      ) : null}
    </Card>
  );
}

// A concurrentGroup entry (array of phase ids) renders those phases
// together in a labeled group instead of as separate numbered-feeling
// cards — see OperationPhaseOrderEntry's header note in
// specializedOperationRegistry.ts (architecture audit round 3, finding 1).
function WalkthroughSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const concurrentLabel = ui("concurrentPhases", lang);
  return (
    <>
      {op.operationPhaseOrder.map((entry: OperationPhaseOrderEntry, i) => {
        if (Array.isArray(entry)) {
          const phases = entry.map((id) => op.operationPhases[id]).filter((p): p is OperationPhase => Boolean(p));
          if (!phases.length) return null;
          return (
            <div key={`group-${i}`} style={{ marginBottom: 10, padding: 10, borderRadius: 14, border: `1px dashed ${C.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "rgba(240,244,255,0.55)", textTransform: "uppercase", marginBottom: 8 }}>
                {concurrentLabel}
              </div>
              {phases.map((phase) => <PhaseCard key={phase.id} phase={phase} lang={lang} />)}
            </div>
          );
        }
        const phase = op.operationPhases[entry];
        return phase ? <PhaseCard key={entry} phase={phase} lang={lang} /> : null;
      })}
    </>
  );
}

// ── Part 3 — communication ────────────────────────────────────────
function CommTouchpointCard({ tp, lang }: { tp: CommunicationTouchpoint; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4 }}>
        {partyLabel(tp.from, lang)} → {partyLabel(tp.to, lang)}
      </div>
      <div style={{ fontSize: 11, color: "rgba(240,244,255,0.55)", marginBottom: 4 }}>{t(tp.trigger)}</div>
      <Prose>{t(tp.content)}</Prose>
      <div style={{ marginTop: 6, fontSize: 12, color: "rgba(240,244,255,0.65)", fontStyle: "italic" }}>{t(tp.whyItMatters)}</div>
    </Card>
  );
}

function CommunicationSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  if (!op.communicationTouchpoints?.length) return null;
  return <>{op.communicationTouchpoints.map((tp) => <CommTouchpointCard key={tp.id} tp={tp} lang={lang} />)}</>;
}

// ── Role on this Vessel ────────────────────────────────────────────
function RoleOnVesselSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  if (!op.roleOnVessel?.length) return null;
  return (
    <>
      {op.roleOnVessel.map((entry: RoleOnVesselEntry) => (
        <Card key={entry.rankId} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{rankLabel(entry.rankId, lang)}</div>
          <Prose>{t(entry.identity)}</Prose>
        </Card>
      ))}
    </>
  );
}

// ── Responsibilities by rank ──────────────────────────────────────
function ResponsibilityMatrixSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  if (!op.responsibilityMatrix) return null;
  const entries = Object.entries(op.responsibilityMatrix) as [RankId, NonNullable<SpecializedOperation["responsibilityMatrix"]>[RankId]][];
  return (
    <>
      {entries.map(([rankId, m]) => {
        const supervision = op.supervisionRequirements?.[rankId];
        const level = op.responsibilityLevels?.[rankId];
        return m ? (
        <Card key={rankId} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: 1 }}>{rankLabel(rankId, lang)}</div>
            {level && (
              <div style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 8, background: `${RESPONSIBILITY_LEVEL_COLOR[level]}22`, fontSize: 10, color: RESPONSIBILITY_LEVEL_COLOR[level], fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {ui(RESPONSIBILITY_LEVEL_KEY[level], lang)}
              </div>
            )}
            {supervision?.requiresDirectSupervision && (
              <div style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 8, background: "rgba(230,126,34,0.15)", fontSize: 10, color: C.orange, fontWeight: 700 }}>
                🔒 {ui("requiresSupervision", lang)}
                {supervision.supervisedBy?.length ? ` — ${supervision.supervisedBy.map((r) => rankLabel(r, lang)).join(", ")}` : ""}
              </div>
            )}
          </div>
          {m.iExecute?.length ? <><SubLabel text={ui("iExecute", lang)} color={C.blue2} /><BulletList items={m.iExecute.map(t)} /></> : null}
          {m.iMonitor?.length ? <><SubLabel text={ui("iMonitor", lang)} color={C.teal} /><BulletList items={m.iMonitor.map(t)} /></> : null}
          {m.iReport?.length ? <><SubLabel text={ui("iReport", lang)} color={C.orange} /><BulletList items={m.iReport.map(t)} /></> : null}
          {m.iDoNotAuthorize?.length ? <><SubLabel text={ui("iDoNotAuthorize", lang)} color={C.red} /><BulletList items={m.iDoNotAuthorize.map(t)} /></> : null}
        </Card>
        ) : null;
      })}
    </>
  );
}

// ── Exercises ──────────────────────────────────────────────────────
function SequenceReorderingCard({ ex, lang, onAttempt }: { ex: SequenceReorderingExercise; lang: SupportedLanguage; onAttempt: () => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [order, setOrder] = useState<string[]>(() => {
    const ids = ex.items.map((i) => i.id);
    // deterministic shuffle (reverse) so it starts out-of-order without randomness (Math.random avoided for reproducibility)
    return [...ids].reverse();
  });
  const [checked, setChecked] = useState<null | boolean>(null);
  const labelOf = (id: string) => t(ex.items.find((i) => i.id === id)?.label);

  function move(idx: number, dir: -1 | 1) {
    const next = [...order];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    setOrder(next);
    setChecked(null);
  }

  function check() {
    setChecked(matchesCorrectOrder(order, ex.correctOrder));
    onAttempt();
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.prompt)}</Prose>
      <div style={{ marginTop: 8 }}>
        {order.map((id, i) => (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 4, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 12, color: "rgba(240,244,255,0.5)", width: 16 }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13 }}>{labelOf(id)}</span>
            <button onClick={() => move(i, -1)} style={{ background: "none", border: "none", color: C.blue2, cursor: "pointer" }}>▲</button>
            <button onClick={() => move(i, 1)} style={{ background: "none", border: "none", color: C.blue2, cursor: "pointer" }}>▼</button>
          </div>
        ))}
      </div>
      <button onClick={check} style={{ marginTop: 8, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
        {ui("checkOrder", lang)}
      </button>
      {checked !== null && (
        <div style={{ marginTop: 8, fontSize: 13, color: checked ? C.green : C.red }}>
          {checked ? ui("correct", lang) : ui("incorrect", lang)}
        </div>
      )}
    </Card>
  );
}

function ErrorIdentificationCard({ ex, lang, onAttempt }: { ex: ErrorIdentificationExercise; lang: SupportedLanguage; onAttempt: () => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  }

  function check() {
    setRevealed(true);
    onAttempt();
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.scenario)}</Prose>
      <div style={{ marginTop: 8 }}>
        {ex.choices.map((c) => {
          const isSelected = selected.has(c.id);
          const showResult = revealed;
          const correctness = showResult ? (c.isError === isSelected ? C.green : C.red) : undefined;
          return (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              padding: "8px 10px", marginBottom: 6, borderRadius: 8, cursor: revealed ? "default" : "pointer",
              background: isSelected ? "rgba(26,111,212,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${correctness || (isSelected ? C.blue2 : "transparent")}`,
            }}>
              <div style={{ fontSize: 13 }}>{t(c.label)}</div>
              {showResult && <div style={{ fontSize: 12, marginTop: 4, color: "rgba(240,244,255,0.65)" }}>{t(c.explanation)}</div>}
            </div>
          );
        })}
      </div>
      {!revealed && (
        <button onClick={check} style={{ marginTop: 4, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
          {ui("checkAnswers", lang)}
        </button>
      )}
    </Card>
  );
}

// Framing matches the specification's intent (identify what's still
// OUTSTANDING before the operation may proceed), not "confirm what's
// ready" — checking a box here means "I flag this as not yet satisfied."
// Mathematically equivalent scoring either way, but the instruction and
// checkbox semantics now match what the learner is meant to practice:
// gap-detection, not completion-confirmation.
function ReadinessChecklistCard({ ex, lang, onAttempt }: { ex: ReadinessChecklistExercise; lang: SupportedLanguage; onAttempt: () => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    const next = new Set(flagged);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlagged(next);
  }

  function check() {
    setRevealed(true);
    onAttempt();
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.scenario)}</Prose>
      <div style={{ fontSize: 12, color: "rgba(240,244,255,0.6)", marginTop: 6, fontStyle: "italic" }}>{ui("markOutstanding", lang)}</div>
      <div style={{ marginTop: 8 }}>
        {ex.items.map((it) => {
          const userFlagsOutstanding = flagged.has(it.id);
          const correct = revealed ? userFlagsOutstanding === !it.isSatisfied : undefined;
          return (
            <div key={it.id} onClick={() => toggle(it.id)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginBottom: 6, borderRadius: 8,
              cursor: revealed ? "default" : "pointer",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${revealed ? (correct ? C.green : C.red) : (userFlagsOutstanding ? C.orange : "transparent")}`,
            }}>
              <span>{userFlagsOutstanding ? "☑" : "☐"}</span>
              <span style={{ fontSize: 13, flex: 1 }}>{t(it.label)}</span>
              {revealed && <span style={{ fontSize: 11, color: it.isSatisfied ? C.green : C.red }}>{it.isSatisfied ? ui("satisfied", lang) : ui("outstanding", lang)}</span>}
            </div>
          );
        })}
      </div>
      {!revealed && (
        <button onClick={check} style={{ marginTop: 4, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
          {ui("checkReadiness", lang)}
        </button>
      )}
    </Card>
  );
}

function ExercisesSection({ op, lang, onAttempt }: { op: SpecializedOperation; lang: SupportedLanguage; onAttempt: (type: SpecializedExercise["type"]) => void }) {
  if (!op.exercises?.length) return null;
  return (
    <>
      {op.exercises.map((ex) => {
        if (ex.type === "sequence_reordering") return <SequenceReorderingCard key={ex.id} ex={ex} lang={lang} onAttempt={() => onAttempt(ex.type)} />;
        if (ex.type === "error_identification") return <ErrorIdentificationCard key={ex.id} ex={ex} lang={lang} onAttempt={() => onAttempt(ex.type)} />;
        if (ex.type === "readiness_checklist") return <ReadinessChecklistCard key={ex.id} ex={ex} lang={lang} onAttempt={() => onAttempt(ex.type)} />;
        return null;
      })}
    </>
  );
}

// ── Practical Cases ────────────────────────────────────────────────
function PracticalScenariosSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  if (!op.practicalScenarios?.length) return null;
  return (
    <>
      {op.practicalScenarios.map((sc, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <SubLabel text={ui("situation", lang)} color={C.blue2} />
          <Prose>{t(sc.situation)}</Prose>
          <SubLabel text={ui("mission", lang)} color={C.gold} />
          <Prose>{t(sc.mission)}</Prose>
          {sc.expectedActions?.length ? <><SubLabel text={ui("expectedActions", lang)} color={C.teal} /><BulletList items={sc.expectedActions.map(t)} /></> : null}
          {sc.why?.length ? <><SubLabel text={ui("why", lang)} /><BulletList items={sc.why.map(t)} /></> : null}
          {sc.commonMistakes?.length ? <><SubLabel text={ui("commonMistakes", lang)} color={C.red} /><BulletList items={sc.commonMistakes.map(t)} /></> : null}
          {sc.safetyPoints?.length ? <><SubLabel text={ui("safetyPoints", lang)} color={C.orange} /><BulletList items={sc.safetyPoints.map(t)} /></> : null}
        </Card>
      ))}
    </>
  );
}

// ── Interactive Scenario ──────────────────────────────────────────
function InteractiveScenarioPlayer({ scenario, lang, onReachEnd }: { scenario: InteractiveScenario; lang: SupportedLanguage; onReachEnd: (scenarioId: string) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [node, setNode] = useState<ScenarioDecisionNode>(scenario.root);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);

  const chosenOption = useMemo(() => node.options.find((o) => o.id === chosenId) ?? null, [node, chosenId]);

  function choose(optionId: string) {
    setChosenId(optionId);
  }

  function advance() {
    if (!chosenOption) return;
    if (chosenOption.next) {
      setNode(chosenOption.next);
      setChosenId(null);
    } else {
      setEnded(true);
      onReachEnd(scenario.id);
    }
  }

  function restart() {
    setNode(scenario.root);
    setChosenId(null);
    setEnded(false);
  }

  return (
    <Card style={{ marginBottom: 12, border: `1px solid ${C.gold}44` }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 2 }}>{t(scenario.title)}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 8, marginBottom: 10, background: "rgba(201,146,42,0.12)", fontSize: 10, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
        👤 {ui("scenarioSeat", lang)}: {rankLabel(scenario.seatRankId, lang)}
      </div>
      {ended ? (
        <>
          <div style={{ fontSize: 13, color: C.green, marginBottom: 8 }}>✓ {ui("scenarioComplete", lang)}</div>
          <button onClick={restart} style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.08)", color: "#fff", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13 }}>
            {ui("restartScenario", lang)}
          </button>
        </>
      ) : (
        <>
          <Prose>{t(node.situation)}</Prose>
          {!chosenOption ? (
            <div style={{ marginTop: 10 }}>
              {node.options.map((o) => (
                <div key={o.id} onClick={() => choose(o.id)} style={{
                  padding: "10px 12px", marginBottom: 6, borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 13 }}>{t(o.label)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: chosenOption.isRecommended ? C.green : C.orange, marginBottom: 4 }}>
                  {t(chosenOption.consequence)}
                </div>
                <div style={{ fontSize: 13, color: "rgba(240,244,255,0.85)" }}>{t(chosenOption.feedback)}</div>
              </div>
              <button onClick={advance} style={{ padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
                {chosenOption.next ? ui("continueBtn", lang) : ui("finishScenario", lang)}
              </button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

function InteractiveScenarioSection({ op, lang, onReachEnd }: { op: SpecializedOperation; lang: SupportedLanguage; onReachEnd: (scenarioId: string) => void }) {
  if (!op.interactiveScenarios?.length) return null;
  return <>{op.interactiveScenarios.map((sc) => <InteractiveScenarioPlayer key={sc.id} scenario={sc} lang={lang} onReachEnd={onReachEnd} />)}</>;
}

// ── Best Practices Recap ──────────────────────────────────────────
// Exported (2026-09-19) for reuse by SpecialtyResultScreen below — this
// content was already fully authored for all 49 operations, so the
// Specialty result screen's "Competencies Acquired"-equivalent needed zero
// new writing, just this export.
export function BestPracticesRecapSection({ op, lang }: { op: SpecializedOperation; lang: SupportedLanguage }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  if (!op.bestPracticesRecap?.length) return null;
  return (
    <>
      {op.bestPracticesRecap.map((theme, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 6 }}>{t(theme.theme)}</div>
          {theme.bestPractices.length ? <><SubLabel text={ui("bestPractices", lang)} color={C.green} /><BulletList items={theme.bestPractices.map(t)} /></> : null}
          {theme.commonErrors.length ? <><SubLabel text={ui("commonErrors", lang)} color={C.red} /><BulletList items={theme.commonErrors.map(t)} /></> : null}
        </Card>
      ))}
    </>
  );
}

// ── Specialty Exam Result Screen ───────────────────────────────────
// Ship-level view, not per-operation — mirrors what MaritimeApp.tsx's
// ExamResultScreen (Foundation) shows, loaded with the multi-operation
// breakdown and no-compensation verdict the Specialty doctrine requires.
// Doctrine enforced identically to Foundation: MAP signature, STCW
// disclaimer, no user photo anywhere on this screen.
//
// Recomputed fresh from whatever operations have been attempted so far
// (scores[operationId] undefined = not yet attempted) — same "always
// current, never cached" pattern as getModuleAverageScore, not a single
// frozen combined-session result. A ship is "passed" only once EVERY one
// of its operations has both been attempted AND individually cleared
// EXAM_PASS_THRESHOLD (specialtyExamEngine.ts) — no compensation between
// operations, and no partial credit for an unattempted one either.
//
// No persistence wiring yet (schema still cadrage-only) — this component
// only consumes whatever OperationScore map its caller passes in, so it
// is ready regardless of how that data eventually gets fetched.

const RESULT_T = {
  en: {
    shipStatusPassed: "✓ Ship validated",
    shipStatusIncomplete: "Ship not yet validated",
    operationNotAttempted: "Not attempted",
    operationPassed: "Passed",
    operationFailed: "Not passed",
    reasonFailed: (n: number, total: number) => `${n}/${total} operation${total > 1 ? "s" : ""} did not individually clear the threshold — no compensation between operations.`,
    reasonUnattempted: (n: number, total: number) => `${n}/${total} operation${total > 1 ? "s" : ""} not attempted yet.`,
    exercisesLabel: "Exercises",
    scenarioLabel: "Interactive scenario",
    recapHeader: "Summary — best practices",
    back: "◀ Back",
    signature: "MAP — powered by Independencia",
    disclaimer: "This is not an STCW Certificate of Competency or Certificate of Proficiency.",
  },
  fr: {
    shipStatusPassed: "✓ Navire validé",
    shipStatusIncomplete: "Navire non encore validé",
    operationNotAttempted: "Non tentée",
    operationPassed: "Réussie",
    operationFailed: "Non réussie",
    reasonFailed: (n: number, total: number) => `${n}/${total} opération${total > 1 ? "s" : ""} n'a/n'ont pas atteint le seuil individuellement — aucune compensation entre opérations.`,
    reasonUnattempted: (n: number, total: number) => `${n}/${total} opération${total > 1 ? "s" : ""} pas encore tentée${total > 1 ? "s" : ""}.`,
    exercisesLabel: "Exercices",
    scenarioLabel: "Scénario interactif",
    recapHeader: "Synthèse — bonnes pratiques",
    back: "◀ Retour",
    signature: "MAP — powered by Independencia",
    disclaimer: "Ce document n'est pas un Certificat de Compétence (Certificate of Competency) ni un Certificat d'Aptitude (Certificate of Proficiency) au sens de la convention STCW.",
  },
  es: {
    shipStatusPassed: "✓ Buque validado",
    shipStatusIncomplete: "Buque aún no validado",
    operationNotAttempted: "No intentada",
    operationPassed: "Aprobada",
    operationFailed: "No aprobada",
    reasonFailed: (n: number, total: number) => `${n}/${total} operación(es) no alcanzó/alcanzaron el umbral individualmente — sin compensación entre operaciones.`,
    reasonUnattempted: (n: number, total: number) => `${n}/${total} operación(es) aún no intentada(s).`,
    exercisesLabel: "Ejercicios",
    scenarioLabel: "Escenario interactivo",
    recapHeader: "Síntesis — buenas prácticas",
    back: "◀ Volver",
    signature: "MAP — powered by Independencia",
    disclaimer: "Este documento no es un Certificado de Competencia (Certificate of Competency) ni un Certificado de Aptitud (Certificate of Proficiency) en el sentido del convenio STCW.",
  },
  pt: {
    shipStatusPassed: "✓ Navio validado",
    shipStatusIncomplete: "Navio ainda não validado",
    operationNotAttempted: "Não tentada",
    operationPassed: "Aprovada",
    operationFailed: "Não aprovada",
    reasonFailed: (n: number, total: number) => `${n}/${total} operação(ões) não atingiu/atingiram o limiar individualmente — sem compensação entre operações.`,
    reasonUnattempted: (n: number, total: number) => `${n}/${total} operação(ões) ainda não tentada(s).`,
    exercisesLabel: "Exercícios",
    scenarioLabel: "Cenário interativo",
    recapHeader: "Síntese — boas práticas",
    back: "◀ Voltar",
    signature: "MAP — powered by Independencia",
    disclaimer: "Este documento não é um Certificado de Competência (Certificate of Competency) nem um Certificado de Aptidão (Certificate of Proficiency) no âmbito da convenção STCW.",
  },
} as const;

export interface SpecialtyResultScreenProps {
  shipLabel: string;
  operations: SpecializedOperation[];
  /** operationId -> its score, or undefined if that operation hasn't been attempted yet. */
  scores: Record<string, OperationScore | undefined>;
  lang: SupportedLanguage;
  onBack: () => void;
}

export function SpecialtyResultScreen({ shipLabel, operations, scores, lang, onBack }: SpecialtyResultScreenProps) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const RT = RESULT_T[lang] ?? RESULT_T.en;

  const total = operations.length;
  const unattemptedOps = operations.filter((op) => !scores[op.operationId]);
  const attemptedOps = operations.filter((op) => scores[op.operationId]);
  const failedOps = attemptedOps.filter((op) => !scores[op.operationId]!.passed);
  const shipPassed = total > 0 && unattemptedOps.length === 0 && failedOps.length === 0;

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`, color: C.white, fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ padding: "28px 16px 40px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <button onClick={onBack} style={{
            marginBottom: 14, padding: "8px 14px", borderRadius: 10,
            background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)",
            color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif",
          }}>
            {RT.back}
          </button>

          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 44, marginBottom: 8 }}>{shipPassed ? "🏆" : "🛠️"}</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>{shipLabel}</h1>
            <div style={{ fontSize: 13, fontWeight: 700, color: shipPassed ? C.green : C.orange }}>
              {shipPassed ? RT.shipStatusPassed : RT.shipStatusIncomplete}
            </div>
            {!shipPassed && (
              <div style={{ fontSize: 11, color: "rgba(240,244,255,0.6)", marginTop: 6, lineHeight: 1.5, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
                {failedOps.length > 0 && <div>{RT.reasonFailed(failedOps.length, total)}</div>}
                {unattemptedOps.length > 0 && <div>{RT.reasonUnattempted(unattemptedOps.length, total)}</div>}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {operations.map((op) => {
              const score = scores[op.operationId];
              const statusColor = !score ? "rgba(240,244,255,0.4)" : score.passed ? C.green : C.red;
              const statusLabel = !score ? RT.operationNotAttempted : score.passed ? RT.operationPassed : RT.operationFailed;
              return (
                <Card key={op.operationId} style={{ border: `1px solid ${statusColor}44` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: score ? 8 : 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, flex: 1, paddingRight: 10 }}>{t(op.title)}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: statusColor, whiteSpace: "nowrap" }}>
                      {score ? `${score.operationScorePercent}% · ` : ""}{statusLabel}
                    </div>
                  </div>
                  {score && (
                    <div style={{ display: "flex", gap: 16, fontSize: 11, color: "rgba(240,244,255,0.55)" }}>
                      <div>{RT.exercisesLabel}: {Math.round(score.exercisesScore * 100)}%</div>
                      <div>{RT.scenarioLabel}: {Math.round(score.scenarioScore * 100)}%</div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {shipPassed && attemptedOps.map((op) => (
            <div key={op.operationId} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: 2, color: C.gold, marginBottom: 8 }}>
                {RT.recapHeader} — {t(op.title)}
              </div>
              <BestPracticesRecapSection op={op} lang={lang} />
            </div>
          ))}

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(240,244,255,0.35)", fontFamily: "'Cinzel',serif" }}>
              {RT.signature}
            </div>
            <div style={{ fontSize: 9, color: "rgba(240,244,255,0.25)", lineHeight: 1.5, marginTop: 6, maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}>
              {RT.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Specialty Exam — graded interaction components ─────────────────
// Deliberately separate components from SequenceReorderingCard/
// ErrorIdentificationCard/ReadinessChecklistCard/InteractiveScenarioPlayer
// above, not a shared/extended version of them — exam mode has different
// rules (no restart, score captured and reported outward via onScored)
// and this way the existing, already-working browse/practice mode above
// is never at risk of a regression from this addition.

function GradedSequenceReorderingCard({ ex, lang, onScored }: { ex: SequenceReorderingExercise; lang: SupportedLanguage; onScored: (r: SpecialtyItemRecord) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [order, setOrder] = useState<string[]>(() => [...ex.items.map((i) => i.id)].reverse());
  const [checked, setChecked] = useState(false);
  const labelOf = (id: string) => t(ex.items.find((i) => i.id === id)?.label);

  function move(idx: number, dir: -1 | 1) {
    if (checked) return;
    const next = [...order];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    setOrder(next);
  }

  function check() {
    if (checked) return;
    setChecked(true);
    const correct = matchesCorrectOrder(order, ex.correctOrder);
    const result = scoreExercise({ type: "sequence_reordering", correct });
    onScored({ itemType: "exercise", itemId: ex.id, scoreEarned: result, scorePossible: 1 });
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.prompt)}</Prose>
      <div style={{ marginTop: 8 }}>
        {order.map((id, i) => (
          <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 4, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 12, color: "rgba(240,244,255,0.5)", width: 16 }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13 }}>{labelOf(id)}</span>
            {!checked && <button onClick={() => move(i, -1)} style={{ background: "none", border: "none", color: C.blue2, cursor: "pointer" }}>▲</button>}
            {!checked && <button onClick={() => move(i, 1)} style={{ background: "none", border: "none", color: C.blue2, cursor: "pointer" }}>▼</button>}
          </div>
        ))}
      </div>
      {!checked && (
        <button onClick={check} style={{ marginTop: 8, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
          {ui("checkOrder", lang)}
        </button>
      )}
      {checked && <div style={{ marginTop: 8, fontSize: 12, color: matchesCorrectOrder(order, ex.correctOrder) ? C.green : C.red, fontWeight: 700 }}>{matchesCorrectOrder(order, ex.correctOrder) ? ui("correct", lang) : ui("incorrect", lang)}</div>}
    </Card>
  );
}

function GradedErrorIdentificationCard({ ex, lang, onScored }: { ex: ErrorIdentificationExercise; lang: SupportedLanguage; onScored: (r: SpecialtyItemRecord) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  }

  function check() {
    if (revealed) return;
    setRevealed(true);
    const correctChoices = ex.choices.filter((c) => c.isError === selected.has(c.id)).length;
    const result = scoreExercise({ type: "error_identification", correctChoices, totalChoices: ex.choices.length });
    onScored({ itemType: "exercise", itemId: ex.id, scoreEarned: correctChoices, scorePossible: ex.choices.length });
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.scenario)}</Prose>
      <div style={{ marginTop: 8 }}>
        {ex.choices.map((c) => {
          const isSelected = selected.has(c.id);
          const correctness = revealed ? (c.isError === isSelected ? C.green : C.red) : undefined;
          return (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              padding: "8px 10px", marginBottom: 6, borderRadius: 8, cursor: revealed ? "default" : "pointer",
              background: isSelected ? "rgba(26,111,212,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${correctness || (isSelected ? C.blue2 : "transparent")}`,
            }}>
              <div style={{ fontSize: 13 }}>{t(c.label)}</div>
              {revealed && <div style={{ fontSize: 12, marginTop: 4, color: "rgba(240,244,255,0.65)" }}>{t(c.explanation)}</div>}
            </div>
          );
        })}
      </div>
      {!revealed && (
        <button onClick={check} style={{ marginTop: 4, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
          {ui("checkAnswers", lang)}
        </button>
      )}
    </Card>
  );
}

function GradedReadinessChecklistCard({ ex, lang, onScored }: { ex: ReadinessChecklistExercise; lang: SupportedLanguage; onScored: (r: SpecialtyItemRecord) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    const next = new Set(flagged);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlagged(next);
  }

  function check() {
    if (revealed) return;
    setRevealed(true);
    const correctItems = ex.items.filter((it) => flagged.has(it.id) === !it.isSatisfied).length;
    onScored({ itemType: "exercise", itemId: ex.id, scoreEarned: correctItems, scorePossible: ex.items.length });
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <Prose>{t(ex.scenario)}</Prose>
      <div style={{ fontSize: 12, color: "rgba(240,244,255,0.6)", marginTop: 6, fontStyle: "italic" }}>{ui("markOutstanding", lang)}</div>
      <div style={{ marginTop: 8 }}>
        {ex.items.map((it) => {
          const userFlagsOutstanding = flagged.has(it.id);
          const correct = revealed ? userFlagsOutstanding === !it.isSatisfied : undefined;
          return (
            <div key={it.id} onClick={() => toggle(it.id)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginBottom: 6, borderRadius: 8,
              cursor: revealed ? "default" : "pointer",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${revealed ? (correct ? C.green : C.red) : (userFlagsOutstanding ? C.orange : "transparent")}`,
            }}>
              <span>{userFlagsOutstanding ? "☑" : "☐"}</span>
              <span style={{ fontSize: 13, flex: 1 }}>{t(it.label)}</span>
              {revealed && <span style={{ fontSize: 11, color: it.isSatisfied ? C.green : C.red }}>{it.isSatisfied ? ui("satisfied", lang) : ui("outstanding", lang)}</span>}
            </div>
          );
        })}
      </div>
      {!revealed && (
        <button onClick={check} style={{ marginTop: 4, padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
          {ui("checkReadiness", lang)}
        </button>
      )}
    </Card>
  );
}

function GradedExercise({ ex, lang, onScored }: { ex: SpecializedExercise; lang: SupportedLanguage; onScored: (r: SpecialtyItemRecord) => void }) {
  if (ex.type === "sequence_reordering") return <GradedSequenceReorderingCard ex={ex} lang={lang} onScored={onScored} />;
  if (ex.type === "error_identification") return <GradedErrorIdentificationCard ex={ex} lang={lang} onScored={onScored} />;
  return <GradedReadinessChecklistCard ex={ex} lang={lang} onScored={onScored} />;
}

// Walks the same tree as InteractiveScenarioPlayer, but no restart and
// reports the full path of chosen-option qualities outward once an end
// node (no `next`) is reached — the raw input scoreOperation needs.
function GradedInteractiveScenarioPlayer({ scenario, lang, onScored }: { scenario: InteractiveScenario; lang: SupportedLanguage; onScored: (path: OptionQuality[]) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const [node, setNode] = useState<ScenarioDecisionNode>(scenario.root);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [path, setPath] = useState<OptionQuality[]>([]);
  const [ended, setEnded] = useState(false);

  const chosenOption = useMemo(() => node.options.find((o) => o.id === chosenId) ?? null, [node, chosenId]);

  function choose(optionId: string) {
    if (chosenOption) return;
    setChosenId(optionId);
  }

  function advance() {
    if (!chosenOption) return;
    const nextPath = [...path, optionQuality(chosenOption)];
    if (chosenOption.next) {
      setPath(nextPath);
      setNode(chosenOption.next);
      setChosenId(null);
    } else {
      setPath(nextPath);
      setEnded(true);
      onScored(nextPath);
    }
  }

  return (
    <Card style={{ marginBottom: 12, border: `1px solid ${C.gold}44` }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 2 }}>{t(scenario.title)}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 8, marginBottom: 10, background: "rgba(201,146,42,0.12)", fontSize: 10, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
        👤 {ui("scenarioSeat", lang)}: {rankLabel(scenario.seatRankId, lang)}
      </div>
      {ended ? (
        <div style={{ fontSize: 13, color: C.green }}>✓ {ui("scenarioComplete", lang)}</div>
      ) : (
        <>
          <Prose>{t(node.situation)}</Prose>
          {!chosenOption ? (
            <div style={{ marginTop: 10 }}>
              {node.options.map((o) => (
                <div key={o.id} onClick={() => choose(o.id)} style={{
                  padding: "10px 12px", marginBottom: 6, borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize: 13 }}>{t(o.label)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: chosenOption.isRecommended ? C.green : C.orange, marginBottom: 4 }}>
                  {t(chosenOption.consequence)}
                </div>
                <div style={{ fontSize: 13, color: "rgba(240,244,255,0.85)" }}>{t(chosenOption.feedback)}</div>
              </div>
              <button onClick={advance} style={{ padding: "8px 14px", borderRadius: 10, background: C.blue2, color: "#fff", border: "none", cursor: "pointer", fontSize: 13 }}>
                {chosenOption.next ? ui("continueBtn", lang) : ui("finishScenario", lang)}
              </button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

// ── Operation Exam Session ──────────────────────────────────────────
// Phase gating reuses the exact pattern every lesson in the app already
// uses (content -> quiz -> done, bankDone gating the next step) rather
// than inventing a new mechanic: scenarios (review, unscored) -> exercises
// (all must be checked) -> interactiveScenario (the capstone) -> done.
const SESSION_T = {
  en: { continueAfterScenarios: "Continue →", allExercisesRequired: "Complete all exercises above to continue.", continueToScenario: "Continue to the decision scenario →", operationScore: "Operation score", passed: "Passed", failed: "Not passed", backToList: "◀ Back to operations" },
  fr: { continueAfterScenarios: "Continuer →", allExercisesRequired: "Termine tous les exercices ci-dessus pour continuer.", continueToScenario: "Passer au scénario de décision →", operationScore: "Score de l'opération", passed: "Réussie", failed: "Non réussie", backToList: "◀ Retour aux opérations" },
  es: { continueAfterScenarios: "Continuar →", allExercisesRequired: "Completa todos los ejercicios arriba para continuar.", continueToScenario: "Pasar al escenario de decisión →", operationScore: "Puntuación de la operación", passed: "Aprobada", failed: "No aprobada", backToList: "◀ Volver a las operaciones" },
  pt: { continueAfterScenarios: "Continuar →", allExercisesRequired: "Completa todos os exercícios acima para continuar.", continueToScenario: "Avançar para o cenário de decisão →", operationScore: "Pontuação da operação", passed: "Aprovada", failed: "Não aprovada", backToList: "◀ Voltar às operações" },
} as const;

function OperationExamSession({ operation, lang, onComplete }: { operation: SpecializedOperation; lang: SupportedLanguage; onComplete: (score: OperationScore, items: SpecialtyItemRecord[]) => void }) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const ST = SESSION_T[lang] ?? SESSION_T.en;
  const [phase, setPhase] = useState<"scenarios" | "exercises" | "scenario" | "done">("scenarios");
  const [exerciseResults, setExerciseResults] = useState<Record<string, ExerciseResult>>({});
  const [exerciseItems, setExerciseItems] = useState<Record<string, SpecialtyItemRecord>>({});
  const [finalScore, setFinalScore] = useState<OperationScore | null>(null);
  const [finalItems, setFinalItems] = useState<SpecialtyItemRecord[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const exercises = operation.exercises ?? [];
  const allExercisesDone = exercises.every((ex) => exerciseItems[ex.id]);

  function handleExerciseScored(record: SpecialtyItemRecord) {
    setExerciseItems((prev) => ({ ...prev, [record.itemId]: record }));
    const source = exercises.find((ex) => ex.id === record.itemId)!;
    const result: ExerciseResult =
      source.type === "sequence_reordering" ? { type: "sequence_reordering", correct: record.scoreEarned === 1 } :
      source.type === "error_identification" ? { type: "error_identification", correctChoices: record.scoreEarned, totalChoices: record.scorePossible } :
      { type: "readiness_checklist", correctItems: record.scoreEarned, totalItems: record.scorePossible };
    setExerciseResults((prev) => ({ ...prev, [record.itemId]: result }));
  }

  // Computes and displays the score immediately, but only reports it to the
  // parent (persistence) once the learner clicks through the done screen —
  // keeps the "done" screen from being yanked away as soon as the parent's
  // save resolves, so the learner always sees their result.
  function handleScenarioScored(path: OptionQuality[]) {
    const scenario = (operation.interactiveScenarios ?? [])[0];
    const scenarioItems: SpecialtyItemRecord[] = path.map((q, i) => ({
      itemType: "scenario_node",
      itemId: `${scenario.id}_${i}`,
      scoreEarned: q === "optimal" ? 1 : q === "acceptable" ? 0.5 : 0,
      scorePossible: 1,
    }));
    const score = scoreOperation({
      operationId: operation.operationId,
      exerciseResults: Object.values(exerciseResults),
      scenarioPath: path,
    });
    setFinalScore(score);
    setFinalItems([...Object.values(exerciseItems), ...scenarioItems]);
    setPhase("done");
  }

  function submit() {
    if (submitted || !finalScore) return;
    setSubmitted(true);
    onComplete(finalScore, finalItems);
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`, color: C.white, fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ padding: "28px 16px 40px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>{t(operation.title)}</h1>

          {phase === "scenarios" && (
            <>
              <SL icon="📖" text={ui("scenarios", lang)} color={C.teal} />
              <PracticalScenariosSection op={operation} lang={lang} />
              <button onClick={() => setPhase("exercises")} style={{ width: "100%", padding: "13px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.blue},${C.blue2})`, fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: "#fff", cursor: "pointer", marginTop: 8 }}>
                {ST.continueAfterScenarios}
              </button>
            </>
          )}

          {phase === "exercises" && (
            <>
              <SL icon="🧩" text={ui("exercises", lang)} color={C.blue2} />
              {exercises.map((ex) => <GradedExercise key={ex.id} ex={ex} lang={lang} onScored={handleExerciseScored} />)}
              {allExercisesDone ? (
                <button onClick={() => setPhase("scenario")} style={{ width: "100%", padding: "13px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.blue},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: "#fff", cursor: "pointer", marginTop: 8 }}>
                  {ST.continueToScenario}
                </button>
              ) : (
                <div style={{ fontSize: 12, color: "rgba(240,244,255,0.5)", textAlign: "center", marginTop: 8 }}>{ST.allExercisesRequired}</div>
              )}
            </>
          )}

          {phase === "scenario" && (operation.interactiveScenarios ?? []).length > 0 && (
            <>
              <SL icon="🎯" text={ui("interactive", lang)} color={C.gold} />
              <GradedInteractiveScenarioPlayer scenario={operation.interactiveScenarios![0]} lang={lang} onScored={handleScenarioScored} />
            </>
          )}

          {phase === "done" && finalScore && (
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{finalScore.passed ? "🏆" : "📚"}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 900, marginBottom: 4 }}>{finalScore.operationScorePercent}%</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: finalScore.passed ? C.green : C.red, marginBottom: 14 }}>{finalScore.passed ? ST.passed : ST.failed}</div>
              <button onClick={submit} disabled={submitted} style={{ width: "100%", padding: "12px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.blue},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: "#fff", cursor: submitted ? "default" : "pointer", opacity: submitted ? 0.6 : 1 }}>
                {submitted ? "…" : ST.backToList}
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────
export interface SpecializedLessonSharedProps {
  operation: SpecializedOperation;
  lang?: SupportedLanguage;
  /** Fires once, the first time completion criteria are met (per the validated placeholder policy: reached an interactive-scenario end state + attempted one exercise of each type present). */
  onComplete?: () => void;
  /** Optional back CTA, rendered at the top of the content — same optional-prop pattern as RoleOnBoardShared.tsx. */
  onBack?: () => void;
}

// Placeholder completion policy (validated, provisional): reaching any
// interactive-scenario end state, plus attempting at least one exercise of
// each exercise type actually present in this operation. No scoring — that
// is explicitly deferred until after the Fire Response stress test.
export default function SpecializedLessonShared({ operation, lang = "en", onComplete, onBack }: SpecializedLessonSharedProps) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const backLabel = (T[lang] || T.en).back;
  const L = (key: keyof typeof UI.en) => ui(key, lang);
  const [attemptedTypes, setAttemptedTypes] = useState<Set<SpecializedExercise["type"]>>(new Set());
  // Tracks completion per interactiveScenarios entry by id, not a single
  // boolean — a single boolean would mark completion after just one
  // scenario even if an operation defines several (architecture audit
  // round 3, finding 5). Untriggered by either AHTS operation today (each
  // defines exactly one scenario), but correct for when that changes.
  const [completedScenarioIds, setCompletedScenarioIds] = useState<Set<string>>(new Set());
  const [fired, setFired] = useState(false);

  const requiredTypes = useMemo(
    () => new Set((operation.exercises ?? []).map((e) => e.type)),
    [operation.exercises]
  );
  const requiredScenarioIds = useMemo(
    () => new Set((operation.interactiveScenarios ?? []).map((s) => s.id)),
    [operation.interactiveScenarios]
  );

  function checkCompletion(nextAttempted: Set<SpecializedExercise["type"]>, nextCompletedScenarios: Set<string>) {
    if (fired || !onComplete) return;
    const allTypesAttempted = [...requiredTypes].every((ty) => nextAttempted.has(ty));
    const allScenariosDone = [...requiredScenarioIds].every((id) => nextCompletedScenarios.has(id));
    if (allTypesAttempted && allScenariosDone) {
      setFired(true);
      onComplete();
    }
  }

  function handleExerciseAttempt(type: SpecializedExercise["type"]) {
    setAttemptedTypes((prev) => {
      const next = new Set(prev).add(type);
      checkCompletion(next, completedScenarioIds);
      return next;
    });
  }

  function handleScenarioEnd(scenarioId: string) {
    setCompletedScenarioIds((prev) => {
      const next = new Set(prev).add(scenarioId);
      checkCompletion(attemptedTypes, next);
      return next;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`, color: C.white, fontFamily: "'Nunito',sans-serif", position: "relative" }}>
      <div style={{ padding: "28px 16px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                marginBottom: 14, padding: "8px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)",
                color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif",
              }}
            >
              {backLabel}
            </button>
          )}
          <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, marginBottom: 10, background: "rgba(26,111,212,0.15)", border: `1px solid ${C.blue2}44`, fontSize: 11, color: C.blue2, fontWeight: 700 }}>
            ⚓ {L("badge")}
          </div>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: C.white, lineHeight: 1.3, margin: "0 0 16px" }}>{t(operation.title)}</h1>

          <IntroSection op={operation} lang={lang} />

          <GLine />
          <SL icon="📋" text={L("walkthrough")} color={C.blue2} />
          <WalkthroughSection op={operation} lang={lang} />

          <GLine />
          <SL icon="📡" text={L("communication")} color={C.teal} />
          <CommunicationSection op={operation} lang={lang} />

          <GLine />
          <SL icon="👤" text={L("roleOnVessel")} color={C.gold} />
          <RoleOnVesselSection op={operation} lang={lang} />

          <GLine />
          <SL icon="📊" text={L("responsibilities")} color={C.orange} />
          <ResponsibilityMatrixSection op={operation} lang={lang} />

          <GLine />
          <SL icon="🧩" text={L("exercises")} color={C.blue2} />
          <ExercisesSection op={operation} lang={lang} onAttempt={handleExerciseAttempt} />

          <GLine />
          <SL icon="📖" text={L("scenarios")} color={C.teal} />
          <PracticalScenariosSection op={operation} lang={lang} />

          <GLine />
          <SL icon="🎮" text={L("interactive")} color={C.gold} />
          <InteractiveScenarioSection op={operation} lang={lang} onReachEnd={handleScenarioEnd} />

          <GLine />
          <SL icon="⚠️" text={L("recap")} color={C.red} />
          <BestPracticesRecapSection op={operation} lang={lang} />
        </div>
      </div>
    </div>
  );
}

// ── Specialty Exam Page (ship-level orchestrator) ───────────────────
const EXAM_PAGE_T = {
  en: { title: "Specialty Exam", back: "◀ Back", start: "Start", retake: "Retake", passedBadge: "Passed", failedBadge: "Not passed", cooldown: (d: Date) => `Available again ${d.toLocaleDateString("en")} at ${d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}`, viewResult: "🏆 View my Specialty result", loading: "Loading…" },
  fr: { title: "Examen Specialty", back: "◀ Retour", start: "Commencer", retake: "Repasser", passedBadge: "Réussie", failedBadge: "Non réussie", cooldown: (d: Date) => `Disponible à nouveau le ${d.toLocaleDateString("fr")} à ${d.toLocaleTimeString("fr", { hour: "2-digit", minute: "2-digit" })}`, viewResult: "🏆 Voir mon résultat Specialty", loading: "Chargement…" },
  es: { title: "Examen de Especialidad", back: "◀ Volver", start: "Empezar", retake: "Repetir", passedBadge: "Aprobada", failedBadge: "No aprobada", cooldown: (d: Date) => `Disponible de nuevo el ${d.toLocaleDateString("es")} a las ${d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}`, viewResult: "🏆 Ver mi resultado de Especialidad", loading: "Cargando…" },
  pt: { title: "Exame de Especialidade", back: "◀ Voltar", start: "Começar", retake: "Repetir", passedBadge: "Aprovada", failedBadge: "Não aprovada", cooldown: (d: Date) => `Disponível novamente em ${d.toLocaleDateString("pt")} às ${d.toLocaleTimeString("pt", { hour: "2-digit", minute: "2-digit" })}`, viewResult: "🏆 Ver o meu resultado de Especialidade", loading: "A carregar…" },
} as const;

export interface SpecialtyExamPageProps {
  shipTypeId: VesselTypeId;
  shipLabel: string;
  lang: SupportedLanguage;
  currentRankId?: RankId;
  targetRankId?: RankId;
  onBack: () => void;
}

export function SpecialtyExamPage({ shipTypeId, shipLabel, lang, currentRankId, targetRankId, onBack }: SpecialtyExamPageProps) {
  const t = (x: LocalizedText | undefined) => tx(x, lang);
  const PT = EXAM_PAGE_T[lang] ?? EXAM_PAGE_T.en;
  const [userId, setUserId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "session" | "result">("list");
  const [activeOperationId, setActiveOperationId] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, OperationScore | undefined>>({});
  const [cooldowns, setCooldowns] = useState<Record<string, Date | null>>({});
  const [loading, setLoading] = useState(true);

  const allOps = useMemo(() => getSpecializedOperationsByVesselType(shipTypeId), [shipTypeId]);
  // Rank eligibility (point 1 doctrine): a real filter, but a no-op for
  // AHTS today given its wide roleOnVessel coverage — see project memory.
  // Never shows an empty page: falls back to the full list if the
  // learner's ranks aren't set or don't match anything (fail open on
  // visibility, the content itself is still gated by SPECIALTY_ENABLED_
  // SHIP_TYPES at the call site regardless).
  const eligibleOps = useMemo(
    () => allOps.filter((op) => (op.roleOnVessel ?? []).some((r) => r.rankId === currentRankId || r.rankId === targetRankId)),
    [allOps, currentRankId, targetRankId]
  );
  const operations = eligibleOps.length > 0 ? eligibleOps : allOps;

  async function refresh(uid: string) {
    setLoading(true);
    const s = await getShipOperationScores(uid, operations.map((o) => o.operationId));
    setScores(s);
    const cds: Record<string, Date | null> = {};
    for (const op of operations) {
      const latest = await getLatestExamAttempt(uid, op.operationId, "specialty");
      const { allowed, nextAvailableAt } = canAttemptExam(latest);
      cds[op.operationId] = allowed ? null : nextAvailableAt;
    }
    setCooldowns(cds);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => {
      const user = data?.user;
      if (!user) { setLoading(false); return; }
      setUserId(user.id);
      refresh(user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipTypeId]);

  async function handleOperationComplete(score: OperationScore, items: SpecialtyItemRecord[]) {
    if (userId) {
      const rankId = targetRankId ?? currentRankId ?? null;
      await recordSpecialtyAttempt(userId, score.operationId, rankId, score, items);
      await refresh(userId);
    }
    setView("list");
    setActiveOperationId(null);
  }

  if (view === "session" && activeOperationId) {
    const op = operations.find((o) => o.operationId === activeOperationId);
    if (op) return <OperationExamSession operation={op} lang={lang} onComplete={handleOperationComplete} />;
  }

  if (view === "result") {
    return <SpecialtyResultScreen shipLabel={shipLabel} operations={operations} scores={scores} lang={lang} onBack={() => setView("list")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`, color: C.white, fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ padding: "28px 16px 40px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <button onClick={onBack} style={{
            marginBottom: 14, padding: "8px 14px", borderRadius: 10,
            background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)",
            color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif",
          }}>
            {PT.back}
          </button>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>{shipLabel}</h1>
          <div style={{ fontSize: 11, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>{PT.title}</div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 20, color: "rgba(240,244,255,0.5)" }}>{PT.loading}</div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {operations.map((op) => {
                  const score = scores[op.operationId];
                  const cooldownUntil = cooldowns[op.operationId];
                  return (
                    <Card key={op.operationId}>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{t(op.title)}</div>
                      {score && (
                        <div style={{ fontSize: 12, fontWeight: 700, color: score.passed ? C.green : C.red, marginBottom: 8 }}>
                          {score.operationScorePercent}% · {score.passed ? PT.passedBadge : PT.failedBadge}
                        </div>
                      )}
                      {cooldownUntil ? (
                        <div style={{ fontSize: 11, color: "rgba(240,244,255,0.5)" }}>{PT.cooldown(cooldownUntil)}</div>
                      ) : (
                        <button onClick={() => { setActiveOperationId(op.operationId); setView("session"); }} style={{
                          padding: "10px 16px", borderRadius: 10, border: "none",
                          background: `linear-gradient(135deg,${C.blue},${C.gold})`,
                          fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#fff", cursor: "pointer",
                        }}>
                          {score ? PT.retake : PT.start}
                        </button>
                      )}
                    </Card>
                  );
                })}
              </div>
              <button onClick={() => setView("result")} style={{
                width: "100%", padding: "13px 0", border: "1.5px solid #c9922a", borderRadius: 12,
                background: "rgba(201,146,42,0.1)", fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
                letterSpacing: 1.5, color: "#e8b94f", cursor: "pointer",
              }}>
                {PT.viewResult}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
