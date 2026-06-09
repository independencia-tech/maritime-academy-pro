import { useState, useEffect, useRef } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22",
};

// ══════════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════════
const T = {
  fr:{
    back:"◀ Retour", module:"Sécurité Maritime — COLREG",
    lesson:"Leçon", xp:"XP gagnés",
    quiz:"QUIZ", question:"Question", ofQ:"sur",
    correct:"✓ Bonne réponse !", wrong:"✗ Mauvaise réponse",
    expl:"Explication :", next:"SUIVANT →", finish:"VOIR MON SCORE →",
    startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT",
    complete:"🏅 LEÇON TERMINÉE !", nextLesson:"LEÇON 2 (Premium) →",
    backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris :",
    downloadMemo:"📥 Télécharger la fiche mémo",
    readFirst:"Lis le contenu puis commence le quiz",
    scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪",
    scoreGood:"Continue ! 📚",
    // Schema labels
    shipA:"NAVIRE A", shipB:"NAVIRE B",
    collision:"⚠️ RISQUE D'ABORDAGE",
    correct_action:"✅ MANŒUVRE CORRECTE",
    wrong_action:"❌ MANŒUVRE INCORRECTE",
    rule14title:"RULE 14 — Navires bout au bout",
    rule15title:"RULE 15 — Routes qui se croisent",
    rule13title:"RULE 13 — Navire qui rattrape",
    btnPlay:"▶ Animer", btnReset:"↺ Reset",
    btnCorrect:"✅ Voir manœuvre correcte",
    btnWrong:"❌ Voir erreur fatale",
    privileged:"Navire PRIVILÉGIÉ\n(maintient cap)",
    giveway:"Navire OBLIGÉ\n(cède passage)",
    portLight:"Feu ROUGE\n(Bâbord)",
    stbdLight:"Feu VERT\n(Tribord)",
    bothSeeRed:"Les deux voient\nrouge + vert",
    turnStbd:"Vire à TRIBORD",
    seesRedOnRight:"Voit feu rouge\nà DROITE",
    mustGiveWay:"DOIT céder\nle passage",
    overtaking:"Navire qui RATTRAPE\n(doit s'écarter)",
    beingOvertaken:"Navire RATTRAPÉ\n(navire privilégié)",
  },
  en:{
    back:"◀ Back", module:"Maritime Safety — COLREG",
    lesson:"Lesson", xp:"XP earned",
    quiz:"QUIZ", question:"Question", ofQ:"of",
    correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →",
    startQuiz:"✅ START QUIZ", result:"RESULT",
    complete:"🏅 LESSON COMPLETE!", nextLesson:"LESSON 2 (Premium) →",
    backDash:"← BACK TO DASHBOARD", youLearned:"You learned:",
    downloadMemo:"📥 Download memo sheet",
    readFirst:"Read the content then start the quiz",
    scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪",
    scoreGood:"Keep going! 📚",
    shipA:"VESSEL A", shipB:"VESSEL B",
    collision:"⚠️ COLLISION RISK",
    correct_action:"✅ CORRECT MANEUVER",
    wrong_action:"❌ WRONG MANEUVER",
    rule14title:"RULE 14 — Head-on situation",
    rule15title:"RULE 15 — Crossing situation",
    rule13title:"RULE 13 — Overtaking",
    btnPlay:"▶ Animate", btnReset:"↺ Reset",
    btnCorrect:"✅ See correct maneuver",
    btnWrong:"❌ See fatal mistake",
    privileged:"PRIVILEGED vessel\n(hold course)",
    giveway:"GIVE-WAY vessel\n(must maneuver)",
    portLight:"RED light\n(Port)",
    stbdLight:"GREEN light\n(Starboard)",
    bothSeeRed:"Both see\nred + green",
    turnStbd:"Turn STARBOARD",
    seesRedOnRight:"Sees red light\non RIGHT",
    mustGiveWay:"MUST give way",
    overtaking:"OVERTAKING vessel\n(must keep clear)",
    beingOvertaken:"OVERTAKEN vessel\n(privileged)",
  },
  es:{
    back:"◀ Volver", module:"Seguridad Marítima — COLREG",
    lesson:"Lección", xp:"XP ganados",
    quiz:"QUIZ", question:"Pregunta", ofQ:"de",
    correct:"✓ ¡Correcta!", wrong:"✗ Respuesta incorrecta",
    expl:"Explicación:", next:"SIGUIENTE →", finish:"VER MI PUNTUACIÓN →",
    startQuiz:"✅ EMPEZAR EL QUIZ", result:"RESULTADO",
    complete:"🏅 ¡LECCIÓN COMPLETADA!", nextLesson:"LECCIÓN 2 (Premium) →",
    backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:",
    downloadMemo:"📥 Descargar ficha resumen",
    readFirst:"Lee el contenido y luego comienza el quiz",
    scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪",
    scoreGood:"¡Sigue! 📚",
    shipA:"BUQUE A", shipB:"BUQUE B",
    collision:"⚠️ RIESGO DE ABORDAJE",
    correct_action:"✅ MANIOBRA CORRECTA",
    wrong_action:"❌ MANIOBRA INCORRECTA",
    rule14title:"REGLA 14 — Situación de proa",
    rule15title:"REGLA 15 — Situaciones de cruce",
    rule13title:"REGLA 13 — Alcance",
    btnPlay:"▶ Animar", btnReset:"↺ Reset",
    btnCorrect:"✅ Ver maniobra correcta",
    btnWrong:"❌ Ver error fatal",
    privileged:"Buque PRIVILEGIADO\n(mantiene rumbo)",
    giveway:"Buque CEDENTE\n(debe maniobrar)",
    portLight:"Luz ROJA\n(Babor)",
    stbdLight:"Luz VERDE\n(Estribor)",
    bothSeeRed:"Ambos ven\nrojo + verde",
    turnStbd:"Vira a ESTRIBOR",
    seesRedOnRight:"Ve luz roja\na la DERECHA",
    mustGiveWay:"DEBE ceder\nel paso",
    overtaking:"Buque que ALCANZA\n(debe apartarse)",
    beingOvertaken:"Buque ALCANZADO\n(privilegiado)",
  },
  pt:{
    back:"◀ Voltar", module:"Segurança Marítima — COLREG",
    lesson:"Lição", xp:"XP ganhos",
    quiz:"QUIZ", question:"Pergunta", ofQ:"de",
    correct:"✓ Correto!", wrong:"✗ Resposta errada",
    expl:"Explicação:", next:"PRÓXIMO →", finish:"VER MINHA PONTUAÇÃO →",
    startQuiz:"✅ COMEÇAR O QUIZ", result:"RESULTADO",
    complete:"🏅 LIÇÃO CONCLUÍDA!", nextLesson:"LIÇÃO 2 (Premium) →",
    backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:",
    downloadMemo:"📥 Baixar ficha resumo",
    readFirst:"Leia o conteúdo e depois comece o quiz",
    scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪",
    scoreGood:"Continue! 📚",
    shipA:"NAVIO A", shipB:"NAVIO B",
    collision:"⚠️ RISCO DE ABALROAMENTO",
    correct_action:"✅ MANOBRA CORRETA",
    wrong_action:"❌ MANOBRA INCORRETA",
    rule14title:"REGRA 14 — Navios em rota de colisão",
    rule15title:"REGRA 15 — Rotas que se cruzam",
    rule13title:"REGRA 13 — Ultrapassagem",
    btnPlay:"▶ Animar", btnReset:"↺ Reset",
    btnCorrect:"✅ Ver manobra correta",
    btnWrong:"❌ Ver erro fatal",
    privileged:"Navio PRIVILEGIADO\n(mantém rumo)",
    giveway:"Navio CEDENTE\n(deve manobrар)",
    portLight:"Luz VERMELHA\n(Bombordo)",
    stbdLight:"Luz VERDE\n(Estibordo)",
    bothSeeRed:"Ambos veem\nvermelho + verde",
    turnStbd:"Vira a ESTIBORDO",
    seesRedOnRight:"Vê luz vermelha\nà DIREITA",
    mustGiveWay:"DEVE ceder\na passagem",
    overtaking:"Navio que ULTRAPASSA\n(deve afastar-se)",
    beingOvertaken:"Navio ULTRAPASSADO\n(privilegiado)",
  },
};

