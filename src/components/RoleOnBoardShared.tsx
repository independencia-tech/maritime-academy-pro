// RoleOnBoardShared.tsx — shared rendering shell for Role On Board cards.
// Modeled on LessonShared.tsx: reuses its C / Card / GLine / SL / Stars UI
// primitives rather than duplicating a parallel visual system. Unlike
// LessonShared, there is no quiz/XP engine here — Role On Board is Layer 0
// (free, independent of profile/progression/Billing/MAP Core), and this
// mission is schema-only: no pedagogical content is authored in this file.
//
// Block-independence principle: every section is rendered conditionally on
// its own presence. A missing section is simply skipped — never an error,
// never a default empty block. A missing card for a given rank renders a
// single "no data yet" placeholder instead of failing.

import { C, Card, GLine, SL, Stars } from "./LessonShared";
import {
  OPERATIONAL_PHASE_ORDER,
  resolveLocalizedText,
  resolveLocalizedTextList,
  getRoleOnBoardCard,
  type OperationalPhase,
  type OperationalPhaseId,
  type MapReference,
  type AuthorityLimits,
  type ProfessionalResponsibilityMatrix,
  type RoleOnBoardMediaItem,
  type SupportedLanguage,
} from "@/core/roleOnBoardRegistry";
import { getRankMeta, type RankId } from "@/core/rankRegistry";
import type { LessonId } from "@/core/lessonRegistry";
import { getVesselTypeMeta, type VesselTypeId } from "@/core/vesselTypeRegistry";

// ── FIXED UI STRINGS ─────────────────────────────────────────
// Interface chrome (section titles, back button, phase labels) — authored
// ahead of time by developers, so this follows the same required-all-4
// convention as LessonShared's own `T`, not the partial LocalizedText type
// used for editorial content.
const T: Record<
  SupportedLanguage,
  {
    back: string;
    noData: string;
    roleOverview: string;
    organizationalPosition: string;
    reportsTo: string;
    worksWith: string;
    mentors: string;
    supports: string;
    professionalSkills: string;
    operationalPhases: string;
    practicalScenarios: string;
    professionalTips: string;
    professionalMindset: string;
    professionalDocumentation: string;
    environmentalResponsibilities: string;
    authorityLimits: string;
    youCan: string;
    youCannot: string;
    commonMistakes: string;
    careerProgression: string;
    mapResources: string;
    responsibilityMatrix: string;
    iExecute: string;
    iMonitor: string;
    iReport: string;
    iDoNotAuthorize: string;
    media: string;
    notes: string;
    phaseLabels: Record<OperationalPhaseId, string>;
  }
