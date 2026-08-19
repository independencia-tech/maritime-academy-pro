import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f", cyan:"#00bcd4",
  steam:"#b0bec5", hot:"#e53935", warm:"#ef6c00", cool:"#1565c0",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e6 — Cargaison & Petrole", xp:"XP gagnes", question:"Question", ofQ:"sur", correct:"✓ Bonne reponse!", wrong:"✗ Mauvaise reponse", expl:"Explication:", next:"SUIVANT =>", finish:"VOIR MON SCORE =>", startQuiz:"COMMENCER LE QUIZ", complete:"LECON TERMINEE!", backDash:"<= RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e6 — Cargo & Oil", xp:"XP earned", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT =>", finish:"SEE MY SCORE =>", startQuiz:"START QUIZ", complete:"LESSON COMPLETE!", backDash:"<= BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Modulo e6 — Carga & Petroleo", xp:"XP ganados", question:"Pregunta", ofQ:"de", correct:"✓ Correcta!", wrong:"✗ Incorrecta", expl:"Explicacion:", next:"SIGUIENTE =>", finish:"VER PUNTUACION =>", startQuiz:"EMPEZAR QUIZ", complete:"LECCION COMPLETADA!", backDash:"<= VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver correccion", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Modulo e6 — Carga & Petroleo", xp:"XP ganhos", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicacao:", next:"PROXIMO =>", finish:"VER PONTUACAO =>", startQuiz:"COMECAR QUIZ", complete:"LICAO CONCLUIDA!", backDash:"<= VOLTAR AO PAINEL", youLearned:"Voce aprendeu:", readFirst:"Leia o conteudo e depois comece", showCorr:"Ver correcao", hideCorr:"Ocultar" },
};