// ══════════════════════════════════════════════
//  QUIZ DATA
// ══════════════════════════════════════════════
const QUIZ = {
  fr:[
    { q:"Deux navires se font face et risquent l'abordage. Que doivent-ils faire selon la Rule 14 ?",
      opts:["Le plus grand navire maintient son cap","Les deux navires virent à BÂBORD","Les deux navires virent à TRIBORD","Un navire stoppe, l'autre continue"],
      correct:2,
      expl:"Rule 14 : Quand deux navires à propulsion mécanique font route en sens contraires et risquent un abordage, CHACUN doit virer à TRIBORD pour passer à bâbord l'un de l'autre. Les deux voient le feu rouge ET le feu vert de l'autre = situation bout au bout." },
    { q:"La Rule 5 impose une veille permanente. Par quels moyens ?",
      opts:["GPS et AIS uniquement","Vue, ouïe et tous les moyens disponibles","Radar uniquement, surtout de nuit","VHF canal 16 en permanence"],
      correct:1,
      expl:"Rule 5 : Tout navire doit en permanence assurer une veille visuelle et auditive appropriée, en utilisant TOUS les moyens disponibles (vue, ouïe, radar, AIS...). C'est la règle la plus fondamentale du COLREG." },
    { q:"Navire A est sur la route de Navire B — B voit le feu ROUGE de A sur sa droite (tribord). Qui doit céder ?",
      opts:["Navire A — car il est plus petit","Navire B — car il voit le feu rouge à tribord","Les deux doivent manœuvrer ensemble","Celui qui est le plus rapide"],
      correct:1,
      expl:"Rule 15 — Routes croisées : Quand un navire voit l'autre sur son tribord (à droite), il doit céder le passage. Voir le feu ROUGE d'un navire à tribord = obligation de céder. Moyen mnémotechnique : Rouge à tribord = DANGER = je m'écarte." },
    { q:"Un navire rattrape un autre par l'arrière (Rule 13). Qui a la priorité ?",
      opts:["Le navire qui rattrape — car il est plus rapide","Le navire rattrapé — il est navire privilégié","Les deux ont la même priorité","Le navire de plus grand tonnage"],
      correct:1,
      expl:"Rule 13 — Navire qui en rattrape un autre : Le navire qui rattrape DOIT s'écarter du navire rattrapé. Le navire rattrapé est NAVIRE PRIVILÉGIÉ — il maintient son cap et sa vitesse. Cette règle s'applique quelle que soit la vitesse ou la taille des navires." },
    { q:"Selon la Rule 2, un marin peut déroger aux règles COLREG si :",
      opts:["Son navire est plus grand","Pour éviter un danger immédiat — le bon sens prime","Son capitaine le demande","Son pavillon national l'autorise"],
      correct:1,
      expl:"Rule 2 — Responsabilité : Aucune règle ne dispense de prendre toutes les précautions commandées par l'expérience ordinaire du marin. En cas de danger immédiat, le bon sens et les usages maritimes priment. C'est la 'règle du bon sens marin'." },
  ],
  en:[
    { q:"Two vessels meet head-on and risk collision. What must they do under Rule 14?",
      opts:["The larger vessel holds course","Both vessels turn to PORT","Both vessels turn to STARBOARD","One vessel stops, the other continues"],
      correct:2,
      expl:"Rule 14: When two power-driven vessels are meeting on reciprocal courses and there is risk of collision, EACH shall alter course to STARBOARD so they pass port to port. Both see each other's red AND green lights = head-on situation." },
    { q:"Rule 5 requires a proper lookout. By what means?",
      opts:["GPS and AIS only","Sight, hearing and all available means","Radar only, especially at night","VHF channel 16 continuously"],
      correct:1,
      expl:"Rule 5: Every vessel shall at all times maintain a proper lookout by sight and hearing as well as by ALL available means (radar, AIS...). This is the most fundamental rule in COLREG." },
    { q:"Vessel B sees Vessel A's RED light on its starboard (right) side. Who must give way?",
      opts:["Vessel A — it's smaller","Vessel B — it sees the red light on starboard","Both must maneuver together","The faster one"],
      correct:1,
      expl:"Rule 15 — Crossing situation: When a vessel sees another on its starboard side, it must give way. Seeing a RED light on starboard = obligation to give way. Memory aid: Red on starboard = DANGER = I give way." },
    { q:"A vessel is overtaking another from astern (Rule 13). Who has right of way?",
      opts:["The overtaking vessel — it's faster","The overtaken vessel — it is the privileged vessel","Both have equal priority","The larger vessel"],
      correct:1,
      expl:"Rule 13 — Overtaking: The overtaking vessel SHALL keep out of the way of the vessel being overtaken. The overtaken vessel is PRIVILEGED — it holds course and speed. This applies regardless of speed or size." },
    { q:"Under Rule 2, a mariner may deviate from COLREG rules when:",
      opts:["Their vessel is larger","To avoid immediate danger — seamanship prevails","The captain orders it","Their national flag permits it"],
      correct:1,
      expl:"Rule 2 — Responsibility: Nothing shall exonerate any vessel from the consequences of neglecting the ordinary practice of seamen. In immediate danger, good seamanship prevails. This is the 'good seamanship rule'." },
  ],
  es:[
    { q:"Dos buques se aproximan de proa y arriesgan colisión. ¿Qué deben hacer según la Regla 14?",
      opts:["El buque más grande mantiene su rumbo","Ambos buques viran a BABOR","Ambos buques viran a ESTRIBOR","Un buque para, el otro continúa"],
      correct:2,
      expl:"Regla 14: Cuando dos buques de propulsión mecánica navegan en rumbos opuestos con riesgo de abordaje, CADA UNO debe cambiar a ESTRIBOR para pasar por babor el uno del otro. Ambos ven el luz roja Y verde del otro = situación de proa." },
    { q:"La Regla 5 impone una vigilancia permanente. ¿Por qué medios?",
      opts:["Solo GPS y AIS","Vista, oído y todos los medios disponibles","Solo radar, especialmente de noche","VHF canal 16 permanentemente"],
      correct:1,
      expl:"Regla 5: Todo buque debe mantener en todo momento una vigilancia visual y auditiva apropiada, usando TODOS los medios disponibles (vista, oído, radar, AIS...). Es la regla más fundamental del COLREG." },
    { q:"El Buque B ve la luz ROJA del Buque A a su estribor (derecha). ¿Quién debe ceder?",
      opts:["El Buque A — es más pequeño","El Buque B — ve la luz roja a estribor","Ambos deben maniobrar juntos","El más rápido"],
      correct:1,
      expl:"Regla 15 — Cruce: Cuando un buque ve al otro por su costado de estribor, debe ceder el paso. Ver la luz ROJA a estribor = obligación de ceder. Regla mnemotécnica: Rojo a estribor = PELIGRO = me aparto." },
    { q:"Un buque alcanza a otro por la popa (Regla 13). ¿Quién tiene prioridad?",
      opts:["El buque que alcanza — es más rápido","El buque alcanzado — es el buque privilegiado","Ambos tienen igual prioridad","El de mayor tonelaje"],
      correct:1,
      expl:"Regla 13: El buque que alcanza a otro DEBE apartarse del buque alcanzado. El buque alcanzado es PRIVILEGIADO — mantiene rumbo y velocidad. Se aplica independientemente de la velocidad o el tamaño." },
    { q:"Según la Regla 2, un marino puede apartarse del COLREG cuando:",
      opts:["Su buque es más grande","Para evitar un peligro inmediato — prevalece el buen sentido","Su capitán lo ordena","Su pabellón nacional lo permite"],
      correct:1,
      expl:"Regla 2 — Responsabilidad: Nada exonerará a ningún buque de las consecuencias de descuidar las prácticas ordinarias del marino. En peligro inmediato, prevalece la buena práctica marinera." },
  ],
  pt:[
    { q:"Dois navios se aproximam de proa e correm risco de abalroamento. O que devem fazer pela Regra 14?",
      opts:["O navio maior mantém o rumo","Ambos os navios viram a BOMBORDO","Ambos os navios viram a ESTIBORDO","Um navio para, o outro continua"],
      correct:2,
      expl:"Regra 14: Quando dois navios a motor navegam em rumos opostos com risco de abalroamento, CADA UM deve mudar para ESTIBORDO para passarem pelo lado de bombordo um do outro. Ambos veem luz vermelha E verde = situação de proa." },
    { q:"A Regra 5 impõe uma vigilância permanente. Por que meios?",
      opts:["Apenas GPS e AIS","Vista, audição e todos os meios disponíveis","Apenas radar, especialmente à noite","VHF canal 16 permanentemente"],
      correct:1,
      expl:"Regra 5: Todo navio deve manter em todo momento uma vigilância visual e auditiva adequada, usando TODOS os meios disponíveis (radar, AIS...). É a regra mais fundamental do COLREG." },
    { q:"O Navio B vê a luz VERMELHA do Navio A a seu estibordo (direita). Quem deve ceder?",
      opts:["O Navio A — é menor","O Navio B — vê a luz vermelha a estibordo","Ambos devem manobrар juntos","O mais rápido"],
      correct:1,
      expl:"Regra 15 — Cruzamento: Quando um navio vê o outro pelo seu bordo de estibordo, deve ceder a passagem. Ver luz VERMELHA a estibordo = obrigação de ceder. Regra mnemônica: Vermelho a estibordo = PERIGO = eu me afasto." },
    { q:"Um navio ultrapassa outro pela popa (Regra 13). Quem tem prioridade?",
      opts:["O navio que ultrapassa — é mais rápido","O navio ultrapassado — é o navio privilegiado","Ambos têm igual prioridade","O de maior tonelagem"],
      correct:1,
      expl:"Regra 13: O navio que ultrapassa DEVE afastar-se do navio ultrapassado. O navio ultrapassado é PRIVILEGIADO — mantém rumo e velocidade. Aplica-se independentemente da velocidade ou tamanho." },
    { q:"Pela Regra 2, um marinheiro pode desviar-se do COLREG quando:",
      opts:["Seu navio é maior","Para evitar perigo imediato — prevalece o bom senso","O capitão ordena","Seu pavilhão nacional permite"],
      correct:1,
      expl:"Regra 2 — Responsabilidade: Nada isentará qualquer navio das consequências de negligenciar as práticas ordinárias do marinheiro. Em perigo imediato, prevalece a boa prática marinheira." },
  ],
};

