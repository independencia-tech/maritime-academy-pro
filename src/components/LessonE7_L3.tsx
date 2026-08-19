import { useState, useEffect, useRef } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f", amber3:"#fff8e1",
  cyan:"#00e5ff", cyan2:"#80deea", cyan3:"#e0f7fa",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  purple:"#d500f9", purple2:"#ea80fc",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(0,229,255,0.18)", borderAmber:"rgba(255,179,0,0.22)",
  gold:"#c9922a", gold2:"#e8b94f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e7 — UMS & Automatisation",
    question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse",
    expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>",
    startQuiz:"COMMENCER LE QUIZ", backDash:"<= RETOUR AU DASHBOARD",
    youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer", xp:"XP gagnes" },
  en:{ back:"◀ Back", module:"Module e7 — UMS & Automation",
    question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>",
    startQuiz:"START QUIZ", backDash:"<= BACK TO DASHBOARD",
    youLearned:"You learned:", readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide", xp:"XP earned" },
  es:{ back:"◀ Volver", module:"Modulo e7 — UMS & Automatizacion",
    question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta",
    expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>",
    startQuiz:"EMPEZAR QUIZ", backDash:"<= VOLVER AL PANEL",
    youLearned:"Has aprendido:", readFirst:"Lee y luego comienza",
    showCorr:"Ver correccion", hideCorr:"Ocultar", xp:"XP ganados" },
  pt:{ back:"◀ Voltar", module:"Modulo e7 — UMS & Automatizacao",
    question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada",
    expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>",
    startQuiz:"COMECAR QUIZ", backDash:"<= VOLTAR AO PAINEL",
    youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece",
    showCorr:"Ver correcao", hideCorr:"Ocultar", xp:"XP ganhos" },
};

function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}
      viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:40,cy:70,r:0.8},{cx:300,cy:40,r:1.1},{cx:170,cy:110,r:0.7},
        {cx:340,cy:190,r:0.9},{cx:55,cy:310,r:0.7},{cx:270,cy:370,r:1.0},
        {cx:120,cy:490,r:0.8},{cx:310,cy:590,r:0.7},{cx:65,cy:670,r:1.2}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={C.cyan2} opacity={0.22+Math.sin(i)*0.12}/>
      ))}
    </svg>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:38,height:38,borderRadius:13,background:`${color}15`,
        border:`1.5px solid ${color}55`,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:19,flexShrink:0,
        boxShadow:`0 0 12px ${color}20`}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:800,color,letterSpacing:2,
        fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

