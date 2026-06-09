// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22",
  teal:"#0a8a6c", purple:"#8e44ad",
  zoneA1:"#1e8a4a", zoneA2:"#1a6fd4",
  zoneA3:"#0a8a6c", zoneA4:"#5b4fcf",
};

// ══════════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════════
const T = {
  fr:{
    back:"◀ Retour", module:"Navigation & Cartographie",
    lesson:"Leçon", xp:"XP gagnés",
    quiz:"QUIZ", question:"Question", ofQ:"sur",
    correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse",
    expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →",
    startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT",
    complete:"🏅 LEÇON TERMINÉE!", nextLesson:"LEÇON 4 →",
    backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:",
    downloadMemo:"📥 Télécharger la fiche mémo",
    readFirst:"Lis le contenu puis commence le quiz",
    scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪",
    scoreGood:"Continue ! 📚",
    globeTitle:"GLOBE INTERACTIF — Équateur & Parallèles",
    coordTitle:"COORDONNÉES INTERACTIVES",
    coordClick:"Clique sur le globe pour obtenir les coordonnées",
    zoneTitle:"ZONES IMO / GMDSS",
    zoneClick:"Clique sur une zone pour voir les équipements",
    converterTitle:"CONVERTISSEUR DMS ↔ DD",
    convert:"Convertir",
    dmsLabel:"Format DMS (cartes marines)",
    ddLabel:"Format DD (informatique)",
    dmLabel:"Format DM (GPS / ECDIS)",
    zoneA1:"Zone A1 — Côtière VHF",
    zoneA2:"Zone A2 — MF (400 mn)",
    zoneA3:"Zone A3 — Satellite INMARSAT",
    zoneA4:"Zone A4 — Polaire (HF)",
  },
  en:{
    back:"◀ Back", module:"Navigation & Cartography",
    lesson:"Lesson", xp:"XP earned",
    quiz:"QUIZ", question:"Question", ofQ:"of",
    correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →",
    startQuiz:"✅ START QUIZ", result:"RESULT",
    complete:"🏅 LESSON COMPLETE!", nextLesson:"LESSON 4 →",
    backDash:"← BACK TO DASHBOARD", youLearned:"You learned:",
    downloadMemo:"📥 Download memo sheet",
    readFirst:"Read the content then start the quiz",
    scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪",
    scoreGood:"Keep going! 📚",
    globeTitle:"INTERACTIVE GLOBE — Equator & Parallels",
    coordTitle:"INTERACTIVE COORDINATES",
    coordClick:"Click the globe to get coordinates",
    zoneTitle:"IMO / GMDSS ZONES",
    zoneClick:"Click a zone to see required equipment",
    converterTitle:"DMS ↔ DD CONVERTER",
    convert:"Convert",
    dmsLabel:"DMS format (paper charts)",
    ddLabel:"DD format (computers)",
    dmLabel:"DM format (GPS / ECDIS)",
    zoneA1:"Zone A1 — Coastal VHF",
    zoneA2:"Zone A2 — MF (400 nm)",
    zoneA3:"Zone A3 — INMARSAT satellite",
    zoneA4:"Zone A4 — Polar (HF)",
  },
  es:{
    back:"◀ Volver", module:"Navegación & Cartografía",
    lesson:"Lección", xp:"XP ganados",
    quiz:"QUIZ", question:"Pregunta", ofQ:"de",
    correct:"✓ ¡Correcta!", wrong:"✗ Respuesta incorrecta",
    expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →",
    startQuiz:"✅ EMPEZAR EL QUIZ", result:"RESULTADO",
    complete:"🏅 ¡LECCIÓN COMPLETADA!", nextLesson:"LECCIÓN 4 →",
    backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:",
    downloadMemo:"📥 Descargar ficha resumen",
    readFirst:"Lee el contenido y luego comienza el quiz",
    scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪",
    scoreGood:"¡Sigue! 📚",
    globeTitle:"GLOBO INTERACTIVO — Ecuador & Paralelos",
    coordTitle:"COORDENADAS INTERACTIVAS",
    coordClick:"Haz clic en el globo para obtener coordenadas",
    zoneTitle:"ZONAS OMI / SMSSM",
    zoneClick:"Haz clic en una zona para ver el equipo requerido",
    converterTitle:"CONVERTIDOR DMS ↔ DD",
    convert:"Convertir",
    dmsLabel:"Formato GMS (cartas náuticas)",
    ddLabel:"Formato DD (informática)",
    dmLabel:"Formato GM (GPS / ECDIS)",
    zoneA1:"Zona A1 — VHF Costera",
    zoneA2:"Zona A2 — OM (400 mn)",
    zoneA3:"Zona A3 — Satélite INMARSAT",
    zoneA4:"Zona A4 — Polar (OC)",
  },
  pt:{
    back:"◀ Voltar", module:"Navegação & Cartografia",
    lesson:"Lição", xp:"XP ganhos",
    quiz:"QUIZ", question:"Pergunta", ofQ:"de",
    correct:"✓ Correto!", wrong:"✗ Resposta errada",
    expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →",
    startQuiz:"✅ COMEÇAR O QUIZ", result:"RESULTADO",
    complete:"🏅 LIÇÃO CONCLUÍDA!", nextLesson:"LIÇÃO 4 →",
    backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:",
    downloadMemo:"📥 Baixar ficha resumo",
    readFirst:"Leia o conteúdo e depois comece o quiz",
    scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪",
    scoreGood:"Continue! 📚",
    globeTitle:"GLOBO INTERATIVO — Equador & Paralelos",
    coordTitle:"COORDENADAS INTERATIVAS",
    coordClick:"Clique no globo para obter coordenadas",
    zoneTitle:"ZONAS IMO / GMDSS",
    zoneClick:"Clique numa zona para ver os equipamentos",
    converterTitle:"CONVERSOR DMS ↔ DD",
    convert:"Converter",
    dmsLabel:"Formato DMS (cartas náuticas)",
    ddLabel:"Formato DD (informática)",
    dmLabel:"Formato DM (GPS / ECDIS)",
    zoneA1:"Zona A1 — VHF Costeira",
    zoneA2:"Zona A2 — MF (400 mn)",
    zoneA3:"Zona A3 — Satélite INMARSAT",
    zoneA4:"Zona A4 — Polar (HF)",
  },
};

