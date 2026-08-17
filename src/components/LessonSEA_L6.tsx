import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank, shuffleQuestionOptions } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — DECK MAINTENANCE ROUNDS SIMULATOR
// ══════════════════════════════════════
function DeckMaintenanceRoundsSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const steps = [
    {
      event: { fr: "L'ordre de mission est donné", en: "The assignment is given", es: "Se da la orden de trabajo", pt: "A missão é atribuída" },
      quote: "Grease the mooring winches and inspect the associated wires and fittings.",
      tr: { fr: "Graisse les treuils d'amarrage et inspecte les câbles et accessoires associés.", es: "Engrasa los winches de amarre e inspecciona los cables y accesorios asociados.", pt: "Lubrifica os guinchos de amarração e inspeciona os cabos e acessórios associados." },
      context: {
        fr: "La mission est donnée comme une maintenance complète (inspecter, nettoyer si nécessaire, lubrifier, observer, rendre compte), pas uniquement comme une opération de graissage isolée.",
        en: "The task is given as a complete maintenance operation (inspect, clean if necessary, lubricate, observe, report), not merely an isolated greasing job.",
        es: "La tarea se da como una operación de mantenimiento completa (inspeccionar, limpiar si es necesario, lubricar, observar, informar), no simplemente como un engrase aislado.",
        pt: "A tarefa é dada como uma operação de manutenção completa (inspecionar, limpar se necessário, lubrificar, observar, reportar), não apenas como uma lubrificação isolada.",
      },
    },
    {
      event: { fr: "L'AB inspecte le winch avant de graisser", en: "The AB inspects the winch before greasing", es: "El AB inspecciona el winche antes de engrasar", pt: "O AB inspeciona o guincho antes de lubrificar" },
      description: {
        fr: "Vérifie l'état visuel (rouille, usure, jeu anormal, fuite) avant d'intervenir.",
        en: "Checks the visual condition (rust, wear, abnormal play, leakage) before intervening.",
        es: "Verifica el estado visual (óxido, desgaste, juego anormal, fuga) antes de intervenir.",
        pt: "Verifica o estado visual (ferrugem, desgaste, folga anormal, fuga) antes de intervir.",
      },
      context: {
        fr: "Inspecter avant d'agir permet de détecter un problème existant avant de le masquer sous une nouvelle couche de graisse.",
        en: "Inspecting before acting allows an existing problem to be detected before it is masked under a fresh layer of grease.",
        es: "Inspeccionar antes de actuar permite detectar un problema existente antes de que quede oculto bajo una nueva capa de grasa.",
        pt: "Inspecionar antes de agir permite detetar um problema existente antes de ficar mascarado sob uma nova camada de massa lubrificante.",
      },
    },
    {
      event: { fr: "Application de la graisse aux points prévus", en: "Grease applied to the designated points", es: "Aplicación de grasa en los puntos previstos", pt: "Aplicação de massa nos pontos previstos" },
      description: {
        fr: "Pas trop, pas trop peu ; respect des points désignés (pas de lubrification \u00ab au hasard \u00bb).",
        en: "Not too much, not too little; only the designated points (never lubrication \u201cat random\u201d).",
        es: "Ni demasiado ni demasiado poco; respetando los puntos designados (nunca una lubricación \u00ab al azar \u00bb).",
        pt: "Nem demais, nem de menos; respeitando os pontos designados (nunca uma lubrificação \u00ab ao acaso \u00bb).",
      },
      context: {
        fr: "Toutes les graisses ne sont pas compatibles avec tous les équipements — l'AB utilise le produit spécifié par le PMS ou les procédures du navire, jamais \u00ab par habitude \u00bb.",
        en: "Not all greases are compatible with all equipment — the AB uses the product specified by the PMS or the vessel's procedures, never \u201cout of habit.\u201d",
        es: "No todas las grasas son compatibles con todos los equipos — el AB utiliza el producto especificado por el PMS o los procedimientos del buque, nunca \u00ab por costumbre \u00bb.",
        pt: "Nem todas as massas são compatíveis com todos os equipamentos — o AB usa o produto especificado pelo PMS ou pelos procedimentos do navio, nunca \u00ab por hábito \u00bb.",
      },
    },
    {
      event: { fr: "Inspection du câble métallique (wire)", en: "Wire rope inspection", es: "Inspección del cable metálico", pt: "Inspeção do cabo metálico" },
      description: {
        fr: "Recherche de fils cassés (broken strands), corrosion, déformation, fuite éventuelle sur les équipements associés.",
        en: "Looking for broken strands, corrosion, deformation, and any leakage on the associated equipment.",
        es: "Búsqueda de hilos rotos (broken strands), corrosión, deformación, y posible fuga en los equipos asociados.",
        pt: "Procura de fios partidos (broken strands), corrosão, deformação, e eventual fuga nos equipamentos associados.",
      },
      context: {
        fr: "Le câble métallique est un élément de sécurité critique — son inspection fait partie intégrante de la ronde de maintenance.",
        en: "The wire rope is a critical safety component — its inspection is an integral part of the maintenance round.",
        es: "El cable metálico es un elemento de seguridad crítico — su inspección forma parte integral de la ronda de mantenimiento.",
        pt: "O cabo metálico é um elemento de segurança crítico — a sua inspeção faz parte integrante da ronda de manutenção.",
      },
    },
    {
      event: { fr: "Découverte d'une anomalie", en: "An abnormality is discovered", es: "Se descubre una anomalía", pt: "É descoberta uma anomalia" },
      description: {
        fr: "Quelques fils cassés localisés sont détectés. L'AB ne décide pas seul de la mise hors service, il rapporte précisément au Bosun.",
        en: "A few localized broken strands are detected. The AB does not decide alone whether to take the equipment out of service — he reports precisely to the Bosun.",
        es: "Se detectan algunos hilos rotos localizados. El AB no decide solo si retirar el equipo de servicio — informa con precisión al Bosun.",
        pt: "São detetados alguns fios partidos localizados. O AB não decide sozinho se o equipamento deve ser retirado de serviço — reporta com precisão ao Bosun.",
      },
      context: {
        fr: "La décision de mise hors service d'un équipement critique revient toujours à un niveau de responsabilité supérieur, jamais au rating seul.",
        en: "The decision to take a critical piece of equipment out of service always belongs to a higher level of responsibility, never to the rating alone.",
        es: "La decisión de retirar de servicio un equipo crítico corresponde siempre a un nivel de responsabilidad superior, nunca al marinero solo.",
        pt: "A decisão de retirar de serviço um equipamento crítico pertence sempre a um nível de responsabilidade superior, nunca ao marinheiro sozinho.",
      },
    },
    {
      event: { fr: "Rapport au Bosun", en: "Report to the Bosun", es: "Informe al Bosun", pt: "Relatório ao Bosun" },
      description: {
        fr: "Description précise : localisation, étendue, gravité apparente — pas une remarque vague.",
        en: "A precise description: location, extent, apparent severity — not a vague remark.",
        es: "Una descripción precisa: ubicación, extensión, gravedad aparente — no un comentario vago.",
        pt: "Uma descrição precisa: localização, extensão, gravidade aparente — não um comentário vago.",
      },
      context: {
        fr: "Un rapport précis permet au Bosun d'évaluer correctement le risque et de décider de la suite à donner.",
        en: "A precise report allows the Bosun to correctly assess the risk and decide on the next steps.",
        es: "Un informe preciso permite al Bosun evaluar correctamente el riesgo y decidir los próximos pasos.",
        pt: "Um relatório preciso permite ao Bosun avaliar corretamente o risco e decidir os próximos passos.",
      },
    },
  ];

  const s = steps[step];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {steps.map((_, i) => (
          <div key={i} onClick={() => setStep(i)} style={{
            flex: 1, height: 4, borderRadius: 4, cursor: "pointer",
            background: i <= step ? (i === step ? C.orange : `${C.orange}55`) : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.orange, letterSpacing: 2, textAlign: "center", marginBottom: 8, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "SIMULATEUR RONDE DE MAINTENANCE" : lang === "en" ? "MAINTENANCE ROUND SIMULATOR" : lang === "es" ? "SIMULADOR RONDA DE MANTENIMIENTO" : "SIMULADOR RONDA DE MANUTENÇÃO"} — {step + 1}/{steps.length}
      </div>
      <div style={{ padding: "12px", borderRadius: 14, marginBottom: 10, background: "rgba(230,126,34,0.08)", border: `2px solid ${C.orange}55`, animation: "fadeUp 0.3s ease" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.orange, marginBottom: 8 }}>{s.event[lang] || s.event.en}</div>
        {s.quote && (
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: C.white, lineHeight: 1.6, fontWeight: 700, marginBottom: 8 }}>"{s.quote}"</div>
        )}
        {s.description && (
          <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6, marginBottom: 4 }}>{s.description[lang] || s.description.en}</div>
        )}
      </div>
      {lang !== "en" && s.tr && <button onClick={() => setShowTr(!showTr)} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: C.muted, cursor: "pointer", marginBottom: 8 }}>
        {showTr ? "▲ Hide" : "▼ "}{lang === "fr" ? "Traduction" : lang === "es" ? "Traducción" : "Tradução"}
      </button>}
      {lang !== "en" && showTr && s.tr && (
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontStyle: "italic" }}>{s.tr[lang] || s.tr.fr}</div>
      )}
      <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 10, fontSize: 11, color: C.white, lineHeight: 1.6, whiteSpace: "pre-line" }}>
        {s.context[lang] || s.context.en}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStep(v => Math.max(0, v - 1))} disabled={step === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: step === 0 ? C.muted : C.white, cursor: step === 0 ? "default" : "pointer", fontSize: 11 }}>
          ◀ {lang === "fr" ? "Précédent" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Anterior"}
        </button>
        <button onClick={() => setStep(v => Math.min(steps.length - 1, v + 1))} disabled={step === steps.length - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: step === steps.length - 1 ? "rgba(255,255,255,0.05)" : `${C.orange}22`, border: `1px solid ${step === steps.length - 1 ? "rgba(255,255,255,0.08)" : C.orange}`, color: C.white, cursor: step === steps.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — LUBRICATION POINTS & SCHEDULE
// ══════════════════════════════════════
function LubricationPointsScheduleSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const points = [
    { id: 1, icon: "⚙️", label: { fr: "Roulements", en: "Bearings", es: "Rodamientos", pt: "Rolamentos" } },
    { id: 2, icon: "🔧", label: { fr: "Engrenages", en: "Gears", es: "Engranajes", pt: "Engrenagens" } },
    { id: 3, icon: "🪢", label: { fr: "Câble & tambour", en: "Wire rope & drum", es: "Cable y tambor", pt: "Cabo e tambor" } },
    { id: 4, icon: "🛑", label: { fr: "Mécanisme de frein", en: "Brake mechanism", es: "Mecanismo de freno", pt: "Mecanismo de travão" } },
    { id: 5, icon: "🔩", label: { fr: "Axes & manilles", en: "Pins & shackles", es: "Pasadores y grilletes", pt: "Pinos e manilhas" } },
  ];
  const sel_ = points.find(p => p.id === sel);

  const schedule = [
    { freq: { fr: "Quotidien", en: "Daily", es: "Diario", pt: "Diário" }, color: C.red,
      desc: { fr: "Équipements à usage intensif, en opération active", en: "Equipment in intensive, active operation", es: "Equipos de uso intensivo, en operación activa", pt: "Equipamentos de uso intensivo, em operação ativa" } },
    { freq: { fr: "Hebdomadaire", en: "Weekly", es: "Semanal", pt: "Semanal" }, color: C.gold2,
      desc: { fr: "Équipements à usage modéré", en: "Equipment in moderate use", es: "Equipos de uso moderado", pt: "Equipamentos de uso moderado" } },
    { freq: { fr: "Mensuel", en: "Monthly", es: "Mensual", pt: "Mensal" }, color: C.green,
      desc: { fr: "Équipements peu utilisés ou protégés", en: "Rarely used or protected equipment", es: "Equipos poco usados o protegidos", pt: "Equipamentos pouco usados ou protegidos" } },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "POINTS DE GRAISSAGE TYPIQUES (WINCH/GUINDEAU)" : lang === "en" ? "TYPICAL LUBRICATION POINTS (WINCH/WINDLASS)" : lang === "es" ? "PUNTOS DE ENGRASE TÍPICOS (WINCHE/MOLINETE)" : "PONTOS DE LUBRIFICAÇÃO TÍPICOS (GUINCHO/CABRESTANTE)"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {points.map(p => (
          <div key={p.id} onClick={() => setSel(sel === p.id ? null : p.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: sel === p.id ? `${C.orange}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel === p.id ? C.orange : "rgba(255,255,255,0.08)"}` }}>
            <div style={{ fontSize: 16 }}>{p.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{p.label[lang] || p.label.en}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "FRÉQUENCE INDICATIVE" : lang === "en" ? "INDICATIVE FREQUENCY" : lang === "es" ? "FRECUENCIA INDICATIVA" : "FREQUÊNCIA INDICATIVA"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {schedule.map((s, i) => (
          <div key={i} style={{ padding: "9px 12px", borderRadius: 10, background: `${s.color}12`, border: `1px solid ${s.color}44` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.freq[lang] || s.freq.en}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{s.desc[lang] || s.desc.en}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(201,146,42,0.1)", border: `1px solid ${C.gold}44`, fontSize: 11, color: C.gold2, lineHeight: 1.6 }}>
        {lang === "fr" ? "L'intervalle exact est fixé par le plan de maintenance du navire (PMS), pas une règle universelle figée." :
         lang === "en" ? "The exact interval is set by the vessel's Planned Maintenance System (PMS), not a fixed universal rule." :
         lang === "es" ? "El intervalo exacto lo fija el Plan de Mantenimiento del buque (PMS), no una regla universal fija." :
         "O intervalo exato é definido pelo Plano de Manutenção do navio (PMS), não uma regra universal fixa."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// MAINTENANCE TERMS TABLE — shared data (6 terms)
// ══════════════════════════════════════
const MAINT_TERMS = [
  { term: "Surface rust",
    meaning: { fr: "Rouille superficielle, généralement traitable par brossage/peinture", en: "Superficial rust, generally treatable by brushing/painting", es: "Óxido superficial, generalmente tratable mediante cepillado/pintura", pt: "Ferrugem superficial, geralmente tratável por escovagem/pintura" } },
  { term: "Pitting corrosion",
    meaning: { fr: "Corrosion localisée en piqûres, signal d'alerte plus sérieux", en: "Localized pitting corrosion, a more serious warning sign", es: "Corrosión localizada en picaduras, una señal de alerta más grave", pt: "Corrosão localizada em picadas, um sinal de alerta mais sério" } },
  { term: "Broken strand (wire)",
    meaning: { fr: "Fil rompu dans un toron de câble métallique — critère de mise hors service selon seuil", en: "A broken strand within a wire rope's lay — a threshold-based criterion for taking the wire out of service", es: "Un hilo roto dentro de un torón de cable metálico — un criterio, según umbral, para retirar el cable de servicio", pt: "Um fio partido num cordão de cabo metálico — um critério, consoante limiar, para retirar o cabo de serviço" } },
  { term: "Slack / play",
    meaning: { fr: "Jeu anormal dans un mécanisme, signe d'usure interne", en: "Abnormal play in a mechanism, a sign of internal wear", es: "Juego anormal en un mecanismo, señal de desgaste interno", pt: "Folga anormal num mecanismo, sinal de desgaste interno" } },
  { term: "Seized (grippé)",
    meaning: { fr: "Mécanisme bloqué faute de lubrification — situation à signaler, pas à forcer", en: "A mechanism blocked from lack of lubrication — a situation to report, not to force", es: "Un mecanismo bloqueado por falta de lubricación — una situación para informar, no para forzar", pt: "Um mecanismo bloqueado por falta de lubrificação — uma situação para reportar, não para forçar" } },
  { term: "Leakage",
    meaning: { fr: "Fuite d'huile, de graisse, ou hydraulique — signe d'anomalie à reconnaître et signaler", en: "An oil, grease, or hydraulic leak — a sign of an abnormality to recognize and report", es: "Una fuga de aceite, grasa o hidráulica — una señal de anomalía que hay que reconocer e informar", pt: "Uma fuga de óleo, massa ou hidráulica — um sinal de anomalia a reconhecer e reportar" } },
];

// ══════════════════════════════════════
// SVG 3 — READING WEAR & CORROSION
// ══════════════════════════════════════
function ReadingWearCorrosionSVG({ lang }) {
  const [sel, setSel] = useState(0);
  const t = MAINT_TERMS[sel];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {MAINT_TERMS.map((m, i) => (
          <div key={i} onClick={() => setSel(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: sel === i ? `${C.red}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel === i ? C.red : "rgba(255,255,255,0.08)"}` }}>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{m.term}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px", borderRadius: 12, background: `${C.red}12`, border: `1.5px solid ${C.red}44`, fontSize: 11, color: C.white, lineHeight: 1.7 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, fontWeight: 900, color: C.red, marginBottom: 6 }}>{t.term}</div>
        {t.meaning[lang] || t.meaning.en}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — MAINTENANCE VOCABULARY FLASHCARDS
// ══════════════════════════════════════
function MaintenanceFlashcardsSVG({ lang }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = MAINT_TERMS[idx];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {MAINT_TERMS.map((_, i) => (
          <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{
            flex: 1, height: 4, borderRadius: 4, cursor: "pointer",
            background: i === idx ? C.orange : i < idx ? `${C.orange}55` : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div onClick={() => setFlipped(f => !f)} style={{
        padding: "16px", borderRadius: 14, cursor: "pointer", minHeight: 120,
        background: flipped ? `${C.orange}18` : "rgba(0,0,0,0.4)",
        border: `2px solid ${flipped ? C.orange : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s ease", animation: "fadeUp 0.3s ease",
        display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 10 }}>
        {!flipped ? (
          <div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 8 }}>❓ {lang === "fr" ? "TERME" : lang === "en" ? "TERM" : lang === "es" ? "TÉRMINO" : "TERMO"} — {lang === "fr" ? "Touche pour la signification" : lang === "en" ? "Tap for meaning" : lang === "es" ? "Toca para el significado" : "Toque para o significado"}</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 15, color: C.white, fontWeight: 700, lineHeight: 1.5 }}>{card.term}</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 9, color: C.orange, letterSpacing: 2, marginBottom: 8 }}>✅ {lang === "fr" ? "SIGNIFICATION" : lang === "en" ? "MEANING" : lang === "es" ? "SIGNIFICADO" : "SIGNIFICADO"}</div>
            <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6 }}>{card.meaning[lang] || card.meaning.en}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setIdx(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={idx === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: idx === 0 ? C.muted : C.white, cursor: idx === 0 ? "default" : "pointer", fontSize: 11 }}>
          ◀ {lang === "fr" ? "Précédent" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Anterior"}
        </button>
        <button onClick={() => { setIdx(i => Math.min(MAINT_TERMS.length - 1, i + 1)); setFlipped(false); }} disabled={idx === MAINT_TERMS.length - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: idx === MAINT_TERMS.length - 1 ? "rgba(255,255,255,0.05)" : `${C.orange}22`, border: `1px solid ${idx === MAINT_TERMS.length - 1 ? "rgba(255,255,255,0.08)" : C.orange}`, color: C.white, cursor: idx === MAINT_TERMS.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// MAINTENANCE VOCABULARY QUIZ
// ══════════════════════════════════════
function MaintenanceVocabQuiz({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const situations = [
    { fr: "Vous remarquez une fine couche de décoloration orangée sur un raccord de pont, facilement enlevée à la brosse métallique.", en: "You notice a thin layer of orange discolouration on a deck fitting, easily removed with a wire brush.", es: "Observa una fina capa de decoloración anaranjada en un accesorio de cubierta, fácilmente eliminada con un cepillo metálico.", pt: "Repara numa fina camada de descoloração alaranjada num acessório do convés, facilmente removida com uma escova metálica." },
    { fr: "Vous remarquez de petites piqûres profondes dispersées sur une surface en acier — plus préoccupant qu'une simple rouille de surface.", en: "You notice small, deep pits scattered across a steel surface — more concerning than simple surface rust.", es: "Observa pequeñas picaduras profundas dispersas en una superficie de acero — más preocupante que un simple óxido superficial.", pt: "Repara em pequenas picadas profundas dispersas numa superfície de aço — mais preocupante do que uma simples ferrugem superficial." },
    { fr: "En inspectant un câble métallique, vous trouvez un fil rompu dans un des torons.", en: "While inspecting a wire rope, you find one broken wire within one of its strands.", es: "Al inspeccionar un cable metálico, encuentra un hilo roto en uno de los torones.", pt: "Ao inspecionar um cabo metálico, encontra um fio partido num dos cordões." },
    { fr: "Un mécanisme bouge plus que prévu quand vous le manipulez, sans résistance.", en: "A mechanism moves more than expected when handled, without resistance.", es: "Un mecanismo se mueve más de lo previsto al manipularlo, sin resistencia.", pt: "Um mecanismo move-se mais do que o esperado quando manipulado, sem resistência." },
    { fr: "Un mécanisme refuse de bouger, quelle que soit la force appliquée.", en: "A mechanism will not move at all, no matter how much force is applied.", es: "Un mecanismo se niega a moverse, sin importar la fuerza aplicada.", pt: "Um mecanismo recusa-se a mover, independentemente da força aplicada." },
    { fr: "Vous remarquez une flaque d'huile sous une pièce de machinerie de pont.", en: "You notice a pool of oil beneath a piece of deck machinery.", es: "Observa un charco de aceite bajo una pieza de maquinaria de cubierta.", pt: "Repara numa poça de óleo debaixo de uma peça de maquinaria do convés." },
  ];

  const M = (i) => MAINT_TERMS[i].term;
  const qs = [
    { situation: situations[0], opts: [M(0), M(1), M(4)], correct: 0 },
    { situation: situations[1], opts: [M(0), M(1), M(3)], correct: 1 },
    { situation: situations[2], opts: [M(2), M(3), M(5)], correct: 0 },
    { situation: situations[3], opts: [M(4), M(3), M(2)], correct: 1 },
    { situation: situations[4], opts: [M(3), M(4), M(0)], correct: 1 },
    { situation: situations[5], opts: [M(1), M(2), M(5)], correct: 2 },
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q)));
  const q = shuffled[qIdx];
  const pick = (i) => { if (ans !== null) return; setAns(i); if (i === q.correct) setScore(s => s + 1); };
  const next = () => { if (qIdx < qs.length - 1) { setQIdx(v => v + 1); setAns(null); } else setDone(true); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <div style={{ fontSize: 40 }}>{score >= 5 ? "🏆" : "📚"}</div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, color: C.white, margin: "8px 0" }}>{score}/{qs.length}</div>
      <button onClick={() => { setDone(false); setQIdx(0); setAns(null); setScore(0); }} style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: C.muted, cursor: "pointer", fontSize: 11 }}>🔄 {lang === "fr" ? "Recommencer" : lang === "en" ? "Retry" : lang === "es" ? "Reintentar" : "Repetir"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {qs.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i < qIdx ? C.orange : i === qIdx ? C.gold2 : "rgba(255,255,255,0.1)" }} />)}
      </div>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 12, padding: "14px", marginBottom: 12, border: `1px solid ${C.orange}33` }}>
        <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6 }}>{q.situation[lang] || q.situation.en}</div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 8 }}>
          {lang === "fr" ? "Quel terme correspond à cette observation ?" : lang === "en" ? "Which term matches this observation?" : lang === "es" ? "¿Qué término corresponde a esta observación?" : "Que termo corresponde a esta observação?"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)", bd = "rgba(255,255,255,0.1)";
          if (ans !== null) { if (i === q.correct) { bg = "rgba(30,138,74,0.2)"; bd = C.green; } else if (i === ans) { bg = "rgba(192,57,43,0.2)"; bd = C.red; } }
          return <button key={i} onClick={() => pick(i)} style={{ padding: "10px 12px", borderRadius: 12, background: bg, border: `1.5px solid ${bd}`, color: C.white, fontSize: 12, textAlign: "left", cursor: ans !== null ? "default" : "pointer", fontFamily: "'Courier New',monospace" }}>{opt}</button>;
        })}
      </div>
      {ans !== null && <button onClick={next} style={{ width: "100%", padding: "11px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.orange},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: C.navy, cursor: "pointer" }}>
        {qIdx < qs.length - 1 ? (lang === "fr" ? "SUIVANT →" : lang === "en" ? "NEXT →" : lang === "es" ? "SIGUIENTE →" : "PRÓXIMO →") : (lang === "fr" ? "TERMINER" : lang === "en" ? "FINISH" : lang === "es" ? "TERMINAR" : "TERMINAR")}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// SAFETY REMINDER (static block)
// ══════════════════════════════════════
function SafetyReminderBlock({ lang }) {
  const items = [
    { fr: "Isoler l'équipement si nécessaire", en: "Isolate the equipment if necessary", es: "Aislar el equipo si es necesario", pt: "Isolar o equipamento se necessário" },
    { fr: "Porter les EPI adaptés (gants, lunettes, chaussures de sécurité, casque selon le contexte)", en: "Wear appropriate PPE (gloves, eye protection, safety shoes, helmet depending on context)", es: "Usar el EPP adecuado (guantes, gafas, calzado de seguridad, casco según el contexto)", pt: "Usar o EPI adequado (luvas, óculos, calçado de segurança, capacete consoante o contexto)" },
    { fr: "Vérifier que l'équipement ne peut pas être actionné pendant l'intervention, selon les procédures du bord", en: "Verify the equipment cannot be operated during the intervention, per onboard procedures", es: "Verificar que el equipo no pueda accionarse durante la intervención, según los procedimientos de a bordo", pt: "Verificar que o equipamento não pode ser acionado durante a intervenção, de acordo com os procedimentos de bordo" },
    { fr: "Respecter les procédures de l'entreprise", en: "Follow company procedures", es: "Respetar los procedimientos de la empresa", pt: "Respeitar os procedimentos da empresa" },
  ];
  return (
    <Card style={{ border: `1px solid ${C.red}44`, background: "linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>⚠️</span>
        <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
          {lang === "fr" ? "RAPPEL SÉCURITÉ — AVANT TOUTE MAINTENANCE" : lang === "en" ? "SAFETY REMINDER — BEFORE ANY MAINTENANCE" : lang === "es" ? "RECORDATORIO DE SEGURIDAD — ANTES DE CUALQUIER MANTENIMIENTO" : "LEMBRETE DE SEGURANÇA — ANTES DE QUALQUER MANUTENÇÃO"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: C.white, lineHeight: 1.6 }}>
            <span style={{ color: C.red, fontWeight: 700 }}>•</span>{it[lang] || it.en}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ══════════════════════════════════════
// EXERCISE — BROKEN WIRE STRANDS
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [sel, setSel] = useState(null);

  const d = {
    fr: {
      situation: "En graissant un winch de mouillage, vous remarquez plusieurs fils cassés visibles sur le câble métallique associé.",
      task: "Que faites-vous ?",
      opts: ["Continuer à utiliser le winch normalement, les fils cassés sont mineurs", "Sécuriser la zone si nécessaire, informer immédiatement le Bosun (et l'OOW si requis), puis attendre les instructions", "Retirer vous-même le câble et le remplacer sans en parler", "Noter l'anomalie pour la mentionner à la prochaine relève d'équipe"],
      expl: "Ne jamais décider seul si l'équipement reste en service — sécuriser la zone si nécessaire, informer immédiatement le Bosun ou l'OOW selon les procédures du bord, puis attendre les instructions avant toute nouvelle utilisation de l'équipement. Le premier interlocuteur habituel est le Bosun, mais certains navires exigent aussi d'informer l'OOW sans délai lorsqu'un équipement critique est concerné.",
    },
    en: {
      situation: "While greasing an anchor winch, you notice several broken strands visible on the associated wire rope.",
      task: "What do you do?",
      opts: ["Keep using the winch normally, the broken strands are minor", "Secure the area if necessary, immediately inform the Bosun (and the OOW if required), then wait for instructions", "Remove and replace the wire yourself without mentioning it", "Note the abnormality to mention it at the next crew handover"],
      expl: "Never decide alone whether the equipment stays in service — secure the area if necessary, immediately inform the Bosun or the OOW according to onboard procedures, then wait for instructions before any further use of the equipment. The usual first point of contact is the Bosun, but some vessels also require informing the OOW without delay when critical equipment is involved.",
    },
    es: {
      situation: "Mientras engrasa un winche de anclas, observa varios hilos rotos visibles en el cable metálico asociado.",
      task: "¿Qué hace?",
      opts: ["Seguir usando el winche con normalidad, los hilos rotos son menores", "Asegurar la zona si es necesario, informar de inmediato al Bosun (y al OOW si se requiere), y luego esperar instrucciones", "Retirar y reemplazar usted mismo el cable sin comentarlo", "Anotar la anomalía para mencionarla en el próximo relevo de tripulación"],
      expl: "Nunca decidir solo si el equipo permanece en servicio — asegurar la zona si es necesario, informar de inmediato al Bosun o al OOW según los procedimientos de a bordo, y luego esperar instrucciones antes de volver a usar el equipo. El primer interlocutor habitual es el Bosun, pero algunos buques también exigen informar al OOW sin demora cuando se trata de un equipo crítico.",
    },
    pt: {
      situation: "Ao lubrificar um guincho de âncora, repara em vários fios partidos visíveis no cabo metálico associado.",
      task: "O que faz?",
      opts: ["Continuar a usar o guincho normalmente, os fios partidos são menores", "Segurar a área se necessário, informar de imediato o Bosun (e o OOW se exigido), e depois aguardar instruções", "Retirar e substituir você mesmo o cabo sem falar nisso", "Anotar a anomalia para a mencionar na próxima rendição de equipa"],
      expl: "Nunca decidir sozinho se o equipamento permanece em serviço — segurar a área se necessário, informar de imediato o Bosun ou o OOW de acordo com os procedimentos de bordo, e depois aguardar instruções antes de qualquer nova utilização do equipamento. O primeiro interlocutor habitual é o Bosun, mas alguns navios também exigem informar o OOW sem demora quando está envolvido equipamento crítico.",
    },
  };
  const c = d[lang] || d.en;
  const correctIdx = 1;

  return (
    <div>
      <div style={{ fontSize: 12, color: C.white, lineHeight: 1.7, marginBottom: 10, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 12px" }}>{c.situation}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.gold2, marginBottom: 10 }}>{c.task}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {c.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)", bd = "rgba(255,255,255,0.1)";
          if (sel !== null) { if (i === correctIdx) { bg = "rgba(30,138,74,0.2)"; bd = C.green; } else if (i === sel) { bg = "rgba(192,57,43,0.2)"; bd = C.red; } }
          return <button key={i} onClick={() => sel === null && setSel(i)} style={{ padding: "10px 12px", borderRadius: 12, background: bg, border: `1.5px solid ${bd}`, color: C.white, fontSize: 12, textAlign: "left", cursor: sel === null ? "pointer" : "default", lineHeight: 1.5 }}>{opt}</button>;
        })}
      </div>
      {sel !== null && <div style={{ padding: "12px", borderRadius: 12, background: "rgba(30,138,74,0.1)", border: `1px solid ${C.green}44`, fontSize: 11, color: C.white, lineHeight: 1.7 }}>{c.expl}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// QUESTION BANK — 16 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  en: [
    { q: "Why is a piece of equipment inspected before greasing, rather than after?", opts: ["It saves grease", "So an existing problem can be detected before it is masked under a fresh layer of grease", "It is only a habit with no real purpose", "It shortens the maintenance round"], correct: 1, expl: "Inspecting before acting allows an existing problem to be detected before it is masked under a fresh layer of grease." },
    { q: "What does \"pitting corrosion\" mean?", opts: ["Surface rust treatable by brushing", "Localized pitting corrosion, a more serious warning sign than surface rust", "Abnormal play in a mechanism", "A hydraulic leak"], correct: 1, expl: "Pitting corrosion is localized corrosion in pits — a more serious warning sign than simple surface rust." },
    { q: "Is abnormal play (slack) in a mechanism always harmless?", opts: ["Yes, it is always normal", "No, it is a sign of internal wear that should be reported", "Only dangerous if the mechanism is new", "Only dangerous at night"], correct: 1, expl: "Slack / play is abnormal play in a mechanism, a sign of internal wear — not something to be dismissed as harmless." },
    { q: "Who decides whether a damaged wire rope must be taken out of service?", opts: ["The AB who discovered it", "Not the AB alone — a higher level of responsibility (Bosun/OOW) decides, based on a precise report", "Any crew member available", "No formal decision is needed"], correct: 1, expl: "The decision to take a critical piece of equipment out of service always belongs to a higher level of responsibility, never to the rating alone." },
    { q: "What must the AB do if he discovers broken strands on a wire?", opts: ["Keep working normally", "Secure the area if necessary and report precisely to the Bosun (and OOW if required), without deciding alone", "Repair it himself", "Ignore it if the number of broken strands seems small"], correct: 1, expl: "The AB must secure the area if necessary, report precisely to the Bosun (and the OOW if required), and never decide alone whether the equipment stays in service." },
    { q: "Why should a lubrication point never be over-greased?", opts: ["Over-greasing has no negative effect", "Respecting the intended quantity — not too much, not too little — is part of good practice", "It only matters for wire ropes", "It always speeds up grease consumption"], correct: 1, expl: "Grease must be applied to the designated points — not too much, not too little — never \"at random.\"" },
    { q: "What is the PMS (Planned Maintenance System)?", opts: ["An informal personal notebook", "The vessel's maintenance plan, which sets the intervals and products to use, specific to each ship", "A single international standard applied identically everywhere", "A system used only in the engine room"], correct: 1, expl: "The exact interval and product to use is set by the vessel's Planned Maintenance System (PMS), not a fixed universal rule." },
    { q: "Should a seized mechanism be forced to keep functioning?", opts: ["Yes, with enough grease", "No, it is a situation to report, not to force", "Yes, only in an emergency", "Yes, if the Bosun is unavailable"], correct: 1, expl: "A seized mechanism is blocked from lack of lubrication — a situation to report, not to force." },
    { q: "Why is the greasing frequency not universal for all vessels?", opts: ["It actually is universal", "Because the exact interval is set by the vessel's PMS, not a fixed universal rule", "It only depends on the weather", "It is fixed only by the wire manufacturer"], correct: 1, expl: "The exact interval is set by the vessel's Planned Maintenance System (PMS), not a fixed universal rule." },
    { q: "What is the difference between \"surface rust\" and \"pitting corrosion\"?", opts: ["They are equivalent in severity", "Surface rust is generally treatable by brushing/painting, while pitting corrosion is a more serious warning sign", "Surface rust is always more serious", "Pitting corrosion is only treated by brushing"], correct: 1, expl: "Surface rust is generally treatable by brushing/painting, while pitting corrosion is a more serious, localized warning sign." },
    { q: "Why must greasing equipment be properly stowed away after use?", opts: ["It has no real importance", "To keep the work area safe and ready for the next task, avoiding slip or contamination hazards", "Only to save space", "Only because it looks tidy"], correct: 1, expl: "Proper stowage of maintenance equipment keeps the work area safe and ready, avoiding slip and contamination hazards for the next task." },
    { q: "What is the risk of ignoring an early sign of corrosion?", opts: ["There is no real risk", "It can develop into a more serious and costly problem, or a failure, if not addressed early", "It only affects appearance", "It only matters for wire ropes"], correct: 1, expl: "An early sign of corrosion left unreported can develop into a more serious, costlier problem — this is exactly why early reporting matters." },
    { q: "What should a good abnormality report to a Bosun include?", opts: ["Only the time it was noticed", "What, where, and in what apparent condition — a precise description, not a vague remark", "Nothing, it can wait", "Only a general sense that something seems wrong"], correct: 1, expl: "A good report is precise: what, where, in what apparent condition — not a vague remark." },
    { q: "Why does lubrication prevent premature wear?", opts: ["It has no mechanical effect", "By reducing friction between moving parts, it limits the mechanism's progressive wear", "It only prevents rust, not wear", "It only matters for wire ropes"], correct: 1, expl: "By reducing friction between a mechanism's moving parts, lubrication limits its progressive wear." },
    { q: "Can an AB decide alone that equipment is still safe to use despite a doubt?", opts: ["Yes, if experienced", "No — in case of doubt, he must report and wait for instructions rather than deciding alone", "Yes, if it seems minor", "Yes, if the Bosun is unavailable"], correct: 1, expl: "In case of doubt, the AB must report and wait for instructions rather than deciding alone whether equipment stays in service." },
    { q: "Why doesn't a visual inspection replace the Planned Maintenance System?", opts: ["Because a visual inspection is always more thorough", "Because the PMS defines systematic intervals, products and procedures, while a one-off visual inspection only detects what is visible at that precise moment", "Because the PMS only concerns paperwork", "There is no real difference between the two"], correct: 1, expl: "The PMS defines systematic intervals, products and procedures across the vessel's whole maintenance plan, while a one-off visual inspection only catches what happens to be visible at that specific moment." },
  ],
  fr: [
    { q: "Pourquoi inspecte-t-on un équipement avant de le graisser, plutôt qu'après ?", opts: ["Cela économise de la graisse", "Pour détecter un problème existant avant qu'il ne soit masqué sous une nouvelle couche de graisse", "Ce n'est qu'une habitude sans réelle utilité", "Cela raccourcit la ronde de maintenance"], correct: 1, expl: "Inspecter avant d'agir permet de détecter un problème existant avant de le masquer sous une nouvelle couche de graisse." },
    { q: "Que signifie \"pitting corrosion\" ?", opts: ["Rouille de surface traitable au brossage", "Corrosion localisée en piqûres, un signal d'alerte plus sérieux que la rouille superficielle", "Jeu anormal dans un mécanisme", "Une fuite hydraulique"], correct: 1, expl: "La pitting corrosion est une corrosion localisée en piqûres — un signal d'alerte plus sérieux qu'une simple rouille de surface." },
    { q: "Un jeu anormal (play) dans un mécanisme est-il toujours sans danger ?", opts: ["Oui, c'est toujours normal", "Non, c'est un signe d'usure interne qui doit être signalé", "Seulement dangereux si le mécanisme est neuf", "Seulement dangereux la nuit"], correct: 1, expl: "Le slack/play est un jeu anormal dans un mécanisme, signe d'usure interne — pas quelque chose à écarter comme anodin." },
    { q: "Qui décide si un câble métallique endommagé doit être mis hors service ?", opts: ["L'AB qui l'a découvert", "Pas l'AB seul — un niveau de responsabilité supérieur (Bosun/OOW) décide, sur la base d'un rapport précis", "N'importe quel membre d'équipage disponible", "Aucune décision formelle n'est nécessaire"], correct: 1, expl: "La décision de mise hors service d'un équipement critique revient toujours à un niveau de responsabilité supérieur, jamais au rating seul." },
    { q: "Que doit faire l'AB s'il découvre des fils cassés sur un câble ?", opts: ["Continuer le travail normalement", "Sécuriser la zone si nécessaire et rapporter précisément au Bosun (et à l'OOW si requis), sans décider seul", "Le réparer lui-même", "L'ignorer si le nombre de fils cassés semble faible"], correct: 1, expl: "L'AB doit sécuriser la zone si nécessaire, rapporter précisément au Bosun (et à l'OOW si requis), et ne jamais décider seul si l'équipement reste en service." },
    { q: "Pourquoi ne faut-il pas sur-graisser un point de lubrification ?", opts: ["Le sur-graissage n'a aucun effet négatif", "Respecter la quantité prévue — pas trop, pas trop peu — fait partie de la bonne pratique", "Cela ne compte que pour les câbles", "Cela accélère toujours la consommation de graisse"], correct: 1, expl: "La graisse doit être appliquée aux points désignés — pas trop, pas trop peu — jamais \"au hasard\"." },
    { q: "Qu'est-ce que le PMS (Planned Maintenance System) ?", opts: ["Un simple carnet personnel informel", "Le plan de maintenance du navire, qui fixe les intervalles et produits à utiliser, propre à chaque navire", "Une norme internationale unique appliquée identiquement partout", "Un système réservé à la salle des machines"], correct: 1, expl: "L'intervalle et le produit exacts à utiliser sont fixés par le plan de maintenance du navire (PMS), pas une règle universelle figée." },
    { q: "Un équipement grippé doit-il être forcé pour continuer à fonctionner ?", opts: ["Oui, avec suffisamment de graisse", "Non, c'est une situation à signaler, pas à forcer", "Oui, en cas d'urgence uniquement", "Oui, si le Bosun n'est pas disponible"], correct: 1, expl: "Un mécanisme grippé est bloqué faute de lubrification — une situation à signaler, pas à forcer." },
    { q: "Pourquoi la fréquence de graissage n'est-elle pas universelle pour tous les navires ?", opts: ["Elle l'est en réalité, toujours identique", "Parce que l'intervalle exact est fixé par le PMS du navire, pas une règle universelle figée", "Elle dépend uniquement de la météo", "Elle est fixée uniquement par le fabricant du câble"], correct: 1, expl: "L'intervalle exact est fixé par le plan de maintenance du navire (PMS), pas une règle universelle figée." },
    { q: "Que signifie \"surface rust\" par rapport à \"pitting corrosion\" ?", opts: ["Elles sont équivalentes en gravité", "La rouille superficielle est généralement traitable par brossage/peinture, tandis que la pitting corrosion est un signal d'alerte plus sérieux", "La surface rust est toujours plus grave", "La pitting corrosion se traite uniquement par brossage"], correct: 1, expl: "La rouille superficielle est généralement traitable par brossage/peinture, tandis que la pitting corrosion est un signal d'alerte plus sérieux et localisé." },
    { q: "Pourquoi faut-il ranger correctement le matériel de graissage après usage ?", opts: ["Cela n'a pas de réelle importance", "Pour maintenir un espace de travail sûr et prêt pour la prochaine intervention, en évitant les risques de glissade ou de contamination", "Uniquement pour gagner de la place", "Uniquement pour que ce soit propre visuellement"], correct: 1, expl: "Un rangement correct du matériel de maintenance maintient un espace de travail sûr et prêt, évitant les risques de glissade et de contamination pour la tâche suivante." },
    { q: "Quel est le risque d'ignorer un signe précoce de corrosion ?", opts: ["Il n'y a pas de réel risque", "Il peut évoluer vers un problème plus grave et coûteux, voire une défaillance, s'il n'est pas traité tôt", "Cela n'affecte que l'apparence", "Cela ne compte que pour les câbles"], correct: 1, expl: "Un signe précoce de corrosion non signalé peut évoluer vers un problème plus grave et coûteux — c'est exactement pourquoi le signalement précoce compte." },
    { q: "Que doit inclure un bon rapport d'anomalie à un Bosun ?", opts: ["Uniquement l'heure de l'observation", "Quoi, où, dans quel état apparent — une description précise, pas une remarque vague", "Rien, cela peut attendre", "Uniquement une impression générale que quelque chose semble anormal"], correct: 1, expl: "Un bon rapport est précis : quoi, où, dans quel état apparent — pas une remarque vague." },
    { q: "Pourquoi la lubrification prévient-elle l'usure prématurée ?", opts: ["Elle n'a aucun effet mécanique", "En réduisant la friction entre les pièces mobiles, elle limite l'usure progressive du mécanisme", "Elle ne prévient que la rouille, pas l'usure", "Cela ne compte que pour les câbles"], correct: 1, expl: "En réduisant la friction entre les pièces mobiles d'un mécanisme, la lubrification limite son usure progressive." },
    { q: "Un AB peut-il décider seul qu'un équipement est encore sûr à utiliser malgré un doute ?", opts: ["Oui, s'il est expérimenté", "Non — en cas de doute, il doit signaler et attendre les instructions plutôt que de décider seul", "Oui, si cela semble mineur", "Oui, si le Bosun n'est pas disponible"], correct: 1, expl: "En cas de doute, l'AB doit signaler et attendre les instructions plutôt que de décider seul si l'équipement reste en service." },
    { q: "Pourquoi une inspection visuelle ne remplace-t-elle pas le Planned Maintenance System ?", opts: ["Parce qu'une inspection visuelle est toujours plus complète", "Parce que le PMS définit des intervalles, produits et procédures systématiques, alors qu'une inspection visuelle ponctuelle ne détecte que ce qui est visible à ce moment précis", "Parce que le PMS ne concerne que la paperasse", "Il n'y a pas de réelle différence entre les deux"], correct: 1, expl: "Le PMS définit des intervalles, produits et procédures systématiques sur l'ensemble du plan de maintenance du navire, tandis qu'une inspection visuelle ponctuelle ne détecte que ce qui se trouve visible à cet instant précis." },
  ],
  es: [
    { q: "¿Por qué se inspecciona un equipo antes de engrasarlo, en lugar de después?", opts: ["Ahorra grasa", "Para detectar un problema existente antes de que quede oculto bajo una nueva capa de grasa", "Es solo una costumbre sin utilidad real", "Acorta la ronda de mantenimiento"], correct: 1, expl: "Inspeccionar antes de actuar permite detectar un problema existente antes de que quede oculto bajo una nueva capa de grasa." },
    { q: "¿Qué significa \"pitting corrosion\"?", opts: ["Óxido superficial tratable con cepillado", "Corrosión localizada en picaduras, una señal de alerta más grave que el óxido superficial", "Juego anormal en un mecanismo", "Una fuga hidráulica"], correct: 1, expl: "La pitting corrosion es una corrosión localizada en picaduras — una señal de alerta más grave que un simple óxido superficial." },
    { q: "¿Un juego anormal (play) en un mecanismo es siempre inofensivo?", opts: ["Sí, siempre es normal", "No, es una señal de desgaste interno que debe informarse", "Solo es peligroso si el mecanismo es nuevo", "Solo es peligroso de noche"], correct: 1, expl: "El slack/play es un juego anormal en un mecanismo, señal de desgaste interno — no algo que deba descartarse como inofensivo." },
    { q: "¿Quién decide si un cable metálico dañado debe retirarse de servicio?", opts: ["El AB que lo descubrió", "No el AB solo — un nivel de responsabilidad superior (Bosun/OOW) decide, basándose en un informe preciso", "Cualquier miembro de la tripulación disponible", "No se necesita una decisión formal"], correct: 1, expl: "La decisión de retirar de servicio un equipo crítico corresponde siempre a un nivel de responsabilidad superior, nunca al marinero solo." },
    { q: "¿Qué debe hacer el AB si descubre hilos rotos en un cable?", opts: ["Continuar el trabajo con normalidad", "Asegurar la zona si es necesario e informar con precisión al Bosun (y al OOW si se requiere), sin decidir solo", "Repararlo él mismo", "Ignorarlo si el número de hilos rotos parece pequeño"], correct: 1, expl: "El AB debe asegurar la zona si es necesario, informar con precisión al Bosun (y al OOW si se requiere), y nunca decidir solo si el equipo permanece en servicio." },
    { q: "¿Por qué no hay que sobre-engrasar un punto de lubricación?", opts: ["El sobre-engrase no tiene ningún efecto negativo", "Respetar la cantidad prevista — ni demasiado ni demasiado poco — forma parte de la buena práctica", "Solo importa para los cables", "Siempre acelera el consumo de grasa"], correct: 1, expl: "La grasa debe aplicarse en los puntos designados — ni demasiado ni demasiado poco — nunca \"al azar\"." },
    { q: "¿Qué es el PMS (Planned Maintenance System)?", opts: ["Un simple cuaderno personal informal", "El plan de mantenimiento del buque, que fija los intervalos y productos a usar, propio de cada buque", "Una única norma internacional aplicada idénticamente en todas partes", "Un sistema reservado a la sala de máquinas"], correct: 1, expl: "El intervalo y el producto exactos a usar los fija el Plan de Mantenimiento del buque (PMS), no una regla universal fija." },
    { q: "¿Un equipo agarrotado debe forzarse para seguir funcionando?", opts: ["Sí, con suficiente grasa", "No, es una situación para informar, no para forzar", "Sí, solo en caso de emergencia", "Sí, si el Bosun no está disponible"], correct: 1, expl: "Un mecanismo agarrotado está bloqueado por falta de lubricación — una situación para informar, no para forzar." },
    { q: "¿Por qué la frecuencia de engrase no es universal para todos los buques?", opts: ["En realidad sí lo es, siempre igual", "Porque el intervalo exacto lo fija el PMS del buque, no una regla universal fija", "Solo depende del clima", "La fija únicamente el fabricante del cable"], correct: 1, expl: "El intervalo exacto lo fija el Plan de Mantenimiento del buque (PMS), no una regla universal fija." },
    { q: "¿Qué significa \"surface rust\" en comparación con \"pitting corrosion\"?", opts: ["Son equivalentes en gravedad", "El óxido superficial es generalmente tratable mediante cepillado/pintura, mientras que la pitting corrosion es una señal de alerta más grave", "El óxido superficial siempre es más grave", "La pitting corrosion solo se trata con cepillado"], correct: 1, expl: "El óxido superficial es generalmente tratable mediante cepillado/pintura, mientras que la pitting corrosion es una señal de alerta más grave y localizada." },
    { q: "¿Por qué hay que guardar correctamente el material de engrase después de usarlo?", opts: ["No tiene ninguna importancia real", "Para mantener un espacio de trabajo seguro y listo para la siguiente tarea, evitando riesgos de resbalón o contaminación", "Solo para ahorrar espacio", "Solo para que se vea ordenado"], correct: 1, expl: "Guardar correctamente el material de mantenimiento mantiene un espacio de trabajo seguro y listo, evitando riesgos de resbalón y contaminación para la siguiente tarea." },
    { q: "¿Cuál es el riesgo de ignorar una señal temprana de corrosión?", opts: ["No hay un riesgo real", "Puede evolucionar hacia un problema más grave y costoso, o incluso un fallo, si no se trata a tiempo", "Solo afecta a la apariencia", "Solo importa para los cables"], correct: 1, expl: "Una señal temprana de corrosión no informada puede evolucionar hacia un problema más grave y costoso — exactamente por eso importa informar pronto." },
    { q: "¿Qué debe incluir un buen informe de anomalía a un Bosun?", opts: ["Solo la hora en que se observó", "Qué, dónde, en qué estado aparente — una descripción precisa, no un comentario vago", "Nada, puede esperar", "Solo una impresión general de que algo parece anormal"], correct: 1, expl: "Un buen informe es preciso: qué, dónde, en qué estado aparente — no un comentario vago." },
    { q: "¿Por qué la lubricación previene el desgaste prematuro?", opts: ["No tiene ningún efecto mecánico", "Al reducir la fricción entre las piezas móviles, limita el desgaste progresivo del mecanismo", "Solo previene el óxido, no el desgaste", "Solo importa para los cables"], correct: 1, expl: "Al reducir la fricción entre las piezas móviles de un mecanismo, la lubricación limita su desgaste progresivo." },
    { q: "¿Puede un AB decidir solo que un equipo sigue siendo seguro de usar a pesar de una duda?", opts: ["Sí, si tiene experiencia", "No — en caso de duda, debe informar y esperar instrucciones en lugar de decidir solo", "Sí, si parece menor", "Sí, si el Bosun no está disponible"], correct: 1, expl: "En caso de duda, el AB debe informar y esperar instrucciones en lugar de decidir solo si el equipo permanece en servicio." },
    { q: "¿Por qué una inspección visual no sustituye al Planned Maintenance System?", opts: ["Porque una inspección visual siempre es más completa", "Porque el PMS define intervalos, productos y procedimientos sistemáticos, mientras que una inspección visual puntual solo detecta lo visible en ese momento preciso", "Porque el PMS solo concierne al papeleo", "No hay una diferencia real entre ambos"], correct: 1, expl: "El PMS define intervalos, productos y procedimientos sistemáticos en todo el plan de mantenimiento del buque, mientras que una inspección visual puntual solo detecta lo que resulta visible en ese momento preciso." },
  ],
  pt: [
    { q: "Por que se inspeciona um equipamento antes de o lubrificar, em vez de depois?", opts: ["Poupa massa lubrificante", "Para detetar um problema existente antes de ficar mascarado sob uma nova camada de massa", "É apenas um hábito sem utilidade real", "Encurta a ronda de manutenção"], correct: 1, expl: "Inspecionar antes de agir permite detetar um problema existente antes de ficar mascarado sob uma nova camada de massa lubrificante." },
    { q: "O que significa \"pitting corrosion\"?", opts: ["Ferrugem superficial tratável por escovagem", "Corrosão localizada em picadas, um sinal de alerta mais sério do que a ferrugem superficial", "Folga anormal num mecanismo", "Uma fuga hidráulica"], correct: 1, expl: "A pitting corrosion é uma corrosão localizada em picadas — um sinal de alerta mais sério do que uma simples ferrugem superficial." },
    { q: "Uma folga anormal (play) num mecanismo é sempre inofensiva?", opts: ["Sim, é sempre normal", "Não, é um sinal de desgaste interno que deve ser reportado", "Só é perigosa se o mecanismo for novo", "Só é perigosa à noite"], correct: 1, expl: "O slack/play é uma folga anormal num mecanismo, sinal de desgaste interno — não algo a descartar como inofensivo." },
    { q: "Quem decide se um cabo metálico danificado deve ser retirado de serviço?", opts: ["O AB que o descobriu", "Não o AB sozinho — um nível de responsabilidade superior (Bosun/OOW) decide, com base num relatório preciso", "Qualquer membro da tripulação disponível", "Não é necessária nenhuma decisão formal"], correct: 1, expl: "A decisão de retirar de serviço um equipamento crítico pertence sempre a um nível de responsabilidade superior, nunca ao marinheiro sozinho." },
    { q: "O que deve fazer o AB se descobrir fios partidos num cabo?", opts: ["Continuar o trabalho normalmente", "Segurar a área se necessário e reportar com precisão ao Bosun (e ao OOW se exigido), sem decidir sozinho", "Repará-lo ele próprio", "Ignorá-lo se o número de fios partidos parecer pequeno"], correct: 1, expl: "O AB deve segurar a área se necessário, reportar com precisão ao Bosun (e ao OOW se exigido), e nunca decidir sozinho se o equipamento permanece em serviço." },
    { q: "Por que não se deve sobre-lubrificar um ponto de lubrificação?", opts: ["A sobre-lubrificação não tem nenhum efeito negativo", "Respeitar a quantidade prevista — nem demais, nem de menos — faz parte da boa prática", "Só importa para os cabos", "Acelera sempre o consumo de massa"], correct: 1, expl: "A massa deve ser aplicada nos pontos designados — nem demais, nem de menos — nunca \"ao acaso\"." },
    { q: "O que é o PMS (Planned Maintenance System)?", opts: ["Um simples caderno pessoal informal", "O plano de manutenção do navio, que fixa os intervalos e produtos a usar, próprio de cada navio", "Uma única norma internacional aplicada de forma idêntica em todo o lado", "Um sistema reservado à casa das máquinas"], correct: 1, expl: "O intervalo e o produto exatos a usar são fixados pelo Plano de Manutenção do navio (PMS), não uma regra universal fixa." },
    { q: "Um equipamento empancado deve ser forçado para continuar a funcionar?", opts: ["Sim, com massa suficiente", "Não, é uma situação para reportar, não para forçar", "Sim, só em caso de emergência", "Sim, se o Bosun não estiver disponível"], correct: 1, expl: "Um mecanismo empancado está bloqueado por falta de lubrificação — uma situação para reportar, não para forçar." },
    { q: "Por que a frequência de lubrificação não é universal para todos os navios?", opts: ["Na realidade é, sempre igual", "Porque o intervalo exato é fixado pelo PMS do navio, não uma regra universal fixa", "Depende só do clima", "É fixada apenas pelo fabricante do cabo"], correct: 1, expl: "O intervalo exato é fixado pelo Plano de Manutenção do navio (PMS), não uma regra universal fixa." },
    { q: "O que significa \"surface rust\" em relação a \"pitting corrosion\"?", opts: ["São equivalentes em gravidade", "A ferrugem superficial é geralmente tratável por escovagem/pintura, enquanto a pitting corrosion é um sinal de alerta mais sério", "A surface rust é sempre mais grave", "A pitting corrosion só se trata por escovagem"], correct: 1, expl: "A ferrugem superficial é geralmente tratável por escovagem/pintura, enquanto a pitting corrosion é um sinal de alerta mais sério e localizado." },
    { q: "Por que é preciso arrumar corretamente o material de lubrificação após o uso?", opts: ["Não tem nenhuma importância real", "Para manter um espaço de trabalho seguro e pronto para a próxima tarefa, evitando riscos de escorregamento ou contaminação", "Só para poupar espaço", "Só para ficar visualmente arrumado"], correct: 1, expl: "Arrumar corretamente o material de manutenção mantém um espaço de trabalho seguro e pronto, evitando riscos de escorregamento e contaminação para a próxima tarefa." },
    { q: "Qual é o risco de ignorar um sinal precoce de corrosão?", opts: ["Não há um risco real", "Pode evoluir para um problema mais grave e dispendioso, ou uma falha, se não for tratado cedo", "Só afeta a aparência", "Só importa para os cabos"], correct: 1, expl: "Um sinal precoce de corrosão não reportado pode evoluir para um problema mais grave e dispendioso — é exatamente por isso que o reporte precoce importa." },
    { q: "O que deve incluir um bom relatório de anomalia a um Bosun?", opts: ["Só a hora em que foi observado", "O quê, onde, em que estado aparente — uma descrição precisa, não um comentário vago", "Nada, pode esperar", "Só uma impressão geral de que algo parece anormal"], correct: 1, expl: "Um bom relatório é preciso: o quê, onde, em que estado aparente — não um comentário vago." },
    { q: "Por que a lubrificação previne o desgaste prematuro?", opts: ["Não tem nenhum efeito mecânico", "Ao reduzir o atrito entre as peças móveis, limita o desgaste progressivo do mecanismo", "Só previne a ferrugem, não o desgaste", "Só importa para os cabos"], correct: 1, expl: "Ao reduzir o atrito entre as peças móveis de um mecanismo, a lubrificação limita o seu desgaste progressivo." },
    { q: "Pode um AB decidir sozinho que um equipamento ainda é seguro de usar apesar de uma dúvida?", opts: ["Sim, se for experiente", "Não — em caso de dúvida, deve reportar e aguardar instruções em vez de decidir sozinho", "Sim, se parecer menor", "Sim, se o Bosun não estiver disponível"], correct: 1, expl: "Em caso de dúvida, o AB deve reportar e aguardar instruções em vez de decidir sozinho se o equipamento permanece em serviço." },
    { q: "Por que uma inspeção visual não substitui o Planned Maintenance System?", opts: ["Porque uma inspeção visual é sempre mais completa", "Porque o PMS define intervalos, produtos e procedimentos sistemáticos, enquanto uma inspeção visual pontual só deteta o que está visível nesse momento preciso", "Porque o PMS só diz respeito à papelada", "Não há uma diferença real entre os dois"], correct: 1, expl: "O PMS define intervalos, produtos e procedimentos sistemáticos em todo o plano de manutenção do navio, enquanto uma inspeção visual pontual só deteta o que se encontra visível nesse momento preciso." },
  ],
};

// Final quiz — 5 questions selected from the 16-question bank (indices 0,3,6,12,14)
const QUIZ_INDICES = [0, 3, 6, 12, 14];
const buildQuiz = (lang) => {
  const bank = BANK[lang] || BANK.en;
  return QUIZ_INDICES.map(i => bank[i]);
};

const getContent = lang => {
  const d = {
    en: {
      badge: "📚 Seamanship · Lesson 6/6 · ⭐ Premium · 200 XP · 🏁 MODULE COMPLETE",
      title: "Basic Maintenance & Greasing",
      intro: "Deck maintenance is not a mechanical specialty — it is inspection, routine upkeep, preservation and reporting, kept within the first level of intervention. Recognising early wear or damage, and reporting it precisely, is what keeps deck equipment reliable and safe.\n\nThis lesson covers a deck maintenance round from assignment to report, typical lubrication points and schedules, and the key terms used to describe wear and corrosion.",
      p1: "PART 1 — DECK MAINTENANCE ROUNDS SIMULATOR",
      s1: "DECK MAINTENANCE ROUND:\n\nAssignment given → winch inspected before greasing →\ngrease applied to designated points → wire rope inspected →\nabnormality discovered → reported precisely to the Bosun.\n\nA complete maintenance operation: inspect, clean if necessary, lubricate, observe, report.",
      p2: "PART 2 — LUBRICATION POINTS & SCHEDULE",
      s2: "LUBRICATION POINTS & SCHEDULE:\n\nTypical points: bearings, gears, wire rope & drum,\nbrake mechanism, pins & shackles.\n\nIndicative frequency: daily / weekly / monthly\naccording to equipment type.\n\nThe exact interval is always set by the vessel's PMS —\nnever a fixed universal rule.",
      p3: "PART 3 — READING WEAR & CORROSION",
      s3: "KEY TERMS:\n\nSurface rust · Pitting corrosion ·\nBroken strand (wire) · Slack / play ·\nSeized (grippé) · Leakage.\n\nEach term signals a different level of concern —\nfrom routine treatment to a reportable abnormality.",
      p4: "PART 4 — MAINTENANCE VOCABULARY FLASHCARDS",
      p5: "PART 5 — MAINTENANCE VOCABULARY QUIZ",
      p6: "🎯 EXERCISE", p7: "📝 QUESTION BANK — 16 QUESTIONS",
      sumT: "SUMMARY — BASIC MAINTENANCE & GREASING",
      sumP: [
        "A maintenance operation always begins with observing, then cleaning if necessary, inspecting, and finally lubricating in accordance with procedures.",
        "Corrosion, wear and leaks must be reported early — never wait for the next planned inspection.",
        "Suspect equipment (damaged wire, seized mechanism) is never put back into service by the rating's decision alone.",
        "A good abnormality report is precise: what, where, in what apparent condition.",
        "Regular preventive maintenance avoids costly corrective maintenance.",
      ],
      learnedP: [
        "A deck maintenance round: assignment, inspection, greasing, wire inspection, reporting",
        "Typical lubrication points and indicative schedules — always governed by the ship's PMS",
        "Key wear and corrosion terms: surface rust, pitting corrosion, broken strand, slack, seized, leakage",
        "Safety basics before any maintenance: isolation, PPE, verification, company procedures",
        "When and how to report a suspect piece of equipment, without deciding alone",
      ],
    },
    fr: {
      badge: "📚 Seamanship · Leçon 6/6 · ⭐ Premium · 200 XP · 🏁 FIN DU MODULE",
      title: "Maintenance de Base & Graissage",
      intro: "La maintenance de pont n'est pas une spécialité mécanique — c'est de l'inspection, de l'entretien courant, de la préservation et du signalement, dans les limites du premier niveau d'intervention. Reconnaître tôt une usure ou un dommage, et le signaler précisément, est ce qui maintient le matériel de pont fiable et sûr.\n\nCette leçon couvre une ronde de maintenance de pont de l'ordre de mission au rapport, les points et fréquences de graissage typiques, et les termes clés utilisés pour décrire l'usure et la corrosion.",
      p1: "PARTIE 1 — SIMULATEUR RONDE DE MAINTENANCE",
      s1: "RONDE DE MAINTENANCE DE PONT :\n\nOrdre de mission → winch inspecté avant graissage →\ngraisse appliquée aux points désignés → câble métallique inspecté →\nanomalie découverte → rapportée précisément au Bosun.\n\nUne maintenance complète : inspecter, nettoyer si nécessaire, lubrifier, observer, rendre compte.",
      p2: "PARTIE 2 — POINTS & FRÉQUENCE DE GRAISSAGE",
      s2: "POINTS & FRÉQUENCE DE GRAISSAGE :\n\nPoints typiques : roulements, engrenages, câble & tambour,\nmécanisme de frein, axes & manilles.\n\nFréquence indicative : quotidien / hebdomadaire / mensuel\nselon le type d'équipement.\n\nL'intervalle exact est toujours fixé par le PMS du navire —\njamais une règle universelle figée.",
      p3: "PARTIE 3 — LIRE L'USURE & LA CORROSION",
      s3: "TERMES CLÉS :\n\nSurface rust · Pitting corrosion ·\nBroken strand (wire) · Slack / play ·\nSeized (grippé) · Leakage.\n\nChaque terme signale un niveau de préoccupation différent —\nd'un traitement courant à une anomalie à signaler.",
      p4: "PARTIE 4 — FICHES VOCABULAIRE MAINTENANCE",
      p5: "PARTIE 5 — QUIZ VOCABULAIRE MAINTENANCE",
      p6: "🎯 EXERCICE", p7: "📝 BANQUE 16 QUESTIONS",
      sumT: "RÉSUMÉ — MAINTENANCE DE BASE & GRAISSAGE",
      sumP: [
        "Une opération de maintenance commence toujours par observer, puis nettoyer si nécessaire, inspecter et enfin lubrifier conformément aux procédures.",
        "La corrosion, l'usure et les fuites se signalent tôt — ne jamais attendre l'inspection planifiée suivante.",
        "Un équipement suspect (câble endommagé, mécanisme grippé) n'est jamais remis en service par décision du rating seul.",
        "Un bon rapport d'anomalie est précis : quoi, où, dans quel état apparent.",
        "La maintenance préventive régulière évite la maintenance corrective coûteuse.",
      ],
      learnedP: [
        "Une ronde de maintenance de pont : ordre de mission, inspection, graissage, inspection du câble, rapport",
        "Points de graissage typiques et fréquences indicatives — toujours régis par le PMS du navire",
        "Termes clés d'usure et de corrosion : surface rust, pitting corrosion, broken strand, slack, seized, leakage",
        "Bases de sécurité avant toute maintenance : isolation, EPI, vérification, procédures de l'entreprise",
        "Quand et comment signaler un équipement suspect, sans décider seul",
      ],
    },
    es: {
      badge: "📚 Seamanship · Lección 6/6 · ⭐ Premium · 200 XP · 🏁 FIN DEL MÓDULO",
      title: "Mantenimiento Básico y Engrase",
      intro: "El mantenimiento de cubierta no es una especialidad mecánica — es inspección, mantenimiento rutinario, preservación e información, dentro del primer nivel de intervención. Reconocer temprano un desgaste o daño, e informarlo con precisión, es lo que mantiene el equipo de cubierta fiable y seguro.\n\nEsta lección cubre una ronda de mantenimiento de cubierta desde la orden de trabajo hasta el informe, los puntos y frecuencias de engrase típicos, y los términos clave usados para describir el desgaste y la corrosión.",
      p1: "PARTE 1 — SIMULADOR RONDA DE MANTENIMIENTO",
      s1: "RONDA DE MANTENIMIENTO DE CUBIERTA:\n\nOrden de trabajo → winche inspeccionado antes de engrasar →\ngrasa aplicada en los puntos designados → cable metálico inspeccionado →\nanomalía descubierta → informada con precisión al Bosun.\n\nUn mantenimiento completo: inspeccionar, limpiar si es necesario, lubricar, observar, informar.",
      p2: "PARTE 2 — PUNTOS Y FRECUENCIA DE ENGRASE",
      s2: "PUNTOS Y FRECUENCIA DE ENGRASE:\n\nPuntos típicos: rodamientos, engranajes, cable y tambor,\nmecanismo de freno, pasadores y grilletes.\n\nFrecuencia indicativa: diaria / semanal / mensual\nsegún el tipo de equipo.\n\nEl intervalo exacto siempre lo fija el PMS del buque —\nnunca una regla universal fija.",
      p3: "PARTE 3 — LEER EL DESGASTE Y LA CORROSIÓN",
      s3: "TÉRMINOS CLAVE:\n\nSurface rust · Pitting corrosion ·\nBroken strand (wire) · Slack / play ·\nSeized (grippé) · Leakage.\n\nCada término señala un nivel de preocupación distinto —\ndesde un tratamiento rutinario hasta una anomalía a informar.",
      p4: "PARTE 4 — FICHAS DE VOCABULARIO DE MANTENIMIENTO",
      p5: "PARTE 5 — QUIZ DE VOCABULARIO DE MANTENIMIENTO",
      p6: "🎯 EJERCICIO", p7: "📝 BANCO 16 PREGUNTAS",
      sumT: "RESUMEN — MANTENIMIENTO BÁSICO Y ENGRASE",
      sumP: [
        "Una operación de mantenimiento siempre comienza por observar, luego limpiar si es necesario, inspeccionar y finalmente lubricar conforme a los procedimientos.",
        "La corrosión, el desgaste y las fugas deben señalarse pronto — nunca esperar a la siguiente inspección planificada.",
        "Un equipo sospechoso (cable dañado, mecanismo agarrotado) nunca se vuelve a poner en servicio por decisión exclusiva del marinero.",
        "Un buen informe de anomalía es preciso: qué, dónde, en qué estado aparente.",
        "El mantenimiento preventivo regular evita el mantenimiento correctivo costoso.",
      ],
      learnedP: [
        "Una ronda de mantenimiento de cubierta: orden de trabajo, inspección, engrase, inspección del cable, informe",
        "Puntos de engrase típicos y frecuencias indicativas — siempre regidos por el PMS del buque",
        "Términos clave de desgaste y corrosión: surface rust, pitting corrosion, broken strand, slack, seized, leakage",
        "Bases de seguridad antes de cualquier mantenimiento: aislamiento, EPP, verificación, procedimientos de la empresa",
        "Cuándo y cómo informar de un equipo sospechoso, sin decidir solo",
      ],
    },
    pt: {
      badge: "📚 Seamanship · Lição 6/6 · ⭐ Premium · 200 XP · 🏁 FIM DO MÓDULO",
      title: "Manutenção Básica e Lubrificação",
      intro: "A manutenção de convés não é uma especialidade mecânica — é inspeção, manutenção corrente, preservação e reporte, dentro do primeiro nível de intervenção. Reconhecer cedo um desgaste ou dano, e reportá-lo com precisão, é o que mantém o equipamento de convés fiável e seguro.\n\nEsta lição cobre uma ronda de manutenção de convés desde a atribuição da tarefa até ao relatório, os pontos e frequências de lubrificação típicos, e os termos chave usados para descrever o desgaste e a corrosão.",
      p1: "PARTE 1 — SIMULADOR RONDA DE MANUTENÇÃO",
      s1: "RONDA DE MANUTENÇÃO DE CONVÉS:\n\nTarefa atribuída → guincho inspecionado antes de lubrificar →\nmassa aplicada nos pontos designados → cabo metálico inspecionado →\nanomalia descoberta → reportada com precisão ao Bosun.\n\nUma manutenção completa: inspecionar, limpar se necessário, lubrificar, observar, reportar.",
      p2: "PARTE 2 — PONTOS E FREQUÊNCIA DE LUBRIFICAÇÃO",
      s2: "PONTOS E FREQUÊNCIA DE LUBRIFICAÇÃO:\n\nPontos típicos: rolamentos, engrenagens, cabo e tambor,\nmecanismo de travão, pinos e manilhas.\n\nFrequência indicativa: diária / semanal / mensal\nconsoante o tipo de equipamento.\n\nO intervalo exato é sempre fixado pelo PMS do navio —\nnunca uma regra universal fixa.",
      p3: "PARTE 3 — LER O DESGASTE E A CORROSÃO",
      s3: "TERMOS CHAVE:\n\nSurface rust · Pitting corrosion ·\nBroken strand (wire) · Slack / play ·\nSeized (grippé) · Leakage.\n\nCada termo sinaliza um nível de preocupação diferente —\ndesde um tratamento de rotina até uma anomalia a reportar.",
      p4: "PARTE 4 — FICHAS DE VOCABULÁRIO DE MANUTENÇÃO",
      p5: "PARTE 5 — QUIZ DE VOCABULÁRIO DE MANUTENÇÃO",
      p6: "🎯 EXERCÍCIO", p7: "📝 BANCO 16 QUESTÕES",
      sumT: "RESUMO — MANUTENÇÃO BÁSICA E LUBRIFICAÇÃO",
      sumP: [
        "Uma operação de manutenção começa sempre por observar, depois limpar se necessário, inspecionar e, por fim, lubrificar de acordo com os procedimentos.",
        "A corrosão, o desgaste e as fugas devem ser sinalizados cedo — nunca esperar pela próxima inspeção planeada.",
        "Um equipamento suspeito (cabo danificado, mecanismo empancado) nunca é reposto em serviço por decisão exclusiva do marinheiro.",
        "Um bom relatório de anomalia é preciso: o quê, onde, em que estado aparente.",
        "A manutenção preventiva regular evita a manutenção corretiva dispendiosa.",
      ],
      learnedP: [
        "Uma ronda de manutenção de convés: atribuição, inspeção, lubrificação, inspeção do cabo, relatório",
        "Pontos de lubrificação típicos e frequências indicativas — sempre regidos pelo PMS do navio",
        "Termos chave de desgaste e corrosão: surface rust, pitting corrosion, broken strand, slack, seized, leakage",
        "Bases de segurança antes de qualquer manutenção: isolamento, EPI, verificação, procedimentos da empresa",
        "Quando e como reportar um equipamento suspeito, sem decidir sozinho",
      ],
    },
  };
  return d[lang] || d.en;
};

export default function LessonSEA_L6({ lang = "en", onBack = () => {}, onComplete = () => {} }) {
  const t = T[lang] || T.en;
  const bank = BANK[lang] || BANK.en;
  const quiz = buildQuiz(lang);
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const progress = phase === "content" ? 15 : phase === "quiz" ? 70 : 100;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`, color: C.white, fontFamily: "'Nunito',sans-serif", overflow: "hidden", position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 100, background: "rgba(6,14,26,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ height: 54, display: "flex", alignItems: "center", padding: "0 16px", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 14px", color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif" }}>{t.back}</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.orange, letterSpacing: 1, fontFamily: "'Cinzel',serif" }}>⚓ {lang === "fr" ? "Seamanship" : "Seamanship"}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{lang === "fr" ? "Leçon 6/6" : lang === "en" ? "Lesson 6/6" : lang === "es" ? "Lección 6/6" : "Lição 6/6"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(201,146,42,0.2)", border: `1px solid ${C.gold}44`, color: C.gold, fontWeight: 700 }}>⭐ PREMIUM</div>
            <div style={{ fontSize: 11, color: C.orange, fontFamily: "'Cinzel',serif" }}>{progress}%</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.orange},${C.gold2})`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px", position: "relative", zIndex: 1, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "all 0.5s ease" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {phase === "content" && <>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, marginBottom: 10, background: `${C.orange}15`, border: `1px solid ${C.orange}44`, fontSize: 11, color: C.orange, fontWeight: 700 }}>{lc.badge}</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.3, margin: "0 0 16px" }}>{lc.title}</h1>
            <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.orange}` }}>
              <div style={{ fontSize: 14, color: "rgba(240,244,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.intro}</div>
            </Card>

            <SL icon="🛠️" text={lc.p1} color={C.orange} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s1}</div></Card>
            <Card style={{ marginBottom: 14, background: "rgba(0,5,20,0.7)", border: `1px solid ${C.orange}22` }}>
              <div style={{ fontSize: 11, color: C.orange, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🛠️ {lang === "fr" ? "SIMULATEUR — INTERACTIF" : lang === "en" ? "SIMULATOR — INTERACTIVE" : lang === "es" ? "SIMULADOR — INTERACTIVO" : "SIMULADOR — INTERATIVO"}</div>
              <DeckMaintenanceRoundsSVG lang={lang} />
            </Card>

            <SL icon="🧴" text={lc.p2} color={C.gold2} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s2}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold2}22` }}>
              <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🧴 {lang === "fr" ? "POINTS & FRÉQUENCE — INTERACTIF" : lang === "en" ? "POINTS & SCHEDULE — INTERACTIVE" : lang === "es" ? "PUNTOS Y FRECUENCIA — INTERACTIVO" : "PONTOS E FREQUÊNCIA — INTERATIVO"}</div>
              <LubricationPointsScheduleSVG lang={lang} />
            </Card>

            <SL icon="🔎" text={lc.p3} color={C.red} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s3}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.red}22` }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🔎 {lang === "fr" ? "TERMES — INTERACTIF" : lang === "en" ? "TERMS — INTERACTIVE" : lang === "es" ? "TÉRMINOS — INTERACTIVO" : "TERMOS — INTERATIVO"}</div>
              <ReadingWearCorrosionSVG lang={lang} />
            </Card>

            <SL icon="🃏" text={lc.p4} color={C.green} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.green}22` }}><MaintenanceFlashcardsSVG lang={lang} /></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}33` }}><MaintenanceVocabQuiz lang={lang} /></Card>

            <div style={{ marginBottom: 14 }}><SafetyReminderBlock lang={lang} /></div>

            <SL icon="📝" text={lc.p6} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}><Exercise1 lang={lang} t={t} /></Card>

            <SL icon="📚" text={lc.p7} color={C.purple} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.purple}44`, background: "linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))" }}><QuestionBank lang={lang} t={t} questions={bank} /></Card>

            <Card style={{ marginBottom: 14, background: `${C.orange}08`, border: `1px solid ${C.orange}22` }}>
              <div style={{ fontSize: 11, color: C.orange, letterSpacing: 3, fontFamily: "'Cinzel',serif", marginBottom: 12 }}>{lc.sumT}</div>
              {lc.sumP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < lc.sumP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 11, color: C.white }}><span style={{ color: C.orange, fontWeight: 700, fontFamily: "'Courier New',monospace" }}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={() => setPhase("quiz")} style={{ width: "100%", padding: "17px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.orange},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: C.white, cursor: "pointer", boxShadow: `0 10px 36px ${C.orange}33`, marginTop: 8 }}>{t.startQuiz}</button>
            <div style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8 }}>{t.readFirst}</div>
          </>}

          {phase === "quiz" && <>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 }}>
                {lang === "fr" ? "Quiz Final — Maintenance de Base" : lang === "en" ? "Final Quiz — Basic Maintenance" : lang === "es" ? "Quiz Final — Mantenimiento Básico" : "Quiz Final — Manutenção Básica"}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>5 {lang === "fr" ? "questions · Leçon 6/6" : lang === "en" ? "questions · Lesson 6/6" : lang === "es" ? "preguntas · Lección 6/6" : "perguntas · Lição 6/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s => { setQuizScore(s); setTimeout(() => setPhase("done"), 1200); }} />
          </>}

          {phase === "done" && <div style={{ paddingTop: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>{t.complete}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 20, background: `${C.orange}15`, border: `1px solid ${C.orange}55`, fontSize: 14, color: C.orange, fontWeight: 700 }}>+{quizScore >= 4 ? 200 : quizScore === 3 ? 120 : 60} {t.xp} ⭐</div>
            </div>

            <Card style={{ marginBottom: 16, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏁</span>
                <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
                  {lang === "fr" ? "MODULE TERMINÉ !" : lang === "en" ? "MODULE COMPLETE!" : lang === "es" ? "¡MÓDULO COMPLETADO!" : "MÓDULO CONCLUÍDO!"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.white, lineHeight: 1.8 }}>
                {lang === "fr" ? "Seamanship — 6 leçons maîtrisées ⚓" : lang === "en" ? "Seamanship — 6 lessons mastered ⚓" : lang === "es" ? "Seamanship — 6 lecciones dominadas ⚓" : "Seamanship — 6 lições dominadas ⚓"}
              </div>
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{t.youLearned}</div>
              {lc.learnedP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < lc.learnedP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 12, color: C.white }}><span style={{ color: C.orange, fontWeight: 700 }}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onComplete} style={{ width: "100%", padding: "16px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.gold},${C.blue})`, fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: C.white, cursor: "pointer", boxShadow: "0 8px 28px rgba(201,146,42,0.4)", marginBottom: 10 }}>
              {lang === "fr" ? "🎯 EXPLORER LES AUTRES MODULES →" : lang === "en" ? "🎯 EXPLORE OTHER MODULES →" : lang === "es" ? "🎯 EXPLORAR OTROS MÓDULOS →" : "🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{ width: "100%", padding: "12px 0", border: `1px solid rgba(255,255,255,0.15)`, borderRadius: 14, background: "transparent", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer" }}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