> = {
  en: {
    back: "◀ Back",
    noData: "No content published yet for this rank.",
    roleOverview: "Role Overview",
    organizationalPosition: "Position in the Organization",
    reportsTo: "Reports to",
    worksWith: "Works with",
    mentors: "Mentors",
    supports: "Supports",
    professionalSkills: "Professional Skills",
    operationalPhases: "Operational Phases",
    practicalScenarios: "Practical Scenarios",
    professionalTips: "Professional Tips",
    professionalMindset: "Professional Mindset",
    professionalDocumentation: "Professional Documentation",
    environmentalResponsibilities: "Environmental Responsibilities",
    authorityLimits: "Authority Limits",
    youCan: "You can",
    youCannot: "You cannot",
    commonMistakes: "Common Mistakes",
    careerProgression: "Career Progression",
    mapResources: "MAP Resources",
    responsibilityMatrix: "Professional Responsibility Matrix",
    iExecute: "I execute",
    iMonitor: "I monitor",
    iReport: "I report",
    iDoNotAuthorize: "I don't authorize",
    media: "Media",
    notes: "Notes",
    phaseLabels: {
      pre_departure_preparation: "Pre-Departure Preparation",
      departure_manoeuvres: "Departure Manoeuvres",
      navigation: "Navigation",
      anchoring: "Anchoring",
      port_operations: "Port Operations",
      ship_to_ship_operations: "Ship-to-Ship Operations",
      maintenance: "Maintenance",
      emergency_situations: "Emergency Situations",
    },
  },
  fr: {
    back: "◀ Retour",
    noData: "Aucun contenu publié pour ce rang pour le moment.",
    roleOverview: "Présentation du métier",
    organizationalPosition: "Position dans l'organisation",
    reportsTo: "Rend compte à",
    worksWith: "Travaille avec",
    mentors: "Encadre",
    supports: "Soutient",
    professionalSkills: "Compétences professionnelles",
    operationalPhases: "Phases opérationnelles",
    practicalScenarios: "Mises en situation",
    professionalTips: "Conseils professionnels",
    professionalMindset: "État d'esprit professionnel",
    professionalDocumentation: "Documentation professionnelle",
    environmentalResponsibilities: "Responsabilités environnementales",
    authorityLimits: "Limites d'autorité",
    youCan: "Tu peux",
    youCannot: "Tu ne peux pas",
    commonMistakes: "Erreurs courantes",
    careerProgression: "Évolution professionnelle",
    mapResources: "Ressources MAP",
    responsibilityMatrix: "Matrice de responsabilité professionnelle",
    iExecute: "J'exécute",
    iMonitor: "Je surveille",
    iReport: "Je signale",
    iDoNotAuthorize: "Je n'autorise pas",
    media: "Support multimédia",
    notes: "Notes",
    phaseLabels: {
      pre_departure_preparation: "Préparation avant départ",
      departure_manoeuvres: "Manœuvres de départ",
      navigation: "Navigation",
      anchoring: "Mouillage",
      port_operations: "Opérations portuaires",
      ship_to_ship_operations: "Opérations navire à navire",
      maintenance: "Maintenance",
      emergency_situations: "Situations d'urgence",
    },
  },
  es: {
    back: "◀ Volver",
    noData: "Todavía no hay contenido publicado para este rango.",
    roleOverview: "Presentación del puesto",
    organizationalPosition: "Posición en la organización",
    reportsTo: "Reporta a",
    worksWith: "Trabaja con",
    mentors: "Supervisa",
    supports: "Apoya a",
    professionalSkills: "Competencias profesionales",
    operationalPhases: "Fases operacionales",
    practicalScenarios: "Escenarios prácticos",
    professionalTips: "Consejos profesionales",
    professionalMindset: "Mentalidad profesional",
    professionalDocumentation: "Documentación profesional",
    environmentalResponsibilities: "Responsabilidades ambientales",
    authorityLimits: "Límites de autoridad",
    youCan: "Puedes",
    youCannot: "No puedes",
    commonMistakes: "Errores comunes",
    careerProgression: "Evolución profesional",
    mapResources: "Recursos MAP",
    responsibilityMatrix: "Matriz de responsabilidad profesional",
    iExecute: "Ejecuto",
    iMonitor: "Superviso",
    iReport: "Informo",
    iDoNotAuthorize: "No autorizo",
    media: "Contenido multimedia",
    notes: "Notas",
    phaseLabels: {
      pre_departure_preparation: "Preparación antes de zarpar",
      departure_manoeuvres: "Maniobras de salida",
      navigation: "Navegación",
      anchoring: "Fondeo",
      port_operations: "Operaciones portuarias",
      ship_to_ship_operations: "Operaciones buque a buque",
      maintenance: "Mantenimiento",
      emergency_situations: "Situaciones de emergencia",
    },
  },
  pt: {
    back: "◀ Voltar",
    noData: "Ainda não há conteúdo publicado para este posto.",
    roleOverview: "Apresentação da função",
    organizationalPosition: "Posição na organização",
    reportsTo: "Reporta a",
    worksWith: "Trabalha com",
    mentors: "Orienta",
    supports: "Apoia",
    professionalSkills: "Competências profissionais",
    operationalPhases: "Fases operacionais",
    practicalScenarios: "Cenários práticos",
    professionalTips: "Dicas profissionais",
    professionalMindset: "Mentalidade profissional",
    professionalDocumentation: "Documentação profissional",
    environmentalResponsibilities: "Responsabilidades ambientais",
    authorityLimits: "Limites de autoridade",
    youCan: "Podes",
    youCannot: "Não podes",
    commonMistakes: "Erros comuns",
    careerProgression: "Evolução profissional",
    mapResources: "Recursos MAP",
    responsibilityMatrix: "Matriz de responsabilidade profissional",
    iExecute: "Executo",
    iMonitor: "Superviso",
    iReport: "Reporto",
    iDoNotAuthorize: "Não autorizo",
    media: "Conteúdo multimédia",
    notes: "Notas",
    phaseLabels: {
      pre_departure_preparation: "Preparação antes da partida",
      departure_manoeuvres: "Manobras de partida",
      navigation: "Navegação",
      anchoring: "Fundeio",
      port_operations: "Operações portuárias",
      ship_to_ship_operations: "Operações navio a navio",
      maintenance: "Manutenção",
      emergency_situations: "Situações de emergência",
    },
  },
};

