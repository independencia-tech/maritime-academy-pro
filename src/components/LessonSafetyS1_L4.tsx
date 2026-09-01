import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", result:"RÉSULTAT", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", result:"RESULT", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", result:"RESULTADO", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", result:"RESULTADO", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// ══════════════════════════════════════
// SVG 1 — FIRST-MINUTES CHECKLIST
// ══════════════════════════════════════
function ChecklistSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🛡️", color:C.gold2, label:{fr:"Sécurité personnelle",en:"Personal safety",es:"Seguridad personal",pt:"Segurança pessoal"},
      desc:{fr:"Avant d'aider quiconque : électricité, fumées, risque de chute, stabilité locale. Un sauveteur blessé devient une victime supplémentaire.",en:"Before helping anyone: electricity, smoke, fall risk, local stability. An injured rescuer becomes one more victim.",es:"Antes de ayudar a nadie: electricidad, humo, riesgo de caída, estabilidad local. Un rescatista herido se convierte en una víctima más.",pt:"Antes de ajudar alguém: eletricidade, fumo, risco de queda, estabilidade local. Um socorrista ferido torna-se mais uma vítima."} },
    { id:2, icon:"🔍", color:C.orange, label:{fr:"Évaluer les dangers",en:"Assess hazards",es:"Evaluar peligros",pt:"Avaliar perigos"},
      desc:{fr:"Feu, voie d'eau, blessés, risque structurel — un constat rapide, pas une analyse complète.",en:"Fire, flooding, injuries, structural risk — a quick assessment, not a full analysis.",es:"Fuego, vía de agua, heridos, riesgo estructural — una evaluación rápida, no un análisis completo.",pt:"Fogo, via de água, feridos, risco estrutural — uma avaliação rápida, não uma análise completa."} },
    { id:3, icon:"🚪", color:C.blue2, label:{fr:"Étanchéité",en:"Watertight integrity",es:"Estanqueidad",pt:"Estanqueidade"},
      desc:{fr:"Fermer portes et écoutilles par réflexe — contenir les dégâts avant de les combattre.",en:"Close doors and hatches by reflex — contain the damage before fighting it.",es:"Cerrar puertas y escotillas por reflejo — contener el daño antes de combatirlo.",pt:"Fechar portas e escotilhas por reflexo — conter o dano antes de o combater."} },
    { id:4, icon:"👥", color:C.teal, label:{fr:"Compter l'équipage",en:"Account for the crew",es:"Contar a la tripulación",pt:"Contar a tripulação"},
      desc:{fr:"Vérifier que chacun est informé et localisé — sans encore lancer la procédure complète d'abandon du navire.",en:"Verify everyone is informed and located — without yet launching the full abandon-ship procedure.",es:"Verificar que todos estén informados y localizados — sin lanzar aún el procedimiento completo de abandono del buque.",pt:"Verificar que todos estão informados e localizados — sem ainda lançar o procedimento completo de abandono do navio."} },
    { id:5, icon:"📻", color:C.red, label:{fr:"Mayday",en:"Mayday",es:"Mayday",pt:"Mayday"},
      desc:{fr:"Message complet, clair, structuré et calme — position, nature, assistance requise, personnes à bord.",en:"Full, clear, structured and calm message — position, nature, assistance required, persons on board.",es:"Mensaje completo, claro, estructurado y tranquilo — posición, naturaleza, asistencia requerida, personas a bordo.",pt:"Mensagem completa, clara, estruturada e calma — posição, natureza, assistência necessária, pessoas a bordo."} },
    { id:6, icon:"🤝", color:C.purple, label:{fr:"Coordination",en:"Coordination",es:"Coordinación",pt:"Coordenação"},
      desc:{fr:"Échanger avec l'autre navire — son équipage peut aussi être en danger. Organiser une assistance mutuelle si nécessaire.",en:"Exchange with the other vessel — its crew may also be in danger. Organize mutual assistance if needed.",es:"Intercambiar con el otro buque — su tripulación también puede estar en peligro. Organizar asistencia mutua si es necesario.",pt:"Trocar informações com o outro navio — a sua tripulação também pode estar em perigo. Organizar assistência mútua se necessário."} },
  ];
  const sel_ = sel!==null ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:8,background:`${s.color}22`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{s.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.color}}>{s.id}. {s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — MAYDAY STRUCTURE
// ══════════════════════════════════════
function MaydaySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, color:C.red, label:{fr:"MAYDAY x3",en:"MAYDAY x3",es:"MAYDAY x3",pt:"MAYDAY x3"},
      ex:{fr:"\"MAYDAY, MAYDAY, MAYDAY\"",en:"\"MAYDAY, MAYDAY, MAYDAY\"",es:"\"MAYDAY, MAYDAY, MAYDAY\"",pt:"\"MAYDAY, MAYDAY, MAYDAY\""} },
    { id:2, color:C.orange, label:{fr:"Identification",en:"Identification",es:"Identificación",pt:"Identificação"},
      ex:{fr:"\"Ici [nom du navire], indicatif [call sign]\"",en:"\"This is [vessel name], call sign [call sign]\"",es:"\"Aquí [nombre del buque], indicativo [call sign]\"",pt:"\"Aqui [nome do navio], indicativo [call sign]\""} },
    { id:3, color:C.gold2, label:{fr:"Position",en:"Position",es:"Posición",pt:"Posição"},
      ex:{fr:"\"Position [latitude/longitude ou relèvement/distance d'un point connu]\"",en:"\"Position [latitude/longitude or bearing/distance from a known point]\"",es:"\"Posición [latitud/longitud o marcación/distancia de un punto conocido]\"",pt:"\"Posição [latitude/longitude ou marcação/distância de um ponto conhecido]\""} },
    { id:4, color:C.blue2, label:{fr:"Nature de la détresse",en:"Nature of distress",es:"Naturaleza de la emergencia",pt:"Natureza da emergência"},
      ex:{fr:"\"Collision, voie d'eau à l'avant, situation sous contrôle / non maîtrisée\"",en:"\"Collision, flooding forward, situation under control / not under control\"",es:"\"Colisión, vía de agua en proa, situación bajo control / no controlada\"",pt:"\"Colisão, via de água à proa, situação sob controlo / não controlada\""} },
    { id:5, color:C.teal, label:{fr:"Assistance requise",en:"Assistance required",es:"Asistencia requerida",pt:"Assistência necessária"},
      ex:{fr:"\"Demandons assistance immédiate, remorqueur et moyens de lutte incendie\"",en:"\"Requesting immediate assistance, tug and firefighting support\"",es:"\"Solicitamos asistencia inmediata, remolcador y apoyo contraincendios\"",pt:"\"Solicitamos assistência imediata, rebocador e apoio de combate a incêndio\""} },
    { id:6, color:C.purple, label:{fr:"Personnes à bord",en:"Persons on board",es:"Personas a bordo",pt:"Pessoas a bordo"},
      ex:{fr:"\"[Nombre] personnes à bord, [nombre] blessées connues\"",en:"\"[Number] persons on board, [number] known injured\"",es:"\"[Número] personas a bordo, [número] heridos conocidos\"",pt:"\"[Número] pessoas a bordo, [número] feridos conhecidos\""} },
  ];
  const sel_ = sel!==null ? steps.find(s=>s.id===sel) : null;
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,cursor:"pointer",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`,
              marginLeft:(s.id-1)*6}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:`${s.color}22`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:s.color,flexShrink:0}}>{s.id}</div>
            <div style={{fontSize:11,fontWeight:700,color:s.color}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7,fontStyle:"italic"}}>{sel_.ex[lang]||sel_.ex.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"Le message doit rester clair, structuré et calme — même sous stress extrême, le ton influence directement la compréhension des secours.":
         lang==="en"?"The message must stay clear, structured and calm — even under extreme stress, tone directly affects how rescuers understand it.":
         lang==="es"?"El mensaje debe permanecer claro, estructurado y tranquilo — incluso bajo estrés extremo, el tono afecta directamente a la comprensión de los rescatistas.":
         "A mensagem deve permanecer clara, estruturada e calma — mesmo sob stress extremo, o tom afeta diretamente a compreensão dos socorristas."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — SHIP HAZARD MAP
// ══════════════════════════════════════
function HazardMapSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const zones = [
    { id:"engine", pos:{x:220,y:100}, color:C.orange, label:{fr:"Salle des machines",en:"Engine room",es:"Sala de máquinas",pt:"Casa das máquinas"},
      desc:{fr:"Vérifier fuite de carburant, risque électrique, présence de fumée avant d'y entrer.",en:"Check for fuel leaks, electrical risk, smoke presence before entering.",es:"Comprobar fugas de combustible, riesgo eléctrico, presencia de humo antes de entrar.",pt:"Verificar fugas de combustível, risco elétrico, presença de fumo antes de entrar."} },
    { id:"hull", pos:{x:80,y:100}, color:C.red, label:{fr:"Brèche de coque",en:"Hull breach",es:"Brecha de casco",pt:"Brecha no casco"},
      desc:{fr:"Évaluer la taille et la localisation de la voie d'eau, fermer les portes étanches adjacentes en priorité.",en:"Assess the size and location of the flooding, close adjacent watertight doors as a priority.",es:"Evaluar el tamaño y la ubicación de la vía de agua, cerrar las puertas estancas adyacentes con prioridad.",pt:"Avaliar o tamanho e a localização da via de água, fechar as portas estanques adjacentes com prioridade."} },
    { id:"cargo", pos:{x:150,y:60}, color:C.gold2, label:{fr:"Cargaison",en:"Cargo",es:"Carga",pt:"Carga"},
      desc:{fr:"Vérifier le déplacement ou l'endommagement de la cargaison, en particulier si dangereuse ou inflammable.",en:"Check for cargo shift or damage, especially if dangerous or flammable.",es:"Comprobar el desplazamiento o daño de la carga, especialmente si es peligrosa o inflamable.",pt:"Verificar o deslocamento ou dano da carga, especialmente se perigosa ou inflamável."} },
    { id:"crew", pos:{x:150,y:150}, color:C.teal, label:{fr:"Locaux équipage",en:"Crew quarters",es:"Alojamientos",pt:"Alojamentos"},
      desc:{fr:"Localiser et compter chaque membre d'équipage, identifier les blessés éventuels.",en:"Locate and account for every crew member, identify any injured.",es:"Localizar y contar a cada miembro de la tripulación, identificar posibles heridos.",pt:"Localizar e contar cada membro da tripulação, identificar eventuais feridos."} },
  ];
  const sel_ = sel ? zones.find(z=>z.id===sel) : null;
  return (
    <div>
      <svg width="100%" height="200" viewBox="0 0 300 200">
        <path d="M30,100 L50,70 L250,70 L270,100 L250,130 L50,130 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)"/>
        {zones.map(z=>(
          <g key={z.id} onClick={()=>setSel(sel===z.id?null:z.id)} style={{cursor:"pointer"}}>
            <circle cx={z.pos.x} cy={z.pos.y} r={sel===z.id?24:20} fill={sel===z.id?`${z.color}33`:"rgba(255,255,255,0.06)"} stroke={z.color} strokeWidth={sel===z.id?2.5:1.5}/>
          </g>
        ))}
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8}}>
        {zones.map(z=>(
          <div key={z.id} onClick={()=>setSel(sel===z.id?null:z.id)} style={{padding:"6px 8px",borderRadius:8,cursor:"pointer",textAlign:"center",background:sel===z.id?`${z.color}22`:"rgba(255,255,255,0.04)",border:`1px solid ${sel===z.id?z.color:"rgba(255,255,255,0.08)"}`,fontSize:10,fontWeight:700,color:sel===z.id?z.color:C.muted}}>{z.label[lang]||z.label.fr}</div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — FREQUENT ERRORS
// ══════════════════════════════════════
function ErrorsSVG({ lang }) {
  const [open, setOpen] = useState(null);
  const pairs = [
    { id:"p1", bad:{fr:"Retarder l'alerte pour \"être sûr avant de déranger tout le monde\"",en:"Delaying the alert to \"be sure before bothering everyone\"",es:"Retrasar la alerta para \"estar seguro antes de molestar a todos\"",pt:"Atrasar o alerta para \"ter a certeza antes de incomodar toda a gente\""},
      good:{fr:"Alerter immédiatement — une fausse alerte corrigée coûte bien moins cher qu'une alerte tardive.",en:"Alert immediately — a corrected false alarm costs far less than a late one.",es:"Alertar inmediatamente — una falsa alarma corregida cuesta mucho menos que una alerta tardía.",pt:"Alertar imediatamente — um falso alarme corrigido custa muito menos do que um alerta tardio."} },
    { id:"p2", bad:{fr:"Laisser une porte étanche ouverte \"le temps de vérifier ce qu'il y a de l'autre côté\"",en:"Leaving a watertight door open \"just to check what's on the other side\"",es:"Dejar una puerta estanca abierta \"solo para ver qué hay al otro lado\"",pt:"Deixar uma porta estanque aberta \"só para verificar o que há do outro lado\""},
      good:{fr:"Fermer par réflexe — contenir les dégâts avant de les combattre. La porte peut être rouverte ensuite si nécessaire.",en:"Close by reflex — contain the damage before fighting it. The door can be reopened later if needed.",es:"Cerrar por reflejo — contener el daño antes de combatirlo. La puerta puede volver a abrirse después si es necesario.",pt:"Fechar por reflexo — conter o dano antes de o combater. A porta pode ser reaberta depois se necessário."} },
  ];
  return (
    <div>
      {pairs.map(p=>(
        <div key={p.id} style={{marginBottom:10}}>
          <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:"rgba(192,57,43,0.08)",border:`1.5px solid ${C.red}33`,marginBottom:open===p.id?6:0}}>
            <div style={{fontSize:9,color:C.red,fontWeight:700,marginBottom:3}}>{lang==="fr"?"❌ ERREUR FRÉQUENTE":lang==="en"?"❌ FREQUENT ERROR":lang==="es"?"❌ ERROR FRECUENTE":"❌ ERRO FREQUENTE"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.bad[lang]||p.bad.fr}</div>
          </div>
          {open===p.id&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1.5px solid ${C.green}44`,animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>{lang==="fr"?"✅ BONNE PRATIQUE":lang==="en"?"✅ GOOD PRACTICE":lang==="es"?"✅ BUENA PRÁCTICA":"✅ BOA PRÁTICA"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.good[lang]||p.good.fr}</div>
          </div>}
        </div>
      ))}
      {!open&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:4}}>{lang==="fr"?"Touche une erreur pour voir la bonne pratique":lang==="en"?"Tap an error to see the good practice":lang==="es"?"Toca un error para ver la buena práctica":"Toque num erro para ver a boa prática"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — POST-COLLISION SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:"",q6:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b",q5:"a",q6:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Collision venant de se produire. Brèche de coque près de la salle des machines, fumée légère visible. Que fais-tu EN PREMIER ?\na) Courir directement vers la brèche pour évaluer les dégâts\nb) Vérifier rapidement ta propre sécurité (fumée, risque électrique) avant toute intervention\nc) Contacter immédiatement l'armateur"},
      {id:"q2",q:"Une porte étanche est encore ouverte près de la brèche. Que fais-tu ?\na) La fermer immédiatement par réflexe\nb) La laisser ouverte pour évaluer l'ampleur des dégâts\nc) Attendre l'ordre du capitaine"},
      {id:"q3",q:"Que dis-tu en PREMIER dans ton message Mayday ?\na) Le nombre de blessés\nb) Le nom de l'armateur\nc) \"MAYDAY, MAYDAY, MAYDAY\" puis l'identification du navire"},
      {id:"q4",q:"Deux membres d'équipage ne sont pas encore localisés. Que fais-tu ?\na) Attendre qu'ils se manifestent d'eux-mêmes\nb) Organiser immédiatement leur recherche et compter le reste de l'équipage\nc) Lancer directement la procédure d'abandon du navire"},
      {id:"q5",q:"Quelle erreur fréquente dois-tu éviter à tout prix dans ces premières minutes ?\na) Retarder l'alerte pour \"être sûr\" avant de déranger tout le monde\nb) Fermer les portes étanches trop vite\nc) Contacter l'autre navire trop tôt"},
      {id:"q6",q:"Quelle priorité ne doit JAMAIS être oubliée dans les cinq premières minutes après une collision ?\na) Documenter les dégâts en photo\nb) Informer l'armateur avant tout\nc) Ta propre sécurité avant celle des autres — un sauveteur blessé devient une victime supplémentaire"},
    ],
    en:[
      {id:"q1",q:"Collision just occurred. Hull breach near the engine room, light smoke visible. What do you do FIRST?\na) Run directly to the breach to assess the damage\nb) Quickly check your own safety (smoke, electrical risk) before any intervention\nc) Immediately contact the owner"},
      {id:"q2",q:"A watertight door is still open near the breach. What do you do?\na) Close it immediately by reflex\nb) Leave it open to assess the extent of the damage\nc) Wait for the Captain's order"},
      {id:"q3",q:"What do you say FIRST in your Mayday message?\na) The number of injured\nb) The owner's name\nc) \"MAYDAY, MAYDAY, MAYDAY\" then vessel identification"},
      {id:"q4",q:"Two crew members are not yet located. What do you do?\na) Wait for them to come forward on their own\nb) Immediately organize a search for them and account for the rest of the crew\nc) Launch the abandon-ship procedure directly"},
      {id:"q5",q:"Which frequent error must you avoid at all costs in these first minutes?\na) Delaying the alert to \"be sure\" before bothering everyone\nb) Closing watertight doors too quickly\nc) Contacting the other vessel too early"},
      {id:"q6",q:"Which priority must NEVER be forgotten in the first five minutes after a collision?\na) Photographing the damage for documentation\nb) Informing the owner before anything else\nc) Your own safety before others' — an injured rescuer becomes one more victim"},
    ],
    es:[
      {id:"q1",q:"Colisión recién ocurrida. Brecha de casco cerca de la sala de máquinas, humo ligero visible. ¿Qué haces PRIMERO?\na) Correr directamente hacia la brecha para evaluar los daños\nb) Verificar rápidamente tu propia seguridad (humo, riesgo eléctrico) antes de cualquier intervención\nc) Contactar inmediatamente al armador"},
      {id:"q2",q:"Una puerta estanca sigue abierta cerca de la brecha. ¿Qué haces?\na) Cerrarla inmediatamente por reflejo\nb) Dejarla abierta para evaluar la magnitud de los daños\nc) Esperar la orden del Capitán"},
      {id:"q3",q:"¿Qué dices PRIMERO en tu mensaje Mayday?\na) El número de heridos\nb) El nombre del armador\nc) \"MAYDAY, MAYDAY, MAYDAY\" y luego la identificación del buque"},
      {id:"q4",q:"Dos miembros de la tripulación aún no están localizados. ¿Qué haces?\na) Esperar a que se presenten por sí mismos\nb) Organizar inmediatamente su búsqueda y contar al resto de la tripulación\nc) Lanzar directamente el procedimiento de abandono del buque"},
      {id:"q5",q:"¿Qué error frecuente debes evitar a toda costa en estos primeros minutos?\na) Retrasar la alerta para \"estar seguro\" antes de molestar a todos\nb) Cerrar las puertas estancas demasiado rápido\nc) Contactar al otro buque demasiado pronto"},
      {id:"q6",q:"¿Qué prioridad NUNCA debe olvidarse en los primeros cinco minutos tras una colisión?\na) Fotografiar los daños para documentarlos\nb) Informar al armador antes que nada\nc) Tu propia seguridad antes que la de los demás — un rescatista herido se convierte en una víctima más"},
    ],
    pt:[
      {id:"q1",q:"Colisão acabou de ocorrer. Brecha no casco perto da casa das máquinas, fumo ligeiro visível. O que fazes PRIMEIRO?\na) Correr diretamente para a brecha para avaliar os danos\nb) Verificar rapidamente a tua própria segurança (fumo, risco elétrico) antes de qualquer intervenção\nc) Contactar imediatamente o armador"},
      {id:"q2",q:"Uma porta estanque ainda está aberta perto da brecha. O que fazes?\na) Fechá-la imediatamente por reflexo\nb) Deixá-la aberta para avaliar a extensão dos danos\nc) Esperar pela ordem do Comandante"},
      {id:"q3",q:"O que dizes PRIMEIRO na tua mensagem Mayday?\na) O número de feridos\nb) O nome do armador\nc) \"MAYDAY, MAYDAY, MAYDAY\" seguido da identificação do navio"},
      {id:"q4",q:"Dois membros da tripulação ainda não foram localizados. O que fazes?\na) Esperar que se apresentem por si próprios\nb) Organizar imediatamente a sua busca e contar o resto da tripulação\nc) Lançar diretamente o procedimento de abandono do navio"},
      {id:"q5",q:"Que erro frequente deves evitar a todo custo nestes primeiros minutos?\na) Atrasar o alerta para \"ter a certeza\" antes de incomodar toda a gente\nb) Fechar as portas estanques depressa demais\nc) Contactar o outro navio cedo demais"},
      {id:"q6",q:"Que prioridade NUNCA deve ser esquecida nos primeiros cinco minutos após uma colisão?\na) Fotografar os danos para documentação\nb) Informar o armador antes de tudo\nc) A tua própria segurança antes da dos outros — um socorrista ferido torna-se mais uma vítima"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  return (
    <div>
      {list.map((q,i)=>(
        <div key={q.id} style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.white,marginBottom:6,lineHeight:1.6,whiteSpace:"pre-line",fontWeight:600}}>{i+1}. {q.q}</div>
          <input type="text" value={ans[q.id]} onChange={e=>setAns(a=>({...a,[q.id]:e.target.value}))} placeholder="a, b ou c"
            style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${showC?(chk(q.id,ans[q.id])?C.green:C.red):C.border}`,color:C.white,fontSize:18,fontFamily:"monospace",fontWeight:700,textAlign:"center",boxSizing:"border-box"}}/>
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ → ${correct[q.id]}`}</div>}
        </div>
      ))}
      {showC&&<div style={{padding:"12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.6,marginBottom:10}}>
        {lang==="fr"?"✅ Q1: b — ta sécurité avant toute intervention\n✅ Q2: a — fermer par réflexe, contenir avant de combattre\n✅ Q3: c — MAYDAY x3 puis identification, toujours dans cet ordre\n✅ Q4: b — chercher et compter immédiatement, sans encore abandonner le navire\n✅ Q5: a — retarder l'alerte est plus dangereux qu'une fausse alerte\n✅ Q6: c — la sécurité personnelle reste la priorité absolue":
         lang==="en"?"✅ Q1: b — your own safety before any intervention\n✅ Q2: a — close by reflex, contain before fighting\n✅ Q3: c — MAYDAY x3 then identification, always in this order\n✅ Q4: b — search and account immediately, without yet abandoning ship\n✅ Q5: a — delaying the alert is more dangerous than a false alarm\n✅ Q6: c — personal safety remains the absolute priority":
         "✅ Q1: b · Q2: a · Q3: c · Q4: b · Q5: a · Q6: c"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — BALTIC ACE / CORVUS J
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Baltic Ace — Corvus J, Mer du Nord (2012)",teaser:"Transporteur de véhicules · Porte-conteneurs · Naufrage en moins de 15 minutes · 11 morts",
      what:"Par tempête de neige et mer forte, le transporteur de véhicules Baltic Ace entre en collision avec le porte-conteneurs Corvus J au large des Pays-Bas. Le Baltic Ace commence immédiatement à embarquer de l'eau et coule en moins de 15 minutes — un temps si court que plusieurs membres d'équipage n'ont pas eu le temps d'enfiler leur combinaison de survie. Sur les 24 marins à bord, 13 parviennent à rejoindre les radeaux de sauvetage et sont secourus par hélicoptère ; 11 périssent. Le Corvus J, endommagé à l'étrave mais non menacé de couler, participe aux opérations de secours.",
      cause:"• Vitesse d'envahissement extrêmement rapide, laissant une fenêtre de décision très courte\n• Combinaisons de survie non enfilées à temps par plusieurs membres d'équipage\n• Appel de détresse marqué par le stress intense de la situation, selon des témoins ayant capté la communication radio\n• Erreur de communication/manœuvre entre les deux navires à l'origine de la collision",
      lessons:"✓ Certaines situations évoluent en quelques minutes seulement — chaque geste des premières minutes compte\n✓ La rapidité d'évaluation et de décision peut faire la différence entre survie et tragédie\n✓ Même sous stress extrême, un message clair et structuré reste essentiel pour orienter les secours\n✓ Le navire abordeur (ici le Corvus J) peut jouer un rôle actif dans le sauvetage — la coordination entre navires est vitale",
      link:"🔗 Distinct d'Andrea Doria (L1), USS John S. McCain (L2) et Sanchi/CF Crystal (L3) : ici, l'angle est la vitesse d'exécution des tout premiers gestes quand la fenêtre de décision se compte en minutes, pas en heures."},
    en:{title:"Baltic Ace — Corvus J, North Sea (2012)",teaser:"Car carrier · Container ship · Sank in under 15 minutes · 11 dead",
      what:"During a snowstorm with rough seas, the car carrier Baltic Ace collided with the container ship Corvus J off the coast of the Netherlands. The Baltic Ace immediately began taking on water and sank in under 15 minutes — so fast that several crew members had no time to put on survival suits. Of the 24 sailors on board, 13 managed to reach life rafts and were rescued by helicopter; 11 died. The Corvus J, damaged at the bow but not in danger of sinking, took part in the rescue operation.",
      cause:"• Extremely rapid flooding, leaving a very short decision window\n• Survival suits not put on in time by several crew members\n• Distress call marked by intense stress, according to witnesses who picked up the radio communication\n• Communication/maneuvering error between the two vessels at the origin of the collision",
      lessons:"✓ Some situations unfold in just a few minutes — every action in the first minutes counts\n✓ Speed of assessment and decision can make the difference between survival and tragedy\n✓ Even under extreme stress, a clear and structured message remains essential to guide rescuers\n✓ The colliding vessel (here Corvus J) can play an active role in rescue — coordination between vessels is vital",
      link:"🔗 Distinct from Andrea Doria (L1), USS John S. McCain (L2) and Sanchi/CF Crystal (L3): here the angle is the speed of execution of the very first actions when the decision window is measured in minutes, not hours."},
    es:{title:"Baltic Ace — Corvus J, Mar del Norte (2012)",teaser:"Transportador de vehículos · Portacontenedores · Se hundió en menos de 15 minutos · 11 muertos",
      what:"Durante una tormenta de nieve con mar gruesa, el transportador de vehículos Baltic Ace colisionó con el portacontenedores Corvus J frente a la costa de los Países Bajos. El Baltic Ace comenzó inmediatamente a embarcar agua y se hundió en menos de 15 minutos — un tiempo tan corto que varios tripulantes no tuvieron tiempo de ponerse los trajes de supervivencia. De los 24 marineros a bordo, 13 lograron llegar a los botes salvavidas y fueron rescatados por helicóptero; 11 murieron. El Corvus J, dañado en la proa pero sin riesgo de hundirse, participó en las operaciones de rescate.",
      cause:"• Velocidad de inundación extremadamente rápida, dejando una ventana de decisión muy corta\n• Trajes de supervivencia no puestos a tiempo por varios tripulantes\n• Llamada de socorro marcada por el estrés intenso de la situación, según testigos que captaron la comunicación radial\n• Error de comunicación/maniobra entre los dos buques en el origen de la colisión",
      lessons:"✓ Algunas situaciones evolucionan en solo unos minutos — cada acción de los primeros minutos cuenta\n✓ La rapidez de evaluación y decisión puede marcar la diferencia entre sobrevivir y una tragedia\n✓ Incluso bajo estrés extremo, un mensaje claro y estructurado sigue siendo esencial para orientar el rescate\n✓ El buque que colisiona (aquí el Corvus J) puede desempeñar un papel activo en el rescate",
      link:"🔗 Distinto de Andrea Doria (L1), USS John S. McCain (L2) y Sanchi/CF Crystal (L3): aquí el ángulo es la velocidad de ejecución de las primerísimas acciones cuando la ventana de decisión se mide en minutos, no en horas."},
    pt:{title:"Baltic Ace — Corvus J, Mar do Norte (2012)",teaser:"Transportador de veículos · Porta-contentores · Afundou em menos de 15 minutos · 11 mortos",
      what:"Durante uma tempestade de neve com mar agitado, o transportador de veículos Baltic Ace colidiu com o porta-contentores Corvus J ao largo da costa dos Países Baixos. O Baltic Ace começou imediatamente a embarcar água e afundou-se em menos de 15 minutos — um tempo tão curto que vários tripulantes não tiveram tempo de vestir os fatos de sobrevivência. Dos 24 marítimos a bordo, 13 conseguiram chegar às jangadas salva-vidas e foram resgatados por helicóptero; 11 morreram. O Corvus J, danificado na proa mas sem risco de afundar, participou nas operações de resgate.",
      cause:"• Velocidade de alagamento extremamente rápida, deixando uma janela de decisão muito curta\n• Fatos de sobrevivência não vestidos a tempo por vários tripulantes\n• Chamada de socorro marcada pelo stress intenso da situação, segundo testemunhas que captaram a comunicação rádio\n• Erro de comunicação/manobra entre os dois navios na origem da colisão",
      lessons:"✓ Algumas situações evoluem em apenas alguns minutos — cada ação dos primeiros minutos conta\n✓ A rapidez de avaliação e decisão pode fazer a diferença entre sobreviver e uma tragédia\n✓ Mesmo sob stress extremo, uma mensagem clara e estruturada continua a ser essencial para orientar o resgate\n✓ O navio abalroador (aqui o Corvus J) pode desempenhar um papel ativo no resgate",
      link:"🔗 Distinto do Andrea Doria (L1), USS John S. McCain (L2) e Sanchi/CF Crystal (L3): aqui o ângulo é a velocidade de execução das primeiríssimas ações quando a janela de decisão se mede em minutos, não em horas."},
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
        <div style={{fontSize:11,color:C.red,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CAUSES":lang==="en"?"CAUSES":lang==="es"?"CAUSAS":"CAUSAS"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// ══════════════════════════════════════
// BANK — 15 QUESTIONS (min. 5 scenario-based)
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Pourquoi faut-il vérifier sa propre sécurité avant d'aider les autres après une collision ?",opts:["Ce n'est pas important, aider prime toujours","Un sauveteur blessé devient une victime supplémentaire, ce qui aggrave la situation globale","C'est une règle purement administrative","Cela ne concerne que le capitaine"],correct:1,expl:"Un marin blessé en tentant de secourir quelqu'un sans avoir vérifié sa propre sécurité ajoute une victime à gérer au lieu d'en sauver une."},
    {q:"Que signifie 'contain the damage before fighting the damage' pour l'étanchéité ?",opts:["Il faut d'abord éteindre l'incendie avant de fermer les portes","Fermer les portes et écoutilles par réflexe pour empêcher l'aggravation, avant de commencer les actions correctives","Il ne faut jamais fermer de porte en urgence","Cela concerne uniquement les cargos"],correct:1,expl:"Le réflexe de fermeture immédiate empêche la propagation des dégâts, ce qui doit précéder toute tentative de réparation ou de lutte active."},
    {q:"Collision venant de se produire, fumée légère visible près de toi. Que fais-tu en premier ?",opts:["Courir vers la source de fumée sans vérifier les risques","Évaluer rapidement ta propre sécurité avant toute intervention","Attendre les instructions sans bouger","Filmer la situation"],correct:1,expl:"Le réflexe de sécurité personnelle prime sur l'intervention immédiate, même face à un danger apparent."},
    {q:"Quel est le premier élément à annoncer dans un message Mayday ?",opts:["Le nombre de blessés","\"MAYDAY, MAYDAY, MAYDAY\" suivi de l'identification du navire","La météo locale","Le nom de l'armateur"],correct:1,expl:"La structure standard du Mayday commence toujours par le triple \"MAYDAY\" suivi immédiatement de l'identification du navire."},
    {q:"Pourquoi le ton d'un message Mayday est-il aussi important que son contenu ?",opts:["Le ton n'a aucune importance","Un message clair, structuré et calme, même sous stress, facilite la compréhension par les secours","Il faut toujours parler vite pour gagner du temps","Le ton ne concerne que la formation officielle"],correct:1,expl:"Un message confus ou paniqué peut retarder la compréhension et donc la réponse des secours — la clarté reste essentielle même sous pression extrême."},
    {q:"Deux membres d'équipage manquent à l'appel après une collision. Quelle est la priorité ?",opts:["Attendre qu'ils réapparaissent d'eux-mêmes","Organiser immédiatement leur recherche et compter le reste de l'équipage","Lancer directement l'abandon du navire","Continuer les tâches habituelles"],correct:1,expl:"Le comptage et la recherche immédiate font partie des premiers gestes essentiels, sans pour autant déclencher une procédure d'abandon complète si elle n'est pas encore nécessaire."},
    {q:"Pourquoi la coordination avec le navire abordeur va-t-elle au-delà du simple échange d'informations ?",opts:["Elle ne sert qu'à des fins administratives","Les deux navires peuvent être victimes, et la coordination permet une assistance mutuelle et évite une seconde urgence","Elle est obligatoire uniquement en cas de faute avérée","Elle ne concerne que les gros navires"],correct:1,expl:"L'autre navire peut lui aussi être en difficulté — connaître son état permet d'anticiper une assistance mutuelle et d'éviter qu'une nouvelle urgence n'apparaisse."},
    {q:"Quelle est l'erreur la plus dangereuse concernant le déclenchement de l'alerte après une collision ?",opts:["Alerter trop vite, ce qui dérange l'équipage inutilement","Retarder l'alerte pour être sûr avant de déranger tout le monde","Alerter deux fois par sécurité","Utiliser plusieurs canaux de communication"],correct:1,expl:"Une fausse alerte corrigée coûte bien moins cher en vies humaines qu'une alerte tardive face à une situation qui s'aggrave rapidement."},
    {q:"Dans le cas Baltic Ace, en combien de temps le navire a-t-il coulé ?",opts:["Plusieurs heures","Moins de 15 minutes","Une journée entière","Il n'a jamais coulé"],correct:1,expl:"Le naufrage extrêmement rapide (moins de 15 minutes) illustre pourquoi les tout premiers gestes doivent être immédiats et sans hésitation."},
    {q:"Pourquoi plusieurs membres d'équipage du Baltic Ace n'ont-ils pas pu enfiler leur combinaison de survie ?",opts:["Les combinaisons étaient défectueuses","Le naufrage a été trop rapide pour laisser le temps de les enfiler","Ils ne savaient pas où elles se trouvaient","Ce n'était pas obligatoire à bord"],correct:1,expl:"La vitesse d'envahissement a laissé une fenêtre de temps extrêmement courte, illustrant l'importance de décisions rapides dans les tout premiers instants."},
    {q:"Que doit vérifier en priorité un marin avant d'entrer dans une salle des machines endommagée ?",opts:["La propreté du sol","Fuite de carburant, risque électrique, présence de fumée","La température ambiante uniquement","Rien, il faut entrer immédiatement pour évaluer"],correct:1,expl:"Ces vérifications rapides de sécurité personnelle doivent précéder toute entrée dans une zone à risque, conformément au principe de protection personnelle avant intervention."},
    {q:"L4 s'arrête à quelle étape, sans entrer dans la procédure complète correspondante ?",opts:["L'évaluation des dangers","L'abandon du navire et les embarcations de sauvetage (réservés à un futur module)","Le Mayday","La fermeture des portes étanches"],correct:1,expl:"L4 couvre les tout premiers gestes après collision ; la procédure complète d'abandon du navire et l'usage des embarcations appartiennent au futur module dédié aux moyens de sauvetage."},
    {q:"Quelle est la différence entre le message VHF de L3 et le Mayday de L4 ?",opts:["Il n'y a aucune différence","L3 utilise un message ultra-court d'alerte avant l'impact, L4 utilise un Mayday complet et structuré après l'impact confirmé","L4 ne nécessite aucune communication radio","L3 concerne uniquement les cas d'incendie"],correct:1,expl:"L3 traite de la communication minimale dans les toutes dernières secondes ; L4 traite du message de détresse complet une fois la collision confirmée."},
    {q:"Quel est l'objectif principal de la check-list des premières minutes (sécurité, dangers, étanchéité, équipage, Mayday, coordination) ?",opts:["Remplir une formalité administrative","Structurer l'action pour ne perdre aucun temps utile dans une fenêtre souvent très courte","Remplacer la formation incendie complète","Uniquement informer l'armateur"],correct:1,expl:"La check-list permet d'agir vite et dans le bon ordre sans perdre de temps à réfléchir à chaque étape en pleine urgence, comme l'illustre le cas Baltic Ace."},
    {q:"Quel est l'objectif principal de la leçon L4 dans le Safety Department ?",opts:["Réexpliquer la lutte contre l'incendie en détail","Structurer les tout premiers gestes essentiels dans les minutes qui suivent une collision confirmée","Étudier la stabilité du navire en profondeur","Réexpliquer les règles de barre COLREG"],correct:1,expl:"L4 se concentre exclusivement sur l'action pratique dans la fenêtre critique des premières minutes, sans réenseigner la lutte incendie, la stabilité ou COLREG déjà couverts ailleurs."},
  ],
  en:[
    {q:"Why must you check your own safety before helping others after a collision?",opts:["It doesn't matter, helping always comes first","An injured rescuer becomes one more victim, worsening the overall situation","It's purely an administrative rule","It only concerns the Captain"],correct:1,expl:"A sailor injured while trying to rescue someone without checking their own safety first adds a victim to manage instead of saving one."},
    {q:"What does 'contain the damage before fighting the damage' mean for watertight integrity?",opts:["You must first extinguish the fire before closing doors","Close doors and hatches by reflex to prevent worsening, before starting corrective actions","You should never close a door in an emergency","It only concerns cargo ships"],correct:1,expl:"The immediate closing reflex prevents damage from spreading, which must precede any repair or active firefighting attempt."},
    {q:"Collision just occurred, light smoke visible near you. What do you do first?",opts:["Run toward the smoke source without checking risks","Quickly assess your own safety before any intervention","Wait for instructions without moving","Film the situation"],correct:1,expl:"The personal safety reflex takes priority over immediate intervention, even facing an apparent danger."},
    {q:"What is the first element to announce in a Mayday message?",opts:["The number of injured","\"MAYDAY, MAYDAY, MAYDAY\" followed by vessel identification","The local weather","The owner's name"],correct:1,expl:"The standard Mayday structure always begins with the triple \"MAYDAY\" followed immediately by vessel identification."},
    {q:"Why is the tone of a Mayday message as important as its content?",opts:["Tone doesn't matter at all","A clear, structured and calm message, even under stress, makes it easier for rescuers to understand","You must always speak fast to save time","Tone only concerns official training"],correct:1,expl:"A confused or panicked message can delay understanding and thus the rescue response — clarity remains essential even under extreme pressure."},
    {q:"Two crew members are missing after a collision. What is the priority?",opts:["Wait for them to reappear on their own","Immediately organize a search for them and account for the rest of the crew","Launch the abandon-ship procedure directly","Continue routine tasks"],correct:1,expl:"Immediate counting and searching are essential first actions, without necessarily triggering a full abandon-ship procedure if not yet needed."},
    {q:"Why does coordination with the colliding vessel go beyond simple information exchange?",opts:["It only serves administrative purposes","Both vessels may be victims, and coordination allows mutual assistance and avoids a second emergency","It is only mandatory in case of proven fault","It only concerns large vessels"],correct:1,expl:"The other vessel may also be in difficulty — knowing its status allows anticipating mutual assistance and avoiding a new emergency arising."},
    {q:"What is the most dangerous error regarding triggering the alert after a collision?",opts:["Alerting too fast, unnecessarily disturbing the crew","Delaying the alert to be sure before disturbing everyone","Alerting twice for safety","Using multiple communication channels"],correct:1,expl:"A corrected false alarm costs far less in human lives than a late alert facing a rapidly worsening situation."},
    {q:"In the Baltic Ace case, how long did it take for the vessel to sink?",opts:["Several hours","Under 15 minutes","A full day","It never sank"],correct:1,expl:"The extremely fast sinking (under 15 minutes) illustrates why the very first actions must be immediate and without hesitation."},
    {q:"Why couldn't several Baltic Ace crew members put on their survival suits?",opts:["The suits were defective","The sinking was too fast to leave time to put them on","They didn't know where they were","It wasn't mandatory on board"],correct:1,expl:"The speed of flooding left an extremely short time window, illustrating the importance of fast decisions in the very first moments."},
    {q:"What must a sailor check first before entering a damaged engine room?",opts:["The cleanliness of the floor","Fuel leak, electrical risk, presence of smoke","Only the ambient temperature","Nothing, must enter immediately to assess"],correct:1,expl:"These quick personal safety checks must precede any entry into a risk area, per the principle of self-protection before intervention."},
    {q:"L4 stops at which step, without entering the corresponding full procedure?",opts:["Hazard assessment","Abandoning ship and lifeboats (reserved for a future module)","The Mayday","Closing watertight doors"],correct:1,expl:"L4 covers the very first actions after a collision; the full abandon-ship procedure and use of lifeboats belong to a future dedicated module."},
    {q:"What is the difference between L3's VHF message and L4's Mayday?",opts:["There is no difference","L3 uses an ultra-short alert message before impact, L4 uses a full structured Mayday after the collision is confirmed","L4 requires no radio communication","L3 only concerns fire cases"],correct:1,expl:"L3 deals with minimal communication in the very final seconds; L4 deals with the full distress message once the collision is confirmed."},
    {q:"What is the main goal of the first-minutes checklist (safety, hazards, watertight integrity, crew, Mayday, coordination)?",opts:["Fulfilling an administrative formality","Structuring the action so no useful time is lost in an often very short window","Replacing full firefighting training","Only informing the owner"],correct:1,expl:"The checklist allows acting quickly and in the right order without wasting time thinking through each step mid-emergency, as illustrated by the Baltic Ace case."},
    {q:"What is the main goal of lesson L4 in the Safety Department?",opts:["Re-explain firefighting in detail","Structure the essential very first actions in the minutes following a confirmed collision","Study vessel stability in depth","Re-explain COLREG steering rules"],correct:1,expl:"L4 focuses exclusively on practical action in the critical first-minutes window, without re-teaching firefighting, stability, or COLREG already covered elsewhere."},
  ],
  es:[
    {q:"¿Por qué hay que verificar la propia seguridad antes de ayudar a otros tras una colisión?",opts:["No importa, ayudar siempre es lo primero","Un rescatista herido se convierte en una víctima más, agravando la situación general","Es una regla puramente administrativa","Solo concierne al Capitán"],correct:1,expl:"Un marino herido al intentar rescatar a alguien sin verificar antes su propia seguridad añade una víctima que gestionar en lugar de salvar una."},
    {q:"¿Qué significa 'contain the damage before fighting the damage' para la estanqueidad?",opts:["Hay que apagar primero el incendio antes de cerrar puertas","Cerrar puertas y escotillas por reflejo para evitar que empeore, antes de iniciar acciones correctivas","Nunca se debe cerrar una puerta en una emergencia","Solo concierne a los buques de carga"],correct:1,expl:"El reflejo de cierre inmediato evita que el daño se propague, lo cual debe preceder a cualquier intento de reparación o lucha activa."},
    {q:"Colisión recién ocurrida, humo ligero visible cerca de ti. ¿Qué haces primero?",opts:["Correr hacia la fuente de humo sin comprobar riesgos","Evaluar rápidamente tu propia seguridad antes de cualquier intervención","Esperar instrucciones sin moverte","Filmar la situación"],correct:1,expl:"El reflejo de seguridad personal prima sobre la intervención inmediata, incluso ante un peligro aparente."},
    {q:"¿Cuál es el primer elemento a anunciar en un mensaje Mayday?",opts:["El número de heridos","\"MAYDAY, MAYDAY, MAYDAY\" seguido de la identificación del buque","El tiempo local","El nombre del armador"],correct:1,expl:"La estructura estándar del Mayday siempre comienza con el triple \"MAYDAY\" seguido inmediatamente de la identificación del buque."},
    {q:"¿Por qué el tono de un mensaje Mayday es tan importante como su contenido?",opts:["El tono no importa en absoluto","Un mensaje claro, estructurado y tranquilo, incluso bajo estrés, facilita la comprensión de los rescatistas","Siempre hay que hablar rápido para ganar tiempo","El tono solo concierne a la formación oficial"],correct:1,expl:"Un mensaje confuso o en pánico puede retrasar la comprensión y por tanto la respuesta de rescate — la claridad sigue siendo esencial incluso bajo presión extrema."},
    {q:"Faltan dos tripulantes tras una colisión. ¿Cuál es la prioridad?",opts:["Esperar a que reaparezcan por sí mismos","Organizar inmediatamente su búsqueda y contar al resto de la tripulación","Lanzar directamente el abandono del buque","Continuar con las tareas habituales"],correct:1,expl:"El conteo y la búsqueda inmediata son acciones esenciales de los primeros minutos, sin necesariamente activar un procedimiento completo de abandono si aún no es necesario."},
    {q:"¿Por qué la coordinación con el buque que colisiona va más allá del simple intercambio de información?",opts:["Solo sirve para fines administrativos","Ambos buques pueden ser víctimas, y la coordinación permite asistencia mutua y evita una segunda emergencia","Solo es obligatoria en caso de culpa comprobada","Solo concierne a los buques grandes"],correct:1,expl:"El otro buque también puede estar en dificultades — conocer su estado permite anticipar la asistencia mutua y evitar que surja una nueva emergencia."},
    {q:"¿Cuál es el error más peligroso respecto a activar la alerta tras una colisión?",opts:["Alertar demasiado rápido, molestando innecesariamente a la tripulación","Retrasar la alerta para estar seguro antes de molestar a todos","Alertar dos veces por seguridad","Usar varios canales de comunicación"],correct:1,expl:"Una falsa alarma corregida cuesta mucho menos en vidas humanas que una alerta tardía ante una situación que empeora rápidamente."},
    {q:"En el caso Baltic Ace, ¿en cuánto tiempo se hundió el buque?",opts:["Varias horas","Menos de 15 minutos","Un día entero","Nunca se hundió"],correct:1,expl:"El hundimiento extremadamente rápido (menos de 15 minutos) ilustra por qué las primerísimas acciones deben ser inmediatas y sin dudar."},
    {q:"¿Por qué varios tripulantes del Baltic Ace no pudieron ponerse el traje de supervivencia?",opts:["Los trajes estaban defectuosos","El hundimiento fue demasiado rápido para dar tiempo a ponérselos","No sabían dónde estaban","No era obligatorio a bordo"],correct:1,expl:"La velocidad de inundación dejó una ventana de tiempo extremadamente corta, ilustrando la importancia de decisiones rápidas en los primeros instantes."},
    {q:"¿Qué debe comprobar primero un marino antes de entrar en una sala de máquinas dañada?",opts:["La limpieza del suelo","Fuga de combustible, riesgo eléctrico, presencia de humo","Solo la temperatura ambiente","Nada, hay que entrar inmediatamente para evaluar"],correct:1,expl:"Estas comprobaciones rápidas de seguridad personal deben preceder a cualquier entrada en una zona de riesgo, según el principio de autoprotección antes de intervenir."},
    {q:"¿En qué etapa se detiene L4, sin entrar en el procedimiento completo correspondiente?",opts:["La evaluación de peligros","El abandono del buque y los botes salvavidas (reservados a un futuro módulo)","El Mayday","El cierre de puertas estancas"],correct:1,expl:"L4 cubre las primerísimas acciones tras una colisión; el procedimiento completo de abandono del buque y el uso de botes pertenecen a un futuro módulo dedicado."},
    {q:"¿Cuál es la diferencia entre el mensaje VHF de L3 y el Mayday de L4?",opts:["No hay ninguna diferencia","L3 usa un mensaje ultracorto de alerta antes del impacto, L4 usa un Mayday completo y estructurado tras confirmarse la colisión","L4 no requiere comunicación radial","L3 solo concierne casos de incendio"],correct:1,expl:"L3 trata de la comunicación mínima en los últimos segundos; L4 trata del mensaje de socorro completo una vez confirmada la colisión."},
    {q:"¿Cuál es el objetivo principal de la lista de los primeros minutos (seguridad, peligros, estanqueidad, tripulación, Mayday, coordinación)?",opts:["Cumplir una formalidad administrativa","Estructurar la acción para no perder tiempo útil en una ventana a menudo muy corta","Sustituir la formación completa contra incendios","Solo informar al armador"],correct:1,expl:"La lista permite actuar rápido y en el orden correcto sin perder tiempo pensando en cada paso en plena emergencia, como ilustra el caso Baltic Ace."},
    {q:"¿Cuál es el objetivo principal de la lección L4 en el Safety Department?",opts:["Reexplicar la lucha contra incendios en detalle","Estructurar las primerísimas acciones esenciales en los minutos tras una colisión confirmada","Estudiar la estabilidad del buque en profundidad","Reexplicar las reglas de gobierno COLREG"],correct:1,expl:"L4 se centra exclusivamente en la acción práctica en la ventana crítica de los primeros minutos."},
  ],
  pt:[
    {q:"Por que é preciso verificar a própria segurança antes de ajudar outros após uma colisão?",opts:["Não importa, ajudar vem sempre primeiro","Um socorrista ferido torna-se mais uma vítima, agravando a situação geral","É uma regra puramente administrativa","Só diz respeito ao Comandante"],correct:1,expl:"Um marítimo ferido ao tentar socorrer alguém sem verificar antes a sua própria segurança acrescenta uma vítima a gerir em vez de salvar uma."},
    {q:"O que significa 'contain the damage before fighting the damage' para a estanqueidade?",opts:["É preciso apagar primeiro o incêndio antes de fechar portas","Fechar portas e escotilhas por reflexo para evitar o agravamento, antes de iniciar ações corretivas","Nunca se deve fechar uma porta numa emergência","Só diz respeito a navios de carga"],correct:1,expl:"O reflexo de fecho imediato impede a propagação do dano, o que deve preceder qualquer tentativa de reparação ou combate ativo."},
    {q:"Colisão acabou de ocorrer, fumo ligeiro visível perto de ti. O que fazes primeiro?",opts:["Correr para a fonte de fumo sem verificar riscos","Avaliar rapidamente a tua própria segurança antes de qualquer intervenção","Esperar instruções sem te mexeres","Filmar a situação"],correct:1,expl:"O reflexo de segurança pessoal tem prioridade sobre a intervenção imediata, mesmo perante um perigo aparente."},
    {q:"Qual é o primeiro elemento a anunciar numa mensagem Mayday?",opts:["O número de feridos","\"MAYDAY, MAYDAY, MAYDAY\" seguido da identificação do navio","O tempo local","O nome do armador"],correct:1,expl:"A estrutura padrão do Mayday começa sempre com o triplo \"MAYDAY\" seguido imediatamente da identificação do navio."},
    {q:"Por que o tom de uma mensagem Mayday é tão importante quanto o seu conteúdo?",opts:["O tom não importa nada","Uma mensagem clara, estruturada e calma, mesmo sob stress, facilita a compreensão pelos socorristas","É preciso falar sempre rápido para ganhar tempo","O tom só diz respeito à formação oficial"],correct:1,expl:"Uma mensagem confusa ou em pânico pode atrasar a compreensão e portanto a resposta de socorro — a clareza continua essencial mesmo sob pressão extrema."},
    {q:"Faltam dois tripulantes após uma colisão. Qual é a prioridade?",opts:["Esperar que reapareçam por si próprios","Organizar imediatamente a sua busca e contar o resto da tripulação","Lançar diretamente o abandono do navio","Continuar as tarefas habituais"],correct:1,expl:"A contagem e a busca imediata são ações essenciais dos primeiros minutos, sem necessariamente acionar um procedimento completo de abandono se ainda não for necessário."},
    {q:"Por que a coordenação com o navio abalroador vai além da simples troca de informação?",opts:["Só serve para fins administrativos","Ambos os navios podem ser vítimas, e a coordenação permite assistência mútua e evita uma segunda emergência","Só é obrigatória em caso de culpa comprovada","Só diz respeito a navios grandes"],correct:1,expl:"O outro navio também pode estar em dificuldade — conhecer o seu estado permite antecipar assistência mútua e evitar que surja uma nova emergência."},
    {q:"Qual é o erro mais perigoso quanto a acionar o alerta após uma colisão?",opts:["Alertar depressa demais, incomodando desnecessariamente a tripulação","Atrasar o alerta para ter a certeza antes de incomodar toda a gente","Alertar duas vezes por segurança","Usar vários canais de comunicação"],correct:1,expl:"Um falso alarme corrigido custa muito menos em vidas humanas do que um alerta tardio perante uma situação que piora rapidamente."},
    {q:"No caso Baltic Ace, em quanto tempo o navio afundou?",opts:["Várias horas","Menos de 15 minutos","Um dia inteiro","Nunca afundou"],correct:1,expl:"O afundamento extremamente rápido (menos de 15 minutos) ilustra por que as primeiríssimas ações devem ser imediatas e sem hesitação."},
    {q:"Por que vários tripulantes do Baltic Ace não conseguiram vestir o fato de sobrevivência?",opts:["Os fatos estavam defeituosos","O afundamento foi rápido demais para dar tempo de os vestir","Não sabiam onde estavam","Não era obrigatório a bordo"],correct:1,expl:"A velocidade do alagamento deixou uma janela de tempo extremamente curta, ilustrando a importância de decisões rápidas nos primeiros instantes."},
    {q:"O que deve um marítimo verificar primeiro antes de entrar numa casa das máquinas danificada?",opts:["A limpeza do chão","Fuga de combustível, risco elétrico, presença de fumo","Só a temperatura ambiente","Nada, deve entrar imediatamente para avaliar"],correct:1,expl:"Estas verificações rápidas de segurança pessoal devem preceder qualquer entrada numa zona de risco, segundo o princípio da autoproteção antes da intervenção."},
    {q:"Em que etapa L4 para, sem entrar no procedimento completo correspondente?",opts:["A avaliação de perigos","O abandono do navio e as jangadas salva-vidas (reservados a um futuro módulo)","O Mayday","O fecho das portas estanques"],correct:1,expl:"L4 cobre as primeiríssimas ações após uma colisão; o procedimento completo de abandono do navio e o uso de jangadas pertencem a um futuro módulo dedicado."},
    {q:"Qual é a diferença entre a mensagem VHF de L3 e o Mayday de L4?",opts:["Não há diferença nenhuma","L3 usa uma mensagem ultracurta de alerta antes do impacto, L4 usa um Mayday completo e estruturado após a colisão confirmada","L4 não requer comunicação rádio","L3 só diz respeito a casos de incêndio"],correct:1,expl:"L3 trata da comunicação mínima nos últimos segundos; L4 trata da mensagem de socorro completa após a colisão confirmada."},
    {q:"Qual é o objetivo principal da checklist dos primeiros minutos (segurança, perigos, estanqueidade, tripulação, Mayday, coordenação)?",opts:["Cumprir uma formalidade administrativa","Estruturar a ação para não perder tempo útil numa janela muitas vezes muito curta","Substituir a formação completa de combate a incêndios","Só informar o armador"],correct:1,expl:"A checklist permite agir rápido e pela ordem certa sem perder tempo a pensar em cada passo no meio da emergência, como ilustra o caso Baltic Ace."},
    {q:"Qual é o objetivo principal da lição L4 no Safety Department?",opts:["Reexplicar o combate a incêndios em detalhe","Estruturar as primeiríssimas ações essenciais nos minutos após uma colisão confirmada","Estudar a estabilidade do navio em profundidade","Reexplicar as regras de leme COLREG"],correct:1,expl:"L4 foca-se exclusivamente na ação prática na janela crítica dos primeiros minutos."},
  ],
};

function QuestionBank({ lang, onComplete }) {
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  const questions=BANK[lang]||BANK.fr;
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);if(onComplete)onComplete();}};
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
      <button onClick={next} style={{width:"100%",padding:"11px 0",border:"none",borderRadius:12,background:`linear-gradient(135deg,${C.red},${C.blue})`,fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?(lang==="fr"?"SUIVANT →":lang==="en"?"NEXT →":lang==="es"?"SIGUIENTE →":"PRÓXIMO →"):(lang==="fr"?"TERMINER":lang==="en"?"FINISH":lang==="es"?"TERMINAR":"TERMINAR")}</button></>}
    </div>
  );
}

