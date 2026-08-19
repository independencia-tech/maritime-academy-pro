import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f",
  cyan:"#00e5ff", cyan2:"#80deea",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae",
  red:"#ff1744", red2:"#ff5252",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  purple:"#d500f9", purple2:"#ea80fc",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(0,229,255,0.18)",
  gold:"#c9922a", gold2:"#e8b94f",
  plc:"#00e5ff", dcs:"#ffb300", scada:"#00e676",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e7 — UMS & Automatisation", xp:"XP gagnes",
    question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse",
    expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>",
    startQuiz:"COMMENCER LE QUIZ", complete:"LECON TERMINEE!",
    backDash:"<= RETOUR AU DASHBOARD", youLearned:"Tu as appris:",
    readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e7 — UMS & Automation", xp:"XP earned",
    question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer",
    expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>",
    startQuiz:"START QUIZ", complete:"LESSON COMPLETE!",
    backDash:"<= BACK TO DASHBOARD", youLearned:"You learned:",
    readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Modulo e7 — UMS & Automatizacion", xp:"XP ganados",
    question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta",
    expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>",
    startQuiz:"EMPEZAR QUIZ", complete:"LECCION COMPLETADA!",
    backDash:"<= VOLVER AL PANEL", youLearned:"Has aprendido:",
    readFirst:"Lee y luego comienza",
    showCorr:"Ver correccion", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Modulo e7 — UMS & Automatizacao", xp:"XP ganhos",
    question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada",
    expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>",
    startQuiz:"COMECAR QUIZ", complete:"LICAO CONCLUIDA!",
    backDash:"<= VOLTAR AO PAINEL", youLearned:"Voce aprendeu:",
    readFirst:"Leia o conteudo e depois comece",
    showCorr:"Ver correcao", hideCorr:"Ocultar" },
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