// ══════════════════════════════════════════════
//  QUIZ DATA
// ══════════════════════════════════════════════
const QUIZ = {
  fr:[
    { q:"Qu'est-ce que l'Équateur en navigation ?",
      opts:["Le méridien de référence à 0° de longitude","Le parallèle à 0° de latitude qui divise la Terre en deux hémisphères égaux","La ligne de changement de date à 180°","Le cercle polaire arctique à 66°33'N"],
      correct:1, expl:"L'Équateur est le grand cercle imaginaire perpendiculaire à l'axe de rotation de la Terre, situé à 0° de latitude. Il divise la Terre en hémisphère Nord et hémisphère Sud. C'est la référence zéro de toutes les latitudes." },
    { q:"Comment mesure-t-on une distance en milles nautiques sur une carte marine Mercator ?",
      opts:["Sur l'échelle de longitude en bas de la carte","Sur l'échelle de latitude sur les côtés — 1 minute = 1 mille nautique","Avec une règle graduée en centimètres","Sur l'échelle de longitude ou latitude indifféremment"],
      correct:1, expl:"Sur une carte Mercator, 1 minute d'arc de latitude = 1 mille nautique. On mesure TOUJOURS sur l'échelle de latitude (côtés verticaux). L'échelle de longitude varie selon la latitude et ne peut pas servir à mesurer des distances." },
    { q:"Douala est à 04°03'N. Quelle est sa distance approximative à l'Équateur en milles nautiques ?",
      opts:["4 milles nautiques","43 milles nautiques","243 milles nautiques","403 milles nautiques"],
      correct:2, expl:"04°03' = 4×60 + 3 = 243 minutes d'arc de latitude. Comme 1 minute = 1 mille nautique, Douala est à 243 milles nautiques de l'Équateur (environ 450 km)." },
    { q:"Un navire navigue dans la zone A3 GMDSS. Quels équipements de communication de détresse doit-il obligatoirement avoir ?",
      opts:["VHF uniquement","VHF + MF uniquement","VHF + MF + INMARSAT (ou HF)","VHF + MF + INMARSAT + HF obligatoirement"],
      correct:2, expl:"Zone A3 (entre 70°N et 70°S) : VHF/ASN + MF/ASN + INMARSAT (ou HF comme alternative). La zone A3 couvre la majorité des océans — c'est la zone de navigation hauturière courante. La HF est optionnelle si INMARSAT est à bord." },
    { q:"Quelle est la différence entre la notation DMS et DD pour les coordonnées ?",
      opts:["DMS est pour les latitudes, DD pour les longitudes","DMS = Degrés Minutes Secondes (cartes), DD = Degrés Décimaux (informatique)","DMS est plus précis que DD","Il n'y a aucune différence — ce sont les mêmes valeurs"],
      correct:1, expl:"DMS (04°03'22\"N) = format des cartes marines papier et publications nautiques. DD (4,0561°N) = format informatique et logiciels. DM (04°03,370'N) = format GPS et ECDIS. Les trois formats représentent la même position, juste exprimée différemment." },
  ],
  en:[
    { q:"What is the Equator in navigation?",
      opts:["The reference meridian at 0° longitude","The parallel at 0° latitude dividing Earth into two equal hemispheres","The date change line at 180°","The Arctic Circle at 66°33'N"],
      correct:1, expl:"The Equator is the great imaginary circle perpendicular to Earth's rotation axis, at 0° latitude. It divides Earth into Northern and Southern hemispheres. It is the zero reference for all latitudes." },
    { q:"How do you measure a distance in nautical miles on a Mercator chart?",
      opts:["On the longitude scale at the bottom","On the latitude scale on the sides — 1 minute = 1 nautical mile","With a centimeter ruler","On either longitude or latitude scale"],
      correct:1, expl:"On a Mercator chart, 1 arc minute of latitude = 1 nautical mile. Always measure on the LATITUDE scale (vertical sides). The longitude scale varies with latitude and cannot be used to measure distances." },
    { q:"Douala is at 04°03'N. What is its approximate distance from the Equator in nautical miles?",
      opts:["4 nautical miles","43 nautical miles","243 nautical miles","403 nautical miles"],
      correct:2, expl:"04°03' = 4×60 + 3 = 243 arc minutes of latitude. Since 1 minute = 1 nautical mile, Douala is 243 nautical miles from the Equator (about 450 km)." },
    { q:"A vessel is navigating in GMDSS zone A3. What communication equipment must it carry?",
      opts:["VHF only","VHF + MF only","VHF + MF + INMARSAT (or HF)","VHF + MF + INMARSAT + HF mandatory"],
      correct:2, expl:"Zone A3 (between 70°N and 70°S): VHF/DSC + MF/DSC + INMARSAT (or HF as alternative). Zone A3 covers most oceans — it is the standard offshore navigation zone." },
    { q:"What is the difference between DMS and DD notation for coordinates?",
      opts:["DMS is for latitudes, DD for longitudes","DMS = Degrees Minutes Seconds (charts), DD = Decimal Degrees (computers)","DMS is more accurate than DD","There is no difference — same values"],
      correct:1, expl:"DMS (04°03'22\"N) = paper chart and nautical publication format. DD (4.0561°N) = computer and software format. DM (04°03.370'N) = GPS and ECDIS format. All three formats represent the same position, just expressed differently." },
  ],
  es:[
    { q:"¿Qué es el Ecuador en navegación?",
      opts:["El meridiano de referencia a 0° de longitud","El paralelo a 0° de latitud que divide la Tierra en dos hemisferios iguales","La línea de cambio de fecha a 180°","El círculo polar ártico a 66°33'N"],
      correct:1, expl:"El Ecuador es el gran círculo imaginario perpendicular al eje de rotación de la Tierra, a 0° de latitud. Divide la Tierra en hemisferio Norte y hemisferio Sur. Es la referencia cero de todas las latitudes." },
    { q:"¿Cómo se mide una distancia en millas náuticas en una carta Mercator?",
      opts:["En la escala de longitud en la parte inferior","En la escala de latitud en los lados — 1 minuto = 1 milla náutica","Con una regla graduada en centímetros","En la escala de longitud o latitud indistintamente"],
      correct:1, expl:"En una carta Mercator, 1 minuto de arco de latitud = 1 milla náutica. Siempre se mide en la escala de LATITUD (lados verticales). La escala de longitud varía con la latitud y no puede usarse para medir distancias." },
    { q:"Douala está a 04°03'N. ¿Cuál es su distancia aproximada al Ecuador en millas náuticas?",
      opts:["4 millas náuticas","43 millas náuticas","243 millas náuticas","403 millas náuticas"],
      correct:2, expl:"04°03' = 4×60 + 3 = 243 minutos de arco de latitud. Como 1 minuto = 1 milla náutica, Douala está a 243 millas náuticas del Ecuador (unos 450 km)." },
    { q:"Un buque navega en la zona A3 del SMSSM. ¿Qué equipos de comunicación de socorro debe llevar?",
      opts:["Solo VHF","VHF + OM únicamente","VHF + OM + INMARSAT (u OC)","VHF + OM + INMARSAT + OC obligatoriamente"],
      correct:2, expl:"Zona A3 (entre 70°N y 70°S): VHF/ASN + OM/ASN + INMARSAT (u OC como alternativa). La zona A3 cubre la mayoría de los océanos — es la zona de navegación de altura estándar." },
    { q:"¿Cuál es la diferencia entre la notación GMS y DD para las coordenadas?",
      opts:["GMS es para latitudes, DD para longitudes","GMS = Grados Minutos Segundos (cartas), DD = Grados Decimales (informática)","GMS es más preciso que DD","No hay diferencia — son los mismos valores"],
      correct:1, expl:"GMS (04°03'22\"N) = formato de cartas náuticas en papel. DD (4,0561°N) = formato informático. GM (04°03,370'N) = formato GPS y ECDIS. Los tres formatos representan la misma posición, expresada de forma diferente." },
  ],
  pt:[
    { q:"O que é o Equador na navegação?",
      opts:["O meridiano de referência a 0° de longitude","O paralelo a 0° de latitude que divide a Terra em dois hemisférios iguais","A linha de mudança de data a 180°","O círculo polar ártico a 66°33'N"],
      correct:1, expl:"O Equador é o grande círculo imaginário perpendicular ao eixo de rotação da Terra, a 0° de latitude. Divide a Terra em hemisfério Norte e hemisfério Sul. É a referência zero de todas as latitudes." },
    { q:"Como se mede uma distância em milhas náuticas numa carta Mercator?",
      opts:["Na escala de longitude na parte inferior","Na escala de latitude nos lados — 1 minuto = 1 milha náutica","Com uma régua em centímetros","Na escala de longitude ou latitude indistintamente"],
      correct:1, expl:"Numa carta Mercator, 1 minuto de arco de latitude = 1 milha náutica. Sempre medir na escala de LATITUDE (lados verticais). A escala de longitude varia com a latitude e não pode ser usada para medir distâncias." },
    { q:"Douala está a 04°03'N. Qual é a sua distância aproximada ao Equador em milhas náuticas?",
      opts:["4 milhas náuticas","43 milhas náuticas","243 milhas náuticas","403 milhas náuticas"],
      correct:2, expl:"04°03' = 4×60 + 3 = 243 minutos de arco de latitude. Como 1 minuto = 1 milha náutica, Douala está a 243 milhas náuticas do Equador (cerca de 450 km)." },
    { q:"Um navio navega na zona A3 do GMDSS. Que equipamentos de comunicação de socorro deve ter?",
      opts:["Apenas VHF","VHF + MF apenas","VHF + MF + INMARSAT (ou HF)","VHF + MF + INMARSAT + HF obrigatoriamente"],
      correct:2, expl:"Zona A3 (entre 70°N e 70°S): VHF/ASN + MF/ASN + INMARSAT (ou HF como alternativa). A zona A3 cobre a maioria dos oceanos — é a zona de navegação de longo curso padrão." },
    { q:"Qual é a diferença entre a notação DMS e DD para as coordenadas?",
      opts:["DMS é para latitudes, DD para longitudes","DMS = Graus Minutos Segundos (cartas), DD = Graus Decimais (informática)","DMS é mais preciso que DD","Não há diferença — são os mesmos valores"],
      correct:1, expl:"DMS (04°03'22\"N) = formato das cartas náuticas em papel. DD (4,0561°N) = formato informático. DM (04°03,370'N) = formato GPS e ECDIS. Os três formatos representam a mesma posição, expressa de forma diferente." },
  ],
};

