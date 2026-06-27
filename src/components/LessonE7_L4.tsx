import { useState, useEffect, useRef } from "react";

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

// ─────────────────────────────────────────────
//  COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────
export default function LessonE7_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {

  useEffect(() => {
    if (typeof window !== "undefined") window.__MAP_LANG__ = lang;
  }, [lang]);

  const t = (fr,en,es,pt) => ({fr,en,es,pt}[lang]||fr);

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const [exAnswers, setExAnswers] = useState({});
  const [qbOpen, setQbOpen] = useState(null);
  const [qbAnswers, setQbAnswers] = useState({});
  const [accidentOpen, setAccidentOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const quizQs = [
    { q: t("Que signifie AMS en contexte maritime ?",
        "What does AMS mean in maritime context?",
        "Que significa AMS en contexto maritimo?",
        "O que significa AMS no contexto maritimo?"),
      opts:[
        t("Alarm Monitoring System","Alarm Monitoring System","Alarm Monitoring System","Alarm Monitoring System"),
        t("Automated Management System","Automated Management System","Automated Management System","Automated Management System"),
        t("Auxiliary Motor System","Auxiliary Motor System","Auxiliary Motor System","Auxiliary Motor System"),
        t("Alarm Muster Station","Alarm Muster Station","Alarm Muster Station","Alarm Muster Station"),
      ], correct:0
    },
    { q: t("Selon SOLAS II-1/51, que doit faire l'AMS en mode UMS si une alarme n'est pas acquittée en 30 secondes ?",
        "According to SOLAS II-1/51, what must AMS do in UMS mode if an alarm is not acknowledged within 30 seconds?",
        "Segun SOLAS II-1/51, que debe hacer el AMS en modo UMS si una alarma no se acusa en 30 segundos?",
        "Segundo SOLAS II-1/51, o que deve fazer o AMS em modo UMS se um alarme nao for acusado em 30 segundos?"),
      opts:[
        t("Couper automatiquement le moteur","Automatically stop the engine","Parar automaticamente el motor","Parar automaticamente o motor"),
        t("Relayer l'alarme à la passerelle","Relay the alarm to the bridge","Retransmitir la alarma al puente","Retransmitir o alarme a ponte"),
        t("Activer le système CO2","Activate the CO2 system","Activar el sistema CO2","Ativar o sistema CO2"),
        t("Appeler le capitaine","Call the captain","Llamar al capitan","Chamar o capitao"),
      ], correct:1
    },
    { q: t("Quelle norme définit les 4 niveaux de priorité des alarmes ?",
        "Which standard defines the 4 alarm priority levels?",
        "Que norma define los 4 niveles de prioridad de alarmas?",
        "Qual norma define os 4 niveis de prioridade de alarmes?"),
      opts:["SOLAS II-1","IEC 61511 / IMO MSC.1/Circ.1432","STCW Reg. III/1","MARPOL Annex VI"], correct:1
    },
    { q: t("Qu'est-ce que le Dead Man Alarm (DMA) en mode UMS ?",
        "What is the Dead Man Alarm (DMA) in UMS mode?",
        "Que es el Dead Man Alarm (DMA) en modo UMS?",
        "O que e o Dead Man Alarm (DMA) no modo UMS?"),
      opts:[
        t("Alarme déclenchée par la mort d'un marin","Alarm triggered by a sailor's death","Alarma activada por muerte de un marinero","Alarme acionada pela morte de um marinheiro"),
        t("Système de confirmation de présence de l'officier mécanicien toutes les 30 min","Engineer officer presence confirmation system every 30 min","Sistema de confirmacion de presencia del oficial de maquinas cada 30 min","Sistema de confirmacao de presenca do oficial de maquinas a cada 30 min"),
        t("Alarme de pression carter","Crankcase pressure alarm","Alarma de presion del carter","Alarme de pressao do carter"),
        t("Alarme d'incendie salle des machines","Engine room fire alarm","Alarma de incendio sala de maquinas","Alarme de incendio sala de maquinas"),
      ], correct:1
    },
    { q: t("Qu'est-ce que la maintenance prédictive en salle des machines ?",
        "What is predictive maintenance in the engine room?",
        "Que es el mantenimiento predictivo en la sala de maquinas?",
        "O que e manutencao preditiva na sala de maquinas?"),
      opts:[
        t("Maintenance effectuée après une panne","Maintenance performed after a breakdown","Mantenimiento realizado tras una averia","Manutencao realizada apos uma avaria"),
        t("Maintenance à intervalles fixes selon le fabricant","Maintenance at fixed intervals per manufacturer","Mantenimiento a intervalos fijos segun fabricante","Manutencao em intervalos fixos segundo fabricante"),
        t("Analyse des tendances pour anticiper les défaillances avant qu'elles surviennent","Trend analysis to anticipate failures before they occur","Analisis de tendencias para anticipar fallos antes de que ocurran","Analise de tendencias para antecipar falhas antes de ocorrerem"),
        t("Remplacement systématique de toutes les pièces","Systematic replacement of all parts","Reemplazo sistematico de todas las piezas","Substituicao sistematica de todas as pecas"),
      ], correct:2
    },
  ];

  const qBank = [
    { q:t("Quelle est la différence entre un capteur PT et TT ?","What is the difference between a PT and TT sensor?","Cual es la diferencia entre un sensor PT y TT?","Qual e a diferenca entre um sensor PT e TT?"),
      opts:[t("PT = pression, TT = température","PT = pressure, TT = temperature","PT = presion, TT = temperatura","PT = pressao, TT = temperatura"),t("PT = température, TT = pression","PT = temperature, TT = pressure","PT = temperatura, TT = presion","PT = temperatura, TT = pressao"),t("PT = pression totale, TT = température totale","PT = total pressure, TT = total temperature","PT = presion total, TT = temperatura total","PT = pressao total, TT = temperatura total"),t("Synonymes","Synonyms","Sinonimos","Sinonimos")],correct:0,
      exp:t("PT (Pressure Transmitter) mesure la pression. TT (Temperature Transmitter) mesure la température. Tous deux transmettent généralement un signal 4-20mA à l'AMS.","PT (Pressure Transmitter) measures pressure. TT (Temperature Transmitter) measures temperature. Both typically transmit a 4-20mA signal to the AMS.","PT (Pressure Transmitter) mide la presion. TT (Temperature Transmitter) mide la temperatura. Ambos transmiten tipicamente una senal 4-20mA al AMS.","PT (Pressure Transmitter) mede pressao. TT (Temperature Transmitter) mede temperatura. Ambos tipicamente transmitem sinal 4-20mA ao AMS.")
    },
    { q:t("Qu'est-ce que le principe N+1 en redondance AMS ?","What is the N+1 principle in AMS redundancy?","Que es el principio N+1 en redundancia AMS?","O que e o principio N+1 em redundancia AMS?"),
      opts:[t("Un composant de rechange pour chaque composant critique","One spare component for each critical component","Un componente de repuesto para cada componente critico","Um componente sobressalente para cada componente critico"),t("N composants actifs + 1 en standby prêt à prendre le relais","N active components + 1 standby ready to take over","N componentes activos + 1 en espera listo para asumir","N componentes ativos + 1 em espera pronto para assumir"),t("Jamais plus de N+1 alarmes simultanées","Never more than N+1 simultaneous alarms","Nunca mas de N+1 alarmas simultaneas","Nunca mais de N+1 alarmes simultaneos"),t("N capteurs par paramètre","N sensors per parameter","N sensores por parametro","N sensores por parametro")],correct:1,
      exp:t("N+1 signifie qu'il y a toujours au moins un système de secours opérationnel. Si le CPU principal tombe, le CPU secondaire prend le relais en moins de 100ms sans perte de données.","N+1 means there is always at least one backup system operational. If the primary CPU fails, the secondary CPU takes over in less than 100ms without data loss.","N+1 significa que siempre hay al menos un sistema de respaldo operacional. Si el CPU principal falla, el CPU secundario asume en menos de 100ms sin perdida de datos.","N+1 significa que sempre ha pelo menos um sistema de backup operacional. Se o CPU principal falhar, o CPU secundario assume em menos de 100ms sem perda de dados.")
    },
    { q:t("Quelle est la différence entre une alarme de catégorie 1 (P1) et 4 (P4) ?","What is the difference between a category 1 (P1) and 4 (P4) alarm?","Cual es la diferencia entre una alarma de categoria 1 (P1) y 4 (P4)?","Qual e a diferenca entre um alarme de categoria 1 (P1) e 4 (P4)?"),
      opts:[t("P1 = sonore, P4 = visuel seulement","P1 = audible, P4 = visual only","P1 = sonora, P4 = solo visual","P1 = sonoro, P4 = somente visual"),t("P1 = danger immediat securite/environnement, P4 = information non urgente","P1 = immediate safety/environmental danger, P4 = non-urgent information","P1 = peligro inmediato seguridad/medio ambiente, P4 = informacion no urgente","P1 = perigo imediato seguranca/ambiente, P4 = informacao nao urgente"),t("P1 = machine, P4 = pont","P1 = engine, P4 = deck","P1 = maquinas, P4 = cubierta","P1 = maquinas, P4 = convés"),t("P1 et P4 sont identiques","P1 and P4 are identical","P1 y P4 son identicos","P1 e P4 sao identicos")],correct:1,
      exp:t("P1 = danger immédiat pour la sécurité des personnes ou de l'environnement (ex: basse pression huile). P4 = information de routine non urgente (ex: filtre à changer prochainement).","P1 = immediate danger to personnel safety or environment (e.g.: low oil pressure). P4 = non-urgent routine information (e.g.: filter due for change soon).","P1 = peligro inmediato para la seguridad de las personas o el medio ambiente (ej: baja presion aceite). P4 = informacion rutinaria no urgente (ej: filtro a cambiar proximamente).","P1 = perigo imediato a seguranca das pessoas ou ambiente (ex: baixa pressao oleo). P4 = informacao rotineira nao urgente (ex: filtro a ser trocado em breve).")
    },
    { q:t("Qu'est-ce qu'un OMD (Oil Mist Detector) ?","What is an OMD (Oil Mist Detector)?","Que es un OMD (Oil Mist Detector)?","O que e um OMD (Oil Mist Detector)?"),
      opts:[t("Détecteur de fuite d'huile sur le pont","Oil leak detector on deck","Detector de fuga de aceite en cubierta","Detector de vazamento de oleo no convés"),t("Détecteur de concentration de brouillard d'huile dans le carter — prévention explosion","Crankcase oil mist concentration detector — explosion prevention","Detector de concentracion de niebla de aceite en el carter — prevencion explosiones","Detector de concentracao de nevoa de oleo no carter — prevencao de explosao"),t("Analyseur de qualité du carburant","Fuel quality analyzer","Analizador de calidad del combustible","Analisador de qualidade do combustivel"),t("Moniteur de consommation d'huile","Oil consumption monitor","Monitor de consumo de aceite","Monitor de consumo de oleo")],correct:1,
      exp:t("L'OMD détecte la concentration de brouillard d'huile dans le carter. Une concentration élevée indique un échauffement anormal des pièces en mouvement, signalant un risque d'explosion du carter. Déclenche un slow-down ou shutdown.","The OMD detects oil mist concentration in the crankcase. High concentration indicates abnormal heating of moving parts, signaling crankcase explosion risk. Triggers a slow-down or shutdown.","El OMD detecta la concentracion de niebla de aceite en el carter. Alta concentracion indica calentamiento anormal de piezas moviles, senalando riesgo de explosion del carter. Activa reduccion o parada.","O OMD detecta concentracao de nevoa de oleo no carter. Alta concentracao indica aquecimento anormal de pecas moveis, sinalizando risco de explosao do carter. Aciona reducao ou parada.")
    },
    { q:t("En mode UMS, quelle est la fréquence minimale de confirmation de présence pour le DMA ?","In UMS mode, what is the minimum presence confirmation frequency for the DMA?","En modo UMS, cual es la frecuencia minima de confirmacion de presencia para el DMA?","No modo UMS, qual e a frequencia minima de confirmacao de presenca para o DMA?"),
      opts:["15 minutes","30 minutes","60 minutes","2 heures"],correct:1,
      exp:t("Le Dead Man Alarm exige une confirmation de présence toutes les 30 minutes en mode UMS. Sans confirmation, une alarme est émise à la passerelle, qui doit envoyer quelqu'un en salle des machines.","The Dead Man Alarm requires presence confirmation every 30 minutes in UMS mode. Without confirmation, an alarm is issued on the bridge, which must send someone to the engine room.","El Dead Man Alarm exige confirmacion de presencia cada 30 minutos en modo UMS. Sin confirmacion, se emite una alarma en el puente, que debe enviar a alguien a la sala de maquinas.","O Dead Man Alarm exige confirmacao de presenca a cada 30 minutos no modo UMS. Sem confirmacao, um alarme e emitido na ponte, que deve enviar alguem a sala de maquinas.")
    },
    { q:t("Qu'est-ce que l'alarm flooding ?","What is alarm flooding?","Que es el alarm flooding?","O que e o alarm flooding?"),
      opts:[t("Une alarme déclenchée par une inondation","An alarm triggered by flooding","Una alarma activada por inundacion","Um alarme acionado por inundacao"),t("Trop d'alarmes simultanées rendant difficile l'identification du problème réel","Too many simultaneous alarms making it difficult to identify the real problem","Demasiadas alarmas simultaneas dificultando identificar el problema real","Muitos alarmes simultaneos dificultando identificar o problema real"),t("Un filtre pour réduire les alarmes","A filter to reduce alarms","Un filtro para reducir alarmas","Um filtro para reduzir alarmes"),t("Alarme de niveau d'eau dans la cale","Bilge water level alarm","Alarma de nivel de agua en sentina","Alarme de nivel de agua na sentina")],correct:1,
      exp:t("L'alarm flooding est la saturation de l'opérateur par un trop grand nombre d'alarmes simultanées. Les normes IMO limitent les alarmes simultanées à 10 par minute maximum pour préserver la capacité de réaction de l'opérateur.","Alarm flooding is operator saturation by too many simultaneous alarms. IMO standards limit simultaneous alarms to a maximum of 10 per minute to preserve operator reaction capacity.","El alarm flooding es la saturacion del operador por demasiadas alarmas simultaneas. Las normas IMO limitan las alarmas simultaneas a 10 por minuto maximo para preservar la capacidad de reaccion del operador.","O alarm flooding e a saturacao do operador por muitos alarmes simultaneos. Os padroes IMO limitam alarmes simultaneos a 10 por minuto no maximo para preservar a capacidade de reacao do operador.")
    },
    { q:t("Quelle est la différence entre maintenance corrective et prédictive ?","What is the difference between corrective and predictive maintenance?","Cual es la diferencia entre mantenimiento correctivo y predictivo?","Qual e a diferenca entre manutencao corretiva e preditiva?"),
      opts:[t("Elles sont identiques","They are identical","Son identicas","Sao identicas"),t("Corrective = après panne, Prédictive = analyse tendances pour anticiper","Corrective = after breakdown, Predictive = trend analysis to anticipate","Correctivo = tras averia, Predictivo = analisis tendencias para anticipar","Corretiva = apos avaria, Preditiva = analise tendencias para antecipar"),t("Corrective = planifiée, Prédictive = après panne","Corrective = planned, Predictive = after breakdown","Correctivo = planificado, Predictivo = tras averia","Corretiva = planejada, Preditiva = apos avaria"),t("La maintenance prédictive n'existe pas en marine","Predictive maintenance does not exist in maritime","El mantenimiento predictivo no existe en marina","Manutencao preditiva nao existe na marinha")],correct:1,
      exp:t("Corrective = réparer après la panne (coûteux, immobilisation). Préventive = à intervalles fixes. Prédictive = analyser les tendances (vibrations, températures, pressions) pour intervenir avant la panne.","Corrective = repair after breakdown (costly, downtime). Preventive = at fixed intervals. Predictive = analyze trends (vibrations, temperatures, pressures) to intervene before failure.","Correctivo = reparar tras averia (costoso, inmovilizacion). Preventivo = a intervalos fijos. Predictivo = analizar tendencias (vibraciones, temperaturas, presiones) para intervenir antes de la averia.","Corretiva = reparar apos avaria (custosa, imobilizacao). Preventiva = em intervalos fixos. Preditiva = analisar tendencias (vibracoes, temperaturas, pressoes) para intervir antes da avaria.")
    },
    { q:t("Que signifie un signal 4-20mA = 0 mA provenant d'un capteur ?","What does a 4-20mA = 0 mA signal from a sensor mean?","Que significa una senal 4-20mA = 0 mA de un sensor?","O que significa um sinal 4-20mA = 0 mA de um sensor?"),
      opts:[t("Valeur = 0 (minimum)","Value = 0 (minimum)","Valor = 0 (minimo)","Valor = 0 (minimo)"),t("Rupture de câble ou défaut électrique — alarme capteur défaillant","Cable break or electrical fault — faulty sensor alarm","Rotura de cable o fallo electrico — alarma sensor defectuoso","Ruptura de cabo ou falha eletrica — alarme sensor defeituoso"),t("Valeur normale","Normal value","Valor normal","Valor normal"),t("Déconnexion intentionnelle","Intentional disconnection","Desconexion intencional","Desconexao intencional")],correct:1,
      exp:t("La plage 4-20mA est choisie précisément pour permettre la détection des ruptures de câble. 0 mA est impossible en fonctionnement normal (minimum = 4 mA). Tout signal < 4 mA génère automatiquement une alarme de capteur défaillant.","The 4-20mA range is chosen precisely to allow cable break detection. 0 mA is impossible in normal operation (minimum = 4 mA). Any signal < 4 mA automatically generates a faulty sensor alarm.","El rango 4-20mA se elige precisamente para permitir la deteccion de roturas de cable. 0 mA es imposible en operacion normal (minimo = 4 mA). Cualquier senal < 4 mA genera automaticamente una alarma de sensor defectuoso.","A faixa 4-20mA e escolhida precisamente para permitir deteccao de ruptura de cabo. 0 mA e impossivel em operacao normal (minimo = 4 mA). Qualquer sinal < 4 mA gera automaticamente alarme de sensor defeituoso.")
    },
    { q:t("Quelle est la règle SOLAS concernant la redondance des systèmes d'alarme ?","What is the SOLAS rule regarding alarm system redundancy?","Cual es la regla SOLAS sobre redundancia de sistemas de alarma?","Qual e a regra SOLAS sobre redundancia de sistemas de alarme?"),
      opts:[t("Aucune redondance requise","No redundancy required","Sin redundancia requerida","Sem redundancia necessaria"),t("Redondance partielle pour les alarmes P3-P4","Partial redundancy for P3-P4 alarms","Redundancia parcial para alarmas P3-P4","Redundancia parcial para alarmes P3-P4"),t("Le systeme d'alarme doit rester operationnel en cas de defaillance unique (N+1)","Alarm system must remain operational in case of single failure (N+1)","El sistema de alarma debe permanecer operacional ante fallo unico (N+1)","O sistema de alarme deve permanecer operacional em caso de falha unica (N+1)"),t("Redondance uniquement pour les navires > 10,000 GT","Redundancy only for vessels > 10,000 GT","Redundancia solo para buques > 10.000 GT","Redundancia apenas para navios > 10.000 GT")],correct:2,
      exp:t("SOLAS exige qu'une défaillance unique dans le système d'alarme ne puisse pas causer la perte de surveillance d'un paramètre critique. D'où le principe N+1 avec CPU redondant et sources d'alimentation indépendantes.","SOLAS requires that a single failure in the alarm system cannot cause loss of monitoring of a critical parameter. Hence the N+1 principle with redundant CPU and independent power supplies.","SOLAS exige que un fallo unico en el sistema de alarma no pueda causar la perdida de vigilancia de un parametro critico. De ahi el principio N+1 con CPU redundante y fuentes de alimentacion independientes.","SOLAS exige que uma falha unica no sistema de alarme nao possa causar perda de monitoramento de parametro critico. Dai o principio N+1 com CPU redundante e fontes de alimentacao independentes.")
    },
    { q:t("Qu'est-ce que l'historique des alarmes (alarm log) ?","What is the alarm log (alarm history)?","Que es el historial de alarmas (alarm log)?","O que e o historico de alarmes (alarm log)?"),
      opts:[t("Un rapport mensuel imprimé","A monthly printed report","Un informe mensual impreso","Um relatorio mensal impresso"),t("Enregistrement horodaté de chaque alarme, acquittement et remise à zéro","Timestamped record of each alarm, acknowledgment and reset","Registro con marca de tiempo de cada alarma, acuse y reinicio","Registro com carimbo de hora de cada alarme, acuse e reinicio"),t("Liste des alarmes en cours seulement","List of current alarms only","Lista de alarmas actuales solamente","Lista de alarmes atuais somente"),t("Rapport hebdomadaire du chief engineer","Chief engineer weekly report","Informe semanal del jefe de maquinas","Relatorio semanal do chefe de maquinas")],correct:1,
      exp:t("L'alarm log enregistre : heure d'apparition, valeur au déclenchement, identité de l'opérateur ayant acquitté, heure de retour à l'état normal. Essentiel pour les enquêtes d'accident et les audits ISM.","The alarm log records: time of occurrence, value at trigger, identity of acknowledging operator, time of return to normal state. Essential for accident investigations and ISM audits.","El alarm log registra: hora de aparicion, valor en el disparo, identidad del operador que acuso, hora de retorno al estado normal. Esencial para investigaciones de accidentes y auditorias ISM.","O alarm log registra: hora de ocorrencia, valor no acionamento, identidade do operador que acusou, hora de retorno ao estado normal. Essencial para investigacoes de acidentes e auditorias ISM.")
    },
    { q:t("Que signifie ECR dans le contexte d'une salle des machines ?","What does ECR mean in engine room context?","Que significa ECR en el contexto de la sala de maquinas?","O que significa ECR no contexto da sala de maquinas?"),
      opts:["Emergency Control Room","Engine Control Room","Electrical Circuit Relay","Engine Combustion Regulator"],correct:1,
      exp:t("ECR = Engine Control Room : salle de contrôle machine depuis laquelle l'officier mécanicien supervise tous les paramètres. En mode UMS, l'ECR peut être sans personne la nuit, avec transfert alarmes vers cabines et passerelle.","ECR = Engine Control Room: engine control room from which the engineer officer monitors all parameters. In UMS mode, the ECR can be unmanned at night, with alarm transfer to cabins and bridge.","ECR = Engine Control Room: sala de control de maquinas desde la cual el oficial de maquinas supervisa todos los parametros. En modo UMS, el ECR puede estar sin personal de noche, con transferencia de alarmas a camarotes y puente.","ECR = Engine Control Room: sala de controle de maquinas de onde o oficial de maquinas supervisiona todos os parametros. No modo UMS, o ECR pode ficar sem pessoal a noite, com transferencia de alarmes para cabines e ponte.")
    },
    { q:t("Pourquoi limite-t-on les inhibitions d'alarme (alarm inhibit) ?","Why are alarm inhibitions (alarm inhibit) limited?","Por que se limitan las inhibiciones de alarma (alarm inhibit)?","Por que se limitam as inibicoes de alarme (alarm inhibit)?"),
      opts:[t("Pour économiser l'énergie","To save energy","Para ahorrar energia","Para economizar energia"),t("Une alarme inhibée peut masquer un danger réel — risque accident grave","An inhibited alarm can mask a real danger — serious accident risk","Una alarma inhibida puede enmascarar un peligro real — riesgo de accidente grave","Um alarme inibido pode mascarar perigo real — risco de acidente grave"),t("Parce que les alarmes consomment de la bande passante","Because alarms consume bandwidth","Porque las alarmas consumen ancho de banda","Porque alarmes consomem largura de banda"),t("Pour simplifier l'interface","To simplify the interface","Para simplificar la interfaz","Para simplificar a interface")],correct:1,
      exp:t("L'inhibition d'alarme (par ex. pendant maintenance) est nécessaire mais dangereuse. Chaque inhibition doit être documentée, limitée dans le temps, et approuvée. Les accidents comme l'explosion de Texas City (2005) ont montré les risques des alarmes inhibées trop longtemps.","Alarm inhibition (e.g. during maintenance) is necessary but dangerous. Each inhibition must be documented, time-limited, and approved. Accidents like Texas City explosion (2005) showed the risks of alarms inhibited too long.","La inhibicion de alarma (ej. durante mantenimiento) es necesaria pero peligrosa. Cada inhibicion debe ser documentada, limitada en el tiempo y aprobada. Accidentes como la explosion de Texas City (2005) mostraron los riesgos de alarmas inhibidas demasiado tiempo.","A inibicao de alarme (ex. durante manutencao) e necessaria mas perigosa. Cada inibicao deve ser documentada, limitada no tempo e aprovada. Acidentes como a explosao de Texas City (2005) mostraram os riscos de alarmes inibidos por muito tempo.")
    },
    { q:t("Quelle est la différence entre une alarme 'active' et 'dormante' ?","What is the difference between an 'active' and 'dormant' alarm?","Cual es la diferencia entre una alarma 'activa' y 'dormante'?","Qual e a diferenca entre um alarme 'ativo' e 'dormante'?"),
      opts:[t("Synonymes","Synonyms","Sinonimos","Sinonimos"),t("Active = condition anormale en cours, Dormante = condition revenue à normale mais non acquittée","Active = ongoing abnormal condition, Dormant = condition returned to normal but not acknowledged","Activa = condicion anormal en curso, Dormante = condicion vuelta a normal pero no acusada","Ativa = condicao anormal em curso, Dormante = condicao voltou ao normal mas nao acusada"),t("Active = acquittée, Dormante = non-acquittée","Active = acknowledged, Dormant = unacknowledged","Activa = acusada, Dormante = sin acusar","Ativa = acusada, Dormante = sem acuse"),t("Active = P1-P2, Dormante = P3-P4","Active = P1-P2, Dormant = P3-P4","Activa = P1-P2, Dormante = P3-P4","Ativa = P1-P2, Dormante = P3-P4")],correct:1,
      exp:t("Une alarme active indique que la condition anormale persiste. Une alarme dormante (ou mémorisée) signifie que la condition est revenue à la normale, mais l'opérateur n'a pas encore acquitté. Elle reste visible pour traçabilité.","An active alarm indicates the abnormal condition persists. A dormant (or memorized) alarm means the condition returned to normal, but the operator has not yet acknowledged. It remains visible for traceability.","Una alarma activa indica que la condicion anormal persiste. Una alarma dormante (o memorizada) significa que la condicion ha vuelto a la normalidad, pero el operador aun no ha acusado. Permanece visible por trazabilidad.","Um alarme ativo indica que a condicao anormal persiste. Um alarme dormante (ou memorizado) significa que a condicao voltou ao normal, mas o operador ainda nao acusou. Permanece visivel para rastreabilidade.")
    },
    { q:t("Quel est le rôle du VDR (Voyage Data Recorder) par rapport aux alarmes ?","What is the role of the VDR (Voyage Data Recorder) regarding alarms?","Cual es el papel del VDR (Voyage Data Recorder) con respecto a las alarmas?","Qual e o papel do VDR (Voyage Data Recorder) em relacao aos alarmes?"),
      opts:[t("Il ne concerne pas les alarmes machine","It does not concern engine alarms","No concierne las alarmas de maquinas","Nao concerne alarmes de maquinas"),t("Il enregistre les alarmes machine pour enquête d'accident — 48h minimum","It records engine alarms for accident investigation — 48h minimum","Registra alarmas de maquinas para investigacion de accidentes — 48h minimo","Registra alarmes de maquinas para investigacao de acidentes — 48h minimo"),t("Il remplace l'alarm log","It replaces the alarm log","Reemplaza el alarm log","Substitui o alarm log"),t("VDR = pont seulement","VDR = bridge only","VDR = puente solamente","VDR = ponte somente")],correct:1,
      exp:t("Le VDR (SOLAS V/20) enregistre les données du navire incluant les alarmes machine pendant au moins 48h. En cas d'accident, c'est la source principale pour reconstituer la chronologie des événements et déterminer les causes.","The VDR (SOLAS V/20) records vessel data including engine alarms for at least 48 hours. In case of accident, it is the primary source for reconstructing the sequence of events and determining causes.","El VDR (SOLAS V/20) registra los datos del buque incluyendo alarmas de maquinas durante al menos 48h. En caso de accidente, es la fuente principal para reconstruir la cronologia de eventos y determinar las causas.","O VDR (SOLAS V/20) registra dados do navio incluindo alarmes de maquinas por pelo menos 48h. Em caso de acidente, e a fonte principal para reconstruir a cronologia dos eventos e determinar as causas.")
    },
    { q:t("Qu'est-ce que le 'nuisance alarm' ?","What is a 'nuisance alarm'?","Que es una 'nuisance alarm'?","O que e um 'nuisance alarm'?"),
      opts:[t("Une alarme de bruit excessif","An excessive noise alarm","Una alarma de ruido excesivo","Um alarme de ruido excessivo"),t("Alarme qui se déclenche fréquemment sans danger réel — seuil mal réglé","Alarm that triggers frequently without real danger — poorly set threshold","Alarma que se activa frecuentemente sin peligro real — umbral mal configurado","Alarme que aciona frequentemente sem perigo real — limiar mal configurado"),t("Alarme non documentée","Undocumented alarm","Alarma no documentada","Alarme nao documentado"),t("Alarme de priorité P4","Priority P4 alarm","Alarma de prioridad P4","Alarme de prioridade P4")],correct:1,
      exp:t("Une nuisance alarm se déclenche régulièrement pour une condition qui n'est pas réellement dangereuse (seuil trop sensible, vibration normale, variation de processus normale). Crée un bruit de fond et risque de désensibiliser l'opérateur — danger majeur.","A nuisance alarm triggers regularly for a condition that is not genuinely dangerous (threshold too sensitive, normal vibration, normal process variation). Creates background noise and risks desensitizing the operator — major danger.","Una nuisance alarm se activa regularmente para una condicion que no es realmente peligrosa (umbral demasiado sensible, vibracion normal, variacion de proceso normal). Crea ruido de fondo y riesgo de desensibilizar al operador — peligro mayor.","Um nuisance alarm aciona regularmente para uma condicao que nao e realmente perigosa (limiar muito sensivel, vibracao normal, variacao de processo normal). Cria ruido de fundo e risco de dessensibilizar o operador - perigo maior.")
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
    mono:{fontFamily:"Courier New",background:C.bg1,borderRadius:6,padding:"8px 10px",
      fontSize:11,color:C.cyan2,lineHeight:1.6,marginBottom:8},
    tag:{display:"inline-block",background:"rgba(0,229,255,0.1)",border:`1px solid ${C.border}`,
      borderRadius:4,padding:"2px 8px",fontSize:10,color:C.cyan,marginRight:4,marginBottom:4},
    btn:{padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",
      fontFamily:"Courier New",fontSize:12,fontWeight:700,letterSpacing:1},
  };

  const accidentData = {
    title:t("MV SCANDINAVIAN STAR — MER DU NORD, 1990",
      "MV SCANDINAVIAN STAR — NORTH SEA, 1990",
      "MV SCANDINAVIAN STAR — MAR DEL NORTE, 1990",
      "MV SCANDINAVIAN STAR — MAR DO NORTE, 1990"),
    victims:"158", flag:"🇳🇴",
    cause:t("Incendie criminel à bord du ferry. Le systeme d'alarme incendie presente des defauts : detecteurs non fonctionnels dans certaines zones, alarmes acquittees sans verification physique, transfert passerelle defaillant. L'equipage ne connait pas le systeme d'alarme du navire (recemment change de pavillon). Les 158 victimes meurent principalement d'asphyxie par fumees faute d'evacuation rapide.",
      "Criminal fire aboard the ferry. The fire alarm system has defects: non-functional detectors in some areas, alarms acknowledged without physical verification, faulty bridge transfer. The crew does not know the ship's alarm system (recently reflagged). The 158 victims die mainly from smoke asphyxiation due to lack of rapid evacuation.",
      "Incendio criminal a bordo del ferry. El sistema de alarma de incendio presenta defectos: detectores no funcionales en algunas zonas, alarmas acusadas sin verificacion fisica, transferencia al puente defectuosa. La tripulacion desconoce el sistema de alarma del buque (recientemente abanderado). Las 158 victimas mueren principalmente por asfixia por humos ante la falta de evacuacion rapida.",
      "Incendio criminoso a bordo do ferry. O sistema de alarme de incendio apresenta defeitos: detectores nao funcionais em algumas areas, alarmes acusados sem verificacao fisica, transferencia de ponte deficiente. A tripulacao desconhece o sistema de alarme do navio (recentemente rebandeirado). As 158 vitimas morrem principalmente por asfixia por fumaca devido a falta de evacuacao rapida."),
    lessons:[
      t("Verification systematique des systemes d'alarme apres changement de pavillon ou equipage","Systematic verification of alarm systems after flag change or crew change","Verificacion sistematica de sistemas de alarma tras cambio de pabellon o tripulacion","Verificacao sistematica de sistemas de alarme apos mudanca de bandeira ou tripulacao"),
      t("Formation obligatoire de tout equipage sur le systeme d'alarme specifique du navire","Mandatory training of all crew on vessel-specific alarm system","Formacion obligatoria de toda la tripulacion en el sistema de alarma especifico del buque","Treinamento obrigatorio de toda tripulacao no sistema de alarme especifico do navio"),
      t("Tests periodiques de tous les detecteurs et des relais passerelle (SOLAS II-2/14)","Periodic testing of all detectors and bridge relays (SOLAS II-2/14)","Pruebas periodicas de todos los detectores y reles de puente (SOLAS II-2/14)","Testes periodicos de todos os detectores e reles de ponte (SOLAS II-2/14)"),
      t("Interdiction d'acquitter une alarme sans investigation physique","Prohibition of acknowledging an alarm without physical investigation","Prohibicion de acusar una alarma sin investigacion fisica","Proibicao de acusar um alarme sem investigacao fisica"),
    ],
    ref:"IMO MSC/Circ.645 · SOLAS II-2/7 · Norwegian AIBN Report 2013"
  };

  const summaryPoints = [
    t("AMS = Alarm Monitoring System : 4 couches — capteurs → I/O → CPU → interfaces","AMS = Alarm Monitoring System: 4 layers — sensors → I/O → CPU → interfaces","AMS = Alarm Monitoring System: 4 capas — sensores → I/O → CPU → interfaces","AMS = Alarm Monitoring System: 4 camadas — sensores → I/O → CPU → interfaces"),
    t("Signal 4-20mA : 0 mA = rupture cable (alarme defaut capteur)","4-20mA signal: 0 mA = cable break (sensor fault alarm)","Senal 4-20mA: 0 mA = rotura cable (alarma fallo sensor)","Sinal 4-20mA: 0 mA = ruptura cabo (alarme falha sensor)"),
    t("4 niveaux de priorite : P1 critique → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)","4 priority levels: P1 critical → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)","4 niveles de prioridad: P1 critico → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)","4 niveis de prioridade: P1 critico → P4 info (IEC 61511 / IMO MSC.1/Circ.1432)"),
    t("SOLAS II-1/51 : alarme non acquittee en 30s en mode UMS → relai passerelle automatique","SOLAS II-1/51: alarm not acknowledged in 30s in UMS mode → automatic bridge relay","SOLAS II-1/51: alarma no acusada en 30s en modo UMS → rele automatico al puente","SOLAS II-1/51: alarme nao acusada em 30s no modo UMS → rele automatico a ponte"),
    t("DMA (Dead Man Alarm) : confirmation presence toutes les 30 min en UMS","DMA (Dead Man Alarm): presence confirmation every 30 min in UMS","DMA (Dead Man Alarm): confirmacion presencia cada 30 min en UMS","DMA (Dead Man Alarm): confirmacao presenca a cada 30 min em UMS"),
    t("OMD = Oil Mist Detector : detection brouillard huile carter → risque explosion","OMD = Oil Mist Detector: crankcase oil mist detection → explosion risk","OMD = Oil Mist Detector: deteccion niebla aceite carter → riesgo explosion","OMD = Oil Mist Detector: deteccao nevoa oleo carter → risco explosao"),
    t("Maintenance predictive : analyse tendances vibrations/temperatures pour anticiper pannes","Predictive maintenance: vibration/temperature trend analysis to anticipate failures","Mantenimiento predictivo: analisis tendencias vibraciones/temperaturas para anticipar averias","Manutencao preditiva: analise tendencias vibracoes/temperaturas para antecipar falhas"),
    t("Redondance N+1 obligatoire : CPU secondaire actif en < 100ms (SOLAS)","N+1 redundancy mandatory: secondary CPU active in < 100ms (SOLAS)","Redundancia N+1 obligatoria: CPU secundario activo en < 100ms (SOLAS)","Redundancia N+1 obrigatoria: CPU secundario ativo em < 100ms (SOLAS)"),
    t("VDR enregistre les alarmes machine (48h minimum) — SOLAS V/20","VDR records engine alarms (48h minimum) — SOLAS V/20","VDR registra alarmas de maquinas (48h minimo) — SOLAS V/20","VDR registra alarmes de maquinas (48h minimo) — SOLAS V/20"),
    t("Nuisance alarm = alarme trop frequente sans danger reel → desensibilisation operateur","Nuisance alarm = too frequent alarm without real danger → operator desensitization","Nuisance alarm = alarma demasiado frecuente sin peligro real → desensibilizacion operador","Nuisance alarm = alarme muito frequente sem perigo real → dessensibilizacao operador"),
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
              const answered = quizAnswers[quizIdx]!==undefined;
              const isCorrect = oi===q.correct;
              const isChosen = quizAnswers[quizIdx]===oi;
              let bg="transparent",border="rgba(255,255,255,0.1)",col=C.muted;
              if(answered){
                if(isCorrect){bg="rgba(0,230,118,0.12)";border=C.green;col=C.green;}
                else if(isChosen){bg="rgba(255,23,68,0.12)";border=C.red;col=C.red;}
              }
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
                {quizIdx<4?t("Suivant","Next","Siguiente","Proximo")+" →":t("Voir résultat","See result","Ver resultado","Ver resultado")}
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
          <span style={{...S.tag}}>e7 · L4</span>
          <span style={{...S.tag,color:C.amber,borderColor:C.borderA}}>UMS & Automation</span>
        </div>
        <h1 style={{color:C.white,fontSize:17,fontWeight:800,margin:0,lineHeight:1.2}}>
          {t("Surveillance & Alarmes — AMS Avancé","Monitoring & Alarms — Advanced AMS","Vigilancia & Alarmas — AMS Avanzado","Vigilancia & Alarmes — AMS Avancado")}
        </h1>
        <p style={{color:C.muted,fontSize:12,margin:"6px 0 0",lineHeight:1.4}}>
          {t("Architecture AMS · Priorités alarmes · Intégration passerelle · Maintenance prédictive",
            "AMS Architecture · Alarm priorities · Bridge integration · Predictive maintenance",
            "Arquitectura AMS · Prioridades alarmas · Integracion puente · Mantenimiento predictivo",
            "Arquitetura AMS · Prioridades alarmes · Integracao ponte · Manutencao preditiva")}
        </p>
      </div>

      <div style={S.section}>
        {/* S1 — ARCHITECTURE */}
        <div style={{...S.card}}>
          <div style={S.h2}>◈ 1 — {t("ARCHITECTURE AMS","AMS ARCHITECTURE","ARQUITECTURA AMS","ARQUITETURA AMS")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("L'AMS (Alarm Monitoring System) surveille en continu tous les paramètres critiques de la salle des machines. Il collecte les données des capteurs terrain (4-20mA), les compare aux seuils, génère les alarmes et les route vers les opérateurs. Architecture en 4 couches avec redondance N+1 obligatoire (SOLAS).",
              "The AMS (Alarm Monitoring System) continuously monitors all critical engine room parameters. It collects data from field sensors (4-20mA), compares against thresholds, generates alarms and routes them to operators. 4-layer architecture with mandatory N+1 redundancy (SOLAS).",
              "El AMS (Alarm Monitoring System) monitorea continuamente todos los parametros criticos de la sala de maquinas. Recopila datos de sensores de campo (4-20mA), los compara con umbrales, genera alarmas y las enruta a los operadores. Arquitectura de 4 capas con redundancia N+1 obligatoria (SOLAS).",
              "O AMS (Alarm Monitoring System) monitora continuamente todos os parametros criticos da sala de maquinas. Coleta dados de sensores de campo (4-20mA), compara com limiares, gera alarmes e os roteia para os operadores. Arquitetura em 4 camadas com redundancia N+1 obrigatoria (SOLAS).")}
          </p>
          <div style={S.mono}>
            {"TYPES CAPTEURS — Signal 4-20mA\n"}
            {"PT  Pressure Transmitter   → pression (bar, psi)\n"}
            {"TT  Temperature Transmitter → temperature (C)\n"}
            {"LT  Level Transmitter       → niveau (%)\n"}
            {"FT  Flow Transmitter        → debit (m3/h)\n"}
            {"VT  Vibration Transmitter   → vibration (mm/s)\n"}
            {"OMD Oil Mist Detector       → brouillard huile (%)"}
          </div>
          <AMSArchSVG />
        </div>

        {/* S2 — PANNEAU ALARMES */}
        <div style={{...S.card,borderColor:"rgba(255,23,68,0.2)"}}>
          <div style={{...S.h2,color:C.red}}>◈ 2 — {t("GESTION DES ALARMES","ALARM MANAGEMENT","GESTION DE ALARMAS","GESTAO DE ALARMES")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("Les alarmes sont classées en 4 priorités selon IMO MSC.1/Circ.1432 et IEC 61511. Chaque alarme doit être acquittée (ACK) par l'opérateur. En mode UMS, une alarme non acquittée en 30 secondes est automatiquement transmise à la passerelle (SOLAS II-1/51). L'alarm flooding (> 10 alarmes/min) est un danger reconnu.",
              "Alarms are classified into 4 priorities according to IMO MSC.1/Circ.1432 and IEC 61511. Each alarm must be acknowledged (ACK) by the operator. In UMS mode, an unacknowledged alarm within 30 seconds is automatically transmitted to the bridge (SOLAS II-1/51). Alarm flooding (> 10 alarms/min) is a recognized hazard.",
              "Las alarmas se clasifican en 4 prioridades segun IMO MSC.1/Circ.1432 e IEC 61511. Cada alarma debe ser acusada (ACK) por el operador. En modo UMS, una alarma no acusada en 30 segundos se transmite automaticamente al puente (SOLAS II-1/51). El alarm flooding (> 10 alarmas/min) es un peligro reconocido.",
              "Os alarmes sao classificados em 4 prioridades conforme IMO MSC.1/Circ.1432 e IEC 61511. Cada alarme deve ser acusado (ACK) pelo operador. No modo UMS, um alarme nao acusado em 30 segundos e transmitido automaticamente a ponte (SOLAS II-1/51). O alarm flooding (> 10 alarmes/min) e um perigo reconhecido.")}
          </p>
          <AlarmPanelSVG />
        </div>

        {/* S3 — INTEGRATION PASSERELLE */}
        <div style={{...S.card,borderColor:"rgba(0,230,118,0.18)"}}>
          <div style={{...S.h2,color:C.green}}>◈ 3 — {t("INTEGRATION PASSERELLE","BRIDGE INTEGRATION","INTEGRACION PUENTE","INTEGRACAO PONTE")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("En mode UMS (Unmanned Machinery Space), la salle des machines fonctionne sans personnel la nuit. Toutes les alarmes machine sont retransmises à la passerelle selon SOLAS II-1/51. Le Dead Man Alarm (DMA) garantit la présence de l'officier mécanicien de quart en imposant une confirmation toutes les 30 minutes.",
              "In UMS (Unmanned Machinery Space) mode, the engine room operates without personnel at night. All engine alarms are relayed to the bridge per SOLAS II-1/51. The Dead Man Alarm (DMA) ensures duty engineer presence by requiring confirmation every 30 minutes.",
              "En modo UMS (Unmanned Machinery Space), la sala de maquinas funciona sin personal de noche. Todas las alarmas de maquinas se retransmiten al puente segun SOLAS II-1/51. El Dead Man Alarm (DMA) garantiza la presencia del oficial de maquinas de guardia exigiendo confirmacion cada 30 minutos.",
              "No modo UMS (Unmanned Machinery Space), a sala de maquinas funciona sem pessoal a noite. Todos os alarmes de maquinas sao retransmitidos a ponte conforme SOLAS II-1/51. O Dead Man Alarm (DMA) garante a presenca do oficial de maquinas de quarto exigindo confirmacao a cada 30 minutos.")}
          </p>
          <BridgeIntegrationSVG />
        </div>

        {/* S4 — MAINTENANCE PREDICTIVE */}
        <div style={{...S.card,borderColor:"rgba(224,64,251,0.2)"}}>
          <div style={{...S.h2,color:C.purple}}>◈ 4 — {t("MAINTENANCE PREDICTIVE","PREDICTIVE MAINTENANCE","MANTENIMIENTO PREDICTIVO","MANUTENCAO PREDITIVA")}</div>
          <p style={{color:C.muted,fontSize:12,lineHeight:1.6,marginBottom:10}}>
            {t("L'AMS moderne enregistre l'historique des paramètres et permet d'analyser les tendances. Une température d'huile qui augmente de 1C par jour, ou une vibration qui triple en deux semaines, sont des signaux d'alerte avant panne. La maintenance prédictive réduit les immobilisations non planifiées de 70% selon DNV.",
              "Modern AMS records parameter history and allows trend analysis. Oil temperature increasing by 1C per day, or vibration tripling in two weeks, are pre-failure warning signals. Predictive maintenance reduces unplanned downtime by 70% according to DNV.",
              "El AMS moderno registra el historial de parametros y permite analizar tendencias. Una temperatura de aceite que aumenta 1C por dia, o una vibracion que se triplica en dos semanas, son senales de alerta antes de averia. El mantenimiento predictivo reduce las inmovilizaciones no planificadas en un 70% segun DNV.",
              "O AMS moderno registra o historico de parametros e permite analisar tendencias. Uma temperatura de oleo que aumenta 1C por dia, ou uma vibracao que triplica em duas semanas, sao sinais de alerta antes de avaria. A manutencao preditiva reduz paralisacoes nao planejadas em 70% conforme DNV.")}
          </p>
          <TrendSVG />
        </div>

        {/* EXERCICE */}
        <div style={{...S.card,borderColor:C.borderA}}>
          <div style={{...S.h2,color:C.amber}}>✏️ {t("EXERCICE","EXERCISE","EJERCICIO","EXERCICIO")}</div>
          {[
            t("Expliquez pourquoi la redondance N+1 est obligatoire pour un AMS selon SOLAS. Donnez un exemple concret.","Explain why N+1 redundancy is mandatory for an AMS according to SOLAS. Give a concrete example.","Explique por que la redundancia N+1 es obligatoria para un AMS segun SOLAS. De un ejemplo concreto.","Explique por que a redundancia N+1 e obrigatoria para um AMS conforme SOLAS. De um exemplo concreto."),
            t("Un navire passe de mode MANNED à UMS pour la nuit. Quels systèmes s'activent et quelles vérifications effectuez-vous avant de quitter l'ECR ?","A vessel switches from MANNED to UMS mode for the night. Which systems activate and what checks do you perform before leaving the ECR?","Un buque cambia de modo MANNED a UMS para la noche. Que sistemas se activan y que verificaciones realiza antes de abandonar el ECR?","Um navio muda do modo MANNED para UMS a noite. Quais sistemas se ativam e quais verificacoes voce realiza antes de sair do ECR?"),
            t("Une alarme 'HI-LUB-TEMP' est en état 'dormant non-acquitté'. Expliquez cette situation et votre action.","An alarm 'HI-LUB-TEMP' is in 'dormant unacknowledged' state. Explain this situation and your action.","Una alarma 'HI-LUB-TEMP' esta en estado 'dormante sin acusar'. Explique esta situacion y su accion.","Um alarme 'HI-LUB-TEMP' esta no estado 'dormante nao acusado'. Explique esta situacao e sua acao."),
            t("La vibration du palier avant augmente de 2mm/s à 6mm/s sur 10 jours. Décrivez votre analyse prédictive et votre plan d'action.","FWD bearing vibration increases from 2mm/s to 6mm/s over 10 days. Describe your predictive analysis and action plan.","La vibracion del cojinete delantero aumenta de 2mm/s a 6mm/s en 10 dias. Describa su analisis predictivo y plan de accion.","A vibracao do mancal dianteiro aumenta de 2mm/s a 6mm/s em 10 dias. Descreva sua analise preditiva e plano de acao."),
            t("Qu'est-ce que l'alarm flooding ? Donnez 2 causes et 2 mesures préventives.","What is alarm flooding? Give 2 causes and 2 preventive measures.","Que es el alarm flooding? De 2 causas y 2 medidas preventivas.","O que e o alarm flooding? De 2 causas e 2 medidas preventivas."),
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

        {/* ACCIDENT */}
        <div style={{...S.card,borderColor:"rgba(255,23,68,0.3)"}}>
          <button onClick={()=>setAccidentOpen(o=>!o)}
            style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{color:C.red,fontFamily:"Courier New",fontSize:11,letterSpacing:2}}>
                ⚠ ACCIDENT CASE {accidentOpen?"▲":"▼"}
              </div>
              <span style={{fontSize:18}}>⛴</span>
            </div>
            <div style={{color:C.white,fontSize:13,fontWeight:700,marginTop:4}}>{accidentData.title}</div>
          </button>
          {accidentOpen && (
            <div style={{marginTop:12}}>
              <div style={{display:"flex",gap:10,marginBottom:10}}>
                <span style={{fontSize:24}}>{accidentData.flag}</span>
                <div style={{color:C.red,fontSize:12,fontWeight:700}}>{accidentData.victims} {t("victimes","victims","victimas","vitimas")}</div>
              </div>
              <p style={{color:C.muted,fontSize:12,lineHeight:1.7,marginBottom:12}}>{accidentData.cause}</p>
              <div style={{color:C.amber,fontSize:11,fontWeight:700,marginBottom:6}}>
                {t("Leçons retenues :","Lessons learned:","Lecciones aprendidas:","Licoes aprendidas:")}
              </div>
              {accidentData.lessons.map((l,i) => (
                <div key={i} style={{display:"flex",gap:8,marginBottom:4}}>
                  <span style={{color:C.amber}}>▸</span>
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
        <div style={{...S.card}}>
          <div style={S.h2}>🏆 {t("BANQUE DE QUESTIONS","QUESTION BANK","BANCO DE PREGUNTAS","BANCO DE PERGUNTAS")} (15 QCM)</div>
          {qBank.map((q,qi) => (
            <div key={qi} style={{marginBottom:8,padding:10,background:C.bg1,borderRadius:8,
              border:`1px solid ${qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?"rgba(0,230,118,0.3)":"rgba(255,23,68,0.3)"):"rgba(84,110,122,0.3)"}`}}>
              <button onClick={()=>setQbOpen(qbOpen===qi?null:qi)}
                style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <span style={{color:C.white,fontSize:11,flex:1}}>{qi+1}. {q.q}</span>
                  <span style={{color:qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?C.green:C.red):C.steel2,fontSize:12,flexShrink:0}}>
                    {qbAnswers[qi]!==undefined?(qbAnswers[qi]===q.correct?"✓":"✗"):"○"}
                  </span>
                </div>
              </button>
              {qbOpen===qi && (
                <div style={{marginTop:8}}>
                  {q.opts.map((opt,oi) => {
                    const answered = qbAnswers[qi]!==undefined;
                    const isCorrect = oi===q.correct;
                    const isChosen = qbAnswers[qi]===oi;
                    let bg="transparent",border="rgba(255,255,255,0.08)",col=C.muted;
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
        <div style={{...S.card}}>
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
