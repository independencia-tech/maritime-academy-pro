// @ts-nocheck
import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  steel:"#455a64", rust:"#8d3b2b", yellow:"#f1c40f",
};

const T = {
  fr:{ back:"◀ Retour", module:"Module Machine", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Engine Module", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Módulo Máquinas", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Módulo Máquinas", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — STABILITY (GM interactive)
// ══════════════════════════════════════
function StabilitySVG({ lang }) {
  const [gm, setGm] = useState(1.5);
  const [cargo, setCargo] = useState(50);
  const [ballast, setBallast] = useState(50);

  // Calculate heel angle based on parameters
  const heel = Math.max(-25, Math.min(25, (cargo - 50) * 0.4 - (gm - 1) * 8));
  const stability = gm > 0.15 ? (gm > 1.0 ? "good" : "ok") : "danger";
  const sc = stability === "good" ? C.green : stability === "ok" ? C.orange : C.red;

  const rad = heel * Math.PI / 180;
  const cx = 145, cy = 115;

  // Ship hull points (rotated)
  const rotate = (x, y, angle) => {
    const r = angle * Math.PI / 180;
    return {
      x: cx + (x - cx) * Math.cos(r) - (y - cy) * Math.sin(r),
      y: cy + (x - cx) * Math.sin(r) + (y - cy) * Math.cos(r),
    };
  };

  const hullPts = [
    {x:85,y:115},{x:90,y:130},{x:145,y:138},{x:200,y:130},{x:205,y:115},
    {x:200,y:110},{x:145,y:108},{x:90,y:110}
  ].map(p => rotate(p.x, p.y, heel));

  const hullPath = hullPts.map((p,i) => `${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  // Superstructure
  const superPts = [
    {x:105,y:108},{x:110,y:90},{x:145,y:86},{x:180,y:90},{x:185,y:108}
  ].map(p => rotate(p.x, p.y, heel));
  const superPath = superPts.map((p,i) => `${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  // G and M points
  const gPoint = rotate(145, 115 - gm * 12, heel);
  const mPoint = rotate(145, 115 - gm * 12 - 15, heel);
  const bPoint = rotate(145, 128, heel);

  return (
    <div>
      <svg width="290" height="195" viewBox="0 0 290 195">
        <rect width="290" height="195" fill="#061020" rx="8"/>
        {/* Water */}
        <rect x="0" y="115" width="290" height="80" fill="rgba(26,111,212,0.18)"/>
        <path d="M0,115 Q72,110 145,115 Q218,120 290,115" fill="none" stroke={C.blue2} strokeWidth="1.2" opacity="0.5"/>
        {/* Waterline label */}
        <text x="8" y="112" fontSize="7" fill={C.blue2} opacity="0.6">
          {lang==="fr"?"Ligne de flottaison":lang==="en"?"Waterline":lang==="es"?"Línea de flotación":"Linha de flutuação"}
        </text>
        {/* Hull */}
        <path d={hullPath} fill="rgba(26,60,120,0.7)" stroke={C.blue2} strokeWidth="1.5"/>
        {/* Superstructure */}
        <path d={superPath} fill="rgba(13,31,60,0.9)" stroke={C.blue2} strokeWidth="1"/>
        {/* Cargo (colored blocks) */}
        {[0,1,2].map(i => {
          const bp = rotate(115 + i*20, 118, heel);
          return <circle key={i} cx={bp.x} cy={bp.y} r={7}
            fill={`rgba(${200-i*30},${100+i*20},0,${0.3+cargo/200})`}
            stroke={C.orange} strokeWidth="0.8" opacity="0.8"/>;
        })}
        {/* G point */}
        <circle cx={gPoint.x} cy={gPoint.y} r={5} fill={sc} opacity="0.9"/>
        <text x={gPoint.x+8} y={gPoint.y+4} fontSize="8" fill={sc} fontWeight="700">G</text>
        {/* M point */}
        <circle cx={mPoint.x} cy={mPoint.y} r={4} fill={C.gold2} opacity="0.8"/>
        <text x={mPoint.x+6} y={mPoint.y+4} fontSize="8" fill={C.gold2} fontWeight="700">M</text>
        {/* GM line */}
        <line x1={gPoint.x} y1={gPoint.y} x2={mPoint.x} y2={mPoint.y}
          stroke={C.gold2} strokeWidth="1.5" strokeDasharray="3,2"/>
        {/* B point */}
        <circle cx={bPoint.x} cy={bPoint.y} r={3} fill={C.blue2} opacity="0.7"/>
        <text x={bPoint.x+5} y={bPoint.y+4} fontSize="7" fill={C.blue2}>B</text>
        {/* Heel indicator */}
        <text x="145" y="20" textAnchor="middle" fontSize="8" fill={sc} fontWeight="700">
          {lang==="fr"?"Gîte":lang==="en"?"Heel":lang==="es"?"Escora":"Escora"}: {Math.abs(heel).toFixed(1)}°{heel > 0 ? (lang==="fr"?" TB":lang==="en"?" STB":lang==="es"?" ER":" EB") : (lang==="fr"?" BB":lang==="en"?" PORT":lang==="es"?" BB":" BB")}
        </text>
        {/* GM display */}
        <rect x="200" y="8" width="82" height="28" rx="5" fill="rgba(0,0,0,0.6)" stroke={sc} strokeWidth="0.8"/>
        <text x="241" y="20" textAnchor="middle" fontSize="7" fill={sc} fontWeight="700">
          GM = {gm.toFixed(2)}m
        </text>
        <text x="241" y="30" textAnchor="middle" fontSize="6.5" fill={C.muted}>
          {stability==="good"?(lang==="fr"?"✅ Stable":lang==="en"?"✅ Stable":lang==="es"?"✅ Estable":"✅ Estável"):stability==="ok"?(lang==="fr"?"⚡ Limite":lang==="en"?"⚡ Marginal":lang==="es"?"⚡ Límite":"⚡ Limite"):(lang==="fr"?"⚠️ DANGER":lang==="en"?"⚠️ DANGER":lang==="es"?"⚠️ PELIGRO":"⚠️ PERIGO")}
        </text>
        {/* Ballast indicator */}
        {ballast > 30 && <rect x="120" y={122 + (100-ballast)*0.12} width="50" height={10+ballast*0.08} rx="2"
          fill="rgba(26,111,212,0.3)" stroke={C.blue2} strokeWidth="0.7" opacity="0.6"/>}
      </svg>

      {/* Controls */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
        {[
          {label:`GM: ${gm.toFixed(1)}m`,val:gm,set:setGm,min:0,max:3,step:0.1,c:sc},
          {label:`${lang==="fr"?"Cargaison":lang==="en"?"Cargo":lang==="es"?"Carga":"Carga"}: ${cargo}%`,val:cargo,set:setCargo,min:0,max:100,c:C.orange},
          {label:`${lang==="fr"?"Ballast":lang==="en"?"Ballast":lang==="es"?"Lastre":"Lastro"}: ${ballast}%`,val:ballast,set:setBallast,min:0,max:100,c:C.blue2},
        ].map((s,i)=>(
          <div key={i}>
            <div style={{fontSize:9,color:s.c,marginBottom:3,fontWeight:600,textAlign:"center"}}>{s.label}</div>
            <input type="range" min={s.min} max={s.max} step={s.step||1} value={s.val}
              onChange={e=>s.set(Number(e.target.value))}
              style={{width:"100%",accentColor:s.c}}/>
          </div>
        ))}
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,
        background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:10,color:sc,textAlign:"center"}}>
        {stability==="good"
          ?(lang==="fr"?"✅ GM positif et suffisant — navire stable":"✅ Positive GM — stable vessel")
          :stability==="ok"
          ?(lang==="fr"?"⚡ GM faible — surveiller la gîte":"⚡ Low GM — monitor heel")
          :(lang==="fr"?"⚠️ GM négatif — RISQUE DE CHAVIREMENT !":"⚠️ Negative GM — CAPSIZING RISK!")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — PLIMSOLL MARKS (interactive)
// ══════════════════════════════════════
function PlimsollSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const [draft, setDraft] = useState(7.5);
  const W = 290, H = 220;

  const marks = [
    { id:"tf", y:42, label:"TF", color:"#ff6b35",
      full:{fr:"Tropical Eau Douce",en:"Tropical Fresh Water",es:"Tropical Agua Dulce",pt:"Tropical Água Doce"},
      desc:{fr:"Eau douce + chaleur tropicale\nEau moins dense → navire s'enfonce plus\nZones tropicales fluviales\nDifférence max avec S : +25mm par 100 t",en:"Fresh water + tropical heat\nWater less dense → vessel sinks deeper\nTropical river zones\nMax difference from S: +25mm per 100t",es:"Agua dulce + calor tropical\nAgua menos densa → buque hunde más\nZonas fluviales tropicales",pt:"Água doce + calor tropical\nÁgua menos densa → navio afunda mais"}},
    { id:"f", y:62, label:"F", color:"#ff8c42",
      full:{fr:"Eau Douce (Fresh Water)",en:"Fresh Water",es:"Agua Dulce",pt:"Água Doce"},
      desc:{fr:"Eau douce = moins dense que l'eau de mer\nNavire s'enfonce plus profondément\nFleuves, ports fluviaux\nDifférence : ~25mm par 100 tonnes",en:"Fresh water = less dense than sea water\nVessel sinks deeper\nRivers, river ports\nDifference: ~25mm per 100 tonnes",es:"Agua dulce = menos densa que agua de mar\nBuque hunde más profundamente\nRíos y puertos fluviales",pt:"Água doce = menos densa que a água do mar\nNavio afunda mais profundamente\nRios e portos fluviais"}},
    { id:"t", y:82, label:"T", color:C.orange,
      full:{fr:"Tropical (Eau de Mer)",en:"Tropical (Sea Water)",es:"Tropical (Agua de Mar)",pt:"Tropical (Água do Mar)"},
      desc:{fr:"Zones tropicales (eaux chaudes)\nEau chaude = légèrement moins dense\nEntre le tropique du Cancer et du Capricorne\nChargerment légèrement supérieur autorisé",en:"Tropical zones (warm waters)\nWarm water = slightly less dense\nBetween Tropic of Cancer and Capricorn\nSlightly higher loading allowed",es:"Zonas tropicales (aguas cálidas)\nAgua caliente = ligeramente menos densa\nEntre los trópicos\nCarga ligeramente superior permitida",pt:"Zonas tropicais (águas quentes)\nÁgua quente = ligeiramente menos densa\nEntre os trópicos"}},
    { id:"s", y:105, label:"S", color:C.blue2,
      full:{fr:"Été (Summer — Eau de Mer)",en:"Summer (Sea Water)",es:"Verano (Agua de Mar)",pt:"Verão (Água do Mar)"},
      desc:{fr:"RÉFÉRENCE PRINCIPALE\nChargement standard en été\nEaux tempérées et tropicales\nLigne de référence du certificat de franc-bord",en:"MAIN REFERENCE\nStandard summer loading\nTemperate and tropical waters\nReference line for freeboard certificate",es:"REFERENCIA PRINCIPAL\nCarga estándar en verano\nAguas templadas y tropicales\nLínea de referencia del certificado de francobordo",pt:"REFERÊNCIA PRINCIPAL\nCarga padrão no verão\nÁguas temperadas e tropicais"}},
    { id:"w", y:125, label:"W", color:C.teal,
      full:{fr:"Hiver (Winter — Eau de Mer)",en:"Winter (Sea Water)",es:"Invierno (Agua de Mar)",pt:"Inverno (Água do Mar)"},
      desc:{fr:"Charge réduite en hiver\nMers agitées → franc-bord plus important\nSécurité accrue contre les paquets de mer\nEn dessous de S : -25mm par 100 t",en:"Reduced load in winter\nRough seas → larger freeboard required\nIncreased safety against shipping seas\nBelow S: -25mm per 100t",es:"Carga reducida en invierno\nMar agitado → mayor francobordo necesario\nMayor seguridad contra las olas",pt:"Carga reduzida no inverno\nMar agitado → maior bordo livre necessário"}},
    { id:"wna", y:145, label:"WNA", color:C.purple,
      full:{fr:"Hiver Atlantique Nord",en:"Winter North Atlantic",es:"Invierno Atlántico Norte",pt:"Inverno Atlântico Norte"},
      desc:{fr:"Zone la plus restrictive\nAtlantique Nord en hiver\nConditions extrêmement difficiles\nChargement minimal autorisé\nS'applique au-delà du 36°N en hiver",en:"Most restrictive zone\nNorth Atlantic in winter\nExtremely difficult conditions\nMinimum loading allowed\nApplies beyond 36°N in winter",es:"Zona más restrictiva\nAtlántico Norte en invierno\nCondiciones extremadamente difíciles\nCarga mínima permitida",pt:"Zona mais restritiva\nAtlântico Norte no inverno\nCondições extremamente difíceis\nCarga mínima permitida"}},
  ];

  const sel_ = sel ? marks.find(m=>m.id===sel) : null;
  const draftY = 42 + (draft - 10) * (145 - 42) / (4 - 10);

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Ship hull */}
        <rect x="80" y="20" width="90" height="170" rx="6"
          fill="rgba(26,60,120,0.4)" stroke={C.blue2} strokeWidth="1.5"/>
        {/* Waterline based on draft */}
        <rect x="0" y={draftY} width={W} height={H-draftY}
          fill="rgba(26,111,212,0.15)" opacity="0.7"/>
        <line x1="0" y1={draftY} x2={W} y2={draftY}
          stroke={C.blue2} strokeWidth="1.5" opacity="0.6"/>
        <text x="5" y={draftY-3} fontSize="7" fill={C.blue2}>
          {lang==="fr"?"Flottaison":lang==="en"?"Waterline":lang==="es"?"Flotación":"Flutuação"} T={draft}m
        </text>
        {/* Circle and line (Plimsoll mark) */}
        <circle cx="125" cy="105" r="22" fill="none" stroke={C.white} strokeWidth="2.5"/>
        <line x1="103" y1="105" x2="147" y2="105" stroke={C.white} strokeWidth="2.5"/>
        {/* Society letters */}
        <text x="115" y="99" fontSize="8" fill={C.white} fontWeight="700">BV</text>
        {/* Deck line */}
        <line x1="80" y1="30" x2="170" y2="30" stroke={C.white} strokeWidth="2"/>
        <text x="175" y="34" fontSize="7" fill={C.white}>
          {lang==="fr"?"Pont":lang==="en"?"Deck":lang==="es"?"Cubierta":"Convés"}
        </text>
        {/* Load lines */}
        {marks.map(m=>(
          <g key={m.id} onClick={()=>setSel(sel===m.id?null:m.id)} style={{cursor:"pointer"}}>
            {/* Line from hull */}
            <line x1="147" y1={m.y} x2="175" y2={m.y}
              stroke={sel===m.id?m.color:C.white} strokeWidth={sel===m.id?2.5:1.5}
              opacity={sel===m.id?1:0.7}/>
            {/* Label */}
            <rect x="176" y={m.y-8} width={m.label.length<=2?22:32} height={16} rx={4}
              fill={sel===m.id?`${m.color}33`:"rgba(0,0,0,0.5)"}
              stroke={sel===m.id?m.color:"rgba(255,255,255,0.2)"}
              strokeWidth={sel===m.id?1.5:0.8}/>
            <text x={m.label.length<=2?187:192} y={m.y+4} textAnchor="middle"
              fontSize={m.label.length<=2?9:7} fill={m.color} fontWeight="700">{m.label}</text>
            {/* Arrow if near waterline */}
            {Math.abs(draftY - m.y) < 8 && (
              <polygon points={`${144},${m.y} ${138},${m.y-4} ${138},${m.y+4}`}
                fill={C.yellow} opacity="0.9"/>
            )}
          </g>
        ))}
        {/* Freeboard label */}
        <line x1="70" y1="30" x2="70" y2={marks[3].y} stroke={C.gold2} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="50" y={55} fontSize="7" fill={C.gold2} textAnchor="middle">
          {lang==="fr"?"Franc-":lang==="en"?"Free-":lang==="es"?"Franco-":"Franco-"}
        </text>
        <text x="50" y={65} fontSize="7" fill={C.gold2} textAnchor="middle">
          {lang==="fr"?"bord":lang==="en"?"board":lang==="es"?"bordo":"bordo"}
        </text>
        {/* Draft label */}
        <line x1="78" y1={draftY} x2="78" y2="170" stroke={C.muted} strokeWidth="1" strokeDasharray="2,2"/>
        <text x="250" y={H-10} fontSize="7" fill={C.muted}>
          {lang==="fr"?"Touche les marques":lang==="en"?"Tap the marks":lang==="es"?"Toca las marcas":"Toque as marcas"}
        </text>
      </svg>

      {/* Draft slider */}
      <div style={{marginTop:8}}>
        <div style={{fontSize:10,color:C.blue2,marginBottom:3,fontWeight:600}}>
          {lang==="fr"?"Tirant d'eau actuel:":lang==="en"?"Current draft:":lang==="es"?"Calado actual:":"Calado atual:"} {draft}m
        </div>
        <input type="range" min={4} max={10} step={0.1} value={draft}
          onChange={e=>setDraft(Number(e.target.value))}
          style={{width:"100%",accentColor:C.blue2}}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted,marginTop:2}}>
          <span>4m (lège)</span><span>7m (normal)</span><span>10m (plein)</span>
        </div>
      </div>

      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,
        background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,
        fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}>
        <div style={{fontWeight:700,color:sel_.color,marginBottom:4,fontSize:12}}>
          {sel_.label} — {sel_.full[lang]||sel_.full.fr}
        </div>
        {sel_.desc[lang]||sel_.desc.fr}
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — FREE SURFACE EFFECT
// ══════════════════════════════════════
function FreeSurfaceSVG({ lang }) {
  const [fill, setFill] = useState(50);
  const [heel, setHeel] = useState(0);
  const W=290, H=175;

  const effect = fill > 0 && fill < 100 ? (fill * (100-fill) / 2500 * 2).toFixed(2) : "0.00";
  const gm_reduction = parseFloat(effect);
  const gm_effective = Math.max(0, 1.5 - gm_reduction).toFixed(2);

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Ship cross section */}
        <path d="M60,155 L70,90 L220,90 L230,155 Q145,165 60,155 Z"
          fill="rgba(26,60,120,0.4)" stroke={C.blue2} strokeWidth="1.5"/>
        {/* Tank */}
        <rect x="95" y="110" width="100" height="40" rx="4"
          fill="rgba(26,111,212,0.08)" stroke={C.teal} strokeWidth="1"/>
        {/* Liquid in tank */}
        {fill > 0 && (
          <rect x="96" y={150 - fill*0.38} width="98" height={fill*0.38} rx="2"
            fill="rgba(26,111,212,0.4)"/>
        )}
        {/* Free surface (liquid surface) */}
        {fill > 0 && fill < 100 && (
          <line x1="96" y1={150 - fill*0.38}
                x2="194" y2={150 - fill*0.38 + heel * 0.3}
            stroke={C.blue2} strokeWidth="2" opacity="0.8">
            <animate attributeName="y1" values={`${150-fill*0.38};${150-fill*0.38+1};${150-fill*0.38}`} dur="2s" repeatCount="indefinite"/>
          </line>
        )}
        {/* G and G' points */}
        <circle cx="145" cy="105" r="5" fill={C.green} opacity="0.9"/>
        <text x="153" y="109" fontSize="7" fill={C.green} fontWeight="700">G</text>
        {gm_reduction > 0 && (
          <>
            <circle cx="145" cy={105 + gm_reduction * 20} r="5" fill={C.red} opacity="0.9"/>
            <text x="153" y={109 + gm_reduction * 20} fontSize="7" fill={C.red} fontWeight="700">G'</text>
            <line x1="145" y1="105" x2="145" y2={105 + gm_reduction * 20}
              stroke={C.red} strokeWidth="1.5" strokeDasharray="3,2"/>
          </>
        )}
        {/* Labels */}
        <text x="145" y="20" textAnchor="middle" fontSize="8" fill={C.teal} fontWeight="700">
          {lang==="fr"?"Effet de carène liquide":lang==="en"?"Free Surface Effect":lang==="es"?"Efecto de superficie libre":"Efeito de superfície livre"}
        </text>
        <rect x="5" y="30" width="120" height="32" rx="5" fill="rgba(0,0,0,0.5)"/>
        <text x="10" y="43" fontSize="7" fill={C.red}>
          ΔGM = -{effect}m
        </text>
        <text x="10" y="55" fontSize="7" fill={C.green}>
          GM eff. = {gm_effective}m
        </text>
        {/* Tank label */}
        <text x="145" y="106" textAnchor="middle" fontSize="7" fill={C.teal} opacity="0.7">
          {lang==="fr"?"Citerne":lang==="en"?"Tank":lang==="es"?"Tanque":"Tanque"} {fill}%
        </text>
      </svg>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        <div>
          <div style={{fontSize:10,color:C.teal,marginBottom:3,fontWeight:600}}>
            {lang==="fr"?"Remplissage citerne:":lang==="en"?"Tank filling:":lang==="es"?"Llenado tanque:":"Enchimento tanque:"} {fill}%
          </div>
          <input type="range" min={0} max={100} value={fill}
            onChange={e=>setFill(Number(e.target.value))}
            style={{width:"100%",accentColor:C.teal}}/>
        </div>
        <div>
          <div style={{fontSize:10,color:C.orange,marginBottom:3,fontWeight:600}}>
            {lang==="fr"?"Gîte simulée:":lang==="en"?"Simulated heel:":lang==="es"?"Escora:":"Adornamento simulado:"} {heel}°
          </div>
          <input type="range" min={-20} max={20} value={heel}
            onChange={e=>setHeel(Number(e.target.value))}
            style={{width:"100%",accentColor:C.orange}}/>
        </div>
      </div>
      <div style={{marginTop:6,padding:"8px 10px",borderRadius:10,
        background:gm_reduction>1?"rgba(192,57,43,0.1)":gm_reduction>0.5?"rgba(230,126,34,0.1)":"rgba(10,138,108,0.1)",
        border:`1px solid ${gm_reduction>1?C.red:gm_reduction>0.5?C.orange:C.teal}33`,
        fontSize:10,color:gm_reduction>1?C.red:gm_reduction>0.5?C.orange:C.teal}}>
        {fill===0||fill===100
          ?(lang==="fr"?"✅ Citerne pleine ou vide = effet nul":"✅ Full or empty tank = zero effect")
          :gm_reduction>1
          ?(lang==="fr"?"⚠️ DANGER — Effet de carène liquide critique !":"⚠️ DANGER — Critical free surface effect!")
          :gm_reduction>0.5
          ?(lang==="fr"?"⚡ Effet significatif — Remplir ou vider la citerne":"⚡ Significant effect — Fill or empty the tank")
          :(lang==="fr"?"✅ Effet modéré — acceptable":"✅ Moderate effect — acceptable")}
      </div>
      <div style={{marginTop:6,fontSize:10,color:C.muted,lineHeight:1.5}}>
        {lang==="fr"?"💡 Solution : remplir entièrement ou vider entièrement les citernes. Une citerne à moitié pleine est PIRE qu'une citerne vide pour la stabilité."
        :lang==="en"?"💡 Solution: fill tanks completely or empty them completely. A half-full tank is WORSE than an empty tank for stability."
        :lang==="es"?"💡 Solución: llenar completamente o vaciar completamente los tanques. Un tanque a la mitad es PEOR que uno vacío para la estabilidad."
        :"💡 Solução: encher completamente ou esvaziar completamente os tanques. Um tanque meio cheio é PIOR que um tanque vazio para a estabilidade."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — TRIM (Assiette)
// ══════════════════════════════════════
function TrimSVG({ lang }) {
  const [trimVal, setTrimVal] = useState(0);
  const [fwd, setFwd] = useState(6.5);
  const [aft, setAft] = useState(6.5);

  const trim = (aft - fwd).toFixed(2);
  const trimStatus = Math.abs(parseFloat(trim)) < 0.5 ? "ok" : Math.abs(parseFloat(trim)) < 1.5 ? "warn" : "danger";
  const sc = trimStatus==="ok"?C.green:trimStatus==="warn"?C.orange:C.red;

  const W=290, H=130;
  const angle = parseFloat(trim) * 3;

  const rotate=(x,y,a)=>{
    const cx=145,cy=90,r=a*Math.PI/180;
    return{x:cx+(x-cx)*Math.cos(r)-(y-cy)*Math.sin(r),y:cy+(x-cx)*Math.sin(r)+(y-cy)*Math.cos(r)};
  };

  const hullPts=[{x:30,y:95},{x:40,y:105},{x:145,y:110},{x:250,y:105},{x:260,y:95},{x:250,y:88},{x:145,y:86},{x:40,y:88}].map(p=>rotate(p.x,p.y,angle));
  const bridgePts=[{x:190,y:86},{x:195,y:72},{x:220,y:70},{x:225,y:86}].map(p=>rotate(p.x,p.y,angle));

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {/* Water */}
        <rect x="0" y="95" width={W} height="35" fill="rgba(26,111,212,0.15)"/>
        <path d="M0,95 Q72,91 145,95 Q218,99 290,95" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
        {/* Hull */}
        <path d={hullPts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")+" Z"}
          fill="rgba(26,60,120,0.5)" stroke={C.steel} strokeWidth="1.5"/>
        <path d={bridgePts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")+" Z"}
          fill="rgba(13,31,60,0.8)" stroke={C.blue2} strokeWidth="1"/>
        {/* Draft marks */}
        {[{x:42,label:`FWD\n${fwd}m`},{x:248,label:`AFT\n${aft}m`}].map((m,i)=>{
          const pt=rotate(m.x,92+2,angle);
          return(
            <g key={i}>
              <text x={pt.x} y={pt.y} textAnchor="middle" fontSize="7" fill={C.gold2} fontWeight="700">
                {m.label.split('\n')[0]}
              </text>
              <text x={pt.x} y={pt.y+10} textAnchor="middle" fontSize="7" fill={sc}>
                {m.label.split('\n')[1]}
              </text>
            </g>
          );
        })}
        {/* Trim label */}
        <rect x="90" y="5" width="110" height="20" rx="5" fill="rgba(0,0,0,0.6)" stroke={sc} strokeWidth="0.8"/>
        <text x="145" y="19" textAnchor="middle" fontSize="8" fill={sc} fontWeight="700">
          {lang==="fr"?"Assiette":"Trim"}: {trim>0?"+":""}{trim}m {parseFloat(trim)>0?(lang==="fr"?"(Piquée)":"(By stern)"):(parseFloat(trim)<0?(lang==="fr"?"(Appuyée)":"(By head)"):"✅")}
        </text>
      </svg>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[
          {label:`${lang==="fr"?"Tirant AV (avant):":lang==="en"?"Fwd draft:":lang==="es"?"Calado proa:":"Calado à vante:"} ${fwd}m`,val:fwd,set:setFwd,c:C.blue2},
          {label:`${lang==="fr"?"Tirant AR (arrière):":lang==="en"?"Aft draft:":lang==="es"?"Calado popa:":"Calado à ré:"} ${aft}m`,val:aft,set:setAft,c:C.orange},
        ].map((s,i)=>(
          <div key={i}>
            <div style={{fontSize:9,color:s.c,marginBottom:3,fontWeight:600}}>{s.label}</div>
            <input type="range" min={4} max={12} step={0.1} value={s.val}
              onChange={e=>s.set(Number(e.target.value))} style={{width:"100%",accentColor:s.c}}/>
          </div>
        ))}
      </div>
      <div style={{marginTop:6,padding:"7px 10px",borderRadius:10,background:`${sc}12`,border:`1px solid ${sc}33`,fontSize:10,color:sc}}>
        {trimStatus==="ok"?(lang==="fr"?"✅ Assiette correcte (< 0,5m)":"✅ Good trim (< 0.5m)")
        :trimStatus==="warn"?(lang==="fr"?"⚡ Assiette notable — vérifier":"⚡ Notable trim — check")
        :(lang==="fr"?"⚠️ Assiette excessive — corriger avec ballasts !":"⚠️ Excessive trim — correct with ballasts!")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"MV Herald of Free Enterprise — Zeebrugge (1987)",teaser:"Ferry · Porte de proue ouverte · Gîte rapide · 193 morts",what:"Le ferry Herald of Free Enterprise quitte Zeebrugge avec la porte de proue (bow door) ouverte. L'eau envahit le pont des voitures à grande vitesse. Le navire gîte à 90° et coule en 90 secondes. 193 morts sur 539 personnes à bord.",cause:"• Porte de proue non fermée par le matelot responsable (endormi)\n• Aucune indication sur la passerelle de l'état des portes\n• Culture de sécurité insuffisante — pression commerciale\n• Procédure de vérification inexistante\n• Le capitaine a quitte le port sans confirmation de fermeture",lessons:"✓ Indicateurs de portes obligatoires sur toutes les passerelles (SOLAS)\n✓ Check-list de départ systématique (procédures ISM)\n✓ Culture de sécurité : n'importe qui peut arrêter le départ\n✓ Résultat : SOLAS révisé · Code ISM créé · STCW renforcé\n✓ P&O Ferries condamné · Capitaine condamné",link:"🔗 Lien L3 Stabilité : Le libre accès d'eau sur le pont des voitures (pont ouvert) détruit immédiatement la stabilité. L'effet de carène liquide massif + compartimentage insuffisant = naufrage en 90 secondes."},
    en:{title:"MV Herald of Free Enterprise — Zeebrugge (1987)",teaser:"Ferry · Bow door open · Rapid capsizing · 193 deaths",what:"The ferry Herald of Free Enterprise leaves Zeebrugge with the bow door open. Water floods the car deck at high speed. The vessel heels to 90° and sinks in 90 seconds. 193 deaths among 539 people on board.",cause:"• Bow door not closed by the responsible seaman (asleep)\n• No bridge indicator of door status\n• Insufficient safety culture — commercial pressure\n• No departure check procedure\n• Captain departed without closing confirmation",lessons:"✓ Door indicators mandatory on all bridges (SOLAS)\n✓ Systematic departure checklist (ISM procedures)\n✓ Safety culture: anyone can stop the departure\n✓ Result: SOLAS revised · ISM Code created · STCW strengthened\n✓ P&O Ferries convicted · Captain convicted",link:"🔗 L3 Stability Link: Free flooding of the car deck (open deck) immediately destroys stability. Massive free surface effect + insufficient compartmentalization = capsizing in 90 seconds."},
    es:{title:"MV Herald of Free Enterprise — Zeebrugge (1987)",teaser:"Ferry · Puerta de proa abierta · Escora rápida · 193 muertos",what:"El ferry Herald of Free Enterprise sale de Zeebrugge con la puerta de proa abierta. El agua inunda la cubierta de coches a gran velocidad. El buque escora 90° y se hunde en 90 segundos. 193 muertos.",cause:"• Puerta de proa no cerrada por el marinero responsable (dormido)\n• Sin indicador en el puente del estado de las puertas\n• Cultura de seguridad insuficiente — presión comercial\n• Sin procedimiento de verificación de salida",lessons:"✓ Indicadores de puertas obligatorios en todos los puentes (SOLAS)\n✓ Lista de verificación de salida sistemática (ISM)\n✓ Cultura de seguridad: cualquiera puede detener la salida\n✓ Resultado: SOLAS revisado · Código ISM creado · STCW reforzado",link:"🔗 Vínculo L3 Estabilidad: La inundación libre de la cubierta de coches destruye inmediatamente la estabilidad."},
    pt:{title:"MV Herald of Free Enterprise — Zeebrugge (1987)",teaser:"Ferry · Porta de proa aberta · Escora rápida · 193 mortos",what:"O ferry Herald of Free Enterprise sai de Zeebrugge com a porta de proa aberta. A água inunda o convés de automóveis a grande velocidade. O navio escora 90° e afunda em 90 segundos. 193 mortos.",cause:"• Porta de proa não fechada pelo marinheiro responsável (a dormir)\n• Sem indicador na ponte do estado das portas\n• Cultura de segurança insuficiente — pressão comercial\n• Sem procedimento de verificação de partida",lessons:"✓ Indicadores de portas obrigatórios em todas as pontes (SOLAS)\n✓ Lista de verificação de partida sistemática (ISM)\n✓ Cultura de segurança: qualquer um pode parar a partida\n✓ Resultado: SOLAS revisto · Código ISM criado · STCW reforçado",link:"🔗 Vínculo L3 Estabilidade: A inundação livre do convés de automóveis destrói imediatamente a estabilidade."},
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
  const correct={q1:"s",q2:"positif",q3:"0"};
  const qs={
    fr:[
      {id:"q1",q:"Quelle marque Plimsoll est la RÉFÉRENCE principale pour le chargement ?\n(Répondre : TF, F, T, S, W ou WNA)"},
      {id:"q2",q:"Pour qu'un navire soit stable, le GM doit être :\n(Répondre : positif, nul ou négatif)"},
      {id:"q3",q:"L'effet de carène liquide est NUL quand la citerne est à :\n(Répondre : 0%, 50% ou 100%) — 2 réponses valables"},
    ],
    en:[
      {id:"q1",q:"Which Plimsoll mark is the MAIN reference for loading?\n(Answer: TF, F, T, S, W or WNA)"},
      {id:"q2",q:"For a vessel to be stable, GM must be:\n(Answer: positive, zero or negative)"},
      {id:"q3",q:"Free surface effect is ZERO when the tank is at:\n(Answer: 0%, 50% or 100%) — 2 valid answers"},
    ],
    es:[
      {id:"q1",q:"¿Qué marca de Plimsoll es la REFERENCIA principal de carga?\n(Responder: TF, F, T, S, W o WNA)"},
      {id:"q2",q:"Para que un buque sea estable, el GM debe ser:\n(Responder: positivo, nulo o negativo)"},
      {id:"q3",q:"El efecto de superficie libre es NULO cuando el tanque está al:\n(Responder: 0%, 50% o 100%) — 2 respuestas válidas"},
    ],
    pt:[
      {id:"q1",q:"Qual marca de Plimsoll é a REFERÊNCIA principal de carga?\n(Responder: TF, F, T, S, W ou WNA)"},
      {id:"q2",q:"Para que um navio seja estável, o GM deve ser:\n(Responder: positivo, nulo ou negativo)"},
      {id:"q3",q:"O efeito de superfície livre é NULO quando o tanque está a:\n(Responder: 0%, 50% ou 100%) — 2 respostas válidas"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(id,val)=>{
    const v=val.trim().toLowerCase();
    if(id==="q1") return v==="s";
    if(id==="q2") return v==="positif"||v==="positive"||v==="positivo";
    if(id==="q3") return v==="0"||v==="0%"||v==="100"||v==="100%";
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.green}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : S = référence principale · GM > 0 = stable · Citerne pleine ou vide = effet nul"
        :lang==="en"?"💡 Reminders: S = main reference · GM > 0 = stable · Full or empty tank = zero effect"
        :lang==="es"?"💡 Recordatorios: S = referencia principal · GM > 0 = estable · Tanque lleno o vacío = efecto nulo"
        :"💡 Lembretes: S = referência principal · GM > 0 = estável · Tanque cheio ou vazio = efeito nulo"}
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
        {lang==="fr"?"✅ Q1: S (Summer = ligne de référence principale du franc-bord)\n✅ Q2: positif (GM > 0 = le navire revient vertical après gîte)\n✅ Q3: 0% ou 100% (citerne pleine ou vide = aucune surface libre)"
        :lang==="en"?"✅ Q1: S (Summer = main freeboard reference line)\n✅ Q2: positive (GM > 0 = vessel returns upright after heel)\n✅ Q3: 0% or 100% (full or empty tank = no free surface)"
        :"✅ Q1: S · Q2: positivo · Q3: 0% o 100%"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}


// ══════════════════════════════════════
// QUIZ — 4 LANGUAGES
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Que signifie un GM positif pour la stabilité d'un navire ?",opts:["Le navire est instable et va chavirer","Le navire est stable — il revient vertical après une gîte","Le navire est trop rigide et risque de se briser","GM positif = chargement excessif"],correct:1,expl:"GM (Hauteur Métacentrique) positif = M au-dessus de G = le navire est stable. Quand il gîte, la poussée d'Archimède crée un moment de redressement qui le ramène vertical. GM négatif = M en dessous de G = INSTABLE → risque de chavirement."},
    {q:"La marque Plimsoll 'S' représente quoi ?",opts:["Sécurité maximale — chargement interdit au-delà","Summer (Été) — ligne de référence principale pour le chargement en eau de mer tempérée","Sous-marin — applicable uniquement aux sous-marins","Soute — niveau des soutes à carburant"],correct:1,expl:"S = Summer (Été) = ligne de référence principale du franc-bord. C'est la ligne de flottaison maximale autorisée en été dans les eaux tempérées. Toutes les autres marques (T, W, TF, F, WNA) sont calculées par rapport à S."},
    {q:"Pourquoi une citerne à moitié pleine est-elle PIRE pour la stabilité qu'une citerne vide ?",opts:["Car elle est plus lourde","L'effet de carène liquide : la surface libre du liquide se déplace et remonte G, réduisant le GM effectif","Car elle est plus difficile à pomper","Car elle change la forme de la coque"],correct:1,expl:"Effet de carène liquide = réduction du GM. La surface libre du liquide dans une citerne partiellement remplie se déplace latéralement lors de la gîte, amplifiant l'instabilité. Solution : remplir complètement ou vider complètement les citernes."},
    {q:"Qu'est-ce que l'assiette (trim) d'un navire ?",opts:["L'angle de gîte latérale du navire","La différence entre le tirant d'eau arrière et le tirant d'eau avant","La hauteur de la vague maximale","La vitesse de roulis du navire"],correct:1,expl:"Trim (assiette) = Tirant d'eau arrière - Tirant d'eau avant. Trim positif = piqué sur l'arrière. Trim négatif = appuyé sur l'avant. Un trim excessif (>1,5m) affecte la manœuvrabilité, la résistance à l'avancement et la stabilité."},
    {q:"Quelle catastrophe a conduit à la création du Code ISM (International Safety Management) ?",opts:["Naufrage du Titanic (1912)","Herald of Free Enterprise (1987) — ferry coulé avec porte ouverte · 193 morts","Exxon Valdez (1989) — marée noire Alaska","Costa Concordia (2012) — échouage Giglio"],correct:1,expl:"Le Herald of Free Enterprise (1987, Zeebrugge) a causé 193 morts. Cette catastrophe due à des défaillances organisationnelles (pas de procédures, pas de culture de sécurité) a conduit à la création du Code ISM (1994) obligeant chaque compagnie maritime à avoir un système de management de la sécurité."},
  ],
  en:[
    {q:"What does a positive GM mean for vessel stability?",opts:["The vessel is unstable and will capsize","The vessel is stable — it returns upright after heeling","The vessel is too stiff and may break up","Positive GM = excessive loading"],correct:1,expl:"Positive GM (Metacentric Height) = M above G = vessel is stable. When it heels, buoyancy creates a righting moment returning it upright. Negative GM = M below G = UNSTABLE → capsizing risk."},
    {q:"What does the Plimsoll mark 'S' represent?",opts:["Maximum safety — loading forbidden beyond","Summer — main reference line for loading in temperate sea water","Submarine — applies only to submarines","Bunker — fuel bunker level"],correct:1,expl:"S = Summer = main freeboard reference line. This is the maximum permitted waterline in summer in temperate waters. All other marks (T, W, TF, F, WNA) are calculated relative to S."},
    {q:"Why is a half-full tank WORSE for stability than an empty tank?",opts:["Because it is heavier","Free surface effect: the liquid free surface shifts and raises G, reducing effective GM","Because it is harder to pump","Because it changes hull shape"],correct:1,expl:"Free surface effect = GM reduction. The free surface of liquid in a partially filled tank shifts laterally when heeling, amplifying instability. Solution: fill tanks completely or empty them completely."},
    {q:"What is the trim of a vessel?",opts:["The lateral heel angle","The difference between aft draft and fwd draft","The maximum wave height","The rolling speed"],correct:1,expl:"Trim = Aft draft - Fwd draft. Positive trim = stern down. Negative trim = bow down. Excessive trim (>1.5m) affects maneuverability, resistance and stability."},
    {q:"Which disaster led to the creation of the ISM Code?",opts:["Titanic (1912)","Herald of Free Enterprise (1987) — ferry sunk with door open · 193 deaths","Exxon Valdez (1989) — Alaska oil spill","Costa Concordia (2012) — Giglio grounding"],correct:1,expl:"Herald of Free Enterprise (1987, Zeebrugge) caused 193 deaths. This disaster due to organizational failures led to the ISM Code (1994), requiring every shipping company to have a Safety Management System."},
  ],
  es:[
    {q:"¿Qué significa un GM positivo para la estabilidad de un buque?",opts:["El buque es inestable y volcará","El buque es estable — regresa a la posición vertical tras una escora","El buque es demasiado rígido y puede quebrarse","GM positivo = carga excesiva"],correct:1,expl:"GM (Altura Metacéntrica) positivo = M encima de G = buque estable. Cuando escora, el empuje de Arquímedes crea un momento adrizante que lo devuelve a la vertical. GM negativo = M debajo de G = INESTABLE → riesgo de vuelco."},
    {q:"¿Qué representa la marca de Plimsoll 'S'?",opts:["Seguridad máxima — carga prohibida más allá","Verano (Summer) — línea de referencia principal para la carga en agua de mar templada","Submarino — aplicable solo a submarinos","Sentina — nivel de sentinas"],correct:1,expl:"S = Summer (Verano) = línea de referencia principal del francobordo. Es la línea de flotación máxima permitida en verano en aguas templadas. Todas las demás marcas (T, W, TF, F, WNA) se calculan respecto a S."},
    {q:"¿Por qué un tanque a la mitad es PEOR para la estabilidad que uno vacío?",opts:["Porque pesa más","Efecto de superficie libre: la superficie libre del líquido se desplaza y sube G, reduciendo el GM efectivo","Porque es más difícil de bombear","Porque cambia la forma del casco"],correct:1,expl:"Efecto de superficie libre = reducción del GM. La superficie libre del líquido en un tanque parcialmente lleno se desplaza lateralmente al escorar, amplificando la inestabilidad. Solución: llenar o vaciar completamente los tanques."},
    {q:"¿Qué es el asiento (trim) de un buque?",opts:["El ángulo de escora lateral","La diferencia entre el calado de popa y el calado de proa","La altura máxima de la ola","La velocidad de balance"],correct:1,expl:"Trim (asiento) = Calado popa - Calado proa. Trim positivo = apopado. Trim negativo = aproado. Un asiento excesivo (>1,5m) afecta la maniobrabilidad, la resistencia y la estabilidad."},
    {q:"¿Qué catástrofe llevó a la creación del Código ISM?",opts:["Titanic (1912)","Herald of Free Enterprise (1987) — ferry hundido con puerta abierta · 193 muertos","Exxon Valdez (1989) — vertido Alaska","Costa Concordia (2012) — varada Giglio"],correct:1,expl:"El Herald of Free Enterprise (1987, Zeebrugge) causó 193 muertos. Este desastre por fallos organizacionales llevó al Código ISM (1994), obligando a cada compañía marítima a tener un Sistema de Gestión de la Seguridad."},
  ],
  pt:[
    {q:"O que significa um GM positivo para a estabilidade de um navio?",opts:["O navio é instável e vai capotar","O navio é estável — regressa à posição vertical após uma escora","O navio é demasiado rígido e pode partir-se","GM positivo = carga excessiva"],correct:1,expl:"GM (Altura Metacêntrica) positivo = M acima de G = navio estável. Quando escora, o empuxo de Arquimedes cria um momento de adrizamento que o devolve à vertical. GM negativo = M abaixo de G = INSTÁVEL → risco de capotamento."},
    {q:"O que representa a marca de Plimsoll 'S'?",opts:["Segurança máxima — carga proibida além","Verão (Summer) — linha de referência principal para a carga em água do mar temperada","Submarino — aplicável apenas a submarinos","Sonda — nível das sondas"],correct:1,expl:"S = Summer (Verão) = linha de referência principal do bordo livre. É a linha de flutuação máxima permitida no verão em águas temperadas. Todas as outras marcas (T, W, TF, F, WNA) são calculadas em relação a S."},
    {q:"Por que um tanque a meio é PIOR para a estabilidade do que um tanque vazio?",opts:["Porque pesa mais","Efeito de superfície livre: a superfície livre do líquido desloca-se e sobe G, reduzindo o GM efetivo","Porque é mais difícil de bombear","Porque muda a forma do casco"],correct:1,expl:"Efeito de superfície livre = redução do GM. A superfície livre do líquido num tanque parcialmente cheio desloca-se lateralmente ao escorar, amplificando a instabilidade. Solução: encher completamente ou esvaziar completamente os tanques."},
    {q:"O que é o trim de um navio?",opts:["O ângulo de escora lateral","A diferença entre o calado de popa e o calado de proa","A altura máxima da onda","A velocidade de balanço"],correct:1,expl:"Trim = Calado popa - Calado proa. Trim positivo = apopado. Trim negativo = aproado. Trim excessivo (>1,5m) afeta a manobrabilidade, a resistência e a estabilidade."},
    {q:"Qual catástrofe levou à criação do Código ISM?",opts:["Titanic (1912)","Herald of Free Enterprise (1987) — ferry afundado com porta aberta · 193 mortos","Exxon Valdez (1989) — derrame Alaska","Costa Concordia (2012) — encalhe Giglio"],correct:1,expl:"O Herald of Free Enterprise (1987, Zeebrugge) causou 193 mortos. Este desastre por falhas organizacionais levou ao Código ISM (1994), obrigando cada companhia marítima a ter um Sistema de Gestão da Segurança."},
  ],
};

// ══════════════════════════════════════
// BANK — 15 QUESTIONS × 4 LANGUAGES
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Que signifie GM (Hauteur Métacentrique) ?",opts:["La distance entre le centre de gravité G et le métacentre M","La profondeur maximale du navire","La hauteur de la coque hors eau","La distance entre la quille et le pont"],correct:0,expl:"GM = distance entre G (centre de gravité) et M (métacentre). GM > 0 = stable. GM < 0 = instable. GM trop grand = navire trop raide (roulis violent). GM trop petit = navire mou (gîte facilement). Valeur optimale : 0,15m à 2,5m selon le type de navire."},
    {q:"Qu'est-ce que le franc-bord d'un navire ?",opts:["La partie du navire sous l'eau","La distance verticale entre la ligne de charge et le pont principal étanche","La hauteur du mât","La profondeur des cales"],correct:1,expl:"Franc-bord = distance entre la ligne de chargement (waterline) et le pont principal étanche. Plus le franc-bord est grand, plus le navire est haut sur l'eau → meilleure réserve de flottabilité et de stabilité. Réglementé par la Convention de Ligne de Charge (1966)."},
    {q:"La marque Plimsoll WNA s'applique dans quelle zone ?",opts:["Dans tous les océans en hiver","Atlantique Nord en hiver — zone la plus restrictive","Zones tropicales uniquement","En eau douce uniquement"],correct:1,expl:"WNA = Winter North Atlantic = zone la plus restrictive. S'applique à l'Atlantique Nord au-delà de 36°N en hiver. Conditions de mer extrêmes → chargement minimal autorisé. Si la ligne WNA est immergée dans cette zone → infraction grave."},
    {q:"Qu'est-ce que le 'righting moment' (moment de redressement) ?",opts:["La force qui fait chavirer le navire","Le couple de forces qui ramène le navire à la position verticale après une gîte","La force des vagues","Le poids de la cargaison"],correct:1,expl:"Moment de redressement = GZ × Déplacement. GZ = bras de levier de stabilité = distance horizontale entre G et la verticale de B'. Plus GZ est grand, plus le moment de redressement est fort. La courbe GZ donne la stabilité à tous les angles de gîte."},
    {q:"Qu'est-ce que le 'déplacement' d'un navire ?",opts:["La vitesse maximale du navire","Le poids total du navire (coque + cargaison + carburant + eau + équipage)","La surface de la coque","La longueur totale du navire"],correct:1,expl:"Déplacement = poids total du navire = volume immergé × densité de l'eau. Mesuré en tonnes. En eau douce : densité 1,000. En eau de mer : densité 1,025. Un navire en eau douce s'enfonce plus (eau moins dense) → correction de tirant d'eau nécessaire."},
    {q:"Qu'est-ce que la 'stabilité à grands angles' ?",opts:["La stabilité du navire quand il est très chargé","La capacité du navire à résister au chavirement pour des angles de gîte élevés (> 15°)","La stabilité en eau agitée","La résistance de la coque aux contraintes"],correct:1,expl:"Stabilité à grands angles = évaluée par la courbe GZ. Un navire doit avoir une courbe GZ positive sur une plage d'angles suffisante (SOLAS : jusqu'à 30° minimum). L'angle de chavirement (où GZ = 0 après le maximum) doit être > 40°."},
    {q:"Qu'est-ce que le 'ballastage' et pourquoi est-il nécessaire ?",opts:["Chargement de marchandises lourdes","Remplissage de citernes avec de l'eau de mer pour contrôler le tirant d'eau, la stabilité et l'assiette","Vidange des soutes à carburant","Nettoyage de la coque"],correct:1,expl:"Ballastage = remplir les citernes de ballast avec de l'eau de mer. Nécessaire pour : 1) Contrôler le tirant d'eau (profondeur d'eau suffisante pour les hélices), 2) Améliorer la stabilité (baisser le centre de gravité), 3) Corriger l'assiette (trim). Indispensable sur les navires à vide."},
    {q:"Qu'est-ce que la Convention de Ligne de Charge de 1966 ?",opts:["Convention sur les émissions de gaz","Convention internationale réglementant le franc-bord et les marques de chargement de tous les navires","Convention sur les eaux de ballast","Convention sur la sécurité des passagers"],correct:1,expl:"Convention de Ligne de Charge (1966) = établit les règles de calcul du franc-bord minimum et impose les marques de chargement (Plimsoll) sur tous les navires. Objectif : garantir une réserve de flottabilité suffisante pour la sécurité. Certificat de Franc-Bord obligatoire."},
    {q:"Qu'est-ce que le 'centre de carène' (centre of buoyancy B) ?",opts:["Le centre de gravité du navire","Le centre géométrique du volume immergé — point d'application de la poussée d'Archimède","Le point le plus bas de la coque","Le centre du pont principal"],correct:1,expl:"Centre de carène B = centre géométrique du volume immergé. C'est le point d'application de la poussée d'Archimède (vers le haut). Quand le navire gîte, B se déplace vers le côté immergé, créant le moment de redressement. La distance BM = rayon métacentrique."},
    {q:"Pourquoi charge-t-on les navires avec des lests solides (pierres, minerai) par le passé ?",opts:["Pour augmenter la vitesse","Pour abaisser le centre de gravité et améliorer la stabilité — remplacé aujourd'hui par les ballasts d'eau","Pour protéger la coque","Pour faciliter le chargement des marchandises"],correct:1,expl:"Historiquement : pierres, sable, minerai dans les cales pour abaisser G → meilleure stabilité. Aujourd'hui : citernes de ballast remplies d'eau de mer → beaucoup plus pratique et contrôlable. Le principe reste le même : abaisser G améliore le GM."},
    {q:"Qu'est-ce qu'un navire 'trop raide' (stiff) ?",opts:["Un navire avec GM négatif","Un navire avec GM trop grand — roulis très court et violent, inconfortable et dangereux pour la cargaison","Un navire avec une coque rigide","Un navire qui ne roule pas du tout"],correct:1,expl:"Navire trop raide = GM trop grand (> 2-3m selon le type). Conséquence : période de roulis très courte (3-5 secondes), accélérations transversales violentes → fatigue des structures, déplacement de cargaison, inconfort de l'équipage. Corriger en montant des ballasts hauts ou en réduisant la cargaison basse."},
    {q:"Comment calcule-t-on l'assiette (trim) d'un navire ?",opts:["Tirant d'eau moyen × longueur","Tirant d'eau arrière - Tirant d'eau avant","Tirant d'eau avant + Tirant d'eau arrière","GM × déplacement"],correct:1,expl:"Trim = T(arrière) - T(avant). Trim positif = navire piqué sur l'arrière (normal pour la plupart des navires). Trim négatif = appuyé sur l'avant. Le trim optimal améliore la résistance à l'avancement et la manœuvrabilité."},
    {q:"Que signifie 'lège' pour un navire ?",opts:["Navire en pleine charge","Navire sans cargaison — à vide — tirant d'eau minimal","Navire léger en termes de construction","Navire à faible déplacement maximum"],correct:1,expl:"Navire lège = sans cargaison, sans eau de ballast de service, avec seulement les consommables nécessaires. Tirant d'eau minimal. Stabilité souvent réduite (G haut) → ballastage nécessaire pour naviguer en sécurité. Condition de chargement à vérifier avec le loadmaster."},
    {q:"Qu'est-ce que le 'compartimentage' selon SOLAS ?",opts:["La division des soutes à carburant","La division de la coque en compartiments étanches pour limiter l'envahissement en cas d'avarie","La répartition de la cargaison","Le système de ventilation des cales"],correct:1,expl:"Compartimentage SOLAS = division de la coque en compartiments étanches par des cloisons transversales. Objectif : limiter l'envahissement si la coque est percée. Standard SOLAS : 'bi-compartiment' → le navire doit flotter avec 2 compartiments envahis. Les paquebots : 3 compartiments."},
    {q:"Qu'est-ce que la 'courbe de stabilité statique' (GZ curve) ?",opts:["Une courbe de vitesse du navire","Le graphe du bras de levier GZ en fonction de l'angle de gîte — montre la stabilité à tous les angles","La courbe de résistance de la coque","Le profil de la carène"],correct:1,expl:"Courbe GZ = graphe de GZ (bras de redressement) vs angle de gîte. Caractéristiques importantes : angle de gîte initiale (GZ max), plage de stabilité positive (où GZ > 0), angle de chavirement (GZ = 0). SOLAS fixe des critères minimaux pour cette courbe."},
  ],
  en:[
    {q:"What does GM (Metacentric Height) mean?",opts:["The distance between center of gravity G and metacenter M","The maximum vessel depth","The hull height above water","The distance from keel to deck"],correct:0,expl:"GM = distance between G (center of gravity) and M (metacenter). GM > 0 = stable. GM < 0 = unstable. GM too large = too stiff (violent rolling). GM too small = tender (heels easily). Optimal range: 0.15m to 2.5m depending on vessel type."},
    {q:"What is the freeboard of a vessel?",opts:["The part of the vessel underwater","The vertical distance between the load line and the main watertight deck","The mast height","The hold depth"],correct:1,expl:"Freeboard = distance between the waterline and the main watertight deck. Larger freeboard = vessel higher on water → better reserve of buoyancy and stability. Regulated by the Load Line Convention (1966)."},
    {q:"The Plimsoll mark WNA applies in which zone?",opts:["All oceans in winter","North Atlantic in winter — most restrictive zone","Tropical zones only","Fresh water only"],correct:1,expl:"WNA = Winter North Atlantic = most restrictive zone. Applies to North Atlantic beyond 36°N in winter. Extreme sea conditions → minimum loading allowed. If WNA line is submerged in this zone → serious violation."},
    {q:"What is the 'righting moment'?",opts:["The force that capsizes the vessel","The couple that returns the vessel to upright position after heeling","The wave force","The cargo weight"],correct:1,expl:"Righting moment = GZ × Displacement. GZ = stability lever arm = horizontal distance between G and the vertical through B'. The larger GZ, the stronger the righting moment. The GZ curve shows stability at all heel angles."},
    {q:"What is the 'displacement' of a vessel?",opts:["Maximum vessel speed","Total weight of the vessel (hull + cargo + fuel + water + crew)","Hull surface area","Total vessel length"],correct:1,expl:"Displacement = total weight of vessel = submerged volume × water density. Measured in tonnes. Fresh water: density 1.000. Sea water: density 1.025. A vessel in fresh water sinks deeper (less dense water) → draft correction required."},
    {q:"What is 'large angle stability'?",opts:["Stability when heavily loaded","Vessel's ability to resist capsizing at large heel angles (> 15°)","Stability in rough water","Hull stress resistance"],correct:1,expl:"Large angle stability = evaluated by the GZ curve. A vessel must have a positive GZ curve over a sufficient angle range (SOLAS: minimum up to 30°). The capsizing angle (where GZ = 0 after maximum) must be > 40°."},
    {q:"What is 'ballasting' and why is it necessary?",opts:["Loading heavy cargo","Filling tanks with sea water to control draft, stability and trim","Emptying fuel bunkers","Hull cleaning"],correct:1,expl:"Ballasting = filling ballast tanks with sea water. Necessary to: 1) Control draft (sufficient water depth for propellers), 2) Improve stability (lower center of gravity), 3) Correct trim. Essential on light vessels."},
    {q:"What is the Load Line Convention of 1966?",opts:["Gas emission convention","International convention regulating freeboard and load marks on all vessels","Ballast water convention","Passenger safety convention"],correct:1,expl:"Load Line Convention (1966) = establishes minimum freeboard calculation rules and requires load marks (Plimsoll) on all vessels. Objective: ensure sufficient buoyancy reserve for safety. Freeboard Certificate mandatory."},
    {q:"What is the 'center of buoyancy' (B)?",opts:["The vessel's center of gravity","The geometric center of the submerged volume — point of application of buoyancy force","The lowest point of the hull","The center of the main deck"],correct:1,expl:"Center of buoyancy B = geometric center of submerged volume. Point of application of Archimedes' force (upward). When vessel heels, B moves toward immersed side, creating righting moment. Distance BM = metacentric radius."},
    {q:"Why were vessels loaded with solid ballast (stones, ore) historically?",opts:["To increase speed","To lower center of gravity and improve stability — replaced today by water ballast","To protect the hull","To facilitate cargo loading"],correct:1,expl:"Historically: stones, sand, ore in holds to lower G → better stability. Today: water ballast tanks → much more practical and controllable. The principle remains: lowering G improves GM."},
    {q:"What is a 'stiff' vessel?",opts:["A vessel with negative GM","A vessel with GM too large — very short violent rolling, uncomfortable and dangerous for cargo","A vessel with a rigid hull","A vessel that doesn't roll at all"],correct:1,expl:"Stiff vessel = GM too large (> 2-3m depending on type). Result: very short rolling period (3-5 seconds), violent transverse accelerations → structural fatigue, cargo shift, crew discomfort. Correct by raising ballast or reducing low cargo."},
    {q:"How is trim calculated?",opts:["Mean draft × length","Aft draft - Fwd draft","Fwd draft + Aft draft","GM × displacement"],correct:1,expl:"Trim = Aft draft - Fwd draft. Positive trim = stern down (normal for most vessels). Negative trim = bow down. Optimal trim improves resistance and maneuverability."},
    {q:"What does 'light ship' mean?",opts:["Fully loaded vessel","Vessel without cargo — empty — minimum draft","Light in terms of construction","Low maximum displacement vessel"],correct:1,expl:"Light ship = without cargo, without service ballast water, only necessary consumables. Minimum draft. Stability often reduced (G high) → ballasting required for safe navigation. Loading condition to check with loadmaster."},
    {q:"What is 'compartmentalization' per SOLAS?",opts:["Division of fuel bunkers","Division of the hull into watertight compartments to limit flooding in case of damage","Cargo distribution","Hold ventilation system"],correct:1,expl:"SOLAS compartmentalization = division of hull into watertight compartments by transverse bulkheads. Objective: limit flooding if hull is breached. SOLAS standard: 'two-compartment' → vessel must float with 2 flooded compartments. Passenger ships: 3 compartments."},
    {q:"What is the 'static stability curve' (GZ curve)?",opts:["A vessel speed curve","Graph of righting lever GZ versus heel angle — shows stability at all angles","Hull resistance curve","Underwater hull profile"],correct:1,expl:"GZ curve = graph of GZ (righting lever) vs heel angle. Key features: initial heel angle (GZ max), positive stability range (where GZ > 0), capsizing angle (GZ = 0). SOLAS sets minimum criteria for this curve."},
  ],
  es:[
    {q:"¿Qué significa GM (Altura Metacéntrica)?",opts:["La distancia entre el centro de gravedad G y el metacentro M","La profundidad máxima del buque","La altura del casco sobre el agua","La distancia de la quilla a la cubierta"],correct:0,expl:"GM = distancia entre G (centro de gravedad) y M (metacentro). GM > 0 = estable. GM < 0 = inestable. GM demasiado grande = buque muy rígido (balance violento). GM demasiado pequeño = buque blando (escora fácilmente). Valor óptimo: 0,15m a 2,5m."},
    {q:"¿Qué es el francobordo de un buque?",opts:["La parte del buque bajo el agua","La distancia vertical entre la línea de carga y la cubierta principal estanca","La altura del palo","La profundidad de las bodegas"],correct:1,expl:"Francobordo = distancia entre la línea de carga y la cubierta principal estanca. Mayor francobordo = buque más alto sobre el agua → mejor reserva de flotabilidad y estabilidad. Regulado por el Convenio de Líneas de Carga (1966)."},
    {q:"¿La marca de Plimsoll WNA se aplica en qué zona?",opts:["En todos los océanos en invierno","Atlántico Norte en invierno — zona más restrictiva","Solo zonas tropicales","Solo en agua dulce"],correct:1,expl:"WNA = Winter North Atlantic = zona más restrictiva. Se aplica al Atlántico Norte más allá de 36°N en invierno. Condiciones de mar extremas → carga mínima permitida. Si la línea WNA está sumergida en esta zona → infracción grave."},
    {q:"¿Qué es el 'momento adrizante' (righting moment)?",opts:["La fuerza que hace volcar el buque","El par de fuerzas que devuelve el buque a la posición vertical tras una escora","La fuerza de las olas","El peso de la carga"],correct:1,expl:"Momento adrizante = GZ × Desplazamiento. GZ = brazo de adrizamiento = distancia horizontal entre G y la vertical de B'. A mayor GZ, mayor momento adrizante. La curva GZ muestra la estabilidad para todos los ángulos de escora."},
    {q:"¿Qué es el 'desplazamiento' de un buque?",opts:["La velocidad máxima","El peso total del buque (casco + carga + combustible + agua + tripulación)","La superficie del casco","La eslora total"],correct:1,expl:"Desplazamiento = peso total del buque = volumen sumergido × densidad del agua. Medido en toneladas. Agua dulce: densidad 1,000. Agua de mar: densidad 1,025. Un buque en agua dulce hunde más (agua menos densa) → corrección de calado necesaria."},
    {q:"¿Qué es la 'estabilidad a grandes ángulos'?",opts:["La estabilidad cuando está muy cargado","La capacidad del buque para resistir el vuelco en ángulos de escora elevados (> 15°)","La estabilidad en agua agitada","La resistencia del casco a las tensiones"],correct:1,expl:"Estabilidad a grandes ángulos = evaluada por la curva GZ. Un buque debe tener curva GZ positiva en un rango de ángulos suficiente (SOLAS: mínimo hasta 30°). El ángulo de vuelco (GZ = 0 tras el máximo) debe ser > 40°."},
    {q:"¿Qué es el 'lastrado' y por qué es necesario?",opts:["Carga de mercancías pesadas","Llenado de tanques con agua de mar para controlar el calado, la estabilidad y el asiento","Vaciado de los pañoles de combustible","Limpieza del casco"],correct:1,expl:"Lastrado = llenar los tanques de lastre con agua de mar. Necesario para: 1) Controlar el calado, 2) Mejorar la estabilidad (bajar el centro de gravedad), 3) Corregir el asiento. Indispensable en los buques en rosca."},
    {q:"¿Qué es el Convenio de Líneas de Carga de 1966?",opts:["Convenio sobre emisiones de gas","Convenio internacional que regula el francobordo y las marcas de carga de todos los buques","Convenio sobre aguas de lastre","Convenio sobre seguridad de pasajeros"],correct:1,expl:"Convenio de Líneas de Carga (1966) = establece las reglas de cálculo del francobordo mínimo e impone las marcas de carga (Plimsoll) en todos los buques. Objetivo: garantizar reserva de flotabilidad suficiente. Certificado de Francobordo obligatorio."},
    {q:"¿Qué es el 'centro de carena' (B)?",opts:["El centro de gravedad del buque","El centro geométrico del volumen sumergido — punto de aplicación del empuje de Arquímedes","El punto más bajo del casco","El centro de la cubierta principal"],correct:1,expl:"Centro de carena B = centro geométrico del volumen sumergido. Punto de aplicación del empuje de Arquímedes (hacia arriba). Cuando el buque escora, B se desplaza hacia el lado sumergido, creando el momento adrizante. Distancia BM = radio metacéntrico."},
    {q:"¿Por qué se cargaban los buques con lastre sólido (piedras, mineral) históricamente?",opts:["Para aumentar la velocidad","Para bajar el centro de gravedad y mejorar la estabilidad — reemplazado hoy por lastre de agua","Para proteger el casco","Para facilitar la carga de mercancías"],correct:1,expl:"Históricamente: piedras, arena, mineral en las bodegas para bajar G → mejor estabilidad. Hoy: tanques de lastre de agua → mucho más práctico. El principio sigue siendo el mismo: bajar G mejora el GM."},
    {q:"¿Qué es un buque 'demasiado rígido' (stiff)?",opts:["Un buque con GM negativo","Un buque con GM demasiado grande — balance muy corto y violento, incómodo y peligroso para la carga","Un buque con casco rígido","Un buque que no balancea"],correct:1,expl:"Buque demasiado rígido = GM demasiado grande. Consecuencia: período de balance muy corto (3-5 segundos), aceleraciones transversales violentas → fatiga estructural, desplazamiento de carga, incomodidad de la tripulación."},
    {q:"¿Cómo se calcula el asiento (trim) de un buque?",opts:["Calado medio × eslora","Calado de popa - Calado de proa","Calado de proa + Calado de popa","GM × desplazamiento"],correct:1,expl:"Trim = Calado popa - Calado proa. Trim positivo = apopado (normal para la mayoría). Trim negativo = aproado. El trim óptimo mejora la resistencia al avance y la maniobrabilidad."},
    {q:"¿Qué significa 'en rosca' para un buque?",opts:["Buque en plena carga","Buque sin carga — en vacío — calado mínimo","Buque ligero en construcción","Buque de bajo desplazamiento máximo"],correct:1,expl:"En rosca = sin carga, sin agua de lastre de servicio, solo consumibles necesarios. Calado mínimo. Estabilidad a menudo reducida (G alto) → lastrado necesario para navegar con seguridad."},
    {q:"¿Qué es el 'compartimentado' según SOLAS?",opts:["La división de los pañoles de combustible","La división del casco en compartimentos estancos para limitar la inundación en caso de avería","La distribución de la carga","El sistema de ventilación de las bodegas"],correct:1,expl:"Compartimentado SOLAS = división del casco en compartimentos estancos por mamparos transversales. Objetivo: limitar la inundación si el casco es perforado. Estándar SOLAS: 'bi-compartimento' → el buque debe flotar con 2 compartimentos inundados."},
    {q:"¿Qué es la 'curva de estabilidad estática' (curva GZ)?",opts:["Una curva de velocidad del buque","El gráfico del brazo adrizante GZ en función del ángulo de escora — muestra la estabilidad en todos los ángulos","La curva de resistencia del casco","El perfil de la carena"],correct:1,expl:"Curva GZ = gráfico de GZ (brazo adrizante) vs ángulo de escora. Características importantes: ángulo de escora inicial (GZ máx), rango de estabilidad positiva (GZ > 0), ángulo de vuelco (GZ = 0). SOLAS establece criterios mínimos para esta curva."},
  ],
  pt:[
    {q:"O que significa GM (Altura Metacêntrica)?",opts:["A distância entre o centro de gravidade G e o metacentro M","A profundidade máxima do navio","A altura do casco acima da água","A distância da quilha ao convés"],correct:0,expl:"GM = distância entre G (centro de gravidade) e M (metacentro). GM > 0 = estável. GM < 0 = instável. GM demasiado grande = navio muito rígido (balanço violento). GM demasiado pequeno = navio mole (escora facilmente). Valor ótimo: 0,15m a 2,5m."},
    {q:"O que é o bordo livre de um navio?",opts:["A parte do navio abaixo da água","A distância vertical entre a linha de carga e o convés principal estanque","A altura do mastro","A profundidade dos porões"],correct:1,expl:"Bordo livre = distância entre a linha de carga e o convés principal estanque. Maior bordo livre = navio mais alto na água → melhor reserva de flutuabilidade e estabilidade. Regulado pela Convenção de Linhas de Carga (1966)."},
    {q:"A marca de Plimsoll WNA aplica-se em que zona?",opts:["Em todos os oceanos no inverno","Atlântico Norte no inverno — zona mais restritiva","Apenas zonas tropicais","Apenas em água doce"],correct:1,expl:"WNA = Winter North Atlantic = zona mais restritiva. Aplica-se ao Atlântico Norte além de 36°N no inverno. Condições de mar extremas → carga mínima permitida. Se a linha WNA estiver submersa nesta zona → infração grave."},
    {q:"O que é o 'momento de adrizamento' (righting moment)?",opts:["A força que faz o navio capotar","O par de forças que devolve o navio à posição vertical após uma escora","A força das ondas","O peso da carga"],correct:1,expl:"Momento de adrizamento = GZ × Deslocamento. GZ = braço de adrizamento = distância horizontal entre G e a vertical de B'. Quanto maior GZ, maior o momento de adrizamento. A curva GZ mostra a estabilidade para todos os ângulos de escora."},
    {q:"O que é o 'deslocamento' de um navio?",opts:["A velocidade máxima do navio","O peso total do navio (casco + carga + combustível + água + tripulação)","A superfície do casco","O comprimento total do navio"],correct:1,expl:"Deslocamento = peso total do navio = volume submerso × densidade da água. Medido em toneladas. Água doce: densidade 1,000. Água do mar: densidade 1,025. Um navio em água doce afunda mais (água menos densa) → correção de calado necessária."},
    {q:"O que é a 'estabilidade a grandes ângulos'?",opts:["A estabilidade quando muito carregado","A capacidade do navio de resistir ao capotamento em grandes ângulos de escora (> 15°)","A estabilidade em água agitada","A resistência do casco às tensões"],correct:1,expl:"Estabilidade a grandes ângulos = avaliada pela curva GZ. Um navio deve ter curva GZ positiva num intervalo de ângulos suficiente (SOLAS: mínimo até 30°). O ângulo de capotamento (GZ = 0 após o máximo) deve ser > 40°."},
    {q:"O que é o 'lastramento' e por que é necessário?",opts:["Carregamento de mercadorias pesadas","Enchimento de tanques com água do mar para controlar o calado, a estabilidade e o trim","Esvaziamento dos pañois de combustível","Limpeza do casco"],correct:1,expl:"Lastramento = encher os tanques de lastro com água do mar. Necessário para: 1) Controlar o calado, 2) Melhorar a estabilidade (baixar o centro de gravidade), 3) Corrigir o trim. Indispensável nos navios em lastro."},
    {q:"O que é a Convenção de Linhas de Carga de 1966?",opts:["Convenção sobre emissões de gás","Convenção internacional que regulamenta o bordo livre e as marcas de carga de todos os navios","Convenção sobre águas de lastro","Convenção sobre segurança de passageiros"],correct:1,expl:"Convenção de Linhas de Carga (1966) = estabelece as regras de cálculo do bordo livre mínimo e impõe as marcas de carga (Plimsoll) em todos os navios. Objetivo: garantir reserva de flutuabilidade suficiente. Certificado de Bordo Livre obrigatório."},
    {q:"O que é o 'centro de carena' (B)?",opts:["O centro de gravidade do navio","O centro geométrico do volume submerso — ponto de aplicação da força de flutuação","O ponto mais baixo do casco","O centro do convés principal"],correct:1,expl:"Centro de carena B = centro geométrico do volume submerso. Ponto de aplicação da força de Arquimedes (para cima). Quando o navio escora, B desloca-se para o lado submerso, criando o momento de adrizamento. Distância BM = raio metacêntrico."},
    {q:"Por que os navios eram carregados com lastro sólido (pedras, minério) historicamente?",opts:["Para aumentar a velocidade","Para baixar o centro de gravidade e melhorar a estabilidade — substituído hoje por lastro de água","Para proteger o casco","Para facilitar o carregamento de mercadorias"],correct:1,expl:"Historicamente: pedras, areia, minério nos porões para baixar G → melhor estabilidade. Hoje: tanques de lastro de água → muito mais prático. O princípio mantém-se: baixar G melhora o GM."},
    {q:"O que é um navio 'demasiado rígido' (stiff)?",opts:["Um navio com GM negativo","Um navio com GM demasiado grande — balanço muito curto e violento, desconfortável e perigoso para a carga","Um navio com casco rígido","Um navio que não balança"],correct:1,expl:"Navio demasiado rígido = GM demasiado grande. Consequência: período de balanço muito curto (3-5 segundos), acelerações transversais violentas → fadiga estrutural, deslocamento de carga, desconforto da tripulação."},
    {q:"Como se calcula o trim de um navio?",opts:["Calado médio × comprimento","Calado de popa - Calado de proa","Calado de proa + Calado de popa","GM × deslocamento"],correct:1,expl:"Trim = Calado popa - Calado proa. Trim positivo = apopado (normal para a maioria). Trim negativo = aproado. O trim ótimo melhora a resistência ao avanço e a manobrabilidade."},
    {q:"O que significa 'em lastro' para um navio?",opts:["Navio em plena carga","Navio sem carga — vazio — calado mínimo","Navio leve em construção","Navio de baixo deslocamento máximo"],correct:1,expl:"Em lastro = sem carga, sem água de lastro de serviço, apenas consumíveis necessários. Calado mínimo. Estabilidade muitas vezes reduzida (G alto) → lastramento necessário para navegar com segurança."},
    {q:"O que é o 'compartimentamento' segundo o SOLAS?",opts:["A divisão dos pañois de combustível","A divisão do casco em compartimentos estanques para limitar a inundação em caso de avaria","A distribuição da carga","O sistema de ventilação dos porões"],correct:1,expl:"Compartimentamento SOLAS = divisão do casco em compartimentos estanques por anteparas transversais. Objetivo: limitar a inundação se o casco for perfurado. Padrão SOLAS: 'bi-compartimento' → o navio deve flutuar com 2 compartimentos inundados."},
    {q:"O que é a 'curva de estabilidade estática' (curva GZ)?",opts:["Uma curva de velocidade do navio","O gráfico do braço de adrizamento GZ em função do ângulo de escora — mostra a estabilidade para todos os ângulos","A curva de resistência do casco","O perfil da carena"],correct:1,expl:"Curva GZ = gráfico de GZ (braço de adrizamento) vs ângulo de escora. Características importantes: ângulo de escora inicial (GZ máx), intervalo de estabilidade positiva (GZ > 0), ângulo de capotamento (GZ = 0). O SOLAS estabelece critérios mínimos para esta curva."},
  ],
};

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.teal})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const s=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.green}33,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.green}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.green,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.green:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"⚙️ Module Machine · Leçon 3/8 · ⭐ Premium · 200 XP",
      title:"Stabilité, Franc-Bord & Marques Plimsoll",
      intro:"Un navire bien conçu peut encore couler s'il est mal chargé. La stabilité n'est pas acquise — elle se calcule, se surveille et se maintient à chaque voyage.\n\nCette leçon couvre la stabilité, les marques de chargement Plimsoll, l'effet de carène liquide et le calcul d'assiette.",
      p1:"PARTIE 1 — STABILITÉ & GM",s1t:"Hauteur métacentrique · G · M · B",
      s1:"STABILITÉ FONDAMENTALE :\nUn navire est stable si M est AU-DESSUS de G\n→ GM positif = navire stable\n→ GM négatif = INSTABLE → chavirement\n\nLES TROIS POINTS CLÉS :\nB = Centre de carène (centre du volume immergé)\nG = Centre de gravité (poids total du navire)\nM = Métacentre (point virtuel d'intersection)\n\nGM OPTIMAL :\nTrop petit (< 0,15m) = navire mou → risque de chavirement\nIdéal (0,5-1,5m) = bon équilibre stabilité/confort\nTrop grand (> 2,5m) = navire raide → roulis violent\n\nFACTEURS QUI INFLUENCENT GM :\n→ Position de la cargaison (haute = mauvais · basse = bon)\n→ Ballasts (eau basse = bon · eau haute = mauvais)\n→ Consommation de carburant (citernes qui se vident)",
      p2:"PARTIE 2 — MARQUES PLIMSOLL",s2t:"6 marques de chargement interactives",
      s2:"LES MARQUES PLIMSOLL (Lignes de Charge) :\nObligatoires sur tous les navires (Convention 1966)\nIndiquent la profondeur maximale d'immersion\n\n6 MARQUES DE LA MOINS À LA PLUS RESTRICTIVE :\nTF = Tropical Eau Douce (le plus haut permis)\nF  = Eau Douce\nT  = Tropical (eau de mer chaude)\nS  = SUMMER ← RÉFÉRENCE PRINCIPALE\nW  = Winter (hiver)\nWNA = Winter North Atlantic (le plus bas)\n\nCERCLE PLIMSOLL :\nCercle avec barre horizontale = Summer (S)\nLettres : BV (Bureau Veritas) · LR · NK etc.\n\nFRANC-BORD :\nDistance entre S et le pont principal\nPlus grand franc-bord = plus de réserve de flottabilité",
      p3:"PARTIE 3 — EFFET DE CARÈNE LIQUIDE",s3t:"Surface libre des citernes partiellement remplies",
      s3:"PRINCIPE :\nUne citerne partiellement remplie crée\nune surface libre qui se déplace lors de la gîte\n→ G remonte → GM se réduit\n\nEFFET SUR LA STABILITÉ :\nCiterne 0% ou 100% = EFFET NUL\nCiterne 50% = EFFET MAXIMUM\n\nFORMULE :\nΔGM = ρ × i / Δ\ni = moment d'inertie de la surface libre\nΔ = déplacement du navire\n\nSOLUTION PRATIQUE :\n→ Remplir les citernes ENTIÈREMENT\n→ Ou les vider ENTIÈREMENT\n→ Éviter les citernes à moitié pleines\n\nPLUSIEURS CITERNES PARTIELLES :\nLes effets s'ADDITIONNENT\n→ Peut réduire drastiquement le GM effectif",
      p4:"PARTIE 4 — ASSIETTE (TRIM) & TIRANT D'EAU",s4t:"Mesure et correction de l'assiette",
      s4:"TIRANT D'EAU :\nDistance entre la flottaison et la quille\nMesuré avant (FWD), milieu (MID), arrière (AFT)\n\nASSIETTE (TRIM) :\nTrim = T(AFT) - T(FWD)\nTrim positif : piqué sur l'arrière (normal)\nTrim négatif : appuyé sur l'avant\n\nTRIM OPTIMAL :\nLégèrement piqué (+0,2 à +0,5m)\n→ Meilleure résistance à l'avancement\n→ Meilleures performances moteur\n→ Meilleure manœuvrabilité\n\nCORRECTION DU TRIM :\n→ Ballasts avant/arrière\n→ Transfert de cargaison\n→ Consommation de soutes avant/arrière",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"⚠️ CAS RÉEL",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 3 MACHINE",
      sumP:["GM positif = stable · GM négatif = DANGER de chavirement","M au-dessus de G · B = centre volume immergé","Plimsoll : TF·F·T·S(ref)·W·WNA · Convention 1966","Effet carène liquide : citerne 50% = PIRE pour GM","Solution : citernes pleines ou vides (jamais à moitié)","Trim = T(AFT) - T(FWD) · optimal : +0,2 à +0,5m","Herald of Free Enterprise → Code ISM 1994","Franc-bord = distance flottaison → pont étanche"],
      learnedP:["GM positif=stable · M au-dessus de G","Plimsoll : TF·F·T·S·W·WNA · S=référence principale","Effet carène liquide · citernes pleines ou vides","Trim=T(aft)-T(fwd) · correction par ballasts","Herald of Free Enterprise → Code ISM"],
    },
    en:{
      badge:"⚙️ Engine Module · Lesson 3/8 · ⭐ Premium · 200 XP",
      title:"Stability, Freeboard & Plimsoll Marks",
      intro:"A well-designed vessel can still sink if poorly loaded. Stability is not guaranteed — it must be calculated, monitored and maintained every voyage.\n\nThis lesson covers stability, Plimsoll load marks, free surface effect and trim calculation.",
      p1:"PART 1 — STABILITY & GM",s1t:"Metacentric height · G · M · B",
      s1:"FUNDAMENTAL STABILITY:\nA vessel is stable if M is ABOVE G\n→ Positive GM = stable vessel\n→ Negative GM = UNSTABLE → capsizing\n\nTHREE KEY POINTS:\nB = Center of buoyancy (center of submerged volume)\nG = Center of gravity (total vessel weight)\nM = Metacenter (virtual intersection point)\n\nOPTIMAL GM:\nToo small (< 0.15m) = tender → capsizing risk\nIdeal (0.5-1.5m) = good balance stability/comfort\nToo large (> 2.5m) = stiff → violent rolling\n\nFACTORS AFFECTING GM:\n→ Cargo position (high = bad · low = good)\n→ Ballast (low water = good · high water = bad)\n→ Fuel consumption (emptying tanks)",
      p2:"PART 2 — PLIMSOLL MARKS",s2t:"6 interactive load line marks",
      s2:"PLIMSOLL MARKS (Load Lines):\nMandatory on all vessels (1966 Convention)\nIndicate maximum permitted immersion depth\n\n6 MARKS LEAST TO MOST RESTRICTIVE:\nTF = Tropical Fresh Water (highest permitted)\nF  = Fresh Water\nT  = Tropical (warm sea water)\nS  = SUMMER ← MAIN REFERENCE\nW  = Winter\nWNA = Winter North Atlantic (lowest)\n\nPLIMSOLL CIRCLE:\nCircle with horizontal bar = Summer (S)\nLetters: BV · LR · NK etc.\n\nFREEBOARD:\nDistance between S and main deck\nLarger freeboard = more buoyancy reserve",
      p3:"PART 3 — FREE SURFACE EFFECT",s3t:"Free surface of partially filled tanks",
      s3:"PRINCIPLE:\nA partially filled tank creates\na free surface that shifts when heeling\n→ G rises → GM reduces\n\nEFFECT ON STABILITY:\n0% or 100% full = ZERO EFFECT\n50% full = MAXIMUM EFFECT\n\nFORMULA:\nΔGM = ρ × i / Δ\ni = moment of inertia of free surface\nΔ = vessel displacement\n\nPRACTICAL SOLUTION:\n→ Fill tanks COMPLETELY\n→ Or empty them COMPLETELY\n→ Avoid half-full tanks",
      p4:"PART 4 — TRIM & DRAFT",s4t:"Trim measurement and correction",
      s4:"DRAFT:\nDistance between waterline and keel\nMeasured fwd, midship, aft\n\nTRIM:\nTrim = T(AFT) - T(FWD)\nPositive trim: stern down (normal)\nNegative trim: bow down\n\nOPTIMAL TRIM:\nSlightly by stern (+0.2 to +0.5m)\n→ Better resistance\n→ Better engine performance\n→ Better maneuverability\n\nTRIM CORRECTION:\n→ Fwd/aft ballasts\n→ Cargo transfer\n→ Fwd/aft bunker consumption",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"⚠️ REAL ACCIDENT CASE",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — ENGINE LESSON 3",
      sumP:["Positive GM = stable · Negative GM = CAPSIZING DANGER","M above G · B = center of submerged volume","Plimsoll: TF·F·T·S(ref)·W·WNA · 1966 Convention","Free surface effect: 50% tank = WORST for GM","Solution: tanks full or empty (never half)","Trim = T(AFT) - T(FWD) · optimal: +0.2 to +0.5m","Herald of Free Enterprise → ISM Code 1994","Freeboard = waterline to watertight deck distance"],
      learnedP:["Positive GM=stable · M above G","Plimsoll: TF·F·T·S·W·WNA · S=main reference","Free surface effect · full or empty tanks","Trim=T(aft)-T(fwd) · correction by ballasts","Herald of Free Enterprise → ISM Code"],
    },
    es:{
      badge:"⚙️ Módulo Máquinas · Lección 3/8 · ⭐ Premium · 200 XP",
      title:"Estabilidad, Francobordo & Marcas de Plimsoll",
      intro:"Un buque bien diseñado puede hundirse si está mal cargado. La estabilidad no está garantizada — se calcula, se vigila y se mantiene en cada viaje.",
      p1:"PARTE 1 — ESTABILIDAD & GM",s1t:"Altura metacéntrica · G · M · B",
      s1:"ESTABILIDAD FUNDAMENTAL:\nUn buque es estable si M está POR ENCIMA de G\n→ GM positivo = estable\n→ GM negativo = INESTABLE → vuelco\n\nTRES PUNTOS CLAVE:\nB = Centro de carena · G = Centro de gravedad · M = Metacentro\n\nGM ÓPTIMO:\nDemasiado pequeño (< 0,15m) = buque blando\nÍdeal (0,5-1,5m) = buen equilibrio\nDemasiado grande (> 2,5m) = buque rígido",
      p2:"PARTE 2 — MARCAS DE PLIMSOLL",s2t:"6 marcas de línea de carga interactivas",
      s2:"MARCAS DE PLIMSOLL (Líneas de Carga):\nObligatorias en todos los buques (Convenio 1966)\n\n6 MARCAS de menos a más restrictiva:\nTF = Tropical Agua Dulce · F = Agua Dulce · T = Tropical\nS = VERANO ← REFERENCIA PRINCIPAL\nW = Invierno · WNA = Invierno Atlántico Norte\n\nFRANCOBORDO:\nDistancia entre S y la cubierta principal",
      p3:"PARTE 3 — EFECTO DE SUPERFICIE LIBRE",s3t:"Superficie libre de tanques parcialmente llenos",
      s3:"PRINCIPIO:\nUn tanque parcialmente lleno crea una superficie libre\nque se desplaza al escorar → G sube → GM se reduce\n\nEFECTO: 0% o 100% = SIN EFECTO · 50% = MÁXIMO EFECTO\n\nSOLUCIÓN: Llenar o vaciar completamente los tanques",
      p4:"PARTE 4 — ASIENTO (TRIM) & CALADO",s4t:"Medición y corrección del asiento",
      s4:"CALADO: Distancia entre la flotación y la quilla\nTRIM = Calado popa - Calado proa\nTrim positivo = apopado (normal)\nÓptimo: +0,2 a +0,5m\nCORRECCIÓN: ballastos proa/popa · transferencia de carga",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 3 MÁQUINAS",
      sumP:["GM positivo = estable · GM negativo = PELIGRO vuelco","M encima de G · B = centro volumen sumergido","Plimsoll: TF·F·T·S(ref)·W·WNA · Convenio 1966","Efecto superficie libre: tanque 50% = PEOR para GM","Solución: tanques llenos o vacíos","Trim = T(popa)-T(proa) · óptimo: +0,2 a +0,5m","Herald of Free Enterprise → Código ISM 1994"],
      learnedP:["GM positivo=estable · M encima de G","Plimsoll TF·F·T·S·W·WNA · S=referencia","Efecto superficie libre · tanques llenos o vacíos","Trim=T(popa)-T(proa) · corrección por lastres","Herald of Free Enterprise → Código ISM"],
    },
    pt:{
      badge:"⚙️ Módulo Máquinas · Lição 3/8 · ⭐ Premium · 200 XP",
      title:"Estabilidade, Bordo Livre & Marcas de Plimsoll",
      intro:"Um navio bem concebido pode afundar se for mal carregado. A estabilidade não é garantida — tem de ser calculada, monitorizada e mantida em cada viagem.",
      p1:"PARTE 1 — ESTABILIDADE & GM",s1t:"Altura metacêntrica · G · M · B",
      s1:"ESTABILIDADE FUNDAMENTAL:\nUm navio é estável se M está ACIMA de G\n→ GM positivo = estável\n→ GM negativo = INSTÁVEL → capotamento\n\nTRÊS PONTOS CHAVE:\nB = Centro de carena · G = Centro de gravidade · M = Metacentro\n\nGM ÓTIMO:\nDemasiado pequeno (< 0,15m) = navio mole\nIdeal (0,5-1,5m) = bom equilíbrio\nDemasiado grande (> 2,5m) = navio rígido",
      p2:"PARTE 2 — MARCAS DE PLIMSOLL",s2t:"6 marcas de linha de carga interativas",
      s2:"MARCAS DE PLIMSOLL (Linhas de Carga):\nObrigatórias em todos os navios (Convenção 1966)\n\n6 MARCAS da menos à mais restritiva:\nTF = Tropical Água Doce · F = Água Doce · T = Tropical\nS = VERÃO ← REFERÊNCIA PRINCIPAL\nW = Inverno · WNA = Inverno Atlântico Norte\n\nBORDO LIVRE:\nDistância entre S e o convés principal",
      p3:"PARTE 3 — EFEITO DE SUPERFÍCIE LIVRE",s3t:"Superfície livre de tanques parcialmente cheios",
      s3:"PRINCÍPIO:\nUm tanque parcialmente cheio cria uma superfície livre\nque se desloca ao escorar → G sobe → GM reduz\n\nEFEITO: 0% ou 100% = SEM EFEITO · 50% = EFEITO MÁXIMO\n\nSOLUÇÃO: Encher ou esvaziar completamente os tanques",
      p4:"PARTE 4 — TRIM & CALADO",s4t:"Medição e correção do trim",
      s4:"CALADO: Distância entre a flutuação e a quilha\nTRIM = Calado popa - Calado proa\nTrim positivo = apopado (normal)\nÓtimo: +0,2 a +0,5m\nCORREÇÃO: lastros proa/popa · transferência de carga",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"⚠️ CASO REAL",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 3 MÁQUINAS",
      sumP:["GM positivo = estável · GM negativo = PERIGO capotamento","M acima de G · B = centro volume submerso","Plimsoll: TF·F·T·S(ref)·W·WNA · Convenção 1966","Efeito superfície livre: tanque 50% = PIOR para GM","Solução: tanques cheios ou vazios","Trim = T(popa)-T(proa) · ótimo: +0,2 a +0,5m","Herald of Free Enterprise → Código ISM 1994"],
      learnedP:["GM positivo=estável · M acima de G","Plimsoll TF·F·T·S·W·WNA · S=referência","Efeito superfície livre · tanques cheios ou vazios","Trim=T(popa)-T(proa) · correção por lastros","Herald of Free Enterprise → Código ISM"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════
export default function LessonStabilite({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase,setPhase]=useState("content");const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;

  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#060e1a 0%,#0a1628 50%,#060e1a 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.green}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.green,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>⚓ {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/8":lang==="en"?"Lesson 3/8":lang==="es"?"Lección 3/8":"Lição 3/8"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.green,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.green},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.green}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="⚖️" text={lc.p1} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"STABILITÉ GM — INTERACTIF":lang==="en"?"STABILITY GM — INTERACTIVE":lang==="es"?"ESTABILIDAD GM — INTERACTIVO":"ESTABILIDADE GM — INTERATIVO"}</div>
              <StabilitySVG lang={lang}/>
            </Card>

            <SL icon="🔵" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔵</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔵 {lang==="fr"?"MARQUES PLIMSOLL — INTERACTIF":lang==="en"?"PLIMSOLL MARKS — INTERACTIVE":lang==="es"?"MARCAS PLIMSOLL — INTERACTIVO":"MARCAS PLIMSOLL — INTERATIVO"}</div>
              <PlimsollSVG lang={lang}/>
            </Card>

            <SL icon="💧" text={lc.p3} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.teal}33`}}>
              <div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💧 {lang==="fr"?"EFFET CARÈNE LIQUIDE — INTERACTIF":lang==="en"?"FREE SURFACE EFFECT — INTERACTIVE":lang==="es"?"EFECTO SUPERFICIE LIBRE — INTERACTIVO":"EFEITO SUPERFÍCIE LIVRE — INTERATIVO"}</div>
              <FreeSurfaceSVG lang={lang}/>
            </Card>

            <SL icon="📐" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📐</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold2}33`}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📐 {lang==="fr"?"ASSIETTE (TRIM) — INTERACTIF":lang==="en"?"TRIM — INTERACTIVE":lang==="es"?"ASIENTO (TRIM) — INTERACTIVO":"TRIM — INTERATIVO"}</div>
              <TrimSVG lang={lang}/>
            </Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.green}33`}}>
              <div style={{fontSize:11,color:C.green,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(30,138,74,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz — Stabilité & Plimsoll":lang==="en"?"Quiz — Stability & Plimsoll":lang==="es"?"Quiz — Estabilidad & Plimsoll":"Quiz — Estabilidade & Plimsoll"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions":lang==="en"?"questions":lang==="es"?"preguntas":"perguntas"} · {lang==="fr"?"Leçon 3":lang==="en"?"Lesson 3":lang==="es"?"Lección 3":"Lição 3"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}55`,fontSize:14,color:C.green,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.green},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(30,138,74,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 — INCENDIE & SÉCURITÉ →":lang==="en"?"LESSON 4 — FIRE & SAFETY →":lang==="es"?"LECCIÓN 4 — INCENDIO & SEGURIDAD →":"LIÇÃO 4 — INCÊNDIO & SEGURANÇA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
