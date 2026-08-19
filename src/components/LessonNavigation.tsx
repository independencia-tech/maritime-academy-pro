import { useState, useEffect, useRef } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

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
function CompassSVG({ heading = 0, lang = "fr" }) {
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
        {lang === "fr" ? "Cap" : lang === "es" ? "Rumbo" : lang === "pt" ? "Rumo" : "Heading"} : {Math.round(currentHeading).toString().padStart(3, "0")}°
      </div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
        {lang === "fr" ? "🧭 Compas magnétique — Ligne de foi ↑" :
         lang === "es" ? "🧭 Compás magnético — Línea de fe ↑" :
         lang === "pt" ? "🧭 Bússola magnética — Linha de fé ↑" :
         "🧭 Magnetic compass — Lubber line ↑"}
      </div>
    </div>
  );
}

// ── RADAR ─────────────────────────────────────
function RadarSVG({ lang = "fr" }) {
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
        {lang === "fr" ? "📡 Radar — Portée 12 mn · 4 échos détectés" :
         lang === "es" ? "📡 Radar — Alcance 12 mn · 4 ecos detectados" :
         lang === "pt" ? "📡 Radar — Alcance 12 mn · 4 ecos detetados" :
         "📡 Radar — Range 12 nm · 4 echoes detected"}
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
          lang === "fr" ? "satellites actifs" :
          lang === "es" ? "satélites activos" :
          lang === "pt" ? "satélites ativos" :
          "active satellites"
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
    { type: "exercise" },
    { type: "bank" },
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
  en: [
    { type: "badge", text: "📚 Navigation & Cartography · Lesson 1 · ~15 min · ⭐ 150 XP" },
    { type: "title", text: "History & Navigation Instruments" },
    { type: "intro",
      text: "Ever since humans first stood on the shores of the sea, they have wanted to cross it. At first out of necessity — fishing, trading, migrating. Then out of curiosity — to discover what lies on the other side. Today, as a profession.\n\nGlobal maritime trade accounts for 90% of world trade, with 50,000 vessels permanently at sea and 1.9 million active seafarers. As a seafarer, you are part of this vital chain." },
    { type: "section_title", icon: "📜", text: "PART 1 — History of Navigation" },
    { type: "content", icon: "🏛️", title: "The Phoenicians — 3000 BC",
      text: "The Phoenicians, established on the coasts of present-day Lebanon, were history's first great commercial navigators. Their technique: coastal navigation — keeping the coast in sight and orienting themselves using landmarks (recognizable points along the shore).\n\nAt night, they used the North Star — Polaris — which remains nearly fixed in the sky and points precisely north.\n\n🔍 Fun fact: The Phoenicians reportedly circumnavigated Africa around 600 BC, some 2000 years before Vasco da Gama." },
    { type: "content", icon: "🌊", title: "The Polynesians — The Pacific Feat",
      text: "The most extraordinary feat of navigation in history: the Polynesians colonized the vastness of the Pacific — Hawaii, New Zealand, Easter Island — over 5,000 km, in canoes, WITHOUT any instrument.\n\nTheir know-how:\n• Over 150 stars memorized\n• Reading waves and currents\n• Observing seabirds\n• Bamboo stick charts\n\n💡 What this teaches us: Navigation is above all a science of observation. These skills remain valuable today." },
    { type: "keypoint", icon: "🧲", title: "The Compass — 11th Century",
      text: "Invented in China around 1100, it reached Europe via the Arabs around 1180.\n\nPrinciple: The Earth is a giant magnet. A magnetized needle, free to rotate, aligns with the Earth's magnetic field and points toward magnetic north.\n\n⚠️ Important point: Magnetic north ≠ true north. The difference is called magnetic variation. It varies by location on Earth and must be corrected by the navigator (Lesson 5)." },
    { type: "content", icon: "🔭", title: "Sextant (1731) & Chronometer (1762)",
      text: "The sextant measures the angle between a celestial body and the horizon, allowing latitude to be calculated.\n\nBut longitude remained a mystery until 1762, when John Harrison invented the H4 marine chronometer — a watch that kept exact time despite the ship's movements.\n\nBy combining sextant + chronometer: a complete position (lat + lon) could be calculated at sea for the first time.\n\n💡 The British Parliament offered £20,000 in 1714 to whoever solved the longitude problem. It took Harrison 40 years to convince the judges." },
    { type: "timeline",
      items: [
        { year: "1100", text: "Magnetic compass (China → Europe)" },
        { year: "1731", text: "Sextant — precise latitude calculation" },
        { year: "1762", text: "Harrison's chronometer — longitude solved" },
        { year: "1935", text: "Radar — seeing through fog" },
        { year: "1978", text: "First GPS satellite launched" },
        { year: "1983", text: "GPS opened to civilians (Reagan)" },
        { year: "2012", text: "ECDIS mandatory > 500 GT (IMO)" },
      ]
    },
    { type: "section_title", icon: "🎛️", text: "PART 2 — Modern Instruments" },
    { type: "instrument_compass" },
    { type: "content", icon: "🧭", title: "The Magnetic Compass — Mandatory Instrument",
      text: "Composition: Compass card graduated from 0° to 360°, mounted on a pivot, immersed in a damping liquid.\n\nThe lubber line: a fixed reference aligned with the ship's centerline. The graduation facing it indicates the heading.\n\nCardinal points and their degrees:\n• North (N) = 000°\n• East (E) = 090°\n• South (S) = 180°\n• West (W) = 270°\n• Northeast (NE) = 045°\n• Southeast (SE) = 135°\n• Southwest (SW) = 225°\n• Northwest (NW) = 315°\n\n🔑 Golden rule: The only instrument that works without electricity. MANDATORY on every ship (SOLAS)." },
    { type: "instrument_radar" },
    { type: "content", icon: "📡", title: "Radar — Seeing the Invisible",
      text: "Principle: The antenna (20-30 rpm) emits radio wave pulses. They reflect off obstacles and return. Return time × speed of light ÷ 2 = distance.\n\nTypical ranges:\n• 0.25 nm → port maneuvering\n• 6 nm → coastal navigation\n• 12 nm → ocean navigation\n• 96 nm → long-range surveillance\n\nARPA (Automatic Radar Plotting Aid):\nAutomatically calculates for each echo:\n• CPA — closest point of approach\n• TCPA — time to that critical point\n• Alarm if collision risk\n\n⚠️ COLREG rule: Never rely blindly on ARPA. A visual lookout remains mandatory." },
    { type: "instrument_gps" },
    { type: "content", icon: "🛰️", title: "GPS — Worldwide Position",
      text: "Architecture: 31 active satellites at 20,200 km altitude. At least 4 satellites visible from any point on Earth.\n\nPrinciple: Each satellite broadcasts its identity, position and exact time. The receiver calculates the distance to each satellite → triangulation → exact position.\n\nAccuracy: ± 5 to 10 meters (standard civilian GPS)\n\nOther satellite systems:\n• GLONASS (Russia) — 24 sats\n• Galileo (Europe) — 30 sats\n• BeiDou (China) — 35 sats\n\n⚠️ Vulnerabilities: Jamming, spoofing, power failure. That's why the magnetic compass and dead reckoning remain mandatory STCW skills." },
    { type: "content", icon: "🗺️", title: "ECDIS — The Official Electronic Chart",
      text: "ECDIS combines: ENC (official vector chart) + real-time GPS + AIS data + safety alarms + route recording.\n\nIMO requirement:\n• Passenger ships > 500 GT → 1 July 2012\n• Tankers > 3,000 GT → 1 July 2012\n• Cargo ships > 10,000 GT → 1 July 2013\n• Cargo ships 3,000-10,000 GT → 1 July 2014\n• Cargo ships 500-3,000 GT → 1 July 2015\n\nTypes of electronic charts:\n• ENC (S-57): official, legally approved ✅\n• RNC: scanned paper chart, not approved alone ⚠️" },
    { type: "content", icon: "📻", title: "AIS — Automatic Identification",
      text: "Every AIS-equipped ship automatically broadcasts on VHF:\n\nStatic data: MMSI number (unique 9-digit identifier), name, type, dimensions\n\nDynamic data: GPS position, speed over ground (SOG), course over ground (COG), heading (HDG), rate of turn\n\nVoyage data: Draught, destination, ETA\n\nRange: 20-30 nm on the surface · Worldwide via satellite (AIS-SAT)\n\nRequirements:\n• Class A: All ships > 300 GT on international voyage\n• Class B: Non-SOLAS ships, pleasure craft > 15m" },
    { type: "section_title", icon: "📏", text: "PART 3 — Units of Measurement" },
    { type: "keypoint", icon: "📐", title: "The Nautical Mile",
      text: "1 nautical mile (nm) = 1,852 meters\n\nOrigin: 1 minute of arc of latitude on the Earth's meridian. Brilliant for navigation: to measure a distance on a nautical chart, you transfer the segment onto the latitude scale. 1 minute of latitude = 1 nautical mile.\n\nComparisons:\n• 1 nm = 1,852 m\n• 1 km = 1,000 m\n• 1 statute mile = 1,609 m\n• 1 cable = 185.2 m (1/10 of a nm)" },
    { type: "keypoint", icon: "⚓", title: "The Knot",
      text: "1 knot (kn) = 1 nautical mile per hour\n\nHistorical origin: A log line with knots every 14.4 m. The line was paid out for 30 seconds. The number of knots that passed = speed in knots.\n\nTypical speeds:\n• VLCC tanker: 14-16 kn\n• Container ship: 18-24 kn\n• Bulk carrier: 12-15 kn\n• Cruise ship: 20-24 kn\n• Fast ferry: 30-40 kn\n\nDST formula: D = V × T" },
    { type: "formula",
      title: "The Fundamental DST Formula",
      lines: [
        "D = V × T",
        "V = D ÷ T",
        "T = D ÷ V",
        "",
        "Example: 16 kn × 4.5 h = 72 nm",
      ]
    },
    { type: "exercise" },
    { type: "bank" },
    { type: "summary",
      title: "LESSON SUMMARY",
      points: [
        "Phoenicians → coastal, by stars (3000 BC)",
        "Polynesians → reading waves and stars",
        "Compass → magnetic north (1100)",
        "GPS → position ± 5m, minimum 4 satellites",
        "ECDIS → mandatory > 500 GT since 2012",
        "1 nautical mile = 1,852 m = 1' of latitude",
        "1 knot = 1 nm/h · D = V × T",
        "N=000° E=090° S=180° W=270°",
      ]
    },
  ],
  es: [
    { type: "badge", text: "📚 Navegación y Cartografía · Lección 1 · ~15 min · ⭐ 150 XP" },
    { type: "title", text: "Historia e Instrumentos de Navegación" },
    { type: "intro",
      text: "Desde que el hombre pisó las orillas del mar, ha querido cruzarlo. Primero por necesidad — pescar, comerciar, migrar. Luego por curiosidad — descubrir lo que hay al otro lado. Hoy, como profesión.\n\nEl comercio marítimo mundial representa el 90% de los intercambios comerciales mundiales, con 50 000 buques en circulación permanente y 1,9 millones de marinos en activo. Tú, como marino, formas parte de esta cadena vital." },
    { type: "section_title", icon: "📜", text: "PARTE 1 — Historia de la Navegación" },
    { type: "content", icon: "🏛️", title: "Los Fenicios — 3000 a.C.",
      text: "Los fenicios, establecidos en las costas del actual Líbano, fueron los primeros grandes navegantes comerciales de la historia. Su técnica: la navegación costera — mantener la costa a la vista y orientarse mediante marcas terrestres (puntos destacados en la costa).\n\nDe noche, usaban la estrella polar — Polaris — que permanece casi fija en el cielo e indica el norte con precisión.\n\n🔍 Anécdota: Se dice que los fenicios circunnavegaron África hacia el 600 a.C., unos 2000 años antes que Vasco da Gama." },
    { type: "content", icon: "🌊", title: "Los Polinesios — La hazaña del Pacífico",
      text: "La hazaña de navegación más extraordinaria de la historia: los polinesios colonizaron la inmensidad del Pacífico — Hawái, Nueva Zelanda, Isla de Pascua — a lo largo de 5000 km, en piraguas, SIN ningún instrumento.\n\nSu saber hacer:\n• Más de 150 estrellas memorizadas\n• Lectura de olas y corrientes\n• Observación de aves marinas\n• Mapas de varillas de bambú\n\n💡 Lo que esto nos enseña: La navegación es ante todo una ciencia de la observación. Estas cualidades siguen siendo valiosas hoy en día." },
    { type: "keypoint", icon: "🧲", title: "La Brújula — Siglo XI",
      text: "Inventada en China hacia 1100, llegó a Europa a través de los árabes hacia 1180.\n\nPrincipio: La Tierra es un imán gigantesco. Una aguja imantada, libre de girar, se alinea con el campo magnético terrestre y apunta hacia el norte magnético.\n\n⚠️ Punto importante: El norte magnético ≠ norte geográfico. La diferencia se llama declinación magnética. Varía según el lugar en la Tierra y debe ser corregida por el marino (Lección 5)." },
    { type: "content", icon: "🔭", title: "Sextante (1731) y Cronómetro (1762)",
      text: "El sextante mide el ángulo entre un astro y el horizonte, permitiendo calcular la latitud.\n\nPero la longitud siguió siendo un misterio hasta 1762, cuando John Harrison inventó el cronómetro marino H4 — un reloj que mantenía la hora exacta a pesar de los movimientos del buque.\n\nCombinando sextante + cronómetro: por primera vez se podía calcular en el mar una posición completa (lat + lon).\n\n💡 El Parlamento británico ofreció 20 000 libras en 1714 a quien resolviera el problema de la longitud. A Harrison le llevó 40 años convencer a los jueces." },
    { type: "timeline",
      items: [
        { year: "1100", text: "Brújula magnética (China → Europa)" },
        { year: "1731", text: "Sextante — cálculo preciso de latitud" },
        { year: "1762", text: "Cronómetro de Harrison — longitud resuelta" },
        { year: "1935", text: "Radar — ver en la niebla" },
        { year: "1978", text: "Lanzamiento del primer satélite GPS" },
        { year: "1983", text: "GPS abierto a civiles (Reagan)" },
        { year: "2012", text: "ECDIS obligatorio > 500 GT (OMI)" },
      ]
    },
    { type: "section_title", icon: "🎛️", text: "PARTE 2 — Los Instrumentos Modernos" },
    { type: "instrument_compass" },
    { type: "content", icon: "🧭", title: "El Compás Magnético — Instrumento obligatorio",
      text: "Composición: Rosa de los vientos graduada de 0° a 360°, montada sobre un pivote, sumergida en un líquido amortiguador.\n\nLa línea de fe: referencia fija alineada con el eje del buque. La graduación enfrente indica el rumbo.\n\nPuntos cardinales y sus grados:\n• Norte (N) = 000°\n• Este (E) = 090°\n• Sur (S) = 180°\n• Oeste (W) = 270°\n• Nordeste (NE) = 045°\n• Sudeste (SE) = 135°\n• Sudoeste (SW) = 225°\n• Noroeste (NW) = 315°\n\n🔑 Regla de oro: El único instrumento que funciona sin electricidad. OBLIGATORIO en todo buque (SOLAS)." },
    { type: "instrument_radar" },
    { type: "content", icon: "📡", title: "El Radar — Ver lo invisible",
      text: "Principio: La antena (20-30 vueltas/minuto) emite impulsos de ondas de radio. Se reflejan en los obstáculos y regresan. Tiempo de retorno × velocidad de la luz ÷ 2 = distancia.\n\nAlcances típicos:\n• 0,25 mn → maniobra portuaria\n• 6 mn → navegación costera\n• 12 mn → navegación de altura\n• 96 mn → vigilancia de largo alcance\n\nARPA (Automatic Radar Plotting Aid):\nCalcula automáticamente para cada eco:\n• CPA — distancia mínima de paso\n• TCPA — tiempo hasta ese punto crítico\n• Alarma si hay riesgo de abordaje\n\n⚠️ Regla COLREG: Nunca confiar ciegamente en el ARPA. La vigilancia visual sigue siendo obligatoria." },
    { type: "instrument_gps" },
    { type: "content", icon: "🛰️", title: "El GPS — Posición mundial",
      text: "Arquitectura: 31 satélites activos a 20 200 km de altitud. Al menos 4 satélites visibles desde cualquier punto de la Tierra.\n\nPrincipio: Cada satélite emite su identidad, posición y hora exacta. El receptor calcula la distancia a cada satélite → triangulación → posición exacta.\n\nPrecisión: ± 5 a 10 metros (GPS civil estándar)\n\nOtros sistemas de satélites:\n• GLONASS (Rusia) — 24 sats\n• Galileo (Europa) — 30 sats\n• BeiDou (China) — 35 sats\n\n⚠️ Vulnerabilidades: Jamming (interferencia), spoofing (suplantación), fallo eléctrico. Por eso la brújula magnética y la navegación estimada siguen siendo competencias STCW obligatorias." },
    { type: "content", icon: "🗺️", title: "El ECDIS — La carta electrónica oficial",
      text: "El ECDIS combina: ENC (carta oficial vectorial) + GPS en tiempo real + datos AIS + alarmas de seguridad + registro de ruta.\n\nObligación OMI:\n• Pasaje > 500 GT → 1 de julio de 2012\n• Petroleros > 3000 GT → 1 de julio de 2012\n• Carga > 10 000 GT → 1 de julio de 2013\n• Carga 3-10 000 GT → 1 de julio de 2014\n• Carga 500-3000 GT → 1 de julio de 2015\n\nTipos de cartas electrónicas:\n• ENC (S-57): oficial, legalmente aprobada ✅\n• RNC: escaneo de carta en papel, no aprobada por sí sola ⚠️" },
    { type: "content", icon: "📻", title: "El AIS — Identificación automática",
      text: "Todo buque equipado con AIS difunde automáticamente por VHF:\n\nDatos estáticos: Número MMSI (identificador único de 9 dígitos), nombre, tipo, dimensiones\n\nDatos dinámicos: Posición GPS, velocidad (SOG), rumbo sobre el fondo (COG), rumbo verdadero (HDG), tasa de giro\n\nDatos de viaje: Calado, destino, ETA\n\nAlcance: 20-30 mn en superficie · Mundial vía satélite (AIS-SAT)\n\nObligaciones:\n• Clase A: Todo buque > 300 GT en viaje internacional\n• Clase B: Buques no SOLAS, embarcaciones de recreo > 15m" },
    { type: "section_title", icon: "📏", text: "PARTE 3 — Unidades de Medida" },
    { type: "keypoint", icon: "📐", title: "La Milla Náutica",
      text: "1 milla náutica (mn) = 1852 metros\n\nOrigen: 1 minuto de arco de latitud en el meridiano terrestre. Genial para la navegación: para medir una distancia en una carta náutica, se traslada el segmento a la escala de latitud. 1 minuto de latitud = 1 milla náutica.\n\nComparaciones:\n• 1 mn = 1852 m\n• 1 km = 1000 m\n• 1 milla terrestre = 1609 m\n• 1 cable = 185,2 m (1/10 de mn)" },
    { type: "keypoint", icon: "⚓", title: "El Nudo",
      text: "1 nudo (kn) = 1 milla náutica por hora\n\nOrigen histórico: Corredera de barquilla con nudos cada 14,4 m. Se soltaba la cuerda 30 segundos. El número de nudos que pasaban = velocidad en nudos.\n\nVelocidades típicas:\n• Petrolero VLCC: 14-16 kn\n• Portacontenedores: 18-24 kn\n• Granelero: 12-15 kn\n• Crucero: 20-24 kn\n• Ferry rápido: 30-40 kn\n\nFórmula DVT: D = V × T" },
    { type: "formula",
      title: "Fórmula Fundamental DVT",
      lines: [
        "D = V × T",
        "V = D ÷ T",
        "T = D ÷ V",
        "",
        "Ejemplo: 16 kn × 4,5 h = 72 mn",
      ]
    },
    { type: "exercise" },
    { type: "bank" },
    { type: "summary",
      title: "RESUMEN DE LA LECCIÓN",
      points: [
        "Fenicios → costera guiándose por estrellas (3000 a.C.)",
        "Polinesios → lectura de olas y estrellas",
        "Brújula → norte magnético (1100)",
        "GPS → posición ± 5m, mínimo 4 satélites",
        "ECDIS → obligatorio > 500 GT desde 2012",
        "1 milla náutica = 1852 m = 1' de latitud",
        "1 nudo = 1 mn/h · D = V × T",
        "N=000° E=090° S=180° W=270°",
      ]
    },
  ],
  pt: [
    { type: "badge", text: "📚 Navegação e Cartografia · Lição 1 · ~15 min · ⭐ 150 XP" },
    { type: "title", text: "História e Instrumentos de Navegação" },
    { type: "intro",
      text: "Desde que o homem pisou as margens do mar, quis atravessá-lo. Primeiro por necessidade — pescar, comerciar, migrar. Depois por curiosidade — descobrir o que existe do outro lado. Hoje, por profissão.\n\nO comércio marítimo mundial representa 90% das trocas comerciais mundiais, com 50 000 navios em circulação permanente e 1,9 milhões de marítimos em atividade. Tu, como marítimo, fazes parte desta cadeia vital." },
    { type: "section_title", icon: "📜", text: "PARTE 1 — História da Navegação" },
    { type: "content", icon: "🏛️", title: "Os Fenícios — 3000 a.C.",
      text: "Os fenícios, estabelecidos nas costas do atual Líbano, foram os primeiros grandes navegadores comerciais da história. A sua técnica: a navegação costeira — manter a costa à vista e orientar-se por amers (pontos notáveis da costa).\n\nÀ noite, usavam a estrela polar — Polaris — que permanece quase fixa no céu e indica o norte com precisão.\n\n🔍 Curiosidade: Os fenícios terão contornado a África por volta de 600 a.C., cerca de 2000 anos antes de Vasco da Gama." },
    { type: "content", icon: "🌊", title: "Os Polinésios — O feito do Pacífico",
      text: "O feito de navegação mais extraordinário da história: os polinésios colonizaram a imensidão do Pacífico — Havai, Nova Zelândia, Ilha de Páscoa — ao longo de 5000 km, em canoas, SEM qualquer instrumento.\n\nO seu saber-fazer:\n• Mais de 150 estrelas memorizadas\n• Leitura das ondas e correntes\n• Observação de aves marinhas\n• Mapas de varas de bambu\n\n💡 O que isto nos ensina: A navegação é acima de tudo uma ciência da observação. Estas qualidades continuam preciosas hoje." },
    { type: "keypoint", icon: "🧲", title: "A Bússola — Século XI",
      text: "Inventada na China por volta de 1100, chegou à Europa através dos árabes por volta de 1180.\n\nPrincípio: A Terra é um gigantesco íman. Uma agulha imantada, livre para girar, alinha-se com o campo magnético terrestre e aponta para o norte magnético.\n\n⚠️ Ponto importante: O norte magnético ≠ norte geográfico. A diferença chama-se declinação magnética. Varia consoante o local na Terra e deve ser corrigida pelo marítimo (Lição 5)." },
    { type: "content", icon: "🔭", title: "Sextante (1731) e Cronómetro (1762)",
      text: "O sextante mede o ângulo entre um astro e o horizonte, permitindo calcular a latitude.\n\nMas a longitude permaneceu um mistério até 1762, quando John Harrison inventou o cronómetro marítimo H4 — um relógio que mantinha a hora exata apesar dos movimentos do navio.\n\nCombinando sextante + cronómetro: pela primeira vez podia calcular-se no mar uma posição completa (lat + lon).\n\n💡 O Parlamento britânico ofereceu £20 000 em 1714 a quem resolvesse o problema da longitude. Harrison levou 40 anos a convencer os juízes." },
    { type: "timeline",
      items: [
        { year: "1100", text: "Bússola magnética (China → Europa)" },
        { year: "1731", text: "Sextante — cálculo preciso de latitude" },
        { year: "1762", text: "Cronómetro de Harrison — longitude resolvida" },
        { year: "1935", text: "Radar — ver no nevoeiro" },
        { year: "1978", text: "Lançamento do primeiro satélite GPS" },
        { year: "1983", text: "GPS aberto a civis (Reagan)" },
        { year: "2012", text: "ECDIS obrigatório > 500 GT (OMI)" },
      ]
    },
    { type: "section_title", icon: "🎛️", text: "PARTE 2 — Os Instrumentos Modernos" },
    { type: "instrument_compass" },
    { type: "content", icon: "🧭", title: "A Bússola Magnética — Instrumento obrigatório",
      text: "Composição: Rosa dos ventos graduada de 0° a 360°, montada sobre um pivô, imersa num líquido amortecedor.\n\nA linha de fé: referência fixa alinhada com o eixo do navio. A graduação em frente indica o rumo.\n\nPontos cardeais e os seus graus:\n• Norte (N) = 000°\n• Este (E) = 090°\n• Sul (S) = 180°\n• Oeste (W) = 270°\n• Nordeste (NE) = 045°\n• Sudeste (SE) = 135°\n• Sudoeste (SW) = 225°\n• Noroeste (NW) = 315°\n\n🔑 Regra de ouro: Único instrumento que funciona sem eletricidade. OBRIGATÓRIA em todo o navio (SOLAS)." },
    { type: "instrument_radar" },
    { type: "content", icon: "📡", title: "O Radar — Ver o invisível",
      text: "Princípio: A antena (20-30 voltas/minuto) emite impulsos de ondas de rádio. Refletem-se nos obstáculos e regressam. Tempo de retorno × velocidade da luz ÷ 2 = distância.\n\nAlcances típicos:\n• 0,25 mn → manobra portuária\n• 6 mn → navegação costeira\n• 12 mn → navegação oceânica\n• 96 mn → vigilância de longo alcance\n\nARPA (Automatic Radar Plotting Aid):\nCalcula automaticamente para cada eco:\n• CPA — distância mínima de passagem\n• TCPA — tempo até esse ponto crítico\n• Alarme se houver risco de abalroamento\n\n⚠️ Regra COLREG: Nunca confiar cegamente no ARPA. A vigia visual continua obrigatória." },
    { type: "instrument_gps" },
    { type: "content", icon: "🛰️", title: "O GPS — Posição mundial",
      text: "Arquitetura: 31 satélites ativos a 20 200 km de altitude. Pelo menos 4 satélites visíveis a partir de qualquer ponto da Terra.\n\nPrincípio: Cada satélite emite a sua identidade, posição e hora exata. O recetor calcula a distância a cada satélite → triangulação → posição exata.\n\nPrecisão: ± 5 a 10 metros (GPS civil padrão)\n\nOutros sistemas de satélites:\n• GLONASS (Rússia) — 24 sats\n• Galileo (Europa) — 30 sats\n• BeiDou (China) — 35 sats\n\n⚠️ Vulnerabilidades: Jamming (interferência), spoofing (falsificação), falha elétrica. Por isso a bússola magnética e a navegação estimada continuam competências STCW obrigatórias." },
    { type: "content", icon: "🗺️", title: "O ECDIS — A carta eletrónica oficial",
      text: "O ECDIS combina: ENC (carta oficial vetorial) + GPS em tempo real + dados AIS + alarmes de segurança + registo de rota.\n\nObrigação OMI:\n• Passageiros > 500 GT → 1 de julho de 2012\n• Petroleiros > 3000 GT → 1 de julho de 2012\n• Carga > 10 000 GT → 1 de julho de 2013\n• Carga 3-10 000 GT → 1 de julho de 2014\n• Carga 500-3000 GT → 1 de julho de 2015\n\nTipos de cartas eletrónicas:\n• ENC (S-57): oficial, legalmente aprovada ✅\n• RNC: digitalização de carta em papel, não aprovada sozinha ⚠️" },
    { type: "content", icon: "📻", title: "O AIS — Identificação automática",
      text: "Todo o navio equipado com AIS transmite automaticamente em VHF:\n\nDados estáticos: Número MMSI (identificador único de 9 dígitos), nome, tipo, dimensões\n\nDados dinâmicos: Posição GPS, velocidade (SOG), rumo sobre o fundo (COG), rumo verdadeiro (HDG), taxa de guinada\n\nDados de viagem: Calado, destino, ETA\n\nAlcance: 20-30 mn à superfície · Mundial via satélite (AIS-SAT)\n\nObrigações:\n• Classe A: Todo o navio > 300 GT em viagem internacional\n• Classe B: Navios não SOLAS, embarcações de recreio > 15m" },
    { type: "section_title", icon: "📏", text: "PARTE 3 — Unidades de Medida" },
    { type: "keypoint", icon: "📐", title: "A Milha Náutica",
      text: "1 milha náutica (mn) = 1852 metros\n\nOrigem: 1 minuto de arco de latitude no meridiano terrestre. Genial para a navegação: para medir uma distância numa carta náutica, transporta-se o segmento para a escala de latitude. 1 minuto de latitude = 1 milha náutica.\n\nComparações:\n• 1 mn = 1852 m\n• 1 km = 1000 m\n• 1 milha terrestre = 1609 m\n• 1 cabo = 185,2 m (1/10 de mn)" },
    { type: "keypoint", icon: "⚓", title: "O Nó",
      text: "1 nó (kn) = 1 milha náutica por hora\n\nOrigem histórica: Corrediça de barquinha com nós a cada 14,4 m. A linha era largada durante 30 segundos. O número de nós que passavam = velocidade em nós.\n\nVelocidades típicas:\n• Petroleiro VLCC: 14-16 kn\n• Porta-contentores: 18-24 kn\n• Graneleiro: 12-15 kn\n• Cruzeiro: 20-24 kn\n• Ferry rápido: 30-40 kn\n\nFórmula DVT: D = V × T" },
    { type: "formula",
      title: "Fórmula Fundamental DVT",
      lines: [
        "D = V × T",
        "V = D ÷ T",
        "T = D ÷ V",
        "",
        "Exemplo: 16 kn × 4,5 h = 72 mn",
      ]
    },
    { type: "exercise" },
    { type: "bank" },
    { type: "summary",
      title: "RESUMO DA LIÇÃO",
      points: [
        "Fenícios → costeira pelas estrelas (3000 a.C.)",
        "Polinésios → leitura de ondas e estrelas",
        "Bússola → norte magnético (1100)",
        "GPS → posição ± 5m, mínimo 4 satélites",
        "ECDIS → obrigatório > 500 GT desde 2012",
        "1 milha náutica = 1852 m = 1' de latitude",
        "1 nó = 1 mn/h · D = V × T",
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
  en: [
    {
      q: "Which people colonized the Pacific over 5,000 km with no instrument at all?",
      opts: ["The Phoenicians","The Vikings","The Polynesians","The Arabs"],
      correct: 2,
      expl: "The Polynesians colonized Hawaii, New Zealand and Easter Island by reading stars, waves and birds — with no instrument at all.",
    },
    {
      q: "Why was the invention of the marine chronometer (1762) revolutionary?",
      opts: ["It measured the ship's speed","It gave the time in every port","It allowed longitude to be calculated","It replaced the sextant"],
      correct: 2,
      expl: "Knowing the exact time lets you calculate the difference from local time (sun), and therefore longitude. Before Harrison, longitude at sea was a mystery.",
    },
    {
      q: "A ship sails at 18 knots for 3h30. What distance has it covered?",
      opts: ["54 nautical miles","63 nautical miles","72 nautical miles","84 nautical miles"],
      correct: 1,
      expl: "D = V × T = 18 kn × 3.5 h = 63 nautical miles. Always convert hours to decimals (3h30 = 3.5 hours).",
    },
    {
      q: "What does CPA mean in the context of ARPA radar?",
      opts: ["Collision Probability Assessment","Closest Point of Approach — minimum passing distance","Automatic Position Control","Automated Piloting Center"],
      correct: 1,
      expl: "CPA = Closest Point of Approach. It's the minimum distance at which a detected ship will pass. ARPA also calculates TCPA — time to that point.",
    },
    {
      q: "Why does the magnetic compass remain MANDATORY despite GPS and ECDIS?",
      opts: ["It's more accurate than GPS","It's less expensive","It works without electricity and resists jamming and spoofing","It's required by MARPOL"],
      correct: 2,
      expl: "The magnetic compass is the only instrument that remains operational during a total power failure. It cannot be jammed or spoofed. It's the instrument of last resort — SOLAS requires it.",
    },
  ],
  es: [
    {
      q: "¿Qué pueblo colonizó el Pacífico a lo largo de 5000 km sin ningún instrumento?",
      opts: ["Los fenicios","Los vikingos","Los polinesios","Los árabes"],
      correct: 2,
      expl: "Los polinesios colonizaron Hawái, Nueva Zelanda y la Isla de Pascua leyendo estrellas, olas y aves — sin ningún instrumento.",
    },
    {
      q: "¿Por qué fue revolucionaria la invención del cronómetro marino (1762)?",
      opts: ["Medía la velocidad del buque","Daba la hora en cada puerto","Permitía calcular la longitud","Sustituía al sextante"],
      correct: 2,
      expl: "Conocer la hora exacta permite calcular la diferencia con la hora local (sol) y, por tanto, la longitud. Antes de Harrison, la longitud en el mar era un misterio.",
    },
    {
      q: "Un buque navega a 18 nudos durante 3h30. ¿Qué distancia ha recorrido?",
      opts: ["54 millas náuticas","63 millas náuticas","72 millas náuticas","84 millas náuticas"],
      correct: 1,
      expl: "D = V × T = 18 kn × 3,5 h = 63 millas náuticas. Convierte siempre las horas a decimales (3h30 = 3,5 horas).",
    },
    {
      q: "¿Qué significa CPA en el contexto del radar ARPA?",
      opts: ["Cap Probable de Abordaje","Closest Point of Approach — distancia mínima de paso","Control de Posición Automático","Centro de Pilotaje Automatizado"],
      correct: 1,
      expl: "CPA = Closest Point of Approach. Es la distancia mínima a la que pasará un buque detectado. El ARPA también calcula el TCPA — tiempo hasta ese punto.",
    },
    {
      q: "¿Por qué la brújula magnética sigue siendo OBLIGATORIA a pesar del GPS y el ECDIS?",
      opts: ["Es más precisa que el GPS","Es menos costosa","Funciona sin electricidad y resiste el jamming y el spoofing","Lo exige el MARPOL"],
      correct: 2,
      expl: "La brújula magnética es el único instrumento operativo en caso de fallo eléctrico total. No puede ser interferida (jamming) ni suplantada (spoofing). Es el instrumento de último recurso — lo impone el SOLAS.",
    },
  ],
  pt: [
    {
      q: "Que povo colonizou o Pacífico ao longo de 5000 km sem qualquer instrumento?",
      opts: ["Os fenícios","Os vikings","Os polinésios","Os árabes"],
      correct: 2,
      expl: "Os polinésios colonizaram o Havai, a Nova Zelândia e a Ilha de Páscoa lendo estrelas, ondas e aves — sem qualquer instrumento.",
    },
    {
      q: "Por que foi revolucionária a invenção do cronómetro marítimo (1762)?",
      opts: ["Media a velocidade do navio","Dava a hora em cada porto","Permitia calcular a longitude","Substituía o sextante"],
      correct: 2,
      expl: "Conhecer a hora exata permite calcular a diferença com a hora local (sol) e, portanto, a longitude. Antes de Harrison, a longitude no mar era um mistério.",
    },
    {
      q: "Um navio navega a 18 nós durante 3h30. Que distância percorreu?",
      opts: ["54 milhas náuticas","63 milhas náuticas","72 milhas náuticas","84 milhas náuticas"],
      correct: 1,
      expl: "D = V × T = 18 kn × 3,5 h = 63 milhas náuticas. Converte sempre as horas em decimais (3h30 = 3,5 horas).",
    },
    {
      q: "O que significa CPA no contexto do radar ARPA?",
      opts: ["Cap Provável de Abalroamento","Closest Point of Approach — distância mínima de passagem","Controlo de Posição Automático","Centro de Pilotagem Automatizado"],
      correct: 1,
      expl: "CPA = Closest Point of Approach. É a distância mínima a que um navio detetado vai passar. O ARPA também calcula o TCPA — tempo até esse ponto.",
    },
    {
      q: "Por que a bússola magnética continua OBRIGATÓRIA apesar do GPS e do ECDIS?",
      opts: ["É mais precisa do que o GPS","É menos dispendiosa","Funciona sem eletricidade e resiste ao jamming e ao spoofing","É exigida pelo MARPOL"],
      correct: 2,
      expl: "A bússola magnética é o único instrumento operacional em caso de falha elétrica total. Não pode ser interferida (jamming) nem falsificada (spoofing). É o instrumento de último recurso — imposto pela SOLAS.",
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

// ── PRACTICE QUESTION BANK — 15Q ──────────────
const BANK = {
  fr:[
    {q:"Quel peuple naviguait à vue côtière en s'orientant par les étoiles dès 3000 av. J.-C. ?",opts:["Les Vikings","Les Phéniciens","Les Romains","Les Égyptiens"],correct:1,expl:"Les Phéniciens sont considérés comme les premiers grands navigateurs de l'Antiquité, naviguant à vue le long des côtes en s'orientant sur les étoiles dès 3000 av. J.-C."},
    {q:"Comment les Polynésiens s'orientaient-ils en haute mer sans instrument ?",opts:["Par le magnétisme terrestre","Par lecture des vagues et des étoiles","Par calcul mathématique uniquement","Ils ne naviguaient qu'en vue de terre"],correct:1,expl:"Les navigateurs polynésiens lisaient les motifs de houle, le vol des oiseaux et la position des étoiles pour traverser le Pacifique sans instrument."},
    {q:"À quel siècle la boussole magnétique s'est-elle généralisée en navigation ?",opts:["7ème siècle","11ème siècle","15ème siècle","19ème siècle"],correct:1,expl:"La boussole magnétique, indiquant le nord magnétique, s'est généralisée en navigation occidentale vers le 11ème siècle."},
    {q:"Quelle est la précision typique d'une position GPS moderne ?",opts:["± 500 m","± 50 m","± 5 m","± 0,5 m"],correct:2,expl:"Un GPS moderne offre typiquement une précision de l'ordre de ± 5 mètres, à condition de capter au moins 4 satellites."},
    {q:"Combien de satellites minimum sont nécessaires pour un point GPS fiable en 3D ?",opts:["2","3","4","8"],correct:2,expl:"Un minimum de 4 satellites est nécessaire pour calculer une position GPS fiable en trois dimensions (latitude, longitude, altitude)."},
    {q:"Depuis quelle année l'ECDIS est-il obligatoire sur les navires de plus de 500 GT ?",opts:["1998","2005","2012","2020"],correct:2,expl:"L'ECDIS (carte électronique officielle) est devenu obligatoire par phases à partir de 2012 pour les navires de plus de 500 GT, selon SOLAS."},
    {q:"Que signifie l'acronyme AIS ?",opts:["Automatic Identification System","Advanced Inertial System","Automatic Iceberg Sensor","Anchor Indication System"],correct:0,expl:"AIS signifie Automatic Identification System - un système qui diffuse automatiquement l'identité, la position, le cap et la vitesse d'un navire."},
    {q:"Combien de mètres représente 1 mille nautique ?",opts:["1 000 m","1 609 m","1 852 m","2 000 m"],correct:2,expl:"1 mille nautique = 1 852 mètres, une valeur définie comme correspondant à 1 minute d'arc de latitude sur le globe terrestre."},
    {q:"À quoi correspond exactement 1 mille nautique en termes de latitude ?",opts:["1 degré de latitude","1 minute de latitude","1 seconde de latitude","10 minutes de latitude"],correct:1,expl:"1 mille nautique correspond précisément à 1 minute d'arc de latitude, ce qui en fait une unité pratique pour la navigation sur une carte."},
    {q:"Que mesure un nœud en navigation maritime ?",opts:["Une distance","Une vitesse","Un angle","Une profondeur"],correct:1,expl:"Un nœud est une unité de vitesse : 1 nœud = 1 mille nautique par heure (1 mn/h)."},
    {q:"Quelle formule relie distance, vitesse et temps en navigation ?",opts:["D = V + T","D = V × T","D = V ÷ T","D = V − T"],correct:1,expl:"La formule fondamentale est D = V × T (Distance = Vitesse × Temps), permettant de calculer la distance parcourue à partir de la vitesse et du temps de route."},
    {q:"Quel cap correspond au Nord dans la notation à 3 chiffres ?",opts:["000°","090°","180°","270°"],correct:0,expl:"Le Nord correspond au cap 000° (ou 360°) dans la notation standard à 3 chiffres utilisée en navigation."},
    {q:"Quel cap correspond à l'Est dans la notation à 3 chiffres ?",opts:["000°","090°","180°","270°"],correct:1,expl:"L'Est correspond au cap 090°, le Sud à 180° et l'Ouest à 270°, complétant les 360° du cercle de navigation."},
    {q:"Quel instrument reste fiable en cas de panne électrique totale à bord ?",opts:["Le GPS","Le radar","Le compas magnétique","L'ECDIS"],correct:2,expl:"Le compas magnétique ne dépend d'aucune alimentation électrique ni satellite - il reste l'instrument de secours ultime en cas de panne totale."},
    {q:"Quel instrument permet de détecter d'autres navires et la côte même par visibilité nulle ?",opts:["Le compas","Le radar","Le sextant","La sonde"],correct:1,expl:"Le radar émet des ondes qui se réfléchissent sur les obstacles (navires, côtes), permettant de les détecter même de nuit ou par brouillard."},
  ],
  en:[
    {q:"Which people navigated by coastal sight using stars as early as 3000 BC?",opts:["The Vikings","The Phoenicians","The Romans","The Egyptians"],correct:1,expl:"The Phoenicians are considered the first great navigators of antiquity, sailing along coasts using the stars for orientation as early as 3000 BC."},
    {q:"How did Polynesians orient themselves offshore without instruments?",opts:["By terrestrial magnetism","By reading waves and stars","By mathematical calculation only","They only sailed within sight of land"],correct:1,expl:"Polynesian navigators read swell patterns, bird flight and star positions to cross the Pacific without instruments."},
    {q:"In which century did the magnetic compass become widespread in navigation?",opts:["7th century","11th century","15th century","19th century"],correct:1,expl:"The magnetic compass, indicating magnetic north, became widespread in Western navigation around the 11th century."},
    {q:"What is the typical accuracy of a modern GPS position?",opts:["± 500 m","± 50 m","± 5 m","± 0.5 m"],correct:2,expl:"A modern GPS typically offers an accuracy of around ± 5 meters, provided at least 4 satellites are received."},
    {q:"How many satellites minimum are needed for a reliable 3D GPS fix?",opts:["2","3","4","8"],correct:2,expl:"A minimum of 4 satellites is needed to calculate a reliable GPS position in three dimensions (latitude, longitude, altitude)."},
    {q:"Since what year has ECDIS been mandatory on vessels over 500 GT?",opts:["1998","2005","2012","2020"],correct:2,expl:"ECDIS (official electronic chart) became mandatory in phases starting in 2012 for vessels over 500 GT, under SOLAS."},
    {q:"What does the acronym AIS stand for?",opts:["Automatic Identification System","Advanced Inertial System","Automatic Iceberg Sensor","Anchor Indication System"],correct:0,expl:"AIS stands for Automatic Identification System - a system that automatically broadcasts a vessel's identity, position, heading and speed."},
    {q:"How many meters does 1 nautical mile represent?",opts:["1,000 m","1,609 m","1,852 m","2,000 m"],correct:2,expl:"1 nautical mile = 1,852 meters, a value defined as corresponding to 1 minute of arc of latitude on the Earth's globe."},
    {q:"What does 1 nautical mile correspond to exactly in terms of latitude?",opts:["1 degree of latitude","1 minute of latitude","1 second of latitude","10 minutes of latitude"],correct:1,expl:"1 nautical mile corresponds precisely to 1 minute of arc of latitude, making it a practical unit for chart navigation."},
    {q:"What does a knot measure in maritime navigation?",opts:["A distance","A speed","An angle","A depth"],correct:1,expl:"A knot is a unit of speed: 1 knot = 1 nautical mile per hour (1 nm/h)."},
    {q:"Which formula links distance, speed and time in navigation?",opts:["D = V + T","D = V × T","D = V ÷ T","D = V − T"],correct:1,expl:"The fundamental formula is D = V × T (Distance = Speed × Time), allowing distance traveled to be calculated from speed and time underway."},
    {q:"Which heading corresponds to North in 3-digit notation?",opts:["000°","090°","180°","270°"],correct:0,expl:"North corresponds to heading 000° (or 360°) in the standard 3-digit notation used in navigation."},
    {q:"Which heading corresponds to East in 3-digit notation?",opts:["000°","090°","180°","270°"],correct:1,expl:"East corresponds to heading 090°, South to 180° and West to 270°, completing the 360° navigation circle."},
    {q:"Which instrument remains reliable during a total electrical failure on board?",opts:["The GPS","The radar","The magnetic compass","The ECDIS"],correct:2,expl:"The magnetic compass depends on no power supply or satellite - it remains the ultimate backup instrument during a total failure."},
    {q:"Which instrument detects other vessels and the coast even in zero visibility?",opts:["The compass","The radar","The sextant","The echo sounder"],correct:1,expl:"Radar emits waves that reflect off obstacles (vessels, coastline), allowing detection even at night or in fog."},
  ],
  es:[
    {q:"¿Qué pueblo navegaba a la vista costera guiándose por las estrellas desde el 3000 a.C.?",opts:["Los vikingos","Los fenicios","Los romanos","Los egipcios"],correct:1,expl:"Los fenicios son considerados los primeros grandes navegantes de la Antigüedad, navegando a la vista de la costa guiándose por las estrellas desde el 3000 a.C."},
    {q:"¿Cómo se orientaban los polinesios en alta mar sin instrumentos?",opts:["Por magnetismo terrestre","Leyendo olas y estrellas","Solo por cálculo matemático","Solo navegaban a la vista de tierra"],correct:1,expl:"Los navegantes polinesios leían los patrones de oleaje, el vuelo de las aves y la posición de las estrellas para cruzar el Pacífico sin instrumentos."},
    {q:"¿En qué siglo se generalizó la brújula magnética en la navegación?",opts:["Siglo VII","Siglo XI","Siglo XV","Siglo XIX"],correct:1,expl:"La brújula magnética, que indica el norte magnético, se generalizó en la navegación occidental hacia el siglo XI."},
    {q:"¿Cuál es la precisión típica de una posición GPS moderna?",opts:["± 500 m","± 50 m","± 5 m","± 0,5 m"],correct:2,expl:"Un GPS moderno ofrece típicamente una precisión de alrededor de ± 5 metros, siempre que se capten al menos 4 satélites."},
    {q:"¿Cuántos satélites mínimo se necesitan para una posición GPS 3D fiable?",opts:["2","3","4","8"],correct:2,expl:"Se necesita un mínimo de 4 satélites para calcular una posición GPS fiable en tres dimensiones (latitud, longitud, altitud)."},
    {q:"¿Desde qué año es obligatorio el ECDIS en buques de más de 500 GT?",opts:["1998","2005","2012","2020"],correct:2,expl:"El ECDIS (carta electrónica oficial) se hizo obligatorio por fases a partir de 2012 para buques de más de 500 GT, según el SOLAS."},
    {q:"¿Qué significa el acrónimo AIS?",opts:["Automatic Identification System","Advanced Inertial System","Automatic Iceberg Sensor","Anchor Indication System"],correct:0,expl:"AIS significa Automatic Identification System - un sistema que difunde automáticamente la identidad, posición, rumbo y velocidad de un buque."},
    {q:"¿Cuántos metros representa 1 milla náutica?",opts:["1.000 m","1.609 m","1.852 m","2.000 m"],correct:2,expl:"1 milla náutica = 1.852 metros, un valor definido como correspondiente a 1 minuto de arco de latitud en el globo terráqueo."},
    {q:"¿A qué corresponde exactamente 1 milla náutica en términos de latitud?",opts:["1 grado de latitud","1 minuto de latitud","1 segundo de latitud","10 minutos de latitud"],correct:1,expl:"1 milla náutica corresponde precisamente a 1 minuto de arco de latitud, lo que la convierte en una unidad práctica para la navegación en carta."},
    {q:"¿Qué mide un nudo en navegación marítima?",opts:["Una distancia","Una velocidad","Un ángulo","Una profundidad"],correct:1,expl:"Un nudo es una unidad de velocidad: 1 nudo = 1 milla náutica por hora (1 mn/h)."},
    {q:"¿Qué fórmula relaciona distancia, velocidad y tiempo en navegación?",opts:["D = V + T","D = V × T","D = V ÷ T","D = V − T"],correct:1,expl:"La fórmula fundamental es D = V × T (Distancia = Velocidad × Tiempo), que permite calcular la distancia recorrida a partir de la velocidad y el tiempo de ruta."},
    {q:"¿Qué rumbo corresponde al Norte en notación de 3 dígitos?",opts:["000°","090°","180°","270°"],correct:0,expl:"El Norte corresponde al rumbo 000° (o 360°) en la notación estándar de 3 dígitos usada en navegación."},
    {q:"¿Qué rumbo corresponde al Este en notación de 3 dígitos?",opts:["000°","090°","180°","270°"],correct:1,expl:"El Este corresponde al rumbo 090°, el Sur a 180° y el Oeste a 270°, completando el círculo de navegación de 360°."},
    {q:"¿Qué instrumento sigue siendo fiable ante un fallo eléctrico total a bordo?",opts:["El GPS","El radar","La brújula magnética","El ECDIS"],correct:2,expl:"La brújula magnética no depende de ninguna alimentación eléctrica ni satélite - sigue siendo el instrumento de respaldo definitivo ante un fallo total."},
    {q:"¿Qué instrumento permite detectar otros buques y la costa incluso con visibilidad nula?",opts:["La brújula","El radar","El sextante","La sonda"],correct:1,expl:"El radar emite ondas que se reflejan en los obstáculos (buques, costa), permitiendo detectarlos incluso de noche o con niebla."},
  ],
  pt:[
    {q:"Que povo navegava à vista costeira guiando-se pelas estrelas desde 3000 a.C.?",opts:["Os vikings","Os fenícios","Os romanos","Os egípcios"],correct:1,expl:"Os fenícios são considerados os primeiros grandes navegadores da Antiguidade, navegando à vista da costa guiando-se pelas estrelas desde 3000 a.C."},
    {q:"Como os polinésios se orientavam em alto mar sem instrumentos?",opts:["Pelo magnetismo terrestre","Lendo ondas e estrelas","Apenas por cálculo matemático","Só navegavam à vista de terra"],correct:1,expl:"Os navegadores polinésios liam os padrões de ondulação, o voo das aves e a posição das estrelas para atravessar o Pacífico sem instrumentos."},
    {q:"Em que século a bússola magnética se generalizou na navegação?",opts:["Século VII","Século XI","Século XV","Século XIX"],correct:1,expl:"A bússola magnética, indicando o norte magnético, generalizou-se na navegação ocidental por volta do século XI."},
    {q:"Qual é a precisão típica de uma posição GPS moderna?",opts:["± 500 m","± 50 m","± 5 m","± 0,5 m"],correct:2,expl:"Um GPS moderno oferece tipicamente uma precisão de cerca de ± 5 metros, desde que sejam captados pelo menos 4 satélites."},
    {q:"Quantos satélites no mínimo são necessários para uma posição GPS 3D fiável?",opts:["2","3","4","8"],correct:2,expl:"É necessário um mínimo de 4 satélites para calcular uma posição GPS fiável em três dimensões (latitude, longitude, altitude)."},
    {q:"Desde que ano o ECDIS é obrigatório em navios com mais de 500 GT?",opts:["1998","2005","2012","2020"],correct:2,expl:"O ECDIS (carta eletrónica oficial) tornou-se obrigatório por fases a partir de 2012 para navios com mais de 500 GT, segundo a SOLAS."},
    {q:"O que significa a sigla AIS?",opts:["Automatic Identification System","Advanced Inertial System","Automatic Iceberg Sensor","Anchor Indication System"],correct:0,expl:"AIS significa Automatic Identification System - um sistema que transmite automaticamente a identidade, posição, rumo e velocidade de um navio."},
    {q:"Quantos metros representa 1 milha náutica?",opts:["1.000 m","1.609 m","1.852 m","2.000 m"],correct:2,expl:"1 milha náutica = 1.852 metros, um valor definido como correspondente a 1 minuto de arco de latitude no globo terrestre."},
    {q:"A que corresponde exatamente 1 milha náutica em termos de latitude?",opts:["1 grau de latitude","1 minuto de latitude","1 segundo de latitude","10 minutos de latitude"],correct:1,expl:"1 milha náutica corresponde precisamente a 1 minuto de arco de latitude, tornando-a uma unidade prática para a navegação em carta."},
    {q:"O que um nó mede na navegação marítima?",opts:["Uma distância","Uma velocidade","Um ângulo","Uma profundidade"],correct:1,expl:"Um nó é uma unidade de velocidade: 1 nó = 1 milha náutica por hora (1 mn/h)."},
    {q:"Que fórmula relaciona distância, velocidade e tempo na navegação?",opts:["D = V + T","D = V × T","D = V ÷ T","D = V − T"],correct:1,expl:"A fórmula fundamental é D = V × T (Distância = Velocidade × Tempo), permitindo calcular a distância percorrida a partir da velocidade e do tempo de rota."},
    {q:"Que rumo corresponde ao Norte na notação de 3 dígitos?",opts:["000°","090°","180°","270°"],correct:0,expl:"O Norte corresponde ao rumo 000° (ou 360°) na notação padrão de 3 dígitos usada na navegação."},
    {q:"Que rumo corresponde ao Este na notação de 3 dígitos?",opts:["000°","090°","180°","270°"],correct:1,expl:"O Este corresponde ao rumo 090°, o Sul a 180° e o Oeste a 270°, completando o círculo de navegação de 360°."},
    {q:"Que instrumento continua fiável numa falha elétrica total a bordo?",opts:["O GPS","O radar","A bússola magnética","O ECDIS"],correct:2,expl:"A bússola magnética não depende de nenhuma alimentação elétrica nem satélite - continua a ser o instrumento de recurso final numa falha total."},
    {q:"Que instrumento permite detetar outros navios e a costa mesmo com visibilidade nula?",opts:["A bússola","O radar","O sextante","A sonda"],correct:1,expl:"O radar emite ondas que se refletem nos obstáculos (navios, costa), permitindo detetá-los mesmo de noite ou com nevoeiro."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [started,setStarted]=useState(false);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const total=questions.length;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  if(!started) return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📝 {lang==="fr"?"BANQUE DE 15 QUESTIONS":lang==="en"?"15-QUESTION BANK":lang==="es"?"BANCO DE 15 PREGUNTAS":"BANCO DE 15 QUESTÕES"}</div>
      <div style={{fontSize:12,color:C.white,lineHeight:1.6,marginBottom:12}}>{lang==="fr"?"Entraîne-toi avec 15 questions de révision avant le quiz final.":lang==="en"?"Practice with 15 review questions before the final quiz.":lang==="es"?"Practica con 15 preguntas de repaso antes del quiz final.":"Pratique com 15 perguntas de revisão antes do quiz final."}</div>
      <button onClick={()=>setStarted(true)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:1}}>
        {lang==="fr"?"✅ COMMENCER":lang==="en"?"✅ START":lang==="es"?"✅ EMPEZAR":"✅ COMEÇAR"}
      </button>
    </Card>
  );
  if(done){
    const pct=Math.round(score/total*100);
    return(
      <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,textAlign:"center"}}>
        <div style={{fontSize:44,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":pct>=60?"📘":"📚"}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:13,color:C.gold2}}>{pct}%</div>
      </Card>
    );
  }
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<total-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:10,color:C.muted}}>{cur+1}/{total}</div>
        <div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(cur/total)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.blue2})`}}/>
      </div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.white,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>}
      {answered&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>
        {cur<total-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}
      </button>}
    </Card>
  );
}

// ── EXERCISE — OPERATIONAL SCENARIO ──────────────
function ExerciseScenario1({ lang }) {
  const [ans, setAns] = useState({ q1: "", q2: "", q3: "" });
  const [showC, setShowC] = useState(false);
  const correct = { q1: "compas", q2: "estime", q3: "non" };
  const chk = (id, val) => {
    const v = val.trim().toLowerCase();
    if (id === "q1") return v.includes("compas") || v.includes("compass");
    if (id === "q2") return v.includes("estime") || v.includes("dead reckoning") || v.includes("estimada") || v.includes("estima");
    if (id === "q3") return v === "non" || v === "no";
    return false;
  };
  const d = {
    fr: { title: "🎯 Exercice avancé — Officier de quart", scenario: "Il est 02h00, nuit sans lune. Vous êtes seul officier de quart en passerelle. Le GPS affiche soudainement \"NO FIX\". Le radar fonctionne normalement.",
      qs: [
        { id: "q1", q: "1. Quel instrument non électronique devez-vous immédiatement consulter pour maintenir votre cap ?" },
        { id: "q2", q: "2. Quelle méthode de navigation devez-vous démarrer sans délai pour suivre votre position (utilisant vitesse et temps) ? (un mot)" },
        { id: "q3", q: "3. Devez-vous continuer à faire confiance à la position affichée sur l'ECDIS sans mise à jour GPS ? (oui/non)" },
      ],
      expl: "✅ Q1 : le compas magnétique reste fiable sans électricité ni satellite\n✅ Q2 : la navigation à l'estime (D = V × T) permet de suivre la position sans GPS\n✅ Q3 : non — une position ECDIS non rafraîchie devient rapidement fausse, il faut recalculer manuellement" },
    en: { title: "🌊 Scenario — Officer of the Watch", scenario: "It's 02:00, moonless night. You are the sole watchkeeping officer on the bridge. The GPS suddenly displays \"NO FIX\". The radar is working normally.",
      qs: [
        { id: "q1", q: "1. Which non-electronic instrument must you immediately check to maintain your heading?" },
        { id: "q2", q: "2. Which navigation method must you start without delay to track your position (using speed and time)? (one word)" },
        { id: "q3", q: "3. Should you keep trusting the position shown on ECDIS without a GPS update? (yes/no)" },
      ],
      expl: "✅ Q1: the magnetic compass remains reliable without electricity or satellites\n✅ Q2: dead reckoning (D = V × T) lets you track position without GPS\n✅ Q3: no — an unrefreshed ECDIS position quickly becomes wrong, manual recalculation is required" },
    es: { title: "🌊 Escenario — Oficial de guardia", scenario: "Son las 02:00, noche sin luna. Eres el único oficial de guardia en el puente. El GPS muestra de repente \"NO FIX\". El radar funciona con normalidad.",
      qs: [
        { id: "q1", q: "1. ¿Qué instrumento no electrónico debes consultar de inmediato para mantener tu rumbo?" },
        { id: "q2", q: "2. ¿Qué método de navegación debes iniciar sin demora para seguir tu posición (usando velocidad y tiempo)? (una palabra)" },
        { id: "q3", q: "3. ¿Debes seguir confiando en la posición del ECDIS sin actualización GPS? (sí/no)" },
      ],
      expl: "✅ Q1: la brújula magnética sigue siendo fiable sin electricidad ni satélites\n✅ Q2: la navegación estimada (D = V × T) permite seguir la posición sin GPS\n✅ Q3: no — una posición ECDIS sin actualizar se vuelve rápidamente errónea" },
    pt: { title: "🌊 Cenário — Oficial de quarto", scenario: "São 02h00, noite sem lua. Você é o único oficial de quarto no passadiço. O GPS mostra repentinamente \"NO FIX\". O radar funciona normalmente.",
      qs: [
        { id: "q1", q: "1. Que instrumento não eletrónico deve consultar imediatamente para manter o rumo?" },
        { id: "q2", q: "2. Que método de navegação deve iniciar sem demora para seguir a posição (usando velocidade e tempo)? (uma palavra)" },
        { id: "q3", q: "3. Deve continuar a confiar na posição do ECDIS sem atualização GPS? (sim/não)" },
      ],
      expl: "✅ Q1: a bússola magnética continua fiável sem eletricidade nem satélites\n✅ Q2: a navegação estimada (D = V × T) permite seguir a posição sem GPS\n✅ Q3: não — uma posição ECDIS não atualizada torna-se rapidamente errada" },
  };
  const c = d[lang] || d.fr;
  return (
    <Card style={{ marginBottom: 12, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}>
      <div style={{ fontSize: 11, color: C.gold, letterSpacing: 2, fontFamily: "'Cinzel',serif", marginBottom: 10 }}>{c.title}</div>
      <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "12px", marginBottom: 14, fontSize: 12, color: C.white, lineHeight: 1.6, fontStyle: "italic" }}>{c.scenario}</div>
      {c.qs.map((q) => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: C.white, marginBottom: 6, lineHeight: 1.4, fontWeight: 600 }}>{q.q}</div>
          <input type="text" value={ans[q.id]} onChange={(e) => setAns((a) => ({ ...a, [q.id]: e.target.value }))}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.07)",
              border: `1px solid ${showC ? (chk(q.id, ans[q.id]) ? C.green : C.red) : C.border}`,
              color: C.white, fontSize: 13, fontFamily: "'Nunito',sans-serif", boxSizing: "border-box" }} />
          {showC && <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: chk(q.id, ans[q.id]) ? C.green : C.red }}>
            {chk(q.id, ans[q.id]) ? "✓" : "✗"}
          </div>}
        </div>
      ))}
      {showC && <div style={{ padding: "12px", borderRadius: 12, background: "rgba(30,138,74,0.1)", border: `1px solid ${C.green}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 10, whiteSpace: "pre-line" }}>{c.expl}</div>}
      <button onClick={() => setShowC((v) => !v)} style={{ width: "100%", padding: "11px 0", borderRadius: 12, background: showC ? "rgba(30,138,74,0.2)" : "rgba(201,146,42,0.15)", border: `1px solid ${showC ? C.green : C.gold}44`, color: showC ? C.green : C.gold2, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>
        {showC ? (lang === "fr" ? "Masquer" : lang === "en" ? "Hide" : lang === "es" ? "Ocultar" : "Ocultar") : (lang === "fr" ? "Voir la correction" : lang === "en" ? "Show correction" : lang === "es" ? "Ver corrección" : "Ver correção")}
      </button>
    </Card>
  );
}