function getTrophy(score, total) {
  const pct = score / total;
  if (pct===1)  return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",en:"Perfect!",es:"Perfecto!",pt:"Perfeito!"}};
  if (pct>=0.8) return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !",en:"Excellent!",es:"Excelente!",pt:"Excelente!"}};
  if (pct>=0.6) return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",en:"Well done!",es:"Bien!",pt:"Bem feito!"}};
  if (pct>=0.4) return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",en:"Keep going!",es:"Sigue!",pt:"Continue!"}};
  return              {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ══════════════════════════════════════
// SVG 1 — GOVERNOR
// ══════════════════════════════════════
function GovernorSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [rpm, setRpm] = useState(85);
  const [setpoint, setSetpoint] = useState(85);
  const [load, setLoad] = useState(60);
  const [mode, setMode] = useState("auto");
  const [running, setRunning] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setRpm(prev => {
        const err = setpoint - prev;
        const corr = err * 0.08 + (Math.random()-0.5)*0.4;
        return Math.max(60,Math.min(105,prev+corr));
      });
    }, 120);
    return () => clearInterval(ref.current);
  }, [setpoint, running]);

  const W=290; const H=200;
  const rpmPct=(rpm-60)/45;
  const spPct=(setpoint-60)/45;
  const arcR=68;
  const angle=-150+rpmPct*300;
  const rad=angle*Math.PI/180;
  const nx=145+arcR*Math.cos(rad);
  const ny=108+arcR*Math.sin(rad);
  const rpmColor=rpm>100?C.red:rpm>92?C.amber:C.green;

  const arc=(s,e,r)=>{
    const sa=s*Math.PI/180; const ea=e*Math.PI/180;
    const x1=145+r*Math.cos(sa); const y1=108+r*Math.sin(sa);
    const x2=145+r*Math.cos(ea); const y2=108+r*Math.sin(ea);
    return `M${x1},${y1} A${r},${r} 0 ${e-s>180?1:0},1 ${x2},${y2}`;
  };

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <path d={arc(-150,-30,68)} stroke={C.green} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d={arc(-30,30,68)} stroke={C.amber} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4"/>
        <path d={arc(30,150,68)} stroke={C.red} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4"/>
        {(()=>{const a=(-150+spPct*300)*Math.PI/180;return <circle cx={145+78*Math.cos(a)} cy={108+78*Math.sin(a)} r="5" fill={C.amber} opacity="0.9"/>;})()}
        <line x1={145} y1={108} x2={nx} y2={ny} stroke={rpmColor} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={145} cy={108} r="7" fill={C.bg2} stroke={rpmColor} strokeWidth="2"/>
        <text x={145} y={101} textAnchor="middle" fontSize="20" fontWeight="800" fill={rpmColor} fontFamily="Courier New">{Math.round(rpm)}</text>
        <text x={145} y={115} textAnchor="middle" fontSize="7" fill={C.muted} fontFamily="Courier New">RPM</text>
        <text x={60} y={158} textAnchor="middle" fontSize="6.5" fill={C.green}>ECO</text>
        <text x={145} y={42} textAnchor="middle" fontSize="6.5" fill={C.amber}>MCR</text>
        <text x={230} y={158} textAnchor="middle" fontSize="6.5" fill={C.red}>OVER</text>
        <text x={145} y={180} textAnchor="middle" fontSize="8" fill={C.amber} fontFamily="Courier New">SP: {setpoint} RPM</text>
        <rect x={18} y={55} width={13} height={95} rx="3" fill={C.bg3}/>
        <rect x={18} y={55+95*(1-load/100)} width={13} height={95*load/100} rx="3" fill={load>85?C.red:load>70?C.amber:C.green}/>
        <text x={24} y={50} textAnchor="middle" fontSize="6" fill={C.muted}>LOAD</text>
        <text x={24} y={162} textAnchor="middle" fontSize="6" fill={C.muted}>{load}%</text>
        <rect x={238} y={55} width={44} height={16} rx="4"
          fill={mode==="auto"?"rgba(0,229,255,0.15)":"rgba(255,179,0,0.15)"}
          stroke={mode==="auto"?C.cyan:C.amber} strokeWidth="1"/>
        <text x={260} y={67} textAnchor="middle" fontSize="7.5" fontWeight="700"
          fill={mode==="auto"?C.cyan:C.amber} fontFamily="Courier New">{mode.toUpperCase()}</text>
        <circle cx={256} cy={84} r="4" fill={running?C.green:C.red}/>
        <text x={265} y={88} fontSize="6.5" fill={C.muted}>{running?"RUN":"STOP"}</text>
        <text x={W/2} y={H-4} textAnchor="middle" fontSize="6.5" fill={C.dim}>
          {lbl("Regler consigne et charge","Adjust setpoint and load","Ajustar consigna y carga","Ajustar consigna e carga")}
        </text>
      </svg>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>SP: {setpoint} RPM</div>
          <input type="range" min={60} max={105} value={setpoint} onChange={e=>setSetpoint(Number(e.target.value))} style={{width:"100%",accentColor:C.amber}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:3}}>LOAD: {load}%</div>
          <input type="range" min={0} max={100} value={load} onChange={e=>setLoad(Number(e.target.value))} style={{width:"100%",accentColor:C.green}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setMode(m=>m==="auto"?"manual":"auto")}
          style={{flex:1,padding:"9px 0",background:mode==="auto"?"rgba(0,229,255,0.1)":"rgba(255,179,0,0.1)",
            border:`1px solid ${mode==="auto"?C.cyan:C.amber}`,borderRadius:10,
            color:mode==="auto"?C.cyan:C.amber,fontFamily:"Courier New",fontSize:11,cursor:"pointer"}}>
          {mode==="auto"?"→ MANUAL":"→ AUTO"}
        </button>
        <button onClick={()=>setRunning(r=>!r)}
          style={{flex:1,padding:"9px 0",background:running?"rgba(255,23,68,0.1)":"rgba(0,230,118,0.1)",
            border:`1px solid ${running?C.red:C.green}`,borderRadius:10,
            color:running?C.red:C.green,fontFamily:"Courier New",fontSize:11,cursor:"pointer"}}>
          {running?"⏹ STOP":"▶ START"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — FUEL CONTROL
// ══════════════════════════════════════
function FuelControlSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [load, setLoad] = useState(70);
  const [fuelType, setFuelType] = useState("hfo");
  const W=290; const H=188; const PL=38; const PR=14; const PT=18; const PB=28;
  const GW=W-PL-PR; const GH=H-PT-PB;
  const curves={hfo:[0,8,18,30,44,58,73,89,100],mdo:[0,7,16,27,40,54,68,83,95],lng:[0,6,14,24,36,48,61,75,88]};
  const fuelColors={hfo:C.amber,mdo:C.cyan,lng:C.green};
  const curve=curves[fuelType]; const col=fuelColors[fuelType];
  const pts=curve.map((v,i)=>`${PL+(i/8)*GW},${PT+GH-(v/100)*GH}`).join(" ");
  const li=load/100*8; const i0=Math.floor(li); const tf=li-i0;
  const lf=curve[i0]+tf*(curve[Math.min(i0+1,8)]-curve[i0]);
  const lx=PL+(load/100)*GW; const ly=PT+GH-(lf/100)*GH;
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {[0,25,50,75,100].map(v=>{const y=PT+GH-(v/100)*GH;return(<g key={v}><line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><text x={PL-3} y={y+3} textAnchor="end" fontSize="6.5" fill={C.steel3}>{v}</text></g>);})}
        {[0,25,50,75,100].map(v=>{const x=PL+(v/100)*GW;return(<g key={v}><line x1={x} y1={PT} x2={x} y2={PT+GH} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><text x={x} y={PT+GH+10} textAnchor="middle" fontSize="6.5" fill={C.steel3}>{v}%</text></g>);})}
        <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points={`${PL},${PT+GH} ${pts} ${W-PR},${PT+GH}`} fill={`${col}15`} stroke="none"/>
        <line x1={lx} y1={PT} x2={lx} y2={PT+GH} stroke={col} strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
        <circle cx={lx} cy={ly} r="5" fill={col} opacity="0.9"/>
        <rect x={lx-26} y={ly-20} width={52} height={14} rx="3" fill={C.bg2} stroke={col} strokeWidth="1"/>
        <text x={lx} y={ly-10} textAnchor="middle" fontSize="7.5" fill={col} fontFamily="Courier New">{lf.toFixed(0)}% FUEL</text>
        <text x={PL+GW/2} y={H-3} textAnchor="middle" fontSize="7" fill={C.muted}>{lbl("CHARGE MOTEUR %","ENGINE LOAD %","CARGA MOTOR %","CARGA MOTOR %")}</text>
        <text x={8} y={PT+GH/2} textAnchor="middle" fontSize="7" fill={C.muted} transform={`rotate(-90,8,${PT+GH/2})`}>FUEL %</text>
      </svg>
      <div style={{marginTop:8}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:3}}>{lbl("Charge","Load","Carga","Carga")}: {load}%</div>
        <input type="range" min={0} max={100} value={load} onChange={e=>setLoad(Number(e.target.value))} style={{width:"100%",accentColor:col}}/>
      </div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        {["hfo","mdo","lng"].map(f=>(
          <button key={f} onClick={()=>setFuelType(f)}
            style={{flex:1,padding:"7px 0",background:fuelType===f?`${fuelColors[f]}18`:"transparent",
              border:`1px solid ${fuelType===f?fuelColors[f]:"rgba(255,255,255,0.15)"}`,
              borderRadius:8,color:fuelType===f?fuelColors[f]:C.muted,fontFamily:"Courier New",fontSize:10,cursor:"pointer"}}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>
      {fuelType==="hfo"&&<div style={{marginTop:8,padding:"7px 10px",background:"rgba(255,179,0,0.07)",border:`1px solid ${C.amber}33`,borderRadius:8,fontSize:10,color:C.amber}}>⚠ HFO: {lbl("Prechauffage 130-140C obligatoire","Preheating 130-140C required","Precalentamiento 130-140C obligatorio","Pre-aquecimento 130-140C obrigatorio")}</div>}
      {fuelType==="lng"&&<div style={{marginTop:8,padding:"7px 10px",background:"rgba(0,230,118,0.07)",border:`1px solid ${C.green}33`,borderRadius:8,fontSize:10,color:C.green}}>✓ LNG: {lbl("SOx = 0","SOx = 0","SOx = 0","SOx = 0")}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TELEGRAPH
// ══════════════════════════════════════
function TelegraphSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [bridgeOrder,setBridgeOrder]=useState("STOP");
  const [engineResponse,setEngineResponse]=useState("STOP");
  const [pending,setPending]=useState(false);
  const [log,setLog]=useState([{time:"08:00",order:"STOP"},{time:"08:12",order:"SLOW AHEAD"}]);
  const orders=[
    {id:"FULL AHEAD",color:C.green},{id:"HALF AHEAD",color:"#69f0ae"},
    {id:"SLOW AHEAD",color:"#b9f6ca"},{id:"DEAD SLOW AHEAD",color:"#ccff90"},
    {id:"STOP",color:C.amber},{id:"DEAD SLOW ASTERN",color:"#ff6e40"},
    {id:"SLOW ASTERN",color:"#ff3d00"},{id:"HALF ASTERN",color:C.red},
    {id:"FULL ASTERN",color:"#d50000"},
  ];
  const send=(ord)=>{
    setBridgeOrder(ord.id);setPending(true);
    const now=new Date();
    const t=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setTimeout(()=>{setEngineResponse(ord.id);setPending(false);setLog(l=>[{time:t,order:ord.id},...l].slice(0,5));},1200);
  };
  const W=290; const H=58;
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <rect x={8} y={8} width={118} height={42} rx="6" fill={C.bg3} stroke={pending?"rgba(255,179,0,0.6)":C.border} strokeWidth="1.5"/>
        <text x={67} y={22} textAnchor="middle" fontSize="6.5" fill={C.muted} letterSpacing="1">{lbl("PASSERELLE","BRIDGE","PUENTE","PONTE")}</text>
        <text x={67} y={40} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={orders.find(o=>o.id===bridgeOrder)?.color||C.white} fontFamily="Courier New">{bridgeOrder}</text>
        <text x={145} y={32} textAnchor="middle" fontSize="13" fill={pending?C.amber:C.steel2}>{pending?"⟳":"→"}</text>
        {pending&&<text x={145} y={46} textAnchor="middle" fontSize="6" fill={C.amber}>ACK...</text>}
        <rect x={164} y={8} width={118} height={42} rx="6" fill={C.bg3} stroke={pending?"rgba(255,179,0,0.4)":"rgba(0,230,118,0.3)"} strokeWidth="1.5"/>
        <text x={223} y={22} textAnchor="middle" fontSize="6.5" fill={C.muted} letterSpacing="1">{lbl("MACHINE","ENGINE ROOM","MAQUINAS","MAQUINAS")}</text>
        <text x={223} y={40} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={orders.find(o=>o.id===engineResponse)?.color||C.white} fontFamily="Courier New">{engineResponse}</text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginTop:8}}>
        {orders.map(ord=>(
          <button key={ord.id} onClick={()=>send(ord)}
            style={{padding:"5px 2px",background:bridgeOrder===ord.id?`${ord.color}22`:"transparent",
              border:`1px solid ${bridgeOrder===ord.id?ord.color:"rgba(255,255,255,0.1)"}`,
              borderRadius:5,color:bridgeOrder===ord.id?ord.color:C.muted,
              fontFamily:"Courier New",fontSize:7.5,cursor:"pointer",lineHeight:1.2}}>
            {ord.id}
          </button>
        ))}
      </div>
      <div style={{marginTop:8,background:C.bg1,borderRadius:6,padding:6,maxHeight:72,overflow:"auto"}}>
        {log.map((l,i)=>(
          <div key={i} style={{display:"flex",gap:8,fontFamily:"Courier New",fontSize:9,
            color:i===0?C.green:C.muted,borderBottom:i<log.length-1?"1px solid rgba(255,255,255,0.04)":"none",padding:"2px 0"}}>
            <span style={{color:C.steel2}}>{l.time}</span><span>{l.order}</span>
            <span style={{marginLeft:"auto",color:C.green}}>✓ ACK</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SAFETY SHUTDOWNS
// ══════════════════════════════════════
function SafetyShutdownSVG({ lang }) {
  const lbl = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);
  const [params,setParams]=useState({lubOilPress:2.8,coolantTemp:82,exhaustTemp:340,overspeed:88,crankPress:-3.2});
  const [selected,setSelected]=useState("lubOilPress");
  const limits={
    lubOilPress:{lo:1.5,hi:null,unit:"bar",label:"Lube Oil Press",dir:"lo"},
    coolantTemp:{lo:null,hi:95,unit:"C",label:"Coolant Temp",dir:"hi"},
    exhaustTemp:{lo:null,hi:420,unit:"C",label:"Exhaust Temp",dir:"hi"},
    overspeed:{lo:null,hi:103,unit:"RPM",label:"Overspeed",dir:"hi"},
    crankPress:{lo:-5,hi:null,unit:"mbar",label:"Crankcase Press",dir:"lo"},
  };
  const ranges={lubOilPress:[0.5,4.5],coolantTemp:[60,105],exhaustTemp:[200,480],overspeed:[60,115],crankPress:[-8,2]};
  const tripped={};
  Object.entries(params).forEach(([k,v])=>{
    const lim=limits[k];
    if(lim.dir==="lo"&&lim.lo!==null&&v<=lim.lo)tripped[k]=true;
    if(lim.dir==="hi"&&lim.hi!==null&&v>=lim.hi)tripped[k]=true;
  });
  const anyTripped=Object.values(tripped).some(Boolean);
  const paramList=Object.entries(limits);
  const W=290; const H=155;
  return (
    <div>
      {anyTripped&&<div style={{background:"rgba(255,23,68,0.12)",border:`1px solid ${C.red}`,borderRadius:8,padding:"7px 12px",marginBottom:8,color:C.red,fontFamily:"Courier New",fontSize:11,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>🛑</span><span>{lbl("ARRET D'URGENCE DECLENCHE","EMERGENCY SHUTDOWN TRIGGERED","PARADA DE EMERGENCIA ACTIVADA","PARADA DE EMERGENCIA ATIVADA")}</span></div>}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <rect x={114} y={46} width={62} height={54} rx="8"
          fill={anyTripped?"rgba(255,23,68,0.15)":"rgba(0,229,255,0.08)"}
          stroke={anyTripped?C.red:C.cyan} strokeWidth="1.5"/>
        <text x={145} y={68} textAnchor="middle" fontSize="8.5" fill={anyTripped?C.red:C.cyan} fontFamily="Courier New" fontWeight="700">MAIN</text>
        <text x={145} y={80} textAnchor="middle" fontSize="8.5" fill={anyTripped?C.red:C.cyan} fontFamily="Courier New" fontWeight="700">ENGINE</text>
        <text x={145} y={93} textAnchor="middle" fontSize="14">{anyTripped?"🛑":"⚙️"}</text>
        {paramList.map(([k,lim],idx)=>{
          const pos=[{x:10,y:20},{x:10,y:80},{x:218,y:20},{x:218,y:80},{x:110,y:2}][idx];
          const isTrip=tripped[k]; const isSel=selected===k;
          return (
            <g key={k} style={{cursor:"pointer"}} onClick={()=>setSelected(k)}>
              <rect x={pos.x} y={pos.y} width={68} height={26} rx="4"
                fill={isTrip?"rgba(255,23,68,0.2)":isSel?"rgba(0,229,255,0.12)":"rgba(13,31,60,0.8)"}
                stroke={isTrip?C.red:isSel?C.cyan:"rgba(84,110,122,0.4)"} strokeWidth="1"/>
              <text x={pos.x+34} y={pos.y+10} textAnchor="middle" fontSize="6" fill={isTrip?C.red:C.muted}>{lim.label}</text>
              <text x={pos.x+34} y={pos.y+21} textAnchor="middle" fontSize="8.5"
                fill={isTrip?C.red:isSel?C.cyan:C.white} fontFamily="Courier New" fontWeight="700">
                {params[k]} {lim.unit}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{background:C.bg1,borderRadius:8,padding:8,marginTop:8}}>
        <div style={{color:tripped[selected]?C.red:C.cyan,fontFamily:"Courier New",fontSize:10,marginBottom:4}}>
          {limits[selected].label}: {params[selected]} {limits[selected].unit}{tripped[selected]?" — TRIP!":""}
        </div>
        <input type="range" min={ranges[selected][0]} max={ranges[selected][1]}
          step={selected==="lubOilPress"||selected==="crankPress"?0.1:1}
          value={params[selected]} onChange={e=>setParams(p=>({...p,[selected]:Number(e.target.value)}))}
          style={{width:"100%",accentColor:tripped[selected]?C.red:C.cyan}}/>
        {tripped[selected]&&<button onClick={()=>setParams(p=>({...p,[selected]:{lubOilPress:2.8,coolantTemp:82,exhaustTemp:340,overspeed:88,crankPress:-3.2}[selected]}))}
          style={{marginTop:6,padding:"4px 12px",background:"rgba(0,230,118,0.12)",border:`1px solid ${C.green}`,borderRadius:5,color:C.green,fontSize:9,fontFamily:"Courier New",cursor:"pointer"}}>✓ RESET</button>}
      </div>
      <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
        {paramList.map(([k,lim])=>(
          <div key={k} onClick={()=>setSelected(k)}
            style={{padding:"4px 8px",background:tripped[k]?"rgba(255,23,68,0.1)":selected===k?"rgba(0,229,255,0.08)":"rgba(13,31,60,0.5)",
              border:`1px solid ${tripped[k]?C.red:selected===k?C.cyan:"rgba(84,110,122,0.3)"}`,borderRadius:5,cursor:"pointer"}}>
            <div style={{fontSize:7.5,color:tripped[k]?C.red:C.muted}}>{lim.label}</div>
            <div style={{fontSize:8.5,color:tripped[k]?C.red:C.white,fontFamily:"Courier New"}}>{lim.dir==="lo"?`LO: ${lim.lo}`:`HI: ${lim.hi}`} {lim.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);

  const qs = {
    fr:[
      {id:"q1",q:"Quel signal electrique utilise l'actuateur du governor ?\n(Repondre en mA)"},
      {id:"q2",q:"A quelle temperature le HFO doit-il etre prechauffé avant injection ?\n(Repondre en C)"},
      {id:"q3",q:"Quel est l'ordre telegraph le plus lent en marche avant ?\n(Repondre en anglais)"},
      {id:"q4",q:"Un safety shutdown a-t-il priorite sur un ordre telegraph FULL AHEAD ?\n(Repondre : oui ou non)"},
      {id:"q5",q:"Quel parametre declenche un overspeed shutdown ?\n(Repondre : RPM, temperature ou pression)"},
    ],
    en:[
      {id:"q1",q:"What electrical signal does the governor actuator use?\n(Answer in mA)"},
      {id:"q2",q:"At what temperature must HFO be preheated before injection?\n(Answer in C)"},
      {id:"q3",q:"What is the slowest ahead telegraph order?\n(Answer in English)"},
      {id:"q4",q:"Does a safety shutdown take priority over a FULL AHEAD telegraph order?\n(Answer: yes or no)"},
      {id:"q5",q:"Which parameter triggers an overspeed shutdown?\n(Answer: RPM, temperature or pressure)"},
    ],
    es:[
      {id:"q1",q:"?Que senal electrica usa el actuador del governor?\n(Responder en mA)"},
      {id:"q2",q:"?A que temperatura se debe precalentar el HFO antes de la inyeccion?\n(Responder en C)"},
      {id:"q3",q:"?Cual es la orden de telegrafo de avance mas lenta?\n(Responder en ingles)"},
      {id:"q4",q:"?Una parada de seguridad tiene prioridad sobre una orden FULL AHEAD?\n(Responder: si o no)"},
      {id:"q5",q:"?Que parametro activa un paro por sobrevelocidad?\n(Responder: RPM, temperatura o presion)"},
    ],
    pt:[
      {id:"q1",q:"Que sinal eletrico usa o atuador do governor?\n(Responder em mA)"},
      {id:"q2",q:"A que temperatura o HFO deve ser pre-aquecido antes da injecao?\n(Responder em C)"},
      {id:"q3",q:"Qual e a ordem de telegrafo de avanco mais lenta?\n(Responder em ingles)"},
      {id:"q4",q:"Uma parada de seguranca tem prioridade sobre uma ordem FULL AHEAD?\n(Responder: sim ou nao)"},
      {id:"q5",q:"Que parametro aciona uma parada por sobrevelocidade?\n(Responder: RPM, temperatura ou pressao)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/\s/g,"");
    if(id==="q1") return v.includes("4-20")||v.includes("420")||v==="4"||v==="20";
    if(id==="q2") return v.includes("130")||v.includes("135")||v.includes("140");
    if(id==="q3") return v.includes("dead")&&v.includes("slow");
    if(id==="q4") return v==="oui"||v==="yes"||v==="si"||v==="sim";
    if(id==="q5") return v.includes("rpm")||v.includes("vitesse")||v.includes("speed")||v.includes("velocidad")||v.includes("velocidade");
    return false;
  };

  const corrKey={
    fr:{q1:"4-20 mA",q2:"130-140C",q3:"Dead Slow Ahead",q4:"Oui",q5:"RPM (vitesse)"},
    en:{q1:"4-20 mA",q2:"130-140C",q3:"Dead Slow Ahead",q4:"Yes",q5:"RPM (speed)"},
    es:{q1:"4-20 mA",q2:"130-140C",q3:"Dead Slow Ahead",q4:"Si",q5:"RPM (velocidad)"},
    pt:{q1:"4-20 mA",q2:"130-140C",q3:"Dead Slow Ahead",q4:"Sim",q5:"RPM (velocidade)"},
  };

  const expl={
    fr:"OK Q1: 4-20 mA — signal standard actuateur fuel rack, 0 mA = rupture cable (failsafe)\nOK Q2: 130-140C — HFO 380 cSt doit atteindre 12-15 cSt pour bonne atomisation\nOK Q3: Dead Slow Ahead — environ 25-30% MCR, utilisé en maneuvre portuaire\nOK Q4: Oui — safety shutdown toujours prioritaire, meme sur FULL AHEAD\nOK Q5: RPM — overspeed = depassement 103-110% MCR, risque mecanique grave",
    en:"OK Q1: 4-20 mA — standard fuel rack actuator signal, 0 mA = cable break (failsafe)\nOK Q2: 130-140C — HFO 380 cSt must reach 12-15 cSt for good atomization\nOK Q3: Dead Slow Ahead — about 25-30% MCR, used in port maneuvering\nOK Q4: Yes — safety shutdown always has priority, even over FULL AHEAD\nOK Q5: RPM — overspeed = exceeding 103-110% MCR, serious mechanical risk",
    es:"OK Q1: 4-20 mA — senal estandar actuador cremallera combustible, 0 mA = ruptura cable\nOK Q2: 130-140C — HFO 380 cSt debe alcanzar 12-15 cSt para buena atomizacion\nOK Q3: Dead Slow Ahead — aprox. 25-30% MCR, usado en maniobra portuaria\nOK Q4: Si — parada de seguridad siempre prioritaria, incluso sobre FULL AHEAD\nOK Q5: RPM — sobrevelocidad = superar 103-110% MCR, riesgo mecanico grave",
    pt:"OK Q1: 4-20 mA — sinal padrao atuador cremalheira combustivel, 0 mA = ruptura cabo\nOK Q2: 130-140C — HFO 380 cSt deve atingir 12-15 cSt para boa atomizacao\nOK Q3: Dead Slow Ahead — aprox. 25-30% MCR, usado em manobras portuarias\nOK Q4: Sim — parada de seguranca sempre prioritaria, mesmo sobre FULL AHEAD\nOK Q5: RPM — sobrevelocidade = superar 103-110% MCR, risco mecanico grave",
  };

  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(0,229,255,0.06)",border:`1px solid ${C.cyan}33`,
        fontSize:11,color:C.cyan2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: 4-20mA | HFO 130-140C | Dead Slow Ahead | Shutdown prioritaire | Overspeed = RPM"
        :lang==="en"?"Key: 4-20mA | HFO 130-140C | Dead Slow Ahead | Shutdown priority | Overspeed = RPM"
        :lang==="es"?"Clave: 4-20mA | HFO 130-140C | Dead Slow Ahead | Parada prioritaria | Sobrevelocidad = RPM"
        :"Chave: 4-20mA | HFO 130-140C | Dead Slow Ahead | Parada prioritaria | Sobrevelocidade = RPM"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.6,
            whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]}
            onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"12px",borderRadius:12,
              background:"rgba(255,255,255,0.06)",
              border:`1.5px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,
              textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:5,fontWeight:700,
              color:chk(q.id,ans[q.id])?C.green:C.red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"12px",borderRadius:14,
          border:`1px solid ${C.amber}55`,background:"rgba(255,179,0,0.1)",
          color:C.amber2,fontSize:12,fontWeight:800,cursor:"pointer",marginBottom:8}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"14px",borderRadius:14,
          background:"rgba(0,230,118,0.07)",border:`1px solid ${C.green}33`,
          fontSize:11,color:C.white,lineHeight:1.85,whiteSpace:"pre-line"}}>
          {expl[lang]||expl.fr}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM PREMIUM+
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [started,setStarted]=useState(false);
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs=[
    {q:lbl("Quel est le role principal du governor electronique ?","What is the main role of the electronic governor?","Cual es el papel principal del governor electronico?","Qual e o papel principal do governor eletronico?"),
      opts:[lbl("Controler la vitesse du ME en ajustant le debit carburant","Control ME speed by adjusting fuel delivery","Controlar velocidad del ME ajustando el combustible","Controlar velocidade do ME ajustando o combustivel"),lbl("Mesurer la temperature des gaz","Measure exhaust gas temperature","Medir temperatura de gases","Medir temperatura dos gases"),lbl("Activer le systeme de refroidissement","Activate cooling system","Activar el sistema de enfriamiento","Ativar o sistema de resfriamento"),lbl("Controler la pression d'huile","Control oil pressure","Controlar la presion de aceite","Controlar a pressao do oleo")],
      ans:0,expl:lbl("Le governor electronique compare en permanence RPM reel vs consigne et ajuste le fuel rack via signal 4-20mA pour maintenir la vitesse.","The electronic governor continuously compares actual RPM vs setpoint and adjusts the fuel rack via 4-20mA signal.","El governor electronico compara continuamente RPM real vs consigna y ajusta la cremallera via senal 4-20mA.","O governor eletronico compara continuamente RPM real vs consigna e ajusta a cremalheira via sinal 4-20mA.")},
    {q:lbl("Que signifie 0 mA sur le signal governor ?","What does 0 mA on the governor signal mean?","Que significa 0 mA en la senal del governor?","O que significa 0 mA no sinal do governor?"),
      opts:["Failsafe",lbl("Valeur minimum normale","Normal minimum value","Valor minimo normal","Valor minimo normal"),lbl("Puissance maximale","Maximum power","Potencia maxima","Potencia maxima"),lbl("Mode ralenti","Idle mode","Modo ralenti","Modo marcha lenta")],
      ans:0,expl:lbl("0 mA est impossible en fonctionnement normal (min = 4 mA). Indique une rupture de cable — failsafe : fuel rack en position securite.","0 mA is impossible in normal operation (min = 4 mA). Indicates cable break — failsafe: fuel rack in safe position.","0 mA es imposible en operacion normal (min = 4 mA). Indica ruptura de cable — failsafe.","0 mA e impossivel em operacao normal (min = 4 mA). Indica ruptura de cabo — failsafe.")},
    {q:lbl("Pourquoi le HFO necessite-t-il un prechauffage a 130-140C ?","Why does HFO require preheating at 130-140C?","Por que el HFO requiere precalentamiento a 130-140C?","Por que o HFO requer pre-aquecimento a 130-140C?"),
      opts:[lbl("Reduire la viscosite pour bonne atomisation","Reduce viscosity for good atomization","Reducir la viscosidad para buena atomizacion","Reduzir a viscosidade para boa atomizacao"),lbl("Augmenter la puissance","Increase power","Aumentar la potencia","Aumentar a potencia"),lbl("Respecter MARPOL","Comply with MARPOL","Cumplir MARPOL","Cumprir MARPOL"),lbl("Refroidir les injecteurs","Cool the injectors","Enfriar los inyectores","Resfriar os injetores")],
      ans:0,expl:lbl("HFO a 380 cSt est tres visqueux a temperature ambiante. Prechauffage necessaire pour atteindre 12-15 cSt permettant une bonne pulverisation dans les cylindres.","HFO at 380 cSt is very viscous at ambient temperature. Preheating required to reach 12-15 cSt for good atomization in cylinders.","HFO a 380 cSt es muy viscoso a temperatura ambiente. Precalentamiento necesario para alcanzar 12-15 cSt.","HFO a 380 cSt e muito viscoso na temperatura ambiente. Pre-aquecimento necessario para atingir 12-15 cSt.")},
    {q:lbl("Que signifie MCR en propulsion marine ?","What does MCR mean in marine propulsion?","Que significa MCR en propulsion marina?","O que significa MCR em propulsao maritima?"),
      opts:["Maximum Continuous Rating","Motor Control Room","Main Cooling Relay","Mechanical Combustion Ratio"],
      ans:0,expl:lbl("MCR = Maximum Continuous Rating : puissance maximale que le moteur peut developper en continu sur 24h. Reference de toutes les limites moteur.","MCR = Maximum Continuous Rating: maximum power the engine can develop continuously for 24h. Reference for all engine limits.","MCR = Maximum Continuous Rating: potencia maxima que el motor puede desarrollar continuamente durante 24h.","MCR = Maximum Continuous Rating: potencia maxima que o motor pode desenvolver continuamente por 24h.")},
    {q:lbl("A quel seuil RPM se declenche typiquement l'overspeed shutdown ?","At what RPM threshold does overspeed shutdown typically trigger?","A que umbral de RPM se activa tipicamente el shutdown por sobrevelocidad?","A que limite de RPM aciona tipicamente o shutdown por sobrevelocidade?"),
      opts:["90% MCR","100% MCR","103-110% MCR","120% MCR"],
      ans:2,expl:lbl("L'overspeed se declenche a 103-110% MCR selon le constructeur. En dessous, le governor corrige normalement. Au-dela, risque mecanique grave : vilebrequin, bielles.","Overspeed triggers at 103-110% MCR depending on manufacturer. Below, governor corrects normally. Beyond, serious mechanical risk: crankshaft, connecting rods.","El sobreregimen se activa al 103-110% MCR segun el fabricante. Por encima, riesgo mecanico grave.","A sobrevelocidade aciona em 103-110% MCR conforme fabricante.")},
    {q:lbl("Quelle est la difference entre slow-down et shutdown ?","What is the difference between slow-down and shutdown?","Cual es la diferencia entre slow-down y shutdown?","Qual e a diferenca entre slow-down e shutdown?"),
      opts:[lbl("Ce sont des synonymes","They are synonyms","Son sinonimos","Sao sinonimos"),lbl("Slow-down = reduction charge auto, Shutdown = arret complet","Slow-down = auto load reduction, Shutdown = complete stop","Slow-down = reduccion carga auto, Shutdown = parada completa","Slow-down = reducao carga auto, Shutdown = parada completa"),lbl("Slow-down = arret moteur, Shutdown = reduction","Slow-down = engine stop, Shutdown = reduction","Slow-down = parada motor, Shutdown = reduccion","Slow-down = parada motor, Shutdown = reducao"),lbl("Slow-down = mode eco","Slow-down = eco mode","Slow-down = modo eco","Slow-down = modo eco")],
      ans:1,expl:lbl("Slow-down reduit la charge automatiquement pour laisser l'equipage intervenir. Shutdown stoppe completement pour proteger l'equipement. Priorite : alerte > slow-down > shutdown.","Slow-down reduces load automatically to give crew time to intervene. Shutdown completely stops to protect equipment. Priority: alert > slow-down > shutdown.","Slow-down reduce la carga automaticamente para dar tiempo a la tripulacion. Shutdown para completamente.","Slow-down reduz a carga automaticamente para dar tempo a tripulacao. Shutdown para completamente.")},
    {q:lbl("Quel carburant marine a une teneur en soufre nulle ?","Which marine fuel has zero sulfur content?","Que combustible marino tiene contenido de azufre nulo?","Qual combustivel maritimo tem teor de enxofre zero?"),
      opts:["HFO 380 cSt","MDO (Marine Diesel Oil)","LNG (Liquefied Natural Gas)","MGO 0.1%"],
      ans:2,expl:lbl("Le GNL (LNG) ne contient pas de soufre — SOx = 0. HFO jusqu'a 3.5% S hors ECA, MDO/MGO < 0.1% S en zone ECA selon MARPOL Annexe VI.","LNG contains no sulfur — SOx = 0. HFO up to 3.5% S outside ECA, MDO/MGO < 0.1% S in ECA per MARPOL Annex VI.","El GNL (LNG) no contiene azufre — SOx = 0. HFO hasta 3,5% S fuera de ECA.","O GNL (LNG) nao contem enxofre — SOx = 0. HFO ate 3,5% S fora de ECA.")},
    {q:lbl("Que doit faire le mecanicien quand il recoit un ordre HALF ASTERN au telegraph ?","What must the engineer do when receiving a HALF ASTERN telegraph order?","Que debe hacer el mecanico cuando recibe una orden HALF ASTERN en el telegrafo?","O que o mecanico deve fazer ao receber uma ordem HALF ASTERN no telegrafo?"),
      opts:[lbl("Ignorer si le navire avance","Ignore if vessel is moving ahead","Ignorar si el buque avanza","Ignorar se o navio avanca"),lbl("Accuser reception (ACK) puis executer immediatement","Acknowledge (ACK) then execute immediately","Acusar recibo (ACK) luego ejecutar inmediatamente","Acusar recibo (ACK) e executar imediatamente"),lbl("Appeler le capitaine d'abord","Call captain first","Llamar al capitan primero","Chamar o capitao primeiro"),lbl("Attendre 5 minutes","Wait 5 minutes","Esperar 5 minutos","Aguardar 5 minutos")],
      ans:1,expl:lbl("Procedure telegraph : accuser reception (ACK) immediatement pour confirmer la reception, puis executer l'ordre. Tout delai peut causer un abordage en maneuvre portuaire.","Telegraph procedure: acknowledge (ACK) immediately to confirm receipt, then execute the order. Any delay can cause collision in port maneuvering.","Procedimiento telegrafo: acusar recibo (ACK) inmediatamente, luego ejecutar. Cualquier retraso puede causar abordaje.","Procedimento telegrafo: acusar recibo (ACK) imediatamente, depois executar.")},
    {q:lbl("Qu'est-ce que le fuel rack sur un moteur diesel ?","What is the fuel rack on a diesel engine?","Que es la cremallera de combustible en un motor diesel?","O que e a cremalheira de combustivel em um motor diesel?"),
      opts:[lbl("Le filtre a carburant","The fuel filter","El filtro de combustible","O filtro de combustivel"),lbl("La cremaillere d'injection controlant le debit carburant","The injection rack controlling fuel delivery","La cremallera de inyeccion que controla el caudal","A cremalheira de injecao que controla o fluxo"),lbl("Le reservoir journalier","The day tank","El tanque diario","O tanque diario"),lbl("La pompe de transfert","The transfer pump","La bomba de transferencia","A bomba de transferencia")],
      ans:1,expl:lbl("Le fuel rack est la cremaillere mecanique reliee aux pompes d'injection. Sa position (0-100%) determine la quantite de carburant injectee. L'actuateur governor deplace cette cremaillere via signal 4-20mA.","The fuel rack is the mechanical rack connected to injection pumps. Its position (0-100%) determines fuel injected. The governor actuator moves this rack via 4-20mA signal.","La cremallera de combustible es la cremallera mecanica conectada a las bombas de inyeccion.","A cremalheira de combustivel e a cremalheira mecanica conectada as bombas de injecao.")},
    {q:lbl("Pourquoi la basse pression d'huile declenche-t-elle un shutdown immediat ?","Why does low oil pressure trigger an immediate shutdown?","Por que la baja presion de aceite activa un shutdown inmediato?","Por que a baixa pressao de oleo aciona um shutdown imediato?"),
      opts:[lbl("C'est juste une alarme, pas un shutdown","It's just an alarm, not a shutdown","Es solo una alarma, no un shutdown","E apenas um alarme, nao um shutdown"),lbl("En dessous de 1.5 bar, le film lubrifiant se rompt — grippage immediat des paliers","Below 1.5 bar, oil film breaks — immediate bearing seizure","Por debajo de 1,5 bar, la pelicula lubricante se rompe — gripado inmediato de cojinetes","Abaixo de 1,5 bar, a pelicula lubrificante rompe — gripagem imediata dos mancais"),lbl("Pour respecter MARPOL","To comply with MARPOL","Para cumplir MARPOL","Para cumprir MARPOL"),lbl("Par precaution uniquement","As precaution only","Solo por precaucion","Apenas por precaucao")],
      ans:1,expl:lbl("En dessous de 1.5 bar, le film d'huile entre les surfaces de glissement disparait. Grippage en quelques secondes avec destruction totale du moteur. Shutdown le plus critique avec overspeed.","Below 1.5 bar, oil film between sliding surfaces disappears. Seizure in seconds with total engine destruction. Most critical shutdown with overspeed.","Por debajo de 1,5 bar, la pelicula de aceite desaparece. Gripado en segundos con destruccion total.","Abaixo de 1,5 bar, a pelicula de oleo desaparece. Gripagem em segundos com destruicao total.")},
    {q:lbl("Quelle regulation STCW concerne le mecanicien de quart ?","Which STCW regulation concerns the watch engineer?","Que regulacion STCW concierne al mecanico de guardia?","Qual regulacao STCW diz respeito ao mecanico de quarto?"),
      opts:["STCW Reg. II/1","STCW Reg. III/1","STCW Reg. IV/2","STCW Reg. I/14"],
      ans:1,expl:lbl("STCW III/1 etablit les normes de competence pour officiers mecaniciens en charge du quart machine. Inclut la connaissance des systemes governor, telegraph et safety shutdowns.","STCW III/1 establishes competency standards for engineer officers in charge of engine watchkeeping. Includes knowledge of governor, telegraph and safety shutdown systems.","El Reglamento STCW III/1 establece los estandares de competencia para oficiales de maquinas.","O Regulamento STCW III/1 estabelece os padroes de competencia para oficiais de maquinas.")},
    {q:lbl("L'OMD (Oil Mist Detector) surveille quel risque specifique ?","What specific risk does the OMD (Oil Mist Detector) monitor?","Que riesgo especifico vigila el OMD (Oil Mist Detector)?","Que risco especifico o OMD (Oil Mist Detector) monitora?"),
      opts:[lbl("Consommation excessive d'huile","Excessive oil consumption","Consumo excesivo de aceite","Consumo excessivo de oleo"),lbl("Explosion du carter par concentration brouillard d'huile","Crankcase explosion from oil mist concentration","Explosion del carter por concentracion de niebla de aceite","Explosao do carter por concentracao de nevoa de oleo"),lbl("Fuite d'huile externe","External oil leak","Fuga externa de aceite","Vazamento externo de oleo"),lbl("Qualite de l'huile","Oil quality","Calidad del aceite","Qualidade do oleo")],
      ans:1,expl:lbl("L'OMD detecte la concentration de brouillard d'huile dans le carter. Concentration elevee = echauffement anormal des pieces en mouvement = risque explosion carter. Declenche slow-down puis shutdown.","OMD detects oil mist concentration in crankcase. High concentration = abnormal heating of moving parts = crankcase explosion risk. Triggers slow-down then shutdown.","El OMD detecta la concentracion de niebla de aceite en el carter. Alta concentracion = riesgo explosion.","O OMD detecta a concentracao de nevoa de oleo no carter. Alta concentracao = risco de explosao.")},
    {q:lbl("Quel est l'avantage principal du governor electronique vs mecanique ?","What is the main advantage of electronic vs mechanical governor?","Cual es la ventaja principal del governor electronico vs mecanico?","Qual e a vantagem principal do governor eletronico vs mecanico?"),
      opts:[lbl("Moins cher","Less expensive","Menos costoso","Mais barato"),lbl("Reponse en ms vs secondes — stabilite reseau 50/60Hz","Response in ms vs seconds — 50/60Hz network stability","Respuesta en ms vs segundos — estabilidad red 50/60Hz","Resposta em ms vs segundos — estabilidade rede 50/60Hz"),lbl("Pas de maintenance","No maintenance","Sin mantenimiento","Sem manutencao"),lbl("Compatible tous carburants","Compatible all fuels","Compatible todos combustibles","Compativel todos combustiveis")],
      ans:1,expl:lbl("Le governor electronique reagit en millisecondes vs plusieurs secondes pour un governor mecanique. Crucial pour maintenir la frequence reseau 50/60 Hz lors des variations de charge electrique.","Electronic governor reacts in milliseconds vs several seconds for mechanical. Crucial for maintaining 50/60 Hz network frequency during electrical load variations.","El governor electronico reacciona en milisegundos vs varios segundos para un governor mecanico.","O governor eletronico reage em milissegundos vs varios segundos para um governor mecanico.")},
    {q:lbl("Qu'est-ce qu'une zone ECA en rapport avec le choix du carburant ?","What is an ECA zone regarding fuel selection?","Que es una zona ECA en relacion con la seleccion de combustible?","O que e uma zona ECA em relacao a selecao de combustivel?"),
      opts:[lbl("Zone de peche exclusive","Exclusive fishing zone","Zona de pesca exclusiva","Zona de pesca exclusiva"),lbl("Emission Control Area — teneur soufre max 0.1% — passage MDO/LNG obligatoire","Emission Control Area — max 0.1% sulfur — MDO/LNG mandatory","Emission Control Area — max 0,1% azufre — MDO/LNG obligatorio","Emission Control Area — max 0,1% enxofre — MDO/LNG obrigatorio"),lbl("Zone de controle radar","Radar control zone","Zona de control radar","Zona de controle radar"),lbl("Zone economique exclusive","Exclusive economic zone","Zona economica exclusiva","Zona economica exclusiva")],
      ans:1,expl:lbl("ECA = Emission Control Area selon MARPOL Annexe VI. Teneur soufre < 0.1%. Le navire doit basculer de HFO vers MDO ou LNG en entrant dans la zone. Procedure de changement documentee obligatoire.","ECA = Emission Control Area per MARPOL Annex VI. Sulfur < 0.1%. Vessel must switch from HFO to MDO or LNG on entry. Mandatory documented changeover procedure.","ECA = Emission Control Area segun MARPOL Anexo VI. Azufre < 0,1%. Cambio de HFO a MDO/LNG obligatorio.","ECA = Emission Control Area segundo MARPOL Anexo VI. Enxofre < 0,1%. Mudanca de HFO para MDO/LNG obrigatoria.")},
    {q:lbl("Pourquoi le VDR enregistre-t-il les ordres telegraph ?","Why does the VDR record telegraph orders?","Por que el VDR registra las ordenes de telegrafo?","Por que o VDR registra as ordens de telegrafo?"),
      opts:[lbl("Pour optimiser la consommation","To optimize consumption","Para optimizar el consumo","Para otimizar o consumo"),lbl("Pour reconstituer la chronologie en cas d'accident — SOLAS V/20","To reconstruct timeline in case of accident — SOLAS V/20","Para reconstruir la cronologia en caso de accidente — SOLAS V/20","Para reconstruir a cronologia em caso de acidente — SOLAS V/20"),lbl("Pour le rapport mensuel","For the monthly report","Para el informe mensual","Para o relatorio mensal"),lbl("Pour le chef mecanicien","For the chief engineer","Para el jefe de maquinas","Para o chefe de maquinas")],
      ans:1,expl:lbl("SOLAS V/20 : le VDR enregistre tous les ordres telegraph avec horodatage sur 48h minimum. En cas d'accident ou d'enquete, permet de reconstituer exactement la sequence des manoeuvres.","SOLAS V/20: VDR records all telegraph orders with timestamp for 48h minimum. In case of accident or investigation, allows exact reconstruction of maneuvering sequence.","SOLAS V/20: el VDR registra todas las ordenes de telegrafo con marca horaria durante 48h minimo.","SOLAS V/20: o VDR registra todas as ordens de telegrafo com carimbo de hora por 48h minimo.")},
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q,"ans")));
  const total=qs.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===shuffled[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6,letterSpacing:1}}>
        {lang==="fr"?"Banque Premium+":lang==="en"?"Premium+ Bank":lang==="es"?"Banco Premium+":"Banco Premium+"}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lang==="fr"?"questions niveau ingenieur":lang==="en"?"engineer-level questions":lang==="es"?"preguntas nivel ingeniero":"questoes nivel engenheiro"}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.cyan},${C.blue2})`,
          border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
          boxShadow:`0 0 28px ${C.cyan}44`}}>
        {lang==="fr"?"COMMENCER =>":lang==="en"?"START =>":lang==="es"?"EMPEZAR =>":"COMECAR =>"}
      </button>
    </div>
  );

  if(done){
    const trophy=getTrophy(score,total);
    const pct=Math.round(score/total*100);
    return (
      <div style={{textAlign:"center",padding:"20px 10px"}}>
        <div style={{fontSize:68,marginBottom:8}}>{trophy.icon}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:21,color:trophy.color,fontWeight:800,marginBottom:4}}>
          {trophy.label[lang]||trophy.label.fr}
        </div>
        <div style={{fontSize:30,fontWeight:800,color:C.white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.cyan},${trophy.color})`,borderRadius:6,transition:"width 0.9s ease"}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"13px",borderRadius:14,background:"rgba(0,229,255,0.12)",
            border:`1px solid ${C.cyan}55`,color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
          {lang==="fr"?"Recommencer":lang==="en"?"Restart":lang==="es"?"Reiniciar":"Recomecar"}
        </button>
      </div>
    );
  }

  const q=shuffled[idx];
  return (
    <div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:10,color:C.cyan,fontWeight:800}}>
            {lang==="fr"?"Question":lang==="en"?"Question":lang==="es"?"Pregunta":"Pergunta"} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,
            background:`linear-gradient(90deg,${C.cyan},${C.blue2})`,borderRadius:4,transition:"width 0.35s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(6,14,26,0.8)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.65,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",border=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";border=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";border=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${border}`,color:col,fontSize:12,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2,fontSize:11}}>
              {["A","B","C","D"][i]}.
            </span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans
              ?(lang==="fr"?"✓ Excellente reponse !":lang==="en"?"✓ Excellent!":lang==="es"?"✓ Excelente!":"✓ Excelente!")
              :(lang==="fr"?"✗ Reponse incorrecte":lang==="en"?"✗ Incorrect":lang==="es"?"✗ Incorrecta":"✗ Incorreta")}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:15,
            background:`linear-gradient(135deg,${C.cyan},${C.blue2})`,
            border:"none",color:C.bg0,fontSize:13,fontWeight:900,cursor:"pointer",letterSpacing:1,
            boxShadow:`0 4px 20px ${C.cyan}33`}}>
          {idx===total-1
            ?(lang==="fr"?"VOIR MON SCORE =>":lang==="en"?"SEE MY SCORE =>":lang==="es"?"VER PUNTUACION =>":"VER PONTUACAO =>")
            :(lang==="fr"?"SUIVANT =>":lang==="en"?"NEXT =>":lang==="es"?"SIGUIENTE =>":"PROXIMO =>")}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MV DERBYSHIRE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV Derbyshire — Pacifique Nord (1980)",teaser:"Vrac 169 044 GT — Disparition — 44 morts — Typhon Orchid — Enquete 20 ans",
      what:"Le 9 septembre 1980, le plus grand navire britannique jamais construit (169 044 GT) disparait dans le typhon Orchid au nord des Philippines. Aucun SOS, aucun survivant. Pendant 20 ans, la cause reste inconnue. Les enquetes MAIB de 1994 et 2000 revelent : les plaques de pont se deforment sous les chocs des vagues de typhon, l'eau envahit le tunnel des tuyaux de sonde, le governor ne peut compenser les dommages structurels. Le moteur principal continuait de fonctionner pendant que le navire sombrait. Aucun systeme automatique n'a detecte l'envahissement progressif.",
      cause:"- Tunnel tuyaux de sonde : point faible structurel non identifie\n- Governor ME continuant de tourner sans alarme d'envahissement\n- Absence systeme detection inondation espaces de double fond\n- Protocoles inspection avant typhon insuffisants\n- ISM Code inexistant en 1980 — SMS non requis\n- VDR non obligatoire — pas de donnees pour l'enquete",
      lessons:"- Introduction ISM Code 1998 : SMS obligatoire pour tous navires\n- SOLAS : detection automatique inondation compartiments vitaux\n- Inspection systematique des tuyaux de sonde avant mauvais temps\n- Correlation donnees meteo / reduction puissance preventive\n- VDR : enregistrement continu rendu obligatoire (SOLAS V/20)\n- MAIB : creation d'une base de donnees accident maritime mondiale",
      link:"Lien L3 — Governor & ME : Le Derbyshire illustre l'impossibilite pour le governor de compenser des defaillances structurelles. La fiabilite du systeme governor/ME depend de l'integrite de l'ensemble du navire. Un ME qui tourne normalement pendant qu'un navire coule est la pire des situations."},
    en:{title:"MV Derbyshire — North Pacific (1980)",teaser:"Bulk carrier 169,044 GT — Disappearance — 44 deaths — Typhoon Orchid — 20-year investigation",
      what:"On September 9, 1980, the largest British ship ever built (169,044 GT) disappeared in Typhoon Orchid north of the Philippines. No SOS, no survivors. For 20 years the cause remained unknown. MAIB investigations in 1994 and 2000 revealed: deck plates deformed under typhoon wave impacts, water flooded the sounding pipe tunnel, the governor could not compensate for structural damage. The main engine kept running as the ship sank. No automatic system detected the progressive flooding.",
      cause:"- Sounding pipe tunnel: unidentified structural weak point\n- ME governor running without flooding alarm\n- Absence of double bottom flooding detection\n- Insufficient pre-typhoon inspection protocols\n- ISM Code non-existent in 1980 — SMS not required\n- VDR not mandatory — no data for investigation",
      lessons:"- ISM Code 1998 introduction: SMS mandatory for all vessels\n- SOLAS: automatic flooding detection in vital compartments\n- Systematic inspection of sounding pipes before bad weather\n- Correlation weather data / preventive power reduction\n- VDR: continuous recording made mandatory (SOLAS V/20)\n- MAIB: creation of world maritime accident database",
      link:"L3 Link — Governor & ME: Derbyshire illustrates the impossibility of the governor compensating for structural failures. Governor/ME system reliability depends on the integrity of the whole vessel. An ME running normally while a ship sinks is the worst possible situation."},
    es:{title:"MV Derbyshire — Pacifico Norte (1980)",teaser:"Granelero 169.044 GT — Desaparicion — 44 muertos — Tifon Orchid — Investigacion 20 anos",
      what:"El 9 de septiembre de 1980, el mayor buque britanico jamas construido desaparecio en el tifon Orchid. Sin SOS, sin supervivientes. Las investigaciones MAIB revelaron: las planchas de cubierta se deformaron, el agua invadio el tunel de sondas, el governor no pudo compensar los danos estructurales. El motor principal seguia funcionando mientras el buque se hundia.",
      cause:"- Tunel de sondas: punto debil estructural no identificado\n- Governor ME funcionando sin alarma de inundacion\n- Ausencia deteccion inundacion en doble fondo\n- ISM Code inexistente en 1980\n- VDR no obligatorio",
      lessons:"- Codigo ISM 1998: SMS obligatorio para todos los buques\n- SOLAS: deteccion automatica inundacion compartimentos vitales\n- Inspeccion sistematica tubos de sonda antes del mal tiempo\n- VDR: registro continuo obligatorio (SOLAS V/20)",
      link:"Vinculo L3 — Governor & ME: El Derbyshire ilustra la imposibilidad del governor para compensar fallos estructurales. Un ME que funciona normalmente mientras un buque se hunde es la peor situacion posible."},
    pt:{title:"MV Derbyshire — Pacifico Norte (1980)",teaser:"Graneleiro 169.044 GT — Desaparecimento — 44 mortos — Tifao Orchid — Investigacao 20 anos",
      what:"A 9 de setembro de 1980, o maior navio britanico alguma vez construido desapareceu no tifao Orchid. Sem SOS, sem sobreviventes. As investigacoes MAIB revelaram: as chapas de convés deformaram-se, a agua inundou o tunel dos tubos de sonda, o governor nao pde compensar os danos estruturais. O motor principal continuou a funcionar enquanto o navio afundava.",
      cause:"- Tunel dos tubos de sonda: ponto fraco estrutural nao identificado\n- Governor ME funcionando sem alarme de inundacao\n- Ausencia detecao inundacao no fundo duplo\n- Codigo ISM inexistente em 1980\n- VDR nao obrigatorio",
      lessons:"- Codigo ISM 1998: SMS obrigatorio para todos os navios\n- SOLAS: detecao automatica de inundacao em compartimentos vitais\n- Inspecao sistematica dos tubos de sonda antes do mau tempo\n- VDR: registo continuo obrigatorio (SOLAS V/20)",
      link:"Ligacao L3 — Governor & ME: O Derbyshire ilustra a impossibilidade do governor compensar falhas estruturais. Um ME a funcionar normalmente enquanto um navio afunda e a pior situacao possivel."},
  };
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}50`,borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:C.red2,marginBottom:2,fontFamily:"'Cinzel',serif"}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:16,color:C.muted,fontWeight:700}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,marginBottom:12}}>{c.what}</div>
          <div style={{fontSize:11,color:C.red2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>CAUSES</div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.cause}</div>
          <div style={{fontSize:11,color:C.green2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
            {lang==="fr"?"LECONS APPRISES":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES APRENDIDAS":"LICOES APRENDIDAS"}
          </div>
          <div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
          <div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,179,0,0.08)",
            border:`1px solid ${C.amber}44`,fontSize:11,color:C.amber2,lineHeight:1.7}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — 5 QCM
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"Le governor electronique ajuste le fuel rack via :",opts:["Signal 4-20 mA","Cle mecanique","Signal 0-10V","Commande hydraulique directe"],ans:0,expl:"Signal standard 4-20mA : 4mA=0% rack, 20mA=100% rack, 0mA=rupture cable (failsafe). Insensible aux parasites electriques."},
    {q:"Pourquoi prechauffer le HFO a 130-140C avant injection ?",opts:["Augmenter la puissance","Reduire la viscosite de 380 a 12-15 cSt pour bonne atomisation","Respecter MARPOL","Refroidir les injecteurs"],ans:1,expl:"HFO 380 cSt est tres visqueux a temperature ambiante. Le chauffage abaisse la viscosite a 12-15 cSt pour une bonne pulverisation dans les cylindres et une combustion complete."},
    {q:"Quel ordre telegraph signifie la vitesse avant minimale ?",opts:["SLOW AHEAD","HALF AHEAD","DEAD SLOW AHEAD","STOP"],ans:2,expl:"Dead Slow Ahead = vitesse avant minimale, environ 25-30% MCR. Utilisé en maneuvre portuaire, canal ou zone encombrée. Doit etre exécuté immediatement apres ACK."},
    {q:"Un safety shutdown se declenche — que se passe-t-il si la passerelle demande FULL AHEAD ?",opts:["Le moteur repart automatiquement","Le shutdown est prioritaire — le moteur reste arrete","L'officier mecanicien choisit","Le capitaine override"],ans:1,expl:"Le safety shutdown a toujours priorite absolue sur tout ordre telegraph, y compris FULL AHEAD. L'equipage doit identifier et corriger la cause avant redemarrage."},
    {q:"Le MV Derbyshire (1980) a sombré avec le ME en marche car :",opts:["Le governor etait defaillant","Aucun systeme automatique ne detectait l'envahissement structurel","Le telegraph etait bloque","Le carburant etait epuise"],ans:1,expl:"Le governor et le ME fonctionnaient normalement. L'absence de detection d'inondation des espaces structurels a permis le naufrage sans alarme. Aujourd'hui : SOLAS exige detection inondation + VDR obligatoire."},
  ],
  en:[
    {q:"The electronic governor adjusts the fuel rack via:",opts:["4-20 mA signal","Mechanical key","0-10V signal","Direct hydraulic command"],ans:0,expl:"Standard 4-20mA signal: 4mA=0% rack, 20mA=100% rack, 0mA=cable break (failsafe). Immune to electrical interference."},
    {q:"Why preheat HFO to 130-140C before injection?",opts:["Increase power","Reduce viscosity from 380 to 12-15 cSt for good atomization","Comply with MARPOL","Cool injectors"],ans:1,expl:"HFO 380 cSt is very viscous at ambient temperature. Heating lowers viscosity to 12-15 cSt for good atomization in cylinders and complete combustion."},
    {q:"Which telegraph order means minimum ahead speed?",opts:["SLOW AHEAD","HALF AHEAD","DEAD SLOW AHEAD","STOP"],ans:2,expl:"Dead Slow Ahead = minimum ahead speed, about 25-30% MCR. Used in port maneuvering, canal or congested area. Must be executed immediately after ACK."},
    {q:"A safety shutdown triggers — what happens if bridge requests FULL AHEAD?",opts:["Engine restarts automatically","Shutdown has priority — engine remains stopped","Duty engineer chooses","Captain overrides"],ans:1,expl:"Safety shutdown always has absolute priority over any telegraph order, including FULL AHEAD. Crew must identify and correct the cause before restart."},
    {q:"MV Derbyshire (1980) sank with ME running because:",opts:["Governor was faulty","No automatic system detected structural flooding","Telegraph was stuck","Fuel was exhausted"],ans:1,expl:"Governor and ME were functioning normally. The absence of structural space flooding detection allowed sinking without alarm. Today: SOLAS requires flooding detection + mandatory VDR."},
  ],
  es:[
    {q:"El governor electronico ajusta la cremallera via:",opts:["Senal 4-20 mA","Llave mecanica","Senal 0-10V","Mando hidraulico directo"],ans:0,expl:"Senal estandar 4-20mA: 4mA=0% cremallera, 20mA=100%, 0mA=ruptura cable (failsafe). Inmune a interferencias electricas."},
    {q:"?Por que precalentar el HFO a 130-140C antes de la inyeccion?",opts:["Aumentar la potencia","Reducir la viscosidad de 380 a 12-15 cSt para buena atomizacion","Cumplir MARPOL","Enfriar los inyectores"],ans:1,expl:"HFO 380 cSt es muy viscoso a temperatura ambiente. El calentamiento reduce la viscosidad a 12-15 cSt para una buena pulverizacion en los cilindros."},
    {q:"?Que orden de telegrafo significa la velocidad minima de avance?",opts:["SLOW AHEAD","HALF AHEAD","DEAD SLOW AHEAD","STOP"],ans:2,expl:"Dead Slow Ahead = velocidad minima de avance, aprox. 25-30% MCR. Usado en maniobra portuaria, canal o zona congestionada."},
    {q:"Se activa un safety shutdown — ?que pasa si el puente pide FULL AHEAD?",opts:["El motor arranca automaticamente","El shutdown tiene prioridad — el motor permanece parado","El oficial de maquinas elige","El capitan tiene prioridad"],ans:1,expl:"El safety shutdown siempre tiene prioridad absoluta sobre cualquier orden de telegrafo, incluido FULL AHEAD."},
    {q:"El MV Derbyshire (1980) se hundio con el ME en marcha porque:",opts:["El governor estaba averiado","Ningun sistema automatico detectaba la inundacion estructural","El telegrafo estaba bloqueado","El combustible se agoto"],ans:1,expl:"El governor y el ME funcionaban normalmente. La ausencia de deteccion de inundacion de espacios estructurales permitio el hundimiento sin alarma."},
  ],
  pt:[
    {q:"O governor eletronico ajusta a cremalheira via:",opts:["Sinal 4-20 mA","Chave mecanica","Sinal 0-10V","Comando hidraulico direto"],ans:0,expl:"Sinal padrao 4-20mA: 4mA=0% cremalheira, 20mA=100%, 0mA=ruptura cabo (failsafe). Imune a interferencias eletricas."},
    {q:"Por que pre-aquecer o HFO a 130-140C antes da injecao?",opts:["Aumentar a potencia","Reduzir a viscosidade de 380 para 12-15 cSt para boa atomizacao","Cumprir MARPOL","Resfriar os injetores"],ans:1,expl:"HFO 380 cSt e muito viscoso na temperatura ambiente. O aquecimento reduz a viscosidade para 12-15 cSt para boa atomizacao nos cilindros."},
    {q:"Qual ordem de telegrafo significa a velocidade minima de avanco?",opts:["SLOW AHEAD","HALF AHEAD","DEAD SLOW AHEAD","STOP"],ans:2,expl:"Dead Slow Ahead = velocidade minima de avanco, aprox. 25-30% MCR. Usado em manobras portuarias, canal ou zona congestionada."},
    {q:"Um safety shutdown aciona — o que acontece se a ponte pede FULL AHEAD?",opts:["O motor reinicia automaticamente","Shutdown tem prioridade — motor permanece parado","Oficial de maquinas decide","Capitao tem prioridade"],ans:1,expl:"O safety shutdown sempre tem prioridade absoluta sobre qualquer ordem de telegrafo, incluindo FULL AHEAD."},
    {q:"O MV Derbyshire (1980) afundou com o ME a funcionar porque:",opts:["O governor estava avariado","Nenhum sistema automatico detetava a inundacao estrutural","O telegrafo estava bloqueado","O combustivel esgotou"],ans:1,expl:"O governor e o ME funcionavam normalmente. A ausencia de detecao de inundacao de espacos estruturais permitiu o afundamento sem alarme."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const total=questions.length; const isLast=idx===total-1;
  const q=shuffled[idx];
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.ans)setScore(s=>s+1);};
  const handleNext=()=>{const fs=score+(sel===q.ans?1:0);if(isLast){onComplete(fs);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.amber},${C.gold2})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(6,14,26,0.85)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.65,fontWeight:700}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",border=C.border,col=C.white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";border=C.green;col=C.green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";border=C.red;col=C.red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"13px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${border}`,color:col,fontSize:13,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,
            background:`linear-gradient(135deg,${C.amber},${C.gold2})`,
            border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
            boxShadow:`0 4px 22px ${C.amber}40`}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT DATA
// ══════════════════════════════════════
const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Module e7 — UMS & Automatisation · Lecon 3/5 · Premium+ · 240 XP",
      title:"Automatisation du Moteur Principal",
      intro:"Le ME d'un VLCC ne s'ajuste pas manuellement a chaque variation de charge. Un reseau de capteurs, d'automates et de protections veille en permanence.\n\nCette lecon couvre le governor electronique, le systeme carburant HFO/MDO/LNG, le telegraph et les safety shutdowns.",
      p1:"PARTIE 1 — GOVERNOR ELECTRONIQUE",s1t:"Controle vitesse — signal 4-20mA — fuel rack",
      s1:"GOVERNOR ELECTRONIQUE:\nComparaison continue RPM reel vs consigne\nActuateur signal 4-20mA => position fuel rack\n\nSIGNAL 4-20mA:\n4 mA = 0% fuel rack (minimum)\n20 mA = 100% fuel rack (maximum)\n0 mA = rupture cable => failsafe\n\nMODES:\nAUTO : governor maintient le RPM consigne\nMANUAL : officier regle directement le rack\n\nAVANTAGE ELECTRONIQUE vs MECANIQUE:\nReponse en millisecondes vs secondes\nStabilite reseau 50/60 Hz garantie",
      p2:"PARTIE 2 — SYSTEME CARBURANT",s2t:"HFO / MDO / LNG — courbe debit/charge",
      s2:"CARBURANTS PRINCIPAUX:\nHFO 380 cSt : prechauffage 130-140C obligatoire\n                Soufre jusqu'a 3.5% hors zone ECA\nMDO : pas de prechauffage — soufre < 0.1% (ECA)\nLNG : soufre = 0 — NOx -80% — boil-off gas\n\nZONES ECA (MARPOL Annexe VI):\nBaltique | Mer du Nord | Cote Est USA | Californie\nTeneur soufre < 0.1% obligatoire en zone ECA\nChangement carburant : procedure documentee obligatoire\n\nVISCOSIMETRE:\nMesure continuelle viscosite — ajuste la temperature\nCible : 12-15 cSt a l'injection",
      p3:"PARTIE 3 — TELEGRAPH",s3t:"Ordres machine — ACK — log VDR",
      s3:"ORDRES TELEGRAPH (AHEAD):\nFULL AHEAD : 100% MCR\nHALF AHEAD : ~75% MCR\nSLOW AHEAD : ~50% MCR\nDEAD SLOW AHEAD : ~25-30% MCR\nSTOP\n\nPROCEDURE:\nPasserelle envoie ordre => mecanicien ACK (accuse reception)\nExecution immediate apres ACK\nEnregistrement automatique VDR (SOLAS V/20)\n\nORDRES ARRIERE:\nDEAD SLOW / SLOW / HALF / FULL ASTERN\nInversion machine : temps de reponse critique en port",
      p4:"PARTIE 4 — SAFETY SHUTDOWNS",s4t:"Arrets automatiques — priorite absolue",
      s4:"HIERARCHY PROTECTION:\nAlerte L/H => Slow-Down => Shutdown\n\nSHUTDOWNS CRITIQUES:\nLo Lube Oil Press : < 1.5 bar => grippage immediat\nHi Coolant Temp : > 95C => surchauffe culasse\nHi Exhaust Temp : > 420C => combustion anormale\nOverspeed : > 103-110% MCR => rupture mecanique\nCrankcase : Lo Press => explosion carter possible\n\nPRIORITE ABSOLUE:\nShutdown > Slow-Down > Alerte > Telegraph\nMeme un FULL AHEAD passerelle ne peut pas l'empecher\n\nOMD (Oil Mist Detector):\nDetecte brouillard huile dans carter\nConcentration elevee => slow-down puis shutdown",
      p5:"EXERCICES PRATIQUES PREMIUM+",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS PREMIUM+",
      sumT:"RESUME — LECON e7 L3",
      sumP:["Governor electronique : signal 4-20mA sur fuel rack — 0mA = failsafe","HFO 380 cSt : prechauffage 130-140C pour viscosite 12-15 cSt","LNG : SOx = 0 — reduction 80% NOx vs HFO","Telegraph : ACK obligatoire avant execution — VDR SOLAS V/20","Safety shutdown : priorite absolue sur tout ordre telegraph","Overspeed shutdown : 103-110% MCR — risque mecanique grave","OMD : detecteur brouillard huile carter — risque explosion","MV Derbyshire 1980 : absence detection inondation => 44 morts"],
      learnedP:["Governor : signal 4-20mA — fuel rack — modes AUTO/MANUAL","HFO prechauffage 130-140C — MDO/LNG zones ECA","Telegraph : ACK + execution immediate","Safety shutdowns : hierarchie alerte / slow-down / shutdown","MV Derbyshire 1980 : ME fonctionnant pendant naufrage"],
    },
    en:{
      badge:"Module e7 — UMS & Automation · Lesson 3/5 · Premium+ · 240 XP",
      title:"Main Engine Automation",
      intro:"A VLCC's ME doesn't adjust manually with every load change. A network of sensors, controllers and protections watches constantly.\n\nThis lesson covers the electronic governor, HFO/MDO/LNG fuel system, telegraph and safety shutdowns.",
      p1:"PART 1 — ELECTRONIC GOVERNOR",s1t:"Speed control — 4-20mA signal — fuel rack",
      s1:"ELECTRONIC GOVERNOR:\nContinuous comparison actual RPM vs setpoint\nActuator 4-20mA signal => fuel rack position\n\n4-20mA SIGNAL:\n4 mA = 0% fuel rack (minimum)\n20 mA = 100% fuel rack (maximum)\n0 mA = cable break => failsafe\n\nMODES:\nAUTO: governor maintains setpoint RPM\nMANUAL: engineer adjusts rack directly\n\nELECTRONIC vs MECHANICAL ADVANTAGE:\nResponse in milliseconds vs seconds\n50/60 Hz network stability guaranteed",
      p2:"PART 2 — FUEL SYSTEM",s2t:"HFO / MDO / LNG — flow/load curve",
      s2:"MAIN FUELS:\nHFO 380 cSt: preheating 130-140C mandatory\n              Sulfur up to 3.5% outside ECA\nMDO: no preheating — sulfur < 0.1% (ECA)\nLNG: sulfur = 0 — NOx -80% — boil-off gas\n\nECA ZONES (MARPOL Annex VI):\nBaltic | North Sea | US East Coast | California\nSulfur content < 0.1% mandatory in ECA\nFuel changeover: mandatory documented procedure\n\nVISCOMETER:\nContinuous viscosity measurement — adjusts temperature\nTarget: 12-15 cSt at injection",
      p3:"PART 3 — TELEGRAPH",s3t:"Engine orders — ACK — VDR log",
      s3:"TELEGRAPH ORDERS (AHEAD):\nFULL AHEAD: 100% MCR\nHALF AHEAD: ~75% MCR\nSLOW AHEAD: ~50% MCR\nDEAD SLOW AHEAD: ~25-30% MCR\nSTOP\n\nPROCEDURE:\nBridge sends order => engineer ACK (acknowledges)\nImmediate execution after ACK\nAutomatic VDR recording (SOLAS V/20)\n\nASTE RN ORDERS:\nDEAD SLOW / SLOW / HALF / FULL ASTERN\nEngine reversal: critical response time in port",
      p4:"PART 4 — SAFETY SHUTDOWNS",s4t:"Automatic stops — absolute priority",
      s4:"PROTECTION HIERARCHY:\nAlert L/H => Slow-Down => Shutdown\n\nCRITICAL SHUTDOWNS:\nLo Lube Oil Press: < 1.5 bar => immediate seizure\nHi Coolant Temp: > 95C => cylinder head overheating\nHi Exhaust Temp: > 420C => abnormal combustion\nOverspeed: > 103-110% MCR => mechanical failure\nCrankcase: Lo Press => possible crankcase explosion\n\nABSOLUTE PRIORITY:\nShutdown > Slow-Down > Alert > Telegraph\nEven FULL AHEAD from bridge cannot prevent it\n\nOMD (Oil Mist Detector):\nDetects oil mist in crankcase\nHigh concentration => slow-down then shutdown",
      p5:"ADVANCED PREMIUM+ EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 PREMIUM+ QUESTIONS",
      sumT:"SUMMARY — LESSON e7 L3",
      sumP:["Electronic governor: 4-20mA signal on fuel rack — 0mA = failsafe","HFO 380 cSt: preheating 130-140C for 12-15 cSt viscosity","LNG: SOx = 0 — 80% NOx reduction vs HFO","Telegraph: mandatory ACK before execution — VDR SOLAS V/20","Safety shutdown: absolute priority over all telegraph orders","Overspeed shutdown: 103-110% MCR — serious mechanical risk","OMD: crankcase oil mist detector — explosion risk","MV Derbyshire 1980: no flooding detection => 44 deaths"],
      learnedP:["Governor: 4-20mA signal — fuel rack — AUTO/MANUAL modes","HFO preheating 130-140C — MDO/LNG ECA zones","Telegraph: ACK + immediate execution","Safety shutdowns: alert / slow-down / shutdown hierarchy","MV Derbyshire 1980: ME running during sinking"],
    },
    es:{
      badge:"Modulo e7 — UMS & Automatizacion · Leccion 3/5 · Premium+ · 240 XP",
      title:"Automatizacion del Motor Principal",
      intro:"El ME de un VLCC no se ajusta manualmente con cada cambio de carga. Una red de sensores, controladores y protecciones vigila constantemente.\n\nEsta leccion cubre el governor electronico, el sistema de combustible HFO/MDO/LNG, el telegrafo y las paradas de seguridad.",
      p1:"PARTE 1 — GOVERNOR ELECTRONICO",s1t:"Control de velocidad — senal 4-20mA — cremallera",
      s1:"GOVERNOR ELECTRONICO:\nComparacion continua RPM real vs consigna\nActuador senal 4-20mA => posicion cremallera\n\nSENAL 4-20mA:\n4 mA = 0% cremallera | 20 mA = 100% | 0 mA = failsafe\n\nVENTAJA ELECTRONICO vs MECANICO:\nRespuesta en milisegundos vs segundos",
      p2:"PARTE 2 — SISTEMA COMBUSTIBLE",s2t:"HFO / MDO / LNG — curva caudal/carga",
      s2:"HFO 380 cSt: precalentamiento 130-140C obligatorio | Azufre hasta 3,5% fuera ECA\nMDO: sin precalentamiento | azufre < 0,1% (ECA)\nLNG: azufre = 0 | NOx -80%\n\nZONAS ECA (MARPOL Anexo VI): Baltico | Mar del Norte | Costa Este USA",
      p3:"PARTE 3 — TELEGRAFO",s3t:"Ordenes maquinas — ACK — registro VDR",
      s3:"ORDENES: FULL/HALF/SLOW/DEAD SLOW AHEAD | STOP | DEAD SLOW/SLOW/HALF/FULL ASTERN\nPROCEDURE: Puente envia => mecanico ACK => ejecucion inmediata\nRegistro automatico VDR (SOLAS V/20)",
      p4:"PARTE 4 — PARADAS DE SEGURIDAD",s4t:"Paradas automaticas — prioridad absoluta",
      s4:"JERARQUIA: Alerta L/H => Slow-Down => Shutdown\nSHUTDOWNS: Lo Presion Aceite < 1,5 bar | Hi Temp Refrigerante > 95C | Hi Escape > 420C | Sobrevelocidad > 103-110% MCR\nPRIORIDAD ABSOLUTA sobre cualquier orden de telegrafo",
      p5:"EJERCICIOS AVANZADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS PREMIUM+",
      sumT:"RESUMEN — LECCION e7 L3",
      sumP:["Governor electronico: senal 4-20mA en cremallera — 0mA = failsafe","HFO 380 cSt: precalentamiento 130-140C para 12-15 cSt","LNG: SOx = 0 — reduccion 80% NOx","Telegrafo: ACK obligatorio antes de ejecucion","Shutdown: prioridad absoluta sobre cualquier orden telegrafo","MV Derbyshire 1980: sin deteccion inundacion => 44 muertos"],
      learnedP:["Governor: senal 4-20mA — modos AUTO/MANUAL","HFO 130-140C — MDO/LNG zonas ECA","Telegrafo: ACK + ejecucion inmediata","Paradas: jerarquia alerta/slow-down/shutdown","MV Derbyshire 1980"],
    },
    pt:{
      badge:"Modulo e7 — UMS & Automatizacao · Licao 3/5 · Premium+ · 240 XP",
      title:"Automatizacao do Motor Principal",
      intro:"O ME de um VLCC nao se ajusta manualmente a cada mudanca de carga. Uma rede de sensores, controladores e protecoes vigia constantemente.\n\nEsta licao cobre o governor eletronico, o sistema de combustivel HFO/MDO/LNG, o telegrafo e as paradas de seguranca.",
      p1:"PARTE 1 — GOVERNOR ELETRONICO",s1t:"Controlo de velocidade — sinal 4-20mA — cremalheira",
      s1:"GOVERNOR ELETRONICO:\nComparacao continua RPM real vs consigna\nAtuador sinal 4-20mA => posicao cremalheira\n\nSINAL 4-20mA:\n4 mA = 0% cremalheira | 20 mA = 100% | 0 mA = failsafe\n\nVANTAGEM ELETRONICO vs MECANICO:\nResposta em milissegundos vs segundos",
      p2:"PARTE 2 — SISTEMA COMBUSTIVEL",s2t:"HFO / MDO / LNG — curva caudal/carga",
      s2:"HFO 380 cSt: pre-aquecimento 130-140C obrigatorio | Enxofre ate 3,5% fora ECA\nMDO: sem pre-aquecimento | enxofre < 0,1% (ECA)\nLNG: enxofre = 0 | NOx -80%\n\nZONAS ECA (MARPOL Anexo VI): Baltico | Mar do Norte | Costa Leste EUA",
      p3:"PARTE 3 — TELEGRAFO",s3t:"Ordens maquinas — ACK — registo VDR",
      s3:"ORDENS: FULL/HALF/SLOW/DEAD SLOW AHEAD | STOP | DEAD SLOW/SLOW/HALF/FULL ASTERN\nPROCEDURO: Ponte envia => mecanico ACK => execucao imediata\nRegisto automatico VDR (SOLAS V/20)",
      p4:"PARTE 4 — PARADAS DE SEGURANCA",s4t:"Paradas automaticas — prioridade absoluta",
      s4:"HIERARQUIA: Alerta L/H => Slow-Down => Shutdown\nSHUTDOWNS: Lo Pressao Oleo < 1,5 bar | Hi Temp Refrigerante > 95C | Hi Escapamento > 420C | Sobrevelocidade > 103-110% MCR\nPRIORIDADE ABSOLUTA sobre qualquer ordem de telegrafo",
      p5:"EXERCICIOS AVANCADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES PREMIUM+",
      sumT:"RESUMO — LICAO e7 L3",
      sumP:["Governor eletronico: sinal 4-20mA na cremalheira — 0mA = failsafe","HFO 380 cSt: pre-aquecimento 130-140C para 12-15 cSt","LNG: SOx = 0 — reducao 80% NOx","Telegrafo: ACK obrigatorio antes da execucao","Shutdown: prioridade absoluta sobre qualquer ordem telegrafo","MV Derbyshire 1980: sem detecao inundacao => 44 mortos"],
      learnedP:["Governor: sinal 4-20mA — modos AUTO/MANUAL","HFO 130-140C — MDO/LNG zonas ECA","Telegrafo: ACK + execucao imediata","Paradas: hierarquia alerta/slow-down/shutdown","MV Derbyshire 1980"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT — ARCHITECTURE L1 EXACTE
// ══════════════════════════════════════
export default function LessonE7_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const lc=getContent(lang);
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  const trophy=getTrophy(quizScore,5);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",
      background:`linear-gradient(160deg,${C.bg0} 0%,${C.bg1} 40%,${C.bg2} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* HEADER — architecture exacte L1 */}
      <div style={{position:"relative",zIndex:100,background:"rgba(3,7,15,0.97)",
        backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:56,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack}
            style={{background:"rgba(0,229,255,0.08)",border:`1px solid ${C.border}`,
              borderRadius:11,padding:"8px 14px",color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
            {t.back}
          </button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.cyan,letterSpacing:1.5,fontFamily:"'Cinzel',serif",fontWeight:800}}>
              ⚓ {t.module}
            </div>
            <div style={{fontSize:10,color:C.muted}}>
              {lang==="fr"?"Lecon 3/5":lang==="en"?"Lesson 3/5":lang==="es"?"Leccion 3/5":"Licao 3/5"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{padding:"3px 9px",borderRadius:20,background:"rgba(255,179,0,0.15)",
              border:`1px solid ${C.amber}44`,fontSize:9,color:C.amber,fontWeight:800,letterSpacing:1}}>
              PREMIUM+
            </span>
            <span style={{fontSize:11,color:C.cyan,fontFamily:"'Cinzel',serif",fontWeight:700}}>
              {progress}%
            </span>
          </div>
        </div>
        <div style={{height:3,background:"rgba(0,229,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,
            background:`linear-gradient(90deg,${C.cyan},${C.amber})`,
            transition:"width 0.5s ease",boxShadow:`0 0 8px ${C.cyan}`}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 50px",position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all 0.55s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,
              marginBottom:12,background:"rgba(0,229,255,0.1)",border:`1px solid ${C.cyan}44`,
              fontSize:10,color:C.cyan,fontWeight:700}}>
              {lc.badge}
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:21,fontWeight:800,color:C.white,
              lineHeight:1.3,margin:"0 0 18px",textShadow:`0 0 40px ${C.cyan}30`}}>
              {lc.title}
            </h1>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}44`,
              borderLeft:`3px solid ${C.cyan}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"⚙️",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.cyan,
                svg:<GovernorSVG lang={lang}/>,
                svgLabel:lang==="fr"?"GOVERNOR — INTERACTIF":lang==="en"?"GOVERNOR — INTERACTIVE":lang==="es"?"GOVERNOR — INTERACTIVO":"GOVERNOR — INTERATIVO"},
              {icon:"⛽",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.amber,
                svg:<FuelControlSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SYSTEME CARBURANT — INTERACTIF":lang==="en"?"FUEL SYSTEM — INTERACTIVE":lang==="es"?"SISTEMA COMBUSTIBLE — INTERACTIVO":"SISTEMA COMBUSTIVEL — INTERATIVO"},
              {icon:"📡",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.green,
                svg:<TelegraphSVG lang={lang}/>,
                svgLabel:lang==="fr"?"TELEGRAPH — INTERACTIF":lang==="en"?"TELEGRAPH — INTERACTIVE":lang==="es"?"TELEGRAFO — INTERACTIVO":"TELEGRAFO — INTERATIVO"},
              {icon:"🛑",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.red2,
                svg:<SafetyShutdownSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SAFETY SHUTDOWNS — INTERACTIF":lang==="en"?"SAFETY SHUTDOWNS — INTERACTIVE":lang==="es"?"PARADAS SEGURIDAD — INTERACTIVO":"PARADAS SEGURANCA — INTERATIVO"},
            ].map((sec,i)=>(
              <div key={i}>
                <SL icon={sec.icon} text={sec.p} color={sec.color}/>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}22`,
                  borderRadius:20,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:22}}>{sec.icon}</span>
                    <span style={{fontSize:14,fontWeight:800,color:C.white}}>{sec.s}</span>
                  </div>
                  <div style={{fontSize:13,color:"rgba(176,190,197,0.9)",lineHeight:1.9,whiteSpace:"pre-line"}}>{sec.content}</div>
                </div>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}33`,
                  borderRadius:20,padding:"16px",marginBottom:18}}>
                  <div style={{fontSize:10,color:sec.color,letterSpacing:2,fontFamily:"'Cinzel',serif",
                    marginBottom:12,fontWeight:800}}>
                    {sec.icon} {sec.svgLabel}
                  </div>
                  {sec.svg}
                </div>
              </div>
            ))}

            <SL icon="🎯" text={lc.p5} color={C.gold2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.amber}55`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <Exercise1 lang={lang} t={t}/>
            </div>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:18}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.purple2}44`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <QuestionBank lang={lang}/>
            </div>

            {/* RESUME — toujours visible */}
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.cyan,letterSpacing:2.5,fontFamily:"'Cinzel',serif",
                marginBottom:14,fontWeight:800}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",
                  borderBottom:i<lc.sumP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.cyan,fontWeight:900,flexShrink:0,marginTop:1}}>✓</span>{pt}
                </div>
              ))}
            </div>

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"18px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.cyan},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 10px 40px rgba(0,229,255,0.35)`,marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.dim,marginTop:10}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:800,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Governor & ME Auto":lang==="en"?"Quiz — Governor & ME Auto":lang==="es"?"Quiz — Governor & ME Auto":"Quiz — Governor & ME Auto"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · e7 L3</div>
            </div>
            <QuizComp questions={quiz} t={t} lang={lang}
              onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),400);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:76,marginBottom:10}}>{trophy.icon}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:800,color:trophy.color,marginBottom:6}}>
                {trophy.label[lang]||trophy.label.fr}
              </div>
              <div style={{fontSize:32,fontWeight:900,color:C.white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:18}}>
                {Math.round(quizScore/5*100)}%
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,
                margin:"0 24px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,
                  background:`linear-gradient(90deg,${C.cyan},${trophy.color})`,
                  borderRadius:6,transition:"width 0.9s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",
                borderRadius:20,background:"rgba(0,229,255,0.1)",border:`1px solid ${C.cyan}44`,
                fontSize:14,color:C.cyan,fontWeight:800}}>
                +{quizScore>=4?240:quizScore===3?140:80} {t.xp} ⭐
              </div>
            </div>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:12,fontFamily:"'Cinzel',serif",
                letterSpacing:1,fontWeight:700}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",
                  borderBottom:i<lc.learnedP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:C.white}}>
                  <span style={{color:C.cyan,fontWeight:900}}>✓</span>{pt}
                </div>
              ))}
            </div>
            <button onClick={onNext}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.cyan},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(0,229,255,0.3)`,marginBottom:12}}>
              {lang==="fr"?"LECON 4 — SURVEILLANCE AMS =>":lang==="en"?"LESSON 4 — AMS MONITORING =>":lang==="es"?"LECCION 4 — VIGILANCIA AMS =>":"LICAO 4 — VIGILANCIA AMS =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(0,229,255,0.15)`,
                borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,
                color:C.muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
