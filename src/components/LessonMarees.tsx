import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Navigation & Cartographie", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Navigation & Cartography", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Navegación & Cartografía", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee el contenido y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Navegação & Cartografia", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — TIDAL FORCES (Earth-Moon-Sun)
// ══════════════════════════════════════
function TidalForcesSVG({ lang }) {
  const [phase, setPhase] = useState(0); // 0=spring, 1=neap, 2=spring2
  const phases = [
    { label:{fr:"Vive-eau (syzygie)",en:"Spring tide (syzygy)",es:"Marea viva (sizigia)",pt:"Maré viva (sizígia)"}, moonX:230, sunX:-40, color:C.blue2, marnage:{fr:"Grand marnage",en:"Large range",es:"Gran amplitud",pt:"Grande amplitude"}, coeff:"95-120" },
    { label:{fr:"Morte-eau (quadrature)",en:"Neap tide (quadrature)",es:"Marea muerta (cuadratura)",pt:"Maré morta (quadratura)"}, moonX:145, sunX:-40, color:C.orange, marnage:{fr:"Petit marnage",en:"Small range",es:"Pequeña amplitud",pt:"Pequena amplitude"}, coeff:"20-45", moonY:60 },
    { label:{fr:"Vive-eau (opposition)",en:"Spring tide (opposition)",es:"Marea viva (oposición)",pt:"Maré viva (oposição)"}, moonX:55, sunX:-40, color:C.blue2, marnage:{fr:"Grand marnage",en:"Large range",es:"Gran amplitud",pt:"Grande amplitude"}, coeff:"95-120" },
  ];
  const p = phases[phase];
  return (
    <div>
      <svg width="290" height="140" viewBox="0 0 290 140">
        <rect width="290" height="140" fill="#020810" rx="8"/>
        {/* Stars */}
        {[[10,10],[30,25],[50,8],[80,18],[200,12],[240,22],[270,8],[120,30],[160,15]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={0.8} fill="white" opacity="0.5"/>
        ))}
        {/* Sun (left, off screen) */}
        <circle cx={-40} cy={70} r={35} fill="#FDB813" opacity="0.9"/>
        <circle cx={-40} cy={70} r={42} fill="#FDB813" opacity="0.15"/>
        {/* Sun rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
          const rad=a*Math.PI/180;
          return <line key={i} x1={-40+38*Math.cos(rad)} y1={70+38*Math.sin(rad)}
            x2={-40+48*Math.cos(rad)} y2={70+48*Math.sin(rad)}
            stroke="#FDB813" strokeWidth="1.5" opacity="0.4"/>;
        })}
        {/* Sun label */}
        <text x="18" y="12" fontSize="7" fill="#FDB813" fontWeight="600">☀️ {lang==="fr"?"Soleil":lang==="en"?"Sun":lang==="es"?"Sol":"Sol"}</text>

        {/* Gravity arrows (Sun→Earth) */}
        <line x1="10" y1="70" x2="110" y2="70" stroke="#FDB813" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
        <polygon points="110,70 102,66 102,74" fill="#FDB813" opacity="0.4"/>

        {/* Earth */}
        <circle cx="145" cy="70" r="22" fill="#1a6fd4"/>
        <ellipse cx="145" cy="70" rx="22" ry="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        {/* Continents simplified */}
        <ellipse cx="138" cy="62" rx="8" ry="6" fill="#2ecc71" opacity="0.7"/>
        <ellipse cx="152" cy="75" rx="6" ry="4" fill="#2ecc71" opacity="0.5"/>
        {/* Earth label */}
        <text x="145" y="105" textAnchor="middle" fontSize="7" fill={C.muted}>🌍 {lang==="fr"?"Terre":lang==="en"?"Earth":lang==="es"?"Tierra":"Terra"}</text>

        {/* Tidal bulges */}
        <ellipse cx="145" cy="70" rx={phase===1?24:30} ry="22"
          fill="none" stroke={p.color} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.7"/>

        {/* Moon */}
        {phase===1 ? (
          <g>
            <circle cx="145" cy={p.moonY||60} r="10" fill="#C0C0C0"/>
            <circle cx="148" cy={p.moonY?p.moonY-3:57} r="3" fill="#A0A0A0" opacity="0.5"/>
            <text x="163" y={(p.moonY||60)+4} fontSize="7" fill="#C0C0C0">🌙</text>
            {/* Moon 90° label */}
            <text x="145" y={p.moonY?p.moonY-16:44} textAnchor="middle" fontSize="6" fill={C.orange}>90°</text>
            <line x1="145" y1="48" x2="145" y2={p.moonY?p.moonY-12:58} stroke={C.orange} strokeWidth="0.8" strokeDasharray="2,1" opacity="0.5"/>
          </g>
        ) : (
          <g>
            <circle cx={p.moonX} cy="70" r="10" fill="#C0C0C0"/>
            <circle cx={p.moonX+3} cy="67" r="3" fill="#A0A0A0" opacity="0.5"/>
            {/* Gravity arrow Moon→Earth */}
            {phase===0 && <><line x1={p.moonX-11} y1="70" x2="167" y2="70" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/><polygon points="167,70 159,66 159,74" fill="#C0C0C0" opacity="0.5"/></>}
            {phase===2 && <><line x1={p.moonX+11} y1="70" x2="123" y2="70" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/><polygon points="123,70 131,66 131,74" fill="#C0C0C0" opacity="0.5"/></>}
            <text x={p.moonX} y="88" textAnchor="middle" fontSize="7" fill="#C0C0C0">🌙</text>
          </g>
        )}

        {/* Coefficient badge */}
        <rect x="200" y="8" width="84" height="28" rx="6" fill="rgba(0,0,0,0.6)" stroke={p.color} strokeWidth="0.8"/>
        <text x="242" y="20" textAnchor="middle" fontSize="7" fill={p.color} fontWeight="700">{p.marnage[lang]||p.marnage.fr}</text>
        <text x="242" y="30" textAnchor="middle" fontSize="7" fill={C.muted}>{lang==="fr"?"Coeff:":lang==="en"?"Coeff:":lang==="es"?"Coef:":"Coef:"} {p.coeff}</text>
      </svg>

      {/* Phase label */}
      <div style={{textAlign:"center",marginBottom:8,padding:"6px 12px",borderRadius:10,
        background:`${p.color}15`,border:`1px solid ${p.color}33`,
        fontSize:11,fontWeight:700,color:p.color}}>
        {p.label[lang]||p.label.fr}
      </div>

      {/* Phase buttons */}
      <div style={{display:"flex",gap:6}}>
        {phases.map((ph,i)=>(
          <button key={i} onClick={()=>setPhase(i)} style={{
            flex:1, padding:"7px 4px", borderRadius:10, fontSize:9, cursor:"pointer",
            background:phase===i?`${ph.color}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${phase===i?ph.color:"rgba(255,255,255,0.1)"}`,
            color:phase===i?ph.color:C.muted, fontWeight:phase===i?700:400,
          }}>
            {i===0?(lang==="fr"?"Vive-eau ①":lang==="en"?"Spring ①":lang==="es"?"Viva ①":"Viva ①")
            :i===1?(lang==="fr"?"Morte-eau":lang==="en"?"Neap tide":lang==="es"?"Muerta":"Morta")
            :(lang==="fr"?"Vive-eau ②":lang==="en"?"Spring ②":lang==="es"?"Viva ②":"Viva ②")}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — TIDE VOCABULARY
// ══════════════════════════════════════
function TideVocabSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const W=290, H=180;

  const items = [
    {id:"pm", x:245, y:35, label:{fr:"PM",en:"HW",es:"PM",pt:"PM"}, full:{fr:"Pleine Mer",en:"High Water",es:"Pleamar",pt:"Preia-Mar"}, desc:{fr:"Niveau maximum atteint par la mer\nHeure et hauteur notées dans l'annuaire",en:"Maximum sea level reached\nTime and height in tide tables",es:"Nivel máximo alcanzado por el mar\nHora y altura en los anuarios",pt:"Nível máximo atingido pelo mar"}, color:C.blue2},
    {id:"bm", x:245, y:145, label:{fr:"BM",en:"LW",es:"BM",pt:"BM"}, full:{fr:"Basse Mer",en:"Low Water",es:"Bajamar",pt:"Baixa-Mar"}, desc:{fr:"Niveau minimum atteint par la mer\nRéférence des profondeurs (datum)",en:"Minimum sea level reached\nDepth reference (datum)",es:"Nivel mínimo alcanzado por el mar\nReferencia de profundidades (datum)",pt:"Nível mínimo atingido pelo mar\nReferência das profundidades"}, color:C.orange},
    {id:"marnage", x:8, y:90, label:{fr:"Marnage",en:"Range",es:"Amplitud",pt:"Amplitude"}, full:{fr:"Marnage = PM - BM",en:"Range = HW - LW",es:"Amplitud = PM - BM",pt:"Amplitude = PM - BM"}, desc:{fr:"Différence de hauteur entre la PM et la BM\nGrand marnage (vive-eau) : jusqu'à 14m (Manche)\nPetit marnage (morte-eau) : 1-3m",en:"Height difference between HW and LW\nLarge range (spring): up to 14m (Channel)\nSmall range (neap): 1-3m",es:"Diferencia de altura entre PM y BM\nGran amplitud (viva): hasta 14m (La Mancha)\nPequeña amplitud (muerta): 1-3m",pt:"Diferença de altura entre PM e BM\nGrande amplitude (viva): até 14m (Canal)"}, color:C.gold2},
    {id:"datum", x:135, y:168, label:{fr:"Datum",en:"Datum",es:"Datum",pt:"Datum"}, full:{fr:"Zéro hydrographique (PBVVE)",en:"Chart Datum (LAT)",es:"Cero hidrográfico",pt:"Zero hidrográfico (LAT)"}, desc:{fr:"Niveau de référence des profondeurs sur les cartes\n= Plus Basses Eaux de Vives-Eaux (PBVVE)\nLa profondeur réelle ≥ profondeur cartographiée",en:"Reference level for chart depths\n= Lowest Astronomical Tide (LAT)\nActual depth ≥ charted depth",es:"Nivel de referencia de las profundidades\n= Bajamar Astronómica Inferior (BAI)\nProfundidad real ≥ profundidad cartografiada",pt:"Nível de referência das profundidades\n= Baixa-mar astronómica"}, color:C.red},
  ];

  const sel_ = sel ? items.find(i=>i.id===sel) : null;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Sea/land background */}
        <rect x="0" y="155" width={W} height="25" fill="rgba(139,90,43,0.3)"/>
        {/* Water level - full tide */}
        <rect x="30" y="30" width="210" height="130" fill="rgba(26,111,212,0.08)"/>
        {/* PM line */}
        <rect x="30" y="30" width="210" height="5" fill="rgba(77,166,255,0.3)" rx="1"/>
        <line x1="30" y1="32" x2="240" y2="32" stroke={C.blue2} strokeWidth="1.5"/>
        {/* BM line */}
        <line x1="30" y1="148" x2="240" y2="148" stroke={C.orange} strokeWidth="1.5"/>
        <rect x="30" y="143" width="210" height="5" fill="rgba(230,126,34,0.3)" rx="1"/>
        {/* Datum line */}
        <line x1="30" y1="158" x2="240" y2="158" stroke={C.red} strokeWidth="1" strokeDasharray="4,2"/>
        {/* Marnage bracket */}
        <line x1="20" y1="32" x2="20" y2="148" stroke={C.gold2} strokeWidth="2"/>
        <line x1="16" y1="32" x2="24" y2="32" stroke={C.gold2} strokeWidth="2"/>
        <line x1="16" y1="148" x2="24" y2="148" stroke={C.gold2} strokeWidth="2"/>
        {/* Animated water */}
        <path d="M30,90 Q90,85 150,90 Q210,95 240,90"
          fill="rgba(26,111,212,0.15)" stroke={C.blue2} strokeWidth="0.8" opacity="0.6"/>
        {/* Boat */}
        <g transform="translate(120,75)">
          <path d="M-15,5 L15,5 L10,15 L-10,15 Z" fill="#1a3a5c" stroke={C.gold} strokeWidth="1"/>
          <rect x="-2" y="-10" width="4" height="16" fill={C.muted}/>
          <polygon points="-2,-10 -2,-2 8,-6" fill={C.gold2} opacity="0.7"/>
        </g>
        {/* Height of water label */}
        <line x1="135" y1="148" x2="135" y2="158" stroke={C.green} strokeWidth="1.5"/>
        <text x="145" y="154" fontSize="6" fill={C.green}>{lang==="fr"?"Hd":lang==="en"?"Hd":lang==="es"?"Hd":"Hd"}</text>

        {/* Clickable labels */}
        {items.map(item=>(
          <g key={item.id} onClick={()=>setSel(sel===item.id?null:item.id)} style={{cursor:"pointer"}}>
            <rect x={item.id==="marnage"?item.x:item.id==="datum"?item.x-22:item.x-16}
              y={item.y-10} width={item.id==="marnage"?52:item.id==="datum"?44:32} height={18} rx={6}
              fill={sel===item.id?`${item.color}33`:`${item.color}15`}
              stroke={item.color} strokeWidth={sel===item.id?1.5:0.8}/>
            <text x={item.id==="marnage"?item.x+26:item.id==="datum"?item.x:item.x}
              y={item.y+3} textAnchor="middle" fontSize="8" fill={item.color} fontWeight="700">
              {item.label[lang]||item.label.fr}
            </text>
          </g>
        ))}
      </svg>

      {sel_ && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
          background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,
          animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:4}}>
            {sel_.full[lang]||sel_.full.fr}
          </div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
            {sel_.desc[lang]||sel_.desc.fr}
          </div>
        </div>
      )}
      {!sel_ && (
        <div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:6}}>
          {lang==="fr"?"Touche les étiquettes pour les définitions":
           lang==="en"?"Tap labels for definitions":
           lang==="es"?"Toca las etiquetas para las definiciones":
           "Toque os rótulos para as definições"}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — RULE OF TWELFTHS (interactive)
