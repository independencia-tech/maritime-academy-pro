// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", yellow:"#f1c40f", radar:"#00ff44", ecdis:"#00ccff", ais:"#ffaa00",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — AIS SCREEN SIMULATOR
// ══════════════════════════════════════
function AISScreenSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(()=>{
    const iv = setInterval(()=>setTick(t=>t+1), 1200);
    return ()=>clearInterval(iv);
  },[]);

  const vessels = [
    { id:0, x:50, y:50, name:"MV DELTA", mmsi:"227456789", class:"A",
      sog:12.4, cog:"045", hdg:"044", status:"Under way",
      type:{fr:"Cargo",en:"Cargo",es:"Carguero",pt:"Cargueiro"},
      color:C.ais, dx:0.3, dy:-0.2,
      info:{fr:"CLASSE A — Cargo commercial\n\nMMSI : 227456789\nNom : MV DELTA\nVitesse : 12,4 nœuds\nCap fond : 045°\nCap route : 044°\nStatut : En route sous machine\n\nTRANSMISSION CLASS A :\n→ Toutes les 2-10 secondes en route\n→ Toutes les 3 min à l'arrêt\n→ Portée : 20-40 milles\n\nINFOS STATIQUES :\n→ MMSI · Nom · Pavillon · IMO\n→ Type · Longueur · Largeur\n→ Tirant d'eau · Destination · ETA",
           en:"CLASS A — Commercial cargo\n\nMMSI: 227456789\nName: MV DELTA\nSpeed: 12.4 knots\nCOG: 045°\nHDG: 044°\nStatus: Under way using engine\n\nCLASS A TRANSMISSION:\n→ Every 2-10 seconds underway\n→ Every 3 min when stopped\n→ Range: 20-40 miles\n\nSTATIC INFO:\n→ MMSI · Name · Flag · IMO\n→ Type · Length · Width\n→ Draught · Destination · ETA",
           es:"CLASE A — Cargo comercial\n\nMMSI: 227456789\nNombre: MV DELTA\nVelocidad: 12,4 nudos\nRumbo fondo: 045°\nRumbo proa: 044°\nEstado: Navegando con máquinas\n\nTRANSMISIÓN CLASE A:\n→ Cada 2-10 segundos en ruta\n→ Cada 3 min parado\n→ Alcance: 20-40 millas",
           pt:"CLASSE A — Cargo comercial\n\nMMSI: 227456789\nNome: MV DELTA\nVelocidade: 12,4 nós\nRumo fundo: 045°\nRumo proa: 044°\nEstado: Em rota sob máquina\n\nTRANSMISSÃO CLASSE A:\n→ A cada 2-10 segundos em rota\n→ A cada 3 min parado\n→ Alcance: 20-40 milhas"} },
    { id:1, x:75, y:30, name:"SV ECHO", mmsi:"338901234", class:"B",
      sog:6.1, cog:270, hdg:268, status:"Under way sailing",
      type:{fr:"Voilier",en:"Sailing vessel",es:"Velero",pt:"Veleiro"},
      color:"#88aaff", dx:-0.4, dy:0.1,
      info:{fr:"CLASSE B — Voilier de plaisance\n\nMMSI : 338901234\nNom : SV ECHO\nVitesse : 6,1 nœuds\nCap fond : 270°\nStatut : En route à la voile\n\nTRANSMISSION CLASS B :\n→ Toutes les 30 secondes en route\n→ Toutes les 3 min à l'arrêt\n→ Portée : 5-10 milles\n\nDIFFÉRENCE A vs B :\nClass A = navires commerciaux SOLAS\nClass B = plaisance / petits navires\nClass B = transmission moins fréquente",
           en:"CLASS B — Leisure sailing vessel\n\nMMSI: 338901234\nName: SV ECHO\nSpeed: 6.1 knots\nCOG: 270°\nStatus: Under way sailing\n\nCLASS B TRANSMISSION:\n→ Every 30 seconds underway\n→ Every 3 min when stopped\n→ Range: 5-10 miles\n\nDIFFERENCE A vs B:\nClass A = commercial SOLAS vessels\nClass B = leisure / small vessels\nClass B = less frequent transmission",
           es:"CLASE B — Velero de recreo\n\nMMSI: 338901234\nNombre: SV ECHO\nVelocidad: 6,1 nudos\nRumbo fondo: 270°\nEstado: Navegando a vela\n\nTRANSMISIÓN CLASE B:\n→ Cada 30 segundos en ruta\n→ Cada 3 min parado\n→ Alcance: 5-10 millas",
           pt:"CLASSE B — Veleiro de recreio\n\nMMSI: 338901234\nNome: SV ECHO\nVelocidade: 6,1 nós\nRumo fundo: 270°\nEstado: Em rota à vela\n\nTRANSMISSÃO CLASSE B:\n→ A cada 30 segundos em rota\n→ A cada 3 min parado\n→ Alcance: 5-10 milhas"} },
    { id:2, x:25, y:70, name:"TUG FOXTROT", mmsi:"244678901", class:"A",
      sog:0, cog:0, hdg:180, status:"At anchor",
      type:{fr:"Remorqueur",en:"Tug",es:"Remolcador",pt:"Rebocador"},
      color:C.red, dx:0, dy:0,
      info:{fr:"CLASSE A — Remorqueur au mouillage\n\nMMSI : 244678901\nNom : TUG FOXTROT\nVitesse : 0 nœuds\nStatut : Au mouillage\n\nSTATUT AIS COMPLET :\n0 = En route machine\n1 = Au mouillage\n2 = Non commandé\n3 = Manœuvrabilité restreinte\n4 = Contraint par son tirant\n5 = Amarré\n6 = Échoué\n7 = Navire de pêche\n8 = En route à la voile\n15 = Non défini\n\nIMPORTANCE :\nLe statut AIS informe les autres navires",
           en:"CLASS A — Tug at anchor\n\nMMSI: 244678901\nName: TUG FOXTROT\nSpeed: 0 knots\nStatus: At anchor\n\nFULL AIS STATUS:\n0 = Under way engine\n1 = At anchor\n2 = Not under command\n3 = Restricted maneuverability\n4 = Constrained by draught\n5 = Moored\n6 = Aground\n7 = Fishing\n8 = Under way sailing\n15 = Undefined",
           es:"CLASE A — Remolcador fondeado\n\nMMSI: 244678901\nNombre: TUG FOXTROT\nVelocidad: 0 nudos\nEstado: Fondeado\n\nESTADO AIS COMPLETO:\n0 = Navegando con máquinas\n1 = Fondeado\n2 = Sin gobierno\n3 = Maniobrabilidad restringida\n4 = Limitado por su calado\n5 = Amarrado · 6 = Varado\n7 = Pescando · 8 = A vela",
           pt:"CLASSE A — Rebocador fundeado\n\nMMSI: 244678901\nNome: TUG FOXTROT\nVelocidade: 0 nós\nEstado: Fundeado\n\nESTADO AIS COMPLETO:\n0 = Em rota motor\n1 = Fundeado\n2 = Sem governo\n3 = Manobabilidade restrita\n4 = Limitado pelo calado\n5 = Amarrado · 6 = Encalhado\n7 = Pesca · 8 = À vela"} },
    { id:3, x:60, y:75, name:"TANKER GOLF", mmsi:"566234567", class:"A",
      sog:8.2, cog:320, hdg:318, status:"Restricted maneuv.",
      type:{fr:"Pétrolier",en:"Tanker",es:"Petrolero",pt:"Petroleiro"},
      color:C.orange, dx:-0.2, dy:-0.3,
      info:{fr:"CLASSE A — Pétrolier RAM\n\nMMSI : 566234567\nNom : TANKER GOLF\nVitesse : 8,2 nœuds\nCap fond : 320°\nStatut : Manœuvrabilité RESTREINTE\n\nRAM = Restricted in Ability to Manoeuver\n→ Peut être en dragage\n→ Ravitaillement en mer\n→ Pose de câbles\n→ Manœuvre limitée\n\nACTION REQUISE :\nÉviter ce navire\nne pas le forcer à manœuvrer\n\nAIS + COLREG :\nL'AIS identifie le statut\nLes COLREG imposent la priorité",
           en:"CLASS A — RAM tanker\n\nMMSI: 566234567\nName: TANKER GOLF\nSpeed: 8.2 knots\nCOG: 320°\nStatus: Restricted MANEUVERABILITY\n\nRAM = Restricted in Ability to Manoeuver\n→ May be dredging\n→ Replenishment at sea\n→ Cable laying\n→ Limited maneuvering\n\nACTION REQUIRED:\nAvoid this vessel\ndo not force it to maneuver",
           es:"CLASE A — Petrolero RAM\n\nMMSI: 566234567\nNombre: TANKER GOLF\nVelocidad: 8,2 nudos\nRumbo fondo: 320°\nEstado: Maniobrabilidad RESTRINGIDA\n\nRAM = Maniobrabilidad Restringida\n→ Puede estar dragando\n→ Aprovisionamiento en el mar\n→ Tendido de cables\n→ Maniobra limitada",
           pt:"CLASSE A — Petroleiro RAM\n\nMMSI: 566234567\nNome: TANKER GOLF\nVelocidade: 8,2 nós\nRumo fundo: 320°\nEstado: Manobabilidade RESTRITA\n\nRAM = Manobabilidade Restrita\n→ Pode estar a dragar\n→ Reabastecimento no mar\n→ Posição de cabos\n→ Manobra limitada"} },
  ];

  const w=280, h=200;
  const anim = (v, t) => ({
    x: Math.max(5, Math.min(95, v.x + v.dx * (t%8))),
    y: Math.max(5, Math.min(95, v.y + v.dy * (t%8))),
  });

  const sel_ = sel!==null ? vessels[sel] : null;

  return (
    <div>
      {/* AIS Screen */}
      <div style={{background:"#000d08",borderRadius:14,padding:"8px",marginBottom:10,border:`1px solid ${C.ais}33`,position:"relative"}}>
        <div style={{fontSize:9,color:C.ais,letterSpacing:2,marginBottom:6,fontFamily:"'Courier New',monospace"}}>AIS DISPLAY — {vessels.length} TARGETS</div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
          {/* Grid */}
          {[0,1,2,3,4].map(i=>(
            <line key={`h${i}`} x1={0} y1={i*h/4} x2={w} y2={i*h/4} stroke={`${C.ais}15`} strokeWidth={0.5}/>
          ))}
          {[0,1,2,3,4].map(i=>(
            <line key={`v${i}`} x1={i*w/4} y1={0} x2={i*w/4} y2={h} stroke={`${C.ais}15`} strokeWidth={0.5}/>
          ))}
          {/* Own vessel */}
          <polygon points={`${w/2},${h/2-8} ${w/2-5},${h/2+4} ${w/2+5},${h/2+4}`}
            fill={C.ais} stroke={C.ais} strokeWidth={1}
            style={{filter:`drop-shadow(0 0 4px ${C.ais})`}}/>
          <text x={w/2+8} y={h/2} fontSize={7} fill={C.ais}>MY VESSEL</text>
          {/* Targets */}
          {vessels.map((v,i)=>{
            const pos = anim(v, tick);
            const px = pos.x/100*w, py = pos.y/100*h;
            const isSelected = sel===i;
            return (
              <g key={i} onClick={()=>setSel(sel===i?null:i)} style={{cursor:"pointer"}}>
                {/* CPA ring if selected */}
                {isSelected&&<circle cx={px} cy={py} r={16} fill="none" stroke={v.color} strokeWidth={0.5} strokeDasharray="3,2" opacity={0.5}/>}
                {/* Vessel triangle */}
                <polygon
                  points={`${px},${py-7} ${px-4},${py+4} ${px+4},${py+4}`}
                  fill={isSelected?v.color:`${v.color}88`}
                  stroke={v.color} strokeWidth={isSelected?1.5:0.5}
                  style={{filter:isSelected?`drop-shadow(0 0 6px ${v.color})`:"none"}}
                />
                {/* Speed vector */}
                {v.sog>0&&<line x1={px} y1={py-7} x2={px+v.dx*20} y2={py-7+v.dy*20} stroke={v.color} strokeWidth={1} opacity={0.7}/>}
                {/* Name */}
                <text x={px+8} y={py-2} fontSize={6} fill={isSelected?v.color:C.muted}>{v.name}</text>
                <text x={px+8} y={py+6} fontSize={5} fill={v.color}>{v.sog}kn {v.cog}°</text>
              </g>
            );
          })}
          {/* Scale */}
          <line x1={w-50} y1={h-8} x2={w-10} y2={h-8} stroke={C.ais} strokeWidth={1}/>
          <text x={w-30} y={h-2} fontSize={6} fill={C.ais} textAnchor="middle">5 NM</text>
        </svg>
      </div>
      {/* Vessel selector */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {vessels.map((v,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 6px",borderRadius:10,cursor:"pointer",
            background:sel===i?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?v.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:8,height:8,background:v.color,borderRadius:2,flexShrink:0}}/>
              <div>
                <div style={{fontSize:9,fontWeight:700,color:sel===i?v.color:C.white}}>{v.name}</div>
                <div style={{fontSize:7,color:C.muted}}>Class {v.class} · {v.sog}kn · {v.type[lang]||v.type.fr}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:12,fontWeight:700,color:sel_.color,marginBottom:6}}>{sel_.name} — Class {sel_.class}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.info[lang]||sel_.info.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — ECDIS vs PAPER CHART
// ══════════════════════════════════════
function ECDISComparisonSVG({ lang }) {
  const [view, setView] = useState("ecdis");
  const [layer, setLayer] = useState("all");

  const layers = [
    { id:"all", label:{fr:"Tout",en:"All",es:"Todo",pt:"Tudo"}, color:C.ecdis },
    { id:"depths", label:{fr:"Sondes",en:"Depths",es:"Sondas",pt:"Sondas"}, color:C.blue2 },
    { id:"dangers", label:{fr:"Dangers",en:"Dangers",es:"Peligros",pt:"Perigos"}, color:C.red },
    { id:"nav", label:{fr:"Aides nav.",en:"Nav aids",es:"Ayudas nav.",pt:"Aux. nav."}, color:C.green },
  ];

  return (
    <div>
      {/* Toggle ECDIS vs Paper */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {[
          {id:"ecdis", label:{fr:"ECDIS",en:"ECDIS",es:"SEEC",pt:"SEEC"}, color:C.ecdis},
          {id:"paper", label:{fr:"Carte papier",en:"Paper chart",es:"Carta papel",pt:"Carta papel"}, color:C.gold2},
        ].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{
            flex:1,padding:"9px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:11,
            background:view===v.id?`${v.color}22`:"rgba(255,255,255,0.04)",
            border:`2px solid ${view===v.id?v.color:"rgba(255,255,255,0.08)"}`,
            color:view===v.id?v.color:C.muted}}>
            {v.label[lang]||v.label.fr}
          </button>
        ))}
      </div>
      {/* Screen */}
      {view==="ecdis" ? (
        <div style={{background:"#000810",borderRadius:14,padding:"10px",marginBottom:10,border:`1px solid ${C.ecdis}33`}}>
          <div style={{fontSize:8,color:C.ecdis,letterSpacing:2,marginBottom:6}}>ECDIS — ENC S-57 ACTIVE</div>
          {/* Layers filter */}
          <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
            {layers.map(l=>(
              <button key={l.id} onClick={()=>setLayer(l.id)} style={{
                padding:"3px 8px",borderRadius:8,cursor:"pointer",fontSize:8,fontWeight:700,
                background:layer===l.id||layer==="all"?`${l.color}22`:"rgba(255,255,255,0.03)",
                border:`1px solid ${layer===l.id||layer==="all"?l.color:"rgba(255,255,255,0.06)"}`,
                color:layer===l.id||layer==="all"?l.color:C.muted}}>
                {l.label[lang]||l.label.fr}
              </button>
            ))}
          </div>
          <svg width="100%" viewBox="0 0 280 160" style={{display:"block"}}>
            {/* Sea */}
            <rect width={280} height={160} fill="#000c18"/>
            {/* Land */}
            <path d="M0,0 L100,0 L110,30 L90,60 L80,100 L0,120 Z" fill="#1a2d1a"/>
            {/* Coastline */}
            <path d="M100,0 L110,30 L90,60 L80,100 L0,120" fill="none" stroke={C.ecdis} strokeWidth={1.5}/>
            {/* Depth zones */}
            {(layer==="all"||layer==="depths")&&<>
              <path d="M110,30 L140,20 L160,40 L150,80 L130,100 L110,90 L90,60 Z" fill="rgba(0,80,150,0.3)"/>
              <path d="M140,20 L200,10 L220,50 L200,90 L160,100 L150,80 L160,40 Z" fill="rgba(0,50,120,0.5)"/>
              <path d="M200,10 L280,0 L280,90 L220,90 L200,50 Z" fill="rgba(0,20,80,0.7)"/>
              <text x={120} y={60} fontSize={7} fill={C.blue2} textAnchor="middle">5m</text>
              <text x={170} y={55} fontSize={7} fill={C.blue2} textAnchor="middle">20m</text>
              <text x={240} y={45} fontSize={7} fill={C.blue2} textAnchor="middle">50m+</text>
            </>}
            {/* Dangers */}
            {(layer==="all"||layer==="dangers")&&<>
              <text x={115} y={40} fontSize={10}>⚠️</text>
              <circle cx={145} cy={75} r={4} fill="none" stroke={C.red} strokeWidth={1} strokeDasharray="2,1"/>
              <text x={142} y={78} fontSize={6} fill={C.red}>+</text>
              <text x={126} y={92} fontSize={7} fill={C.red}>WRECK</text>
            </>}
            {/* Nav aids */}
            {(layer==="all"||layer==="nav")&&<>
              <circle cx={160} cy={30} r={4} fill={C.green} style={{filter:`drop-shadow(0 0 4px ${C.green})`}}/>
              <text x={160} y={25} fontSize={6} fill={C.green} textAnchor="middle">Fl.G.4s</text>
              <circle cx={200} cy={70} r={3} fill={C.red} style={{filter:`drop-shadow(0 0 3px ${C.red})`}}/>
            </>}
            {/* Ship */}
            <polygon points="180,120 175,135 185,135" fill={C.ecdis} style={{filter:`drop-shadow(0 0 5px ${C.ecdis})`}}/>
            {/* Route line */}
            <line x1={180} y1={120} x2={230} y2={60} stroke={C.ecdis} strokeWidth={1.5} strokeDasharray="4,2"/>
            {/* Safety contour */}
            <path d="M130,30 L160,18 L180,45 L170,90 L145,105 L125,95 L115,70 Z" fill="none" stroke="#ffaa0066" strokeWidth={1} strokeDasharray="4,2"/>
            <text x={145} y={135} fontSize={6} fill="#ffaa00">— Safety contour 5m</text>
            {/* AIS target */}
            <polygon points="240,40 236,50 244,50" fill={C.ais} opacity={0.8}/>
            <text x={248} y={47} fontSize={6} fill={C.ais}>AIS</text>
          </svg>
          <div style={{fontSize:9,color:C.ecdis,marginTop:6,lineHeight:1.5}}>
            {lang==="fr"?"✓ Mise à jour automatique · ✓ Alarmes automatiques · ✓ Intégration GPS/AIS/Radar":
             lang==="en"?"✓ Automatic updates · ✓ Automatic alarms · ✓ GPS/AIS/Radar integration":
             "✓ Actualización automática · ✓ Alarmas automáticas · ✓ Integración GPS/AIS/Radar"}
          </div>
        </div>
      ) : (
        <div style={{background:"#1a1200",borderRadius:14,padding:"10px",marginBottom:10,border:`1px solid ${C.gold2}33`}}>
          <div style={{fontSize:8,color:C.gold2,letterSpacing:2,marginBottom:6}}>CARTE PAPIER — ADMIRALTY 1234</div>
          <svg width="100%" viewBox="0 0 280 160" style={{display:"block"}}>
            <rect width={280} height={160} fill="#f5f0e0"/>
            <path d="M0,0 L100,0 L110,30 L90,60 L80,100 L0,120 Z" fill="#c8d4a0"/>
            <path d="M100,0 L110,30 L90,60 L80,100 L0,120" fill="none" stroke="#333" strokeWidth={1.5}/>
            <text x={120} y={60} fontSize={7} fill="#003087" textAnchor="middle">5</text>
            <text x={170} y={55} fontSize={7} fill="#003087" textAnchor="middle">20</text>
            <text x={240} y={45} fontSize={7} fill="#003087" textAnchor="middle">50</text>
            <text x={115} y={42} fontSize={8}>⊕</text>
            <circle cx={145} cy={75} r={4} fill="none" stroke="#c0392b" strokeWidth={1}/>
            <line x1={141} y1={75} x2={149} y2={75} stroke="#c0392b" strokeWidth={1}/>
            <text x={126} y={92} fontSize={6} fill="#c0392b">Wk</text>
            <circle cx={160} cy={30} r={3} fill="#27ae60"/>
            <text x={165} y={28} fontSize={6} fill="#27ae60">Fl.G.4s</text>
            <text x={3} y={150} fontSize={6} fill="#333">Pub. 2019 · Corrections NtM requises</text>
            <text x={140} y={150} fontSize={6} fill="#c0392b">⚠️ Mise à jour manuelle obligatoire</text>
          </svg>
          <div style={{fontSize:9,color:C.gold2,marginTop:6,lineHeight:1.5}}>
            {lang==="fr"?"⚠️ Mise à jour manuelle · ⚠️ Pas d'alarmes · ⚠️ Pas d'intégration electronique":
             lang==="en"?"⚠️ Manual updates · ⚠️ No alarms · ⚠️ No electronic integration":
             "⚠️ Actualización manual · ⚠️ Sin alarmas · ⚠️ Sin integración electrónica"}
          </div>
        </div>
      )}
      {/* Comparison table */}
      <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"}}>
        {[
          { feature:{fr:"Mise à jour",en:"Updates",es:"Actualizaciones",pt:"Atualizações"}, ecdis:{fr:"Auto (hebdo)",en:"Auto (weekly)",es:"Auto (semanal)",pt:"Auto (semanal)"}, paper:{fr:"Manuelle NtM",en:"Manual NtM",es:"Manual NtM",pt:"Manual NtM"} },
          { feature:{fr:"Alarme sécurité",en:"Safety alarm",es:"Alarma seguridad",pt:"Alarme segurança"}, ecdis:{fr:"✓ Automatique",en:"✓ Automatic",es:"✓ Automática",pt:"✓ Automático"}, paper:{fr:"✗ Aucune",en:"✗ None",es:"✗ Ninguna",pt:"✗ Nenhuma"} },
          { feature:{fr:"Intégration GPS",en:"GPS integration",es:"Integración GPS",pt:"Integração GPS"}, ecdis:{fr:"✓ Position live",en:"✓ Live position",es:"✓ Posición live",pt:"✓ Posição ao vivo"}, paper:{fr:"✗ Manuelle",en:"✗ Manual",es:"✗ Manual",pt:"✗ Manual"} },
          { feature:{fr:"SOLAS > 500 TB",en:"SOLAS > 500 GT",es:"SOLAS > 500 TB",pt:"SOLAS > 500 TB"}, ecdis:{fr:"✓ Obligatoire",en:"✓ Mandatory",es:"✓ Obligatorio",pt:"✓ Obrigatório"}, paper:{fr:"❌ Insuffisant",en:"❌ Insufficient",es:"❌ Insuficiente",pt:"❌ Insuficiente"} },
        ].map((row,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:i%2===0?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.01)"}}>
            <div style={{padding:"6px 8px",fontSize:9,color:C.muted,borderRight:"1px solid rgba(255,255,255,0.06)"}}>{row.feature[lang]||row.feature.fr}</div>
            <div style={{padding:"6px 8px",fontSize:9,color:C.ecdis,borderRight:"1px solid rgba(255,255,255,0.06)"}}>{row.ecdis[lang]||row.ecdis.fr}</div>
            <div style={{padding:"6px 8px",fontSize:9,color:C.gold2}}>{row.paper[lang]||row.paper.fr}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — RADAR SCREEN
// ══════════════════════════════════════
function RadarScreenSVG({ lang }) {
  const [sweep, setSweep] = useState(0);
  const [selTarget, setSelTarget] = useState(null);

  useEffect(()=>{
    const iv = setInterval(()=>setSweep(s=>(s+3)%360), 80);
    return ()=>clearInterval(iv);
  },[]);

  const targets = [
    { angle:30, dist:0.5, type:{fr:"Navire commerce",en:"Commercial vessel",es:"Buque mercante",pt:"Navio comercial"},
      cpa:{fr:"CPA 0.8 NM dans 12 min — SURVEILLER",en:"CPA 0.8 NM in 12 min — MONITOR",es:"CPA 0.8 NM en 12 min — VIGILAR",pt:"CPA 0.8 NM em 12 min — VIGIAR"},
      color:"#ffff00", danger:false },
    { angle:120, dist:0.65, type:{fr:"Bouée / écho fixe",en:"Buoy / fixed echo",es:"Boya / eco fijo",pt:"Boia / eco fixo"},
      cpa:{fr:"Écho FIXE — Bouée ou obstacle stationnaire",en:"FIXED echo — Buoy or stationary obstacle",es:"Eco FIJO — Boya u obstáculo estacionario",pt:"Eco FIXO — Boia ou obstáculo estacionário"},
      color:"#00ccff", danger:false },
    { angle:345, dist:0.35, type:{fr:"Navire en approche rapide",en:"Fast approaching vessel",es:"Buque que se aproxima rápidamente",pt:"Navio de aproximação rápida"},
      cpa:{fr:"⚠️ CPA 0.1 NM dans 4 min — DANGER · Manœuvrer MAINTENANT",en:"⚠️ CPA 0.1 NM in 4 min — DANGER · Maneuver NOW",es:"⚠️ CPA 0.1 NM en 4 min — PELIGRO · Maniobrar AHORA",pt:"⚠️ CPA 0.1 NM em 4 min — PERIGO · Manobrar AGORA"},
      color:C.red, danger:true },
  ];

  const cx=140, cy=100, R=85;
  const toXY = (angle, dist) => ({
    x: cx + dist*R*Math.sin(angle*Math.PI/180),
    y: cy - dist*R*Math.cos(angle*Math.PI/180),
  });
  const sweepEnd = toXY(sweep, 1);

  return (
    <div>
      <div style={{background:"#000800",borderRadius:14,padding:"8px",marginBottom:10,border:`1px solid ${C.radar}22`}}>
        <div style={{fontSize:8,color:C.radar,letterSpacing:2,marginBottom:4}}>RADAR — RANGE 6 NM · ARPA ACTIVE</div>
        <svg width="100%" viewBox="0 0 280 200" style={{display:"block"}}>
          {/* Radar circles */}
          {[0.25,0.5,0.75,1].map((r,i)=>(
            <circle key={i} cx={cx} cy={cy} r={r*R} fill="none" stroke={`${C.radar}20`} strokeWidth={0.5}/>
          ))}
          {/* Cross */}
          <line x1={cx-R} y1={cy} x2={cx+R} y2={cy} stroke={`${C.radar}15`} strokeWidth={0.5}/>
          <line x1={cx} y1={cy-R} x2={cx} y2={cy+R} stroke={`${C.radar}15`} strokeWidth={0.5}/>
          {/* Range labels */}
          <text x={cx+R*0.25+2} y={cy-2} fontSize={5} fill={`${C.radar}60`}>1.5NM</text>
          <text x={cx+R*0.5+2} y={cy-2} fontSize={5} fill={`${C.radar}60`}>3NM</text>
          <text x={cx+R*0.75+2} y={cy-2} fontSize={5} fill={`${C.radar}60`}>4.5NM</text>
          {/* Sweep */}
          <defs>
            <linearGradient id="sweepG" x1="0" y1="0" x2="1" y2="0" gradientTransform={`rotate(${sweep},${cx},${cy})`}>
              <stop offset="0%" stopColor={C.radar} stopOpacity="0"/>
              <stop offset="80%" stopColor={C.radar} stopOpacity="0.15"/>
              <stop offset="100%" stopColor={C.radar} stopOpacity="0.5"/>
            </linearGradient>
          </defs>
          <path d={`M${cx},${cy} L${sweepEnd.x},${sweepEnd.y} A${R},${R} 0 0,1 ${cx+R*Math.sin((sweep-30)*Math.PI/180)},${cy-R*Math.cos((sweep-30)*Math.PI/180)} Z`}
            fill={`url(#sweepG)`}/>
          <line x1={cx} y1={cy} x2={sweepEnd.x} y2={sweepEnd.y} stroke={C.radar} strokeWidth={1} opacity={0.8}/>
          {/* Targets */}
          {targets.map((tg,i)=>{
            const pos = toXY(tg.angle, tg.dist);
            const isVis = Math.abs(((sweep - tg.angle + 360)%360)) < 30;
            return (
              <g key={i} onClick={()=>setSelTarget(selTarget===i?null:i)} style={{cursor:"pointer"}}>
                <circle cx={pos.x} cy={pos.y} r={selTarget===i?6:4}
                  fill={tg.color} opacity={isVis?1:0.4}
                  style={{filter:`drop-shadow(0 0 ${selTarget===i?6:3}px ${tg.color})`}}/>
                {/* ARPA vector */}
                {tg.danger&&<line x1={pos.x} y1={pos.y} x2={cx+5} y2={cy-5} stroke={C.red} strokeWidth={1} strokeDasharray="2,2" opacity={0.7}/>}
                <text x={pos.x+8} y={pos.y+3} fontSize={6} fill={tg.color}>{i+1}</text>
              </g>
            );
          })}
          {/* Own vessel */}
          <circle cx={cx} cy={cy} r={4} fill={C.radar} style={{filter:`drop-shadow(0 0 4px ${C.radar})`}}/>
          <text x={cx+6} y={cy-4} fontSize={6} fill={C.radar}>OWN</text>
          {/* North indicator */}
          <text x={cx} y={cy-R-4} textAnchor="middle" fontSize={8} fill={C.radar} fontWeight="bold">N</text>
        </svg>
      </div>
      {/* Target info */}
      {selTarget!==null&&(
        <div style={{padding:"10px",borderRadius:12,background:`${targets[selTarget].color}12`,border:`1.5px solid ${targets[selTarget].color}44`,animation:"fadeUp 0.3s ease",marginBottom:8}}>
          <div style={{fontSize:11,fontWeight:700,color:targets[selTarget].color,marginBottom:4}}>
            Target {selTarget+1} — {targets[selTarget].type[lang]||targets[selTarget].type.fr}
          </div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{targets[selTarget].cpa[lang]||targets[selTarget].cpa.fr}</div>
        </div>
      )}
      <div style={{display:"flex",gap:6}}>
        {targets.map((tg,i)=>(
          <button key={i} onClick={()=>setSelTarget(selTarget===i?null:i)} style={{
            flex:1,padding:"6px 4px",borderRadius:8,cursor:"pointer",fontSize:9,fontWeight:700,textAlign:"center",
            background:selTarget===i?`${tg.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${selTarget===i?tg.color:"rgba(255,255,255,0.08)"}`,
            color:selTarget===i?tg.color:C.muted}}>
            {tg.danger?"⚠️ ":""}Target {i+1}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SYSTEMS INTEGRATION QUIZ
// ══════════════════════════════════════
function SystemsQuizSVG({ lang }) {
  const [qIdx, setQIdx] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const qs = {
    fr:[
      { q:"L'AIS Classe A transmet ses données toutes les…", opts:["2-10 secondes en route","30 secondes en route","2 minutes en route","5 minutes en route"], correct:0 },
      { q:"ECDIS est obligatoire sur les navires SOLAS de plus de…", opts:["300 tonneaux","500 tonneaux de jauge brute","1000 milles nautiques","50 nœuds"], correct:1 },
      { q:"Sur un écran radar, qu'est-ce que le CPA ?", opts:["Cap préférentiel d'approche","Closest Point of Approach — distance minimale prévue entre les deux navires","Canal préférentiel AIS","Contour principal ARPA"], correct:1 },
      { q:"Que signifie ARPA sur un radar maritime ?", opts:["Automatic Radar Positioning Aid","Automatic Radar Plotting Aid — système automatique de suivi des échos radar","Advanced Radar Position Alarm","Aided Radar Path Analysis"], correct:1 },
      { q:"Un AIS-SART différencie-t-il des cibles AIS normales ?", opts:["Non — identique","Oui — transmit une alerte spéciale + MMSI commençant par 970","Oui — canal différent","Non — invisible sur AIS"], correct:1 },
    ],
    en:[
      { q:"AIS Class A transmits data every…", opts:["2-10 seconds underway","30 seconds underway","2 minutes underway","5 minutes underway"], correct:0 },
      { q:"ECDIS is mandatory on SOLAS vessels over…", opts:["300 gross tons","500 gross tonnage","1000 nautical miles","50 knots"], correct:1 },
      { q:"On a radar screen, what is CPA?", opts:["Preferred approach course","Closest Point of Approach — minimum predicted distance between two vessels","Preferred AIS channel","Main ARPA contour"], correct:1 },
      { q:"What does ARPA mean on a maritime radar?", opts:["Automatic Radar Positioning Aid","Automatic Radar Plotting Aid — automatic tracking system for radar echoes","Advanced Radar Position Alarm","Aided Radar Path Analysis"], correct:1 },
      { q:"Does an AIS-SART differentiate from normal AIS targets?", opts:["No — identical","Yes — transmits special alert + MMSI starting with 970","Yes — different channel","No — invisible on AIS"], correct:1 },
    ],
    es:[
      { q:"El AIS Clase A transmite sus datos cada…", opts:["2-10 segundos en ruta","30 segundos en ruta","2 minutos en ruta","5 minutos en ruta"], correct:0 },
      { q:"El SEEC es obligatorio en buques SOLAS de más de…", opts:["300 toneladas","500 toneladas de arqueo bruto","1000 millas náuticas","50 nudos"], correct:1 },
      { q:"En una pantalla de radar, ¿qué es el CPA?", opts:["Rumbo preferente de aproximación","Closest Point of Approach — distancia mínima prevista entre los dos buques","Canal preferente AIS","Contorno principal ARPA"], correct:1 },
      { q:"¿Qué significa ARPA en un radar marítimo?", opts:["Automatic Radar Positioning Aid","Automatic Radar Plotting Aid — sistema automático de seguimiento de ecos de radar","Advanced Radar Position Alarm","Aided Radar Path Analysis"], correct:1 },
      { q:"¿Un AIS-SART se diferencia de las blancos AIS normales?", opts:["No — idéntico","Sí — transmite una alerta especial + MMSI que comienza por 970","Sí — canal diferente","No — invisible en AIS"], correct:1 },
    ],
    pt:[
      { q:"O AIS Classe A transmite dados a cada…", opts:["2-10 segundos em rota","30 segundos em rota","2 minutos em rota","5 minutos em rota"], correct:0 },
      { q:"O ECDIS é obrigatório em navios SOLAS de mais de…", opts:["300 toneladas","500 toneladas de arqueação bruta","1000 milhas náuticas","50 nós"], correct:1 },
      { q:"Num ecrã de radar, o que é CPA?", opts:["Curso preferencial de aproximação","Closest Point of Approach — distância mínima prevista entre os dois navios","Canal preferencial AIS","Contorno principal ARPA"], correct:1 },
      { q:"O que significa ARPA num radar marítimo?", opts:["Automatic Radar Positioning Aid","Automatic Radar Plotting Aid — sistema automático de seguimento de ecos de radar","Advanced Radar Position Alarm","Aided Radar Path Analysis"], correct:1 },
      { q:"Um AIS-SART diferencia-se dos alvos AIS normais?", opts:["Não — idêntico","Sim — transmite um alerta especial + MMSI começando por 970","Sim — canal diferente","Não — invisível no AIS"], correct:1 },
    ],
  };

  const list = qs[lang]||qs.fr;
  const q = list[qIdx];
  const pick=(i)=>{if(ans!==null)return;setAns(i);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(qIdx<list.length-1){setQIdx(q=>q+1);setAns(null);}else setDone(true);};

  if(done) return (
    <div style={{textAlign:"center",padding:"16px"}}>
      <div style={{fontSize:40}}>{score>=4?"🏆":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:C.white,margin:"8px 0"}}>{score}/{list.length}</div>
      <button onClick={()=>{setDone(false);setQIdx(0);setAns(null);setScore(0);}} style={{padding:"8px 16px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:C.muted,cursor:"pointer",fontSize:11}}>🔄 Retry</button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {list.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<qIdx?C.ecdis:i===qIdx?C.gold2:"rgba(255,255,255,0.1)"}}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.5}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(ans!==null){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===ans){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:ans!==null?"default":"pointer"}}>{opt}</button>;
        })}
      </div>
      {ans!==null&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.ecdis},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:C.navy,cursor:"pointer"}}>
        {qIdx<list.length-1?"NEXT →":"FINISH"}
      </button>}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Naufrage MV Prestige — Galice (2002)",teaser:"Pétrolier · déversement 77 000t fuel · ECDIS non à jour · route de sécurité non suivie · Espagne",what:"Le 13 novembre 2002, le pétrolier MV Prestige subit une avarie majeure à 50km des côtes galiciennes. Le navire perd 5 000 tonnes de fuel immédiatement, puis coule le 19 novembre après 6 jours de dérive. 77 000 tonnes de fuel lourd (fioul numéro 6) contaminent les côtes espagnoles, portugaises et françaises.",cause:"• Carte électronique non mise à jour (rochers sous-marins non signalés)\n• Pas d'alerte AIS de détresse transmise immédiatement\n• Décision tardive de remorquage vers port de refuge\n• Autorités espagnoles ont refusé le port de refuge\n• Systèmes de navigation intégrés non utilisés de façon optimale\n• Structure du navire déjà fragilisée (24 ans)",lessons:"✓ ECDIS mise à jour = obligation légale hebdomadaire\n✓ AIS doit refléter l'état réel du navire (statut RAM si avarie)\n✓ Radar + ECDIS + AIS = triangulation sécurité\n✓ Un échouage contrôlé vaut mieux qu'un naufrage en mer\n✓ MARPOL : pollution maritime = responsabilité armateur",link:"🔗 Lien L6 : Le Prestige illustre que la navigation électronique n'est utile que si les données sont à jour et si les systèmes sont correctement utilisés. Un ECDIS non mis à jour est pire qu'une carte papier car il crée une fausse sécurité."},
    en:{title:"MV Prestige Sinking — Galicia (2002)",teaser:"Tanker · 77,000t fuel spill · ECDIS not updated · safety route not followed · Spain",what:"On November 13, 2002, tanker MV Prestige suffers a major casualty 50km off the Galician coast. The vessel loses 5,000 tonnes of fuel immediately, then sinks on November 19 after 6 days adrift. 77,000 tonnes of heavy fuel oil contaminate Spanish, Portuguese and French coastlines.",cause:"• Electronic chart not updated (uncharted submarine rocks)\n• No DSC distress alert transmitted immediately\n• Late decision to tow to port of refuge\n• Spanish authorities refused port of refuge\n• Integrated navigation systems not optimally used\n• Vessel structure already weakened (24 years old)",lessons:"✓ ECDIS updates = mandatory weekly legal obligation\n✓ AIS must reflect actual vessel status (RAM if damaged)\n✓ Radar + ECDIS + AIS = safety triangulation\n✓ A controlled grounding is better than sinking at sea\n✓ MARPOL: maritime pollution = shipowner responsibility",link:"🔗 L6 Link: The Prestige illustrates that electronic navigation is only useful if data is current and systems are correctly used. An outdated ECDIS is worse than a paper chart as it creates false security."},
    es:{title:"Hundimiento MV Prestige — Galicia (2002)",teaser:"Petrolero · vertido 77.000t fuel · SEEC no actualizado · ruta de seguridad no seguida · España",what:"El 13 de noviembre de 2002, el petrolero MV Prestige sufre una avería mayor a 50km de las costas gallegas. El buque pierde 5.000 toneladas de fuel inmediatamente y se hunde el 19 de noviembre tras 6 días a la deriva. 77.000 toneladas de fuel pesado contaminan las costas españolas, portuguesas y francesas.",cause:"• Carta electrónica no actualizada (rocas submarinas no cartografiadas)\n• No se transmitió ninguna alerta LSD de socorro inmediatamente\n• Decisión tardía de remolque hacia puerto de refugio\n• Las autoridades españolas rechazaron el puerto de refugio\n• Sistemas de navegación integrados no usados óptimamente\n• Estructura del buque ya debilitada (24 años)",lessons:"✓ Actualización SEEC = obligación legal semanal\n✓ El AIS debe reflejar el estado real del buque\n✓ Radar + SEEC + AIS = triangulación de seguridad\n✓ Un varado controlado es mejor que un hundimiento en el mar\n✓ MARPOL: contaminación marítima = responsabilidad del armador",link:"🔗 Vínculo L6: El Prestige ilustra que la navegación electrónica solo es útil si los datos están actualizados y los sistemas se usan correctamente. Un SEEC no actualizado es peor que una carta en papel."},
    pt:{title:"Naufrágio MV Prestige — Galiza (2002)",teaser:"Petroleiro · derrame 77.000t fuel · ECDIS não atualizado · rota de segurança não seguida · Espanha",what:"A 13 de novembro de 2002, o petroleiro MV Prestige sofre uma avaria grave a 50km da costa galega. O navio perde 5.000 toneladas de fuel imediatamente e afunda a 19 de novembro após 6 dias à deriva. 77.000 toneladas de fuelóleo pesado contaminam as costas espanhola, portuguesa e francesa.",cause:"• Carta eletrónica não atualizada (rochas submarinas não cartografadas)\n• Sem alerta ASN de socorro transmitido imediatamente\n• Decisão tardia de reboque para porto de abrigo\n• Autoridades espanholas recusaram porto de abrigo\n• Sistemas de navegação integrados não usados de forma otimizada\n• Estrutura do navio já fragilizada (24 anos)",lessons:"✓ Atualização ECDIS = obrigação legal semanal\n✓ AIS deve refletir o estado real do navio\n✓ Radar + ECDIS + AIS = triangulação de segurança\n✓ Um encalhe controlado é melhor do que naufragar no mar\n✓ MARPOL: poluição marítima = responsabilidade do armador",link:"🔗 Vínculo L6: O Prestige ilustra que a navegação eletrónica só é útil se os dados estiverem atualizados e os sistemas forem corretamente usados. Um ECDIS não atualizado é pior do que uma carta em papel."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.ecdis}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🛢️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.ecdis,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>CAUSES</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(0,204,255,0.08)",border:`1px solid ${C.ecdis}33`,fontSize:11,color:C.ecdis,lineHeight:1.6}}>{c.link}</div>
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
  const qs={
    fr:[
      {id:"q1",q:"AIS Classe A = transmission toutes les combien de secondes EN ROUTE ?\n(Répondre : les 2 chiffres)",correct:"2 à 10 secondes"},
      {id:"q2",q:"ECDIS = obligatoire sur navires SOLAS de plus de combien de tonneaux ?\n(Répondre : le chiffre)",correct:"500"},
      {id:"q3",q:"Sur radar, CPA = ?\n(Répondre : les initiales développées)",correct:"Closest Point of Approach"},
    ],
    en:[
      {id:"q1",q:"AIS Class A = transmission every how many seconds UNDERWAY?\n(Answer: the 2 numbers)",correct:"2 to 10 seconds"},
      {id:"q2",q:"ECDIS = mandatory on SOLAS vessels over how many gross tons?\n(Answer: the number)",correct:"500"},
      {id:"q3",q:"On radar, CPA = ?\n(Answer: the full acronym)",correct:"Closest Point of Approach"},
    ],
    es:[
      {id:"q1",q:"¿AIS Clase A = transmisión cada cuántos segundos EN RUTA?\n(Responder: los 2 números)",correct:"2 a 10 segundos"},
      {id:"q2",q:"¿SEEC = obligatorio en buques SOLAS de más de cuántas toneladas?\n(Responder: el número)",correct:"500"},
      {id:"q3",q:"¿En radar, CPA = ?\n(Responder: las siglas desarrolladas)",correct:"Closest Point of Approach"},
    ],
    pt:[
      {id:"q1",q:"AIS Classe A = transmissão a cada quantos segundos EM ROTA?\n(Responder: os 2 números)",correct:"2 a 10 segundos"},
      {id:"q2",q:"ECDIS = obrigatório em navios SOLAS de mais de quantas toneladas?\n(Responder: o número)",correct:"500"},
      {id:"q3",q:"No radar, CPA = ?\n(Responder: as siglas por extenso)",correct:"Closest Point of Approach"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("2")&&v.includes("10");
    if(q.id==="q2") return v.includes("500");
    if(q.id==="q3") return v.includes("closest")&&v.includes("point")&&v.includes("approach");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.ecdis}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : AIS-A = 2-10s en route · ECDIS obligatoire >500 TB · CPA = Closest Point of Approach"
        :lang==="en"?"💡 Reminders: AIS-A = 2-10s underway · ECDIS mandatory >500 GT · CPA = Closest Point of Approach"
        :lang==="es"?"💡 Recordatorios: AIS-A = 2-10s en ruta · SEEC obligatorio >500 TB · CPA = Closest Point of Approach"
        :"💡 Lembretes: AIS-A = 2-10s em rota · ECDIS obrigatório >500 TB · CPA = Closest Point of Approach"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:13,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: 2 à 10 SECONDES (AIS-A en route faisant route · 3 min à l'arrêt)\n✅ Q2: 500 tonneaux de jauge brute (SOLAS phase 2010-2018)\n✅ Q3: CLOSEST POINT OF APPROACH (distance minimale prévue entre 2 navires)"
        :lang==="en"?"✅ Q1: 2 TO 10 SECONDS (AIS-A underway · 3 min when stopped)\n✅ Q2: 500 gross tonnage (SOLAS phase 2010-2018)\n✅ Q3: CLOSEST POINT OF APPROACH (minimum predicted distance between 2 vessels)"
        :"✅ Q1: 2 a 10 segundos · Q2: 500 toneladas · Q3: Closest Point of Approach"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":`${C.ecdis}12`,border:`1px solid ${showC?C.green:C.ecdis}44`,color:showC?C.green:C.ecdis,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quelle est la principale différence entre l'AIS Classe A et l'AIS Classe B ?",opts:["La couleur des cibles","Classe A = navires commerciaux SOLAS · transmission toutes les 2-10 secondes · Classe B = plaisance/petits navires · transmission toutes les 30 secondes","Classe A utilise le canal 16","Classe B est plus précis"],correct:1,expl:"AIS Classe A : Obligatoire sur navires SOLAS > 300 TB en voyages internationaux et > 500 TB en voyages nationaux. Transmet toutes les 2-10 secondes en route, 3 min à l'arrêt. Portée : 20-40 milles. Données : cap, vitesse, statut, destination, ETA, tirant d'eau. AIS Classe B : Navires non SOLAS, plaisance. Transmet toutes les 30 secondes en route, 3 min à l'arrêt. Portée : 5-10 milles. Données limitées (pas de destination ni tirant d'eau)."},
    {q:"Qu'est-ce que l'ECDIS et sur quels navires est-il obligatoire ?",opts:["Un type de radar","Electronic Chart Display and Information System — affichage de cartes électroniques avec alarmes · obligatoire SOLAS sur navires > 500 TB","Un VHF spécialisé","Un système GPS"],correct:1,expl:"ECDIS (Electronic Chart Display and Information System) = système d'affichage de cartes électroniques remplaçant officiellement les cartes papier si toutes les conditions SOLAS sont remplies. Obligatoire : navires à passagers > 500 TB (2012), cargaisons > 3000 TB (2013), cargaisons > 500 TB (2014-2018). Fonctions : position GPS en temps réel, alarmes safety contour, mise à jour automatique des ENC, intégration AIS, ARPA. Deux types de cartes : ENC (vector) et RNC (raster)."},
    {q:"Sur un écran ARPA (radar), que signifie une alarme 'CPA trop court' ?",opts:["Le cap est incorrect","Le navire cible va passer à une distance dangereusement proche — prendre une action d'évitement immédiate","La portée radar est insuffisante","Un contact est perdu"],correct:1,expl:"CPA (Closest Point of Approach) = distance minimale prévue entre votre navire et une cible si les deux maintiennent leur route et vitesse. Alarme CPA court = la distance prévue est inférieure au seuil réglé (ex: < 0.5 mille). TCPA (Time to CPA) = temps avant ce passage au plus près. Action : si CPA < limite sécurité ET TCPA court → manœuvre d'évitement immédiate selon COLREG. ARPA calcule automatiquement CPA et TCPA pour chaque cible suivie."},
    {q:"Qu'est-ce que l'AIS-SART et comment se distingue-t-il sur un récepteur AIS ?",opts:["Un type d'EPIRB","Répondeur AIS de survie — émet en cas de détresse · MMSI commence par 970 · cible spéciale sur écran AIS avec alerte","Un radar portatif","Un canal VHF spécial"],correct:1,expl:"AIS-SART (AIS Search And Rescue Transmitter) = balise de survie individuelle émettant sur AIS (canal 161.975 MHz et 162.025 MHz). Activé en cas de naufrage ou homme à la mer. Identification unique : MMSI commençant par 970. Apparaît sur l'écran AIS comme cible spéciale avec symbole d'alerte. Portée : 5-10 milles (navire), 40+ milles (aéronef SAR). Avantage sur SART radar : identifiable à plus grande portée, non impacté par la pluie."},
    {q:"Que doit faire un officier de quart si l'ECDIS tombe en panne ?",opts:["Continuer sans système de navigation","Passer immédiatement aux cartes papier de secours (backups) et vérifier que leur mise à jour est à jour","Arrêter le navire","Utiliser uniquement le GPS"],correct:1,expl:"Panne ECDIS : SOLAS exige que les cartes papier de secours (backup paper charts) soient TOUJOURS disponibles et à jour. Procédure : 1. Passage immédiat aux cartes papier. 2. Informer le capitaine. 3. Continuer la navigation avec radar + cartes papier + GPS portable. 4. Tenter de redémarrer l'ECDIS. 5. Enregistrer l'incident dans le journal de bord. Une panne ECDIS seule NE JUSTIFIE PAS d'arrêt du navire si les cartes papier sont disponibles."},
  ],
  en:[
    {q:"What is the main difference between AIS Class A and AIS Class B?",opts:["Target color","Class A = SOLAS commercial vessels · transmits every 2-10 seconds · Class B = leisure/small vessels · transmits every 30 seconds","Class A uses channel 16","Class B is more precise"],correct:1,expl:"AIS Class A: Mandatory on SOLAS vessels > 300 GT on international voyages and > 500 GT on national voyages. Transmits every 2-10 seconds underway, 3 min when stopped. Range: 20-40 miles. Data: course, speed, status, destination, ETA, draught. AIS Class B: Non-SOLAS vessels, leisure. Transmits every 30 seconds underway, 3 min when stopped. Range: 5-10 miles. Limited data (no destination or draught)."},
    {q:"What is ECDIS and on which vessels is it mandatory?",opts:["A type of radar","Electronic Chart Display and Information System — electronic chart display with alarms · SOLAS mandatory on vessels > 500 GT","A specialized VHF","A GPS system"],correct:1,expl:"ECDIS = officially replaces paper charts if all SOLAS conditions are met. Mandatory: passenger vessels > 500 GT (2012), cargo > 3000 GT (2013), cargo > 500 GT (2014-2018). Functions: real-time GPS position, safety contour alarms, automatic ENC updates, AIS integration, ARPA. Two chart types: ENC (vector) and RNC (raster)."},
    {q:"On an ARPA (radar) screen, what does a 'CPA too short' alarm mean?",opts:["The course is incorrect","The target vessel will pass at a dangerously close distance — take immediate avoidance action","The radar range is insufficient","A contact is lost"],correct:1,expl:"CPA (Closest Point of Approach) = minimum predicted distance between your vessel and a target if both maintain course and speed. Short CPA alarm = predicted distance below set threshold (e.g. < 0.5 mile). TCPA (Time to CPA) = time until closest point. Action: if CPA < safety limit AND TCPA short → immediate avoidance maneuver per COLREG. ARPA automatically calculates CPA and TCPA for each tracked target."},
    {q:"What is AIS-SART and how does it distinguish itself on an AIS receiver?",opts:["A type of EPIRB","Survival AIS transmitter — emits in distress · MMSI starts with 970 · special target on AIS screen with alert","A portable radar","A special VHF channel"],correct:1,expl:"AIS-SART (AIS Search And Rescue Transmitter) = individual survival beacon transmitting on AIS (channel 161.975 MHz and 162.025 MHz). Activated in case of shipwreck or man overboard. Unique identification: MMSI starting with 970. Appears on AIS screen as special target with alert symbol. Range: 5-10 miles (vessel), 40+ miles (SAR aircraft). Advantage over radar SART: identifiable at greater range, not impacted by rain."},
    {q:"What should a watch officer do if the ECDIS fails?",opts:["Continue without navigation system","Immediately switch to backup paper charts and verify they are up to date","Stop the vessel","Use GPS only"],correct:1,expl:"ECDIS failure: SOLAS requires that backup paper charts are ALWAYS available and up to date. Procedure: 1. Immediate switch to paper charts. 2. Inform captain. 3. Continue navigation with radar + paper charts + portable GPS. 4. Attempt ECDIS restart. 5. Log the incident in the logbook. An ECDIS failure alone does NOT justify stopping the vessel if paper charts are available."},
  ],
  es:[
    {q:"¿Cuál es la principal diferencia entre el AIS Clase A y el AIS Clase B?",opts:["El color de los blancos","Clase A = buques comerciales SOLAS · transmisión cada 2-10 segundos · Clase B = náutica recreativa/buques pequeños · transmisión cada 30 segundos","La Clase A usa el canal 16","La Clase B es más preciso"],correct:1,expl:"AIS Clase A: Obligatorio en buques SOLAS > 300 TB en viajes internacionales y > 500 TB en viajes nacionales. Transmite cada 2-10 segundos en ruta, 3 min parado. Alcance: 20-40 millas. Datos: rumbo, velocidad, estado, destino, ETA, calado. AIS Clase B: Buques no SOLAS, náutica recreativa. Transmite cada 30 segundos en ruta, 3 min parado. Alcance: 5-10 millas. Datos limitados."},
    {q:"¿Qué es el SEEC y en qué buques es obligatorio?",opts:["Un tipo de radar","Sistema de Exhibición de Cartas Electrónicas y de Información — visualización de cartas electrónicas con alarmas · SOLAS obligatorio en buques > 500 TB","Un VHF especializado","Un sistema GPS"],correct:1,expl:"SEEC = reemplaza oficialmente las cartas en papel si se cumplen todas las condiciones SOLAS. Obligatorio: buques de pasajeros > 500 TB (2012), carga > 3000 TB (2013), carga > 500 TB (2014-2018). Funciones: posición GPS en tiempo real, alarmas de curva de seguridad, actualización automática de ENC, integración AIS, ARPA."},
    {q:"En una pantalla ARPA (radar), ¿qué significa una alarma 'CPA demasiado corto'?",opts:["El rumbo es incorrecto","El buque objetivo pasará a una distancia peligrosamente cercana — tomar medidas de evasión inmediatas","El alcance del radar es insuficiente","Se pierde un contacto"],correct:1,expl:"CPA (Closest Point of Approach) = distancia mínima prevista entre su buque y un blanco si ambos mantienen su rumbo y velocidad. Alarma CPA corto = distancia prevista por debajo del umbral establecido. TCPA = tiempo hasta el punto de mayor proximidad. Acción: si CPA < límite de seguridad Y TCPA corto → maniobra de evasión inmediata según el COLREG."},
    {q:"¿Qué es el AIS-SART y cómo se distingue en un receptor AIS?",opts:["Un tipo de EPIRB","Transmisor AIS de supervivencia — emite en caso de socorro · MMSI comienza con 970 · blanco especial en pantalla AIS con alerta","Un radar portátil","Un canal VHF especial"],correct:1,expl:"AIS-SART = baliza de supervivencia individual que transmite en AIS. Activada en caso de naufragio o hombre al agua. Identificación única: MMSI que comienza con 970. Aparece en la pantalla AIS como blanco especial con símbolo de alerta. Alcance: 5-10 millas (buque), 40+ millas (aeronave SAR)."},
    {q:"¿Qué debe hacer el oficial de guardia si el SEEC falla?",opts:["Continuar sin sistema de navegación","Pasar inmediatamente a las cartas en papel de respaldo y verificar que están actualizadas","Detener el buque","Usar solo el GPS"],correct:1,expl:"Fallo del SEEC: el SOLAS exige que las cartas en papel de respaldo estén SIEMPRE disponibles y actualizadas. Procedimiento: 1. Cambio inmediato a cartas en papel. 2. Informar al capitán. 3. Continuar la navegación con radar + cartas en papel + GPS portátil. 4. Intentar reiniciar el SEEC. 5. Registrar el incidente en el diario de navegación."},
  ],
  pt:[
    {q:"Qual é a principal diferença entre o AIS Classe A e o AIS Classe B?",opts:["A cor dos alvos","Classe A = navios comerciais SOLAS · transmissão a cada 2-10 segundos · Classe B = recreio/pequenos navios · transmissão a cada 30 segundos","A Classe A usa o canal 16","A Classe B é mais preciso"],correct:1,expl:"AIS Classe A: Obrigatório em navios SOLAS > 300 TB em viagens internacionais e > 500 TB em viagens nacionais. Transmite a cada 2-10 segundos em rota, 3 min parado. Alcance: 20-40 milhas. Dados: rumo, velocidade, estado, destino, ETA, calado. AIS Classe B: Navios não SOLAS, recreio. Transmite a cada 30 segundos em rota, 3 min parado. Alcance: 5-10 milhas. Dados limitados."},
    {q:"O que é o ECDIS e em que navios é obrigatório?",opts:["Um tipo de radar","Electronic Chart Display and Information System — visualização de cartas eletrónicas com alarmes · SOLAS obrigatório em navios > 500 TB","Um VHF especializado","Um sistema GPS"],correct:1,expl:"ECDIS = substitui oficialmente as cartas em papel se todas as condições SOLAS forem cumpridas. Obrigatório: navios de passageiros > 500 TB (2012), carga > 3000 TB (2013), carga > 500 TB (2014-2018). Funções: posição GPS em tempo real, alarmes de curva de segurança, atualização automática de ENC, integração AIS, ARPA."},
    {q:"Num ecrã ARPA (radar), o que significa um alarme 'CPA muito curto'?",opts:["O rumo está incorreto","O navio alvo passará a uma distância perigosamente próxima — tomar ação de evasão imediata","O alcance do radar é insuficiente","Um contacto foi perdido"],correct:1,expl:"CPA (Closest Point of Approach) = distância mínima prevista entre o seu navio e um alvo se ambos mantiverem o rumo e a velocidade. Alarme CPA curto = distância prevista abaixo do limiar definido. TCPA = tempo até ao ponto de maior aproximação. Ação: se CPA < limite de segurança E TCPA curto → manobra de evasão imediata segundo o COLREG."},
    {q:"O que é o AIS-SART e como se distingue num recetor AIS?",opts:["Um tipo de EPIRB","Transmissor AIS de sobrevivência — emite em caso de perigo · MMSI começa com 970 · alvo especial no ecrã AIS com alerta","Um radar portátil","Um canal VHF especial"],correct:1,expl:"AIS-SART = baliza de sobrevivência individual que transmite no AIS. Ativada em caso de naufrágio ou homem ao mar. Identificação única: MMSI a começar com 970. Aparece no ecrã AIS como alvo especial com símbolo de alerta. Alcance: 5-10 milhas (navio), 40+ milhas (aeronave SAR)."},
    {q:"O que deve fazer o oficial de quarto se o ECDIS falhar?",opts:["Continuar sem sistema de navegação","Passar imediatamente para as cartas em papel de reserva e verificar que estão atualizadas","Parar o navio","Usar apenas o GPS"],correct:1,expl:"Falha do ECDIS: o SOLAS exige que as cartas em papel de reserva estejam SEMPRE disponíveis e atualizadas. Procedimento: 1. Mudança imediata para cartas em papel. 2. Informar o capitão. 3. Continuar a navegação com radar + cartas em papel + GPS portátil. 4. Tentar reiniciar o ECDIS. 5. Registar o incidente no diário de bordo."},
  ],
};

const BANK = {
  fr:[
    {q:"Qu'est-ce que le 'voyage data recorder' (VDR) et quelle est sa relation avec l'AIS ?",opts:["Un GPS spécial","Boîte noire maritime enregistrant données navigation (cap · vitesse · AIS · radar · VHF · alarmes) — obligatoire SOLAS · conserve 12h de données","Un type d'ECDIS","Un radar spécialisé"],correct:1,expl:"VDR (Voyage Data Recorder) = boîte noire maritime. Enregistre : position GPS, cap, vitesse, cap gyroscopique, données radar, images de l'écran navigation, communications VHF, alarmes, données AIS. Conserve au minimum 12h en boucle sur support résistant au choc et à l'immersion. S-VDR (Simplified VDR) pour navires <3000 TB. Obligatoire SOLAS > 3000 TB (passagers > 150m). Utilisé lors des enquêtes accidents. Les données AIS y sont intégrées."},
    {q:"Qu'est-ce que le TCPA dans le contexte ARPA/AIS ?",opts:["True Course Position Accuracy","Time to Closest Point of Approach — temps prévu avant que deux navires atteignent leur distance minimale de rapprochement","Total Course Planning Area","Tidal Current Position Analysis"],correct:1,expl:"TCPA (Time to CPA) = temps prévu avant que deux navires atteignent leur CPA. Combiné au CPA : CPA seul = distance future minimale. TCPA = quand cette distance sera atteinte. Règle pratique : si CPA < 0.5 NM ET TCPA < 12 minutes → situation d'abordage potentielle = manœuvre obligatoire selon COLREG. ARPA calcule automatiquement CPA et TCPA pour chaque écho suivi. L'officier doit prendre une décision avant que le TCPA soit trop court."},
    {q:"Qu'est-ce qu'une ENC (Electronic Navigation Chart) par rapport à une RNC ?",opts:["Elles sont identiques","ENC = carte vectorielle S-57 avec couches séparables · mise à jour automatique · alarmes ECDIS · RNC = scan de carte papier sans intelligence","ENC = plus ancienne","RNC = plus précise"],correct:1,expl:"ENC (Electronic Navigation Chart) = carte vectorielle au format S-57 (IHO). Couches séparables (profondeurs, danger, aides nav., etc.). Mise à jour automatique via AVCS/PRIMAR. Alarmes ECDIS basées sur les données vectorielles. Recommandée. RNC (Raster Navigation Chart) = scan numérique d'une carte papier. Pas de couches séparables. Pas d'alarmes intelligentes. Mise à jour manuelle. NE REMPLACE PAS officiellement les cartes papier selon SOLAS. Utilisée comme complément ou backup. ENC + ECDIS correctement configuré = carte papier officielle selon SOLAS."},
    {q:"Qu'est-ce que l'AIS reçoit mais ne TRANSMET pas ?",opts:["La position","Les navires passifs qui ne sont pas équipés d'AIS — l'AIS ne détecte que les navires qui émettent un signal AIS","Le cap","Le MMSI"],correct:1,expl:"LIMITE FONDAMENTALE DE L'AIS : un navire non équipé d'AIS ou dont l'AIS est éteint EST INVISIBLE sur l'écran AIS. Ex: petits navires de pêche, kayaks, voiliers < 15m non équipés, navires avec AIS éteint volontairement (pirates). COMPLÉMENTARITÉ : Radar = détecte TOUS les échos (y compris non-AIS). AIS = identifie et donne les informations des navires équipés. RÈGLE : ne jamais naviguer en se basant uniquement sur l'AIS. Le radar reste l'outil de détection primaire."},
    {q:"Qu'est-ce que la 'Safety Contour' sur ECDIS et pourquoi est-elle critique ?",opts:["Une ligne décorative","Isohyète de profondeur définie par l'officier — déclenche une alarme si le navire s'en approche en route · habituellement = tirant d'eau + marge de sécurité","Une carte spéciale","Un contour radar"],correct:1,expl:"Safety Contour ECDIS = profondeur minimum sécurisée définie par l'officier (ex: tirant d'eau 8m + marge 2m = safety contour 10m). Si le navire se dirige vers une zone < 10m de profondeur → ALARME. Les zones moins profondes que la safety contour sont affichées différemment (couleur d'alarme). RÈGLE : la safety contour doit TOUJOURS être définie et vérifiée avant chaque voyage. Réglage incorrect = pas d'alarme = risque d'échouage."},
    {q:"Qu'est-ce que le système AIS permet de faire que le radar NE peut pas faire ?",opts:["Détecter des objets","Identifier nominativement les navires (nom · MMSI · type · destination · ETA · tirant d'eau) sans visibilité directe et prévoir les risques d'abordage à très longue portée","Mesurer la distance précisément","Localiser les épaves"],correct:1,expl:"Avantages AIS vs Radar : AIS identifie nominativement le navire (nom, type, MMSI, destination, ETA). Portée AIS : 20-40 milles (vs 12-24 milles radar). Pas d'échos parasites (pluie, vagues). Informations en temps réel sur le statut du navire (RAM, NUC, pêche, etc.). LIMITES AIS vs Radar : l'AIS ne détecte pas les navires sans AIS. Le radar détecte TOUS les échos. SOLUTION : utiliser AIS ET radar simultanément pour sécurité maximale."},
    {q:"Qu'est-ce qu'un 'AIS Ghost' (navire fantôme AIS) ?",opts:["Un navire invisible","Signal AIS d'un navire qui ne se trouve plus à la position indiquée — données corrompues · transmission en retard · MMSI spoofé","Un navire pirate","Un AIS défectueux"],correct:1,expl:"AIS Ghost = cible AIS dont la position affichée ne correspond plus à la position réelle du navire. Causes : transmission retardée, données corrompues, MMSI dupliqué (deux navires avec le même MMSI), spoofing intentionnel (rare), cache ECDIS non rafraîchi. Détection : écart entre position AIS et position radar du même navire. Règle : toujours confronter AIS avec le radar. Ne jamais se fier uniquement à l'AIS pour les manœuvres en zone dense."},
    {q:"Qu'est-ce que le système 'LRIT' (Long-Range Identification and Tracking) ?",opts:["Un type de radar longue portée","Système de surveillance satellitaire permettant aux États de suivre la position des navires battant leur pavillon à l'échelle mondiale — SOLAS Ch.V","Un AIS à longue portée","Un GPS amélioré"],correct:1,expl:"LRIT (Long-Range Identification and Tracking) = système de suivi satellitaire mondial des navires (SOLAS Chapitre V). Transmission position GPS toutes les 6 heures via satellite. Récepteurs : autorités maritimes des États, Centre LRIT national. Portée : mondiale (satellite). Différent de l'AIS : LRIT = surveillance étatique à longue portée, AIS = collision avoidance entre navires. Obligatoire pour navires > 300 TB en voyage international."},
    {q:"Quel est le risque principal de l'ECDIS pour les navigateurs novices ?",opts:["L'écran est trop petit","Fausse sécurité — surconfiance dans le système · oubli de la veille visuelle et auditive · non-consultation des cartes papier de backup","Le coût élevé","La complexité d'utilisation"],correct:1,expl:"Risque principal ECDIS = COMPLACENCY (fausse sécurité). Enquêtes accidents : plusieurs naufrages causés par officiers trop confiants dans l'ECDIS sans maintenir la veille traditionnelle. Exemples : non-consultation du radar, oubli de la veille visuelle, confiance absolue dans les alarmes. Solutions : formation ECDIS obligatoire (STCW 2010), 'back to basics' : veille visuelle et auditive TOUJOURS obligatoire, radar en service permanent, vérification carte papier avant port."},
    {q:"Qu'est-ce que la portée instrumentale vs la portée opérationnelle d'un radar maritime ?",opts:["Elles sont identiques","Portée instrumentale = distance max théorique du radar · Portée opérationnelle = distance réelle de détection variable selon météo, taille cible, hauteur antenne","La portée instrumentale est toujours plus courte","La portée opérationnelle est fixe"],correct:1,expl:"Portée instrumentale : distance maximale théorique du radar (ex: 96 milles pour certain équipements). Déterminée par la puissance et la fréquence. Portée opérationnelle : distance réelle de détection. Variable selon : hauteur de l'antenne (H) [distance = 2.2√H], taille de la cible (petit kayak vs cargo 300m), conditions météo (pluie, mer formée), fréquence X (9GHz/3cm) vs S (3GHz/10cm). En pratique : cargo = 12-20 milles, petit bateau = 3-8 milles, bouée = 1-3 milles."},
    {q:"Qu'est-ce que le 'sector blanking' sur un radar et pourquoi est-il important ?",opts:["Un secteur de surveillance","Zone angulaire dans laquelle le radar ne transmet pas pour éviter d'irradier des zones sensibles (antennes satellite, mâts proches) ou d'être perturbé par des réflexions parasites","Un type de cible radar","Un secteur de navigation"],correct:1,expl:"Sector blanking (secteur blanc) = secteur angulaire où l'antenne radar NE transmet pas. Raisons : éviter d'irradier des superstructures proches, antennes satellites, personnel, éviter l'irradiation de zones sensibles. Conséquence : ZONE AVEUGLE dans la direction du secteur blanc. Importance : l'officier doit CONNAÎTRE les secteurs blancs de son radar et compenser par la veille visuelle et d'autres radars. Mentionné dans les notes du livre radar ou les spécifications du radar."},
    {q:"Qu'est-ce que le 'sea clutter' et le 'rain clutter' sur un radar maritime ?",opts:["Des types de navires","Sea clutter = échos parasites de la mer agitée · rain clutter = échos de la pluie — réduisent la détectabilité des petits navires","Des zones de navigation","Des erreurs de positionnement"],correct:1,expl:"Sea clutter (fouillis de mer) = échos parasites de la surface de la mer agitée, surtout à courte portée. Réduction : commande AC-SEA. Rain clutter (fouillis de pluie) = échos de la pluie ou de la neige. Réduction : commande AC-RAIN ou FTC. RISQUE : en appliquant trop de suppression anti-fouillis, on peut éliminer également les échos de petits navires ou bouées. Règle : utiliser la suppression minimum nécessaire et toujours compenser par une veille visuelle renforcée."},
    {q:"Qu'est-ce que l'AIS permet de savoir sur la destination d'un navire ?",opts:["Rien sur la destination","Destination et ETA (Estimated Time of Arrival) saisis MANUELLEMENT par l'officier à bord · données statiques · pas toujours exactes ni à jour","La destination exacte validée par les autorités","La route prévue complète"],correct:1,expl:"Destination et ETA AIS = données saisies MANUELLEMENT par l'officier sur l'émetteur AIS. Pas automatiques. Ne reflètent pas toujours la destination réelle (ex: ports de refuge non mis à jour, escales non déclarées). Format : port LOCODE (ex: FRMRS = Marseille) et heure UTC estimée. LIMITE : les données de destination AIS sont indicatives mais pas juridiquement garanties. Les armateurs sont responsables de la mise à jour des données statiques. Données dynamiques (cap, vitesse) = automatiques et fiables."},
    {q:"Qu'est-ce que l'ARPA peut calculer mais que le navigateur doit interpréter ?",opts:["Le temps et la météo","ARPA calcule : CPA · TCPA · vecteur de route · distance sur route — Mais le navigateur DOIT décider si une manœuvre est nécessaire selon COLREG","La profondeur","Le tirant d'eau"],correct:1,expl:"ARPA (Automatic Radar Plotting Aid) calcule automatiquement pour chaque cible suivie : CPA (distance minimale prévue), TCPA (temps avant CPA), vecteur vitesse, cap et vitesse estimés. MAIS : ARPA ne prend PAS de décision de manœuvre. L'officier de quart DOIT : interpréter les données ARPA, appliquer les règles COLREG, décider de la manœuvre appropriée (quelle direction, quelle ampleur). L'ARPA est un outil d'aide à la décision — pas un pilote automatique de collision."},
    {q:"Qu'est-ce que la 'stabilisation sur le fond' vs 'stabilisation sur l'eau' pour l'affichage radar ?",opts:["Elles sont identiques","Stabilisation fond (sea-stabilized) = vecteurs relatifs aux fonds · montre mouvements réels géographiques · Eau (water-stabilized) = vecteurs relatifs à l'eau · affecté par le courant","La stabilisation fond est plus précise","La stabilisation eau est plus sûre"],correct:1,expl:"Stabilisation radar : Water-stabilized (stabilisé eau) : les vecteurs sont calculés par rapport à la masse d'eau. Le courant crée des vecteurs parasites. Plus simple à lire pour l'évitement en pleine mer. Ground-stabilized (stabilisé fond) : vecteurs par rapport au fond géographique grâce au GPS. Montre les vrais mouvements géographiques. Préféré pour navigation côtière et par fort courant. Règle COLREG : les manœuvres d'abordage se basent sur les mouvements RÉELS (stabilisation fond recommandée)."},
  ],
  en:[
    {q:"What is the 'voyage data recorder' (VDR) and its relationship with AIS?",opts:["A special GPS","Maritime black box recording navigation data (course · speed · AIS · radar · VHF · alarms) — SOLAS mandatory · stores 12h of data","A type of ECDIS","A specialized radar"],correct:1,expl:"VDR (Voyage Data Recorder) = maritime black box. Records: GPS position, course, speed, gyro heading, radar data, navigation screen images, VHF communications, alarms, AIS data. Stores minimum 12h in loop on impact/immersion-resistant medium. S-VDR (Simplified) for vessels < 3000 GT. SOLAS mandatory > 3000 GT (passengers > 150m). Used in accident investigations. AIS data is integrated."},
    {q:"What is TCPA in the ARPA/AIS context?",opts:["True Course Position Accuracy","Time to Closest Point of Approach — predicted time before two vessels reach their minimum closing distance","Total Course Planning Area","Tidal Current Position Analysis"],correct:1,expl:"TCPA (Time to CPA) = predicted time before two vessels reach their CPA. Combined with CPA: CPA alone = future minimum distance. TCPA = when this distance will be reached. Practical rule: if CPA < 0.5 NM AND TCPA < 12 minutes → potential collision situation = mandatory maneuver per COLREG. ARPA automatically calculates CPA and TCPA for each tracked echo."},
    {q:"What is an ENC (Electronic Navigation Chart) compared to an RNC?",opts:["They are identical","ENC = S-57 vector chart with separable layers · automatic updates · ECDIS alarms · RNC = paper chart scan without intelligence","ENC = older","RNC = more precise"],correct:1,expl:"ENC (Electronic Navigation Chart) = vector chart in S-57 format (IHO). Separable layers (depths, dangers, nav aids, etc.). Automatic updates via AVCS/PRIMAR. ECDIS alarms based on vector data. Recommended. RNC (Raster Navigation Chart) = digital scan of paper chart. No separable layers. No intelligent alarms. Manual updates. Does NOT officially replace paper charts per SOLAS. Used as supplement or backup. ENC + properly configured ECDIS = official paper chart per SOLAS."},
    {q:"What does AIS receive but NOT transmit?",opts:["Position","Passive vessels not equipped with AIS — AIS only detects vessels that emit an AIS signal","Course","MMSI"],correct:1,expl:"FUNDAMENTAL AIS LIMITATION: a vessel not equipped with AIS or with AIS switched off IS INVISIBLE on the AIS screen. Examples: small fishing vessels, kayaks, sailboats < 15m unequipped, vessels with AIS intentionally switched off (pirates). COMPLEMENTARITY: Radar = detects ALL echoes (including non-AIS). AIS = identifies and provides information for equipped vessels. RULE: never navigate based solely on AIS. Radar remains the primary detection tool."},
    {q:"What is the 'Safety Contour' on ECDIS and why is it critical?",opts:["A decorative line","Depth isoline defined by the officer — triggers alarm if vessel approaches it on route · usually = draught + safety margin","A special chart","A radar contour"],correct:1,expl:"Safety Contour ECDIS = minimum safe depth defined by officer (e.g. 8m draught + 2m margin = 10m safety contour). If vessel heads toward zone < 10m depth → ALARM. Zones shallower than safety contour displayed differently (alarm color). RULE: safety contour must ALWAYS be set and checked before each voyage. Incorrect setting = no alarm = grounding risk."},
    {q:"What can AIS do that radar CANNOT?",opts:["Detect objects","Nominally identify vessels (name · MMSI · type · destination · ETA · draught) without direct visibility and predict collision risks at very long range","Precisely measure distance","Locate wrecks"],correct:1,expl:"AIS advantages vs Radar: AIS nominally identifies vessel (name, type, MMSI, destination, ETA). AIS range: 20-40 miles (vs 12-24 miles radar). No clutter (rain, waves). Real-time vessel status (RAM, NUC, fishing, etc.). AIS LIMITATIONS vs Radar: AIS doesn't detect vessels without AIS. Radar detects ALL echoes. SOLUTION: use AIS AND radar simultaneously for maximum safety."},
    {q:"What is an 'AIS Ghost' (AIS phantom vessel)?",opts:["An invisible vessel","AIS signal of a vessel no longer at the indicated position — corrupted data · delayed transmission · spoofed MMSI","A pirate vessel","A defective AIS"],correct:1,expl:"AIS Ghost = AIS target whose displayed position no longer corresponds to the vessel's actual position. Causes: delayed transmission, corrupted data, duplicated MMSI (two vessels with same MMSI), intentional spoofing (rare), ECDIS cache not refreshed. Detection: discrepancy between AIS position and radar position of the same vessel. Rule: always compare AIS with radar. Never rely solely on AIS for maneuvers in congested areas."},
    {q:"What is the 'LRIT' (Long-Range Identification and Tracking) system?",opts:["A type of long-range radar","Satellite surveillance system allowing states to track vessel positions worldwide — SOLAS Ch.V","A long-range AIS","An enhanced GPS"],correct:1,expl:"LRIT (Long-Range Identification and Tracking) = global satellite vessel tracking system (SOLAS Chapter V). Transmits GPS position every 6 hours via satellite. Recipients: maritime authorities of states, National LRIT Centre. Range: worldwide (satellite). Different from AIS: LRIT = state long-range surveillance, AIS = collision avoidance between vessels. Mandatory for vessels > 300 GT on international voyages."},
    {q:"What is the main risk of ECDIS for novice navigators?",opts:["The screen is too small","False security — overconfidence in the system · forgetting visual and auditory watch · not consulting backup paper charts","High cost","Complexity of use"],correct:1,expl:"Main ECDIS risk = COMPLACENCY (false security). Accident investigations: several groundings caused by officers over-relying on ECDIS without maintaining traditional watch. Examples: not consulting radar, forgetting visual watch, absolute trust in alarms. Solutions: mandatory ECDIS training (STCW 2010), 'back to basics': visual and auditory watch ALWAYS mandatory, radar permanently operational, paper chart check before port."},
    {q:"What is the difference between instrumental range and operational range of a maritime radar?",opts:["They are identical","Instrumental range = theoretical max radar distance · Operational range = actual variable detection distance depending on weather, target size, antenna height","Instrumental range is always shorter","Operational range is fixed"],correct:1,expl:"Instrumental range: theoretical maximum radar distance (e.g. 96 miles for some equipment). Determined by power and frequency. Operational range: actual detection distance. Variable depending on: antenna height (H) [distance = 2.2√H], target size (small kayak vs 300m cargo), weather conditions (rain, rough sea), X frequency (9GHz/3cm) vs S (3GHz/10cm). In practice: cargo = 12-20 miles, small boat = 3-8 miles, buoy = 1-3 miles."},
    {q:"What is 'sector blanking' on a radar and why is it important?",opts:["A surveillance sector","Angular zone where radar does not transmit to avoid irradiating sensitive areas (satellite antennas, nearby masts) or being disturbed by spurious reflections","A type of radar target","A navigation sector"],correct:1,expl:"Sector blanking = angular sector where radar antenna does NOT transmit. Reasons: avoid irradiating nearby superstructures, satellite antennas, personnel, avoid irradiating sensitive zones. Consequence: BLIND SPOT in the direction of the blank sector. Importance: officer must KNOW their radar's blank sectors and compensate with visual watch and other radars. Mentioned in radar log notes or radar specifications."},
    {q:"What are 'sea clutter' and 'rain clutter' on a maritime radar?",opts:["Types of vessels","Sea clutter = spurious echoes from rough sea · rain clutter = rain echoes — reduce detectability of small vessels","Navigation zones","Positioning errors"],correct:1,expl:"Sea clutter = spurious echoes from rough sea surface, especially at short range. Reduction: AC-SEA control. Rain clutter = echoes from rain or snow. Reduction: AC-RAIN or FTC control. RISK: applying too much anti-clutter suppression can also eliminate echoes from small vessels or buoys. Rule: use minimum necessary suppression and always compensate with enhanced visual watch."},
    {q:"What can AIS reveal about a vessel's destination?",opts:["Nothing about destination","Destination and ETA manually entered by officer on board · static data · not always accurate or current","Exact authority-validated destination","Complete planned route"],correct:1,expl:"AIS destination and ETA = data MANUALLY entered by officer on AIS transponder. Not automatic. Does not always reflect real destination (e.g. refuge ports not updated, undeclared stops). Format: port LOCODE (e.g. FRMRS = Marseille) and estimated UTC time. LIMITATION: AIS destination data is indicative but not legally guaranteed. Shipowners responsible for updating static data. Dynamic data (course, speed) = automatic and reliable."},
    {q:"What can ARPA calculate but the navigator must interpret?",opts:["Time and weather","ARPA calculates: CPA · TCPA · track vector · range on track — But navigator MUST decide if maneuver is needed per COLREG","Depth","Draught"],correct:1,expl:"ARPA automatically calculates for each tracked target: CPA (minimum predicted distance), TCPA (time before CPA), speed vector, estimated course and speed. BUT: ARPA does NOT make maneuver decisions. Watch officer MUST: interpret ARPA data, apply COLREG rules, decide appropriate maneuver (which direction, what magnitude). ARPA is a decision support tool — not a collision autopilot."},
    {q:"What is 'ground-stabilized' vs 'sea-stabilized' display for radar?",opts:["They are identical","Ground-stabilized = vectors relative to ground · shows real geographic movements · Sea-stabilized = vectors relative to water · affected by current","Ground-stabilized is more precise","Sea-stabilized is safer"],correct:1,expl:"Radar stabilization: Water-stabilized: vectors calculated relative to water mass. Current creates spurious vectors. Simpler to read for collision avoidance at sea. Ground-stabilized: vectors relative to geographic ground using GPS. Shows true geographic movements. Preferred for coastal navigation and strong currents. COLREG rule: collision avoidance maneuvers based on REAL movements (ground-stabilized recommended)."},
  ],
  es:[
    {q:"¿Qué es el 'registrador de datos de viaje' (VDR) y cuál es su relación con el AIS?",opts:["Un GPS especial","Caja negra marítima que registra datos de navegación (rumbo · velocidad · AIS · radar · VHF · alarmas) — SOLAS obligatorio · almacena 12h de datos","Un tipo de SEEC","Un radar especializado"],correct:1,expl:"VDR (Voyage Data Recorder) = caja negra marítima. Registra: posición GPS, rumbo, velocidad, datos de radar, imágenes de la pantalla de navegación, comunicaciones VHF, alarmas, datos AIS. Almacena mínimo 12h en bucle en soporte resistente al impacto e inmersión. Obligatorio SOLAS > 3000 TB. Utilizado en investigaciones de accidentes. Los datos AIS están integrados."},
    {q:"¿Qué es el TCPA en el contexto ARPA/AIS?",opts:["True Course Position Accuracy","Tiempo hasta el Punto de Máxima Proximidad — tiempo previsto antes de que dos buques alcancen su distancia mínima de acercamiento","Total Course Planning Area","Tidal Current Position Analysis"],correct:1,expl:"TCPA (Time to CPA) = tiempo previsto antes de que dos buques alcancen su CPA. Combinado con el CPA: CPA solo = distancia mínima futura. TCPA = cuándo se alcanzará esa distancia. Regla práctica: si CPA < 0,5 NM Y TCPA < 12 minutos → situación potencial de abordaje = maniobra obligatoria según el COLREG."},
    {q:"¿Qué es una ENC (Electronic Navigation Chart) en comparación con una RNC?",opts:["Son idénticas","ENC = carta vectorial S-57 con capas separables · actualización automática · alarmas SEEC · RNC = escaneo de carta en papel sin inteligencia","ENC = más antigua","RNC = más precisa"],correct:1,expl:"ENC = carta vectorial en formato S-57 (OHI). Capas separables. Actualización automática. Alarmas SEEC basadas en datos vectoriales. Recomendada. RNC = escaneo digital de carta en papel. Sin capas separables. Sin alarmas inteligentes. Actualización manual. NO reemplaza oficialmente las cartas en papel según el SOLAS. ENC + SEEC correctamente configurado = carta en papel oficial según el SOLAS."},
    {q:"¿Qué recibe el AIS pero NO transmite?",opts:["La posición","Los buques pasivos que no están equipados con AIS — el AIS solo detecta los buques que emiten una señal AIS","El rumbo","El MMSI"],correct:1,expl:"LIMITACIÓN FUNDAMENTAL DEL AIS: un buque no equipado con AIS o con el AIS apagado ES INVISIBLE en la pantalla AIS. Ejemplos: pequeños buques de pesca, kayaks, veleros < 15m sin equipo. COMPLEMENTARIEDAD: Radar = detecta TODOS los ecos (incluidos los no-AIS). AIS = identifica y proporciona información de los buques equipados. REGLA: nunca navegar basándose únicamente en el AIS."},
    {q:"¿Qué es la 'curva de seguridad' en el SEEC y por qué es crítica?",opts:["Una línea decorativa","Isohipsa de profundidad definida por el oficial — activa una alarma si el buque se acerca a ella en ruta · habitualmente = calado + margen de seguridad","Una carta especial","Un contorno de radar"],correct:1,expl:"Curva de seguridad SEEC = profundidad mínima segura definida por el oficial (ej.: calado 8m + margen 2m = curva de seguridad 10m). Si el buque se dirige hacia una zona < 10m de profundidad → ALARMA. REGLA: la curva de seguridad debe SIEMPRE definirse y verificarse antes de cada viaje. Una configuración incorrecta = sin alarma = riesgo de varada."},
    {q:"¿Qué puede hacer el AIS que el radar NO puede hacer?",opts:["Detectar objetos","Identificar nominalmente los buques (nombre · MMSI · tipo · destino · ETA · calado) sin visibilidad directa y prever riesgos de abordaje a muy largo alcance","Medir la distancia con precisión","Localizar naufragios"],correct:1,expl:"Ventajas AIS vs Radar: el AIS identifica nominalmente el buque (nombre, tipo, MMSI, destino, ETA). Alcance AIS: 20-40 millas (frente a 12-24 millas de radar). Sin ecos parásitos. Información en tiempo real sobre el estado del buque. LIMITACIONES AIS: no detecta buques sin AIS. SOLUCIÓN: usar AIS Y radar simultáneamente para máxima seguridad."},
    {q:"¿Qué es un 'AIS Ghost' (buque fantasma AIS)?",opts:["Un buque invisible","Señal AIS de un buque que ya no se encuentra en la posición indicada — datos corruptos · transmisión retrasada · MMSI suplantado","Un buque pirata","Un AIS defectuoso"],correct:1,expl:"AIS Ghost = blanco AIS cuya posición mostrada ya no corresponde a la posición real del buque. Causas: transmisión retrasada, datos corruptos, MMSI duplicado, suplantación intencional (rara), caché SEEC no actualizado. Detección: diferencia entre posición AIS y posición radar del mismo buque. Regla: comparar siempre el AIS con el radar."},
    {q:"¿Qué es el sistema 'LRIT' (Long-Range Identification and Tracking)?",opts:["Un tipo de radar de largo alcance","Sistema de vigilancia por satélite que permite a los Estados rastrear la posición de los buques que enarbolan su pabellón a escala mundial — SOLAS Cap.V","Un AIS de largo alcance","Un GPS mejorado"],correct:1,expl:"LRIT = sistema mundial de seguimiento de buques por satélite (SOLAS Capítulo V). Transmite la posición GPS cada 6 horas vía satélite. Receptores: autoridades marítimas de los Estados. Alcance: mundial (satélite). Diferente del AIS: LRIT = vigilancia estatal de largo alcance, AIS = prevención de abordajes entre buques."},
    {q:"¿Cuál es el principal riesgo del SEEC para los navegantes novatos?",opts:["La pantalla es demasiado pequeña","Falsa seguridad — exceso de confianza en el sistema · olvido de la guardia visual y auditiva · no consultar las cartas en papel de respaldo","El alto coste","La complejidad de uso"],correct:1,expl:"Principal riesgo SEEC = COMPLACENCIA (falsa seguridad). Investigaciones de accidentes: varios varados causados por oficiales con exceso de confianza en el SEEC sin mantener la guardia tradicional. Soluciones: formación SEEC obligatoria (STCW 2010), guardia visual y auditiva SIEMPRE obligatoria, radar en servicio permanente."},
    {q:"¿Cuál es la diferencia entre alcance instrumental y alcance operacional de un radar marítimo?",opts:["Son idénticos","Alcance instrumental = distancia máx. teórica del radar · Alcance operacional = distancia real de detección variable según meteorología, tamaño blanco, altura antena","El alcance instrumental siempre es más corto","El alcance operacional es fijo"],correct:1,expl:"Alcance instrumental: distancia máxima teórica del radar. Alcance operacional: distancia real de detección. Variable según: altura de la antena, tamaño del blanco, condiciones meteorológicas, frecuencia X (9GHz) vs S (3GHz). En la práctica: carguero = 12-20 millas, embarcación pequeña = 3-8 millas, boya = 1-3 millas."},
    {q:"¿Qué es el 'sector blanking' en un radar y por qué es importante?",opts:["Un sector de vigilancia","Zona angular en la que el radar no transmite para evitar irradiar zonas sensibles (antenas de satélite, palos cercanos) o ser perturbado por reflexiones parásitas","Un tipo de blanco de radar","Un sector de navegación"],correct:1,expl:"Sector blanking (sector blanco) = sector angular donde la antena del radar NO transmite. Razones: evitar irradiar superestructuras cercanas, antenas de satélite, personal. Consecuencia: PUNTO CIEGO en la dirección del sector blanco. El oficial debe conocer los sectores blancos de su radar y compensar con la guardia visual."},
    {q:"¿Qué son el 'sea clutter' y el 'rain clutter' en un radar marítimo?",opts:["Tipos de buques","Sea clutter = ecos parásitos del mar agitado · rain clutter = ecos de la lluvia — reducen la detectabilidad de las pequeñas embarcaciones","Zonas de navegación","Errores de posicionamiento"],correct:1,expl:"Sea clutter = ecos parásitos de la superficie del mar agitado, especialmente a corto alcance. Reducción: control AC-SEA. Rain clutter = ecos de lluvia o nieve. Reducción: control AC-RAIN o FTC. RIESGO: una supresión excesiva puede eliminar también los ecos de pequeñas embarcaciones. Regla: usar la supresión mínima necesaria."},
    {q:"¿Qué puede revelar el AIS sobre el destino de un buque?",opts:["Nada sobre el destino","Destino y ETA introducidos MANUALMENTE por el oficial a bordo · datos estáticos · no siempre exactos ni actualizados","El destino exacto validado por las autoridades","La ruta prevista completa"],correct:1,expl:"Destino y ETA AIS = datos introducidos MANUALMENTE por el oficial en el transmisor AIS. No automáticos. No siempre reflejan el destino real. Formato: LOCODE de puerto y hora UTC estimada. LIMITACIÓN: los datos de destino AIS son indicativos pero no están garantizados legalmente."},
    {q:"¿Qué puede calcular el ARPA pero que el navegante debe interpretar?",opts:["El tiempo y la meteorología","El ARPA calcula: CPA · TCPA · vector de rumbo · distancia en rumbo — Pero el navegante DEBE decidir si es necesaria una maniobra según el COLREG","La profundidad","El calado"],correct:1,expl:"ARPA calcula automáticamente para cada blanco seguido: CPA, TCPA, vector de velocidad, rumbo y velocidad estimados. PERO: el ARPA NO toma decisiones de maniobra. El oficial de guardia DEBE: interpretar los datos del ARPA, aplicar las reglas del COLREG, decidir la maniobra apropiada. El ARPA es una herramienta de apoyo a la decisión — no un piloto automático anticolisión."},
    {q:"¿Qué es la visualización 'estabilizada en el fondo' vs 'estabilizada en el agua' para el radar?",opts:["Son idénticas","Estabilizada en el fondo = vectores relativos al fondo · muestra movimientos geográficos reales · Agua = vectores relativos al agua · afectada por la corriente","La estabilizada en el fondo es más precisa","La estabilizada en el agua es más segura"],correct:1,expl:"Estabilización radar: Estabilizada en agua: vectores calculados respecto a la masa de agua. La corriente crea vectores parásitos. Más sencilla para la prevención de abordajes en alta mar. Estabilizada en el fondo: vectores respecto al fondo geográfico gracias al GPS. Muestra los movimientos geográficos reales. Preferida para navegación costera y con fuerte corriente."},
  ],
  pt:[
    {q:"O que é o 'registador de dados de viagem' (VDR) e qual a sua relação com o AIS?",opts:["Um GPS especial","Caixa negra marítima que regista dados de navegação (rumo · velocidade · AIS · radar · VHF · alarmes) — SOLAS obrigatório · armazena 12h de dados","Um tipo de ECDIS","Um radar especializado"],correct:1,expl:"VDR (Voyage Data Recorder) = caixa negra marítima. Regista: posição GPS, rumo, velocidade, dados de radar, imagens do ecrã de navegação, comunicações VHF, alarmes, dados AIS. Armazena mínimo 12h em loop em suporte resistente ao impacto e imersão. Obrigatório SOLAS > 3000 TB. Utilizado em investigações de acidentes. Os dados AIS estão integrados."},
    {q:"O que é o TCPA no contexto ARPA/AIS?",opts:["True Course Position Accuracy","Tempo até ao Ponto de Maior Aproximação — tempo previsto antes de dois navios atingirem a sua distância mínima de aproximação","Total Course Planning Area","Tidal Current Position Analysis"],correct:1,expl:"TCPA (Time to CPA) = tempo previsto antes de dois navios atingirem o seu CPA. Combinado com o CPA: CPA só = distância mínima futura. TCPA = quando essa distância será atingida. Regra prática: se CPA < 0,5 MN E TCPA < 12 minutos → situação potencial de abalroamento = manobra obrigatória segundo o COLREG."},
    {q:"O que é uma ENC (Electronic Navigation Chart) em comparação com uma RNC?",opts:["São idênticas","ENC = carta vetorial S-57 com camadas separáveis · atualização automática · alarmes ECDIS · RNC = digitalização de carta em papel sem inteligência","ENC = mais antiga","RNC = mais precisa"],correct:1,expl:"ENC = carta vetorial em formato S-57 (OHI). Camadas separáveis. Atualização automática. Alarmes ECDIS baseados em dados vetoriais. Recomendada. RNC = digitalização de carta em papel. Sem camadas separáveis. Sem alarmes inteligentes. Atualização manual. NÃO substitui oficialmente as cartas em papel segundo o SOLAS. ENC + ECDIS corretamente configurado = carta em papel oficial segundo o SOLAS."},
    {q:"O que recebe o AIS mas NÃO transmite?",opts:["A posição","Os navios passivos que não estão equipados com AIS — o AIS apenas deteta navios que emitem um sinal AIS","O rumo","O MMSI"],correct:1,expl:"LIMITAÇÃO FUNDAMENTAL DO AIS: um navio não equipado com AIS ou com AIS desligado É INVISÍVEL no ecrã AIS. Exemplos: pequenos navios de pesca, caiaques, veleiros < 15m sem equipamento. COMPLEMENTARIDADE: Radar = deteta TODOS os ecos (incluindo sem AIS). AIS = identifica e fornece informações dos navios equipados. REGRA: nunca navegar baseando-se apenas no AIS."},
    {q:"O que é a 'curva de segurança' no ECDIS e porque é crítica?",opts:["Uma linha decorativa","Isohipsa de profundidade definida pelo oficial — aciona alarme se o navio se aproximar em rota · habitualmente = calado + margem de segurança","Uma carta especial","Um contorno de radar"],correct:1,expl:"Curva de segurança ECDIS = profundidade mínima segura definida pelo oficial (ex.: calado 8m + margem 2m = curva de segurança 10m). Se o navio se dirige para zona < 10m de profundidade → ALARME. REGRA: a curva de segurança deve SEMPRE ser definida e verificada antes de cada viagem. Configuração incorreta = sem alarme = risco de encalhe."},
    {q:"O que pode fazer o AIS que o radar NÃO pode fazer?",opts:["Detetar objetos","Identificar nominalmente os navios (nome · MMSI · tipo · destino · ETA · calado) sem visibilidade direta e prever riscos de abalroamento a muito longo alcance","Medir a distância com precisão","Localizar naufrágios"],correct:1,expl:"Vantagens AIS vs Radar: AIS identifica nominalmente o navio (nome, tipo, MMSI, destino, ETA). Alcance AIS: 20-40 milhas (vs 12-24 milhas de radar). Sem ecos parasitas. Informação em tempo real sobre o estado do navio. LIMITAÇÕES AIS: não deteta navios sem AIS. SOLUÇÃO: usar AIS E radar simultaneamente para máxima segurança."},
    {q:"O que é um 'AIS Ghost' (navio fantasma AIS)?",opts:["Um navio invisível","Sinal AIS de um navio que já não se encontra na posição indicada — dados corrompidos · transmissão atrasada · MMSI falsificado","Um navio pirata","Um AIS defeituoso"],correct:1,expl:"AIS Ghost = alvo AIS cuja posição apresentada já não corresponde à posição real do navio. Causas: transmissão atrasada, dados corrompidos, MMSI duplicado, falsificação intencional (rara), cache ECDIS não atualizado. Deteção: discrepância entre posição AIS e posição radar do mesmo navio. Regra: comparar sempre o AIS com o radar."},
    {q:"O que é o sistema 'LRIT' (Long-Range Identification and Tracking)?",opts:["Um tipo de radar de longo alcance","Sistema de vigilância por satélite que permite aos Estados acompanhar a posição dos navios que arvoram o seu pavilhão a nível mundial — SOLAS Cap.V","Um AIS de longo alcance","Um GPS melhorado"],correct:1,expl:"LRIT = sistema mundial de rastreamento de navios por satélite (SOLAS Capítulo V). Transmite posição GPS a cada 6 horas via satélite. Recetores: autoridades marítimas dos estados. Alcance: mundial (satélite). Diferente do AIS: LRIT = vigilância estatal de longo alcance, AIS = prevenção de abalroamentos entre navios."},
    {q:"Qual é o principal risco do ECDIS para navegadores novatos?",opts:["O ecrã é demasiado pequeno","Falsa segurança — excesso de confiança no sistema · esquecimento da vigia visual e auditiva · não consulta das cartas em papel de reserva","O custo elevado","A complexidade de uso"],correct:1,expl:"Principal risco ECDIS = COMPLACÊNCIA (falsa segurança). Investigações de acidentes: vários encalhes causados por oficiais com excesso de confiança no ECDIS sem manter a vigia tradicional. Soluções: formação ECDIS obrigatória (STCW 2010), vigia visual e auditiva SEMPRE obrigatória, radar em serviço permanente."},
    {q:"Qual é a diferença entre alcance instrumental e alcance operacional de um radar marítimo?",opts:["São idênticos","Alcance instrumental = distância máx. teórica do radar · Alcance operacional = distância real de deteção variável consoante meteorologia, tamanho alvo, altura antena","O alcance instrumental é sempre mais curto","O alcance operacional é fixo"],correct:1,expl:"Alcance instrumental: distância máxima teórica do radar. Alcance operacional: distância real de deteção. Variável consoante: altura da antena, tamanho do alvo, condições meteorológicas, frequência X (9GHz) vs S (3GHz). Na prática: cargueiro = 12-20 milhas, embarcação pequena = 3-8 milhas, boia = 1-3 milhas."},
    {q:"O que é o 'sector blanking' num radar e porque é importante?",opts:["Um setor de vigilância","Zona angular onde o radar não transmite para evitar irradiar zonas sensíveis (antenas de satélite, mastros próximos) ou ser perturbado por reflexões parasitas","Um tipo de alvo de radar","Um setor de navegação"],correct:1,expl:"Sector blanking (setor em branco) = setor angular onde a antena do radar NÃO transmite. Razões: evitar irradiar superestruturas próximas, antenas de satélite, pessoal. Consequência: PONTO CEGO na direção do setor em branco. O oficial deve conhecer os setores em branco do seu radar e compensar com a vigia visual."},
    {q:"O que são o 'sea clutter' e o 'rain clutter' num radar marítimo?",opts:["Tipos de navios","Sea clutter = ecos parasitas do mar agitado · rain clutter = ecos da chuva — reduzem a detetabilidade das pequenas embarcações","Zonas de navegação","Erros de posicionamento"],correct:1,expl:"Sea clutter = ecos parasitas da superfície do mar agitado, especialmente a curto alcance. Redução: controlo AC-SEA. Rain clutter = ecos de chuva ou neve. Redução: controlo AC-RAIN ou FTC. RISCO: supressão excessiva pode eliminar também ecos de pequenas embarcações. Regra: usar a supressão mínima necessária."},
    {q:"O que pode revelar o AIS sobre o destino de um navio?",opts:["Nada sobre o destino","Destino e ETA introduzidos MANUALMENTE pelo oficial a bordo · dados estáticos · não são sempre exatos nem atualizados","O destino exato validado pelas autoridades","A rota prevista completa"],correct:1,expl:"Destino e ETA AIS = dados introduzidos MANUALMENTE pelo oficial no transmissor AIS. Não automáticos. Não refletem sempre o destino real. Formato: LOCODE de porto e hora UTC estimada. LIMITAÇÃO: os dados de destino AIS são indicativos mas não são legalmente garantidos."},
    {q:"O que pode calcular o ARPA mas que o navegador deve interpretar?",opts:["O tempo e a meteorologia","O ARPA calcula: CPA · TCPA · vetor de rumo · distância em rumo — Mas o navegador DEVE decidir se é necessária uma manobra segundo o COLREG","A profundidade","O calado"],correct:1,expl:"ARPA calcula automaticamente para cada alvo seguido: CPA, TCPA, vetor de velocidade, rumo e velocidade estimados. MAS: o ARPA NÃO toma decisões de manobra. O oficial de quarto DEVE: interpretar os dados ARPA, aplicar as regras COLREG, decidir a manobra adequada. O ARPA é uma ferramenta de apoio à decisão — não um piloto automático anticolisão."},
    {q:"O que é a visualização 'estabilizada no fundo' vs 'estabilizada na água' para o radar?",opts:["São idênticas","Estabilizada no fundo = vetores relativos ao fundo · mostra movimentos geográficos reais · Água = vetores relativos à água · afetada pela corrente","A estabilizada no fundo é mais precisa","A estabilizada na água é mais segura"],correct:1,expl:"Estabilização radar: Estabilizada na água: vetores calculados em relação à massa de água. A corrente cria vetores parasitas. Mais simples de ler para a prevenção de abalroamentos em alto mar. Estabilizada no fundo: vetores em relação ao fundo geográfico graças ao GPS. Mostra os movimentos geográficos reais. Preferida para navegação costeira e com corrente forte."},
  ],
};

function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.ecdis},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.ecdis},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:12},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.3}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.ecdis}33,${C.radar}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:`${C.ecdis}15`,border:`1px solid ${C.ecdis}44`,fontSize:14,color:C.ecdis,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.ecdis}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.ecdis,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.ecdis:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.ecdis},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🛰️ Signalisation & Balisage · Leçon 6/7 · ⭐ Premium · 200 XP",
      title:"AIS & Navigation Électronique",
      intro:"Les yeux numériques du marin moderne. AIS, ECDIS, Radar, ARPA — ensemble ils forment un bouclier invisible contre les collisions et les échouages. Mais un outil mal utilisé ou mal mis à jour peut créer une fausse sécurité plus dangereuse que l'absence de technologie.\n\nCette leçon couvre l'AIS, l'ECDIS, le radar ARPA et leur intégration à bord.",
      p1:"PARTIE 1 — AIS (Automatic Identification System)",s1t:"Classes A/B · MMSI · Données · Portée",
      s1:"AIS = Système d'Identification Automatique\nTransmet en permanence : MMSI · Nom · Position GPS\nCap · Vitesse · Statut · Destination\n\nCLASSE A (SOLAS) :\n→ > 300 TB voyages internationaux\n→ > 500 TB voyages nationaux\n→ Transmission : 2-10 sec en route\n→ Portée : 20-40 milles\n\nCLASSE B (plaisance) :\n→ Transmission : 30 sec en route\n→ Portée : 5-10 milles\n→ Données limitées",
      p2:"PARTIE 2 — ECDIS & CARTES ÉLECTRONIQUES",s1t:"ENC · RNC · Safety Contour · Mises à jour",
      s2:"ECDIS = Electronic Chart Display\nand Information System\n\nOBLIGATOIRE SOLAS > 500 TB\n\nENC (vectorielle) :\n→ Couches séparables\n→ Alarmes automatiques\n→ Mise à jour auto (AVCS/PRIMAR)\n\nRNC (raster) :\n→ Scan de carte papier\n→ Pas d'alarmes intelligentes\n→ Ne remplace pas la carte papier\n\nSAFETY CONTOUR = alarme si\nprofondeur < seuil défini",
      p3:"PARTIE 3 — RADAR & ARPA",s1t:"Détection · CPA · TCPA · Sea/Rain clutter",
      s3:"RADAR MARITIME :\nFréquence X (9 GHz) = précision\nFréquence S (3 GHz) = pluie\nPortée opérationnelle variable\n\nARPA (Automatic Radar Plotting Aid) :\n→ Suivi automatique des cibles\n→ Calcul CPA et TCPA\n→ Alarme si CPA < seuil\n\nCPA = Closest Point of Approach\n(distance minimale prévue)\nTCPA = Time to CPA\n(temps avant CPA)",
      p4:"PARTIE 4 — INTÉGRATION DES SYSTÈMES",s1t:"AIS + ECDIS + Radar + GPS : synergie",
      s4:"COMPLÉMENTARITÉ :\nRadar = détecte TOUT (y compris sans AIS)\nAIS = identifie et informe sur les navires équipés\nECDIS = positionnement cartographique\nGPS = position absolue\n\nRÈGLES D'OR :\n1. Ne jamais se fier à un seul système\n2. Toujours croiser les informations\n3. ECDIS non à jour = danger !\n4. AIS fantôme vs radar = danger !\n5. Veille visuelle TOUJOURS obligatoire",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"🛢️ CAS RÉEL — PRESTIGE",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — AIS & NAV. ÉLECTRONIQUE L6",
      sumP:["AIS Classe A : 2-10s en route · 20-40 milles · > 300/500 TB SOLAS","AIS Classe B : 30s en route · 5-10 milles · plaisance","ECDIS obligatoire SOLAS > 500 TB · ENC vectorielle · safety contour","CPA = Closest Point of Approach · TCPA = Time to CPA","ARPA calcule CPA/TCPA automatiquement · l'officier décide","AIS-SART MMSI commence 970 · AIS Ghost = position erronée","Radar détecte TOUS les échos y compris sans AIS","Prestige 2002 : ECDIS non mis à jour → 77 000t de fuel"],
      learnedP:["AIS Classe A vs B : fréquences transmissions · portées · obligations","ECDIS vs carte papier : ENC · RNC · safety contour · mises à jour","Radar ARPA : CPA · TCPA · sea/rain clutter · sector blanking","Intégration systèmes : complémentarité radar + AIS + ECDIS","Prestige 2002 : cartes non à jour = fausse sécurité"],
    },
    en:{
      badge:"🛰️ Signaling & Buoyage · Lesson 6/7 · ⭐ Premium · 200 XP",
      title:"AIS & Electronic Navigation",
      intro:"The digital eyes of the modern mariner. AIS, ECDIS, Radar, ARPA — together they form an invisible shield against collisions and groundings. But a poorly used or outdated tool can create a false sense of security more dangerous than no technology at all.",
      p1:"PART 1 — AIS (Automatic Identification System)",s1t:"Classes A/B · MMSI · Data · Range",
      s1:"AIS = Automatic Identification System\nPermanently transmits: MMSI · Name · GPS Position\nCourse · Speed · Status · Destination\n\nCLASS A (SOLAS):\n→ > 300 GT international voyages\n→ > 500 GT national voyages\n→ Transmission: 2-10 sec underway\n→ Range: 20-40 miles\n\nCLASS B (leisure):\n→ Transmission: 30 sec underway\n→ Range: 5-10 miles\n→ Limited data",
      p2:"PART 2 — ECDIS & ELECTRONIC CHARTS",s1t:"ENC · RNC · Safety Contour · Updates",
      s2:"ECDIS = Electronic Chart Display\nand Information System\n\nSOLAS MANDATORY > 500 GT\n\nENC (vector):\n→ Separable layers\n→ Automatic alarms\n→ Auto updates (AVCS/PRIMAR)\n\nRNC (raster):\n→ Paper chart scan\n→ No intelligent alarms\n→ Doesn't replace paper chart\n\nSAFETY CONTOUR = alarm if\ndepth < defined threshold",
      p3:"PART 3 — RADAR & ARPA",s1t:"Detection · CPA · TCPA · Sea/Rain clutter",
      s3:"MARITIME RADAR:\nX frequency (9 GHz) = precision\nS frequency (3 GHz) = rain\nVariable operational range\n\nARPA (Automatic Radar Plotting Aid):\n→ Automatic target tracking\n→ CPA and TCPA calculation\n→ Alarm if CPA < threshold\n\nCPA = Closest Point of Approach\n(minimum predicted distance)\nTCPA = Time to CPA\n(time before CPA)",
      p4:"PART 4 — SYSTEMS INTEGRATION",s1t:"AIS + ECDIS + Radar + GPS: synergy",
      s4:"COMPLEMENTARITY:\nRadar = detects EVERYTHING (including no AIS)\nAIS = identifies equipped vessels\nECDIS = chart positioning\nGPS = absolute position\n\nGOLDEN RULES:\n1. Never rely on one system alone\n2. Always cross-reference information\n3. Outdated ECDIS = danger!\n4. AIS ghost vs radar = danger!\n5. Visual watch ALWAYS mandatory",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"🛢️ REAL CASE — PRESTIGE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — AIS & ELECTRONIC NAV L6",
      sumP:["AIS Class A: 2-10s underway · 20-40 miles · > 300/500 GT SOLAS","AIS Class B: 30s underway · 5-10 miles · leisure","ECDIS mandatory SOLAS > 500 GT · ENC vector · safety contour","CPA = Closest Point of Approach · TCPA = Time to CPA","ARPA calculates CPA/TCPA automatically · officer decides","AIS-SART MMSI starts 970 · AIS Ghost = erroneous position","Radar detects ALL echoes including those without AIS","Prestige 2002: ECDIS not updated → 77,000t of fuel"],
      learnedP:["AIS Class A vs B: transmission frequencies · ranges · obligations","ECDIS vs paper chart: ENC · RNC · safety contour · updates","Radar ARPA: CPA · TCPA · sea/rain clutter · sector blanking","Systems integration: complementarity radar + AIS + ECDIS","Prestige 2002: outdated charts = false security"],
    },
    es:{
      badge:"🛰️ Señalización y Balizamiento · Lección 6/7 · ⭐ Premium · 200 XP",
      title:"AIS y Navegación Electrónica",
      intro:"Los ojos digitales del marino moderno. AIS, SEEC, Radar, ARPA — juntos forman un escudo invisible contra las colisiones y los varados.",
      p1:"PARTE 1 — AIS (Sistema de Identificación Automática)",s1t:"Clases A/B · MMSI · Datos · Alcance",
      s1:"AIS: transmite permanentemente MMSI · Nombre · GPS · Rumbo · Velocidad\nCLASE A (SOLAS > 300 TB): 2-10s en ruta · 20-40 millas\nCLASE B (náutica recreativa): 30s en ruta · 5-10 millas",
      p2:"PARTE 2 — SEEC Y CARTAS ELECTRÓNICAS",s1t:"ENC · RNC · Curva de seguridad · Actualizaciones",
      s2:"SEEC obligatorio SOLAS > 500 TB\nENC (vectorial): capas separables · alarmas · actualización auto\nRNC (raster): sin alarmas · no reemplaza carta en papel\nCurva de seguridad = alarma si profundidad < umbral",
      p3:"PARTE 3 — RADAR Y ARPA",s1t:"Detección · CPA · TCPA · Sea/Rain clutter",
      s3:"RADAR: Frecuencia X (9 GHz) / S (3 GHz)\nARPA: seguimiento automático · CPA · TCPA\nCPA = Closest Point of Approach\nTCPA = Time to CPA",
      p4:"PARTE 4 — INTEGRACIÓN DE SISTEMAS",s1t:"AIS + SEEC + Radar + GPS: sinergia",
      s4:"Radar = detecta TODO · AIS = identifica buques equipados\nSEEC = posicionamiento cartográfico · GPS = posición absoluta\nREGLAS DE ORO: nunca confiar en un solo sistema\nGuardia visual SIEMPRE obligatoria",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"🛢️ CASO REAL — PRESTIGE",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — AIS Y NAV. ELECTRÓNICA L6",
      sumP:["AIS Clase A: 2-10s en ruta · 20-40 millas · > 300/500 TB SOLAS","AIS Clase B: 30s en ruta · 5-10 millas · náutica recreativa","SEEC obligatorio SOLAS > 500 TB · ENC vectorial · curva de seguridad","CPA = Closest Point of Approach · TCPA = Time to CPA","ARPA calcula CPA/TCPA automáticamente · el oficial decide","AIS-SART MMSI empieza por 970 · AIS Ghost = posición errónea","El radar detecta TODOS los ecos incluidos los sin AIS","Prestige 2002: SEEC no actualizado → 77.000t de fuel"],
      learnedP:["AIS Clase A vs B: frecuencias transmisiones · alcances · obligaciones","SEEC vs carta en papel: ENC · RNC · curva de seguridad · actualizaciones","Radar ARPA: CPA · TCPA · sea/rain clutter · sector blanking","Integración sistemas: complementariedad radar + AIS + SEEC","Prestige 2002: cartas no actualizadas = falsa seguridad"],
    },
    pt:{
      badge:"🛰️ Sinalização e Balizagem · Lição 6/7 · ⭐ Premium · 200 XP",
      title:"AIS e Navegação Eletrónica",
      intro:"Os olhos digitais do marinheiro moderno. AIS, ECDIS, Radar, ARPA — juntos formam um escudo invisível contra abalroamentos e encalhes.",
      p1:"PARTE 1 — AIS (Sistema de Identificação Automática)",s1t:"Classes A/B · MMSI · Dados · Alcance",
      s1:"AIS: transmite permanentemente MMSI · Nome · GPS · Rumo · Velocidade\nCLASSE A (SOLAS > 300 TB): 2-10s em rota · 20-40 milhas\nCLASSE B (náutica recreativa): 30s em rota · 5-10 milhas",
      p2:"PARTE 2 — ECDIS E CARTAS ELETRÓNICAS",s1t:"ENC · RNC · Curva de segurança · Atualizações",
      s2:"ECDIS obrigatório SOLAS > 500 TB\nENC (vetorial): camadas separáveis · alarmes · atualização auto\nRNC (raster): sem alarmes · não substitui carta em papel\nCurva de segurança = alarme se profundidade < limiar",
      p3:"PARTE 3 — RADAR E ARPA",s1t:"Deteção · CPA · TCPA · Sea/Rain clutter",
      s3:"RADAR: Frequência X (9 GHz) / S (3 GHz)\nARPA: seguimento automático · CPA · TCPA\nCPA = Closest Point of Approach\nTCPA = Time to CPA",
      p4:"PARTE 4 — INTEGRAÇÃO DOS SISTEMAS",s1t:"AIS + ECDIS + Radar + GPS: sinergia",
      s4:"Radar = deteta TUDO · AIS = identifica navios equipados\nECDIS = posicionamento cartográfico · GPS = posição absoluta\nREGRAS DE OURO: nunca confiar num único sistema\nVigia visual SEMPRE obrigatória",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"🛢️ CASO REAL — PRESTIGE",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — AIS E NAV. ELETRÓNICA L6",
      sumP:["AIS Classe A: 2-10s em rota · 20-40 milhas · > 300/500 TB SOLAS","AIS Classe B: 30s em rota · 5-10 milhas · náutica recreativa","ECDIS obrigatório SOLAS > 500 TB · ENC vetorial · curva de segurança","CPA = Closest Point of Approach · TCPA = Time to CPA","ARPA calcula CPA/TCPA automaticamente · o oficial decide","AIS-SART MMSI começa por 970 · AIS Ghost = posição errada","O radar deteta TODOS os ecos incluindo os sem AIS","Prestige 2002: ECDIS não atualizado → 77.000t de fuel"],
      learnedP:["AIS Classe A vs B: frequências transmissões · alcances · obrigações","ECDIS vs carta em papel: ENC · RNC · curva de segurança · atualizações","Radar ARPA: CPA · TCPA · sea/rain clutter · sector blanking","Integração sistemas: complementaridade radar + AIS + ECDIS","Prestige 2002: cartas não atualizadas = falsa segurança"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonAIS({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#010c08 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.ecdis}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.ecdis,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🛰️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 6/7":lang==="en"?"Lesson 6/7":lang==="es"?"Lección 6/7":"Lição 6/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.ecdis,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.ecdis},${C.radar},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.ecdis}15`,border:`1px solid ${C.ecdis}44`,fontSize:11,color:C.ecdis,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.ecdis}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="📡" text={lc.p1} color={C.ais}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,10,5,0.7)",border:`1px solid ${C.ais}22`}}>
              <div style={{fontSize:11,color:C.ais,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📡 {lang==="fr"?"ÉCRAN AIS INTERACTIF":lang==="en"?"INTERACTIVE AIS SCREEN":lang==="es"?"PANTALLA AIS INTERACTIVA":"ECRÃ AIS INTERATIVO"}</div>
              <AISScreenSVG lang={lang}/>
            </Card>
            <SL icon="🗺️" text={lc.p2} color={C.ecdis}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.ecdis}22`}}>
              <div style={{fontSize:11,color:C.ecdis,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🗺️ {lang==="fr"?"ECDIS vs CARTE PAPIER":lang==="en"?"ECDIS vs PAPER CHART":lang==="es"?"SEEC vs CARTA PAPEL":"ECDIS vs CARTA EM PAPEL"}</div>
              <ECDISComparisonSVG lang={lang}/>
            </Card>
            <SL icon="📻" text={lc.p3} color={C.radar}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,background:"rgba(0,8,0,0.7)",border:`1px solid ${C.radar}22`}}>
              <div style={{fontSize:11,color:C.radar,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📻 {lang==="fr"?"ÉCRAN RADAR ARPA SIMULÉ":lang==="en"?"SIMULATED ARPA RADAR SCREEN":lang==="es"?"PANTALLA RADAR ARPA SIMULADA":"ECRÃ RADAR ARPA SIMULADO"}</div>
              <RadarScreenSVG lang={lang}/>
            </Card>
            <SL icon="🔗" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔗 {lang==="fr"?"QUIZ INTÉGRATION SYSTÈMES":lang==="en"?"SYSTEMS INTEGRATION QUIZ":lang==="es"?"QUIZ INTEGRACIÓN SISTEMAS":"QUIZ INTEGRAÇÃO DE SISTEMAS"}</div>
              <SystemsQuizSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="🛢️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>
            <Card style={{marginBottom:14,background:`${C.ecdis}08`,border:`1px solid ${C.ecdis}22`}}>
              <div style={{fontSize:11,color:C.ecdis,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.ecdis,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.ecdis},${C.radar},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 10px 36px ${C.ecdis}33`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — AIS & Navigation Électronique</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 6":lang==="en"?"Lesson 6":lang==="es"?"Lección 6":"Lição 6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.ecdis}15`,border:`1px solid ${C.ecdis}55`,fontSize:14,color:C.ecdis,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.ecdis,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.ecdis},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 8px 28px ${C.ecdis}33`,marginBottom:10}}>
              {lang==="fr"?"LEÇON 7 — GMDSS & DÉTRESSE →":lang==="en"?"LESSON 7 — GMDSS & DISTRESS →":lang==="es"?"LECCIÓN 7 — GMDSS Y SOCORRO →":"LIÇÃO 7 — GMDSS E SOCORRO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
