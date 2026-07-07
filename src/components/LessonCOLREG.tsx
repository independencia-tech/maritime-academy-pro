import { useState, useEffect, useRef } from "react";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Navigation & Cartographie", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 MODULE TERMINÉ!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Navigation & Cartography", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 MODULE COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Navegación & Cartografía", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡MÓDULO COMPLETO!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Navegação & Cartografia", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 MÓDULO CONCLUÍDO!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — VESSEL HIERARCHY Rule 18
// ══════════════════════════════════════
function HierarchySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const vessels = [
    {id:"nuc",rank:1,icon:"🔴🔴",label:{fr:"NUC",en:"NUC",es:"NBC",pt:"NMC"},full:{fr:"Non Maîtrisable",en:"Not Under Command",es:"No Gobernado",pt:"Não Governável"},desc:{fr:"Panne moteur ou avarie grave\nFeux : 2 feux rouges verticaux\nTOUS les navires doivent s'écarter\nSignal : 1 long + 2 courts / 2 min",en:"Engine failure or serious breakdown\nLights: 2 vertical red lights\nALL vessels must keep clear\nSignal: 1 long + 2 short / 2 min",es:"Avería grave · 2 luces rojas verticales\nTodos deben apartarse",pt:"Avaria grave · 2 luzes vermelhas verticais\nTodos devem afastar-se"},color:C.red},
    {id:"ram",rank:2,icon:"🔴⚪🔴",label:{fr:"RAM",en:"RAM",es:"MCM",pt:"CAM"},full:{fr:"Capacité Manœuvre Restreinte",en:"Restricted in Ability to Manœuvre",es:"Maniobra Restringida",pt:"Capacidade Manobra Restrita"},desc:{fr:"Dragage, pose câbles, ravitaillement en mer\nFeux : rouge-blanc-rouge verticaux\nDifficile de dévier de sa route",en:"Dredging, cable laying, RAS\nLights: red-white-red vertical\nUnable to easily deviate from course",es:"Dragado, tendido cables, reabastecimiento\nLuces: rojo-blanco-rojo",pt:"Dragagem, cabos, abastecimento\nLuzes: vermelho-branco-vermelho"},color:C.orange},
    {id:"draft",rank:3,icon:"🟡🟡🟡",label:{fr:"Tirant d'eau",en:"Constrained by draft",es:"Calado",pt:"Calado"},full:{fr:"Gêné par son tirant d'eau",en:"Constrained by draft",es:"Calado restringido",pt:"Constrangido pelo calado"},desc:{fr:"Ne peut s'écarter à cause de la profondeur\nFeux : 3 feux rouges verticaux\nRoutes commerciales profondes",en:"Cannot deviate due to draft\nLights: 3 vertical red lights\nDeep commercial shipping lanes",es:"No puede desviarse por su calado\n3 luces rojas verticales",pt:"Não pode desviar devido ao calado\n3 luzes vermelhas verticais"},color:C.gold2},
    {id:"fishing",rank:4,icon:"🟢⚪",label:{fr:"Pêche",en:"Fishing",es:"Pesca",pt:"Pesca"},full:{fr:"Navire en train de pêcher",en:"Vessel engaged in fishing",es:"Buque pescando",pt:"Navio a pescar"},desc:{fr:"Chalutier ou filets déployés\nFeux : vert-blanc verticaux\nFilet peut s'étirer sur 1 km\nManœuvre rapide difficile",en:"Trawler or nets deployed\nLights: green-white vertical\nNet can stretch 1 km",es:"Redes desplegadas · verde-blanco\nLa red puede extenderse 1 km",pt:"Redes deployadas · verde-branco\nRede pode estender 1 km"},color:C.green},
    {id:"sail",rank:5,icon:"⛵",label:{fr:"Voilier",en:"Sailing",es:"Velero",pt:"Veleiro"},full:{fr:"Navire à voiles en marche",en:"Vessel under sail",es:"Buque a vela",pt:"Embarcação à vela"},desc:{fr:"Priorité sur navires à moteur\nMais cède aux 4 navires ci-dessus\nSi moteur allumé → navire à moteur\nFeux : rouge + vert (pas de blanc avant)",en:"Priority over powered vessels\nBut gives way to vessels above\nIf engine on → powered vessel\nLights: red + green (no forward white)",es:"Prioridad sobre buques de motor\nSi motor encendido → buque de motor",pt:"Prioridade sobre navios a motor\nSe motor ligado → navio a motor"},color:C.teal},
    {id:"power",rank:6,icon:"🚢",label:{fr:"Moteur",en:"Power",es:"Motor",pt:"Motor"},full:{fr:"Navire à propulsion mécanique",en:"Power-driven vessel",es:"Buque propulsado mecánicamente",pt:"Embarcação a motor"},desc:{fr:"PRIORITÉ LA PLUS BASSE\nDoit céder à TOUS les navires ci-dessus\nFeux : blanc mât + rouge/vert côtés + blanc poupe\nObligatoire : veille permanente Rule 5",en:"LOWEST PRIORITY\nMust give way to ALL vessels above\nLights: white mast + red/green sides + white stern\nMandatory: permanent watch Rule 5",es:"PRIORIDAD MÁS BAJA\nCede a TODOS los buques superiores",pt:"PRIORIDADE MAIS BAIXA\nCede a TODOS os navios acima"},color:C.blue2},
  ];
  const sel_ = sel ? vessels.find(v=>v.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {vessels.map((v,i)=>(
          <div key={v.id} onClick={()=>setSel(sel===v.id?null:v.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===v.id?`${v.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===v.id?v.color:"rgba(255,255,255,0.08)"}`,
              marginLeft:i*6}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${v.color}22`,border:`1px solid ${v.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:v.color,flexShrink:0}}>#{v.rank}</div>
            <span style={{fontSize:16}}>{v.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:v.color,fontFamily:"'Cinzel',serif"}}>{v.label[lang]||v.label.fr}</div>
              <div style={{fontSize:10,color:C.muted}}>{v.full[lang]||v.full.fr}</div>
            </div>
            <span style={{fontSize:10,color:C.muted}}>{sel===v.id?"▲":"▼"}</span>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",animation:"fadeUp 0.3s ease"}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — COLREG SCENARIO SIMULATOR
// ══════════════════════════════════════
function ScenarioSimulator({ lang }) {
  const [scenario, setScenario] = useState(0);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const animRef = useRef(null);
  const W=290, H=200;

  const scenarios = [
    {
      id:"crossing", rule:"Rule 15", color:C.orange,
      label:{fr:"Croisement",en:"Crossing",es:"Cruce",pt:"Cruzamento"},
      desc:{fr:"A vient de TRIBORD de B\n→ A = privilégié (maintient cap+vitesse)\n→ B = manœuvrant (cède la route)\nB évite de passer devant A",en:"A comes from B's STARBOARD\n→ A = stand-on (holds course+speed)\n→ B = give-way\nB avoids crossing ahead of A",es:"A viene por ESTRIBOR de B\n→ A = privilegiado (mantiene)\n→ B = maniobra (cede)",pt:"A vem de ESTIBORDO de B\n→ A = privilegiado (mantém)\n→ B = manobra (cede)"},
      getA:t=>({x:20+t*2.2,y:100}), headA:90,
      getB:t=>({x:145,y:185-t*1.8}), headB:0,
      cA:C.green, cB:C.blue2, lA:"A ✅", lB:"B ⚠️",
      danger:t=>t>55&&t<75,
    },
    {
      id:"headon", rule:"Rule 14", color:C.red,
      label:{fr:"Face à face",en:"Head-on",es:"Cara a cara",pt:"Frente a frente"},
      desc:{fr:"Les DEUX navires se font face\n→ Les DEUX sont manœuvrants\n→ Les deux virent à TRIBORD\n→ Se croiser par BÂBORD",en:"Both vessels approaching head-on\n→ BOTH are give-way\n→ Both alter to STARBOARD\n→ Pass port-to-port",es:"Ambos se aproximan de frente\n→ AMBOS son de maniobra\n→ Ambos viran a ESTRIBOR",pt:"Ambos frente a frente\n→ AMBOS de manobra\n→ Ambos viram a ESTIBORDO"},
      getA:t=>({x:20+t*2.2,y:100}), headA:90,
      getB:t=>({x:270-t*2.2,y:100}), headB:270,
      cA:C.blue2, cB:C.red, lA:"A →", lB:"← B",
      danger:t=>t>50&&t<70,
    },
    {
      id:"overtaking", rule:"Rule 13", color:C.purple,
      label:{fr:"Rattrapage",en:"Overtaking",es:"Alcance",pt:"Ultrapassagem"},
      desc:{fr:"B rattrape A par l'arrière\n→ B = TOUJOURS manœuvrant\n→ A = TOUJOURS privilégié\nMême si B est un voilier !",en:"B overtaking A from astern\n→ B = ALWAYS give-way\n→ A = ALWAYS stand-on\nEven if B is a sailing vessel!",es:"B alcanza a A por la popa\n→ B = SIEMPRE de maniobra\n→ A = SIEMPRE privilegiado",pt:"B ultrapassa A pela popa\n→ B = SEMPRE de manobra\n→ A = SEMPRE privilegiado"},
      getA:t=>({x:30+t*1.2,y:100}), headA:90,
      getB:t=>({x:10+t*2.4,y:115}), headB:90,
      cA:C.green, cB:C.orange, lA:"A (lent)", lB:"B (rapide)",
      danger:t=>t>45&&t<65,
    },
    {
      id:"sailing", rule:"Rule 12", color:C.teal,
      label:{fr:"Voiliers",en:"Sailing vessels",es:"Veleros",pt:"Veleiros"},
      desc:{fr:"Amures différentes :\n→ Tribord amures = PRIVILÉGIÉ\n→ Bâbord amures = MANŒUVRANT\nA (tribord) = privilégié ici",en:"Different tacks:\n→ Starboard tack = STAND-ON\n→ Port tack = GIVE-WAY\nA (starboard tack) = stand-on",es:"Amuras diferentes:\n→ Estribor = PRIVILEGIADO\n→ Babor = MANIOBRA",pt:"Bolinas diferentes:\n→ Estibordo = PRIVILEGIADO\n→ Bombordo = MANOBRA"},
      getA:t=>({x:60+t*1.5,y:80+t*0.3}), headA:110,
      getB:t=>({x:220-t*1.8,y:140-t*0.5}), headB:300,
      cA:C.teal, cB:C.orange, lA:"A ⛵ tribord", lB:"B ⛵ bâbord",
      danger:t=>t>45&&t<65,
    },
  ];

  const sc = scenarios[scenario];
  useEffect(()=>{
    if(running){animRef.current=setInterval(()=>{setTick(p=>{if(p>=90){setRunning(false);return 0;}return p+1;});},60);}
    else clearInterval(animRef.current);
    return()=>clearInterval(animRef.current);
  },[running]);

  const reset=()=>{setRunning(false);setTick(0);};
  const posA=sc.getA(tick), posB=sc.getB(tick);
  const isDanger=sc.danger(tick);
  const dx=posB.x-posA.x, dy=posB.y-posA.y;
  const dist=Math.sqrt(dx*dx+dy*dy).toFixed(0);

  const shipPts=(x,y,h,sz=13)=>{
    const r=h*Math.PI/180;
    const tx=x+sz*Math.cos(r),ty=y+sz*Math.sin(r);
    const lx=x+sz*0.5*Math.cos(r+2.2),ly=y+sz*0.5*Math.sin(r+2.2);
    const rx=x+sz*0.5*Math.cos(r-2.2),ry=y+sz*0.5*Math.sin(r-2.2);
    const bx=x-sz*0.3*Math.cos(r),by=y-sz*0.3*Math.sin(r);
    return `${tx},${ty} ${lx},${ly} ${bx},${by} ${rx},${ry}`;
  };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {scenarios.map((s,i)=>(
          <button key={i} onClick={()=>{setScenario(i);reset();}} style={{
            padding:"7px 4px",borderRadius:10,fontSize:9,cursor:"pointer",
            background:scenario===i?`${s.color}22`:"rgba(255,255,255,0.05)",
            border:`1.5px solid ${scenario===i?s.color:"rgba(255,255,255,0.1)"}`,
            color:scenario===i?s.color:C.muted,fontWeight:scenario===i?700:400,textAlign:"center",
          }}>{s.label[lang]||s.label.fr}</button>
        ))}
      </div>

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect width={W} height={H} fill="#061020" rx="8"/>
        {[40,80,120,160].map(y=><path key={y} d={`M0,${y} Q72,${y-3} 145,${y} Q218,${y+3} ${W},${y}`} fill="none" stroke="rgba(77,166,255,0.05)" strokeWidth="0.8"/>)}
        {isDanger&&<circle cx={(posA.x+posB.x)/2} cy={(posA.y+posB.y)/2} r={38} fill="rgba(192,57,43,0.1)" stroke={C.red} strokeWidth="1.5" strokeDasharray="4,3"><animate attributeName="r" values="33;43;33" dur="0.8s" repeatCount="indefinite"/></circle>}
        <line x1={posA.x-18*Math.cos(sc.headA*Math.PI/180)} y1={posA.y-18*Math.sin(sc.headA*Math.PI/180)} x2={posA.x} y2={posA.y} stroke={sc.cA} strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
        <line x1={posB.x-18*Math.cos(sc.headB*Math.PI/180)} y1={posB.y-18*Math.sin(sc.headB*Math.PI/180)} x2={posB.x} y2={posB.y} stroke={sc.cB} strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
        {dist<60&&<line x1={posA.x} y1={posA.y} x2={posB.x} y2={posB.y} stroke={isDanger?C.red:C.gold2} strokeWidth="1" strokeDasharray="4,2" opacity="0.4"/>}
        <polygon points={shipPts(posA.x,posA.y,sc.headA)} fill={sc.cA} opacity="0.9"/>
        <polygon points={shipPts(posB.x,posB.y,sc.headB)} fill={sc.cB} opacity="0.9"/>
        <rect x={posA.x-20} y={posA.y-26} width={40} height={14} rx={4} fill="rgba(0,0,0,0.7)" stroke={sc.cA} strokeWidth="0.8"/>
        <text x={posA.x} y={posA.y-16} textAnchor="middle" fontSize="7" fill={sc.cA} fontWeight="700">{sc.lA}</text>
        <rect x={posB.x-20} y={posB.y+14} width={40} height={14} rx={4} fill="rgba(0,0,0,0.7)" stroke={sc.cB} strokeWidth="0.8"/>
        <text x={posB.x} y={posB.y+24} textAnchor="middle" fontSize="7" fill={sc.cB} fontWeight="700">{sc.lB}</text>
        <rect x="0" y="0" width={W} height="16" fill="rgba(0,0,0,0.6)"/>
        <text x="8" y="11" fontSize="7" fill={isDanger?C.red:C.green}>
          {isDanger?(lang==="fr"?"⚠️ RISQUE D'ABORDAGE !":lang==="en"?"⚠️ COLLISION RISK!":"⚠️ ¡RIESGO ABORDAJE!"):`✅ ${sc.rule} · dist: ${dist}`}
        </text>
        <rect x="0" y={H-5} width={tick/90*W} height={5} fill={sc.color} opacity="0.4"/>
      </svg>

      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button onClick={()=>setRunning(v=>!v)} style={{flex:2,padding:"10px 0",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",background:running?`rgba(192,57,43,0.2)`:`${sc.color}22`,border:`1.5px solid ${running?C.red:sc.color}`,color:running?C.red:sc.color}}>
          {running?(lang==="fr"?"⏸ PAUSE":"⏸ PAUSE"):tick===0?(lang==="fr"?"▶ LANCER":"▶ START"):(lang==="fr"?"▶ REPRENDRE":"▶ RESUME")}
        </button>
        <button onClick={reset} style={{flex:1,padding:"10px 0",borderRadius:12,fontSize:11,cursor:"pointer",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:C.muted}}>↺</button>
      </div>

      <div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sc.color}10`,border:`1px solid ${sc.color}33`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>
        <div style={{fontWeight:700,color:sc.color,marginBottom:4}}>{sc.rule} — {sc.label[lang]||sc.label.fr}</div>
        {sc.desc[lang]||sc.desc.fr}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — NAVIGATION LIGHTS
// ══════════════════════════════════════
function NavLightsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const vessels = [
    {id:"power",label:{fr:"Moteur (de face)",en:"Power (ahead)",es:"Motor (de proa)",pt:"Motor (de proa)"},rule:"Rule 23",color:C.blue2,
     lights:[{x:145,y:48,r:7,c:"white",l:{fr:"Blanc mât",en:"Masthead white",es:"Blanco palo",pt:"Branco mastro"}},{x:82,y:85,r:6,c:"#ff4444",l:{fr:"Rouge bâbord",en:"Port red",es:"Rojo babor",pt:"Vermelho bombordo"}},{x:208,y:85,r:6,c:"#44ff44",l:{fr:"Vert tribord",en:"Starboard green",es:"Verde estribor",pt:"Verde estibordo"}}],
     desc:{fr:"De face : blanc + rouge + vert\nDe tribord : blanc + vert\nDe bâbord : blanc + rouge\nDe poupe : blanc uniquement",en:"Head-on: white+red+green · Starboard: white+green\nPort: white+red · Stern: white only",es:"De proa: blanco+rojo+verde · De popa: blanco solo",pt:"De proa: branco+verm+verde · De popa: branco só"}},
    {id:"anchor",label:{fr:"Navire à l'ancre",en:"At anchor",es:"Fondeado",pt:"Fundeado"},rule:"Rule 30",color:C.gold2,
     lights:[{x:145,y:55,r:9,c:"white",l:{fr:"Blanc tout-horizon",en:"All-round white",es:"Blanco todo horizonte",pt:"Branco todo-horizonte"}}],
     desc:{fr:"1 blanc tout-horizon (< 50m)\n2 blancs (> 50m)\nJour : boule noire à la proue\nObligatoire même au mouillage",en:"1 all-round white (<50m) · 2 whites (>50m)\nDay: black ball at bow · Mandatory at anchor",es:"1 blanco todo horizonte (<50m) · 2 blancos (>50m)\nDía: bola negra en la proa",pt:"1 branco todo-horizonte (<50m) · 2 brancos (>50m)\nDia: bola negra na proa"}},
    {id:"nuc",label:{fr:"NUC",en:"NUC",es:"NBC",pt:"NMC"},rule:"Rule 27",color:C.red,
     lights:[{x:145,y:48,r:6,c:"#ff4444",l:{fr:"Rouge",en:"Red",es:"Rojo",pt:"Vermelho"}},{x:145,y:72,r:6,c:"#ff4444",l:{fr:"Rouge",en:"Red",es:"Rojo",pt:"Vermelho"}}],
     desc:{fr:"2 rouges verticaux + feux de route\nSignal sonore : 1 long + 2 courts / 2 min\nTOUS les navires s'écartent",en:"2 vertical reds + running lights\nSound: 1 long+2 short / 2 min · ALL vessels clear",es:"2 rojos verticales + luces de navegación\nSeñal: 1 larga+2 cortas / 2 min",pt:"2 vermelhos verticais + luzes de navegação\nSinal: 1 longa+2 curtas / 2 min"}},
    {id:"towing",label:{fr:"Remorqueur",en:"Towing",es:"Remolcador",pt:"Rebocador"},rule:"Rule 24",color:C.orange,
     lights:[{x:145,y:38,r:7,c:"white",l:{fr:"Blanc (avant)",en:"White (fore)",es:"Blanco (proa)",pt:"Branco (proa)"}},{x:145,y:60,r:7,c:"white",l:{fr:"Blanc (arrière)",en:"White (aft)",es:"Blanco (popa)",pt:"Branco (popa)"}},{x:145,y:82,r:6,c:"#ffdd00",l:{fr:"Jaune (remorque)",en:"Yellow (tow)",es:"Amarillo (remolque)",pt:"Amarelo (reboque)"}}],
     desc:{fr:"Remorque <200m : 2 blancs + 1 jaune\nRemorque >200m : 3 blancs + 1 jaune\n+ feux de côté rouge/vert",en:"Tow <200m: 2 white+1 yellow · Tow >200m: 3 white+1 yellow\n+ side lights red/green",es:"Remolque <200m: 2 blancos+1 amarillo\n>200m: 3 blancos+1 amarillo + luces costado",pt:"Reboque <200m: 2 brancos+1 amarelo\n>200m: 3 brancos+1 amarelo + luzes costado"}},
  ];
  const sel_ = sel ? vessels.find(v=>v.id===sel) : null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {vessels.map(v=>(
          <button key={v.id} onClick={()=>setSel(sel===v.id?null:v.id)} style={{padding:"8px 6px",borderRadius:10,fontSize:9,cursor:"pointer",background:sel===v.id?`${v.color}22`:"rgba(255,255,255,0.05)",border:`1.5px solid ${sel===v.id?v.color:"rgba(255,255,255,0.1)"}`,color:sel===v.id?v.color:C.muted,fontWeight:sel===v.id?700:400}}>
            {v.label[lang]||v.label.fr}
          </button>
        ))}
      </div>
      {sel_ && <>
        <svg width="290" height="130" viewBox="0 0 290 130">
          <rect width="290" height="130" fill="#000814" rx="8"/>
          {[[20,15],[60,25],[100,10],[180,20],[220,12],[260,28],[40,35],[150,8]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={0.8} fill="white" opacity="0.3"/>)}
          <path d="M80,105 L85,88 L145,83 L205,88 L215,105 Q200,113 145,115 Q90,113 80,105 Z" fill="#0a1628" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
          <line x1="145" y1="38" x2="145" y2="88" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          {sel_.lights.map((lt,i)=>(
            <g key={i}>
              <circle cx={lt.x} cy={lt.y} r={lt.r*3} fill={lt.c} opacity="0.05"/>
              <circle cx={lt.x} cy={lt.y} r={lt.r*1.8} fill={lt.c} opacity="0.1"/>
              <circle cx={lt.x} cy={lt.y} r={lt.r} fill={lt.c} opacity="0.95"><animate attributeName="opacity" values="0.95;0.55;0.95" dur="2s" repeatCount="indefinite"/></circle>
            </g>
          ))}
          <rect x="5" y="5" width="55" height="14" rx="4" fill="rgba(0,0,0,0.6)" stroke={sel_.color} strokeWidth="0.8"/>
          <text x="32" y="14" textAnchor="middle" fontSize="7" fill={sel_.color} fontWeight="700">{sel_.rule}</text>
        </svg>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,margin:"8px 0"}}>
          {sel_.lights.map((lt,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:8,background:`${lt.c}15`,border:`1px solid ${lt.c}44`}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:lt.c}}/>
              <span style={{fontSize:9,color:lt.c}}>{lt.l[lang]||lt.l.fr}</span>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}10`,border:`1px solid ${sel_.color}33`,fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </>}
      {!sel_&&<div style={{textAlign:"center",padding:"16px",fontSize:11,color:C.muted}}>{lang==="fr"?"Sélectionne un type de navire":lang==="en"?"Select a vessel type":lang==="es"?"Selecciona un tipo de buque":"Selecione um tipo de navio"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — SOUND SIGNALS
// ══════════════════════════════════════
function SoundSignals({ lang }) {
  const [open, setOpen] = useState(null);
  const sigs = [
    {id:"s1",sym:"·",color:C.blue2,label:{fr:"1 court",en:"1 short",es:"1 corto",pt:"1 curto"},meaning:{fr:"Je vire à TRIBORD",en:"Altering course to STARBOARD",es:"Giro a ESTRIBOR",pt:"Viro a ESTIBORDO"},rule:"Rule 34"},
    {id:"s2",sym:"··",color:C.teal,label:{fr:"2 courts",en:"2 short",es:"2 cortos",pt:"2 curtos"},meaning:{fr:"Je vire à BÂBORD",en:"Altering course to PORT",es:"Giro a BABOR",pt:"Viro a BOMBORDO"},rule:"Rule 34"},
    {id:"s3",sym:"···",color:C.orange,label:{fr:"3 courts",en:"3 short",es:"3 cortos",pt:"3 curtos"},meaning:{fr:"Je bats en ARRIÈRE",en:"My engines going ASTERN",es:"Mis máquinas van ATRÁS",pt:"Minhas máquinas a RÉ"},rule:"Rule 34"},
    {id:"s5",sym:"·····",color:C.red,label:{fr:"5+ courts (ALARME)",en:"5+ short (ALARM)",es:"5+ cortos (ALARMA)",pt:"5+ curtos (ALARME)"},meaning:{fr:"DANGER ! Je ne comprends pas vos intentions\nOu : situation dangereuse imminente",en:"DANGER! I do not understand your intentions\nOr: imminent dangerous situation",es:"¡PELIGRO! No entiendo sus intenciones",pt:"PERIGO! Não entendo suas intenções"},rule:"Rule 34"},
    {id:"l1",sym:"—",color:C.purple,label:{fr:"1 long (brume)",en:"1 long (fog)",es:"1 largo (niebla)",pt:"1 longo (nevoeiro)"},meaning:{fr:"Navire à moteur en marche avant\n(toutes les 2 minutes par brume)",en:"Power vessel making way\n(every 2 minutes in fog)",es:"Buque de motor en marcha\n(cada 2 minutos en niebla)",pt:"Navio a motor em marcha\n(cada 2 minutos em nevoeiro)"},rule:"Rule 35"},
    {id:"l2",sym:"—··",color:C.gold2,label:{fr:"1 long + 2 courts",en:"1 long + 2 short",es:"1 largo + 2 cortos",pt:"1 longo + 2 curtos"},meaning:{fr:"Brume : NUC · RAM · Voilier · Ancre >100m\n(toutes les 2 minutes)",en:"Fog: NUC · RAM · Sailing · Anchor >100m\n(every 2 minutes)",es:"Niebla: NBC · MCM · Velero · Fondeado >100m",pt:"Nevoeiro: NMC · CAM · Veleiro · Fundeado >100m"},rule:"Rule 35"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {sigs.map(s=>(
        <div key={s.id} onClick={()=>setOpen(open===s.id?null:s.id)}
          style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:open===s.id?`${s.color}18`:"rgba(255,255,255,0.04)",border:`1.5px solid ${open===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"monospace",fontSize:18,fontWeight:900,color:s.color,minWidth:56,letterSpacing:3}}>{s.sym}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,fontWeight:700,color:s.color}}>{s.label[lang]||s.label.fr}</div>
              <div style={{fontSize:9,color:C.muted}}>{s.rule}</div>
            </div>
            <span style={{fontSize:10,color:C.muted}}>{open===s.id?"▲":"▼"}</span>
          </div>
          {open===s.id&&<div style={{fontSize:11,color:C.white,lineHeight:1.6,whiteSpace:"pre-line",paddingTop:8,borderTop:`1px solid ${s.color}22`,marginTop:6,animation:"fadeUp 0.3s ease"}}>{s.meaning[lang]||s.meaning.fr}</div>}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Croisement : A vient de TRIBORD de B.\nQui est le navire PRIVILÉGIÉ ?\na) B · b) A · c) les deux · d) aucun"},
      {id:"q2",q:"Face à face (Rule 14). Que font A et B ?\na) Les deux virent à TRIBORD\nb) A maintient, B cède\nc) Le plus rapide maintient\nd) Rien"},
      {id:"q3",q:"Rattrapage (Rule 13). B rattrape A.\nQui est TOUJOURS manœuvrant ?\na) A (rattrapé) · b) Le plus vite\nc) B (qui rattrape) · d) Dépend"},
    ],
    en:[
      {id:"q1",q:"Crossing: A is on B's STARBOARD side.\nWho is the STAND-ON vessel?\na) B · b) A · c) both · d) neither"},
      {id:"q2",q:"Head-on (Rule 14). What do A and B do?\na) Both alter to STARBOARD\nb) A stands on, B gives way\nc) Faster holds · d) Nothing"},
      {id:"q3",q:"Overtaking (Rule 13). B overtakes A.\nWho is ALWAYS give-way?\na) A (overtaken) · b) The faster\nc) B (overtaking) · d) It depends"},
    ],
    es:[
      {id:"q1",q:"Cruce: A está por ESTRIBOR de B.\n¿Quién es el buque PRIVILEGIADO?\na) B · b) A · c) ambos · d) ninguno"},
      {id:"q2",q:"Cara a cara (Regla 14). ¿Qué hacen A y B?\na) Ambos viran a ESTRIBOR\nb) A mantiene, B cede\nc) El más rápido · d) Nada"},
      {id:"q3",q:"Alcance (Regla 13). B alcanza a A.\n¿Quién es SIEMPRE de maniobra?\na) A (alcanzado) · b) El más rápido\nc) B (que alcanza) · d) Depende"},
    ],
    pt:[
      {id:"q1",q:"Cruzamento: A está pelo ESTIBORDO de B.\nQuem é o navio PRIVILEGIADO?\na) B · b) A · c) ambos · d) nenhum"},
      {id:"q2",q:"Frente a frente (Regra 14). O que fazem A e B?\na) Ambos viram a ESTIBORDO\nb) A mantém, B cede\nc) O mais rápido · d) Nada"},
      {id:"q3",q:"Ultrapassagem (Regra 13). B ultrapassa A.\nQuem é SEMPRE de manobra?\na) A (ultrapassado) · b) O mais rápido\nc) B (que ultrapassa) · d) Depende"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  return (
    <div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.6,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="a, b, c ou d"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: b — A vient de tribord → A est privilégié (Rule 15)\n✅ Q2: a — Face à face : les DEUX virent à tribord (Rule 14)\n✅ Q3: c — B qui rattrape = TOUJOURS manœuvrant (Rule 13)":
         lang==="en"?"✅ Q1: b — A comes from starboard → A is stand-on (Rule 15)\n✅ Q2: a — Head-on: BOTH alter to starboard (Rule 14)\n✅ Q3: c — Overtaking vessel B = ALWAYS give-way (Rule 13)":
         "✅ Q1: b · Q2: a · Q3: c"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"MV Bright Field — Mississippi, La Nouvelle-Orléans (1996)",teaser:"Cargo · Panne moteur · NUC non déclaré · 116 blessés · Quai touristique détruit",what:"Le cargo Bright Field descend le Mississippi à La Nouvelle-Orléans. Le moteur tombe en panne face au quai touristique Riverwalk. Le navire dérive et percute les boutiques du quai à grande vitesse. 116 blessés, dégâts matériels considérables.",cause:"• Panne moteur non déclarée immédiatement comme NUC (Rule 27)\n• Pas de remorqueur d'assistance prépositionné\n• Vitesse excessive pour le Mississippi (courant 5 kn)\n• Communication insuffisante pilote ↔ passerelle\n• Mouillage d'urgence non tenté\n• 5 sons courts d'alarme non émis",lessons:"✓ Déclarer NUC IMMÉDIATEMENT en cas de panne propulsion\n✓ Émettre 5+ sons courts (Rule 34) = alarme pour les autres navires\n✓ Vitesse adaptée aux courants de fleuve\n✓ Mouillage d'urgence = manœuvre obligatoire à maîtriser\n✓ Résultat : nouvelles règles navigation fluviale USA",link:"🔗 Lien L8 : Un NUC déclaré + 5 sons courts auraient alerté les autres navires et le port. COLREG = obligations LÉGALES, pas des recommandations."},
    en:{title:"MV Bright Field — Mississippi, New Orleans (1996)",teaser:"Cargo vessel · Engine failure · NUC not declared · 116 injured · Tourist wharf destroyed",what:"The cargo vessel Bright Field descends the Mississippi at New Orleans. The engine fails opposite the Riverwalk tourist wharf. The vessel drifts and strikes the shopping area at high speed. 116 injured, major property damage.",cause:"• Engine failure not immediately declared as NUC (Rule 27)\n• No assist tug pre-positioned\n• Excessive speed for Mississippi River (5kn current)\n• Insufficient pilot ↔ bridge communication\n• Emergency anchoring not attempted\n• 5 short alarm blasts not sounded",lessons:"✓ Declare NUC IMMEDIATELY upon propulsion failure\n✓ Sound 5+ short blasts (Rule 34) = alarm for other vessels\n✓ Speed appropriate for river currents\n✓ Emergency anchoring = mandatory manœuvre to master\n✓ Result: new US inland waterway navigation rules",link:"🔗 L8 Link: A declared NUC + 5 short blasts would have alerted other vessels and the port. COLREG = LEGAL obligations, not recommendations."},
    es:{title:"MV Bright Field — Mississippi, Nueva Orleans (1996)",teaser:"Buque de carga · Avería motor · NBC no declarado · 116 heridos · Muelle turístico destruido",what:"El buque Bright Field desciende el Mississippi en Nueva Orleans. El motor avería frente al muelle turístico Riverwalk. El buque deriva y choca con las tiendas del muelle a gran velocidad. 116 heridos.",cause:"• Avería motor no declarada como NBC (Regla 27)\n• Sin remolcador de asistencia\n• Velocidad excesiva para el Mississippi (corriente 5 kn)\n• Comunicación insuficiente práctico ↔ puente",lessons:"✓ Declarar NBC INMEDIATAMENTE ante fallo de propulsión\n✓ Emitir 5+ pitidos cortos (Regla 34)\n✓ Velocidad adaptada a las corrientes del río\n✓ Resultado: nuevas reglas navegación fluvial USA",link:"🔗 Vínculo L8: Un NBC declarado + 5 pitidos cortos habrían alertado a otros buques. COLREG = obligaciones LEGALES."},
    pt:{title:"MV Bright Field — Mississippi, Nova Orleães (1996)",teaser:"Navio de carga · Avaria motor · NMC não declarado · 116 feridos · Cais turístico destruído",what:"O navio Bright Field desce o Mississippi em Nova Orleães. O motor avaria em frente ao cais turístico Riverwalk. O navio deriva e embate nas lojas do cais a grande velocidade. 116 feridos.",cause:"• Avaria motor não declarada como NMC (Regra 27)\n• Sem rebocador de assistência pré-posicionado\n• Velocidade excessiva para o Mississippi (corrente 5 nós)\n• Comunicação insuficiente piloto ↔ ponte",lessons:"✓ Declarar NMC IMEDIATAMENTE quando a propulsão falha\n✓ Emitir 5+ toques curtos (Regra 34)\n✓ Velocidade adaptada às correntes do rio\n✓ Resultado: novas regras navegação fluvial EUA",link:"🔗 Vínculo L8: Um NMC declarado + 5 toques curtos teriam alertado outros navios. COLREG = obrigações LEGAIS."},
  };
  const c = d[lang]||d.fr;
  return (
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
// QUIZ
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Rule 15 — Croisement : A vient de TRIBORD de B. Qui cède la route ?",opts:["A — qui vient de tribord","B — navire manœuvrant, cède à celui de tribord","Les deux virent à tribord","Le plus lent"],correct:1,expl:"Rule 15 : en situation de croisement, le navire qui a l'autre sur son TRIBORD est le navire MANŒUVRANT. Il doit céder. Le navire venant de tribord = PRIVILÉGIÉ. Mémo : Tribord = Privilégié."},
    {q:"Rule 14 — Face à face : deux navires se font face. Que font-ils ?",opts:["Le plus rapide maintient","Chacun vire à bâbord","Les DEUX virent à TRIBORD — se croiser par bâbord","Ils attendent"],correct:2,expl:"Rule 14 : face à face, les DEUX sont manœuvrants. Les deux virent à TRIBORD pour se croiser BÂBORD à BÂBORD. Même si pas sûr : virer à tribord dès le doute."},
    {q:"Rule 13 — Rattrapage : qui est TOUJOURS le navire manœuvrant ?",opts:["Le navire rattrapé (A)","Le plus rapide","Le navire qui rattrape (B) — TOUJOURS","Dépend du type de navire"],correct:2,expl:"Rule 13 : le navire qui RATTRAPE est TOUJOURS manœuvrant. Même un voilier rattrapant un navire à moteur doit céder. Le navire rattrapé = TOUJOURS privilégié."},
    {q:"Hiérarchie Rule 18 — Quel navire a la priorité absolue ?",opts:["Le voilier","Le navire à moteur","Le NUC (Non Maîtrisable)","Le navire de pêche"],correct:2,expl:"Rule 18 : NUC > RAM > Gêné par tirant d'eau > Pêche > Voilier > Navire à moteur. NUC = priorité absolue car en panne, incapable de manœuvrer. Le navire à moteur = priorité la plus basse, doit céder à tous."},
    {q:"Que signifient 5 sons courts rapides sur la corne de brume ?",opts:["Signal de brume par mauvaise visibilité","ALARME : danger ou je ne comprends pas vos intentions","Je bats en arrière","Entrée en port"],correct:1,expl:"Rule 34 : 5 sons courts = signal d'ALARME ou de doute. Signifie : danger immédiat ou je ne comprends pas vos intentions. À émettre dès qu'on doute. Si on entend 5 sons courts : DANGER, réduire vitesse, évaluer la situation immédiatement."},
  ],
  en:[
    {q:"Rule 15 — Crossing: A is on B's STARBOARD. Who gives way?",opts:["A — coming from starboard","B — give-way vessel, must give way to vessel on its starboard","Both alter to starboard","The slower one"],correct:1,expl:"Rule 15: in a crossing situation, the vessel with the other on its STARBOARD is the GIVE-WAY vessel. Must give way. Vessel coming from starboard = STAND-ON. Memory: Starboard = Stand-on."},
    {q:"Rule 14 — Head-on: two vessels meeting. What do they do?",opts:["Faster maintains","Each alters to port","BOTH alter to STARBOARD — pass port-to-port","They wait"],correct:2,expl:"Rule 14: head-on, BOTH are give-way. Both alter to STARBOARD to pass PORT-TO-PORT. Even if not sure: alter to starboard at first sign of doubt."},
    {q:"Rule 13 — Overtaking: who is ALWAYS give-way?",opts:["The overtaken vessel (A)","The faster one","The overtaking vessel (B) — ALWAYS","Depends on vessel type"],correct:2,expl:"Rule 13: the OVERTAKING vessel is ALWAYS give-way. Even a sailing vessel overtaking a power vessel must give way. Overtaken vessel = ALWAYS stand-on."},
    {q:"Hierarchy Rule 18 — Which vessel has absolute priority?",opts:["Sailing vessel","Power vessel","NUC (Not Under Command)","Fishing vessel"],correct:2,expl:"Rule 18: NUC > RAM > Constrained by draft > Fishing > Sailing > Power. NUC = absolute priority, unable to manœuvre. Power vessel = lowest priority, gives way to everyone."},
    {q:"What do 5 rapid short blasts on the horn mean?",opts:["Fog signal in poor visibility","ALARM: danger or I don't understand your intentions","Going astern","Port entry"],correct:1,expl:"Rule 34: 5 short blasts = ALARM or doubt signal. Means: immediate danger or I don't understand your intentions. Sound whenever in doubt. On hearing 5 short blasts: DANGER, reduce speed, assess immediately."},
  ],
  es:[
    {q:"Regla 15 — Cruce: A está por ESTRIBOR de B. ¿Quién cede?",opts:["A — el que viene por estribor","B — buque de maniobra, cede al de estribor","Ambos viran a estribor","El más lento"],correct:1,expl:"Regla 15: en cruce, el que tiene al otro por su ESTRIBOR es el buque DE MANIOBRA. Debe ceder. El que viene de estribor = PRIVILEGIADO."},
    {q:"Regla 14 — Cara a cara: ¿qué hacen?",opts:["El más rápido mantiene","Cada uno vira a babor","AMBOS viran a ESTRIBOR — cruzarse babor a babor","Esperan"],correct:2,expl:"Regla 14: cara a cara, AMBOS son de maniobra. Ambos viran a ESTRIBOR para cruzarse BABOR CON BABOR."},
    {q:"Regla 13 — Alcance: ¿quién es SIEMPRE de maniobra?",opts:["El buque alcanzado (A)","El más rápido","El buque que alcanza (B) — SIEMPRE","Depende del tipo"],correct:2,expl:"Regla 13: el buque que ALCANZA es SIEMPRE de maniobra. Incluso un velero que alcanza a un buque de motor debe ceder."},
    {q:"Jerarquía Regla 18 — ¿Qué buque tiene prioridad absoluta?",opts:["El velero","El buque de motor","El NBC (No Gobernado)","El buque pesquero"],correct:2,expl:"Regla 18: NBC > MCM > Calado > Pesca > Velero > Motor. NBC = prioridad absoluta, incapaz de maniobrar. Motor = prioridad más baja."},
    {q:"¿Qué significan 5 pitidos cortos rápidos?",opts:["Señal de niebla","ALARMA: peligro o no entiendo sus intenciones","Máquinas atrás","Entrada al puerto"],correct:1,expl:"Regla 34: 5 pitidos cortos = señal de ALARMA o duda. Al oír 5 pitidos: PELIGRO, reducir velocidad, evaluar inmediatamente."},
  ],
  pt:[
    {q:"Regra 15 — Cruzamento: A está pelo ESTIBORDO de B. Quem cede?",opts:["A — que vem pelo estibordo","B — navio de manobra, cede ao de estibordo","Ambos viram a estibordo","O mais lento"],correct:1,expl:"Regra 15: em cruzamento, o que tem o outro pelo seu ESTIBORDO é o navio DE MANOBRA. Deve ceder. O que vem de estibordo = PRIVILEGIADO."},
    {q:"Regra 14 — Frente a frente: o que fazem?",opts:["O mais rápido mantém","Cada um vira a bombordo","AMBOS viram a ESTIBORDO — cruzar bombordo com bombordo","Esperam"],correct:2,expl:"Regra 14: frente a frente, AMBOS são de manobra. Ambos viram a ESTIBORDO para cruzar BOMBORDO COM BOMBORDO."},
    {q:"Regra 13 — Ultrapassagem: quem é SEMPRE de manobra?",opts:["O navio ultrapassado (A)","O mais rápido","O navio que ultrapassa (B) — SEMPRE","Depende do tipo"],correct:2,expl:"Regra 13: o navio que ULTRAPASSA é SEMPRE de manobra. Mesmo um veleiro que ultrapassa um navio a motor deve ceder."},
    {q:"Hierarquia Regra 18 — Qual navio tem prioridade absoluta?",opts:["O veleiro","O navio a motor","O NMC (Não Governável)","O navio de pesca"],correct:2,expl:"Regra 18: NMC > CAM > Calado > Pesca > Veleiro > Motor. NMC = prioridade absoluta, incapaz de manobrar."},
    {q:"O que significam 5 toques curtos rápidos?",opts:["Sinal de nevoeiro","ALARME: perigo ou não entendo suas intenções","Máquinas a ré","Entrada no porto"],correct:1,expl:"Regra 34: 5 toques curtos = sinal de ALARME ou dúvida. Ao ouvir 5 toques: PERIGO, reduzir velocidade, avaliar imediatamente."},
  ],
};

// ══════════════════════════════════════
// BANK 15 QUESTIONS
// ══════════════════════════════════════
const BANK = {
  fr:[
  {q:"Que signifie 'navire manœuvrant' (give-way vessel) ?",opts:["Le navire le plus rapide","Le navire qui doit s'écarter par une action franche et positive","Le navire le plus grand","Le navire militaire"],correct:1,expl:"Navire manœuvrant = doit prendre une action franche, positive et suffisamment tôt pour s'écarter. Action tardive = infraction Rule 8."},
  {q:"Rule 5 : définition d'une bonne veille ?",opts:["Surveiller uniquement par radar","Veille permanente par vue, ouïe et tous les moyens disponibles","4 heures sur 24","Regarder uniquement à l'avant"],correct:1,expl:"Rule 5 : veille permanente par la vue, l'ouïe et tous les moyens disponibles. Vue + radar + AIS + VHF. 24h/24, par tous temps."},
  {q:"Rule 7 : risque d'abordage — comment le détecter ?",opts:["Distance < 1 mille","Relèvement constant + distance diminue","Même vitesse","Même TSS"],correct:1,expl:"Rule 7 : risque d'abordage si le relèvement d'un navire approchant reste constant. Relèvement constant + distance diminue = collision certaine si pas de manœuvre."},
  {q:"Rule 8 : qu'est-ce qu'une 'action franche' ?",opts:["Réduire de 1 nœud","Changement de cap/vitesse suffisamment grand pour être clairement perçu","Allumer les feux de détresse","Appeler sur VHF 16"],correct:1,expl:"Rule 8 : action franche = changement clairement perceptible. Un virement de 5° n'est pas franc. 30° ou plus = franc. Doit être pris tôt — pas à la dernière minute."},
  {q:"Un voilier fait route moteur. Il est considéré comme ?",opts:["Voilier — conserve sa priorité","Navire à propulsion mécanique — priorité la plus basse","RAM — capacité restreinte","NUC — risque de panne"],correct:1,expl:"Rule 25 : voilier au moteur (même voiles dehors) = navire à propulsion mécanique. Doit afficher un cône noir pointe en bas. Priorité la plus basse."},
  {q:"Rule 10 : traversée d'un TSS — quel angle ?",opts:["Dans le sens du trafic","À angle aussi proche que possible de 90° des voies","N'importe quel angle","Par les extrémités"],correct:1,expl:"Rule 10 : traverser un TSS à angle aussi proche que possible de 90°. Permet aux autres navires de voir clairement les intentions."},
  {q:"Qu'est-ce que le CPA ?",opts:["Distance maximale entre navires","Distance minimale à laquelle deux navires se rapprocheront sans manœuvre","Distance à la côte","Visibilité par brouillard"],correct:1,expl:"CPA = Closest Point of Approach. Distance minimale si aucun navire ne manœuvre. Calculé par ARPA. TCPA = temps avant d'atteindre le CPA."},
  {q:"Rule 9 — Chenal étroit : comment naviguer ?",opts:["Au centre","Longer le côté TRIBORD autant que possible","Côté bâbord","N'importe quel côté"],correct:1,expl:"Rule 9 : dans un chenal étroit, longer le bord tribord autant que possible. Comme sur une route. Interdit de traverser si on gêne un navire ne pouvant quitter le chenal."},
  {q:"Les feux de navigation doivent être allumés quand ?",opts:["Uniquement de minuit à 6h","Du coucher au lever du soleil ET par visibilité réduite de jour","Uniquement la nuit","De 18h à 6h"],correct:1,expl:"Rule 20 : feux obligatoires du coucher au lever du soleil ET le jour par visibilité réduite (brouillard, pluie, neige)."},
  {q:"Rule 19 — Conduite par visibilité réduite : règle principale ?",opts:["Mouiller immédiatement","Vitesse de sécurité + radar + signaux sonores de brume","Allumer tous les feux","Appeler les autorités"],correct:1,expl:"Rule 19 : visibilité réduite = vitesse de sécurité (arrêter en 1/2 distance de visibilité), radar, signaux sonores toutes les 2 min, prêt à stopper."},
  {q:"Que signifie 'Mayday' (Rule 37 + Annexe IV) ?",opts:["Information nautique importante","DÉTRESSE — danger de mort, assistance immédiate requise","Problème sérieux sans danger de mort","Confirmation de position"],correct:1,expl:"Mayday = DÉTRESSE absolue. Répété 3 fois. Pan Pan = URGENCE (sérieux mais pas mortel). Sécurité = information nautique. Mayday prime tous les autres trafics."},
  {q:"Un navire NUC doit émettre quel signal sonore par brume ?",opts:["1 son long","2 sons courts","1 long + 2 courts toutes les 2 minutes","5 sons courts"],correct:2,expl:"Rule 35 : NUC, RAM, voilier, navire à l'ancre > 100m = 1 long + 2 courts toutes les 2 minutes par brume. Le navire à moteur en marche = 1 long toutes les 2 minutes."},
  {q:"Rule 16 : que doit faire le navire manœuvrant ?",opts:["Réduire de 10%","Action franche et positive suffisamment tôt","Allumer les feux de détresse","Appeler sur VHF 16"],correct:1,expl:"Rule 16 : le navire manœuvrant DOIT prendre une action franche et positive le plus tôt possible. Ne pas attendre que l'autre doute."},
  {q:"Rule 17 : que peut faire le navire privilégié si collision imminente ?",opts:["Rien — il maintient toujours","Peut manœuvrer (Rule 17b) si collision inévitable malgré l'attente","Doit toujours virer à tribord","Doit accélérer"],correct:1,expl:"Rule 17 : normalement, le navire privilégié MAINTIENT. Mais si le manœuvrant n'agit pas et que collision devient inévitable, le privilégié PEUT manœuvrer (Rule 17b). Ne pas attendre jusqu'au dernier instant."},
  {q:"Quelle est la règle COLREG qui s'applique quand les navires ne sont pas en vue l'un de l'autre ?",opts:["Rule 11 (visibilité)","Rule 15 (croisement)","Rule 19 (visibilité réduite)","Rule 14 (face à face)"],correct:2,expl:"Rule 19 : conduite par visibilité réduite. S'applique quand les navires ne peuvent pas se voir directement (brouillard, pluie, nuit sans visibilité). Vitesse de sécurité, radar, signaux sonores obligatoires."},
  ],
  en:[
  {q:"What does 'give-way vessel' mean?",opts:["The fastest vessel","The vessel that must keep clear through a clear and positive action","The largest vessel","The military vessel"],correct:1,expl:"Give-way vessel = must take a clear, positive action early enough to keep clear. Late action = violation of Rule 8."},
  {q:"Rule 5: definition of a proper lookout?",opts:["Monitoring by radar only","Permanent lookout by sight, hearing and all available means","4 hours out of 24","Looking only ahead"],correct:1,expl:"Rule 5: permanent lookout by sight, hearing and all available means. Sight + radar + AIS + VHF. 24/7, in all weather."},
  {q:"Rule 7: risk of collision — how to detect it?",opts:["Distance < 1 mile","Constant bearing + decreasing distance","Same speed","Same TSS"],correct:1,expl:"Rule 7: risk of collision if the bearing of an approaching vessel remains constant. Constant bearing + decreasing distance = certain collision without maneuver."},
  {q:"Rule 8: what is a 'positive action'?",opts:["Reducing speed by 1 knot","A change of heading/speed large enough to be readily apparent","Turning on distress lights","Calling on VHF 16"],correct:1,expl:"Rule 8: positive action = clearly perceptible change. A 5° turn is not positive. 30° or more = positive. Must be taken early — not at the last minute."},
  {q:"A sailing vessel is under engine power. It is considered as?",opts:["A sailing vessel — retains its priority","A power-driven vessel — lowest priority","RAM — restricted maneuverability","NUC — risk of breakdown"],correct:1,expl:"Rule 25: a sailing vessel under power (even with sails set) = power-driven vessel. Must display a black cone point down. Lowest priority."},
  {q:"Rule 10: crossing a TSS — at what angle?",opts:["In the direction of traffic","At an angle as close to 90° as possible to the traffic lanes","Any angle","At the ends"],correct:1,expl:"Rule 10: cross a TSS at an angle as close to 90° as practicable. Allows other vessels to clearly see intentions."},
  {q:"What is CPA?",opts:["Maximum distance between vessels","Minimum distance at which two vessels will come close without maneuvering","Distance to the coast","Visibility in fog"],correct:1,expl:"CPA = Closest Point of Approach. Minimum distance if neither vessel maneuvers. Calculated by ARPA. TCPA = time before reaching the CPA."},
  {q:"Rule 9 — Narrow channel: how to navigate?",opts:["In the middle","Keep to the STARBOARD side as far as practicable","Port side","Any side"],correct:1,expl:"Rule 9: in a narrow channel, keep to the starboard side as far as practicable. Like driving on a road. Crossing is prohibited if it impedes a vessel that cannot leave the channel."},
  {q:"When must navigation lights be lit?",opts:["Only from midnight to 6am","From sunset to sunrise AND in restricted visibility during daytime","Only at night","From 6pm to 6am"],correct:1,expl:"Rule 20: lights mandatory from sunset to sunrise AND during daytime in restricted visibility (fog, rain, snow)."},
  {q:"Rule 19 — Conduct in restricted visibility: main rule?",opts:["Anchor immediately","Safe speed + radar + fog sound signals","Turn on all lights","Call the authorities"],correct:1,expl:"Rule 19: restricted visibility = safe speed (able to stop within half the visibility distance), radar, sound signals every 2 minutes, ready to stop."},
  {q:"What does 'Mayday' mean (Rule 37 + Annex IV)?",opts:["Important nautical information","DISTRESS — grave and imminent danger, immediate assistance required","Serious problem without danger to life","Position confirmation"],correct:1,expl:"Mayday = absolute DISTRESS. Repeated 3 times. Pan Pan = URGENCY (serious but not life-threatening). Sécurité = nautical information. Mayday takes priority over all other traffic."},
  {q:"What sound signal must a NUC vessel make in fog?",opts:["1 long blast","2 short blasts","1 long + 2 short every 2 minutes","5 short blasts"],correct:2,expl:"Rule 35: NUC, RAM, sailing vessel, vessel at anchor > 100m = 1 long + 2 short blasts every 2 minutes in fog. Power-driven vessel underway = 1 long blast every 2 minutes."},
  {q:"Rule 16: what must the give-way vessel do?",opts:["Reduce speed by 10%","A positive early action","Turn on distress lights","Call on VHF 16"],correct:1,expl:"Rule 16: the give-way vessel MUST take positive action as early as possible. Do not wait until the other vessel becomes uncertain."},
  {q:"Rule 17: what can the stand-on vessel do if collision is imminent?",opts:["Nothing — it always maintains course","Can maneuver (Rule 17b) if collision cannot be avoided by the give-way vessel's action alone","Must always turn to starboard","Must accelerate"],correct:1,expl:"Rule 17: normally, the stand-on vessel MAINTAINS course and speed. But if the give-way vessel fails to act and collision becomes unavoidable, the stand-on vessel MAY maneuver (Rule 17b). Do not wait until the last moment."},
  {q:"Which COLREG rule applies when vessels are not in sight of one another?",opts:["Rule 11 (visibility)","Rule 15 (crossing)","Rule 19 (restricted visibility)","Rule 14 (head-on)"],correct:2,expl:"Rule 19: conduct in restricted visibility. Applies when vessels cannot see each other directly (fog, rain, night without visibility). Safe speed, radar, sound signals mandatory."},
  ],
  es:[
  {q:"¿Qué significa 'buque que cede el paso' (give-way vessel)?",opts:["El buque más rápido","El buque que debe apartarse mediante una acción franca y positiva","El buque más grande","El buque militar"],correct:1,expl:"Buque que cede el paso = debe tomar una acción franca, positiva y suficientemente temprana para apartarse. Acción tardía = infracción a la Regla 8."},
  {q:"Regla 5: ¿definición de una buena vigilancia?",opts:["Vigilar únicamente por radar","Vigilancia permanente por vista, oído y todos los medios disponibles","4 horas de 24","Mirar únicamente hacia adelante"],correct:1,expl:"Regla 5: vigilancia permanente por la vista, el oído y todos los medios disponibles. Vista + radar + AIS + VHF. 24h/24, en todo tiempo."},
  {q:"Regla 7: riesgo de abordaje — ¿cómo detectarlo?",opts:["Distancia < 1 milla","Marcación constante + distancia disminuye","Misma velocidad","Mismo TSS"],correct:1,expl:"Regla 7: riesgo de abordaje si la marcación de un buque que se aproxima permanece constante. Marcación constante + distancia que disminuye = colisión segura sin maniobra."},
  {q:"Regla 8: ¿qué es una 'acción franca'?",opts:["Reducir 1 nudo","Cambio de rumbo/velocidad suficientemente grande para ser claramente percibido","Encender las luces de socorro","Llamar por VHF 16"],correct:1,expl:"Regla 8: acción franca = cambio claramente perceptible. Un viraje de 5° no es franco. 30° o más = franco. Debe tomarse pronto — no en el último minuto."},
  {q:"Un velero navega a motor. ¿Se considera como?",opts:["Velero — conserva su prioridad","Buque de propulsión mecánica — prioridad más baja","RAM — capacidad restringida","NUC — riesgo de avería"],correct:1,expl:"Regla 25: velero a motor (incluso con velas desplegadas) = buque de propulsión mecánica. Debe exhibir un cono negro con la punta hacia abajo. Prioridad más baja."},
  {q:"Regla 10: cruce de un TSS — ¿qué ángulo?",opts:["En el sentido del tráfico","Con un ángulo lo más cercano posible a 90° respecto a las vías","Cualquier ángulo","Por los extremos"],correct:1,expl:"Regla 10: cruzar un TSS con un ángulo lo más cercano posible a 90°. Permite a los demás buques ver claramente las intenciones."},
  {q:"¿Qué es el CPA?",opts:["Distancia máxima entre buques","Distancia mínima a la que se acercarán dos buques sin maniobrar","Distancia a la costa","Visibilidad con niebla"],correct:1,expl:"CPA = Closest Point of Approach. Distancia mínima si ningún buque maniobra. Calculado por ARPA. TCPA = tiempo antes de alcanzar el CPA."},
  {q:"Regla 9 — Canal angosto: ¿cómo navegar?",opts:["Por el centro","Mantenerse lo más cerca posible del lado de ESTRIBOR","Lado de babor","Cualquier lado"],correct:1,expl:"Regla 9: en un canal angosto, mantenerse lo más cerca posible del lado de estribor. Como en una carretera. Prohibido cruzar si se estorba a un buque que no puede salir del canal."},
  {q:"¿Cuándo deben encenderse las luces de navegación?",opts:["Solo de medianoche a las 6h","Desde la puesta hasta la salida del sol Y con visibilidad reducida de día","Solo de noche","De 18h a 6h"],correct:1,expl:"Regla 20: luces obligatorias desde la puesta hasta la salida del sol Y de día con visibilidad reducida (niebla, lluvia, nieve)."},
  {q:"Regla 19 — Conducta con visibilidad reducida: ¿regla principal?",opts:["Fondear inmediatamente","Velocidad de seguridad + radar + señales sonoras de niebla","Encender todas las luces","Llamar a las autoridades"],correct:1,expl:"Regla 19: visibilidad reducida = velocidad de seguridad (poder detenerse en la mitad de la distancia de visibilidad), radar, señales sonoras cada 2 min, listo para parar."},
  {q:"¿Qué significa 'Mayday' (Regla 37 + Anexo IV)?",opts:["Información náutica importante","SOCORRO — peligro de muerte, asistencia inmediata requerida","Problema serio sin peligro de muerte","Confirmación de posición"],correct:1,expl:"Mayday = SOCORRO absoluto. Repetido 3 veces. Pan Pan = URGENCIA (serio pero no mortal). Seguridad = información náutica. Mayday tiene prioridad sobre todo el demás tráfico."},
  {q:"¿Qué señal sonora debe emitir un buque NUC con niebla?",opts:["1 sonido largo","2 sonidos cortos","1 largo + 2 cortos cada 2 minutos","5 sonidos cortos"],correct:2,expl:"Regla 35: NUC, RAM, velero, buque fondeado > 100m = 1 largo + 2 cortos cada 2 minutos con niebla. El buque a motor en marcha = 1 largo cada 2 minutos."},
  {q:"Regla 16: ¿qué debe hacer el buque que cede el paso?",opts:["Reducir un 10%","Acción franca y positiva suficientemente temprana","Encender las luces de socorro","Llamar por VHF 16"],correct:1,expl:"Regla 16: el buque que cede el paso DEBE tomar una acción franca y positiva lo antes posible. No esperar a que el otro dude."},
  {q:"Regla 17: ¿qué puede hacer el buque privilegiado si la colisión es inminente?",opts:["Nada — siempre mantiene el rumbo","Puede maniobrar (Regla 17b) si la colisión es inevitable pese a la espera","Siempre debe virar a estribor","Debe acelerar"],correct:1,expl:"Regla 17: normalmente, el buque privilegiado MANTIENE el rumbo. Pero si el que cede el paso no actúa y la colisión se vuelve inevitable, el privilegiado PUEDE maniobrar (Regla 17b). No esperar hasta el último instante."},
  {q:"¿Qué regla del COLREG se aplica cuando los buques no están a la vista uno del otro?",opts:["Regla 11 (visibilidad)","Regla 15 (cruce)","Regla 19 (visibilidad reducida)","Regla 14 (de frente)"],correct:2,expl:"Regla 19: conducta con visibilidad reducida. Se aplica cuando los buques no pueden verse directamente (niebla, lluvia, noche sin visibilidad). Velocidad de seguridad, radar, señales sonoras obligatorias."},
  ],
  pt:[
  {q:"O que significa 'navio que cede a passagem' (give-way vessel)?",opts:["O navio mais rápido","O navio que deve afastar-se através de uma ação franca e positiva","O navio maior","O navio militar"],correct:1,expl:"Navio que cede a passagem = deve tomar uma ação franca, positiva e suficientemente cedo para se afastar. Ação tardia = infração à Regra 8."},
  {q:"Regra 5: definição de uma boa vigilância?",opts:["Vigiar apenas por radar","Vigilância permanente pela vista, ouvido e todos os meios disponíveis","4 horas de 24","Olhar apenas para a frente"],correct:1,expl:"Regra 5: vigilância permanente pela vista, ouvido e todos os meios disponíveis. Vista + radar + AIS + VHF. 24h/24, em qualquer tempo."},
  {q:"Regra 7: risco de abalroamento — como detetá-lo?",opts:["Distância < 1 milha","Marcação constante + distância diminui","Mesma velocidade","Mesmo TSS"],correct:1,expl:"Regra 7: risco de abalroamento se a marcação de um navio que se aproxima permanece constante. Marcação constante + distância a diminuir = colisão certa sem manobra."},
  {q:"Regra 8: o que é uma 'ação franca'?",opts:["Reduzir 1 nó","Mudança de rumo/velocidade suficientemente grande para ser claramente percebida","Acender as luzes de socorro","Chamar no VHF 16"],correct:1,expl:"Regra 8: ação franca = mudança claramente percetível. Uma guinada de 5° não é franca. 30° ou mais = franca. Deve ser tomada cedo — não no último minuto."},
  {q:"Um veleiro navega a motor. É considerado como?",opts:["Veleiro — conserva a sua prioridade","Navio de propulsão mecânica — prioridade mais baixa","RAM — capacidade restrita","NUC — risco de avaria"],correct:1,expl:"Regra 25: veleiro a motor (mesmo com velas içadas) = navio de propulsão mecânica. Deve exibir um cone preto com a ponta para baixo. Prioridade mais baixa."},
  {q:"Regra 10: travessia de um TSS — que ângulo?",opts:["No sentido do tráfego","Com um ângulo o mais próximo possível de 90° das vias","Qualquer ângulo","Pelas extremidades"],correct:1,expl:"Regra 10: atravessar um TSS com um ângulo o mais próximo possível de 90°. Permite aos outros navios ver claramente as intenções."},
  {q:"O que é o CPA?",opts:["Distância máxima entre navios","Distância mínima a que dois navios se aproximarão sem manobra","Distância à costa","Visibilidade com nevoeiro"],correct:1,expl:"CPA = Closest Point of Approach. Distância mínima se nenhum navio manobrar. Calculado pelo ARPA. TCPA = tempo antes de atingir o CPA."},
  {q:"Regra 9 — Canal estreito: como navegar?",opts:["Ao centro","Manter-se o mais próximo possível do lado de ESTIBORDO","Lado de bombordo","Qualquer lado"],correct:1,expl:"Regra 9: num canal estreito, manter-se o mais próximo possível do lado de estibordo. Como numa estrada. Proibido atravessar se isso impedir um navio que não pode sair do canal."},
  {q:"Quando devem estar acesas as luzes de navegação?",opts:["Apenas da meia-noite às 6h","Do pôr ao nascer do sol E com visibilidade reduzida de dia","Apenas à noite","Das 18h às 6h"],correct:1,expl:"Regra 20: luzes obrigatórias do pôr ao nascer do sol E de dia com visibilidade reduzida (nevoeiro, chuva, neve)."},
  {q:"Regra 19 — Conduta com visibilidade reduzida: regra principal?",opts:["Fundear imediatamente","Velocidade de segurança + radar + sinais sonoros de nevoeiro","Acender todas as luzes","Chamar as autoridades"],correct:1,expl:"Regra 19: visibilidade reduzida = velocidade de segurança (poder parar em metade da distância de visibilidade), radar, sinais sonoros a cada 2 min, pronto para parar."},
  {q:"O que significa 'Mayday' (Regra 37 + Anexo IV)?",opts:["Informação náutica importante","SOCORRO — perigo de morte, assistência imediata necessária","Problema sério sem perigo de morte","Confirmação de posição"],correct:1,expl:"Mayday = SOCORRO absoluto. Repetido 3 vezes. Pan Pan = URGÊNCIA (sério mas não mortal). Segurança = informação náutica. Mayday tem prioridade sobre todo o restante tráfego."},
  {q:"Que sinal sonoro deve emitir um navio NUC com nevoeiro?",opts:["1 som longo","2 sons curtos","1 longo + 2 curtos a cada 2 minutos","5 sons curtos"],correct:2,expl:"Regra 35: NUC, RAM, veleiro, navio fundeado > 100m = 1 longo + 2 curtos a cada 2 minutos com nevoeiro. O navio a motor em marcha = 1 longo a cada 2 minutos."},
  {q:"Regra 16: o que deve fazer o navio que cede a passagem?",opts:["Reduzir 10%","Ação franca e positiva suficientemente cedo","Acender as luzes de socorro","Chamar no VHF 16"],correct:1,expl:"Regra 16: o navio que cede a passagem DEVE tomar uma ação franca e positiva o mais cedo possível. Não esperar que o outro fique em dúvida."},
  {q:"Regra 17: o que pode fazer o navio privilegiado se a colisão for iminente?",opts:["Nada — mantém sempre o rumo","Pode manobrar (Regra 17b) se a colisão for inevitável apesar da espera","Deve sempre guinar a estibordo","Deve acelerar"],correct:1,expl:"Regra 17: normalmente, o navio privilegiado MANTÉM o rumo. Mas se o que cede a passagem não agir e a colisão se tornar inevitável, o privilegiado PODE manobrar (Regra 17b). Não esperar até ao último instante."},
  {q:"Que regra do COLREG se aplica quando os navios não estão à vista um do outro?",opts:["Regra 11 (visibilidade)","Regra 15 (cruzamento)","Regra 19 (visibilidade reduzida)","Regra 14 (de frente)"],correct:2,expl:"Regra 19: conduta com visibilidade reduzida. Aplica-se quando os navios não conseguem ver-se diretamente (nevoeiro, chuva, noite sem visibilidade). Velocidade de segurança, radar, sinais sonoros obrigatórios."},
  ],
};

// ══════════════════════════════════════
// BANK COMPONENT
// ══════════════════════════════════════
function QuestionBank({ lang }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const q=questions[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else setDone(true);};
  if(done) return <div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:8}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,marginBottom:4}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.red},${C.gold2})`}}/></div>
      <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
        {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return <button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;})}
      </div>
      {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.red},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":"NEXT →"):(lang==="fr"?"TERMINER":"FINISH")}</button></>}
    </div>
  );
}

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
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"📚 Navigation & Cartographie · Leçon 8/8 · ⭐ Premium · 200 XP · 🏁 FIN DU MODULE",
      title:"COLREG Avancé — Règles de Route en Mer",
      intro:"Le COLREG (Convention on the International Regulations for Preventing Collisions at Sea) est la LOI internationale de la navigation. 38 règles et 4 annexes. Obligatoire sur TOUS les navires dans TOUTES les eaux.\n\nUne collision en mer = responsabilité pénale et civile. Ces règles ne sont pas des recommandations — ce sont des obligations légales.",
      p1:"PARTIE 1 — STRUCTURE COLREG",s1t:"Les 38 règles organisées en 5 sections",
      s1:"SECTION A — Généralités (Rules 1-3)\nChamp d'application · Définitions · Généralités\n\nSECTION B — Conduite des navires (Rules 4-19)\nVisibilité mutuelle (Rules 11-18)\nVisibilité réduite (Rule 19)\n\nSECTION C — Feux & Marques (Rules 20-31)\nFeux de navigation obligatoires par type de navire\n\nSECTION D — Signaux sonores & lumineux (Rules 32-37)\nManœuvres · Brume · Détresse\n\nSECTION E — Exemptions (Rule 38)\nNavires construits avant 1977",
      p2:"PARTIE 2 — RÈGLES DE BARRE (Rules 11-18)",s2t:"Hiérarchie, croisement, face à face, rattrapage",
      s2:"HIÉRARCHIE (Rule 18) :\n1. NUC (Non Maîtrisable)\n2. RAM (Capacité Manœuvre Restreinte)\n3. Gêné par tirant d'eau\n4. Navire de pêche\n5. Voilier\n6. Navire à moteur (priorité la plus basse)\n\nRule 13 — RATTRAPAGE :\nLe navire qui rattrape = TOUJOURS manœuvrant\nLe navire rattrapé = TOUJOURS privilégié\n\nRule 14 — FACE À FACE :\nLes DEUX navires virent à TRIBORD\n→ Se croiser par bâbord\n\nRule 15 — CROISEMENT :\nNavire de TRIBORD = PRIVILÉGIÉ\nNavire de BÂBORD = MANŒUVRANT\n\nRule 16 — NAVIRE MANŒUVRANT :\nAction franche, positive et TÔTE\n\nRule 17 — NAVIRE PRIVILÉGIÉ :\nMaintient cap+vitesse\nPeut agir si collision inévitable (Rule 17b)",
      p3:"PARTIE 3 — SIMULATEUR DE SCÉNARIOS",
      p4:"PARTIE 4 — FEUX DE NAVIGATION (Rules 20-31)",s4t:"Identifier un navire la nuit par ses feux",
      s4:"FEUX OBLIGATOIRES (Rules 23-31) :\n\nNavire à moteur en route :\n• Feu blanc de tête de mât (avant)\n• Feux de côté : rouge (bâbord) + vert (tribord)\n• Feu blanc de poupe\n\nRule 20 : allumés du coucher au lever\nET par visibilité réduite de jour\n\nNavire à l'ancre :\n• 1 feu blanc tout-horizon (< 50m)\n• 2 feux blancs (> 50m)\n• Boule noire de jour à la proue\n\nNUC (Rule 27) :\n• 2 feux rouges verticaux\nRAM (Rule 27) : rouge-blanc-rouge\nPêche (Rule 26) : vert-blanc verticaux\nRemorqueur (Rule 24) : 2 blancs + 1 jaune",
      p5:"PARTIE 5 — SIGNAUX SONORES (Rules 32-37)",
      p6:"🎯 EXERCICES AVANCÉS PREMIUM",p7:"⚠️ CAS RÉEL",p8:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — LEÇON 8 · FIN DU MODULE",
      sumP:["Rule 18 : NUC>RAM>Tirant>Pêche>Voilier>Moteur","Rule 13 : qui rattrape = TOUJOURS manœuvrant","Rule 14 : face à face → les DEUX virent à tribord","Rule 15 : croisement → tribord = privilégié","Rule 16 : action franche, positive et tôt","Feux : blanc(mât)+rouge+vert+blanc(poupe)","NUC : 2 rouges · RAM : rouge-blanc-rouge","5 sons courts = ALARME · 1 long = moteur brume"],
      learnedP:["Rule 18 : NUC>RAM>Tirant>Pêche>Voilier>Moteur","Rule 13 rattrapage · Rule 14 face à face · Rule 15 croisement","Rule 16 action franche · Rule 17 privilégié","Feux navigation : moteur · ancre · NUC · remorqueur","5 sons courts = ALARME · signaux brume Rule 35","COLREG = obligations légales, pas recommandations"],
    },
    en:{
      badge:"📚 Navigation & Cartography · Lesson 8/8 · ⭐ Premium · 200 XP · 🏁 MODULE COMPLETE",
      title:"Advanced COLREG — Rules of the Road at Sea",
      intro:"COLREG (Convention on the International Regulations for Preventing Collisions at Sea) is the international LAW of navigation. 38 rules and 4 annexes. Mandatory on ALL vessels in ALL waters.\n\nA collision at sea = criminal and civil liability. These rules are not recommendations — they are legal obligations.",
      p1:"PART 1 — COLREG STRUCTURE",s1t:"38 rules organized in 5 sections",
      s1:"SECTION A — General (Rules 1-3)\nApplication · Definitions · General\n\nSECTION B — Steering & Sailing Rules (Rules 4-19)\nIn sight of one another (Rules 11-18)\nRestricted visibility (Rule 19)\n\nSECTION C — Lights & Shapes (Rules 20-31)\nMandatory navigation lights by vessel type\n\nSECTION D — Sound & Light Signals (Rules 32-37)\nManœuvres · Fog · Distress\n\nSECTION E — Exemptions (Rule 38)",
      p2:"PART 2 — STEERING RULES (Rules 11-18)",s2t:"Hierarchy, crossing, head-on, overtaking",
      s2:"HIERARCHY (Rule 18):\n1. NUC · 2. RAM · 3. Constrained by draft\n4. Fishing · 5. Sailing · 6. Power (lowest)\n\nRule 13 — OVERTAKING:\nOvertaking vessel = ALWAYS give-way\nOvertaken vessel = ALWAYS stand-on\n\nRule 14 — HEAD-ON:\nBOTH vessels alter to STARBOARD → pass port-to-port\n\nRule 15 — CROSSING:\nVessel on STARBOARD = STAND-ON\nVessel on PORT = GIVE-WAY\n\nRule 16 — GIVE-WAY VESSEL:\nEarly, positive and substantial action\n\nRule 17 — STAND-ON VESSEL:\nMaintains course+speed\nMay act if collision inevitable (Rule 17b)",
      p3:"PART 3 — SCENARIO SIMULATOR",
      p4:"PART 4 — NAVIGATION LIGHTS (Rules 20-31)",s4t:"Identifying a vessel at night by its lights",
      s4:"MANDATORY LIGHTS (Rules 23-31):\n\nPower vessel underway:\n• White masthead light\n• Side lights: red (port) + green (starboard)\n• White stern light\n\nRule 20: on from sunset to sunrise\nAND in restricted visibility by day\n\nVessel at anchor:\n• 1 all-round white (< 50m)\n• 2 white lights (> 50m)\n• Black ball at bow by day\n\nNUC (Rule 27): 2 vertical red lights\nRAM (Rule 27): red-white-red\nFishing (Rule 26): green-white vertical\nTowing (Rule 24): 2 white + 1 yellow",
      p5:"PART 5 — SOUND SIGNALS (Rules 32-37)",
      p6:"🎯 ADVANCED PREMIUM EXERCISES",p7:"⚠️ REAL ACCIDENT CASE",p8:"📝 QUESTION BANK — 15 PREMIUM",
      sumT:"SUMMARY — LESSON 8 · MODULE COMPLETE",
      sumP:["Rule 18: NUC>RAM>Draft>Fishing>Sailing>Power","Rule 13: overtaking = ALWAYS give-way","Rule 14: head-on → BOTH alter to starboard","Rule 15: crossing → starboard = stand-on","Rule 16: early, positive, substantial action","Lights: white(mast)+red+green+white(stern)","NUC: 2 red · RAM: red-white-red","5 short = ALARM · 1 long = power vessel fog"],
      learnedP:["Rule 18: NUC>RAM>Draft>Fishing>Sailing>Power","Rule 13 overtaking · Rule 14 head-on · Rule 15 crossing","Rule 16 give-way action · Rule 17 stand-on","Navigation lights: power · anchor · NUC · towing","5 short = ALARM · fog signals Rule 35","COLREG = legal obligations, not recommendations"],
    },
    es:{
      badge:"📚 Navegación & Cartografía · Lección 8/8 · ⭐ Premium · 200 XP · 🏁 FIN DEL MÓDULO",
      title:"COLREG Avanzado — Reglas de la Vía Marítima",
      intro:"El COLREG es la LEY internacional de navegación. 38 reglas y 4 anexos. Obligatorio en TODOS los buques en TODAS las aguas.\n\nUna colisión en el mar = responsabilidad penal y civil. Estas reglas son obligaciones legales.",
      p1:"PARTE 1 — ESTRUCTURA COLREG",s1t:"38 reglas organizadas en 5 secciones",
      s1:"SECCIÓN A — Generalidades (Reglas 1-3)\nSECCIÓN B — Conducta (Reglas 4-19)\nVisibilidad mutua (Reglas 11-18) · Visibilidad reducida (Regla 19)\nSECCIÓN C — Luces y marcas (Reglas 20-31)\nSECCIÓN D — Señales sonoras y luminosas (Reglas 32-37)\nSECCIÓN E — Exenciones (Regla 38)",
      p2:"PARTE 2 — REGLAS DE GOBIERNO (Reglas 11-18)",s2t:"Jerarquía, cruce, cara a cara, alcance",
      s2:"JERARQUÍA (Regla 18):\n1. NBC · 2. MCM · 3. Calado restringido\n4. Pesca · 5. Velero · 6. Motor (prioridad más baja)\n\nRegla 13 — ALCANCE:\nEl que alcanza = SIEMPRE de maniobra\nEl alcanzado = SIEMPRE privilegiado\n\nRegla 14 — CARA A CARA:\nAMBOS viran a ESTRIBOR → cruzarse babor a babor\n\nRegla 15 — CRUCE:\nBuque de ESTRIBOR = PRIVILEGIADO\nBuque de BABOR = MANIOBRA",
      p3:"PARTE 3 — SIMULADOR DE ESCENARIOS",
      p4:"PARTE 4 — LUCES DE NAVEGACIÓN (Reglas 20-31)",s4t:"Identificar un buque de noche por sus luces",
      s4:"LUCES OBLIGATORIAS:\nBuque de motor: blanco palo + rojo/verde costados + blanco popa\nFondeado: 1 blanco todo horizonte (<50m) · 2 blancos (>50m)\nNBC (Regla 27): 2 rojos verticales\nMCM: rojo-blanco-rojo\nPesca (Regla 26): verde-blanco\nRemolcador (Regla 24): 2 blancos + 1 amarillo",
      p5:"PARTE 5 — SEÑALES SONORAS (Reglas 32-37)",
      p6:"🎯 EJERCICIOS AVANZADOS PREMIUM",p7:"⚠️ CASO REAL",p8:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LECCIÓN 8 · FIN DEL MÓDULO",
      sumP:["Regla 18: NBC>MCM>Calado>Pesca>Velero>Motor","Regla 13: el que alcanza = SIEMPRE de maniobra","Regla 14: cara a cara → AMBOS viran a estribor","Regla 15: cruce → estribor = privilegiado","Luces: blanco(palo)+rojo+verde+blanco(popa)","NBC: 2 rojos · MCM: rojo-blanco-rojo","5 cortos = ALARMA · 1 largo = motor niebla"],
      learnedP:["Regla 18 jerarquía · Regla 13 alcance · Regla 14 cara a cara","Regla 15 cruce · Regla 16 maniobra · Regla 17 privilegiado","Luces navegación · 5 cortos = ALARMA","COLREG = obligaciones legales"],
    },
    pt:{
      badge:"📚 Navegação & Cartografia · Lição 8/8 · ⭐ Premium · 200 XP · 🏁 FIM DO MÓDULO",
      title:"COLREG Avançado — Regras da Via Marítima",
      intro:"O COLREG é a LEI internacional da navegação. 38 regras e 4 anexos. Obrigatório em TODOS os navios em TODAS as águas.\n\nUma colisão no mar = responsabilidade penal e civil. Estas regras são obrigações legais.",
      p1:"PARTE 1 — ESTRUTURA COLREG",s1t:"38 regras organizadas em 5 secções",
      s1:"SECÇÃO A — Generalidades (Regras 1-3)\nSECÇÃO B — Conduta (Regras 4-19)\nVisibilidade mútua (Regras 11-18) · Visibilidade reduzida (Regra 19)\nSECÇÃO C — Luzes e marcas (Regras 20-31)\nSECÇÃO D — Sinais sonoros e luminosos (Regras 32-37)\nSECÇÃO E — Isenções (Regra 38)",
      p2:"PARTE 2 — REGRAS DE GOVERNO (Regras 11-18)",s2t:"Hierarquia, cruzamento, frente a frente, ultrapassagem",
      s2:"HIERARQUIA (Regra 18):\n1. NMC · 2. CAM · 3. Calado restrito\n4. Pesca · 5. Veleiro · 6. Motor (prioridade mais baixa)\n\nRegra 13 — ULTRAPASSAGEM:\nO que ultrapassa = SEMPRE de manobra\nO ultrapassado = SEMPRE privilegiado\n\nRegra 14 — FRENTE A FRENTE:\nAMBOS viram a ESTIBORDO → cruzar bombordo com bombordo\n\nRegra 15 — CRUZAMENTO:\nNavio de ESTIBORDO = PRIVILEGIADO\nNavio de BOMBORDO = MANOBRA",
      p3:"PARTE 3 — SIMULADOR DE CENÁRIOS",
      p4:"PARTE 4 — LUZES DE NAVEGAÇÃO (Regras 20-31)",s4t:"Identificar um navio à noite pelas suas luzes",
      s4:"LUZES OBRIGATÓRIAS:\nNavio a motor: branco mastro + vermelho/verde bordos + branco popa\nFundeado: 1 branco todo-horizonte (<50m) · 2 brancos (>50m)\nNMC (Regra 27): 2 vermelhos verticais\nCAM: vermelho-branco-vermelho\nPesca (Regra 26): verde-branco\nRebocador (Regra 24): 2 brancos + 1 amarelo",
      p5:"PARTE 5 — SINAIS SONOROS (Regras 32-37)",
      p6:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p7:"⚠️ CASO REAL",p8:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LIÇÃO 8 · FIM DO MÓDULO",
      sumP:["Regra 18: NMC>CAM>Calado>Pesca>Veleiro>Motor","Regra 13: o que ultrapassa = SEMPRE de manobra","Regra 14: frente a frente → AMBOS viram a estibordo","Regra 15: cruzamento → estibordo = privilegiado","Luzes: branco(mastro)+verm+verde+branco(popa)","NMC: 2 vermelhos · CAM: verm-branco-verm","5 curtos = ALARME · 1 longo = motor nevoeiro"],
      learnedP:["Regra 18 hierarquia · Regra 13 · Regra 14 · Regra 15","Regra 16 manobra · Regra 17 privilegiado","Luzes navegação · 5 curtos = ALARME","COLREG = obrigações legais"],
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonCOLREG({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>Leçon 8/8 🏁</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.red},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}44`,fontSize:11,color:C.red,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.red}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="📋" text={lc.p1}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="⚖️" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚓ {lang==="fr"?"HIÉRARCHIE RULE 18 — INTERACTIF":lang==="en"?"HIERARCHY RULE 18 — INTERACTIVE":lang==="es"?"JERARQUÍA REGLA 18 — INTERACTIVO":"HIERARQUIA REGRA 18 — INTERATIVO"}</div><HierarchySVG lang={lang}/></Card>

            <SL icon="🎮" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎮 {lang==="fr"?"SIMULATEUR COLREG ANIMÉ":lang==="en"?"ANIMATED COLREG SIMULATOR":lang==="es"?"SIMULADOR COLREG ANIMADO":"SIMULADOR COLREG ANIMADO"}</div>
              <ScenarioSimulator lang={lang}/>
            </Card>

            <SL icon="💡" text={lc.p4} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💡 {lang==="fr"?"FEUX DE NAVIGATION — INTERACTIF":lang==="en"?"NAVIGATION LIGHTS — INTERACTIVE":lang==="es"?"LUCES DE NAVEGACIÓN — INTERACTIVO":"LUZES DE NAVEGAÇÃO — INTERATIVO"}</div><NavLightsSVG lang={lang}/></Card>

            <SL icon="📣" text={lc.p5} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📣 {lang==="fr"?"SIGNAUX SONORES — INTERACTIF":lang==="en"?"SOUND SIGNALS — INTERACTIVE":lang==="es"?"SEÑALES SONORAS — INTERACTIVO":"SINAIS SONOROS — INTERATIVO"}</div><SoundSignals lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang}/></Card>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(192,57,43,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final — COLREG Avancé":lang==="en"?"Final Quiz — Advanced COLREG":lang==="es"?"Quiz Final — COLREG Avanzado":"Quiz Final — COLREG Avançado"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · Leçon 8/8 · 🏁</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            {/* Module completion celebration */}
            <div style={{textAlign:"center",marginBottom:20,padding:"20px 16px",borderRadius:20,background:"linear-gradient(135deg,rgba(201,146,42,0.15),rgba(26,111,212,0.1))",border:`1px solid ${C.gold}44`}}>
              <div style={{fontSize:72,marginBottom:8}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.gold2,marginBottom:4}}>
                {lang==="fr"?"MODULE TERMINÉ !":lang==="en"?"MODULE COMPLETE!":lang==="es"?"¡MÓDULO COMPLETADO!":"MÓDULO CONCLUÍDO!"}
              </div>
              <div style={{fontSize:14,color:C.white,marginBottom:12}}>
                {lang==="fr"?"Navigation & Cartographie — 8 leçons maîtrisées 🧭":
                 lang==="en"?"Navigation & Cartography — 8 lessons mastered 🧭":
                 lang==="es"?"Navegación & Cartografía — 8 lecciones dominadas 🧭":
                 "Navegação & Cartografia — 8 lições concluídas 🧭"}
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
                {["L1","L2","L3","L4","L5","L6","L7","L8"].map((l,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.white}}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{display:"inline-flex",width:"100%",justifyContent:"center",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700,marginBottom:16,boxSizing:"border-box"}}>
              +{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐ · {lang==="fr"?"Quiz":"Quiz"}: {quizScore}/5
            </div>
            <div style={{textAlign:"center",marginBottom:16,fontSize:13,color:C.gold2,fontStyle:"italic",lineHeight:1.7,maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>
              {lang==="fr"?"De l'histoire de la boussole aux règles COLREG, tu as posé les fondations de tout officier de pont. Chaque relèvement, chaque calcul de marée, chaque règle de barre appris ici te servira toute ta carrière. Bravo, futur officier — la mer t'attend.":
               lang==="en"?"From the history of the compass to the COLREG rules, you've built the foundations of every deck officer. Every bearing, every tide calculation, every rule of the road learned here will serve you your whole career. Well done, future officer — the sea awaits.":
               lang==="es"?"Desde la historia de la brújula hasta las reglas del COLREG, has sentado las bases de todo oficial de puente. Cada marcación, cada cálculo de marea, cada regla de rumbo aprendida aquí te servirá toda tu carrera. Bien hecho, futuro oficial — el mar te espera.":
               "Da história da bússola às regras do COLREG, você construiu os alicerces de todo oficial de convés. Cada marcação, cada cálculo de maré, cada regra de rumo aprendida aqui servirá por toda a sua carreira. Parabéns, futuro oficial — o mar espera por você."}
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(201,146,42,0.4)",marginBottom:10}}>
              {lang==="fr"?"🎯 EXPLORER LES AUTRES MODULES →":lang==="en"?"🎯 EXPLORE OTHER MODULES →":lang==="es"?"🎯 EXPLORAR OTROS MÓDULOS →":"🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