// ══════════════════════════════════════════════
//  SVG SCHEMAS ANIMÉS
// ══════════════════════════════════════════════

// Helper: Draw a ship at position and angle
function ShipShape({ x, y, angle, color, size=1, showLights=false, side="" }) {
  const s = size;
  const rad = angle * Math.PI / 180;

  // Ship body points (facing up = 0°)
  const points = [
    [0, -16*s],   // bow
    [6*s, -8*s],  // bow right
    [7*s, 8*s],   // mid right
    [5*s, 16*s],  // stern right
    [-5*s, 16*s], // stern left
    [-7*s, 8*s],  // mid left
    [-6*s, -8*s], // bow left
  ].map(([px, py]) => {
    const rx = px * Math.cos(rad) - py * Math.sin(rad);
    const ry = px * Math.sin(rad) + py * Math.cos(rad);
    return [x + rx, y + ry];
  });

  const ptStr = points.map(p => p.join(",")).join(" ");

  // Light positions
  const lightX = x + (7*s+6) * Math.cos(rad - Math.PI/2);
  const lightY = y + (7*s+6) * Math.sin(rad - Math.PI/2);
  const lightX2 = x + (7*s+6) * Math.cos(rad + Math.PI/2);
  const lightY2 = y + (7*s+6) * Math.sin(rad + Math.PI/2);

  return (
    <g>
      <polygon points={ptStr} fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Mast dot */}
      <circle cx={x} cy={y} r={2*s} fill="white" opacity="0.6"/>
      {/* Navigation lights */}
      {showLights && (
        <>
          <circle cx={lightX} cy={lightY} r={4} fill={C.green} opacity="0.9"/>
          <circle cx={lightX2} cy={lightY2} r={4} fill={C.red} opacity="0.9"/>
        </>
      )}
    </g>
  );
}

// ── RULE 14 — Head-on ────────────────────────
function Rule14Schema({ t, lang }) {
  const [step, setStep] = useState(0); // 0=initial 1=approaching 2=correct 3=wrong
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const animate = (type) => {
    if (animating) return;
    setAnimating(true);
    setStep(1);
    timerRef.current = setTimeout(() => {
      setStep(type === "correct" ? 2 : 3);
      setAnimating(false);
    }, 1200);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const reset = () => { setStep(0); setAnimating(false); };

  // Ship positions based on step
  const shipA = {
    x: step === 0 ? 80  : step === 1 ? 110 : step === 2 ? 130 : 140,
    y: step === 2 ? 100 : step === 3 ? 110 : 120,
    angle: step === 2 ? 45 : step === 3 ? 0 : 90,
  };
  const shipB = {
    x: step === 0 ? 220 : step === 1 ? 190 : step === 2 ? 170 : 160,
    y: step === 2 ? 140 : step === 3 ? 130 : 120,
    angle: step === 2 ? 225 : step === 3 ? 180 : 270,
  };

  const statusColor = step === 0 ? C.muted : step === 1 ? C.orange : step === 2 ? C.green : C.red;
  const statusText = {
    0: lang === "fr" ? "Situation initiale — routes opposées" : lang === "es" ? "Situación inicial — rumbos opuestos" : lang === "pt" ? "Situação inicial — rumos opostos" : "Initial situation — opposite courses",
    1: lang === "fr" ? "⚠️ Rapprochement — risque d'abordage !" : lang === "es" ? "⚠️ Aproximación — ¡riesgo de abordaje!" : lang === "pt" ? "⚠️ Aproximação — risco de abalroamento!" : "⚠️ Approaching — collision risk!",
    2: lang === "fr" ? "✅ Correct — les deux virent à TRIBORD" : lang === "es" ? "✅ Correcto — ambos viran a ESTRIBOR" : lang === "pt" ? "✅ Correto — ambos viram a ESTIBORDO" : "✅ Correct — both turn STARBOARD",
    3: lang === "fr" ? "💥 COLLISION — manœuvre incorrecte !" : lang === "es" ? "💥 COLISIÓN — ¡maniobra incorrecta!" : lang === "pt" ? "💥 COLISÃO — manobra incorreta!" : "💥 COLLISION — wrong maneuver!",
  }[step];

  return (
    <div>
      <svg width="300" height="240" viewBox="0 0 300 240">
        {/* Ocean */}
        <rect width="300" height="240" fill="#0a1628"/>
        {/* Wave lines */}
        {[40,80,120,160,200].map(y => (
          <path key={y} d={`M0,${y} Q75,${y-5} 150,${y} Q225,${y+5} 300,${y}`}
            stroke="rgba(77,166,255,0.08)" strokeWidth="1" fill="none"/>
        ))}

        {/* Center collision zone */}
        {step === 1 && (
          <circle cx="150" cy="120" r="25"
            fill="rgba(192,57,43,0.2)" stroke={C.red}
            strokeWidth="1.5" strokeDasharray="4,3">
            <animate attributeName="r" values="20;30;20" dur="0.8s" repeatCount="indefinite"/>
          </circle>
        )}

        {/* Arrows showing routes */}
        {step === 0 && (
          <>
            <line x1="95" y1="120" x2="200" y2="120"
              stroke={C.gold2} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
            <polygon points="200,115 210,120 200,125" fill={C.gold2} opacity="0.5"/>
            <polygon points="95,115 85,120 95,125" fill={C.gold2} opacity="0.5"/>
          </>
        )}

        {/* Turn arrows for correct */}
        {step === 2 && (
          <>
            {/* A turns right */}
            <path d="M 115,130 Q 130,160 155,155"
              stroke={C.green} strokeWidth="2" fill="none" strokeDasharray="4,2"/>
            <polygon points="155,148 162,157 153,162" fill={C.green}/>
            {/* B turns right */}
            <path d="M 185,110 Q 170,80 145,85"
              stroke={C.green} strokeWidth="2" fill="none" strokeDasharray="4,2"/>
            <polygon points="145,92 138,83 147,78" fill={C.green}/>
          </>
        )}

        {/* Collision for wrong */}
        {step === 3 && (
          <g>
            <circle cx="150" cy="120" r="30"
              fill="rgba(192,57,43,0.35)" stroke={C.red} strokeWidth="2"/>
            <text x="150" y="116" textAnchor="middle" fontSize="18">💥</text>
            <text x="150" y="134" textAnchor="middle" fontSize="8"
              fill={C.red} fontWeight="bold">COLLISION</text>
          </g>
        )}

        {/* Ships */}
        <ShipShape {...shipA} color={C.blue2} showLights size={0.9}/>
        <ShipShape {...shipB} color={C.orange} showLights size={0.9}/>

        {/* Labels */}
        <text x={shipA.x} y={shipA.y + 28} textAnchor="middle"
          fontSize="9" fill={C.blue2} fontWeight="bold">
          {t.shipA}
        </text>
        <text x={shipB.x} y={shipB.y + 28} textAnchor="middle"
          fontSize="9" fill={C.orange} fontWeight="bold">
          {t.shipB}
        </text>

        {/* Light indicators when initial */}
        {step === 0 && (
          <>
            <circle cx="60" cy="30" r="5" fill={C.green}/>
            <text x="70" y="35" fontSize="7" fill={C.green}>
              {lang==="fr"?"Feu vert→":lang==="es"?"Luz verde→":lang==="pt"?"Luz verde→":"Green→"}
            </text>
            <circle cx="240" cy="30" r="5" fill={C.red}/>
            <text x="202" y="35" fontSize="7" fill={C.red}>
              {lang==="fr"?"←Feu rouge":lang==="es"?"←Luz roja":lang==="pt"?"←Luz verm.":"←Red"}
            </text>
            <text x="150" y="22" textAnchor="middle" fontSize="7"
              fill={C.gold2}>
              {lang==="fr"?"Les deux voient rouge + vert = Rule 14"
               :lang==="es"?"Ambos ven rojo + verde = Regla 14"
               :lang==="pt"?"Ambos veem verm + verde = Regra 14"
               :"Both see red + green = Rule 14"}
            </text>
          </>
        )}

        {/* Status bar */}
        <rect x="0" y="210" width="300" height="30"
          fill="rgba(0,0,0,0.4)"/>
        <text x="150" y="229" textAnchor="middle" fontSize="9"
          fill={statusColor} fontWeight="bold">{statusText}</text>
      </svg>

      {/* Controls */}
      <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginTop:8 }}>
        {step > 0 && (
          <button onClick={reset} style={{
            padding:"7px 12px", borderRadius:10, fontSize:10,
            background:"rgba(255,255,255,0.08)",
            border:"1px solid rgba(255,255,255,0.15)",
            color:C.white, cursor:"pointer",
          }}>{t.btnReset}</button>
        )}
        {step === 0 && (
          <>
            <button onClick={() => animate("correct")} style={{
              padding:"7px 14px", borderRadius:10, fontSize:10,
              background:"rgba(30,138,74,0.2)",
              border:`1px solid ${C.green}44`, color:C.green,
              cursor:"pointer", fontWeight:700,
            }}>{t.btnCorrect}</button>
            <button onClick={() => animate("wrong")} style={{
              padding:"7px 14px", borderRadius:10, fontSize:10,
              background:"rgba(192,57,43,0.15)",
              border:`1px solid ${C.red}44`, color:C.red,
              cursor:"pointer", fontWeight:700,
            }}>{t.btnWrong}</button>
          </>
        )}
      </div>

      {/* Rule summary */}
      <div style={{
        marginTop:10, padding:"10px 12px", borderRadius:12,
        background:`linear-gradient(135deg,rgba(26,111,212,0.12),rgba(13,31,60,0.6))`,
        border:`1px solid ${C.blue2}33`, fontSize:12, color:C.white,
        lineHeight:1.6,
      }}>
        {lang==="fr"
          ?"📌 Rule 14 : Les deux navires voient rouge ET vert → les deux virent à TRIBORD → ils passent bâbord à bâbord."
          :lang==="es"
          ?"📌 Regla 14 : Ambos ven rojo Y verde → ambos viran a ESTRIBOR → pasan babor con babor."
          :lang==="pt"
          ?"📌 Regra 14 : Ambos veem vermelho E verde → ambos viram a ESTIBORDO → passam bombordo com bombordo."
          :"📌 Rule 14: Both vessels see red AND green → both turn STARBOARD → they pass port to port."}
      </div>
    </div>
  );
}

