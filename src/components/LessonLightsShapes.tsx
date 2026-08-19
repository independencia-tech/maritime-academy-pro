// @ts-nocheck
import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
  yellow:"#f1c40f", steel:"#455a64",
  fwht:"#ffffff", fgrn:"#00ff88", fred:"#ff3333", fyel:"#ffee00",
};

const T = {
  fr:{ back:"◀ Retour", module:"Signalisation & Balisage", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Signaling & Buoyage", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Señalización y Balizamiento", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Sinalização e Balizagem", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG — VESSEL with lights top view
// ══════════════════════════════════════
function VesselLightsSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const lights = [
    { id:"masthead", label:{fr:"Feu de tête de mât",en:"Masthead light",es:"Luz de tope",pt:"Luz de topo"}, color:C.fwht,
      sector:{fr:"225° — à l'avant",en:"225° — forward arc",es:"225° — arco proel",pt:"225° — arco de vante"},
      desc:{fr:"FEU BLANC · 225° · 6 milles\nVisible de l'avant et des côtés\nPortée : 6 milles (grand navire) · 3 milles (< 12m)\n\nPLACEMENT :\nEn tête de mât avant\nGrand navire (> 50m) = 2 feux de tête de mât\n(avant + arrière, le 2e plus haut)\n\nVISIBLE quand un navire vient vers vous\nou s'éloigne de côté",en:"WHITE LIGHT · 225° · 6 miles\nVisible from ahead and sides\nRange: 6 miles (large vessel) · 3 miles (< 12m)\n\nPLACEMENT:\nOn forward masthead\nLarge vessel (> 50m) = 2 masthead lights\n(forward + aft, 2nd higher)\n\nVISIBLE when vessel approaches or moves sideways",es:"LUZ BLANCA · 225° · 6 millas\nVisible por el frente y los costados\nAlcance: 6 millas (buque grande) · 3 millas (< 12m)\n\nSITUACIÓN:\nEn el tope del palo proel\nBuque grande (> 50m) = 2 luces de tope\n(proel + popa, la 2ª más alta)\n\nVISIBLE cuando un buque se aproxima o navega de costado",pt:"LUZ BRANCA · 225° · 6 milhas\nVisível da proa e dos costados\nAlcance: 6 milhas (navio grande) · 3 milhas (< 12m)\n\nPOSIÇÃO:\nNo topo do mastro de vante\nNavio grande (> 50m) = 2 luzes de topo\n(vante + ré, a 2ª mais alta)\n\nVISÍVEL quando um navio se aproxima ou navega de lado"},},
    { id:"port", label:{fr:"Feu de côté bâbord",en:"Port sidelight",es:"Luz de costado babor",pt:"Luz lateral bombordo"}, color:C.fred,
      sector:{fr:"112,5° — bâbord",en:"112.5° — port side",es:"112,5° — babor",pt:"112,5° — bombordo"},
      desc:{fr:"FEU ROUGE · 112,5° · 3 milles\nVisible depuis bâbord\nPortée : 3 milles (grand navire) · 1 mille (< 12m)\n\nPLACEMENT :\nFlanc bâbord (gauche)\n\nQUAND VOUS VOYEZ UN FEU ROUGE :\n→ Un navire arrive sur VOTRE TRIBORD\n→ Danger d'abordage possible\n→ Surveiller attentivement\n\nRÈGLE MÉMOIRE : 'Rouge = port wine = rouge vin'",en:"RED LIGHT · 112.5° · 3 miles\nVisible from port side\nRange: 3 miles (large vessel) · 1 mile (< 12m)\n\nPLACEMENT:\nPort (left) side\n\nWHEN YOU SEE A RED LIGHT:\n→ A vessel is coming from YOUR starboard\n→ Possible collision risk\n→ Keep careful watch\n\nMEMORY RULE: 'Red port wine = red'",es:"LUZ ROJA · 112,5° · 3 millas\nVisible desde babor\nAlcance: 3 millas (buque grande) · 1 milla (< 12m)\n\nCUANDO VES UNA LUZ ROJA:\n→ Un buque viene por tu ESTRIBOR\n→ Posible riesgo de abordaje\n→ Vigilar con atención",pt:"LUZ VERMELHA · 112,5° · 3 milhas\nVisível de bombordo\nAlcance: 3 milhas (navio grande) · 1 milha (< 12m)\n\nQUANDO VOCÊ VÊ UMA LUZ VERMELHA:\n→ Um navio está a vir do seu ESTIBORDO\n→ Possível risco de abalroamento\n→ Vigiar atentamente"},},
    { id:"stbd", label:{fr:"Feu de côté tribord",en:"Starboard sidelight",es:"Luz de costado estribor",pt:"Luz lateral estibordo"}, color:C.fgrn,
      sector:{fr:"112,5° — tribord",en:"112.5° — starboard",es:"112,5° — estribor",pt:"112,5° — estibordo"},
      desc:{fr:"FEU VERT · 112,5° · 3 milles\nVisible depuis tribord\nPortée : 3 milles (grand navire) · 1 mille (< 12m)\n\nPLACEMENT :\nFlanc tribord (droite)\n\nQUAND VOUS VOYEZ UN FEU VERT :\n→ Un navire arrive sur VOTRE BÂBORD\n→ Généralement VOUS êtes le privilégié\n→ Le navire avec rouge doit vous éviter\n\nRÈGLE PRIORITÉ : 'Vert = GO (priorité)'",en:"GREEN LIGHT · 112.5° · 3 miles\nVisible from starboard\nRange: 3 miles (large vessel) · 1 mile (< 12m)\n\nPLACEMENT:\nStarboard (right) side\n\nWHEN YOU SEE A GREEN LIGHT:\n→ A vessel is coming from YOUR port\n→ Generally YOU have right of way\n→ Vessel showing red must avoid you\n\nPRIORITY RULE: 'Green = GO (right of way)'",es:"LUZ VERDE · 112,5° · 3 millas\nVisible desde estribor\nAlcance: 3 millas (buque grande) · 1 milla (< 12m)\n\nCUANDO VES UNA LUZ VERDE:\n→ Un buque viene por tu BABOR\n→ Generalmente TÚ tienes prioridad\n→ El buque con rojo debe cederte el paso",pt:"LUZ VERDE · 112,5° · 3 milhas\nVisível de estibordo\nAlcance: 3 milhas (navio grande) · 1 milha (< 12m)\n\nQUANDO VOCÊ VÊ UMA LUZ VERDE:\n→ Um navio está a vir do seu BOMBORDO\n→ Geralmente VOCÊ tem prioridade\n→ O navio com vermelho deve desviar-se"},},
    { id:"stern", label:{fr:"Feu de poupe",en:"Stern light",es:"Luz de alcance",pt:"Luz de popa"}, color:C.fwht,
      sector:{fr:"135° — à l'arrière",en:"135° — aft arc",es:"135° — arco de popa",pt:"135° — arco de ré"},
      desc:{fr:"FEU BLANC · 135° · 3 milles\nVisible depuis l'arrière\nPortée : 3 milles\n\nPLACEMENT :\nPoupe du navire\n\nQUAND VOUS VOYEZ UN FEU BLANC SEUL :\n→ Vous voyez la POUPE d'un navire\n→ Il s'éloigne de vous\n→ Ou vous le rattrapez par derrière\n\nATTENTION : Si vous rattrapez = VOUS déviez\nUn navire qui en rattrape un autre\ndoit toujours s'écarter",en:"WHITE LIGHT · 135° · 3 miles\nVisible from astern\nRange: 3 miles\n\nPLACEMENT:\nVessel stern\n\nWHEN YOU SEE A WHITE LIGHT ALONE:\n→ You see the STERN of a vessel\n→ It's moving away from you\n→ Or you're overtaking from behind\n\nWARNING: If overtaking = YOU give way\nAn overtaking vessel\nmust always keep clear",es:"LUZ BLANCA · 135° · 3 millas\nVisible desde la popa\nAlcance: 3 millas\n\nCUANDO VES UNA LUZ BLANCA SOLA:\n→ Ves la POPA de un buque\n→ Se está alejando de ti\n→ O lo estás alcanzando por detrás\n\nATENCIÓN: Si lo alcanzas = TÚ desvías",pt:"LUZ BRANCA · 135° · 3 milhas\nVisível de ré\nAlcance: 3 milhas\n\nQUANDO VOCÊ VÊ UMA LUZ BRANCA SÓ:\n→ Você vê a POPA de um navio\n→ Está a afastar-se de você\n→ Ou você está a ultrapassá-lo por trás\n\nATENÇÃO: Se ultrapassar = VOCÊ desvia"},},
  ];

  const sel_ = sel!==null ? lights[sel] : null;
  const w=260, h=220, cx=130, cy=130, R=80;

  return (
    <div>
      {/* Top-view vessel diagram */}
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
        <svg width={w} height={h} style={{maxWidth:"100%"}}>
          {/* Masthead arc 225° */}
          <path d={`M${cx},${cy} L${cx+R*Math.cos((180+22.5)*Math.PI/180)},${cy+R*Math.sin((180+22.5)*Math.PI/180)} A${R},${R} 0 1,1 ${cx+R*Math.cos(22.5*Math.PI/180)},${cy+R*Math.sin(22.5*Math.PI/180)} Z`}
            fill={sel===0?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.06)"} stroke={sel===0?C.fwht:"transparent"} strokeWidth={1}
            onClick={()=>setSel(sel===0?null:0)} style={{cursor:"pointer"}}/>
          {/* Port arc 112.5° */}
          <path d={`M${cx},${cy} L${cx+R*Math.cos((180+22.5)*Math.PI/180)},${cy+R*Math.sin((180+22.5)*Math.PI/180)} A${R},${R} 0 0,0 ${cx+R*Math.cos((270-22.5)*Math.PI/180)},${cy+R*Math.sin((270-22.5)*Math.PI/180)} Z`}
            fill={sel===1?"rgba(255,60,60,0.25)":"rgba(255,60,60,0.08)"} stroke={sel===1?C.fred:"transparent"} strokeWidth={1}
            onClick={()=>setSel(sel===1?null:1)} style={{cursor:"pointer"}}/>
          {/* Stbd arc 112.5° */}
          <path d={`M${cx},${cy} L${cx+R*Math.cos(22.5*Math.PI/180)},${cy+R*Math.sin(22.5*Math.PI/180)} A${R},${R} 0 0,0 ${cx+R*Math.cos((90+22.5)*Math.PI/180)},${cy+R*Math.sin((90+22.5)*Math.PI/180)} Z`}
            fill={sel===2?"rgba(0,255,120,0.2)":"rgba(0,255,120,0.06)"} stroke={sel===2?C.fgrn:"transparent"} strokeWidth={1}
            onClick={()=>setSel(sel===2?null:2)} style={{cursor:"pointer"}}/>
          {/* Stern arc 135° */}
          <path d={`M${cx},${cy} L${cx+R*Math.cos((270-22.5)*Math.PI/180)},${cy+R*Math.sin((270-22.5)*Math.PI/180)} A${R},${R} 0 0,0 ${cx+R*Math.cos((90+22.5)*Math.PI/180)},${cy+R*Math.sin((90+22.5)*Math.PI/180)} Z`}
            fill={sel===3?"rgba(255,255,200,0.2)":"rgba(255,255,200,0.06)"} stroke={sel===3?C.fyel:"transparent"} strokeWidth={1}
            onClick={()=>setSel(sel===3?null:3)} style={{cursor:"pointer"}}/>
          {/* Vessel body */}
          <ellipse cx={cx} cy={cy} rx={14} ry={28} fill="#1a2a4a" stroke="#4da6ff" strokeWidth={1.5}/>
          {/* Bow arrow */}
          <polygon points={`${cx},${cy-28} ${cx-6},${cy-18} ${cx+6},${cy-18}`} fill="#4da6ff"/>
          {/* Light dots */}
          <circle cx={cx} cy={cy-24} r={5} fill={sel===0?C.fwht:"rgba(255,255,255,0.3)"} onClick={()=>setSel(sel===0?null:0)} style={{cursor:"pointer"}}/>
          <circle cx={cx-12} cy={cy} r={5} fill={sel===1?C.fred:"rgba(255,80,80,0.4)"} onClick={()=>setSel(sel===1?null:1)} style={{cursor:"pointer"}}/>
          <circle cx={cx+12} cy={cy} r={5} fill={sel===2?C.fgrn:"rgba(0,200,80,0.4)"} onClick={()=>setSel(sel===2?null:2)} style={{cursor:"pointer"}}/>
          <circle cx={cx} cy={cy+28} r={5} fill={sel===3?C.fwht:"rgba(255,255,200,0.3)"} onClick={()=>setSel(sel===3?null:3)} style={{cursor:"pointer"}}/>
          {/* Labels */}
          <text x={cx} y={cy-R-8} textAnchor="middle" fontSize={9} fill={C.fwht}>▲ AVANT / BOW</text>
          <text x={cx-R-4} y={cy+4} textAnchor="end" fontSize={9} fill={C.fred}>◀ PORT</text>
          <text x={cx+R+4} y={cy+4} textAnchor="start" fontSize={9} fill={C.fgrn}>STBD ▶</text>
          <text x={cx} y={cy+R+14} textAnchor="middle" fontSize={9} fill="#ffeeaa">▼ POUPE / STERN</text>
          <text x={cx} y={cy+4} textAnchor="middle" fontSize={8} fill={C.muted}>🚢</text>
        </svg>
      </div>
      {/* Buttons */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {lights.map((l,i)=>(
          <button key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"8px 6px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===i?`${l.color}22`:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?l.color:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{width:14,height:14,borderRadius:"50%",background:l.color,margin:"0 auto 4px",boxShadow:sel===i?`0 0 8px ${l.color}`:""}}/>
            <div style={{fontSize:9,color:sel===i?l.color:C.muted,fontWeight:700,lineHeight:1.3}}>{l.label[lang]||l.label.fr}</div>
            <div style={{fontSize:7,color:l.color,marginTop:2}}>{l.sector[lang]||l.sector.fr}</div>
          </button>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:`${sel_.color}12`,border:`1.5px solid ${sel_.color}44`,animation:"fadeUp 0.3s ease"}}>
        <div style={{fontSize:13,fontWeight:700,color:sel_.color,marginBottom:6}}>
          <span style={{display:"inline-block",width:10,height:10,borderRadius:"50%",background:sel_.color,marginRight:6}}/>
          {sel_.label[lang]||sel_.label.fr}
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — VESSEL TYPE LIGHTS SIMULATOR
// ══════════════════════════════════════
function VesselTypeSVG({ lang }) {
  const [sel, setSel] = useState(0);

  const vessels = [
    { id:"motor", icon:"🚢",
      label:{fr:"Navire à moteur (en route)",en:"Power vessel (underway)",es:"Buque a motor (navegando)",pt:"Navio a motor (em rota)"},
      lights:[
        {pos:[50,10],color:C.fwht,r:7,label:{fr:"Feu de tête de mât (225°)",en:"Masthead light (225°)",es:"Luz de tope (225°)",pt:"Luz de topo (225°)"}},
        {pos:[50,28],color:C.fwht,r:5,label:{fr:"2e feu de tête (> 50m)",en:"2nd masthead (> 50m)",es:"2ª luz tope (> 50m)",pt:"2ª luz de topo (> 50m)"}},
        {pos:[18,50],color:C.fred,r:6,label:{fr:"Feu rouge bâbord (112,5°)",en:"Red port light (112.5°)",es:"Luz roja babor (112,5°)",pt:"Luz vermelha bombordo (112,5°)"}},
        {pos:[82,50],color:C.fgrn,r:6,label:{fr:"Feu vert tribord (112,5°)",en:"Green stbd light (112.5°)",es:"Luz verde estribor (112,5°)",pt:"Luz verde estibordo (112,5°)"}},
        {pos:[50,88],color:C.fwht,r:5,label:{fr:"Feu de poupe (135°)",en:"Stern light (135°)",es:"Luz de alcance (135°)",pt:"Luz de popa (135°)"}},
      ],
      summary:{fr:"NAVIRE À MOTEUR EN ROUTE :\n→ Feu de tête de mât BLANC (225°)\n→ Feux de côté ROUGE (bâbord) et VERT (tribord) 112,5° chacun\n→ Feu de POUPE blanc (135°)\n→ Grand navire (>50m) : 2 feux de tête de mât\n→ Total sur 360° : 225° + 112,5° + 112,5° = 360° (côtés et tête)\n→ Feu de poupe 135° couvre l'arrière",en:"POWER VESSEL UNDERWAY:\n→ WHITE masthead light (225°)\n→ RED (port) and GREEN (stbd) sidelights 112.5° each\n→ WHITE stern light (135°)\n→ Large vessel (>50m): 2 masthead lights\n→ Total around 360°: 225° + 112.5° + 112.5° (sides and head)\n→ Stern 135° covers aft",es:"BUQUE A MOTOR NAVEGANDO:\n→ Luz de tope BLANCA (225°)\n→ Luces de costado ROJA (babor) y VERDE (estribor) 112,5° cada una\n→ Luz de ALCANCE blanca (135°)\n→ Buque grande (>50m): 2 luces de tope",pt:"NAVIO A MOTOR EM ROTA:\n→ Luz de topo BRANCA (225°)\n→ Luzes laterais VERMELHA (bb) e VERDE (eb) 112,5° cada\n→ Luz de POPA branca (135°)\n→ Navio grande (>50m): 2 luzes de topo"},},
    { id:"sailing", icon:"⛵",
      label:{fr:"Voilier en route (à la voile)",en:"Sailing vessel (under sail)",es:"Velero navegando (a vela)",pt:"Veleiro em rota (à vela)"},
      lights:[
        {pos:[18,50],color:C.fred,r:6,label:{fr:"Feu rouge bâbord",en:"Red port light",es:"Luz roja babor",pt:"Luz vermelha bombordo"}},
        {pos:[82,50],color:C.fgrn,r:6,label:{fr:"Feu vert tribord",en:"Green stbd light",es:"Luz verde estribor",pt:"Luz verde estibordo"}},
        {pos:[50,88],color:C.fwht,r:5,label:{fr:"Feu de poupe",en:"Stern light",es:"Luz de alcance",pt:"Luz de popa"}},
        {pos:[50,15],color:"rgba(255,80,80,0.6)",r:4,label:{fr:"Bicolore optionnel (< 20m)",en:"Bicolor optional (< 20m)",es:"Bicolor opcional (< 20m)",pt:"Bicolor opcional (< 20m)"}},
      ],
      summary:{fr:"VOILIER EN ROUTE (sous voile uniquement) :\n→ PAS de feu de tête de mât\n→ Feux de côté ROUGE et VERT (comme moteur)\n→ Feu de POUPE blanc\n→ OPTION < 20m : feu tricolore en tête de mât (rouge/vert/blanc)\n→ OPTION < 20m : feux combinés côtés\n⚠️ Si voilier utilise aussi son moteur = feu de tête de mât obligatoire\n+ cône pointant vers le bas de jour",en:"SAILING VESSEL UNDERWAY (under sail only):\n→ NO masthead light\n→ RED and GREEN sidelights (same as power)\n→ WHITE stern light\n→ OPTION < 20m: tricolor masthead light (red/green/white)\n→ OPTION < 20m: combined sidelights\n⚠️ If sailing vessel also uses engine = mandatory masthead light\n+ downward-pointing cone by day",es:"VELERO NAVEGANDO (solo a vela):\n→ SIN luz de tope\n→ Luces de costado ROJA y VERDE\n→ Luz de alcance blanca\n→ OPCIÓN < 20m: tricolor en el tope del palo\n⚠️ Si usa también el motor = luz de tope obligatoria\n+ cono apuntando hacia abajo de día",pt:"VELEIRO EM ROTA (só à vela):\n→ SEM luz de topo\n→ Luzes laterais VERMELHA e VERDE\n→ Luz de POPA branca\n→ OPÇÃO < 20m: tricolor no topo do mastro\n⚠️ Se usar também motor = luz de topo obrigatória\n+ cone apontado para baixo de dia"},},
    { id:"anchor", icon:"⚓",
      label:{fr:"Navire au mouillage",en:"Vessel at anchor",es:"Buque fondeado",pt:"Navio fundeado"},
      lights:[
        {pos:[50,20],color:C.fwht,r:9,label:{fr:"Feu blanc tout horizon (< 100m)",en:"All-round white light (< 100m)",es:"Luz blanca todo horizonte (< 100m)",pt:"Luz branca todo horizonte (< 100m)"}},
        {pos:[50,75],color:C.fwht,r:6,label:{fr:"2e feu blanc (> 50m)",en:"2nd white light (> 50m)",es:"2ª luz blanca (> 50m)",pt:"2ª luz branca (> 50m)"}},
      ],
      summary:{fr:"NAVIRE AU MOUILLAGE :\n→ Feu blanc TOUT HORIZON visible de tous côtés (360°)\n→ Grand navire (> 50m) : 2 feux blancs (avant + arrière, le derrière plus bas)\n→ AUCUN feu de côté rouge/vert\n→ AUCUN feu de tête de mât 225°\n\nDE JOUR AU MOUILLAGE :\n→ 1 BOULE noire visible\n→ À l'avant du navire\n\nVITESSE NULLE : ne se déplace pas",en:"VESSEL AT ANCHOR:\n→ ALL-ROUND WHITE light visible from all sides (360°)\n→ Large vessel (> 50m): 2 white lights (fwd + aft, aft lower)\n→ NO red/green sidelights\n→ NO 225° masthead light\n\nDAY ANCHOR SIGNAL:\n→ 1 BLACK BALL visible\n→ At forward part of vessel\n\nZERO SPEED: not moving",es:"BUQUE FONDEADO:\n→ Luz blanca TODO HORIZONTE visible desde todos los lados (360°)\n→ Buque grande (> 50m): 2 luces blancas (proel + popa, la popa más baja)\n→ SIN luces de costado rojo/verde\n→ SIN luz de tope 225°\n\nDE DÍA FONDEADO:\n→ 1 BOLA negra visible al frente del buque",pt:"NAVIO FUNDEADO:\n→ Luz branca TODO HORIZONTE visível de todos os lados (360°)\n→ Navio grande (> 50m): 2 luzes brancas (vante + ré, ré mais baixa)\n→ SEM luzes laterais vermelho/verde\n→ SEM luz de topo 225°\n\nSINAL DE DIA FUNDEADO:\n→ 1 BOLA preta visível à proa do navio"},},
    { id:"tug", icon:"🚤",
      label:{fr:"Remorqueur (remorquage)",en:"Tug (towing)",es:"Remolcador (remolcando)",pt:"Rebocador (rebocando)"},
      lights:[
        {pos:[50,8],color:C.fwht,r:6,label:{fr:"3 feux de tête (vertic.)",en:"3 masthead lights (vert.)",es:"3 luces de tope (vert.)",pt:"3 luzes de topo (vert.)"}},
        {pos:[50,18],color:C.fwht,r:6,label:{fr:"(si remorque > 200m)",en:"(if tow > 200m)",es:"(si remolque > 200m)",pt:"(se reboque > 200m)"}},
        {pos:[50,28],color:C.fwht,r:6,label:{fr:"(2 feux si ≤ 200m)",en:"(2 lights if ≤ 200m)",es:"(2 luces si ≤ 200m)",pt:"(2 luzes se ≤ 200m)"}},
        {pos:[18,50],color:C.fred,r:5,label:{fr:"Rouge bâbord",en:"Red port",es:"Rojo babor",pt:"Vermelho bombordo"}},
        {pos:[82,50],color:C.fgrn,r:5,label:{fr:"Vert tribord",en:"Green stbd",es:"Verde estribor",pt:"Verde estibordo"}},
        {pos:[50,72],color:C.fyel,r:6,label:{fr:"Feu jaune poupe",en:"Yellow stern light",es:"Luz amarilla de popa",pt:"Luz amarela de popa"}},
        {pos:[50,88],color:C.fwht,r:4,label:{fr:"Feu blanc poupe",en:"White stern light",es:"Luz blanca de popa",pt:"Luz branca de popa"}},
      ],
      summary:{fr:"REMORQUEUR EN REMORQUAGE :\n→ 2 feux de tête de mât BLANCS (verticaux) si remorque ≤ 200m\n→ 3 feux de tête de mât BLANCS (verticaux) si remorque > 200m\n→ Feux de côté ROUGE et VERT\n→ Feu de POUPE JAUNE (au lieu de blanc = remorqueur)\n→ Feu de poupe BLANC en plus\n\nLE NAVIRE REMORQUÉ :\n→ Feux de côté seulement\n→ Feu de poupe blanc\n→ Si remorque > 200m : losange de jour",en:"TUG WHEN TOWING:\n→ 2 WHITE masthead lights (vertical) if tow ≤ 200m\n→ 3 WHITE masthead lights (vertical) if tow > 200m\n→ RED and GREEN sidelights\n→ YELLOW stern light (instead of white = tug identification)\n→ WHITE stern light also\n\nTOWED VESSEL:\n→ Sidelights only\n→ White stern light\n→ If tow > 200m: diamond shape by day",es:"REMOLCADOR EN REMOLQUE:\n→ 2 luces de tope BLANCAS (verticales) si remolque ≤ 200m\n→ 3 luces de tope BLANCAS (verticales) si remolque > 200m\n→ Luces de costado ROJA y VERDE\n→ Luz de ALCANCE AMARILLA (identifica al remolcador)\n→ Luz de alcance BLANCA además",pt:"REBOCADOR A REBOCAR:\n→ 2 luzes de topo BRANCAS (verticais) se reboque ≤ 200m\n→ 3 luzes de topo BRANCAS (verticais) se reboque > 200m\n→ Luzes laterais VERMELHA e VERDE\n→ Luz de POPA AMARELA (identifica rebocador)\n→ Luz de popa BRANCA também"},},
    { id:"fishing", icon:"🎣",
      label:{fr:"Navire de pêche",en:"Fishing vessel",es:"Buque pesquero",pt:"Navio de pesca"},
      lights:[
        {pos:[50,20],color:C.fgrn,r:8,label:{fr:"Feu vert tout horizon",en:"All-round green",es:"Verde todo horizonte",pt:"Verde todo horizonte"}},
        {pos:[50,38],color:C.fwht,r:7,label:{fr:"Feu blanc tout horizon",en:"All-round white",es:"Blanco todo horizonte",pt:"Branco todo horizonte"}},
        {pos:[18,55],color:C.fred,r:5,label:{fr:"Rouge bâbord (en route)",en:"Red port (underway)",es:"Rojo babor (navegando)",pt:"Vermelho bombordo (em rota)"}},
        {pos:[82,55],color:C.fgrn,r:5,label:{fr:"Vert tribord (en route)",en:"Green stbd (underway)",es:"Verde estribor (navegando)",pt:"Verde estibordo (em rota)"}},
      ],
      summary:{fr:"NAVIRE DE PÊCHE (engins déployés) :\n→ Feu VERT tout horizon (en haut)\n→ Feu BLANC tout horizon (en dessous du vert)\n→ Si EN ROUTE : + feux de côté + poupe\n→ Si arrêté : feux de côté et poupe non nécessaires\n\nPÊCHE AU CHALUT (trawling) :\n→ 2 feux tout horizon VERTS superposés\n→ Le blanc devient vert\n\nCALMAR/PÊCHE CHALUT = 2 verts\nAutre pêche = 1 vert + 1 blanc\n\nDE JOUR : 2 cônes apex contre apex (losange)\nou 1 cône si < 20m",en:"FISHING VESSEL (gear deployed):\n→ GREEN all-round light (top)\n→ WHITE all-round light (below green)\n→ If UNDERWAY: + sidelights + stern\n→ If stopped: sidelights and stern not needed\n\nTRAWLING:\n→ 2 all-round GREEN lights\n→ White becomes green\n\nTRAWL/SQUID = 2 greens\nOther fishing = 1 green + 1 white\n\nDAY: 2 cones apex-to-apex (diamond)\nor 1 cone if < 20m",es:"BUQUE PESQUERO (con artes calados):\n→ Luz VERDE todo horizonte (arriba)\n→ Luz BLANCA todo horizonte (debajo del verde)\n→ Si NAVEGANDO: + luces costado + alcance\n\nARRASTRE:\n→ 2 luces todo horizonte VERDES\n→ El blanco se convierte en verde\n\nDE DÍA: 2 conos vértice a vértice (rombo)",pt:"NAVIO DE PESCA (aparelhos calados):\n→ Luz VERDE todo horizonte (em cima)\n→ Luz BRANCA todo horizonte (abaixo do verde)\n→ Se EM ROTA: + luzes laterais + popa\n\nARRASTO:\n→ 2 luzes todo horizonte VERDES\n\nDE DIA: 2 cones vértice a vértice (losango)"},},
  ];

  const v = vessels[sel];
  return (
    <div>
      {/* Vessel type selector */}
      <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
        {vessels.map((vv,i)=>(
          <button key={i} onClick={()=>setSel(i)} style={{
            flexShrink:0,padding:"8px 10px",borderRadius:10,cursor:"pointer",textAlign:"center",
            background:sel===i?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?C.blue2:"rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{fontSize:18}}>{vv.icon}</div>
            <div style={{fontSize:7,color:sel===i?C.blue2:C.muted,fontWeight:700,marginTop:2,whiteSpace:"nowrap"}}>{(vv.label[lang]||vv.label.fr).split(' ').slice(0,2).join(' ')}</div>
          </button>
        ))}
      </div>
      {/* Vessel diagram */}
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
        <svg width={100} height={100} viewBox="0 0 100 100">
          <ellipse cx={50} cy={50} rx={10} ry={24} fill="#1a2a4a" stroke="#4da6ff" strokeWidth={1.5}/>
          <polygon points="50,26 44,36 56,36" fill="#4da6ff"/>
          {v.lights.map((l,i)=>(
            <circle key={i} cx={l.pos[0]} cy={l.pos[1]} r={l.r} fill={l.color}
              style={{filter:`drop-shadow(0 0 ${l.r*1.2}px ${l.color})`}}/>
          ))}
        </svg>
      </div>
      {/* Light legend */}
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
        {v.lights.map((l,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 6px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:l.color,flexShrink:0}}/>
            <div style={{fontSize:8,color:C.muted,lineHeight:1.2}}>{l.label[lang]||l.label.fr}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px",borderRadius:14,background:"rgba(77,166,255,0.08)",border:`1px solid ${C.blue2}33`}}>
        <div style={{fontSize:12,fontWeight:700,color:C.blue2,marginBottom:6}}>{v.icon} {v.label[lang]||v.label.fr}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{v.summary[lang]||v.summary.fr}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — DAY SHAPES
// ══════════════════════════════════════
function DayShapesSVG({ lang }) {
  const [sel, setSel] = useState(null);

  const ShapeSVG = ({ type, color="#1a1a2e", size=40 }) => {
    const c = color;
    if(type==="ball") return <svg width={size} height={size}><circle cx={size/2} cy={size/2} r={size*0.42} fill={c}/></svg>;
    if(type==="cone_up") return <svg width={size} height={size*1.2}><polygon points={`${size/2},4 4,${size*1.1} ${size-4},${size*1.1}`} fill={c}/></svg>;
    if(type==="cone_down") return <svg width={size} height={size*1.2}><polygon points={`${size/2},${size*1.1} 4,4 ${size-4},4`} fill={c}/></svg>;
    if(type==="diamond") return <svg width={size} height={size*1.4}><polygon points={`${size/2},4 ${size-4},${size*0.7} ${size/2},${size*1.35} 4,${size*0.7}`} fill={c}/></svg>;
    if(type==="cylinder") return <svg width={size} height={size*1.2}><rect x={6} y={4} width={size-12} height={size*1.1} rx={4} fill={c}/><ellipse cx={size/2} cy={4} rx={size/2-6} ry={5} fill={c}/></svg>;
    if(type==="2cones") return <svg width={size} height={size*1.5}><polygon points={`${size/2},4 4,${size*0.6} ${size-4},${size*0.6}`} fill={c}/><polygon points={`${size/2},${size*1.45} 4,${size*0.9} ${size-4},${size*0.9}`} fill={c}/></svg>;
    return null;
  };

  const shapes = [
    { id:"anchor_ball", shape:"ball", color:"#111",
      label:{fr:"Boule noire (mouillage)",en:"Black ball (anchor)",es:"Bola negra (fondeo)",pt:"Bola preta (fundeado)"},
      desc:{fr:"1 BOULE NOIRE à l'avant\n\nSIGNIFICATION : Navire au mouillage\nPositionnée à l'avant du navire\nVisible de tous les côtés\n\nNUID correspondant : Feu blanc tout horizon\n\nDISPENSE : navire < 7m dans une zone\noù les petits navires mouillent habituellement",en:"1 BLACK BALL at bow\n\nMEANING: Vessel at anchor\nPositioned at forward part of vessel\nVisible from all sides\n\nNIGHT equivalent: All-round white light\n\nEXEMPTION: vessel < 7m in area\nwhere small vessels usually anchor",es:"1 BOLA NEGRA a proel\n\nSIGNIFICADO: Buque fondeado\nSituada en la parte proel del buque\nVisible desde todos los lados\n\nEquivalente NOCTURNO: Luz blanca todo horizonte",pt:"1 BOLA PRETA à proa\n\nSIGNIFICADO: Navio fundeado\nPositionada na parte de vante do navio\nVisível de todos os lados\n\nEquivalente NOTURNO: Luz branca todo horizonte"},},
    { id:"sailing_motor", shape:"cone_down", color:"#111",
      label:{fr:"Cône apex en bas (voilier moteur)",en:"Apex-down cone (sail+engine)",es:"Cono vértice abajo (vela+motor)",pt:"Cone vértice baixo (vela+motor)"},
      desc:{fr:"1 CÔNE NOIR pointe en BAS\n\nSIGNIFICATION : Voilier utilisant son moteur\n(même si les voiles sont aussi hissées)\nPositionné à l'avant, bien visible\n\nNUIT correspondant : + feu de tête de mât blanc\n(comme un navire à moteur)\n\nRÈGLE : tout voilier qui utilise son moteur\ndevient un 'navire à moteur'",en:"1 BLACK CONE apex downward\n\nMEANING: Sailing vessel using engine\n(even if sails also hoisted)\nPositioned forward, clearly visible\n\nNIGHT equivalent: + white masthead light\n(like a power vessel)\n\nRULE: any sailing vessel using engine\nbecomes a 'power vessel'",es:"1 CONO NEGRO vértice hacia abajo\n\nSIGNIFICADO: Velero usando su motor\n(aunque las velas también estén izadas)\nSituado a proel, bien visible\n\nEquivalente NOCTURNO: + luz de tope blanca",pt:"1 CONE PRETO vértice para baixo\n\nSIGNIFICADO: Veleiro usando motor\n(mesmo que as velas também estejam içadas)\nPositionado à proa, bem visível\n\nEquivalente NOTURNO: + luz de topo branca"},},
    { id:"tow_long", shape:"diamond", color:"#111",
      label:{fr:"Losange (remorque > 200m)",en:"Diamond (tow > 200m)",es:"Rombo (remolque > 200m)",pt:"Losango (reboque > 200m)"},
      desc:{fr:"1 LOSANGE NOIR\n\nSIGNIFICATION : Navire en remorquage\nsur une distance > 200 mètres\nAffiché sur le REMORQUEUR et sur le REMORQUÉ\n\nNUIT correspondant :\nRemorqueur : 3 feux de tête de mât\nRemorqué : feux de côté + poupe\n\nIMPORTANT : longueur de remorque critique\n→ Risque d'abordage avec câble immergé",en:"1 BLACK DIAMOND\n\nMEANING: Vessel towing\nover a distance > 200 meters\nDisplayed on TUG and TOWED vessel\n\nNIGHT equivalent:\nTug: 3 masthead lights\nTowed: sidelights + stern\n\nIMPORTANT: critical tow length\n→ Risk of collision with submerged cable",es:"1 ROMBO NEGRO\n\nSIGNIFICADO: Buque en remolque\na una distancia > 200 metros\nExhibido en el REMOLCADOR y en el REMOLCADO\n\nEquivalente NOCTURNO:\nRemolcador: 3 luces de tope\nRemolcado: luces de costado + alcance",pt:"1 LOSANGO PRETO\n\nSIGNIFICADO: Navio a rebocar\na uma distância > 200 metros\nExibido no REBOCADOR e no REBOCADO\n\nEquivalente NOTURNO:\nRebocador: 3 luzes de topo\nRebocado: luzes laterais + popa"},},
    { id:"fishing_trawl", shape:"2cones", color:"#111",
      label:{fr:"2 cônes apex (pêche)",en:"2 apex cones (fishing)",es:"2 conos vértice (pesca)",pt:"2 cones vértice (pesca)"},
      desc:{fr:"2 CÔNES NOIRS apex contre apex\n(forme de losange / sablier)\n\nSIGNIFICATION : Navire de pêche au chalut\n(trawling)\n\nSI < 20m : peut utiliser 1 seul panier\n(osier/bambou) à la place\n\nNUIT correspondant :\n2 feux tout horizon VERTS superposés\n\nPÊCHE AUTRE QUE CHALUT :\n2 cônes également + signal supplémentaire\nsi engins > 150m de longueur (cône + boule)",en:"2 BLACK CONES apex-to-apex\n(diamond/waist shape)\n\nMEANING: Trawling fishing vessel\n\nIF < 20m: can use single basket\n(wicker/bamboo) instead\n\nNIGHT equivalent:\n2 all-round GREEN lights stacked\n\nFISHING OTHER THAN TRAWLING:\n2 cones also + additional signal\nif gear > 150m long (cone + ball)",es:"2 CONOS NEGROS vértice a vértice\n(forma de rombo / reloj de arena)\n\nSIGNIFICADO: Buque pesquero de arrastre\n\nSI < 20m: puede usar una sola cesta\n\nEquivalente NOCTURNO:\n2 luces todo horizonte VERDES superpuestas",pt:"2 CONES PRETOS vértice a vértice\n(forma de losango / ampulheta)\n\nSIGNIFICADO: Navio de pesca de arrasto\n\nSE < 20m: pode usar um único cesto\n\nEquivalente NOTURNO:\n2 luzes todo horizonte VERDES sobrepostas"},},
    { id:"nuc", shape:"ball", color:"#111",
      label:{fr:"2 boules (NUC)",en:"2 balls (NUC)",es:"2 bolas (NUC)",pt:"2 bolas (NUC)"},
      desc:{fr:"2 BOULES NOIRES (verticales)\n\nSIGNIFICATION : NUC — Navire sans gouverne\n(Not Under Command)\nIncapable de manœuvrer — avarie propulsion\nou gouvernail\n\nNUIT correspondant :\n2 feux rouges tout horizon (verticaux)\n\nPRIORITÉ : navire NUC a la priorité absolue\nTous les autres navires doivent l'éviter\n\nEXEMPLE : panne moteur + dérive = NUC",en:"2 BLACK BALLS (vertical)\n\nMEANING: NUC — Not Under Command\nUnable to maneuver — propulsion or\nrudder failure\n\nNIGHT equivalent:\n2 all-round RED lights (vertical)\n\nPRIORITY: NUC vessel has absolute priority\nAll other vessels must keep clear\n\nEXAMPLE: engine failure + drifting = NUC",es:"2 BOLAS NEGRAS (verticales)\n\nSIGNIFICADO: NUC — Buque sin gobierno\n(Not Under Command)\nIncapaz de maniobrar — avería propulsión\no timón\n\nEquivalente NOCTURNO:\n2 luces rojas todo horizonte (verticales)\n\nPRIORIDAD: buque NUC tiene prioridad absoluta",pt:"2 BOLAS PRETAS (verticais)\n\nSIGNIFICADO: NUC — Navio sem governo\n(Not Under Command)\nIncapaz de manobrar — avaria propulsão\nou leme\n\nEquivalente NOTURNO:\n2 luzes vermelhas todo horizonte (verticais)\n\nPRIORIDADE: navio NUC tem prioridade absoluta"},},
    { id:"ram", shape:"ball", color:"#111",
      label:{fr:"Boule-losange-boule (RAM)",en:"Ball-diamond-ball (RAM)",es:"Bola-rombo-bola (RAM)",pt:"Bola-losango-bola (RAM)"},
      desc:{fr:"BOULE + LOSANGE + BOULE (vertical)\n\nSIGNIFICATION : RAM — Manœuvrabilité restreinte\n(Restricted in Ability to Manoeuver)\nNavire dont la nature du travail\nlimite sa capacité à manœuvrer\n\nEXEMPLES :\n→ Dragage\n→ Pose de câbles sous-marins\n→ Opérations de ravitaillement en mer\n→ Lancement ou récupération d'aéronefs\n\nNUIT : rouge-blanc-rouge (tout horizon)\n\nPRIORITÉ élevée mais MOINS que NUC",en:"BALL + DIAMOND + BALL (vertical)\n\nMEANING: RAM — Restricted in Ability to Manoeuver\nVessel whose nature of work\nlimits ability to maneuver\n\nEXAMPLES:\n→ Dredging\n→ Submarine cable laying\n→ Replenishment at sea\n→ Aircraft launch/recovery\n\nNIGHT: red-white-red (all-round)\n\nPRIORITY: high but LESS than NUC",es:"BOLA + ROMBO + BOLA (vertical)\n\nSIGNIFICADO: RAM — Maniobrabilidad Restringida\nBuque cuya naturaleza del trabajo\nlimita su capacidad de maniobra\n\nEJEMPLOS:\n→ Dragado\n→ Tendido de cables submarinos\n→ Aprovisionamiento en el mar\n\nNOCHE: rojo-blanco-rojo (todo horizonte)",pt:"BOLA + LOSANGO + BOLA (vertical)\n\nSIGNIFICADO: RAM — Manobabilidade Restrita\nNavio cuja natureza do trabalho\nlimita a capacidade de manobrar\n\nEXEMPLOS:\n→ Dragagem\n→ Posição de cabos submarinos\n→ Reabastecimento no mar\n\nNOITE: vermelho-branco-vermelho (todo horizonte)"},},
  ];

  const shapeMap = {anchor_ball:"ball", sailing_motor:"cone_down", tow_long:"diamond", fishing_trawl:"2cones", nuc:"ball", ram:"diamond"};
  const sel_ = sel!==null ? shapes[sel] : null;

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
        {shapes.map((s,i)=>(
          <div key={i} onClick={()=>setSel(sel===i?null:i)} style={{
            padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
            background:sel===i?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",
            border:`1.5px solid ${sel===i?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.08)"}`}}>
            <ShapeSVG type={shapeMap[s.id]} size={30}/>
            <div style={{fontSize:8,color:sel===i?C.white:C.muted,fontWeight:700,marginTop:3,lineHeight:1.2}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"12px",borderRadius:14,background:"rgba(255,255,255,0.06)",border:"1.5px solid rgba(255,255,255,0.2)",animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <ShapeSVG type={shapeMap[sel_.id]} size={36}/>
          <div style={{fontSize:13,fontWeight:700,color:C.white}}>{sel_.label[lang]||sel_.label.fr}</div>
        </div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line"}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — LIGHT IDENTIFICATION QUIZ
// ══════════════════════════════════════
function LightIDSVG({ lang }) {
  const [scenario, setScenario] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const scenarios = [
    { lights:[{x:50,y:50,r:9,c:C.fwht},{x:50,y:70,r:7,c:C.fwht},{x:30,y:65,r:6,c:C.fred},{x:70,y:65,r:6,c:C.fgrn},{x:50,y:88,r:5,c:C.fwht}],
      question:{fr:"Que voyez-vous ?",en:"What do you see?",es:"¿Qué ves?",pt:"O que você vê?"},
      answer:{fr:"Navire à moteur (> 50m) en route venant vers vous\n→ 2 feux blancs de tête de mât (le 2e plus bas = plus proche)\n→ Feux rouge (bâbord) + vert (tribord)\n→ Feu blanc de poupe",en:"Large power vessel (> 50m) underway approaching\n→ 2 white masthead lights (2nd lower = closer)\n→ Red (port) + green (starboard) sidelights\n→ White stern light",es:"Buque a motor grande (> 50m) navegando aproximándose\n→ 2 luces de tope blancas (la 2ª más baja = más cercana)\n→ Luces roja (babor) + verde (estribor)\n→ Luz de alcance blanca",pt:"Navio a motor grande (> 50m) em rota aproximando-se\n→ 2 luzes de topo brancas (a 2ª mais baixa = mais próxima)\n→ Luzes vermelha (bb) + verde (eb)\n→ Luz de popa branca"},
      danger:{fr:"⚠️ Approche frontale — Surveiller cap · 2 feux de tête = grand navire",en:"⚠️ Head-on approach — Watch course · 2 mastheads = large vessel",es:"⚠️ Aproximación de frente — Vigilar el rumbo · 2 luces tope = buque grande",pt:"⚠️ Aproximação frontal — Vigiar rumo · 2 luzes topo = navio grande"},},
    { lights:[{x:50,y:30,r:8,c:C.fwht},{x:50,y:78,r:6,c:C.fwht}],
      question:{fr:"Que voyez-vous ?",en:"What do you see?",es:"¿Qué ves?",pt:"O que você vê?"},
      answer:{fr:"Navire au MOUILLAGE\n→ 1 ou 2 feux blancs tout horizon\n→ Pas de feux de côté rouge/vert\n→ Navire immobile\n\n⚠️ Si 2 feux : grand navire (> 50m) au mouillage",en:"Vessel at ANCHOR\n→ 1 or 2 all-round white lights\n→ No red/green sidelights\n→ Vessel stationary\n\n⚠️ If 2 lights: large vessel (> 50m) at anchor",es:"Buque FONDEADO\n→ 1 o 2 luces blancas todo horizonte\n→ Sin luces de costado rojo/verde\n→ Buque inmóvil\n\n⚠️ Si 2 luces: buque grande (> 50m) fondeado",pt:"Navio FUNDEADO\n→ 1 ou 2 luzes brancas todo horizonte\n→ Sem luzes laterais vermelho/verde\n→ Navio parado\n\n⚠️ Se 2 luzes: navio grande (> 50m) fundeado"},
      danger:{fr:"⚠️ Navire immobile — Risque d'abordage si vous avancez vers lui",en:"⚠️ Stationary vessel — Collision risk if you advance toward it",es:"⚠️ Buque inmóvil — Riesgo de abordaje si avanzas hacia él",pt:"⚠️ Navio parado — Risco de abalroamento se avançar para ele"},},
    { lights:[{x:50,y:15,r:7,c:C.fwht},{x:50,y:28,r:7,c:C.fwht},{x:50,y:41,r:7,c:C.fwht},{x:28,y:60,r:5,c:C.fred},{x:72,y:60,r:5,c:C.fgrn},{x:50,y:70,r:6,c:C.fyel},{x:50,y:83,r:5,c:C.fwht}],
      question:{fr:"Que voyez-vous ?",en:"What do you see?",es:"¿Qué ves?",pt:"O que você vê?"},
      answer:{fr:"REMORQUEUR en remorquage > 200m\n→ 3 feux blancs de tête de mât (verticaux)\n→ Feux rouge et vert de côtés\n→ Feu jaune de poupe (identifie le remorqueur)\n→ Feu blanc de poupe\n\nLe navire remorqué est à plus de 200m derrière !",en:"TUG towing > 200m\n→ 3 white masthead lights (vertical)\n→ Red and green sidelights\n→ YELLOW stern light (identifies tug)\n→ White stern light\n\nTowed vessel is over 200m behind!",es:"REMOLCADOR remolcando > 200m\n→ 3 luces de tope blancas (verticales)\n→ Luces roja y verde de costado\n→ Luz de alcance AMARILLA (identifica remolcador)\n→ Luz de alcance blanca\n\n¡El buque remolcado está a más de 200m detrás!",pt:"REBOCADOR a rebocar > 200m\n→ 3 luzes de topo brancas (verticais)\n→ Luzes vermelha e verde laterais\n→ Luz de popa AMARELA (identifica rebocador)\n→ Luz de popa branca\n\nO navio rebocado está a mais de 200m atrás!"},
      danger:{fr:"⚠️ DANGER CRITIQUE — Câble de remorque immergé entre le remorqueur et le remorqué — NE PAS TRAVERSER",en:"⚠️ CRITICAL DANGER — Submerged tow cable between tug and towed — DO NOT CROSS",es:"⚠️ PELIGRO CRÍTICO — Cable de remolque sumergido — NO CRUZAR",pt:"⚠️ PERIGO CRÍTICO — Cabo de reboque submerso — NÃO CRUZAR"},},
    { lights:[{x:50,y:25,r:8,c:C.fgrn},{x:50,y:42,r:7,c:C.fwht},{x:28,y:58,r:5,c:C.fred},{x:72,y:58,r:5,c:C.fgrn},{x:50,y:78,r:5,c:C.fwht}],
      question:{fr:"Que voyez-vous ?",en:"What do you see?",es:"¿Qué ves?",pt:"O que você vê?"},
      answer:{fr:"NAVIRE DE PÊCHE (autre que chalut) en route\n→ Feu VERT tout horizon (en haut)\n→ Feu BLANC tout horizon (en dessous)\n→ Feux de côté rouge et vert (car en route)\n→ Feu de poupe blanc\n\nSI chalut : 2 feux VERTS tout horizon (pas de blanc)",en:"FISHING VESSEL (not trawling) underway\n→ GREEN all-round light (top)\n→ WHITE all-round light (below)\n→ Red and green sidelights (underway)\n→ White stern light\n\nIF TRAWLING: 2 GREEN all-round lights (no white)",es:"BUQUE PESQUERO (distinto del arrastre) navegando\n→ Luz VERDE todo horizonte (arriba)\n→ Luz BLANCA todo horizonte (abajo)\n→ Luces de costado roja y verde (navegando)\n→ Luz de alcance blanca\n\nSI ARRASTRE: 2 luces VERDES todo horizonte (sin blanca)",pt:"NAVIO DE PESCA (exceto arrasto) em rota\n→ Luz VERDE todo horizonte (em cima)\n→ Luz BRANCA todo horizonte (abaixo)\n→ Luzes laterais vermelha e verde (em rota)\n→ Luz de popa branca\n\nSE ARRASTO: 2 luzes VERDES todo horizonte (sem branca)"},
      danger:{fr:"⚠️ Navire de pêche avec engins — Peut manœuvrer difficilement — Laisser passer",en:"⚠️ Fishing vessel with gear — May maneuver with difficulty — Give way",es:"⚠️ Buque pesquero con artes — Puede maniobrar con dificultad — Ceder el paso",pt:"⚠️ Navio de pesca com aparelhos — Pode manobrar com dificuldade — Ceder passagem"},},
  ];

  const sc = scenarios[scenario];
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {scenarios.map((_,i)=>(
          <button key={i} onClick={()=>{setScenario(i);setRevealed(false);}} style={{
            flex:1,padding:"6px 2px",borderRadius:8,cursor:"pointer",fontSize:10,fontWeight:700,
            background:scenario===i?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",
            border:`1.5px solid ${scenario===i?C.blue2:"rgba(255,255,255,0.08)"}`,
            color:scenario===i?C.blue2:C.muted}}>
            {i+1}
          </button>
        ))}
      </div>
      {/* Night view */}
      <div style={{background:"#000510",borderRadius:14,padding:"16px",marginBottom:10,textAlign:"center",border:"1px solid rgba(77,166,255,0.2)"}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:8}}>{sc.question[lang]||sc.question.fr}</div>
        <svg width={100} height={100} viewBox="0 0 100 100" style={{maxWidth:140}}>
          {sc.lights.map((l,i)=>(
            <circle key={i} cx={l.x} cy={l.y} r={l.r} fill={l.c}
              style={{filter:`drop-shadow(0 0 ${l.r*1.5}px ${l.c})`}}/>
          ))}
        </svg>
      </div>
      {!revealed&&<button onClick={()=>setRevealed(true)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:"rgba(77,166,255,0.12)",border:`1px solid ${C.blue2}44`,color:C.blue2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",marginBottom:8}}>
        👁️ {lang==="fr"?"IDENTIFIER CES FEUX":lang==="en"?"IDENTIFY THESE LIGHTS":lang==="es"?"IDENTIFICAR ESTAS LUCES":"IDENTIFICAR ESTAS LUZES"}
      </button>}
      {revealed&&<div style={{padding:"12px",borderRadius:14,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,animation:"fadeUp 0.3s ease",marginBottom:8}}>
        <div style={{fontSize:12,color:C.green,fontWeight:700,marginBottom:6}}>✅ {lang==="fr"?"IDENTIFICATION":lang==="en"?"IDENTIFICATION":lang==="es"?"IDENTIFICACIÓN":"IDENTIFICAÇÃO"}</div>
        <div style={{fontSize:11,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:8}}>{sc.answer[lang]||sc.answer.fr}</div>
        <div style={{padding:"8px 10px",borderRadius:10,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,fontSize:11,color:C.orange,lineHeight:1.5}}>
          {sc.danger[lang]||sc.danger.fr}
        </div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp,setExp]=useState(false);
  const d={
    fr:{title:"Collision MV Doña Paz — Philippines (1987)",teaser:"Bac passager · pétrolier MT Vector · 4 000 morts · Feux absents · Nuit noire · Plus grande catastrophe maritime en temps de paix",what:"Le 20 décembre 1987, le ferry Doña Paz heurte le pétrolier MT Vector dans le détroit de Tablas (Philippines) à 22h30. Le Doña Paz transporte 4 000 passagers (non déclarés officiellement). Le Vector transporte 8 700 barils d'essence. L'incendie résultant est catastrophique. Seulement 26 survivants.",cause:"• MT Vector : pas de licence de navigation valide\n• MT Vector : feux de navigation absents ou non conformes\n• Pas de guetteur désigné à bord du Vector\n• Surcharge massive du Doña Paz (4 000 passagers au lieu de 1 424)\n• Capitaine du Doña Paz absent de la passerelle\n• Navigation dans une zone à fort trafic de nuit sans radar\n• Absence de communication radio avant la collision",lessons:"✓ Feux de navigation = obligation légale COLREG Règle 22\n✓ Portée des feux selon taille du navire\n✓ Guet permanent obligatoire (COLREG Règle 5)\n✓ Capitaine doit être sur la passerelle en zone dense\n✓ Radar obligatoire en navigation nocturne dense\n✓ Les feux permettent l'identification à distance\n— sans feux : collision prévisible",link:"🔗 Lien L2 Feux & Formes : Les feux de navigation ne sont pas décoratifs. Leur absence ou non-conformité peut rendre un navire invisible la nuit. La Doña Paz est l'exemple tragique que les règles COLREG sur les feux sont des règles de survie."},
    en:{title:"MV Doña Paz Collision — Philippines (1987)",teaser:"Passenger ferry · MT Vector tanker · 4,000 dead · Missing lights · Dark night · Largest peacetime maritime disaster",what:"On December 20, 1987, the ferry Doña Paz collides with tanker MT Vector in the Tablas Strait (Philippines) at 10:30 PM. The Doña Paz carries 4,000 passengers (officially undeclared). The Vector carries 8,700 barrels of gasoline. The resulting fire is catastrophic. Only 26 survivors.",cause:"• MT Vector: no valid navigation license\n• MT Vector: navigation lights absent or non-compliant\n• No designated lookout on Vector\n• Massive overloading of Doña Paz (4,000 vs 1,424 capacity)\n• Doña Paz captain absent from bridge\n• Navigation in heavy traffic area at night without radar\n• No radio communication before collision",lessons:"✓ Navigation lights = legal obligation COLREG Rule 22\n✓ Light range per vessel size\n✓ Permanent lookout mandatory (COLREG Rule 5)\n✓ Captain must be on bridge in congested areas\n✓ Radar mandatory in dense nighttime navigation\n✓ Lights allow distance identification\n— without lights: predictable collision",link:"🔗 L2 Lights & Shapes link: Navigation lights are not decorative. Their absence or non-compliance can make a vessel invisible at night. The Doña Paz is the tragic example that COLREG light rules are survival rules."},
    es:{title:"Colisión MV Doña Paz — Filipinas (1987)",teaser:"Ferry de pasajeros · petrolero MT Vector · 4.000 muertos · Luces ausentes · Noche oscura · Mayor catástrofe marítima en tiempo de paz",what:"El 20 de diciembre de 1987, el transbordador Doña Paz choca con el petrolero MT Vector en el estrecho de Tablas (Filipinas) a las 22:30. El Doña Paz transporta 4.000 pasajeros (no declarados oficialmente). El Vector transporta 8.700 barriles de gasolina. El incendio resultante es catastrófico. Solo 26 supervivientes.",cause:"• MT Vector: sin licencia de navegación válida\n• MT Vector: luces de navegación ausentes o no conformes\n• Sin vigía designado a bordo del Vector\n• Sobrecarga masiva del Doña Paz (4.000 pasajeros en lugar de 1.424)\n• Capitán del Doña Paz ausente del puente\n• Navegación en zona de tráfico denso de noche sin radar",lessons:"✓ Luces de navegación = obligación legal COLREG Regla 22\n✓ Alcance de las luces según el tamaño del buque\n✓ Guardia permanente obligatoria (COLREG Regla 5)\n✓ El capitán debe estar en el puente en zonas congestionadas\n✓ Radar obligatorio en navegación nocturna densa",link:"🔗 Vínculo L2: Las luces de navegación no son decorativas. Su ausencia puede hacer invisible un buque de noche. El Doña Paz es el ejemplo trágico de que las reglas COLREG son reglas de supervivencia."},
    pt:{title:"Colisão MV Doña Paz — Filipinas (1987)",teaser:"Ferry de passageiros · petroleiro MT Vector · 4.000 mortos · Luzes ausentes · Noite escura · Maior catástrofe marítima em tempo de paz",what:"A 20 de dezembro de 1987, o ferry Doña Paz colide com o petroleiro MT Vector no estreito de Tablas (Filipinas) às 22h30. O Doña Paz transporta 4.000 passageiros (não declarados oficialmente). O Vector transporta 8.700 barris de gasolina. O incêndio resultante é catastrófico. Apenas 26 sobreviventes.",cause:"• MT Vector: sem licença de navegação válida\n• MT Vector: luzes de navegação ausentes ou não conformes\n• Sem vigia designado a bordo do Vector\n• Sobrecarga massiva do Doña Paz (4.000 passageiros em vez de 1.424)\n• Capitão do Doña Paz ausente da ponte\n• Navegação em zona de tráfego intenso de noite sem radar",lessons:"✓ Luzes de navegação = obrigação legal COLREG Regra 22\n✓ Alcance das luzes por tamanho do navio\n✓ Vigia permanente obrigatória (COLREG Regra 5)\n✓ Capitão deve estar na ponte em zonas congestionadas\n✓ Radar obrigatório em navegação noturna intensa",link:"🔗 Vínculo L2: As luzes de navegação não são decorativas. A sua ausência pode tornar um navio invisível de noite. O Doña Paz é o exemplo trágico de que as regras COLREG sobre luzes são regras de sobrevivência."},
  };
  const c=d[lang]||d.fr;
  return(
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>💥</span>
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
  const qs={
    fr:[
      {id:"q1",q:"Un feu rouge de 112,5° visible à bâbord = quelle situation ?\n(Répondre : 2-3 mots)",correct:"navire à droite"},
      {id:"q2",q:"De jour, un voilier qui utilise son moteur montre quelle forme ?\n(Répondre : 2 mots)",correct:"cône bas"},
      {id:"q3",q:"Un remorqueur avec remorque > 200m montre combien de feux de tête de mât ?\n(Répondre : le chiffre)",correct:"3"},
    ],
    en:[
      {id:"q1",q:"A red light of 112.5° visible to port = what situation?\n(Answer: 2-3 words)",correct:"vessel to starboard"},
      {id:"q2",q:"By day, a sailing vessel using its engine shows what shape?\n(Answer: 2 words)",correct:"cone downward"},
      {id:"q3",q:"A tug with tow > 200m shows how many masthead lights?\n(Answer: the number)",correct:"3"},
    ],
    es:[
      {id:"q1",q:"Una luz roja de 112,5° visible a babor = ¿qué situación?\n(Responder: 2-3 palabras)",correct:"buque a estribor"},
      {id:"q2",q:"De día, ¿un velero que usa su motor muestra qué forma?\n(Responder: 2 palabras)",correct:"cono abajo"},
      {id:"q3",q:"¿Un remolcador con remolque > 200m muestra cuántas luces de tope?\n(Responder: el número)",correct:"3"},
    ],
    pt:[
      {id:"q1",q:"Uma luz vermelha de 112,5° visível a bombordo = que situação?\n(Responder: 2-3 palavras)",correct:"navio a estibordo"},
      {id:"q2",q:"De dia, um veleiro que usa o motor mostra que forma?\n(Responder: 2 palavras)",correct:"cone baixo"},
      {id:"q3",q:"Um rebocador com reboque > 200m mostra quantas luzes de topo?\n(Responder: o número)",correct:"3"},
    ],
  };
  const list=qs[lang]||qs.fr;
  const chk=(q,val)=>{
    const v=val.trim().toLowerCase();
    if(q.id==="q1") return v.includes("tribord")||v.includes("starboard")||v.includes("estribor")||v.includes("estibordo")||v.includes("droite")||v.includes("right");
    if(q.id==="q2") return v.includes("cône")||v.includes("cone")||v.includes("bas")||v.includes("down")||v.includes("abajo")||v.includes("baixo");
    if(q.id==="q3") return v.includes("3")||v.includes("trois")||v.includes("three")||v.includes("tres")||v.includes("três");
    return false;
  };
  return(
    <div>
      <div style={{background:"rgba(0,0,0,0.4)",borderRadius:12,padding:"10px 12px",marginBottom:12,border:`1px solid ${C.blue2}44`,fontSize:11,color:C.gold2,lineHeight:1.6}}>
        {lang==="fr"?"💡 Rappels : Rouge bâbord → navire à votre tribord · Cône bas = voilier+moteur · 3 feux de tête = remorque >200m"
        :lang==="en"?"💡 Reminders: Red port → vessel to your starboard · Cone down = sail+engine · 3 masthead lights = tow >200m"
        :lang==="es"?"💡 Recordatorios: Rojo babor → buque a tu estribor · Cono abajo = vela+motor · 3 luces tope = remolque >200m"
        :"💡 Lembretes: Vermelho bombordo → navio ao seu estibordo · Cone baixo = vela+motor · 3 luzes topo = reboque >200m"}
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.5,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="?"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:14,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q,ans[q.id])?C.green:C.red}}>{chk(q,ans[q.id])?"✓":`✗ → ${q.correct}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: Votre TRIBORD (feu rouge bâbord = navire arrive de votre droite → danger abordage)\n✅ Q2: CÔNE pointe vers le bas (voilier sous moteur = navire à moteur = doit afficher cône bas + feu de tête de mât)\n✅ Q3: 3 FEUX de tête (remorque > 200m → 3 feux blancs verticaux · si ≤ 200m = 2 seulement)"
        :lang==="en"?"✅ Q1: Your STARBOARD (red port light = vessel approaching from your right → collision danger)\n✅ Q2: CONE pointing down (sailing vessel under engine = power vessel = must show downward cone + masthead light)\n✅ Q3: 3 MASTHEAD LIGHTS (tow > 200m → 3 white vertical lights · if ≤ 200m = only 2)"
        :"✅ Q1: Tu ESTRIBOR · Q2: CONO apuntando abajo · Q3: 3 LUCES de tope"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

const QUIZ = {
  fr:[
    {q:"Quel feu un navire à moteur en route montre-t-il que les voiliers n'ont PAS ?",opts:["Feux de côté rouge et vert","Le feu de tête de mât blanc à 225° — feu blanc dirigé vers l'avant et les côtés","Feu de poupe blanc","Feu tout horizon"],correct:1,expl:"Feu de tête de mât (masthead light) = feu blanc à 225° monté sur le mât avant. EXCLUSIF aux navires à propulsion mécanique (moteur). Les voiliers naviguant à la VOILE SEULE n'ont PAS ce feu. Si un voilier utilise son moteur (même si les voiles sont hissées), il DOIT allumer son feu de tête de mât — car il devient alors un 'navire à moteur' au sens COLREG. De jour : cône pointant vers le bas."},
    {q:"Un navire en route vous montre un feu rouge sur votre tribord. Que se passe-t-il ?",opts:["Il s'éloigne de vous","Un navire arrive par votre bâbord — vous voyez son feu rouge de bâbord = il est en croisement et peut vous présenter un risque d'abordage","Un navire arrive par votre tribord — vous êtes le navire privilégié","Rien de particulier"],correct:1,expl:"Feu rouge de bâbord (port sidelight) = visible sur 112,5° depuis bâbord. Si vous VOYEZ un feu rouge sur votre TRIBORD : cela signifie que le navire en question vous présente SON bâbord = il arrive de votre gauche (bâbord pour lui) et vous voyez son côté gauche. RÈGLE : quand deux navires se croisent et que l'un voit le rouge de l'autre sur son tribord → ce navire (vous) est le 'gêné' et doit s'écarter. 'Rouge stop = céder.'"},
    {q:"Quelle forme de jour doit montrer un navire au mouillage ?",opts:["Un cône noir","Une boule noire — visible à l'avant du navire","Un cylindre noir","Un losange noir"],correct:1,expl:"Navire au mouillage DE JOUR = 1 BOULE NOIRE (ball) à l'avant du navire, bien visible. La nuit = feu blanc tout horizon (360°). Grand navire > 50m = 2 boules de jour (ou 2 feux blancs la nuit). DISPENSE : navire < 7m de longueur dans une zone où les petits navires mouillent habituellement. La boule noire signale que le navire est IMMOBILE — risque d'abordage pour tout navire qui vient vers lui."},
    {q:"Comment reconnaître un remorqueur en remorquage de plus de 200 mètres la nuit ?",opts:["2 feux de tête de mât blancs","3 feux de tête de mât blancs verticaux + feux de côté + feu de poupe JAUNE","1 feu de tête de mât blanc + feux verts","Feu rouge + blanc + rouge"],correct:1,expl:"Remorqueur (remorquage > 200m) = 3 FEUX DE TÊTE DE MÂT BLANCS superposés verticalement + feux de côté rouge/vert + feu de POUPE JAUNE (identifiant spécifique du remorqueur). Si remorque ≤ 200m : seulement 2 feux de tête de mât. Le feu JAUNE à la poupe est la clé = identifie le remorqueur à coup sûr. DANGER CRITIQUE : câble de remorque invisible entre remorqueur et remorqué — ne jamais traverser entre les deux."},
    {q:"Quels feux montre un navire de pêche au CHALUT en route ?",opts:["Feux blancs de tête de mât + côtés + poupe","2 feux VERTS tout horizon superposés + feux de côté + poupe (car en route)","1 vert + 1 blanc tout horizon + feux côtés + poupe","Feux rouges en haut"],correct:1,expl:"Navire de pêche AU CHALUT (trawling) = 2 FEUX VERTS tout horizon superposés (vert en haut, vert en dessous) + feux de côté rouge/vert + feu de poupe blanc (si en route). Attention : pêche AUTRE QUE chalut = 1 VERT + 1 BLANC (pas 2 verts). Forme de jour chalut : 2 cônes apex contre apex (losange). De nuit : regarder si les 2 feux tout horizon sont VERTS (chalut) ou VERT+BLANC (autre pêche)."},
  ],
  en:[
    {q:"Which light does a power vessel underway show that sailing vessels do NOT?",opts:["Red and green sidelights","The 225° white masthead light — white light directed forward and to the sides","White stern light","All-round light"],correct:1,expl:"Masthead light = 225° white light mounted on the forward mast. EXCLUSIVE to mechanically-propelled vessels (engine). Sailing vessels under SAIL ONLY do NOT have this light. If a sailing vessel uses its engine (even with sails hoisted), it MUST show its masthead light — as it then becomes a 'power vessel' under COLREG. By day: downward-pointing cone."},
    {q:"A vessel underway shows you a red light on your starboard. What is happening?",opts:["It is moving away from you","A vessel is approaching from your port — you see its red port light = it is crossing and may present collision risk","A vessel is approaching from your starboard — you have right of way","Nothing particular"],correct:1,expl:"Red port sidelight = visible over 112.5° from port. If you SEE a red light on your STARBOARD: the vessel in question is showing you ITS port side = it is coming from your left (port for it) and you see its left side. RULE: when two vessels cross and one sees the other's red on its starboard → that vessel (you) is the 'give-way' vessel and must maneuver. 'Red stop = give way.'"},
    {q:"What day shape must an anchored vessel show?",opts:["A black cone","A black ball — visible at forward part of vessel","A black cylinder","A black diamond"],correct:1,expl:"Vessel at anchor BY DAY = 1 BLACK BALL at forward part of vessel, clearly visible. Night = all-round white light (360°). Large vessel > 50m = 2 balls by day (or 2 white lights at night). EXEMPTION: vessel < 7m in area where small vessels usually anchor. The black ball signals the vessel is STATIONARY — collision risk for any vessel approaching."},
    {q:"How to recognize a tug towing more than 200 meters at night?",opts:["2 white masthead lights","3 white masthead lights stacked vertically + sidelights + YELLOW stern light","1 white masthead light + green lights","Red + white + red"],correct:1,expl:"Tug (tow > 200m) = 3 WHITE MASTHEAD LIGHTS stacked vertically + red/green sidelights + YELLOW stern light (specific tug identifier). If tow ≤ 200m: only 2 masthead lights. YELLOW light at stern is the key = identifies the tug with certainty. CRITICAL DANGER: invisible tow cable between tug and towed vessel — never cross between the two."},
    {q:"What lights does a TRAWLING fishing vessel underway show?",opts:["White masthead lights + sidelights + stern","2 all-round GREEN lights stacked + sidelights + stern (if underway)","1 green + 1 white all-round + sidelights + stern","Red lights on top"],correct:1,expl:"TRAWLING fishing vessel = 2 all-round GREEN lights stacked (green top, green below) + red/green sidelights + white stern light (if underway). Note: fishing OTHER THAN trawling = 1 GREEN + 1 WHITE (not 2 greens). Day shape trawling: 2 cones apex-to-apex (diamond). At night: look if 2 all-round lights are BOTH GREEN (trawling) or GREEN+WHITE (other fishing)."},
  ],
  es:[
    {q:"¿Qué luz muestra un buque a motor navegando que los veleros NO tienen?",opts:["Luces de costado roja y verde","La luz de tope blanca de 225° — luz blanca dirigida hacia delante y los costados","Luz de alcance blanca","Luz de todo horizonte"],correct:1,expl:"Luz de tope (masthead light) = luz blanca de 225° montada en el palo proel. EXCLUSIVA de los buques con propulsión mecánica (motor). Los veleros navegando SOLO A VELA NO tienen esta luz. Si un velero usa su motor (aunque las velas estén izadas), DEBE encender su luz de tope — pues pasa a ser un 'buque a motor' según el COLREG. De día: cono apuntando hacia abajo."},
    {q:"Un buque en ruta te muestra una luz roja por tu estribor. ¿Qué ocurre?",opts:["Se está alejando de ti","Un buque se aproxima por tu babor — ves su luz roja de babor = está en cruce y puede presentar riesgo de abordaje","Un buque se aproxima por tu estribor — tienes prioridad","Nada en particular"],correct:1,expl:"Luz lateral roja de babor = visible 112,5° desde babor. Si VES una luz roja por tu ESTRIBOR: el buque en cuestión te muestra SU babor = viene por tu izquierda. REGLA: cuando dos buques se cruzan y uno ve el rojo del otro por su estribor → ese buque (tú) es el 'buque que debe ceder' y debe maniobrar. 'Rojo para = ceder el paso.'"},
    {q:"¿Qué señal diurna debe mostrar un buque fondeado?",opts:["Un cono negro","Una bola negra — visible en la parte de proa del buque","Un cilindro negro","Un rombo negro"],correct:1,expl:"Buque fondeado DE DÍA = 1 BOLA NEGRA en la parte delantera del buque, bien visible. Noche = luz blanca todo horizonte (360°). Buque grande > 50m = 2 bolas de día (o 2 luces blancas de noche). DISPENSA: buque < 7m en zona donde los buques pequeños suelen fondear. La bola negra señala que el buque está INMÓVIL — riesgo de abordaje para cualquier buque que se acerque."},
    {q:"¿Cómo reconocer un remolcador en remolque de más de 200 metros de noche?",opts:["2 luces de tope blancas","3 luces de tope blancas verticales + luces de costado + luz de alcance AMARILLA","1 luz de tope blanca + luces verdes","Roja + blanca + roja"],correct:1,expl:"Remolcador (remolque > 200m) = 3 LUCES DE TOPE BLANCAS verticales superpuestas + luces de costado roja/verde + luz de alcance AMARILLA (identificador específico del remolcador). Si remolque ≤ 200m: solo 2 luces de tope. La luz AMARILLA en la popa es la clave = identifica al remolcador con certeza. PELIGRO CRÍTICO: cable de remolque invisible — nunca cruzar entre ambos."},
    {q:"¿Qué luces muestra un buque pesquero DE ARRASTRE navegando?",opts:["Luces de tope blancas + costado + alcance","2 luces VERDES todo horizonte superpuestas + luces de costado + alcance (si navega)","1 verde + 1 blanca todo horizonte + costado + alcance","Luces rojas arriba"],correct:1,expl:"Buque pesquero DE ARRASTRE = 2 luces VERDES todo horizonte superpuestas (verde arriba, verde abajo) + luces de costado roja/verde + luz de alcance blanca (si navega). Nota: pesca DISTINTA DEL ARRASTRE = 1 VERDE + 1 BLANCA (no 2 verdes). Señal diurna arrastre: 2 conos vértice a vértice (rombo). De noche: mirar si las 2 luces todo horizonte son AMBAS VERDES (arrastre) o VERDE+BLANCA (otra pesca)."},
  ],
  pt:[
    {q:"Que luz mostra um navio a motor em rota que os veleiros NÃO têm?",opts:["Luzes laterais vermelha e verde","A luz de topo branca de 225° — luz branca dirigida para a frente e os costados","Luz de popa branca","Luz todo horizonte"],correct:1,expl:"Luz de topo (masthead light) = luz branca de 225° montada no mastro de vante. EXCLUSIVA dos navios com propulsão mecânica (motor). Os veleiros navegando SÓ À VELA NÃO têm esta luz. Se um veleiro usa o motor (mesmo com as velas içadas), DEVE acender a luz de topo — pois passa a ser um 'navio a motor' segundo o COLREG. De dia: cone apontado para baixo."},
    {q:"Um navio em rota mostra-lhe uma luz vermelha ao seu estibordo. O que acontece?",opts:["Está a afastar-se de você","Um navio está a aproximar-se pelo seu bombordo — vê a luz vermelha de bombordo = está em cruzamento e pode apresentar risco de abalroamento","Um navio está a aproximar-se pelo seu estibordo — você tem prioridade","Nada de particular"],correct:1,expl:"Luz lateral vermelha de bombordo = visível 112,5° de bombordo. Se VÊ uma luz vermelha ao seu ESTIBORDO: o navio em questão mostra-lhe o SEU bombordo = está a vir pela sua esquerda. REGRA: quando dois navios se cruzam e um vê o vermelho do outro ao seu estibordo → esse navio (você) é o 'navio que cede' e deve manobrar. 'Vermelho para = ceder passagem.'"},
    {q:"Que sinal diurno deve mostrar um navio fundeado?",opts:["Um cone preto","Uma bola preta — visível na parte de vante do navio","Um cilindro preto","Um losango preto"],correct:1,expl:"Navio fundeado DE DIA = 1 BOLA PRETA na parte de vante do navio, bem visível. Noite = luz branca todo horizonte (360°). Navio grande > 50m = 2 bolas de dia (ou 2 luzes brancas de noite). ISENÇÃO: navio < 7m numa zona onde os pequenos navios costumam fundear. A bola preta sinaliza que o navio está PARADO — risco de abalroamento para qualquer navio que se aproxime."},
    {q:"Como reconhecer um rebocador a rebocar mais de 200 metros de noite?",opts:["2 luzes de topo brancas","3 luzes de topo brancas verticais + luzes laterais + luz de popa AMARELA","1 luz de topo branca + luzes verdes","Vermelha + branca + vermelha"],correct:1,expl:"Rebocador (reboque > 200m) = 3 LUZES DE TOPO BRANCAS verticais sobrepostas + luzes laterais vermelha/verde + luz de popa AMARELA (identificador específico do rebocador). Se reboque ≤ 200m: apenas 2 luzes de topo. A luz AMARELA na popa é a chave = identifica o rebocador com certeza. PERIGO CRÍTICO: cabo de reboque submerso invisível — nunca cruzar entre os dois."},
    {q:"Que luzes mostra um navio de pesca de ARRASTO em rota?",opts:["Luzes de topo brancas + laterais + popa","2 luzes VERDES todo horizonte sobrepostas + luzes laterais + popa (se em rota)","1 verde + 1 branca todo horizonte + laterais + popa","Luzes vermelhas em cima"],correct:1,expl:"Navio de pesca de ARRASTO = 2 luzes VERDES todo horizonte sobrepostas (verde em cima, verde abaixo) + luzes laterais vermelha/verde + luz de popa branca (se em rota). Nota: pesca DIFERENTE DE ARRASTO = 1 VERDE + 1 BRANCA (não 2 verdes). Sinal diurno arrasto: 2 cones vértice a vértice (losango). De noite: ver se as 2 luzes todo horizonte são AMBAS VERDES (arrasto) ou VERDE+BRANCA (outra pesca)."},
  ],
};

const BANK = {
  fr:[
    {q:"Quelle est la portée minimale des feux de côté (rouge/vert) d'un navire de plus de 50 mètres ?",opts:["1 mille","3 milles","6 milles","10 milles"],correct:1,expl:"COLREG Règle 22 - Portée des feux : Navire > 50m : feu de tête de mât = 6 milles · feux de côté = 3 milles · feu de poupe = 3 milles · feux tout horizon = 3 milles. Navire 12-50m : tête de mât = 5 milles · côtés = 2 milles. Navire < 12m : tête de mât = 2 milles · côtés = 1 mille · autres = 2 milles. Ces portées sont des minimums — pas des maximums."},
    {q:"Qu'est-ce qu'un feu 'tout horizon' (all-round light) ?",opts:["Un feu visible sur 360°","Un feu visible sur 225° uniquement","Un feu visible sur 135°","Un feu clignotant"],correct:0,expl:"Feu tout horizon = visible sur 360° — dans toutes les directions horizontales. Utilisé pour : navires au mouillage (blanc), NUC (rouge x2), RAM (rouge-blanc-rouge), pêche (vert+blanc ou 2 verts), pilote (blanc+rouge). Différent du feu de tête de mât (225°) et du feu de poupe (135°). En naviguant la nuit, un feu tout horizon blanc sans feux de côté = navire au mouillage ou à la dérive."},
    {q:"Quels feux montrent les 2 boules noires de NUC la nuit ?",opts:["2 feux blancs tout horizon","2 feux ROUGES tout horizon (verticaux)","2 feux rouges clignotants","Feu rouge + blanc"],correct:1,expl:"NUC (Not Under Command = navire sans gouverne) : DE JOUR = 2 boules noires. LA NUIT = 2 feux ROUGES tout horizon (360°) superposés verticalement. Ces feux REMPLACENT les feux normaux de navigation. Si le NUC est en route : il montre EN PLUS ses feux de côté et de poupe. Si arrêté : feux rouges seulement. PRIORITÉ ABSOLUE : tous les autres navires doivent s'écarter d'un NUC."},
    {q:"Quel est le signal lumineux d'un navire pilote en service ?",opts:["Feu blanc tout horizon","Feu blanc et rouge tout horizon alternés ou conjoints · feux de côté si en route","Feu jaune clignotant","Feu vert tout horizon"],correct:1,expl:"Navire pilote en service = feu BLANC et ROUGE tout horizon en plus des feux normaux. Feu blanc au-dessus et feu rouge en dessous (ou combiné). Si en route : + feux de côté + poupe. Si au mouillage : + feu de mouillage. Priorité : les navires pilotes doivent être évités — ils manœuvrent souvent dans les chenaux. DE JOUR : fanion 'H' (Hotel) du Code international des signaux = pavillon blanc et rouge = pilote à bord."},
    {q:"Qu'est-ce qu'un feu 'à secteurs' (sectored light) sur un phare ?",opts:["Un feu qui clignote","Phare émettant différentes couleurs ou signaux selon le secteur angulaire — guide le navigateur vers le chenal sûr","Un feu maritime décoratif","Un feu d'urgence"],correct:1,expl:"Feu à secteurs = phare émettant différentes couleurs selon l'angle : secteur blanc = chenal sûr, secteur rouge = danger à bâbord du chenal, secteur vert = danger à tribord. Le navigateur doit rester dans le secteur BLANC. Si le feu devient rouge : trop à gauche du chenal → corriger vers tribord. Si vert : trop à droite → corriger vers bâbord. Information sur les cartes marines."},
    {q:"Quels feux montre un sous-marin en surface la nuit ?",opts:["Feux normaux comme un navire à moteur","Feux de navigation normaux + feu CLIGNOTANT JAUNE spécifique aux sous-marins","Feux rouges seulement","Aucun feu"],correct:1,expl:"Sous-marin en surface = feux de navigation normaux (tête de mât + côtés + poupe) + feu CLIGNOTANT JAUNE spécifique aux sous-marins (COLREG Règle 23). Ce feu jaune est un avertissement supplémentaire pour les autres navires. De nuit, un feu jaune clignotant = SOUS-MARIN = extrême prudence (ballast, périscope, antennes). Ne jamais croiser à moins de 200 mètres d'un sous-marin en surface."},
    {q:"Qu'est-ce qu'un 'feu de navigation combiné' (combination light) pour petits navires ?",opts:["Un phare portable","Feu bicolore rouge/vert (pour voiliers < 20m) ou tricolore rouge/vert/blanc remplaçant 3 feux séparés","Un feu de secours","Un feu de pêche"],correct:1,expl:"Feu combiné pour petits navires : BICOLORE (bicolor) = rouge à gauche + vert à droite dans un seul feu pour les voiliers < 20m montés sur l'étrave. TRICOLORE (tricolor) = rouge + vert + blanc en tête de mât pour voiliers < 20m. Le tricolore remplace les feux de côté ET le feu de poupe. AVANTAGE : économie d'énergie électrique importante sur les petites unités. NE PEUT PAS être utilisé avec un moteur (feu tête de mât séparé requis)."},
    {q:"Qu'est-ce que la Règle 5 COLREG sur la 'veille visuelle et auditive' ?",opts:["Règle optionnelle","Obligation de maintenir en permanence une veille appropriée — utiliser vue · ouïe · radar — pour évaluer la situation et le risque d'abordage","Une règle météorologique","Une règle sur les ancres"],correct:1,expl:"COLREG Règle 5 (Veille) = obligation fondamentale de navigation. Tout navire doit en permanence assurer une veille appropriée par la vue, l'ouïe et tous les moyens disponibles (radar, AIS...). Objectif : détecter à temps tout risque d'abordage. MANQUEMENT : absence du guetteur = faute grave en cas d'accident. Dans l'affaire Doña Paz (1987), le Vector n'avait pas de guetteur désigné."},
    {q:"Qu'est-ce que la règle 'le rouge cède le pas au vert' ?",opts:["Une règle de couleur de peinture","Règle de priorité : un navire qui voit le feu VERT d'un autre sur son côté bâbord est généralement le navire PRIVILÉGIÉ — celui qui voit le ROUGE doit céder","Une règle de balisage","Une règle de mouillage"],correct:1,expl:"Règle simplifiée de priorité COLREG : 'Le rouge cède au vert'. En croisement : navire qui voit rouge sur son tribord = doit céder (c'est lui qui est à droite de l'autre = gêné). Navire qui voit vert sur son bâbord = est généralement privilégié. ATTENTION : cette règle ne remplace pas les règles COLREG complètes (qui donnent priorité aux voiliers, navires de pêche, NUC, RAM). C'est une simplification pour navires similaires."},
    {q:"Qu'est-ce que les 'feux de position' sur un aéronef militaire ou en détresse en mer ?",opts:["Des feux de bord d'un avion","Fusées ou signaux pyrotechniques pouvant être confondus avec des feux d'aéronefs — COLREG Règle 36 interdit d'imiter les signaux de détresse","Des feux réglementaires","Des feux de navigation"],correct:1,expl:"COLREG Règle 36 : interdiction d'utiliser des lumières ou signaux susceptibles d'être confondus avec des signaux de détresse ou des signaux réglementaires (NUC, pilote...). Signaux de détresse incluant des feux : feux à main rouges (red hand flares), fusées rouges (parachute flares), feux à fumée orange. Un aéronef en détresse en mer peut larguer des dériveurs lumineux."},
    {q:"Qu'est-ce que la Règle 23 COLREG sur les 'navires à propulsion mécanique en route' ?",opts:["Une règle de vitesse","Règle définissant les feux obligatoires d'un navire à moteur en route : tête de mât + côtés + poupe — et les variantes selon la taille","Une règle de mouillage","Une règle de priorité"],correct:1,expl:"COLREG Règle 23 = feux des navires à propulsion mécanique en route. > 50m : 2 feux de tête de mât + côtés + poupe. 12-50m : 1 feu de tête de mât + côtés + poupe. < 12m : options réduites. < 7m à faible vitesse (< 7 nœuds) : peut se limiter à un feu blanc visible de tous côtés. Sous-marins en surface : feu additionnel jaune clignotant."},
    {q:"Qu'est-ce qu'un feu 'isophase' (Iso) sur une bouée ou un phare ?",opts:["Un feu continu","Feu dont les durées d'éclat et d'occultation sont ÉGALES — exemple : Iso 4s = 2s allumé · 2s éteint","Un feu clignotant rapide","Un feu de danger"],correct:1,expl:"Feu isophase (Iso) = durée d'éclat = durée d'extinction. Ex : Iso 4s = 2s allumé + 2s éteint = 4s période. Utilisé notamment sur les bouées d'eaux saines (safe water marks) avec Morse A. Comparaison : Oc (à occultations) = allumé > éteint · Fl (éclat) = éteint > allumé · Iso = égal · Q (quick) = plus de 60 éclats/minute. Ces rythmes sont indiqués sur les cartes marines."},
    {q:"Qu'est-ce que les feux d'un navire en train de draguer (dredging) ?",opts:["Feux normaux de navire à l'arrêt","Feux RAM (rouge-blanc-rouge) + feux additionnels indiquant le côté sûr et le côté dangereux de la drague","Feux NUC","Feux de pêche"],correct:1,expl:"Navire dragueur (dredging) = feux RAM + signalisation supplémentaire spécifique : côté OBSTRUÉ = 2 feux ROUGES verticaux + obstacle sous-marin. Côté LIBRE = 2 feux VERTS verticaux = passage possible. DE JOUR : boule-losange-boule (RAM) + côté rouge (2 boules) + côté vert (2 cônes). RÈGLE PRATIQUE : passer du côté où vous voyez les feux VERTS — jamais du côté des feux rouges qui signalent l'obstacle."},
    {q:"Que signifie voir UNIQUEMENT un feu blanc à l'horizon la nuit ?",opts:["Un phare","Soit un navire vous présente sa POUPE (feu de poupe blanc 135°) = il s'éloigne ou vous le rattrapez · Soit un navire au mouillage · Soit un phare","Un navire NUC","Un navire de pêche"],correct:1,expl:"Feu blanc seul à l'horizon = plusieurs situations possibles : 1. POUPE d'un navire en route (135°) = il s'éloigne ou vous le rattrapez par derrière. 2. Navire AU MOUILLAGE (360°) = immobile. 3. Phare (fixe ou à éclats). DIFFÉRENCE : feu de poupe = petit arc (135°) donc disparaît si vous changez de cap. Mouillage = tout horizon, reste visible quel que soit votre cap. IMPORTANT : si vous rattrapez un navire par derrière = VOUS devez vous écarter (COLREG Règle 13)."},
    {q:"Qu'est-ce qu'un feu 'scintillant' (Q) par rapport à un feu 'à éclats' (Fl) ?",opts:["Ils sont identiques","Q (Quick) = plus de 60 éclats par minute · Fl (Flashing) = moins de 30 éclats par minute — le Q est plus rapide et caractérise les bouées cardinales","Q = 1 éclat, Fl = 2 éclats","Q = blanc, Fl = rouge"],correct:1,expl:"Q (Quick/Scintillant) = 50-80 éclats par minute (habituellement 60). Très rapide. Utilisé sur les bouées cardinales. Fl (Flashing/Éclat) = moins de 30 éclats par minute. Plus lent. VQ (Very Quick/Ultra-rapide) = 100-120 éclats par minute. LFl (Long Flash) = éclat d'au moins 2 secondes. Combinaisons : Q(3) = 3 scintillements = cardinale Est · Q(6)+LFl = cardinale Sud. Ces codes sont indiqués sur les cartes marines."},
  ],
  en:[
    {q:"What is the minimum range of sidelights (red/green) of a vessel over 50 meters?",opts:["1 mile","3 miles","6 miles","10 miles"],correct:1,expl:"COLREG Rule 22 - Light ranges: Vessel > 50m: masthead light = 6 miles · sidelights = 3 miles · stern light = 3 miles · all-round lights = 3 miles. Vessel 12-50m: masthead = 5 miles · sidelights = 2 miles. Vessel < 12m: masthead = 2 miles · sidelights = 1 mile · others = 2 miles. These ranges are minimums — not maximums."},
    {q:"What is an 'all-round light'?",opts:["A light visible over 360°","A light visible over 225° only","A light visible over 135°","A flashing light"],correct:0,expl:"All-round light = visible over 360° — in all horizontal directions. Used for: vessels at anchor (white), NUC (red x2), RAM (red-white-red), fishing (green+white or 2 greens), pilot (white+red). Different from masthead light (225°) and stern light (135°). When navigating at night, an all-round white light without sidelights = vessel at anchor or adrift."},
    {q:"What lights do 2 black NUC balls show at night?",opts:["2 all-round white lights","2 all-round RED lights (vertical)","2 flashing red lights","Red + white"],correct:1,expl:"NUC (Not Under Command): BY DAY = 2 black balls. AT NIGHT = 2 all-round RED lights (360°) stacked vertically. These lights REPLACE normal navigation lights. If NUC is underway: ADDITIONALLY shows sidelights and stern light. If stopped: red lights only. ABSOLUTE PRIORITY: all other vessels must keep clear of NUC."},
    {q:"What is the light signal of a pilot vessel on duty?",opts:["All-round white light","All-round white and red lights alternating or combined · sidelights if underway","Flashing yellow light","All-round green light"],correct:1,expl:"Pilot vessel on duty = all-round WHITE and RED lights in addition to normal lights. White above and red below (or combined). If underway: + sidelights + stern. If at anchor: + anchor light. Priority: pilot vessels must be avoided — they often maneuver in channels. BY DAY: flag 'H' (Hotel) from International Signal Code = white and red flag = pilot on board."},
    {q:"What is a 'sectored light' on a lighthouse?",opts:["A flashing light","Lighthouse emitting different colors or signals per angular sector — guides navigator toward safe channel","A decorative maritime light","An emergency light"],correct:1,expl:"Sectored light = lighthouse emitting different colors by angle: white sector = safe channel, red sector = danger port of channel, green sector = danger starboard of channel. Navigator must stay in WHITE sector. If light turns red: too far left in channel → correct to starboard. If green: too far right → correct to port. Information shown on nautical charts."},
    {q:"What lights does a surfaced submarine show at night?",opts:["Normal lights like a power vessel","Normal navigation lights + YELLOW FLASHING light specific to submarines","Red lights only","No lights"],correct:1,expl:"Surfaced submarine = normal navigation lights (masthead + sidelights + stern) + YELLOW FLASHING light specific to submarines (COLREG Rule 23). This yellow light is an additional warning for other vessels. At night, a flashing yellow light = SUBMARINE = extreme caution (ballast, periscope, antennas). Never cross within 200 meters of a surfaced submarine."},
    {q:"What is a 'combination light' for small vessels?",opts:["A portable lighthouse","Bicolor red/green light (for sailboats < 20m) or tricolor red/green/white replacing 3 separate lights","An emergency light","A fishing light"],correct:1,expl:"Combined light for small vessels: BICOLOR = red left + green right in single light for sailboats < 20m mounted on bow. TRICOLOR = red + green + white at masthead for sailboats < 20m. Tricolor replaces sidelights AND stern light. ADVANTAGE: significant electrical energy saving on small craft. CANNOT be used with engine (separate masthead light required)."},
    {q:"What is COLREG Rule 5 on 'visual and sound lookout'?",opts:["Optional rule","Obligation to maintain at all times a proper lookout — using sight · hearing · radar — to assess situation and collision risk","A weather rule","An anchor rule"],correct:1,expl:"COLREG Rule 5 (Lookout) = fundamental navigation obligation. Every vessel must at all times maintain a proper lookout by sight, sound and all available means (radar, AIS...). Objective: detect collision risk in time. FAILURE: absent lookout = serious fault in case of accident. In the Doña Paz case (1987), Vector had no designated lookout."},
    {q:"What is the 'red gives way to green' rule?",opts:["A paint color rule","Priority rule: a vessel seeing GREEN light of another on its port side is generally the PRIVILEGED vessel — the one seeing RED must give way","A buoyage rule","An anchor rule"],correct:1,expl:"Simplified COLREG priority rule: 'Red gives way to green'. Crossing situation: vessel seeing red on its starboard = must give way (it is to the right of the other = give-way). Vessel seeing green on its port = is generally privileged. CAUTION: this rule does not replace complete COLREG rules (which give priority to sailboats, fishing vessels, NUC, RAM). It's a simplification for similar vessels."},
    {q:"What does COLREG Rule 23 on 'power vessels underway' specify?",opts:["A speed rule","Rule defining mandatory lights for underway power vessel: masthead + sidelights + stern — and variants by size","An anchor rule","A priority rule"],correct:1,expl:"COLREG Rule 23 = lights for power vessels underway. > 50m: 2 masthead lights + sidelights + stern. 12-50m: 1 masthead light + sidelights + stern. < 12m: reduced options. < 7m at low speed (< 7 knots): may be limited to all-round white light. Surfaced submarines: additional flashing yellow light."},
    {q:"What is an 'isophase' (Iso) light on a buoy or lighthouse?",opts:["A continuous light","Light where flash duration equals eclipse duration — example: Iso 4s = 2s on · 2s off","A quick flashing light","A danger light"],correct:1,expl:"Isophase light (Iso) = flash duration = extinction duration. E.g. Iso 4s = 2s on + 2s off = 4s period. Used notably on safe water marks (buoys) with Morse A. Comparison: Oc (occulting) = on > off · Fl (flashing) = off > on · Iso = equal · Q (quick) = more than 60 flashes/minute. These rhythms are shown on nautical charts."},
    {q:"What are the lights of a dredging vessel?",opts:["Normal lights of a stationary vessel","RAM lights (red-white-red) + additional lights indicating safe side and dangerous side of dredge","NUC lights","Fishing lights"],correct:1,expl:"Dredging vessel = RAM lights + additional specific signaling: OBSTRUCTED side = 2 vertical RED lights + underwater obstacle. CLEAR side = 2 vertical GREEN lights = passage possible. BY DAY: ball-diamond-ball (RAM) + red side (2 balls) + green side (2 cones). PRACTICAL RULE: pass on the side where you see GREEN lights — never on the side of red lights which signal the obstacle."},
    {q:"What does seeing ONLY a white light on the horizon at night mean?",opts:["A lighthouse","Either a vessel showing you its STERN (white stern light 135°) = moving away or you're overtaking · Or vessel at anchor · Or lighthouse","A NUC vessel","A fishing vessel"],correct:1,expl:"White light alone on horizon = several possible situations: 1. STERN of underway vessel (135°) = moving away or you're overtaking from behind. 2. Vessel AT ANCHOR (360°) = stationary. 3. Lighthouse (fixed or flashing). DIFFERENCE: stern light = small arc (135°) so disappears if you change course. Anchor = all-round, stays visible regardless of your course. IMPORTANT: if overtaking from behind = YOU must keep clear (COLREG Rule 13)."},
    {q:"What is a 'quick flash' (Q) light vs a 'flashing' (Fl) light?",opts:["They are identical","Q (Quick) = more than 60 flashes per minute · Fl (Flashing) = less than 30 flashes per minute — Q is faster and characterizes cardinal buoys","Q = 1 flash, Fl = 2 flashes","Q = white, Fl = red"],correct:1,expl:"Q (Quick) = 50-80 flashes per minute (usually 60). Very fast. Used on cardinal buoys. Fl (Flashing) = less than 30 flashes per minute. Slower. VQ (Very Quick) = 100-120 flashes per minute. LFl (Long Flash) = flash of at least 2 seconds. Combinations: Q(3) = 3 quick flashes = East cardinal · Q(6)+LFl = South cardinal. These codes are shown on nautical charts."},
  ],
  es:[
    {q:"¿Cuál es el alcance mínimo de las luces de costado (rojo/verde) de un buque de más de 50 metros?",opts:["1 milla","3 millas","6 millas","10 millas"],correct:1,expl:"COLREG Regla 22 - Alcance de las luces: Buque > 50m: luz de tope = 6 millas · luces de costado = 3 millas · luz de alcance = 3 millas · luces todo horizonte = 3 millas. Buque 12-50m: tope = 5 millas · costado = 2 millas. Buque < 12m: tope = 2 millas · costado = 1 milla · otras = 2 millas. Estos alcances son mínimos — no máximos."},
    {q:"¿Qué es una luz de 'todo horizonte' (all-round light)?",opts:["Una luz visible en 360°","Una luz visible en 225° únicamente","Una luz visible en 135°","Una luz centelleante"],correct:0,expl:"Luz todo horizonte = visible en 360° — en todas las direcciones horizontales. Se utiliza para: buques fondeados (blanca), NUC (roja x2), RAM (roja-blanca-roja), pesca (verde+blanca o 2 verdes), práctico (blanca+roja). Diferente de la luz de tope (225°) y la luz de alcance (135°). Navegando de noche, una luz blanca todo horizonte sin luces de costado = buque fondeado o a la deriva."},
    {q:"¿Qué luces muestran las 2 bolas negras de NUC de noche?",opts:["2 luces blancas todo horizonte","2 luces ROJAS todo horizonte (verticales)","2 luces rojas centelleantes","Roja + blanca"],correct:1,expl:"NUC (Not Under Command = buque sin gobierno): DE DÍA = 2 bolas negras. DE NOCHE = 2 luces ROJAS todo horizonte (360°) superpuestas verticalmente. Estas luces REEMPLAZAN las luces normales de navegación. Si el NUC está en ruta: muestra ADEMÁS sus luces de costado y de alcance. Si parado: solo luces rojas. PRIORIDAD ABSOLUTA: todos los demás buques deben apartarse de un NUC."},
    {q:"¿Cuál es la señal luminosa de un buque práctico en servicio?",opts:["Luz blanca todo horizonte","Luz blanca y roja todo horizonte alternadas o conjuntas · luces de costado si navega","Luz amarilla centelleante","Luz verde todo horizonte"],correct:1,expl:"Buque práctico en servicio = luz BLANCA y ROJA todo horizonte además de las luces normales. Blanca arriba y roja abajo (o combinada). Si navega: + luces costado + alcance. Si fondeado: + luz de fondeo. Prioridad: los buques prácticos deben ser evitados. DE DÍA: bandera 'H' (Hotel) del Código Internacional de Señales = bandera blanca y roja = práctico a bordo."},
    {q:"¿Qué es una luz 'de sectores' en un faro?",opts:["Una luz que centellea","Faro que emite diferentes colores o señales según el sector angular — guía al navegante hacia el canal seguro","Una luz marítima decorativa","Una luz de emergencia"],correct:1,expl:"Luz de sectores = faro que emite diferentes colores según el ángulo: sector blanco = canal seguro, sector rojo = peligro a babor del canal, sector verde = peligro a estribor del canal. El navegante debe permanecer en el sector BLANCO. Si la luz se vuelve roja: demasiado a la izquierda → corregir a estribor. Si verde: demasiado a la derecha → corregir a babor."},
    {q:"¿Qué luces muestra un submarino en superficie de noche?",opts:["Luces normales como un buque a motor","Luces de navegación normales + luz PARPADEANTE AMARILLA específica de submarinos","Solo luces rojas","Sin luces"],correct:1,expl:"Submarino en superficie = luces de navegación normales + luz PARPADEANTE AMARILLA específica de submarinos (COLREG Regla 23). Esta luz amarilla es una advertencia adicional. De noche, una luz amarilla parpadeante = SUBMARINO = extrema precaución. Nunca cruzar a menos de 200 metros de un submarino en superficie."},
    {q:"¿Qué es una 'luz de navegación combinada' para embarcaciones pequeñas?",opts:["Un faro portátil","Luz bicolor rojo/verde (para veleros < 20m) o tricolor rojo/verde/blanco que reemplaza 3 luces separadas","Una luz de emergencia","Una luz de pesca"],correct:1,expl:"Luz combinada para embarcaciones pequeñas: BICOLOR = rojo izquierda + verde derecha en una sola luz para veleros < 20m montada en la proa. TRICOLOR = rojo + verde + blanco en el tope del palo para veleros < 20m. El tricolor reemplaza las luces de costado Y la luz de alcance. VENTAJA: ahorro de energía eléctrica en pequeñas embarcaciones. NO puede usarse con motor (requiere luz de tope separada)."},
    {q:"¿Qué dice la Regla 5 del COLREG sobre la 'guardia visual y auditiva'?",opts:["Regla opcional","Obligación de mantener en todo momento una guardia apropiada — usando la vista · el oído · el radar — para evaluar la situación y el riesgo de abordaje","Una regla meteorológica","Una regla sobre anclas"],correct:1,expl:"COLREG Regla 5 (Guardia) = obligación fundamental de navegación. Todo buque debe en todo momento mantener una guardia apropiada mediante la vista, el oído y todos los medios disponibles. Objetivo: detectar a tiempo cualquier riesgo de abordaje. INCUMPLIMIENTO: ausencia del vigía = falta grave en caso de accidente. En el caso Doña Paz (1987), el Vector no tenía vigía designado."},
    {q:"¿Qué es la regla 'el rojo cede el paso al verde'?",opts:["Una regla de color de pintura","Regla de prioridad: un buque que ve la luz VERDE de otro por su babor es generalmente el buque PRIVILEGIADO — el que ve el ROJO debe ceder","Una regla de balizamiento","Una regla de fondeo"],correct:1,expl:"Regla simplificada de prioridad COLREG: 'El rojo cede al verde'. En cruce: el buque que ve rojo por su estribor = debe ceder (está a la derecha del otro = obligado a ceder). El buque que ve verde por su babor = es generalmente privilegiado. ATENCIÓN: esta regla no reemplaza las reglas COLREG completas."},
    {q:"¿Qué especifica la Regla 23 del COLREG sobre los 'buques de propulsión mecánica navegando'?",opts:["Una regla de velocidad","Regla que define las luces obligatorias de un buque a motor en ruta: tope + costado + alcance — y las variantes según el tamaño","Una regla de fondeo","Una regla de prioridad"],correct:1,expl:"COLREG Regla 23 = luces de buques de propulsión mecánica en ruta. > 50m: 2 luces de tope + costado + alcance. 12-50m: 1 luz de tope + costado + alcance. < 12m: opciones reducidas. < 7m a baja velocidad: puede limitarse a una luz blanca todo horizonte. Submarinos en superficie: luz adicional amarilla parpadeante."},
    {q:"¿Qué es una luz 'isofase' (Iso) en una baliza o faro?",opts:["Una luz continua","Luz cuya duración de destello e interrupción son IGUALES — ejemplo: Iso 4s = 2s encendido · 2s apagado","Una luz centelleante rápida","Una luz de peligro"],correct:1,expl:"Luz isofase (Iso) = duración de destello = duración de extinción. Ej.: Iso 4s = 2s encendido + 2s apagado = período 4s. Se usa en especial en las balizas de aguas seguras con Morse A. Comparación: Oc (ocultante) = encendido > apagado · Fl (destello) = apagado > encendido · Iso = igual · Q (centelleante) = más de 60 destellos/minuto."},
    {q:"¿Cuáles son las luces de un buque dragando (dredging)?",opts:["Luces normales de buque parado","Luces RAM (rojo-blanco-rojo) + luces adicionales indicando el lado seguro y el lado peligroso de la draga","Luces NUC","Luces de pesca"],correct:1,expl:"Buque draguero = luces RAM + señalización adicional específica: lado OBSTRUIDO = 2 luces ROJAS verticales + obstáculo submarino. Lado LIBRE = 2 luces VERDES verticales = paso posible. DE DÍA: bola-rombo-bola (RAM) + lado rojo (2 bolas) + lado verde (2 conos). REGLA PRÁCTICA: pasar por el lado donde ves las luces VERDES."},
    {q:"¿Qué significa ver ÚNICAMENTE una luz blanca en el horizonte de noche?",opts:["Un faro","O un buque te muestra su POPA (luz de alcance blanca 135°) = se aleja o lo estás alcanzando · O buque fondeado · O faro","Un buque NUC","Un buque pesquero"],correct:1,expl:"Luz blanca sola en el horizonte = varias situaciones posibles: 1. POPA de un buque en ruta (135°) = se aleja o lo alcanzas por detrás. 2. Buque FONDEADO (360°) = inmóvil. 3. Faro. DIFERENCIA: luz de alcance = arco pequeño (135°) por lo que desaparece si cambias de rumbo. Fondeo = todo horizonte, siempre visible. IMPORTANTE: si alcanzas un buque por detrás = DEBES apartarte (COLREG Regla 13)."},
    {q:"¿Qué es una luz 'centelleante' (Q) frente a una luz 'de destellos' (Fl)?",opts:["Son idénticas","Q (Quick) = más de 60 destellos por minuto · Fl (Flashing) = menos de 30 destellos por minuto — el Q es más rápido y caracteriza las balizas cardinales","Q = 1 destello, Fl = 2 destellos","Q = blanca, Fl = roja"],correct:1,expl:"Q (Quick/Centelleante) = 50-80 destellos por minuto (habitualmente 60). Muy rápido. Se usa en balizas cardinales. Fl (Flashing/Destellos) = menos de 30 destellos por minuto. Más lento. VQ (Very Quick/Ultrarrápido) = 100-120 destellos por minuto. LFl (Destello largo) = destello de al menos 2 segundos. Combinaciones: Q(3) = 3 centelleantes = cardinal Este · Q(6)+LFl = cardinal Sur."},
  ],
  pt:[
    {q:"Qual é o alcance mínimo das luzes laterais (vermelho/verde) de um navio de mais de 50 metros?",opts:["1 milha","3 milhas","6 milhas","10 milhas"],correct:1,expl:"COLREG Regra 22 - Alcance das luzes: Navio > 50m: luz de topo = 6 milhas · luzes laterais = 3 milhas · luz de popa = 3 milhas · luzes todo horizonte = 3 milhas. Navio 12-50m: topo = 5 milhas · laterais = 2 milhas. Navio < 12m: topo = 2 milhas · laterais = 1 milha · outras = 2 milhas. Estes alcances são mínimos — não máximos."},
    {q:"O que é uma luz de 'todo horizonte' (all-round light)?",opts:["Uma luz visível em 360°","Uma luz visível em 225° apenas","Uma luz visível em 135°","Uma luz cintilante"],correct:0,expl:"Luz todo horizonte = visível em 360° — em todas as direções horizontais. Usada para: navios fundeados (branca), NUC (vermelha x2), RAM (vermelha-branca-vermelha), pesca (verde+branca ou 2 verdes), prático (branca+vermelha). Diferente da luz de topo (225°) e da luz de popa (135°). Navegando de noite, uma luz branca todo horizonte sem luzes laterais = navio fundeado ou à deriva."},
    {q:"Que luzes mostram as 2 bolas pretas de NUC à noite?",opts:["2 luzes brancas todo horizonte","2 luzes VERMELHAS todo horizonte (verticais)","2 luzes vermelhas cintilantes","Vermelha + branca"],correct:1,expl:"NUC (Not Under Command = navio sem governo): DE DIA = 2 bolas pretas. DE NOITE = 2 luzes VERMELHAS todo horizonte (360°) sobrepostas verticalmente. Estas luzes SUBSTITUEM as luzes normais de navegação. Se o NUC estiver em rota: mostra TAMBÉM as suas luzes laterais e de popa. Se parado: apenas luzes vermelhas. PRIORIDADE ABSOLUTA: todos os outros navios devem afastar-se de um NUC."},
    {q:"Qual é o sinal luminoso de um navio de práticos em serviço?",opts:["Luz branca todo horizonte","Luz branca e vermelha todo horizonte alternadas ou conjuntas · luzes laterais se em rota","Luz amarela cintilante","Luz verde todo horizonte"],correct:1,expl:"Navio de práticos em serviço = luz BRANCA e VERMELHA todo horizonte além das luzes normais. Branca em cima e vermelha em baixo (ou combinada). Se em rota: + luzes laterais + popa. Se fundeado: + luz de fundeamento. Prioridade: os navios de práticos devem ser evitados. DE DIA: bandeira 'H' (Hotel) do Código Internacional de Sinais = bandeira branca e vermelha = prático a bordo."},
    {q:"O que é uma luz 'de setores' num farol?",opts:["Uma luz cintilante","Farol que emite diferentes cores ou sinais por setor angular — guia o navegador para o canal seguro","Uma luz marítima decorativa","Uma luz de emergência"],correct:1,expl:"Luz de setores = farol que emite diferentes cores por ângulo: setor branco = canal seguro, setor vermelho = perigo a bombordo do canal, setor verde = perigo a estibordo do canal. O navegador deve permanecer no setor BRANCO. Se a luz ficar vermelha: demasiado à esquerda → corrigir para estibordo. Se verde: demasiado à direita → corrigir para bombordo."},
    {q:"Que luzes mostra um submarino à superfície de noite?",opts:["Luzes normais como um navio a motor","Luzes de navegação normais + luz PISCANTE AMARELA específica de submarinos","Apenas luzes vermelhas","Sem luzes"],correct:1,expl:"Submarino à superfície = luzes de navegação normais + luz PISCANTE AMARELA específica de submarinos (COLREG Regra 23). Esta luz amarela é um aviso adicional. De noite, uma luz amarela piscante = SUBMARINO = extrema cautela. Nunca cruzar a menos de 200 metros de um submarino à superfície."},
    {q:"O que é uma 'luz de navegação combinada' para embarcações pequenas?",opts:["Um farol portátil","Luz bicolor vermelho/verde (para veleiros < 20m) ou tricolor vermelho/verde/branco substituindo 3 luzes separadas","Uma luz de emergência","Uma luz de pesca"],correct:1,expl:"Luz combinada para embarcações pequenas: BICOLOR = vermelho esquerda + verde direita numa única luz para veleiros < 20m montada na proa. TRICOLOR = vermelho + verde + branco no topo do mastro para veleiros < 20m. O tricolor substitui as luzes laterais E a luz de popa. VANTAGEM: poupança significativa de energia elétrica. NÃO pode ser usado com motor (requer luz de topo separada)."},
    {q:"O que diz a Regra 5 do COLREG sobre a 'vigia visual e auditiva'?",opts:["Regra opcional","Obrigação de manter a todo o momento uma vigia apropriada — usando a vista · o ouvido · o radar — para avaliar a situação e o risco de abalroamento","Uma regra meteorológica","Uma regra sobre ancoras"],correct:1,expl:"COLREG Regra 5 (Vigia) = obrigação fundamental de navegação. Todo o navio deve a todo o momento manter uma vigia adequada pela vista, ouvido e todos os meios disponíveis. Objetivo: detetar a tempo qualquer risco de abalroamento. INCUMPRIMENTO: ausência do vigia = falta grave em caso de acidente. No caso Doña Paz (1987), o Vector não tinha vigia designado."},
    {q:"O que é a regra 'o vermelho cede ao verde'?",opts:["Uma regra de cor de tinta","Regra de prioridade: um navio que vê a luz VERDE de outro no seu bombordo é geralmente o navio PRIVILEGIADO — o que vê o VERMELHO deve ceder","Uma regra de balizagem","Uma regra de fundeamento"],correct:1,expl:"Regra simplificada de prioridade COLREG: 'O vermelho cede ao verde'. Em cruzamento: o navio que vê vermelho ao seu estibordo = deve ceder (está à direita do outro = cedente). O navio que vê verde ao seu bombordo = é geralmente privilegiado. ATENÇÃO: esta regra não substitui as regras COLREG completas."},
    {q:"O que especifica a Regra 23 do COLREG sobre os 'navios a motor em rota'?",opts:["Uma regra de velocidade","Regra que define as luzes obrigatórias de um navio a motor em rota: topo + laterais + popa — e as variantes por tamanho","Uma regra de fundeamento","Uma regra de prioridade"],correct:1,expl:"COLREG Regra 23 = luzes de navios a motor em rota. > 50m: 2 luzes de topo + laterais + popa. 12-50m: 1 luz de topo + laterais + popa. < 12m: opções reduzidas. < 7m a baixa velocidade: pode limitar-se a uma luz branca todo horizonte. Submarinos à superfície: luz adicional amarela piscante."},
    {q:"O que é uma luz 'isofase' (Iso) numa boia ou farol?",opts:["Uma luz contínua","Luz cuja duração de clarão e extinção são IGUAIS — exemplo: Iso 4s = 2s acesa · 2s apagada","Uma luz cintilante rápida","Uma luz de perigo"],correct:1,expl:"Luz isofase (Iso) = duração do clarão = duração da extinção. Ex.: Iso 4s = 2s acesa + 2s apagada = período 4s. Usada nomeadamente nas boias de águas seguras com Morse A. Comparação: Oc (ocultante) = acesa > apagada · Fl (clarão) = apagada > acesa · Iso = igual · Q (cintilante) = mais de 60 clarões/minuto."},
    {q:"Quais são as luzes de um navio a dragar (dredging)?",opts:["Luzes normais de navio parado","Luzes RAM (vermelho-branco-vermelho) + luzes adicionais indicando o lado seguro e o lado perigoso da draga","Luzes NUC","Luzes de pesca"],correct:1,expl:"Navio a dragar = luzes RAM + sinalização adicional específica: lado OBSTRUÍDO = 2 luzes VERMELHAS verticais + obstáculo submerso. Lado LIVRE = 2 luzes VERDES verticais = passagem possível. DE DIA: bola-losango-bola (RAM) + lado vermelho (2 bolas) + lado verde (2 cones). REGRA PRÁTICA: passar pelo lado onde vê luzes VERDES."},
    {q:"O que significa ver APENAS uma luz branca no horizonte de noite?",opts:["Um farol","Ou um navio mostra-lhe a sua POPA (luz de popa branca 135°) = afasta-se ou está a ultrapassá-lo · Ou navio fundeado · Ou farol","Um navio NUC","Um navio de pesca"],correct:1,expl:"Luz branca só no horizonte = várias situações possíveis: 1. POPA de navio em rota (135°) = afasta-se ou está a ultrapassá-lo por trás. 2. Navio FUNDEADO (360°) = parado. 3. Farol. DIFERENÇA: luz de popa = arco pequeno (135°) por isso desaparece se mudar de rumo. Fundeado = todo horizonte, sempre visível. IMPORTANTE: se ultrapassar por trás = VOCÊ deve afastar-se (COLREG Regra 13)."},
    {q:"O que é uma luz 'cintilante' (Q) vs uma luz 'de clarões' (Fl)?",opts:["São idênticas","Q (Quick) = mais de 60 clarões por minuto · Fl (Flashing) = menos de 30 clarões por minuto — o Q é mais rápido e caracteriza as boias cardinais","Q = 1 clarão, Fl = 2 clarões","Q = branca, Fl = vermelha"],correct:1,expl:"Q (Quick/Cintilante) = 50-80 clarões por minuto (habitualmente 60). Muito rápido. Usado em boias cardinais. Fl (Flashing/Clarão) = menos de 30 clarões por minuto. Mais lento. VQ (Very Quick/Ultra-rápido) = 100-120 clarões por minuto. LFl (Clarão longo) = clarão de pelo menos 2 segundos. Combinações: Q(3) = 3 cintilantes = cardinal Este · Q(6)+LFl = cardinal Sul."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
  if(done)return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:20,color:C.white,margin:"8px 0 4px"}}>{score}/{questions.length}</div><div style={{fontSize:14,color:C.gold2}}>{Math.round(score/questions.length*100)}%</div></div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div><div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div></div>
    <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.fred},${C.fgrn},${C.gold2})`}}/></div>
    <div style={{fontSize:13,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:12}}>{q.q}</div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
      {q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}return<button key={i} onClick={()=>pick(i)} style={{padding:"10px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",lineHeight:1.4}}>{opt}</button>;})}
    </div>
    {answered&&<><div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
    <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.gold2})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
  </div>);
}

function Stars(){const s=Array.from({length:14},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return<div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return<div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.fred}44,${C.fgrn}44,transparent)`}}/>;}
function SL({icon,text,color}){return<div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

function QuizComp({questions,t,onComplete}){
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{display:"inline-block",marginTop:8,padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

const getContent = lang => {
  const d={
    fr:{
      badge:"🚢 Signalisation & Balisage · Leçon 2/7 · ⭐ Premium · 200 XP",
      title:"Feux & Formes de Navigation (COLREG)",
      intro:"De nuit en mer, les feux de navigation sont le langage universel des marins. Rouge à gauche, vert à droite — savoir les lire, c'est savoir qui est là et ce qu'il fait. Une erreur d'identification peut coûter des vies.\n\nCette leçon couvre les feux COLREG, leurs secteurs, les types de navires et les formes de jour.",
      p1:"PARTIE 1 — SECTEURS DES FEUX DE NAVIGATION",s1t:"225° tête de mât · 112,5° côtés · 135° poupe",
      s1:"FEUX DE NAVIGATION COLREG :\n\nFEU DE TÊTE DE MÂT (masthead)\nBlanc · 225° · 6 milles\nVisible de l'avant et des côtés\n\nFEU DE BÂBORD (port sidelight)\nRouge · 112,5° · 3 milles\nVisible depuis bâbord\n\nFEU DE TRIBORD (starboard sidelight)\nVert · 112,5° · 3 milles\nVisible depuis tribord\n\nFEU DE POUPE (stern)\nBlanc · 135° · 3 milles\nVisible depuis l'arrière\n\nTOTAL : 225 + 112,5 + 112,5 = 450° (superpositions)\n→ Couverture 360° avec feu de poupe",
      p2:"PARTIE 2 — FEUX PAR TYPE DE NAVIRE",s2t:"Moteur · Voilier · Mouillage · Remorqueur · Pêche",
      s2:"NAVIRE À MOTEUR : tête de mât + côtés + poupe\nVOILIER (voile seule) : côtés + poupe\n(si moteur = ajouter tête de mât + cône bas de jour)\nMOUILLAGE : 1-2 blancs tout horizon\nREMORQUEUR : 2-3 blancs + côtés + poupe JAUNE\nPÊCHE CHALUT : 2 verts tout horizon + côtés\nAUTRE PÊCHE : 1 vert + 1 blanc + côtés",
      p3:"PARTIE 3 — FORMES DE JOUR",s2t:"Boule · Cône · Losange · 2 cônes · Boule-losange-boule",
      s3:"FORMES DE JOUR (visibles uniquement le jour) :\n\nBOULE NOIRE → Mouillage (avant du navire)\n2 BOULES → NUC (avarie)\n\nCÔNE BAS → Voilier + moteur\n\nLOSANGE → Remorque > 200m\n\n2 CÔNES APEX → Chalutier\n\nBOULE-LOSANGE-BOULE → RAM\n(manœuvrabilité restreinte)",
      p4:"PARTIE 4 — IDENTIFICATION DES FEUX",s2t:"Quiz identification · 4 scénarios nocturnes",
      s4:"MÉTHODE D'IDENTIFICATION :\n1. Compter les feux de tête de mât\n   (0=voilier · 1=moteur normal · 2=grand navire · 2-3=remorqueur)\n2. Feux de côté rouge/vert = navire en route\n3. Feux tout horizon sans côtés = spécial (pêche/NUC/RAM/mouillage)\n4. Feu JAUNE en poupe = remorqueur\n\nDISTANCES ESTIMÉES :\nFeux visibles = navire proche\nCompter les feux = identifier type\nSurveiller les caps = évaluer risque",
      p5:"🎯 EXERCICES AVANCÉS PREMIUM",p6:"💥 CAS RÉEL — DOÑA PAZ",p7:"📝 BANQUE 15 QUESTIONS PREMIUM",
      sumT:"RÉSUMÉ — FEUX & FORMES L2",
      sumP:["Feu tête de mât : BLANC 225° · 6 milles · navires à moteur uniquement","Feux côtés : ROUGE bâbord 112,5° · VERT tribord 112,5° · 3 milles","Feu poupe : BLANC 135° · 3 milles · navire en route OU mouillage","Voilier voile seule = PAS de tête de mât · si moteur = tête de mât + cône bas","Remorque > 200m = 3 feux blancs verticaux + poupe JAUNE · < 200m = 2 feux","NUC de jour = 2 boules noires · de nuit = 2 rouges tout horizon","RAM = boule-losange-boule de jour · rouge-blanc-rouge de nuit","Doña Paz 1987 = feux absents → 4 000 morts · COLREG Règle 22 obligation légale"],
      learnedP:["4 feux de navigation : tête de mât · bâbord · tribord · poupe · secteurs","Feux par type : moteur · voilier · mouillage · remorqueur · pêche","Formes de jour : boule · cône · losange · 2 cônes","NUC et RAM : feux spéciaux · priorité absolue","Identification nocturne : 4 scénarios pratiques"],
    },
    en:{
      badge:"🚢 Signaling & Buoyage · Lesson 2/7 · ⭐ Premium · 200 XP",
      title:"Navigation Lights & Shapes (COLREG)",
      intro:"At night at sea, navigation lights are the universal language of mariners. Red on left, green on right — knowing how to read them means knowing who's there and what they're doing. A misidentification can cost lives.",
      p1:"PART 1 — NAVIGATION LIGHT SECTORS",s1t:"225° masthead · 112.5° sides · 135° stern",
      s1:"NAVIGATION LIGHTS COLREG:\n\nMASTHEAD LIGHT\nWhite · 225° · 6 miles\nVisible from ahead and sides\n\nPORT SIDELIGHT\nRed · 112.5° · 3 miles\nVisible from port side\n\nSTARBOARD SIDELIGHT\nGreen · 112.5° · 3 miles\nVisible from starboard\n\nSTERN LIGHT\nWhite · 135° · 3 miles\nVisible from astern\n\nTOTAL: 225 + 112.5 + 112.5 = 450° (overlaps)\n→ 360° coverage with stern light",
      p2:"PART 2 — LIGHTS BY VESSEL TYPE",s1t:"Motor · Sailing · Anchor · Tug · Fishing",
      s2:"POWER VESSEL: masthead + sidelights + stern\nSAILING (sail only): sidelights + stern\n(if engine = add masthead + downward cone by day)\nANCHOR: 1-2 all-round whites\nTUG: 2-3 whites + sidelights + YELLOW stern\nTRAWLING: 2 all-round greens + sidelights\nOTHER FISHING: 1 green + 1 white + sidelights",
      p3:"PART 3 — DAY SHAPES",s1t:"Ball · Cone · Diamond · 2 cones · Ball-diamond-ball",
      s3:"DAY SHAPES (visible only during daytime):\n\nBLACK BALL → Anchor (forward of vessel)\n2 BALLS → NUC (breakdown)\n\nCONE DOWN → Sailing + engine\n\nDIAMOND → Tow > 200m\n\n2 APEX CONES → Trawler\n\nBALL-DIAMOND-BALL → RAM\n(restricted maneuverability)",
      p4:"PART 4 — LIGHT IDENTIFICATION",s1t:"ID quiz · 4 night scenarios",
      s4:"IDENTIFICATION METHOD:\n1. Count masthead lights\n   (0=sailing · 1=normal power · 2=large vessel · 2-3=tug)\n2. Red/green sidelights = underway vessel\n3. All-round without sidelights = special (fishing/NUC/RAM/anchor)\n4. YELLOW stern light = tug\n\nESTIMATED DISTANCES:\nVisible lights = vessel nearby\nCount lights = identify type\nWatch courses = assess risk",
      p5:"🎯 ADVANCED PREMIUM EXERCISES",p6:"💥 REAL CASE — DOÑA PAZ",p7:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS",
      sumT:"SUMMARY — LIGHTS & SHAPES L2",
      sumP:["Masthead light: WHITE 225° · 6 miles · power vessels only","Sidelights: RED port 112.5° · GREEN stbd 112.5° · 3 miles","Stern light: WHITE 135° · 3 miles · underway OR anchor","Sailing vessel only = NO masthead · if engine = masthead + downward cone","Tow > 200m = 3 white vertical lights + YELLOW stern · < 200m = 2 lights","NUC day = 2 black balls · night = 2 all-round reds","RAM = ball-diamond-ball day · red-white-red night","Doña Paz 1987 = missing lights → 4,000 dead · COLREG Rule 22 legal obligation"],
      learnedP:["4 navigation lights: masthead · port · starboard · stern · sectors","Lights by type: power · sailing · anchor · tug · fishing","Day shapes: ball · cone · diamond · 2 cones","NUC and RAM: special lights · absolute priority","Night identification: 4 practical scenarios"],
    },
    es:{
      badge:"🚢 Señalización y Balizamiento · Lección 2/7 · ⭐ Premium · 200 XP",
      title:"Luces y Marcas de Navegación (COLREG)",
      intro:"De noche en el mar, las luces de navegación son el lenguaje universal de los marineros. Rojo a la izquierda, verde a la derecha — saber leerlas significa saber quién está ahí y qué hace. Un error de identificación puede costar vidas.",
      p1:"PARTE 1 — SECTORES DE LAS LUCES DE NAVEGACIÓN",s1t:"225° tope · 112,5° costados · 135° alcance",
      s1:"LUCES DE NAVEGACIÓN COLREG:\nLuz de TOPE: Blanca · 225° · 6 millas\nLuz de BABOR: Roja · 112,5° · 3 millas\nLuz de ESTRIBOR: Verde · 112,5° · 3 millas\nLuz de ALCANCE: Blanca · 135° · 3 millas",
      p2:"PARTE 2 — LUCES POR TIPO DE BUQUE",s1t:"Motor · Velero · Fondeo · Remolcador · Pesca",
      s2:"A MOTOR: tope + costados + alcance\nVELERO (solo vela): costados + alcance\nFONDEADO: 1-2 blancos todo horizonte\nREMOLCADOR: 2-3 blancos + costados + AMARILLO popa\nARRASTRE: 2 verdes todo horizonte + costados\nOTRA PESCA: 1 verde + 1 blanca + costados",
      p3:"PARTE 3 — SEÑALES DIURNAS",s1t:"Bola · Cono · Rombo · 2 conos · Bola-rombo-bola",
      s3:"SEÑALES DIURNAS:\nBOLA NEGRA → Fondeo (proel)\n2 BOLAS → NUC (avería)\nCONO ABAJO → Velero + motor\nROMBO → Remolque > 200m\n2 CONOS VÉRTICE → Arrastrero\nBOLA-ROMBO-BOLA → RAM",
      p4:"PARTE 4 — IDENTIFICACIÓN DE LUCES",s1t:"Quiz identificación · 4 escenarios nocturnos",
      s4:"MÉTODO DE IDENTIFICACIÓN:\n1. Contar luces de tope (0=velero · 1=motor · 2=grande · 2-3=remolcador)\n2. Rojo/verde costados = buque navegando\n3. Todo horizonte sin costados = especial\n4. AMARILLO en popa = remolcador",
      p5:"🎯 EJERCICIOS AVANZADOS PREMIUM",p6:"💥 CASO REAL — DOÑA PAZ",p7:"📝 BANCO 15 PREGUNTAS PREMIUM",
      sumT:"RESUMEN — LUCES Y MARCAS L2",
      sumP:["Luz de tope: BLANCA 225° · 6 millas · solo buques a motor","Luces costado: ROJA babor 112,5° · VERDE estribor 112,5° · 3 millas","Luz de alcance: BLANCA 135° · 3 millas · navegando O fondeado","Velero solo a vela = SIN tope · si motor = tope + cono abajo","Remolque > 200m = 3 luces blancas verticales + popa AMARILLA · < 200m = 2","NUC día = 2 bolas negras · noche = 2 rojas todo horizonte","RAM = bola-rombo-bola día · rojo-blanco-rojo noche","Doña Paz 1987 = luces ausentes → 4.000 muertos · COLREG Regla 22 obligación legal"],
      learnedP:["4 luces de navegación: tope · babor · estribor · alcance · sectores","Luces por tipo: motor · velero · fondeo · remolcador · pesca","Señales diurnas: bola · cono · rombo · 2 conos","NUC y RAM: luces especiales · prioridad absoluta","Identificación nocturna: 4 escenarios prácticos"],
    },
    pt:{
      badge:"🚢 Sinalização e Balizagem · Lição 2/7 · ⭐ Premium · 200 XP",
      title:"Luzes e Formas de Navegação (COLREG)",
      intro:"De noite no mar, as luzes de navegação são a linguagem universal dos marinheiros. Vermelho à esquerda, verde à direita — saber lê-las significa saber quem está lá e o que está a fazer. Um erro de identificação pode custar vidas.",
      p1:"PARTE 1 — SETORES DAS LUZES DE NAVEGAÇÃO",s1t:"225° topo · 112,5° costados · 135° popa",
      s1:"LUZES DE NAVEGAÇÃO COLREG:\nLuz de TOPO: Branca · 225° · 6 milhas\nLuz de BOMBORDO: Vermelha · 112,5° · 3 milhas\nLuz de ESTIBORDO: Verde · 112,5° · 3 milhas\nLuz de POPA: Branca · 135° · 3 milhas",
      p2:"PARTE 2 — LUZES POR TIPO DE NAVIO",s1t:"Motor · Veleiro · Fundeado · Rebocador · Pesca",
      s2:"A MOTOR: topo + laterais + popa\nVELEIRO (só vela): laterais + popa\nFUNDEADO: 1-2 brancos todo horizonte\nREBOCADOR: 2-3 brancos + laterais + AMARELO popa\nARRASTRO: 2 verdes todo horizonte + laterais\nOUTRA PESCA: 1 verde + 1 branca + laterais",
      p3:"PARTE 3 — FORMAS DIURNAS",s1t:"Bola · Cone · Losango · 2 cones · Bola-losango-bola",
      s3:"FORMAS DIURNAS:\nBOLA PRETA → Fundeado (vante)\n2 BOLAS → NUC (avaria)\nCONE BAIXO → Veleiro + motor\nLOSANGO → Reboque > 200m\n2 CONES VÉRTICE → Arrastrador\nBOLA-LOSANGO-BOLA → RAM",
      p4:"PARTE 4 — IDENTIFICAÇÃO DE LUZES",s1t:"Quiz identificação · 4 cenários noturnos",
      s4:"MÉTODO DE IDENTIFICAÇÃO:\n1. Contar luzes de topo (0=veleiro · 1=motor · 2=grande · 2-3=rebocador)\n2. Vermelho/verde laterais = navio em rota\n3. Todo horizonte sem laterais = especial\n4. AMARELO na popa = rebocador",
      p5:"🎯 EXERCÍCIOS AVANÇADOS PREMIUM",p6:"💥 CASO REAL — DOÑA PAZ",p7:"📝 BANCO 15 QUESTÕES PREMIUM",
      sumT:"RESUMO — LUZES E FORMAS L2",
      sumP:["Luz de topo: BRANCA 225° · 6 milhas · apenas navios a motor","Luzes laterais: VERMELHA bombordo 112,5° · VERDE estibordo 112,5° · 3 milhas","Luz de popa: BRANCA 135° · 3 milhas · em rota OU fundeado","Veleiro só à vela = SEM topo · se motor = topo + cone baixo","Reboque > 200m = 3 luzes brancas verticais + popa AMARELA · < 200m = 2","NUC dia = 2 bolas pretas · noite = 2 vermelhas todo horizonte","RAM = bola-losango-bola dia · vermelho-branco-vermelho noite","Doña Paz 1987 = luzes ausentes → 4.000 mortos · COLREG Regra 22 obrigação legal"],
      learnedP:["4 luzes de navegação: topo · bombordo · estibordo · popa · setores","Luzes por tipo: motor · veleiro · fundeado · rebocador · pesca","Formas diurnas: bola · cone · losango · 2 cones","NUC e RAM: luzes especiais · prioridade absoluta","Identificação noturna: 4 cenários práticos"],
    },
  };
  return d[lang]||d.fr;
};

export default function LessonLightsShapes({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t=T[lang]||T.fr;const quiz=QUIZ[lang]||QUIZ.fr;const lc=getContent(lang);
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);const [quizScore,setQuizScore]=useState(0);const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),80);},[]);
  const progress=phase==="content"?15:phase==="quiz"?70:100;
  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,#020814 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.blue2}22`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.blue2,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>🚢 {t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/7":lang==="en"?"Lesson 2/7":lang==="es"?"Lección 2/7":"Lição 2/7"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.fred},${C.fgrn},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>
            <SL icon="💡" text={lc.p1} color={C.fwht}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`,background:"rgba(0,5,16,0.6)"}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💡 {lang==="fr"?"SECTEURS DES FEUX — VUE DU DESSUS":lang==="en"?"LIGHT SECTORS — TOP VIEW":lang==="es"?"SECTORES DE LUCES — VISTA DESDE ARRIBA":"SETORES DE LUZES — VISTA DE CIMA"}</div>
              <VesselLightsSVG lang={lang}/>
            </Card>
            <SL icon="🚢" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚢 {lang==="fr"?"FEUX PAR TYPE DE NAVIRE":lang==="en"?"LIGHTS BY VESSEL TYPE":lang==="es"?"LUCES POR TIPO DE BUQUE":"LUZES POR TIPO DE NAVIO"}</div>
              <VesselTypeSVG lang={lang}/>
            </Card>
            <SL icon="⚫" text={lc.p3} color={C.steel}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid rgba(255,255,255,0.15)`}}>
              <div style={{fontSize:11,color:C.muted,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚫ {lang==="fr"?"FORMES DE JOUR — INTERACTIF":lang==="en"?"DAY SHAPES — INTERACTIVE":lang==="es"?"SEÑALES DIURNAS — INTERACTIVO":"SINAIS DIURNOS — INTERATIVO"}</div>
              <DayShapesSVG lang={lang}/>
            </Card>
            <SL icon="🔍" text={lc.p4} color={C.yellow}/>
            <Card style={{marginBottom:12}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid rgba(0,5,16,0.8)`,background:"rgba(0,5,16,0.7)"}}>
              <div style={{fontSize:11,color:C.yellow,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🔍 {lang==="fr"?"IDENTIFICATION DE FEUX — 4 SCÉNARIOS":lang==="en"?"LIGHT IDENTIFICATION — 4 SCENARIOS":lang==="es"?"IDENTIFICACIÓN LUCES — 4 ESCENARIOS":"IDENTIFICAÇÃO DE LUZES — 4 CENÁRIOS"}</div>
              <LightIDSVG lang={lang}/>
            </Card>
            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>
            <SL icon="💥" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>
            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>
            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.blue2,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.fred},${C.blue},${C.fgrn})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}
          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>Quiz — Feux & Formes COLREG</div>
              <div style={{fontSize:12,color:C.muted}}>5 questions · {lang==="fr"?"Leçon 2":lang==="en"?"Lesson 2":lang==="es"?"Lección 2":"Lição 2"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}
          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(26,111,212,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.blue2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>
            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.blue2,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>
            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — SIGNAUX SONORES →":lang==="en"?"LESSON 3 — SOUND SIGNALS →":lang==="es"?"LECCIÓN 3 — SEÑALES SONORAS →":"LIÇÃO 3 — SINAIS SONOROS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}
