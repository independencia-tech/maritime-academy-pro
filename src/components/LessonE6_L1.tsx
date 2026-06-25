import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
  cargo:"#e8b94f", pump:"#4da6ff", pipe:"#6dbf8a",
  pressure:"#c084fc", red:"#c0392b", green:"#1e8a4a",
  orange:"#e67e22", teal:"#0a8a6c",
};

const T: any = {
  fr:{ back:"◀ Retour", module:"Module Machine · Cargaison", xp:"XP gagnés",
    correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:",
    next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ",
    complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD",
    youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz",
    showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module · Cargo", xp:"XP earned",
    correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:",
    next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ",
    complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD",
    youLearned:"You learned:", readFirst:"Read the content then start the quiz",
    showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas · Carga", xp:"XP ganados",
    correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:",
    next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ",
    complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL",
    youLearned:"Has aprendido:", readFirst:"Lee y luego comienza",
    showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas · Carga", xp:"XP ganhos",
    correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:",
    next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ",
    complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL",
    youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece",
    showCorr:"Ver correção", hideCorr:"Ocultar" },
};

function Card({ children, style={} }: any) {
  return (
    <div style={{background:"rgba(10,22,40,0.85)",borderRadius:16,padding:"14px 16px",
      border:"1px solid rgba(201,146,42,0.18)",...style}}>
      {children}
    </div>
  );
}