// ── RULE 15 — Crossing ───────────────────────
function Rule15Schema({ t, lang }) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const animate = (type) => {
    if (animating) return;
    setAnimating(true);
    setStep(1);
    timerRef.current = setTimeout(() => {
      setStep(type === "correct" ? 2 : 3);
      setAnimating(false);
    }, 1200);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const reset = () => { setStep(0); setAnimating(false); };

  // Vessel A goes right (90°), Vessel B comes from right going left+down (225°)
  // B sees A's red light on starboard → B must give way
  const shipA = {
    x: step === 0 ? 70  : step === 1 ? 100 : step === 2 ? 120 : 130,
    y: step === 0 ? 120 : step === 1 ? 120 : step === 2 ? 120 : 120,
    angle: 90, // going right
  };
  const shipB = {
    x: step === 0 ? 220 : step === 1 ? 195 : step === 2 ? 185 : 160,
    y: step === 0 ? 60  : step === 1 ? 90  : step === 2 ? 130 : 120,
    angle: step === 2 ? 270 : 200,
  };

  const statusColor = step===0?C.muted:step===1?C.orange:step===2?C.green:C.red;
  const statusText = {
    0: lang==="fr"?"Navire B voit le feu ROUGE de A à tribord":lang==="es"?"Buque B ve la luz ROJA de A a estribor":lang==="pt"?"Navio B vê luz VERMELHA de A a estibordo":"Vessel B sees A's RED light on starboard",
    1: lang==="fr"?"⚠️ Risque d'abordage — B doit céder !":lang==="es"?"⚠️ Riesgo de abordaje — ¡B debe ceder!":lang==="pt"?"⚠️ Risco de abalroamento — B deve ceder!":"⚠️ Collision risk — B must give way!",
    2: lang==="fr"?"✅ B ralentit et passe derrière A":lang==="es"?"✅ B frena y pasa detrás de A":"✅ B slows and passes astern of A",
    3: lang==="fr"?"💥 COLLISION — B n'a pas cédé !":lang==="es"?"💥 COLISIÓN — ¡B no cedió!":lang==="pt"?"💥 COLISÃO — B não cedeu!":"💥 COLLISION — B didn't give way!",
  }[step];

  return (
    <div>
      <svg width="300" height="240" viewBox="0 0 300 240">
        <rect width="300" height="240" fill="#0a1628"/>
        {[40,80,120,160,200].map(y=>(
          <path key={y} d={`M0,${y} Q75,${y-5} 150,${y} Q225,${y+5} 300,${y}`}
            stroke="rgba(77,166,255,0.08)" strokeWidth="1" fill="none"/>
        ))}

        {/* Crossing lines */}
        {step===0&&(
          <>
            {/* A's route → right */}
            <line x1="70" y1="120" x2="250" y2="120"
              stroke={C.blue2} strokeWidth="1" strokeDasharray="5,3" opacity="0.4"/>
            <polygon points="250,116 258,120 250,124" fill={C.blue2} opacity="0.4"/>
            {/* B's route ↙ */}
            <line x1="220" y1="60" x2="130" y2="150"
              stroke={C.orange} strokeWidth="1" strokeDasharray="5,3" opacity="0.4"/>
            <polygon points="133,147 123,155 128,143" fill={C.orange} opacity="0.4"/>
          </>
        )}

        {/* Danger zone */}
        {step===1&&(
          <circle cx="145" cy="120" r="20"
            fill="rgba(192,57,43,0.25)" stroke={C.red}
            strokeWidth="1.5" strokeDasharray="4,3">
            <animate attributeName="r" values="15;25;15" dur="0.8s" repeatCount="indefinite"/>
          </circle>
        )}

        {/* Correct: B passes astern */}
        {step===2&&(
          <path d="M 195,125 Q 190,155 175,160 Q 155,168 140,155"
            stroke={C.green} strokeWidth="2" fill="none" strokeDasharray="5,3"/>
        )}

        {/* Wrong: collision */}
        {step===3&&(
          <g>
            <circle cx="145" cy="120" r="28"
              fill="rgba(192,57,43,0.35)" stroke={C.red} strokeWidth="2"/>
            <text x="145" y="116" textAnchor="middle" fontSize="18">💥</text>
            <text x="145" y="134" textAnchor="middle" fontSize="8"
              fill={C.red} fontWeight="bold">COLLISION</text>
          </g>
        )}

        {/* Ships */}
        <ShipShape {...shipA} color={C.blue2} showLights size={0.9}/>
        <ShipShape {...shipB} color={C.orange} showLights size={0.9}/>

        {/* Labels */}
        <text x={shipA.x} y={shipA.y+28} textAnchor="middle"
          fontSize="8" fill={C.blue2} fontWeight="bold">{t.shipA}</text>
        <text x={shipB.x} y={shipB.y+28} textAnchor="middle"
          fontSize="8" fill={C.orange} fontWeight="bold">{t.shipB}</text>

        {/* Initial annotations */}
        {step===0&&(
          <>
            {/* B sees red light of A */}
            <circle cx="195" cy="58" r="6" fill={C.red} opacity="0.9"/>
            <text x="205" y="55" fontSize="7" fill={C.red}>
              {lang==="fr"?"Feu rouge de A":lang==="es"?"Luz roja de A":lang==="pt"?"Luz verm. de A":"A's red light"}
            </text>
            <text x="205" y="67" fontSize="7" fill={C.red}>
              {lang==="fr"?"visible à tribord":lang==="es"?"visible a estribor":lang==="pt"?"visível a estibordo":"visible on stbd"}
            </text>
            {/* Privilege label */}
            <rect x="30" y="95" width="60" height="28" rx="6"
              fill={`${C.blue2}22`} stroke={`${C.blue2}44`}/>
            <text x="60" y="108" textAnchor="middle" fontSize="7"
              fill={C.blue2}>
              {lang==="fr"?"PRIVILÉGIÉ":lang==="es"?"PRIVILEGIADO":lang==="pt"?"PRIVILEGIADO":"PRIVILEGED"}
            </text>
            <text x="60" y="119" textAnchor="middle" fontSize="7"
              fill={C.blue2}>
              {lang==="fr"?"maintient cap":lang==="es"?"mantiene rumbo":lang==="pt"?"mantém rumo":"holds course"}
            </text>
            {/* Giveway label */}
            <rect x="200" y="38" width="60" height="28" rx="6"
              fill={`${C.red}22`} stroke={`${C.red}44`}/>
            <text x="230" y="51" textAnchor="middle" fontSize="7"
              fill={C.red}>
              {lang==="fr"?"OBLIGÉ":lang==="es"?"CEDENTE":lang==="pt"?"CEDENTE":"GIVE-WAY"}
            </text>
            <text x="230" y="62" textAnchor="middle" fontSize="7"
              fill={C.red}>
              {lang==="fr"?"doit céder":lang==="es"?"debe ceder":lang==="pt"?"deve ceder":"must give way"}
            </text>
          </>
        )}

        <rect x="0" y="210" width="300" height="30" fill="rgba(0,0,0,0.4)"/>
        <text x="150" y="229" textAnchor="middle" fontSize="8"
          fill={statusColor} fontWeight="bold">{statusText}</text>
      </svg>

      <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginTop:8 }}>
        {step>0 && (
          <button onClick={reset} style={{padding:"7px 12px",borderRadius:10,fontSize:10,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:C.white,cursor:"pointer"}}>{t.btnReset}</button>
        )}
        {step===0&&(
          <>
            <button onClick={()=>animate("correct")} style={{padding:"7px 14px",borderRadius:10,fontSize:10,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,cursor:"pointer",fontWeight:700}}>{t.btnCorrect}</button>
            <button onClick={()=>animate("wrong")} style={{padding:"7px 14px",borderRadius:10,fontSize:10,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,color:C.red,cursor:"pointer",fontWeight:700}}>{t.btnWrong}</button>
          </>
        )}
      </div>

      <div style={{marginTop:10,padding:"10px 12px",borderRadius:12,background:`linear-gradient(135deg,rgba(230,126,34,0.12),rgba(13,31,60,0.6))`,border:`1px solid ${C.orange}33`,fontSize:12,color:C.white,lineHeight:1.6}}>
        {lang==="fr"
          ?"📌 Rule 15 : Tu vois le feu ROUGE d'un navire à TRIBORD → tu es le navire OBLIGÉ → tu dois t'écarter. Moyen mémo : Rouge à tribord = DANGER = je cède."
          :lang==="es"
          ?"📌 Regla 15 : Ves luz ROJA de un buque a ESTRIBOR → eres el buque CEDENTE → debes apartarte. Regla: Rojo a estribor = PELIGRO = cedo."
          :lang==="pt"
          ?"📌 Regra 15 : Vê luz VERMELHA de um navio a ESTIBORDO → você é o navio CEDENTE → deve afastar-se. Regra: Vermelho a estibordo = PERIGO = cedo."
          :"📌 Rule 15: You see RED light of a vessel on STARBOARD → you are the give-way vessel → you must keep clear. Rule: Red on starboard = DANGER = I give way."}
      </div>
    </div>
  );
}

