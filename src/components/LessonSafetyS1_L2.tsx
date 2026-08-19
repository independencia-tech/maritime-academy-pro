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
// SVG 1 — BRIDGE ROLES MAP
// ══════════════════════════════════════
function BridgeRolesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const roles = [
    { id:"oow", pos:{x:150,y:50}, color:C.blue2, label:{fr:"OOW",en:"OOW",es:"OOW",pt:"OOW"},
      desc:{fr:"Officier de quart : synthétise l'information, décide de la manœuvre, communique avec le capitaine.",en:"Officer of the Watch: synthesizes information, decides on the maneuver, communicates with the Captain.",es:"Oficial de guardia: sintetiza la información, decide la maniobra, comunica con el Capitán.",pt:"Oficial de quarto: sintetiza a informação, decide a manobra, comunica com o Comandante."} },
    { id:"lookout", pos:{x:60,y:110}, color:C.teal, label:{fr:"Veilleur",en:"Lookout",es:"Vigía",pt:"Vigia"},
      desc:{fr:"Veille visuelle indépendante — ne doit JAMAIS être détourné vers une tâche annexe pendant un risque de collision.",en:"Independent visual lookout — must NEVER be diverted to a side task during a collision risk.",es:"Vigilancia visual independiente — NUNCA debe ser desviado a una tarea secundaria durante un riesgo de colisión.",pt:"Vigilância visual independente — NUNCA deve ser desviado para uma tarefa secundária durante um risco de colisão."} },
    { id:"helm", pos:{x:150,y:150}, color:C.gold2, label:{fr:"Timonier",en:"Helmsman",es:"Timonel",pt:"Timoneiro"},
      desc:{fr:"Exécute et confirme verbalement chaque ordre de barre — ne doit jamais interpréter ou anticiper l'ordre.",en:"Executes and verbally confirms every helm order — must never interpret or anticipate the order.",es:"Ejecuta y confirma verbalmente cada orden de timón — nunca debe interpretar o anticipar la orden.",pt:"Executa e confirma verbalmente cada ordem de leme — nunca deve interpretar ou antecipar a ordem."} },
    { id:"master", pos:{x:240,y:110}, color:C.red, label:{fr:"Capitaine",en:"Master",es:"Capitán",pt:"Comandante"},
      desc:{fr:"Prend la décision finale mais doit rester ouvert aux signalements de l'équipe — l'autorité n'élimine pas le besoin d'écoute.",en:"Makes the final decision but must remain open to the team's reports — authority does not eliminate the need to listen.",es:"Toma la decisión final pero debe permanecer abierto a los avisos del equipo — la autoridad no elimina la necesidad de escuchar.",pt:"Toma a decisão final mas deve permanecer aberto aos avisos da equipa — a autoridade não elimina a necessidade de ouvir."} },
  ];
  const sel_ = sel ? roles.find(r=>r.id===sel) : null;
  return (
    <div>
      <svg width="100%" height="200" viewBox="0 0 300 200">
        <rect x="20" y="20" width="260" height="160" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
        {roles.map(r=>(
          <g key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)} style={{cursor:"pointer"}}>
            <circle cx={r.pos.x} cy={r.pos.y} r={sel===r.id?26:22} fill={sel===r.id?`${r.color}33`:"rgba(255,255,255,0.06)"} stroke={r.color} strokeWidth={sel===r.id?2.5:1.5}/>
            <text x={r.pos.x} y={r.pos.y+4} fontSize="9" fontWeight="700" textAnchor="middle" fill={r.color}>{r.label[lang]||r.label.fr}</text>
          </g>
        ))}
      </svg>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un poste pour voir sa responsabilité":lang==="en"?"Tap a station to see its responsibility":lang==="es"?"Toca un puesto para ver su responsabilidad":"Toque num posto para ver a sua responsabilidade"}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 2 — CHALLENGE & RESPONSE LADDER
