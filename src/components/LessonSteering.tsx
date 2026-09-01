import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank, shuffleQuestionOptions } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — STEERING ORDERS SIMULATOR
// ══════════════════════════════════════
function SteeringOrdersSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const steps = [
    {
      lines: [
        { speaker: "OOW", smcp: "Helmsman, stand by.", tr: { fr: "Timonier, tenez-vous prêt.", es: "Timonel, manténgase listo.", pt: "Timoneiro, mantenha-se pronto." } },
        { speaker: "Helmsman", smcp: "Standing by, sir.", tr: { fr: "Prêt, commandant.", es: "Listo, comandante.", pt: "Pronto, comandante." } },
      ],
      context: {
        fr: "Confirme que le timonier est physiquement en position et prêt à recevoir des ordres avant que la manœuvre ne commence.",
        en: "Confirms that the helmsman is physically at the wheel and ready to receive orders before the manoeuvre begins.",
        es: "Confirma que el timonel está físicamente en el timón y listo para recibir órdenes antes de que comience la maniobra.",
        pt: "Confirma que o timoneiro está fisicamente ao leme e pronto para receber ordens antes de a manobra começar.",
      },
    },
    {
      lines: [
        { speaker: "OOW", smcp: "Starboard ten.", tr: { fr: "Dix à tribord.", es: "Diez a estribor.", pt: "Dez a estibordo." } },
        { speaker: "Helmsman", smcp: "Starboard ten, sir.", tag: { fr: "avant exécution", en: "before execution", es: "antes de ejecutar", pt: "antes da execução" }, tr: { fr: "Dix à tribord, commandant.", es: "Diez a estribor, comandante.", pt: "Dez a estibordo, comandante." } },
      ],
      context: {
        fr: "Répétition obligatoire de l'ordre AVANT exécution — confirme que l'ordre a été entendu et compris correctement.",
        en: "Mandatory repetition of the order BEFORE execution — confirms the order was heard and understood correctly.",
        es: "Repetición obligatoria de la orden ANTES de ejecutarla — confirma que la orden se ha oído y entendido correctamente.",
        pt: "Repetição obrigatória da ordem ANTES da execução — confirma que a ordem foi ouvida e compreendida corretamente.",
      },
    },
    {
      lines: [
        { speaker: "Helmsman", smcp: "Ten of starboard wheel on, sir.", tag: { fr: "après exécution", en: "after execution", es: "después de ejecutar", pt: "depois da execução" }, tr: { fr: "Dix de barre à tribord appliqués, commandant.", es: "Diez de timón a estribor aplicados, comandante.", pt: "Dez de leme a estibordo aplicados, comandante." } },
      ],
      context: {
        fr: "Deuxième répétition APRÈS exécution — confirme que l'angle de barre demandé est physiquement appliqué. Cette double confirmation (avant/après) est la règle SMCP de sécurité pour les ordres de barre.",
        en: "Second repetition AFTER execution — confirms the requested rudder angle is physically applied. This double confirmation (before/after) is the SMCP safety rule for helm orders.",
        es: "Segunda repetición DESPUÉS de la ejecución — confirma que el ángulo de timón solicitado está físicamente aplicado. Esta doble confirmación (antes/después) es la regla de seguridad SMCP para las órdenes de timón.",
        pt: "Segunda repetição APÓS a execução — confirma que o ângulo de leme pedido está fisicamente aplicado. Esta dupla confirmação (antes/depois) é a regra de segurança SMCP para as ordens de leme.",
      },
    },
    {
      lines: [
        { speaker: "OOW", smcp: "Midships.", tr: { fr: "Milieu.", es: "Al medio.", pt: "Ao meio." } },
        { speaker: "Helmsman", smcp: "Midships, sir.", tr: { fr: "Milieu, commandant.", es: "Al medio, comandante.", pt: "Ao meio, comandante." } },
        { speaker: "Helmsman", smcp: "Midships, no wheel on, sir.", tag: { fr: "une fois la barre centrée", en: "once centred", es: "una vez centrado", pt: "uma vez centrado" }, tr: { fr: "Milieu, barre à zéro, commandant.", es: "Al medio, timón a cero, comandante.", pt: "Ao meio, leme a zero, comandante." } },
      ],
      context: {
        fr: "\"Midships\" ramène le gouvernail à zéro degré, pas le navire à un cap précis — erreur fréquente chez les débutants.",
        en: "\"Midships\" brings the rudder back to zero degrees, not the vessel to a precise heading — a frequent mistake among beginners.",
        es: "\"Midships\" devuelve el timón a cero grados, no el buque a un rumbo preciso — un error frecuente entre los principiantes.",
        pt: "\"Midships\" traz o leme de volta a zero graus, não o navio a um rumo preciso — um erro frequente entre principiantes.",
      },
    },
    {
      lines: [
        { speaker: "OOW", smcp: "Steady as she goes.", tr: { fr: "Maintenez le cap actuel.", es: "Mantenga el rumbo actual.", pt: "Mantenha o rumo atual." } },
        { speaker: "Helmsman", smcp: "Steady as she goes, sir.", tr: { fr: "Maintien du cap actuel, commandant.", es: "Manteniendo el rumbo actual, comandante.", pt: "A manter o rumo atual, comandante." } },
        { speaker: "Helmsman", smcp: "Steady on 275, sir.", tr: { fr: "Stable au 275, commandant.", es: "Estable en 275, comandante.", pt: "Estável no 275, comandante." } },
      ],
      context: {
        fr: "Cet ordre demande de maintenir le cap actuel du navire au moment de l'ordre — le timonier doit noter ce cap et le tenir.",
        en: "This order asks to maintain the vessel's current heading at the moment the order is given — the helmsman must note this heading and hold it.",
        es: "Esta orden pide mantener el rumbo actual del buque en el momento de la orden — el timonel debe anotar ese rumbo y mantenerlo.",
        pt: "Esta ordem pede para manter o rumo atual do navio no momento da ordem — o timoneiro deve anotar esse rumo e mantê-lo.",
      },
    },
    {
      lines: [
        { speaker: "OOW", smcp: "Steer 275.", tr: { fr: "Cap au 275.", es: "Rumbo al 275.", pt: "Rumo ao 275." } },
        { speaker: "Helmsman", smcp: "Steer 275, sir.", tr: { fr: "Cap au 275, commandant.", es: "Rumbo al 275, comandante.", pt: "Rumo ao 275, comandante." } },
        { speaker: "Helmsman", smcp: "Steady on 275, sir.", tag: { fr: "en approchant du cap", en: "when approaching the heading", es: "al acercarse al rumbo", pt: "ao aproximar-se do rumo" }, tr: { fr: "Stable au 275, commandant.", es: "Estable en 275, comandante.", pt: "Estável no 275, comandante." } },
      ],
      context: {
        fr: "Ordre de cap précis (toujours 3 chiffres), différent de \"steady as she goes\".",
        en: "Precise heading order (always 3 digits), different from \"steady as she goes\".",
        es: "Orden de rumbo preciso (siempre 3 cifras), diferente de \"steady as she goes\".",
        pt: "Ordem de rumo preciso (sempre 3 dígitos), diferente de \"steady as she goes\".",
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
            background: i <= step ? (i === step ? C.blue2 : `${C.blue2}55`) : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.blue2, letterSpacing: 2, textAlign: "center", marginBottom: 8, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "SIMULATEUR ORDRES DE BARRE" : lang === "en" ? "STEERING ORDERS SIMULATOR" : lang === "es" ? "SIMULADOR ÓRDENES DE TIMÓN" : "SIMULADOR ORDENS DE LEME"} — {step + 1}/{steps.length}
      </div>
      {s.lines.map((l, i) => {
        const isOOW = l.speaker === "OOW";
        return (
          <div key={i} style={{ padding: "12px", borderRadius: 14, marginBottom: 8,
            background: isOOW ? "rgba(77,166,255,0.08)" : "rgba(30,138,74,0.08)",
            border: `2px solid ${isOOW ? C.blue2 : C.green}55`, animation: "fadeUp 0.3s ease" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: isOOW ? C.blue2 : C.green, marginBottom: 6, letterSpacing: 1 }}>
              {isOOW ? "→" : "←"} {isOOW ? "OOW" : (lang === "fr" ? "Timonier" : lang === "en" ? "Helmsman" : lang === "es" ? "Timonel" : "Timoneiro")}
              {l.tag && <span style={{ color: C.muted, fontWeight: 400 }}> · {l.tag[lang] || l.tag.en}</span>}
            </div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: C.white, lineHeight: 1.6, fontWeight: 700 }}>
              "{l.smcp}"
            </div>
          </div>
        );
      })}
      {lang !== "en" && <button onClick={() => setShowTr(!showTr)} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: C.muted, cursor: "pointer", marginBottom: 8 }}>
        {showTr ? "▲ Hide" : "▼ "}{lang === "fr" ? "Traduction" : lang === "es" ? "Traducción" : "Tradução"}
      </button>}
      {lang !== "en" && showTr && (
        <div style={{ marginBottom: 8 }}>
          {s.lines.map((l, i) => (
            <div key={i} style={{ fontSize: 11, color: C.muted, marginBottom: 4, fontStyle: "italic" }}>{l.tr[lang] || l.tr.fr}</div>
          ))}
        </div>
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
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: step === steps.length - 1 ? "rgba(255,255,255,0.05)" : `${C.blue2}22`, border: `1px solid ${step === steps.length - 1 ? "rgba(255,255,255,0.08)" : C.blue2}`, color: C.white, cursor: step === steps.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — RUDDER & HELM RESPONSE
// ══════════════════════════════════════
function RudderHelmResponseSVG({ lang }) {
  const [tab, setTab] = useState("angle");

  const angles = [
    { id: "0", label: "0°", name: { fr: "Neutre", en: "Neutral", es: "Neutro", pt: "Neutro" },
      desc: { fr: "Gouvernail neutre : le navire maintient sa trajectoire rectiligne, aucune giration.", en: "Neutral rudder: the vessel holds its straight track, no turn.", es: "Timón neutro: el buque mantiene su trayectoria rectilínea, sin giro.", pt: "Leme neutro: o navio mantém a sua trajetória retilínea, sem giro." } },
    { id: "10", label: "10°", name: { fr: "Tribord 10°", en: "Starboard 10°", es: "Estribor 10°", pt: "Estibordo 10°" },
      desc: { fr: "10° à tribord : giration modérée, rayon de giration relativement large.", en: "10° to starboard: moderate turn, relatively wide turning circle.", es: "10° a estribor: giro moderado, radio de giro relativamente amplio.", pt: "10° a estibordo: giro moderado, raio de giro relativamente largo." } },
    { id: "30", label: "30°", name: { fr: "Tribord toute (30°)", en: "Hard-over (30°)", es: "Toda a estribor (30°)", pt: "Todo a estibordo (30°)" },
      desc: { fr: "30° à tribord (barre à fond) : giration maximale, rayon de giration le plus petit.", en: "30° to starboard (hard-over): maximum turn, the smallest turning circle.", es: "30° a estribor (toda a la banda): giro máximo, el radio de giro más pequeño.", pt: "30° a estibordo (todo o leme): giro máximo, o raio de giro mais pequeno." } },
  ];
  const [selAngle, setSelAngle] = useState("10");
  const a = angles.find(x => x.id === selAngle);

  const chain = [
    { icon: "🛞", label: { fr: "Mouvement de barre", en: "Rudder movement", es: "Movimiento de timón", pt: "Movimento de leme" } },
    { icon: "🌊", label: { fr: "Force hydrodynamique", en: "Hydrodynamic force", es: "Fuerza hidrodinámica", pt: "Força hidrodinâmica" } },
    { icon: "🚢", label: { fr: "L'étrave commence à pivoter", en: "Bow starts swinging", es: "La proa empieza a girar", pt: "A proa começa a virar" } },
    { icon: "🧭", label: { fr: "Le cap change", en: "Heading changes", es: "El rumbo cambia", pt: "O rumo muda" } },
    { icon: "📈", label: { fr: "La route change", en: "Course changes", es: "La derrota cambia", pt: "A derrota muda" } },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
        <button onClick={() => setTab("angle")} style={{ padding: "8px 4px", borderRadius: 10, cursor: "pointer", textAlign: "center", fontSize: 10, fontWeight: 700, background: tab === "angle" ? `${C.blue2}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${tab === "angle" ? C.blue2 : "rgba(255,255,255,0.08)"}`, color: tab === "angle" ? C.blue2 : C.muted }}>
          {lang === "fr" ? "Angle de barre & giration" : lang === "en" ? "Rudder angle & turning" : lang === "es" ? "Ángulo de timón y giro" : "Ângulo de leme e giro"}
        </button>
        <button onClick={() => setTab("chain")} style={{ padding: "8px 4px", borderRadius: 10, cursor: "pointer", textAlign: "center", fontSize: 10, fontWeight: 700, background: tab === "chain" ? `${C.gold2}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${tab === "chain" ? C.gold2 : "rgba(255,255,255,0.08)"}`, color: tab === "chain" ? C.gold2 : C.muted }}>
          {lang === "fr" ? "Chaîne de causalité" : lang === "en" ? "Cause-effect chain" : lang === "es" ? "Cadena causal" : "Cadeia causal"}
        </button>
      </div>

      {tab === "angle" && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {angles.map(x => (
              <button key={x.id} onClick={() => setSelAngle(x.id)} style={{ flex: 1, padding: "10px 4px", borderRadius: 10, cursor: "pointer", textAlign: "center", background: selAngle === x.id ? `${C.blue2}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${selAngle === x.id ? C.blue2 : "rgba(255,255,255,0.08)"}` }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: selAngle === x.id ? C.blue2 : C.white, fontFamily: "'Courier New',monospace" }}>{x.label}</div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{x.name[lang] || x.name.en}</div>
              </button>
            ))}
          </div>
          <div style={{ padding: "12px", borderRadius: 12, background: `${C.blue2}12`, border: `1.5px solid ${C.blue2}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 10 }}>
            {a.desc[lang] || a.desc.en}
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(0,0,0,0.3)", fontSize: 10, color: C.gold2, lineHeight: 1.6, fontStyle: "italic" }}>
            {lang === "fr" ? "Le rayon de giration final dépend surtout de l'angle de barre, pas de la vitesse du navire." : lang === "en" ? "The final turning radius depends mainly on the rudder angle, not on the vessel's speed." : lang === "es" ? "El radio de giro final depende sobre todo del ángulo de timón, no de la velocidad del buque." : "O raio de giro final depende sobretudo do ângulo de leme, não da velocidade do navio."}
          </div>
        </div>
      )}

      {tab === "chain" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
            {chain.map((c, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 16 }}>{c.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{c.label[lang] || c.label.en}</div>
                </div>
                {i < chain.length - 1 && <div style={{ textAlign: "center", fontSize: 12, color: C.gold2, padding: "2px 0" }}>↓</div>}
              </div>
            ))}
          </div>
          <div style={{ padding: "12px", borderRadius: 12, background: `${C.gold}12`, border: `1.5px solid ${C.gold}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 10 }}>
            {lang === "fr" ? "Distinction essentielle : le heading (orientation instantanée de l'étrave) ≠ le course (direction de déplacement voulue) ≠ le track (trajectoire réelle au sol). Le navire ne change pas de cap instantanément — la chaîne prend un temps réel à se dérouler." :
             lang === "en" ? "Essential distinction: heading (the vessel's instantaneous bow orientation) ≠ course (the intended direction of travel) ≠ track (the actual path made good over the ground). The vessel does not change heading instantaneously — the chain takes real time to unfold." :
             lang === "es" ? "Distinción esencial: heading (orientación instantánea de la proa) ≠ course (dirección de desplazamiento deseada) ≠ track (trayectoria real sobre el fondo). El buque no cambia de rumbo instantáneamente — la cadena tarda un tiempo real en desarrollarse." :
             "Distinção essencial: heading (orientação instantânea da proa) ≠ course (direção de deslocamento pretendida) ≠ track (trajetória real sobre o fundo). O navio não muda de rumo instantaneamente — a cadeia demora um tempo real a desenrolar-se."}
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(0,0,0,0.3)", fontSize: 10, color: C.gold2, lineHeight: 1.6, fontStyle: "italic" }}>
            {lang === "fr" ? "Plus la vitesse est élevée, plus l'effet d'un même angle de barre est rapide à ressentir — mais le rayon de giration final dépend surtout de l'angle, pas de la vitesse. Un délai existe toujours entre l'ordre de barre et la réponse visible du navire : ne jamais sur-corriger en anticipant un effet pas encore arrivé." :
             lang === "en" ? "The higher the speed, the faster the effect of a given rudder angle is felt — but the final turning radius depends mainly on the angle, not the speed. A delay always exists between the helm order and the vessel's visible response: never over-correct by anticipating an effect that has not yet arrived." :
             lang === "es" ? "Cuanto mayor es la velocidad, más rápido se siente el efecto de un mismo ángulo de timón — pero el radio de giro final depende sobre todo del ángulo, no de la velocidad. Siempre existe un retraso entre la orden de timón y la respuesta visible del buque: nunca sobrecorregir anticipando un efecto que aún no ha llegado." :
             "Quanto maior a velocidade, mais rápido se sente o efeito de um mesmo ângulo de leme — mas o raio de giro final depende sobretudo do ângulo, não da velocidade. Existe sempre um atraso entre a ordem de leme e a resposta visível do navio: nunca sobrecorrigir antecipando um efeito que ainda não chegou."}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// STEERING ORDERS TABLE — shared data (7 orders)
// ══════════════════════════════════════
const STEERING_ORDERS = [
  { order: "Hard-a-starboard / Hard-a-port", response: "Hard-a-starboard, sir.",
    meaning: { fr: "Barre à fond d'un côté (angle maximal)", en: "Full rudder to one side (maximum angle)", es: "Timón a la banda hacia un lado (ángulo máximo)", pt: "Leme todo para um lado (ângulo máximo)" } },
  { order: "Starboard/Port [nombre]", response: "Starboard ten, sir.",
    meaning: { fr: "Angle de barre précis en degrés", en: "Precise rudder angle in degrees", es: "Ángulo de timón preciso en grados", pt: "Ângulo de leme preciso em graus" } },
  { order: "Midships", response: "Midships, sir.",
    meaning: { fr: "Gouvernail ramené à zéro, pas un cap", en: "Rudder brought back to zero, not a heading", es: "Timón devuelto a cero, no un rumbo", pt: "Leme trazido de volta a zero, não um rumo" } },
  { order: "Steady / Steady as she goes", response: "Steady as she goes, sir.",
    meaning: { fr: "Maintenir le cap actuel", en: "Maintain the current heading", es: "Mantener el rumbo actual", pt: "Manter o rumo atual" } },
  { order: "Steer [cap]", response: "Steer 275, sir.",
    meaning: { fr: "Diriger vers un cap précis (3 chiffres)", en: "Steer to a precise heading (3 digits)", es: "Dirigirse a un rumbo preciso (3 cifras)", pt: "Dirigir-se a um rumo preciso (3 dígitos)" } },
  { order: "Nothing to port/starboard", response: "Nothing to port, sir.",
    meaning: { fr: "Ne pas laisser le cap dériver dans cette direction", en: "Do not let the heading drift in that direction", es: "No dejar que el rumbo derive en esa dirección", pt: "Não deixar o rumo derivar nessa direção" } },
  { order: "Port/starboard easy", response: "Port easy, sir.",
    meaning: { fr: "Réduire l'angle de barre en douceur", en: "Gently reduce the rudder angle", es: "Reducir el ángulo de timón suavemente", pt: "Reduzir suavemente o ângulo de leme" } },
];

// ══════════════════════════════════════
// SVG 3 — STEERING COMMANDS FLASHCARDS
// ══════════════════════════════════════
function SteeringFlashcardsSVG({ lang }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = STEERING_ORDERS[idx];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {STEERING_ORDERS.map((_, i) => (
          <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{
            flex: 1, height: 4, borderRadius: 4, cursor: "pointer",
            background: i === idx ? C.blue2 : i < idx ? `${C.blue2}55` : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div onClick={() => setFlipped(f => !f)} style={{
        padding: "16px", borderRadius: 14, cursor: "pointer", minHeight: 120,
        background: flipped ? `${C.blue2}18` : "rgba(0,0,0,0.4)",
        border: `2px solid ${flipped ? C.blue2 : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s ease", animation: "fadeUp 0.3s ease",
        display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 10 }}>
        {!flipped ? (
          <div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 8 }}>❓ {lang === "fr" ? "ORDRE" : lang === "en" ? "ORDER" : lang === "es" ? "ORDEN" : "ORDEM"} — {lang === "fr" ? "Touche pour la réponse" : lang === "en" ? "Tap for answer" : lang === "es" ? "Toca para respuesta" : "Toque para resposta"}</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 15, color: C.white, fontWeight: 700, lineHeight: 1.5 }}>{card.order}</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 9, color: C.blue2, letterSpacing: 2, marginBottom: 8 }}>✅ {lang === "fr" ? "RÉPONSE DU TIMONIER" : lang === "en" ? "HELMSMAN'S RESPONSE" : lang === "es" ? "RESPUESTA DEL TIMONEL" : "RESPOSTA DO TIMONEIRO"}</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: C.white, lineHeight: 1.6, marginBottom: 8, fontWeight: 700 }}>"{card.response}"</div>
            <div style={{ fontSize: 11, color: C.gold2, lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 6 }}>{card.meaning[lang] || card.meaning.en}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setIdx(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={idx === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: idx === 0 ? C.muted : C.white, cursor: idx === 0 ? "default" : "pointer", fontSize: 11 }}>
          ◀ {lang === "fr" ? "Précédent" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Anterior"}
        </button>
        <button onClick={() => { setIdx(i => Math.min(STEERING_ORDERS.length - 1, i + 1)); setFlipped(false); }} disabled={idx === STEERING_ORDERS.length - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: idx === STEERING_ORDERS.length - 1 ? "rgba(255,255,255,0.05)" : `${C.blue2}22`, border: `1px solid ${idx === STEERING_ORDERS.length - 1 ? "rgba(255,255,255,0.08)" : C.blue2}`, color: C.white, cursor: idx === STEERING_ORDERS.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — STEERING FORMATS & KEYWORDS
// ══════════════════════════════════════
function SteeringFormatsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const formats = [
    { id: "digits", icon: "🔢", color: C.blue2,
      label: { fr: "Caps à 3 chiffres", en: "3-digit headings", es: "Rumbos a 3 cifras", pt: "Rumos a 3 dígitos" },
      content: {
        fr: "Un cap s'annonce TOUJOURS en 3 chiffres.\n\nExemple : 275° = 'two seven five'\n(jamais 'two seventy-five')\n\nRègle : 'Steer [cap]' est toujours suivi de 3 chiffres, jamais 2.",
        en: "A heading is ALWAYS announced in 3 digits.\n\nExample: 275° = 'two seven five'\n(never 'two seventy-five')\n\nRule: 'Steer [heading]' is always followed by 3 digits, never 2.",
        es: "Un rumbo se anuncia SIEMPRE en 3 cifras.\n\nEjemplo: 275° = 'two seven five'\n(nunca 'two seventy-five')\n\nRegla: 'Steer [rumbo]' siempre va seguido de 3 cifras, nunca de 2.",
        pt: "Um rumo é anunciado SEMPRE em 3 dígitos.\n\nExemplo: 275° = 'two seven five'\n(nunca 'two seventy-five')\n\nRegra: 'Steer [rumo]' é sempre seguido de 3 dígitos, nunca de 2.",
      } },
    { id: "vigilance", icon: "⚠️", color: C.red,
      label: { fr: "Angle max vs angle précis", en: "Max angle vs precise angle", es: "Ángulo máx. vs ángulo preciso", pt: "Ângulo máx. vs ângulo preciso" },
      content: {
        fr: "POINT DE VIGILANCE :\n\n'Hard-a-port' et 'Port ten' NE signifient PAS la même chose.\n\n'Hard-a-...' = angle maximal (barre à fond)\n'... ten/fifteen' = angle précis en degrés\n\nConfusion fréquente et dangereuse — toujours écouter le mot exact utilisé par l'OOW.",
        en: "VIGILANCE POINT:\n\n'Hard-a-port' and 'Port ten' do NOT mean the same thing.\n\n'Hard-a-...' = maximum angle (full rudder)\n'... ten/fifteen' = precise angle in degrees\n\nA frequent and dangerous confusion — always listen for the exact word used by the OOW.",
        es: "PUNTO DE VIGILANCIA:\n\n'Hard-a-port' y 'Port ten' NO significan lo mismo.\n\n'Hard-a-...' = ángulo máximo (timón a la banda)\n'... ten/fifteen' = ángulo preciso en grados\n\nUna confusión frecuente y peligrosa — escuchar siempre la palabra exacta usada por el OOW.",
        pt: "PONTO DE VIGILÂNCIA:\n\n'Hard-a-port' e 'Port ten' NÃO significam o mesmo.\n\n'Hard-a-...' = ângulo máximo (leme todo)\n'... ten/fifteen' = ângulo preciso em graus\n\nUma confusão frequente e perigosa — ouvir sempre a palavra exata usada pelo OOW.",
      } },
    { id: "repeat", icon: "🔁", color: C.green,
      label: { fr: "Répétition avant/après", en: "Repeat-back before/after", es: "Repetición antes/después", pt: "Repetição antes/depois" },
      content: {
        fr: "RÈGLE DE SÉCURITÉ SMCP :\n\nTout ordre de barre se répète DEUX fois :\n1. AVANT exécution → confirme que l'ordre est entendu et compris\n2. APRÈS exécution → confirme que l'angle demandé est physiquement appliqué\n\nCette double confirmation en boucle fermée est obligatoire pour tout ordre de barre.",
        en: "SMCP SAFETY RULE:\n\nEvery helm order is repeated TWICE:\n1. BEFORE execution → confirms the order is heard and understood\n2. AFTER execution → confirms the requested angle is physically applied\n\nThis closed-loop double confirmation is mandatory for every helm order.",
        es: "REGLA DE SEGURIDAD SMCP:\n\nToda orden de timón se repite DOS veces:\n1. ANTES de ejecutarla → confirma que la orden se oye y se entiende\n2. DESPUÉS de ejecutarla → confirma que el ángulo solicitado está físicamente aplicado\n\nEsta doble confirmación en bucle cerrado es obligatoria para toda orden de timón.",
        pt: "REGRA DE SEGURANÇA SMCP:\n\nToda a ordem de leme é repetida DUAS vezes:\n1. ANTES da execução → confirma que a ordem foi ouvida e compreendida\n2. DEPOIS da execução → confirma que o ângulo pedido está fisicamente aplicado\n\nEsta dupla confirmação em circuito fechado é obrigatória para toda a ordem de leme.",
      } },
    { id: "steadysteer", icon: "🧭", color: C.gold2,
      label: { fr: "Steady vs Steer", en: "Steady vs Steer", es: "Steady vs Steer", pt: "Steady vs Steer" },
      content: {
        fr: "DISTINCTION CLÉ :\n\n'Steady' / 'Steady as she goes' = maintenir le cap ACTUEL au moment de l'ordre (pas de cap chiffré annoncé)\n\n'Steer [cap]' = diriger le navire vers un cap PRÉCIS annoncé en 3 chiffres\n\nCe ne sont pas des synonymes.",
        en: "KEY DISTINCTION:\n\n'Steady' / 'Steady as she goes' = maintain the CURRENT heading at the moment the order is given (no numbered heading announced)\n\n'Steer [heading]' = steer the vessel to a PRECISE heading announced in 3 digits\n\nThese are not synonyms.",
        es: "DISTINCIÓN CLAVE:\n\n'Steady' / 'Steady as she goes' = mantener el rumbo ACTUAL en el momento de la orden (sin rumbo numérico anunciado)\n\n'Steer [rumbo]' = dirigir el buque a un rumbo PRECISO anunciado en 3 cifras\n\nNo son sinónimos.",
        pt: "DISTINÇÃO CHAVE:\n\n'Steady' / 'Steady as she goes' = manter o rumo ATUAL no momento da ordem (sem rumo numérico anunciado)\n\n'Steer [rumo]' = dirigir o navio para um rumo PRECISO anunciado em 3 dígitos\n\nNão são sinónimos.",
      } },
  ];

  const sel_ = sel !== null ? formats[sel] : null;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {formats.map((f, i) => (
          <div key={i} onClick={() => setSel(sel === i ? null : i)} style={{
            padding: "10px 6px", borderRadius: 12, cursor: "pointer", textAlign: "center",
            background: sel === i ? `${f.color}22` : "rgba(255,255,255,0.04)",
            border: `1.5px solid ${sel === i ? f.color : "rgba(255,255,255,0.08)"}` }}>
            <div style={{ fontSize: 20, marginBottom: 3 }}>{f.icon}</div>
            <div style={{ fontSize: 9, color: sel === i ? f.color : C.muted, fontWeight: 700, lineHeight: 1.2 }}>{f.label[lang] || f.label.en}</div>
          </div>
        ))}
      </div>
      {sel_ && <div style={{ padding: "12px", borderRadius: 14, background: `${sel_.color}12`, border: `1.5px solid ${sel_.color}44`, animation: "fadeUp 0.3s ease" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: sel_.color, marginBottom: 6 }}>{sel_.icon} {sel_.label[lang] || sel_.label.en}</div>
        <div style={{ fontSize: 11, color: C.white, lineHeight: 1.7, whiteSpace: "pre-line", fontFamily: "'Courier New',monospace" }}>{sel_.content[lang] || sel_.content.en}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// STEERING VOCABULARY QUIZ
// ══════════════════════════════════════
function SteeringVocabQuiz({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const M = (i) => STEERING_ORDERS[i].meaning[lang] || STEERING_ORDERS[i].meaning.en;
  const qs = [
    { order: STEERING_ORDERS[0].order, opts: [M(0), M(2), M(4)], correct: 0 },
    { order: STEERING_ORDERS[1].order, opts: [M(3), M(1), M(0)], correct: 1 },
    { order: STEERING_ORDERS[2].order, opts: [M(2), M(4), M(6)], correct: 0 },
    { order: STEERING_ORDERS[3].order, opts: [M(1), M(4), M(3)], correct: 2 },
    { order: STEERING_ORDERS[4].order, opts: [M(3), M(5), M(4)], correct: 2 },
    { order: STEERING_ORDERS[5].order, opts: [M(6), M(0), M(5)], correct: 2 },
    { order: STEERING_ORDERS[6].order, opts: [M(0), M(6), M(2)], correct: 1 },
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q)));
  const q = shuffled[qIdx];
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
        {qs.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i < qIdx ? C.blue2 : i === qIdx ? C.gold2 : "rgba(255,255,255,0.1)" }} />)}
      </div>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 12, padding: "14px", marginBottom: 12, textAlign: "center", border: `1px solid ${C.blue2}33` }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 16, fontWeight: 900, color: C.blue2, marginBottom: 4 }}>{q.order}</div>
        <div style={{ fontSize: 11, color: C.muted }}>
          {lang === "fr" ? "Que signifie cet ordre de barre ?" : lang === "en" ? "What does this helm order mean?" : lang === "es" ? "¿Qué significa esta orden de timón?" : "O que significa esta ordem de leme?"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)", bd = "rgba(255,255,255,0.1)";
          if (ans !== null) { if (i === q.correct) { bg = "rgba(30,138,74,0.2)"; bd = C.green; } else if (i === ans) { bg = "rgba(192,57,43,0.2)"; bd = C.red; } }
          return <button key={i} onClick={() => pick(i)} style={{ padding: "10px 12px", borderRadius: 12, background: bg, border: `1.5px solid ${bd}`, color: C.white, fontSize: 12, textAlign: "left", cursor: ans !== null ? "default" : "pointer" }}>{opt}</button>;
        })}
      </div>
      {ans !== null && <button onClick={next} style={{ width: "100%", padding: "11px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.blue2},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: C.navy, cursor: "pointer" }}>
        {qIdx < qs.length - 1 ? (lang === "fr" ? "SUIVANT →" : lang === "en" ? "NEXT →" : lang === "es" ? "SIGUIENTE →" : "PRÓXIMO →") : (lang === "fr" ? "TERMINER" : lang === "en" ? "FINISH" : lang === "es" ? "TERMINAR" : "TERMINAR")}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — "PORT FIFTEEN" SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [sel, setSel] = useState(null);

  const d = {
    fr: {
      situation: "Vous êtes timonier. L'OOW donne l'ordre \"Port fifteen\" alors que le navire est déjà en pleine giration à tribord pour éviter un obstacle. L'ordre semble contradictoire avec ce que vous observez.",
      task: "Que faites-vous ?",
      opts: ["Exécuter sans commentaire", "Répéter l'ordre et l'exécuter normalement", "Répéter l'ordre, l'exécuter, puis signaler votre observation une fois l'action faite", "Refuser d'exécuter et demander confirmation avant d'agir"],
      expl: "En règle générale, le timonier répète puis exécute immédiatement l'ordre de l'OOW, même si celui-ci lui paraît surprenant, car l'OOW dispose d'une vision globale de la situation. En revanche, si l'ordre est incompris, impossible à exécuter, ou crée un danger immédiat et évident, il doit le signaler sans délai afin d'obtenir une clarification — sans exécuter aveuglément un ordre manifestement irréalisable ou dangereux.",
    },
    en: {
      situation: "You are the helmsman. The OOW gives the order \"Port fifteen\" while the vessel is already turning hard to starboard to avoid an obstacle. The order seems contradictory with what you observe.",
      task: "What do you do?",
      opts: ["Execute without comment", "Repeat the order and execute it normally", "Repeat the order, execute it, then report your observation once the action is done", "Refuse to execute and ask for confirmation before acting"],
      expl: "As a general rule, the helmsman repeats and immediately executes the OOW's order, even if it seems surprising, because the OOW has an overall view of the situation. However, if the order is not understood, impossible to execute, or creates an immediate and obvious danger, he must report it without delay to obtain clarification — without blindly executing an order that is clearly unfeasible or dangerous.",
    },
    es: {
      situation: "Usted es el timonel. El OOW da la orden \"Port fifteen\" mientras el buque ya está girando fuertemente a estribor para evitar un obstáculo. La orden parece contradictoria con lo que observa.",
      task: "¿Qué hace?",
      opts: ["Ejecutar sin comentarios", "Repetir la orden y ejecutarla con normalidad", "Repetir la orden, ejecutarla, y luego señalar su observación una vez realizada la acción", "Negarse a ejecutar y pedir confirmación antes de actuar"],
      expl: "Por regla general, el timonel repite y ejecuta inmediatamente la orden del OOW, incluso si le parece sorprendente, porque el OOW tiene una visión global de la situación. Sin embargo, si la orden no se entiende, es imposible de ejecutar, o crea un peligro inmediato y evidente, debe señalarlo sin demora para obtener una aclaración — sin ejecutar ciegamente una orden manifiestamente irrealizable o peligrosa.",
    },
    pt: {
      situation: "Você é o timoneiro. O OOW dá a ordem \"Port fifteen\" enquanto o navio já está a virar fortemente a estibordo para evitar um obstáculo. A ordem parece contraditória com o que observa.",
      task: "O que faz?",
      opts: ["Executar sem comentários", "Repetir a ordem e executá-la normalmente", "Repetir a ordem, executá-la, e depois sinalizar a sua observação após a ação estar feita", "Recusar executar e pedir confirmação antes de agir"],
      expl: "Por regra geral, o timoneiro repete e executa imediatamente a ordem do OOW, mesmo que esta lhe pareça surpreendente, porque o OOW tem uma visão global da situação. No entanto, se a ordem não for compreendida, for impossível de executar, ou criar um perigo imediato e evidente, deve sinalizá-lo sem demora para obter esclarecimento — sem executar cegamente uma ordem manifestamente irrealizável ou perigosa.",
    },
  };
  const c = d[lang] || d.en;
  const correctIdx = 2;

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
    { q: "What does \"Midships\" mean?", opts: ["A heading of 000°", "The rudder brought back to zero, not a heading", "Full rudder to one side", "Gently reducing the rudder angle"], correct: 1, expl: "\"Midships\" brings the rudder back to zero degrees — it centres the rudder, it is not a course. Confusing it with a heading is a frequent beginner mistake." },
    { q: "Why is a helm order repeated both BEFORE and AFTER execution?", opts: ["It is only a tradition with no real purpose", "Before confirms the order was heard and understood; after confirms the rudder angle is physically applied", "It is only required for hard-over orders", "Only the OOW repeats orders, never the helmsman"], correct: 1, expl: "This double confirmation (before/after) is the SMCP safety rule for helm orders: the first repeat confirms understanding, the second confirms physical execution." },
    { q: "What is the difference between \"Steady\" and \"Steer [heading]\"?", opts: ["They are synonyms", "\"Steady\" maintains the current heading; \"Steer [heading]\" directs the vessel to a precise, numbered heading", "\"Steady\" is only used at anchor", "\"Steer [heading]\" never uses digits"], correct: 1, expl: "\"Steady as she goes\" asks the helmsman to hold the heading the vessel has at that moment. \"Steer [heading]\" gives a precise, 3-digit heading to steer to." },
    { q: "Is a heading always announced in 2 or 3 digits?", opts: ["2 digits, always", "3 digits, always", "It depends on the vessel type", "There is no fixed rule"], correct: 1, expl: "Headings are always given in 3 digits (e.g. 275, never 75) to avoid ambiguity." },
    { q: "What does \"Hard-a-starboard\" mean?", opts: ["A precise 10° angle to starboard", "Full rudder to starboard (maximum angle)", "Maintain the current heading", "Gently reduce the rudder angle"], correct: 1, expl: "\"Hard-a-...\" orders mean full rudder — the maximum angle available — not a precise, smaller angle." },
    { q: "What is the difference between \"Hard-a-port\" and \"Port ten\"?", opts: ["No difference, they mean the same thing", "\"Hard-a-port\" is the maximum angle; \"Port ten\" is a precise 10° angle — a frequent and dangerous confusion", "\"Port ten\" is only used in port", "\"Hard-a-port\" is only used in emergencies"], correct: 1, expl: "This is a frequent and dangerous confusion between a maximum angle order and a precise angle order — always listen carefully to the exact wording used." },
    { q: "What must the helmsman do if he did not understand an order?", opts: ["Guess what was probably meant and execute it", "Report it without delay to obtain clarification", "Wait for the next order and ignore the unclear one", "Execute the closest order he remembers"], correct: 1, expl: "If an order is not understood, the helmsman must report it immediately to get clarification, rather than guessing or executing blindly." },
    { q: "Does a larger rudder angle always produce a smaller turning circle?", opts: ["No, the angle has no effect on the turning circle", "Yes — the final turning radius depends mainly on the rudder angle, not on the vessel's speed", "Only at low speed", "Only for vessels under 100 metres"], correct: 1, expl: "The final turning radius depends mainly on the rudder angle: a larger angle produces a smaller turning circle, regardless of speed." },
    { q: "What does \"Nothing to port\" mean?", opts: ["Steer a precise heading to port", "Do not let the heading drift to port", "Reduce speed immediately", "Rudder amidships"], correct: 1, expl: "\"Nothing to port\" (or starboard) instructs the helmsman not to let the heading drift in that direction." },
    { q: "Why is there a delay between the helm order and the vessel's response?", opts: ["There is no such delay, the response is instantaneous", "Because the chain rudder movement → hydrodynamic force → bow swing → heading change → course change takes real time to unfold", "Only because of equipment failure", "Only in heavy weather"], correct: 1, expl: "The vessel does not change heading instantaneously: the cause-effect chain from rudder movement to course change takes real time, which is why over-correction must be avoided." },
    { q: "What must the helmsman announce after \"Steady as she goes\"?", opts: ["Nothing, no announcement is required", "The heading obtained, e.g. \"Steady on 275, sir.\"", "A random heading", "Only \"OK, sir.\""], correct: 1, expl: "After \"Steady as she goes\", the helmsman notes the current heading and reports it back, e.g. \"Steady on 275, sir.\"" },
    { q: "What does \"Port/starboard easy\" mean?", opts: ["Full rudder to that side", "Gently reduce the rudder angle", "Steer a new precise heading", "Maintain the current heading"], correct: 1, expl: "\"Easy\" orders ask the helmsman to gently reduce the rudder angle already applied." },
    { q: "Can the helmsman refuse to execute a helm order he judges dangerous?", opts: ["Never, he must always execute silently", "As a rule he executes even surprising orders, since the OOW has the overall view — but if the order is clearly unfeasible or immediately dangerous, he must report it without delay rather than blindly execute it", "Yes, he can refuse any order he personally disagrees with", "Only the captain can judge this, never the helmsman"], correct: 1, expl: "The helmsman normally executes orders promptly because the OOW has a wider situational picture, but a clearly dangerous or unfeasible order must be reported immediately for clarification, not blindly executed." },
    { q: "Why does the vessel's speed influence how the effect of the helm is perceived?", opts: ["Speed has no influence at all", "The higher the speed, the faster the effect of a given rudder angle is felt, even though the final turning radius depends mainly on the angle", "Only the rudder angle matters, speed is irrelevant to perception", "Higher speed always produces a wider turning circle regardless of angle"], correct: 1, expl: "At higher speed, the same rudder angle produces a faster-felt effect, even though the turning radius itself depends mainly on the angle, not the speed." },
    { q: "What must the helmsman do if he executes an order by mistake?", opts: ["Say nothing and quietly correct it", "Report it immediately to the OOW so the situation can be corrected without delay", "Wait for the OOW to notice", "Repeat the wrong action to make it consistent"], correct: 1, expl: "Just as with any unclear or surprising order, a helmsman's own error must be reported immediately so it can be corrected without delay — silence removes the safety margin the closed-loop communication is meant to provide." },
    { q: "Why must the helmsman watch both the compass and the rudder angle indicator?", opts: ["Only the compass matters, the rudder indicator is decorative", "The compass shows the vessel's actual heading while the rudder angle indicator shows the rudder's position — two different, complementary pieces of information", "Only the rudder angle indicator matters at sea", "They always show the same value"], correct: 1, expl: "\"Midships\" is a clear example: the rudder angle indicator can read zero while the heading shown on the compass is not yet the one wanted — the two instruments give different, complementary information." },
  ],
  fr: [
    { q: "Que signifie \"Midships\" ?", opts: ["Un cap de 000°", "Le gouvernail ramené à zéro, pas un cap", "Barre à fond d'un côté", "Réduire l'angle de barre en douceur"], correct: 1, expl: "\"Midships\" ramène le gouvernail à zéro degré — il centre le gouvernail, ce n'est pas un cap. La confondre avec un cap est une erreur fréquente chez les débutants." },
    { q: "Pourquoi répète-t-on un ordre de barre avant ET après exécution ?", opts: ["Ce n'est qu'une tradition sans réelle utilité", "Avant confirme que l'ordre a été entendu et compris ; après confirme que l'angle de barre est physiquement appliqué", "Ce n'est requis que pour les ordres barre à fond", "Seul l'OOW répète les ordres, jamais le timonier"], correct: 1, expl: "Cette double confirmation (avant/après) est la règle de sécurité SMCP pour les ordres de barre : la première répétition confirme la compréhension, la seconde confirme l'exécution physique." },
    { q: "Quelle est la différence entre \"Steady\" et \"Steer [cap]\" ?", opts: ["Ce sont des synonymes", "\"Steady\" maintient le cap actuel ; \"Steer [cap]\" dirige le navire vers un cap précis chiffré", "\"Steady\" ne s'utilise qu'au mouillage", "\"Steer [cap]\" n'utilise jamais de chiffres"], correct: 1, expl: "\"Steady as she goes\" demande au timonier de tenir le cap que le navire a à cet instant précis. \"Steer [cap]\" donne un cap précis à 3 chiffres à atteindre." },
    { q: "Un cap est-il toujours annoncé en 2 ou 3 chiffres ?", opts: ["2 chiffres, toujours", "3 chiffres, toujours", "Cela dépend du type de navire", "Il n'y a pas de règle fixe"], correct: 1, expl: "Les caps s'annoncent toujours en 3 chiffres (ex. 275, jamais 75) pour éviter toute ambiguïté." },
    { q: "Que signifie \"Hard-a-starboard\" ?", opts: ["Un angle précis de 10° à tribord", "Barre à fond à tribord (angle maximal)", "Maintenir le cap actuel", "Réduire l'angle de barre en douceur"], correct: 1, expl: "Les ordres \"Hard-a-...\" signifient barre à fond — l'angle maximal disponible — et non un angle précis plus petit." },
    { q: "Quelle est la différence entre \"Hard-a-port\" et \"Port ten\" ?", opts: ["Aucune différence, ils signifient la même chose", "\"Hard-a-port\" est l'angle maximal ; \"Port ten\" est un angle précis de 10° — une confusion fréquente et dangereuse", "\"Port ten\" ne s'utilise qu'au port", "\"Hard-a-port\" ne s'utilise qu'en urgence"], correct: 1, expl: "C'est une confusion fréquente et dangereuse entre un ordre d'angle maximal et un ordre d'angle précis — toujours bien écouter le mot exact utilisé." },
    { q: "Que doit faire le timonier s'il n'a pas compris un ordre ?", opts: ["Deviner ce qui était probablement voulu et l'exécuter", "Le signaler sans délai pour obtenir une clarification", "Attendre l'ordre suivant et ignorer celui non compris", "Exécuter l'ordre le plus proche dont il se souvient"], correct: 1, expl: "Si un ordre n'est pas compris, le timonier doit le signaler immédiatement pour obtenir une clarification, plutôt que de deviner ou d'exécuter à l'aveugle." },
    { q: "Un angle de barre plus important produit-il toujours un rayon de giration plus petit ?", opts: ["Non, l'angle n'a aucun effet sur le rayon de giration", "Oui — le rayon de giration final dépend surtout de l'angle de barre, pas de la vitesse du navire", "Seulement à faible vitesse", "Seulement pour les navires de moins de 100 mètres"], correct: 1, expl: "Le rayon de giration final dépend surtout de l'angle de barre : un angle plus important produit un rayon de giration plus petit, quelle que soit la vitesse." },
    { q: "Que signifie \"Nothing to port\" ?", opts: ["Diriger vers un cap précis à bâbord", "Ne pas laisser le cap dériver vers bâbord", "Réduire la vitesse immédiatement", "Barre au milieu"], correct: 1, expl: "\"Nothing to port\" (ou starboard) demande au timonier de ne pas laisser le cap dériver dans cette direction." },
    { q: "Pourquoi existe-t-il un délai entre l'ordre de barre et la réponse du navire ?", opts: ["Ce délai n'existe pas, la réponse est instantanée", "Parce que la chaîne mouvement de barre → force hydrodynamique → l'étrave pivote → le cap change → la route change prend un temps réel à se dérouler", "Uniquement en cas de panne d'équipement", "Uniquement par mauvais temps"], correct: 1, expl: "Le navire ne change pas de cap instantanément : la chaîne de causalité du mouvement de barre au changement de route prend un temps réel, d'où l'importance de ne jamais sur-corriger." },
    { q: "Que doit annoncer le timonier après \"Steady as she goes\" ?", opts: ["Rien, aucune annonce n'est requise", "Le cap obtenu, par exemple \"Steady on 275, sir.\"", "Un cap au hasard", "Uniquement \"OK, sir.\""], correct: 1, expl: "Après \"Steady as she goes\", le timonier note le cap actuel et le rapporte, par exemple \"Steady on 275, sir.\"" },
    { q: "Que signifie \"Port/starboard easy\" ?", opts: ["Barre à fond de ce côté", "Réduire l'angle de barre en douceur", "Diriger vers un nouveau cap précis", "Maintenir le cap actuel"], correct: 1, expl: "Les ordres \"easy\" demandent au timonier de réduire en douceur l'angle de barre déjà appliqué." },
    { q: "Le timonier peut-il refuser d'exécuter un ordre de barre qu'il juge dangereux ?", opts: ["Jamais, il doit toujours exécuter en silence", "En règle générale il exécute même les ordres surprenants, car l'OOW a la vision d'ensemble — mais si l'ordre est manifestement irréalisable ou immédiatement dangereux, il doit le signaler sans délai plutôt que l'exécuter aveuglément", "Oui, il peut refuser tout ordre avec lequel il n'est pas d'accord", "Seul le capitaine peut en juger, jamais le timonier"], correct: 1, expl: "Le timonier exécute normalement les ordres promptement car l'OOW dispose d'une vision globale, mais un ordre manifestement dangereux ou irréalisable doit être signalé immédiatement pour clarification, jamais exécuté aveuglément." },
    { q: "Pourquoi la vitesse du navire influence-t-elle la perception de l'effet de barre ?", opts: ["La vitesse n'a aucune influence", "Plus la vitesse est élevée, plus l'effet d'un même angle de barre est rapide à ressentir, même si le rayon de giration final dépend surtout de l'angle", "Seul l'angle de barre compte, la vitesse est indifférente à la perception", "Une vitesse plus élevée produit toujours un rayon de giration plus large, quel que soit l'angle"], correct: 1, expl: "À vitesse plus élevée, un même angle de barre produit un effet ressenti plus rapidement, même si le rayon de giration lui-même dépend surtout de l'angle, pas de la vitesse." },
    { q: "Que doit faire le timonier s'il exécute un ordre par erreur ?", opts: ["Ne rien dire et corriger discrètement", "Le signaler immédiatement à l'OOW afin que la situation soit corrigée sans délai", "Attendre que l'OOW s'en aperçoive", "Répéter l'action erronée pour rester cohérent"], correct: 1, expl: "Comme pour tout ordre incompris ou surprenant, une erreur du timonier doit être signalée immédiatement pour être corrigée sans délai — le silence supprime la marge de sécurité que la communication en boucle fermée est censée offrir." },
    { q: "Pourquoi le timonier doit-il regarder à la fois le compas et l'indicateur d'angle de barre ?", opts: ["Seul le compas compte, l'indicateur d'angle de barre est décoratif", "Le compas indique le cap réel du navire tandis que l'indicateur d'angle de barre indique la position du gouvernail — deux informations différentes et complémentaires", "Seul l'indicateur d'angle de barre compte en mer", "Ils affichent toujours la même valeur"], correct: 1, expl: "\"Midships\" en est un exemple clair : l'indicateur d'angle de barre peut afficher zéro alors que le cap indiqué au compas n'est pas encore celui voulu — les deux instruments donnent des informations différentes et complémentaires." },
  ],
  es: [
    { q: "¿Qué significa \"Midships\"?", opts: ["Un rumbo de 000°", "El timón devuelto a cero, no un rumbo", "Timón a la banda hacia un lado", "Reducir el ángulo de timón suavemente"], correct: 1, expl: "\"Midships\" devuelve el timón a cero grados — centra el timón, no es un rumbo. Confundirlo con un rumbo es un error frecuente entre principiantes." },
    { q: "¿Por qué se repite una orden de timón ANTES y DESPUÉS de ejecutarla?", opts: ["Es solo una tradición sin utilidad real", "Antes confirma que la orden se ha oído y entendido; después confirma que el ángulo está físicamente aplicado", "Solo se exige para órdenes a la banda", "Solo el OOW repite las órdenes, nunca el timonel"], correct: 1, expl: "Esta doble confirmación (antes/después) es la regla de seguridad SMCP para las órdenes de timón: la primera repetición confirma la comprensión, la segunda confirma la ejecución física." },
    { q: "¿Cuál es la diferencia entre \"Steady\" y \"Steer [rumbo]\"?", opts: ["Son sinónimos", "\"Steady\" mantiene el rumbo actual; \"Steer [rumbo]\" dirige el buque a un rumbo preciso y numerado", "\"Steady\" solo se usa fondeado", "\"Steer [rumbo]\" nunca usa cifras"], correct: 1, expl: "\"Steady as she goes\" pide al timonel mantener el rumbo que el buque tiene en ese momento. \"Steer [rumbo]\" da un rumbo preciso de 3 cifras a alcanzar." },
    { q: "¿Un rumbo se anuncia siempre en 2 o 3 cifras?", opts: ["2 cifras, siempre", "3 cifras, siempre", "Depende del tipo de buque", "No hay una regla fija"], correct: 1, expl: "Los rumbos siempre se dan en 3 cifras (ej. 275, nunca 75) para evitar ambigüedad." },
    { q: "¿Qué significa \"Hard-a-starboard\"?", opts: ["Un ángulo preciso de 10° a estribor", "Timón a la banda a estribor (ángulo máximo)", "Mantener el rumbo actual", "Reducir el ángulo de timón suavemente"], correct: 1, expl: "Las órdenes \"Hard-a-...\" significan timón a la banda — el ángulo máximo disponible — no un ángulo preciso más pequeño." },
    { q: "¿Cuál es la diferencia entre \"Hard-a-port\" y \"Port ten\"?", opts: ["Ninguna diferencia, significan lo mismo", "\"Hard-a-port\" es el ángulo máximo; \"Port ten\" es un ángulo preciso de 10° — una confusión frecuente y peligrosa", "\"Port ten\" solo se usa en puerto", "\"Hard-a-port\" solo se usa en emergencias"], correct: 1, expl: "Es una confusión frecuente y peligrosa entre una orden de ángulo máximo y una orden de ángulo preciso — escuchar siempre con atención la palabra exacta usada." },
    { q: "¿Qué debe hacer el timonel si no ha entendido una orden?", opts: ["Adivinar lo que probablemente se quería y ejecutarlo", "Señalarlo sin demora para obtener una aclaración", "Esperar la siguiente orden e ignorar la no entendida", "Ejecutar la orden más parecida que recuerde"], correct: 1, expl: "Si una orden no se entiende, el timonel debe señalarlo de inmediato para obtener una aclaración, en lugar de adivinar o ejecutar a ciegas." },
    { q: "¿Un ángulo de timón mayor produce siempre un radio de giro menor?", opts: ["No, el ángulo no afecta al radio de giro", "Sí — el radio de giro final depende sobre todo del ángulo de timón, no de la velocidad del buque", "Solo a baja velocidad", "Solo en buques de menos de 100 metros"], correct: 1, expl: "El radio de giro final depende sobre todo del ángulo de timón: un ángulo mayor produce un radio de giro menor, sea cual sea la velocidad." },
    { q: "¿Qué significa \"Nothing to port\"?", opts: ["Dirigirse a un rumbo preciso a babor", "No dejar que el rumbo derive hacia babor", "Reducir la velocidad de inmediato", "Timón al medio"], correct: 1, expl: "\"Nothing to port\" (o starboard) pide al timonel que no deje que el rumbo derive en esa dirección." },
    { q: "¿Por qué existe un retraso entre la orden de timón y la respuesta del buque?", opts: ["Ese retraso no existe, la respuesta es instantánea", "Porque la cadena movimiento de timón → fuerza hidrodinámica → la proa gira → el rumbo cambia → la derrota cambia tarda un tiempo real en desarrollarse", "Solo por fallos del equipo", "Solo con mal tiempo"], correct: 1, expl: "El buque no cambia de rumbo instantáneamente: la cadena causal desde el movimiento de timón hasta el cambio de derrota tarda un tiempo real, de ahí la importancia de nunca sobrecorregir." },
    { q: "¿Qué debe anunciar el timonel después de \"Steady as she goes\"?", opts: ["Nada, no se requiere ningún anuncio", "El rumbo obtenido, por ejemplo \"Steady on 275, sir.\"", "Un rumbo al azar", "Solo \"OK, sir.\""], correct: 1, expl: "Después de \"Steady as she goes\", el timonel anota el rumbo actual y lo comunica, por ejemplo \"Steady on 275, sir.\"" },
    { q: "¿Qué significa \"Port/starboard easy\"?", opts: ["Timón a la banda hacia ese lado", "Reducir el ángulo de timón suavemente", "Dirigirse a un nuevo rumbo preciso", "Mantener el rumbo actual"], correct: 1, expl: "Las órdenes \"easy\" piden al timonel reducir suavemente el ángulo de timón ya aplicado." },
    { q: "¿Puede el timonel negarse a ejecutar una orden de timón que considera peligrosa?", opts: ["Nunca, siempre debe ejecutar en silencio", "Por regla general ejecuta incluso órdenes sorprendentes, ya que el OOW tiene la visión global — pero si la orden es manifiestamente irrealizable o inmediatamente peligrosa, debe señalarlo sin demora en lugar de ejecutarla ciegamente", "Sí, puede negarse a cualquier orden con la que no esté de acuerdo", "Solo el capitán puede juzgarlo, nunca el timonel"], correct: 1, expl: "El timonel ejecuta normalmente las órdenes con prontitud porque el OOW tiene una visión global, pero una orden manifiestamente peligrosa o irrealizable debe señalarse de inmediato para aclaración, nunca ejecutarse ciegamente." },
    { q: "¿Por qué la velocidad del buque influye en la percepción del efecto del timón?", opts: ["La velocidad no tiene ninguna influencia", "Cuanto mayor es la velocidad, más rápido se siente el efecto de un mismo ángulo de timón, aunque el radio de giro final depende sobre todo del ángulo", "Solo importa el ángulo de timón, la velocidad es indiferente a la percepción", "Una velocidad mayor siempre produce un radio de giro más amplio, sea cual sea el ángulo"], correct: 1, expl: "A mayor velocidad, un mismo ángulo de timón produce un efecto que se siente más rápido, aunque el radio de giro en sí depende sobre todo del ángulo, no de la velocidad." },
    { q: "¿Qué debe hacer el timonel si ejecuta una orden por error?", opts: ["No decir nada y corregir discretamente", "Señalarlo de inmediato al OOW para que la situación se corrija sin demora", "Esperar a que el OOW se dé cuenta", "Repetir la acción errónea para mantener la coherencia"], correct: 1, expl: "Al igual que con cualquier orden no entendida o sorprendente, un error del timonel debe señalarse de inmediato para corregirse sin demora — el silencio elimina el margen de seguridad que la comunicación en bucle cerrado pretende ofrecer." },
    { q: "¿Por qué debe el timonel mirar tanto la brújula como el indicador de ángulo de timón?", opts: ["Solo importa la brújula, el indicador de ángulo de timón es decorativo", "La brújula muestra el rumbo real del buque mientras que el indicador de ángulo de timón muestra la posición del timón — dos informaciones diferentes y complementarias", "Solo importa el indicador de ángulo de timón en el mar", "Siempre muestran el mismo valor"], correct: 1, expl: "\"Midships\" es un ejemplo claro: el indicador de ángulo de timón puede marcar cero mientras el rumbo mostrado en la brújula aún no es el deseado — los dos instrumentos dan información diferente y complementaria." },
  ],
  pt: [
    { q: "O que significa \"Midships\"?", opts: ["Um rumo de 000°", "O leme trazido de volta a zero, não um rumo", "Leme todo para um lado", "Reduzir suavemente o ângulo de leme"], correct: 1, expl: "\"Midships\" traz o leme de volta a zero graus — centra o leme, não é um rumo. Confundi-lo com um rumo é um erro frequente entre principiantes." },
    { q: "Por que se repete uma ordem de leme ANTES e DEPOIS da execução?", opts: ["É apenas uma tradição sem utilidade real", "Antes confirma que a ordem foi ouvida e compreendida; depois confirma que o ângulo está fisicamente aplicado", "Só é exigido para ordens de leme todo", "Só o OOW repete as ordens, nunca o timoneiro"], correct: 1, expl: "Esta dupla confirmação (antes/depois) é a regra de segurança SMCP para as ordens de leme: a primeira repetição confirma a compreensão, a segunda confirma a execução física." },
    { q: "Qual é a diferença entre \"Steady\" e \"Steer [rumo]\"?", opts: ["São sinónimos", "\"Steady\" mantém o rumo atual; \"Steer [rumo]\" dirige o navio para um rumo preciso e numerado", "\"Steady\" só se usa fundeado", "\"Steer [rumo]\" nunca usa dígitos"], correct: 1, expl: "\"Steady as she goes\" pede ao timoneiro para manter o rumo que o navio tem nesse momento. \"Steer [rumo]\" dá um rumo preciso de 3 dígitos a atingir." },
    { q: "Um rumo é sempre anunciado em 2 ou 3 dígitos?", opts: ["2 dígitos, sempre", "3 dígitos, sempre", "Depende do tipo de navio", "Não há uma regra fixa"], correct: 1, expl: "Os rumos são sempre dados em 3 dígitos (ex. 275, nunca 75) para evitar ambiguidade." },
    { q: "O que significa \"Hard-a-starboard\"?", opts: ["Um ângulo preciso de 10° a estibordo", "Leme todo a estibordo (ângulo máximo)", "Manter o rumo atual", "Reduzir suavemente o ângulo de leme"], correct: 1, expl: "As ordens \"Hard-a-...\" significam leme todo — o ângulo máximo disponível — e não um ângulo preciso mais pequeno." },
    { q: "Qual é a diferença entre \"Hard-a-port\" e \"Port ten\"?", opts: ["Nenhuma diferença, significam o mesmo", "\"Hard-a-port\" é o ângulo máximo; \"Port ten\" é um ângulo preciso de 10° — uma confusão frequente e perigosa", "\"Port ten\" só se usa no porto", "\"Hard-a-port\" só se usa em emergências"], correct: 1, expl: "É uma confusão frequente e perigosa entre uma ordem de ângulo máximo e uma ordem de ângulo preciso — ouvir sempre com atenção a palavra exata usada." },
    { q: "O que deve fazer o timoneiro se não compreendeu uma ordem?", opts: ["Adivinhar o que provavelmente se pretendia e executá-lo", "Sinalizá-lo sem demora para obter esclarecimento", "Esperar pela ordem seguinte e ignorar a não compreendida", "Executar a ordem mais parecida de que se lembra"], correct: 1, expl: "Se uma ordem não é compreendida, o timoneiro deve sinalizá-lo de imediato para obter esclarecimento, em vez de adivinhar ou executar às cegas." },
    { q: "Um ângulo de leme maior produz sempre um raio de giro menor?", opts: ["Não, o ângulo não tem efeito no raio de giro", "Sim — o raio de giro final depende sobretudo do ângulo de leme, não da velocidade do navio", "Só a baixa velocidade", "Só em navios com menos de 100 metros"], correct: 1, expl: "O raio de giro final depende sobretudo do ângulo de leme: um ângulo maior produz um raio de giro menor, seja qual for a velocidade." },
    { q: "O que significa \"Nothing to port\"?", opts: ["Dirigir-se a um rumo preciso a bombordo", "Não deixar o rumo derivar para bombordo", "Reduzir a velocidade de imediato", "Leme ao meio"], correct: 1, expl: "\"Nothing to port\" (ou starboard) pede ao timoneiro para não deixar o rumo derivar nessa direção." },
    { q: "Por que existe um atraso entre a ordem de leme e a resposta do navio?", opts: ["Esse atraso não existe, a resposta é instantânea", "Porque a cadeia movimento de leme → força hidrodinâmica → a proa vira → o rumo muda → a derrota muda demora um tempo real a desenrolar-se", "Só por avaria do equipamento", "Só com mau tempo"], correct: 1, expl: "O navio não muda de rumo instantaneamente: a cadeia causal do movimento de leme até à mudança de derrota demora um tempo real, daí a importância de nunca sobrecorrigir." },
    { q: "O que deve anunciar o timoneiro depois de \"Steady as she goes\"?", opts: ["Nada, não é necessário nenhum anúncio", "O rumo obtido, por exemplo \"Steady on 275, sir.\"", "Um rumo ao acaso", "Apenas \"OK, sir.\""], correct: 1, expl: "Depois de \"Steady as she goes\", o timoneiro anota o rumo atual e comunica-o, por exemplo \"Steady on 275, sir.\"" },
    { q: "O que significa \"Port/starboard easy\"?", opts: ["Leme todo para esse lado", "Reduzir suavemente o ângulo de leme", "Dirigir-se a um novo rumo preciso", "Manter o rumo atual"], correct: 1, expl: "As ordens \"easy\" pedem ao timoneiro para reduzir suavemente o ângulo de leme já aplicado." },
    { q: "O timoneiro pode recusar-se a executar uma ordem de leme que considera perigosa?", opts: ["Nunca, deve sempre executar em silêncio", "Por regra geral executa mesmo ordens surpreendentes, pois o OOW tem a visão global — mas se a ordem for manifestamente irrealizável ou imediatamente perigosa, deve sinalizá-lo sem demora em vez de a executar cegamente", "Sim, pode recusar qualquer ordem com a qual não concorde", "Só o comandante pode julgar isso, nunca o timoneiro"], correct: 1, expl: "O timoneiro executa normalmente as ordens prontamente porque o OOW tem uma visão global, mas uma ordem manifestamente perigosa ou irrealizável deve ser sinalizada de imediato para esclarecimento, nunca executada cegamente." },
    { q: "Por que a velocidade do navio influencia a perceção do efeito do leme?", opts: ["A velocidade não tem nenhuma influência", "Quanto maior a velocidade, mais rápido se sente o efeito de um mesmo ângulo de leme, mesmo que o raio de giro final dependa sobretudo do ângulo", "Só o ângulo de leme importa, a velocidade é indiferente à perceção", "Uma velocidade maior produz sempre um raio de giro mais largo, seja qual for o ângulo"], correct: 1, expl: "A uma velocidade maior, um mesmo ângulo de leme produz um efeito sentido mais rapidamente, mesmo que o raio de giro em si dependa sobretudo do ângulo, não da velocidade." },
    { q: "O que deve fazer o timoneiro se executar uma ordem por engano?", opts: ["Não dizer nada e corrigir discretamente", "Sinalizá-lo de imediato ao OOW para que a situação seja corrigida sem demora", "Esperar que o OOW repare", "Repetir a ação errada para se manter coerente"], correct: 1, expl: "Tal como com qualquer ordem não compreendida ou surpreendente, um erro do timoneiro deve ser sinalizado de imediato para ser corrigido sem demora — o silêncio elimina a margem de segurança que a comunicação em circuito fechado pretende oferecer." },
    { q: "Por que o timoneiro deve olhar tanto para o compasso como para o indicador de ângulo de leme?", opts: ["Só o compasso importa, o indicador de ângulo de leme é decorativo", "O compasso mostra o rumo real do navio enquanto o indicador de ângulo de leme mostra a posição do leme — duas informações diferentes e complementares", "Só o indicador de ângulo de leme importa no mar", "Mostram sempre o mesmo valor"], correct: 1, expl: "\"Midships\" é um exemplo claro: o indicador de ângulo de leme pode marcar zero enquanto o rumo mostrado no compasso ainda não é o pretendido — os dois instrumentos dão informação diferente e complementar." },
  ],
};

// Final quiz — 5 questions selected from the 16-question bank (indices 0,1,4,5,10)
const QUIZ_INDICES = [0, 1, 4, 5, 10];
const buildQuiz = (lang) => {
  const bank = BANK[lang] || BANK.en;
  return QUIZ_INDICES.map(i => bank[i]);
};

const getContent = lang => {
  const d = {
    en: {
      badge: "📚 Navigation & Cartography · Lesson 9/9 · ⭐ Premium · 200 XP · 🏁 MODULE COMPLETE",
      title: "Steering & Helm Orders",
      intro: "The helmsman is the vessel's hands on the wheel — but every helm order follows a strict, standardised communication pattern. A misheard or misunderstood order at the wheel can send a vessel off course at the worst possible moment.\n\nThis lesson covers the steering orders simulator, how the rudder actually turns the vessel, the full order/response/meaning table, and the key formats that prevent dangerous confusion.",
      p1: "PART 1 — STEERING ORDERS SIMULATOR",
      s1: "STEERING ORDERS (SMCP):\n\nEvery helm order follows the same discipline:\n1. The OOW gives the order\n2. The helmsman repeats it BEFORE executing\n3. The helmsman repeats it again AFTER executing, confirming the angle applied\n\n\"Midships\" is not a heading — it centres the rudder.\n\"Steady as she goes\" holds the current heading.\n\"Steer [heading]\" gives a precise, 3-digit heading.",
      p2: "PART 2 — RUDDER & HELM RESPONSE",
      s2: "RUDDER & HELM RESPONSE:\n\nRudder angle mainly determines the turning radius, not speed.\n\nChain of causality:\nRudder movement → Hydrodynamic force →\nBow starts swinging → Heading changes →\nCourse changes\n\nHeading ≠ Course ≠ Track.\nThere is always a delay between the order and the visible response — never over-correct.",
      p3: "PART 3 — STEERING COMMANDS FLASHCARDS",
      s3: "THE 7 STEERING ORDERS:\n\nHard-a-starboard/port · Starboard/Port [X] ·\nMidships · Steady / Steady as she goes ·\nSteer [heading] · Nothing to port/starboard ·\nPort/starboard easy\n\nEach one has a precise expected helmsman response and a distinct meaning.",
      p4: "PART 4 — STEERING FORMATS & KEYWORDS",
      s4: "KEY FORMAT RULES:\n\nHeadings: always 3 digits.\n\"Hard-a-...\" = maximum angle.\n\"... ten/fifteen\" = precise angle.\nEvery helm order: repeated before AND after execution.\n\"Steady\" ≠ \"Steer [heading]\".",
      p5: "PART 5 — STEERING VOCABULARY QUIZ",
      p6: "🎯 EXERCISE", p7: "📝 QUESTION BANK — 16 QUESTIONS",
      sumT: "SUMMARY — STEERING & HELM ORDERS",
      sumP: [
        "Every helm order is repeated before and after execution.",
        "\"Midships\" is not a heading — it is the rudder centred.",
        "Headings are always announced in 3 digits.",
        "Never confuse maximum angle (\"hard-a-...\") with precise angle (\"... ten/fifteen\").",
        "Anticipate the vessel's inertia, never over-correct.",
        "The helmsman does not steer the vessel by intuition: he applies the OOW's orders precisely while maintaining clear, standardised communication.",
      ],
      learnedP: [
        "Steering orders: opening, repeat-back before/after, closing confirmation",
        "Rudder angle, turning circle, and the cause-effect chain to a course change",
        "The full order/response/meaning table for the 7 steering orders",
        "Key format rules: 3-digit headings, max vs precise angle, Steady vs Steer",
        "When and how a helmsman must report doubt, error, or danger",
      ],
    },
    fr: {
      badge: "📚 Navigation & Cartographie · Leçon 9/9 · ⭐ Premium · 200 XP · 🏁 FIN DU MODULE",
      title: "Ordres de Barre & Réponse du Navire",
      intro: "Le timonier est les mains du navire sur la barre — mais chaque ordre de barre suit un schéma de communication strict et standardisé. Un ordre mal entendu ou mal compris à la barre peut faire dévier le navire de sa route au pire moment.\n\nCette leçon couvre le simulateur d'ordres de barre, la façon dont le gouvernail fait réellement tourner le navire, le tableau complet ordre/réponse/signification, et les formats clés qui évitent les confusions dangereuses.",
      p1: "PARTIE 1 — SIMULATEUR D'ORDRES DE BARRE",
      s1: "ORDRES DE BARRE (SMCP) :\n\nChaque ordre de barre suit la même discipline :\n1. L'OOW donne l'ordre\n2. Le timonier le répète AVANT de l'exécuter\n3. Le timonier le répète à nouveau APRÈS exécution, en confirmant l'angle appliqué\n\n\"Midships\" n'est pas un cap — il centre le gouvernail.\n\"Steady as she goes\" maintient le cap actuel.\n\"Steer [cap]\" donne un cap précis à 3 chiffres.",
      p2: "PARTIE 2 — GOUVERNAIL & RÉPONSE DU NAVIRE",
      s2: "GOUVERNAIL & RÉPONSE DU NAVIRE :\n\nL'angle de barre détermine surtout le rayon de giration, pas la vitesse.\n\nChaîne de causalité :\nMouvement de barre → Force hydrodynamique →\nL'étrave commence à pivoter → Le cap change →\nLa route change\n\nHeading ≠ Course ≠ Track.\nIl existe toujours un délai entre l'ordre et la réponse visible — ne jamais sur-corriger.",
      p3: "PARTIE 3 — FICHES DES ORDRES DE BARRE",
      s3: "LES 7 ORDRES DE BARRE :\n\nHard-a-starboard/port · Starboard/Port [X] ·\nMidships · Steady / Steady as she goes ·\nSteer [cap] · Nothing to port/starboard ·\nPort/starboard easy\n\nChacun a une réponse attendue précise du timonier et une signification distincte.",
      p4: "PARTIE 4 — FORMATS & MOTS CLÉS",
      s4: "RÈGLES DE FORMAT CLÉS :\n\nCaps : toujours 3 chiffres.\n\"Hard-a-...\" = angle maximal.\n\"... ten/fifteen\" = angle précis.\nTout ordre de barre : répété avant ET après exécution.\n\"Steady\" ≠ \"Steer [cap]\".",
      p5: "PARTIE 5 — QUIZ VOCABULAIRE",
      p6: "🎯 EXERCICE", p7: "📝 BANQUE 16 QUESTIONS",
      sumT: "RÉSUMÉ — ORDRES DE BARRE",
      sumP: [
        "Tout ordre de barre se répète avant et après exécution.",
        "\"Midships\" n'est pas un cap — c'est le gouvernail centré.",
        "Les caps s'annoncent toujours en 3 chiffres.",
        "Ne jamais confondre angle maximal (\"hard-a-...\") et angle précis (\"... ten/fifteen\").",
        "Anticiper l'inertie du navire, jamais sur-corriger.",
        "Le timonier ne dirige pas le navire selon son intuition : il applique précisément les ordres de l'OOW tout en maintenant une communication claire et standardisée.",
      ],
      learnedP: [
        "Ordres de barre : ouverture, répétition avant/après, confirmation de clôture",
        "Angle de barre, rayon de giration et chaîne de causalité vers un changement de route",
        "Le tableau complet ordre/réponse/signification pour les 7 ordres de barre",
        "Règles de format clés : caps à 3 chiffres, angle max vs précis, Steady vs Steer",
        "Quand et comment le timonier doit signaler un doute, une erreur ou un danger",
      ],
    },
    es: {
      badge: "📚 Navegación & Cartografía · Lección 9/9 · ⭐ Premium · 200 XP · 🏁 FIN DEL MÓDULO",
      title: "Órdenes de Timón y Respuesta del Buque",
      intro: "El timonel es las manos del buque en el timón — pero cada orden de timón sigue un patrón de comunicación estricto y estandarizado. Una orden mal oída o mal entendida en el timón puede desviar el buque de su rumbo en el peor momento.\n\nEsta lección cubre el simulador de órdenes de timón, cómo el timón realmente gira el buque, la tabla completa orden/respuesta/significado, y los formatos clave que evitan confusiones peligrosas.",
      p1: "PARTE 1 — SIMULADOR DE ÓRDENES DE TIMÓN",
      s1: "ÓRDENES DE TIMÓN (SMCP):\n\nCada orden de timón sigue la misma disciplina:\n1. El OOW da la orden\n2. El timonel la repite ANTES de ejecutarla\n3. El timonel la repite de nuevo DESPUÉS de ejecutarla, confirmando el ángulo aplicado\n\n\"Midships\" no es un rumbo — centra el timón.\n\"Steady as she goes\" mantiene el rumbo actual.\n\"Steer [rumbo]\" da un rumbo preciso de 3 cifras.",
      p2: "PARTE 2 — TIMÓN Y RESPUESTA DEL BUQUE",
      s2: "TIMÓN Y RESPUESTA DEL BUQUE:\n\nEl ángulo de timón determina sobre todo el radio de giro, no la velocidad.\n\nCadena causal:\nMovimiento de timón → Fuerza hidrodinámica →\nLa proa empieza a girar → El rumbo cambia →\nLa derrota cambia\n\nHeading ≠ Course ≠ Track.\nSiempre existe un retraso entre la orden y la respuesta visible — nunca sobrecorregir.",
      p3: "PARTE 3 — FICHAS DE LAS ÓRDENES DE TIMÓN",
      s3: "LAS 7 ÓRDENES DE TIMÓN:\n\nHard-a-starboard/port · Starboard/Port [X] ·\nMidships · Steady / Steady as she goes ·\nSteer [rumbo] · Nothing to port/starboard ·\nPort/starboard easy\n\nCada una tiene una respuesta precisa esperada del timonel y un significado distinto.",
      p4: "PARTE 4 — FORMATOS Y PALABRAS CLAVE",
      s4: "REGLAS DE FORMATO CLAVE:\n\nRumbos: siempre 3 cifras.\n\"Hard-a-...\" = ángulo máximo.\n\"... ten/fifteen\" = ángulo preciso.\nToda orden de timón: repetida antes Y después de ejecutarla.\n\"Steady\" ≠ \"Steer [rumbo]\".",
      p5: "PARTE 5 — QUIZ DE VOCABULARIO",
      p6: "🎯 EJERCICIO", p7: "📝 BANCO 16 PREGUNTAS",
      sumT: "RESUMEN — ÓRDENES DE TIMÓN",
      sumP: [
        "Toda orden de timón se repite antes y después de ejecutarla.",
        "\"Midships\" no es un rumbo — es el timón centrado.",
        "Los rumbos siempre se anuncian en 3 cifras.",
        "Nunca confundir ángulo máximo (\"hard-a-...\") con ángulo preciso (\"... ten/fifteen\").",
        "Anticipar la inercia del buque, nunca sobrecorregir.",
        "El timonel no dirige el buque según su intuición: aplica con precisión las órdenes del OOW manteniendo una comunicación clara y estandarizada.",
      ],
      learnedP: [
        "Órdenes de timón: apertura, repetición antes/después, confirmación de cierre",
        "Ángulo de timón, radio de giro y cadena causal hasta un cambio de derrota",
        "La tabla completa orden/respuesta/significado para las 7 órdenes de timón",
        "Reglas de formato clave: rumbos a 3 cifras, ángulo máx. vs preciso, Steady vs Steer",
        "Cuándo y cómo el timonel debe señalar una duda, un error o un peligro",
      ],
    },
    pt: {
      badge: "📚 Navegação & Cartografia · Lição 9/9 · ⭐ Premium · 200 XP · 🏁 FIM DO MÓDULO",
      title: "Ordens de Leme e Resposta do Navio",
      intro: "O timoneiro é as mãos do navio no leme — mas cada ordem de leme segue um padrão de comunicação estrito e padronizado. Uma ordem mal ouvida ou mal compreendida no leme pode desviar o navio do seu rumo no pior momento.\n\nEsta lição cobre o simulador de ordens de leme, a forma como o leme realmente vira o navio, a tabela completa ordem/resposta/significado, e os formatos chave que evitam confusões perigosas.",
      p1: "PARTE 1 — SIMULADOR DE ORDENS DE LEME",
      s1: "ORDENS DE LEME (SMCP):\n\nCada ordem de leme segue a mesma disciplina:\n1. O OOW dá a ordem\n2. O timoneiro repete-a ANTES de a executar\n3. O timoneiro repete-a novamente DEPOIS da execução, confirmando o ângulo aplicado\n\n\"Midships\" não é um rumo — centra o leme.\n\"Steady as she goes\" mantém o rumo atual.\n\"Steer [rumo]\" dá um rumo preciso de 3 dígitos.",
      p2: "PARTE 2 — LEME E RESPOSTA DO NAVIO",
      s2: "LEME E RESPOSTA DO NAVIO:\n\nO ângulo de leme determina sobretudo o raio de giro, não a velocidade.\n\nCadeia causal:\nMovimento de leme → Força hidrodinâmica →\nA proa começa a virar → O rumo muda →\nA derrota muda\n\nHeading ≠ Course ≠ Track.\nExiste sempre um atraso entre a ordem e a resposta visível — nunca sobrecorrigir.",
      p3: "PARTE 3 — FICHAS DAS ORDENS DE LEME",
      s3: "AS 7 ORDENS DE LEME:\n\nHard-a-starboard/port · Starboard/Port [X] ·\nMidships · Steady / Steady as she goes ·\nSteer [rumo] · Nothing to port/starboard ·\nPort/starboard easy\n\nCada uma tem uma resposta precisa esperada do timoneiro e um significado distinto.",
      p4: "PARTE 4 — FORMATOS E PALAVRAS-CHAVE",
      s4: "REGRAS DE FORMATO CHAVE:\n\nRumos: sempre 3 dígitos.\n\"Hard-a-...\" = ângulo máximo.\n\"... ten/fifteen\" = ângulo preciso.\nToda a ordem de leme: repetida antes E depois da execução.\n\"Steady\" ≠ \"Steer [rumo]\".",
      p5: "PARTE 5 — QUIZ DE VOCABULÁRIO",
      p6: "🎯 EXERCÍCIO", p7: "📝 BANCO 16 QUESTÕES",
      sumT: "RESUMO — ORDENS DE LEME",
      sumP: [
        "Toda a ordem de leme é repetida antes e depois da execução.",
        "\"Midships\" não é um rumo — é o leme centrado.",
        "Os rumos são sempre anunciados em 3 dígitos.",
        "Nunca confundir ângulo máximo (\"hard-a-...\") com ângulo preciso (\"... ten/fifteen\").",
        "Antecipar a inércia do navio, nunca sobrecorrigir.",
        "O timoneiro não dirige o navio segundo a sua intuição: aplica com precisão as ordens do OOW mantendo uma comunicação clara e padronizada.",
      ],
      learnedP: [
        "Ordens de leme: abertura, repetição antes/depois, confirmação de encerramento",
        "Ângulo de leme, raio de giro e cadeia causal até uma mudança de derrota",
        "A tabela completa ordem/resposta/significado para as 7 ordens de leme",
        "Regras de formato chave: rumos a 3 dígitos, ângulo máx. vs preciso, Steady vs Steer",
        "Quando e como o timoneiro deve sinalizar uma dúvida, um erro ou um perigo",
      ],
    },
  };
  return d[lang] || d.en;
};

export default function LessonSteering({ lang = "en", onBack = () => {}, onComplete = () => {}, onNext = () => {}, onQuizScored = (score:number,maxScore:number) => {} }) {
  const t = T[lang] || T.en;
  const bank = BANK[lang] || BANK.en;
  const quiz = buildQuiz(lang);
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
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
            <div style={{ fontSize: 10, color: C.blue2, letterSpacing: 1, fontFamily: "'Cinzel',serif" }}>🧭 {lang === "fr" ? "Navigation & Cartographie" : lang === "en" ? "Navigation & Cartography" : lang === "es" ? "Navegación & Cartografía" : "Navegação & Cartografia"}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{lang === "fr" ? "Leçon 9/9" : lang === "en" ? "Lesson 9/9" : lang === "es" ? "Lección 9/9" : "Lição 9/9"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(201,146,42,0.2)", border: `1px solid ${C.gold}44`, color: C.gold, fontWeight: 700 }}>⭐ PREMIUM</div>
            <div style={{ fontSize: 11, color: C.blue2, fontFamily: "'Cinzel',serif" }}>{progress}%</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.blue2},${C.gold2})`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px", position: "relative", zIndex: 1, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "all 0.5s ease" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {phase === "content" && <>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, marginBottom: 10, background: `${C.blue2}15`, border: `1px solid ${C.blue2}44`, fontSize: 11, color: C.blue2, fontWeight: 700 }}>{lc.badge}</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.3, margin: "0 0 16px" }}>{lc.title}</h1>
            <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.blue2}` }}>
              <div style={{ fontSize: 14, color: "rgba(240,244,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.intro}</div>
            </Card>

            <SL icon="🎙️" text={lc.p1} color={C.blue2} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s1}</div></Card>
            <Card style={{ marginBottom: 14, background: "rgba(0,5,20,0.7)", border: `1px solid ${C.blue2}22` }}>
              <div style={{ fontSize: 11, color: C.blue2, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🎙️ {lang === "fr" ? "SIMULATEUR — INTERACTIF" : lang === "en" ? "SIMULATOR — INTERACTIVE" : lang === "es" ? "SIMULADOR — INTERACTIVO" : "SIMULADOR — INTERATIVO"}</div>
              <SteeringOrdersSVG lang={lang} />
            </Card>

            <SL icon="⚙️" text={lc.p2} color={C.gold2} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s2}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold2}22` }}>
              <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>⚙️ {lang === "fr" ? "GOUVERNAIL — INTERACTIF" : lang === "en" ? "RUDDER — INTERACTIVE" : lang === "es" ? "TIMÓN — INTERACTIVO" : "LEME — INTERATIVO"}</div>
              <RudderHelmResponseSVG lang={lang} />
            </Card>

            <SL icon="🃏" text={lc.p3} color={C.green} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s3}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.green}22` }}>
              <div style={{ fontSize: 11, color: C.green, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🃏 {lang === "fr" ? "FICHES DES ORDRES — INTERACTIF" : lang === "en" ? "COMMAND FLASHCARDS — INTERACTIVE" : lang === "es" ? "FICHAS DE ÓRDENES — INTERACTIVO" : "FICHAS DE ORDENS — INTERATIVO"}</div>
              <SteeringFlashcardsSVG lang={lang} />
            </Card>

            <SL icon="📐" text={lc.p4} color={C.red} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s4}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.red}22` }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>📐 {lang === "fr" ? "FORMATS & MOTS CLÉS — INTERACTIF" : lang === "en" ? "FORMATS & KEYWORDS — INTERACTIVE" : lang === "es" ? "FORMATOS Y PALABRAS CLAVE — INTERACTIVO" : "FORMATOS E PALAVRAS-CHAVE — INTERATIVO"}</div>
              <SteeringFormatsSVG lang={lang} />
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}33` }}><SteeringVocabQuiz lang={lang} /></Card>

            <SL icon="📝" text={lc.p6} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}><Exercise1 lang={lang} t={t} /></Card>

            <SL icon="📚" text={lc.p7} color={C.purple} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.purple}44`, background: "linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))" }}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)} /></Card>

            <Card style={{ marginBottom: 14, background: `${C.blue2}08`, border: `1px solid ${C.blue2}22` }}>
              <div style={{ fontSize: 11, color: C.blue2, letterSpacing: 3, fontFamily: "'Cinzel',serif", marginBottom: 12 }}>{lc.sumT}</div>
              {lc.sumP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < lc.sumP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 11, color: C.white }}><span style={{ color: C.blue2, fontWeight: 700, fontFamily: "'Courier New',monospace" }}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={() => { if (bankDone) setPhase("quiz"); }} style={{ opacity: bankDone ? 1 : 0.45, cursor: bankDone ? "pointer" : "not-allowed", width: "100%", padding: "17px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.blue2},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: C.navy,  boxShadow: `0 10px 36px ${C.blue2}33`, marginTop: 8 }}>{t.startQuiz}</button>
            <div style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8 }}>{t.readFirst}</div>
          </>}

          {phase === "quiz" && <>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 }}>
                {lang === "fr" ? "Quiz Final — Ordres de Barre" : lang === "en" ? "Final Quiz — Steering Orders" : lang === "es" ? "Quiz Final — Órdenes de Timón" : "Quiz Final — Ordens de Leme"}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>5 {lang === "fr" ? "questions · Leçon 9/9" : lang === "en" ? "questions · Lesson 9/9" : lang === "es" ? "preguntas · Lección 9/9" : "perguntas · Lição 9/9"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s => { setQuizScore(s); onQuizScored(s, quiz.length); setTimeout(() => setPhase("done"), 1200); }} />
          </>}

          {phase === "done" && <div style={{ paddingTop: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>{t.complete}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 20, background: `${C.blue2}15`, border: `1px solid ${C.blue2}55`, fontSize: 14, color: C.blue2, fontWeight: 700 }}>+{quizScore >= 4 ? 200 : quizScore === 3 ? 120 : 60} {t.xp} ⭐</div>
            </div>

            <Card style={{ marginBottom: 16, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏁</span>
                <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
                  {lang === "fr" ? "MODULE TERMINÉ !" : lang === "en" ? "MODULE COMPLETE!" : lang === "es" ? "¡MÓDULO COMPLETADO!" : "MÓDULO CONCLUÍDO!"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.white, lineHeight: 1.8 }}>
                {lang === "fr" ? "Navigation & Cartographie — 9 leçons maîtrisées 🧭" : lang === "en" ? "Navigation & Cartography — 9 lessons mastered 🧭" : lang === "es" ? "Navegación & Cartografía — 9 lecciones dominadas 🧭" : "Navegação & Cartografia — 9 lições dominadas 🧭"}
              </div>
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{t.youLearned}</div>
              {lc.learnedP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < lc.learnedP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 12, color: C.white }}><span style={{ color: C.blue2, fontWeight: 700 }}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{ width: "100%", padding: "16px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.gold},${C.blue})`, fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: C.white, cursor: "pointer", boxShadow: "0 8px 28px rgba(201,146,42,0.4)", marginBottom: 10 }}>
              {lang === "fr" ? "🎯 EXPLORER LES AUTRES MODULES →" : lang === "en" ? "🎯 EXPLORE OTHER MODULES →" : lang === "es" ? "🎯 EXPLORAR OTROS MÓDULOS →" : "🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{ width: "100%", padding: "12px 0", border: `1px solid rgba(255,255,255,0.15)`, borderRadius: 14, background: "transparent", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer" }}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
