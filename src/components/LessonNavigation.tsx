// @ts-nocheck
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
//  SVG INSTRUMENTS ANIMÉS
// ══════════════════════════════════════════════

// ── COMPAS MAGNÉTIQUE ─────────────────────────
function CompassSVG({ heading = 0 }) {
  const [currentHeading, setCurrentHeading] = useState(heading);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!interactive) {
      const iv = setInterval(() => {
        setCurrentHeading(h => (h + 0.3) % 360);
      }, 30);
      return () => clearInterval(iv);
    }
  }, [interactive]);

  const cardinals = [
    { label: "N", angle: 0, color: C.red, bold: true },
    { label: "NE", angle: 45, color: C.muted, bold: false },
    { label: "E", angle: 90, color: C.white, bold: true },
    { label: "SE", angle: 135, color: C.muted, bold: false },
    { label: "S", angle: 180, color: C.white, bold: true },
    { label: "SW", angle: 225, color: C.muted, bold: false },
    { label: "W", angle: 270, color: C.white, bold: true },
    { label: "NW", angle: 315, color: C.muted, bold: false },
  ];

  const toRad = (deg) => (deg * Math.PI) / 180;
  const cx = 120, cy = 120, r = 100;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Outer bezel */}
        <circle cx={cx} cy={cy} r={r + 15} fill="#0a1628"
          stroke={C.gold} strokeWidth="2" />
        <circle cx={cx} cy={cy} r={r + 8} fill="none"
          stroke={C.gold2} strokeWidth="0.5" opacity="0.4" />

        {/* Degree marks */}
        {Array.from({ length: 72 }, (_, i) => {
          const angle = i * 5;
          const rad = toRad(angle - currentHeading);
          const isMajor = angle % 10 === 0;
          const x1 = cx + (r - (isMajor ? 12 : 6)) * Math.sin(rad);
          const y1 = cy - (r - (isMajor ? 12 : 6)) * Math.cos(rad);
          const x2 = cx + r * Math.sin(rad);
          const y2 = cy - r * Math.cos(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isMajor ? C.gold2 : "rgba(240,244,255,0.3)"}
              strokeWidth={isMajor ? 1.5 : 0.8} />
          );
        })}

        {/* Degree numbers every 30° */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
          const rad = toRad(angle - currentHeading);
          const x = cx + (r - 22) * Math.sin(rad);
          const y = cy - (r - 22) * Math.cos(rad);
          return (
            <text key={angle} x={x} y={y} textAnchor="middle"
              dominantBaseline="middle" fontSize="7"
              fill="rgba(240,244,255,0.5)">
              {angle}
            </text>
          );
        })}

        {/* Cardinal points */}
        {cardinals.map(c => {
          const rad = toRad(c.angle - currentHeading);
          const x = cx + (r - 35) * Math.sin(rad);
          const y = cy - (r - 35) * Math.cos(rad);
          return (
            <text key={c.label} x={x} y={y} textAnchor="middle"
              dominantBaseline="middle"
              fontSize={c.bold ? "11" : "8"}
              fontWeight={c.bold ? "bold" : "normal"}
              fill={c.color}>
              {c.label}
            </text>
          );
        })}

        {/* Rose background */}
        <circle cx={cx} cy={cy} r={r - 45} fill="rgba(6,14,26,0.8)"
          stroke="rgba(201,146,42,0.2)" strokeWidth="1" />

        {/* North needle (red) */}
        <polygon
          points={`${cx},${cy - 50} ${cx - 7},${cy + 10} ${cx},${cy + 5} ${cx + 7},${cy + 10}`}
          fill={C.red} opacity="0.9" />
        {/* South needle (white) */}
        <polygon
          points={`${cx},${cy + 50} ${cx - 7},${cy - 10} ${cx},${cy - 5} ${cx + 7},${cy - 10}`}
          fill="rgba(240,244,255,0.7)" />

        {/* Center pivot */}
        <circle cx={cx} cy={cy} r="6" fill={C.gold} />
        <circle cx={cx} cy={cy} r="3" fill={C.navy} />

        {/* Line of faith (ligne de foi) */}
        <line x1={cx} y1={cy - r - 14} x2={cx} y2={cy - r + 5}
          stroke={C.gold} strokeWidth="2" />
        <polygon points={`${cx},${cy - r - 18} ${cx - 4},${cy - r - 10} ${cx + 4},${cy - r - 10}`}
          fill={C.gold} />
      </svg>

      {/* Heading display */}
      <div style={{
        fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 700,
        color: C.white, marginTop: 4,
      }}>
        Cap : {Math.round(currentHeading).toString().padStart(3, "0")}°
      </div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
        🧭 Compas magnétique — Ligne de foi ↑
      </div>
    </div>
  );
}

// ── RADAR ─────────────────────────────────────
function RadarSVG() {
  const [angle, setAngle] = useState(0);
  const echoes = [
    { dist: 0.55, bearing: 45, size: 6, label: "Navire A" },
    { dist: 0.75, bearing: 120, size: 8, label: "Navire B" },
    { dist: 0.35, bearing: 200, size: 12, label: "Côte" },
    { dist: 0.65, bearing: 310, size: 5, label: "Navire C" },
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      setAngle(a => (a + 2) % 360);
    }, 30);
    return () => clearInterval(iv);
  }, []);

  const cx = 120, cy = 120, r = 100;
  const toRad = (deg) => (deg * Math.PI) / 180;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Background */}
        <circle cx={cx} cy={cy} r={r + 15} fill="#0a1628"
          stroke={C.green} strokeWidth="1.5" opacity="0.6" />

        {/* Range rings */}
        {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <circle key={i} cx={cx} cy={cy} r={r * ratio}
            fill="none" stroke={C.green} strokeWidth="0.5"
            opacity="0.3" />
        ))}

        {/* Bearing lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(bear => {
          const rad = toRad(bear);
          return (
            <line key={bear}
              x1={cx + r * Math.sin(rad)} y1={cy - r * Math.cos(rad)}
              x2={cx - r * Math.sin(rad)} y2={cy + r * Math.cos(rad)}
              stroke={C.green} strokeWidth="0.4" opacity="0.25" />
          );
        })}

        {/* Sweep gradient */}
        <defs>
          <radialGradient id="sweep">
            <stop offset="0%" stopColor={C.green} stopOpacity="0.6" />
            <stop offset="100%" stopColor={C.green} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sweep line */}
        {(() => {
          const rad = toRad(angle);
          const x = cx + r * Math.sin(rad);
          const y = cy - r * Math.cos(rad);
          return (
            <line x1={cx} y1={cy} x2={x} y2={y}
              stroke={C.green} strokeWidth="2" opacity="0.9" />
          );
        })()}

        {/* Sweep afterglow */}
        {Array.from({ length: 30 }, (_, i) => {
          const sweepAngle = (angle - i * 2 + 360) % 360;
          const rad = toRad(sweepAngle);
          const x = cx + r * Math.sin(rad);
          const y = cy - r * Math.cos(rad);
          return (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y}
              stroke={C.green} strokeWidth="1.5"
              opacity={0.4 * (1 - i / 30)} />
          );
        })}

        {/* Echoes */}
        {echoes.map((echo, i) => {
          const rad = toRad(echo.bearing);
          const ex = cx + r * echo.dist * Math.sin(rad);
          const ey = cy - r * echo.dist * Math.cos(rad);
          const isLit = Math.abs(((angle - echo.bearing + 360) % 360)) < 30;
          return (
            <g key={i}>
              <circle cx={ex} cy={ey} r={echo.size / 2}
                fill={C.green} opacity={isLit ? 0.95 : 0.35} />
              {isLit && (
                <circle cx={ex} cy={ey} r={echo.size}
                  fill="none" stroke={C.green}
                  strokeWidth="1" opacity="0.3" />
              )}
            </g>
          );
        })}

        {/* Own ship marker */}
        <circle cx={cx} cy={cy} r="4" fill={C.gold} />
        <line x1={cx} y1={cy} x2={cx} y2={cy - 15}
          stroke={C.gold} strokeWidth="2" />

        {/* Range labels */}
        <text x={cx + 8} y={cy - r * 0.5 + 4} fontSize="7"
          fill={C.green} opacity="0.6">6mn</text>
        <text x={cx + 8} y={cy - r + 4} fontSize="7"
          fill={C.green} opacity="0.6">12mn</text>

        {/* Bearing marks */}
        {[0, 90, 180, 270].map(bear => {
          const rad = toRad(bear);
          const x = cx + (r + 10) * Math.sin(rad);
          const y = cy - (r + 10) * Math.cos(rad);
          return (
            <text key={bear} x={x} y={y} textAnchor="middle"
              dominantBaseline="middle" fontSize="8"
              fill={C.green} opacity="0.7">
              {bear === 0 ? "N" : bear === 90 ? "E" :
                bear === 180 ? "S" : "W"}
            </text>
          );
        })}
      </svg>
      <div style={{ fontSize: 11, color: C.green, marginTop: 4 }}>
        📡 Radar — Portée 12 mn · 4 échos détectés
      </div>
    </div>
  );
}