// ── CONTENT RENDERER ──────────────────────────
function ContentBlock({ block, lang }) {
  const style = {
    fadeUp: { animation: "fadeUp 0.5s ease both" },
  };

  switch (block.type) {
    case "bank":
      return <QuestionBank lang={lang} />;

    case "exercise":
      return <ExerciseScenario1 lang={lang} />;

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
          }}>{
            lang === "fr" ? "🧭 COMPAS MAGNÉTIQUE — Interactif" :
            lang === "es" ? "🧭 COMPÁS MAGNÉTICO — Interactivo" :
            lang === "pt" ? "🧭 BÚSSOLA MAGNÉTICA — Interativa" :
            "🧭 MAGNETIC COMPASS — Interactive"
          }</div>
          <CompassSVG lang={lang} />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            {lang === "fr" ? "L'aiguille rouge pointe toujours vers le nord magnétique. La graduation indique les caps de 0° à 360°. La ligne de foi ▲ en haut indique le cap suivi par le navire." :
             lang === "es" ? "La aguja roja apunta siempre hacia el norte magnético. La graduación indica los rumbos de 0° a 360°. La línea de fe ▲ en la parte superior indica el rumbo seguido por el buque." :
             lang === "pt" ? "A agulha vermelha aponta sempre para o norte magnético. A graduação indica os rumos de 0° a 360°. A linha de fé ▲ no topo indica o rumo seguido pelo navio." :
             "The red needle always points to magnetic north. The graduation shows headings from 0° to 360°. The lubber line ▲ at the top shows the heading the vessel is steering."}
          </div>
        </Card>
      );

    case "instrument_radar":
      return (
        <Card style={{ marginBottom: 14, textAlign: "center" }}>
          <div style={{
            fontSize: 11, color: C.green, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 14,
          }}>{
            lang === "fr" ? "📡 RADAR — Balayage en temps réel" :
            lang === "es" ? "📡 RADAR — Barrido en tiempo real" :
            lang === "pt" ? "📡 RADAR — Varrimento em tempo real" :
            "📡 RADAR — Real-time sweep"
          }</div>
          <RadarSVG lang={lang} />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            {lang === "fr" ? "La ligne verte balaye à 360°. Les taches lumineuses sont des échos (navires, côtes). Les cercles indiquent les distances. Le navire propre est au centre (●)." :
             lang === "es" ? "La línea verde barre a 360°. Las manchas luminosas son ecos (buques, costas). Los círculos indican las distancias. El buque propio está en el centro (●)." :
             lang === "pt" ? "A linha verde varre a 360°. As manchas luminosas são ecos (navios, costas). Os círculos indicam as distâncias. O navio próprio está no centro (●)." :
             "The green line sweeps through 360°. The bright spots are echoes (ships, coastlines). The circles indicate distances. Own ship is at the center (●)."}
          </div>
        </Card>
      );

    case "instrument_gps":
      return (
        <Card style={{ marginBottom: 14, textAlign: "center" }}>
          <div style={{
            fontSize: 11, color: C.blue2, letterSpacing: 2,
            fontFamily: "'Cinzel',serif", marginBottom: 14,
          }}>{
            lang === "fr" ? "🛰️ GPS — Vue satellites et position" :
            lang === "es" ? "🛰️ GPS — Vista de satélites y posición" :
            lang === "pt" ? "🛰️ GPS — Vista de satélites e posição" :
            "🛰️ GPS — Satellite view and position"
          }</div>
          <GPSDisplay lang={lang} />
          <GLine />
          <div style={{ fontSize: 12, color: C.muted, textAlign: "left", marginTop: 8 }}>
            {lang === "fr" ? "Vue du ciel : les cercles bleus sont les satellites visibles. Les satellites actifs (bleu brillant) participent au calcul de position. La position et la vitesse s'affichent en temps réel." :
             lang === "es" ? "Vista del cielo: los círculos azules son los satélites visibles. Los satélites activos (azul brillante) participan en el cálculo de posición. La posición y la velocidad se muestran en tiempo real." :
             lang === "pt" ? "Vista do céu: os círculos azuis são os satélites visíveis. Os satélites ativos (azul brilhante) participam no cálculo de posição. A posição e a velocidade são apresentadas em tempo real." :
             "Sky view: the blue circles are visible satellites. Active satellites (bright blue) contribute to the position fix. Position and speed are shown in real time."}
          </div>
        </Card>
      );

    default:
      return null;
  }
}

