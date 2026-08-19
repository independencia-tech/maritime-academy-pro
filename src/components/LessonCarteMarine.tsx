import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Navigation & Cartographie", lesson:"Leçon", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer", buoyClick:"Clique sur chaque bouée pour l'identifier", lhClick:"Clique sur chaque élément pour le déchiffrer", tssClick:"Clique sur les zones pour comprendre", bankTitle:"📝 BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM", exerciseTitle:"🎯 EXERCICE AVANCÉ — Lire un phare", caseTitle:"⚠️ CAS RÉEL D'ACCIDENT", },
  en:{ back:"◀ Back", module:"Navigation & Cartography", lesson:"Lesson", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide", buoyClick:"Click each buoy to identify it", lhClick:"Click each element to decode it", tssClick:"Click zones to understand", bankTitle:"📝 QUESTION BANK — 15 PREMIUM QUESTIONS", exerciseTitle:"🎯 ADVANCED EXERCISE — Read a lighthouse", caseTitle:"⚠️ REAL ACCIDENT CASE", },
  es:{ back:"◀ Volver", module:"Navegación & Cartografía", lesson:"Lección", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee el contenido y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar", buoyClick:"Haz clic en cada baliza", lhClick:"Haz clic en cada elemento", tssClick:"Haz clic en las zonas", bankTitle:"📝 BANCO DE PREGUNTAS — 15 PREGUNTAS PREMIUM", exerciseTitle:"🎯 EJERCICIO AVANZADO — Leer un faro", caseTitle:"⚠️ CASO REAL DE ACCIDENTE", },
  pt:{ back:"◀ Voltar", module:"Navegação & Cartografia", lesson:"Lição", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar", buoyClick:"Clique em cada boia para identificá-la", lhClick:"Clique em cada elemento para decifrá-lo", tssClick:"Clique nas zonas para entender", bankTitle:"📝 BANCO DE QUESTÕES — 15 QUESTÕES PREMIUM", exerciseTitle:"🎯 EXERCÍCIO AVANÇADO — Ler um farol", caseTitle:"⚠️ CASO REAL DE ACIDENTE", },
};

// ══════════════════════════════════════════
// LIGHTHOUSE SVG INTERACTIVE
// ══════════════════════════════════════════
function LighthouseSVG({ lang, t }) {
  const [sel, setSel] = useState(null);
  const elems = [
    { id:"fl",  x:8,   w:68, color:C.orange, label:"Fl(3)", info:{ fr:"Fl = Flash (éclat bref)\n(3) = groupés par 3\nSchéma: ⚡⚡⚡ ... pause ... ⚡⚡⚡", en:"Fl = Flash (brief flash)\n(3) = group of 3\nPattern: ⚡⚡⚡ ... pause ... ⚡⚡⚡", es:"Fl = Destello breve\n(3) = agrupados de 3\nEsquema: ⚡⚡⚡ ... pausa ...", pt:"Fl = Lampejo breve\n(3) = agrupados de 3\nEsquema: ⚡⚡⚡ ... pausa ..." }},
    { id:"col", x:82,  w:58, color:"#aaaaff", label:"W R G", info:{ fr:"W = Blanc (secteur sûr)\nR = Rouge (secteur danger — récifs!)\nG = Vert (secteur particulier)\n→ La couleur vue depuis le navire\n   indique votre zone de navigation", en:"W = White (safe sector)\nR = Red (danger — reefs!)\nG = Green (special sector)\n→ Color seen from vessel indicates\n   your navigation zone", es:"W = Blanco (sector seguro)\nR = Rojo (peligro — arrecifes!)\nG = Verde (sector especial)", pt:"W = Branco (setor seguro)\nR = Vermelho (perigo — recifes!)\nG = Verde (setor especial)" }},
    { id:"per", x:146, w:42, color:C.blue2,  label:"20s",   info:{ fr:"Période = 20 secondes\n= durée d'un cycle complet\n⚡⚡⚡ + pause = 20s", en:"Period = 20 seconds\n= full cycle duration\n⚡⚡⚡ + pause = 20s", es:"Período = 20 segundos\n= duración ciclo completo", pt:"Período = 20 segundos\n= duração ciclo completo" }},
    { id:"hgt", x:194, w:42, color:C.green,  label:"42m",   info:{ fr:"Hauteur = 42 mètres\nau-dessus du niveau de la mer\n→ Plus haut = visible plus loin", en:"Height = 42 meters\nabove sea level\n→ Higher = visible farther", es:"Altura = 42 metros\nsobre el nivel del mar", pt:"Altura = 42 metros\nacima do nível do mar" }},
    { id:"rng", x:242, w:42, color:C.gold,   label:"18M",   info:{ fr:"Portée = 18 milles nautiques\n(visibilité météo standard 10mn)\nValable de nuit", en:"Range = 18 nautical miles\n(standard met visibility 10nm)\nValid at night", es:"Alcance = 18 millas náuticas\n(visibilidad estándar 10mn)", pt:"Alcance = 18 milhas náuticas\n(visibilidade padrão 10mn)" }},
  ];
  const s = sel ? elems.find(e=>e.id===sel) : null;
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.45)",borderRadius:12,padding:"12px",marginBottom:12,textAlign:"center",border:`1px solid ${C.gold}44`}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:5}}>{lang==="fr"?"Déchiffrez ce phare — touchez chaque élément :":lang==="es"?"Descifre este faro:":lang==="pt"?"Decifre este farol:":"Decode this lighthouse — tap each element:"}</div>
        <div style={{fontSize:20,fontWeight:900,color:C.gold2,fontFamily:"monospace",letterSpacing:3}}>Fl(3) W R G 20s 42m 18M</div>
      </div>
      <svg width="290" height="48" viewBox="0 0 290 48">
        {elems.map(el=>(
          <g key={el.id} onClick={()=>setSel(sel===el.id?null:el.id)} style={{cursor:"pointer"}}>
            <rect x={el.x} y={4} width={el.w} height={26} rx={7} fill={sel===el.id?`${el.color}44`:`${el.color}18`} stroke={el.color} strokeWidth={sel===el.id?2:1}/>
            <text x={el.x+el.w/2} y={21} textAnchor="middle" fontSize="11" fontWeight="800" fill={el.color} fontFamily="monospace">{el.label}</text>
          </g>
        ))}
        <text x="145" y="43" textAnchor="middle" fontSize="7" fill={C.muted}>{t.lhClick}</text>
      </svg>
      {s&&<div style={{marginTop:8,padding:"12px 14px",borderRadius:12,background:`${s.color}15`,border:`1px solid ${s.color}44`,animation:"fadeUp 0.3s ease"}}><div style={{fontSize:13,fontWeight:700,color:s.color,fontFamily:"monospace",marginBottom:6}}>[{s.label}]</div><div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line"}}>{s.info[lang]||s.info.fr}</div></div>}
    </div>
  );
}

// ══════════════════════════════════════════
// BUOYS SVG INTERACTIVE
// ══════════════════════════════════════════
function BuoysSVG({ lang, t }) {
  const [sel, setSel] = useState(null);
  const buoys = [
    { id:"stbd", cx:38, color:"#00cc44", shape:"cone",
      label:{fr:"Tribord A",en:"Starboard A",es:"Estribor A",pt:"Estibordo A"},
      info:{fr:"🟢 TRIBORD — Système A\nForme: conique ▲ (pointue en haut)\nCouleur: VERTE · Feu: vert\n→ Laisser à TRIBORD (droite) en entrant\n→ Valable: Europe, Afrique, Asie, Australie\n⚠️ Système B (Amériques/Japon): Rouge à tribord!", en:"🟢 STARBOARD — System A\nShape: conical ▲\nColor: GREEN · Light: green\n→ Leave to STARBOARD entering\n→ Valid: Europe, Africa, Asia, Australia\n⚠️ System B (Americas/Japan): Red on starboard!", es:"🟢 ESTRIBOR — Sistema A\nForma: cónica ▲\nColor: VERDE · Luz: verde\n→ Dejar a ESTRIBOR al entrar\n→ Sistema B (Américas/Japón): ¡Rojo a estribor!", pt:"🟢 ESTIBORDO — Sistema A\nForma: cônica ▲\nCor: VERDE · Luz: verde\n→ Deixar a ESTIBORDO ao entrar\n→ Sistema B (Américas/Japão): Vermelho a estibordo!"}},
    { id:"port", cx:108, color:"#ee2222", shape:"cylinder",
      label:{fr:"Bâbord A",en:"Port A",es:"Babor A",pt:"Bombordo A"},
      info:{fr:"🔴 BÂBORD — Système A\nForme: cylindrique ▬ (plate en haut)\nCouleur: ROUGE · Feu: rouge\n→ Laisser à BÂBORD (gauche) en entrant\n→ Valable: Europe, Afrique, Asie, Australie\n⚠️ Système B (Amériques/Japon): Vert à bâbord!", en:"🔴 PORT — System A\nShape: cylindrical ▬\nColor: RED · Light: red\n→ Leave to PORT entering\n→ Valid: Europe, Africa, Asia, Australia\n⚠️ System B (Americas/Japan): Green on port!", es:"🔴 BABOR — Sistema A\nForma: cilíndrica ▬\nColor: ROJA · Luz: roja\n→ Dejar a BABOR al entrar\n⚠️ Sistema B (Américas/Japón): ¡Verde a babor!", pt:"🔴 BOMBORDO — Sistema A\nForma: cilíndrica ▬\nCor: VERMELHA · Luz: vermelha\n→ Deixar a BOMBORDO ao entrar\n⚠️ Sistema B (Américas/Japão): Verde a bombordo!"}},
    { id:"north", cx:178, color:C.gold2, shape:"north",
      label:{fr:"Cardinale N",en:"North Cardinal",es:"Cardinal N",pt:"Cardinal N"},
      info:{fr:"⬛🟡 CARDINALE NORD\nCouleur: NOIR sur JAUNE\nTête: 2 cônes POINTES EN HAUT ▲▲\nFeu: VQ ou Q (continu rapide)\n→ Passer au NORD de cette bouée\n→ Le danger est au SUD", en:"⬛🟡 NORTH CARDINAL\nColor: BLACK over YELLOW\nTopmark: 2 cones POINTS UP ▲▲\nLight: VQ or Q (continuous quick)\n→ Pass to the NORTH\n→ Danger to the SOUTH", es:"⬛🟡 CARDINAL NORTE\nColor: NEGRO sobre AMARILLO\nMarcas: ▲▲ puntas arriba\nLuz: VQ o Q\n→ Pasar al NORTE · Peligro al SUR", pt:"⬛🟡 CARDINAL NORTE\nCor: PRETO sobre AMARELO\nMarcas: ▲▲ pontas acima\nLuz: VQ ou Q\n→ Passar ao NORTE · Perigo ao SUL"}},
    { id:"south", cx:248, color:C.orange, shape:"south",
      label:{fr:"Cardinale S",en:"South Cardinal",es:"Cardinal S",pt:"Cardinal S"},
      info:{fr:"🟡⬛ CARDINALE SUD\nCouleur: JAUNE sur NOIR\nTête: 2 cônes POINTES EN BAS ▼▼\nFeu: Q(6)+LFl (6 éclats + 1 long)\n→ Passer au SUD de cette bouée\n→ Le danger est au NORD", en:"🟡⬛ SOUTH CARDINAL\nColor: YELLOW over BLACK\nTopmark: 2 cones POINTS DOWN ▼▼\nLight: Q(6)+LFl\n→ Pass to the SOUTH\n→ Danger to the NORTH", es:"🟡⬛ CARDINAL SUR\nColor: AMARILLO sobre NEGRO\nMarcas: ▼▼ puntas abajo\nLuz: Q(6)+DL\n→ Pasar al SUR · Peligro al NORTE", pt:"🟡⬛ CARDINAL SUL\nCor: AMARELO sobre PRETO\nMarcas: ▼▼ pontas abaixo\nLuz: Q(6)+LFl\n→ Passar ao SUL · Perigo ao NORTE"}},
  ];
  const s = sel ? buoys.find(b=>b.id===sel) : null;
  return (
    <div>
      <svg width="286" height="96" viewBox="0 0 286 96">
        <rect width="286" height="96" fill="#061020"/>
        {[20,40,60,80].map(y=><path key={y} d={`M0,${y} Q72,${y-4} 143,${y} Q215,${y+4} 286,${y}`} stroke="rgba(77,166,255,0.07)" strokeWidth="0.8" fill="none"/>)}
        {buoys.map(b=>{
          const isSel=sel===b.id;
          return <g key={b.id} onClick={()=>setSel(isSel?null:b.id)} style={{cursor:"pointer"}}>
            {isSel&&<circle cx={b.cx} cy={50} r={30} fill="none" stroke={C.gold} strokeWidth="1.5" strokeDasharray="4,2"/>}
            {b.shape==="cone"&&<polygon points={`${b.cx},22 ${b.cx-13},58 ${b.cx+13},58`} fill={b.color} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>}
            {b.shape==="cylinder"&&<rect x={b.cx-13} y={28} width={26} height={30} rx={5} fill={b.color} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>}
            {b.shape==="north"&&<><rect x={b.cx-7} y={38} width={14} height={24} rx={3} fill="#ffcc00"/><rect x={b.cx-13} y={20} width={26} height={20} rx={3} fill="#222222"/><polygon points={`${b.cx-8},18 ${b.cx},10 ${b.cx+8},18`} fill="#222222"/></>}
            {b.shape==="south"&&<><rect x={b.cx-7} y={38} width={14} height={24} rx={3} fill="#222222"/><rect x={b.cx-13} y={20} width={26} height={20} rx={3} fill="#ffcc00"/><polygon points={`${b.cx-8},63 ${b.cx},71 ${b.cx+8},63`} fill="#222222"/></>}
            <circle cx={b.cx} cy={18} r={4} fill={b.id==="north"||b.id==="south"?C.gold2:b.color} opacity={0.9}><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/></circle>
            <text x={b.cx} y={84} textAnchor="middle" fontSize="8" fill={C.white} fontWeight="600">{b.label[lang]||b.label.fr}</text>
          </g>;
        })}
      </svg>
      {!s&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:6}}>{t.buoyClick}</div>}
      {s&&<div style={{marginTop:8,padding:"12px 14px",borderRadius:12,background:`${s.color}15`,border:`1px solid ${s.color}44`,animation:"fadeUp 0.3s ease"}}><div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:6}}>{s.label[lang]||s.label.fr}</div><div style={{fontSize:12,color:C.white,lineHeight:1.75,whiteSpace:"pre-line"}}>{s.info[lang]||s.info.fr}</div></div>}
    </div>
  );
}

