import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

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
      <text x="200" y="80" fill={C.green} fontSize="7">{lang==="fr"?"Feu VERT ▶":lang==="en"?"GREEN light ▶":lang==="es"?"Luz VERDE ▶":"Luz VERDE ▶"}</text>
      <rect x="38" y="50" width="96" height="48" rx="8" fill="rgba(192,57,43,0.2)" stroke={C.red} strokeWidth="1"/>
      <circle cx="55" cy="63" r="5" fill={C.red}/>
      <text x="68" y="67" fill={C.red} fontSize="10" fontWeight="bold">{lang==="fr"?"BÂBORD":lang==="en"?"PORT":lang==="es"?"BABOR":"BOMBORDO"}</text>
      <text x="68" y="80" fill={C.red} fontSize="7">{lang==="fr"?"Feu ROUGE ◀":lang==="en"?"RED light ◀":lang==="es"?"Luz ROJA ◀":"Luz VERMELHA ◀"}</text>
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
function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
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

// ══ SHIP TYPES CAROUSEL (merged) ══
// ══════════════════════════════════════
// SVG SHIPS — each vessel drawn in code
// ══════════════════════════════════════

function ContainerShipSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      {/* Water */}
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M15,88 L20,70 L240,70 L250,88 Z" fill="#1a3a5c" stroke={C.gold} strokeWidth="1.5"/>
      {/* Containers stacks */}
      {[
        {x:30,y:36,w:30,h:14,c:"#e74c3c"},{x:62,y:36,w:30,h:14,c:"#3498db"},
        {x:94,y:36,w:30,h:14,c:"#2ecc71"},{x:126,y:36,w:30,h:14,c:"#f39c12"},
        {x:158,y:36,w:30,h:14,c:"#9b59b6"},{x:190,y:36,w:30,h:14,c:"#e74c3c"},
        {x:30,y:50,w:30,h:14,c:"#3498db"},{x:62,y:50,w:30,h:14,c:"#e74c3c"},
        {x:94,y:50,w:30,h:14,c:"#f39c12"},{x:126,y:50,w:30,h:14,c:"#2ecc71"},
        {x:158,y:50,w:30,h:14,c:"#9b59b6"},{x:190,y:50,w:30,h:14,c:"#3498db"},
        {x:30,y:64,w:30,h:8,c:"#2ecc71"},{x:62,y:64,w:30,h:8,c:"#e74c3c"},
        {x:94,y:64,w:30,h:8,c:"#3498db"},{x:126,y:64,w:30,h:8,c:"#f39c12"},
        {x:158,y:64,w:30,h:8,c:"#e74c3c"},{x:190,y:64,w:30,h:8,c:"#2ecc71"},
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} rx="1" opacity="0.9"/>
          <line x1={b.x+b.w/2} y1={b.y} x2={b.x+b.w/2} y2={b.y+b.h} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8"/>
          <line x1={b.x} y1={b.y+b.h/2} x2={b.x+b.w} y2={b.y+b.h/2} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8"/>
        </g>
      ))}
      {/* Bridge */}
      <rect x="205" y="46" width="30" height="24" fill="#2c3e50" stroke={C.gold} strokeWidth="1"/>
      <rect x="208" y="48" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="218" y="48" width="8" height="6" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Mast */}
      <line x1="220" y1="20" x2="220" y2="46" stroke={C.muted} strokeWidth="1.5"/>
      <line x1="215" y1="28" x2="235" y2="28" stroke={C.muted} strokeWidth="1"/>
      {/* Bow */}
      <polygon points="15,88 20,70 8,88" fill="#112240"/>
      {/* Waterline reflection */}
      <path d="M20,92 Q130,95 250,92" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    </svg>
  );
}

function BulkCarrierSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wider and lower */}
      <path d="M10,88 L18,68 L242,68 L252,88 Z" fill="#8B4513" stroke={C.gold} strokeWidth="1.5"/>
      {/* Main deck */}
      <rect x="18" y="60" width="224" height="8" fill="#A0522D"/>
      {/* Cargo holds (open) */}
      {[20,80,140,190].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={30} width={48} height={30} fill="#2c1810" stroke="#5D4037" strokeWidth="1.5"/>
          {/* Grain/ore texture */}
          <ellipse cx={x+24} cy={52} rx={20} ry={5} fill="#8B6914" opacity="0.8"/>
          <ellipse cx={x+24} cy={49} rx={18} ry={4} fill="#A0832A" opacity="0.7"/>
        </g>
      ))}
      {/* Hatch covers (some open, some closed) */}
      {[20,140].map((x,i)=>(
        <rect key={i} x={x} y={30} width={48} height={5} fill="#607D8B" opacity="0.5"/>
      ))}
      {/* Bridge aft */}
      <rect x="210" y="38" width="28" height="22" fill="#37474F" stroke={C.gold} strokeWidth="1"/>
      <rect x="213" y="40" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="222" y="40" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Cranes */}
      {[50,110,170].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={22} width={3} height={38} fill="#90A4AE"/>
          <line x1={x+1.5} y1={22} x2={x+20} y2={30} stroke="#90A4AE" strokeWidth="1.5"/>
          <line x1={x+20} y1={30} x2={x+20} y2={45} stroke="#90A4AE" strokeWidth="1" strokeDasharray="2,1"/>
        </g>
      ))}
      {/* Funnel */}
      <rect x="225" y="28" width="10" height="12" fill="#455A64" rx="2"/>
      <rect x="223" y="26" width="14" height="4" fill="#546E7A" rx="1"/>
      {/* Smoke */}
      <ellipse cx="230" cy="22" rx="5" ry="3" fill="rgba(180,180,180,0.3)"/>
    </svg>
  );
}

function TankerSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - very long and low */}
      <path d="M8,88 L16,72 L248,72 L255,88 Z" fill="#1a1a2e" stroke={C.orange} strokeWidth="1.5"/>
      {/* Main deck - flat and long */}
      <rect x="16" y="64" width="232" height="8" fill="#16213e"/>
      {/* Pipelines on deck */}
      {[0,1,2].map(i=>(
        <rect key={i} x="25" y={66+i*1.5} width="210" height="1" fill={C.orange} opacity={0.6-i*0.15}/>
      ))}
      {/* Tank domes */}
      {[35,70,105,140,175,210].map((x,i)=>(
        <g key={i}>
          <ellipse cx={x} cy={64} rx={14} ry={4} fill="#0d3b6e" stroke={C.orange} strokeWidth="0.8"/>
          <circle cx={x} cy={63} r={3} fill={C.orange} opacity="0.7"/>
        </g>
      ))}
      {/* Bridge aft */}
      <rect x="218" y="42" width="28" height="22" fill="#0d2137" stroke={C.orange} strokeWidth="1"/>
      <rect x="221" y="44" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="230" y="44" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Bridge wings */}
      <rect x="212" y="52" width="42" height="4" fill="#0d2137" stroke={C.orange} strokeWidth="0.5"/>
      {/* Funnel */}
      <rect x="228" y="30" width="10" height="14" fill="#1a3a5c" rx="2"/>
      <text x="233" y="26" textAnchor="middle" fontSize="8" fill={C.orange}>🔴</text>
      {/* Gangway */}
      <line x1="218" y1="64" x2="16" y2="64" stroke={C.orange} strokeWidth="0.5" strokeDasharray="4,3" opacity="0.4"/>
      {/* VLCC label */}
      <rect x="60" y="74" width="32" height="10" rx="3" fill="rgba(230,126,34,0.2)" stroke={C.orange} strokeWidth="0.5"/>
      <text x="76" y="82" textAnchor="middle" fontSize="7" fill={C.orange} fontWeight="bold">VLCC</text>
    </svg>
  );
}

function LNGCarrierSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M12,88 L20,70 L244,70 L252,88 Z" fill="#0d2b47" stroke={C.teal} strokeWidth="1.5"/>
      {/* Deck */}
      <rect x="20" y="62" width="224" height="8" fill="#0a2235"/>
      {/* LNG Spherical tanks — Moss Rosenberg type */}
      {[55,110,165,220].map((cx,i)=>(
        <g key={i}>
          {/* Tank support */}
          <rect x={cx-18} y={62} width={36} height={12} fill="#0a2235"/>
          {/* Sphere */}
          <circle cx={cx} cy={46} r={22} fill={`rgba(10,138,108,${0.4+i*0.05})`} stroke={C.teal} strokeWidth="1.5"/>
          {/* Sphere shine */}
          <ellipse cx={cx-7} cy={38} rx={7} ry={5} fill="rgba(255,255,255,0.12)" transform={`rotate(-20,${cx-7},38)`}/>
          {/* Temperature indicator */}
          <circle cx={cx} cy={46} r={4} fill="none" stroke="rgba(77,255,220,0.5)" strokeWidth="0.8"/>
          <text x={cx} y={49} textAnchor="middle" fontSize="5" fill="rgba(77,255,220,0.7)">LNG</text>
        </g>
      ))}
      {/* Bridge */}
      <rect x="212" y="44" width="28" height="18" fill="#0d2137" stroke={C.teal} strokeWidth="1"/>
      <rect x="215" y="46" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      <rect x="224" y="46" width="7" height="5" fill="rgba(77,200,255,0.6)" rx="1"/>
      {/* Funnel */}
      <rect x="224" y="30" width="10" height="15" fill="#0d3b6e" rx="2"/>
      <text x="229" y="27" textAnchor="middle" fontSize="7" fill={C.teal}>❄️</text>
      {/* -162°C label */}
      <rect x="90" y="26" width="42" height="12" rx="4" fill="rgba(10,138,108,0.25)" stroke={C.teal} strokeWidth="0.8"/>
      <text x="111" y="35" textAnchor="middle" fontSize="7" fill={C.teal} fontWeight="bold">-162°C</text>
    </svg>
  );
}

function OffshoreVesselSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wide and flat (PSV) */}
      <path d="M20,88 L28,70 L210,70 L218,88 Z" fill="#1a2a1a" stroke={C.green} strokeWidth="1.5"/>
      {/* Flat cargo deck aft */}
      <rect x="28" y="62" width="130" height="8" fill="#152015"/>
      {/* Deck equipment */}
      {[35,60,85,110,135].map((x,i)=>(
        <g key={i}>
          <rect x={x} y={56} width={18} height={6} fill="#1e3a1e" stroke={C.green} strokeWidth="0.5" rx="1"/>
          <text x={x+9} y={62} textAnchor="middle" fontSize="5" fill={C.green} opacity="0.6">📦</text>
        </g>
      ))}
      {/* Bridge/accommodation forward */}
      <rect x="160" y="40" width="50" height="30" fill="#152515" stroke={C.green} strokeWidth="1"/>
      <rect x="163" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      <rect x="175" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      <rect x="187" y="43" width="10" height="7" fill="rgba(77,200,255,0.5)" rx="1"/>
      {/* DP antenna */}
      <line x1="185" y1="22" x2="185" y2="40" stroke={C.green} strokeWidth="1.5"/>
      <circle cx="185" cy="20" r="4" fill="none" stroke={C.green} strokeWidth="1"/>
      <circle cx="185" cy="20" r="1.5" fill={C.green}/>
      {/* Thrusters */}
      <ellipse cx="30" cy="85" rx="6" ry="3" fill={C.green} opacity="0.6"/>
      <ellipse cx="208" cy="85" rx="6" ry="3" fill={C.green} opacity="0.6"/>
      {/* Tow wire aft (AHTS) */}
      <path d="M28,80 Q10,82 5,88" fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="3,2"/>
      {/* Funnel */}
      <rect x="192" y="30" width="8" height="12" fill="#1a3a1a" rx="2"/>
      {/* DP label */}
      <rect x="155" y="72" width="20" height="10" rx="3" fill="rgba(30,138,74,0.25)" stroke={C.green} strokeWidth="0.5"/>
      <text x="165" y="80" textAnchor="middle" fontSize="6" fill={C.green} fontWeight="bold">DP2</text>
    </svg>
  );
}

function RoRoFerrySVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull */}
      <path d="M15,88 L22,68 L242,68 L250,88 Z" fill="#1a1a3a" stroke={C.blue2} strokeWidth="1.5"/>
      {/* Multiple decks */}
      <rect x="22" y="56" width="220" height="12" fill="#151530"/>
      <rect x="22" y="44" width="220" height="12" fill="#12122a"/>
      <rect x="22" y="32" width="220" height="12" fill="#0f0f24"/>
      {/* Windows row 1 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={58} width={9} height={7} fill="rgba(255,220,100,0.7)" rx="1"/>
      ))}
      {/* Windows row 2 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={46} width={9} height={7} fill="rgba(255,220,100,0.5)" rx="1"/>
      ))}
      {/* Windows row 3 */}
      {Array.from({length:16},(_,i)=>(
        <rect key={i} x={30+i*13} y={34} width={9} height={7} fill="rgba(255,220,100,0.35)" rx="1"/>
      ))}
      {/* Bridge top */}
      <rect x="100" y="20" width="70" height="14" fill="#0d1a3a" stroke={C.blue2} strokeWidth="1"/>
      <rect x="108" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      <rect x="120" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      <rect x="152" y="22" width="10" height="7" fill="rgba(77,200,255,0.7)" rx="1"/>
      {/* Funnels */}
      <rect x="165" y="12" width="12" height="22" fill="#c0392b" rx="2"/>
      <rect x="180" y="12" width="12" height="22" fill="#c0392b" rx="2"/>
      {/* Smoke */}
      <ellipse cx="171" cy="10" rx="5" ry="3" fill="rgba(180,180,180,0.25)"/>
      <ellipse cx="186" cy="10" rx="5" ry="3" fill="rgba(180,180,180,0.25)"/>
      {/* Ramp aft */}
      <polygon points="242,68 255,88 242,88" fill="#0d1a3a" stroke={C.blue2} strokeWidth="1" opacity="0.7"/>
      {/* Car silhouettes on car deck */}
      {[35,65,95,125,155,185].map((x,i)=>(
        <g key={i} opacity="0.4">
          <rect x={x} y={60} width={24} height={6} fill="#607D8B" rx="2"/>
          <circle cx={x+5} cy={66} r={2} fill="#37474F"/>
          <circle cx={x+19} cy={66} r={2} fill="#37474F"/>
        </g>
      ))}
      {/* FERRY label */}
      <rect x="50" y="74" width="28" height="10" rx="3" fill="rgba(26,111,212,0.25)" stroke={C.blue2} strokeWidth="0.5"/>
      <text x="64" y="82" textAnchor="middle" fontSize="6" fill={C.blue2} fontWeight="bold">FERRY</text>
    </svg>
  );
}

function CruiseShipSVG() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Hull - wide */}
      <path d="M12,88 L20,72 L244,72 L252,88 Z" fill="#1a1a2e" stroke={C.gold} strokeWidth="1.5"/>
      {/* Multiple passenger decks */}
      {[62,52,42,32,22].map((y,i)=>(
        <rect key={i} x={20+i*4} y={y} width={224-i*8} height={10} fill={`rgba(20,20,${40+i*8},0.9)`} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      ))}
      {/* Windows — many rows */}
      {[5,4,3,2,1].map((row,ri)=>(
        Array.from({length:18},(_,i)=>(
          <rect key={`${ri}-${i}`}
            x={28+ri*4+i*12} y={64-ri*10}
            width={8} height={6}
            fill={`rgba(255,${200+ri*10},${50+ri*20},${0.6-ri*0.08})`} rx="1"/>
        ))
      ))}
      {/* Pool deck on top */}
      <rect x="80" y="16" width="80" height="8" fill="#1a4a6a" stroke={C.blue2} strokeWidth="0.8"/>
      <ellipse cx="120" cy="20" rx="25" ry="4" fill="rgba(26,111,212,0.4)" stroke={C.blue2} strokeWidth="0.8"/>
      {/* Funnels */}
      <rect x="155" y="8" width="14" height="22" fill="#e74c3c" rx="3"/>
      <rect x="172" y="8" width="14" height="22" fill="#e74c3c" rx="3"/>
      {/* Smoke */}
      <ellipse cx="162" cy="6" rx="6" ry="3" fill="rgba(200,200,200,0.2)"/>
      <ellipse cx="179" cy="6" rx="6" ry="3" fill="rgba(200,200,200,0.2)"/>
      {/* Bow rounded */}
      <path d="M12,88 Q10,80 15,72" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      {/* CRUISE label */}
      <rect x="50" y="76" width="36" height="10" rx="3" fill="rgba(201,146,42,0.2)" stroke={C.gold} strokeWidth="0.5"/>
      <text x="68" y="84" textAnchor="middle" fontSize="6" fill={C.gold} fontWeight="bold">CRUISE</text>
    </svg>
  );
}

