import { useState, useEffect, useRef } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  bg0:"#03070f", bg1:"#060e1a", bg2:"#0a1628", bg3:"#0d1f3c",
  cyan:"#00e5ff", cyan2:"#80deea",
  amber:"#ffb300", amber2:"#ffd54f",
  steel:"#546e7a", steel2:"#78909c",
  green:"#00e676", red:"#ff1744", orange:"#ff6d00",
  yellow:"#ffea00", purple:"#e040fb",
  muted:"rgba(240,244,255,0.45)", white:"#f0f4ff",
  border:"rgba(0,229,255,0.18)", borderA:"rgba(255,179,0,0.22)",
};

const lbl = (fr,en,es,pt) => {
  const lang = (typeof window !== "undefined" && window.__MAP_LANG__) || "fr";
  return {fr,en,es,pt}[lang]||fr;
};

// ─────────────────────────────────────────────
//  SVG 1 — ARCHITECTURE AMS
// ─────────────────────────────────────────────
function AMSArchSVG() {
  const [selected, setSelected] = useState(null);
  const [flow, setFlow] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFlow(f => (f+1)%12), 200);
    return () => clearInterval(t);
  }, []);

  const W = 340; const H = 240;

  const layers = [
    { id:"sensors", y:190, label:lbl("CAPTEURS TERRAIN","FIELD SENSORS","SENSORES CAMPO","SENSORES CAMPO"),
      color:C.steel2, nodes:[
        {x:30,label:"PT"},{x:85,label:"TT"},{x:140,label:"LT"},
        {x:195,label:"FT"},{x:250,label:"VT"},{x:305,label:"OMD"},
      ],
      desc:lbl("Capteurs 4-20mA : pression (PT), température (TT), niveau (LT), débit (FT), vibration (VT), détecteur brouillard huile (OMD)",
        "4-20mA sensors: pressure (PT), temperature (TT), level (LT), flow (FT), vibration (VT), oil mist detector (OMD)",
        "Sensores 4-20mA: presion (PT), temperatura (TT), nivel (LT), caudal (FT), vibracion (VT), detector niebla aceite (OMD)",
        "Sensores 4-20mA: pressao (PT), temperatura (TT), nivel (LT), fluxo (FT), vibracao (VT), detector nevoa oleo (OMD)")
    },
    { id:"acq", y:135, label:lbl("ACQUISITION","DATA ACQUISITION","ADQUISICION","AQUISICAO"),
      color:C.cyan, nodes:[{x:85,label:"I/O\nMOD"},{x:170,label:"I/O\nMOD"},{x:255,label:"I/O\nMOD"}],
      desc:lbl("Modules I/O convertissent les signaux analogiques en données numériques. Redondance N+1 obligatoire (SOLAS).",
        "I/O modules convert analog signals to digital data. N+1 redundancy mandatory (SOLAS).",
        "Modulos I/O convierten senales analogicas en datos digitales. Redundancia N+1 obligatoria (SOLAS).",
        "Modulos I/O convertem sinais analogicos em dados digitais. Redundancia N+1 obrigatoria (SOLAS).")
    },
    { id:"ams", y:80, label:"AMS CENTRALE",
      color:C.amber, nodes:[{x:170,label:"AMS\nCPU"}],
      desc:lbl("Centrale AMS : traitement alarmes, historique, comparaison aux seuils. CPU redondant avec basculement automatique en < 100ms.",
        "AMS central unit: alarm processing, history, threshold comparison. Redundant CPU with automatic switchover in < 100ms.",
        "Unidad central AMS: procesamiento de alarmas, historial, comparacion con umbrales. CPU redundante con conmutacion automatica en < 100ms.",
        "Unidade central AMS: processamento de alarmes, historico, comparacao com limiares. CPU redundante com comutacao automatica em < 100ms.")
    },
    { id:"hmi", y:25, label:lbl("INTERFACES","HMI INTERFACES","INTERFACES HMI","INTERFACES HMI"),
      color:C.green, nodes:[
        {x:60,label:"ECR\nPANEL"},{x:170,label:"BRIDGE\nALARM"},{x:280,label:"MOBILE\nACK"},
      ],
      desc:lbl("Interfaces opérateur : panneau ECR (salle de contrôle machine), alarme passerelle (SOLAS II-1/51), acquittement mobile.",
        "Operator interfaces: ECR panel (engine control room), bridge alarm (SOLAS II-1/51), mobile acknowledgment.",
        "Interfaces operador: panel ECR (sala de control maquinas), alarma puente (SOLAS II-1/51), acuse movil.",
        "Interfaces operador: painel ECR (sala de controle maquinas), alarme ponte (SOLAS II-1/51), acuse movel.")
    },
  ];

  const getNodePos = (layer, node) => ({ x: node.x, y: layer.y });

  const connections = [
    {x1:30,y1:190,x2:85,y2:135},{x1:85,y1:190,x2:85,y2:135},
    {x1:140,y1:190,x2:170,y2:135},{x1:195,y1:190,x2:170,y2:135},
    {x1:250,y1:190,x2:255,y2:135},{x1:305,y1:190,x2:255,y2:135},
    {x1:85,y1:135,x2:170,y2:80},{x1:170,y1:135,x2:170,y2:80},{x1:255,y1:135,x2:170,y2:80},
    {x1:170,y1:80,x2:60,y2:25},{x1:170,y1:80,x2:170,y2:25},{x1:170,y1:80,x2:280,y2:25},
  ];

  const selLayer = layers.find(l=>l.id===selected);

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid ${C.border}`}}>
      <div style={{color:C.cyan,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ AMS — {lbl("ARCHITECTURE SYSTEME","SYSTEM ARCHITECTURE","ARQUITECTURA SISTEMA","ARQUITETURA SISTEMA")}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="10"/>
        {/* connexions animées */}
        {connections.map((c,i) => {
          const active = flow === (i % 12);
          return (
            <g key={i}>
              <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="rgba(0,229,255,0.1)" strokeWidth="1.5"/>
              {active && (
                <circle r="3" fill={C.cyan} opacity="0.8">
                  <animateMotion dur="0.8s" repeatCount="1"
                    path={`M${c.x1},${c.y1} L${c.x2},${c.y2}`}/>
                </circle>
              )}
            </g>
          );
        })}
        {/* layers */}
        {layers.map(layer => (
          <g key={layer.id} onClick={()=>setSelected(selected===layer.id?null:layer.id)}
            style={{cursor:"pointer"}}>
            {/* label layer */}
            <text x={2} y={layer.y+4} fontSize="6" fill={layer.color} fontFamily="Courier New"
              letterSpacing="0.5" writingMode="horizontal-tb">{layer.label}</text>
            {/* nodes */}
            {layer.nodes.map((node,ni) => (
              <g key={ni}>
                <rect x={node.x-18} y={layer.y-14} width={36} height={26} rx="4"
                  fill={selected===layer.id?`${layer.color}22`:`${layer.color}0a`}
                  stroke={selected===layer.id?layer.color:`${layer.color}55`} strokeWidth="1.5"/>
                {node.label.split("\n").map((line,li) => (
                  <text key={li} x={node.x} y={layer.y-4+li*9}
                    textAnchor="middle" fontSize="6.5" fill={selected===layer.id?layer.color:C.muted}
                    fontFamily="Courier New" fontWeight="700">{line}</text>
                ))}
              </g>
            ))}
          </g>
        ))}
        {/* legende */}
        <text x={W/2} y={H-4} textAnchor="middle" fontSize="7" fill={C.steel2}>
          {lbl("Toucher un niveau pour les détails","Tap a layer for details","Toque un nivel para detalles","Toque um nivel para detalhes")}
        </text>
      </svg>
      {selLayer ? (
        <div style={{marginTop:8,padding:"8px 10px",background:`${selLayer.color}0f`,
          border:`1px solid ${selLayer.color}44`,borderRadius:8}}>
          <div style={{color:selLayer.color,fontFamily:"Courier New",fontSize:10,marginBottom:4}}>
            {selLayer.label}
          </div>
          <div style={{color:C.muted,fontSize:11,lineHeight:1.5}}>{selLayer.desc}</div>
        </div>
      ) : (
        <div style={{marginTop:8,padding:"6px 10px",background:"rgba(0,229,255,0.05)",
          border:`1px solid ${C.border}`,borderRadius:8,fontSize:10,color:C.steel2,textAlign:"center"}}>
          {lbl("4 niveaux : Capteurs → I/O → AMS CPU → Interfaces","4 layers: Sensors → I/O → AMS CPU → Interfaces","4 niveles: Sensores → I/O → CPU AMS → Interfaces","4 niveis: Sensores → I/O → CPU AMS → Interfaces")}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SVG 2 — PANNEAU ALARMES INTERACTIF
// ─────────────────────────────────────────────
function AlarmPanelSVG() {
  const initAlarms = [
    {id:"A001",tag:"LO-LUB-PRESS",desc:lbl("Basse pression huile lubrif.","Lo lube oil pressure","Baja presion aceite lubric.","Baixa pressao oleo lubric."),
      priority:1,value:"1.2 bar",limit:"< 1.5",acked:false,active:true,time:"10:42:15",color:C.red},
    {id:"A002",tag:"HI-EXH-TEMP-1",desc:lbl("Haute temp. echappement cyl.1","Hi exhaust temp cyl.1","Alta temp. escape cil.1","Alta temp. escapamento cil.1"),
      priority:2,value:"398C",limit:"> 380",acked:false,active:true,time:"10:43:02",color:C.orange},
    {id:"A003",tag:"LO-FW-LEVEL",desc:lbl("Niveau bas eau douce exp.","Lo fresh water exp. level","Nivel bajo agua dulce exp.","Nivel baixo agua doce exp."),
      priority:2,value:"28%",limit:"< 30%",acked:true,active:true,time:"10:38:50",color:C.orange},
    {id:"A004",tag:"HI-LUB-TEMP",desc:lbl("Haute temp. huile lubrifiant","Hi lube oil temperature","Alta temp. aceite lubric.","Alta temp. oleo lubric."),
      priority:3,value:"72C",limit:"> 70",acked:false,active:true,time:"10:44:20",color:C.amber},
    {id:"A005",tag:"LO-AIR-PRESS",desc:lbl("Basse pression air démarrage","Lo starting air pressure","Baja presion aire arranque","Baixa pressao ar partida"),
      priority:3,value:"22 bar",limit:"< 25",acked:true,active:true,time:"10:40:11",color:C.amber},
    {id:"A006",tag:"FLT-FO-FILT",desc:lbl("Colmatage filtre fuel oil","FO filter clogging","Colmatacion filtro fuel oil","Colmatacao filtro fuel oil"),
      priority:4,value:"0.8 bar DP",limit:"> 0.7",acked:false,active:true,time:"10:45:33",color:C.yellow},
  ];

  const [alarms, setAlarms] = useState(initAlarms);
  const [filter, setFilter] = useState("all");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b=>!b), 600);
    return () => clearInterval(t);
  }, []);

  const ackAlarm = (id) => {
    setAlarms(al => al.map(a => a.id===id ? {...a, acked:true} : a));
  };

  const ackAll = () => {
    setAlarms(al => al.map(a => ({...a, acked:true})));
  };

  const filtered = alarms.filter(a => {
    if(filter==="unacked") return !a.acked;
    if(filter==="p1") return a.priority===1;
    if(filter==="p2") return a.priority<=2;
    return true;
  });

  const unackedCount = alarms.filter(a=>!a.acked).length;

  const priorityLabel = (p) => {
    if(p===1) return lbl("CRITIQUE","CRITICAL","CRITICO","CRITICO");
    if(p===2) return lbl("URGENCE","URGENT","URGENTE","URGENTE");
    if(p===3) return lbl("AVERTISSEMENT","WARNING","AVISO","AVISO");
    return lbl("INFO","INFO","INFO","INFO");
  };

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid rgba(255,23,68,0.25)`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{color:C.red,fontFamily:"Courier New",fontSize:11,letterSpacing:2}}>
          ◈ {lbl("PANNEAU ALARMES","ALARM PANEL","PANEL ALARMAS","PAINEL ALARMES")}
        </div>
        {unackedCount>0 && (
          <div style={{display:"flex",alignItems:"center",gap:6,
            background:blink?"rgba(255,23,68,0.2)":"rgba(255,23,68,0.05)",
            border:`1px solid ${C.red}`,borderRadius:6,padding:"3px 8px",transition:"background 0.3s"}}>
            <span style={{color:C.red,fontFamily:"Courier New",fontSize:10}}>
              {unackedCount} {lbl("NON-ACK","UNACKED","SIN-ACK","NAO-ACK")}
            </span>
          </div>
        )}
      </div>
      {/* filtres */}
      <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
        {[
          {id:"all",label:lbl("TOUT","ALL","TODO","TUDO")},
          {id:"unacked",label:lbl("NON-ACK","UNACKED","SIN-ACK","NAO-ACK")},
          {id:"p1",label:"P1 CRIT."},
          {id:"p2",label:"P1+P2"},
        ].map(f => (
          <button key={f.id} onClick={()=>setFilter(f.id)}
            style={{padding:"3px 8px",background:filter===f.id?"rgba(0,229,255,0.15)":"transparent",
              border:`1px solid ${filter===f.id?C.cyan:"rgba(255,255,255,0.1)"}`,
              borderRadius:4,color:filter===f.id?C.cyan:C.muted,
              fontFamily:"Courier New",fontSize:9,cursor:"pointer"}}>
            {f.label}
          </button>
        ))}
        <button onClick={ackAll}
          style={{marginLeft:"auto",padding:"3px 8px",
            background:"rgba(0,230,118,0.1)",border:`1px solid ${C.green}`,
            borderRadius:4,color:C.green,fontFamily:"Courier New",fontSize:9,cursor:"pointer"}}>
          ✓ ACK ALL
        </button>
      </div>
      {/* liste alarmes */}
      <div style={{maxHeight:220,overflow:"auto"}}>
        {filtered.map(alarm => (
          <div key={alarm.id}
            style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",marginBottom:4,
              background:alarm.acked?"rgba(13,31,60,0.6)":`${alarm.color}0f`,
              border:`1px solid ${alarm.acked?"rgba(84,110,122,0.3)":alarm.color}44`,
              borderRadius:6,opacity:alarm.acked?0.7:1}}>
            {/* priorité */}
            <div style={{width:4,height:36,borderRadius:2,background:alarm.acked?C.steel:alarm.color,flexShrink:0}}/>
            {/* infos */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:2}}>
                <span style={{fontFamily:"Courier New",fontSize:8,
                  color:alarm.acked?C.steel2:alarm.color,fontWeight:700}}>
                  {alarm.id}
                </span>
                <span style={{fontFamily:"Courier New",fontSize:7,color:C.steel2}}>
                  P{alarm.priority} {priorityLabel(alarm.priority)}
                </span>
                <span style={{marginLeft:"auto",fontFamily:"Courier New",fontSize:7,color:C.steel2}}>
                  {alarm.time}
                </span>
              </div>
              <div style={{fontFamily:"Courier New",fontSize:8,color:C.steel2,marginBottom:1}}>
                {alarm.tag}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:10,color:alarm.acked?C.muted:C.white}}>{alarm.desc}</span>
                <span style={{fontFamily:"Courier New",fontSize:8,color:alarm.acked?C.steel2:alarm.color,
                  flexShrink:0,marginLeft:4}}>
                  {alarm.value}
                </span>
              </div>
            </div>
            {/* ack btn */}
            {!alarm.acked && (
              <button onClick={()=>ackAlarm(alarm.id)}
                style={{padding:"3px 6px",background:"rgba(0,230,118,0.1)",
                  border:`1px solid ${C.green}`,borderRadius:4,
                  color:C.green,fontFamily:"Courier New",fontSize:8,cursor:"pointer",flexShrink:0}}>
                ACK
              </button>
            )}
            {alarm.acked && (
              <span style={{color:C.green,fontSize:10,flexShrink:0}}>✓</span>
            )}
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:20,color:C.green,fontFamily:"Courier New",fontSize:11}}>
            ✓ {lbl("Aucune alarme active","No active alarms","Sin alarmas activas","Sem alarmes ativos")}
          </div>
        )}
      </div>
      {/* legende priorités */}
      <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
        {[{p:1,c:C.red,l:"P1"},{p:2,c:C.orange,l:"P2"},{p:3,c:C.amber,l:"P3"},{p:4,c:C.yellow,l:"P4"}].map(x=>(
          <div key={x.p} style={{display:"flex",alignItems:"center",gap:3}}>
            <div style={{width:8,height:8,borderRadius:2,background:x.c}}/>
            <span style={{fontSize:9,color:C.muted,fontFamily:"Courier New"}}>{x.l}</span>
          </div>
        ))}
        <span style={{fontSize:9,color:C.steel2,marginLeft:4}}>
          {lbl("Norme IEC 61511 / IMO MSC.1/Circ.1432","IEC 61511 / IMO MSC.1/Circ.1432 standard","Norma IEC 61511 / IMO MSC.1/Circ.1432","Norma IEC 61511 / IMO MSC.1/Circ.1432")}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SVG 3 — INTEGRATION PASSERELLE