// ══════════════════════════════════════════════
//  SVG INTERACTIVE GLOBE
// ══════════════════════════════════════════════
function GlobeSVG({ lang, t }) {
  const [hover, setHover] = useState(null);
  const cx = 150, cy = 120, r = 95;

  const parallels = [
    { lat:90, label:"90°N", color:"rgba(255,255,255,0.15)", y:cy-r },
    { lat:66.5, label:"66°33'N", color:"rgba(91,79,207,0.5)", y:cy-r*Math.sin(66.5*Math.PI/180) },
    { lat:45, label:"45°N", color:"rgba(255,255,255,0.2)", y:cy-r*Math.sin(45*Math.PI/180) },
    { lat:23.5, label:"23°26'N", color:"rgba(201,146,42,0.5)", y:cy-r*Math.sin(23.5*Math.PI/180) },
    { lat:0, label:"ÉQUATEUR 0°", color:C.gold, y:cy, bold:true },
    { lat:-23.5, label:"23°26'S", color:"rgba(201,146,42,0.5)", y:cy+r*Math.sin(23.5*Math.PI/180) },
    { lat:-45, label:"45°S", color:"rgba(255,255,255,0.2)", y:cy+r*Math.sin(45*Math.PI/180) },
    { lat:-66.5, label:"66°33'S", color:"rgba(91,79,207,0.5)", y:cy+r*Math.sin(66.5*Math.PI/180) },
    { lat:-90, label:"90°S", color:"rgba(255,255,255,0.15)", y:cy+r },
  ];

  const cities = [
    { name:"Douala 🇨🇲", lat:4.06, lon:9.7, color:C.gold2 },
    { name:"Dakar 🇸🇳", lat:14.7, lon:-17.4, color:C.orange },
    { name:"Lagos 🇳🇬", lat:6.45, lon:3.4, color:"#e74c3c" },
    { name:"Paris 🇫🇷", lat:48.85, lon:2.35, color:C.blue2 },
    { name:"Tokyo 🇯🇵", lat:35.7, lon:139.7, color:C.teal },
  ];

  // Project lat/lon to SVG (simple cylindrical)
  const project = (lat, lon) => {
    const x = cx + (lon/180) * r;
    const y = cy - (lat/90) * r;
    return { x, y };
  };

  return (
    <div style={{ textAlign:"center" }}>
      <svg width="300" height="240" viewBox="0 0 300 240">
        {/* Ocean background */}
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1a4a8a"/>
            <stop offset="60%" stopColor="#0a2040"/>
            <stop offset="100%" stopColor="#060e1a"/>
          </radialGradient>
          <clipPath id="globeClip">
            <ellipse cx={cx} cy={cy} rx={r} ry={r}/>
          </clipPath>
        </defs>

        {/* Globe base */}
        <ellipse cx={cx} cy={cy} rx={r} ry={r}
          fill="url(#globeGrad)"
          stroke={C.border} strokeWidth="1.5"/>

        {/* Grid lines (meridians) */}
        {[-120,-60,0,60,120].map(lon => {
          const x = cx + (lon/180) * r;
          return <line key={lon} x1={x} y1={cy-r} x2={x} y2={cy+r}
            stroke="rgba(77,166,255,0.12)" strokeWidth="0.8"
            clipPath="url(#globeClip)"/>;
        })}

        {/* Parallels */}
        {parallels.map((p, i) => {
          const halfW = Math.sqrt(Math.max(0, r*r - (p.y-cy)*(p.y-cy)));
          if (halfW < 2) return null;
          return (
            <g key={i}>
              <line x1={cx-halfW} y1={p.y} x2={cx+halfW} y2={p.y}
                stroke={p.bold?C.gold:p.color}
                strokeWidth={p.bold?2:0.8}
                clipPath="url(#globeClip)"/>
              {halfW > 30 && (
                <text x={cx+halfW+4} y={p.y+4}
                  fontSize={p.bold?9:7}
                  fill={p.bold?C.gold2:C.muted}
                  fontWeight={p.bold?"bold":"normal"}>
                  {p.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Greenwhich meridian */}
        <line x1={cx} y1={cy-r} x2={cx} y2={cy+r}
          stroke={C.blue2} strokeWidth="1.5" strokeDasharray="4,3"
          clipPath="url(#globeClip)" opacity="0.7"/>
        <text x={cx+3} y={cy-r+12} fontSize="7" fill={C.blue2}>0°</text>
        <text x={cx+3} y={cy-r+22} fontSize="6" fill={C.blue2}>Greenwich</text>

        {/* Globe highlight */}
        <ellipse cx={cx-20} cy={cy-25} rx={r*0.35} ry={r*0.25}
          fill="rgba(255,255,255,0.04)"
          clipPath="url(#globeClip)"/>

        {/* City points */}
        {cities.map((city, i) => {
          const pt = project(city.lat, city.lon);
          const isHovered = hover === i;
          return (
            <g key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor:"pointer" }}>
              <circle cx={pt.x} cy={pt.y} r={isHovered?7:4}
                fill={city.color} opacity={0.9}
                clipPath="url(#globeClip)"
                style={{ transition:"r 0.2s" }}/>
              {isHovered && (
                <g>
                  <rect x={pt.x+8} y={pt.y-16} width={80} height={30}
                    rx={6} fill="rgba(6,14,26,0.92)"
                    stroke={city.color} strokeWidth="1"/>
                  <text x={pt.x+12} y={pt.y-4} fontSize="8"
                    fill={C.white} fontWeight="bold">{city.name}</text>
                  <text x={pt.x+12} y={pt.y+8} fontSize="7"
                    fill={C.muted}>
                    {city.lat>0?`${city.lat.toFixed(1)}°N`:`${Math.abs(city.lat).toFixed(1)}°S`}
                    {" "}
                    {city.lon>0?`${city.lon.toFixed(1)}°E`:`${Math.abs(city.lon).toFixed(1)}°W`}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Globe border */}
        <ellipse cx={cx} cy={cy} rx={r} ry={r}
          fill="none" stroke={C.gold} strokeWidth="1.5" opacity="0.4"/>

        {/* Axis */}
        <line x1={cx} y1={cy-r-10} x2={cx} y2={cy+r+10}
          stroke="rgba(255,255,255,0.2)" strokeWidth="1"
          strokeDasharray="3,3"/>
        <polygon points={`${cx-4},${cy-r-6} ${cx+4},${cy-r-6} ${cx},${cy-r-14}`}
          fill="rgba(255,255,255,0.3)"/>
      </svg>
      <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>
        {lang==="fr"?"Survole les points pour voir les coordonnées"
         :lang==="es"?"Pasa el cursor por los puntos para ver coordenadas"
         :lang==="pt"?"Passe o cursor pelos pontos para ver coordenadas"
         :"Hover the dots to see coordinates"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  IMO ZONES SVG
// ══════════════════════════════════════════════
function ZonesSVG({ lang, t }) {
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = {
    A4N: { color:C.zoneA4, label:"A4", y:0, h:30,
      info:{
        fr:{name:"Zone A4 — Polaire Nord (>70°N)",equip:"VHF/ASN · MF/ASN · INMARSAT · HF",desc:"Arctique — hors couverture INMARSAT. HF obligatoire."},
        en:{name:"Zone A4 — North Polar (>70°N)",equip:"VHF/DSC · MF/DSC · INMARSAT · HF",desc:"Arctic — outside INMARSAT coverage. HF mandatory."},
        es:{name:"Zona A4 — Polar Norte (>70°N)",equip:"VHF/ASN · OM/ASN · INMARSAT · OC",desc:"Ártico — fuera cobertura INMARSAT. OC obligatorio."},
        pt:{name:"Zona A4 — Polar Norte (>70°N)",equip:"VHF/ASN · MF/ASN · INMARSAT · HF",desc:"Ártico — fora da cobertura INMARSAT. HF obrigatório."},
      }
    },
    A3: { color:C.zoneA3, label:"A3", y:30, h:120,
      info:{
        fr:{name:"Zone A3 — Satellite INMARSAT (70°N à 70°S)",equip:"VHF/ASN · MF/ASN · INMARSAT ou HF",desc:"Navigation hauturière standard. Couvre la majorité des océans."},
        en:{name:"Zone A3 — INMARSAT Satellite (70°N to 70°S)",equip:"VHF/DSC · MF/DSC · INMARSAT or HF",desc:"Standard offshore navigation. Covers most oceans."},
        es:{name:"Zona A3 — Satélite INMARSAT (70°N a 70°S)",equip:"VHF/ASN · OM/ASN · INMARSAT u OC",desc:"Navegación de altura estándar. Cubre la mayoría de los océanos."},
        pt:{name:"Zona A3 — Satélite INMARSAT (70°N a 70°S)",equip:"VHF/ASN · MF/ASN · INMARSAT ou HF",desc:"Navegação de longo curso padrão. Cobre a maioria dos oceanos."},
      }
    },
    A4S: { color:C.zoneA4, label:"A4", y:150, h:30,
      info:{
        fr:{name:"Zone A4 — Polaire Sud (>70°S)",equip:"VHF/ASN · MF/ASN · INMARSAT · HF",desc:"Antarctique — hors couverture INMARSAT. HF obligatoire."},
        en:{name:"Zone A4 — South Polar (>70°S)",equip:"VHF/DSC · MF/DSC · INMARSAT · HF",desc:"Antarctic — outside INMARSAT coverage. HF mandatory."},
        es:{name:"Zona A4 — Polar Sur (>70°S)",equip:"VHF/ASN · OM/ASN · INMARSAT · OC",desc:"Antártico — fuera cobertura INMARSAT. OC obligatorio."},
        pt:{name:"Zona A4 — Polar Sul (>70°S)",equip:"VHF/ASN · MF/ASN · INMARSAT · HF",desc:"Antártico — fora da cobertura INMARSAT. HF obrigatório."},
      }
    },
  };

  const selectedInfo = selectedZone ? zones[selectedZone]?.info?.[lang] || zones[selectedZone]?.info?.fr : null;

  return (
    <div>
      <svg width="300" height="180" viewBox="0 0 300 180">
        {/* World map background */}
        <rect width="300" height="180" fill="#061020"/>

        {/* Zone bands */}
        {Object.entries(zones).map(([key, zone]) => (
          <rect key={key} x="0" y={zone.y} width="300" height={zone.h}
            fill={selectedZone===key?zone.color+"55":zone.color+"22"}
            stroke={selectedZone===key?zone.color:zone.color+"55"}
            strokeWidth={selectedZone===key?2:0.8}
            style={{ cursor:"pointer", transition:"all 0.2s" }}
            onClick={() => setSelectedZone(selectedZone===key?null:key)}/>
        ))}

        {/* A2 band overlay */}
        {[{y:30,h:15,label:"A2"},{y:135,h:15,label:"A2"}].map((b,i)=>(
          <g key={i}>
            <rect x="0" y={b.y} width="300" height={b.h}
              fill={selectedZone==="A2"?`${C.zoneA2}55`:`${C.zoneA2}33`}
              stroke={selectedZone==="A2"?C.zoneA2:`${C.zoneA2}66`}
              strokeWidth={selectedZone==="A2"?2:0.8}
              style={{ cursor:"pointer" }}
              onClick={() => setSelectedZone(selectedZone==="A2"?null:"A2")}/>
            <text x="8" y={b.y+10} fontSize="8" fill={C.zoneA2} fontWeight="bold">A2</text>
          </g>
        ))}

        {/* A1 band overlay */}
        {[{y:30,h:8},{y:142,h:8}].map((b,i)=>(
          <rect key={i} x="0" y={b.y} width="300" height={b.h}
            fill={`${C.zoneA1}33`}
            stroke={`${C.zoneA1}55`} strokeWidth="0.5"
            style={{ cursor:"pointer" }}
            onClick={() => setSelectedZone(selectedZone==="A1"?null:"A1")}/>
        ))}

        {/* Latitude labels */}
        {[
          { y:0, label:"90°N" },
          { y:30, label:"70°N" },
          { y:60, label:"45°N" },
          { y:90, label:"0° — ÉQUATEUR" },
          { y:120, label:"45°S" },
          { y:150, label:"70°S" },
          { y:180, label:"90°S" },
        ].map((l,i) => (
          <g key={i}>
            <line x1="0" y1={l.y} x2="300" y2={l.y}
              stroke={l.label.includes("ÉQUATEUR")?C.gold:"rgba(255,255,255,0.1)"}
              strokeWidth={l.label.includes("ÉQUATEUR")?1.5:0.5}
              strokeDasharray={l.label.includes("ÉQUATEUR")?"":"4,3"}/>
            <text x="240" y={l.y+10} fontSize="7"
              fill={l.label.includes("ÉQUATEUR")?C.gold2:C.muted}>
              {l.label}
            </text>
          </g>
        ))}

        {/* Zone labels */}
        <text x="8" y="20" fontSize="9" fill={C.zoneA4} fontWeight="bold">A4</text>
        <text x="8" y="96" fontSize="11" fill={C.zoneA3} fontWeight="bold">A3</text>
        <text x="8" y="170" fontSize="9" fill={C.zoneA4} fontWeight="bold">A4</text>

        {/* A1 label */}
        <text x="220" y="42" fontSize="7" fill={C.zoneA1} fontWeight="bold">A1</text>
        <text x="220" y="152" fontSize="7" fill={C.zoneA1} fontWeight="bold">A1</text>
      </svg>

      {/* Zone info panel */}
      {(selectedZone && selectedZone !== "A1" && selectedZone !== "A2") && selectedInfo && (
        <div style={{
          marginTop:10, padding:"12px 14px", borderRadius:14,
          background:`${zones[selectedZone]?.color}18`,
          border:`1px solid ${zones[selectedZone]?.color}44`,
          animation:"fadeUp 0.3s ease",
        }}>
          <div style={{ fontSize:12, fontWeight:700,
            color:zones[selectedZone]?.color, marginBottom:6 }}>
            {selectedInfo.name}
          </div>
          <div style={{ fontSize:11, color:C.gold2,
            marginBottom:4, fontWeight:600 }}>
            📡 {selectedInfo.equip}
          </div>
          <div style={{ fontSize:11, color:C.muted }}>
            {selectedInfo.desc}
          </div>
        </div>
      )}
      {selectedZone === "A1" && (
        <div style={{ marginTop:10, padding:"12px 14px", borderRadius:14,
          background:`${C.zoneA1}18`, border:`1px solid ${C.zoneA1}44` }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.zoneA1, marginBottom:4 }}>
            {t.zoneA1}
          </div>
          <div style={{ fontSize:11, color:C.gold2, marginBottom:4 }}>
            📡 VHF/ASN uniquement
          </div>
          <div style={{ fontSize:11, color:C.muted }}>
            {lang==="fr"?"Portée ~20-50 mn des stations côtières. Navigation portuaire et côtière proche."
             :lang==="es"?"Alcance ~20-50 mn de estaciones costeras. Navegación portuaria y costera cercana."
             :lang==="pt"?"Alcance ~20-50 mn das estações costeiras. Navegação portuária e costeira."
             :"Range ~20-50 nm from coastal stations. Harbor and near-coastal navigation."}
          </div>
        </div>
      )}
      {selectedZone === "A2" && (
        <div style={{ marginTop:10, padding:"12px 14px", borderRadius:14,
          background:`${C.zoneA2}18`, border:`1px solid ${C.zoneA2}44` }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.zoneA2, marginBottom:4 }}>
            {t.zoneA2}
          </div>
          <div style={{ fontSize:11, color:C.gold2, marginBottom:4 }}>
            📡 VHF/ASN + MF/ASN (2182 kHz)
          </div>
          <div style={{ fontSize:11, color:C.muted }}>
            {lang==="fr"?"Au-delà de A1, jusqu'à ~400 mn des côtes. Navigation côtière éloignée."
             :lang==="es"?"Más allá de A1, hasta ~400 mn de la costa. Navegación costera alejada."
             :lang==="pt"?"Além de A1, até ~400 mn da costa. Navegação costeira afastada."
             :"Beyond A1, up to ~400 nm from shore. Extended coastal navigation."}
          </div>
        </div>
      )}
      {!selectedZone && (
        <div style={{ marginTop:8, fontSize:10, color:C.muted, textAlign:"center" }}>
          {t.zoneClick}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
//  DMS ↔ DD CONVERTER
// ══════════════════════════════════════════════
function CoordConverter({ lang, t }) {
  const [deg, setDeg] = useState("4");
  const [min, setMin] = useState("3");
  const [sec, setSec] = useState("22");
  const [hemi, setHemi] = useState("N");

  const dms2dd = () => {
    const d = parseFloat(deg)||0;
    const m = parseFloat(min)||0;
    const s = parseFloat(sec)||0;
    const dd = d + m/60 + s/3600;
    return (hemi==="S"||hemi==="W") ? -dd : dd;
  };

  const dd = dms2dd();
  const dmMin = parseFloat(min) + (parseFloat(sec)||0)/60;
  const ddAbs = Math.abs(dd);

  const inputStyle = {
    width:"60px", padding:"8px 6px", borderRadius:8, textAlign:"center",
    background:"rgba(255,255,255,0.08)", border:`1px solid ${C.border}`,
    color:C.white, fontSize:14, fontFamily:"monospace",
  };

  return (
    <div>
      {/* DMS Input */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:1,
          marginBottom:8, fontFamily:"'Cinzel',serif" }}>
          {t.dmsLabel}
        </div>
        <div style={{ display:"flex", alignItems:"center",
          gap:6, flexWrap:"wrap", justifyContent:"center" }}>
          <input type="number" value={deg}
            onChange={e=>setDeg(e.target.value)}
            style={inputStyle} placeholder="DD"/>
          <span style={{ color:C.gold2, fontWeight:700 }}>°</span>
          <input type="number" value={min}
            onChange={e=>setMin(e.target.value)}
            style={inputStyle} placeholder="MM"/>
          <span style={{ color:C.gold2, fontWeight:700 }}>'</span>
          <input type="number" value={sec}
            onChange={e=>setSec(e.target.value)}
            style={inputStyle} placeholder="SS"/>
          <span style={{ color:C.gold2, fontWeight:700 }}>"</span>
          <select value={hemi} onChange={e=>setHemi(e.target.value)}
            style={{...inputStyle, width:"50px"}}>
            <option>N</option><option>S</option>
            <option>E</option><option>W</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {[
          { label:t.dmsLabel, value:`${deg}° ${min}' ${sec}" ${hemi}`, color:C.blue2 },
          { label:t.dmLabel, value:`${deg}° ${dmMin.toFixed(3)}' ${hemi}`, color:C.gold2 },
          { label:t.ddLabel, value:`${dd.toFixed(6)}°`, color:C.green },
        ].map((r,i)=>(
          <div key={i} style={{
            display:"flex", justifyContent:"space-between",
            alignItems:"center", padding:"8px 12px", borderRadius:10,
            background:"rgba(255,255,255,0.04)",
            border:`1px solid ${r.color}33`,
          }}>
            <span style={{ fontSize:10, color:C.muted }}>{r.label}</span>
            <span style={{
              fontFamily:"monospace", fontSize:13,
              fontWeight:700, color:r.color,
            }}>{r.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop:10, padding:"8px 12px", borderRadius:10,
        background:"rgba(201,146,42,0.08)",
        border:`1px solid ${C.gold}33`,
        fontSize:11, color:C.gold2, textAlign:"center" }}>
        {lang==="fr"?`Distance à l'Équateur : ${(Math.abs(dd)*60).toFixed(1)} milles nautiques`
         :lang==="es"?`Distancia al Ecuador: ${(Math.abs(dd)*60).toFixed(1)} millas náuticas`
         :lang==="pt"?`Distância ao Equador: ${(Math.abs(dd)*60).toFixed(1)} milhas náuticas`
         :`Distance from Equator: ${(Math.abs(dd)*60).toFixed(1)} nautical miles`}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  LESSON CONTENT
// ══════════════════════════════════════════════
const SECTIONS = {
  fr:[
    { type:"badge", text:"📚 Navigation & Cartographie · Leçon 3/8 · ⭐ Premium · 150 XP" },
    { type:"title", text:"La Terre & Les Coordonnées Géographiques" },
    { type:"intro", text:"Deux nombres suffisent pour localiser n'importe quel point sur Terre avec une précision au mètre près.\n\n04°03'22\"N · 009°41'42\"E\n\nCes deux coordonnées désignent Douala — une ville parmi les 8 milliards de points possibles sur Terre. Comment ce système fonctionne-t-il ? Pourquoi est-il universel ? Et comment l'utiliser en navigation ?" },
    { type:"section_title", icon:"🌍", text:"PARTIE 1 — LA TERRE" },
    { type:"content", icon:"🌐", title:"Forme réelle de la Terre — Le géoïde",
      text:"La Terre n'est pas une sphère parfaite. C'est un GÉOÏDE — légèrement aplati aux pôles et renflé à l'équateur, à cause de la force centrifuge de sa rotation.\n\nDiamètre équatorial : 12 756 km\nDiamètre polaire    : 12 714 km\nDifférence          : 42 km (0,3%)\n\nPour la navigation pratique, on considère la Terre comme une sphère parfaite — l'erreur est négligeable.\n\nL'axe de rotation passe par les deux PÔLES GÉOGRAPHIQUES :\n• Pôle Nord → 90°N\n• Pôle Sud → 90°S\n\nC'est cet axe qui définit la référence de base de tout le système de coordonnées." },
    { type:"section_title", icon:"🟡", text:"PARTIE 2 — L'ÉQUATEUR" },
    { type:"globe_svg" },
    { type:"keypoint", icon:"🟡", title:"L'Équateur — La référence absolue",
      text:"L'ÉQUATEUR est le grand cercle imaginaire qui divise la Terre en deux hémisphères égaux, perpendiculaire à l'axe de rotation.\n\nLatitude de l'Équateur : 0° exactement\nLongueur : 40 075 km\nDistance aux pôles : 10 007 km\n\nHÉMISPHÈRE NORD : 0° à 90°N\nFrance, UK, Japon, Cameroun nord...\n\nHÉMISPHÈRE SUD : 0° à 90°S\nAustralie, Brésil, Afrique du Sud...\n\n💡 Le Cameroun : la ligne équatoriale traverse le Cameroun dans sa partie sud, entre Ambam et Sangmélima. Le sud du pays a un climat équatorial, le nord tropical." },
    { type:"section_title", icon:"📏", text:"PARTIE 3 — LATITUDE & LONGITUDE" },
    { type:"content", icon:"📏", title:"Les Parallèles et la Latitude",
      text:"Les PARALLÈLES sont des cercles imaginaires parallèles à l'Équateur, de plus en plus petits vers les pôles.\n\nLA LATITUDE = angle entre l'Équateur et le point, mesuré depuis le centre de la Terre.\n• N = Hémisphère Nord · S = Hémisphère Sud\n• De 0° (Équateur) à 90° (Pôles)\n\nRelation FONDAMENTALE pour la navigation :\n1° de latitude = 60 milles nautiques\n1' de latitude = 1 mille nautique = 1 852 m\n\n→ On mesure TOUJOURS les distances sur l'échelle de LATITUDE d'une carte marine !\n\nParallèles importants :\n• 23°26'N/S : Tropiques du Cancer/Capricorne\n• 66°33'N/S : Cercles Polaires\n• 90°N/S : Pôles" },
    { type:"content", icon:"🧭", title:"Les Méridiens et la Longitude",
      text:"Les MÉRIDIENS sont des demi-cercles allant d'un pôle à l'autre, perpendiculaires à l'Équateur. Tous ont la même longueur.\n\nLA LONGITUDE = angle depuis le méridien de Greenwich (0°), mesuré à l'Équateur.\n• E = Est de Greenwich · W = Ouest\n• De 0° (Greenwich) à 180°\n\nPourquoi Greenwich ? En 1884, la Conférence Internationale de Washington choisit l'Observatoire Royal de Greenwich (Londres) comme méridien de référence — la Grande-Bretagne dominait les mers et 72% du commerce utilisait déjà ses cartes.\n\nLa LIGNE DE CHANGEMENT DE DATE à 180° :\n• Vers l'est → on recule d'un jour\n• Vers l'ouest → on avance d'un jour" },
    { type:"section_title", icon:"📍", text:"PARTIE 4 — COORDONNÉES & MESURE" },
    { type:"converter_svg" },
    { type:"keypoint", icon:"📍", title:"Les 3 formats de coordonnées",
      text:"Les coordonnées d'un point s'écrivent LATITUDE D'ABORD, puis LONGITUDE.\n\nFormat DMS — Cartes marines papier :\n04° 03' 22\" N · 009° 41' 42\" E\n\nFormat DM — GPS et ECDIS :\n04° 03,370' N · 009° 41,700' E\n\nFormat DD — Informatique :\n4,0561° · 9,6950°\n\nConversion DMS → DD :\nDD = Degrés + (Minutes ÷ 60) + (Secondes ÷ 3600)\nExemple : 04°03'22\" = 4 + 3÷60 + 22÷3600 = 4,0561°\n\n⚠️ MESURE SUR CARTE : On utilise TOUJOURS l'échelle de LATITUDE (côtés verticaux). Jamais l'échelle de longitude — elle varie selon la latitude sur une carte Mercator." },
    { type:"content", icon:"⏰", title:"Les Fuseaux Horaires et l'UTC",
      text:"La Terre fait 360° en 24 heures → 15° par heure → 24 fuseaux horaires.\n\nUTC (Temps Universel Coordonné) = référence mondiale basée sur Greenwich.\n\nFuseaux importants pour le marin :\n• Greenwich, UK : UTC+0\n• Douala, Cameroun : UTC+1\n• Lagos, Nigeria : UTC+1\n• Paris, France : UTC+1 (été : UTC+2)\n• New York, USA : UTC-5 (été : UTC-4)\n• Tokyo, Japon : UTC+9\n\n🔑 En navigation et communications maritimes, on utilise TOUJOURS l'UTC. Les annuaires des marées, les signaux radio, les bulletins météo — tout est en UTC." },
    { type:"section_title", icon:"📡", text:"PARTIE 5 — ZONES IMO / GMDSS" },
    { type:"zones_svg" },
    { type:"keypoint", icon:"📡", title:"Les 4 Zones GMDSS — Équipements obligatoires",
      text:"Zone A1 — VHF côtière (~20-50 mn des côtes)\n→ VHF/ASN uniquement\n\nZone A2 — MF (jusqu'à ~400 mn)\n→ VHF/ASN + MF/ASN (2182 kHz)\n\nZone A3 — Satellite INMARSAT (70°N à 70°S)\n→ VHF/ASN + MF/ASN + INMARSAT ou HF\n→ Couvre la majorité des océans\n→ Zone de navigation hauturière standard\n\nZone A4 — Polaire (au-delà de 70°N et 70°S)\n→ VHF/ASN + MF/ASN + INMARSAT + HF\n→ Arctique et Antarctique\n\nLien avec les coordonnées :\nUn marin qui connaît sa LATITUDE sait immédiatement dans quelle zone il navigue → donc quels équipements utiliser en cas de détresse." },
    { type:"summary",
      title:"RÉSUMÉ — LEÇON 3",
      points:[
        "La Terre = géoïde · Ø équatorial 12 756 km · Ø polaire 12 714 km",
        "Équateur = 0° latitude · Référence absolue · 40 075 km",
        "Latitude : 0° (Équateur) → 90° (Pôles) · N ou S",
        "1' de latitude = 1 mille nautique → mesure distance sur carte",
        "Longitude : 0° (Greenwich) → 180° · E ou W",
        "Fuseaux : 15° = 1 heure · UTC = référence universelle",
        "Formats : DMS (cartes) · DM (GPS) · DD (informatique)",
        "Zones GMDSS : A1(VHF) A2(MF) A3(INMARSAT) A4(HF)",
      ]
    },
  ],
  en:[
    { type:"badge", text:"📚 Navigation & Cartography · Lesson 3/8 · ⭐ Premium · 150 XP" },
    { type:"title", text:"The Earth & Geographic Coordinates" },
    { type:"intro", text:"Two numbers are enough to locate any point on Earth with meter precision.\n\n04°03'22\"N · 009°41'42\"E\n\nThese two coordinates designate Douala — one city among 8 billion possible points on Earth. How does this system work? Why is it universal? And how to use it in navigation?" },
    { type:"section_title", icon:"🌍", text:"PART 1 — THE EARTH" },
    { type:"content", icon:"🌐", title:"Real shape of the Earth — The geoid",
      text:"The Earth is not a perfect sphere. It is a GEOID — slightly flattened at the poles and bulging at the equator, due to the centrifugal force of its rotation.\n\nEquatorial diameter: 12,756 km\nPolar diameter: 12,714 km\nDifference: 42 km (0.3%)\n\nFor practical navigation, we treat the Earth as a perfect sphere — the error is negligible.\n\nThe rotation axis passes through the two GEOGRAPHIC POLES:\n• North Pole → 90°N\n• South Pole → 90°S" },
    { type:"section_title", icon:"🟡", text:"PART 2 — THE EQUATOR" },
    { type:"globe_svg" },
    { type:"keypoint", icon:"🟡", title:"The Equator — The absolute reference",
      text:"The EQUATOR is the great imaginary circle dividing Earth into two equal hemispheres, perpendicular to the rotation axis.\n\nEquator latitude: 0° exactly\nLength: 40,075 km\nDistance from poles: 10,007 km\n\nNORTHERN HEMISPHERE: 0° to 90°N\nFrance, UK, Japan, northern Cameroon...\n\nSOUTHERN HEMISPHERE: 0° to 90°S\nAustralia, Brazil, South Africa..." },
    { type:"section_title", icon:"📏", text:"PART 3 — LATITUDE & LONGITUDE" },
    { type:"content", icon:"📏", title:"Parallels and Latitude",
      text:"PARALLELS are imaginary circles parallel to the Equator, getting smaller toward the poles.\n\nLATITUDE = angle between the Equator and the point, measured from Earth's center.\n• N = Northern Hemisphere · S = Southern Hemisphere\n• From 0° (Equator) to 90° (Poles)\n\nFUNDAMENTAL relationship for navigation:\n1° of latitude = 60 nautical miles\n1' of latitude = 1 nautical mile = 1,852 m\n\n→ Always measure distances on the LATITUDE scale of a nautical chart!\n\nKey parallels:\n• 23°26'N/S: Tropics of Cancer/Capricorn\n• 66°33'N/S: Polar Circles\n• 90°N/S: Poles" },
    { type:"content", icon:"🧭", title:"Meridians and Longitude",
      text:"MERIDIANS are half-circles from pole to pole, perpendicular to the Equator. All have the same length.\n\nLONGITUDE = angle from the Greenwich meridian (0°), measured at the Equator.\n• E = East of Greenwich · W = West\n• From 0° (Greenwich) to 180°\n\nWhy Greenwich? In 1884, the International Meridian Conference chose the Royal Observatory in Greenwich (London) as the reference — Britain dominated the seas and 72% of world trade already used its charts.\n\nDATE LINE at 180°:\n• Going east → lose one day\n• Going west → gain one day" },
    { type:"section_title", icon:"📍", text:"PART 4 — COORDINATES & MEASUREMENT" },
    { type:"converter_svg" },
    { type:"keypoint", icon:"📍", title:"The 3 coordinate formats",
      text:"Coordinates are written LATITUDE FIRST, then LONGITUDE.\n\nDMS format — Paper nautical charts:\n04° 03' 22\" N · 009° 41' 42\" E\n\nDM format — GPS and ECDIS:\n04° 03.370' N · 009° 41.700' E\n\nDD format — Computers:\n4.0561° · 9.6950°\n\nConversion DMS → DD:\nDD = Degrees + (Minutes ÷ 60) + (Seconds ÷ 3600)\nExample: 04°03'22\" = 4 + 3÷60 + 22÷3600 = 4.0561°\n\n⚠️ CHART MEASUREMENT: Always use the LATITUDE scale (vertical sides). Never the longitude scale — it varies with latitude on a Mercator chart." },
    { type:"content", icon:"⏰", title:"Time Zones and UTC",
      text:"Earth rotates 360° in 24 hours → 15° per hour → 24 time zones.\n\nUTC (Coordinated Universal Time) = worldwide reference based on Greenwich.\n\nKey time zones for mariners:\n• Greenwich, UK: UTC+0\n• Douala, Cameroon: UTC+1\n• Lagos, Nigeria: UTC+1\n• Paris, France: UTC+1 (summer: UTC+2)\n• New York, USA: UTC-5 (summer: UTC-4)\n• Tokyo, Japan: UTC+9\n\n🔑 In maritime navigation and communications, always use UTC. Tide tables, radio signals, weather bulletins — all in UTC." },
    { type:"section_title", icon:"📡", text:"PART 5 — IMO / GMDSS ZONES" },
    { type:"zones_svg" },
    { type:"keypoint", icon:"📡", title:"The 4 GMDSS Zones — Required equipment",
      text:"Zone A1 — VHF coastal (~20-50 nm from shore)\n→ VHF/DSC only\n\nZone A2 — MF (up to ~400 nm)\n→ VHF/DSC + MF/DSC (2182 kHz)\n\nZone A3 — INMARSAT satellite (70°N to 70°S)\n→ VHF/DSC + MF/DSC + INMARSAT or HF\n→ Covers most oceans\n→ Standard offshore navigation zone\n\nZone A4 — Polar (beyond 70°N and 70°S)\n→ VHF/DSC + MF/DSC + INMARSAT + HF\n→ Arctic and Antarctic\n\nLink with coordinates:\nA mariner who knows their LATITUDE immediately knows what GMDSS zone they are in → what distress equipment to use." },
    { type:"summary",
      title:"SUMMARY — LESSON 3",
      points:[
        "Earth = geoid · Equatorial Ø 12,756 km · Polar Ø 12,714 km",
        "Equator = 0° latitude · Absolute reference · 40,075 km",
        "Latitude: 0° (Equator) → 90° (Poles) · N or S",
        "1' of latitude = 1 nautical mile → chart distance measurement",
        "Longitude: 0° (Greenwich) → 180° · E or W",
        "Time zones: 15° = 1 hour · UTC = universal reference",
        "Formats: DMS (charts) · DM (GPS) · DD (computers)",
        "GMDSS zones: A1(VHF) A2(MF) A3(INMARSAT) A4(HF)",
      ]
    },
  ],
  es:[
    { type:"badge", text:"📚 Navegación & Cartografía · Lección 3/8 · ⭐ Premium · 150 XP" },
    { type:"title", text:"La Tierra & Las Coordenadas Geográficas" },
    { type:"intro", text:"Dos números son suficientes para localizar cualquier punto en la Tierra con precisión de metros.\n\n04°03'22\"N · 009°41'42\"E\n\nEstas dos coordenadas designan Douala. ¿Cómo funciona este sistema? ¿Por qué es universal? ¿Cómo usarlo en navegación?" },
    { type:"section_title", icon:"🌍", text:"PARTE 1 — LA TIERRA" },
    { type:"content", icon:"🌐", title:"Forma real de la Tierra — El geoide",
      text:"La Tierra no es una esfera perfecta. Es un GEOIDE — ligeramente aplastado en los polos y abultado en el ecuador.\n\nDiámetro ecuatorial: 12.756 km\nDiámetro polar: 12.714 km\nDiferencia: 42 km (0,3%)\n\nEl eje de rotación pasa por los POLOS GEOGRÁFICOS:\n• Polo Norte → 90°N\n• Polo Sur → 90°S" },
    { type:"section_title", icon:"🟡", text:"PARTE 2 — EL ECUADOR" },
    { type:"globe_svg" },
    { type:"keypoint", icon:"🟡", title:"El Ecuador — La referencia absoluta",
      text:"El ECUADOR es el gran círculo imaginario que divide la Tierra en dos hemisferios iguales.\n\nLatitud del Ecuador: 0° exactamente\nLongitud: 40.075 km\n\nHEMISFERIO NORTE: 0° a 90°N\nHEMISFERIO SUR: 0° a 90°S" },
    { type:"section_title", icon:"📏", text:"PARTE 3 — LATITUD & LONGITUD" },
    { type:"content", icon:"📏", title:"Paralelos y Latitud",
      text:"Los PARALELOS son círculos imaginarios paralelos al Ecuador.\n\nLATITUD = ángulo entre el Ecuador y el punto.\n• N = Hemisferio Norte · S = Hemisferio Sur\n• De 0° (Ecuador) a 90° (Polos)\n\nRelación FUNDAMENTAL:\n1° de latitud = 60 millas náuticas\n1' de latitud = 1 milla náutica = 1.852 m\n\n→ Siempre medir en la escala de LATITUD en una carta náutica." },
    { type:"content", icon:"🧭", title:"Meridianos y Longitud",
      text:"Los MERIDIANOS son semicírculos de polo a polo.\n\nLONGITUD = ángulo desde el meridiano de Greenwich (0°).\n• E = Este de Greenwich · W = Oeste\n• De 0° (Greenwich) a 180°\n\nEn 1884, la Conferencia Internacional eligió Greenwich como referencia.\n\nLÍNEA DE CAMBIO DE FECHA a 180°:\n• Hacia el este → se pierde un día\n• Hacia el oeste → se gana un día" },
    { type:"section_title", icon:"📍", text:"PARTE 4 — COORDENADAS & MEDIDA" },
    { type:"converter_svg" },
    { type:"keypoint", icon:"📍", title:"Los 3 formatos de coordenadas",
      text:"Las coordenadas se escriben LATITUD PRIMERO, luego LONGITUD.\n\nFormato GMS — Cartas náuticas en papel:\n04° 03' 22\" N · 009° 41' 42\" E\n\nFormato GM — GPS y ECDIS:\n04° 03,370' N · 009° 41,700' E\n\nFormato DD — Informática:\n4,0561° · 9,6950°\n\nConversión GMS → DD:\nDD = Grados + (Minutos ÷ 60) + (Segundos ÷ 3600)" },
    { type:"content", icon:"⏰", title:"Husos Horarios y UTC",
      text:"La Tierra gira 360° en 24 horas → 15° por hora → 24 husos horarios.\n\nUTC = referencia mundial basada en Greenwich.\n\nHusos importantes para el marino:\n• Greenwich: UTC+0 · Douala: UTC+1 · Lagos: UTC+1\n• París: UTC+1 · Nueva York: UTC-5 · Tokio: UTC+9\n\n🔑 En navegación marítima siempre se usa UTC." },
    { type:"section_title", icon:"📡", text:"PARTE 5 — ZONAS OMI / SMSSM" },
    { type:"zones_svg" },
    { type:"keypoint", icon:"📡", title:"Las 4 Zonas SMSSM — Equipos obligatorios",
      text:"Zona A1 — VHF costera (~20-50 mn)\n→ Solo VHF/ASN\n\nZona A2 — OM (hasta ~400 mn)\n→ VHF/ASN + OM/ASN\n\nZona A3 — Satélite INMARSAT (70°N a 70°S)\n→ VHF/ASN + OM/ASN + INMARSAT u OC\n→ Cubre la mayoría de los océanos\n\nZona A4 — Polar (más allá de 70°)\n→ VHF + OM + INMARSAT + OC\n\nRelación con coordenadas:\nConociendo la LATITUD, el marino sabe qué zona SMSSM ocupa." },
    { type:"summary",
      title:"RESUMEN — LECCIÓN 3",
      points:[
        "Tierra = geoide · Ø ecuatorial 12.756 km · Ø polar 12.714 km",
        "Ecuador = 0° latitud · Referencia absoluta · 40.075 km",
        "Latitud: 0° (Ecuador) → 90° (Polos) · N o S",
        "1' de latitud = 1 milla náutica → medir distancias en carta",
        "Longitud: 0° (Greenwich) → 180° · E u O",
        "Husos: 15° = 1 hora · UTC = referencia universal",
        "Formatos: GMS (cartas) · GM (GPS) · DD (informática)",
        "Zonas SMSSM: A1(VHF) A2(OM) A3(INMARSAT) A4(OC)",
      ]
    },
  ],
  pt:[
    { type:"badge", text:"📚 Navegação & Cartografia · Lição 3/8 · ⭐ Premium · 150 XP" },
    { type:"title", text:"A Terra & As Coordenadas Geográficas" },
    { type:"intro", text:"Dois números são suficientes para localizar qualquer ponto na Terra com precisão de metros.\n\n04°03'22\"N · 009°41'42\"E\n\nEstas coordenadas designam Douala. Como funciona este sistema? Por que é universal? Como usá-lo na navegação?" },
    { type:"section_title", icon:"🌍", text:"PARTE 1 — A TERRA" },
    { type:"content", icon:"🌐", title:"Forma real da Terra — O geóide",
      text:"A Terra não é uma esfera perfeita. É um GEÓIDE — ligeiramente achatado nos polos e abaulado no equador.\n\nDiâmetro equatorial: 12.756 km\nDiâmetro polar: 12.714 km\nDiferença: 42 km (0,3%)\n\nO eixo de rotação passa pelos POLOS GEOGRÁFICOS:\n• Polo Norte → 90°N · Polo Sul → 90°S" },
    { type:"section_title", icon:"🟡", text:"PARTE 2 — O EQUADOR" },
    { type:"globe_svg" },
    { type:"keypoint", icon:"🟡", title:"O Equador — A referência absoluta",
      text:"O EQUADOR é o grande círculo imaginário que divide a Terra em dois hemisférios iguais.\n\nLatitude do Equador: 0° exatamente\nComprimento: 40.075 km\n\nHEMISFÉRIO NORTE: 0° a 90°N\nHEMISFÉRIO SUL: 0° a 90°S" },
    { type:"section_title", icon:"📏", text:"PARTE 3 — LATITUDE & LONGITUDE" },
    { type:"content", icon:"📏", title:"Paralelos e Latitude",
      text:"Os PARALELOS são círculos imaginários paralelos ao Equador.\n\nLATITUDE = ângulo entre o Equador e o ponto.\n• N = Hemisfério Norte · S = Hemisfério Sul\n• De 0° (Equador) a 90° (Polos)\n\nRelação FUNDAMENTAL:\n1° de latitude = 60 milhas náuticas\n1' de latitude = 1 milha náutica = 1.852 m\n\n→ Sempre medir na escala de LATITUDE de uma carta náutica." },
    { type:"content", icon:"🧭", title:"Meridianos e Longitude",
      text:"Os MERIDIANOS são semicírculos de polo a polo.\n\nLONGITUDE = ângulo a partir do meridiano de Greenwich (0°).\n• E = Leste de Greenwich · W = Oeste\n• De 0° (Greenwich) a 180°\n\nEm 1884, a Conferência Internacional escolheu Greenwich como referência.\n\nLINHA DE MUDANÇA DE DATA a 180°:\n• Para leste → perde um dia\n• Para oeste → ganha um dia" },
    { type:"section_title", icon:"📍", text:"PARTE 4 — COORDENADAS & MEDIDA" },
    { type:"converter_svg" },
    { type:"keypoint", icon:"📍", title:"Os 3 formatos de coordenadas",
      text:"As coordenadas escrevem-se LATITUDE PRIMEIRO, depois LONGITUDE.\n\nFormato DMS — Cartas náuticas em papel:\n04° 03' 22\" N · 009° 41' 42\" E\n\nFormato DM — GPS e ECDIS:\n04° 03,370' N · 009° 41,700' E\n\nFormato DD — Informática:\n4,0561° · 9,6950°\n\nConversão DMS → DD:\nDD = Graus + (Minutos ÷ 60) + (Segundos ÷ 3600)" },
    { type:"content", icon:"⏰", title:"Fusos Horários e UTC",
      text:"A Terra gira 360° em 24 horas → 15° por hora → 24 fusos horários.\n\nUTC = referência mundial baseada em Greenwich.\n\nFusos importantes para o marinheiro:\n• Greenwich: UTC+0 · Douala: UTC+1 · Lagos: UTC+1\n• Paris: UTC+1 · Nova Iorque: UTC-5 · Tóquio: UTC+9\n\n🔑 Na navegação marítima sempre se usa UTC." },
    { type:"section_title", icon:"📡", text:"PARTE 5 — ZONAS IMO / GMDSS" },
    { type:"zones_svg" },
    { type:"keypoint", icon:"📡", title:"As 4 Zonas GMDSS — Equipamentos obrigatórios",
      text:"Zona A1 — VHF costeira (~20-50 mn)\n→ Apenas VHF/ASN\n\nZona A2 — MF (até ~400 mn)\n→ VHF/ASN + MF/ASN\n\nZona A3 — Satélite INMARSAT (70°N a 70°S)\n→ VHF/ASN + MF/ASN + INMARSAT ou HF\n→ Cobre a maioria dos oceanos\n\nZona A4 — Polar (além de 70°)\n→ VHF + MF + INMARSAT + HF\n\nRelação com coordenadas:\nConhecendo a LATITUDE, o marinheiro sabe em que zona GMDSS se encontra." },
    { type:"summary",
      title:"RESUMO — LIÇÃO 3",
      points:[
        "Terra = geóide · Ø equatorial 12.756 km · Ø polar 12.714 km",
        "Equador = 0° latitude · Referência absoluta · 40.075 km",
        "Latitude: 0° (Equador) → 90° (Polos) · N ou S",
        "1' de latitude = 1 milha náutica → medir distâncias na carta",
        "Longitude: 0° (Greenwich) → 180° · E ou W",
        "Fusos: 15° = 1 hora · UTC = referência universal",
        "Formatos: DMS (cartas) · DM (GPS) · DD (informática)",
        "Zonas GMDSS: A1(VHF) A2(MF) A3(INMARSAT) A4(HF)",
      ]
    },
  ],
};

// ── Shared UI ─────────────────────────────────
function Stars(){const s=Array.from({length:20},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{left:-100%}100%{left:200%}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}

function Block({block,lang,t}){
  switch(block.type){
    case "badge": return <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold,fontWeight:700}}>{block.text}</div>;
    case "title": return <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{block.text}</h1>;
    case "intro": return <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}><div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
    case "section_title": return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{block.icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.gold,letterSpacing:2}}>{block.text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${C.gold}44,transparent)`}}/></div>;
    case "content": return <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>{block.icon}</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{block.title}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
    case "keypoint": return <div style={{background:`linear-gradient(135deg,rgba(201,146,42,0.12),rgba(13,31,60,0.6))`,border:`1px solid ${C.gold}44`,borderLeft:`3px solid ${C.gold}`,borderRadius:16,padding:"16px",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:20}}>{block.icon}</span><span style={{fontSize:12,fontWeight:700,color:C.gold2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{block.title}</span></div><div style={{fontSize:13,color:C.white,lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></div>;
    case "summary": return <Card style={{marginBottom:14,background:`linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))`,border:`1px solid ${C.blue2}33`}}><div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{block.title}</div>{block.points.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<block.points.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}</Card>;
    case "globe_svg": return <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>{t.globeTitle}</div><GlobeSVG lang={lang} t={t}/></Card>;
    case "zones_svg": return <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>{t.zoneTitle}</div><ZonesSVG lang={lang} t={t}/></Card>;
    case "converter_svg": return <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:14}}>{t.converterTitle}</div><CoordConverter lang={lang} t={t}/></Card>;
    default: return null;
  }
}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?150:fs===3?100:50;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center",border:`1px solid ${pct>=80?C.gold:C.border}`}}><div style={{fontSize:11,letterSpacing:3,color:C.gold,marginBottom:14,fontFamily:"'Cinzel',serif"}}>{t.result}</div><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:15,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"13px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

export default function LessonCoord({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;
  const sections=SECTIONS[lang]||SECTIONS.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?20:phase==="quiz"?60:100;

  const learned={
    fr:["La Terre = géoïde · Ø équ. 12 756 km · Ø pol. 12 714 km","Équateur = 0° latitude · 40 075 km · Référence absolue","1' de latitude = 1 mille nautique → mesure sur carte","Coordonnées : latitude D'ABORD · DMS / DM / DD","Zones GMDSS : A1(VHF) A2(MF) A3(INMARSAT) A4(HF)","UTC = référence horaire universelle · 15° = 1 heure"],
    en:["Earth = geoid · Equatorial Ø 12,756 km · Polar 12,714 km","Equator = 0° latitude · 40,075 km · Absolute reference","1' of latitude = 1 nautical mile → chart measurement","Coordinates: latitude FIRST · DMS / DM / DD","GMDSS zones: A1(VHF) A2(MF) A3(INMARSAT) A4(HF)","UTC = universal time reference · 15° = 1 hour"],
    es:["Tierra = geoide · Ø ec. 12.756 km · Ø pol. 12.714 km","Ecuador = 0° latitud · 40.075 km · Referencia absoluta","1' de latitud = 1 milla náutica → medir en carta","Coordenadas: latitud PRIMERO · GMS / GM / DD","Zonas SMSSM: A1(VHF) A2(OM) A3(INMARSAT) A4(OC)","UTC = referencia horaria universal · 15° = 1 hora"],
    pt:["Terra = geóide · Ø eq. 12.756 km · Ø pol. 12.714 km","Equador = 0° latitude · 40.075 km · Referência absoluta","1' de latitude = 1 milha náutica → medir na carta","Coordenadas: latitude PRIMEIRO · DMS / DM / DD","Zonas GMDSS: A1(VHF) A2(MF) A3(INMARSAT) A4(HF)","UTC = referência horária universal · 15° = 1 hora"],
  };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif",marginBottom:1}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{t.lesson} 3/8</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&(
            <>
              {sections.map((block,i)=><Block key={i} block={block} lang={lang} t={t}/>)}
              <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
              <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
            </>
          )}
          {phase==="quiz"&&(
            <>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                  {lang==="fr"?"Teste tes connaissances":lang==="es"?"Pon a prueba tus conocimientos":lang==="pt"?"Teste seus conhecimentos":"Test your knowledge"}
                </div>
                <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3":lang==="es"?"preguntas · Lección 3":lang==="pt"?"perguntas · Lição 3":"questions · Lesson 3"}</div>
              </div>
              <QuizComp questions={quiz} t={t} onComplete={(s)=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
            </>
          )}
          {phase==="done"&&(
            <div style={{paddingTop:10}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:64,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?150:quizScore===3?100:50} {t.xp} ⭐</div>
              </div>
              <Card style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
                {(learned[lang]||learned.fr).map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.green,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>
              <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
                {lang==="fr"?"LEÇON 4 — LA CARTE MARINE →":lang==="es"?"LECCIÓN 4 — LA CARTA NÁUTICA →":lang==="pt"?"LIÇÃO 4 — A CARTA NÁUTICA →":"LESSON 4 — THE NAUTICAL CHART →"}
              </button>
              <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