function OSVAHTSSvg() {
  return (
    <svg width="260" height="120" viewBox="0 0 260 120">
      <rect width="260" height="120" fill="#061828" rx="8"/>
      <rect x="0" y="88" width="260" height="32" fill="rgba(26,111,212,0.25)"/>
      <path d="M0,88 Q65,84 130,88 Q195,92 260,88" fill="none" stroke={C.blue2} strokeWidth="1" opacity="0.5"/>
      {/* Tugboat hull */}
      <path d="M25,88 Q15,80 18,70 L200,70 L210,88 Z" fill="#2d1a0a" stroke={C.orange} strokeWidth="1.5"/>
      {/* Deck */}
      <rect x="18" y="62" width="182" height="8" fill="#241508"/>
      {/* Towing winch */}
      <rect x="22" y="52" width="35" height="10" fill="#3d2a1a" stroke={C.orange} strokeWidth="1"/>
      <ellipse cx="39" cy="57" rx="12" ry="5" fill="#5d3a1a" stroke={C.orange} strokeWidth="1"/>
      <circle cx="39" cy="57" r="4" fill={C.orange} opacity="0.6"/>
      {/* Tow wire */}
      <path d="M22,57 Q5,65 2,88" fill="none" stroke={C.gold} strokeWidth="2"/>
      {/* Superstructure */}
      <rect x="100" y="38" width="70" height="32" fill="#1a0f05" stroke={C.orange} strokeWidth="1"/>
      {/* Windows */}
      {[108,120,132,144,156].map((x,i)=>(
        <rect key={i} x={x} y={42} width={10} height={7} fill="rgba(77,200,255,0.6)" rx="1"/>
      ))}
      {/* Funnel */}
      <rect x="158" y="26" width="10" height="14" fill="#2d1508" rx="2"/>
      <ellipse cx="163" cy="24" rx="7" ry="4" fill="rgba(180,120,60,0.3)"/>
      {/* Anchor handling equipment */}
      <rect x="185" y="54" width="12" height="16" fill="#3d2a1a" stroke={C.orange} strokeWidth="0.8"/>
      {/* DP system */}
      <circle cx="135" cy="30" r="6" fill="none" stroke={C.orange} strokeWidth="1.5"/>
      <line x1="135" y1="22" x2="135" y2="38" stroke={C.orange} strokeWidth="1"/>
      <line x1="127" y1="30" x2="143" y2="30" stroke={C.orange} strokeWidth="1"/>
      {/* AHTS label */}
      <rect x="60" y="74" width="28" height="10" rx="3" fill="rgba(230,126,34,0.2)" stroke={C.orange} strokeWidth="0.5"/>
      <text x="74" y="82" textAnchor="middle" fontSize="6" fill={C.orange} fontWeight="bold">AHTS</text>
      {/* Bollard pull */}
      <text x="200" y="82" textAnchor="middle" fontSize="7" fill={C.gold}>300t</text>
    </svg>
  );
}

