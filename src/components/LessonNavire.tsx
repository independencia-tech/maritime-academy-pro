import { useState, useEffect } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Navigation & Cartographie", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚" },
  en:{ back:"◀ Back", module:"Navigation & Cartography", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚" },
  es:{ back:"◀ Volver", module:"Navegación & Cartografía", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee el contenido y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚" },
  pt:{ back:"◀ Voltar", module:"Navegação & Cartografia", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚" },
};

// ══════════════════════════════════════
// ALL SVG COMPONENTS INLINE
// ══════════════════════════════════════

function ShipTopView({ lang }) {
  return (
    <svg width="290" height="150" viewBox="0 0 290 150">
      <path d="M145,6 C190,6 258,28 265,75 C258,122 190,144 145,144 C100,144 32,122 25,75 C32,28 100,6 145,6 Z" fill="#1a3a5c" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="145" y1="6" x2="145" y2="144" stroke={C.gold2} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4"/>
      <rect x="155" y="50" width="96" height="48" rx="8" fill="rgba(30,138,74,0.2)" stroke={C.green} strokeWidth="1"/>
      <circle cx="185" cy="63" r="5" fill={C.green}/>
      <text x="200" y="67" fill={C.green} fontSize="10" fontWeight="bold">{lang==="fr"?"TRIBORD":lang==="en"?"STARBOARD":lang==="es"?"ESTRIBOR":"ESTIBORDO"}</text>
      <text x="200" y="80" fill={C.green} fontSize="7">{lang==="fr"?"Feu VERT ▶":lang==="en"?"GREEN light ▶":"Luz VERDE ▶"}</text>
      <rect x="38" y="50" width="96" height="48" rx="8" fill="rgba(192,57,43,0.2)" stroke={C.red} strokeWidth="1"/>
      <circle cx="55" cy="63" r="5" fill={C.red}/>
      <text x="68" y="67" fill={C.red} fontSize="10" fontWeight="bold">{lang==="fr"?"BÂBORD":lang==="en"?"PORT":lang==="es"?"BABOR":"BOMBORDO"}</text>
      <text x="68" y="80" fill={C.red} fontSize="7">{lang==="fr"?"Feu ROUGE ◀":lang==="en"?"RED light ◀":"Luz ROJA ◀"}</text>
      <polygon points="145,2 138,16 152,16" fill={C.gold2}/>
      <text x="145" y="32" textAnchor="middle" fill={C.gold2} fontSize="8" fontWeight="bold">{lang==="fr"?"PROUE":lang==="en"?"BOW":lang==="es"?"PROA":"PROA"}</text>
      <text x="145" y="140" textAnchor="middle" fill={C.muted} fontSize="8">{lang==="fr"?"POUPE":lang==="en"?"STERN":lang==="es"?"POPA":"POPA"}</text>
      <rect x="118" y="50" width="54" height="48" rx="4" fill="rgba(77,166,255,0.12)" stroke={C.blue2} strokeWidth="0.8"/>
      <text x="145" y="71" textAnchor="middle" fill={C.blue2} fontSize="7">{lang==="fr"?"Passerelle":lang==="en"?"Bridge":lang==="es"?"Puente":"Ponte"}</text>
      <text x="145" y="83" textAnchor="middle" fill={C.blue2} fontSize="10">🧭</text>
    </svg>
  );
}

function HelmSVG({ lang }) {
  const [angle, setAngle] = useState(0);
  const pos = [-35,-20,-10,0,10,20,35];
  const cx=100,cy=100,r=80,toRad=d=>d*Math.PI/180;
  const rx=cx+r*0.7*Math.sin(toRad(angle)), ry=cy+r*0.7*Math.cos(toRad(angle));
  return (
    <div style={{textAlign:"center"}}>
      <svg width="200" height="210" viewBox="0 0 200 210">
        <circle cx={cx} cy={cy} r={r} fill="#0a1628" stroke={C.gold} strokeWidth="2"/>
        {[-35,-20,-10,0,10,20,35].map(a=>{const rad=toRad(a);const iM=a%10===0||Math.abs(a)===35;const len=iM?12:6;return <line key={a} x1={cx+(r-len)*Math.sin(rad)} y1={cy+(r-len)*Math.cos(rad)} x2={cx+r*Math.sin(rad)} y2={cy+r*Math.cos(rad)} stroke={iM?C.gold2:"rgba(240,244,255,0.2)"} strokeWidth={iM?2:0.8}/>;}) }
        {[-35,-20,-10,0,10,20,35].map(a=><text key={a} x={cx+(r-22)*Math.sin(toRad(a))} y={cy+(r-22)*Math.cos(toRad(a))} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill={a===0?C.gold2:Math.abs(a)===35?C.red:C.white}>{Math.abs(a)}</text>)}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke={angle===0?C.green:Math.abs(angle)===35?C.red:C.blue2} strokeWidth="3" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r="5" fill={C.gold}/>
        <polygon points={`${cx},${cy-r-8} ${cx-5},${cy-r+2} ${cx+5},${cy-r+2}`} fill={C.gold2}/>
        <rect x="70" y="160" width="60" height="22" rx="6" fill="rgba(0,0,0,0.5)" stroke={C.border}/>
        <text x="100" y="175" textAnchor="middle" fill={angle===0?C.green:Math.abs(angle)===35?C.red:C.white} fontSize="11" fontWeight="bold">{angle>0?`${angle}°T`:angle<0?`${Math.abs(angle)}°B`:"0°"}</text>
      </svg>
      <div style={{display:"flex",justifyContent:"center",gap:4,flexWrap:"wrap",marginTop:4}}>
        {pos.map(a=><button key={a} onClick={()=>setAngle(a)} style={{padding:"5px 8px",borderRadius:8,fontSize:9,cursor:"pointer",background:angle===a?(a===0?C.green:Math.abs(a)===35?C.red:C.blue):"rgba(255,255,255,0.07)",border:`1px solid ${angle===a?(a===0?C.green:Math.abs(a)===35?C.red:C.blue2):"rgba(255,255,255,0.1)"}`,color:C.white,fontWeight:angle===a?700:400}}>{a>0?`+${a}°`:`${a}°`}</button>)}
      </div>
      <div style={{fontSize:10,color:C.muted,marginTop:6}}>{lang==="fr"?"Touche les angles pour simuler la barre":lang==="en"?"Tap angles to simulate the helm":lang==="es"?"Toca los ángulos para simular el timón":"Toque os ângulos para simular o leme"}</div>
    </div>
  );
}

function PlimsollSVG() {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180">
      <rect x="20" y="20" width="160" height="145" rx="6" fill="#0a1628" stroke={C.gold} strokeWidth="1.5"/>
      <rect x="0" y="112" width="200" height="68" fill="rgba(26,111,212,0.2)"/>
      <line x1="0" y1="112" x2="200" y2="112" stroke={C.blue2} strokeWidth="2"/>
      <circle cx="90" cy="100" r="22" fill="none" stroke="white" strokeWidth="2.5"/>
      <line x1="68" y1="100" x2="112" y2="100" stroke="white" strokeWidth="2.5"/>
      <text x="90" y="95" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">L</text>
      <text x="90" y="109" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">R</text>
      {[{y:72,l:"TF",c:"#00ff88"},{y:80,l:"F",c:"#88ff00"},{y:88,l:"T",c:"#ffaa00"},{y:100,l:"S",c:"white"},{y:108,l:"W",c:"#4da6ff"},{y:116,l:"WNA",c:"#ff6688"}].map((m,i)=>(
        <g key={i}><line x1="118" y1={m.y} x2="152" y2={m.y} stroke={m.c} strokeWidth={m.l==="S"?3:1.5}/><text x="156" y={m.y+4} fontSize="7" fill={m.c}>{m.l}</text></g>
      ))}
    </svg>
  );
}

function StabilitySVG({ lang }) {
  const [sc, setSc] = useState(0);
  const scenarios = [
    {l:{fr:"GM+ Stable",en:"GM+ Stable",es:"GM+ Estable",pt:"GM+ Estável"},gY:110,mY:85,c:C.green,a:0},
    {l:{fr:"GM++ Raide",en:"GM++ Stiff",es:"GM++ Rígido",pt:"GM++ Rígido"},gY:115,mY:70,c:C.gold2,a:6},
    {l:{fr:"GM- DANGER",en:"GM- DANGER",es:"GM- PELIGRO",pt:"GM- PERIGO"},gY:85,mY:95,c:C.red,a:-18},
  ];
  const s=scenarios[sc];
  return (
    <div style={{textAlign:"center"}}>
      <svg width="240" height="200" viewBox="0 0 240 200">
        <rect x="0" y="130" width="240" height="70" fill="rgba(26,111,212,0.18)"/>
        <line x1="0" y1="130" x2="240" y2="130" stroke={C.blue2} strokeWidth="1.5" opacity="0.6"/>
        <g transform={`translate(120,105) rotate(${s.a}) translate(-120,-105)`}>
          <ellipse cx="120" cy="120" rx="45" ry="18" fill="#0d1f3c" stroke={C.gold} strokeWidth="1.5"/>
          <rect x="78" y="88" width="84" height="34" rx="5" fill="#0a1628" stroke={C.gold} strokeWidth="1"/>
          <rect x="90" y="68" width="60" height="22" rx="4" fill="rgba(77,166,255,0.12)" stroke={C.blue2} strokeWidth="0.8"/>
          <circle cx="120" cy={s.gY} r="5" fill={C.orange}/>
          <text x="130" y={s.gY+4} fontSize="9" fill={C.orange} fontWeight="bold">G</text>
          <circle cx="120" cy={s.mY} r="5" fill={s.c}/>
          <text x="130" y={s.mY+4} fontSize="9" fill={s.c} fontWeight="bold">M</text>
          <line x1="120" y1={s.gY} x2="120" y2={s.mY} stroke={s.c} strokeWidth="2" strokeDasharray="3,2"/>
        </g>
        <text x="120" y="192" textAnchor="middle" fontSize="10" fontWeight="bold" fill={s.c}>{s.l[lang]||s.l.fr}</text>
      </svg>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:6}}>
        {scenarios.map((x,i)=><button key={i} onClick={()=>setSc(i)} style={{padding:"5px 10px",borderRadius:8,fontSize:9,cursor:"pointer",background:sc===i?`${x.c}22`:"rgba(255,255,255,0.05)",border:`1px solid ${sc===i?x.c:"rgba(255,255,255,0.1)"}`,color:sc===i?x.c:C.muted}}>{x.l[lang]||x.l.fr}</button>)}
      </div>
    </div>
  );
}

