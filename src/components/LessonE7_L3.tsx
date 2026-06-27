import { useState, useEffect, useRef } from "react";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  cyan:"#00e5ff", cyan2:"#80deea",
  amber:"#ffb300", amber2:"#ffd54f",
  steel:"#546e7a", steel2:"#78909c",
  green:"#00e676", red:"#ff1744", orange:"#ff6d00",
  muted:"rgba(240,244,255,0.45)", white:"#f0f4ff",
  border:"rgba(0,229,255,0.18)", borderA:"rgba(255,179,0,0.22)",
  gov:"#00e5ff", fuel:"#ffb300", tel:"#00e676", shut:"#ff1744",
};

const lbl = (fr,en,es,pt) => {
  const lang = (typeof window !== "undefined" && window.__MAP_LANG__) || "fr";
  return {fr,en,es,pt}[lang]||fr;
};

// ─────────────────────────────────────────────
//  SVG 1 — GOVERNOR : contrôle vitesse moteur
// ─────────────────────────────────────────────
function GovernorSVG() {
  const [rpm, setRpm] = useState(85);
  const [setpoint, setSetpoint] = useState(85);
  const [load, setLoad] = useState(60);
  const [mode, setMode] = useState("auto"); // auto | manual
  const [running, setRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRpm(prev => {
        const err = setpoint - prev;
        const correction = err * 0.08 + (Math.random() - 0.5) * 0.4;
        return Math.max(60, Math.min(105, prev + correction));
      });
    }, 120);
    return () => clearInterval(intervalRef.current);
  }, [setpoint, running]);

  const W = 340; const H = 210;
  const rpmPct = (rpm - 60) / 45;
  const spPct = (setpoint - 60) / 45;
  const arcR = 72;
  const angle = -150 + rpmPct * 300;
  const rad = angle * Math.PI / 180;
  const nx = 170 + arcR * Math.cos(rad);
  const ny = 115 + arcR * Math.sin(rad);

  const rpmColor = rpm > 100 ? C.red : rpm > 92 ? C.amber : C.green;

  const makeArc = (startDeg, endDeg, r, color) => {
    const s = startDeg * Math.PI / 180;
    const e = endDeg * Math.PI / 180;
    const x1 = 170 + r * Math.cos(s); const y1 = 115 + r * Math.sin(s);
    const x2 = 170 + r * Math.cos(e); const y2 = 115 + r * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2}`;
  };

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid ${C.border}`}}>
      <div style={{color:C.cyan,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ ELECTRONIC GOVERNOR — {lbl("CONTROLE VITESSE","SPEED CONTROL","CONTROL VELOCIDAD","CONTROLE VELOCIDADE")}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* fond */}
        <rect width={W} height={H} fill={C.bg1} rx="10"/>
        {/* arcs jauge */}
        <path d={makeArc(-150,-30,72,"rgba(0,230,118,0.15)")} stroke="#00e676" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d={makeArc(-30,30,72,"rgba(255,179,0,0.15)")} stroke={C.amber} strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d={makeArc(30,150,72,"rgba(255,23,68,0.15)")} stroke={C.red} strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* setpoint marker */}
        {(() => {
          const spAngle = -150 + spPct * 300;
          const sr = spAngle * Math.PI / 180;
          const sx = 170 + 82 * Math.cos(sr);
          const sy = 115 + 82 * Math.sin(sr);
          return <circle cx={sx} cy={sy} r="5" fill={C.amber} opacity="0.9"/>;
        })()}
        {/* aiguille */}
        <line x1={170} y1={115} x2={nx} y2={ny} stroke={rpmColor} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx={170} cy={115} r="7" fill={C.bg2} stroke={rpmColor} strokeWidth="2"/>
        {/* valeurs centre */}
        <text x={170} y={108} textAnchor="middle" fontSize="20" fontWeight="800" fill={rpmColor} fontFamily="Courier New">
          {Math.round(rpm)}
        </text>
        <text x={170} y={122} textAnchor="middle" fontSize="8" fill={C.muted} fontFamily="Courier New">RPM</text>
        {/* labels arcs */}
        <text x={85} y={165} textAnchor="middle" fontSize="7" fill="#00e676">ECO</text>
        <text x={170} y={50} textAnchor="middle" fontSize="7" fill={C.amber}>MCR</text>
        <text x={255} y={165} textAnchor="middle" fontSize="7" fill={C.red}>OVER</text>
        {/* setpoint label */}
        <text x={170} y={188} textAnchor="middle" fontSize="8" fill={C.amber}>
          SP: {setpoint} RPM
        </text>
        {/* load bar */}
        <rect x={20} y={60} width={14} height={100} rx="3" fill={C.bg3}/>
        <rect x={20} y={60+100*(1-load/100)} width={14} height={100*load/100} rx="3"
          fill={load>85?C.red:load>70?C.amber:C.green}/>
        <text x={27} y={55} textAnchor="middle" fontSize="6" fill={C.muted}>LOAD</text>
        <text x={27} y={172} textAnchor="middle" fontSize="6" fill={C.muted}>{load}%</text>
        {/* mode badge */}
        <rect x={270} y={60} width={52} height={18} rx="4"
          fill={mode==="auto"?"rgba(0,229,255,0.15)":"rgba(255,179,0,0.15)"}
          stroke={mode==="auto"?C.cyan:C.amber} strokeWidth="1"/>
        <text x={296} y={73} textAnchor="middle" fontSize="8" fontWeight="700"
          fill={mode==="auto"?C.cyan:C.amber} fontFamily="Courier New">
          {mode.toUpperCase()}
        </text>
        {/* status */}
        <circle cx={298} cy={90} r="5" fill={running?C.green:C.red}/>
        <text x={308} y={94} fontSize="7" fill={C.muted}>{running?"RUN":"STOP"}</text>
      </svg>
      {/* controles */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}>
        <div style={{flex:1,minWidth:120}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>
            {lbl("Consigne RPM","RPM Setpoint","Consigna RPM","Consigna RPM")}: {setpoint}
          </div>
          <input type="range" min={60} max={105} value={setpoint}
            onChange={e=>setSetpoint(Number(e.target.value))}
            style={{width:"100%",accentColor:C.amber}}/>
        </div>
        <div style={{flex:1,minWidth:120}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>
            {lbl("Charge","Load","Carga","Carga")}: {load}%
          </div>
          <input type="range" min={0} max={100} value={load}
            onChange={e=>setLoad(Number(e.target.value))}
            style={{width:"100%",accentColor:C.green}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setMode(m=>m==="auto"?"manual":"auto")}
          style={{flex:1,padding:"6px 0",background:mode==="auto"?"rgba(0,229,255,0.12)":"rgba(255,179,0,0.12)",
            border:`1px solid ${mode==="auto"?C.cyan:C.amber}`,borderRadius:6,
            color:mode==="auto"?C.cyan:C.amber,fontFamily:"Courier New",fontSize:11,cursor:"pointer"}}>
          {mode==="auto"?"→ MANUAL":"→ AUTO"}
        </button>
        <button onClick={()=>setRunning(r=>!r)}
          style={{flex:1,padding:"6px 0",background:running?"rgba(255,23,68,0.1)":"rgba(0,230,118,0.1)",
            border:`1px solid ${running?C.red:C.green}`,borderRadius:6,
            color:running?C.red:C.green,fontFamily:"Courier New",fontSize:11,cursor:"pointer"}}>
          {running?"⏹ STOP":"▶ START"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SVG 2 — FUEL CONTROL : courbe débit/charge
// ─────────────────────────────────────────────
function FuelControlSVG() {
  const [load, setLoad] = useState(70);
  const [fuelType, setFuelType] = useState("hfo"); // hfo | mdo | lng
  const [viscosity, setViscosity] = useState(380);
  const [tempOk, setTempOk] = useState(true);

  const W = 340; const H = 200;
  const PL = 40; const PR = 20; const PT = 20; const PB = 30;
  const GW = W - PL - PR; const GH = H - PT - PB;

  const fuelCurves = {
    hfo:  [0,8,18,30,44,58,73,89,100],
    mdo:  [0,7,16,27,40,54,68,83,95],
    lng:  [0,6,14,24,36,48,61,75,88],
  };

  const curve = fuelCurves[fuelType];
  const points = curve.map((v,i) => {
    const x = PL + (i/8)*GW;
    const y = PT + GH - (v/100)*GH;
    return `${x},${y}`;
  }).join(" ");

  const loadX = PL + (load/100)*GW;
  const loadIdx = load/100*8;
  const i0 = Math.floor(loadIdx);
  const i1 = Math.min(i0+1,8);
  const t = loadIdx - i0;
  const loadFuel = curve[i0] + t*(curve[i1]-curve[i0]);
  const loadY = PT + GH - (loadFuel/100)*GH;

  const fuelColors = {hfo:"#ffb300",mdo:"#00e5ff",lng:"#00e676"};
  const col = fuelColors[fuelType];

  const reqTemp = {hfo:135,mdo:40,lng:null};
  const temp = reqTemp[fuelType];

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid ${C.borderA}`}}>
      <div style={{color:C.amber,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ FUEL CONTROL — {lbl("SYSTEME COMBUSTIBLE","FUEL SYSTEM","SISTEMA COMBUSTIBLE","SISTEMA COMBUSTIVEL")}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="10"/>
        {/* grille */}
        {[0,25,50,75,100].map(v => {
          const y = PT + GH - (v/100)*GH;
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <text x={PL-4} y={y+3} textAnchor="end" fontSize="7" fill={C.muted}>{v}</text>
            </g>
          );
        })}
        {[0,25,50,75,100].map(v => {
          const x = PL + (v/100)*GW;
          return (
            <g key={v}>
              <line x1={x} y1={PT} x2={x} y2={PT+GH} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <text x={x} y={PT+GH+10} textAnchor="middle" fontSize="7" fill={C.muted}>{v}%</text>
            </g>
          );
        })}
        {/* courbe */}
        <polyline points={points} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points={`${PL},${PT+GH} ${points} ${W-PR},${PT+GH}`}
          fill={`${col}18`} stroke="none"/>
        {/* marqueur charge actuelle */}
        <line x1={loadX} y1={PT} x2={loadX} y2={PT+GH} stroke={col} strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
        <circle cx={loadX} cy={loadY} r="6" fill={col} opacity="0.9"/>
        <rect x={loadX-28} y={loadY-22} width={56} height={16} rx="3" fill={C.bg2} stroke={col} strokeWidth="1"/>
        <text x={loadX} y={loadY-11} textAnchor="middle" fontSize="8" fill={col} fontFamily="Courier New">
          {loadFuel.toFixed(0)}% FUEL
        </text>
        {/* axes labels */}
        <text x={PL+GW/2} y={H-2} textAnchor="middle" fontSize="8" fill={C.muted}>
          {lbl("CHARGE MOTEUR %","ENGINE LOAD %","CARGA MOTOR %","CARGA MOTOR %")}
        </text>
        <text x={10} y={PT+GH/2} textAnchor="middle" fontSize="8" fill={C.muted}
          transform={`rotate(-90,10,${PT+GH/2})`}>FUEL %</text>
      </svg>
      {/* controles */}
      <div style={{marginTop:8}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:4}}>
          {lbl("Charge moteur","Engine load","Carga motor","Carga motor")}: {load}%
        </div>
        <input type="range" min={0} max={100} value={load}
          onChange={e=>setLoad(Number(e.target.value))}
          style={{width:"100%",accentColor:col}}/>
      </div>
      <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
        {["hfo","mdo","lng"].map(f => (
          <button key={f} onClick={()=>setFuelType(f)}
            style={{flex:1,padding:"5px 0",
              background:fuelType===f?`${fuelColors[f]}18`:"transparent",
              border:`1px solid ${fuelType===f?fuelColors[f]:"rgba(255,255,255,0.15)"}`,
              borderRadius:6,color:fuelType===f?fuelColors[f]:C.muted,
              fontFamily:"Courier New",fontSize:10,cursor:"pointer"}}>
            {f.toUpperCase()}
            {temp&&f==="hfo"?` ${temp}C`:""}
          </button>
        ))}
      </div>
      {fuelType==="hfo" && (
        <div style={{marginTop:8,padding:"6px 10px",background:"rgba(255,179,0,0.08)",
          border:`1px solid ${C.amber}33`,borderRadius:8,fontSize:10,color:C.amber}}>
          ⚠ HFO: {lbl("Viscosité 380 cSt — préchauffage obligatoire 130-140C",
            "Viscosity 380 cSt — preheating required 130-140C",
            "Viscosidad 380 cSt — precalentamiento obligatorio 130-140C",
            "Viscosidade 380 cSt — pre-aquecimento obrigatorio 130-140C")}
        </div>
      )}
      {fuelType==="lng" && (
        <div style={{marginTop:8,padding:"6px 10px",background:"rgba(0,230,118,0.08)",
          border:`1px solid ${C.green}33`,borderRadius:8,fontSize:10,color:C.green}}>
          ✓ LNG: {lbl("Carburant propre — emissions SOx = 0","Clean fuel — SOx = 0 emissions",
            "Combustible limpio — emisiones SOx = 0","Combustivel limpo — emissoes SOx = 0")}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SVG 3 — TELEGRAPH : ordres machine
// ─────────────────────────────────────────────
function TelegraphSVG() {
  const [bridgeOrder, setBridgeOrder] = useState("STOP");
  const [engineResponse, setEngineResponse] = useState("STOP");
  const [pending, setPending] = useState(false);
  const [log, setLog] = useState([
    {time:"08:00",order:"STOP",ack:true},
    {time:"08:12",order:"SLOW AHEAD",ack:true},
  ]);

  const orders = [
    {id:"FULL AHEAD",color:C.green,rpm:100},
    {id:"HALF AHEAD",color:"#69f0ae",rpm:75},
    {id:"SLOW AHEAD",color:"#b9f6ca",rpm:50},
    {id:"DEAD SLOW AHEAD",color:"#ccff90",rpm:30},
    {id:"STOP",color:C.amber,rpm:0},
    {id:"DEAD SLOW ASTERN",color:"#ff6e40",rpm:30},
    {id:"SLOW ASTERN",color:"#ff3d00",rpm:50},
    {id:"HALF ASTERN",color:C.red,rpm:65},
    {id:"FULL ASTERN",color:"#d50000",rpm:80},
  ];

  const sendOrder = (ord) => {
    setBridgeOrder(ord.id);
    setPending(true);
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setTimeout(() => {
      setEngineResponse(ord.id);
      setPending(false);
      setLog(l => [{time:t,order:ord.id,ack:true},...l].slice(0,5));
    }, 1200);
  };

  const W = 340; const H = 60;

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid rgba(0,230,118,0.2)`}}>
      <div style={{color:C.green,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ TELEGRAPH — {lbl("ORDRES MACHINE","ENGINE ORDERS","ORDENES MAQUINAS","ORDENS MAQUINAS")}
      </div>
      {/* telegraph visuel */}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="8"/>
        {/* passerelle */}
        <rect x={10} y={10} width={130} height={40} rx="6" fill={C.bg3}
          stroke={pending?"rgba(255,179,0,0.6)":"rgba(0,229,255,0.3)"} strokeWidth="1.5"/>
        <text x={75} y={24} textAnchor="middle" fontSize="7" fill={C.muted} letterSpacing="1">
          {lbl("PASSERELLE","BRIDGE","PUENTE","PONTE")}
        </text>
        <text x={75} y={42} textAnchor="middle" fontSize="9" fontWeight="700"
          fill={orders.find(o=>o.id===bridgeOrder)?.color||C.white} fontFamily="Courier New">
          {bridgeOrder}
        </text>
        {/* fleche transmission */}
        <text x={170} y={34} textAnchor="middle" fontSize="14"
          fill={pending?C.amber:C.steel2}>{pending?"⟳":"→"}</text>
        {pending && (
          <text x={170} y={48} textAnchor="middle" fontSize="6" fill={C.amber}>ACK...</text>
        )}
        {/* machine */}
        <rect x={200} y={10} width={130} height={40} rx="6" fill={C.bg3}
          stroke={pending?"rgba(255,179,0,0.4)":"rgba(0,230,118,0.3)"} strokeWidth="1.5"/>
        <text x={265} y={24} textAnchor="middle" fontSize="7" fill={C.muted} letterSpacing="1">
          {lbl("MACHINE","ENGINE ROOM","MAQUINAS","MAQUINAS")}
        </text>
        <text x={265} y={42} textAnchor="middle" fontSize="9" fontWeight="700"
          fill={orders.find(o=>o.id===engineResponse)?.color||C.white} fontFamily="Courier New">
          {engineResponse}
        </text>
      </svg>
      {/* boutons ordres */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginTop:8}}>
        {orders.map(ord => (
          <button key={ord.id} onClick={()=>sendOrder(ord)}
            style={{padding:"4px 2px",background:bridgeOrder===ord.id?`${ord.color}22`:"transparent",
              border:`1px solid ${bridgeOrder===ord.id?ord.color:"rgba(255,255,255,0.1)"}`,
              borderRadius:5,color:bridgeOrder===ord.id?ord.color:C.muted,
              fontFamily:"Courier New",fontSize:8,cursor:"pointer",lineHeight:1.2}}>
            {ord.id}
          </button>
        ))}
      </div>
      {/* log */}
      <div style={{marginTop:8,background:C.bg1,borderRadius:6,padding:6,maxHeight:80,overflow:"auto"}}>
        {log.map((l,i) => (
          <div key={i} style={{display:"flex",gap:8,fontFamily:"Courier New",fontSize:9,
            color:i===0?C.green:C.muted,borderBottom:i<log.length-1?"1px solid rgba(255,255,255,0.05)":"none",
            padding:"2px 0"}}>
            <span style={{color:C.steel2}}>{l.time}</span>
            <span>{l.order}</span>
            <span style={{marginLeft:"auto",color:C.green}}>✓ ACK</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyShutdownSVG() {
  const [params, setParams] = useState({
    lubOilPress: 2.8,
    coolantTemp: 82,
    exhaustTemp: 340,
    overspeed: 88,
    crankPress: -3.2,
  });
  const [tripped, setTripped] = useState({});
  const [simActive, setSimActive] = useState(false);
  const [selectedParam, setSelectedParam] = useState("lubOilPress");

  const limits = {
    lubOilPress: {lo:1.5, hi:null, unit:"bar", label:"Lube Oil Press.", dir:"lo",
      desc:lbl("Pression HP insuffisante - film lubrifiant rompu","Insufficient HP pressure - oil film failure",
        "Presion insuficiente - fallo pelicula aceite","Pressao insuficiente - falha filme oleo")},
    coolantTemp: {lo:null, hi:95, unit:"C", label:"Coolant Temp.", dir:"hi",
      desc:lbl("Surchauffe eau douce - deformation culasse possible","FW overheating - cylinder head deformation",
        "Sobrecalentamiento AF - deformacion culata posible","Superaquecimento AF - deformacao cabeca possivel")},
    exhaustTemp: {lo:null, hi:420, unit:"C", label:"Exhaust Temp.", dir:"hi",
      desc:lbl("Haute temp. echappement - combustion anormale","High exhaust - abnormal combustion",
        "Alta temp. escape - combustion anormal","Alta temp. escapamento - combustao anormal")},
    overspeed: {lo:null, hi:103, unit:"RPM", label:"Overspeed", dir:"hi",
      desc:lbl("Sur-regime mecanique - governor defaillant","Mechanical overspeed - governor failure",
        "Sobre-velocidad - fallo del governor","Sobre-velocidade - falha do governor")},
    crankPress: {lo:-5, hi:null, unit:"mbar", label:"Crankcase Press.", dir:"lo",
      desc:lbl("Depression carter anormale - risque explosion","Abnormal crankcase vacuum - explosion risk",
        "Vacio carter anormal - riesgo explosion","Vacuo carter anormal - risco explosao")},
  };

  const paramRanges = {
    lubOilPress: [0.5, 4.5], coolantTemp: [60, 105],
    exhaustTemp: [200, 480], overspeed: [60, 115], crankPress: [-8, 2],
  };

  useEffect(() => {
    const newTripped = {};
    Object.entries(params).forEach(([k,v]) => {
      const lim = limits[k];
      if (lim.dir==="lo" && lim.lo !== null && v <= lim.lo) newTripped[k] = true;
      if (lim.dir==="hi" && lim.hi !== null && v >= lim.hi) newTripped[k] = true;
    });
    setTripped(newTripped);
  }, [params]);

  const anyTripped = Object.values(tripped).some(Boolean);

  const W = 340; const H = 160;

  const paramList = Object.entries(limits);

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid rgba(255,23,68,0.25)`}}>
      <div style={{color:C.red,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ SAFETY SHUTDOWNS — {lbl("ARRETS AUTOMATIQUES","AUTO TRIPS","PARADAS AUTOMATICAS","PARADAS AUTOMATICAS")}
      </div>
      {anyTripped && (
        <div style={{background:"rgba(255,23,68,0.12)",border:`1px solid ${C.red}`,borderRadius:8,
          padding:"6px 10px",marginBottom:8,color:C.red,fontFamily:"Courier New",fontSize:11,
          display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>🛑</span>
          <span>{lbl("ARRET D'URGENCE DECLENCHE","EMERGENCY SHUTDOWN TRIGGERED",
            "PARADA DE EMERGENCIA ACTIVADA","PARADA DE EMERGENCIA ATIVADA")}</span>
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="8"/>
        {/* moteur central */}
        <rect x={130} y={50} width={80} height={60} rx="8"
          fill={anyTripped?"rgba(255,23,68,0.15)":"rgba(0,229,255,0.08)"}
          stroke={anyTripped?C.red:C.cyan} strokeWidth="1.5"/>
        <text x={170} y={75} textAnchor="middle" fontSize="9" fill={anyTripped?C.red:C.cyan}
          fontFamily="Courier New" fontWeight="700">MAIN</text>
        <text x={170} y={88} textAnchor="middle" fontSize="9" fill={anyTripped?C.red:C.cyan}
          fontFamily="Courier New" fontWeight="700">ENGINE</text>
        <text x={170} y={102} textAnchor="middle" fontSize="16">{anyTripped?"🛑":"⚙️"}</text>
        {/* capteurs autour */}
        {paramList.map(([k, lim], idx) => {
          const positions = [
            {x:20,y:30},{x:20,y:90},{x:250,y:30},{x:250,y:90},{x:135,y:8}
          ];
          const pos = positions[idx];
          const isTrip = tripped[k];
          const isSelected = selectedParam === k;
          return (
            <g key={k} style={{cursor:"pointer"}} onClick={()=>setSelectedParam(k)}>
              <rect x={pos.x} y={pos.y} width={72} height={28} rx="4"
                fill={isTrip?"rgba(255,23,68,0.2)":isSelected?"rgba(0,229,255,0.12)":"rgba(13,31,60,0.8)"}
                stroke={isTrip?C.red:isSelected?C.cyan:"rgba(84,110,122,0.4)"} strokeWidth="1"/>
              <text x={pos.x+36} y={pos.y+11} textAnchor="middle" fontSize="6.5"
                fill={isTrip?C.red:C.muted}>{lim.label}</text>
              <text x={pos.x+36} y={pos.y+22} textAnchor="middle" fontSize="9"
                fill={isTrip?C.red:isSelected?C.cyan:C.white} fontFamily="Courier New" fontWeight="700">
                {params[k]} {lim.unit}
              </text>
              {/* ligne vers moteur */}
              {idx < 2 && <line x1={pos.x+72} y1={pos.y+14} x2={130} y2={80}
                stroke={isTrip?C.red:"rgba(84,110,122,0.3)"} strokeWidth="1" strokeDasharray={isTrip?"none":"3,3"}/>}
              {idx >= 2 && idx < 4 && <line x1={pos.x} y1={pos.y+14} x2={210} y2={80}
                stroke={isTrip?C.red:"rgba(84,110,122,0.3)"} strokeWidth="1" strokeDasharray={isTrip?"none":"3,3"}/>}
              {idx === 4 && <line x1={pos.x+36} y1={pos.y+28} x2={170} y2={50}
                stroke={isTrip?C.red:"rgba(84,110,122,0.3)"} strokeWidth="1" strokeDasharray={isTrip?"none":"3,3"}/>}
            </g>
          );
        })}
      </svg>
      {/* slider param selectionne */}
      <div style={{background:C.bg1,borderRadius:8,padding:8,marginTop:8}}>
        <div style={{color:tripped[selectedParam]?C.red:C.cyan,fontFamily:"Courier New",fontSize:10,marginBottom:4}}>
          {limits[selectedParam].label}: {params[selectedParam]} {limits[selectedParam].unit}
          {tripped[selectedParam] && " — TRIP!"}
        </div>
        <input type="range"
          min={paramRanges[selectedParam][0]} max={paramRanges[selectedParam][1]}
          step={selectedParam==="lubOilPress"||selectedParam==="crankPress"?0.1:1}
          value={params[selectedParam]}
          onChange={e=>setParams(p=>({...p,[selectedParam]:Number(e.target.value)}))}
          style={{width:"100%",accentColor:tripped[selectedParam]?C.red:C.cyan}}/>
        <div style={{fontSize:9,color:C.muted,marginTop:4}}>{limits[selectedParam].desc}</div>
        {tripped[selectedParam] && (
          <div style={{marginTop:4}}>
            <button onClick={()=>setParams(p=>{
              const safe = {lubOilPress:2.8,coolantTemp:82,exhaustTemp:340,overspeed:88,crankPress:-3.2};
              return {...p,[selectedParam]:safe[selectedParam]};
            })} style={{padding:"4px 10px",background:"rgba(0,230,118,0.12)",border:`1px solid ${C.green}`,
              borderRadius:5,color:C.green,fontSize:9,fontFamily:"Courier New",cursor:"pointer"}}>
              ✓ RESET
            </button>
          </div>
        )}
      </div>
      {/* table limites */}
      <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
        {paramList.map(([k,lim]) => (
          <div key={k} onClick={()=>setSelectedParam(k)}
            style={{padding:"4px 8px",background:tripped[k]?"rgba(255,23,68,0.1)":selectedParam===k?"rgba(0,229,255,0.08)":"rgba(13,31,60,0.5)",
              border:`1px solid ${tripped[k]?C.red:selectedParam===k?C.cyan:"rgba(84,110,122,0.3)"}`,
              borderRadius:5,cursor:"pointer"}}>
            <div style={{fontSize:8,color:tripped[k]?C.red:C.muted}}>{lim.label}</div>
            <div style={{fontSize:9,color:tripped[k]?C.red:C.white,fontFamily:"Courier New"}}>
              {lim.dir==="lo"?`LO: ${lim.lo}`:`HI: ${lim.hi}`} {lim.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function LessonE7_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {

  useEffect(() => {
    if (typeof window !== "undefined") window.__MAP_LANG__ = lang;
  }, [lang]);

  const t = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const [openEx, setOpenEx] = useState({});
  const [exAnswers, setExAnswers] = useState({});
  const [qbOpen, setQbOpen] = useState(null);
  const [qbAnswers, setQbAnswers] = useState({});
  const [accidentOpen, setAccidentOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // ── QUIZ 5 QCM ──
  const quizQs = [
    { q: t("Quel est le rôle du governor électronique ?",
        "What is the role of the electronic governor?",
        "Cual es la funcion del governor electronico?",
        "Qual e a funcao do governor eletronico?"),
      opts: [
        t("Contrôler la vitesse moteur par régulation du débit carburant","Control engine speed by regulating fuel delivery","Controlar velocidad del motor regulando el combustible","Controlar velocidade do motor regulando o combustivel"),
        t("Mesurer la température des gaz d'échappement","Measure exhaust gas temperature","Medir temperatura de gases de escape","Medir temperatura dos gases de escapamento"),
        t("Activer le système de refroidissement","Activate the cooling system","Activar el sistema de enfriamiento","Ativar o sistema de resfriamento"),
        t("Contrôler la pression d'huile","Control oil pressure","Controlar la presion del aceite","Controlar pressao do oleo"),
      ], correct: 0
    },
    { q: t("À quelle température le HFO doit-il être préchauffé ?",
        "At what temperature must HFO be preheated?",
        "A que temperatura se debe precalentar el HFO?",
        "A que temperatura o HFO deve ser pre-aquecido?"),
      opts: ["40-50C","80-90C","130-140C","160-180C"], correct: 2
    },
    { q: t("Quel paramètre déclenche un arrêt moteur par 'overspeed' ?",
        "Which parameter triggers a 'overspeed' engine shutdown?",
        "Que parametro activa un paro por sobrevelocidad?",
        "Que parametro aciona parada por sobrevelocidade?"),
      opts: [
        t("RPM > seuil (103-110% MCR)","RPM > threshold (103-110% MCR)","RPM > umbral (103-110% MCR)","RPM > limite (103-110% MCR)"),
        t("Température huile > 90C","Oil temp > 90C","Temp aceite > 90C","Temp oleo > 90C"),
        t("Pression eau douce < 1 bar","FW pressure < 1 bar","Presion AF < 1 bar","Pressao AF < 1 bar"),
        t("Vibrations > seuil","Vibrations > threshold","Vibraciones > umbral","Vibracoes > limite"),
      ], correct: 0
    },
    { q: t("En mode MANUAL sur le telegraph, qui exécute les ordres ?",
        "In MANUAL telegraph mode, who executes orders?",
        "En modo MANUAL del telegrafo, quien ejecuta ordenes?",
        "No modo MANUAL do telegrafo, quem executa ordens?"),
      opts: [
        t("Le système automatique","The automatic system","El sistema automatico","O sistema automatico"),
        t("L'officier mécanicien de quart","The duty engineer officer","El oficial de guardia de maquinas","O oficial de quardia de maquinas"),
        t("Le capitaine","The captain","El capitan","O capitao"),
        t("Le pilote automatique","The autopilot","El piloto automatico","O piloto automatico"),
      ], correct: 1
    },
    { q: t("Quel est l'ordre de priorité en cas de conflit telegraph/safety shutdown ?",
        "What is the priority in telegraph vs safety shutdown conflict?",
        "Cual es la prioridad en conflicto telegrafo/parada seguridad?",
        "Qual e a prioridade em conflito telegrafo/parada seguranca?"),
      opts: [
        t("Telegraph toujours prioritaire","Telegraph always priority","Telegrafo siempre prioritario","Telegrafo sempre prioritario"),
        t("Safety shutdown prioritaire — le moteur s'arrête même en FULL AHEAD","Safety shutdown priority — engine stops even on FULL AHEAD","Parada seguridad prioritaria — motor para incluso en FULL AHEAD","Parada seguranca prioritaria — motor para mesmo em FULL AVANTE"),
        t("L'officier mécanicien décide","The duty engineer decides","El oficial de maquinas decide","O oficial de maquinas decide"),
        t("Le capitaine override tout","The captain overrides all","El capitan tiene prioridad","O capitao tem prioridade"),
      ], correct: 1
    },
  ];

  // ── QUESTION BANK 15 QCM ──
  const qBank = [
    { q: t("Quelle est la fonction principale du governor électronique ?","What is the main function of the electronic governor?","Cual es la funcion principal del governor electronico?","Qual e a funcao principal do governor eletronico?"),
      opts:[t("Réguler la vitesse du moteur","Regulate engine speed","Regular velocidad del motor","Regular velocidade do motor"),t("Contrôler la pression d'huile","Control oil pressure","Controlar presion aceite","Controlar pressao oleo"),t("Mesurer la température","Measure temperature","Medir temperatura","Medir temperatura"),t("Activer l'arrêt d'urgence","Activate emergency stop","Activar parada emergencia","Ativar parada emergencia")],correct:0,
      exp:t("Le governor électronique maintient la vitesse consigne en ajustant le débit de carburant en temps réel via un signal 4-20mA.","The electronic governor maintains setpoint speed by adjusting fuel delivery in real time via a 4-20mA signal.","El governor electronico mantiene la velocidad de consigna ajustando el caudal de combustible en tiempo real via senal 4-20mA.","O governor eletronico mantém a velocidade de consigna ajustando o fluxo de combustivel em tempo real via sinal 4-20mA.")
    },
    { q: t("Quel signal électrique utilise typiquement un actuateur de carburant ?","What electrical signal does a fuel actuator typically use?","Que senal electrica usa tipicamente un actuador de combustible?","Que sinal eletrico usa tipicamente um atuador de combustivel?"),
      opts:["0-5V","4-20mA","0-10V","RS-485"],correct:1,
      exp:t("Le signal 4-20mA est utilisé car il est insensible aux parasites électriques et permet de détecter une rupture de câble (signal < 4mA = défaut).","The 4-20mA signal is used because it is immune to electrical noise and allows cable break detection (signal < 4mA = fault).","La senal 4-20mA se usa porque es inmune a interferencias electricas y permite detectar rotura de cable (senal < 4mA = fallo).","O sinal 4-20mA e usado porque e imune a interferencias eletricas e permite detectar ruptura de cabo (sinal < 4mA = falha).")
    },
    { q: t("Quelle est la pression minimale d'huile de lubrification avant arrêt automatique ?","What is the minimum lube oil pressure before automatic shutdown?","Cual es la presion minima de aceite de lubricacion antes de parada automatica?","Qual e a pressao minima de oleo de lubrificacao antes de parada automatica?"),
      opts:["0.5 bar","1.5 bar","2.5 bar","3.5 bar"],correct:1,
      exp:t("Typiquement 1.5 bar en dessous duquel le film lubrifiant se rompt, causant un risque de grippage des paliers.","Typically 1.5 bar below which the oil film breaks, causing bearing seizure risk.","Tipicamente 1,5 bar por debajo del cual la pelicula lubricante se rompe, causando riesgo de gripado de cojinetes.","Tipicamente 1,5 bar abaixo do qual a pelicula lubrificante se rompe, causando risco de gripagem dos mancais.")
    },
    { q: t("Que signifie MCR en propulsion marine ?","What does MCR mean in marine propulsion?","Que significa MCR en propulsion marina?","O que significa MCR em propulsao maritima?"),
      opts:[t("Maximum Continuous Rating","Maximum Continuous Rating","Maximum Continuous Rating","Maximum Continuous Rating"),t("Motor Control Room","Motor Control Room","Motor Control Room","Motor Control Room"),t("Main Cooling Relay","Main Cooling Relay","Main Cooling Relay","Main Cooling Relay"),t("Mechanical Combustion Ratio","Mechanical Combustion Ratio","Mechanical Combustion Ratio","Mechanical Combustion Ratio")],correct:0,
      exp:t("MCR = Maximum Continuous Rating : puissance maximale que le moteur peut développer en continu sur 24h. L'overspeed se déclenche généralement à 103-110% MCR.","MCR = Maximum Continuous Rating: maximum power the engine can develop continuously for 24h. Overspeed typically triggers at 103-110% MCR.","MCR = Maximum Continuous Rating: potencia maxima que el motor puede desarrollar continuamente durante 24h. El sobreregimen se activa tipicamente al 103-110% MCR.","MCR = Maximum Continuous Rating: potencia maxima que o motor pode desenvolver continuamente por 24h. A sobrevelocidade tipicamente aciona em 103-110% MCR.")
    },
    { q: t("Quelle est la différence entre un 'alarm' et un 'shutdown' ?","What is the difference between an 'alarm' and a 'shutdown'?","Cual es la diferencia entre una 'alarma' y una 'parada'?","Qual e a diferenca entre um 'alarme' e uma 'parada'?"),
      opts:[t("Alarm = signal sonore, Shutdown = signal visuel","Alarm = audible signal, Shutdown = visual signal","Alarma = senal sonora, Parada = senal visual","Alarme = sinal sonoro, Parada = sinal visual"),t("Alarm = avertissement, Shutdown = arrêt automatique du moteur","Alarm = warning, Shutdown = automatic engine stop","Alarma = aviso, Parada = parada automatica del motor","Alarme = aviso, Parada = parada automatica do motor"),t("Ce sont des synonymes","They are synonyms","Son sinonimos","Sao sinonimos"),t("Alarm = 1er niveau, Shutdown = 2e alarme","Alarm = 1st level, Shutdown = 2nd alarm","Alarma = 1er nivel, Parada = 2a alarma","Alarme = 1o nivel, Parada = 2a alarme")],correct:1,
      exp:t("Un alarm alerte l'équipage pour action manuelle. Un shutdown stoppe automatiquement le moteur sans intervention humaine, pour protéger l'équipement.","An alarm alerts crew for manual action. A shutdown stops the engine automatically without human intervention, to protect equipment.","Una alarma alerta a la tripulacion para accion manual. Una parada detiene el motor automaticamente sin intervencion humana, para proteger el equipo.","Um alarme alerta a tripulacao para acao manual. Uma parada para o motor automaticamente sem intervencao humana, para proteger o equipamento.")
    },
    { q: t("Quel carburant produit zéro émission de SOx ?","Which fuel produces zero SOx emissions?","Que combustible produce cero emisiones de SOx?","Qual combustivel produz zero emissoes de SOx?"),
      opts:["HFO","MDO","LNG","MGO"],correct:2,
      exp:t("Le GNL (LNG) ne contient pas de soufre. HFO peut contenir jusqu'à 3.5% S (hors zone ECA), MDO < 0.1% S en zone ECA.","LNG contains no sulfur. HFO can contain up to 3.5% S (outside ECA), MDO < 0.1% S in ECA zones.","El GNL (LNG) no contiene azufre. HFO puede contener hasta 3,5% S (fuera de zona ECA), MDO < 0,1% S en zona ECA.","O GNL (LNG) nao contem enxofre. HFO pode conter ate 3,5% S (fora da zona ECA), MDO < 0,1% S em zona ECA.")
    },
    { q: t("Que signifie 'DEAD SLOW AHEAD' sur le telegraph ?","What does 'DEAD SLOW AHEAD' mean on the telegraph?","Que significa 'DEAD SLOW AHEAD' en el telegrafo?","O que significa 'DEAD SLOW AHEAD' no telegrafo?"),
      opts:[t("Arrêt complet","Full stop","Parada completa","Parada completa"),t("Vitesse minimale avant — environ 25-30% MCR","Minimum ahead speed — about 25-30% MCR","Velocidad minima avante — aproximadamente 25-30% MCR","Velocidade minima avante — aproximadamente 25-30% MCR"),t("Vitesse économique","Economical speed","Velocidad economica","Velocidade economica"),t("Manoeuvre d'urgence","Emergency maneuver","Maniobra de emergencia","Manobra de emergencia")],correct:1,
      exp:t("Dead Slow Ahead est la vitesse avant minimale, utilisée en manoeuvre portuaire ou par mauvais temps. Environ 25-30% de la puissance MCR.","Dead Slow Ahead is the minimum ahead speed, used in port maneuvering or bad weather. About 25-30% of MCR power.","Dead Slow Ahead es la velocidad avante minima, usada en maniobra portuaria o con mal tiempo. Aproximadamente 25-30% de la potencia MCR.","Dead Slow Ahead e a velocidade avante minima, usada em manobras portuarias ou mau tempo. Aproximadamente 25-30% da potencia MCR.")
    },
    { q: t("Quelle est la conséquence d'une pression carter anormalement basse ?","What is the consequence of abnormally low crankcase pressure?","Cual es la consecuencia de una presion de carter anormalmente baja?","Qual e a consequencia de uma pressao de carter anormalmente baixa?"),
      opts:[t("Surchauffe du moteur","Engine overheating","Sobrecalentamiento del motor","Superaquecimento do motor"),t("Risque d'explosion du carter","Crankcase explosion risk","Riesgo de explosion del carter","Risco de explosao do carter"),t("Perte de puissance","Power loss","Perdida de potencia","Perda de potencia"),t("Consommation accrue","Increased consumption","Consumo aumentado","Consumo aumentado")],correct:1,
      exp:t("Une dépression excessive du carter peut indiquer un problème de ventilation créant un mélange air/huile explosif. Les détecteurs de brouillard d'huile (OMD) surveillent ce risque.","Excessive crankcase vacuum can indicate ventilation issues creating explosive air/oil mixtures. Oil Mist Detectors (OMD) monitor this risk.","Una depresion excesiva del carter puede indicar problemas de ventilacion creando mezcla aire/aceite explosiva. Los detectores de niebla de aceite (OMD) monitorean este riesgo.","Uma depressao excessiva do carter pode indicar problemas de ventilacao criando mistura ar/oleo explosiva. Os detectores de neblina de oleo (OMD) monitoram este risco.")
    },
    { q: t("Qu'est-ce que le 'fuel rack' sur un moteur diesel ?","What is the 'fuel rack' on a diesel engine?","Que es el 'fuel rack' en un motor diesel?","O que e o 'fuel rack' em um motor diesel?"),
      opts:[t("Le filtre à carburant","The fuel filter","El filtro de combustible","O filtro de combustivel"),t("La crémaillère d'injection contrôlant le débit de carburant","The injection rack controlling fuel delivery","La cremallera de inyeccion que controla el caudal de combustible","A cremalheira de injecao que controla o fluxo de combustivel"),t("Le réservoir journalier","The day tank","El tanque diario","O tanque diario"),t("La pompe de transfert","The transfer pump","La bomba de transferencia","A bomba de transferencia")],correct:1,
      exp:t("Le fuel rack est la crémaillère mécanique reliée aux pompes d'injection. Sa position (0-100%) détermine la quantité de carburant injectée. L'actuateur du governor déplace cette crémaillère.","The fuel rack is the mechanical rack connected to injection pumps. Its position (0-100%) determines the amount of fuel injected. The governor actuator moves this rack.","La cremallera de combustible es la cremallera mecanica conectada a las bombas de inyeccion. Su posicion (0-100%) determina la cantidad de combustible inyectado. El actuador del governor mueve esta cremallera.","A cremalheira de combustivel e a cremalheira mecanica conectada as bombas de injecao. Sua posicao (0-100%) determina a quantidade de combustivel injetado. O atuador do governor move esta cremalheira.")
    },
    { q: t("Quel est l'avantage principal du governor électronique vs mécanique ?","What is the main advantage of electronic vs mechanical governor?","Cual es la ventaja principal del governor electronico vs mecanico?","Qual e a principal vantagem do governor eletronico vs mecanico?"),
      opts:[t("Moins coûteux","Less expensive","Menos costoso","Menos custoso"),t("Réponse plus rapide et précise — compensation charge en ms","Faster and more precise response — load compensation in ms","Respuesta mas rapida y precisa — compensacion de carga en ms","Resposta mais rapida e precisa — compensacao de carga em ms"),t("Pas de maintenance requise","No maintenance required","Sin mantenimiento requerido","Sem manutencao necessaria"),t("Compatible avec tous les carburants","Compatible with all fuels","Compatible con todos los combustibles","Compativel com todos os combustiveis")],correct:1,
      exp:t("Le governor électronique réagit en millisecondes aux variations de charge, contre plusieurs secondes pour un governor mécanique. Crucial pour la stabilité de la fréquence du réseau électrique (50/60 Hz).","The electronic governor reacts in milliseconds to load changes, vs several seconds for a mechanical governor. Crucial for electrical network frequency stability (50/60 Hz).","El governor electronico reacciona en milisegundos a los cambios de carga, frente a varios segundos para un governor mecanico. Crucial para la estabilidad de la frecuencia de la red electrica (50/60 Hz).","O governor eletronico reage em milissegundos a mudancas de carga, vs varios segundos para um governor mecanico. Crucial para estabilidade de frequencia da rede eletrica (50/60 Hz).")
    },
    { q: t("Que se passe-t-il si le signal du governor tombe à 0 mA ?","What happens if the governor signal drops to 0 mA?","Que ocurre si la senal del governor cae a 0 mA?","O que acontece se o sinal do governor cair a 0 mA?"),
      opts:[t("Le moteur tourne au ralenti","Engine idles","El motor gira en ralenti","Motor funciona em marcha lenta"),t("Aucun changement","No change","Ningun cambio","Nenhuma mudanca"),t("Failsafe : carburant coupé ou position sécurité","Failsafe: fuel cut or safe position","Failsafe: combustible cortado o posicion segura","Failsafe: combustivel cortado ou posicao segura"),t("Overspeed automatique","Automatic overspeed","Sobrevelocidad automatica","Sobrevelocidade automatica")],correct:2,
      exp:t("Le standard 4-20mA permet de détecter les défauts de câble (0 mA = rupture). En failsafe, l'actuateur revient en position sécurité (carburant minimum ou coupure).","The 4-20mA standard allows cable fault detection (0 mA = break). In failsafe mode, the actuator returns to safe position (minimum fuel or cutoff).","El estandar 4-20mA permite detectar fallos de cable (0 mA = ruptura). En failsafe, el actuador vuelve a posicion segura (combustible minimo o corte).","O padrao 4-20mA permite detectar falhas de cabo (0 mA = ruptura). Em failsafe, o atuador retorna a posicao segura (combustivel minimo ou corte).")
    },
    { q: t("Quelle convention STCW régit la veille machine ?","Which STCW convention governs engine watchkeeping?","Que convenio STCW rige la guardia de maquinas?","Qual convencao STCW rege o quarto de maquinas?"),
      opts:["STCW Reg. II/1","STCW Reg. III/1","STCW Reg. IV/2","STCW Reg. I/14"],correct:1,
      exp:t("STCW Regulation III/1 établit les normes de compétence pour officiers mécaniciens en charge du quart machine. Inclut la connaissance des systèmes d'automatisation et d'alarme.","STCW Regulation III/1 establishes competency standards for engineer officers in charge of engine watchkeeping. Includes knowledge of automation and alarm systems.","El Reglamento STCW III/1 establece los estandares de competencia para oficiales de maquinas a cargo de la guardia de maquinas. Incluye conocimiento de sistemas de automatizacion y alarma.","O Regulamento STCW III/1 estabelece os padroes de competencia para oficiais de maquinas responsaveis pelo quarto de maquinas. Inclui conhecimento de sistemas de automacao e alarme.")
    },
    { q: t("Quel est le délai maximum pour répondre à un ordre telegraph en port ?","What is the maximum delay to respond to a telegraph order in port?","Cual es el retraso maximo para responder una orden de telegrafo en puerto?","Qual e o atraso maximo para responder uma ordem de telegrafo no porto?"),
      opts:["30 secondes","60 secondes",t("Immédiat — moins de 10 secondes","Immediate — less than 10 seconds","Inmediato — menos de 10 segundos","Imediato — menos de 10 segundos"),t("5 minutes","5 minutes","5 minutos","5 minutos")],correct:2,
      exp:t("En manoeuvre portuaire, l'ordre doit être exécuté immédiatement. Le mécanicien confirme l'ordre en répétant sur le telegraph (ACK), puis exécute. Tout délai peut causer un abordage.","In port maneuvering, the order must be executed immediately. The engineer confirms by repeating on the telegraph (ACK), then executes. Any delay can cause collision.","En maniobra portuaria, la orden debe ejecutarse inmediatamente. El mecanico confirma la orden repitiendola en el telegrafo (ACK), luego ejecuta. Cualquier retraso puede causar abordaje.","Em manobra portuaria, a ordem deve ser executada imediatamente. O mecanico confirma repetindo no telegrafo (ACK), depois executa. Qualquer atraso pode causar colisao.")
    },
    { q: t("Pourquoi le HFO nécessite-t-il un préchauffage avant injection ?","Why does HFO require preheating before injection?","Por que el HFO requiere precalentamiento antes de la inyeccion?","Por que o HFO requer pre-aquecimento antes da injecao?"),
      opts:[t("Pour augmenter la puissance","To increase power","Para aumentar la potencia","Para aumentar a potencia"),t("Pour réduire la viscosité et permettre une atomisation correcte","To reduce viscosity and allow correct atomization","Para reducir la viscosidad y permitir una correcta atomizacion","Para reduzir a viscosidade e permitir atomizacao correta"),t("Pour respecter les règles MARPOL","To comply with MARPOL rules","Para cumplir las reglas MARPOL","Para cumprir as regras MARPOL"),t("Pour refroidir les injecteurs","To cool the injectors","Para enfriar los inyectores","Para resfriar os injetores")],correct:1,
      exp:t("Le HFO à 380 cSt est très visqueux à température ambiante. Il doit être chauffé à 130-140C pour atteindre environ 12-15 cSt permettant une bonne atomisation dans les cylindres.","HFO at 380 cSt is very viscous at ambient temperature. It must be heated to 130-140C to reach about 12-15 cSt allowing good atomization in the cylinders.","El HFO a 380 cSt es muy viscoso a temperatura ambiente. Debe calentarse a 130-140C para alcanzar aproximadamente 12-15 cSt permitiendo una buena atomizacion en los cilindros.","O HFO a 380 cSt e muito viscoso na temperatura ambiente. Deve ser aquecido a 130-140C para atingir aproximadamente 12-15 cSt permitindo boa atomizacao nos cilindros.")
    },
    { q: t("Qu'est-ce qu'un 'slow-down' par opposition à un 'shutdown' ?","What is a 'slow-down' as opposed to a 'shutdown'?","Que es un 'slow-down' en oposicion a un 'shutdown'?","O que e um 'slow-down' em oposicao a um 'shutdown'?"),
      opts:[t("Synonymes","Synonyms","Sinonimos","Sinonimos"),t("Slow-down = réduction automatique de charge, Shutdown = arrêt complet","Slow-down = automatic load reduction, Shutdown = complete stop","Slow-down = reduccion automatica de carga, Shutdown = parada completa","Slow-down = reducao automatica de carga, Shutdown = parada completa"),t("Slow-down = arrêt moteur, Shutdown = réduction de vitesse","Slow-down = engine stop, Shutdown = speed reduction","Slow-down = parada motor, Shutdown = reduccion velocidad","Slow-down = parada motor, Shutdown = reducao velocidade"),t("Slow-down = mode économique","Slow-down = eco mode","Slow-down = modo economico","Slow-down = modo economico")],correct:1,
      exp:t("Un slow-down réduit automatiquement la puissance moteur (ex: haute temp. eau) pour laisser le temps à l'équipage d'intervenir. Un shutdown stoppe complètement le moteur pour protéger l'équipement.","A slow-down automatically reduces engine power (e.g.: high water temp.) to give crew time to intervene. A shutdown completely stops the engine to protect equipment.","Un slow-down reduce automaticamente la potencia del motor (ej: alta temp. agua) para dar tiempo a la tripulacion a intervenir. Un shutdown detiene completamente el motor para proteger el equipo.","Um slow-down reduz automaticamente a potencia do motor (ex: alta temp. agua) para dar tempo a tripulacao para intervir. Um shutdown para completamente o motor para proteger o equipamento.")
    },
  ];

  const trophy = (score,total) => {
    const pct = score/total;
    if(pct===1) return "🏆";
    if(pct>=0.8) return "🥇";
    if(pct>=0.6) return "🥈";
    if(pct>=0.4) return "🥉";
    return "📚";
  };

  const quizScore = Object.entries(quizAnswers).filter(([i,a])=>quizQs[Number(i)].correct===a).length;
  const qbScore = Object.entries(qbAnswers).filter(([i,a])=>qBank[Number(i)].correct===a).length;

  const S = {
    page:{background:C.bg0,minHeight:"100vh",color:C.white,fontFamily:"Nunito, sans-serif"},
    header:{background:`linear-gradient(135deg,${C.bg1},${C.bg2})`,
      borderBottom:`1px solid ${C.border}`,padding:"12px 16px"},
    badge:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,229,255,0.12)",
      border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px",marginBottom:8},
    section:{padding:"0 16px",marginBottom:24},
    card:{background:C.bg2,borderRadius:12,padding:14,border:`1px solid ${C.border}`,marginBottom:12},
    h2:{color:C.cyan,fontFamily:"Courier New",fontSize:13,letterSpacing:2,marginBottom:10},
    h3:{color:C.amber,fontSize:14,fontWeight:700,marginBottom:6},
    mono:{fontFamily:"Courier New",background:C.bg1,borderRadius:6,padding:"8px 10px",
      fontSize:11,color:C.cyan2,lineHeight:1.6,marginBottom:8},
    tag:{display:"inline-block",background:"rgba(0,229,255,0.1)",border:`1px solid ${C.border}`,
      borderRadius:4,padding:"2px 8px",fontSize:10,color:C.cyan,marginRight:4,marginBottom:4},
    btn:{padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",
      fontFamily:"Courier New",fontSize:12,fontWeight:700,letterSpacing:1},
  };

  const accidentData = {
    title: t("MV DERBYSHIRE — NORD PACIFIQUE, 1980",
      "MV DERBYSHIRE — NORTH PACIFIC, 1980",
      "MV DERBYSHIRE — PACIFICO NORTE, 1980",
      "MV DERBYSHIRE — PACIFICO NORTE, 1980"),
    victims: "44",
    flag: "🇬🇧",
    cause: t(
      "Le plus grand navire britannique jamais perdu en mer. Pendant le typhon Orchid, les plaques de pont se déforment sous les chocs des vagues. Eau de mer envahit le tunnel des tuyaux de sonde. Le governor ne peut compenser les dommages structurels. Aucune alarme automatique ne déclenche d'arrêt — le moteur continue de fonctionner pendant que le navire sombre.",
      "The largest British ship ever lost at sea. During Typhoon Orchid, deck plates deform under wave impacts. Seawater floods the sounding pipe tunnel. The governor cannot compensate for structural damage. No automatic alarm triggers a shutdown — the engine keeps running as the ship sinks.",
      "El buque britanico mas grande jamas perdido en el mar. Durante el tifon Orchid, las planchas de cubierta se deforman bajo los impactos de las olas. El agua de mar inunda el tunel de los tubos de sonda. El governor no puede compensar los danos estructurales. Ninguna alarma automatica activa un paro — el motor sigue funcionando mientras el buque se hunde.",
      "O maior navio britanico ja perdido no mar. Durante o tifao Orchid, as chapas de convés se deformam sob os impactos das ondas. Agua do mar inunda o tunel dos tubos de sonda. O governor nao pode compensar os danos estruturais. Nenhum alarme automatico aciona uma parada — o motor continua funcionando enquanto o navio afunda."
    ),
    lessons: [
      t("Inspection systématique des puits de chaîne et tunnels avant typhon","Systematic inspection of chain lockers and tunnels before typhoon","Inspeccion sistematica de pozos de cadena y tuneles antes del tifon","Inspecao sistematica de poos de ancoras e tuneis antes do tifao"),
      t("Corrélation entre données météo et réduction de puissance préventive","Correlation between weather data and preventive power reduction","Correlacion entre datos meteorologicos y reduccion preventiva de potencia","Correlacao entre dados meteorologicos e reducao preventiva de potencia"),
      t("Protocoles d'arrêt moteur en cas d'inondation de locaux vitaux","Engine shutdown protocols in case of flooding of vital spaces","Protocolos de parada del motor en caso de inundacion de espacios vitales","Protocolos de parada do motor em caso de inundacao de espacos vitais"),
      t("Systèmes automatiques de détection d'envahissement (ISM Code 2002)","Automatic flooding detection systems (ISM Code 2002)","Sistemas automaticos de deteccion de inundacion (Codigo ISM 2002)","Sistemas automaticos de deteccao de inundacao (Codigo ISM 2002)"),
    ],
    ref: "MAIB Report 2000 · ISM Code Reg. 10 · SOLAS II-1/22"
  };

  const summaryPoints = [
    t("Governor électronique = régulation vitesse moteur par signal 4-20mA sur fuel rack","Electronic governor = engine speed regulation via 4-20mA signal on fuel rack","Governor electronico = regulacion velocidad motor via senal 4-20mA en cremallera de combustible","Governor eletronico = regulacao velocidade motor via sinal 4-20mA na cremalheira de combustivel"),
    t("HFO (380 cSt) : préchauffage 130-140C obligatoire avant injection","HFO (380 cSt): preheating 130-140C mandatory before injection","HFO (380 cSt): precalentamiento 130-140C obligatorio antes de inyeccion","HFO (380 cSt): pre-aquecimento 130-140C obrigatorio antes da injecao"),
    t("LNG : zero SOx, réduction 80-90% NOx vs HFO","LNG: zero SOx, 80-90% NOx reduction vs HFO","LNG: cero SOx, reduccion 80-90% NOx vs HFO","LNG: zero SOx, reducao 80-90% NOx vs HFO"),
    t("Telegraph : passerelle envoie ordre → machine accuse réception (ACK) → exécution","Telegraph: bridge sends order → engine room acknowledges (ACK) → execution","Telegrafo: puente envia orden → maquinas acusa recibo (ACK) → ejecucion","Telegrafo: ponte envia ordem → maquinas acusa recibo (ACK) → execucao"),
    t("Safety shutdown prioritaire sur tout ordre telegraph","Safety shutdown takes priority over all telegraph orders","Parada de seguridad tiene prioridad sobre cualquier orden de telegrafo","Parada de seguranca tem prioridade sobre qualquer ordem de telegrafo"),
    t("Arrêts automatiques : Lo Lub Oil Press (<1.5 bar), Hi Coolant Temp (>95C), Overspeed (>103% MCR)","Auto shutdowns: Lo Lube Oil Press (<1.5 bar), Hi Coolant Temp (>95C), Overspeed (>103% MCR)","Paradas automaticas: Lo Presion Aceite (<1,5 bar), Hi Temp Refrigerante (>95C), Sobrevelocidad (>103% MCR)","Paradas automaticas: Lo Pressao Oleo (<1,5 bar), Hi Temp Refrigerante (>95C), Sobrevelocidade (>103% MCR)"),
    t("Slow-down = réduction charge automatique | Shutdown = arrêt complet","Slow-down = automatic load reduction | Shutdown = complete stop","Slow-down = reduccion automatica de carga | Shutdown = parada completa","Slow-down = reducao automatica de carga | Shutdown = parada completa"),
    t("OMD (Oil Mist Detector) : surveillance pression carter — risque explosion","OMD (Oil Mist Detector): crankcase pressure monitoring — explosion risk","OMD (Oil Mist Detector): vigilancia presion carter — riesgo de explosion","OMD (Oil Mist Detector): monitoramento pressao carter — risco de explosao"),
    t("STCW Reg. III/1 : compétences officier mécanicien quart machine","STCW Reg. III/1: engineer officer watchkeeping competencies","STCW Reg. III/1: competencias oficial de maquinas guardia de maquinas","STCW Reg. III/1: competencias oficial de maquinas quarto de maquinas"),
    t("MCR = Maximum Continuous Rating — référence de toutes les limites moteur","MCR = Maximum Continuous Rating — reference for all engine limits","MCR = Maximum Continuous Rating — referencia para todos los limites del motor","MCR = Maximum Continuous Rating — referencia para todos os limites do motor"),
  ];

  if (showQuiz && !quizDone) {
    const q = quizQs[quizIdx];
    return (
      <div style={S.page}>
        <div style={S.header}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <button onClick={()=>setShowQuiz(false)}
              style={{...S.btn,background:"transparent",border:`1px solid ${C.steel}`,color:C.muted,padding:"6px 12px"}}>
              ← {t("Retour","Back","Volver","Voltar")}
            </button>
            <span style={{color:C.cyan,fontFamily:"Courier New",fontSize:11}}>{quizIdx+1}/5</span>
          </div>
        </div>
        <div style={{padding:16}}>
          <div style={{...S.card,borderColor:C.border}}>
            <div style={{color:C.cyan,fontSize:13,fontWeight:700,marginBottom:12}}>{q.q}</div>
            {q.opts.map((opt,oi) => {
              const answered = quizAnswers[quizIdx] !== undefined;
              const isCorrect = oi === q.correct;
              const isChosen = quizAnswers[quizIdx] === oi;
              let bg = "transparent"; let border = "rgba(255,255,255,0.1)"; let col = C.muted;
              if(answered){
                if(isCorrect){bg="rgba(0,230,118,0.12)";border=C.green;col=C.green;}
                else if(isChosen){bg="rgba(255,23,68,0.12)";border=C.red;col=C.red;}
              } else if(isChosen){bg="rgba(0,229,255,0.1)";border=C.cyan;col=C.cyan;}
              return (
                <button key={oi} onClick={()=>{if(!answered)setQuizAnswers(a=>({...a,[quizIdx]:oi}));}}
                  style={{width:"100%",textAlign:"left",padding:"10px 12px",marginBottom:6,
                    background:bg,border:`1px solid ${border}`,borderRadius:8,
                    color:col,fontSize:12,cursor:answered?"default":"pointer"}}>
                  {opt}
                </button>
              );
            })}
            {quizAnswers[quizIdx]!==undefined && (
              <button onClick={()=>{if(quizIdx<4)setQuizIdx(i=>i+1);else setQuizDone(true);}}
                style={{...S.btn,width:"100%",marginTop:8,
                  background:`linear-gradient(90deg,${C.cyan},${C.amber})`,color:C.bg0}}>
                {quizIdx<4?t("Suivant →","Next →","Siguiente →","Proximo →"):t("Voir résultat","See result","Ver resultado","Ver resultado")}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz && quizDone) {
    const icon = trophy(quizScore,5);
    return (
      <div style={{...S.page,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{fontSize:56,marginBottom:12}}>{icon}</div>
        <div style={{color:C.cyan,fontFamily:"Courier New",fontSize:20,fontWeight:700}}>{quizScore}/5</div>
        <div style={{color:C.muted,fontSize:13,margin:"8px 0 20px"}}>
          {quizScore===5?t("Parfait !","Perfect!","Perfecto!","Perfeito!"):quizScore>=3?t("Bien joué !","Well done!","Bien hecho!","Bom trabalho!"):t("Continue à étudier","Keep studying","Sigue estudiando","Continue estudando")}
        </div>
        <button onClick={onComplete}
          style={{...S.btn,background:`linear-gradient(90deg,${C.cyan},${C.amber})`,color:C.bg0,marginBottom:10}}>
          {t("Leçon suivante →","Next lesson →","Leccion siguiente →","Proxima licao →")}
        </button>
        <button onClick={()=>{setShowQuiz(false);setQuizDone(false);setQuizIdx(0);setQuizAnswers({});}}
          style={{...S.btn,background:"transparent",border:`1px solid ${C.steel}`,color:C.muted}}>
          {t("Revoir la leçon","Review lesson","Repasar leccion","Revisar licao")}
        </button>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* HEADER */}
      <div style={S.header}>
        <button onClick={onBack}
          style={{...S.btn,background:"transparent",border:"none",color:C.muted,padding:0,marginBottom:8}}>
          ← {t("Retour","Back","Volver","Voltar")}
        </button>
        <div style={S.badge}>
          <span style={{color:C.amber}}>👑</span>
          <span style={{color:C.amber,fontFamily:"Courier New",fontSize:10,letterSpacing:1}}>PREMIUM+</span>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:4}}>
          <span style={{...S.tag,color:C.cyan,borderColor:C.border}}>e7 · L3</span>
          <span style={{...S.tag,color:C.amber,borderColor:C.borderA}}>UMS & Automation</span>
        </div>
        <h1 style={{color:C.white,fontSize:17,fontWeight:800,margin:0,lineHeight:1.2}}>
          {t("Automatisation du Moteur Principal","Main Engine Automation","Automatizacion del Motor Principal","Automatizacao do Motor Principal")}
        </h1>
        <p style={{color:C.muted,fontSize:12,margin:"6px 0 0",lineHeight:1.4}}>
          {t("Governor · Fuel Control · Telegraph · Safety Shutdowns","Governor · Fuel Control · Telegraph · Safety Shutdowns","Governor · Control Combustible · Telegrafo · Paradas Seguridad","Governor · Controle Combustivel · Telegrafo · Paradas Seguranca")}
        </p>
      </div>

      {/* SECTION 1 — GOVERNOR */}
      <div style={S.section}>
        <div style={{...S.card,borderColor:C.border}}>
          <div style={S.h2}>◈ 1 — {t("GOVERNOR ÉLECTRONIQUE","ELECTRONIC GOVERNOR","GOVERNOR ELECTRONICO","GOVERNOR ELETRONICO")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("Le governor électronique est le cerveau de la régulation vitesse du moteur principal. Il compare en permanence la vitesse réelle (capteur) avec la consigne (setpoint) et ajuste le débit carburant via un actuateur électro-hydraulique. Signal standard : 4-20 mA sur la crémaillère d'injection (fuel rack).",
              "The electronic governor is the brain of main engine speed regulation. It continuously compares actual speed (sensor) with setpoint and adjusts fuel flow via an electro-hydraulic actuator. Standard signal: 4-20 mA on the injection rack (fuel rack).",
              "El governor electronico es el cerebro de la regulacion de velocidad del motor principal. Compara continuamente la velocidad real (sensor) con la consigna y ajusta el caudal de combustible mediante un actuador electrohidraulico. Senal estandar: 4-20 mA en la cremallera de inyeccion.",
              "O governor eletronico e o cerebro da regulacao de velocidade do motor principal. Compara continuamente a velocidade real (sensor) com a consigna e ajusta o fluxo de combustivel via um atuador eletro-hidraulico. Sinal padrao: 4-20 mA na cremalheira de injecao.")}
          </p>
          <div style={S.mono}>
            {"GOVERNOR LOOP\n"}
            {"Actual RPM → [PID Controller] → Fuel Rack Position\n"}
            {"     ↑                                    ↓\n"}
            {"  Setpoint ←────── Error Signal ──────────┘\n"}
            {"\n"}
            {"4 mA  = 0% fuel rack (min)\n"}
            {"20 mA = 100% fuel rack (max)\n"}
            {"0 mA  = FAILSAFE (cable break detected)"}
          </div>
          <GovernorSVG />
          <div style={{marginTop:10,padding:"8px 10px",background:"rgba(255,179,0,0.07)",
            border:`1px solid ${C.amber}33`,borderRadius:8,fontSize:11,color:C.amber}}>
            ⚡ {t("Mode AUTO : governor maintient le RPM consigne. Mode MANUAL : l'officier mécanicien règle directement le fuel rack.",
              "AUTO mode: governor maintains setpoint RPM. MANUAL mode: engineer directly adjusts the fuel rack.",
              "Modo AUTO: el governor mantiene el RPM de consigna. Modo MANUAL: el mecanico regula directamente la cremallera.",
              "Modo AUTO: governor mantém o RPM de consigna. Modo MANUAL: mecanico regula diretamente a cremalheira.")}
          </div>
        </div>

        {/* SECTION 2 — FUEL CONTROL */}
        <div style={{...S.card,borderColor:C.borderA}}>
          <div style={{...S.h2,color:C.amber}}>◈ 2 — {t("SYSTEME CARBURANT","FUEL SYSTEM","SISTEMA COMBUSTIBLE","SISTEMA COMBUSTIVEL")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("Le système carburant gère la sélection, le traitement et l'injection du combustible. En salle des machines : centrifugeuses (séparateurs), préchauffeurs, viscosimètres. L'officier mécanicien peut basculer entre HFO, MDO et LNG selon la zone de navigation (MARPOL Annex VI — zones ECA < 0.1% soufre).",
              "The fuel system manages selection, treatment and injection of fuel. In engine room: centrifuges (separators), preheaters, viscometers. The engineer can switch between HFO, MDO and LNG depending on navigation zone (MARPOL Annex VI — ECA zones < 0.1% sulfur).",
              "El sistema de combustible gestiona la seleccion, tratamiento e inyeccion del combustible. En sala de maquinas: centrifugas (separadores), precalentadores, viscosimetros. El mecanico puede cambiar entre HFO, MDO y LNG segun la zona de navegacion (MARPOL Anexo VI — zonas ECA < 0,1% azufre).",
              "O sistema de combustivel gerencia selecao, tratamento e injecao do combustivel. Na sala de maquinas: centrifugas (separadores), pre-aquecedores, viscosimetros. O mecanico pode alternar entre HFO, MDO e LNG conforme a zona de navegacao (MARPOL Anexo VI — zonas ECA < 0,1% enxofre).")}
          </p>
          <FuelControlSVG />
        </div>

        {/* SECTION 3 — TELEGRAPH */}
        <div style={{...S.card,borderColor:"rgba(0,230,118,0.2)"}}>
          <div style={{...S.h2,color:C.green}}>◈ 3 — TELEGRAPH & {t("ORDRES MACHINE","ENGINE ORDERS","ORDENES MAQUINAS","ORDENS MAQUINAS")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("Le telegraph électronique transmet les ordres de vitesse de la passerelle vers la salle des machines. Chaque ordre doit être accusé réception (ACK) par l'officier mécanicien avant exécution. Le système électronique moderne inclut un enregistreur automatique des ordres (VDR).",
              "The electronic telegraph transmits speed orders from bridge to engine room. Each order must be acknowledged (ACK) by the duty engineer before execution. The modern electronic system includes automatic order recorder (VDR).",
              "El telegrafo electronico transmite ordenes de velocidad desde el puente hasta la sala de maquinas. Cada orden debe ser acusada de recibo (ACK) por el oficial de maquinas antes de su ejecucion. El sistema electronico moderno incluye registrador automatico de ordenes (VDR).",
              "O telegrafo eletronico transmite ordens de velocidade da ponte para a sala de maquinas. Cada ordem deve ser acusada de recibo (ACK) pelo oficial de maquinas antes da execucao. O sistema eletronico moderno inclui registrador automatico de ordens (VDR).")}
          </p>
          <TelegraphSVG />
        </div>

        {/* SECTION 4 — SAFETY SHUTDOWNS */}
        <div style={{...S.card,borderColor:"rgba(255,23,68,0.25)"}}>
          <div style={{...S.h2,color:C.red}}>◈ 4 — SAFETY SHUTDOWNS & SLOW-DOWNS</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("Les systèmes de protection automatique arrêtent ou réduisent la puissance du moteur quand un paramètre critique dépasse son seuil. Un shutdown a toujours priorité sur un ordre telegraph. L'officier mécanicien doit savoir identifier la cause avant de redémarrer.",
              "Automatic protection systems stop or reduce engine power when a critical parameter exceeds its threshold. A shutdown always takes priority over a telegraph order. The duty engineer must identify the cause before restarting.",
              "Los sistemas de proteccion automatica detienen o reducen la potencia del motor cuando un parametro critico supera su umbral. Un shutdown siempre tiene prioridad sobre una orden de telegrafo. El oficial de maquinas debe identificar la causa antes de reiniciar.",
              "Os sistemas de protecao automatica param ou reduzem a potencia do motor quando um parametro critico supera seu limite. Um shutdown sempre tem prioridade sobre uma ordem de telegrafo. O oficial de maquinas deve identificar a causa antes de reiniciar.")}
          </p>
          <SafetyShutdownSVG />
        </div>

        {/* EXERCICE */}
        <div style={{...S.card,borderColor:C.borderA}}>
          <div style={{...S.h2,color:C.amber}}>✏️ {t("EXERCICE","EXERCISE","EJERCICIO","EXERCICIO")}</div>
          {[
            t("Expliquez la différence entre un governor en mode AUTO et MANUAL. Quand bascule-t-on en MANUAL ?",
              "Explain the difference between a governor in AUTO and MANUAL mode. When do you switch to MANUAL?",
              "Explique la diferencia entre un governor en modo AUTO y MANUAL. Cuando se cambia a MANUAL?",
              "Explique a diferenca entre um governor em modo AUTO e MANUAL. Quando se muda para MANUAL?"),
            t("Un alarm 'Hi Exhaust Temp' apparait. Quelles sont vos 3 premières actions en tant qu'officier mécanicien de quart ?",
              "A 'Hi Exhaust Temp' alarm appears. What are your 3 first actions as duty engineer?",
              "Aparece una alarma 'Hi Exhaust Temp'. Cuales son sus 3 primeras acciones como oficial de maquinas de guardia?",
              "Um alarme 'Hi Exhaust Temp' aparece. Quais sao suas 3 primeiras acoes como oficial de maquinas de quarto?"),
            t("Le navire entre en zone ECA. Décrivez la procédure de changement HFO → MDO.",
              "The vessel enters an ECA zone. Describe the HFO → MDO changeover procedure.",
              "El buque entra en zona ECA. Describa el procedimiento de cambio HFO → MDO.",
              "O navio entra em zona ECA. Descreva o procedimento de mudanca HFO → MDO."),
            t("Pourquoi un safety shutdown a-t-il priorité sur un ordre FULL AHEAD de la passerelle ?",
              "Why does a safety shutdown take priority over a FULL AHEAD order from the bridge?",
              "Por que una parada de seguridad tiene prioridad sobre una orden FULL AHEAD del puente?",
              "Por que uma parada de seguranca tem prioridade sobre uma ordem FULL AHEAD da ponte?"),
            t("Calculez : Si le MCR du moteur est 15,000 kW à 95 RPM, quelle est la puissance à 75% charge ?",
              "Calculate: If engine MCR is 15,000 kW at 95 RPM, what is the power at 75% load?",
              "Calcule: Si el MCR del motor es 15.000 kW a 95 RPM, cual es la potencia al 75% de carga?",
              "Calcule: Se o MCR do motor e 15.000 kW a 95 RPM, qual e a potencia a 75% de carga?"),
          ].map((q,i) => (
            <div key={i} style={{marginBottom:10}}>
              <div style={{color:C.white,fontSize:12,marginBottom:4}}>{i+1}. {q}</div>
              <textarea value={exAnswers[i]||""} onChange={e=>setExAnswers(a=>({...a,[i]:e.target.value}))}
                placeholder={t("Votre réponse...","Your answer...","Su respuesta...","Sua resposta...")}
                style={{width:"100%",minHeight:60,background:C.bg1,border:`1px solid ${C.border}`,
                  borderRadius:6,color:C.white,fontSize:11,padding:"6px 8px",resize:"vertical",boxSizing:"border-box"}}/>
            </div>
          ))}
        </div>

        {/* ACCIDENT CASE */}
        <div style={{...S.card,borderColor:"rgba(255,23,68,0.3)"}}>
          <button onClick={()=>setAccidentOpen(o=>!o)}
            style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{color:C.red,fontFamily:"Courier New",fontSize:11,letterSpacing:2}}>
                ⚠ ACCIDENT CASE {accidentOpen?"▲":"▼"}
              </div>
              <span style={{color:C.red,fontSize:18}}>🏴‍☠️</span>
            </div>
            <div style={{color:C.white,fontSize:13,fontWeight:700,marginTop:4}}>{accidentData.title}</div>
          </button>
          {accidentOpen && (
            <div style={{marginTop:12}}>
              <div style={{display:"flex",gap:10,marginBottom:10}}>
                <span style={{fontSize:24}}>{accidentData.flag}</span>
                <div>
                  <div style={{color:C.red,fontSize:12,fontWeight:700}}>{accidentData.victims} {t("victimes","victims","victimas","vitimas")}</div>
                </div>
              </div>
              <p style={{color:C.muted,fontSize:12,lineHeight:1.7,marginBottom:12}}>{accidentData.cause}</p>
              <div style={{color:C.amber,fontSize:11,fontWeight:700,marginBottom:6}}>
                {t("Leçons retenues :","Lessons learned:","Lecciones aprendidas:","Licoes aprendidas:")}
              </div>
              {accidentData.lessons.map((l,i) => (
                <div key={i} style={{display:"flex",gap:8,marginBottom:4}}>
                  <span style={{color:C.amber,fontSize:12}}>▸</span>
                  <span style={{color:C.muted,fontSize:11}}>{l}</span>
                </div>
              ))}
              <div style={{marginTop:10,padding:"5px 8px",background:"rgba(255,23,68,0.08)",
                borderRadius:6,fontSize:9,color:C.steel2,fontFamily:"Courier New"}}>
                {accidentData.ref}
              </div>
            </div>
          )}
        </div>

        {/* QUESTION BANK */}
        <div style={{...S.card,borderColor:C.border}}>
          <div style={S.h2}>🏆 {t("BANQUE DE QUESTIONS","QUESTION BANK","BANCO DE PREGUNTAS","BANCO DE PERGUNTAS")} (15 QCM)</div>
          {qBank.map((q,qi) => (
            <div key={qi} style={{marginBottom:8,padding:10,background:C.bg1,borderRadius:8,
              border:`1px solid ${qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?"rgba(0,230,118,0.3)":"rgba(255,23,68,0.3)"):"rgba(84,110,122,0.3)"}`}}>
              <button onClick={()=>setQbOpen(qbOpen===qi?null:qi)}
                style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <span style={{color:C.white,fontSize:11,flex:1}}>
                    {qi+1}. {q.q}
                  </span>
                  <span style={{color:qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?C.green:C.red):C.steel2,fontSize:12,flexShrink:0}}>
                    {qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?"✓":"✗"):"○"}
                  </span>
                </div>
              </button>
              {qbOpen===qi && (
                <div style={{marginTop:8}}>
                  {q.opts.map((opt,oi) => {
                    const answered = qbAnswers[qi] !== undefined;
                    const isCorrect = oi===q.correct;
                    const isChosen = qbAnswers[qi]===oi;
                    let bg="transparent";let border="rgba(255,255,255,0.08)";let col=C.muted;
                    if(answered){
                      if(isCorrect){bg="rgba(0,230,118,0.1)";border=C.green;col=C.green;}
                      else if(isChosen){bg="rgba(255,23,68,0.1)";border=C.red;col=C.red;}
                    }
                    return (
                      <button key={oi} onClick={()=>{if(!answered)setQbAnswers(a=>({...a,[qi]:oi}));}}
                        style={{width:"100%",textAlign:"left",padding:"6px 8px",marginBottom:4,
                          background:bg,border:`1px solid ${border}`,borderRadius:6,
                          color:col,fontSize:10,cursor:answered?"default":"pointer"}}>
                        {opt}
                      </button>
                    );
                  })}
                  {qbAnswers[qi]!==undefined && (
                    <div style={{padding:"6px 8px",background:"rgba(0,229,255,0.06)",
                      borderRadius:6,fontSize:10,color:C.cyan2,marginTop:4}}>
                      💡 {q.exp}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {Object.keys(qbAnswers).length===15 && (
            <div style={{textAlign:"center",padding:12,background:C.bg1,borderRadius:8,marginTop:8}}>
              <div style={{fontSize:32,marginBottom:4}}>{trophy(qbScore,15)}</div>
              <div style={{color:C.cyan,fontFamily:"Courier New",fontSize:16}}>{qbScore}/15</div>
            </div>
          )}
        </div>

        {/* RESUME */}
        <div style={{...S.card,borderColor:C.border}}>
          <button onClick={()=>setSummaryOpen(o=>!o)}
            style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
            <div style={{...S.h2,marginBottom:0}}>
              📋 {t("RÉSUMÉ","SUMMARY","RESUMEN","RESUMO")} {summaryOpen?"▲":"▼"}
            </div>
          </button>
          {summaryOpen && (
            <div style={{marginTop:10}}>
              {summaryPoints.map((p,i) => (
                <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{color:C.cyan,fontSize:12,flexShrink:0}}>✓</span>
                  <span style={{color:C.muted,fontSize:11,lineHeight:1.5}}>{p}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUIZ BTN */}
        <div style={{padding:"0 0 32px",textAlign:"center"}}>
          <button onClick={()=>{setShowQuiz(true);setQuizIdx(0);setQuizAnswers({});setQuizDone(false);}}
            style={{...S.btn,background:`linear-gradient(90deg,${C.cyan},${C.amber})`,
              color:C.bg0,padding:"14px 32px",fontSize:14}}>
            🎯 {t("QUIZ FINAL — 5 QUESTIONS","FINAL QUIZ — 5 QUESTIONS","QUIZ FINAL — 5 PREGUNTAS","QUIZ FINAL — 5 PERGUNTAS")}
          </button>
        </div>
      </div>
    </div>
  );
}