function SL({ icon, text, color }: any) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
      borderRadius:12,background:`${color}11`,border:`1px solid ${color}33`,marginBottom:12}}>
      <span style={{fontSize:18}}>{icon}</span>
      <span style={{fontSize:12,fontWeight:700,color,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{text}</span>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 1 — PUMP TYPES (interactive)
// ══════════════════════════════════════
function PumpTypesSVG({ lang }: { lang: string }) {
  const [sel, setSel] = useState("deepwell");

  const labels: any = {
    fr: { deepwell:"Deep well (centrifuge)", stripping:"Pompe stripping (pistons)", ejector:"Éjecteur", submerged:"Submersible électrique" },
    en: { deepwell:"Deep well (centrifugal)", stripping:"Stripping pump (piston)", ejector:"Ejector", submerged:"Electric submersible" },
    es: { deepwell:"Deep well (centrífuga)", stripping:"Bomba stripping (pistones)", ejector:"Eyector", submerged:"Sumergible eléctrica" },
    pt: { deepwell:"Deep well (centrífuga)", stripping:"Bomba stripping (pistões)", ejector:"Ejetor", submerged:"Submersível elétrica" },
  };
  const descs: any = {
    fr: {
      deepwell:"Turbine immergée dans la citerne · Moteur en pont · Entraînement hydraulique (HP oil) · 500–5000 m³/h · Standard VLCC/ULCC",
      stripping:"Pompe volumétrique à pistons · Aspire les fonds de citerne quand la centrifuge cavite · 10–50 m³/h · Aspire mélanges liquide-gaz",
      ejector:"Sans pièces mobiles · Fluide moteur (cargo) crée une dépression · 5–30 m³/h · Stripping final & purge des lignes · Très fiable",
      submerged:"Moteur + pompe totalement immergés · Câbles électriques étanches · 100–500 m³/h · Standard chimiquiers"
    },
    en: {
      deepwell:"Submerged impeller in tank · Deck motor · Hydraulic drive (HP oil) · 500–5000 m³/h · VLCC/ULCC standard",
      stripping:"Positive displacement piston pump · Draws tank bottoms when centrifugal cavitates · 10–50 m³/h · Draws liquid-gas mixtures",
      ejector:"No moving parts · Motive fluid (cargo) creates vacuum · 5–30 m³/h · Final stripping & line purging · Very reliable",
      submerged:"Motor + pump fully submerged · Sealed electric cables · 100–500 m³/h · Chemical tanker standard"
    },
    es: {
      deepwell:"Rodete sumergido en el tanque · Motor en cubierta · Accionamiento hidráulico · 500–5000 m³/h · Estándar VLCC/ULCC",
      stripping:"Bomba volumétrica de pistones · Aspira los fondos cuando la centrífuga cavita · 10–50 m³/h · Aspira mezclas líquido-gas",
      ejector:"Sin piezas móviles · Fluido motor crea depresión · 5–30 m³/h · Stripping final y purga de líneas · Muy fiable",
      submerged:"Motor + bomba totalmente sumergidos · Cables eléctricos estancos · 100–500 m³/h · Estándar quimiqueros"
    },
    pt: {
      deepwell:"Roda submersa no tanque · Motor em convés · Acionamento hidráulico · 500–5000 m³/h · Padrão VLCC/ULCC",
      stripping:"Bomba volumétrica de pistões · Aspira os fundos quando a centrífuga cavita · 10–50 m³/h · Aspira misturas líquido-gás",
      ejector:"Sem peças móveis · Fluido motor cria depressão · 5–30 m³/h · Stripping final e purga de linhas · Muito fiável",
      submerged:"Motor + bomba totalmente submersos · Cabos elétricos estanques · 100–500 m³/h · Padrão quimiqueiros"
    },
  };
  const lbl = labels[lang] || labels.fr;
  const dsc = descs[lang] || descs.fr;
  const cols: any = { deepwell: C.cargo, stripping: C.pipe, ejector: C.pressure, submerged: C.pump };

  const svgContent: any = {
    deepwell: (
      <g>
        <rect x="55" y="15" width="90" height="120" rx="6" fill={C.cargo} opacity={0.08} stroke={C.cargo} strokeWidth="1.5"/>
        <rect x="56" y="55" width="88" height="79" fill={C.pump} opacity={0.07}/>
        <text x="100" y="48" fontSize="7" fill={C.cargo} textAnchor="middle" fontFamily="monospace">CITERNE</text>
        <line x1="100" y1="15" x2="100" y2="125" stroke={C.pump} strokeWidth="3"/>
        <circle cx="100" cy="125" r="14" fill={C.cargo} opacity={0.35} stroke={C.cargo} strokeWidth="1.5"/>
        <text x="100" y="129" fontSize="6" fill={C.white} textAnchor="middle" fontFamily="monospace">ROUE</text>
        <rect x="82" y="5" width="36" height="13" rx="4" fill={C.pump} opacity={0.55} stroke={C.pump} strokeWidth="1.2"/>
        <text x="100" y="14" fontSize="6" fill={C.white} textAnchor="middle" fontFamily="monospace">MOTEUR</text>
        <line x1="55" y1="88" x2="35" y2="88" stroke={C.cargo} strokeWidth="2"/>
        <text x="33" y="86" fontSize="6" fill={C.cargo} textAnchor="end" fontFamily="monospace">→</text>
        <text x="100" y="152" fontSize="8" fill={C.cargo} textAnchor="middle" fontFamily="monospace">DEEP WELL</text>
      </g>
    ),
    stripping: (
      <g>
        <rect x="35" y="45" width="90" height="55" rx="6" fill={C.pipe} opacity={0.12} stroke={C.pipe} strokeWidth="1.5"/>
        <rect x="60" y="55" width="18" height="32" rx="2" fill={C.pipe} opacity={0.5} stroke={C.pipe} strokeWidth="1"/>
        <line x1="69" y1="45" x2="69" y2="30" stroke={C.pipe} strokeWidth="2"/>
        <rect x="60" y="23" width="18" height="10" rx="2" fill={C.pipe} opacity={0.3}/>
        <circle cx="46" cy="72" r="6" fill={C.cargo} opacity={0.6}/>
        <circle cx="115" cy="72" r="6" fill={C.cargo} opacity={0.6}/>
        <line x1="35" y1="72" x2="15" y2="72" stroke={C.pipe} strokeWidth="1.5"/>
        <text x="13" y="70" fontSize="6" fill={C.pipe} textAnchor="end" fontFamily="monospace">IN</text>
        <line x1="125" y1="72" x2="145" y2="72" stroke={C.pipe} strokeWidth="1.5"/>
        <text x="147" y="75" fontSize="6" fill={C.pipe} fontFamily="monospace">OUT</text>
        <text x="80" y="120" fontSize="8" fill={C.pipe} textAnchor="middle" fontFamily="monospace">PISTON PUMP</text>
        <text x="80" y="132" fontSize="6" fill={C.pipe} textAnchor="middle" fontFamily="monospace">(stripping)</text>
      </g>
    ),
    ejector: (
      <g>
        <path d="M15,68 L55,58 L55,78 Z" fill={C.pressure} opacity={0.4} stroke={C.pressure} strokeWidth="1.5"/>
        <rect x="55" y="63" width="35" height="20" rx="4" fill={C.pressure} opacity={0.18} stroke={C.pressure} strokeWidth="1.5"/>
        <path d="M90,63 L135,53 L135,93 L90,83 Z" fill={C.pressure} opacity={0.12} stroke={C.pressure} strokeWidth="1.5"/>
        <line x1="3" y1="68" x2="15" y2="68" stroke={C.pump} strokeWidth="2.5"/>
        <text x="1" y="66" fontSize="6" fill={C.pump} textAnchor="end" fontFamily="monospace">MOTIVE</text>
        <line x1="72" y1="53" x2="72" y2="38" stroke={C.cargo} strokeWidth="1.5"/>
        <text x="72" y="35" fontSize="6" fill={C.cargo} textAnchor="middle" fontFamily="monospace">SUCTION</text>
        <line x1="135" y1="73" x2="155" y2="73" stroke={C.cargo} strokeWidth="2"/>
        <text x="157" y="76" fontSize="6" fill={C.cargo} fontFamily="monospace">OUT</text>
        <text x="80" y="118" fontSize="8" fill={C.pressure} textAnchor="middle" fontFamily="monospace">EJECTOR</text>
        <text x="80" y="130" fontSize="6" fill={C.pressure} textAnchor="middle" fontFamily="monospace">(no moving parts)</text>
      </g>
    ),
    submerged: (
      <g>
        <rect x="55" y="15" width="90" height="120" rx="6" fill={C.pump} opacity={0.08} stroke={C.pump} strokeWidth="1.5"/>
        <rect x="56" y="55" width="88" height="79" fill={C.pump} opacity={0.07}/>
        <text x="100" y="48" fontSize="7" fill={C.pump} textAnchor="middle" fontFamily="monospace">CITERNE</text>
        <rect x="78" y="105" width="44" height="28" rx="4" fill={C.pump} opacity={0.45} stroke={C.pump} strokeWidth="1.5"/>
        <text x="100" y="117" fontSize="6" fill={C.white} textAnchor="middle" fontFamily="monospace">MOTOR</text>
        <text x="100" y="127" fontSize="6" fill={C.white} textAnchor="middle" fontFamily="monospace">+ PUMP</text>
        <line x1="93" y1="105" x2="93" y2="15" stroke={C.gold2} strokeWidth="1.5" strokeDasharray="4,3"/>
        <text x="78" y="65" fontSize="6" fill={C.gold2} textAnchor="end" fontFamily="monospace">CÂBLE</text>
        <line x1="55" y1="80" x2="35" y2="80" stroke={C.pump} strokeWidth="2"/>
        <text x="33" y="78" fontSize="6" fill={C.pump} textAnchor="end" fontFamily="monospace">→</text>
        <text x="100" y="152" fontSize="8" fill={C.pump} textAnchor="middle" fontFamily="monospace">SUBMERSIBLE</text>
      </g>
    ),
  };

  return (
    <div>
      <svg width="200" height="165" viewBox="0 0 200 165" style={{display:"block",margin:"0 auto",background:"rgba(6,14,26,0.8)",borderRadius:10,marginBottom:10}}>
        {svgContent[sel]}
      </svg>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
        {Object.keys(lbl).map(k => (
          <button key={k} onClick={() => setSel(k)} style={{
            flex:1, minWidth:60, padding:"7px 4px", borderRadius:10, fontSize:9,
            cursor:"pointer", textAlign:"center", fontFamily:"monospace",
            background: sel===k ? `${cols[k]}22` : "rgba(255,255,255,0.04)",
            border: `1px solid ${sel===k ? cols[k] : "rgba(255,255,255,0.1)"}`,
            color: sel===k ? cols[k] : "rgba(240,244,255,0.45)",
          }}>{lbl[k]}</button>
        ))}
      </div>
      <div style={{padding:"10px 12px",borderRadius:10,background:`${cols[sel]}11`,border:`1px solid ${cols[sel]}33`,fontSize:12,color:C.white,lineHeight:1.7,fontFamily:"monospace"}}>
        {dsc[sel]}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — CAVITATION / NPSH
// ══════════════════════════════════════
function CavitationSVG({ lang }: { lang: string }) {
  const [level, setLevel] = useState(60);
  const status = level > 40 ? "ok" : level > 20 ? "warn" : "danger";
  const sc = status === "ok" ? C.green : status === "warn" ? C.orange : C.red;
  const cargoY = 130 - level * 0.9;

  const labels: any = {
    fr: { title:"Niveau citerne & NPSH", ok:"✅ NPSHd suffisant — pompe stable", warn:"⚡ NPSHd marginal — réduire le débit", danger:"⚠️ CAVITATION — basculer vers stripping !" },
    en: { title:"Tank level & NPSH", ok:"✅ NPSHa sufficient — stable pump", warn:"⚡ NPSHa marginal — reduce flow", danger:"⚠️ CAVITATION — switch to stripping!" },
    es: { title:"Nivel tanque & NPSH", ok:"✅ NPSHd suficiente — bomba estable", warn:"⚡ NPSHd marginal — reducir caudal", danger:"⚠️ CAVITACIÓN — cambiar a stripping!" },
    pt: { title:"Nível tanque & NPSH", ok:"✅ NPSHd suficiente — bomba estável", warn:"⚡ NPSHd marginal — reduzir caudal", danger:"⚠️ CAVITAÇÃO — mudar para stripping!" },
  };
  const l = labels[lang] || labels.fr;

  return (
    <div>
      <svg width="200" height="165" viewBox="0 0 200 165" style={{display:"block",margin:"0 auto",background:"rgba(6,14,26,0.8)",borderRadius:10,marginBottom:10}}>
        {/* Tank outline */}
        <rect x="40" y="20" width="120" height="120" rx="6" fill="none" stroke="rgba(77,166,255,0.4)" strokeWidth="1.5"/>
        {/* Cargo level */}
        <rect x="41" y={cargoY} width="118" height={130-cargoY} fill={C.cargo} opacity={0.25}/>
        <line x1="41" y1={cargoY} x2="159" y2={cargoY} stroke={C.cargo} strokeWidth="1.5"/>
        <text x="100" y={cargoY-5} fontSize="7" fill={C.cargo} textAnchor="middle" fontFamily="monospace">{level}%</text>
        {/* Pump shaft */}
        <line x1="100" y1="20" x2="100" y2="135" stroke={sc} strokeWidth="2.5" strokeDasharray={status==="danger"?"4,3":"none"}/>
        <circle cx="100" cy="135" r="10" fill={sc} opacity={0.35} stroke={sc} strokeWidth="1.5"/>
        {/* NPSH bar */}
        <rect x="165" y="20" width="12" height="120" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <rect x="165" y={20+(120*(100-level)/100)} width="12" height={120*level/100} rx="4" fill={sc} opacity={0.5}/>
        <text x="171" y="148" fontSize="6" fill={sc} textAnchor="middle" fontFamily="monospace">NPSH</text>
        {/* Danger zone */}
        <rect x="41" y="110" width="118" height="30" fill={C.red} opacity={0.08}/>
        <text x="100" y="128" fontSize="6" fill={C.red} textAnchor="middle" fontFamily="monospace">ZONE CAVITATION</text>
        {/* Discharge line */}
        <line x1="40" y1="75" x2="20" y2="75" stroke={sc} strokeWidth="2"/>
        <text x="18" y="73" fontSize="6" fill={sc} textAnchor="end" fontFamily="monospace">→</text>
      </svg>
      <div style={{marginBottom:8}}>
        <div style={{fontSize:9,color:C.cargo,marginBottom:3,fontWeight:600}}>{lang==="fr"?"Niveau citerne":lang==="en"?"Tank level":lang==="es"?"Nivel tanque":"Nível tanque"}: {level}%</div>
        <input type="range" min={5} max={100} value={level} onChange={e=>setLevel(Number(e.target.value))} style={{width:"100%",accentColor:C.cargo}}/>
      </div>
      <div style={{padding:"8px 12px",borderRadius:10,background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:11,color:sc,textAlign:"center",fontWeight:700}}>
        {l[status as "ok"|"warn"|"danger"]}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — STRIPPING SEQUENCE
// ══════════════════════════════════════
function StrippingSVG({ lang }: { lang: string }) {
  const [step, setStep] = useState(0);
  const steps: any = {
    fr: [
      { label:"Phase 1 — Déchargement principal", desc:"Pompe deep well (centrifuge) en service · Débit 1500–5000 m³/h · Niveau citerne > 30%", color:C.pump },
      { label:"Phase 2 — Pompe stripping", desc:"Niveau < 20–30% · Cavitation détectée (bruit, vibrations) · Basculer sur pompe stripping à pistons · 10–50 m³/h", color:C.pipe },
      { label:"Phase 3 — Éjecteur (stripping final)", desc:"Fonds de citerne (< 30 cm) · Éjecteur activé · Aspire les derniers fonds · 5–30 m³/h · OBQ minimum", color:C.pressure },
      { label:"Phase 4 — Purge des lignes", desc:"Purger les tuyauteries cargo vers le terminal · IGS ou N₂ pour chasser le cargo résiduel · Déconnecter les bras", color:C.gold2 },
    ],
    en: [
      { label:"Phase 1 — Main discharge", desc:"Deep well pump (centrifugal) running · Flow 1500–5000 m³/h · Tank level > 30%", color:C.pump },
      { label:"Phase 2 — Stripping pump", desc:"Level < 20–30% · Cavitation detected (noise, vibration) · Switch to piston stripping pump · 10–50 m³/h", color:C.pipe },
      { label:"Phase 3 — Ejector (final stripping)", desc:"Tank bottoms (< 30 cm) · Ejector activated · Draws last bottoms · 5–30 m³/h · Minimum OBQ", color:C.pressure },
      { label:"Phase 4 — Line purging", desc:"Purge cargo piping to terminal · IGS or N₂ to expel residual cargo · Disconnect arms", color:C.gold2 },
    ],
    es: [
      { label:"Fase 1 — Descarga principal", desc:"Bomba deep well (centrífuga) en servicio · Caudal 1500–5000 m³/h · Nivel tanque > 30%", color:C.pump },
      { label:"Fase 2 — Bomba stripping", desc:"Nivel < 20–30% · Cavitación detectada (ruido, vibraciones) · Cambiar a bomba stripping de pistones · 10–50 m³/h", color:C.pipe },
      { label:"Fase 3 — Eyector (stripping final)", desc:"Fondos de tanque (< 30 cm) · Eyector activado · Aspira los últimos fondos · 5–30 m³/h · OBQ mínimo", color:C.pressure },
      { label:"Fase 4 — Purga de líneas", desc:"Purgar tuberías cargo hacia el terminal · IGS o N₂ para expulsar carga residual · Desconectar brazos", color:C.gold2 },
    ],
    pt: [
      { label:"Fase 1 — Descarga principal", desc:"Bomba deep well (centrífuga) em serviço · Caudal 1500–5000 m³/h · Nível tanque > 30%", color:C.pump },
      { label:"Fase 2 — Bomba stripping", desc:"Nível < 20–30% · Cavitação detetada (ruído, vibrações) · Mudar para bomba stripping de pistões · 10–50 m³/h", color:C.pipe },
      { label:"Fase 3 — Ejetor (stripping final)", desc:"Fundos do tanque (< 30 cm) · Ejetor ativado · Aspira os últimos fundos · 5–30 m³/h · OBQ mínimo", color:C.pressure },
      { label:"Fase 4 — Purga das linhas", desc:"Purgar tubagens cargo para o terminal · IGS ou N₂ para expelir cargo residual · Desligar braços", color:C.gold2 },
    ],
  };
  const list = steps[lang] || steps.fr;
  const cur = list[step];
  const levels = [70, 25, 5, 0];

  return (
    <div>
      <svg width="200" height="120" viewBox="0 0 200 120" style={{display:"block",margin:"0 auto",background:"rgba(6,14,26,0.8)",borderRadius:10,marginBottom:10}}>
        <rect x="20" y="10" width="80" height="95" rx="5" fill="none" stroke="rgba(77,166,255,0.3)" strokeWidth="1.2"/>
        <rect x="21" y={105-levels[step]*0.9} width="78" height={levels[step]*0.9} fill={cur.color} opacity={0.25}/>
        <text x="60" y={105-levels[step]*0.9-4} fontSize="7" fill={cur.color} textAnchor="middle" fontFamily="monospace">{levels[step]}%</text>
        {/* Steps indicator */}
        {[0,1,2,3].map(i => (
          <circle key={i} cx={120+i*18} cy="60" r="7"
            fill={i <= step ? list[i].color : "rgba(255,255,255,0.08)"}
            stroke={list[i].color} strokeWidth="1" opacity={i <= step ? 0.8 : 0.3}/>
        ))}
        {[0,1,2].map(i => (
          <line key={i} x1={127+i*18} y1="60" x2={131+i*18} y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        ))}
        <text x="138" y="95" fontSize="7" fill={cur.color} textAnchor="middle" fontFamily="monospace">{lang==="fr"?`Étape ${step+1}/4`:lang==="en"?`Step ${step+1}/4`:`Paso ${step+1}/4`}</text>
      </svg>
      <div style={{padding:"10px 12px",borderRadius:10,background:`${cur.color}11`,border:`1px solid ${cur.color}33`,marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,color:cur.color,marginBottom:4,fontFamily:"'Cinzel',serif"}}>{cur.label}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,fontFamily:"monospace"}}>{cur.desc}</div>
      </div>
      <div style={{display:"flex",gap:6}}>
        <button disabled={step===0} onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:"8px",borderRadius:10,cursor:step===0?"default":"pointer",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(240,244,255,0.5)",fontSize:12,opacity:step===0?0.3:1}}>◀</button>
        <button disabled={step===3} onClick={()=>setStep(s=>s+1)} style={{flex:1,padding:"8px",borderRadius:10,cursor:step===3?"default":"pointer",background:`${cur.color}22`,border:`1px solid ${cur.color}44`,color:cur.color,fontSize:12,opacity:step===3?0.3:1}}>▶</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — FAULTS & DIAGNOSIS
// ══════════════════════════════════════
function FaultsSVG({ lang }: { lang: string }) {
  const [sel, setSel] = useState<string|null>(null);
  const faults: any = {
    fr: {
      cavitation:{ name:"Cavitation", cause:"Niveau trop bas (NPSHd insuffisant) · filtre aspiration colmaté · débit trop élevé · air dans la ligne", remedy:"Réduire le débit · basculer vers stripping · purger l'air · nettoyer le filtre · arrêt si sévère (roue détruite en heures)" },
      noflow:{ name:"Aucun débit (pompe tourne)", cause:"Air dans la pompe non amorcée · vanne aspiration fermée · citerne vide · arbre brisé", remedy:"Vérifier les vannes · purger l'air · vérifier le niveau · inspecter la pression d'huile hydraulique" },
      overheat:{ name:"Surchauffe moteur / pompe", cause:"Débit trop faible (vanne refoulement trop fermée) · cargo trop visqueux · roulements défaillants", remedy:"Ouvrir la vanne refoulement · vérifier la température cargo · inspecter les roulements · contrôler la ventilation" },
      leak:{ name:"Fuite joint / presse-étoupe", cause:"Usure normale du joint mécanique · vibrations excessives · défaut de garniture", remedy:"Remplacer la garniture mécanique · arrêter la pompe avant toute intervention · consigner la fuite" },
    },
    en: {
      cavitation:{ name:"Cavitation", cause:"Level too low (insufficient NPSHa) · clogged suction filter · flow too high · air in line", remedy:"Reduce flow · switch to stripping · purge air · clean filter · stop if severe (impeller destroyed in hours)" },
      noflow:{ name:"No flow (pump running)", cause:"Air in unprimed pump · suction valve closed · empty tank · broken shaft", remedy:"Check valves · purge air · check level · inspect hydraulic oil pressure" },
      overheat:{ name:"Motor / pump overheating", cause:"Flow too low (discharge valve too closed) · cargo too viscous · defective bearings", remedy:"Open discharge valve · check cargo temperature · inspect bearings · check ventilation" },
      leak:{ name:"Seal / gland leak", cause:"Normal mechanical seal wear · excessive vibrations · packing defect", remedy:"Replace mechanical seal · stop pump before any intervention · log the leak" },
    },
    es: {
      cavitation:{ name:"Cavitación", cause:"Nivel demasiado bajo · filtro taponado · caudal excesivo · aire en la línea", remedy:"Reducir caudal · cambiar a stripping · purgar aire · limpiar filtro · parar si grave" },
      noflow:{ name:"Sin caudal (bomba gira)", cause:"Aire en la bomba · válvula aspiración cerrada · tanque vacío · eje roto", remedy:"Verificar válvulas · purgar aire · verificar nivel · inspeccionar presión aceite hidráulico" },
      overheat:{ name:"Sobrecalentamiento motor/bomba", cause:"Caudal muy bajo · carga muy viscosa · rodamientos defectuosos", remedy:"Abrir válvula descarga · verificar temperatura carga · inspeccionar rodamientos" },
      leak:{ name:"Fuga en cierre mecánico", cause:"Desgaste normal · vibraciones excesivas · defecto de empaquetadura", remedy:"Sustituir cierre mecánico · parar la bomba · registrar la fuga" },
    },
    pt: {
      cavitation:{ name:"Cavitação", cause:"Nível demasiado baixo · filtro entupido · caudal excessivo · ar na linha", remedy:"Reduzir caudal · mudar para stripping · purgar ar · limpar filtro · parar se grave" },
      noflow:{ name:"Sem caudal (bomba gira)", cause:"Ar na bomba · válvula aspiração fechada · tanque vazio · eixo partido", remedy:"Verificar válvulas · purgar ar · verificar nível · inspecionar pressão óleo hidráulico" },
      overheat:{ name:"Sobreaquecimento motor/bomba", cause:"Caudal muito baixo · carga muito viscosa · rolamentos defeituosos", remedy:"Abrir válvula descarga · verificar temperatura carga · inspecionar rolamentos" },
      leak:{ name:"Fuga vedante/gaxeta", cause:"Desgaste normal · vibrações excessivas · defeito de empanque", remedy:"Substituir vedante mecânico · parar bomba · registar a fuga" },
    },
  };
  const f = faults[lang] || faults.fr;
  const fKeys = Object.keys(f);

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
        {fKeys.map(k => (
          <button key={k} onClick={() => setSel(sel===k?null:k)} style={{
            padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"left",
            background: sel===k ? "rgba(192,57,43,0.15)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${sel===k ? C.red : "rgba(255,255,255,0.1)"}`,
          }}>
            <div style={{fontSize:11,fontWeight:700,color:C.white,fontFamily:"monospace"}}>{f[k].name}</div>
          </button>
        ))}
      </div>
      {sel && (
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(192,57,43,0.08)",border:`1px solid ${C.red}33`}}>
          <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:4,fontFamily:"'Cinzel',serif"}}>⚠️ {lang==="fr"?"CAUSE":lang==="en"?"CAUSE":lang==="es"?"CAUSA":"CAUSA"}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,marginBottom:8,fontFamily:"monospace"}}>{f[sel].cause}</div>
          <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:4,fontFamily:"'Cinzel',serif"}}>✅ {lang==="fr"?"REMÈDE":lang==="en"?"REMEDY":lang==="es"?"REMEDIO":"REMÉDIO"}</div>
          <div style={{fontSize:11,color:C.white,lineHeight:1.6,fontFamily:"monospace"}}>{f[sel].remedy}</div>
        </div>
      )}
      {!sel && <div style={{textAlign:"center",fontSize:11,color:C.muted,padding:12,fontFamily:"monospace"}}>{lang==="fr"?"👆 Tapez un défaut":"👆 Tap a fault"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE 1
// ══════════════════════════════════════
function Exercise1({ lang, t }: any) {
  const [ans, setAns] = useState({ q1:"", q2:"", q3:"" });
  const [showC, setShowC] = useState(false);
  const qs: any = {
    fr:[
      { id:"q1", q:"Quel type de pompe utilise-t-on pour le déchargement principal sur un VLCC ?\n(Répondre : deep well, stripping, éjecteur ou submersible)" },
      { id:"q2", q:"Que se passe-t-il si le NPSHd devient inférieur au NPSHr ?\n(Répondre : cavitation, surpression ou débit maximal)" },
      { id:"q3", q:"Quelle est la séquence correcte de stripping ?\n(Répondre : 1=deep well, 2=pistons, 3=éjecteur)" },
    ],
    en:[
      { id:"q1", q:"What pump type is used for main discharge on a VLCC?\n(Answer: deep well, stripping, ejector or submersible)" },
      { id:"q2", q:"What happens if NPSHa drops below NPSHr?\n(Answer: cavitation, overpressure or max flow)" },
      { id:"q3", q:"What is the correct stripping sequence?\n(Answer: 1=deep well, 2=piston, 3=ejector)" },
    ],
    es:[
      { id:"q1", q:"¿Qué tipo de bomba se usa para la descarga principal en un VLCC?\n(Responder: deep well, stripping, eyector o sumergible)" },
      { id:"q2", q:"¿Qué ocurre si el NPSHd cae por debajo del NPSHr?\n(Responder: cavitación, sobrepresión o caudal máximo)" },
      { id:"q3", q:"¿Cuál es la secuencia correcta de stripping?\n(Responder: 1=deep well, 2=pistones, 3=eyector)" },
    ],
    pt:[
      { id:"q1", q:"Que tipo de bomba se usa para a descarga principal num VLCC?\n(Responder: deep well, stripping, ejetor ou submersível)" },
      { id:"q2", q:"O que acontece se NPSHd cai abaixo do NPSHr?\n(Responder: cavitação, sobrepressão ou caudal máximo)" },
      { id:"q3", q:"Qual é a sequência correta de stripping?\n(Responder: 1=deep well, 2=pistões, 3=ejetor)" },
    ],
  };
  const list = qs[lang] || qs.fr;
  const chk = (id: string, val: string) => {
    const v = val.trim().toLowerCase();
    if (id==="q1") return v.includes("deep") || v.includes("well") || v.includes("centrifuge") || v.includes("centrifugal");
    if (id==="q2") return v.includes("cavit");
    if (id==="q3") return v.includes("deep") || v==="1" || v.includes("correct");
    return false;
  };
  const answers: any = {
    fr:"✅ Q1: Deep well (centrifuge verticale)\n✅ Q2: Cavitation — bulles de vapeur imploses sur les pales\n✅ Q3: 1=deep well → 2=pompe pistons → 3=éjecteur",
    en:"✅ Q1: Deep well (vertical centrifugal)\n✅ Q2: Cavitation — vapour bubbles implode on vanes\n✅ Q3: 1=deep well → 2=piston pump → 3=ejector",
    es:"✅ Q1: Deep well (centrífuga vertical)\n✅ Q2: Cavitación — burbujas de vapor implotan en las paletas\n✅ Q3: 1=deep well → 2=bomba pistones → 3=eyector",
    pt:"✅ Q1: Deep well (centrífuga vertical)\n✅ Q2: Cavitação — bolhas de vapor implodem nas palhetas\n✅ Q3: 1=deep well → 2=bomba pistões → 3=ejetor",
  };

  return (
    <div>
      <div style={{padding:"8px 12px",borderRadius:10,background:`${C.cargo}11`,border:`1px solid ${C.cargo}33`,fontSize:11,color:C.gold2,lineHeight:1.6,marginBottom:12}}>
        {lang==="fr"?"💡 Rappels : Deep well = haute pression · NPSHd < NPSHr = cavitation · Séquence = centrifuge → pistons → éjecteur"
        :lang==="en"?"💡 Reminders: Deep well = high flow · NPSHa < NPSHr = cavitation · Sequence = centrifugal → piston → ejector"
        :lang==="es"?"💡 Recordatorios: Deep well = alto caudal · NPSHd < NPSHr = cavitación · Secuencia = centrífuga → pistones → eyector"
        :"💡 Lembretes: Deep well = alto caudal · NPSHd < NPSHr = cavitação · Sequência = centrífuga → pistões → ejetor"}
      </div>
      {list.map((q: any, i: number) => (
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={(ans as any)[q.id]} onChange={e=>setAns((a: any)=>({...a,[q.id]:e.target.value}))}
            placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(chk(q.id,(ans as any)[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:16,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC && <div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,(ans as any)[q.id])?C.green:C.red}}>
            {chk(q.id,(ans as any)[q.id])?"✓":"✗"}
          </div>}
        </div>
      ))}
      {showC && <div style={{padding:"12px",borderRadius:12,background:`${C.green}10`,border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.8,marginBottom:10,whiteSpace:"pre-line",fontFamily:"monospace"}}>{answers[lang]||answers.fr}</div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,
        background:showC?`${C.green}20`:`${C.gold}18`,border:`1px solid ${showC?C.green:C.gold}44`,
        color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC ? t.hideCorr : t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — Prestige (2002)
// ══════════════════════════════════════
function AccidentCase({ lang }: { lang: string }) {
  const [exp, setExp] = useState(false);
  const d: any = {
    fr:{
      title:"MV Prestige — Au large de la Galice, Espagne (2002)",
      teaser:"Pétrolier · Rupture de coque · 77 000 t de fuel · Catastrophe écologique",
      what:"Le pétrolier Prestige (monocoque, 26 ans), transportant 77 000 tonnes de fioul lourd, est victime d'une avarie de structure en pleine tempête à 50 km des côtes galiciennes. Le navire se brise en deux et coule, déversant sa cargaison. La marée noire dévaste 2 800 km de côtes espagnoles et françaises.",
      cause:"• Structure fatiguée — navire monocoque de 26 ans hors d'âge\n• Décision controversée des autorités d'éloigner le navire au lieu de le remorquer au port\n• Pompes cargo hors service lors de la rupture — impossibilité de transvaser\n• Absence de plan d'urgence clair entre Espagne, Portugal et France\n• Le fuel lourd (No. 6 fuel) très visqueux — aggravation écologique",
      lessons:"✓ Interdiction des pétroliers monocoques (UE, 2003) → double coque obligatoire\n✓ Renforcement des inspections PSC (Paris MoU) des vieux pétroliers\n✓ Création de lieux de refuge (Places of Refuge) dans les États membres UE\n✓ Amélioration des plans POLMAR et réponse aux catastrophes pétrolières\n✓ Révision de la convention MARPOL Annexe I",
      link:"🔗 Lien e6 Pompes cargo : L'impossibilité de transvaser le cargo lors de la rupture (pompes hors service) a aggravé le sinistre. Des pompes cargo opérationnelles permettent les transbordements d'urgence pour alléger un navire en détresse.",
    },
    en:{
      title:"MV Prestige — Off Galicia, Spain (2002)",
      teaser:"Tanker · Hull fracture · 77,000 t of fuel oil · Ecological disaster",
      what:"The Prestige tanker (single hull, 26 years old), carrying 77,000 tonnes of heavy fuel oil, suffers structural failure in a storm 50 km off the Galician coast. The vessel breaks in two and sinks, spilling its cargo. The oil spill devastates 2,800 km of Spanish and French coastline.",
      cause:"• Fatigued structure — aged 26-year-old single-hull vessel\n• Controversial decision by authorities to tow vessel away rather than to port\n• Cargo pumps out of service at time of fracture — impossible to transfer cargo\n• Absence of clear emergency plan between Spain, Portugal and France\n• Heavy fuel oil (No. 6 fuel) very viscous — aggravated ecological damage",
      lessons:"✓ Ban on single-hull tankers (EU, 2003) → double hull mandatory\n✓ Strengthened PSC inspections (Paris MoU) of aging tankers\n✓ Creation of Places of Refuge in EU member states\n✓ Improved POLMAR plans and oil spill response\n✓ Revision of MARPOL Convention Annex I",
      link:"🔗 e6 Cargo pumps link: The impossibility of transferring cargo during the fracture (pumps out of service) worsened the disaster. Operational cargo pumps allow emergency transshipment to lighten a vessel in distress.",
    },
    es:{
      title:"MV Prestige — Frente a Galicia, España (2002)",
      teaser:"Petrolero · Fractura de casco · 77 000 t de fuel · Catástrofe ecológica",
      what:"El petrolero Prestige (monocasco, 26 años), con 77 000 t de fueloil pesado, sufre una avería estructural durante una tempestad a 50 km de las costas gallegas. El buque se parte en dos y se hunde, derramando su carga. La marea negra devasta 2 800 km de costas españolas y francesas.",
      cause:"• Estructura fatigada — monocasco de 26 años fuera de vida útil\n• Decisión controvertida de alejar el buque en lugar de remolcarlo a puerto\n• Bombas de carga fuera de servicio en el momento de la fractura\n• Ausencia de plan de emergencia claro entre España, Portugal y Francia\n• El fuel pesado (No. 6) muy viscoso — agravó el daño ecológico",
      lessons:"✓ Prohibición de petroleros monocasco (UE, 2003) → doble casco obligatorio\n✓ Refuerzo de las inspecciones PSC de petroleros viejos\n✓ Creación de Lugares de Refugio en los Estados miembros UE\n✓ Mejora de los planes POLMAR y respuesta a catástrofes petrolíferas\n✓ Revisión del Convenio MARPOL Anexo I",
      link:"🔗 Enlace e6 Bombas cargo: La imposibilidad de transvasar la carga en el momento de la fractura (bombas fuera de servicio) agravó el siniestro. Las bombas de carga operativas permiten el transbordo de emergencia para aligerar un buque en peligro.",
    },
    pt:{
      title:"MV Prestige — Ao largo da Galiza, Espanha (2002)",
      teaser:"Petroleiro · Fratura do casco · 77 000 t de fuel · Catástrofe ecológica",
      what:"O petroleiro Prestige (monocasco, 26 anos), com 77 000 t de fuelóleo pesado, sofre avaria estrutural durante uma tempestade a 50 km das costas galegas. O navio parte-se em dois e afunda, derramando a carga. A maré negra devasta 2 800 km de costas espanholas e francesas.",
      cause:"• Estrutura fatigada — monocasco de 26 anos fora de vida útil\n• Decisão controversa de afastar o navio em vez de o rebocar para porto\n• Bombas de carga fora de serviço no momento da fratura\n• Ausência de plano de emergência claro entre Espanha, Portugal e França\n• O fuelóleo pesado (No. 6) muito viscoso — agravou o dano ecológico",
      lessons:"✓ Proibição de petroleiros monocasco (UE, 2003) → duplo casco obrigatório\n✓ Reforço das inspeções PSC de petroleiros velhos\n✓ Criação de Locais de Refúgio nos Estados membros UE\n✓ Melhoria dos planos POLMAR e resposta a catástrofes petrolíferas\n✓ Revisão da Convenção MARPOL Anexo I",
      link:"🔗 Ligação e6 Bombas de carga: A impossibilidade de transferir a carga no momento da fratura (bombas fora de serviço) agravou o sinistro. Bombas de carga operacionais permitem a transferência de emergência para aligeirar um navio em perigo.",
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
          <div style={{padding:"10px 12px",borderRadius:10,background:`${C.gold}10`,border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// QUESTION BANK
// ══════════════════════════════════════
function QuestionBank({ lang }: { lang: string }) {
  const [open, setOpen] = useState<number|null>(null);
  const qs: any = {
    fr:[
      { q:"Quelle est la différence entre une pompe deep well et un éjecteur ?", a:"Deep well : pompe centrifuge immergée, débit élevé (500–5000 m³/h), nécessite un niveau minimum, moteur en pont. Éjecteur : sans pièces mobiles, utilise un fluide moteur sous pression pour aspirer par effet Venturi, débit faible (5–30 m³/h), aspire les fonds jusqu'à quelques cm, très fiable." },
      { q:"Qu'est-ce que le NPSH et pourquoi est-il critique en fin de déchargement ?", a:"NPSH (Net Positive Suction Head) = pression absolue à l'aspiration moins la pression de vapeur du cargo. Si NPSHd < NPSHr → cavitation. En fin de citerne, le niveau bas réduit la hauteur géométrique → NPSHd chute → bulles de vapeur → érosion de la roue en heures." },
      { q:"Quelles sont les étapes de vérification avant démarrage d'une pompe cargo ?", a:"1. Sécurité et communication terminal confirmée. 2. IGS opérationnel. 3. Vanne aspiration citerne ouverte. 4. Tuyauterie purgée d'air. 5. Pression huile hydraulique vérifiée. 6. Alarmes et débitmètre opérationnels. 7. Terminal autorisé. 8. Démarrage progressif (10–15 min)." },
      { q:"Pourquoi l'entraînement hydraulique est-il préféré à l'électrique sur les VLCC ?", a:"L'entraînement hydraulique (circuit huile HP depuis salle des machines) élimine les câbles électriques haute tension sur le pont (zone ATEX). Avantages : sécurité ATEX, vitesse variable (débit modulable par pression d'huile), robustesse en milieu marin." },
      { q:"Que faire si une cavitation est détectée sur la pompe principale en cours de déchargement ?", a:"1. Réduire immédiatement le débit (fermer partiellement la vanne refoulement). 2. Si cavitation persiste : arrêter la pompe principale. 3. Ouvrir la vanne aspiration stripping. 4. Démarrer la pompe stripping à pistons. 5. Surveiller OBQ et débit. Ne jamais continuer en cavitation sévère — roue détruite en heures." },
    ],
    en:[
      { q:"What is the difference between a deep well pump and an ejector?", a:"Deep well: submerged centrifugal pump, high flow (500–5000 m³/h), requires minimum level, deck motor. Ejector: no moving parts, uses pressurised motive fluid to draw by Venturi effect, low flow (5–30 m³/h), draws bottoms to a few cm, very reliable." },
      { q:"What is NPSH and why is it critical at end of discharge?", a:"NPSH (Net Positive Suction Head) = absolute suction pressure minus cargo vapour pressure. If NPSHa < NPSHr → cavitation. At end of tank, low level reduces geometric height → NPSHa drops → vapour bubbles → impeller erosion in hours." },
      { q:"What pre-start checks for a cargo pump?", a:"1. Safety and terminal communication confirmed. 2. IGS operational. 3. Tank suction valve open. 4. Piping purged of air. 5. Hydraulic oil pressure checked. 6. Alarms and flow meter operational. 7. Terminal authorised. 8. Progressive start (10–15 min)." },
      { q:"Why is hydraulic drive preferred over electric on VLCCs?", a:"Hydraulic drive (HP oil circuit from engine room) eliminates high voltage electrical cables on deck (ATEX zone). Advantages: ATEX safety, variable speed (flow adjustable by oil pressure), robustness in marine environment." },
      { q:"What to do if cavitation is detected on the main pump during discharge?", a:"1. Immediately reduce flow (partially close discharge valve). 2. If cavitation persists: stop main pump. 3. Open stripping suction valve. 4. Start piston stripping pump. 5. Monitor OBQ and flow. Never continue in severe cavitation — impeller destroyed in hours." },
    ],
    es:[
      { q:"¿Cuál es la diferencia entre una bomba deep well y un eyector?", a:"Deep well: bomba centrífuga sumergida, gran caudal (500–5000 m³/h), necesita nivel mínimo, motor en cubierta. Eyector: sin piezas móviles, usa fluido motor a presión para aspirar por efecto Venturi, bajo caudal (5–30 m³/h), aspira los fondos hasta pocos cm, muy fiable." },
      { q:"¿Qué es el NPSH y por qué es crítico al final de la descarga?", a:"NPSH = presión absoluta en aspiración menos presión de vapor de la carga. Si NPSHd < NPSHr → cavitación. Al final del tanque, el nivel bajo reduce la altura geométrica → NPSHd cae → burbujas de vapor → erosión del rodete en horas." },
      { q:"¿Qué verificaciones previas al arranque de una bomba de carga?", a:"1. Seguridad y comunicación terminal confirmada. 2. IGS operativo. 3. Válvula aspiración abierta. 4. Tubería purgada de aire. 5. Presión aceite hidráulico verificada. 6. Alarmas y caudalímetro operativos. 7. Terminal autorizado. 8. Arranque progresivo (10–15 min)." },
      { q:"¿Por qué el accionamiento hidráulico es preferible al eléctrico en los VLCC?", a:"El accionamiento hidráulico elimina los cables eléctricos de alta tensión en cubierta (zona ATEX). Ventajas: seguridad ATEX, velocidad variable (caudal modulable por presión de aceite), robustez en entorno marino." },
      { q:"¿Qué hacer si se detecta cavitación en la bomba principal durante la descarga?", a:"1. Reducir inmediatamente el caudal. 2. Si persiste: parar la bomba principal. 3. Abrir válvula aspiración stripping. 4. Arrancar bomba stripping de pistones. 5. Vigilar OBQ y caudal. Nunca continuar con cavitación grave — rodete destruido en horas." },
    ],
    pt:[
      { q:"Qual é a diferença entre uma bomba deep well e um ejetor?", a:"Deep well: bomba centrífuga submersa, grande caudal (500–5000 m³/h), necessita nível mínimo, motor em convés. Ejetor: sem peças móveis, usa fluido motor pressurizado para aspirar por efeito Venturi, baixo caudal (5–30 m³/h), aspira os fundos até poucos cm, muito fiável." },
      { q:"O que é o NPSH e por que é crítico no final da descarga?", a:"NPSH = pressão absoluta na aspiração menos pressão de vapor da carga. Se NPSHd < NPSHr → cavitação. No final do tanque, o nível baixo reduz a altura geométrica → NPSHd cai → bolhas de vapor → erosão da roda em horas." },
      { q:"Que verificações antes do arranque de uma bomba de carga?", a:"1. Segurança e comunicação terminal confirmada. 2. IGS operacional. 3. Válvula aspiração aberta. 4. Tubagem purgada de ar. 5. Pressão óleo hidráulico verificada. 6. Alarmes e caudalímetro operacionais. 7. Terminal autorizado. 8. Arranque progressivo (10–15 min)." },
      { q:"Por que o acionamento hidráulico é preferível ao elétrico nos VLCC?", a:"O acionamento hidráulico elimina os cabos elétricos de alta tensão em convés (zona ATEX). Vantagens: segurança ATEX, velocidade variável (caudal modulável por pressão de óleo), robustez em ambiente marinho." },
      { q:"O que fazer se se detetar cavitação na bomba principal durante a descarga?", a:"1. Reduzir imediatamente o caudal. 2. Se persiste: parar bomba principal. 3. Abrir válvula aspiração stripping. 4. Arrancar bomba stripping de pistões. 5. Vigiar OBQ e caudal. Nunca continuar com cavitação grave — roda destruída em horas." },
    ],
  };
  const list = qs[lang] || qs.fr;
  return (
    <div>
      {list.map((item: any, i: number) => (
        <div key={i} style={{marginBottom:8,borderRadius:12,background:"rgba(10,22,40,0.8)",border:"1px solid rgba(232,185,79,0.15)",overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"12px 14px",background:"none",border:"none",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:10}}>
            <span style={{fontSize:12,color:C.white,fontFamily:"monospace",lineHeight:1.5}}>
              <span style={{color:C.cargo,fontWeight:700,marginRight:6}}>Q{i+1}.</span>{item.q}
            </span>
            <span style={{color:C.cargo,fontSize:14,flexShrink:0}}>{open===i?"▲":"▼"}</span>
          </button>
          {open===i && (
            <div style={{padding:"0 14px 12px",fontSize:12,color:C.white,lineHeight:1.7,fontFamily:"monospace",borderTop:"1px solid rgba(232,185,79,0.1)"}}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ
// ══════════════════════════════════════
const QUIZ: any = {
  fr:[
    { q:"Quel type de pompe est standard pour le déchargement principal sur un pétrolier VLCC ?", opts:["Pompe à pistons","Éjecteur","Pompe centrifuge verticale (deep well)","Pompe submersible électrique"], correct:2, expl:"La pompe centrifuge verticale (deep well) est standard sur les VLCC. Moteur en pont, turbine immergée, entraînement hydraulique. Débit 1500–5000 m³/h. L'éjecteur et la pompe à pistons sont réservés au stripping final." },
    { q:"Que se passe-t-il si le NPSHd est insuffisant ?", opts:["La pression augmente","La pompe chauffe légèrement","Cavitation — bulles de vapeur imploses sur la roue, érosion rapide","Le débit double"], correct:2, expl:"NPSHd insuffisant → pression à l'aspiration tombe sous la pression de vapeur du cargo → formation de bulles de vapeur → implosion violente sur les pales → érosion (cavitation). La roue peut être détruite en quelques heures. Remède : réduire le débit ou basculer vers stripping." },
    { q:"Quelle est la séquence correcte de stripping d'une citerne cargo ?", opts:["Éjecteur → pistons → deep well","Deep well → éjecteur → pistons","Deep well → pistons → éjecteur","Pistons → deep well → éjecteur"], correct:2, expl:"Séquence obligatoire : 1. Pompe deep well pour le déchargement principal (haut débit). 2. Quand cavitation → pompe stripping à pistons (niveau bas). 3. Stripping final avec éjecteur (fonds de citerne). Cette séquence maximise l'assèchement et minimise l'OBQ." },
    { q:"Pourquoi purge-t-on les tuyauteries cargo d'air avant de démarrer la pompe ?", opts:["Pour augmenter la pression","Pour éviter la cavitation et les coups de bélier au démarrage","Pour refroidir la pompe","Pour vérifier l'étanchéité"], correct:1, expl:"L'air dans la tuyauterie provoque une cavitation immédiate au démarrage (la pompe aspire du vide au lieu de cargo) et des coups de bélier dangereux. La procédure consiste à ouvrir un purgeur en haut de la tuyauterie jusqu'à l'apparition du cargo." },
    { q:"Quel est le principal avantage de l'entraînement hydraulique d'une pompe cargo par rapport à l'électrique ?", opts:["Consommation d'énergie réduite","Vitesse de déchargement plus élevée","Sécurité ATEX — pas de câbles électriques haute tension sur le pont","Maintenance plus simple"], correct:2, expl:"Sur un pont de pétrolier (zone ATEX — atmosphère explosible), les câbles électriques haute tension représentent un risque majeur d'explosion. L'entraînement hydraulique utilise un circuit d'huile haute pression sans risque électrique. Autre avantage : la vitesse est variable (réglage du débit par la pression d'huile)." },
  ],
  en:[
    { q:"What pump type is standard for main discharge on a VLCC tanker?", opts:["Piston pump","Ejector","Vertical centrifugal pump (deep well)","Electric submersible pump"], correct:2, expl:"The vertical centrifugal pump (deep well) is standard on VLCCs. Deck motor, submerged impeller, hydraulic drive. Flow 1500–5000 m³/h. Ejector and piston pump are reserved for final stripping." },
    { q:"What happens if NPSHa is insufficient?", opts:["Pressure increases","Pump heats slightly","Cavitation — vapour bubbles implode on impeller, rapid erosion","Flow doubles"], correct:2, expl:"Insufficient NPSHa → suction pressure drops below cargo vapour pressure → vapour bubbles form → violent implosion on vanes → erosion (cavitation). Impeller can be destroyed in hours. Remedy: reduce flow or switch to stripping." },
    { q:"What is the correct cargo tank stripping sequence?", opts:["Ejector → piston → deep well","Deep well → ejector → piston","Deep well → piston → ejector","Piston → deep well → ejector"], correct:2, expl:"Mandatory sequence: 1. Deep well pump for main discharge (high flow). 2. When cavitation → piston stripping pump (low level). 3. Final stripping with ejector (tank bottoms). This sequence maximises draining and minimises OBQ." },
    { q:"Why purge cargo piping of air before starting the pump?", opts:["To increase pressure","To prevent cavitation and water hammer at start","To cool the pump","To check tightness"], correct:1, expl:"Air in piping causes immediate cavitation at start (pump draws vacuum instead of cargo) and dangerous water hammer. Procedure: open a vent at top of piping until cargo appears." },
    { q:"What is the main advantage of hydraulic drive for a cargo pump vs electric?", opts:["Reduced energy consumption","Higher discharge speed","ATEX safety — no high voltage cables on deck","Simpler maintenance"], correct:2, expl:"On a tanker deck (ATEX zone — explosive atmosphere), high voltage electrical cables are a major explosion risk. Hydraulic drive uses a high pressure oil circuit with no electrical risk. Additional advantage: variable speed (flow adjustable by oil pressure)." },
  ],
  es:[
    { q:"¿Qué tipo de bomba es estándar para la descarga principal en un petrolero VLCC?", opts:["Bomba de pistones","Eyector","Bomba centrífuga vertical (deep well)","Bomba sumergible eléctrica"], correct:2, expl:"La bomba centrífuga vertical (deep well) es estándar en los VLCC. Motor en cubierta, rodete sumergido, accionamiento hidráulico. Caudal 1500–5000 m³/h. El eyector y la bomba de pistones son para el stripping final." },
    { q:"¿Qué ocurre si el NPSHd es insuficiente?", opts:["La presión aumenta","La bomba se calienta ligeramente","Cavitación — burbujas de vapor implotan en el rodete, erosión rápida","El caudal se duplica"], correct:2, expl:"NPSHd insuficiente → presión en aspiración cae bajo la presión de vapor → burbujas de vapor → implosión en las paletas → erosión (cavitación). El rodete puede destruirse en horas. Remedio: reducir caudal o cambiar a stripping." },
    { q:"¿Cuál es la secuencia correcta de stripping de un tanque de carga?", opts:["Eyector → pistones → deep well","Deep well → eyector → pistones","Deep well → pistones → eyector","Pistones → deep well → eyector"], correct:2, expl:"Secuencia obligatoria: 1. Bomba deep well (alto caudal). 2. Cuando cavitación → bomba stripping de pistones. 3. Stripping final con eyector (fondos). Maximiza el vaciado y minimiza el OBQ." },
    { q:"¿Por qué se purga el aire de las tuberías cargo antes de arrancar la bomba?", opts:["Para aumentar la presión","Para evitar cavitación y golpes de ariete al arrancar","Para enfriar la bomba","Para verificar la estanqueidad"], correct:1, expl:"El aire en la tubería provoca cavitación inmediata (la bomba aspira vacío) y golpes de ariete. Procedimiento: abrir un purgador en la parte superior hasta que salga carga." },
    { q:"¿Cuál es la principal ventaja del accionamiento hidráulico frente al eléctrico?", opts:["Menor consumo","Mayor velocidad de descarga","Seguridad ATEX — sin cables de alta tensión en cubierta","Mantenimiento más sencillo"], correct:2, expl:"En cubierta de petrolero (zona ATEX), los cables eléctricos de alta tensión son un riesgo mayor de explosión. El accionamiento hidráulico usa aceite a alta presión sin riesgo eléctrico. Ventaja adicional: velocidad variable." },
  ],
  pt:[
    { q:"Que tipo de bomba é padrão para a descarga principal num petroleiro VLCC?", opts:["Bomba de pistões","Ejetor","Bomba centrífuga vertical (deep well)","Bomba submersível elétrica"], correct:2, expl:"A bomba centrífuga vertical (deep well) é padrão nos VLCC. Motor em convés, roda submersa, acionamento hidráulico. Caudal 1500–5000 m³/h. O ejetor e a bomba de pistões são para o stripping final." },
    { q:"O que acontece se o NPSHd é insuficiente?", opts:["A pressão aumenta","A bomba aquece ligeiramente","Cavitação — bolhas de vapor implodem na roda, erosão rápida","O caudal duplica"], correct:2, expl:"NPSHd insuficiente → pressão na aspiração cai abaixo da pressão de vapor → bolhas de vapor → implosão nas palhetas → erosão (cavitação). A roda pode ser destruída em horas. Remédio: reduzir caudal ou mudar para stripping." },
    { q:"Qual é a sequência correta de stripping dum tanque de carga?", opts:["Ejetor → pistões → deep well","Deep well → ejetor → pistões","Deep well → pistões → ejetor","Pistões → deep well → ejetor"], correct:2, expl:"Sequência obrigatória: 1. Bomba deep well (alto caudal). 2. Quando cavitação → bomba stripping de pistões. 3. Stripping final com ejetor (fundos). Maximiza o esvaziamento e minimiza o OBQ." },
    { q:"Por que se purga o ar das tubagens cargo antes de arrancar a bomba?", opts:["Para aumentar a pressão","Para evitar cavitação e golpes de aríete no arranque","Para arrefecer a bomba","Para verificar a estanqueidade"], correct:1, expl:"O ar nas tubagens provoca cavitação imediata (a bomba aspira vácuo) e golpes de aríete perigosos. Procedimento: abrir um purgador em cima da tubagem até aparecer carga." },
    { q:"Qual é a principal vantagem do acionamento hidráulico face ao elétrico?", opts:["Menor consumo","Maior velocidade de descarga","Segurança ATEX — sem cabos de alta tensão em convés","Manutenção mais simples"], correct:2, expl:"Em convés de petroleiro (zona ATEX), os cabos elétricos de alta tensão são um risco maior de explosão. O acionamento hidráulico usa óleo a alta pressão sem risco elétrico. Vantagem adicional: velocidade variável." },
  ],
};

// ══════════════════════════════════════
// QUIZ COMPONENT
// ══════════════════════════════════════
function QuizComp({ questions, t, onComplete }: any) {
  const [cur, setCur] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const optColors = [C.cargo, C.pump, C.pipe, C.pressure];
  const q = questions[cur];
  const isCorrect = selected === q.correct;

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (isCorrect) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (cur + 1 >= questions.length) { onComplete(score + (isCorrect?1:0)); return; }
    setCur(c => c + 1); setSelected(null); setConfirmed(false);
  };

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:11,color:C.muted}}>{t.question} {cur+1} / {questions.length}</div>
        <div style={{fontSize:11,color:C.gold2}}>⭐ {score}</div>
      </div>
      <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginBottom:14}}>
        <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.cargo},${C.gold})`,width:`${(cur/questions.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontSize:13,color:C.white,lineHeight:1.6,marginBottom:14,padding:12,borderRadius:10,background:"rgba(10,22,40,0.8)",border:`1px solid ${C.cargo}22`}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {q.opts.map((opt: string, i: number) => {
          let border = `1px solid ${optColors[i]}44`, bg = `${optColors[i]}11`;
          if (confirmed) {
            if (i === q.correct) { border=`2px solid ${C.green}`; bg=`${C.green}18`; }
            else if (i === selected && !isCorrect) { border=`2px solid ${C.red}`; bg=`${C.red}18`; }
          } else if (selected === i) { border=`2px solid ${optColors[i]}`; bg=`${optColors[i]}22`; }
          return (
            <button key={i} disabled={confirmed} onClick={()=>setSelected(i)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:12,border,background:bg,cursor:confirmed?"default":"pointer",color:C.white,textAlign:"left"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:optColors[i],flexShrink:0}}>{String.fromCharCode(65+i)}</span>
              <span style={{fontSize:12,fontFamily:"monospace",lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>
      {confirmed && (
        <div style={{padding:10,borderRadius:10,marginBottom:12,background:isCorrect?`${C.green}10`:`${C.red}10`,border:`1px solid ${isCorrect?C.green:C.red}44`,fontSize:12,color:C.white,lineHeight:1.6}}>
          <div style={{fontWeight:700,marginBottom:4,color:isCorrect?C.green:C.red}}>{isCorrect?t.correct:t.wrong}</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{t.expl}</div>
          <div style={{fontFamily:"monospace"}}>{q.expl}</div>
        </div>
      )}
      {!confirmed
        ? <button onClick={handleConfirm} disabled={selected===null} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:selected!==null?`linear-gradient(135deg,${C.cargo},${C.gold})`:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:selected!==null?C.navy:C.muted,cursor:selected!==null?"pointer":"default",letterSpacing:1}}>VALIDER</button>
        : <button onClick={handleNext} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.cargo},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.navy,cursor:"pointer",letterSpacing:1}}>{cur+1>=questions.length?t.finish:t.next}</button>
      }
    </div>
  );
}

// ══════════════════════════════════════
// CONTENT DATA
// ══════════════════════════════════════
const getContent = (lang: string) => {
  const d: any = {
    fr:{
      badge:"⚙️ Module Machine · Cargaison e6 · L1 · ⭐ Premium · 200 XP",
      title:"Pompes cargo",
      intro:"Les pompes cargo sont au cœur des opérations de déchargement sur les pétroliers et chimiquiers. Leur performance détermine la durée des escales portuaires. Un mécanicien doit maîtriser leurs types, leurs limites d'exploitation et leur maintenance pour assurer des opérations sûres et efficaces.",
      p1:"PARTIE 1 — TYPES DE POMPES CARGO", s1t:"Deep well · Stripping · Éjecteur · Submersible",
      p2:"PARTIE 2 — NPSH & CAVITATION", s2t:"Niveau citerne & risque de cavitation",
      p3:"PARTIE 3 — SÉQUENCE DE STRIPPING", s3t:"Déchargement principal → Stripping → Éjecteur",
      p4:"PARTIE 4 — DÉFAUTS & DIAGNOSTIC", s4t:"Cavitation · Pas de débit · Surchauffe · Fuites",
      p5:"🎯 EXERCICE PRATIQUE PREMIUM", p6:"⚠️ CAS RÉEL D'ACCIDENT", p7:"📝 BANQUE 5 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON e6 L1 POMPES CARGO",
      sumP:["Deep well centrifuge : déchargement principal (500–5000 m³/h)","Éjecteur : stripping final sans pièces mobiles","NPSHd < NPSHr = cavitation → réduire débit ou basculer stripping","Séquence : deep well → pistons → éjecteur","Entraînement hydraulique = sécurité ATEX sur pont pétrolier","Prestige (2002) : double coque obligatoire après la catastrophe"],
      learnedP:["Types pompes cargo et leurs usages","NPSH et prévention cavitation","Séquence complète de stripping","Sécurité ATEX entraînement hydraulique","Leçons du Prestige → double coque"],
    },
    en:{
      badge:"⚙️ Engine Module · Cargo e6 · L1 · ⭐ Premium · 200 XP",
      title:"Cargo pumps",
      intro:"Cargo pumps are at the heart of discharge operations on tankers and chemical tankers. Their performance determines port stay duration. An engineer must master their types, operating limits and maintenance for safe and efficient operations.",
      p1:"PART 1 — CARGO PUMP TYPES", s1t:"Deep well · Stripping · Ejector · Submersible",
      p2:"PART 2 — NPSH & CAVITATION", s2t:"Tank level & cavitation risk",
      p3:"PART 3 — STRIPPING SEQUENCE", s3t:"Main discharge → Stripping → Ejector",
      p4:"PART 4 — FAULTS & DIAGNOSIS", s4t:"Cavitation · No flow · Overheat · Leaks",
      p5:"🎯 PREMIUM PRACTICE EXERCISE", p6:"⚠️ REAL ACCIDENT CASE", p7:"📝 PREMIUM 5 QUESTION BANK",
      sumT:"SUMMARY — LESSON e6 L1 CARGO PUMPS",
      sumP:["Deep well centrifugal: main discharge (500–5000 m³/h)","Ejector: final stripping with no moving parts","NPSHa < NPSHr = cavitation → reduce flow or switch to stripping","Sequence: deep well → piston → ejector","Hydraulic drive = ATEX safety on tanker deck","Prestige (2002): double hull mandatory after disaster"],
      learnedP:["Cargo pump types and their uses","NPSH and cavitation prevention","Complete stripping sequence","Hydraulic drive ATEX safety","Prestige lessons → double hull"],
    },
    es:{
      badge:"⚙️ Módulo Máquinas · Carga e6 · L1 · ⭐ Premium · 200 XP",
      title:"Bombas de carga",
      intro:"Las bombas de carga son el corazón de las operaciones de descarga en petroleros y quimiqueros. Su rendimiento determina la duración de las escalas portuarias.",
      p1:"PARTE 1 — TIPOS DE BOMBAS DE CARGA", s1t:"Deep well · Stripping · Eyector · Sumergible",
      p2:"PARTE 2 — NPSH & CAVITACIÓN", s2t:"Nivel tanque & riesgo de cavitación",
      p3:"PARTE 3 — SECUENCIA DE STRIPPING", s3t:"Descarga principal → Stripping → Eyector",
      p4:"PARTE 4 — FALLOS & DIAGNÓSTICO", s4t:"Cavitación · Sin caudal · Sobrecalentamiento · Fugas",
      p5:"🎯 EJERCICIO PRÁCTICO PREMIUM", p6:"⚠️ CASO REAL DE ACCIDENTE", p7:"📝 BANCO 5 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN e6 L1 BOMBAS DE CARGA",
      sumP:["Deep well centrífuga: descarga principal (500–5000 m³/h)","Eyector: stripping final sin piezas móviles","NPSHd < NPSHr = cavitación → reducir caudal o cambiar a stripping","Secuencia: deep well → pistones → eyector","Accionamiento hidráulico = seguridad ATEX en cubierta petrolero","Prestige (2002): doble casco obligatorio tras la catástrofe"],
      learnedP:["Tipos bombas cargo y sus usos","NPSH y prevención de cavitación","Secuencia completa de stripping","Seguridad ATEX accionamiento hidráulico","Lecciones del Prestige → doble casco"],
    },
    pt:{
      badge:"⚙️ Módulo Máquinas · Carga e6 · L1 · ⭐ Premium · 200 XP",
      title:"Bombas de carga",
      intro:"As bombas de carga são o coração das operações de descarga em petroleiros e quimiqueiros. O seu desempenho determina a duração das escalas portuárias.",
      p1:"PARTE 1 — TIPOS DE BOMBAS DE CARGA", s1t:"Deep well · Stripping · Ejetor · Submersível",
      p2:"PARTE 2 — NPSH & CAVITAÇÃO", s2t:"Nível tanque & risco de cavitação",
      p3:"PARTE 3 — SEQUÊNCIA DE STRIPPING", s3t:"Descarga principal → Stripping → Ejetor",
      p4:"PARTE 4 — AVARIAS & DIAGNÓSTICO", s4t:"Cavitação · Sem caudal · Sobreaquecimento · Fugas",
      p5:"🎯 EXERCÍCIO PRÁTICO PREMIUM", p6:"⚠️ CASO REAL DE ACIDENTE", p7:"📝 BANCO 5 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO e6 L1 BOMBAS DE CARGA",
      sumP:["Deep well centrífuga: descarga principal (500–5000 m³/h)","Ejetor: stripping final sem peças móveis","NPSHd < NPSHr = cavitação → reduzir caudal ou mudar para stripping","Sequência: deep well → pistões → ejetor","Acionamento hidráulico = segurança ATEX em convés petroleiro","Prestige (2002): duplo casco obrigatório após catástrofe"],
      learnedP:["Tipos bombas cargo e seus usos","NPSH e prevenção de cavitação","Sequência completa de stripping","Segurança ATEX acionamento hidráulico","Lições do Prestige → duplo casco"],
    },
  };
  return d[lang] || d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonE6_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{} }: any) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const progress = phase==="content" ? 15 : phase==="quiz" ? 70 : 100;
  const xp = quizScore >= 5 ? 200 : quizScore >= 4 ? 160 : quizScore >= 3 ? 120 : 80;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      {/* HEADER */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.cargo}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.cargo,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚙️ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>e6 L1 · Pompes cargo</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:`${C.gold}20`,border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.cargo,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.cargo},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* BODY */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content" && <>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:`${C.cargo}15`,border:`1px solid ${C.cargo}44`,fontSize:11,color:C.cargo,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.cargo}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85}}>{lc.intro}</div>
            </Card>

            {/* Section 1 */}
            <SL icon="⚙️" text={lc.p1} color={C.cargo}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>⚙️</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span>
              </div>
              <PumpTypesSVG lang={lang}/>
            </Card>

            {/* Section 2 */}
            <SL icon="💧" text={lc.p2} color={C.pump}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>💧</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span>
              </div>
              <CavitationSVG lang={lang}/>
            </Card>

            {/* Section 3 */}
            <SL icon="🔄" text={lc.p3} color={C.pipe}/>
            <Card style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>🔄</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span>
              </div>
              <StrippingSVG lang={lang}/>
            </Card>

            {/* Section 4 */}
            <SL icon="🔧" text={lc.p4} color={C.pressure}/>
            <Card style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:22}}>🔧</span>
                <span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span>
              </div>
              <FaultsSVG lang={lang}/>
            </Card>

            {/* Exercise */}
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:`linear-gradient(135deg,${C.gold}08,rgba(13,31,60,0.8))`}}>
              <Exercise1 lang={lang} t={t}/>
            </Card>

            {/* Accident Case */}
            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            {/* Question Bank */}
            <SL icon="📝" text={lc.p7} color={C.pressure}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.pressure}44`,background:`linear-gradient(135deg,rgba(192,132,252,0.08),rgba(13,31,60,0.8))`}}>
              <QuestionBank lang={lang}/>
            </Card>

            {/* Summary */}
            <Card style={{marginBottom:14,background:`linear-gradient(135deg,${C.cargo}08,rgba(13,31,60,0.9))`,border:`1px solid ${C.cargo}33`}}>
              <div style={{fontSize:11,color:C.cargo,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt: string, i: number) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                  <span style={{color:C.cargo,fontWeight:700}}>✓</span>{pt}
                </div>
              ))}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.cargo},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",boxShadow:`0 10px 36px ${C.cargo}40`,marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz" && <>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Pompes cargo":lang==="en"?"Quiz — Cargo pumps":lang==="es"?"Quiz — Bombas de carga":"Quiz — Bombas de carga"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · e6 L1</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={(s: number) => { setQuizScore(s); setTimeout(() => setPhase("done"), 1200); }}/>
          </>}

          {phase==="done" && (
            <div style={{paddingTop:10}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:64,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.cargo}15`,border:`1px solid ${C.cargo}55`,fontSize:14,color:C.cargo,fontWeight:700}}>+{xp} {t.xp} ⭐</div>
              </div>
              <Card style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
                {lc.learnedP.map((pt: string, i: number) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.cargo,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>
              <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.cargo},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.navy,cursor:"pointer",marginBottom:10}}>
                {lang==="fr"?"LEÇON 2 — BALLAST →":lang==="en"?"LESSON 2 — BALLAST →":lang==="es"?"LECCIÓN 2 — LASTRE →":"LIÇÃO 2 — LASTRO →"}
              </button>
              <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