// ══════════════════════════════════════
function ChallengeResponseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, color:C.blue2, label:{fr:"Observation",en:"Observation",es:"Observación",pt:"Observação"},
      ex:{fr:"\"Je remarque que le contact au 045 n'a pas changé de relèvement depuis 4 minutes.\"",en:"\"I notice the contact at 045 hasn't changed bearing in 4 minutes.\"",es:"\"Observo que el contacto en 045 no ha cambiado de marcación en 4 minutos.\"",pt:"\"Reparo que o contacto no 045 não mudou de marcação há 4 minutos.\""} },
    { id:2, color:C.teal, label:{fr:"Question",en:"Question",es:"Pregunta",pt:"Pergunta"},
      ex:{fr:"\"Capitaine, avez-vous vu ce contact et son évolution ?\"",en:"\"Captain, have you seen this contact and its trend?\"",es:"\"Capitán, ¿ha visto este contacto y su evolución?\"",pt:"\"Comandante, viu este contacto e a sua evolução?\""} },
    { id:3, color:C.gold2, label:{fr:"Préoccupation explicite",en:"Explicit concern",es:"Preocupación explícita",pt:"Preocupação explícita"},
      ex:{fr:"\"Je suis préoccupé — le CPA calculé est de 0.4 mille dans 8 minutes.\"",en:"\"I am concerned — the calculated CPA is 0.4 miles in 8 minutes.\"",es:"\"Estoy preocupado — el CPA calculado es de 0.4 millas en 8 minutos.\"",pt:"\"Estou preocupado — o CPA calculado é de 0.4 milhas em 8 minutos.\""} },
    { id:4, color:C.red, label:{fr:"J'insiste / j'arrête",en:"I insist / I stop",es:"Insisto / detengo",pt:"Insisto / paro"},
      ex:{fr:"\"Capitaine, je considère la situation dangereuse. Je recommande une action immédiate.\" (si toujours pas de réponse : agir selon la procédure d'urgence du navire)",en:"\"Captain, I consider this situation dangerous. I recommend immediate action.\" (if still no response: act per the vessel's emergency procedure)",es:"\"Capitán, considero esta situación peligrosa. Recomiendo una acción inmediata.\" (si sigue sin respuesta: actuar según el procedimiento de emergencia del buque)",pt:"\"Comandante, considero esta situação perigosa. Recomendo uma ação imediata.\" (se ainda não houver resposta: agir segundo o procedimento de emergência do navio)"} },
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
              marginLeft:(s.id-1)*8}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:`${s.color}22`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:s.color,flexShrink:0}}>{s.id}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.color}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:8,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7,fontStyle:"italic"}}>{sel_.ex[lang]||sel_.ex.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,lineHeight:1.6,fontStyle:"italic"}}>
        {lang==="fr"?"⚡ Ce n'est pas un conflit avec le capitaine. C'est un protocole d'équipe qui protège tout le monde à bord, capitaine compris.":
         lang==="en"?"⚡ This is not a conflict with the Captain. It is a team protocol that protects everyone on board, including the Captain.":
         lang==="es"?"⚡ Esto no es un conflicto con el Capitán. Es un protocolo de equipo que protege a todos a bordo, incluido el Capitán.":
         "⚡ Isto não é um conflito com o Comandante. É um protocolo de equipa que protege todos a bordo, incluindo o Comandante."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// SVG 3 — CLOSED-LOOP ORDER CONFIRMATION
// ══════════════════════════════════════
function ClosedLoopOrderSVG({ lang }) {
  const [open, setOpen] = useState(null);
  const pairs = [
    { id:"p1", order:{fr:"\"Barre à tribord 20°\"",en:"\"Starboard 20\"",es:"\"Timón a estribor 20°\"",pt:"\"Leme a estibordo 20°\""},
      resp:{fr:"\"Barre à tribord 20°\" (timonier répète en exécutant, puis annonce \"20° à tribord, appliqué\")",en:"\"Starboard 20\" (helmsman repeats while executing, then reports \"20 of starboard wheel on\")",es:"\"Timón a estribor 20°\" (el timonel repite mientras ejecuta, luego informa \"20° a estribor, aplicado\")",pt:"\"Leme a estibordo 20°\" (o timoneiro repete enquanto executa, depois reporta \"20° a estibordo, aplicado\")"} },
    { id:"p2", order:{fr:"\"Machine stop\"",en:"\"Engine stop\"",es:"\"Máquina parada\"",pt:"\"Máquina parada\""},
      resp:{fr:"\"Machine stop\" (répété immédiatement) → confirmation quand l'ordre est effectivement transmis et exécuté en salle des machines",en:"\"Engine stop\" (repeated immediately) → confirmation once the order is actually transmitted and executed in the engine room",es:"\"Máquina parada\" (repetido inmediatamente) → confirmación cuando la orden se transmite y ejecuta realmente en la sala de máquinas",pt:"\"Máquina parada\" (repetido imediatamente) → confirmação quando a ordem é efetivamente transmitida e executada na casa das máquinas"} },
  ];
  return (
    <div>
      {pairs.map(p=>(
        <div key={p.id} style={{marginBottom:10}}>
          <div onClick={()=>setOpen(open===p.id?null:p.id)} style={{padding:"10px 12px",borderRadius:12,cursor:"pointer",background:"rgba(26,111,212,0.08)",border:`1.5px solid ${C.blue2}33`,marginBottom:open===p.id?6:0}}>
            <div style={{fontSize:9,color:C.blue2,fontWeight:700,marginBottom:3}}>{lang==="fr"?"📢 ORDRE DONNÉ":lang==="en"?"📢 ORDER GIVEN":lang==="es"?"📢 ORDEN DADA":"📢 ORDEM DADA"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.order[lang]||p.order.fr}</div>
          </div>
          {open===p.id&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1.5px solid ${C.green}44`,animation:"fadeUp 0.3s ease"}}>
            <div style={{fontSize:9,color:C.green,fontWeight:700,marginBottom:3}}>{lang==="fr"?"✅ BOUCLE FERMÉE":lang==="en"?"✅ CLOSED LOOP":lang==="es"?"✅ BUCLE CERRADO":"✅ CICLO FECHADO"}</div>
            <div style={{fontSize:12,color:C.white,lineHeight:1.5}}>{p.resp[lang]||p.resp.fr}</div>
          </div>}
        </div>
      ))}
      {!open&&<div style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:4}}>{lang==="fr"?"Touche un ordre pour voir la confirmation en boucle fermée":lang==="en"?"Tap an order to see the closed-loop confirmation":lang==="es"?"Toca una orden para ver la confirmación en bucle cerrado":"Toque numa ordem para ver a confirmação em ciclo fechado"}</div>}
    </div>
  );
}

// ══════════════════════════════════════
// SVG 4 — CROSS VERIFICATION WHEEL
// ══════════════════════════════════════
function CrossVerificationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stations = [
    { id:"visual", icon:"👁️", color:C.teal, label:{fr:"Veilleur",en:"Lookout",es:"Vigía",pt:"Vigia"},
      desc:{fr:"Confirme visuellement la présence et la trajectoire apparente du contact, indépendamment de l'écran.",en:"Visually confirms the presence and apparent trajectory of the contact, independently of the screen.",es:"Confirma visualmente la presencia y la trayectoria aparente del contacto, independientemente de la pantalla.",pt:"Confirma visualmente a presença e a trajetória aparente do contacto, independentemente do ecrã."} },
    { id:"radar", icon:"📟", color:C.blue2, label:{fr:"OOW / ARPA",en:"OOW / ARPA",es:"OOW / ARPA",pt:"OOW / ARPA"},
      desc:{fr:"Confirme le CPA/TCPA calculé par l'ARPA et surveille son évolution dans le temps.",en:"Confirms the CPA/TCPA calculated by ARPA and monitors its evolution over time.",es:"Confirma el CPA/TCPA calculado por el ARPA y vigila su evolución en el tiempo.",pt:"Confirma o CPA/TCPA calculado pelo ARPA e monitoriza a sua evolução no tempo."} },
    { id:"helm", icon:"⚓", color:C.gold2, label:{fr:"Timonier",en:"Helmsman",es:"Timonel",pt:"Timoneiro"},
      desc:{fr:"Confirme le cap réellement suivi par le navire, indépendamment de ce que l'écran affiche.",en:"Confirms the heading actually being followed by the vessel, independently of what the screen shows.",es:"Confirma el rumbo realmente seguido por el buque, independientemente de lo que muestre la pantalla.",pt:"Confirma o rumo realmente seguido pelo navio, independentemente do que o ecrã mostra."} },
    { id:"master", icon:"🎖️", color:C.red, label:{fr:"Capitaine",en:"Master",es:"Capitán",pt:"Comandante"},
      desc:{fr:"Synthétise les trois sources indépendantes avant de valider ou de modifier la décision de manœuvre.",en:"Synthesizes the three independent sources before validating or changing the maneuvering decision.",es:"Sintetiza las tres fuentes independientes antes de validar o modificar la decisión de maniobra.",pt:"Sintetiza as três fontes independentes antes de validar ou alterar a decisão de manobra."} },
  ];
  const sel_ = sel?stations.find(s=>s.id===sel):null;
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {stations.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)}
            style={{padding:"12px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:10,color:sel===s.id?s.color:C.muted,fontWeight:700}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"Une seule personne peut se tromper. Une équipe bien coordonnée a beaucoup moins de chances de se tromper toute en même temps.":
         lang==="en"?"One person can make a mistake. A well-coordinated team is much less likely to make the same mistake at the same time.":
         lang==="es"?"Una sola persona puede equivocarse. Un equipo bien coordinado tiene muchas menos probabilidades de equivocarse todo a la vez.":
         "Uma só pessoa pode enganar-se. Uma equipa bem coordenada tem muito menos probabilidade de se enganar toda ao mesmo tempo."}
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// EXERCISE — TEAM SCENARIO
// ══════════════════════════════════════
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b",q5:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Risque de collision détecté. L'OOW gère la radio VHF, le veilleur note le journal de bord, le timonier attend un ordre. Qui doit être informé EN PREMIER ?\na) Le mess\nb) Le capitaine\nc) L'armateur"},
      {id:"q2",q:"Le veilleur est en train de remplir le journal de bord au lieu de surveiller visuellement. Que faut-il faire ?\na) Le laisser terminer sa tâche\nb) Rien, ce n'est pas grave\nc) Le redécharger IMMÉDIATEMENT de cette tâche pour qu'il reprenne la veille visuelle"},
      {id:"q3",q:"Quel ordre de manœuvre DOIT être confirmé en boucle fermée dans cette situation ?\na) Tout ordre de barre ou de machine\nb) Seulement les ordres du capitaine\nc) Seulement en cas de mauvais temps"},
      {id:"q4",q:"Qui doit vérifier indépendamment le contact détecté, en plus de l'ARPA ?\na) Personne, l'ARPA suffit\nb) Le veilleur visuellement ET le timonier sur le cap réel\nc) Uniquement le capitaine"},
      {id:"q5",q:"Après analyse de ce scénario, quel principe de Bridge Team Coordination a été le PLUS mal appliqué ?\na) La vitesse du navire\nb) Le respect de COLREG\nc) La répartition de charge de travail — une seule personne (le veilleur) était surchargée par une tâche annexe pendant le risque"},
    ],
    en:[
      {id:"q1",q:"Collision risk detected. The OOW is handling VHF radio, the lookout is writing the logbook, the helmsman is waiting for an order. Who must be informed FIRST?\na) The mess\nb) The Captain\nc) The owner"},
      {id:"q2",q:"The lookout is filling in the logbook instead of keeping visual watch. What must be done?\na) Let them finish the task\nb) Nothing, it's not serious\nc) Immediately relieve them of that task so they resume visual lookout"},
      {id:"q3",q:"Which maneuvering order MUST be confirmed by closed-loop communication in this situation?\na) Any helm or engine order\nb) Only the Captain's orders\nc) Only in bad weather"},
      {id:"q4",q:"Who must independently verify the detected contact, in addition to ARPA?\na) Nobody, ARPA is enough\nb) The lookout visually AND the helmsman on the actual heading\nc) Only the Captain"},
      {id:"q5",q:"After analyzing this scenario, which Bridge Team Coordination principle was MOST poorly applied?\na) Vessel speed\nb) COLREG compliance\nc) Workload distribution — one person (the lookout) was overloaded with a side task during the risk"},
    ],
    es:[
      {id:"q1",q:"Riesgo de colisión detectado. El OOW gestiona la radio VHF, el vigía escribe el cuaderno de bitácora, el timonel espera una orden. ¿Quién debe ser informado PRIMERO?\na) El comedor\nb) El Capitán\nc) El armador"},
      {id:"q2",q:"El vigía está rellenando el cuaderno de bitácora en lugar de vigilar visualmente. ¿Qué hay que hacer?\na) Dejarlo terminar la tarea\nb) Nada, no es grave\nc) Descargarlo INMEDIATAMENTE de esa tarea para que retome la vigilancia visual"},
      {id:"q3",q:"¿Qué orden de maniobra DEBE confirmarse en bucle cerrado en esta situación?\na) Cualquier orden de timón o máquina\nb) Solo las órdenes del Capitán\nc) Solo con mal tiempo"},
      {id:"q4",q:"¿Quién debe verificar independientemente el contacto detectado, además del ARPA?\na) Nadie, el ARPA basta\nb) El vigía visualmente Y el timonel sobre el rumbo real\nc) Solo el Capitán"},
      {id:"q5",q:"Tras analizar este escenario, ¿qué principio de Bridge Team Coordination se aplicó PEOR?\na) La velocidad del buque\nb) El cumplimiento del COLREG\nc) La distribución de carga de trabajo — una sola persona (el vigía) estaba sobrecargada con una tarea secundaria durante el riesgo"},
    ],
    pt:[
      {id:"q1",q:"Risco de colisão detetado. O OOW gere o rádio VHF, o vigia escreve o diário de bordo, o timoneiro espera uma ordem. Quem deve ser informado PRIMEIRO?\na) O refeitório\nb) O Comandante\nc) O armador"},
      {id:"q2",q:"O vigia está a preencher o diário de bordo em vez de vigiar visualmente. O que deve ser feito?\na) Deixá-lo terminar a tarefa\nb) Nada, não é grave\nc) Retirá-lo IMEDIATAMENTE dessa tarefa para retomar a vigilância visual"},
      {id:"q3",q:"Que ordem de manobra DEVE ser confirmada em ciclo fechado nesta situação?\na) Qualquer ordem de leme ou máquina\nb) Só as ordens do Comandante\nc) Só com mau tempo"},
      {id:"q4",q:"Quem deve verificar independentemente o contacto detetado, além do ARPA?\na) Ninguém, o ARPA basta\nb) O vigia visualmente E o timoneiro sobre o rumo real\nc) Só o Comandante"},
      {id:"q5",q:"Depois de analisar este cenário, que princípio de Bridge Team Coordination foi PIOR aplicado?\na) A velocidade do navio\nb) O cumprimento do COLREG\nc) A distribuição de carga de trabalho — uma só pessoa (o vigia) estava sobrecarregada com uma tarefa secundária durante o risco"},
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
        {lang==="fr"?"✅ Q1: b — le capitaine doit toujours être informé en premier d'un risque\n✅ Q2: c — aucune tâche annexe ne doit primer sur la veille pendant un risque\n✅ Q3: a — tout ordre de manœuvre en boucle fermée, sans exception\n✅ Q4: b — la vérification croisée multi-personnes reste la meilleure protection\n✅ Q5: c — la surcharge d'un poste unique a fragilisé toute la coordination":
         lang==="en"?"✅ Q1: b — the Captain must always be informed first of a risk\n✅ Q2: c — no side task should take priority over lookout during a risk\n✅ Q3: a — any maneuvering order by closed loop, no exception\n✅ Q4: b — multi-person cross-verification remains the best protection\n✅ Q5: c — overloading a single station weakened the whole coordination":
         "✅ Q1: b · Q2: c · Q3: a · Q4: b · Q5: c"}
      </div>}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ══════════════════════════════════════
// ACCIDENT CASE — USS JOHN S. McCAIN
// ══════════════════════════════════════
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"USS John S. McCain — Détroit de Singapour (2017)",teaser:"Destroyer militaire · Confusion de contrôle de barre · Surcharge de tâches · 10 marins morts",
      what:"En pleine nuit dans une des zones de trafic les plus denses au monde, l'équipe passerelle du destroyer réorganise la répartition des postes de commande de barre et de machine peu avant un risque de collision. La confusion sur qui contrôle réellement le cap du navire s'installe. Pendant ce temps, plusieurs membres de l'équipe sont surchargés par des tâches simultanées. Le navire dévie de sa route sans que l'équipe ne le réalise à temps et percute un pétrolier. 10 marins meurent.",
      cause:"• Transfert de contrôle de barre entre postes mal compris par l'équipe\n• Surcharge de tâches sur plusieurs membres clés au pire moment\n• Absence de vérification croisée du cap réellement suivi\n• Communication insuffisante sur qui contrôlait quoi\n• Perte de conscience partagée de la situation (Shared Situational Awareness) au sein de l'équipe",
      lessons:"✓ Tout changement de configuration de commande doit être annoncé et confirmé par toute l'équipe\n✓ Ne jamais surcharger un poste clé pendant une phase à risque\n✓ La vérification croisée du cap réel (pas seulement affiché) reste essentielle\n✓ Shared Situational Awareness = chaque membre doit savoir qui contrôle quoi, à tout instant",
      link:"🔗 Complémentaire d'Andrea Doria (L1, biais individuel face à l'électronique) : ici, c'est l'ensemble de l'équipe qui perd la conscience partagée de la situation, pas un seul officier isolé."},
    en:{title:"USS John S. McCain — Strait of Singapore (2017)",teaser:"Military destroyer · Steering control confusion · Task overload · 10 sailors killed",
      what:"In the middle of the night in one of the busiest traffic areas in the world, the destroyer's bridge team reorganizes the helm and engine control stations shortly before a collision risk. Confusion sets in over who actually controls the vessel's heading. Meanwhile, several team members are overloaded with simultaneous tasks. The vessel drifts off course without the team realizing it in time and strikes a tanker. 10 sailors die.",
      cause:"• Transfer of steering control between stations poorly understood by the team\n• Task overload on several key members at the worst moment\n• No cross-verification of the actual heading being followed\n• Insufficient communication on who controlled what\n• Loss of Shared Situational Awareness within the team",
      lessons:"✓ Any change in control configuration must be announced and confirmed by the whole team\n✓ Never overload a key station during a high-risk phase\n✓ Cross-verification of the actual heading (not just displayed) remains essential\n✓ Shared Situational Awareness = every member must know who controls what, at all times",
      link:"🔗 Complementary to Andrea Doria (L1, individual bias toward electronics): here, it is the entire team that loses shared awareness of the situation, not a single isolated officer."},
    es:{title:"USS John S. McCain — Estrecho de Singapur (2017)",teaser:"Destructor militar · Confusión de control de timón · Sobrecarga de tareas · 10 marineros muertos",
      what:"En plena noche en una de las zonas de tráfico más densas del mundo, el equipo de puente del destructor reorganiza los puestos de control de timón y máquina poco antes de un riesgo de colisión. Se instala la confusión sobre quién controla realmente el rumbo del buque. Mientras tanto, varios miembros del equipo están sobrecargados con tareas simultáneas. El buque se desvía de su rumbo sin que el equipo se dé cuenta a tiempo y choca con un petrolero. Mueren 10 marineros.",
      cause:"• Transferencia de control de timón entre puestos mal entendida por el equipo\n• Sobrecarga de tareas en varios miembros clave en el peor momento\n• Sin verificación cruzada del rumbo realmente seguido\n• Comunicación insuficiente sobre quién controlaba qué\n• Pérdida de conciencia situacional compartida dentro del equipo",
      lessons:"✓ Todo cambio de configuración de control debe anunciarse y confirmarse por todo el equipo\n✓ Nunca sobrecargar un puesto clave durante una fase de riesgo\n✓ La verificación cruzada del rumbo real sigue siendo esencial\n✓ Shared Situational Awareness = cada miembro debe saber quién controla qué, en todo momento",
      link:"🔗 Complementario a Andrea Doria (L1, sesgo individual frente a la electrónica): aquí es todo el equipo el que pierde la conciencia compartida de la situación, no un único oficial aislado."},
    pt:{title:"USS John S. McCain — Estreito de Singapura (2017)",teaser:"Destroyer militar · Confusão de controlo do leme · Sobrecarga de tarefas · 10 marinheiros mortos",
      what:"A meio da noite numa das zonas de tráfego mais densas do mundo, a equipa de ponte do destroyer reorganiza os postos de controlo do leme e da máquina pouco antes de um risco de colisão. Instala-se a confusão sobre quem controla realmente o rumo do navio. Entretanto, vários membros da equipa estão sobrecarregados com tarefas simultâneas. O navio desvia-se do rumo sem que a equipa se aperceba a tempo e colide com um petroleiro. Morrem 10 marinheiros.",
      cause:"• Transferência de controlo do leme entre postos mal compreendida pela equipa\n• Sobrecarga de tarefas em vários membros-chave no pior momento\n• Sem verificação cruzada do rumo realmente seguido\n• Comunicação insuficiente sobre quem controlava o quê\n• Perda de consciência situacional partilhada dentro da equipa",
      lessons:"✓ Qualquer mudança de configuração de controlo deve ser anunciada e confirmada por toda a equipa\n✓ Nunca sobrecarregar um posto-chave durante uma fase de risco\n✓ A verificação cruzada do rumo real continua a ser essencial\n✓ Shared Situational Awareness = cada membro deve saber quem controla o quê, a todo o momento",
      link:"🔗 Complementar ao Andrea Doria (L1, viés individual perante a eletrónica): aqui é toda a equipa que perde a consciência partilhada da situação, não um único oficial isolado."},
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
    {q:"Qu'est-ce que la Shared Situational Awareness ?",opts:["Un logiciel de navigation","Le fait que chaque membre de l'équipe possède la même image mentale du danger et de la situation","Un rapport écrit après le quart","Une règle COLREG"],correct:1,expl:"Shared Situational Awareness = tous les membres de l'équipe passerelle partagent la même compréhension de la situation de risque, pas seulement une personne isolée."},
    {q:"Qu'est-ce que l'Authority Gradient ?",opts:["La pente du pont d'un navire","La difficulté qu'un junior peut ressentir à corriger un supérieur expérimenté","Un instrument de mesure de vitesse","Une clause contractuelle"],correct:1,expl:"L'Authority Gradient décrit le phénomène où un officier junior hésite à signaler un danger à un supérieur par respect de la hiérarchie — un facteur d'équipe, distinct de l'assertivité individuelle vue en L1."},
    {q:"Le protocole Challenge & Response a pour but de :",opts:["Créer un conflit hiérarchique","Protéger la sécurité collective de l'équipe, capitaine compris","Remplacer le capitaine dans la décision","Ralentir les manœuvres"],correct:1,expl:"Challenge & Response n'est pas un affrontement — c'est un protocole d'équipe qui protège tout le monde à bord, y compris le capitaine lui-même."},
    {q:"Pourquoi la vérification croisée multi-personnes est-elle essentielle ?",opts:["Elle ralentit les décisions inutilement","Une seule personne peut se tromper, mais une équipe bien coordonnée a beaucoup moins de chances de se tromper toute en même temps","Elle n'est utile qu'en cas de panne radar","Elle remplace le besoin de communication"],correct:1,expl:"Le principe fondamental : une équipe bien coordonnée, avec des vérifications indépendantes, réduit drastiquement la probabilité d'une erreur collective simultanée."},
    {q:"Risque de collision détecté. L'OOW communique par VHF, le veilleur remplit le journal de bord. Que faut-il faire en priorité ?",opts:["Continuer les deux tâches en parallèle","Redécharger immédiatement le veilleur de sa tâche annexe pour restaurer la veille visuelle","Attendre la fin du rapport VHF","Informer l'armateur d'abord"],correct:1,expl:"Aucune tâche administrative ne doit primer sur la veille visuelle pendant un risque de collision actif — la répartition de charge doit être réajustée immédiatement."},
    {q:"Un ordre de barre est donné pendant une manœuvre d'urgence. Quelle est la bonne pratique ?",opts:["Le timonier exécute sans rien dire","Le timonier répète l'ordre en l'exécutant, puis confirme son application","Le timonier attend confirmation du capitaine avant d'agir","Le timonier interprète l'ordre selon son expérience"],correct:1,expl:"La confirmation en boucle fermée (répéter puis confirmer l'exécution) élimine toute ambiguïté, en particulier en situation d'urgence."},
    {q:"Pourquoi le cas USS John S. McCain illustre-t-il un échec d'équipe plutôt qu'un échec individuel ?",opts:["Un seul officier était en poste","La confusion sur le contrôle de barre et la surcharge de tâches ont touché plusieurs membres simultanément, avec perte de conscience partagée","Le navire n'avait pas de radar","Le capitaine était absent"],correct:1,expl:"Le cas McAin illustre une défaillance systémique d'équipe — transfert de contrôle mal compris, surcharge multiple, absence de vérification croisée — pas l'erreur d'un seul individu."},
    {q:"Un jeune officier remarque un danger mais hésite à le signaler au capitaine. Quel concept explique cette hésitation ?",opts:["L'automation bias","L'Authority Gradient","La dette de sommeil","Le CPA"],correct:1,expl:"L'Authority Gradient décrit spécifiquement cette hésitation liée à la hiérarchie, différente de la simple timidité individuelle vue en L1."},
    {q:"Que doit faire un capitaine face à un signalement de préoccupation de son équipe ?",opts:["L'ignorer s'il est confiant dans sa propre analyse","Rester ouvert à l'écoute, même si sa décision finale diffère","Sanctionner l'officier pour manque de confiance","Ne jamais remettre en question sa décision initiale"],correct:1,expl:"L'autorité du capitaine reste entière, mais elle doit s'accompagner d'une écoute réelle des signalements de l'équipe — c'est la base d'une bonne coordination."},
    {q:"Quel est le rôle du veilleur pendant un risque de collision actif ?",opts:["Aider à la paperasse administrative","Assurer une veille visuelle indépendante et continue, sans distraction","Remplacer le timonier si besoin","Contacter directement l'armateur"],correct:1,expl:"Le veilleur doit rester exclusivement concentré sur la veille visuelle indépendante pendant toute phase à risque — c'est une source de vérification distincte du radar."},
    {q:"Vous constatez une confusion sur qui contrôle réellement la barre après un changement de poste. Que faire ?",opts:["Continuer en supposant que quelqu'un contrôle","Annoncer clairement et faire confirmer par toute l'équipe qui a le contrôle actif",  "Attendre que la situation se clarifie d'elle-même","Réduire la vitesse sans rien dire"],correct:1,expl:"Tout changement de configuration de contrôle doit être explicitement annoncé et confirmé par l'ensemble de l'équipe pour éviter toute ambiguïté dangereuse."},
    {q:"Quelle est la différence entre l'assertivité individuelle (L1) et le Challenge & Response (L2) ?",opts:["Il n'y a aucune différence","Challenge & Response est un protocole structuré appliqué par toute l'équipe, pas seulement le courage d'un officier isolé","L1 concerne uniquement les capitaines","Challenge & Response ne s'applique qu'en cas de brouillard"],correct:1,expl:"L1 traite du courage individuel de signaler un danger ; L2 introduit un protocole d'équipe structuré en plusieurs étapes, appliqué collectivement."},
    {q:"Face à une charge de travail élevée en risque de collision, quelle est la priorité de gestion d'équipe ?",opts:["Laisser chacun gérer sa charge individuellement","Identifier et redécharger immédiatement tout poste surchargé, en particulier la veille",  "Réduire le nombre de membres d'équipe","Ajouter de la paperasse pour documenter la situation"],correct:1,expl:"La surcharge d'un poste clé (souvent la veille) doit être identifiée et corrigée immédiatement pour maintenir l'efficacité globale de l'équipe."},
    {q:"Pourquoi dit-on qu'une équipe passerelle 'n'est pas un groupe de personnes qui se trouvent être dans la même pièce' ?",opts:["Parce que la coordination active, la communication et la vérification mutuelle sont ce qui transforme un groupe en équipe fonctionnelle","Parce que chaque officier doit travailler seul","Parce que la taille de la passerelle est trop petite","Parce que le nombre de personnes ne compte pas"],correct:0,expl:"Une équipe passerelle efficace nécessite coordination active, rôles clairs et vérification croisée — la simple présence physique ne suffit pas à créer une coordination fonctionnelle."},
    {q:"Quel est l'objectif principal de L2 dans le Safety Department ?",opts:["Réexpliquer la théorie complète du BRM","Comprendre pourquoi des équipes compétentes échouent en coordination pendant un risque de collision", "Étudier les règles de barre COLREG","Apprendre à réparer un ARPA"],correct:1,expl:"L2 se concentre sur la dynamique d'équipe en situation de risque — Shared Situational Awareness, Authority Gradient, Challenge & Response, vérification croisée — sans réexpliquer le BRM théorique du Deck."},
  ],
  en:[
    {q:"What is Shared Situational Awareness?",opts:["A navigation software","The fact that every team member holds the same mental picture of the danger and the situation","A written report after the watch","A COLREG rule"],correct:1,expl:"Shared Situational Awareness means all bridge team members share the same understanding of the risk situation, not just one isolated person."},
    {q:"What is the Authority Gradient?",opts:["The slope of a ship's deck","The difficulty a junior officer may feel in correcting an experienced senior","A speed measuring instrument","A contractual clause"],correct:1,expl:"The Authority Gradient describes the phenomenon where a junior officer hesitates to report a danger to a senior out of respect for hierarchy — a team factor, distinct from individual assertiveness covered in L1."},
    {q:"The purpose of the Challenge & Response protocol is to:",opts:["Create a hierarchical conflict","Protect the collective safety of the team, including the Captain","Replace the Captain in the decision","Slow down maneuvers"],correct:1,expl:"Challenge & Response is not a confrontation — it is a team protocol that protects everyone on board, including the Captain himself."},
    {q:"Why is multi-person cross-verification essential?",opts:["It slows decisions unnecessarily","One person can make a mistake, but a well-coordinated team is much less likely to make the same mistake at the same time","It is only useful if radar fails","It replaces the need for communication"],correct:1,expl:"The core principle: a well-coordinated team with independent checks drastically reduces the probability of a simultaneous collective error."},
    {q:"Collision risk detected. The OOW is on VHF, the lookout is filling in the logbook. What is the priority?",opts:["Continue both tasks in parallel","Immediately relieve the lookout of the side task to restore visual watch","Wait for the VHF report to finish","Inform the owner first"],correct:1,expl:"No administrative task should take priority over visual lookout during an active collision risk — workload must be readjusted immediately."},
    {q:"A helm order is given during an emergency maneuver. What is correct practice?",opts:["The helmsman executes silently","The helmsman repeats the order while executing it, then confirms its application","The helmsman waits for Captain confirmation before acting","The helmsman interprets the order based on experience"],correct:1,expl:"Closed-loop confirmation (repeat then confirm execution) eliminates ambiguity, especially in an emergency."},
    {q:"Why does the USS John S. McCain case illustrate a team failure rather than an individual one?",opts:["Only one officer was on watch","Confusion over steering control and task overload affected several members simultaneously, with loss of shared awareness","The vessel had no radar","The Captain was absent"],correct:1,expl:"The McCain case illustrates a systemic team failure — poorly understood control transfer, multiple overload, no cross-verification — not a single individual's error."},
    {q:"A junior officer notices a danger but hesitates to report it to the Captain. Which concept explains this hesitation?",opts:["Automation bias","Authority Gradient","Sleep debt","CPA"],correct:1,expl:"The Authority Gradient specifically describes this hierarchy-related hesitation, distinct from simple individual shyness covered in L1."},
    {q:"What should a Captain do when facing a concern raised by the team?",opts:["Ignore it if confident in his own analysis","Remain open to listening, even if his final decision differs","Sanction the officer for lacking confidence","Never question his initial decision"],correct:1,expl:"The Captain's authority remains intact, but it must be paired with real listening to the team's reports — the basis of good coordination."},
    {q:"What is the lookout's role during an active collision risk?",opts:["Help with administrative paperwork","Maintain independent, continuous visual watch, without distraction","Replace the helmsman if needed","Contact the owner directly"],correct:1,expl:"The lookout must remain exclusively focused on independent visual watch during any high-risk phase — a distinct verification source from radar."},
    {q:"You notice confusion over who actually controls the helm after a station change. What do you do?",opts:["Continue assuming someone is in control","Clearly announce and have the whole team confirm who has active control", "Wait for the situation to clarify itself","Reduce speed without saying anything"],correct:1,expl:"Any change in control configuration must be explicitly announced and confirmed by the entire team to avoid dangerous ambiguity."},
    {q:"What is the difference between individual assertiveness (L1) and Challenge & Response (L2)?",opts:["There is no difference","Challenge & Response is a structured protocol applied by the whole team, not just one officer's courage","L1 only concerns Captains","Challenge & Response only applies in fog"],correct:1,expl:"L1 covers the individual courage to report a danger; L2 introduces a structured, multi-step team protocol applied collectively."},
    {q:"Facing high workload during a collision risk, what is the team management priority?",opts:["Let everyone manage their own load individually","Identify and immediately relieve any overloaded station, especially the lookout", "Reduce the number of team members","Add paperwork to document the situation"],correct:1,expl:"Overload on a key station (often the lookout) must be identified and corrected immediately to maintain overall team effectiveness."},
    {q:"Why is a bridge team said to be 'not a group of people who happen to be in the same room'?",opts:["Because active coordination, communication, and mutual verification are what turn a group into a functioning team","Because each officer must work alone","Because the bridge is too small","Because the number of people does not matter"],correct:0,expl:"An effective bridge team requires active coordination, clear roles, and cross-verification — mere physical presence does not create functional coordination."},
    {q:"What is the main goal of L2 in the Safety Department?",opts:["Re-explain the full BRM theory","Understand why competent teams fail at coordination during collision risk", "Study COLREG steering rules","Learn how to repair an ARPA"],correct:1,expl:"L2 focuses on team dynamics under risk — Shared Situational Awareness, Authority Gradient, Challenge & Response, cross-verification — without re-explaining Deck's theoretical BRM."},
  ],
  es:[
    {q:"¿Qué es la Shared Situational Awareness?",opts:["Un software de navegación","El hecho de que cada miembro del equipo tiene la misma imagen mental del peligro y de la situación","Un informe escrito después de la guardia","Una regla COLREG"],correct:1,expl:"Shared Situational Awareness significa que todos los miembros del equipo de puente comparten la misma comprensión de la situación de riesgo, no solo una persona aislada."},
    {q:"¿Qué es el Authority Gradient?",opts:["La pendiente de la cubierta de un buque","La dificultad que un oficial junior puede sentir para corregir a un superior experimentado","Un instrumento de medición de velocidad","Una cláusula contractual"],correct:1,expl:"El Authority Gradient describe el fenómeno en que un oficial junior duda en señalar un peligro a un superior por respeto a la jerarquía."},
    {q:"El propósito del protocolo Challenge & Response es:",opts:["Crear un conflicto jerárquico","Proteger la seguridad colectiva del equipo, incluido el Capitán","Reemplazar al Capitán en la decisión","Ralentizar las maniobras"],correct:1,expl:"Challenge & Response no es un enfrentamiento — es un protocolo de equipo que protege a todos a bordo, incluido el propio Capitán."},
    {q:"¿Por qué es esencial la verificación cruzada de varias personas?",opts:["Ralentiza las decisiones innecesariamente","Una sola persona puede equivocarse, pero un equipo bien coordinado tiene muchas menos probabilidades de equivocarse todo a la vez","Solo es útil si falla el radar","Sustituye la necesidad de comunicación"],correct:1,expl:"El principio fundamental: un equipo bien coordinado con verificaciones independientes reduce drásticamente la probabilidad de un error colectivo simultáneo."},
    {q:"Riesgo de colisión detectado. El OOW está en VHF, el vigía rellena el cuaderno de bitácora. ¿Cuál es la prioridad?",opts:["Continuar ambas tareas en paralelo","Descargar inmediatamente al vigía de la tarea secundaria para restaurar la vigilancia visual","Esperar a que termine el informe VHF","Informar primero al armador"],correct:1,expl:"Ninguna tarea administrativa debe primar sobre la vigilancia visual durante un riesgo de colisión activo."},
    {q:"Se da una orden de timón durante una maniobra de emergencia. ¿Cuál es la práctica correcta?",opts:["El timonel ejecuta en silencio","El timonel repite la orden mientras la ejecuta, luego confirma su aplicación","El timonel espera confirmación del Capitán antes de actuar","El timonel interpreta la orden según su experiencia"],correct:1,expl:"La confirmación en bucle cerrado elimina la ambigüedad, especialmente en una emergencia."},
    {q:"¿Por qué el caso USS John S. McCain ilustra un fallo de equipo más que individual?",opts:["Solo un oficial estaba de guardia","La confusión sobre el control del timón y la sobrecarga de tareas afectó a varios miembros simultáneamente, con pérdida de conciencia compartida","El buque no tenía radar","El Capitán estaba ausente"],correct:1,expl:"El caso McCain ilustra un fallo sistémico de equipo, no el error de un único individuo."},
    {q:"Un oficial junior nota un peligro pero duda en señalarlo al Capitán. ¿Qué concepto explica esta duda?",opts:["El sesgo de automatización","El Authority Gradient","La deuda de sueño","El CPA"],correct:1,expl:"El Authority Gradient describe específicamente esta duda relacionada con la jerarquía, distinta de la simple timidez individual vista en L1."},
    {q:"¿Qué debe hacer un Capitán ante una preocupación planteada por su equipo?",opts:["Ignorarla si confía en su propio análisis","Permanecer abierto a escuchar, aunque su decisión final difiera","Sancionar al oficial por falta de confianza","No cuestionar nunca su decisión inicial"],correct:1,expl:"La autoridad del Capitán permanece intacta, pero debe ir acompañada de una escucha real de los avisos del equipo."},
    {q:"¿Cuál es el papel del vigía durante un riesgo de colisión activo?",opts:["Ayudar con el papeleo administrativo","Mantener una vigilancia visual independiente y continua, sin distracción","Reemplazar al timonel si es necesario","Contactar directamente con el armador"],correct:1,expl:"El vigía debe permanecer exclusivamente centrado en la vigilancia visual independiente durante cualquier fase de riesgo."},
    {q:"Notas confusión sobre quién controla realmente el timón tras un cambio de puesto. ¿Qué haces?",opts:["Continuar suponiendo que alguien tiene el control","Anunciar claramente y hacer que todo el equipo confirme quién tiene el control activo","Esperar a que la situación se aclare sola","Reducir la velocidad sin decir nada"],correct:1,expl:"Todo cambio de configuración de control debe anunciarse explícitamente y ser confirmado por todo el equipo."},
    {q:"¿Cuál es la diferencia entre la asertividad individual (L1) y el Challenge & Response (L2)?",opts:["No hay ninguna diferencia","Challenge & Response es un protocolo estructurado aplicado por todo el equipo, no solo el valor de un oficial aislado","L1 solo concierne a los Capitanes","Challenge & Response solo se aplica con niebla"],correct:1,expl:"L1 trata del valor individual de señalar un peligro; L2 introduce un protocolo de equipo estructurado en varias etapas."},
    {q:"Ante una alta carga de trabajo en riesgo de colisión, ¿cuál es la prioridad de gestión de equipo?",opts:["Dejar que cada uno gestione su carga individualmente","Identificar y descargar inmediatamente cualquier puesto sobrecargado, especialmente la vigilancia","Reducir el número de miembros del equipo","Añadir papeleo para documentar la situación"],correct:1,expl:"La sobrecarga de un puesto clave debe identificarse y corregirse de inmediato para mantener la eficacia global del equipo."},
    {q:"¿Por qué se dice que un equipo de puente 'no es un grupo de personas que resultan estar en la misma sala'?",opts:["Porque la coordinación activa, la comunicación y la verificación mutua son lo que convierte a un grupo en un equipo funcional","Porque cada oficial debe trabajar solo","Porque el puente es demasiado pequeño","Porque el número de personas no importa"],correct:0,expl:"Un equipo de puente eficaz requiere coordinación activa, roles claros y verificación cruzada."},
    {q:"¿Cuál es el objetivo principal de L2 en el Safety Department?",opts:["Reexplicar toda la teoría del BRM","Comprender por qué equipos competentes fallan en la coordinación durante un riesgo de colisión","Estudiar las reglas de gobierno COLREG","Aprender a reparar un ARPA"],correct:1,expl:"L2 se centra en la dinámica de equipo bajo riesgo, sin reexplicar el BRM teórico del Deck."},
  ],
  pt:[
    {q:"O que é a Shared Situational Awareness?",opts:["Um software de navegação","O facto de cada membro da equipa ter a mesma imagem mental do perigo e da situação","Um relatório escrito depois do quarto","Uma regra COLREG"],correct:1,expl:"Shared Situational Awareness significa que todos os membros da equipa de ponte partilham a mesma compreensão da situação de risco."},
    {q:"O que é o Authority Gradient?",opts:["A inclinação do convés de um navio","A dificuldade que um oficial júnior pode sentir em corrigir um superior experiente","Um instrumento de medição de velocidade","Uma cláusula contratual"],correct:1,expl:"O Authority Gradient descreve o fenómeno em que um oficial júnior hesita em reportar um perigo a um superior por respeito à hierarquia."},
    {q:"O objetivo do protocolo Challenge & Response é:",opts:["Criar um conflito hierárquico","Proteger a segurança coletiva da equipa, incluindo o Comandante","Substituir o Comandante na decisão","Atrasar as manobras"],correct:1,expl:"Challenge & Response não é um confronto — é um protocolo de equipa que protege todos a bordo, incluindo o próprio Comandante."},
    {q:"Por que a verificação cruzada de várias pessoas é essencial?",opts:["Atrasa as decisões desnecessariamente","Uma só pessoa pode enganar-se, mas uma equipa bem coordenada tem muito menos probabilidade de se enganar toda ao mesmo tempo","Só é útil se o radar falhar","Substitui a necessidade de comunicação"],correct:1,expl:"O princípio fundamental: uma equipa bem coordenada com verificações independentes reduz drasticamente a probabilidade de um erro coletivo simultâneo."},
    {q:"Risco de colisão detetado. O OOW está no VHF, o vigia preenche o diário de bordo. Qual é a prioridade?",opts:["Continuar ambas as tarefas em paralelo","Retirar imediatamente o vigia da tarefa secundária para restaurar a vigilância visual","Esperar que o relatório VHF termine","Informar primeiro o armador"],correct:1,expl:"Nenhuma tarefa administrativa deve ter prioridade sobre a vigilância visual durante um risco de colisão ativo."},
    {q:"É dada uma ordem de leme durante uma manobra de emergência. Qual é a prática correta?",opts:["O timoneiro executa em silêncio","O timoneiro repete a ordem enquanto a executa, depois confirma a sua aplicação","O timoneiro espera confirmação do Comandante antes de agir","O timoneiro interpreta a ordem segundo a sua experiência"],correct:1,expl:"A confirmação em ciclo fechado elimina a ambiguidade, especialmente numa emergência."},
    {q:"Por que o caso USS John S. McCain ilustra uma falha de equipa em vez de individual?",opts:["Só um oficial estava de quarto","A confusão sobre o controlo do leme e a sobrecarga de tarefas afetou vários membros simultaneamente, com perda de consciência partilhada","O navio não tinha radar","O Comandante estava ausente"],correct:1,expl:"O caso McCain ilustra uma falha sistémica de equipa, não o erro de um único indivíduo."},
    {q:"Um oficial júnior nota um perigo mas hesita em reportá-lo ao Comandante. Que conceito explica esta hesitação?",opts:["O viés de automação","O Authority Gradient","A dívida de sono","O CPA"],correct:1,expl:"O Authority Gradient descreve especificamente esta hesitação relacionada com a hierarquia, distinta da simples timidez individual vista em L1."},
    {q:"O que deve fazer um Comandante perante uma preocupação levantada pela equipa?",opts:["Ignorá-la se confiar na sua própria análise","Permanecer aberto a ouvir, mesmo que a sua decisão final seja diferente","Sancionar o oficial por falta de confiança","Nunca questionar a sua decisão inicial"],correct:1,expl:"A autoridade do Comandante permanece intacta, mas deve ser acompanhada de uma escuta real dos avisos da equipa."},
    {q:"Qual é o papel do vigia durante um risco de colisão ativo?",opts:["Ajudar com papelada administrativa","Manter uma vigilância visual independente e contínua, sem distração","Substituir o timoneiro se necessário","Contactar diretamente o armador"],correct:1,expl:"O vigia deve permanecer exclusivamente focado na vigilância visual independente durante qualquer fase de risco."},
    {q:"Notas confusão sobre quem controla realmente o leme após uma mudança de posto. O que fazes?",opts:["Continuar supondo que alguém tem o controlo","Anunciar claramente e fazer com que toda a equipa confirme quem tem o controlo ativo","Esperar que a situação se esclareça sozinha","Reduzir a velocidade sem dizer nada"],correct:1,expl:"Qualquer mudança de configuração de controlo deve ser anunciada explicitamente e confirmada por toda a equipa."},
    {q:"Qual é a diferença entre a assertividade individual (L1) e o Challenge & Response (L2)?",opts:["Não há diferença nenhuma","Challenge & Response é um protocolo estruturado aplicado por toda a equipa, não apenas a coragem de um oficial isolado","L1 só diz respeito aos Comandantes","Challenge & Response só se aplica com nevoeiro"],correct:1,expl:"L1 trata da coragem individual de reportar um perigo; L2 introduz um protocolo de equipa estruturado em várias etapas."},
    {q:"Perante uma carga de trabalho elevada em risco de colisão, qual é a prioridade de gestão de equipa?",opts:["Deixar cada um gerir a sua carga individualmente","Identificar e aliviar imediatamente qualquer posto sobrecarregado, especialmente a vigilância","Reduzir o número de membros da equipa","Adicionar papelada para documentar a situação"],correct:1,expl:"A sobrecarga de um posto-chave deve ser identificada e corrigida imediatamente para manter a eficácia global da equipa."},
    {q:"Por que se diz que uma equipa de ponte 'não é um grupo de pessoas que calham estar na mesma sala'?",opts:["Porque a coordenação ativa, a comunicação e a verificação mútua são o que transforma um grupo numa equipa funcional","Porque cada oficial deve trabalhar sozinho","Porque a ponte é demasiado pequena","Porque o número de pessoas não importa"],correct:0,expl:"Uma equipa de ponte eficaz requer coordenação ativa, papéis claros e verificação cruzada."},
    {q:"Qual é o objetivo principal de L2 no Safety Department?",opts:["Reexplicar toda a teoria do BRM","Compreender por que equipas competentes falham na coordenação durante um risco de colisão","Estudar as regras de governo COLREG","Aprender a reparar um ARPA"],correct:1,expl:"L2 foca-se na dinâmica de equipa sob risco, sem reexplicar o BRM teórico do Deck."},
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
    {q:"Qu'est-ce que la Shared Situational Awareness ?",opts:["Un logiciel radar","Le fait que toute l'équipe partage la même image mentale du danger","Un rapport administratif","Une règle de barre"],correct:1,expl:"C'est la base de la coordination d'équipe : sans compréhension partagée, même une équipe compétente peut échouer."},
    {q:"Un junior officer hésite à corriger un capitaine expérimenté. Quel concept décrit ce phénomène ?",opts:["L'Authority Gradient","L'automation bias","La dette de sommeil","Le CPA"],correct:0,expl:"L'Authority Gradient est un phénomène d'équipe lié à la hiérarchie, distinct de l'assertivité individuelle."},
    {q:"Le protocole Challenge & Response sert avant tout à :",opts:["Créer un conflit avec le capitaine","Protéger la sécurité collective de toute l'équipe","Ralentir la manœuvre","Remplacer le capitaine"],correct:1,expl:"Ce protocole protège tout le monde à bord, capitaine compris — ce n'est jamais un affrontement."},
    {q:"Pourquoi USS John S. McCain illustre-t-il un échec de coordination d'équipe ?",opts:["Confusion sur le contrôle de barre et surcharge simultanée de plusieurs postes","Panne totale du radar","Absence de capitaine à bord","Mauvaise météo uniquement"],correct:0,expl:"C'est la perte de conscience partagée et la surcharge multiple qui ont causé la collision, pas un facteur isolé."},
    {q:"Quel principe résume la vérification croisée multi-personnes ?",opts:["Une seule personne suffit si elle est expérimentée","Une équipe bien coordonnée a beaucoup moins de chances de se tromper toute en même temps qu'une seule personne","Le radar remplace toute vérification humaine","La vérification croisée ralentit inutilement les décisions"],correct:1,expl:"C'est le principe fondamental de L2 : la coordination multiplie les chances de détecter une erreur avant qu'elle ne devienne un accident."},
  ],
  en:[
    {q:"What is Shared Situational Awareness?",opts:["A radar software","The fact that the whole team shares the same mental picture of the danger","An administrative report","A steering rule"],correct:1,expl:"This is the foundation of team coordination: without shared understanding, even a competent team can fail."},
    {q:"A junior officer hesitates to correct an experienced Captain. Which concept describes this?",opts:["Authority Gradient","Automation bias","Sleep debt","CPA"],correct:0,expl:"The Authority Gradient is a team phenomenon linked to hierarchy, distinct from individual assertiveness."},
    {q:"The Challenge & Response protocol primarily serves to:",opts:["Create a conflict with the Captain","Protect the collective safety of the whole team","Slow down the maneuver","Replace the Captain"],correct:1,expl:"This protocol protects everyone on board, including the Captain — it is never a confrontation."},
    {q:"Why does USS John S. McCain illustrate a team coordination failure?",opts:["Confusion over steering control and simultaneous overload of several stations","Total radar failure","No Captain on board","Bad weather alone"],correct:0,expl:"It was the loss of shared awareness and multiple overload that caused the collision, not a single isolated factor."},
    {q:"Which principle summarizes multi-person cross-verification?",opts:["One experienced person is enough","A well-coordinated team is much less likely to make the same mistake at the same time than a single person","Radar replaces all human verification","Cross-verification unnecessarily slows decisions"],correct:1,expl:"This is the core principle of L2: coordination multiplies the chances of catching an error before it becomes an accident."},
  ],
  es:[
    {q:"¿Qué es la Shared Situational Awareness?",opts:["Un software de radar","El hecho de que todo el equipo comparte la misma imagen mental del peligro","Un informe administrativo","Una regla de gobierno"],correct:1,expl:"Es la base de la coordinación de equipo: sin comprensión compartida, incluso un equipo competente puede fallar."},
    {q:"Un oficial junior duda en corregir a un Capitán experimentado. ¿Qué concepto describe esto?",opts:["Authority Gradient","Sesgo de automatización","Deuda de sueño","CPA"],correct:0,expl:"El Authority Gradient es un fenómeno de equipo ligado a la jerarquía, distinto de la asertividad individual."},
    {q:"El protocolo Challenge & Response sirve sobre todo para:",opts:["Crear un conflicto con el Capitán","Proteger la seguridad colectiva de todo el equipo","Ralentizar la maniobra","Reemplazar al Capitán"],correct:1,expl:"Este protocolo protege a todos a bordo, incluido el Capitán — nunca es un enfrentamiento."},
    {q:"¿Por qué el USS John S. McCain ilustra un fallo de coordinación de equipo?",opts:["Confusión sobre el control del timón y sobrecarga simultánea de varios puestos","Fallo total del radar","Ausencia de Capitán a bordo","Mal tiempo únicamente"],correct:0,expl:"Fue la pérdida de conciencia compartida y la sobrecarga múltiple lo que causó la colisión, no un factor aislado."},
    {q:"¿Qué principio resume la verificación cruzada de varias personas?",opts:["Una sola persona experimentada basta","Un equipo bien coordinado tiene muchas menos probabilidades de equivocarse a la vez que una sola persona","El radar sustituye toda verificación humana","La verificación cruzada ralentiza innecesariamente las decisiones"],correct:1,expl:"Este es el principio fundamental de L2: la coordinación multiplica las posibilidades de detectar un error antes de que se convierta en accidente."},
  ],
  pt:[
    {q:"O que é a Shared Situational Awareness?",opts:["Um software de radar","O facto de toda a equipa partilhar a mesma imagem mental do perigo","Um relatório administrativo","Uma regra de leme"],correct:1,expl:"É a base da coordenação de equipa: sem compreensão partilhada, mesmo uma equipa competente pode falhar."},
    {q:"Um oficial júnior hesita em corrigir um Comandante experiente. Que conceito descreve isto?",opts:["Authority Gradient","Viés de automação","Dívida de sono","CPA"],correct:0,expl:"O Authority Gradient é um fenómeno de equipa ligado à hierarquia, distinto da assertividade individual."},
    {q:"O protocolo Challenge & Response serve sobretudo para:",opts:["Criar um conflito com o Comandante","Proteger a segurança coletiva de toda a equipa","Atrasar a manobra","Substituir o Comandante"],correct:1,expl:"Este protocolo protege todos a bordo, incluindo o Comandante — nunca é um confronto."},
    {q:"Por que o USS John S. McCain ilustra uma falha de coordenação de equipa?",opts:["Confusão sobre o controlo do leme e sobrecarga simultânea de vários postos","Falha total do radar","Ausência de Comandante a bordo","Mau tempo apenas"],correct:0,expl:"Foi a perda de consciência partilhada e a sobrecarga múltipla que causou a colisão, não um fator isolado."},
    {q:"Que princípio resume a verificação cruzada de várias pessoas?",opts:["Uma só pessoa experiente basta","Uma equipa bem coordenada tem muito menos probabilidade de se enganar ao mesmo tempo que uma só pessoa","O radar substitui toda a verificação humana","A verificação cruzada atrasa desnecessariamente as decisões"],correct:1,expl:"Este é o princípio fundamental de L2: a coordenação multiplica as hipóteses de detetar um erro antes que se torne um acidente."},
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
    fr:"Repense à un moment où tu as vu une tâche répartie de façon déséquilibrée sur ta passerelle. Qu'aurait-il fallu faire différemment ?",
    en:"Think about a moment when you saw a task distributed unevenly on your bridge. What should have been done differently?",
    es:"Piensa en un momento en que viste una tarea repartida de forma desequilibrada en tu puente. ¿Qué se debería haber hecho de otra manera?",
    pt:"Pensa num momento em que viste uma tarefa distribuída de forma desequilibrada na tua ponte. O que deveria ter sido feito de forma diferente?",
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
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// ══════════════════════════════════════
// TEXT CONTENT
// ══════════════════════════════════════
const getContent = lang => {
  const d = {
    fr:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Leçon 2/6 · ⭐ Premium",
      title:"Coordination d'Équipe Passerelle Pendant un Risque de Collision",
      intro:"L1 a montré comment le facteur humain individuel — fatigue, automation bias, silence — peut mener à une collision.\n\nMais une équipe entière, composée d'officiers compétents, peut échouer collectivement même quand chacun fait individuellement de son mieux.\n\nCette leçon ne réexplique pas la théorie complète du Bridge Resource Management (déjà couverte chez Deck) — elle se concentre sur ce qui se passe concrètement quand une équipe doit coordonner sa réponse à un risque de collision actif.",
      p0:"POURQUOI UNE ÉQUIPE ÉCHOUE MÊME QUAND CHAQUE INDIVIDU EST COMPÉTENT",s0t:"La compétence individuelle ne suffit pas",
      s0:"La plupart des accidents impliquant une équipe entière ne viennent pas d'un manque de compétence individuelle. Ils viennent d'une coordination qui s'effondre sous la pression : rôles mal répartis, information non partagée, silence au mauvais moment.\n\nCOMMENT PRÉVENIR L'ACCIDENT ? En construisant une compréhension partagée de la situation avant que le risque ne devienne critique.\nQUE FAIRE QUAND LE RISQUE APPARAÎT ? Vérifier que toute l'équipe a la même image de la situation, pas seulement une personne.\nQUELLE LEÇON RETENIR ? Une équipe passerelle n'est pas un groupe de personnes qui se trouvent être dans la même pièce — c'est un système de vérifications qui ne fonctionne que si chacun joue son rôle.",
      p1:"BRIDGE ROLES & RÉPARTITION DE CHARGE",s1t:"Qui surveille quoi pendant un risque montant",
      s1:"Pendant un risque de collision, chaque poste (OOW, veilleur, timonier, capitaine) a une responsabilité précise. Le danger apparaît quand une seule personne cumule plusieurs tâches — surtout le veilleur, dont la veille visuelle ne doit jamais être compromise par une tâche annexe.",
      p2:"SHARED SITUATIONAL AWARENESS",s2t:"La même image mentale du danger, pour toute l'équipe",
      s2:"La coordination n'est efficace que si chaque membre de l'équipe possède la même compréhension de la situation — pas seulement l'OOW ou le capitaine.\n\nSans conscience partagée, chacun peut agir selon SA propre compréhension partielle, créant des décisions contradictoires ou une inaction collective.",
      p3:"AUTHORITY GRADIENT",s3t:"Pourquoi un junior hésite à corriger un supérieur",
      s3:"L'Authority Gradient décrit la difficulté qu'un officier junior peut ressentir à signaler un danger ou à corriger un capitaine expérimenté, par respect de la hiérarchie.\n\nCe phénomène est différent de l'assertivité individuelle vue en L1 : ici, c'est la dynamique d'équipe elle-même qui doit être conçue pour réduire cet obstacle, pas seulement le courage d'un individu.",
      p4:"CHALLENGE & RESPONSE — UN PROTOCOLE D'ÉQUIPE",s4t:"Protéger la sécurité collective, pas créer un conflit",
      s4:"Challenge & Response est un protocole structuré en plusieurs étapes que toute l'équipe applique — ce n'est jamais une remise en question personnelle du capitaine, mais un mécanisme de protection collective qui bénéficie à tout le monde à bord, capitaine compris.",
      p5:"CONFIRMATION EN BOUCLE FERMÉE DES ORDRES DE MANŒUVRE",s5t:"Répéter, exécuter, confirmer",
      s5:"Chaque ordre de barre ou de machine en situation de risque doit être confirmé en boucle fermée : celui qui reçoit l'ordre le répète en l'exécutant, puis confirme son application effective. Cela élimine toute ambiguïté sur ce qui a réellement été fait.",
      p6:"VÉRIFICATION CROISÉE MULTI-PERSONNES",s6t:"Plusieurs sources indépendantes valent mieux qu'une seule",
      s6:"Une seule personne peut se tromper. Une équipe bien coordonnée, où plusieurs postes vérifient indépendamment la même information (veilleur visuel, ARPA, cap réel du timonier), a beaucoup moins de chances de se tromper toute en même temps.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS RÉEL",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 2",
      sumP:["Shared Situational Awareness : toute l'équipe doit partager la même image du danger","Authority Gradient : un junior peut hésiter à corriger un supérieur — c'est un facteur d'équipe","Challenge & Response protège la sécurité collective, ce n'est pas un conflit","Toute confirmation d'ordre doit se faire en boucle fermée","Une équipe bien coordonnée réduit drastiquement le risque d'erreur simultanée"],
      learnedP:["Répartition des rôles et de la charge sur la passerelle","Shared Situational Awareness","Authority Gradient","Challenge & Response comme protocole d'équipe","Confirmation en boucle fermée et vérification croisée"],
      safetyMsg:"A bridge team is strongest when every voice is heard, every concern is shared, and every decision is verified. Teamwork saves lives.",
    },
    en:{
      badge:"🛟 Safety · COLREG Safety — Collision Prevention & Response · Lesson 2/6 · ⭐ Premium",
      title:"Bridge Team Coordination During Collision Risk",
      intro:"L1 showed how individual human factors — fatigue, automation bias, silence — can lead to a collision.\n\nBut an entire team of competent officers can fail collectively even when each individual is doing their personal best.\n\nThis lesson does not re-explain the full theory of Bridge Resource Management (already covered at Deck) — it focuses on what actually happens when a team must coordinate its response to an active collision risk.",
      p0:"WHY A TEAM FAILS EVEN WHEN EVERY INDIVIDUAL IS COMPETENT",s0t:"Individual competence is not enough",
      s0:"Most accidents involving an entire team do not come from a lack of individual competence. They come from coordination collapsing under pressure: poorly distributed roles, unshared information, silence at the wrong moment.\n\nHOW TO PREVENT THE ACCIDENT? By building a shared understanding of the situation before the risk becomes critical.\nWHAT TO DO WHEN THE RISK APPEARS? Verify that the whole team shares the same picture of the situation, not just one person.\nWHAT LESSON TO RETAIN? A bridge team is not a group of people who happen to be in the same room — it is a system of checks that only works if everyone plays their part.",
      p1:"BRIDGE ROLES & WORKLOAD DISTRIBUTION",s1t:"Who watches what during a rising risk",
      s1:"During a collision risk, each station (OOW, lookout, helmsman, Captain) has a precise responsibility. Danger appears when one person accumulates several tasks — especially the lookout, whose visual watch must never be compromised by a side task.",
      p2:"SHARED SITUATIONAL AWARENESS",s2t:"The same mental picture of the danger, for the whole team",
      s2:"Coordination is only effective if every team member holds the same understanding of the situation — not just the OOW or the Captain.\n\nWithout shared awareness, everyone may act on their own partial understanding, creating contradictory decisions or collective inaction.",
      p3:"AUTHORITY GRADIENT",s3t:"Why a junior hesitates to correct a senior",
      s3:"The Authority Gradient describes the difficulty a junior officer may feel in reporting a danger or correcting an experienced Captain, out of respect for hierarchy.\n\nThis phenomenon differs from the individual assertiveness covered in L1: here, it is the team dynamic itself that must be designed to reduce this obstacle, not just one person's courage.",
      p4:"CHALLENGE & RESPONSE — A TEAM PROTOCOL",s4t:"Protecting collective safety, not creating conflict",
      s4:"Challenge & Response is a structured, multi-step protocol applied by the whole team — it is never a personal challenge to the Captain, but a collective protection mechanism that benefits everyone on board, including the Captain.",
      p5:"CLOSED-LOOP CONFIRMATION OF MANEUVERING ORDERS",s5t:"Repeat, execute, confirm",
      s5:"Every helm or engine order during a risk situation must be confirmed by closed loop: the person receiving the order repeats it while executing it, then confirms its actual application. This eliminates any ambiguity about what was really done.",
      p6:"MULTI-PERSON CROSS-VERIFICATION",s6t:"Several independent sources beat a single one",
      s6:"One person can make a mistake. A well-coordinated team, where several stations independently verify the same information (visual lookout, ARPA, helmsman's actual heading), is much less likely to make the same mistake at the same time.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ REAL ACCIDENT CASE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 2",
      sumP:["Shared Situational Awareness: the whole team must share the same picture of the danger","Authority Gradient: a junior may hesitate to correct a senior — this is a team factor","Challenge & Response protects collective safety, it is not a conflict","Every order confirmation must be closed-loop","A well-coordinated team drastically reduces the risk of simultaneous error"],
      learnedP:["Role and workload distribution on the bridge","Shared Situational Awareness","Authority Gradient","Challenge & Response as a team protocol","Closed-loop confirmation and cross-verification"],
      safetyMsg:"A bridge team is strongest when every voice is heard, every concern is shared, and every decision is verified. Teamwork saves lives.",
    },
    es:{
      badge:"🛟 Seguridad · COLREG Safety — Prevención y Respuesta ante Abordajes · Lección 2/6 · ⭐ Premium",
      title:"Coordinación del Equipo de Puente Durante un Riesgo de Colisión",
      intro:"L1 mostró cómo los factores humanos individuales — fatiga, sesgo de automatización, silencio — pueden llevar a una colisión.\n\nPero un equipo entero de oficiales competentes puede fallar colectivamente incluso cuando cada uno hace individualmente lo mejor posible.\n\nEsta lección no reexplica toda la teoría del Bridge Resource Management (ya cubierta en Deck) — se centra en lo que ocurre realmente cuando un equipo debe coordinar su respuesta a un riesgo de colisión activo.",
      p0:"POR QUÉ UN EQUIPO FALLA INCLUSO CUANDO CADA INDIVIDUO ES COMPETENTE",s0t:"La competencia individual no basta",
      s0:"La mayoría de los accidentes que implican a todo un equipo no vienen de una falta de competencia individual. Vienen de una coordinación que se derrumba bajo presión: roles mal repartidos, información no compartida, silencio en el momento equivocado.\n\n¿CÓMO PREVENIR EL ACCIDENTE? Construyendo una comprensión compartida de la situación antes de que el riesgo se vuelva crítico.\n¿QUÉ HACER CUANDO APARECE EL RIESGO? Verificar que todo el equipo comparte la misma imagen de la situación, no solo una persona.\n¿QUÉ LECCIÓN RETENER? Un equipo de puente no es un grupo de personas que resultan estar en la misma sala — es un sistema de verificaciones que solo funciona si cada uno cumple su papel.",
      p1:"ROLES DE PUENTE Y DISTRIBUCIÓN DE CARGA",s1t:"Quién vigila qué durante un riesgo creciente",
      s1:"Durante un riesgo de colisión, cada puesto (OOW, vigía, timonel, Capitán) tiene una responsabilidad precisa. El peligro aparece cuando una sola persona acumula varias tareas — especialmente el vigía, cuya vigilancia visual nunca debe verse comprometida por una tarea secundaria.",
      p2:"SHARED SITUATIONAL AWARENESS",s2t:"La misma imagen mental del peligro, para todo el equipo",
      s2:"La coordinación solo es eficaz si cada miembro del equipo tiene la misma comprensión de la situación — no solo el OOW o el Capitán.\n\nSin conciencia compartida, cada uno puede actuar según SU propia comprensión parcial, creando decisiones contradictorias o inacción colectiva.",
      p3:"AUTHORITY GRADIENT",s3t:"Por qué un junior duda en corregir a un superior",
      s3:"El Authority Gradient describe la dificultad que un oficial junior puede sentir al señalar un peligro o corregir a un Capitán experimentado, por respeto a la jerarquía.\n\nEste fenómeno difiere de la asertividad individual vista en L1: aquí es la propia dinámica de equipo la que debe diseñarse para reducir este obstáculo.",
      p4:"CHALLENGE & RESPONSE — UN PROTOCOLO DE EQUIPO",s4t:"Proteger la seguridad colectiva, no crear conflicto",
      s4:"Challenge & Response es un protocolo estructurado en varias etapas aplicado por todo el equipo — nunca es un cuestionamiento personal del Capitán, sino un mecanismo de protección colectiva que beneficia a todos a bordo, incluido el Capitán.",
      p5:"CONFIRMACIÓN EN BUCLE CERRADO DE LAS ÓRDENES DE MANIOBRA",s5t:"Repetir, ejecutar, confirmar",
      s5:"Toda orden de timón o máquina en situación de riesgo debe confirmarse en bucle cerrado: quien recibe la orden la repite mientras la ejecuta, luego confirma su aplicación efectiva. Esto elimina toda ambigüedad sobre lo que realmente se hizo.",
      p6:"VERIFICACIÓN CRUZADA DE VARIAS PERSONAS",s6t:"Varias fuentes independientes valen más que una sola",
      s6:"Una sola persona puede equivocarse. Un equipo bien coordinado, donde varios puestos verifican independientemente la misma información (vigía visual, ARPA, rumbo real del timonel), tiene muchas menos probabilidades de equivocarse todo a la vez.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 2",
      sumP:["Shared Situational Awareness: todo el equipo debe compartir la misma imagen del peligro","Authority Gradient: un junior puede dudar en corregir a un superior — es un factor de equipo","Challenge & Response protege la seguridad colectiva, no es un conflicto","Toda confirmación de orden debe hacerse en bucle cerrado","Un equipo bien coordinado reduce drásticamente el riesgo de error simultáneo"],
      learnedP:["Distribución de roles y carga en el puente","Shared Situational Awareness","Authority Gradient","Challenge & Response como protocolo de equipo","Confirmación en bucle cerrado y verificación cruzada"],
      safetyMsg:"A bridge team is strongest when every voice is heard, every concern is shared, and every decision is verified. Teamwork saves lives.",
    },
    pt:{
      badge:"🛟 Segurança · COLREG Safety — Prevenção e Resposta a Abalroamentos · Lição 2/6 · ⭐ Premium",
      title:"Coordenação da Equipa de Ponte Durante um Risco de Colisão",
      intro:"L1 mostrou como os fatores humanos individuais — fadiga, viés de automação, silêncio — podem levar a uma colisão.\n\nMas uma equipa inteira de oficiais competentes pode falhar coletivamente mesmo quando cada um faz individualmente o seu melhor.\n\nEsta lição não reexplica toda a teoria do Bridge Resource Management (já coberta no Deck) — foca-se no que acontece realmente quando uma equipa deve coordenar a sua resposta a um risco de colisão ativo.",
      p0:"POR QUE UMA EQUIPA FALHA MESMO QUANDO CADA INDIVÍDUO É COMPETENTE",s0t:"A competência individual não basta",
      s0:"A maioria dos acidentes envolvendo uma equipa inteira não vem de uma falta de competência individual. Vêm de uma coordenação que colapsa sob pressão: papéis mal distribuídos, informação não partilhada, silêncio no momento errado.\n\nCOMO PREVENIR O ACIDENTE? Construindo uma compreensão partilhada da situação antes de o risco se tornar crítico.\nO QUE FAZER QUANDO O RISCO APARECE? Verificar que toda a equipa partilha a mesma imagem da situação, não apenas uma pessoa.\nQUE LIÇÃO RETER? Uma equipa de ponte não é um grupo de pessoas que calham estar na mesma sala — é um sistema de verificações que só funciona se cada um desempenhar o seu papel.",
      p1:"PAPÉIS DE PONTE E DISTRIBUIÇÃO DE CARGA",s1t:"Quem vigia o quê durante um risco crescente",
      s1:"Durante um risco de colisão, cada posto (OOW, vigia, timoneiro, Comandante) tem uma responsabilidade precisa. O perigo surge quando uma só pessoa acumula várias tarefas — especialmente o vigia, cuja vigilância visual nunca deve ser comprometida por uma tarefa secundária.",
      p2:"SHARED SITUATIONAL AWARENESS",s2t:"A mesma imagem mental do perigo, para toda a equipa",
      s2:"A coordenação só é eficaz se cada membro da equipa tiver a mesma compreensão da situação — não apenas o OOW ou o Comandante.\n\nSem consciência partilhada, cada um pode agir segundo a sua própria compreensão parcial, criando decisões contraditórias ou inação coletiva.",
      p3:"AUTHORITY GRADIENT",s3t:"Por que um júnior hesita em corrigir um superior",
      s3:"O Authority Gradient descreve a dificuldade que um oficial júnior pode sentir em reportar um perigo ou corrigir um Comandante experiente, por respeito à hierarquia.\n\nEste fenómeno difere da assertividade individual vista em L1: aqui é a própria dinâmica de equipa que deve ser concebida para reduzir este obstáculo.",
      p4:"CHALLENGE & RESPONSE — UM PROTOCOLO DE EQUIPA",s4t:"Proteger a segurança coletiva, não criar conflito",
      s4:"Challenge & Response é um protocolo estruturado em várias etapas aplicado por toda a equipa — nunca é um questionamento pessoal ao Comandante, mas um mecanismo de proteção coletiva que beneficia todos a bordo, incluindo o Comandante.",
      p5:"CONFIRMAÇÃO EM CICLO FECHADO DAS ORDENS DE MANOBRA",s5t:"Repetir, executar, confirmar",
      s5:"Toda ordem de leme ou máquina em situação de risco deve ser confirmada em ciclo fechado: quem recebe a ordem repete-a enquanto a executa, depois confirma a sua aplicação efetiva. Isto elimina qualquer ambiguidade sobre o que foi realmente feito.",
      p6:"VERIFICAÇÃO CRUZADA DE VÁRIAS PESSOAS",s6t:"Várias fontes independentes valem mais que uma só",
      s6:"Uma só pessoa pode enganar-se. Uma equipa bem coordenada, onde vários postos verificam independentemente a mesma informação (vigia visual, ARPA, rumo real do timoneiro), tem muito menos probabilidade de se enganar toda ao mesmo tempo.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 2",
      sumP:["Shared Situational Awareness: toda a equipa deve partilhar a mesma imagem do perigo","Authority Gradient: um júnior pode hesitar em corrigir um superior — é um fator de equipa","Challenge & Response protege a segurança coletiva, não é um conflito","Toda confirmação de ordem deve ser feita em ciclo fechado","Uma equipa bem coordenada reduz drasticamente o risco de erro simultâneo"],
      learnedP:["Distribuição de papéis e carga na ponte","Shared Situational Awareness","Authority Gradient","Challenge & Response como protocolo de equipa","Confirmação em ciclo fechado e verificação cruzada"],
      safetyMsg:"A bridge team is strongest when every voice is heard, every concern is shared, and every decision is verified. Teamwork saves lives.",
    },
  };
  return d[lang]||d.fr;
};

// ══════════════════════════════════════
// MAIN
// ══════════════════════════════════════
export default function LessonSafetyS1_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
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

            <SL icon="🧑‍✈️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧑‍✈️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧑‍✈️ {lang==="fr"?"CARTE DES RÔLES — INTERACTIF":lang==="en"?"ROLES MAP — INTERACTIVE":lang==="es"?"MAPA DE ROLES — INTERACTIVO":"MAPA DE PAPÉIS — INTERATIVO"}</div><BridgeRolesSVG lang={lang}/></Card>

            <SL icon="🧠" text={lc.p2} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧠</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🪜" text={lc.p3} color={C.gold2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🪜</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="🛡️" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🛡️ {lang==="fr"?"CHALLENGE & RESPONSE — INTERACTIF":lang==="en"?"CHALLENGE & RESPONSE — INTERACTIVE":lang==="es"?"CHALLENGE & RESPONSE — INTERACTIVO":"CHALLENGE & RESPONSE — INTERATIVO"}</div><ChallengeResponseSVG lang={lang}/></Card>

            <SL icon="🔁" text={lc.p5} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔁 {lang==="fr"?"CONFIRMATION D'ORDRE — INTERACTIF":lang==="en"?"ORDER CONFIRMATION — INTERACTIVE":lang==="es"?"CONFIRMACIÓN DE ORDEN — INTERACTIVO":"CONFIRMAÇÃO DE ORDEM — INTERATIVO"}</div><ClosedLoopOrderSVG lang={lang}/></Card>

            <SL icon="🎡" text={lc.p6} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎡 {lang==="fr"?"VÉRIFICATION CROISÉE — INTERACTIF":lang==="en"?"CROSS-VERIFICATION — INTERACTIVE":lang==="es"?"VERIFICACIÓN CRUZADA — INTERACTIVO":"VERIFICAÇÃO CRUZADA — INTERATIVO"}</div><CrossVerificationSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
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
                {lang==="fr"?"Quiz Final — Coordination d'Équipe":lang==="en"?"Final Quiz — Team Coordination":lang==="es"?"Quiz Final — Coordinación de Equipo":"Quiz Final — Coordenação de Equipa"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/6":"questions · Lesson 2/6"}</div>
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
              {lang==="fr"?"LEÇON 3 — ACTIONS D'URGENCE →":lang==="en"?"LESSON 3 — EMERGENCY ACTIONS →":lang==="es"?"LECCIÓN 3 — ACCIONES DE EMERGENCIA →":"LIÇÃO 3 — AÇÕES DE EMERGÊNCIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