// ── QUIZ ──────────────────────────────────────
function Quiz({ questions, lang, t, onComplete }) {
  const [shuffled] = useState(() => questions.map(shuffleQuestionOptions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = shuffled[current];
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
          {lang === "fr" ? (pct === 100 ? "Parfait ! 🌟" : pct >= 80 ? "Excellent ! 💪" : "Continue ! 📚") :
           lang === "es" ? (pct === 100 ? "¡Perfecto! 🌟" : pct >= 80 ? "¡Excelente! 💪" : "¡Sigue así! 📚") :
           lang === "pt" ? (pct === 100 ? "Perfeito! 🌟" : pct >= 80 ? "Excelente! 💪" : "Continua! 📚") :
           (pct === 100 ? "Perfect! 🌟" : pct >= 80 ? "Excellent! 💪" : "Keep going! 📚")}
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
  const TITLE = {
    fr: "FICHE MÉMO — LEÇON 1", en: "QUICK REFERENCE — LESSON 1",
    es: "FICHA RESUMEN — LECCIÓN 1", pt: "FICHA RESUMO — LIÇÃO 1",
  };
  const SUBTITLE = {
    fr: "Navigation & Instruments · Maritime Academy Pro",
    en: "Navigation & Instruments · Maritime Academy Pro",
    es: "Navegación e Instrumentos · Maritime Academy Pro",
    pt: "Navegação e Instrumentos · Maritime Academy Pro",
  };
  ctx.fillStyle = "#e8b94f";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText(TITLE[lang] || TITLE.fr, 300, 50);
  ctx.fillStyle = "#4da6ff";
  ctx.font = "14px serif";
  ctx.fillText(SUBTITLE[lang] || SUBTITLE.fr, 300, 75);

  // Divider
  ctx.strokeStyle = "#c9922a";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(30, 90); ctx.lineTo(570, 90); ctx.stroke();

  const LINES = {
    fr: [
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
    ],
    en: [
      ["#c9922a", "bold 14px serif", "TIMELINE"],
      ["#f0f4ff", "12px monospace", "3000 BC       → Phoenicians (coastal, by stars)"],
      ["#f0f4ff", "12px monospace", "1100          → Magnetic compass"],
      ["#f0f4ff", "12px monospace", "1731          → Sextant (latitude)"],
      ["#f0f4ff", "12px monospace", "1762          → Chronometer (longitude)"],
      ["#f0f4ff", "12px monospace", "1935          → Radar"],
      ["#f0f4ff", "12px monospace", "1983          → Civilian GPS"],
      ["#f0f4ff", "12px monospace", "2012          → ECDIS mandatory"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "INSTRUMENTS"],
      ["#f0f4ff", "12px monospace", "Compass   → Heading without electricity, MANDATORY"],
      ["#f0f4ff", "12px monospace", "Gyrocomp. → True north, needs electricity"],
      ["#f0f4ff", "12px monospace", "GPS       → Position ± 5m (4 sats min)"],
      ["#f0f4ff", "12px monospace", "ECDIS     → Official electronic chart"],
      ["#f0f4ff", "12px monospace", "Radar     → Detection, CPA/TCPA (ARPA)"],
      ["#f0f4ff", "12px monospace", "AIS       → Identification (unique MMSI)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "UNITS"],
      ["#f0f4ff", "12px monospace", "1 nm = 1,852 m = 1 minute of latitude arc"],
      ["#f0f4ff", "12px monospace", "1 knot = 1 nm/hour"],
      ["#4da6ff", "bold 14px monospace", "D = V × T  |  V = D÷T  |  T = D÷V"],
      ["#f0f4ff", "12px monospace", "1 cable = 185.2 m (1/10 nm)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "CARDINAL POINTS"],
      ["#f0f4ff", "12px monospace", "N=000° · E=090° · S=180° · W=270°"],
      ["#f0f4ff", "12px monospace", "NE=045° · SE=135° · SW=225° · NW=315°"],
    ],
    es: [
      ["#c9922a", "bold 14px serif", "CRONOLOGÍA"],
      ["#f0f4ff", "12px monospace", "3000 a.C.     → Fenicios (costera, por estrellas)"],
      ["#f0f4ff", "12px monospace", "1100          → Brújula magnética"],
      ["#f0f4ff", "12px monospace", "1731          → Sextante (latitud)"],
      ["#f0f4ff", "12px monospace", "1762          → Cronómetro (longitud)"],
      ["#f0f4ff", "12px monospace", "1935          → Radar"],
      ["#f0f4ff", "12px monospace", "1983          → GPS civil"],
      ["#f0f4ff", "12px monospace", "2012          → ECDIS obligatorio"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "INSTRUMENTOS"],
      ["#f0f4ff", "12px monospace", "Brújula   → Rumbo sin electricidad, OBLIGATORIA"],
      ["#f0f4ff", "12px monospace", "Girocomp. → Norte verdadero, con electricidad"],
      ["#f0f4ff", "12px monospace", "GPS       → Posición ± 5m (4 sats mín)"],
      ["#f0f4ff", "12px monospace", "ECDIS     → Carta electrónica oficial"],
      ["#f0f4ff", "12px monospace", "Radar     → Detección, CPA/TCPA (ARPA)"],
      ["#f0f4ff", "12px monospace", "AIS       → Identificación (MMSI único)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "UNIDADES"],
      ["#f0f4ff", "12px monospace", "1 mn = 1852 m = 1 minuto de arco de latitud"],
      ["#f0f4ff", "12px monospace", "1 nudo = 1 mn/hora"],
      ["#4da6ff", "bold 14px monospace", "D = V × T  |  V = D÷T  |  T = D÷V"],
      ["#f0f4ff", "12px monospace", "1 cable = 185,2 m (1/10 mn)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "PUNTOS CARDINALES"],
      ["#f0f4ff", "12px monospace", "N=000° · E=090° · S=180° · W=270°"],
      ["#f0f4ff", "12px monospace", "NE=045° · SE=135° · SW=225° · NW=315°"],
    ],
    pt: [
      ["#c9922a", "bold 14px serif", "CRONOLOGIA"],
      ["#f0f4ff", "12px monospace", "3000 a.C.     → Fenícios (costeira, por estrelas)"],
      ["#f0f4ff", "12px monospace", "1100          → Bússola magnética"],
      ["#f0f4ff", "12px monospace", "1731          → Sextante (latitude)"],
      ["#f0f4ff", "12px monospace", "1762          → Cronómetro (longitude)"],
      ["#f0f4ff", "12px monospace", "1935          → Radar"],
      ["#f0f4ff", "12px monospace", "1983          → GPS civil"],
      ["#f0f4ff", "12px monospace", "2012          → ECDIS obrigatório"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "INSTRUMENTOS"],
      ["#f0f4ff", "12px monospace", "Bússola   → Rumo sem eletricidade, OBRIGATÓRIA"],
      ["#f0f4ff", "12px monospace", "Giroscóp. → Norte verdadeiro, com eletricidade"],
      ["#f0f4ff", "12px monospace", "GPS       → Posição ± 5m (4 sats mín)"],
      ["#f0f4ff", "12px monospace", "ECDIS     → Carta eletrónica oficial"],
      ["#f0f4ff", "12px monospace", "Radar     → Deteção, CPA/TCPA (ARPA)"],
      ["#f0f4ff", "12px monospace", "AIS       → Identificação (MMSI único)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "UNIDADES"],
      ["#f0f4ff", "12px monospace", "1 mn = 1852 m = 1 minuto de arco de latitude"],
      ["#f0f4ff", "12px monospace", "1 nó = 1 mn/hora"],
      ["#4da6ff", "bold 14px monospace", "D = V × T  |  V = D÷T  |  T = D÷V"],
      ["#f0f4ff", "12px monospace", "1 cabo = 185,2 m (1/10 mn)"],
      ["#c9922a", "bold 14px serif", ""],
      ["#c9922a", "bold 14px serif", "PONTOS CARDEAIS"],
      ["#f0f4ff", "12px monospace", "N=000° · E=090° · S=180° · W=270°"],
      ["#f0f4ff", "12px monospace", "NE=045° · SE=135° · SW=225° · NW=315°"],
    ],
  };
  const lines = LINES[lang] || LINES.fr;

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
  onNext = () => { },
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
                <div style={{ marginTop: 14, fontSize: 12, color: C.gold2, fontStyle: "italic", lineHeight: 1.6, maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
                  {lang==="fr"?"De la boussole au GPS, la navigation a changé — mais l'exigence de vigilance reste la même. Continue ton apprentissage, futur officier.":lang==="en"?"From compass to GPS, navigation has changed — but the demand for vigilance hasn't. Keep learning, future officer.":lang==="es"?"De la brújula al GPS, la navegación ha cambiado — pero la exigencia de vigilancia sigue igual. Sigue aprendiendo, futuro oficial.":"Da bússola ao GPS, a navegação mudou — mas a exigência de vigilância continua a mesma. Continue aprendendo, futuro oficial."}
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

              <button onClick={onNext} style={{
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