// ── RULE 13 — Overtaking ─────────────────────
function Rule13Schema({ t, lang }) {
  const [play, setPlay] = useState(false);
  const [pos, setPos] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (play) {
      timerRef.current = setInterval(() => {
        setPos(p => {
          if (p >= 100) { setPlay(false); return 100; }
          return p + 1.5;
        });
      }, 30);
    }
    return () => clearInterval(timerRef.current);
  }, [play]);

  const resetAnim = () => { setPlay(false); setPos(0); };

  const aX = 30 + pos * 0.8;
  const bX = 80 + pos * 0.4;
  const sternZone = pos > 10 && pos < 60;

  return (
    <div>
      <svg width="300" height="180" viewBox="0 0 300 180">
        <rect width="300" height="180" fill="#0a1628"/>
        {[40,80,120,150].map(y=>(
          <path key={y} d={`M0,${y} Q75,${y-4} 150,${y} Q225,${y+4} 300,${y}`}
            stroke="rgba(77,166,255,0.08)" strokeWidth="1" fill="none"/>
        ))}

        {/* 135° stern arc for overtaking zone */}
        {sternZone && (
          <g>
            <path
              d={`M ${bX} 90 L ${bX-30} 115 A 35 35 0 0 0 ${bX-30} 65 Z`}
              fill="rgba(201,146,42,0.1)" stroke={C.gold2}
              strokeWidth="0.5" strokeDasharray="3,2"/>
            <text x={bX-45} y="92" fontSize="7" fill={C.gold2} textAnchor="middle">
              {lang==="fr"?"Zone de":lang==="es"?"Zona de":lang==="pt"?"Zona de":"Overtaking"}
            </text>
            <text x={bX-45} y="102" fontSize="7" fill={C.gold2} textAnchor="middle">
              {lang==="fr"?"rattrapage":lang==="es"?"alcance":lang==="pt"?"ultrapassagem":"zone"}
            </text>
          </g>
        )}

        {/* Ship B (being overtaken) */}
        <ShipShape x={bX} y={90} angle={90} color={C.blue2} showLights size={0.9}/>
        <text x={bX} y={118} textAnchor="middle" fontSize="8"
          fill={C.blue2} fontWeight="bold">{t.shipB}</text>
        {pos < 20 && (
          <text x={bX} y={128} textAnchor="middle" fontSize="7" fill={C.muted}>
            {lang==="fr"?"(privilégié)":lang==="es"?"(privilegiado)":lang==="pt"?"(privilegiado)":"(privileged)"}
          </text>
        )}

        {/* Ship A (overtaking) */}
        <ShipShape x={aX} y={90} angle={90} color={C.orange} showLights size={0.9}/>
        <text x={aX} y={118} textAnchor="middle" fontSize="8"
          fill={C.orange} fontWeight="bold">{t.shipA}</text>
        {pos < 20 && (
          <text x={aX} y={128} textAnchor="middle" fontSize="7" fill={C.muted}>
            {lang==="fr"?"(rattrape)":lang==="es"?"(alcanza)":lang==="pt"?"(ultrapassa)":"(overtaking)"}
          </text>
        )}

        {/* Speed indicator */}
        <text x="150" y="20" textAnchor="middle" fontSize="8" fill={C.orange}>
          {lang==="fr"?"Navire A plus rapide →":lang==="es"?"Buque A más rápido →":lang==="pt"?"Navio A mais rápido →":"Vessel A faster →"}
        </text>

        {/* Completion */}
        {pos >= 95 && (
          <g>
            <rect x="60" y="50" width="180" height="40" rx="8"
              fill="rgba(30,138,74,0.25)" stroke={C.green} strokeWidth="1"/>
            <text x="150" y="68" textAnchor="middle" fontSize="9"
              fill={C.green} fontWeight="bold">
              {lang==="fr"?"✅ A a dépassé en s'écartant de B"
               :lang==="es"?"✅ A adelantó apartándose de B"
               :lang==="pt"?"✅ A ultrapassou afastando-se de B"
               :"✅ A overtook keeping clear of B"}
            </text>
            <text x="150" y="82" textAnchor="middle" fontSize="8"
              fill={C.green}>
              {lang==="fr"?"B maintenu son cap ✓"
               :lang==="es"?"B mantuvo su rumbo ✓"
               :lang==="pt"?"B manteve seu rumo ✓"
               :"B held course ✓"}
            </text>
          </g>
        )}

        <rect x="0" y="155" width="300" height="25" fill="rgba(0,0,0,0.4)"/>
        <text x="150" y="171" textAnchor="middle" fontSize="8"
          fill={C.gold2}>
          {lang==="fr"?"Rule 13 — Le navire qui rattrape doit s'écarter en permanence"
           :lang==="es"?"Regla 13 — El buque que alcanza debe mantenerse apartado"
           :lang==="pt"?"Regra 13 — O navio que ultrapassa deve manter-se afastado"
           :"Rule 13 — Overtaking vessel must at all times keep clear"}
        </text>
      </svg>

      <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:8 }}>
        {pos > 0 ? (
          <button onClick={resetAnim} style={{padding:"7px 14px",borderRadius:10,fontSize:10,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:C.white,cursor:"pointer"}}>{t.btnReset}</button>
        ) : (
          <button onClick={() => setPlay(true)} style={{padding:"7px 14px",borderRadius:10,fontSize:10,background:"rgba(77,166,255,0.2)",border:`1px solid ${C.blue2}44`,color:C.blue2,cursor:"pointer",fontWeight:700}}>{t.btnPlay}</button>
        )}
      </div>
    </div>
  );
}