// ── GPS DISPLAY ───────────────────────────────
function GPSDisplay({ lang = "fr" }) {
  const [blink, setBlink] = useState(true);
  const [sats, setSats] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      angle: i * 45 + Math.random() * 30,
      dist: 0.3 + Math.random() * 0.5,
      active: Math.random() > 0.2,
      strength: Math.floor(20 + Math.random() * 40),
    }))
  );

  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 800);
    return () => clearInterval(iv);
  }, []);

  const toRad = (deg) => (deg * Math.PI) / 180;
  const cx = 90, cy = 90, r = 75;

  return (
    <div style={{ textAlign: "center" }}>
      {/* Sky view */}
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Sky circles */}
        {[1, 0.67, 0.33].map((ratio, i) => (
          <circle key={i} cx={cx} cy={cy} r={r * ratio}
            fill="none" stroke={C.blue2} strokeWidth="0.5"
            opacity="0.3" />
        ))}
        {[0, 90, 180, 270].map(bear => {
          const rad = toRad(bear);
          const x = cx + r * Math.sin(rad);
          const y = cy - r * Math.cos(rad);
          return (
            <line key={bear} x1={cx} y1={cy} x2={x} y2={y}
              stroke={C.blue2} strokeWidth="0.4" opacity="0.2" />
          );
        })}
        {/* Labels */}
        {[["N", 0], ["E", 90], ["S", 180], ["W", 270]].map(([l, a]) => {
          const rad = toRad(a);
          const x = cx + (r + 8) * Math.sin(rad);
          const y = cy - (r + 8) * Math.cos(rad);
          return (
            <text key={l} x={x} y={y} textAnchor="middle"
              dominantBaseline="middle" fontSize="8"
              fill={C.blue2} opacity="0.7">{l}</text>
          );
        })}
        {/* Satellites */}
        {sats.map(sat => {
          const rad = toRad(sat.angle);
          const x = cx + r * sat.dist * Math.sin(rad);
          const y = cy - r * sat.dist * Math.cos(rad);
          return (
            <g key={sat.id}>
              <circle cx={x} cy={y} r={sat.active ? 6 : 4}
                fill={sat.active ? C.blue2 : "rgba(240,244,255,0.2)"}
                stroke={sat.active ? C.gold : "rgba(255,255,255,0.1)"}
                strokeWidth="1" />
              <text x={x} y={y} textAnchor="middle"
                dominantBaseline="middle" fontSize="5"
                fill={sat.active ? C.white : C.muted}>
                {sat.id}
              </text>
            </g>
          );
        })}
        {/* Center */}
        <circle cx={cx} cy={cy} r="5" fill={C.gold} />
      </svg>

      {/* Position display */}
      <div style={{
        background: "rgba(0,0,0,0.4)",
        border: `1px solid ${C.blue2}44`,
        borderRadius: 12, padding: "10px 14px",
        marginTop: 8, textAlign: "left",
        fontFamily: "monospace",
      }}>
        <div style={{ fontSize: 10, color: C.blue2, marginBottom: 6,
          letterSpacing: 1 }}>GPS POSITION FIX</div>
        <div style={{ fontSize: 13, color: C.green, marginBottom: 2 }}>
          LAT: 04° 03.370' N
        </div>
        <div style={{ fontSize: 13, color: C.green, marginBottom: 6 }}>
          LON: 009° 41.700' E
        </div>
        <div style={{
          display: "flex", gap: 12, fontSize: 10, color: C.muted,
        }}>
          <span>SOG: 14.2 kn</span>
          <span>COG: 315°</span>
          <span style={{ color: blink ? C.green : "transparent" }}>
            ● FIX
          </span>
        </div>
        <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>
          Sats: {sats.filter(s => s.active).length}/
          {sats.length} · HDOP: 0.8 · ±5m
        </div>
      </div>
      <div style={{ fontSize: 11, color: C.blue2, marginTop: 6 }}>
        🛰️ GPS — {sats.filter(s => s.active).length} {
          lang === "en" ? "active satellites" :
          lang === "es" ? "satélites activos" :
          lang === "pt" ? "satélites ativos" :
          "satellites actifs"
        }
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  LESSON CONTENT
// ══════════════════════════════════════════════
const T = {
  fr: { back: "◀ Retour", module: "Navigation & Cartographie",
    lesson: "Leçon", of: "/", min: "min",
    quiz_label: "QUIZ", question: "Question", of2: "sur",
    correct: "✓ Bonne réponse !", wrong: "✗ Mauvaise réponse",
    explanation: "Explication :", next: "SUIVANT →",
    finish: "VOIR MON SCORE →", start_quiz: "✅ COMMENCER LE QUIZ",
    result: "RÉSULTAT DU QUIZ",
    lesson_complete: "🏅 LEÇON TERMINÉE !",
    next_lesson: "LEÇON 2 →",
    back_dash: "← RETOUR AU DASHBOARD",
    you_learned: "Tu as appris :",
    download_memo: "📥 Télécharger la fiche mémo",
    xp_earned: "XP gagnés",
    read_content: "Lis le contenu puis commence le quiz",
    compass_title: "🧭 COMPAS MAGNÉTIQUE — Interactif",
    compass_caption: "L'aiguille rouge pointe toujours vers le nord magnétique. La graduation indique les caps de 0° à 360°. La ligne de foi ▲ en haut indique le cap suivi par le navire.",
    radar_title: "📡 RADAR — Balayage en temps réel",
    radar_caption: "La ligne verte balaye à 360°. Les taches lumineuses sont des échos (navires, côtes). Les cercles indiquent les distances. Le navire propre est au centre (●).",
    gps_title: "🛰️ GPS — Vue satellites et position",
    gps_caption: "Vue du ciel : les cercles bleus sont les satellites visibles. Les satellites actifs (bleu brillant) participent au calcul de position. La position et la vitesse s'affichent en temps réel.",
    score_perfect: "Parfait ! 🌟", score_excellent: "Excellent ! 💪", score_keep: "Continue ! 📚",
    quiz_intro_title: "Teste tes connaissances", quiz_intro_sub: "5 questions · Leçon 1",
    next_lesson_btn: "LEÇON 2 — LE NAVIRE →",
  },
  en: { back: "◀ Back", module: "Navigation & Cartography",
    lesson: "Lesson", of: "/", min: "min",
    quiz_label: "QUIZ", question: "Question", of2: "of",
    correct: "✓ Correct!", wrong: "✗ Wrong answer",
    explanation: "Explanation:", next: "NEXT →",
    finish: "SEE MY SCORE →", start_quiz: "✅ START QUIZ",
    result: "QUIZ RESULT",
    lesson_complete: "🏅 LESSON COMPLETE!",
    next_lesson: "LESSON 2 →",
    back_dash: "← BACK TO DASHBOARD",
    you_learned: "You learned:",
    download_memo: "📥 Download memo sheet",
    xp_earned: "XP earned",
    read_content: "Read the content then start the quiz",
    compass_title: "🧭 MAGNETIC COMPASS — Interactive",
    compass_caption: "The red needle always points to magnetic north. The graduation shows headings from 0° to 360°. The lubber line ▲ at the top shows the ship's course.",
    radar_title: "📡 RADAR — Real-time sweep",
    radar_caption: "The green line sweeps 360°. Bright spots are echoes (ships, coastlines). The circles show distances. Your own ship is at the center (●).",
    gps_title: "🛰️ GPS — Satellite view and position",
    gps_caption: "Sky view: blue circles are visible satellites. Active satellites (bright blue) contribute to the position fix. Position and speed are shown in real time.",
    score_perfect: "Perfect! 🌟", score_excellent: "Excellent! 💪", score_keep: "Keep going! 📚",
    quiz_intro_title: "Test your knowledge", quiz_intro_sub: "5 questions · Lesson 1",
    next_lesson_btn: "LESSON 2 — THE SHIP →",
  },
  es: { back: "◀ Volver", module: "Navegación & Cartografía",
    lesson: "Lección", of: "/", min: "min",
    quiz_label: "QUIZ", question: "Pregunta", of2: "de",
    correct: "✓ ¡Correcta!", wrong: "✗ Respuesta incorrecta",
    explanation: "Explicación:", next: "SIGUIENTE →",
    finish: "VER MI PUNTUACIÓN →", start_quiz: "✅ EMPEZAR EL QUIZ",
    result: "RESULTADO DEL QUIZ",
    lesson_complete: "🏅 ¡LECCIÓN COMPLETADA!",
    next_lesson: "LECCIÓN 2 →",
    back_dash: "← VOLVER AL PANEL",
    you_learned: "Has aprendido:",
    download_memo: "📥 Descargar ficha resumen",
    xp_earned: "XP ganados",
    read_content: "Lee el contenido y luego comienza el quiz",
    compass_title: "🧭 BRÚJULA MAGNÉTICA — Interactiva",
    compass_caption: "La aguja roja siempre apunta al norte magnético. La graduación indica los rumbos de 0° a 360°. La línea de fe ▲ arriba indica el rumbo del buque.",
    radar_title: "📡 RADAR — Barrido en tiempo real",
    radar_caption: "La línea verde barre 360°. Los puntos brillantes son ecos (buques, costas). Los círculos indican las distancias. Tu propio buque está en el centro (●).",
    gps_title: "🛰️ GPS — Vista de satélites y posición",
    gps_caption: "Vista del cielo: los círculos azules son satélites visibles. Los satélites activos (azul brillante) participan en el cálculo de posición. La posición y la velocidad se muestran en tiempo real.",
    score_perfect: "¡Perfecto! 🌟", score_excellent: "¡Excelente! 💪", score_keep: "¡Sigue así! 📚",
    quiz_intro_title: "Pon a prueba tus conocimientos", quiz_intro_sub: "5 preguntas · Lección 1",
    next_lesson_btn: "LECCIÓN 2 — EL BUQUE →",
  },
  pt: { back: "◀ Voltar", module: "Navegação & Cartografia",
    lesson: "Lição", of: "/", min: "min",
    quiz_label: "QUIZ", question: "Pergunta", of2: "de",
    correct: "✓ Correto!", wrong: "✗ Resposta errada",
    explanation: "Explicação:", next: "PRÓXIMO →",
    finish: "VER MINHA PONTUAÇÃO →", start_quiz: "✅ COMEÇAR O QUIZ",
    result: "RESULTADO DO QUIZ",
    lesson_complete: "🏅 LIÇÃO CONCLUÍDA!",
    next_lesson: "LIÇÃO 2 →",
    back_dash: "← VOLTAR AO PAINEL",
    you_learned: "Você aprendeu:",
    download_memo: "📥 Baixar ficha resumo",
    xp_earned: "XP ganhos",
    read_content: "Leia o conteúdo e depois comece o quiz",
    compass_title: "🧭 BÚSSOLA MAGNÉTICA — Interativa",
    compass_caption: "A agulha vermelha aponta sempre para o norte magnético. A graduação indica os rumos de 0° a 360°. A linha de fé ▲ no topo indica o rumo do navio.",
    radar_title: "📡 RADAR — Varredura em tempo real",
    radar_caption: "A linha verde varre 360°. Os pontos brilhantes são ecos (navios, costas). Os círculos indicam as distâncias. O próprio navio está no centro (●).",
    gps_title: "🛰️ GPS — Vista de satélites e posição",
    gps_caption: "Vista do céu: os círculos azuis são satélites visíveis. Os satélites ativos (azul brilhante) participam no cálculo de posição. A posição e a velocidade são exibidas em tempo real.",
    score_perfect: "Perfeito! 🌟", score_excellent: "Excelente! 💪", score_keep: "Continue! 📚",
    quiz_intro_title: "Teste seus conhecimentos", quiz_intro_sub: "5 perguntas · Lição 1",
    next_lesson_btn: "LIÇÃO 2 — O NAVIO →",
  },
};