// ══════════════════════════════════════
// QUIZ — FINAL (5 QUESTIONS)
// ══════════════════════════════════════
const QUIZ = {
  fr:[
    {q:"Que faut-il vérifier avant d'aider quiconque après une collision ?",opts:["Rien, il faut foncer aider","Sa propre sécurité — un sauveteur blessé devient une victime supplémentaire","Le contrat d'assurance","La météo du lendemain"],correct:1,expl:"La sécurité personnelle prime toujours avant toute intervention envers autrui."},
    {q:"Que signifie 'contain the damage before fighting the damage' ?",opts:["Fermer par réflexe pour empêcher l'aggravation, avant toute action corrective","Toujours attendre le capitaine","Ignorer les portes étanches","Éteindre le feu avant tout"],correct:0,expl:"La fermeture immédiate des accès contient les dégâts avant que des actions correctives ne soient entreprises."},
    {q:"Quel est le premier élément d'un message Mayday ?",opts:["Le nombre de blessés","\"MAYDAY, MAYDAY, MAYDAY\" puis l'identification du navire","La météo","Le nom de l'armateur"],correct:1,expl:"La structure standard commence toujours par le triple MAYDAY suivi de l'identification."},
    {q:"En combien de temps le Baltic Ace a-t-il coulé après la collision ?",opts:["Plusieurs heures","Moins de 15 minutes","Une journée","Il n'a pas coulé"],correct:1,expl:"Ce naufrage extrêmement rapide illustre l'urgence des tout premiers gestes."},
    {q:"Pourquoi la coordination avec l'autre navire va-t-elle au-delà de l'échange d'informations ?",opts:["Elle ne sert à rien d'autre","Les deux navires peuvent être victimes, d'où l'importance de l'assistance mutuelle","Elle est purement formelle","Elle ne concerne que les gros navires"],correct:1,expl:"Connaître l'état de l'autre équipage permet d'anticiper une assistance mutuelle et d'éviter une seconde urgence."},
  ],
  en:[
    {q:"What must be checked before helping anyone after a collision?",opts:["Nothing, you must rush to help","Your own safety — an injured rescuer becomes one more victim","The insurance contract","Tomorrow's weather"],correct:1,expl:"Personal safety always comes before any intervention toward others."},
    {q:"What does 'contain the damage before fighting the damage' mean?",opts:["Close by reflex to prevent worsening, before any corrective action","Always wait for the Captain","Ignore watertight doors","Extinguish the fire first"],correct:0,expl:"Immediately closing access points contains the damage before corrective actions are undertaken."},
    {q:"What is the first element of a Mayday message?",opts:["The number of injured","\"MAYDAY, MAYDAY, MAYDAY\" then vessel identification","The weather","The owner's name"],correct:1,expl:"The standard structure always begins with the triple MAYDAY followed by identification."},
    {q:"How long did it take for Baltic Ace to sink after the collision?",opts:["Several hours","Under 15 minutes","A full day","It didn't sink"],correct:1,expl:"This extremely fast sinking illustrates the urgency of the very first actions."},
    {q:"Why does coordination with the other vessel go beyond information exchange?",opts:["It serves no other purpose","Both vessels may be victims, hence the importance of mutual assistance","It is purely formal","It only concerns large vessels"],correct:1,expl:"Knowing the other crew's status allows anticipating mutual assistance and avoiding a second emergency."},
  ],
  es:[
    {q:"¿Qué hay que verificar antes de ayudar a alguien tras una colisión?",opts:["Nada, hay que correr a ayudar","La propia seguridad — un rescatista herido se convierte en una víctima más","El contrato de seguro","El tiempo de mañana"],correct:1,expl:"La seguridad personal siempre precede a cualquier intervención hacia los demás."},
    {q:"¿Qué significa 'contain the damage before fighting the damage'?",opts:["Cerrar por reflejo para evitar que empeore, antes de cualquier acción correctiva","Siempre esperar al Capitán","Ignorar las puertas estancas","Apagar el fuego primero"],correct:0,expl:"El cierre inmediato de los accesos contiene el daño antes de emprender acciones correctivas."},
    {q:"¿Cuál es el primer elemento de un mensaje Mayday?",opts:["El número de heridos","\"MAYDAY, MAYDAY, MAYDAY\" y luego la identificación del buque","El tiempo","El nombre del armador"],correct:1,expl:"La estructura estándar siempre comienza con el triple MAYDAY seguido de la identificación."},
    {q:"¿En cuánto tiempo se hundió el Baltic Ace tras la colisión?",opts:["Varias horas","Menos de 15 minutos","Un día","No se hundió"],correct:1,expl:"Este hundimiento extremadamente rápido ilustra la urgencia de las primerísimas acciones."},
    {q:"¿Por qué la coordinación con el otro buque va más allá del intercambio de información?",opts:["No sirve para nada más","Ambos buques pueden ser víctimas, de ahí la importancia de la asistencia mutua","Es puramente formal","Solo concierne a los buques grandes"],correct:1,expl:"Conocer el estado de la otra tripulación permite anticipar la asistencia mutua y evitar una segunda emergencia."},
  ],
  pt:[
    {q:"O que deve ser verificado antes de ajudar alguém após uma colisão?",opts:["Nada, deve-se correr para ajudar","A própria segurança — um socorrista ferido torna-se mais uma vítima","O contrato de seguro","O tempo de amanhã"],correct:1,expl:"A segurança pessoal precede sempre qualquer intervenção junto de outros."},
    {q:"O que significa 'contain the damage before fighting the damage'?",opts:["Fechar por reflexo para evitar o agravamento, antes de qualquer ação corretiva","Esperar sempre pelo Comandante","Ignorar as portas estanques","Apagar o fogo primeiro"],correct:0,expl:"O fecho imediato dos acessos contém o dano antes de se empreenderem ações corretivas."},
    {q:"Qual é o primeiro elemento de uma mensagem Mayday?",opts:["O número de feridos","\"MAYDAY, MAYDAY, MAYDAY\" seguido da identificação do navio","O tempo","O nome do armador"],correct:1,expl:"A estrutura padrão começa sempre com o triplo MAYDAY seguido da identificação."},
    {q:"Em quanto tempo o Baltic Ace afundou após a colisão?",opts:["Várias horas","Menos de 15 minutos","Um dia inteiro","Não afundou"],correct:1,expl:"Este afundamento extremamente rápido ilustra a urgência das primeiríssimas ações."},
    {q:"Por que a coordenação com o outro navio vai além da troca de informação?",opts:["Não serve para mais nada","Ambos os navios podem ser vítimas, daí a importância da assistência mútua","É puramente formal","Só diz respeito a navios grandes"],correct:1,expl:"Conhecer o estado da outra tripulação permite antecipar assistência mútua e evitar uma segunda emergência."},
  ],
};

