import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f", cyan:"#00bcd4",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e6 — Cargaison & Pétrole", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e6 — Cargo & Oil", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// STARS BACKGROUND
// ══════════════════════════════════════
function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:42,cy:80,r:0.9},{cx:310,cy:45,r:1.2},{cx:180,cy:120,r:0.7},{cx:350,cy:200,r:1.0},{cx:60,cy:320,r:0.8},{cx:280,cy:380,r:1.1},{cx:130,cy:500,r:0.9},{cx:320,cy:600,r:0.7},{cx:70,cy:680,r:1.3},{cx:200,cy:750,r:0.8},{cx:360,cy:780,r:1.0},{cx:90,cy:820,r:0.6},{cx:240,cy:180,r:0.9},{cx:160,cy:440,r:0.7}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#e8b94f" opacity={0.3+Math.sin(i)*0.2}/>
      ))}
    </svg>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{background:"rgba(13,31,60,0.85)",border:`1px solid ${C.border}`,borderRadius:18,padding:"14px 14px",backdropFilter:"blur(8px)",...style}}>
      {children}
    </div>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:36,height:36,borderRadius:12,background:`${color}18`,border:`1px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:700,color,letterSpacing:1.5,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 1 — BALLAST TANK FILL/DRAIN
// ══════════════════════════════════════
function BallastTankSVG({ lang }) {
  const [level, setLevel] = useState(0);
  const [pumping, setPumping] = useState(null); // "fill" | "drain" | null
  const [valve, setValve] = useState(true);

  useEffect(() => {
    if (!pumping) return;
    const id = setInterval(() => {
      setLevel(v => {
        const next = pumping === "fill" ? Math.min(100, v + 2) : Math.max(0, v - 2);
        if (next === 0 || next === 100) setPumping(null);
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [pumping]);

  const W = 290, H = 190;
  const tankX = 60, tankY = 40, tankW = 170, tankH = 110;
  const fillH = (level / 100) * tankH;
  const fillY = tankY + tankH - fillH;
  const waterColor = level > 80 ? C.blue : level > 40 ? C.blue2 : C.cyan;
  const stability = level < 20 ? "low" : level < 70 ? "ok" : "high";
  const sc = stability === "ok" ? C.green : stability === "low" ? C.orange : C.blue2;

  const lbl = (fr, en, es, pt) => lang === "fr" ? fr : lang === "en" ? en : lang === "es" ? es : pt;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Tank outline */}
        <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="6"
          fill="rgba(13,31,60,0.6)" stroke={C.steel} strokeWidth="2"/>
        {/* Water fill */}
        {level > 0 && (
          <rect x={tankX+2} y={fillY} width={tankW-4} height={fillH} rx="4"
            fill={waterColor} opacity="0.55"/>
        )}
        {/* Water surface wave */}
        {level > 0 && level < 100 && (
          <path d={`M${tankX+2},${fillY} Q${tankX+tankW/3},${fillY-3} ${tankX+tankW/2},${fillY} Q${tankX+2*tankW/3},${fillY+3} ${tankX+tankW-2},${fillY}`}
            fill="none" stroke={C.blue2} strokeWidth="1.5" opacity="0.7"/>
        )}
        {/* Frame ribs */}
        {[0.25,0.5,0.75].map((r,i) => (
          <line key={i} x1={tankX+tankW*r} y1={tankY} x2={tankX+tankW*r} y2={tankY+tankH}
            stroke={C.steel} strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
        ))}
        {/* Level marks */}
        {[25,50,75,100].map((m,i) => {
          const my = tankY + tankH - (m/100)*tankH;
          return (
            <g key={i}>
              <line x1={tankX+tankW} y1={my} x2={tankX+tankW+8} y2={my} stroke={C.muted} strokeWidth="0.8"/>
              <text x={tankX+tankW+11} y={my+3} fontSize="7" fill={C.muted}>{m}%</text>
            </g>
          );
        })}
        {/* Pipes */}
        {/* Inlet pipe (top) */}
        <rect x={tankX+tankW/2-5} y={tankY-18} width={10} height={20} fill={C.steel} opacity="0.7"/>
        <text x={tankX+tankW/2} y={tankY-22} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("Arrivée","Inlet","Entrada","Entrada")}
        </text>
        {/* Outlet pipe (bottom) */}
        <rect x={tankX+20} y={tankY+tankH} width={10} height={18} fill={C.steel} opacity="0.7"/>
        {/* Pump */}
        <circle cx={tankX-25} cy={tankY+tankH/2} r={14} fill="rgba(26,111,212,0.3)" stroke={C.blue2} strokeWidth="1.5"/>
        <text x={tankX-25} y={tankY+tankH/2+4} textAnchor="middle" fontSize="7" fill={C.blue2} fontWeight="700">
          {lbl("POMPE","PUMP","BOMBA","BOMBA")}
        </text>
        {/* Pump to tank pipe */}
        <line x1={tankX-11} y1={tankY+tankH/2} x2={tankX} y2={tankY+tankH/2}
          stroke={pumping==="fill"?C.blue2:C.steel} strokeWidth="2"
          strokeDasharray={pumping==="fill"?"6,3":"none"}/>
        {/* Valve */}
        <circle cx={tankX+tankW+35} cy={tankY+tankH/2} r={10} fill={valve?"rgba(30,138,74,0.3)":"rgba(192,57,43,0.3)"}
          stroke={valve?C.green:C.red} strokeWidth="1.5" style={{cursor:"pointer"}} onClick={()=>setValve(v=>!v)}/>
        <text x={tankX+tankW+35} y={tankY+tankH/2-14} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lbl("Vanne","Valve","Válvula","Válvula")}
        </text>
        <text x={tankX+tankW+35} y={tankY+tankH/2+4} textAnchor="middle" fontSize="7" fill={valve?C.green:C.red} fontWeight="700">
          {valve?(lbl("O","O","A","A")):(lbl("F","C","C","F"))}
        </text>
        {/* Level indicator */}
        <rect x={8} y={tankY} width={44} height={28} rx="5" fill="rgba(0,0,0,0.6)" stroke={sc} strokeWidth="0.8"/>
        <text x={30} y={tankY+11} textAnchor="middle" fontSize="7" fill={sc} fontWeight="700">
          {lbl("Niveau","Level","Nivel","Nível")}
        </text>
        <text x={30} y={tankY+23} textAnchor="middle" fontSize="9" fill={sc} fontWeight="700">
          {level}%
        </text>
        {/* Ship silhouette hint */}
        <text x={W/2} y={H-6} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("⚓ Citerne de ballast — tanker pétrolier","⚓ Ballast tank — oil tanker","⚓ Tanque de lastre — buque petrolero","⚓ Tanque de lastro — navio petroleiro")}
        </text>
      </svg>
      {/* Controls */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
        <button onClick={()=>{if(valve)setPumping("fill")}}
          style={{padding:"8px 4px",borderRadius:10,background:pumping==="fill"?"rgba(26,111,212,0.4)":"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}55`,color:C.blue2,fontSize:10,fontWeight:700,cursor:"pointer"}}>
          {pumping==="fill"?"⏳":lbl("▼ REMPLIR","▼ FILL","▼ LLENAR","▼ ENCHER")}
        </button>
        <button onClick={()=>setPumping(null)}
          style={{padding:"8px 4px",borderRadius:10,background:"rgba(69,90,100,0.2)",border:`1px solid ${C.steel}55`,color:C.muted,fontSize:10,fontWeight:700,cursor:"pointer"}}>
          ⏸ {lbl("STOP","STOP","PARAR","PARAR")}
        </button>
        <button onClick={()=>{if(valve)setPumping("drain")}}
          style={{padding:"8px 4px",borderRadius:10,background:pumping==="drain"?"rgba(192,57,43,0.4)":"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,color:C.red,fontSize:10,fontWeight:700,cursor:"pointer"}}>
          {pumping==="drain"?"⏳":lbl("▲ VIDER","▲ DRAIN","▲ VACIAR","▲ ESVAZIAR")}
        </button>
      </div>
      {!valve && (
        <div style={{marginTop:6,padding:"6px 10px",borderRadius:8,background:"rgba(192,57,43,0.12)",border:`1px solid ${C.red}44`,fontSize:10,color:C.red,textAlign:"center"}}>
          ⚠️ {lbl("Vanne fermée — ouvrir avant pompage","Valve closed — open before pumping","Válvula cerrada — abrir antes de bombear","Válvula fechada — abrir antes de bombear")}
        </div>
      )}
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:10,color:sc,textAlign:"center"}}>
        {level < 20
          ? lbl("⚡ Ballast insuffisant — GM affecté, surveiller stabilité","⚡ Insufficient ballast — GM affected, monitor stability","⚡ Lastre insuficiente — GM afectado, vigilar estabilidad","⚡ Lastro insuficiente — GM afetado, monitorar estabilidade")
          : level < 70
          ? lbl("✅ Niveau nominal — stabilité optimale","✅ Nominal level — optimal stability","✅ Nivel nominal — estabilidad óptima","✅ Nível nominal — estabilidade ótima")
          : lbl("🔵 Ballast maximum — tirant d'eau élevé","🔵 Maximum ballast — high draft","🔵 Lastre máximo — calado alto","🔵 Lastro máximo — calado elevado")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — GM vs BALLAST CURVE
// ══════════════════════════════════════
function GMBallastSVG({ lang }) {
  const [ballast, setBallast] = useState(50);
  const [cargo, setCargo] = useState(60);

  // GM calculation: ballast raises GM, cargo (if high) lowers it
  const gm = Math.max(-0.5, (ballast / 100) * 2.5 - (cargo / 100) * 0.8 + 0.2).toFixed(2);
  const gmVal = parseFloat(gm);
  const sc = gmVal > 0.5 ? C.green : gmVal > 0.15 ? C.orange : C.red;
  const W = 290, H = 170;

  // Curve points: GM as function of ballast (0→100)
  const curve = Array.from({length:11}, (_,i) => {
    const b = i * 10;
    const g = Math.max(-0.5, (b/100)*2.5 - (cargo/100)*0.8 + 0.2);
    const x = 40 + (b / 100) * 200;
    const y = 130 - (g + 0.5) * 50;
    return {x, y, b, g};
  });
  const pathD = curve.map((p,i) => `${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Current point
  const cx = 40 + (ballast / 100) * 200;
  const cy = 130 - (gmVal + 0.5) * 50;

  const lbl = (fr, en, es, pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="140" stroke={C.steel} strokeWidth="1.5"/>
        <line x1="40" y1="140" x2="250" y2="140" stroke={C.steel} strokeWidth="1.5"/>
        {/* GM=0 danger line */}
        <line x1="40" y1="105" x2="250" y2="105" stroke={C.red} strokeWidth="1" strokeDasharray="4,3" opacity="0.7"/>
        <text x="252" y="108" fontSize="7" fill={C.red}>GM=0</text>
        {/* GM labels */}
        {[-0.5,0,0.5,1.0,1.5,2.0].map((v,i) => {
          const y = 130 - (v + 0.5) * 50;
          return (
            <g key={i}>
              <line x1="36" y1={y} x2="40" y2={y} stroke={C.steel} strokeWidth="0.8"/>
              <text x="32" y={y+3} textAnchor="end" fontSize="7" fill={C.muted}>{v}</text>
            </g>
          );
        })}
        {/* Ballast labels */}
        {[0,25,50,75,100].map((b,i) => {
          const x = 40 + (b/100)*200;
          return (
            <g key={i}>
              <line x1={x} y1="140" x2={x} y2="144" stroke={C.steel} strokeWidth="0.8"/>
              <text x={x} y="152" textAnchor="middle" fontSize="7" fill={C.muted}>{b}%</text>
            </g>
          );
        })}
        {/* Axis labels */}
        <text x="145" y="165" textAnchor="middle" fontSize="8" fill={C.muted}>
          {lbl("Ballast (%)","Ballast (%)","Lastre (%)","Lastro (%)")}
        </text>
        <text x="14" y="80" textAnchor="middle" fontSize="8" fill={C.muted} transform="rotate(-90,14,80)">GM (m)</text>
        {/* Green zone */}
        <rect x="40" y="20" width="210" height={85} fill="rgba(30,138,74,0.06)" rx="2"/>
        <text x="245" y="55" textAnchor="end" fontSize="7" fill={C.green} opacity="0.6">
          {lbl("Zone stable","Safe zone","Zona estable","Zona estável")}
        </text>
        {/* Red zone */}
        <rect x="40" y="105" width="210" height={35} fill="rgba(192,57,43,0.08)" rx="2"/>
        <text x="245" y="125" textAnchor="end" fontSize="7" fill={C.red} opacity="0.7">
          {lbl("Danger","Danger","Peligro","Perigo")}
        </text>
        {/* GM curve */}
        <path d={pathD} fill="none" stroke={C.blue2} strokeWidth="2" strokeLinejoin="round"/>
        {/* Current point */}
        <circle cx={cx} cy={Math.max(22, Math.min(138, cy))} r="6" fill={sc} opacity="0.9"/>
        <circle cx={cx} cy={Math.max(22, Math.min(138, cy))} r="10" fill="none" stroke={sc} strokeWidth="1" opacity="0.4"/>
        {/* GM readout */}
        <rect x="160" y="8" width="82" height="28" rx="5" fill="rgba(0,0,0,0.7)" stroke={sc} strokeWidth="0.8"/>
        <text x="201" y="20" textAnchor="middle" fontSize="7" fill={sc} fontWeight="700">GM = {gm}m</text>
        <text x="201" y="30" textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {gmVal > 0.5 ? lbl("✅ Stable","✅ Stable","✅ Estable","✅ Estável") : gmVal > 0.15 ? lbl("⚡ Limite","⚡ Marginal","⚡ Límite","⚡ Limite") : lbl("⚠️ DANGER","⚠️ DANGER","⚠️ PELIGRO","⚠️ PERIGO")}
        </text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[
          {label:`${lbl("Ballast","Ballast","Lastre","Lastro")}: ${ballast}%`,val:ballast,set:setBallast,c:C.blue2},
          {label:`${lbl("Cargaison","Cargo","Carga","Carga")}: ${cargo}%`,val:cargo,set:setCargo,c:C.orange},
        ].map((s,i) => (
          <div key={i}>
            <div style={{fontSize:9,color:s.c,marginBottom:3,fontWeight:600,textAlign:"center"}}>{s.label}</div>
            <input type="range" min={0} max={100} step={1} value={s.val}
              onChange={e=>s.set(Number(e.target.value))} style={{width:"100%",accentColor:s.c}}/>
          </div>
        ))}
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:10,color:sc,textAlign:"center"}}>
        {gmVal > 0.5
          ? lbl("✅ GM suffisant — navire stable en toute condition","✅ Adequate GM — vessel stable in all conditions","✅ GM suficiente — buque estable en todas condiciones","✅ GM suficiente — navio estável em todas condições")
          : gmVal > 0.15
          ? lbl("⚡ GM limite — augmenter le ballast prudemment","⚡ Marginal GM — increase ballast carefully","⚡ GM límite — aumentar lastre con cuidado","⚡ GM limite — aumentar lastro com cuidado")
          : lbl("⚠️ GM négatif — RISQUE CHAVIRAGE ! Pomper ballast immédiatement","⚠️ Negative GM — CAPSIZING RISK! Pump ballast immediately","⚠️ GM negativo — ¡RIESGO VUELCO! Bombear lastre inmediatamente","⚠️ GM negativo — RISCO CAPOTAMENTO! Bombear lastro imediatamente")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — BWMS TREATMENT FLOW
// ══════════════════════════════════════
function BWMSSVG({ lang }) {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState("uv"); // "uv" | "electro" | "chemical"

  const W = 290, H = 175;
  const lbl = (fr, en, es, pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const steps = [
    { icon:"🌊", fr:"Prise d'eau de mer", en:"Seawater intake", es:"Toma de agua de mar", pt:"Tomada de água do mar" },
    { icon:"🔍", fr:"Filtre (50µm)", en:"Filter (50µm)", es:"Filtro (50µm)", pt:"Filtro (50µm)" },
    { icon:"⚗️", fr:"Traitement BWMS", en:"BWMS Treatment", es:"Tratamiento BWMS", pt:"Tratamento BWMS" },
    { icon:"🛢️", fr:"Citerne ballast", en:"Ballast tank", es:"Tanque de lastre", pt:"Tanque de lastro" },
    { icon:"🚢", fr:"Déballastage port", en:"Deballasting port", es:"Deslastramiento puerto", pt:"Deslastreamento porto" },
  ];

  const colors = [C.blue2, C.cyan, C.teal, C.blue, C.green];

  const treatmentInfo = {
    uv: { fr:"UV — Irradiation ultraviolette\nTue 99,9% des organismes\nSans produits chimiques", en:"UV — Ultraviolet irradiation\nKills 99.9% of organisms\nNo chemicals", es:"UV — Irradiación ultravioleta\nElimina 99,9% de organismos\nSin productos químicos", pt:"UV — Irradiação ultravioleta\nElimina 99,9% dos organismos\nSem produtos químicos" },
    electro: { fr:"Électrolyse\nGénère du chlore actif\nEfficace en eau salée", en:"Electrolysis\nGenerates active chlorine\nEffective in salt water", es:"Electrólisis\nGenera cloro activo\nEficaz en agua salada", pt:"Eletrólise\nGera cloro ativo\nEficaz em água salgada" },
    chemical: { fr:"Injection chimique\nBiocides agréés IMO\nNeutralisation requise", en:"Chemical injection\nIMO approved biocides\nNeutralization required", es:"Inyección química\nBiocidas aprobados IMO\nNeutralización necesaria", pt:"Injeção química\nBiocidas aprovados IMO\nNeutralização necessária" },
  };

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Title */}
        <text x={W/2} y={18} textAnchor="middle" fontSize="8" fill={C.teal} fontWeight="700" letterSpacing="1">
          {lbl("BWMS — TRAITEMENT EAU DE BALLAST","BWMS — BALLAST WATER TREATMENT","BWMS — TRATAMIENTO AGUA DE LASTRE","BWMS — TRATAMENTO ÁGUA DE LASTRO")}
        </text>
        {/* Flow nodes */}
        {steps.map((s, i) => {
          const x = 25 + i * 58;
          const y = 80;
          const active = i <= step;
          const col = active ? colors[i] : C.steel;
          return (
            <g key={i} style={{cursor:"pointer"}} onClick={() => setStep(i)}>
              {/* Connector */}
              {i > 0 && (
                <line x1={x-48} y1={y} x2={x-16} y2={y}
                  stroke={i <= step ? colors[i-1] : C.steel} strokeWidth={2}
                  strokeDasharray={i <= step ? "none" : "4,3"}/>
              )}
              {/* Flow arrow */}
              {i > 0 && i <= step && (
                <polygon points={`${x-18},${y-4} ${x-18},${y+4} ${x-12},${y}`} fill={colors[i-1]} opacity="0.8"/>
              )}
              {/* Node circle */}
              <circle cx={x} cy={y} r={14} fill={`${col}22`} stroke={col} strokeWidth={active?2:1}/>
              <text x={x} y={y+4} textAnchor="middle" fontSize="12">{s.icon}</text>
              {/* Label */}
              <text x={x} y={y+25} textAnchor="middle" fontSize="6.5" fill={col} fontWeight={active?"700":"400"}>
                {(lbl(s.fr,s.en,s.es,s.pt)).split(" ").slice(0,2).join(" ")}
              </text>
              {/* Step number */}
              <text x={x} y={y-20} textAnchor="middle" fontSize="7" fill={col} opacity="0.7">{i+1}</text>
            </g>
          );
        })}
        {/* Treatment type display */}
        <rect x="15" y="115" width="260" height="50" rx="8" fill="rgba(10,138,108,0.1)" stroke={`${C.teal}44`} strokeWidth="1"/>
        <text x="145" y="132" textAnchor="middle" fontSize="7.5" fill={C.teal} fontWeight="700">
          {lbl("Méthode sélectionnée :","Selected method:","Método seleccionado:","Método selecionado:")} {treatment.toUpperCase()}
        </text>
        {(lbl(treatmentInfo[treatment].fr, treatmentInfo[treatment].en, treatmentInfo[treatment].es, treatmentInfo[treatment].pt))
          .split("\n").map((line, i) => (
            <text key={i} x="145" y={145+i*10} textAnchor="middle" fontSize="7" fill={C.muted}>{line}</text>
          ))}
      </svg>
      {/* Step + Treatment controls */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
        {["uv","electro","chemical"].map(m => (
          <button key={m} onClick={() => setTreatment(m)}
            style={{padding:"6px 4px",borderRadius:8,background:treatment===m?`${C.teal}33`:"rgba(10,138,108,0.1)",border:`1px solid ${treatment===m?C.teal:C.steel}55`,color:treatment===m?C.teal:C.muted,fontSize:9,fontWeight:700,cursor:"pointer"}}>
            {m==="uv"?"☀️ UV":m==="electro"?"⚡ ELECTRO":"🧪 "+lbl("CHIMIE","CHEM","QUÍM","QUÍM")}
          </button>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6,gap:6}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))}
          style={{flex:1,padding:"7px",borderRadius:8,background:"rgba(69,90,100,0.2)",border:`1px solid ${C.steel}44`,color:C.muted,fontSize:10,cursor:"pointer"}}>
          ← {lbl("Préc.","Prev","Ant.","Ant.")}
        </button>
        <div style={{fontSize:9,color:C.teal,padding:"7px 10px",background:"rgba(10,138,108,0.1)",borderRadius:8,border:`1px solid ${C.teal}33`}}>
          {step+1}/5
        </div>
        <button onClick={()=>setStep(s=>Math.min(4,s+1))}
          style={{flex:1,padding:"7px",borderRadius:8,background:"rgba(10,138,108,0.15)",border:`1px solid ${C.teal}44`,color:C.teal,fontSize:10,cursor:"pointer"}}>
          {lbl("Suiv.","Next","Sig.","Seg.")} →
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — BALLAST PLAN (TANKER SCHEMATIC)
// ══════════════════════════════════════
function BallastPlanSVG({ lang }) {
  const [selected, setSelected] = useState(null);
  const [tankLevels, setTankLevels] = useState({
    fp:0, p1:0, s1:0, p2:0, s2:0, p3:0, s3:0, ap:0
  });

  const lbl = (fr, en, es, pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const tanks = [
    { id:"fp", x:232, y:42, w:40, h:36, label:"FP",
      name:{fr:"Pic avant",en:"Fore peak",es:"Pique de proa",pt:"Pique de vante"} },
    { id:"p1", x:170, y:28, w:55, h:22, label:"P1",
      name:{fr:"Ballast P N°1",en:"Ballast P No.1",es:"Lastre B N°1",pt:"Lastro BB N°1"} },
    { id:"s1", x:170, y:56, w:55, h:22, label:"S1",
      name:{fr:"Ballast S N°1",en:"Ballast S No.1",es:"Lastre Er N°1",pt:"Lastro EB N°1"} },
    { id:"p2", x:105, y:28, w:58, h:22, label:"P2",
      name:{fr:"Ballast P N°2",en:"Ballast P No.2",es:"Lastre B N°2",pt:"Lastro BB N°2"} },
    { id:"s2", x:105, y:56, w:58, h:22, label:"S2",
      name:{fr:"Ballast S N°2",en:"Ballast S No.2",es:"Lastre Er N°2",pt:"Lastro EB N°2"} },
    { id:"p3", x:48, y:28, w:50, h:22, label:"P3",
      name:{fr:"Ballast P N°3",en:"Ballast P No.3",es:"Lastre B N°3",pt:"Lastro BB N°3"} },
    { id:"s3", x:48, y:56, w:50, h:22, label:"S3",
      name:{fr:"Ballast S N°3",en:"Ballast S No.3",es:"Lastre Er N°3",pt:"Lastro EB N°3"} },
    { id:"ap", x:8, y:42, w:34, h:36, label:"AP",
      name:{fr:"Pic arrière",en:"Aft peak",es:"Pique de popa",pt:"Pique de ré"} },
  ];

  const totalFill = Object.values(tankLevels).reduce((a,b)=>a+b,0) / (Object.keys(tankLevels).length * 100) * 100;
  const stability = totalFill > 20 && totalFill < 85 ? "ok" : totalFill <= 20 ? "low" : "high";
  const sc = stability==="ok"?C.green:C.orange;

  const cycleLevel = (id) => {
    setTankLevels(prev => ({...prev, [id]: prev[id] === 0 ? 50 : prev[id] === 50 ? 100 : 0}));
  };

  return (
    <div>
      <svg width={290} height={135} viewBox="0 0 290 135">
        <rect width="290" height="135" fill="#061020" rx="8"/>
        {/* Ship hull outline */}
        <path d="M8,78 L8,42 L242,42 L270,60 L242,78 Z" fill="none" stroke={C.steel} strokeWidth="1.5" opacity="0.5"/>
        {/* Bow */}
        <path d="M242,42 L272,42 L285,60 L272,78 L242,78" fill="rgba(69,90,100,0.2)" stroke={C.steel} strokeWidth="1"/>
        {/* Tank rendering */}
        {tanks.map(t => {
          const lvl = tankLevels[t.id];
          const fillH = (lvl/100) * t.h;
          const col = lvl === 100 ? C.blue : lvl === 50 ? C.blue2 : C.steel;
          const isSel = selected === t.id;
          return (
            <g key={t.id} style={{cursor:"pointer"}} onClick={() => { setSelected(t.id); cycleLevel(t.id); }}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="3"
                fill="rgba(13,31,60,0.6)" stroke={isSel?C.gold:C.steel} strokeWidth={isSel?1.5:1}/>
              {lvl > 0 && (
                <rect x={t.x} y={t.y+t.h-fillH} width={t.w} height={fillH} rx="2"
                  fill={col} opacity="0.5"/>
              )}
              <text x={t.x+t.w/2} y={t.y+t.h/2+3} textAnchor="middle" fontSize="7.5" fill={lvl>0?C.white:C.muted} fontWeight="700">
                {t.label}
              </text>
              <text x={t.x+t.w/2} y={t.y+t.h/2+12} textAnchor="middle" fontSize="6" fill={lvl>0?col:C.steel}>
                {lvl}%
              </text>
            </g>
          );
        })}
        {/* Labels */}
        <text x="145" y="15" textAnchor="middle" fontSize="7.5" fill={C.blue2} fontWeight="700">
          {lbl("PLAN DE BALLASTAGE — PÉTROLIER","BALLAST PLAN — OIL TANKER","PLAN DE LASTRAJE — PETROLERO","PLANO DE LASTRO — PETROLEIRO")}
        </text>
        <text x="8" y="100" fontSize="7" fill={C.muted}>{lbl("Avant →","← Fwd","← Proa","← Vante")}</text>
        <text x="282" y="100" textAnchor="end" fontSize="7" fill={C.muted}>{lbl("← Arrière","Aft →","Popa →","Ré →")}</text>
        {/* Total ballast meter */}
        <rect x="80" y="108" width="130" height="14" rx="4" fill="rgba(0,0,0,0.5)" stroke={sc} strokeWidth="0.8"/>
        <rect x="80" y="108" width={130*(totalFill/100)} height="14" rx="4" fill={sc} opacity="0.4"/>
        <text x="145" y="119" textAnchor="middle" fontSize="7.5" fill={sc} fontWeight="700">
          {lbl("Ballast total","Total ballast","Lastre total","Lastro total")}: {totalFill.toFixed(0)}%
        </text>
      </svg>
      <div style={{marginTop:6,padding:"7px 10px",borderRadius:8,background:"rgba(0,0,0,0.3)",border:`1px solid ${C.border}`,fontSize:9,color:C.gold2,textAlign:"center"}}>
        💡 {lbl("Toucher un tanque pour changer le niveau (0% → 50% → 100%)","Tap a tank to cycle level (0% → 50% → 100%)","Tocar un tanque para cambiar el nivel (0% → 50% → 100%)","Tocar um tanque para mudar o nível (0% → 50% → 100%)")}
      </div>
      {selected && (
        <div style={{marginTop:6,padding:"8px 10px",borderRadius:8,background:`${C.blue2}12`,border:`1px solid ${C.blue2}33`,fontSize:10,color:C.blue2}}>
          📍 <strong>{tanks.find(t=>t.id===selected)?.label}</strong> — {lbl(
            tanks.find(t=>t.id===selected)?.name.fr,
            tanks.find(t=>t.id===selected)?.name.en,
            tanks.find(t=>t.id===selected)?.name.es,
            tanks.find(t=>t.id===selected)?.name.pt,
          )} — {tankLevels[selected]}%
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MV ERIKA (1999)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MT Erika — Golfe de Gascogne (1999)",
      teaser:"Pétrolier · Rupture structurelle · Ballast insuffisant · 20 000 t de fioul · Catastrophe écologique",
      what:"Le 12 décembre 1999, le pétrolier maltais MT Erika se brise en deux dans le Golfe de Gascogne par mer forte, à 70 km des côtes bretonnes. Il transportait 30 000 tonnes de fioul lourd pour Total. La coque, fragilisée par la corrosion et un ballastage inadapté aux conditions de mer, cède sous les contraintes longitudinales. 20 000 tonnes de fioul se déversent en mer. 400 km de côtes sont souillées, 150 000 oiseaux morts. Coût : 200 M€.",
      cause:"• Navire sous-standard (26 ans, double coque absente)\n• Ballast insuffisant en conditions de mer forte → contraintes excessives sur la coque\n• Défaut de maintenance structurelle — corrosion avancée\n• Transfert de classe non signalé — contrôle PSC défaillant\n• Société de classification (RINA) mise en cause\n• Routage météo insuffisant — décision d'entrée en tempête",
      lessons:"✓ Règle MARPOL 13G : élimination accélérée des simples coques\n✓ Directive EU : double coque obligatoire avant 2010\n✓ EMSA (Agence européenne sécurité maritime) créée en 2003\n✓ Directive 2005/35 : responsabilité pénale en cas de pollution\n✓ Plans de ballastage renforcés dans les SMS (ISM)\n✓ Inspections PSC renforcées : liste noire navires sous-standard",
      link:"🔗 Lien L2 Ballast : Un pétrolier en lège (sans cargaison) avec ballast insuffisant développe des contraintes structurelles longitudinales extrêmes. Le ballastage correct est donc une condition de résistance structurelle, pas seulement de stabilité.",
    },
    en:{
      title:"MT Erika — Bay of Biscay (1999)",
      teaser:"Tanker · Structural failure · Insufficient ballast · 20,000 t of fuel oil · Ecological disaster",
      what:"On December 12, 1999, the Maltese tanker MT Erika broke in two in the Bay of Biscay during heavy seas, 70 km off the Breton coast. She was carrying 30,000 tonnes of heavy fuel oil for Total. The hull, weakened by corrosion and inadequate ballasting for sea conditions, failed under longitudinal stress. 20,000 tonnes of fuel oil spilled into the sea. 400 km of coastline was contaminated, 150,000 birds died. Cost: €200 million.",
      cause:"• Sub-standard vessel (26 years old, no double hull)\n• Insufficient ballast in heavy seas → excessive hull stresses\n• Structural maintenance failure — advanced corrosion\n• Undeclared class transfer — failing PSC control\n• Classification society (RINA) implicated\n• Insufficient weather routing — decision to enter storm",
      lessons:"✓ MARPOL 13G rule: accelerated phase-out of single hulls\n✓ EU directive: double hull mandatory before 2010\n✓ EMSA (European Maritime Safety Agency) created in 2003\n✓ Directive 2005/35: criminal liability for pollution\n✓ Enhanced ballasting plans in SMS (ISM)\n✓ Strengthened PSC inspections: blacklist of sub-standard vessels",
      link:"🔗 L2 Ballast Link: A tanker in ballast (no cargo) with insufficient ballast develops extreme longitudinal structural stresses. Proper ballasting is therefore a structural integrity condition, not just a stability one.",
    },
    es:{
      title:"MT Erika — Golfo de Vizcaya (1999)",
      teaser:"Petrolero · Rotura estructural · Lastre insuficiente · 20.000 t de fuel · Catástrofe ecológica",
      what:"El 12 de diciembre de 1999, el petrolero maltés MT Erika se partió en dos en el Golfo de Vizcaya con mar gruesa, a 70 km de la costa bretona. Transportaba 30.000 toneladas de fuel pesado para Total. El casco, debilitado por la corrosión y un lastre inadecuado para las condiciones del mar, cedió bajo los esfuerzos longitudinales. 20.000 toneladas de fuel se derramaron al mar. 400 km de costa contaminados, 150.000 aves muertas.",
      cause:"• Buque subestándar (26 años, sin doble casco)\n• Lastre insuficiente en mar gruesa → esfuerzos excesivos en el casco\n• Falta de mantenimiento estructural — corrosión avanzada\n• Cambio de clase no declarado — control PSC deficiente\n• Sociedad clasificadora (RINA) implicada",
      lessons:"✓ Regla MARPOL 13G: eliminación acelerada de cascos simples\n✓ Directiva UE: doble casco obligatorio antes de 2010\n✓ EMSA creada en 2003\n✓ Directiva 2005/35: responsabilidad penal por contaminación\n✓ Planes de lastraje reforzados en SMS (ISM)",
      link:"🔗 Vínculo L2 Lastre: Un petrolero en lastre con lastre insuficiente desarrolla esfuerzos estructurales longitudinales extremos. El lastraje correcto es condición de integridad estructural, no solo de estabilidad.",
    },
    pt:{
      title:"MT Erika — Golfo da Biscaia (1999)",
      teaser:"Petroleiro · Falha estrutural · Lastro insuficiente · 20.000 t de fuel · Catástrofe ecológica",
      what:"A 12 de dezembro de 1999, o petroleiro maltês MT Erika partiu-se em dois no Golfo da Biscaia com mar grosso, a 70 km da costa bretã. Transportava 30.000 toneladas de fuel pesado para a Total. O casco, enfraquecido pela corrosão e lastro inadequado, cedeu sob esforços longitudinais. 20.000 toneladas de fuel derramaram no mar. 400 km de costa contaminados, 150.000 aves mortas.",
      cause:"• Navio subnorma (26 anos, sem duplo casco)\n• Lastro insuficiente em mar grosso → esforços excessivos no casco\n• Falta de manutenção estrutural — corrosão avançada\n• Mudança de classe não declarada — controlo PSC deficiente\n• Sociedade classificadora (RINA) implicada",
      lessons:"✓ Regra MARPOL 13G: eliminação acelerada de cascos simples\n✓ Diretiva UE: duplo casco obrigatório antes de 2010\n✓ EMSA criada em 2003\n✓ Diretiva 2005/35: responsabilidade penal por poluição\n✓ Planos de lastro reforçados no SMS (ISM)",
      link:"🔗 Vínculo L2 Lastro: Um petroleiro em lastro com lastro insuficiente desenvolve esforços estruturais longitudinais extremos. O lastro correto é condição de integridade estrutural, não apenas de estabilidade.",
    },
  };
  const c = d[lang] || d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
          <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
          <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>
            {lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
          <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1", q:"La Convention internationale sur la gestion des eaux de ballast a été adoptée en :\n(Répondre : 2004, 2007 ou 2010)"},
      {id:"q2", q:"Quelle est la méthode de traitement BWMS la plus courante ?\n(Répondre : UV, électrolyse ou filtration seule)"},
      {id:"q3", q:"En navigation en lège, un pétrolier doit pomper du ballast principalement pour :\n(Répondre : stabilité, propulsion ou confort)"},
    ],
    en:[
      {id:"q1", q:"The International Ballast Water Management Convention was adopted in:\n(Answer: 2004, 2007 or 2010)"},
      {id:"q2", q:"What is the most common BWMS treatment method?\n(Answer: UV, electrolysis or filtration only)"},
      {id:"q3", q:"When sailing in ballast, a tanker must pump ballast primarily for:\n(Answer: stability, propulsion or comfort)"},
    ],
    es:[
      {id:"q1", q:"El Convenio internacional sobre gestión del agua de lastre fue adoptado en:\n(Responder: 2004, 2007 o 2010)"},
      {id:"q2", q:"¿Cuál es el método de tratamiento BWMS más común?\n(Responder: UV, electrólisis o solo filtración)"},
      {id:"q3", q:"Navegando en lastre, un petrolero bombea lastre principalmente para:\n(Responder: estabilidad, propulsión o comodidad)"},
    ],
    pt:[
      {id:"q1", q:"A Convenção internacional sobre gestão da água de lastro foi adotada em:\n(Responder: 2004, 2007 ou 2010)"},
      {id:"q2", q:"Qual é o método de tratamento BWMS mais comum?\n(Responder: UV, eletrólise ou apenas filtração)"},
      {id:"q3", q:"Navegando em lastro, um petroleiro bombeia lastro principalmente para:\n(Responder: estabilidade, propulsão ou conforto)"},
    ],
  };
  const list = qs[lang] || qs.fr;
  const chk = (id, val) => {
    const v = val.trim().toLowerCase();
    if (id==="q1") return v==="2004";
    if (id==="q2") return v==="uv";
    if (id==="q3") return v==="stabilité"||v==="stability"||v==="estabilidad"||v==="estabilidade"||v==="stabilite";
    return false;
  };
  const corrKey = {
    fr:{q1:"2004",q2:"UV",q3:"stabilité"},
    en:{q1:"2004",q2:"UV",q3:"stability"},
    es:{q1:"2004",q2:"UV",q3:"estabilidad"},
    pt:{q1:"2004",q2:"UV",q3:"estabilidade"},
  };
  const expl = {
    fr:"✅ Q1: 2004 (Convention BWM adoptée le 13/02/2004 à l'OMI)\n✅ Q2: UV (irradiation ultraviolette — pas de résidu chimique)\n✅ Q3: Stabilité (GM insuffisant en lège → risque de chavirage)",
    en:"✅ Q1: 2004 (BWM Convention adopted 13/02/2004 at IMO)\n✅ Q2: UV (ultraviolet irradiation — no chemical residue)\n✅ Q3: Stability (insufficient GM in ballast → capsizing risk)",
    es:"✅ Q1: 2004 (Convenio BWM adoptado 13/02/2004 en OMI)\n✅ Q2: UV (irradiación ultravioleta — sin residuo químico)\n✅ Q3: Estabilidad (GM insuficiente en lastre → riesgo vuelco)",
    pt:"✅ Q1: 2004 (Convenção BWM adotada 13/02/2004 na OMI)\n✅ Q2: UV (irradiação ultravioleta — sem resíduo químico)\n✅ Q3: Estabilidade (GM insuficiente em lastro → risco capotamento)",
  };
  const ck = corrKey[lang] || corrKey.fr;
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Convention BWM adoptée à l'OMI · UV = méthode BWMS principale · Ballast = sécurité en lège"
        :lang==="en"?"💡 Reminders: BWM Convention adopted at IMO · UV = main BWMS method · Ballast = safety when light"
        :lang==="es"?"💡 Recordatorios: Convenio BWM adoptado OMI · UV = método BWMS principal · Lastre = seguridad en lastre"
        :"💡 Lembretes: Convenção BWM adotada OMI · UV = método BWMS principal · Lastro = segurança a vazio"}
      </div>
      {list.map((q, i) => (
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC && <div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${ck[q.id]}`}
          </div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"10px",borderRadius:12,border:`1px solid ${C.gold}55`,background:"rgba(201,146,42,0.12)",color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:8}}>
        {showC?(t.hideCorr):( t.showCorr)}
      </button>
      {showC && (
        <div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QUESTIONS PREMIUM
// ══════════════════════════════════════
function QuestionBank({ lang, onComplete }) {
  const [open, setOpen] = useState(null);
  const [opened, setOpened] = useState(new Set());
  const qs = {
    fr:[
      {q:"Quelle est la définition réglementaire de l'eau de ballast selon la Convention BWM 2004 ?",a:"L'eau embarquée à bord d'un navire pour contrôler l'assiette, la gîte, le tirant d'eau, la stabilité ou les contraintes d'un navire, y compris les sédiments qui y sont contenus. (Article 1, Convention BWM 2004)"},
      {q:"Quand la Convention BWM 2004 est-elle entrée en vigueur ?",a:"Le 8 septembre 2017, après ratification par 52 États représentant 35% de la jauge brute mondiale."},
      {q:"Quelle est la différence entre D-1 et D-2 dans la Convention BWM ?",a:"D-1 = échange d'eau de ballast en haute mer (remplacement > 95% du volume). D-2 = norme de traitement : < 10 organismes viables/m³ de taille ≥ 50µm, < 10 organismes/mL de taille 10-50µm, et limites pour Vibrio cholerae, E. coli, entérocoques."},
      {q:"Pourquoi un pétrolier en lège (ballast voyage) est-il plus vulnérable structurellement ?",a:"Sans cargaison, le navire flotte haut, avec des porte-à-faux excessifs entre les zones remplies (machines) et vides. Les contraintes longitudinales (hogging/sagging) peuvent dépasser les limites admissibles si le ballast ne les compense pas."},
      {q:"Qu'est-ce que le 'sagging' et le 'hogging' dans le contexte du ballastage ?",a:"Hogging = flexion en arc (milieu du navire poussé vers le haut) — risque quand l'extrémités sont trop chargées. Sagging = flexion en creux (milieu vers le bas) — risque quand le milieu est trop chargé. Les plans de ballastage doivent maintenir ces contraintes dans les limites admissibles de la courbe SF/BM."},
      {q:"Quelles sont les 3 méthodes de traitement BWMS homologuées par l'OMI ?",a:"1. Systèmes physiques : UV (ultraviolet), rayonnement électromagnétique, cavitation acoustique. 2. Systèmes chimiques : injection de biocides (chlore actif, ozone, dioxyde de chlore). 3. Systèmes hybrides : filtration + UV ou filtration + électrolyse. Tous doivent être approuvés selon BWMS Code 2016."},
      {q:"Qu'est-ce que l'échange de ballast 'séquentiel' vs 'flux continu' ?",a:"Séquentiel : vider complètement la citerne puis la remplir avec eau de mer (risque stabilité). Flux continu (flow-through) : pomper 3 fois le volume de la citerne tout en débordant par le haut — maintient la stabilité. Les deux doivent se faire à > 200 milles des terres, profondeur > 200m."},
      {q:"Quel est le rôle du Ballast Water Record Book (BWRB) ?",a:"Journal obligatoire (Convention BWM Règle B-2) enregistrant : chaque opération de ballastage/déballastage, les échanges effectués (date, position, volume, méthode), les traitements BWMS, les circonstances exceptionnelles. Doit être disponible à l'inspection PSC pendant 2 ans."},
      {q:"Pourquoi les citernes de pic avant et arrière (FP/AP) sont-elles particulièrement importantes en ballast ?",a:"Elles contrôlent l'assiette (trim) du navire. FP plein = piqué sur l'avant (by head). AP plein = piqué sur l'arrière (by stern). L'assiette optimale en ballast est légèrement piquée sur l'arrière pour assurer l'immersion de l'hélice et la manœuvrabilité."},
      {q:"Qu'est-ce que la condition 'light ballast' et quand est-elle acceptable ?",a:"Navigation avec ballast minimum (< 30% des citernes) — acceptable uniquement en mer calme et trajet court. Interdit par certains ports (restriction tirant d'eau minimum). Risque : GM faible, contraintes structurelles élevées, élice partiellement émergée = vibrations."},
      {q:"Comment le BWMS Code 2016 diffère-t-il des anciennes directives G8 et G9 ?",a:"BWMS Code 2016 remplace les directives G8 (systèmes de traitement) et G9 (systèmes utilisant substances actives). Il unifie les procédures d'approbation de type, renforce les essais en conditions réelles (land-based + shipboard), exige une efficacité maintenue sur toute la durée de vie du système."},
      {q:"Quelle zone géographique impose les restrictions de ballastage les plus strictes ?",a:"Les États-Unis (USCG 33 CFR Part 151 & 46 CFR Part 162) : norme D-2 applicable à tous les navires dans les eaux US depuis 2012 pour les navires neufs, 2016 pour les anciens. Certains États (Californie) ont des exigences encore plus strictes. Canada également très restrictif dans les Grands Lacs."},
      {q:"Qu'est-ce qu'un 'sounding' de citerne ballast et quelle est la procédure standard ?",a:"Mesure du niveau d'eau dans la citerne par sonde manuelle (ullage rod/tape) ou jauge électronique. Procédure : corriger pour la gîte et l'assiette (correction tables), utiliser la table de capacité/jauge du navire, enregistrer dans le BWRB. Effectué avant et après chaque opération."},
      {q:"Quelle est la relation entre l'effet de carène liquide et le ballastage partiel ?",a:"Une citerne à moitié pleine crée une surface libre maximale → réduction de GM = ΔGM = ρ×i/Δ où i est le moment d'inertie de la surface libre. En pratique : remplir ou vider complètement les citernes, ne jamais laisser plusieurs citernes à 50% simultanément — risque de GM négatif."},
      {q:"Quelles espèces invasives ont été transportées via l'eau de ballast et ont causé des dommages économiques majeurs ?",a:"• Dreissena polymorpha (moule zébrée) : Amérique du Nord, dégâts > 1 Md$/an aux infrastructures. • Mnemiopsis leidyi (cténophore) : Mer Noire, effondrement pêcherie anchois. • Asterias amurensis (étoile de mer du Pacifique Nord) : Australie. • Vibrio cholerae : épidémies de choléra Amérique du Sud années 1990. Ces cas ont motivé la Convention BWM 2004."},
    ],
    en:[
      {q:"What is the regulatory definition of ballast water under the BWM Convention 2004?",a:"Water taken on board a ship to control trim, list, draught, stability or stresses of the ship, including the sediments suspended therein. (Article 1, BWM Convention 2004)"},
      {q:"When did the BWM Convention 2004 enter into force?",a:"September 8, 2017, after ratification by 52 States representing 35% of world gross tonnage."},
      {q:"What is the difference between D-1 and D-2 in the BWM Convention?",a:"D-1 = ballast water exchange at sea (replacement > 95% of volume). D-2 = treatment standard: < 10 viable organisms/m³ ≥ 50µm, < 10 organisms/mL of 10-50µm, plus limits for Vibrio cholerae, E. coli, enterococci."},
      {q:"Why is a tanker in ballast voyage structurally more vulnerable?",a:"Without cargo, the vessel floats high with excessive overhangs between loaded (machinery) and empty sections. Longitudinal stresses (hogging/sagging) can exceed permissible limits if ballast does not compensate."},
      {q:"What are 'sagging' and 'hogging' in the context of ballasting?",a:"Hogging = arch deflection (midship pushed upward) — risk when ends are overloaded. Sagging = hollow deflection (midship downward) — risk when midship is overloaded. Ballast plans must maintain these stresses within the SF/BM curve limits."},
      {q:"What are the 3 IMO-approved BWMS treatment methods?",a:"1. Physical systems: UV, electromagnetic radiation, acoustic cavitation. 2. Chemical systems: biocide injection (active chlorine, ozone, chlorine dioxide). 3. Hybrid systems: filtration + UV or filtration + electrolysis. All must be approved under BWMS Code 2016."},
      {q:"What is 'sequential' vs 'flow-through' ballast exchange?",a:"Sequential: completely empty the tank then refill with seawater (stability risk). Flow-through: pump 3 times the tank volume while overflowing from top — maintains stability. Both must be done > 200 nm from land, depth > 200m."},
      {q:"What is the role of the Ballast Water Record Book (BWRB)?",a:"Mandatory log (BWM Convention Rule B-2) recording: each ballasting/deballasting operation, exchanges performed (date, position, volume, method), BWMS treatments, exceptional circumstances. Must be available for PSC inspection for 2 years."},
      {q:"Why are fore peak (FP) and aft peak (AP) tanks particularly important in ballast?",a:"They control the vessel's trim. Full FP = trimmed by head. Full AP = trimmed by stern. Optimal trim in ballast is slightly by stern to ensure propeller immersion and maneuverability."},
      {q:"What is the 'light ballast' condition and when is it acceptable?",a:"Navigation with minimum ballast (< 30% of tanks) — acceptable only in calm seas and short voyages. Prohibited by some ports (minimum draft restriction). Risk: low GM, high structural stresses, partially emerged propeller = vibrations."},
      {q:"How does BWMS Code 2016 differ from old G8 and G9 guidelines?",a:"BWMS Code 2016 replaces G8 (treatment systems) and G9 (systems using active substances). It unifies type approval procedures, strengthens tests under real conditions (land-based + shipboard), requires maintained efficiency over system lifetime."},
      {q:"Which geographic zone imposes the strictest ballasting restrictions?",a:"United States (USCG 33 CFR Part 151 & 46 CFR Part 162): D-2 standard applicable to all vessels in US waters since 2012 for new ships, 2016 for existing. Some states (California) have even stricter requirements."},
      {q:"What is a ballast tank 'sounding' and what is the standard procedure?",a:"Measurement of water level in tank by manual sounding rod (ullage tape) or electronic gauge. Procedure: correct for list and trim (correction tables), use ship's capacity/gauge table, record in BWRB. Performed before and after each operation."},
      {q:"What is the relationship between free surface effect and partial ballasting?",a:"A half-full tank creates maximum free surface → GM reduction = ΔGM = ρ×i/Δ where i is the free surface moment of inertia. In practice: fill or empty tanks completely, never leave multiple tanks at 50% simultaneously — risk of negative GM."},
      {q:"Which invasive species transported via ballast water caused major economic damage?",a:"• Dreissena polymorpha (zebra mussel): North America, damages > $1 billion/year. • Mnemiopsis leidyi (ctenophore): Black Sea, anchovy fishery collapse. • Asterias amurensis (North Pacific sea star): Australia. • Vibrio cholerae: cholera epidemics South America 1990s. These cases motivated the BWM Convention 2004."},
    ],
    es:[
      {q:"¿Cuál es la definición reglamentaria del agua de lastre según el Convenio BWM 2004?",a:"Agua embarcada en un buque para controlar el asiento, la escora, el calado, la estabilidad o los esfuerzos del buque, incluidos los sedimentos en suspensión. (Artículo 1, Convenio BWM 2004)"},
      {q:"¿Cuándo entró en vigor el Convenio BWM 2004?",a:"El 8 de septiembre de 2017, tras la ratificación por 52 Estados que representan el 35% del arqueo bruto mundial."},
      {q:"¿Cuál es la diferencia entre D-1 y D-2 en el Convenio BWM?",a:"D-1 = intercambio de agua de lastre en alta mar (sustitución > 95% del volumen). D-2 = norma de tratamiento: < 10 organismos viables/m³ ≥ 50µm, < 10 organismos/mL de 10-50µm, más límites para Vibrio cholerae, E. coli, enterococos."},
      {q:"¿Por qué un petrolero en lastre es más vulnerable estructuralmente?",a:"Sin carga, el buque flota alto con voladizos excesivos entre secciones cargadas (máquinas) y vacías. Los esfuerzos longitudinales (hogging/sagging) pueden superar los límites admisibles si el lastre no los compensa."},
      {q:"¿Qué son el 'sagging' y el 'hogging' en el contexto del lastraje?",a:"Hogging = flexión en arco (centro del buque empujado hacia arriba). Sagging = flexión en cóncavo (centro hacia abajo). Los planes de lastraje deben mantener estos esfuerzos dentro de los límites de la curva SF/BM."},
      {q:"¿Cuáles son los 3 métodos de tratamiento BWMS homologados por la OMI?",a:"1. Sistemas físicos: UV, radiación electromagnética, cavitación acústica. 2. Sistemas químicos: inyección de biocidas. 3. Sistemas híbridos: filtración + UV o filtración + electrólisis. Todos deben ser aprobados según BWMS Code 2016."},
      {q:"¿Qué es el intercambio de lastre 'secuencial' vs 'flujo continuo'?",a:"Secuencial: vaciar completamente el tanque y rellenarlo con agua de mar. Flujo continuo: bombear 3 veces el volumen del tanque mientras rebosa por la parte superior. Ambos a > 200 mn de tierra, profundidad > 200m."},
      {q:"¿Cuál es el papel del Libro de Registro de Agua de Lastre (BWRB)?",a:"Diario obligatorio (Regla B-2) que registra: cada operación de lastraje/deslastraje, intercambios realizados, tratamientos BWMS, circunstancias excepcionales. Disponible para inspección PSC durante 2 años."},
      {q:"¿Por qué los piques de proa (FP) y popa (AP) son especialmente importantes en lastre?",a:"Controlan el asiento del buque. FP lleno = aprocado. AP lleno = apopado. El asiento óptimo en lastre es ligeramente apopado para asegurar la inmersión de la hélice."},
      {q:"¿Qué es la condición 'lastre mínimo' y cuándo es aceptable?",a:"Navegación con lastre mínimo (< 30% de los tanques) — aceptable solo en mar calmado y trayecto corto. Riesgos: GM bajo, esfuerzos estructurales altos, hélice parcialmente emergida."},
      {q:"¿Cómo difiere el BWMS Code 2016 de las antiguas directrices G8 y G9?",a:"BWMS Code 2016 reemplaza G8 y G9, unifica procedimientos de aprobación de tipo, refuerza pruebas en condiciones reales, exige eficiencia mantenida durante toda la vida útil del sistema."},
      {q:"¿Qué zona geográfica impone las restricciones de lastraje más estrictas?",a:"Estados Unidos (USCG 33 CFR Part 151 & 46 CFR Part 162): norma D-2 para todos los buques en aguas estadounidenses. California tiene requisitos aún más estrictos."},
      {q:"¿Qué es un 'sounding' de tanque de lastre y cuál es el procedimiento estándar?",a:"Medición del nivel de agua en el tanque mediante sonda manual o manómetro electrónico. Corregir por escora y asiento, usar tabla de capacidad del buque, registrar en BWRB."},
      {q:"¿Cuál es la relación entre el efecto de superficie libre y el lastraje parcial?",a:"Un tanque a mitad lleno crea superficie libre máxima → reducción GM = ΔGM = ρ×i/Δ. En la práctica: llenar o vaciar completamente los tanques, nunca dejar varios tanques al 50% simultáneamente."},
      {q:"¿Qué especies invasoras transportadas por el agua de lastre causaron daños económicos mayores?",a:"• Dreissena polymorpha (mejillón cebra): daños > 1.000 M$/año en Norteamérica. • Mnemiopsis leidyi: colapso pesquero en el Mar Negro. • Vibrio cholerae: epidemias de cólera en Sudamérica en los 90. Estos casos motivaron el Convenio BWM 2004."},
    ],
    pt:[
      {q:"Qual é a definição regulamentar de água de lastro segundo a Convenção BWM 2004?",a:"Água tomada a bordo de um navio para controlar o trim, a escora, o calado, a estabilidade ou os esforços do navio, incluindo os sedimentos em suspensão. (Artigo 1, Convenção BWM 2004)"},
      {q:"Quando entrou em vigor a Convenção BWM 2004?",a:"A 8 de setembro de 2017, após ratificação por 52 Estados representando 35% da arqueação bruta mundial."},
      {q:"Qual é a diferença entre D-1 e D-2 na Convenção BWM?",a:"D-1 = troca de água de lastro em alto mar (substituição > 95% do volume). D-2 = norma de tratamento: < 10 organismos viáveis/m³ ≥ 50µm, < 10 organismos/mL de 10-50µm, mais limites para Vibrio cholerae, E. coli, enterococos."},
      {q:"Por que um petroleiro em lastro é mais vulnerável estruturalmente?",a:"Sem carga, o navio flutua alto com balanços excessivos entre secções carregadas (máquinas) e vazias. Os esforços longitudinais (hogging/sagging) podem exceder os limites admissíveis se o lastro não os compensar."},
      {q:"O que são 'sagging' e 'hogging' no contexto do lastro?",a:"Hogging = flexão em arco (meia-nau empurrada para cima). Sagging = flexão côncava (meia-nau para baixo). Os planos de lastro devem manter estes esforços dentro dos limites da curva SF/BM."},
      {q:"Quais são os 3 métodos de tratamento BWMS aprovados pela OMI?",a:"1. Sistemas físicos: UV, radiação eletromagnética, cavitação acústica. 2. Sistemas químicos: injeção de biocidas. 3. Sistemas híbridos: filtração + UV ou filtração + eletrólise. Todos aprovados pelo BWMS Code 2016."},
      {q:"O que é a troca de lastro 'sequencial' vs 'fluxo contínuo'?",a:"Sequencial: esvaziar completamente o tanque e enchê-lo com água do mar. Fluxo contínuo: bombear 3 vezes o volume do tanque enquanto transborda pelo topo. Ambos a > 200 mn de terra, profundidade > 200m."},
      {q:"Qual é o papel do Livro de Registro de Água de Lastro (BWRB)?",a:"Diário obrigatório (Regra B-2) registando: cada operação de lastro/deslastro, trocas efetuadas, tratamentos BWMS, circunstâncias excecionais. Disponível para inspeção PSC durante 2 anos."},
      {q:"Por que os piques de vante (FP) e ré (AP) são especialmente importantes em lastro?",a:"Controlam o trim do navio. FP cheio = apruado. AP cheio = apopado. O trim ótimo em lastro é ligeiramente apopado para assegurar a imersão da hélice."},
      {q:"O que é a condição 'lastro mínimo' e quando é aceitável?",a:"Navegação com lastro mínimo (< 30% dos tanques) — aceitável apenas em mar calmo e trajeto curto. Riscos: GM baixo, esforços estruturais elevados, hélice parcialmente emergida."},
      {q:"Como o BWMS Code 2016 difere das antigas diretrizes G8 e G9?",a:"BWMS Code 2016 substitui G8 e G9, unifica procedimentos de aprovação de tipo, reforça testes em condições reais, exige eficiência mantida durante toda a vida útil do sistema."},
      {q:"Que zona geográfica impõe restrições de lastro mais estritas?",a:"Estados Unidos (USCG 33 CFR Part 151 & 46 CFR Part 162): norma D-2 para todos os navios nas águas americanas. Califórnia tem requisitos ainda mais estritos."},
      {q:"O que é um 'sounding' de tanque de lastro e qual é o procedimento padrão?",a:"Medição do nível de água no tanque por sonda manual ou manómetro eletrónico. Corrigir para escora e trim, usar tabela de capacidade do navio, registar no BWRB."},
      {q:"Qual é a relação entre o efeito de superfície livre e o lastro parcial?",a:"Um tanque a meio cheio cria superfície livre máxima → redução GM = ΔGM = ρ×i/Δ. Na prática: encher ou esvaziar completamente os tanques, nunca deixar vários tanques a 50% simultaneamente."},
      {q:"Que espécies invasoras transportadas via água de lastro causaram danos económicos maiores?",a:"• Dreissena polymorpha (mexilhão-zebra): danos > 1.000 M$/ano na América do Norte. • Mnemiopsis leidyi: colapso das pescarias no Mar Negro. • Vibrio cholerae: epidemias de cólera na América do Sul nos anos 90. Estes casos motivaram a Convenção BWM 2004."},
    ],
  };
  const list = qs[lang] || qs.fr;
  return (
    <div>
      {list.map((q, i) => (
        <div key={i} style={{marginBottom:8,borderRadius:12,overflow:"hidden",border:`1px solid ${open===i?C.purple+"66":C.border}`}}>
          <div style={{padding:"11px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}} onClick={()=>{setOpen(open===i?null:i);setOpened(prev=>{if(prev.has(i))return prev;const next=new Set(prev);next.add(i);if(next.size>=list.length&&onComplete)onComplete();return next;});}}>
            <span style={{fontSize:11,fontWeight:700,color:C.purple,fontFamily:"'Cinzel',serif",minWidth:22}}>Q{i+1}</span>
            <span style={{fontSize:12,color:C.white,flex:1,lineHeight:1.4}}>{q.q}</span>
            <span style={{fontSize:12,color:C.muted}}>{open===i?"▲":"▼"}</span>
          </div>
          {open===i && (
            <div style={{padding:"0 14px 12px",fontSize:12,color:"rgba(240,244,255,0.85)",lineHeight:1.75,background:"rgba(142,68,173,0.07)",borderTop:`1px solid ${C.purple}22`,whiteSpace:"pre-line"}}>
              {q.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — 5 QCM
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    { q:"La Convention BWM 2004 est entrée en vigueur en :", opts:["2004","2010","2017","2020"], ans:2, expl:"La Convention BWM a été adoptée en 2004 mais n'est entrée en vigueur que le 8 septembre 2017, après ratification par 52 États représentant 35% de la jauge brute mondiale." },
    { q:"La norme D-2 de la Convention BWM impose une limite de :", opts:["< 10 organismes/m³ ≥50µm","< 100 organismes/L","< 1 organisme/L","< 50 organismes/m²"], ans:0, expl:"D-2 : < 10 organismes viables/m³ de taille ≥50µm, < 10 organismes/mL de taille 10-50µm, et limites pour Vibrio cholerae, E. coli, entérocoques. Standard précis adopté par l'OMI." },
    { q:"En navigation en lège (ballast voyage), le danger principal est :", opts:["Excès de vitesse","GM insuffisant → risque chavirage","Surchauffe des machines","Corrosion des citernes"], ans:1, expl:"Sans cargaison, le centre de gravité du navire est trop haut → GM peut devenir insuffisant voire négatif. Le ballast est essentiel pour abaisser G et maintenir GM > 0,15m minimum." },
    { q:"L'échange de ballast 'flux continu' (flow-through) nécessite de pomper :", opts:["Le volume exact de la citerne","2× le volume","3× le volume","5× le volume"], ans:2, expl:"La méthode flux continu requiert de pomper 3 fois le volume de la citerne tout en laissant déborder par le dessus. Ceci assure le remplacement de > 95% de l'eau initiale (norme D-1) tout en maintenant la stabilité." },
    { q:"Le MT Erika (1999) a mis en évidence que le ballastage insuffisant provoque :", opts:["Un excès de vitesse","Des contraintes structurelles longitudinales excessives","Un incendie à bord","Une pollution sonore"], ans:1, expl:"L'Erika s'est brisé en deux à cause de contraintes longitudinales (hogging) excessives. La coque corrodée, combinée à un plan de ballastage inadapté aux conditions de mer, n'a pas résisté aux efforts de flexion. Résultat : MARPOL 13G, directive double coque EU, création de l'EMSA." },
  ],
  en:[
    { q:"The BWM Convention 2004 entered into force in:", opts:["2004","2010","2017","2020"], ans:2, expl:"The BWM Convention was adopted in 2004 but only entered into force on September 8, 2017, after ratification by 52 States representing 35% of world gross tonnage." },
    { q:"The D-2 standard of the BWM Convention imposes a limit of:", opts:["< 10 organisms/m³ ≥50µm","< 100 organisms/L","< 1 organism/L","< 50 organisms/m²"], ans:0, expl:"D-2: < 10 viable organisms/m³ ≥50µm, < 10 organisms/mL of 10-50µm, plus limits for Vibrio cholerae, E. coli, enterococci. Precise standard adopted by IMO." },
    { q:"When sailing in ballast voyage, the main danger is:", opts:["Excessive speed","Insufficient GM → capsizing risk","Engine overheating","Tank corrosion"], ans:1, expl:"Without cargo, the vessel's center of gravity is too high → GM can become insufficient or even negative. Ballast is essential to lower G and maintain GM > 0.15m minimum." },
    { q:"The 'flow-through' ballast exchange method requires pumping:", opts:["Exact tank volume","2× the volume","3× the volume","5× the volume"], ans:2, expl:"The flow-through method requires pumping 3 times the tank volume while allowing overflow from the top. This ensures replacement of > 95% of the original water (D-1 standard) while maintaining stability." },
    { q:"The MT Erika (1999) highlighted that insufficient ballasting causes:", opts:["Excessive speed","Excessive longitudinal structural stresses","Fire on board","Noise pollution"], ans:1, expl:"The Erika broke in two due to excessive longitudinal stresses (hogging). The corroded hull, combined with a ballast plan inadequate for sea conditions, could not withstand bending forces. Result: MARPOL 13G, EU double hull directive, creation of EMSA." },
  ],
  es:[
    { q:"El Convenio BWM 2004 entró en vigor en:", opts:["2004","2010","2017","2020"], ans:2, expl:"El Convenio BWM fue adoptado en 2004 pero entró en vigor el 8 de septiembre de 2017, tras la ratificación por 52 Estados que representan el 35% del arqueo bruto mundial." },
    { q:"La norma D-2 del Convenio BWM impone un límite de:", opts:["< 10 organismos/m³ ≥50µm","< 100 organismos/L","< 1 organismo/L","< 50 organismos/m²"], ans:0, expl:"D-2: < 10 organismos viables/m³ ≥50µm, < 10 organismos/mL de 10-50µm, más límites para Vibrio cholerae, E. coli, enterococos." },
    { q:"Navegando en lastre, el peligro principal es:", opts:["Exceso de velocidad","GM insuficiente → riesgo vuelco","Sobrecalentamiento máquinas","Corrosión tanques"], ans:1, expl:"Sin carga, el centro de gravedad es demasiado alto → GM puede volverse insuficiente. El lastre es esencial para mantener GM > 0,15m mínimo." },
    { q:"El método de intercambio de lastre 'flujo continuo' requiere bombear:", opts:["El volumen exacto del tanque","2× el volumen","3× el volumen","5× el volumen"], ans:2, expl:"El método de flujo continuo requiere bombear 3 veces el volumen del tanque mientras rebosa por la parte superior, asegurando sustitución > 95% del agua original." },
    { q:"El MT Erika (1999) demostró que el lastraje insuficiente provoca:", opts:["Exceso de velocidad","Esfuerzos estructurales longitudinales excesivos","Incendio a bordo","Contaminación acústica"], ans:1, expl:"El Erika se partió en dos por esfuerzos longitudinales (hogging) excesivos. Resultado: MARPOL 13G, directiva doble casco UE, creación de EMSA." },
  ],
  pt:[
    { q:"A Convenção BWM 2004 entrou em vigor em:", opts:["2004","2010","2017","2020"], ans:2, expl:"A Convenção BWM foi adotada em 2004 mas só entrou em vigor a 8 de setembro de 2017, após ratificação por 52 Estados representando 35% da arqueação bruta mundial." },
    { q:"A norma D-2 da Convenção BWM impõe um limite de:", opts:["< 10 organismos/m³ ≥50µm","< 100 organismos/L","< 1 organismo/L","< 50 organismos/m²"], ans:0, expl:"D-2: < 10 organismos viáveis/m³ ≥50µm, < 10 organismos/mL de 10-50µm, mais limites para Vibrio cholerae, E. coli, enterococos." },
    { q:"Navegando em lastro, o perigo principal é:", opts:["Excesso de velocidade","GM insuficiente → risco capotamento","Sobreaquecimento das máquinas","Corrosão dos tanques"], ans:1, expl:"Sem carga, o centro de gravidade é demasiado alto → GM pode tornar-se insuficiente. O lastro é essencial para manter GM > 0,15m mínimo." },
    { q:"O método de troca de lastro 'fluxo contínuo' requer bombear:", opts:["O volume exato do tanque","2× o volume","3× o volume","5× o volume"], ans:2, expl:"O método de fluxo contínuo requer bombear 3 vezes o volume do tanque enquanto transborda pelo topo, assegurando substituição > 95% da água original." },
    { q:"O MT Erika (1999) evidenciou que o lastro insuficiente provoca:", opts:["Excesso de velocidade","Esforços estruturais longitudinais excessivos","Incêndio a bordo","Poluição sonora"], ans:1, expl:"O Erika partiu-se em dois devido a esforços longitudinais (hogging) excessivos. Resultado: MARPOL 13G, diretiva duplo casco UE, criação da EMSA." },
  ],
};

function QuizComp({ questions, t, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const [shuffled] = useState(() => questions.map(shuffleQuestionOptions));
  const q = shuffled[idx];
  const isLast = idx === questions.length - 1;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i === q.ans) setScore(s => s+1);
  };

  const handleNext = () => {
    if (isLast) { onComplete(score + (sel===q.ans?1:0)); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:11,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {questions.length}</div>
        <div style={{fontSize:11,color:C.gold,fontWeight:700}}>⭐ {score}/{questions.length}</div>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt, i) => {
        let bg = "rgba(13,31,60,0.6)", border = C.border, col = C.white;
        if (answered) {
          if (i === q.ans) { bg="rgba(30,138,74,0.2)"; border=C.green; col=C.green; }
          else if (i === sel) { bg="rgba(192,57,43,0.2)"; border=C.red; col=C.red; }
        } else if (sel===i) { bg="rgba(201,146,42,0.15)"; border=C.gold; }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 14px",marginBottom:8,borderRadius:12,background:bg,border:`1px solid ${border}`,color:col,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:700,marginRight:8,color:C.gold2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"12px",borderRadius:12,background:`rgba(${sel===q.ans?"30,138,74":"192,57,43"},0.1)`,border:`1px solid ${sel===q.ans?C.green:C.red}44`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:sel===q.ans?C.green:C.red,marginBottom:4}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.teal})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// LESSON CONTENT (multilingual)
// ══════════════════════════════════════
const getContent = (lang) => {
  const d = {
    fr:{
      badge:"⚙️ Module e6 — Cargaison & Pétrole · Leçon 2/6 · ⭐ Premium · 200 XP",
      title:"Systèmes de Ballastage — Stabilité en Lège & BWMS",
      intro:"Un pétrolier vide n'est pas un navire léger — c'est un navire en danger. Sans cargaison, le centre de gravité monte, le GM chute, et les contraintes structurelles deviennent critiques. Le ballast est la réponse opérationnelle à ce défi physique.\n\nCette leçon couvre les systèmes de ballastage des pétroliers, la Convention BWM 2004, et les obligations BWMS en vigueur depuis 2017.",
      p1:"PARTIE 1 — SYSTÈMES DE CITERNES & POMPAGE",s1t:"Architecture des citernes de ballast sur pétrolier",
      s1:"CITERNES DÉDIÉES AU BALLAST :\nSur un pétrolier moderne (double coque), les citernes de ballast occupent l'espace entre la coque interne et externe, ainsi que les pics.\n\nDISTRIBUTION TYPIQUE :\n→ Pic avant (FP) : contrôle assiette avant\n→ Citernes latérales P&S N°1, 2, 3 : stabilité transversale et longitudinale\n→ Pic arrière (AP) : contrôle assiette arrière\n→ Capacité totale : 20 à 40% du port en lourd\n\nSYSTÈME DE POMPAGE :\n→ Pompes centrifuges dédiées (débit : 500–3000 m³/h)\n→ Éjecteurs (utilisant la pression cargo) — secours\n→ Tuyauteries principales + rampes de distribution\n→ Soupapes de contrôle : vanne papillon ou à opercule\n\nPLAN DE BALLASTAGE :\nDéfini par le chantier naval, validé par le bureau de classification. Précise les séquences admissibles de ballastage/déballastage pour chaque condition de voyage.",
      p2:"PARTIE 2 — STABILITÉ EN VOYAGE EN LÈGE",s2t:"GM, contraintes structurelles et plan de chargement",
      s2:"VOYAGE EN LÈGE (BALLAST VOYAGE) :\nCondition critique : le navire revient à vide au port de chargement. Centre de gravité G très haut → GM faible.\n\nOBJECTIFS DU BALLASTAGE :\n→ Maintenir GM > 0,15m (minimum réglementaire)\n→ Immerger l'hélice (propulsion efficace)\n→ Assurer la manœuvrabilité (gouvernail immergé)\n→ Réduire les contraintes structurelles (SF/BM)\n→ Amortir le tangage et le roulis\n\nCONTRAINTES LONGITUDINALES :\nHOGGING : flexion en arc — milieu soulevé\nSAGGING : flexion en creux — milieu affaissé\nLe plan de ballastage doit maintenir ces efforts dans les limites courbes SF/BM du stability booklet.\n\nASSIETTE OPTIMALE EN BALLAST :\nLégèrement piquée sur l'arrière (0,5–1,5m)\n→ Hélice entièrement immergée\n→ Meilleure efficacité propulsive\n→ Gouvernail efficace\n→ Réduction des vibrations",
      p3:"PARTIE 3 — BWMS & CONVENTION BWM 2004",s3t:"Traitement de l'eau de ballast — obligations légales",
      s3:"PROBLÈME DES ESPÈCES INVASIVES :\nUn grand pétrolier embarque jusqu'à 100 000 m³ d'eau de ballast. Cette eau contient des organismes (plancton, larves, bactéries) capables de dévaster les écosystèmes locaux à l'arrivée.\n\nCONVENTION BWM 2004 (OMI) :\nAdoptée : 13 février 2004 · En vigueur : 8 septembre 2017\n\nDEUX NORMES :\nD-1 : Échange d'eau en haute mer\n→ > 200 mn des terres · profondeur > 200m\n→ Séquentiel ou flux continu (3× volume)\n→ Standard minimal transitoire\n\nD-2 : Traitement BWMS (norme finale)\n→ < 10 organismes viables/m³ (≥ 50µm)\n→ < 10 organismes/mL (10-50µm)\n→ Limites bactériologiques (Vibrio, E.coli)\n\nBWMS CODE 2016 :\nApprouve 3 familles de systèmes :\n• UV (ultraviolet) — le plus répandu\n• Électrolyse (génération chlore actif)\n• Injection chimique (biocides agréés OMI)",
      p4:"PARTIE 4 — OPÉRATIONS & RÉGLEMENTATION",s4t:"Procédures de ballastage et documentation",
      s4:"SÉQUENCE D'OPÉRATION STANDARD :\n1. Vérifier le plan de ballastage approuvé (stability booklet)\n2. Ouvrir vannes sélectionnées\n3. Démarrer pompe(s) de ballast\n4. Surveiller les niveaux (soundings toutes les 30 min)\n5. Vérifier stabilité (GM) en continu\n6. Arrêter à niveau requis\n7. Fermer toutes vannes\n8. Enregistrer dans le BWRB\n\nBALLAST WATER RECORD BOOK (BWRB) :\nObligatoire · Conservé 2 ans à bord\nEnregistre : dates · positions · volumes · méthodes D-1/D-2\n\nINSPECTIONS PSC :\n→ Vérification du BWRB lors de chaque escale\n→ Prélèvement d'échantillons eau de ballast possible\n→ Non-conformité = retenue du navire (detention)\n\nZONES SENSIBLES :\nUSA : USCG — norme D-2 obligatoire · approbation type requise\nAustralie : DAWE — exigences spécifiques\nCanada : Grands Lacs — restrictions très strictes",
      p5:"🎯 EXERCICES PRATIQUES PREMIUM",
      p6:"⚠️ CAS D'ACCIDENT RÉEL",
      p7:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON E6 L2",
      sumP:[
        "Citernes ballast = FP + latérales P&S + AP · capacité 20-40% PDL",
        "Voyage en lège : GM critique → ballaster pour GM > 0,15m",
        "Hogging/sagging : contraintes longitudinales → limites SF/BM",
        "Assiette optimale : légèrement piquée arrière (hélice immergée)",
        "Convention BWM 2004 — en vigueur 2017 · D-1 (échange) · D-2 (traitement)",
        "D-2 : < 10 organismes/m³ ≥50µm · BWMS obligatoire",
        "UV = méthode BWMS dominante · Électrolyse · Chimique",
        "BWRB obligatoire · 2 ans de conservation · PSC vérification",
        "MT Erika 1999 : contraintes hogging + ballast insuffisant → MARPOL 13G + EMSA",
      ],
      learnedP:[
        "Architecture citernes ballast pétrolier (FP/AP/latérales)",
        "Stabilité en lège : GM > 0,15m · hogging/sagging",
        "Convention BWM 2004 · D-1 échange · D-2 BWMS",
        "UV/électrolyse/chimique — méthodes BWMS agréées",
        "BWRB · PSC · MT Erika → MARPOL 13G",
      ],
    },
    en:{
      badge:"⚙️ Module e6 — Cargo & Oil · Lesson 2/6 · ⭐ Premium · 200 XP",
      title:"Ballast Systems — Stability in Ballast & BWMS",
      intro:"An empty tanker is not a light ship — it's a ship in danger. Without cargo, the center of gravity rises, GM drops, and structural stresses become critical. Ballast is the operational answer to this physical challenge.\n\nThis lesson covers tanker ballasting systems, the BWM Convention 2004, and BWMS obligations in force since 2017.",
      p1:"PART 1 — TANK SYSTEMS & PUMPING",s1t:"Ballast tank architecture on oil tankers",
      s1:"DEDICATED BALLAST TANKS:\nOn a modern tanker (double hull), ballast tanks occupy the space between the inner and outer hull, as well as the peaks.\n\nTYPICAL DISTRIBUTION:\n→ Fore peak (FP): forward trim control\n→ Port & Starboard lateral tanks No.1, 2, 3: transverse and longitudinal stability\n→ Aft peak (AP): aft trim control\n→ Total capacity: 20–40% of DWT\n\nPUMPING SYSTEM:\n→ Dedicated centrifugal pumps (flow: 500–3000 m³/h)\n→ Eductors (using cargo pressure) — backup\n→ Main piping + distribution manifolds\n→ Control valves: butterfly or gate valves\n\nBALLAST PLAN:\nDefined by the shipyard, validated by the classification society. Specifies admissible sequences of ballasting/deballasting for each voyage condition.",
      p2:"PART 2 — STABILITY IN BALLAST VOYAGE",s2t:"GM, structural stresses and loading plan",
      s2:"BALLAST VOYAGE:\nCritical condition: vessel returns empty to the loading port. Center of gravity G very high → low GM.\n\nBALLASTING OBJECTIVES:\n→ Maintain GM > 0.15m (minimum requirement)\n→ Immerse the propeller (efficient propulsion)\n→ Ensure maneuverability (immersed rudder)\n→ Reduce structural stresses (SF/BM)\n→ Dampen pitching and rolling\n\nLONGITUDINAL STRESSES:\nHOGGING: arch deflection — midship raised\nSAGGING: hollow deflection — midship depressed\nThe ballast plan must keep these forces within the SF/BM curve limits of the stability booklet.\n\nOPTIMAL TRIM IN BALLAST:\nSlightly by stern (0.5–1.5m)\n→ Propeller fully immersed\n→ Better propulsive efficiency\n→ Effective rudder\n→ Reduced vibrations",
      p3:"PART 3 — BWMS & BWM CONVENTION 2004",s3t:"Ballast water treatment — legal obligations",
      s3:"INVASIVE SPECIES PROBLEM:\nA large tanker takes on up to 100,000 m³ of ballast water. This water contains organisms (plankton, larvae, bacteria) capable of devastating local ecosystems upon arrival.\n\nBWM CONVENTION 2004 (IMO):\nAdopted: February 13, 2004 · In force: September 8, 2017\n\nTWO STANDARDS:\nD-1: Ballast water exchange at sea\n→ > 200 nm from land · depth > 200m\n→ Sequential or flow-through (3× volume)\n→ Minimum transitional standard\n\nD-2: BWMS Treatment (final standard)\n→ < 10 viable organisms/m³ (≥ 50µm)\n→ < 10 organisms/mL (10-50µm)\n→ Bacteriological limits (Vibrio, E.coli)\n\nBWMS CODE 2016:\nApproves 3 families of systems:\n• UV (ultraviolet) — most widespread\n• Electrolysis (active chlorine generation)\n• Chemical injection (IMO-approved biocides)",
      p4:"PART 4 — OPERATIONS & REGULATIONS",s4t:"Ballasting procedures and documentation",
      s4:"STANDARD OPERATION SEQUENCE:\n1. Check approved ballast plan (stability booklet)\n2. Open selected valves\n3. Start ballast pump(s)\n4. Monitor levels (soundings every 30 min)\n5. Monitor stability (GM) continuously\n6. Stop at required level\n7. Close all valves\n8. Record in BWRB\n\nBALLAST WATER RECORD BOOK (BWRB):\nMandatory · Kept 2 years on board\nRecords: dates · positions · volumes · D-1/D-2 methods\n\nPSC INSPECTIONS:\n→ BWRB verification at each port call\n→ Ballast water sampling possible\n→ Non-compliance = vessel detention\n\nSENSITIVE AREAS:\nUSA: USCG — D-2 mandatory · type approval required\nAustralia: DAWE — specific requirements\nCanada: Great Lakes — very strict restrictions",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",
      p6:"⚠️ REAL ACCIDENT CASE",
      p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LESSON E6 L2",
      sumP:[
        "Ballast tanks = FP + lateral P&S + AP · capacity 20-40% DWT",
        "Ballast voyage: critical GM → ballast for GM > 0.15m",
        "Hogging/sagging: longitudinal stresses → SF/BM limits",
        "Optimal trim: slightly by stern (propeller immersed)",
        "BWM Convention 2004 — in force 2017 · D-1 (exchange) · D-2 (treatment)",
        "D-2: < 10 organisms/m³ ≥50µm · BWMS mandatory",
        "UV = dominant BWMS method · Electrolysis · Chemical",
        "BWRB mandatory · 2 years retention · PSC verification",
        "MT Erika 1999: hogging stresses + insufficient ballast → MARPOL 13G + EMSA",
      ],
      learnedP:[
        "Tanker ballast tank architecture (FP/AP/lateral)",
        "Stability in ballast: GM > 0.15m · hogging/sagging",
        "BWM Convention 2004 · D-1 exchange · D-2 BWMS",
        "UV/electrolysis/chemical — approved BWMS methods",
        "BWRB · PSC · MT Erika → MARPOL 13G",
      ],
    },
    es:{
      badge:"⚙️ Módulo e6 — Carga & Petróleo · Lección 2/6 · ⭐ Premium · 200 XP",
      title:"Sistemas de Lastraje — Estabilidad en Lastre & BWMS",
      intro:"Un petrolero vacío no es un buque ligero — es un buque en peligro. Sin carga, el centro de gravedad sube, el GM cae, y los esfuerzos estructurales se vuelven críticos. El lastre es la respuesta operativa a este desafío físico.\n\nEsta lección cubre los sistemas de lastraje de petroleros, el Convenio BWM 2004 y las obligaciones BWMS en vigor desde 2017.",
      p1:"PARTE 1 — SISTEMAS DE TANQUES & BOMBEO",s1t:"Arquitectura de tanques de lastre en petroleros",
      s1:"TANQUES DEDICADOS AL LASTRE:\nEn un petrolero moderno (doble casco), los tanques de lastre ocupan el espacio entre el casco interior y exterior.\n\nDISTRIBUCIÓN TÍPICA:\n→ Pique proa (FP): control asiento proa\n→ Tanques laterales B&Er N°1, 2, 3\n→ Pique popa (AP): control asiento popa\n→ Capacidad total: 20-40% del PDM\n\nSISTEMA DE BOMBEO:\n→ Bombas centrífugas dedicadas (caudal: 500-3000 m³/h)\n→ Eyectores (presión carga) — emergencia\n→ PLAN DE LASTRAJE: secuencias admisibles definidas por el astillero",
      p2:"PARTE 2 — ESTABILIDAD EN VIAJE EN LASTRE",s2t:"GM, esfuerzos estructurales y plan de carga",
      s2:"VIAJE EN LASTRE:\nCondición crítica: el buque regresa vacío. G muy alto → GM bajo.\n\nOBJETIVOS:\n→ Mantener GM > 0,15m · Sumergir la hélice · Asegurar maniobra\n→ Reducir esfuerzos SF/BM · Amortiguar movimientos\n\nEFUERZOS LONGITUDINALES:\nHOGGING: flexión en arco — centro levantado\nSAGGING: flexión cóncava — centro deprimido\n\nASIENTO ÓPTIMO EN LASTRE:\nLigeramente apopado (0,5-1,5m) → hélice sumergida",
      p3:"PARTE 3 — BWMS & CONVENIO BWM 2004",s3t:"Tratamiento del agua de lastre — obligaciones legales",
      s3:"PROBLEMA DE ESPECIES INVASORAS:\nUn gran petrolero puede tomar hasta 100.000 m³ de agua de lastre con organismos invasores.\n\nCONVENIO BWM 2004 (OMI):\nAdoptado: 13/02/2004 · En vigor: 08/09/2017\n\nNORMA D-1: Intercambio en alta mar (> 200 mn, > 200m)\nNORMA D-2: Tratamiento BWMS\n→ < 10 organismos viables/m³ (≥ 50µm)\n\nBWMS CODE 2016: UV · Electrólisis · Químico",
      p4:"PARTE 4 — OPERACIONES & REGLAMENTACIÓN",s4t:"Procedimientos de lastraje y documentación",
      s4:"SECUENCIA ESTÁNDAR:\n1. Verificar plan de lastraje aprobado\n2. Abrir válvulas seleccionadas\n3. Arrancar bomba(s)\n4. Monitorear niveles (sondeos c/30 min)\n5. Parar al nivel requerido · Cerrar válvulas · Registrar en BWRB\n\nBWRB: Obligatorio · 2 años a bordo · Inspección PSC\n\nZONAS SENSIBLES: USA (USCG D-2) · Australia (DAWE) · Canadá (Grandes Lagos)",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN E6 L2",
      sumP:["Tanques lastre = FP + laterales B&Er + AP · 20-40% PDM","Viaje en lastre: GM crítico → GM > 0,15m","Hogging/sagging: esfuerzos longitudinales → límites SF/BM","Asiento óptimo: ligeramente apopado (hélice sumergida)","Convenio BWM 2004 · D-1 intercambio · D-2 tratamiento","D-2: < 10 organismos/m³ · BWMS obligatorio","UV · Electrólisis · Químico — métodos BWMS","BWRB obligatorio · 2 años · PSC · MT Erika → MARPOL 13G"],
      learnedP:["Arquitectura tanques lastre (FP/AP/laterales)","Estabilidad en lastre: GM>0,15m · hogging/sagging","Convenio BWM 2004 · D-1 · D-2 BWMS","UV/electrólisis/químico — métodos aprobados","BWRB · PSC · MT Erika → MARPOL 13G"],
    },
    pt:{
      badge:"⚙️ Módulo e6 — Carga & Petróleo · Lição 2/6 · ⭐ Premium · 200 XP",
      title:"Sistemas de Lastro — Estabilidade a Vazio & BWMS",
      intro:"Um petroleiro vazio não é um navio leve — é um navio em perigo. Sem carga, o centro de gravidade sobe, o GM cai, e os esforços estruturais tornam-se críticos. O lastro é a resposta operacional a este desafio físico.\n\nEsta lição cobre os sistemas de lastro de petroleiros, a Convenção BWM 2004 e as obrigações BWMS em vigor desde 2017.",
      p1:"PARTE 1 — SISTEMAS DE TANQUES & BOMBAGEM",s1t:"Arquitetura dos tanques de lastro em petroleiros",
      s1:"TANQUES DEDICADOS AO LASTRO:\nEm petroleiros modernos (duplo casco), os tanques de lastro ocupam o espaço entre o casco interior e exterior.\n\nDISTRIBUIÇÃO TÍPICA:\n→ Pique de vante (FP): controlo trim vante\n→ Tanques laterais BB&EB N°1, 2, 3\n→ Pique de ré (AP): controlo trim ré\n→ Capacidade total: 20-40% do PPB\n\nSISTEMA DE BOMBAGEM:\n→ Bombas centrífugas dedicadas (caudal: 500-3000 m³/h)\n→ Ejetores — emergência\n→ PLANO DE LASTRO: sequências admissíveis definidas pelo estaleiro",
      p2:"PARTE 2 — ESTABILIDADE EM VIAGEM A VAZIO",s2t:"GM, esforços estruturais e plano de carga",
      s2:"VIAGEM EM LASTRO:\nCondição crítica: o navio regressa vazio. G muito alto → GM baixo.\n\nOBJETIVOS:\n→ Manter GM > 0,15m · Imergir a hélice · Assegurar manobra\n→ Reduzir esforços SF/BM · Amortecer movimentos\n\nESFORÇOS LONGITUDINAIS:\nHOGGING: flexão em arco — meia-nau levantada\nSAGGING: flexão côncava — meia-nau deprimida\n\nTRIM ÓTIMO EM LASTRO:\nLigeiramente apopado (0,5-1,5m) → hélice imersa",
      p3:"PARTE 3 — BWMS & CONVENÇÃO BWM 2004",s3t:"Tratamento da água de lastro — obrigações legais",
      s3:"PROBLEMA DAS ESPÉCIES INVASORAS:\nUm grande petroleiro pode embarcar até 100.000 m³ de água de lastro com organismos invasores.\n\nCONVENÇÃO BWM 2004 (OMI):\nAdotada: 13/02/2004 · Em vigor: 08/09/2017\n\nNORMA D-1: Troca em alto mar (> 200 mn, > 200m)\nNORMA D-2: Tratamento BWMS\n→ < 10 organismos viáveis/m³ (≥ 50µm)\n\nBWMS CODE 2016: UV · Eletrólise · Químico",
      p4:"PARTE 4 — OPERAÇÕES & REGULAMENTAÇÃO",s4t:"Procedimentos de lastro e documentação",
      s4:"SEQUÊNCIA PADRÃO:\n1. Verificar plano de lastro aprovado\n2. Abrir válvulas selecionadas\n3. Arrancar bomba(s)\n4. Monitorar níveis (sondagens c/30 min)\n5. Parar ao nível requerido · Fechar válvulas · Registar no BWRB\n\nBWRB: Obrigatório · 2 anos a bordo · Inspeção PSC\n\nZONAS SENSÍVEIS: EUA (USCG D-2) · Austrália (DAWE) · Canadá (Grandes Lagos)",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO E6 L2",
      sumP:["Tanques lastro = FP + laterais BB&EB + AP · 20-40% PPB","Viagem em lastro: GM crítico → GM > 0,15m","Hogging/sagging: esforços longitudinais → limites SF/BM","Trim ótimo: ligeiramente apopado (hélice imersa)","Convenção BWM 2004 · D-1 troca · D-2 tratamento","D-2: < 10 organismos/m³ · BWMS obrigatório","UV · Eletrólise · Químico — métodos BWMS","BWRB obrigatório · 2 anos · PSC · MT Erika → MARPOL 13G"],
      learnedP:["Arquitetura tanques lastro (FP/AP/laterais)","Estabilidade em lastro: GM>0,15m · hogging/sagging","Convenção BWM 2004 · D-1 · D-2 BWMS","UV/eletrólise/químico — métodos aprovados","BWRB · PSC · MT Erika → MARPOL 13G"],
    },
  };
  return d[lang] || d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t = T[lang] || T.fr;
  const quiz = QUIZ[lang] || QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* HEADER */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.blue2}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.blue2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue},${C.teal})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* CONTENT SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            {/* SECTION 1 */}
            <SL icon="🛢️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>🛢️</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span>
              </div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🛢️ {lang==="fr"?"CITERNE BALLAST — REMPLISSAGE/VIDANGE":lang==="en"?"BALLAST TANK — FILL/DRAIN":lang==="es"?"TANQUE LASTRE — LLENADO/VACIADO":"TANQUE LASTRO — ENCHER/ESVAZIAR"}
              </div>
              <BallastTankSVG lang={lang}/>
            </Card>

            {/* SECTION 2 */}
            <SL icon="⚖️" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>⚖️</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span>
              </div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                ⚖️ {lang==="fr"?"GM vs BALLAST — INTERACTIF":lang==="en"?"GM vs BALLAST — INTERACTIVE":lang==="es"?"GM vs LASTRE — INTERACTIVO":"GM vs LASTRO — INTERATIVO"}
              </div>
              <GMBallastSVG lang={lang}/>
            </Card>

            {/* SECTION 3 */}
            <SL icon="🌊" text={lc.p3} color={C.cyan}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>🌊</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span>
              </div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.cyan}33`}}>
              <div style={{fontSize:11,color:C.cyan,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🌊 {lang==="fr"?"BWMS — TRAITEMENT EAU BALLAST":lang==="en"?"BWMS — BALLAST WATER TREATMENT":lang==="es"?"BWMS — TRATAMIENTO AGUA LASTRE":"BWMS — TRATAMENTO ÁGUA LASTRO"}
              </div>
              <BWMSSVG lang={lang}/>
            </Card>

            {/* SECTION 4 */}
            <SL icon="📋" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>📋</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span>
              </div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                📋 {lang==="fr"?"PLAN DE BALLASTAGE PÉTROLIER":lang==="en"?"OIL TANKER BALLAST PLAN":lang==="es"?"PLAN DE LASTRAJE PETROLERO":"PLANO DE LASTRO PETROLEIRO"}
              </div>
              <BallastPlanSVG lang={lang}/>
            </Card>

            {/* EXERCISE */}
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <Exercise1 lang={lang} t={t}/>
            </Card>

            {/* ACCIDENT */}
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            {/* QUESTION BANK */}
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}>
              <QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/>
            </Card>

            {/* SUMMARY */}
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.blue2,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Systèmes de Ballastage":lang==="en"?"Quiz — Ballast Systems":lang==="es"?"Quiz — Sistemas de Lastraje":"Quiz — Sistemas de Lastro"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"questões"} · {lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.blue2,fontWeight:700}}>
                +{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.blue2,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — IGS →":lang==="en"?"LESSON 3 — IGS →":lang==="es"?"LECCIÓN 3 — IGS →":"LIÇÃO 3 — IGS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