// ══════════════════════════════════════
// SHIP DATA
// ══════════════════════════════════════
const getShips = lang => [
  {
    id:"container",
    icon:"📦",
    name:{fr:"Porte-conteneurs",en:"Container Ship",es:"Portacontenedores",pt:"Porta-contentores"},
    svg:<ContainerShipSVG/>,
    specs:{fr:"Capacité : 100 à 24 000 EVP\nVitesse : 18–24 nœuds\nLongueur : 100–400 m\nExemples : MSC Irina, Ever Given",en:"Capacity: 100 to 24,000 TEU\nSpeed: 18–24 knots\nLength: 100–400 m\nExamples: MSC Irina, Ever Given",es:"Capacidad: 100 a 24.000 TEU\nVelocidad: 18–24 nudos\nLongitud: 100–400 m\nEjemplos: MSC Irina, Ever Given",pt:"Capacidade: 100 a 24.000 TEU\nVelocidade: 18–24 nós\nComprimento: 100–400 m\nExemplos: MSC Irina, Ever Given"},
    desc:{fr:"Transport de marchandises en boîtes standardisées (EVP = Equivalent Vingt Pieds = 20 feet). La coloration des conteneurs n'est pas décorative — chaque armateur a ses couleurs. Ces navires ont révolutionné le commerce mondial depuis les années 1960.",en:"Transport of goods in standardized boxes (TEU = Twenty-foot Equivalent Unit). Container colors identify shipping companies. These vessels revolutionized world trade since the 1960s.",es:"Transporte de mercancías en cajas estandarizadas (TEU = Unidad Equivalente a Veinte Pies). Los colores de los contenedores no son decorativos. Estos buques revolucionaron el comercio mundial desde los años 60.",pt:"Transporte de mercadorias em caixas padronizadas (TEU = Unidade Equivalente a Vinte Pés). Revolucionaram o comércio mundial desde os anos 60."},
    stcw:{fr:"STCW II/1 — Officier de quart (pont)",en:"STCW II/1 — Officer in Charge of a Watch",es:"STCW II/1 — Oficial de guardia de navegación",pt:"STCW II/1 — Oficial de quarto de navegação"},
    color:C.blue2,
  },
  {
    id:"bulk",
    icon:"⛏️",
    name:{fr:"Vraquier",en:"Bulk Carrier",es:"Granelero",pt:"Graneleiro"},
    svg:<BulkCarrierSVG/>,
    specs:{fr:"Cargaison : céréales, minerai, charbon, engrais\nVitesse : 12–15 nœuds\nLongueur : 100–360 m\nHandysize / Panamax / Capesize",en:"Cargo: grain, ore, coal, fertilizers\nSpeed: 12–15 knots\nLength: 100–360 m\nHandysize / Panamax / Capesize",es:"Carga: cereales, mineral, carbón, fertilizantes\nVelocidad: 12–15 nudos\nLongitud: 100–360 m",pt:"Carga: cereais, minério, carvão, fertilizantes\nVelocidade: 12–15 nós\nComprimento: 100–360 m"},
    desc:{fr:"Navire à cales ouvertes pour vrac solide. Les cales ne sont pas divisées — on verse directement les céréales, le minerai ou le charbon. Attention à la stabilité : les vracs denses (minerai) abaissent beaucoup G → navire très raide.",en:"Open-hold vessel for dry bulk cargo. Holds are undivided — grain, ore or coal is poured directly in. Stability note: dense cargo (ore) lowers G significantly → very stiff vessel.",es:"Buque con bodegas abiertas para granel sólido. Ojo a la estabilidad: la carga densa (mineral) baja mucho G → buque muy rígido.",pt:"Navio com porões abertos para granéis sólidos. Atenção à estabilidade: carga densa (minério) baixa muito G → navio muito rígido."},
    stcw:{fr:"STCW II/1 — Officier de quart · STCW II/2 — Capitaine",en:"STCW II/1 — OOW · STCW II/2 — Master",es:"STCW II/1 — OOW · STCW II/2 — Capitán",pt:"STCW II/1 — OOW · STCW II/2 — Capitão"},
    color:C.orange,
  },
  {
    id:"tanker",
    icon:"🛢️",
    name:{fr:"Pétrolier (VLCC)",en:"Oil Tanker (VLCC)",es:"Petrolero (VLCC)",pt:"Petroleiro (VLCC)"},
    svg:<TankerSVG/>,
    specs:{fr:"Capacité : jusqu'à 320 000 tonnes\nVitesse : 14–16 nœuds\nLongueur : jusqu'à 380 m\nVLCC = Very Large Crude Carrier",en:"Capacity: up to 320,000 tonnes\nSpeed: 14–16 knots\nLength: up to 380 m\nVLCC = Very Large Crude Carrier",es:"Capacidad: hasta 320.000 toneladas\nVelocidad: 14–16 nudos\nLongitud: hasta 380 m",pt:"Capacidade: até 320.000 toneladas\nVelocidade: 14–16 nós\nComprimento: até 380 m"},
    desc:{fr:"Transport de pétrole brut. Les VLCC sont parmi les plus grands navires au monde. Réglementation MARPOL stricte : double coque obligatoire. Zones ISM/ISGOTT pour les opérations de chargement/déchargement.",en:"Transport of crude oil. VLCCs are among the world's largest vessels. Strict MARPOL regulations: double hull mandatory. ISGOTT procedures for loading/discharging operations.",es:"Transporte de petróleo crudo. Los VLCC son de los más grandes del mundo. MARPOL estricto: doble casco obligatorio.",pt:"Transporte de petróleo bruto. Os VLCCs são dos maiores do mundo. MARPOL: casco duplo obrigatório."},
    stcw:{fr:"STCW V/1-1 — Formation pétroliers/chimiquiers",en:"STCW V/1-1 — Tanker training (oil/chemical)",es:"STCW V/1-1 — Formación en buques tanque",pt:"STCW V/1-1 — Formação em navios-tanque"},
    color:C.orange,
  },
  {
    id:"lng",
    icon:"❄️",
    name:{fr:"Gazier LNG",en:"LNG Carrier",es:"Buque Gasero LNG",pt:"Gaseiro LNG"},
    svg:<LNGCarrierSVG/>,
    specs:{fr:"Cargaison : gaz naturel liquéfié (-162°C)\nVitesse : 17–19 nœuds\nLongueur : 270–345 m\nCapacité : 125 000 à 266 000 m³",en:"Cargo: liquefied natural gas (-162°C)\nSpeed: 17–19 knots\nLength: 270–345 m\nCapacity: 125,000 to 266,000 m³",es:"Carga: gas natural licuado (-162°C)\nVelocidad: 17–19 nudos\nLongitud: 270–345 m",pt:"Carga: gás natural liquefeito (-162°C)\nVelocidade: 17–19 nós\nComprimento: 270–345 m"},
    desc:{fr:"Le gaz naturel est refroidi à -162°C pour devenir liquide (LNG). Les cuves sphériques (type Moss) ou membranes (GTT) maintiennent cette température. Code IGC obligatoire. La boil-off gas (BOG) peut être utilisée comme carburant.",en:"Natural gas is cooled to -162°C to become liquid (LNG). Spherical (Moss) or membrane (GTT) tanks maintain this temperature. IGC Code mandatory. Boil-off gas (BOG) can be used as fuel.",es:"El gas natural se enfría a -162°C. Los tanques esféricos (Moss) o membranas (GTT) mantienen esa temperatura. Código IGC obligatorio.",pt:"O gás natural é arrefecido a -162°C. Tanques esféricos (Moss) ou membranas (GTT). Código IGC obrigatório."},
    stcw:{fr:"STCW V/1-2 — Formation gaziers",en:"STCW V/1-2 — Gas tanker training",es:"STCW V/1-2 — Formación buques gaseros",pt:"STCW V/1-2 — Formação gaseiros"},
    color:C.teal,
  },
  {
    id:"offshore",
    icon:"⚓",
    name:{fr:"Offshore OSV (AHTS/PSV)",en:"Offshore OSV (AHTS/PSV)",es:"Buque Offshore (AHTS/PSV)",pt:"Offshore OSV (AHTS/PSV)"},
    svg:<OffshoreVesselSVG/>,
    specs:{fr:"AHTS : remorqueur ancrage (Anchor Handling Tug Supply)\nPSV : ravitailleur plateforme (Platform Supply Vessel)\nBollard pull : jusqu'à 300 tonnes\nDynamic Positioning DP2/DP3",en:"AHTS: Anchor Handling Tug Supply\nPSV: Platform Supply Vessel\nBollard pull: up to 300 tonnes\nDynamic Positioning DP2/DP3",es:"AHTS: remolcador manejo anclas\nPSV: buque suministro plataforma\nTracción bollard: hasta 300 t · DP2/DP3",pt:"AHTS: rebocador manuseio âncoras\nPSV: navio abastecimento plataforma\nForça de tração: até 300 t · DP2/DP3"},
    desc:{fr:"Navires spécialisés pour l'industrie pétrolière offshore. Le AHTS pose et récupère les ancres des plateformes semi-submersibles. Le PSV ravitaille en carburant, eau, ciment, drill pipes. DP (Dynamic Positioning) = maintien de position automatique sans ancre.",en:"Specialized vessels for offshore oil industry. AHTS anchors and retrieves semi-submersible platform anchors. PSV supplies fuel, water, cement, drill pipes. DP = automatic position keeping without anchors.",es:"Buques especializados para la industria petrolera offshore. DP = mantenimiento automático de posición sin ancla.",pt:"Navios especializados para a indústria petrolífera offshore. DP = manutenção automática de posição sem âncora."},
    stcw:{fr:"STCW II/1 + DP Basic (NI/Nautical Institute)",en:"STCW II/1 + DP Basic (NI/Nautical Institute)",es:"STCW II/1 + DP Básico (NI/Nautical Institute)",pt:"STCW II/1 + DP Básico (NI/Nautical Institute)"},
    color:C.green,
  },
  {
    id:"ferry",
    icon:"🚗",
    name:{fr:"Ferry / RoRo",en:"Ferry / RoRo",es:"Ferry / RoRo",pt:"Ferry / RoRo"},
    svg:<RoRoFerrySVG/>,
    specs:{fr:"RoRo = Roll-on Roll-off (véhicules)\nCapacité : jusqu'à 7 000 véhicules\nVitesse : 18–28 nœuds (HSC > 30 kn)\nPassagers : jusqu'à 4 000 personnes",en:"RoRo = Roll-on Roll-off (vehicles)\nCapacity: up to 7,000 vehicles\nSpeed: 18–28 knots (HSC > 30 kn)\nPassengers: up to 4,000 people",es:"RoRo = Roll-on Roll-off (vehículos)\nCapacidad: hasta 7.000 vehículos\nVelocidad: 18–28 nudos\nPasajeros: hasta 4.000 personas",pt:"RoRo = Roll-on Roll-off (veículos)\nCapacidade: até 7.000 veículos\nVelocidade: 18–28 nós\nPassageiros: até 4.000 pessoas"},
    desc:{fr:"Les véhicules montent à bord par une rampe (ramp) à l'arrière ou à la proue. Compartimentage SOLAS très strict à cause de la surface libre des ponts de garage. Herald of Free Enterprise (1987) : parti avec rampe ouverte → 193 morts. Leçon : portes étanches OBLIGATOIRES.",en:"Vehicles board via stern or bow ramp. SOLAS compartmentalization very strict due to open car deck free surface. Herald of Free Enterprise (1987): departed with ramp open → 193 deaths. Lesson: watertight doors MANDATORY.",es:"Los vehículos embarcan por una rampa. Compartimentado SOLAS muy estricto. Herald of Free Enterprise (1987): zarpó con rampa abierta → 193 muertos.",pt:"Os veículos embarcam por uma rampa. Compartimentagem SOLAS muito rigorosa. Herald of Free Enterprise (1987): partiu com rampa aberta → 193 mortos."},
    stcw:{fr:"STCW II/1 + Formation passagers (STCW V/2)",en:"STCW II/1 + Passenger ship training (STCW V/2)",es:"STCW II/1 + Formación buques de pasaje (STCW V/2)",pt:"STCW II/1 + Formação navios de passageiros (STCW V/2)"},
    color:C.blue2,
  },
  {
    id:"cruise",
    icon:"🛳️",
    name:{fr:"Paquebot de croisière",en:"Cruise Ship",es:"Buque de Crucero",pt:"Navio de Cruzeiro"},
    svg:<CruiseShipSVG/>,
    specs:{fr:"Passagers : jusqu'à 9 000 personnes\nÉquipage : 2 000–3 000 personnes\nVitesse : 20–22 nœuds\nLongueur : 200–360 m (Wonder of the Seas : 362 m)",en:"Passengers: up to 9,000 people\nCrew: 2,000–3,000 people\nSpeed: 20–22 knots\nLength: 200–360 m (Wonder of the Seas: 362 m)",es:"Pasajeros: hasta 9.000 personas\nTripulación: 2.000–3.000 personas\nVelocidad: 20–22 nudos",pt:"Passageiros: até 9.000 pessoas\nTripulação: 2.000–3.000 pessoas\nVelocidade: 20–22 nós"},
    desc:{fr:"Les paquebots modernes sont de véritables villes flottantes. Standard 3 compartiments SOLAS : doit flotter avec 3 compartiments envahis. Costa Concordia (2012) : échouage récif → 32 morts → erreur de navigation et abandon prématuré.",en:"Modern cruise ships are floating cities. 3-compartment SOLAS standard: must float with 3 flooded. Costa Concordia (2012): reef grounding → 32 deaths → navigation error and premature evacuation.",es:"Los cruceros modernos son ciudades flotantes. SOLAS 3 compartimentos. Costa Concordia (2012): varada en arrecife → 32 muertos.",pt:"Os cruzeiros modernos são cidades flutuantes. SOLAS 3 compartimentos. Costa Concordia (2012): encalhe em recife → 32 mortos."},
    stcw:{fr:"STCW II/1 + Formation avancée passagers (STCW V/2)",en:"STCW II/1 + Advanced passenger ship training (STCW V/2)",es:"STCW II/1 + Formación avanzada pasaje (STCW V/2)",pt:"STCW II/1 + Formação avançada navios passageiros (STCW V/2)"},
    color:C.gold2,
  },
];

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
function ShipTypesCarousel({ lang="fr" }) {
  const ships = getShips(lang);
  const [current, setCurrent] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const ship = ships[current];

  const prev = () => { setCurrent(c => (c - 1 + ships.length) % ships.length); setShowDetail(false); };
  const next = () => { setCurrent(c => (c + 1) % ships.length); setShowDetail(false); };

  const labels = {
    fr:{prev:"◀",next:"▶",tap:"Appuie pour les détails",specs:"CARACTÉRISTIQUES",desc:"DESCRIPTION",stcw:"CERTIFICATIONS STCW",close:"▲ Masquer"},
    en:{prev:"◀",next:"▶",tap:"Tap for details",specs:"SPECIFICATIONS",desc:"DESCRIPTION",stcw:"STCW CERTIFICATIONS",close:"▲ Hide"},
    es:{prev:"◀",next:"▶",tap:"Toca para ver detalles",specs:"CARACTERÍSTICAS",desc:"DESCRIPCIÓN",stcw:"CERTIFICACIONES STCW",close:"▲ Ocultar"},
    pt:{prev:"◀",next:"▶",tap:"Toque para ver detalhes",specs:"CARACTERÍSTICAS",desc:"DESCRIÇÃO",stcw:"CERTIFICAÇÕES STCW",close:"▲ Ocultar"},
  };
  const L = labels[lang]||labels.fr;

  return (
    <div>
      {/* Navigation dots */}
      <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
        {ships.map((s,i)=>(
          <button key={i} onClick={()=>{setCurrent(i);setShowDetail(false);}} style={{
            width:i===current?28:10, height:10, borderRadius:5,
            background:i===current?ship.color:"rgba(255,255,255,0.15)",
            border:"none", cursor:"pointer",
            transition:"all 0.3s ease",
          }}/>
        ))}
      </div>

      {/* Ship card */}
      <div style={{
        borderRadius:16, overflow:"hidden",
        border:`1.5px solid ${ship.color}55`,
        background:`linear-gradient(135deg,rgba(13,31,60,0.9),rgba(6,14,26,0.95))`,
      }}>
        {/* Header */}
        <div style={{
          padding:"12px 16px",
          background:`linear-gradient(135deg,${ship.color}18,transparent)`,
          borderBottom:`1px solid ${ship.color}33`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:24}}>{ship.icon}</span>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:ship.color,fontFamily:"'Cinzel',serif"}}>
                {ship.name[lang]||ship.name.fr}
              </div>
              <div style={{fontSize:9,color:C.muted,marginTop:2}}>
                {current+1} / {ships.length}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={prev} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.08)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,cursor:"pointer",fontSize:14}}>◀</button>
            <button onClick={next} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.08)",border:`1px solid rgba(255,255,255,0.15)`,color:C.white,cursor:"pointer",fontSize:14}}>▶</button>
          </div>
        </div>

        {/* SVG drawing */}
        <div
          onClick={()=>setShowDetail(v=>!v)}
          style={{cursor:"pointer",padding:"12px 16px",textAlign:"center",position:"relative"}}
        >
          {ship.svg}
          {!showDetail && (
            <div style={{
              position:"absolute", bottom:18, left:"50%",
              transform:"translateX(-50%)",
              padding:"4px 12px", borderRadius:20,
              background:`${ship.color}22`,
              border:`1px solid ${ship.color}44`,
              fontSize:9, color:ship.color, whiteSpace:"nowrap",
            }}>
              👆 {L.tap}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {showDetail && (
          <div style={{
            padding:"0 16px 16px",
            animation:"fadeUp 0.3s ease",
          }}>
            {/* Specs */}
            <div style={{marginBottom:12}}>
              <div style={{
                fontSize:10, color:ship.color, fontWeight:700,
                letterSpacing:2, fontFamily:"'Cinzel',serif",
                marginBottom:6,
              }}>{L.specs}</div>
              <div style={{
                padding:"10px 12px", borderRadius:10,
                background:`${ship.color}0f`,
                border:`1px solid ${ship.color}33`,
                fontSize:11, color:C.white, lineHeight:1.8,
                whiteSpace:"pre-line", fontFamily:"monospace",
              }}>
                {ship.specs[lang]||ship.specs.fr}
              </div>
            </div>

            {/* Description */}
            <div style={{marginBottom:12}}>
              <div style={{
                fontSize:10, color:ship.color, fontWeight:700,
                letterSpacing:2, fontFamily:"'Cinzel',serif",
                marginBottom:6,
              }}>{L.desc}</div>
              <div style={{
                fontSize:12, color:"rgba(240,244,255,0.85)",
                lineHeight:1.75,
              }}>
                {ship.desc[lang]||ship.desc.fr}
              </div>
            </div>

            {/* STCW */}
            <div style={{
              padding:"8px 12px", borderRadius:10,
              background:"rgba(201,146,42,0.08)",
              border:`1px solid ${C.gold}33`,
              display:"flex", alignItems:"center", gap:8,
            }}>
              <span style={{fontSize:16}}>🎓</span>
              <div>
                <div style={{fontSize:9,color:C.gold,fontWeight:700,marginBottom:2}}>{L.stcw}</div>
                <div style={{fontSize:11,color:C.gold2}}>{ship.stcw[lang]||ship.stcw.fr}</div>
              </div>
            </div>

            {/* Close button */}
            <button onClick={()=>setShowDetail(false)} style={{
              width:"100%", padding:"8px 0", marginTop:10,
              borderRadius:10, background:"rgba(255,255,255,0.05)",
              border:`1px solid rgba(255,255,255,0.1)`,
              color:C.muted, cursor:"pointer", fontSize:11,
            }}>
              {L.close}
            </button>
          </div>
        )}
      </div>

      {/* Swipe hint */}
      <div style={{
        display:"flex", justifyContent:"center", gap:16,
        marginTop:10,
      }}>
        <button onClick={prev} style={{
          flex:1, padding:"10px 0", borderRadius:12,
          background:"rgba(255,255,255,0.05)",
          border:`1px solid rgba(255,255,255,0.1)`,
          color:C.muted, cursor:"pointer", fontSize:12,
        }}>◀ {(ships[(current-1+ships.length)%ships.length].icon)}</button>
        <button onClick={next} style={{
          flex:1, padding:"10px 0", borderRadius:12,
          background:"rgba(255,255,255,0.05)",
          border:`1px solid rgba(255,255,255,0.1)`,
          color:C.muted, cursor:"pointer", fontSize:12,
        }}>{(ships[(current+1)%ships.length].icon)} ▶</button>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ── EXERCISE — OPERATIONAL SCENARIO (L2) ──────────────
function ExerciseScenarioNav2({ lang }) {
  const [ans, setAns] = useState({ q1: "", q2: "", q3: "" });
  const [showC, setShowC] = useState(false);
  const chk = (id, val) => {
    const v = val.trim().toLowerCase();
    if (id === "q1") return v.includes("tanker") || v.includes("pétrolier") || v.includes("petrolero") || v.includes("petroleiro");
    if (id === "q2") return v.includes("gm") || v.includes("stabilit");
    if (id === "q3") return v.includes("chief officer") || v.includes("second") || v.includes("primer oficial") || v.includes("imediato");
    return false;
  };
  const d = {
    fr: { title: "🎯 Exercice avancé — Officier de quart", scenario: "Vous êtes OOW. Deux navires sont en attente de mouillage : un porte-conteneurs et un pétrolier chargé. Le pilote demande lequel présente le plus de risque en cas de gîte excessive lors d'une manœuvre serrée.",
      qs: [
        { id: "q1", q: "1. Lequel des deux transporte une cargaison qui, en cas d'avarie, présente un risque environnemental majeur ?" },
        { id: "q2", q: "2. Quel paramètre de stabilité (vu en Leçon 2) doit être surveillé en priorité lors d'une manœuvre serrée ?" },
        { id: "q3", q: "3. À bord, quel officier est responsable au quotidien de la stabilité et du plan de chargement ?" },
      ],
      expl: "✅ Q1 : le pétrolier — une avarie de coque libère des hydrocarbures, un risque environnemental majeur\n✅ Q2 : le GM (hauteur métacentrique) — un GM trop faible augmente le risque de chavirement en gîte\n✅ Q3 : le Second Capitaine (Chief Officer), responsable du plan de chargement et de la stabilité au quotidien" },
    en: { title: "🎯 Advanced Exercise — Officer of the Watch", scenario: "You are OOW. Two vessels are waiting to anchor: a container ship and a loaded tanker. The pilot asks which presents the greater risk in case of excessive heel during a tight maneuver.",
      qs: [
        { id: "q1", q: "1. Which of the two carries cargo that, if damaged, presents a major environmental risk?" },
        { id: "q2", q: "2. Which stability parameter (seen in Lesson 2) must be monitored as a priority during a tight maneuver?" },
        { id: "q3", q: "3. On board, which officer is daily responsible for stability and the loading plan?" },
      ],
      expl: "✅ Q1: the tanker — hull damage releases hydrocarbons, a major environmental risk\n✅ Q2: GM (metacentric height) — a too-low GM increases capsizing risk during heel\n✅ Q3: the Chief Officer, responsible for the loading plan and stability daily" },
    es: { title: "🎯 Ejercicio avanzado — Oficial de guardia", scenario: "Eres OOW. Dos buques esperan para anclar: un portacontenedores y un petrolero cargado. El piloto pregunta cuál presenta mayor riesgo en caso de escora excesiva durante una maniobra cerrada.",
      qs: [
        { id: "q1", q: "1. ¿Cuál de los dos transporta una carga que, si se daña, presenta un riesgo ambiental mayor?" },
        { id: "q2", q: "2. ¿Qué parámetro de estabilidad (visto en la Lección 2) debe vigilarse con prioridad durante una maniobra cerrada?" },
        { id: "q3", q: "3. A bordo, ¿qué oficial es responsable a diario de la estabilidad y el plan de carga?" },
      ],
      expl: "✅ Q1: el petrolero — una avería en el casco libera hidrocarburos, un riesgo ambiental mayor\n✅ Q2: el GM (altura metacéntrica) — un GM demasiado bajo aumenta el riesgo de vuelco en escora\n✅ Q3: el Primer Oficial, responsable del plan de carga y la estabilidad a diario" },
    pt: { title: "🎯 Exercício avançado — Oficial de quarto", scenario: "Você é OOW. Dois navios esperam para ancorar: um porta-contentores e um petroleiro carregado. O piloto pergunta qual apresenta maior risco em caso de escora excessiva durante uma manobra apertada.",
      qs: [
        { id: "q1", q: "1. Qual dos dois transporta uma carga que, se danificada, apresenta um risco ambiental maior?" },
        { id: "q2", q: "2. Que parâmetro de estabilidade (visto na Lição 2) deve ser monitorizado com prioridade numa manobra apertada?" },
        { id: "q3", q: "3. A bordo, que oficial é responsável diariamente pela estabilidade e pelo plano de carga?" },
      ],
      expl: "✅ Q1: o petroleiro — uma avaria no casco liberta hidrocarbonetos, um risco ambiental maior\n✅ Q2: o GM (altura metacêntrica) — um GM muito baixo aumenta o risco de capotamento em escora\n✅ Q3: o Imediato, responsável pelo plano de carga e pela estabilidade diariamente" },
  };
  const c = d[lang] || d.fr;
  return (
    <Card style={{ marginBottom: 12, border: `1px solid ${C.gold}44`, background: "linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))" }}>
      <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "12px", marginBottom: 14, fontSize: 12, color: C.white, lineHeight: 1.6, fontStyle: "italic" }}>{c.scenario}</div>
      {c.qs.map((q) => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: C.white, marginBottom: 6, lineHeight: 1.4, fontWeight: 600 }}>{q.q}</div>
          <input type="text" value={ans[q.id]} onChange={(e) => setAns((a) => ({ ...a, [q.id]: e.target.value }))}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.07)",
              border: `1px solid ${showC ? (chk(q.id, ans[q.id]) ? C.green : C.red) : C.border}`,
              color: C.white, fontSize: 13, fontFamily: "'Nunito',sans-serif", boxSizing: "border-box" }} />
          {showC && <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: chk(q.id, ans[q.id]) ? C.green : C.red }}>{chk(q.id, ans[q.id]) ? "✓" : "✗"}</div>}
        </div>
      ))}
      {showC && <div style={{ padding: "12px", borderRadius: 12, background: "rgba(30,138,74,0.1)", border: `1px solid ${C.green}44`, fontSize: 11, color: C.white, lineHeight: 1.7, marginBottom: 10, whiteSpace: "pre-line" }}>{c.expl}</div>}
      <button onClick={() => setShowC((v) => !v)} style={{ width: "100%", padding: "11px 0", borderRadius: 12, background: showC ? "rgba(30,138,74,0.2)" : "rgba(201,146,42,0.15)", border: `1px solid ${showC ? C.green : C.gold}44`, color: showC ? C.green : C.gold2, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Cinzel',serif", letterSpacing: 1 }}>
        {showC ? (lang==="fr"?"Masquer":lang==="en"?"Hide":lang==="es"?"Ocultar":"Ocultar") : (lang==="fr"?"Voir la correction":lang==="en"?"Show correction":lang==="es"?"Ver corrección":"Ver correção")}
      </button>
    </Card>
  );
}

