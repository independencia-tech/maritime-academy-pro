import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — BRIDGE TEAM ROLES SIMULATOR
// ══════════════════════════════════════
function BridgeTeamRolesSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const steps = [
    {
      event: { fr: "Le quart est officiellement pris", en: "The watch is officially assumed", es: "La guardia queda oficialmente asumida", pt: "O quarto é oficialmente assumido" },
      quote: "I have the watch.",
      tr: { fr: "J'ai le quart.", es: "Tengo la guardia.", pt: "Tenho o quarto." },
      context: {
        fr: "Matérialise le début officiel du quart, avant tout événement du scénario.",
        en: "Marks the official start of the watch, before any event in the scenario.",
        es: "Marca el inicio oficial de la guardia, antes de cualquier evento del escenario.",
        pt: "Marca o início oficial do quarto, antes de qualquer evento do cenário.",
      },
    },
    {
      event: { fr: "L'OOW vérifie la situation du navire", en: "The OOW checks the vessel's situation", es: "El OOW verifica la situación del buque", pt: "O OOW verifica a situação do navio" },
      description: {
        fr: "L'OOW prend le quart et vérifie la position, le cap, la météo et le trafic environnant.",
        en: "The OOW takes the watch and checks position, heading, weather and surrounding traffic.",
        es: "El OOW toma la guardia y verifica la posición, el rumbo, la meteorología y el tráfico circundante.",
        pt: "O OOW assume o quarto e verifica a posição, o rumo, a meteorologia e o tráfego circundante.",
      },
      context: {
        fr: "Ceci porte sur le CONTENU de la vérification, pas sur la phraséologie SMCP — celle-ci est couverte en détail dans la leçon d4-l1 (Bridge Watch & Reporting).",
        en: "This covers the CONTENT of the check, not the SMCP phraseology — that is covered in detail in lesson d4-l1 (Bridge Watch & Reporting).",
        es: "Esto trata sobre el CONTENIDO de la verificación, no sobre la fraseología SMCP — esta se trata en detalle en la lección d4-l1 (Bridge Watch & Reporting).",
        pt: "Isto trata do CONTEÚDO da verificação, não da fraseologia SMCP — esta é tratada em detalhe na lição d4-l1 (Bridge Watch & Reporting).",
      },
    },
    {
      event: { fr: "Le timonier est affecté ou le pilote automatique engagé", en: "The helmsman is assigned or the autopilot is engaged", es: "Se asigna al timonel o se conecta el piloto automático", pt: "O timoneiro é destacado ou o piloto automático é ligado" },
      description: {
        fr: "L'OOW décide lequel des deux modes est actif et le communique clairement à l'équipe passerelle.",
        en: "The OOW decides which of the two modes is active and communicates it clearly to the bridge team.",
        es: "El OOW decide cuál de los dos modos está activo y lo comunica claramente al equipo de puente.",
        pt: "O OOW decide qual dos dois modos está ativo e comunica-o claramente à equipa do passadiço.",
      },
      context: {
        fr: "L'OOW reste responsable de la décision, que la barre soit tenue manuellement ou par pilote automatique.",
        en: "The OOW remains responsible for the decision, whether the helm is held manually or by autopilot.",
        es: "El OOW sigue siendo responsable de la decisión, ya sea que el timón se mantenga manualmente o por piloto automático.",
        pt: "O OOW continua responsável pela decisão, seja o leme mantido manualmente ou pelo piloto automático.",
      },
    },
    {
      event: { fr: "La vigie est postée", en: "The lookout is posted", es: "El vigía es apostado", pt: "O vigia é colocado" },
      description: {
        fr: "Vérification qu'elle est bien positionnée et briefée sur les conditions (visibilité, trafic connu).",
        en: "Verification that the lookout is correctly positioned and briefed on conditions (visibility, known traffic).",
        es: "Verificación de que está bien posicionado e informado sobre las condiciones (visibilidad, tráfico conocido).",
        pt: "Verificação de que está bem posicionado e informado sobre as condições (visibilidade, tráfego conhecido).",
      },
      context: {
        fr: "Une vigie mal positionnée ou non briefée ne peut pas assurer une veille efficace, quelle que soit son attention.",
        en: "A lookout who is poorly positioned or not briefed cannot maintain an effective lookout, however attentive they are.",
        es: "Un vigía mal posicionado o no informado no puede mantener una vigilancia eficaz, por atento que esté.",
        pt: "Um vigia mal posicionado ou não informado não consegue manter uma vigilância eficaz, por mais atento que esteja.",
      },
    },
    {
      event: { fr: "Un contact radar apparaît", en: "A radar contact appears", es: "Aparece un contacto de radar", pt: "Surge um contacto de radar" },
      description: {
        fr: "La vigie signale le contact, l'OOW évalue le risque de collision.",
        en: "The lookout reports the contact, the OOW assesses the risk of collision.",
        es: "El vigía informa del contacto, el OOW evalúa el riesgo de colisión.",
        pt: "O vigia sinaliza o contacto, o OOW avalia o risco de colisão.",
      },
      context: {
        fr: "Lien direct avec COLREG Règle 5 — l'obligation de maintenir une veille efficace à tout moment.",
        en: "Direct link to COLREG Rule 5 — the obligation to maintain a proper lookout at all times.",
        es: "Vínculo directo con la Regla 5 del COLREG — la obligación de mantener una vigilancia eficaz en todo momento.",
        pt: "Ligação direta à Regra 5 do COLREG — a obrigação de manter uma vigilância eficaz em todos os momentos.",
      },
    },
    {
      event: { fr: "L'OOW décide d'une action", en: "The OOW decides on an action", es: "El OOW decide una acción", pt: "O OOW decide uma ação" },
      description: {
        fr: "L'OOW décide d'une action ou non, et communique sa décision à l'équipe passerelle.",
        en: "The OOW decides whether or not to take action, and communicates the decision to the bridge team.",
        es: "El OOW decide si actuar o no, y comunica la decisión al equipo de puente.",
        pt: "O OOW decide se age ou não, e comunica a decisão à equipa do passadiço.",
      },
      context: {
        fr: "La décision revient à l'OOW, jamais à la vigie ou au timonier, qui exécutent et signalent.",
        en: "The decision belongs to the OOW, never to the lookout or the helmsman, whose roles are to execute and report.",
        es: "La decisión corresponde al OOW, nunca al vigía ni al timonel, cuyo papel es ejecutar e informar.",
        pt: "A decisão pertence ao OOW, nunca ao vigia ou ao timoneiro, cujo papel é executar e reportar.",
      },
    },
    {
      event: { fr: "Une ronde de routine est envoyée", en: "A routine round is sent", es: "Se envía una ronda de rutina", pt: "É enviada uma ronda de rotina" },
      description: {
        fr: "Un rapport de retour est attendu à heure fixe.",
        en: "A return report is expected at a fixed time.",
        es: "Se espera un informe de regreso a una hora fija.",
        pt: "Espera-se um relatório de regresso a uma hora fixa.",
      },
      context: {
        fr: "Une ronde sans heure de retour fixée est un point aveugle : personne ne sait si elle s'est bien déroulée.",
        en: "A round with no fixed return time is a blind spot: no one knows whether it went well.",
        es: "Una ronda sin hora de regreso fijada es un punto ciego: nadie sabe si transcurrió bien.",
        pt: "Uma ronda sem hora de regresso fixada é um ponto cego: ninguém sabe se decorreu bem.",
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
            background: i <= step ? (i === step ? C.teal : `${C.teal}55`) : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.teal, letterSpacing: 2, textAlign: "center", marginBottom: 8, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "SIMULATEUR ÉQUIPE PASSERELLE" : lang === "en" ? "BRIDGE TEAM SIMULATOR" : lang === "es" ? "SIMULADOR EQUIPO DE PUENTE" : "SIMULADOR EQUIPA DO PASSADIÇO"} — {step + 1}/{steps.length}
      </div>
      <div style={{ padding: "12px", borderRadius: 14, marginBottom: 10, background: "rgba(10,138,108,0.08)", border: `2px solid ${C.teal}55`, animation: "fadeUp 0.3s ease" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 8 }}>{s.event[lang] || s.event.en}</div>
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
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: step === steps.length - 1 ? "rgba(255,255,255,0.05)" : `${C.teal}22`, border: `1px solid ${step === steps.length - 1 ? "rgba(255,255,255,0.08)" : C.teal}`, color: C.white, cursor: step === steps.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — THE WATCH ORGANIZATION CHART
// ══════════════════════════════════════
function WatchOrganizationChartSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const chain = [
    { id: 1, color: C.teal, label: { fr: "OOW (responsable du quart)", en: "OOW (responsible for the watch)", es: "OOW (responsable de la guardia)", pt: "OOW (responsável pelo quarto)" },
      desc: { fr: "Dirige la conduite du quart, prend toutes les décisions opérationnelles.", en: "Directs the conduct of the watch, makes all operational decisions.", es: "Dirige la conducción de la guardia, toma todas las decisiones operativas.", pt: "Dirige a condução do quarto, toma todas as decisões operacionais." } },
    { id: 2, color: C.blue2, label: { fr: "Timonier (exécution barre)", en: "Helmsman (helm execution)", es: "Timonel (ejecución del timón)", pt: "Timoneiro (execução do leme)" },
      desc: { fr: "Exécute les ordres de barre de l'OOW, ne décide pas du cap.", en: "Executes the OOW's helm orders, does not decide the heading.", es: "Ejecuta las órdenes de timón del OOW, no decide el rumbo.", pt: "Executa as ordens de leme do OOW, não decide o rumo." } },
    { id: 3, color: C.gold2, label: { fr: "Vigie (veille)", en: "Lookout (watchkeeping)", es: "Vigía (vigilancia)", pt: "Vigia (vigilância)" },
      desc: { fr: "Maintient une veille efficace, signale toute observation à l'OOW.", en: "Maintains an effective lookout, reports any observation to the OOW.", es: "Mantiene una vigilancia eficaz, informa cualquier observación al OOW.", pt: "Mantém uma vigilância eficaz, sinaliza qualquer observação ao OOW." } },
    { id: 4, color: C.orange, label: { fr: "Matelot envoyé en ronde", en: "Rating sent on rounds", es: "Marinero enviado de ronda", pt: "Marinheiro enviado em ronda" },
      desc: { fr: "Effectue les rondes assignées, rapporte à heure fixe.", en: "Carries out assigned rounds, reports back at a fixed time.", es: "Realiza las rondas asignadas, informa a una hora fija.", pt: "Realiza as rondas atribuídas, reporta a uma hora fixa." } },
  ];
  const sel_ = chain.find(c => c.id === sel);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {chain.map((c, i) => (
          <div key={c.id}>
            <div onClick={() => setSel(sel === c.id ? null : c.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: sel === c.id ? `${c.color}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel === c.id ? c.color : "rgba(255,255,255,0.08)"}` }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{c.label[lang] || c.label.en}</div>
            </div>
            {i < chain.length - 1 && <div style={{ textAlign: "center", fontSize: 12, color: C.muted, padding: "2px 0" }}>↓</div>}
          </div>
        ))}
      </div>
      {sel_ && <div style={{ padding: "10px 12px", borderRadius: 12, background: `${sel_.color}15`, border: `1px solid ${sel_.color}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 12 }}>{sel_.desc[lang] || sel_.desc.en}</div>}

      <div style={{ padding: "14px", borderRadius: 14, background: "rgba(192,57,43,0.1)", border: `2px solid ${C.red}55` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 8, letterSpacing: 1 }}>
          👑 {lang === "fr" ? "Master (Capitaine)" : lang === "en" ? "Master (Captain)" : lang === "es" ? "Master (Capitán)" : "Master (Comandante)"}
        </div>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: C.white, fontWeight: 700, marginBottom: 4 }}>
          {lang === "fr" ? "Peut intervenir à tout moment" : lang === "en" ? "May intervene at any time" : lang === "es" ? "Puede intervenir en cualquier momento" : "Pode intervir a qualquer momento"}
        </div>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: C.white, fontWeight: 700, marginBottom: 10 }}>
          {lang === "fr" ? "Le commandement ultime reste toujours au Master" : lang === "en" ? "Ultimate command remains with the Master" : lang === "es" ? "El mando supremo siempre permanece en el Master" : "O comando supremo permanece sempre com o Master"}
        </div>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
          {lang === "fr" ? "L'OOW est responsable de la conduite du quart, mais le commandement ultime du navire reste toujours au Master, qui peut intervenir à tout moment." :
           lang === "en" ? "The OOW is responsible for the conduct of the watch, but ultimate command of the vessel always remains with the Master, who may intervene at any time." :
           lang === "es" ? "El OOW es responsable de la conducción de la guardia, pero el mando supremo del buque siempre permanece en el Master, quien puede intervenir en cualquier momento." :
           "O OOW é responsável pela condução do quarto, mas o comando supremo do navio permanece sempre com o Master, que pode intervir a qualquer momento."}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — EFFECTIVE LOOKOUT: WHAT COUNTS
// ══════════════════════════════════════
function EffectiveLookoutSVG({ lang }) {
  const [tab, setTab] = useState("active");

  const modes = {
    passive: { color: C.red,
      label: { fr: "Vigie passive", en: "Passive lookout", es: "Vigilancia pasiva", pt: "Vigilância passiva" },
      desc: { fr: "Regarder sans balayer activement — une présence sans réelle vigilance.", en: "Looking without actively scanning — a presence without real vigilance.", es: "Mirar sin escanear activamente — una presencia sin vigilancia real.", pt: "Olhar sem varrer ativamente — uma presença sem vigilância real." } },
    active: { color: C.green,
      label: { fr: "Vigie active", en: "Active lookout", es: "Vigilancia activa", pt: "Vigilância ativa" },
      desc: { fr: "Balayage systématique, écoute active, signalement immédiat de toute observation.", en: "Systematic scanning, active listening, immediate reporting of any observation.", es: "Escaneo sistemático, escucha activa, notificación inmediata de cualquier observación.", pt: "Varrimento sistemático, escuta ativa, sinalização imediata de qualquer observação." } },
  };
  const m = modes[tab];

  const means = [
    { icon: "👁️", label: { fr: "Vue", en: "Sight", es: "Vista", pt: "Visão" } },
    { icon: "👂", label: { fr: "Ouïe", en: "Hearing", es: "Oído", pt: "Audição" } },
    { icon: "📡", label: { fr: "Radar", en: "Radar", es: "Radar", pt: "Radar" } },
    { icon: "🛰️", label: { fr: "AIS", en: "AIS", es: "AIS", pt: "AIS" } },
  ];

  const qualities = [
    { fr: "Continue", en: "Continuous", es: "Continua", pt: "Contínua" },
    { fr: "Systématique", en: "Systematic", es: "Sistemática", pt: "Sistemática" },
    { fr: "Adaptée aux circonstances", en: "Adapted to circumstances", es: "Adaptada a las circunstancias", pt: "Adaptada às circunstâncias" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
        {["passive", "active"].map(k => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "8px 4px", borderRadius: 10, cursor: "pointer", textAlign: "center", fontSize: 10, fontWeight: 700, background: tab === k ? `${modes[k].color}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${tab === k ? modes[k].color : "rgba(255,255,255,0.08)"}`, color: tab === k ? modes[k].color : C.muted }}>
            {modes[k].label[lang] || modes[k].label.en}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px", borderRadius: 12, background: `${m.color}12`, border: `1.5px solid ${m.color}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 12 }}>
        {m.desc[lang] || m.desc.en}
      </div>

      <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "TOUS LES MOYENS DISPONIBLES" : lang === "en" ? "ALL AVAILABLE MEANS" : lang === "es" ? "TODOS LOS MEDIOS DISPONIBLES" : "TODOS OS MEIOS DISPONÍVEIS"}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {means.map((mn, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 16 }}>{mn.icon}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{mn.label[lang] || mn.label.en}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px", borderRadius: 12, background: `${C.teal}12`, border: `1.5px solid ${C.teal}44`, marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: C.white, lineHeight: 1.7, fontWeight: 700, fontStyle: "italic" }}>
          {lang === "fr" ? "\u00ab Maintenir une veille efficace signifie observer en permanence, par tous les moyens disponibles et adaptés aux circonstances. \u00bb" :
           lang === "en" ? "\u201cMaintaining an effective lookout means observing continuously, by all available means appropriate to the prevailing circumstances.\u201d" :
           lang === "es" ? "\u00ab Mantener una vigilancia eficaz significa observar de manera permanente, por todos los medios disponibles y adaptados a las circunstancias. \u00bb" :
           "\u00ab Manter uma vigilância eficaz significa observar permanentemente, por todos os meios disponíveis e adequados às circunstâncias. \u00bb"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {qualities.map((q, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, background: "rgba(30,138,74,0.1)", border: `1px solid ${C.green}44`, fontSize: 10, color: C.green, fontWeight: 700 }}>
            {q[lang] || q.en}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — WATCH HANDOVER CHECKLIST
// ══════════════════════════════════════
function WatchHandoverChecklistSVG({ lang }) {
  const [checked, setChecked] = useState({});

  const items = [
    { id: 1, fr: "Position et méthode de vérification", en: "Position and verification method", es: "Posición y método de verificación", pt: "Posição e método de verificação" },
    { id: 2, fr: "Cap et vitesse", en: "Heading and speed", es: "Rumbo y velocidad", pt: "Rumo e velocidade" },
    { id: 3, fr: "Trafic connu", en: "Known traffic", es: "Tráfico conocido", pt: "Tráfego conhecido" },
    { id: 4, fr: "Conditions météo", en: "Weather conditions", es: "Condiciones meteorológicas", pt: "Condições meteorológicas" },
    { id: 5, fr: "Tâches en cours", en: "Ongoing tasks", es: "Tareas en curso", pt: "Tarefas em curso" },
    { id: 6, fr: "Toute anomalie", en: "Any abnormality", es: "Cualquier anomalía", pt: "Qualquer anomalia" },
    { id: 7, fr: "État des équipements de navigation (radar, AIS, gyro, etc.) lorsqu'il est pertinent", en: "Condition of navigation equipment (radar, AIS, gyro, etc.) when relevant", es: "Estado de los equipos de navegación (radar, AIS, giro, etc.) cuando sea pertinente", pt: "Estado dos equipamentos de navegação (radar, AIS, giro, etc.) quando pertinente" },
    { id: 8, fr: "Toute alarme, panne ou limitation connue", en: "Any known alarm, failure or limitation", es: "Cualquier alarma, avería o limitación conocida", pt: "Qualquer alarme, avaria ou limitação conhecida" },
  ];

  const toggle = (id) => setChecked(c => ({ ...c, [id]: !c[id] }));

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {items.map(it => (
          <div key={it.id} onClick={() => toggle(it.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: checked[it.id] ? "rgba(30,138,74,0.12)" : "rgba(255,255,255,0.04)", border: `1.5px solid ${checked[it.id] ? C.green : "rgba(255,255,255,0.08)"}` }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: checked[it.id] ? C.green : "rgba(255,255,255,0.08)", border: `1px solid ${checked[it.id] ? C.green : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.white }}>{checked[it.id] ? "✓" : ""}</div>
            <div style={{ fontSize: 11, color: C.white, flex: 1, lineHeight: 1.4 }}>{it[lang] || it.en}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(201,146,42,0.1)", border: `1px solid ${C.gold}44`, fontSize: 11, color: C.gold2, lineHeight: 1.6 }}>
        {lang === "fr" ? "Pour la formulation exacte en anglais maritime standardisé de cette relève, voir la leçon SMCP L1 — Bridge Watch & Reporting." :
         lang === "en" ? "For the exact wording in standardised maritime English for this handover, see lesson SMCP L1 — Bridge Watch & Reporting." :
         lang === "es" ? "Para la formulación exacta en inglés marítimo estandarizado de este relevo, ver la lección SMCP L1 — Bridge Watch & Reporting." :
         "Para a formulação exata em inglês marítimo padronizado desta rendição, ver a lição SMCP L1 — Bridge Watch & Reporting."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// WATCH ROLES VOCABULARY QUIZ
// ══════════════════════════════════════
function WatchRolesVocabQuiz({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const R = {
    oow: { fr: "L'OOW", en: "The OOW", es: "El OOW", pt: "O OOW" },
    helm: { fr: "Le timonier", en: "The helmsman", es: "El timonel", pt: "O timoneiro" },
    lookout: { fr: "La vigie", en: "The lookout", es: "El vigía", pt: "O vigia" },
    master: { fr: "Le Master", en: "The Master", es: "El Master", pt: "O Master" },
    rating: { fr: "Le matelot envoyé en ronde", en: "The rating sent on rounds", es: "El marinero enviado de ronda", pt: "O marinheiro enviado em ronda" },
  };

  const qs = [
    { q: { fr: "Qui est responsable légal du quart une fois la relève effectuée ?", en: "Who is legally responsible for the watch once the handover is complete?", es: "¿Quién es legalmente responsable de la guardia una vez efectuado el relevo?", pt: "Quem é legalmente responsável pelo quarto assim que a rendição é feita?" }, opts: [R.helm, R.oow, R.lookout], correct: 1 },
    { q: { fr: "Qui exécute les ordres de barre ?", en: "Who executes the helm orders?", es: "¿Quién ejecuta las órdenes de timón?", pt: "Quem executa as ordens de leme?" }, opts: [R.oow, R.lookout, R.helm], correct: 2 },
    { q: { fr: "Qui maintient la veille ?", en: "Who maintains the lookout?", es: "¿Quién mantiene la vigilancia?", pt: "Quem mantém a vigilância?" }, opts: [R.lookout, R.helm, R.master], correct: 0 },
    { q: { fr: "Qui décide de l'action à prendre face à un risque de collision ?", en: "Who decides the action to take facing a collision risk?", es: "¿Quién decide la acción a tomar ante un riesgo de colisión?", pt: "Quem decide a ação a tomar perante um risco de colisão?" }, opts: [R.lookout, R.oow, R.rating], correct: 1 },
    { q: { fr: "Qui conserve le commandement ultime du navire à tout moment ?", en: "Who retains ultimate command of the vessel at all times?", es: "¿Quién conserva el mando supremo del buque en todo momento?", pt: "Quem conserva o comando supremo do navio a qualquer momento?" }, opts: [R.oow, R.helm, R.master], correct: 2 },
    { q: { fr: "Qui est envoyé en ronde et doit rapporter à heure fixe ?", en: "Who is sent on rounds and must report back at a fixed time?", es: "¿Quién es enviado de ronda y debe informar a una hora fija?", pt: "Quem é enviado em ronda e deve reportar a uma hora fixa?" }, opts: [R.rating, R.oow, R.master], correct: 0 },
    { q: { fr: "Qui évalue si un contact radar constitue un risque de collision ?", en: "Who assesses whether a radar contact is a collision risk?", es: "¿Quién evalúa si un contacto de radar constituye un riesgo de colisión?", pt: "Quem avalia se um contacto de radar constitui um risco de colisão?" }, opts: [R.lookout, R.oow, R.helm], correct: 1 },
  ];

  const q = qs[qIdx];
  const pick = (i) => { if (ans !== null) return; setAns(i); if (i === q.correct) setScore(s => s + 1); };
  const next = () => { if (qIdx < qs.length - 1) { setQIdx(v => v + 1); setAns(null); } else setDone(true); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      <div style={{ fontSize: 40 }}>{score >= 6 ? "🏆" : "📚"}</div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, color: C.white, margin: "8px 0" }}>{score}/{qs.length}</div>
      <button onClick={() => { setDone(false); setQIdx(0); setAns(null); setScore(0); }} style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: C.muted, cursor: "pointer", fontSize: 11 }}>🔄 {lang === "fr" ? "Recommencer" : lang === "en" ? "Retry" : lang === "es" ? "Reintentar" : "Repetir"}</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {qs.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i < qIdx ? C.teal : i === qIdx ? C.gold2 : "rgba(255,255,255,0.1)" }} />)}
      </div>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 12, padding: "14px", marginBottom: 12, border: `1px solid ${C.teal}33` }}>
        <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6, fontWeight: 700 }}>{q.q[lang] || q.q.en}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)", bd = "rgba(255,255,255,0.1)";
          if (ans !== null) { if (i === q.correct) { bg = "rgba(30,138,74,0.2)"; bd = C.green; } else if (i === ans) { bg = "rgba(192,57,43,0.2)"; bd = C.red; } }
          return <button key={i} onClick={() => pick(i)} style={{ padding: "10px 12px", borderRadius: 12, background: bg, border: `1.5px solid ${bd}`, color: C.white, fontSize: 12, textAlign: "left", cursor: ans !== null ? "default" : "pointer" }}>{opt[lang] || opt.en}</button>;
        })}
      </div>
      {ans !== null && <button onClick={next} style={{ width: "100%", padding: "11px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.teal},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: C.navy, cursor: "pointer" }}>
        {qIdx < qs.length - 1 ? (lang === "fr" ? "SUIVANT →" : lang === "en" ? "NEXT →" : lang === "es" ? "SIGUIENTE →" : "PRÓXIMO →") : (lang === "fr" ? "TERMINER" : lang === "en" ? "FINISH" : lang === "es" ? "TERMINAR" : "TERMINAR")}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — UNCERTAIN LIGHT AT NIGHT
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [sel, setSel] = useState(null);

  const d = {
    fr: {
      situation: "Vous êtes vigie de nuit. Vous apercevez une lumière à l'horizon qui pourrait être un navire, mais vous n'êtes pas certain.",
      task: "Que faites-vous ?",
      opts: ["Attendre d'être certain avant de signaler", "Signaler immédiatement, même en cas d'incertitude", "Ne le mentionner que si on vous le demande", "Continuer à observer seul sans en parler pour l'instant"],
      expl: "Signaler immédiatement même en cas d'incertitude — c'est à l'OOW d'évaluer la pertinence, pas à la vigie de filtrer ses observations par peur de se tromper. Le silence est un risque plus grand qu'une fausse alerte. Une observation finalement sans conséquence est préférable à une observation importante qui n'a jamais été signalée.",
    },
    en: {
      situation: "You are the night lookout. You spot a light on the horizon that could be a vessel, but you are not certain.",
      task: "What do you do?",
      opts: ["Wait until certain before reporting", "Report immediately, even if uncertain", "Only mention it if asked", "Keep watching it alone without saying anything for now"],
      expl: "Report immediately even if uncertain — it is the OOW's job to assess relevance, not the lookout's job to filter observations out of fear of being wrong. Silence is a greater risk than a false alarm. An observation that ultimately has no consequence is preferable to an important observation that was never reported.",
    },
    es: {
      situation: "Usted es el vigía de noche. Divisa una luz en el horizonte que podría ser un buque, pero no está seguro.",
      task: "¿Qué hace?",
      opts: ["Esperar a estar seguro antes de informar", "Informar de inmediato, incluso con incertidumbre", "Mencionarlo solo si se le pregunta", "Seguir observándolo solo sin decir nada por ahora"],
      expl: "Informar de inmediato incluso en caso de incertidumbre — es tarea del OOW evaluar la pertinencia, no del vigía filtrar sus observaciones por miedo a equivocarse. El silencio es un riesgo mayor que una falsa alarma. Una observación que finalmente no tiene consecuencia es preferible a una observación importante que nunca se informó.",
    },
    pt: {
      situation: "Você é o vigia de noite. Avista uma luz no horizonte que pode ser um navio, mas não tem certeza.",
      task: "O que faz?",
      opts: ["Esperar ter certeza antes de sinalizar", "Sinalizar de imediato, mesmo com incerteza", "Só mencionar se for perguntado", "Continuar a observar sozinho sem dizer nada por agora"],
      expl: "Sinalizar de imediato mesmo em caso de incerteza — cabe ao OOW avaliar a pertinência, não ao vigia filtrar as suas observações por medo de se enganar. O silêncio é um risco maior do que um alarme falso. Uma observação que acaba por não ter consequência é preferível a uma observação importante que nunca foi sinalizada.",
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
    { q: "Who is legally responsible for the navigational watch?", opts: ["The lookout", "The OOW (Officer of the Watch), even though ultimate command of the vessel always remains with the Master", "The helmsman", "No single person, it is a shared responsibility"], correct: 1, expl: "The OOW is the direct responsible for the conduct of the watch, but ultimate command of the vessel always remains with the Master, who may intervene at any time." },
    { q: "What does \"effective lookout\" mean under COLREG Rule 5?", opts: ["Only looking visually", "Observing continuously, by all available means appropriate to the prevailing circumstances", "Using radar only, at night", "Only necessary during the day"], correct: 1, expl: "COLREG Rule 5 requires maintaining a proper lookout by all available means appropriate to the prevailing circumstances — sight, hearing, radar, AIS — not just one of them." },
    { q: "What means must a lookout use besides sight?", opts: ["None, sight is enough", "Hearing, radar, AIS — all available means appropriate to the circumstances", "Only binoculars", "Only radio communication"], correct: 1, expl: "An effective lookout combines all available means — sight, hearing, radar, AIS — not sight alone." },
    { q: "What must a lookout do in case of doubt about an observation?", opts: ["Wait for confirmation before reporting", "Report it immediately, even if uncertain", "Ignore it if unsure", "Ask a colleague before reporting"], correct: 1, expl: "The lookout must report immediately even when uncertain — it is the OOW's job to assess relevance, not the lookout's job to filter observations." },
    { q: "Who decides the action to take facing a risk of collision?", opts: ["The lookout", "The OOW", "The helmsman", "Always the Master"], correct: 1, expl: "The OOW decides whether or not to take action and communicates the decision to the bridge team; the lookout and helmsman execute and report." },
    { q: "What information must be checked before taking the watch?", opts: ["Only the time", "Position, heading, weather and surrounding traffic", "Only the weather", "Nothing in particular"], correct: 1, expl: "The OOW taking the watch checks position, heading, weather and surrounding traffic before assuming responsibility." },
    { q: "Can the helmsman decide alone to change the heading?", opts: ["Yes, freely", "No, he executes the OOW's orders and does not decide the heading", "Yes, in an emergency only", "Yes, if the current heading seems dangerous to him"], correct: 1, expl: "The helmsman executes the OOW's helm orders; deciding the heading is the OOW's responsibility, not the helmsman's." },
    { q: "What is the difference between active and passive lookout?", opts: ["There is no difference", "Active lookout means systematic scanning, active listening and immediate reporting; passive lookout means looking without actively scanning", "Passive lookout is only used at night", "Active lookout only applies in fog"], correct: 1, expl: "Active lookout is systematic scanning, active listening, and immediate reporting of any observation; passive lookout is a presence without real vigilance." },
    { q: "What must a rating sent on rounds do if he detects an abnormality?", opts: ["Wait for the fixed report time to mention it", "Report it without delay, in addition to the expected return report at a fixed time", "Fix it himself first", "Ignore it if it seems minor"], correct: 1, expl: "Any abnormality detected during a round must be reported without delay, on top of the expected return report at the fixed time." },
    { q: "Why is fatigue a particular risk during the night watch?", opts: ["It has no effect on watchkeeping", "It reduces vigilance and the ability to maintain a continuous, effective lookout, increasing the risk of missing an important observation", "It only affects the helmsman", "It only matters in bad weather"], correct: 1, expl: "An effective lookout must be continuous — fatigue undermines exactly that continuity, increasing the risk that an important observation is missed." },
    { q: "What can an incomplete watch handover cause?", opts: ["Nothing significant", "A loss of critical information (position, traffic, ongoing tasks) that can endanger the safety of navigation", "Only minor inconvenience", "It only affects paperwork"], correct: 1, expl: "The handover must transmit position, heading, traffic, weather, ongoing tasks, equipment status and known alarms/failures — missing any of this can leave the incoming OOW with a dangerous blind spot." },
    { q: "What role does radar play in effective lookout?", opts: ["None, radar is optional", "It is one of the available means to be used in addition to sight and hearing, notably to detect contacts", "It replaces the need for a human lookout entirely", "It is only used in port"], correct: 1, expl: "Radar is one of the means (alongside sight, hearing and AIS) an effective lookout uses to detect contacts, as illustrated when a radar contact appears and is assessed for collision risk." },
    { q: "Can an OOW delegate his legal responsibility for the watch?", opts: ["Yes, entirely, once tasks are assigned", "No, he remains responsible even when delegating tasks such as helm or lookout to other bridge team members", "Yes, but only to the helmsman", "Yes, but only at night"], correct: 1, expl: "The OOW remains the single direct responsible for the watch even though specific tasks (helm, lookout, rounds) are delegated to other team members." },
    { q: "What must the outgoing OOW transmit to the incoming OOW about surrounding traffic?", opts: ["Nothing, traffic is self-evident", "The known traffic in the vicinity", "Only traffic further than 20 miles away", "Only traffic that has already been reported to VTS"], correct: 1, expl: "Known traffic is one of the items that must be transmitted at watch handover, alongside position, heading, speed, weather, ongoing tasks and equipment status." },
    { q: "Why should one never assume another team member has already seen a danger?", opts: ["Because assuming saves time and is usually correct", "Because each role has a distinct responsibility, and silence based on assumption can create a shared blind spot", "Because only the OOW is allowed to see dangers", "It does not matter, as long as someone eventually notices"], correct: 1, expl: "Roles are distinct without overlapping authority, but this only works if everyone communicates — assuming someone else has already reported something is exactly how a danger goes unreported." },
    { q: "Why must communication between the lookout and the OOW be immediate, even for information that seems minor?", opts: ["It does not need to be immediate", "Because it is the OOW's job to assess relevance, not the lookout's job to filter — an observation with no consequence is preferable to an important one never reported", "Only urgent-looking information needs to be reported immediately", "Because the OOW asks for updates only at fixed intervals"], correct: 1, expl: "The OOW evaluates relevance; the lookout's role is to report, not to pre-filter. An observation that turns out to be nothing is a far smaller cost than an important one that was never mentioned." },
  ],
  fr: [
    { q: "Qui est responsable légal du quart de navigation ?", opts: ["La vigie", "L'OOW (Officer of the Watch), même si le commandement ultime du navire reste toujours au Master", "Le timonier", "Personne en particulier, c'est une responsabilité partagée"], correct: 1, expl: "L'OOW est le responsable direct de la conduite du quart, mais le commandement ultime du navire reste toujours au Master, qui peut intervenir à tout moment." },
    { q: "Que signifie \"veille efficace\" selon COLREG Règle 5 ?", opts: ["Uniquement regarder visuellement", "Observer en permanence, par tous les moyens disponibles et adaptés aux circonstances", "Utiliser uniquement le radar, la nuit", "Ce n'est nécessaire que le jour"], correct: 1, expl: "COLREG Règle 5 exige de maintenir une veille efficace par tous les moyens disponibles adaptés aux circonstances — vue, ouïe, radar, AIS — pas un seul d'entre eux." },
    { q: "Quels moyens une vigie doit-elle utiliser en plus de la vue ?", opts: ["Aucun, la vue suffit", "L'ouïe, le radar, l'AIS — tous les moyens disponibles adaptés aux circonstances", "Uniquement des jumelles", "Uniquement la radio"], correct: 1, expl: "Une veille efficace combine tous les moyens disponibles — vue, ouïe, radar, AIS — pas la vue seule." },
    { q: "Que doit faire la vigie en cas de doute sur une observation ?", opts: ["Attendre confirmation avant de signaler", "La signaler immédiatement, même en cas d'incertitude", "L'ignorer si elle n'est pas sûre", "Demander à un collègue avant de signaler"], correct: 1, expl: "La vigie doit signaler immédiatement même en cas d'incertitude — c'est à l'OOW d'évaluer la pertinence, pas à la vigie de filtrer ses observations." },
    { q: "Qui décide de l'action à prendre face à un risque de collision ?", opts: ["La vigie", "L'OOW", "Le timonier", "Toujours le Master"], correct: 1, expl: "L'OOW décide d'une action ou non et communique sa décision à l'équipe passerelle ; la vigie et le timonier exécutent et signalent." },
    { q: "Quelle information doit être vérifiée avant de prendre le quart ?", opts: ["Uniquement l'heure", "La position, le cap, la météo et le trafic environnant", "Uniquement la météo", "Rien de particulier"], correct: 1, expl: "L'OOW qui prend le quart vérifie la position, le cap, la météo et le trafic environnant avant d'assumer la responsabilité." },
    { q: "Le timonier peut-il décider seul de changer de cap ?", opts: ["Oui, librement", "Non, il exécute les ordres de l'OOW et ne décide pas du cap", "Oui, uniquement en urgence", "Oui, si le cap actuel lui semble dangereux"], correct: 1, expl: "Le timonier exécute les ordres de barre de l'OOW ; décider du cap relève de la responsabilité de l'OOW, pas du timonier." },
    { q: "Quelle est la différence entre veille active et veille passive ?", opts: ["Il n'y a pas de différence", "La veille active signifie balayage systématique, écoute active et signalement immédiat ; la veille passive signifie regarder sans balayer activement", "La veille passive ne s'utilise que la nuit", "La veille active ne s'applique qu'en cas de brouillard"], correct: 1, expl: "La veille active est un balayage systématique, une écoute active et un signalement immédiat de toute observation ; la veille passive est une présence sans réelle vigilance." },
    { q: "Que doit faire un marin envoyé en ronde s'il détecte une anomalie ?", opts: ["Attendre l'heure de rapport prévue pour la mentionner", "La signaler sans délai, en plus du rapport de retour attendu à heure fixe", "La réparer lui-même d'abord", "L'ignorer si elle semble mineure"], correct: 1, expl: "Toute anomalie détectée pendant une ronde doit être signalée sans délai, en plus du rapport de retour attendu à heure fixe." },
    { q: "Pourquoi la fatigue est-elle un risque particulier pendant le quart de nuit ?", opts: ["Elle n'a aucun effet sur la veille", "Elle réduit la vigilance et la capacité à maintenir une veille continue et efficace, augmentant le risque de manquer une observation importante", "Elle n'affecte que le timonier", "Elle ne compte qu'en cas de mauvais temps"], correct: 1, expl: "Une veille efficace doit être continue — la fatigue nuit précisément à cette continuité, augmentant le risque qu'une observation importante soit manquée." },
    { q: "Qu'est-ce qu'une relève de quart incomplète peut provoquer ?", opts: ["Rien de significatif", "Une perte d'information critique (position, trafic, tâches en cours) pouvant mettre en danger la sécurité de la navigation", "Un simple désagrément mineur", "Cela n'affecte que la paperasse"], correct: 1, expl: "La relève doit transmettre position, cap, trafic, météo, tâches en cours, état des équipements et alarmes/pannes connues — l'omission de l'un de ces éléments peut créer un angle mort dangereux pour l'OOW entrant." },
    { q: "Quel rôle joue le radar dans la veille efficace ?", opts: ["Aucun, le radar est optionnel", "C'est l'un des moyens disponibles à utiliser en complément de la vue et de l'ouïe, notamment pour détecter les contacts", "Il remplace entièrement le besoin d'une vigie humaine", "Il ne s'utilise qu'au port"], correct: 1, expl: "Le radar est l'un des moyens (avec la vue, l'ouïe et l'AIS) qu'une veille efficace utilise pour détecter les contacts, comme illustré lorsqu'un contact radar apparaît et est évalué pour son risque de collision." },
    { q: "Un OOW peut-il déléguer sa responsabilité légale du quart ?", opts: ["Oui, entièrement, une fois les tâches assignées", "Non, il en reste responsable même en déléguant des tâches comme la barre ou la veille à d'autres membres de l'équipe", "Oui, mais uniquement au timonier", "Oui, mais uniquement la nuit"], correct: 1, expl: "L'OOW reste le seul responsable direct du quart même lorsque des tâches précises (barre, veille, rondes) sont déléguées à d'autres membres de l'équipe." },
    { q: "Que doit transmettre l'OOW sortant à l'OOW entrant sur le trafic environnant ?", opts: ["Rien, le trafic est évident", "Le trafic connu à proximité", "Uniquement le trafic à plus de 20 milles", "Uniquement le trafic déjà signalé au VTS"], correct: 1, expl: "Le trafic connu fait partie des éléments à transmettre lors de la relève de quart, avec la position, le cap, la vitesse, la météo, les tâches en cours et l'état des équipements." },
    { q: "Pourquoi ne faut-il jamais assumer qu'un autre membre de l'équipe a déjà vu un danger ?", opts: ["Parce que supposer fait gagner du temps et est généralement juste", "Parce que chaque rôle a une responsabilité distincte, et le silence basé sur une supposition peut créer un angle mort partagé", "Parce que seul l'OOW est autorisé à voir les dangers", "Cela n'a pas d'importance, tant que quelqu'un finit par le remarquer"], correct: 1, expl: "Les rôles sont distincts sans chevauchement d'autorité, mais cela ne fonctionne que si chacun communique — supposer que quelqu'un d'autre a déjà signalé quelque chose est exactement ce qui fait qu'un danger reste non signalé." },
    { q: "Pourquoi la communication entre la vigie et l'OOW doit-elle être immédiate, même pour une information qui semble mineure ?", opts: ["Elle n'a pas besoin d'être immédiate", "Parce que c'est à l'OOW d'évaluer la pertinence, pas à la vigie de filtrer — une observation sans conséquence vaut mieux qu'une observation importante jamais signalée", "Seule une information visiblement urgente doit être signalée immédiatement", "Parce que l'OOW ne demande des mises à jour qu'à intervalles fixes"], correct: 1, expl: "L'OOW évalue la pertinence ; le rôle de la vigie est de signaler, pas de préfiltrer. Une observation qui s'avère sans conséquence coûte bien moins cher qu'une observation importante jamais mentionnée." },
  ],
  es: [
    { q: "¿Quién es legalmente responsable de la guardia de navegación?", opts: ["El vigía", "El OOW (Officer of the Watch), aunque el mando supremo del buque siempre permanece en el Master", "El timonel", "Nadie en particular, es una responsabilidad compartida"], correct: 1, expl: "El OOW es el responsable directo de la conducción de la guardia, pero el mando supremo del buque siempre permanece en el Master, quien puede intervenir en cualquier momento." },
    { q: "¿Qué significa \"vigilancia eficaz\" según la Regla 5 del COLREG?", opts: ["Solo mirar visualmente", "Observar de manera permanente, por todos los medios disponibles y adaptados a las circunstancias", "Usar solo el radar, de noche", "Solo es necesario de día"], correct: 1, expl: "La Regla 5 del COLREG exige mantener una vigilancia eficaz por todos los medios disponibles adaptados a las circunstancias — vista, oído, radar, AIS — no solo uno de ellos." },
    { q: "¿Qué medios debe utilizar un vigía además de la vista?", opts: ["Ninguno, la vista basta", "El oído, el radar, el AIS — todos los medios disponibles adaptados a las circunstancias", "Solo prismáticos", "Solo la radio"], correct: 1, expl: "Una vigilancia eficaz combina todos los medios disponibles — vista, oído, radar, AIS — no solo la vista." },
    { q: "¿Qué debe hacer el vigía en caso de duda sobre una observación?", opts: ["Esperar confirmación antes de informar", "Informarla de inmediato, incluso con incertidumbre", "Ignorarla si no está seguro", "Preguntar a un compañero antes de informar"], correct: 1, expl: "El vigía debe informar de inmediato incluso con incertidumbre — es tarea del OOW evaluar la pertinencia, no del vigía filtrar sus observaciones." },
    { q: "¿Quién decide la acción a tomar ante un riesgo de colisión?", opts: ["El vigía", "El OOW", "El timonel", "Siempre el Master"], correct: 1, expl: "El OOW decide si actuar o no y comunica la decisión al equipo de puente; el vigía y el timonel ejecutan e informan." },
    { q: "¿Qué información debe verificarse antes de tomar la guardia?", opts: ["Solo la hora", "La posición, el rumbo, la meteorología y el tráfico circundante", "Solo la meteorología", "Nada en particular"], correct: 1, expl: "El OOW que toma la guardia verifica la posición, el rumbo, la meteorología y el tráfico circundante antes de asumir la responsabilidad." },
    { q: "¿Puede el timonel decidir solo cambiar de rumbo?", opts: ["Sí, libremente", "No, ejecuta las órdenes del OOW y no decide el rumbo", "Sí, solo en emergencia", "Sí, si el rumbo actual le parece peligroso"], correct: 1, expl: "El timonel ejecuta las órdenes de timón del OOW; decidir el rumbo es responsabilidad del OOW, no del timonel." },
    { q: "¿Cuál es la diferencia entre vigilancia activa y pasiva?", opts: ["No hay diferencia", "La vigilancia activa significa escaneo sistemático, escucha activa y notificación inmediata; la pasiva significa mirar sin escanear activamente", "La vigilancia pasiva solo se usa de noche", "La vigilancia activa solo se aplica con niebla"], correct: 1, expl: "La vigilancia activa es un escaneo sistemático, una escucha activa y una notificación inmediata de cualquier observación; la pasiva es una presencia sin vigilancia real." },
    { q: "¿Qué debe hacer un marinero enviado de ronda si detecta una anomalía?", opts: ["Esperar la hora de informe prevista para mencionarla", "Señalarla sin demora, además del informe de regreso esperado a una hora fija", "Repararla él mismo primero", "Ignorarla si parece menor"], correct: 1, expl: "Cualquier anomalía detectada durante una ronda debe señalarse sin demora, además del informe de regreso esperado a la hora fija." },
    { q: "¿Por qué la fatiga es un riesgo particular durante la guardia nocturna?", opts: ["No tiene ningún efecto en la vigilancia", "Reduce la vigilancia y la capacidad de mantener una vigilancia continua y eficaz, aumentando el riesgo de perder una observación importante", "Solo afecta al timonel", "Solo importa con mal tiempo"], correct: 1, expl: "Una vigilancia eficaz debe ser continua — la fatiga perjudica precisamente esa continuidad, aumentando el riesgo de que se pierda una observación importante." },
    { q: "¿Qué puede provocar un relevo de guardia incompleto?", opts: ["Nada significativo", "Una pérdida de información crítica (posición, tráfico, tareas en curso) que puede poner en peligro la seguridad de la navegación", "Solo un inconveniente menor", "Solo afecta al papeleo"], correct: 1, expl: "El relevo debe transmitir posición, rumbo, tráfico, meteorología, tareas en curso, estado de los equipos y alarmas/averías conocidas — omitir cualquiera de estos elementos puede crear un punto ciego peligroso para el OOW entrante." },
    { q: "¿Qué papel juega el radar en la vigilancia eficaz?", opts: ["Ninguno, el radar es opcional", "Es uno de los medios disponibles a usar junto con la vista y el oído, especialmente para detectar contactos", "Reemplaza por completo la necesidad de un vigía humano", "Solo se usa en puerto"], correct: 1, expl: "El radar es uno de los medios (junto con la vista, el oído y el AIS) que una vigilancia eficaz utiliza para detectar contactos, como se ilustra cuando aparece un contacto de radar y se evalúa su riesgo de colisión." },
    { q: "¿Puede un OOW delegar su responsabilidad legal de la guardia?", opts: ["Sí, por completo, una vez asignadas las tareas", "No, sigue siendo responsable incluso al delegar tareas como el timón o la vigilancia a otros miembros del equipo", "Sí, pero solo al timonel", "Sí, pero solo de noche"], correct: 1, expl: "El OOW sigue siendo el único responsable directo de la guardia incluso cuando se delegan tareas específicas (timón, vigilancia, rondas) a otros miembros del equipo." },
    { q: "¿Qué debe transmitir el OOW saliente al OOW entrante sobre el tráfico circundante?", opts: ["Nada, el tráfico es evidente", "El tráfico conocido en las proximidades", "Solo el tráfico a más de 20 millas", "Solo el tráfico ya informado al VTS"], correct: 1, expl: "El tráfico conocido es uno de los elementos que deben transmitirse en el relevo de guardia, junto con la posición, el rumbo, la velocidad, la meteorología, las tareas en curso y el estado de los equipos." },
    { q: "¿Por qué nunca hay que asumir que otro miembro del equipo ya ha visto un peligro?", opts: ["Porque suponer ahorra tiempo y suele ser correcto", "Porque cada rol tiene una responsabilidad distinta, y el silencio basado en una suposición puede crear un punto ciego compartido", "Porque solo el OOW está autorizado a ver peligros", "No importa, mientras alguien lo note eventualmente"], correct: 1, expl: "Los roles son distintos sin solapamiento de autoridad, pero esto solo funciona si todos comunican — suponer que alguien más ya informó algo es exactamente lo que hace que un peligro quede sin informar." },
    { q: "¿Por qué la comunicación entre el vigía y el OOW debe ser inmediata, incluso para información que parece menor?", opts: ["No necesita ser inmediata", "Porque es tarea del OOW evaluar la pertinencia, no del vigía filtrar — una observación sin consecuencia es preferible a una importante nunca informada", "Solo la información visiblemente urgente debe informarse de inmediato", "Porque el OOW solo pide actualizaciones a intervalos fijos"], correct: 1, expl: "El OOW evalúa la pertinencia; el papel del vigía es informar, no prefiltrar. Una observación que resulta no tener consecuencia cuesta mucho menos que una importante que nunca se mencionó." },
  ],
  pt: [
    { q: "Quem é legalmente responsável pelo quarto de navegação?", opts: ["O vigia", "O OOW (Officer of the Watch), mesmo que o comando supremo do navio permaneça sempre com o Master", "O timoneiro", "Ninguém em particular, é uma responsabilidade partilhada"], correct: 1, expl: "O OOW é o responsável direto pela condução do quarto, mas o comando supremo do navio permanece sempre com o Master, que pode intervir a qualquer momento." },
    { q: "O que significa \"vigilância eficaz\" segundo a Regra 5 do COLREG?", opts: ["Só olhar visualmente", "Observar permanentemente, por todos os meios disponíveis e adequados às circunstâncias", "Usar só o radar, à noite", "Só é necessário de dia"], correct: 1, expl: "A Regra 5 do COLREG exige manter uma vigilância eficaz por todos os meios disponíveis adequados às circunstâncias — visão, audição, radar, AIS — não apenas um deles." },
    { q: "Que meios deve um vigia usar além da visão?", opts: ["Nenhum, a visão basta", "A audição, o radar, o AIS — todos os meios disponíveis adequados às circunstâncias", "Só binóculos", "Só o rádio"], correct: 1, expl: "Uma vigilância eficaz combina todos os meios disponíveis — visão, audição, radar, AIS — não apenas a visão." },
    { q: "O que deve fazer o vigia em caso de dúvida sobre uma observação?", opts: ["Esperar confirmação antes de sinalizar", "Sinalizá-la de imediato, mesmo com incerteza", "Ignorá-la se não tiver certeza", "Perguntar a um colega antes de sinalizar"], correct: 1, expl: "O vigia deve sinalizar de imediato mesmo com incerteza — cabe ao OOW avaliar a pertinência, não ao vigia filtrar as suas observações." },
    { q: "Quem decide a ação a tomar perante um risco de colisão?", opts: ["O vigia", "O OOW", "O timoneiro", "Sempre o Master"], correct: 1, expl: "O OOW decide se age ou não e comunica a decisão à equipa do passadiço; o vigia e o timoneiro executam e reportam." },
    { q: "Que informação deve ser verificada antes de assumir o quarto?", opts: ["Só a hora", "A posição, o rumo, a meteorologia e o tráfego circundante", "Só a meteorologia", "Nada em particular"], correct: 1, expl: "O OOW que assume o quarto verifica a posição, o rumo, a meteorologia e o tráfego circundante antes de assumir a responsabilidade." },
    { q: "Pode o timoneiro decidir sozinho mudar de rumo?", opts: ["Sim, livremente", "Não, executa as ordens do OOW e não decide o rumo", "Sim, só em emergência", "Sim, se o rumo atual lhe parecer perigoso"], correct: 1, expl: "O timoneiro executa as ordens de leme do OOW; decidir o rumo é responsabilidade do OOW, não do timoneiro." },
    { q: "Qual é a diferença entre vigilância ativa e passiva?", opts: ["Não há diferença", "A vigilância ativa significa varrimento sistemático, escuta ativa e sinalização imediata; a passiva significa olhar sem varrer ativamente", "A vigilância passiva só se usa à noite", "A vigilância ativa só se aplica com nevoeiro"], correct: 1, expl: "A vigilância ativa é um varrimento sistemático, uma escuta ativa e uma sinalização imediata de qualquer observação; a passiva é uma presença sem vigilância real." },
    { q: "O que deve fazer um marinheiro enviado em ronda se detetar uma anomalia?", opts: ["Esperar pela hora de relatório prevista para a mencionar", "Sinalizá-la sem demora, além do relatório de regresso esperado a uma hora fixa", "Repará-la ele próprio primeiro", "Ignorá-la se parecer menor"], correct: 1, expl: "Qualquer anomalia detetada durante uma ronda deve ser sinalizada sem demora, além do relatório de regresso esperado à hora fixa." },
    { q: "Por que a fadiga é um risco particular durante o quarto noturno?", opts: ["Não tem nenhum efeito na vigilância", "Reduz a vigilância e a capacidade de manter uma vigilância contínua e eficaz, aumentando o risco de perder uma observação importante", "Só afeta o timoneiro", "Só importa com mau tempo"], correct: 1, expl: "Uma vigilância eficaz deve ser contínua — a fadiga prejudica precisamente essa continuidade, aumentando o risco de que uma observação importante seja perdida." },
    { q: "O que pode provocar uma rendição de quarto incompleta?", opts: ["Nada significativo", "Uma perda de informação crítica (posição, tráfego, tarefas em curso) que pode pôr em perigo a segurança da navegação", "Apenas um inconveniente menor", "Só afeta a papelada"], correct: 1, expl: "A rendição deve transmitir posição, rumo, tráfego, meteorologia, tarefas em curso, estado dos equipamentos e alarmes/avarias conhecidos — omitir qualquer um destes elementos pode criar um ponto cego perigoso para o OOW entrante." },
    { q: "Que papel desempenha o radar na vigilância eficaz?", opts: ["Nenhum, o radar é opcional", "É um dos meios disponíveis a usar em complemento da visão e da audição, nomeadamente para detetar contactos", "Substitui inteiramente a necessidade de um vigia humano", "Só se usa no porto"], correct: 1, expl: "O radar é um dos meios (juntamente com a visão, a audição e o AIS) que uma vigilância eficaz usa para detetar contactos, como ilustrado quando um contacto de radar surge e é avaliado quanto ao seu risco de colisão." },
    { q: "Pode um OOW delegar a sua responsabilidade legal pelo quarto?", opts: ["Sim, inteiramente, depois de as tarefas serem atribuídas", "Não, continua responsável mesmo delegando tarefas como o leme ou a vigilância a outros membros da equipa", "Sim, mas só ao timoneiro", "Sim, mas só à noite"], correct: 1, expl: "O OOW continua a ser o único responsável direto pelo quarto mesmo quando tarefas específicas (leme, vigilância, rondas) são delegadas a outros membros da equipa." },
    { q: "O que deve transmitir o OOW saindo ao OOW entrante sobre o tráfego circundante?", opts: ["Nada, o tráfego é evidente", "O tráfego conhecido nas proximidades", "Só o tráfego a mais de 20 milhas", "Só o tráfego já reportado ao VTS"], correct: 1, expl: "O tráfego conhecido é um dos elementos a transmitir na rendição de quarto, juntamente com a posição, o rumo, a velocidade, a meteorologia, as tarefas em curso e o estado dos equipamentos." },
    { q: "Por que nunca se deve assumir que outro membro da equipa já viu um perigo?", opts: ["Porque assumir poupa tempo e geralmente está certo", "Porque cada papel tem uma responsabilidade distinta, e o silêncio baseado numa suposição pode criar um ponto cego partilhado", "Porque só o OOW está autorizado a ver perigos", "Não importa, desde que alguém acabe por reparar"], correct: 1, expl: "Os papéis são distintos sem sobreposição de autoridade, mas isto só funciona se todos comunicarem — assumir que outra pessoa já sinalizou algo é exatamente o que faz um perigo ficar por sinalizar." },
    { q: "Por que a comunicação entre o vigia e o OOW deve ser imediata, mesmo para informação que parece menor?", opts: ["Não precisa de ser imediata", "Porque cabe ao OOW avaliar a pertinência, não ao vigia filtrar — uma observação sem consequência é preferível a uma importante nunca sinalizada", "Só informação visivelmente urgente deve ser sinalizada de imediato", "Porque o OOW só pede atualizações a intervalos fixos"], correct: 1, expl: "O OOW avalia a pertinência; o papel do vigia é sinalizar, não pré-filtrar. Uma observação que acaba por não ter consequência custa muito menos do que uma importante nunca mencionada." },
  ],
};

// Final quiz — 5 questions selected from the 16-question bank (indices 0,1,4,7,15)
const QUIZ_INDICES = [0, 1, 4, 7, 15];
const buildQuiz = (lang) => {
  const bank = BANK[lang] || BANK.en;
  return QUIZ_INDICES.map(i => bank[i]);
};

const getContent = lang => {
  const d = {
    en: {
      badge: "📚 Navigation & Cartography · Lesson 10/10 · ⭐ Premium · 200 XP · 🏁 MODULE COMPLETE",
      title: "Watchkeeping Organization & Responsibilities",
      intro: "A safe navigational watch does not depend on one person doing everything — it depends on clearly defined roles, continuous vigilance, and immediate communication between them.\n\nThis lesson covers who does what on the bridge, why effective lookout matters under COLREG Rule 5, and what a watch handover must contain. For the exact SMCP phraseology of the handover itself, see lesson d4-l1 — Bridge Watch & Reporting.",
      p1: "PART 1 — BRIDGE TEAM ROLES SIMULATOR",
      s1: "BRIDGE TEAM ROLES:\n\nWatch assumed → position/heading/weather/traffic checked →\nhelmsman assigned or autopilot engaged → lookout posted →\nradar contact assessed → OOW decides → routine round sent.\n\nEach step has one clearly responsible role — never ambiguous.",
      p2: "PART 2 — THE WATCH ORGANIZATION CHART",
      s2: "WATCH ORGANIZATION:\n\nOOW (responsible for the watch) →\nHelmsman (helm execution) →\nLookout (watchkeeping) →\nRating (sent on rounds)\n\nThe OOW conducts the watch — but ultimate command of the vessel always remains with the Master, who may intervene at any time.",
      p3: "PART 3 — EFFECTIVE LOOKOUT: WHAT COUNTS",
      s3: "EFFECTIVE LOOKOUT (COLREG Rule 5):\n\nActive lookout: systematic scanning, active listening, immediate reporting.\nPassive lookout: looking without actively scanning — not sufficient.\n\nAll available means: sight, hearing, radar, AIS.\nThree qualities: continuous, systematic, adapted to circumstances.",
      p4: "PART 4 — WATCH HANDOVER CHECKLIST",
      s4: "WATCH HANDOVER CONTENT:\n\nPosition & method · Heading & speed ·\nKnown traffic · Weather conditions ·\nOngoing tasks · Any abnormality ·\nNavigation equipment status (when relevant) ·\nKnown alarms, failures or limitations.\n\nFor the exact SMCP wording, see lesson d4-l1.",
      p5: "PART 5 — WATCH ROLES VOCABULARY QUIZ",
      p6: "🎯 EXERCISE", p7: "📝 QUESTION BANK — 16 QUESTIONS",
      sumT: "SUMMARY — WATCHKEEPING ORGANIZATION",
      sumP: [
        "The watch has a single direct responsible at a time: the OOW — but ultimate command always remains with the Master.",
        "Effective lookout combines all available means, not sight alone, and must be continuous, systematic and adapted to circumstances.",
        "Report in case of doubt — never filter an observation out of fear of being wrong.",
        "The watch handover transmits precise content (position, heading, traffic, weather, ongoing tasks, equipment status, known alarms/failures) — see SMCP L1 for the exact wording.",
        "Each role (OOW, helmsman, lookout) has a distinct responsibility, with no overlap in authority.",
        "Good watch organization rests on clearly defined responsibilities, continuous communication and permanent vigilance.",
      ],
      learnedP: [
        "Bridge team roles: watch assumption, checks, lookout posting, radar contact handling, rounds",
        "The watch organization chart, and the Master's ultimate command at all times",
        "Effective lookout under COLREG Rule 5: active vs passive, all means, three qualities",
        "The precise content of a watch handover (see d4-l1 for the SMCP wording)",
        "When and why doubt must always be reported, never filtered",
      ],
    },
    fr: {
      badge: "📚 Navigation & Cartographie · Leçon 10/10 · ⭐ Premium · 200 XP · 🏁 FIN DU MODULE",
      title: "Organisation du Quart & Responsabilités",
      intro: "Un quart de navigation sûr ne repose pas sur une seule personne qui ferait tout — il repose sur des rôles clairement définis, une vigilance continue, et une communication immédiate entre eux.\n\nCette leçon couvre qui fait quoi à la passerelle, pourquoi la veille efficace compte selon COLREG Règle 5, et ce qu'une relève de quart doit contenir. Pour la phraséologie SMCP exacte de la relève elle-même, voir la leçon d4-l1 — Bridge Watch & Reporting.",
      p1: "PARTIE 1 — SIMULATEUR ÉQUIPE PASSERELLE",
      s1: "RÔLES DE L'ÉQUIPE PASSERELLE :\n\nQuart pris → position/cap/météo/trafic vérifiés →\ntimonier affecté ou pilote automatique engagé → vigie postée →\ncontact radar évalué → l'OOW décide → ronde de routine envoyée.\n\nChaque étape a un rôle clairement responsable — jamais ambigu.",
      p2: "PARTIE 2 — L'ORGANIGRAMME DU QUART",
      s2: "ORGANISATION DU QUART :\n\nOOW (responsable du quart) →\nTimonier (exécution barre) →\nVigie (veille) →\nMatelot (envoyé en ronde)\n\nL'OOW dirige la conduite du quart — mais le commandement ultime du navire reste toujours au Master, qui peut intervenir à tout moment.",
      p3: "PARTIE 3 — VEILLE EFFICACE : CE QUI COMPTE",
      s3: "VEILLE EFFICACE (COLREG Règle 5) :\n\nVeille active : balayage systématique, écoute active, signalement immédiat.\nVeille passive : regarder sans balayer activement — insuffisant.\n\nTous les moyens disponibles : vue, ouïe, radar, AIS.\nTrois qualités : continue, systématique, adaptée aux circonstances.",
      p4: "PARTIE 4 — CHECKLIST DE RELÈVE DE QUART",
      s4: "CONTENU DE LA RELÈVE DE QUART :\n\nPosition & méthode · Cap & vitesse ·\nTrafic connu · Conditions météo ·\nTâches en cours · Toute anomalie ·\nÉtat des équipements de navigation (si pertinent) ·\nAlarmes, pannes ou limitations connues.\n\nPour la formulation SMCP exacte, voir la leçon d4-l1.",
      p5: "PARTIE 5 — QUIZ VOCABULAIRE DES RÔLES",
      p6: "🎯 EXERCICE", p7: "📝 BANQUE 16 QUESTIONS",
      sumT: "RÉSUMÉ — ORGANISATION DU QUART",
      sumP: [
        "Le quart a un seul responsable direct à la fois : l'OOW — mais le commandement ultime reste toujours au Master.",
        "La veille efficace combine tous les moyens disponibles, pas seulement la vue, et doit être continue, systématique et adaptée aux circonstances.",
        "Signaler en cas de doute — jamais filtrer une observation par crainte de se tromper.",
        "La relève de quart transmet un contenu précis (position, cap, trafic, météo, tâches en cours, état des équipements, alarmes/pannes connues) — voir SMCP L1 pour la formulation exacte.",
        "Chaque rôle (OOW, timonier, vigie) a une responsabilité distincte, sans chevauchement d'autorité.",
        "Une bonne organisation du quart repose sur des responsabilités clairement définies, une communication continue et une vigilance permanente.",
      ],
      learnedP: [
        "Rôles de l'équipe passerelle : prise de quart, vérifications, veille postée, gestion d'un contact radar, rondes",
        "L'organigramme du quart, et le commandement ultime du Master à tout moment",
        "La veille efficace selon COLREG Règle 5 : active vs passive, tous les moyens, trois qualités",
        "Le contenu précis d'une relève de quart (voir d4-l1 pour la formulation SMCP)",
        "Quand et pourquoi un doute doit toujours être signalé, jamais filtré",
      ],
    },
    es: {
      badge: "📚 Navegación & Cartografía · Lección 10/10 · ⭐ Premium · 200 XP · 🏁 FIN DEL MÓDULO",
      title: "Organización de la Guardia y Responsabilidades",
      intro: "Una guardia de navegación segura no depende de una sola persona que lo haga todo — depende de roles claramente definidos, vigilancia continua y comunicación inmediata entre ellos.\n\nEsta lección cubre quién hace qué en el puente, por qué la vigilancia eficaz importa según la Regla 5 del COLREG, y qué debe contener un relevo de guardia. Para la fraseología SMCP exacta del propio relevo, ver la lección d4-l1 — Bridge Watch & Reporting.",
      p1: "PARTE 1 — SIMULADOR EQUIPO DE PUENTE",
      s1: "ROLES DEL EQUIPO DE PUENTE:\n\nGuardia asumida → posición/rumbo/meteorología/tráfico verificados →\ntimonel asignado o piloto automático conectado → vigía apostado →\ncontacto de radar evaluado → el OOW decide → ronda de rutina enviada.\n\nCada etapa tiene un rol claramente responsable — nunca ambiguo.",
      p2: "PARTE 2 — EL ORGANIGRAMA DE LA GUARDIA",
      s2: "ORGANIZACIÓN DE LA GUARDIA:\n\nOOW (responsable de la guardia) →\nTimonel (ejecución del timón) →\nVigía (vigilancia) →\nMarinero (enviado de ronda)\n\nEl OOW dirige la conducción de la guardia — pero el mando supremo del buque siempre permanece en el Master, quien puede intervenir en cualquier momento.",
      p3: "PARTE 3 — VIGILANCIA EFICAZ: LO QUE CUENTA",
      s3: "VIGILANCIA EFICAZ (Regla 5 COLREG):\n\nVigilancia activa: escaneo sistemático, escucha activa, notificación inmediata.\nVigilancia pasiva: mirar sin escanear activamente — insuficiente.\n\nTodos los medios disponibles: vista, oído, radar, AIS.\nTres cualidades: continua, sistemática, adaptada a las circunstancias.",
      p4: "PARTE 4 — LISTA DE VERIFICACIÓN DE RELEVO",
      s4: "CONTENIDO DEL RELEVO DE GUARDIA:\n\nPosición y método · Rumbo y velocidad ·\nTráfico conocido · Condiciones meteorológicas ·\nTareas en curso · Cualquier anomalía ·\nEstado de los equipos de navegación (si pertinente) ·\nAlarmas, averías o limitaciones conocidas.\n\nPara la formulación SMCP exacta, ver la lección d4-l1.",
      p5: "PARTE 5 — QUIZ DE VOCABULARIO DE ROLES",
      p6: "🎯 EJERCICIO", p7: "📝 BANCO 16 PREGUNTAS",
      sumT: "RESUMEN — ORGANIZACIÓN DE LA GUARDIA",
      sumP: [
        "La guardia tiene un único responsable directo a la vez: el OOW — pero el mando supremo siempre permanece en el Master.",
        "La vigilancia eficaz combina todos los medios disponibles, no solo la vista, y debe ser continua, sistemática y adaptada a las circunstancias.",
        "Informar en caso de duda — nunca filtrar una observación por miedo a equivocarse.",
        "El relevo de guardia transmite un contenido preciso (posición, rumbo, tráfico, meteorología, tareas en curso, estado de los equipos, alarmas/averías conocidas) — ver SMCP L1 para la formulación exacta.",
        "Cada rol (OOW, timonel, vigía) tiene una responsabilidad distinta, sin solapamiento de autoridad.",
        "Una buena organización de la guardia se basa en responsabilidades claramente definidas, comunicación continua y vigilancia permanente.",
      ],
      learnedP: [
        "Roles del equipo de puente: toma de guardia, verificaciones, vigía apostado, gestión de un contacto de radar, rondas",
        "El organigrama de la guardia, y el mando supremo del Master en todo momento",
        "La vigilancia eficaz según la Regla 5 del COLREG: activa vs pasiva, todos los medios, tres cualidades",
        "El contenido preciso de un relevo de guardia (ver d4-l1 para la formulación SMCP)",
        "Cuándo y por qué una duda siempre debe informarse, nunca filtrarse",
      ],
    },
    pt: {
      badge: "📚 Navegação & Cartografia · Lição 10/10 · ⭐ Premium · 200 XP · 🏁 FIM DO MÓDULO",
      title: "Organização do Quarto e Responsabilidades",
      intro: "Um quarto de navegação seguro não depende de uma única pessoa fazer tudo — depende de papéis claramente definidos, vigilância contínua, e comunicação imediata entre eles.\n\nEsta lição cobre quem faz o quê no passadiço, por que a vigilância eficaz importa segundo a Regra 5 do COLREG, e o que uma rendição de quarto deve conter. Para a fraseologia SMCP exata da própria rendição, ver a lição d4-l1 — Bridge Watch & Reporting.",
      p1: "PARTE 1 — SIMULADOR EQUIPA DO PASSADIÇO",
      s1: "PAPÉIS DA EQUIPA DO PASSADIÇO:\n\nQuarto assumido → posição/rumo/meteorologia/tráfego verificados →\ntimoneiro destacado ou piloto automático ligado → vigia colocado →\ncontacto de radar avaliado → o OOW decide → ronda de rotina enviada.\n\nCada etapa tem um papel claramente responsável — nunca ambíguo.",
      p2: "PARTE 2 — O ORGANOGRAMA DO QUARTO",
      s2: "ORGANIZAÇÃO DO QUARTO:\n\nOOW (responsável pelo quarto) →\nTimoneiro (execução do leme) →\nVigia (vigilância) →\nMarinheiro (enviado em ronda)\n\nO OOW dirige a condução do quarto — mas o comando supremo do navio permanece sempre com o Master, que pode intervir a qualquer momento.",
      p3: "PARTE 3 — VIGILÂNCIA EFICAZ: O QUE CONTA",
      s3: "VIGILÂNCIA EFICAZ (Regra 5 do COLREG):\n\nVigilância ativa: varrimento sistemático, escuta ativa, sinalização imediata.\nVigilância passiva: olhar sem varrer ativamente — insuficiente.\n\nTodos os meios disponíveis: visão, audição, radar, AIS.\nTrês qualidades: contínua, sistemática, adaptada às circunstâncias.",
      p4: "PARTE 4 — LISTA DE VERIFICAÇÃO DA RENDIÇÃO",
      s4: "CONTEÚDO DA RENDIÇÃO DE QUARTO:\n\nPosição e método · Rumo e velocidade ·\nTráfego conhecido · Condições meteorológicas ·\nTarefas em curso · Qualquer anomalia ·\nEstado dos equipamentos de navegação (quando pertinente) ·\nAlarmes, avarias ou limitações conhecidos.\n\nPara a formulação SMCP exata, ver a lição d4-l1.",
      p5: "PARTE 5 — QUIZ DE VOCABULÁRIO DOS PAPÉIS",
      p6: "🎯 EXERCÍCIO", p7: "📝 BANCO 16 QUESTÕES",
      sumT: "RESUMO — ORGANIZAÇÃO DO QUARTO",
      sumP: [
        "O quarto tem um único responsável direto de cada vez: o OOW — mas o comando supremo permanece sempre com o Master.",
        "A vigilância eficaz combina todos os meios disponíveis, não só a visão, e deve ser contínua, sistemática e adaptada às circunstâncias.",
        "Sinalizar em caso de dúvida — nunca filtrar uma observação por medo de se enganar.",
        "A rendição de quarto transmite um conteúdo preciso (posição, rumo, tráfego, meteorologia, tarefas em curso, estado dos equipamentos, alarmes/avarias conhecidos) — ver SMCP L1 para a formulação exata.",
        "Cada papel (OOW, timoneiro, vigia) tem uma responsabilidade distinta, sem sobreposição de autoridade.",
        "Uma boa organização do quarto assenta em responsabilidades claramente definidas, comunicação contínua e vigilância permanente.",
      ],
      learnedP: [
        "Papéis da equipa do passadiço: assunção do quarto, verificações, vigia colocado, gestão de um contacto de radar, rondas",
        "O organograma do quarto, e o comando supremo do Master a qualquer momento",
        "A vigilância eficaz segundo a Regra 5 do COLREG: ativa vs passiva, todos os meios, três qualidades",
        "O conteúdo preciso de uma rendição de quarto (ver d4-l1 para a formulação SMCP)",
        "Quando e por que uma dúvida deve ser sempre sinalizada, nunca filtrada",
      ],
    },
  };
  return d[lang] || d.en;
};

export default function LessonWatchOrganization({ lang = "en", onBack = () => {}, onComplete = () => {} }) {
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
            <div style={{ fontSize: 10, color: C.teal, letterSpacing: 1, fontFamily: "'Cinzel',serif" }}>🧭 {lang === "fr" ? "Navigation & Cartographie" : lang === "en" ? "Navigation & Cartography" : lang === "es" ? "Navegación & Cartografía" : "Navegação & Cartografia"}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{lang === "fr" ? "Leçon 10/10" : lang === "en" ? "Lesson 10/10" : lang === "es" ? "Lección 10/10" : "Lição 10/10"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(201,146,42,0.2)", border: `1px solid ${C.gold}44`, color: C.gold, fontWeight: 700 }}>⭐ PREMIUM</div>
            <div style={{ fontSize: 11, color: C.teal, fontFamily: "'Cinzel',serif" }}>{progress}%</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.teal},${C.gold2})`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px", position: "relative", zIndex: 1, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "all 0.5s ease" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {phase === "content" && <>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, marginBottom: 10, background: `${C.teal}15`, border: `1px solid ${C.teal}44`, fontSize: 11, color: C.teal, fontWeight: 700 }}>{lc.badge}</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.3, margin: "0 0 16px" }}>{lc.title}</h1>
            <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.teal}` }}>
              <div style={{ fontSize: 14, color: "rgba(240,244,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.intro}</div>
            </Card>

            <SL icon="🗣️" text={lc.p1} color={C.teal} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s1}</div></Card>
            <Card style={{ marginBottom: 14, background: "rgba(0,5,20,0.7)", border: `1px solid ${C.teal}22` }}>
              <div style={{ fontSize: 11, color: C.teal, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🗣️ {lang === "fr" ? "SIMULATEUR — INTERACTIF" : lang === "en" ? "SIMULATOR — INTERACTIVE" : lang === "es" ? "SIMULADOR — INTERACTIVO" : "SIMULADOR — INTERATIVO"}</div>
              <BridgeTeamRolesSVG lang={lang} />
            </Card>

            <SL icon="🧭" text={lc.p2} color={C.gold2} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s2}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold2}22` }}>
              <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🧭 {lang === "fr" ? "ORGANIGRAMME — INTERACTIF" : lang === "en" ? "ORG CHART — INTERACTIVE" : lang === "es" ? "ORGANIGRAMA — INTERACTIVO" : "ORGANOGRAMA — INTERATIVO"}</div>
              <WatchOrganizationChartSVG lang={lang} />
            </Card>

            <SL icon="👁️" text={lc.p3} color={C.green} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s3}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.green}22` }}>
              <div style={{ fontSize: 11, color: C.green, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>👁️ {lang === "fr" ? "VEILLE EFFICACE — INTERACTIF" : lang === "en" ? "EFFECTIVE LOOKOUT — INTERACTIVE" : lang === "es" ? "VIGILANCIA EFICAZ — INTERACTIVO" : "VIGILÂNCIA EFICAZ — INTERATIVO"}</div>
              <EffectiveLookoutSVG lang={lang} />
            </Card>

            <SL icon="📋" text={lc.p4} color={C.red} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s4}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.red}22` }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>📋 {lang === "fr" ? "CHECKLIST — INTERACTIF" : lang === "en" ? "CHECKLIST — INTERACTIVE" : lang === "es" ? "LISTA — INTERACTIVO" : "LISTA — INTERATIVO"}</div>
              <WatchHandoverChecklistSVG lang={lang} />
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}33` }}><WatchRolesVocabQuiz lang={lang} /></Card>

            <SL icon="📝" text={lc.p6} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}><Exercise1 lang={lang} t={t} /></Card>

            <SL icon="📚" text={lc.p7} color={C.purple} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.purple}44`, background: "linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))" }}><QuestionBank lang={lang} t={t} questions={bank} /></Card>

            <Card style={{ marginBottom: 14, background: `${C.teal}08`, border: `1px solid ${C.teal}22` }}>
              <div style={{ fontSize: 11, color: C.teal, letterSpacing: 3, fontFamily: "'Cinzel',serif", marginBottom: 12 }}>{lc.sumT}</div>
              {lc.sumP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < lc.sumP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 11, color: C.white }}><span style={{ color: C.teal, fontWeight: 700, fontFamily: "'Courier New',monospace" }}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={() => setPhase("quiz")} style={{ width: "100%", padding: "17px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.teal},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: C.white, cursor: "pointer", boxShadow: `0 10px 36px ${C.teal}33`, marginTop: 8 }}>{t.startQuiz}</button>
            <div style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8 }}>{t.readFirst}</div>
          </>}

          {phase === "quiz" && <>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 }}>
                {lang === "fr" ? "Quiz Final — Organisation du Quart" : lang === "en" ? "Final Quiz — Watchkeeping Organization" : lang === "es" ? "Quiz Final — Organización de la Guardia" : "Quiz Final — Organização do Quarto"}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>5 {lang === "fr" ? "questions · Leçon 10/10" : lang === "en" ? "questions · Lesson 10/10" : lang === "es" ? "preguntas · Lección 10/10" : "perguntas · Lição 10/10"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s => { setQuizScore(s); setTimeout(() => setPhase("done"), 1200); }} />
          </>}

          {phase === "done" && <div style={{ paddingTop: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>{t.complete}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 20, background: `${C.teal}15`, border: `1px solid ${C.teal}55`, fontSize: 14, color: C.teal, fontWeight: 700 }}>+{quizScore >= 4 ? 200 : quizScore === 3 ? 120 : 60} {t.xp} ⭐</div>
            </div>

            <Card style={{ marginBottom: 16, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏁</span>
                <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
                  {lang === "fr" ? "MODULE TERMINÉ !" : lang === "en" ? "MODULE COMPLETE!" : lang === "es" ? "¡MÓDULO COMPLETADO!" : "MÓDULO CONCLUÍDO!"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.white, lineHeight: 1.8 }}>
                {lang === "fr" ? "Navigation & Cartographie — 10 leçons maîtrisées 🧭" : lang === "en" ? "Navigation & Cartography — 10 lessons mastered 🧭" : lang === "es" ? "Navegación & Cartografía — 10 lecciones dominadas 🧭" : "Navegação & Cartografia — 10 lições dominadas 🧭"}
              </div>
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{t.youLearned}</div>
              {lc.learnedP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < lc.learnedP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 12, color: C.white }}><span style={{ color: C.teal, fontWeight: 700 }}>✓</span>{pt}</div>)}
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
