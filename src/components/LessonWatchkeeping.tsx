// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — ENGINE ROOM DASHBOARD
// ══════════════════════════════════════
function DashboardSVG({ lang }) {
  const [time, setTime] = useState(0);
  const [alarms, setAlarms] = useState([]);
  const [params, setParams] = useState({
    rpm:90, temp:82, oil:4.2, fuel:85, cooling:78, exhaust:320
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
      // Random small fluctuations
      setParams(p => ({
        rpm: Math.max(80, Math.min(105, p.rpm + (Math.random()-0.5)*2)),
        temp: Math.max(70, Math.min(95, p.temp + (Math.random()-0.5)*0.5)),
        oil: Math.max(2, Math.min(6, p.oil + (Math.random()-0.5)*0.1)),
        fuel: Math.max(0, p.fuel - 0.05),
        cooling: Math.max(65, Math.min(90, p.cooling + (Math.random()-0.5)*0.3)),
        exhaust: Math.max(280, Math.min(400, p.exhaust + (Math.random()-0.5)*5)),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for alarms
  useEffect(() => {
    const newAlarms = [];
    if (params.rpm > 100) newAlarms.push({type:"warn", msg:{fr:"⚡ RPM élevé",en:"⚡ High RPM",es:"⚡ RPM alto",pt:"⚡ RPM alto"}});
    if (params.temp > 88) newAlarms.push({type:"danger", msg:{fr:"🔴 TEMP EAU HAUTE",en:"🔴 HIGH WATER TEMP",es:"🔴 TEMP AGUA ALTA",pt:"🔴 TEMP ÁGUA ALTA"}});
    if (params.oil < 3) newAlarms.push({type:"danger", msg:{fr:"🔴 PRESSION HUILE BASSE",en:"🔴 LOW OIL PRESSURE",es:"🔴 PRESIÓN ACEITE BAJA",pt:"🔴 PRESSÃO ÓLEO BAIXA"}});
    if (params.fuel < 20) newAlarms.push({type:"warn", msg:{fr:"⚡ Carburant bas",en:"⚡ Low fuel",es:"⚡ Combustible bajo",pt:"⚡ Combustível baixo"}});
    setAlarms(newAlarms);
  }, [params]);

  const gaugeColor = (val, low, high) =>
    val > high ? C.red : val < low ? C.orange : C.green;

  const gauges = [
    { label:{fr:"RPM",en:"RPM",es:"RPM",pt:"RPM"}, val:params.rpm.toFixed(0), unit:"rpm", min:0, max:120, low:80, high:100, c:gaugeColor(params.rpm,80,100) },
    { label:{fr:"Temp. EAD",en:"FW Temp",es:"Temp. AD",pt:"Temp. AD"}, val:params.temp.toFixed(1), unit:"°C", min:50, max:100, low:70, high:88, c:gaugeColor(params.temp,70,88) },
    { label:{fr:"Pression huile",en:"Oil pressure",es:"Presión aceite",pt:"Pressão óleo"}, val:params.oil.toFixed(1), unit:"bar", min:0, max:7, low:3, high:5.5, c:gaugeColor(params.oil,3,5.5) },
    { label:{fr:"Carburant",en:"Fuel",es:"Combustible",pt:"Combustível"}, val:params.fuel.toFixed(0), unit:"%", min:0, max:100, low:20, high:95, c:gaugeColor(params.fuel,20,95) },
    { label:{fr:"Refroidissement",en:"Cooling",es:"Refrigeración",pt:"Arrefecimento"}, val:params.cooling.toFixed(1), unit:"°C", min:50, max:100, low:65, high:87, c:gaugeColor(params.cooling,65,87) },
    { label:{fr:"Gaz échap.",en:"Exhaust gas",es:"Gas escape",pt:"Gás escape"}, val:params.exhaust.toFixed(0), unit:"°C", min:200, max:500, low:280, high:380, c:gaugeColor(params.exhaust,280,380) },
  ];

  const hours = Math.floor(time/3600);
  const mins = Math.floor((time%3600)/60);
  const secs = time%60;

  return (
    <div>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,padding:"8px 12px",borderRadius:10,background:"rgba(0,0,0,0.5)",border:`1px solid ${C.steel}44`}}>
        <div style={{fontSize:10,color:C.gold2,fontFamily:"'Cinzel',serif",fontWeight:700}}>
          ⚙️ {lang==="fr"?"TABLEAU DE BORD MACHINE":lang==="en"?"ENGINE ROOM DASHBOARD":lang==="es"?"CUADRO DE MANDO MÁQUINAS":"PAINEL DE MÁQUINAS"}
        </div>
        <div style={{fontSize:10,color:C.green,fontFamily:"monospace"}}>
          {String(hours).padStart(2,"0")}:{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
        </div>
      </div>

      {/* Gauges grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {gauges.map((g,i) => (
          <div key={i} style={{padding:"8px 6px",borderRadius:10,background:`${g.c}12`,border:`1px solid ${g.c}44`,textAlign:"center"}}>
            <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{g.label[lang]||g.label.fr}</div>
            <div style={{fontSize:14,fontWeight:800,color:g.c,fontFamily:"monospace"}}>{g.val}</div>
            <div style={{fontSize:8,color:g.c,opacity:0.7}}>{g.unit}</div>
            {/* Mini bar */}
            <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginTop:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${((parseFloat(g.val)-g.min)/(g.max-g.min))*100}%`,background:g.c,transition:"width 0.5s"}}/>
            </div>
          </div>
        ))}
      </div>

      {/* Alarms panel */}
      <div style={{minHeight:60,padding:"8px 10px",borderRadius:10,background:"rgba(0,0,0,0.4)",border:`1px solid ${alarms.length>0?C.red:C.green}33`}}>
        <div style={{fontSize:9,color:C.muted,marginBottom:4,fontWeight:700,letterSpacing:1}}>
          {lang==="fr"?"ALARMES ACTIVES":lang==="en"?"ACTIVE ALARMS":lang==="es"?"ALARMAS ACTIVAS":"ALARMES ATIVAS"}
        </div>
        {alarms.length===0 ? (
          <div style={{fontSize:10,color:C.green}}>✅ {lang==="fr"?"Tous paramètres normaux":lang==="en"?"All parameters normal":lang==="es"?"Todos los parámetros normales":"Todos os parâmetros normais"}</div>
        ) : alarms.map((a,i) => (
          <div key={i} style={{fontSize:10,color:a.type==="danger"?C.red:C.orange,fontWeight:700,padding:"2px 0"}}>
            {a.msg[lang]||a.msg.fr}
            <span style={{fontSize:8,color:C.muted,marginLeft:6}}>
              {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
            </span>
          </div>
        ))}
      </div>
      <div style={{marginTop:6,fontSize:10,color:C.muted,textAlign:"center"}}>
        {lang==="fr"?"Tableau de bord en temps réel — paramètres fluctuants":lang==="en"?"Real-time dashboard — fluctuating parameters":lang==="es"?"Panel en tiempo real — parámetros fluctuantes":"Painel em tempo real — parâmetros flutuantes"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — WATCH SCHEDULE (STCW)
// ══════════════════════════════════════
function WatchScheduleSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const W = 290;

  const engineers = [
    { name:{fr:"Chef méc.",en:"Chief eng.",es:"Jefe máq.",pt:"Chefe máq."}, color:C.gold2, watches:[{s:0,e:24,type:"supervision"}] },
    { name:{fr:"2nd méc.",en:"2nd eng.",es:"2° maq.",pt:"2° máq."}, color:C.orange, watches:[{s:0,e:4,type:"watch"},{s:12,e:16,type:"watch"}] },
    { name:{fr:"3ème méc.",en:"3rd eng.",es:"3° maq.",pt:"3° máq."}, color:C.blue2, watches:[{s:4,e:8,type:"watch"},{s:16,e:20,type:"watch"}] },
    { name:{fr:"4ème méc.",en:"4th eng.",es:"4° maq.",pt:"4° máq."}, color:C.teal, watches:[{s:8,e:12,type:"watch"},{s:20,e:24,type:"watch"}] },
  ];

  const hours = [0,4,8,12,16,20,24];
  const rowH = 28, headerH = 22, nameW = 60;
  const timeW = W - nameW - 20;

  return (
    <div>
      <svg width={W} height={headerH + engineers.length*rowH + 20} viewBox={`0 0 ${W} ${headerH + engineers.length*rowH + 20}`}>
        <rect width={W} height={headerH + engineers.length*rowH + 20} fill="#061020" rx="8"/>

        {/* Time header */}
        {hours.map(h => (
          <g key={h}>
            <line x1={nameW + (h/24)*timeW} y1={headerH-8} x2={nameW + (h/24)*timeW} y2={headerH + engineers.length*rowH}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
            <text x={nameW + (h/24)*timeW} y={12} textAnchor="middle" fontSize="7" fill={C.muted}>{String(h).padStart(2,"0")}h</text>
          </g>
        ))}

        {/* Rows */}
        {engineers.map((eng, ei) => (
          <g key={ei}>
            {/* Name */}
            <text x={8} y={headerH + ei*rowH + rowH/2 + 3} fontSize="8" fill={eng.color} fontWeight="700">
              {eng.name[lang]||eng.name.fr}
            </text>
            {/* Watch blocks */}
            {eng.watches.map((w, wi) => {
              const x = nameW + (w.s/24)*timeW;
              const width = ((w.e-w.s)/24)*timeW;
              const isSupervision = w.type==="supervision";
              return (
                <g key={wi} onClick={()=>setSel(sel===`${ei}-${wi}`?null:`${ei}-${wi}`)} style={{cursor:"pointer"}}>
                  <rect x={x} y={headerH + ei*rowH + 4} width={width} height={rowH-8}
                    fill={isSupervision?`${eng.color}12`:`${eng.color}35`}
                    stroke={eng.color} strokeWidth={sel===`${ei}-${wi}`?2:0.8}
                    rx={4}/>
                  {width > 30 && (
                    <text x={x + width/2} y={headerH + ei*rowH + rowH/2 + 3}
                      textAnchor="middle" fontSize="7" fill={eng.color} fontWeight="600">
                      {isSupervision
                        ?(lang==="fr"?"Supervision":lang==="en"?"Supervision":lang==="es"?"Supervisión":"Supervisão")
                        :(lang==="fr"?"QUART":lang==="en"?"WATCH":lang==="es"?"GUARDIA":"QUARTO")}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}

        {/* Rest hours indicator */}
        <text x={nameW/2} y={headerH + engineers.length*rowH + 14} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lang==="fr"?"STCW : min 10h repos/24h":lang==="en"?"STCW: min 10h rest/24h":lang==="es"?"STCW: mín 10h descanso/24h":"STCW: mín 10h descanso/24h"}
        </text>
      </svg>

      <div style={{marginTop:8,padding:"8px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`,fontSize:10,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"
          ?"⏰ STCW/MLC 2006 : Maximum 14h travail/24h · Maximum 72h/semaine\nMinimum 10h repos/24h · Minimum 77h repos/semaine\nJournal des heures OBLIGATOIRE · signé officier + capitaine"
          :lang==="en"
          ?"⏰ STCW/MLC 2006: Max 14h work/24h · Max 72h/week\nMin 10h rest/24h · Min 77h rest/week\nHours log MANDATORY · signed officer + captain"
          :"⏰ STCW/MLC 2006: Máx 14h trabajo/24h · Máx 72h/semana\nMín 10h descanso/24h · Mín 77h descanso/semana\nRegistro horas OBLIGATORIO · firmado oficial + capitán"}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — UMS ALARM SYSTEM
// ══════════════════════════════════════
function UMSAlarmSVG({ lang }) {
  const [umsMode, setUmsMode] = useState(false);
  const [triggeredAlarm, setTriggeredAlarm] = useState(null);
  const [responded, setResponded] = useState(false);

  const alarmPoints = [
    { id:"oil", x:60, y:60, label:{fr:"Pression huile",en:"Oil pressure",es:"Presión aceite",pt:"Pressão óleo"}, level:"critical", icon:"🔴" },
    { id:"temp", x:140, y:45, label:{fr:"Température eau",en:"Water temp",es:"Temperatura agua",pt:"Temperatura água"}, level:"critical", icon:"🌡️" },
    { id:"bilge", x:220, y:60, label:{fr:"Niveau cale",en:"Bilge level",es:"Nivel sentina",pt:"Nível porão"}, level:"warning", icon:"💧" },
    { id:"rpm", x:60, y:120, label:{fr:"Survitesse",en:"Overspeed",es:"Sobrevelocidad",pt:"Sobrevelocidade"}, level:"critical", icon:"⚡" },
    { id:"fire", x:140, y:130, label:{fr:"Détecteur feu",en:"Fire detector",es:"Detector fuego",pt:"Detetor fogo"}, level:"critical", icon:"🔥" },
    { id:"exhaust", x:220, y:120, label:{fr:"Temp. échap.",en:"Exhaust temp",es:"Temp. escape",pt:"Temp. escape"}, level:"warning", icon:"💨" },
  ];

  const triggerAlarm = (id) => {
    setTriggeredAlarm(id);
    setResponded(false);
  };

  const a_ = triggeredAlarm ? alarmPoints.find(a=>a.id===triggeredAlarm) : null;

  return (
    <div>
      {/* UMS Toggle */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={()=>setUmsMode(false)} style={{flex:1,padding:"8px",borderRadius:10,fontSize:10,cursor:"pointer",fontWeight:700,background:!umsMode?"rgba(30,138,74,0.2)":"rgba(255,255,255,0.05)",border:`1.5px solid ${!umsMode?C.green:"rgba(255,255,255,0.1)"}`,color:!umsMode?C.green:C.muted}}>
          👨‍🔧 {lang==="fr"?"Quart normal":lang==="en"?"Normal watch":lang==="es"?"Guardia normal":"Quarto normal"}
        </button>
        <button onClick={()=>setUmsMode(true)} style={{flex:1,padding:"8px",borderRadius:10,fontSize:10,cursor:"pointer",fontWeight:700,background:umsMode?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.05)",border:`1.5px solid ${umsMode?C.gold:"rgba(255,255,255,0.1)"}`,color:umsMode?C.gold2:C.muted}}>
          🤖 {lang==="fr"?"Mode UMS":lang==="en"?"UMS Mode":lang==="es"?"Modo UMS":"Modo UMS"}
        </button>
      </div>

      <svg width="290" height="170" viewBox="0 0 290 170">
        <rect width="290" height="170" fill="#061020" rx="8"/>

        {/* Engine room outline */}
        <rect x="20" y="20" width="250" height="130" rx="6"
          fill="rgba(13,31,60,0.5)" stroke={umsMode?C.gold:C.green} strokeWidth="1.5"
          strokeDasharray={umsMode?"5,3":"none"}/>

        {/* UMS label */}
        <text x="145" y="15" textAnchor="middle" fontSize="7" fill={umsMode?C.gold:C.green} fontWeight="700">
          {umsMode
            ?(lang==="fr"?"🤖 UMS — Salle des machines sans surveillance":lang==="en"?"🤖 UMS — Unattended Machinery Space":lang==="es"?"🤖 UMS — Sala de máquinas sin vigilancia":"🤖 UMS — Casa das máquinas sem vigilância")
            :(lang==="fr"?"👨‍🔧 Quart normal — Officier présent":lang==="en"?"👨‍🔧 Normal watch — Officer present":lang==="es"?"👨‍🔧 Guardia normal — Oficial presente":"👨‍🔧 Quarto normal — Oficial presente")}
        </text>

        {/* Alarm points */}
        {alarmPoints.map(a => {
          const isTriggered = triggeredAlarm===a.id;
          const color = a.level==="critical"?C.red:C.orange;
          return (
            <g key={a.id} onClick={()=>triggerAlarm(a.id)} style={{cursor:"pointer"}}>
              <circle cx={a.x} cy={a.y} r={16}
                fill={isTriggered?`${color}40`:`${color}12`}
                stroke={isTriggered?color:`${color}55`}
                strokeWidth={isTriggered?2:1}>
                {isTriggered&&!responded&&<animate attributeName="opacity" values="1;0.4;1" dur="0.5s" repeatCount="indefinite"/>}
              </circle>
              <text x={a.x} y={a.y+2} textAnchor="middle" fontSize="12">{a.icon}</text>
              <text x={a.x} y={a.y+24} textAnchor="middle" fontSize="6" fill={color} fontWeight="600">
                {(a.label[lang]||a.label.fr).split(' ')[0]}
              </text>
            </g>
          );
        })}

        {/* Central alarm panel */}
        <rect x="105" y="85" width="80" height="35" rx="5"
          fill="rgba(0,0,0,0.6)" stroke={triggeredAlarm&&!responded?C.red:C.steel} strokeWidth="1">
          {triggeredAlarm&&!responded&&<animate attributeName="stroke" values={`${C.red};${C.orange};${C.red}`} dur="0.5s" repeatCount="indefinite"/>}
        </rect>
        <text x="145" y="100" textAnchor="middle" fontSize="7" fill={triggeredAlarm&&!responded?C.red:C.muted} fontWeight="700">
          {lang==="fr"?"PANNEAU ALARMES":lang==="en"?"ALARM PANEL":lang==="es"?"PANEL ALARMAS":"PAINEL ALARMES"}
        </text>
        <text x="145" y="112" textAnchor="middle" fontSize="6" fill={triggeredAlarm&&!responded?C.red:C.steel}>
          {triggeredAlarm&&!responded?"⚠️ ALARM":responded?"✅ ACK":"● NORMAL"}
        </text>

        {/* Engineer icon in UMS off */}
        {!umsMode&&<text x="145" y="155" textAnchor="middle" fontSize="12">👨‍🔧</text>}
        {umsMode&&<text x="145" y="155" textAnchor="middle" fontSize="8" fill={C.gold}>
          {lang==="fr"?"→ Alerte permanence":lang==="en"?"→ Duty alert":lang==="es"?"→ Alerta guardia":"→ Alerta de serviço"}
        </text>}
      </svg>

      {/* Alarm info */}
      {a_&&(
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
          background:responded?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.12)",
          border:`1px solid ${responded?C.green:C.red}44`,animation:"fadeUp 0.3s ease"}}>
          <div style={{fontSize:12,fontWeight:700,color:responded?C.green:C.red,marginBottom:6}}>
            {a_.icon} {a_.label[lang]||a_.label.fr}
            {a_.level==="critical"&&<span style={{marginLeft:6,fontSize:9,padding:"1px 5px",borderRadius:5,background:`${C.red}22`,border:`1px solid ${C.red}44`,color:C.red}}>CRITIQUE</span>}
          </div>
          {!responded&&(
            <div style={{fontSize:10,color:C.white,lineHeight:1.6,marginBottom:8}}>
              {umsMode
                ?(lang==="fr"?"Mode UMS : alarme transmise à l'officier de permanence + passerelle\nOfficier de permanence doit répondre dans les 3 minutes\nSi pas de réponse → alarme de détresse passerelle":lang==="en"?"UMS mode: alarm transmitted to duty engineer + bridge\nDuty engineer must respond within 3 minutes\nIf no response → bridge distress alarm":lang==="es"?"Modo UMS: alarma transmitida al oficial de guardia + puente\nOficial debe responder en 3 minutos":"Modo UMS: alarme transmitido ao oficial de serviço + ponte\nOficial de serviço deve responder em 3 minutos")
                :(lang==="fr"?"Quart normal : officier présent en salle des machines\nAction immédiate requise\nConsigner dans le journal machine":lang==="en"?"Normal watch: officer present in engine room\nImmediate action required\nLog in engine room journal":lang==="es"?"Guardia normal: oficial presente en sala de máquinas\nAcción inmediata requerida":"Quarto normal: oficial presente na casa das máquinas\nAção imediata necessária")}
            </div>
          )}
          <button onClick={()=>setResponded(true)} disabled={responded} style={{width:"100%",padding:"8px",borderRadius:10,background:responded?"rgba(30,138,74,0.2)":`linear-gradient(135deg,${C.orange},${C.red})`,border:`1px solid ${responded?C.green:C.red}`,color:C.white,fontSize:11,fontWeight:700,cursor:responded?"default":"pointer"}}>
            {responded?"✅ "+(lang==="fr"?"Alarme acquittée":lang==="en"?"Alarm acknowledged":lang==="es"?"Alarma reconocida":"Alarme reconhecido"):"▶ "+(lang==="fr"?"ACQUITTER L'ALARME":lang==="en"?"ACKNOWLEDGE ALARM":lang==="es"?"RECONOCER ALARMA":"RECONHECER ALARME")}
          </button>
        </div>
      )}
      {!a_&&<div style={{marginTop:6,textAlign:"center",fontSize:10,color:C.muted}}>
        {lang==="fr"?"Touche un point d'alarme pour simuler":lang==="en"?"Tap an alarm point to simulate":lang==="es"?"Toca un punto de alarma para simular":"Toque num ponto de alarme para simular"}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — ENGINE LOG SIMULATOR
// ══════════════════════════════════════
function EngineLogSVG({ lang }) {
  const [entries, setEntries] = useState([
    { time:"00:00", rpm:"90", temp:"82", oil:"4.2", signed:true, note:{fr:"Prise de quart normale",en:"Normal watch takeover",es:"Toma de guardia normal",pt:"Tomada de quarto normal"} },
    { time:"04:00", rpm:"91", temp:"83", oil:"4.1", signed:true, note:{fr:"Tous paramètres normaux",en:"All parameters normal",es:"Todos los parámetros normales",pt:"Todos os parâmetros normais"} },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({time:"", rpm:"", temp:"", oil:"", note:""});

  const addEntry = () => {
    if(!form.time||!form.rpm) return;
    setEntries(e=>[...e, {...form, note:{fr:form.note,en:form.note,es:form.note,pt:form.note}, signed:true}]);
    setForm({time:"",rpm:"",temp:"",oil:"",note:""});
    setShowForm(false);
  };

  return (
    <div>
      <div style={{background:"rgba(26,111,212,0.08)",border:`1px solid ${C.blue2}33`,borderRadius:10,padding:"8px 12px",marginBottom:10}}>
        <div style={{fontSize:10,fontWeight:700,color:C.blue2,marginBottom:2}}>
          📋 {lang==="fr"?"JOURNAL MACHINE (ENGINE LOG)":lang==="en"?"ENGINE LOG":lang==="es"?"DIARIO DE MÁQUINAS":"DIÁRIO DE MÁQUINAS"}
        </div>
        <div style={{fontSize:9,color:C.muted}}>
          {lang==="fr"?"Entrée toutes les 4 heures minimum · Signé officier de quart + capitaine":lang==="en"?"Entry every 4 hours minimum · Signed by watch officer + captain":lang==="es"?"Entrada cada 4 horas mínimo · Firmado oficial de guardia + capitán":"Entrada a cada 4 horas no mínimo · Assinado oficial de quarto + capitão"}
        </div>
      </div>

      {/* Log table header */}
      <div style={{display:"grid",gridTemplateColumns:"50px 40px 45px 45px 1fr 30px",gap:4,marginBottom:4,padding:"4px 8px",borderRadius:6,background:"rgba(255,255,255,0.05)"}}>
        {[lang==="fr"?"Heure":lang==="en"?"Time":lang==="es"?"Hora":"Hora","RPM",lang==="fr"?"Temp":"Temp","Huile/Oil",lang==="fr"?"Note":"Note","✓"].map((h,i)=>(
          <div key={i} style={{fontSize:8,color:C.muted,fontWeight:700}}>{h}</div>
        ))}
      </div>

      {/* Entries */}
      {entries.map((e,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"50px 40px 45px 45px 1fr 30px",gap:4,padding:"5px 8px",borderRadius:6,marginBottom:3,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <div style={{fontSize:9,color:C.gold2,fontWeight:700,fontFamily:"monospace"}}>{e.time}</div>
          <div style={{fontSize:9,color:C.white}}>{e.rpm}</div>
          <div style={{fontSize:9,color:C.white}}>{e.temp}°C</div>
          <div style={{fontSize:9,color:C.white}}>{e.oil} bar</div>
          <div style={{fontSize:8,color:C.muted,lineHeight:1.3}}>{e.note[lang]||e.note.fr}</div>
          <div style={{fontSize:10,color:C.green}}>{e.signed?"✅":""}</div>
        </div>
      ))}

      {showForm&&(
        <div style={{marginTop:8,padding:"10px",borderRadius:12,background:"rgba(13,31,60,0.9)",border:`1px solid ${C.border}`,animation:"fadeUp 0.3s ease"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:8}}>
            {[
              {key:"time",placeholder:"08:00",label:{fr:"Heure",en:"Time",es:"Hora",pt:"Hora"}},
              {key:"rpm",placeholder:"90",label:{fr:"RPM",en:"RPM",es:"RPM",pt:"RPM"}},
              {key:"temp",placeholder:"82",label:{fr:"Temp°C",en:"Temp°C",es:"Temp°C",pt:"Temp°C"}},
              {key:"oil",placeholder:"4.2",label:{fr:"Huile bar",en:"Oil bar",es:"Aceite bar",pt:"Óleo bar"}},
            ].map(f=>(
              <div key={f.key}>
                <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{f.label[lang]||f.label.fr}</div>
                <input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                  style={{width:"100%",padding:"5px",borderRadius:6,background:"rgba(255,255,255,0.08)",border:`1px solid ${C.border}`,color:C.white,fontSize:10,boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:8}}>
            <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{lang==="fr"?"Note:":lang==="en"?"Note:":lang==="es"?"Nota:":"Nota:"}</div>
            <input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))}
              placeholder={lang==="fr"?"Observations...":lang==="en"?"Observations...":lang==="es"?"Observaciones...":"Observações..."}
              style={{width:"100%",padding:"6px",borderRadius:6,background:"rgba(255,255,255,0.08)",border:`1px solid ${C.border}`,color:C.white,fontSize:10,boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setShowForm(false)} style={{flex:1,padding:"7px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,fontSize:10,cursor:"pointer"}}>
              {lang==="fr"?"Annuler":"Cancel"}
            </button>
            <button onClick={addEntry} style={{flex:2,padding:"7px",borderRadius:8,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:C.white,fontSize:10,fontWeight:700,cursor:"pointer"}}>
              ✅ {lang==="fr"?"SIGNER & ENREGISTRER":lang==="en"?"SIGN & RECORD":lang==="es"?"FIRMAR & REGISTRAR":"ASSINAR & REGISTAR"}
            </button>
          </div>
        </div>
      )}

      {!showForm&&(
        <button onClick={()=>setShowForm(true)} style={{width:"100%",marginTop:8,padding:"9px",borderRadius:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,color:C.blue2,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
          + {lang==="fr"?"Nouvelle entrée (4h)":lang==="en"?"New entry (4h)":lang==="es"?"Nueva entrada (4h)":"Nova entrada (4h)"}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV Sewol — Corée du Sud (2014)",teaser:"Ferry · Quart machine non assuré · 304 morts · Défaut de maintenance",what:"Le ferry Sewol chavire en Corée du Sud. 304 personnes meurent, dont 250 lycéens. L'enquête révèle de graves manquements aux procédures de quart machine et de maintenance. Le chef mécanicien est condamné. La catastrophe entraîne une révision complète des normes maritimes coréennes.",cause:"• Déséquilibre de chargement non corrigé (trop de chargement mal arrimé)\n• Quart machine non alerté de la situation de stabilité\n• Communication défaillante entre passerelle et salle des machines\n• Procédures de quart non respectées\n• Maintenance préventive insuffisante sur les systèmes de stabilisation\n• Chef mécanicien absent du poste lors de la crise",lessons:"✓ Quart machine = présence CONTINUE obligatoire\n✓ Communication passerelle ↔ machine = essentielle en manœuvre\n✓ Journal machine = traçabilité de toutes les actions\n✓ Officier de quart machine doit signaler tout anomalie\n✓ Formation STCW watchkeeping = obligatoire pour tous officiers machine",link:"🔗 Lien L7 Watchkeeping : Un officier de quart machine présent et vigilant aurait pu alerter la passerelle du problème de stabilité dès le début. Le watchkeeping n'est pas une formalité — c'est la sécurité du navire."},
    en:{title:"MV Sewol — South Korea (2014)",teaser:"Ferry · Engine watch failure · 304 deaths · Maintenance defect",what:"The ferry Sewol capsizes in South Korea. 304 people die, including 250 high school students. Investigation reveals serious failures in engine room watch procedures and maintenance. The chief engineer is convicted. The disaster leads to a complete revision of Korean maritime standards.",cause:"• Cargo imbalance not corrected (too much poorly secured cargo)\n• Engine watch not alerted to stability situation\n• Faulty communication between bridge and engine room\n• Watch procedures not followed\n• Insufficient preventive maintenance on stabilization systems\n• Chief engineer absent from post during crisis",lessons:"✓ Engine watch = CONTINUOUS presence mandatory\n✓ Bridge ↔ engine communication = essential during maneuvering\n✓ Engine log = traceability of all actions\n✓ Engine watch officer must report any anomaly\n✓ STCW watchkeeping training = mandatory for all engine officers",link:"🔗 L7 Watchkeeping Link: A present and vigilant engine watch officer could have alerted the bridge to the stability problem from the start. Watchkeeping is not a formality — it is vessel safety."},
    es:{title:"MV Sewol — Corea del Sur (2014)",teaser:"Ferry · Guardia de máquinas fallida · 304 muertos · Defecto de mantenimiento",what:"El ferry Sewol vuelca en Corea del Sur. Mueren 304 personas, entre ellas 250 estudiantes de bachillerato. La investigación revela graves incumplimientos en los procedimientos de guardia de máquinas y de mantenimiento.",cause:"• Desequilibrio de carga no corregido\n• Guardia de máquinas no alertada sobre la situación de estabilidad\n• Comunicación deficiente entre puente y sala de máquinas\n• Procedimientos de guardia no respetados\n• Jefe de máquinas ausente del puesto durante la crisis",lessons:"✓ Guardia de máquinas = presencia CONTINUA obligatoria\n✓ Comunicación puente ↔ máquinas = esencial en maniobra\n✓ Diario de máquinas = trazabilidad de todas las acciones\n✓ STCW watchkeeping = obligatorio para todos los oficiales de máquinas",link:"🔗 Vínculo L7: Un oficial de guardia presente y vigilante habría podido alertar al puente del problema de estabilidad. El watchkeeping no es una formalidad — es la seguridad del buque."},
    pt:{title:"MV Sewol — Coreia do Sul (2014)",teaser:"Ferry · Quarto de máquinas falhado · 304 mortos · Defeito de manutenção",what:"O ferry Sewol capsiza na Coreia do Sul. 304 pessoas morrem, incluindo 250 estudantes do ensino secundário. A investigação revela graves falhas nos procedimentos de quarto de máquinas e manutenção.",cause:"• Desequilíbrio de carga não corrigido\n• Quarto de máquinas não alertado sobre a situação de estabilidade\n• Comunicação deficiente entre ponte e sala de máquinas\n• Procedimentos de quarto não respeitados\n• Chefe de máquinas ausente do posto durante a crise",lessons:"✓ Quarto de máquinas = presença CONTÍNUA obrigatória\n✓ Comunicação ponte ↔ máquinas = essencial em manobra\n✓ Diário de máquinas = rastreabilidade de todas as ações\n✓ STCW watchkeeping = obrigatório para todos os oficiais de máquinas",link:"🔗 Vínculo L7: Um oficial de quarto presente e vigilante poderia ter alertado a ponte do problema de estabilidade. O watchkeeping não é uma formalidade — é a segurança do navio."},
  };
  const c=d[lang]||d.fr;
  return(
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
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans,setAns]=useState({q1:"",q2:"",q3:""});
  const [showC,setShowC]=useState(false);
  const correct={q1:"4",q2:"10",q3:"ums"};
  const qs={
    fr:[
      {id:"q1",q:"Le journal machine doit avoir une entrée minimum toutes les combien d'heures ?"},
      {id:"q2",q:"STCW/MLC : minimum combien d'heures de repos par 24 heures pour un officier ?"},
      {id:"q3",q:"Comment s'appelle le mode où la salle des machines fonctionne sans officier présent en permanence ?\n(Répondre : UMS)"},
    ],
    en:[
      {id:"q1",q:"The engine log must have an entry minimum every how many hours?"},
      {id:"q2",q:"STCW/MLC: minimum how many hours of rest per 24 hours for an officer?"},
      {id:"q3",q:"What is the mode called when the engine room operates without a permanently present officer?\n(Answer: UMS)"},
    ],
    es:[
      {id:"q1",q:"¿El diario de máquinas debe tener una entrada mínimo cada cuántas horas?"},
      {id:"q2",q:"STCW/MLC: ¿mínimo cuántas horas de descanso por 24 horas para un oficial?"},
      {id:"q3",q:"¿Cómo se llama el modo en que la sala de máquinas funciona sin oficial permanentemente presente?\n(Responder: UMS)"},
    ],
    pt:[
      {id:"q1",q:"O diário de máquinas deve ter uma entrada mínimo a cada quantas horas?"},
      {id:"q2",q:"STCW/MLC: mínimo quantas horas de descanso por 24 horas para um oficial?"},
      {id:"q3",q:"Como se chama o modo em que a sala de máquinas funciona sem oficial permanentemente presente?\n(Responder: UMS)"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="4"||v==="4h"||v==="4 heures"||v==="4 horas"||v==="4 hours";
    if(id==="q2") return v==="10"||v==="10h"||v==="10 heures"||v==="10 horas"||v==="10 hours";
    if(id==="q3") return v==="ums";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.blue2}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Journal machine = toutes les 4h · STCW min 10h repos/24h · UMS = sans surveillance":lang==="en"?"💡 Reminders: Engine log = every 4h · STCW min 10h rest/24h · UMS = unattended":lang==="es"?"💡 Recordatorios: Diario máquinas = cada 4h · STCW mín 10h descanso/24h · UMS = sin vigilancia":"💡 Lembretes: Diário máquinas = a cada 4h · STCW mín 10h descanso/24h · UMS = sem vigilância"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 4 heures (journal machine = entrée toutes les 4h minimum)\n✅ Q2: 10 heures (STCW/MLC 2006 — max 14h travail, min 10h repos)\n✅ Q3: UMS (Unattended Machinery Space)"
        :lang==="en"?"✅ Q1: 4 hours (engine log = entry every 4h minimum)\n✅ Q2: 10 hours (STCW/MLC 2006 — max 14h work, min 10h rest)\n✅ Q3: UMS (Unattended Machinery Space)"
        :"✅ Q1: 4 horas · Q2: 10 horas · Q3: UMS (Sala de Máquinas Sin Vigilancia)"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


const QUIZ = {
  fr:[
    {q:"À quelle fréquence minimum doit-on noter les paramètres dans le journal machine ?",opts:["Toutes les heures","Toutes les 4 heures","Toutes les 8 heures","Une fois par jour"],correct:1,expl:"Le journal machine (engine log) doit avoir une entrée minimum toutes les 4 heures, correspondant à chaque prise de quart. Chaque entrée doit être signée par l'officier de quart responsable. Contenu : RPM, températures, pressions, événements notables, alarmes. Conservation : 3 ans minimum."},
    {q:"Qu'est-ce que l'UMS (Unattended Machinery Space) ?",opts:["Une panne totale de la salle des machines","Mode de fonctionnement où la salle des machines est surveillée par des systèmes d'alarme centralisés sans officier présent en permanence","Un type de moteur auxiliaire","Un mode d'urgence"],correct:1,expl:"UMS = Unattended Machinery Space (Salle des Machines Sans Surveillance). Autorisé par SOLAS si : système d'alarme centralisé fonctionnel, officier de permanence (duty engineer) disponible 24h/24, alarmes transmises à la passerelle et aux cabines, réponse dans les 3 minutes. Avantage : réduit la fatigue de l'équipage la nuit."},
    {q:"Selon STCW/MLC 2006, combien d'heures de repos minimum par 24h pour un officier machine ?",opts:["6 heures","8 heures","10 heures minimum","12 heures"],correct:2,expl:"STCW/MLC 2006 : minimum 10 heures de repos par période de 24 heures. Maximum 14 heures de travail par 24 heures. Maximum 72 heures de travail par semaine. Minimum 77 heures de repos par semaine. Journal des heures de travail et de repos obligatoire, signé par l'officier et le capitaine. Infraction = détention PSC possible."},
    {q:"Que doit faire l'officier de quart machine avant de prendre son quart ?",opts:["Démarrer directement le travail","Vérifier l'état général de la salle des machines, recevoir le briefing de l'officier sortant, signer le journal machine","Dormir d'abord","Demander au capitaine l'autorisation"],correct:1,expl:"Prise de quart (handover) : 1) Recevoir le briefing complet de l'officier sortant (anomalies, travaux en cours, paramètres). 2) Effectuer une ronde d'inspection. 3) Vérifier tous les paramètres. 4) Signer le journal machine pour prendre la responsabilité. 5) Ne JAMAIS prendre le quart si des conditions dangereuses ne sont pas résolues."},
    {q:"Quelle est la règle STCW pour l'officier de quart machine en cas d'alarme critique ?",opts:["Attendre la fin du quart pour agir","Agir immédiatement, notifier la passerelle et le chef mécanicien, consigner dans le journal machine","Ignorer si l'alarme s'arrête","Appeler le capitaine en premier"],correct:1,expl:"Face à une alarme critique : 1) Agir IMMÉDIATEMENT (ne pas attendre). 2) Notifier la passerelle (canal interne). 3) Notifier le chef mécanicien. 4) Prendre les mesures correctrices. 5) Consigner dans le journal machine (heure, nature, action). 6) En UMS : l'officier de permanence doit répondre dans les 3 minutes."},
  ],
  en:[
    {q:"At what minimum frequency must parameters be recorded in the engine log?",opts:["Every hour","Every 4 hours","Every 8 hours","Once a day"],correct:1,expl:"The engine log must have an entry minimum every 4 hours, corresponding to each watch handover. Each entry must be signed by the responsible watch officer. Content: RPM, temperatures, pressures, notable events, alarms. Retention: minimum 3 years."},
    {q:"What is UMS (Unattended Machinery Space)?",opts:["A total engine room failure","Operating mode where engine room is monitored by centralized alarm systems without a permanently present officer","A type of auxiliary engine","An emergency mode"],correct:1,expl:"UMS = Unattended Machinery Space. Permitted by SOLAS if: centralized alarm system functional, duty engineer available 24/7, alarms transmitted to bridge and cabins, response within 3 minutes. Advantage: reduces crew fatigue at night."},
    {q:"Per STCW/MLC 2006, minimum rest hours per 24h for an engine officer?",opts:["6 hours","8 hours","Minimum 10 hours","12 hours"],correct:2,expl:"STCW/MLC 2006: minimum 10 hours rest per 24-hour period. Maximum 14 hours work per 24 hours. Maximum 72 hours work per week. Minimum 77 hours rest per week. Work and rest hours log mandatory, signed by officer and captain. Violation = possible PSC detention."},
    {q:"What must the engine watch officer do before taking their watch?",opts:["Start work directly","Check engine room general condition, receive briefing from outgoing officer, sign engine log","Sleep first","Ask captain for permission"],correct:1,expl:"Watch takeover (handover): 1) Receive full briefing from outgoing officer (anomalies, ongoing work, parameters). 2) Conduct inspection round. 3) Check all parameters. 4) Sign engine log to take responsibility. 5) NEVER take over watch if dangerous conditions are unresolved."},
    {q:"What is the STCW rule for the engine watch officer facing a critical alarm?",opts:["Wait for end of watch to act","Act immediately, notify bridge and chief engineer, log in engine log","Ignore if alarm stops","Call captain first"],correct:1,expl:"Critical alarm response: 1) Act IMMEDIATELY (do not wait). 2) Notify bridge (internal channel). 3) Notify chief engineer. 4) Take corrective action. 5) Log in engine log (time, nature, action). 6) In UMS: duty engineer must respond within 3 minutes."},
  ],
  es:[
    {q:"¿Con qué frecuencia mínima deben anotarse los parámetros en el diario de máquinas?",opts:["Cada hora","Cada 4 horas","Cada 8 horas","Una vez al día"],correct:1,expl:"El diario de máquinas debe tener una entrada mínimo cada 4 horas, correspondiente a cada toma de guardia. Cada entrada debe ser firmada por el oficial de guardia responsable. Contenido: RPM, temperaturas, presiones, eventos notables, alarmas. Conservación: mínimo 3 años."},
    {q:"¿Qué es UMS (Sala de Máquinas Sin Vigilancia)?",opts:["Una avería total de la sala de máquinas","Modo de funcionamiento donde la sala de máquinas es vigilada por sistemas de alarma centralizados sin oficial presente de forma permanente","Un tipo de motor auxiliar","Un modo de emergencia"],correct:1,expl:"UMS = Sala de Máquinas Sin Vigilancia. Autorizado por SOLAS si: sistema de alarma centralizado funcional, oficial de guardia disponible 24h/24, alarmas transmitidas al puente y camarotes, respuesta en 3 minutos. Ventaja: reduce la fatiga de la tripulación por la noche."},
    {q:"Según STCW/MLC 2006, ¿cuántas horas de descanso mínimo por 24h para un oficial de máquinas?",opts:["6 horas","8 horas","Mínimo 10 horas","12 horas"],correct:2,expl:"STCW/MLC 2006: mínimo 10 horas de descanso por período de 24 horas. Máximo 14 horas de trabajo por 24 horas. Máximo 72 horas de trabajo por semana. Registro de horas de trabajo y descanso obligatorio, firmado por el oficial y el capitán."},
    {q:"¿Qué debe hacer el oficial de guardia de máquinas antes de tomar su guardia?",opts:["Empezar el trabajo directamente","Verificar el estado general de la sala de máquinas, recibir el briefing del oficial saliente, firmar el diario de máquinas","Dormir primero","Pedir permiso al capitán"],correct:1,expl:"Toma de guardia (handover): 1) Recibir briefing completo del oficial saliente. 2) Efectuar ronda de inspección. 3) Verificar todos los parámetros. 4) Firmar el diario de máquinas. 5) NUNCA tomar la guardia si hay condiciones peligrosas sin resolver."},
    {q:"¿Cuál es la regla STCW para el oficial de guardia de máquinas ante una alarma crítica?",opts:["Esperar al final de la guardia para actuar","Actuar inmediatamente, notificar al puente y al jefe de máquinas, consignar en el diario de máquinas","Ignorar si la alarma se detiene","Llamar primero al capitán"],correct:1,expl:"Ante una alarma crítica: 1) Actuar INMEDIATAMENTE. 2) Notificar al puente. 3) Notificar al jefe de máquinas. 4) Tomar medidas correctoras. 5) Consignar en el diario de máquinas. 6) En UMS: el oficial de guardia debe responder en 3 minutos."},
  ],
  pt:[
    {q:"Com que frequência mínima devem ser registados os parâmetros no diário de máquinas?",opts:["A cada hora","A cada 4 horas","A cada 8 horas","Uma vez por dia"],correct:1,expl:"O diário de máquinas deve ter uma entrada mínimo a cada 4 horas, correspondente a cada tomada de quarto. Cada entrada deve ser assinada pelo oficial de quarto responsável. Conteúdo: RPM, temperaturas, pressões, eventos notáveis, alarmes. Conservação: mínimo 3 anos."},
    {q:"O que é UMS (Sala de Máquinas Sem Vigilância)?",opts:["Uma avaria total da sala de máquinas","Modo de funcionamento onde a sala de máquinas é monitorizada por sistemas de alarme centralizados sem oficial permanentemente presente","Um tipo de motor auxiliar","Um modo de emergência"],correct:1,expl:"UMS = Sala de Máquinas Sem Vigilância. Autorizado pelo SOLAS se: sistema de alarme centralizado funcional, oficial de serviço disponível 24h/24, alarmes transmitidos à ponte e camarotes, resposta em 3 minutos. Vantagem: reduz a fadiga da tripulação à noite."},
    {q:"Segundo STCW/MLC 2006, mínimo quantas horas de descanso por 24h para um oficial de máquinas?",opts:["6 horas","8 horas","Mínimo 10 horas","12 horas"],correct:2,expl:"STCW/MLC 2006: mínimo 10 horas de descanso por período de 24 horas. Máximo 14 horas de trabalho por 24 horas. Máximo 72 horas de trabalho por semana. Registo de horas de trabalho e descanso obrigatório, assinado pelo oficial e pelo capitão."},
    {q:"O que deve fazer o oficial de quarto de máquinas antes de assumir o seu quarto?",opts:["Começar o trabalho diretamente","Verificar o estado geral da sala de máquinas, receber o briefing do oficial cessante, assinar o diário de máquinas","Dormir primeiro","Pedir autorização ao capitão"],correct:1,expl:"Tomada de quarto (handover): 1) Receber briefing completo do oficial cessante. 2) Efetuar ronda de inspeção. 3) Verificar todos os parâmetros. 4) Assinar o diário de máquinas. 5) NUNCA assumir o quarto se houver condições perigosas não resolvidas."},
    {q:"Qual é a regra STCW para o oficial de quarto de máquinas face a um alarme crítico?",opts:["Esperar pelo fim do quarto para agir","Agir imediatamente, notificar a ponte e o chefe de máquinas, registar no diário de máquinas","Ignorar se o alarme parar","Ligar ao capitão primeiro"],correct:1,expl:"Face a um alarme crítico: 1) Agir IMEDIATAMENTE. 2) Notificar a ponte. 3) Notificar o chefe de máquinas. 4) Tomar medidas corretivas. 5) Registar no diário de máquinas. 6) Em UMS: o oficial de serviço deve responder em 3 minutos."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le 'handover' (passation de quart) ?",opts:["La fin du contrat de l'officier","Procédure de transmission de responsabilité entre officiers de quart : briefing complet, signature du journal machine","Le transfert de cargaison","Un type de manœuvre"],correct:1,expl:"Handover = passation de quart. L'officier sortant transmet à l'officier entrant : état des machines, anomalies en cours, travaux en cours, paramètres actuels, ordres spéciaux. L'officier entrant ne doit pas signer le journal si des conditions dangereuses non résolues existent."},
    {q:"Qu'est-ce que STCW (Standards of Training, Certification and Watchkeeping) ?",opts:["Un type de certificat de navigabilité","Convention internationale de l'OMI définissant les normes de formation, certification et quart pour tous les marins","Un code de sécurité incendie","Un type de contrat maritime"],correct:1,expl:"STCW 1978, révisé en 1995 et 2010 (Amendements de Manille). Définit les qualifications minimales pour les marins selon leurs fonctions. Chapitre III = officiers machine. Exige : certificats de compétence, formation de base sécurité (PSCRB, EFA, FPFF, BS), entraînement aux simulateurs."},
    {q:"Qu'est-ce qu'une 'ronde d'inspection' (patrol round) en salle des machines ?",opts:["Une visite touristique","Inspection périodique systématique de tous les équipements de la salle des machines pour détecter les anomalies","Un exercice de sécurité","Une vérification administrative"],correct:1,expl:"Ronde d'inspection = tour systématique de la salle des machines. Fréquence : selon manuel ISM (généralement toutes les 30-60 minutes en UMS). Vérifie : niveaux, fuites, températures anormales, bruits inhabituels, alarmes. Consignée dans le journal machine. Base de toute détection précoce d'avarie."},
    {q:"Qu'est-ce que le 'chief engineer's standing orders' ?",opts:["Les ordres de route","Instructions permanentes du chef mécanicien à ses officiers de quart concernant les procédures à suivre et les seuils d'alarme","Le plan de maintenance","Le budget machine"],correct:1,expl:"Chief engineer's standing orders = instructions permanentes écrites du chef mécanicien. Contenu : quand appeler le chef mécanicien, seuils d'alarme, procédures en cas d'urgence, restrictions de manœuvre. Signées par chaque officier. Doivent être relues à chaque début de contrat."},
    {q:"Qu'est-ce que le 'planned maintenance system' (PMS) ?",opts:["Un logiciel de navigation","Système de maintenance préventive planifiée — calendrier d'entretien des équipements selon les heures de fonctionnement ou dates","Un type d'alarme","Un système de surveillance"],correct:1,expl:"PMS = Système de Maintenance Planifiée. Permet de planifier et tracer tous les travaux d'entretien préventif (vidanges, révisions, inspections). Obligatoire dans le cadre du Code ISM. Réduire les pannes imprévues. Audit PSC et classification vérifient le PMS."},
    {q:"Que signifie 'dead ship condition' ?",opts:["Un navire coulé","État d'un navire sans propulsion ni électricité — toutes machines arrêtées","Un navire désarmé","Un navire en dry-dock"],correct:1,expl:"Dead ship condition = état le plus critique : aucun moteur, aucune électricité, aucun service à bord. Procédure de mise en route à partir de zéro : 1) Démarrer groupe de secours, 2) Rétablir électricité principale, 3) Mettre en chauffe moteur principal, 4) Démarrer moteur principal. Formation obligatoire STCW."},
    {q:"Qu'est-ce que le 'bridge-engine room communication' ?",opts:["Un système radio externe","Communication obligatoire entre la passerelle et la salle des machines via telegraph, VHF interne et annonces PA","Un type de contrôle automatique","Un système de navigation"],correct:1,expl:"Communication passerelle-machine = essentielle pour la sécurité. Moyens : telegraph (ordres de vitesse/manœuvre), VHF interne, téléphone, annonces PA. En manœuvre : communication continue obligatoire. Le chef mécanicien doit être notifié de toute manœuvre importante. Défaillance de communication = cause d'accident (Sewol, 2014)."},
    {q:"Qu'est-ce que les 'auxiliary engines' (moteurs auxiliaires) ?",opts:["Les moteurs de secours uniquement","Moteurs diesel 4 temps entraînant les génératrices électriques — fournissent l'électricité à bord","Les moteurs des pompes","Les moteurs du treuil"],correct:1,expl:"Moteurs auxiliaires = moteurs diesel 4 temps (500-1500 RPM) entraînant les alternateurs. Vitesse plus élevée que le moteur principal → besoin d'un réducteur si propulsion électrique. Surveillance quart machine : démarrage, arrêt, couplage/découplage. Toujours 2+ moteurs auxiliaires à bord (SOLAS)."},
    {q:"Qu'est-ce que le 'duty engineer' (officier de permanence) en mode UMS ?",opts:["Le chef mécanicien uniquement","Officier machine de permanence en dehors des heures de quart — disponible 24h/24 en mode UMS, répond aux alarmes dans les 3 minutes","Le technicien de maintenance","L'électricien de bord"],correct:1,expl:"Duty engineer = officier machine de permanence en mode UMS (nuit généralement). Doit être joignable en permanence et répondre aux alarmes dans les 3 minutes. Chambre de permanence équipée d'un répétiteur d'alarmes. Si pas de réponse : alarme transmise à la passerelle automatiquement."},
    {q:"Qu'est-ce que le 'fuel oil management' à bord ?",opts:["Le plan de route carburant","Gestion complète du carburant : surveillance des citernes, calculs de consommation, planification des soutages, conformité MARPOL","La maintenance des pompes","Le registre des achats de carburant"],correct:1,expl:"Fuel oil management = gestion totale du carburant. Inclut : relevé quotidien des citernes (sounding), calcul de consommation, prévision d'autonomie, organisation des soutages (bunkering), vérification conformité SOx/MARPOL (BDN), chauffage HFO, purification. Responsabilité du chef mécanicien."},
    {q:"Qu'est-ce que la 'critical equipment list' (liste des équipements critiques) ?",opts:["La liste des équipements les plus chers","Liste des équipements dont la défaillance affecte la sécurité du navire — maintenance prioritaire obligatoire","La liste des équipements à réparer","La liste des pièces de rechange"],correct:1,expl:"Critical equipment list = liste des équipements dont la panne met en danger la sécurité du navire : moteur principal, groupe de secours, pompes incendie, gouvernail, systèmes GMDSS. Ces équipements ont un programme de maintenance renforcé et des pièces de rechange obligatoires. Vérifiée par le PSC."},
    {q:"Qu'est-ce que le 'maneuvering mode' (mode manœuvre) ?",opts:["Un mode de navigation automatique","Mode actif lors des entrées/sorties de ports — officier machine en salle des machines en permanence, paramètres surveillés en continu, prêt à tout ordre de vitesse immédiat","Un mode d'économie de carburant","Un mode d'urgence"],correct:1,expl:"Maneuvering mode = mode d'alerte maximale en salle des machines. Actif lors des entrées/sorties de port, passages de canal, zones de trafic dense. Officier machine présent 24h/24 en salle (même en UMS). Réponse immédiate aux ordres telegraph. Chef mécanicien généralement présent."},
    {q:"Qu'est-ce que le 'LSA (Life Saving Appliances) weekly inspection' ?",opts:["Une inspection annuelle","Inspection hebdomadaire SOLAS des équipements de sauvetage — gilets, canots, radeaux, EPIRB, SART","Une inspection mensuelle","Une inspection avant chaque voyage"],correct:1,expl:"LSA weekly inspection = inspection hebdomadaire des équipements de sauvetage (SOLAS). Vérification : état des gilets de sauvetage, fonctionnement des feux d'alarme, état des canots (treuils, moteur), déclenchement EPIRB/SART. Consignée dans le journal de bord. Déficiences consignées et corrigées immédiatement."},
    {q:"Qu'est-ce que le 'near miss report' (rapport de quasi-accident) ?",opts:["Un rapport d'accident grave","Document signalant un incident qui aurait pu causer un accident — culture de sécurité proactive","Un rapport météo","Un rapport financier"],correct:1,expl:"Near miss report = rapport de quasi-accident. Signale une situation dangereuse qui n'a pas causé de dommage mais qui aurait pu. Culture de sécurité ISM : encourager les rapports sans sanction. Permet d'identifier les risques AVANT l'accident. Analysé par le SMS (Safety Management System) pour amélioration continue."},
    {q:"Qu'est-ce que le 'emergency drill' (exercice d'urgence) en salle des machines ?",opts:["Un exercice de navigation","Simulation régulière de situations d'urgence (incendie, blackout, inondation) — SOLAS impose des exercices mensuels","Un exercice de maintenance","Un test des alarmes uniquement"],correct:1,expl:"Emergency drills en salle des machines (SOLAS) : exercices mensuels minimum. Scénarios : incendie en salle des machines, blackout complet, inondation, dead ship condition, arrêt d'urgence. Objectif : mémoriser les procédures + identifier les lacunes + améliorer le temps de réponse. Consignés dans le journal de bord."},
  ],
  en:[
    {q:"What is a 'handover' (watch handover)?",opts:["End of officer's contract","Procedure for transferring responsibility between watch officers: full briefing, engine log signature","Cargo transfer","A type of maneuver"],correct:1,expl:"Handover = watch transfer. Outgoing officer passes to incoming officer: machinery state, ongoing anomalies, current work, current parameters, special orders. Incoming officer must not sign the log if unresolved dangerous conditions exist."},
    {q:"What is STCW (Standards of Training, Certification and Watchkeeping)?",opts:["A type of seaworthiness certificate","IMO international convention defining training, certification and watch standards for all seafarers","A fire safety code","A type of maritime contract"],correct:1,expl:"STCW 1978, revised in 1995 and 2010 (Manila Amendments). Defines minimum qualifications for seafarers by function. Chapter III = engine officers. Requires: competency certificates, basic safety training (PSCRB, EFA, FPFF, BS), simulator training."},
    {q:"What is an 'inspection round' (patrol round) in the engine room?",opts:["A tourist visit","Systematic periodic inspection of all engine room equipment to detect anomalies","A safety drill","An administrative check"],correct:1,expl:"Inspection round = systematic engine room tour. Frequency: per ISM manual (usually every 30-60 minutes in UMS). Checks: levels, leaks, abnormal temperatures, unusual noises, alarms. Logged in engine log. Basis of all early damage detection."},
    {q:"What are 'chief engineer's standing orders'?",opts:["Route orders","Chief engineer's permanent written instructions to watch officers on procedures and alarm thresholds","The maintenance plan","The machinery budget"],correct:1,expl:"Chief engineer's standing orders = permanent written instructions. Content: when to call chief engineer, alarm thresholds, emergency procedures, maneuvering restrictions. Signed by each officer. Must be re-read at start of each contract."},
    {q:"What is a 'Planned Maintenance System' (PMS)?",opts:["Navigation software","Planned preventive maintenance system — equipment maintenance schedule based on operating hours or dates","A type of alarm","A monitoring system"],correct:1,expl:"PMS = Planned Maintenance System. Allows planning and tracking of all preventive maintenance work (oil changes, overhauls, inspections). Mandatory under ISM Code. Reduces unexpected breakdowns. PSC and classification audits check PMS."},
    {q:"What does 'dead ship condition' mean?",opts:["A sunken vessel","State of a vessel with no propulsion or electricity — all machinery stopped","A decommissioned vessel","A vessel in dry-dock"],correct:1,expl:"Dead ship condition = most critical state: no engines, no electricity, no services. Start-up procedure from zero: 1) Start emergency generator, 2) Restore main power, 3) Warm up main engine, 4) Start main engine. Mandatory STCW training."},
    {q:"What is 'bridge-engine room communication'?",opts:["An external radio system","Mandatory communication between bridge and engine room via telegraph, internal VHF and PA announcements","A type of automatic control","A navigation system"],correct:1,expl:"Bridge-engine room communication = essential for safety. Means: telegraph (speed/maneuvering orders), internal VHF, telephone, PA announcements. During maneuvering: continuous communication mandatory. Chief engineer must be notified of any major maneuver. Communication failure = accident cause (Sewol, 2014)."},
    {q:"What are 'auxiliary engines'?",opts:["Backup engines only","4-stroke diesel engines driving electrical generators — provide power on board","Pump motors","Winch motors"],correct:1,expl:"Auxiliary engines = 4-stroke diesel engines (500-1500 RPM) driving alternators. Higher speed than main engine → gearbox needed if electric propulsion. Engine watch monitoring: starting, stopping, parallel coupling/uncoupling. Always 2+ auxiliary engines on board (SOLAS)."},
    {q:"What is the 'duty engineer' in UMS mode?",opts:["Chief engineer only","Engine officer on call outside watch hours — available 24/7 in UMS mode, responds to alarms within 3 minutes","Maintenance technician","Ship's electrician"],correct:1,expl:"Duty engineer = standby engine officer in UMS mode (usually at night). Must be reachable at all times and respond to alarms within 3 minutes. Standby cabin equipped with alarm repeater. If no response: alarm automatically transmitted to bridge."},
    {q:"What is 'fuel oil management' on board?",opts:["The fuel route plan","Complete fuel management: tank monitoring, consumption calculations, bunkering planning, MARPOL compliance","Pump maintenance","Fuel purchase records"],correct:1,expl:"Fuel oil management = total fuel management. Includes: daily tank readings (sounding), consumption calculation, autonomy forecast, bunkering organization, SOx/MARPOL compliance (BDN), HFO heating, purification. Chief engineer's responsibility."},
    {q:"What is the 'critical equipment list'?",opts:["List of most expensive equipment","List of equipment whose failure affects vessel safety — priority mandatory maintenance","List of equipment to repair","List of spare parts"],correct:1,expl:"Critical equipment list = equipment whose failure endangers vessel safety: main engine, emergency generator, fire pumps, rudder, GMDSS systems. These have enhanced maintenance programs and mandatory spare parts. Checked by PSC."},
    {q:"What is 'maneuvering mode'?",opts:["An automatic navigation mode","Mode active during port entries/exits — engine officer permanently in engine room, continuous parameter monitoring, ready for any immediate speed order","A fuel saving mode","An emergency mode"],correct:1,expl:"Maneuvering mode = maximum engine room alertness. Active during port entries/exits, canal passages, dense traffic areas. Engine officer present 24/7 (even in UMS). Immediate response to telegraph orders. Chief engineer usually present."},
    {q:"What is the 'LSA weekly inspection'?",opts:["An annual inspection","SOLAS weekly inspection of life saving appliances — life jackets, lifeboats, liferafts, EPIRB, SART","A monthly inspection","A pre-voyage inspection"],correct:1,expl:"LSA weekly inspection = weekly inspection of life saving appliances (SOLAS). Check: life jacket condition, alarm light function, lifeboat condition (davits, engine), EPIRB/SART activation. Logged in ship's log. Deficiencies noted and corrected immediately."},
    {q:"What is a 'near miss report'?",opts:["A serious accident report","Document reporting an incident that could have caused an accident — proactive safety culture","A weather report","A financial report"],correct:1,expl:"Near miss report = near-accident report. Reports a dangerous situation that caused no damage but could have. ISM safety culture: encourage reports without penalty. Identifies risks BEFORE an accident occurs. Analyzed by SMS for continuous improvement."},
    {q:"What is an 'emergency drill' in the engine room?",opts:["A navigation exercise","Regular simulation of emergency situations (fire, blackout, flooding) — SOLAS requires monthly drills","A maintenance exercise","An alarm test only"],correct:1,expl:"Engine room emergency drills (SOLAS): monthly minimum. Scenarios: engine room fire, complete blackout, flooding, dead ship condition, emergency stop. Objective: memorize procedures + identify gaps + improve response time. Logged in ship's log."},
  ],
  es:[
    {q:"¿Qué es el 'handover' (traspaso de guardia)?",opts:["El fin del contrato del oficial","Procedimiento de transferencia de responsabilidad entre oficiales de guardia: briefing completo, firma del diario de máquinas","El traspaso de la carga","Un tipo de maniobra"],correct:1,expl:"Handover = traspaso de guardia. El oficial saliente transmite al entrante: estado de las máquinas, anomalías en curso, trabajos en curso, parámetros actuales, órdenes especiales. El oficial entrante no debe firmar si existen condiciones peligrosas no resueltas."},
    {q:"¿Qué es STCW?",opts:["Un tipo de certificado de navegabilidad","Convenio internacional de la OMI que define las normas de formación, certificación y guardia para todos los marineros","Un código de seguridad contra incendios","Un tipo de contrato marítimo"],correct:1,expl:"STCW 1978, revisado en 1995 y 2010 (Enmiendas de Manila). Define las cualificaciones mínimas para los marineros según sus funciones. Capítulo III = oficiales de máquinas. Exige: certificados de competencia, formación básica de seguridad, entrenamiento en simuladores."},
    {q:"¿Qué es una 'ronda de inspección' en la sala de máquinas?",opts:["Una visita turística","Inspección periódica sistemática de todos los equipos de la sala de máquinas para detectar anomalías","Un ejercicio de seguridad","Una verificación administrativa"],correct:1,expl:"Ronda de inspección = recorrido sistemático de la sala de máquinas. Frecuencia: según manual ISM (generalmente cada 30-60 minutos en UMS). Verifica: niveles, fugas, temperaturas anómalas, ruidos inusuales, alarmas. Registrada en el diario de máquinas."},
    {q:"¿Qué son las 'órdenes permanentes del jefe de máquinas'?",opts:["Las órdenes de ruta","Instrucciones permanentes escritas del jefe de máquinas a sus oficiales de guardia sobre procedimientos y umbrales de alarma","El plan de mantenimiento","El presupuesto de máquinas"],correct:1,expl:"Órdenes permanentes = instrucciones escritas permanentes. Contenido: cuándo llamar al jefe de máquinas, umbrales de alarma, procedimientos de emergencia, restricciones de maniobra. Firmadas por cada oficial. Deben releerse al inicio de cada contrato."},
    {q:"¿Qué es el PMS (Sistema de Mantenimiento Planificado)?",opts:["Un software de navegación","Sistema de mantenimiento preventivo planificado — calendario de mantenimiento de equipos según horas de funcionamiento o fechas","Un tipo de alarma","Un sistema de vigilancia"],correct:1,expl:"PMS = Sistema de Mantenimiento Planificado. Permite planificar y registrar todos los trabajos de mantenimiento preventivo. Obligatorio en el marco del Código ISM. Reduce las averías imprevistas. El PSC y la clasificación verifican el PMS."},
    {q:"¿Qué significa 'dead ship condition'?",opts:["Un buque hundido","Estado de un buque sin propulsión ni electricidad — todas las máquinas paradas","Un buque desguazado","Un buque en dique seco"],correct:1,expl:"Dead ship condition = estado más crítico: sin motores, sin electricidad, sin servicios. Procedimiento de arranque desde cero: 1) Arrancar grupo de emergencia, 2) Restablecer electricidad principal, 3) Calentar motor principal, 4) Arrancar motor principal. Formación STCW obligatoria."},
    {q:"¿Qué es la 'comunicación puente-sala de máquinas'?",opts:["Un sistema de radio externo","Comunicación obligatoria entre el puente y la sala de máquinas mediante telégrafo, VHF interno y anuncios PA","Un tipo de control automático","Un sistema de navegación"],correct:1,expl:"Comunicación puente-máquinas = esencial para la seguridad. Medios: telégrafo (órdenes de velocidad/maniobra), VHF interno, teléfono, anuncios PA. En maniobra: comunicación continua obligatoria. El jefe de máquinas debe ser notificado de cualquier maniobra importante."},
    {q:"¿Qué son los 'motores auxiliares'?",opts:["Solo los motores de emergencia","Motores diesel de 4 tiempos que accionan los generadores eléctricos — proporcionan la electricidad a bordo","Los motores de las bombas","Los motores del cabrestante"],correct:1,expl:"Motores auxiliares = motores diesel de 4 tiempos (500-1500 RPM) que accionan los alternadores. Velocidad más alta que el motor principal. Guardia de máquinas: arranque, parada, acoplamiento/desacoplamiento. Siempre 2+ motores auxiliares a bordo (SOLAS)."},
    {q:"¿Qué es el 'oficial de guardia' en modo UMS?",opts:["Solo el jefe de máquinas","Oficial de máquinas de guardia fuera de las horas de quart — disponible 24h/24 en modo UMS, responde a las alarmas en 3 minutos","El técnico de mantenimiento","El electricista de a bordo"],correct:1,expl:"Oficial de guardia = oficial de máquinas de permanencia en modo UMS (generalmente de noche). Debe estar localizable en todo momento y responder a las alarmas en 3 minutos. Camarote de guardia equipado con repetidor de alarmas. Si no hay respuesta: alarma transmitida automáticamente al puente."},
    {q:"¿Qué es la 'gestión del combustible' a bordo?",opts:["El plan de ruta del combustible","Gestión completa del combustible: vigilancia de tanques, cálculos de consumo, planificación de aprovisionamientos, conformidad MARPOL","El mantenimiento de las bombas","El registro de compras de combustible"],correct:1,expl:"Gestión del combustible = gestión total. Incluye: lecturas diarias de tanques (sounding), cálculo de consumo, previsión de autonomía, organización de aprovisionamientos (bunkering), verificación conformidad SOx/MARPOL (BDN), calefacción HFO, purificación. Responsabilidad del jefe de máquinas."},
    {q:"¿Qué es la 'lista de equipos críticos'?",opts:["La lista de los equipos más caros","Lista de equipos cuya avería afecta a la seguridad del buque — mantenimiento prioritario obligatorio","La lista de equipos a reparar","La lista de repuestos"],correct:1,expl:"Lista de equipos críticos = equipos cuya avería pone en peligro la seguridad: motor principal, grupo de emergencia, bombas contraincendios, timón, sistemas GMDSS. Tienen programa de mantenimiento reforzado y repuestos obligatorios. Verificada por el PSC."},
    {q:"¿Qué es el 'modo de maniobra'?",opts:["Un modo de navegación automática","Modo activo durante las entradas/salidas de puertos — oficial de máquinas permanentemente en la sala, parámetros monitorizados continuamente, listo para cualquier orden de velocidad inmediata","Un modo de ahorro de combustible","Un modo de emergencia"],correct:1,expl:"Modo de maniobra = máxima alerta en sala de máquinas. Activo en entradas/salidas de puerto, paso de canales, zonas de tráfico denso. Oficial de máquinas presente 24h/24. Respuesta inmediata a órdenes del telégrafo. Jefe de máquinas generalmente presente."},
    {q:"¿Qué es la 'inspección semanal LSA'?",opts:["Una inspección anual","Inspección semanal SOLAS de los equipos de salvamento — chalecos, botes, balsas, EPIRB, SART","Una inspección mensual","Una inspección previa al viaje"],correct:1,expl:"Inspección semanal LSA = inspección semanal de los equipos de salvamento (SOLAS). Verificación: estado de los chalecos, funcionamiento de las luces de alarma, estado de los botes (pescantes, motor), activación EPIRB/SART. Registrada en el cuaderno de bitácora."},
    {q:"¿Qué es un 'informe de casi accidente' (near miss report)?",opts:["Un informe de accidente grave","Documento que notifica un incidente que podría haber causado un accidente — cultura de seguridad proactiva","Un informe meteorológico","Un informe financiero"],correct:1,expl:"Near miss report = informe de casi accidente. Notifica una situación peligrosa que no causó daño pero podría haberlo causado. Cultura de seguridad ISM: fomentar los informes sin sanción. Permite identificar los riesgos ANTES del accidente. Analizado por el SMS para mejora continua."},
    {q:"¿Qué es un 'simulacro de emergencia' en la sala de máquinas?",opts:["Un ejercicio de navegación","Simulación regular de situaciones de emergencia (incendio, apagón, inundación) — SOLAS exige simulacros mensuales","Un ejercicio de mantenimiento","Solo un test de alarmas"],correct:1,expl:"Simulacros de emergencia en sala de máquinas (SOLAS): mínimo mensuales. Escenarios: incendio en sala de máquinas, apagón completo, inundación, dead ship condition, parada de emergencia. Objetivo: memorizar procedimientos + identificar lagunas + mejorar el tiempo de respuesta."},
  ],
  pt:[
    {q:"O que é um 'handover' (passagem de quarto)?",opts:["O fim do contrato do oficial","Procedimento de transferência de responsabilidade entre oficiais de quarto: briefing completo, assinatura do diário de máquinas","A transferência de carga","Um tipo de manobra"],correct:1,expl:"Handover = passagem de quarto. O oficial cessante transmite ao entrante: estado das máquinas, anomalias em curso, trabalhos em curso, parâmetros atuais, ordens especiais. O oficial entrante não deve assinar se existirem condições perigosas não resolvidas."},
    {q:"O que é o STCW?",opts:["Um tipo de certificado de navegabilidade","Convenção internacional da IMO que define as normas de formação, certificação e quarto para todos os marinheiros","Um código de segurança contra incêndios","Um tipo de contrato marítimo"],correct:1,expl:"STCW 1978, revisto em 1995 e 2010 (Emendas de Manila). Define as qualificações mínimas para os marinheiros por função. Capítulo III = oficiais de máquinas. Exige: certificados de competência, formação básica de segurança, treino em simuladores."},
    {q:"O que é uma 'ronda de inspeção' na sala de máquinas?",opts:["Uma visita turística","Inspeção periódica sistemática de todos os equipamentos da sala de máquinas para detetar anomalias","Um exercício de segurança","Uma verificação administrativa"],correct:1,expl:"Ronda de inspeção = percurso sistemático da sala de máquinas. Frequência: segundo manual ISM (geralmente a cada 30-60 minutos em UMS). Verifica: níveis, fugas, temperaturas anómalas, ruídos incomuns, alarmes. Registada no diário de máquinas."},
    {q:"O que são as 'ordens permanentes do chefe de máquinas'?",opts:["As ordens de rota","Instruções permanentes escritas do chefe de máquinas aos seus oficiais de quarto sobre procedimentos e limiares de alarme","O plano de manutenção","O orçamento de máquinas"],correct:1,expl:"Ordens permanentes = instruções escritas permanentes. Conteúdo: quando chamar o chefe de máquinas, limiares de alarme, procedimentos de emergência, restrições de manobra. Assinadas por cada oficial. Devem ser relidas no início de cada contrato."},
    {q:"O que é um PMS (Sistema de Manutenção Planeada)?",opts:["Um software de navegação","Sistema de manutenção preventiva planeada — calendário de manutenção de equipamentos segundo as horas de funcionamento ou datas","Um tipo de alarme","Um sistema de monitorização"],correct:1,expl:"PMS = Sistema de Manutenção Planeada. Permite planear e registar todos os trabalhos de manutenção preventiva. Obrigatório no âmbito do Código ISM. Reduz avarias imprevistas. O PSC e a classificação verificam o PMS."},
    {q:"O que significa 'dead ship condition'?",opts:["Um navio afundado","Estado de um navio sem propulsão nem eletricidade — todas as máquinas paradas","Um navio desativado","Um navio em dique seco"],correct:1,expl:"Dead ship condition = estado mais crítico: sem motores, sem eletricidade, sem serviços. Procedimento de arranque do zero: 1) Arrancar grupo de emergência, 2) Restabelecer eletricidade principal, 3) Aquecer motor principal, 4) Arrancar motor principal. Formação STCW obrigatória."},
    {q:"O que é a 'comunicação ponte-sala de máquinas'?",opts:["Um sistema de rádio externo","Comunicação obrigatória entre a ponte e a sala de máquinas por telégrafo, VHF interno e anúncios PA","Um tipo de controlo automático","Um sistema de navegação"],correct:1,expl:"Comunicação ponte-máquinas = essencial para a segurança. Meios: telégrafo (ordens de velocidade/manobra), VHF interno, telefone, anúncios PA. Em manobra: comunicação contínua obrigatória. O chefe de máquinas deve ser notificado de qualquer manobra importante."},
    {q:"O que são os 'motores auxiliares'?",opts:["Apenas os motores de emergência","Motores diesel de 4 tempos que acionam os geradores elétricos — fornecem a eletricidade a bordo","Os motores das bombas","Os motores do guindaste"],correct:1,expl:"Motores auxiliares = motores diesel de 4 tempos (500-1500 RPM) que acionam os alternadores. Velocidade mais alta que o motor principal. Quarto de máquinas: arranque, paragem, acoplamento/desacoplamento. Sempre 2+ motores auxiliares a bordo (SOLAS)."},
    {q:"O que é o 'oficial de serviço' no modo UMS?",opts:["Apenas o chefe de máquinas","Oficial de máquinas de serviço fora das horas de quarto — disponível 24h/24 no modo UMS, responde aos alarmes em 3 minutos","O técnico de manutenção","O eletricista de bordo"],correct:1,expl:"Oficial de serviço = oficial de máquinas de permanência no modo UMS (geralmente à noite). Deve estar acessível a qualquer momento e responder aos alarmes em 3 minutos. Camarote de serviço equipado com repetidor de alarmes. Se não houver resposta: alarme transmitido automaticamente à ponte."},
    {q:"O que é a 'gestão de combustível' a bordo?",opts:["O plano de rota do combustível","Gestão completa do combustível: monitorização dos tanques, cálculos de consumo, planeamento de abastecimentos, conformidade MARPOL","A manutenção das bombas","O registo de compras de combustível"],correct:1,expl:"Gestão de combustível = gestão total. Inclui: leituras diárias dos tanques (sounding), cálculo de consumo, previsão de autonomia, organização de abastecimentos (bunkering), verificação conformidade SOx/MARPOL (BDN), aquecimento HFO, purificação. Responsabilidade do chefe de máquinas."},
    {q:"O que é a 'lista de equipamentos críticos'?",opts:["A lista dos equipamentos mais caros","Lista de equipamentos cuja avaria afeta a segurança do navio — manutenção prioritária obrigatória","A lista de equipamentos a reparar","A lista de peças sobresselentes"],correct:1,expl:"Lista de equipamentos críticos = equipamentos cuja avaria coloca em perigo a segurança do navio: motor principal, grupo de emergência, bombas de incêndio, leme, sistemas GMDSS. Têm programa de manutenção reforçado e peças sobresselentes obrigatórias. Verificada pelo PSC."},
    {q:"O que é o 'modo de manobra'?",opts:["Um modo de navegação automática","Modo ativo durante entradas/saídas de portos — oficial de máquinas permanentemente na sala, parâmetros monitorizados continuamente, pronto para qualquer ordem de velocidade imediata","Um modo de economia de combustível","Um modo de emergência"],correct:1,expl:"Modo de manobra = alerta máxima na sala de máquinas. Ativo em entradas/saídas de porto, passagens de canal, zonas de tráfego denso. Oficial de máquinas presente 24h/24. Resposta imediata a ordens do telégrafo. Chefe de máquinas geralmente presente."},
    {q:"O que é a 'inspeção semanal LSA'?",opts:["Uma inspeção anual","Inspeção semanal SOLAS dos equipamentos de salvamento — coletes, botes, balsas, EPIRB, SART","Uma inspeção mensal","Uma inspeção antes de cada viagem"],correct:1,expl:"Inspeção semanal LSA = inspeção semanal dos equipamentos de salvamento (SOLAS). Verificação: estado dos coletes, funcionamento das luzes de alarme, estado dos botes (turcos, motor), ativação EPIRB/SART. Registada no diário de bordo."},
    {q:"O que é um 'relatório de quase acidente' (near miss report)?",opts:["Um relatório de acidente grave","Documento que reporta um incidente que poderia ter causado um acidente — cultura de segurança proativa","Um relatório meteorológico","Um relatório financeiro"],correct:1,expl:"Near miss report = relatório de quase acidente. Reporta uma situação perigosa que não causou dano mas poderia ter causado. Cultura de segurança ISM: encorajar os relatórios sem sanção. Permite identificar os riscos ANTES do acidente. Analisado pelo SMS para melhoria contínua."},
    {q:"O que é um 'exercício de emergência' na sala de máquinas?",opts:["Um exercício de navegação","Simulação regular de situações de emergência (incêndio, blackout, inundação) — SOLAS exige exercícios mensais","Um exercício de manutenção","Apenas um teste de alarmes"],correct:1,expl:"Exercícios de emergência na sala de máquinas (SOLAS): mínimo mensais. Cenários: incêndio na sala de máquinas, blackout completo, inundação, dead ship condition, paragem de emergência. Objetivo: memorizar procedimentos + identificar lacunas + melhorar o tempo de resposta."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue2},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Module Machine · Leçon 7/8 · ⭐ Premium · 200 XP",
      title:"Engine Watchkeeping — Quart en Salle des Machines",
      intro:"L'officier de quart machine est les yeux et les oreilles du navire sous la flottaison. Sa vigilance permanente est ce qui distingue un voyage sûr d'une catastrophe.\n\nCette leçon couvre le tableau de bord machine, le mode UMS, le journal machine, les procédures STCW et la gestion des alarmes.",
      p1:"PARTIE 1 — TABLEAU DE BORD TEMPS RÉEL",s1t:"Paramètres critiques en temps réel",
      s1:"PARAMÈTRES DU QUART :\nRPM moteur principal : 80-100 normal\nTempérature eau douce : 70-85°C\nPression huile : 3-5 bars\nNiveau carburant : > 20%\nRefroidissement : 65-87°C\nGaz d'échappement : 280-380°C\n\nRONDE D'INSPECTION (PATROL ROUND) :\nToutes les 30-60 minutes (UMS) ou continue\nVérifier : niveaux, fuites, bruit anormal\nConsigner dans le journal machine\n\nJOURNAL MACHINE :\nEntrée OBLIGATOIRE toutes les 4 heures\nSigné par l'officier de quart\nConservé 3 ans minimum",
      p2:"PARTIE 2 — PLANNING QUART (STCW)",s2t:"Rotation des officiers · Règles heures repos",
      s2:"ROTATION DES QUARTS :\n2ème mécanicien : 00-04h et 12-16h\n3ème mécanicien : 04-08h et 16-20h\n4ème mécanicien : 08-12h et 20-24h\nChef mécanicien : supervision permanente\n\nSTCW/MLC 2006 :\nMaximum 14h travail par 24h\nMinimum 10h repos par 24h\nMaximum 72h travail par semaine\nMinimum 77h repos par semaine\n\nJOURNAL DES HEURES :\nObligatoire · Signé officier + capitaine\nContrôlé par Port State Control",
      p3:"PARTIE 3 — MODE UMS",s3t:"Salle des machines sans surveillance",
      s3:"UMS = Unattended Machinery Space\nSalle des machines sans officier permanent\n\nCONDITIONS SOLAS POUR UMS :\n1. Système d'alarme centralisé FONCTIONNEL\n2. Officier de permanence (duty engineer) disponible\n3. Alarmes transmises cabines + passerelle\n4. Réponse dans les 3 minutes obligatoire\n\nAVANTAGES UMS :\nRéduit la fatigue de l'équipage la nuit\nPermis la nuit en navigation normale\n\n⚠️ UMS interdit en mode MANŒUVRE\n→ Officier OBLIGATOIREMENT en salle des machines\n→ Entrées/sorties ports · zones trafic · canaux",
      p4:"PARTIE 4 — JOURNAL MACHINE",s4t:"Simulateur de journal machine",
      s4:"JOURNAL MACHINE (ENGINE LOG) :\nDocument légal officiel\nEntrée minimum toutes les 4 heures\n\nCONTENU OBLIGATOIRE :\n→ Paramètres : RPM, températures, pressions\n→ Événements : alarmes, pannes, travaux\n→ Prise et fin de quart\n→ Soutages (bunkering)\n→ Transferts et rejets (ORB)\n\nSIGNATURES :\nOfficier de quart responsable\nChef mécanicien (hebdomadaire)\nCapitaine (hebdomadaire)\n\nCONSERVATION : 3 ans minimum\nFaux journal = crime maritime",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 7 MACHINE",
      sumP:["Journal machine : entrée toutes les 4h · signé · 3 ans","STCW/MLC : max 14h/jour · min 10h repos/24h","UMS : alarme centralisée · duty engineer < 3 min","Mode manœuvre : officier OBLIGATOIRE en salle","Handover : briefing complet avant prise de quart","Ronde inspection : 30-60 min en UMS","Near miss report : culture de sécurité ISM","Emergency drill : mensuel SOLAS"],
      learnedP:["Journal machine 4h · STCW 10h repos min","UMS : duty engineer 3 min · alarme centralisée","Mode manœuvre : présence obligatoire","Handover complet avant prise de quart","Near miss · emergency drill · PMS maintenance"],
    },
    en:{
      badge:"⚙️ Engine Module · Lesson 7/8 · ⭐ Premium · 200 XP",
      title:"Engine Watchkeeping — Engine Room Watch",
      intro:"The engine watch officer is the eyes and ears of the vessel below the waterline. Their continuous vigilance is what distinguishes a safe voyage from a catastrophe.\n\nThis lesson covers the engine dashboard, UMS mode, engine log, STCW procedures and alarm management.",
      p1:"PART 1 — REAL-TIME DASHBOARD",s1t:"Critical parameters in real time",
      s1:"WATCH PARAMETERS:\nMain engine RPM: 80-100 normal\nFresh water temperature: 70-85°C\nOil pressure: 3-5 bar\nFuel level: > 20%\nCooling: 65-87°C\nExhaust gas: 280-380°C\n\nINSPECTION ROUND (PATROL ROUND):\nEvery 30-60 minutes (UMS) or continuous\nCheck: levels, leaks, abnormal noise\nLog in engine log\n\nENGINE LOG:\nEntry MANDATORY every 4 hours\nSigned by watch officer\nKept minimum 3 years",
      p2:"PART 2 — WATCH SCHEDULE (STCW)",s2t:"Officer rotation · Rest hours rules",
      s2:"WATCH ROTATION:\n2nd engineer: 00-04h and 12-16h\n3rd engineer: 04-08h and 16-20h\n4th engineer: 08-12h and 20-24h\nChief engineer: permanent supervision\n\nSTCW/MLC 2006:\nMaximum 14h work per 24h\nMinimum 10h rest per 24h\nMaximum 72h work per week\nMinimum 77h rest per week\n\nHOURS LOG:\nMandatory · Signed officer + captain\nChecked by Port State Control",
      p3:"PART 3 — UMS MODE",s3t:"Unattended Machinery Space",
      s3:"UMS = Unattended Machinery Space\nEngine room without permanent officer\n\nSOLAS CONDITIONS FOR UMS:\n1. Centralized alarm system FUNCTIONAL\n2. Duty engineer available\n3. Alarms transmitted cabins + bridge\n4. Response within 3 minutes mandatory\n\nUMS ADVANTAGES:\nReduces crew fatigue at night\nPermitted at night in normal navigation\n\n⚠️ UMS PROHIBITED in MANEUVERING mode\n→ Officer MANDATORY in engine room\n→ Port entries/exits · traffic zones · canals",
      p4:"PART 4 — ENGINE LOG",s4t:"Engine log simulator",
      s4:"ENGINE LOG:\nOfficial legal document\nMinimum entry every 4 hours\n\nMANDATORY CONTENT:\n→ Parameters: RPM, temperatures, pressures\n→ Events: alarms, breakdowns, work\n→ Watch takeover and handover\n→ Bunkering\n→ Transfers and discharges (ORB)\n\nSIGNATURES:\nResponsible watch officer\nChief engineer (weekly)\nCaptain (weekly)\n\nRETENTION: minimum 3 years\nFalse log = maritime crime",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 7",
      sumP:["Engine log: entry every 4h · signed · 3 years","STCW/MLC: max 14h/day · min 10h rest/24h","UMS: centralized alarm · duty engineer < 3 min","Maneuvering mode: officer MANDATORY in engine room","Handover: full briefing before watch takeover","Inspection round: 30-60 min in UMS","Near miss report: ISM safety culture","Emergency drill: monthly SOLAS"],
      learnedP:["Engine log 4h · STCW min 10h rest","UMS: duty engineer 3 min · centralized alarm","Maneuvering mode: mandatory presence","Full handover before watch takeover","Near miss · emergency drill · PMS maintenance"],
    },
    es:{
      badge:"⚙️ Módulo Máquinas · Lección 7/8 · ⭐ Premium · 200 XP",
      title:"Engine Watchkeeping — Guardia en Sala de Máquinas",
      intro:"El oficial de guardia de máquinas es los ojos y oídos del buque bajo la línea de flotación. Su vigilancia permanente es lo que distingue un viaje seguro de una catástrofe.",
      p1:"PARTE 1 — CUADRO DE MANDO EN TIEMPO REAL",s1t:"Parámetros críticos en tiempo real",
      s1:"PARÁMETROS DE GUARDIA:\nRPM motor principal: 80-100 normal\nTemp. agua dulce: 70-85°C\nPresión aceite: 3-5 bar\nNivel combustible: > 20%\n\nRONDA DE INSPECCIÓN:\nCada 30-60 minutos (UMS) o continua\nDiario de máquinas: entrada cada 4 horas",
      p2:"PARTE 2 — PLANIFICACIÓN GUARDIA (STCW)",s2t:"Rotación oficiales · Reglas horas descanso",
      s2:"ROTACIÓN:\n2° maq.: 00-04h y 12-16h\n3° maq.: 04-08h y 16-20h\n4° maq.: 08-12h y 20-24h\n\nSTCW/MLC 2006:\nMáx 14h trabajo/24h · Mín 10h descanso/24h\nMáx 72h/semana · Mín 77h descanso/semana",
      p3:"PARTE 3 — MODO UMS",s3t:"Sala de máquinas sin vigilancia",
      s3:"UMS = Sala de Máquinas Sin Vigilancia\n\nCONDICIONES SOLAS:\n1. Sistema alarma centralizado FUNCIONAL\n2. Oficial de guardia disponible\n3. Alarmas transmitidas camarotes + puente\n4. Respuesta en 3 minutos obligatoria\n\n⚠️ UMS PROHIBIDO en modo MANIOBRA",
      p4:"PARTE 4 — DIARIO DE MÁQUINAS",s4t:"Simulador de diario de máquinas",
      s4:"DIARIO DE MÁQUINAS:\nEntrada mínimo cada 4 horas · Firmado\nConservación: 3 años mínimo\nDiario falso = delito marítimo",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 7 MÁQUINAS",
      sumP:["Diario máquinas: entrada cada 4h · firmado · 3 años","STCW/MLC: máx 14h/día · mín 10h descanso/24h","UMS: alarma centralizada · oficial guardia < 3 min","Modo maniobra: oficial OBLIGATORIO en sala","Handover: briefing completo antes de la guardia","Ronda inspección: 30-60 min en UMS","Near miss report: cultura seguridad ISM","Emergency drill: mensual SOLAS"],
      learnedP:["Diario máquinas 4h · STCW mín 10h descanso","UMS: oficial guardia 3 min · alarma centralizada","Modo maniobra: presencia obligatoria","Handover completo antes de la guardia"],
    },
    pt:{
      badge:"⚙️ Módulo Máquinas · Lição 7/8 · ⭐ Premium · 200 XP",
      title:"Engine Watchkeeping — Quarto na Sala de Máquinas",
      intro:"O oficial de quarto de máquinas é os olhos e ouvidos do navio abaixo da linha de flutuação. A sua vigilância permanente é o que distingue uma viagem segura de uma catástrofe.",
      p1:"PARTE 1 — PAINEL EM TEMPO REAL",s1t:"Parâmetros críticos em tempo real",
      s1:"PARÂMETROS DE QUARTO:\nRPM motor principal: 80-100 normal\nTemp. água doce: 70-85°C\nPressão óleo: 3-5 bar\nNível combustível: > 20%\n\nRONDA DE INSPEÇÃO:\nA cada 30-60 minutos (UMS) ou contínua\nDiário de máquinas: entrada a cada 4 horas",
      p2:"PARTE 2 — PLANIFICAÇÃO QUARTO (STCW)",s2t:"Rotação oficiais · Regras horas descanso",
      s2:"ROTAÇÃO:\n2° máq.: 00-04h e 12-16h\n3° máq.: 04-08h e 16-20h\n4° máq.: 08-12h e 20-24h\n\nSTCW/MLC 2006:\nMáx 14h trabalho/24h · Mín 10h descanso/24h\nMáx 72h/semana · Mín 77h descanso/semana",
      p3:"PARTE 3 — MODO UMS",s3t:"Sala de máquinas sem vigilância",
      s3:"UMS = Sala de Máquinas Sem Vigilância\n\nCONDIÇÕES SOLAS:\n1. Sistema alarme centralizado FUNCIONAL\n2. Oficial de serviço disponível\n3. Alarmes transmitidos camarotes + ponte\n4. Resposta em 3 minutos obrigatória\n\n⚠️ UMS PROIBIDO em modo MANOBRA",
      p4:"PARTE 4 — DIÁRIO DE MÁQUINAS",s4t:"Simulador de diário de máquinas",
      s4:"DIÁRIO DE MÁQUINAS:\nEntrada mínimo a cada 4 horas · Assinado\nConservação: 3 anos mínimo\nDiário falso = crime marítimo",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 7 MÁQUINAS",
      sumP:["Diário máquinas: entrada cada 4h · assinado · 3 anos","STCW/MLC: máx 14h/dia · mín 10h descanso/24h","UMS: alarme centralizado · oficial serviço < 3 min","Modo manobra: oficial OBRIGATÓRIO na sala","Handover: briefing completo antes do quarto","Ronda inspeção: 30-60 min em UMS","Near miss report: cultura segurança ISM","Emergency drill: mensal SOLAS"],
      learnedP:["Diário máquinas 4h · STCW mín 10h descanso","UMS: oficial serviço 3 min · alarme centralizado","Modo manobra: presença obrigatória","Handover completo antes do quarto"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonWatchkeeping({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#050a1a 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.gold}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚙️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/8":lang==="en"?"Lesson 7/8":lang==="es"?"Lección 7/8":"Lição 7/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.gold2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.gold},${C.orange},${C.blue2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.gold}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="📊" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"TABLEAU DE BORD — TEMPS RÉEL":lang==="en"?"DASHBOARD — REAL TIME":lang==="es"?"CUADRO DE MANDO — TIEMPO REAL":"PAINEL — TEMPO REAL"}</div>
              <DashboardSVG lang={lang}/>
            </Card>

            <SL icon="🕐" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🕐 {lang==="fr"?"PLANNING QUART (STCW)":lang==="en"?"WATCH SCHEDULE (STCW)":lang==="es"?"PLANIFICACIÓN GUARDIA (STCW)":"PLANEAMENTO QUARTO (STCW)"}</div>
              <WatchScheduleSVG lang={lang}/>
            </Card>

            <SL icon="🤖" text={lc.p3} color={C.gold}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🤖 {lang==="fr"?"SIMULATEUR UMS":lang==="en"?"UMS SIMULATOR":lang==="es"?"SIMULADOR UMS":"SIMULADOR UMS"}</div>
              <UMSAlarmSVG lang={lang}/>
            </Card>

            <SL icon="📋" text={lc.p4} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📋 {lang==="fr"?"JOURNAL MACHINE — SIMULATEUR":lang==="en"?"ENGINE LOG — SIMULATOR":lang==="es"?"DIARIO MÁQUINAS — SIMULADOR":"DIÁRIO MÁQUINAS — SIMULADOR"}</div>
              <EngineLogSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(201,146,42,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Engine Watchkeeping":lang==="en"?"Quiz — Engine Watchkeeping":lang==="es"?"Quiz — Guardia de Máquinas":"Quiz — Quarto de Máquinas"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 7":lang==="en"?"Lesson 7":lang==="es"?"Lección 7":"Lição 7"}</div>
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
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.orange})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(201,146,42,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 8 — MAINTENANCE & AVARIES →":lang==="en"?"LESSON 8 — MAINTENANCE & BREAKDOWNS →":lang==="es"?"LECCIÓN 8 — MANTENIMIENTO & AVERÍAS →":"LIÇÃO 8 — MANUTENÇÃO & AVARIAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
