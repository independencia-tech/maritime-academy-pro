import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f", cyan:"#00bcd4",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module e6 — Cargaison & Pétrole", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Module e6 — Cargo & Oil", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo e6 — Carga & Petróleo", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
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
// SVG 1 — IGS SYSTEM SCHEMATIC
// ══════════════════════════════════════
function IGSSchematicSVG({ lang }) {
  const [active, setActive] = useState(null);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const components = [
    { id:"boiler", x:18, y:70, w:44, h:32, color:C.orange, icon:"🔥",
      label:{fr:"Chaudière",en:"Boiler",es:"Caldera",pt:"Caldeira"},
      desc:{fr:"Produit les fumées (FG) à 12-14% CO₂, < 0,5% O₂",en:"Produces flue gas (FG) at 12-14% CO₂, < 0.5% O₂",es:"Produce gases de combustión al 12-14% CO₂",pt:"Produz gases de exaustão a 12-14% CO₂"} },
    { id:"scrubber", x:82, y:60, w:44, h:42, color:C.blue2, icon:"💧",
      label:{fr:"Scrubber",en:"Scrubber",es:"Depurador",pt:"Scrubber"},
      desc:{fr:"Refroidit et lave les gaz : retire SO₂, suies, H₂S. Eau de mer pompée en continu.",en:"Cools and washes gases: removes SO₂, soot, H₂S. Continuous seawater pump.",es:"Enfría y lava gases: elimina SO₂, hollín, H₂S.",pt:"Arrefece e lava os gases: remove SO₂, fuligem, H₂S."} },
    { id:"blower", x:148, y:68, w:40, h:30, color:C.teal, icon:"🌀",
      label:{fr:"Soufflante",en:"Blower",es:"Soplante",pt:"Soprador"},
      desc:{fr:"Maintient la surpression dans les citernes (+ 100 mmWC). Débit : 2000-8000 m³/h.",en:"Maintains overpressure in tanks (+100 mmWC). Flow: 2000-8000 m³/h.",es:"Mantiene sobrepresión en tanques (+100 mmWC).",pt:"Mantém sobrepressão nos tanques (+100 mmWC)."} },
    { id:"deck", x:212, y:55, w:58, h:56, color:C.green, icon:"⚓",
      label:{fr:"Pont/Citernes",en:"Deck/Tanks",es:"Cubierta/Tanques",pt:"Convés/Tanques"},
      desc:{fr:"Citernes cargo maintenues à < 8% O₂. Pression positive permanente. Soupape de dégagement automatique.",en:"Cargo tanks kept at < 8% O₂. Permanent positive pressure. Automatic pressure/vacuum breaker.",es:"Tanques de carga a < 8% O₂. Presión positiva permanente.",pt:"Tanques de carga a < 8% O₂. Pressão positiva permanente."} },
  ];

  const sel = active ? components.find(c=>c.id===active) : null;

  return (
    <div>
      <svg width={290} height={140} viewBox="0 0 290 140">
        <rect width={290} height={140} fill="#061020" rx="8"/>
        {/* Flow pipes */}
        <line x1={62} y1={86} x2={82} y2={81} stroke={C.orange} strokeWidth="2.5" strokeDasharray="5,3"/>
        <line x1={126} y1={81} x2={148} y2={83} stroke={C.blue2} strokeWidth="2.5" strokeDasharray="5,3"/>
        <line x1={188} y1={83} x2={212} y2={83} stroke={C.teal} strokeWidth="2.5" strokeDasharray="5,3"/>
        {/* Pipe labels */}
        <text x={68} y={77} fontSize="6" fill={C.orange} opacity="0.8">FG</text>
        <text x={132} y={77} fontSize="6" fill={C.blue2} opacity="0.8">{lbl("Gaz lavé","Clean gas","Gas limpio","Gás limpo")}</text>
        <text x={192} y={77} fontSize="6" fill={C.teal} opacity="0.8">IG</text>
        {/* Seawater pipe to scrubber */}
        <path d="M82,100 Q70,115 62,115 Q52,115 52,125" fill="none" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"/>
        <text x={45} y={130} fontSize="6" fill={C.cyan} opacity="0.6">{lbl("Eau mer","S.W.","Agua mar","Água mar")}</text>
        {/* Components */}
        {components.map(c => (
          <g key={c.id} style={{cursor:"pointer"}} onClick={()=>setActive(active===c.id?null:c.id)}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="7"
              fill={`${c.color}18`} stroke={active===c.id?c.color:`${c.color}55`}
              strokeWidth={active===c.id?2:1}/>
            <text x={c.x+c.w/2} y={c.y+c.h/2-4} textAnchor="middle" fontSize="14">{c.icon}</text>
            <text x={c.x+c.w/2} y={c.y+c.h/2+10} textAnchor="middle" fontSize="6.5" fill={c.color} fontWeight="700">
              {lbl(c.label.fr,c.label.en,c.label.es,c.label.pt)}
            </text>
          </g>
        ))}
        {/* Flow direction arrow */}
        <text x={145} y={130} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("Flux →  Chaudière → Scrubber → Soufflante → Citernes","Flow →  Boiler → Scrubber → Blower → Tanks","Flujo →  Caldera → Depurador → Soplante → Tanques","Fluxo →  Caldeira → Scrubber → Soprador → Tanques")}
        </text>
      </svg>
      {sel && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel.color}12`,border:`1px solid ${sel.color}44`,fontSize:11,color:C.white,lineHeight:1.6}}>
          <span style={{fontWeight:700,color:sel.color}}>{lbl(sel.label.fr,sel.label.en,sel.label.es,sel.label.pt)}</span> — {lbl(sel.desc.fr,sel.desc.en,sel.desc.es,sel.desc.pt)}
        </div>
      )}
      {!sel && (
        <div style={{marginTop:8,padding:"7px 10px",borderRadius:10,background:"rgba(0,0,0,0.3)",border:`1px solid ${C.border}`,fontSize:9,color:C.muted,textAlign:"center"}}>
          💡 {lbl("Toucher un composant pour les détails","Tap a component for details","Tocar un componente para detalles","Tocar um componente para detalhes")}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — O₂ ATMOSPHERE IN CARGO TANK
// ══════════════════════════════════════
function O2AtmosphereSVG({ lang }) {
  const [o2, setO2] = useState(8);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const zone = o2 < 2 ? "asphyxia" : o2 < 8 ? "inert" : o2 < 11 ? "danger" : o2 < 21 ? "flammable" : "normal";
  const zoneColor = { asphyxia:C.purple, inert:C.teal, danger:C.orange, flammable:C.red, normal:C.green }[zone];
  const zoneLabel = {
    asphyxia: lbl("< 2% — ASPHYXIE IMMÉDIATE","< 2% — IMMEDIATE ASPHYXIA","< 2% — ASFIXIA INMEDIATA","< 2% — ASFIXIA IMEDIATA"),
    inert:    lbl("2-8% — ZONE INERTE ✅","2-8% — INERT ZONE ✅","2-8% — ZONA INERTE ✅","2-8% — ZONA INERTE ✅"),
    danger:   lbl("8-11% — ZONE CRITIQUE ⚡","8-11% — CRITICAL ZONE ⚡","8-11% — ZONA CRÍTICA ⚡","8-11% — ZONA CRÍTICA ⚡"),
    flammable:lbl("11-21% — ZONE INFLAMMABLE 🔥","11-21% — FLAMMABLE ZONE 🔥","11-21% — ZONA INFLAMABLE 🔥","11-21% — ZONA INFLAMÁVEL 🔥"),
    normal:   lbl("> 21% — AIR NORMAL",""> 21% — NORMAL AIR","> 21% — AIRE NORMAL","> 21% — AR NORMAL"),
  }[zone];

  const W=290, H=180;
  const tankX=60, tankY=30, tankW=170, tankH=100;
  // O2 fill height (inverse — higher O2 = more "gas" shown)
  const gasH = (o2/21)*tankH;
  const gasY = tankY + tankH - gasH;

  // Molecule dots
  const dots = Array.from({length:Math.round(o2*1.5)}, (_,i)=>({
    x: tankX+10 + (i%14)*11,
    y: gasY + 8 + Math.floor(i/14)*14,
  })).filter(d => d.x < tankX+tankW-10 && d.y < tankY+tankH-6);

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Tank */}
        <rect x={tankX} y={tankY} width={tankW} height={tankH} rx="8"
          fill="rgba(13,31,60,0.7)" stroke={zoneColor} strokeWidth="2"/>
        {/* Gas fill */}
        {gasH > 0 && (
          <rect x={tankX+2} y={gasY} width={tankW-4} height={gasH} rx="6"
            fill={`${zoneColor}20`} opacity="0.8"/>
        )}
        {/* O2 molecules */}
        {dots.map((d,i)=>(
          <circle key={i} cx={d.x} cy={d.y} r="3" fill={zoneColor} opacity="0.6"/>
        ))}
        {/* Cargo vapor at bottom */}
        <rect x={tankX+2} y={tankY+tankH-18} width={tankW-4} height={16} rx="4"
          fill="rgba(201,146,42,0.15)" opacity="0.7"/>
        <text x={tankX+tankW/2} y={tankY+tankH-7} textAnchor="middle" fontSize="7" fill={C.gold2} opacity="0.7">
          {lbl("Vapeurs hydrocarbures","Hydrocarbon vapors","Vapores hidrocarburos","Vapores hidrocarbonetos")}
        </text>
        {/* O2 readout */}
        <rect x={tankX+tankW+8} y={tankY} width={46} height={36} rx="6"
          fill="rgba(0,0,0,0.7)" stroke={zoneColor} strokeWidth="1"/>
        <text x={tankX+tankW+31} y={tankY+14} textAnchor="middle" fontSize="8" fill={zoneColor} fontWeight="700">O₂</text>
        <text x={tankX+tankW+31} y={tankY+28} textAnchor="middle" fontSize="11" fill={zoneColor} fontWeight="700">{o2}%</text>
        {/* Zone markers on right */}
        {[{v:8,label:"8%",c:C.teal},{v:11,label:"11%",c:C.orange},{v:21,label:"21%",c:C.green}].map((m,i)=>{
          const my = tankY + tankH - (m.v/21)*tankH;
          return (
            <g key={i}>
              <line x1={tankX-4} y1={my} x2={tankX} y2={my} stroke={m.c} strokeWidth="1"/>
              <text x={tankX-6} y={my+3} textAnchor="end" fontSize="6.5" fill={m.c}>{m.label}</text>
            </g>
          );
        })}
        {/* Title */}
        <text x={W/2} y={H-8} textAnchor="middle" fontSize="7" fill={C.muted}>
          {lbl("⬆ Glisser pour modifier le % O₂ dans la citerne","⬆ Slide to change O₂% in tank","⬆ Deslizar para cambiar O₂% en tanque","⬆ Deslizar para mudar O₂% no tanque")}
        </text>
      </svg>
      <div style={{marginTop:8}}>
        <div style={{fontSize:9,color:zoneColor,marginBottom:4,fontWeight:600,textAlign:"center"}}>O₂ : {o2}%</div>
        <input type="range" min={0} max={21} step={0.5} value={o2}
          onChange={e=>setO2(Number(e.target.value))}
          style={{width:"100%",accentColor:zoneColor}}/>
      </div>
      <div style={{marginTop:6,padding:"9px 12px",borderRadius:10,background:`${zoneColor}14`,border:`1px solid ${zoneColor}44`,fontSize:11,color:zoneColor,textAlign:"center",fontWeight:700}}>
        {zoneLabel}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — IGS CARGO OPS CYCLE
// ══════════════════════════════════════
function IGSCyclesSVG({ lang }) {
  const [phase, setPhase] = useState(0);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const phases = [
    {
      id:0, icon:"🛢️", color:C.steel,
      title:{fr:"1. Citerne vide — purge",en:"1. Empty tank — purge",es:"1. Tanque vacío — purga",pt:"1. Tanque vazio — purga"},
      o2:21, pressure:-10,
      desc:{fr:"Citerne vide après déchargement. O₂ ≈ 21% (air). Le système IGS doit purger avant tout ballastage.",en:"Empty tank after discharge. O₂ ≈ 21% (air). IGS must purge before any ballasting.",es:"Tanque vacío tras descarga. O₂ ≈ 21% (aire). El sistema IGS debe purgar antes del lastraje.",pt:"Tanque vazio após descarga. O₂ ≈ 21% (ar). O sistema IGS deve purgar antes do lastro."},
    },
    {
      id:1, icon:"💨", color:C.teal,
      title:{fr:"2. Inertage — IGS actif",en:"2. Inerting — IGS active",es:"2. Inertización — IGS activo",pt:"2. Inertização — IGS ativo"},
      o2:5, pressure:100,
      desc:{fr:"Injection de gaz inerte. O₂ descend de 21% → < 8%. Durée : 4-12h selon volume. Pression positive maintenue.",en:"Inert gas injection. O₂ drops from 21% → < 8%. Duration: 4-12h depending on volume. Positive pressure maintained.",es:"Inyección de gas inerte. O₂ baja de 21% → < 8%. Duración: 4-12h. Presión positiva.",pt:"Injeção de gás inerte. O₂ desce de 21% → < 8%. Duração: 4-12h. Pressão positiva."},
    },
    {
      id:2, icon:"🚢", color:C.orange,
      title:{fr:"3. Chargement cargo",en:"3. Cargo loading",es:"3. Carga de mercancía",pt:"3. Carregamento de carga"},
      o2:5, pressure:150,
      desc:{fr:"Chargement du pétrole brut. Vapeurs hydrocarbures remplacent le gaz inerte. Pression positive (+100 à +150 mmWC). O₂ maintenu < 8%.",en:"Crude oil loading. Hydrocarbon vapors replace inert gas. Positive pressure (+100 to +150 mmWC). O₂ maintained < 8%.",es:"Carga de crudo. Vapores de hidrocarburos reemplazan gas inerte. Presión positiva. O₂ < 8%.",pt:"Carregamento de petróleo bruto. Vapores de hidrocarbonetos substituem gás inerte. Pressão positiva. O₂ < 8%."},
    },
    {
      id:3, icon:"⛽", color:C.blue2,
      title:{fr:"4. Déchargement cargo",en:"4. Cargo discharge",es:"4. Descarga de carga",pt:"4. Descarga de carga"},
      o2:6, pressure:80,
      desc:{fr:"Pompes cargo aspirent le pétrole. L'IGS maintient la surpression pour compenser le vide créé. CRITIQUE : ne jamais laisser dépression dans la citerne.",en:"Cargo pumps discharge oil. IGS maintains overpressure to compensate vacuum created. CRITICAL: never allow negative pressure in tank.",es:"Bombas de carga descargan el petróleo. El IGS mantiene sobrepresión. CRÍTICO: nunca permitir depresión en el tanque.",pt:"Bombas de carga descarregam o petróleo. O IGS mantém sobrepressão. CRÍTICO: nunca permitir depressão no tanque."},
    },
    {
      id:4, icon:"🔄", color:C.green,
      title:{fr:"5. Post-déchargement — maintien",en:"5. Post-discharge — maintenance",es:"5. Post-descarga — mantenimiento",pt:"5. Pós-descarga — manutenção"},
      o2:7, pressure:100,
      desc:{fr:"Citerne vide de cargo mais maintenue sous pression IG positive. Prête pour ballastage ou nouvelle cargaison. O₂ < 8% permanent.",en:"Cargo-empty tank maintained under positive IG pressure. Ready for ballasting or new cargo. O₂ < 8% permanent.",es:"Tanque vacío de carga mantenido bajo presión IG positiva. Listo para lastre o nueva carga. O₂ < 8% permanente.",pt:"Tanque vazio de carga mantido sob pressão IG positiva. Pronto para lastro ou nova carga. O₂ < 8% permanente."},
    },
  ];

  const cur = phases[phase];
  const o2H = (cur.o2/21)*80;
  const pressureH = Math.max(0, Math.min(60, (cur.pressure+20)/180*60));

  return (
    <div>
      <svg width={290} height={155} viewBox="0 0 290 155">
        <rect width={290} height={155} fill="#061020" rx="8"/>
        {/* Phase buttons row */}
        {phases.map((p,i)=>(
          <g key={i} style={{cursor:"pointer"}} onClick={()=>setPhase(i)}>
            <rect x={8+i*56} y={8} width={50} height={28} rx="6"
              fill={phase===i?`${p.color}30`:"rgba(13,31,60,0.6)"}
              stroke={phase===i?p.color:`${p.color}33`} strokeWidth={phase===i?1.5:1}/>
            <text x={8+i*56+25} y={18} textAnchor="middle" fontSize="10">{p.icon}</text>
            <text x={8+i*56+25} y={29} textAnchor="middle" fontSize="6" fill={phase===i?p.color:C.muted}>{i+1}</text>
          </g>
        ))}
        {/* O2 gauge */}
        <rect x={20} y={50} width={24} height={80} rx="6" fill="rgba(0,0,0,0.5)" stroke={C.steel} strokeWidth="1"/>
        <rect x={21} y={50+80-o2H} width={22} height={o2H} rx="5"
          fill={cur.o2<8?C.teal:cur.o2<11?C.orange:C.red} opacity="0.7"/>
        <text x={32} y={47} textAnchor="middle" fontSize="6.5" fill={C.muted}>O₂</text>
        <text x={32} y={140} textAnchor="middle" fontSize="7" fill={cur.o2<8?C.teal:C.red} fontWeight="700">{cur.o2}%</text>
        {/* Pressure gauge */}
        <rect x={54} y={50} width={24} height={80} rx="6" fill="rgba(0,0,0,0.5)" stroke={C.steel} strokeWidth="1"/>
        <rect x={55} y={50+80-pressureH} width={22} height={pressureH} rx="5"
          fill={cur.pressure>50?C.green:C.orange} opacity="0.7"/>
        <text x={66} y={47} textAnchor="middle" fontSize="5.5" fill={C.muted}>{lbl("Press.","Press.","Presión","Press.")}</text>
        <text x={66} y={140} textAnchor="middle" fontSize="7" fill={cur.pressure>50?C.green:C.orange} fontWeight="700">{cur.pressure>0?"+":""}{cur.pressure}</text>
        {/* Tank schematic */}
        <rect x={94} y={50} width={120} height={80} rx="8"
          fill={`${cur.color}10`} stroke={cur.color} strokeWidth="1.5"/>
        <text x={154} y={75} textAnchor="middle" fontSize="20">{cur.icon}</text>
        <text x={154} y={96} textAnchor="middle" fontSize="8" fill={cur.color} fontWeight="700">
          {lbl(cur.title.fr,cur.title.en,cur.title.es,cur.title.pt).split("—")[0]}
        </text>
        <text x={154} y={108} textAnchor="middle" fontSize="7" fill={C.muted}>
          O₂ {cur.o2}% · {cur.pressure>0?"+":""}{cur.pressure} mmWC
        </text>
        {/* IGS pipe to tank */}
        <line x1={78} y1={90} x2={94} y2={90} stroke={cur.color} strokeWidth="2" strokeDasharray="4,2"/>
        <polygon points={`91,87 91,93 96,90`} fill={cur.color} opacity="0.8"/>
        {/* Navigation */}
        <text x={145} y={148} textAnchor="middle" fontSize="7" fill={C.muted}>
          {phase+1}/5 — {lbl(cur.title.fr,cur.title.en,cur.title.es,cur.title.pt)}
        </text>
      </svg>
      <div style={{marginTop:8,padding:"9px 12px",borderRadius:12,background:`${cur.color}12`,border:`1px solid ${cur.color}44`,fontSize:11,color:C.white,lineHeight:1.6}}>
        {lbl(cur.desc.fr,cur.desc.en,cur.desc.es,cur.desc.pt)}
      </div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        <button onClick={()=>setPhase(p=>Math.max(0,p-1))}
          style={{flex:1,padding:"8px",borderRadius:10,background:"rgba(69,90,100,0.2)",border:`1px solid ${C.steel}44`,color:C.muted,fontSize:11,cursor:"pointer"}}>
          ← {lbl("Préc.","Prev","Ant.","Ant.")}
        </button>
        <button onClick={()=>setPhase(p=>Math.min(4,p+1))}
          style={{flex:1,padding:"8px",borderRadius:10,background:`${cur.color}15`,border:`1px solid ${cur.color}44`,color:cur.color,fontSize:11,cursor:"pointer"}}>
          {lbl("Suiv.","Next","Sig.","Seg.")} →
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — O₂ DETECTORS & ALARMS
// ══════════════════════════════════════
function IGSAlarmsSVG({ lang }) {
  const [tapped, setTapped] = useState(null);
  const [o2sim, setO2sim] = useState(6);
  const lbl = (fr,en,es,pt) => lang==="fr"?fr:lang==="en"?en:lang==="es"?es:pt;

  const alarms = [
    { id:"a1", x:30, y:45, icon:"🔵", color:C.teal,
      label:{fr:"Analyseur O₂ entrant",en:"Inlet O₂ analyser",es:"Analizador O₂ entrada",pt:"Analisador O₂ entrada"},
      threshold:"< 8%",
      desc:{fr:"Mesure O₂ du gaz inerte AVANT entrée citerne. Si O₂ > 8% → IGS coupé automatiquement.",en:"Measures O₂ of inert gas BEFORE entering tank. If O₂ > 8% → IGS automatically shut off.",es:"Mide O₂ del gas inerte ANTES de entrar al tanque. Si O₂ > 8% → IGS cortado automáticamente.",pt:"Mede O₂ do gás inerte ANTES de entrar no tanque. Se O₂ > 8% → IGS cortado automaticamente."} },
    { id:"a2", x:110, y:45, icon:"🟡", color:C.orange,
      label:{fr:"Analyseur citerne",en:"Tank O₂ analyser",es:"Analizador tanque",pt:"Analisador tanque"},
      threshold:"< 8% alarm",
      desc:{fr:"Surveille O₂ dans la citerne. Alarme à 8% → action requise. Alarme critique à 11% → arrêt opérations.",en:"Monitors O₂ in tank. Alarm at 8% → action required. Critical alarm at 11% → stop operations.",es:"Vigila O₂ en tanque. Alarma a 8% → acción requerida. Alarma crítica a 11% → parar operaciones.",pt:"Monitoriza O₂ no tanque. Alarme a 8% → ação necessária. Alarme crítico a 11% → parar operações."} },
    { id:"a3", x:190, y:45, icon:"🔴", color:C.red,
      label:{fr:"PV breaker/soupape",en:"PV breaker/valve",es:"Válvula PV",pt:"Válvula PV"},
      threshold:"±2000 Pa",
      desc:{fr:"Pressure/Vacuum breaker. Protège la citerne en cas de surpression (> +2000 Pa) ou dépression (< -350 Pa). Déclenche automatiquement.",en:"Pressure/Vacuum breaker. Protects tank against overpressure (> +2000 Pa) or vacuum (< -350 Pa). Triggers automatically.",es:"Protege el tanque contra sobrepresión o depresión. Actúa automáticamente.",pt:"Protege o tanque contra sobrepressão ou depressão. Actua automaticamente."} },
    { id:"a4", x:30, y:108, icon:"🟣", color:C.purple,
      label:{fr:"Non-return valve",en:"Non-return valve",es:"Válvula retención",pt:"Válvula de retenção"},
      threshold:"IGS → tank only",
      desc:{fr:"Clapet anti-retour sur la tuyauterie IG. Empêche absolument les vapeurs cargo de remonter vers la chaudière ou le scrubber.",en:"Non-return valve on IG piping. Absolutely prevents cargo vapors from flowing back to the boiler or scrubber.",es:"Válvula anti-retorno en tubería IG. Impide que los vapores de carga regresen a la caldera.",pt:"Válvula anti-retorno na tubagem IG. Impede que os vapores de carga regressem à caldeira."} },
    { id:"a5", x:110, y:108, icon:"⚪", color:C.steel,
      label:{fr:"Régulateur pression",en:"Pressure regulator",es:"Regulador presión",pt:"Regulador pressão"},
      threshold:"+50→+150 mmWC",
      desc:{fr:"Maintient la pression IG entre +50 et +150 mmWC. Régulation automatique du débit de la soufflante. Évite dépression en cas de pompage rapide.",en:"Maintains IG pressure between +50 and +150 mmWC. Automatic blower flow regulation. Prevents vacuum during rapid pumping.",es:"Mantiene presión IG entre +50 y +150 mmWC. Regulación automática del soplante.",pt:"Mantém pressão IG entre +50 e +150 mmWC. Regulação automática do soprador."} },
    { id:"a6", x:190, y:108, icon:"🟢", color:C.green,
      label:{fr:"Pont IG / Vanne pont",en:"IG deck main valve",es:"Válvula principal cubierta",pt:"Válvula principal convés"},
      threshold:"Isolate tanks",
      desc:{fr:"Vanne principale de distribution sur le pont. Permet l'isolation de chaque citerne individuellement. Manœuvrée depuis la salle de contrôle cargo.",en:"Main distribution valve on deck. Allows individual isolation of each tank. Operated from cargo control room.",es:"Válvula principal de distribución en cubierta. Aísla cada tanque individualmente. Operada desde sala de control.",pt:"Válvula principal de distribuição no convés. Isola cada tanque individualmente. Operada da sala de controlo de carga."} },
  ];

  const cur = tapped ? alarms.find(a=>a.id===tapped) : null;
  const alarmActive = o2sim >= 8;

  return (
    <div>
      <svg width={290} height={170} viewBox="0 0 290 170">
        <rect width={290} height={170} fill="#061020" rx="8"/>
        <text x={145} y={18} textAnchor="middle" fontSize="8" fill={C.muted} fontWeight="700">
          {lbl("COMPOSANTS SÉCURITÉ IGS — Toucher pour détails","IGS SAFETY COMPONENTS — Tap for details","COMPONENTES SEGURIDAD IGS — Tocar para detalles","COMPONENTES SEGURANÇA IGS — Tocar para detalhes")}
        </text>
        {/* Alarm items */}
        {alarms.map(a=>(
          <g key={a.id} style={{cursor:"pointer"}} onClick={()=>setTapped(tapped===a.id?null:a.id)}>
            <rect x={a.x} y={a.y} width={68} height={52} rx="8"
              fill={tapped===a.id?`${a.color}20`:"rgba(13,31,60,0.6)"}
              stroke={tapped===a.id?a.color:`${a.color}44`} strokeWidth={tapped===a.id?1.8:1}/>
            <text x={a.x+34} y={a.y+18} textAnchor="middle" fontSize="16">{a.icon}</text>
            <text x={a.x+34} y={a.y+32} textAnchor="middle" fontSize="6" fill={a.color} fontWeight="700">
              {lbl(a.label.fr,a.label.en,a.label.es,a.label.pt).split(" ").slice(0,2).join(" ")}
            </text>
            <text x={a.x+34} y={a.y+43} textAnchor="middle" fontSize="5.5" fill={C.muted}>{a.threshold}</text>
          </g>
        ))}
        {/* O2 live sim */}
        <rect x={8} y={155} width={274} height={10} rx="4" fill="rgba(0,0,0,0.4)"/>
        <rect x={8} y={155} width={274*(o2sim/21)} height={10} rx="4"
          fill={o2sim<8?C.teal:o2sim<11?C.orange:C.red} opacity="0.7"/>
        <text x={145} y={163} textAnchor="middle" fontSize="6.5" fill={C.white} fontWeight="700">
          O₂ live : {o2sim}% {alarmActive?"⚠️ ALARME":"✅"}
        </text>
      </svg>
      {cur && (
        <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${cur.color}12`,border:`1px solid ${cur.color}44`,fontSize:11,color:C.white,lineHeight:1.6}}>
          <span style={{fontWeight:700,color:cur.color}}>{lbl(cur.label.fr,cur.label.en,cur.label.es,cur.label.pt)}</span>
          <br/>{lbl(cur.desc.fr,cur.desc.en,cur.desc.es,cur.desc.pt)}
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
        <span style={{fontSize:9,color:C.muted,whiteSpace:"nowrap"}}>O₂ sim:</span>
        <input type="range" min={0} max={21} step={0.5} value={o2sim}
          onChange={e=>setO2sim(Number(e.target.value))}
          style={{flex:1,accentColor:o2sim<8?C.teal:o2sim<11?C.orange:C.red}}/>
        <span style={{fontSize:9,color:o2sim<8?C.teal:o2sim<11?C.orange:C.red,fontWeight:700,minWidth:32}}>{o2sim}%</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — MT BETELGEUSE (1979)
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{
      title:"MT Betelgeuse — Whiddy Island, Irlande (1979)",
      teaser:"Pétrolier VLCC · Explosion au déchargement · IGS absent · 50 morts · Pire catastrophe maritime irlandaise",
      what:"Le 8 janvier 1979, le pétrolier français MT Betelgeuse (120 000 tdw, Total) est en cours de déchargement à Whiddy Island (Bantry Bay, Irlande) lorsqu'une série d'explosions détruit le navire. L'incendie se propage au terminal. 50 morts : 42 membres d'équipage et 8 employés du terminal. Le navire coule. L'enquête révèle que les citernes cargo ne disposaient pas de système IGS opérationnel, permettant la formation d'un mélange air/vapeur explosif.",
      cause:"• Absence de système IGS opérationnel pendant le déchargement\n• Citernes cargo non inertées → mélange explosif air/vapeurs d'hydrocarbures\n• Corrosion avancée de la structure — navire en mauvais état\n• Procédures de déchargement inadaptées — pas de surveillance O₂\n• Absence de détecteurs de gaz sur le pont et dans les citernes\n• Communication insuffisante entre bord et terminal",
      lessons:"✓ SOLAS : IGS obligatoire sur tous les pétroliers > 20 000 tdw (1981, puis 1983)\n✓ Obligation de moniteurs O₂ en continu dans chaque citerne\n✓ Non-return valves obligatoires sur toutes les tuyauteries IG\n✓ Procédures d'inertage définies dans le SMS (ISM Code)\n✓ Formation équipage : certificats spécifiques opérations pétrolières\n✓ Règle SOLAS II-2/4 : atmosphère inerte permanente en opérations",
      link:"🔗 Lien L3 IGS : Sans gaz inerte, les citernes cargo contiennent un mélange air + vapeurs d'hydrocarbures dans la zone d'explosivité (11-21% O₂). Une simple étincelle suffit. L'IGS rend ce mélange ininflammable en maintenant O₂ < 8%.",
    },
    en:{
      title:"MT Betelgeuse — Whiddy Island, Ireland (1979)",
      teaser:"VLCC tanker · Explosion during discharge · No IGS · 50 deaths · Worst Irish maritime disaster",
      what:"On January 8, 1979, the French tanker MT Betelgeuse (120,000 DWT, Total) was discharging at Whiddy Island (Bantry Bay, Ireland) when a series of explosions destroyed the vessel. The fire spread to the terminal. 50 deaths: 42 crew members and 8 terminal workers. The vessel sank. Investigation revealed the cargo tanks had no operational IGS system, allowing the formation of an explosive air/vapor mixture.",
      cause:"• No operational IGS system during discharge\n• Uninerted cargo tanks → explosive air/hydrocarbon vapor mixture\n• Advanced structural corrosion — vessel in poor condition\n• Inadequate discharge procedures — no O₂ monitoring\n• No gas detectors on deck or in tanks\n• Insufficient communication between vessel and terminal",
      lessons:"✓ SOLAS: IGS mandatory on all tankers > 20,000 DWT (1981, then 1983)\n✓ Mandatory continuous O₂ monitors in each tank\n✓ Non-return valves mandatory on all IG piping\n✓ Inerting procedures defined in SMS (ISM Code)\n✓ Crew training: specific certificates for tanker operations\n✓ SOLAS rule II-2/4: permanent inert atmosphere during operations",
      link:"🔗 L3 IGS Link: Without inert gas, cargo tanks contain an air + hydrocarbon vapor mixture in the explosive range (11-21% O₂). A single spark is enough. IGS makes this mixture non-flammable by keeping O₂ < 8%.",
    },
    es:{
      title:"MT Betelgeuse — Whiddy Island, Irlanda (1979)",
      teaser:"Petrolero VLCC · Explosión en descarga · Sin IGS · 50 muertos · Peor catástrofe marítima irlandesa",
      what:"El 8 de enero de 1979, el petrolero francés MT Betelgeuse (120.000 TPM, Total) estaba descargando en Whiddy Island (Bantry Bay, Irlanda) cuando una serie de explosiones destruyeron el buque. El incendio se extendió al terminal. 50 muertos: 42 tripulantes y 8 trabajadores del terminal. La investigación reveló que los tanques de carga carecían de sistema IGS operativo.",
      cause:"• Ausencia de sistema IGS operativo durante la descarga\n• Tanques de carga no inertizados → mezcla explosiva aire/vapores de hidrocarburos\n• Corrosión estructural avanzada\n• Procedimientos de descarga inadecuados — sin monitoreo O₂\n• Ausencia de detectores de gas",
      lessons:"✓ SOLAS: IGS obligatorio en todos los petroleros > 20.000 TPM (1981)\n✓ Monitores O₂ continuos obligatorios en cada tanque\n✓ Válvulas anti-retorno obligatorias en tuberías IG\n✓ Procedimientos de inertización en el SMS\n✓ Regla SOLAS II-2/4: atmósfera inerte permanente",
      link:"🔗 Vínculo L3 IGS: Sin gas inerte, los tanques contienen una mezcla aire + vapores de hidrocarburos en zona explosiva (11-21% O₂). Una chispa basta. El IGS mantiene O₂ < 8% para evitar la explosión.",
    },
    pt:{
      title:"MT Betelgeuse — Whiddy Island, Irlanda (1979)",
      teaser:"Petroleiro VLCC · Explosão durante descarga · Sem IGS · 50 mortos · Pior catástrofe marítima irlandesa",
      what:"A 8 de janeiro de 1979, o petroleiro francês MT Betelgeuse (120.000 TPB, Total) estava a descarregar em Whiddy Island (Bantry Bay, Irlanda) quando uma série de explosões destruiu o navio. O incêndio propagou-se ao terminal. 50 mortos: 42 tripulantes e 8 trabalhadores do terminal. A investigação revelou que os tanques de carga não tinham sistema IGS operacional.",
      cause:"• Ausência de sistema IGS operacional durante a descarga\n• Tanques de carga não inertizados → mistura explosiva ar/vapores de hidrocarbonetos\n• Corrosão estrutural avançada\n• Procedimentos de descarga inadequados — sem monitorização O₂\n• Ausência de detectores de gás",
      lessons:"✓ SOLAS: IGS obrigatório em todos os petroleiros > 20.000 TPB (1981)\n✓ Monitores O₂ contínuos obrigatórios em cada tanque\n✓ Válvulas anti-retorno obrigatórias nas tubagens IG\n✓ Procedimentos de inertização no SMS\n✓ Regra SOLAS II-2/4: atmosfera inerte permanente",
      link:"🔗 Vínculo L3 IGS: Sem gás inerte, os tanques contêm uma mistura ar + vapores de hidrocarbonetos na zona explosiva (11-21% O₂). Uma faísca basta. O IGS mantém O₂ < 8% para evitar a explosão.",
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
            {lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}
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
      {id:"q1", q:"Quel est le seuil maximal de O₂ autorisé dans une citerne cargo inertée ?\n(Répondre en %)"},
      {id:"q2", q:"Quel composant du système IGS retire le SO₂ et les suies des gaz ?\n(Répondre : scrubber, soufflante ou boîte à sable)"},
      {id:"q3", q:"En cas de déchargement rapide, l'IGS doit maintenir la citerne en :\n(Répondre : surpression ou dépression)"},
      {id:"q4", q:"Quel est le nom du clapet qui empêche les vapeurs cargo de remonter vers la chaudière ?\n(Répondre en anglais)"},
      {id:"q5", q:"Sur quel type de navire l'IGS est-il obligatoire selon SOLAS ?\n(Répondre : > 20 000 ou > 50 000 tdw)"},
    ],
    en:[
      {id:"q1", q:"What is the maximum permitted O₂ level in an inerted cargo tank?\n(Answer in %)"},
      {id:"q2", q:"Which IGS component removes SO₂ and soot from the gases?\n(Answer: scrubber, blower or sand box)"},
      {id:"q3", q:"During rapid discharge, the IGS must maintain the tank at:\n(Answer: overpressure or vacuum)"},
      {id:"q4", q:"What is the name of the valve that prevents cargo vapors from flowing back to the boiler?\n(Answer in English)"},
      {id:"q5", q:"On what type of vessel is IGS mandatory under SOLAS?\n(Answer: > 20,000 or > 50,000 DWT)"},
    ],
    es:[
      {id:"q1", q:"¿Cuál es el nivel máximo de O₂ permitido en un tanque de carga inertizado?\n(Responder en %)"},
      {id:"q2", q:"¿Qué componente del sistema IGS elimina el SO₂ y el hollín?\n(Responder: depurador, soplante o caja de arena)"},
      {id:"q3", q:"Durante una descarga rápida, el IGS debe mantener el tanque en:\n(Responder: sobrepresión o depresión)"},
      {id:"q4", q:"¿Cómo se llama la válvula que impide que los vapores de carga regresen a la caldera?\n(Responder en inglés)"},
      {id:"q5", q:"¿En qué tipo de buque es obligatorio el IGS según SOLAS?\n(Responder: > 20.000 o > 50.000 TPM)"},
    ],
    pt:[
      {id:"q1", q:"Qual é o nível máximo de O₂ permitido num tanque de carga inertizado?\n(Responder em %)"},
      {id:"q2", q:"Qual componente do sistema IGS remove o SO₂ e a fuligem dos gases?\n(Responder: scrubber, soprador ou caixa de areia)"},
      {id:"q3", q:"Durante uma descarga rápida, o IGS deve manter o tanque em:\n(Responder: sobrepressão ou depressão)"},
      {id:"q4", q:"Como se chama a válvula que impede os vapores de carga de regressar à caldeira?\n(Responder em inglês)"},
      {id:"q5", q:"Em que tipo de navio é o IGS obrigatório segundo SOLAS?\n(Responder: > 20.000 ou > 50.000 TPB)"},
    ],
  };

  const chk = (id, val) => {
    const v = val.trim().toLowerCase().replace(/\s/g,"").replace("%","");
    if (id==="q1") return v==="8";
    if (id==="q2") return v==="scrubber"||v==="dépurateur"||v==="depurador";
    if (id==="q3") return v==="surpression"||v==="overpressure"||v==="sobrepresión"||v==="sobrepressão";
    if (id==="q4") return v.includes("nonreturn")||v.includes("non-return")||v.includes("nrv")||v.includes("clapet");
    if (id==="q5") return v==="20000"||v===">20000"||v==="20,000"||v==="20.000";
    return false;
  };

  const corrKey = {
    fr:{q1:"8%",q2:"Scrubber",q3:"Surpression",q4:"Non-return valve",q5:"> 20 000 tdw"},
    en:{q1:"8%",q2:"Scrubber",q3:"Overpressure",q4:"Non-return valve",q5:"> 20,000 DWT"},
    es:{q1:"8%",q2:"Scrubber/Depurador",q3:"Sobrepresión",q4:"Non-return valve",q5:"> 20.000 TPM"},
    pt:{q1:"8%",q2:"Scrubber",q3:"Sobrepressão",q4:"Non-return valve",q5:"> 20.000 TPB"},
  };
  const expl = {
    fr:"✅ Q1: 8% — seuil SOLAS pour citerne inertée\n✅ Q2: Scrubber — retire SO₂, suies, H₂S par lavage eau de mer\n✅ Q3: Surpression — empêche l'aspiration d'air dans la citerne\n✅ Q4: Non-return valve — clapet anti-retour obligatoire\n✅ Q5: > 20 000 tdw — SOLAS Reg. II-2/4",
    en:"✅ Q1: 8% — SOLAS threshold for inerted tank\n✅ Q2: Scrubber — removes SO₂, soot, H₂S by seawater washing\n✅ Q3: Overpressure — prevents air from being drawn into tank\n✅ Q4: Non-return valve — mandatory anti-backflow valve\n✅ Q5: > 20,000 DWT — SOLAS Reg. II-2/4",
    es:"✅ Q1: 8% — umbral SOLAS para tanque inertizado\n✅ Q2: Scrubber — elimina SO₂, hollín, H₂S por lavado con agua de mar\n✅ Q3: Sobrepresión — impide la entrada de aire en el tanque\n✅ Q4: Non-return valve — válvula anti-retorno obligatoria\n✅ Q5: > 20.000 TPM — SOLAS Reg. II-2/4",
    pt:"✅ Q1: 8% — limiar SOLAS para tanque inertizado\n✅ Q2: Scrubber — remove SO₂, fuligem, H₂S por lavagem com água do mar\n✅ Q3: Sobrepressão — impede a entrada de ar no tanque\n✅ Q4: Non-return valve — válvula anti-retorno obrigatória\n✅ Q5: > 20.000 TPB — SOLAS Reg. II-2/4",
  };

  const list = qs[lang] || qs.fr;
  const ck = corrKey[lang] || corrKey.fr;

  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.orange}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : O₂ < 8% = inerte · Scrubber = lavage · Surpression = sécurité · Non-return = anti-retour"
        :lang==="en"?"💡 Reminders: O₂ < 8% = inert · Scrubber = washing · Overpressure = safety · Non-return = backflow prevention"
        :lang==="es"?"💡 Recordatorios: O₂ < 8% = inerte · Scrubber = lavado · Sobrepresión = seguridad · Non-return = anti-retorno"
        :"💡 Lembretes: O₂ < 8% = inerte · Scrubber = lavagem · Sobrepressão = segurança · Non-return = anti-retorno"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC && <div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${ck[q.id]}`}
          </div>}
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
  if (pct === 1)        return { icon:"🏆", color:"#f1c40f", label:{fr:"Parfait !",    en:"Perfect!",    es:"¡Perfecto!",  pt:"Perfeito!"} };
  if (pct >= 0.8)       return { icon:"🥇", color:"#e8b94f", label:{fr:"Excellent !",  en:"Excellent!",  es:"¡Excelente!", pt:"Excelente!"} };
  if (pct >= 0.6)       return { icon:"🥈", color:"#b0bec5", label:{fr:"Bien !",       en:"Well done!",  es:"¡Bien!",      pt:"Bem feito!"} };
  if (pct >= 0.4)       return { icon:"🥉", color:"#cd7f32", label:{fr:"Continue !",   en:"Keep going!", es:"¡Sigue!",     pt:"Continue!"} };
  return                       { icon:"📚", color:C.muted,   label:{fr:"À retravailler",en:"Keep studying",es:"A repasar",   pt:"Continue estudando"} };
}

// ══════════════════════════════════════
// QUESTION BANK — 15 QCM + SCORE TROPHÉE
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
      {q:"Quel est le composant IGS qui refroidit et nettoie les gaz de combustion ?",opts:["Soufflante","Scrubber","Non-return valve","PV breaker"],ans:1,expl:"Le scrubber (épurateur) refroidit les fumées avec de l'eau de mer et élimine SO₂, suies et H₂S. Sans scrubber, les gaz corrosifs endommagent les citernes."},
      {q:"La limite O₂ réglementaire (SOLAS) dans une citerne cargo inertée est :",opts:["< 5%","< 8%","< 11%","< 15%"],ans:1,expl:"SOLAS règle II-2/4 : O₂ < 8% dans les citernes cargo. En dessous de 8%, le mélange air/hydrocarbures sort de la zone d'explosivité."},
      {q:"Le gaz inerte produit par une chaudière pétrolier contient principalement :",opts:["Azote pur","CO₂ + N₂ (12-14% CO₂)","Argon","Vapeur d'eau"],ans:1,expl:"Les fumées de combustion d'une chaudière contiennent 12-14% CO₂ + N₂ + traces CO. Ce mélange, une fois lavé par le scrubber, constitue le gaz inerte."},
      {q:"Pourquoi la pression dans les citernes doit-elle rester POSITIVE pendant le déchargement ?",opts:["Pour pomper plus vite","Pour éviter l'aspiration d'air (O₂)","Pour réduire la viscosité","Pour refroidir le cargo"],ans:1,expl:"Si la pression devient négative (dépression), l'air extérieur (21% O₂) est aspiré → le mélange redevient explosif. La surpression positive IGS est critique en déchargement."},
      {q:"La non-return valve sur la tuyauterie IGS sert à :",opts:["Réguler le débit de gaz","Empêcher les vapeurs cargo de remonter","Mesurer la pression","Filtrer les particules"],ans:1,expl:"La non-return valve (clapet anti-retour) empêche les vapeurs d'hydrocarbures sous pression de refluer vers le scrubber et la chaudière — ce qui provoquerait une explosion."},
      {q:"Sur quel type de pétrolier l'IGS est-il OBLIGATOIRE selon SOLAS ?",opts:["> 10 000 tdw","> 20 000 tdw","> 50 000 tdw","> 100 000 tdw"],ans:1,expl:"SOLAS régulation II-2/4 (amendement 1981, en vigueur 1983) : IGS obligatoire sur tous les pétroliers de plus de 20 000 tdw et sur les chimiquier de plus de 8 000 tdw."},
      {q:"La soufflante (blower) du système IGS a pour rôle :",opts:["Refroidir le gaz","Laver le gaz","Maintenir la surpression dans les citernes","Mesurer O₂"],ans:2,expl:"La soufflante (ventilateur centrifuge) crée et maintient la surpression positive (+50 à +150 mmWC) dans les citernes via la tuyauterie de pont. C'est le 'moteur' de distribution du gaz inerte."},
      {q:"Lors de l'inertage initial d'une citerne (21% → < 8% O₂), on parle de :",opts:["Purge","Gazage","Dégazage","Mixing"],ans:0,expl:"La purge (purging) consiste à injecter du gaz inerte dans une citerne contenant de l'air (21% O₂) pour diluer l'O₂ jusqu'à < 8%. Ne pas confondre avec le dégazage (gas-freeing) qui est l'opération inverse."},
      {q:"Le dégazage (gas-freeing) consiste à :",opts:["Injecter du gaz inerte","Ventiler la citerne à l'air jusqu'à < 1% LFL","Mesurer la teneur en CO₂","Remplir la citerne d'eau"],ans:1,expl:"Le dégazage (gas-freeing) consiste à ventiler la citerne avec de l'air frais pour éliminer les vapeurs d'hydrocarbures jusqu'à < 1% LFL (Lower Flammable Limit). Préalable obligatoire aux travaux en espace clos."},
      {q:"Le PV breaker (pressure/vacuum breaker) se déclenche automatiquement quand :",opts:["O₂ > 8%","Surpression > +2000 Pa ou dépression < -350 Pa","T° > 50°C","Débit > 5000 m³/h"],ans:1,expl:"Le PV breaker protège mécaniquement la citerne contre les surpressions excessives (> +2000 Pa → ouverture vers atmosphère) et les dépressions (< -350 Pa → aspiration d'air). C'est le dernier recours si la régulation normale échoue."},
      {q:"Pendant le chargement du cargo, l'IGS fonctionne en :",opts:["Mode échange","Mode retour (vapeurs → pont)","Mode surpression continue","Mode arrêt"],ans:1,expl:"Pendant le chargement, le cargo pousse les vapeurs d'hydrocarbures hors de la citerne. Ces vapeurs partent par la tuyauterie de retour vapeurs (Vapour Return Line) vers le terminal. L'IGS maintient la pression positive mais ne souffle plus activement."},
      {q:"Le MT Betelgeuse (1979) a démontré que sans IGS :",opts:["Le déchargement est plus lent","Les vapeurs + air forment un mélange explosif","La corrosion s'accélère","La viscosité augmente"],ans:1,expl:"Le Betelgeuse a explosé car les citernes non inertées contenaient un mélange air/vapeurs d'hydrocarbures dans la zone explosive (11-21% O₂). L'IGS rendu obligatoire par SOLAS après cet accident a évité de nombreuses catastrophes similaires."},
      {q:"La concentration de CO₂ dans le gaz inerte produit par chaudière est :",opts:["1-3%","5-8%","12-14%","18-20%"],ans:2,expl:"Les fumées d'une chaudière fonctionnant correctement contiennent 12-14% de CO₂. Cette valeur élevée de CO₂ (gaz inerte) est ce qui permet de maintenir O₂ < 8% dans les citernes par dilution."},
      {q:"L'analyseur O₂ en entrée de citerne déclenche l'arrêt automatique de l'IGS si :",opts:["O₂ < 2%","O₂ > 8%","CO₂ > 15%","Pression > 200 mmWC"],ans:1,expl:"Si l'analyseur O₂ en aval du scrubber détecte O₂ > 8% dans le gaz inerte avant son entrée en citerne, il déclenche l'arrêt automatique de l'IGS (isolation automatique). Envoyer un gaz à > 8% O₂ dans la citerne annulerait l'inertage."},
      {q:"Quelle est la plage de pression normale de maintien du système IGS dans les citernes ?",opts:["+10 à +30 mmWC","+50 à +150 mmWC","+200 à +500 mmWC","+500 à +1000 mmWC"],ans:1,expl:"+50 à +150 mmWC (millimètres de colonne d'eau). Cette faible surpression est suffisante pour empêcher l'aspiration d'air tout en évitant de contraindre excessivement la structure des citernes."},
    ],
    en:[
      {q:"Which IGS component cools and cleans the combustion gases?",opts:["Blower","Scrubber","Non-return valve","PV breaker"],ans:1,expl:"The scrubber cools the flue gases with seawater and removes SO₂, soot and H₂S. Without the scrubber, corrosive gases would damage the tanks."},
      {q:"The regulatory O₂ limit (SOLAS) in an inerted cargo tank is:",opts:["< 5%","< 8%","< 11%","< 15%"],ans:1,expl:"SOLAS regulation II-2/4: O₂ < 8% in cargo tanks. Below 8%, the air/hydrocarbon mixture is outside the explosive range."},
      {q:"The inert gas produced by a tanker boiler mainly contains:",opts:["Pure nitrogen","CO₂ + N₂ (12-14% CO₂)","Argon","Water vapor"],ans:1,expl:"Boiler combustion flue gas contains 12-14% CO₂ + N₂ + CO traces. This mixture, once washed by the scrubber, constitutes the inert gas."},
      {q:"Why must tank pressure remain POSITIVE during discharge?",opts:["To pump faster","To prevent air ingress (O₂)","To reduce viscosity","To cool the cargo"],ans:1,expl:"If pressure becomes negative, outside air (21% O₂) is drawn in → the mixture becomes explosive again. Positive IGS overpressure is critical during discharge."},
      {q:"The non-return valve on the IGS piping serves to:",opts:["Regulate gas flow","Prevent cargo vapors from flowing back","Measure pressure","Filter particles"],ans:1,expl:"The non-return valve prevents pressurized hydrocarbon vapors from flowing back toward the scrubber and boiler — which would cause an explosion."},
      {q:"On which type of tanker is IGS MANDATORY under SOLAS?",opts:["> 10,000 DWT","> 20,000 DWT","> 50,000 DWT","> 100,000 DWT"],ans:1,expl:"SOLAS regulation II-2/4 (1981 amendment, in force 1983): IGS mandatory on all tankers over 20,000 DWT and chemical tankers over 8,000 DWT."},
      {q:"The IGS blower's role is to:",opts:["Cool the gas","Wash the gas","Maintain overpressure in tanks","Measure O₂"],ans:2,expl:"The blower (centrifugal fan) creates and maintains positive overpressure (+50 to +150 mmWC) in tanks via the deck piping. It is the 'engine' for inert gas distribution."},
      {q:"When initially inerting a tank (21% → < 8% O₂), the process is called:",opts:["Purging","Gassing","Gas-freeing","Mixing"],ans:0,expl:"Purging consists of injecting inert gas into a tank containing air (21% O₂) to dilute O₂ to < 8%. Not to be confused with gas-freeing, which is the opposite operation."},
      {q:"Gas-freeing consists of:",opts:["Injecting inert gas","Ventilating the tank with air until < 1% LFL","Measuring CO₂ content","Filling the tank with water"],ans:1,expl:"Gas-freeing consists of ventilating the tank with fresh air to eliminate hydrocarbon vapors to < 1% LFL. Mandatory prerequisite for confined space entry."},
      {q:"The PV breaker (pressure/vacuum breaker) triggers automatically when:",opts:["O₂ > 8%","Overpressure > +2000 Pa or vacuum < -350 Pa","T° > 50°C","Flow > 5000 m³/h"],ans:1,expl:"The PV breaker mechanically protects the tank against excessive overpressure (> +2000 Pa → opens to atmosphere) and vacuum (< -350 Pa → air ingress). It is the last resort if normal regulation fails."},
      {q:"During cargo loading, the IGS operates in:",opts:["Exchange mode","Return mode (vapors → deck)","Continuous overpressure mode","Shutdown mode"],ans:1,expl:"During loading, cargo pushes hydrocarbon vapors out of the tank. These vapors exit via the Vapour Return Line to the terminal. IGS maintains positive pressure but no longer actively blows."},
      {q:"The MT Betelgeuse (1979) demonstrated that without IGS:",opts:["Discharge is slower","Vapors + air form an explosive mixture","Corrosion accelerates","Viscosity increases"],ans:1,expl:"Betelgeuse exploded because uninerted tanks contained an air/hydrocarbon vapor mixture in the explosive range (11-21% O₂). IGS made mandatory by SOLAS after this accident has prevented many similar disasters."},
      {q:"CO₂ concentration in boiler-produced inert gas is:",opts:["1-3%","5-8%","12-14%","18-20%"],ans:2,expl:"A correctly operating boiler's flue gas contains 12-14% CO₂. This high CO₂ concentration is what allows O₂ to be maintained below 8% in tanks by dilution."},
      {q:"The inlet O₂ analyser triggers automatic IGS shutdown if:",opts:["O₂ < 2%","O₂ > 8%","CO₂ > 15%","Pressure > 200 mmWC"],ans:1,expl:"If the O₂ analyser downstream of the scrubber detects O₂ > 8% in the inert gas before tank entry, it triggers automatic IGS shutdown. Sending gas at > 8% O₂ into the tank would nullify inerting."},
      {q:"What is the normal IGS maintenance pressure range in tanks?",opts:["+10 to +30 mmWC","+50 to +150 mmWC","+200 to +500 mmWC","+500 to +1000 mmWC"],ans:1,expl:"+50 to +150 mmWC (millimeters of water column). This low overpressure is sufficient to prevent air ingress while avoiding excessive structural stress on tanks."},
    ],
    es:[
      {q:"¿Qué componente del IGS enfría y limpia los gases de combustión?",opts:["Soplante","Depurador (scrubber)","Válvula anti-retorno","Válvula PV"],ans:1,expl:"El scrubber (depurador) enfría los gases con agua de mar y elimina SO₂, hollín y H₂S. Sin scrubber, los gases corrosivos dañarían los tanques."},
      {q:"El límite de O₂ reglamentario (SOLAS) en un tanque de carga inertizado es:",opts:["< 5%","< 8%","< 11%","< 15%"],ans:1,expl:"SOLAS Regla II-2/4: O₂ < 8% en tanques de carga. Por debajo del 8%, la mezcla aire/hidrocarburos sale de la zona de explosividad."},
      {q:"El gas inerte producido por una caldera de petrolero contiene principalmente:",opts:["Nitrógeno puro","CO₂ + N₂ (12-14% CO₂)","Argón","Vapor de agua"],ans:1,expl:"Los gases de combustión de una caldera contienen 12-14% CO₂ + N₂ + trazas de CO. Esta mezcla, una vez lavada, constituye el gas inerte."},
      {q:"¿Por qué la presión en los tanques debe permanecer POSITIVA durante la descarga?",opts:["Para bombear más rápido","Para evitar la entrada de aire (O₂)","Para reducir la viscosidad","Para enfriar la carga"],ans:1,expl:"Si la presión se vuelve negativa, el aire exterior (21% O₂) es aspirado → la mezcla se vuelve explosiva. La sobrepresión positiva del IGS es crítica en la descarga."},
      {q:"La válvula anti-retorno en la tubería IGS sirve para:",opts:["Regular el caudal","Impedir que los vapores de carga regresen","Medir la presión","Filtrar partículas"],ans:1,expl:"La válvula anti-retorno impide que los vapores de hidrocarburos a presión refluyan hacia el scrubber y la caldera, lo que provocaría una explosión."},
      {q:"¿En qué tipo de buque es OBLIGATORIO el IGS según SOLAS?",opts:["> 10.000 TPM","> 20.000 TPM","> 50.000 TPM","> 100.000 TPM"],ans:1,expl:"SOLAS Reg. II-2/4 (enmienda 1981, en vigor 1983): IGS obligatorio en petroleros > 20.000 TPM y buques químicos > 8.000 TPM."},
      {q:"La función de la soplante (blower) del sistema IGS es:",opts:["Enfriar el gas","Lavar el gas","Mantener la sobrepresión en los tanques","Medir O₂"],ans:2,expl:"La soplante (ventilador centrífugo) crea y mantiene la sobrepresión positiva (+50 a +150 mmWC) en los tanques. Es el 'motor' de distribución del gas inerte."},
      {q:"El proceso de llevar un tanque de 21% a < 8% O₂ se llama:",opts:["Purga","Gasificación","Desgasificación","Mezcla"],ans:0,expl:"La purga (purging) consiste en inyectar gas inerte en un tanque con aire para diluir el O₂ hasta < 8%. No confundir con la desgasificación (gas-freeing), que es la operación inversa."},
      {q:"La desgasificación (gas-freeing) consiste en:",opts:["Inyectar gas inerte","Ventilar el tanque con aire hasta < 1% LFL","Medir el contenido de CO₂","Llenar el tanque de agua"],ans:1,expl:"La desgasificación ventila el tanque con aire fresco para eliminar vapores de hidrocarburos hasta < 1% LFL. Requisito previo obligatorio para trabajos en espacios confinados."},
      {q:"La válvula PV (presión/vacío) actúa automáticamente cuando:",opts:["O₂ > 8%","Sobrepresión > +2000 Pa o depresión < -350 Pa","T° > 50°C","Caudal > 5000 m³/h"],ans:1,expl:"La válvula PV protege mecánicamente el tanque contra sobrepresiones (> +2000 Pa) y depresiones (< -350 Pa). Es el último recurso si la regulación normal falla."},
      {q:"Durante la carga de mercancía, el IGS opera en:",opts:["Modo intercambio","Modo retorno (vapores → cubierta)","Modo sobrepresión continua","Modo apagado"],ans:1,expl:"Durante la carga, los vapores salen del tanque por la tubería de retorno de vapores. El IGS mantiene presión positiva pero no sopla activamente."},
      {q:"El MT Betelgeuse (1979) demostró que sin IGS:",opts:["La descarga es más lenta","Vapores + aire forman una mezcla explosiva","La corrosión se acelera","La viscosidad aumenta"],ans:1,expl:"El Betelgeuse explotó porque los tanques no inertizados contenían una mezcla aire/vapores en zona explosiva (11-21% O₂). El IGS hecho obligatorio por SOLAS ha evitado muchas catástrofes similares."},
      {q:"La concentración de CO₂ en el gas inerte de caldera es:",opts:["1-3%","5-8%","12-14%","18-20%"],ans:2,expl:"Los gases de combustión de una caldera correctamente operada contienen 12-14% de CO₂. Esta alta concentración permite mantener O₂ < 8% en los tanques por dilución."},
      {q:"El analizador O₂ de entrada dispara el paro automático del IGS si:",opts:["O₂ < 2%","O₂ > 8%","CO₂ > 15%","Presión > 200 mmWC"],ans:1,expl:"Si el analizador detecta O₂ > 8% en el gas inerte antes de entrar al tanque, dispara el paro automático del IGS. Enviar gas con > 8% O₂ anularía el inertaje."},
      {q:"¿Cuál es el rango de presión de mantenimiento normal del IGS en los tanques?",opts:["+10 a +30 mmWC","+50 a +150 mmWC","+200 a +500 mmWC","+500 a +1000 mmWC"],ans:1,expl:"+50 a +150 mmWC (milímetros de columna de agua). Esta baja sobrepresión es suficiente para evitar la entrada de aire sin estresar excesivamente la estructura."},
    ],
    pt:[
      {q:"Qual componente do IGS arrefece e limpa os gases de combustão?",opts:["Soprador","Scrubber","Válvula anti-retorno","Válvula PV"],ans:1,expl:"O scrubber arrefece os gases de exaustão com água do mar e remove SO₂, fuligem e H₂S. Sem scrubber, os gases corrosivos danificariam os tanques."},
      {q:"O limite de O₂ regulamentar (SOLAS) num tanque de carga inertizado é:",opts:["< 5%","< 8%","< 11%","< 15%"],ans:1,expl:"SOLAS Regulação II-2/4: O₂ < 8% nos tanques de carga. Abaixo de 8%, a mistura ar/hidrocarbonetos sai da zona de explosividade."},
      {q:"O gás inerte produzido por uma caldeira de petroleiro contém principalmente:",opts:["Azoto puro","CO₂ + N₂ (12-14% CO₂)","Árgon","Vapor de água"],ans:1,expl:"Os gases de combustão de uma caldeira contêm 12-14% CO₂ + N₂ + vestígios de CO. Esta mistura, após lavagem pelo scrubber, constitui o gás inerte."},
      {q:"Por que a pressão nos tanques deve permanecer POSITIVA durante a descarga?",opts:["Para bombear mais rápido","Para evitar a entrada de ar (O₂)","Para reduzir a viscosidade","Para arrefecer a carga"],ans:1,expl:"Se a pressão se tornar negativa, o ar exterior (21% O₂) é aspirado → a mistura torna-se explosiva novamente. A sobrepressão positiva do IGS é crítica durante a descarga."},
      {q:"A válvula anti-retorno na tubagem IGS serve para:",opts:["Regular o caudal de gás","Impedir que os vapores de carga regressem","Medir a pressão","Filtrar partículas"],ans:1,expl:"A válvula anti-retorno impede que os vapores de hidrocarbonetos a pressão refluan para o scrubber e caldeira, o que causaria uma explosão."},
      {q:"Em que tipo de navio é OBRIGATÓRIO o IGS segundo SOLAS?",opts:["> 10.000 TPB","> 20.000 TPB","> 50.000 TPB","> 100.000 TPB"],ans:1,expl:"SOLAS Reg. II-2/4 (emenda 1981, em vigor 1983): IGS obrigatório em petroleiros > 20.000 TPB e navios-tanque químicos > 8.000 TPB."},
      {q:"O papel do soprador (blower) do sistema IGS é:",opts:["Arrefecer o gás","Lavar o gás","Manter a sobrepressão nos tanques","Medir O₂"],ans:2,expl:"O soprador (ventilador centrífugo) cria e mantém a sobrepressão positiva (+50 a +150 mmWC) nos tanques. É o 'motor' de distribuição do gás inerte."},
      {q:"O processo de levar um tanque de 21% para < 8% O₂ chama-se:",opts:["Purga","Gasificação","Desgasificação","Mistura"],ans:0,expl:"A purga (purging) consiste em injetar gás inerte num tanque com ar para diluir o O₂ até < 8%. Não confundir com a desgasificação (gas-freeing), que é a operação inversa."},
      {q:"A desgasificação (gas-freeing) consiste em:",opts:["Injetar gás inerte","Ventilar o tanque com ar até < 1% LFL","Medir o teor de CO₂","Encher o tanque de água"],ans:1,expl:"A desgasificação ventila o tanque com ar fresco para eliminar vapores de hidrocarbonetos até < 1% LFL. Pré-requisito obrigatório para entrada em espaço confinado."},
      {q:"A válvula PV (pressão/vácuo) actua automaticamente quando:",opts:["O₂ > 8%","Sobrepressão > +2000 Pa ou vácuo < -350 Pa","T° > 50°C","Caudal > 5000 m³/h"],ans:1,expl:"A válvula PV protege mecanicamente o tanque contra sobrepressões excessivas (> +2000 Pa) e vácuo (< -350 Pa). É o último recurso se a regulação normal falhar."},
      {q:"Durante o carregamento de carga, o IGS opera em:",opts:["Modo troca","Modo retorno (vapores → convés)","Modo sobrepressão contínua","Modo desligado"],ans:1,expl:"Durante o carregamento, os vapores saem do tanque pela tubagem de retorno de vapores. O IGS mantém pressão positiva mas não sopra ativamente."},
      {q:"O MT Betelgeuse (1979) demonstrou que sem IGS:",opts:["A descarga é mais lenta","Vapores + ar formam uma mistura explosiva","A corrosão acelera","A viscosidade aumenta"],ans:1,expl:"O Betelgeuse explodiu porque os tanques não inertizados continham uma mistura ar/vapores de hidrocarbonetos na zona explosiva (11-21% O₂). O IGS tornado obrigatório pelo SOLAS evitou muitas catástrofes semelhantes."},
      {q:"A concentração de CO₂ no gás inerte produzido pela caldeira é:",opts:["1-3%","5-8%","12-14%","18-20%"],ans:2,expl:"Os gases de combustão de uma caldeira a funcionar corretamente contêm 12-14% CO₂. Esta elevada concentração permite manter O₂ < 8% nos tanques por diluição."},
      {q:"O analisador O₂ de entrada dispara o desligamento automático do IGS se:",opts:["O₂ < 2%","O₂ > 8%","CO₂ > 15%","Pressão > 200 mmWC"],ans:1,expl:"Se o analisador detetar O₂ > 8% no gás inerte antes de entrar no tanque, dispara o desligamento automático do IGS. Enviar gás com > 8% O₂ anularia a inertização."},
      {q:"Qual é a gama de pressão normal de manutenção do IGS nos tanques?",opts:["+10 a +30 mmWC","+50 a +150 mmWC","+200 a +500 mmWC","+500 a +1000 mmWC"],ans:1,expl:"+50 a +150 mmWC (milímetros de coluna de água). Esta baixa sobrepressão é suficiente para impedir a entrada de ar sem stressar excessivamente a estrutura dos tanques."},
    ],
  };

  const list = qs[lang] || qs.fr;
  const total = list.length;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i === list[idx].ans) setScore(s=>s+1);
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
          {lbl("Banque de questions","Question Bank","Banco de preguntas","Banco de questões")}
        </div>
        <div style={{fontSize:12,color:C.muted,marginBottom:16}}>
          15 {lbl("questions premium","premium questions","preguntas premium","questões premium")}
        </div>
        <button onClick={()=>setStarted(true)}
          style={{padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.blue})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {lbl("COMMENCER →","START →","EMPEZAR →","COMEÇAR →")}
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
          🔄 {lbl("Recommencer","Restart","Reiniciar","Recomeçar")}
        </button>
      </div>
    );
  }

  const q = list[idx];
  const progress = ((idx) / total) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:10,color:C.purple,fontWeight:700}}>
            {lbl("Question","Question","Pregunta","Pergunta")} {idx+1}/{total}
          </span>
          <span style={{fontSize:10,color:C.gold,fontWeight:700}}>⭐ {score}/{idx}</span>
        </div>
        <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.purple},${C.blue})`,borderRadius:4,transition:"width 0.3s"}}/>
        </div>
      </div>
      {/* Question */}
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:14,padding:"14px",marginBottom:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:13,color:C.white,lineHeight:1.6,fontWeight:600}}>{q.q}</div>
      </div>
      {/* Options */}
      {q.opts.map((opt,i)=>{
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
      {/* Explanation */}
      {answered && (
        <div style={{padding:"11px 13px",borderRadius:12,background:`rgba(${sel===q.ans?"30,138,74":"192,57,43"},0.1)`,border:`1px solid ${sel===q.ans?C.green:C.red}44`,marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,color:sel===q.ans?C.green:C.red,marginBottom:4}}>
            {sel===q.ans?(lang==="fr"?"✓ Bonne réponse !":lang==="en"?"✓ Correct!":lang==="es"?"✓ ¡Correcta!":"✓ Correto!")
            :(lang==="fr"?"✗ Mauvaise réponse":lang==="en"?"✗ Wrong answer":lang==="es"?"✗ Incorrecta":"✗ Errada")}
          </div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{q.expl}</div>
        </div>
      )}
      {answered && (
        <button onClick={handleNext}
          style={{width:"100%",padding:"13px",borderRadius:14,background:`linear-gradient(135deg,${C.purple},${C.blue})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
          {idx===total-1
            ?(lang==="fr"?"VOIR MON SCORE →":lang==="en"?"SEE MY SCORE →":lang==="es"?"VER PUNTUACIÓN →":"VER PONTUAÇÃO →")
            :(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →")}
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
    {q:"Quel est le seuil O₂ maximum dans une citerne cargo inertée selon SOLAS ?",opts:["< 5%","< 8%","< 11%","< 21%"],ans:1,expl:"SOLAS Règle II-2/4 : O₂ < 8% dans les citernes inertées. C'est le seuil qui garantit que le mélange air/hydrocarbures est hors de la zone d'explosivité."},
    {q:"Le scrubber dans le système IGS a pour rôle de :",opts:["Comprimer le gaz","Distribuer le gaz aux citernes","Refroidir et laver les fumées","Mesurer O₂"],ans:2,expl:"Le scrubber (épurateur) refroidit les fumées de chaudière avec de l'eau de mer et élimine les polluants (SO₂, suies, H₂S) avant que le gaz ne soit distribué dans les citernes."},
    {q:"Pendant le déchargement, si l'IGS tombe en panne, le risque principal est :",opts:["Surchauffe des pompes","Aspiration d'air → mélange explosif","Corrosion des tuyauteries","Augmentation de viscosité"],ans:1,expl:"Sans IGS, la pression dans les citernes devient négative lors du pompage → aspiration d'air (O₂ 21%) → mélange explosif. C'est exactement ce qui s'est passé sur le Betelgeuse en 1979."},
    {q:"Le MT Betelgeuse (1979) a entraîné l'obligation SOLAS de l'IGS sur les pétroliers :",opts:["> 5 000 tdw","> 20 000 tdw","> 50 000 tdw","> 150 000 tdw"],ans:1,expl:"Suite à l'explosion du Betelgeuse (50 morts), SOLAS a rendu l'IGS obligatoire sur tous les pétroliers > 20 000 tdw et chimiquiers > 8 000 tdw par amendement de 1981 (en vigueur 1983)."},
    {q:"La non-return valve sur la tuyauterie IGS empêche :",opts:["L'excès de pression","Le retour des vapeurs cargo vers la chaudière","La condensation d'eau","La fuite de CO₂"],ans:1,expl:"La non-return valve (clapet anti-retour) est un dispositif de sécurité essentiel qui empêche les vapeurs d'hydrocarbures inflammables de remonter de la citerne vers le scrubber ou la chaudière, évitant ainsi une explosion catastophique."},
  ],
  en:[
    {q:"What is the maximum O₂ threshold in an inerted cargo tank under SOLAS?",opts:["< 5%","< 8%","< 11%","< 21%"],ans:1,expl:"SOLAS Rule II-2/4: O₂ < 8% in inerted tanks. This is the threshold that ensures the air/hydrocarbon mixture is outside the explosive range."},
    {q:"The scrubber in the IGS system serves to:",opts:["Compress the gas","Distribute gas to tanks","Cool and wash the flue gases","Measure O₂"],ans:2,expl:"The scrubber cools the boiler flue gases with seawater and removes pollutants (SO₂, soot, H₂S) before the gas is distributed to the tanks."},
    {q:"During discharge, if the IGS breaks down, the main risk is:",opts:["Pump overheating","Air ingress → explosive mixture","Pipe corrosion","Viscosity increase"],ans:1,expl:"Without IGS, tank pressure becomes negative during pumping → air ingress (21% O₂) → explosive mixture. This is exactly what happened on the Betelgeuse in 1979."},
    {q:"The MT Betelgeuse (1979) led to the SOLAS mandatory requirement for IGS on tankers:",opts:["> 5,000 DWT","> 20,000 DWT","> 50,000 DWT","> 150,000 DWT"],ans:1,expl:"Following the Betelgeuse explosion (50 deaths), SOLAS made IGS mandatory on all tankers > 20,000 DWT and chemical tankers > 8,000 DWT by 1981 amendment (in force 1983)."},
    {q:"The non-return valve on the IGS piping prevents:",opts:["Excess pressure","Cargo vapors from flowing back to the boiler","Water condensation","CO₂ leakage"],ans:1,expl:"The non-return valve is an essential safety device that prevents flammable hydrocarbon vapors from flowing back from the tank to the scrubber or boiler, avoiding a catastrophic explosion."},
  ],
  es:[
    {q:"¿Cuál es el umbral máximo de O₂ en un tanque de carga inertizado según SOLAS?",opts:["< 5%","< 8%","< 11%","< 21%"],ans:1,expl:"SOLAS Regla II-2/4: O₂ < 8% en tanques inertizados. Este es el umbral que garantiza que la mezcla aire/hidrocarburos está fuera de la zona de explosividad."},
    {q:"El scrubber (depurador) en el sistema IGS sirve para:",opts:["Comprimir el gas","Distribuir el gas a los tanques","Enfriar y lavar los gases de combustión","Medir O₂"],ans:2,expl:"El scrubber enfría los gases de combustión de la caldera con agua de mar y elimina contaminantes (SO₂, hollín, H₂S) antes de distribuir el gas a los tanques."},
    {q:"Durante la descarga, si el IGS falla, el riesgo principal es:",opts:["Sobrecalentamiento de bombas","Entrada de aire → mezcla explosiva","Corrosión de tuberías","Aumento de viscosidad"],ans:1,expl:"Sin IGS, la presión en los tanques se vuelve negativa al bombear → entrada de aire (21% O₂) → mezcla explosiva. Exactamente lo que ocurrió en el Betelgeuse en 1979."},
    {q:"El MT Betelgeuse (1979) llevó a SOLAS a exigir el IGS en petroleros:",opts:["> 5.000 TPM","> 20.000 TPM","> 50.000 TPM","> 150.000 TPM"],ans:1,expl:"Tras la explosión del Betelgeuse (50 muertos), SOLAS hizo obligatorio el IGS en petroleros > 20.000 TPM y buques químicos > 8.000 TPM por enmienda de 1981."},
    {q:"La válvula anti-retorno en la tubería IGS impide:",opts:["El exceso de presión","El retorno de vapores de carga a la caldera","La condensación de agua","La fuga de CO₂"],ans:1,expl:"La válvula anti-retorno impide que los vapores inflamables de hidrocarburos refluyan del tanque al scrubber o la caldera, evitando una explosión catastrófica."},
  ],
  pt:[
    {q:"Qual é o limite máximo de O₂ num tanque de carga inertizado segundo SOLAS?",opts:["< 5%","< 8%","< 11%","< 21%"],ans:1,expl:"SOLAS Regra II-2/4: O₂ < 8% nos tanques inertizados. Este é o limiar que garante que a mistura ar/hidrocarbonetos está fora da zona de explosividade."},
    {q:"O scrubber no sistema IGS serve para:",opts:["Comprimir o gás","Distribuir o gás aos tanques","Arrefecer e lavar os gases de exaustão","Medir O₂"],ans:2,expl:"O scrubber arrefece os gases de exaustão da caldeira com água do mar e remove poluentes (SO₂, fuligem, H₂S) antes de distribuir o gás aos tanques."},
    {q:"Durante a descarga, se o IGS avariar, o principal risco é:",opts:["Sobreaquecimento das bombas","Entrada de ar → mistura explosiva","Corrosão das tubagens","Aumento de viscosidade"],ans:1,expl:"Sem IGS, a pressão nos tanques torna-se negativa durante a bombagem → entrada de ar (21% O₂) → mistura explosiva. Foi exatamente o que aconteceu com o Betelgeuse em 1979."},
    {q:"O MT Betelgeuse (1979) levou o SOLAS a exigir o IGS em petroleiros:",opts:["> 5.000 TPB","> 20.000 TPB","> 50.000 TPB","> 150.000 TPB"],ans:1,expl:"Após a explosão do Betelgeuse (50 mortos), o SOLAS tornou o IGS obrigatório em petroleiros > 20.000 TPB e navios-tanque químicos > 8.000 TPB pela emenda de 1981."},
    {q:"A válvula anti-retorno na tubagem IGS impede:",opts:["O excesso de pressão","O retorno dos vapores de carga para a caldeira","A condensação de água","A fuga de CO₂"],ans:1,expl:"A válvula anti-retorno impede que os vapores inflamáveis de hidrocarbonetos regressem do tanque para o scrubber ou caldeira, evitando uma explosão catastrófica."},
  ],
};

function QuizComp({ questions, t, lang, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const total = questions.length;
  const isLast = idx === total-1;

  const handleAnswer = (i) => {
    if (answered) return;
    setSel(i);
    setAnswered(true);
    if (i===q.ans) setScore(s=>s+1);
  };

  const handleNext = () => {
    const finalScore = score + (sel===q.ans?1:0);
    if (isLast) { onComplete(finalScore); return; }
    setSel(null); setAnswered(false); setIdx(i=>i+1);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:10,color:C.muted}}>{t.question} {idx+1} {t.ofQ} {total}</span>
        <span style={{fontSize:10,color:C.gold,fontWeight:700}}>⭐ {score}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(idx/total)*100}%`,background:`linear-gradient(90deg,${C.orange},${C.gold})`,borderRadius:4,transition:"width 0.3s"}}/>
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
          style={{width:"100%",padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C.orange},${C.gold})`,border:"none",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:1}}>
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
      badge:"⚙️ Module e6 — Cargaison & Pétrole · Leçon 3/6 · ⭐ Premium · 200 XP",
      title:"Systèmes à Gaz Inerte (IGS) — Sécurité & Prévention Explosion",
      intro:"Un pétrolier transportant du brut n'est pas seulement un risque de pollution — c'est une bombe potentielle. Les vapeurs d'hydrocarbures mélangées à l'air forment un cocktail explosif. Le système IGS est la principale barrière de sécurité contre ce risque.\n\nCette leçon couvre le fonctionnement du système IGS, les zones d'explosivité O₂, les procédures d'inertage et les obligations SOLAS.",
      p1:"PARTIE 1 — ARCHITECTURE DU SYSTÈME IGS",s1t:"Chaudière → Scrubber → Soufflante → Citernes",
      s1:"PRINCIPE FONDAMENTAL :\nMaintenir O₂ < 8% dans toutes les citernes cargo pour rendre le mélange air/hydrocarbures ininflammable.\n\nCOMPOSANTS PRINCIPAUX :\n→ Source de gaz (Flue Gas) : chaudière principale ou chaudière auxiliaire\n→ Scrubber (épurateur) : refroidit et lave les fumées (eau de mer)\n→ Soufflante (blower) : crée la surpression positive dans les citernes\n→ Non-return valve : empêche le retour des vapeurs cargo\n→ Pont IG (IG main) : tuyauterie de distribution sur le pont\n→ Vannes individuelles par citerne\n\nSPÉCIFICATIONS GAS INERTE :\n→ O₂ < 5% (en sortie scrubber, idéalement)\n→ Température < 45°C (après refroidissement)\n→ Teneur SO₂ < 2 ppm (après lavage)\n→ Pression : +50 à +150 mmWC dans les citernes\n→ Débit soufflante : 2 000 à 8 000 m³/h",
      p2:"PARTIE 2 — ZONES D'EXPLOSIVITÉ O₂",s2t:"Triangle du feu · Limites d'inflammabilité",
      s2:"TRIANGLE DU FEU (RAPPEL) :\nCombustible (vapeurs HC) + Comburant (O₂) + Source d'ignition = EXPLOSION\nL'IGS élimine le comburant (O₂) → le feu est impossible\n\nZONES D'EXPLOSIVITÉ :\n< 2% O₂ → Zone asphyxiante (danger vie humaine)\n2-8% O₂ → ZONE INERTE ✅ (objectif IGS)\n8-11% O₂ → Zone critique (transition dangereuse)\n11-21% O₂ → Zone inflammable 🔥 (RISQUE EXPLOSION)\n> 21% O₂ → Air normal\n\nLIMITES D'INFLAMMABILITÉ (VAPEURS HC) :\nLFL (Lower Flammable Limit) : 1% en volume\nUFL (Upper Flammable Limit) : 10% en volume\nZone explosive : entre LFL et UFL\n\nIMPORTANT : Maintenir O₂ < 8% garantit que même si des vapeurs HC sont présentes, le mélange ne peut pas s'enflammer.",
      p3:"PARTIE 3 — OPÉRATIONS IGS & CYCLE CARGO",s3t:"Purge · Chargement · Déchargement · Gas-freeing",
      s3:"5 PHASES OPÉRATIONNELLES :\n\n1. CITERNE VIDE (post-déchargement)\nO₂ ≈ 21% (air) → DANGEREUSE si HC présents\n\n2. PURGE (inertage initial)\nInjection IG : O₂ 21% → < 8%\nDurée : 4-12h selon volume\nMéthode : dilution ou déplacement\n\n3. CHARGEMENT\nCargo entre → vapeurs HC sortent par VRL\nIGS maintient surpression positive\nO₂ < 8% permanent\n\n4. DÉCHARGEMENT\nPompes aspirent le cargo → risque dépression\nIGS CRITIQUE : compenser immédiatement le vide\nSurveiller O₂ en continu\n\n5. POST-DÉCHARGEMENT\nCiterne vide, maintenue sous IG positif\nPrête pour ballastage ou nouvelle cargaison",
      p4:"PARTIE 4 — RÉGLEMENTATION & DOCUMENTATION",s4t:"SOLAS · Procédures · Certificats",
      s4:"OBLIGATIONS SOLAS :\n→ IGS obligatoire sur pétroliers > 20 000 tdw (SOLAS II-2/4)\n→ Chimiquier > 8 000 tdw : IGS ou système équivalent\n→ IGS doit pouvoir maintenir O₂ < 8% en continu\n→ Alarme haute O₂ à 8% : arrêt automatique IG\n→ Analyseur O₂ continu obligatoire sur chaque citerne\n\nDOCUMENTATION :\n→ Cargo Record Book : toutes opérations enregistrées\n→ IGS Log : paramètres O₂, pression, débit\n→ Hot Work Permit : obligatoire avant tout travail en citerne\n→ Gas Free Certificate : avant entrée espace confinado\n\nCERTIFICATION ÉQUIPAGE :\n→ STCW Section A-V/1-1 : formation opérations pétrolières\n→ Basic/Advanced Tanker Training (BABT/AATT)\n→ Compétence IGS : obligatoire pour officier cargo pétrolier",
      p5:"🎯 EXERCICES PRATIQUES PREMIUM",
      p6:"⚠️ CAS D'ACCIDENT RÉEL",
      p7:"📝 BANQUE — 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON E6 L3",
      sumP:["IGS : Chaudière → Scrubber → Soufflante → Citernes","O₂ < 8% = zone inerte · 11-21% = zone explosive","Non-return valve : anti-retour vapeurs HC obligatoire","PV breaker : protection ±2000 Pa automatique","Purge : 21% → < 8% O₂ · Gas-freeing : HC → < 1% LFL","Surpression positive : empêche aspiration d'air en déchargement","SOLAS II-2/4 : IGS obligatoire > 20 000 tdw (1983)","MT Betelgeuse 1979 → 50 morts → IGS SOLAS obligatoire"],
      learnedP:["Architecture IGS : 4 composants clés","O₂ < 8% = inerte · zones d'explosivité","Cycle opérationnel : purge → chargement → déchargement","Non-return valve · PV breaker · analyseur O₂","SOLAS II-2/4 · MT Betelgeuse → obligation IGS"],
    },
    en:{
      badge:"⚙️ Module e6 — Cargo & Oil · Lesson 3/6 · ⭐ Premium · 200 XP",
      title:"Inert Gas Systems (IGS) — Safety & Explosion Prevention",
      intro:"A crude oil tanker is not just a pollution risk — it's a potential bomb. Hydrocarbon vapors mixed with air form an explosive cocktail. The IGS is the primary safety barrier against this risk.\n\nThis lesson covers IGS operation, O₂ explosive zones, inerting procedures and SOLAS obligations.",
      p1:"PART 1 — IGS SYSTEM ARCHITECTURE",s1t:"Boiler → Scrubber → Blower → Tanks",
      s1:"FUNDAMENTAL PRINCIPLE:\nMaintain O₂ < 8% in all cargo tanks to render the air/hydrocarbon mixture non-flammable.\n\nMAIN COMPONENTS:\n→ Gas source (Flue Gas): main boiler or auxiliary boiler\n→ Scrubber: cools and washes flue gases (seawater)\n→ Blower: creates positive overpressure in tanks\n→ Non-return valve: prevents cargo vapor backflow\n→ IG deck main: distribution piping on deck\n→ Individual tank valves\n\nINERT GAS SPECIFICATIONS:\n→ O₂ < 5% (scrubber outlet, ideally)\n→ Temperature < 45°C (after cooling)\n→ SO₂ content < 2 ppm (after washing)\n→ Pressure: +50 to +150 mmWC in tanks\n→ Blower flow: 2,000 to 8,000 m³/h",
      p2:"PART 2 — O₂ EXPLOSIVE ZONES",s2t:"Fire triangle · Flammability limits",
      s2:"FIRE TRIANGLE (REMINDER):\nFuel (HC vapors) + Oxidizer (O₂) + Ignition source = EXPLOSION\nIGS eliminates the oxidizer (O₂) → fire is impossible\n\nO₂ ZONES:\n< 2% O₂ → Asphyxiation zone (life danger)\n2-8% O₂ → INERT ZONE ✅ (IGS objective)\n8-11% O₂ → Critical zone (dangerous transition)\n11-21% O₂ → Flammable zone 🔥 (EXPLOSION RISK)\n> 21% O₂ → Normal air\n\nFLAMMABILITY LIMITS (HC VAPORS):\nLFL (Lower Flammable Limit): 1% by volume\nUFL (Upper Flammable Limit): 10% by volume\nExplosive range: between LFL and UFL\n\nIMPORTANT: Maintaining O₂ < 8% ensures that even if HC vapors are present, the mixture cannot ignite.",
      p3:"PART 3 — IGS OPERATIONS & CARGO CYCLE",s3t:"Purging · Loading · Discharging · Gas-freeing",
      s3:"5 OPERATIONAL PHASES:\n\n1. EMPTY TANK (post-discharge)\nO₂ ≈ 21% (air) → DANGEROUS if HC present\n\n2. PURGING (initial inerting)\nIG injection: O₂ 21% → < 8%\nDuration: 4-12h depending on volume\nMethod: dilution or displacement\n\n3. LOADING\nCargo enters → HC vapors exit via VRL\nIGS maintains positive overpressure\nO₂ < 8% permanent\n\n4. DISCHARGE\nPumps draw cargo → vacuum risk\nIGS CRITICAL: immediately compensate vacuum\nMonitor O₂ continuously\n\n5. POST-DISCHARGE\nCargo-empty tank kept under positive IG\nReady for ballasting or new cargo",
      p4:"PART 4 — REGULATIONS & DOCUMENTATION",s4t:"SOLAS · Procedures · Certificates",
      s4:"SOLAS REQUIREMENTS:\n→ IGS mandatory on tankers > 20,000 DWT (SOLAS II-2/4)\n→ Chemical tankers > 8,000 DWT: IGS or equivalent\n→ IGS must maintain O₂ < 8% continuously\n→ High O₂ alarm at 8%: automatic IG shutdown\n→ Continuous O₂ analyser mandatory on each tank\n\nDOCUMENTATION:\n→ Cargo Record Book: all operations recorded\n→ IGS Log: O₂, pressure, flow parameters\n→ Hot Work Permit: mandatory before any tank work\n→ Gas Free Certificate: before confined space entry\n\nCREW CERTIFICATION:\n→ STCW Section A-V/1-1: oil tanker training\n→ Basic/Advanced Tanker Training (BABT/AATT)\n→ IGS competency: mandatory for petroleum cargo officer",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",
      p6:"⚠️ REAL ACCIDENT CASE",
      p7:"📝 BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LESSON E6 L3",
      sumP:["IGS: Boiler → Scrubber → Blower → Tanks","O₂ < 8% = inert zone · 11-21% = explosive zone","Non-return valve: mandatory HC vapor backflow prevention","PV breaker: automatic ±2000 Pa protection","Purging: 21% → < 8% O₂ · Gas-freeing: HC → < 1% LFL","Positive overpressure: prevents air ingress during discharge","SOLAS II-2/4: IGS mandatory > 20,000 DWT (1983)","MT Betelgeuse 1979 → 50 deaths → mandatory SOLAS IGS"],
      learnedP:["IGS architecture: 4 key components","O₂ < 8% = inert · explosive zones","Operational cycle: purging → loading → discharging","Non-return valve · PV breaker · O₂ analyser","SOLAS II-2/4 · MT Betelgeuse → IGS obligation"],
    },
    es:{
      badge:"⚙️ Módulo e6 — Carga & Petróleo · Lección 3/6 · ⭐ Premium · 200 XP",
      title:"Sistemas de Gas Inerte (IGS) — Seguridad & Prevención de Explosión",
      intro:"Un petrolero de crudo no es solo un riesgo de contaminación — es una bomba potencial. Los vapores de hidrocarburos mezclados con aire forman un cóctel explosivo. El sistema IGS es la principal barrera de seguridad contra este riesgo.\n\nEsta lección cubre el funcionamiento del IGS, las zonas de explosividad O₂, los procedimientos de inertización y las obligaciones SOLAS.",
      p1:"PARTE 1 — ARQUITECTURA DEL SISTEMA IGS",s1t:"Caldera → Depurador → Soplante → Tanques",
      s1:"PRINCIPIO FUNDAMENTAL:\nMantener O₂ < 8% en todos los tanques de carga para hacer no inflamable la mezcla aire/hidrocarburos.\n\nCOMPONENTES PRINCIPALES:\n→ Fuente de gas: caldera principal o auxiliar\n→ Scrubber (depurador): enfría y lava los gases de combustión\n→ Soplante: crea sobrepresión positiva en los tanques\n→ Válvula anti-retorno: impide retorno de vapores de carga\n→ Colector IG cubierta: tubería de distribución\n\nESPECIFICACIONES GAS INERTE:\n→ O₂ < 5% (salida scrubber) · T° < 45°C · SO₂ < 2 ppm\n→ Presión: +50 a +150 mmWC · Caudal: 2.000-8.000 m³/h",
      p2:"PARTE 2 — ZONAS DE EXPLOSIVIDAD O₂",s2t:"Triángulo del fuego · Límites de inflamabilidad",
      s2:"TRIÁNGULO DEL FUEGO:\nCombustible + Comburente (O₂) + Fuente de ignición = EXPLOSIÓN\nEl IGS elimina el comburente → el fuego es imposible\n\nZONAS DE O₂:\n< 2% → Zona asfixiante\n2-8% → ZONA INERTE ✅\n8-11% → Zona crítica\n11-21% → Zona inflamable 🔥\n> 21% → Aire normal\n\nLÍMITES DE INFLAMABILIDAD:\nLFL: 1% en volumen · UFL: 10% en volumen\nO₂ < 8% garantiza que la mezcla no pueda inflamarse.",
      p3:"PARTE 3 — OPERACIONES IGS & CICLO DE CARGA",s3t:"Purga · Carga · Descarga · Desgasificación",
      s3:"5 FASES OPERATIVAS:\n1. TANQUE VACÍO: O₂ ≈ 21% → peligroso\n2. PURGA: 21% → < 8% O₂ (4-12h)\n3. CARGA: vapores salen por VRL · IGS mantiene sobrepresión\n4. DESCARGA: riesgo depresión → IGS CRÍTICO\n5. POST-DESCARGA: tanque vacío bajo IG positivo",
      p4:"PARTE 4 — REGLAMENTACIÓN & DOCUMENTACIÓN",s4t:"SOLAS · Procedimientos · Certificados",
      s4:"OBLIGACIONES SOLAS:\n→ IGS obligatorio > 20.000 TPM (SOLAS II-2/4)\n→ Alarma alta O₂ a 8%: paro automático\n→ Analizador O₂ continuo obligatorio\n\nDOCUMENTACIÓN:\n→ Cargo Record Book · IGS Log\n→ Hot Work Permit · Gas Free Certificate\n\nCERTIFICACIÓN: STCW A-V/1-1 · BABT/AATT",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",
      p6:"⚠️ CASO REAL",
      p7:"📝 BANCO — 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN E6 L3",
      sumP:["IGS: Caldera → Depurador → Soplante → Tanques","O₂ < 8% = zona inerte · 11-21% = zona explosiva","Válvula anti-retorno: obligatoria en tuberías IG","Válvula PV: protección automática ±2000 Pa","Purga: 21% → < 8% · Gas-freeing: HC → < 1% LFL","Sobrepresión positiva: impide entrada de aire en descarga","SOLAS II-2/4: IGS obligatorio > 20.000 TPM","MT Betelgeuse 1979 → 50 muertos → IGS obligatorio"],
      learnedP:["Arquitectura IGS: 4 componentes clave","O₂ < 8% = inerte · zonas de explosividad","Ciclo operativo: purga → carga → descarga","Válvula anti-retorno · PV · analizador O₂","SOLAS II-2/4 · MT Betelgeuse → obligación IGS"],
    },
    pt:{
      badge:"⚙️ Módulo e6 — Carga & Petróleo · Lição 3/6 · ⭐ Premium · 200 XP",
      title:"Sistemas de Gás Inerte (IGS) — Segurança & Prevenção de Explosão",
      intro:"Um petroleiro de petróleo bruto não é apenas um risco de poluição — é uma bomba potencial. Os vapores de hidrocarbonetos misturados com ar formam um cocktail explosivo. O sistema IGS é a principal barreira de segurança contra este risco.\n\nEsta lição cobre o funcionamento do IGS, as zonas de explosividade O₂, os procedimentos de inertização e as obrigações SOLAS.",
      p1:"PARTE 1 — ARQUITETURA DO SISTEMA IGS",s1t:"Caldeira → Scrubber → Soprador → Tanques",
      s1:"PRINCÍPIO FUNDAMENTAL:\nManter O₂ < 8% em todos os tanques de carga para tornar a mistura ar/hidrocarbonetos não inflamável.\n\nCOMPONENTES PRINCIPAIS:\n→ Fonte de gás: caldeira principal ou auxiliar\n→ Scrubber: arrefece e lava os gases de exaustão\n→ Soprador: cria sobrepressão positiva nos tanques\n→ Válvula anti-retorno: impede retorno de vapores de carga\n→ Colector IG convés: tubagem de distribuição\n\nESPECIFICAÇÕES GÁS INERTE:\n→ O₂ < 5% (saída scrubber) · T° < 45°C · SO₂ < 2 ppm\n→ Pressão: +50 a +150 mmWC · Caudal: 2.000-8.000 m³/h",
      p2:"PARTE 2 — ZONAS DE EXPLOSIVIDADE O₂",s2t:"Triângulo do fogo · Limites de inflamabilidade",
      s2:"TRIÂNGULO DO FOGO:\nCombustível + Comburente (O₂) + Fonte de ignição = EXPLOSÃO\nO IGS elimina o comburente → o fogo é impossível\n\nZONAS DE O₂:\n< 2% → Zona asfixiante\n2-8% → ZONA INERTE ✅\n8-11% → Zona crítica\n11-21% → Zona inflamável 🔥\n> 21% → Ar normal\n\nLIMITES DE INFLAMABILIDADE:\nLFL: 1% em volume · UFL: 10% em volume\nO₂ < 8% garante que a mistura não pode inflamar.",
      p3:"PARTE 3 — OPERAÇÕES IGS & CICLO DE CARGA",s3t:"Purga · Carregamento · Descarga · Desgasificação",
      s3:"5 FASES OPERACIONAIS:\n1. TANQUE VAZIO: O₂ ≈ 21% → perigoso\n2. PURGA: 21% → < 8% O₂ (4-12h)\n3. CARREGAMENTO: vapores saem pela VRL · IGS mantém sobrepressão\n4. DESCARGA: risco vácuo → IGS CRÍTICO\n5. PÓS-DESCARGA: tanque vazio sob IG positivo",
      p4:"PARTE 4 — REGULAMENTAÇÃO & DOCUMENTAÇÃO",s4t:"SOLAS · Procedimentos · Certificados",
      s4:"OBRIGAÇÕES SOLAS:\n→ IGS obrigatório > 20.000 TPB (SOLAS II-2/4)\n→ Alarme alto O₂ a 8%: desligamento automático\n→ Analisador O₂ contínuo obrigatório\n\nDOCUMENTAÇÃO:\n→ Cargo Record Book · IGS Log\n→ Hot Work Permit · Gas Free Certificate\n\nCERTIFICAÇÃO: STCW A-V/1-1 · BABT/AATT",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",
      p6:"⚠️ CASO REAL",
      p7:"📝 BANCO — 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO E6 L3",
      sumP:["IGS: Caldeira → Scrubber → Soprador → Tanques","O₂ < 8% = zona inerte · 11-21% = zona explosiva","Válvula anti-retorno: obrigatória nas tubagens IG","Válvula PV: proteção automática ±2000 Pa","Purga: 21% → < 8% · Gas-freeing: HC → < 1% LFL","Sobrepressão positiva: impede entrada de ar na descarga","SOLAS II-2/4: IGS obrigatório > 20.000 TPB","MT Betelgeuse 1979 → 50 mortos → IGS obrigatório"],
      learnedP:["Arquitetura IGS: 4 componentes chave","O₂ < 8% = inerte · zonas de explosividade","Ciclo operacional: purga → carregamento → descarga","Válvula anti-retorno · PV · analisador O₂","SOLAS II-2/4 · MT Betelgeuse → obrigação IGS"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.orange}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.orange,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* SCROLL CONTENT */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🔥" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🔥 {lang==="fr"?"SCHÉMA IGS — INTERACTIF":lang==="en"?"IGS SCHEMATIC — INTERACTIVE":lang==="es"?"ESQUEMA IGS — INTERACTIVO":"ESQUEMA IGS — INTERATIVO"}
              </div>
              <IGSSchematicSVG lang={lang}/>
            </Card>

            <SL icon="💨" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                💨 {lang==="fr"?"ATMOSPHÈRE CITERNE O₂ — INTERACTIF":lang==="en"?"TANK ATMOSPHERE O₂ — INTERACTIVE":lang==="es"?"ATMÓSFERA TANQUE O₂ — INTERACTIVO":"ATMOSFERA TANQUE O₂ — INTERATIVO"}
              </div>
              <O2AtmosphereSVG lang={lang}/>
            </Card>

            <SL icon="🔄" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🔄 {lang==="fr"?"CYCLE IGS — 5 PHASES INTERACTIVES":lang==="en"?"IGS CYCLE — 5 INTERACTIVE PHASES":lang==="es"?"CICLO IGS — 5 FASES INTERACTIVAS":"CICLO IGS — 5 FASES INTERATIVAS"}
              </div>
              <IGSCyclesSVG lang={lang}/>
            </Card>

            <SL icon="🚨" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}33`}}>
              <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>
                🚨 {lang==="fr"?"COMPOSANTS SÉCURITÉ — INTERACTIF":lang==="en"?"SAFETY COMPONENTS — INTERACTIVE":lang==="es"?"COMPONENTES SEGURIDAD — INTERACTIVO":"COMPONENTES SEGURANÇA — INTERATIVO"}
              </div>
              <IGSAlarmsSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <Exercise1 lang={lang} t={t}/>
            </Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}>
              <QuestionBank lang={lang}/>
            </Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.orange,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>

            <button onClick={()=>setPhase("quiz")}
              style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(230,126,34,0.4)",marginTop:8}}>
              {t.startQuiz}
            </button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Systèmes IGS":lang==="en"?"Quiz — IGS Systems":lang==="es"?"Quiz — Sistemas IGS":"Quiz — Sistemas IGS"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"questões"} · {lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
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
                <div style={{height:"100%",width:`${quizScore/5*100}%`,background:`linear-gradient(90deg,${C.orange},${trophy.color})`,borderRadius:8,transition:"width 0.8s ease"}}/>
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.orange,fontWeight:700}}>
                +{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.orange,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>
            <button onClick={onComplete}
              style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — COW →":lang==="en"?"LESSON 4 — COW →":lang==="es"?"LECCIÓN 4 — COW →":"LIÇÃO 4 — COW →"}
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
