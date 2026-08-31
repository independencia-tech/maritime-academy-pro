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
// SVG 1 — SITUATION → EQUIPMENT MATRIX
// ══════════════════════════════════════
function SituationMatrixSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const sits = [
    { id:"fire", icon:"🔥", color:C.red, label:{fr:"Incendie",en:"Fire",es:"Incendio",pt:"Incêndio"},
      desc:{fr:"Priorité : communiquer tant que c'est possible (DSC + VHF) avant que le feu ne coupe l'électricité. L'EPIRB reste en réserve si la communication devient impossible.",en:"Priority: communicate while still possible (DSC + VHF) before the fire cuts power. The EPIRB stays in reserve if communication becomes impossible.",es:"Prioridad: comunicar mientras sea posible (DSC + VHF) antes de que el fuego corte la electricidad. El EPIRB queda en reserva si la comunicación deja de ser posible.",pt:"Prioridade: comunicar enquanto for possível (DSC + VHF) antes de o fogo cortar a eletricidade. O EPIRB fica em reserva se a comunicação deixar de ser possível."} },
    { id:"flood", icon:"🌊", color:C.blue2, label:{fr:"Voie d'eau rapide",en:"Rapid flooding",es:"Vía de agua rápida",pt:"Via de água rápida"},
      desc:{fr:"Priorité : EPIRB en premier — c'est le seul système qui continue de fonctionner si le navire coule avant que d'autres actions soient possibles.",en:"Priority: EPIRB first — it's the only system that keeps working if the vessel sinks before other actions are possible.",es:"Prioridad: EPIRB primero — es el único sistema que sigue funcionando si el buque se hunde antes de que otras acciones sean posibles.",pt:"Prioridade: EPIRB primeiro — é o único sistema que continua a funcionar se o navio afundar antes de outras ações serem possíveis."} },
    { id:"mob", icon:"🧍", color:C.gold2, label:{fr:"Homme à la mer",en:"Man overboard",es:"Hombre al agua",pt:"Homem ao mar"},
      desc:{fr:"Priorité : VHF immédiate pour alerter les navires proches, puis DSC — l'EPIRB n'est pas la première réponse pour une personne isolée à l'eau.",en:"Priority: immediate VHF to alert nearby vessels, then DSC — the EPIRB is not the first response for a single person in the water.",es:"Prioridad: VHF inmediata para alertar a buques cercanos, luego DSC — el EPIRB no es la primera respuesta para una persona sola en el agua.",pt:"Prioridade: VHF imediata para alertar navios próximos, depois DSC — o EPIRB não é a primeira resposta para uma pessoa sozinha na água."} },
    { id:"radio", icon:"📻", color:C.purple, label:{fr:"Panne radio principale",en:"Main radio failure",es:"Fallo de radio principal",pt:"Falha do rádio principal"},
      desc:{fr:"Priorité : basculer immédiatement sur la VHF portable de secours, puis envisager l'EPIRB si aucune communication vocale ne peut être rétablie.",en:"Priority: immediately switch to the backup portable VHF, then consider the EPIRB if no voice communication can be restored.",es:"Prioridad: cambiar inmediatamente a la VHF portátil de repuesto, luego considerar el EPIRB si no se puede restablecer ninguna comunicación por voz.",pt:"Prioridade: mudar imediatamente para o VHF portátil de reserva, depois considerar o EPIRB se nenhuma comunicação por voz puder ser restabelecida."} },
    { id:"medical", icon:"🩺", color:C.teal, label:{fr:"Urgence médicale grave",en:"Serious medical emergency",es:"Emergencia médica grave",pt:"Emergência médica grave"},
      desc:{fr:"Priorité : DSC + contact vocal direct pour transmettre des détails précis à un médecin ou au MRCC — l'EPIRB seul ne transmet aucune information médicale.",en:"Priority: DSC + direct voice contact to relay precise details to a doctor or the MRCC — the EPIRB alone transmits no medical information.",es:"Prioridad: DSC + contacto vocal directo para transmitir detalles precisos a un médico o al MRCC — el EPIRB solo no transmite información médica.",pt:"Prioridade: DSC + contacto vocal direto para transmitir detalhes precisos a um médico ou ao MRCC — o EPIRB sozinho não transmite informação médica."} },
  ];
  const sel_ = sits.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {sits.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"11px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:19,marginBottom:3}}>{s.icon}</div>
            <div style={{fontSize:10,fontWeight:700,color:sel===s.id?s.color:C.muted}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche une situation pour voir l'équipement prioritaire":lang==="en"?"Tap a situation to see the priority equipment":lang==="es"?"Toca una situación para ver el equipo prioritario":"Toque numa situação para ver o equipamento prioritário"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — MANUAL VS AUTOMATIC
// ══════════════════════════════════════
function ManualAutoSVG({ lang }) {
  const [side, setSide] = useState("manual");
  const d = {
    manual:{fr:"Nécessite qu'un membre d'équipage soit conscient, présent et capable d'agir physiquement. Aucune protection si l'événement est trop soudain ou trop violent pour permettre une action.",
            en:"Requires a crew member to be conscious, present and physically able to act. No protection if the event is too sudden or too violent to allow action.",
            es:"Requiere que un tripulante esté consciente, presente y físicamente capaz de actuar. Ninguna protección si el evento es demasiado repentino o violento para permitir actuar.",
            pt:"Requer que um tripulante esteja consciente, presente e fisicamente capaz de agir. Nenhuma proteção se o evento for demasiado súbito ou violento para permitir agir."},
    auto:{fr:"Se déclenche indépendamment de l'état de l'équipage — largueur hydrostatique, contact avec l'eau. Reste la seule protection si personne ne peut plus intervenir.",
          en:"Triggers independently of the crew's state — hydrostatic release, water contact. Remains the only protection if no one can intervene anymore.",
          es:"Se activa independientemente del estado de la tripulación — largador hidrostático, contacto con el agua. Sigue siendo la única protección si ya nadie puede intervenir.",
          pt:"Aciona-se independentemente do estado da tripulação — largador hidrostático, contacto com a água. Continua a ser a única proteção se já ninguém puder intervir."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["manual","auto"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?(k==="manual"?C.orange:C.green):"rgba(255,255,255,0.12)"}`,background:side===k?`${k==="manual"?C.orange:C.green}22`:"rgba(255,255,255,0.04)",color:side===k?(k==="manual"?C.orange:C.green):C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="manual"?(lang==="fr"?"MANUEL":lang==="en"?"MANUAL":lang==="es"?"MANUAL":"MANUAL"):(lang==="fr"?"AUTOMATIQUE":lang==="en"?"AUTOMATIC":lang==="es"?"AUTOMÁTICO":"AUTOMÁTICO")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="manual"?"rgba(230,126,34,0.1)":"rgba(30,138,74,0.1)",border:`1px solid ${side==="manual"?C.orange:C.green}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
      <div style={{marginTop:8,fontSize:10,color:C.gold2,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"Ne jamais compter sur un seul mode d'activation — c'est le principe même de la redondance.":
         lang==="en"?"Never rely on a single activation mode — this is the very principle of redundancy.":
         lang==="es"?"Nunca confiar en un solo modo de activación — es el principio mismo de la redundancia.":
         "Nunca confiar num único modo de ativação — é o próprio princípio da redundância."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — TIME IS PART OF THE EQUIPMENT
// ══════════════════════════════════════
function TimingSVG({ lang }) {
  const [mode, setMode] = useState("sim");
  const d = {
    sim:{fr:"Certaines situations exigent une activation groupée immédiate : EPIRB + DSC déclenchés ensemble quand le temps restant est déjà très court et incertain.",
         en:"Some situations require immediate combined activation: EPIRB + DSC triggered together when the remaining time is already very short and uncertain.",
         es:"Algunas situaciones exigen una activación conjunta inmediata: EPIRB + DSC activados juntos cuando el tiempo restante ya es muy corto e incierto.",
         pt:"Algumas situações exigem uma ativação conjunta imediata: EPIRB + DSC acionados juntos quando o tempo restante já é muito curto e incerto."},
    seq:{fr:"D'autres situations permettent une activation en cascade : DSC d'abord pour alerter et communiquer, EPIRB ensuite si la situation continue de se dégrader.",
         en:"Other situations allow a cascading activation: DSC first to alert and communicate, EPIRB next if the situation keeps worsening.",
         es:"Otras situaciones permiten una activación en cascada: DSC primero para alertar y comunicar, EPIRB después si la situación sigue empeorando.",
         pt:"Outras situações permitem uma ativação em cascata: DSC primeiro para alertar e comunicar, EPIRB depois se a situação continuar a piorar."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["sim","seq"].map(k=>(
          <button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${mode===k?C.blue2:"rgba(255,255,255,0.12)"}`,background:mode===k?`${C.blue2}22`:"rgba(255,255,255,0.04)",color:mode===k?C.blue2:C.muted,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="sim"?(lang==="fr"?"⚡ SIMULTANÉ":lang==="en"?"⚡ SIMULTANEOUS":lang==="es"?"⚡ SIMULTÁNEO":"⚡ SIMULTÂNEO"):(lang==="fr"?"🪜 SÉQUENTIEL":lang==="en"?"🪜 SEQUENTIAL":lang==="es"?"🪜 SECUENCIAL":"🪜 SEQUENCIAL")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:"rgba(26,111,212,0.08)",border:`1px solid ${C.blue2}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[mode][lang]||d[mode].fr}</div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — DECISION TREE
// ══════════════════════════════════════
function DecisionTreeSVG({ lang }) {
  const [scenario, setScenario] = useState(null);
  const [branch, setBranch] = useState(null);
  const L = {
    fire:{fr:"Incendie",en:"Fire",es:"Incendio",pt:"Incêndio"},
    flood:{fr:"Voie d'eau",en:"Flooding",es:"Vía de agua",pt:"Via de água"},
    canComm:{fr:"Peut-on encore communiquer ?",en:"Can we still communicate?",es:"¿Aún se puede comunicar?",pt:"Ainda se consegue comunicar?"},
    rapid:{fr:"L'envahissement est-il rapide ?",en:"Is the flooding rapid?",es:"¿La inundación es rápida?",pt:"O alagamento é rápido?"},
    yes:{fr:"OUI",en:"YES",es:"SÍ",pt:"SIM"}, no:{fr:"NON",en:"NO",es:"NO",pt:"NÃO"},
  };
  const paths = {
    "fire-yes":{fr:"DSC → VHF → EPIRB en réserve. Communiquer tant que c'est possible, garder l'EPIRB pour si la situation empire.",en:"DSC → VHF → EPIRB in reserve. Communicate while possible, keep the EPIRB for if the situation worsens.",es:"DSC → VHF → EPIRB en reserva. Comunicar mientras sea posible, guardar el EPIRB por si la situación empeora.",pt:"DSC → VHF → EPIRB em reserva. Comunicar enquanto for possível, guardar o EPIRB para se a situação piorar."},
    "fire-no":{fr:"EPIRB immédiatement. Sans communication possible, c'est le seul système qui peut encore alerter.",en:"EPIRB immediately. Without possible communication, it's the only system that can still alert.",es:"EPIRB inmediatamente. Sin comunicación posible, es el único sistema que aún puede alertar.",pt:"EPIRB imediatamente. Sem comunicação possível, é o único sistema que ainda pode alertar."},
    "flood-yes":{fr:"EPIRB → DSC → préparer une éventuelle évacuation. Le temps restant est trop incertain pour attendre.",en:"EPIRB → DSC → prepare for possible evacuation. Remaining time is too uncertain to wait.",es:"EPIRB → DSC → preparar una posible evacuación. El tiempo restante es demasiado incierto para esperar.",pt:"EPIRB → DSC → preparar uma eventual evacuação. O tempo restante é demasiado incerto para esperar."},
    "flood-no":{fr:"DSC → évaluer → EPIRB si l'évolution le justifie. Une voie d'eau maîtrisable laisse le temps de communiquer d'abord.",en:"DSC → assess → EPIRB if evolution justifies it. A controllable leak leaves time to communicate first.",es:"DSC → evaluar → EPIRB si la evolución lo justifica. Una vía de agua controlable deja tiempo para comunicar primero.",pt:"DSC → avaliar → EPIRB se a evolução o justificar. Uma via de água controlável deixa tempo para comunicar primeiro."},
  };
  const key = scenario&&branch ? `${scenario}-${branch}` : null;
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["fire","flood"].map(s=>(
          <button key={s} onClick={()=>{setScenario(s);setBranch(null);}} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${scenario===s?C.red:"rgba(255,255,255,0.12)"}`,background:scenario===s?`${C.red}22`:"rgba(255,255,255,0.04)",color:scenario===s?C.red:C.muted,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>{s==="fire"?"🔥 ":"🌊 "}{L[s][lang]||L[s].fr}</button>
        ))}
      </div>
      {scenario&&<>
        <div style={{fontSize:11,color:C.white,marginBottom:8,textAlign:"center",fontWeight:600}}>{scenario==="fire"?(L.canComm[lang]||L.canComm.fr):(L.rapid[lang]||L.rapid.fr)}</div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          {["yes","no"].map(b=>(
            <button key={b} onClick={()=>setBranch(b)} style={{flex:1,padding:"9px 0",borderRadius:10,border:`1.5px solid ${branch===b?C.gold:"rgba(255,255,255,0.12)"}`,background:branch===b?`${C.gold}22`:"rgba(255,255,255,0.04)",color:branch===b?C.gold2:C.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>{L[b][lang]||L[b].fr}</button>
          ))}
        </div>
      </>}
      {key&&<div style={{padding:"12px 14px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{paths[key][lang]||paths[key].fr}</div>}
      {!scenario&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Choisis un scénario pour construire la séquence":lang==="en"?"Choose a scenario to build the sequence":lang==="es"?"Elige un escenario para construir la secuencia":"Escolhe um cenário para construir a sequência"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — MULTI-CONSTRAINT SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"a",q5:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Incendie en salle des machines, perte électrique partielle, radio principale hors service, une VHF portable fonctionne encore, deux blessés. Quelle est la toute première priorité ?\na) Soigner les blessés avant tout autre chose\nb) Basculer immédiatement sur la VHF portable pour communiquer tant que c'est possible\nc) Activer l'EPIRB en priorité absolue"},
      {id:"q2",q:"Une fois la communication assurée via la VHF portable, que fait-on des blessés ?\na) On transmet leur état via la VHF pour préparer l'assistance médicale à distance\nb) On attend que l'incendie soit maîtrisé\nc) On ne les mentionne pas tant que l'incendie n'est pas éteint"},
      {id:"q3",q:"Si la VHF portable venait elle aussi à tomber en panne, quelle serait l'action suivante ?\na) Attendre que quelqu'un répare la radio principale\nb) Ne rien faire, il n'y a plus d'option\nc) Activer l'EPIRB immédiatement — c'est le système de dernier recours"},
      {id:"q4",q:"Pourquoi ne pas activer l'EPIRB dès le début, avant même d'essayer la VHF portable ?\na) Parce que la VHF permet une communication vocale précise (position, nature, blessés) que l'EPIRB seul ne transmet pas\nb) Parce que l'EPIRB est réservé aux gros navires\nc) Parce que l'EPIRB prend plus de temps à s'activer que la VHF"},
      {id:"q5",q:"Quelle est l'erreur la plus coûteuse dans ce scénario multi-contraintes ?\na) Activer trop de systèmes en même temps\nb) Se figer devant la multiplicité des problèmes au lieu de hiérarchiser une action à la fois\nc) Utiliser la VHF portable trop tôt"},
    ],
    en:[
      {id:"q1",q:"Fire in the engine room, partial power loss, main radio out of service, a portable VHF still works, two injured. What is the very first priority?\na) Treat the injured before anything else\nb) Immediately switch to the portable VHF to communicate while still possible\nc) Activate the EPIRB as absolute priority"},
      {id:"q2",q:"Once communication is secured via the portable VHF, what do you do about the injured?\na) Relay their condition via VHF to prepare remote medical assistance\nb) Wait until the fire is under control\nc) Don't mention them until the fire is out"},
      {id:"q3",q:"If the portable VHF also failed, what would be the next action?\na) Wait for someone to repair the main radio\nb) Do nothing, there's no option left\nc) Activate the EPIRB immediately — it's the last-resort system"},
      {id:"q4",q:"Why not activate the EPIRB from the start, before even trying the portable VHF?\na) Because VHF allows precise voice communication (position, nature, injuries) that the EPIRB alone doesn't transmit\nb) Because the EPIRB is reserved for large vessels\nc) Because the EPIRB takes longer to activate than VHF"},
      {id:"q5",q:"What is the costliest error in this multi-constraint scenario?\na) Activating too many systems at once\nb) Freezing in front of multiple problems instead of prioritizing one action at a time\nc) Using the portable VHF too early"},
    ],
    es:[
      {id:"q1",q:"Incendio en la sala de máquinas, pérdida eléctrica parcial, radio principal fuera de servicio, una VHF portátil aún funciona, dos heridos. ¿Cuál es la primerísima prioridad?\na) Atender a los heridos antes que nada\nb) Cambiar inmediatamente a la VHF portátil para comunicar mientras sea posible\nc) Activar el EPIRB como prioridad absoluta"},
      {id:"q2",q:"Una vez asegurada la comunicación vía la VHF portátil, ¿qué se hace con los heridos?\na) Transmitir su estado por VHF para preparar asistencia médica remota\nb) Esperar a que el incendio esté controlado\nc) No mencionarlos hasta que el incendio esté apagado"},
      {id:"q3",q:"Si la VHF portátil también fallara, ¿cuál sería la siguiente acción?\na) Esperar a que alguien repare la radio principal\nb) No hacer nada, no queda opción\nc) Activar el EPIRB inmediatamente — es el sistema de último recurso"},
      {id:"q4",q:"¿Por qué no activar el EPIRB desde el principio, antes de intentar la VHF portátil?\na) Porque la VHF permite una comunicación vocal precisa (posición, naturaleza, heridos) que el EPIRB solo no transmite\nb) Porque el EPIRB está reservado para buques grandes\nc) Porque el EPIRB tarda más en activarse que la VHF"},
      {id:"q5",q:"¿Cuál es el error más costoso en este escenario multi-restricción?\na) Activar demasiados sistemas a la vez\nb) Quedarse paralizado ante múltiples problemas en lugar de priorizar una acción a la vez\nc) Usar la VHF portátil demasiado pronto"},
    ],
    pt:[
      {id:"q1",q:"Incêndio na casa das máquinas, perda elétrica parcial, rádio principal fora de serviço, um VHF portátil ainda funciona, dois feridos. Qual é a primeiríssima prioridade?\na) Tratar dos feridos antes de tudo\nb) Mudar imediatamente para o VHF portátil para comunicar enquanto for possível\nc) Ativar o EPIRB como prioridade absoluta"},
      {id:"q2",q:"Uma vez assegurada a comunicação via VHF portátil, o que se faz com os feridos?\na) Transmitir o seu estado via VHF para preparar assistência médica remota\nb) Esperar que o incêndio esteja controlado\nc) Não os mencionar até o incêndio estar apagado"},
      {id:"q3",q:"Se o VHF portátil também falhasse, qual seria a próxima ação?\na) Esperar que alguém repare o rádio principal\nb) Não fazer nada, não há mais opção\nc) Ativar o EPIRB imediatamente — é o sistema de último recurso"},
      {id:"q4",q:"Por que não ativar o EPIRB desde o início, antes mesmo de tentar o VHF portátil?\na) Porque o VHF permite uma comunicação vocal precisa (posição, natureza, feridos) que o EPIRB sozinho não transmite\nb) Porque o EPIRB é reservado para navios grandes\nc) Porque o EPIRB demora mais a ativar do que o VHF"},
      {id:"q5",q:"Qual é o erro mais dispendioso neste cenário multi-restrição?\na) Ativar demasiados sistemas ao mesmo tempo\nb) Ficar paralisado perante múltiplos problemas em vez de priorizar uma ação de cada vez\nc) Usar o VHF portátil cedo demais"},
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
        {lang==="fr"?"✅ Q1: b — communiquer tant que c'est possible reste la première priorité\n✅ Q2: a — transmettre l'information plutôt qu'attendre\n✅ Q3: c — l'EPIRB comme dernier recours quand plus rien d'autre ne fonctionne\n✅ Q4: a — la VHF transmet des détails que l'EPIRB seul ne peut pas donner\n✅ Q5: b — la paralysie devant plusieurs problèmes simultanés coûte plus cher qu'une hiérarchisation imparfaite mais active":
         lang==="en"?"✅ Q1: b — communicating while possible remains the first priority\n✅ Q2: a — relay information rather than wait\n✅ Q3: c — the EPIRB as last resort when nothing else works\n✅ Q4: a — VHF transmits details the EPIRB alone cannot give\n✅ Q5: b — freezing in front of several simultaneous problems costs more than imperfect but active prioritization":
         "✅ Q1: b · Q2: a · Q3: c · Q4: a · Q5: b"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — SV NINA
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"SV Nina — Mer de Tasman (juin 2013)",teaser:"Goélette · 7 disparus · 5 systèmes de détresse à bord · Aucun jamais activé",
      what:"La goélette Nina, âgée de 85 ans, quitte la Nouvelle-Zélande pour l'Australie en pleine saison des tempêtes hivernales avec 7 personnes à bord. Le navire est équipé de cinq systèmes différents : une EPIRB à activation manuelle, un traceur SPOT également manuel, un téléphone satellite, des fusées et une VHF. Le 4 juin, un dernier message signale des voiles de cape déchirées et une navigation à sec dans une mer démontée. Plus aucun contact ensuite. Aucun des cinq systèmes n'est jamais activé. Les recherches ne débutent que le 14 juin, faute d'avoir reçu le moindre signal de détresse. Après le plus grand ratissage aérien de l'histoire du sauvetage néo-zélandais, rien n'est retrouvé. Les 7 personnes restent portées disparues.",
      cause:"• EPIRB à activation exclusivement manuelle — aucune largeur hydrostatique automatique en cas d'événement soudain\n• Les cinq systèmes de détresse à bord partageaient tous la même faiblesse : nécessiter une action humaine consciente\n• Le naufrage a probablement été trop rapide pour permettre la moindre activation manuelle\n• Aucun signal reçu a directement retardé le début des recherches de 10 jours",
      lessons:"✓ Une redondance de systèmes ne protège pas si tous partagent la même vulnérabilité (ici : l'activation manuelle)\n✓ Un équipement à déclenchement automatique reste actif même si l'équipage ne peut plus agir\n✓ L'absence de tout signal peut, à elle seule, retarder gravement le déclenchement des secours\n✓ Le choix du mode d'activation (manuel vs automatique) doit anticiper les pires scénarios, pas seulement les plus probables",
      link:"🔗 Contrairement à El Faro (L1, hésitation à déclarer une détresse identifiée), le cas Nina illustre un problème différent : même une équipe volontaire n'a pas pu utiliser des équipements qui exigeaient tous une action manuelle, face à un événement trop soudain."},
    en:{title:"SV Nina — Tasman Sea (June 2013)",teaser:"Schooner · 7 missing · 5 distress systems on board · None ever activated",
      what:"The 85-year-old schooner Nina leaves New Zealand for Australia during the height of the winter storm season with 7 people on board. The vessel carries five different systems: a manually-activated EPIRB, an equally manual SPOT tracker, a satellite phone, flares and a VHF radio. On June 4, a final message reports shredded storm sails and bare-poles sailing in a raging sea. No further contact follows. None of the five systems is ever activated. The search only begins on June 14, since no distress signal was ever received. After the largest aerial search in New Zealand rescue history, nothing is found. All 7 people remain missing.",
      cause:"• EPIRB with manual activation only — no automatic hydrostatic release for a sudden event\n• All five distress systems on board shared the same weakness: requiring conscious human action\n• The sinking was likely too fast to allow any manual activation at all\n• The absence of any signal directly delayed the start of the search by 10 days",
      lessons:"✓ System redundancy does not protect if all systems share the same vulnerability (here: manual activation)\n✓ Automatically-triggered equipment stays active even if the crew can no longer act\n✓ The absence of any signal can, by itself, gravely delay the start of a rescue\n✓ The choice of activation mode (manual vs automatic) must anticipate worst-case scenarios, not just the most likely ones",
      link:"🔗 Unlike El Faro (L1, hesitation to declare an already-identified distress), the Nina case illustrates a different problem: even a willing crew could not use equipment that all required manual action, facing an event too sudden."},
    es:{title:"SV Nina — Mar de Tasmania (junio de 2013)",teaser:"Goleta · 7 desaparecidos · 5 sistemas de socorro a bordo · Ninguno activado nunca",
      what:"La goleta Nina, de 85 años, sale de Nueva Zelanda hacia Australia en plena temporada de tormentas invernales con 7 personas a bordo. El buque lleva cinco sistemas distintos: un EPIRB de activación manual, un rastreador SPOT también manual, un teléfono satelital, bengalas y una VHF. El 4 de junio, un último mensaje informa de velas de capa desgarradas y navegación a palo seco en un mar embravecido. No hay más contacto después. Ninguno de los cinco sistemas se activa nunca. La búsqueda solo comienza el 14 de junio, al no haberse recibido ninguna señal de socorro. Tras la mayor búsqueda aérea de la historia del rescate neozelandés, no se encuentra nada. Las 7 personas siguen desaparecidas.",
      cause:"• EPIRB de activación exclusivamente manual — sin largador hidrostático automático ante un evento repentino\n• Los cinco sistemas de socorro a bordo compartían la misma debilidad: exigir una acción humana consciente\n• El naufragio probablemente fue demasiado rápido para permitir cualquier activación manual\n• La ausencia de cualquier señal retrasó directamente el inicio de la búsqueda en 10 días",
      lessons:"✓ La redundancia de sistemas no protege si todos comparten la misma vulnerabilidad (aquí: la activación manual)\n✓ Un equipo de activación automática sigue activo aunque la tripulación ya no pueda actuar\n✓ La ausencia de cualquier señal puede, por sí sola, retrasar gravemente el inicio del rescate\n✓ La elección del modo de activación debe anticipar los peores escenarios, no solo los más probables",
      link:"🔗 A diferencia de El Faro (L1, duda para declarar una emergencia ya identificada), el caso Nina ilustra un problema distinto: incluso una tripulación dispuesta no pudo usar equipos que exigían todos una acción manual, ante un evento demasiado repentino."},
    pt:{title:"SV Nina — Mar da Tasmânia (junho de 2013)",teaser:"Escuna · 7 desaparecidos · 5 sistemas de socorro a bordo · Nenhum ativado",
      what:"A escuna Nina, com 85 anos, parte da Nova Zelândia rumo à Austrália em plena época de tempestades de inverno com 7 pessoas a bordo. O navio tem cinco sistemas diferentes: um EPIRB de ativação manual, um rastreador SPOT igualmente manual, um telefone satélite, foguetes e um VHF. A 4 de junho, uma última mensagem relata velas de capa rasgadas e navegação a seco num mar bravo. Nenhum contacto se segue. Nenhum dos cinco sistemas é alguma vez ativado. A busca só começa a 14 de junho, por não ter sido recebido qualquer sinal de socorro. Após a maior busca aérea da história do resgate neozelandês, nada é encontrado. As 7 pessoas continuam desaparecidas.",
      cause:"• EPIRB de ativação exclusivamente manual — sem largador hidrostático automático perante um evento súbito\n• Os cinco sistemas de socorro a bordo partilhavam a mesma fraqueza: exigir uma ação humana consciente\n• O naufrágio foi provavelmente rápido demais para permitir qualquer ativação manual\n• A ausência de qualquer sinal atrasou diretamente o início da busca em 10 dias",
      lessons:"✓ A redundância de sistemas não protege se todos partilharem a mesma vulnerabilidade (aqui: a ativação manual)\n✓ Um equipamento de ativação automática permanece ativo mesmo que a tripulação já não possa agir\n✓ A ausência de qualquer sinal pode, por si só, atrasar gravemente o início do resgate\n✓ A escolha do modo de ativação deve antecipar os piores cenários, não apenas os mais prováveis",
      link:"🔗 Ao contrário do El Faro (L1, hesitação em declarar uma emergência já identificada), o caso Nina ilustra um problema diferente: mesmo uma tripulação disposta não conseguiu usar equipamentos que exigiam todos ação manual, perante um evento demasiado súbito."},
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
// BANK — 15 QUESTIONS (scenario-only, min. 5-6)
// ══════════════════════════════════════
const BANK = {
  fr:[
    {q:"Incendie qui se propage, électricité encore disponible. Quel est le bon réflexe ?",opts:["Activer l'EPIRB immédiatement sans essayer de communiquer","Communiquer via DSC/VHF tant que c'est possible, garder l'EPIRB en réserve","Attendre que le feu soit éteint pour agir","Ignorer, un incendie n'est jamais une détresse"],correct:1,expl:"Tant que la communication est possible, elle doit être utilisée en priorité — l'EPIRB reste la réserve pour si tout le reste échoue."},
    {q:"Voie d'eau qui s'aggrave très rapidement. Quel système activer en premier ?",opts:["EPIRB, car c'est le seul qui continuera de fonctionner même si le navire coule vite","Uniquement la VHF, pour économiser la batterie de l'EPIRB","Attendre de voir si la voie d'eau ralentit","Les fusées, car elles sont visibles de loin"],correct:0,expl:"Face à un envahissement rapide, l'EPIRB doit être activé en priorité car il continue de fonctionner même en cas de naufrage soudain."},
    {q:"Homme à la mer isolé. Quel est le réflexe le plus adapté ?",opts:["Activer l'EPIRB du navire immédiatement","VHF immédiate pour alerter les navires proches, l'EPIRB n'est pas la première réponse ici","Ne rien faire tant que la personne n'est pas vue","Envoyer un message satellite uniquement"],correct:1,expl:"Pour une personne isolée à l'eau, l'alerte immédiate aux navires proches par VHF est plus rapide et plus adaptée que l'EPIRB."},
    {q:"Pourquoi ne faut-il jamais compter sur un seul mode d'activation (manuel ou automatique) ?",opts:["Parce que la réglementation l'interdit","Parce que chaque mode a une faiblesse différente ; la redondance ne protège que si les modes se complètent","Parce que les deux modes coûtent le même prix","Parce que le mode automatique est toujours défaillant"],correct:1,expl:"Le manuel dépend de la capacité humaine à agir ; l'automatique ne dépend pas de l'équipage. Combiner les deux couvre plus de scénarios qu'un seul mode répété plusieurs fois."},
    {q:"Panne de la radio principale, VHF portable disponible, deux blessés à bord. Que fait-on en premier ?",opts:["Soigner les blessés avant toute communication","Basculer sur la VHF portable pour communiquer et transmettre l'état des blessés","Attendre la réparation de la radio principale","Activer l'EPIRB sans essayer la VHF portable"],correct:1,expl:"La VHF portable permet de communiquer des informations précises (position, blessés) que l'EPIRB seul ne peut pas transmettre."},
    {q:"Une urgence médicale grave survient, toutes les communications fonctionnent normalement. Quel est le bon choix ?",opts:["EPIRB uniquement","DSC + contact vocal direct pour transmettre des détails précis à un médecin ou au MRCC","Fusées de détresse","Aucune action, attendre l'évolution"],correct:1,expl:"Une urgence médicale nécessite la transmission de détails précis — le contact vocal direct via DSC/VHF est plus adapté que l'EPIRB seul."},
    {q:"Que signifie 'Equipment does not save lives. People do. Equipment only increases the probability' ?",opts:["L'équipement est inutile","L'équipement ne remplace jamais le jugement humain, il l'augmente seulement","Il faut toujours désactiver l'équipement automatique","Seul l'équipement compte, pas les décisions"],correct:1,expl:"Cette phrase résume la philosophie du module : l'équipement est un multiplicateur de chances, pas un substitut au jugement humain."},
    {q:"Pourquoi le facteur temps fait-il partie de l'équipement lui-même ?",opts:["Parce que le bon équipement activé trop tard produit le même résultat qu'aucun équipement","Parce que le temps n'a aucune influence sur l'efficacité d'un système","Parce que seul l'EPIRB est sensible au temps","Parce que le temps ne concerne que les gros navires"],correct:0,expl:"Un équipement parfaitement choisi mais activé trop tard perd une grande partie de son utilité — le moment de l'activation compte autant que le choix lui-même."},
    {q:"Dans quel cas une activation simultanée (EPIRB + DSC ensemble) est-elle justifiée ?",opts:["Toujours, quelle que soit la situation","Quand le temps restant est déjà très court et incertain","Jamais, il faut toujours activer un seul système à la fois","Uniquement en cas de panne électrique totale"],correct:1,expl:"Quand la marge de temps est incertaine et potentiellement très courte, activer plusieurs systèmes ensemble maximise les chances d'alerte."},
    {q:"Dans quel cas une activation séquentielle (DSC d'abord, EPIRB ensuite) est-elle plus adaptée ?",opts:["Quand la situation reste maîtrisable et laisse le temps de communiquer d'abord","Uniquement de nuit","Uniquement si l'équipage est nombreux","Jamais, l'activation doit toujours être groupée"],correct:0,expl:"Une situation encore maîtrisable permet de commencer par la communication, en gardant l'EPIRB en réserve si l'évolution l'exige."},
    {q:"Dans le cas SV Nina, pourquoi les cinq systèmes de détresse à bord n'ont-ils servi à rien ?",opts:["Ils étaient tous défectueux","Ils partageaient tous la même faiblesse : nécessiter une activation manuelle par un équipage conscient","Le navire n'était pas assez équipé","Les systèmes n'étaient pas enregistrés"],correct:1,expl:"Cinq systèmes différents mais tous manuels signifient une seule vulnérabilité répétée cinq fois, pas une vraie redondance."},
    {q:"Quelle est la conséquence directe de l'absence totale de signal dans le cas Nina ?",opts:["Aucune, les secours ont été alertés immédiatement","Un retard de 10 jours avant même le début des recherches","Un sauvetage rapide grâce à d'autres navires","Aucun lien avec le début des recherches"],correct:1,expl:"Sans le moindre signal reçu, les autorités n'ont commencé les recherches qu'après un signalement de disparition, 10 jours plus tard."},
    {q:"Quelle est l'erreur la plus fréquente de sélection d'équipement selon cette leçon ?",opts:["Utiliser trop de systèmes à la fois","Miser sur un seul mode d'activation, ou activer le mauvais système en premier selon la situation","Toujours utiliser la VHF en premier","Ne jamais utiliser l'EPIRB"],correct:1,expl:"Les erreurs les plus coûteuses sont de compter sur un seul mode d'activation ou de mal faire correspondre le système à la nature de l'urgence."},
    {q:"Quel est l'objectif principal de cette leçon dans le Safety Department ?",opts:["Réexpliquer le fonctionnement technique de chaque équipement GMDSS","Apprendre à choisir le bon système, au bon moment, selon la situation réelle","Étudier les zones A1-A4 en détail","Comparer les prix des équipements de détresse"],correct:1,expl:"Cette leçon ne réexplique aucune théorie déjà couverte en Deck — elle se concentre uniquement sur le jugement de sélection et de timing."},
    {q:"Pourquoi cette leçon ne développe-t-elle pas les procédures d'abandon du navire ?",opts:["Parce que ce sujet appartient exclusivement au futur module s5 (Lifeboats, Liferafts & HRU)","Parce que ce n'est jamais utile","Parce que ça a déjà été vu en L1","Parce que le format ne le permet pas"],correct:0,expl:"Conformément à la règle d'architecture MAP, l'abandon du navire reste le domaine exclusif du futur module s5."},
  ],
  en:[
    {q:"Spreading fire, electricity still available. What is the correct reflex?",opts:["Activate the EPIRB immediately without trying to communicate","Communicate via DSC/VHF while still possible, keep the EPIRB in reserve","Wait until the fire is out to act","Ignore it, a fire is never distress"],correct:1,expl:"As long as communication is possible, it should be used first — the EPIRB remains the reserve if everything else fails."},
    {q:"Flooding rapidly worsening. Which system should be activated first?",opts:["EPIRB, because it's the only one that keeps working even if the vessel sinks quickly","VHF only, to save the EPIRB's battery","Wait to see if the flooding slows down","Flares, because they're visible from afar"],correct:0,expl:"Facing rapid flooding, the EPIRB should be activated first as it keeps working even in a sudden sinking."},
    {q:"An isolated man overboard. What is the most suitable reflex?",opts:["Immediately activate the vessel's EPIRB","Immediate VHF to alert nearby vessels, the EPIRB isn't the first response here","Do nothing until the person is seen","Send a satellite message only"],correct:1,expl:"For a lone person in the water, an immediate VHF alert to nearby vessels is faster and more suitable than the EPIRB."},
    {q:"Why should you never rely on a single activation mode (manual or automatic)?",opts:["Because regulations forbid it","Because each mode has a different weakness; redundancy only protects if modes complement each other","Because both modes cost the same","Because the automatic mode always fails"],correct:1,expl:"Manual depends on human ability to act; automatic doesn't depend on the crew. Combining both covers more scenarios than repeating a single mode several times."},
    {q:"Main radio failure, portable VHF available, two injured on board. What do you do first?",opts:["Treat the injured before any communication","Switch to the portable VHF to communicate and relay the injured's condition","Wait for the main radio to be repaired","Activate the EPIRB without trying the portable VHF"],correct:1,expl:"The portable VHF allows relaying precise information (position, injuries) that the EPIRB alone cannot transmit."},
    {q:"A serious medical emergency occurs, all communications work normally. What is the correct choice?",opts:["EPIRB only","DSC + direct voice contact to relay precise details to a doctor or the MRCC","Distress flares","No action, wait for developments"],correct:1,expl:"A medical emergency requires transmitting precise details — direct voice contact via DSC/VHF is more suitable than the EPIRB alone."},
    {q:"What does 'Equipment does not save lives. People do. Equipment only increases the probability' mean?",opts:["Equipment is useless","Equipment never replaces human judgment, it only increases it","Automatic equipment should always be disabled","Only equipment matters, not decisions"],correct:1,expl:"This sentence summarizes the module's philosophy: equipment multiplies the odds, it doesn't substitute for human judgment."},
    {q:"Why is time part of the equipment itself?",opts:["Because the right equipment activated too late produces the same result as no equipment","Because time has no influence on a system's effectiveness","Because only the EPIRB is time-sensitive","Because time only concerns large vessels"],correct:0,expl:"Perfectly chosen equipment activated too late loses much of its usefulness — timing matters as much as the choice itself."},
    {q:"When is simultaneous activation (EPIRB + DSC together) justified?",opts:["Always, regardless of the situation","When remaining time is already very short and uncertain","Never, only one system should ever be activated at a time","Only in case of total power failure"],correct:1,expl:"When the time margin is uncertain and potentially very short, activating several systems together maximizes the chances of alerting."},
    {q:"When is a sequential activation (DSC first, EPIRB next) more suitable?",opts:["When the situation remains manageable and leaves time to communicate first","Only at night","Only if the crew is large","Never, activation must always be grouped"],correct:0,expl:"A still-manageable situation allows starting with communication, keeping the EPIRB in reserve if the situation evolves."},
    {q:"In the SV Nina case, why were all five distress systems on board useless?",opts:["They were all defective","They all shared the same weakness: requiring manual activation by a conscious crew","The vessel wasn't equipped enough","The systems weren't registered"],correct:1,expl:"Five different systems but all manual means a single vulnerability repeated five times, not real redundancy."},
    {q:"What is the direct consequence of the total absence of signal in the Nina case?",opts:["None, rescuers were alerted immediately","A 10-day delay before the search even began","A quick rescue thanks to other vessels","No link to the start of the search"],correct:1,expl:"With no signal received at all, authorities only began searching after a missing-person report, 10 days later."},
    {q:"What is the most frequent equipment-selection error according to this lesson?",opts:["Using too many systems at once","Relying on a single activation mode, or activating the wrong system first for the situation","Always using VHF first","Never using the EPIRB"],correct:1,expl:"The costliest errors are relying on a single activation mode or mismatching the system to the nature of the emergency."},
    {q:"What is the main goal of this lesson in the Safety Department?",opts:["Re-explain the technical operation of each GMDSS device","Learn to choose the right system, at the right time, for the real situation","Study A1-A4 zones in detail","Compare the prices of distress equipment"],correct:1,expl:"This lesson does not re-explain any theory already covered at Deck — it focuses solely on the judgment of selection and timing."},
    {q:"Why doesn't this lesson develop abandon-ship procedures?",opts:["Because that topic exclusively belongs to the future s5 module (Lifeboats, Liferafts & HRU)","Because it's never useful","Because it was already covered in L1","Because the format doesn't allow it"],correct:0,expl:"Per MAP's architecture rule, abandoning ship remains the exclusive domain of the future s5 module."},
  ],
  es:[
    {q:"Incendio que se propaga, electricidad aún disponible. ¿Cuál es el reflejo correcto?",opts:["Activar el EPIRB inmediatamente sin intentar comunicar","Comunicar vía DSC/VHF mientras sea posible, guardar el EPIRB en reserva","Esperar a que se apague el fuego para actuar","Ignorarlo, un incendio nunca es una emergencia"],correct:1,expl:"Mientras la comunicación sea posible, debe usarse primero — el EPIRB queda de reserva si todo lo demás falla."},
    {q:"Vía de agua que empeora muy rápido. ¿Qué sistema activar primero?",opts:["EPIRB, porque es el único que seguirá funcionando aunque el buque se hunda rápido","Solo la VHF, para ahorrar la batería del EPIRB","Esperar a ver si la vía de agua se ralentiza","Las bengalas, porque se ven desde lejos"],correct:0,expl:"Ante una inundación rápida, el EPIRB debe activarse primero porque sigue funcionando incluso en un hundimiento repentino."},
    {q:"Hombre al agua aislado. ¿Cuál es el reflejo más adecuado?",opts:["Activar el EPIRB del buque inmediatamente","VHF inmediata para alertar a buques cercanos, el EPIRB no es la primera respuesta aquí","No hacer nada hasta ver a la persona","Enviar solo un mensaje satelital"],correct:1,expl:"Para una persona sola en el agua, alertar de inmediato a buques cercanos por VHF es más rápido y adecuado que el EPIRB."},
    {q:"¿Por qué nunca hay que confiar en un solo modo de activación (manual o automático)?",opts:["Porque la normativa lo prohíbe","Porque cada modo tiene una debilidad distinta; la redundancia solo protege si los modos se complementan","Porque ambos modos cuestan lo mismo","Porque el modo automático siempre falla"],correct:1,expl:"El manual depende de la capacidad humana de actuar; el automático no depende de la tripulación. Combinar ambos cubre más escenarios."},
    {q:"Fallo de la radio principal, VHF portátil disponible, dos heridos a bordo. ¿Qué se hace primero?",opts:["Atender a los heridos antes de cualquier comunicación","Cambiar a la VHF portátil para comunicar y transmitir el estado de los heridos","Esperar la reparación de la radio principal","Activar el EPIRB sin intentar la VHF portátil"],correct:1,expl:"La VHF portátil permite transmitir información precisa (posición, heridos) que el EPIRB solo no puede transmitir."},
    {q:"Ocurre una emergencia médica grave, todas las comunicaciones funcionan con normalidad. ¿Cuál es la elección correcta?",opts:["Solo EPIRB","DSC + contacto vocal directo para transmitir detalles precisos a un médico o al MRCC","Bengalas de socorro","Ninguna acción, esperar la evolución"],correct:1,expl:"Una emergencia médica requiere transmitir detalles precisos — el contacto vocal directo vía DSC/VHF es más adecuado que el EPIRB solo."},
    {q:"¿Qué significa 'Equipment does not save lives. People do. Equipment only increases the probability'?",opts:["El equipo es inútil","El equipo nunca sustituye al juicio humano, solo lo aumenta","Siempre hay que desactivar el equipo automático","Solo importa el equipo, no las decisiones"],correct:1,expl:"Esta frase resume la filosofía del módulo: el equipo multiplica las probabilidades, no sustituye al juicio humano."},
    {q:"¿Por qué el factor tiempo forma parte del propio equipo?",opts:["Porque el equipo correcto activado demasiado tarde produce el mismo resultado que ningún equipo","Porque el tiempo no influye en la eficacia de un sistema","Porque solo el EPIRB es sensible al tiempo","Porque el tiempo solo concierne a los buques grandes"],correct:0,expl:"Un equipo perfectamente elegido pero activado demasiado tarde pierde gran parte de su utilidad — el momento cuenta tanto como la elección."},
    {q:"¿Cuándo se justifica una activación simultánea (EPIRB + DSC juntos)?",opts:["Siempre, sea cual sea la situación","Cuando el tiempo restante ya es muy corto e incierto","Nunca, solo debe activarse un sistema a la vez","Solo en caso de fallo eléctrico total"],correct:1,expl:"Cuando el margen de tiempo es incierto y potencialmente muy corto, activar varios sistemas juntos maximiza las posibilidades de alerta."},
    {q:"¿Cuándo es más adecuada una activación secuencial (DSC primero, EPIRB después)?",opts:["Cuando la situación sigue siendo manejable y deja tiempo para comunicar primero","Solo de noche","Solo si la tripulación es numerosa","Nunca, la activación siempre debe ser conjunta"],correct:0,expl:"Una situación aún manejable permite empezar por la comunicación, guardando el EPIRB en reserva si la situación evoluciona."},
    {q:"En el caso SV Nina, ¿por qué no sirvieron de nada los cinco sistemas de socorro a bordo?",opts:["Estaban todos defectuosos","Todos compartían la misma debilidad: requerir activación manual por una tripulación consciente","El buque no estaba suficientemente equipado","Los sistemas no estaban registrados"],correct:1,expl:"Cinco sistemas distintos pero todos manuales significan una sola vulnerabilidad repetida cinco veces, no una redundancia real."},
    {q:"¿Cuál es la consecuencia directa de la ausencia total de señal en el caso Nina?",opts:["Ninguna, el rescate se alertó de inmediato","Un retraso de 10 días antes de que comenzara siquiera la búsqueda","Un rescate rápido gracias a otros buques","Ninguna relación con el inicio de la búsqueda"],correct:1,expl:"Sin recibir ninguna señal, las autoridades solo comenzaron a buscar tras un reporte de desaparición, 10 días después."},
    {q:"¿Cuál es el error más frecuente de selección de equipo según esta lección?",opts:["Usar demasiados sistemas a la vez","Confiar en un solo modo de activación, o activar el sistema equivocado primero según la situación","Usar siempre la VHF primero","Nunca usar el EPIRB"],correct:1,expl:"Los errores más costosos son confiar en un solo modo de activación o no hacer coincidir el sistema con la naturaleza de la emergencia."},
    {q:"¿Cuál es el objetivo principal de esta lección en el Safety Department?",opts:["Reexplicar el funcionamiento técnico de cada equipo GMDSS","Aprender a elegir el sistema correcto, en el momento correcto, según la situación real","Estudiar las zonas A1-A4 en detalle","Comparar los precios de los equipos de socorro"],correct:1,expl:"Esta lección no reexplica ninguna teoría ya cubierta en Deck — se centra únicamente en el juicio de selección y de tiempo."},
    {q:"¿Por qué esta lección no desarrolla los procedimientos de abandono del buque?",opts:["Porque ese tema pertenece exclusivamente al futuro módulo s5 (Lifeboats, Liferafts & HRU)","Porque nunca es útil","Porque ya se vio en L1","Porque el formato no lo permite"],correct:0,expl:"Según la regla de arquitectura de MAP, abandonar el buque sigue siendo dominio exclusivo del futuro módulo s5."},
  ],
  pt:[
    {q:"Incêndio a alastrar, eletricidade ainda disponível. Qual é o reflexo correto?",opts:["Ativar o EPIRB imediatamente sem tentar comunicar","Comunicar via DSC/VHF enquanto for possível, guardar o EPIRB em reserva","Esperar que o fogo esteja apagado para agir","Ignorar, um incêndio nunca é uma emergência"],correct:1,expl:"Enquanto a comunicação for possível, deve ser usada primeiro — o EPIRB fica de reserva se tudo o resto falhar."},
    {q:"Via de água a piorar muito rapidamente. Que sistema ativar primeiro?",opts:["EPIRB, porque é o único que continuará a funcionar mesmo que o navio afunde rapidamente","Só o VHF, para poupar a bateria do EPIRB","Esperar para ver se a via de água abranda","Os foguetes, porque são visíveis de longe"],correct:0,expl:"Perante um alagamento rápido, o EPIRB deve ser ativado primeiro pois continua a funcionar mesmo num afundamento súbito."},
    {q:"Homem ao mar isolado. Qual é o reflexo mais adequado?",opts:["Ativar imediatamente o EPIRB do navio","VHF imediato para alertar navios próximos, o EPIRB não é a primeira resposta aqui","Não fazer nada até a pessoa ser vista","Enviar apenas uma mensagem por satélite"],correct:1,expl:"Para uma pessoa sozinha na água, alertar imediatamente os navios próximos por VHF é mais rápido e adequado que o EPIRB."},
    {q:"Por que nunca se deve confiar num único modo de ativação (manual ou automático)?",opts:["Porque o regulamento o proíbe","Porque cada modo tem uma fraqueza diferente; a redundância só protege se os modos se complementarem","Porque ambos os modos custam o mesmo","Porque o modo automático falha sempre"],correct:1,expl:"O manual depende da capacidade humana de agir; o automático não depende da tripulação. Combinar ambos cobre mais cenários."},
    {q:"Falha do rádio principal, VHF portátil disponível, dois feridos a bordo. O que se faz primeiro?",opts:["Tratar dos feridos antes de qualquer comunicação","Mudar para o VHF portátil para comunicar e transmitir o estado dos feridos","Esperar pela reparação do rádio principal","Ativar o EPIRB sem tentar o VHF portátil"],correct:1,expl:"O VHF portátil permite transmitir informação precisa (posição, feridos) que o EPIRB sozinho não pode transmitir."},
    {q:"Ocorre uma emergência médica grave, todas as comunicações funcionam normalmente. Qual é a escolha correta?",opts:["Só EPIRB","DSC + contacto vocal direto para transmitir detalhes precisos a um médico ou ao MRCC","Foguetes de socorro","Nenhuma ação, esperar a evolução"],correct:1,expl:"Uma emergência médica requer a transmissão de detalhes precisos — o contacto vocal direto via DSC/VHF é mais adequado que o EPIRB sozinho."},
    {q:"O que significa 'Equipment does not save lives. People do. Equipment only increases the probability'?",opts:["O equipamento é inútil","O equipamento nunca substitui o julgamento humano, apenas o aumenta","O equipamento automático deve ser sempre desativado","Só o equipamento conta, não as decisões"],correct:1,expl:"Esta frase resume a filosofia do módulo: o equipamento multiplica as probabilidades, não substitui o julgamento humano."},
    {q:"Por que o fator tempo faz parte do próprio equipamento?",opts:["Porque o equipamento certo ativado tarde demais produz o mesmo resultado que nenhum equipamento","Porque o tempo não tem influência na eficácia de um sistema","Porque só o EPIRB é sensível ao tempo","Porque o tempo só diz respeito a navios grandes"],correct:0,expl:"Um equipamento perfeitamente escolhido mas ativado tarde demais perde grande parte da sua utilidade — o momento conta tanto quanto a escolha."},
    {q:"Quando é justificada uma ativação simultânea (EPIRB + DSC juntos)?",opts:["Sempre, seja qual for a situação","Quando o tempo restante já é muito curto e incerto","Nunca, só se deve ativar um sistema de cada vez","Só em caso de falha elétrica total"],correct:1,expl:"Quando a margem de tempo é incerta e potencialmente muito curta, ativar vários sistemas juntos maximiza as hipóteses de alerta."},
    {q:"Quando é mais adequada uma ativação sequencial (DSC primeiro, EPIRB depois)?",opts:["Quando a situação continua gerível e deixa tempo para comunicar primeiro","Só à noite","Só se a tripulação for numerosa","Nunca, a ativação deve ser sempre em grupo"],correct:0,expl:"Uma situação ainda gerível permite começar pela comunicação, guardando o EPIRB em reserva se a situação evoluir."},
    {q:"No caso SV Nina, por que os cinco sistemas de socorro a bordo não serviram de nada?",opts:["Estavam todos defeituosos","Todos partilhavam a mesma fraqueza: exigir ativação manual por uma tripulação consciente","O navio não estava suficientemente equipado","Os sistemas não estavam registados"],correct:1,expl:"Cinco sistemas diferentes mas todos manuais significam uma única vulnerabilidade repetida cinco vezes, não uma redundância real."},
    {q:"Qual é a consequência direta da ausência total de sinal no caso Nina?",opts:["Nenhuma, o resgate foi alertado imediatamente","Um atraso de 10 dias antes mesmo do início da busca","Um resgate rápido graças a outros navios","Nenhuma ligação com o início da busca"],correct:1,expl:"Sem qualquer sinal recebido, as autoridades só começaram a busca após um relato de desaparecimento, 10 dias depois."},
    {q:"Qual é o erro mais frequente de seleção de equipamento segundo esta lição?",opts:["Usar demasiados sistemas ao mesmo tempo","Confiar num único modo de ativação, ou ativar o sistema errado primeiro conforme a situação","Usar sempre o VHF primeiro","Nunca usar o EPIRB"],correct:1,expl:"Os erros mais dispendiosos são confiar num único modo de ativação ou não fazer corresponder o sistema à natureza da emergência."},
    {q:"Qual é o objetivo principal desta lição no Safety Department?",opts:["Reexplicar o funcionamento técnico de cada equipamento GMDSS","Aprender a escolher o sistema certo, no momento certo, conforme a situação real","Estudar as zonas A1-A4 em detalhe","Comparar os preços dos equipamentos de socorro"],correct:1,expl:"Esta lição não reexplica nenhuma teoria já coberta no Deck — foca-se unicamente no julgamento de seleção e de tempo."},
    {q:"Por que esta lição não desenvolve os procedimentos de abandono do navio?",opts:["Porque esse tema pertence exclusivamente ao futuro módulo s5 (Lifeboats, Liferafts & HRU)","Porque nunca é útil","Porque já foi visto em L1","Porque o formato não o permite"],correct:0,expl:"Segundo a regra de arquitetura da MAP, abandonar o navio continua a ser domínio exclusivo do futuro módulo s5."},
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
    {q:"Incendie qui se propage, électricité disponible. Que fait-on en premier ?",opts:["Activer l'EPIRB directement","Communiquer via DSC/VHF tant que c'est possible","Attendre que le feu diminue","Rien, un incendie n'est pas une détresse"],correct:1,expl:"Communiquer tant que c'est possible reste la priorité, en gardant l'EPIRB en réserve."},
    {q:"Voie d'eau très rapide. Quel système en premier ?",opts:["EPIRB","VHF uniquement","Fusées","Attendre"],correct:0,expl:"Face à un envahissement rapide, l'EPIRB doit être activé en premier car il continue de fonctionner même en cas de naufrage soudain."},
    {q:"Pourquoi ne jamais compter sur un seul mode d'activation ?",opts:["C'est interdit","Chaque mode a une faiblesse différente ; combiner les modes couvre plus de scénarios","Cela coûte plus cher","Le mode automatique est toujours en panne"],correct:1,expl:"La vraie redondance vient de la complémentarité des modes, pas de leur répétition."},
    {q:"Dans le cas SV Nina, pourquoi les cinq systèmes n'ont-ils servi à rien ?",opts:["Ils étaient tous cassés","Ils étaient tous manuels — la même vulnérabilité répétée cinq fois","Le navire n'était pas équipé","Ils n'étaient pas enregistrés"],correct:1,expl:"Cinq systèmes manuels ne constituent pas une vraie redondance face à un événement trop soudain pour permettre une action."},
    {q:"Que signifie 'Time is part of the equipment' ?",opts:["Le temps n'a aucune importance","Le bon équipement activé trop tard produit le même résultat qu'aucun équipement","Seul le temps compte, pas l'équipement","Cela ne concerne que l'EPIRB"],correct:1,expl:"Le moment de l'activation compte autant que le choix de l'équipement lui-même."},
  ],
  en:[
    {q:"Spreading fire, electricity available. What do you do first?",opts:["Activate the EPIRB directly","Communicate via DSC/VHF while still possible","Wait for the fire to die down","Nothing, a fire is not distress"],correct:1,expl:"Communicating while possible remains the priority, keeping the EPIRB in reserve."},
    {q:"Very rapid flooding. Which system first?",opts:["EPIRB","VHF only","Flares","Wait"],correct:0,expl:"Facing rapid flooding, the EPIRB must be activated first as it keeps working even in a sudden sinking."},
    {q:"Why never rely on a single activation mode?",opts:["It's forbidden","Each mode has a different weakness; combining modes covers more scenarios","It costs more","The automatic mode always fails"],correct:1,expl:"Real redundancy comes from complementary modes, not from repeating the same one."},
    {q:"In the SV Nina case, why were the five systems useless?",opts:["They were all broken","They were all manual — the same vulnerability repeated five times","The vessel wasn't equipped","They weren't registered"],correct:1,expl:"Five manual systems don't constitute real redundancy facing an event too sudden to allow action."},
    {q:"What does 'Time is part of the equipment' mean?",opts:["Time doesn't matter","The right equipment activated too late produces the same result as no equipment","Only time matters, not equipment","It only concerns the EPIRB"],correct:1,expl:"The timing of activation matters as much as the choice of equipment itself."},
  ],
  es:[
    {q:"Incendio que se propaga, electricidad disponible. ¿Qué se hace primero?",opts:["Activar el EPIRB directamente","Comunicar vía DSC/VHF mientras sea posible","Esperar a que el fuego disminuya","Nada, un incendio no es una emergencia"],correct:1,expl:"Comunicar mientras sea posible sigue siendo la prioridad, guardando el EPIRB en reserva."},
    {q:"Vía de agua muy rápida. ¿Qué sistema primero?",opts:["EPIRB","Solo VHF","Bengalas","Esperar"],correct:0,expl:"Ante una inundación rápida, el EPIRB debe activarse primero porque sigue funcionando incluso en un hundimiento repentino."},
    {q:"¿Por qué nunca confiar en un solo modo de activación?",opts:["Está prohibido","Cada modo tiene una debilidad distinta; combinar modos cubre más escenarios","Cuesta más","El modo automático siempre falla"],correct:1,expl:"La verdadera redundancia viene de la complementariedad de los modos, no de repetirlos."},
    {q:"En el caso SV Nina, ¿por qué los cinco sistemas no sirvieron de nada?",opts:["Estaban todos rotos","Eran todos manuales — la misma vulnerabilidad repetida cinco veces","El buque no estaba equipado","No estaban registrados"],correct:1,expl:"Cinco sistemas manuales no constituyen una redundancia real ante un evento demasiado repentino para permitir actuar."},
    {q:"¿Qué significa 'Time is part of the equipment'?",opts:["El tiempo no importa","El equipo correcto activado demasiado tarde produce el mismo resultado que ningún equipo","Solo importa el tiempo, no el equipo","Solo concierne al EPIRB"],correct:1,expl:"El momento de la activación importa tanto como la elección del equipo."},
  ],
  pt:[
    {q:"Incêndio a alastrar, eletricidade disponível. O que se faz primeiro?",opts:["Ativar o EPIRB diretamente","Comunicar via DSC/VHF enquanto for possível","Esperar que o fogo diminua","Nada, um incêndio não é uma emergência"],correct:1,expl:"Comunicar enquanto for possível continua a ser a prioridade, guardando o EPIRB em reserva."},
    {q:"Via de água muito rápida. Que sistema primeiro?",opts:["EPIRB","Só VHF","Foguetes","Esperar"],correct:0,expl:"Perante um alagamento rápido, o EPIRB deve ser ativado primeiro pois continua a funcionar mesmo num afundamento súbito."},
    {q:"Por que nunca confiar num único modo de ativação?",opts:["É proibido","Cada modo tem uma fraqueza diferente; combinar modos cobre mais cenários","Custa mais","O modo automático falha sempre"],correct:1,expl:"A verdadeira redundância vem da complementaridade dos modos, não de os repetir."},
    {q:"No caso SV Nina, por que os cinco sistemas não serviram de nada?",opts:["Estavam todos avariados","Eram todos manuais — a mesma vulnerabilidade repetida cinco vezes","O navio não estava equipado","Não estavam registados"],correct:1,expl:"Cinco sistemas manuais não constituem uma redundância real perante um evento demasiado súbito para permitir agir."},
    {q:"O que significa 'Time is part of the equipment'?",opts:["O tempo não importa","O equipamento certo ativado tarde demais produz o mesmo resultado que nenhum equipamento","Só o tempo importa, não o equipamento","Só diz respeito ao EPIRB"],correct:1,expl:"O momento da ativação importa tanto quanto a escolha do equipamento."},
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
    fr:"Si tous les systèmes de détresse à bord tombaient soudainement en panne sauf un, lequel te ferait le plus confiance — et pourquoi ?",
    en:"If every distress system on board suddenly failed except one, which one would you trust the most — and why?",
    es:"Si todos los sistemas de socorro a bordo fallaran de repente excepto uno, ¿en cuál confiarías más — y por qué?",
    pt:"Se todos os sistemas de socorro a bordo falhassem subitamente exceto um, em qual confiarias mais — e porquê?",
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
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Leçon 2/5 · ⭐ Premium",
      title:"Selecting the Right Distress Equipment",
      intro:"Cette leçon ne réexplique pas le fonctionnement technique de l'EPIRB, du SART ou du DSC — tout cela est déjà couvert en profondeur dans le module Deck.\n\nIci, la question est : une fois la détresse reconnue (L1), quel système activer, dans quel ordre, et pourquoi celui-ci plutôt qu'un autre ?",
      p0:"EVERY EMERGENCY IS DIFFERENT",s0t:"Il n'existe pas de réponse unique",
      s0:"Le réflexe d'activer tout en même temps n'est pas toujours le bon, et attendre d'être sûr de bien faire peut coûter un temps précieux.\n\nQUAND UTILISER CE SYSTÈME ? Cela dépend entièrement de la nature de l'urgence.\nPOURQUOI CELUI-CI PLUTÔT QU'UN AUTRE ? Chaque système a une force et une limite précises.\nQUELLE ERREUR COÛTE LE PLUS DE VIES ? Mal faire correspondre le système à la situation réelle.",
      p1:"LA BOÎTE À OUTILS DU MARIN, EN UN COUP D'ŒIL",s1t:"Rappel bref — le détail complet reste en Deck",
      s1:"EPIRB, SART, AIS-SART, DSC, VHF portable : chaque système a un rôle précis, déjà détaillé en profondeur dans le module Deck (Signalisation & Balisage). Ce qui compte ici n'est pas de les connaître, mais de savoir les choisir.",
      p2:"FAIRE CORRESPONDRE LA SITUATION À L'ÉQUIPEMENT",s2t:"Le cœur de cette leçon",
      s2:"Incendie, voie d'eau, homme à la mer, panne radio, urgence médicale n'appellent pas la même priorité d'activation. Le bon réflexe se construit situation par situation, pas par mémorisation générale.",
      p3:"TIME IS PART OF THE EQUIPMENT",s3t:"Le bon système activé trop tard équivaut à aucun système",
      s3:"Choisir le bon équipement ne suffit pas si le moment de l'activation est mal choisi. EPIRB trop tard, DSC trop tard, SART trop tôt, AIS-SART oublié : le facteur temps fait partie intégrante de la décision d'équipement, pas une considération secondaire.",
      p4:"MANUEL VS AUTOMATIQUE",s4t:"Comprendre quand déclencher soi-même",
      s4:"L'activation manuelle dépend d'un équipage conscient et capable d'agir. L'activation automatique ne dépend de rien de tout cela. Ce choix ne doit jamais être un réflexe par défaut — il doit anticiper les pires scénarios, pas seulement les plus probables.",
      p5:"SIMULTANÉ OU SÉQUENTIEL ?",s5t:"Grouper ou échelonner selon le temps disponible",
      s5:"Certains systèmes doivent être activés ensemble quand le temps restant est déjà très court et incertain. D'autres peuvent être activés en cascade, en commençant par la communication, quand la situation reste maîtrisable.",
      p6:"LA REDONDANCE SAUVE DES VIES",s6t:"Un marin professionnel ne compte jamais sur un seul système",
      s6:"Equipment does not save lives. People do. Equipment only increases the probability.\n\nAvoir un plan B signifie concrètement : combiner des systèmes qui ne partagent pas la même faiblesse — pas simplement multiplier les équipements du même type.",
      p7:"ERREURS FRÉQUENTES DE SÉLECTION D'ÉQUIPEMENT",s7t:"Le mauvais choix, pas le mauvais équipement",
      s7:"Activer le mauvais système en premier, tout miser sur l'automatique, oublier la VHF portable de secours — ces erreurs reviennent dans la plupart des cas étudiés où l'issue aurait pu changer.",
      p8:"🎯 EXERCICE OPÉRATIONNEL",p9:"⚠️ CAS RÉEL",p10:"📝 BANQUE DE 15 QUESTIONS",p11:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 2",
      sumP:["Chaque urgence appelle une priorité d'équipement différente","Le moment de l'activation fait partie de la décision, pas seulement le choix du système","Manuel vs automatique : anticiper les pires scénarios, pas les plus probables","Simultané si le temps manque, séquentiel si la situation reste maîtrisable","La vraie redondance combine des systèmes aux faiblesses différentes"],
      learnedP:["Faire correspondre la situation à l'équipement","Time is part of the equipment","Manuel vs automatique","Activation simultanée vs séquentielle","La redondance qui protège vraiment"],
      safetyMsg:"Distress equipment does not replace good judgement. It extends it. The best rescue begins with the right decision, made at the right time, using the right tool.",
    },
    en:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Lesson 2/5 · ⭐ Premium",
      title:"Selecting the Right Distress Equipment",
      intro:"This lesson does not re-explain the technical operation of the EPIRB, SART or DSC — all of that is already covered in depth in the Deck module.\n\nHere, the question is: once distress is recognized (L1), which system to activate, in what order, and why this one rather than another?",
      p0:"EVERY EMERGENCY IS DIFFERENT",s0t:"There is no single answer",
      s0:"The reflex to activate everything at once is not always right, and waiting to be sure can cost precious time.\n\nWHEN TO USE THIS SYSTEM? It depends entirely on the nature of the emergency.\nWHY THIS ONE RATHER THAN ANOTHER? Each system has a precise strength and limit.\nWHICH ERROR COSTS THE MOST LIVES? Mismatching the system to the real situation.",
      p1:"THE MARINER'S DISTRESS TOOLBOX",s1t:"Brief reminder — full detail stays at Deck",
      s1:"EPIRB, SART, AIS-SART, DSC, portable VHF: each system has a precise role, already detailed in depth in the Deck module (Signaling & Buoyage). What matters here is not knowing them, but knowing how to choose them.",
      p2:"MATCHING THE EMERGENCY TO THE EQUIPMENT",s2t:"The heart of this lesson",
      s2:"Fire, flooding, man overboard, radio failure, medical emergency don't call for the same activation priority. The right reflex is built situation by situation, not by general memorization.",
      p3:"TIME IS PART OF THE EQUIPMENT",s3t:"The right system activated too late equals no system at all",
      s3:"Choosing the right equipment isn't enough if the timing of activation is wrong. EPIRB too late, DSC too late, SART too early, AIS-SART forgotten: time is an integral part of the equipment decision, not a secondary consideration.",
      p4:"MANUAL VS AUTOMATIC",s4t:"Understanding when to trigger it yourself",
      s4:"Manual activation depends on a conscious, able-to-act crew. Automatic activation depends on none of that. This choice must never be a default reflex — it must anticipate worst-case scenarios, not just the most likely ones.",
      p5:"SIMULTANEOUS OR SEQUENTIAL?",s5t:"Group or stagger depending on available time",
      s5:"Some systems must be activated together when remaining time is already very short and uncertain. Others can be activated in cascade, starting with communication, when the situation remains manageable.",
      p6:"REDUNDANCY SAVES LIVES",s6t:"A professional mariner never relies on a single system",
      s6:"Equipment does not save lives. People do. Equipment only increases the probability.\n\nHaving a plan B concretely means: combining systems that don't share the same weakness — not simply multiplying equipment of the same type.",
      p7:"FREQUENT EQUIPMENT-SELECTION ERRORS",s7t:"The wrong choice, not the wrong equipment",
      s7:"Activating the wrong system first, betting everything on automatic, forgetting the backup portable VHF — these errors recur in most studied cases where the outcome could have changed.",
      p8:"🎯 OPERATIONAL EXERCISE",p9:"⚠️ REAL ACCIDENT CASE",p10:"📝 15-QUESTION BANK",p11:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 2",
      sumP:["Each emergency calls for a different equipment priority","The moment of activation is part of the decision, not just the system choice","Manual vs automatic: anticipate worst-case, not most likely, scenarios","Simultaneous if time is short, sequential if the situation remains manageable","Real redundancy combines systems with different weaknesses"],
      learnedP:["Matching the situation to the equipment","Time is part of the equipment","Manual vs automatic","Simultaneous vs sequential activation","The redundancy that actually protects"],
      safetyMsg:"Distress equipment does not replace good judgement. It extends it. The best rescue begins with the right decision, made at the right time, using the right tool.",
    },
    es:{
      badge:"🆘 Seguridad · EPIRB, SART y GMDSS · Lección 2/5 · ⭐ Premium",
      title:"Selecting the Right Distress Equipment",
      intro:"Esta lección no reexplica el funcionamiento técnico del EPIRB, el SART o el DSC — todo eso ya está cubierto en profundidad en el módulo Deck.\n\nAquí, la pregunta es: una vez reconocida la emergencia (L1), ¿qué sistema activar, en qué orden, y por qué este y no otro?",
      p0:"EVERY EMERGENCY IS DIFFERENT",s0t:"No existe una respuesta única",
      s0:"El reflejo de activarlo todo a la vez no siempre es correcto, y esperar a estar seguro puede costar un tiempo precioso.\n\n¿CUÁNDO USAR ESTE SISTEMA? Depende enteramente de la naturaleza de la emergencia.\n¿POR QUÉ ESTE Y NO OTRO? Cada sistema tiene una fortaleza y un límite precisos.\n¿QUÉ ERROR CUESTA MÁS VIDAS? No hacer coincidir el sistema con la situación real.",
      p1:"LA CAJA DE HERRAMIENTAS DEL MARINO, DE UN VISTAZO",s1t:"Recordatorio breve — el detalle completo queda en Deck",
      s1:"EPIRB, SART, AIS-SART, DSC, VHF portátil: cada sistema tiene un papel preciso, ya detallado en profundidad en el módulo Deck. Lo que importa aquí no es conocerlos, sino saber elegirlos.",
      p2:"HACER COINCIDIR LA SITUACIÓN CON EL EQUIPO",s2t:"El corazón de esta lección",
      s2:"Incendio, vía de agua, hombre al agua, fallo de radio, emergencia médica no requieren la misma prioridad de activación. El reflejo correcto se construye situación por situación, no por memorización general.",
      p3:"TIME IS PART OF THE EQUIPMENT",s3t:"El sistema correcto activado demasiado tarde equivale a ningún sistema",
      s3:"Elegir el equipo correcto no basta si el momento de activación es erróneo. EPIRB demasiado tarde, DSC demasiado tarde, SART demasiado pronto, AIS-SART olvidado: el tiempo forma parte integral de la decisión de equipo, no una consideración secundaria.",
      p4:"MANUAL VS AUTOMÁTICO",s4t:"Comprender cuándo activar uno mismo",
      s4:"La activación manual depende de una tripulación consciente y capaz de actuar. La automática no depende de nada de eso. Esta elección nunca debe ser un reflejo por defecto — debe anticipar los peores escenarios, no solo los más probables.",
      p5:"¿SIMULTÁNEO O SECUENCIAL?",s5t:"Agrupar o escalonar según el tiempo disponible",
      s5:"Algunos sistemas deben activarse juntos cuando el tiempo restante ya es muy corto e incierto. Otros pueden activarse en cascada, empezando por la comunicación, cuando la situación sigue siendo manejable.",
      p6:"LA REDUNDANCIA SALVA VIDAS",s6t:"Un marino profesional nunca confía en un solo sistema",
      s6:"Equipment does not save lives. People do. Equipment only increases the probability.\n\nTener un plan B significa concretamente: combinar sistemas que no compartan la misma debilidad — no simplemente multiplicar equipos del mismo tipo.",
      p7:"ERRORES FRECUENTES DE SELECCIÓN DE EQUIPO",s7t:"La elección equivocada, no el equipo equivocado",
      s7:"Activar el sistema equivocado primero, apostarlo todo al automático, olvidar la VHF portátil de repuesto — estos errores se repiten en la mayoría de los casos estudiados donde el resultado podría haber cambiado.",
      p8:"🎯 EJERCICIO OPERATIVO",p9:"⚠️ CASO REAL",p10:"📝 BANCO DE 15 PREGUNTAS",p11:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 2",
      sumP:["Cada emergencia requiere una prioridad de equipo diferente","El momento de la activación forma parte de la decisión, no solo la elección del sistema","Manual vs automático: anticipar los peores escenarios, no solo los más probables","Simultáneo si falta tiempo, secuencial si la situación sigue siendo manejable","La verdadera redundancia combina sistemas con debilidades distintas"],
      learnedP:["Hacer coincidir la situación con el equipo","Time is part of the equipment","Manual vs automático","Activación simultánea vs secuencial","La redundancia que realmente protege"],
      safetyMsg:"Distress equipment does not replace good judgement. It extends it. The best rescue begins with the right decision, made at the right time, using the right tool.",
    },
    pt:{
      badge:"🆘 Segurança · EPIRB, SART e GMDSS · Lição 2/5 · ⭐ Premium",
      title:"Selecting the Right Distress Equipment",
      intro:"Esta lição não reexplica o funcionamento técnico do EPIRB, do SART ou do DSC — tudo isso já está coberto em profundidade no módulo Deck.\n\nAqui, a pergunta é: uma vez reconhecida a emergência (L1), que sistema ativar, em que ordem, e porquê este e não outro?",
      p0:"EVERY EMERGENCY IS DIFFERENT",s0t:"Não existe uma resposta única",
      s0:"O reflexo de ativar tudo ao mesmo tempo nem sempre é o correto, e esperar para ter a certeza pode custar um tempo precioso.\n\nQUANDO USAR ESTE SISTEMA? Depende inteiramente da natureza da emergência.\nPOR QUE ESTE E NÃO OUTRO? Cada sistema tem uma força e um limite precisos.\nQUE ERRO CUSTA MAIS VIDAS? Não fazer corresponder o sistema à situação real.",
      p1:"A CAIXA DE FERRAMENTAS DO MARÍTIMO, NUM RELANCE",s1t:"Lembrete breve — o detalhe completo fica no Deck",
      s1:"EPIRB, SART, AIS-SART, DSC, VHF portátil: cada sistema tem um papel preciso, já detalhado em profundidade no módulo Deck. O que importa aqui não é conhecê-los, mas saber escolhê-los.",
      p2:"FAZER CORRESPONDER A SITUAÇÃO AO EQUIPAMENTO",s2t:"O coração desta lição",
      s2:"Incêndio, via de água, homem ao mar, falha de rádio, emergência médica não exigem a mesma prioridade de ativação. O reflexo certo constrói-se situação por situação, não por memorização geral.",
      p3:"TIME IS PART OF THE EQUIPMENT",s3t:"O sistema certo ativado tarde demais equivale a nenhum sistema",
      s3:"Escolher o equipamento certo não basta se o momento de ativação estiver errado. EPIRB tarde demais, DSC tarde demais, SART cedo demais, AIS-SART esquecido: o tempo faz parte integral da decisão de equipamento, não uma consideração secundária.",
      p4:"MANUAL VS AUTOMÁTICO",s4t:"Compreender quando acionar por si próprio",
      s4:"A ativação manual depende de uma tripulação consciente e capaz de agir. A automática não depende de nada disso. Esta escolha nunca deve ser um reflexo por defeito — deve antecipar os piores cenários, não apenas os mais prováveis.",
      p5:"SIMULTÂNEO OU SEQUENCIAL?",s5t:"Agrupar ou escalonar conforme o tempo disponível",
      s5:"Alguns sistemas devem ser ativados juntos quando o tempo restante já é muito curto e incerto. Outros podem ser ativados em cascata, começando pela comunicação, quando a situação continua gerível.",
      p6:"A REDUNDÂNCIA SALVA VIDAS",s6t:"Um marítimo profissional nunca confia num único sistema",
      s6:"Equipment does not save lives. People do. Equipment only increases the probability.\n\nTer um plano B significa concretamente: combinar sistemas que não partilham a mesma fraqueza — não simplesmente multiplicar equipamentos do mesmo tipo.",
      p7:"ERROS FREQUENTES DE SELEÇÃO DE EQUIPAMENTO",s7t:"A escolha errada, não o equipamento errado",
      s7:"Ativar o sistema errado primeiro, apostar tudo no automático, esquecer o VHF portátil de reserva — estes erros repetem-se na maioria dos casos estudados onde o resultado poderia ter mudado.",
      p8:"🎯 EXERCÍCIO OPERACIONAL",p9:"⚠️ CASO REAL",p10:"📝 BANCO DE 15 PERGUNTAS",p11:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 2",
      sumP:["Cada emergência exige uma prioridade de equipamento diferente","O momento da ativação faz parte da decisão, não só a escolha do sistema","Manual vs automático: antecipar os piores cenários, não só os mais prováveis","Simultâneo se faltar tempo, sequencial se a situação continuar gerível","A verdadeira redundância combina sistemas com fraquezas diferentes"],
      learnedP:["Fazer corresponder a situação ao equipamento","Time is part of the equipment","Manual vs automático","Ativação simultânea vs sequencial","A redundância que realmente protege"],
      safetyMsg:"Distress equipment does not replace good judgement. It extends it. The best rescue begins with the right decision, made at the right time, using the right tool.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS2_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/5":lang==="en"?"Lesson 2/5":lang==="es"?"Lección 2/5":"Lição 2/5"}</div>
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

            <SL icon="🧭" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🧰" text={lc.p1} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧰</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="🎯" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎯 {lang==="fr"?"MATRICE SITUATION → ÉQUIPEMENT — INTERACTIF":lang==="en"?"SITUATION → EQUIPMENT MATRIX — INTERACTIVE":lang==="es"?"MATRIZ SITUACIÓN → EQUIPO — INTERACTIVO":"MATRIZ SITUAÇÃO → EQUIPAMENTO — INTERATIVO"}</div><SituationMatrixSVG lang={lang}/></Card>

            <SL icon="⏱️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏱️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="⚙️" text={lc.p4} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚙️ {lang==="fr"?"MANUEL VS AUTOMATIQUE — INTERACTIF":lang==="en"?"MANUAL VS AUTOMATIC — INTERACTIVE":lang==="es"?"MANUAL VS AUTOMÁTICO — INTERACTIVO":"MANUAL VS AUTOMÁTICO — INTERATIVO"}</div><ManualAutoSVG lang={lang}/></Card>

            <SL icon="🪜" text={lc.p5} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪜</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🪜 {lang==="fr"?"SIMULTANÉ VS SÉQUENTIEL — INTERACTIF":lang==="en"?"SIMULTANEOUS VS SEQUENTIAL — INTERACTIVE":lang==="es"?"SIMULTÁNEO VS SECUENCIAL — INTERACTIVO":"SIMULTÂNEO VS SEQUENCIAL — INTERATIVO"}</div><TimingSVG lang={lang}/></Card>

            <SL icon="🛡️" text={lc.p6} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌳 {lang==="fr"?"ARBRE DE DÉCISION — INTERACTIF":lang==="en"?"DECISION TREE — INTERACTIVE":lang==="es"?"ÁRBOL DE DECISIÓN — INTERACTIVO":"ÁRVORE DE DECISÃO — INTERATIVO"}</div><DecisionTreeSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s7t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s7}</div></Card>

            <SL icon="🎯" text={lc.p8} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p9} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p10} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p11} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final — Choisir le Bon Équipement":lang==="en"?"Final Quiz — Selecting Equipment":lang==="es"?"Quiz Final — Elegir el Equipo":"Quiz Final — Selecionar o Equipamento"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/5":"questions · Lesson 2/5"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🆘</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 — ERREURS D'ACTIVATION →":lang==="en"?"LESSON 3 — ACTIVATION ERRORS →":lang==="es"?"LECCIÓN 3 — ERRORES DE ACTIVACIÓN →":"LIÇÃO 3 — ERROS DE ATIVAÇÃO →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