// ─────────────────────────────────────────────
function BridgeIntegrationSVG() {
  const [activeZone, setActiveZone] = useState(null);
  const [alarmRelay, setAlarmRelay] = useState(false);
  const [watchMode, setWatchMode] = useState("UMS"); // UMS | MANNED
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink(b=>!b), 700);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if(watchMode==="MANNED") setAlarmRelay(false);
  }, [watchMode]);

  const W = 340; const H = 200;

  const zones = [
    {id:"ecr",x:20,y:110,w:90,h:60,label:"ECR",sublabel:lbl("Salle contrôle","Control room","Sala control","Sala controle"),
      color:C.cyan,
      desc:lbl("Engine Control Room : poste principal de surveillance machine. Opérateur présent 24h/24 en mode MANNED.",
        "Engine Control Room: main engine monitoring station. Operator present 24/7 in MANNED mode.",
        "Engine Control Room: puesto principal de vigilancia de maquinas. Operador presente 24h en modo MANNED.",
        "Engine Control Room: posto principal de vigilancia de maquinas. Operador presente 24h no modo MANNED.")},
    {id:"ams",x:130,y:80,w:80,h:50,label:"AMS",sublabel:lbl("Centrale alarmes","Alarm central","Central alarmas","Central alarmes"),
      color:C.amber,
      desc:lbl("AMS traite et route les alarmes. En mode UMS, transfère automatiquement vers passerelle après délai de 30 secondes sans acquittement.",
        "AMS processes and routes alarms. In UMS mode, automatically transfers to bridge after 30-second delay without acknowledgment.",
        "AMS procesa y enruta alarmas. En modo UMS, transfiere automaticamente al puente tras demora de 30 segundos sin acuse.",
        "AMS processa e roteia alarmes. No modo UMS, transfere automaticamente para ponte apos atraso de 30 segundos sem acuse.")},
    {id:"bridge",x:220,y:20,w:100,h:60,label:lbl("PASSERELLE","BRIDGE","PUENTE","PONTE"),
      sublabel:lbl("Console alarmes","Alarm console","Consola alarmas","Console alarmes"),
      color:C.green,
      desc:lbl("SOLAS II-1/51 : en mode UMS, toutes les alarmes machine doivent être répercutées à la passerelle avec indication sonore et visuelle.",
        "SOLAS II-1/51: in UMS mode, all engine alarms must be relayed to bridge with audible and visual indication.",
        "SOLAS II-1/51: en modo UMS, todas las alarmas de maquinas deben retransmitirse al puente con indicacion sonora y visual.",
        "SOLAS II-1/51: no modo UMS, todos os alarmes de maquinas devem ser retransmitidos a ponte com indicacao sonora e visual.")},
    {id:"dma",x:220,y:120,w:100,h:50,label:"DMA",sublabel:lbl("Alarme homme mort","Dead Man Alarm","Alarma hombre muerto","Alarme homem morto"),
      color:C.red,
      desc:lbl("Dead Man Alarm : en UMS, l'officier mécanicien de quart doit confirmer sa présence toutes les 30 minutes. Sans confirmation : alarme passerelle.",
        "Dead Man Alarm: in UMS, the duty engineer must confirm presence every 30 minutes. Without confirmation: bridge alarm.",
        "Dead Man Alarm: en UMS, el oficial de maquinas de guardia debe confirmar su presencia cada 30 minutos. Sin confirmacion: alarma puente.",
        "Dead Man Alarm: no UMS, o oficial de maquinas de quarto deve confirmar presenca a cada 30 minutos. Sem confirmacao: alarme ponte.")},
  ];

  const links = [
    {x1:110,y1:140,x2:130,y2:105,color:C.cyan,active:true},
    {x1:210,y1:105,x2:220,y2:50,color:alarmRelay?C.red:C.amber,active:true,dashed:!alarmRelay},
    {x1:210,y1:105,x2:220,y2:145,color:C.red,active:watchMode==="UMS",dashed:false},
    {x1:320,y1:50,x2:320,y2:120,color:C.green,active:true,dashed:true},
  ];

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid rgba(0,230,118,0.2)`}}>
      <div style={{color:C.green,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ {lbl("INTEGRATION PASSERELLE","BRIDGE INTEGRATION","INTEGRACION PUENTE","INTEGRACAO PONTE")} — SOLAS II-1/51
      </div>
      {/* mode switch */}
      <div style={{display:"flex",gap:6,marginBottom:8}}>
        {["UMS","MANNED"].map(m => (
          <button key={m} onClick={()=>setWatchMode(m)}
            style={{flex:1,padding:"5px 0",
              background:watchMode===m?(m==="UMS"?"rgba(0,229,255,0.15)":"rgba(0,230,118,0.15)"):"transparent",
              border:`1px solid ${watchMode===m?(m==="UMS"?C.cyan:C.green):"rgba(255,255,255,0.1)"}`,
              borderRadius:6,color:watchMode===m?(m==="UMS"?C.cyan:C.green):C.muted,
              fontFamily:"Courier New",fontSize:10,cursor:"pointer"}}>
            {m==="UMS"?"🤖 UMS":"👨 MANNED"}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="8"/>
        {/* mode badge */}
        <rect x={W/2-40} y={H-18} width={80} height={14} rx="3"
          fill={watchMode==="UMS"?"rgba(0,229,255,0.1)":"rgba(0,230,118,0.1)"}
          stroke={watchMode==="UMS"?C.cyan:C.green} strokeWidth="0.5"/>
        <text x={W/2} y={H-8} textAnchor="middle" fontSize="7"
          fill={watchMode==="UMS"?C.cyan:C.green} fontFamily="Courier New">
          MODE: {watchMode}
        </text>
        {/* liens */}
        {links.map((l,i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.active?l.color:"rgba(84,110,122,0.2)"} strokeWidth="2"
            strokeDasharray={l.dashed?"5,4":"none"} opacity={l.active?0.8:0.2}/>
        ))}
        {/* alarme relay indicator */}
        {watchMode==="UMS" && alarmRelay && blink && (
          <circle cx={215} cy={78} r="5" fill={C.red} opacity="0.9"/>
        )}
        {/* zones */}
        {zones.map(z => (
          <g key={z.id} style={{cursor:"pointer"}} onClick={()=>setActiveZone(activeZone===z.id?null:z.id)}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="6"
              fill={activeZone===z.id?`${z.color}20`:`${z.color}08`}
              stroke={activeZone===z.id?z.color:`${z.color}44`} strokeWidth="1.5"/>
            <text x={z.x+z.w/2} y={z.y+z.h/2-4} textAnchor="middle"
              fontSize="9" fontWeight="700" fill={activeZone===z.id?z.color:C.muted}
              fontFamily="Courier New">{z.label}</text>
            <text x={z.x+z.w/2} y={z.y+z.h/2+8} textAnchor="middle"
              fontSize="7" fill={C.steel2}>{z.sublabel}</text>
          </g>
        ))}
        {/* 30s delay label */}
        {watchMode==="UMS" && (
          <text x={185} y={82} textAnchor="middle" fontSize="6.5" fill={C.amber} fontFamily="Courier New">
            30s
          </text>
        )}
      </svg>
      {/* relay toggle */}
      {watchMode==="UMS" && (
        <div style={{marginTop:6}}>
          <button onClick={()=>setAlarmRelay(r=>!r)}
            style={{width:"100%",padding:"6px 0",
              background:alarmRelay?"rgba(255,23,68,0.12)":"rgba(255,179,0,0.08)",
              border:`1px solid ${alarmRelay?C.red:C.amber}`,borderRadius:6,
              color:alarmRelay?C.red:C.amber,fontFamily:"Courier New",fontSize:10,cursor:"pointer"}}>
            {alarmRelay
              ? lbl("🔴 ALARME RELAYEE PASSERELLE","🔴 ALARM RELAYED TO BRIDGE","🔴 ALARMA RETRANSMITIDA PUENTE","🔴 ALARME RETRANSMITIDO PONTE")
              : lbl("▶ SIMULER RELAI ALARME","▶ SIMULATE ALARM RELAY","▶ SIMULAR RELE ALARMA","▶ SIMULAR RELE ALARME")}
          </button>
        </div>
      )}
      {activeZone && (
        <div style={{marginTop:8,padding:"8px 10px",
          background:`${zones.find(z=>z.id===activeZone)?.color}0f`,
          border:`1px solid ${zones.find(z=>z.id===activeZone)?.color}44`,borderRadius:8}}>
          <div style={{color:zones.find(z=>z.id===activeZone)?.color,fontSize:11,lineHeight:1.5}}>
            {zones.find(z=>z.id===activeZone)?.desc}
          </div>
        </div>
      )}
    </div>
  );
}

function TrendSVG() {
  const [selected, setSelected] = useState("lubTemp");
  const [showAlert, setShowAlert] = useState(false);

  const trends = {
    lubTemp: {
      label:lbl("Temp. huile lubrifiant","Lube oil temp.","Temp. aceite lubric.","Temp. oleo lubric."),
      unit:"C", alarm:70, shutdown:80, color:C.amber,
      data:[62,63,62,64,65,64,66,67,68,69,70,72,74],
      status:"warning",
      action:lbl("Vérifier échangeur huile/eau — colmatage possible","Check oil/water heat exchanger — possible fouling","Verificar intercambiador aceite/agua — posible colmatacion","Verificar trocador oleo/agua — possivel colmatacao")
    },
    vibration: {
      label:lbl("Vibration palier AV","FWD bearing vibration","Vibracion cojinete PRO","Vibracao mancal PRO"),
      unit:"mm/s", alarm:7.1, shutdown:11.2, color:C.cyan,
      data:[2.1,2.2,2.1,2.3,2.4,2.6,2.9,3.2,3.8,4.5,5.1,5.8,6.4],
      status:"warning",
      action:lbl("Tendance croissante — prévoir inspection palier sous 48h","Rising trend — plan bearing inspection within 48h","Tendencia creciente — planificar inspeccion cojinete en 48h","Tendencia crescente — planejar inspecao mancal em 48h")
    },
    exhaustDiff: {
      label:lbl("Ecart temp. echappement","Exhaust temp deviation","Desviacion temp. escape","Desvio temp. escapamento"),
      unit:"C", alarm:50, shutdown:null, color:C.green,
      data:[12,14,13,15,14,16,15,17,16,18,19,18,20],
      status:"normal",
      action:lbl("Dans les limites — surveiller tendance","Within limits — monitor trend","Dentro de limites — vigilar tendencia","Dentro dos limites — monitorar tendencia")
    },
    crankDep: {
      label:lbl("Depression carter","Crankcase vacuum","Depresion carter","Depressao carter"),
      unit:"mbar", alarm:-5, shutdown:-8, color:C.purple,
      data:[-2.1,-2.0,-2.2,-2.3,-2.5,-2.8,-3.2,-3.8,-4.5,-5.2,-5.8,-6.4,-7.1],
      status:"alarm",
      action:lbl("ALARM — verifier OMD, reduire charge, inspecter carter immediatement","ALARM — check OMD, reduce load, inspect crankcase immediately","ALARMA — verificar OMD, reducir carga, inspeccionar carter inmediatamente","ALARME — verificar OMD, reduzir carga, inspecionar carter imediatamente")
    },
  };

  const tr = trends[selected];
  const W = 340; const H = 160;
  const PL = 42; const PR = 16; const PT = 18; const PB = 28;
  const GW = W-PL-PR; const GH = H-PT-PB;

  const allVals = tr.data;
  const minV = Math.min(...allVals) * 0.9;
  const rawMax = Math.max(...allVals, tr.alarm, tr.shutdown||tr.alarm);
  const maxV = rawMax * 1.1;
  const range = maxV - minV;

  const toY = v => PT + GH - ((v-minV)/range)*GH;
  const toX = (i) => PL + (i/(allVals.length-1))*GW;

  const pts = allVals.map((v,i) => `${toX(i)},${toY(v)}`).join(" ");
  const lastX = toX(allVals.length-1);
  const lastY = toY(allVals[allVals.length-1]);

  const statusColor = tr.status==="alarm"?C.red:tr.status==="warning"?C.amber:C.green;

  return (
    <div style={{background:C.bg2,borderRadius:12,padding:12,border:`1px solid rgba(224,64,251,0.2)`}}>
      <div style={{color:C.purple,fontFamily:"Courier New",fontSize:11,letterSpacing:2,marginBottom:8}}>
        ◈ {lbl("MAINTENANCE PREDICTIVE","PREDICTIVE MAINTENANCE","MANTENIMIENTO PREDICTIVO","MANUTENCAO PREDITIVA")}
      </div>
      {/* selector */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:8}}>
        {Object.entries(trends).map(([k,v]) => {
          const sc = v.status==="alarm"?C.red:v.status==="warning"?C.amber:C.green;
          return (
            <button key={k} onClick={()=>setSelected(k)}
              style={{padding:"5px 8px",textAlign:"left",
                background:selected===k?`${v.color}15`:"transparent",
                border:`1px solid ${selected===k?v.color:"rgba(255,255,255,0.1)"}`,
                borderRadius:6,cursor:"pointer"}}>
              <div style={{fontSize:8,color:selected===k?v.color:C.muted,fontFamily:"Courier New"}}>{v.label}</div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:sc}}/>
                <span style={{fontSize:8,color:sc}}>
                  {v.data[v.data.length-1]} {v.unit}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill={C.bg1} rx="8"/>
        {/* grille */}
        {[0,25,50,75,100].map(pct => {
          const v = minV + (pct/100)*range;
          const y = toY(v);
          return (
            <g key={pct}>
              <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <text x={PL-3} y={y+3} textAnchor="end" fontSize="6.5" fill={C.steel2} fontFamily="Courier New">
                {v.toFixed(0)}
              </text>
            </g>
          );
        })}
        {/* ligne alarme */}
        {tr.alarm && (() => {
          const y = toY(tr.alarm);
          return (
            <g>
              <line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.amber} strokeWidth="1" strokeDasharray="4,3" opacity="0.7"/>
              <text x={W-PR-2} y={y-2} textAnchor="end" fontSize="6" fill={C.amber}>ALM</text>
            </g>
          );
        })()}
        {/* ligne shutdown */}
        {tr.shutdown && (() => {
          const y = toY(tr.shutdown);
          return (
            <g>
              <line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.red} strokeWidth="1" strokeDasharray="4,3" opacity="0.7"/>
              <text x={W-PR-2} y={y-2} textAnchor="end" fontSize="6" fill={C.red}>SHUT</text>
            </g>
          );
        })()}
        {/* courbe */}
        <polyline points={`${PL},${toY(allVals[0])} ${pts}`} fill="none"
          stroke={tr.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* zone sous courbe */}
        <polyline points={`${PL},${PT+GH} ${PL},${toY(allVals[0])} ${pts} ${lastX},${PT+GH}`}
          fill={`${tr.color}12`} stroke="none"/>
        {/* point actuel */}
        <circle cx={lastX} cy={lastY} r="5" fill={statusColor} opacity="0.9"/>
        {/* label axe X */}
        <text x={PL} y={H-4} fontSize="6.5" fill={C.steel2} fontFamily="Courier New">
          {lbl("-12h","-12h","-12h","-12h")}
        </text>
        <text x={W-PR} y={H-4} textAnchor="end" fontSize="6.5" fill={C.steel2} fontFamily="Courier New">
          {lbl("ACTUEL","NOW","ACTUAL","ATUAL")}
        </text>
        {/* unit label */}
        <text x={5} y={PT+GH/2} textAnchor="middle" fontSize="6.5" fill={C.steel2}
          transform={`rotate(-90,5,${PT+GH/2})`}>{tr.unit}</text>
      </svg>
      {/* status + action */}
      <div style={{marginTop:8,padding:"7px 10px",
        background:`${statusColor}0f`,border:`1px solid ${statusColor}44`,borderRadius:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:statusColor}}/>
          <span style={{color:statusColor,fontFamily:"Courier New",fontSize:10,fontWeight:700}}>
            {tr.status.toUpperCase()} — {tr.data[tr.data.length-1]} {tr.unit}
          </span>
        </div>
        <div style={{fontSize:10,color:C.muted,lineHeight:1.4}}>{tr.action}</div>
      </div>
    </div>
  );
}


// ══════════════════════════════════════
// T — TRADUCTIONS
// ══════════════════════════════════════
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
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#80deea" opacity={0.22+Math.sin(i)*0.12}/>
      ))}
    </svg>
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

function getTrophy(score, total) {
  const pct = score / total;
  if (pct===1)  return {icon:"🏆",color:"#f1c40f",label:{fr:"Parfait !",en:"Perfect!",es:"Perfecto!",pt:"Perfeito!"}};
  if (pct>=0.8) return {icon:"🥇",color:"#ffd54f",label:{fr:"Excellent !",en:"Excellent!",es:"Excelente!",pt:"Excelente!"}};
  if (pct>=0.6) return {icon:"🥈",color:"#b0bec5",label:{fr:"Bien !",en:"Well done!",es:"Bien!",pt:"Bem feito!"}};
  if (pct>=0.4) return {icon:"🥉",color:"#cd7f32",label:{fr:"Continue !",en:"Keep going!",es:"Sigue!",pt:"Continue!"}};
  return              {icon:"📚",color:"rgba(176,190,197,0.6)",label:{fr:"A retravailler",en:"Keep studying",es:"A repasar",pt:"Continue estudando"}};
}

// ══════════════════════════════════════
// EXERCISE — input type text + correction
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const bg0="#03070f"; const cyan="#00e5ff"; const green="#00e676"; const red="#ff1744";
  const amber="#ffb300"; const amber2="#ffd54f"; const border="rgba(0,229,255,0.18)";
  const white="#f0f4ff"; const steel3="#b0bec5"; const muted="rgba(176,190,197,0.7)";
  const bg1="#060e1a"; const cyan2="#80deea";

  const qs = {
    fr:[
      {id:"q1",q:"Que signifie l'acronyme AMS ?\n(Repondre en anglais, 3 mots)"},
      {id:"q2",q:"En mode UMS, une alarme non acquittee en combien de secondes est transferee a la passerelle ?\n(Repondre en secondes)"},
      {id:"q3",q:"Quel est le niveau de priorite le plus critique selon IEC 61511 ?\n(Repondre : P1, P2, P3 ou P4)"},
      {id:"q4",q:"Que detecte le Dead Man Alarm en mode UMS ?\n(Repondre en une phrase courte)"},
      {id:"q5",q:"Que signifie N+1 en redondance AMS ?\n(Repondre : 1 composant actif, 1 en standby ou autre)"},
    ],
    en:[
      {id:"q1",q:"What does the acronym AMS stand for?\n(Answer in English, 3 words)"},
      {id:"q2",q:"In UMS mode, an unacknowledged alarm is transferred to the bridge after how many seconds?\n(Answer in seconds)"},
      {id:"q3",q:"What is the most critical priority level per IEC 61511?\n(Answer: P1, P2, P3 or P4)"},
      {id:"q4",q:"What does the Dead Man Alarm detect in UMS mode?\n(Answer in one short phrase)"},
      {id:"q5",q:"What does N+1 mean in AMS redundancy?\n(Answer: 1 active component, 1 standby or other)"},
    ],
    es:[
      {id:"q1",q:"?Que significa el acronimo AMS?\n(Responder en ingles, 3 palabras)"},
      {id:"q2",q:"En modo UMS, una alarma no acusada se transfiere al puente en cuantos segundos?\n(Responder en segundos)"},
      {id:"q3",q:"?Cual es el nivel de prioridad mas critico segun IEC 61511?\n(Responder: P1, P2, P3 o P4)"},
      {id:"q4",q:"?Que detecta el Dead Man Alarm en modo UMS?\n(Responder en una frase corta)"},
      {id:"q5",q:"?Que significa N+1 en redundancia AMS?\n(Responder: 1 activo, 1 en espera u otro)"},
    ],
    pt:[
      {id:"q1",q:"O que significa o acronimo AMS?\n(Responder em ingles, 3 palavras)"},
      {id:"q2",q:"No modo UMS, um alarme nao acusado e transferido para a ponte apos quantos segundos?\n(Responder em segundos)"},
      {id:"q3",q:"Qual e o nivel de prioridade mais critico segundo IEC 61511?\n(Responder: P1, P2, P3 ou P4)"},
      {id:"q4",q:"O que deteta o Dead Man Alarm no modo UMS?\n(Responder em uma frase curta)"},
      {id:"q5",q:"O que significa N+1 em redundancia AMS?\n(Responder: 1 ativo, 1 em espera ou outro)"},
    ],
  };

  const chk=(id,val)=>{
    const v=val.trim().toLowerCase().replace(/\s/g,"");
    if(id==="q1") return v.includes("alarm")&&v.includes("monitor");
    if(id==="q2") return v==="30"||v==="30s"||v==="30sec";
    if(id==="q3") return v==="p1"||v==="1";
    if(id==="q4") return v.includes("presence")||v.includes("officier")||v.includes("officer")||v.includes("incapacit");
    if(id==="q5") return v.includes("standby")||v.includes("secours")||v.includes("backup");
    return false;
  };

  const corrKey={
    fr:{q1:"Alarm Monitoring System",q2:"30 secondes",q3:"P1",q4:"Incapacite de l'officier de quart",q5:"N actifs + 1 en standby"},
    en:{q1:"Alarm Monitoring System",q2:"30 seconds",q3:"P1",q4:"Duty officer incapacity",q5:"N active + 1 standby"},
    es:{q1:"Alarm Monitoring System",q2:"30 segundos",q3:"P1",q4:"Incapacidad del oficial de guardia",q5:"N activos + 1 en espera"},
    pt:{q1:"Alarm Monitoring System",q2:"30 segundos",q3:"P1",q4:"Incapacidade do oficial de quarto",q5:"N ativos + 1 em espera"},
  };

  const expl={
    fr:"OK Q1: Alarm Monitoring System — centralise, classe et transmet toutes les alarmes\nOK Q2: 30 secondes — SOLAS II-1 Reg.51 : relai automatique passerelle si non ACK\nOK Q3: P1 — danger immediat securite/environnement — action immediate requise\nOK Q4: Incapacite officier de quart — sans signal presence 30 min => alarme + passerelle\nOK Q5: N actifs + 1 en standby — CPU secondaire actif en < 100ms en cas de panne",
    en:"OK Q1: Alarm Monitoring System — centralizes, classifies and transmits all alarms\nOK Q2: 30 seconds — SOLAS II-1 Reg.51: automatic bridge relay if not ACK\nOK Q3: P1 — immediate safety/environmental danger — immediate action required\nOK Q4: Duty officer incapacity — without presence signal 30 min => alarm + bridge\nOK Q5: N active + 1 standby — secondary CPU active in < 100ms on failure",
    es:"OK Q1: Alarm Monitoring System — centraliza, clasifica y transmite todas las alarmas\nOK Q2: 30 segundos — SOLAS II-1 Reg.51: rele automatico al puente si no ACK\nOK Q3: P1 — peligro inmediato seguridad/medio ambiente\nOK Q4: Incapacidad del oficial de guardia — sin senal presencia 30 min => alarma + puente\nOK Q5: N activos + 1 en espera — CPU secundario activo en < 100ms",
    pt:"OK Q1: Alarm Monitoring System — centraliza, classifica e transmite todos os alarmes\nOK Q2: 30 segundos — SOLAS II-1 Reg.51: rele automatico ponte se nao ACK\nOK Q3: P1 — perigo imediato seguranca/ambiente\nOK Q4: Incapacidade do oficial de quarto — sem sinal presenca 30 min => alarme + ponte\nOK Q5: N ativos + 1 em espera — CPU secundario ativo em < 100ms",
  };

  const list=qs[lang]||qs.fr;
  const ck=corrKey[lang]||corrKey.fr;

  return (
    <div>
      <div style={{padding:"10px 14px",borderRadius:13,marginBottom:14,
        background:"rgba(0,229,255,0.06)",border:`1px solid ${cyan}33`,
        fontSize:11,color:cyan2,lineHeight:1.7}}>
        {lang==="fr"?"Rappels: AMS = Alarm Monitoring System | 30s | P1 | Dead Man = officier quart | N+1 = standby"
        :lang==="en"?"Key: AMS = Alarm Monitoring System | 30s | P1 | Dead Man = watch officer | N+1 = standby"
        :lang==="es"?"Clave: AMS = Alarm Monitoring System | 30s | P1 | Dead Man = oficial guardia | N+1 = espera"
        :"Chave: AMS = Alarm Monitoring System | 30s | P1 | Dead Man = oficial quarto | N+1 = espera"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:white,marginBottom:8,lineHeight:1.6,
            whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]}
            onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"12px",borderRadius:12,
              background:"rgba(255,255,255,0.06)",
              border:`1.5px solid ${showC?(chk(q.id,ans[q.id])?green:red):border}`,
              color:white,fontSize:18,fontFamily:"monospace",fontWeight:700,
              textAlign:"center",boxSizing:"border-box"}}/>
          {showC && (
            <div style={{fontSize:11,marginTop:5,fontWeight:700,
              color:chk(q.id,ans[q.id])?green:red}}>
              {chk(q.id,ans[q.id])?"✓":`✗ => ${ck[q.id]}`}
            </div>
          )}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)}
        style={{width:"100%",padding:"12px",borderRadius:14,
          border:`1px solid ${amber}55`,background:"rgba(255,179,0,0.1)",
          color:amber2,fontSize:12,fontWeight:800,cursor:"pointer",marginBottom:8}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      {showC && (
        <div style={{padding:"14px",borderRadius:14,
          background:"rgba(0,230,118,0.07)",border:`1px solid ${green}33`,
          fontSize:11,color:white,lineHeight:1.85,whiteSpace:"pre-line"}}>
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
  const bg0="#03070f"; const bg1="#060e1a"; const bg2="#0a1628";
  const cyan="#00e5ff"; const cyan2="#80deea"; const green="#00e676";
  const red="#ff1744"; const amber="#ffb300"; const amber2="#ffd54f";
  const blue2="#82b1ff"; const gold2="#e8b94f"; const steel3="#b0bec5";
  const white="#f0f4ff"; const border="rgba(0,229,255,0.18)";
  const lbl=(fr,en,es,pt)=>({fr,en,es,pt}[lang]||fr);

  const qs=[
    {q:lbl("Que signifie PT dans la nomenclature des capteurs AMS ?","What does PT mean in AMS sensor nomenclature?","Que significa PT en la nomenclatura de sensores AMS?","O que significa PT na nomenclatura de sensores AMS?"),
      opts:[lbl("Pressure Transmitter","Pressure Transmitter","Pressure Transmitter","Pressure Transmitter"),lbl("Power Transfer","Power Transfer","Power Transfer","Power Transfer"),lbl("Pipeline Temperature","Pipeline Temperature","Pipeline Temperature","Pipeline Temperature"),lbl("Pump Trigger","Pump Trigger","Pump Trigger","Pump Trigger")],
      ans:0,expl:lbl("PT = Pressure Transmitter, TT = Temperature Transmitter, LT = Level Transmitter, FT = Flow Transmitter, VT = Vibration Transmitter. Tous transmettent un signal 4-20mA a l'AMS.","PT = Pressure Transmitter, TT = Temperature Transmitter, LT = Level Transmitter, FT = Flow Transmitter, VT = Vibration Transmitter. All transmit a 4-20mA signal to the AMS.","PT = Pressure Transmitter. Todos transmiten una senal 4-20mA al AMS.","PT = Pressure Transmitter. Todos transmitem um sinal 4-20mA ao AMS.")},
    {q:lbl("Que signifie N+1 en redondance AMS ?","What does N+1 mean in AMS redundancy?","Que significa N+1 en redundancia AMS?","O que significa N+1 em redundancia AMS?"),
      opts:[lbl("1 composant de rechange pour chaque element critique","1 spare for each critical element","1 repuesto para cada elemento critico","1 sobressalente para cada elemento critico"),lbl("N composants actifs + 1 en standby pret a prendre le relais","N active + 1 standby ready to take over","N activos + 1 en espera listo para asumir","N ativos + 1 em espera pronto para assumir"),lbl("Jamais plus de N+1 alarmes simultanees","Never more than N+1 simultaneous alarms","Nunca mas de N+1 alarmas simultaneas","Nunca mais de N+1 alarmes simultaneos"),lbl("N capteurs par parametre","N sensors per parameter","N sensores por parametro","N sensores por parametro")],
      ans:1,expl:lbl("N+1 : toujours au moins un systeme de secours operationnel. CPU secondaire prend le relais en < 100ms sans perte de donnees si le CPU principal tombe.","N+1: always at least one backup system operational. Secondary CPU takes over in < 100ms without data loss if primary CPU fails.","N+1: siempre al menos un sistema de respaldo operacional. CPU secundario asume en < 100ms.","N+1: sempre pelo menos um sistema de backup operacional. CPU secundario assume em < 100ms.")},
    {q:lbl("Quelle est la difference entre P1 et P4 selon IEC 61511 ?","What is the difference between P1 and P4 per IEC 61511?","Cual es la diferencia entre P1 y P4 segun IEC 61511?","Qual e a diferenca entre P1 e P4 segundo IEC 61511?"),
      opts:[lbl("P1 = sonore, P4 = visuel seulement","P1 = audible, P4 = visual only","P1 = sonora, P4 = solo visual","P1 = sonoro, P4 = somente visual"),lbl("P1 = danger immediat securite, P4 = information non urgente","P1 = immediate safety danger, P4 = non-urgent information","P1 = peligro inmediato seguridad, P4 = informacion no urgente","P1 = perigo imediato seguranca, P4 = informacao nao urgente"),lbl("P1 = machine, P4 = pont","P1 = engine, P4 = deck","P1 = maquinas, P4 = cubierta","P1 = maquinas, P4 = convés"),lbl("Synonymes","Synonyms","Sinonimos","Sinonimos")],
      ans:1,expl:lbl("P1 = danger immediat pour la securite ou l'environnement (ex: basse pression huile). P4 = information de routine non urgente (ex: filtre a changer prochainement).","P1 = immediate danger to safety or environment (e.g.: low oil pressure). P4 = non-urgent routine information (e.g.: filter due for change).","P1 = peligro inmediato seguridad/ambiente. P4 = informacion rutinaria no urgente.","P1 = perigo imediato seguranca/ambiente. P4 = informacao rotineira nao urgente.")},
    {q:lbl("Qu'est-ce qu'un OMD (Oil Mist Detector) ?","What is an OMD (Oil Mist Detector)?","Que es un OMD (Oil Mist Detector)?","O que e um OMD (Oil Mist Detector)?"),
      opts:[lbl("Detecteur de fuite d'huile sur le pont","Oil leak detector on deck","Detector de fuga de aceite en cubierta","Detector de vazamento no convés"),lbl("Detecteur de concentration brouillard huile dans le carter — prevention explosion","Crankcase oil mist concentration detector — explosion prevention","Detector concentracion niebla aceite carter — prevencion explosiones","Detector concentracao nevoa oleo carter — prevencao explosao"),lbl("Analyseur qualite carburant","Fuel quality analyzer","Analizador calidad combustible","Analisador qualidade combustivel"),lbl("Moniteur consommation huile","Oil consumption monitor","Monitor consumo aceite","Monitor consumo oleo")],
      ans:1,expl:lbl("L'OMD detecte la concentration de brouillard d'huile dans le carter. Concentration elevee = echauffement anormal = risque explosion carter. Declenche slow-down puis shutdown.","OMD detects oil mist concentration in crankcase. High concentration = abnormal heating = crankcase explosion risk. Triggers slow-down then shutdown.","OMD detecta concentracion niebla aceite en carter. Alta concentracion = riesgo explosion.","OMD deteta concentracao nevoa oleo no carter. Alta concentracao = risco explosao.")},
    {q:lbl("Frequence de confirmation Dead Man Alarm en mode UMS ?","DMA confirmation frequency in UMS mode?","Frecuencia de confirmacion Dead Man Alarm en modo UMS?","Frequencia de confirmacao Dead Man Alarm no modo UMS?"),
      opts:["15 minutes","30 minutes","60 minutes","2 heures"],
      ans:1,expl:lbl("DMA exige confirmation de presence toutes les 30 minutes. Sans confirmation : alarme audivisuelle SM. Non acquittee en 30s : transfer passerelle OOW.","DMA requires presence confirmation every 30 minutes. Without confirmation: ER audivisual alarm. Not acked in 30s: bridge OOW transfer.","DMA exige confirmacion presencia cada 30 minutos.","DMA exige confirmacao presenca a cada 30 minutos.")},
    {q:lbl("Qu'est-ce que l'alarm flooding ?","What is alarm flooding?","Que es el alarm flooding?","O que e o alarm flooding?"),
      opts:[lbl("Alarme declenchee par inondation","Alarm triggered by flooding","Alarma activada por inundacion","Alarme acionado por inundacao"),lbl("Trop d'alarmes simultanees rendant difficile l'identification du vrai probleme","Too many simultaneous alarms making it hard to identify the real problem","Demasiadas alarmas simultaneas dificultando identificar el problema real","Muitos alarmes simultaneos dificultando identificar o problema real"),lbl("Filtre pour reduire les alarmes","Filter to reduce alarms","Filtro para reducir alarmas","Filtro para reduzir alarmes"),lbl("Alarme de niveau eau","Water level alarm","Alarma nivel agua","Alarme nivel agua")],
      ans:1,expl:lbl("L'alarm flooding sature l'operateur avec trop d'alarmes simultanees. Les normes IMO limitent a 10 alarmes max par minute pour preserver la capacite de reaction de l'operateur.","Alarm flooding saturates operator with too many simultaneous alarms. IMO standards limit to max 10 alarms per minute.","Alarm flooding satura al operador. IMO limita a 10 alarmas por minuto maximo.","Alarm flooding satura o operador. IMO limita a 10 alarmes por minuto maximo.")},
    {q:lbl("Difference entre maintenance corrective et predictive ?","Difference between corrective and predictive maintenance?","Diferencia entre mantenimiento correctivo y predictivo?","Diferenca entre manutencao corretiva e preditiva?"),
      opts:[lbl("Identiques","Identical","Identicos","Identicos"),lbl("Corrective = apres panne, Predictive = analyse tendances pour anticiper","Corrective = after breakdown, Predictive = trend analysis to anticipate","Correctivo = tras averia, Predictivo = analisis tendencias para anticipar","Corretiva = apos avaria, Preditiva = analise tendencias para antecipar"),lbl("Corrective = planifiee, Predictive = apres panne","Corrective = planned, Predictive = after breakdown","Correctivo = planificado, Predictivo = tras averia","Corretiva = planejada, Preditiva = apos avaria"),lbl("La predictive n'existe pas en marine","Predictive doesn't exist in maritime","La predictiva no existe en marina","Preditiva nao existe na marinha")],
      ans:1,expl:lbl("Corrective = reparer apres panne (couteux). Preventive = intervalles fixes. Predictive = analyser tendances vibrations/temperatures pour intervenir avant la panne. Reduction immobilisations 70% selon DNV.","Corrective = repair after breakdown (costly). Preventive = fixed intervals. Predictive = analyze vibration/temperature trends to intervene before failure. 70% downtime reduction per DNV.","Correctivo = reparar tras averia. Predictivo = analizar tendencias para anticipar.","Corretiva = reparar apos avaria. Preditiva = analisar tendencias para antecipar.")},
    {q:lbl("Signal 4-20mA = 0 mA d'un capteur signifie ?","4-20mA signal = 0 mA from sensor means?","Senal 4-20mA = 0 mA de sensor significa?","Sinal 4-20mA = 0 mA de sensor significa?"),
      opts:[lbl("Valeur minimum (0)","Minimum value (0)","Valor minimo (0)","Valor minimo (0)"),lbl("Rupture de cable ou defaut electrique — alarme capteur defaillant","Cable break or electrical fault — faulty sensor alarm","Rotura cable o fallo electrico — alarma sensor defectuoso","Ruptura cabo ou falha eletrica — alarme sensor defeituoso"),lbl("Valeur normale","Normal value","Valor normal","Valor normal"),lbl("Deconnexion intentionnelle","Intentional disconnection","Desconexion intencional","Desconexao intencional")],
      ans:1,expl:lbl("La plage 4-20mA permet detection rupture cable. 0 mA est impossible en fonctionnement normal (min = 4 mA). Tout signal < 4 mA = alarme capteur defaillant automatique.","The 4-20mA range allows cable break detection. 0 mA is impossible in normal operation (min = 4 mA). Any signal < 4 mA = automatic faulty sensor alarm.","0 mA es imposible en operacion normal. Cualquier senal < 4 mA genera alarma de sensor defectuoso.","0 mA e impossivel em operacao normal. Qualquer sinal < 4 mA gera alarme de sensor defeituoso.")},
    {q:lbl("Regle SOLAS sur la redondance des systemes d'alarme ?","SOLAS rule on alarm system redundancy?","Regla SOLAS sobre redundancia de sistemas de alarma?","Regra SOLAS sobre redundancia de sistemas de alarme?"),
      opts:[lbl("Aucune redondance requise","No redundancy required","Sin redundancia requerida","Sem redundancia necessaria"),lbl("Redondance partielle P3-P4","Partial redundancy P3-P4","Redundancia parcial P3-P4","Redundancia parcial P3-P4"),lbl("Systeme d'alarme doit rester operationnel en cas de defaillance unique (N+1)","Alarm system must remain operational on single failure (N+1)","Sistema de alarma debe permanecer operacional ante fallo unico (N+1)","Sistema de alarme deve permanecer operacional em falha unica (N+1)"),lbl("Redondance uniquement > 10 000 GT","Redundancy only > 10,000 GT","Redundancia solo > 10.000 GT","Redundancia apenas > 10.000 GT")],
      ans:2,expl:lbl("SOLAS exige qu'une defaillance unique ne puisse pas causer la perte de surveillance d'un parametre critique. D'ou le principe N+1 avec CPU redondant et alimentations independantes.","SOLAS requires that a single failure cannot cause loss of monitoring of a critical parameter. Hence N+1 with redundant CPU and independent power supplies.","SOLAS exige que un fallo unico no cause perdida de vigilancia de parametro critico.","SOLAS exige que uma falha unica nao cause perda de monitoramento de parametro critico.")},
    {q:lbl("Que contient l'historique des alarmes (alarm log) ?","What does the alarm log contain?","Que contiene el historial de alarmas?","O que contem o historico de alarmes?"),
      opts:[lbl("Rapport mensuel imprime","Monthly printed report","Informe mensual impreso","Relatorio mensal impresso"),lbl("Enregistrement horodate : alarme, ACK, operateur, retour normal","Timestamped record: alarm, ACK, operator, return to normal","Registro con marca horaria: alarma, ACK, operador, retorno normal","Registro com carimbo de hora: alarme, ACK, operador, retorno normal"),lbl("Alarmes en cours seulement","Current alarms only","Alarmas actuales solamente","Alarmes atuais somente"),lbl("Rapport hebdomadaire chef mecanicien","Chief engineer weekly report","Informe semanal jefe maquinas","Relatorio semanal chefe maquinas")],
      ans:1,expl:lbl("L'alarm log enregistre : heure d'apparition, valeur au declenchement, identite de l'operateur ayant acquitte, heure de retour a la normale. Essentiel pour enquetes accident et audits ISM.","Alarm log records: time of occurrence, trigger value, acknowledging operator identity, return to normal time. Essential for accident investigations and ISM audits.","El alarm log registra: hora, valor, operador que acuso, retorno normal. Esencial para investigaciones e ISM.","O alarm log registra: hora, valor, operador que acusou, retorno normal. Essencial para investigacoes e ISM.")},
    {q:lbl("Que signifie ECR en contexte salle des machines ?","What does ECR mean in engine room context?","Que significa ECR en sala de maquinas?","O que significa ECR na sala de maquinas?"),
      opts:["Emergency Control Room","Engine Control Room","Electrical Circuit Relay","Engine Combustion Regulator"],
      ans:1,expl:lbl("ECR = Engine Control Room : salle de controle machine depuis laquelle l'officier mecanicien supervise tous les parametres. En mode UMS, l'ECR peut etre sans personne la nuit.","ECR = Engine Control Room: engine control room from which the engineer officer monitors all parameters. In UMS mode, ECR can be unmanned at night.","ECR = Engine Control Room: sala de control de maquinas. En modo UMS, puede estar sin personal de noche.","ECR = Engine Control Room: sala de controle de maquinas. No modo UMS, pode ficar sem pessoal a noite.")},
    {q:lbl("Pourquoi limite-t-on les inhibitions d'alarme ?","Why are alarm inhibitions limited?","Por que se limitan las inhibiciones de alarma?","Por que se limitam as inibicoes de alarme?"),
      opts:[lbl("Pour economiser l'energie","To save energy","Para ahorrar energia","Para economizar energia"),lbl("Une alarme inhibee peut masquer un danger reel — risque accident grave","An inhibited alarm can mask real danger — serious accident risk","Una alarma inhibida puede enmascarar peligro real — riesgo accidente grave","Um alarme inibido pode mascarar perigo real — risco acidente grave"),lbl("Pour reduire bande passante","To reduce bandwidth","Para reducir ancho de banda","Para reduzir largura de banda"),lbl("Pour simplifier interface","To simplify interface","Para simplificar interfaz","Para simplificar interface")],
      ans:1,expl:lbl("Chaque inhibition doit etre documentee, limitee dans le temps et approuvee. Les accidents comme Texas City (2005) ont montre les risques des alarmes inhibees trop longtemps.","Each inhibition must be documented, time-limited and approved. Accidents like Texas City (2005) showed risks of alarms inhibited too long.","Cada inhibicion debe ser documentada, limitada en tiempo y aprobada.","Cada inibicao deve ser documentada, limitada no tempo e aprovada.")},
    {q:lbl("Difference entre alarme active et dormante ?","Difference between active and dormant alarm?","Diferencia entre alarma activa y dormante?","Diferenca entre alarme ativo e dormante?"),
      opts:[lbl("Synonymes","Synonyms","Sinonimos","Sinonimos"),lbl("Active = condition anormale en cours, Dormante = revenue a normale mais pas encore ACK","Active = ongoing abnormal condition, Dormant = returned to normal but not yet ACK","Activa = condicion anormal en curso, Dormante = vuelta normal pero sin acusar","Ativa = condicao anormal em curso, Dormante = voltou normal mas sem acuse"),lbl("Active = acquittee, Dormante = non-acquittee","Active = acknowledged, Dormant = unacknowledged","Activa = acusada, Dormante = sin acusar","Ativa = acusada, Dormante = sem acuse"),lbl("Active = P1-P2, Dormante = P3-P4","Active = P1-P2, Dormant = P3-P4","Activa = P1-P2, Dormante = P3-P4","Ativa = P1-P2, Dormante = P3-P4")],
      ans:1,expl:lbl("Active = condition anormale persiste. Dormante = condition revenue a la normale, mais operateur n'a pas encore acquitte. Reste visible pour traçabilite et audit ISM.","Active = abnormal condition persists. Dormant = condition returned to normal but operator not yet ACK. Remains visible for traceability and ISM audit.","Activa = condicion anormal persiste. Dormante = volvio normal pero sin acuse. Permanece visible.","Ativa = condicao anormal persiste. Dormante = voltou normal mas sem acuse. Permanece visivel.")},
    {q:lbl("Role du VDR par rapport aux alarmes machine ?","Role of VDR regarding engine alarms?","Papel del VDR con respecto a alarmas de maquinas?","Papel do VDR em relacao aos alarmes de maquinas?"),
      opts:[lbl("Ne concerne pas les alarmes machine","Does not concern engine alarms","No concierne las alarmas de maquinas","Nao concerne alarmes de maquinas"),lbl("Enregistre les alarmes machine 48h minimum — SOLAS V/20 — source enquete accident","Records engine alarms 48h minimum — SOLAS V/20 — accident investigation source","Registra alarmas maquinas 48h minimo — SOLAS V/20 — fuente investigacion","Registra alarmes maquinas 48h minimo — SOLAS V/20 — fonte investigacao"),lbl("Remplace l'alarm log","Replaces alarm log","Reemplaza el alarm log","Substitui o alarm log"),lbl("VDR = pont seulement","VDR = bridge only","VDR = puente solamente","VDR = ponte somente")],
      ans:1,expl:lbl("Le VDR (SOLAS V/20) enregistre donnees navire incluant alarmes machine pendant au moins 48h. En cas d'accident, source principale pour reconstituer la chronologie des evenements.","VDR (SOLAS V/20) records vessel data including engine alarms for at least 48h. In accident case, primary source to reconstruct event timeline.","VDR (SOLAS V/20) registra datos buque incluyendo alarmas maquinas durante 48h minimo.","VDR (SOLAS V/20) registra dados navio incluindo alarmes maquinas por 48h minimo.")},
    {q:lbl("Qu'est-ce qu'un nuisance alarm ?","What is a nuisance alarm?","Que es una nuisance alarm?","O que e um nuisance alarm?"),
      opts:[lbl("Alarme de bruit excessif","Excessive noise alarm","Alarma de ruido excesivo","Alarme de ruido excessivo"),lbl("Alarme qui se declenche frequemment sans danger reel — seuil mal regle","Alarm triggering frequently without real danger — poorly set threshold","Alarma que se activa frecuentemente sin peligro real — umbral mal configurado","Alarme que aciona frequentemente sem perigo real — limiar mal configurado"),lbl("Alarme non documentee","Undocumented alarm","Alarma no documentada","Alarme nao documentado"),lbl("Alarme priorite P4","Priority P4 alarm","Alarma prioridad P4","Alarme prioridade P4")],
      ans:1,expl:lbl("Un nuisance alarm se declenche regulierement pour une condition non dangereuse (seuil trop sensible). Cree un bruit de fond et risque de desensibiliser l'operateur — danger majeur reconnu par IMO.","A nuisance alarm triggers regularly for a non-dangerous condition (threshold too sensitive). Creates background noise and risks desensitizing operator — major hazard recognized by IMO.","Un nuisance alarm se activa para una condicion no peligrosa. Crea ruido de fondo y desensibiliza al operador.","Um nuisance alarm aciona para uma condicao nao perigosa. Cria ruido de fundo e dessensibiliza o operador.")},
  ];

  const [shuffled]=useState(()=>qs.map(q=>shuffleQuestionOptions(q,"ans")));
  const total=qs.length;
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===shuffled[idx].ans)setScore(s=>s+1);};
  const handleNext=()=>{if(idx===total-1){setDone(true);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  const handleRestart=()=>{setIdx(0);setSel(null);setAnswered(false);setScore(0);setDone(false);setStarted(false);};

  if(!started) return (
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:white,marginBottom:6,letterSpacing:1}}>
        {lbl("Banque Premium+","Premium+ Bank","Banco Premium+","Banco Premium+")}
      </div>
      <div style={{fontSize:12,color:"rgba(176,190,197,0.7)",marginBottom:20}}>
        15 {lbl("questions niveau ingenieur","engineer-level questions","preguntas nivel ingeniero","questoes nivel engenheiro")}
      </div>
      <button onClick={()=>setStarted(true)}
        style={{padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${cyan},${blue2})`,
          border:"none",color:bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
          boxShadow:`0 0 28px ${cyan}44`}}>
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
        <div style={{fontSize:30,fontWeight:800,color:white,marginBottom:4}}>{score}/{total}</div>
        <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:20}}>{pct}%</div>
        <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,marginBottom:20,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${cyan},${trophy.color})`,borderRadius:6}}/>
        </div>
        <button onClick={handleRestart}
          style={{width:"100%",padding:"13px",borderRadius:14,background:`rgba(0,229,255,0.12)`,
            border:`1px solid ${cyan}55`,color:cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
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
          <span style={{fontSize:10,color:cyan,fontWeight:800}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:gold2,fontWeight:800}}>✓ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(idx/total)*100}%`,
            background:`linear-gradient(90deg,${cyan},${blue2})`,borderRadius:4,transition:"width 0.35s"}}/>
        </div>
      </div>
      <div style={{background:"rgba(6,14,26,0.8)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${border}`}}>
        <div style={{fontSize:13,color:white,lineHeight:1.65,fontWeight:600}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=border,col=white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=green;col=green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=red;col=red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"12px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:12,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:amber2,fontSize:11}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?green:red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?green:red,marginBottom:5}}>
            {sel===q.ans
              ?(lbl("✓ Excellente reponse !","✓ Excellent!","✓ Excelente!","✓ Excelente!"))
              :(lbl("✗ Reponse incorrecte","✗ Incorrect","✗ Incorrecta","✗ Incorreta"))}
          </div>
          <div style={{fontSize:11,color:steel3,lineHeight:1.7}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"14px",borderRadius:15,
            background:`linear-gradient(135deg,${cyan},${blue2})`,
            border:"none",color:bg0,fontSize:13,fontWeight:900,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lbl("VOIR MON SCORE =>","SEE MY SCORE =>","VER PUNTUACION =>","VER PONTUACAO =>"))
            :(lbl("SUIVANT =>","NEXT =>","SIGUIENTE =>","PROXIMO =>"))}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — 5 QCM
// ══════════════════════════════════════
function QuizComp({ questions, t, lang, onComplete }) {
  const [shuffled]=useState(()=>questions.map(q=>shuffleQuestionOptions(q,"ans")));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const [score,setScore]=useState(0);
  const bg0="#03070f"; const cyan="#00e5ff"; const green="#00e676"; const red="#ff1744";
  const amber="#ffb300"; const amber2="#ffd54f"; const gold2="#e8b94f";
  const white="#f0f4ff"; const border="rgba(0,229,255,0.18)"; const steel3="#b0bec5";
  const total=questions.length; const isLast=idx===total-1;
  const q=shuffled[idx];
  const handleAnswer=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.ans)setScore(s=>s+1);};
  const handleNext=()=>{const fs=score+(sel===q.ans?1:0);if(isLast){onComplete(fs);return;}setSel(null);setAnswered(false);setIdx(i=>i+1);};
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:"rgba(176,190,197,0.7)"}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:gold2,fontWeight:800}}>✓ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${amber},${gold2})`,borderRadius:4,transition:"width 0.3s"}}/>
      </div>
      <div style={{background:"rgba(6,14,26,0.85)",borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${border}`}}>
        <div style={{fontSize:14,color:white,lineHeight:1.65,fontWeight:700}}>{q.q}</div>
      </div>
      {q.opts.map((opt,i)=>{
        let bg="rgba(10,22,40,0.7)",brd=border,col=white;
        if(answered){
          if(i===q.ans){bg="rgba(0,230,118,0.12)";brd=green;col=green;}
          else if(i===sel){bg="rgba(255,23,68,0.12)";brd=red;col=red;}
        }
        return (
          <button key={i} onClick={()=>handleAnswer(i)}
            style={{width:"100%",padding:"13px 15px",marginBottom:8,borderRadius:13,background:bg,
              border:`1.5px solid ${brd}`,color:col,fontSize:13,textAlign:"left",
              cursor:answered?"default":"pointer",transition:"all 0.2s"}}>
            <span style={{fontWeight:800,marginRight:9,color:amber2}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        );
      })}
      {answered && (
        <div style={{padding:"13px",borderRadius:13,
          background:`rgba(${sel===q.ans?"0,230,118":"255,23,68"},0.08)`,
          border:`1.5px solid ${sel===q.ans?green:red}55`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:800,color:sel===q.ans?green:red,marginBottom:5}}>
            {sel===q.ans?t.correct:t.wrong}
          </div>
          <div style={{fontSize:11,color:steel3,lineHeight:1.7}}>{t.expl} {q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"15px",borderRadius:15,
            background:`linear-gradient(135deg,${amber},${gold2})`,
            border:"none",color:bg0,fontSize:14,fontWeight:900,cursor:"pointer",letterSpacing:1,
            boxShadow:`0 4px 22px ${amber}40`}}>
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
      badge:"Module e7 — UMS & Automatisation · Lecon 4/5 · Premium+ · 250 XP",
      title:"Surveillance & Alarmes — AMS Avance",
      intro:"La nuit, l'AMS surveille seul plus de 1 000 points en salle des machines. Chaque anomalie est classee, horodatee, et transmise si necessaire.\n\nCette lecon couvre l'architecture AMS, la gestion des alarmes, l'integration passerelle et la maintenance predictive.",
      p1:"PARTIE 1 — ARCHITECTURE AMS",s1t:"4 couches : capteurs → I/O → CPU → interfaces",
      s1:"AMS = Alarm Monitoring System\nCoeur du systeme UMS. > 1 000 points alarme sur VLCC.\n\nARCHITECTURE 4 COUCHES:\n→ Capteurs terrain 4-20mA (PT/TT/LT/FT/VT/OMD)\n→ Modules I/O : conversion analogique/numerique\n→ CPU AMS : traitement, classement, historique\n→ Interfaces : ECR panel, alarme passerelle, mobile\n\nREDONDANCE N+1 (SOLAS):\nCPU secondaire actif en < 100ms\nAucune perte de surveillance en cas de panne\n\nFABRICANTS:\nKongsberg Maritime | Wartsila NACOS\nABB OCTOPUS | Rolls-Royce ACON",
      p2:"PARTIE 2 — GESTION DES ALARMES",s2t:"Priorites P1-P4 — ACK — flooding",
      s2:"4 NIVEAUX DE PRIORITE (IEC 61511 / IMO MSC.1/Circ.1432):\nP1 CRITIQUE : danger immediat securite/environnement\nP2 URGENCE : action requise sous 2 minutes\nP3 AVERTISSEMENT : intervention planifiee\nP4 INFO : surveillance routine\n\nALARM FLOODING:\nMax 10 alarmes par minute selon IMO\nSaturation operateur = risque accident grave\n\nACQUITTEMENT:\nChaque alarme doit etre acquittee (ACK)\nNon ACK en 30s en UMS => relai passerelle\nSOLAS II-1 Reg. 51\n\nNUISANCE ALARM:\nAlarme frequente sans danger reel\nSeuil trop sensible => desensibilisation operateur",
      p3:"PARTIE 3 — INTEGRATION PASSERELLE",s3t:"UMS — SOLAS II-1/51 — DMA",
      s3:"MODE UMS (Unmanned Machinery Space):\nSM sans personnel la nuit\nAlarmes machine retransmises passerelle SOLAS II-1/51\nNon ACK en 30s => OOW alerte automatiquement\n\nDEAD MAN ALARM (DMA):\nConfirmation presence officier toutes 30 min\nSans signal => alarme SM puis passerelle\nSOLAS V/Reg.19\n\nMODE MANNED:\nOfficier mecanicien present en ECR en permanence\nPas de relai automatique vers passerelle\n\nECR (Engine Control Room):\nPoste central surveillance machine\nToutes alarmes AMS affichees en temps reel",
      p4:"PARTIE 4 — MAINTENANCE PREDICTIVE",s4t:"Tendances — anticipation pannes — DNV",
      s4:"AMS MODERNE — HISTORIQUE TENDANCES:\nEnregistrement continu tous parametres\nGraphes tendances vibrations / temperatures / pressions\n\nSIGNAUX PRECURSEURS:\n→ T° huile +1C/jour => echangeur colmate\n→ Vibration x3 en 2 semaines => palier a inspecter\n→ Depression carter croissante => risque OMD\n\nTYPES MAINTENANCE:\nCorrective = reparer apres panne (couteux)\nPreventive = intervalles fixes fabricant\nPredictive = analyser tendances AMS avant panne\n(-70% immobilisations non planifiees — DNV)\n\nVDR (Voyage Data Recorder):\nEnregistre alarmes machine 48h minimum\nSOLAS V/20 — source principale enquete accident",
      p5:"EXERCICES PRATIQUES PREMIUM+",p6:"CAS D'ACCIDENT REEL",p7:"BANQUE — 15 QUESTIONS PREMIUM+",
      sumT:"RESUME — LECON e7 L4",
      sumP:["AMS = Alarm Monitoring System : 4 couches — capteurs → I/O → CPU → interfaces","Signal 4-20mA : 0 mA = rupture cable (alarme defaut capteur)","4 niveaux de priorite : P1 critique → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)","SOLAS II-1/51 : alarme non ACK en 30s en mode UMS => relai passerelle automatique","DMA (Dead Man Alarm) : confirmation presence toutes 30 min en UMS","OMD = Oil Mist Detector : brouillard huile carter => risque explosion","Maintenance predictive : analyse tendances pour anticiper pannes (-70% DNV)","Redondance N+1 obligatoire : CPU secondaire actif en < 100ms (SOLAS)","VDR enregistre alarmes machine 48h minimum (SOLAS V/20)","Nuisance alarm = alarme frequente sans danger reel => desensibilisation operateur"],
      learnedP:["AMS : architecture 4 couches — redondance N+1","Priorites alarmes P1-P4 (IEC 61511) — alarm flooding","SOLAS II-1/51 : relai passerelle 30s — DMA 30 min","Maintenance predictive : tendances AMS avant panne","VDR : alarmes machine 48h (SOLAS V/20)"],
    },
    en:{
      badge:"Module e7 — UMS & Automation · Lesson 4/5 · Premium+ · 250 XP",
      title:"Monitoring & Alarms — Advanced AMS",
      intro:"At night, the AMS alone monitors over 1,000 points in the engine room. Every anomaly is classified, timestamped, and relayed if necessary.\n\nThis lesson covers AMS architecture, alarm management, bridge integration and predictive maintenance.",
      p1:"PART 1 — AMS ARCHITECTURE",s1t:"4 layers: sensors → I/O → CPU → interfaces",
      s1:"AMS = Alarm Monitoring System\nHeart of UMS. > 1,000 alarm points on VLCC.\n\n4-LAYER ARCHITECTURE:\n→ Field sensors 4-20mA (PT/TT/LT/FT/VT/OMD)\n→ I/O modules: analog/digital conversion\n→ AMS CPU: processing, classification, history\n→ Interfaces: ECR panel, bridge alarm, mobile\n\nN+1 REDUNDANCY (SOLAS):\nSecondary CPU active in < 100ms\nNo monitoring loss on failure\n\nMANUFACTURERS:\nKongsberg Maritime | Wartsila NACOS\nABB OCTOPUS | Rolls-Royce ACON",
      p2:"PART 2 — ALARM MANAGEMENT",s2t:"Priorities P1-P4 — ACK — flooding",
      s2:"4 PRIORITY LEVELS (IEC 61511 / IMO MSC.1/Circ.1432):\nP1 CRITICAL: immediate safety/environmental danger\nP2 URGENT: action required within 2 minutes\nP3 WARNING: planned intervention\nP4 INFO: routine monitoring\n\nALARM FLOODING:\nMax 10 alarms per minute per IMO\nOperator saturation = serious accident risk\n\nACKNOWLEDGMENT:\nEach alarm must be acknowledged (ACK)\nNot ACK in 30s in UMS => bridge relay\nSOLAS II-1 Reg. 51\n\nNUISANCE ALARM:\nFrequent alarm without real danger\nOver-sensitive threshold => operator desensitization",
      p3:"PART 3 — BRIDGE INTEGRATION",s3t:"UMS — SOLAS II-1/51 — DMA",
      s3:"UMS MODE (Unmanned Machinery Space):\nER unmanned at night\nEngine alarms relayed to bridge SOLAS II-1/51\nNot ACK in 30s => OOW automatically alerted\n\nDEAD MAN ALARM (DMA):\nOfficer presence confirmation every 30 min\nNo signal => ER alarm then bridge\nSOLAS V/Reg.19\n\nMANNED MODE:\nEngineer officer present in ECR permanently\nNo automatic relay to bridge\n\nECR (Engine Control Room):\nCentral engine monitoring station\nAll AMS alarms displayed in real time",
      p4:"PART 4 — PREDICTIVE MAINTENANCE",s4t:"Trends — failure anticipation — DNV",
      s4:"MODERN AMS — TREND HISTORY:\nContinuous recording of all parameters\nVibration / temperature / pressure trend graphs\n\nPRECURSOR SIGNALS:\n→ Oil temp +1C/day => heat exchanger fouling\n→ Vibration x3 in 2 weeks => bearing to inspect\n→ Rising crankcase vacuum => OMD risk\n\nMAINTENANCE TYPES:\nCorrective = repair after failure (costly)\nPreventive = manufacturer fixed intervals\nPredictive = analyze AMS trends before failure\n(-70% unplanned downtime — DNV)\n\nVDR (Voyage Data Recorder):\nRecords engine alarms 48h minimum\nSOLAS V/20 — primary accident investigation source",
      p5:"ADVANCED PREMIUM+ EXERCISES",p6:"REAL ACCIDENT CASE",p7:"BANK — 15 PREMIUM+ QUESTIONS",
      sumT:"SUMMARY — LESSON e7 L4",
      sumP:["AMS = Alarm Monitoring System: 4 layers — sensors → I/O → CPU → interfaces","4-20mA signal: 0 mA = cable break (faulty sensor alarm)","4 priority levels: P1 critical → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)","SOLAS II-1/51: alarm not ACK in 30s in UMS => automatic bridge relay","DMA (Dead Man Alarm): presence confirmation every 30 min in UMS","OMD = Oil Mist Detector: crankcase oil mist => explosion risk","Predictive maintenance: trend analysis to anticipate failures (-70% DNV)","N+1 redundancy mandatory: secondary CPU active in < 100ms (SOLAS)","VDR records engine alarms 48h minimum (SOLAS V/20)","Nuisance alarm = frequent alarm without real danger => operator desensitization"],
      learnedP:["AMS: 4-layer architecture — N+1 redundancy","Alarm priorities P1-P4 (IEC 61511) — alarm flooding","SOLAS II-1/51: bridge relay 30s — DMA 30 min","Predictive maintenance: AMS trends before failure","VDR: engine alarms 48h (SOLAS V/20)"],
    },
    es:{
      badge:"Modulo e7 — UMS & Automatizacion · Leccion 4/5 · Premium+ · 250 XP",
      title:"Vigilancia & Alarmas — AMS Avanzado",
      intro:"De noche, el AMS vigila solo mas de 1.000 puntos en la sala de maquinas. Cada anomalia se clasifica, marca con hora y se transmite si es necesario.\n\nEsta leccion cubre la arquitectura AMS, la gestion de alarmas, la integracion con el puente y el mantenimiento predictivo.",
      p1:"PARTE 1 — ARQUITECTURA AMS",s1t:"4 capas: sensores → I/O → CPU → interfaces",
      s1:"AMS: Corazon del UMS. > 1.000 puntos alarma en VLCC.\n4 CAPAS: Sensores 4-20mA | I/O | CPU | Interfaces (ECR/Puente)\nREDUNDANCIA N+1: CPU secundario activo en < 100ms (SOLAS)",
      p2:"PARTE 2 — GESTION DE ALARMAS",s2t:"Prioridades P1-P4 — ACK — flooding",
      s2:"P1 CRITICO | P2 URGENTE | P3 AVISO | P4 INFO (IEC 61511)\nAlarm flooding: max 10/min (IMO)\nNo ACK en 30s en UMS => puente (SOLAS II-1 Reg.51)\nNuisance alarm: alarma frecuente sin peligro real",
      p3:"PARTE 3 — INTEGRACION PUENTE",s3t:"UMS — SOLAS II-1/51 — DMA",
      s3:"Modo UMS: SM sin personal de noche\nNo ACK 30s => OOW alertado automaticamente\nDMA: confirmacion presencia 30 min\nModo MANNED: oficial presente en ECR permanentemente",
      p4:"PARTE 4 — MANTENIMIENTO PREDICTIVO",s4t:"Tendencias — anticipacion averias — DNV",
      s4:"AMS moderno: registro continuo tendencias\nSenales precursores: T° aceite creciente / vibracion x3 / vacio carter\nPredictivo = analizar tendencias antes de averia (-70% paradas no planificadas DNV)\nVDR: alarmas maquinas 48h minimo (SOLAS V/20)",
      p5:"EJERCICIOS AVANZADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 PREGUNTAS PREMIUM+",
      sumT:"RESUMEN — LECCION e7 L4",
      sumP:["AMS = Alarm Monitoring System: 4 capas","Senal 4-20mA: 0 mA = rotura cable","P1 critico → P4 info (IEC 61511)","SOLAS II-1/51: no ACK 30s => relé puente automatico","DMA: confirmacion presencia 30 min en UMS","OMD: niebla aceite carter => riesgo explosion","Predictivo: tendencias AMS antes de averia (-70% DNV)","N+1: CPU secundario < 100ms (SOLAS)","VDR: alarmas maquinas 48h (SOLAS V/20)","Nuisance alarm => desensibilizacion operador"],
      learnedP:["AMS: arquitectura 4 capas — N+1","Prioridades P1-P4 — alarm flooding","SOLAS II-1/51: relé puente 30s — DMA 30 min","Mantenimiento predictivo: tendencias AMS","VDR: alarmas 48h (SOLAS V/20)"],
    },
    pt:{
      badge:"Modulo e7 — UMS & Automatizacao · Licao 4/5 · Premium+ · 250 XP",
      title:"Vigilancia & Alarmes — AMS Avancado",
      intro:"De noite, o AMS vigia sozinho mais de 1.000 pontos na sala de maquinas. Cada anomalia e classificada, marcada com hora e transmitida se necessario.\n\nEsta licao cobre a arquitetura AMS, gestao de alarmes, integracao com a ponte e manutencao preditiva.",
      p1:"PARTE 1 — ARQUITETURA AMS",s1t:"4 camadas: sensores → I/O → CPU → interfaces",
      s1:"AMS: Coracao do UMS. > 1.000 pontos alarme num VLCC.\n4 CAMADAS: Sensores 4-20mA | I/O | CPU | Interfaces (ECR/Ponte)\nREDUNDANCIA N+1: CPU secundario ativo em < 100ms (SOLAS)",
      p2:"PARTE 2 — GESTAO DE ALARMES",s2t:"Prioridades P1-P4 — ACK — flooding",
      s2:"P1 CRITICO | P2 URGENTE | P3 AVISO | P4 INFO (IEC 61511)\nAlarm flooding: max 10/min (IMO)\nNao ACK em 30s em UMS => ponte (SOLAS II-1 Reg.51)\nNuisance alarm: alarme frequente sem perigo real",
      p3:"PARTE 3 — INTEGRACAO PONTE",s3t:"UMS — SOLAS II-1/51 — DMA",
      s3:"Modo UMS: SM sem pessoal de noite\nNao ACK 30s => OOW alertado automaticamente\nDMA: confirmacao presenca 30 min\nModo MANNED: oficial presente no ECR permanentemente",
      p4:"PARTE 4 — MANUTENCAO PREDITIVA",s4t:"Tendencias — antecipacao avarias — DNV",
      s4:"AMS moderno: registo continuo de tendencias\nSinais precursores: T° oleo crescente / vibracao x3 / vacuo carter\nPreditiva = analisar tendencias antes de avaria (-70% paragens nao planeadas DNV)\nVDR: alarmes maquinas 48h minimo (SOLAS V/20)",
      p5:"EXERCICIOS AVANCADOS PREMIUM+",p6:"CASO REAL",p7:"BANCO — 15 QUESTOES PREMIUM+",
      sumT:"RESUMO — LICAO e7 L4",
      sumP:["AMS = Alarm Monitoring System: 4 camadas","Sinal 4-20mA: 0 mA = ruptura cabo","P1 critico → P4 info (IEC 61511)","SOLAS II-1/51: nao ACK 30s => rele ponte automatico","DMA: confirmacao presenca 30 min em UMS","OMD: nevoa oleo carter => risco explosao","Preditiva: tendencias AMS antes avaria (-70% DNV)","N+1: CPU secundario < 100ms (SOLAS)","VDR: alarmes maquinas 48h (SOLAS V/20)","Nuisance alarm => dessensibilizacao operador"],
      learnedP:["AMS: arquitetura 4 camadas — N+1","Prioridades P1-P4 — alarm flooding","SOLAS II-1/51: rele ponte 30s — DMA 30 min","Manutencao preditiva: tendencias AMS","VDR: alarmes 48h (SOLAS V/20)"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// ACCIDENT CASE — SCANDINAVIAN STAR
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const white="#f0f4ff"; const red="#ff1744"; const red2="#ff5252";
  const green2="#69f0ae"; const amber="#ffb300"; const amber2="#ffd54f"; const muted="rgba(176,190,197,0.7)";
  const d={
    fr:{title:"MV Scandinavian Star — Mer du Nord (1990)",teaser:"Ferry — Incendie criminel — 158 morts — Systeme alarme defaillant — Equipage sans formation",
      what:"Le 7 avril 1990, un incendie criminel eclate a bord du ferry Scandinavian Star (383 passagers). Le systeme d'alarme incendie presente des defauts graves : detecteurs non fonctionnels dans certaines zones, alarmes acquittees sans verification physique, transfert passerelle defaillant. L'equipage — recemment recrute apres changement de pavillon — ne connait pas le systeme d'alarme du navire. Les 158 victimes meurent principalement par asphyxie, faute d'evacuation rapide.",
      cause:"- Detecteurs alarme non fonctionnels dans plusieurs zones\n- Alarmes acquittees sans investigation physique\n- Transfert alarmes vers passerelle defaillant\n- Equipage sans formation sur le systeme alarme specifique du navire\n- Changement de pavillon recent — SMS non mis a jour\n- Procedures evacuation non executees — instructions contradictoires",
      lessons:"- Verification systematique des systemes d'alarme apres changement pavillon/equipage\n- Formation obligatoire sur le systeme alarme specifique du navire (SOLAS II-2/14)\n- Tests periodiques de tous les detecteurs et relais passerelle\n- Interdiction d'acquitter une alarme sans investigation physique\n- ISM Code : formation documentee de chaque membre d'equipage",
      link:"Lien L4 AMS : Le Scandinavian Star demontre qu'un AMS non teste et un equipage non forme sont plus dangereux qu'un systeme absent. Chaque alarme doit etre testee periodiquement, chaque marin forme sur le systeme specifique du navire."},
    en:{title:"MV Scandinavian Star — North Sea (1990)",teaser:"Ferry — Criminal fire — 158 deaths — Defective alarm system — Untrained crew",
      what:"On April 7, 1990, a criminal fire broke out aboard the ferry Scandinavian Star (383 passengers). The fire alarm system had serious defects: non-functional detectors in some areas, alarms acknowledged without physical verification, faulty bridge transfer. The crew — recently recruited after a flag change — did not know the ship's alarm system. The 158 victims died mainly from asphyxiation, due to lack of rapid evacuation.",
      cause:"- Non-functional alarm detectors in several areas\n- Alarms acknowledged without physical investigation\n- Faulty alarm transfer to bridge\n- Crew without training on vessel-specific alarm system\n- Recent flag change — SMS not updated\n- Evacuation procedures not executed — contradictory instructions",
      lessons:"- Systematic verification of alarm systems after flag/crew change\n- Mandatory training on vessel-specific alarm system (SOLAS II-2/14)\n- Periodic testing of all detectors and bridge relays\n- Prohibition of acknowledging alarm without physical investigation\n- ISM Code: documented training of each crew member",
      link:"L4 AMS Link: Scandinavian Star demonstrates that an untested AMS and an untrained crew are more dangerous than no system. Every alarm must be periodically tested, every sailor trained on the vessel-specific system."},
    es:{title:"MV Scandinavian Star — Mar del Norte (1990)",teaser:"Ferry — Incendio criminal — 158 muertos — Sistema alarma defectuoso — Tripulacion sin formacion",
      what:"El 7 de abril de 1990, un incendio criminal a bordo del ferry. El sistema de alarma tenia defectos graves: detectores no funcionales, alarmas acusadas sin verificacion fisica, transferencia al puente defectuosa. La tripulacion no conocia el sistema de alarma. 158 victimas por asfixia.",
      cause:"- Detectores no funcionales en varias zonas\n- Alarmas acusadas sin investigacion fisica\n- Transferencia al puente defectuosa\n- Tripulacion sin formacion en sistema especifico del buque\n- Cambio de pabellon reciente — SMS no actualizado",
      lessons:"- Verificacion sistematica tras cambio pabellon/tripulacion\n- Formacion obligatoria sistema alarma especifico (SOLAS II-2/14)\n- Pruebas periodicas detectores y relés puente\n- Prohibicion acusar alarma sin investigacion fisica",
      link:"Vinculo L4 AMS: El Scandinavian Star demuestra que un AMS no probado y tripulacion sin formacion son mas peligrosos que ningun sistema."},
    pt:{title:"MV Scandinavian Star — Mar do Norte (1990)",teaser:"Ferry — Incendio criminoso — 158 mortos — Sistema alarme defeituoso — Tripulacao sem formacao",
      what:"A 7 de abril de 1990, incendio criminoso a bordo do ferry. O sistema de alarme tinha defeitos graves: detectores nao funcionais, alarmes acusados sem verificacao fisica, transferencia para a ponte defeituosa. A tripulacao nao conhecia o sistema de alarme. 158 vitimas por asfixia.",
      cause:"- Detectores nao funcionais em varias areas\n- Alarmes acusados sem investigacao fisica\n- Transferencia para a ponte defeituosa\n- Tripulacao sem formacao no sistema especifico do navio\n- Mudanca de bandeira recente — SMS nao atualizado",
      lessons:"- Verificacao sistematica apos mudanca bandeira/tripulacao\n- Formacao obrigatoria sistema alarme especifico (SOLAS II-2/14)\n- Testes periodicos detectores e reles ponte\n- Proibicao de acusar alarme sem investigacao fisica",
      link:"Ligacao L4 AMS: O Scandinavian Star demonstra que um AMS nao testado e tripulacao sem formacao sao mais perigosos do que nenhum sistema."},
  };
  const c=d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${red}50`,borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:red2,marginBottom:2,fontFamily:"'Cinzel',serif"}}>{c.title}</div>
            <div style={{fontSize:11,color:muted,lineHeight:1.4}}>{c.teaser}</div>
          </div>
          <span style={{fontSize:16,color:muted,fontWeight:700}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp && (
        <div style={{padding:"0 16px 16px"}}>
          <div style={{fontSize:12,color:white,lineHeight:1.75,marginBottom:12}}>{c.what}</div>
          <div style={{fontSize:11,color:red2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>CAUSES</div>
          <div style={{fontSize:12,color:white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.cause}</div>
          <div style={{fontSize:11,color:green2,fontWeight:800,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
            {lang==="fr"?"LECONS APPRISES":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES APRENDIDAS":"LICOES APRENDIDAS"}
          </div>
          <div style={{fontSize:12,color:white,lineHeight:1.75,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
          <div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,179,0,0.08)",
            border:`1px solid ${amber}44`,fontSize:11,color:amber2,lineHeight:1.7}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ DATA
// ══════════════════════════════════════
const QUIZ={
  fr:[
    {q:"Que signifie AMS et combien de points d'alarme sur un VLCC ?",opts:["Alarm Monitoring System — > 1 000 points","Alarm Master System — 100 points","Automatic Marine System — 500 points","Alert Monitor Station — 50 points"],ans:0,expl:"AMS = Alarm Monitoring System. Un VLCC moderne peut avoir 1 000 a 5 000 points d'alarme : paliers, pressions, temperatures, niveaux, vibrations, detection feu/gaz. Fabricants : Kongsberg, Wartsila NACOS, ABB."},
    {q:"SOLAS II-1/51 en mode UMS : une alarme non acquittee en 30s :",opts:["Arrete automatiquement le moteur","Est transferee automatiquement vers la passerelle (OOW)","Declenche le systeme CO2","Appelle le chef mecanicien uniquement"],ans:1,expl:"SOLAS II-1 Reg. 51 : transfert automatique a la passerelle (OOW) si non acquittee en 30 secondes. L'OOW doit verifier et appeler l'officier mecanicien de quart."},
    {q:"Que detecte l'OMD (Oil Mist Detector) ?",opts:["Qualite de l'huile","Concentration brouillard huile dans carter — risque explosion","Niveau huile reservoir","Fuites huile externes"],ans:1,expl:"L'OMD detecte la concentration de brouillard d'huile dans le carter. Concentration elevee = echauffement anormal des pieces en mouvement = risque explosion carter. Declenche slow-down puis shutdown."},
    {q:"Le MV Scandinavian Star (1990) a cause 158 morts car :",opts:["Le ME etait defaillant","Detecteurs non fonctionnels + alarmes ACK sans verif + equipage non forme","Le telegraph etait bloque","Le carburant etait epuise"],ans:1,expl:"Triple defaillance : detecteurs non fonctionnels, alarmes acquittees sans investigation physique, equipage sans formation sur le systeme specifique apres changement de pavillon. Lecon cle ISM Code."},
    {q:"La maintenance predictive via AMS permet :",opts:["De remplacer toutes les pieces periodiquement","D'analyser les tendances pour intervenir avant la panne — 70% moins de pannes selon DNV","De reduire le nombre d'alarmes","D'eliminer les rondes UMS"],ans:1,expl:"La maintenance predictive analyse les tendances AMS (vibrations, temperatures, pressions) pour detecter les signes avant-coureurs de panne. Reduction de 70% des immobilisations non planifiees selon DNV GL."},
  ],
  en:[
    {q:"What does AMS mean and how many alarm points on a VLCC?",opts:["Alarm Monitoring System — > 1,000 points","Alarm Master System — 100 points","Automatic Marine System — 500 points","Alert Monitor Station — 50 points"],ans:0,expl:"AMS = Alarm Monitoring System. A modern VLCC can have 1,000 to 5,000 alarm points: bearings, pressures, temperatures, levels, vibrations, fire/gas detection. Manufacturers: Kongsberg, Wartsila NACOS, ABB."},
    {q:"SOLAS II-1/51 in UMS mode: alarm not acknowledged in 30s:",opts:["Automatically stops the engine","Is automatically transferred to the bridge (OOW)","Activates CO2 system","Calls chief engineer only"],ans:1,expl:"SOLAS II-1 Reg. 51: automatic transfer to bridge (OOW) if not acknowledged in 30 seconds. OOW must verify and call the duty engineer."},
    {q:"What does the OMD (Oil Mist Detector) detect?",opts:["Oil quality","Crankcase oil mist concentration — explosion risk","Oil reservoir level","External oil leaks"],ans:1,expl:"OMD detects oil mist concentration in crankcase. High concentration = abnormal heating of moving parts = crankcase explosion risk. Triggers slow-down then shutdown."},
    {q:"MV Scandinavian Star (1990) caused 158 deaths because:",opts:["ME was faulty","Non-functional detectors + alarms ACK without verification + untrained crew","Telegraph was stuck","Fuel was exhausted"],ans:1,expl:"Triple failure: non-functional detectors, alarms acknowledged without physical investigation, crew untrained on specific system after flag change. Key ISM Code lesson."},
    {q:"Predictive maintenance via AMS enables:",opts:["Replacing all parts periodically","Analyzing trends to intervene before failure — 70% fewer breakdowns per DNV","Reducing alarm count","Eliminating UMS rounds"],ans:1,expl:"Predictive maintenance analyzes AMS trends (vibrations, temperatures, pressures) to detect early warning signs of failure. 70% reduction in unplanned downtime per DNV GL."},
  ],
  es:[
    {q:"?Que significa AMS y cuantos puntos de alarma en un VLCC?",opts:["Alarm Monitoring System — > 1.000 puntos","Alarm Master System — 100 puntos","Automatic Marine System — 500 puntos","Alert Monitor Station — 50 puntos"],ans:0,expl:"AMS = Alarm Monitoring System. Un VLCC moderno puede tener 1.000 a 5.000 puntos de alarma. Fabricantes: Kongsberg, Wartsila NACOS, ABB."},
    {q:"SOLAS II-1/51 modo UMS: alarma no acusada en 30s:",opts:["Para automaticamente el motor","Se transfiere automaticamente al puente (OOW)","Activa sistema CO2","Llama al jefe de maquinas solo"],ans:1,expl:"SOLAS II-1 Reg.51: transferencia automatica al puente (OOW) si no acusada en 30 segundos."},
    {q:"?Que detecta el OMD (Oil Mist Detector)?",opts:["Calidad del aceite","Concentracion niebla aceite en carter — riesgo explosion","Nivel deposito aceite","Fugas externas"],ans:1,expl:"El OMD detecta la concentracion de niebla de aceite en el carter. Alta concentracion = riesgo explosion. Activa slow-down y shutdown."},
    {q:"El MV Scandinavian Star (1990) — 158 muertos porque:",opts:["ME averiado","Detectores no funcionales + ACK sin verificacion + tripulacion sin formacion","Telegrafo bloqueado","Combustible agotado"],ans:1,expl:"Triple fallo: detectores no funcionales, alarmas acusadas sin investigacion, tripulacion sin formacion tras cambio pabellon."},
    {q:"El mantenimiento predictivo via AMS permite:",opts:["Reemplazar todas las piezas","Analizar tendencias para intervenir antes de averia — 70% menos paradas segun DNV","Reducir alarmas","Eliminar rondas UMS"],ans:1,expl:"El mantenimiento predictivo analiza tendencias AMS para detectar senales precursoras. Reduccion del 70% en paradas no planificadas segun DNV GL."},
  ],
  pt:[
    {q:"O que significa AMS e quantos pontos de alarme num VLCC?",opts:["Alarm Monitoring System — > 1.000 pontos","Alarm Master System — 100 pontos","Automatic Marine System — 500 pontos","Alert Monitor Station — 50 pontos"],ans:0,expl:"AMS = Alarm Monitoring System. Um VLCC moderno pode ter 1.000 a 5.000 pontos de alarme. Fabricantes: Kongsberg, Wartsila NACOS, ABB."},
    {q:"SOLAS II-1/51 modo UMS: alarme nao acusado em 30s:",opts:["Para automaticamente o motor","E transferido automaticamente para a ponte (OOW)","Ativa sistema CO2","Chama chefe de maquinas apenas"],ans:1,expl:"SOLAS II-1 Reg.51: transferencia automatica para a ponte (OOW) se nao acusado em 30 segundos."},
    {q:"O que deteta o OMD (Oil Mist Detector)?",opts:["Qualidade do oleo","Concentracao nevoa oleo no carter — risco explosao","Nivel deposito oleo","Fugas externas"],ans:1,expl:"O OMD deteta a concentracao de nevoa de oleo no carter. Alta concentracao = risco explosao. Aciona slow-down e shutdown."},
    {q:"O MV Scandinavian Star (1990) — 158 mortos porque:",opts:["ME avariado","Detectores nao funcionais + ACK sem verificacao + tripulacao sem formacao","Telegrafo bloqueado","Combustivel esgotado"],ans:1,expl:"Tripla falha: detectores nao funcionais, alarmes acusados sem investigacao, tripulacao sem formacao apos mudanca de bandeira."},
    {q:"A manutencao preditiva via AMS permite:",opts:["Substituir todas as pecas","Analisar tendencias para intervir antes da avaria — 70% menos paragens segundo DNV","Reduzir alarmes","Eliminar rondas UMS"],ans:1,expl:"A manutencao preditiva analisa tendencias AMS para detetar sinais precursores. Reducao de 70% nas paragens nao planeadas segundo DNV GL."},
  ],
};

// ══════════════════════════════════════
// MAIN EXPORT — ARCHITECTURE L1 EXACTE
// ══════════════════════════════════════
export default function LessonE7_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  useEffect(()=>{if(typeof window!=="undefined")window.__MAP_LANG__=lang;},[lang]);
  const t=T[lang]||T.fr;
  const quiz=QUIZ[lang]||QUIZ.fr;
  const lc=getContent(lang);
  const [phase,setPhase]=useState("content");
  const [quizScore,setQuizScore]=useState(0);
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  const trophy=getTrophy(quizScore,5);
  const bg0="#03070f"; const bg1="#060e1a"; const bg2="#0a1628";
  const cyan="#00e5ff"; const amber="#ffb300"; const gold="#c9922a"; const gold2="#e8b94f";
  const red="#ff1744"; const green="#00e676"; const purple2="#ea80fc";
  const white="#f0f4ff"; const muted="rgba(176,190,197,0.7)"; const dim="rgba(176,190,197,0.35)";
  const border="rgba(0,229,255,0.18)";

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",
      background:`linear-gradient(160deg,${bg0} 0%,${bg1} 40%,${bg2} 100%)`,
      color:white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* HEADER — architecture exacte L1 */}
      <div style={{position:"relative",zIndex:100,background:"rgba(3,7,15,0.97)",
        backdropFilter:"blur(16px)",borderBottom:`1px solid ${border}`}}>
        <div style={{height:56,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack}
            style={{background:"rgba(0,229,255,0.08)",border:`1px solid ${border}`,
              borderRadius:11,padding:"8px 14px",color:cyan,fontSize:13,fontWeight:800,cursor:"pointer"}}>
            {t.back}
          </button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:cyan,letterSpacing:1.5,fontFamily:"'Cinzel',serif",fontWeight:800}}>
              ⚓ {t.module}
            </div>
            <div style={{fontSize:10,color:muted}}>
              {lang==="fr"?"Lecon 4/5":lang==="en"?"Lesson 4/5":lang==="es"?"Leccion 4/5":"Licao 4/5"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{padding:"3px 9px",borderRadius:20,background:"rgba(255,179,0,0.15)",
              border:`1px solid ${amber}44`,fontSize:9,color:amber,fontWeight:800,letterSpacing:1}}>
              PREMIUM+
            </span>
            <span style={{fontSize:11,color:cyan,fontFamily:"'Cinzel',serif",fontWeight:700}}>
              {progress}%
            </span>
          </div>
        </div>
        <div style={{height:3,background:"rgba(0,229,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,
            background:`linear-gradient(90deg,${cyan},${amber})`,
            transition:"width 0.5s ease",boxShadow:`0 0 8px ${cyan}`}}/>
        </div>
      </div>

      {/* SCROLL CONTENT */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 50px",position:"relative",zIndex:1,
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all 0.55s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,
              marginBottom:12,background:"rgba(0,229,255,0.1)",border:`1px solid ${cyan}44`,
              fontSize:10,color:cyan,fontWeight:700}}>
              {lc.badge}
            </div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:21,fontWeight:800,color:white,
              lineHeight:1.3,margin:"0 0 18px",textShadow:`0 0 40px ${cyan}30`}}>
              {lc.title}
            </h1>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${cyan}44`,
              borderLeft:`3px solid ${cyan}`,borderRadius:20,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.88)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </div>

            {[
              {icon:"🖥️",p:lc.p1,s:lc.s1t,content:lc.s1,color:cyan,
                svg:<AMSArchSVG/>,
                svgLabel:lang==="fr"?"ARCHITECTURE AMS — INTERACTIF":lang==="en"?"AMS ARCHITECTURE — INTERACTIVE":lang==="es"?"ARQUITECTURA AMS — INTERACTIVO":"ARQUITETURA AMS — INTERATIVO"},
              {icon:"🔔",p:lc.p2,s:lc.s2t,content:lc.s2,color:red,
                svg:<AlarmPanelSVG/>,
                svgLabel:lang==="fr"?"PANNEAU ALARMES — INTERACTIF":lang==="en"?"ALARM PANEL — INTERACTIVE":lang==="es"?"PANEL ALARMAS — INTERACTIVO":"PAINEL ALARMES — INTERATIVO"},
              {icon:"🛳️",p:lc.p3,s:lc.s3t,content:lc.s3,color:green,
                svg:<BridgeIntegrationSVG/>,
                svgLabel:lang==="fr"?"INTEGRATION PASSERELLE — INTERACTIF":lang==="en"?"BRIDGE INTEGRATION — INTERACTIVE":lang==="es"?"INTEGRACION PUENTE — INTERACTIVO":"INTEGRACAO PONTE — INTERATIVO"},
              {icon:"📈",p:lc.p4,s:lc.s4t,content:lc.s4,color:purple2,
                svg:<TrendSVG/>,
                svgLabel:lang==="fr"?"MAINTENANCE PREDICTIVE — INTERACTIF":lang==="en"?"PREDICTIVE MAINTENANCE — INTERACTIVE":lang==="es"?"MANTENIMIENTO PREDICTIVO — INTERACTIVO":"MANUTENCAO PREDITIVA — INTERATIVO"},
            ].map((sec,i)=>(
              <div key={i}>
                <SL icon={sec.icon} text={sec.p} color={sec.color}/>
                <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${sec.color}22`,
                  borderRadius:20,padding:"16px",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span style={{fontSize:22}}>{sec.icon}</span>
                    <span style={{fontSize:14,fontWeight:800,color:white}}>{sec.s}</span>
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

            <SL icon="🎯" text={lc.p5} color={gold2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${amber}55`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <Exercise1 lang={lang} t={t}/>
            </div>

            <SL icon="⚠️" text={lc.p6} color={red}/>
            <div style={{marginBottom:18}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={purple2}/>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${purple2}44`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <QuestionBank lang={lang}/>
            </div>

            {/* RESUME — toujours visible */}
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:cyan,letterSpacing:2.5,fontFamily:"'Cinzel',serif",
                marginBottom:14,fontWeight:800}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",
                  borderBottom:i<lc.sumP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:white}}>
                  <span style={{color:cyan,fontWeight:900,flexShrink:0,marginTop:1}}>✓</span>{pt}
                </div>
              ))}
            </div>

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"18px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${cyan},${amber})`,
                fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:900,letterSpacing:2,
                color:bg0,cursor:"pointer",boxShadow:`0 10px 40px rgba(0,229,255,0.35)`,marginTop:4}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:dim,marginTop:10}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:800,color:white,marginBottom:4}}>
                {lang==="fr"?"Quiz — AMS & Alarmes":lang==="en"?"Quiz — AMS & Alarms":lang==="es"?"Quiz — AMS & Alarmas":"Quiz — AMS & Alarmes"}
              </div>
              <div style={{fontSize:12,color:muted}}>5 questions · e7 L4</div>
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
              <div style={{fontSize:32,fontWeight:900,color:white,marginBottom:4}}>{quizScore}/5</div>
              <div style={{fontSize:20,color:trophy.color,fontWeight:800,marginBottom:18}}>
                {Math.round(quizScore/5*100)}%
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:6,
                margin:"0 24px 20px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${quizScore/5*100}%`,
                  background:`linear-gradient(90deg,${cyan},${trophy.color})`,
                  borderRadius:6,transition:"width 0.9s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",
                borderRadius:20,background:`rgba(0,229,255,0.1)`,border:`1px solid ${cyan}44`,
                fontSize:14,color:cyan,fontWeight:800}}>
                +{quizScore>=4?250:quizScore===3?150:90} {t.xp} ⭐
              </div>
            </div>
            <div style={{background:"rgba(10,22,40,0.92)",border:`1px solid ${cyan}33`,
              borderRadius:20,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:11,color:muted,marginBottom:12,fontFamily:"'Cinzel',serif",
                letterSpacing:1,fontWeight:700}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",
                  borderBottom:i<lc.learnedP.length-1?"1px solid rgba(0,229,255,0.08)":"none",
                  fontSize:12,color:white}}>
                  <span style={{color:cyan,fontWeight:900}}>✓</span>{pt}
                </div>
              ))}
            </div>
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:18,
                background:`linear-gradient(135deg,${cyan},${amber})`,
                fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:900,letterSpacing:2,
                color:bg0,cursor:"pointer",boxShadow:`0 8px 30px rgba(0,229,255,0.3)`,marginBottom:12}}>
              {lang==="fr"?"LECON 5 — CYBERSECURITE =>":lang==="en"?"LESSON 5 — CYBERSECURITY =>":lang==="es"?"LECCION 5 — CIBERSEGURIDAD =>":"LICAO 5 — CIBERSEGURANCA =>"}
            </button>
            <button onClick={onBack}
              style={{width:"100%",padding:"12px 0",border:`1px solid rgba(0,229,255,0.15)`,
                borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,
                color:muted,cursor:"pointer"}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