function CompartmentSVG({ lang }) {
  const [flooded, setFlooded] = useState([]);
  const [sel, setSel] = useState(null);
  const comps = [
    {id:"bow",x:8,w:42,label:{fr:"Cale Avant",en:"Fore Hold",es:"Bodega Proa",pt:"Porão Proa"},desc:{fr:"Compartiment proue\nBallasts avant + ancres\nSi envahi → proue s'enfonce",en:"Fore compartment\nBow ballast + anchors\nIf flooded → bow sinks",es:"Compartimento proa\nLastre + anclas\nSi inundado → proa se hunde",pt:"Compartimento proa\nLastro + âncoras\nSe inundado → proa afunda"}},
    {id:"hold1",x:55,w:46,label:{fr:"Cale 1",en:"Hold 1",es:"Bodega 1",pt:"Porão 1"},desc:{fr:"Cale cargo n°1\n~2 000 tonnes",en:"Cargo hold 1\n~2,000 tonnes",es:"Bodega 1\n~2.000 toneladas",pt:"Porão 1\n~2.000 toneladas"}},
    {id:"engine",x:106,w:58,label:{fr:"Salle Machines",en:"Engine Room",es:"Sala Máquinas",pt:"Sala Máquinas"},desc:{fr:"⚙️ Moteur principal + générateurs\n⚠️ CRITIQUE — perte de propulsion si envahi",en:"⚙️ Main engine + generators\n⚠️ CRITICAL — propulsion loss if flooded",es:"⚙️ Motor principal + generadores\n⚠️ CRÍTICO — pérdida de propulsión",pt:"⚙️ Motor principal + geradores\n⚠️ CRÍTICO — perda de propulsão"}},
    {id:"hold2",x:169,w:46,label:{fr:"Cale 2",en:"Hold 2",es:"Bodega 2",pt:"Porão 2"},desc:{fr:"Cale cargo n°2\n~2 000 tonnes",en:"Cargo hold 2\n~2,000 tonnes",es:"Bodega 2\n~2.000 toneladas",pt:"Porão 2\n~2.000 toneladas"}},
    {id:"stern",x:220,w:42,label:{fr:"Cale Arrière",en:"Aft Hold",es:"Bodega Popa",pt:"Porão Popa"},desc:{fr:"Compartiment poupe\nBallasts arrière + gouvernail\nSi envahi → poupe s'enfonce",en:"Aft compartment\nStern ballast + rudder\nIf flooded → stern sinks",es:"Compartimento popa\nLastre popa + timón\nSi inundado → popa se hunde",pt:"Compartimento popa\nLastro popa + leme\nSe inundado → popa afunda"}},
  ];
  const toggle = id => setFlooded(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const listMoment = comps.filter(c=>flooded.includes(c.id)).reduce((a,c)=>a+((c.x+c.w/2)-140),0);
  const listAngle = Math.max(-28,Math.min(28,listMoment*0.07));
  const isSinking = flooded.length >= 3;
  const selC = sel ? comps.find(c=>c.id===sel) : null;

  return (
    <div>
      <svg width="280" height="155" viewBox="0 0 280 155">
        <rect width="280" height="155" fill="#061020" rx="8"/>
        <line x1="0" y1="132" x2="280" y2="132" stroke={C.blue2} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
        <rect x="0" y="0" width="280" height="14" fill="rgba(0,0,0,0.5)"/>
        <text x="8" y="10" fontSize="7" fill={isSinking?C.red:listAngle!==0?C.orange:C.green}>
          {isSinking?(lang==="fr"?"⚠️ NAUFRAGE — 3+ compartiments !":lang==="en"?"⚠️ SINKING — 3+ flooded!":lang==="es"?"⚠️ ¡HUNDIMIENTO — 3+!":"⚠️ NAUFRÁGIO — 3+!")
          :flooded.length===0?(lang==="fr"?"✅ Navire sain — tous étanches":lang==="en"?"✅ Safe — all watertight":lang==="es"?"✅ Buque sano":"✅ Navio seguro")
          :`⚠️ ${Math.abs(listAngle).toFixed(0)}° ${listAngle>0?(lang==="fr"?"tribord":lang==="en"?"starboard":lang==="es"?"estribor":"estibordo"):(lang==="fr"?"bâbord":lang==="en"?"port":lang==="es"?"babor":"bombordo")}`}
        </text>
        <g transform={`translate(140,80) rotate(${listAngle}) translate(-140,-80)`}>
          <path d="M5,128 Q5,142 14,147 Q140,157 266,147 Q275,142 275,128 L275,18 L5,18 Z" fill="#0a1628" stroke={C.gold} strokeWidth="1.5"/>
          <rect x="5" y="14" width="270" height="7" fill="#112244" stroke={C.gold} strokeWidth="0.8"/>
          {[55,106,169,220].map(x=><line key={x} x1={x} y1="14" x2={x} y2="145" stroke={C.gold} strokeWidth="1.5" opacity="0.4"/>)}
          {comps.map(comp=>{
            const isF=flooded.includes(comp.id),isSl=sel===comp.id,isEng=comp.id==="engine";
            return <g key={comp.id} onClick={()=>setSel(isSl?null:comp.id)} style={{cursor:"pointer"}}>
              <rect x={comp.x} y={20} width={comp.w} height={118} rx={3}
                fill={isF?"rgba(26,111,212,0.55)":isSl?"rgba(77,166,255,0.1)":"rgba(255,255,255,0.03)"}
                stroke={isF?C.blue2:isSl?C.blue2:"rgba(255,255,255,0.12)"} strokeWidth={isF||isSl?2:0.8}/>
              {isF&&<rect x={comp.x+1} y={60} width={comp.w-2} height={77} rx={2} fill="rgba(26,111,212,0.45)"><animate attributeName="y" values="60;52;60" dur="2s" repeatCount="indefinite"/></rect>}
              <text x={comp.x+comp.w/2} y={68} textAnchor="middle" fontSize="7" fill={isF?C.white:C.muted} fontWeight="600">{comp.label[lang]||comp.label.fr}</text>
              {isF&&<text x={comp.x+comp.w/2} y={85} textAnchor="middle" fontSize="12">💧</text>}
              {isEng&&!isF&&<text x={comp.x+comp.w/2} y={85} textAnchor="middle" fontSize="10">⚙️</text>}
            </g>;
          })}
        </g>
      </svg>

      {flooded.length>0&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:isSinking?"rgba(192,57,43,0.18)":Math.abs(listAngle)>10?"rgba(230,126,34,0.12)":"rgba(26,111,212,0.12)",border:`1px solid ${isSinking?C.red:Math.abs(listAngle)>10?C.orange:C.blue2}44`,fontSize:11,lineHeight:1.7}}>
        <div style={{fontWeight:700,color:isSinking?C.red:Math.abs(listAngle)>10?C.orange:C.blue2,marginBottom:4}}>
          {isSinking?(lang==="fr"?"💥 NAUFRAGE — flottabilité de réserve épuisée":lang==="en"?"💥 SINKING — reserve buoyancy gone":lang==="es"?"💥 HUNDIMIENTO — flotabilidad agotada":"💥 NAUFRÁGIO — flutuabilidade esgotada")
          :lang==="fr"?"📐 Effet sur la stabilité :":lang==="en"?"📐 Effect on stability:":lang==="es"?"📐 Efecto en la estabilidad:":"📐 Efeito na estabilidade:"}
        </div>
        <div style={{color:C.white}}>
          {isSinking?(lang==="fr"?"3+ compartiments → le navire coule. SOLAS non respecté.":lang==="en"?"3+ flooded → vessel sinks. SOLAS violated.":lang==="es"?"3+ compartimentos → el buque se hunde. SOLAS violado.":"3+ inundados → o navio afunda. SOLAS violado.")
          :lang==="fr"?`Gîte ${Math.abs(listAngle).toFixed(0)}° vers ${listAngle>0?"tribord":"bâbord"}. ${Math.abs(listAngle)>15?"DANGEREUX — risque de chavirement !":Math.abs(listAngle)>8?"Gîte importante — prudence.":"Gîte modérée — navire stable."}`
          :lang==="en"?`${Math.abs(listAngle).toFixed(0)}° list to ${listAngle>0?"starboard":"port"}. ${Math.abs(listAngle)>15?"DANGEROUS — capsizing risk!":Math.abs(listAngle)>8?"Significant list — caution.":"Moderate list — stable."}`
          :lang==="es"?`Escora ${Math.abs(listAngle).toFixed(0)}° a ${listAngle>0?"estribor":"babor"}. ${Math.abs(listAngle)>15?"PELIGROSO — riesgo de zozobra.":Math.abs(listAngle)>8?"Escora importante.":"Escora moderada."}`
          :`Escora ${Math.abs(listAngle).toFixed(0)}° a ${listAngle>0?"estibordo":"bombordo"}. ${Math.abs(listAngle)>15?"PERIGOSO — risco de adornamento.":Math.abs(listAngle)>8?"Escora importante.":"Escora moderada."}`}
        </div>
      </div>}

      <div style={{marginTop:10}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:8}}>{lang==="fr"?"Appuie pour inonder :":lang==="en"?"Tap to flood:":lang==="es"?"Toca para inundar:":"Toque para inundar:"}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {comps.map(comp=>{const isF=flooded.includes(comp.id),isEng=comp.id==="engine";return <button key={comp.id} onClick={()=>toggle(comp.id)} style={{padding:"6px 10px",borderRadius:10,fontSize:10,cursor:"pointer",background:isF?(isEng?"rgba(192,57,43,0.25)":"rgba(26,111,212,0.25)"):"rgba(255,255,255,0.06)",border:`1px solid ${isF?(isEng?C.red:C.blue2):"rgba(255,255,255,0.12)"}`,color:isF?(isEng?C.red:C.blue2):C.muted,fontWeight:isF?700:400}}>{isF?"💧 ":""}{comp.label[lang]||comp.label.fr}</button>;})}
          {flooded.length>0&&<button onClick={()=>{setFlooded([]);setSel(null);}} style={{padding:"6px 10px",borderRadius:10,fontSize:10,cursor:"pointer",background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,fontWeight:700}}>↺ Reset</button>}
        </div>
      </div>

      {selC&&<div style={{marginTop:10,padding:"10px 12px",borderRadius:12,background:"rgba(13,31,60,0.9)",border:`1px solid ${selC.id==="engine"?C.red:C.blue2}33`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:12,fontWeight:700,color:selC.id==="engine"?C.red:C.blue2,marginBottom:4}}>{selC.label[lang]||selC.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line"}}>{selC.desc[lang]||selC.desc.fr}</div>
      </div>}
    </div>
  );
}

