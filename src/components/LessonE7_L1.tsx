import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  amber:"#ffb300", amber2:"#ffd54f", amber3:"#fff8e1",
  cyan:"#00e5ff", cyan2:"#80deea", cyan3:"#e0f7fa",
  steel:"#455a64", steel2:"#78909c", steel3:"#b0bec5",
  green:"#00e676", green2:"#69f0ae", greenDim:"#1b5e20",
  red:"#ff1744", red2:"#ff5252", redDim:"#b71c1c",
  orange:"#ff6d00", orange2:"#ff9e40",
  blue:"#2979ff", blue2:"#82b1ff",
  purple:"#d500f9", purple2:"#ea80fc",
  white:"#f0f4ff", muted:"rgba(176,190,197,0.7)", dim:"rgba(176,190,197,0.35)",
  border:"rgba(0,229,255,0.18)", borderAmber:"rgba(255,179,0,0.22)",
  gold:"#c9922a", gold2:"#e8b94f",
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
      borderRadius:20,padding:"16px",backdropFilter:"blur(12px)",
      boxShadow:`0 4px 32px rgba(0,229,255,0.05)`,...style}}>
      {children}
    </div>
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

// ══════════════════════════════════════
// SVG 1 — ENGINE ROOM UMS MAP
// ══════════════════════════════════════
function EngineRoomMapSVG({ lang }) {
  const [activeZone, setActiveZone] = useState(null);
  const [alarmZones, setAlarmZones] = useState({});
  const [tick, setTick] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  useEffect(() => {
    const id = setInterval(() => setTick(t=>t+1), 600);
    return () => clearInterval(id);
  }, []);

  const zones = [
    { id:"me", x:95, y:42, w:100, h:68, label:"MAIN ENGINE", icon:"⚙️", color:C.cyan,
      type:lbl("Moteur principal MAN B&W","MAN B&W main engine","Motor principal MAN B&W","Motor principal MAN B&W"),
      sensors:lbl("Temp paliers | Vibrations | Niveau huile | Pression suralimentation","Bearing temp | Vibrations | Oil level | Boost pressure","Temp cojinetes | Vibraciones | Nivel aceite | Presion sobrealimentacion","Temp mancais | Vibracoes | Nivel oleo | Pressao sobrealimentacao") },
    { id:"gen1", x:210, y:30, w:62, h:38, label:"DG1", icon:"⚡", color:C.amber,
      type:lbl("Generateur diesel 1","Diesel generator 1","Generador diesel 1","Gerador diesel 1"),
      sensors:lbl("V / Hz / kW / cos(phi) / T eau / P huile","V / Hz / kW / cos(phi) / Water T / Oil P","V / Hz / kW / cos(phi) / T agua / P aceite","V / Hz / kW / cos(phi) / T agua / P oleo") },
    { id:"gen2", x:210, y:76, w:62, h:38, label:"DG2", icon:"⚡", color:C.amber,
      type:lbl("Generateur diesel 2","Diesel generator 2","Generador diesel 2","Gerador diesel 2"),
      sensors:lbl("V / Hz / kW / cos(phi) / T eau / P huile","V / Hz / kW / cos(phi) / Water T / Oil P","V / Hz / kW / cos(phi) / T agua / P aceite","V / Hz / kW / cos(phi) / T agua / P oleo") },
    { id:"sep", x:18, y:30, w:64, h:50, label:"PURIF.", icon:"🔄", color:C.purple2,
      type:lbl("Purificateurs HFO / LO","HFO / LO purifiers","Purificadores HFO / LO","Purificadores HFO / LO"),
      sensors:lbl("Temperature | Debit | Niveau boue | Alarme eau","Temperature | Flow | Sludge level | Water alarm","Temperatura | Caudal | Nivel lodo | Alarma agua","Temperatura | Caudal | Nivel lama | Alarme agua") },
    { id:"bo", x:18, y:88, w:64, h:42, label:"BOILER", icon:"🔥", color:C.orange2,
      type:lbl("Chaudiere auxiliaire","Auxiliary boiler","Caldera auxiliar","Caldeira auxiliar"),
      sensors:lbl("Pression | Niveau eau | Detection flamme | CO2","Pressure | Water level | Flame detection | CO2","Presion | Nivel agua | Deteccion llama | CO2","Pressao | Nivel agua | Deteccao chama | CO2") },
    { id:"sw", x:95, y:118, w:100, h:38, label:"COOLING", icon:"💧", color:C.blue2,
      type:lbl("Circuits refroidissement SW/FW","SW/FW cooling circuits","Circuitos refrigeracion SW/FW","Circuitos refrigeracao SW/FW"),
      sensors:lbl("Debit | Pression | Temperature | Haut bas niveaux","Flow | Pressure | Temperature | High low levels","Caudal | Presion | Temperatura | Niveles alto bajo","Caudal | Pressao | Temperatura | Niveis alto baixo") },
    { id:"fo", x:18, y:138, w:64, h:32, label:"FO SVC", icon:"⛽", color:C.orange,
      type:lbl("Service combustible HFO/MDO","HFO/MDO fuel service","Servicio combustible HFO/MDO","Servico combustivel HFO/MDO"),
      sensors:lbl("Niveau | Pression | Viscosite | Temperature","Level | Pressure | Viscosity | Temperature","Nivel | Presion | Viscosidad | Temperatura","Nivel | Pressao | Viscosidade | Temperatura") },
    { id:"blg", x:210, y:122, w:62, h:48, label:"BILGE", icon:"🌊", color:C.steel2,
      type:lbl("Sentines / OWS","Bilge / OWS","Sentinas / OWS","Poroes / OWS"),
      sensors:lbl("Niveau | Alarme 15 ppm | Pompe ejection","Level | 15 ppm alarm | Ejector pump","Nivel | Alarma 15 ppm | Bomba eyeccion","Nivel | Alarme 15 ppm | Bomba ejecao") },
  ];

  const toggleAlarm = (id) => {
    setAlarmZones(prev => ({...prev, [id]:!prev[id]}));
    setActiveZone(id);
  };

  const blink = tick % 2 === 0;
  const cur = zones.find(z=>z.id===activeZone);
  const W = 290, H = 190;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <defs>
          <pattern id="egrid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0L0 0 0 18" fill="none" stroke={C.cyan} strokeWidth="0.12" opacity="0.25"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#egrid)" rx="8"/>
        <rect x={0} y={0} width={W} height={17} fill="rgba(0,229,255,0.07)" rx="8"/>
        <text x={W/2} y={11.5} textAnchor="middle" fontSize="7" fill={C.cyan} fontWeight="800" letterSpacing="2">
          {lbl("SALLE DES MACHINES — CARTE UMS","ENGINE ROOM — UMS MAP","SALA DE MAQUINAS — MAPA UMS","CASA DAS MAQUINAS — MAPA UMS")}
        </text>
        {zones.map(z => {
          const alarm = !!alarmZones[z.id];
          const active = activeZone === z.id;
          const sc = alarm ? (blink?C.red:`${C.red}66`) : active ? z.color : `${z.color}44`;
          const fc = alarm ? "rgba(255,23,68,0.14)" : active ? `${z.color}16` : `${z.color}07`;
          return (
            <g key={z.id} style={{cursor:"pointer"}} onClick={()=>toggleAlarm(z.id)}>
              <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="5"
                fill={fc} stroke={sc} strokeWidth={active||alarm?1.8:0.8}/>
              {alarm && blink && (
                <rect x={z.x-1} y={z.y-1} width={z.w+2} height={z.h+2} rx="6"
                  fill="none" stroke={C.red} strokeWidth="2.5" opacity="0.25"/>
              )}
              <text x={z.x+z.w/2} y={z.y+z.h/2-4} textAnchor="middle" fontSize="12">{z.icon}</text>
              <text x={z.x+z.w/2} y={z.y+z.h/2+7} textAnchor="middle" fontSize="5.8"
                fill={alarm?C.red:z.color} fontWeight="700">{z.label}</text>
              {alarm && (
                <text x={z.x+z.w/2} y={z.y+z.h/2+16} textAnchor="middle" fontSize="5"
                  fill={C.red} fontWeight="800">ALM</text>
              )}
            </g>
          );
        })}
        <text x={W/2} y={H-5} textAnchor="middle" fontSize="6.5" fill={C.dim}>
          {lbl("Taper zone : info / activer-desactiver alarme","Tap zone: info / toggle alarm","Tocar zona: info / activar-desactivar alarma","Tocar zona: info / ativar-desativar alarme")}
        </text>
      </svg>
      {cur ? (
        <div style={{marginTop:8,padding:"12px 14px",borderRadius:15,
          background:`${cur.color}0e`,border:`1px solid ${cur.color}44`,
          boxShadow:`0 0 18px ${cur.color}12`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:18}}>{cur.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:800,color:cur.color,letterSpacing:0.3}}>{cur.label}</div>
              <div style={{fontSize:10,color:C.muted}}>{cur.type}</div>
            </div>
            {alarmZones[cur.id] && (
              <div style={{padding:"3px 8px",borderRadius:8,background:"rgba(255,23,68,0.2)",
                border:`1px solid ${C.red}`,fontSize:8,color:C.red,fontWeight:800}}>
                ⚠️ ALARM
              </div>
            )}
          </div>
          <div style={{fontSize:10,color:C.steel3,lineHeight:1.7}}>
            <span style={{color:C.cyan2,fontWeight:700}}>
              {lbl("Capteurs actifs:","Active sensors:","Sensores activos:","Sensores ativos:")}
            </span> {cur.sensors}
          </div>
        </div>
      ) : (
        <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>
          {[{c:C.green2,l:lbl("Normal","Normal","Normal","Normal")},
            {c:C.amber,l:lbl("Alerte","Warning","Alerta","Alerta")},
            {c:C.red,l:lbl("Alarme","Alarm","Alarma","Alarme")}].map((item,i)=>(
            <div key={i} style={{padding:"6px",borderRadius:8,background:`${item.c}0f`,
              border:`1px solid ${item.c}33`,fontSize:8,color:item.c,textAlign:"center",fontWeight:700}}>
              {item.l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — ALARM HIERARCHY
// ══════════════════════════════════════
function AlarmHierarchySVG({ lang }) {
  const [step, setStep] = useState(0);
  const [acked, setAcked] = useState(false);
  const [tick, setTick] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  useEffect(() => {
    if (acked || step===0) return;
    const id = setInterval(()=>setTick(t=>t+1), 500);
    return () => clearInterval(id);
  }, [acked, step]);

  const blink = tick%2===0 && !acked && step>0;

  const levels = [
    { y:22, icon:"🔍", color:C.steel2, active:step>=0,
      label:lbl("CAPTEUR / DETECTEUR","SENSOR / DETECTOR","SENSOR / DETECTOR","SENSOR / DETECTOR"),
      sub:lbl("Sonde T°-P-niveau-vibrations — signal 4-20mA","Temp-pressure-level-vibration probe — 4-20mA signal","Sonda T°-P-nivel-vibracion — senal 4-20mA","Sonda T°-P-nivel-vibracao — sinal 4-20mA") },
    { y:68, icon:"🖥️", color:C.cyan, active:step>=1,
      label:lbl("AMS — PANNEAU ALARMES","AMS — ALARM PANEL","AMS — PANEL ALARMAS","AMS — PAINEL ALARMES"),
      sub:lbl("Alarm Monitoring System — enregistrement horodatage","Alarm Monitoring System — timestamp log","Alarm Monitoring System — registro horario","Alarm Monitoring System — registo horario") },
    { y:114, icon:"🔔", color:C.amber, active:step>=2,
      label:lbl("ALARME ACOUSTIQUE SM","ENGINE ROOM AUDIBLE","ALARMA ACUSTICA SM","ALARME ACUSTICO SM"),
      sub:lbl("Klaxon 90 dB + Flash — Officier de quart SM","90 dB horn + Strobe — ER watchkeeper","Claxon 90 dB + Flash — Oficial guardia SM","Claxon 90 dB + Flash — Oficial quarto SM") },
    { y:160, icon:"🛳️", color:C.red, active:step>=3,
      label:lbl("TRANSFERT PASSERELLE","BRIDGE TRANSFER","TRANSFERENCIA PUENTE","TRANSFERENCIA PONTE"),
      sub:lbl("Non acquittee en 30s => OOW — SOLAS II-1/Reg.51","Not acked in 30s => OOW — SOLAS II-1/Reg.51","No reconocida en 30s => OOW — SOLAS II-1/Reg.51","Nao reconhecida em 30s => OOW — SOLAS II-1/Reg.51") },
  ];

  const W=290, H=208;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        {levels.map((lv,i)=>{
          if (i<3) {
            const next = levels[i+1];
            const conn = step>i;
            return (
              <g key={"conn"+i}>
                <line x1={W/2} y1={lv.y+32} x2={W/2} y2={next.y}
                  stroke={conn?next.color:C.steel} strokeWidth="2"
                  strokeDasharray={conn?"none":"4,3"} opacity={conn?0.85:0.25}/>
                {conn && (
                  <polygon points={`${W/2-5},${next.y-8} ${W/2+5},${next.y-8} ${W/2},${next.y}`}
                    fill={next.color} opacity="0.9"/>
                )}
              </g>
            );
          }
          return null;
        })}
        {levels.map((lv,i)=>(
          <g key={i}>
            <rect x={28} y={lv.y} width={W-56} height={34} rx="8"
              fill={lv.active?`${lv.color}14`:"rgba(13,31,60,0.4)"}
              stroke={lv.active?(blink&&i===step?lv.color:`${lv.color}77`):C.steel+"33"}
              strokeWidth={lv.active?1.5:0.7}/>
            {lv.active && blink && i===step && (
              <rect x={26} y={lv.y-1} width={W-52} height={36} rx="9"
                fill="none" stroke={lv.color} strokeWidth="2.5" opacity="0.2"/>
            )}
            <text x={48} y={lv.y+14} fontSize="13">{lv.icon}</text>
            <text x={66} y={lv.y+13} fontSize="7.5" fill={lv.active?lv.color:C.dim}
              fontWeight={lv.active?"800":"400"}>{lv.label}</text>
            <text x={66} y={lv.y+25} fontSize="6" fill={lv.active?C.steel3:C.dim}>{lv.sub}</text>
          </g>
        ))}
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
        <button onClick={()=>{if(step<3){setStep(s=>s+1);setAcked(false);}}}
          style={{padding:"9px 4px",borderRadius:11,
            background:step<3?"rgba(255,23,68,0.2)":"rgba(255,23,68,0.06)",
            border:`1px solid ${C.red}55`,color:step<3?C.red:C.dim,
            fontSize:10,fontWeight:800,cursor:"pointer"}}>
          {lbl("DECLENCHER","TRIGGER","ACTIVAR","ATIVAR")} ▶
        </button>
        <button onClick={()=>setAcked(true)}
          style={{padding:"9px 4px",borderRadius:11,
            background:step>0?"rgba(0,230,118,0.18)":"rgba(0,230,118,0.04)",
            border:`1px solid ${C.green}55`,color:step>0?C.green:C.dim,
            fontSize:11,fontWeight:800,cursor:"pointer"}}>
          ✓ ACK
        </button>
        <button onClick={()=>{setStep(0);setAcked(false);setTick(0);}}
          style={{padding:"9px 4px",borderRadius:11,background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,color:C.muted,fontSize:10,fontWeight:700,cursor:"pointer"}}>
          RESET
        </button>
      </div>
      <div style={{marginTop:8,padding:"9px 12px",borderRadius:12,
        background:acked?"rgba(0,230,118,0.08)":step===3?"rgba(255,23,68,0.08)":"rgba(0,229,255,0.05)",
        border:`1px solid ${acked?C.green:step===3?C.red:C.cyan}33`,
        fontSize:10,color:acked?C.green:step===3?C.red:C.cyan,lineHeight:1.6}}>
        {acked
          ? lbl("✓ Alarme acquittee — Timestamp enregistre dans AMS","✓ Alarm acknowledged — Timestamp logged in AMS","✓ Alarma reconocida — Registro AMS con marca horaria","✓ Alarme reconhecida — AMS com marca temporal")
          : step===0
          ? lbl("Systeme veille — UMS actif — Tous capteurs OK","Standby — UMS active — All sensors OK","Sistema espera — UMS activo — Sensores OK","Sistema espera — UMS ativo — Sensores OK")
          : step===3
          ? lbl("SOLAS II-1 : Alarme transferee passerelle — OOW requis SM dans 30 min","SOLAS II-1: Alarm transferred to bridge — OOW required ER within 30 min","SOLAS II-1: Alarma transferida puente — OOW requerido SM en 30 min","SOLAS II-1: Alarme transferida ponte — OOW necessario SM em 30 min")
          : lbl("Propagation alarme...","Alarm propagating...","Propagacion alarma...","Propagacao alarme...")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — UMS INSPECTION ROUND
// ══════════════════════════════════════
function InspectionRoundSVG({ lang }) {
  const [checked, setChecked] = useState({});
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const items = [
    { id:"i1", icon:"⚙️", color:C.cyan,
      fr:"ME — Paliers, vibrations, fuites huile, RD",
      en:"ME — Bearings, vibrations, oil leaks, RD",
      es:"ME — Cojinetes, vibraciones, fugas aceite, RD",
      pt:"ME — Mancais, vibracoes, fugas oleo, RD" },
    { id:"i2", icon:"⚡", color:C.amber,
      fr:"Generateurs — V / Hz / kW / cos phi / alarmes",
      en:"Generators — V / Hz / kW / cos phi / alarms",
      es:"Generadores — V / Hz / kW / cos phi / alarmas",
      pt:"Geradores — V / Hz / kW / cos phi / alarmes" },
    { id:"i3", icon:"🔥", color:C.orange2,
      fr:"Chaudiere — Pression / Niveau eau / Flamme",
      en:"Boiler — Pressure / Water level / Flame",
      es:"Caldera — Presion / Nivel agua / Llama",
      pt:"Caldeira — Pressao / Nivel agua / Chama" },
    { id:"i4", icon:"🔄", color:C.purple2,
      fr:"Purificateurs — T° / Debit / Boues",
      en:"Purifiers — Temp / Flow / Sludge",
      es:"Purificadores — T° / Caudal / Lodos",
      pt:"Purificadores — T° / Caudal / Lamas" },
    { id:"i5", icon:"💧", color:C.blue2,
      fr:"Pompes — Fuites, pression, vibrations",
      en:"Pumps — Leaks, pressure, vibrations",
      es:"Bombas — Fugas, presion, vibraciones",
      pt:"Bombas — Fugas, pressao, vibracoes" },
    { id:"i6", icon:"🚨", color:C.red2,
      fr:"Sentines — Niveaux / OWS / Alarmes actives",
      en:"Bilges — Levels / OWS / Active alarms",
      es:"Sentinas — Niveles / OWS / Alarmas activas",
      pt:"Poroes — Niveis / OWS / Alarmes activos" },
  ];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(()=>setTimer(t=>{ if(t>=3600){setRunning(false);return 3600;}return t+1;}),1000);
    return ()=>clearInterval(id);
  },[running]);

  const toggle = (id) => {
    const next = {...checked,[id]:!checked[id]};
    setChecked(next);
    if (items.every(it=>next[it.id])) { setDone(true); setRunning(false); }
  };

  const cnt = items.filter(it=>checked[it.id]).length;
  const pct = Math.round(cnt/items.length*100);
  const mm = String(Math.floor(timer/60)).padStart(2,"0");
  const ss = String(timer%60).padStart(2,"0");

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div>
          <div style={{fontSize:11,fontWeight:800,color:C.cyan,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>
            {lbl("RONDE UMS","UMS ROUND","RONDA UMS","RONDA UMS")}
          </div>
          <div style={{fontSize:9,color:C.muted}}>
            {lbl("Requis toutes les 30 min — SOLAS II-1","Required every 30 min — SOLAS II-1","Requerido cada 30 min — SOLAS II-1","Requerido de 30 em 30 min — SOLAS II-1")}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontFamily:"monospace",fontSize:19,fontWeight:800,
            color:timer>1800?C.red:C.cyan,letterSpacing:2}}>
            {mm}:{ss}
          </div>
          <button onClick={()=>{if(!done)setRunning(v=>!v);}}
            style={{padding:"7px 11px",borderRadius:10,
              background:running?"rgba(255,23,68,0.2)":"rgba(0,229,255,0.15)",
              border:`1px solid ${running?C.red:C.cyan}55`,
              color:running?C.red:C.cyan,fontSize:11,fontWeight:800,cursor:"pointer"}}>
            {running?"⏸":"▶"}
          </button>
          <button onClick={()=>{setChecked({});setTimer(0);setRunning(false);setDone(false);}}
            style={{padding:"7px 11px",borderRadius:10,background:"rgba(69,90,100,0.18)",
              border:`1px solid ${C.steel}44`,color:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
            ↺
          </button>
        </div>
      </div>
      <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,
          background:`linear-gradient(90deg,${C.cyan},${C.green})`,
          borderRadius:4,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{fontSize:9,color:C.muted,textAlign:"right",marginBottom:10}}>
        {cnt}/{items.length} — {pct}%
      </div>
      {items.map(item=>{
        const ok = !!checked[item.id];
        return (
          <div key={item.id} onClick={()=>toggle(item.id)}
            style={{display:"flex",alignItems:"center",gap:10,
              padding:"11px 13px",marginBottom:7,borderRadius:14,cursor:"pointer",
              background:ok?`${item.color}12`:"rgba(10,22,40,0.7)",
              border:`1px solid ${ok?item.color:`${item.color}28`}`,
              transition:"all 0.25s",
              boxShadow:ok?`0 2px 14px ${item.color}16`:"none"}}>
            <div style={{width:24,height:24,borderRadius:8,flexShrink:0,
              background:ok?item.color:"rgba(255,255,255,0.05)",
              border:`1.5px solid ${ok?item.color:`${item.color}50`}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.2s"}}>
              {ok && <span style={{color:C.bg0,fontSize:14,fontWeight:900,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
            <div style={{fontSize:11,color:ok?item.color:C.white,fontWeight:ok?700:400,lineHeight:1.4}}>
              {lbl(item.fr,item.en,item.es,item.pt)}
            </div>
          </div>
        );
      })}
      {done && (
        <div style={{marginTop:10,padding:"14px",borderRadius:16,
          background:"rgba(0,230,118,0.09)",border:`1.5px solid ${C.green}55`,textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:4}}>✅</div>
          <div style={{fontSize:13,fontWeight:800,color:C.green,fontFamily:"'Cinzel',serif",marginBottom:4}}>
            {lbl("RONDE COMPLETEE","ROUND COMPLETE","RONDA COMPLETADA","RONDA CONCLUIDA")}
          </div>
          <div style={{fontSize:10,color:C.muted}}>
            {lbl("Duree","Duration","Duracion","Duracao")}: {mm}:{ss} | {lbl("Signer le registre UMS","Sign UMS log","Firmar registro UMS","Assinar registo UMS")}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — DEAD MAN ALARM
// ══════════════════════════════════════
function DeadManAlarmSVG({ lang }) {
  const CYCLE = 30;
  const [timeLeft, setTimeLeft] = useState(CYCLE);
  const [phase, setPhase] = useState("idle");
  const [pressCount, setPressCount] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  useEffect(() => {
    if (phase!=="countdown"&&phase!=="warning") return;
    if (timeLeft<=0){setPhase("alarm");return;}
    const id = setTimeout(()=>{
      setTimeLeft(t=>{
        const n=t-1;
        if(n<=8&&phase==="countdown") setPhase("warning");
        return n;
      });
    },180);
    return ()=>clearTimeout(id);
  },[phase,timeLeft]);

  const start=()=>{setPhase("countdown");setTimeLeft(CYCLE);};
  const press=()=>{
    if(phase==="countdown"||phase==="warning"){setTimeLeft(CYCLE);setPhase("countdown");setPressCount(c=>c+1);}
    if(phase==="alarm"){setPhase("acked");}
  };
  const reset=()=>{setPhase("idle");setTimeLeft(CYCLE);setPressCount(0);};

  const pct=(timeLeft/CYCLE)*100;
  const col=phase==="alarm"?C.red:phase==="warning"?C.amber:phase==="acked"?C.green:C.cyan;

  const R=52, CX=75, CY=78;
  const startAngle=-Math.PI/2;
  const endAngle=startAngle+(pct/100)*2*Math.PI;
  const x1=CX+R*Math.cos(startAngle), y1=CY+R*Math.sin(startAngle);
  const x2=CX+R*Math.cos(endAngle), y2=CY+R*Math.sin(endAngle);
  const largeArc=pct>50?1:0;
  const arcPath=`M ${x1.toFixed(2)},${y1.toFixed(2)} A ${R},${R} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`;

  const W=290, H=168;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg0} rx="8"/>
        <text x={W/2} y={13} textAnchor="middle" fontSize="7.5" fill={C.amber} fontWeight="800" letterSpacing="1.5">
          {lbl("ALARME HOMME MORT (DMA)","DEAD MAN ALARM (DMA)","ALARMA HOMBRE MUERTO (DMA)","ALARME HOMEM MORTO (DMA)")}
        </text>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={`${col}18`} strokeWidth="11"/>
        {phase!=="idle" && (
          <path d={arcPath} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round"/>
        )}
        {(phase==="warning"||phase==="alarm") && (
          <circle cx={CX} cy={CY} r={R+8} fill="none" stroke={col} strokeWidth="1" opacity="0.35"/>
        )}
        <circle cx={CX} cy={CY} r={R-14} fill={`${col}09`} stroke={`${col}22`} strokeWidth="1"/>
        <text x={CX} y={CY-5} textAnchor="middle"
          fontSize={phase==="idle"?10:phase==="acked"?11:20}
          fill={col} fontWeight="900" fontFamily="monospace">
          {phase==="idle"?"DMA":phase==="acked"?"ACK":phase==="alarm"?"!":timeLeft}
        </text>
        <text x={CX} y={CY+12} textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {phase==="idle"?lbl("INACTIF","INACTIVE","INACTIVO","INATIVO")
          :phase==="countdown"?lbl("COMPTE","COUNTDOWN","CUENTA","CONTAGEM")
          :phase==="warning"?lbl("AVERTISSEMENT","WARNING","AVISO","AVISO")
          :phase==="alarm"?lbl("ALARME PONT","BRIDGE ALARM","ALARMA PUENTE","ALARME PONTE")
          :lbl("ACQUITTEE","ACK","RECONOCIDA","RECONHECIDA")}
        </text>
        {/* Info panel */}
        <rect x={160} y={20} width={122} height={135} rx="8"
          fill="rgba(13,31,60,0.75)" stroke={`${col}22`} strokeWidth="1"/>
        <text x={221} y={34} textAnchor="middle" fontSize="7" fill={C.muted} fontWeight="700" letterSpacing="1">
          {lbl("PRINCIPE DMA","DMA PRINCIPLE","PRINCIPIO DMA","PRINCIPIO DMA")}
        </text>
        {[
          lbl("Periode max: 30 min","Max period: 30 min","Periodo max: 30 min","Periodo max: 30 min"),
          lbl("Signal presence requis","Presence signal required","Senal presencia requerida","Sinal presenca necessario"),
          lbl("Pas ACK => alarme SM","No ACK => ER alarm","No ACK => alarma SM","No ACK => alarme SM"),
          lbl("+ 30s => passerelle","+ 30s => bridge","+ 30s => puente","+ 30s => ponte"),
          lbl("Base SOLAS V/Reg.19","Base SOLAS V/Reg.19","Base SOLAS V/Reg.19","Base SOLAS V/Reg.19"),
          lbl("Presses: "+pressCount,"Presses: "+pressCount,"Pulsaciones: "+pressCount,"Pressoes: "+pressCount),
        ].map((line,i)=>(
          <text key={i} x={221} y={50+i*17} textAnchor="middle" fontSize="6.8"
            fill={i===5?C.amber:C.steel3}>{line}</text>
        ))}
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginTop:8}}>
        <button onClick={phase==="idle"?start:press} disabled={phase==="acked"}
          style={{padding:"15px",borderRadius:15,
            background:phase==="alarm"?"rgba(255,23,68,0.28)":phase==="warning"?"rgba(255,179,0,0.22)":phase==="acked"?"rgba(0,230,118,0.12)":"rgba(0,229,255,0.12)",
            border:`2px solid ${col}`,color:col,
            fontSize:phase==="idle"?11:13,fontWeight:800,
            cursor:phase==="acked"?"default":"pointer",letterSpacing:0.5,
            boxShadow:phase!=="idle"&&phase!=="acked"?`0 0 22px ${col}28`:"none",
            transition:"all 0.2s"}}>
          {phase==="idle"?lbl("▶ ACTIVER DMA","▶ ACTIVATE DMA","▶ ACTIVAR DMA","▶ ATIVAR DMA")
          :phase==="alarm"?lbl("⚠️ ACQUITTER","⚠️ ACK ALARM","⚠️ RECONOCER","⚠️ RECONHECER")
          :phase==="acked"?lbl("✓ ACQUITTEE","✓ ACKNOWLEDGED","✓ RECONOCIDA","✓ RECONHECIDA")
          :lbl("✋ SIGNAL PRESENCE","✋ PRESENCE SIGNAL","✋ SENAL PRESENCIA","✋ SINAL PRESENCA")}
        </button>
        <button onClick={reset}
          style={{padding:"15px",borderRadius:15,background:"rgba(69,90,100,0.18)",
            border:`1px solid ${C.steel}44`,color:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          RESET
        </button>
      </div>
      <div style={{marginTop:7,padding:"9px 13px",borderRadius:12,
        background:`${col}08`,border:`1px solid ${col}20`,fontSize:10,color:col,lineHeight:1.55}}>
        {phase==="idle"?lbl("DMA inactif — Activer pour simuler","DMA inactive — Activate to simulate","DMA inactivo — Activar para simular","DMA inativo — Ativar para simular")
        :phase==="countdown"?lbl("Appuyer pour signaler presence avant fin compte","Press to signal presence before countdown","Pulsar para senalar presencia antes de fin","Premir para assinalar presenca antes do fim")
        :phase==="warning"?lbl("ATTENTION — Acquitter rapidement !","WARNING — Acknowledge quickly!","ATENCION — Reconocer rapidamente!","ATENCAO — Reconhecer rapidamente!")
        :phase==="alarm"?lbl("ALARME — Transfert passerelle en cours — OOW requis","ALARM — Bridge transfer in progress — OOW required","ALARMA — Transferencia puente en curso — OOW requerido","ALARME — Transferencia ponte em curso — OOW necessario")
        :lbl("Acquittee — "+pressCount+" signaux enregistres","Acknowledged — "+pressCount+" signals logged","Reconocida — "+pressCount+" senales registradas","Reconhecida — "+pressCount+" sinais registados")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MV SEWOL (2014)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MV Sewol — Coree du Sud (2014)",
      teaser:"Ferry 6 825 GT — Chavirage — 304 morts — Alarmes UMS non configurees — Catastrophe nationale",
      what:"Le 16 avril 2014, le ferry sud-coreen MV Sewol (476 personnes, route Incheon-Jeju) chavire dans le detroit de Maenggol. Apres un virage trop serré avec une cargaison surcharge et mal arrimee, le navire prend une gite croissante a babord. Le systeme AMS ne detecte pas la gite car les seuils d'alarme de stabilite n'ont pas ete configures. Le personnel de passerelle abandonne le navire avant les passagers. L'equipage demande aux passagers de rester a leur place alors que le navire coule. 304 morts dont 250 lyceens.",
      cause:"- AMS non configure — alarmes de gite absentes du systeme\n- Gite progressive non signalee pendant plus de 30 minutes\n- Cargaison surcharge de 3 fois la capacite autorisee\n- ISM Code non applique — SMS de la compagnie inexistant en pratique\n- Officiers sans formation adequate en stabilite dynamique\n- Capitaine ayant quitte le navire avant les passagers\n- Procedures evacuation non executees — instructions contradictoires",
      lessons:"- Configuration obligatoire et verification des seuils alarmes AMS\n- Audit PSC : test des alarmes de stabilite / gite sur tous les ferries\n- SOLAS : reforme requirements systemes alarmes navires a passagers\n- Corée du Sud : reforme totale la reglementation maritime nationale\n- VDR : enregistrement continu angle de gite rendu obligatoire\n- ISM : verification effective du SMS lors de chaque PSC",
      link:"Lien L1 UMS : Le Sewol demontre qu'un AMS mal configure est pire qu'un systeme absent car il donne une fausse impression de securite. Chaque alarme UMS doit etre testee, calibree et documentee. Un systeme UMS fiable est la base de la navigation en mode non surveille.",
    },
    en:{
      title:"MV Sewol — South Korea (2014)",
      teaser:"6,825 GT ferry — Capsizing — 304 deaths — UMS alarms not configured — National disaster",
      what:"On April 16, 2014, South Korean ferry MV Sewol (476 people, Incheon-Jeju route) capsized in the Maenggol Strait. After an overly sharp turn with an overloaded and improperly secured cargo, the vessel developed a progressive port list. The AMS system failed to detect the list because stability alarm thresholds had not been configured. Bridge personnel abandoned the vessel before passengers. Crew told passengers to stay in place as the vessel sank. 304 deaths including 250 high school students.",
      cause:"- AMS not configured — list alarms absent from system\n- Progressive list unreported for over 30 minutes\n- Cargo overloaded at 3 times authorized capacity\n- ISM Code not applied — company SMS non-existent in practice\n- Officers without adequate dynamic stability training\n- Captain left vessel before passengers\n- Evacuation procedures not executed — contradictory instructions",
      lessons:"- Mandatory AMS alarm threshold configuration and verification\n- PSC audit: stability/list alarm testing on all ferries\n- SOLAS: reform passenger vessel alarm system requirements\n- South Korea: complete national maritime regulation reform\n- VDR: continuous list angle recording made mandatory\n- ISM: effective SMS verification at each PSC",
      link:"L1 UMS Link: Sewol demonstrates that a misconfigured AMS is worse than no system at all, as it creates a false sense of security. Every UMS alarm must be tested, calibrated and documented. A reliable UMS system is the foundation of unmanned machinery space operation.",
    },
    es:{
      title:"MV Sewol — Corea del Sur (2014)",
      teaser:"Ferry 6.825 GT — Naufragio — 304 muertos — Alarmas UMS no configuradas — Catastrofe nacional",
      what:"El 16 de abril de 2014, el ferry surcoreano MV Sewol (476 personas) naufrago en el estrecho de Maenggol. Tras un giro demasiado cerrado con carga sobrecargada, el buque desarrollo una escora progresiva a babor. El sistema AMS no detecto la escora porque los umbrales de alarma de estabilidad no estaban configurados. El personal de puente abandono el buque antes que los pasajeros. 304 muertos, 250 estudiantes de bachillerato.",
      cause:"- AMS no configurado — alarmas de escora ausentes del sistema\n- Escora progresiva no senalada durante mas de 30 minutos\n- Carga sobrecargada a 3 veces la capacidad autorizada\n- Codigo ISM no aplicado — SMS de la compania inexistente en la practica\n- Oficiales sin formacion adecuada en estabilidad dinamica\n- Capitan abandono el buque antes que los pasajeros",
      lessons:"- Configuracion obligatoria y verificacion de umbrales de alarma AMS\n- Auditoria PSC: prueba de alarmas de estabilidad en todos los ferries\n- SOLAS: reforma requisitos sistemas alarmas buques de pasajeros\n- Corea del Sur: reforma total de la reglamentacion maritima nacional\n- VDR: registro continuo del angulo de escora obligatorio",
      link:"Vinculo L1 UMS: El Sewol demuestra que un AMS mal configurado es peor que ninguno, pues da una falsa sensacion de seguridad. Cada alarma UMS debe ser probada, calibrada y documentada.",
    },
    pt:{
      title:"MV Sewol — Coreia do Sul (2014)",
      teaser:"Ferry 6.825 GT — Capotamento — 304 mortos — Alarmes UMS nao configurados — Catastrofe nacional",
      what:"A 16 de abril de 2014, o ferry sul-coreano MV Sewol (476 pessoas) capsizou no estreito de Maenggol. Apos uma curva demasiado fechada com carga sobrecarregada, o navio desenvolveu uma inclinacao progressiva a bombordo. O sistema AMS nao detetou a inclinacao porque os limiares de alarme de estabilidade nao tinham sido configurados. O pessoal da ponte abandonou o navio antes dos passageiros. 304 mortos, 250 estudantes de liceu.",
      cause:"- AMS nao configurado — alarmes de inclinacao ausentes do sistema\n- Inclinacao progressiva nao assinalada durante mais de 30 minutos\n- Carga sobrecarregada a 3 vezes a capacidade autorizada\n- Codigo ISM nao aplicado — SMS da companhia inexistente na pratica\n- Oficiais sem formacao adequada em estabilidade dinamica\n- Capitao abandonou o navio antes dos passageiros",
      lessons:"- Configuracao obrigatoria e verificacao dos limiares de alarme AMS\n- Auditoria PSC: teste dos alarmes de estabilidade em todos os ferries\n- SOLAS: reforma requisitos sistemas alarmes navios de passageiros\n- Coreia do Sul: reforma total da regulamentacao maritima nacional\n- VDR: registo continuo do angulo de inclinacao obrigatorio",
      link:"Vinculo L1 UMS: O Sewol demonstra que um AMS mal configurado e pior do que nenhum sistema, pois cria uma falsa sensacao de seguranca. Cada alarme UMS deve ser testado, calibrado e documentado.",
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
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const qs = {
    fr:[
      {id:"q1",q:"Selon SOLAS II-1, quelle est la frequence max des rondes en UMS ?\n(Repondre en minutes)"},
      {id:"q2",q:"Si une alarme UMS n'est pas acquittee en 30s, elle est transferee vers :\n(Repondre : passerelle, chef mecanicien ou salle radio)"},
      {id:"q3",q:"Quel est le nom complet de l'AMS ?\n(Repondre en anglais)"},
      {id:"q4",q:"L'alarme Dead Man detecte l'incapacite de :\n(Repondre : officier de quart SM, chef mecanicien ou capitaine)"},
      {id:"q5",q:"Quelle regulation SOLAS regime les espaces machines UMS ?\n(Repondre : II-1, V ou VI)"},
    ],
    en:[
      {id:"q1",q:"Per SOLAS II-1, what is the max frequency of UMS rounds?\n(Answer in minutes)"},
      {id:"q2",q:"If a UMS alarm is not acked in 30s, it transfers to:\n(Answer: bridge, chief engineer or radio room)"},
      {id:"q3",q:"What is the full name of AMS?\n(Answer in English)"},
      {id:"q4",q:"The Dead Man alarm detects incapacity of:\n(Answer: ER watch officer, chief engineer or captain)"},
      {id:"q5",q:"Which SOLAS regulation governs UMS machinery spaces?\n(Answer: II-1, V or VI)"},
    ],
    es:[
      {id:"q1",q:"Segun SOLAS II-1, ?cual es la frecuencia max de rondas en UMS?\n(Responder en minutos)"},
      {id:"q2",q:"Si una alarma UMS no se reconoce en 30s, se transfiere a:\n(Responder: puente, jefe de maquinas o sala de radio)"},
      {id:"q3",q:"?Cual es el nombre completo del AMS?\n(Responder en ingles)"},
      {id:"q4",q:"La alarma Dead Man detecta la incapacidad del:\n(Responder: oficial guardia SM, jefe de maquinas o capitan)"},
      {id:"q5",q:"?Que regulacion SOLAS regula los UMS?\n(Responder: II-1, V o VI)"},
    ],
    pt:[
      {id:"q1",q:"Segundo SOLAS II-1, qual e a frequencia max das rondas em UMS?\n(Responder em minutos)"},
      {id:"q2",q:"Se um alarme UMS nao for reconhecido em 30s, e transferido para:\n(Responder: ponte, chefe de maquinas ou sala de radio)"},
      {id:"q3",q:"Qual e o nome completo do AMS?\n(Responder em ingles)"},
      {id:"q4",q:"O alarme Dead Man deteta a incapacidade do:\n(Responder: oficial de quarto SM, chefe de maquinas ou capitao)"},
      {id:"q5",q:"Que regulacao SOLAS regula os UMS?\n(Responder: II-1, V ou VI)"},
    ],
  };
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/\s/g,"");
    if(id==="q1") return v==="30"||v==="30min";
    if(id==="q2") return v.includes("passerelle")||v.includes("bridge")||v.includes("puente")||v.includes("ponte");
    if(id==="q3") return v.includes("alarm")&&v.includes("monitor");
    if(id==="q4") return v.includes("quart")||v.includes("watch")||v.includes("guardia")||v.includes("quarto");
    if(id==="q5") return v.includes("ii-1")||v.includes("ii1")||v.includes("2-1");
    return false;
  };
  const corrKey={
    fr:{q1:"30 min",q2:"Passerelle",q3:"Alarm Monitoring System",q4:"Officier de quart SM",q5:"SOLAS II-1"},
    en:{q1:"30 min",q2:"Bridge",q3:"Alarm Monitoring System",q4:"ER watch officer",q5:"SOLAS II-1"},
    es:{q1:"30 min",q2:"Puente",q3:"Alarm Monitoring System",q4:"Oficial guardia SM",q5:"SOLAS II-1"},
    pt:{q1:"30 min",q2:"Ponte",q3:"Alarm Monitoring System",q4:"Oficial de quarto SM",q5:"SOLAS II-1"},
  };
  const expl={
    fr:"OK Q1: 30 min — SOLAS II-1 Reg.46 : ronde toutes les 30 minutes minimum\nOK Q2: Passerelle — OOW (Officer Of the Watch) informe si non acquittee en 30s\nOK Q3: Alarm Monitoring System — centralise, enregistre et transmet toutes alarmes\nOK Q4: Officier de quart SM — previent l'abandon de poste non signale\nOK Q5: SOLAS II-1 — Chapitre Machines, Regulations 46 a 53",
    en:"OK Q1: 30 min — SOLAS II-1 Reg.46: round every 30 minutes minimum\nOK Q2: Bridge — OOW informed if not acknowledged within 30s\nOK Q3: Alarm Monitoring System — centralizes, records and transmits all alarms\nOK Q4: ER watch officer — prevents unreported abandonment of post\nOK Q5: SOLAS II-1 — Chapter Machinery, Regulations 46 to 53",
    es:"OK Q1: 30 min — SOLAS II-1 Reg.46: ronda cada 30 minutos minimo\nOK Q2: Puente — OOW informado si no reconocida en 30s\nOK Q3: Alarm Monitoring System — centraliza, registra y transmite todas alarmas\nOK Q4: Oficial de guardia SM — previene abandono de puesto no comunicado\nOK Q5: SOLAS II-1 — Capitulo Maquinas, Regulaciones 46 a 53",
    pt:"OK Q1: 30 min — SOLAS II-1 Reg.46: ronda de 30 em 30 minutos minimo\nOK Q2: Ponte — OOW informado se nao reconhecida em 30s\nOK Q3: Alarm Monitoring System — centraliza, regista e transmite todos os alarmes\nOK Q4: Oficial de quarto SM — previne abandono de posto nao assinalado\nOK Q5: SOLAS II-1 — Capitulo Maquinas, Regulacoes 46 a 53",
  };
  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;
  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(0,229,255,0.06)",border:`1px solid ${C.cyan}33`,
        fontSize:11,color:C.cyan2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: 30 min | Passerelle en 30s | AMS = Alarm Monitoring System | Dead Man = officier quart | SOLAS II-1"
        :lang==="en"?"Key: 30 min | Bridge in 30s | AMS = Alarm Monitoring System | Dead Man = watch officer | SOLAS II-1"
        :lang==="es"?"Clave: 30 min | Puente en 30s | AMS = Alarm Monitoring System | Dead Man = oficial guardia | SOLAS II-1"
        :"Chave: 30 min | Ponte em 30s | AMS = Alarm Monitoring System | Dead Man = oficial quarto | SOLAS II-1"}
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
// TROPHY HELPER
// ══════════════════════════════════════
function getTrophy(score, total) {
  const pct = score / total;
  if (pct===1)   return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",    en:"Perfect!",     es:"Perfecto!",   pt:"Perfeito!"}};
  if (pct>=0.8)  return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !",  en:"Excellent!",   es:"Excelente!",  pt:"Excelente!"}};
  if (pct>=0.6)  return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",       en:"Well done!",   es:"Bien!",       pt:"Bem feito!"}};
  if (pct>=0.4)  return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",   en:"Keep going!",  es:"Sigue!",      pt:"Continue!"}};
  return               {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM PREMIUM+
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
      {q:"Que signifie l'acronyme UMS en contexte maritime ?",
        opts:["Universal Maritime Standard","Unattended Machinery Space","Unified Monitoring System","Underwater Mechanical Survey"],
        ans:1,expl:"UMS = Unattended Machinery Space (Espace Machines Sans Personnel Permanent). Certification accordee par les societes de classification (DNV, LR, BV, ClassNK, ABS) permettant l'exploitation sans officier permanent sous conditions SOLAS II-1."},
      {q:"Selon SOLAS II-1 Reg. 46, quelle est la frequence max des rondes UMS ?",
        opts:["15 min","30 min","60 min","2 heures"],
        ans:1,expl:"SOLAS II-1 Reg. 46 : rondes toutes les 30 minutes maximum. Enregistrees dans le registre UMS avec heure et observations, verifiees par le Chef Mecanicien."},
      {q:"Quel systeme centralise toutes les alarmes salle des machines en UMS ?",
        opts:["SMS (Safety Management System)","AMS (Alarm Monitoring System)","VDR (Voyage Data Recorder)","BMS (Bridge Monitoring System)"],
        ans:1,expl:"L'AMS (Alarm Monitoring System) collecte > 1 000 points d'alarme sur VLCC, les classe par priorite (L/LL/H/HH), les horodate et les transmet a la passerelle. Requis SOLAS II-1 Reg. 51."},
      {q:"Que detecte l'alarme Homme Mort (Dead Man Alarm) ?",
        opts:["Un incendie","L'incapacite de l'officier de quart SM","Une inondation","Une perte de puissance"],
        ans:1,expl:"Le DMA detecte l'incapacite de l'officier de quart en salle des machines. Sans signal de presence dans les 30 min, alarme SM puis transfert passerelle."},
      {q:"Si une alarme UMS n'est pas acquittee en 30s, elle est transferee vers :",
        opts:["Le Chef Mecanicien","La passerelle (OOW)","La salle radio","Le capitaine"],
        ans:1,expl:"SOLAS II-1 Reg. 51 : transfert automatique a la passerelle (OOW) si non acquittee en 30 secondes."},
      {q:"Dans un AMS, que signifie l'alarme 'HH' ?",
        opts:["High Humidity","Very High (seuil critique haut — action immediate)","Heavy Heat","High Hydraulic"],
        ans:1,expl:"HH = High High = seuil tres haut critique selon ANSI/ISA-18.2. Ex : temp. palier HH = risque grippage imminent. Necessite action immediate. Sequence: H -> HH -> shutdown."},
      {q:"Qu'est-ce que le 'Slow Down' automatique sur un ME UMS ?",
        opts:["Arret complet du moteur","Reduction automatique de charge avant seuil critique","Ralentissement manuel","Procedure de demarrage"],
        ans:1,expl:"Le Slow Down reduit la charge du ME (et la vitesse navire) quand un parametre atteint un seuil pre-critique. Mesure graduee entre alerte et shutdown pour eviter perte de propulsion."},
      {q:"Quelle qualification STCW est requise pour l'officier d'astreinte UMS ?",
        opts:["STCW II/1 — Officier pont","STCW III/1 — Officier mecanicien de quart","STCW VI/1 — Securite de base","STCW V/1 — Tanker training"],
        ans:1,expl:"STCW III/1 (et III/2 pour ME) : officier mecanicien de quart avec certification UMS specifique. Doit etre present en SM dans les 5 minutes, disponible 24h/24."},
      {q:"Quelle regulation SOLAS exige le controle remote du ME depuis la passerelle en UMS ?",
        opts:["SOLAS II-1 Reg. 49","SOLAS II-1 Reg. 46","SOLAS V Reg. 19","SOLAS III Reg. 6"],
        ans:0,expl:"SOLAS II-1 Reg. 49 : controle remote du moteur principal depuis la passerelle obligatoire pour navires UMS. Permet a l'OOW de manoeuvrer sans intervention en SM."},
      {q:"Le MV Sewol (2014) a demontre que des alarmes AMS non configurees peuvent :",
        opts:["Reduire la consommation","Creer une fausse securite — danger masque","Accelerer le quart","Ameliorer les communications"],
        ans:1,expl:"Le Sewol avait un AMS sans seuils de gite configures. La gite croissante n'a declenche aucune alarme pendant 30+ min. 304 morts. Un AMS mal configure est plus dangereux qu'un AMS absent."},
      {q:"Qu'est-ce qu'un blackout en contexte UMS ?",
        opts:["Panne d'eclairage cabine","Perte totale alimentation electrique principale — generateur secours < 45s","Panne informatique AMS","Coupure radio"],
        ans:1,expl:"Blackout = perte totale alimentation electrique principale. Generateur de secours doit demarrer en < 45 secondes (SOLAS II-1 Reg. 42). AMS signale a la passerelle. Officier appele immediatement."},
      {q:"Quelle est la difference entre Shutdown et Slowdown sur ME ?",
        opts:["Ce sont des synonymes","Shutdown = arret complet, Slowdown = reduction charge","Shutdown = test, Slowdown = urgence","Shutdown = electrique, Slowdown = mecanique"],
        ans:1,expl:"Shutdown = arret complet et immediat (ex: huile LL). Slowdown = reduction charge sans arreter (ex: eau H). Sequence: alerte -> slowdown -> shutdown. Protection graduee pour maintenir propulsion le plus longtemps possible."},
      {q:"Combien de points d'alarme un AMS VLCC moderne peut-il integrer ?",
        opts:["50 a 100","200 a 500","500 a 1 000","Plus de 1 000 (parfois 5 000)"],
        ans:3,expl:"Un VLCC moderne peut avoir 1 000 a 5 000 points d'alarme : T° paliers, pressions huile/eau/carburant, niveaux, vibrations, detection feu/gaz, puissance electrique. Fabricants : Kongsberg, Wartsila NACOS, ABB."},
      {q:"Qu'est-ce que le UMS Certificate delivre par une societe de classification ?",
        opts:["Formation equipage","Attestation que le navire satisfait les exigences techniques et ISM pour UMS","Certification carburant","Permis de navigation"],
        ans:1,expl:"Le UMS Certificate (Class Notation UMS) atteste que le navire satisfait SOLAS II-1 et les regles de la societe de classification : AMS certifie, DMA, detection feu/inondation, remote ME, procedures SMS/ISM."},
      {q:"Quel est le delai max pour qu'un officier mecanicien soit present en SM apres appel ?",
        opts:["30 secondes","5 minutes","15 minutes","30 minutes"],
        ans:1,expl:"SOLAS II-1 Reg. 46 : l'officier d'astreinte doit etre present en salle des machines dans les 5 minutes suivant l'appel. Exige cabine proche, disponibilite 24/7, pas d'alcool."},
    ],
    en:[
      {q:"What does UMS mean in maritime context?",
        opts:["Universal Maritime Standard","Unattended Machinery Space","Unified Monitoring System","Underwater Mechanical Survey"],
        ans:1,expl:"UMS = Unattended Machinery Space. Classification granted by societies (DNV, LR, BV, ClassNK, ABS) allowing engine room operation without permanent officer under SOLAS II-1 conditions."},
      {q:"Per SOLAS II-1 Reg. 46, what is the max UMS round frequency?",
        opts:["15 min","30 min","60 min","2 hours"],
        ans:1,expl:"SOLAS II-1 Reg. 46: rounds every 30 minutes maximum. Logged in UMS register with time and observations, verified by Chief Engineer."},
      {q:"Which system centralizes all engine room alarms in UMS?",
        opts:["SMS (Safety Management System)","AMS (Alarm Monitoring System)","VDR (Voyage Data Recorder)","BMS (Bridge Monitoring System)"],
        ans:1,expl:"AMS (Alarm Monitoring System) collects > 1,000 alarm points on VLCC, classifies by priority (L/LL/H/HH), timestamps and transmits to bridge. Required SOLAS II-1 Reg. 51."},
      {q:"What does the Dead Man Alarm detect?",
        opts:["Fire","ER watch officer incapacity","Flooding","Power loss"],
        ans:1,expl:"DMA detects engine room watch officer incapacity. Without a presence signal within 30 min, ER alarm triggers then transfers to bridge."},
      {q:"If a UMS alarm is not acknowledged in 30s, it transfers to:",
        opts:["Chief Engineer","Bridge (OOW)","Radio room","Captain"],
        ans:1,expl:"SOLAS II-1 Reg. 51: automatic transfer to bridge (OOW) if not acknowledged within 30 seconds."},
      {q:"In an AMS, what does 'HH' alarm mean?",
        opts:["High Humidity","Very High (critical high threshold — immediate action)","Heavy Heat","High Hydraulic"],
        ans:1,expl:"HH = High High = very high critical threshold per ANSI/ISA-18.2. Example: bearing temp HH = imminent seizure risk. Requires immediate action. Sequence: H -> HH -> shutdown."},
      {q:"What is automatic 'Slow Down' on a UMS ME?",
        opts:["Complete engine stop","Automatic load reduction before critical threshold","Manual slowing","Starting procedure"],
        ans:1,expl:"Slow Down reduces ME load (and vessel speed) when a parameter reaches a pre-critical threshold. Graduated measure between alert and shutdown to avoid propulsion loss."},
      {q:"What STCW qualification is required for UMS standby officer?",
        opts:["STCW II/1 — Deck officer","STCW III/1 — Engineer watch officer","STCW VI/1 — Basic safety","STCW V/1 — Tanker training"],
        ans:1,expl:"STCW III/1 (and III/2 for ME): engineer watch officer with UMS-specific certification. Must be in ER within 5 minutes, available 24/7."},
      {q:"Which SOLAS regulation requires remote ME control from bridge in UMS?",
        opts:["SOLAS II-1 Reg. 49","SOLAS II-1 Reg. 46","SOLAS V Reg. 19","SOLAS III Reg. 6"],
        ans:0,expl:"SOLAS II-1 Reg. 49: remote main engine control from bridge mandatory for UMS vessels. Allows OOW to maneuver without ER intervention."},
      {q:"MV Sewol (2014) demonstrated that unconfigured AMS alarms can:",
        opts:["Reduce consumption","Create false security — hidden danger","Speed up watch","Improve communications"],
        ans:1,expl:"Sewol had an AMS with no list thresholds configured. Progressive list triggered no alarm for 30+ min. 304 deaths. A misconfigured AMS is more dangerous than no AMS."},
      {q:"What is a blackout in UMS context?",
        opts:["Cabin lighting failure","Total loss of main electrical supply — emergency generator < 45s","AMS computer failure","Radio cutoff"],
        ans:1,expl:"Blackout = total loss of main electrical supply. Emergency generator must start in < 45 seconds (SOLAS II-1 Reg. 42). AMS signals bridge. Officer called immediately."},
      {q:"What is the difference between Shutdown and Slowdown on ME?",
        opts:["They are synonyms","Shutdown = complete stop, Slowdown = load reduction","Shutdown = test, Slowdown = emergency","Shutdown = electrical, Slowdown = mechanical"],
        ans:1,expl:"Shutdown = complete immediate stop (ex: oil LL). Slowdown = load reduction without stopping (ex: water H). Sequence: alert -> slowdown -> shutdown. Graduated protection."},
      {q:"How many alarm points can a modern VLCC AMS integrate?",
        opts:["50 to 100","200 to 500","500 to 1,000","Over 1,000 (sometimes 5,000)"],
        ans:3,expl:"A modern VLCC can have 1,000 to 5,000 alarm points: bearing temps, oil/water/fuel pressures, levels, vibrations, fire/gas detection, electrical power. Manufacturers: Kongsberg, Wartsila NACOS, ABB."},
      {q:"What is the UMS Certificate issued by a classification society?",
        opts:["Crew training","Certification that vessel satisfies technical and ISM requirements for UMS","Fuel certification","Navigation permit"],
        ans:1,expl:"UMS Certificate (Class Notation UMS) certifies that vessel satisfies SOLAS II-1 and class society rules: certified AMS, DMA, fire/flood detection, remote ME, SMS/ISM procedures."},
      {q:"What is the max time for engineer officer to be present in ER after call?",
        opts:["30 seconds","5 minutes","15 minutes","30 minutes"],
        ans:1,expl:"SOLAS II-1 Reg. 46: standby officer must be in engine room within 5 minutes of call. Requires nearby cabin, 24/7 availability, no alcohol."},
    ],
    es:[
      {q:"?Que significa UMS en contexto maritimo?",opts:["Universal Maritime Standard","Unattended Machinery Space","Unified Monitoring System","Underwater Mechanical Survey"],ans:1,expl:"UMS = Unattended Machinery Space. Certificacion por sociedades de clasificacion (DNV, LR, BV, ClassNK, ABS) para operar sin oficial permanente bajo condiciones SOLAS II-1."},
      {q:"Segun SOLAS II-1 Reg. 46, ?cual es la frecuencia max de rondas UMS?",opts:["15 min","30 min","60 min","2 horas"],ans:1,expl:"SOLAS II-1 Reg. 46: rondas cada 30 minutos maximo. Registradas con hora y observaciones, verificadas por el Jefe de Maquinas."},
      {q:"?Que sistema centraliza todas las alarmas de la sala de maquinas en UMS?",opts:["SMS","AMS (Alarm Monitoring System)","VDR","BMS"],ans:1,expl:"El AMS recopila > 1.000 puntos de alarma en VLCC, los clasifica por prioridad (L/LL/H/HH), los marca con hora y los transmite al puente. Requerido SOLAS II-1 Reg. 51."},
      {q:"?Que detecta la alarma Hombre Muerto (Dead Man Alarm)?",opts:["Un incendio","La incapacidad del oficial de guardia SM","Una inundacion","Una perdida de potencia"],ans:1,expl:"El DMA detecta la incapacidad del oficial de guardia en sala de maquinas. Sin senal de presencia en 30 min, alarma SM y luego transferencia al puente."},
      {q:"Si una alarma UMS no se reconoce en 30s, se transfiere a:",opts:["El Jefe de Maquinas","El puente (OOW)","La sala de radio","El capitan"],ans:1,expl:"SOLAS II-1 Reg. 51: transferencia automatica al puente (OOW) si no se reconoce en 30 segundos."},
      {q:"En un AMS, ?que significa la alarma 'HH'?",opts:["High Humidity","Muy Alto (umbral critico alto — accion inmediata)","Heavy Heat","High Hydraulic"],ans:1,expl:"HH = High High = umbral muy alto critico segun ANSI/ISA-18.2. Ej: temp. cojinete HH = riesgo agarrotamiento inminente. Requiere accion inmediata."},
      {q:"?Que es el 'Slow Down' automatico en un ME UMS?",opts:["Parada completa del motor","Reduccion automatica de carga antes del umbral critico","Ralentizacion manual","Procedimiento de arranque"],ans:1,expl:"El Slow Down reduce la carga del ME cuando un parametro alcanza un umbral precritico. Medida graduada entre alerta y shutdown para evitar perdida de propulsion."},
      {q:"?Que cualificacion STCW requiere el oficial de guardia UMS?",opts:["STCW II/1 — Oficial cubierta","STCW III/1 — Oficial mecanico de guardia","STCW VI/1 — Seguridad basica","STCW V/1 — Tanker training"],ans:1,expl:"STCW III/1 (y III/2 para ME): oficial mecanico de guardia con certificacion UMS especifica. Debe estar en SM en 5 minutos, disponible 24/7."},
      {q:"?Que regulacion SOLAS exige el control remoto del ME desde el puente en UMS?",opts:["SOLAS II-1 Reg. 49","SOLAS II-1 Reg. 46","SOLAS V Reg. 19","SOLAS III Reg. 6"],ans:0,expl:"SOLAS II-1 Reg. 49: control remoto del ME desde el puente obligatorio para buques UMS."},
      {q:"El MV Sewol (2014) demostro que las alarmas AMS no configuradas pueden:",opts:["Reducir consumo","Crear falsa seguridad — peligro oculto","Acelerar el quart","Mejorar comunicaciones"],ans:1,expl:"El Sewol tenia un AMS sin umbrales de escora configurados. Escora progresiva sin alarma 30+ min. 304 muertos."},
      {q:"?Que es un blackout en contexto UMS?",opts:["Fallo iluminacion cabina","Perdida total suministro electrico principal — generador emergencia < 45s","Fallo AMS","Corte radio"],ans:1,expl:"Blackout = perdida total suministro electrico principal. Generador emergencia < 45s (SOLAS II-1 Reg. 42). AMS avisa al puente."},
      {q:"?Cual es la diferencia entre Shutdown y Slowdown en ME?",opts:["Son sinonimos","Shutdown = parada completa, Slowdown = reduccion carga","Shutdown = prueba, Slowdown = emergencia","Shutdown = electrico, Slowdown = mecanico"],ans:1,expl:"Shutdown = parada completa inmediata. Slowdown = reduccion carga sin parar. Secuencia: alerta -> slowdown -> shutdown."},
      {q:"?Cuantos puntos de alarma puede integrar un AMS VLCC moderno?",opts:["50 a 100","200 a 500","500 a 1.000","Mas de 1.000 (a veces 5.000)"],ans:3,expl:"Un VLCC moderno puede tener 1.000 a 5.000 puntos de alarma. Fabricantes: Kongsberg, Wartsila NACOS, ABB."},
      {q:"?Que es el UMS Certificate emitido por una sociedad de clasificacion?",opts:["Formacion tripulacion","Certificacion que el buque cumple requisitos tecnicos e ISM para UMS","Certificacion combustible","Permiso navegacion"],ans:1,expl:"UMS Certificate (Class Notation UMS) certifica que el buque cumple SOLAS II-1 y reglas de la sociedad: AMS certificado, DMA, deteccion incendio/inundacion, ME remoto, procedimientos SMS/ISM."},
      {q:"?Cual es el tiempo max para que un oficial mecanico este en SM tras la llamada?",opts:["30 segundos","5 minutos","15 minutos","30 minutos"],ans:1,expl:"SOLAS II-1 Reg. 46: oficial de guardia debe estar en SM en 5 minutos. Requiere cabina cercana, disponibilidad 24/7, sin alcohol."},
    ],
    pt:[
      {q:"O que significa UMS no contexto maritimo?",opts:["Universal Maritime Standard","Unattended Machinery Space","Unified Monitoring System","Underwater Mechanical Survey"],ans:1,expl:"UMS = Unattended Machinery Space. Certificacao pelas sociedades de classificacao (DNV, LR, BV, ClassNK, ABS) para operar sem oficial permanente sob condicoes SOLAS II-1."},
      {q:"Segundo SOLAS II-1 Reg. 46, qual e a frequencia max das rondas UMS?",opts:["15 min","30 min","60 min","2 horas"],ans:1,expl:"SOLAS II-1 Reg. 46: rondas de 30 em 30 minutos maximo. Registadas com hora e observacoes, verificadas pelo Chefe de Maquinas."},
      {q:"Que sistema centraliza todos os alarmes da casa das maquinas em UMS?",opts:["SMS","AMS (Alarm Monitoring System)","VDR","BMS"],ans:1,expl:"O AMS recolhe > 1.000 pontos de alarme num VLCC, classifica por prioridade (L/LL/H/HH), marca com data/hora e transmite para a ponte. Requerido SOLAS II-1 Reg. 51."},
      {q:"O que deteta o alarme Homem Morto (Dead Man Alarm)?",opts:["Um incendio","A incapacidade do oficial de quarto SM","Uma inundacao","Uma perda de potencia"],ans:1,expl:"O DMA deteta a incapacidade do oficial de quarto na casa das maquinas. Sem sinal de presenca em 30 min, alarme SM e depois transferencia para a ponte."},
      {q:"Se um alarme UMS nao for reconhecido em 30s, e transferido para:",opts:["O Chefe de Maquinas","A ponte (OOW)","A sala de radio","O capitao"],ans:1,expl:"SOLAS II-1 Reg. 51: transferencia automatica para a ponte (OOW) se nao reconhecido em 30 segundos."},
      {q:"Num AMS, o que significa o alarme 'HH'?",opts:["High Humidity","Muito Alto (limiar critico alto — acao imediata)","Heavy Heat","High Hydraulic"],ans:1,expl:"HH = High High = limiar muito alto critico segundo ANSI/ISA-18.2. Ex: temp. mancal HH = risco gripagem iminente. Requer acao imediata."},
      {q:"O que e o 'Slow Down' automatico num ME UMS?",opts:["Paragem completa do motor","Reducao automatica de carga antes do limiar critico","Abrandamento manual","Procedimento de arranque"],ans:1,expl:"O Slow Down reduz a carga do ME quando um parametro atinge um limiar pre-critico. Medida graduada entre alerta e shutdown para evitar perda de propulsao."},
      {q:"Que qualificacao STCW e necessaria para o oficial de quarto UMS?",opts:["STCW II/1 — Oficial convez","STCW III/1 — Oficial mecanico de quarto","STCW VI/1 — Seguranca basica","STCW V/1 — Tanker training"],ans:1,expl:"STCW III/1 (e III/2 para ME): oficial mecanico de quarto com certificacao UMS especifica. Deve estar na SM em 5 minutos, disponivel 24/7."},
      {q:"Que regulacao SOLAS exige o controlo remoto do ME da ponte em UMS?",opts:["SOLAS II-1 Reg. 49","SOLAS II-1 Reg. 46","SOLAS V Reg. 19","SOLAS III Reg. 6"],ans:0,expl:"SOLAS II-1 Reg. 49: controlo remoto do ME da ponte obrigatorio para navios UMS."},
      {q:"O MV Sewol (2014) demonstrou que alarmes AMS nao configurados podem:",opts:["Reduzir consumo","Criar falsa seguranca — perigo oculto","Acelerar o quarto","Melhorar comunicacoes"],ans:1,expl:"O Sewol tinha um AMS sem limiares de inclinacao configurados. Inclinacao progressiva sem alarme 30+ min. 304 mortos."},
      {q:"O que e um blackout em contexto UMS?",opts:["Falha iluminacao cabine","Perda total fornecimento eletrico principal — gerador emergencia < 45s","Falha AMS","Corte radio"],ans:1,expl:"Blackout = perda total fornecimento eletrico principal. Gerador emergencia < 45s (SOLAS II-1 Reg. 42). AMS avisa a ponte."},
      {q:"Qual e a diferenca entre Shutdown e Slowdown no ME?",opts:["Sao sinonimos","Shutdown = paragem completa, Slowdown = reducao carga","Shutdown = teste, Slowdown = emergencia","Shutdown = eletrico, Slowdown = mecanico"],ans:1,expl:"Shutdown = paragem completa imediata. Slowdown = reducao carga sem parar. Sequencia: alerta -> slowdown -> shutdown."},
      {q:"Quantos pontos de alarme pode integrar um AMS VLCC moderno?",opts:["50 a 100","200 a 500","500 a 1.000","Mais de 1.000 (as vezes 5.000)"],ans:3,expl:"Um VLCC moderno pode ter 1.000 a 5.000 pontos de alarme. Fabricantes: Kongsberg, Wartsila NACOS, ABB."},
      {q:"O que e o UMS Certificate emitido por uma sociedade de classificacao?",opts:["Formacao tripulacao","Certificacao que o navio satisfaz requisitos tecnicos e ISM para UMS","Certificacao combustivel","Licenca navegacao"],ans:1,expl:"UMS Certificate (Class Notation UMS) certifica que o navio satisfaz SOLAS II-1 e regras da sociedade: AMS certificado, DMA, detecao incendio/inundacao, ME remoto, procedimentos SMS/ISM."},
      {q:"Qual e o tempo max para um oficial mecanico estar na SM apos chamada?",opts:["30 segundos","5 minutos","15 minutos","30 minutos"],ans:1,expl:"SOLAS II-1 Reg. 46: oficial de prevenco deve estar na SM em 5 minutos. Requer cabine proxima, disponibilidade 24/7, sem alcool."},
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
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6,letterSpacing:1}}>
        {lbl("Banque Premium+","Premium+ Bank","Banco Premium+","Banco Premium+")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        15 {lbl("questions niveau ingenieur","engineer-level questions","preguntas nivel ingeniero","questoes nivel engenheiro")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.cyan},${C.blue})`,
          border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
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
          style={{width:"100%",padding:"13px",borderRadius:14,background:`rgba(0,229,255,0.12)`,
            border:`1px solid ${C.cyan}55`,color:C.cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
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
            background:`linear-gradient(135deg,${C.cyan},${C.blue})`,
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
// QUIZ — 5 QCM
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"UMS signifie et est regi par :",opts:["Universal Maritime System — SOLAS V","Unattended Machinery Space — SOLAS II-1","Unmanned Marine Survey — SOLAS III","Unified Monitor Space — SOLAS VI"],
      ans:1,expl:"UMS = Unattended Machinery Space — SOLAS II-1 Reg. 46-53. Ce chapitre definit toutes les conditions techniques et organisationnelles pour l'exploitation sans officier permanent."},
    {q:"Frequence max rondes UMS et delai max presence officier en SM :",opts:["15 min / 2 min","30 min / 5 min","60 min / 10 min","30 min / 30 min"],
      ans:1,expl:"SOLAS II-1 Reg. 46 : rondes toutes les 30 min max. Officier d'astreinte present en SM dans les 5 minutes suivant appel. Verifies lors des inspections PSC."},
    {q:"Alarme UMS non acquittee en 30s — consequence SOLAS :",opts:["Arret moteur automatique","Transfert automatique passerelle (OOW)","Alerte Chef Mecanicien uniquement","Alarme ignoree"],
      ans:1,expl:"SOLAS II-1 Reg. 51 : toute alarme non acquittee en 30s est automatiquement transferee a la passerelle (OOW) qui doit verifier et appeler l'officier mecanicien."},
    {q:"Le MV Sewol (2014) a coule car l'AMS n'avait pas configure :",opts:["Les alarmes moteur","Les alarmes de gite et stabilite","Les alarmes carburant","Les alarmes incendie"],
      ans:1,expl:"L'AMS du Sewol n'avait aucun seuil de gite configure. La gite croissante a babord n'a declenche aucune alarme pendant 30+ minutes permettant le chavirage. 304 morts."},
    {q:"Dead Man Alarm — periode max et consequence si pas de signal :",opts:["10 min => arret ME","30 min => alarme SM puis passerelle","60 min => alerte compagnie","4h => rapport PSC"],
      ans:1,expl:"DMA : signal de presence max toutes les 30 min. Sans signal : alarme audivisuelle SM. Non acquittee en 30s : transfert passerelle OOW. Previent incapacite non signalee de l'officier d'astreinte."},
  ],
  en:[
    {q:"UMS stands for and is governed by:",opts:["Universal Maritime System — SOLAS V","Unattended Machinery Space — SOLAS II-1","Unmanned Marine Survey — SOLAS III","Unified Monitor Space — SOLAS VI"],
      ans:1,expl:"UMS = Unattended Machinery Space — SOLAS II-1 Reg. 46-53. Defines all technical and organizational conditions for operation without permanent officer."},
    {q:"Max UMS round frequency and max officer response time in ER:",opts:["15 min / 2 min","30 min / 5 min","60 min / 10 min","30 min / 30 min"],
      ans:1,expl:"SOLAS II-1 Reg. 46: rounds every 30 min max. Standby officer in ER within 5 minutes of call. Verified during PSC inspections."},
    {q:"UMS alarm not acknowledged in 30s — SOLAS consequence:",opts:["Automatic engine stop","Automatic bridge transfer (OOW)","Chief Engineer alert only","Alarm ignored"],
      ans:1,expl:"SOLAS II-1 Reg. 51: any alarm not acknowledged in 30s is automatically transferred to the bridge (OOW) who must verify and call the engineer officer."},
    {q:"MV Sewol (2014) capsized because AMS had not configured:",opts:["Engine alarms","List and stability alarms","Fuel alarms","Fire alarms"],
      ans:1,expl:"Sewol's AMS had no list threshold configured. Progressive port list triggered no alarm for 30+ minutes allowing capsizing. 304 deaths."},
    {q:"Dead Man Alarm — max period and consequence if no signal:",opts:["10 min => ME stop","30 min => ER alarm then bridge","60 min => company alert","4h => PSC report"],
      ans:1,expl:"DMA: presence signal max every 30 min. No signal: ER audivisual alarm. Not acked in 30s: bridge OOW transfer. Prevents unreported incapacitation of standby officer."},
  ],
  es:[
    {q:"UMS significa y es regido por:",opts:["Universal Maritime System — SOLAS V","Unattended Machinery Space — SOLAS II-1","Unmanned Marine Survey — SOLAS III","Unified Monitor Space — SOLAS VI"],
      ans:1,expl:"UMS = Unattended Machinery Space — SOLAS II-1 Reg. 46-53. Define todas las condiciones tecnicas y organizativas para la operacion sin oficial permanente."},
    {q:"Frecuencia max rondas UMS y tiempo max respuesta oficial en SM:",opts:["15 min / 2 min","30 min / 5 min","60 min / 10 min","30 min / 30 min"],
      ans:1,expl:"SOLAS II-1 Reg. 46: rondas cada 30 min max. Oficial de guardia en SM en 5 minutos tras llamada. Verificados en inspecciones PSC."},
    {q:"Alarma UMS no reconocida en 30s — consecuencia SOLAS:",opts:["Parada automatica motor","Transferencia automatica puente (OOW)","Alerta Jefe Maquinas solo","Alarma ignorada"],
      ans:1,expl:"SOLAS II-1 Reg. 51: toda alarma no reconocida en 30s se transfiere automaticamente al puente (OOW)."},
    {q:"El MV Sewol (2014) se hundio porque el AMS no tenia configuradas:",opts:["Alarmas motor","Alarmas de escora y estabilidad","Alarmas combustible","Alarmas incendio"],
      ans:1,expl:"El AMS del Sewol no tenia umbrales de escora. Escora progresiva sin alarma 30+ min. 304 muertos."},
    {q:"Dead Man Alarm — periodo max y consecuencia si no hay senal:",opts:["10 min => parada ME","30 min => alarma SM luego puente","60 min => alerta naviera","4h => informe PSC"],
      ans:1,expl:"DMA: senal de presencia max cada 30 min. Sin senal: alarma SM. No reconocida 30s: transferencia puente OOW."},
  ],
  pt:[
    {q:"UMS significa e e regido por:",opts:["Universal Maritime System — SOLAS V","Unattended Machinery Space — SOLAS II-1","Unmanned Marine Survey — SOLAS III","Unified Monitor Space — SOLAS VI"],
      ans:1,expl:"UMS = Unattended Machinery Space — SOLAS II-1 Reg. 46-53. Define todas as condicoes tecnicas e organizacionais para a operacao sem oficial permanente."},
    {q:"Frequencia max rondas UMS e tempo max resposta oficial na SM:",opts:["15 min / 2 min","30 min / 5 min","60 min / 10 min","30 min / 30 min"],
      ans:1,expl:"SOLAS II-1 Reg. 46: rondas de 30 em 30 min max. Oficial de prevenco na SM em 5 minutos apos chamada. Verificados nas inspecoes PSC."},
    {q:"Alarme UMS nao reconhecido em 30s — consequencia SOLAS:",opts:["Paragem automatica motor","Transferencia automatica ponte (OOW)","Alerta Chefe Maquinas apenas","Alarme ignorado"],
      ans:1,expl:"SOLAS II-1 Reg. 51: qualquer alarme nao reconhecido em 30s e transferido automaticamente para a ponte (OOW)."},
    {q:"O MV Sewol (2014) capsizou porque o AMS nao tinha configurados:",opts:["Alarmes motor","Alarmes de inclinacao e estabilidade","Alarmes combustivel","Alarmes incendio"],
      ans:1,expl:"O AMS do Sewol nao tinha limiares de inclinacao. Inclinacao progressiva sem alarme 30+ min. 304 mortos."},
    {q:"Dead Man Alarm — periodo max e consequencia se nao ha sinal:",opts:["10 min => paragem ME","30 min => alarme SM depois ponte","60 min => alerta armador","4h => relatorio PSC"],
      ans:1,expl:"DMA: sinal de presenca max de 30 em 30 min. Sem sinal: alarme SM. Nao reconhecido 30s: transferencia ponte OOW."},
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
        <div style={{padding:"13px",borderRadius:13,background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?C.green:C.red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?C.green:C.red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:C.steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,background:`linear-gradient(135deg,${C.amber},${C.gold2})`,
            border:"none",color:C.bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
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
      badge:"Module e7 — UMS & Automatisation · Lecon 1/5 · Premium+ · 220 XP",
      title:"UMS — Espaces Machines Sans Personnel Permanent",
      intro:"La nuit, la salle des machines d'un VLCC ronronne seule dans l'obscurite. Pas d'officier. Des centaines de capteurs veillent en silence. C'est le systeme UMS.\n\nCette lecon couvre la certification UMS, les systemes AMS, les rondes de surveillance, l'alarme homme mort et les obligations SOLAS II-1.",
      p1:"PARTIE 1 — ARCHITECTURE SALLE MACHINES UMS",s1t:"Zones de surveillance et capteurs",
      s1:"UMS = Unattended Machinery Space\nCertification : DNV GL, Lloyd's Register, Bureau Veritas, ClassNK, ABS\n\nCONDITIONS SOLAS II-1 REG. 46-53:\n→ AMS operationnel et certifie\n→ Remote control ME depuis passerelle\n→ Detection automatique incendie toutes zones\n→ Detection inondation sentines\n→ Dead Man Alarm operationnel\n→ Officier astreinte < 5 min\n→ Rondes documentees max 30 min\n→ Formation equipage documentee SMS/ISM\n\nZONES SURVEILLEES:\n→ ME: paliers, vibrations, temperature, pression\n→ Generateurs: V / Hz / kW / temperature\n→ Chaudiere: pression, niveau eau, flamme\n→ Purificateurs: temperature, debit, boues\n→ Refroidissement: debit, pression, temperature\n→ Service combustible: niveau, pression, viscosite\n→ Sentines: niveaux, OWS 15 ppm",
      p2:"PARTIE 2 — SYSTEME D'ALARMES (AMS)",s2t:"Hierarchie alarmes — capteur a passerelle",
      s2:"AMS — ALARM MONITORING SYSTEM:\nCoeur du systeme UMS. > 1 000 points d'alarme sur VLCC.\n\nHIERARCHIE SEUILS:\nPre-alerte L/H : Avertissement\nAlarme LL/HH : Action requise — Acquittement 30s\nAlarme critique LLL/HHH : Shutdown ME\n\nTERMINOLOGIE ANSI/ISA-18.2:\nL = Low | LL = Low Low (critique)\nH = High | HH = High High (critique)\n\nTRANSFERT PASSERELLE:\nNon acquittee en 30s => OOW alerte\nSOLAS II-1 Reg. 51\n\nFABRICANTS AMS:\nKongsberg Maritime | Wartsila NACOS\nABB OCTOPUS | Rolls-Royce ACON",
      p3:"PARTIE 3 — RONDES DE SURVEILLANCE",s3t:"Checklist UMS — 30 min — Officier < 5 min",
      s3:"SOLAS II-1 REG. 46:\nRondes a intervalles n'excedant pas 30 minutes.\n\nOFFICIER D'ASTREINTE:\n→ Joignable en permanence (pager / tel bord)\n→ Presence en SM : < 5 minutes\n→ Pas de consommation d'alcool\n→ Cabine proche salle des machines\n\nCONTENU RONDE:\n→ ME : paliers, vibrations, niveaux, fuites\n→ Generateurs : charge, temperature, alarmes\n→ Chaudiere : pression, niveau, flamme\n→ Purificateurs : temperature, debit, boues\n→ Pompes : fuites, pression, vibrations\n→ Sentines : niveaux, alarmes actives, OWS\n\nENREGISTREMENT:\nRegistre UMS : heure, observations, signature\nControle PSC possible a tout moment",
      p4:"PARTIE 4 — ALARME HOMME MORT (DMA)",s4t:"Dead Man Alarm — securite officier d'astreinte",
      s4:"PRINCIPE:\nL'officier UMS confirme sa presence en appuyant sur un bouton a intervalles reguliers.\n\nFONCTIONNEMENT:\n→ Periode max : 30 minutes\n→ Sans signal : alarme audivisuelle SM\n→ Non acquittee en 30s : transfert passerelle\n→ OOW appelle officier mecanicien\n\nBASE REGLEMENTAIRE:\nSOLAS V/Reg.19 | Regles classification\nISM Code : procedure dans SMS\n\nLOCALISATION BOUTONS DMA:\n→ Salle des machines (points multiples)\n→ Atelier mecanique\n→ Salle de controle machines\n→ Equipement portatif (certains navires)",
      p5:"EXERCICES PRATIQUES PREMIUM+",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS PREMIUM+",
      sumT:"RESUME — LECON e7 L1",
      sumP:["UMS = Unattended Machinery Space — SOLAS II-1 Reg.46-53","AMS : > 1 000 pts alarme — L/LL/H/HH — transfert 30s","Rondes max 30 min — Officier en SM dans 5 min","DMA : signal presence max 30 min — alarm + passerelle","Certification UMS : DNV, LR, BV, ClassNK, ABS","Shutdown = arret complet | Slowdown = reduction charge","MV Sewol 2014 : AMS non configure => 304 morts","PSC verifie : AMS logs, rondes, formation equipage"],
      learnedP:["UMS : conditions SOLAS II-1 et certification","AMS : hierarchie L/LL/H/HH et transfert 30s","Rondes 30 min et officier < 5 min en SM","Dead Man Alarm : principe et fonctionnement","MV Sewol 2014 : AMS mal configure = danger"],
    },
    en:{
      badge:"Module e7 — UMS & Automation · Lesson 1/5 · Premium+ · 220 XP",
      title:"UMS — Unattended Machinery Spaces",
      intro:"At night, a VLCC's engine room hums alone in the dark. No officer. Hundreds of sensors keep silent watch. This is the UMS system.\n\nThis lesson covers UMS certification, AMS alarm systems, surveillance rounds, dead man alarm and SOLAS II-1 obligations.",
      p1:"PART 1 — UMS ENGINE ROOM ARCHITECTURE",s1t:"Surveillance zones and sensors",
      s1:"UMS = Unattended Machinery Space\nCertification: DNV GL, Lloyd's Register, Bureau Veritas, ClassNK, ABS\n\nSOLAS II-1 REG. 46-53 CONDITIONS:\n→ Operational certified AMS\n→ Remote ME control from bridge\n→ Automatic fire detection all areas\n→ Bilge flood detection\n→ Dead Man Alarm operational\n→ Standby officer < 5 min response\n→ Documented rounds max 30 min\n→ Documented crew training SMS/ISM\n\nMONITORED ZONES:\n→ ME: bearings, vibrations, temperature, pressure\n→ Generators: V / Hz / kW / temperature\n→ Boiler: pressure, water level, flame\n→ Purifiers: temperature, flow, sludge\n→ Cooling: flow, pressure, temperature\n→ Fuel service: level, pressure, viscosity\n→ Bilges: levels, OWS 15 ppm",
      p2:"PART 2 — ALARM SYSTEM (AMS)",s2t:"Alarm hierarchy — sensor to bridge",
      s2:"AMS — ALARM MONITORING SYSTEM:\nHeart of UMS. > 1,000 alarm points on VLCC.\n\nTHRESHOLD HIERARCHY:\nPre-alert L/H: Warning\nAlarm LL/HH: Action required — 30s ack\nCritical alarm LLL/HHH: ME shutdown\n\nANSI/ISA-18.2 TERMINOLOGY:\nL=Low | LL=Low Low (critical)\nH=High | HH=High High (critical)\n\nBRIDGE TRANSFER:\nNot acked in 30s => OOW alerted\nSOLAS II-1 Reg. 51\n\nAMS MANUFACTURERS:\nKongsberg Maritime | Wartsila NACOS\nABB OCTOPUS | Rolls-Royce ACON",
      p3:"PART 3 — SURVEILLANCE ROUNDS",s3t:"UMS checklist — 30 min — Officer < 5 min",
      s3:"SOLAS II-1 REG. 46:\nRounds at intervals not exceeding 30 minutes.\n\nSTANDBY OFFICER:\n→ Permanently reachable (pager / ship phone)\n→ ER presence: < 5 minutes\n→ No alcohol consumption\n→ Cabin near engine room\n\nROUND CONTENT:\n→ ME: bearings, vibrations, levels, leaks\n→ Generators: load, temperature, alarms\n→ Boiler: pressure, level, flame\n→ Purifiers: temperature, flow, sludge\n→ Pumps: leaks, pressure, vibrations\n→ Bilges: levels, active alarms, OWS\n\nRECORDING:\nUMS register: time, observations, signature\nPSC check possible at any time",
      p4:"PART 4 — DEAD MAN ALARM (DMA)",s4t:"Dead Man Alarm — standby officer safety",
      s4:"PRINCIPLE:\nUMS officer confirms presence by pressing a button at regular intervals.\n\nOPERATION:\n→ Max period: 30 minutes\n→ No signal: ER audivisual alarm\n→ Not acked in 30s: bridge transfer\n→ OOW calls engineer officer\n\nREGULATORY BASIS:\nSOLAS V/Reg.19 | Classification rules\nISM Code: procedure in SMS\n\nDMA BUTTON LOCATIONS:\n→ Engine room (multiple points)\n→ Workshop\n→ Engine control room\n→ Portable equipment (some vessels)",
      p5:"ADVANCED PREMIUM+ EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 PREMIUM+ QUESTIONS",
      sumT:"SUMMARY — LESSON e7 L1",
      sumP:["UMS = Unattended Machinery Space — SOLAS II-1 Reg.46-53","AMS: > 1,000 alarm pts — L/LL/H/HH — 30s transfer","Rounds max 30 min — Officer in ER within 5 min","DMA: presence signal max 30 min — alarm + bridge","UMS certification: DNV, LR, BV, ClassNK, ABS","Shutdown = complete stop | Slowdown = load reduction","MV Sewol 2014: misconfigured AMS => 304 deaths","PSC checks: AMS logs, rounds, crew training"],
      learnedP:["UMS: SOLAS II-1 conditions and certification","AMS: L/LL/H/HH hierarchy and 30s transfer","Rounds 30 min and officer < 5 min in ER","Dead Man Alarm: principle and operation","MV Sewol 2014: misconfigured AMS = danger"],
    },
    es:{
      badge:"Modulo e7 — UMS & Automatizacion · Leccion 1/5 · Premium+ · 220 XP",
      title:"UMS — Espacios de Maquinas Sin Personal Permanente",
      intro:"De noche, la sala de maquinas de un VLCC funciona sola en la oscuridad. Sin oficial. Cientos de sensores vigilan en silencio. Este es el sistema UMS.\n\nEsta leccion cubre la certificacion UMS, los sistemas AMS, las rondas, la alarma de hombre muerto y las obligaciones SOLAS II-1.",
      p1:"PARTE 1 — ARQUITECTURA SM UMS",s1t:"Zonas de vigilancia y sensores",
      s1:"UMS = Unattended Machinery Space\nCertificacion: DNV GL, Lloyd's Register, Bureau Veritas, ClassNK, ABS\n\nCONDICIONES SOLAS II-1 REG. 46-53:\n→ AMS operativo y certificado\n→ Control remoto ME desde el puente\n→ Deteccion automatica incendio todas zonas\n→ Deteccion inundacion sentinas\n→ Dead Man Alarm operativa\n→ Oficial guardia < 5 min\n→ Rondas documentadas max 30 min",
      p2:"PARTE 2 — SISTEMA DE ALARMAS (AMS)",s2t:"Jerarquia alarmas — sensor a puente",
      s2:"AMS: Corazon del sistema UMS. > 1.000 puntos de alarma en VLCC.\n\nJERARQUIA:\nPre-alerta L/H | Alarma LL/HH (30s) | Shutdown LLL/HHH\n\nTERMINOLOGIA ANSI/ISA-18.2:\nL=Low | LL=Low Low | H=High | HH=High High\n\nFABRICANTES: Kongsberg | Wartsila NACOS | ABB | Rolls-Royce",
      p3:"PARTE 3 — RONDAS DE VIGILANCIA",s3t:"Lista UMS — 30 min — Oficial < 5 min",
      s3:"Rondas max 30 min — SOLAS II-1 Reg. 46\nOficial: < 5 min | sin alcohol | localizable 24/7\n\nCONTENIDO: ME | Generadores | Caldera | Purificadores | Bombas | Sentinas",
      p4:"PARTE 4 — ALARMA HOMBRE MUERTO",s4t:"Dead Man Alarm — seguridad oficial guardia",
      s4:"Periodo max 30 min — Sin senal: alarma SM — No reconocida 30s: puente\nBase: SOLAS V/Reg.19 | Reglas clasificacion | ISM SMS",
      p5:"EJERCICIOS AVANZADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS PREMIUM+",
      sumT:"RESUMEN — LECCION e7 L1",
      sumP:["UMS = Unattended Machinery Space — SOLAS II-1 Reg.46-53","AMS: > 1.000 pts alarma — L/LL/H/HH — transferencia 30s","Rondas max 30 min — Oficial SM en 5 min","DMA: senal presencia max 30 min — alarma + puente","Certificacion UMS: DNV, LR, BV, ClassNK, ABS","MV Sewol 2014: AMS mal configurado => 304 muertos"],
      learnedP:["UMS: condiciones SOLAS II-1","AMS: L/LL/H/HH y transferencia 30s","Rondas 30 min — oficial < 5 min","Dead Man Alarm","MV Sewol 2014: AMS no configurado = peligro"],
    },
    pt:{
      badge:"Modulo e7 — UMS & Automatizacao · Licao 1/5 · Premium+ · 220 XP",
      title:"UMS — Espacos de Maquinas Sem Pessoal Permanente",
      intro:"De noite, a casa das maquinas de um VLCC funciona sozinha na escuridao. Sem oficial. Centenas de sensores vigiam em silencio. Este e o sistema UMS.\n\nEsta licao cobre a certificacao UMS, os sistemas AMS, as rondas, o alarme de homem morto e as obrigacoes SOLAS II-1.",
      p1:"PARTE 1 — ARQUITETURA SM UMS",s1t:"Zonas de vigilancia e sensores",
      s1:"UMS = Unattended Machinery Space\nCertificacao: DNV GL, Lloyd's Register, Bureau Veritas, ClassNK, ABS\n\nCONDICOES SOLAS II-1 REG. 46-53:\n→ AMS operacional e certificado\n→ Controlo remoto ME da ponte\n→ Detecao automatica incendio todas as zonas\n→ Detecao inundacao poroes\n→ Dead Man Alarm operacional\n→ Oficial de prevenco < 5 min\n→ Rondas documentadas max 30 min",
      p2:"PARTE 2 — SISTEMA DE ALARMES (AMS)",s2t:"Hierarquia alarmes — sensor a ponte",
      s2:"AMS: Coracao do sistema UMS. > 1.000 pontos de alarme num VLCC.\n\nHIERARQUIA:\nPre-alerta L/H | Alarme LL/HH (30s) | Shutdown LLL/HHH\n\nTERMINOLOGIA ANSI/ISA-18.2:\nL=Low | LL=Low Low | H=High | HH=High High\n\nFABRICANTES: Kongsberg | Wartsila NACOS | ABB | Rolls-Royce",
      p3:"PARTE 3 — RONDAS DE VIGILANCIA",s3t:"Lista UMS — 30 min — Oficial < 5 min",
      s3:"Rondas max 30 min — SOLAS II-1 Reg. 46\nOficial: < 5 min | sem alcool | localizavel 24/7\n\nCONTEUDO: ME | Geradores | Caldeira | Purificadores | Bombas | Poroes",
      p4:"PARTE 4 — ALARME HOMEM MORTO",s4t:"Dead Man Alarm — seguranca oficial de prevenco",
      s4:"Periodo max 30 min — Sem sinal: alarme SM — Nao reconhecido 30s: ponte\nBase: SOLAS V/Reg.19 | Regras classificacao | ISM SMS",
      p5:"EXERCICIOS AVANCADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES PREMIUM+",
      sumT:"RESUMO — LICAO e7 L1",
      sumP:["UMS = Unattended Machinery Space — SOLAS II-1 Reg.46-53","AMS: > 1.000 pts alarme — L/LL/H/HH — transferencia 30s","Rondas max 30 min — Oficial SM em 5 min","DMA: sinal presenca max 30 min — alarme + ponte","Certificacao UMS: DNV, LR, BV, ClassNK, ABS","MV Sewol 2014: AMS mal configurado => 304 mortos"],
      learnedP:["UMS: condicoes SOLAS II-1","AMS: L/LL/H/HH e transferencia 30s","Rondas 30 min — oficial < 5 min","Dead Man Alarm","MV Sewol 2014: AMS nao configurado = perigo"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE7_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
      {/* HEADER */}
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
              {lang==="fr"?"Lecon 1/5":lang==="en"?"Lesson 1/5":lang==="es"?"Leccion 1/5":"Licao 1/5"}
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
              {icon:"🖥️",p:lc.p1,s:lc.s1t,content:lc.s1,color:C.cyan,svg:<EngineRoomMapSVG lang={lang}/>,svgLabel:lang==="fr"?"CARTE SM — INTERACTIVE":lang==="en"?"ER MAP — INTERACTIVE":lang==="es"?"MAPA SM — INTERACTIVO":"MAPA SM — INTERATIVO"},
              {icon:"🔔",p:lc.p2,s:lc.s2t,content:lc.s2,color:C.amber,svg:<AlarmHierarchySVG lang={lang}/>,svgLabel:lang==="fr"?"HIERARCHIE ALARMES — INTERACTIF":lang==="en"?"ALARM HIERARCHY — INTERACTIVE":lang==="es"?"JERARQUIA ALARMAS — INTERACTIVO":"HIERARQUIA ALARMES — INTERATIVO"},
              {icon:"🗺️",p:lc.p3,s:lc.s3t,content:lc.s3,color:C.green,svg:<InspectionRoundSVG lang={lang}/>,svgLabel:lang==="fr"?"RONDE UMS — CHECKLIST":lang==="en"?"UMS ROUND — CHECKLIST":lang==="es"?"RONDA UMS — LISTA":"RONDA UMS — LISTA"},
              {icon:"⏱️",p:lc.p4,s:lc.s4t,content:lc.s4,color:C.red2,svg:<DeadManAlarmSVG lang={lang}/>,svgLabel:lang==="fr"?"DEAD MAN ALARM — SIMULATEUR":lang==="en"?"DEAD MAN ALARM — SIMULATOR":lang==="es"?"DEAD MAN ALARM — SIMULADOR":"DEAD MAN ALARM — SIMULADOR"},
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

            {/* Summary */}
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
                {lang==="fr"?"Quiz — UMS & Alarmes":lang==="en"?"Quiz — UMS & Alarms":lang==="es"?"Quiz — UMS & Alarmas":"Quiz — UMS & Alarmes"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · e7 L1</div>
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
                +{quizScore>=4?220:quizScore===3?130:70} {t.xp} ⭐
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
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${C.cyan},${C.amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:C.bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(0,229,255,0.3)`,marginBottom:12}}>
              {lang==="fr"?"LECON 2 — CONTROLE-COMMANDE =>":lang==="en"?"LESSON 2 — CONTROL SYSTEMS =>":lang==="es"?"LECCION 2 — CONTROL-COMANDO =>":"LICAO 2 — CONTROLO-COMANDO =>"}
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