// ══════════════════════════════════════════
// TSS SVG INTERACTIVE
// ══════════════════════════════════════════
function TSS_SVG({ lang, t }) {
  const [sel, setSel] = useState(null);
  const zones = [
    { id:"lane1", y:10, h:50, color:C.blue2,
      label:{fr:"Voie 1 → (direction EST)",en:"Lane 1 → (eastbound)",es:"Vía 1 → (hacia Este)",pt:"Via 1 → (direção Leste)"},
      info:{fr:"Voie de circulation direction EST\n✅ Naviguer dans le sens →\n❌ Interdit de faire demi-tour\n→ Entrer/sortir aux extrémités si possible",en:"Eastbound lane\n✅ Navigate in direction →\n❌ No U-turns\n→ Enter/exit at ends if possible",es:"Vía tráfico hacia el Este\n✅ Navegar en sentido →\n❌ Prohibido dar media vuelta",pt:"Via tráfego direção Leste\n✅ Navegar no sentido →\n❌ Proibido dar meia-volta"}},
    { id:"sep", y:63, h:20, color:C.orange,
      label:{fr:"Zone de séparation ⛔",en:"Separation zone ⛔",es:"Zona de separación ⛔",pt:"Zona de separação ⛔"},
      info:{fr:"Zone de séparation\n⛔ INTERDITE sauf urgence absolue\n⛔ Pas de mouillage ni de pêche\n→ Visible sur carte par hachures",en:"Separation zone\n⛔ FORBIDDEN except emergency\n⛔ No anchoring or fishing\n→ Shown by hatching on chart",es:"Zona de separación\n⛔ PROHIBIDA excepto urgencia\n⛔ Sin fondeo ni pesca",pt:"Zona de separação\n⛔ PROIBIDA exceto emergência\n⛔ Sem ancoragem nem pesca"}},
    { id:"lane2", y:86, h:50, color:C.teal,
      label:{fr:"Voie 2 ← (direction OUEST)",en:"Lane 2 ← (westbound)",es:"Vía 2 ← (hacia Oeste)",pt:"Via 2 ← (direção Oeste)"},
      info:{fr:"Voie de circulation direction OUEST\n✅ Naviguer dans le sens ←\nSi traversée: ANGLE DROIT du TSS\n→ Vitesse max pour traverser vite",en:"Westbound lane\n✅ Navigate in direction ←\nIf crossing: RIGHT ANGLE to TSS\n→ Maximum speed to cross quickly",es:"Vía tráfico hacia el Oeste\n✅ Navegar en sentido ←\nSi cruce: ÁNGULO RECTO al DST",pt:"Via tráfego direção Oeste\n✅ Navegar no sentido ←\nSe cruzar: ÂNGULO RETO ao DST"}},
  ];
  const s = sel ? zones.find(z=>z.id===sel) : null;
  return (
    <div>
      <svg width="290" height="145" viewBox="0 0 290 145">
        <rect width="290" height="145" fill="#061020"/>
        {[15,35,55,70,90,110,130].map(y=><line key={y} x1="0" y1={y} x2="290" y2={y} stroke="rgba(77,166,255,0.05)" strokeWidth="0.8"/>)}
        {zones.map(z=>(
          <g key={z.id} onClick={()=>setSel(sel===z.id?null:z.id)} style={{cursor:"pointer"}}>
            <rect x={5} y={z.y} width={280} height={z.h} fill={sel===z.id?`${z.color}40`:`${z.color}18`} stroke={z.color} strokeWidth={sel===z.id?2:0.8} strokeDasharray={z.id==="sep"?"6,3":""}/>
            <text x={145} y={z.y+z.h/2+4} textAnchor="middle" fontSize="8" fill={z.color} fontWeight="700">{z.label[lang]||z.label.fr}</text>
          </g>
        ))}
        {[45,100,155,210].map(x=><polygon key={x} points={`${x},30 ${x+12},40 ${x},50`} fill={C.blue2} opacity="0.8"/>)}
        {[245,190,135,80].map(x=><polygon key={x} points={`${x},102 ${x-12},112 ${x},122`} fill={C.teal} opacity="0.8"/>)}
        <line x1="268" y1="138" x2="268" y2="8" stroke={C.gold2} strokeWidth="1.5" strokeDasharray="5,3"/>
        <polygon points="263,12 268,3 273,12" fill={C.gold2}/>
        <text x="280" y="75" fontSize="7" fill={C.gold2} textAnchor="middle" transform="rotate(90,280,75)">90°</text>
        <text x="145" y="142" textAnchor="middle" fontSize="7" fill={C.muted}>{t.tssClick}</text>
      </svg>
      {s&&<div style={{marginTop:8,padding:"12px 14px",borderRadius:12,background:`${s.color}15`,border:`1px solid ${s.color}44`,animation:"fadeUp 0.3s ease"}}><div style={{fontSize:12,fontWeight:700,color:s.color,marginBottom:6}}>{s.label[lang]||s.label.fr}</div><div style={{fontSize:11,color:C.white,lineHeight:1.65,whiteSpace:"pre-line"}}>{s.info[lang]||s.info.fr}</div></div>}
    </div>
  );
}

// ══════════════════════════════════════════
// CHART SYMBOLS
// ══════════════════════════════════════════
function ChartSymbols({ lang }) {
  const syms = [
    {s:"S",c:C.gold2,l:{fr:"Sable",en:"Sand",es:"Arena",pt:"Areia"},u:{fr:"✅ Bon mouillage",en:"✅ Good anchorage",es:"✅ Buen fondeo",pt:"✅ Bom fundeio"}},
    {s:"R",c:C.red,l:{fr:"Roche",en:"Rock",es:"Roca",pt:"Rocha"},u:{fr:"❌ Ne pas mouiller",en:"❌ Do not anchor",es:"❌ No fondear",pt:"❌ Não ancorar"}},
    {s:"M",c:C.teal,l:{fr:"Vase",en:"Mud",es:"Fango",pt:"Lodo"},u:{fr:"✅ Bon mouillage",en:"✅ Good anchorage",es:"✅ Buen fondeo",pt:"✅ Bom fundeio"}},
    {s:"G",c:C.orange,l:{fr:"Gravier",en:"Gravel",es:"Grava",pt:"Cascalho"},u:{fr:"⚠️ Moyen",en:"⚠️ Average",es:"⚠️ Regular",pt:"⚠️ Regular"}},
    {s:"Co",c:C.purple,l:{fr:"Corail",en:"Coral",es:"Coral",pt:"Coral"},u:{fr:"❌ Récifs dangereux",en:"❌ Dangerous reefs",es:"❌ Arrecifes peligrosos",pt:"❌ Recifes perigosos"}},
    {s:"Wd",c:C.green,l:{fr:"Herbier",en:"Weed",es:"Algas",pt:"Algas"},u:{fr:"⚠️ Possible",en:"⚠️ Possible",es:"⚠️ Posible",pt:"⚠️ Possível"}},
  ];
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
    {syms.map((s,i)=><div key={i} style={{padding:"10px 8px",borderRadius:12,textAlign:"center",background:`${s.c}15`,border:`1px solid ${s.c}33`}}>
      <div style={{fontFamily:"monospace",fontSize:15,fontWeight:800,color:s.c,marginBottom:3}}>{s.s}</div>
      <div style={{fontSize:10,color:C.white,fontWeight:600,marginBottom:3}}>{s.l[lang]||s.l.fr}</div>
      <div style={{fontSize:9,color:C.muted}}>{s.u[lang]||s.u.fr}</div>
    </div>)}
  </div>;
}