const CONTENT = {
  fr: [
    { type: "badge", text: "📚 Navigation & Cartographie · Leçon 1 · ~15 min · ⭐ 150 XP" },
    { type: "title", text: "Histoire & Instruments de Navigation" },
    { type: "intro",
      text: "Depuis que l'homme a posé les pieds sur les rives de la mer, il a voulu la traverser. D'abord par nécessité — pêcher, commercer, migrer. Puis par curiosité — découvrir ce qui se trouve de l'autre côté. Aujourd'hui par profession.\n\nLe commerce maritime mondial représente 90% des échanges commerciaux mondiaux, avec 50 000 navires en circulation permanente et 1,9 million de marins en activité. Toi, en tant que marin, tu fais partie de cette chaîne vitale." },
    { type: "section_title", icon: "📜", text: "PARTIE 1 — Histoire de la Navigation" },
    { type: "content", icon: "🏛️", title: "Les Phéniciens — 3000 av. J.-C.",
      text: "Les Phéniciens, établis sur les côtes de l'actuel Liban, sont les premiers grands navigateurs commerciaux de l'histoire. Leur technique : la navigation côtière — garder les côtes en vue et s'orienter grâce aux amers (points remarquables sur la côte).\n\nLa nuit, ils utilisaient l'étoile polaire — Polaris — qui reste quasiment fixe dans le ciel et indique le nord avec précision.\n\n🔍 Anecdote : Les Phéniciens auraient contourné l'Afrique vers 600 av. J.-C., soit 2000 ans avant Vasco de Gama." },
    { type: "content", icon: "🌊", title: "Les Polynésiens — L'exploit du Pacifique",
      text: "L'exploit de navigation le plus extraordinaire de l'histoire : les Polynésiens ont colonisé l'immensité du Pacifique — Hawaii, Nouvelle-Zélande, île de Pâques — sur 5 000 km, dans des pirogues, SANS instrument.\n\nLeur savoir-faire :\n• Plus de 150 étoiles mémorisées\n• Lecture des vagues et courants\n• Observation des oiseaux marins\n• Cartes de bâtons en bambou\n\n💡 Ce que cela nous enseigne : La navigation est avant tout une science de l'observation. Ces qualités restent précieuses aujourd'hui." },
    { type: "keypoint", icon: "🧲", title: "La Boussole — 11ème siècle",
      text: "Inventée en Chine en 1100, arrivée en Europe via les Arabes vers 1180.\n\nPrincipe : La Terre est un gigantesque aimant. Une aiguille aimantée libre de tourner s'aligne sur le champ magnétique terrestre et pointe vers le nord magnétique.\n\n⚠️ Point important : Le nord magnétique ≠ nord géographique. La différence s'appelle la déclinaison magnétique. Elle varie selon l'endroit sur Terre et doit être corrigée par le marin (Leçon 5)." },
    { type: "content", icon: "🔭", title: "Sextant (1731) & Chronomètre (1762)",
      text: "Le sextant mesure l'angle entre un astre et l'horizon, permettant de calculer la latitude.\n\nMais la longitude restait un mystère jusqu'en 1762, quand John Harrison invente le chronomètre de marine H4 — une montre gardant l'heure exacte malgré les mouvements du navire.\n\nEn combinant sextant + chronomètre : position complète (lat + lon) calculable en mer pour la première fois.\n\n💡 Le Parlement britannique offrit £20 000 en 1714 à qui résoudrait le problème de la longitude. Harrison mit 40 ans à convaincre les juges." },
    { type: "timeline",
      items: [
        { year: "1100", text: "Boussole magnétique (Chine → Europe)" },
        { year: "1731", text: "Sextant — calcul de latitude précis" },
        { year: "1762", text: "Chronomètre Harrison — longitude résolue" },
        { year: "1935", text: "Radar — voir dans le brouillard" },
        { year: "1978", text: "Lancement premier satellite GPS" },
        { year: "1983", text: "GPS ouvert aux civils (Reagan)" },
        { year: "2012", text: "ECDIS obligatoire > 500 GT (IMO)" },
      ]
    },
    { type: "section_title", icon: "🎛️", text: "PARTIE 2 — Les Instruments Modernes" },
    { type: "instrument_compass" },
    { type: "content", icon: "🧭", title: "Le Compas Magnétique — Instrument obligatoire",
      text: "Composition : Rose des compas graduée 0° à 360°, montée sur pivot, baignant dans un liquide amortisseur.\n\nLa ligne de foi : repère fixe aligné avec l'axe du navire. La graduation en face indique le cap.\n\nPoints cardinaux et leurs degrés :\n• Nord (N) = 000°\n• Est (E) = 090°\n• Sud (S) = 180°\n• Ouest (W) = 270°\n• Nord-Est (NE) = 045°\n• Sud-Est (SE) = 135°\n• Sud-Ouest (SW) = 225°\n• Nord-Ouest (NW) = 315°\n\n🔑 Règle d'or : Seul instrument fonctionnant sans électricité. OBLIGATOIRE sur tout navire (SOLAS)." },
    { type: "instrument_radar" },
    { type: "content", icon: "📡", title: "Le Radar — Voir l'invisible",
      text: "Principe : L'antenne (20-30 tours/minute) émet des impulsions d'ondes radio. Elles se réfléchissent sur les obstacles et reviennent. Temps de retour × vitesse lumière ÷ 2 = distance.\n\nPortées typiques :\n• 0,25 mn → manœuvre portuaire\n• 6 mn → navigation côtière\n• 12 mn → navigation hauturière\n• 96 mn → surveillance longue portée\n\nARPA (Automatic Radar Plotting Aid) :\nCalcule automatiquement pour chaque écho :\n• CPA — distance minimale de passage\n• TCPA — temps avant ce point critique\n• Alarme si risque d'abordage\n\n⚠️ Règle COLREG : Ne jamais se fier aveuglément à l'ARPA. La veille visuelle reste obligatoire." },
    { type: "instrument_gps" },
    { type: "content", icon: "🛰️", title: "Le GPS — Position mondiale",
      text: "Architecture : 31 satellites actifs à 20 200 km d'altitude. Au minimum 4 satellites visibles depuis n'importe quel point sur Terre.\n\nPrincipe : Chaque satellite émet son identité, sa position et l'heure exacte. Le récepteur calcule la distance à chaque satellite → triangulation → position exacte.\n\nPrécision : ± 5 à 10 mètres (GPS civil standard)\n\nAutres systèmes satellites :\n• GLONASS (Russie) — 24 sats\n• Galileo (Europe) — 30 sats\n• BeiDou (Chine) — 35 sats\n\n⚠️ Vulnérabilités : Jamming (brouillage), Spoofing (leurrage), panne électrique. C'est pourquoi le compas magnétique et la navigation à l'estime restent des compétences STCW obligatoires." },
    { type: "content", icon: "🗺️", title: "L'ECDIS — La carte électronique officielle",
      text: "L'ECDIS combine : ENC (carte officielle vectorielle) + GPS en temps réel + données AIS + alarmes de sécurité + enregistrement de route.\n\nObligation IMO :\n• Passagers > 500 GT → 1er juillet 2012\n• Tankers > 3 000 GT → 1er juillet 2012\n• Cargo > 10 000 GT → 1er juillet 2013\n• Cargo 3-10 000 GT → 1er juillet 2014\n• Cargo 500-3 000 GT → 1er juillet 2015\n\nTypes de cartes électroniques :\n• ENC (S-57) : officielle, légalement approuvée ✅\n• RNC : scan de carte papier, non approuvée seule ⚠️" },
    { type: "content", icon: "📻", title: "L'AIS — Identification automatique",
      text: "Chaque navire équipé AIS diffuse automatiquement sur VHF :\n\nDonnées statiques : Numéro MMSI (identifiant unique 9 chiffres), nom, type, dimensions\n\nDonnées dynamiques : Position GPS, vitesse (SOG), cap fond (COG), cap vrai (HDG), taux de giration\n\nDonnées voyage : Tirant d'eau, destination, ETA\n\nPortée : 20-30 mn en surface · Mondial par satellite (AIS-SAT)\n\nObligations :\n• Classe A : Tous navires > 300 GT voyage international\n• Classe B : Navires non SOLAS, plaisance > 15m" },
    { type: "section_title", icon: "📏", text: "PARTIE 3 — Unités de Mesure" },
    { type: "keypoint", icon: "📐", title: "Le Mille Nautique",
      text: "1 mille nautique (mn) = 1 852 mètres\n\nOrigine : 1 minute d'arc de latitude sur le méridien terrestre. Brillant pour la navigation : pour mesurer une distance sur une carte marine, on reporte le segment sur l'échelle de latitude. 1 minute de latitude = 1 mille nautique.\n\nComparaisons :\n• 1 mn = 1 852 m\n• 1 km = 1 000 m\n• 1 mile terrestre = 1 609 m\n• 1 encablure = 185,2 m (1/10 de mn)" },
    { type: "keypoint", icon: "⚓", title: "Le Nœud",
      text: "1 nœud (kn) = 1 mille nautique par heure\n\nOrigine historique : Ligne de loch avec nœuds tous les 14,4 m. On filait la corde 30 secondes. Nombre de nœuds passés = vitesse en nœuds.\n\nVitesses typiques :\n• Pétrolier VLCC : 14-16 kn\n• Porte-conteneurs : 18-24 kn\n• Vraquier : 12-15 kn\n• Croisière : 20-24 kn\n• Ferry rapide : 30-40 kn\n\nFormule DVT : D = V × T" },
    { type: "formula",
      title: "Formule Fondamentale DVT",
      lines: [
        "D = V × T",
        "V = D ÷ T",
        "T = D ÷ V",
        "",
        "Exemple : 16 kn × 4,5 h = 72 mn",
      ]
    },
    { type: "summary",
      title: "RÉSUMÉ DE LA LEÇON",
      points: [
        "Phéniciens → côtière aux étoiles (3000 av. J.-C.)",
        "Polynésiens → lecture vagues et étoiles",
        "Boussole → nord magnétique (1100)",
        "GPS → position ± 5m, 4 satellites minimum",
        "ECDIS → obligatoire > 500 GT depuis 2012",
        "1 mille nautique = 1 852 m = 1' de latitude",
        "1 nœud = 1 mn/h · D = V × T",
        "N=000° E=090° S=180° W=270°",
      ]
    },
  ],
};