// ── PRACTICE QUESTION BANK — 15Q (L2) ──────────────
const BANK_NAV2 = {
  fr:[
    {q:"Comment se nomme l'avant d'un navire ?",opts:["Poupe","Proue","Tribord","Bâbord"],correct:1,expl:"La proue est l'avant du navire, la poupe est l'arrière."},
    {q:"De quel côté se trouve tribord en regardant vers l'avant ?",opts:["Gauche","Droite","Centre","Arrière"],correct:1,expl:"Tribord est le côté droit du navire en regardant vers l'avant, bâbord le côté gauche."},
    {q:"Que mesure le tirant d'eau ?",opts:["La longueur du navire","La hauteur immergée de la coque","La largeur du navire","La vitesse maximale"],correct:1,expl:"Le tirant d'eau mesure la distance verticale entre la flottaison et le point le plus bas de la coque (immergé)."},
    {q:"Que sont les marques Plimsoll ?",opts:["Des marques de peinture décorative","Des repères réglementaires de franc-bord selon la zone/saison","Des marques de vitesse","Des marques radar"],correct:1,expl:"Les marques Plimsoll indiquent le franc-bord maximal autorisé selon le type d'eau et la saison, garantissant une flottabilité de sécurité."},
    {q:"Que représente le point G en stabilité du navire ?",opts:["Le centre de gravité","Le centre de flottabilité","Le point métacentrique","Le point de charge"],correct:0,expl:"G est le centre de gravité du navire, point où s'applique le poids total."},
    {q:"Que représente le point M en stabilité ?",opts:["Le centre de gravité","Le métacentre","Le point de charge maximal","La ligne de flottaison"],correct:1,expl:"M est le métacentre, point théorique autour duquel le navire oscille lors d'une inclinaison."},
    {q:"Qu'indique un GM positif et suffisant ?",opts:["Un navire instable","Un navire stable","Un navire surchargé","Un navire trop léger"],correct:1,expl:"Un GM (distance entre G et M) positif et suffisant indique un navire stable, capable de revenir à la verticale après une inclinaison."},
    {q:"Quel type de navire transporte des conteneurs standardisés ?",opts:["Vraquier","Porte-conteneurs","Pétrolier","Navire GNL"],correct:1,expl:"Le porte-conteneurs est conçu pour transporter des conteneurs standardisés empilés en cales et sur le pont."},
    {q:"Quel type de navire transporte du gaz naturel liquéfié ?",opts:["Vraquier","Porte-conteneurs","Navire GNL (LNG carrier)","Ferry Ro-Ro"],correct:2,expl:"Le navire GNL transporte du gaz naturel liquéfié à très basse température dans des cuves spécialisées."},
    {q:"Quel type de navire est conçu pour le chargement roulant (camions, voitures) ?",opts:["Vraquier","Ro-Ro (Roll-on/Roll-off)","Pétrolier","Navire offshore"],correct:1,expl:"Un navire Ro-Ro permet aux véhicules d'embarquer et débarquer en roulant, via des rampes."},
    {q:"Que signifie le compartimentage SOLAS d'un navire ?",opts:["La répartition esthétique des cabines","La division en compartiments étanches limitant les voies d'eau","Un système de climatisation","Un système de communication"],correct:1,expl:"Le compartimentage SOLAS divise la coque en compartiments étanches, limitant la propagation d'une voie d'eau en cas d'avarie."},
    {q:"Qui supervise l'organisation générale de l'équipage à bord ?",opts:["Le mécanicien seul","Le Capitaine, avec la chaîne de commandement","Uniquement l'armateur à terre","L'agent portuaire"],correct:1,expl:"Le Capitaine supervise l'organisation générale, appuyé par la chaîne de commandement (Second, officiers, chefs de département)."},
    {q:"Un navire avec un GM trop faible risque-t-il davantage de chavirer ?",opts:["Non, jamais","Oui, un GM trop faible augmente le risque de chavirement","Non, seul le tirant d'eau compte","Oui, mais uniquement à quai"],correct:1,expl:"Un GM trop faible réduit la capacité du navire à revenir à la verticale, augmentant le risque de chavirement lors d'une gîte."},
    {q:"Le franc-bord varie-t-il selon la zone de navigation (eau douce/eau de mer, tropicale/hiver) ?",opts:["Non, il est toujours identique","Oui, les marques Plimsoll en tiennent compte","Non, seul le tonnage compte","Oui, mais uniquement pour les pétroliers"],correct:1,expl:"Les marques Plimsoll varient précisément pour tenir compte de la densité de l'eau et des conditions saisonnières de navigation."},
    {q:"Pourquoi le compartimentage étanche est-il crucial en cas de collision ?",opts:["Il n'a aucun effet en cas de collision","Il limite l'envahissement d'eau à un ou quelques compartiments, évitant le naufrage","Il améliore uniquement l'esthétique","Il n'est utilisé qu'au mouillage"],correct:1,expl:"Le compartimentage étanche limite la propagation de l'eau à l'intérieur du navire, préservant sa flottabilité et sa stabilité en cas d'avarie."},
  ],
  en:[
    {q:"What is the front of a ship called?",opts:["Stern","Bow","Starboard","Port"],correct:1,expl:"The bow is the front of the ship, the stern is the rear."},
    {q:"Which side is starboard when facing forward?",opts:["Left","Right","Center","Rear"],correct:1,expl:"Starboard is the right side of the ship facing forward, port is the left side."},
    {q:"What does draft measure?",opts:["The ship's length","The submerged height of the hull","The ship's width","Maximum speed"],correct:1,expl:"Draft measures the vertical distance between the waterline and the lowest point of the (submerged) hull."},
    {q:"What are Plimsoll marks?",opts:["Decorative paint marks","Regulatory freeboard markers depending on zone/season","Speed marks","Radar marks"],correct:1,expl:"Plimsoll marks indicate the maximum allowed freeboard depending on water type and season, ensuring safe buoyancy."},
    {q:"What does point G represent in ship stability?",opts:["The center of gravity","The center of buoyancy","The metacentric point","The load point"],correct:0,expl:"G is the ship's center of gravity, the point where total weight is applied."},
    {q:"What does point M represent in stability?",opts:["The center of gravity","The metacenter","The maximum load point","The waterline"],correct:1,expl:"M is the metacenter, the theoretical point around which the ship oscillates when heeling."},
    {q:"What does a positive and sufficient GM indicate?",opts:["An unstable ship","A stable ship","An overloaded ship","A too-light ship"],correct:1,expl:"A positive and sufficient GM (distance between G and M) indicates a stable ship, able to return upright after heeling."},
    {q:"Which vessel type carries standardized containers?",opts:["Bulk carrier","Container ship","Tanker","LNG carrier"],correct:1,expl:"The container ship is designed to carry standardized containers stacked in holds and on deck."},
    {q:"Which vessel type carries liquefied natural gas?",opts:["Bulk carrier","Container ship","LNG carrier","Ro-Ro ferry"],correct:2,expl:"The LNG carrier transports liquefied natural gas at very low temperature in specialized tanks."},
    {q:"Which vessel type is designed for rolling cargo (trucks, cars)?",opts:["Bulk carrier","Ro-Ro (Roll-on/Roll-off)","Tanker","Offshore vessel"],correct:1,expl:"A Ro-Ro vessel allows vehicles to board and disembark by rolling, via ramps."},
    {q:"What does SOLAS compartmentalization mean for a ship?",opts:["The aesthetic layout of cabins","Division into watertight compartments limiting flooding","An air conditioning system","A communication system"],correct:1,expl:"SOLAS compartmentalization divides the hull into watertight compartments, limiting flooding spread in case of damage."},
    {q:"Who supervises the overall crew organization on board?",opts:["Only the engineer","The Master, with the chain of command","Only the shipowner ashore","The port agent"],correct:1,expl:"The Master supervises overall organization, supported by the chain of command (Chief Officer, officers, department heads)."},
    {q:"Does a ship with a too-low GM risk capsizing more?",opts:["No, never","Yes, a too-low GM increases capsizing risk","No, only draft matters","Yes, but only at berth"],correct:1,expl:"A too-low GM reduces the ship's ability to return upright, increasing capsizing risk during heel."},
    {q:"Does freeboard vary by navigation zone (fresh/sea water, tropical/winter)?",opts:["No, it's always the same","Yes, Plimsoll marks account for this","No, only tonnage matters","Yes, but only for tankers"],correct:1,expl:"Plimsoll marks vary precisely to account for water density and seasonal navigation conditions."},
    {q:"Why is watertight compartmentalization crucial in a collision?",opts:["It has no effect in a collision","It limits water ingress to one or few compartments, avoiding sinking","It only improves aesthetics","It's only used at anchor"],correct:1,expl:"Watertight compartmentalization limits water spread inside the ship, preserving buoyancy and stability in case of damage."},
  ],
  es:[
    {q:"¿Cómo se llama la parte delantera de un buque?",opts:["Popa","Proa","Estribor","Babor"],correct:1,expl:"La proa es la parte delantera del buque, la popa es la parte trasera."},
    {q:"¿Qué lado es estribor mirando hacia adelante?",opts:["Izquierda","Derecha","Centro","Atrás"],correct:1,expl:"Estribor es el lado derecho del buque mirando hacia adelante, babor el lado izquierdo."},
    {q:"¿Qué mide el calado?",opts:["La longitud del buque","La altura sumergida del casco","El ancho del buque","La velocidad máxima"],correct:1,expl:"El calado mide la distancia vertical entre la línea de flotación y el punto más bajo del casco (sumergido)."},
    {q:"¿Qué son las marcas Plimsoll?",opts:["Marcas de pintura decorativa","Marcadores reglamentarios de francobordo según zona/temporada","Marcas de velocidad","Marcas de radar"],correct:1,expl:"Las marcas Plimsoll indican el francobordo máximo permitido según el tipo de agua y la temporada, garantizando flotabilidad segura."},
    {q:"¿Qué representa el punto G en la estabilidad del buque?",opts:["El centro de gravedad","El centro de flotabilidad","El punto metacéntrico","El punto de carga"],correct:0,expl:"G es el centro de gravedad del buque, punto donde se aplica el peso total."},
    {q:"¿Qué representa el punto M en estabilidad?",opts:["El centro de gravedad","El metacentro","El punto de carga máxima","La línea de flotación"],correct:1,expl:"M es el metacentro, punto teórico alrededor del cual oscila el buque al escorar."},
    {q:"¿Qué indica un GM positivo y suficiente?",opts:["Un buque inestable","Un buque estable","Un buque sobrecargado","Un buque demasiado ligero"],correct:1,expl:"Un GM positivo y suficiente (distancia entre G y M) indica un buque estable, capaz de volver a la vertical tras escorar."},
    {q:"¿Qué tipo de buque transporta contenedores estandarizados?",opts:["Granelero","Portacontenedores","Petrolero","Buque GNL"],correct:1,expl:"El portacontenedores está diseñado para transportar contenedores estandarizados apilados en bodegas y en cubierta."},
    {q:"¿Qué tipo de buque transporta gas natural licuado?",opts:["Granelero","Portacontenedores","Buque GNL (LNG carrier)","Ferry Ro-Ro"],correct:2,expl:"El buque GNL transporta gas natural licuado a muy baja temperatura en tanques especializados."},
    {q:"¿Qué tipo de buque está diseñado para carga rodante (camiones, coches)?",opts:["Granelero","Ro-Ro (Roll-on/Roll-off)","Petrolero","Buque offshore"],correct:1,expl:"Un buque Ro-Ro permite que los vehículos embarquen y desembarquen rodando, mediante rampas."},
    {q:"¿Qué significa el compartimentado SOLAS de un buque?",opts:["La distribución estética de camarotes","La división en compartimentos estancos que limitan las vías de agua","Un sistema de climatización","Un sistema de comunicación"],correct:1,expl:"El compartimentado SOLAS divide el casco en compartimentos estancos, limitando la propagación de una vía de agua en caso de avería."},
    {q:"¿Quién supervisa la organización general de la tripulación a bordo?",opts:["Solo el maquinista","El Capitán, con la cadena de mando","Solo el naviero en tierra","El agente portuario"],correct:1,expl:"El Capitán supervisa la organización general, apoyado por la cadena de mando (Primer Oficial, oficiales, jefes de departamento)."},
    {q:"¿Un buque con un GM demasiado bajo corre más riesgo de zozobrar?",opts:["No, nunca","Sí, un GM demasiado bajo aumenta el riesgo de zozobra","No, solo importa el calado","Sí, pero solo en puerto"],correct:1,expl:"Un GM demasiado bajo reduce la capacidad del buque de volver a la vertical, aumentando el riesgo de zozobra al escorar."},
    {q:"¿El francobordo varía según la zona de navegación (agua dulce/mar, tropical/invierno)?",opts:["No, siempre es igual","Sí, las marcas Plimsoll lo tienen en cuenta","No, solo importa el tonelaje","Sí, pero solo para petroleros"],correct:1,expl:"Las marcas Plimsoll varían precisamente para tener en cuenta la densidad del agua y las condiciones estacionales de navegación."},
    {q:"¿Por qué el compartimentado estanco es crucial en una colisión?",opts:["No tiene ningún efecto en una colisión","Limita la entrada de agua a uno o pocos compartimentos, evitando el hundimiento","Solo mejora la estética","Solo se usa fondeado"],correct:1,expl:"El compartimentado estanco limita la propagación del agua dentro del buque, preservando la flotabilidad y estabilidad ante una avería."},
  ],
  pt:[
    {q:"Como se chama a parte frontal de um navio?",opts:["Popa","Proa","Estibordo","Bombordo"],correct:1,expl:"A proa é a parte frontal do navio, a popa é a parte traseira."},
    {q:"Que lado é estibordo olhando para a frente?",opts:["Esquerda","Direita","Centro","Atrás"],correct:1,expl:"Estibordo é o lado direito do navio olhando para a frente, bombordo o lado esquerdo."},
    {q:"O que o calado mede?",opts:["O comprimento do navio","A altura submersa do casco","A largura do navio","A velocidade máxima"],correct:1,expl:"O calado mede a distância vertical entre a linha de flutuação e o ponto mais baixo do casco (submerso)."},
    {q:"O que são as marcas Plimsoll?",opts:["Marcas de tinta decorativa","Marcadores regulamentares de bordo livre conforme zona/estação","Marcas de velocidade","Marcas de radar"],correct:1,expl:"As marcas Plimsoll indicam o bordo livre máximo permitido conforme o tipo de água e a estação, garantindo flutuabilidade segura."},
    {q:"O que representa o ponto G na estabilidade do navio?",opts:["O centro de gravidade","O centro de flutuabilidade","O ponto metacêntrico","O ponto de carga"],correct:0,expl:"G é o centro de gravidade do navio, ponto onde se aplica o peso total."},
    {q:"O que representa o ponto M na estabilidade?",opts:["O centro de gravidade","O metacentro","O ponto de carga máxima","A linha de flutuação"],correct:1,expl:"M é o metacentro, ponto teórico em torno do qual o navio oscila ao escorar."},
    {q:"O que indica um GM positivo e suficiente?",opts:["Um navio instável","Um navio estável","Um navio sobrecarregado","Um navio muito leve"],correct:1,expl:"Um GM positivo e suficiente (distância entre G e M) indica um navio estável, capaz de voltar à vertical após escorar."},
    {q:"Que tipo de navio transporta contentores padronizados?",opts:["Graneleiro","Porta-contentores","Petroleiro","Navio GNL"],correct:1,expl:"O porta-contentores é projetado para transportar contentores padronizados empilhados em porões e no convés."},
    {q:"Que tipo de navio transporta gás natural liquefeito?",opts:["Graneleiro","Porta-contentores","Navio GNL (LNG carrier)","Ferry Ro-Ro"],correct:2,expl:"O navio GNL transporta gás natural liquefeito a muito baixa temperatura em tanques especializados."},
    {q:"Que tipo de navio é projetado para carga rolante (camiões, carros)?",opts:["Graneleiro","Ro-Ro (Roll-on/Roll-off)","Petroleiro","Navio offshore"],correct:1,expl:"Um navio Ro-Ro permite que os veículos embarquem e desembarquem rolando, através de rampas."},
    {q:"O que significa a compartimentagem SOLAS de um navio?",opts:["A distribuição estética das cabines","A divisão em compartimentos estanques que limitam as vias de água","Um sistema de climatização","Um sistema de comunicação"],correct:1,expl:"A compartimentagem SOLAS divide o casco em compartimentos estanques, limitando a propagação de uma via de água em caso de avaria."},
    {q:"Quem supervisiona a organização geral da tripulação a bordo?",opts:["Apenas o maquinista","O Comandante, com a cadeia de comando","Apenas o armador em terra","O agente portuário"],correct:1,expl:"O Comandante supervisiona a organização geral, apoiado pela cadeia de comando (Imediato, oficiais, chefes de departamento)."},
    {q:"Um navio com um GM muito baixo corre mais risco de capotar?",opts:["Não, nunca","Sim, um GM muito baixo aumenta o risco de capotamento","Não, só o calado importa","Sim, mas só no porto"],correct:1,expl:"Um GM muito baixo reduz a capacidade do navio de voltar à vertical, aumentando o risco de capotamento ao escorar."},
    {q:"O bordo livre varia conforme a zona de navegação (água doce/mar, tropical/inverno)?",opts:["Não, é sempre igual","Sim, as marcas Plimsoll consideram isso","Não, só a tonelagem importa","Sim, mas só para petroleiros"],correct:1,expl:"As marcas Plimsoll variam precisamente para considerar a densidade da água e as condições sazonais de navegação."},
    {q:"Por que a compartimentagem estanque é crucial numa colisão?",opts:["Não tem nenhum efeito numa colisão","Limita a entrada de água a um ou poucos compartimentos, evitando o naufrágio","Só melhora a estética","Só é usada fundeado"],correct:1,expl:"A compartimentagem estanque limita a propagação da água dentro do navio, preservando a flutuabilidade e estabilidade em caso de avaria."},
  ],
};