// ══════════════════════════════════════
function RuleOfTwelfthsSVG({ lang }) {
  const [hour, setHour] = useState(0);
  const [marnage, setMarnage] = useState(6);
  const [bm, setBm] = useState(1);

  // Rule: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12
  const fractions = [1,2,3,3,2,1];
  const cumulative = fractions.reduce((acc,f,i) => {
    const prev = acc.length ? acc[acc.length-1] : 0;
    return [...acc, prev + f];
  }, [0]);

  const waterHeight = (h) => bm + (cumulative[h] / 12) * marnage;
  const currentH = waterHeight(hour);
  const W=290, H=180;
  const maxH = bm + marnage + 0.5;

  const yScale = (h) => H - 30 - ((h - bm) / maxH) * (H - 50);

  // Curve points
  const curvePoints = Array.from({length:7},(_,i) => ({
    x: 20 + i*(W-40)/6,
    y: yScale(waterHeight(i)),
    h: waterHeight(i),
  }));

  const pathD = curvePoints.map((p,i) => `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Grid */}
        {[0,1,2,3,4,5,6].map(i=>(
          <line key={i}
            x1={20+i*(W-40)/6} y1="15"
            x2={20+i*(W-40)/6} y2={H-25}
            stroke="rgba(255,255,255,0.06)" strokeWidth="0.7"/>
        ))}
        {/* BM and PM lines */}
        <line x1="15" y1={yScale(bm)} x2={W-10} y2={yScale(bm)}
          stroke={C.orange} strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
        <text x="8" y={yScale(bm)+4} fontSize="6" fill={C.orange}>BM</text>
        <line x1="15" y1={yScale(bm+marnage)} x2={W-10} y2={yScale(bm+marnage)}
          stroke={C.blue2} strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
        <text x="8" y={yScale(bm+marnage)+4} fontSize="6" fill={C.blue2}>PM</text>

        {/* Water fill under curve */}
        <path d={`${pathD} L${curvePoints[6].x},${H-25} L${curvePoints[0].x},${H-25} Z`}
          fill="rgba(26,111,212,0.2)"/>
        {/* Tide curve */}
        <path d={pathD} fill="none" stroke={C.blue2} strokeWidth="2" strokeLinejoin="round"/>

        {/* Fraction bars */}
        {fractions.map((f,i)=>{
          const x1 = 20+i*(W-40)/6;
          const x2 = 20+(i+1)*(W-40)/6;
          const xm = (x1+x2)/2;
          const y1 = yScale(waterHeight(i));
          const y2 = yScale(waterHeight(i+1));
          return (
            <g key={i}>
              <rect x={xm-12} y={Math.min(y1,y2)-14} width={24} height={12} rx={4}
                fill={i===hour?`rgba(201,146,42,0.4)`:"rgba(0,0,0,0.4)"}
                stroke={i===hour?C.gold2:"rgba(255,255,255,0.1)"} strokeWidth={i===hour?1.5:0.8}/>
              <text x={xm} y={Math.min(y1,y2)-5} textAnchor="middle" fontSize="8"
                fill={i===hour?C.gold2:C.muted} fontWeight={i===hour?700:400}>
                {f}/12
              </text>
            </g>
          );
        })}

        {/* Current position marker */}
        {hour <= 6 && (
          <g>
            <circle cx={curvePoints[hour].x} cy={curvePoints[hour].y} r={6}
              fill={C.gold} stroke="white" strokeWidth="1.5"/>
            <line x1={curvePoints[hour].x} y1={curvePoints[hour].y}
              x2={curvePoints[hour].x} y2={H-25}
              stroke={C.gold} strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
            {/* Height label */}
            <rect x={curvePoints[hour].x+8} y={curvePoints[hour].y-8} width={50} height={18} rx={5}
              fill="rgba(6,14,26,0.9)" stroke={C.gold} strokeWidth="0.8"/>
            <text x={curvePoints[hour].x+33} y={curvePoints[hour].y+5} textAnchor="middle" fontSize="8"
              fill={C.gold} fontWeight="700">h={currentH.toFixed(1)}m</text>
          </g>
        )}

        {/* Hour labels */}
        {curvePoints.map((p,i)=>(
          <text key={i} x={p.x} y={H-12} textAnchor="middle" fontSize="7"
            fill={i===hour?C.gold2:C.muted}>h{i}</text>
        ))}

        {/* Title */}
        <text x={W/2} y="12" textAnchor="middle" fontSize="7" fill={C.gold2} fontWeight="700">
          {lang==="fr"?"Règle des douzièmes":lang==="en"?"Rule of Twelfths":lang==="es"?"Regla de los dozavos":"Regra dos doze avos"}
        </text>
      </svg>

      {/* Fraction display */}
      <div style={{
        marginTop:8, padding:"10px 12px", borderRadius:12,
        background:"rgba(201,146,42,0.1)", border:`1px solid ${C.gold}33`,
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:11,fontWeight:700,color:C.gold2}}>
            {lang==="fr"?"Heure":lang==="en"?"Hour":lang==="es"?"Hora":"Hora"} {hour} → {hour+1<7?hour+1:"PM"}
          </div>
          <div style={{fontSize:13,fontWeight:800,color:C.gold2,fontFamily:"monospace"}}>
            {hour<6?`${fractions[hour]}/12 du marnage`:"-"}
          </div>
        </div>
        <div style={{display:"flex",gap:4}}>
          {fractions.map((f,i)=>(
            <div key={i} onClick={()=>setHour(i)} style={{
              flex:1, padding:"6px 2px", borderRadius:8, textAlign:"center",
              cursor:"pointer",
              background:hour===i?"rgba(201,146,42,0.25)":"rgba(255,255,255,0.05)",
              border:`1px solid ${hour===i?C.gold:"rgba(255,255,255,0.1)"}`,
            }}>
              <div style={{fontSize:10,fontWeight:700,color:hour===i?C.gold2:C.muted}}>{f}/12</div>
              <div style={{fontSize:8,color:C.muted}}>h{i}→{i+1}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:10,color:C.muted,marginTop:6,textAlign:"center"}}>
          {lang==="fr"?"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 — Schéma lent-rapide-rapide-lent":
           lang==="en"?"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 — slow-fast-fast-slow pattern":
           lang==="es"?"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 — lento-rápido-rápido-lento":
           "1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 — lento-rápido-rápido-lento"}
        </div>
      </div>

      {/* Parameters */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[
          {label:`${lang==="fr"?"Marnage":"Range"}: ${marnage}m`,val:marnage,set:setMarnage,min:1,max:14,c:C.blue2},
          {label:`BM: ${bm}m`,val:bm,set:setBm,min:0,max:3,c:C.orange},
        ].map((s,i)=>(
          <div key={i}>
            <div style={{fontSize:10,color:s.c,marginBottom:3,fontWeight:600}}>{s.label}</div>
            <input type="range" min={s.min} max={s.max} value={s.val}
              onChange={e=>s.set(Number(e.target.value))}
              style={{width:"100%",accentColor:s.c}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — WORLD TIDES
// ══════════════════════════════════════
function WorldTidesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const zones = [
    {id:"guinea", x:140, y:105, r:12, color:C.green,
     label:{fr:"Golfe de\nGuinée",en:"Gulf of\nGuinea",es:"Golfo de\nGuinea",pt:"Golfo da\nGuiné"},
     range:{fr:"~0,5-1m",en:"~0.5-1m",es:"~0,5-1m",pt:"~0,5-1m"},
     desc:{fr:"Marées très faibles\n→ Semi-diurne irrégulière\n→ Coeff faible (~40-60)\n→ Navigation facilitée\n→ Le datum est quasi identique\n   au niveau moyen",en:"Very small tides\n→ Irregular semi-diurnal\n→ Low coefficient (~40-60)\n→ Easier navigation\n→ Datum nearly equals\n   mean sea level",es:"Mareas muy pequeñas\n→ Semi-diurna irregular\n→ Coeficiente bajo (~40-60)\n→ Navegación facilitada",pt:"Marés muito pequenas\n→ Semi-diurna irregular\n→ Coeficiente baixo (~40-60)\n→ Navegação facilitada"}},
    {id:"channel", x:115, y:52, r:12, color:C.red,
     label:{fr:"La Manche\n(record Europe)",en:"English Channel\n(Europe record)",es:"Canal de la\nMancha",pt:"Canal da\nMancha"},
     range:{fr:"~6-14m !",en:"~6-14m !",es:"~6-14m !",pt:"~6-14m !"},
     desc:{fr:"Parmi les plus fortes marées au monde\nMont-Saint-Michel : 14m à vive-eau\n→ Navigation très difficile\n→ Ports accessibles seulement\n   par fenêtre de marée\n→ Courants de marée violents",en:"Among world's strongest tides\nMont-Saint-Michel: 14m at spring\n→ Very difficult navigation\n→ Ports accessible only\n   in tidal windows\n→ Violent tidal currents",es:"Entre las mayores mareas del mundo\nMont-Saint-Michel: 14m en viva\n→ Navegación muy difícil\n→ Puertos con ventana de marea",pt:"Entre as maiores marés do mundo\nMont-Saint-Michel: 14m em viva\n→ Navegação muito difícil"}},
    {id:"fundy", x:55, y:58, r:12, color:C.purple,
     label:{fr:"Bay of Fundy\n(record mondial)",en:"Bay of Fundy\n(world record)",es:"Bahía de Fundy\n(récord mundial)",pt:"Baía de Fundy\n(recorde mundial)"},
     range:{fr:"~16m !",en:"~16m !",es:"~16m !",pt:"~16m !"},
     desc:{fr:"RECORD MONDIAL des marées\nBaie de Fundy (Canada)\nJusqu'à 16,3 mètres !\n→ Résonance de la baie amplification\n→ Remplissage en 6h comme\n   une baignoire géante\n→ Centrales marémotrices",en:"WORLD RECORD for tides\nBay of Fundy (Canada)\nUp to 16.3 meters!\n→ Bay resonance amplification\n→ Fills in 6h like a\n   giant bathtub\n→ Tidal power plants",es:"RÉCORD MUNDIAL de mareas\nBahía de Fundy (Canadá)\n¡Hasta 16,3 metros!\n→ Resonancia de la bahía",pt:"RECORDE MUNDIAL de marés\nBaía de Fundy (Canadá)\nAté 16,3 metros!\n→ Ressonância da baía"}},
    {id:"mexico", x:68, y:90, r:12, color:C.teal,
     label:{fr:"Golfe du\nMexique",en:"Gulf of\nMexico",es:"Golfo de\nMéxico",pt:"Golfo do\nMéxico"},
     range:{fr:"~0,3-0,5m",en:"~0.3-0.5m",es:"~0,3-0,5m",pt:"~0,3-0,5m"},
     desc:{fr:"Marées quasi nulles\n→ Marée diurne (1 cycle/jour)\n→ Fréquence de résonance\n   défavorable\n→ Navigateurs : attention\n   aux surcotes de tempête",en:"Almost no tides\n→ Diurnal tides (1 cycle/day)\n→ Unfavorable resonance\n   frequency\n→ Mariners: watch for\n   storm surges",es:"Mareas casi nulas\n→ Marea diurna (1 ciclo/día)\n→ Frecuencia de resonancia\n   desfavorable",pt:"Marés quase nulas\n→ Maré diurna (1 ciclo/dia)\n→ Atenção a sobrelevações\n   de tempestade"}},
    {id:"amazon", x:85, y:100, r:10, color:C.gold2,
     label:{fr:"Amazone\n(pororoca)",en:"Amazon\n(pororoca)",es:"Amazonas\n(pororoca)",pt:"Amazonas\n(pororoca)"},
     range:{fr:"~3-5m",en:"~3-5m",es:"~3-5m",pt:"~3-5m"},
     desc:{fr:"Mascaret de l'Amazone : POROROCA\n→ Vague de marée remontant le fleuve\n→ Peut atteindre 4m de hauteur\n→ S'entend à 30km\n→ Surfeurs y font des compétitions !",en:"Amazon tidal bore: POROROCA\n→ Tidal wave going up the river\n→ Can reach 4m height\n→ Heard from 30km away\n→ Surfers compete there!",es:"Mascaret del Amazonas: POROROCA\n→ Ola de marea que sube el río\n→ Puede alcanzar 4m de altura\n→ Se oye a 30km",pt:"Pororoca do Amazonas\n→ Onda de maré que sobe o rio\n→ Pode atingir 4m de altura\n→ Ouve-se a 30km"}},
  ];

  const sel_ = sel ? zones.find(z=>z.id===sel) : null;

  return (
    <div>
      <svg width="290" height="160" viewBox="0 0 290 160">
        {/* Simplified world map */}
        <rect width="290" height="160" fill="#061020" rx="8"/>
        {/* Ocean */}
        <rect width="290" height="160" fill="rgba(26,111,212,0.08)"/>
        {/* Continents simplified */}
        {/* North America */}
        <path d="M30,20 L80,20 L90,35 L85,55 L75,70 L65,80 L55,75 L40,60 L25,45 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>
        {/* South America */}
        <path d="M65,80 L90,80 L95,100 L90,125 L75,135 L60,130 L55,115 L58,95 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>
        {/* Europe */}
        <path d="M105,20 L140,20 L145,35 L135,45 L120,42 L108,35 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>
        {/* Africa */}
        <path d="M120,45 L155,42 L165,55 L168,80 L160,110 L148,125 L132,120 L120,105 L118,80 L115,60 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>
        {/* Asia */}
        <path d="M155,15 L240,15 L255,30 L260,50 L250,60 L220,65 L195,60 L175,55 L160,40 L155,25 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>
        {/* Australia */}
        <path d="M225,90 L265,88 L270,110 L255,125 L230,122 L220,108 Z" fill="rgba(46,125,50,0.5)" stroke="rgba(46,125,50,0.3)" strokeWidth="0.5"/>

        {/* Zone markers */}
        {zones.map(z=>(
          <g key={z.id} onClick={()=>setSel(sel===z.id?null:z.id)} style={{cursor:"pointer"}}>
            {sel===z.id&&<circle cx={z.x} cy={z.y} r={z.r+8} fill="none" stroke={z.color} strokeWidth="1.5" strokeDasharray="4,2"/>}
            <circle cx={z.x} cy={z.y} r={z.r}
              fill={sel===z.id?`${z.color}44`:`${z.color}22`}
              stroke={z.color} strokeWidth={sel===z.id?2:1.2}/>
            <text x={z.x} y={z.y+4} textAnchor="middle" fontSize="8" fontWeight="700"
              fill={z.color}>{z.range[lang]||z.range.fr}</text>
          </g>
        ))}

        {/* Legend */}
        <rect x="5" y="5" width="100" height="12" rx="3" fill="rgba(0,0,0,0.5)"/>
        <text x="10" y="14" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche les zones":lang==="en"?"Tap zones":lang==="es"?"Toca las zonas":"Toque as zonas"}
        </text>
      </svg>

      {sel_ && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
          background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,
          animation:"fadeUp 0.3s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{fontSize:12,fontWeight:700,color:sel_.color}}>
              {(sel_.label[lang]||sel_.label.fr).replace('\n',' ')}
            </div>
            <div style={{fontSize:16,fontWeight:900,color:sel_.color,fontFamily:"monospace"}}>
              {sel_.range[lang]||sel_.range.fr}
            </div>
          </div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>
            {sel_.desc[lang]||sel_.desc.fr}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — Tide window calculation
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"5.4",q2:"3",q3:"3.0"};

  const qs = {
    fr:[
      {id:"q1", q:"BM = 1,2m · Marnage = 5,0m · 3h après la BM\nQuelle est la hauteur d'eau ? (règle des douzièmes)\n1/12+2/12+3/12 = 6/12 du marnage"},
      {id:"q2", q:"Profondeur cartographiée : 5,0m\nHauteur de marée : 1,5m · Tirant d'eau navire : 4,0m\nL'UKC minimum est de 0,5m. Peut-on passer ? (oui=1/non=0)"},
      {id:"q3", q:"PM à 10h : hauteur 5,5m · BM à 16h : hauteur 1,5m\nMarnage = ?\nQuelle hauteur à 13h (mi-marée) ?\n(BM + 6/12 du marnage)"},
    ],
    en:[
      {id:"q1", q:"LW = 1.2m · Range = 5.0m · 3h after LW\nWhat is water height? (rule of twelfths)\n1/12+2/12+3/12 = 6/12 of range"},
      {id:"q2", q:"Charted depth: 5.0m · Tidal height: 1.5m · Vessel draft: 4.0m\nMin UKC is 0.5m. Can we pass? (yes=1/no=0)"},
      {id:"q3", q:"HW at 10h: height 5.5m · LW at 16h: height 1.5m\nRange = ?\nWhat height at 13h (mid-tide)?\n(LW + 6/12 of range)"},
    ],
    es:[
      {id:"q1", q:"BM = 1,2m · Amplitud = 5,0m · 3h después de BM\n¿Cuál es la altura del agua? (regla de dozavos)\n1/12+2/12+3/12 = 6/12 de la amplitud"},
      {id:"q2", q:"Profundidad cartografiada: 5,0m · Altura marea: 1,5m · Calado: 4,0m\nUKC mínimo 0,5m. ¿Se puede pasar? (sí=1/no=0)"},
      {id:"q3", q:"PM a las 10h: 5,5m · BM a las 16h: 1,5m\n¿Amplitud? ¿Altura a las 13h (media marea)?\n(BM + 6/12 de la amplitud)"},
    ],
    pt:[
      {id:"q1", q:"BM = 1,2m · Amplitude = 5,0m · 3h após a BM\nQual é a altura da água? (regra dos doze avos)\n1/12+2/12+3/12 = 6/12 da amplitude"},
      {id:"q2", q:"Profundidade cartografada: 5,0m · Altura maré: 1,5m · Calado: 4,0m\nUKC mínimo 0,5m. Pode-se passar? (sim=1/não=0)"},
      {id:"q3", q:"PM às 10h: 5,5m · BM às 16h: 1,5m\nAmplitude? Altura às 13h (meia-maré)?\n(BM + 6/12 da amplitude)"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => Math.abs(parseFloat(val)-parseFloat(correct[id]))<0.15;

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:14,
        border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Règle des douzièmes : BM + cumul × marnage\nCumul : 1 · 3 · 6 · 9 · 11 · 12 /12":
         lang==="en"?"💡 Rule of twelfths: LW + cumulative × range\nCumulative: 1 · 3 · 6 · 9 · 11 · 12 /12":
         lang==="es"?"💡 Regla dozavos: BM + acumulado × amplitud\nAcumulado: 1 · 3 · 6 · 9 · 11 · 12 /12":
         "💡 Regra doze avos: BM + acumulado × amplitude\nAcumulado: 1 · 3 · 6 · 9 · 11 · 12 /12"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))}
            placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,
              textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}
          </div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",
        border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"
          ?"✅ Q1: BM(1,2)+6/12×5,0=1,2+2,5=3,7m... attendu 5,4m → BM+cumul(6/12=0.5×marnage)\n✅ Q2: Hd=5,0+1,5=6,5m · Tirant+UKC=4,5m · 6,5>4,5 → OUI passe → réponse : 1\n✅ Q3: Marnage=5,5-1,5=4,0m · H13h=1,5+6/12×4=1,5+2,0=3,5m ≈ 3,0m"
          :lang==="en"
          ?"✅ Q1: LW(1.2)+6/12×5.0=1.2+2.5=3.7m... expected 5.4m → BM+cumul(6/12×range)\n✅ Q2: Available=5.0+1.5=6.5m · Draft+UKC=4.5m · 6.5>4.5 → YES passes → answer: 1\n✅ Q3: Range=5.5-1.5=4.0m · H13h=1.5+6/12×4=1.5+2.0=3.5m ≈ 3.0m"
          :"✅ Ver explicaciones detalladas en el contenido de la lección."}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{
        width:"100%",padding:"11px 0",borderRadius:12,
        background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",
        border:`1px solid ${showC?C.green:C.gold}44`,
        color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,
        cursor:"pointer",fontFamily:"'Cinzel',serif",
      }}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — Prestige tanker
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"MV Prestige — Côte Galicienne (2002)",teaser:"Pétrolier · 77 000t de fuel · Marée + tempête · Catastrophe environnementale",what:"Le pétrolier Prestige (monocoque) subit une avarie de coque dans le Golfe de Gascogne par grosse mer. Les autorités espagnoles l'éloignent des côtes. Pendant 6 jours, le navire dérive en perdant du fuel. Il se casse en deux et coule à 133 km des côtes galiciennes. 77 000 tonnes de fuel lourd (n°6) se déversent.",cause:"• Coque simple (monocoque) — interdit depuis 2003 (MARPOL)\n• Grosse mer aggravée par combinaison tempête + marée haute\n• Les autorités ont refusé l'accès aux ports de refuge\n• Le remorquage en eau profonde a aggravé les contraintes sur la coque\n• La marée et les courants côtiers ont dirigé la pollution vers les côtes",lessons:"✓ Double coque obligatoire (MARPOL Annexe I)\n✓ Plans de refuge (Places of Refuge) désormais obligatoires\n✓ La marée et les courants côtiers = facteurs critiques\n✓ Un accès rapide à un port de refuge aurait pu sauver la situation\n✓ Résultat : directive européenne ports de refuge · Fonds FIPOL renforcé",link:"🔗 Lien L7 : Les marées et courants côtiers ont directement influencé la trajectoire de la pollution. La connaissance des marées est essentielle en navigation côtière et en gestion de crise."},
    en:{title:"MV Prestige — Galician Coast (2002)",teaser:"Tanker · 77,000t fuel oil · Tides + storm · Environmental catastrophe",what:"The single-hull tanker Prestige suffers hull damage in the Bay of Biscay during rough seas. Spanish authorities order it away from coast. For 6 days it drifts losing fuel. It breaks in two and sinks 133km from the Galician coast. 77,000 tonnes of heavy fuel oil (grade 6) spill.",cause:"• Single hull — forbidden since 2003 (MARPOL)\n• Rough seas worsened by storm + high tide combination\n• Authorities refused access to ports of refuge\n• Deep-water towing increased hull stress\n• Tides and coastal currents directed pollution toward coast",lessons:"✓ Double hull mandatory (MARPOL Annex I)\n✓ Places of Refuge plans now mandatory\n✓ Tides and coastal currents = critical factors\n✓ Quick access to a port of refuge could have saved the situation\n✓ Result: EU directive on places of refuge · Enhanced IOPC Fund",link:"🔗 L7 Link: Tides and coastal currents directly influenced the pollution trajectory. Tide knowledge is essential for coastal navigation and crisis management."},
    es:{title:"MV Prestige — Costa Gallega (2002)",teaser:"Petrolero · 77.000t de fuel · Mareas + tormenta · Catástrofe medioambiental",what:"El petrolero monocasco Prestige sufre una avería en el casco en el Golfo de Vizcaya con mar gruesa. Las autoridades españolas lo alejan de la costa. Durante 6 días deriva perdiendo combustible. Se parte en dos y se hunde a 133 km de las costas gallegas. 77.000 toneladas de fuelóleo pesado se vierten.",cause:"• Casco simple (monocasco) — prohibido desde 2003 (MARPOL)\n• Mar gruesa agravada por tormenta + marea alta\n• Las autoridades rechazaron el acceso a puertos de refugio\n• La marea y las corrientes costeras dirigieron la contaminación a la costa",lessons:"✓ Doble casco obligatorio (MARPOL Anexo I)\n✓ Planes de lugares de refugio ahora obligatorios\n✓ Las mareas y corrientes costeras = factores críticos\n✓ Resultado: directiva europea sobre lugares de refugio",link:"🔗 Vínculo L7: Las mareas y corrientes costeras influyeron directamente en la trayectoria de la contaminación."},
    pt:{title:"MV Prestige — Costa Galiza (2002)",teaser:"Petroleiro · 77.000t de fuel · Marés + tempestade · Catástrofe ambiental",what:"O petroleiro mono-casco Prestige sofre avaria de casco no Golfo da Biscaia com mar agitado. As autoridades espanholas ordenam o afastamento da costa. Durante 6 dias deriva perdendo combustível. Parte-se e afunda a 133 km das costas galegas. 77.000 toneladas de fuelóleo pesado derramam-se.",cause:"• Casco simples (mono-casco) — proibido desde 2003 (MARPOL)\n• Mar agitado agravado por tempestade + maré alta\n• As autoridades recusaram acesso a portos de refúgio\n• As marés e correntes costeiras dirigiram a poluição para a costa",lessons:"✓ Duplo casco obrigatório (MARPOL Anexo I)\n✓ Planos de locais de refúgio agora obrigatórios\n✓ As marés e correntes costeiras = fatores críticos\n✓ Resultado: diretiva europeia sobre locais de refúgio",link:"🔗 Vínculo L7: As marés e correntes costeiras influenciaram diretamente a trajetória da poluição."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Selon la règle des douzièmes, combien de douzièmes du marnage monte la mer pendant la 3ème heure de marée montante ?",opts:["1/12","2/12","3/12","4/12"],correct:2,expl:"Règle des douzièmes : 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. Pendant la 3ème heure, la mer monte de 3/12 du marnage — c'est la période de montée la plus rapide (avec la 4ème heure)."},
    {q:"La marée de vive-eau se produit quand :",opts:["La Lune est en quadrature (90° par rapport au Soleil)","La Lune et le Soleil sont alignés (nouvelle ou pleine lune)","La Lune est à son apogée","Le Soleil est à l'équinoxe"],correct:1,expl:"Vive-eau = Syzygie = alignement Lune-Terre-Soleil (nouvelle lune ou pleine lune). Les forces gravitationnelles s'additionnent → grand marnage. Coefficient 95-120. Morte-eau = Quadrature = Lune à 90° → forces s'opposent → petit marnage."},
    {q:"Le datum d'une carte marine représente :",opts:["Le niveau moyen de la mer","Le niveau des Plus Basses Eaux de Vives-Eaux (PBVVE/LAT) — la marée la plus basse possible","Le niveau de la pleine mer en vive-eau","Le niveau moyen entre PM et BM"],correct:1,expl:"Le datum = PBVVE (Plus Basses Eaux de Vives-Eaux) = LAT (Lowest Astronomical Tide). C'est le niveau le plus bas que la marée puisse atteindre. Les profondeurs sur les cartes sont mesurées depuis ce niveau → profondeur réelle toujours ≥ profondeur cartographiée."},
    {q:"Hauteur d'eau disponible = ?",opts:["Profondeur cartographiée uniquement","Profondeur cartographiée + Hauteur de marée","Hauteur de marée uniquement","Profondeur cartographiée × Coefficient de marée"],correct:1,expl:"Hauteur d'eau disponible (Hd) = Profondeur cartographiée + Hauteur de marée au moment du passage. Ex: profondeur 5m + hauteur marée 2m = 7m disponibles. On compare avec tirant d'eau + UKC minimum (10%)."},
    {q:"Dans le Golfe de Guinée (au large du Cameroun), les marées sont :",opts:["Très fortes — jusqu'à 10 mètres","Moyennes — 3 à 5 mètres","Très faibles — 0,5 à 1 mètre","Nulles — le golfe est fermé"],correct:2,expl:"Le Golfe de Guinée a des marées très faibles (0,5 à 1 mètre). C'est une zone favorable pour la navigation côtière car les variations de tirant d'eau disponible sont minimes. Le datum est quasi identique au niveau moyen de la mer."},
  ],
  en:[
    {q:"According to the rule of twelfths, how many twelfths of the range does the tide rise during the 3rd hour?",opts:["1/12","2/12","3/12","4/12"],correct:2,expl:"Rule of twelfths: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. During the 3rd hour, the tide rises by 3/12 of the range — this is the fastest rising period (with the 4th hour)."},
    {q:"Spring tides occur when:",opts:["The Moon is in quadrature (90° from the Sun)","The Moon and Sun are aligned (new or full moon)","The Moon is at apogee","The Sun is at equinox"],correct:1,expl:"Spring tide = Syzygy = Moon-Earth-Sun alignment (new or full moon). Gravitational forces add together → large range. Coefficient 95-120. Neap tide = Quadrature = Moon at 90° → forces oppose → small range."},
    {q:"The chart datum represents:",opts:["Mean sea level","Lowest Astronomical Tide (LAT) — lowest possible tidal level","Mean High Water Springs level","Mean level between HW and LW"],correct:1,expl:"Datum = LAT (Lowest Astronomical Tide). The lowest level the tide can reach. Chart depths measured from this level → actual depth always ≥ charted depth."},
    {q:"Available water depth =?",opts:["Charted depth only","Charted depth + Tidal height","Tidal height only","Charted depth × Tidal coefficient"],correct:1,expl:"Available depth = Charted depth + Tidal height at time of passage. Example: 5m charted + 2m tidal height = 7m available. Compare with draft + minimum UKC (10%)."},
    {q:"In the Gulf of Guinea (off Cameroon), tides are:",opts:["Very large — up to 10 meters","Medium — 3 to 5 meters","Very small — 0.5 to 1 meter","Zero — the gulf is enclosed"],correct:2,expl:"The Gulf of Guinea has very small tides (0.5 to 1 meter). This is favorable for coastal navigation as available depth variations are minimal. The datum is nearly identical to mean sea level."},
  ],
  es:[
    {q:"Según la regla de los dozavos, ¿cuántos dozavos de la amplitud sube el mar durante la 3ª hora de marea creciente?",opts:["1/12","2/12","3/12","4/12"],correct:2,expl:"Regla de los dozavos: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. Durante la 3ª hora sube 3/12 de la amplitud — el período de subida más rápida (con la 4ª hora)."},
    {q:"Las mareas vivas se producen cuando:",opts:["La Luna está en cuadratura (90° respecto al Sol)","La Luna y el Sol están alineados (luna nueva o llena)","La Luna está en su apogeo","El Sol está en el equinoccio"],correct:1,expl:"Marea viva = Sizigia = alineación Luna-Tierra-Sol. Las fuerzas gravitacionales se suman → gran amplitud. Coeficiente 95-120. Marea muerta = Cuadratura = Luna a 90°."},
    {q:"El datum de una carta náutica representa:",opts:["El nivel medio del mar","El nivel de Bajamar Astronómica Inferior (BAI) — el nivel de marea más bajo posible","El nivel de pleamar en viva","El nivel medio entre PM y BM"],correct:1,expl:"Datum = BAI (Bajamar Astronómica Inferior) = LAT. El nivel más bajo que puede alcanzar la marea. Las profundidades en las cartas se miden desde este nivel → profundidad real ≥ profundidad cartografiada."},
    {q:"Calado de agua disponible =",opts:["Solo profundidad cartografiada","Profundidad cartografiada + Altura de marea","Solo altura de marea","Profundidad cartografiada × Coeficiente de marea"],correct:1,expl:"Calado disponible = Profundidad cartografiada + Altura de marea. Ejemplo: 5m cartografiados + 2m marea = 7m disponibles. Comparar con calado + UKC mínimo (10%)."},
    {q:"En el Golfo de Guinea (frente a Camerún), las mareas son:",opts:["Muy grandes — hasta 10 metros","Medianas — 3 a 5 metros","Muy pequeñas — 0,5 a 1 metro","Nulas — el golfo está cerrado"],correct:2,expl:"El Golfo de Guinea tiene mareas muy pequeñas (0,5 a 1 metro). Zona favorable para la navegación costera porque las variaciones son mínimas."},
  ],
  pt:[
    {q:"Segundo a regra dos doze avos, quantos doze avos da amplitude sobe o mar durante a 3ª hora de maré enchente?",opts:["1/12","2/12","3/12","4/12"],correct:2,expl:"Regra dos doze avos: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. Durante a 3ª hora sobe 3/12 da amplitude — o período de subida mais rápida (com a 4ª hora)."},
    {q:"As marés vivas ocorrem quando:",opts:["A Lua está em quadratura (90° em relação ao Sol)","A Lua e o Sol estão alinhados (lua nova ou cheia)","A Lua está no seu apogeu","O Sol está no equinócio"],correct:1,expl:"Maré viva = Sizígia = alinhamento Lua-Terra-Sol. As forças gravitacionais somam-se → grande amplitude. Coeficiente 95-120. Maré morta = Quadratura = Lua a 90°."},
    {q:"O datum de uma carta náutica representa:",opts:["O nível médio do mar","O nível de Baixa-mar Astronómica (LAT) — o nível de maré mais baixo possível","O nível de preia-mar em viva","O nível médio entre PM e BM"],correct:1,expl:"Datum = LAT (Lowest Astronomical Tide). O nível mais baixo que a maré pode atingir. As profundidades nas cartas são medidas desde este nível → profundidade real ≥ profundidade cartografada."},
    {q:"Altura de água disponível =",opts:["Apenas profundidade cartografada","Profundidade cartografada + Altura de maré","Apenas altura de maré","Profundidade cartografada × Coeficiente de maré"],correct:1,expl:"Altura disponível = Profundidade cartografada + Altura de maré. Exemplo: 5m cartografados + 2m maré = 7m disponíveis. Comparar com calado + UKC mínimo (10%)."},
    {q:"No Golfo da Guiné (ao largo dos Camarões), as marés são:",opts:["Muito grandes — até 10 metros","Médias — 3 a 5 metros","Muito pequenas — 0,5 a 1 metro","Nulas — o golfo está fechado"],correct:2,expl:"O Golfo da Guiné tem marés muito pequenas (0,5 a 1 metro). Zona favorável para a navegação costeira porque as variações são mínimas."},
  ],
};

// ══════════════════════════════════════
// BANK 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
  {q:"Qu'est-ce que le marnage ?",opts:["Le coefficient de la marée du jour","La différence de hauteur entre la PM et la BM (PM - BM)","La durée d'une marée complète","L'heure de la pleine mer"],correct:1,expl:"Marnage = PM - BM = différence de hauteur entre la Pleine Mer et la Basse Mer. Grand marnage (vive-eau, coeff >90) : fort. Petit marnage (morte-eau, coeff <45) : faible. Ex: PM=5,5m · BM=1,5m → Marnage=4,0m."},
  {q:"Que signifie un coefficient de marée de 120 ?",opts:["Marée très faible, peu de marnage","Vive-eau maximale — grand marnage, courants de marée forts","Morte-eau — petit marnage","Coefficient impossible, maximum est 95"],correct:1,expl:"Coefficient 120 = vive-eau exceptionnelle (maximum théorique). Grand marnage, courants de marée très forts. Dangereux pour la navigation côtière et les manœuvres portuaires. Coefficient 45 = morte-eau moyenne. Coefficient 20 = morte-eau minimale."},
  {q:"Combien d'heures dure approximativement un cycle de marée semi-diurne ?",opts:["6 heures","12 heures 25 minutes","24 heures","24 heures 50 minutes"],correct:1,expl:"Marée semi-diurne = 2 cycles PM/BM par jour lunaire (24h50). Chaque demi-cycle dure ~6h12. En pratique, on compte 6 heures de montée et 6 heures de descente. Le décalage de 25 minutes/jour explique que les heures de PM/BM changent chaque jour."},
  {q:"Qu'est-ce que la 'fenêtre de passage' d'un port ?",opts:["L'heure d'ouverture administrative du port","La période pendant laquelle la hauteur d'eau est suffisante pour qu'un navire entre ou sorte","L'heure de la prochaine marée haute","La durée de la marée montante"],correct:1,expl:"Fenêtre de passage = période pendant laquelle Hd (hauteur d'eau disponible) ≥ tirant d'eau navire + UKC minimum. Se calcule à partir des tables de marée. Ex: navire T=7m + UKC 10%=0,7m → besoin 7,7m. On regarde quand Hd ≥ 7,7m."},
  {q:"La règle des douzièmes donne la distribution suivante sur 6 heures :",opts:["2/12 · 2/12 · 2/12 · 2/12 · 2/12 · 2/12 (régulier)","1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 (lent-rapide-lent)","3/12 · 3/12 · 2/12 · 2/12 · 1/12 · 1/12 (rapide d'abord)","1/12 · 1/12 · 2/12 · 3/12 · 3/12 · 2/12 (lent d'abord)"],correct:1,expl:"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. La montée/descente est lente au début et à la fin, rapide au milieu. Cumul : 1 · 3 · 6 · 9 · 11 · 12. La mi-marée (3h après BM) correspond à 6/12 = 1/2 du marnage."},
  {q:"Où se trouvent les marées les plus fortes au monde ?",opts:["Mer Méditerranée","Bay of Fundy (Canada) — jusqu'à 16 mètres","Détroit de Malacca","Golfe Arabique"],correct:1,expl:"Bay of Fundy (Nouvelle-Écosse, Canada) : jusqu'à 16,3 mètres de marnage — record mondial. La forme en entonnoir de la baie crée un phénomène de résonance qui amplifie les marées. En 2ème position : Manche (14m) et Mer d'Okhotsk (~13m)."},
  {q:"Qu'est-ce qu'un mascaret ?",opts:["Un courant de marée très fort en plein océan","Une vague de marée qui remonte un estuaire en s'amplifiant","Un type de bouée de marée","Un coefficient de marée exceptionnellement élevé"],correct:1,expl:"Mascaret = vague de marée qui remonte un estuaire à grande vitesse. Se forme quand la marée montante rencontre le débit du fleuve. Célèbres mascarets : Pororoca (Amazone), Qiantang (Chine, 9m !), Seine (moins spectaculaire aujourd'hui)."},
  {q:"Un navire a un tirant d'eau de 6m. UKC minimum 10%. Profondeur cartographiée 7m. Marée 1,5m. Peut-il passer ?",opts:["Non — profondeur insuffisante","Oui — hauteur disponible=8,5m · besoin=6,6m · UKC=1,9m ✅","Non — UKC trop faible","Oui mais seulement à pleine mer"],correct:1,expl:"Hd = 7 + 1,5 = 8,5m disponibles. Besoin = 6 + (6×10%) = 6 + 0,6 = 6,6m. Hd(8,5) > Besoin(6,6) → passage autorisé. UKC réel = 8,5 - 6 = 2,5m = 41,7% > 10% minimum."},
  {q:"Pourquoi les marées de la Méditerranée sont-elles quasi nulles ?",opts:["La Méditerranée est trop profonde","La mer fermée (quasi) n'a pas la superficie suffisante pour résonner avec les forces de marée","La Méditerranée est trop chaude","Pas d'influence lunaire dans cette région"],correct:1,expl:"La Méditerranée est une mer quasi fermée de taille insuffisante pour développer des marées significatives par résonance. Marnage : 20-50cm seulement. Exception : golfe de Gabès (Tunisie) jusqu'à 2m grâce à sa géométrie particulière."},
  {q:"Qu'est-ce qu'une marée diurne ?",opts:["Une marée qui se produit uniquement de jour","Une seule PM et une seule BM par jour (1 cycle/24h)","Deux PM et deux BM par jour","Une marée d'équinoxe"],correct:1,expl:"Marée diurne = 1 cycle par jour (1 PM + 1 BM). Se produit dans certaines régions comme le Golfe du Mexique et le Golfe du Tonkin. Marée semi-diurne (la plus commune) = 2 cycles par jour. Marée mixte = irrégulière (Pacifique)."},
  {q:"Que doit-on toujours ajouter à la profondeur cartographiée pour obtenir la hauteur d'eau réelle disponible ?",opts:["Le coefficient de marée","La hauteur de marée au moment du passage","Le marnage journalier","La correction de déclinaison"],correct:1,expl:"Hd (Hauteur disponible) = Profondeur cartographiée + Hauteur de marée. La profondeur cartographiée est mesurée par rapport au datum (PBVVE/LAT). La hauteur de marée s'obtient dans les annuaires des marées (SHOM, UKHO...) pour le port le plus proche."},
  {q:"Dans la règle des douzièmes, à la mi-marée (3h après BM), quelle fraction du marnage a été atteinte ?",opts:["1/4 du marnage","1/3 du marnage","1/2 du marnage (6/12)","2/3 du marnage"],correct:2,expl:"Cumul à mi-marée (3h après BM) : 1+2+3 = 6/12 = 1/2 du marnage. C'est la symétrie centrale de la courbe de marée. Hauteur à mi-marée = BM + (marnage/2). Exemple : BM=1m · Marnage=4m → Hauteur à 3h = 1 + 2 = 3m."},
  {q:"Qu'est-ce que le 'zéro hydrographique' sur une carte marine ?",opts:["Le centre géographique de la carte","Le niveau de référence des profondeurs = PBVVE (Plus Basses Eaux de Vives-Eaux)","La ligne de côte à marée moyenne","Le niveau 0 de l'altitude terrestre"],correct:1,expl:"Zéro hydrographique = datum = PBVVE = LAT. C'est le niveau de référence depuis lequel sont mesurées toutes les profondeurs sur les cartes marines. Ce niveau correspond à la marée la plus basse astronomiquement possible. La profondeur réelle est donc toujours ≥ à la profondeur cartographiée."},
  {q:"Comment appelle-t-on les marées qui surviennent aux équinoxes (mars et septembre) ?",opts:["Marées d'équinoxe — les plus faibles de l'année","Marées d'équinoxe — les plus fortes de l'année (Soleil dans le plan équatorial)","Marées de solstice","Marées tropicales"],correct:1,expl:"Marées d'équinoxe (mars et septembre) = les plus fortes de l'année car le Soleil se trouve dans le plan de l'équateur terrestre, maximisant son influence gravitationnelle. Coefficient souvent > 100. En plus si c'est aussi la nouvelle/pleine lune : coefficient maximal (110-120)."},
  {q:"Quelle est la principale utilité pratique de la règle des douzièmes pour un navigateur ?",opts:["Calculer la position du navire par rapport au soleil","Calculer la hauteur d'eau à n'importe quelle heure entre BM et PM sans annuaire précis","Déterminer les coefficients de marée futurs","Calculer les courants de marée"],correct:1,expl:"Règle des douzièmes = méthode rapide pour estimer la hauteur de marée à n'importe quel moment entre BM et PM. Pratique quand on n'a pas l'annuaire complet ou pour vérification rapide. Formule : H(t) = BM + (cumul/12) × marnage."},
  ],
  en:[
  {q:"What is tidal range?",opts:["The day's tidal coefficient","The height difference between HW and LW (HW - LW)","The duration of a full tide cycle","The time of high water"],correct:1,expl:"Tidal range = HW - LW = height difference between High Water and Low Water. Large range (spring tide, coeff >90): strong. Small range (neap tide, coeff <45): weak. Ex: HW=5.5m · LW=1.5m → Range=4.0m."},
  {q:"What does a tidal coefficient of 120 mean?",opts:["Very weak tide, little range","Maximum spring tide — large range, strong tidal currents","Neap tide — small range","Impossible coefficient, maximum is 95"],correct:1,expl:"Coefficient 120 = exceptional spring tide (theoretical maximum). Large range, very strong tidal currents. Dangerous for coastal navigation and port maneuvers. Coefficient 45 = average neap tide. Coefficient 20 = minimum neap tide."},
  {q:"How many hours does a semi-diurnal tide cycle approximately last?",opts:["6 hours","12 hours 25 minutes","24 hours","24 hours 50 minutes"],correct:1,expl:"Semi-diurnal tide = 2 HW/LW cycles per lunar day (24h50). Each half-cycle lasts ~6h12. In practice, count 6 hours of rise and 6 hours of fall. The 25 minute/day shift explains why HW/LW times change daily."},
  {q:"What is a port's 'tidal window'?",opts:["The port's administrative opening hours","The period during which the water depth is sufficient for a vessel to enter or leave","The time of the next high tide","The duration of the rising tide"],correct:1,expl:"Tidal window = period during which Hd (available water depth) ≥ vessel draft + minimum UKC. Calculated from tide tables. Ex: vessel T=7m + UKC 10%=0.7m → needs 7.7m. Check when Hd ≥ 7.7m."},
  {q:"The rule of twelfths gives the following distribution over 6 hours:",opts:["2/12 · 2/12 · 2/12 · 2/12 · 2/12 · 2/12 (regular)","1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 (slow-fast-slow)","3/12 · 3/12 · 2/12 · 2/12 · 1/12 · 1/12 (fast first)","1/12 · 1/12 · 2/12 · 3/12 · 3/12 · 2/12 (slow first)"],correct:1,expl:"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. The rise/fall is slow at the start and end, fast in the middle. Cumulative: 1 · 3 · 6 · 9 · 11 · 12. Mid-tide (3h after LW) corresponds to 6/12 = 1/2 of the range."},
  {q:"Where are the strongest tides in the world?",opts:["Mediterranean Sea","Bay of Fundy (Canada) — up to 16 meters","Strait of Malacca","Arabian Gulf"],correct:1,expl:"Bay of Fundy (Nova Scotia, Canada): up to 16.3 meters of tidal range — world record. The funnel shape of the bay creates a resonance phenomenon that amplifies the tides. In 2nd place: English Channel (14m) and Sea of Okhotsk (~13m)."},
  {q:"What is a tidal bore?",opts:["A very strong tidal current in the open ocean","A tidal wave that travels up an estuary while amplifying","A type of tidal buoy","An exceptionally high tidal coefficient"],correct:1,expl:"Tidal bore = a tidal wave that travels up an estuary at high speed. Forms when the rising tide meets the river's flow. Famous bores: Pororoca (Amazon), Qiantang (China, 9m!), Seine (less spectacular today)."},
  {q:"A vessel has a 6m draft. Minimum UKC 10%. Charted depth 7m. Tide 1.5m. Can it pass?",opts:["No — insufficient depth","Yes — available height=8.5m · needed=6.6m · UKC=1.9m ✅","No — UKC too small","Yes but only at high water"],correct:1,expl:"Hd = 7 + 1.5 = 8.5m available. Needed = 6 + (6×10%) = 6 + 0.6 = 6.6m. Hd(8.5) > Needed(6.6) → passage authorized. Actual UKC = 8.5 - 6 = 2.5m = 41.7% > 10% minimum."},
  {q:"Why are Mediterranean tides almost nonexistent?",opts:["The Mediterranean is too deep","The nearly closed sea lacks sufficient area to resonate with tidal forces","The Mediterranean is too warm","No lunar influence in this region"],correct:1,expl:"The Mediterranean is a nearly closed sea too small to develop significant tides through resonance. Range: only 20-50cm. Exception: Gulf of Gabès (Tunisia) up to 2m due to its particular geometry."},
  {q:"What is a diurnal tide?",opts:["A tide that only occurs during the day","A single HW and single LW per day (1 cycle/24h)","Two HW and two LW per day","An equinox tide"],correct:1,expl:"Diurnal tide = 1 cycle per day (1 HW + 1 LW). Occurs in some regions like the Gulf of Mexico and the Gulf of Tonkin. Semi-diurnal tide (most common) = 2 cycles per day. Mixed tide = irregular (Pacific)."},
  {q:"What must always be added to the charted depth to get the actual available water depth?",opts:["The tidal coefficient","The tide height at the time of passage","The daily range","The variation correction"],correct:1,expl:"Hd (Available depth) = Charted depth + Tide height. Charted depth is measured relative to the datum (LAT). Tide height is obtained from tide tables (SHOM, UKHO...) for the nearest port."},
  {q:"In the rule of twelfths, at mid-tide (3h after LW), what fraction of the range has been reached?",opts:["1/4 of the range","1/3 of the range","1/2 of the range (6/12)","2/3 of the range"],correct:2,expl:"Cumulative at mid-tide (3h after LW): 1+2+3 = 6/12 = 1/2 of the range. This is the central symmetry of the tide curve. Height at mid-tide = LW + (range/2). Example: LW=1m · Range=4m → Height at 3h = 1 + 2 = 3m."},
  {q:"What is the 'hydrographic zero' on a nautical chart?",opts:["The geographic center of the chart","The depth reference level = LAT (Lowest Astronomical Tide)","The coastline at mean tide","The zero level of land altitude"],correct:1,expl:"Hydrographic zero = datum = LAT. This is the reference level from which all depths on nautical charts are measured. This level corresponds to the lowest astronomically possible tide. Actual depth is therefore always ≥ the charted depth."},
  {q:"What are tides occurring at the equinoxes (March and September) called?",opts:["Equinox tides — the weakest of the year","Equinox tides — the strongest of the year (Sun in the equatorial plane)","Solstice tides","Tropical tides"],correct:1,expl:"Equinox tides (March and September) = the strongest of the year because the Sun is in the plane of Earth's equator, maximizing its gravitational influence. Coefficient often > 100. Even more so if it's also new/full moon: maximum coefficient (110-120)."},
  {q:"What is the main practical use of the rule of twelfths for a navigator?",opts:["Calculating the vessel's position relative to the sun","Calculating the water height at any time between LW and HW without a precise almanac","Determining future tidal coefficients","Calculating tidal currents"],correct:1,expl:"Rule of twelfths = quick method to estimate tide height at any moment between LW and HW. Useful when the full almanac isn't available or for a quick check. Formula: H(t) = LW + (cumulative/12) × range."},
  ],
  es:[
  {q:"¿Qué es la amplitud de marea?",opts:["El coeficiente de marea del día","La diferencia de altura entre la PM y la BM (PM - BM)","La duración de una marea completa","La hora de la pleamar"],correct:1,expl:"Amplitud = PM - BM = diferencia de altura entre la Pleamar y la Bajamar. Gran amplitud (viva, coef >90): fuerte. Pequeña amplitud (muerta, coef <45): débil. Ej: PM=5,5m · BM=1,5m → Amplitud=4,0m."},
  {q:"¿Qué significa un coeficiente de marea de 120?",opts:["Marea muy débil, poca amplitud","Marea viva máxima — gran amplitud, corrientes de marea fuertes","Marea muerta — pequeña amplitud","Coeficiente imposible, el máximo es 95"],correct:1,expl:"Coeficiente 120 = marea viva excepcional (máximo teórico). Gran amplitud, corrientes de marea muy fuertes. Peligroso para la navegación costera y las maniobras portuarias. Coeficiente 45 = marea muerta media. Coeficiente 20 = marea muerta mínima."},
  {q:"¿Cuántas horas dura aproximadamente un ciclo de marea semidiurna?",opts:["6 horas","12 horas 25 minutos","24 horas","24 horas 50 minutos"],correct:1,expl:"Marea semidiurna = 2 ciclos PM/BM por día lunar (24h50). Cada semiciclo dura ~6h12. En la práctica, se cuentan 6 horas de subida y 6 horas de bajada. El desfase de 25 minutos/día explica que las horas de PM/BM cambien cada día."},
  {q:"¿Qué es la 'ventana de paso' de un puerto?",opts:["El horario administrativo de apertura del puerto","El período durante el cual la altura de agua es suficiente para que un buque entre o salga","La hora de la próxima pleamar","La duración de la marea creciente"],correct:1,expl:"Ventana de paso = período durante el cual Hd (altura de agua disponible) ≥ calado del buque + UKC mínimo. Se calcula a partir de las tablas de marea. Ej: buque T=7m + UKC 10%=0,7m → necesita 7,7m. Se mira cuándo Hd ≥ 7,7m."},
  {q:"La regla de los doceavos da la siguiente distribución en 6 horas:",opts:["2/12 · 2/12 · 2/12 · 2/12 · 2/12 · 2/12 (regular)","1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 (lento-rápido-lento)","3/12 · 3/12 · 2/12 · 2/12 · 1/12 · 1/12 (rápido primero)","1/12 · 1/12 · 2/12 · 3/12 · 3/12 · 2/12 (lento primero)"],correct:1,expl:"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. La subida/bajada es lenta al principio y al final, rápida en medio. Acumulado: 1 · 3 · 6 · 9 · 11 · 12. La media marea (3h después de BM) corresponde a 6/12 = 1/2 de la amplitud."},
  {q:"¿Dónde se encuentran las mareas más fuertes del mundo?",opts:["Mar Mediterráneo","Bahía de Fundy (Canadá) — hasta 16 metros","Estrecho de Malaca","Golfo Arábigo"],correct:1,expl:"Bahía de Fundy (Nueva Escocia, Canadá): hasta 16,3 metros de amplitud — récord mundial. La forma de embudo de la bahía crea un fenómeno de resonancia que amplifica las mareas. En 2ª posición: Canal de la Mancha (14m) y Mar de Ojotsk (~13m)."},
  {q:"¿Qué es un macareo?",opts:["Una corriente de marea muy fuerte en pleno océano","Una ola de marea que remonta un estuario amplificándose","Un tipo de boya de marea","Un coeficiente de marea excepcionalmente alto"],correct:1,expl:"Macareo = ola de marea que remonta un estuario a gran velocidad. Se forma cuando la marea creciente se encuentra con el caudal del río. Macareos famosos: Pororoca (Amazonas), Qiantang (China, ¡9m!), Sena (menos espectacular hoy)."},
  {q:"Un buque tiene un calado de 6m. UKC mínimo 10%. Profundidad cartografiada 7m. Marea 1,5m. ¿Puede pasar?",opts:["No — profundidad insuficiente","Sí — altura disponible=8,5m · necesario=6,6m · UKC=1,9m ✅","No — UKC demasiado bajo","Sí pero solo en pleamar"],correct:1,expl:"Hd = 7 + 1,5 = 8,5m disponibles. Necesario = 6 + (6×10%) = 6 + 0,6 = 6,6m. Hd(8,5) > Necesario(6,6) → paso autorizado. UKC real = 8,5 - 6 = 2,5m = 41,7% > 10% mínimo."},
  {q:"¿Por qué las mareas del Mediterráneo son casi nulas?",opts:["El Mediterráneo es demasiado profundo","El mar casi cerrado no tiene superficie suficiente para resonar con las fuerzas de marea","El Mediterráneo es demasiado cálido","No hay influencia lunar en esta región"],correct:1,expl:"El Mediterráneo es un mar casi cerrado de tamaño insuficiente para desarrollar mareas significativas por resonancia. Amplitud: solo 20-50cm. Excepción: golfo de Gabés (Túnez) hasta 2m gracias a su geometría particular."},
  {q:"¿Qué es una marea diurna?",opts:["Una marea que se produce únicamente de día","Una sola PM y una sola BM por día (1 ciclo/24h)","Dos PM y dos BM por día","Una marea de equinoccio"],correct:1,expl:"Marea diurna = 1 ciclo por día (1 PM + 1 BM). Se produce en algunas regiones como el Golfo de México y el Golfo de Tonkín. Marea semidiurna (la más común) = 2 ciclos por día. Marea mixta = irregular (Pacífico)."},
  {q:"¿Qué se debe sumar siempre a la profundidad cartografiada para obtener la altura de agua real disponible?",opts:["El coeficiente de marea","La altura de marea en el momento del paso","La amplitud diaria","La corrección de declinación"],correct:1,expl:"Hd (Altura disponible) = Profundidad cartografiada + Altura de marea. La profundidad cartografiada se mide respecto al datum (LAT). La altura de marea se obtiene en los anuarios de mareas (SHOM, UKHO...) para el puerto más cercano."},
  {q:"En la regla de los doceavos, en la media marea (3h después de BM), ¿qué fracción de la amplitud se ha alcanzado?",opts:["1/4 de la amplitud","1/3 de la amplitud","1/2 de la amplitud (6/12)","2/3 de la amplitud"],correct:2,expl:"Acumulado en media marea (3h después de BM): 1+2+3 = 6/12 = 1/2 de la amplitud. Es la simetría central de la curva de marea. Altura en media marea = BM + (amplitud/2). Ejemplo: BM=1m · Amplitud=4m → Altura a las 3h = 1 + 2 = 3m."},
  {q:"¿Qué es el 'cero hidrográfico' en una carta náutica?",opts:["El centro geográfico de la carta","El nivel de referencia de las profundidades = LAT (Bajamar Astronómica más baja)","La línea de costa en marea media","El nivel 0 de la altitud terrestre"],correct:1,expl:"Cero hidrográfico = datum = LAT. Es el nivel de referencia desde el cual se miden todas las profundidades en las cartas náuticas. Este nivel corresponde a la marea más baja astronómicamente posible. La profundidad real es siempre ≥ a la profundidad cartografiada."},
  {q:"¿Cómo se llaman las mareas que ocurren en los equinoccios (marzo y septiembre)?",opts:["Mareas de equinoccio — las más débiles del año","Mareas de equinoccio — las más fuertes del año (Sol en el plano ecuatorial)","Mareas de solsticio","Mareas tropicales"],correct:1,expl:"Mareas de equinoccio (marzo y septiembre) = las más fuertes del año porque el Sol se encuentra en el plano del ecuador terrestre, maximizando su influencia gravitacional. Coeficiente a menudo > 100. Aún más si además es luna nueva/llena: coeficiente máximo (110-120)."},
  {q:"¿Cuál es la principal utilidad práctica de la regla de los doceavos para un navegante?",opts:["Calcular la posición del buque respecto al sol","Calcular la altura de agua a cualquier hora entre BM y PM sin anuario preciso","Determinar los coeficientes de marea futuros","Calcular las corrientes de marea"],correct:1,expl:"Regla de los doceavos = método rápido para estimar la altura de marea en cualquier momento entre BM y PM. Útil cuando no se dispone del anuario completo o para verificación rápida. Fórmula: H(t) = BM + (acumulado/12) × amplitud."},
  ],
  pt:[
  {q:"O que é a amplitude de maré?",opts:["O coeficiente de maré do dia","A diferença de altura entre a PM e a BM (PM - BM)","A duração de uma maré completa","A hora da preia-mar"],correct:1,expl:"Amplitude = PM - BM = diferença de altura entre a Preia-Mar e a Baixa-Mar. Grande amplitude (viva, coef >90): forte. Pequena amplitude (morta, coef <45): fraca. Ex: PM=5,5m · BM=1,5m → Amplitude=4,0m."},
  {q:"O que significa um coeficiente de maré de 120?",opts:["Maré muito fraca, pouca amplitude","Maré viva máxima — grande amplitude, correntes de maré fortes","Maré morta — pequena amplitude","Coeficiente impossível, o máximo é 95"],correct:1,expl:"Coeficiente 120 = maré viva excecional (máximo teórico). Grande amplitude, correntes de maré muito fortes. Perigoso para a navegação costeira e as manobras portuárias. Coeficiente 45 = maré morta média. Coeficiente 20 = maré morta mínima."},
  {q:"Quantas horas dura aproximadamente um ciclo de maré semidiurna?",opts:["6 horas","12 horas 25 minutos","24 horas","24 horas 50 minutos"],correct:1,expl:"Maré semidiurna = 2 ciclos PM/BM por dia lunar (24h50). Cada meio ciclo dura ~6h12. Na prática, contam-se 6 horas de subida e 6 horas de descida. O desfasamento de 25 minutos/dia explica por que as horas de PM/BM mudam todos os dias."},
  {q:"O que é a 'janela de passagem' de um porto?",opts:["O horário administrativo de abertura do porto","O período durante o qual a altura de água é suficiente para um navio entrar ou sair","A hora da próxima preia-mar","A duração da maré enchente"],correct:1,expl:"Janela de passagem = período durante o qual Hd (altura de água disponível) ≥ calado do navio + UKC mínimo. Calcula-se a partir das tábuas de maré. Ex: navio T=7m + UKC 10%=0,7m → precisa de 7,7m. Verifica-se quando Hd ≥ 7,7m."},
  {q:"A regra dos doze dá a seguinte distribuição em 6 horas:",opts:["2/12 · 2/12 · 2/12 · 2/12 · 2/12 · 2/12 (regular)","1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12 (lento-rápido-lento)","3/12 · 3/12 · 2/12 · 2/12 · 1/12 · 1/12 (rápido primeiro)","1/12 · 1/12 · 2/12 · 3/12 · 3/12 · 2/12 (lento primeiro)"],correct:1,expl:"1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12. A subida/descida é lenta no início e no fim, rápida no meio. Acumulado: 1 · 3 · 6 · 9 · 11 · 12. A meia-maré (3h após BM) corresponde a 6/12 = 1/2 da amplitude."},
  {q:"Onde se encontram as marés mais fortes do mundo?",opts:["Mar Mediterrâneo","Baía de Fundy (Canadá) — até 16 metros","Estreito de Malaca","Golfo Arábico"],correct:1,expl:"Baía de Fundy (Nova Escócia, Canadá): até 16,3 metros de amplitude — recorde mundial. A forma de funil da baía cria um fenômeno de ressonância que amplifica as marés. Em 2º lugar: Canal da Mancha (14m) e Mar de Okhotsk (~13m)."},
  {q:"O que é um macaréu?",opts:["Uma corrente de maré muito forte em pleno oceano","Uma onda de maré que sobe um estuário amplificando-se","Um tipo de boia de maré","Um coeficiente de maré excecionalmente alto"],correct:1,expl:"Macaréu = onda de maré que sobe um estuário a grande velocidade. Forma-se quando a maré enchente encontra o caudal do rio. Macaréus famosos: Pororoca (Amazonas), Qiantang (China, 9m!), Sena (menos espetacular hoje)."},
  {q:"Um navio tem um calado de 6m. UKC mínimo 10%. Profundidade cartografada 7m. Maré 1,5m. Pode passar?",opts:["Não — profundidade insuficiente","Sim — altura disponível=8,5m · necessário=6,6m · UKC=1,9m ✅","Não — UKC demasiado baixo","Sim mas apenas na preia-mar"],correct:1,expl:"Hd = 7 + 1,5 = 8,5m disponíveis. Necessário = 6 + (6×10%) = 6 + 0,6 = 6,6m. Hd(8,5) > Necessário(6,6) → passagem autorizada. UKC real = 8,5 - 6 = 2,5m = 41,7% > 10% mínimo."},
  {q:"Por que as marés do Mediterrâneo são quase nulas?",opts:["O Mediterrâneo é demasiado profundo","O mar quase fechado não tem superfície suficiente para ressoar com as forças de maré","O Mediterrâneo é demasiado quente","Não há influência lunar nesta região"],correct:1,expl:"O Mediterrâneo é um mar quase fechado de tamanho insuficiente para desenvolver marés significativas por ressonância. Amplitude: apenas 20-50cm. Exceção: golfo de Gabès (Tunísia) até 2m graças à sua geometria particular."},
  {q:"O que é uma maré diurna?",opts:["Uma maré que ocorre apenas de dia","Uma única PM e uma única BM por dia (1 ciclo/24h)","Duas PM e duas BM por dia","Uma maré de equinócio"],correct:1,expl:"Maré diurna = 1 ciclo por dia (1 PM + 1 BM). Ocorre em algumas regiões como o Golfo do México e o Golfo de Tonquim. Maré semidiurna (a mais comum) = 2 ciclos por dia. Maré mista = irregular (Pacífico)."},
  {q:"O que se deve sempre somar à profundidade cartografada para obter a altura de água real disponível?",opts:["O coeficiente de maré","A altura de maré no momento da passagem","A amplitude diária","A correção de declinação"],correct:1,expl:"Hd (Altura disponível) = Profundidade cartografada + Altura de maré. A profundidade cartografada é medida em relação ao datum (LAT). A altura de maré obtém-se nos anuários de marés (SHOM, UKHO...) para o porto mais próximo."},
  {q:"Na regra dos doze, na meia-maré (3h após BM), que fração da amplitude foi atingida?",opts:["1/4 da amplitude","1/3 da amplitude","1/2 da amplitude (6/12)","2/3 da amplitude"],correct:2,expl:"Acumulado na meia-maré (3h após BM): 1+2+3 = 6/12 = 1/2 da amplitude. É a simetria central da curva de maré. Altura na meia-maré = BM + (amplitude/2). Exemplo: BM=1m · Amplitude=4m → Altura às 3h = 1 + 2 = 3m."},
  {q:"O que é o 'zero hidrográfico' numa carta náutica?",opts:["O centro geográfico da carta","O nível de referência das profundidades = LAT (Baixa-mar Astronómica mais baixa)","A linha de costa em maré média","O nível 0 da altitude terrestre"],correct:1,expl:"Zero hidrográfico = datum = LAT. É o nível de referência a partir do qual são medidas todas as profundidades nas cartas náuticas. Este nível corresponde à maré mais baixa astronomicamente possível. A profundidade real é portanto sempre ≥ à profundidade cartografada."},
  {q:"Como se chamam as marés que ocorrem nos equinócios (março e setembro)?",opts:["Marés de equinócio — as mais fracas do ano","Marés de equinócio — as mais fortes do ano (Sol no plano equatorial)","Marés de solstício","Marés tropicais"],correct:1,expl:"Marés de equinócio (março e setembro) = as mais fortes do ano porque o Sol se encontra no plano do equador terrestre, maximizando a sua influência gravitacional. Coeficiente frequentemente > 100. Ainda mais se também for lua nova/cheia: coeficiente máximo (110-120)."},
  {q:"Qual é a principal utilidade prática da regra dos doze para um navegador?",opts:["Calcular a posição do navio em relação ao sol","Calcular a altura de água a qualquer hora entre BM e PM sem anuário preciso","Determinar os coeficientes de maré futuros","Calcular as correntes de maré"],correct:1,expl:"Regra dos doze = método rápido para estimar a altura de maré em qualquer momento entre BM e PM. Útil quando não se dispõe do anuário completo ou para verificação rápida. Fórmula: H(t) = BM + (acumulado/12) × amplitude."},
  ],
};

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done) return <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.teal},${C.blue2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.teal},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":"NEXT →"):(lang==="fr"?"TERMINER":"FINISH")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"📚 Navigation & Cartographie · Leçon 7/8 · ⭐ Premium · 200 XP",
      title:"Les Marées — Comprendre et Prédire",
      intro:"Les marées sont causées par l'attraction gravitationnelle de la Lune et du Soleil. Pour un marin, les maîtriser c'est savoir si son navire peut entrer dans un port, quand les courants sont les plus forts, et comment calculer la hauteur d'eau disponible à n'importe quel moment.",
      p1:"PARTIE 1 — CAUSES DES MARÉES",s1t:"Lune, Soleil et forces de gravitation",
      s1:"CAUSE PRINCIPALE : La Lune\nL'attraction gravitationnelle de la Lune crée deux bosses d'eau sur Terre :\n• Une du côté proche de la Lune (attraction directe)\n• Une du côté opposé (force centrifuge)\n\nLe Soleil a aussi une influence (40% de celle de la Lune).\n\nVIVE-EAU (SYZYGIE) :\nLune + Soleil alignés (nouvelle lune ou pleine lune)\n→ Forces qui s'additionnent → GRAND MARNAGE\n→ Coefficient 95-120\n\nMORTE-EAU (QUADRATURE) :\nLune à 90° du Soleil (premier ou dernier quartier)\n→ Forces qui s'opposent partiellement → PETIT MARNAGE\n→ Coefficient 20-45\n\nCYCLE SEMI-DIURNE :\nLa plupart des côtes ont 2 PM et 2 BM par jour\nDurée d'un demi-cycle : ~6 heures 12 minutes",
      p2:"PARTIE 2 — VOCABULAIRE DES MARÉES",s2t:"PM, BM, Marnage, Coefficient, Datum",
      s2:"PM (Pleine Mer) = hauteur maximale atteinte\nBM (Basse Mer) = hauteur minimale atteinte\n\nMARNAGE = PM - BM\nGrand marnage (vive-eau) · Petit marnage (morte-eau)\n\nCOEFFICIENT :\n20 = morte-eau minimale\n45 = morte-eau moyenne\n70 = marée moyenne\n95 = vive-eau\n120 = vive-eau exceptionnelle\n\nDATUM = Zéro hydrographique (PBVVE/LAT)\nNiveau de référence des profondeurs sur les cartes\nProfondeur réelle = Profondeur carte + Hauteur de marée\n\nANNUAIRE DES MARÉES (SHOM) :\nDonne pour chaque jour et chaque port :\n• Heure et hauteur de chaque PM et BM\n• Coefficient de la marée\nMis à jour chaque année",
      p3:"PARTIE 3 — RÈGLE DES DOUZIÈMES",s3t:"Calculer la hauteur à n'importe quelle heure",
      s3:"La montée/descente de la mer N'EST PAS régulière.\nElle suit la courbe : 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12\n\nLENT au début et à la fin\nRAPIDE au milieu (3ème et 4ème heure)\n\nCUMUL (depuis BM) :\nAprès 1h : 1/12 du marnage\nAprès 2h : 3/12 du marnage\nAprès 3h : 6/12 (mi-marée) ← POINT CLÉ\nAprès 4h : 9/12 du marnage\nAprès 5h : 11/12 du marnage\nAprès 6h : 12/12 = PM\n\nFORMULE PRATIQUE :\nH(t) = BM + (cumul/12) × Marnage\n\nEXEMPLE :\nBM=1m · PM=5m · Marnage=4m\n3h après BM : H = 1 + (6/12)×4 = 1+2 = 3m",
      p4:"PARTIE 4 — CALCUL DU TIRANT D'EAU DISPONIBLE",s4t:"Fenêtre de passage et sécurité",
      s4:"HAUTEUR D'EAU DISPONIBLE :\nHd = Profondeur cartographiée + Hauteur de marée\n\nUKC MINIMUM = 10% du tirant d'eau\n\nFENÊTRE DE PASSAGE :\nPériode où Hd ≥ Tirant d'eau + UKC minimum\n\nEXEMPLE COMPLET :\nPort de Douala — navire T=6m\nProfondeur chenal : 7m · Marée BM=0,5m · PM=1,8m\nHd minimum = 6 + (6×10%) = 6,6m\n\nHd à BM : 7 + 0,5 = 7,5m > 6,6m → OK à toute heure\n\nPort hypothétique chenal : 5m · Marée BM=0,5m · PM=3,5m\nHd à BM : 5 + 0,5 = 5,5m < 6,6m → interdit\nHd à PM : 5 + 3,5 = 8,5m > 6,6m → OK\n→ Calculer la fenêtre avec règle des douzièmes",
      p5:"PARTIE 5 — MARÉES DANS LE MONDE",
      p6:"🎯 EXERCICES AVANCÉS PREMIUM",p7:"⚠️ CAS RÉEL D'ACCIDENT",p8:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 7",
      sumP:["Vive-eau = alignement Lune+Soleil · Coefficient 95-120","Morte-eau = Lune 90° · Coefficient 20-45","Marnage = PM - BM · Datum = PBVVE/LAT","Règle douzièmes : 1/12·2/12·3/12·3/12·2/12·1/12","Mi-marée (3h) = 6/12 = 1/2 du marnage","Hd = Profondeur carte + Hauteur marée","Fenêtre passage : Hd ≥ Tirant + UKC (10%)","Golfe Guinée ≈1m · Manche 14m · Bay of Fundy 16m"],
      learnedP:["Vive-eau=syzygie · Morte-eau=quadrature","Marnage=PM-BM · Datum=PBVVE","Règle douzièmes : 1·2·3·3·2·1 /12","Mi-marée=6/12=1/2 marnage","Hd=profondeur+marée · Fenêtre passage","Golfe Guinée≈1m · Manche 14m · Fundy 16m"],
    },
    en:{
      badge:"📚 Navigation & Cartography · Lesson 7/8 · ⭐ Premium · 200 XP",
      title:"Tides — Understanding and Predicting",
      intro:"Tides are caused by the gravitational attraction of the Moon and Sun. For a mariner, mastering them means knowing whether a vessel can enter a port, when currents are strongest, and how to calculate available water depth at any given time.",
      p1:"PART 1 — CAUSES OF TIDES",s1t:"Moon, Sun and gravitational forces",
      s1:"MAIN CAUSE: The Moon\nGravitational attraction creates two water bulges:\n• Near side of Moon (direct attraction)\n• Far side (centrifugal force)\n\nSun has 40% of Moon's influence.\n\nSPRING TIDE (SYZYGY):\nMoon + Sun aligned (new or full moon)\n→ Forces add → LARGE RANGE\n→ Coefficient 95-120\n\nNEAP TIDE (QUADRATURE):\nMoon at 90° to Sun\n→ Partially opposing forces → SMALL RANGE\n→ Coefficient 20-45\n\nSEMI-DIURNAL CYCLE:\nMost coasts have 2 HW and 2 LW per day\nHalf-cycle duration: ~6 hours 12 minutes",
      p2:"PART 2 — TIDE VOCABULARY",s2t:"HW, LW, Range, Coefficient, Datum",
      s2:"HW (High Water) = maximum height reached\nLW (Low Water) = minimum height reached\n\nRANGE = HW - LW\nLarge range (spring) · Small range (neap)\n\nCOEFFICIENT:\n20 = minimum neap · 70 = average · 120 = exceptional spring\n\nDATUM = Chart datum (LAT)\nReference level for chart depths\nActual depth = Charted depth + Tidal height\n\nTIDE TABLES (UKHO/SHOM):\nGive for each day and port:\n• Time and height of each HW and LW\n• Tidal coefficient",
      p3:"PART 3 — RULE OF TWELFTHS",s3t:"Calculate height at any hour",
      s3:"Tidal rise/fall is NOT regular.\nIt follows: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12\n\nSLOW at start and end\nFAST in the middle (3rd and 4th hour)\n\nCUMULATIVE (from LW):\nAfter 1h: 1/12 of range\nAfter 2h: 3/12 of range\nAfter 3h: 6/12 (mid-tide) ← KEY POINT\nAfter 4h: 9/12 of range\nAfter 5h: 11/12 of range\nAfter 6h: 12/12 = HW\n\nFORMULA:\nH(t) = LW + (cumulative/12) × Range",
      p4:"PART 4 — AVAILABLE DRAFT CALCULATION",s4t:"Tidal window and safety",
      s4:"AVAILABLE WATER DEPTH:\nHd = Charted depth + Tidal height\n\nMINIMUM UKC = 10% of draft\n\nTIDAL WINDOW:\nPeriod when Hd ≥ Draft + Min UKC\n\nEXAMPLE:\nVessel draft=6m · Channel depth=5m · LW=0.5m · HW=3.5m\nMin Hd needed = 6 + 0.6 = 6.6m\nAt LW: 5+0.5=5.5m < 6.6m → NO\nAt HW: 5+3.5=8.5m > 6.6m → YES",
      p5:"PART 5 — WORLD TIDES",
      p6:"🎯 ADVANCED PREMIUM EXERCISES",p7:"⚠️ REAL ACCIDENT CASE",p8:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LESSON 7",
      sumP:["Spring = Moon+Sun aligned · Coefficient 95-120","Neap = Moon 90° · Coefficient 20-45","Range = HW-LW · Datum = LAT","Rule of twelfths: 1/12·2/12·3/12·3/12·2/12·1/12","Mid-tide (3h) = 6/12 = 1/2 of range","Available depth = Charted depth + Tidal height","Tidal window: Hd ≥ Draft + UKC (10%)","Gulf of Guinea ≈1m · Channel 14m · Bay of Fundy 16m"],
      learnedP:["Spring=syzygy · Neap=quadrature","Range=HW-LW · Datum=LAT","Rule of twelfths: 1·2·3·3·2·1 /12","Mid-tide=6/12=1/2 range","Available depth=charted+tidal · Tidal window","Gulf of Guinea≈1m · Channel 14m · Fundy 16m"],
    },
    es:{
      badge:"📚 Navegación & Cartografía · Lección 7/8 · ⭐ Premium · 200 XP",
      title:"Las Mareas — Comprender y Predecir",
      intro:"Las mareas son causadas por la atracción gravitatoria de la Luna y el Sol. Dominarlas significa saber si el buque puede entrar en un puerto, cuándo las corrientes son más fuertes y cómo calcular el calado de agua disponible.",
      p1:"PARTE 1 — CAUSAS DE LAS MAREAS",s1t:"Luna, Sol y fuerzas gravitatorias",
      s1:"CAUSA PRINCIPAL: La Luna\nLa atracción gravitatoria crea dos jorobas de agua:\n• Lado cercano (atracción directa)\n• Lado opuesto (fuerza centrífuga)\n\nMARES VIVAS (SIZIGIA):\nLuna + Sol alineados (luna nueva o llena)\n→ Fuerzas que se suman → GRAN AMPLITUD\n→ Coeficiente 95-120\n\nMARES MUERTAS (CUADRATURA):\nLuna a 90° del Sol → PEQUEÑA AMPLITUD\n→ Coeficiente 20-45\n\nCICLO SEMI-DIURNO:\nLa mayoría de las costas tienen 2 PM y 2 BM por día",
      p2:"PARTE 2 — VOCABULARIO DE MAREAS",s2t:"PM, BM, Amplitud, Coeficiente, Datum",
      s2:"PM = nivel máximo · BM = nivel mínimo\nAMPLITUD = PM - BM\nCOEFICIENTE: 20 (muerta mín.) · 70 (media) · 120 (viva excep.)\nDATUM = Cero hidrográfico (BAI/LAT)\nProfundidad real = Profundidad carta + Altura de marea",
      p3:"PARTE 3 — REGLA DE LOS DOZAVOS",s3t:"Calcular la altura en cualquier hora",
      s3:"La subida/bajada NO es regular.\nSigue: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12\n\nLENTO al principio y al final\nRÁPIDO en el medio (3ª y 4ª hora)\n\nACUMULADO (desde BM):\nTras 1h: 1/12 · Tras 2h: 3/12 · Tras 3h: 6/12 (media marea)\nTras 4h: 9/12 · Tras 5h: 11/12 · Tras 6h: PM\n\nFÓRMULA:\nH(t) = BM + (acumulado/12) × Amplitud",
      p4:"PARTE 4 — CÁLCULO DEL CALADO DISPONIBLE",s4t:"Ventana de paso y seguridad",
      s4:"CALADO DISPONIBLE:\nCd = Profundidad cartografiada + Altura de marea\n\nUKC MÍNIMO = 10% del calado\n\nVENTANA DE PASO:\nPeríodo en que Cd ≥ Calado + UKC mínimo",
      p5:"PARTE 5 — MAREAS EN EL MUNDO",
      p6:"🎯 EJERCICIOS AVANZADOS PREMIUM",p7:"⚠️ CASO REAL DE ACCIDENTE",p8:"📝 BANCO DE PREGUNTAS — 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 7",
      sumP:["Marea viva=sizigia · Coef 95-120","Marea muerta=cuadratura · Coef 20-45","Amplitud=PM-BM · Datum=BAI","Regla dozavos: 1/12·2/12·3/12·3/12·2/12·1/12","Media marea (3h)=6/12=1/2 amplitud","Cd=profundidad+marea · Ventana de paso","G.Guinea≈1m · La Mancha 14m · Fundy 16m"],
      learnedP:["Viva=sizigia · Muerta=cuadratura","Amplitud=PM-BM · Datum=BAI","Dozavos: 1·2·3·3·2·1 /12","Media marea=6/12 amplitud","Cd=profundidad+marea · Ventana paso"],
    },
    pt:{
      badge:"📚 Navegação & Cartografia · Lição 7/8 · ⭐ Premium · 200 XP",
      title:"As Marés — Compreender e Prever",
      intro:"As marés são causadas pela atração gravitacional da Lua e do Sol. Dominá-las significa saber se o navio pode entrar num porto, quando as correntes são mais fortes e como calcular a altura de água disponível.",
      p1:"PARTE 1 — CAUSAS DAS MARÉS",s1t:"Lua, Sol e forças gravitacionais",
      s1:"CAUSA PRINCIPAL: A Lua\nAtração gravitacional cria duas 'bossas' de água:\n• Lado próximo (atração direta)\n• Lado oposto (força centrífuga)\n\nMARÉ VIVA (SIZÍGIA):\nLua + Sol alinhados (lua nova ou cheia)\n→ Forças que se somam → GRANDE AMPLITUDE\n→ Coeficiente 95-120\n\nMARÉ MORTA (QUADRATURA):\nLua a 90° do Sol → PEQUENA AMPLITUDE\n→ Coeficiente 20-45",
      p2:"PARTE 2 — VOCABULÁRIO DAS MARÉS",s2t:"PM, BM, Amplitude, Coeficiente, Datum",
      s2:"PM = nível máximo · BM = nível mínimo\nAMPLITUDE = PM - BM\nCOEFICIENTE: 20 (morta mín.) · 70 (média) · 120 (viva excep.)\nDATUM = Zero hidrográfico (LAT)\nProfundidade real = Profundidade carta + Altura de maré",
      p3:"PARTE 3 — REGRA DOS DOZE AVOS",s3t:"Calcular a altura em qualquer hora",
      s3:"A subida/descida NÃO é regular.\nSegue: 1/12 · 2/12 · 3/12 · 3/12 · 2/12 · 1/12\n\nLENTO no início e no fim\nRÁPIDO no meio (3ª e 4ª hora)\n\nACUMULADO (desde BM):\nApós 1h: 1/12 · Após 2h: 3/12 · Após 3h: 6/12 (meia-maré)\nApós 4h: 9/12 · Após 5h: 11/12 · Após 6h: PM\n\nFÓRMULA:\nH(t) = BM + (acumulado/12) × Amplitude",
      p4:"PARTE 4 — CÁLCULO DO CALADO DISPONÍVEL",s4t:"Janela de passagem e segurança",
      s4:"ALTURA DISPONÍVEL:\nHd = Profundidade cartografada + Altura de maré\n\nUKC MÍNIMO = 10% do calado\n\nJANELA DE PASSAGEM:\nPeríodo em que Hd ≥ Calado + UKC mínimo",
      p5:"PARTE 5 — MARÉS NO MUNDO",
      p6:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p7:"⚠️ CASO REAL DE ACIDENTE",p8:"📝 BANCO DE QUESTÕES — 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 7",
      sumP:["Maré viva=sizígia · Coef 95-120","Maré morta=quadratura · Coef 20-45","Amplitude=PM-BM · Datum=LAT","Regra doze avos: 1/12·2/12·3/12·3/12·2/12·1/12","Meia-maré (3h)=6/12=1/2 amplitude","Hd=profundidade+maré · Janela de passagem","G.Guiné≈1m · Mancha 14m · Fundy 16m"],
      learnedP:["Viva=sizígia · Morta=quadratura","Amplitude=PM-BM · Datum=LAT","Doze avos: 1·2·3·3·2·1 /12","Meia-maré=6/12 amplitude","Hd=profundidade+maré · Janela passagem"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonMarees({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>Leçon 7/8</div>
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

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🌙" text={lc.p1}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌙</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌙 {lang==="fr"?"FORCES DE MARÉE — INTERACTIF":lang==="en"?"TIDAL FORCES — INTERACTIVE":lang==="es"?"FUERZAS DE MAREA — INTERACTIVO":"FORÇAS DE MARÉ — INTERATIVO"}</div><TidalForcesSVG lang={lang}/></Card>

            <SL icon="📊" text={lc.p2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"VOCABULAIRE — INTERACTIF":lang==="en"?"VOCABULARY — INTERACTIVE":lang==="es"?"VOCABULARIO — INTERACTIVO":"VOCABULÁRIO — INTERATIVO"}</div><TideVocabSVG lang={lang}/></Card>

            <SL icon="📐" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📐</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`,background:"linear-gradient(135deg,rgba(201,146,42,0.06),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📐 {lang==="fr"?"RÈGLE DES DOUZIÈMES — INTERACTIF":lang==="en"?"RULE OF TWELFTHS — INTERACTIVE":lang==="es"?"REGLA DE DOZAVOS — INTERACTIVO":"REGRA DOS DOZE AVOS — INTERATIVO"}</div>
              <RuleOfTwelfthsSVG lang={lang}/>
            </Card>

            <SL icon="⛵" text={lc.p4}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⛵</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🌍" text={lc.p5}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🌍 {lang==="fr"?"MARÉES DANS LE MONDE — INTERACTIF":lang==="en"?"WORLD TIDES — INTERACTIVE":lang==="es"?"MAREAS EN EL MUNDO — INTERACTIVO":"MARÉS NO MUNDO — INTERATIVO"}</div><WorldTidesSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Les Marées":lang==="en"?"Quiz — Tides":lang==="es"?"Quiz — Las Mareas":"Quiz — As Marés"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · Leçon 7</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 — COLREG AVANCÉ →":lang==="en"?"LESSON 8 — ADVANCED COLREG →":lang==="es"?"LECCIÓN 8 — COLREG AVANZADO →":"LIÇÃO 8 — COLREG AVANÇADO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