function QuizComp({questions,t,onComplete}){
  const [shuffled]=useState(()=>questions.map(shuffleQuestionOptions));
  const [cur,setCur]=useState(0);const [sel,setSel]=useState(null);const [answered,setAnswered]=useState(false);const [score,setScore]=useState(0);const [answers,setAnswers]=useState([]);const [done,setDone]=useState(false);
  const q=shuffled[cur];const isOk=sel===q.correct;
  const pick=i=>{if(answered)return;setSel(i);setAnswered(true);if(i===q.correct)setScore(s=>s+1);setAnswers(a=>[...a,{i,ok:i===q.correct}]);};
  const next=()=>{if(cur<questions.length-1){setCur(c=>c+1);setSel(null);setAnswered(false);}else{setDone(true);onComplete(score+(isOk?1:0));}};
  if(done){const fs=score;const pct=Math.round(fs/questions.length*100);const xp=fs>=4?200:fs===3?120:60;const msg=pct===100?t.scorePerf:pct>=80?t.scoreGreat:t.scoreGood;return(<Card style={{textAlign:"center"}}><div style={{fontSize:52,marginBottom:8}}>{pct===100?"🏆":pct>=80?"🎖️":"📚"}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:28,fontWeight:900,color:C.white,marginBottom:4}}>{fs}/{questions.length}</div><div style={{fontSize:13,color:C.gold2,marginBottom:12}}>{msg}</div><div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}44`,fontSize:14,color:C.gold2,fontWeight:700}}>+{xp} {t.xp} ⭐</div><GLine/><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8}}>{answers.map((a,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:a.ok?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.white}}>{a.ok?"✓":"✗"}</div>)}</div></Card>);}
  return(<Card style={{border:`1px solid ${C.red}33`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:11,letterSpacing:3,color:C.red,fontFamily:"'Cinzel',serif"}}>{t.quiz}</div><div style={{fontSize:12,color:C.muted}}>{t.question} {cur+1} {t.ofQ} {questions.length}</div></div><div style={{display:"flex",gap:6,marginBottom:16}}>{questions.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<cur?(answers[i]?.ok?C.green:C.red):i===cur?C.red:"rgba(255,255,255,0.1)"}}/>)}</div><div style={{fontSize:14,fontWeight:700,color:C.white,lineHeight:1.5,marginBottom:16}}>{q.q}</div><div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{q.opts.map((opt,i)=>{let bg="rgba(255,255,255,0.05)",bd="rgba(255,255,255,0.1)",anim="none";if(answered){if(i===q.correct){bg="rgba(30,138,74,0.2)";bd=C.green;anim="correctPop 0.4s ease";}else if(i===sel){bg="rgba(192,57,43,0.2)";bd=C.red;anim="wrongShake 0.4s ease";}}return<button key={i} onClick={()=>pick(i)} style={{padding:"12px 14px",borderRadius:14,background:bg,border:`1.5px solid ${bd}`,color:answered&&(i===q.correct||i===sel)?C.white:C.muted,fontSize:13,textAlign:"left",cursor:answered?"default":"pointer",fontFamily:"'Nunito',sans-serif",animation:anim,display:"flex",alignItems:"center",gap:10,lineHeight:1.4}}><div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:answered&&i===q.correct?C.green:answered&&i===sel?C.red:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.white}}>{answered&&i===q.correct?"✓":answered&&i===sel?"✗":String.fromCharCode(65+i)}</div><span>{opt}</span></button>;})} </div>{answered&&<div style={{padding:"12px 14px",borderRadius:12,marginBottom:14,background:isOk?"rgba(30,138,74,0.12)":"rgba(192,57,43,0.1)",border:`1px solid ${isOk?C.green:C.red}44`,animation:"fadeUp 0.4s ease"}}><div style={{fontSize:12,fontWeight:700,marginBottom:4,color:isOk?C.green:C.red}}>{isOk?t.correct:t.wrong}</div><div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:2}}>{t.expl}</div><div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{q.expl}</div></div>}{answered&&<button onClick={next} style={{width:"100%",padding:"14px 0",border:"none",borderRadius:14,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer"}}>{cur<questions.length-1?t.next:t.finish}</button>}</Card>);
}

// ══════════════════════════════════════
// SAFETY REFLECTION
// ══════════════════════════════════════
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si une collision se produisait maintenant sur ton navire, saurais-tu réciter les éléments essentiels d'un Mayday sans hésiter ? Lesquels te viennent en premier à l'esprit ?",
    en:"If a collision happened right now on your vessel, could you recite the essential elements of a Mayday without hesitating? Which ones come to mind first?",
    es:"Si una colisión ocurriera ahora mismo en tu buque, ¿sabrías recitar los elementos esenciales de un Mayday sin dudar? ¿Cuáles te vienen primero a la mente?",
    pt:"Se uma colisão acontecesse agora no teu navio, saberias recitar os elementos essenciais de um Mayday sem hesitar? Quais te vêm primeiro à mente?",
  };
  return (
    <div style={{padding:"16px",borderRadius:16,background:"linear-gradient(135deg,rgba(142,68,173,0.1),rgba(13,31,60,0.85))",border:`1px solid ${C.purple}44`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:20}}>🪞</span>
        <div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>
          {lang==="fr"?"SAFETY REFLECTION":lang==="en"?"SAFETY REFLECTION":lang==="es"?"REFLEXIÓN DE SEGURIDAD":"REFLEXÃO DE SEGURANÇA"}
        </div>
      </div>
      <div style={{fontSize:13,color:C.white,lineHeight:1.7,fontStyle:"italic",marginBottom:8}}>{q[lang]||q.fr}</div>
      <div style={{fontSize:10,color:C.muted}}>
        {lang==="fr"?"Il n'y a pas de bonne réponse — prends un instant pour y réfléchir.":lang==="en"?"There is no right answer — take a moment to reflect.":lang==="es"?"No hay una respuesta correcta — tómate un momento para reflexionar.":"Não há uma resposta certa — reserva um momento para refletir."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SHARED UI
// ══════════════════════════════════════
function Stars(){const [s,setS]=useState<{x:number;y:number;sz:number;dur:number;delay:number}[]>([]);useEffect(()=>{setS(Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6})));},[]);return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 4/6 · ⭐ Premium",
      title:"The Critical First Minutes After a Collision",
      intro:"L3 s'est arrêtée à l'instant de l'impact, quand toute l'énergie possible a été réduite.\n\nCette leçon commence exactement là : que fait-on dans les minutes qui suivent, quand la situation peut encore basculer vers le pire ou être stabilisée ?\n\nElle ne couvre pas l'abandon complet du navire ni les embarcations de sauvetage (réservés à un futur module dédié) — elle se concentre sur les tout premiers gestes essentiels.",
      p0:"DE L'IMPACT À LA PREMIÈRE RÉPONSE",s0t:"Ce qui change dans la seconde qui suit",
      s0:"Dès l'impact, la priorité bascule vers la gestion immédiate des conséquences. Chaque minute compte, mais elle doit être utilisée dans le bon ordre.\n\nCOMMENT PRÉVENIR L'AGGRAVATION ? En suivant une séquence claire, sans perdre de temps à improviser.\nQUE FAIRE DANS CES MINUTES ? Sécurité personnelle, évaluation, étanchéité, comptage, communication, coordination — dans cet ordre.\nQUELLE LEÇON RETENIR ? Certaines situations évoluent en quelques minutes seulement — l'action rapide et ordonnée fait toute la différence.",
      p1:"ÉVALUATION IMMÉDIATE DES DANGERS",s1t:"Ta sécurité avant celle des autres",
      s1:"Avant toute intervention, chaque marin doit rapidement vérifier sa propre sécurité : électricité, fumées, risque de chute, stabilité locale. Un sauveteur blessé devient une victime supplémentaire — cela n'est jamais un manque de courage, c'est une condition pour pouvoir réellement aider.\n\nUne fois cette vérification faite, évaluer rapidement feu, voie d'eau, blessés et risque structurel — un constat rapide, pas une analyse complète.",
      p2:"ÉTANCHÉITÉ",s2t:"Contain the damage before fighting the damage",
      s2:"Fermer portes et écoutilles étanches doit être un réflexe immédiat, avant même de commencer toute action corrective. Contenir les dégâts prime sur les combattre — la porte peut toujours être rouverte ensuite si nécessaire.",
      p3:"LE MAYDAY COMPLET",s3t:"Clair, structuré, calme — même sous stress extrême",
      s3:"Contrairement au message ultra-court de L3 avant l'impact, le Mayday après une collision confirmée suit une structure complète : identification, position, nature de la détresse, assistance requise, personnes à bord. Le ton du message — clair, structuré, calme — influence directement la qualité de la compréhension par les secours.",
      p4:"PREMIER APPEL ET COMPTAGE DE L'ÉQUIPAGE",s4t:"Savoir où est chacun, sans encore abandonner le navire",
      s4:"Vérifier que chaque membre d'équipage est informé et localisé fait partie des tout premiers gestes — sans pour autant lancer la procédure complète d'abandon du navire, qui reste un sujet à part entière.",
      p5:"COORDINATION AVEC LE NAVIRE ABORDEUR",s5t:"Les deux navires peuvent être victimes",
      s5:"Après une collision, l'autre navire n'est pas seulement une source d'informations — son équipage peut lui aussi être en danger. La coordination sert à connaître son état, organiser une assistance mutuelle si nécessaire, et éviter qu'une seconde urgence n'apparaisse.",
      p6:"ERREURS FRÉQUENTES DANS LES PREMIÈRES MINUTES",s6t:"Le retard coûte plus cher que l'excès de prudence",
      s6:"Retarder l'alerte pour \"être sûr\" et laisser une porte étanche ouverte \"pour vérifier\" restent les deux erreurs les plus fréquentes — et les plus coûteuses, comme le montre le cas Baltic Ace.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS RÉEL",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 4",
      sumP:["Ta sécurité avant celle des autres : un sauveteur blessé est une victime de plus","Contenir les dégâts avant de les combattre — fermer par réflexe","Le Mayday complet doit rester clair, structuré et calme","Compter l'équipage sans encore lancer l'abandon du navire","La coordination avec l'autre navire va au-delà de l'échange d'informations"],
      learnedP:["La bascule de l'impact vers la première réponse","Sécurité personnelle et évaluation rapide des dangers","Étanchéité : contenir avant de combattre","Structure complète du Mayday","Comptage de l'équipage et coordination inter-navires"],
      safetyMsg:"The first minutes after a collision determine the rest of the emergency. Stay calm. Protect lives. Contain the damage. Communicate clearly.",
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 4/6 · ⭐ Premium",
      title:"The Critical First Minutes After a Collision",
      intro:"L3 stopped at the moment of impact, once all possible energy had been reduced.\n\nThis lesson starts exactly there: what happens in the minutes that follow, when the situation can still tip toward the worst or be stabilized?\n\nIt does not cover full abandon-ship procedures or lifeboats (reserved for a future dedicated module) — it focuses on the essential very first actions.",
      p0:"FROM IMPACT TO THE FIRST RESPONSE",s0t:"What changes in the following second",
      s0:"From the moment of impact, priority shifts to immediately managing the consequences. Every minute counts, but it must be used in the right order.\n\nHOW TO PREVENT WORSENING? By following a clear sequence, without wasting time improvising.\nWHAT TO DO IN THESE MINUTES? Personal safety, assessment, watertight integrity, headcount, communication, coordination — in this order.\nWHAT LESSON TO RETAIN? Some situations unfold in just a few minutes — fast, ordered action makes all the difference.",
      p1:"IMMEDIATE HAZARD ASSESSMENT",s1t:"Your safety before others'",
      s1:"Before any intervention, every sailor must quickly check their own safety: electricity, smoke, fall risk, local stability. An injured rescuer becomes one more victim — this is never a lack of courage, it is a condition for being able to actually help.\n\nOnce this check is done, quickly assess fire, flooding, injuries and structural risk — a quick assessment, not a full analysis.",
      p2:"WATERTIGHT INTEGRITY",s2t:"Contain the damage before fighting the damage",
      s2:"Closing watertight doors and hatches must be an immediate reflex, before even starting any corrective action. Containing the damage takes priority over fighting it — the door can always be reopened later if needed.",
      p3:"THE FULL MAYDAY",s3t:"Clear, structured, calm — even under extreme stress",
      s3:"Unlike L3's ultra-short message before impact, the Mayday after a confirmed collision follows a full structure: identification, position, nature of distress, assistance required, persons on board. The tone of the message — clear, structured, calm — directly affects how well rescuers understand it.",
      p4:"INITIAL MUSTER AND CREW COUNT",s4t:"Knowing where everyone is, without abandoning ship yet",
      s4:"Verifying that every crew member is informed and located is part of the very first actions — without yet launching the full abandon-ship procedure, which remains a topic of its own.",
      p5:"COORDINATION WITH THE COLLIDING VESSEL",s5t:"Both vessels can be victims",
      s5:"After a collision, the other vessel is not just a source of information — its crew may also be in danger. Coordination serves to know their status, organize mutual assistance if needed, and prevent a second emergency from arising.",
      p6:"FREQUENT ERRORS IN THE FIRST MINUTES",s6t:"Delay costs more than excess caution",
      s6:"Delaying the alert to \"be sure\" and leaving a watertight door open \"to check\" remain the two most frequent — and costliest — errors, as the Baltic Ace case shows.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ REAL ACCIDENT CASE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 4",
      sumP:["Your safety before others': an injured rescuer is one more victim","Contain the damage before fighting it — close by reflex","The full Mayday must stay clear, structured and calm","Count the crew without yet launching abandon ship","Coordination with the other vessel goes beyond information exchange"],
      learnedP:["The shift from impact to first response","Personal safety and quick hazard assessment","Watertight integrity: contain before fighting","Full Mayday structure","Crew count and inter-vessel coordination"],
      safetyMsg:"The first minutes after a collision determine the rest of the emergency. Stay calm. Protect lives. Contain the damage. Communicate clearly.",
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 4/6 · ⭐ Premium",
      title:"The Critical First Minutes After a Collision",
      intro:"L3 se detuvo en el momento del impacto, una vez reducida toda la energía posible.\n\nEsta lección comienza exactamente ahí: ¿qué pasa en los minutos siguientes, cuando la situación aún puede inclinarse hacia lo peor o estabilizarse?\n\nNo cubre el abandono completo del buque ni los botes salvavidas (reservados a un futuro módulo dedicado) — se centra en las primerísimas acciones esenciales.",
      p0:"DEL IMPACTO A LA PRIMERA RESPUESTA",s0t:"Lo que cambia en el segundo siguiente",
      s0:"Desde el momento del impacto, la prioridad se desplaza hacia gestionar inmediatamente las consecuencias. Cada minuto cuenta, pero debe usarse en el orden correcto.\n\n¿CÓMO PREVENIR QUE EMPEORE? Siguiendo una secuencia clara, sin perder tiempo improvisando.\n¿QUÉ HACER EN ESOS MINUTOS? Seguridad personal, evaluación, estanqueidad, recuento, comunicación, coordinación — en este orden.\n¿QUÉ LECCIÓN RETENER? Algunas situaciones evolucionan en solo unos minutos — la acción rápida y ordenada marca toda la diferencia.",
      p1:"EVALUACIÓN INMEDIATA DE PELIGROS",s1t:"Tu seguridad antes que la de los demás",
      s1:"Antes de cualquier intervención, cada marino debe verificar rápidamente su propia seguridad: electricidad, humo, riesgo de caída, estabilidad local. Un rescatista herido se convierte en una víctima más — esto nunca es falta de valentía, es una condición para poder ayudar realmente.\n\nUna vez hecha esta comprobación, evaluar rápidamente fuego, vía de agua, heridos y riesgo estructural.",
      p2:"ESTANQUEIDAD",s2t:"Contain the damage before fighting the damage",
      s2:"Cerrar puertas y escotillas estancas debe ser un reflejo inmediato, antes incluso de iniciar cualquier acción correctiva. Contener el daño prima sobre combatirlo — la puerta siempre puede volver a abrirse después si es necesario.",
      p3:"EL MAYDAY COMPLETO",s3t:"Claro, estructurado, tranquilo — incluso bajo estrés extremo",
      s3:"A diferencia del mensaje ultracorto de L3 antes del impacto, el Mayday tras una colisión confirmada sigue una estructura completa: identificación, posición, naturaleza de la emergencia, asistencia requerida, personas a bordo. El tono del mensaje afecta directamente a la calidad de la comprensión por parte del rescate.",
      p4:"PRIMER LLAMADO Y RECUENTO DE LA TRIPULACIÓN",s4t:"Saber dónde está cada uno, sin abandonar aún el buque",
      s4:"Verificar que cada tripulante esté informado y localizado forma parte de las primerísimas acciones — sin lanzar aún el procedimiento completo de abandono del buque.",
      p5:"COORDINACIÓN CON EL BUQUE QUE COLISIONA",s5t:"Ambos buques pueden ser víctimas",
      s5:"Tras una colisión, el otro buque no es solo una fuente de información — su tripulación también puede estar en peligro. La coordinación sirve para conocer su estado, organizar asistencia mutua si es necesario y evitar que surja una segunda emergencia.",
      p6:"ERRORES FRECUENTES EN LOS PRIMEROS MINUTOS",s6t:"El retraso cuesta más que el exceso de precaución",
      s6:"Retrasar la alerta para \"estar seguro\" y dejar una puerta estanca abierta \"para comprobar\" siguen siendo los dos errores más frecuentes — y más costosos, como muestra el caso Baltic Ace.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 4",
      sumP:["Tu seguridad antes que la de los demás: un rescatista herido es una víctima más","Contener el daño antes de combatirlo — cerrar por reflejo","El Mayday completo debe permanecer claro, estructurado y tranquilo","Contar a la tripulación sin lanzar aún el abandono del buque","La coordinación con el otro buque va más allá del intercambio de información"],
      learnedP:["El cambio del impacto a la primera respuesta","Seguridad personal y evaluación rápida de peligros","Estanqueidad: contener antes de combatir","Estructura completa del Mayday","Recuento de la tripulación y coordinación entre buques"],
      safetyMsg:"The first minutes after a collision determine the rest of the emergency. Stay calm. Protect lives. Contain the damage. Communicate clearly.",
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 4/6 · ⭐ Premium",
      title:"The Critical First Minutes After a Collision",
      intro:"L3 parou no momento do impacto, depois de reduzida toda a energia possível.\n\nEsta lição começa exatamente aí: o que acontece nos minutos seguintes, quando a situação ainda pode inclinar-se para o pior ou ser estabilizada?\n\nNão cobre o abandono completo do navio nem as jangadas salva-vidas (reservados a um futuro módulo dedicado) — foca-se nas primeiríssimas ações essenciais.",
      p0:"DO IMPACTO À PRIMEIRA RESPOSTA",s0t:"O que muda no segundo seguinte",
      s0:"A partir do momento do impacto, a prioridade muda para gerir imediatamente as consequências. Cada minuto conta, mas deve ser usado pela ordem certa.\n\nCOMO PREVENIR O AGRAVAMENTO? Seguindo uma sequência clara, sem perder tempo a improvisar.\nO QUE FAZER NESSES MINUTOS? Segurança pessoal, avaliação, estanqueidade, contagem, comunicação, coordenação — por esta ordem.\nQUE LIÇÃO RETER? Algumas situações evoluem em apenas alguns minutos — a ação rápida e ordenada faz toda a diferença.",
      p1:"AVALIAÇÃO IMEDIATA DE PERIGOS",s1t:"A tua segurança antes da dos outros",
      s1:"Antes de qualquer intervenção, cada marítimo deve verificar rapidamente a sua própria segurança: eletricidade, fumo, risco de queda, estabilidade local. Um socorrista ferido torna-se mais uma vítima — isto nunca é falta de coragem, é uma condição para poder ajudar realmente.\n\nDepois desta verificação, avaliar rapidamente fogo, via de água, feridos e risco estrutural.",
      p2:"ESTANQUEIDADE",s2t:"Contain the damage before fighting the damage",
      s2:"Fechar portas e escotilhas estanques deve ser um reflexo imediato, antes mesmo de iniciar qualquer ação corretiva. Conter o dano tem prioridade sobre combatê-lo — a porta pode sempre ser reaberta depois se necessário.",
      p3:"O MAYDAY COMPLETO",s3t:"Claro, estruturado, calmo — mesmo sob stress extremo",
      s3:"Ao contrário da mensagem ultracurta de L3 antes do impacto, o Mayday após uma colisão confirmada segue uma estrutura completa: identificação, posição, natureza da emergência, assistência necessária, pessoas a bordo. O tom da mensagem afeta diretamente a qualidade da compreensão pelos socorristas.",
      p4:"PRIMEIRA CHAMADA E CONTAGEM DA TRIPULAÇÃO",s4t:"Saber onde está cada um, sem ainda abandonar o navio",
      s4:"Verificar que cada tripulante está informado e localizado faz parte das primeiríssimas ações — sem ainda lançar o procedimento completo de abandono do navio.",
      p5:"COORDENAÇÃO COM O NAVIO ABALROADOR",s5t:"Ambos os navios podem ser vítimas",
      s5:"Após uma colisão, o outro navio não é apenas uma fonte de informação — a sua tripulação também pode estar em perigo. A coordenação serve para conhecer o seu estado, organizar assistência mútua se necessário, e evitar que surja uma segunda emergência.",
      p6:"ERROS FREQUENTES NOS PRIMEIROS MINUTOS",s6t:"O atraso custa mais do que o excesso de precaução",
      s6:"Atrasar o alerta para \"ter a certeza\" e deixar uma porta estanque aberta \"para verificar\" continuam a ser os dois erros mais frequentes — e mais dispendiosos, como mostra o caso Baltic Ace.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 4",
      sumP:["A tua segurança antes da dos outros: um socorrista ferido é mais uma vítima","Conter o dano antes de o combater — fechar por reflexo","O Mayday completo deve permanecer claro, estruturado e calmo","Contar a tripulação sem ainda lançar o abandono do navio","A coordenação com o outro navio vai além da troca de informação"],
      learnedP:["A mudança do impacto para a primeira resposta","Segurança pessoal e avaliação rápida de perigos","Estanqueidade: conter antes de combater","Estrutura completa do Mayday","Contagem da tripulação e coordenação entre navios"],
      safetyMsg:"The first minutes after a collision determine the rest of the emergency. Stay calm. Protect lives. Contain the damage. Communicate clearly.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
      <div style={{position:"relative",zIndex:100,background:"rgba(6,14,26,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"8px 14px",color:C.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>{t.back}</button>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{t.module}</div>
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/6":lang==="en"?"Lesson 4/6":lang==="es"?"Lección 4/6":"Lição 4/6"}</div>
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

            <SL icon="⏱️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🛡️" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🗺️ {lang==="fr"?"CARTE DE DANGERS — INTERACTIF":lang==="en"?"HAZARD MAP — INTERACTIVE":lang==="es"?"MAPA DE PELIGROS — INTERACTIVO":"MAPA DE PERIGOS — INTERATIVO"}</div><HazardMapSVG lang={lang}/></Card>

            <SL icon="🚪" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚪</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="📻" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📻</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📻 {lang==="fr"?"STRUCTURE DU MAYDAY — INTERACTIF":lang==="en"?"MAYDAY STRUCTURE — INTERACTIVE":lang==="es"?"ESTRUCTURA DEL MAYDAY — INTERACTIVO":"ESTRUTURA DO MAYDAY — INTERATIVO"}</div><MaydaySVG lang={lang}/></Card>

            <SL icon="👥" text={lc.p4} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🤝" text={lc.p5} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="⚠️" text={lc.p6} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚠️ {lang==="fr"?"ERREURS FRÉQUENTES — INTERACTIF":lang==="en"?"FREQUENT ERRORS — INTERACTIVE":lang==="es"?"ERRORES FRECUENTES — INTERACTIVO":"ERROS FREQUENTES — INTERATIVO"}</div><ErrorsSVG lang={lang}/></Card>

            <SL icon="✅" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✅ {lang==="fr"?"CHECK-LIST GLOBALE — INTERACTIF":lang==="en"?"FULL CHECKLIST — INTERACTIVE":lang==="es"?"LISTA GLOBAL — INTERACTIVO":"CHECKLIST GLOBAL — INTERATIVO"}</div>
              <ChecklistSVG lang={lang}/>
            </Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:11,color:C.red,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(192,57,43,0.4)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final — Premières Minutes":lang==="en"?"Final Quiz — First Minutes":lang==="es"?"Quiz Final — Primeros Minutos":"Quiz Final — Primeiros Minutos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/6":"questions · Lesson 4/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛟</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 5 — DÉCISION SOUS PRESSION →":lang==="en"?"LESSON 5 — DECISION-MAKING UNDER PRESSURE →":lang==="es"?"LECCIÓN 5 — DECISIONES BAJO PRESIÓN →":"LIÇÃO 5 — DECISÃO SOB PRESSÃO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