// ── RULES SUMMARY TABLE ───────────────────────
function RulesTable({ lang }) {
  const rules = [
    { num:"1-3", color:C.blue2,
      title:{fr:"Application & Définitions",en:"Application & Definitions",es:"Aplicación & Definiciones",pt:"Aplicação & Definições"},
      key:{fr:"S'applique à TOUS les navires sur TOUTES les eaux",en:"Applies to ALL vessels on ALL waters",es:"Se aplica a TODOS los buques en TODAS las aguas",pt:"Aplica-se a TODOS os navios em TODAS as águas"}},
    { num:"2", color:C.orange,
      title:{fr:"Responsabilité",en:"Responsibility",es:"Responsabilidad",pt:"Responsabilidade"},
      key:{fr:"Le bon sens marin prime toujours sur les règles",en:"Good seamanship always prevails over rules",es:"El buen sentido marinero siempre prevalece",pt:"O bom senso marinheiro sempre prevalece"}},
    { num:"5", color:C.red,
      title:{fr:"Veille permanente",en:"Lookout",es:"Vigilancia",pt:"Vigilância"},
      key:{fr:"Vue + ouïe + TOUS les moyens disponibles",en:"Sight + hearing + ALL available means",es:"Vista + oído + TODOS los medios disponibles",pt:"Vista + audição + TODOS os meios disponíveis"}},
    { num:"6", color:C.gold,
      title:{fr:"Vitesse de sécurité",en:"Safe speed",es:"Velocidad de seguridad",pt:"Velocidade segura"},
      key:{fr:"Permettre d'arrêter avant tout obstacle",en:"Allow stopping before any obstacle",es:"Permitir detenerse antes de cualquier obstáculo",pt:"Permitir parar antes de qualquer obstáculo"}},
    { num:"7", color:C.teal,
      title:{fr:"Risque d'abordage",en:"Risk of collision",es:"Riesgo de abordaje",pt:"Risco de abalroamento"},
      key:{fr:"Relèvement constant + radar + doute = il existe",en:"Constant bearing + radar + doubt = risk exists",es:"Marcación constante + radar + duda = existe",pt:"Marcação constante + radar + dúvida = existe"}},
    { num:"8", color:C.purple||"#8e44ad",
      title:{fr:"Manœuvre d'évitement",en:"Action to avoid collision",es:"Maniobra de evitación",pt:"Manobra de evitação"},
      key:{fr:"Franche, ample, tôt → résultat visible",en:"Frank, large, early → clearly visible result",es:"Franca, amplia, temprana → resultado visible",pt:"Franca, ampla, cedo → resultado visível"}},
    { num:"13", color:C.blue,
      title:{fr:"Navire qui rattrape",en:"Overtaking vessel",es:"Buque que alcanza",pt:"Navio que ultrapassa"},
      key:{fr:"Toujours obligé — quelle que soit sa taille",en:"Always give-way — regardless of size",es:"Siempre cedente — sea cual sea su tamaño",pt:"Sempre cedente — independente do tamanho"}},
    { num:"14", color:C.orange,
      title:{fr:"Bout au bout",en:"Head-on",es:"Proa con proa",pt:"Proa com proa"},
      key:{fr:"Les DEUX virent à tribord → passent bâbord/bâbord",en:"BOTH turn starboard → pass port to port",es:"AMBOS viran a estribor → pasan babor/babor",pt:"AMBOS viram a estibordo → passam bordo/bordo"}},
    { num:"15", color:C.red,
      title:{fr:"Routes croisées",en:"Crossing",es:"Cruce",pt:"Cruzamento"},
      key:{fr:"Rouge à tribord = obligé de céder",en:"Red on starboard = give-way vessel",es:"Rojo a estribor = buque cedente",pt:"Vermelho a estibordo = navio cedente"}},
    { num:"16", color:C.green,
      title:{fr:"Navire obligé",en:"Give-way vessel",es:"Buque cedente",pt:"Navio cedente"},
      key:{fr:"Manœuvre large, franche, tôt",en:"Maneuver widely, frankly, early",es:"Maniobra amplia, franca, a tiempo",pt:"Manobrар amplamente, francamente, cedo"}},
    { num:"17", color:C.teal,
      title:{fr:"Navire privilégié",en:"Stand-on vessel",es:"Buque privilegiado",pt:"Navio privilegiado"},
      key:{fr:"Maintient cap+vitesse → peut agir si collision imminente",en:"Holds course+speed → may act if collision imminent",es:"Mantiene rumbo+velocidad → puede actuar si inminente",pt:"Mantém rumo+velocidade → pode agir se iminente"}},
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {rules.map((r,i) => (
        <div key={i} style={{
          display:"flex", gap:10, alignItems:"flex-start",
          padding:"8px 10px", borderRadius:10,
          background:"rgba(255,255,255,0.04)",
          border:`1px solid ${r.color}22`,
        }}>
          <div style={{
            minWidth:28, height:28, borderRadius:8, flexShrink:0,
            background:`${r.color}22`, border:`1px solid ${r.color}44`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:700,
            color:r.color,
          }}>{r.num}</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:r.color, marginBottom:2 }}>
              {r.title[lang]||r.title.fr}
            </div>
            <div style={{ fontSize:11, color:C.muted, lineHeight:1.4 }}>
              {r.key[lang]||r.key.fr}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
//  LESSON CONTENT
// ══════════════════════════════════════════════
const SECTIONS = {
  fr:[
    { type:"badge", text:"🛟 Sécurité Maritime — COLREG · Leçon 1/6 · 🆓 Gratuit · ⭐ 150 XP" },
    { type:"title", text:"COLREG — Règles de collision en mer" },
    { type:"intro",
      text:"Chaque année, des centaines de collisions en mer font des morts, des blessés et causent des dégâts environnementaux catastrophiques.\n\nLa grande majorité aurait pu être évitée en respectant une seule chose : le COLREG.\n\nCette leçon te donne les règles essentielles qui sauvent des vies." },
    { type:"keypoint", icon:"⚓", title:"Qu'est-ce que le COLREG ?",
      text:"COLREG = Convention on the International Regulations for Preventing Collisions at Sea\n\nAdopté par l'IMO en 1972, entré en vigueur le 15 juillet 1977.\n\n38 règles organisées en 5 parties + 4 Annexes.\n\nS'applique à TOUS les navires sur TOUTES les eaux maritimes du monde — sans exception." },
    { type:"rules_table" },
    { type:"section_title", icon:"📐", text:"SCHEMAS INTERACTIFS" },
    { type:"rule14_schema" },
    { type:"content", icon:"🚢", title:"Rule 14 — Comment reconnaître la situation bout au bout",
      text:"Tu es en situation bout au bout (head-on) si :\n✅ Tu vois le feu ROUGE ET le feu VERT de l'autre navire simultanément\n✅ Le navire vient droit sur toi (relèvement quasi constant)\n\nRègle : LES DEUX navires virent à TRIBORD → ils se croisent bâbord à bâbord.\n\n⚠️ Jamais virer à bâbord dans cette situation — vous vous retrouveriez face à face encore plus directement !\n\nSi tu doutes que tu es en situation Rule 14 : assume que oui et vire à tribord." },
    { type:"rule15_schema" },
    { type:"content", icon:"🎯", title:"Rule 15 — Le moyen mnémotechnique infaillible",
      text:"ROUGE À TRIBORD = JE CÈDE\n\nSi tu vois le feu ROUGE d'un autre navire sur ton côté TRIBORD (droite) :\n→ Tu es le navire OBLIGÉ\n→ Tu DOIS t'écarter\n→ Tu viRes généralement à tribord ou tu réduis la vitesse\n\nSi tu vois le feu VERT d'un autre navire sur ton tribord :\n→ Tu es le navire PRIVILÉGIÉ\n→ Tu MAINTIENS ton cap et ta vitesse\n→ Tu surveilles si l'autre manœuvre bien\n\n💡 Pensez au sens de la circulation routière : en mer aussi, on se croise à droite." },
    { type:"rule13_schema" },
    { type:"content", icon:"⚓", title:"Rule 13 — Rattrapage : qui que tu sois, tu cèdes",
      text:"Un navire est considéré en train d'en rattraper un autre quand il s'approche dans un secteur de 135° à l'arrière du navire rattrapé.\n\nDans ce secteur, la nuit : tu ne vois NI le feu rouge NI le feu vert du navire devant toi — seulement son feu de poupe BLANC.\n\nRègle absolue : Celui qui rattrape TOUJOURS cède.\n• Peu importe ta taille\n• Peu importe ta vitesse\n• Peu importe ton pavillon\n\nLe navire rattrapé est NAVIRE PRIVILÉGIÉ — il maintient cap et vitesse et ne doit pas manœuvrer (sauf danger imminent)." },
    { type:"keypoint", icon:"⚡", title:"Rule 8 — La manœuvre parfaite",
      text:"Quand tu dois manœuvrer pour éviter un abordage, ta manœuvre doit être :\n\n1️⃣ FRANCHE — Clairement visible par l'autre navire. Pas de petites corrections de quelques degrés.\n\n2️⃣ AMPLE — Suffisamment grande pour créer une distance de sécurité réelle.\n\n3️⃣ TÔT — Assez tôt pour que l'autre navire voit ta manœuvre et ne manœuvre pas lui-même, créant une confusion.\n\n4️⃣ RÉSULTAT — La manœuvre doit créer une distance de passage suffisante." },
    { type:"summary",
      title:"RÉSUMÉ — COLREG Leçon 1",
      points:[
        "38 règles · Adopté 1972 · Valable mondialement",
        "Rule 5 : Veille permanente — vue + ouïe + tous les moyens",
        "Rule 6 : Vitesse de sécurité — pouvoir s'arrêter à temps",
        "Rule 13 : Navire qui rattrape → TOUJOURS obligé de céder",
        "Rule 14 : Bout au bout → LES DEUX virent à TRIBORD",
        "Rule 15 : Rouge à tribord → OBLIGÉ de céder",
        "Rule 16 : Navire obligé → manœuvre franche, ample, tôt",
        "Rule 17 : Navire privilégié → maintient cap et vitesse",
      ]
    },
  ],
  en:[
    { type:"badge", text:"🛟 Maritime Safety — COLREG · Lesson 1/6 · 🆓 Free · ⭐ 150 XP" },
    { type:"title", text:"COLREG — Collision Regulations at Sea" },
    { type:"intro",
      text:"Every year, hundreds of collisions at sea cause deaths, injuries and catastrophic environmental damage.\n\nThe vast majority could have been avoided by respecting one thing: COLREG.\n\nThis lesson gives you the essential rules that save lives." },
    { type:"keypoint", icon:"⚓", title:"What is COLREG?",
      text:"COLREG = Convention on the International Regulations for Preventing Collisions at Sea\n\nAdopted by IMO in 1972, entered into force 15 July 1977.\n\n38 rules organized in 5 parts + 4 Annexes.\n\nApplies to ALL vessels on ALL maritime waters worldwide — without exception." },
    { type:"rules_table" },
    { type:"section_title", icon:"📐", text:"INTERACTIVE DIAGRAMS" },
    { type:"rule14_schema" },
    { type:"content", icon:"🚢", title:"Rule 14 — How to recognize a head-on situation",
      text:"You are in a head-on situation if:\n✅ You see BOTH the RED and GREEN lights simultaneously\n✅ The vessel is coming straight at you (nearly constant bearing)\n\nRule: BOTH vessels alter course to STARBOARD → they pass port to port.\n\n⚠️ Never turn to port in this situation — you'd be facing each other more directly!\n\nIf in doubt whether Rule 14 applies: assume yes and turn starboard." },
    { type:"rule15_schema" },
    { type:"content", icon:"🎯", title:"Rule 15 — The infallible memory aid",
      text:"RED ON STARBOARD = I GIVE WAY\n\nIf you see another vessel's RED light on your STARBOARD (right) side:\n→ You are the GIVE-WAY vessel\n→ You MUST keep clear\n→ You generally turn to starboard or reduce speed\n\nIf you see another vessel's GREEN light on your starboard:\n→ You are the STAND-ON vessel\n→ You HOLD your course and speed\n→ Watch to see if the other vessel maneuvers properly\n\n💡 Think of road traffic: at sea, we also pass on the right." },
    { type:"rule13_schema" },
    { type:"content", icon:"⚓", title:"Rule 13 — Overtaking: whoever you are, you give way",
      text:"A vessel is overtaking another when it approaches within a sector of 135° of the other vessel's stern.\n\nAt night in this sector: you see NEITHER the red NOR the green light — only the WHITE stern light.\n\nAbsolute rule: The overtaking vessel ALWAYS gives way.\n• Regardless of size\n• Regardless of speed\n• Regardless of flag\n\nThe overtaken vessel is PRIVILEGED — holds course and speed." },
    { type:"keypoint", icon:"⚡", title:"Rule 8 — The perfect maneuver",
      text:"When you must maneuver to avoid collision, your action must be:\n\n1️⃣ POSITIVE — Clearly visible to the other vessel. Not small corrections of a few degrees.\n\n2️⃣ LARGE — Large enough to create real safety distance.\n\n3️⃣ EARLY — Early enough that the other vessel sees your maneuver.\n\n4️⃣ RESULT — The maneuver must create sufficient passing distance." },
    { type:"summary",
      title:"SUMMARY — COLREG Lesson 1",
      points:[
        "38 rules · Adopted 1972 · Valid worldwide",
        "Rule 5: Lookout — sight + hearing + all means",
        "Rule 6: Safe speed — able to stop in time",
        "Rule 13: Overtaking → ALWAYS give way",
        "Rule 14: Head-on → BOTH turn STARBOARD",
        "Rule 15: Red on starboard → GIVE WAY",
        "Rule 16: Give-way vessel → positive, large, early action",
        "Rule 17: Stand-on vessel → hold course and speed",
      ]
    },
  ],
  es:[
    { type:"badge", text:"🛟 Seguridad Marítima — COLREG · Lección 1/6 · 🆓 Gratis · ⭐ 150 XP" },
    { type:"title", text:"COLREG — Reglamento de abordajes en el mar" },
    { type:"intro",
      text:"Cada año, cientos de colisiones marítimas causan muertes, heridos y daños ambientales catastróficos.\n\nLa gran mayoría podría haberse evitado respetando una sola cosa: el COLREG.\n\nEsta lección te da las reglas esenciales que salvan vidas." },
    { type:"keypoint", icon:"⚓", title:"¿Qué es el COLREG?",
      text:"COLREG = Convenio sobre el Reglamento Internacional para Prevenir los Abordajes en el Mar\n\nAdoptado por la OMI en 1972, entró en vigor el 15 de julio de 1977.\n\n38 reglas organizadas en 5 partes + 4 Anexos.\n\nSe aplica a TODOS los buques en TODAS las aguas marítimas del mundo — sin excepción." },
    { type:"rules_table" },
    { type:"section_title", icon:"📐", text:"ESQUEMAS INTERACTIVOS" },
    { type:"rule14_schema" },
    { type:"content", icon:"🚢", title:"Regla 14 — Cómo reconocer la situación de proa",
      text:"Estás en situación de proa si:\n✅ Ves la luz ROJA Y la luz VERDE simultáneamente\n✅ El buque viene directo hacia ti (marcación casi constante)\n\nRegla: AMBOS buques viran a ESTRIBOR → pasan babor con babor.\n\n⚠️ ¡Nunca virar a babor en esta situación!\n\nSi dudas de que aplica la Regla 14: asume que sí y vira a estribor." },
    { type:"rule15_schema" },
    { type:"content", icon:"🎯", title:"Regla 15 — El truco mnemotécnico infalible",
      text:"ROJO A ESTRIBOR = YO CEDO\n\nSi ves la luz ROJA de otro buque a tu ESTRIBOR (derecha):\n→ Eres el buque CEDENTE\n→ DEBES apartarte\n→ Viras generalmente a estribor o reduces velocidad\n\nSi ves la luz VERDE a estribor:\n→ Eres el buque PRIVILEGIADO\n→ MANTIENES rumbo y velocidad" },
    { type:"rule13_schema" },
    { type:"content", icon:"⚓", title:"Regla 13 — Alcance: seas quien seas, cedes",
      text:"Un buque está alcanzando a otro cuando se aproxima en un sector de 135° por la popa del buque alcanzado.\n\nDe noche en este sector: no ves NI la luz roja NI la verde — solo la luz de popa BLANCA.\n\nRegla absoluta: El buque que alcanza SIEMPRE cede.\n• Sin importar el tamaño\n• Sin importar la velocidad\n• Sin importar el pabellón" },
    { type:"keypoint", icon:"⚡", title:"Regla 8 — La maniobra perfecta",
      text:"Cuando debes maniobrar para evitar un abordaje:\n\n1️⃣ FRANCA — Claramente visible por el otro buque.\n2️⃣ AMPLIA — Suficientemente grande para crear distancia real.\n3️⃣ A TIEMPO — Pronto para que el otro buque la vea.\n4️⃣ RESULTADO — Distancia de paso suficiente." },
    { type:"summary",
      title:"RESUMEN — COLREG Lección 1",
      points:[
        "38 reglas · Adoptado 1972 · Válido mundialmente",
        "Regla 5: Vigilancia — vista + oído + todos los medios",
        "Regla 6: Velocidad segura — poder detenerse a tiempo",
        "Regla 13: Alcance → SIEMPRE cede el que alcanza",
        "Regla 14: Proa con proa → AMBOS viran a ESTRIBOR",
        "Regla 15: Rojo a estribor → CEDE",
        "Regla 16: Buque cedente → maniobra franca, amplia, a tiempo",
        "Regla 17: Buque privilegiado → mantiene rumbo y velocidad",
      ]
    },
  ],
  pt:[
    { type:"badge", text:"🛟 Segurança Marítima — COLREG · Lição 1/6 · 🆓 Grátis · ⭐ 150 XP" },
    { type:"title", text:"COLREG — Regulamento de prevenção de abalroamentos" },
    { type:"intro",
      text:"Todo ano, centenas de colisões marítimas causam mortes, feridos e danos ambientais catastróficos.\n\nA grande maioria poderia ter sido evitada respeitando uma só coisa: o COLREG.\n\nEsta lição te dá as regras essenciais que salvam vidas." },
    { type:"keypoint", icon:"⚓", title:"O que é o COLREG?",
      text:"COLREG = Convenção sobre o Regulamento Internacional para Evitar Abalroamentos no Mar\n\nAdotado pela IMO em 1972, entrou em vigor em 15 de julho de 1977.\n\n38 regras organizadas em 5 partes + 4 Anexos.\n\nAplica-se a TODOS os navios em TODAS as águas marítimas do mundo — sem exceção." },
    { type:"rules_table" },
    { type:"section_title", icon:"📐", text:"ESQUEMAS INTERATIVOS" },
    { type:"rule14_schema" },
    { type:"content", icon:"🚢", title:"Regra 14 — Como reconhecer a situação de proa",
      text:"Você está em situação de proa se:\n✅ Vê a luz VERMELHA E a luz VERDE simultaneamente\n✅ O navio vem direto em sua direção\n\nRegra: AMBOS os navios viram a ESTIBORDO → passam bombordo com bombordo.\n\n⚠️ Nunca virar a bombordo nesta situação!" },
    { type:"rule15_schema" },
    { type:"content", icon:"🎯", title:"Regra 15 — O truque mnemônico infalível",
      text:"VERMELHO A ESTIBORDO = EU CEDO\n\nSe você vê a luz VERMELHA de outro navio a ESTIBORDO (direita):\n→ Você é o navio CEDENTE\n→ DEVE afastar-se\n\nSe vê a luz VERDE a estibordo:\n→ Você é o navio PRIVILEGIADO\n→ MANTÉM rumo e velocidade" },
    { type:"rule13_schema" },
    { type:"content", icon:"⚓", title:"Regra 13 — Ultrapassagem: seja quem for, você cede",
      text:"Um navio está ultrapassando outro quando se aproxima num setor de 135° pela popa do navio ultrapassado.\n\nÀ noite neste setor: não vê NEM a luz vermelha NEM a verde — apenas a luz de popa BRANCA.\n\nRegra absoluta: O navio que ultrapassa SEMPRE cede.\n• Independente do tamanho\n• Independente da velocidade" },
    { type:"keypoint", icon:"⚡", title:"Regra 8 — A manobra perfeita",
      text:"Ao manobrар para evitar abalroamento:\n\n1️⃣ FRANCA — Claramente visível pelo outro navio.\n2️⃣ AMPLA — Grande o suficiente para distância real.\n3️⃣ CEDO — Suficientemente cedo.\n4️⃣ RESULTADO — Distância de passagem suficiente." },
    { type:"summary",
      title:"RESUMO — COLREG Lição 1",
      points:[
        "38 regras · Adotado 1972 · Válido mundialmente",
        "Regra 5: Vigilância — vista + audição + todos os meios",
        "Regra 6: Velocidade segura — poder parar a tempo",
        "Regra 13: Ultrapassagem → SEMPRE cede quem ultrapassa",
        "Regra 14: Proa com proa → AMBOS viram a ESTIBORDO",
        "Regra 15: Vermelho a estibordo → CEDE",
        "Regra 16: Navio cedente → manobra franca, ampla, cedo",
        "Regra 17: Navio privilegiado → mantém rumo e velocidade",
      ]
    },
  ],
};

// ── Shared UI ─────────────────────────────────
function Stars(){const s=Array.from({length:20},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{left:-100%}100%{left:200%}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}

// ── Block renderer ────────────────────────────
function Block({block,lang,t}){
  switch(block.type){
    case "badge": return <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,fontSize:11,color:C.red,fontWeight:700}}>{block.text}</div>;
    case "title": return <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{block.text}</h1>;
    case "intro": return <Card style={{marginBottom:14,borderLeft:`3px solid ${C.red}`}}><div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
    case "section_title": return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{block.icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.gold,letterSpacing:2}}>{block.text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${C.gold}44,transparent)`}}/></div>;
    case "content": return <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>{block.icon}</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{block.title}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
    case "keypoint": return <div style={{background:`linear-gradient(135deg,rgba(192,57,43,0.1),rgba(13,31,60,0.6))`,border:`1px solid ${C.red}44`,borderLeft:`3px solid ${C.red}`,borderRadius:16,padding:"16px",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:20}}>{block.icon}</span><span style={{fontSize:12,fontWeight:700,color:C.red,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{block.title}</span></div><div style={{fontSize:13,color:C.white,lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></div>;
    case "summary": return <Card style={{marginBottom:14,background:`linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))`,border:`1px solid ${C.red}33`}}><div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{block.title}</div>{block.points.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<block.points.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}</Card>;
    case "rules_table": return <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📋 {lang==="fr"?"TABLEAU DES RÈGLES ESSENTIELLES":lang==="es"?"TABLA DE REGLAS ESENCIALES":lang==="pt"?"TABELA DAS REGRAS ESSENCIAIS":"ESSENTIAL RULES TABLE"}</div><RulesTable lang={lang}/></Card>;
    case "rule14_schema": return <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>{t.rule14title}</div><Rule14Schema t={t} lang={lang}/></Card>;
    case "rule15_schema": return <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>{t.rule15title}</div><Rule15Schema t={t} lang={lang}/></Card>;
    case "rule13_schema": return <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>{t.rule13title}</div><Rule13Schema t={t} lang={lang}/></Card>;
    default: return null;
  }
}

// ── Quiz ──────────────────────────────────────
function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?150:fs===3?100:50;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center",border:`1px solid ${pct>=80?C.gold:C.border}`}}><div style={{fontSize:11,letterSpacing:3,color:C.gold,marginBottom:14,fontFamily:"'Cinzel',serif"}}>{t.result}</div><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:15,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"13px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})}  </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════════════
//  MAIN LESSON
// ══════════════════════════════════════════════
export default function LessonCOLREG({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;
  const sections=SECTIONS[lang]||SECTIONS.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);

  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);

  const progress=phase==="content"?20:phase==="quiz"?60:100;

  const learnedPoints={
    fr:["38 règles COLREG · Adoption 1972 · Valable mondialement","Rule 5 : Veille permanente vue + ouïe + tous moyens","Rule 14 : Bout au bout → les DEUX à tribord","Rule 15 : Rouge à tribord → je cède le passage","Rule 13 : Qui rattrape → toujours obligé de céder","Rule 8 : Manœuvre franche, ample, tôt"],
    en:["38 COLREG rules · Adopted 1972 · Valid worldwide","Rule 5: Lookout sight + hearing + all means","Rule 14: Head-on → BOTH turn starboard","Rule 15: Red on starboard → I give way","Rule 13: Overtaking → always give way","Rule 8: Positive, large, early action"],
    es:["38 reglas COLREG · Adoptado 1972 · Válido mundialmente","Regla 5: Vigilancia vista + oído + todos los medios","Regla 14: Proa con proa → AMBOS a estribor","Regla 15: Rojo a estribor → yo cedo","Regla 13: El que alcanza → siempre cede","Regla 8: Maniobra franca, amplia, a tiempo"],
    pt:["38 regras COLREG · Adotado 1972 · Válido mundialmente","Regra 5: Vigilância vista + audição + todos os meios","Regra 14: Proa com proa → AMBOS a estibordo","Regra 15: Vermelho a estibordo → eu cedo","Regra 13: Quem ultrapassa → sempre cede","Regra 8: Manobra franca, ampla, cedo"],
  };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>

      {/* TOPBAR */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.red,letterSpacing:1,fontFamily:"'Cinzel',serif",marginBottom:1}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{t.lesson} 1/6</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,fontWeight:700}}>🆓 FREE</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.red},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&(
            <>
              {sections.map((block,i)=><Block key={i} block={block} lang={lang} t={t}/>)}
              <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(192,57,43,0.35)",marginTop:8}}>{t.startQuiz}</button>
              <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
            </>
          )}

          {phase==="quiz"&&(
            <>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                  {lang==="fr"?"Teste tes connaissances COLREG":lang==="es"?"Pon a prueba tus conocimientos COLREG":lang==="pt"?"Teste seus conhecimentos COLREG":"Test your COLREG knowledge"}
                </div>
                <div style={{fontSize:12,color:C.muted}}>
                  {lang==="fr"?"5 questions · COLREG Leçon 1":lang==="es"?"5 preguntas · COLREG Lección 1":lang==="pt"?"5 perguntas · COLREG Lição 1":"5 questions · COLREG Lesson 1"}
                </div>
              </div>
              <QuizComp questions={quiz} t={t} onComplete={(s)=>{ setQuizScore(s); setTimeout(()=>setPhase("done"),1200); }}/>
            </>
          )}

          {phase==="done"&&(
            <div style={{paddingTop:10}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:64,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>
                  +{quizScore>=4?150:quizScore===3?100:50} {t.xp} ⭐
                </div>
              </div>
              <Card style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
                {(learnedPoints[lang]||learnedPoints.fr).map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.green,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>

              {/* Premium teaser */}
              <div style={{background:`linear-gradient(135deg,rgba(201,146,42,0.12),rgba(13,31,60,0.8))`,border:`1px solid ${C.gold}44`,borderRadius:18,padding:"16px",marginBottom:16,textAlign:"center"}}>
                <div style={{fontSize:20,marginBottom:6}}>⭐</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.gold2,marginBottom:6}}>
                  {lang==="fr"?"Leçon 2 : Les 38 règles complètes"
                   :lang==="es"?"Lección 2: Las 38 reglas completas"
                   :lang==="pt"?"Lição 2: As 38 regras completas"
                   :"Lesson 2: All 38 rules complete"}
                </div>
                <div style={{fontSize:11,color:C.muted,marginBottom:10}}>
                  {lang==="fr"?"Feux de navigation · Signaux sonores · Cas réels d'accidents · Banque 200 questions STCW"
                   :lang==="es"?"Luces de navegación · Señales sonoras · Casos reales · Banco 200 preguntas STCW"
                   :lang==="pt"?"Luzes de navegação · Sinais sonoros · Casos reais · Banco 200 questões STCW"
                   :"Navigation lights · Sound signals · Real cases · 200 STCW question bank"}
                </div>
                <div style={{fontSize:12,color:C.gold,fontWeight:700}}>⭐ Premium · 9$/mois</div>
              </div>

              <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
                {lang==="fr"?"← RETOUR AU DASHBOARD":lang==="es"?"← VOLVER AL PANEL":lang==="pt"?"← VOLTAR AO PAINEL":"← BACK TO DASHBOARD"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