// ══════════════════════════════════════════
// EXERCISE — Read a lighthouse
// ══════════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"3",q2:"20",q3:"18",q4:{fr:"oui",en:"yes",es:"sí",pt:"sim"},q5:"42"};
  const qs = {
    fr:[{id:"q1",q:"Combien d'éclats dans chaque groupe ?"},{id:"q2",q:"Quelle est la période en secondes ?"},{id:"q3",q:"Quelle est la portée nominale en milles nautiques ?"},{id:"q4",q:"Le feu a-t-il des secteurs colorés ? (oui/non)"},{id:"q5",q:"Quelle est la hauteur du feu en mètres ?"}],
    en:[{id:"q1",q:"How many flashes in each group?"},{id:"q2",q:"What is the period in seconds?"},{id:"q3",q:"What is the nominal range in nautical miles?"},{id:"q4",q:"Does the light have colored sectors? (yes/no)"},{id:"q5",q:"What is the light height in meters?"}],
    es:[{id:"q1",q:"¿Cuántos destellos en cada grupo?"},{id:"q2",q:"¿Cuál es el período en segundos?"},{id:"q3",q:"¿Cuál es el alcance nominal en millas náuticas?"},{id:"q4",q:"¿Tiene la luz sectores de color? (sí/no)"},{id:"q5",q:"¿A qué altura está la luz en metros?"}],
    pt:[{id:"q1",q:"Quantos lampejos em cada grupo?"},{id:"q2",q:"Qual é o período em segundos?"},{id:"q3",q:"Qual é o alcance nominal em milhas náuticas?"},{id:"q4",q:"A luz tem setores coloridos? (sim/não)"},{id:"q5",q:"Qual é a altura da luz em metros?"}],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => {
    const v = val.trim().toLowerCase();
    if(id==="q4") return v===(correct.q4[lang]||"oui");
    return v===correct[id];
  };
  return (
    <div>
      <div style={{background:"rgba(0,0,0,0.45)",borderRadius:12,padding:"12px",marginBottom:14,textAlign:"center",border:`1px solid ${C.gold}44`}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:5}}>{lang==="fr"?"Analysez ce phare:":lang==="es"?"Analice este faro:":lang==="pt"?"Analise este farol:":"Analyze this lighthouse:"}</div>
        <div style={{fontSize:20,fontWeight:900,color:C.gold2,fontFamily:"monospace",letterSpacing:3}}>Fl(3) W R G 20s 42m 18M</div>
      </div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:12}}>
          <div style={{fontSize:13,color:C.white,marginBottom:6,lineHeight:1.4,fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))}
            style={{width:"100%",padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.07)",
              border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,
              color:C.white,fontSize:13,fontFamily:"'Nunito',sans-serif",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>
            {chk(q.id,ans[q.id])?"✓":`✗ → ${q.id==="q4"?(correct.q4[lang]||"oui"):correct[q.id]}`}
          </div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",letterSpacing:1}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════
// ACCIDENT CASE
// ══════════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"MV Wakashio — Catastrophe à Maurice (2020)",teaser:"Vraquier 300 000t · 1 000t de fuel · Cause : mauvaise lecture de carte",vessel:"MV Wakashio — Vraquier japonais — 300 000 DWT",date:"25 juillet 2020 · Pointe d'Esny, Maurice",what:"Le navire s'échoue sur les récifs de Pointe d'Esny. Le mazout se déverse massivement, causant l'une des pires catastrophes environnementales de l'histoire de Maurice.",cause:"• Capitaine et OOW voulaient capter le WiFi des hôtels pour appeler leurs familles\n• Aucune vérification des dangers sur la carte avant de modifier la route\n• Les récifs de Pointe d'Esny sont clairement indiqués sur TOUTES les cartes\n• Absence de surveillance radar régulière\n• Ambiance festive sur la passerelle (anniversaire du capitaine)",lessons:"✓ Toujours vérifier les dangers sur la carte AVANT de changer de route\n✓ Les récifs côtiers ne sont pas visibles de nuit\n✓ Les bouées et amers côtiers existent pour prévenir ces situations\n✓ La vigilance en passerelle est une obligation permanente\n✓ Aucun intérêt personnel ne justifie de compromettre la sécurité",link:"🔗 Lien direct avec la Leçon 4 : savoir lire les dangers sur une carte marine (récifs, hauts-fonds, TSS) aurait évité cette catastrophe."},
    en:{title:"MV Wakashio — Mauritius Disaster (2020)",teaser:"300,000t bulk carrier · 1,000t fuel spilled · Cause: poor chart reading",vessel:"MV Wakashio — Japanese bulk carrier — 300,000 DWT",date:"25 July 2020 · Pointe d'Esny, Mauritius",what:"The vessel runs aground on the Pointe d'Esny reef. Fuel oil spills massively, causing one of Mauritius' worst environmental disasters.",cause:"• Captain and OOW wanted to catch hotel WiFi to call their families\n• No chart check before altering course toward the coast\n• Pointe d'Esny reefs clearly marked on ALL charts\n• No regular radar monitoring\n• Festive atmosphere on bridge (captain's birthday)",lessons:"✓ Always check chart dangers BEFORE altering course\n✓ Coastal reefs not visible at night\n✓ Buoys and coastal landmarks exist to prevent such situations\n✓ Bridge vigilance is a permanent obligation\n✓ No personal interest justifies compromising safety",link:"🔗 Direct link to Lesson 4: knowing how to read chart dangers (reefs, shoals, TSS) would have prevented this disaster."},
    es:{title:"MV Wakashio — Catástrofe en Mauricio (2020)",teaser:"Granelero 300.000t · 1.000t combustible · Causa: mala lectura de carta",vessel:"MV Wakashio — Granelero japonés — 300.000 DWT",date:"25 julio 2020 · Pointe d'Esny, Mauricio",what:"El buque encalla en los arrecifes de Pointe d'Esny. El combustible se derrama masivamente.",cause:"• Capitán y OOW querían captar WiFi de hoteles para llamar a sus familias\n• Sin verificación de peligros en la carta antes de cambiar el rumbo\n• Arrecifes de Pointe d'Esny claramente indicados en TODAS las cartas\n• Sin vigilancia regular de radar",lessons:"✓ Siempre verificar peligros en carta ANTES de cambiar rumbo\n✓ Arrecifes costeros no visibles de noche\n✓ Vigilancia en puente = obligación permanente\n✓ Ningún interés personal justifica comprometer la seguridad",link:"🔗 Vínculo directo con la Lección 4: saber leer los peligros en una carta náutica habría evitado esta catástrofe."},
    pt:{title:"MV Wakashio — Catástrofe em Maurício (2020)",teaser:"Graneleiro 300.000t · 1.000t combustível · Causa: má leitura de carta",vessel:"MV Wakashio — Graneleiro japonês — 300.000 DWT",date:"25 julho 2020 · Pointe d'Esny, Maurício",what:"O navio encalha nos recifes de Pointe d'Esny. O combustível derrama maciçamente, causando um desastre ambiental histórico.",cause:"• Capitão e OOW queriam apanhar WiFi de hotéis para ligar às famílias\n• Sem verificação de perigos na carta antes de alterar o rumo\n• Recifes de Pointe d'Esny claramente marcados em TODAS as cartas\n• Sem monitorização regular de radar",lessons:"✓ Sempre verificar perigos na carta ANTES de alterar o rumo\n✓ Recifes costeiros não visíveis à noite\n✓ Vigilância na ponte = obrigação permanente\n✓ Nenhum interesse pessoal justifica comprometer a segurança",link:"🔗 Vínculo direto com a Lição 4: saber ler os perigos numa carta náutica teria evitado esta catástrofe."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>⚠️</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:16,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          <span style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",color:C.muted}}>🚢 {c.vessel}</span>
          <span style={{fontSize:10,padding:"3px 8px",borderRadius:8,background:"rgba(255,255,255,0.06)",color:C.muted}}>📅 {c.date}</span>
        </div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:12}}>{c.what}</div>
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{lang==="fr"?"CAUSES":lang==="pt"?"CAUSAS":"CAUSES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:12}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{lang==="fr"?"LEÇONS APPRISES":lang==="en"?"LESSONS LEARNED":lang==="es"?"LECCIONES APRENDIDAS":"LIÇÕES APRENDIDAS"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:12}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}


// ══════════════════════════════════════════
// QUIZ — 5 QUESTIONS (4 langues)
// ══════════════════════════════════════════
const QUIZ = {
  fr:[
    { q:"Sur une carte marine, que signifie la description 'Fl(3) W R G 15s 42m 18M' ?",
      opts:["Feu fixe, 3 éclats par seconde, portée 20 km","Éclats groupés par 3 · période 15s · portée 18 milles nautiques","Feu occulté 3 fois toutes les 15 minutes · hauteur 42m","Feu isophase 3 secteurs · visible à 15 milles"],
      correct:1, expl:"Fl=Flash(éclat bref) · (3)=groupés par 3 · 15s=période totale · 42m=hauteur · 18M=portée 18 milles nautiques. La hauteur (42m) et la portée (18M) sont toujours en fin de description."},
    { q:"Système AISM A (Europe, Afrique, Asie) : quelle bouée se place à tribord en entrant au port ?",
      opts:["Bouée rouge cylindrique","Bouée verte conique","Bouée jaune sphérique","Bouée noire à bandes horizontales"],
      correct:1, expl:"Système A : TRIBORD=VERT(conique ▲). BÂBORD=ROUGE. Moyen mémo : 'Tribord=Vert comme GO'. ATTENTION : Système B (Amériques/Japon) c'est l'inverse — 'Red Right Returning' — rouge à tribord en entrant !"},
    { q:"Qu'est-ce qu'un TSS et sous quelle règle COLREG est-il obligatoire ?",
      opts:["Système de bouées cardinales — Rule 5","Dispositif de séparation du trafic (autoroute en mer) — Rule 10","Système de surveillance radar côtier — Rule 7","Zone de mouillage réservée — Rule 9"],
      correct:1, expl:"TSS=Traffic Separation Scheme (Dispositif de Séparation du Trafic). Obligatoire sous COLREG Rule 10. Naviguer dans le sens du trafic, traverser à angle droit si nécessaire. Exemples : Manche, Détroit de Malacca."},
    { q:"Une bouée cardinale NORD indique :",
      opts:["Qu'il y a un danger au nord de la bouée","Qu'il faut passer au NORD de la bouée — le danger est au SUD","Qu'il faut passer au sud de la bouée","Que la profondeur au nord est insuffisante"],
      correct:1, expl:"Cardinal NORD : passer au NORD. Le danger (récif, épave) est au SUD de la bouée. Couleur : NOIR sur JAUNE. Têtes : 2 cônes POINTES EN HAUT ▲▲. Feu : VQ ou Q (continu rapide). Moyen mémo : Nord=Nuit noir au sommet."},
    { q:"Sur une carte, les symboles 'S', 'R', 'M' près des profondeurs indiquent :",
      opts:["Le système de projection cartographique","La nature du fond (sable, roche, vase) — essentiel pour le mouillage","La source du sondage hydrographique","La précision de la mesure de profondeur"],
      correct:1, expl:"S=Sable(✅ bon mouillage) · R=Roche(❌ ne pas mouiller) · M=Vase(✅ bon mouillage) · G=Gravier(⚠️) · Co=Corail(❌ récifs). Essentiel pour choisir un mouillage sûr — l'ancre ne tient pas sur la roche !"},
  ],
  en:[
    { q:"On a nautical chart, what does 'Fl(3) W R G 15s 42m 18M' mean?",
      opts:["Fixed light, 3 flashes/sec, range 20km","Group flashing 3 · period 15s · range 18 nautical miles","Occulting 3 times every 15 minutes · height 42m","Isophase 3 sectors · visible at 15 miles"],
      correct:1, expl:"Fl=Flash · (3)=group of 3 · 15s=total period · 42m=height · 18M=nominal range 18nm. Height (42m) and range (18M) always come at the end of the description."},
    { q:"IALA System A (Europe, Africa, Asia): which buoy goes to starboard entering port?",
      opts:["Red cylindrical buoy","Green conical buoy","Yellow spherical buoy","Black horizontally banded buoy"],
      correct:1, expl:"System A: STARBOARD=GREEN(conical ▲). PORT=RED. Memory: 'Starboard=Green like GO'. CAUTION: System B (Americas/Japan) is opposite — 'Red Right Returning' — red on starboard entering!"},
    { q:"What is a TSS and under which COLREG rule is it mandatory?",
      opts:["Cardinal buoy system — Rule 5","Traffic separation scheme (highway at sea) — Rule 10","Coastal radar surveillance system — Rule 7","Reserved anchorage zone — Rule 9"],
      correct:1, expl:"TSS=Traffic Separation Scheme. Mandatory under COLREG Rule 10. Navigate in traffic direction, cross at right angle if necessary. Examples: English Channel, Strait of Malacca."},
    { q:"A NORTH cardinal buoy indicates:",
      opts:["There is danger to the north of the buoy","Pass to the NORTH of the buoy — danger is to the SOUTH","Pass to the south of the buoy","Depth to the north is insufficient"],
      correct:1, expl:"North cardinal: pass to the NORTH. Danger (reef, wreck) is to the SOUTH. Color: BLACK over YELLOW. Topmark: 2 cones POINTS UP ▲▲. Light: VQ or Q (quick continuous)."},
    { q:"On a chart, symbols 'S', 'R', 'M' near depths indicate:",
      opts:["Cartographic projection system","Seabed nature (sand, rock, mud) — essential for anchoring","Hydrographic sounding source","Depth measurement precision"],
      correct:1, expl:"S=Sand(✅ good anchorage) · R=Rock(❌ do not anchor) · M=Mud(✅ good) · G=Gravel(⚠️) · Co=Coral(❌ reefs). Essential for choosing a safe anchorage — anchor doesn't hold on rock!"},
  ],
  es:[
    { q:"En una carta náutica, ¿qué significa 'Fl(3) W R G 15s 42m 18M'?",
      opts:["Luz fija, 3 destellos/seg, alcance 20km","Destellos agrupados de 3 · período 15s · alcance 18 millas náuticas","Ocultante 3 veces cada 15 min · altura 42m","Isofásica 3 sectores · visible a 15 millas"],
      correct:1, expl:"Fl=Destello · (3)=agrupados de 3 · 15s=período total · 42m=altura · 18M=alcance nominal 18mn. La altura (42m) y el alcance (18M) siempre aparecen al final de la descripción."},
    { q:"Sistema IALA A (Europa, África, Asia): ¿qué baliza se coloca a estribor al entrar al puerto?",
      opts:["Baliza roja cilíndrica","Baliza verde cónica","Baliza amarilla esférica","Baliza negra con bandas horizontales"],
      correct:1, expl:"Sistema A: ESTRIBOR=VERDE(cónica ▲). BABOR=ROJA. ATENCIÓN: Sistema B (Américas/Japón) es lo contrario — 'Red Right Returning' — rojo a estribor al entrar."},
    { q:"¿Qué es un DST y bajo qué regla COLREG es obligatorio?",
      opts:["Sistema de balizas cardinales — Regla 5","Dispositivo de separación del tráfico (autopista en el mar) — Regla 10","Sistema de vigilancia radar costero — Regla 7","Zona de fondeo reservada — Regla 9"],
      correct:1, expl:"DST=Dispositivo de Separación del Tráfico. Obligatorio bajo COLREG Regla 10. Navegar en el sentido del tráfico, cruzar en ángulo recto si es necesario."},
    { q:"Una baliza cardinal NORTE indica:",
      opts:["Hay peligro al norte de la baliza","Pasar al NORTE de la baliza — el peligro está al SUR","Pasar al sur de la baliza","Profundidad insuficiente al norte"],
      correct:1, expl:"Cardinal Norte: pasar al NORTE. Peligro al SUR. Color: NEGRO sobre AMARILLO. Marcas: ▲▲ puntas arriba. Luz: VQ o Q (rápido continuo)."},
    { q:"En una carta, los símbolos 'S', 'R', 'M' cerca de las sondas indican:",
      opts:["Sistema de proyección cartográfica","Naturaleza del fondo (arena, roca, fango) — esencial para el fondeo","Fuente del sondeo hidrográfico","Precisión de la medición de profundidad"],
      correct:1, expl:"S=Arena(✅ buen fondeo) · R=Roca(❌ no fondear) · M=Fango(✅ bueno) · G=Grava(⚠️) · Co=Coral(❌ arrecifes). Esencial para elegir un fondeo seguro."},
  ],
  pt:[
    { q:"Numa carta náutica, o que significa 'Fl(3) W R G 15s 42m 18M'?",
      opts:["Luz fixa, 3 lampejos/seg, alcance 20km","Lampejos agrupados de 3 · período 15s · alcance 18 milhas náuticas","Ocultante 3 vezes a cada 15 min · altura 42m","Isofásica 3 setores · visível a 15 milhas"],
      correct:1, expl:"Fl=Lampejo · (3)=agrupados de 3 · 15s=período total · 42m=altura · 18M=alcance nominal 18mn. A altura (42m) e o alcance (18M) aparecem sempre no final da descrição."},
    { q:"Sistema IALA A (Europa, África, Ásia): qual boia fica a estibordo ao entrar no porto?",
      opts:["Boia vermelha cilíndrica","Boia verde cônica","Boia amarela esférica","Boia preta com faixas horizontais"],
      correct:1, expl:"Sistema A: ESTIBORDO=VERDE(cônica ▲). BOMBORDO=VERMELHA. ATENÇÃO: Sistema B (Américas/Japão) é o oposto — 'Red Right Returning' — vermelho a estibordo ao entrar."},
    { q:"O que é um DST e sob qual regra COLREG é obrigatório?",
      opts:["Sistema de boias cardinais — Regra 5","Dispositivo de separação do tráfego (autoestrada no mar) — Regra 10","Sistema de vigilância radar costeiro — Regra 7","Zona de ancoragem reservada — Regra 9"],
      correct:1, expl:"DST=Dispositivo de Separação do Tráfego. Obrigatório pela Regra 10 do COLREG. Navegar no sentido do tráfego, cruzar em ângulo reto se necessário."},
    { q:"Uma boia cardinal NORTE indica:",
      opts:["Há perigo ao norte da boia","Passar ao NORTE da boia — o perigo está ao SUL","Passar ao sul da boia","Profundidade insuficiente ao norte"],
      correct:1, expl:"Cardinal Norte: passar ao NORTE. Perigo ao SUL. Cor: PRETO sobre AMARELO. Marcas: ▲▲ pontas acima. Luz: VQ ou Q (rápido contínuo)."},
    { q:"Numa carta, os símbolos 'S', 'R', 'M' perto das sondagens indicam:",
      opts:["Sistema de projeção cartográfica","Natureza do fundo (areia, rocha, lodo) — essencial para ancoragem","Fonte da sondagem hidrográfica","Precisão da medição de profundidade"],
      correct:1, expl:"S=Areia(✅ boa ancoragem) · R=Rocha(❌ não ancorar) · M=Lodo(✅ boa) · G=Cascalho(⚠️) · Co=Coral(❌ recifes). Essencial para escolher uma ancoragem segura."},
  ],
};

// ══════════════════════════════════════════
// BANQUE 15 QUESTIONS PREMIUM
// ══════════════════════════════════════════
const BANK = {
  fr:[
  { q:"Qu'est-ce que la projection Mercator et quel est son principal avantage pour la navigation ?", opts:["Conserve les surfaces — utile pour calculer les distances exactes","Conserve les angles → routes loxodromiques = lignes droites sur la carte","Projection polaire — utilisée pour les hautes latitudes","Projection utilisée uniquement pour les grandes échelles"], correct:1, expl:"Mercator conserve les ANGLES. Une route à cap constant (loxodromie) est une ligne droite sur une carte Mercator → tracer une route = simple ligne droite. Inconvénient : les surfaces sont déformées vers les pôles." },
  { q:"Quelle est la différence entre une grande et une petite échelle cartographique ?", opts:["Grande échelle = carte plus grande physiquement","Grande échelle (1:50 000) = plus détaillée (côtière) · Petite échelle (1:500 000) = vue d'ensemble (hauturière)","Petite échelle = plus précise pour la navigation côtière","Les deux termes désignent la même chose"], correct:1, expl:"1:50 000 = grande échelle = 1 cm sur la carte = 500m réels → navigation côtière, ports. 1:500 000 = petite échelle = 1cm = 5km → navigation hauturière. Plus le dénominateur est grand → plus petite est l'échelle et moins il y a de détails." },
  { q:"Que signifie le datum 'LAT' sur une carte marine ?", opts:["Local Area Time — heure locale du lieu","Lowest Astronomical Tide — Plus Basses Eaux Astronomiques — référence des profondeurs","Latitude Average Temperature — température moyenne","Light Approach Track — route d'approche recommandée"], correct:1, expl:"LAT = Lowest Astronomical Tide (Plus Basses Eaux Astronomiques). Les profondeurs sur les cartes marines sont mesurées par rapport à ce niveau. La profondeur réelle est donc toujours ≥ à celle indiquée sur la carte — sécurité pour la navigation." },
  { q:"Couleur bleue claire sur une carte marine — que signifie-t-elle ?", opts:["Eaux profondes et sûres — navigables en toute sécurité","Faibles profondeurs (<5m) — potentiellement dangereuses pour les grands navires","Zone de mouillage recommandée","Zone de courant fort"], correct:1, expl:"Sur les cartes marines : Blanc = eaux profondes (navigables). Bleu clair = faibles profondeurs (<5m). Beige/Jaune = terres émergées. Vert = zone intertidale. Le bleu clair est un signal d'alerte pour les navires à fort tirant d'eau." },
  { q:"Feu maritime 'Oc(2)' — qu'est-ce que cela signifie ?", opts:["2 éclats très rapides — feu de type Quick Flash","Feu occultant groupé par 2 — allumé plus longtemps qu'éteint, avec 2 occultations","2 secteurs fixes — blanc et rouge","Feu isophase en 2 temps"], correct:1, expl:"Oc = Occulting (Occultant) : le feu est allumé plus longtemps qu'éteint. (2) = groupé par 2 occultations. Opposé de Fl (Flash où le feu est allumé moins longtemps qu'éteint). Iso = Isophase (allumé = éteint)." },
  { q:"Bouées cardinales EST et OUEST — comment les distinguer ?", opts:["EST = rouge, OUEST = verte","EST ⬛🟡⬛ (noir-jaune-noir) · feu Q(3) · OUEST 🟡⬛🟡 (jaune-noir-jaune) · feu Q(9)","EST = conique, OUEST = cylindrique","EST et OUEST ont la même couleur — seule la tête de mât différencie"], correct:1, expl:"EST : noir-jaune-noir (sandwich) · têtes : 2 cônes pointes OPPOSÉES ◇ · feu Q(3) — 3 éclats (3h sur l'horloge). OUEST : jaune-noir-jaune · têtes : 2 cônes pointes OPPOSÉES ◇ · feu Q(9) — 9 éclats (9h sur l'horloge)." },
  { q:"Qu'est-ce qu'un amer et comment l'utiliser en navigation ?", opts:["Bouée cardinale de type Nord","Point fixe remarquable identifiable depuis la mer (phare, tour, clocher...) — utilisé pour les relèvements","Ligne de sonde indiquant une profondeur constante","Feu de navigation rouge visible à longue distance"], correct:1, expl:"Amer = point fixe à terre remarquable et identifiable depuis la mer. En prenant le relèvement magnétique d'un amer, on trace une droite de position sur la carte. Avec 2 relèvements sur 2 amers différents, on obtient un point de position précis (intersection)." },
  { q:"Le symbole PA sur une carte marine signifie :", opts:["Point d'ancrage recommandé — mouillage officiel sécurisé","Position Approximative — à utiliser avec prudence","Profondeur artificielle — chenal dragué et entretenu","Port accessible — entrée possible par tous les temps"], correct:1, expl:"PA = Position Approximative. Cet élément (épave, roche, bouée) n'a pas été localisé avec précision. Exercer une prudence particulière dans ce secteur. Autres abréviations : ED = Existence Douteuse · Rep = Reportée." },
  { q:"Comment calculer un point de position par deux relèvements ?", opts:["Mesurer la distance à deux bouées avec le radar","Prendre le relèvement magnétique de 2 amers différents et tracer les deux droites sur la carte — l'intersection est la position","Calculer la latitude et la longitude par triangulation GPS","Comparer le cap vrai et le cap compas de deux navires voisins"], correct:1, expl:"Point par relèvements : 1) Prendre le relèvement (angle depuis le nord) de l'amer A → tracer une droite sur la carte. 2) Idem pour l'amer B. 3) L'intersection des deux droites = position du navire. Plus l'angle entre les deux droites est proche de 90°, plus le point est précis." },
  { q:"Qu'est-ce que la navigation à l'estime (Dead Reckoning) ?", opts:["Navigation guidée par les étoiles avec un sextant","Calcul de la position estimée : D = V × T depuis la dernière position connue","Navigation uniquement par radar sans visibilité","Méthode de navigation utilisant les bouées cardinales comme points de passage"], correct:1, expl:"Navigation à l'estime (Dead Reckoning/DR) : D = V × T. Position estimée = dernière position connue + cap suivi + vitesse × temps écoulé. C'est la méthode de secours si le GPS tombe en panne. Plus le temps écoulé est long, plus l'erreur d'estime s'accumule." },
  { q:"Quelle est l'obligation COLREG Rule 10 concernant le TSS ?", opts:["Naviguer dans le sens contraire du trafic pour plus de sécurité","Naviguer dans le sens du trafic · Traverser à angle droit · Zone de séparation interdite · Entrer/sortir aux extrémités","Utiliser obligatoirement le pilote automatique dans un TSS","Réduire la vitesse à 10 nœuds dans toute zone de séparation"], correct:1, expl:"Rule 10 (COLREG) : Naviguer dans le sens général du trafic. Traverser perpendiculairement (90°) si nécessaire. Ne pas naviguer dans la zone de séparation. Entrer/sortir aux extrémités si possible. Les navires de pêche, à voile et <20m peuvent utiliser les zones côtières." },
  { q:"Qu'est-ce qu'une épave 'dangereuse' sur une carte marine ?", opts:["Toute épave visible en surface","Épave avec profondeur insuffisante présentant un danger pour la navigation — symbolisée avec la profondeur","Épave récente non encore cartographiée","Épave uniquement dangereuse pour les plongeurs"], correct:1, expl:"Épave dangereuse = épave peu couverte d'eau présentant un risque pour la navigation. La profondeur au-dessus de l'épave est indiquée sur la carte. Épave non dangereuse = profondeur suffisante. ED (Existence Douteuse) = existence de l'épave non confirmée." },
  { q:"Le SHOM, l'UKHO et la NOAA sont :", opts:["Des systèmes de navigation par satellite","Des services hydrographiques nationaux qui publient les cartes marines officielles","Des organisations de formation maritime internationale","Des systèmes de communication de détresse maritime"], correct:1, expl:"SHOM = Service Hydrographique et Océanographique de la Marine (France). UKHO = United Kingdom Hydrographic Office. NOAA = National Oceanic and Atmospheric Administration (USA). Ces organismes publient les cartes marines officielles, les annuaires des marées et les instructions nautiques de leurs zones." },
  { q:"Que signifie la couleur verte sur une carte marine (zone terrestre côtière) ?", opts:["Eaux profondes et sûres","Zone intertidale (alternativement couverte et découverte par la marée)","Zone militaire interdite à la navigation","Zone de pêche réglementée"], correct:1, expl:"Vert sur une carte marine = zone intertidale = zone qui est alternativement couverte d'eau (marée haute) et découverte (marée basse). Cette zone est navigable à marée haute mais dangereuse à marée basse. À vérifier avec les annuaires des marées !" },
  { q:"Sur une carte Mercator, où doit-on TOUJOURS mesurer les distances en milles nautiques ?", opts:["Sur l'échelle de longitude en bas de la carte","Sur l'échelle de latitude sur les côtés — 1 minute = 1 mille nautique — à la latitude du point mesuré","Sur une échelle spéciale indiquée en bas à gauche","Sur l'échelle de longitude ou latitude indifféremment"], correct:1, expl:"Sur une carte Mercator, TOUJOURS mesurer sur l'échelle de LATITUDE (côtés verticaux) à la latitude du point mesuré, car 1 minute de latitude = 1 mille nautique. Ne jamais utiliser l'échelle de longitude — elle varie avec la latitude sur une carte Mercator." },
  ],
  en:[
  { q:"What is the Mercator projection and what is its main advantage for navigation?", opts:["Preserves surfaces — useful for calculating exact distances","Preserves angles → rhumb lines = straight lines on the chart","Polar projection — used for high latitudes","Projection used only for large scales"], correct:1, expl:"Mercator preserves ANGLES. A constant-heading route (rhumb line) is a straight line on a Mercator chart → plotting a route = simple straight line. Drawback: surfaces are distorted toward the poles." },
  { q:"What is the difference between a large and a small cartographic scale?", opts:["Large scale = physically bigger chart","Large scale (1:50,000) = more detailed (coastal) · Small scale (1:500,000) = overview (offshore)","Small scale = more precise for coastal navigation","Both terms mean the same thing"], correct:1, expl:"1:50,000 = large scale = 1 cm on chart = 500m real → coastal navigation, ports. 1:500,000 = small scale = 1cm = 5km → offshore navigation. The larger the denominator, the smaller the scale and the less detail there is." },
  { q:"What does the 'LAT' datum mean on a nautical chart?", opts:["Local Area Time — local time of the place","Lowest Astronomical Tide — reference for depths","Latitude Average Temperature — average temperature","Light Approach Track — recommended approach route"], correct:1, expl:"LAT = Lowest Astronomical Tide. Depths on nautical charts are measured relative to this level. Actual depth is therefore always ≥ the charted depth — a safety margin for navigation." },
  { q:"Light blue color on a nautical chart — what does it mean?", opts:["Deep, safe waters — navigable safely","Shallow depths (<5m) — potentially dangerous for large vessels","Recommended anchoring zone","Strong current zone"], correct:1, expl:"On nautical charts: White = deep water (navigable). Light blue = shallow depths (<5m). Beige/Yellow = land. Green = intertidal zone. Light blue is a warning signal for deep-draft vessels." },
  { q:"Maritime light 'Oc(2)' — what does this mean?", opts:["2 very rapid flashes — Quick Flash type light","Occulting light grouped by 2 — lit longer than dark, with 2 occultations","2 fixed sectors — white and red","2-phase isophase light"], correct:1, expl:"Oc = Occulting: the light is lit longer than it is dark. (2) = grouped by 2 occultations. Opposite of Fl (Flash, where the light is lit shorter than dark). Iso = Isophase (lit = dark)." },
  { q:"EAST and WEST cardinal buoys — how to distinguish them?", opts:["EAST = red, WEST = green","EAST ⬛🟡⬛ (black-yellow-black) · Q(3) light · WEST 🟡⬛🟡 (yellow-black-yellow) · Q(9) light","EAST = conical, WEST = cylindrical","EAST and WEST are the same color — only the topmark differs"], correct:1, expl:"EAST: black-yellow-black (sandwich) · topmarks: 2 cones points OPPOSITE ◇ · Q(3) light — 3 flashes (3 o'clock on the clock). WEST: yellow-black-yellow · topmarks: 2 cones points OPPOSITE ◇ · Q(9) light — 9 flashes (9 o'clock on the clock)." },
  { q:"What is a landmark and how is it used in navigation?", opts:["A North-type cardinal buoy","A fixed, identifiable feature visible from the sea (lighthouse, tower, church...) — used for bearings","A depth contour line indicating constant depth","A red navigation light visible at long range"], correct:1, expl:"A landmark is a fixed, identifiable feature ashore visible from the sea. By taking the magnetic bearing of a landmark, a position line is drawn on the chart. With 2 bearings on 2 different landmarks, a precise position fix (intersection) is obtained." },
  { q:"The symbol PA on a nautical chart means:", opts:["Recommended anchoring point — official secure mooring","Position Approximate — to be used with caution","Artificial depth — dredged and maintained channel","Accessible port — entry possible in all weather"], correct:1, expl:"PA = Position Approximate. This feature (wreck, rock, buoy) has not been precisely located. Exercise particular caution in this area. Other abbreviations: ED = Existence Doubtful · Rep = Reported." },
  { q:"How is a position fix calculated using two bearings?", opts:["Measure the distance to two buoys with radar","Take the magnetic bearing of 2 different landmarks and plot both lines on the chart — the intersection is the position","Calculate latitude and longitude by GPS triangulation","Compare the true heading and compass heading of two nearby vessels"], correct:1, expl:"Position fix by bearings: 1) Take the bearing (angle from north) of landmark A → plot a line on the chart. 2) Same for landmark B. 3) The intersection of both lines = the vessel's position. The closer the angle between the two lines is to 90°, the more precise the fix." },
  { q:"What is Dead Reckoning navigation?", opts:["Navigation guided by stars with a sextant","Calculating estimated position: D = V × T from the last known position","Navigation solely by radar with no visibility","A navigation method using cardinal buoys as waypoints"], correct:1, expl:"Dead Reckoning (DR): D = V × T. Estimated position = last known position + heading followed + speed × elapsed time. This is the backup method if GPS fails. The longer the elapsed time, the more the DR error accumulates." },
  { q:"What is the COLREG Rule 10 obligation regarding TSS?", opts:["Navigate against the flow of traffic for greater safety","Navigate with the flow of traffic · Cross at right angles · Separation zone prohibited · Enter/leave at the ends","Mandatory use of autopilot within a TSS","Reduce speed to 10 knots in any separation zone"], correct:1, expl:"Rule 10 (COLREG): Navigate in the general direction of traffic flow. Cross at right angles (90°) if necessary. Do not navigate in the separation zone. Enter/leave at the ends if possible. Fishing vessels, sailing vessels and vessels <20m may use coastal zones." },
  { q:"What is a 'dangerous' wreck on a nautical chart?", opts:["Any wreck visible on the surface","A wreck with insufficient depth posing a hazard to navigation — shown with its depth","A recent wreck not yet charted","A wreck dangerous only to divers"], correct:1, expl:"Dangerous wreck = a wreck with little water cover posing a navigation risk. The depth above the wreck is shown on the chart. Non-dangerous wreck = sufficient depth. ED (Existence Doubtful) = wreck's existence unconfirmed." },
  { q:"SHOM, UKHO and NOAA are:", opts:["Satellite navigation systems","National hydrographic services that publish official nautical charts","International maritime training organizations","Maritime distress communication systems"], correct:1, expl:"SHOM = French Hydrographic and Oceanographic Service. UKHO = United Kingdom Hydrographic Office. NOAA = National Oceanic and Atmospheric Administration (USA). These bodies publish official nautical charts, tide tables and sailing directions for their areas." },
  { q:"What does the green color mean on a nautical chart (coastal land area)?", opts:["Deep, safe waters","Intertidal zone (alternately covered and uncovered by the tide)","Military zone closed to navigation","Regulated fishing zone"], correct:1, expl:"Green on a nautical chart = intertidal zone = an area alternately covered with water (high tide) and exposed (low tide). This zone is navigable at high tide but dangerous at low tide. Check the tide tables!" },
  { q:"On a Mercator chart, where should distances in nautical miles ALWAYS be measured?", opts:["On the longitude scale at the bottom of the chart","On the latitude scale on the sides — 1 minute = 1 nautical mile — at the latitude of the point measured","On a special scale shown in the bottom left","On the longitude or latitude scale, either works"], correct:1, expl:"On a Mercator chart, ALWAYS measure on the LATITUDE scale (vertical sides) at the latitude of the point being measured, since 1 minute of latitude = 1 nautical mile. Never use the longitude scale — it varies with latitude on a Mercator chart." },
  ],
  es:[
  { q:"¿Qué es la proyección Mercator y cuál es su principal ventaja para la navegación?", opts:["Conserva las superficies — útil para calcular distancias exactas","Conserva los ángulos → las loxodrómicas son líneas rectas en la carta","Proyección polar — usada para altas latitudes","Proyección usada solo para grandes escalas"], correct:1, expl:"Mercator conserva los ÁNGULOS. Una ruta de rumbo constante (loxodrómica) es una línea recta en una carta Mercator → trazar una ruta = simple línea recta. Inconveniente: las superficies se deforman hacia los polos." },
  { q:"¿Cuál es la diferencia entre una gran y una pequeña escala cartográfica?", opts:["Gran escala = carta físicamente más grande","Gran escala (1:50.000) = más detallada (costera) · Pequeña escala (1:500.000) = vista general (altura)","Pequeña escala = más precisa para navegación costera","Ambos términos significan lo mismo"], correct:1, expl:"1:50.000 = gran escala = 1 cm en la carta = 500m reales → navegación costera, puertos. 1:500.000 = pequeña escala = 1cm = 5km → navegación de altura. Cuanto mayor el denominador, menor la escala y menos detalle hay." },
  { q:"¿Qué significa el datum 'LAT' en una carta náutica?", opts:["Local Area Time — hora local del lugar","Lowest Astronomical Tide — referencia de las profundidades","Latitude Average Temperature — temperatura media","Light Approach Track — ruta de aproximación recomendada"], correct:1, expl:"LAT = Lowest Astronomical Tide (Bajamar Astronómica más baja). Las profundidades en las cartas náuticas se miden respecto a este nivel. La profundidad real es siempre ≥ a la indicada en la carta — seguridad para la navegación." },
  { q:"Color azul claro en una carta náutica — ¿qué significa?", opts:["Aguas profundas y seguras — navegables con total seguridad","Profundidades bajas (<5m) — potencialmente peligrosas para grandes buques","Zona de fondeo recomendada","Zona de corriente fuerte"], correct:1, expl:"En las cartas náuticas: Blanco = aguas profundas (navegables). Azul claro = profundidades bajas (<5m). Beige/Amarillo = tierra emergida. Verde = zona entre mareas. El azul claro es una señal de alerta para buques de gran calado." },
  { q:"Luz marítima 'Oc(2)' — ¿qué significa?", opts:["2 destellos muy rápidos — luz tipo Quick Flash","Luz de ocultaciones agrupadas por 2 — encendida más tiempo que apagada, con 2 ocultaciones","2 sectores fijos — blanco y rojo","Luz isofase en 2 tiempos"], correct:1, expl:"Oc = Occulting (Ocultación): la luz está encendida más tiempo del que está apagada. (2) = agrupada por 2 ocultaciones. Opuesto de Fl (Destello, donde la luz está encendida menos tiempo que apagada). Iso = Isofase (encendida = apagada)." },
  { q:"Boyas cardinales ESTE y OESTE — ¿cómo distinguirlas?", opts:["ESTE = roja, OESTE = verde","ESTE ⬛🟡⬛ (negro-amarillo-negro) · luz Q(3) · OESTE 🟡⬛🟡 (amarillo-negro-amarillo) · luz Q(9)","ESTE = cónica, OESTE = cilíndrica","ESTE y OESTE tienen el mismo color — solo la marca de tope las diferencia"], correct:1, expl:"ESTE: negro-amarillo-negro (sándwich) · marcas de tope: 2 conos con puntas OPUESTAS ◇ · luz Q(3) — 3 destellos (3h en el reloj). OESTE: amarillo-negro-amarillo · marcas de tope: 2 conos con puntas OPUESTAS ◇ · luz Q(9) — 9 destellos (9h en el reloj)." },
  { q:"¿Qué es una marca terrestre (amer) y cómo se usa en navegación?", opts:["Una boya cardinal de tipo Norte","Punto fijo destacado identificable desde el mar (faro, torre, campanario...) — usado para marcaciones","Línea de sonda que indica una profundidad constante","Luz de navegación roja visible a larga distancia"], correct:1, expl:"Una marca terrestre es un punto fijo destacado en tierra, identificable desde el mar. Tomando la marcación magnética de una marca, se traza una recta de posición en la carta. Con 2 marcaciones sobre 2 marcas diferentes, se obtiene un punto de posición preciso (intersección)." },
  { q:"El símbolo PA en una carta náutica significa:", opts:["Punto de anclaje recomendado — fondeo oficial seguro","Posición Aproximada — usar con precaución","Profundidad artificial — canal dragado y mantenido","Puerto accesible — entrada posible con cualquier clima"], correct:1, expl:"PA = Posición Aproximada. Este elemento (naufragio, roca, boya) no ha sido localizado con precisión. Ejercer especial precaución en esta zona. Otras abreviaturas: ED = Existencia Dudosa · Rep = Reportada." },
  { q:"¿Cómo se calcula un punto de posición mediante dos marcaciones?", opts:["Medir la distancia a dos boyas con el radar","Tomar la marcación magnética de 2 marcas diferentes y trazar ambas rectas en la carta — la intersección es la posición","Calcular la latitud y longitud por triangulación GPS","Comparar el rumbo verdadero y el rumbo de aguja de dos buques cercanos"], correct:1, expl:"Punto por marcaciones: 1) Tomar la marcación (ángulo desde el norte) de la marca A → trazar una recta en la carta. 2) Igual para la marca B. 3) La intersección de ambas rectas = posición del buque. Cuanto más cercano a 90° el ángulo entre ambas rectas, más preciso el punto." },
  { q:"¿Qué es la navegación de estima (Dead Reckoning)?", opts:["Navegación guiada por las estrellas con un sextante","Cálculo de la posición estimada: D = V × T desde la última posición conocida","Navegación únicamente por radar sin visibilidad","Método de navegación que usa boyas cardinales como puntos de paso"], correct:1, expl:"Navegación de estima (Dead Reckoning/DR): D = V × T. Posición estimada = última posición conocida + rumbo seguido + velocidad × tiempo transcurrido. Es el método de respaldo si falla el GPS. Cuanto más tiempo transcurre, más se acumula el error de estima." },
  { q:"¿Cuál es la obligación de la Regla 10 del COLREG sobre el TSS?", opts:["Navegar en sentido contrario al tráfico para mayor seguridad","Navegar en el sentido del tráfico · Cruzar en ángulo recto · Zona de separación prohibida · Entrar/salir por los extremos","Usar obligatoriamente el piloto automático en un TSS","Reducir la velocidad a 10 nudos en toda zona de separación"], correct:1, expl:"Regla 10 (COLREG): Navegar en el sentido general del tráfico. Cruzar perpendicularmente (90°) si es necesario. No navegar en la zona de separación. Entrar/salir por los extremos si es posible. Los buques de pesca, vela y <20m pueden usar las zonas costeras." },
  { q:"¿Qué es un naufragio 'peligroso' en una carta náutica?", opts:["Cualquier naufragio visible en superficie","Naufragio con profundidad insuficiente que presenta un peligro para la navegación — señalado con la profundidad","Naufragio reciente aún no cartografiado","Naufragio peligroso solo para buceadores"], correct:1, expl:"Naufragio peligroso = naufragio poco cubierto de agua que presenta un riesgo para la navegación. La profundidad sobre el naufragio se indica en la carta. Naufragio no peligroso = profundidad suficiente. ED (Existencia Dudosa) = existencia del naufragio no confirmada." },
  { q:"El SHOM, la UKHO y la NOAA son:", opts:["Sistemas de navegación por satélite","Servicios hidrográficos nacionales que publican las cartas náuticas oficiales","Organizaciones de formación marítima internacional","Sistemas de comunicación de socorro marítimo"], correct:1, expl:"SHOM = Servicio Hidrográfico y Oceanográfico de la Marina (Francia). UKHO = United Kingdom Hydrographic Office. NOAA = National Oceanic and Atmospheric Administration (EE.UU.). Estos organismos publican las cartas náuticas oficiales, los anuarios de mareas y las derroteros de sus zonas." },
  { q:"¿Qué significa el color verde en una carta náutica (zona terrestre costera)?", opts:["Aguas profundas y seguras","Zona entre mareas (alternativamente cubierta y descubierta por la marea)","Zona militar prohibida a la navegación","Zona de pesca regulada"], correct:1, expl:"Verde en una carta náutica = zona entre mareas = zona que está alternativamente cubierta de agua (marea alta) y descubierta (marea baja). Esta zona es navegable en marea alta pero peligrosa en marea baja. ¡Verificar con los anuarios de mareas!" },
  { q:"En una carta Mercator, ¿dónde se deben medir SIEMPRE las distancias en millas náuticas?", opts:["En la escala de longitud en la parte inferior de la carta","En la escala de latitud en los laterales — 1 minuto = 1 milla náutica — a la latitud del punto medido","En una escala especial indicada en la parte inferior izquierda","En la escala de longitud o latitud indistintamente"], correct:1, expl:"En una carta Mercator, medir SIEMPRE en la escala de LATITUD (lados verticales) a la latitud del punto medido, ya que 1 minuto de latitud = 1 milla náutica. Nunca usar la escala de longitud — varía con la latitud en una carta Mercator." },
  ],
  pt:[
  { q:"O que é a projeção Mercator e qual a sua principal vantagem para a navegação?", opts:["Conserva as superfícies — útil para calcular distâncias exatas","Conserva os ângulos → as loxodrómicas são linhas retas na carta","Projeção polar — usada para altas latitudes","Projeção usada apenas para grandes escalas"], correct:1, expl:"Mercator conserva os ÂNGULOS. Uma rota de rumo constante (loxodrómica) é uma linha reta numa carta Mercator → traçar uma rota = simples linha reta. Desvantagem: as superfícies são deformadas em direção aos polos." },
  { q:"Qual é a diferença entre uma grande e uma pequena escala cartográfica?", opts:["Grande escala = carta fisicamente maior","Grande escala (1:50.000) = mais detalhada (costeira) · Pequena escala (1:500.000) = visão geral (alto mar)","Pequena escala = mais precisa para navegação costeira","Ambos os termos significam o mesmo"], correct:1, expl:"1:50.000 = grande escala = 1 cm na carta = 500m reais → navegação costeira, portos. 1:500.000 = pequena escala = 1cm = 5km → navegação de alto mar. Quanto maior o denominador, menor a escala e menos detalhe há." },
  { q:"O que significa o datum 'LAT' numa carta náutica?", opts:["Local Area Time — hora local do lugar","Lowest Astronomical Tide — referência das profundidades","Latitude Average Temperature — temperatura média","Light Approach Track — rota de aproximação recomendada"], correct:1, expl:"LAT = Lowest Astronomical Tide (Nível de Baixa-mar Astronómica). As profundidades nas cartas náuticas são medidas em relação a este nível. A profundidade real é portanto sempre ≥ à indicada na carta — segurança para a navegação." },
  { q:"Cor azul clara numa carta náutica — o que significa?", opts:["Águas profundas e seguras — navegáveis com total segurança","Profundidades baixas (<5m) — potencialmente perigosas para grandes navios","Zona de fundeio recomendada","Zona de corrente forte"], correct:1, expl:"Nas cartas náuticas: Branco = águas profundas (navegáveis). Azul claro = profundidades baixas (<5m). Bege/Amarelo = terra emersa. Verde = zona entremarés. O azul claro é um sinal de alerta para navios de grande calado." },
  { q:"Luz marítima 'Oc(2)' — o que significa?", opts:["2 clarões muito rápidos — luz tipo Quick Flash","Luz de ocultações agrupadas por 2 — acesa mais tempo do que apagada, com 2 ocultações","2 setores fixos — branco e vermelho","Luz isofase em 2 tempos"], correct:1, expl:"Oc = Occulting (Ocultação): a luz está acesa mais tempo do que apagada. (2) = agrupada por 2 ocultações. Oposto de Fl (Clarão, onde a luz está acesa menos tempo do que apagada). Iso = Isofase (acesa = apagada)." },
  { q:"Boias cardeais LESTE e OESTE — como distingui-las?", opts:["LESTE = vermelha, OESTE = verde","LESTE ⬛🟡⬛ (preto-amarelo-preto) · luz Q(3) · OESTE 🟡⬛🟡 (amarelo-preto-amarelo) · luz Q(9)","LESTE = cónica, OESTE = cilíndrica","LESTE e OESTE têm a mesma cor — só a marca de topo as diferencia"], correct:1, expl:"LESTE: preto-amarelo-preto (sanduíche) · marcas de topo: 2 cones com pontas OPOSTAS ◇ · luz Q(3) — 3 clarões (3h no relógio). OESTE: amarelo-preto-amarelo · marcas de topo: 2 cones com pontas OPOSTAS ◇ · luz Q(9) — 9 clarões (9h no relógio)." },
  { q:"O que é uma marca terrestre (amer) e como se usa na navegação?", opts:["Uma boia cardeal do tipo Norte","Ponto fixo notável identificável a partir do mar (farol, torre, campanário...) — usado para marcações","Linha de sonda que indica uma profundidade constante","Luz de navegação vermelha visível a longa distância"], correct:1, expl:"Uma marca terrestre é um ponto fixo notável em terra, identificável a partir do mar. Ao tomar a marcação magnética de uma marca, traça-se uma reta de posição na carta. Com 2 marcações sobre 2 marcas diferentes, obtém-se um ponto de posição preciso (interseção)." },
  { q:"O símbolo PA numa carta náutica significa:", opts:["Ponto de ancoragem recomendado — fundeio oficial seguro","Posição Aproximada — usar com precaução","Profundidade artificial — canal dragado e mantido","Porto acessível — entrada possível com qualquer clima"], correct:1, expl:"PA = Posição Aproximada. Este elemento (naufrágio, rocha, boia) não foi localizado com precisão. Exercer precaução especial nesta zona. Outras abreviaturas: ED = Existência Duvidosa · Rep = Reportada." },
  { q:"Como se calcula um ponto de posição por duas marcações?", opts:["Medir a distância a duas boias com o radar","Tomar a marcação magnética de 2 marcas diferentes e traçar as duas retas na carta — a interseção é a posição","Calcular a latitude e longitude por triangulação GPS","Comparar o rumo verdadeiro e o rumo de agulha de dois navios próximos"], correct:1, expl:"Ponto por marcações: 1) Tomar a marcação (ângulo a partir do norte) da marca A → traçar uma reta na carta. 2) O mesmo para a marca B. 3) A interseção das duas retas = posição do navio. Quanto mais próximo de 90° o ângulo entre as duas retas, mais preciso o ponto." },
  { q:"O que é a navegação estimada (Dead Reckoning)?", opts:["Navegação guiada pelas estrelas com um sextante","Cálculo da posição estimada: D = V × T a partir da última posição conhecida","Navegação apenas por radar sem visibilidade","Método de navegação que usa boias cardeais como pontos de passagem"], correct:1, expl:"Navegação estimada (Dead Reckoning/DR): D = V × T. Posição estimada = última posição conhecida + rumo seguido + velocidade × tempo decorrido. É o método de reserva se o GPS falhar. Quanto mais tempo decorrido, mais se acumula o erro de estima." },
  { q:"Qual é a obrigação da Regra 10 do COLREG sobre o TSS?", opts:["Navegar em sentido contrário ao tráfego para maior segurança","Navegar no sentido do tráfego · Cruzar em ângulo reto · Zona de separação proibida · Entrar/sair pelas extremidades","Usar obrigatoriamente o piloto automático num TSS","Reduzir a velocidade a 10 nós em qualquer zona de separação"], correct:1, expl:"Regra 10 (COLREG): Navegar no sentido geral do tráfego. Cruzar perpendicularmente (90°) se necessário. Não navegar na zona de separação. Entrar/sair pelas extremidades se possível. Navios de pesca, à vela e <20m podem usar as zonas costeiras." },
  { q:"O que é um naufrágio 'perigoso' numa carta náutica?", opts:["Qualquer naufrágio visível à superfície","Naufrágio com profundidade insuficiente que apresenta perigo para a navegação — assinalado com a profundidade","Naufrágio recente ainda não cartografado","Naufrágio perigoso apenas para mergulhadores"], correct:1, expl:"Naufrágio perigoso = naufrágio com pouca água por cima que apresenta um risco para a navegação. A profundidade sobre o naufrágio é indicada na carta. Naufrágio não perigoso = profundidade suficiente. ED (Existência Duvidosa) = existência do naufrágio não confirmada." },
  { q:"O SHOM, a UKHO e a NOAA são:", opts:["Sistemas de navegação por satélite","Serviços hidrográficos nacionais que publicam as cartas náuticas oficiais","Organizações de formação marítima internacional","Sistemas de comunicação de socorro marítimo"], correct:1, expl:"SHOM = Serviço Hidrográfico e Oceanográfico da Marinha (França). UKHO = United Kingdom Hydrographic Office. NOAA = National Oceanic and Atmospheric Administration (EUA). Estes organismos publicam as cartas náuticas oficiais, os anuários de marés e os roteiros das suas zonas." },
  { q:"O que significa a cor verde numa carta náutica (zona terrestre costeira)?", opts:["Águas profundas e seguras","Zona entremarés (alternadamente coberta e descoberta pela maré)","Zona militar interdita à navegação","Zona de pesca regulamentada"], correct:1, expl:"Verde numa carta náutica = zona entremarés = zona que está alternadamente coberta de água (maré alta) e descoberta (maré baixa). Esta zona é navegável na maré alta mas perigosa na maré baixa. Verificar sempre os anuários de marés!" },
  { q:"Numa carta Mercator, onde se devem SEMPRE medir as distâncias em milhas náuticas?", opts:["Na escala de longitude na parte inferior da carta","Na escala de latitude nas laterais — 1 minuto = 1 milha náutica — na latitude do ponto medido","Numa escala especial indicada em baixo à esquerda","Na escala de longitude ou latitude indiferentemente"], correct:1, expl:"Numa carta Mercator, medir SEMPRE na escala de LATITUDE (lados verticais) na latitude do ponto medido, pois 1 minuto de latitude = 1 milha náutica. Nunca usar a escala de longitude — varia com a latitude numa carta Mercator." },
  ],
};

// ══════════════════════════════════════════
// QUESTION BANK COMPONENT
// ══════════════════════════════════════════
function QuestionBank({ lang, onComplete }) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const questions = BANK[lang]||BANK.fr;
  const [shuffled] = useState(()=>questions.map(shuffleQuestionOptions));
  const q = shuffled[cur];
  const isOk = sel===q.correct;
  const pick = i => { if(answered)return; setSel(i); setAnswered(true); if(i===q.correct)setScore(s=>s+1); };
  const next = () => { if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();} };
  if(done) return (
    <div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:48,marginBottom:10}}>{score>=12?"🏆":score>=8?"🎖️":"📚"}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:22,color:C.white,marginBottom:6}}>{score}/{questions.length}</div>
      <div style={{fontSize:14,color:C.gold2,marginBottom:4}}>{Math.round(score/questions.length*100)}%</div>
      <div style={{fontSize:12,color:C.muted}}>{lang==="fr"?"Banque de questions terminée !":lang==="es"?"¡Banco de preguntas terminado!":lang==="pt"?"Banco de questões concluído!":"Question bank complete!"}</div>
    </div>
  );
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:10,color:C.muted}}>{cur+1}/{questions.length}</div>
        <div style={{fontSize:12,color:C.gold2,fontWeight:700}}>✓ {score}</div>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.08)",borderRadius:3,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(cur/questions.length)*100}%`,background:`linear-gradient(90deg,${C.purple},${C.gold2})`}}/>
      </div>
      <div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:14}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {q.opts.map((opt,i)=>{
          let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)";
          if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;}}
          return <button key={i} onClick={()=>pick(i)} style={{padding:"11px 12px",borderRadius:12,background:bg,border:`1.5px solid ${bd}`,color:C.muted,fontSize:12,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{opt}</button>;
        })}
      </div>
      {answered&&<>
        <div style={{padding:"10px 12px",borderRadius:10,marginBottom:10,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,fontSize:11,color:C.white,lineHeight:1.6}}>{q.expl}</div>
        <button onClick={next} style={{width:"100%",padding:"12px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.purple},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>
          {cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="es"?"SIGUIENTE →":lang==="pt"?"PRÓXIMO →":"NEXT →"):(lang==="fr"?"TERMINER":"FINISH")}
        </button>
      </>}
    </div>
  );
}