const QUIZ = {
  fr: [
    {
      q: "Quel peuple a colonisé le Pacifique sur 5 000 km sans aucun instrument ?",
      opts: ["Les Phéniciens","Les Vikings","Les Polynésiens","Les Arabes"],
      correct: 2,
      expl: "Les Polynésiens ont colonisé Hawaii, la Nouvelle-Zélande et l'île de Pâques grâce à la lecture des étoiles, des vagues et des oiseaux — sans aucun instrument.",
    },
    {
      q: "Pourquoi l'invention du chronomètre de marine (1762) fut-elle révolutionnaire ?",
      opts: ["Elle mesurait la vitesse du navire","Elle donnait l'heure dans chaque port","Elle permettait de calculer la longitude","Elle remplaçait le sextant"],
      correct: 2,
      expl: "Connaître l'heure exacte permet de calculer la différence avec l'heure locale (soleil), donc la longitude. Avant Harrison, la longitude en mer était un mystère.",
    },
    {
      q: "Un navire navigue à 18 nœuds pendant 3h30. Quelle distance a-t-il parcourue ?",
      opts: ["54 milles nautiques","63 milles nautiques","72 milles nautiques","84 milles nautiques"],
      correct: 1,
      expl: "D = V × T = 18 kn × 3,5 h = 63 milles nautiques. Toujours convertir les heures en décimales (3h30 = 3,5 heures).",
    },
    {
      q: "Que signifie CPA dans le contexte du radar ARPA ?",
      opts: ["Cap Probable d'Abordage","Closest Point of Approach — distance minimale de passage","Contrôle de Position Automatique","Centre de Pilotage Automatisé"],
      correct: 1,
      expl: "CPA = Closest Point of Approach. C'est la distance minimale à laquelle un navire détecté va passer. L'ARPA calcule aussi le TCPA — temps avant ce point.",
    },
    {
      q: "Pourquoi le compas magnétique reste-t-il OBLIGATOIRE malgré GPS et ECDIS ?",
      opts: ["Il est plus précis que le GPS","Il est moins coûteux","Il fonctionne sans électricité et résiste au jamming et au spoofing","Il est requis par le MARPOL"],
      correct: 2,
      expl: "Le compas magnétique est le seul instrument opérationnel lors d'une panne électrique totale. Il ne peut pas être brouillé (jamming) ni leurré (spoofing). C'est l'instrument de dernier recours — SOLAS l'impose.",
    },
  ],
};