function Stars() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}} viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
      {[{cx:42,cy:80,r:0.9},{cx:310,cy:45,r:1.2},{cx:180,cy:120,r:0.7},{cx:350,cy:200,r:1.0},{cx:60,cy:320,r:0.8},{cx:280,cy:380,r:1.1},{cx:130,cy:500,r:0.9},{cx:320,cy:600,r:0.7},{cx:70,cy:680,r:1.3},{cx:200,cy:750,r:0.8},{cx:360,cy:780,r:1.0},{cx:90,cy:820,r:0.6}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#e8b94f" opacity={0.28+Math.sin(i)*0.18}/>
      ))}
    </svg>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{background:"rgba(13,31,60,0.85)",border:`1px solid ${C.border}`,borderRadius:18,padding:"14px",backdropFilter:"blur(8px)",...style}}>
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
// SVG 1 — HEATING COIL IN TANK
// ══════════════════════════════════════
function HeatingCoilSVG({ lang }) {
  const [temp, setTemp] = useState(35);
  const [steamOn, setSteamOn] = useState(false);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  useEffect(() => {
    if (!steamOn) return;
    const id = setInterval(() => {
      setTemp(t => {
        if (t >= 65) { setSteamOn(false); return 65; }
        return t + 0.5;
      });
    }, 120);
    return () => clearInterval(id);
  }, [steamOn]);

  const W = 290, H = 200;
  const tankX = 30, tankY = 30, tankW = 230, tankH = 130;

  // Viscosity model: cSt = a * exp(-b*T)
  const visc = Math.round(50000 * Math.exp(-0.12 * temp));
  const viscOk = visc < 600;
  const tempColor = temp < 40 ? C.cool : temp < 55 ? C.warm : C.hot;

  // Crude fill level
  const fillH = tankH * 0.78;
  const fillY = tankY + tankH - fillH;

  // Coil path (serpentine at bottom of tank)
  const coilY = tankY + tankH - 30;
  const coilColor = steamOn ? C.hot : C.steel;

  // Bubbles when hot
  const bubbles = steamOn && temp > 50 ? [
    {x:80, y:fillY+20}, {x:130, y:fillY+35}, {x:180, y:fillY+15}, {x:220, y:fillY+28}
  ] : [];

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Tank */}
        <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="8"
          fill="rgba(13,31,60,0.7)" stroke={C.steel} strokeWidth="2"/>
        {/* Crude fill */}
        <rect x={tankX+2} y={fillY} width={tankW-4} height={fillH} rx="6"
          fill={tempColor} opacity="0.28"/>
        {/* Crude surface wave */}
        <path d={`M${tankX+2},${fillY} Q${tankX+tankW/3},${fillY-4} ${tankX+tankW/2},${fillY} Q${tankX+2*tankW/3},${fillY+4} ${tankX+tankW-2},${fillY}`}
          fill="none" stroke={tempColor} strokeWidth="1.5" opacity="0.6"/>
        {/* Heating coils (serpentine) */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <line x1={tankX+20+i*50} y1={coilY} x2={tankX+20+i*50} y2={coilY-20}
              stroke={coilColor} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
            <line x1={tankX+20+i*50} y1={coilY} x2={tankX+60+i*50} y2={coilY}
              stroke={coilColor} strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
          </g>
        ))}
        {/* Steam inlet pipe */}
        <rect x={tankX-18} y={coilY-10} width={20} height={8} rx="2"
          fill={steamOn?C.steam:C.steel} opacity="0.8"/>
        <text x={tankX-9} y={coilY-14} textAnchor="middle" fontSize="6" fill={C.steam}>
          {lbl("Vapeur","Steam","Vapor","Vapor")}
        </text>
        {/* Condensate outlet */}
        <rect x={tankX+tankW} y={coilY-10} width={20} height={8} rx="2"
          fill={C.blue2} opacity="0.6"/>
        <text x={tankX+tankW+10} y={coilY-14} textAnchor="middle" fontSize="6" fill={C.blue2}>
          {lbl("Cond.","Cond.","Cond.","Cond.")}
        </text>
        {/* Bubbles */}
        {bubbles.map((b,i) => (
          <circle key={i} cx={b.x} cy={b.y} r="3" fill={tempColor} opacity="0.5"/>
        ))}
        {/* Thermometer */}
        <rect x={W-44} y={tankY+8} width={36} height={50} rx="5"
          fill="rgba(0,0,0,0.6)" stroke={tempColor} strokeWidth="0.8"/>
        <text x={W-26} y={tankY+20} textAnchor="middle" fontSize="7" fill={tempColor} fontWeight="700">T°C</text>
        <text x={W-26} y={tankY+36} textAnchor="middle" fontSize="12" fill={tempColor} fontWeight="700">{Math.round(temp)}</text>
        <text x={W-26} y={tankY+50} textAnchor="middle" fontSize="6.5" fill={viscOk?C.green:C.red}>{viscOk?"OK":"VISC"}</text>
        {/* Viscosity readout */}
        <rect x={tankX} y={H-22} width={100} height={16} rx="4"
          fill="rgba(0,0,0,0.5)" stroke={viscOk?C.green:C.red} strokeWidth="0.8"/>
        <text x={tankX+50} y={H-11} textAnchor="middle" fontSize="7" fill={viscOk?C.green:C.red} fontWeight="700">
          {lbl("Visc.","Visc.","Visc.","Visc.")}: {visc > 9999 ? ">9999" : visc} cSt {viscOk ? "OK" : "!"}
        </text>
        {/* Cargo label */}
        <text x={tankX+tankW/2} y={fillY+20} textAnchor="middle" fontSize="8" fill={tempColor} opacity="0.7" fontWeight="700">
          {lbl("BRUT LOURD","HEAVY CRUDE","CRUDO PESADO","CRUDE PESADO")}
        </text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        <button onClick={()=>{if(!steamOn&&temp<65)setSteamOn(true)}}
          style={{padding:"10px",borderRadius:12,background:steamOn?`rgba(229,57,53,0.25)`:`rgba(229,57,53,0.15)`,border:`1px solid ${C.hot}55`,color:steamOn?C.hot:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          {steamOn ? lbl("VAPEUR ON","STEAM ON","VAPOR ON","VAPOR ON") : lbl("OUVRIR VAPEUR","OPEN STEAM","ABRIR VAPOR","ABRIR VAPOR")}
        </button>
        <button onClick={()=>{setSteamOn(false);setTemp(25)}}
          style={{padding:"10px",borderRadius:12,background:"rgba(69,90,100,0.2)",border:`1px solid ${C.steel}44`,color:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          {lbl("RESET","RESET","RESET","RESET")}
        </button>
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,
        background:viscOk?"rgba(30,138,74,0.1)":"rgba(192,57,43,0.1)",
        border:`1px solid ${viscOk?C.green:C.red}33`,fontSize:10,color:viscOk?C.green:C.red,textAlign:"center"}}>
        {viscOk
          ? lbl("Viscosite acceptable - pompage possible","Viscosity acceptable - pumping possible","Viscosidad aceptable - bombeo posible","Viscosidade aceitavel - bombagem possivel")
          : lbl("Viscosite trop haute - chauffer avant pompage","Viscosity too high - heat before pumping","Viscosidad demasiado alta - calentar antes de bombear","Viscosidade demasiado alta - aquecer antes de bombear")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — VISCOSITY vs TEMPERATURE CURVE
// ══════════════════════════════════════
function ViscCurveSVG({ lang }) {
  const [temp, setTemp] = useState(40);
  const [crudeType, setCrudeType] = useState("heavy");
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  // Viscosity models by crude type
  const viscModel = {
    heavy:  { a:80000, b:0.13, label:lbl("Brut lourd","Heavy crude","Crudo pesado","Crude pesado"), color:C.rust },
    medium: { a:8000,  b:0.11, label:lbl("Brut moyen","Medium crude","Crudo medio","Crude medio"),  color:C.orange },
    light:  { a:800,   b:0.09, label:lbl("Brut leger","Light crude","Crudo ligero","Crude ligero"), color:C.gold2 },
  };

  const model = viscModel[crudeType];
  const visc = (t) => Math.min(50000, Math.round(model.a * Math.exp(-model.b * t)));
  const currentVisc = visc(temp);
  const pumpable = 600; // cSt threshold

  const W = 290, H = 175;
  const gX = 45, gY = 15, gW = 220, gH = 120;

  // Curve points T=20 to 80°C
  const points = Array.from({length:13}, (_,i) => {
    const t = 20 + i*5;
    const v = visc(t);
    const x = gX + ((t-20)/60)*gW;
    const y = gY + gH - Math.min(1, Math.log10(v+1)/Math.log10(50001)) * gH;
    return {x, y, t, v};
  });
  const pathD = points.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Current point
  const curX = gX + ((temp-20)/60)*gW;
  const curV = visc(temp);
  const curY = gY + gH - Math.min(1, Math.log10(curV+1)/Math.log10(50001)) * gH;

  // Pumpable line Y position
  const pumpY = gY + gH - Math.min(1, Math.log10(pumpable+1)/Math.log10(50001)) * gH;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Axes */}
        <line x1={gX} y1={gY} x2={gX} y2={gY+gH} stroke={C.steel} strokeWidth="1.5"/>
        <line x1={gX} y1={gY+gH} x2={gX+gW} y2={gY+gH} stroke={C.steel} strokeWidth="1.5"/>
        {/* Temp labels */}
        {[20,30,40,50,60,70,80].map(t => {
          const x = gX + ((t-20)/60)*gW;
          return (
            <g key={t}>
              <line x1={x} y1={gY+gH} x2={x} y2={gY+gH+3} stroke={C.steel} strokeWidth="0.8"/>
              <text x={x} y={gY+gH+10} textAnchor="middle" fontSize="6.5" fill={C.muted}>{t}°</text>
            </g>
          );
        })}
        {/* Axis labels */}
        <text x={gX+gW/2} y={H-2} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("Temperature (°C)","Temperature (°C)","Temperatura (°C)","Temperatura (°C)")}
        </text>
        <text x={8} y={gY+gH/2} textAnchor="middle" fontSize="7" fill={C.muted} transform={`rotate(-90,8,${gY+gH/2})`}>
          cSt
        </text>
        {/* Pumpable threshold line */}
        <line x1={gX} y1={pumpY} x2={gX+gW} y2={pumpY}
          stroke={C.green} strokeWidth="1.2" strokeDasharray="5,3"/>
        <text x={gX+gW+2} y={pumpY+3} fontSize="6.5" fill={C.green}>600 cSt</text>
        {/* Pumpable zone label */}
        <text x={gX+10} y={gY+gH-5} fontSize="6.5" fill={C.green} opacity="0.7">
          {lbl("Pompable","Pumpable","Bombeable","Bombeavel")}
        </text>
        {/* Curve */}
        <path d={pathD} fill="none" stroke={model.color} strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Current point */}
        <circle cx={curX} cy={Math.max(gY+3, Math.min(gY+gH-3, curY))} r="6"
          fill={curV < pumpable ? C.green : C.red} opacity="0.9"/>
        {/* Readout */}
        <rect x={gX+5} y={gY+5} width={90} height={28} rx="4"
          fill="rgba(0,0,0,0.65)" stroke={curV<pumpable?C.green:C.red} strokeWidth="0.8"/>
        <text x={gX+50} y={gY+16} textAnchor="middle" fontSize="7" fill={model.color} fontWeight="700">
          {temp}°C
        </text>
        <text x={gX+50} y={gY+27} textAnchor="middle" fontSize="7"
          fill={curV<pumpable?C.green:C.red} fontWeight="700">
          {curV > 9999 ? ">9999" : curV} cSt {curV<pumpable?"OK":"!"}
        </text>
      </svg>
      {/* Controls */}
      <div style={{marginTop:8}}>
        <div style={{fontSize:9,color:model.color,marginBottom:3,fontWeight:600,textAlign:"center"}}>
          T: {temp}°C
        </div>
        <input type="range" min={20} max={80} step={1} value={temp}
          onChange={e=>setTemp(Number(e.target.value))}
          style={{width:"100%",accentColor:model.color}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginTop:8}}>
        {Object.entries(viscModel).map(([k,v])=>(
          <button key={k} onClick={()=>setCrudeType(k)}
            style={{padding:"7px 4px",borderRadius:9,background:crudeType===k?`${v.color}25`:"rgba(13,31,60,0.6)",border:`1px solid ${crudeType===k?v.color:v.color+"44"}`,color:crudeType===k?v.color:C.muted,fontSize:9,fontWeight:700,cursor:"pointer"}}>
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — STEAM HEATING SYSTEM FLOW
// ══════════════════════════════════════
function SteamSystemSVG({ lang }) {
  const [flow, setFlow] = useState(false);
  const [step, setStep] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const steps = [
    { label:{fr:"Chaudiere - Vapeur 7-8 bar",en:"Boiler - Steam 7-8 bar",es:"Caldera - Vapor 7-8 bar",pt:"Caldeira - Vapor 7-8 bar"}, color:C.hot },
    { label:{fr:"Vanne vapeur ouverte",en:"Steam valve open",es:"Valvula vapor abierta",pt:"Valvula vapor aberta"}, color:C.orange },
    { label:{fr:"Serpentins - transfert thermique",en:"Coils - heat transfer",es:"Serpentines - transferencia termica",pt:"Serpentinas - transferencia termica"}, color:C.warm },
    { label:{fr:"Condensats vers hot well",en:"Condensate to hot well",es:"Condensados al hot well",pt:"Condensados ao hot well"}, color:C.blue2 },
    { label:{fr:"Pompe condensats - retour chaudiere",en:"Condensate pump - back to boiler",es:"Bomba condensados - retorno caldera",pt:"Bomba condensados - retorno caldeira"}, color:C.teal },
  ];

  useEffect(()=>{
    if (!flow) return;
    const id = setInterval(()=>setStep(s=>(s+1)%5), 900);
    return ()=>clearInterval(id);
  }, [flow]);

  const W = 290, H = 170;
  // Component positions
  const boiler  = {x:12,  y:65, w:48, h:40};
  const valve   = {x:78,  y:78, w:28, h:18};
  const coils   = {x:124, y:55, w:60, h:50};
  const hotwell = {x:204, y:65, w:46, h:40};
  const pump    = {x:140, y:125, w:36, h:28};

  const nodes = [boiler, valve, coils, hotwell, pump];
  const cur = steps[step];

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Title */}
        <text x={W/2} y={13} textAnchor="middle" fontSize="7.5" fill={C.steam} fontWeight="700">
          {lbl("CIRCUIT VAPEUR-CONDENSATS","STEAM-CONDENSATE CIRCUIT","CIRCUITO VAPOR-CONDENSADOS","CIRCUITO VAPOR-CONDENSADOS")}
        </text>
        {/* Pipes */}
        {/* Boiler -> Valve (steam) */}
        <line x1={boiler.x+boiler.w} y1={boiler.y+boiler.h/2} x2={valve.x} y2={valve.y+valve.h/2}
          stroke={flow&&step<=1?C.hot:C.steel} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={flow&&step===0?"6,3":"none"}/>
        {/* Valve -> Coils (steam) */}
        <line x1={valve.x+valve.w} y1={valve.y+valve.h/2} x2={coils.x} y2={coils.y+coils.h/2}
          stroke={flow&&step<=2?C.orange:C.steel} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={flow&&step===1?"6,3":"none"}/>
        {/* Coils -> Hotwell (condensate) */}
        <line x1={coils.x+coils.w} y1={coils.y+coils.h/2} x2={hotwell.x} y2={hotwell.y+hotwell.h/2}
          stroke={flow&&step>=3?C.blue2:C.steel} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={flow&&step===3?"6,3":"none"}/>
        {/* Hotwell -> Pump */}
        <path d={`M${hotwell.x+hotwell.w/2},${hotwell.y+hotwell.h} L${hotwell.x+hotwell.w/2},${pump.y} L${pump.x+pump.w},${pump.y+pump.h/2}`}
          fill="none" stroke={flow&&step>=4?C.teal:C.steel} strokeWidth="2"
          strokeDasharray={flow&&step===4?"6,3":"none"}/>
        {/* Pump -> Boiler (return) */}
        <path d={`M${pump.x},${pump.y+pump.h/2} L${boiler.x+boiler.w/2},${pump.y+pump.h/2} L${boiler.x+boiler.w/2},${boiler.y+boiler.h}`}
          fill="none" stroke={flow&&step===4?C.teal:C.steel} strokeWidth="2"
          strokeDasharray={flow&&step===4?"6,3":"none"}/>
        {/* Components */}
        {/* Boiler */}
        <rect x={boiler.x} y={boiler.y} width={boiler.w} height={boiler.h} rx="6"
          fill={flow&&step===0?`${C.hot}25`:"rgba(13,31,60,0.7)"} stroke={flow&&step===0?C.hot:C.steel} strokeWidth="1.5"/>
        <text x={boiler.x+boiler.w/2} y={boiler.y+16} textAnchor="middle" fontSize="11">🔥</text>
        <text x={boiler.x+boiler.w/2} y={boiler.y+30} textAnchor="middle" fontSize="6" fill={C.hot} fontWeight="700">
          {lbl("CHAUD.","BOILER","CALD.","CALD.")}
        </text>
        <text x={boiler.x+boiler.w/2} y={boiler.y+40} textAnchor="middle" fontSize="5.5" fill={C.muted}>7-8 bar</text>
        {/* Valve */}
        <rect x={valve.x} y={valve.y} width={valve.w} height={valve.h} rx="4"
          fill={flow&&step===1?`${C.orange}25`:"rgba(13,31,60,0.7)"} stroke={flow&&step===1?C.orange:C.steel} strokeWidth="1.2"/>
        <text x={valve.x+valve.w/2} y={valve.y+11} textAnchor="middle" fontSize="7.5">🔧</text>
        <text x={valve.x+valve.w/2} y={valve.y+17} textAnchor="middle" fontSize="5" fill={C.orange}>VLV</text>
        {/* Coils */}
        <rect x={coils.x} y={coils.y} width={coils.w} height={coils.h} rx="7"
          fill={flow&&step===2?`${C.warm}25`:"rgba(13,31,60,0.7)"} stroke={flow&&step===2?C.warm:C.steel} strokeWidth="1.5"/>
        <text x={coils.x+coils.w/2} y={coils.y+18} textAnchor="middle" fontSize="13">〰️</text>
        <text x={coils.x+coils.w/2} y={coils.y+34} textAnchor="middle" fontSize="6" fill={C.warm} fontWeight="700">
          {lbl("SERP.","COILS","SERP.","SERP.")}
        </text>
        <text x={coils.x+coils.w/2} y={coils.y+44} textAnchor="middle" fontSize="5.5" fill={C.muted}>CARGO</text>
        {/* Hotwell */}
        <rect x={hotwell.x} y={hotwell.y} width={hotwell.w} height={hotwell.h} rx="6"
          fill={flow&&step===3?`${C.blue2}25`:"rgba(13,31,60,0.7)"} stroke={flow&&step===3?C.blue2:C.steel} strokeWidth="1.2"/>
        <text x={hotwell.x+hotwell.w/2} y={hotwell.y+16} textAnchor="middle" fontSize="10">💧</text>
        <text x={hotwell.x+hotwell.w/2} y={hotwell.y+30} textAnchor="middle" fontSize="5.5" fill={C.blue2} fontWeight="700">HOT WELL</text>
        <text x={hotwell.x+hotwell.w/2} y={hotwell.y+40} textAnchor="middle" fontSize="5" fill={C.muted}>Cond.</text>
        {/* Pump */}
        <rect x={pump.x} y={pump.y} width={pump.w} height={pump.h} rx="5"
          fill={flow&&step===4?`${C.teal}25`:"rgba(13,31,60,0.7)"} stroke={flow&&step===4?C.teal:C.steel} strokeWidth="1.2"/>
        <text x={pump.x+pump.w/2} y={pump.y+14} textAnchor="middle" fontSize="9">⚙️</text>
        <text x={pump.x+pump.w/2} y={pump.y+24} textAnchor="middle" fontSize="5.5" fill={C.teal}>{lbl("POMPE","PUMP","BOMBA","BOMBA")}</text>
        {/* Step indicator */}
        <rect x={8} y={H-18} width={274} height={12} rx="4" fill="rgba(0,0,0,0.4)"/>
        <text x={145} y={H-8} textAnchor="middle" fontSize="7" fill={flow?cur.color:C.muted} fontWeight="700">
          {flow ? lbl(cur.label.fr,cur.label.en,cur.label.es,cur.label.pt) : lbl("Cliquer pour demarrer","Click to start","Clic para iniciar","Clicar para iniciar")}
        </text>
      </svg>
      <button onClick={()=>setFlow(v=>!v)}
        style={{width:"100%",marginTop:8,padding:"10px",borderRadius:12,background:flow?`rgba(229,57,53,0.2)`:`rgba(229,57,53,0.12)`,border:`1px solid ${C.hot}44`,color:flow?C.hot:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
        {flow ? lbl("ARRET VAPEUR","STOP STEAM","PARAR VAPOR","PARAR VAPOR") : lbl("DEMARRER VAPEUR","START STEAM","INICIAR VAPOR","INICIAR VAPOR")}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — MULTI-TANK TEMP MONITORING
// ══════════════════════════════════════
function TempMonitorSVG({ lang }) {
  const [temps, setTemps] = useState({t1:38,t2:52,t3:61,t4:45,t5:35,t6:58});
  const [selected, setSelected] = useState(null);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const tanks = [
    {id:"t1",x:12, y:28,w:70,h:42,label:"P1"},
    {id:"t2",x:90, y:28,w:70,h:42,label:"P2"},
    {id:"t3",x:168,y:28,w:70,h:42,label:"P3"},
    {id:"t4",x:12, y:80,w:70,h:42,label:"S1"},
    {id:"t5",x:90, y:80,w:70,h:42,label:"S2"},
    {id:"t6",x:168,y:80,w:70,h:42,label:"S3"},
  ];

  const getTempColor = (t) => t < 45 ? C.cool : t < 55 ? C.warm : t >= 60 ? C.hot : C.green;
  const getTempStatus = (t) => t < 45 ? lbl("Froid","Cold","Frio","Frio") : t < 55 ? lbl("Chauffe","Heating","Calentando","Aquecendo") : t >= 62 ? lbl("MAX!","MAX!","MAX!","MAX!") : lbl("OK","OK","OK","OK");

  const adjustTemp = (id, delta) => {
    setTemps(prev => ({...prev, [id]: Math.max(20, Math.min(65, prev[id]+delta))}));
  };

  return (
    <div>
      <svg width={250} height={135} viewBox="0 0 250 135">
        <rect width={250} height={135} fill="#061020" rx="8"/>
        <text x={125} y={16} textAnchor="middle" fontSize="7.5" fill={C.steam} fontWeight="700">
          {lbl("MONITORING TEMPERATURES CITERNES","TANK TEMPERATURE MONITORING","MONITOREO TEMPERATURA TANQUES","MONITORAMENTO TEMPERATURA TANQUES")}
        </text>
        {tanks.map(t => {
          const T = temps[t.id];
          const col = getTempColor(T);
          const st = getTempStatus(T);
          const barH = (Math.max(0,T-20)/45)*t.h*0.6;
          const isSel = selected===t.id;
          return (
            <g key={t.id} style={{cursor:"pointer"}} onClick={()=>setSelected(t.id===selected?null:t.id)}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="5"
                fill={`${col}12`} stroke={isSel?C.gold:col} strokeWidth={isSel?1.8:1}/>
              {/* Temp bar */}
              <rect x={t.x+t.w-14} y={t.y+t.h-barH-2} width={10} height={barH} rx="2"
                fill={col} opacity="0.6"/>
              <text x={t.x+t.w/2-4} y={t.y+14} textAnchor="middle" fontSize="8" fill={col} fontWeight="700">{t.label}</text>
              <text x={t.x+t.w/2-4} y={t.y+27} textAnchor="middle" fontSize="10" fill={col} fontWeight="700">{T}°</text>
              <text x={t.x+t.w/2-4} y={t.y+39} textAnchor="middle" fontSize="6.5" fill={col}>{st}</text>
            </g>
          );
        })}
        {/* Alarm bar */}
        <rect x={8} y={128} width={234} height={6} rx="3" fill="rgba(0,0,0,0.4)"/>
        {Object.values(temps).filter(t=>t<45).length > 0 && (
          <rect x={8} y={128} width={234} height={6} rx="3" fill={C.cool} opacity="0.4"/>
        )}
      </svg>
      {selected && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${getTempColor(temps[selected])}12`,border:`1px solid ${getTempColor(temps[selected])}44`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{flex:1}}>
            <span style={{fontSize:11,color:getTempColor(temps[selected]),fontWeight:700}}>
              {tanks.find(t=>t.id===selected)?.label}: {temps[selected]}°C
            </span>
            <div style={{fontSize:9,color:C.muted,marginTop:2}}>
              {lbl("Cible: 55-60°C pour pompage optimal","Target: 55-60°C for optimal pumping","Objetivo: 55-60°C para bombeo optimo","Alvo: 55-60°C para bombagem otima")}
            </div>
          </div>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>adjustTemp(selected,-1)}
              style={{width:28,height:28,borderRadius:8,background:"rgba(21,101,192,0.3)",border:`1px solid ${C.cool}44`,color:C.blue2,fontSize:14,cursor:"pointer",fontWeight:700}}>-</button>
            <button onClick={()=>adjustTemp(selected,1)}
              style={{width:28,height:28,borderRadius:8,background:"rgba(229,57,53,0.3)",border:`1px solid ${C.hot}44`,color:C.hot,fontSize:14,cursor:"pointer",fontWeight:700}}>+</button>
          </div>
        </div>
      )}
      {!selected && (
        <div style={{marginTop:6,padding:"7px 10px",borderRadius:8,background:"rgba(0,0,0,0.3)",border:`1px solid ${C.border}`,fontSize:9,color:C.gold2,textAlign:"center"}}>
          {lbl("Toucher une citerne pour ajuster sa temperature","Tap a tank to adjust its temperature","Tocar un tanque para ajustar su temperatura","Tocar um tanque para ajustar a temperatura")}
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginTop:6}}>
        {[{c:C.cool,l:lbl("< 45C Froid","< 45C Cold","< 45C Frio","< 45C Frio")},{c:C.green,l:lbl("55-60C OK","55-60C OK","55-60C OK","55-60C OK")},{c:C.hot,l:lbl("> 62C Max","> 62C Max","> 62C Max","> 62C Max")}].map((item,i)=>(
          <div key={i} style={{padding:"5px",borderRadius:6,background:`${item.c}12`,border:`1px solid ${item.c}33`,fontSize:8,color:item.c,textAlign:"center",fontWeight:600}}>
            {item.l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MT PRESTIGE (2002)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MT Prestige - Galice, Espagne (2002)",
      teaser:"VLCC 81 000 tdw - Rupture structure - 63 000 t fioul No.6 - 2 900 km cotes souillees - Catastrophe ecologique",
      what:"Le 13 novembre 2002, le petrolier monohull Prestige (battant pavillon des Bahamas) subit une avarie de structure par mer forte au large des cotes galiciennes. La citerne No.2 babord cede. Le capitaine demande un port refuge mais l'Espagne, le Portugal et la France refusent. Le navire derive pendant 6 jours avant de se briser en deux le 19 novembre a 250 km des cotes. 63 000 tonnes de fioul No.6 (extra-lourd, tres visqueux) se deversent. La catastrophe touche 2 900 km de cotes espagnoles, francaises et portugaises. 300 000 oiseaux morts. Le fioul No.6 etait transporte a temperature trop basse: sa viscosite etait si elevee qu'il gelait sur les cotes, rendant le nettoyage quasi impossible.",
      cause:"- Structure vieillissante (26 ans) et sous-standard\n- Fioul No.6 extra-lourd transporte sans chauffage adequat\n- Viscosite excessive : fioul gelifie sur les plages (nettoyage impossible)\n- Refus de port de refuge par 3 pays europeens\n- Derive imposee = aggravation de la rupture structurelle\n- Absence de plan d'urgence international coordonne",
      lessons:"- Directive EU 2002/84 : retrait anticipe des petroliers simples coques\n- Port de refuge : obligation des etats membres (directive 2002/59)\n- Temperature minimum de transport pour fiouls lourds (MARPOL)\n- Renforcement inspections PSC : petroliers simples coques\n- Fonds FIPOL revu a la hausse (compensation victimes)\n- Creation du reseau EUROSUR de surveillance maritime",
      link:"Lien L5 Chauffage : Le Prestige illustre la criticite du chauffage cargo. Le fioul No.6 non chauffe correctement (viscosite > 6000 cSt) devient un solide sur les plages. Un chauffage cargo adequat (50-65°C) maintient la viscosite < 600 cSt, permettant pompage et recuperation en cas d'accident.",
    },
    en:{
      title:"MT Prestige - Galicia, Spain (2002)",
      teaser:"VLCC 81,000 DWT - Structural failure - 63,000 t No.6 fuel oil - 2,900 km of polluted coastline",
      what:"On November 13, 2002, the single-hull tanker Prestige (Bahamas flag) suffered structural damage in heavy seas off the Galician coast. Port No.2 tank failed. The captain requested a place of refuge but Spain, Portugal and France all refused. The vessel drifted for 6 days before breaking in two on November 19, 250 km offshore. 63,000 tonnes of No.6 fuel oil (extra-heavy, highly viscous) spilled. The disaster affected 2,900 km of Spanish, French and Portuguese coastlines. 300,000 birds died. The No.6 fuel oil was being transported at too low a temperature: its viscosity was so high it solidified on the coastlines, making cleanup nearly impossible.",
      cause:"- Aging (26 years) sub-standard single-hull structure\n- Extra-heavy No.6 fuel oil transported without adequate heating\n- Excessive viscosity: fuel oil solidified on beaches (cleanup near-impossible)\n- Place of refuge refused by 3 European countries\n- Forced drift = structural failure worsened\n- No coordinated international emergency plan",
      lessons:"- EU Directive 2002/84: early phase-out of single-hull tankers\n- Place of refuge: EU member state obligation (Directive 2002/59)\n- Minimum transport temperature for heavy fuel oils (MARPOL)\n- Strengthened PSC inspections: single-hull tankers\n- IOPC Funds increased (victim compensation)\n- EUROSUR maritime surveillance network created",
      link:"L5 Heating Link: Prestige illustrates the criticality of cargo heating. Inadequately heated No.6 fuel oil (viscosity > 6,000 cSt) becomes a solid on beaches. Adequate cargo heating (50-65°C) maintains viscosity < 600 cSt, enabling pumping and recovery in case of accident.",
    },
    es:{
      title:"MT Prestige - Galicia, Espana (2002)",
      teaser:"VLCC 81.000 TPM - Rotura estructural - 63.000 t fuel No.6 - 2.900 km costa contaminada",
      what:"El 13 de noviembre de 2002, el petrolero monocasco Prestige sufrio una averia estructural con mar gruesa frente a las costas gallegas. El tanque No.2 de babor cedio. El capitan pidio puerto de refugio pero Espana, Portugal y Francia lo rechazaron. El buque derivo 6 dias antes de partirse en dos el 19 de noviembre. 63.000 toneladas de fuel No.6 (extra-pesado, muy viscoso) se derramaron. La catastrofe afecto 2.900 km de costas. 300.000 aves muertas. El fuel No.6 se transportaba a temperatura demasiado baja: su viscosidad era tan alta que se solidificaba en las playas.",
      cause:"- Estructura envejecida (26 anos) y subestandar\n- Fuel No.6 extra-pesado sin calefaccion adecuada\n- Viscosidad excesiva: fuel solidificado en playas\n- Puerto de refugio rechazado por 3 paises europeos\n- Deriva impuesta = agravamiento de la rotura estructural",
      lessons:"- Directiva EU 2002/84: retirada anticipada monocascos\n- Puerto de refugio: obligacion estados miembros UE\n- Temperatura minima transporte fiouls pesados (MARPOL)\n- Refuerzo inspecciones PSC\n- Fondos IOPC aumentados",
      link:"Vinculo L5 Calefaccion: El Prestige ilustra la criticidad de la calefaccion de carga. El fuel No.6 mal calentado (viscosidad > 6.000 cSt) se solidifica en las playas. Una calefaccion adecuada (50-65°C) mantiene la viscosidad < 600 cSt, permitiendo el bombeo y la recuperacion.",
    },
    pt:{
      title:"MT Prestige - Galiza, Espanha (2002)",
      teaser:"VLCC 81.000 TPB - Falha estrutural - 63.000 t fuel No.6 - 2.900 km costa poluida",
      what:"A 13 de novembro de 2002, o petroleiro de casco simples Prestige sofreu danos estruturais com mar grosso ao largo da costa galega. O tanque No.2 de bombordo cedeu. O capitao pediu porto de refugio mas a Espanha, Portugal e a Franca recusaram. O navio derivou 6 dias antes de partir-se em dois a 19 de novembro. 63.000 toneladas de fuel No.6 (extra-pesado, muito viscoso) derramaram-se. A catastrofe afectou 2.900 km de costas. 300.000 aves mortas. O fuel No.6 era transportado a temperatura demasiado baixa: a sua viscosidade era tao elevada que solidificava nas costas.",
      cause:"- Estrutura envelhecida (26 anos) e subnorma\n- Fuel No.6 extra-pesado sem aquecimento adequado\n- Viscosidade excessiva: fuel solidificado nas praias\n- Porto de refugio recusado por 3 paises europeus\n- Deriva imposta = agravamento da rotura estrutural",
      lessons:"- Directiva EU 2002/84: retirada antecipada monocastos\n- Porto de refugio: obrigacao estados membros UE\n- Temperatura minima transporte fiouls pesados (MARPOL)\n- Reforcadas inspecoes PSC\n- Fundos IOPC aumentados",
      link:"Vinculo L5 Aquecimento: O Prestige ilustra a criticidade do aquecimento da carga. O fuel No.6 mal aquecido (viscosidade > 6.000 cSt) solidifica nas praias. Um aquecimento adequado (50-65°C) mantem a viscosidade < 600 cSt, permitindo a bombagem e recuperacao.",
    },
  };
  const c = d[lang]||d.fr;
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
      {id:"q1",q:"Quelle est la plage de temperature cible pour le chauffage de brut lourd ?\n(Repondre en °C, ex: 50-65)"},
      {id:"q2",q:"Quel composant transfere la chaleur de la vapeur au cargo dans la citerne ?\n(Repondre en un mot)"},
      {id:"q3",q:"Quelle est la viscosite maximale acceptable pour pomper un brut ?\n(Repondre en cSt)"},
      {id:"q4",q:"Ou va la vapeur apres avoir chauffe le cargo ?\n(Repondre : hot well, sea chest ou ballast)"},
      {id:"q5",q:"Quel evenement de 2002 a illustre le danger du fioul lourd non chauffe ?\n(Repondre : nom du navire)"},
    ],
    en:[
      {id:"q1",q:"What is the target temperature range for heavy crude heating?\n(Answer in °C, e.g. 50-65)"},
      {id:"q2",q:"Which component transfers heat from steam to cargo in the tank?\n(Answer in one word)"},
      {id:"q3",q:"What is the maximum acceptable viscosity to pump crude?\n(Answer in cSt)"},
      {id:"q4",q:"Where does the steam go after heating the cargo?\n(Answer: hot well, sea chest or ballast)"},
      {id:"q5",q:"Which 2002 event illustrated the danger of unheated heavy fuel oil?\n(Answer: vessel name)"},
    ],
    es:[
      {id:"q1",q:"?Cual es el rango de temperatura objetivo para el calentamiento de crudo pesado?\n(Responder en °C, ej: 50-65)"},
      {id:"q2",q:"?Que componente transfiere el calor del vapor a la carga en el tanque?\n(Responder en una palabra)"},
      {id:"q3",q:"?Cual es la viscosidad maxima aceptable para bombear un crudo?\n(Responder en cSt)"},
      {id:"q4",q:"?Adonde va el vapor tras calentar la carga?\n(Responder: hot well, sea chest o lastre)"},
      {id:"q5",q:"?Que evento de 2002 ilustro el peligro del fuel pesado sin calentar?\n(Responder: nombre del buque)"},
    ],
    pt:[
      {id:"q1",q:"Qual e a gama de temperatura alvo para o aquecimento de crude pesado?\n(Responder em °C, ex: 50-65)"},
      {id:"q2",q:"Qual componente transfere o calor do vapor para a carga no tanque?\n(Responder numa palavra)"},
      {id:"q3",q:"Qual e a viscosidade maxima aceitavel para bombear um crude?\n(Responder em cSt)"},
      {id:"q4",q:"Para onde vai o vapor apos aquecer a carga?\n(Responder: hot well, sea chest ou lastro)"},
      {id:"q5",q:"Que evento de 2002 ilustrou o perigo do fuel pesado nao aquecido?\n(Responder: nome do navio)"},
    ],
  };

  const chk = (id, val) => {
    const v = val.trim().toLowerCase().replace(/\s/g,"").replace("°c","");
    if (id==="q1") return v.includes("50")||v.includes("55")||v.includes("60")||v.includes("65");
    if (id==="q2") return v.includes("serpentin")||v.includes("coil")||v.includes("serpentina");
    if (id==="q3") return v==="600"||v==="<600"||v==="600cst";
    if (id==="q4") return v.includes("hotwell")||v.includes("hot well")||v.includes("hotwell");
    if (id==="q5") return v.includes("prestige");
    return false;
  };

  const corrKey = {
    fr:{q1:"50-65°C",q2:"Serpentin",q3:"600 cSt",q4:"Hot well",q5:"MT Prestige"},
    en:{q1:"50-65°C",q2:"Coil",q3:"600 cSt",q4:"Hot well",q5:"MT Prestige"},
    es:{q1:"50-65°C",q2:"Serpentin",q3:"600 cSt",q4:"Hot well",q5:"MT Prestige"},
    pt:{q1:"50-65°C",q2:"Serpentina",q3:"600 cSt",q4:"Hot well",q5:"MT Prestige"},
  };

  const expl = {
    fr:"OK Q1: 50-65°C selon type de brut et viscosite cible\nOK Q2: Serpentin (heating coil) - tubes dans la citerne alimentes par vapeur\nOK Q3: 600 cSt - viscosite max pour pompes cargo centrifuges\nOK Q4: Hot well - recupere les condensats avant retour chaudiere\nOK Q5: MT Prestige - fuel No.6 non chauffe solidifie sur les plages galiciennes",
    en:"OK Q1: 50-65°C depending on crude type and target viscosity\nOK Q2: Coil (heating coil) - tubes in tank fed by steam\nOK Q3: 600 cSt - max viscosity for centrifugal cargo pumps\nOK Q4: Hot well - recovers condensate before boiler return\nOK Q5: MT Prestige - unheated No.6 fuel oil solidified on Galician beaches",
    es:"OK Q1: 50-65°C segun tipo de crudo y viscosidad objetivo\nOK Q2: Serpentin (heating coil) - tubos en el tanque alimentados por vapor\nOK Q3: 600 cSt - viscosidad max para bombas de carga centrifugas\nOK Q4: Hot well - recupera condensados antes del retorno a la caldera\nOK Q5: MT Prestige - fuel No.6 sin calentar solidificado en las playas gallegas",
    pt:"OK Q1: 50-65°C conforme tipo de crude e viscosidade alvo\nOK Q2: Serpentina (heating coil) - tubos no tanque alimentados por vapor\nOK Q3: 600 cSt - viscosidade max para bombas de carga centrifugas\nOK Q4: Hot well - recupera condensados antes do retorno a caldeira\nOK Q5: MT Prestige - fuel No.6 nao aquecido solidificado nas praias galegas",
  };

  const list = qs[lang]||qs.fr;
  const ck = corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.hot}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"Rappels: 50-65°C - serpentin - 600 cSt - hot well - MT Prestige 2002"
        :lang==="en"?"Reminders: 50-65°C - coil - 600 cSt - hot well - MT Prestige 2002"
        :lang==="es"?"Recordatorios: 50-65°C - serpentin - 600 cSt - hot well - MT Prestige 2002"
        :"Lembretes: 50-65°C - serpentina - 600 cSt - hot well - MT Prestige 2002"}
      </div>
      {list.map((q,i)=>(
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
        {showC?t.hideCorr:t.showCorr}
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
  if (pct === 1)  return { icon:"🏆", color:"#f1c40f", label:{fr:"Parfait !",     en:"Perfect!",      es:"Perfecto!",    pt:"Perfeito!"} };
  if (pct >= 0.8) return { icon:"🥇", color:"#e8b94f", label:{fr:"Excellent !",   en:"Excellent!",    es:"Excelente!",   pt:"Excelente!"} };
  if (pct >= 0.6) return { icon:"🥈", color:"#b0bec5", label:{fr:"Bien !",        en:"Well done!",    es:"Bien!",        pt:"Bem feito!"} };
  if (pct >= 0.4) return { icon:"🥉", color:"#cd7f32", label:{fr:"Continue !",    en:"Keep going!",   es:"Sigue!",       pt:"Continue!"} };
  return                 { icon:"📚", color:"rgba(240,244,255,0.45)", label:{fr:"A retravailler", en:"Keep studying", es:"A repasar", pt:"Continue estudando"} };
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM
// ══════════════════════════════════════
function QuestionBank({ lang, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const qs = {
    fr:[
      {q:"Quel composant transfère la chaleur de la vapeur au brut dans la citerne ?",opts:["La pompe cargo","Le serpentin (heating coil)","Le scrubber","La soufflante"],ans:1,expl:"Le serpentin (heating coil) est un reseau de tubes installes au fond de la citerne, alimentes par de la vapeur a 7-8 bar. La chaleur se transfere par conduction a travers les parois du tube vers le brut environnant."},
      {q:"Quelle est la plage de temperature cible pour le chauffage d'un brut lourd ?",opts:["20-35°C","40-50°C","50-65°C","70-80°C"],ans:2,expl:"La temperature cible est 50-65°C pour les bruts lourds. A cette temperature, la viscosite descend sous 600 cSt, seuil requis pour le fonctionnement correct des pompes cargo centrifuges. La temperature maximale est generalement 65°C pour eviter le coke."},
      {q:"Quelle est la viscosite maximale pour qu'une pompe cargo centrifuge fonctionne correctement ?",opts:["100 cSt","300 cSt","600 cSt","2000 cSt"],ans:2,expl:"600 cSt est le seuil critique pour les pompes cargo centrifuges. Au-dela, le brut est trop epais: la pompe cavite, surchauffe, et risque de bloquer. Le chauffage est donc une condition operationnelle indispensable pour les bruts lourds (API < 20)."},
      {q:"Quelle pression fournit la vapeur chauffante aux serpentins de cargo ?",opts:["0,5-1 bar","3-5 bar","7-8 bar","15-20 bar"],ans:2,expl:"La vapeur de chauffage cargo est typiquement a 7-8 bar (vapeur de service basse pression). Cette pression correspond a une temperature de saturation d'environ 170°C, assurant un differentiel thermique suffisant avec le brut (50-65°C cible)."},
      {q:"Ou vont les condensats apres le passage dans les serpentins cargo ?",opts:["Rejet en mer","Hot well puis retour chaudiere","Citerne de ballast","Citerne slop"],ans:1,expl:"Les condensats (vapeur condensee dans les serpentins apres avoir cede sa chaleur) sont collectes dans le hot well (bache alimentaire). Ils sont ensuite pompes vers la chaudiere pour regeneration en vapeur. Ce circuit ferme economise l'eau et l'energie."},
      {q:"Quelle relation existe entre temperature et viscosite d'un brut lourd ?",opts:["Temperature monte => viscosite monte","Temperature monte => viscosite descend","Relation lineaire directe","Aucune relation"],ans:1,expl:"La viscosite d'un brut lourd suit une loi exponentielle decroissante avec la temperature (loi de Walther-ASTM). Quand la temperature double, la viscosite peut diminuer d'un facteur 10 a 100. C'est pourquoi un chauffage modere (ex: de 30 a 55°C) reduit drastiquement la viscosite."},
      {q:"Qu'est-ce que l'API gravity d'un brut et comment influe-t-elle sur le chauffage ?",opts:["Mesure de la pression","Indice de densite: bas API = brut lourd = chauffage necessaire","Mesure de la temperature","Indice de toxicite"],ans:1,expl:"L'API gravity est une echelle de densite (American Petroleum Institute). Un brut leger = API > 31. Un brut lourd = API < 22. Un brut extra-lourd = API < 10. Plus l'API est bas, plus le brut est visqueux a temperature ambiante et plus un chauffage intensif est necessaire pour le pomper."},
      {q:"Quelle est la consequence d'une temperature de cargo trop elevee (> 65°C) ?",opts:["Viscosite trop haute","Formation de coke et depot dans la citerne","Explosion des citernes","Corrosion des pompes"],ans:1,expl:"Au-dessus de 65°C, les bruts lourds peuvent former des depots de coke (carbone) sur les parois des serpentins et de la citerne. Ce coke reduit l'efficacite du transfert thermique et peut endommager les pompes. La limite operationnelle est generalement fixee a 60-65°C maximum."},
      {q:"Le MT Prestige (2002) a demontre que le fioul No.6 non chauffe adequatement :",opts:["Explose plus facilement","Se solidifie sur les cotes et est impossible a nettoyer","Se melange a l'eau de mer","Provoque des incendies"],ans:1,expl:"Le fioul No.6 du Prestige, transporté à temperature insuffisante, avait une viscosite > 6000 cSt. Lorsqu'il a atteint les plages galiciennes a temperature ambiante (< 15°C), il s'est solidifie en une pate noire quasi-impossible a nettoyer. Un chauffage adequat aurait maintenu une viscosite pompable."},
      {q:"Quelle est la fonction du 'temperature log' dans le contexte du chauffage cargo ?",opts:["Mesurer la temperature de la salle des machines","Enregistrer les temperatures par citerne pour Cargo Record Book","Controler la vapeur principale","Surveiller les condensats"],ans:1,expl:"Le temperature log (journal des temperatures) est un document obligatoire enregistrant toutes les temperatures des citernes cargo toutes les 4 heures. Il permet de verifier la conformite avec les instructions du charger et de la charte-partie, et fait partie du Cargo Record Book."},
      {q:"Quel est le role du 'heating rate' (taux de chauffage) dans les instructions cargo ?",opts:["Vitesse de pompage","Vitesse de montee en temperature autorisee par heure","Debit de vapeur par citerne","Pression nominale des serpentins"],ans:1,expl:"Le heating rate est la montee en temperature maximale autorisee, typiquement 2-3°C/heure. Un chauffage trop rapide provoque une dilatation inegale du cargo, des contraintes sur les cloisons, et risque de fracturer certains bruts waxy (bruts a cire) en formant des blocs solides non dissous."},
      {q:"Pour un brut de type 'waxy crude', quelle precaution specifique est necessaire ?",opts:["Refroidir avant pompage","Ne jamais depasser 40°C","Chauffer au-dessus du WAT (Wax Appearance Temperature)","Utiliser des solvants chimiques"],ans:2,expl:"Le WAT (Wax Appearance Temperature) est la temperature en dessous de laquelle la paraffine commence a se cristalliser dans le brut. Pour les waxy crudes (bruts a haute teneur en paraffines), il faut maintenir la temperature toujours au-dessus du WAT (souvent 35-50°C) pour eviter la solidification partielle."},
      {q:"Quelle difference existe entre 'heating coils' et 'deep well pumps' pour bruts lourds ?",opts:["Les deep well pumps chauffent aussi le cargo","Les heating coils pompent et les pumps chauffent","Les heating coils chauffent par vapeur, les pumps evacuent le cargo","Il n'y a aucune difference"],ans:2,expl:"Le heating coil chauffe le cargo par transfert thermique vapeur. La deep well pump (pompe immergee dans le cargo) est une pompe centrifuge verticale utilisee pour aspirer le cargo au fond de la citerne, en remplacement ou complement des pompes principales. Les deux sont independants mais complementaires."},
      {q:"Quelle est la signification operationnelle du terme 'pour point' ?",opts:["Temperature maximale de pompage","Temperature a laquelle le brut cesse de couler","Pression minimale aux serpentins","Viscosite minimale acceptable"],ans:1,expl:"Le pour point est la temperature la plus basse a laquelle un brut reste fluide (au sens ASTM D97). En dessous du pour point, le brut se gelifie et ne peut plus couler. Le heating coil doit maintenir la temperature du cargo toujours bien au-dessus du pour point (generalement +10°C minimum)."},
      {q:"Combien de serpentins par citerne sur un VLCC typique ?",opts:["1 serpentin","2 serpentins independants (avant + arriere)","5 serpentins","10 serpentins"],ans:1,expl:"Un VLCC typique est equipe de 2 serpentins independants par citerne (forward coil + aft coil), chacun avec sa propre vanne d'isolation. Cette redondance permet de continuer le chauffage si un serpentin est defaillant, et de moduler le chauffage (ex: citerne a moitie pleine)."},
    ],
    en:[
      {q:"Which component transfers heat from steam to crude in the tank?",opts:["The cargo pump","The heating coil","The scrubber","The blower"],ans:1,expl:"The heating coil is a network of tubes installed at the bottom of the tank, fed with steam at 7-8 bar. Heat transfers by conduction through the tube walls to the surrounding crude."},
      {q:"What is the target temperature range for heavy crude heating?",opts:["20-35°C","40-50°C","50-65°C","70-80°C"],ans:2,expl:"The target temperature is 50-65°C for heavy crudes. At this temperature, viscosity drops below 600 cSt, the threshold required for correct centrifugal cargo pump operation. The maximum temperature is generally 65°C to avoid coking."},
      {q:"What is the maximum viscosity for a centrifugal cargo pump to work correctly?",opts:["100 cSt","300 cSt","600 cSt","2000 cSt"],ans:2,expl:"600 cSt is the critical threshold for centrifugal cargo pumps. Beyond this, the crude is too thick: the pump cavitates, overheats, and risks seizure. Heating is therefore an indispensable operational condition for heavy crudes (API < 20)."},
      {q:"What pressure does the heating steam supply to cargo coils?",opts:["0.5-1 bar","3-5 bar","7-8 bar","15-20 bar"],ans:2,expl:"Cargo heating steam is typically at 7-8 bar (low-pressure service steam). This pressure corresponds to a saturation temperature of about 170°C, ensuring sufficient thermal differential with the crude (50-65°C target)."},
      {q:"Where do condensates go after passing through cargo coils?",opts:["Discharged at sea","Hot well then back to boiler","Ballast tank","Slop tank"],ans:1,expl:"Condensates (steam condensed in the coils after giving up heat) are collected in the hot well (feed water tank). They are then pumped back to the boiler for regeneration as steam. This closed circuit saves water and energy."},
      {q:"What is the relationship between temperature and heavy crude viscosity?",opts:["Temperature rises => viscosity rises","Temperature rises => viscosity drops","Direct linear relationship","No relationship"],ans:1,expl:"Heavy crude viscosity follows a decreasing exponential law with temperature (Walther-ASTM law). When temperature doubles, viscosity can decrease by a factor of 10 to 100. That's why moderate heating (e.g. from 30 to 55°C) drastically reduces viscosity."},
      {q:"What is API gravity and how does it affect heating?",opts:["Pressure measurement","Density index: low API = heavy crude = heating required","Temperature measurement","Toxicity index"],ans:1,expl:"API gravity is a density scale (American Petroleum Institute). Light crude = API > 31. Heavy crude = API < 22. Extra-heavy = API < 10. The lower the API, the more viscous the crude at ambient temperature and the more intensive heating is needed to pump it."},
      {q:"What is the consequence of cargo temperature too high (> 65°C)?",opts:["Viscosity too high","Coke formation and deposits in tank","Tank explosion","Pump corrosion"],ans:1,expl:"Above 65°C, heavy crudes can form coke deposits (carbon) on coil and tank walls. This coke reduces heat transfer efficiency and can damage pumps. The operational limit is generally set at 60-65°C maximum."},
      {q:"The MT Prestige (2002) demonstrated that inadequately heated No.6 fuel oil:",opts:["Explodes more easily","Solidifies on coastlines and is impossible to clean up","Mixes with seawater","Causes fires"],ans:1,expl:"The Prestige's No.6 fuel oil, transported at insufficient temperature, had a viscosity > 6,000 cSt. When it reached Galician beaches at ambient temperature (< 15°C), it solidified into a near-uncleanable black paste. Adequate heating would have maintained a pumpable viscosity."},
      {q:"What is the function of the 'temperature log' in cargo heating?",opts:["Measure engine room temperature","Record per-tank temperatures for Cargo Record Book","Control main steam","Monitor condensates"],ans:1,expl:"The temperature log is a mandatory document recording all cargo tank temperatures every 4 hours. It verifies compliance with shipper instructions and charter party, and forms part of the Cargo Record Book."},
      {q:"What is the role of 'heating rate' in cargo instructions?",opts:["Pumping speed","Maximum permitted temperature rise per hour","Steam flow per tank","Nominal coil pressure"],ans:1,expl:"The heating rate is the maximum permitted temperature rise, typically 2-3°C/hour. Too rapid heating causes uneven cargo expansion, stress on bulkheads, and risks fracturing some waxy crudes into undissolved solid blocks."},
      {q:"For a 'waxy crude', what specific precaution is needed?",opts:["Cool before pumping","Never exceed 40°C","Heat above the WAT (Wax Appearance Temperature)","Use chemical solvents"],ans:2,expl:"The WAT (Wax Appearance Temperature) is the temperature below which paraffin starts to crystallize in the crude. For waxy crudes (high paraffin content), temperature must always be maintained above the WAT (often 35-50°C) to prevent partial solidification."},
      {q:"What is the operational meaning of 'pour point'?",opts:["Maximum pumping temperature","Temperature at which crude stops flowing","Minimum coil pressure","Minimum acceptable viscosity"],ans:1,expl:"The pour point is the lowest temperature at which a crude remains fluid (ASTM D97). Below the pour point, the crude gels and can no longer flow. The heating coil must maintain cargo temperature always well above the pour point (generally minimum +10°C)."},
      {q:"How many coils per tank on a typical VLCC?",opts:["1 coil","2 independent coils (forward + aft)","5 coils","10 coils"],ans:1,expl:"A typical VLCC is equipped with 2 independent coils per tank (forward coil + aft coil), each with its own isolation valve. This redundancy allows continued heating if one coil fails, and allows modulated heating (e.g. half-full tank)."},
      {q:"What does 'API gravity' of 12 indicate about a crude's pumpability?",opts:["Light crude - no heating needed","Extra-heavy crude - intensive heating mandatory","Medium crude - moderate heating","Gas condensate - no heating needed"],ans:1,expl:"API 12 indicates an extra-heavy crude (API < 10-15). This crude has an extremely high viscosity at ambient temperature (potentially millions of cSt). Intensive heating to 55-65°C is absolutely mandatory before any pumping operation."},
    ],
    es:[
      {q:"?Que componente transfiere el calor del vapor al crudo en el tanque?",opts:["La bomba de carga","El serpentin (heating coil)","El depurador","La soplante"],ans:1,expl:"El serpentin es una red de tubos instalados en el fondo del tanque, alimentados con vapor a 7-8 bar. El calor se transfiere por conduccion a traves de las paredes del tubo hacia el crudo circundante."},
      {q:"?Cual es el rango de temperatura objetivo para el calentamiento de crudo pesado?",opts:["20-35°C","40-50°C","50-65°C","70-80°C"],ans:2,expl:"La temperatura objetivo es 50-65°C para crudos pesados. A esta temperatura, la viscosidad baja de 600 cSt, umbral requerido para el correcto funcionamiento de las bombas de carga centrifugas."},
      {q:"?Cual es la viscosidad maxima para que una bomba de carga centrifuga funcione correctamente?",opts:["100 cSt","300 cSt","600 cSt","2000 cSt"],ans:2,expl:"600 cSt es el umbral critico para las bombas centrifugas. Por encima, el crudo es demasiado espeso: la bomba cavita, se sobrecalienta y puede bloquearse. El calentamiento es condicion operativa indispensable para crudos pesados (API < 20)."},
      {q:"?A que presion suministra el vapor a los serpentines de calefaccion de carga?",opts:["0,5-1 bar","3-5 bar","7-8 bar","15-20 bar"],ans:2,expl:"El vapor de calefaccion de carga esta tipicamente a 7-8 bar (vapor de servicio de baja presion). Esta presion corresponde a una temperatura de saturacion de unos 170°C."},
      {q:"?Adonde van los condensados tras pasar por los serpentines de carga?",opts:["Vertidos al mar","Hot well y retorno caldera","Tanque de lastre","Tanque slop"],ans:1,expl:"Los condensados se recogen en el hot well (deposito de agua de alimentacion). Luego se bombean de vuelta a la caldera para su regeneracion como vapor. Este circuito cerrado ahorra agua y energia."},
      {q:"?Que relacion existe entre temperatura y viscosidad de un crudo pesado?",opts:["Temperatura sube => viscosidad sube","Temperatura sube => viscosidad baja","Relacion lineal directa","Sin relacion"],ans:1,expl:"La viscosidad de un crudo pesado sigue una ley exponencial decreciente con la temperatura (ley de Walther-ASTM). Cuando la temperatura se duplica, la viscosidad puede disminuir un factor 10-100."},
      {q:"?Que es la gravedad API y como influye en el calentamiento?",opts:["Medida de presion","Indice de densidad: API bajo = crudo pesado = calentamiento necesario","Medida de temperatura","Indice de toxicidad"],ans:1,expl:"La gravedad API es una escala de densidad. Crudo ligero = API > 31. Crudo pesado = API < 22. Cuanto menor es el API, mas viscoso es el crudo a temperatura ambiente y mas calentamiento intensivo se necesita."},
      {q:"?Cual es la consecuencia de una temperatura de carga demasiado alta (> 65°C)?",opts:["Viscosidad demasiado alta","Formacion de coque y depositos en el tanque","Explosion de los tanques","Corrosion de las bombas"],ans:1,expl:"Por encima de 65°C, los crudos pesados pueden formar depositos de coque en las paredes. Este coque reduce la eficiencia de la transferencia termica y puede danar las bombas."},
      {q:"El MT Prestige (2002) demostro que el fuel No.6 mal calentado:",opts:["Explota mas facilmente","Se solidifica en las costas y es imposible de limpiar","Se mezcla con el agua de mar","Provoca incendios"],ans:1,expl:"El fuel No.6 del Prestige, transportado a temperatura insuficiente, tenia una viscosidad > 6.000 cSt. Al llegar a las playas gallegas a temperatura ambiente, se solidifico en una pasta negra casi imposible de limpiar."},
      {q:"?Cual es la funcion del 'temperature log' en la calefaccion de carga?",opts:["Medir la temperatura de sala de maquinas","Registrar temperaturas por tanque para el Cargo Record Book","Controlar el vapor principal","Vigilar los condensados"],ans:1,expl:"El temperature log es un documento obligatorio que registra todas las temperaturas de los tanques de carga cada 4 horas. Verifica el cumplimiento de las instrucciones del cargador y forma parte del Cargo Record Book."},
      {q:"?Cual es el papel del 'heating rate' en las instrucciones de carga?",opts:["Velocidad de bombeo","Velocidad maxima de subida de temperatura por hora","Caudal de vapor por tanque","Presion nominal de los serpentines"],ans:1,expl:"El heating rate es la subida de temperatura maxima permitida, tipicamente 2-3°C/hora. Un calentamiento demasiado rapido causa dilatacion desigual de la carga y riesgos en los mamparos."},
      {q:"Para un 'waxy crude', ?que precaucion especifica es necesaria?",opts:["Enfriar antes del bombeo","Nunca superar 40°C","Calentar por encima del WAT (Wax Appearance Temperature)","Usar solventes quimicos"],ans:2,expl:"El WAT es la temperatura por debajo de la cual la parafina empieza a cristalizar. Para los waxy crudes, la temperatura debe mantenerse siempre por encima del WAT (frecuentemente 35-50°C)."},
      {q:"?Cual es el significado operativo del termino 'pour point'?",opts:["Temperatura maxima de bombeo","Temperatura a la que el crudo deja de fluir","Presion minima en los serpentines","Viscosidad minima aceptable"],ans:1,expl:"El pour point es la temperatura mas baja a la que un crudo permanece fluido. Por debajo del pour point, el crudo se gelifica. Los serpentines deben mantener la temperatura siempre bien por encima del pour point (generalmente +10°C minimo)."},
      {q:"?Cuantos serpentines por tanque en un VLCC tipico?",opts:["1 serpentin","2 serpentines independientes (proa + popa)","5 serpentines","10 serpentines"],ans:1,expl:"Un VLCC tipico esta equipado con 2 serpentines independientes por tanque (forward + aft coil), cada uno con su propia valvula de aislamiento. Esta redundancia permite continuar el calentamiento si un serpentin falla."},
      {q:"?Que indica una 'API gravity' de 12 sobre la bombeabilidad de un crudo?",opts:["Crudo ligero: sin calentamiento","Crudo extra-pesado: calentamiento intensivo obligatorio","Crudo medio: calentamiento moderado","Condensado de gas: sin calentamiento"],ans:1,expl:"API 12 indica un crudo extra-pesado (API < 10-15). Tiene una viscosidad extremadamente alta a temperatura ambiente. Calentamiento intensivo a 55-65°C es absolutamente obligatorio antes de cualquier operacion de bombeo."},
    ],
    pt:[
      {q:"Qual componente transfere o calor do vapor para o crude no tanque?",opts:["A bomba de carga","A serpentina (heating coil)","O scrubber","O soprador"],ans:1,expl:"A serpentina e uma rede de tubos instalados no fundo do tanque, alimentados com vapor a 7-8 bar. O calor transfere-se por conducao atraves das paredes do tubo para o crude circundante."},
      {q:"Qual e a gama de temperatura alvo para o aquecimento de crude pesado?",opts:["20-35°C","40-50°C","50-65°C","70-80°C"],ans:2,expl:"A temperatura alvo e 50-65°C para crudes pesados. A esta temperatura, a viscosidade desce abaixo de 600 cSt, limiar necessario para o correcto funcionamento das bombas de carga centrifugas."},
      {q:"Qual e a viscosidade maxima para uma bomba de carga centrifuga funcionar correctamente?",opts:["100 cSt","300 cSt","600 cSt","2000 cSt"],ans:2,expl:"600 cSt e o limiar critico para as bombas centrifugas. Acima deste valor, o crude e demasiado espesso: a bomba cavia, sobraquece e arrisca bloqueio. O aquecimento e condicao operacional indispensavel para crudes pesados (API < 20)."},
      {q:"A que pressao e fornecido o vapor de aquecimento as serpentinas de carga?",opts:["0,5-1 bar","3-5 bar","7-8 bar","15-20 bar"],ans:2,expl:"O vapor de aquecimento de carga esta tipicamente a 7-8 bar (vapor de servico de baixa pressao). Esta pressao corresponde a uma temperatura de saturacao de cerca de 170°C."},
      {q:"Para onde vao os condensados apos passar pelas serpentinas de carga?",opts:["Descarga no mar","Hot well e retorno a caldeira","Tanque de lastro","Tanque slop"],ans:1,expl:"Os condensados sao recolhidos no hot well (tanque de agua de alimentacao). Sao entao bombeados de volta a caldeira para regeneracao como vapor. Este circuito fechado poupa agua e energia."},
      {q:"Que relacao existe entre temperatura e viscosidade de um crude pesado?",opts:["Temperatura sobe => viscosidade sobe","Temperatura sobe => viscosidade desce","Relacao linear directa","Sem relacao"],ans:1,expl:"A viscosidade de um crude pesado segue uma lei exponencial decrescente com a temperatura (lei de Walther-ASTM). Quando a temperatura duplica, a viscosidade pode diminuir um factor 10-100."},
      {q:"O que e a API gravity e como influencia o aquecimento?",opts:["Medicao de pressao","Indice de densidade: API baixo = crude pesado = aquecimento necessario","Medicao de temperatura","Indice de toxicidade"],ans:1,expl:"A API gravity e uma escala de densidade. Crude ligeiro = API > 31. Crude pesado = API < 22. Quanto menor o API, mais viscoso e o crude a temperatura ambiente e mais aquecimento intensivo e necessario."},
      {q:"Qual e a consequencia de uma temperatura de carga demasiado alta (> 65°C)?",opts:["Viscosidade demasiado alta","Formacao de coque e depositos no tanque","Explosao dos tanques","Corrosao das bombas"],ans:1,expl:"Acima de 65°C, os crudes pesados podem formar depositos de coque nas paredes. Este coque reduz a eficiencia da transferencia termica e pode danificar as bombas."},
      {q:"O MT Prestige (2002) demonstrou que o fuel No.6 mal aquecido:",opts:["Explode mais facilmente","Solidifica nas costas e e impossivel de limpar","Mistura-se com a agua do mar","Provoca incendios"],ans:1,expl:"O fuel No.6 do Prestige, transportado a temperatura insuficiente, tinha uma viscosidade > 6.000 cSt. Ao atingir as praias galegas a temperatura ambiente, solidificou numa pasta negra quase impossivel de limpar."},
      {q:"Qual e a funcao do 'temperature log' no aquecimento de carga?",opts:["Medir a temperatura da casa das maquinas","Registar temperaturas por tanque para o Cargo Record Book","Controlar o vapor principal","Vigiar os condensados"],ans:1,expl:"O temperature log e um documento obrigatorio que regista todas as temperaturas dos tanques de carga de 4 em 4 horas. Verifica a conformidade com as instrucoes do carregador e faz parte do Cargo Record Book."},
      {q:"Qual e o papel do 'heating rate' nas instrucoes de carga?",opts:["Velocidade de bombagem","Subida maxima de temperatura permitida por hora","Caudal de vapor por tanque","Pressao nominal das serpentinas"],ans:1,expl:"O heating rate e a subida de temperatura maxima permitida, tipicamente 2-3°C/hora. Um aquecimento demasiado rapido causa dilatacao desigual da carga e riscos nas anteparas."},
      {q:"Para um 'waxy crude', que precaucao especifica e necessaria?",opts:["Arrefecer antes da bombagem","Nunca ultrapassar 40°C","Aquecer acima do WAT (Wax Appearance Temperature)","Usar solventes quimicos"],ans:2,expl:"O WAT e a temperatura abaixo da qual a parafina comeca a cristalizar. Para os waxy crudes, a temperatura deve ser mantida sempre acima do WAT (frequentemente 35-50°C)."},
      {q:"Qual e o significado operacional do termo 'pour point'?",opts:["Temperatura maxima de bombagem","Temperatura a que o crude deixa de fluir","Pressao minima nas serpentinas","Viscosidade minima aceitavel"],ans:1,expl:"O pour point e a temperatura mais baixa a que um crude permanece fluido. Abaixo do pour point, o crude gelifica. As serpentinas devem manter a temperatura sempre bem acima do pour point (geralmente +10°C minimo)."},
      {q:"Quantas serpentinas por tanque num VLCC tipico?",opts:["1 serpentina","2 serpentinas independentes (vante + re)","5 serpentinas","10 serpentinas"],ans:1,expl:"Um VLCC tipico e equipado com 2 serpentinas independentes por tanque (forward + aft coil), cada uma com a sua propria valvula de isolamento. Esta redundancia permite continuar o aquecimento se uma serpentina falhar."},
      {q:"O que indica uma 'API gravity' de 12 sobre a bombeabilidade de um crude?",opts:["Crude ligeiro: sem aquecimento","Crude extra-pesado: aquecimento intensivo obrigatorio","Crude medio: aquecimento moderado","Condensado de gas: sem aquecimento"],ans:1,expl:"API 12 indica um crude extra-pesado (API < 10-15). Tem uma viscosidade extremamente elevada a temperatura ambiente. Aquecimento intensivo a 55-65°C e absolutamente obrigatorio antes de qualquer operacao de bombagem."},
    ],
  };

  const list = qs[lang]||qs.fr;
  const [shuffled]=useState(()=>list.map(q=>shuffleQuestionOptions(q,"ans")));
  const total = list.length;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    if (i===shuffled[idx].ans) setScore(s=>s+1);
  };
  const handleNext = () => {
    if (idx === total-1) { setDone(true); if(onComplete)onComplete(); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };
  const handleRestart = () => {
    setIdx(0); setSel(null); setAnswered(false); setScore(0); setDone(false); setStarted(false);
  };

  if (!started) return (
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:36,marginBottom:10}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:C.white,marginBottom:6}}>
        {lbl("Banque de questions","Question Bank","Banco de preguntas","Banco de questoes")}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:16}}>
        15 {lbl("questions premium","premium questions","preguntas premium","questoes premium")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.hot},${C.orange})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
        {lbl("COMMENCER =>","START =>","EMPEZAR =>","COMECAR =>")}
      </button>
    </div>
  );

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
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.hot},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"12px",borderRadius:14,background:"rgba(229,57,53,0.15)",border:`1px solid ${C.hot}44`,color:C.hot,fontSize:13,fontWeight:700,cursor:"pointer"}}>
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
          <span style={{fontSize:10,color:C.hot,fontWeight:700}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold,fontWeight:700}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.hot},${C.orange})`,borderRadius:4,transition:"width 0.3s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(13,31,60,0.6)",border=C.border,col=C.white;
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
          style={{width:"100%",padding:"13px",borderRadius:14,background:`linear-gradient(135deg,${C.hot},${C.orange})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
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
const QUIZ = {
  fr:[
    {q:"Quelle est la temperature cible pour chauffer un brut lourd avant pompage ?",opts:["25-35°C","40-50°C","50-65°C","75-90°C"],ans:2,expl:"50-65°C est la plage cible pour les bruts lourds. Elle permet d'atteindre une viscosite < 600 cSt, seuil de fonctionnement des pompes cargo centrifuges, tout en restant sous la limite de cokefaction (65°C)."},
    {q:"Quelle est la viscosite maximale pour qu'une pompe centrifuge cargo fonctionne ?",opts:["100 cSt","600 cSt","2000 cSt","5000 cSt"],ans:1,expl:"600 cSt est le seuil critique. Au-dela, la pompe centrifuge cavite et risque de se bloquer. Le chauffage est donc la condition prealable indispensable pour tout brut lourd (API < 20-22)."},
    {q:"Le circuit vapeur-condensats sur un petrolier fonctionne comme suit :",opts:["Vapeur => serpentins => mer","Vapeur => serpentins => hot well => chaudiere","Vapeur => pompes => citernes => mer","Vapeur => scrubber => serpentins"],ans:1,expl:"Le circuit est ferme : la vapeur (7-8 bar) chauffe le cargo via les serpentins, se condense, et les condensats sont recuperes dans le hot well puis pompes vers la chaudiere pour regeneration. Economie d'eau et d'energie."},
    {q:"Le MT Prestige (2002) a illustre le danger du fioul No.6 non chauffe car il :",opts:["A explose en mer","S'est solidifie sur les plages de Galice","A pollue les eaux souterraines","A produit des gaz toxiques"],ans:1,expl:"Le fuel No.6 du Prestige (viscosite > 6000 cSt a temperature ambiante) s'est solidifie en atteignant les plages galiciennes. Ce 'mazout concret' etait quasi-impossible a nettoyer. Cet accident a renforce les exigences MARPOL sur les temperatures minimales de transport."},
    {q:"Quelle propriete du brut determine sa fluidite a temperature ambiante ?",opts:["La temperature flash","L'API gravity (densite)","La pression de vapeur","Le nombre d'octane"],ans:1,expl:"L'API gravity est l'indicateur cle. Brut leger (API > 31) = fluide a temperature ambiante. Brut lourd (API < 22) = visqueux et difficile a pomper sans chauffage. Brut extra-lourd (API < 10) = solide ou semi-solide a temperature ambiante."},
  ],
  en:[
    {q:"What is the target temperature for heating heavy crude before pumping?",opts:["25-35°C","40-50°C","50-65°C","75-90°C"],ans:2,expl:"50-65°C is the target range for heavy crudes. This achieves viscosity < 600 cSt, the operating threshold for centrifugal cargo pumps, while staying below the coking limit (65°C)."},
    {q:"What is the maximum viscosity for a centrifugal cargo pump to work?",opts:["100 cSt","600 cSt","2000 cSt","5000 cSt"],ans:1,expl:"600 cSt is the critical threshold. Beyond this, the centrifugal pump cavitates and risks seizure. Heating is therefore the indispensable prerequisite for any heavy crude (API < 20-22)."},
    {q:"The steam-condensate circuit on a tanker works as follows:",opts:["Steam => coils => sea","Steam => coils => hot well => boiler","Steam => pumps => tanks => sea","Steam => scrubber => coils"],ans:1,expl:"The circuit is closed: steam (7-8 bar) heats cargo via coils, condenses, and condensates are recovered in the hot well then pumped to the boiler for regeneration. Water and energy savings."},
    {q:"The MT Prestige (2002) illustrated the danger of unheated No.6 fuel oil because it:",opts:["Exploded at sea","Solidified on Galician beaches","Polluted groundwater","Produced toxic gases"],ans:1,expl:"The Prestige's No.6 fuel oil (viscosity > 6,000 cSt at ambient temperature) solidified on reaching the Galician beaches. This 'concrete tar' was near-impossible to clean up. This accident strengthened MARPOL requirements on minimum transport temperatures."},
    {q:"Which crude property determines its fluidity at ambient temperature?",opts:["Flash temperature","API gravity (density)","Vapor pressure","Octane number"],ans:1,expl:"API gravity is the key indicator. Light crude (API > 31) = fluid at ambient temperature. Heavy crude (API < 22) = viscous and hard to pump without heating. Extra-heavy (API < 10) = solid or semi-solid at ambient temperature."},
  ],
  es:[
    {q:"?Cual es la temperatura objetivo para calentar un crudo pesado antes del bombeo?",opts:["25-35°C","40-50°C","50-65°C","75-90°C"],ans:2,expl:"50-65°C es el rango objetivo para crudos pesados. Permite alcanzar una viscosidad < 600 cSt, umbral de funcionamiento de las bombas centrifugas, sin superar el limite de coquizacion (65°C)."},
    {q:"?Cual es la viscosidad maxima para que una bomba centrifuga de carga funcione?",opts:["100 cSt","600 cSt","2000 cSt","5000 cSt"],ans:1,expl:"600 cSt es el umbral critico. Por encima, la bomba centrifuga cavita y puede bloquearse. El calentamiento es la condicion previa indispensable para cualquier crudo pesado (API < 20-22)."},
    {q:"El circuito vapor-condensados en un petrolero funciona asi:",opts:["Vapor => serpentines => mar","Vapor => serpentines => hot well => caldera","Vapor => bombas => tanques => mar","Vapor => depurador => serpentines"],ans:1,expl:"El circuito es cerrado: el vapor (7-8 bar) calienta la carga via los serpentines, se condensa, y los condensados se recuperan en el hot well y se bombean de vuelta a la caldera. Ahorro de agua y energia."},
    {q:"El MT Prestige (2002) ilustro el peligro del fuel No.6 sin calentar porque:",opts:["Exploto en el mar","Se solidifico en las playas de Galicia","Contamino las aguas subterraneas","Produjo gases toxicos"],ans:1,expl:"El fuel No.6 del Prestige (viscosidad > 6.000 cSt a temperatura ambiente) se solidifico al llegar a las playas gallegas. Este 'chapapote' era casi imposible de limpiar. Este accidente reforzo las exigencias MARPOL sobre temperaturas minimas de transporte."},
    {q:"?Que propiedad del crudo determina su fluidez a temperatura ambiente?",opts:["Temperatura flash","Gravedad API (densidad)","Presion de vapor","Numero de octano"],ans:1,expl:"La gravedad API es el indicador clave. Crudo ligero (API > 31) = fluido a temperatura ambiente. Crudo pesado (API < 22) = viscoso sin calentamiento. Crudo extra-pesado (API < 10) = solido o semis-solido a temperatura ambiente."},
  ],
  pt:[
    {q:"Qual e a temperatura alvo para aquecer um crude pesado antes da bombagem?",opts:["25-35°C","40-50°C","50-65°C","75-90°C"],ans:2,expl:"50-65°C e a gama alvo para crudes pesados. Permite atingir uma viscosidade < 600 cSt, limiar de funcionamento das bombas centrifugas, sem ultrapassar o limite de coquificacao (65°C)."},
    {q:"Qual e a viscosidade maxima para uma bomba centrifuga de carga funcionar?",opts:["100 cSt","600 cSt","2000 cSt","5000 cSt"],ans:1,expl:"600 cSt e o limiar critico. Acima deste valor, a bomba centrifuga cavia e pode bloquear. O aquecimento e a condicao previa indispensavel para qualquer crude pesado (API < 20-22)."},
    {q:"O circuito vapor-condensados num petroleiro funciona assim:",opts:["Vapor => serpentinas => mar","Vapor => serpentinas => hot well => caldeira","Vapor => bombas => tanques => mar","Vapor => scrubber => serpentinas"],ans:1,expl:"O circuito e fechado: o vapor (7-8 bar) aquece a carga via as serpentinas, condensa-se, e os condensados sao recuperados no hot well e bombeados de volta a caldeira. Poupanca de agua e energia."},
    {q:"O MT Prestige (2002) ilustrou o perigo do fuel No.6 nao aquecido porque:",opts:["Explodiu no mar","Solidificou nas praias da Galiza","Contaminou as aguas subterraneas","Produziu gases toxicos"],ans:1,expl:"O fuel No.6 do Prestige (viscosidade > 6.000 cSt a temperatura ambiente) solidificou ao atingir as praias galegas. Este 'alcatrao concreto' era quase impossivel de limpar. Este acidente reforcou as exigencias MARPOL sobre temperaturas minimas de transporte."},
    {q:"Que propriedade do crude determina a sua fluidez a temperatura ambiente?",opts:["Temperatura flash","API gravity (densidade)","Pressao de vapor","Numero de octano"],ans:1,expl:"A API gravity e o indicador chave. Crude ligeiro (API > 31) = fluido a temperatura ambiente. Crude pesado (API < 22) = viscoso sem aquecimento. Crude extra-pesado (API < 10) = solido ou semi-solido a temperatura ambiente."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const total = questions.length;
  const isLast = idx===total-1;
  const q = shuffled[idx];

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i); setAnswered(true);
    if (i===q.ans) setScore(s=>s+1);
  };
  const handleNext = () => {
    const fs = score+(sel===q.ans?1:0);
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
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.hot},${C.gold})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:14,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(13,31,60,0.6)",border=C.border,col=C.white;
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
          style={{width:"100%",padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C.hot},${C.gold})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {isLast?t.finish:t.next}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT
// ══════════════════════════════════════
const getContent = (lang) => {
  const d = {
    fr:{
      badge:"Module e6 - Cargaison & Petrole - Lecon 5/6 - Premium - 200 XP",
      title:"Chauffage Cargaison - Serpentins Vapeur & Viscosite",
      intro:"Un brut lourd a 20°C peut avoir une viscosite de 50 000 cSt - l'epaisseur du beurre. Impossible a pomper, impossible a decharger. Le systeme de chauffage cargo est la cle qui transforme ce solide visqueux en liquide pompable.\n\nCette lecon couvre les serpentins de chauffage, la relation viscosite-temperature, le circuit vapeur-condensats et les procedures de monitoring.",
      p1:"PARTIE 1 - SERPENTINS ET PRINCIPE THERMIQUE",s1t:"Heating coils - Transfert vapeur vers cargo",
      s1:"PRINCIPE THERMIQUE:\nLa vapeur (7-8 bar, ~170°C) circule dans des tubes en acier inox installes au fond de la citerne. La chaleur se transfere par conduction a travers les parois du tube vers le brut.\n\nARCHITECTURE DES SERPENTINS:\nTubes en acier inox 316L (resistance corrosion)\nDiametre: 50-100 mm\nEpaisseur paroi: 3-5 mm\n2 serpentins independants par citerne (avant + arriere)\nVannes d'isolation individuelles\nSurface de chauffe: 15-40 m2 par citerne selon VLCC\n\nPARAMETRES VAPEUR:\nPression: 7-8 bar (vapeur de service)\nTemperature de saturation: ~170°C\nDebit nominal: 1-3 t/h de vapeur par citerne\nTemperature condensats sortie: 80-90°C\n\nRATE DE CHAUFFAGE:\n2-3°C/heure maximum\nChauffage trop rapide => contraintes thermiques\nPour waxy crudes: ne jamais descendre sous le WAT",
      p2:"PARTIE 2 - VISCOSITE ET TYPES DE BRUTS",s2t:"Courbe viscosite-temperature - Bruts lourds, moyens, legers",
      s2:"VISCOSITE: DEFINITION\nResistance d'un fluide a l'ecoulement\nUnite: cSt (centistokes)\nSeuil pompabilite: < 600 cSt\n\nCLASSIFICATION API:\nBrut leger: API > 31 (> 870 kg/m3) - peu ou pas de chauffage\nBrut moyen: API 22-31 - chauffage modere (40-50°C)\nBrut lourd: API < 22 - chauffage intensif (50-65°C)\nBrut extra-lourd: API < 10 - chauffage max (60-65°C)\n\nPOUR POINT ET WAT:\nPour point: temperature a laquelle le brut gelifie\nWAT (Wax Appearance Temperature): temperature de cristallisation des paraffines\nObjectif: maintenir T > WAT + 10°C en permanence\n\nEXEMPLES TYPIQUES:\nBrent (mer du Nord): API 38 - viscosite 5 cSt a 20°C\nArabian Heavy: API 27 - viscosite 150 cSt a 20°C\nMaya (Mexique): API 22 - viscosite 800 cSt a 20°C\nAthabasca (Canada): API 8 - viscosite > 100 000 cSt",
      p3:"PARTIE 3 - CIRCUIT VAPEUR ET CONDENSATS",s3t:"Chaudiere => serpentins => hot well => retour",
      s3:"CIRCUIT VAPEUR-CONDENSATS:\n\n1. CHAUDIERE:\nProduction vapeur 7-8 bar\nAlimentee en eau depuis hot well\n\n2. VANNE VAPEUR CARGO:\nManoeuvree depuis la salle de controle\nOuverte progressivement\n\n3. SERPENTINS (HEATING COILS):\nTransfert thermique vapeur => cargo\nVapeur se condense dans les tubes\n\n4. HOT WELL (BACHE ALIMENTAIRE):\nRecupere les condensats (80-90°C)\nDecante l'huile eventuelle\nSource d'eau pour la chaudiere\n\n5. POMPE ALIMENTAIRE:\nRefoule les condensats vers la chaudiere\nCircuit ferme = economie eau + energie\n\nSURVEILLANCE:\nTemperature cargo: toutes les 4 heures\nTemperature condensats: verification fuites huile\nPression vapeur: constante 7-8 bar",
      p4:"PARTIE 4 - PROCEDURES ET DOCUMENTATION",s4t:"Temperature log - Cargo Record Book - Alertes",
      s4:"TEMPERATURE LOG:\nEnregistrement toutes les 4 heures par citerne\nComparaison avec temperature cible charger\nSignature Chief Officer + Master\nPartie obligatoire du Cargo Record Book\n\nPROCEDURE DE CHAUFFAGE:\n1. Recevoir instructions temperature du charger\n2. Ouvrir vannes vapeur progressivement\n3. Respecter heating rate (2-3°C/heure max)\n4. Enregistrer toutes les 4h dans temperature log\n5. Alerter si deviation > 3°C de la cible\n6. Fermer vapeur 2h avant dechargement\n\nALARMES ET ALERTES:\nTemperature basse (< 45°C): risque pompage\nTemperature haute (> 65°C): risque cokefaction\nFuite condensats: presence huile dans hot well\nDefaut serpentin: temperature citerne inegale\n\nDOCUMENTATION MARPOL:\nCargo Record Book: temperatures transport\nBill of Lading: temperature acceptation cargo\nLetter of Protest si temperature hors spec",
      p5:"EXERCICES PRATIQUES PREMIUM",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE - 15 QUESTIONS PREMIUM",
      sumT:"RESUME - LECON E6 L5",
      sumP:["Serpentin: tube inox alimente vapeur 7-8 bar dans la citerne","Temperature cible brut lourd: 50-65°C","Viscosite seuil pompage: 600 cSt","Relation T-viscosite: exponentielle (loi de Walther)","API gravity: bas API = brut lourd = chauffage intensif","Pour point et WAT: maintenir T > WAT + 10°C","Circuit ferme: vapeur => serpentins => hot well => chaudiere","Heating rate: 2-3°C/h maximum (evite contraintes)","MT Prestige 2002: fuel No.6 non chauffe solidifie sur plages","Temperature log: toutes 4h - Cargo Record Book obligatoire"],
      learnedP:["Serpentin de chauffage: principe et architecture","Viscosite-temperature: relation et seuil 600 cSt","API gravity et types de bruts","Circuit vapeur-condensats-hot well","MT Prestige 2002 => importance chauffage cargo"],
    },
    en:{
      badge:"Module e6 - Cargo & Oil - Lesson 5/6 - Premium - 200 XP",
      title:"Cargo Heating - Steam Coils & Viscosity",
      intro:"Heavy crude at 20°C can have a viscosity of 50,000 cSt - the thickness of butter. Impossible to pump, impossible to discharge. The cargo heating system is the key that transforms this viscous solid into a pumpable liquid.\n\nThis lesson covers heating coils, the viscosity-temperature relationship, the steam-condensate circuit and monitoring procedures.",
      p1:"PART 1 - COILS AND THERMAL PRINCIPLE",s1t:"Heating coils - Steam to cargo transfer",
      s1:"THERMAL PRINCIPLE:\nSteam (7-8 bar, ~170°C) circulates in stainless steel tubes installed at the bottom of the tank. Heat transfers by conduction through tube walls to the crude.\n\nCOIL ARCHITECTURE:\n316L stainless steel tubes (corrosion resistance)\nDiameter: 50-100 mm - Wall thickness: 3-5 mm\n2 independent coils per tank (fore + aft)\nIndividual isolation valves\nHeating surface: 15-40 m2 per tank on VLCC\n\nSTEAM PARAMETERS:\nPressure: 7-8 bar (service steam)\nSaturation temperature: ~170°C\nNominal flow: 1-3 t/h steam per tank\nCondensate outlet temperature: 80-90°C\n\nHEATING RATE:\nMax 2-3°C/hour\nToo rapid heating => thermal stresses\nWaxy crudes: never drop below WAT",
      p2:"PART 2 - VISCOSITY AND CRUDE TYPES",s2t:"Viscosity-temperature curve - Heavy, medium, light crudes",
      s2:"VISCOSITY: DEFINITION\nResistance of a fluid to flow\nUnit: cSt (centistokes)\nPumpability threshold: < 600 cSt\n\nAPI CLASSIFICATION:\nLight crude: API > 31 - little or no heating\nMedium crude: API 22-31 - moderate heating (40-50°C)\nHeavy crude: API < 22 - intensive heating (50-65°C)\nExtra-heavy: API < 10 - maximum heating (60-65°C)\n\nPOUR POINT AND WAT:\nPour point: temperature at which crude gels\nWAT (Wax Appearance Temperature): paraffin crystallization temperature\nObjective: maintain T > WAT + 10°C at all times\n\nTYPICAL EXAMPLES:\nBrent (North Sea): API 38 - 5 cSt at 20°C\nArabian Heavy: API 27 - 150 cSt at 20°C\nMaya (Mexico): API 22 - 800 cSt at 20°C\nAthabasca (Canada): API 8 - > 100,000 cSt",
      p3:"PART 3 - STEAM AND CONDENSATE CIRCUIT",s3t:"Boiler => coils => hot well => return",
      s3:"STEAM-CONDENSATE CIRCUIT:\n\n1. BOILER:\nSteam production 7-8 bar\nFed from hot well\n\n2. CARGO STEAM VALVE:\nOperated from control room\nOpened progressively\n\n3. HEATING COILS:\nSteam => cargo heat transfer\nSteam condenses in tubes\n\n4. HOT WELL (FEED WATER TANK):\nCollects condensates (80-90°C)\nDecants any oil contamination\nBoiler water source\n\n5. FEED PUMP:\nReturns condensate to boiler\nClosed circuit = water + energy savings\n\nMONITORING:\nCargo temperature: every 4 hours\nCondensate temperature: oil leak check\nSteam pressure: constant 7-8 bar",
      p4:"PART 4 - PROCEDURES AND DOCUMENTATION",s4t:"Temperature log - Cargo Record Book - Alerts",
      s4:"TEMPERATURE LOG:\nRecording every 4 hours per tank\nComparison with shipper target temperature\nChief Officer + Master signature\nMandatory part of Cargo Record Book\n\nHEATING PROCEDURE:\n1. Receive temperature instructions from shipper\n2. Open steam valves progressively\n3. Respect heating rate (max 2-3°C/hour)\n4. Record every 4h in temperature log\n5. Alert if deviation > 3°C from target\n6. Close steam 2h before discharge\n\nALARMS AND ALERTS:\nLow temperature (< 45°C): pumping risk\nHigh temperature (> 65°C): coking risk\nCondensate leak: oil in hot well\nCoil failure: uneven tank temperature\n\nMARPOL DOCUMENTATION:\nCargo Record Book: transport temperatures\nBill of Lading: cargo acceptance temperature\nLetter of Protest if temperature out of spec",
      p5:"ADVANCED PREMIUM EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK - 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY - LESSON E6 L5",
      sumP:["Coil: stainless tube fed by 7-8 bar steam in tank","Heavy crude target temperature: 50-65°C","Pumping viscosity threshold: 600 cSt","T-viscosity relationship: exponential (Walther law)","API gravity: low API = heavy crude = intensive heating","Pour point and WAT: maintain T > WAT + 10°C","Closed circuit: steam => coils => hot well => boiler","Heating rate: max 2-3°C/h (avoids thermal stresses)","MT Prestige 2002: unheated No.6 fuel solidified on beaches","Temperature log: every 4h - mandatory Cargo Record Book"],
      learnedP:["Heating coil: principle and architecture","Viscosity-temperature: relationship and 600 cSt threshold","API gravity and crude types","Steam-condensate-hot well circuit","MT Prestige 2002 => importance of cargo heating"],
    },
    es:{
      badge:"Modulo e6 - Carga & Petroleo - Leccion 5/6 - Premium - 200 XP",
      title:"Calefaccion de Carga - Serpentines de Vapor & Viscosidad",
      intro:"Un crudo pesado a 20°C puede tener una viscosidad de 50.000 cSt. Imposible de bombear, imposible de descargar. El sistema de calefaccion de carga es la clave que transforma este solido viscoso en un liquido bombeable.\n\nEsta leccion cubre los serpentines de calefaccion, la relacion viscosidad-temperatura, el circuito vapor-condensados y los procedimientos de monitorizacion.",
      p1:"PARTE 1 - SERPENTINES Y PRINCIPIO TERMICO",s1t:"Heating coils - Transferencia vapor a carga",
      s1:"PRINCIPIO TERMICO:\nEl vapor (7-8 bar, ~170°C) circula en tubos de acero inoxidable instalados en el fondo del tanque. El calor se transfiere por conduccion a traves de las paredes del tubo hacia el crudo.\n\nARQUITECTURA SERPENTINES:\nTubos de acero inox 316L\nDiametro: 50-100 mm - Espesor: 3-5 mm\n2 serpentines independientes por tanque (proa + popa)\nValvulas de aislamiento individuales\nSuperficie de calentamiento: 15-40 m2 por tanque\n\nPARAMETROS VAPOR:\nPresion: 7-8 bar - T saturacion: ~170°C\nCaudal: 1-3 t/h de vapor por tanque\nT condensados salida: 80-90°C\n\nTASA DE CALENTAMIENTO:\nMax 2-3°C/hora - calentamiento rapido => esfuerzos termicos",
      p2:"PARTE 2 - VISCOSIDAD Y TIPOS DE CRUDO",s2t:"Curva viscosidad-temperatura - Crudos pesados, medios, ligeros",
      s2:"VISCOSIDAD:\nResistencia de un fluido al flujo - Unidad: cSt\nUmbral bombeabilidad: < 600 cSt\n\nCLASIFICACION API:\nLigero: API > 31 - poco o nada de calefaccion\nMedio: API 22-31 - calefaccion moderada (40-50°C)\nPesado: API < 22 - calefaccion intensiva (50-65°C)\nExtra-pesado: API < 10 - calefaccion maxima (60-65°C)\n\nPOUR POINT Y WAT:\nPour point: temperatura a la que el crudo se gelifica\nWAT: temperatura de cristalizacion de las parafinas\nObjetivo: mantener T > WAT + 10°C permanentemente",
      p3:"PARTE 3 - CIRCUITO VAPOR-CONDENSADOS",s3t:"Caldera => serpentines => hot well => retorno",
      s3:"CIRCUITO CERRADO:\n1. Caldera: produccion vapor 7-8 bar\n2. Valvula vapor: apertura progresiva\n3. Serpentines: transferencia termica al crudo\n4. Hot well: recogida condensados (80-90°C)\n5. Bomba alimentacion: retorno a caldera\n\nMONITORIZACION:\nTemperatura carga: cada 4 horas\nTemperatura condensados: control fugas\nPresion vapor: constante 7-8 bar",
      p4:"PARTE 4 - PROCEDIMIENTOS Y DOCUMENTACION",s4t:"Temperature log - Cargo Record Book - Alertas",
      s4:"TEMPERATURE LOG: cada 4h por tanque - firma Primer Oficial y Capitan\n\nPROCEDIMIENTO:\n1. Instrucciones temperatura del cargador\n2. Abrir valvulas progresivamente\n3. Respetar tasa 2-3°C/h\n4. Registrar cada 4h\n5. Alertar si desviacion > 3°C\n\nALARMAS:\nBaja T (< 45°C): riesgo bombeo\nAlta T (> 65°C): riesgo coquizacion\nFuga condensados: aceite en hot well",
      p5:"EJERCICIOS AVANZADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN - LECCION E6 L5",
      sumP:["Serpentin: tubo inox alimentado vapor 7-8 bar en tanque","T objetivo crudo pesado: 50-65°C","Umbral bombeo viscosidad: 600 cSt","Relacion T-viscosidad: exponencial (ley de Walther)","API gravity: API bajo = crudo pesado = calefaccion intensa","Pour point y WAT: mantener T > WAT + 10°C","Circuito cerrado: vapor => serpentines => hot well => caldera","Tasa calentamiento: max 2-3°C/h","MT Prestige 2002: fuel No.6 sin calentar solidificado","Temperature log: cada 4h - Cargo Record Book obligatorio"],
      learnedP:["Serpentin de calefaccion: principio y arquitectura","Viscosidad-temperatura: relacion y umbral 600 cSt","API gravity y tipos de crudo","Circuito vapor-condensados-hot well","MT Prestige 2002 => importancia calefaccion carga"],
    },
    pt:{
      badge:"Modulo e6 - Carga & Petroleo - Licao 5/6 - Premium - 200 XP",
      title:"Aquecimento de Carga - Serpentinas de Vapor & Viscosidade",
      intro:"Um crude pesado a 20°C pode ter uma viscosidade de 50.000 cSt. Impossivel de bombear, impossivel de descarregar. O sistema de aquecimento de carga e a chave que transforma este solido viscoso num liquido bombeavel.\n\nEsta licao cobre as serpentinas de aquecimento, a relacao viscosidade-temperatura, o circuito vapor-condensados e os procedimentos de monitorizacao.",
      p1:"PARTE 1 - SERPENTINAS E PRINCIPIO TERMICO",s1t:"Heating coils - Transferencia vapor para carga",
      s1:"PRINCIPIO TERMICO:\nO vapor (7-8 bar, ~170°C) circula em tubos de aco inoxidavel instalados no fundo do tanque. O calor transfere-se por conducao atraves das paredes do tubo para o crude.\n\nARQUITECTURA SERPENTINAS:\nTubos de aco inox 316L\nDiametro: 50-100 mm - Espessura: 3-5 mm\n2 serpentinas independentes por tanque (vante + re)\nValvulas de isolamento individuais\nSuperficie de aquecimento: 15-40 m2 por tanque\n\nPARAMETROS VAPOR:\nPressao: 7-8 bar - T saturacao: ~170°C\nCaudal: 1-3 t/h de vapor por tanque\nT condensados saida: 80-90°C\n\nTAXA DE AQUECIMENTO:\nMax 2-3°C/hora - aquecimento rapido => tensoes termicas",
      p2:"PARTE 2 - VISCOSIDADE E TIPOS DE CRUDE",s2t:"Curva viscosidade-temperatura - Crudes pesados, medios, ligeiros",
      s2:"VISCOSIDADE:\nResistencia de um fluido ao escoamento - Unidade: cSt\nLimiar bombeabilidade: < 600 cSt\n\nCLASSIFICACAO API:\nLigeiro: API > 31 - pouco ou nenhum aquecimento\nMedio: API 22-31 - aquecimento moderado (40-50°C)\nPesado: API < 22 - aquecimento intensivo (50-65°C)\nExtra-pesado: API < 10 - aquecimento maximo (60-65°C)\n\nPOUR POINT E WAT:\nPour point: temperatura a que o crude gelifica\nWAT: temperatura de cristalizacao das parafinas\nObjectivo: manter T > WAT + 10°C permanentemente",
      p3:"PARTE 3 - CIRCUITO VAPOR-CONDENSADOS",s3t:"Caldeira => serpentinas => hot well => retorno",
      s3:"CIRCUITO FECHADO:\n1. Caldeira: producao vapor 7-8 bar\n2. Valvula vapor: abertura progressiva\n3. Serpentinas: transferencia termica para o crude\n4. Hot well: recolha condensados (80-90°C)\n5. Bomba de alimentacao: retorno a caldeira\n\nMONITORIZACAO:\nTemperatura carga: de 4 em 4 horas\nTemperatura condensados: controlo fugas\nPressao vapor: constante 7-8 bar",
      p4:"PARTE 4 - PROCEDIMENTOS E DOCUMENTACAO",s4t:"Temperature log - Cargo Record Book - Alertas",
      s4:"TEMPERATURE LOG: de 4 em 4h por tanque - assinatura Primeiro Oficial e Capitao\n\nPROCEDIMENTO:\n1. Instrucoes temperatura do carregador\n2. Abrir valvulas progressivamente\n3. Respeitar taxa 2-3°C/h\n4. Registar de 4 em 4h\n5. Alertar se desvio > 3°C\n\nALARMES:\nT baixa (< 45°C): risco bombagem\nT alta (> 65°C): risco coquificacao\nFuga condensados: oleo no hot well",
      p5:"EXERCICIOS AVANCADOS PREMIUM",p6:"CASO REAL",p7:"BANCO - 15 QUESTOES PREMIUM",
      sumT:"RESUMO - LICAO E6 L5",
      sumP:["Serpentina: tubo inox alimentado vapor 7-8 bar no tanque","T alvo crude pesado: 50-65°C","Limiar bombagem viscosidade: 600 cSt","Relacao T-viscosidade: exponencial (lei de Walther)","API gravity: API baixo = crude pesado = aquecimento intenso","Pour point e WAT: manter T > WAT + 10°C","Circuito fechado: vapor => serpentinas => hot well => caldeira","Taxa aquecimento: max 2-3°C/h","MT Prestige 2002: fuel No.6 nao aquecido solidificado","Temperature log: de 4 em 4h - Cargo Record Book obrigatorio"],
      learnedP:["Serpentina de aquecimento: principio e arquitectura","Viscosidade-temperatura: relacao e limiar 600 cSt","API gravity e tipos de crude","Circuito vapor-condensados-hot well","MT Prestige 2002 => importancia aquecimento carga"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;
  const trophy = getTrophy(quizScore, 5);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.hot}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.hot,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Lecon 5/6":lang==="en"?"Lesson 5/6":lang==="es"?"Leccion 5/6":"Licao 5/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>PREMIUM</div>
            <div style={{fontSize:11,color:C.hot,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.hot},${C.gold})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(229,57,53,0.15)",border:`1px solid ${C.hot}44`,fontSize:11,color:C.hot,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.hot}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🌡️" text={lc.p1} color={C.hot}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.hot}33`}}>
              <div style={{fontSize:11,color:C.hot,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🌡️ {lang==="fr"?"SERPENTIN COW - INTERACTIF":lang==="en"?"HEATING COIL - INTERACTIVE":lang==="es"?"SERPENTIN - INTERACTIVO":"SERPENTINA - INTERATIVO"}
              </div>
              <HeatingCoilSVG lang={lang}/>
            </Card>

            <SL icon="📊" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📊</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                📊 {lang==="fr"?"COURBE VISCOSITE-TEMPERATURE":lang==="en"?"VISCOSITY-TEMPERATURE CURVE":lang==="es"?"CURVA VISCOSIDAD-TEMPERATURA":"CURVA VISCOSIDADE-TEMPERATURA"}
              </div>
              <ViscCurveSVG lang={lang}/>
            </Card>

            <SL icon="♨️" text={lc.p3} color={C.steam}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>♨️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.steam}33`}}>
              <div style={{fontSize:11,color:C.steam,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                ♨️ {lang==="fr"?"CIRCUIT VAPEUR - INTERACTIF":lang==="en"?"STEAM CIRCUIT - INTERACTIVE":lang==="es"?"CIRCUITO VAPOR - INTERACTIVO":"CIRCUITO VAPOR - INTERATIVO"}
              </div>
              <SteamSystemSVG lang={lang}/>
            </Card>

            <SL icon="🖥️" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🖥️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🖥️ {lang==="fr"?"MONITORING TEMPERATURES - INTERACTIF":lang==="en"?"TEMPERATURE MONITORING - INTERACTIVE":lang==="es"?"MONITOREO TEMPERATURAS - INTERACTIVO":"MONITORAMENTO TEMPERATURAS - INTERATIVO"}
              </div>
              <TempMonitorSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <Exercise1 lang={lang} t={t}/>
            </Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}>
              <QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/>
            </Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(229,57,53,0.06),rgba(13,31,60,0.9))",border:`1px solid ${C.hot}22`}}>
              <div style={{fontSize:11,color:C.hot,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.hot,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}}
              style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.hot},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(229,57,53,0.35)",marginTop:8}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz - Chauffage Cargaison":lang==="en"?"Quiz - Cargo Heating":lang==="es"?"Quiz - Calefaccion Carga":"Quiz - Aquecimento Carga"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"questoes"}</div>
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
                <div style={{height:"100%",width:`${quizScore/5*100}%`,background:`linear-gradient(90deg,${C.hot},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(229,57,53,0.12)",border:`1px solid ${C.hot}44`,fontSize:14,color:C.hot,fontWeight:700}}>
                +{quizScore>=4?200:quizScore===3?120:60} {t.xp}
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.hot,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={onNext}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.hot},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(229,57,53,0.35)",marginBottom:10}}>
              {lang==="fr"?"LECON 6 - JAUGEAGE =>":lang==="en"?"LESSON 6 - GAUGING =>":lang==="es"?"LECCION 6 - AFORO =>":"LICAO 6 - SONDAGEM =>"}
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