// ══════════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════════
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{left:-100%}100%{left:200%}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SLabel({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════════
// QUIZ COMPONENT
// ══════════════════════════════════════════
function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=(i)=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center",border:`1px solid ${pct>=80?C.gold:C.border}`}}><div style={{fontSize:11,letterSpacing:3,color:C.gold,marginBottom:14,fontFamily:"'Cinzel',serif"}}>{t.result}</div><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.blue2}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.blue2,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.blue2:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:15,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"13px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════════
// MAIN LESSON COMPONENT
// ══════════════════════════════════════════
export default function LessonCarteMarine({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const [phase, setPhase] = useState("content");
  const [bankDone, setBankDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [vis, setVis] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVis(true),80); },[]);
  const progress = phase==="content"?15:phase==="quiz"?70:100;

  const sections_fr = [
    {type:"badge",text:"📚 Navigation & Cartographie · Leçon 4/8 · ⭐ Premium · 200 XP"},
    {type:"title",text:"La Carte Marine — Lire, Comprendre, Naviguer"},
    {type:"intro",text:"La carte marine est l'outil fondamental du navigateur. C'est à la fois une image précise du monde maritime et un langage universel que tous les marins peuvent lire.\n\nMaîtriser sa lecture, c'est maîtriser la navigation côtière."},
    {type:"slabel",icon:"🗺️",text:"PARTIE 1 — CARTE MARINE & COULEURS"},
    {type:"content",icon:"🗺️",title:"Projection Mercator & Lecture d'une Carte",text:"PROJECTION MERCATOR :\nConserve les ANGLES → routes loxodromiques = lignes droites.\nAvantage : tracer une route = simple ligne droite.\nDéfaut : surfaces déformées vers les pôles.\n\nÉCHELLES :\n• 1:10 000 → Plan de port (très détaillé)\n• 1:50 000 → Navigation côtière\n• 1:200 000 → Approche côtière\n• 1:500 000 → Navigation hauturière\n\nCOULEURS DES EAUX :\n⬜ Blanc = eaux profondes (navigables)\n🔵 Bleu clair = faibles profondeurs (<5m)\n🟡 Beige/Jaune = terres émergées\n🟢 Vert = zone intertidale (entre marées)\n\nDATUM : Profondeurs référencées au LAT (Plus Basses Eaux Astronomiques). Profondeur réelle toujours ≥ indiquée sur carte."},
    {type:"symbols"},
    {type:"slabel",icon:"💡",text:"PARTIE 2 — FEUX & AMERS"},
    {type:"content",icon:"💡",title:"Types de Feux et Lecture d'un Phare",text:"CODE INTERNATIONAL DES FEUX :\nFl (Flash) = éclat bref · Oc (Occulting) = allumé > éteint · Iso = allumé = éteint\nLFl = long éclat ≥2s · F (Fixed) = feu fixe · Q = rapide (50-60/min) · VQ = très rapide\n\nSECTEURS COLORÉS (W R G) :\nBlanc = secteur sûr · Rouge = secteur danger (récifs!) · Vert = secteur particulier\n→ De nuit, la couleur visible depuis le navire indique votre zone de navigation.\n\nAMERS : Points fixes remarquables à terre (phares, tours, clochers, châteaux d'eau).\nUtilisation : prise de relèvements pour calculer la position du navire."},
    {type:"lighthouse"},
    {type:"slabel",icon:"🚢",text:"PARTIE 3 — BALISAGE AISM"},
    {type:"content",icon:"🔴🟢",title:"Système A vs Système B — Différence CRITIQUE",text:"SYSTÈME A (Europe, Afrique, Asie, Australie) :\n→ TRIBORD (droite) = VERT ▲ (conique) en entrant\n→ BÂBORD (gauche) = ROUGE ▬ (cylindrique) en entrant\n\nSYSTÈME B (Amériques, Japon, Philippines) :\n→ 'Red Right Returning'\n→ TRIBORD = ROUGE en entrant\n⚠️ DANGER : un marin qui passe du Système A au B doit inverser sa lecture des bouées !\n\nBOUÉES CARDINALES (valables dans les 2 systèmes) :\n• NORD ⬛🟡 = passer au NORD · Feu: VQ ou Q\n• SUD 🟡⬛ = passer au SUD · Feu: Q(6)+LFl\n• EST ⬛🟡⬛ = passer à l'EST · Feu: Q(3)\n• OUEST 🟡⬛🟡 = passer à l'OUEST · Feu: Q(9)"},
    {type:"buoys"},
    {type:"slabel",icon:"🛳️",text:"PARTIE 4 — VOIES NAVIGABLES & TSS"},
    {type:"content",icon:"🛳️",title:"TSS, Chenaux et Repérage de Position",text:"TSS (Traffic Separation Scheme) = Autoroute en mer\n\nObligations COLREG Rule 10 :\n✅ Naviguer dans le sens général du trafic\n✅ Si traversée : angle DROIT du TSS\n❌ Pas de demi-tour · ❌ Zone de séparation interdite\n\nExemples de TSS majeurs :\n• Manche/Pas-de-Calais (plus fréquenté au monde)\n• Détroit de Malacca\n• Cap de Bonne-Espérance\n\nREPÉRAGE DE POSITION par relèvements :\n• Relèvement 1 sur amer A (ex: 045°V) → droite tracée sur la carte\n• Relèvement 2 sur amer B (ex: 315°V) → droite tracée sur la carte\n• Intersection des 2 droites = POSITION DU NAVIRE\n\nPlus l'angle entre les 2 droites est proche de 90°, plus le point est précis !"},
    {type:"tss"},
    {type:"slabel",icon:"🎯",text:"EXERCICE AVANCÉ PREMIUM",color:C.gold},
    {type:"exercise"},
    {type:"slabel",icon:"⚠️",text:"CAS RÉEL D'ACCIDENT MARITIME",color:C.red},
    {type:"accident"},
    {type:"slabel",icon:"📝",text:"BANQUE DE QUESTIONS — 15 QUESTIONS PREMIUM",color:C.purple},
    {type:"bank"},
    {type:"summary",points:["Mercator : angles conservés · loxodromie = ligne droite sur carte","Blanc=profond · Bleu=<5m · LAT=datum · Vert=intertidale","Fl=éclat · Oc=occultant · Iso=isophase · Q=rapide · période=cycle","Secteurs : W=sûr · R=danger · G=particulier","Système A : Tribord=VERT · Bâbord=ROUGE (Europe/Afrique)","Système B : Red Right Returning (Amériques) — INVERSE du A","Cardinal : N=passer au Nord · S=Sud · E=Est · O=Ouest","TSS Rule 10 : sens du trafic · traverser à 90° · séparation interdite"]},
  ];

  const sections_en = [
    {type:"badge",text:"📚 Navigation & Cartography · Lesson 4/8 · ⭐ Premium · 200 XP"},
    {type:"title",text:"The Nautical Chart — Read, Understand, Navigate"},
    {type:"intro",text:"The nautical chart is the navigator's fundamental tool. It is both a precise image of the maritime world and a universal language all mariners can read.\n\nMastering chart reading means mastering coastal navigation."},
    {type:"slabel",icon:"🗺️",text:"PART 1 — CHART & COLORS"},
    {type:"content",icon:"🗺️",title:"Mercator Projection & Chart Reading",text:"MERCATOR PROJECTION:\nPreserves ANGLES → constant-heading routes (rhumb lines) = straight lines.\nAdvantage: drawing a route = simple straight line.\nDisadvantage: areas distorted toward the poles.\n\nSCALES:\n• 1:10,000 → Harbor plan (very detailed)\n• 1:50,000 → Coastal navigation\n• 1:500,000 → Offshore navigation\n\nWATER COLORS:\n⬜ White = deep water (navigable)\n🔵 Light blue = shallow depth (<5m)\n🟡 Beige/Yellow = above-water land\n🟢 Green = intertidal zone\n\nDATUM: Depths referenced to LAT (Lowest Astronomical Tide). Actual depth always ≥ charted depth."},
    {type:"symbols"},
    {type:"slabel",icon:"💡",text:"PART 2 — LIGHTS & LANDMARKS"},
    {type:"content",icon:"💡",title:"Light Types and Lighthouse Reading",text:"INTERNATIONAL LIGHT CODE:\nFl (Flash) = brief flash · Oc (Occulting) = on > off · Iso = on = off\nLFl = long flash ≥2s · F (Fixed) = continuous · Q = quick (50-60/min)\n\nCOLORED SECTORS (W R G):\nWhite = safe sector · Red = danger (reefs!) · Green = special sector\n→ At night, the color seen from the vessel indicates your navigation zone.\n\nLANDMARKS (AMERS): Fixed remarkable points ashore (lighthouses, towers, steeples).\nUse: take bearings to calculate vessel position."},
    {type:"lighthouse"},
    {type:"slabel",icon:"🚢",text:"PART 3 — IALA BUOYAGE"},
    {type:"content",icon:"🔴🟢",title:"System A vs System B — CRITICAL DIFFERENCE",text:"SYSTEM A (Europe, Africa, Asia, Australia):\n→ STARBOARD (right) = GREEN ▲ (conical) entering\n→ PORT (left) = RED ▬ (cylindrical) entering\n\nSYSTEM B (Americas, Japan, Philippines):\n→ 'Red Right Returning'\n→ STARBOARD = RED entering\n⚠️ DANGER: A mariner switching from System A to B must reverse buoy reading!\n\nCARDINAL BUOYS (valid in both systems):\n• NORTH ⬛🟡 = pass NORTH · Light: VQ or Q\n• SOUTH 🟡⬛ = pass SOUTH · Light: Q(6)+LFl\n• EAST ⬛🟡⬛ = pass EAST · Light: Q(3)\n• WEST 🟡⬛🟡 = pass WEST · Light: Q(9)"},
    {type:"buoys"},
    {type:"slabel",icon:"🛳️",text:"PART 4 — WATERWAYS & TSS"},
    {type:"content",icon:"🛳️",title:"TSS, Channels and Position Fixing",text:"TSS (Traffic Separation Scheme) = Highway at sea\n\nCOLREG Rule 10 obligations:\n✅ Navigate in general traffic direction\n✅ If crossing: RIGHT ANGLE to TSS\n❌ No U-turns · ❌ Separation zone forbidden\n\nMajor TSS examples:\n• English Channel/Dover Strait (world's busiest)\n• Strait of Malacca\n• Cape of Good Hope\n\nPOSITION FIX by cross bearings:\n• Bearing 1 on landmark A (e.g.: 045°T) → line drawn on chart\n• Bearing 2 on landmark B (e.g.: 315°T) → line drawn on chart\n• Intersection of 2 lines = VESSEL POSITION\n\nThe closer the angle between the 2 lines is to 90°, the more accurate the fix!"},
    {type:"tss"},
    {type:"slabel",icon:"🎯",text:"ADVANCED PREMIUM EXERCISE",color:C.gold},
    {type:"exercise"},
    {type:"slabel",icon:"⚠️",text:"REAL MARITIME ACCIDENT CASE",color:C.red},
    {type:"accident"},
    {type:"slabel",icon:"📝",text:"QUESTION BANK — 15 PREMIUM QUESTIONS",color:C.purple},
    {type:"bank"},
    {type:"summary",points:["Mercator: angles conserved · rhumb line = straight on chart","White=deep · Blue=<5m · LAT=datum · Green=intertidal","Fl=flash · Oc=occulting · Iso=isophase · Q=quick · period=cycle","Sectors: W=safe · R=danger · G=special","System A: Starboard=GREEN · Port=RED (Europe/Africa)","System B: Red Right Returning (Americas) — OPPOSITE of A","Cardinal: N=pass North · S=South · E=East · W=West","TSS Rule 10: traffic direction · cross 90° · separation forbidden"]},
  ];

  const sections_es = [
    {type:"badge",text:"📚 Navegación & Cartografía · Lección 4/8 · ⭐ Premium · 200 XP"},
    {type:"title",text:"La Carta Náutica — Leer, Comprender, Navegar"},
    {type:"intro",text:"La carta náutica es la herramienta fundamental del navegante. Es un lenguaje universal que todos los marinos del mundo pueden leer.\n\nDominar su lectura es dominar la navegación costera."},
    {type:"slabel",icon:"🗺️",text:"PARTE 1 — CARTA & COLORES"},
    {type:"content",icon:"🗺️",title:"Proyección Mercator & Lectura de Carta",text:"PROYECCIÓN MERCATOR :\nConserva los ÁNGULOS → rutas loxodrómicas = líneas rectas.\n\nESCALAS : 1:10.000 (puerto) · 1:50.000 (costera) · 1:500.000 (altura)\n\nCOLORES :\n⬜ Blanco = aguas profundas · 🔵 Azul claro = <5m · 🟡 Beige = tierra · 🟢 Verde = intermareal\n\nDATUM : Profundidades referidas al NMBA (Nivel Mínimo de Bajamar Astronómica)."},
    {type:"symbols"},
    {type:"slabel",icon:"💡",text:"PARTE 2 — LUCES & SEÑALES"},
    {type:"content",icon:"💡",title:"Tipos de Luces y Lectura de un Faro",text:"CÓDIGO INTERNACIONAL:\nFl=destello · Oc=ocultante · Iso=isofásica · Q=centelleante · VQ=muy rápido\n\nSECTORES COLOREADOS (W R G) :\nBlanco=sector seguro · Rojo=sector peligroso(arrecifes) · Verde=sector especial\n→ De noche, el color visto desde el buque indica su zona de navegación.\n\nAMERAS: Puntos fijos notables en tierra (faros, torres, campanarios) para marcaciones."},
    {type:"lighthouse"},
    {type:"slabel",icon:"🚢",text:"PARTE 3 — BALIZAMIENTO IALA"},
    {type:"content",icon:"🔴🟢",title:"Sistema A vs Sistema B — Diferencia CRÍTICA",text:"SISTEMA A (Europa, África, Asia, Australia):\n→ ESTRIBOR = VERDE ▲ (cónica) al entrar\n→ BABOR = ROJA ▬ (cilíndrica) al entrar\n\nSISTEMA B (Américas, Japón, Filipinas) :\n→ 'Red Right Returning' → ESTRIBOR=ROJA al entrar\n⚠️ PELIGRO: Al cambiar de sistema A a B, hay que invertir la lectura !\n\nBOYAS CARDINALES :\n• NORTE ⬛🟡 = pasar al NORTE · Q o VQ\n• SUR 🟡⬛ = pasar al SUR · Q(6)+DL\n• ESTE ⬛🟡⬛ = pasar al ESTE · Q(3)\n• OESTE 🟡⬛🟡 = pasar al OESTE · Q(9)"},
    {type:"buoys"},
    {type:"slabel",icon:"🛳️",text:"PARTE 4 — VÍAS NAVEGABLES & DST"},
    {type:"content",icon:"🛳️",title:"DST, Canales y Determinación de Posición",text:"DST = Autopista en el mar\n\nObligaciones Regla 10 COLREG:\n✅ Navegar en sentido del tráfico · ✅ Si cruce: ÁNGULO RECTO\n❌ Sin media vuelta · ❌ Zona separación prohibida\n\nDETERMINACIÓN DE POSICIÓN por marcaciones :\n• Marcación 1 sobre amer A → línea trazada en la carta\n• Marcación 2 sobre amer B → línea trazada en la carta\n• Intersección = POSICIÓN DEL BUQUE"},
    {type:"tss"},
    {type:"slabel",icon:"🎯",text:"EJERCICIO AVANZADO PREMIUM",color:C.gold},
    {type:"exercise"},
    {type:"slabel",icon:"⚠️",text:"CASO REAL DE ACCIDENTE MARÍTIMO",color:C.red},
    {type:"accident"},
    {type:"slabel",icon:"📝",text:"BANCO DE PREGUNTAS — 15 PREGUNTAS PREMIUM",color:C.purple},
    {type:"bank"},
    {type:"summary",points:["Mercator: ángulos conservados · loxodrómica = línea recta","Blanco=profundo · Azul=<5m · NMBA=datum · Verde=intermareal","Fl=destello · Oc=ocultante · Iso=isofásica · Q=centelleante","Sectores: W=seguro · R=peligro · G=especial","Sistema A: Estribor=VERDE · Babor=ROJA (Europa/África)","Sistema B: Red Right Returning (Américas) — INVERSO del A","Cardinal: N=pasar al Norte · S=Sur · E=Este · O=Oeste","DST Regla 10: sentido tráfico · cruzar 90° · separación prohibida"]},
  ];

  const sections_pt = [
    {type:"badge",text:"📚 Navegação & Cartografia · Lição 4/8 · ⭐ Premium · 200 XP"},
    {type:"title",text:"A Carta Náutica — Ler, Compreender, Navegar"},
    {type:"intro",text:"A carta náutica é a ferramenta fundamental do navegante. É uma linguagem universal que todos os marinheiros do mundo podem ler.\n\nDominar a sua leitura é dominar a navegação costeira."},
    {type:"slabel",icon:"🗺️",text:"PARTE 1 — CARTA & CORES"},
    {type:"content",icon:"🗺️",title:"Projeção de Mercator & Leitura de Carta",text:"PROJEÇÃO DE MERCATOR:\nConserva os ÂNGULOS → rotas loxodrómicas = linhas retas.\n\nESCALAS: 1:10.000 (porto) · 1:50.000 (costeira) · 1:500.000 (longo curso)\n\nCORES:\n⬜ Branco = águas profundas · 🔵 Azul claro = <5m · 🟡 Bege = terra · 🟢 Verde = intertidal\n\nDATUM: Profundidades referenciadas ao LAT (Nível de Baixa-mar Astronómica)."},
    {type:"symbols"},
    {type:"slabel",icon:"💡",text:"PARTE 2 — LUZES & SINAIS"},
    {type:"content",icon:"💡",title:"Tipos de Luzes e Leitura de um Farol",text:"CÓDIGO INTERNACIONAL:\nFl=lampejo · Oc=ocultante · Iso=isofásica · Q=cintilante · VQ=muito rápido\n\nSETORES COLORIDOS (W R G):\nBranco=setor seguro · Vermelho=setor perigoso(recifes) · Verde=setor especial\n→ À noite, a cor vista do navio indica a sua zona de navegação.\n\nAJUDAS À NAVEGAÇÃO: Pontos fixos notáveis em terra (faróis, torres, campanários) para marcações."},
    {type:"lighthouse"},
    {type:"slabel",icon:"🚢",text:"PARTE 3 — BALIZAMENTO IALA"},
    {type:"content",icon:"🔴🟢",title:"Sistema A vs Sistema B — Diferença CRÍTICA",text:"SISTEMA A (Europa, África, Ásia, Austrália):\n→ ESTIBORDO = VERDE ▲ (cônica) ao entrar\n→ BOMBORDO = VERMELHA ▬ (cilíndrica) ao entrar\n\nSISTEMA B (Américas, Japão, Filipinas):\n→ 'Red Right Returning' → ESTIBORDO=VERMELHA ao entrar\n⚠️ PERIGO: Ao mudar do Sistema A para B, deve inverter a leitura das boias!\n\nBOIAS CARDINAIS:\n• NORTE ⬛🟡 = passar ao NORTE · VQ ou Q\n• SUL 🟡⬛ = passar ao SUL · Q(6)+LFl\n• ESTE ⬛🟡⬛ = passar ao ESTE · Q(3)\n• OESTE 🟡⬛🟡 = passar ao OESTE · Q(9)"},
    {type:"buoys"},
    {type:"slabel",icon:"🛳️",text:"PARTE 4 — VIAS NAVEGÁVEIS & DST"},
    {type:"content",icon:"🛳️",title:"DST, Canais e Determinação de Posição",text:"DST = Autoestrada no mar\n\nObrigações Regra 10 COLREG:\n✅ Navegar no sentido do tráfego · ✅ Se cruzar: ÂNGULO RETO\n❌ Sem meias-voltas · ❌ Zona separação proibida\n\nDETERMINAÇÃO DE POSIÇÃO por marcações:\n• Marcação 1 sobre ponto de referência A → linha traçada na carta\n• Marcação 2 sobre ponto de referência B → linha traçada na carta\n• Interseção = POSIÇÃO DO NAVIO"},
    {type:"tss"},
    {type:"slabel",icon:"🎯",text:"EXERCÍCIO AVANÇADO PREMIUM",color:C.gold},
    {type:"exercise"},
    {type:"slabel",icon:"⚠️",text:"CASO REAL DE ACIDENTE MARÍTIMO",color:C.red},
    {type:"accident"},
    {type:"slabel",icon:"📝",text:"BANCO DE QUESTÕES — 15 QUESTÕES PREMIUM",color:C.purple},
    {type:"bank"},
    {type:"summary",points:["Mercator: ângulos conservados · loxodrómica = linha reta","Branco=profundo · Azul=<5m · LAT=datum · Verde=intertidal","Fl=lampejo · Oc=ocultante · Iso=isofásica · Q=cintilante","Setores: W=seguro · R=perigo · G=especial","Sistema A: Estibordo=VERDE · Bombordo=VERMELHA (Europa/África)","Sistema B: Red Right Returning (Américas) — INVERSO do A","Cardinal: N=passar ao Norte · S=Sul · E=Este · O=Oeste","DST Regra 10: sentido tráfego · cruzar 90° · separação proibida"]},
  ];

  const SECTIONS = {fr:sections_fr,en:sections_en,es:sections_es,pt:sections_pt};
  const sections = SECTIONS[lang]||SECTIONS.fr;

  const renderBlock = (block, i) => {
    switch(block.type) {
      case "badge": return <div key={i} style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.gold,fontWeight:700}}>{block.text}</div>;
      case "title": return <h1 key={i} style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{block.text}</h1>;
      case "intro": return <Card key={i} style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}><div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
      case "slabel": return <SLabel key={i} icon={block.icon} text={block.text} color={block.color}/>;
      case "content": return <Card key={i} style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>{block.icon}</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{block.title}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{block.text}</div></Card>;
      case "symbols": return <Card key={i} style={{marginBottom:12}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>⚓ {lang==="fr"?"NATURE DU FOND":lang==="en"?"SEABED NATURE":lang==="es"?"NATURALEZA DEL FONDO":"NATUREZA DO FUNDO"}</div><ChartSymbols lang={lang}/></Card>;
      case "lighthouse": return <Card key={i} style={{marginBottom:12}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>💡 {t.exerciseTitle.replace("🎯 EXERCICE AVANCÉ — ","").replace("🎯 ADVANCED EXERCISE — ","").replace("🎯 EJERCICIO AVANZADO — ","").replace("🎯 EXERCÍCIO AVANÇADO — ","")}</div><LighthouseSVG lang={lang} t={t}/></Card>;
      case "buoys": return <Card key={i} style={{marginBottom:12,textAlign:"center"}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🚢 {lang==="fr"?"BOUÉES AISM INTERACTIVES":lang==="en"?"IALA INTERACTIVE BUOYS":lang==="es"?"BALIZAS IALA INTERACTIVAS":"BOIAS IALA INTERATIVAS"}</div><BuoysSVG lang={lang} t={t}/></Card>;
      case "tss": return <Card key={i} style={{marginBottom:12,textAlign:"center"}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:10}}>🛳️ TSS — {lang==="fr"?"Dispositif de Séparation du Trafic":lang==="en"?"Traffic Separation Scheme":lang==="es"?"Dispositivo de Separación del Tráfico":"Dispositivo de Separação do Tráfego"}</div><TSS_SVG lang={lang} t={t}/></Card>;
      case "exercise": return <Card key={i} style={{marginBottom:12,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.gold,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>{t.exerciseTitle}</div><Exercise1 lang={lang} t={t}/></Card>;
      case "accident": return <div key={i} style={{marginBottom:12}}><AccidentCase lang={lang}/></div>;
      case "bank": return <Card key={i} style={{marginBottom:12,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>{t.bankTitle}</div><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>;
      case "summary": return <Card key={i} style={{marginBottom:14,background:"linear-gradient(135deg,rgba(26,111,212,0.1),rgba(13,31,60,0.8))",border:`1px solid ${C.blue2}33`}}><div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lang==="fr"?"RÉSUMÉ — LEÇON 4":lang==="en"?"SUMMARY — LESSON 4":lang==="es"?"RESUMEN — LECCIÓN 4":"RESUMO — LIÇÃO 4"}</div>{block.points.map((pt,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:j<block.points.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}</Card>;
      default: return null;
    }
  };

  const learned = {
    fr:["Mercator : angles conservés · loxodromie = ligne droite sur carte","Blanc=profond · Bleu=peu profond · LAT=datum des profondeurs","Fl=éclat · Oc=occultant · Iso=isophase · Q=rapide · période=cycle","Secteurs W R G : blanc=sûr · rouge=danger · vert=particulier","Système A : tribord=VERT · bâbord=ROUGE (Europe/Afrique)","Système B : Red Right Returning — INVERSE du A (Amériques)","Cardinal N=Nord · S=Sud · E=Est · O=Ouest","TSS Rule 10 : sens du trafic · traverser 90° · séparation interdite"],
    en:["Mercator: angles conserved · rhumb line = straight on chart","White=deep · Blue=shallow · LAT=depth datum","Fl=flash · Oc=occulting · Iso=isophase · Q=quick · period=cycle","Sectors W R G: white=safe · red=danger · green=special","System A: starboard=GREEN · port=RED (Europe/Africa)","System B: Red Right Returning — OPPOSITE of A (Americas)","Cardinal N=North · S=South · E=East · W=West","TSS Rule 10: traffic direction · cross 90° · separation forbidden"],
    es:["Mercator: ángulos conservados · loxodrómica = línea recta","Blanco=profundo · Azul=poco profundo · NMBA=datum","Fl=destello · Oc=ocultante · Iso=isofásica · Q=centelleante","Sectores W R G: blanco=seguro · rojo=peligro · verde=especial","Sistema A: estribor=VERDE · babor=ROJA (Europa/África)","Sistema B: Red Right Returning — INVERSO del A (Américas)","Cardinal N=Norte · S=Sur · E=Este · O=Oeste","DST Regla 10: sentido tráfico · cruzar 90° · separación prohibida"],
    pt:["Mercator: ângulos conservados · loxodrómica = linha reta","Branco=profundo · Azul=raso · LAT=datum profundidades","Fl=lampejo · Oc=ocultante · Iso=isofásica · Q=cintilante","Setores W R G: branco=seguro · vermelho=perigo · verde=especial","Sistema A: estibordo=VERDE · bombordo=VERMELHA (Europa/África)","Sistema B: Red Right Returning — INVERSO do A (Américas)","Cardinal N=Norte · S=Sul · E=Este · O=Oeste","DST Regra 10: sentido tráfego · cruzar 90° · separação proibida"],
  };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,color:C.white,fontFamily:"'Nunito',sans-serif",overflow:"hidden",position:"relative"}}>
      <Stars/>
      {/* TOPBAR */}
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif",marginBottom:1}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{t.lesson} 4/8</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
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

          {/* CONTENT PHASE */}
          {phase==="content"&&(
            <>
              {sections.map((block,i)=>renderBlock(block,i))}
              <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(26,111,212,0.4)",marginTop:8}}>{t.startQuiz}</button>
              <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
            </>
          )}

          {/* QUIZ PHASE */}
          {phase==="quiz"&&(
            <>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                  {lang==="fr"?"Quiz — La Carte Marine":lang==="es"?"Quiz — La Carta Náutica":lang==="pt"?"Quiz — A Carta Náutica":"Quiz — The Nautical Chart"}
                </div>
                <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4 · ⭐ Premium":lang==="es"?"preguntas · Lección 4":lang==="pt"?"perguntas · Lição 4":"questions · Lesson 4 · ⭐ Premium"}</div>
              </div>
              <QuizComp questions={quiz} t={t} onComplete={(s)=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
            </>
          )}

          {/* DONE PHASE */}
          {phase==="done"&&(
            <div style={{paddingTop:10}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:64,marginBottom:10}}>🏅</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700}}>
                  +{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐
                </div>
              </div>
              <Card style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
                {(learned[lang]||learned.fr).map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}>
                    <span style={{color:C.green,fontWeight:700}}>✓</span>{pt}
                  </div>
                ))}
              </Card>
              <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(26,111,212,0.4)",marginBottom:10}}>
                {lang==="fr"?"LEÇON 5 — LE COMPAS & LES CAPS →":lang==="es"?"LECCIÓN 5 — LA BRÚJULA & LOS RUMBOS →":lang==="pt"?"LIÇÃO 5 — A BÚSSOLA & OS RUMOS →":"LESSON 5 — THE COMPASS & HEADINGS →"}
              </button>
              <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
