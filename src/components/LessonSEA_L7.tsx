import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank, shuffleQuestionOptions } from "./LessonShared";

// ══════════════════════════════════════
// SVG 1 — SURFACE PREPARATION & PAINTING SIMULATOR
// ══════════════════════════════════════
function PaintingSimulatorSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [showTr, setShowTr] = useState(false);

  const steps = [
    {
      event: { fr: "L'ordre de mission est donné", en: "The assignment is given", es: "Se da la orden de trabajo", pt: "A missão é atribuída" },
      quote: "Prepare and paint the rusted section on the port bulwark, following the standard sequence.",
      tr: { fr: "Prépare et peins la section rouillée sur le pavois bâbord, en suivant la séquence standard.", es: "Prepara y pinta la sección oxidada en la amurada de babor, siguiendo la secuencia estándar.", pt: "Prepara e pinta a secção enferrujada na amurada de bombordo, seguindo a sequência padrão." },
    },
    {
      event: { fr: "L'AB évalue l'étendue de la corrosion", en: "The AB assesses the extent of the corrosion", es: "El AB evalúa la extensión de la corrosión", pt: "O AB avalia a extensão da corrosão" },
      description: {
        fr: "Avant de commencer : surface légère (rouille de surface) vs corrosion profonde (piqûres, perte d'épaisseur visible).",
        en: "Before starting: light surface condition (surface rust) vs deep corrosion (pitting, visible loss of thickness).",
        es: "Antes de empezar: superficie leve (óxido superficial) frente a corrosión profunda (picaduras, pérdida de espesor visible).",
        pt: "Antes de começar: superfície ligeira (ferrugem superficial) versus corrosão profunda (picadas, perda de espessura visível).",
      },
      context: {
        fr: "En cas de doute sur la gravité, signaler avant de traiter soi-même.",
        en: "In case of doubt about the severity, report before treating it himself.",
        es: "En caso de duda sobre la gravedad, informar antes de tratarla uno mismo.",
        pt: "Em caso de dúvida sobre a gravidade, reportar antes de tratar sozinho.",
      },
    },
    {
      event: { fr: "Décapage / dérouillage", en: "Chipping / de-rusting", es: "Decapado / desoxidación", pt: "Decapagem / desenferrujamento" },
      description: {
        fr: "Chipping, scaling, wire brushing — retrait de la rouille et de l'ancienne peinture écaillée jusqu'à obtenir une surface saine.",
        en: "Chipping, scaling, wire brushing — removing rust and old flaking paint down to a sound surface.",
        es: "Chipping, scaling, wire brushing — retirada del óxido y de la pintura antigua descascada hasta obtener una superficie sana.",
        pt: "Chipping, scaling, wire brushing — remoção da ferrugem e da tinta antiga descascada até obter uma superfície sã.",
      },
    },
    {
      event: { fr: "Nettoyage et dégraissage", en: "Cleaning and degreasing", es: "Limpieza y desengrasado", pt: "Limpeza e desengorduramento" },
      description: {
        fr: "Nettoyage et dégraissage de la surface avant application.",
        en: "Cleaning and degreasing the surface before application.",
        es: "Limpieza y desengrasado de la superficie antes de la aplicación.",
        pt: "Limpeza e desengorduramento da superfície antes da aplicação.",
      },
      context: {
        fr: "Une surface mal préparée compromet toute la tenue de la peinture, quelle que soit sa qualité.",
        en: "A poorly prepared surface compromises the entire adhesion of the paint, whatever its quality.",
        es: "Una superficie mal preparada compromete toda la adherencia de la pintura, sea cual sea su calidad.",
        pt: "Uma superfície mal preparada compromete toda a aderência da tinta, seja qual for a sua qualidade.",
      },
    },
    {
      event: { fr: "Vérification des conditions météo", en: "Weather conditions are checked", es: "Verificación de las condiciones meteorológicas", pt: "Verificação das condições meteorológicas" },
      description: {
        fr: "L'AB vérifie que les conditions permettent la peinture (surface sèche, absence de pluie, humidité excessive ou projection d'eau).",
        en: "The AB checks that conditions allow painting (dry surface, no rain, excessive humidity or water spray).",
        es: "El AB verifica que las condiciones permiten pintar (superficie seca, ausencia de lluvia, humedad excesiva o salpicaduras de agua).",
        pt: "O AB verifica que as condições permitem pintar (superfície seca, ausência de chuva, humidade excessiva ou salpicos de água).",
      },
      context: {
        fr: "On ne peint pas \u00ab dès que c'est prêt \u00bb — il faut parfois attendre plusieurs heures après une préparation parfaite.",
        en: "Painting does not happen \u201cas soon as it's ready\u201d — sometimes several hours must be waited after a perfect preparation.",
        es: "No se pinta \u00ab en cuanto está listo \u00bb — a veces hay que esperar varias horas después de una preparación perfecta.",
        pt: "Não se pinta \u00ab assim que está pronto \u00bb — por vezes é preciso esperar várias horas após uma preparação perfeita.",
      },
    },
    {
      event: { fr: "Application de la couche primaire (primer)", en: "Primer coat applied", es: "Aplicación de la capa de imprimación (primer)", pt: "Aplicação da camada de primário (primer)" },
      description: {
        fr: "Protection anticorrosion, condition avant toute couche de finition.",
        en: "Anti-corrosion protection, a condition before any finishing coat.",
        es: "Protección anticorrosiva, condición previa a cualquier capa de acabado.",
        pt: "Proteção anticorrosiva, condição prévia a qualquer camada de acabamento.",
      },
    },
    {
      event: { fr: "Application de la peinture de finition (topcoat)", en: "Topcoat applied", es: "Aplicación de la pintura de acabado (topcoat)", pt: "Aplicação da tinta de acabamento (topcoat)" },
      description: {
        fr: "Respect du nombre de couches et du temps de séchage entre couches.",
        en: "Respecting the number of coats and the drying time between coats.",
        es: "Respetando el número de capas y el tiempo de secado entre capas.",
        pt: "Respeitando o número de camadas e o tempo de secagem entre camadas.",
      },
      context: {
        fr: "Protection de la zone (marquage, protection du matériel environnant).",
        en: "Protecting the area (marking it off, protecting surrounding equipment).",
        es: "Protección de la zona (señalización, protección del equipo circundante).",
        pt: "Proteção da zona (sinalização, proteção do equipamento circundante).",
      },
    },
    {
      event: { fr: "Rapport de fin de tâche au Bosun", en: "End-of-task report to the Bosun", es: "Informe de fin de tarea al Bosun", pt: "Relatório de fim de tarefa ao Bosun" },
      description: {
        fr: "Zone traitée, produits utilisés, état final.",
        en: "Area treated, products used, final condition.",
        es: "Zona tratada, productos utilizados, estado final.",
        pt: "Zona tratada, produtos utilizados, estado final.",
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
            background: i <= step ? (i === step ? C.purple : `${C.purple}55`) : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.purple, letterSpacing: 2, textAlign: "center", marginBottom: 8, fontFamily: "'Cinzel',serif" }}>
        {lang === "fr" ? "SIMULATEUR PRÉPARATION & PEINTURE" : lang === "en" ? "PREPARATION & PAINTING SIMULATOR" : lang === "es" ? "SIMULADOR PREPARACIÓN Y PINTURA" : "SIMULADOR PREPARAÇÃO E PINTURA"} — {step + 1}/{steps.length}
      </div>
      <div style={{ padding: "12px", borderRadius: 14, marginBottom: 10, background: "rgba(142,68,173,0.08)", border: `2px solid ${C.purple}55`, animation: "fadeUp 0.3s ease" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.purple, marginBottom: 8 }}>{s.event[lang] || s.event.en}</div>
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
      {s.context && (
        <div style={{ padding: "10px 12px", borderRadius: 12, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 10, fontSize: 11, color: C.white, lineHeight: 1.6, whiteSpace: "pre-line" }}>
          {s.context[lang] || s.context.en}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStep(v => Math.max(0, v - 1))} disabled={step === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: step === 0 ? C.muted : C.white, cursor: step === 0 ? "default" : "pointer", fontSize: 11 }}>
          ◀ {lang === "fr" ? "Précédent" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Anterior"}
        </button>
        <button onClick={() => setStep(v => Math.min(steps.length - 1, v + 1))} disabled={step === steps.length - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: step === steps.length - 1 ? "rgba(255,255,255,0.05)" : `${C.purple}22`, border: `1px solid ${step === steps.length - 1 ? "rgba(255,255,255,0.08)" : C.purple}`, color: C.white, cursor: step === steps.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — THE CORROSION CYCLE
// ══════════════════════════════════════
function CorrosionCycleSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const cycle = [
    { id: 1, icon: "💧", label: { fr: "Exposition du métal à l'humidité et à l'oxygène", en: "Metal exposed to moisture and oxygen", es: "Exposición del metal a la humedad y al oxígeno", pt: "Exposição do metal à humidade e ao oxigénio" } },
    { id: 2, icon: "🧪", label: { fr: "Oxydation", en: "Oxidation", es: "Oxidación", pt: "Oxidação" } },
    { id: 3, icon: "📈", label: { fr: "Expansion du volume de rouille", en: "Rust volume expansion", es: "Expansión del volumen de óxido", pt: "Expansão do volume de ferrugem" } },
    { id: 4, icon: "🪨", label: { fr: "Écaillage de la protection existante", en: "Flaking of the existing protection", es: "Descascarillado de la protección existente", pt: "Descamação da proteção existente" } },
    { id: 5, icon: "⚠️", label: { fr: "Accélération de la corrosion sous-jacente", en: "Accelerated underlying corrosion", es: "Aceleración de la corrosión subyacente", pt: "Aceleração da corrosão subjacente" } },
  ];
  const sel_ = cycle.find(c => c.id === sel);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {cycle.map((c, i) => (
          <div key={c.id}>
            <div onClick={() => setSel(sel === c.id ? null : c.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: sel === c.id ? `${C.red}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel === c.id ? C.red : "rgba(255,255,255,0.08)"}` }}>
              <div style={{ fontSize: 16 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{c.label[lang] || c.label.en}</div>
            </div>
            {i < cycle.length - 1 && <div style={{ textAlign: "center", fontSize: 12, color: C.gold2, padding: "2px 0" }}>↓</div>}
          </div>
        ))}
        <div style={{ textAlign: "center", fontSize: 11, color: C.red, padding: "2px 0" }}>↻ {lang === "fr" ? "le cycle s'auto-entretient" : lang === "en" ? "the cycle self-sustains" : lang === "es" ? "el ciclo se autoalimenta" : "o ciclo autoalimenta-se"}</div>
      </div>

      <div style={{ padding: "12px", borderRadius: 12, background: `${C.purple}12`, border: `1.5px solid ${C.purple}44` }}>
        <div style={{ fontSize: 12, color: C.white, lineHeight: 1.7, fontWeight: 700, fontStyle: "italic" }}>
          {lang === "fr" ? "\u00ab La peinture ne supprime pas la corrosion : elle isole temporairement l'acier de son environnement. \u00bb" :
           lang === "en" ? "\u201cPaint does not remove corrosion: it temporarily isolates the steel from its environment.\u201d" :
           lang === "es" ? "\u00ab La pintura no elimina la corrosión: aísla temporalmente el acero de su entorno. \u00bb" :
           "\u00ab A tinta não elimina a corrosão: isola temporariamente o aço do seu ambiente. \u00bb"}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// PAINTING TERMS TABLE — shared data (7 terms)
// ══════════════════════════════════════
const PAINT_TERMS = [
  { term: "Chipping",
    meaning: { fr: "Décapage mécanique de la rouille/peinture écaillée (marteau à piquer)", en: "Mechanical removal of rust/flaking paint (chipping hammer)", es: "Eliminación mecánica del óxido/pintura descascada (martillo picador)", pt: "Remoção mecânica da ferrugem/tinta descascada (martelo picador)" } },
  { term: "Scaling",
    meaning: { fr: "Retrait des écailles de rouille en surface", en: "Removal of surface rust scale", es: "Eliminación de las escamas de óxido en superficie", pt: "Remoção das escamas de ferrugem à superfície" } },
  { term: "Primer",
    meaning: { fr: "Couche de protection anticorrosion appliquée avant la finition", en: "Anti-corrosion protective coat applied before the finish", es: "Capa de protección anticorrosiva aplicada antes del acabado", pt: "Camada de proteção anticorrosiva aplicada antes do acabamento" } },
  { term: "Topcoat",
    meaning: { fr: "Couche de finition (couleur, protection finale)", en: "Finishing coat (colour, final protection)", es: "Capa de acabado (color, protección final)", pt: "Camada de acabamento (cor, proteção final)" } },
  { term: "Dry film thickness (DFT)",
    meaning: { fr: "Épaisseur de peinture sèche appliquée — indicateur de qualité du travail", en: "Thickness of dry paint applied — an indicator of the quality of the work", es: "Espesor de pintura seca aplicada — un indicador de la calidad del trabajo", pt: "Espessura de tinta seca aplicada — um indicador da qualidade do trabalho" } },
  { term: "Curing time",
    meaning: { fr: "Temps de séchage/durcissement nécessaire entre les couches", en: "Required drying/hardening time between coats", es: "Tiempo de secado/endurecimiento necesario entre capas", pt: "Tempo de secagem/endurecimento necessário entre camadas" } },
  { term: "Touch-up painting",
    meaning: { fr: "Retouche ponctuelle d'une zone déjà peinte, expression très utilisée à bord", en: "Spot repainting of an already-painted area, a term widely used on board", es: "Repintado puntual de una zona ya pintada, una expresión muy usada a bordo", pt: "Repintura pontual de uma zona já pintada, uma expressão muito usada a bordo" } },
];

// ══════════════════════════════════════
// SVG 3 — PAINTING SEQUENCE & PRODUCTS
// ══════════════════════════════════════
function PaintingSequenceSVG({ lang }) {
  const [sel, setSel] = useState(0);
  const t = PAINT_TERMS[sel];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {PAINT_TERMS.map((m, i) => (
          <div key={i} onClick={() => setSel(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", background: sel === i ? `${C.purple}22` : "rgba(255,255,255,0.04)", border: `1.5px solid ${sel === i ? C.purple : "rgba(255,255,255,0.08)"}` }}>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700, color: C.white, flex: 1 }}>{m.term}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px", borderRadius: 12, background: `${C.purple}12`, border: `1.5px solid ${C.purple}44`, fontSize: 11, color: C.white, lineHeight: 1.7 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, fontWeight: 900, color: C.purple, marginBottom: 6 }}>{t.term}</div>
        {t.meaning[lang] || t.meaning.en}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — PAINTING VOCABULARY FLASHCARDS
// ══════════════════════════════════════
function PaintingFlashcardsSVG({ lang }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = PAINT_TERMS[idx];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {PAINT_TERMS.map((_, i) => (
          <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{
            flex: 1, height: 4, borderRadius: 4, cursor: "pointer",
            background: i === idx ? C.purple : i < idx ? `${C.purple}55` : "rgba(255,255,255,0.1)" }} />
        ))}
      </div>
      <div onClick={() => setFlipped(f => !f)} style={{
        padding: "16px", borderRadius: 14, cursor: "pointer", minHeight: 120,
        background: flipped ? `${C.purple}18` : "rgba(0,0,0,0.4)",
        border: `2px solid ${flipped ? C.purple : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s ease", animation: "fadeUp 0.3s ease",
        display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: 10 }}>
        {!flipped ? (
          <div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 8 }}>❓ {lang === "fr" ? "TERME" : lang === "en" ? "TERM" : lang === "es" ? "TÉRMINO" : "TERMO"} — {lang === "fr" ? "Touche pour la signification" : lang === "en" ? "Tap for meaning" : lang === "es" ? "Toca para el significado" : "Toque para o significado"}</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 15, color: C.white, fontWeight: 700, lineHeight: 1.5 }}>{card.term}</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 9, color: C.purple, letterSpacing: 2, marginBottom: 8 }}>✅ {lang === "fr" ? "SIGNIFICATION" : lang === "en" ? "MEANING" : lang === "es" ? "SIGNIFICADO" : "SIGNIFICADO"}</div>
            <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6 }}>{card.meaning[lang] || card.meaning.en}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setIdx(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={idx === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: idx === 0 ? C.muted : C.white, cursor: idx === 0 ? "default" : "pointer", fontSize: 11 }}>
          ◀ {lang === "fr" ? "Précédent" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Anterior"}
        </button>
        <button onClick={() => { setIdx(i => Math.min(PAINT_TERMS.length - 1, i + 1)); setFlipped(false); }} disabled={idx === PAINT_TERMS.length - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, background: idx === PAINT_TERMS.length - 1 ? "rgba(255,255,255,0.05)" : `${C.purple}22`, border: `1px solid ${idx === PAINT_TERMS.length - 1 ? "rgba(255,255,255,0.08)" : C.purple}`, color: C.white, cursor: idx === PAINT_TERMS.length - 1 ? "default" : "pointer", fontSize: 11, fontWeight: 700 }}>
          {lang === "fr" ? "Suivant" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Seguinte"} ▶
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// PAINTING VOCABULARY QUIZ
// ══════════════════════════════════════
function PaintingVocabQuiz({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const situations = [
    { fr: "Vous utilisez un marteau à piquer pour retirer la rouille et l'ancienne peinture écaillée jusqu'au métal sain.", en: "You use a chipping hammer to remove rust and old flaking paint down to bare, sound metal.", es: "Usa un martillo picador para retirar el óxido y la pintura antigua descascada hasta el metal sano.", pt: "Usa um martelo picador para remover a ferrugem e a tinta antiga descascada até ao metal são." },
    { fr: "Vous retirez les écailles de rouille en surface avant tout autre traitement.", en: "You remove the loose scale of surface rust before any further treatment.", es: "Retira las escamas sueltas de óxido superficial antes de cualquier otro tratamiento.", pt: "Remove as escamas soltas de ferrugem superficial antes de qualquer outro tratamento." },
    { fr: "Vous appliquez la première couche anticorrosion avant toute couche de finition.", en: "You apply the first anti-corrosion coat before any finishing coat.", es: "Aplica la primera capa anticorrosiva antes de cualquier capa de acabado.", pt: "Aplica a primeira camada anticorrosiva antes de qualquer camada de acabamento." },
    { fr: "Vous appliquez la couche finale colorée, la protection définitive.", en: "You apply the final coloured coat, the definitive protection.", es: "Aplica la capa final coloreada, la protección definitiva.", pt: "Aplica a camada final colorida, a proteção definitiva." },
    { fr: "Vous mesurez l'épaisseur de la peinture sèche appliquée pour vérifier la qualité du travail.", en: "You measure the thickness of the dry paint applied to check the quality of the work.", es: "Mide el espesor de la pintura seca aplicada para verificar la calidad del trabajo.", pt: "Mede a espessura da tinta seca aplicada para verificar a qualidade do trabalho." },
    { fr: "Vous attendez le temps nécessaire pour qu'une couche sèche/durcisse avant d'appliquer la suivante.", en: "You wait the required time for a coat to dry/harden before applying the next one.", es: "Espera el tiempo necesario para que una capa seque/endurezca antes de aplicar la siguiente.", pt: "Espera o tempo necessário para uma camada secar/endurecer antes de aplicar a seguinte." },
    { fr: "Vous retouchez ponctuellement une petite zone déjà peinte.", en: "You touch up a small spot on an already-painted surface.", es: "Retoca puntualmente una pequeña zona ya pintada.", pt: "Faz uma retoque pontual numa pequena zona já pintada." },
  ];

  const M = (i) => PAINT_TERMS[i].term;
  const qs = [
    { situation: situations[0], opts: [M(0), M(1), M(2)], correct: 0 },
    { situation: situations[1], opts: [M(0), M(1), M(4)], correct: 1 },
    { situation: situations[2], opts: [M(3), M(2), M(5)], correct: 1 },
    { situation: situations[3], opts: [M(2), M(3), M(6)], correct: 1 },
    { situation: situations[4], opts: [M(4), M(5), M(1)], correct: 0 },
    { situation: situations[5], opts: [M(4), M(5), M(0)], correct: 1 },
    { situation: situations[6], opts: [M(3), M(1), M(6)], correct: 2 },
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
        {qs.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i < qIdx ? C.purple : i === qIdx ? C.gold2 : "rgba(255,255,255,0.1)" }} />)}
      </div>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 12, padding: "14px", marginBottom: 12, border: `1px solid ${C.purple}33` }}>
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
      {ans !== null && <button onClick={next} style={{ width: "100%", padding: "11px 0", border: "none", borderRadius: 12, background: `linear-gradient(135deg,${C.purple},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700, color: C.navy, cursor: "pointer" }}>
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
    { fr: "Porter les EPI adaptés (protection respiratoire, gants, lunettes selon le produit)", en: "Wear appropriate PPE (respiratory protection, gloves, eye protection depending on the product)", es: "Usar el EPP adecuado (protección respiratoria, guantes, gafas según el producto)", pt: "Usar o EPI adequado (proteção respiratória, luvas, óculos consoante o produto)" },
    { fr: "Vérifier la ventilation de la zone si travail en espace confiné", en: "Verify the ventilation of the area if working in a confined space", es: "Verificar la ventilación de la zona si se trabaja en un espacio confinado", pt: "Verificar a ventilação da zona se o trabalho for em espaço confinado" },
    { fr: "Stocker les produits et déchets de peinture (chiffons imbibés, restes de solvant) dans les zones prévues, à l'écart de toute source d'ignition", en: "Store paint products and waste (soaked rags, solvent residue) in designated areas, away from any ignition source", es: "Almacenar los productos y residuos de pintura (trapos empapados, restos de disolvente) en las zonas previstas, alejados de cualquier fuente de ignición", pt: "Armazenar os produtos e resíduos de tinta (panos embebidos, restos de solvente) nas zonas previstas, longe de qualquer fonte de ignição" },
    { fr: "Éliminer toute source d'ignition avant l'utilisation de peintures ou solvants inflammables", en: "Eliminate any source of ignition before using flammable paints or solvents", es: "Eliminar cualquier fuente de ignición antes de usar pinturas o disolventes inflamables", pt: "Eliminar qualquer fonte de ignição antes de usar tintas ou solventes inflamáveis" },
    { fr: "Ne jamais mélanger des produits sans connaître leur compatibilité", en: "Never mix products without knowing their compatibility", es: "Nunca mezclar productos sin conocer su compatibilidad", pt: "Nunca misturar produtos sem conhecer a sua compatibilidade" },
  ];
  return (
    <Card style={{ border: `1px solid ${C.red}44`, background: "linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>⚠️</span>
        <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
          {lang === "fr" ? "RAPPEL SÉCURITÉ — AVANT TOUTE OPÉRATION DE PEINTURE" : lang === "en" ? "SAFETY REMINDER — BEFORE ANY PAINTING OPERATION" : lang === "es" ? "RECORDATORIO DE SEGURIDAD — ANTES DE CUALQUIER OPERACIÓN DE PINTURA" : "LEMBRETE DE SEGURANÇA — ANTES DE QUALQUER OPERAÇÃO DE PINTURA"}
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
// EXERCISE — THINNED / HOLED PLATING UNDER RUST
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [sel, setSel] = useState(null);

  const d = {
    fr: {
      situation: "Vous commencez à décaper une zone rouillée sur le pont et découvrez, une fois la rouille retirée, que la tôle sous-jacente semble anormalement fine ou présente un trou.",
      task: "Que faites-vous ?",
      opts: ["Continuer le décapage et repeindre normalement par-dessus", "Sécuriser la zone, suspendre le traitement de cette partie précise, et informer immédiatement le Bosun ou l'officier responsable", "Arrêter complètement toute la tâche de peinture en cours, y compris les autres zones déjà en bon état", "Combler le trou soi-même avec du mastic avant de peindre"],
      expl: "Sécuriser la zone, interrompre le traitement de cette partie précise et informer immédiatement le Bosun ou l'officier responsable — ne pas simplement repeindre par-dessus. Une perte d'épaisseur structurelle dépasse le périmètre de l'entretien de surface et relève d'une évaluation technique/structurelle qui n'appartient pas au rating seul. Il s'agit de suspendre le traitement de cette partie concernée, pas d'arrêter l'ensemble de la tâche de peinture en cours.",
    },
    en: {
      situation: "You start chipping a rusted area on deck and, once the rust is removed, discover the underlying plating looks abnormally thin or has a hole.",
      task: "What do you do?",
      opts: ["Keep chipping and paint over it normally", "Secure the area, suspend treatment of this specific part, and immediately inform the Bosun or the responsible officer", "Completely stop the whole painting task, including other areas already in good condition", "Fill the hole yourself with filler before painting"],
      expl: "Secure the area, stop treating this specific part and immediately inform the Bosun or the responsible officer — not simply paint over it. A structural loss of thickness goes beyond surface maintenance and calls for a technical/structural assessment that does not belong to the rating alone. This means suspending treatment of the affected part, not stopping the entire painting task in progress.",
    },
    es: {
      situation: "Empieza a decapar una zona oxidada en cubierta y, una vez retirado el óxido, descubre que la chapa subyacente parece anormalmente fina o presenta un agujero.",
      task: "¿Qué hace?",
      opts: ["Continuar decapando y repintar con normalidad encima", "Asegurar la zona, suspender el tratamiento de esa parte concreta, e informar de inmediato al Bosun o al oficial responsable", "Detener por completo toda la tarea de pintura en curso, incluidas otras zonas ya en buen estado", "Rellenar el agujero usted mismo con masilla antes de pintar"],
      expl: "Asegurar la zona, interrumpir el tratamiento de esa parte concreta e informar de inmediato al Bosun o al oficial responsable — no simplemente repintar encima. Una pérdida de espesor estructural supera el ámbito del mantenimiento superficial y requiere una evaluación técnica/estructural que no corresponde solo al marinero. Se trata de suspender el tratamiento de la parte afectada, no de detener toda la tarea de pintura en curso.",
    },
    pt: {
      situation: "Começa a decapar uma zona enferrujada no convés e, depois de retirada a ferrugem, descobre que a chapa subjacente parece anormalmente fina ou tem um buraco.",
      task: "O que faz?",
      opts: ["Continuar a decapar e repintar normalmente por cima", "Segurar a área, suspender o tratamento dessa parte específica, e informar de imediato o Bosun ou o oficial responsável", "Parar completamente toda a tarefa de pintura em curso, incluindo outras zonas já em bom estado", "Preencher o buraco você mesmo com massa antes de pintar"],
      expl: "Segurar a área, interromper o tratamento dessa parte específica e informar de imediato o Bosun ou o oficial responsável — não simplesmente repintar por cima. Uma perda de espessura estrutural ultrapassa o âmbito da manutenção de superfície e requer uma avaliação técnica/estrutural que não pertence só ao marinheiro. Trata-se de suspender o tratamento da parte afetada, não de parar toda a tarefa de pintura em curso.",
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
// QUESTION BANK — 17 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  en: [
    { q: "Why does corrosion worsen if it is not treated early?", opts: ["It does not actually worsen over time", "The cycle self-sustains: rust expands, flakes off the existing protection, and accelerates the underlying corrosion", "It only worsens in cold climates", "It only worsens on painted surfaces"], correct: 1, expl: "The corrosion cycle self-sustains: rust volume expands, flakes off the existing protection, and accelerates the underlying corrosion." },
    { q: "What does \"chipping\" mean?", opts: ["Applying the finishing coat", "Mechanical removal of rust/flaking paint with a chipping hammer", "Measuring the dry film thickness", "Waiting for the curing time"], correct: 1, expl: "Chipping is the mechanical removal of rust and flaking paint using a chipping hammer." },
    { q: "Why is surface preparation more important than the quality of the paint itself?", opts: ["It is not, paint quality matters most", "A poorly prepared surface compromises the entire adhesion of the paint, whatever its quality", "Preparation only affects how the paint looks, not how it holds", "It only matters for topcoats, not primers"], correct: 1, expl: "A poorly prepared surface compromises the entire adhesion of the paint, regardless of its quality." },
    { q: "What does \"primer\" mean and why is it applied before the finish?", opts: ["It is just a colour base with no protective role", "An anti-corrosion protective coat, a condition before any finishing coat", "It replaces the need for surface preparation", "It is only used for touch-up painting"], correct: 1, expl: "Primer is the anti-corrosion protective coat, a condition before any finishing coat is applied." },
    { q: "What does \"dry film thickness\" (DFT) mean?", opts: ["The thickness of rust before treatment", "The thickness of dry paint applied — an indicator of the quality of the work", "The time needed for paint to dry", "The number of coats applied"], correct: 1, expl: "DFT is the thickness of dry paint applied, an indicator of the quality of the work." },
    { q: "Why must the drying time between coats be respected?", opts: ["It has no real effect on the result", "Curing time is required for each coat to harden properly before the next one is applied, a condition of quality", "It only matters for primer, not topcoat", "It is only a company preference, not a technical requirement"], correct: 1, expl: "Curing time is the drying/hardening time required between coats — respecting it is a condition of quality." },
    { q: "What must the AB do if he discovers a structural loss of thickness under the rust?", opts: ["Paint over it normally, it will be checked later", "Secure the area, suspend treatment of that specific part, and immediately inform the Bosun or responsible officer", "Fill the hole himself before continuing", "Stop the entire painting task, including unrelated areas"], correct: 1, expl: "A structural loss of thickness must be reported immediately, with treatment of that specific part suspended — never simply painted over." },
    { q: "Why should a rusted area never be repainted directly without preparation?", opts: ["Because paint always fails regardless of preparation", "Because paint does not properly isolate the steel if the surface is not properly prepared, masking the problem without solving it", "Because it voids the paint's warranty", "There is no real reason, it is only a convention"], correct: 1, expl: "Paint does not remove corrosion, it isolates the steel — without proper preparation, it fails and simply masks the underlying problem instead of solving it." },
    { q: "What are the risks of storing rags soaked in paint/solvent?", opts: ["There is no particular risk", "Fire risk, including spontaneous combustion, if stored near an ignition source — hence the requirement to store them away from any ignition source", "They only pose a risk if left outdoors", "They only pose a risk during summer"], correct: 1, expl: "Soaked rags must be stored away from any ignition source to avoid fire risk, including spontaneous combustion." },
    { q: "Why is ventilation important during painting work?", opts: ["It is not particularly important", "To avoid the build-up of paint/solvent vapours in a confined space", "It only matters for spray painting", "It only matters in cold weather"], correct: 1, expl: "Ventilation of the area is required to avoid the build-up of vapours, particularly when working in a confined space." },
    { q: "What does \"scaling\" mean?", opts: ["Applying the topcoat", "Removal of surface rust scale", "Measuring the DFT", "Mixing paint products"], correct: 1, expl: "Scaling is the removal of loose surface rust scale." },
    { q: "Why is marking off a freshly painted area important?", opts: ["It has no real purpose", "To protect the area and surrounding equipment, and to prevent anyone from touching or damaging the fresh paint", "It is only a formality required by the company", "It only matters for topcoats, not primer"], correct: 1, expl: "Marking off the area protects it and the surrounding equipment, and prevents fresh paint from being touched or damaged." },
    { q: "Can an AB decide alone how many coats to apply in case of doubt?", opts: ["Yes, if he has experience", "No — the planned number of coats must be respected, and in case of doubt he must report rather than improvise", "Yes, as long as it looks sufficient", "Yes, if the Bosun is unavailable"], correct: 1, expl: "The planned number of coats must be respected; in case of doubt, the AB reports rather than deciding alone or improvising." },
    { q: "Why must certain paint products never be mixed without verification?", opts: ["Mixing products always improves the result", "Because mixing incompatible products can cause a dangerous reaction or an ineffective product", "It is only a cost consideration", "It only matters for primers, not topcoats"], correct: 1, expl: "Products must never be mixed without knowing their compatibility — an incompatible mix can be dangerous or simply ineffective." },
    { q: "What is the role of the end-of-task report to the Bosun?", opts: ["It has no real purpose beyond formality", "To precisely inform of the area treated, the products used, and the final condition", "It is only needed if a problem occurred", "It is only required for large-scale painting jobs"], correct: 1, expl: "The end-of-task report precisely informs the Bosun of the area treated, the products used, and the final condition." },
    { q: "Why is regular inspection of the hull and structures essential to the vessel's safety?", opts: ["It is mainly a matter of appearance", "Because undetected corrosion self-aggravates and can develop into a structural loss of thickness compromising the vessel's integrity — this links directly to routine maintenance", "It is only required once a year by regulation", "It only matters for very old vessels"], correct: 1, expl: "Undetected corrosion self-aggravates and can evolve into a structural loss of thickness — this is exactly why regular inspection, linked to routine maintenance, matters for safety." },
    { q: "Why is corrosion considered a safety issue and not merely an aesthetic one?", opts: ["It is purely a cosmetic concern", "Because it can evolve into a structural loss of thickness affecting the vessel's integrity and safety, beyond its visual appearance", "It only affects the vessel's resale value", "It is only a safety issue in cold climates"], correct: 1, expl: "Corrosion can evolve well beyond appearance into a structural loss of thickness that affects the vessel's integrity and safety." },
  ],
  fr: [
    { q: "Pourquoi la corrosion s'aggrave-t-elle si elle n'est pas traitée tôt ?", opts: ["Elle ne s'aggrave pas réellement avec le temps", "Le cycle s'auto-entretient : la rouille se dilate, écaille la protection existante, et accélère la corrosion sous-jacente", "Elle ne s'aggrave qu'en climat froid", "Elle ne s'aggrave que sur les surfaces peintes"], correct: 1, expl: "Le cycle de corrosion s'auto-entretient : le volume de rouille se dilate, écaille la protection existante, et accélère la corrosion sous-jacente." },
    { q: "Que signifie \"chipping\" ?", opts: ["Appliquer la couche de finition", "Décapage mécanique de la rouille/peinture écaillée au marteau à piquer", "Mesurer l'épaisseur de peinture sèche", "Attendre le temps de séchage"], correct: 1, expl: "Le chipping est le décapage mécanique de la rouille et de la peinture écaillée au marteau à piquer." },
    { q: "Pourquoi la préparation de surface est-elle plus importante que la qualité de la peinture elle-même ?", opts: ["Ce n'est pas le cas, la qualité de la peinture compte le plus", "Une surface mal préparée compromet toute la tenue de la peinture, quelle que soit sa qualité", "La préparation n'affecte que l'aspect, pas la tenue", "Cela ne compte que pour les couches de finition, pas le primer"], correct: 1, expl: "Une surface mal préparée compromet toute la tenue de la peinture, quelle que soit sa qualité." },
    { q: "Que signifie \"primer\" et pourquoi l'applique-t-on avant la finition ?", opts: ["Ce n'est qu'une base de couleur sans rôle protecteur", "Une couche de protection anticorrosion, condition avant toute couche de finition", "Il remplace le besoin de préparation de surface", "Il ne sert qu'aux retouches ponctuelles"], correct: 1, expl: "Le primer est la couche de protection anticorrosion, condition avant toute couche de finition." },
    { q: "Que signifie \"dry film thickness\" (DFT) ?", opts: ["L'épaisseur de rouille avant traitement", "L'épaisseur de peinture sèche appliquée — indicateur de qualité du travail", "Le temps nécessaire au séchage de la peinture", "Le nombre de couches appliquées"], correct: 1, expl: "Le DFT est l'épaisseur de peinture sèche appliquée, un indicateur de qualité du travail." },
    { q: "Pourquoi doit-on respecter le temps de séchage entre les couches ?", opts: ["Cela n'a aucun effet réel sur le résultat", "Le curing time est nécessaire pour que chaque couche durcisse correctement avant application de la suivante, condition de qualité", "Cela ne compte que pour le primer, pas la finition", "Ce n'est qu'une préférence de l'entreprise, pas une exigence technique"], correct: 1, expl: "Le curing time est le temps de séchage/durcissement nécessaire entre les couches — le respecter est une condition de qualité." },
    { q: "Que doit faire l'AB s'il découvre une perte d'épaisseur structurelle sous la rouille ?", opts: ["Repeindre normalement par-dessus, cela sera vérifié plus tard", "Sécuriser la zone, suspendre le traitement de cette partie précise, et informer immédiatement le Bosun ou l'officier responsable", "Combler le trou lui-même avant de continuer", "Arrêter toute la tâche de peinture, y compris les zones sans rapport"], correct: 1, expl: "Une perte d'épaisseur structurelle doit être signalée immédiatement, avec suspension du traitement de cette partie précise — jamais simplement repeinte par-dessus." },
    { q: "Pourquoi ne faut-il jamais repeindre directement sur une zone rouillée sans préparation ?", opts: ["Parce que la peinture échoue toujours, quelle que soit la préparation", "Parce que la peinture n'isole pas correctement l'acier si la surface n'est pas correctement préparée, masquant le problème sans le résoudre", "Parce que cela annule la garantie de la peinture", "Il n'y a pas de réelle raison, c'est juste une convention"], correct: 1, expl: "La peinture ne supprime pas la corrosion, elle isole l'acier — sans préparation correcte, elle échoue et masque simplement le problème sous-jacent sans le résoudre." },
    { q: "Quels sont les risques liés au stockage de chiffons imbibés de peinture/solvant ?", opts: ["Il n'y a pas de risque particulier", "Risque d'incendie, y compris de combustion spontanée, s'ils sont stockés près d'une source d'ignition — d'où l'exigence de les stocker à l'écart de toute source d'ignition", "Ils ne présentent un risque que s'ils sont laissés dehors", "Ils ne présentent un risque qu'en été"], correct: 1, expl: "Les chiffons imbibés doivent être stockés à l'écart de toute source d'ignition pour éviter un risque d'incendie, y compris de combustion spontanée." },
    { q: "Pourquoi la ventilation est-elle importante lors de travaux de peinture ?", opts: ["Elle n'est pas particulièrement importante", "Pour éviter l'accumulation de vapeurs de peinture/solvant dans un espace confiné", "Cela ne compte que pour la peinture au pistolet", "Cela ne compte que par temps froid"], correct: 1, expl: "La ventilation de la zone est nécessaire pour éviter l'accumulation de vapeurs, en particulier en espace confiné." },
    { q: "Que signifie \"scaling\" ?", opts: ["Appliquer la couche de finition", "Retrait des écailles de rouille en surface", "Mesurer le DFT", "Mélanger des produits de peinture"], correct: 1, expl: "Le scaling est le retrait des écailles de rouille en surface." },
    { q: "Pourquoi le marquage de la zone fraîchement peinte est-il important ?", opts: ["Cela n'a pas de réelle utilité", "Pour protéger la zone et le matériel environnant, et éviter que quelqu'un touche ou endommage la peinture fraîche", "Ce n'est qu'une formalité exigée par l'entreprise", "Cela ne compte que pour la finition, pas le primer"], correct: 1, expl: "Le marquage protège la zone et le matériel environnant, et évite que la peinture fraîche soit touchée ou endommagée." },
    { q: "Un AB peut-il décider seul de la quantité de couches à appliquer en cas de doute ?", opts: ["Oui, s'il a de l'expérience", "Non — le nombre de couches prévu doit être respecté, et en cas de doute il doit signaler plutôt qu'improviser", "Oui, tant que cela semble suffisant", "Oui, si le Bosun n'est pas disponible"], correct: 1, expl: "Le nombre de couches prévu doit être respecté ; en cas de doute, l'AB signale plutôt que de décider seul ou d'improviser." },
    { q: "Pourquoi certains produits de peinture ne doivent-ils pas être mélangés sans vérification ?", opts: ["Mélanger des produits améliore toujours le résultat", "Parce que mélanger des produits incompatibles peut provoquer une réaction dangereuse ou un produit inefficace", "Ce n'est qu'une question de coût", "Cela ne compte que pour le primer, pas la finition"], correct: 1, expl: "Il ne faut jamais mélanger des produits sans connaître leur compatibilité — un mélange incompatible peut être dangereux ou simplement inefficace." },
    { q: "Quel est le rôle du rapport de fin de tâche au Bosun ?", opts: ["Il n'a pas de réelle utilité au-delà de la formalité", "Informer précisément de la zone traitée, des produits utilisés et de l'état final", "Il n'est nécessaire qu'en cas de problème", "Il n'est requis que pour les grands chantiers de peinture"], correct: 1, expl: "Le rapport de fin de tâche informe précisément le Bosun de la zone traitée, des produits utilisés et de l'état final." },
    { q: "Pourquoi une inspection régulière de la coque et des structures est-elle essentielle à la sécurité du navire ?", opts: ["C'est surtout une question d'apparence", "Parce que la corrosion non détectée s'auto-aggrave et peut évoluer vers une perte d'épaisseur structurelle compromettant l'intégrité du navire — d'où le lien direct avec l'entretien courant", "Elle n'est exigée qu'une fois par an par réglementation", "Cela ne compte que pour les très vieux navires"], correct: 1, expl: "La corrosion non détectée s'auto-aggrave et peut évoluer vers une perte d'épaisseur structurelle — c'est exactement pourquoi l'inspection régulière, liée à l'entretien courant, compte pour la sécurité." },
    { q: "Pourquoi la corrosion est-elle considérée comme un problème de sécurité et pas uniquement d'esthétique ?", opts: ["C'est purement une question cosmétique", "Parce qu'elle peut évoluer vers une perte d'épaisseur structurelle affectant l'intégrité et la sécurité du navire, au-delà de l'aspect visuel", "Elle n'affecte que la valeur de revente du navire", "Ce n'est un problème de sécurité qu'en climat froid"], correct: 1, expl: "La corrosion peut évoluer bien au-delà de l'aspect visuel vers une perte d'épaisseur structurelle qui affecte l'intégrité et la sécurité du navire." },
  ],
  es: [
    { q: "¿Por qué la corrosión empeora si no se trata a tiempo?", opts: ["En realidad no empeora con el tiempo", "El ciclo se autoalimenta: el óxido se expande, descascara la protección existente y acelera la corrosión subyacente", "Solo empeora en climas fríos", "Solo empeora en superficies pintadas"], correct: 1, expl: "El ciclo de corrosión se autoalimenta: el volumen de óxido se expande, descascara la protección existente y acelera la corrosión subyacente." },
    { q: "¿Qué significa \"chipping\"?", opts: ["Aplicar la capa de acabado", "Eliminación mecánica del óxido/pintura descascada con martillo picador", "Medir el espesor de pintura seca", "Esperar el tiempo de secado"], correct: 1, expl: "El chipping es la eliminación mecánica del óxido y la pintura descascada con martillo picador." },
    { q: "¿Por qué la preparación de la superficie es más importante que la calidad de la pintura en sí?", opts: ["No lo es, la calidad de la pintura importa más", "Una superficie mal preparada compromete toda la adherencia de la pintura, sea cual sea su calidad", "La preparación solo afecta al aspecto, no a la adherencia", "Solo importa para las capas de acabado, no para el primer"], correct: 1, expl: "Una superficie mal preparada compromete toda la adherencia de la pintura, sea cual sea su calidad." },
    { q: "¿Qué significa \"primer\" y por qué se aplica antes del acabado?", opts: ["Es solo una base de color sin función protectora", "Una capa de protección anticorrosiva, condición previa a cualquier capa de acabado", "Sustituye la necesidad de preparar la superficie", "Solo se usa para retoques puntuales"], correct: 1, expl: "El primer es la capa de protección anticorrosiva, condición previa a cualquier capa de acabado." },
    { q: "¿Qué significa \"dry film thickness\" (DFT)?", opts: ["El espesor del óxido antes del tratamiento", "El espesor de pintura seca aplicada — un indicador de la calidad del trabajo", "El tiempo necesario para que seque la pintura", "El número de capas aplicadas"], correct: 1, expl: "El DFT es el espesor de pintura seca aplicada, un indicador de la calidad del trabajo." },
    { q: "¿Por qué hay que respetar el tiempo de secado entre capas?", opts: ["No tiene ningún efecto real en el resultado", "El curing time es necesario para que cada capa endurezca correctamente antes de aplicar la siguiente, condición de calidad", "Solo importa para el primer, no para el acabado", "Es solo una preferencia de la empresa, no un requisito técnico"], correct: 1, expl: "El curing time es el tiempo de secado/endurecimiento necesario entre capas — respetarlo es una condición de calidad." },
    { q: "¿Qué debe hacer el AB si descubre una pérdida de espesor estructural bajo el óxido?", opts: ["Repintar con normalidad encima, se comprobará más tarde", "Asegurar la zona, suspender el tratamiento de esa parte concreta, e informar de inmediato al Bosun o al oficial responsable", "Rellenar el agujero él mismo antes de continuar", "Detener toda la tarea de pintura, incluidas zonas sin relación"], correct: 1, expl: "Una pérdida de espesor estructural debe informarse de inmediato, suspendiendo el tratamiento de esa parte concreta — nunca simplemente repintada encima." },
    { q: "¿Por qué nunca hay que repintar directamente sobre una zona oxidada sin preparación?", opts: ["Porque la pintura siempre falla, sea cual sea la preparación", "Porque la pintura no aísla correctamente el acero si la superficie no está bien preparada, enmascarando el problema sin resolverlo", "Porque anula la garantía de la pintura", "No hay una razón real, es solo una convención"], correct: 1, expl: "La pintura no elimina la corrosión, aísla el acero — sin preparación adecuada, falla y simplemente enmascara el problema subyacente sin resolverlo." },
    { q: "¿Cuáles son los riesgos de almacenar trapos empapados en pintura/disolvente?", opts: ["No hay un riesgo particular", "Riesgo de incendio, incluida la combustión espontánea, si se almacenan cerca de una fuente de ignición — de ahí la exigencia de almacenarlos alejados de cualquier fuente de ignición", "Solo suponen un riesgo si se dejan al aire libre", "Solo suponen un riesgo en verano"], correct: 1, expl: "Los trapos empapados deben almacenarse alejados de cualquier fuente de ignición para evitar un riesgo de incendio, incluida la combustión espontánea." },
    { q: "¿Por qué es importante la ventilación durante los trabajos de pintura?", opts: ["No es especialmente importante", "Para evitar la acumulación de vapores de pintura/disolvente en un espacio confinado", "Solo importa para la pintura a pistola", "Solo importa en climas fríos"], correct: 1, expl: "La ventilación de la zona es necesaria para evitar la acumulación de vapores, especialmente en espacios confinados." },
    { q: "¿Qué significa \"scaling\"?", opts: ["Aplicar la capa de acabado", "Eliminación de las escamas de óxido en superficie", "Medir el DFT", "Mezclar productos de pintura"], correct: 1, expl: "El scaling es la eliminación de las escamas sueltas de óxido superficial." },
    { q: "¿Por qué es importante señalizar la zona recién pintada?", opts: ["No tiene ninguna utilidad real", "Para proteger la zona y el equipo circundante, y evitar que alguien toque o dañe la pintura fresca", "Es solo una formalidad exigida por la empresa", "Solo importa para el acabado, no para el primer"], correct: 1, expl: "La señalización protege la zona y el equipo circundante, y evita que la pintura fresca se toque o dañe." },
    { q: "¿Puede un AB decidir solo la cantidad de capas a aplicar en caso de duda?", opts: ["Sí, si tiene experiencia", "No — el número de capas previsto debe respetarse, y en caso de duda debe informar en lugar de improvisar", "Sí, mientras parezca suficiente", "Sí, si el Bosun no está disponible"], correct: 1, expl: "El número de capas previsto debe respetarse; en caso de duda, el AB informa en lugar de decidir solo o improvisar." },
    { q: "¿Por qué ciertos productos de pintura nunca deben mezclarse sin verificación?", opts: ["Mezclar productos siempre mejora el resultado", "Porque mezclar productos incompatibles puede provocar una reacción peligrosa o un producto ineficaz", "Es solo una cuestión de coste", "Solo importa para el primer, no para el acabado"], correct: 1, expl: "Nunca deben mezclarse productos sin conocer su compatibilidad — una mezcla incompatible puede ser peligrosa o simplemente ineficaz." },
    { q: "¿Cuál es la función del informe de fin de tarea al Bosun?", opts: ["No tiene ninguna utilidad real más allá de la formalidad", "Informar con precisión de la zona tratada, los productos usados y el estado final", "Solo es necesario si ha ocurrido un problema", "Solo se requiere para grandes trabajos de pintura"], correct: 1, expl: "El informe de fin de tarea informa con precisión al Bosun de la zona tratada, los productos usados y el estado final." },
    { q: "¿Por qué es esencial una inspección regular del casco y las estructuras para la seguridad del buque?", opts: ["Es sobre todo una cuestión de apariencia", "Porque la corrosión no detectada se autoagrava y puede evolucionar hacia una pérdida de espesor estructural que compromete la integridad del buque — de ahí el vínculo directo con el mantenimiento rutinario", "Solo se exige una vez al año por normativa", "Solo importa para buques muy antiguos"], correct: 1, expl: "La corrosión no detectada se autoagrava y puede evolucionar hacia una pérdida de espesor estructural — precisamente por eso la inspección regular, vinculada al mantenimiento rutinario, importa para la seguridad." },
    { q: "¿Por qué se considera la corrosión un problema de seguridad y no solo estético?", opts: ["Es puramente una cuestión cosmética", "Porque puede evolucionar hacia una pérdida de espesor estructural que afecta a la integridad y seguridad del buque, más allá del aspecto visual", "Solo afecta al valor de reventa del buque", "Solo es un problema de seguridad en climas fríos"], correct: 1, expl: "La corrosión puede evolucionar mucho más allá del aspecto visual hacia una pérdida de espesor estructural que afecta a la integridad y seguridad del buque." },
  ],
  pt: [
    { q: "Por que a corrosão piora se não for tratada cedo?", opts: ["Na realidade não piora com o tempo", "O ciclo autoalimenta-se: a ferrugem expande, descama a proteção existente e acelera a corrosão subjacente", "Só piora em climas frios", "Só piora em superfícies pintadas"], correct: 1, expl: "O ciclo de corrosão autoalimenta-se: o volume de ferrugem expande, descama a proteção existente e acelera a corrosão subjacente." },
    { q: "O que significa \"chipping\"?", opts: ["Aplicar a camada de acabamento", "Remoção mecânica da ferrugem/tinta descascada com martelo picador", "Medir a espessura de tinta seca", "Esperar o tempo de secagem"], correct: 1, expl: "O chipping é a remoção mecânica da ferrugem e da tinta descascada com martelo picador." },
    { q: "Por que a preparação da superfície é mais importante do que a qualidade da tinta em si?", opts: ["Não é, a qualidade da tinta importa mais", "Uma superfície mal preparada compromete toda a aderência da tinta, seja qual for a sua qualidade", "A preparação só afeta o aspeto, não a aderência", "Só importa para as camadas de acabamento, não para o primer"], correct: 1, expl: "Uma superfície mal preparada compromete toda a aderência da tinta, seja qual for a sua qualidade." },
    { q: "O que significa \"primer\" e por que é aplicado antes do acabamento?", opts: ["É apenas uma base de cor sem função protetora", "Uma camada de proteção anticorrosiva, condição prévia a qualquer camada de acabamento", "Substitui a necessidade de preparação da superfície", "Só se usa para retoques pontuais"], correct: 1, expl: "O primer é a camada de proteção anticorrosiva, condição prévia a qualquer camada de acabamento." },
    { q: "O que significa \"dry film thickness\" (DFT)?", opts: ["A espessura da ferrugem antes do tratamento", "A espessura de tinta seca aplicada — um indicador da qualidade do trabalho", "O tempo necessário para a tinta secar", "O número de camadas aplicadas"], correct: 1, expl: "O DFT é a espessura de tinta seca aplicada, um indicador da qualidade do trabalho." },
    { q: "Por que se deve respeitar o tempo de secagem entre camadas?", opts: ["Não tem nenhum efeito real no resultado", "O curing time é necessário para cada camada endurecer corretamente antes de aplicar a seguinte, condição de qualidade", "Só importa para o primer, não para o acabamento", "É apenas uma preferência da empresa, não uma exigência técnica"], correct: 1, expl: "O curing time é o tempo de secagem/endurecimento necessário entre camadas — respeitá-lo é uma condição de qualidade." },
    { q: "O que deve fazer o AB se descobrir uma perda de espessura estrutural sob a ferrugem?", opts: ["Repintar normalmente por cima, será verificado mais tarde", "Segurar a área, suspender o tratamento dessa parte específica, e informar de imediato o Bosun ou o oficial responsável", "Preencher o buraco ele próprio antes de continuar", "Parar toda a tarefa de pintura, incluindo zonas sem relação"], correct: 1, expl: "Uma perda de espessura estrutural deve ser reportada de imediato, suspendendo o tratamento dessa parte específica — nunca simplesmente repintada por cima." },
    { q: "Por que nunca se deve repintar diretamente sobre uma zona enferrujada sem preparação?", opts: ["Porque a tinta falha sempre, seja qual for a preparação", "Porque a tinta não isola corretamente o aço se a superfície não estiver bem preparada, mascarando o problema sem o resolver", "Porque anula a garantia da tinta", "Não há uma razão real, é apenas uma convenção"], correct: 1, expl: "A tinta não elimina a corrosão, isola o aço — sem preparação adequada, falha e simplesmente mascara o problema subjacente sem o resolver." },
    { q: "Quais são os riscos de armazenar panos embebidos em tinta/solvente?", opts: ["Não há um risco particular", "Risco de incêndio, incluindo combustão espontânea, se armazenados perto de uma fonte de ignição — daí a exigência de os armazenar longe de qualquer fonte de ignição", "Só apresentam risco se deixados ao ar livre", "Só apresentam risco no verão"], correct: 1, expl: "Os panos embebidos devem ser armazenados longe de qualquer fonte de ignição para evitar risco de incêndio, incluindo combustão espontânea." },
    { q: "Por que a ventilação é importante durante os trabalhos de pintura?", opts: ["Não é particularmente importante", "Para evitar a acumulação de vapores de tinta/solvente num espaço confinado", "Só importa para a pintura à pistola", "Só importa em climas frios"], correct: 1, expl: "A ventilação da zona é necessária para evitar a acumulação de vapores, especialmente em espaços confinados." },
    { q: "O que significa \"scaling\"?", opts: ["Aplicar a camada de acabamento", "Remoção das escamas de ferrugem à superfície", "Medir o DFT", "Misturar produtos de tinta"], correct: 1, expl: "O scaling é a remoção das escamas soltas de ferrugem à superfície." },
    { q: "Por que é importante sinalizar a zona recém-pintada?", opts: ["Não tem nenhuma utilidade real", "Para proteger a zona e o equipamento circundante, e evitar que alguém toque ou danifique a tinta fresca", "É apenas uma formalidade exigida pela empresa", "Só importa para o acabamento, não para o primer"], correct: 1, expl: "A sinalização protege a zona e o equipamento circundante, e evita que a tinta fresca seja tocada ou danificada." },
    { q: "Pode um AB decidir sozinho a quantidade de camadas a aplicar em caso de dúvida?", opts: ["Sim, se tiver experiência", "Não — o número de camadas previsto deve ser respeitado, e em caso de dúvida deve reportar em vez de improvisar", "Sim, desde que pareça suficiente", "Sim, se o Bosun não estiver disponível"], correct: 1, expl: "O número de camadas previsto deve ser respeitado; em caso de dúvida, o AB reporta em vez de decidir sozinho ou improvisar." },
    { q: "Por que certos produtos de tinta nunca devem ser misturados sem verificação?", opts: ["Misturar produtos melhora sempre o resultado", "Porque misturar produtos incompatíveis pode provocar uma reação perigosa ou um produto ineficaz", "É apenas uma questão de custo", "Só importa para o primer, não para o acabamento"], correct: 1, expl: "Nunca se devem misturar produtos sem conhecer a sua compatibilidade — uma mistura incompatível pode ser perigosa ou simplesmente ineficaz." },
    { q: "Qual é o papel do relatório de fim de tarefa ao Bosun?", opts: ["Não tem nenhuma utilidade real além da formalidade", "Informar com precisão a zona tratada, os produtos usados e o estado final", "Só é necessário se ocorreu um problema", "Só é exigido para grandes trabalhos de pintura"], correct: 1, expl: "O relatório de fim de tarefa informa com precisão o Bosun sobre a zona tratada, os produtos usados e o estado final." },
    { q: "Por que uma inspeção regular do casco e das estruturas é essencial para a segurança do navio?", opts: ["É sobretudo uma questão de aparência", "Porque a corrosão não detetada autoagrava-se e pode evoluir para uma perda de espessura estrutural que compromete a integridade do navio — daí a ligação direta com a manutenção corrente", "Só é exigida uma vez por ano por regulamento", "Só importa para navios muito antigos"], correct: 1, expl: "A corrosão não detetada autoagrava-se e pode evoluir para uma perda de espessura estrutural — é precisamente por isso que a inspeção regular, ligada à manutenção corrente, importa para a segurança." },
    { q: "Por que a corrosão é considerada um problema de segurança e não apenas estético?", opts: ["É puramente uma questão cosmética", "Porque pode evoluir para uma perda de espessura estrutural que afeta a integridade e a segurança do navio, além do aspeto visual", "Só afeta o valor de revenda do navio", "Só é um problema de segurança em climas frios"], correct: 1, expl: "A corrosão pode evoluir muito além do aspeto visual para uma perda de espessura estrutural que afeta a integridade e a segurança do navio." },
  ],
};

// Final quiz — 5 questions selected from the 17-question bank (indices 0,3,6,8,15)
const QUIZ_INDICES = [0, 3, 6, 8, 15];
const buildQuiz = (lang) => {
  const bank = BANK[lang] || BANK.en;
  return QUIZ_INDICES.map(i => bank[i]);
};

const getContent = lang => {
  const d = {
    en: {
      badge: "📚 Seamanship · Lesson 7/7 · ⭐ Premium · 200 XP · 🏁 MODULE COMPLETE",
      title: "Painting & Corrosion Prevention",
      intro: "Paint does not remove corrosion — it isolates the steel from its environment, and only holds if the surface underneath is properly prepared. This lesson completes d6-l6's routine inspection and maintenance with the durable protection of deck structures against corrosion.\n\nThis lesson covers a surface preparation and painting round from assignment to report, the corrosion cycle, and the key terms used to describe products and sequence.",
      p1: "PART 1 — SURFACE PREPARATION & PAINTING SIMULATOR",
      s1: "PAINTING ROUND:\n\nAssignment given → corrosion extent assessed →\nchipping/scaling → cleaning & degreasing →\nweather conditions checked → primer applied →\ntopcoat applied → reported to the Bosun.\n\nPainting never happens \"as soon as it's ready\" — conditions matter as much as preparation.",
      p2: "PART 2 — THE CORROSION CYCLE",
      s2: "THE CORROSION CYCLE:\n\nMetal exposed to moisture and oxygen → oxidation →\nrust volume expansion → flaking of existing protection →\naccelerated underlying corrosion — and the cycle repeats.\n\nPaint does not remove corrosion: it temporarily isolates the steel from its environment.",
      p3: "PART 3 — PAINTING SEQUENCE & PRODUCTS",
      s3: "KEY TERMS:\n\nChipping · Scaling · Primer · Topcoat ·\nDry film thickness (DFT) · Curing time ·\nTouch-up painting.\n\nEach term marks a distinct stage or quality indicator in the painting sequence.",
      p4: "PART 4 — PAINTING VOCABULARY FLASHCARDS",
      p5: "PART 5 — PAINTING VOCABULARY QUIZ",
      p6: "🎯 EXERCISE", p7: "📝 QUESTION BANK — 17 QUESTIONS",
      sumT: "SUMMARY — PAINTING & CORROSION PREVENTION",
      sumP: [
        "Surface preparation (chipping, cleaning) determines how well any paint holds, whatever its quality.",
        "Untreated corrosion self-aggravates — early detection is essential (linked to d6-l6).",
        "Painting never happens \"as soon as it's ready\": weather conditions (dry surface, no moisture) must be checked before application.",
        "Structural thickness loss under rust goes beyond surface maintenance — suspend treatment of that area and report, never paint over it.",
        "Safety (PPE, ventilation, product storage, elimination of ignition sources) is an integral part of every painting operation.",
        "A properly executed paint job protects the structure; a poorly prepared one sometimes masks a problem without solving it.",
      ],
      learnedP: [
        "A surface preparation and painting round: assignment, assessment, chipping, cleaning, weather check, primer, topcoat, report",
        "The corrosion cycle, and why paint protects rather than repairs",
        "Key painting terms: chipping, scaling, primer, topcoat, DFT, curing time, touch-up painting",
        "Safety basics before any painting operation: PPE, ventilation, product storage, ignition sources",
        "When and how to report a structural loss of thickness discovered under rust",
      ],
    },
    fr: {
      badge: "📚 Seamanship · Leçon 7/7 · ⭐ Premium · 200 XP · 🏁 FIN DU MODULE",
      title: "Peinture & Prévention de la Corrosion",
      intro: "La peinture ne supprime pas la corrosion — elle isole l'acier de son environnement, et ne tient que si la surface sous-jacente est correctement préparée. Cette leçon complète l'inspection et l'entretien courant de d6-l6 en ajoutant la protection durable des structures de pont contre la corrosion.\n\nCette leçon couvre une ronde de préparation de surface et de peinture de l'ordre de mission au rapport, le cycle de la corrosion, et les termes clés utilisés pour décrire les produits et la séquence.",
      p1: "PARTIE 1 — SIMULATEUR PRÉPARATION & PEINTURE",
      s1: "RONDE DE PEINTURE :\n\nOrdre de mission → étendue de la corrosion évaluée →\ndécapage/dérouillage → nettoyage & dégraissage →\nconditions météo vérifiées → primer appliqué →\nfinition appliquée → rapport au Bosun.\n\nOn ne peint jamais \"dès que c'est prêt\" — les conditions comptent autant que la préparation.",
      p2: "PARTIE 2 — LE CYCLE DE LA CORROSION",
      s2: "LE CYCLE DE LA CORROSION :\n\nExposition du métal à l'humidité et à l'oxygène → oxydation →\nexpansion du volume de rouille → écaillage de la protection existante →\naccélération de la corrosion sous-jacente — et le cycle recommence.\n\nLa peinture ne supprime pas la corrosion : elle isole temporairement l'acier de son environnement.",
      p3: "PARTIE 3 — SÉQUENCE & PRODUITS DE PEINTURE",
      s3: "TERMES CLÉS :\n\nChipping · Scaling · Primer · Topcoat ·\nDry film thickness (DFT) · Curing time ·\nTouch-up painting.\n\nChaque terme marque une étape distincte ou un indicateur de qualité dans la séquence de peinture.",
      p4: "PARTIE 4 — FICHES VOCABULAIRE PEINTURE",
      p5: "PARTIE 5 — QUIZ VOCABULAIRE PEINTURE",
      p6: "🎯 EXERCICE", p7: "📝 BANQUE 17 QUESTIONS",
      sumT: "RÉSUMÉ — PEINTURE & PRÉVENTION DE LA CORROSION",
      sumP: [
        "La préparation de surface (décapage, nettoyage) conditionne la tenue de toute peinture, quelle que soit sa qualité.",
        "La corrosion non traitée s'auto-aggrave — la détection précoce est essentielle (lien avec d6-l6).",
        "On ne peint jamais \"dès que c'est prêt\" : les conditions météo (surface sèche, absence d'humidité) doivent être vérifiées avant application.",
        "Une perte d'épaisseur structurelle sous la rouille dépasse l'entretien de surface — suspendre le traitement de cette zone et signaler, ne jamais repeindre par-dessus.",
        "La sécurité (EPI, ventilation, stockage des produits, élimination des sources d'ignition) fait partie intégrante de toute opération de peinture.",
        "Une peinture bien réalisée protège la structure ; une peinture mal préparée masque parfois un problème sans le résoudre.",
      ],
      learnedP: [
        "Une ronde de préparation de surface et de peinture : ordre de mission, évaluation, décapage, nettoyage, vérification météo, primer, finition, rapport",
        "Le cycle de la corrosion, et pourquoi la peinture protège plutôt qu'elle ne répare",
        "Termes clés de peinture : chipping, scaling, primer, topcoat, DFT, curing time, touch-up painting",
        "Bases de sécurité avant toute opération de peinture : EPI, ventilation, stockage des produits, sources d'ignition",
        "Quand et comment signaler une perte d'épaisseur structurelle découverte sous la rouille",
      ],
    },
    es: {
      badge: "📚 Seamanship · Lección 7/7 · ⭐ Premium · 200 XP · 🏁 FIN DEL MÓDULO",
      title: "Pintura y Prevención de la Corrosión",
      intro: "La pintura no elimina la corrosión — aísla el acero de su entorno, y solo se sostiene si la superficie subyacente está correctamente preparada. Esta lección completa la inspección y el mantenimiento rutinario de d6-l6 añadiendo la protección duradera de las estructuras de cubierta contra la corrosión.\n\nEsta lección cubre una ronda de preparación de superficie y pintura desde la orden de trabajo hasta el informe, el ciclo de la corrosión, y los términos clave usados para describir los productos y la secuencia.",
      p1: "PARTE 1 — SIMULADOR PREPARACIÓN Y PINTURA",
      s1: "RONDA DE PINTURA:\n\nOrden de trabajo → extensión de la corrosión evaluada →\ndecapado/desoxidación → limpieza y desengrasado →\ncondiciones meteorológicas verificadas → primer aplicado →\nacabado aplicado → informe al Bosun.\n\nNunca se pinta \"en cuanto está listo\" — las condiciones importan tanto como la preparación.",
      p2: "PARTE 2 — EL CICLO DE LA CORROSIÓN",
      s2: "EL CICLO DE LA CORROSIÓN:\n\nExposición del metal a la humedad y al oxígeno → oxidación →\nexpansión del volumen de óxido → descascarillado de la protección existente →\naceleración de la corrosión subyacente — y el ciclo se repite.\n\nLa pintura no elimina la corrosión: aísla temporalmente el acero de su entorno.",
      p3: "PARTE 3 — SECUENCIA Y PRODUCTOS DE PINTURA",
      s3: "TÉRMINOS CLAVE:\n\nChipping · Scaling · Primer · Topcoat ·\nDry film thickness (DFT) · Curing time ·\nTouch-up painting.\n\nCada término marca una etapa distinta o un indicador de calidad en la secuencia de pintura.",
      p4: "PARTE 4 — FICHAS DE VOCABULARIO DE PINTURA",
      p5: "PARTE 5 — QUIZ DE VOCABULARIO DE PINTURA",
      p6: "🎯 EJERCICIO", p7: "📝 BANCO 17 PREGUNTAS",
      sumT: "RESUMEN — PINTURA Y PREVENCIÓN DE LA CORROSIÓN",
      sumP: [
        "La preparación de la superficie (decapado, limpieza) condiciona la adherencia de cualquier pintura, sea cual sea su calidad.",
        "La corrosión no tratada se autoagrava — la detección temprana es esencial (vínculo con d6-l6).",
        "Nunca se pinta \"en cuanto está listo\": las condiciones meteorológicas (superficie seca, ausencia de humedad) deben verificarse antes de aplicar.",
        "Una pérdida de espesor estructural bajo el óxido supera el mantenimiento superficial — suspender el tratamiento de esa zona e informar, nunca repintar encima.",
        "La seguridad (EPP, ventilación, almacenamiento de productos, eliminación de fuentes de ignición) forma parte integral de toda operación de pintura.",
        "Una pintura bien realizada protege la estructura; una pintura mal preparada a veces enmascara un problema sin resolverlo.",
      ],
      learnedP: [
        "Una ronda de preparación de superficie y pintura: orden de trabajo, evaluación, decapado, limpieza, verificación meteorológica, primer, acabado, informe",
        "El ciclo de la corrosión, y por qué la pintura protege en lugar de reparar",
        "Términos clave de pintura: chipping, scaling, primer, topcoat, DFT, curing time, touch-up painting",
        "Bases de seguridad antes de cualquier operación de pintura: EPP, ventilación, almacenamiento de productos, fuentes de ignición",
        "Cuándo y cómo informar de una pérdida de espesor estructural descubierta bajo el óxido",
      ],
    },
    pt: {
      badge: "📚 Seamanship · Lição 7/7 · ⭐ Premium · 200 XP · 🏁 FIM DO MÓDULO",
      title: "Pintura e Prevenção da Corrosão",
      intro: "A tinta não elimina a corrosão — isola o aço do seu ambiente, e só se sustenta se a superfície subjacente estiver corretamente preparada. Esta lição completa a inspeção e a manutenção corrente de d6-l6 acrescentando a proteção duradoura das estruturas de convés contra a corrosão.\n\nEsta lição cobre uma ronda de preparação de superfície e pintura desde a atribuição da tarefa até ao relatório, o ciclo da corrosão, e os termos chave usados para descrever os produtos e a sequência.",
      p1: "PARTE 1 — SIMULADOR PREPARAÇÃO E PINTURA",
      s1: "RONDA DE PINTURA:\n\nTarefa atribuída → extensão da corrosão avaliada →\ndecapagem/desenferrujamento → limpeza e desengorduramento →\ncondições meteorológicas verificadas → primer aplicado →\nacabamento aplicado → relatório ao Bosun.\n\nNunca se pinta \"assim que está pronto\" — as condições importam tanto quanto a preparação.",
      p2: "PARTE 2 — O CICLO DA CORROSÃO",
      s2: "O CICLO DA CORROSÃO:\n\nExposição do metal à humidade e ao oxigénio → oxidação →\nexpansão do volume de ferrugem → descamação da proteção existente →\naceleração da corrosão subjacente — e o ciclo repete-se.\n\nA tinta não elimina a corrosão: isola temporariamente o aço do seu ambiente.",
      p3: "PARTE 3 — SEQUÊNCIA E PRODUTOS DE PINTURA",
      s3: "TERMOS CHAVE:\n\nChipping · Scaling · Primer · Topcoat ·\nDry film thickness (DFT) · Curing time ·\nTouch-up painting.\n\nCada termo marca uma etapa distinta ou um indicador de qualidade na sequência de pintura.",
      p4: "PARTE 4 — FICHAS DE VOCABULÁRIO DE PINTURA",
      p5: "PARTE 5 — QUIZ DE VOCABULÁRIO DE PINTURA",
      p6: "🎯 EXERCÍCIO", p7: "📝 BANCO 17 QUESTÕES",
      sumT: "RESUMO — PINTURA E PREVENÇÃO DA CORROSÃO",
      sumP: [
        "A preparação da superfície (decapagem, limpeza) condiciona a aderência de qualquer tinta, seja qual for a sua qualidade.",
        "A corrosão não tratada autoagrava-se — a deteção precoce é essencial (ligação com d6-l6).",
        "Nunca se pinta \"assim que está pronto\": as condições meteorológicas (superfície seca, ausência de humidade) devem ser verificadas antes da aplicação.",
        "Uma perda de espessura estrutural sob a ferrugem ultrapassa a manutenção de superfície — suspender o tratamento dessa zona e reportar, nunca repintar por cima.",
        "A segurança (EPI, ventilação, armazenamento de produtos, eliminação de fontes de ignição) faz parte integrante de qualquer operação de pintura.",
        "Uma pintura bem executada protege a estrutura; uma pintura mal preparada por vezes mascara um problema sem o resolver.",
      ],
      learnedP: [
        "Uma ronda de preparação de superfície e pintura: atribuição, avaliação, decapagem, limpeza, verificação meteorológica, primer, acabamento, relatório",
        "O ciclo da corrosão, e por que a tinta protege em vez de reparar",
        "Termos chave de pintura: chipping, scaling, primer, topcoat, DFT, curing time, touch-up painting",
        "Bases de segurança antes de qualquer operação de pintura: EPI, ventilação, armazenamento de produtos, fontes de ignição",
        "Quando e como reportar uma perda de espessura estrutural descoberta sob a ferrugem",
      ],
    },
  };
  return d[lang] || d.en;
};

export default function LessonSEA_L7({ lang = "en", onBack = () => {}, onComplete = () => {}, onNext = () => {}, onQuizScored = (score:number,maxScore:number) => {} }) {
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
            <div style={{ fontSize: 10, color: C.purple, letterSpacing: 1, fontFamily: "'Cinzel',serif" }}>⚓ Seamanship</div>
            <div style={{ fontSize: 11, color: C.muted }}>{lang === "fr" ? "Leçon 7/7" : lang === "en" ? "Lesson 7/7" : lang === "es" ? "Lección 7/7" : "Lição 7/7"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(201,146,42,0.2)", border: `1px solid ${C.gold}44`, color: C.gold, fontWeight: 700 }}>⭐ PREMIUM</div>
            <div style={{ fontSize: 11, color: C.purple, fontFamily: "'Cinzel',serif" }}>{progress}%</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.purple},${C.gold2})`, transition: "width 0.5s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 40px", position: "relative", zIndex: 1, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "all 0.5s ease" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {phase === "content" && <>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 20, marginBottom: 10, background: `${C.purple}15`, border: `1px solid ${C.purple}44`, fontSize: 11, color: C.purple, fontWeight: 700 }}>{lc.badge}</div>
            <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.3, margin: "0 0 16px" }}>{lc.title}</h1>
            <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.purple}` }}>
              <div style={{ fontSize: 14, color: "rgba(240,244,255,0.85)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.intro}</div>
            </Card>

            <SL icon="🖌️" text={lc.p1} color={C.purple} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s1}</div></Card>
            <Card style={{ marginBottom: 14, background: "rgba(0,5,20,0.7)", border: `1px solid ${C.purple}22` }}>
              <div style={{ fontSize: 11, color: C.purple, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🖌️ {lang === "fr" ? "SIMULATEUR — INTERACTIF" : lang === "en" ? "SIMULATOR — INTERACTIVE" : lang === "es" ? "SIMULADOR — INTERACTIVO" : "SIMULADOR — INTERATIVO"}</div>
              <PaintingSimulatorSVG lang={lang} />
            </Card>

            <SL icon="🔄" text={lc.p2} color={C.red} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s2}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.red}22` }}>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🔄 {lang === "fr" ? "CYCLE — INTERACTIF" : lang === "en" ? "CYCLE — INTERACTIVE" : lang === "es" ? "CICLO — INTERACTIVO" : "CICLO — INTERATIVO"}</div>
              <CorrosionCycleSVG lang={lang} />
            </Card>

            <SL icon="🧰" text={lc.p3} color={C.gold2} />
            <Card style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "rgba(240,244,255,0.82)", lineHeight: 1.85, whiteSpace: "pre-line" }}>{lc.s3}</div></Card>
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold2}22` }}>
              <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>🧰 {lang === "fr" ? "SÉQUENCE — INTERACTIF" : lang === "en" ? "SEQUENCE — INTERACTIVE" : lang === "es" ? "SECUENCIA — INTERACTIVO" : "SEQUÊNCIA — INTERATIVO"}</div>
              <PaintingSequenceSVG lang={lang} />
            </Card>

            <SL icon="🃏" text={lc.p4} color={C.green} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.green}22` }}><PaintingFlashcardsSVG lang={lang} /></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}33` }}><PaintingVocabQuiz lang={lang} /></Card>

            <div style={{ marginBottom: 14 }}><SafetyReminderBlock lang={lang} /></div>

            <SL icon="📝" text={lc.p6} color={C.gold} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}><Exercise1 lang={lang} t={t} /></Card>

            <SL icon="📚" text={lc.p7} color={C.blue2} />
            <Card style={{ marginBottom: 14, border: `1px solid ${C.blue2}44`, background: "linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.8))" }}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)} /></Card>

            <Card style={{ marginBottom: 14, background: `${C.purple}08`, border: `1px solid ${C.purple}22` }}>
              <div style={{ fontSize: 11, color: C.purple, letterSpacing: 3, fontFamily: "'Cinzel',serif", marginBottom: 12 }}>{lc.sumT}</div>
              {lc.sumP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < lc.sumP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 11, color: C.white }}><span style={{ color: C.purple, fontWeight: 700, fontFamily: "'Courier New',monospace" }}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={() => { if (bankDone) setPhase("quiz"); }} style={{ opacity: bankDone ? 1 : 0.45, cursor: bankDone ? "pointer" : "not-allowed", width: "100%", padding: "17px 0", border: "none", borderRadius: 16, background: `linear-gradient(135deg,${C.purple},${C.gold})`, fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, color: C.white,  boxShadow: `0 10px 36px ${C.purple}33`, marginTop: 8 }}>{t.startQuiz}</button>
            <div style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8 }}>{t.readFirst}</div>
          </>}

          {phase === "quiz" && <>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 }}>
                {lang === "fr" ? "Quiz Final — Peinture & Corrosion" : lang === "en" ? "Final Quiz — Painting & Corrosion" : lang === "es" ? "Quiz Final — Pintura y Corrosión" : "Quiz Final — Pintura e Corrosão"}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>5 {lang === "fr" ? "questions · Leçon 7/7" : lang === "en" ? "questions · Lesson 7/7" : lang === "es" ? "preguntas · Lección 7/7" : "perguntas · Lição 7/7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s => { setQuizScore(s); onQuizScored(s, quiz.length); setTimeout(() => setPhase("done"), 1200); }} />
          </>}

          {phase === "done" && <div style={{ paddingTop: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 8 }}>{t.complete}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 20, background: `${C.purple}15`, border: `1px solid ${C.purple}55`, fontSize: 14, color: C.purple, fontWeight: 700 }}>+{quizScore >= 4 ? 200 : quizScore === 3 ? 120 : 60} {t.xp} ⭐</div>
            </div>

            <Card style={{ marginBottom: 16, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏁</span>
                <div style={{ fontSize: 11, color: C.gold2, letterSpacing: 2, fontFamily: "'Cinzel',serif", fontWeight: 700 }}>
                  {lang === "fr" ? "MODULE TERMINÉ !" : lang === "en" ? "MODULE COMPLETE!" : lang === "es" ? "¡MÓDULO COMPLETADO!" : "MÓDULO CONCLUÍDO!"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.white, lineHeight: 1.8 }}>
                {lang === "fr" ? "Seamanship — 7 leçons maîtrisées ⚓" : lang === "en" ? "Seamanship — 7 lessons mastered ⚓" : lang === "es" ? "Seamanship — 7 lecciones dominadas ⚓" : "Seamanship — 7 lições dominadas ⚓"}
              </div>
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>{t.youLearned}</div>
              {lc.learnedP.map((pt, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < lc.learnedP.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: 12, color: C.white }}><span style={{ color: C.purple, fontWeight: 700 }}>✓</span>{pt}</div>)}
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