// ── SHARED UI ─────────────────────────────────
function Stars() {
  const s = Array.from({ length: 25 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    sz: Math.random() > 0.7 ? 2 : 1.5,
    dur: 2 + Math.random() * 4, delay: Math.random() * 6,
  }));
  return (
    <>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {s.map((st, i) => (
          <div key={i} style={{
            position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
            width: st.sz, height: st.sz, borderRadius: "50%",
            background: "white", opacity: 0,
            animation: `tw ${st.dur}s ease-in-out ${st.delay}s infinite`,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes tw{0%,100%{opacity:0}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}
        @keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
      `}</style>
    </>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(13,31,60,0.75)",
      border: `1px solid ${C.border}`,
      borderRadius: 18, padding: "16px",
      ...style,
    }}>{children}</div>
  );
}

function GLine() {
  return <div style={{
    height: 1, margin: "14px 0",
    background: `linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`,
  }} />;
}

// ── CONTENT RENDERER ──────────────────────────
function ContentBlock({ block, lang }) {
  const style = {
    fadeUp: { animation: "fadeUp 0.5s ease both" },
  };

  switch (block.type) {
    case "badge":
      return (
        <div style={{
          display: "inline-flex", alignItems: "center",
          padding: "5px 12px", borderRadius: 20, marginBottom: 10,
          background: "rgba(77,166,255,0.15)",
          border: `1px solid ${C.blue2}44`,
          fontSize: 11, color: C.blue2, fontWeight: 700,
        }}>{block.text}</div>
      );

    case "title":
      return (
        <h1 style={{
          fontFamily: "'Cinzel',serif", fontSize: 20, fontWeight: 700,
          color: C.white, lineHeight: 1.3, margin: "0 0 16px",
          ...style.fadeUp,
        }}>{block.text}</h1>
      );

    case "intro":
      return (
        <Card style={{ marginBottom: 14, borderLeft: `3px solid ${C.blue2}` }}>
          <div style={{
            fontSize: 14, color: "rgba(240,244,255,0.85)",
            lineHeight: 1.85, whiteSpace: "pre-line",
          }}>{block.text}</div>
        </Card>
      );

    case "section_title":
      return (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          margin: "20px 0 12px",
        }}>
          <span style={{ fontSize: 20 }}>{block.icon}</span>
          <div style={{
            fontFamily: "'Cinzel',serif", fontSize: 12,
            fontWeight: 700, color: C.gold, letterSpacing: 2,
          }}>{block.text}</div>
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg,${C.gold}44,transparent)`,
          }} />
        </div>
      );

    case "content":
      return (
        <Card style={{ marginBottom: 12 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
          }}>
            <span style={{ fontSize: 22 }}>{block.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.white }}>
              {block.title}
            </span>
          </div>
          <div style={{
            fontSize: 13, color: "rgba(240,244,255,0.82)",
            lineHeight: 1.85, whiteSpace: "pre-line",
          }}>{block.text}</div>
        </Card>
      );

    case "keypoint":
      return (
        <div style={{
          background: `linear-gradient(135deg,rgba(201,146,42,0.12),rgba(13,31,60,0.6))`,
          border: `1px solid ${C.gold}44`,
          borderLeft: `3px solid ${C.gold}`,
          borderRadius: 16, padding: "16px", marginBottom: 12,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
          }}>
            <span style={{ fontSize: 20 }}>{block.icon}</span>
            <span style={{
              fontSize: 12, fontWeight: 700, color: C.gold2,
              letterSpacing: 1, fontFamily: "'Cinzel',serif",
            }}>{block.title}</span>
          </div>
          <div style={{
            fontSize: 13, color: C.white,
            lineHeight: 1.85, whiteSpace: "pre-line",
          }}>{block.text}</div>
        </div>
      );

    case "timeline":
      return (
        <div style={{ marginBottom: 14 }}>
          {block.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: 8,
            }}>
              <div style={{
                minWidth: 42, padding: "3px 6px", borderRadius: 8,
                background: `rgba(201,146,42,0.15)`,
                border: `1px solid ${C.gold}44`,
                fontSize: 10, color: C.gold2, fontWeight: 700,
                textAlign: "center", flexShrink: 0,
              }}>{item.year}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, paddingTop: 3 }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      );

    case "formula":
      return (
        <div style={{
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${C.blue2}44`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 12,
        }}>
          <div style={{
            fontSize: 11, color: C.blue2, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 10,
          }}>{block.title}</div>
          {block.lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: line ? 16 : 8,
              color: line ? C.white : "transparent",
              fontWeight: 700, marginBottom: 4,
            }}>{line || "."}</div>
          ))}
        </div>
      );

    case "summary":
      return (
        <Card style={{
          marginBottom: 14,
          background: `linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))`,
          border: `1px solid ${C.blue2}33`,
        }}>
          <div style={{
            fontSize: 11, color: C.blue2, letterSpacing: 3,
            fontFamily: "'Cinzel',serif", marginBottom: 12,
          }}>{block.title}</div>
          {block.points.map((pt, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 0",
              borderBottom: i < block.points.length - 1
                ? "1px solid rgba(255,255,255,0.05)" : "none",
              fontSize: 12, color: C.white,
            }}>
              <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>
              {pt}
            </div>
          ))}
        </Card>
      );

    case "instrument_compass":
      return (
        <Card style={{ marginBottom: 14, textAlign: "center" }}>
          <div style={{
            fontSize: 11, color: C.gold, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 14,
          }}>🧭 COMPAS MAGNÉTIQUE — Interactif</div>
          <CompassSVG />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            L'aiguille rouge pointe toujours vers le nord magnétique. La graduation indique les caps de 0° à 360°. La ligne de foi ▲ en haut indique le cap suivi par le navire.
          </div>
        </Card>
      );

    case "instrument_radar":
      return (
        <Card style={{ marginBottom: 14, textAlign: "center" }}>
          <div style={{
            fontSize: 11, color: C.green, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 14,
          }}>📡 RADAR — Balayage en temps réel</div>
          <RadarSVG />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            La ligne verte balaye à 360°. Les taches lumineuses sont des échos (navires, côtes). Les cercles indiquent les distances. Le navire propre est au centre (●).
          </div>
        </Card>
      );

    case "instrument_gps":
      return (
        <Card style={{ marginBottom: 14, textAlign: "center" }}>
          <div style={{
            fontSize: 11, color: C.blue2, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 14,
          }}>🛰️ GPS — Vue satellites et position</div>
          <GPSDisplay />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            Vue du ciel : les cercles bleus sont les satellites visibles. Les satellites actifs (bleu brillant) participent au calcul de position. La position et la vitesse s'affichent en temps réel.
          </div>
        </Card>
      );

    default:
      return null;
  }
}

// ── QUIZ ──────────────────────────────────────
function Quiz({ questions, lang, t, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const isCorrect = selected === q.correct;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
    setAnswers(a => [...a, { idx, correct: idx === q.correct }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      onComplete(finalScore);
    }
  };

  if (finished) {
    const finalScore = score;
    const pct = Math.round((finalScore / questions.length) * 100);
    const xp = finalScore >= 4 ? 150 : finalScore === 3 ? 100 : 50;
    return (
      <Card style={{ textAlign: "center", border: `1px solid ${pct >= 80 ? C.gold : C.border}` }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, color: C.gold,
          marginBottom: 14, fontFamily: "'Cinzel',serif",
        }}>{t.result}</div>
        <div style={{ fontSize: 52, marginBottom: 8 }}>
          {pct === 100 ? "🏆" : pct >= 80 ? "🎖️" : "📚"}
        </div>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: 28,
          fontWeight: 900, color: C.white, marginBottom: 4,
        }}>{finalScore}/{questions.length}</div>
        <div style={{ fontSize: 13, color: C.gold2, marginBottom: 12 }}>
          {pct === 100 ? "Parfait ! 🌟" : pct >= 80 ? "Excellent ! 💪" : "Continue ! 📚"}
        </div>
        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 20,
          background: "rgba(201,146,42,0.15)",
          border: `1px solid ${C.gold}44`,
          fontSize: 14, color: C.gold2, fontWeight: 700,
        }}>+{xp} {t.xp_earned} ⭐</div>
        <GLine />
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
          {answers.map((a, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: "50%",
              background: a.correct ? C.green : C.red,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 14, color: C.white,
            }}>{a.correct ? "✓" : "✗"}</div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ border: `1px solid ${C.blue2}33` }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 14,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, color: C.blue2,
          fontFamily: "'Cinzel',serif",
        }}>{t.quiz_label}</div>
        <div style={{ fontSize: 12, color: C.muted }}>
          {t.question} {current + 1} {t.of2} {questions.length}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 3,
            background: i < current
              ? (answers[i]?.correct ? C.green : C.red)
              : i === current ? C.blue2 : "rgba(255,255,255,0.1)",
          }} />
        ))}
      </div>

      <div style={{
        fontSize: 15, fontWeight: 700, color: C.white,
        lineHeight: 1.5, marginBottom: 16,
      }}>{q.q}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)";
          let border = "rgba(255,255,255,0.1)";
          let anim = "none";
          if (answered) {
            if (i === q.correct) {
              bg = "rgba(30,138,74,0.2)"; border = C.green;
              anim = "correctPop 0.4s ease";
            } else if (i === selected) {
              bg = "rgba(192,57,43,0.2)"; border = C.red;
              anim = "wrongShake 0.4s ease";
            }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              padding: "13px 14px", borderRadius: 14,
              background: bg, border: `1.5px solid ${border}`,
              color: answered && (i === q.correct || i === selected) ? C.white : C.muted,
              fontSize: 13, textAlign: "left",
              cursor: answered ? "default" : "pointer",
              fontFamily: "'Nunito',sans-serif",
              animation: anim,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                background: answered && i === q.correct ? C.green
                  : answered && i === selected ? C.red
                  : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 12,
                fontWeight: 700, color: C.white,
              }}>
                {answered && i === q.correct ? "✓"
                  : answered && i === selected ? "✗"
                  : String.fromCharCode(65 + i)}
              </div>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{
          padding: "12px 14px", borderRadius: 12, marginBottom: 14,
          background: isCorrect ? "rgba(30,138,74,0.12)" : "rgba(192,57,43,0.1)",
          border: `1px solid ${isCorrect ? C.green : C.red}44`,
          animation: "fadeUp 0.4s ease",
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, marginBottom: 4,
            color: isCorrect ? C.green : C.red,
          }}>{isCorrect ? t.correct : t.wrong}</div>
          <div style={{
            fontSize: 12, color: C.muted, lineHeight: 1.6,
            fontWeight: 600,
          }}>{t.explanation}</div>
          <div style={{ fontSize: 12, color: C.white, lineHeight: 1.6, marginTop: 4 }}>
            {q.expl}
          </div>
        </div>
      )}

      {answered && (
        <button onClick={handleNext} style={{
          width: "100%", padding: "14px 0", border: "none", borderRadius: 14,
          background: `linear-gradient(135deg,${C.blue},${C.gold})`,
          fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700,
          letterSpacing: 2, color: C.white, cursor: "pointer",
          boxShadow: "0 6px 20px rgba(26,111,212,0.35)",
        }}>
          {current < questions.length - 1 ? t.next : t.finish}
        </button>
      )}
    </Card>
  );
}

// ── MEMO DOWNLOAD ─────────────────────────────
function downloadMemo(lang) {
  const canvas = document.createElement("canvas");
  canvas.width = 600; canvas.height = 700;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#060e1a";
  ctx.fillRect(0, 0, 600, 700);

  // Border
  ctx.strokeStyle = "#c9922a";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 580, 680);

  // Title
  ctx.fillStyle = "#e8b94f";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText("FICHE MÉMO — LEÇON 1", 300, 50);
  ctx.fillStyle = "#4da6ff";
  ctx.font = "14px serif";
  ctx.fillText("Navigation & Instruments · Maritime Academy Pro", 300, 75);

  // Divider
  ctx.strokeStyle = "#c9922a";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, 90); ctx.lineTo(570, 90); ctx.stroke();

  const lines = [
    ["#c9922a", "bold 14px serif", "CHRONOLOGIE"],
    ["#f0f4ff", "12px monospace", "3000 av.J.-C. → Phéniciens (côtière aux étoiles)"],
    ["#f0f4ff", "12px monospace", "1100          → Boussole magnétique"],
    ["#f0f4ff", "12px monospace", "1731          → Sextant (latitude)"],
    ["#f0f4ff", "12px monospace", "1762          → Chronomètre (longitude)"],
    ["#f0f4ff", "12px monospace", "1935          → Radar"],
    ["#f0f4ff", "12px monospace", "1983          → GPS civil"],
    ["#f0f4ff", "12px monospace", "2012          → ECDIS obligatoire"],
    ["#c9922a", "bold 14px serif", ""],
    ["#c9922a", "bold 14px serif", "INSTRUMENTS"],
    ["#f0f4ff", "12px monospace", "Compas    → Cap sans électricité, OBLIGATOIRE"],
    ["#f0f4ff", "12px monospace", "Gyrocomp. → Nord vrai, avec électricité"],
    ["#f0f4ff", "12px monospace", "GPS       → Position ± 5m (4 sats min)"],
    ["#f0f4ff", "12px monospace", "ECDIS     → Carte électronique officielle"],
    ["#f0f4ff", "12px monospace", "Radar     → Détection, CPA/TCPA (ARPA)"],
    ["#f0f4ff", "12px monospace", "AIS       → Identification (MMSI unique)"],
    ["#c9922a", "bold 14px serif", ""],
    ["#c9922a", "bold 14px serif", "UNITÉS"],
    ["#f0f4ff", "12px monospace", "1 mn = 1 852 m = 1 minute d'arc latitude"],
    ["#f0f4ff", "12px monospace", "1 nœud = 1 mn/heure"],
    ["#4da6ff", "bold 14px monospace", "D = V × T  |  V = D÷T  |  T = D÷V"],
    ["#f0f4ff", "12px monospace", "1 encablure = 185,2 m (1/10 mn)"],
    ["#c9922a", "bold 14px serif", ""],
    ["#c9922a", "bold 14px serif", "POINTS CARDINAUX"],
    ["#f0f4ff", "12px monospace", "N=000° · E=090° · S=180° · W=270°"],
    ["#f0f4ff", "12px monospace", "NE=045° · SE=135° · SW=225° · NW=315°"],
  ];

  let y = 115;
  lines.forEach(([color, font, text]) => {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = "left";
    if (text) ctx.fillText(text, 30, y);
    y += text ? 22 : 8;
  });

  // Footer
  ctx.fillStyle = "rgba(201,146,42,0.5)";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("maritime-academy-pro.lovable.app", 300, 685);

  // Download
  const link = document.createElement("a");
  link.download = "MAP-Lecon1-Navigation-Memo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ── MAIN LESSON SCREEN ────────────────────────
export default function LessonNavigation({
  lang = "fr",
  onBack = () => { },
  onComplete = () => { },
}) {
  const t = T[lang] || T.fr;
  const content = CONTENT[lang] || CONTENT.fr;
  const quiz = QUIZ[lang] || QUIZ.fr;
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const scrollTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = phase === "content" ? 20
    : phase === "quiz" ? 60
    : phase === "done" ? 100 : 80;

  const learnedPoints = [
    lang === "fr" ? "Histoire : Phéniciens → Polynésiens → Boussole → GPS" :
    lang === "es" ? "Historia: Fenicios → Polinesios → Brújula → GPS" :
    lang === "pt" ? "História: Fenícios → Polinésios → Bússola → GPS" :
    "History: Phoenicians → Polynesians → Compass → GPS",

    lang === "fr" ? "6 instruments : Compas, Gyro, GPS, ECDIS, Radar, AIS" :
    lang === "es" ? "6 instrumentos: Brújula, Giro, GPS, ECDIS, Radar, AIS" :
    lang === "pt" ? "6 instrumentos: Bússola, Giro, GPS, ECDIS, Radar, AIS" :
    "6 instruments: Compass, Gyro, GPS, ECDIS, Radar, AIS",

    "1 mille nautique = 1 852 m",
    "1 nœud = 1 mn/h · D = V × T",
    lang === "fr" ? "N=000° E=090° S=180° W=270°" :
    "N=000° E=090° S=180° W=270°",
  ];

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: `linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color: C.white, fontFamily: "'Nunito',sans-serif",
      overflow: "hidden", position: "relative",
    }}>
      <Stars />

      {/* TOPBAR */}
      <div style={{
        position: "relative", zIndex: 100,
        background: "rgba(6,14,26,0.97)", backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          height: 54, display: "flex", alignItems: "center",
          padding: "0 16px", gap: 12,
        }}>
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.09)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 10, padding: "8px 14px",
            color: C.white, fontSize: 13, fontWeight: 700,
            cursor: "pointer", flexShrink: 0,
            fontFamily: "'Nunito',sans-serif",
          }}>{t.back}</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 10, color: C.gold, letterSpacing: 1,
              fontFamily: "'Cinzel',serif", marginBottom: 1,
            }}>{t.module}</div>
            <div style={{ fontSize: 11, color: C.muted }}>
              {t.lesson} 1/8
            </div>
          </div>
          <div style={{
            fontSize: 11, color: C.blue2,
            fontFamily: "'Cinzel',serif", letterSpacing: 1, flexShrink: 0,
          }}>{progress}%</div>
        </div>
        <div style={{
          height: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg,${C.blue2},${C.gold2})`,
            transition: "width 0.5s ease",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: "40%",
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
              animation: "shimmer 2s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      {/* SCROLLABLE */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", padding: "20px 16px 40px",
        position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)",
        transition: "all 0.5s ease",
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>

          {/* CONTENT PHASE */}
          {phase === "content" && (
            <>
              {content.map((block, i) => (
                <ContentBlock key={i} block={block} lang={lang} />
              ))}
              <button onClick={() => { setPhase("quiz"); scrollTop(); }} style={{
                width: "100%", padding: "17px 0", border: "none", borderRadius: 16,
                background: `linear-gradient(135deg,${C.blue},${C.gold})`,
                fontFamily: "'Cinzel',serif", fontSize: 15, fontWeight: 700,
                letterSpacing: 2, color: C.white, cursor: "pointer",
                boxShadow: "0 10px 36px rgba(26,111,212,0.4)", marginTop: 8,
              }}>{t.start_quiz}</button>
              <div style={{
                textAlign: "center", fontSize: 11, color: C.muted, marginTop: 8,
              }}>{t.read_content}</div>
            </>
          )}

          {/* QUIZ PHASE */}
          {phase === "quiz" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: 18,
                  fontWeight: 700, color: C.white, marginBottom: 4,
                }}>
                  {lang === "fr" ? "Teste tes connaissances" :
                   lang === "es" ? "Pon a prueba tus conocimientos" :
                   lang === "pt" ? "Teste seus conhecimentos" :
                   "Test your knowledge"}
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>
                  {lang === "fr" ? "5 questions · Leçon 1" :
                   lang === "es" ? "5 preguntas · Lección 1" :
                   lang === "pt" ? "5 perguntas · Lição 1" :
                   "5 questions · Lesson 1"}
                </div>
              </div>
              <Quiz
                questions={quiz} lang={lang} t={t}
                onComplete={(score) => {
                  setQuizScore(score);
                  setTimeout(() => { setPhase("done"); scrollTop(); }, 1200);
                }}
              />
            </>
          )}

          {/* DONE PHASE */}
          {phase === "done" && (
            <div style={{ paddingTop: 10 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 64, marginBottom: 10 }}>🏅</div>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: 22,
                  fontWeight: 700, color: C.white, marginBottom: 8,
                }}>{t.lesson_complete}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 20px", borderRadius: 20, marginBottom: 4,
                  background: "rgba(201,146,42,0.15)",
                  border: `1px solid ${C.gold}55`,
                  fontSize: 14, color: C.gold2, fontWeight: 700,
                }}>
                  +{quizScore >= 4 ? 150 : quizScore === 3 ? 100 : 50} {t.xp_earned} ⭐
                </div>
              </div>

              <Card style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 11, color: C.muted, marginBottom: 10,
                  fontFamily: "'Cinzel',serif", letterSpacing: 1,
                }}>{t.you_learned}</div>
                {learnedPoints.map((pt, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "7px 0",
                    borderBottom: i < learnedPoints.length - 1
                      ? "1px solid rgba(255,255,255,0.05)" : "none",
                    fontSize: 13, color: C.white,
                  }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span>
                    {pt}
                  </div>
                ))}
              </Card>

              {/* Download memo */}
              <button onClick={() => downloadMemo(lang)} style={{
                width: "100%", padding: "13px 0", border: "none", borderRadius: 14,
                background: `linear-gradient(135deg,${C.gold},${C.orange})`,
                fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700,
                letterSpacing: 1, color: C.white, cursor: "pointer",
                marginBottom: 10,
              }}>{t.download_memo}</button>

              <button onClick={onComplete} style={{
                width: "100%", padding: "16px 0", border: "none", borderRadius: 16,
                background: `linear-gradient(135deg,${C.blue},${C.gold})`,
                fontFamily: "'Cinzel',serif", fontSize: 14, fontWeight: 700,
                letterSpacing: 2, color: C.white, cursor: "pointer",
                boxShadow: "0 8px 28px rgba(26,111,212,0.4)", marginBottom: 10,
              }}>
                {lang === "fr" ? "LEÇON 2 — LE NAVIRE →" :
                 lang === "es" ? "LECCIÓN 2 — EL BUQUE →" :
                 lang === "pt" ? "LIÇÃO 2 — O NAVIO →" :
                 "LESSON 2 — THE SHIP →"}
              </button>
              <button onClick={onBack} style={{
                width: "100%", padding: "12px 0",
                border: `1px solid rgba(255,255,255,0.15)`,
                borderRadius: 14, background: "transparent",
                fontFamily: "'Nunito',sans-serif", fontSize: 13,
                fontWeight: 600, color: C.muted, cursor: "pointer",
              }}>{t.back_dash}</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