function QuestionBankNav2({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [started,setStarted]=useState(false);const [done,setDone]=useState(false);
  const questions=BANK_NAV2[lang]||BANK_NAV2.fr;const total=questions.length;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  if(!started) return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{fontSize:12,color:C.white,lineHeight:1.6,marginBottom:12}}>{lang==="fr"?"Entraîne-toi avec 15 questions de révision avant le quiz final.":lang==="en"?"Practice with 15 review questions before the final quiz.":lang==="es"?"Practica con 15 preguntas de repaso antes del quiz final.":"Pratique com 15 perguntas de revisão antes do quiz final."}</div>
      <button onClick={()=>setStarted(true)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,color:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:1}}>
        {lang==="fr"?"✅ COMMENCER":lang==="en"?"✅ START":lang==="es"?"✅ EMPEZAR":"✅ COMEÇAR"}
      </button>
    </Card>
  );
  if(done){
    const pct=Math.round(score/total*100);
    return(<Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,textAlign:"center"}}>
      <div style={{fontSize:44,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":pct>=60?"📘":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{total}</div>
      <div style={{fontSize:13,color:C.gold2}}>{pct}%</div>
    </Card>);
  }
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<total-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else {setDone(true);if(onComplete)onComplete();}};
  return(
    <Card style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{total}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/total)*100}%`,background:`linear-gradient(90deg,${C.gold},${C.blue2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.white,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>}
      {answered&&<button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.green},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>
        {cur<total-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":"FINISH")}
      </button>}
    </Card>
  );
}

