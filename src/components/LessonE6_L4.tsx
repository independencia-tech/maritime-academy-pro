import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f", cyan:"#00bcd4", brown:"#795548",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e6 — Cargaison & Pétrole", xp:"XP gagnés", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e6 — Cargo & Oil", xp:"XP earned", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganados", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganhos", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

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
// SVG 1 — COW NOZZLE MACHINE
// ══════════════════════════════════════
function COWNozzleSVG({ lang }) {
  const [angle, setAngle] = useState(0);
  const [pressure, setPressure] = useState(8);
  const [running, setRunning] = useState(false);

  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setAngle(a => (a + 3) % 360);
    }, 40);
    return () => clearInterval(id);
  }, [running]);

  const W = 290, H = 195;
  const cx = 145, cy = 110;
  const nozzleLen = 55;

  // Two jets at 180° from each other
  const jets = [0, 180].map(offset => {
    const rad = ((angle + offset) * Math.PI) / 180;
    const x1 = cx + 12 * Math.cos(rad);
    const y1 = cy + 12 * Math.sin(rad);
    const x2 = cx + nozzleLen * Math.cos(rad);
    const y2 = cy + nozzleLen * Math.sin(rad);
    // Spray cone
    const spread = 0.25;
    const rad1 = rad - spread;
    const rad2 = rad + spread;
    const sprayLen = nozzleLen + (pressure - 4) * 5;
    const sx1 = cx + sprayLen * Math.cos(rad1);
    const sy1 = cy + sprayLen * Math.sin(rad1);
    const sx2 = cx + sprayLen * Math.cos(rad2);
    const sy2 = cy + sprayLen * Math.sin(rad2);
    return { x1, y1, x2, y2, sx1, sy1, sx2, sy2, ex:x2, ey:y2 };
  });

  // Tank walls (circle)
  const tankR = 82;

  // Oil residue on walls — reduced when running
  const oilOpacity = running ? Math.max(0.1, 0.6 - (angle % 360) / 600) : 0.6;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Tank circle */}
        <circle cx={cx} cy={cy} r={tankR} fill="rgba(13,31,60,0.7)" stroke={C.steel} strokeWidth="2"/>
        {/* Oil residue on walls */}
        <circle cx={cx} cy={cy} r={tankR-2} fill="none"
          stroke={C.brown} strokeWidth="8" opacity={oilOpacity}/>
        {/* Oil label */}
        <text x={cx} y={cy-tankR+18} textAnchor="middle" fontSize="7" fill={C.brown} opacity={oilOpacity} fontWeight="700">
          {lbl("Residus petrole","Oil residues","Residuos petroleo","Residuos petroleo")}
        </text>
        {/* Jets */}
        {jets.map((j, i) => (
          <g key={i}>
            {/* Nozzle arm */}
            <line x1={cx} y1={cy} x2={j.x2} y2={j.y2}
              stroke={C.steel} strokeWidth="4" strokeLinecap="round"/>
            {/* Spray cone */}
            {running && (
              <path d={`M${j.ex.toFixed(1)},${j.ey.toFixed(1)} L${j.sx1.toFixed(1)},${j.sy1.toFixed(1)} L${j.sx2.toFixed(1)},${j.sy2.toFixed(1)} Z`}
                fill={C.brown} opacity="0.35"/>
            )}
            {/* Jet line */}
            {running && (
              <line x1={j.ex} y1={j.ey} x2={j.sx1+(j.sx2-j.sx1)/2} y2={j.sy1+(j.sy2-j.sy1)/2}
                stroke={C.orange} strokeWidth="1.5" opacity="0.7" strokeDasharray="4,2"/>
            )}
          </g>
        ))}
        {/* Central hub */}
        <circle cx={cx} cy={cy} r={12} fill="rgba(69,90,100,0.8)" stroke={C.steel} strokeWidth="2"/>
        <circle cx={cx} cy={cy} r={5} fill={running ? C.orange : C.steel}/>
        {/* Rotation indicator */}
        {running && (
          <text x={cx} y={cy-tankR-10} textAnchor="middle" fontSize="7.5" fill={C.orange} fontWeight="700">
            {lbl("En rotation","Rotating","En rotacion","Em rotacao")} {Math.round(pressure*12)}{lbl(" tr/min"," rpm"," rpm"," rpm")}
          </text>
        )}
        {/* Pressure label */}
        <rect x={W-68} y={8} width={60} height={28} rx="5" fill="rgba(0,0,0,0.6)" stroke={C.orange} strokeWidth="0.8"/>
        <text x={W-38} y={19} textAnchor="middle" fontSize="7" fill={C.orange} fontWeight="700">
          {lbl("Pression","Pressure","Presion","Pressao")}
        </text>
        <text x={W-38} y={30} textAnchor="middle" fontSize="9" fill={C.orange} fontWeight="700">{pressure} bar</text>
        {/* Clean indicator */}
        {running && (
          <text x={cx} y={H-8} textAnchor="middle" fontSize="7" fill={C.green}>
            {lbl("Nettoyage en cours...","Cleaning in progress...","Limpieza en curso...","Limpeza em andamento...")}
          </text>
        )}
        {!running && (
          <text x={cx} y={H-8} textAnchor="middle" fontSize="7" fill={C.muted}>
            {lbl("Buse arretee - residus sur les parois","Nozzle stopped - residues on walls","Boquilla parada - residuos en paredes","Bocal parado - residuos nas paredes")}
          </text>
        )}
      </svg>
      {/* Controls */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        <button onClick={()=>setRunning(v=>!v)}
          style={{padding:"10px",borderRadius:12,background:running?`rgba(192,57,43,0.25)`:`rgba(30,138,74,0.2)`,border:`1px solid ${running?C.red:C.green}55`,color:running?C.red:C.green,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          {running ? lbl("⏹ STOP COW","⏹ STOP COW","⏹ STOP COW","⏹ STOP COW") : lbl("▶ DEMARRER COW","▶ START COW","▶ INICIAR COW","▶ INICIAR COW")}
        </button>
        <div>
          <div style={{fontSize:9,color:C.orange,marginBottom:3,fontWeight:600,textAlign:"center"}}>
            {lbl("Pression","Pressure","Presion","Pressao")}: {pressure} bar
          </div>
          <input type="range" min={4} max={14} step={0.5} value={pressure}
            onChange={e=>setPressure(Number(e.target.value))}
            style={{width:"100%",accentColor:C.orange}}/>
        </div>
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,
        background:running?"rgba(30,138,74,0.1)":"rgba(69,90,100,0.15)",
        border:`1px solid ${running?C.green:C.steel}33`,fontSize:10,
        color:running?C.green:C.muted,textAlign:"center"}}>
        {running
          ? lbl("Buse COW en rotation - jets a " + pressure + " bar - dissolution des residus","COW nozzle rotating - jets at " + pressure + " bar - dissolving residues","Boquilla COW rotando - chorros a " + pressure + " bar","Bocal COW rodando - jactos a " + pressure + " bar")
          : lbl("Pression nominale COW: 8-10 bar - Vitesse rotation: 1-4 tr/min","Nominal COW pressure: 8-10 bar - Rotation speed: 1-4 rpm","Presion nominal COW: 8-10 bar - Velocidad: 1-4 rpm","Pressao nominal COW: 8-10 bar - Velocidade: 1-4 rpm")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — COW OPERATION CYCLE
// ══════════════════════════════════════
function COWCycleSVG({ lang }) {
  const [phase, setPhase] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const phases = [
    {
      icon:"🌡️", color:C.orange,
      title:{ fr:"1. Prechauffage cargo", en:"1. Cargo preheating", es:"1. Precalentamiento carga", pt:"1. Pre-aquecimento carga" },
      temp:55, pct:100,
      desc:{ fr:"Le brut est chauffe a 55-60°C via les serpentins vapeur. A cette temperature, la viscosite diminue et les residus se dissolvent mieux dans le brut chaud.",
             en:"Crude is heated to 55-60°C via steam heating coils. At this temperature, viscosity drops and residues dissolve better in hot crude.",
             es:"El crudo se calienta a 55-60°C via serpentines de vapor. A esta temperatura, la viscosidad baja y los residuos se disuelven mejor.",
             pt:"O crude e aquecido a 55-60°C via serpentinas de vapor. A esta temperatura, a viscosidade diminui e os residuos dissolvem-se melhor." }
    },
    {
      icon:"🔄", color:C.brown,
      title:{ fr:"2. Pompage initial", en:"2. Initial pumping", es:"2. Bombeo inicial", pt:"2. Bombagem inicial" },
      temp:56, pct:75,
      desc:{ fr:"Les pompes cargo dechargent le brut principal. Quand le niveau atteint 75%, on commence le COW pour utiliser le brut chaud encore disponible comme solvant.",
             en:"Cargo pumps discharge the main crude. When level reaches 75%, COW begins to use the remaining hot crude as solvent.",
             es:"Las bombas de carga descargan el crudo principal. Al 75%, comienza el COW usando el crudo caliente restante como solvente.",
             pt:"As bombas de carga descarregam o crude principal. Ao atingir 75%, inicia-se o COW usando o crude quente restante como solvente." }
    },
    {
      icon:"💦", color:C.rust,
      title:{ fr:"3. Lavage COW actif", en:"3. Active COW washing", es:"3. Lavado COW activo", pt:"3. Lavagem COW ativa" },
      temp:57, pct:30,
      desc:{ fr:"Les buses COW tournent et projettent du brut chaud sous pression sur toutes les parois et cloisons. Les residus (wax, paraffines) se dissolvent et tombent au fond.",
             en:"COW nozzles rotate and spray hot crude under pressure on all surfaces and bulkheads. Residues (wax, paraffins) dissolve and fall to the bottom.",
             es:"Las boquillas COW rotan y proyectan crudo caliente a presion sobre todas las superficies y mamparos. Los residuos se disuelven y caen al fondo.",
             pt:"Os bocais COW rodam e projectam crude quente sob pressao em todas as superficies e anteparas. Os residuos dissolvem-se e caem ao fundo." }
    },
    {
      icon:"⬇️", color:C.teal,
      title:{ fr:"4. Drainage residus", en:"4. Residue drainage", es:"4. Drenaje residuos", pt:"4. Drenagem de residuos" },
      temp:55, pct:8,
      desc:{ fr:"Le melange brut+residus dissous est aspire par la pompe cargo de fond (stripping). Le fond (bottom) est completement nettoye avant deballastage.",
             en:"The crude+dissolved residue mixture is pumped out by the bottom stripping pump. The tank bottom is completely cleaned before ballasting.",
             es:"La mezcla crudo+residuos disueltos es aspirada por la bomba de achique (stripping). El fondo queda completamente limpio antes del lastraje.",
             pt:"A mistura crude+residuos dissolvidos e aspirada pela bomba de fundo (stripping). O fundo fica completamente limpo antes do lastro." }
    },
    {
      icon:"✅", color:C.green,
      title:{ fr:"5. Citerne propre", en:"5. Clean tank", es:"5. Tanque limpio", pt:"5. Tanque limpo" },
      temp:25, pct:2,
      desc:{ fr:"Citerne propre: residus < 0.4% du volume total (norme MARPOL Annexe I). Prete pour ballastage, inspection ou prochaine cargaison. COW reduit la pollution de 70%.",
             en:"Clean tank: residues < 0.4% of total volume (MARPOL Annex I standard). Ready for ballasting, inspection or next cargo. COW reduces pollution by 70%.",
             es:"Tanque limpio: residuos < 0.4% del volumen total (norma MARPOL Anexo I). Listo para lastraje, inspeccion o proxima carga. COW reduce contaminacion 70%.",
             pt:"Tanque limpo: residuos < 0.4% do volume total (norma MARPOL Anexo I). Pronto para lastro, inspecao ou proxima carga. COW reduz poluicao 70%." }
    },
  ];

  const cur = phases[phase];
  const W = 290, H = 160;

  // Tank fill visualization
  const tankH = 80;
  const tankY = 50;
  const fillH = (cur.pct / 100) * tankH;
  const fillY = tankY + tankH - fillH;
  const fillColor = cur.pct > 50 ? C.brown : cur.pct > 15 ? C.rust : C.teal;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Phase tabs */}
        {phases.map((p,i) => (
          <g key={i} style={{cursor:"pointer"}} onClick={()=>setPhase(i)}>
            <rect x={8+i*55} y={8} width={49} height={26} rx="5"
              fill={phase===i?`${p.color}30`:"rgba(13,31,60,0.6)"}
              stroke={phase===i?p.color:`${p.color}33`} strokeWidth={phase===i?1.5:1}/>
            <text x={8+i*55+24} y={17} textAnchor="middle" fontSize="11">{p.icon}</text>
            <text x={8+i*55+24} y={28} textAnchor="middle" fontSize="5.5" fill={phase===i?p.color:C.muted}>{i+1}</text>
          </g>
        ))}
        {/* Tank schematic */}
        <rect x={20} y={tankY} width={80} height={tankH} rx="5"
          fill="rgba(13,31,60,0.7)" stroke={C.steel} strokeWidth="1.5"/>
        {/* Fill */}
        {cur.pct > 0 && (
          <rect x={21} y={fillY} width={78} height={fillH} rx="3"
            fill={fillColor} opacity="0.6"/>
        )}
        {/* COW nozzle (active in phase 2) */}
        {phase === 2 && (
          <g>
            <circle cx={60} cy={fillY+8} r={5} fill={C.orange} opacity="0.8"/>
            <line x1={60} y1={fillY+8} x2={85} y2={fillY-5} stroke={C.orange} strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
            <line x1={60} y1={fillY+8} x2={35} y2={fillY-5} stroke={C.orange} strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
          </g>
        )}
        {/* Level labels */}
        <text x={108} y={fillY+4} fontSize="7" fill={fillColor} fontWeight="700">{cur.pct}%</text>
        <text x={20} y={tankY-4} fontSize="6.5" fill={C.muted}>
          {lbl("Citerne","Tank","Tanque","Tanque")}
        </text>
        {/* Temperature gauge */}
        <rect x={130} y={tankY} width={18} height={tankH} rx="4"
          fill="rgba(0,0,0,0.5)" stroke={C.steel} strokeWidth="1"/>
        <rect x={131} y={tankY + tankH - (cur.temp/70)*tankH} width={16} height={(cur.temp/70)*tankH} rx="3"
          fill={cur.temp > 50 ? C.red : C.orange} opacity="0.7"/>
        <text x={139} y={tankY-4} fontSize="6" fill={C.muted} textAnchor="middle">T°</text>
        <text x={139} y={tankY+tankH+10} fontSize="7" fill={cur.temp>50?C.red:C.orange} textAnchor="middle" fontWeight="700">{cur.temp}°C</text>
        {/* Phase info */}
        <rect x={158} y={tankY} width={122} height={tankH} rx="6"
          fill={`${cur.color}10`} stroke={`${cur.color}44`} strokeWidth="1"/>
        <text x={219} y={tankY+18} textAnchor="middle" fontSize="13">{cur.icon}</text>
        <text x={219} y={tankY+32} textAnchor="middle" fontSize="7" fill={cur.color} fontWeight="700">
          {lbl(cur.title.fr,cur.title.en,cur.title.es,cur.title.pt).replace(/\d+\.\s/,"")}
        </text>
        <text x={219} y={tankY+46} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {lbl("Niveau","Level","Nivel","Nivel")}: {cur.pct}% | {cur.temp}°C
        </text>
        {/* Navigation hint */}
        <text x={W/2} y={H-6} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {phase+1}/5
        </text>
      </svg>
      {/* Description */}
      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${cur.color}12`,border:`1px solid ${cur.color}44`,fontSize:11,color:C.white,lineHeight:1.65}}>
        {lbl(cur.desc.fr,cur.desc.en,cur.desc.es,cur.desc.pt)}
      </div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        <button onClick={()=>setPhase(p=>Math.max(0,p-1))}
          style={{flex:1,padding:"8px",borderRadius:10,background:"rgba(69,90,100,0.2)",border:`1px solid ${C.steel}44`,color:C.muted,fontSize:11,cursor:"pointer"}}>
          {lbl("< Prec.","< Prev","< Ant.","< Ant.")}
        </button>
        <button onClick={()=>setPhase(p=>Math.min(4,p+1))}
          style={{flex:1,padding:"8px",borderRadius:10,background:`${cur.color}15`,border:`1px solid ${cur.color}44`,color:cur.color,fontSize:11,cursor:"pointer"}}>
          {lbl("Suiv. >","Next >","Sig. >","Seg. >")}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TANK COVERAGE PLAN
// ══════════════════════════════════════
function COWCoverageSVG({ lang }) {
  const [tankStatus, setTankStatus] = useState({
    p1:0, s1:0, p2:0, s2:0, p3:0, s3:0, slop:0,
  });
  const [selected, setSelected] = useState(null);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const tanks = [
    { id:"p1", x:190, y:22, w:70, h:30, label:"P1 COW",
      name:{ fr:"Citerne P N1 - Tribord", en:"P Tank N1 - Port", es:"Tanque B N1", pt:"Tanque BB N1" } },
    { id:"s1", x:190, y:58, w:70, h:30, label:"S1 COW",
      name:{ fr:"Citerne S N1 - Babord", en:"S Tank N1 - Stbd", es:"Tanque Er N1", pt:"Tanque EB N1" } },
    { id:"p2", x:112, y:22, w:70, h:30, label:"P2 COW",
      name:{ fr:"Citerne P N2", en:"P Tank N2", es:"Tanque B N2", pt:"Tanque BB N2" } },
    { id:"s2", x:112, y:58, w:70, h:30, label:"S2 COW",
      name:{ fr:"Citerne S N2", en:"S Tank N2", es:"Tanque Er N2", pt:"Tanque EB N2" } },
    { id:"p3", x:38, y:22, w:66, h:30, label:"P3 COW",
      name:{ fr:"Citerne P N3", en:"P Tank N3", es:"Tanque B N3", pt:"Tanque BB N3" } },
    { id:"s3", x:38, y:58, w:66, h:30, label:"S3 COW",
      name:{ fr:"Citerne S N3", en:"S Tank N3", es:"Tanque Er N3", pt:"Tanque EB N3" } },
    { id:"slop", x:38, y:95, w:222, h:28, label:"SLOP",
      name:{ fr:"Citerne slop (residus COW)", en:"Slop tank (COW residues)", es:"Tanque slop (residuos COW)", pt:"Tanque slop (residuos COW)" } },
  ];

  const cycleStatus = (id) => {
    setTankStatus(prev => ({...prev, [id]: (prev[id]+1) % 4}));
    setSelected(id);
  };

  const statusColor = [C.steel, C.orange, C.rust, C.green];
  const statusLabel = {
    fr:["En attente","COW en cours","Drainage","Propre ✓"],
    en:["Waiting","COW active","Draining","Clean ✓"],
    es:["En espera","COW activo","Drenaje","Limpio ✓"],
    pt:["Aguardando","COW ativo","Drenagem","Limpo ✓"],
  };
  const sl = statusLabel[lang] || statusLabel.fr;

  const totalDone = Object.values(tankStatus).filter(v=>v===3).length;
  const totalTanks = tanks.length;

  return (
    <div>
      <svg width={290} height={135} viewBox="0 0 290 135">
        <rect width={290} height={135} fill="#061020" rx="8"/>
        {/* Title */}
        <text x={145} y={14} textAnchor="middle" fontSize="7.5" fill={C.brown} fontWeight="700">
          {lbl("PLAN COW - COUVERTURE CITERNES","COW PLAN - TANK COVERAGE","PLAN COW - COBERTURA TANQUES","PLANO COW - COBERTURA TANQUES")}
        </text>
        {/* Ship outline */}
        <path d="M10,110 L10,18 L268,18 L282,55 L268,92 L10,92" fill="none" stroke={C.steel} strokeWidth="1" opacity="0.4"/>
        {/* Tanks */}
        {tanks.map(t => {
          const st = tankStatus[t.id];
          const col = statusColor[st];
          const isSel = selected === t.id;
          return (
            <g key={t.id} style={{cursor:"pointer"}} onClick={()=>cycleStatus(t.id)}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="4"
                fill={`${col}20`} stroke={isSel?C.gold:col} strokeWidth={isSel?1.8:1}/>
              <text x={t.x+t.w/2} y={t.y+t.h/2-3} textAnchor="middle" fontSize="6.5" fill={col} fontWeight="700">
                {t.label}
              </text>
              <text x={t.x+t.w/2} y={t.y+t.h/2+8} textAnchor="middle" fontSize="6" fill={col} opacity="0.9">
                {sl[st]}
              </text>
            </g>
          );
        })}
        {/* Progress bar */}
        <rect x={10} y={118} width={270} height={10} rx="4" fill="rgba(0,0,0,0.5)"/>
        <rect x={10} y={118} width={270*(totalDone/totalTanks)} height={10} rx="4" fill={C.green} opacity="0.7"/>
        <text x={145} y={126} textAnchor="middle" fontSize="6.5" fill={C.white} fontWeight="700">
          {lbl("Progression COW","COW Progress","Progreso COW","Progresso COW")}: {totalDone}/{totalTanks}
        </text>
      </svg>
      <div style={{marginTop:6,padding:"7px 10px",borderRadius:8,background:"rgba(0,0,0,0.3)",border:`1px solid ${C.border}`,fontSize:9,color:C.gold2,textAlign:"center"}}>
        {lbl("Toucher une citerne pour changer son etat COW","Tap a tank to change its COW status","Tocar un tanque para cambiar su estado COW","Tocar um tanque para mudar o estado COW")}
      </div>
      {selected && (
        <div style={{marginTop:6,padding:"8px 10px",borderRadius:8,background:`${statusColor[tankStatus[selected]]}12`,border:`1px solid ${statusColor[tankStatus[selected]]}33`,fontSize:10,color:statusColor[tankStatus[selected]]}}>
          {tanks.find(t=>t.id===selected) && lbl(
            tanks.find(t=>t.id===selected).name.fr,
            tanks.find(t=>t.id===selected).name.en,
            tanks.find(t=>t.id===selected).name.es,
            tanks.find(t=>t.id===selected).name.pt,
          )}: <strong>{sl[tankStatus[selected]]}</strong>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — COW OPERATIONAL PARAMETERS
// ══════════════════════════════════════
function COWParamsSVG({ lang }) {
  const [pressure, setPressure] = useState(9);
  const [temp, setTemp] = useState(55);
  const [duration, setDuration] = useState(4);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const pressOk = pressure >= 8 && pressure <= 12;
  const tempOk = temp >= 50 && temp <= 65;
  const durOk = duration >= 3;

  const efficiency = Math.round(
    ((pressOk ? 40 : pressure < 8 ? pressure/8*40 : 35) +
     (tempOk ? 35 : temp < 50 ? temp/50*35 : 30) +
     (duration >= 6 ? 25 : duration/6*25))
  );

  const effColor = efficiency >= 85 ? C.green : efficiency >= 60 ? C.orange : C.red;
  const W = 290, H = 170;

  const gauges = [
    { label:lbl("Pression","Pressure","Presion","Pressao"), unit:"bar", val:pressure, min:4, max:16,
      set:setPressure, ok:pressOk, optMin:8, optMax:12, color:C.orange,
      warn:lbl("< 8 bar: nettoyage insuffisant","< 8 bar: insufficient cleaning","< 8 bar: limpieza insuficiente","< 8 bar: limpeza insuficiente") },
    { label:lbl("Temperature","Temperature","Temperatura","Temperatura"), unit:"°C", val:temp, min:30, max:80,
      set:setTemp, ok:tempOk, optMin:50, optMax:65, color:C.red,
      warn:lbl("< 50°C: viscosite trop haute","< 50°C: viscosity too high","< 50°C: viscosidad demasiado alta","< 50°C: viscosidade elevada") },
    { label:lbl("Duree","Duration","Duracion","Duracao"), unit:"h", val:duration, min:1, max:10,
      set:setDuration, ok:durOk, optMin:3, optMax:8, color:C.teal,
      warn:lbl("< 3h: couverture incomplete","< 3h: incomplete coverage","< 3h: cobertura incompleta","< 3h: cobertura incompleta") },
  ];

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Title */}
        <text x={W/2} y={14} textAnchor="middle" fontSize="8" fill={C.brown} fontWeight="700">
          {lbl("PARAMETRES COW - EFFICACITE","COW PARAMETERS - EFFICIENCY","PARAMETROS COW - EFICIENCIA","PARAMETROS COW - EFICIENCIA")}
        </text>
        {/* Gauges */}
        {gauges.map((g,i) => {
          const gx = 20 + i * 90;
          const barH = 80;
          const barY = 28;
          const fillH = ((g.val - g.min) / (g.max - g.min)) * barH;
          const optY1 = barY + barH - ((g.optMax - g.min) / (g.max - g.min)) * barH;
          const optY2 = barY + barH - ((g.optMin - g.min) / (g.max - g.min)) * barH;
          return (
            <g key={i}>
              {/* Gauge bar background */}
              <rect x={gx+20} y={barY} width={22} height={barH} rx="5"
                fill="rgba(0,0,0,0.5)" stroke={C.steel} strokeWidth="1"/>
              {/* Optimal zone */}
              <rect x={gx+21} y={optY1} width={20} height={optY2-optY1} rx="3"
                fill={C.green} opacity="0.2"/>
              {/* Fill */}
              <rect x={gx+21} y={barY+barH-fillH} width={20} height={fillH} rx="4"
                fill={g.ok?g.color:C.red} opacity="0.75"/>
              {/* Value */}
              <text x={gx+31} y={barY+barH+12} textAnchor="middle" fontSize="8"
                fill={g.ok?g.color:C.red} fontWeight="700">{g.val}{g.unit}</text>
              {/* Label */}
              <text x={gx+31} y={barY+barH+22} textAnchor="middle" fontSize="6" fill={C.muted}>{g.label}</text>
              {/* OK indicator */}
              <text x={gx+31} y={barY-4} textAnchor="middle" fontSize="8">{g.ok?"✅":"⚠️"}</text>
            </g>
          );
        })}
        {/* Efficiency meter */}
        <rect x={20} y={140} width={250} height={20} rx="6" fill="rgba(0,0,0,0.5)" stroke={effColor} strokeWidth="1"/>
        <rect x={21} y={141} width={248*(efficiency/100)} height={18} rx="5"
          fill={effColor} opacity="0.5"/>
        <text x={145} y={153} textAnchor="middle" fontSize="8" fill={effColor} fontWeight="700">
          {lbl("Efficacite COW","COW Efficiency","Eficiencia COW","Eficiencia COW")}: {efficiency}%
          {efficiency >= 85 ? " - OPTIMAL" : efficiency >= 60 ? " - ACCEPTABLE" : " - INSUFFISANT"}
        </text>
      </svg>
      {/* Sliders */}
      {gauges.map((g,i) => (
        <div key={i} style={{marginTop:8}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
            <span style={{fontSize:9,color:g.ok?g.color:C.red,fontWeight:600}}>{g.label}: {g.val}{g.unit}</span>
            <span style={{fontSize:9,color:C.muted}}>
              {lbl("Opt.","Opt.","Opt.","Opt.")}: {g.optMin}-{g.optMax}{g.unit}
            </span>
          </div>
          <input type="range" min={g.min} max={g.max} step={g.unit==="h"?0.5:1} value={g.val}
            onChange={e=>g.set(Number(e.target.value))}
            style={{width:"100%",accentColor:g.ok?g.color:C.red}}/>
          {!g.ok && (
            <div style={{fontSize:9,color:C.red,marginTop:2}}>⚠️ {g.warn}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — AMOCO CADIZ (1978)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MT Amoco Cadiz - Bretagne, France (1978)",
      teaser:"VLCC 228 000 tdw - Perte gouvernail - 230 000 t brut - 360 km cotes souillees - Catastrophe reference",
      what:"Le 16 mars 1978, le supertanker americain Amoco Cadiz s'echoue sur les rochers de Portsall (Finistere) apres la rupture de son systeme de gouvernail. Impossible a manoeuvrer malgre les tentatives de remorquage, il se brise en trois. Les 230 000 tonnes de brut legers iraniens se deversent en totalite. 360 km de cotes bretonnes sont souillees. C'est la plus grande maree noire de l'histoire jusqu'a l'Exxon Valdez. Les enquetes revelent que les citernes n'etaient pas equipees de COW operationnel : des residus importants de brut et de paraffines persistaient dans les citernes, aggravant la pollution.",
      cause:"- Rupture mecanique du systeme de gouvernail (vanne hydraulique defectueuse)\n- Pas de systeme de secours gouvernail operationnel\n- Tentative de remorquage trop tardive et echouee\n- Absence de COW : residus paraffines importants dans les citernes\n- Brut leger iranien (haute vapeur, polluant) - 100% deverse\n- Manque de coordination entre armateur (Amoco), remorqueur et autorites",
      lessons:"- MARPOL 73/78 Annexe I : COW obligatoire sur tous les VLCC\n- Obligation double coque acceleree apres Erika (1999)\n- Systemes de secours gouvernail redondants (SOLAS)\n- Plans d'urgence nationaux anti-pollution (Plan POLMAR France)\n- Formation equipage : procedures de remorquage d'urgence\n- Registre des hydrocarbures (Oil Record Book) renforce",
      link:"Lien L4 COW: L'Amoco Cadiz illustre pourquoi le COW est critique. Sans lavage COW, les paraffines et residus restent dans les citernes et constituent une menace de pollution permanente. Le COW reduit de 70% les residus pollutants en citerne.",
    },
    en:{
      title:"MT Amoco Cadiz - Brittany, France (1978)",
      teaser:"VLCC 228,000 DWT - Rudder failure - 230,000 t crude - 360 km of polluted coastline - Reference disaster",
      what:"On March 16, 1978, the American supertanker Amoco Cadiz ran aground on the rocks of Portsall (Finistere) after its rudder system failed. Unable to maneuver despite towing attempts, it broke into three pieces. All 230,000 tonnes of light Iranian crude spilled. 360 km of Breton coastline were polluted. It was the largest oil spill in history until the Exxon Valdez. Investigations revealed the tanks were not equipped with operational COW: significant crude and paraffin residues persisted in the tanks, worsening the pollution.",
      cause:"- Mechanical failure of the rudder system (defective hydraulic valve)\n- No operational emergency steering system\n- Towing attempt too late and unsuccessful\n- No COW: significant paraffin residues in tanks\n- Light Iranian crude (high vapor, polluting) - 100% spilled\n- Lack of coordination between owner (Amoco), tug and authorities",
      lessons:"- MARPOL 73/78 Annex I: COW mandatory on all VLCCs\n- Accelerated double hull requirement after Erika (1999)\n- Redundant emergency steering systems (SOLAS)\n- National anti-pollution emergency plans (POLMAR Plan)\n- Crew training: emergency towing procedures\n- Enhanced Oil Record Book requirements",
      link:"L4 COW Link: Amoco Cadiz illustrates why COW is critical. Without COW washing, paraffins and residues remain in tanks and constitute a permanent pollution threat. COW reduces polluting residues in tanks by 70%.",
    },
    es:{
      title:"MT Amoco Cadiz - Bretana, Francia (1978)",
      teaser:"VLCC 228 000 TPM - Fallo timon - 230 000 t crudo - 360 km costa contaminada - Catastrofe de referencia",
      what:"El 16 de marzo de 1978, el superpetrolero americano Amoco Cadiz encallo en las rocas de Portsall (Finistere) tras la rotura de su sistema de timon. Incapaz de maniobrar, se partio en tres. Las 230 000 toneladas de crudo ligero irani se derramaron por completo. 360 km de costa bretona contaminados. Fue el mayor vertido de petroleo de la historia hasta el Exxon Valdez. Las investigaciones revelaron que los tanques no tenian COW operativo.",
      cause:"- Rotura mecanica del sistema de timon\n- Sin sistema de timon de emergencia operativo\n- Remolque tardio y fallido\n- Sin COW: importantes residuos de parafina en tanques\n- Crudo ligero irani (alta tension de vapor) - 100% derramado\n- Falta de coordinacion entre armador, remolcador y autoridades",
      lessons:"- MARPOL 73/78 Anexo I: COW obligatorio en todos los VLCC\n- Doble casco acelerado tras Erika (1999)\n- Sistemas de timon de emergencia redundantes (SOLAS)\n- Planes de emergencia anti-contaminacion nacionales\n- Libro de Registro de Hidrocarburos reforzado",
      link:"Vinculo L4 COW: El Amoco Cadiz ilustra por que el COW es critico. Sin lavado COW, las parafinas y residuos permanecen en los tanques. El COW reduce un 70% los residuos contaminantes en tanque.",
    },
    pt:{
      title:"MT Amoco Cadiz - Bretanha, Franca (1978)",
      teaser:"VLCC 228 000 TPB - Falha do leme - 230 000 t crude - 360 km costa poluida - Catastrofe de referencia",
      what:"A 16 de marco de 1978, o superpetroleiro americano Amoco Cadiz encalhou nos rochedos de Portsall (Finistere) apos a falha do sistema de leme. Incapaz de manobrar, partiu-se em tres. As 230 000 toneladas de crude ligeiro iraniano derramaram-se na totalidade. 360 km de costa bretoa poluidos. Foi o maior derrame de petroleo da historia ate ao Exxon Valdez. As investigacoes revelaram que os tanques nao tinham COW operacional.",
      cause:"- Falha mecanica do sistema de leme (valvula hidraulica deficiente)\n- Sem sistema de leme de emergencia operacional\n- Reboque tardio e falhado\n- Sem COW: importantes residuos de parafina nos tanques\n- Crude ligeiro iraniano (alta tensao de vapor) - 100% derramado\n- Falta de coordenacao entre armador, rebocador e autoridades",
      lessons:"- MARPOL 73/78 Anexo I: COW obrigatorio em todos os VLCC\n- Duplo casco acelerado apos Erika (1999)\n- Sistemas de leme de emergencia redundantes (SOLAS)\n- Planos de emergencia anti-poluicao nacionais\n- Livro de Registo de Hidrocarbonetos reforcado",
      link:"Vinculo L4 COW: O Amoco Cadiz ilustra por que o COW e critico. Sem lavagem COW, as parafinas e residuos permanecem nos tanques. O COW reduz 70% os residuos poluentes em tanque.",
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
            {lang==="fr"?"LECONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LICOES"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
          <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — 5 QUESTIONS TEXTE LIBRE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1", q:"A quelle temperature minimum le brut doit-il etre chauffe pour le COW ?\n(Repondre en degres Celsius)"},
      {id:"q2", q:"Quel est le seuil de residus maximum autorise par MARPOL apres COW ?\n(Repondre : 0,1% / 0,4% / 1% du volume)"},
      {id:"q3", q:"Quel fluide est utilise comme solvant dans le systeme COW ?\n(Repondre : eau de mer, brut chaud ou eau douce)"},
      {id:"q4", q:"Vers quelle citerne les residus COW sont-ils pompes apres lavage ?\n(Repondre : pic avant, slop ou citerne balast)"},
      {id:"q5", q:"Sur quels navires le COW est-il obligatoire selon MARPOL ?\n(Repondre : VLCC > 20 000 ou > 40 000 tdw)"},
    ],
    en:[
      {id:"q1", q:"At what minimum temperature must crude be heated for COW?\n(Answer in degrees Celsius)"},
      {id:"q2", q:"What is the maximum residue threshold allowed by MARPOL after COW?\n(Answer: 0.1% / 0.4% / 1% of volume)"},
      {id:"q3", q:"What fluid is used as solvent in the COW system?\n(Answer: seawater, hot crude or fresh water)"},
      {id:"q4", q:"To which tank are COW residues pumped after washing?\n(Answer: fore peak, slop or ballast tank)"},
      {id:"q5", q:"On which vessels is COW mandatory under MARPOL?\n(Answer: VLCCs > 20,000 or > 40,000 DWT)"},
    ],
    es:[
      {id:"q1", q:"?A que temperatura minima debe calentarse el crudo para el COW?\n(Responder en grados Celsius)"},
      {id:"q2", q:"?Cual es el umbral maximo de residuos permitido por MARPOL tras el COW?\n(Responder: 0,1% / 0,4% / 1% del volumen)"},
      {id:"q3", q:"?Que fluido se usa como solvente en el sistema COW?\n(Responder: agua de mar, crudo caliente o agua dulce)"},
      {id:"q4", q:"?A que tanque se bombean los residuos COW tras el lavado?\n(Responder: pique proa, slop o tanque lastro)"},
      {id:"q5", q:"?En que buques es obligatorio el COW segun MARPOL?\n(Responder: VLCC > 20 000 o > 40 000 TPM)"},
    ],
    pt:[
      {id:"q1", q:"A que temperatura minima deve ser aquecido o crude para o COW?\n(Responder em graus Celsius)"},
      {id:"q2", q:"Qual e o limite maximo de residuos permitido pelo MARPOL apos COW?\n(Responder: 0,1% / 0,4% / 1% do volume)"},
      {id:"q3", q:"Que fluido e usado como solvente no sistema COW?\n(Responder: agua do mar, crude quente ou agua doce)"},
      {id:"q4", q:"Para que tanque sao bombeados os residuos COW apos lavagem?\n(Responder: pique de vante, slop ou tanque de lastro)"},
      {id:"q5", q:"Em que navios e o COW obrigatorio segundo MARPOL?\n(Responder: VLCC > 20 000 ou > 40 000 TPB)"},
    ],
  };

  const chk = (id, val) => {
    const v = val.trim().toLowerCase().replace(/\s/g,"").replace("°c","").replace("°","");
    if (id==="q1") return v==="50"||v==="55"||v==="60";
    if (id==="q2") return v==="0.4"||v==="0,4"||v==="04";
    if (id==="q3") return v.includes("brut")||v.includes("crude")||v.includes("crudo")||v.includes("hot");
    if (id==="q4") return v.includes("slop");
    if (id==="q5") return v.includes("20000")||v.includes("20,000")||v.includes("20.000");
    return false;
  };

  const corrKey = {
    fr:{q1:"50-60°C",q2:"0,4%",q3:"Brut chaud",q4:"Slop tank",q5:"> 20 000 tdw"},
    en:{q1:"50-60°C",q2:"0.4%",q3:"Hot crude",q4:"Slop tank",q5:"> 20,000 DWT"},
    es:{q1:"50-60°C",q2:"0,4%",q3:"Crudo caliente",q4:"Slop tank",q5:"> 20.000 TPM"},
    pt:{q1:"50-60°C",q2:"0,4%",q3:"Crude quente",q4:"Slop tank",q5:"> 20.000 TPB"},
  };

  const expl = {
    fr:"OK Q1: 50-60°C - viscosite optimale pour dissolution des residus\nOK Q2: 0,4% - MARPOL Annexe I regulation 33\nOK Q3: Brut chaud - le COW utilise le cargo lui-meme comme solvant\nOK Q4: Slop tank - centralise tous les residus de lavage\nOK Q5: > 20 000 tdw - MARPOL Annexe I Reg 33 (VLCC neufs 1980)",
    en:"OK Q1: 50-60°C - optimal viscosity for residue dissolution\nOK Q2: 0.4% - MARPOL Annex I regulation 33\nOK Q3: Hot crude - COW uses the cargo itself as solvent\nOK Q4: Slop tank - centralizes all washing residues\nOK Q5: > 20,000 DWT - MARPOL Annex I Reg 33 (new VLCCs 1980)",
    es:"OK Q1: 50-60°C - viscosidad optima para disolucion de residuos\nOK Q2: 0,4% - MARPOL Anexo I regulacion 33\nOK Q3: Crudo caliente - el COW usa la propia carga como solvente\nOK Q4: Slop tank - centraliza todos los residuos de lavado\nOK Q5: > 20.000 TPM - MARPOL Anexo I Reg 33",
    pt:"OK Q1: 50-60°C - viscosidade otima para dissolucao de residuos\nOK Q2: 0,4% - MARPOL Anexo I regulacao 33\nOK Q3: Crude quente - o COW usa a propria carga como solvente\nOK Q4: Slop tank - centraliza todos os residuos de lavagem\nOK Q5: > 20.000 TPB - MARPOL Anexo I Reg 33",
  };

  const list = qs[lang] || qs.fr;
  const ck = corrKey[lang] || corrKey.fr;

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.brown}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"Rappels : COW = brut chaud comme solvant - 50-60°C - 8-10 bar - residus vers slop tank - MARPOL > 20 000 tdw"
        :lang==="en"?"Reminders: COW = hot crude as solvent - 50-60°C - 8-10 bar - residues to slop tank - MARPOL > 20,000 DWT"
        :lang==="es"?"Recordatorios: COW = crudo caliente como solvente - 50-60°C - 8-10 bar - residuos a slop - MARPOL > 20.000 TPM"
        :"Lembretes: COW = crude quente como solvente - 50-60°C - 8-10 bar - residuos para slop - MARPOL > 20.000 TPB"}
      </div>
      {list.map((q,i) => (
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"10px",borderRadius:12,border:`1px solid ${C.gold}55`,background:"rgba(201,146,42,0.12)",color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:8}}>
        {showC ? t.hideCorr : t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// TROPHY HELPER
// ══════════════════════════════════════
function getTrophy(score, total) {
  const pct = score / total;
  if (pct === 1)   return { icon:"🏆", color:"#f1c40f", label:{fr:"Parfait !",    en:"Perfect!",     es:"Perfecto!",   pt:"Perfeito!"} };
  if (pct >= 0.8)  return { icon:"🥇", color:"#e8b94f", label:{fr:"Excellent !",  en:"Excellent!",   es:"Excelente!",  pt:"Excelente!"} };
  if (pct >= 0.6)  return { icon:"🥈", color:"#b0bec5", label:{fr:"Bien !",       en:"Well done!",   es:"Bien!",       pt:"Bem feito!"} };
  if (pct >= 0.4)  return { icon:"🥉", color:"#cd7f32", label:{fr:"Continue !",   en:"Keep going!",  es:"Sigue!",      pt:"Continue!"} };
  return                  { icon:"📚", color:"rgba(240,244,255,0.45)", label:{fr:"A retravailler", en:"Keep studying", es:"A repasar", pt:"Continue estudando"} };
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const qs = {
    fr:[
      {q:"Que signifie l'acronyme COW ?",opts:["Crude Oil Washing","Cargo Oil Winch","Crude On Water","Cargo Operations Workflow"],ans:0,expl:"COW = Crude Oil Washing (lavage au petrole brut). Le systeme utilise le brut chaud charge comme solvant pour dissoudre et eliminer les residus paraffines colles aux parois des citernes."},
      {q:"Quel fluide est utilise comme solvant dans le systeme COW ?",opts:["Eau de mer chauffee","Eau douce sous pression","Le brut chaud lui-meme","Solvant chimique special"],ans:2,expl:"Le COW utilise le brut cargo lui-meme comme solvant. Les buses projettent le brut chaud (50-60°C) sur les parois. Le brut chaud dissout les residus de paraffines et wax qui restent colles lors du deballastage normal."},
      {q:"Quelle est la pression nominale de fonctionnement des buses COW ?",opts:["2 a 4 bar","8 a 12 bar","20 a 30 bar","50 a 60 bar"],ans:1,expl:"La pression nominale COW est de 8 a 12 bar (typiquement 9-10 bar). Sous 8 bar, le jet n'est pas assez puissant pour decoller les residus. Au-dessus de 12 bar, risque de deterioration des buses et de la structure."},
      {q:"A quelle temperature le brut doit-il etre chauffe pour le COW ?",opts:["20 a 30°C","35 a 45°C","50 a 65°C","75 a 90°C"],ans:2,expl:"Le brut doit etre chauffe a 50-65°C pour le COW. A cette temperature, la viscosite du brut diminue fortement, permettant aux jets de penetrer et dissoudre efficacement les residus paraffines (wax) qui fondent entre 40 et 60°C selon la provenance."},
      {q:"Sur quels navires le COW est-il obligatoire selon MARPOL Annexe I ?",opts:["Tous les petroliers","Petroliers > 5 000 tdw","VLCC > 20 000 tdw","Petroliers > 100 000 tdw"],ans:2,expl:"MARPOL Annexe I Regulation 33 : COW obligatoire sur tous les VLCC (Very Large Crude Carriers) de plus de 20 000 tdw construits apres 1980. Sur les petits petroliers, le COW est recommande mais pas obligatoire."},
      {q:"Ou sont envoyes les residus COW apres lavage des citernes ?",opts:["Rejetes en mer directement","Vers la citerne slop","Vers les citernes de ballast","Vers le double fond"],ans:1,expl:"Les residus COW (brut + paraffines dissoutes) sont pompes vers la citerne slop, specifiquement dediee a cet usage. Le slop est ensuite traite a terre ou decante avant rejet conforme MARPOL (moins de 15 ppm en mer)."},
      {q:"Quelle est la reduction de residus en citerne apres COW par rapport a un dechargement normal ?",opts:["20 a 30%","40 a 50%","60 a 70%","90 a 95%"],ans:2,expl:"Le COW reduit les residus en citerne de 60 a 70% par rapport a un simple dechargement standard. Sans COW, un VLCC peut laisser 800 a 1500 tonnes de boues. Avec COW, ce chiffre tombe a 250-450 tonnes, soit une reduction majeure de la pollution potentielle."},
      {q:"Quelle est la duree typique d'un lavage COW complet d'une citerne ?",opts:["30 a 60 minutes","2 a 4 heures","8 a 12 heures","24 heures"],ans:1,expl:"Un lavage COW complet d'une citerne dure typiquement 2 a 4 heures. La buse tourne lentement (1-4 tr/min) pour couvrir toutes les surfaces. Les grandes citernes de VLCC (50 000 m3) peuvent necessiter jusqu'a 6 heures."},
      {q:"Qu'est-ce que le 'slop tank' dans le contexte du COW ?",opts:["Citerne de combustible residuel","Citerne de reception des residus de lavage","Citerne de ballast de secours","Citerne de decantation de brut"],ans:1,expl:"Le slop tank est une citerne dediee a la reception et au stockage temporaire des residus de lavage COW (melange brut + eau + paraffines). Il permet la decantation avant transfert a terre ou rejet controle. Obligatoire sur tous les petroliers MARPOL."},
      {q:"Quelle convention internationale a rendu le COW obligatoire ?",opts:["SOLAS 1974","MARPOL 73/78","BWM 2004","ISM Code 1994"],ans:1,expl:"MARPOL 73/78 (Convention internationale pour la prevention de la pollution par les navires) Annexe I Regulation 33 a rendu le COW obligatoire sur les VLCC > 20 000 tdw. Adoptee en 1973, modifiee en 1978 apres les grandes marees noires des annees 70."},
      {q:"Pendant le COW, l'IGS (gaz inerte) doit etre maintenu parce que :",opts:["Les jets COW creent de l'electricite statique","Le brut chaud projete libere des vapeurs inflammables","La temperature eleve le point d'eclair","Les buses chauffent les gaz"],ans:1,expl:"Le brut chaud projete par les buses COW libere d'importantes quantites de vapeurs d'hydrocarbures. Sans IGS maintenant O2 < 8% dans la citerne, ces vapeurs en presence d'air formeraient un melange explosif. IGS et COW sont indissociables en securite."},
      {q:"L'Amoco Cadiz (1978) a demontre que sans COW adequat :",opts:["Le dechargement est plus lent","Les residus de paraffines persistent et aggravent les deversements","La stabilite du navire diminue","Les pompes s'usent plus vite"],ans:1,expl:"L'Amoco Cadiz a deverle 230 000 t de brut avec d'importants residus paraffines dans les citernes. L'enquete a montre que sans COW operationnel, les paraffines collees aux parois restent dans le navire et sont liberees en cas d'avarie, aggravant considerablement la pollution."},
      {q:"Quel est le seuil de residus maximum autorise par MARPOL apres COW ?",opts:["0,1% du volume de la citerne","0,4% du volume de la citerne","1% du volume de la citerne","2% du volume de la citerne"],ans:1,expl:"MARPOL Annexe I fixe le seuil maximum a 0,4% du volume total de la citerne apres COW. Pour une citerne de 10 000 m3, cela represente 40 m3 de residus maximum. En dessous de ce seuil, la citerne est considered propre pour MARPOL."},
      {q:"Quelle est la vitesse de rotation typique des buses COW ?",opts:["10 a 20 tr/min","30 a 60 tr/min","1 a 4 tr/min","0,1 a 0,5 tr/min"],ans:2,expl:"Les buses COW tournent lentement : 1 a 4 tours par minute. Cette vitesse lente est necessaire pour permettre aux jets de projeter suffisamment longtemps sur chaque zone de la paroi et dissoudre efficacement les residus. Une rotation trop rapide reduirait l'efficacite du lavage."},
      {q:"La citerne de slop doit etre traitee avant tout rejet en mer. Le seuil MARPOL est de :",opts:["100 ppm d'hydrocarbures","15 ppm d'hydrocarbures","5 ppm d'hydrocarbures","0 ppm (rejet interdit)"],ans:1,expl:"MARPOL Annexe I : rejet en mer autorise uniquement si la teneur en hydrocarbures est inferieure a 15 ppm (parties par million). Au-dela, le slop doit etre traite a terre ou reste a bord. Le Oil Record Book doit enregistrer toutes ces operations."},
    ],
    en:[
      {q:"What does the acronym COW stand for?",opts:["Crude Oil Washing","Cargo Oil Winch","Crude On Water","Cargo Operations Workflow"],ans:0,expl:"COW = Crude Oil Washing. The system uses the hot loaded crude itself as a solvent to dissolve and remove paraffin residues stuck to the tank walls."},
      {q:"What fluid is used as solvent in the COW system?",opts:["Heated seawater","Pressurized fresh water","The hot crude itself","Special chemical solvent"],ans:2,expl:"COW uses the cargo crude itself as solvent. Nozzles spray hot crude (50-60°C) on the walls. Hot crude dissolves paraffin and wax residues that stick to tanks during normal discharge."},
      {q:"What is the nominal operating pressure of COW nozzles?",opts:["2 to 4 bar","8 to 12 bar","20 to 30 bar","50 to 60 bar"],ans:1,expl:"Nominal COW pressure is 8 to 12 bar (typically 9-10 bar). Below 8 bar, the jet is not powerful enough to remove residues. Above 12 bar, risk of nozzle and structural damage."},
      {q:"At what temperature must crude be heated for COW?",opts:["20 to 30°C","35 to 45°C","50 to 65°C","75 to 90°C"],ans:2,expl:"Crude must be heated to 50-65°C for COW. At this temperature, crude viscosity drops significantly, allowing jets to penetrate and effectively dissolve paraffin (wax) residues that melt between 40-60°C depending on origin."},
      {q:"On which vessels is COW mandatory under MARPOL Annex I?",opts:["All tankers","Tankers > 5,000 DWT","VLCCs > 20,000 DWT","Tankers > 100,000 DWT"],ans:2,expl:"MARPOL Annex I Regulation 33: COW mandatory on all VLCCs (Very Large Crude Carriers) over 20,000 DWT built after 1980. On smaller tankers, COW is recommended but not mandatory."},
      {q:"Where are COW residues sent after tank washing?",opts:["Directly discharged to sea","To the slop tank","To ballast tanks","To the double bottom"],ans:1,expl:"COW residues (crude + dissolved paraffins) are pumped to the slop tank, specifically dedicated to this purpose. The slop is then processed ashore or decanted before MARPOL-compliant discharge (less than 15 ppm at sea)."},
      {q:"What is the residue reduction after COW compared to normal discharge?",opts:["20 to 30%","40 to 50%","60 to 70%","90 to 95%"],ans:2,expl:"COW reduces tank residues by 60-70% compared to standard discharge. Without COW, a VLCC can leave 800-1500 tonnes of sludge. With COW, this drops to 250-450 tonnes - a major reduction in potential pollution."},
      {q:"What is the typical duration of a complete COW wash of one tank?",opts:["30 to 60 minutes","2 to 4 hours","8 to 12 hours","24 hours"],ans:1,expl:"A complete COW wash of one tank typically takes 2 to 4 hours. The nozzle rotates slowly (1-4 rpm) to cover all surfaces. Large VLCC tanks (50,000 m3) may require up to 6 hours."},
      {q:"What is the slop tank in the COW context?",opts:["Residual fuel tank","Washing residue reception tank","Emergency ballast tank","Crude decantation tank"],ans:1,expl:"The slop tank is a dedicated tank for receiving and temporarily storing COW washing residues (crude + water + paraffins mix). It allows decantation before shore transfer or controlled discharge. Mandatory on all MARPOL tankers."},
      {q:"Which international convention made COW mandatory?",opts:["SOLAS 1974","MARPOL 73/78","BWM 2004","ISM Code 1994"],ans:1,expl:"MARPOL 73/78 Annex I Regulation 33 made COW mandatory on VLCCs > 20,000 DWT. Adopted in 1973, amended in 1978 following the major oil spills of the 1970s."},
      {q:"During COW, IGS must be maintained because:",opts:["COW jets create static electricity","Hot sprayed crude releases flammable vapors","Temperature raises the flash point","Nozzles heat the gases"],ans:1,expl:"Hot crude sprayed by COW nozzles releases large quantities of hydrocarbon vapors. Without IGS maintaining O2 < 8% in the tank, these vapors mixed with air would form an explosive mixture. IGS and COW are inseparable for safety."},
      {q:"The Amoco Cadiz (1978) demonstrated that without adequate COW:",opts:["Discharge is slower","Paraffin residues persist and worsen spills","Vessel stability decreases","Pumps wear out faster"],ans:1,expl:"Amoco Cadiz spilled 230,000 t of crude with significant paraffin residues in tanks. The inquiry showed that without operational COW, paraffins stuck to walls remain in the vessel and are released in case of accident, greatly worsening pollution."},
      {q:"What is the maximum residue threshold allowed by MARPOL after COW?",opts:["0.1% of tank volume","0.4% of tank volume","1% of tank volume","2% of tank volume"],ans:1,expl:"MARPOL Annex I sets the maximum threshold at 0.4% of total tank volume after COW. For a 10,000 m3 tank, this represents 40 m3 of maximum residues. Below this threshold, the tank is considered clean for MARPOL."},
      {q:"What is the typical rotation speed of COW nozzles?",opts:["10 to 20 rpm","30 to 60 rpm","1 to 4 rpm","0.1 to 0.5 rpm"],ans:2,expl:"COW nozzles rotate slowly: 1 to 4 revolutions per minute. This slow speed is necessary to allow jets to spray sufficiently long on each area of the wall and effectively dissolve residues. Too fast rotation would reduce washing efficiency."},
      {q:"The slop tank must be treated before any sea discharge. The MARPOL threshold is:",opts:["100 ppm hydrocarbons","15 ppm hydrocarbons","5 ppm hydrocarbons","0 ppm (discharge prohibited)"],ans:1,expl:"MARPOL Annex I: sea discharge only permitted if hydrocarbon content is below 15 ppm. Above this, slop must be processed ashore or kept on board. The Oil Record Book must record all these operations."},
    ],
    es:[
      {q:"?Que significa el acronimo COW?",opts:["Crude Oil Washing","Cargo Oil Winch","Crude On Water","Cargo Operations Workflow"],ans:0,expl:"COW = Crude Oil Washing (lavado con petroleo crudo). El sistema usa el propio crudo caliente como solvente para disolver y eliminar los residuos de parafinas adheridos a las paredes de los tanques."},
      {q:"?Que fluido se usa como solvente en el sistema COW?",opts:["Agua de mar calentada","Agua dulce a presion","El propio crudo caliente","Solvente quimico especial"],ans:2,expl:"El COW usa el propio crudo de carga como solvente. Las boquillas proyectan crudo caliente (50-60°C) sobre las paredes. El crudo caliente disuelve los residuos de parafinas y ceras que quedan adheridos en la descarga normal."},
      {q:"?Cual es la presion nominal de funcionamiento de las boquillas COW?",opts:["2 a 4 bar","8 a 12 bar","20 a 30 bar","50 a 60 bar"],ans:1,expl:"La presion nominal COW es de 8 a 12 bar (tipicamente 9-10 bar). Por debajo de 8 bar, el chorro no es suficientemente potente. Por encima de 12 bar, riesgo de deterioro de las boquillas y la estructura."},
      {q:"?A que temperatura debe calentarse el crudo para el COW?",opts:["20 a 30°C","35 a 45°C","50 a 65°C","75 a 90°C"],ans:2,expl:"El crudo debe calentarse a 50-65°C para el COW. A esta temperatura, la viscosidad del crudo disminuye notablemente, permitiendo que los chorros penetren y disuelvan eficazmente los residuos de parafinas."},
      {q:"?En que buques es obligatorio el COW segun MARPOL Anexo I?",opts:["Todos los petroleros","Petroleros > 5.000 TPM","VLCC > 20.000 TPM","Petroleros > 100.000 TPM"],ans:2,expl:"MARPOL Anexo I Regulacion 33: COW obligatorio en todos los VLCC de mas de 20.000 TPM construidos despues de 1980."},
      {q:"?Adonde se envian los residuos COW tras el lavado?",opts:["Vertidos directamente al mar","Al tanque slop","A los tanques de lastre","Al doble fondo"],ans:1,expl:"Los residuos COW se bombean al tanque slop, especificamente dedicado a este uso. El slop se trata en tierra o se decanta antes del vertido conforme MARPOL (menos de 15 ppm en el mar)."},
      {q:"?Cual es la reduccion de residuos tras COW respecto a una descarga normal?",opts:["20 a 30%","40 a 50%","60 a 70%","90 a 95%"],ans:2,expl:"El COW reduce los residuos en tanque un 60-70% respecto a la descarga normal. Sin COW, un VLCC puede dejar 800-1500 toneladas de lodos. Con COW, baja a 250-450 toneladas."},
      {q:"?Cual es la duracion tipica de un lavado COW completo de un tanque?",opts:["30 a 60 minutos","2 a 4 horas","8 a 12 horas","24 horas"],ans:1,expl:"Un lavado COW completo de un tanque dura tipicamente 2 a 4 horas. La boquilla gira lentamente (1-4 rpm) para cubrir todas las superficies."},
      {q:"?Que es el tanque slop en el contexto del COW?",opts:["Tanque de combustible residual","Tanque de recepcion de residuos de lavado","Tanque de lastre de emergencia","Tanque de decantacion de crudo"],ans:1,expl:"El slop tank es un tanque dedicado a la recepcion y almacenamiento temporal de los residuos de lavado COW. Permite la decantacion antes del traslado en tierra o vertido controlado."},
      {q:"?Que convenio internacional hizo obligatorio el COW?",opts:["SOLAS 1974","MARPOL 73/78","BWM 2004","Codigo ISM 1994"],ans:1,expl:"MARPOL 73/78 Anexo I Regulacion 33 hizo obligatorio el COW en VLCC > 20.000 TPM. Adoptado en 1973, modificado en 1978 tras los grandes vertidos de los anos 70."},
      {q:"Durante el COW, el IGS debe mantenerse porque:",opts:["Los chorros COW crean electricidad estatica","El crudo caliente proyectado libera vapores inflamables","La temperatura eleva el punto de inflamacion","Las boquillas calientan los gases"],ans:1,expl:"El crudo caliente proyectado por las boquillas COW libera grandes cantidades de vapores de hidrocarburos. Sin IGS manteniendo O2 < 8%, estos vapores con el aire formarian una mezcla explosiva."},
      {q:"El Amoco Cadiz (1978) demostro que sin COW adecuado:",opts:["La descarga es mas lenta","Los residuos de parafina persisten y agravan los vertidos","La estabilidad del buque disminuye","Las bombas se desgastan mas rapido"],ans:1,expl:"El Amoco Cadiz derramo 230.000 t de crudo con importantes residuos de parafina en los tanques. Sin COW operativo, las parafinas adheridas a las paredes se liberan en caso de averia."},
      {q:"?Cual es el umbral maximo de residuos permitido por MARPOL tras el COW?",opts:["0,1% del volumen del tanque","0,4% del volumen del tanque","1% del volumen del tanque","2% del volumen del tanque"],ans:1,expl:"MARPOL Anexo I fija el maximo en 0,4% del volumen total del tanque tras el COW."},
      {q:"?Cual es la velocidad de rotacion tipica de las boquillas COW?",opts:["10 a 20 rpm","30 a 60 rpm","1 a 4 rpm","0,1 a 0,5 rpm"],ans:2,expl:"Las boquillas COW giran lentamente: 1 a 4 revoluciones por minuto. Esta velocidad lenta permite que los chorros actuen suficientemente sobre cada zona de la pared."},
      {q:"El tanque slop debe tratarse antes de cualquier vertido al mar. El umbral MARPOL es:",opts:["100 ppm de hidrocarburos","15 ppm de hidrocarburos","5 ppm de hidrocarburos","0 ppm (vertido prohibido)"],ans:1,expl:"MARPOL Anexo I: vertido al mar solo permitido si el contenido en hidrocarburos es inferior a 15 ppm. El Libro de Registro de Hidrocarburos debe registrar todas estas operaciones."},
    ],
    pt:[
      {q:"O que significa a sigla COW?",opts:["Crude Oil Washing","Cargo Oil Winch","Crude On Water","Cargo Operations Workflow"],ans:0,expl:"COW = Crude Oil Washing (lavagem com petroleo bruto). O sistema usa o proprio crude quente como solvente para dissolver e eliminar os residuos de parafinas aderidos as paredes dos tanques."},
      {q:"Que fluido e usado como solvente no sistema COW?",opts:["Agua do mar aquecida","Agua doce sob pressao","O proprio crude quente","Solvente quimico especial"],ans:2,expl:"O COW usa o proprio crude de carga como solvente. Os bocais projectam crude quente (50-60°C) sobre as paredes. O crude quente dissolve os residuos de parafinas e ceras que ficam aderidos na descarga normal."},
      {q:"Qual e a pressao nominal de funcionamento dos bocais COW?",opts:["2 a 4 bar","8 a 12 bar","20 a 30 bar","50 a 60 bar"],ans:1,expl:"A pressao nominal COW e de 8 a 12 bar (tipicamente 9-10 bar). Abaixo de 8 bar, o jacto nao e suficientemente potente. Acima de 12 bar, risco de deterioracao dos bocais e da estrutura."},
      {q:"A que temperatura deve ser aquecido o crude para o COW?",opts:["20 a 30°C","35 a 45°C","50 a 65°C","75 a 90°C"],ans:2,expl:"O crude deve ser aquecido a 50-65°C para o COW. A esta temperatura, a viscosidade do crude diminui significativamente, permitindo que os jactos penetrem e dissolvam eficazmente os residuos de parafinas."},
      {q:"Em que navios e o COW obrigatorio segundo MARPOL Anexo I?",opts:["Todos os petroleiros","Petroleiros > 5.000 TPB","VLCC > 20.000 TPB","Petroleiros > 100.000 TPB"],ans:2,expl:"MARPOL Anexo I Regulacao 33: COW obrigatorio em todos os VLCC de mais de 20.000 TPB construidos apos 1980."},
      {q:"Para onde sao enviados os residuos COW apos a lavagem?",opts:["Descarregados directamente no mar","Para o tanque slop","Para os tanques de lastro","Para o duplo fundo"],ans:1,expl:"Os residuos COW sao bombeados para o slop tank, especificamente dedicado a este uso. O slop e tratado em terra ou decantado antes do descarte conforme MARPOL (menos de 15 ppm no mar)."},
      {q:"Qual e a reducao de residuos apos COW em relacao a uma descarga normal?",opts:["20 a 30%","40 a 50%","60 a 70%","90 a 95%"],ans:2,expl:"O COW reduz os residuos no tanque em 60-70% em relacao a descarga normal. Sem COW, um VLCC pode deixar 800-1500 toneladas de lamas. Com COW, desce para 250-450 toneladas."},
      {q:"Qual e a duracao tipica de uma lavagem COW completa de um tanque?",opts:["30 a 60 minutos","2 a 4 horas","8 a 12 horas","24 horas"],ans:1,expl:"Uma lavagem COW completa de um tanque demora tipicamente 2 a 4 horas. O bocal roda lentamente (1-4 rpm) para cobrir todas as superficies."},
      {q:"O que e o slop tank no contexto do COW?",opts:["Tanque de combustivel residual","Tanque de recepcao de residuos de lavagem","Tanque de lastro de emergencia","Tanque de decantacao de crude"],ans:1,expl:"O slop tank e um tanque dedicado a recepcao e armazenamento temporario dos residuos de lavagem COW. Permite a decantacao antes da transferencia para terra ou descarte controlado."},
      {q:"Qual convencao internacional tornou o COW obrigatorio?",opts:["SOLAS 1974","MARPOL 73/78","BWM 2004","Codigo ISM 1994"],ans:1,expl:"MARPOL 73/78 Anexo I Regulacao 33 tornou o COW obrigatorio em VLCC > 20.000 TPB. Adoptado em 1973, alterado em 1978 apos os grandes derrames dos anos 70."},
      {q:"Durante o COW, o IGS deve ser mantido porque:",opts:["Os jactos COW criam electricidade estatica","O crude quente projectado liberta vapores inflamaveis","A temperatura eleva o ponto de inflamacao","Os bocais aquecem os gases"],ans:1,expl:"O crude quente projectado pelos bocais COW liberta grandes quantidades de vapores de hidrocarbonetos. Sem IGS mantendo O2 < 8%, estes vapores com o ar formariam uma mistura explosiva."},
      {q:"O Amoco Cadiz (1978) demonstrou que sem COW adequado:",opts:["A descarga e mais lenta","Os residuos de parafina persistem e agravam os derrames","A estabilidade do navio diminui","As bombas desgastam-se mais rapidamente"],ans:1,expl:"O Amoco Cadiz derramou 230.000 t de crude com importantes residuos de parafina nos tanques. Sem COW operacional, as parafinas aderidas as paredes ficam no navio e sao libertadas em caso de acidente."},
      {q:"Qual e o limite maximo de residuos permitido pelo MARPOL apos COW?",opts:["0,1% do volume do tanque","0,4% do volume do tanque","1% do volume do tanque","2% do volume do tanque"],ans:1,expl:"MARPOL Anexo I fixa o maximo em 0,4% do volume total do tanque apos COW."},
      {q:"Qual e a velocidade de rotacao tipica dos bocais COW?",opts:["10 a 20 rpm","30 a 60 rpm","1 a 4 rpm","0,1 a 0,5 rpm"],ans:2,expl:"Os bocais COW rodam lentamente: 1 a 4 rotacoes por minuto. Esta velocidade lenta e necessaria para permitir que os jactos actuem suficientemente sobre cada zona da parede."},
      {q:"O slop tank deve ser tratado antes de qualquer descarga no mar. O limite MARPOL e:",opts:["100 ppm de hidrocarbonetos","15 ppm de hidrocarbonetos","5 ppm de hidrocarbonetos","0 ppm (descarga proibida)"],ans:1,expl:"MARPOL Anexo I: descarga no mar so permitida se o teor de hidrocarbonetos for inferior a 15 ppm. O Livro de Registo de Hidrocarbonetos deve registar todas estas operacoes."},
    ],
  };

  const list = qs[lang] || qs.fr;
  const [shuffled]=useState(()=>list.map(q=>shuffleQuestionOptions(q,"ans")));
  const total = list.length;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i === shuffled[idx].ans) setScore(s=>s+1);
  };

  const handleNext = () => {
    if (idx === total-1) { setDone(true); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };

  const handleRestart = () => {
    setIdx(0); setSel(null); setAnswered(false); setScore(0); setDone(false); setStarted(false);
  };

  if (!started) {
    return (
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontSize:36,marginBottom:10}}>📝</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6}}>
          {lbl("Banque de questions","Question Bank","Banco de preguntas","Banco de questoes")}
        </div>
        <div style={{fontSize:12,color:C.muted,marginBottom:16}}>
          15 {lbl("questions premium","premium questions","preguntas premium","questoes premium")}
        </div>
        <button onClick={()=>setStarted(true)}
          style={{padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.brown})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
        </button>
      </div>
    );
  }

  if (done) {
    const trophy = getTrophy(score, total);
    const pct = Math.round(score/total*100);
    return (
      <div style={{textAlign:"center",padding:"20px 10px"}}>
        <div style={{fontSize:64,marginBottom:8}}>{trophy.icon}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:trophy.color,fontWeight:700,marginBottom:4}}>
          {trophy.label[lang]||trophy.label.fr}
        </div>
        <div style={{fontSize:28,fontWeight:700,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:18,color:trophy.color,fontWeight:700,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:8,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.purple},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"12px",borderRadius:14,background:"rgba(142,68,173,0.2)",border:`1px solid ${C.purple}55`,color:C.purple,fontSize:13,fontWeight:700,cursor:"pointer"}}>
          {lbl("Recommencer","Restart","Reiniciar","Recomecar")}
        </button>
      </div>
    );
  }

  const q = shuffled[idx];
  return (
    <div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:10,color:C.purple,fontWeight:700}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold,fontWeight:700}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.purple},${C.brown})`,borderRadius:4,transition:"width 0.3s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i) => {
        let bg="rgba(13,31,60,0.6)", border=C.border, col=C.white;
        if (answered) {
          if (i===q.ans) { bg="rgba(30,138,74,0.2)"; border=C.green; col=C.green; }
          else if (i===sel) { bg="rgba(192,57,43,0.2)"; border=C.red; col=C.red; }
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"11px 14px",marginBottom:7,borderRadius:12,background:bg,border:`1px solid ${border}`,color:col,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:700,marginRight:8,color:C.gold2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"11px 13px",borderRadius:12,background:`rgba(${sel===q.ans?"30,138,74":"192,57,43"},0.1)`,border:`1px solid ${sel===q.ans?C.green:C.red}44`,marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,color:sel===q.ans?C.green:C.red,marginBottom:4}}>
            {sel===q.ans
              ?(lang==="fr"?"✓ Bonne reponse !":lang==="en"?"✓ Correct!":lang==="es"?"✓ Correcta!":"✓ Correto!")
              :(lang==="fr"?"✗ Mauvaise reponse":lang==="en"?"✗ Wrong answer":lang==="es"?"✗ Incorrecta":"✗ Errada")}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"13px",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.brown})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lang==="fr"?"VOIR MON SCORE =>":lang==="en"?"SEE MY SCORE =>":lang==="es"?"VER PUNTUACION =>":"VER PONTUACAO =>")
            :(lang==="fr"?"SUIVANT =>":lang==="en"?"NEXT =>":lang==="es"?"SIGUIENTE =>":"PROXIMO =>")}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ FINAL — 5 QCM
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Que signifie COW et quel fluide sert de solvant ?",opts:["Crude Oil Washing - brut chaud","Cargo Oil Winch - eau chaude","Crude On Water - solvant chimique","Cleaning Oil Work - eau douce"],ans:0,expl:"COW = Crude Oil Washing. Le brut cargo lui-meme, chauffe a 50-65°C, est utilise comme solvant pour dissoudre les paraffines et residus colles aux parois des citernes."},
    {q:"Quelle est la pression nominale des buses COW et la temperature du brut ?",opts:["4-6 bar / 30-40°C","8-12 bar / 50-65°C","15-20 bar / 70-80°C","25-30 bar / 90°C+"],ans:1,expl:"Pression nominale : 8-12 bar (typiquement 9-10 bar). Temperature brut : 50-65°C. Ces parametres optimaux permettent une dissolution efficace des paraffines et un rendement COW > 85%."},
    {q:"Selon MARPOL Annexe I, le COW est obligatoire sur :",opts:["Tous les petroliers","VLCC > 20 000 tdw","Chimiquiers > 8 000 tdw","Petroliers > 5 000 tdw"],ans:1,expl:"MARPOL 73/78 Annexe I Regulation 33 : COW obligatoire sur tous les VLCC de plus de 20 000 tdw construits apres 1980. Cette obligation est directement liee aux grandes marees noires des annees 70 dont l'Amoco Cadiz."},
    {q:"Le seuil de residus MARPOL apres COW est de :",opts:["0,1% du volume","0,4% du volume","1% du volume","5% du volume"],ans:1,expl:"MARPOL fixe la limite a 0,4% du volume de la citerne. En dessous, la citerne est considered clean. Le COW reduit les residus de 60-70% par rapport a un dechargement sans lavage."},
    {q:"L'Amoco Cadiz (1978) a renforce l'obligation COW car :",opts:["Le navire etait trop vieux","Les residus paraffines aggravent la pollution lors d'un deversement","Le capitaine n'avait pas de certificat","Le brut iranien etait interdit"],ans:1,expl:"L'enquete Amoco Cadiz a montre que les residus de paraffines restes dans les citernes non lavees au COW ont considerablement aggrave la maree noire. MARPOL 73/78 a ete renforce directement suite a cette catastrophe."},
  ],
  en:[
    {q:"What does COW mean and what fluid serves as solvent?",opts:["Crude Oil Washing - hot crude","Cargo Oil Winch - hot water","Crude On Water - chemical solvent","Cleaning Oil Work - fresh water"],ans:0,expl:"COW = Crude Oil Washing. The cargo crude itself, heated to 50-65°C, is used as solvent to dissolve paraffins and residues stuck to tank walls."},
    {q:"What is the nominal COW nozzle pressure and crude temperature?",opts:["4-6 bar / 30-40°C","8-12 bar / 50-65°C","15-20 bar / 70-80°C","25-30 bar / 90°C+"],ans:1,expl:"Nominal pressure: 8-12 bar (typically 9-10 bar). Crude temperature: 50-65°C. These optimal parameters allow effective paraffin dissolution and COW efficiency > 85%."},
    {q:"Under MARPOL Annex I, COW is mandatory on:",opts:["All tankers","VLCCs > 20,000 DWT","Chemical tankers > 8,000 DWT","Tankers > 5,000 DWT"],ans:1,expl:"MARPOL 73/78 Annex I Regulation 33: COW mandatory on all VLCCs over 20,000 DWT built after 1980. This requirement is directly linked to the major oil spills of the 1970s including Amoco Cadiz."},
    {q:"The MARPOL residue threshold after COW is:",opts:["0.1% of volume","0.4% of volume","1% of volume","5% of volume"],ans:1,expl:"MARPOL sets the limit at 0.4% of tank volume. Below this, the tank is considered clean. COW reduces residues by 60-70% compared to discharge without washing."},
    {q:"The Amoco Cadiz (1978) reinforced COW requirements because:",opts:["The vessel was too old","Paraffin residues worsen pollution during spills","The captain had no certificate","Iranian crude was prohibited"],ans:1,expl:"The Amoco Cadiz inquiry showed that paraffin residues remaining in unwashed tanks considerably worsened the oil spill. MARPOL 73/78 was directly strengthened following this disaster."},
  ],
  es:[
    {q:"?Que significa COW y que fluido sirve de solvente?",opts:["Crude Oil Washing - crudo caliente","Cargo Oil Winch - agua caliente","Crude On Water - solvente quimico","Cleaning Oil Work - agua dulce"],ans:0,expl:"COW = Crude Oil Washing. El propio crudo de carga, calentado a 50-65°C, se usa como solvente para disolver las parafinas y residuos adheridos a las paredes de los tanques."},
    {q:"?Cual es la presion nominal de las boquillas COW y la temperatura del crudo?",opts:["4-6 bar / 30-40°C","8-12 bar / 50-65°C","15-20 bar / 70-80°C","25-30 bar / 90°C+"],ans:1,expl:"Presion nominal: 8-12 bar (tipicamente 9-10 bar). Temperatura crudo: 50-65°C. Estos parametros optimos permiten una disolucion eficaz de las parafinas."},
    {q:"Segun MARPOL Anexo I, el COW es obligatorio en:",opts:["Todos los petroleros","VLCC > 20.000 TPM","Quimiqueros > 8.000 TPM","Petroleros > 5.000 TPM"],ans:1,expl:"MARPOL 73/78 Anexo I Regulacion 33: COW obligatorio en todos los VLCC de mas de 20.000 TPM construidos despues de 1980."},
    {q:"El umbral de residuos MARPOL tras COW es de:",opts:["0,1% del volumen","0,4% del volumen","1% del volumen","5% del volumen"],ans:1,expl:"MARPOL fija el limite en 0,4% del volumen del tanque. El COW reduce los residuos un 60-70% respecto a la descarga sin lavado."},
    {q:"El Amoco Cadiz (1978) reforzo la obligacion COW porque:",opts:["El buque era demasiado viejo","Los residuos de parafina agravan la contaminacion","El capitan no tenia certificado","El crudo irani estaba prohibido"],ans:1,expl:"La investigacion del Amoco Cadiz mostro que los residuos de parafinas en los tanques sin lavar agravaron considerablemente el vertido. MARPOL 73/78 se reforzo directamente tras esta catastrofe."},
  ],
  pt:[
    {q:"O que significa COW e que fluido serve de solvente?",opts:["Crude Oil Washing - crude quente","Cargo Oil Winch - agua quente","Crude On Water - solvente quimico","Cleaning Oil Work - agua doce"],ans:0,expl:"COW = Crude Oil Washing. O proprio crude de carga, aquecido a 50-65°C, e usado como solvente para dissolver as parafinas e residuos aderidos as paredes dos tanques."},
    {q:"Qual e a pressao nominal dos bocais COW e a temperatura do crude?",opts:["4-6 bar / 30-40°C","8-12 bar / 50-65°C","15-20 bar / 70-80°C","25-30 bar / 90°C+"],ans:1,expl:"Pressao nominal: 8-12 bar (tipicamente 9-10 bar). Temperatura crude: 50-65°C. Estes parametros optimos permitem uma dissolucao eficaz das parafinas."},
    {q:"Segundo MARPOL Anexo I, o COW e obrigatorio em:",opts:["Todos os petroleiros","VLCC > 20.000 TPB","Quimiqueiros > 8.000 TPB","Petroleiros > 5.000 TPB"],ans:1,expl:"MARPOL 73/78 Anexo I Regulacao 33: COW obrigatorio em todos os VLCC de mais de 20.000 TPB construidos apos 1980."},
    {q:"O limite de residuos MARPOL apos COW e de:",opts:["0,1% do volume","0,4% do volume","1% do volume","5% do volume"],ans:1,expl:"MARPOL fixa o limite em 0,4% do volume do tanque. O COW reduz os residuos em 60-70% em relacao a descarga sem lavagem."},
    {q:"O Amoco Cadiz (1978) reforcou a obrigacao COW porque:",opts:["O navio era demasiado velho","Os residuos de parafina agravam a poluicao","O capitao nao tinha certificado","O crude iraniano estava proibido"],ans:1,expl:"A investigacao do Amoco Cadiz mostrou que os residuos de parafinas nos tanques sem lavagem agravaram consideravelmente o derrame. MARPOL 73/78 foi directamente reforcado apos esta catastrofe."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const total = questions.length;
  const isLast = idx === total-1;
  const q = shuffled[idx];

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i===q.ans) setScore(s=>s+1);
  };

  const handleNext = () => {
    const fs = score + (sel===q.ans?1:0);
    if (isLast) { onComplete(fs); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.brown},${C.gold})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i) => {
        let bg="rgba(13,31,60,0.6)", border=C.border, col=C.white;
        if (answered) {
          if (i===q.ans) { bg="rgba(30,138,74,0.2)"; border=C.green; col=C.green; }
          else if (i===sel) { bg="rgba(192,57,43,0.2)"; border=C.red; col=C.red; }
        }
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
          style={{width:"100%",padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C.brown},${C.gold})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// LESSON CONTENT
// ══════════════════════════════════════
const getContent = (lang) => {
  const d = {
    fr:{
      badge:"Module e6 - Cargaison & Petrole - Lecon 4/6 - Premium - 200 XP",
      title:"Crude Oil Washing (COW) - Lavage au petrole brut",
      intro:"Un VLCC decharge 250 000 tonnes de brut. Mais dans les citernes, des centaines de tonnes de paraffines et residus restent colles aux parois. Sans traitement, c'est une bombe ecologique en attente. Le systeme COW resout ce probleme en utilisant le brut cargo lui-meme comme solvant.\n\nCette lecon couvre le principe du COW, les parametres operationnels, le cycle complet, et les obligations MARPOL.",
      p1:"PARTIE 1 - BUSE COW ET PRINCIPE",s1t:"Machine COW - Buse rotative et jets de brut chaud",
      s1:"PRINCIPE FONDAMENTAL COW:\nUtiliser le brut cargo chaud comme solvant pour dissoudre les paraffines et residus adherent aux parois des citernes lors du dechargement.\n\nBUSE COW (MACHINE COW):\nType : buse rotative bi-directionnelle\nPression : 8 a 12 bar (nominale 9-10 bar)\nVitesse rotation : 1 a 4 tr/min (lente pour couverture totale)\nCouverture : 360° horizontal + inclinaison variable\nMontage : fixe ou portable (pontet sur la citerne)\n\nSYSTEME DE POMPAGE COW:\nAlimentee par les pompes cargo principales\nCircuit dedied avec vannes de controle\nBrut chauffe via serpentins vapeur avant injection\nTemperature nominale : 50 a 65°C\n\nTYPES DE MACHINES COW:\nMachines fixes : encastrees dans la structure\nMachines portables : transferables d'une citerne a l'autre\nMachines de fond : pour nettoyage fond de citerne\nTripodes : 3 buses a 120° pour grandes citernes VLCC",
      p2:"PARTIE 2 - CYCLE OPERATIONNEL COW",s2t:"5 phases du prechauffage a la citerne propre",
      s2:"CONDITION PREALABLE OBLIGATOIRE:\nIGS actif, O2 < 8% dans toutes les citernes\nNe jamais demarrer le COW sans atmosphère inerte\n\nPHASE 1 - PRECHAUFFAGE (55-65°C):\nChauffe via serpentins vapeur\nDuree : 4 a 8h selon viscosite du brut\nObjectif : viscosite < 50 cSt pour bonne dissolution\n\nPHASE 2 - POMPAGE INITIAL (100% a 75%):\nDechargement standard du brut principal\nEconimie du brut chaud pour usage COW\n\nPHASE 3 - LAVAGE COW ACTIF (75% a 8%):\nBuses en rotation : jets sur parois et cloisons\nDissolution paraffines + wax\nPompage simultane fond de citerne\n\nPHASE 4 - DRAINAGE ET STRIPPING:\nStripping pump aspire le fond\nResidus brut+paraffines vers slop tank\nInspection visuelle si possible\n\nPHASE 5 - CITERNE PROPRE:\nResidus < 0,4% volume (MARPOL)\nPrete pour ballastage ou inspection",
      p3:"PARTIE 3 - PLAN DE COUVERTURE COW",s3t:"Organisation des lavages et citerne slop",
      s3:"ORGANISATION DU PLAN COW:\nChaque citerne est lavee successivement\nOrdre defini par le Chief Officer (plan COW)\nEnregistrement heure par heure dans l'Oil Record Book\n\nCITERNE SLOP:\nReception de tous les residus COW\nDecantation : brut en surface, eau en dessous\nTraitement obligatoire avant rejet\nSeuil MARPOL : < 15 ppm hydrocarbures en mer\n\nCOUVERTURE OBLIGATOIRE:\nToutes les citernes cargo doivent etre lavees\nMachines portables pour zones non couvertes\nInspection si acces possible apres degazage\n\nDOCUMENTATION OIL RECORD BOOK:\nDate et heure debut/fin COW par citerne\nVolume pompe vers slop\nConditions IGS lors du lavage\nSignature Chief Officer et Capitaine",
      p4:"PARTIE 4 - REGLEMENTATION ET EFFICACITE",s4t:"MARPOL - Requisitions et Oil Record Book",
      s4:"OBLIGATIONS MARPOL 73/78 ANNEXE I:\nReg 33 : COW obligatoire VLCC > 20 000 tdw (1980)\nReg 34 : Slop tank obligatoire sur tous petroliers\nReg 36 : Oil Record Book - toutes operations\nReg 15 : Rejet en mer interdit > 15 ppm\n\nEFFICACITE COW:\nReduction residus : 60 a 70%\nSans COW : 800 a 1500 t de boues par VLCC\nAvec COW : 250 a 450 t residus maximum\nReduction pollution potentielle : environ 70%\n\nINSPECTIONS PSC:\nVerification Oil Record Book obligatoire\nControle bon fonctionnement IGS + COW\nSanctions : detention du navire + amendes\n\nCERTIFICATION EQUIPAGE:\nSTCW A-V/1-1 : formation operations petroliers\nCOW Operations : mention dans SMS du navire\nDrill COW : exercice obligatoire periodik",
      p5:"EXERCICES PRATIQUES PREMIUM",
      p6:"CAS D'ACCIDENT REEL",
      p7:"BANQUE - 15 QUESTIONS PREMIUM",
      sumT:"RESUME - LECON E6 L4",
      sumP:["COW = Crude Oil Washing - brut cargo chaud comme solvant","Pression : 8-12 bar - Temperature : 50-65°C - Rotation : 1-4 tr/min","5 phases : prechauffage => pompage => COW => drainage => propre","Residus vers slop tank - seuil MARPOL 0,4% volume","IGS obligatoire pendant COW - O2 < 8% permanent","MARPOL 73/78 Annexe I Reg.33 : VLCC > 20 000 tdw","Reduction residus 60-70% - evite pollution majeure","Amoco Cadiz 1978 : paraffines sans COW => maree noire renforcee","Oil Record Book : documentation obligatoire de chaque lavage"],
      learnedP:["COW = brut chaud comme solvant (50-65°C, 8-12 bar)","5 phases operationnelles du COW","Slop tank : reception et traitement residus","MARPOL Reg.33 : VLCC > 20 000 tdw","Amoco Cadiz 1978 => obligation COW renforcee"],
    },
    en:{
      badge:"Module e6 - Cargo & Oil - Lesson 4/6 - Premium - 200 XP",
      title:"Crude Oil Washing (COW) - Tank Cleaning with Hot Crude",
      intro:"A VLCC discharges 250,000 tonnes of crude. But in the tanks, hundreds of tonnes of paraffins and residues remain stuck to the walls. Without treatment, it's an ecological time bomb. The COW system solves this problem by using the cargo crude itself as solvent.\n\nThis lesson covers the COW principle, operational parameters, the complete cycle, and MARPOL obligations.",
      p1:"PART 1 - COW NOZZLE AND PRINCIPLE",s1t:"COW machine - Rotating nozzle and hot crude jets",
      s1:"FUNDAMENTAL COW PRINCIPLE:\nUse hot cargo crude as solvent to dissolve paraffins and residues adhering to tank walls during discharge.\n\nCOW NOZZLE (COW MACHINE):\nType: bi-directional rotating nozzle\nPressure: 8 to 12 bar (nominal 9-10 bar)\nRotation speed: 1 to 4 rpm (slow for full coverage)\nCoverage: 360° horizontal + variable tilt\nMounting: fixed or portable (manhole mounted)\n\nCOW PUMPING SYSTEM:\nFed by main cargo pumps\nDedicated circuit with control valves\nCrude heated via steam coils before injection\nNominal temperature: 50 to 65°C\n\nCOW MACHINE TYPES:\nFixed machines: embedded in structure\nPortable machines: transferable between tanks\nBottom machines: for tank bottom cleaning\nTripod: 3 nozzles at 120° for large VLCC tanks",
      p2:"PART 2 - COW OPERATIONAL CYCLE",s2t:"5 phases from preheating to clean tank",
      s2:"MANDATORY PREREQUISITE:\nIGS active, O2 < 8% in all tanks\nNever start COW without inert atmosphere\n\nPHASE 1 - PREHEATING (55-65°C):\nHeating via steam coils\nDuration: 4-8h depending on crude viscosity\nObjective: viscosity < 50 cSt for good dissolution\n\nPHASE 2 - INITIAL PUMPING (100% to 75%):\nStandard main crude discharge\nSave hot crude for COW use\n\nPHASE 3 - ACTIVE COW WASHING (75% to 8%):\nNozzles rotating: jets on walls and bulkheads\nParaffin + wax dissolution\nSimultaneous bottom stripping\n\nPHASE 4 - DRAINAGE AND STRIPPING:\nStripping pump evacuates bottom\nCrude+paraffin residues to slop tank\nVisual inspection if possible\n\nPHASE 5 - CLEAN TANK:\nResidues < 0.4% volume (MARPOL)\nReady for ballasting or inspection",
      p3:"PART 3 - COW COVERAGE PLAN",s3t:"Washing organization and slop tank",
      s3:"COW PLAN ORGANIZATION:\nEach tank washed successively\nOrder defined by Chief Officer (COW plan)\nHour-by-hour recording in Oil Record Book\n\nSLOP TANK:\nReceives all COW residues\nDecantation: crude on top, water below\nMandatory treatment before discharge\nMARPOL threshold: < 15 ppm hydrocarbons at sea\n\nMANDATORY COVERAGE:\nAll cargo tanks must be washed\nPortable machines for uncovered areas\nInspection if accessible after gas-freeing\n\nOIL RECORD BOOK DOCUMENTATION:\nDate and time COW start/end per tank\nVolume pumped to slop\nIGS conditions during washing\nChief Officer and Master signature",
      p4:"PART 4 - REGULATIONS AND EFFICIENCY",s4t:"MARPOL - Requirements and Oil Record Book",
      s4:"MARPOL 73/78 ANNEX I REQUIREMENTS:\nReg 33: COW mandatory VLCCs > 20,000 DWT (1980)\nReg 34: Slop tank mandatory on all tankers\nReg 36: Oil Record Book - all operations\nReg 15: Sea discharge prohibited > 15 ppm\n\nCOW EFFICIENCY:\nResidue reduction: 60 to 70%\nWithout COW: 800 to 1500 t sludge per VLCC\nWith COW: 250 to 450 t residues maximum\nPotential pollution reduction: approximately 70%\n\nPSC INSPECTIONS:\nOil Record Book verification mandatory\nCheck proper IGS + COW operation\nPenalties: vessel detention + fines\n\nCREW CERTIFICATION:\nSTCW A-V/1-1: tanker operations training\nCOW Operations: mentioned in vessel SMS\nCOW Drill: mandatory periodic exercise",
      p5:"ADVANCED PREMIUM EXERCISES",
      p6:"REAL ACCIDENT CASE",
      p7:"BANK - 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY - LESSON E6 L4",
      sumP:["COW = Crude Oil Washing - hot cargo crude as solvent","Pressure: 8-12 bar - Temperature: 50-65°C - Rotation: 1-4 rpm","5 phases: preheating => pumping => COW => drainage => clean","Residues to slop tank - MARPOL threshold 0.4% volume","IGS mandatory during COW - O2 < 8% permanent","MARPOL 73/78 Annex I Reg.33: VLCCs > 20,000 DWT","60-70% residue reduction - prevents major pollution","Amoco Cadiz 1978: paraffins without COW => worsened oil spill","Oil Record Book: mandatory documentation of each wash"],
      learnedP:["COW = hot crude as solvent (50-65°C, 8-12 bar)","5 COW operational phases","Slop tank: residue reception and treatment","MARPOL Reg.33: VLCCs > 20,000 DWT","Amoco Cadiz 1978 => strengthened COW obligation"],
    },
    es:{
      badge:"Modulo e6 - Carga & Petroleo - Leccion 4/6 - Premium - 200 XP",
      title:"Crude Oil Washing (COW) - Lavado con petroleo crudo",
      intro:"Un VLCC descarga 250.000 toneladas de crudo. Pero en los tanques, cientos de toneladas de parafinas y residuos quedan adheridos a las paredes. Sin tratamiento, es una bomba ecologica en espera. El sistema COW resuelve este problema usando el propio crudo de carga como solvente.\n\nEsta leccion cubre el principio COW, los parametros operativos, el ciclo completo y las obligaciones MARPOL.",
      p1:"PARTE 1 - BOQUILLA COW Y PRINCIPIO",s1t:"Maquina COW - Boquilla rotatoria y chorros de crudo caliente",
      s1:"PRINCIPIO FUNDAMENTAL COW:\nUsar el propio crudo caliente como solvente para disolver parafinas y residuos adheridos a las paredes de los tanques.\n\nBOQUILLA COW:\nPresion: 8-12 bar - Velocidad: 1-4 rpm - Temperatura: 50-65°C\nCobertura: 360° horizontal + inclinacion variable\n\nTIPOS DE MAQUINAS COW:\nFijas : encastradas en la estructura\nPortatiles : transferibles entre tanques\nDe fondo : para limpieza del fondo del tanque",
      p2:"PARTE 2 - CICLO OPERATIVO COW",s2t:"5 fases del precalentamiento al tanque limpio",
      s2:"PREREQUISITO OBLIGATORIO:\nIGS activo, O2 < 8% en todos los tanques\n\n5 FASES:\n1. Precalentamiento (55-65°C) - 4-8h\n2. Bombeo inicial (100% a 75%)\n3. Lavado COW activo (75% a 8%) - buses en rotacion\n4. Drenaje y achique (stripping) - residuos al slop\n5. Tanque limpio - residuos < 0,4% MARPOL",
      p3:"PARTE 3 - PLAN DE COBERTURA COW",s3t:"Organizacion de lavados y tanque slop",
      s3:"ORGANIZACION:\nCada tanque lavado sucesivamente segun el plan del Primer Oficial\nRegistro en Libro de Registro de Hidrocarburos\n\nTANQUE SLOP:\nRecibe todos los residuos COW\nDecantacion antes del vertido (< 15 ppm MARPOL)\n\nCOBERTURA OBLIGATORIA:\nTodos los tanques de carga deben ser lavados",
      p4:"PARTE 4 - REGLAMENTACION Y EFICIENCIA",s4t:"MARPOL - Requisitos y Libro de Registro",
      s4:"MARPOL 73/78 ANEXO I:\nReg 33: COW obligatorio VLCC > 20.000 TPM\nReg 34: Slop tank obligatorio\nReg 36: Libro de Registro Hidrocarburos\nReg 15: Vertido mar prohibido > 15 ppm\n\nEFICIENCIA COW:\nReduccion residuos: 60-70%\nSin COW: 800-1500 t lodos por VLCC\nCon COW: 250-450 t maximo",
      p5:"EJERCICIOS AVANZADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN - LECCION E6 L4",
      sumP:["COW = Crude Oil Washing - crudo caliente como solvente","Presion: 8-12 bar - Temperatura: 50-65°C - Rotacion: 1-4 rpm","5 fases: precalentamiento => bombeo => COW => drenaje => limpio","Residuos al slop - umbral MARPOL 0,4% volumen","IGS obligatorio durante COW - O2 < 8%","MARPOL 73/78 Anexo I Reg.33: VLCC > 20.000 TPM","Reduccion residuos 60-70%","Amoco Cadiz 1978 => obligacion COW reforzada","Libro Registro Hidrocarburos: documentacion obligatoria"],
      learnedP:["COW = crudo caliente como solvente (50-65°C, 8-12 bar)","5 fases operativas COW","Slop tank: recepcion y tratamiento residuos","MARPOL Reg.33: VLCC > 20.000 TPM","Amoco Cadiz 1978 => obligacion COW"],
    },
    pt:{
      badge:"Modulo e6 - Carga & Petroleo - Licao 4/6 - Premium - 200 XP",
      title:"Crude Oil Washing (COW) - Lavagem com petroleo bruto",
      intro:"Um VLCC descarrega 250.000 toneladas de crude. Mas nos tanques, centenas de toneladas de parafinas e residuos ficam aderidos as paredes. Sem tratamento, e uma bomba ecologica a aguardar. O sistema COW resolve este problema usando o proprio crude de carga como solvente.\n\nEsta licao cobre o principio COW, os parametros operacionais, o ciclo completo e as obrigacoes MARPOL.",
      p1:"PARTE 1 - BOCAL COW E PRINCIPIO",s1t:"Maquina COW - Bocal rotativo e jactos de crude quente",
      s1:"PRINCIPIO FUNDAMENTAL COW:\nUsar o proprio crude quente como solvente para dissolver parafinas e residuos aderidos as paredes dos tanques.\n\nBOCAL COW:\nPressao: 8-12 bar - Velocidade: 1-4 rpm - Temperatura: 50-65°C\nCobertura: 360° horizontal + inclinacao variavel\n\nTIPOS DE MAQUINAS COW:\nFixas: embutidas na estrutura\nPortateis: transferiveis entre tanques\nDe fundo: para limpeza do fundo do tanque",
      p2:"PARTE 2 - CICLO OPERACIONAL COW",s2t:"5 fases do pre-aquecimento ao tanque limpo",
      s2:"PRE-REQUISITO OBRIGATORIO:\nIGS ativo, O2 < 8% em todos os tanques\n\n5 FASES:\n1. Pre-aquecimento (55-65°C) - 4-8h\n2. Bombagem inicial (100% a 75%)\n3. Lavagem COW ativa (75% a 8%) - bocais em rotacao\n4. Drenagem e bombagem de fundo - residuos para slop\n5. Tanque limpo - residuos < 0,4% MARPOL",
      p3:"PARTE 3 - PLANO DE COBERTURA COW",s3t:"Organizacao das lavagens e tanque slop",
      s3:"ORGANIZACAO:\nCada tanque lavado sucessivamente segundo o plano do Primeiro Oficial\nRegisto no Livro de Registo de Hidrocarbonetos\n\nTANQUE SLOP:\nRecebe todos os residuos COW\nDecantacao antes do descarte (< 15 ppm MARPOL)\n\nCOBERTURA OBRIGATORIA:\nTodos os tanques de carga devem ser lavados",
      p4:"PARTE 4 - REGULAMENTACAO E EFICIENCIA",s4t:"MARPOL - Requisitos e Livro de Registo",
      s4:"MARPOL 73/78 ANEXO I:\nReg 33: COW obrigatorio VLCC > 20.000 TPB\nReg 34: Slop tank obrigatorio\nReg 36: Livro de Registo de Hidrocarbonetos\nReg 15: Descarga mar proibida > 15 ppm\n\nEFICIENCIA COW:\nReducao residuos: 60-70%\nSem COW: 800-1500 t lamas por VLCC\nCom COW: 250-450 t maximo",
      p5:"EXERCICIOS AVANCADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 QUESTOES PREMIUM",
      sumT:"RESUMO - LICAO E6 L4",
      sumP:["COW = Crude Oil Washing - crude quente como solvente","Pressao: 8-12 bar - Temperatura: 50-65°C - Rotacao: 1-4 rpm","5 fases: pre-aquecimento => bombagem => COW => drenagem => limpo","Residuos para slop - limite MARPOL 0,4% volume","IGS obrigatorio durante COW - O2 < 8%","MARPOL 73/78 Anexo I Reg.33: VLCC > 20.000 TPB","Reducao residuos 60-70%","Amoco Cadiz 1978 => obrigacao COW reforcada","Livro Registo Hidrocarbonetos: documentacao obrigatoria"],
      learnedP:["COW = crude quente como solvente (50-65°C, 8-12 bar)","5 fases operacionais COW","Slop tank: recepcao e tratamento de residuos","MARPOL Reg.33: VLCC > 20.000 TPB","Amoco Cadiz 1978 => obrigacao COW"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;
  const trophy = getTrophy(quizScore, 5);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* HEADER */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.brown}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.brown,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Lecon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Leccion 4/6":"Licao 4/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>PREMIUM</div>
            <div style={{fontSize:11,color:C.brown,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.brown},${C.gold})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(121,85,72,0.2)",border:`1px solid ${C.brown}55`,fontSize:11,color:C.brown,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.brown}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            {/* S1 */}
            <SL icon="💦" text={lc.p1} color={C.brown}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💦</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.brown}33`}}>
              <div style={{fontSize:11,color:C.brown,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                💦 {lang==="fr"?"BUSE COW - INTERACTIF":lang==="en"?"COW NOZZLE - INTERACTIVE":lang==="es"?"BOQUILLA COW - INTERACTIVO":"BOCAL COW - INTERATIVO"}
              </div>
              <COWNozzleSVG lang={lang}/>
            </Card>

            {/* S2 */}
            <SL icon="🔄" text={lc.p2} color={C.rust}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.rust}33`}}>
              <div style={{fontSize:11,color:C.rust,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🔄 {lang==="fr"?"CYCLE COW - 5 PHASES":lang==="en"?"COW CYCLE - 5 PHASES":lang==="es"?"CICLO COW - 5 FASES":"CICLO COW - 5 FASES"}
              </div>
              <COWCycleSVG lang={lang}/>
            </Card>

            {/* S3 */}
            <SL icon="🗺️" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🗺️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🗺️ {lang==="fr"?"PLAN COW - CITERNES INTERACTIVES":lang==="en"?"COW PLAN - INTERACTIVE TANKS":lang==="es"?"PLAN COW - TANQUES INTERACTIVOS":"PLANO COW - TANQUES INTERATIVOS"}
              </div>
              <COWCoverageSVG lang={lang}/>
            </Card>

            {/* S4 */}
            <SL icon="⚙️" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                ⚙️ {lang==="fr"?"PARAMETRES COW - INTERACTIF":lang==="en"?"COW PARAMETERS - INTERACTIVE":lang==="es"?"PARAMETROS COW - INTERACTIVO":"PARAMETROS COW - INTERATIVO"}
              </div>
              <COWParamsSVG lang={lang}/>
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
              <QuestionBank lang={lang}/>
            </Card>

            {/* SUMMARY */}
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(121,85,72,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.brown}33`}}>
              <div style={{fontSize:11,color:C.brown,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.brown,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.brown},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(121,85,72,0.4)",marginTop:8}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - Crude Oil Washing":lang==="en"?"Quiz - Crude Oil Washing":lang==="es"?"Quiz - Crude Oil Washing":"Quiz - Crude Oil Washing"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"questoes"} · {lang==="fr"?"Lecon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Leccion 4/6":"Licao 4/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} lang={lang} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),400);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:72,marginBottom:10}}>{trophy.icon}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:trophy.color,marginBottom:6}}>
                {trophy.label[lang]||trophy.label.fr}
              </div>
              <div style={{fontSize:28,fontWeight:700,color:C.white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:18,color:trophy.color,fontWeight:700,marginBottom:16}}>{Math.round(quizScore/5*100)}%</div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:8,margin:"0 20px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,background:`linear-gradient(90deg,${C.brown},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(121,85,72,0.15)",border:`1px solid ${C.brown}55`,fontSize:14,color:C.brown,fontWeight:700}}>
                +{quizScore>=4?200:quizScore===3?120:60} {t.xp}
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.brown,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.brown},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(121,85,72,0.4)",marginBottom:10}}>
              {lang==="fr"?"LECON 5 - CHAUFFAGE CARGAISON =>":lang==="en"?"LESSON 5 - CARGO HEATING =>":lang==="es"?"LECCION 5 - CALEFACCION CARGA =>":"LICAO 5 - AQUECIMENTO CARGA =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
