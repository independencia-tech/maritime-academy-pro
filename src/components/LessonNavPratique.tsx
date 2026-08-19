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
// SVG 1 — DEAD RECKONING
// ══════════════════════════════════════
function DeadReckoningSVG({ lang }) {
  const [step, setStep] = useState(0);
  const W=290, H=200;
  const toRad = d => d*Math.PI/180;

  // Route: start -> wp1 -> wp2 -> wp3
  const points = [
    {x:40, y:160, label:{fr:"Départ\n06:00",en:"Departure\n06:00",es:"Salida\n06:00",pt:"Partida\n06:00"}, t:0},
    {x:110, y:120, label:{fr:"Point estimé\n08:00\nD=24mn",en:"DR position\n08:00\nD=24nm",es:"Punto estimado\n08:00\nD=24mn",pt:"Posição estimada\n08:00\nD=24mn"}, t:1},
    {x:185, y:85,  label:{fr:"Point estimé\n10:00\nD=48mn",en:"DR position\n10:00\nD=48nm",es:"Punto estimado\n10:00\nD=48mn",pt:"Posição estimada\n10:00\nD=48mn"}, t:2},
    {x:245, y:55,  label:{fr:"Arrivée\n12:00\nD=72mn",en:"Arrival\n12:00\nD=72nm",es:"Llegada\n12:00\nD=72mn",pt:"Chegada\n12:00\nD=72mn"}, t:3},
  ];

  // Drift effect: current pushes north
  const driftPts = [
    {x:40, y:160},
    {x:110, y:110},
    {x:185, y:68},
    {x:245, y:38},
  ];

  const visPoints = points.slice(0, step+1);
  const visDrift = step >= 2 ? driftPts.slice(0, step+1) : [];

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Grid */}
        {[40,80,120,160].map(y=><line key={y} x1="0" y1={y} x2={W} y2={y} stroke="rgba(77,166,255,0.05)" strokeWidth="0.8"/>)}
        {[60,120,180,240].map(x=><line key={x} x1={x} y1="0" x2={x} y2={H} stroke="rgba(77,166,255,0.05)" strokeWidth="0.8"/>)}

        {/* North arrow */}
        <polygon points="272,10 268,22 272,19 276,22" fill={C.white} opacity="0.6"/>
        <text x="272" y="8" textAnchor="middle" fontSize="7" fill={C.white} opacity="0.6">N</text>

        {/* DR route */}
        {visPoints.length > 1 && visPoints.map((p,i) => {
          if(i===0) return null;
          const prev = visPoints[i-1];
          return <line key={i} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
            stroke={C.blue2} strokeWidth="2" strokeDasharray="6,3"/>;
        })}

        {/* Drift route */}
        {visDrift.length > 1 && visDrift.map((p,i) => {
          if(i===0) return null;
          const prev = visDrift[i-1];
          return <line key={i} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
            stroke={C.orange} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.7"/>;
        })}

        {/* Current vector */}
        {step >= 2 && (
          <g>
            <line x1="185" y1="85" x2="185" y2="68"
              stroke={C.green} strokeWidth="2"/>
            <polygon points="185,64 181,72 189,72" fill={C.green}/>
            <text x="193" y="78" fontSize="7" fill={C.green}>
              {lang==="fr"?"Courant":lang==="en"?"Current":lang==="es"?"Corriente":"Corrente"}
            </text>
            <text x="193" y="86" fontSize="6" fill={C.green}>1,5kn N</text>
          </g>
        )}

        {/* Points */}
        {visPoints.map((p,i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i===0?6:5}
              fill={i===0?C.gold:i===step?C.blue2:"rgba(77,166,255,0.4)"}
              stroke={C.white} strokeWidth="1"/>
            {i===step && (
              <rect x={p.x+8} y={p.y-20} width={80} height={36} rx={6}
                fill="rgba(6,14,26,0.9)" stroke={C.blue2} strokeWidth="0.8"/>
            )}
            {i===step && (
              <text x={p.x+48} y={p.y-8} textAnchor="middle" fontSize="7" fill={C.blue2}>
                {(p.label[lang]||p.label.fr).split('\n').map((line,li)=>(
                  <tspan key={li} x={p.x+48} dy={li===0?0:9}>{line}</tspan>
                ))}
              </text>
            )}
          </g>
        ))}

        {/* Ship icon */}
        {step < points.length && (
          <text x={points[step].x} y={points[step].y-10} textAnchor="middle" fontSize="14">🚢</text>
        )}

        {/* Formula */}
        <rect x="5" y="5" width="120" height="18" rx="4" fill="rgba(0,0,0,0.5)"/>
        <text x="10" y="17" fontSize="8" fill={C.gold} fontWeight="bold">
          D = V × T = 12kn × 2h = 24mn
        </text>
      </svg>

      {/* Controls */}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          style={{flex:1,padding:"8px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.1)`,color:step===0?C.muted:C.white,cursor:step===0?"default":"pointer",fontSize:11}}>
          ◀ {lang==="fr"?"Précédent":lang==="en"?"Previous":lang==="es"?"Anterior":"Anterior"}
        </button>
        <button onClick={()=>setStep(s=>Math.min(points.length-1,s+1))} disabled={step===points.length-1}
          style={{flex:1,padding:"8px",borderRadius:10,background:step===points.length-1?"rgba(255,255,255,0.07)":`linear-gradient(135deg,${C.blue},${C.blue2})`,border:`1px solid ${step===points.length-1?"rgba(255,255,255,0.1)":C.blue2}`,color:C.white,cursor:step===points.length-1?"default":"pointer",fontSize:11,fontWeight:700}}>
          {lang==="fr"?"Suivant":"Next"} ▶
        </button>
      </div>
      <div style={{fontSize:9,color:C.muted,textAlign:"center",marginTop:4}}>
        {lang==="fr"?"Cap 040° · Vitesse 12 nœuds · Courant N 1,5kn (visible à l'étape 3)":
         lang==="en"?"Course 040° · Speed 12 knots · Current N 1.5kn (visible at step 3)":
         lang==="es"?"Rumbo 040° · Velocidad 12 nudos · Corriente N 1,5kn (visible en paso 3)":
         "Rumo 040° · Velocidade 12 nós · Corrente N 1,5kn (visível no passo 3)"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — BEARINGS & POSITION FIX
// ══════════════════════════════════════
function BearingsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const W=290, H=200;

  const landmarks = [
    {id:"lighthouse", x:50, y:30, icon:"⚡", label:{fr:"Phare Kribi",en:"Kribi LH",es:"Faro Kribi",pt:"Farol Kribi"}, bearing:315, color:C.gold2},
    {id:"tower", x:240, y:25, icon:"📡", label:{fr:"Tour radar",en:"Radar tower",es:"Torre radar",pt:"Torre radar"}, bearing:45, color:C.orange},
    {id:"cape", x:260, y:120, icon:"⛰️", label:{fr:"Cap rocheux",en:"Rocky cape",es:"Cabo rocoso",pt:"Cabo rochoso"}, bearing:92, color:C.red},
  ];

  const ship = {x:145, y:130};

  // Draw bearing lines from ship to landmarks
  const toRad = d => d*Math.PI/180;
  const bearingLines = landmarks.map(lm => {
    const dx = lm.x - ship.x;
    const dy = lm.y - ship.y;
    const len = Math.sqrt(dx*dx+dy*dy);
    return {x1:ship.x, y1:ship.y, x2:lm.x, y2:lm.y, color:lm.color, id:lm.id};
  });

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Sea texture */}
        {[40,80,120,160].map(y=>(
          <path key={y} d={`M0,${y} Q72,${y-3} 145,${y} Q218,${y+3} ${W},${y}`}
            fill="none" stroke="rgba(77,166,255,0.06)" strokeWidth="0.8"/>
        ))}

        {/* Bearing lines */}
        {bearingLines.map(bl => (
          <line key={bl.id} x1={bl.x1} y1={bl.y1} x2={bl.x2} y2={bl.y2}
            stroke={bl.color} strokeWidth={sel===bl.id?2:1}
            strokeDasharray={sel===bl.id?"6,3":"4,4"} opacity={sel===bl.id?0.9:0.4}/>
        ))}

        {/* Landmarks */}
        {landmarks.map(lm => (
          <g key={lm.id} onClick={()=>setSel(sel===lm.id?null:lm.id)} style={{cursor:"pointer"}}>
            {sel===lm.id && <circle cx={lm.x} cy={lm.y} r={18} fill="none"
              stroke={lm.color} strokeWidth="1.5" strokeDasharray="4,2"/>}
            <circle cx={lm.x} cy={lm.y} r={10}
              fill={sel===lm.id?`${lm.color}33`:"rgba(255,255,255,0.08)"}
              stroke={lm.color} strokeWidth={sel===lm.id?2:1}/>
            <text x={lm.x} y={lm.y+4} textAnchor="middle" fontSize="9">{lm.icon}</text>
            <text x={lm.x} y={lm.y+20} textAnchor="middle" fontSize="7" fill={lm.color} fontWeight="600">
              {lm.label[lang]||lm.label.fr}
            </text>
            <text x={lm.x} y={lm.y+28} textAnchor="middle" fontSize="7" fill={lm.color}>
              {lm.bearing}°V
            </text>
          </g>
        ))}

        {/* Ship */}
        <circle cx={ship.x} cy={ship.y} r={8} fill={C.blue2} opacity="0.9"/>
        <text x={ship.x} y={ship.y+4} textAnchor="middle" fontSize="10">🚢</text>

        {/* Position fix marker */}
        <circle cx={ship.x} cy={ship.y} r={14} fill="none"
          stroke={C.gold} strokeWidth="1.5" strokeDasharray="4,2"/>
        <text x={ship.x} y={ship.y+28} textAnchor="middle" fontSize="7" fill={C.gold}>
          {lang==="fr"?"✅ Point de position":lang==="en"?"✅ Position fix":lang==="es"?"✅ Punto de posición":"✅ Posição"}
        </text>

        {/* Instruction */}
        <rect x="5" y="5" width="160" height="14" rx="4" fill="rgba(0,0,0,0.5)"/>
        <text x="10" y="15" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche les amers pour voir les relèvements":
           lang==="en"?"Tap landmarks to see bearings":
           lang==="es"?"Toca los amers para ver las marcaciones":
           "Toque os amers para ver as marcações"}
        </text>
      </svg>

      {sel && (() => {
        const lm = landmarks.find(l=>l.id===sel);
        return (
          <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
            background:`${lm.color}15`,border:`1px solid ${lm.color}44`,
            animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:12,fontWeight:700,color:lm.color,marginBottom:4}}>
              {lm.icon} {lm.label[lang]||lm.label.fr}
            </div>
            <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>
              {lang==="fr"
                ?`Relèvement vrai : ${lm.bearing}°V\nDe notre navire → vers cet amer\nTracer cette droite sur la carte → droite de position`
                :lang==="en"
                ?`True bearing: ${lm.bearing}°T\nFrom our vessel → toward this landmark\nDraw this line on chart → position line`
                :lang==="es"
                ?`Marcación verdadera: ${lm.bearing}°V\nDesde nuestro buque → hacia este amer\nTraza esta línea en la carta → línea de posición`
                :`Marcação verdadeira: ${lm.bearing}°V\nDo nosso navio → para este ponto\nTraçar esta linha na carta → linha de posição`}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SEXTANT INTERACTIVE
// ══════════════════════════════════════
function SextantSVG({ lang }) {
  const [angle, setAngle] = useState(28);
  const [body, setBody] = useState("sun");

  const bodies = [
    {id:"sun",  icon:"☀️", label:{fr:"Soleil",en:"Sun",es:"Sol",pt:"Sol"}, color:C.gold2},
    {id:"moon", icon:"🌙", label:{fr:"Lune",en:"Moon",es:"Luna",pt:"Lua"}, color:"#aaaaff"},
    {id:"star", icon:"⭐", label:{fr:"Étoile",en:"Star",es:"Estrella",pt:"Estrela"}, color:C.white},
  ];
  const sel = bodies.find(b=>b.id===body);

  // Estimated position from angle (simplified)
  const lat = (90 - angle - 14.5).toFixed(1); // approximate

  return (
    <div>
      {/* Celestial body selector */}
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {bodies.map(b=>(
          <button key={b.id} onClick={()=>setBody(b.id)} style={{
            flex:1, padding:"7px 4px", borderRadius:10, fontSize:10, cursor:"pointer",
            background:body===b.id?`${b.color}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${body===b.id?b.color:"rgba(255,255,255,0.1)"}`,
            color:body===b.id?b.color:C.muted, fontWeight:body===b.id?700:400,
          }}>
            {b.icon} {b.label[lang]||b.label.fr}
          </button>
        ))}
      </div>

      {/* Sextant SVG */}
      <svg width="290" height="200" viewBox="0 0 290 200">
        <rect width="290" height="200" fill="#061020" rx="8"/>

        {/* Sky */}
        <rect x="0" y="0" width="290" height="100" fill="rgba(10,20,50,0.8)"/>
        {/* Stars */}
        {[[20,15],[60,25],[100,10],[150,30],[200,18],[240,25],[270,12]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={1} fill="white" opacity="0.4"/>
        ))}

        {/* Horizon line */}
        <rect x="0" y="100" width="290" height="100" fill="rgba(26,111,212,0.2)"/>
        <line x1="0" y1="100" x2="290" y2="100" stroke={C.blue2} strokeWidth="1.5" opacity="0.6"/>
        <text x="240" y="97" fontSize="7" fill={C.blue2} opacity="0.7">
          {lang==="fr"?"Horizon":lang==="en"?"Horizon":lang==="es"?"Horizonte":"Horizonte"}
        </text>

        {/* Celestial body */}
        <text x="145" y={100 - angle*1.8} textAnchor="middle" fontSize="22">{sel.icon}</text>

        {/* Angle measurement lines */}
        <line x1="145" y1="100" x2="145" y2={100-angle*1.8+12}
          stroke={sel.color} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"/>
        <line x1="100" y1="100" x2="200" y2="100"
          stroke={sel.color} strokeWidth="1" opacity="0.5"/>

        {/* Angle arc */}
        <path d={`M 145 100 L 145 ${100-angle*1.8+12}`}
          fill="none" stroke={sel.color} strokeWidth="0" opacity="0"/>
        <text x="160" y={100-angle*0.9} fontSize="9" fill={sel.color} fontWeight="700">
          {angle}°{Math.floor((angle%1)*60).toString().padStart(2,'0')}'
        </text>

        {/* Sextant frame */}
        <g transform="translate(5,110)">
          {/* Frame arc */}
          <path d="M 30,80 A 80,80 0 0 1 190,80" fill="none" stroke={C.gold} strokeWidth="3"/>
          {/* Graduation marks on arc */}
          {Array.from({length:13},(_,i)=>{
            const a = -180 + i*15;
            const rad = a*Math.PI/180;
            const r1=80,r2=72,cx2=110,cy2=80;
            return <line key={i}
              x1={cx2+r1*Math.cos(rad)} y1={cy2+r1*Math.sin(rad)}
              x2={cx2+r2*Math.cos(rad)} y2={cy2+r2*Math.sin(rad)}
              stroke={C.gold2} strokeWidth={i%3===0?2:0.8}/>;
          })}
          {/* Index arm */}
          <line x1="110" y1="80"
            x2={110+75*Math.cos((-180+angle*2)*Math.PI/180)}
            y2={80+75*Math.sin((-180+angle*2)*Math.PI/180)}
            stroke={C.red} strokeWidth="2"/>
          {/* Mirrors */}
          <rect x="100" y="40" width="20" height="12" fill="rgba(77,166,255,0.3)" stroke={C.blue2} strokeWidth="1" rx="2"/>
          <rect x="140" y="55" width="14" height="10" fill="rgba(77,166,255,0.2)" stroke={C.blue2} strokeWidth="0.8" rx="2"/>
          {/* Eyepiece */}
          <rect x="165" y="45" width="25" height="10" fill="#1a3a5c" stroke={C.gold} strokeWidth="1" rx="4"/>
          <circle cx="178" cy="50" r="4" fill="rgba(77,200,255,0.4)" stroke={C.blue2}/>
          {/* Handle */}
          <rect x="95" y="88" width="30" height="12" fill="#1a2a1a" stroke={C.gold} strokeWidth="0.8" rx="3"/>
          <text x="110" y="97" textAnchor="middle" fontSize="6" fill={C.gold} opacity="0.7">SEXTANT</text>
        </g>

        {/* Result box */}
        <rect x="5" y="5" width="140" height="28" rx="6" fill="rgba(0,0,0,0.6)" stroke={C.gold} strokeWidth="0.8"/>
        <text x="10" y="16" fontSize="7" fill={C.gold2} fontWeight="700">
          Ho = {angle}°{Math.floor((angle%1)*60).toString().padStart(2,'0')}'
        </text>
        <text x="10" y="28" fontSize="7" fill={C.muted}>
          {lang==="fr"?`Lat. estimée ≈ ${lat}°N`:lang==="en"?`Est. Lat ≈ ${lat}°N`:lang==="es"?`Lat. est. ≈ ${lat}°N`:`Lat. est. ≈ ${lat}°N`}
        </text>
      </svg>

      {/* Angle slider */}
      <div style={{marginTop:8}}>
        <div style={{fontSize:10,color:sel.color,marginBottom:4,fontWeight:600}}>
          {lang==="fr"?"Hauteur observée (Ho) :":lang==="en"?"Observed height (Ho):":lang==="es"?"Altura observada (Ho):":"Altura observada (Ho):"} {angle}°
        </div>
        <input type="range" min="5" max="75" value={angle}
          onChange={e=>setAngle(Number(e.target.value))}
          style={{width:"100%",accentColor:sel.color}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted,marginTop:2}}>
          <span>5° (bas)</span><span>40° (idéal)</span><span>75° (haut)</span>
        </div>
      </div>

      {/* Info box */}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,
        fontSize:11,color:C.white,lineHeight:1.7}}>
        <div style={{fontWeight:700,color:C.gold2,marginBottom:4}}>
          {lang==="fr"?"Méthode Marcq-St-Hilaire :":lang==="en"?"Marcq-St-Hilaire method:":lang==="es"?"Método Marcq-St-Hilaire:":"Método Marcq-St-Hilaire:"}
        </div>
        {lang==="fr"
          ?"1. Mesurer Ho avec le sextant\n2. Calculer Hc (tables nautiques)\n3. Intercept = Ho - Hc\n4. Tracer la droite de position\n5. 2 astres = 1 point astronomique"
          :lang==="en"
          ?"1. Measure Ho with sextant\n2. Calculate Hc (nautical tables)\n3. Intercept = Ho - Hc\n4. Plot position line\n5. 2 bodies = 1 astronomical fix"
          :lang==="es"
          ?"1. Medir Ho con el sextante\n2. Calcular Hc (tablas náuticas)\n3. Intercept = Ho - Hc\n4. Trazar la línea de posición\n5. 2 astros = 1 punto astronómico"
          :"1. Medir Ho com o sextante\n2. Calcular Hc (tabelas náuticas)\n3. Intercept = Ho - Hc\n4. Traçar a linha de posição\n5. 2 astros = 1 ponto astronómico"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — WATCH KEEPING / ECDIS
// ══════════════════════════════════════
function WatchKeepingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const tools = [
    {id:"radar", x:40, y:40, icon:"📡", label:{fr:"RADAR",en:"RADAR",es:"RADAR",pt:"RADAR"}, color:C.green,
     desc:{fr:"Détection obstacles et navires par ondes radio\nPortée : 0,5 à 96 milles\nSystèmes ARPA : calcul cap/vitesse des cibles\nObligatoire SOLAS : tous navires > 300 TB",en:"Obstacle/vessel detection by radio waves\nRange: 0.5 to 96 miles\nARPA systems: target course/speed\nSOLAS mandatory: all vessels > 300 GT",es:"Detección obstáculos y buques por ondas radio\nAlcance: 0,5 a 96 millas\nARPA: rumbo/velocidad de blancos",pt:"Detecção obstáculos por ondas rádio\nAlcance: 0,5 a 96 milhas\nARPA: rumo/velocidade dos alvos"}},
    {id:"ais",   x:130, y:40, icon:"📶", label:{fr:"AIS",en:"AIS",es:"AIS",pt:"AIS"}, color:C.blue2,
     desc:{fr:"Automatic Identification System\nTransmet : nom, MMSI, cap, vitesse, position\nClasse A : navires > 300 TB (SOLAS)\nClasse B : plaisance, petits navires\n⚠️ Ne remplace PAS le radar",en:"Automatic Identification System\nTransmits: name, MMSI, course, speed, position\nClass A: vessels > 300 GT (SOLAS)\nClass B: leisure, small vessels\n⚠️ Does NOT replace radar",es:"Sistema Automático de Identificación\nTransmite: nombre, MMSI, rumbo, velocidad\nClase A: buques > 300 TB (SOLAS)",pt:"Sistema de Identificação Automática\nTransmite: nome, MMSI, rumo, velocidade\nClasse A: navios > 300 AB (SOLAS)"}},
    {id:"ecdis", x:220, y:40, icon:"🗺️", label:{fr:"ECDIS",en:"ECDIS",es:"ECDIS",pt:"ECDIS"}, color:C.gold2,
     desc:{fr:"Electronic Chart Display & Information System\nRemplace les cartes papier (depuis 2012 SOLAS)\nIntègre GPS + Radar + AIS + cartes ENC\nMis à jour chaque semaine (Notices to Mariners)\n2 ECDIS obligatoires (redondance)",en:"Electronic Chart Display & Information System\nReplaces paper charts (since 2012 SOLAS)\nIntegrates GPS + Radar + AIS + ENC charts\nWeekly updates (Notices to Mariners)\n2 ECDIS mandatory (redundancy)",es:"Sistema de Visualización de Cartas Electrónicas\nSustituye cartas papel (desde 2012 SOLAS)\n2 ECDIS obligatorios (redundancia)",pt:"Sistema de Visualização de Cartas Eletrónicas\nSubstitui cartas papel (desde 2012 SOLAS)\n2 ECDIS obrigatórios (redundância)"}},
    {id:"vhf",   x:40, y:120, icon:"📻", label:{fr:"VHF",en:"VHF",es:"VHF",pt:"VHF"}, color:C.orange,
     desc:{fr:"Canal 16 : veille permanente obligatoire\nCanal 13 : communications passerelle-à-passerelle\nGMDSS : Global Maritime Distress Safety System\nDSC : Appel de détresse numérique\nMayday : détresse · Pan Pan : urgence",en:"Channel 16: permanent watch mandatory\nChannel 13: bridge-to-bridge comms\nGMDSS: Global Maritime Distress Safety System\nDSC: Digital selective calling\nMayday: distress · Pan Pan: urgency",es:"Canal 16: escucha permanente obligatoria\nCanal 13: comunicaciones puente a puente\nMayday: socorro · Pan Pan: urgencia",pt:"Canal 16: escuta permanente obrigatória\nCanal 13: comunicações ponte a ponte\nMayday: socorro · Pan Pan: urgência"}},
    {id:"gps",   x:130, y:120, icon:"🛰️", label:{fr:"GPS/GNSS",en:"GPS/GNSS",es:"GPS/GNSS",pt:"GPS/GNSS"}, color:C.purple,
     desc:{fr:"Global Navigation Satellite System\nPrécision : 3-10 mètres (civil)\nGPS (USA) · GLONASS (Russie) · Galileo (EU)\nDGPS : précision < 1 mètre (ports)\n⚠️ Jamming/spoofing = risque sécurité",en:"Global Navigation Satellite System\nAccuracy: 3-10 meters (civil)\nGPS (USA) · GLONASS (Russia) · Galileo (EU)\nDGPS: < 1 meter accuracy (ports)\n⚠️ Jamming/spoofing = safety risk",es:"Sistema de Navegación Global por Satélite\nPrecisión: 3-10 metros (civil)\n⚠️ Jamming/spoofing = riesgo de seguridad",pt:"Sistema Global de Navegação por Satélite\nPrecisão: 3-10 metros (civil)\n⚠️ Jamming/spoofing = risco de segurança"}},
    {id:"logbook",x:220, y:120, icon:"📓", label:{fr:"Journal de bord",en:"Log Book",es:"Cuaderno de bitácora",pt:"Diário de bordo"}, color:C.teal,
     desc:{fr:"Document LÉGAL — obligation SOLAS\nEntrées toutes les heures (quart)\nContenu : position, cap, vitesse, météo\nVisibilité, trafic, événements notables\nConservation : 3 ans minimum",en:"LEGAL document — SOLAS obligation\nEntries every hour (watch)\nContent: position, course, speed, weather\nVisibility, traffic, notable events\nRetention: minimum 3 years",es:"Documento LEGAL — obligación SOLAS\nEntradas cada hora (guardia)\nConservación: 3 años mínimo",pt:"Documento LEGAL — obrigação SOLAS\nEntradas a cada hora (quarto)\nConservação: 3 anos mínimo"}},
  ];
  const s = sel ? tools.find(t=>t.id===sel) : null;
  return (
    <div>
      <svg width="290" height="180" viewBox="0 0 290 180">
        <rect width="290" height="180" fill="#061020" rx="8"/>
        <rect x="5" y="5" width="280" height="165" rx="6" fill="rgba(13,31,60,0.8)" stroke={C.border} strokeWidth="0.8"/>
        {/* Bridge silhouette */}
        <rect x="80" y="70" width="130" height="50" fill="rgba(10,20,40,0.5)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" rx="2"/>
        {/* Windows */}
        {[90,108,126,144,162,180].map((x,i)=>(
          <rect key={i} x={x} y={75} width={14} height={10} fill="rgba(255,220,100,0.3)" rx="1"/>
        ))}
        {tools.map(tool=>(
          <g key={tool.id} onClick={()=>setSel(sel===tool.id?null:tool.id)} style={{cursor:"pointer"}}>
            {sel===tool.id&&<circle cx={tool.x+25} cy={tool.y+25} r={32} fill="none" stroke={tool.color} strokeWidth="1.5" strokeDasharray="4,2"/>}
            <rect x={tool.x} y={tool.y} width={50} height={50} rx={10}
              fill={sel===tool.id?`${tool.color}22`:"rgba(255,255,255,0.04)"}
              stroke={sel===tool.id?tool.color:"rgba(255,255,255,0.1)"}
              strokeWidth={sel===tool.id?2:0.8}/>
            <text x={tool.x+25} y={tool.y+22} textAnchor="middle" fontSize="16">{tool.icon}</text>
            <text x={tool.x+25} y={tool.y+36} textAnchor="middle" fontSize="6" fill={tool.color} fontWeight="700">{tool.label[lang]||tool.label.fr}</text>
          </g>
        ))}
        <text x="145" y="170" textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche chaque équipement pour en savoir plus":lang==="en"?"Tap each equipment to learn more":lang==="es"?"Toca cada equipo para saber más":"Toque cada equipamento para saber mais"}
        </text>
      </svg>
      {s&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${s.color}15`,border:`1px solid ${s.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:6}}>{s.icon} {s.label[lang]||s.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{s.desc[lang]||s.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — Dead Reckoning calculation
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"36",q2:"040",q3:"3"};
  const qs = {
    fr:[
      {id:"q1",q:"Vitesse 12 nœuds · Temps 3 heures\nQuelle distance parcourue en milles nautiques ?"},
      {id:"q2",q:"Cap vrai 040° · δ=+2°E · d=-1°W\nQuel est le Cap Compas (CC) à gouverner ?"},
      {id:"q3",q:"Position A : 04°00'N · Position B : 04°03'N\nCombien de milles nautiques entre A et B ?"},
    ],
    en:[
      {id:"q1",q:"Speed 12 knots · Time 3 hours\nWhat distance in nautical miles?"},
      {id:"q2",q:"True course 040° · δ=+2°E · d=-1°W\nWhat Compass Course (CC) to steer?"},
      {id:"q3",q:"Position A: 04°00'N · Position B: 04°03'N\nHow many nautical miles between A and B?"},
    ],
    es:[
      {id:"q1",q:"Velocidad 12 nudos · Tiempo 3 horas\n¿Qué distancia en millas náuticas?"},
      {id:"q2",q:"Rumbo verdadero 040° · δ=+2°E · d=-1°O\n¿Qué Rumbo de Compás (RC) gobernar?"},
      {id:"q3",q:"Posición A: 04°00'N · Posición B: 04°03'N\n¿Cuántas millas náuticas entre A y B?"},
    ],
    pt:[
      {id:"q1",q:"Velocidade 12 nós · Tempo 3 horas\nQue distância em milhas náuticas?"},
      {id:"q2",q:"Rumo verdadeiro 040° · δ=+2°E · d=-1°O\nQue Rumo de Bússola (RB) governar?"},
      {id:"q3",q:"Posição A: 04°00'N · Posição B: 04°03'N\nQuantas milhas náuticas entre A e B?"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim()===correct[id];
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:14,border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : D=V×T · CV=CC+δ+d · 1'de latitude = 1 mille nautique":
         lang==="en"?"💡 Reminders: D=V×T · TC=CC+δ+d · 1' latitude = 1 nautical mile":
         lang==="es"?"💡 Recordatorios: D=V×T · RV=RC+δ+d · 1'latitud = 1 milla náutica":
         "💡 Lembretes: D=V×T · RV=RB+δ+d · 1'latitude = 1 milha náutica"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))}
            placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}
          </div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: D=12×3=36mn · Q2: CM=040-2=038° → CC=038+1=039° ≈ 040° · Q3: 3'-0'=3' → 3 milles nautiques":
         lang==="en"?"✅ Q1: D=12×3=36nm · Q2: MC=040-2=038° → CC=038+1=039° ≈ 040° · Q3: 3'-0'=3' → 3 nautical miles":
         lang==="es"?"✅ Q1: D=12×3=36mn · Q2: RM=040-2=038° → RC=038+1=039° ≈ 040° · Q3: 3 millas náuticas":
         "✅ Q1: D=12×3=36mn · Q2: RM=040-2=038° → RB=038+1=039° ≈ 040° · Q3: 3 milhas náuticas"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — Costa Concordia
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Costa Concordia — Île du Giglio (2012)",teaser:"Paquebot 114 500t · 32 morts · Échouage volontaire trop proche des côtes",what:"Le Costa Concordia effectue un 'salut' (passage très près de l'île pour les touristes). Le capitaine Schettino s'approche à moins de 200m des rochers du Giglio. Le navire touche un écueil, s'incline à 70° et coule partiellement. 32 morts sur 4 229 personnes à bord.",cause:"• Le capitaine a volontairement dévié la route approuvée pour le 'salut'\n• Aucune autorisation officielle pour ce passage\n• Réaction tardive à l'alarme d'inclinaison\n• Abandon du navire AVANT les passagers (Schettino condamné)\n• Mauvaise coordination de l'évacuation\n• Le Costa Concordia naviguait à 15,5 nœuds (trop vite près des côtes)",lessons:"✓ Ne jamais dévier de la route approuvée sans autorisation\n✓ Le capitaine quitte le navire EN DERNIER (Code ISM)\n✓ L'approche côtière exige vitesse réduite et veille renforcée\n✓ Les 'saluts' touristiques sont désormais interdits\n✓ Schettino : 16 ans de prison",link:"🔗 Lien L6 : Navigation pratique = respecter la route approuvée, réduire la vitesse en approche côtière, et appliquer rigoureusement les procédures d'urgence."},
    en:{title:"Costa Concordia — Giglio Island (2012)",teaser:"114,500t cruise ship · 32 deaths · Intentional close coastal passage",what:"Costa Concordia performs a 'salute' (very close island pass for tourists). Captain Schettino approaches within 200m of Giglio rocks. The vessel strikes a reef, lists to 70° and partially sinks. 32 deaths among 4,229 people aboard.",cause:"• Captain intentionally deviated from approved route for the 'salute'\n• No official authorization for this passage\n• Late reaction to list alarm\n• Abandoned ship BEFORE passengers (Schettino convicted)\n• Poor evacuation coordination\n• Sailing at 15.5 knots (too fast near coast)",lessons:"✓ Never deviate from approved route without authorization\n✓ Captain abandons ship LAST (ISM Code)\n✓ Coastal approach requires reduced speed and enhanced watch\n✓ Tourist 'salutes' now prohibited\n✓ Schettino: 16 years prison",link:"🔗 L6 Link: Practical navigation = follow approved route, reduce speed on coastal approach, strictly apply emergency procedures."},
    es:{title:"Costa Concordia — Isla del Giglio (2012)",teaser:"Crucero 114.500t · 32 muertos · Paso costero intencional demasiado cerca",what:"El Costa Concordia realiza un 'saludo' (paso muy cercano a la isla para los turistas). El capitán Schettino se acerca a menos de 200m de las rocas del Giglio. El buque toca un escollo y se escora a 70°. 32 muertos de 4.229 personas a bordo.",cause:"• El capitán desvió voluntariamente la ruta aprobada para el 'saludo'\n• Sin autorización oficial\n• Reacción tardía a la alarma de escora\n• Abandonó el buque ANTES que los pasajeros (Schettino condenado)",lessons:"✓ Nunca desviarse de la ruta aprobada sin autorización\n✓ El capitán abandona el buque AL ÚLTIMO (Código ISM)\n✓ Aproximación costera = velocidad reducida y vigilancia reforzada\n✓ Schettino: 16 años de prisión",link:"🔗 Vínculo L6: Navegación práctica = respetar la ruta aprobada, reducir la velocidad en aproximación costera."},
    pt:{title:"Costa Concordia — Ilha do Giglio (2012)",teaser:"Cruzeiro 114.500t · 32 mortos · Passagem costeira intencional demasiado próxima",what:"O Costa Concordia realiza uma 'saudação' (passagem muito próxima da ilha para os turistas). O capitão Schettino aproxima-se a menos de 200m dos rochedos do Giglio. O navio encalha e adorna a 70°. 32 mortos de 4.229 pessoas a bordo.",cause:"• O capitão desviou voluntariamente da rota aprovada para a 'saudação'\n• Sem autorização oficial\n• Reação tardia ao alarme de escora\n• Abandonou o navio ANTES dos passageiros (Schettino condenado)",lessons:"✓ Nunca desviar da rota aprovada sem autorização\n✓ O capitão abandona o navio POR ÚLTIMO (Código ISM)\n✓ Aproximação costeira = velocidade reduzida e vigilância reforçada\n✓ Schettino: 16 anos de prisão",link:"🔗 Vínculo L6: Navegação prática = respeitar a rota aprovada, reduzir velocidade em aproximação costeira."},
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
    {q:"Un navire fait 14 nœuds pendant 3h30. Quelle distance a-t-il parcourue ?",opts:["42 milles nautiques","46 milles nautiques","49 milles nautiques","52 milles nautiques"],correct:2,expl:"D = V × T = 14 × 3,5 = 49 milles nautiques. Attention : 3h30 = 3,5 heures. La vitesse en nœuds × temps en heures = distance en milles nautiques."},
    {q:"Pour calculer un point de position par relèvements, le minimum requis est :",opts:["1 amer (relèvement unique)","2 amers (2 droites = 1 intersection)","3 amers (triangle d'erreur = plus précis)","4 amers (rectangle de certitude)"],correct:1,expl:"2 relèvements sur 2 amers différents = 2 droites dont l'intersection donne la position. Avec 3 amers, on obtient un triangle d'erreur (3 droites forment un triangle) — plus fiable mais non obligatoire."},
    {q:"Le sextant mesure :",opts:["La distance entre deux navires","L'angle entre un astre et l'horizon pour déterminer la latitude","La profondeur d'eau sous la quille","La vitesse du navire par rapport au fond"],correct:1,expl:"Le sextant mesure la HAUTEUR (angle) d'un astre au-dessus de l'horizon. En connaissant l'heure exacte et en utilisant les éphémérides/tables nautiques, on calcule la droite de position (méthode Marcq-St-Hilaire)."},
    {q:"Pourquoi la veille radar (COLREG Rule 5) est-elle obligatoire en permanence ?",opts:["Pour économiser le carburant","Pour détecter tôt les dangers et éviter les collisions — même par visibilité réduite","Pour enregistrer les données de navigation dans le VDR","Pour surveiller la météo en temps réel"],correct:1,expl:"COLREG Rule 5 : 'Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means.' La veille est obligatoire 24h/24 — radar, AIS, guetteur visuel, VHF. C'est la première règle de prévention des collisions."},
    {q:"Quelle erreur principale a causé le naufrage du Costa Concordia (2012) ?",opts:["Tempête imprévue et mer déchaînée","Le capitaine a volontairement dévié de la route approuvée pour un passage touristique non autorisé","Défaillance des systèmes de navigation ECDIS","Erreur du pilote automatique"],correct:1,expl:"Le capitaine Schettino a volontairement dévié de la route approuvée pour effectuer un 'salut' (passage près de l'île du Giglio pour les touristes). Il a été condamné à 16 ans de prison. Leçon : ne JAMAIS dévier de la route approuvée sans autorisation officielle."},
  ],
  en:[
    {q:"A vessel makes 14 knots for 3h30. What distance did it cover?",opts:["42 nautical miles","46 nautical miles","49 nautical miles","52 nautical miles"],correct:2,expl:"D = V × T = 14 × 3.5 = 49 nautical miles. Note: 3h30 = 3.5 hours. Speed in knots × time in hours = distance in nautical miles."},
    {q:"To calculate a position fix by bearings, the minimum required is:",opts:["1 landmark (single bearing)","2 landmarks (2 lines = 1 intersection)","3 landmarks (triangle of error = more accurate)","4 landmarks (rectangle of certainty)"],correct:1,expl:"2 bearings on 2 different landmarks = 2 lines whose intersection gives the position. With 3 landmarks, you get a triangle of error (3 lines form a triangle) — more reliable but not mandatory."},
    {q:"The sextant measures:",opts:["The distance between two vessels","The angle between a celestial body and the horizon to determine latitude","The water depth under the keel","The vessel's speed over ground"],correct:1,expl:"The sextant measures the HEIGHT (angle) of a celestial body above the horizon. By knowing the exact time and using ephemerides/nautical tables, the position line is calculated (Marcq-St-Hilaire method)."},
    {q:"Why is radar watch (COLREG Rule 5) permanently mandatory?",opts:["To save fuel","To detect dangers early and avoid collisions — even in reduced visibility","To record navigation data in the VDR","To monitor weather in real time"],correct:1,expl:"COLREG Rule 5: 'Every vessel shall at all times maintain a proper look-out.' Watch is mandatory 24/7 — radar, AIS, visual lookout, VHF. This is the first collision prevention rule."},
    {q:"What was the main cause of the Costa Concordia sinking (2012)?",opts:["Unexpected storm and rough seas","Captain intentionally deviated from approved route for unauthorized tourist passage","ECDIS navigation system failure","Autopilot error"],correct:1,expl:"Captain Schettino intentionally deviated from the approved route to perform a 'salute' (close pass near Giglio island for tourists). He was sentenced to 16 years in prison. Lesson: NEVER deviate from the approved route without official authorization."},
  ],
  es:[
    {q:"Un buque navega a 14 nudos durante 3h30. ¿Qué distancia recorrió?",opts:["42 millas náuticas","46 millas náuticas","49 millas náuticas","52 millas náuticas"],correct:2,expl:"D = V × T = 14 × 3,5 = 49 millas náuticas. Atención: 3h30 = 3,5 horas."},
    {q:"Para calcular un punto de posición por marcaciones, el mínimo requerido es:",opts:["1 amer (marcación única)","2 amers (2 líneas = 1 intersección)","3 amers (triángulo de error = más preciso)","4 amers"],correct:1,expl:"2 marcaciones sobre 2 amers diferentes = 2 líneas cuya intersección da la posición. Con 3 amers se obtiene un triángulo de error, más fiable."},
    {q:"El sextante mide:",opts:["La distancia entre dos buques","El ángulo entre un astro y el horizonte para determinar la latitud","La profundidad del agua bajo la quilla","La velocidad del buque respecto al fondo"],correct:1,expl:"El sextante mide la ALTURA (ángulo) de un astro sobre el horizonte. Conociendo la hora exacta y usando las tablas náuticas, se calcula la línea de posición (método Marcq-St-Hilaire)."},
    {q:"¿Por qué la guardia de radar (COLREG Regla 5) es obligatoria permanentemente?",opts:["Para ahorrar combustible","Para detectar peligros y evitar abordajes — incluso con visibilidad reducida","Para registrar datos en el VDR","Para vigilar el tiempo"],correct:1,expl:"COLREG Regla 5: guardia obligatoria 24/7. Radar, AIS, vigía visual, VHF. Es la primera regla de prevención de abordajes."},
    {q:"¿Cuál fue la causa principal del naufragio del Costa Concordia (2012)?",opts:["Tormenta imprevista","El capitán desvió voluntariamente de la ruta aprobada para un paso turístico no autorizado","Fallo del sistema ECDIS","Error del piloto automático"],correct:1,expl:"El capitán Schettino desvió voluntariamente la ruta para un 'saludo' turístico. Condenado a 16 años de prisión. Lección: NUNCA desviarse de la ruta aprobada sin autorización."},
  ],
  pt:[
    {q:"Um navio navega a 14 nós durante 3h30. Que distância percorreu?",opts:["42 milhas náuticas","46 milhas náuticas","49 milhas náuticas","52 milhas náuticas"],correct:2,expl:"D = V × T = 14 × 3,5 = 49 milhas náuticas. Atenção: 3h30 = 3,5 horas."},
    {q:"Para calcular uma posição por marcações, o mínimo necessário é:",opts:["1 amer (marcação única)","2 amers (2 linhas = 1 interseção)","3 amers (triângulo de erro = mais preciso)","4 amers"],correct:1,expl:"2 marcações sobre 2 amers diferentes = 2 linhas cuja interseção dá a posição. Com 3 amers obtém-se um triângulo de erro, mais fiável."},
    {q:"O sextante mede:",opts:["A distância entre dois navios","O ângulo entre um astro e o horizonte para determinar a latitude","A profundidade da água sob a quilha","A velocidade do navio em relação ao fundo"],correct:1,expl:"O sextante mede a ALTURA (ângulo) de um astro acima do horizonte. Conhecendo a hora exata e usando as tabelas náuticas, calcula-se a linha de posição (método Marcq-St-Hilaire)."},
    {q:"Por que a vigia de radar (COLREG Regra 5) é obrigatória permanentemente?",opts:["Para economizar combustível","Para detetar perigos e evitar colisões — mesmo com visibilidade reduzida","Para registar dados no VDR","Para vigiar o tempo"],correct:1,expl:"COLREG Regra 5: vigia obrigatória 24/7. Radar, AIS, vigia visual, VHF. É a primeira regra de prevenção de colisões."},
    {q:"Qual foi a causa principal do naufrágio do Costa Concordia (2012)?",opts:["Tempestade imprevista","O capitão desviou voluntariamente da rota aprovada para uma passagem turística não autorizada","Falha do sistema ECDIS","Erro do piloto automático"],correct:1,expl:"O capitão Schettino desviou voluntariamente da rota para uma 'saudação' turística. Condenado a 16 anos de prisão. Lição: NUNCA desviar da rota aprovada sem autorização."},
  ],
};

// ══════════════════════════════════════
// BANQUE 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
  {q:"Formule de navigation à l'estime — que signifie D = V × T ?",opts:["Distance = Vitesse × Temps (en milles, nœuds, heures)","Direction = Vecteur × Temps","Dérive = Vent × Turbulence","Déclinaison = Variation × Temps"],correct:0,expl:"D=V×T est la formule fondamentale de l'estime. D (milles nautiques) = V (nœuds) × T (heures). Exemple : 12 kn × 3 h = 36 mn. C'est la méthode de secours si le GPS tombe en panne."},
  {q:"Qu'est-ce que l'estime (Dead Reckoning) ?",opts:["Navigation par sextant uniquement","Calcul de la position estimée depuis la dernière position connue + cap + vitesse + temps","Navigation par bouées de chenal uniquement","Calcul de la profondeur par sondeur"],correct:1,expl:"Dead Reckoning = calcul de la position estimée : dernière position connue + cap suivi + vitesse × temps. Plus le temps écoulé depuis la dernière position connue est long, plus l'erreur s'accumule."},
  {q:"Qu'est-ce qu'un 'triangle d'erreur' en navigation par relèvements ?",opts:["Une figure géométrique décorative sur les cartes","Le triangle formé par 3 droites de position quand les 3 relèvements ne se croisent pas au même point","Une méthode de calcul astronomique","L'espace entre 3 bouées cardinales"],correct:1,expl:"Quand on prend 3 relèvements sur 3 amers, les 3 droites devraient se croiser en un seul point. En pratique, elles forment un petit triangle (triangle d'erreur). La position estimée est au centre du triangle."},
  {q:"Quelle est la précision typique du GPS civil ?",opts:["±100 mètres","±3 à 10 mètres","±50 centimètres","±1 kilomètre"],correct:1,expl:"Le GPS civil offre une précision de ±3 à 10 mètres. Le DGPS (Differential GPS, utilisé en port) permet <1 mètre. Le GPS militaire peut atteindre ±0,5 mètre. Le signal GPS peut être perturbé (jamming) ou falsifié (spoofing)."},
  {q:"Qu'est-ce que le 'crépuscule nautique' (nautical twilight) ?",opts:["La période quand le soleil est à 6° sous l'horizon — visibilité parfaite pour le sextant","Le moment du coucher du soleil en mer","La période nocturne entre minuit et 3h du matin","La visibilité réduite par le brouillard"],correct:0,expl:"Crépuscule nautique = soleil entre 6° et 12° sous l'horizon. C'est le moment idéal pour l'observation au sextant car on peut voir À LA FOIS les étoiles ET l'horizon. Dure environ 20-40 minutes selon la latitude."},
  {q:"Qu'est-ce que le GMDSS ?",opts:["Global Maritime Digital Surveillance System — surveillance des navires","Global Maritime Distress Safety System — communications de détresse","GPS Marine Distance Speed System","General Maritime Distance Search System"],correct:1,expl:"GMDSS = Global Maritime Distress Safety System. Système mondial de communications de détresse : DSC (appel numérique sélectif canal 70), EPIRB (balise de détresse), SART (radar transponder de sauvetage), VHF/MF/HF. Obligatoire SOLAS sur les navires > 300 TB."},
  {q:"Le VDR (Voyage Data Recorder) est souvent comparé à :",opts:["Le GPS du navire","La boîte noire des avions — enregistre les données de navigation","Le journal de bord électronique","Le système AIS du navire"],correct:1,expl:"VDR = Voyage Data Recorder. Comme la boîte noire des avions : enregistre en continu position, cap, vitesse, commandes de barre, communications radio, alarmes et données radar. Obligatoire SOLAS sur les navires > 3000 TB. Durée d'enregistrement : 12 heures minimum."},
  {q:"Quelle est la différence entre AIS Classe A et AIS Classe B ?",opts:["Classe A = satellite · Classe B = radio terrestre","Classe A (navires commerciaux SOLAS) · Classe B (plaisance, petits navires) — puissance et fréquence de transmission différentes","Classe A = émission · Classe B = réception seulement","Classe A = VHF · Classe B = HF"],correct:1,expl:"AIS Classe A : obligatoire SOLAS sur navires > 300 TB. Transmet toutes les 2-10 secondes. Données : nom, MMSI, cap, vitesse, position, destination, tirant d'eau. AIS Classe B : optionnel pour plaisance/petits navires. Transmet toutes les 30 secondes."},
  {q:"Qu'est-ce que la 'hauteur calculée' (Hc) en navigation astronomique ?",opts:["La hauteur du mât du navire","L'angle calculé theoriquement d'un astre depuis une position assumée, pour comparer avec la hauteur observée","La hauteur des vagues en mer","La hauteur du sextant au-dessus du pont"],correct:1,expl:"Hc (Hauteur calculée) = hauteur théorique de l'astre calculée par les tables nautiques (ou éphémérides) depuis une position assumée. La différence (Hc - Ho) = intercept. Si Ho > Hc : on est plus proche de l'astre → on avance. Si Ho < Hc : on recule."},
  {q:"Quelle planète est la plus utile pour la navigation astronomique et pourquoi ?",opts:["Mars — planète rouge facilement reconnaissable","Vénus — souvent la plus brillante du ciel, visible même en semi-clarté","Jupiter — la plus grande planète","Saturne — ses anneaux la rendent unique"],correct:1,expl:"Vénus est souvent la plus brillante étoile du soir/matin, visible même quand l'horizon n'est pas encore parfaitement net. Son éclat exceptionnel permet de la repérer facilement. Jupiter est aussi très utilisée car très brillante. Mars, moins."},
  {q:"Qu'est-ce qu'une 'droite de hauteur' (position line) en astro-navigation ?",opts:["Une ligne sur la carte qui indique la profondeur","La ligne géographique sur laquelle se trouve le navire — calculée depuis l'observation d'un astre","Une ligne de sonde bathymétrique","La trajectoire d'une étoile filante"],correct:1,expl:"Droite de hauteur = ligne de position calculée depuis l'observation d'un astre avec le sextant. Le navire se trouve quelque part sur cette droite. Avec 2 astres observés = 2 droites dont l'intersection = point astronomique."},
  {q:"Quelle est la règle COLREG qui concerne la veille nautique ?",opts:["Rule 2 — Responsabilité générale","Rule 5 — Veille permanente par tous les moyens disponibles","Rule 10 — Dispositifs de séparation du trafic","Rule 16 — Manœuvre du navire manœuvrant"],correct:1,expl:"COLREG Rule 5 : chaque navire doit maintenir une veille permanente par la vue et l'ouïe ainsi que par tous les moyens disponibles adaptés aux circonstances. Veille visuelle + auditive + radar + AIS + VHF = obligatoire 24h/24."},
  {q:"Qu'est-ce que la 'visibilité météorologique' pour les feux de navigation ?",opts:["La portée lumineuse maximale d'un phare","La distance à laquelle les feux de navigation doivent être visibles selon COLREG","La portée radar en conditions normales","La distance d'un radar météo"],correct:1,expl:"COLREG Règle 22 : les feux de navigation doivent être visibles sur une portée minimale définie par la taille du navire. Ex: navire > 50m = feu de tête de mât visible à 6 milles. Ces distances sont calculées pour une visibilité météo de 10 milles."},
  {q:"Qu'est-ce que le 'cap fond' (Course Over Ground - COG) ?",opts:["Le cap compas lu sur la boussole","La direction réelle du déplacement du navire sur le fond, incluant courant et vent","Le cap vrai calculé depuis le nord géographique","Le cap magnétique après correction de déclinaison"],correct:1,expl:"COG (Course Over Ground) = direction réelle du déplacement du navire par rapport au fond de la mer. Inclut les effets du courant et du vent. Différent du cap vrai (direction où pointe le navire). Fourni par le GPS."},
  {q:"Pourquoi les tables nautiques (almanac) sont-elles nécessaires pour la navigation astronomique ?",opts:["Pour calculer les marées uniquement","Pour donner les positions des astres (déclinaison, angle horaire) à chaque instant, nécessaires au calcul Marcq-St-Hilaire","Pour calculer les distances entre les ports","Pour corriger les erreurs du compas magnétique"],correct:1,expl:"L'Almanach Nautique donne pour chaque jour/heure : la déclinaison (Déc) et l'Angle Horaire de Greenwich (AHGr) de chaque astre. Ces données sont indispensables pour calculer la hauteur calculée (Hc) par la méthode Marcq-St-Hilaire."},
  ],
  en:[
  {q:"Dead reckoning navigation formula — what does D = V × T mean?",opts:["Distance = Speed × Time (in miles, knots, hours)","Direction = Vector × Time","Drift = Wind × Turbulence","Declination = Variation × Time"],correct:0,expl:"D=V×T is the fundamental dead reckoning formula. D (nautical miles) = V (knots) × T (hours). Example: 12 kn × 3 h = 36 nm. This is the backup method if GPS fails."},
  {q:"What is Dead Reckoning?",opts:["Navigation solely by sextant","Calculating the estimated position from the last known position + heading + speed + time","Navigation solely by channel buoys","Depth calculation by echo sounder"],correct:1,expl:"Dead Reckoning = calculating the estimated position: last known position + heading followed + speed × time. The longer the time elapsed since the last known position, the more the error accumulates."},
  {q:"What is an 'error triangle' in bearing navigation?",opts:["A decorative geometric figure on charts","The triangle formed by 3 position lines when the 3 bearings don't cross at the same point","An astronomical calculation method","The space between 3 cardinal buoys"],correct:1,expl:"When taking 3 bearings on 3 landmarks, the 3 lines should cross at a single point. In practice, they form a small triangle (error triangle). The estimated position is at the center of the triangle."},
  {q:"What is the typical accuracy of civilian GPS?",opts:["±100 meters","±3 to 10 meters","±50 centimeters","±1 kilometer"],correct:1,expl:"Civilian GPS offers an accuracy of ±3 to 10 meters. DGPS (Differential GPS, used in port) allows <1 meter. Military GPS can reach ±0.5 meter. The GPS signal can be disrupted (jamming) or falsified (spoofing)."},
  {q:"What is 'nautical twilight'?",opts:["The period when the sun is 6° below the horizon — perfect visibility for sextant use","The moment of sunset at sea","The nighttime period between midnight and 3am","Reduced visibility due to fog"],correct:0,expl:"Nautical twilight = sun between 6° and 12° below the horizon. This is the ideal time for sextant observation because BOTH stars AND the horizon can be seen. Lasts about 20-40 minutes depending on latitude."},
  {q:"What is GMDSS?",opts:["Global Maritime Digital Surveillance System — vessel surveillance","Global Maritime Distress Safety System — distress communications","GPS Marine Distance Speed System","General Maritime Distance Search System"],correct:1,expl:"GMDSS = Global Maritime Distress Safety System. Worldwide distress communication system: DSC (Digital Selective Calling, channel 70), EPIRB (distress beacon), SART (search and rescue radar transponder), VHF/MF/HF. Mandatory under SOLAS on vessels > 300 GT."},
  {q:"The VDR (Voyage Data Recorder) is often compared to:",opts:["The vessel's GPS","Aircraft black boxes — records navigation data","The electronic logbook","The vessel's AIS system"],correct:1,expl:"VDR = Voyage Data Recorder. Like aircraft black boxes: continuously records position, heading, speed, helm orders, radio communications, alarms and radar data. Mandatory under SOLAS on vessels > 3000 GT. Recording duration: minimum 12 hours."},
  {q:"What is the difference between AIS Class A and AIS Class B?",opts:["Class A = satellite · Class B = terrestrial radio","Class A (SOLAS commercial vessels) · Class B (leisure, small vessels) — different transmission power and frequency","Class A = transmit · Class B = receive only","Class A = VHF · Class B = HF"],correct:1,expl:"AIS Class A: mandatory under SOLAS on vessels > 300 GT. Transmits every 2-10 seconds. Data: name, MMSI, heading, speed, position, destination, draft. AIS Class B: optional for leisure/small vessels. Transmits every 30 seconds."},
  {q:"What is 'calculated height' (Hc) in celestial navigation?",opts:["The height of the vessel's mast","The theoretically calculated angle of a celestial body from an assumed position, to compare with the observed height","The height of waves at sea","The height of the sextant above the deck"],correct:1,expl:"Hc (Calculated Height) = theoretical height of the celestial body calculated from nautical tables (or ephemeris) from an assumed position. The difference (Hc - Ho) = intercept. If Ho > Hc: closer to the body → move forward. If Ho < Hc: move back."},
  {q:"Which planet is most useful for celestial navigation and why?",opts:["Mars — easily recognizable red planet","Venus — often the brightest in the sky, visible even in semi-daylight","Jupiter — the largest planet","Saturn — its rings make it unique"],correct:1,expl:"Venus is often the brightest evening/morning star, visible even when the horizon isn't yet perfectly clear. Its exceptional brightness makes it easy to spot. Jupiter is also widely used as it's very bright. Mars less so."},
  {q:"What is a 'position line' in celestial navigation?",opts:["A line on the chart indicating depth","The geographic line on which the vessel is located — calculated from observing a celestial body","A bathymetric sounding line","The trajectory of a shooting star"],correct:1,expl:"Position line = line of position calculated from observing a celestial body with a sextant. The vessel is located somewhere on this line. With 2 bodies observed = 2 lines whose intersection = celestial fix."},
  {q:"Which COLREG rule concerns proper lookout?",opts:["Rule 2 — General responsibility","Rule 5 — Proper lookout by all available means","Rule 10 — Traffic separation schemes","Rule 16 — Action by give-way vessel"],correct:1,expl:"COLREG Rule 5: every vessel shall maintain a proper lookout by sight and hearing as well as by all available means appropriate to the prevailing circumstances. Visual + auditory + radar + AIS + VHF lookout = mandatory 24/7."},
  {q:"What is 'meteorological visibility' for navigation lights?",opts:["The maximum light range of a lighthouse","The distance at which navigation lights must be visible under COLREG","Radar range under normal conditions","The range of a weather radar"],correct:1,expl:"COLREG Rule 22: navigation lights must be visible at a minimum range defined by vessel size. E.g.: vessel > 50m = masthead light visible at 6 miles. These distances are calculated for a meteorological visibility of 10 miles."},
  {q:"What is Course Over Ground (COG)?",opts:["The compass heading read on the compass","The actual direction of the vessel's movement over the ground, including current and wind","The true heading calculated from geographic north","The magnetic heading after variation correction"],correct:1,expl:"COG (Course Over Ground) = actual direction of the vessel's movement relative to the sea floor. Includes the effects of current and wind. Different from true heading (direction the vessel is pointing). Provided by GPS."},
  {q:"Why are nautical tables (almanac) necessary for celestial navigation?",opts:["Only to calculate tides","To give the positions of celestial bodies (declination, hour angle) at every moment, needed for the Marcq-St-Hilaire calculation","To calculate distances between ports","To correct magnetic compass errors"],correct:1,expl:"The Nautical Almanac gives for each day/hour: the declination (Dec) and Greenwich Hour Angle (GHA) of each celestial body. This data is essential to calculate the computed height (Hc) using the Marcq-St-Hilaire method."},
  ],
  es:[
  {q:"Fórmula de navegación de estima — ¿qué significa D = V × T?",opts:["Distancia = Velocidad × Tiempo (en millas, nudos, horas)","Dirección = Vector × Tiempo","Deriva = Viento × Turbulencia","Declinación = Variación × Tiempo"],correct:0,expl:"D=V×T es la fórmula fundamental de la estima. D (millas náuticas) = V (nudos) × T (horas). Ejemplo: 12 kn × 3 h = 36 mn. Es el método de respaldo si falla el GPS."},
  {q:"¿Qué es la estima (Dead Reckoning)?",opts:["Navegación únicamente por sextante","Cálculo de la posición estimada desde la última posición conocida + rumbo + velocidad + tiempo","Navegación únicamente por boyas de canal","Cálculo de la profundidad por sonda"],correct:1,expl:"Dead Reckoning = cálculo de la posición estimada: última posición conocida + rumbo seguido + velocidad × tiempo. Cuanto más tiempo transcurrido desde la última posición conocida, más se acumula el error."},
  {q:"¿Qué es un 'triángulo de error' en navegación por marcaciones?",opts:["Una figura geométrica decorativa en las cartas","El triángulo formado por 3 rectas de posición cuando las 3 marcaciones no se cruzan en el mismo punto","Un método de cálculo astronómico","El espacio entre 3 boyas cardinales"],correct:1,expl:"Al tomar 3 marcaciones sobre 3 marcas, las 3 rectas deberían cruzarse en un solo punto. En la práctica, forman un pequeño triángulo (triángulo de error). La posición estimada está en el centro del triángulo."},
  {q:"¿Cuál es la precisión típica del GPS civil?",opts:["±100 metros","±3 a 10 metros","±50 centímetros","±1 kilómetro"],correct:1,expl:"El GPS civil ofrece una precisión de ±3 a 10 metros. El DGPS (GPS Diferencial, usado en puerto) permite <1 metro. El GPS militar puede alcanzar ±0,5 metro. La señal GPS puede ser perturbada (jamming) o falsificada (spoofing)."},
  {q:"¿Qué es el 'crepúsculo náutico' (nautical twilight)?",opts:["El período cuando el sol está a 6° bajo el horizonte — visibilidad perfecta para el sextante","El momento de la puesta de sol en el mar","El período nocturno entre medianoche y las 3 de la madrugada","La visibilidad reducida por la niebla"],correct:0,expl:"Crepúsculo náutico = sol entre 6° y 12° bajo el horizonte. Es el momento ideal para la observación con sextante porque se pueden ver A LA VEZ las estrellas Y el horizonte. Dura entre 20-40 minutos según la latitud."},
  {q:"¿Qué es el GMDSS?",opts:["Global Maritime Digital Surveillance System — vigilancia de buques","Global Maritime Distress Safety System — comunicaciones de socorro","GPS Marine Distance Speed System","General Maritime Distance Search System"],correct:1,expl:"GMDSS = Global Maritime Distress Safety System. Sistema mundial de comunicaciones de socorro: DSC (llamada selectiva digital canal 70), EPIRB (baliza de socorro), SART (transpondedor de radar de salvamento), VHF/MF/HF. Obligatorio SOLAS en buques > 300 TB."},
  {q:"El VDR (Voyage Data Recorder) se compara a menudo con:",opts:["El GPS del buque","La caja negra de los aviones — registra los datos de navegación","El cuaderno de bitácora electrónico","El sistema AIS del buque"],correct:1,expl:"VDR = Voyage Data Recorder. Como la caja negra de los aviones: registra continuamente posición, rumbo, velocidad, órdenes de timón, comunicaciones radio, alarmas y datos de radar. Obligatorio SOLAS en buques > 3000 TB. Duración de registro: mínimo 12 horas."},
  {q:"¿Cuál es la diferencia entre AIS Clase A y AIS Clase B?",opts:["Clase A = satélite · Clase B = radio terrestre","Clase A (buques comerciales SOLAS) · Clase B (recreo, buques pequeños) — potencia y frecuencia de transmisión diferentes","Clase A = emisión · Clase B = solo recepción","Clase A = VHF · Clase B = HF"],correct:1,expl:"AIS Clase A: obligatorio SOLAS en buques > 300 TB. Transmite cada 2-10 segundos. Datos: nombre, MMSI, rumbo, velocidad, posición, destino, calado. AIS Clase B: opcional para recreo/buques pequeños. Transmite cada 30 segundos."},
  {q:"¿Qué es la 'altura calculada' (Hc) en navegación astronómica?",opts:["La altura del mástil del buque","El ángulo calculado teóricamente de un astro desde una posición asumida, para comparar con la altura observada","La altura de las olas en el mar","La altura del sextante sobre la cubierta"],correct:1,expl:"Hc (Altura calculada) = altura teórica del astro calculada mediante tablas náuticas (o efemérides) desde una posición asumida. La diferencia (Hc - Ho) = intercepto. Si Ho > Hc: más cerca del astro → se avanza. Si Ho < Hc: se retrocede."},
  {q:"¿Qué planeta es más útil para la navegación astronómica y por qué?",opts:["Marte — planeta rojo fácilmente reconocible","Venus — a menudo el más brillante del cielo, visible incluso en semiclaridad","Júpiter — el planeta más grande","Saturno — sus anillos lo hacen único"],correct:1,expl:"Venus es a menudo la estrella más brillante del atardecer/amanecer, visible incluso cuando el horizonte aún no está perfectamente nítido. Su brillo excepcional permite localizarlo fácilmente. Júpiter también se usa mucho por ser muy brillante. Marte, menos."},
  {q:"¿Qué es una 'recta de altura' (position line) en astronavegación?",opts:["Una línea en la carta que indica la profundidad","La línea geográfica en la que se encuentra el buque — calculada desde la observación de un astro","Una línea de sonda batimétrica","La trayectoria de una estrella fugaz"],correct:1,expl:"Recta de altura = línea de posición calculada desde la observación de un astro con el sextante. El buque se encuentra en algún punto de esa recta. Con 2 astros observados = 2 rectas cuya intersección = punto astronómico."},
  {q:"¿Qué regla del COLREG concierne a la vigilancia náutica?",opts:["Regla 2 — Responsabilidad general","Regla 5 — Vigilancia permanente por todos los medios disponibles","Regla 10 — Dispositivos de separación del tráfico","Regla 16 — Maniobra del buque que cede el paso"],correct:1,expl:"COLREG Regla 5: todo buque debe mantener en todo momento una vigilancia visual y auditiva, así como por todos los medios disponibles apropiados a las circunstancias. Vigilancia visual + auditiva + radar + AIS + VHF = obligatoria 24h/24."},
  {q:"¿Qué es la 'visibilidad meteorológica' para las luces de navegación?",opts:["El alcance luminoso máximo de un faro","La distancia a la que las luces de navegación deben ser visibles según el COLREG","El alcance del radar en condiciones normales","La distancia de un radar meteorológico"],correct:1,expl:"COLREG Regla 22: las luces de navegación deben ser visibles a un alcance mínimo definido por el tamaño del buque. Ej: buque > 50m = luz de tope visible a 6 millas. Estas distancias se calculan para una visibilidad meteorológica de 10 millas."},
  {q:"¿Qué es el 'rumbo sobre el fondo' (Course Over Ground - COG)?",opts:["El rumbo de aguja leído en la brújula","La dirección real del desplazamiento del buque sobre el fondo, incluyendo corriente y viento","El rumbo verdadero calculado desde el norte geográfico","El rumbo magnético tras corrección de declinación"],correct:1,expl:"COG (Course Over Ground) = dirección real del desplazamiento del buque respecto al fondo marino. Incluye los efectos de la corriente y el viento. Diferente del rumbo verdadero (dirección hacia donde apunta el buque). Proporcionado por el GPS."},
  {q:"¿Por qué son necesarias las tablas náuticas (almanaque) para la navegación astronómica?",opts:["Solo para calcular las mareas","Para dar las posiciones de los astros (declinación, ángulo horario) en cada momento, necesarias para el cálculo Marcq-St-Hilaire","Para calcular las distancias entre puertos","Para corregir los errores del compás magnético"],correct:1,expl:"El Almanaque Náutico da para cada día/hora: la declinación (Dec) y el Ángulo Horario de Greenwich (AHGr) de cada astro. Estos datos son indispensables para calcular la altura calculada (Hc) mediante el método Marcq-St-Hilaire."},
  ],
  pt:[
  {q:"Fórmula de navegação estimada — o que significa D = V × T?",opts:["Distância = Velocidade × Tempo (em milhas, nós, horas)","Direção = Vetor × Tempo","Deriva = Vento × Turbulência","Declinação = Variação × Tempo"],correct:0,expl:"D=V×T é a fórmula fundamental da estima. D (milhas náuticas) = V (nós) × T (horas). Exemplo: 12 kn × 3 h = 36 mn. É o método de reserva se o GPS falhar."},
  {q:"O que é a estima (Dead Reckoning)?",opts:["Navegação apenas por sextante","Cálculo da posição estimada a partir da última posição conhecida + rumo + velocidade + tempo","Navegação apenas por boias de canal","Cálculo da profundidade por sonda"],correct:1,expl:"Dead Reckoning = cálculo da posição estimada: última posição conhecida + rumo seguido + velocidade × tempo. Quanto mais tempo decorrido desde a última posição conhecida, mais se acumula o erro."},
  {q:"O que é um 'triângulo de erro' na navegação por marcações?",opts:["Uma figura geométrica decorativa nas cartas","O triângulo formado por 3 retas de posição quando as 3 marcações não se cruzam no mesmo ponto","Um método de cálculo astronómico","O espaço entre 3 boias cardeais"],correct:1,expl:"Ao tomar 3 marcações sobre 3 marcas, as 3 retas deveriam cruzar-se num único ponto. Na prática, formam um pequeno triângulo (triângulo de erro). A posição estimada está no centro do triângulo."},
  {q:"Qual é a precisão típica do GPS civil?",opts:["±100 metros","±3 a 10 metros","±50 centímetros","±1 quilómetro"],correct:1,expl:"O GPS civil oferece uma precisão de ±3 a 10 metros. O DGPS (GPS Diferencial, usado no porto) permite <1 metro. O GPS militar pode atingir ±0,5 metro. O sinal GPS pode ser perturbado (jamming) ou falsificado (spoofing)."},
  {q:"O que é o 'crepúsculo náutico' (nautical twilight)?",opts:["O período quando o sol está a 6° abaixo do horizonte — visibilidade perfeita para o sextante","O momento do pôr do sol no mar","O período noturno entre a meia-noite e as 3 da manhã","A visibilidade reduzida pelo nevoeiro"],correct:0,expl:"Crepúsculo náutico = sol entre 6° e 12° abaixo do horizonte. É o momento ideal para a observação com sextante porque se pode ver AO MESMO TEMPO as estrelas E o horizonte. Dura cerca de 20-40 minutos conforme a latitude."},
  {q:"O que é o GMDSS?",opts:["Global Maritime Digital Surveillance System — vigilância de navios","Global Maritime Distress Safety System — comunicações de socorro","GPS Marine Distance Speed System","General Maritime Distance Search System"],correct:1,expl:"GMDSS = Global Maritime Distress Safety System. Sistema mundial de comunicações de socorro: DSC (chamada seletiva digital canal 70), EPIRB (baliza de socorro), SART (transponder de radar de busca e salvamento), VHF/MF/HF. Obrigatório SOLAS em navios > 300 TB."},
  {q:"O VDR (Voyage Data Recorder) é frequentemente comparado a:",opts:["O GPS do navio","A caixa negra dos aviões — regista os dados de navegação","O diário de bordo eletrónico","O sistema AIS do navio"],correct:1,expl:"VDR = Voyage Data Recorder. Como a caixa negra dos aviões: regista continuamente posição, rumo, velocidade, ordens de leme, comunicações rádio, alarmes e dados de radar. Obrigatório SOLAS em navios > 3000 TB. Duração de registo: mínimo 12 horas."},
  {q:"Qual é a diferença entre AIS Classe A e AIS Classe B?",opts:["Classe A = satélite · Classe B = rádio terrestre","Classe A (navios comerciais SOLAS) · Classe B (recreio, navios pequenos) — potência e frequência de transmissão diferentes","Classe A = emissão · Classe B = apenas receção","Classe A = VHF · Classe B = HF"],correct:1,expl:"AIS Classe A: obrigatório SOLAS em navios > 300 TB. Transmite a cada 2-10 segundos. Dados: nome, MMSI, rumo, velocidade, posição, destino, calado. AIS Classe B: opcional para recreio/navios pequenos. Transmite a cada 30 segundos."},
  {q:"O que é a 'altura calculada' (Hc) na navegação astronómica?",opts:["A altura do mastro do navio","O ângulo calculado teoricamente de um astro a partir de uma posição assumida, para comparar com a altura observada","A altura das ondas no mar","A altura do sextante acima do convés"],correct:1,expl:"Hc (Altura calculada) = altura teórica do astro calculada pelas tábuas náuticas (ou efemérides) a partir de uma posição assumida. A diferença (Hc - Ho) = intercepto. Se Ho > Hc: mais perto do astro → avança-se. Se Ho < Hc: recua-se."},
  {q:"Que planeta é mais útil para a navegação astronómica e porquê?",opts:["Marte — planeta vermelho facilmente reconhecível","Vénus — frequentemente o mais brilhante do céu, visível mesmo em meia-claridade","Júpiter — o maior planeta","Saturno — os seus anéis tornam-no único"],correct:1,expl:"Vénus é frequentemente a estrela mais brilhante da noite/manhã, visível mesmo quando o horizonte ainda não está perfeitamente nítido. O seu brilho excecional permite localizá-lo facilmente. Júpiter também é muito usado por ser muito brilhante. Marte, menos."},
  {q:"O que é uma 'reta de altura' (position line) na astronavegação?",opts:["Uma linha na carta que indica a profundidade","A linha geográfica na qual se encontra o navio — calculada a partir da observação de um astro","Uma linha de sonda batimétrica","A trajetória de uma estrela cadente"],correct:1,expl:"Reta de altura = linha de posição calculada a partir da observação de um astro com o sextante. O navio encontra-se algures nessa reta. Com 2 astros observados = 2 retas cuja interseção = ponto astronómico."},
  {q:"Que regra do COLREG diz respeito à vigilância náutica?",opts:["Regra 2 — Responsabilidade geral","Regra 5 — Vigilância permanente por todos os meios disponíveis","Regra 10 — Dispositivos de separação de tráfego","Regra 16 — Manobra do navio que cede a passagem"],correct:1,expl:"COLREG Regra 5: todo navio deve manter em permanência uma vigilância visual e auditiva, bem como por todos os meios disponíveis apropriados às circunstâncias. Vigilância visual + auditiva + radar + AIS + VHF = obrigatória 24h/24."},
  {q:"O que é a 'visibilidade meteorológica' para as luzes de navegação?",opts:["O alcance luminoso máximo de um farol","A distância a que as luzes de navegação devem ser visíveis segundo o COLREG","O alcance do radar em condições normais","A distância de um radar meteorológico"],correct:1,expl:"COLREG Regra 22: as luzes de navegação devem ser visíveis a um alcance mínimo definido pelo tamanho do navio. Ex: navio > 50m = luz de topo visível a 6 milhas. Estas distâncias são calculadas para uma visibilidade meteorológica de 10 milhas."},
  {q:"O que é o 'rumo sobre o fundo' (Course Over Ground - COG)?",opts:["O rumo de agulha lido na bússola","A direção real do deslocamento do navio sobre o fundo, incluindo corrente e vento","O rumo verdadeiro calculado a partir do norte geográfico","O rumo magnético após correção de declinação"],correct:1,expl:"COG (Course Over Ground) = direção real do deslocamento do navio em relação ao fundo do mar. Inclui os efeitos da corrente e do vento. Diferente do rumo verdadeiro (direção para onde o navio aponta). Fornecido pelo GPS."},
  {q:"Por que as tábuas náuticas (almanaque) são necessárias para a navegação astronómica?",opts:["Apenas para calcular as marés","Para dar as posições dos astros (declinação, ângulo horário) a cada momento, necessárias para o cálculo Marcq-St-Hilaire","Para calcular as distâncias entre portos","Para corrigir os erros do compasso magnético"],correct:1,expl:"O Almanaque Náutico dá para cada dia/hora: a declinação (Dec) e o Ângulo Horário de Greenwich (AHGr) de cada astro. Estes dados são indispensáveis para calcular a altura calculada (Hc) pelo método Marcq-St-Hilaire."},
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
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.purple},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
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
      badge:"📚 Navigation & Cartographie · Leçon 6/8 · ⭐ Premium · 200 XP",
      title:"Navigation Pratique & Astronomique",
      intro:"Naviguer c'est savoir à tout moment répondre à une question simple : Où suis-je ?\n\nCette leçon enseigne les méthodes classiques et modernes pour déterminer et maintenir une position précise — de la formule D=V×T au sextant, en passant par les relèvements et l'ECDIS.",
      p1:"PARTIE 1 — NAVIGATION À L'ESTIME",
      s1t:"Formule D = V × T et accumulation des erreurs",
      s1:"L'estime (Dead Reckoning) = calculer la position depuis :\n• La dernière position connue\n• Le cap suivi\n• La vitesse × le temps écoulé\n\nFORMULE : D = V × T\nD = Distance (milles nautiques)\nV = Vitesse (nœuds)\nT = Temps (heures)\n\nEXEMPLE :\nVitesse 12 kn · Temps 3h → D = 36 mn\nVitesse 8 kn · Temps 2h30 → D = 20 mn\n\nERREURS D'ACCUMULATION :\nChaque heure sans position GPS confirmée\n→ L'erreur d'estime s'accumule\n→ Courant + vent + erreur de cap = dérive\n→ Toujours confirmer par un point GPS ou relèvements\n\nMÉTHODE PRATIQUE :\n→ Pointer la position toutes les heures\n→ Comparer avec le GPS\n→ Corriger si l'écart dépasse 0,1 mn",
      p2:"PARTIE 2 — LES RELÈVEMENTS",
      s2t:"Point par relèvements — droites de position",
      s2:"RELÈVEMENT = angle horizontal entre le nord et la direction vers un amer\n\nPOINT PAR 2 RELÈVEMENTS :\n• Relèvement 1 sur l'amer A → droite tracée\n• Relèvement 2 sur l'amer B → droite tracée\n• Intersection = POSITION DU NAVIRE\n\nPOINT PAR 3 RELÈVEMENTS :\n• 3 droites tracées → elles forment un triangle\n• TRIANGLE D'ERREUR = les 3 droites ne se croisent pas au même point\n• Position = centre du triangle\n• Plus petit le triangle = plus précis\n\nQUALITÉ DU POINT :\nMeilleure précision : angle entre droites proche de 90°\nEviter : amers trop proches en azimut (angle <30°)\n\nBONS AMERS : phares, tours, clochers, caps rocheux",
      p3:"PARTIE 3 — NAVIGATION ASTRONOMIQUE",
      s3t:"Le sextant et la méthode Marcq-St-Hilaire",
      s3:"LE SEXTANT :\nMesure l'angle entre un astre et l'horizon\nPrécision : ±0,1 minute d'arc ≈ 180 mètres\n\nASTRES UTILISÉS :\n☀️ Soleil — le plus utilisé en mer\n🌙 Lune — visible jour et nuit\n⭐ Étoiles — crépuscule nautique (idéal)\n♀️ Vénus — souvent la plus brillante\n\nMÉTHODE MARCQ-ST-HILAIRE :\n1. Mesurer Ho (hauteur observée) avec le sextant\n2. Calculer Hc (hauteur calculée) via tables nautiques\n3. Intercept = Ho - Hc\n4. Tracer la droite de position sur la carte\n5. Répéter avec 2ème astre → intersection = point astro\n\nCRÉPUSCULE NAUTIQUE (moment idéal) :\nSoleil entre 6° et 12° sous l'horizon\nOn voit à la fois les étoiles ET l'horizon\n\nPOURQUOI ENCORE OBLIGATOIRE (STCW) ?\n→ GPS peut tomber en panne (guerre électronique, spoofing)\n→ Examen STCW II/1 inclut la nav. astronomique\n→ Certains armateurs testent encore les officiers",
      p4:"PARTIE 4 — VEILLE NAUTIQUE & ÉQUIPEMENTS",
      s4t:"COLREG Rule 5 · Radar · AIS · ECDIS · VHF",
      s4:"COLREG RULE 5 — VEILLE PERMANENTE :\n'Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means.'\n→ Obligatoire 24h/24 — visuelle, sonore, radar, AIS, VHF\n\nJOURNAL DE BORD :\n• Document LÉGAL — obligation SOLAS\n• Entrées toutes les heures (quart)\n• Contenu : position, cap, vitesse, météo, trafic, événements\n• Conservation minimum : 3 ans",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",
      p6:"⚠️ CAS RÉEL D'ACCIDENT MARITIME",
      p7:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 6",
      sumP:["D=V×T · estime = cap + vitesse + temps depuis position connue","Point par 2 relèvements = intersection de 2 droites de position","Triangle d'erreur = 3 relèvements · position au centre","Sextant = angle astre/horizon · méthode Marcq-St-Hilaire","Crépuscule nautique = moment idéal pour observations sextant","COLREG Rule 5 = veille permanente 24h/24 tous les moyens","RADAR · AIS · ECDIS · VHF · GPS = équipements obligatoires","Costa Concordia = dévier route approuvée = infraction grave"],
      learnedP:["D=V×T · estime = cap + vitesse + temps","Point = 2 relèvements · triangle d'erreur = 3 relèvements","Sextant · Ho · Hc · Intercept · Marcq-St-Hilaire","Crépuscule nautique = idéal pour nav. astronomique","COLREG Rule 5 = veille permanente tous les moyens","RADAR · AIS · ECDIS · VHF · GPS","Costa Concordia = ne jamais dévier route approuvée"],
    },
    en:{
      badge:"📚 Navigation & Cartography · Lesson 6/8 · ⭐ Premium · 200 XP",
      title:"Practical & Astronomical Navigation",
      intro:"Navigation means knowing at all times the answer to a simple question: Where am I?\n\nThis lesson covers classic and modern methods to determine and maintain precise position — from D=V×T to the sextant, bearings and ECDIS.",
      p1:"PART 1 — DEAD RECKONING",s1t:"Formula D = V × T and error accumulation",
      s1:"Dead Reckoning = calculating position from:\n• Last known position\n• Course steered\n• Speed × time elapsed\n\nFORMULA: D = V × T\nD = Distance (nautical miles)\nV = Speed (knots)\nT = Time (hours)\n\nEXAMPLE:\nSpeed 12 kn · Time 3h → D = 36 nm\n\nERROR ACCUMULATION:\nEach hour without confirmed GPS position\n→ DR error accumulates\n→ Current + wind + course error = drift\n→ Always confirm with GPS or bearings",
      p2:"PART 2 — BEARINGS",s2t:"Position fix by bearings — position lines",
      s2:"BEARING = horizontal angle between north and direction to a landmark\n\nFIX BY 2 BEARINGS:\n• Bearing 1 on landmark A → line drawn\n• Bearing 2 on landmark B → line drawn\n• Intersection = VESSEL POSITION\n\nFIX BY 3 BEARINGS:\n• 3 lines drawn → form a triangle\n• TRIANGLE OF ERROR = 3 lines don't meet at same point\n• Position = center of triangle\n\nBEST ACCURACY: angle between lines close to 90°",
      p3:"PART 3 — ASTRONOMICAL NAVIGATION",s3t:"The sextant and Marcq-St-Hilaire method",
      s3:"THE SEXTANT:\nMeasures angle between celestial body and horizon\nAccuracy: ±0.1 arcminute ≈ 180 meters\n\nCELESTIAL BODIES:\n☀️ Sun — most used at sea\n🌙 Moon — visible day and night\n⭐ Stars — nautical twilight (ideal)\n♀️ Venus — often the brightest\n\nMARCQ-ST-HILAIRE METHOD:\n1. Measure Ho (observed height) with sextant\n2. Calculate Hc (calculated height) via tables\n3. Intercept = Ho - Hc\n4. Plot position line on chart\n5. Repeat with 2nd body → intersection = astro fix\n\nWHY STILL MANDATORY (STCW)?\n→ GPS can fail (jamming, spoofing)\n→ STCW II/1 exam includes astronomical navigation",
      p4:"PART 4 — WATCH KEEPING & EQUIPMENT",s4t:"COLREG Rule 5 · Radar · AIS · ECDIS · VHF",
      s4:"COLREG RULE 5 — PERMANENT WATCH:\n'Every vessel shall at all times maintain a proper look-out.'\n→ Mandatory 24/7 — visual, sound, radar, AIS, VHF\n\nLOG BOOK:\n• LEGAL document — SOLAS obligation\n• Entries every hour (watch)\n• Content: position, course, speed, weather, events\n• Retention: minimum 3 years",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL MARITIME ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LESSON 6",
      sumP:["D=V×T · DR = course + speed + time from known position","Fix by 2 bearings = intersection of 2 position lines","Triangle of error = 3 bearings · position at center","Sextant = body/horizon angle · Marcq-St-Hilaire method","Nautical twilight = ideal time for sextant observations","COLREG Rule 5 = permanent watch 24/7 all means","RADAR · AIS · ECDIS · VHF · GPS = mandatory equipment","Costa Concordia = deviating from approved route = serious offence"],
      learnedP:["D=V×T · DR = course + speed + time","Fix = 2 bearings · triangle of error = 3 bearings","Sextant · Ho · Hc · Intercept · Marcq-St-Hilaire","Nautical twilight = ideal for astronomical nav.","COLREG Rule 5 = permanent watch all means","Costa Concordia = never deviate from approved route"],
    },
    es:{
      badge:"📚 Navegación & Cartografía · Lección 6/8 · ⭐ Premium · 200 XP",
      title:"Navegación Práctica & Astronómica",
      intro:"Navegar significa saber en todo momento la respuesta a una pregunta simple: ¿Dónde estoy?\n\nEsta lección enseña los métodos clásicos y modernos para determinar y mantener una posición precisa.",
      p1:"PARTE 1 — NAVEGACIÓN DE ESTIMA",s1t:"Fórmula D = V × T y acumulación de errores",
      s1:"Estima (Dead Reckoning) = calcular la posición desde:\n• Última posición conocida · Rumbo · Velocidad × tiempo\n\nFÓRMULA: D = V × T\nVelocidad 12 nudos · Tiempo 3h → D = 36 mn\n\nERROR DE ACUMULACIÓN:\nCada hora sin posición GPS confirmada → el error se acumula\n→ Siempre confirmar con GPS o marcaciones",
      p2:"PARTE 2 — MARCACIONES",s2t:"Punto por marcaciones — líneas de posición",
      s2:"MARCACIÓN = ángulo horizontal entre el norte y la dirección hacia un amer\n\nPUNTO POR 2 MARCACIONES:\n• Marcación 1 sobre amer A → línea trazada\n• Marcación 2 sobre amer B → línea trazada\n• Intersección = POSICIÓN DEL BUQUE\n\nTRIÁNGULO DE ERROR (3 marcaciones):\n• Posición = centro del triángulo\n\nMEJOR PRECISIÓN: ángulo entre líneas próximo a 90°",
      p3:"PARTE 3 — NAVEGACIÓN ASTRONÓMICA",s3t:"El sextante y el método Marcq-St-Hilaire",
      s3:"EL SEXTANTE:\nMide el ángulo entre un astro y el horizonte\nPrecisión: ±0,1 minuto de arco ≈ 180 metros\n\nASTROS UTILIZADOS:\n☀️ Sol · 🌙 Luna · ⭐ Estrellas · ♀️ Venus\n\nMÉTODO MARCQ-ST-HILAIRE:\n1. Medir Ho con el sextante\n2. Calcular Hc (tablas náuticas)\n3. Intercept = Ho - Hc\n4. Trazar la línea de posición\n5. 2 astros = punto astronómico\n\n¿POR QUÉ OBLIGATORIO (STCW)?\n→ El GPS puede fallar (jamming, spoofing)\n→ Examen STCW II/1 incluye nav. astronómica",
      p4:"PARTE 4 — GUARDIA NÁUTICA Y EQUIPOS",s4t:"COLREG Regla 5 · Radar · AIS · ECDIS · VHF",
      s4:"COLREG REGLA 5 — GUARDIA PERMANENTE:\n→ Obligatoria 24/7 — visual, sonora, radar, AIS, VHF\n\nCUADERNO DE BITÁCORA:\n• Documento LEGAL — obligación SOLAS\n• Anotaciones cada hora (guardia)\n• Conservación mínima: 3 años",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL DE ACCIDENTE MARÍTIMO",p7:"📝 BANCO DE PREGUNTAS — 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 6",
      sumP:["D=V×T · Estima = rumbo + velocidad + tiempo","Punto = 2 marcaciones · triángulo de error = 3","Sextante = ángulo astro/horizonte · Marcq-St-Hilaire","Crepúsculo náutico = momento ideal observaciones","COLREG Regla 5 = guardia permanente 24/7","RADAR · AIS · ECDIS · VHF · GPS obligatorios","Costa Concordia = nunca desviarse de la ruta aprobada"],
      learnedP:["D=V×T · Estima","Punto 2 marcaciones · triángulo error","Sextante · Marcq-St-Hilaire · crepúsculo","COLREG Regla 5 · RADAR · AIS · ECDIS","Costa Concordia = no desviarse"],
    },
    pt:{
      badge:"📚 Navegação & Cartografia · Lição 6/8 · ⭐ Premium · 200 XP",
      title:"Navegação Prática & Astronómica",
      intro:"Navegar significa saber a todo momento a resposta a uma simples pergunta: Onde estou?\n\nEsta lição ensina os métodos clássicos e modernos para determinar e manter uma posição precisa.",
      p1:"PARTE 1 — NAVEGAÇÃO POR ESTIMA",s1t:"Fórmula D = V × T e acumulação de erros",
      s1:"Estima (Dead Reckoning) = calcular a posição desde:\n• Última posição conhecida · Rumo · Velocidade × tempo\n\nFÓRMULA: D = V × T\nVelocidade 12 nós · Tempo 3h → D = 36 mn\n\nACUMULAÇÃO DE ERROS:\nCada hora sem posição GPS confirmada → o erro acumula\n→ Sempre confirmar com GPS ou marcações",
      p2:"PARTE 2 — MARCAÇÕES",s2t:"Posição por marcações — linhas de posição",
      s2:"MARCAÇÃO = ângulo horizontal entre o norte e a direção para um amer\n\nPOSIÇÃO POR 2 MARCAÇÕES:\n• Marcação 1 sobre amer A → linha traçada\n• Marcação 2 sobre amer B → linha traçada\n• Interseção = POSIÇÃO DO NAVIO\n\nTRIÂNGULO DE ERRO (3 marcações):\n• Posição = centro do triângulo\n\nMELHOR PRECISÃO: ângulo entre linhas próximo de 90°",
      p3:"PARTE 3 — NAVEGAÇÃO ASTRONÓMICA",s3t:"O sextante e o método Marcq-St-Hilaire",
      s3:"O SEXTANTE:\nMede o ângulo entre um astro e o horizonte\nPrecisão: ±0,1 minuto de arco ≈ 180 metros\n\nASTROS UTILIZADOS:\n☀️ Sol · 🌙 Lua · ⭐ Estrelas · ♀️ Vénus\n\nMÉTODO MARCQ-ST-HILAIRE:\n1. Medir Ho com o sextante\n2. Calcular Hc (tabelas náuticas)\n3. Intercept = Ho - Hc\n4. Traçar a linha de posição\n5. 2 astros = ponto astronómico\n\nPORQUÊ OBRIGATÓRIO (STCW)?\n→ GPS pode falhar (jamming, spoofing)\n→ Exame STCW II/1 inclui nav. astronómica",
      p4:"PARTE 4 — VIGIA NÁUTICA E EQUIPAMENTOS",s4t:"COLREG Regra 5 · Radar · AIS · ECDIS · VHF",
      s4:"COLREG REGRA 5 — VIGIA PERMANENTE:\n→ Obrigatória 24/7 — visual, sonora, radar, AIS, VHF\n\nDIÁRIO DE BORDO:\n• Documento LEGAL — obrigação SOLAS\n• Entradas a cada hora (quarto)\n• Conservação mínima: 3 anos",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL DE ACIDENTE MARÍTIMO",p7:"📝 BANCO DE QUESTÕES — 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 6",
      sumP:["D=V×T · Estima = rumo + velocidade + tempo","Posição = 2 marcações · triângulo erro = 3","Sextante = ângulo astro/horizonte · Marcq-St-Hilaire","Crepúsculo náutico = momento ideal observações","COLREG Regra 5 = vigia permanente 24/7","RADAR · AIS · ECDIS · VHF · GPS obrigatórios","Costa Concordia = nunca desviar da rota aprovada"],
      learnedP:["D=V×T · Estima","Posição 2 marcações · triângulo erro","Sextante · Marcq-St-Hilaire · crepúsculo","COLREG Regra 5 · RADAR · AIS · ECDIS","Costa Concordia = não desviar"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonNavPratique({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
      {/* TOP BAR */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>Leçon 6/8</div>
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

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            {/* Part 1 — Dead Reckoning */}
            <SL icon="🧭" text={lc.p1}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🧭 {lang==="fr"?"NAVIGATION À L'ESTIME — ANIMÉ":lang==="en"?"DEAD RECKONING — ANIMATED":lang==="es"?"ESTIMA — ANIMADO":"ESTIMA — ANIMADO"}</div><DeadReckoningSVG lang={lang}/></Card>

            {/* Part 2 — Bearings */}
            <SL icon="📐" text={lc.p2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📐</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📐 {lang==="fr"?"POINT PAR RELÈVEMENTS — INTERACTIF":lang==="en"?"POSITION FIX BY BEARINGS — INTERACTIVE":lang==="es"?"PUNTO POR MARCACIONES — INTERACTIVO":"POSIÇÃO POR MARCAÇÕES — INTERATIVO"}</div><BearingsSVG lang={lang}/></Card>

            {/* Part 3 — Astro */}
            <SL icon="🌟" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌟</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`,background:"linear-gradient(135deg,rgba(201,146,42,0.06),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔭 {lang==="fr"?"SEXTANT INTERACTIF":lang==="en"?"INTERACTIVE SEXTANT":lang==="es"?"SEXTANTE INTERACTIVO":"SEXTANTE INTERATIVO"}</div>
              <SextantSVG lang={lang}/>
            </Card>

            {/* Part 4 — Watch keeping */}
            <SL icon="👁️" text={lc.p4}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👁️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>👁️ {lang==="fr"?"ÉQUIPEMENTS DE NAVIGATION — INTERACTIF":lang==="en"?"NAVIGATION EQUIPMENT — INTERACTIVE":lang==="es"?"EQUIPOS DE NAVEGACIÓN — INTERACTIVO":"EQUIPAMENTOS DE NAVEGAÇÃO — INTERATIVO"}</div><WatchKeepingSVG lang={lang}/></Card>

            {/* Exercise */}
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            {/* Accident */}
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            {/* Bank */}
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            {/* Summary */}
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
                {lang==="fr"?"Quiz — Navigation Pratique & Astro":lang==="en"?"Quiz — Practical & Astro Nav":lang==="es"?"Quiz — Navegación Práctica & Astro":"Quiz — Navegação Prática & Astro"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 6":lang==="en"?"questions · Lesson 6":lang==="es"?"preguntas · Lección 6":"perguntas · Lição 6"}</div>
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
              {lang==="fr"?"LEÇON 7 — LES MARÉES →":lang==="en"?"LESSON 7 — TIDES →":lang==="es"?"LECCIÓN 7 — LAS MAREAS →":"LIÇÃO 7 — AS MARÉS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