// ── SMALL RENDER HELPERS ─────────────────────────────────────
function TextList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((text, i) => (
        <li key={i} style={{ fontSize: 13, color: C.white, lineHeight: 1.5 }}>
          {text}
        </li>
      ))}
    </ul>
  );
}

function Section({
  icon,
  title,
  color,
  items,
}: {
  icon: string;
  title: string;
  color?: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <SL icon={icon} text={title} color={color} />
      <TextList items={items} />
    </div>
  );
}

function referenceLabel(ref: MapReference, lang: SupportedLanguage): string {
  const custom = resolveLocalizedText(ref.label, lang);
  if (custom) return custom;
  if (ref.kind === "lesson" && ref.lessonId) return ref.lessonId as LessonId;
  if (ref.kind === "vesselType" && ref.vesselTypeId) {
    const meta = getVesselTypeMeta(ref.vesselTypeId as VesselTypeId);
    return resolveLocalizedText(meta?.label, lang) ?? (ref.vesselTypeId as string);
  }
  if (ref.kind === "external" && ref.externalCode) return ref.externalCode;
  return "";
}

function MapReferenceList({ refs, lang }: { refs: MapReference[]; lang: SupportedLanguage }) {
  const labels = refs.map((r) => referenceLabel(r, lang)).filter((l) => l.length > 0);
  return <TextList items={labels} />;
}

function OperationalPhaseBlock({
  phaseId,
  phase,
  lang,
  t,
}: {
  phaseId: OperationalPhaseId;
  phase: OperationalPhase;
  lang: SupportedLanguage;
  t: (typeof T)[SupportedLanguage];
}) {
  const overview = resolveLocalizedText(phase.overview, lang);
  const responsibilities = resolveLocalizedTextList(phase.responsibilities, lang);
  const equipment = resolveLocalizedTextList(phase.equipment, lang);
  const risks = resolveLocalizedTextList(phase.risks, lang);
  const bestPractices = resolveLocalizedTextList(phase.bestPractices, lang);
  const commonMistakes = resolveLocalizedTextList(phase.commonMistakes, lang);
  const professionalTips = resolveLocalizedTextList(phase.professionalTips, lang);
  const notes = resolveLocalizedText(phase.notes, lang);
  const hasReferences = (phase.mapReferences?.length ?? 0) > 0;

  const hasAnything =
    !!overview ||
    responsibilities.length > 0 ||
    equipment.length > 0 ||
    risks.length > 0 ||
    bestPractices.length > 0 ||
    commonMistakes.length > 0 ||
    professionalTips.length > 0 ||
    hasReferences ||
    !!notes;

  if (!hasAnything) return null;

  return (
    <Card style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, color: C.gold2, letterSpacing: 1, marginBottom: 4 }}>
        {t.phaseLabels[phaseId]}
      </div>
      {overview && <div style={{ fontSize: 13, color: C.white, lineHeight: 1.5, marginBottom: 8 }}>{overview}</div>}
      {responsibilities.length > 0 && <Section icon="🧭" title="Responsibilities" items={responsibilities} />}
      {equipment.length > 0 && <Section icon="🛠️" title="Equipment" items={equipment} />}
      {risks.length > 0 && <Section icon="⚠️" title="Risks" items={risks} />}
      {bestPractices.length > 0 && <Section icon="✅" title="Best Practices" items={bestPractices} />}
      {commonMistakes.length > 0 && <Section icon="⛔" title={t.commonMistakes} items={commonMistakes} />}
      {professionalTips.length > 0 && <Section icon="💡" title={t.professionalTips} items={professionalTips} />}
      {hasReferences && (
        <div>
          <SL icon="📎" text={t.mapResources} color={C.gold} />
          <MapReferenceList refs={phase.mapReferences!} lang={lang} />
        </div>
      )}
      {notes && (
        <div style={{ marginTop: 8, fontSize: 12, color: C.muted, fontStyle: "italic" }}>{notes}</div>
      )}
    </Card>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function RoleOnBoardShared({
  rankId,
  lang = "en",
  onBack,
}: {
  rankId: RankId;
  lang?: SupportedLanguage;
  onBack?: () => void;
}) {
  const t = T[lang] || T.en;
  const rankMeta = getRankMeta(rankId);
  const card = getRoleOnBoardCard(rankId);

  const rankLabel = rankMeta ? resolveLocalizedText(rankMeta.label, lang) ?? rankId : rankId;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
        color: C.white,
        fontFamily: "'Nunito',sans-serif",
        position: "relative",
      }}
    >
      <Stars />
      <div style={{ padding: "20px 16px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                marginBottom: 14,
                padding: "8px 14px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: C.white,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              {t.back}
            </button>
          )}

          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 }}>
            {rankLabel}
          </div>
          <GLine />

          {!card ? (
            <Card>
              <div style={{ fontSize: 13, color: C.muted, textAlign: "center" }}>{t.noData}</div>
            </Card>
          ) : (
            <RoleOnBoardCardBody card={card} lang={lang} t={t} />
          )}
        </div>
      </div>
    </div>
  );
}