function Card({ children, style={}, accent=C.border }) {
  return (
    <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${accent}`,
      borderRadius:20,padding:"16px",backdropFilter:"blur(12px)",...style}}>
      {children}
    </div>
  );
}

function SL({ icon, text, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",marginBottom:6}}>
      <div style={{width:38,height:38,borderRadius:13,background:`${color}15`,
        border:`1.5px solid ${color}55`,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:19,flexShrink:0}}>{icon}</div>
      <div style={{fontSize:11,fontWeight:800,color,letterSpacing:2,
        fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>{text}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 1 — PLC ARCHITECTURE
// ══════════════════════════════════════
function PLCArchSVG({ lang }) {
  const [selected, setSelected] = useState(null);
  const [scanPhase, setScanPhase] = useState(0);
  const [scanning, setScanning] = useState(false);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:lang==="pt"?pt:fr;

  useEffect(() => {
    if (!scanning) return;
    const id = setInterval(()=>setScanPhase(p=>(p+1)%4), 600);
    return ()=>clearInterval(id);
  }, [scanning]);

  const modules = [
    {id:"psu",x:12,y:30,w:36,h:120,label:"PSU",sub:"24V DC",icon:"🔋",color:C.amber,
      desc:lbl("Alimentation 24V DC — protection coupures reseau","24V DC power supply — surge protection","Alimentacion 24V DC — proteccion sobrecargas","Alimentacao 24V DC — protecao sobrecargas")},
    {id:"cpu",x:54,y:20,w:56,h:140,label:"CPU",sub:"Intel",icon:"🖥️",color:C.cyan,
      desc:lbl("Unite centrale — execute le programme cyclique SCAN","Central unit — executes cyclic SCAN program","Unidad central — ejecuta programa ciclico SCAN","Unidade central — executa programa ciclico SCAN")},
    {id:"di",x:116,y:30,w:36,h:55,label:"DI",sub:"16ch",icon:"⬇️",color:C.blue2,
      desc:lbl("Entrees digitales — capteurs TOR ON/OFF","Digital inputs — discrete sensors ON/OFF","Entradas digitales — sensores TOR ON/OFF","Entradas digitais — sensores TOR ON/OFF")},
    {id:"do",x:116,y:93,w:36,h:55,label:"DO",sub:"16ch",icon:"⬆️",color:C.green,
      desc:lbl("Sorties digitales — actionneurs TOR relais","Digital outputs — discrete actuators relays","Salidas digitales — actuadores TOR reles","Saidas digitais — atuadores TOR reles")},
    {id:"ai",x:158,y:30,w:36,h:55,label:"AI",sub:"8ch",icon:"📊",color:C.purple2,
      desc:lbl("Entrees analogiques — 4-20mA temp pression","Analog inputs — 4-20mA temp pressure","Entradas analogicas — 4-20mA temp presion","Entradas analogicas — 4-20mA temp pressao")},
    {id:"ao",x:158,y:93,w:36,h:55,label:"AO",sub:"4ch",icon:"📉",color:C.orange2,
      desc:lbl("Sorties analogiques — 4-20mA vannes variateurs","Analog outputs — 4-20mA valves drives","Salidas analogicas — 4-20mA valvulas variadores","Saidas analogicas — 4-20mA valvulas variadores")},
    {id:"com",x:200,y:30,w:36,h:120,label:"COM",sub:"Modbus",icon:"📡",color:C.amber2,
      desc:lbl("Module communication — Modbus Profibus Ethernet","Communication module — Modbus Profibus Ethernet","Modulo comunicacion — Modbus Profibus Ethernet","Modulo comunicacao — Modbus Profibus Ethernet")},
  ];

  const scanLabels = [
    lbl("1. Lecture entrees","1. Read inputs","1. Leer entradas","1. Ler entradas"),
    lbl("2. Execution programme","2. Execute program","2. Ejecutar programa","2. Executar programa"),
    lbl("3. Mise a jour sorties","3. Update outputs","3. Actualizar salidas","3. Atualizar saidas"),
    lbl("4. Communication reseau","4. Network comm.","4. Comunicacion red","4. Comunicacao rede"),
  ];

  const cur = selected ? modules.find(m=>m.id===selected) : null;
  const W=250, H=180;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <defs>
          <pattern id="plcgrid" width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M15 0L0 0 0 15" fill="none" stroke={C.cyan} strokeWidth="0.1" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#plcgrid)" rx="8"/>
        <rect x={8} y={155} width={240} height={5} rx="2" fill={C.steel} opacity="0.6"/>
        <rect x={8} y={15} width={240} height={5} rx="2" fill={C.steel} opacity="0.6"/>
        <rect x={48} y={155} width={200} height={3} rx="1" fill={C.cyan} opacity={scanning?0.7:0.3}/>
        <text x={W/2} y={12} textAnchor="middle" fontSize="7" fill={C.cyan} fontWeight="800" letterSpacing="2">
          {lbl("ARCHITECTURE PLC MARITIME","MARITIME PLC ARCHITECTURE","ARQUITECTURA PLC MARITIMO","ARQUITETURA PLC MARITIMO")}
        </text>
        {modules.map(m=>{
          const active=selected===m.id;
          const scanActive=scanning&&(
            (scanPhase===0&&(m.id==="di"||m.id==="ai"))||
            (scanPhase===1&&m.id==="cpu")||
            (scanPhase===2&&(m.id==="do"||m.id==="ao"))||
            (scanPhase===3&&m.id==="com")
          );
          return (
            <g key={m.id} style={{cursor:"pointer"}} onClick={()=>setSelected(m.id===selected?null:m.id)}>
              <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="5"
                fill={active||scanActive?`${m.color}22`:`${m.color}0a`}
                stroke={active||scanActive?m.color:`${m.color}55`}
                strokeWidth={active||scanActive?2:1}/>
              {scanActive&&(
                <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="5"
                  fill="none" stroke={m.color} strokeWidth="3" opacity="0.2"/>
              )}
              <text x={m.x+m.w/2} y={m.y+m.h/2-8} textAnchor="middle" fontSize="13">{m.icon}</text>
              <text x={m.x+m.w/2} y={m.y+m.h/2+5} textAnchor="middle" fontSize="7.5"
                fill={active||scanActive?m.color:C.steel3} fontWeight="800">{m.label}</text>
              <text x={m.x+m.w/2} y={m.y+m.h/2+16} textAnchor="middle" fontSize="6" fill={C.dim}>{m.sub}</text>
            </g>
          );
        })}
        {scanning&&(
          <g>
            <rect x={8} y={H-16} width={W-16} height={10} rx="3" fill="rgba(0,229,255,0.1)"/>
            <text x={W/2} y={H-8} textAnchor="middle" fontSize="6.5" fill={C.cyan} fontWeight="700">
              {scanLabels[scanPhase]}
            </text>
          </g>
        )}
      </svg>
      {cur&&(
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:13,
          background:`${cur.color}0e`,border:`1px solid ${cur.color}44`}}>
          <div style={{fontSize:12,fontWeight:800,color:cur.color,marginBottom:4}}>
            {cur.icon} {cur.label} — {cur.sub}
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.6}}>{cur.desc}</div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:8}}>
        <button onClick={()=>{setScanning(v=>!v);if(!scanning)setScanPhase(0);}}
          style={{padding:"10px",borderRadius:12,
            background:scanning?"rgba(0,229,255,0.2)":"rgba(0,229,255,0.1)",
            border:`1px solid ${C.cyan}55`,color:scanning?C.cyan:C.muted,
            fontSize:10,fontWeight:800,cursor:"pointer"}}>
          {scanning?lbl("STOP SCAN","STOP SCAN","PARAR SCAN","PARAR SCAN"):lbl("DEMARRER SCAN","START SCAN","INICIAR SCAN","INICIAR SCAN")}
        </button>
        <button onClick={()=>{setSelected(null);setScanning(false);setScanPhase(0);}}
          style={{padding:"10px",borderRadius:12,background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,color:C.muted,fontSize:10,fontWeight:700,cursor:"pointer"}}>
          RESET
        </button>
      </div>
      {!cur&&(
        <div style={{marginTop:6,padding:"7px 10px",borderRadius:9,
          background:"rgba(0,229,255,0.05)",border:`1px solid ${C.cyan}22`,
          fontSize:9,color:C.dim,textAlign:"center"}}>
          {lbl("Taper un module — SCAN simule le cycle PLC","Tap a module — SCAN simulates PLC cycle","Tocar un modulo — SCAN simula el ciclo PLC","Tocar um modulo — SCAN simula o ciclo PLC")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — PLC vs DCS vs SCADA
// ══════════════════════════════════════
function SystemCompSVG({ lang }) {
  const [selected, setSelected] = useState("plc");
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:lang==="pt"?pt:fr;

  const systems = {
    plc:{
      color:C.plc, icon:"⚙️",
      name:lbl("PLC — Automate Programmable","PLC — Programmable Controller","PLC — Automata Programable","PLC — Automato Programavel"),
      use:lbl("Commande locale — machine unique","Local control — single machine","Control local — maquina unica","Controlo local — maquina unica"),
      resp:lbl("Inf. a 10ms temps reel dur","Under 10ms hard real-time","Menos de 10ms tiempo real duro","Menos de 10ms tempo real duro"),
      scale:lbl("1 machine — 16 a 512 E/S","1 machine — 16 to 512 I/O","1 maquina — 16 a 512 E/S","1 maquina — 16 a 512 E/S"),
      marine:lbl("ME, generateur, purificateur","ME, generator, purifier","ME, generador, purificador","ME, gerador, purificador"),
      brands:"Siemens S7, Allen-Bradley, Mitsubishi",
    },
    dcs:{
      color:C.dcs, icon:"🔗",
      name:lbl("DCS — Controle Reparti","DCS — Distributed Control","DCS — Control Distribuido","DCS — Controlo Distribuido"),
      use:lbl("Process continu — multi-machines","Continuous process — multi-machines","Proceso continuo — multi-maquinas","Processo continuo — multi-maquinas"),
      resp:lbl("50 a 500ms temps reel souple","50 to 500ms soft real-time","50 a 500ms tiempo real suave","50 a 500ms tempo real suave"),
      scale:lbl("Usine complete — milliers de points","Complete plant — thousands of points","Planta completa — miles de puntos","Planta completa — milhares de pontos"),
      marine:lbl("Salle des machines VLCC complet","Full VLCC engine room","Sala maquinas VLCC completo","Casa maquinas VLCC completa"),
      brands:"ABB 800xA, Emerson DeltaV, Honeywell",
    },
    scada:{
      color:C.scada, icon:"🖥️",
      name:lbl("SCADA — Supervision","SCADA — Supervisory","SCADA — Supervision","SCADA — Supervisao"),
      use:lbl("Supervision et collecte donnees reseau","Supervision and data collection network","Supervision y recopilacion datos red","Supervisao e recolha dados rede"),
      resp:lbl("1 a 60s supervision non critique","1 to 60s non-critical supervision","1 a 60s supervision no critica","1 a 60s supervisao nao critica"),
      scale:lbl("Multi-sites — flotte de navires","Multi-site — fleet of vessels","Multi-sitio — flota de buques","Multi-site — frota de navios"),
      marine:lbl("Fleet monitoring, maintenance predictive","Fleet monitoring, predictive maintenance","Monitoreo flota, mantenimiento predictivo","Monitorizacao frota, manutencao preditiva"),
      brands:"Kongsberg K-IMS, Wartsila NACOS, ABB EMMA",
    },
  };

  const cur = systems[selected];

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {Object.entries(systems).map(([k,v])=>(
          <button key={k} onClick={()=>setSelected(k)}
            style={{padding:"10px 4px",borderRadius:12,
              background:selected===k?`${v.color}22`:"rgba(13,31,60,0.6)",
              border:`1px solid ${selected===k?v.color:`${v.color}44`}`,
              color:selected===k?v.color:C.muted,
              fontSize:10,fontWeight:800,cursor:"pointer"}}>
            {v.icon} {k.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:14,
        background:`${cur.color}0e`,border:`1px solid ${cur.color}44`}}>
        <div style={{fontSize:12,fontWeight:800,color:cur.color,marginBottom:8}}>
          {cur.icon} {cur.name}
        </div>
        {[
          [lbl("Usage","Usage","Uso","Uso"), cur.use],
          [lbl("Reponse","Response","Respuesta","Resposta"), cur.resp],
          [lbl("Echelle","Scale","Escala","Escala"), cur.scale],
          [lbl("Maritime","Maritime","Maritimo","Maritimo"), cur.marine],
          [lbl("Marques","Brands","Marcas","Marcas"), cur.brands],
        ].map(([k,v],i)=>(
          <div key={i} style={{display:"flex",gap:6,padding:"5px 0",
            borderBottom:i<4?"1px solid rgba(255,255,255,0.05)":"none",fontSize:10}}>
            <span style={{color:cur.color,fontWeight:700,flexShrink:0,minWidth:65}}>{k}:</span>
            <span style={{color:C.steel3,lineHeight:1.5}}>{v}</span>
          </div>
        ))}
      </div>
      {/* Visual comparison bar */}
      <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
        {[
          {label:lbl("Vitesse","Speed","Velocidad","Velocidade"),
            vals:{plc:95,dcs:60,scada:15}},
          {label:lbl("Echelle","Scale","Escala","Escala"),
            vals:{plc:20,dcs:70,scada:100}},
          {label:lbl("Distance","Distance","Distancia","Distancia"),
            vals:{plc:10,dcs:50,scada:100}},
        ].map((bar,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <div style={{fontSize:8,color:C.muted,marginBottom:3}}>{bar.label}</div>
            {Object.entries(bar.vals).map(([k,v])=>(
              <div key={k} style={{marginBottom:2}}>
                <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${v}%`,
                    background:systems[k].color,borderRadius:3,
                    opacity:selected===k?1:0.4,
                    boxShadow:selected===k?`0 0 6px ${systems[k].color}`:"none"}}/>
                </div>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
              {["plc","dcs","scada"].map(k=>(
                <span key={k} style={{fontSize:6,color:systems[k].color,fontWeight:700}}>{k.toUpperCase()}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — PID SIMULATOR
// ══════════════════════════════════════
function PIDSimSVG({ lang }) {
  const [kp, setKp] = useState(1.5);
  const [ki, setKi] = useState(0.3);
  const [kd, setKd] = useState(0.1);
  const [sp, setSp] = useState(60);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:lang==="pt"?pt:fr;

  const simulate = () => {
    const pts = [];
    let pv=20, integral=0, prevErr=0;
    for (let t=0;t<=40;t++) {
      const err=sp-pv;
      integral+=err*0.5;
      const deriv=(err-prevErr)/0.5;
      const out=Math.min(100,Math.max(0,kp*err+ki*integral+kd*deriv));
      pv=pv+out*0.03-(pv-20)*0.02;
      prevErr=err;
      pts.push({t,pv:Math.min(100,Math.max(0,pv))});
    }
    return pts;
  };

  const pts=simulate();
  const W=270, H=130;
  const gX=35, gY=10, gW=220, gH=90;
  const toX=(t)=>gX+(t/40)*gW;
  const toY=(v)=>gY+gH-(v/100)*gH;
  const pathD=pts.map((p,i)=>`${i===0?"M":"L"}${toX(p.t).toFixed(1)},${toY(p.pv).toFixed(1)}`).join(" ");
  const spY=toY(sp);
  const maxPv=Math.max(...pts.map(p=>p.pv));
  const overshoot=Math.max(0,maxPv-sp).toFixed(1);
  const settled=pts.filter(p=>Math.abs(p.pv-sp)<2).length>5;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <line x1={gX} y1={gY} x2={gX} y2={gY+gH} stroke={C.steel} strokeWidth="1.2"/>
        <line x1={gX} y1={gY+gH} x2={gX+gW} y2={gY+gH} stroke={C.steel} strokeWidth="1.2"/>
        {[0,25,50,75,100].map(v=>(
          <g key={v}>
            <line x1={gX-3} y1={toY(v)} x2={gX} y2={toY(v)} stroke={C.steel} strokeWidth="0.8"/>
            <text x={gX-5} y={toY(v)+3} textAnchor="end" fontSize="6" fill={C.dim}>{v}</text>
          </g>
        ))}
        {[0,10,20,30,40].map(t=>(
          <text key={t} x={toX(t)} y={gY+gH+9} textAnchor="middle" fontSize="6" fill={C.dim}>{t}s</text>
        ))}
        <line x1={gX} y1={spY} x2={gX+gW} y2={spY}
          stroke={C.amber} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.8"/>
        <text x={gX+gW+2} y={spY+3} fontSize="6.5" fill={C.amber} fontWeight="700">SP={sp}</text>
        <path d={pathD} fill="none" stroke={C.cyan} strokeWidth="2.5" strokeLinejoin="round"/>
        <rect x={gX+gW-70} y={gY+2} width={72} height={22} rx="4" fill="rgba(0,0,0,0.5)"/>
        <text x={gX+gW-34} y={gY+11} textAnchor="middle" fontSize="6" fill={settled?C.green:C.amber}>
          {settled?lbl("Stable","Stable","Estable","Estavel"):lbl("En reg.","Regulating","Regulando","Regulando")}
        </text>
        <text x={gX+gW-34} y={gY+20} textAnchor="middle" fontSize="6" fill={parseFloat(overshoot)>5?C.red:C.muted}>
          {lbl("Dep:","Ovsh:","Sobre:","Sobre:")} {overshoot}%
        </text>
        <text x={gX-22} y={gY+gH/2} textAnchor="middle" fontSize="6" fill={C.muted}
          transform={`rotate(-90,${gX-22},${gY+gH/2})`}>%</text>
      </svg>
      <div style={{marginTop:8}}>
        {[
          {label:`Kp: ${kp.toFixed(1)}`,val:kp,set:setKp,min:0.1,max:5,step:0.1,color:C.cyan,
            desc:lbl("Gain proportionnel","Proportional gain","Ganancia proporcional","Ganho proporcional")},
          {label:`Ki: ${ki.toFixed(2)}`,val:ki,set:setKi,min:0,max:2,step:0.05,color:C.amber,
            desc:lbl("Gain integral","Integral gain","Ganancia integral","Ganho integral")},
          {label:`Kd: ${kd.toFixed(2)}`,val:kd,set:setKd,min:0,max:1,step:0.02,color:C.green,
            desc:lbl("Gain derive","Derivative gain","Ganancia derivada","Ganho derivado")},
          {label:`SP: ${sp}`,val:sp,set:setSp,min:20,max:90,step:5,color:C.purple2,
            desc:lbl("Consigne","Setpoint","Consigna","Consigna")},
        ].map((s,i)=>(
          <div key={i} style={{marginBottom:7}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
              <span style={{fontSize:9,color:s.color,fontWeight:700}}>{s.label}</span>
              <span style={{fontSize:8,color:C.dim}}>{s.desc}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e=>s.set(Number(e.target.value))}
              style={{width:"100%",accentColor:s.color}}/>
          </div>
        ))}
      </div>
      <div style={{padding:"7px 10px",borderRadius:9,
        background:settled?"rgba(0,230,118,0.07)":"rgba(255,179,0,0.07)",
        border:`1px solid ${settled?C.green:C.amber}33`,
        fontSize:10,color:settled?C.green:C.amber,textAlign:"center",marginTop:4}}>
        {settled
          ? lbl("Systeme stable — regulation efficace","Stable system — efficient control","Sistema estable — regulacion eficiente","Sistema estavel — regulacao eficiente")
          : lbl("Ajuster Kp Ki Kd pour stabiliser","Adjust Kp Ki Kd to stabilize","Ajustar Kp Ki Kd para estabilizar","Ajustar Kp Ki Kd para estabilizar")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SCADA MIMIC
// ══════════════════════════════════════
function SCADAMimicSVG({ lang }) {
  const [states, setStates] = useState({p1:true,p2:false,v1:true,v2:false,alarm:false});
  const [tick, setTick] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:lang==="pt"?pt:fr;

  useEffect(()=>{
    const id=setInterval(()=>setTick(t=>t+1),500);
    return ()=>clearInterval(id);
  },[]);

  const toggle=(key)=>setStates(s=>({...s,[key]:!s[key]}));
  const blink=tick%2===0;
  const tankFill=states.p1&&states.v1?65:states.p1?45:30;
  const W=280, H=185;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <defs>
          <pattern id="scadagrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0L0 0 0 20" fill="none" stroke={C.scada} strokeWidth="0.08" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#scadagrid)" rx="8"/>
        <rect x={0} y={0} width={W} height={16} fill="rgba(0,230,118,0.08)" rx="8"/>
        <text x={W/2} y={11} textAnchor="middle" fontSize="7" fill={C.scada} fontWeight="800" letterSpacing="1.5">
          SCADA — {lbl("SYNOPTIQUE SM","ER MIMIC","SINOPTICO SM","SINOPTICO SM")}
        </text>
        {/* Pipes */}
        <line x1={60} y1={80} x2={140} y2={80} stroke={states.p1?"#26c6da":C.steel} strokeWidth="3" strokeLinecap="round"/>
        <line x1={140} y1={80} x2={140} y2={120} stroke={states.p1&&states.v1?"#26c6da":C.steel} strokeWidth="3" strokeLinecap="round"/>
        <line x1={140} y1={120} x2={200} y2={120} stroke={states.p1&&states.v1?"#26c6da":C.steel} strokeWidth="3" strokeLinecap="round"/>
        <line x1={80} y1={140} x2={140} y2={140} stroke={states.p2?"#26c6da":C.steel} strokeWidth="2" strokeDasharray="4,2"/>
        {/* Tank */}
        <rect x={198} y={95} width={50} height={60} rx="4" fill="rgba(13,31,60,0.7)" stroke={C.scada} strokeWidth="1.5"/>
        <rect x={200} y={95+60*(1-tankFill/100)} width={46} height={60*tankFill/100} rx="3"
          fill="#26c6da" opacity="0.35"/>
        <text x={223} y={130} textAnchor="middle" fontSize="8" fill={C.scada} fontWeight="700">TANK</text>
        <text x={223} y={142} textAnchor="middle" fontSize="7" fill={C.scada}>{tankFill}%</text>
        {/* P1 */}
        <g style={{cursor:"pointer"}} onClick={()=>toggle("p1")}>
          <circle cx={40} cy={80} r={16} fill={states.p1?`${C.scada}22`:"rgba(13,31,60,0.7)"}
            stroke={states.p1?C.scada:C.steel} strokeWidth="1.5"/>
          <text x={40} y={77} textAnchor="middle" fontSize="11">{states.p1?"🔄":"⏸"}</text>
          <text x={40} y={90} textAnchor="middle" fontSize="6" fill={states.p1?C.scada:C.muted}>P1</text>
        </g>
        {/* P2 */}
        <g style={{cursor:"pointer"}} onClick={()=>toggle("p2")}>
          <circle cx={60} cy={140} r={14} fill={states.p2?`${C.scada}22`:"rgba(13,31,60,0.7)"}
            stroke={states.p2?C.scada:C.steel} strokeWidth="1.5"/>
          <text x={60} y={137} textAnchor="middle" fontSize="10">{states.p2?"🔄":"⏸"}</text>
          <text x={60} y={149} textAnchor="middle" fontSize="6" fill={states.p2?C.scada:C.muted}>P2</text>
        </g>
        {/* V1 */}
        <g style={{cursor:"pointer"}} onClick={()=>toggle("v1")}>
          <polygon points={`${140},70 ${152},80 ${140},90 ${128},80`}
            fill={states.v1?`${C.amber}22`:"rgba(13,31,60,0.7)"}
            stroke={states.v1?C.amber:C.steel} strokeWidth="1.5"/>
          <text x={140} y={84} textAnchor="middle" fontSize="6" fill={states.v1?C.amber:C.muted}>V1</text>
        </g>
        {/* V2 */}
        <g style={{cursor:"pointer"}} onClick={()=>toggle("v2")}>
          <polygon points={`${110},130 ${122},138 ${110},146 ${98},138`}
            fill={states.v2?`${C.amber}22`:"rgba(13,31,60,0.7)"}
            stroke={states.v2?C.amber:C.steel} strokeWidth="1.2"/>
          <text x={110} y={142} textAnchor="middle" fontSize="5.5" fill={states.v2?C.amber:C.muted}>V2</text>
        </g>
        {/* Flow dot */}
        {states.p1&&(
          <circle cx={100} cy={80} r={3} fill={C.scada} opacity={blink?0.9:0.3}/>
        )}
        {/* Alarm */}
        {states.alarm&&(
          <g>
            <rect x={8} y={H-20} width={W-16} height={14} rx="3"
              fill={blink?"rgba(255,23,68,0.2)":"rgba(255,23,68,0.08)"}
              stroke={C.red} strokeWidth="0.8"/>
            <text x={W/2} y={H-10} textAnchor="middle" fontSize="7" fill={C.red} fontWeight="800">
              {lbl("ALARME — NIVEAU BAS","ALARM — LOW LEVEL","ALARMA — NIVEL BAJO","ALARME — NIVEL BAIXO")}
            </text>
          </g>
        )}
        {!states.alarm&&(
          <g>
            <rect x={8} y={H-18} width={W-16} height={12} rx="3" fill="rgba(0,0,0,0.3)"/>
            <text x={W/2} y={H-9} textAnchor="middle" fontSize="6.5" fill={C.scada}>
              P1:{states.p1?"ON":"OFF"} | P2:{states.p2?"ON":"OFF"} | V1:{states.v1?"OPEN":"SHUT"} | V2:{states.v2?"OPEN":"SHUT"}
            </text>
          </g>
        )}
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8}}>
        <div style={{fontSize:9,color:C.muted,padding:"6px 8px",borderRadius:8,
          background:"rgba(0,0,0,0.3)",lineHeight:1.6}}>
          {lbl("Taper pompes et vannes pour commander","Tap pumps and valves to control","Tocar bombas y valvulas","Tocar bombas e valvulas")}
        </div>
        <button onClick={()=>setStates(s=>({...s,alarm:!s.alarm}))}
          style={{padding:"8px",borderRadius:11,
            background:states.alarm?"rgba(255,23,68,0.2)":"rgba(255,23,68,0.1)",
            border:`1px solid ${C.red}55`,color:C.red,fontSize:10,fontWeight:800,cursor:"pointer"}}>
          {states.alarm?lbl("ACK ALARME","ACK ALARM","ACK ALARMA","ACK ALARME"):lbl("SIMULER ALARME","SIMULATE ALARM","SIMULAR ALARMA","SIMULAR ALARME")}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MV EL FARO (2015)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MV El Faro — Atlantique (2015)",
      teaser:"RORO 735 EVP — Ouragan Joaquin — 33 morts — Alertes SCADA ignorees — Pire naufrage US depuis 1983",
      what:"Le 1er octobre 2015, le cargo roulier americain El Faro sombre dans l'Atlantique au coeur de l'ouragan Joaquin. Le systeme electronique de gestion machines signale des alertes repetes : pompe de sentine suspecte, pression huile moteur en baisse, alarmes de stabilite. Ces alertes sont reconnues mais aucune action corrective n'est prise. Le capitaine maintient le cap malgre les alertes meteo. 33 membres d'equipage disparaissent. Le VDR enregistre les conversations de passerelle jusqu'au dernier moment.",
      cause:"- Alertes systeme controle machines ignorees repetitivement\n- Capitaine maintenant cap direct malgre ouragan en route\n- Culture de bord : equipage n'ose pas contester le capitaine\n- Navire vieillissant 1975 avec systemes automatises partiels defaillants\n- SMS non respecte — procedures contournees\n- Absence de feedback entre systeme SCADA et decision navigatrice",
      lessons:"- Les alertes PLC/SCADA ne sont pas optionnelles\n- Un systeme d'alarme ignore est plus dangereux qu'un systeme absent\n- ISM Code : remontee obligatoire alertes systeme au Master\n- Formation : officiers doivent comprendre les donnees SCADA\n- VDR obligatoire tous navires > 3 000 GT depuis 2002\n- SOLAS : renforcement exigences alarmes machines depuis 2016",
      link:"Lien L2 PLC/SCADA : El Faro illustre la consequence fatale d'alertes systemes de controle ignorees. Un PLC ou SCADA maritime qui detecte une anomalie doit declencher une chaine d'action irreversible. Le systeme de controle-commande est un systeme de securite — pas un outil de confort.",
    },
    en:{
      title:"MV El Faro — Atlantic Ocean (2015)",
      teaser:"RORO 735 TEU — Hurricane Joaquin — 33 deaths — SCADA alerts ignored — Worst US disaster since 1983",
      what:"On October 1, 2015, US cargo vessel El Faro sank in the Atlantic in the heart of Hurricane Joaquin. The engine electronic management system signaled repeated alerts: suspect bilge pump, falling engine oil pressure, stability alarms. These alerts were acknowledged but no corrective action was taken. The captain maintained course despite weather warnings. 33 crew members disappeared. The VDR recorded bridge conversations until the very end.",
      cause:"- Engine control system alerts repeatedly ignored\n- Captain maintaining direct course despite hurricane en route\n- Ship culture: crew unwilling to challenge captain\n- Aging 1975 vessel with partially failing automated systems\n- SMS not followed — procedures bypassed\n- No feedback loop between SCADA system and navigational decisions",
      lessons:"- PLC/SCADA alerts are not optional\n- An ignored alarm system is more dangerous than no system\n- ISM Code: mandatory escalation of system alerts to Master\n- Training: officers must understand SCADA data\n- VDR mandatory all vessels > 3,000 GT since 2002\n- SOLAS: strengthened machinery alarm requirements since 2016",
      link:"L2 PLC/SCADA Link: El Faro illustrates the fatal consequence of ignored control system alerts. A marine PLC or SCADA detecting an anomaly must trigger an irreversible action chain. The control system is a safety system, not a comfort tool.",
    },
    es:{
      title:"MV El Faro — Oceano Atlantico (2015)",
      teaser:"RORO 735 TEU — Huracan Joaquin — 33 muertos — Alertas SCADA ignoradas — Peor desastre US desde 1983",
      what:"El 1 de octubre de 2015, el buque de carga El Faro se hundio en el Atlantico en el centro del huracan Joaquin. El sistema de gestion electronica de maquinas senalo alertas repetidas: bomba de sentina sospechosa, presion aceite motor en descenso, alarmas de estabilidad. Estas alertas fueron reconocidas pero no se tomo ninguna accion correctora. El capitan mantuvo el rumbo pese a las alertas meteorologicas. 33 tripulantes desaparecieron.",
      cause:"- Alertas sistema control maquinas ignoradas repetidamente\n- Capitan manteniendo rumbo directo pese al huracan\n- Cultura a bordo: tripulacion no contradice al capitan\n- Buque envejecido 1975 con sistemas automatizados deficientes\n- SMS no respetado — procedimientos omitidos",
      lessons:"- Las alertas PLC/SCADA no son opcionales\n- Un sistema de alarma ignorado es mas peligroso que ninguno\n- Codigo ISM: escalado obligatorio de alertas al Capitan\n- Formacion: oficiales deben comprender datos SCADA\n- VDR obligatorio buques > 3.000 GT desde 2002",
      link:"Vinculo L2 PLC/SCADA: El Faro ilustra la consecuencia fatal de alertas de sistemas de control ignoradas. Un PLC o SCADA maritimo que detecta una anomalia debe desencadenar una cadena de accion irreversible.",
    },
    pt:{
      title:"MV El Faro — Oceano Atlantico (2015)",
      teaser:"RORO 735 TEU — Furacao Joaquin — 33 mortos — Alertas SCADA ignorados — Pior desastre US desde 1983",
      what:"A 1 de outubro de 2015, o navio El Faro naufragou no Atlantico no centro do furacao Joaquin. O sistema de gestao eletronica das maquinas sinalizou alertas repetidos: bomba de porao suspeita, pressao de oleo do motor em queda, alarmes de estabilidade. Estes alertas foram reconhecidos mas nenhuma acao corretiva foi tomada. O capitao manteve o rumo apesar dos alertas meteorologicos. 33 tripulantes desapareceram.",
      cause:"- Alertas sistema controlo maquinas ignorados repetidamente\n- Capitao mantendo rumo direto apesar do furacao\n- Cultura a bordo: tripulacao nao contradiz o capitao\n- Navio envelhecido 1975 com sistemas automatizados deficientes\n- SMS nao respeitado — procedimentos contornados",
      lessons:"- Os alertas PLC/SCADA nao sao opcionais\n- Um sistema de alarme ignorado e mais perigoso do que nenhum\n- Codigo ISM: escalada obrigatoria de alertas ao Capitao\n- Formacao: oficiais devem compreender dados SCADA\n- VDR obrigatorio navios > 3.000 GT desde 2002",
      link:"Vinculo L2 PLC/SCADA: El Faro ilustra a consequencia fatal de alertas de sistemas de controlo ignorados. Um PLC ou SCADA maritimo que deteta uma anomalia deve desencadear uma cadeia de acao irreversivel.",
    },
  };
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}50`,
      borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:C.red2,marginBottom:2,
              fontFamily:"'Cinzel',serif"}}>{c.title}</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:16,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&(
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
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const qs={
    fr:[
      {id:"q1",q:"Que signifie l'acronyme PLC ?\n(Repondre en anglais)"},
      {id:"q2",q:"Quel est le temps de reponse typique d'un PLC en controle machine ?\n(Repondre en ms)"},
      {id:"q3",q:"Dans une boucle PID, que represente la lettre I ?\n(Repondre en un mot)"},
      {id:"q4",q:"Quel systeme est utilise pour la supervision multi-navires a distance ?\n(Repondre : PLC, DCS ou SCADA)"},
      {id:"q5",q:"Le MV El Faro a coule parce que les alertes systeme ont ete :\n(Repondre : ignorees, mal configurees ou absentes)"},
    ],
    en:[
      {id:"q1",q:"What does the acronym PLC stand for?\n(Answer in English)"},
      {id:"q2",q:"What is the typical response time of a PLC in machine control?\n(Answer in ms)"},
      {id:"q3",q:"In a PID loop, what does the letter I represent?\n(Answer in one word)"},
      {id:"q4",q:"Which system is used for remote multi-vessel supervision?\n(Answer: PLC, DCS or SCADA)"},
      {id:"q5",q:"MV El Faro sank because system alerts were:\n(Answer: ignored, misconfigured or absent)"},
    ],
    es:[
      {id:"q1",q:"?Que significa el acronimo PLC?\n(Responder en ingles)"},
      {id:"q2",q:"?Cual es el tiempo de respuesta tipico de un PLC en control de maquina?\n(Responder en ms)"},
      {id:"q3",q:"En una boucle PID, ?que representa la letra I?\n(Responder en una palabra)"},
      {id:"q4",q:"?Que sistema se usa para supervision multi-buque a distancia?\n(Responder: PLC, DCS o SCADA)"},
      {id:"q5",q:"El MV El Faro se hundio porque las alertas sistema fueron:\n(Responder: ignoradas, mal configuradas o ausentes)"},
    ],
    pt:[
      {id:"q1",q:"O que significa a sigla PLC?\n(Responder em ingles)"},
      {id:"q2",q:"Qual e o tempo de resposta tipico de um PLC em controlo de maquina?\n(Responder em ms)"},
      {id:"q3",q:"Numa boucle PID, o que representa a letra I?\n(Responder numa palavra)"},
      {id:"q4",q:"Que sistema e usado para supervisao multi-navio a distancia?\n(Responder: PLC, DCS ou SCADA)"},
      {id:"q5",q:"O MV El Faro naufragou porque os alertas sistema foram:\n(Responder: ignorados, mal configurados ou ausentes)"},
    ],
  };
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/\s/g,"");
    if(id==="q1") return v.includes("programmable")&&v.includes("logic");
    if(id==="q2") return v.includes("10")||v==="<10"||v==="10ms";
    if(id==="q3") return v.includes("integral")||v.includes("integrale")||v.includes("integradora");
    if(id==="q4") return v.includes("scada");
    if(id==="q5") return v.includes("ignor");
    return false;
  };
  const corrKey={
    fr:{q1:"Programmable Logic Controller",q2:"Inf. a 10ms",q3:"Integral",q4:"SCADA",q5:"Ignorees"},
    en:{q1:"Programmable Logic Controller",q2:"Under 10ms",q3:"Integral",q4:"SCADA",q5:"Ignored"},
    es:{q1:"Programmable Logic Controller",q2:"Menos de 10ms",q3:"Integral",q4:"SCADA",q5:"Ignoradas"},
    pt:{q1:"Programmable Logic Controller",q2:"Menos de 10ms",q3:"Integral",q4:"SCADA",q5:"Ignorados"},
  };
  const expl={
    fr:"OK Q1: PLC = Programmable Logic Controller (Automate Programmable Industriel)\nOK Q2: Inf. a 10ms — temps reel dur pour controle machine critique\nOK Q3: Integral — corrige l'erreur persistante dite erreur statique\nOK Q4: SCADA — Supervisory Control And Data Acquisition — supervision flotte\nOK Q5: Ignorees — alertes PLC/SCADA reconnues mais sans action corrective => 33 morts",
    en:"OK Q1: PLC = Programmable Logic Controller\nOK Q2: Under 10ms — hard real-time for critical machine control\nOK Q3: Integral — corrects persistent steady-state error\nOK Q4: SCADA — Supervisory Control And Data Acquisition — fleet supervision\nOK Q5: Ignored — PLC/SCADA alerts acknowledged but no corrective action => 33 deaths",
    es:"OK Q1: PLC = Programmable Logic Controller\nOK Q2: Menos de 10ms — tiempo real duro para control critico\nOK Q3: Integral — corrige el error persistente\nOK Q4: SCADA — Supervisory Control And Data Acquisition\nOK Q5: Ignoradas — alertas reconocidas sin accion correctora => 33 muertos",
    pt:"OK Q1: PLC = Programmable Logic Controller\nOK Q2: Menos de 10ms — tempo real duro para controlo critico\nOK Q3: Integral — corrige o erro persistente\nOK Q4: SCADA — Supervisory Control And Data Acquisition\nOK Q5: Ignorados — alertas reconhecidos sem acao corretiva => 33 mortos",
  };
  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;
  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(0,229,255,0.06)",border:`1px solid ${C.cyan}33`,
        fontSize:11,color:C.cyan2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: PLC=Logic Controller | 10ms | I=Integral | SCADA=supervision | El Faro=ignorees"
        :lang==="en"?"Key: PLC=Logic Controller | 10ms | I=Integral | SCADA=supervision | El Faro=ignored"
        :lang==="es"?"Clave: PLC=Logic Controller | 10ms | I=Integral | SCADA=supervision | El Faro=ignoradas"
        :"Chave: PLC=Logic Controller | 10ms | I=Integral | SCADA=supervisao | El Faro=ignorados"}
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
          {showC&&(
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
      {showC&&(
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
// TROPHY HELPER
// ══════════════════════════════════════
function getTrophy(score, total) {
  const pct=score/total;
  if(pct===1)  return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",   en:"Perfect!",    es:"Perfecto!",  pt:"Perfeito!"}};
  if(pct>=0.8) return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !", en:"Excellent!",  es:"Excelente!", pt:"Excelente!"}};
  if(pct>=0.6) return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",      en:"Well done!",  es:"Bien!",      pt:"Bem feito!"}};
  if(pct>=0.4) return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",  en:"Keep going!", es:"Sigue!",     pt:"Continue!"}};
  return             {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [started,setStarted]=useState(false);
  const lbl=(fr,en,es,pt)=>lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const qs={
    fr:[
      {q:"Que signifie PLC dans le domaine de l'automatisme industriel ?",
        opts:["Power Line Controller","Programmable Logic Controller","Process Level Control","Peripheral Logic Computer"],
        ans:1,expl:"PLC = Programmable Logic Controller (Automate Programmable Industriel en francais). C'est le composant fondamental du controle-commande industriel, present sur tous les navires modernes pour controler les machines principales, generateurs, purificateurs et systemes auxiliaires."},
      {q:"Quelle est la difference fondamentale entre un PLC et un DCS ?",
        opts:["Le PLC est plus recent","PLC = controle local une machine, DCS = controle reparti multi-process","DCS est plus rapide","PLC est plus cher"],
        ans:1,expl:"PLC (Programmable Logic Controller) : controle local d'une machine unique avec temps reel dur (< 10ms). DCS (Distributed Control System) : controle reparti sur l'ensemble d'un process industriel (salle des machines VLCC) avec temps reel souple (50-500ms) et architecture redondante."},
      {q:"Que signifie SCADA ?",
        opts:["System Control And Data Analysis","Supervisory Control And Data Acquisition","Safety Control And Data Access","Systematic Control And Device Alert"],
        ans:1,expl:"SCADA = Supervisory Control And Data Acquisition. C'est le niveau superieur de la pyramide automatisme : supervision a distance, collecte de donnees, historisation, gestion d'alarmes. En maritime : Kongsberg K-IMS, Wartsila NACOS, ABB EMMA supervisant les performances de la flotte."},
      {q:"Dans un cycle SCAN PLC, quelle est la sequence correcte ?",
        opts:["Sorties -> Programme -> Entrees -> Com","Entrees -> Programme -> Sorties -> Communication","Programme -> Entrees -> Com -> Sorties","Com -> Sorties -> Programme -> Entrees"],
        ans:1,expl:"Le cycle SCAN PLC suit toujours la sequence : 1) Lecture des entrees (capteurs), 2) Execution du programme utilisateur, 3) Mise a jour des sorties (actionneurs), 4) Communication reseau. Ce cycle se repete typiquement en moins de 10ms pour les machines critiques."},
      {q:"Quelle est la plage de signal standard pour les entrees/sorties analogiques d'un PLC maritime ?",
        opts:["0-5V","0-10V","4-20mA","0-1A"],
        ans:2,expl:"4-20mA est le standard industriel universel pour les signaux analogiques. L'avantage majeur : le courant de repos est 4mA (jamais 0), ce qui permet de detecter une rupture de cable (signal tombe a 0mA = panne). 4mA = valeur min (0%), 20mA = valeur max (100%)."},
      {q:"Le MV El Faro (2015) a ete perdu principalement a cause de :",
        opts:["Une panne complete du systeme PLC","Des alertes systeme SCADA ignorees par le commandement","Un court-circuit du tableau electrique","Une defaillance du gouvernail"],
        ans:1,expl:"Le MV El Faro a coule car les alertes du systeme electronique de gestion machines (pression huile basse, pompe sentine, stabilite) ont ete repetitivement ignorees par le commandement. Le capitaine a maintenu le cap vers l'ouragan Joaquin. 33 morts. Les alertes SCADA/PLC sont des signaux de securite obligatoires."},
      {q:"Dans une boucle de regulation PID, que corrige l'action Integrale (I) ?",
        opts:["Les oscillations rapides","L'erreur statique persistante entre la valeur mesuree et la consigne","Les perturbations exterieures imprevisibles","La vitesse de montee"],
        ans:1,expl:"L'action Integrale (I) corrige l'erreur statique (ecart residuel entre PV et SP apres stabilisation). P seul laisse toujours un ecart residuel. I accumule l'erreur dans le temps et augmente la sortie jusqu'a eliminer l'ecart. Risque : trop de I = oscillations (windup)."},
      {q:"Quelle est la difference entre une entree DI et une entree AI dans un PLC ?",
        opts:["DI = analogique, AI = digital","DI = Digital Input (TOR ON/OFF), AI = Analog Input (valeur continue 4-20mA)","DI = plus rapide","AI = moins fiable"],
        ans:1,expl:"DI (Digital Input) : signal logique 0 ou 1 (ex: vanne ouverte/fermee, moteur en marche/arret). AI (Analog Input) : signal continu 4-20mA representant une valeur physique (temperature, pression, niveau). Les capteurs maritimes envoient majoritairement des signaux AI."},
      {q:"Quel protocole de communication est le plus utilise dans les systemes PLC maritimes ?",
        opts:["USB","Modbus RTU/TCP","Bluetooth","RS-232 serie"],
        ans:1,expl:"Modbus RTU (serie) et Modbus TCP (Ethernet) sont les protocoles les plus repandus dans les systemes maritimes. Simples, robustes, ouverts et standardises depuis 1979 (Modicon). Autres protocoles utilisés en maritime : Profibus, Profinet, NMEA 2000, CANopen."},
      {q:"Dans la pyramide d'automatisme, quel niveau represente le DCS ?",
        opts:["Niveau 0 : terrain (capteurs)","Niveau 1 : commande locale (PLC)","Niveau 2 : controle de process (DCS)","Niveau 3 : supervision (SCADA)"],
        ans:2,expl:"La pyramide d'automatisme (ISA-95) : Niveau 0 = terrain (capteurs/actionneurs), Niveau 1 = commande locale (PLC), Niveau 2 = controle de process (DCS), Niveau 3 = supervision et historisation (SCADA/MES), Niveau 4 = ERP/gestion enterprise. Le DCS est au niveau 2, entre PLC et SCADA."},
      {q:"Qu'est-ce que la redondance dans un DCS maritime ?",
        opts:["Deux programmes identiques","Duplication de composants critiques (CPU, alimentation, reseau) pour continuite de service","Deux operateurs au poste","Deux navires de secours"],
        ans:1,expl:"La redondance DCS = duplication des composants critiques : CPU redondante (Active/Standby), alimentation redondante (deux sources), reseau redondant (dual bus). Si un composant tombe en panne, le systeme bascule automatiquement sur le doublon sans interruption du controle. Obligatoire pour les systemes critiques VLCC."},
      {q:"Quel est le role du OPC (OLE for Process Control) dans les systemes SCADA maritimes ?",
        opts:["Un protocole de securite physique","Un standard d'interoperabilite permettant a differents systemes de communiquer","Un type de capteur pression","Un systeme de sauvegarde"],
        ans:1,expl:"OPC (OLE for Process Control, maintenant OPC-UA) est un standard d'interoperabilite qui permet a des systemes heterogenes (PLC Siemens + DCS ABB + SCADA Kongsberg) de communiquer et echanger des donnees. Essentiel pour l'integration des systemes a bord d'un navire moderne avec equipements de marques differentes."},
      {q:"Qu'est-ce que le 'temps de cycle' d'un PLC ?",
        opts:["Le temps de maintenance annuel","Le temps pour executer un cycle SCAN complet (lecture entrees, programme, sorties)","La duree de vie du PLC","Le temps de demarrage"],
        ans:1,expl:"Le temps de cycle PLC = temps pour completer un cycle SCAN : lecture entrees + execution programme + mise a jour sorties + communication. Pour les machines critiques : 5-10ms. Pour les process non critiques : 50-200ms. Un temps de cycle trop long = risque de ne pas detecter une anomalie rapide (ex: surtension)."},
      {q:"Quelle est la principale difference entre Profibus et Profinet ?",
        opts:["Profibus est plus recent","Profibus = bus serie RS-485, Profinet = Ethernet industriel","Profinet est plus lent","Profibus supporte plus de noeuds"],
        ans:1,expl:"Profibus (Process Field Bus) : communication serie RS-485, jusqu'a 12Mbps, max 125 noeuds. Profinet : version Ethernet industriel (100Mbps ou 1Gbps), supports TCP/IP, temps reel garanti. Les nouveaux navires migrent vers Profinet/Ethernet IP pour les debit eleves et l'integration IoT maritime."},
      {q:"Pourquoi un systeme PLC maritime utilise-t-il des blocs fonctionnels certifies (ex: IEC 61511) ?",
        opts:["Pour reduire les couts","Pour garantir la securite fonctionnelle (SIL) des fonctions de sauvegarde critiques","Pour faciliter la maintenance","Pour augmenter la vitesse de traitement"],
        ans:1,expl:"IEC 61511 (Safety Instrumented Systems) definit les niveaux SIL (Safety Integrity Level) 1 a 4. Les fonctions de sauvegarde critiques (arret urgence ME, fermeture vannes HFO, alarmes incendie) doivent etre implementees dans des blocs certifies SIL. Sur VLCC : SIL 2 minimum pour les systemes lies a la propulsion et la securite cargo."},
    ],
    en:[
      {q:"What does PLC stand for in industrial automation?",
        opts:["Power Line Controller","Programmable Logic Controller","Process Level Control","Peripheral Logic Computer"],
        ans:1,expl:"PLC = Programmable Logic Controller. It is the fundamental component of industrial control systems, present on all modern vessels to control main engines, generators, purifiers and auxiliary systems."},
      {q:"What is the fundamental difference between a PLC and a DCS?",
        opts:["PLC is newer","PLC = local control single machine, DCS = distributed multi-process control","DCS is faster","PLC is more expensive"],
        ans:1,expl:"PLC: local control of a single machine with hard real-time (< 10ms). DCS (Distributed Control System): distributed control across an entire industrial process (VLCC engine room) with soft real-time (50-500ms) and redundant architecture."},
      {q:"What does SCADA stand for?",
        opts:["System Control And Data Analysis","Supervisory Control And Data Acquisition","Safety Control And Data Access","Systematic Control And Device Alert"],
        ans:1,expl:"SCADA = Supervisory Control And Data Acquisition. It is the top level of the automation pyramid: remote supervision, data collection, historization, alarm management. Maritime examples: Kongsberg K-IMS, Wartsila NACOS, ABB EMMA supervising fleet performance."},
      {q:"In a PLC SCAN cycle, what is the correct sequence?",
        opts:["Outputs -> Program -> Inputs -> Com","Inputs -> Program -> Outputs -> Communication","Program -> Inputs -> Com -> Outputs","Com -> Outputs -> Program -> Inputs"],
        ans:1,expl:"The PLC SCAN cycle always follows: 1) Read inputs (sensors), 2) Execute user program, 3) Update outputs (actuators), 4) Network communication. This cycle repeats typically in under 10ms for critical machinery."},
      {q:"What is the standard signal range for analog I/O in a maritime PLC?",
        opts:["0-5V","0-10V","4-20mA","0-1A"],
        ans:2,expl:"4-20mA is the universal industrial standard for analog signals. Key advantage: idle current is 4mA (never 0), allowing cable break detection (signal drops to 0mA = fault). 4mA = min value (0%), 20mA = max value (100%)."},
      {q:"MV El Faro (2015) was lost primarily because of:",
        opts:["Complete PLC system failure","SCADA system alerts ignored by command","Electrical panel short circuit","Rudder failure"],
        ans:1,expl:"MV El Faro sank because engine management system alerts (low oil pressure, bilge pump, stability) were repeatedly ignored by command. The captain maintained course toward Hurricane Joaquin. 33 deaths. SCADA/PLC alerts are mandatory safety signals."},
      {q:"In a PID control loop, what does the Integral (I) action correct?",
        opts:["Rapid oscillations","Persistent steady-state error between measured value and setpoint","Unpredictable external disturbances","Rise time"],
        ans:1,expl:"The Integral (I) action corrects steady-state error (residual gap between PV and SP after stabilization). P alone always leaves residual error. I accumulates error over time and increases output until the gap is eliminated. Risk: too much I = oscillations (windup)."},
      {q:"What is the difference between DI and AI inputs in a PLC?",
        opts:["DI = analog, AI = digital","DI = Digital Input (ON/OFF), AI = Analog Input (continuous 4-20mA)","DI is faster","AI is less reliable"],
        ans:1,expl:"DI (Digital Input): logic signal 0 or 1 (e.g. valve open/closed, motor running/stopped). AI (Analog Input): continuous 4-20mA signal representing a physical value (temperature, pressure, level). Maritime sensors mostly send AI signals."},
      {q:"Which communication protocol is most used in maritime PLC systems?",
        opts:["USB","Modbus RTU/TCP","Bluetooth","RS-232 serial"],
        ans:1,expl:"Modbus RTU (serial) and Modbus TCP (Ethernet) are the most widely used protocols in maritime systems. Simple, robust, open and standardized since 1979 (Modicon). Other maritime protocols: Profibus, Profinet, NMEA 2000, CANopen."},
      {q:"In the automation pyramid, which level does DCS represent?",
        opts:["Level 0: field (sensors)","Level 1: local control (PLC)","Level 2: process control (DCS)","Level 3: supervision (SCADA)"],
        ans:2,expl:"ISA-95 automation pyramid: Level 0 = field (sensors/actuators), Level 1 = local control (PLC), Level 2 = process control (DCS), Level 3 = supervision and historization (SCADA/MES), Level 4 = ERP/enterprise management. DCS is at level 2, between PLC and SCADA."},
      {q:"What is redundancy in a maritime DCS?",
        opts:["Two identical programs","Duplication of critical components (CPU, power, network) for continuity","Two operators at station","Two rescue vessels"],
        ans:1,expl:"DCS redundancy = duplication of critical components: redundant CPU (Active/Standby), redundant power supply (two sources), redundant network (dual bus). If one component fails, the system automatically switches to the backup without control interruption. Mandatory for critical VLCC systems."},
      {q:"What is the role of OPC in maritime SCADA systems?",
        opts:["A physical security protocol","An interoperability standard allowing different systems to communicate","A pressure sensor type","A backup system"],
        ans:1,expl:"OPC (OLE for Process Control, now OPC-UA) is an interoperability standard allowing heterogeneous systems (Siemens PLC + ABB DCS + Kongsberg SCADA) to communicate and exchange data. Essential for integrating systems from different manufacturers aboard modern vessels."},
      {q:"What is the PLC 'scan time'?",
        opts:["Annual maintenance time","Time to complete one full SCAN cycle (read inputs, program, outputs)","PLC lifespan","Startup time"],
        ans:1,expl:"PLC scan time = time to complete one SCAN cycle: read inputs + execute program + update outputs + communication. For critical machinery: 5-10ms. For non-critical processes: 50-200ms. Too long a scan time = risk of missing a fast anomaly (e.g. overvoltage)."},
      {q:"What is the main difference between Profibus and Profinet?",
        opts:["Profibus is newer","Profibus = serial RS-485 bus, Profinet = industrial Ethernet","Profinet is slower","Profibus supports more nodes"],
        ans:1,expl:"Profibus: serial RS-485 communication, up to 12Mbps, max 125 nodes. Profinet: industrial Ethernet version (100Mbps or 1Gbps), supports TCP/IP, guaranteed real-time. New vessels are migrating to Profinet/Ethernet IP for high throughput and maritime IoT integration."},
      {q:"Why does a maritime PLC system use certified function blocks (e.g. IEC 61511)?",
        opts:["To reduce costs","To guarantee functional safety (SIL) of critical safety functions","To ease maintenance","To increase processing speed"],
        ans:1,expl:"IEC 61511 (Safety Instrumented Systems) defines SIL levels (Safety Integrity Level) 1 to 4. Critical safety functions (emergency ME stop, HFO valve closure, fire alarms) must be implemented in SIL-certified blocks. On VLCC: SIL 2 minimum for systems related to propulsion and cargo safety."},
    ],
    es:[
      {q:"?Que significa PLC en automatizacion industrial?",
        opts:["Power Line Controller","Programmable Logic Controller","Process Level Control","Peripheral Logic Computer"],
        ans:1,expl:"PLC = Programmable Logic Controller (Automata Programable Industrial). Es el componente fundamental del control industrial, presente en todos los buques modernos para controlar motores principales, generadores, purificadores y sistemas auxiliares."},
      {q:"?Cual es la diferencia fundamental entre un PLC y un DCS?",
        opts:["El PLC es mas reciente","PLC = control local maquina unica, DCS = control distribuido multi-proceso","DCS es mas rapido","PLC es mas caro"],
        ans:1,expl:"PLC: control local de una maquina unica con tiempo real duro (menor de 10ms). DCS (Distributed Control System): control distribuido en todo un proceso industrial (sala de maquinas VLCC) con tiempo real suave (50-500ms) y arquitectura redundante."},
      {q:"?Que significa SCADA?",
        opts:["System Control And Data Analysis","Supervisory Control And Data Acquisition","Safety Control And Data Access","Systematic Control And Device Alert"],
        ans:1,expl:"SCADA = Supervisory Control And Data Acquisition. Es el nivel superior de la piramide de automatizacion: supervision remota, recopilacion de datos, historizacion, gestion de alarmas. En maritimo: Kongsberg K-IMS, Wartsila NACOS, ABB EMMA."},
      {q:"En un ciclo SCAN PLC, ?cual es la secuencia correcta?",
        opts:["Salidas -> Programa -> Entradas -> Com","Entradas -> Programa -> Salidas -> Comunicacion","Programa -> Entradas -> Com -> Salidas","Com -> Salidas -> Programa -> Entradas"],
        ans:1,expl:"El ciclo SCAN PLC sigue siempre: 1) Lectura entradas (sensores), 2) Ejecucion programa usuario, 3) Actualizacion salidas (actuadores), 4) Comunicacion red. Este ciclo se repite tipicamente en menos de 10ms para maquinaria critica."},
      {q:"?Cual es el rango de senal estandar para E/S analogicas en un PLC maritimo?",
        opts:["0-5V","0-10V","4-20mA","0-1A"],
        ans:2,expl:"4-20mA es el estandar industrial universal para senales analogicas. Ventaja clave: la corriente en reposo es 4mA (nunca 0), lo que permite detectar rotura de cable (senal cae a 0mA = averia). 4mA = valor min (0%), 20mA = valor max (100%)."},
      {q:"El MV El Faro (2015) se perdio principalmente porque:",
        opts:["Fallo completo del sistema PLC","Alertas sistema SCADA ignoradas por el mando","Cortocircuito en el cuadro electrico","Fallo del timon"],
        ans:1,expl:"El El Faro se hundio porque las alertas del sistema de gestion electronica de maquinas (presion aceite baja, bomba de sentina, estabilidad) fueron repetidamente ignoradas por el mando. 33 muertos. Las alertas SCADA/PLC son senales de seguridad obligatorias."},
      {q:"En una boucle PID, ?que corrige la accion Integral (I)?",
        opts:["Las oscilaciones rapidas","El error estatico persistente entre valor medido y consigna","Las perturbaciones externas","La velocidad de subida"],
        ans:1,expl:"La accion Integral (I) corrige el error estatico (diferencia residual entre PV y SP tras estabilizacion). P solo siempre deja un error residual. I acumula el error en el tiempo y aumenta la salida hasta eliminar la diferencia."},
      {q:"?Cual es la diferencia entre entradas DI y AI en un PLC?",
        opts:["DI = analogica, AI = digital","DI = Entrada Digital (ON/OFF), AI = Entrada Analogica (continua 4-20mA)","DI es mas rapida","AI es menos fiable"],
        ans:1,expl:"DI (Digital Input): senal logica 0 o 1 (ej: valvula abierta/cerrada, motor en marcha/parado). AI (Analog Input): senal continua 4-20mA representando un valor fisico (temperatura, presion, nivel)."},
      {q:"?Que protocolo de comunicacion se usa mas en sistemas PLC maritimos?",
        opts:["USB","Modbus RTU/TCP","Bluetooth","RS-232 serie"],
        ans:1,expl:"Modbus RTU (serie) y Modbus TCP (Ethernet) son los protocolos mas usados en sistemas maritimos. Simples, robustos, abiertos y estandarizados desde 1979 (Modicon). Otros protocolos maritimos: Profibus, Profinet, NMEA 2000, CANopen."},
      {q:"En la piramide de automatizacion, ?que nivel representa el DCS?",
        opts:["Nivel 0: campo (sensores)","Nivel 1: control local (PLC)","Nivel 2: control de proceso (DCS)","Nivel 3: supervision (SCADA)"],
        ans:2,expl:"Piramide ISA-95: Nivel 0 = campo, Nivel 1 = control local (PLC), Nivel 2 = control de proceso (DCS), Nivel 3 = supervision (SCADA/MES), Nivel 4 = ERP. El DCS esta en el nivel 2, entre PLC y SCADA."},
      {q:"?Que es la redundancia en un DCS maritimo?",
        opts:["Dos programas identicos","Duplicacion de componentes criticos para continuidad del servicio","Dos operadores en el puesto","Dos buques de rescate"],
        ans:1,expl:"Redundancia DCS = duplicacion de componentes criticos: CPU redundante (Activo/Standby), alimentacion redundante (dos fuentes), red redundante (doble bus). Si un componente falla, el sistema conmuta automaticamente al duplicado sin interrumpir el control."},
      {q:"?Cual es el rol del OPC en sistemas SCADA maritimos?",
        opts:["Un protocolo de seguridad fisica","Un estandar de interoperabilidad que permite comunicarse a diferentes sistemas","Un tipo de sensor de presion","Un sistema de copia de seguridad"],
        ans:1,expl:"OPC (OLE for Process Control, ahora OPC-UA) es un estandar de interoperabilidad que permite a sistemas heterogeneos (PLC Siemens + DCS ABB + SCADA Kongsberg) comunicarse e intercambiar datos. Esencial para integrar sistemas de distintas marcas a bordo."},
      {q:"?Que es el tiempo de ciclo de un PLC?",
        opts:["El tiempo de mantenimiento anual","El tiempo para ejecutar un ciclo SCAN completo","La vida util del PLC","El tiempo de arranque"],
        ans:1,expl:"Tiempo de ciclo PLC = tiempo para completar un ciclo SCAN: leer entradas + ejecutar programa + actualizar salidas + comunicacion. Para maquinaria critica: 5-10ms. Para procesos no criticos: 50-200ms."},
      {q:"?Cual es la principal diferencia entre Profibus y Profinet?",
        opts:["Profibus es mas reciente","Profibus = bus serie RS-485, Profinet = Ethernet industrial","Profinet es mas lento","Profibus soporta mas nodos"],
        ans:1,expl:"Profibus: comunicacion serie RS-485, hasta 12Mbps, max 125 nodos. Profinet: version Ethernet industrial (100Mbps o 1Gbps), soporta TCP/IP, tiempo real garantizado. Los nuevos buques migran a Profinet para mayor ancho de banda e integracion IoT maritima."},
      {q:"?Por que un sistema PLC maritimo usa bloques funcion certificados (ej: IEC 61511)?",
        opts:["Para reducir costes","Para garantizar la seguridad funcional (SIL) de funciones de proteccion criticas","Para facilitar el mantenimiento","Para aumentar la velocidad de procesamiento"],
        ans:1,expl:"IEC 61511 define los niveles SIL (Safety Integrity Level) 1 a 4. Las funciones de proteccion criticas (parada urgencia ME, cierre valvulas HFO, alarmas incendio) deben implementarse en bloques certificados SIL. En VLCC: SIL 2 minimo para sistemas relacionados con la propulsion y seguridad de la carga."},
    ],
    pt:[
      {q:"O que significa PLC em automatizacao industrial?",
        opts:["Power Line Controller","Programmable Logic Controller","Process Level Control","Peripheral Logic Computer"],
        ans:1,expl:"PLC = Programmable Logic Controller. E o componente fundamental dos sistemas de controlo industrial, presente em todos os navios modernos para controlar motores principais, geradores, purificadores e sistemas auxiliares."},
      {q:"Qual e a diferenca fundamental entre um PLC e um DCS?",
        opts:["O PLC e mais recente","PLC = controlo local maquina unica, DCS = controlo distribuido multi-processo","DCS e mais rapido","PLC e mais caro"],
        ans:1,expl:"PLC: controlo local de uma maquina unica com tempo real duro (menos de 10ms). DCS (Distributed Control System): controlo distribuido num processo industrial completo (casa das maquinas VLCC) com tempo real suave (50-500ms) e arquitectura redundante."},
      {q:"O que significa SCADA?",
        opts:["System Control And Data Analysis","Supervisory Control And Data Acquisition","Safety Control And Data Access","Systematic Control And Device Alert"],
        ans:1,expl:"SCADA = Supervisory Control And Data Acquisition. E o nivel superior da piramide de automatizacao: supervisao remota, recolha de dados, historizacao, gestao de alarmes. Em maritimo: Kongsberg K-IMS, Wartsila NACOS, ABB EMMA."},
      {q:"Num ciclo SCAN PLC, qual e a sequencia correcta?",
        opts:["Saidas -> Programa -> Entradas -> Com","Entradas -> Programa -> Saidas -> Comunicacao","Programa -> Entradas -> Com -> Saidas","Com -> Saidas -> Programa -> Entradas"],
        ans:1,expl:"O ciclo SCAN PLC segue sempre: 1) Leitura entradas (sensores), 2) Execucao programa utilizador, 3) Actualizacao saidas (atuadores), 4) Comunicacao rede. Este ciclo repete-se tipicamente em menos de 10ms para maquinaria critica."},
      {q:"Qual e a gama de sinal padrao para E/S analogicas num PLC maritimo?",
        opts:["0-5V","0-10V","4-20mA","0-1A"],
        ans:2,expl:"4-20mA e o padrao industrial universal para sinais analogicos. Vantagem chave: a corrente em repouso e 4mA (nunca 0), permitindo detectar rotura de cabo (sinal cai a 0mA = avaria). 4mA = valor min (0%), 20mA = valor max (100%)."},
      {q:"O MV El Faro (2015) perdeu-se principalmente porque:",
        opts:["Falha completa do sistema PLC","Alertas sistema SCADA ignorados pelo comando","Curto-circuito no quadro electrico","Falha do leme"],
        ans:1,expl:"O El Faro naufragou porque os alertas do sistema de gestao electronica das maquinas (pressao oleo baixa, bomba de porao, estabilidade) foram repetidamente ignorados pelo comando. 33 mortos. Os alertas SCADA/PLC sao sinais de seguranca obrigatorios."},
      {q:"Numa boucle PID, o que corrige a accao Integral (I)?",
        opts:["As oscilacoes rapidas","O erro estatico persistente entre o valor medido e a consigna","As perturbacoes externas","A velocidade de subida"],
        ans:1,expl:"A accao Integral (I) corrige o erro estatico (diferenca residual entre PV e SP apos estabilizacao). P sozinho deixa sempre um erro residual. I acumula o erro ao longo do tempo e aumenta a saida ate eliminar a diferenca."},
      {q:"Qual e a diferenca entre entradas DI e AI num PLC?",
        opts:["DI = analogica, AI = digital","DI = Entrada Digital (ON/OFF), AI = Entrada Analogica (continua 4-20mA)","DI e mais rapida","AI e menos fiavel"],
        ans:1,expl:"DI (Digital Input): sinal logico 0 ou 1 (ex: valvula aberta/fechada, motor em marcha/parado). AI (Analog Input): sinal continuo 4-20mA representando um valor fisico (temperatura, pressao, nivel)."},
      {q:"Que protocolo de comunicacao e mais usado em sistemas PLC maritimos?",
        opts:["USB","Modbus RTU/TCP","Bluetooth","RS-232 serie"],
        ans:1,expl:"Modbus RTU (serie) e Modbus TCP (Ethernet) sao os protocolos mais usados em sistemas maritimos. Simples, robustos, abertos e normalizados desde 1979 (Modicon). Outros protocolos maritimos: Profibus, Profinet, NMEA 2000, CANopen."},
      {q:"Na piramide de automatizacao, que nivel representa o DCS?",
        opts:["Nivel 0: campo (sensores)","Nivel 1: controlo local (PLC)","Nivel 2: controlo de processo (DCS)","Nivel 3: supervisao (SCADA)"],
        ans:2,expl:"Piramide ISA-95: Nivel 0 = campo, Nivel 1 = controlo local (PLC), Nivel 2 = controlo de processo (DCS), Nivel 3 = supervisao (SCADA/MES), Nivel 4 = ERP. O DCS esta no nivel 2, entre PLC e SCADA."},
      {q:"O que e a redundancia num DCS maritimo?",
        opts:["Dois programas identicos","Duplicacao de componentes criticos para continuidade de servico","Dois operadores no posto","Dois navios de resgate"],
        ans:1,expl:"Redundancia DCS = duplicacao de componentes criticos: CPU redundante (Activo/Standby), alimentacao redundante (duas fontes), rede redundante (duplo bus). Se um componente falha, o sistema comuta automaticamente para o duplicado sem interrupcao do controlo."},
      {q:"Qual e o papel do OPC nos sistemas SCADA maritimos?",
        opts:["Um protocolo de seguranca fisica","Um padrao de interoperabilidade que permite a diferentes sistemas comunicar","Um tipo de sensor de pressao","Um sistema de copia de seguranca"],
        ans:1,expl:"OPC (OLE for Process Control, agora OPC-UA) e um padrao de interoperabilidade que permite a sistemas heterogeneos (PLC Siemens + DCS ABB + SCADA Kongsberg) comunicar e trocar dados. Essencial para integrar sistemas de diferentes fabricantes a bordo."},
      {q:"O que e o tempo de ciclo de um PLC?",
        opts:["O tempo de manutencao anual","O tempo para executar um ciclo SCAN completo","A vida util do PLC","O tempo de arranque"],
        ans:1,expl:"Tempo de ciclo PLC = tempo para completar um ciclo SCAN: ler entradas + executar programa + actualizar saidas + comunicacao. Para maquinaria critica: 5-10ms. Para processos nao criticos: 50-200ms."},
      {q:"Qual e a principal diferenca entre Profibus e Profinet?",
        opts:["Profibus e mais recente","Profibus = bus serie RS-485, Profinet = Ethernet industrial","Profinet e mais lento","Profibus suporta mais nos"],
        ans:1,expl:"Profibus: comunicacao serie RS-485, ate 12Mbps, max 125 nos. Profinet: versao Ethernet industrial (100Mbps ou 1Gbps), suporta TCP/IP, tempo real garantido. Os novos navios migram para Profinet para maior largura de banda e integracao IoT maritima."},
      {q:"Porque e que um sistema PLC maritimo usa blocos funcao certificados (ex: IEC 61511)?",
        opts:["Para reduzir custos","Para garantir a seguranca funcional (SIL) de funcoes de proteccao criticas","Para facilitar a manutencao","Para aumentar a velocidade de processamento"],
        ans:1,expl:"IEC 61511 define os niveis SIL (Safety Integrity Level) 1 a 4. As funcoes de proteccao criticas (paragem urgencia ME, fecho valvulas HFO, alarmes incendio) devem ser implementadas em blocos certificados SIL. Em VLCC: SIL 2 minimo para sistemas de propulsao e seguranca da carga."},
    ],
  };

  const list=qs[lang]||qs.fr;
  const [shuffled]=useState(()=>list.map(q=>shuffleQuestionOptions(q,"ans")));
  const total=list.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===shuffled[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6}}>
        {lbl("Banque Premium+","Premium+ Bank","Banco Premium+","Banco Premium+")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lbl("questions niveau ingenieur","engineer-level questions","preguntas nivel ingeniero","questoes nivel engenheiro")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,
          background:`linear-gradient(135deg,${C.cyan},${C.blue})`,
          border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",
          boxShadow:`0 0 28px ${C.cyan}44`}}>
        {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
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
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.cyan},${trophy.color})`,
            borderRadius:6,transition:"width 0.9s ease"}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"13px",borderRadius:14,
            background:`rgba(0,229,255,0.12)`,border:`1px solid ${C.cyan}55`,
            color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
          {lbl("Recommencer","Restart","Reiniciar","Recomecar")}
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
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold2,fontWeight:800}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,
            background:`linear-gradient(90deg,${C.cyan},${C.blue})`,borderRadius:4,transition:"width 0.35s"}}/>
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
            style={{width:"100%",padding:"12px 15px",marginBottom:8,borderRadius:13,
              background:bg,border:`1.5px solid ${border}`,color:col,fontSize:12,
              textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2,fontSize:11}}>
              {["A","B","C","D"][i]}.
            </span>{opt}
          </button>
        );
      })}
      {answered&&(
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
      {answered&&(
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:15,
            background:`linear-gradient(135deg,${C.cyan},${C.blue})`,
            border:"none",color:C.bg0,fontSize:13,fontWeight:900,cursor:"pointer",
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
// QUIZ — 5 QCM
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"PLC signifie et est utilise pour :",opts:["Power Loop Controller — supervision flotte","Programmable Logic Controller — controle local machine","Process Level Control — gestion process","Peripheral Logic Computer — reseau embarque"],
      ans:1,expl:"PLC = Programmable Logic Controller. Controle local d'une machine unique (moteur, generateur, purificateur) avec temps reel dur sous 10ms. Differents du DCS (multi-process) et SCADA (supervision)."},
    {q:"La pyramide automatisme du bas vers le haut est :",opts:["SCADA -> DCS -> PLC -> Capteurs","Capteurs -> PLC -> DCS -> SCADA","DCS -> PLC -> SCADA -> Capteurs","PLC -> DCS -> Capteurs -> SCADA"],
      ans:1,expl:"Pyramide ISA-95 : Niveau 0 = Capteurs/actionneurs, Niveau 1 = PLC (controle local), Niveau 2 = DCS (controle process), Niveau 3 = SCADA (supervision), Niveau 4 = ERP. Chaque niveau a son role specifique."},
    {q:"Dans une boucle PID, l'action I (Integrale) corrige :",opts:["Les oscillations rapides","L'erreur statique persistante","Les perturbations exterieures","La vitesse de montee"],
      ans:1,expl:"L'action Integrale accumule l'erreur dans le temps et l'elimine entierement (erreur statique = 0 en regime permanent). P seul laisse toujours un ecart residuel. Trop de I provoque des oscillations."},
    {q:"Le standard 4-20mA pour les signaux analogiques PLC permet de :",opts:["Gagner en vitesse","Detecter les ruptures de cable (0mA = panne)","Augmenter la distance","Reduire le cout"],
      ans:1,expl:"Avec 4-20mA : en fonctionnement normal, le courant est toujours entre 4 et 20mA. Si le cable se coupe, le signal tombe a 0mA. Ce 0mA ne peut pas etre une valeur physique valide => detection automatique de panne. Avantage majeur vs 0-10V."},
    {q:"Le MV El Faro illustre que les alertes PLC/SCADA ignorees peuvent :",opts:["Reduire les performances","Entrainer la perte du navire et de l'equipage","Causer des retards commerciaux","Augmenter la consommation"],
      ans:1,expl:"El Faro (2015) : alertes systeme repetees (pression huile, stabilite) ignorees => capitaine maintient cap ouragan Joaquin => 33 morts. Le systeme SCADA/PLC avait detecte les anomalies. La decision humaine d'ignorer les alertes est la cause directe du naufrage."},
  ],
  en:[
    {q:"PLC stands for and is used for:",opts:["Power Loop Controller — fleet supervision","Programmable Logic Controller — local machine control","Process Level Control — process management","Peripheral Logic Computer — onboard network"],
      ans:1,expl:"PLC = Programmable Logic Controller. Local control of a single machine (engine, generator, purifier) with hard real-time under 10ms. Different from DCS (multi-process) and SCADA (supervision)."},
    {q:"The automation pyramid from bottom to top is:",opts:["SCADA -> DCS -> PLC -> Sensors","Sensors -> PLC -> DCS -> SCADA","DCS -> PLC -> SCADA -> Sensors","PLC -> DCS -> Sensors -> SCADA"],
      ans:1,expl:"ISA-95 pyramid: Level 0 = Sensors/actuators, Level 1 = PLC (local control), Level 2 = DCS (process control), Level 3 = SCADA (supervision), Level 4 = ERP. Each level has its specific role."},
    {q:"In a PID loop, the I (Integral) action corrects:",opts:["Rapid oscillations","Persistent steady-state error","External disturbances","Rise time"],
      ans:1,expl:"Integral action accumulates error over time and eliminates it entirely (steady-state error = 0 in permanent regime). P alone always leaves residual error. Too much I causes oscillations."},
    {q:"The 4-20mA standard for PLC analog signals allows:",opts:["Speed improvement","Cable break detection (0mA = fault)","Greater distance","Cost reduction"],
      ans:1,expl:"With 4-20mA: in normal operation, current is always between 4 and 20mA. If cable breaks, signal drops to 0mA. This 0mA cannot be a valid physical value => automatic fault detection. Major advantage vs 0-10V."},
    {q:"MV El Faro illustrates that ignored PLC/SCADA alerts can:",opts:["Reduce performance","Lead to loss of vessel and crew","Cause commercial delays","Increase consumption"],
      ans:1,expl:"El Faro (2015): repeated system alerts (oil pressure, stability) ignored => captain maintains course toward Hurricane Joaquin => 33 deaths. The SCADA/PLC system had detected anomalies. The human decision to ignore alerts is the direct cause of the sinking."},
  ],
  es:[
    {q:"PLC significa y se usa para:",opts:["Power Loop Controller — supervision flota","Programmable Logic Controller — control local maquina","Process Level Control — gestion proceso","Peripheral Logic Computer — red embarcada"],
      ans:1,expl:"PLC = Programmable Logic Controller. Control local de una maquina unica (motor, generador, purificador) con tiempo real duro inferior a 10ms. Diferente del DCS (multi-proceso) y SCADA (supervision)."},
    {q:"La piramide de automatizacion de abajo a arriba es:",opts:["SCADA -> DCS -> PLC -> Sensores","Sensores -> PLC -> DCS -> SCADA","DCS -> PLC -> SCADA -> Sensores","PLC -> DCS -> Sensores -> SCADA"],
      ans:1,expl:"Piramide ISA-95: Nivel 0 = Sensores/actuadores, Nivel 1 = PLC (control local), Nivel 2 = DCS (control proceso), Nivel 3 = SCADA (supervision), Nivel 4 = ERP."},
    {q:"En una boucle PID, la accion I (Integral) corrige:",opts:["Las oscilaciones rapidas","El error estatico persistente","Las perturbaciones externas","La velocidad de subida"],
      ans:1,expl:"La accion Integral acumula el error en el tiempo y lo elimina por completo. P solo deja siempre un error residual. Demasiada I provoca oscilaciones."},
    {q:"El estandar 4-20mA para senales analogicas PLC permite:",opts:["Ganar velocidad","Detectar roturas de cable (0mA = averia)","Aumentar la distancia","Reducir costes"],
      ans:1,expl:"Con 4-20mA: en funcionamiento normal, la corriente esta siempre entre 4 y 20mA. Si el cable se rompe, la senal cae a 0mA. Este 0mA no puede ser un valor fisico valido => deteccion automatica de averia."},
    {q:"El MV El Faro ilustra que las alertas PLC/SCADA ignoradas pueden:",opts:["Reducir el rendimiento","Provocar la perdida del buque y la tripulacion","Causar retrasos comerciales","Aumentar el consumo"],
      ans:1,expl:"El Faro (2015): alertas sistema repetidas (presion aceite, estabilidad) ignoradas => capitan mantiene rumbo huracan Joaquin => 33 muertos. El sistema SCADA/PLC habia detectado las anomalias."},
  ],
  pt:[
    {q:"PLC significa e e usado para:",opts:["Power Loop Controller — supervisao frota","Programmable Logic Controller — controlo local maquina","Process Level Control — gestao processo","Peripheral Logic Computer — rede embarcada"],
      ans:1,expl:"PLC = Programmable Logic Controller. Controlo local de uma maquina unica (motor, gerador, purificador) com tempo real duro inferior a 10ms. Diferente do DCS (multi-processo) e SCADA (supervisao)."},
    {q:"A piramide de automatizacao de baixo para cima e:",opts:["SCADA -> DCS -> PLC -> Sensores","Sensores -> PLC -> DCS -> SCADA","DCS -> PLC -> SCADA -> Sensores","PLC -> DCS -> Sensores -> SCADA"],
      ans:1,expl:"Piramide ISA-95: Nivel 0 = Sensores/atuadores, Nivel 1 = PLC (controlo local), Nivel 2 = DCS (controlo processo), Nivel 3 = SCADA (supervisao), Nivel 4 = ERP."},
    {q:"Numa boucle PID, a accao I (Integral) corrige:",opts:["As oscilacoes rapidas","O erro estatico persistente","As perturbacoes externas","A velocidade de subida"],
      ans:1,expl:"A accao Integral acumula o erro ao longo do tempo e elimina-o completamente. P sozinho deixa sempre um erro residual. Demasiada I provoca oscilacoes."},
    {q:"O padrao 4-20mA para sinais analogicos PLC permite:",opts:["Ganhar velocidade","Detectar roturas de cabo (0mA = avaria)","Aumentar a distancia","Reduzir custos"],
      ans:1,expl:"Com 4-20mA: em funcionamento normal, a corrente esta sempre entre 4 e 20mA. Se o cabo se rompe, o sinal cai a 0mA. Este 0mA nao pode ser um valor fisico valido => deteccao automatica de avaria."},
    {q:"O MV El Faro ilustra que os alertas PLC/SCADA ignorados podem:",opts:["Reduzir o desempenho","Provocar a perda do navio e da tripulacao","Causar atrasos comerciais","Aumentar o consumo"],
      ans:1,expl:"El Faro (2015): alertas sistema repetidos (pressao oleo, estabilidade) ignorados => capitao mantem rumo furacao Joaquin => 33 mortos. O sistema SCADA/PLC tinha detectado as anomalias."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const total=questions.length;
  const isLast=idx===total-1;
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
        <div style={{height:"100%",width:`${(idx/total)*100}%`,
          background:`linear-gradient(90deg,${C.amber},${C.gold2})`,borderRadius:4,transition:"width 0.3s"}}/>
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
            style={{width:"100%",padding:"13px 15px",marginBottom:8,borderRadius:13,
              background:bg,border:`1.5px solid ${border}`,color:col,fontSize:13,
              textAlign:"left",cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:C.amber2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered&&(
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered&&(
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,
            background:`linear-gradient(135deg,${C.amber},${C.gold2})`,
            border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",
            boxShadow:`0 4px 22px ${C.amber}40`}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT
// ══════════════════════════════════════
const getContent=(lang)=>{
  const d={
    fr:{
      badge:"Module e7 — UMS & Automatisation · Lecon 2/5 · Premium+ · 240 XP",
      title:"PLC, DCS & SCADA — Systemes de Controle-Commande Maritime",
      intro:"Un VLCC moderne embarque 47 automates PLC, un DCS centralisant 3 200 points de mesure et un SCADA transmettant en temps reel les donnees a l'armateur a l'autre bout du monde. C'est la colonne vertebrale invisible du navire.\n\nCette lecon couvre l'architecture PLC, la comparison PLC/DCS/SCADA, la regulation PID et les synoptiques SCADA maritimes.",
      p1:"PARTIE 1 — ARCHITECTURE PLC",s1t:"Modules, cycle SCAN, E/S — automate industriel",
      s1:"PLC = PROGRAMMABLE LOGIC CONTROLLER:\nAutomate Programmable Industriel (API en francais)\nControle local d'une machine unique\nTemps reel dur : cycle SCAN inf. a 10ms\n\nMODULES TYPIQUES:\nPSU : alimentation 24V DC (protection coupures)\nCPU : unite centrale (execute le programme)\nDI : entrees digitales (capteurs TOR ON/OFF)\nDO : sorties digitales (relais, contacteurs)\nAI : entrees analogiques (4-20mA, temp, pression)\nAO : sorties analogiques (vannes, variateurs)\nCOM : communication (Modbus, Profibus, Ethernet)\n\nCYCLE SCAN:\n1. Lecture des entrees (capteurs)\n2. Execution du programme utilisateur\n3. Mise a jour des sorties (actionneurs)\n4. Communication reseau\n=> Repete en continu : 5-10ms machines critiques\n\nSTANDARD SIGNAL:\n4-20mA : universel, detection panne (0mA = coupure)\nLanguages : Ladder, FBD, ST, SFC (IEC 61131-3)",
      p2:"PARTIE 2 — PLC vs DCS vs SCADA",s2t:"Comparaison architectures — cas d'usage maritimes",
      s2:"PYRAMIDE AUTOMATISME (ISA-95):\nNiveau 0 : Terrain (capteurs, actionneurs)\nNiveau 1 : PLC — controle local machine\nNiveau 2 : DCS — controle process reparti\nNiveau 3 : SCADA — supervision et historisation\nNiveau 4 : ERP — gestion d'entreprise\n\nPLC (Programmable Logic Controller):\n- Usage : 1 machine - 16 a 512 E/S\n- Temps reponse : inf. a 10ms (temps reel dur)\n- Maritime : ME, generateur, purificateur\n- Marques : Siemens S7, Allen-Bradley, Mitsubishi\n\nDCS (Distributed Control System):\n- Usage : process continu, milliers de points\n- Temps reponse : 50-500ms (temps reel souple)\n- Maritime : VLCC salle des machines complete\n- Marques : ABB 800xA, Emerson DeltaV, Honeywell\n\nSCADA (Supervisory Control And Data Acquisition):\n- Usage : supervision multi-sites, flotte navires\n- Temps reponse : 1-60s (non critique)\n- Maritime : Kongsberg K-IMS, Wartsila NACOS\n- Fleet monitoring, maintenance predictive",
      p3:"PARTIE 3 — REGULATION PID",s3t:"Proportionnel - Integral - Derive : simulation",
      s3:"BOUCLE PID:\nRegulateur le plus utilise dans l'industrie (95%+)\nControle : temperature, pression, niveau, vitesse\n\nTROIS ACTIONS:\nP (Proportionnel) = Kp x erreur\n- Reaction immediate a l'ecart\n- Reste une erreur statique residuelle\n\nI (Integral) = Ki x somme erreurs\n- Elimine l'erreur statique residuelle\n- Risque : windup (accumulation) si Ki trop grand\n\nD (Derive) = Kd x variation erreur\n- Anticipe les changements rapides\n- Amortit les oscillations\n\nEXEMPLES MARITIMES:\nRegulation temperature eau refroidissement ME\nRegulation pression huile graissage\nControl vitesse turbine generateur\nRegulation debit HFO vers injecteurs",
      p4:"PARTIE 4 — SCADA MARITIME",s4t:"Synoptique — mimic diagram — alarmes",
      s4:"SYNOPTIQUE (MIMIC DIAGRAM):\nRepresentation graphique du process\nVannes, pompes, cuves, tuyauteries\nEtat temps reel : ON/OFF, niveaux, debits\n\nFONCTIONS SCADA MARITIME:\n1. Supervision process en temps reel\n2. Gestion des alarmes (AMS integre)\n3. Historisation des donnees (trending)\n4. Rapports d'exploitation (logbooks)\n5. Maintenance predictive (CBM)\n6. Fleet monitoring depuis shore side\n\nSTANDARD COMMUNICATION:\nOPC-UA : interoperabilite multi-marques\nModbus TCP : simple et universel\nProfinet : Ethernet industriel haut debit\nNMEA 2000 : specifique navigation\n\nSECURITE SCADA MARITIME:\nCybersecurite : ISM Code + IMO Resolution MSC-FAL.1\nSegregation reseaux : OT vs IT\nRedondance : serveurs SCADA doubles",
      p5:"EXERCICES PRATIQUES PREMIUM+",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS PREMIUM+",
      sumT:"RESUME — LECON e7 L2",
      sumP:["PLC = Programmable Logic Controller — controle local < 10ms","DCS = controle reparti multi-process 50-500ms","SCADA = supervision multi-sites flotte","Cycle SCAN : entrees > programme > sorties > com","4-20mA : standard analogique detection panne (0mA)","PID : P=proporionnel I=integral D=derive","I corrige erreur statique residuelle","Synoptique SCADA = mimic diagram process","El Faro 2015 : alertes SCADA ignorees => 33 morts","OPC-UA : interoperabilite systemes heterogenes"],
      learnedP:["Architecture PLC et cycle SCAN","Differences PLC / DCS / SCADA","Regulation PID et ses 3 actions","Synoptique SCADA maritime","MV El Faro 2015 : consequence alertes ignorees"],
    },
    en:{
      badge:"Module e7 — UMS & Automation · Lesson 2/5 · Premium+ · 240 XP",
      title:"PLC, DCS & SCADA — Maritime Control Systems",
      intro:"A modern VLCC carries 47 PLCs, a DCS centralizing 3,200 measurement points and a SCADA transmitting real-time data to the shipowner across the world. This is the invisible backbone of the vessel.\n\nThis lesson covers PLC architecture, PLC/DCS/SCADA comparison, PID regulation and maritime SCADA mimics.",
      p1:"PART 1 — PLC ARCHITECTURE",s1t:"Modules, SCAN cycle, I/O — industrial controller",
      s1:"PLC = PROGRAMMABLE LOGIC CONTROLLER:\nLocal control of a single machine\nHard real-time: SCAN cycle under 10ms\n\nTYPICAL MODULES:\nPSU: 24V DC power supply (surge protection)\nCPU: central unit (executes program)\nDI: digital inputs (discrete ON/OFF sensors)\nDO: digital outputs (relays, contactors)\nAI: analog inputs (4-20mA, temp, pressure)\nAO: analog outputs (valves, drives)\nCOM: communication (Modbus, Profibus, Ethernet)\n\nSCAN CYCLE:\n1. Read inputs (sensors)\n2. Execute user program\n3. Update outputs (actuators)\n4. Network communication\n=> Repeated continuously: 5-10ms critical machines\n\nSIGNAL STANDARD:\n4-20mA: universal, fault detection (0mA = break)\nLanguages: Ladder, FBD, ST, SFC (IEC 61131-3)",
      p2:"PART 2 — PLC vs DCS vs SCADA",s2t:"Architecture comparison — maritime use cases",
      s2:"AUTOMATION PYRAMID (ISA-95):\nLevel 0: Field (sensors, actuators)\nLevel 1: PLC — local machine control\nLevel 2: DCS — distributed process control\nLevel 3: SCADA — supervision and historization\nLevel 4: ERP — enterprise management\n\nPLC: 1 machine, under 10ms, ME/generator/purifier\nDCS: continuous process, 50-500ms, full VLCC ER\nSCADA: multi-site fleet supervision, 1-60s",
      p3:"PART 3 — PID REGULATION",s3t:"Proportional - Integral - Derivative: simulation",
      s3:"PID LOOP:\nMost used regulator in industry (95%+)\nControls: temperature, pressure, level, speed\n\nTHREE ACTIONS:\nP (Proportional) = Kp x error\n- Immediate reaction to deviation\n- Leaves residual steady-state error\n\nI (Integral) = Ki x sum of errors\n- Eliminates residual steady-state error\n- Risk: windup if Ki too large\n\nD (Derivative) = Kd x error rate of change\n- Anticipates rapid changes\n- Dampens oscillations\n\nMARITIME EXAMPLES:\nME cooling water temperature regulation\nLubrication oil pressure regulation\nGenerator turbine speed control\nHFO flow to injectors regulation",
      p4:"PART 4 — MARITIME SCADA",s4t:"Mimic diagram — real-time supervision — alarms",
      s4:"MIMIC DIAGRAM:\nGraphical process representation\nValves, pumps, tanks, pipework\nReal-time status: ON/OFF, levels, flows\n\nMARITIME SCADA FUNCTIONS:\n1. Real-time process supervision\n2. Alarm management (integrated AMS)\n3. Data historization (trending)\n4. Operation reports (logbooks)\n5. Predictive maintenance (CBM)\n6. Shore-side fleet monitoring\n\nCOMMUNICATION STANDARDS:\nOPC-UA: multi-brand interoperability\nModbus TCP: simple and universal\nProfinet: high-speed industrial Ethernet\nNMEA 2000: navigation-specific\n\nMARITIME SCADA CYBERSECURITY:\nISM Code + IMO Resolution MSC-FAL.1\nNetwork segregation: OT vs IT\nRedundancy: dual SCADA servers",
      p5:"ADVANCED PREMIUM+ EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 PREMIUM+ QUESTIONS",
      sumT:"SUMMARY — LESSON e7 L2",
      sumP:["PLC = Programmable Logic Controller — local control < 10ms","DCS = distributed multi-process control 50-500ms","SCADA = multi-site fleet supervision","SCAN cycle: inputs > program > outputs > com","4-20mA: analog standard, fault detection (0mA)","PID: P=proportional I=integral D=derivative","I corrects residual steady-state error","SCADA mimic = graphical process diagram","El Faro 2015: ignored SCADA alerts => 33 deaths","OPC-UA: heterogeneous system interoperability"],
      learnedP:["PLC architecture and SCAN cycle","PLC / DCS / SCADA differences","PID regulation and its 3 actions","Maritime SCADA mimic diagram","MV El Faro 2015: consequence of ignored alerts"],
    },
    es:{
      badge:"Modulo e7 — UMS & Automatizacion · Leccion 2/5 · Premium+ · 240 XP",
      title:"PLC, DCS & SCADA — Sistemas de Control-Comando Maritimo",
      intro:"Un VLCC moderno lleva 47 PLCs, un DCS que centraliza 3.200 puntos de medida y un SCADA que transmite datos en tiempo real al armador al otro lado del mundo. Es la columna vertebral invisible del buque.\n\nEsta leccion cubre la arquitectura PLC, la comparacion PLC/DCS/SCADA, la regulacion PID y los sinopticos SCADA maritimos.",
      p1:"PARTE 1 — ARQUITECTURA PLC",s1t:"Modulos, ciclo SCAN, E/S — automata industrial",
      s1:"PLC = PROGRAMMABLE LOGIC CONTROLLER:\nControl local de una maquina unica\nTiempo real duro: ciclo SCAN menor de 10ms\n\nMODULOS TIPICOS:\nPSU: alimentacion 24V DC\nCPU: unidad central (ejecuta el programa)\nDI: entradas digitales (sensores TOR ON/OFF)\nDO: salidas digitales (reles, contactores)\nAI: entradas analogicas (4-20mA, temp, presion)\nAO: salidas analogicas (valvulas, variadores)\nCOM: comunicacion (Modbus, Profibus, Ethernet)\n\nCICLO SCAN:\n1. Lectura entradas 2. Ejecucion programa\n3. Actualizacion salidas 4. Comunicacion red\nStandard senal: 4-20mA",
      p2:"PARTE 2 — PLC vs DCS vs SCADA",s2t:"Comparacion arquitecturas — casos de uso maritimos",
      s2:"PIRAMIDE AUTOMATIZACION (ISA-95):\nNivel 0: Campo | Nivel 1: PLC | Nivel 2: DCS | Nivel 3: SCADA\n\nPLC: 1 maquina, menor de 10ms, ME/generador/purificador\nDCS: proceso continuo, 50-500ms, SM VLCC completa\nSCADA: supervision multi-sitio flota, 1-60s",
      p3:"PARTE 3 — REGULACION PID",s3t:"Proporcional - Integral - Derivada: simulacion",
      s3:"BOUCLE PID: regulador mas usado en industria (95%+)\nP: reaccion inmediata al error\nI: elimina el error estatico residual\nD: amortigua las oscilaciones\nEjemplos maritimos: temp. agua refrigeracion ME, presion aceite lubricacion",
      p4:"PARTE 4 — SCADA MARITIMO",s4t:"Sinoptico — mimic diagram — alarmas",
      s4:"SINOPTICO (MIMIC DIAGRAM):\nRepresentacion grafica del proceso\nFUNCIONES SCADA: supervision tiempo real, gestion alarmas, historizacion, informes, mantenimiento predictivo, monitorizacion flota\nCOMUNICACION: OPC-UA, Modbus TCP, Profinet, NMEA 2000",
      p5:"EJERCICIOS AVANZADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS PREMIUM+",
      sumT:"RESUMEN — LECCION e7 L2",
      sumP:["PLC = Programmable Logic Controller — control local menor de 10ms","DCS = control distribuido multi-proceso 50-500ms","SCADA = supervision multi-sitio flota","Ciclo SCAN: entradas > programa > salidas > com","4-20mA: estandar analogico deteccion averia (0mA)","PID: P=proporcional I=integral D=derivada","I corrige error estatico residual","Sinoptico SCADA = diagrama grafico proceso","El Faro 2015: alertas SCADA ignoradas => 33 muertos","OPC-UA: interoperabilidad sistemas heterogeneos"],
      learnedP:["Arquitectura PLC y ciclo SCAN","Diferencias PLC / DCS / SCADA","Regulacion PID y sus 3 acciones","Sinoptico SCADA maritimo","MV El Faro 2015: consecuencia alertas ignoradas"],
    },
    pt:{
      badge:"Modulo e7 — UMS & Automatizacao · Licao 2/5 · Premium+ · 240 XP",
      title:"PLC, DCS & SCADA — Sistemas de Controlo-Comando Maritimo",
      intro:"Um VLCC moderno embarca 47 PLCs, um DCS centralizando 3.200 pontos de medicao e um SCADA transmitindo dados em tempo real ao armador do outro lado do mundo. Esta e a coluna vertebral invisivel do navio.\n\nEsta licao cobre a arquitectura PLC, a comparacao PLC/DCS/SCADA, a regulacao PID e os sinopticos SCADA maritimos.",
      p1:"PARTE 1 — ARQUITECTURA PLC",s1t:"Modulos, ciclo SCAN, E/S — automato industrial",
      s1:"PLC = PROGRAMMABLE LOGIC CONTROLLER:\nControlo local de uma maquina unica\nTempo real duro: ciclo SCAN inferior a 10ms\n\nMODULOS TIPICOS:\nPSU: alimentacao 24V DC\nCPU: unidade central (executa o programa)\nDI: entradas digitais (sensores TOR ON/OFF)\nDO: saidas digitais (reles, contactores)\nAI: entradas analogicas (4-20mA, temp, pressao)\nAO: saidas analogicas (valvulas, variadores)\nCOM: comunicacao (Modbus, Profibus, Ethernet)\n\nCICLO SCAN:\n1. Leitura entradas 2. Execucao programa\n3. Actualizacao saidas 4. Comunicacao rede\nPadrao sinal: 4-20mA",
      p2:"PARTE 2 — PLC vs DCS vs SCADA",s2t:"Comparacao arquitecturas — casos de uso maritimos",
      s2:"PIRAMIDE AUTOMATIZACAO (ISA-95):\nNivel 0: Campo | Nivel 1: PLC | Nivel 2: DCS | Nivel 3: SCADA\n\nPLC: 1 maquina, inferior a 10ms, ME/gerador/purificador\nDCS: processo continuo, 50-500ms, SM VLCC completa\nSCADA: supervisao multi-site frota, 1-60s",
      p3:"PARTE 3 — REGULACAO PID",s3t:"Proporcional - Integral - Derivado: simulacao",
      s3:"BOUCLE PID: regulador mais usado na industria (95%+)\nP: reaccao imediata ao erro\nI: elimina o erro estatico residual\nD: amorte as oscilacoes\nExemplos maritimos: temp. agua refrigeracao ME, pressao oleo lubrificacao",
      p4:"PARTE 4 — SCADA MARITIMO",s4t:"Sinoptico — mimic diagram — alarmes",
      s4:"SINOPTICO (MIMIC DIAGRAM):\nRepresentacao grafica do processo\nFUNCOES SCADA: supervisao tempo real, gestao alarmes, historizacao, relatorios, manutencao preditiva, monitorizacao frota\nCOMUNICACAO: OPC-UA, Modbus TCP, Profinet, NMEA 2000",
      p5:"EXERCICIOS AVANCADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES PREMIUM+",
      sumT:"RESUMO — LICAO e7 L2",
      sumP:["PLC = Programmable Logic Controller — controlo local inferior a 10ms","DCS = controlo distribuido multi-processo 50-500ms","SCADA = supervisao multi-site frota","Ciclo SCAN: entradas > programa > saidas > com","4-20mA: padrao analogico deteccao avaria (0mA)","PID: P=proporcional I=integral D=derivado","I corrige erro estatico residual","Sinoptico SCADA = diagrama grafico processo","El Faro 2015: alertas SCADA ignorados => 33 mortos","OPC-UA: interoperabilidade sistemas heterogeneos"],
      learnedP:["Arquitectura PLC e ciclo SCAN","Diferencas PLC / DCS / SCADA","Regulacao PID e as suas 3 accoes","Sinoptico SCADA maritimo","MV El Faro 2015: consequencia alertas ignorados"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE7_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
              {lang==="fr"?"Lecon 2/5":lang==="en"?"Lesson 2/5":lang==="es"?"Leccion 2/5":"Licao 2/5"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{padding:"3px 9px",borderRadius:20,background:"rgba(255,179,0,0.15)",
              border:`1px solid ${C.amber}44`,fontSize:9,color:C.amber,fontWeight:800}}>
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

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 50px",position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all 0.55s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,
              marginBottom:12,background:"rgba(0,229,255,0.1)",border:`1px solid ${C.cyan}44`,
              fontSize:10,color:C.cyan,fontWeight:700}}>
              {lc.badge}
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:800,color:C.white,
              lineHeight:1.3,margin:"0 0 18px"}}>
              {lc.title}
            </h1>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${C.cyan}44`,
              borderLeft:`3px solid ${C.cyan}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"⚙️",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.cyan,svg:<PLCArchSVG lang={lang}/>,
                svgLabel:lang==="fr"?"ARCHITECTURE PLC — INTERACTIF":lang==="en"?"PLC ARCHITECTURE — INTERACTIVE":lang==="es"?"ARQUITECTURA PLC — INTERACTIVO":"ARQUITECTURA PLC — INTERATIVO"},
              {icon:"🔗",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.amber,svg:<SystemCompSVG lang={lang}/>,
                svgLabel:lang==="fr"?"PLC vs DCS vs SCADA — COMPARAISON":lang==="en"?"PLC vs DCS vs SCADA — COMPARISON":lang==="es"?"PLC vs DCS vs SCADA — COMPARACION":"PLC vs DCS vs SCADA — COMPARACAO"},
              {icon:"📊",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.green,svg:<PIDSimSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SIMULATEUR PID — INTERACTIF":lang==="en"?"PID SIMULATOR — INTERACTIVE":lang==="es"?"SIMULADOR PID — INTERACTIVO":"SIMULADOR PID — INTERATIVO"},
              {icon:"🖥️",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.scada,svg:<SCADAMimicSVG lang={lang}/>,
                svgLabel:lang==="fr"?"SYNOPTIQUE SCADA — INTERACTIF":lang==="en"?"SCADA MIMIC — INTERACTIVE":lang==="es"?"SINOPTICO SCADA — INTERACTIVO":"SINOPTICO SCADA — INTERATIVO"},
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
                {lang==="fr"?"Quiz — PLC, DCS & SCADA":lang==="en"?"Quiz — PLC, DCS & SCADA":lang==="es"?"Quiz — PLC, DCS & SCADA":"Quiz — PLC, DCS & SCADA"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · e7 L2</div>
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
                borderRadius:20,background:`rgba(0,229,255,0.1)`,border:`1px solid ${C.cyan}44`,
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
              {lang==="fr"?"LECON 3 — AUTOMATISATION ME =>":lang==="en"?"LESSON 3 — ME AUTOMATION =>":lang==="es"?"LECCION 3 — AUTOMATIZACION ME =>":"LICAO 3 — AUTOMATIZACAO ME =>"}
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