function OrgChart({ lang }) {
  const [dept, setDept] = useState("deck");
  const deck = {
    fr:[{g:"👑 CAPITAINE",r:"Commandement absolu",c:C.gold},{g:"🧭 SECOND CAP.",r:"Cargo, stabilité, sécurité",c:C.blue2},{g:"🧭 2ème LIEUT.",r:"Cartes, navigation, médical",c:C.blue2},{g:"🧭 3ème LIEUT.",r:"Incendie, sauvetage",c:C.blue2},{g:"⚓ BOSCO",r:"Chef équipe pont",c:C.teal},{g:"⚓ MATELOT AB",r:"Barre, vigie, entretien",c:C.muted},{g:"⚓ MATELOT OS",r:"Travaux de pont",c:C.muted},{g:"🎓 CADET PONT",r:"Formation embarquée",c:"rgba(240,244,255,0.25)"}],
    en:[{g:"👑 CAPTAIN",r:"Absolute command",c:C.gold},{g:"🧭 CHIEF MATE",r:"Cargo, stability, safety",c:C.blue2},{g:"🧭 2nd OFFICER",r:"Charts, navigation, medical",c:C.blue2},{g:"🧭 3rd OFFICER",r:"Fire & lifesaving",c:C.blue2},{g:"⚓ BOSUN",r:"Deck crew supervisor",c:C.teal},{g:"⚓ ABLE SEAMAN",r:"Helm, lookout, maintenance",c:C.muted},{g:"⚓ ORD. SEAMAN",r:"Deck work",c:C.muted},{g:"🎓 DECK CADET",r:"Trainee officer",c:"rgba(240,244,255,0.25)"}],
    es:[{g:"👑 CAPITÁN",r:"Mando absoluto",c:C.gold},{g:"🧭 1er OFICIAL",r:"Carga, estabilidad, seguridad",c:C.blue2},{g:"🧭 2do OFICIAL",r:"Cartas, navegación, médico",c:C.blue2},{g:"🧭 3er OFICIAL",r:"Incendio y salvamento",c:C.blue2},{g:"⚓ CONTRAMAESTRE",r:"Jefe cubierta",c:C.teal},{g:"⚓ MARINERO AB",r:"Timón, vigía, mantenimiento",c:C.muted},{g:"⚓ MARINERO OS",r:"Trabajos cubierta",c:C.muted},{g:"🎓 CADETE",r:"Prácticas embarcadas",c:"rgba(240,244,255,0.25)"}],
    pt:[{g:"👑 CAPITÃO",r:"Comando absoluto",c:C.gold},{g:"🧭 IMEDIATO",r:"Carga, estabilidade, segurança",c:C.blue2},{g:"🧭 2º OFICIAL",r:"Cartas, navegação, médico",c:C.blue2},{g:"🧭 3º OFICIAL",r:"Incêndio e salvatagem",c:C.blue2},{g:"⚓ MESTRE",r:"Chefe equipe convés",c:C.teal},{g:"⚓ MARINHEIRO AB",r:"Leme, vigia, manutenção",c:C.muted},{g:"⚓ MARINHEIRO OS",r:"Trabalhos de convés",c:C.muted},{g:"🎓 CADETE",r:"Formação embarcada",c:"rgba(240,244,255,0.25)"}],
  };
  const engine = {
    fr:[{g:"👑 CHEF MÉCANICIEN",r:"Responsable machine",c:C.orange},{g:"⚙️ 2ème MÉCANICIEN",r:"Maintenance planifiée",c:C.orange},{g:"⚙️ 3ème MÉCANICIEN",r:"Auxiliaires, électricité",c:C.orange},{g:"⚙️ 4ème MÉCANICIEN",r:"Carburant, citernes",c:C.orange},{g:"⚡ ÉLECTROTECHNICIEN",r:"ETO — électrique, ECDIS",c:C.gold2},{g:"🔧 MÉCANICIEN QUAL.",r:"Maintenance, quarts",c:C.muted},{g:"🛢️ OILER",r:"Graissage, nettoyage",c:C.muted},{g:"🎓 CADET MACHINE",r:"Formation embarquée",c:"rgba(240,244,255,0.25)"}],
    en:[{g:"👑 CHIEF ENGINEER",r:"Responsible for all machinery",c:C.orange},{g:"⚙️ 2nd ENGINEER",r:"Planned maintenance",c:C.orange},{g:"⚙️ 3rd ENGINEER",r:"Auxiliaries, electrical",c:C.orange},{g:"⚙️ 4th ENGINEER",r:"Fuel, tanks",c:C.orange},{g:"⚡ ETO",r:"Electrical, ECDIS, GMDSS",c:C.gold2},{g:"🔧 ABLE SEAFARER",r:"Maintenance, watches",c:C.muted},{g:"🛢️ OILER",r:"Lubrication, cleaning",c:C.muted},{g:"🎓 ENGINE CADET",r:"Trainee engineer",c:"rgba(240,244,255,0.25)"}],
    es:[{g:"👑 JEFE DE MÁQUINAS",r:"Responsable máquinas",c:C.orange},{g:"⚙️ 2do MECÁNICO",r:"Mantenimiento planificado",c:C.orange},{g:"⚙️ 3er MECÁNICO",r:"Auxiliares, electricidad",c:C.orange},{g:"⚙️ 4to MECÁNICO",r:"Combustible, tanques",c:C.orange},{g:"⚡ ELECTROTÉCNICO",r:"Eléctrica, ECDIS, GMDSS",c:C.gold2},{g:"🔧 MECÁNICO CALIF.",r:"Mantenimiento y guardias",c:C.muted},{g:"🛢️ ENGRASADOR",r:"Engrase y limpieza",c:C.muted},{g:"🎓 CADETE MÁQS.",r:"Prácticas embarcadas",c:"rgba(240,244,255,0.25)"}],
    pt:[{g:"👑 CHEFE DE MÁQUINAS",r:"Responsável máquinas",c:C.orange},{g:"⚙️ 2º MECÂNICO",r:"Manutenção planejada",c:C.orange},{g:"⚙️ 3º MECÂNICO",r:"Auxiliares, elétrico",c:C.orange},{g:"⚙️ 4º MECÂNICO",r:"Combustível, tanques",c:C.orange},{g:"⚡ ELETROTÉCNICO",r:"Elétrico, ECDIS, GMDSS",c:C.gold2},{g:"🔧 MECÂNICO QUAL.",r:"Manutenção e quartos",c:C.muted},{g:"🛢️ OILER",r:"Lubrificação, limpeza",c:C.muted},{g:"🎓 CADETE MÁQS.",r:"Formação embarcada",c:"rgba(240,244,255,0.25)"}],
  };
  const roles = dept==="deck"?(deck[lang]||deck.fr):(engine[lang]||engine.fr);
  const tl = {fr:{deck:"🧭 PONT",engine:"⚙️ MACHINE"},en:{deck:"🧭 DECK",engine:"⚙️ ENGINE"},es:{deck:"🧭 PUENTE",engine:"⚙️ MÁQUINAS"},pt:{deck:"🧭 CONVÉS",engine:"⚙️ MÁQUINAS"}}[lang]||{deck:"🧭 DECK",engine:"⚙️ ENGINE"};
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {[["deck",tl.deck],["engine",tl.engine]].map(([k,l])=><button key={k} onClick={()=>setDept(k)} style={{flex:1,padding:"10px 8px",borderRadius:12,fontSize:11,cursor:"pointer",background:dept===k?(k==="deck"?"rgba(77,166,255,0.2)":"rgba(230,126,34,0.2)"):"rgba(255,255,255,0.05)",border:`1.5px solid ${dept===k?(k==="deck"?C.blue2:C.orange):"rgba(255,255,255,0.1)"}`,color:dept===k?(k==="deck"?C.blue2:C.orange):C.muted,fontWeight:dept===k?700:400,fontFamily:"'Nunito',sans-serif"}}>{l}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {roles.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:12,background:`${r.c}11`,border:`1px solid ${r.c}33`,marginLeft:i===0?0:i<=3?0:i===4?8:i<=6?16:24}}>
          <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:r.c,fontFamily:"'Cinzel',serif"}}>{r.g}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{r.r}</div></div>
          <div style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:`${r.c}22`,color:r.c,flexShrink:0}}>{i===0?"L4":i<=2?"L3":i<=4?"L2":"L1"}</div>
        </div>)}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ DATA
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Tu vois un feu ROUGE la nuit sur ta droite (tribord). Que cela signifie-t-il ?",opts:["Le navire vient de ta droite et a la priorité","Le navire est sur ta gauche — son bâbord te fait face","Le navire est en détresse","Le navire fait marche arrière"],correct:1,expl:"Le feu rouge = feu de BÂBORD. Si tu vois le feu rouge d'un navire sur ton tribord, son côté bâbord est face à toi → le navire est à ta gauche."},
    {q:"Tirant d'eau 12m · Profondeur chenal 14m · UKC min 10%. Peut-on naviguer ?",opts:["Non, trop peu profond","Oui — UKC=2m=16,7% > 10% requis","Non — UKC insuffisant","Oui mais il faut alléger"],correct:1,expl:"UKC = 14-12 = 2m. UKC% = 2÷12×100 = 16,7% > 10% requis. Navigation autorisée."},
    {q:"Que signifie une hauteur métacentrique GM négative ?",opts:["Navire trop chargé","Navire trop léger","Risque de chavirement — M est en dessous de G","Franc-bord insuffisant"],correct:2,expl:"GM = KM - KG. Si GM < 0, M est en dessous de G. Pas de moment de rappel → risque de chavirement. GM minimum réglementaire = 0,15m (IMO)."},
    {q:"Quel est le rôle principal du Second Capitaine (Chief Mate) ?",opts:["Commander le navire","Responsable cargo, stabilité et sécurité","Gérer le département machine","Gérer les communications radio"],correct:1,expl:"Le Second Capitaine est responsable du cargo, des calculs de stabilité, du chargement et est Safety Officer. Il commande en l'absence du capitaine."},
    {q:"Selon SOLAS, le compartimentage consiste à :",opts:["Décorer l'intérieur du navire","Diviser le navire en compartiments étanches pour limiter l'envahissement","Organiser les cabines de l'équipage","Classer les marchandises dangereuses"],correct:1,expl:"Compartimentage = division du navire en compartiments étanches par des cloisons étanches. SOLAS impose que le navire reste à flot avec 1, 2 ou 3 compartiments envahis selon le type. Titanic = conçu pour 4 → 5 ouverts → naufrage."},
  ],
  en:[
    {q:"You see a RED light at night on your right (starboard). What does this mean?",opts:["The vessel comes from your right and has priority","The vessel is on your left — its port side faces you","The vessel is in distress","The vessel is going astern"],correct:1,expl:"Red light = PORT light. If you see a vessel's red light on your starboard, its port side faces you → the vessel is to your left."},
    {q:"Draft 12m · Channel depth 14m · Min UKC 10%. Can we navigate?",opts:["No, too shallow","Yes — UKC=2m=16.7% > 10% required","No — insufficient UKC","Yes but lighten cargo"],correct:1,expl:"UKC = 14-12 = 2m. UKC% = 2÷12×100 = 16.7% > 10% required. Navigation permitted."},
    {q:"What does a negative metacentric height GM mean?",opts:["Vessel is overloaded","Vessel is too light","Capsizing risk — M is below G","Insufficient freeboard"],correct:2,expl:"GM = KM - KG. If GM < 0, M is below G. No righting moment → capsizing risk. Minimum GM = 0.15m (IMO)."},
    {q:"What is the main role of the Chief Mate?",opts:["Command the vessel","Responsible for cargo, stability and safety","Manage engine department","Manage radio communications"],correct:1,expl:"The Chief Mate is responsible for cargo, stability calculations, loading operations and is Safety Officer. Takes command in the Captain's absence."},
    {q:"According to SOLAS, compartmentalization means:",opts:["Decorating the vessel interior","Dividing the vessel into watertight compartments to limit flooding","Organizing crew cabins","Classifying dangerous goods"],correct:1,expl:"Compartmentalization = dividing the vessel into watertight compartments by watertight bulkheads. SOLAS requires the vessel to float with 1-3 compartments flooded. Titanic: designed for 4 → 5 opened → sank."},
  ],
  es:[
    {q:"Ves una luz ROJA de noche a tu derecha (estribor). ¿Qué significa?",opts:["El buque viene de tu derecha y tiene prioridad","El buque está a tu izquierda — su babor te da la cara","El buque está en peligro","El buque va hacia atrás"],correct:1,expl:"Luz roja = luz de BABOR. Si ves la luz roja de un buque a tu estribor, su babor está frente a ti → el buque está a tu izquierda."},
    {q:"Calado 12m · Profundidad canal 14m · UKC mín 10%. ¿Se puede navegar?",opts:["No, muy poco profundo","Sí — UKC=2m=16,7% > 10% requerido","No — UKC insuficiente","Sí pero hay que aligerar"],correct:1,expl:"UKC = 14-12 = 2m. UKC% = 2÷12×100 = 16,7% > 10% requerido. Navegación permitida."},
    {q:"¿Qué significa una altura metacéntrica GM negativa?",opts:["Buque sobrecargado","Buque demasiado ligero","Riesgo de zozobra — M por debajo de G","Franco bordo insuficiente"],correct:2,expl:"GM = KM - KG. Si GM < 0, M está por debajo de G. Sin momento adrizante → riesgo de zozobra. GM mínimo = 0,15m (OMI)."},
    {q:"¿Cuál es el papel principal del Primer Oficial (Chief Mate)?",opts:["Comandar el buque","Responsable de carga, estabilidad y seguridad","Gestionar el departamento de máquinas","Gestionar las comunicaciones"],correct:1,expl:"El Primer Oficial es responsable de la carga, cálculos de estabilidad y es el Safety Officer. Asume el mando en ausencia del capitán."},
    {q:"Según SOLAS, el compartimentado consiste en:",opts:["Decorar el interior del buque","Dividir el buque en compartimentos estancos para limitar la inundación","Organizar las cabinas de la tripulación","Clasificar las mercancías peligrosas"],correct:1,expl:"Compartimentado = división del buque en compartimentos estancos por mamparos estancos. SOLAS exige que el buque permanezca a flote con 1-3 compartimentos inundados. Titanic: diseñado para 4 → 5 abiertos → hundimiento."},
  ],
  pt:[
    {q:"Você vê uma luz VERMELHA à noite à sua direita (estibordo). O que significa?",opts:["O navio vem da sua direita e tem prioridade","O navio está à sua esquerda — seu bombordo está voltado para você","O navio está em perigo","O navio está em marcha-ré"],correct:1,expl:"Luz vermelha = luz de BOMBORDO. Se você vê a luz vermelha de um navio à sua direita, seu bombordo está voltado para você → o navio está à sua esquerda."},
    {q:"Calado 12m · Profundidade canal 14m · UKC mín 10%. Pode-se navegar?",opts:["Não, muito raso","Sim — UKC=2m=16,7% > 10% mínimo","Não — UKC insuficiente","Sim mas aligeirar a carga"],correct:1,expl:"UKC = 14-12 = 2m. UKC% = 2÷12×100 = 16,7% > 10% mínimo. Navegação permitida."},
    {q:"O que significa uma altura metacêntrica GM negativa?",opts:["Navio sobrecarregado","Navio muito leve","Risco de adornamento — M está abaixo de G","Bordo livre insuficiente"],correct:2,expl:"GM = KM - KG. Se GM < 0, M está abaixo de G. Sem momento de endireitamento → risco de tombamento. GM mínimo = 0,15m (IMO)."},
    {q:"Qual é o papel principal do Imediato (Chief Mate)?",opts:["Comandar o navio","Responsável pela carga, estabilidade e segurança","Gerir o departamento de máquinas","Gerir as comunicações de rádio"],correct:1,expl:"O Imediato é responsável pela carga, cálculos de estabilidade e é o Safety Officer. Assume o comando na ausência do capitão."},
    {q:"Segundo o SOLAS, a compartimentagem consiste em:",opts:["Decorar o interior do navio","Dividir o navio em compartimentos estanques para limitar a inundação","Organizar as cabines da tripulação","Classificar as mercadorias perigosas"],correct:1,expl:"Compartimentagem = divisão do navio em compartimentos estanques por anteparas estanques. O SOLAS exige que o navio flutue com 1-3 compartimentos inundados. Titanic: projetado para 4 → 5 abertos → naufrágio."},
  ],
};

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?150:fs===3?100:50;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"📚 Navigation & Cartographie · Leçon 2/8 · 🆓 Gratuit · 150 XP",
      title:"Anatomie & Connaissance du Navire",
      intro:"Un marin qui ne connaît pas son navire est comme un conducteur qui ne connaît pas sa voiture — sauf qu'en mer, l'ignorance peut coûter des vies.\n\nCette leçon couvre tout : orientation, tirant d'eau, stabilité, types de navires, rôles à bord et compartimentage SOLAS.",
      p1:"PARTIE 1 — ORIENTATION & STRUCTURE",
      s1t:"Tribord, Bâbord, Proue, Poupe",
      s1:"TRIBORD = Droite → Feu VERT\nBÂBORD = Gauche → Feu ROUGE\nPROUE = Avant · POUPE = Arrière\n\nMnémo : 'TriborD = Droite — les deux finissent par D'\n\nFeux de navigation (COLREG) :\nVert (tribord) · Rouge (bâbord) · Blanc (poupe) · Blanc de tête de mât\n\nRègle la nuit : feu rouge du navire = son bâbord te fait face",
      p2:"PARTIE 2 — TIRANT D'EAU & PLIMSOLL",
      s2t:"Tirant d'eau, Assiette et Marques Plimsoll",
      s2:"TIRANT D'EAU = profondeur sous la flottaison\nUKC minimum = 10% du tirant d'eau\nAssiette = Tr arrière - Tr avant\n\nMarques Plimsoll (1876) :\nTF (Tropical Fresh) · F (Fresh) · T (Tropical)\nS (Summer) · W (Winter) · WNA (Winter North Atlantic)\n\nEau plus froide et salée → plus dense → navire flotte plus haut → peut charger plus",
      p3:"PARTIE 3 — GOUVERNAIL & BARRE",
      s3t:"Ordres de barre et angles",
      s3:"Barre à droite → proue tourne à tribord\nAngles : 0° (barre zéro) à ±35° (barre toute)\n\nOrdres essentiels :\n'Barre toute tribord !' → +35°\n'Barre zéro !' → 0°\n'Ainsi !' → Maintenir le cap\n'Contre la barre !' → Côté opposé",
      p4:"PARTIE 4 — STABILITÉ",
      s4t:"GM, Métacentre et Stabilité",
      s4:"G = Centre de Gravité · M = Métacentre\nGM = KM - KG\n✅ GM > 0 → Stable · ❌ GM < 0 → Danger de chavirement\nGM minimum = 0,15m (IMO)\n\nG bas = stable (minerai, vrac lourd)\nG haut = instable (conteneurs en pontée, bois)\n\nSurfaces libres : liquide en citerne partielle\n→ Aggrave la gîte → Réduire la stabilité\nSolution : citernes pleines ou vides (jamais à moitié)",
      p5:"PARTIE 5 — TYPES DE NAVIRES",
      s5t:"Principaux types de navires",
      s5:"Porte-conteneurs : 100 à 24 000 EVP · 18-24 kn\nVraquier : céréales, minerai, charbon · 12-15 kn\nPétrolier VLCC : jusqu'à 320 000 t · 14-16 kn\nGazier LNG : gaz à -162°C · Code IGC\nOSV offshore : AHTS/PSV · bollard pull jusqu'à 300t\nFerry RoRo : véhicules + passagers · Code SOLAS",
      p6:"PARTIE 6 — RÔLES À BORD",
      p7:"PARTIE 7 — COMPARTIMENTAGE SOLAS",
      s7t:"Cloisons étanches et règle de compartimentage",
      s7:"DÉFINITION :\nDivision du navire en compartiments étanches par des CLOISONS ÉTANCHES.\n\nOBJECTIF :\nSi 1 compartiment est envahi → les autres restent secs → navire à flot → évacuation possible.\n\nRÈGLE SOLAS :\n• Standard 1 compartiment : navire reste à flot si 1 envahi\n• Standard 2 compartiments : reste à flot si 2 envahis\n• Standard 3 compartiments : paquebots modernes\n\nTITANIC (1912) :\nConçu pour 4 compartiments envahis.\nL'iceberg en a ouvert 5 → naufrage en 2h40.\n→ Exemple parfait du dépassement de la limite SOLAS.\n\nPORTES ÉTANCHES :\n• Fermeture OBLIGATOIRE en mer\n• Herald of Free Enterprise (1987) :\n  Parti port ouvert → 193 morts → Création du Code ISM",
      sumT:"RÉSUMÉ — LEÇON 2",
      sumP:["Tribord=Droite(vert) · Bâbord=Gauche(rouge)","UKC minimum=10% · Marques Plimsoll (TF→WNA)","Barre droite → proue droite · Barre toute = 35°","GM=KM-KG · GM>0=stable · GM min=0,15m","Surfaces libres → aggravent la gîte","Rôles : Cadet→AB→Bosco→Lieutenant→Second→Capitaine","Machine : Oiler→Mécan.→OICM→2ème→Chef Mécanicien","Compartimentage SOLAS · Titanic · Portes étanches"],
      learnedP:["Tribord=Droite(vert) · Bâbord=Gauche(rouge)","UKC 10% · Marques Plimsoll","GM>0=stable · Surfaces libres=danger","Cadet→AB→Bosco→Second→Capitaine","Oiler→Mécanicien→Chef Mécanicien","Compartimentage SOLAS · Titanic · Herald"],
    },
    en:{
      badge:"📚 Navigation & Cartography · Lesson 2/8 · 🆓 Free · 150 XP",
      title:"Ship Anatomy & Knowledge",
      intro:"A mariner who doesn't know their ship is like a driver who doesn't know their car — at sea, ignorance can cost lives.\n\nThis lesson covers everything: orientation, draft, stability, vessel types, crew roles and SOLAS compartmentalization.",
      p1:"PART 1 — ORIENTATION & STRUCTURE",
      s1t:"Starboard, Port, Bow, Stern",
      s1:"STARBOARD = Right → GREEN light\nPORT = Left → RED light\nBOW = Forward · STERN = Aft\n\nMemory: StarboarD = Right — both end in D\n\nNavigation lights (COLREG):\nGreen (starboard) · Red (port) · White (stern) · White masthead\n\nNight rule: vessel's red light = its port side faces you",
      p2:"PART 2 — DRAFT & PLIMSOLL",
      s2t:"Draft, Trim and Plimsoll Marks",
      s2:"DRAFT = depth below the waterline\nMinimum UKC = 10% of draft\nTrim = Aft draft - Fore draft\n\nPlimsoll marks (1876):\nTF · F · T · S · W · WNA\n\nColder, saltier water → denser → vessel floats higher → can carry more cargo",
      p3:"PART 3 — RUDDER & HELM",
      s3t:"Helm orders and angles",
      s3:"Helm right → bow turns starboard\nAngles: 0° (midships) to ±35° (hard over)\n\nEssential orders:\n'Hard to starboard!' → +35°\n'Midships!' → 0°\n'Steady!' → Hold heading\n'Meet her!' → Counter the swing",
      p4:"PART 4 — STABILITY",
      s4t:"GM, Metacentre and Stability",
      s4:"G = Centre of Gravity · M = Metacentre\nGM = KM - KG\n✅ GM > 0 → Stable · ❌ GM < 0 → Capsizing danger\nMinimum GM = 0.15m (IMO)\n\nG low = stable (ore, bulk)\nG high = unstable (deck cargo, containers)\n\nFree surfaces: liquid in partial tank\n→ Worsens list → Reduces stability\nSolution: tanks full or empty (never half)",
      p5:"PART 5 — VESSEL TYPES",
      s5t:"Main vessel types",
      s5:"Container ship: 100 to 24,000 TEU · 18-24 kn\nBulk Carrier: grain, ore, coal · 12-15 kn\nVLCC Tanker: up to 320,000t · 14-16 kn\nLNG Carrier: gas at -162°C · IGC Code\nOffshore OSV: AHTS/PSV · bollard pull up to 300t\nRoRo Ferry: vehicles + passengers · SOLAS Code",
      p6:"PART 6 — CREW ROLES",
      p7:"PART 7 — SOLAS COMPARTMENTALIZATION",
      s7t:"Watertight bulkheads and compartmentalization rule",
      s7:"DEFINITION:\nDividing the vessel into watertight compartments by WATERTIGHT BULKHEADS.\n\nOBJECTIVE:\nIf 1 compartment floods → others stay dry → vessel afloat → evacuation possible.\n\nSOLAS RULE:\n• 1-compartment standard: floats with 1 flooded\n• 2-compartment standard: floats with 2 flooded\n• 3-compartment standard: modern passenger ships\n\nTITANIC (1912):\nDesigned for 4 compartments flooded.\nIceberg opened 5 → sank in 2h40.\n→ Perfect example of exceeding the SOLAS limit.\n\nWATERTIGHT DOORS:\n• MANDATORY closure at sea\n• Herald of Free Enterprise (1987):\n  Left port with doors open → 193 deaths → ISM Code created",
      sumT:"SUMMARY — LESSON 2",
      sumP:["Starboard=Right(green) · Port=Left(red)","Min UKC=10% · Plimsoll marks (TF→WNA)","Helm right→bow right · Hard over = 35°","GM=KM-KG · GM>0=stable · Min GM=0.15m","Free surfaces worsen list","Roles: Cadet→AB→Bosun→Officer→Chief Mate→Captain","Engine: Oiler→Engineer→EOOW→2nd→Chief Engineer","SOLAS compartmentalization · Titanic · Watertight doors"],
      learnedP:["Starboard=Right(green) · Port=Left(red)","UKC 10% · Plimsoll marks","GM>0=stable · Free surfaces=danger","Cadet→AB→Bosun→Chief Mate→Captain","Oiler→Engineer→Chief Engineer","SOLAS compartmentalization · Titanic · Herald"],
    },
    es:{
      badge:"📚 Navegación & Cartografía · Lección 2/8 · 🆓 Gratis · 150 XP",
      title:"Anatomía & Conocimiento del Buque",
      intro:"Un marino que no conoce su buque es como un conductor que no conoce su coche — en el mar, la ignorancia puede costar vidas.",
      p1:"PARTE 1 — ORIENTACIÓN & ESTRUCTURA",s1t:"Estribor, Babor, Proa, Popa",s1:"ESTRIBOR = Derecha → Luz VERDE\nBABOR = Izquierda → Luz ROJA\nPROA = Proa · POPA = Popa\n\nRegla nocturna: luz roja del buque = su babor te da la cara",
      p2:"PARTE 2 — CALADO & PLIMSOLL",s2t:"Calado, Asiento y Marcas Plimsoll",s2:"CALADO = profundidad bajo la flotación\nUKC mínimo = 10% del calado\n\nMarcas Plimsoll: TF · F · T · S · W · WNA\n\nAgua más fría y salada → más densa → buque flota más alto",
      p3:"PARTE 3 — TIMÓN",s3t:"Órdenes de timón y ángulos",s3:"Timón a estribor → proa vira a estribor\nÁngulos: 0° a ±35° (todo a banda)\n\nÓrdenes: '¡Todo a estribor!' · '¡Al filo!' · '¡Así!'",
      p4:"PARTE 4 — ESTABILIDAD",s4t:"GM, Metacentro y Estabilidad",s4:"G = Centro de Gravedad · M = Metacentro\nGM = KM - KG\n✅ GM > 0 → Estable · ❌ GM < 0 → Peligro de zozobra\nGM mínimo = 0,15m (OMI)\n\nSuperficies libres → agravan la escora. Solución: tanques llenos o vacíos",
      p5:"PARTE 5 — TIPOS DE BUQUES",s5t:"Principales tipos de buques",s5:"Portacontenedores · Granelero · Petrolero VLCC · Gasero LNG · OSV offshore · Ferry RoRo",
      p6:"PARTE 6 — ROLES A BORDO",p7:"PARTE 7 — COMPARTIMENTADO SOLAS",s7t:"Mamparos estancos y regla de compartimentado",
      s7:"DEFINICIÓN: División del buque en compartimentos estancos por MAMPAROS ESTANCOS.\n\nOBJETIVO: Si 1 compartimento se inunda → los demás siguen secos → el buque permanece a flote.\n\nREGLA SOLAS:\n• Estándar 1 compartimento: flota con 1 inundado\n• Estándar 2 compartimentos: flota con 2 inundados\n• Estándar 3 compartimentos: cruceros modernos\n\nTITANIC (1912): Diseñado para 4 compartimentos. El iceberg abrió 5 → hundimiento.\n\nPUERTAS ESTANCAS: Cierre OBLIGATORIO en el mar. Herald of Free Enterprise (1987): zarpó con puertas abiertas → 193 muertos → Código ISM.",
      sumT:"RESUMEN — LECCIÓN 2",sumP:["Estribor=Derecha(verde) · Babor=Izquierda(roja)","UKC mín=10% · Marcas Plimsoll","Timón derecha→proa derecha · Todo a banda=35°","GM=KM-KG · GM>0=estable · GM mín=0,15m","Superficies libres agravan la escora","Cadete→AB→Contramaestre→Oficial→1er Oficial→Capitán","Engrasador→Mecánico→OMCV→2º→Jefe Máquinas","Compartimentado SOLAS · Titanic · Puertas estancas"],
      learnedP:["Estribor=Derecha(verde) · Babor=Izquierda(roja)","UKC 10% · Marcas Plimsoll","GM>0=estable · Superficies libres=peligro","Cadete→AB→Contramaestre→Capitán","Engrasador→Mecánico→Jefe de Máquinas","Compartimentado SOLAS · Titanic · Herald"],
    },
    pt:{
      badge:"📚 Navegação & Cartografia · Lição 2/8 · 🆓 Grátis · 150 XP",
      title:"Anatomia & Conhecimento do Navio",
      intro:"Um marinheiro que não conhece o seu navio é como um condutor que não conhece o seu carro — no mar, a ignorância pode custar vidas.",
      p1:"PARTE 1 — ORIENTAÇÃO & ESTRUTURA",s1t:"Estibordo, Bombordo, Proa, Popa",s1:"ESTIBORDO = Direita → Luz VERDE\nBOMBORDO = Esquerda → Luz VERMELHA\nPROA = Proa · POPA = Popa\n\nRegra noturna: luz vermelha do navio = seu bombordo está voltado para você",
      p2:"PARTE 2 — CALADO & PLIMSOLL",s2t:"Calado, Assentamento e Marcas Plimsoll",s2:"CALADO = profundidade abaixo da flutuação\nUKC mínimo = 10% do calado\n\nMarcas Plimsoll: TF · F · T · S · W · WNA\n\nÁgua mais fria e salgada → mais densa → navio flutua mais alto",
      p3:"PARTE 3 — LEME",s3t:"Ordens de leme e ângulos",s3:"Leme a estibordo → proa vira a estibordo\nÂngulos: 0° a ±35° (todo o leme)\n\nOrdens: 'Todo o leme a estibordo!' · 'Leme ao meio!' · 'Assim!'",
      p4:"PARTE 4 — ESTABILIDADE",s4t:"GM, Metacentro e Estabilidade",s4:"G = Centro de Gravidade · M = Metacentro\nGM = KM - KG\n✅ GM > 0 → Estável · ❌ GM < 0 → Perigo de adornamento\nGM mínimo = 0,15m (IMO)\n\nSuperfícies livres → agravam a escora. Solução: tanques cheios ou vazios",
      p5:"PARTE 5 — TIPOS DE NAVIOS",s5t:"Principais tipos de navios",s5:"Porta-contentores · Graneleiro · Petroleiro VLCC · Gaseiro LNG · OSV offshore · Ferry RoRo",
      p6:"PARTE 6 — FUNÇÕES A BORDO",p7:"PARTE 7 — COMPARTIMENTAGEM SOLAS",s7t:"Anteparas estanques e regra de compartimentagem",
      s7:"DEFINIÇÃO: Divisão do navio em compartimentos estanques por ANTEPARAS ESTANQUES.\n\nOBJETIVO: Se 1 compartimento inunda → os outros ficam secos → navio a flutuar.\n\nREGRA SOLAS:\n• Padrão 1 compartimento: flutua com 1 inundado\n• Padrão 2 compartimentos: flutua com 2 inundados\n• Padrão 3 compartimentos: navios de cruzeiro modernos\n\nTITANIC (1912): Projetado para 4 compartimentos. O iceberg abriu 5 → afundou.\n\nPORTAS ESTANQUES: Fecho OBRIGATÓRIO no mar. Herald of Free Enterprise (1987): saiu com portas abertas → 193 mortos → Código ISM.",
      sumT:"RESUMO — LIÇÃO 2",sumP:["Estibordo=Direita(verde) · Bombordo=Esquerda(verm.)","UKC mín=10% · Marcas Plimsoll","Leme direita→proa direita · Todo o leme=35°","GM=KM-KG · GM>0=estável · GM mín=0,15m","Superfícies livres agravam a escora","Cadete→AB→Mestre→Oficial→Imediato→Capitão","Oiler→Mecânico→OMCV→2º→Chefe Máquinas","Compartimentagem SOLAS · Titanic · Portas estanques"],
      learnedP:["Estibordo=Direita(verde) · Bombordo=Esquerda(verm.)","UKC 10% · Marcas Plimsoll","GM>0=estável · Superfícies livres=perigo","Cadete→AB→Mestre→Imediato→Capitão","Oiler→Mecânico→Chefe de Máquinas","Compartimentagem SOLAS · Titanic · Herald"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonNavire({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* TOP BAR */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>Leçon 2/8</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(30,138,74,0.2)",border:`1px solid ${C.green}44`,color:C.green,fontWeight:700}}>🆓 FREE</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.blue2},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      {/* SCROLL */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(30,138,74,0.15)",border:`1px solid ${C.green}44`,fontSize:11,color:C.green,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🧭" text={lc.p1}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚢 {lang==="fr"?"VUE DE DESSUS":lang==="en"?"TOP VIEW":lang==="es"?"VISTA SUPERIOR":"VISTA SUPERIOR"}</div><ShipTopView lang={lang}/></Card>

            <SL icon="📏" text={lc.p2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📏</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>📊 {lang==="fr"?"MARQUES PLIMSOLL":lang==="en"?"PLIMSOLL MARKS":lang==="es"?"MARCAS PLIMSOLL":"MARCAS PLIMSOLL"}</div><PlimsollSVG/></Card>

            <SL icon="⚓" text={lc.p3}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"GOUVERNAIL INTERACTIF":lang==="en"?"INTERACTIVE HELM":lang==="es"?"TIMÓN INTERACTIVO":"LEME INTERATIVO"}</div><HelmSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p4}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚖️ {lang==="fr"?"STABILITÉ — G, M, GM":lang==="en"?"STABILITY — G, M, GM":lang==="es"?"ESTABILIDAD":"ESTABILIDADE"}</div><StabilitySVG lang={lang}/></Card>

            <SL icon="🚢" text={lc.p5}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚢</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="👥" text={lc.p6}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👥 {lang==="fr"?"ORGANIGRAMME":lang==="en"?"ORG CHART":lang==="es"?"ORGANIGRAMA":"ORGANOGRAMA"}</div><OrgChart lang={lang}/></Card>

            <SL icon="🔒" text={lc.p7} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔒</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`,background:"linear-gradient(135deg,rgba(192,57,43,0.06),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔒 {lang==="fr"?"COMPARTIMENTAGE INTERACTIF — GÎTE EN TEMPS RÉEL":lang==="en"?"INTERACTIVE COMPARTMENTS — REAL-TIME LIST":lang==="es"?"COMPARTIMENTADO — ESCORA EN TIEMPO REAL":"COMPARTIMENTAGEM — ESCORA EM TEMPO REAL"}</div><CompartmentSVG lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>{lang==="fr"?"Quiz — Le Navire":lang==="en"?"Quiz — The Ship":lang==="es"?"Quiz — El Buque":"Quiz — O Navio"}</div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2":lang==="en"?"questions · Lesson 2":lang==="es"?"preguntas · Lección 2":"perguntas · Lição 2"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?150:quizScore===3?100:50} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — LA TERRE & COORDONNÉES →":lang==="en"?"LESSON 3 — EARTH & COORDINATES →":lang==="es"?"LECCIÓN 3 — LA TIERRA & COORDENADAS →":"LIÇÃO 3 — A TERRA & COORDENADAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