function RoleOnBoardCardBody({
  card,
  lang,
  t,
}: {
  card: NonNullable<ReturnType<typeof getRoleOnBoardCard>>;
  lang: SupportedLanguage;
  t: (typeof T)[SupportedLanguage];
}) {
  const roleOverview = resolveLocalizedTextList(card.roleOverview, lang);

  const reportsTo = resolveLocalizedTextList(card.organizationalPosition?.reportsTo, lang);
  const worksWith = resolveLocalizedTextList(card.organizationalPosition?.worksWith, lang);
  const mentors = resolveLocalizedTextList(card.organizationalPosition?.mentors, lang);
  const supports = resolveLocalizedTextList(card.organizationalPosition?.supports, lang);
  const hasOrganizationalPosition =
    reportsTo.length > 0 || worksWith.length > 0 || mentors.length > 0 || supports.length > 0;

  const professionalSkills = (card.professionalSkills ?? [])
    .map((skill) => ({
      label: resolveLocalizedText(skill.label, lang),
      mapReferences: skill.mapReferences ?? [],
    }))
    .filter((s): s is { label: string; mapReferences: MapReference[] } => !!s.label);

  const practicalScenarios = resolveLocalizedTextList(card.practicalScenarios, lang);
  const professionalTips = resolveLocalizedTextList(card.professionalTips, lang);
  const professionalMindset = resolveLocalizedTextList(card.professionalMindset, lang);
  const professionalDocumentation = resolveLocalizedTextList(card.professionalDocumentation, lang);
  const environmentalResponsibilities = resolveLocalizedTextList(card.environmentalResponsibilities, lang);
  const commonMistakes = resolveLocalizedTextList(card.commonMistakes, lang);
  const careerProgression = resolveLocalizedTextList(card.careerProgression, lang);

  const youCan = resolveLocalizedTextList(card.authorityLimits?.youCan, lang);
  const youCannot = resolveLocalizedTextList(card.authorityLimits?.youCannot, lang);
  const hasAuthorityLimits = youCan.length > 0 || youCannot.length > 0;

  const mapResources = card.mapResources ?? [];

  const matrix = card.responsibilityMatrix;
  const iExecute = resolveLocalizedTextList(matrix?.iExecute, lang);
  const iMonitor = resolveLocalizedTextList(matrix?.iMonitor, lang);
  const iReport = resolveLocalizedTextList(matrix?.iReport, lang);
  const iDoNotAuthorize = resolveLocalizedTextList(matrix?.iDoNotAuthorize, lang);
  const hasMatrix = iExecute.length > 0 || iMonitor.length > 0 || iReport.length > 0 || iDoNotAuthorize.length > 0;

  const media = card.media ?? [];
  const hasPhases = OPERATIONAL_PHASE_ORDER.some((id) => !!card.operationalPhases?.[id]);

  return (
    <>
      {roleOverview.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="🧑‍✈️" title={t.roleOverview} items={roleOverview} />
        </Card>
      )}

      {hasOrganizationalPosition && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="🗂️" text={t.organizationalPosition} color={C.gold} />
          {reportsTo.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue2, marginBottom: 4 }}>{t.reportsTo}</div>
              <TextList items={reportsTo} />
            </div>
          )}
          {worksWith.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold2, marginBottom: 4 }}>{t.worksWith}</div>
              <TextList items={worksWith} />
            </div>
          )}
          {mentors.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>{t.mentors}</div>
              <TextList items={mentors} />
            </div>
          )}
          {supports.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.orange, marginBottom: 4 }}>{t.supports}</div>
              <TextList items={supports} />
            </div>
          )}
        </Card>
      )}

      {professionalSkills.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="🎯" text={t.professionalSkills} color={C.gold} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {professionalSkills.map((skill, i) => {
              const refLabels = skill.mapReferences.map((r) => referenceLabel(r, lang)).filter((l) => l.length > 0);
              return (
                <div key={i}>
                  <div style={{ fontSize: 13, color: C.white, lineHeight: 1.5 }}>{skill.label}</div>
                  {refLabels.length > 0 && (
                    <div style={{ marginTop: 2, fontSize: 11, color: C.muted }}>📎 {refLabels.join(" · ")}</div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {hasPhases && (
        <div style={{ marginBottom: 14 }}>
          <SL icon="⚓" text={t.operationalPhases} color={C.gold} />
          {OPERATIONAL_PHASE_ORDER.map((phaseId) => {
            const phase = card.operationalPhases?.[phaseId];
            if (!phase) return null;
            return <OperationalPhaseBlock key={phaseId} phaseId={phaseId} phase={phase} lang={lang} t={t} />;
          })}
        </div>
      )}

      {practicalScenarios.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="🎬" title={t.practicalScenarios} items={practicalScenarios} />
        </Card>
      )}

      {professionalTips.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="💡" title={t.professionalTips} items={professionalTips} />
        </Card>
      )}

      {professionalMindset.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="🧠" title={t.professionalMindset} items={professionalMindset} />
        </Card>
      )}

      {professionalDocumentation.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="📄" title={t.professionalDocumentation} items={professionalDocumentation} />
        </Card>
      )}

      {environmentalResponsibilities.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="🌊" title={t.environmentalResponsibilities} items={environmentalResponsibilities} />
        </Card>
      )}

      {hasAuthorityLimits && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="🔐" text={t.authorityLimits} color={C.gold} />
          {youCan.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 4 }}>{t.youCan}</div>
              <TextList items={youCan} />
            </div>
          )}
          {youCannot.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 4 }}>{t.youCannot}</div>
              <TextList items={youCannot} />
            </div>
          )}
        </Card>
      )}

      {commonMistakes.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="⛔" title={t.commonMistakes} items={commonMistakes} />
        </Card>
      )}

      {careerProgression.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <Section icon="📈" title={t.careerProgression} items={careerProgression} />
        </Card>
      )}

      {mapResources.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="📎" text={t.mapResources} color={C.gold} />
          <MapReferenceList refs={mapResources} lang={lang} />
        </Card>
      )}

      {hasMatrix && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="📊" text={t.responsibilityMatrix} color={C.gold} />
          {iExecute.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue2, marginBottom: 4 }}>{t.iExecute}</div>
              <TextList items={iExecute} />
            </div>
          )}
          {iMonitor.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold2, marginBottom: 4 }}>{t.iMonitor}</div>
              <TextList items={iMonitor} />
            </div>
          )}
          {iReport.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.orange, marginBottom: 4 }}>{t.iReport}</div>
              <TextList items={iReport} />
            </div>
          )}
          {iDoNotAuthorize.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 4 }}>{t.iDoNotAuthorize}</div>
              <TextList items={iDoNotAuthorize} />
            </div>
          )}
        </Card>
      )}

      {media.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <SL icon="🖼️" text={t.media} color={C.gold} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {media.map((m: RoleOnBoardMediaItem, i: number) => {
              const caption = resolveLocalizedText(m.caption, lang);
              const icon = m.kind === "video" ? "🎬" : m.kind === "diagram" ? "📐" : m.kind === "document" ? "📄" : "🖼️";
              return (
                <div key={i} style={{ fontSize: 12, color: C.white, display: "flex", gap: 8 }}>
                  <span>{icon}</span>
                  <span>{caption ?? m.src ?? m.kind}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}