export default function LessonNavire({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const lc = getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
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
            <Card style={{marginBottom:14,textAlign:"center"}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚢 {lang==="fr"?"TYPES DE NAVIRES — INTERACTIF":lang==="en"?"SHIP TYPES — INTERACTIVE":lang==="es"?"TIPOS DE BUQUES — INTERACTIVO":"TIPOS DE NAVIOS — INTERATIVO"}</div><ShipTypesCarousel lang={lang}/></Card>

            <SL icon="👥" text={lc.p6}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👥 {lang==="fr"?"ORGANIGRAMME":lang==="en"?"ORG CHART":lang==="es"?"ORGANIGRAMA":"ORGANOGRAMA"}</div><OrgChart lang={lang}/></Card>

            <SL icon="🔒" text={lc.p7} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔒</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}33`,background:"linear-gradient(135deg,rgba(192,57,43,0.06),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔒 {lang==="fr"?"COMPARTIMENTAGE INTERACTIF — GÎTE EN TEMPS RÉEL":lang==="en"?"INTERACTIVE COMPARTMENTS — REAL-TIME LIST":lang==="es"?"COMPARTIMENTADO — ESCORA EN TIEMPO REAL":"COMPARTIMENTAGEM — ESCORA EM TEMPO REAL"}</div><CompartmentSVG lang={lang}/></Card>

            <SL icon="🎯" text={lang==="fr"?"EXERCICE AVANCÉ":lang==="en"?"ADVANCED EXERCISE":lang==="es"?"EJERCICIO AVANZADO":"EXERCÍCIO AVANÇADO"}/>
            <ExerciseScenarioNav2 lang={lang}/>
            <SL icon="📝" text={lang==="fr"?"BANQUE DE 15 QUESTIONS":lang==="en"?"15-QUESTION BANK":lang==="es"?"BANCO DE 15 PREGUNTAS":"BANCO DE 15 QUESTÕES"} color={C.gold}/>
            <QuestionBankNav2 lang={lang} onComplete={()=>setBankDone(true)}/>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
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
              <div style={{marginTop:14,fontSize:12,color:C.gold2,fontStyle:"italic",lineHeight:1.6,maxWidth:320,marginLeft:"auto",marginRight:"auto"}}>
                {lang==="fr"?"Connaître son navire, c'est déjà commencer à le maîtriser. Continue, futur officier.":lang==="en"?"Knowing your ship is the first step to mastering it. Keep going, future officer.":lang==="es"?"Conocer tu buque es el primer paso para dominarlo. Sigue así, futuro oficial.":"Conhecer o seu navio é o primeiro passo para o dominar. Continue, futuro oficial."}
              </div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — LA TERRE & COORDONNÉES →":lang==="en"?"LESSON 3 — EARTH & COORDINATES →":lang==="es"?"LECCIÓN 3 — LA TIERRA & COORDENADAS →":"LIÇÃO 3 — A TERRA & COORDENADAS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
