import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 MODULE TERMINÉ!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 MODULE COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡MÓDULO COMPLETADO!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 MÓDULO CONCLUÍDO!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// SVG 1 — CONSTELLATION (green=done well, red=what failed)
function ConstellationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const cases = [
    { id:"faro", lesson:"L1", pillar:"Recognize", color:C.blue2, pos:{x:50,y:80}, name:"El Faro (2015)",
      good:{fr:"Le message de détresse avait été rédigé dès 6h31.",en:"The distress message had been drafted as early as 6:31am.",es:"El mensaje de socorro se redactó ya a las 6:31.",pt:"A mensagem de socorro tinha sido redigida já às 6h31."},
      bad:{fr:"Envoyé 42 minutes trop tard, après avoir minimisé la gravité.",en:"Sent 42 minutes too late, after minimizing the severity.",es:"Enviado 42 minutos demasiado tarde, tras minimizar la gravedad.",pt:"Enviado 42 minutos tarde demais, após minimizar a gravidade."} },
    { id:"nina", lesson:"L2", pillar:"Choose", color:C.orange, pos:{x:150,y:40}, name:"SV Nina (2013)",
      good:{fr:"Cinq systèmes de détresse différents étaient à bord.",en:"Five different distress systems were on board.",es:"Cinco sistemas de socorro diferentes estaban a bordo.",pt:"Cinco sistemas de socorro diferentes estavam a bordo."},
      bad:{fr:"Tous manuels — la même faiblesse répétée cinq fois.",en:"All manual — the same weakness repeated five times.",es:"Todos manuales — la misma debilidad repetida cinco veces.",pt:"Todos manuais — a mesma fraqueza repetida cinco vezes."} },
    { id:"ladymary", lesson:"L3", pillar:"Prepare", color:C.purple, pos:{x:250,y:80}, name:"Lady Mary (2009)",
      good:{fr:"L'EPIRB s'est activée correctement.",en:"The EPIRB activated correctly.",es:"El EPIRB se activó correctamente.",pt:"O EPIRB ativou-se corretamente."},
      bad:{fr:"Mal enregistrée et non liée au GPS — localisation retardée.",en:"Poorly registered and not GPS-linked — location delayed.",es:"Mal registrado y sin enlace GPS — localización retrasada.",pt:"Mal registado e sem ligação GPS — localização atrasada."} },
    { id:"trinity", lesson:"L4", pillar:"Activate", color:C.red, pos:{x:150,y:120}, name:"Trinity II (2011)",
      good:{fr:"Le Mayday a été lancé et l'abandon ordonné à temps.",en:"The Mayday was sent and abandonment ordered in time.",es:"El Mayday se envió y el abandono se ordenó a tiempo.",pt:"O Mayday foi enviado e o abandono ordenado a tempo."},
      bad:{fr:"Radeaux gonflés sur le pont, EPIRB jamais emportée.",en:"Liferafts inflated on deck, EPIRB never brought.",es:"Balsas infladas en cubierta, EPIRB nunca llevado.",pt:"Jangadas infladas no convés, EPIRB nunca levado."} },
  ];
  const sel_ = cases.find(c=>c.id===sel);
  return (
    <div>
      <svg width="100%" height="150" viewBox="0 0 300 150">
        {cases.map((c,i)=>cases.slice(i+1).map((c2)=>(
          <line key={`${c.id}-${c2.id}`} x1={c.pos.x} y1={c.pos.y} x2={c2.pos.x} y2={c2.pos.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        )))}
        {cases.map(c=>(
          <g key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{cursor:"pointer"}}>
            <circle cx={c.pos.x} cy={c.pos.y} r={sel===c.id?13:10} fill={sel===c.id?c.color:`${c.color}88`} stroke={c.color} strokeWidth="1.5"/>
            <text x={c.pos.x} y={c.pos.y+4} fontSize="8" fontWeight="800" textAnchor="middle" fill={C.white}>{c.lesson}</text>
          </g>
        ))}
      </svg>
      {sel_ ? (
        <div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>
          <div style={{fontWeight:700,marginBottom:5,color:sel_.color}}>{sel_.name} — {sel_.pillar}</div>
          <div style={{color:C.green,marginBottom:3}}>🟢 {sel_.good[lang]||sel_.good.fr}</div>
          <div style={{color:C.red}}>🔴 {sel_.bad[lang]||sel_.bad.fr}</div>
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"8px",fontSize:11,color:C.muted}}>{lang==="fr"?"Touche un cas pour voir ce qui a fonctionné et ce qui a échoué":lang==="en"?"Tap a case to see what worked and what failed":lang==="es"?"Toca un caso para ver qué funcionó y qué falló":"Toque num caso para ver o que funcionou e o que falhou"}</div>
      )}
    </div>
  );
}

// SVG 2 — CROSS-CAUSE MATRIX
function CauseMatrixSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const factors = [
    { id:"delay", label:{fr:"Retard de déclaration",en:"Late declaration",es:"Declaración tardía",pt:"Declaração tardia"}, cases:"El Faro" },
    { id:"weak", label:{fr:"Faiblesse partagée entre systèmes",en:"Shared weakness between systems",es:"Debilidad compartida entre sistemas",pt:"Fraqueza partilhada entre sistemas"}, cases:"SV Nina" },
    { id:"reg", label:{fr:"Préparation/enregistrement négligé",en:"Neglected preparation/registration",es:"Preparación/registro descuidado",pt:"Preparação/registo negligenciado"}, cases:"Lady Mary" },
    { id:"panic", label:{fr:"Erreur d'exécution sous panique",en:"Execution error under panic",es:"Error de ejecución bajo pánico",pt:"Erro de execução sob pânico"}, cases:"Trinity II" },
  ];
  const sel_ = factors.find(f=>f.id===sel);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
        {factors.map(f=>(
          <div key={f.id} onClick={()=>setSel(sel===f.id?null:f.id)} style={{padding:"9px 8px",borderRadius:10,cursor:"pointer",textAlign:"center",background:sel===f.id?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.04)",border:`1px solid ${sel===f.id?C.gold:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:10,fontWeight:700,color:sel===f.id?C.gold2:C.muted}}>{f.label[lang]||f.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.white}}><span style={{fontWeight:700,color:C.gold2}}>{lang==="fr"?"Cas concerné : ":"Case: "}</span>{f.cases}</div>}
    </div>
  );
}

// SVG 3 — TIME WINDOW COMPARATOR
function TimeWindowSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const bars = [
    { id:"faro", label:"El Faro", w:70, color:C.blue2, time:{fr:"~1h30 d'hésitation avant l'envoi",en:"~1.5h of hesitation before sending",es:"~1,5h de duda antes de enviar",pt:"~1h30 de hesitação antes do envio"} },
    { id:"nina", label:"SV Nina", w:10, color:C.orange, time:{fr:"Aucune activation — naufrage trop rapide",en:"No activation — sinking too fast",es:"Ninguna activación — hundimiento demasiado rápido",pt:"Nenhuma ativação — afundamento rápido demais"} },
    { id:"ladymary", label:"Lady Mary", w:50, color:C.purple, time:{fr:"Activée, mais localisation retardée par l'enregistrement",en:"Activated, but location delayed by registration",es:"Activado, pero localización retrasada por el registro",pt:"Ativado, mas localização atrasada pelo registo"} },
    { id:"trinity", label:"Trinity II", w:30, color:C.red, time:{fr:"3 jours de dérive avant le sauvetage partiel",en:"3 days adrift before partial rescue",es:"3 días a la deriva antes del rescate parcial",pt:"3 dias à deriva antes do resgate parcial"} },
  ];
  const sel_ = bars.find(b=>b.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {bars.map(b=>(
          <div key={b.id} onClick={()=>setSel(sel===b.id?null:b.id)} style={{cursor:"pointer"}}>
            <div style={{fontSize:9,color:C.muted,marginBottom:2}}>{b.label}</div>
            <div style={{height:14,borderRadius:7,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${b.w}%`,background:sel===b.id?b.color:`${b.color}88`,borderRadius:7}}/></div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{marginTop:10,padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.time[lang]||sel_.time.fr}</div>}
    </div>
  );
}

// SVG 4 — SELF-ASSESSMENT WHEEL (5 pillars)
function PillarWheelSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const pillars = [
    { id:"recognize", icon:"🚨", color:C.blue2, label:"Recognize", q:{fr:"Est-ce que je sais reconnaître une détresse réelle sans hésiter ?",en:"Do I know how to recognize real distress without hesitating?",es:"¿Sé reconocer una emergencia real sin dudar?",pt:"Sei reconhecer uma emergência real sem hesitar?"} },
    { id:"choose", icon:"🎯", color:C.orange, label:"Choose", q:{fr:"Est-ce que je sais quel système activer selon la situation ?",en:"Do I know which system to activate depending on the situation?",es:"¿Sé qué sistema activar según la situación?",pt:"Sei que sistema ativar consoante a situação?"} },
    { id:"prepare", icon:"📋", color:C.teal, label:"Prepare", q:{fr:"Mon équipement de détresse est-il vraiment prêt aujourd'hui ?",en:"Is my distress equipment truly ready today?",es:"¿Está mi equipo de socorro realmente listo hoy?",pt:"O meu equipamento de socorro está mesmo pronto hoje?"} },
    { id:"activate", icon:"⚡", color:C.red, label:"Activate", q:{fr:"Mes mains sauraient-elles quoi faire sans réfléchir ?",en:"Would my hands know what to do without thinking?",es:"¿Sabrían mis manos qué hacer sin pensar?",pt:"As minhas mãos saberiam o que fazer sem pensar?"} },
    { id:"learn", icon:"📚", color:C.gold2, label:"Learn", q:{fr:"Est-ce que je tire vraiment des leçons des accidents des autres ?",en:"Do I truly learn lessons from others' accidents?",es:"¿De verdad aprendo lecciones de los accidentes de otros?",pt:"Aprendo mesmo lições com os acidentes dos outros?"} },
  ];
  const sel_ = pillars.find(p=>p.id===sel);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {pillars.map(p=>(
          <div key={p.id} onClick={()=>setSel(sel===p.id?null:p.id)} style={{padding:"8px 2px",borderRadius:10,cursor:"pointer",textAlign:"center",background:sel===p.id?`${p.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===p.id?p.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{p.icon}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:12,color:C.white,lineHeight:1.7,fontStyle:"italic"}}><span style={{fontWeight:700,color:sel_.color,fontStyle:"normal"}}>{sel_.label}: </span>{sel_.q[lang]||sel_.q.fr}</div>}
      {!sel_&&<div style={{textAlign:"center",fontSize:10,color:C.muted}}>{lang==="fr"?"Touche un pilier pour une question d'auto-évaluation":lang==="en"?"Tap a pillar for a self-assessment question":lang==="es"?"Toca un pilar para una pregunta de autoevaluación":"Toque num pilar para uma pergunta de autoavaliação"}</div>}
    </div>
  );
}

// CASE RETROSPECTIVE (no new case)
function CaseRetrospective({ lang }) {
  const [open, setOpen] = useState(null);
  const cases = [
    { id:"faro", lesson:"L1", name:"El Faro (2015)", color:C.blue2, lesson_text:{fr:"Reconnaître la détresse tôt coûte moins cher que d'hésiter.",en:"Recognizing distress early costs less than hesitating.",es:"Reconocer la emergencia pronto cuesta menos que dudar.",pt:"Reconhecer a emergência cedo custa menos do que hesitar."} },
    { id:"nina", lesson:"L2", name:"SV Nina (2013)", color:C.orange, lesson_text:{fr:"La vraie redondance combine des faiblesses différentes.",en:"Real redundancy combines different weaknesses.",es:"La verdadera redundancia combina debilidades diferentes.",pt:"A verdadeira redundância combina fraquezas diferentes."} },
    { id:"ladymary", lesson:"L3", name:"Lady Mary (2009)", color:C.purple, lesson_text:{fr:"La préparation se fait avant l'urgence, jamais pendant.",en:"Preparation happens before the emergency, never during.",es:"La preparación se hace antes de la emergencia, nunca durante.",pt:"A preparação faz-se antes da emergência, nunca durante."} },
    { id:"trinity", lesson:"L4", name:"Trinity II (2011)", color:C.red, lesson_text:{fr:"S'entraîner comme on devra agir, pas autrement.",en:"Train the way you expect to perform.",es:"Entrenar como se deberá actuar, no de otra forma.",pt:"Treinar como se deverá atuar, e não de outra forma."} },
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {cases.map(c=>(
        <div key={c.id} style={{background:`${c.color}0d`,border:`1.5px solid ${c.color}33`,borderRadius:14,overflow:"hidden"}}>
          <div onClick={()=>setOpen(open===c.id?null:c.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:8,background:`${c.color}22`,border:`1px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:c.color,flexShrink:0}}>{c.lesson}</div>
            <div style={{flex:1,fontSize:12,fontWeight:700,color:c.color}}>{c.name}</div>
            <span style={{fontSize:12,color:C.muted}}>{open===c.id?"▲":"▼"}</span>
          </div>
          {open===c.id&&<div style={{padding:"0 14px 12px",fontSize:12,color:C.white,lineHeight:1.6,fontStyle:"italic"}}>{c.lesson_text[lang]||c.lesson_text.fr}</div>}
        </div>
      ))}
    </div>
  );
}

// EXERCISE — PATTERN RECOGNITION + WHICH PILLAR WOULD HAVE BROKEN THE CHAIN
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [selfEval, setSelfEval] = useState("");
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"a",q3:"b",q4:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Un équipage possède cinq moyens de communication de secours, tous nécessitant une action manuelle. À quel cas cela ressemble-t-il le plus ?\na) El Faro\nb) Trinity II\nc) SV Nina"},
      {id:"q2",q:"Quel pilier aurait interrompu la chaîne de l'accident dans ce cas ?\na) Choose — combiner des systèmes aux faiblesses différentes\nb) Learn — étudier davantage de cas après coup\nc) Activate — s'entraîner à activer plus vite"},
      {id:"q3",q:"Quelle action aurait le plus changé l'issue ?\na) Ajouter un sixième système manuel identique\nb) Ajouter au moins un système à déclenchement automatique indépendant de l'équipage\nc) Réduire le nombre de systèmes à bord"},
      {id:"q4",q:"Quel schéma commun aux 4 cas du module cette situation illustre-t-elle le mieux ?\na) Une faiblesse répétée plutôt qu'une vraie redondance\nb) Un manque de courage de l'équipage\nc) Un défaut de fabrication"},
    ],
    en:[
      {id:"q1",q:"A crew has five backup communication means, all requiring manual action. Which case does this most resemble?\na) El Faro\nb) Trinity II\nc) SV Nina"},
      {id:"q2",q:"Which pillar would have broken the chain of the accident here?\na) Choose — combine systems with different weaknesses\nb) Learn — study more cases afterward\nc) Activate — train to activate faster"},
      {id:"q3",q:"Which action would have most changed the outcome?\na) Add a sixth identical manual system\nb) Add at least one automatic-triggering system independent of the crew\nc) Reduce the number of systems on board"},
      {id:"q4",q:"Which pattern common to the module's 4 cases does this situation best illustrate?\na) A repeated weakness rather than real redundancy\nb) A lack of courage from the crew\nc) A manufacturing defect"},
    ],
    es:[
      {id:"q1",q:"Una tripulación tiene cinco medios de comunicación de reserva, todos manuales. ¿A qué caso se parece más?\na) El Faro\nb) Trinity II\nc) SV Nina"},
      {id:"q2",q:"¿Qué pilar habría interrumpido la cadena del accidente aquí?\na) Choose — combinar sistemas con debilidades diferentes\nb) Learn — estudiar más casos después\nc) Activate — entrenarse para activar más rápido"},
      {id:"q3",q:"¿Qué acción habría cambiado más el resultado?\na) Añadir un sexto sistema manual idéntico\nb) Añadir al menos un sistema de activación automática independiente de la tripulación\nc) Reducir el número de sistemas a bordo"},
      {id:"q4",q:"¿Qué patrón común a los 4 casos del módulo ilustra mejor esta situación?\na) Una debilidad repetida en lugar de una redundancia real\nb) Una falta de valor de la tripulación\nc) Un defecto de fabricación"},
    ],
    pt:[
      {id:"q1",q:"Uma tripulação tem cinco meios de comunicação de reserva, todos manuais. A que caso isto mais se assemelha?\na) El Faro\nb) Trinity II\nc) SV Nina"},
      {id:"q2",q:"Que pilar teria interrompido a cadeia do acidente aqui?\na) Choose — combinar sistemas com fraquezas diferentes\nb) Learn — estudar mais casos depois\nc) Activate — treinar para ativar mais rápido"},
      {id:"q3",q:"Que ação teria mudado mais o resultado?\na) Adicionar um sexto sistema manual idêntico\nb) Adicionar pelo menos um sistema de ativação automática independente da tripulação\nc) Reduzir o número de sistemas a bordo"},
      {id:"q4",q:"Que padrão comum aos 4 casos do módulo esta situação melhor ilustra?\na) Uma fraqueza repetida em vez de uma redundância real\nb) Uma falta de coragem da tripulação\nc) Um defeito de fabrico"},
    ],
  };
  const list = qs[lang]||qs.fr;
  const chk = (id,val) => val.trim().toLowerCase()===correct[id];
  const selfQ = {
    fr:"Si tu devais sauver un équipage demain, en quel pilier des cinq aurais-tu le moins confiance aujourd'hui ? Que vas-tu faire pour l'améliorer ?",
    en:"If you had to save a crew tomorrow, which of the five pillars would you trust the least in yourself today? What will you do to improve it?",
    es:"Si tuvieras que salvar a una tripulación mañana, ¿en cuál de los cinco pilares confiarías menos hoy? ¿Qué harás para mejorarlo?",
    pt:"Se tivesses de salvar uma tripulação amanhã, em qual dos cinco pilares confiarias menos hoje? O que vais fazer para o melhorar?",
  };
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
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif",marginBottom:16}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
      <div style={{padding:"14px",borderRadius:14,background:"rgba(142,68,173,0.08)",border:`1px solid ${C.purple}33`}}>
        <div style={{fontSize:11,color:C.purple,fontWeight:700,marginBottom:8,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"🪞 AUTO-ÉVALUATION":lang==="en"?"🪞 SELF-ASSESSMENT":lang==="es"?"🪞 AUTOEVALUACIÓN":"🪞 AUTOAVALIAÇÃO"}</div>
        <div style={{fontSize:12,color:C.white,marginBottom:8,lineHeight:1.6}}>{selfQ[lang]||selfQ.fr}</div>
        <textarea value={selfEval} onChange={e=>setSelfEval(e.target.value)} rows={3}
          placeholder={lang==="fr"?"Écris librement ta réponse...":lang==="en"?"Write your answer freely...":lang==="es"?"Escribe tu respuesta libremente...":"Escreve a tua resposta livremente..."}
          style={{width:"100%",padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:`1px solid ${C.border}`,color:C.white,fontSize:13,fontFamily:"'Nunito',sans-serif",boxSizing:"border-box",resize:"vertical"}}/>
        <div style={{fontSize:10,color:C.muted,marginTop:6}}>{lang==="fr"?"Pas de bonne réponse — c'est un engagement personnel.":lang==="en"?"No right answer — this is a personal commitment.":lang==="es"?"No hay respuesta correcta — es un compromiso personal.":"Não há resposta certa — é um compromisso pessoal."}</div>
      </div>
    </div>
  );
}

// BANK — 15 QUESTIONS (transversal synthesis)
const BANK = {
  fr:[
    {q:"Quel pilier du MAP Safety Mindset correspond à El Faro (L1) ?",opts:["Choose","Recognize","Prepare","Activate"],correct:1,expl:"El Faro illustre la reconnaissance tardive d'une détresse déjà réelle — le pilier Recognize."},
    {q:"Quel pilier correspond principalement à SV Nina (L2) ?",opts:["Choose","Learn","Activate","Prepare"],correct:0,expl:"Nina illustre le mauvais choix : cinq systèmes différents mais tous partageant la même faiblesse manuelle."},
    {q:"Quel pilier correspond à Lady Mary (L3) ?",opts:["Recognize","Activate","Prepare","Learn"],correct:2,expl:"Lady Mary illustre une préparation négligée : enregistrement absent, pas de liaison GPS."},
    {q:"Quel pilier correspond à Trinity II (L4) ?",opts:["Recognize","Choose","Prepare","Activate"],correct:3,expl:"Trinity II illustre un échec d'exécution sous panique malgré un équipement adéquat et préparé."},
    {q:"Qu'ont en commun les 4 cas du module malgré des causes très différentes ?",opts:["Un défaut de fabrication identique","Chacun isole un maillon différent de la même chaîne de survie","La même compagnie maritime","La même zone géographique"],correct:1,expl:"Chaque cas isole un maillon distinct — reconnaître, choisir, préparer, activer — de la même chaîne de survie."},
    {q:"Que signifie 'The MAP Safety Mindset' ?",opts:["Un nouveau concept technique","Recognize → Choose → Prepare → Activate → Learn → Repeat, un état d'esprit réutilisable toute la carrière","Une certification supplémentaire","Une procédure d'urgence de plus"],correct:1,expl:"Ce n'est pas un nouveau contenu — c'est la synthèse des 5 leçons transformée en méthode réutilisable dans toute situation."},
    {q:"Pourquoi le 'Repeat' est-il essentiel dans le MAP Safety Mindset ?",opts:["Parce que la sécurité est acquise une fois pour toutes après ce module","Parce que la sécurité se renouvelle à chaque exercice, chaque quart, chaque embarquement","Parce qu'il faut répéter la théorie GMDSS","Le Repeat n'a pas d'importance particulière"],correct:1,expl:"La sécurité n'est jamais terminée — elle se pratique et se renouvelle en continu, pas seulement lors d'un module suivi une fois."},
    {q:"Un équipage possède plusieurs moyens de communication, tous nécessitant une action manuelle. Quel pilier aurait interrompu une chaîne similaire à celle de Nina ?",opts:["Recognize","Choose — combiner des systèmes aux faiblesses différentes","Learn uniquement après coup","Aucun pilier n'aurait aidé"],correct:1,expl:"Combiner des systèmes complémentaires (Choose) aurait rompu la répétition de la même vulnérabilité."},
    {q:"Pourquoi étudier des accidents déjà analysés en détail dans les leçons précédentes, sans en ajouter de nouveaux ?",opts:["Par manque de nouveaux cas disponibles","Pour consolider les acquis en un tout cohérent plutôt que disperser l'attention sur un nouveau drame","Parce que les nouveaux cas ne sont pas assez documentés","Le format ne le permettait pas"],correct:1,expl:"L5 est une leçon de synthèse — l'objectif est de relier ce qui a déjà été appris, pas d'introduire un nouveau contenu."},
    {q:"Quelle phrase résume la philosophie de clôture du module s2 ?",opts:["'La sécurité est un certificat qu'on obtient une fois'","'Every accident becomes training for the next generation'","'L'équipement suffit à sauver des vies'","'Il n'y a rien à apprendre des accidents passés'"],correct:1,expl:"Cette phrase résume pourquoi on étudie les accidents maritimes : chaque tragédie devient un enseignement pour ceux qui suivent."},
    {q:"Quel est l'objectif de l'auto-évaluation sur les 5 piliers en fin de module ?",opts:["Comparer les marins entre eux","Permettre à chacun d'identifier honnêtement son pilier le plus faible et de s'engager à l'améliorer","Remplacer une certification officielle","Servir uniquement de formalité administrative"],correct:1,expl:"L'auto-évaluation est un outil personnel de progression, se terminant par un engagement concret, pas une comparaison entre marins."},
    {q:"Pourquoi la constellation des 4 cas montre-t-elle aussi ce qui a été bien fait (🟢), pas seulement ce qui a échoué (🔴) ?",opts:["Pour minimiser la gravité des accidents","Pour montrer que même un accident dramatique contient de bonnes décisions, pas seulement des erreurs","Parce que le rouge n'est pas assez visible","Cela n'a aucune utilité pédagogique"],correct:1,expl:"Montrer les bonnes décisions aussi permet de nuancer l'analyse et d'éviter de réduire chaque accident à une simple suite d'erreurs."},
    {q:"Quelle est la différence essentielle entre s2-L5 et une leçon de contenu classique comme s2-L1 à L4 ?",opts:["Il n'y a aucune différence","L5 ne développe aucun contenu nouveau — elle relie et synthétise ce qui a déjà été enseigné","L5 introduit la théorie GMDSS complète","L5 est réservée aux capitaines uniquement"],correct:1,expl:"L5 se distingue par son rôle de synthèse pure, sans nouvel apport théorique ni nouveau cas réel."},
    {q:"Quel est l'objectif principal de la leçon L5 dans le Safety Department ?",opts:["Étudier un nouveau cas réel de détresse","Transformer les 5 leçons précédentes en une méthode réutilisable (le MAP Safety Mindset) et clôturer le module","Réexpliquer la théorie GMDSS","Comparer les équipements EPIRB entre fabricants"],correct:1,expl:"L5 conclut le module en transformant l'apprentissage en un état d'esprit applicable à toute situation future."},
    {q:"Pourquoi cette leçon ne développe-t-elle toujours pas les procédures d'abandon du navire ?",opts:["Parce que ce sujet appartient exclusivement au futur module s5","Parce que ce n'est jamais utile","Parce que ça a déjà été vu ailleurs dans ce module","Parce que le format ne le permet pas"],correct:0,expl:"Conformément à la règle d'architecture MAP, l'abandon du navire reste le domaine exclusif du futur module s5, même à la clôture de s2."},
  ],
  en:[
    {q:"Which MAP Safety Mindset pillar corresponds to El Faro (L1)?",opts:["Choose","Recognize","Prepare","Activate"],correct:1,expl:"El Faro illustrates the late recognition of an already-real distress — the Recognize pillar."},
    {q:"Which pillar mainly corresponds to SV Nina (L2)?",opts:["Choose","Learn","Activate","Prepare"],correct:0,expl:"Nina illustrates a poor choice: five different systems all sharing the same manual weakness."},
    {q:"Which pillar corresponds to Lady Mary (L3)?",opts:["Recognize","Activate","Prepare","Learn"],correct:2,expl:"Lady Mary illustrates neglected preparation: missing registration, no GPS link."},
    {q:"Which pillar corresponds to Trinity II (L4)?",opts:["Recognize","Choose","Prepare","Activate"],correct:3,expl:"Trinity II illustrates an execution failure under panic despite adequate, prepared equipment."},
    {q:"What do the module's 4 cases have in common despite very different causes?",opts:["An identical manufacturing defect","Each isolates a different link of the same survival chain","The same shipping company","The same geographic area"],correct:1,expl:"Each case isolates a distinct link — recognizing, choosing, preparing, activating — of the same survival chain."},
    {q:"What does 'The MAP Safety Mindset' mean?",opts:["A new technical concept","Recognize → Choose → Prepare → Activate → Learn → Repeat, a mindset reusable throughout a career","An additional certification","One more emergency procedure"],correct:1,expl:"This isn't new content — it's the synthesis of the 5 lessons turned into a reusable method for any situation."},
    {q:"Why is 'Repeat' essential in the MAP Safety Mindset?",opts:["Because safety is acquired once and for all after this module","Because safety renews with every drill, every watch, every embarkation","Because you must repeat GMDSS theory","Repeat has no particular importance"],correct:1,expl:"Safety is never finished — it is practiced and renewed continuously, not just during a module taken once."},
    {q:"A crew has several communication means, all requiring manual action. Which pillar would have broken a chain similar to Nina's?",opts:["Recognize","Choose — combine systems with different weaknesses","Learn only after the fact","No pillar would have helped"],correct:1,expl:"Combining complementary systems (Choose) would have broken the repetition of the same vulnerability."},
    {q:"Why study accidents already analyzed in detail in previous lessons, without adding new ones?",opts:["Due to a lack of new cases available","To consolidate learning into a coherent whole rather than scatter attention on a new tragedy","Because new cases aren't documented enough","The format didn't allow it"],correct:1,expl:"L5 is a synthesis lesson — the goal is to connect what was already learned, not introduce new content."},
    {q:"Which phrase summarizes the closing philosophy of module s2?",opts:["'Safety is a certificate earned once'","'Every accident becomes training for the next generation'","'Equipment alone saves lives'","'There is nothing to learn from past accidents'"],correct:1,expl:"This phrase summarizes why we study maritime accidents: every tragedy becomes a lesson for those who follow."},
    {q:"What is the purpose of the self-assessment on the 5 pillars at the end of the module?",opts:["Compare sailors against each other","Allow each person to honestly identify their weakest pillar and commit to improving it","Replace an official certification","Serve only as an administrative formality"],correct:1,expl:"Self-assessment is a personal progress tool ending in a concrete commitment, not a comparison between sailors."},
    {q:"Why does the constellation of the 4 cases also show what went well (🟢), not only what failed (🔴)?",opts:["To minimize the severity of the accidents","To show that even a dramatic accident contains good decisions, not only errors","Because red isn't visible enough","It has no pedagogical use"],correct:1,expl:"Showing the good decisions too allows for a more nuanced analysis, avoiding reducing each accident to a mere string of errors."},
    {q:"What is the essential difference between s2-L5 and a classic content lesson like s2-L1 through L4?",opts:["There is no difference","L5 develops no new content — it connects and synthesizes what was already taught","L5 introduces full GMDSS theory","L5 is reserved for Captains only"],correct:1,expl:"L5 stands out for its role as pure synthesis, without new theoretical input or new real case."},
    {q:"What is the main goal of lesson L5 in the Safety Department?",opts:["Study a new real distress case","Turn the 5 previous lessons into a reusable method (the MAP Safety Mindset) and close the module","Re-explain GMDSS theory","Compare EPIRB equipment between manufacturers"],correct:1,expl:"L5 concludes the module by turning the learning into a mindset applicable to any future situation."},
    {q:"Why doesn't this lesson still not develop abandon-ship procedures?",opts:["Because that topic exclusively belongs to the future s5 module","Because it's never useful","Because it was already covered elsewhere in this module","Because the format doesn't allow it"],correct:0,expl:"Per MAP's architecture rule, abandoning ship remains the exclusive domain of the future s5 module, even at s2's closing."},
  ],
  es:[
    {q:"¿Qué pilar del MAP Safety Mindset corresponde a El Faro (L1)?",opts:["Choose","Recognize","Prepare","Activate"],correct:1,expl:"El Faro ilustra el reconocimiento tardío de una emergencia ya real — el pilar Recognize."},
    {q:"¿Qué pilar corresponde principalmente a SV Nina (L2)?",opts:["Choose","Learn","Activate","Prepare"],correct:0,expl:"Nina ilustra una mala elección: cinco sistemas distintos que compartían la misma debilidad manual."},
    {q:"¿Qué pilar corresponde a Lady Mary (L3)?",opts:["Recognize","Activate","Prepare","Learn"],correct:2,expl:"Lady Mary ilustra una preparación descuidada: registro ausente, sin enlace GPS."},
    {q:"¿Qué pilar corresponde a Trinity II (L4)?",opts:["Recognize","Choose","Prepare","Activate"],correct:3,expl:"Trinity II ilustra un fallo de ejecución bajo pánico pese a un equipo adecuado y preparado."},
    {q:"¿Qué tienen en común los 4 casos del módulo pese a causas muy diferentes?",opts:["Un defecto de fabricación idéntico","Cada uno aísla un eslabón distinto de la misma cadena de supervivencia","La misma naviera","La misma zona geográfica"],correct:1,expl:"Cada caso aísla un eslabón distinto — reconocer, elegir, preparar, activar — de la misma cadena de supervivencia."},
    {q:"¿Qué significa 'The MAP Safety Mindset'?",opts:["Un nuevo concepto técnico","Recognize → Choose → Prepare → Activate → Learn → Repeat, una mentalidad reutilizable durante toda la carrera","Una certificación adicional","Un procedimiento de emergencia más"],correct:1,expl:"No es contenido nuevo — es la síntesis de las 5 lecciones convertida en un método reutilizable para cualquier situación."},
    {q:"¿Por qué es esencial el 'Repeat' en el MAP Safety Mindset?",opts:["Porque la seguridad se adquiere de una vez por todas tras este módulo","Porque la seguridad se renueva con cada ejercicio, cada guardia, cada embarque","Porque hay que repetir la teoría GMDSS","Repeat no tiene importancia especial"],correct:1,expl:"La seguridad nunca termina — se practica y se renueva continuamente, no solo durante un módulo cursado una vez."},
    {q:"Una tripulación tiene varios medios de comunicación, todos manuales. ¿Qué pilar habría roto una cadena similar a la de Nina?",opts:["Recognize","Choose — combinar sistemas con debilidades diferentes","Learn solo después","Ningún pilar habría ayudado"],correct:1,expl:"Combinar sistemas complementarios (Choose) habría roto la repetición de la misma vulnerabilidad."},
    {q:"¿Por qué estudiar accidentes ya analizados en detalle en lecciones anteriores, sin añadir nuevos?",opts:["Por falta de nuevos casos disponibles","Para consolidar lo aprendido en un todo coherente en lugar de dispersar la atención en una nueva tragedia","Porque los nuevos casos no están suficientemente documentados","El formato no lo permitía"],correct:1,expl:"L5 es una lección de síntesis — el objetivo es conectar lo ya aprendido, no introducir contenido nuevo."},
    {q:"¿Qué frase resume la filosofía de cierre del módulo s2?",opts:["'La seguridad es un certificado que se obtiene una vez'","'Every accident becomes training for the next generation'","'El equipo por sí solo salva vidas'","'No hay nada que aprender de los accidentes pasados'"],correct:1,expl:"Esta frase resume por qué se estudian los accidentes marítimos: cada tragedia se convierte en una lección para quienes siguen."},
    {q:"¿Cuál es el propósito de la autoevaluación sobre los 5 pilares al final del módulo?",opts:["Comparar a los marinos entre sí","Permitir que cada uno identifique honestamente su pilar más débil y se comprometa a mejorarlo","Sustituir una certificación oficial","Servir solo de formalidad administrativa"],correct:1,expl:"La autoevaluación es una herramienta personal de progreso que termina en un compromiso concreto, no una comparación entre marinos."},
    {q:"¿Por qué la constelación de los 4 casos muestra también lo que se hizo bien (🟢), no solo lo que falló (🔴)?",opts:["Para minimizar la gravedad de los accidentes","Para mostrar que incluso un accidente dramático contiene buenas decisiones, no solo errores","Porque el rojo no es suficientemente visible","No tiene ninguna utilidad pedagógica"],correct:1,expl:"Mostrar también las buenas decisiones permite matizar el análisis y evitar reducir cada accidente a una simple sucesión de errores."},
    {q:"¿Cuál es la diferencia esencial entre s2-L5 y una lección de contenido clásica como s2-L1 a L4?",opts:["No hay ninguna diferencia","L5 no desarrolla contenido nuevo — conecta y sintetiza lo ya enseñado","L5 introduce toda la teoría GMDSS","L5 está reservada solo a los Capitanes"],correct:1,expl:"L5 se distingue por su papel de síntesis pura, sin nuevo aporte teórico ni nuevo caso real."},
    {q:"¿Cuál es el objetivo principal de la lección L5 en el Safety Department?",opts:["Estudiar un nuevo caso real de emergencia","Convertir las 5 lecciones anteriores en un método reutilizable (el MAP Safety Mindset) y cerrar el módulo","Reexplicar la teoría GMDSS","Comparar equipos EPIRB entre fabricantes"],correct:1,expl:"L5 concluye el módulo convirtiendo el aprendizaje en una mentalidad aplicable a cualquier situación futura."},
    {q:"¿Por qué esta lección sigue sin desarrollar los procedimientos de abandono del buque?",opts:["Porque ese tema pertenece exclusivamente al futuro módulo s5","Porque nunca es útil","Porque ya se vio en otra parte de este módulo","Porque el formato no lo permite"],correct:0,expl:"Según la regla de arquitectura de MAP, abandonar el buque sigue siendo dominio exclusivo del futuro módulo s5, incluso al cierre de s2."},
  ],
  pt:[
    {q:"Que pilar do MAP Safety Mindset corresponde ao El Faro (L1)?",opts:["Choose","Recognize","Prepare","Activate"],correct:1,expl:"O El Faro ilustra o reconhecimento tardio de uma emergência já real — o pilar Recognize."},
    {q:"Que pilar corresponde principalmente ao SV Nina (L2)?",opts:["Choose","Learn","Activate","Prepare"],correct:0,expl:"O Nina ilustra uma má escolha: cinco sistemas diferentes partilhando a mesma fraqueza manual."},
    {q:"Que pilar corresponde ao Lady Mary (L3)?",opts:["Recognize","Activate","Prepare","Learn"],correct:2,expl:"O Lady Mary ilustra uma preparação negligenciada: registo ausente, sem ligação GPS."},
    {q:"Que pilar corresponde ao Trinity II (L4)?",opts:["Recognize","Choose","Prepare","Activate"],correct:3,expl:"O Trinity II ilustra uma falha de execução sob pânico apesar de equipamento adequado e preparado."},
    {q:"O que têm em comum os 4 casos do módulo apesar de causas muito diferentes?",opts:["Um defeito de fabrico idêntico","Cada um isola um elo diferente da mesma cadeia de sobrevivência","A mesma armadora","A mesma zona geográfica"],correct:1,expl:"Cada caso isola um elo distinto — reconhecer, escolher, preparar, ativar — da mesma cadeia de sobrevivência."},
    {q:"O que significa 'The MAP Safety Mindset'?",opts:["Um novo conceito técnico","Recognize → Choose → Prepare → Activate → Learn → Repeat, uma mentalidade reutilizável durante toda a carreira","Uma certificação adicional","Mais um procedimento de emergência"],correct:1,expl:"Não é conteúdo novo — é a síntese das 5 lições transformada num método reutilizável para qualquer situação."},
    {q:"Por que o 'Repeat' é essencial no MAP Safety Mindset?",opts:["Porque a segurança se adquire de uma vez por todas após este módulo","Porque a segurança se renova a cada exercício, cada quarto, cada embarque","Porque é preciso repetir a teoria GMDSS","O Repeat não tem importância especial"],correct:1,expl:"A segurança nunca está terminada — pratica-se e renova-se continuamente, não apenas durante um módulo feito uma vez."},
    {q:"Uma tripulação tem vários meios de comunicação, todos manuais. Que pilar teria quebrado uma cadeia semelhante à do Nina?",opts:["Recognize","Choose — combinar sistemas com fraquezas diferentes","Learn só depois","Nenhum pilar teria ajudado"],correct:1,expl:"Combinar sistemas complementares (Choose) teria quebrado a repetição da mesma vulnerabilidade."},
    {q:"Por que estudar acidentes já analisados em detalhe em lições anteriores, sem adicionar novos?",opts:["Por falta de novos casos disponíveis","Para consolidar a aprendizagem num todo coerente em vez de dispersar a atenção numa nova tragédia","Porque os novos casos não estão suficientemente documentados","O formato não o permitia"],correct:1,expl:"L5 é uma lição de síntese — o objetivo é conectar o que já foi aprendido, não introduzir conteúdo novo."},
    {q:"Que frase resume a filosofia de encerramento do módulo s2?",opts:["'A segurança é um certificado obtido uma vez'","'Every accident becomes training for the next generation'","'O equipamento sozinho salva vidas'","'Não há nada a aprender com acidentes passados'"],correct:1,expl:"Esta frase resume por que estudamos os acidentes marítimos: cada tragédia torna-se uma lição para os que vêm depois."},
    {q:"Qual é o objetivo da autoavaliação sobre os 5 pilares no final do módulo?",opts:["Comparar os marítimos entre si","Permitir que cada um identifique honestamente o seu pilar mais fraco e se comprometa a melhorá-lo","Substituir uma certificação oficial","Servir apenas de formalidade administrativa"],correct:1,expl:"A autoavaliação é uma ferramenta pessoal de progresso que termina num compromisso concreto, não uma comparação entre marítimos."},
    {q:"Por que a constelação dos 4 casos mostra também o que correu bem (🟢), não só o que falhou (🔴)?",opts:["Para minimizar a gravidade dos acidentes","Para mostrar que mesmo um acidente dramático contém boas decisões, não só erros","Porque o vermelho não é suficientemente visível","Não tem utilidade pedagógica"],correct:1,expl:"Mostrar também as boas decisões permite matizar a análise e evitar reduzir cada acidente a uma simples sucessão de erros."},
    {q:"Qual é a diferença essencial entre s2-L5 e uma lição de conteúdo clássica como s2-L1 a L4?",opts:["Não há diferença nenhuma","L5 não desenvolve conteúdo novo — conecta e sintetiza o que já foi ensinado","L5 introduz toda a teoria GMDSS","L5 é reservada só a Comandantes"],correct:1,expl:"L5 distingue-se pelo seu papel de síntese pura, sem novo contributo teórico nem novo caso real."},
    {q:"Qual é o objetivo principal da lição L5 no Safety Department?",opts:["Estudar um novo caso real de emergência","Transformar as 5 lições anteriores num método reutilizável (o MAP Safety Mindset) e encerrar o módulo","Reexplicar a teoria GMDSS","Comparar equipamentos EPIRB entre fabricantes"],correct:1,expl:"L5 conclui o módulo transformando a aprendizagem numa mentalidade aplicável a qualquer situação futura."},
    {q:"Por que esta lição continua a não desenvolver os procedimentos de abandono do navio?",opts:["Porque esse tema pertence exclusivamente ao futuro módulo s5","Porque nunca é útil","Porque já foi visto noutra parte deste módulo","Porque o formato não o permite"],correct:0,expl:"Segundo a regra de arquitetura da MAP, abandonar o navio continua a ser domínio exclusivo do futuro módulo s5, mesmo no encerramento de s2."},
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

const QUIZ = {
  fr:[
    {q:"Quel pilier correspond à El Faro ?",opts:["Recognize","Choose","Prepare","Activate"],correct:0,expl:"El Faro illustre la reconnaissance tardive d'une détresse déjà réelle."},
    {q:"Quel pilier correspond à SV Nina ?",opts:["Recognize","Choose","Activate","Learn"],correct:1,expl:"Nina illustre un mauvais choix : cinq systèmes partageant la même faiblesse manuelle."},
    {q:"Que signifie le 'Repeat' du MAP Safety Mindset ?",opts:["La sécurité est acquise après ce module","La sécurité se renouvelle à chaque exercice et chaque quart","Il faut répéter la théorie GMDSS","Cela n'a pas d'importance"],correct:1,expl:"La sécurité n'est jamais terminée — elle se pratique en continu."},
    {q:"Pourquoi L5 ne développe-t-elle aucun nouveau cas réel ?",opts:["Par manque de cas disponibles","Pour consolider les acquis plutôt que disperser l'attention","Les cas récents ne sont pas documentés","Le format ne le permet pas"],correct:1,expl:"L5 est une synthèse pure — introduire un nouveau cas détournerait l'attention."},
    {q:"Quelle phrase résume la philosophie du module s2 ?",opts:["'La sécurité s'obtient une fois'","'Every accident becomes training for the next generation'","'L'équipement seul suffit'","'Rien à apprendre du passé'"],correct:1,expl:"Chaque tragédie devient un enseignement pour ceux qui suivent."},
  ],
  en:[
    {q:"Which pillar corresponds to El Faro?",opts:["Recognize","Choose","Prepare","Activate"],correct:0,expl:"El Faro illustrates the late recognition of an already-real distress."},
    {q:"Which pillar corresponds to SV Nina?",opts:["Recognize","Choose","Activate","Learn"],correct:1,expl:"Nina illustrates a poor choice: five systems sharing the same manual weakness."},
    {q:"What does the 'Repeat' of the MAP Safety Mindset mean?",opts:["Safety is acquired after this module","Safety renews with every drill and every watch","You must repeat GMDSS theory","It doesn't matter"],correct:1,expl:"Safety is never finished — it is practiced continuously."},
    {q:"Why does L5 develop no new real case?",opts:["Due to a lack of available cases","To consolidate learning rather than scatter attention","Recent cases aren't documented","The format doesn't allow it"],correct:1,expl:"L5 is pure synthesis — introducing a new case would divert attention."},
    {q:"Which phrase summarizes s2's philosophy?",opts:["'Safety is earned once'","'Every accident becomes training for the next generation'","'Equipment alone is enough'","'Nothing to learn from the past'"],correct:1,expl:"Every tragedy becomes a lesson for those who follow."},
  ],
  es:[
    {q:"¿Qué pilar corresponde a El Faro?",opts:["Recognize","Choose","Prepare","Activate"],correct:0,expl:"El Faro ilustra el reconocimiento tardío de una emergencia ya real."},
    {q:"¿Qué pilar corresponde a SV Nina?",opts:["Recognize","Choose","Activate","Learn"],correct:1,expl:"Nina ilustra una mala elección: cinco sistemas compartiendo la misma debilidad manual."},
    {q:"¿Qué significa el 'Repeat' del MAP Safety Mindset?",opts:["La seguridad se adquiere tras este módulo","La seguridad se renueva con cada ejercicio y cada guardia","Hay que repetir la teoría GMDSS","No importa"],correct:1,expl:"La seguridad nunca termina — se practica continuamente."},
    {q:"¿Por qué L5 no desarrolla ningún caso real nuevo?",opts:["Por falta de casos disponibles","Para consolidar lo aprendido en lugar de dispersar la atención","Los casos recientes no están documentados","El formato no lo permite"],correct:1,expl:"L5 es síntesis pura — introducir un nuevo caso desviaría la atención."},
    {q:"¿Qué frase resume la filosofía del módulo s2?",opts:["'La seguridad se obtiene una vez'","'Every accident becomes training for the next generation'","'El equipo por sí solo basta'","'Nada que aprender del pasado'"],correct:1,expl:"Cada tragedia se convierte en una lección para quienes siguen."},
  ],
  pt:[
    {q:"Que pilar corresponde ao El Faro?",opts:["Recognize","Choose","Prepare","Activate"],correct:0,expl:"O El Faro ilustra o reconhecimento tardio de uma emergência já real."},
    {q:"Que pilar corresponde ao SV Nina?",opts:["Recognize","Choose","Activate","Learn"],correct:1,expl:"O Nina ilustra uma má escolha: cinco sistemas partilhando a mesma fraqueza manual."},
    {q:"O que significa o 'Repeat' do MAP Safety Mindset?",opts:["A segurança adquire-se após este módulo","A segurança renova-se a cada exercício e cada quarto","É preciso repetir a teoria GMDSS","Não importa"],correct:1,expl:"A segurança nunca está terminada — pratica-se continuamente."},
    {q:"Por que L5 não desenvolve nenhum caso real novo?",opts:["Por falta de casos disponíveis","Para consolidar a aprendizagem em vez de dispersar a atenção","Os casos recentes não estão documentados","O formato não o permite"],correct:1,expl:"L5 é síntese pura — introduzir um novo caso desviaria a atenção."},
    {q:"Que frase resume a filosofia do módulo s2?",opts:["'A segurança obtém-se uma vez'","'Every accident becomes training for the next generation'","'O equipamento sozinho basta'","'Nada a aprender com o passado'"],correct:1,expl:"Cada tragédia torna-se uma lição para os que vêm depois."},
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

function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais sauver un équipage demain, en quel pilier des cinq (Recognize, Choose, Prepare, Activate, Learn) aurais-tu le moins confiance aujourd'hui ? Que vas-tu faire pour l'améliorer ?",
    en:"If you had to save a crew tomorrow, which of the five pillars would you trust the least in yourself today? What will you do to improve it?",
    es:"Si tuvieras que salvar a una tripulación mañana, ¿en cuál de los cinco pilares confiarías menos hoy? ¿Qué harás para mejorarlo?",
    pt:"Se tivesses de salvar uma tripulação amanhã, em qual dos cinco pilares confiarias menos hoje? O que vais fazer para o melhorar?",
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

function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

const getContent = lang => {
  const d = {
    fr:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Leçon 5/5 · ⭐ Premium · 🏁 FIN DU MODULE",
      title:"Real Search & Rescue Operations — Lessons Learned",
      intro:"Cette leçon n'introduit aucun nouveau cas, aucune nouvelle théorie. Elle relie les quatre histoires déjà étudiées — El Faro, SV Nina, Lady Mary, Trinity II — pour révéler la chaîne complète de la survie en détresse.\n\nLes noms changent. Les cinq piliers restent.",
      p0:"CHAQUE URGENCE LAISSE UNE LEÇON",s0t:"Every accident becomes training for the next generation",
      s0:"On n'étudie pas les accidents maritimes par fascination morbide — on les étudie parce que chaque tragédie analysée en profondeur devient un enseignement pour ceux qui prendront la mer après nous.",
      p1:"LA CHAÎNE DERRIÈRE LES QUATRE ACCIDENTS",s1t:"Un maillon différent, une même chaîne de survie",
      s1:"El Faro, SV Nina, Lady Mary et Trinity II n'ont presque rien en commun en apparence — navires, époques, causes immédiates différentes. Et pourtant, chacun isole exactement un maillon de la même chaîne : reconnaître, choisir, préparer, activer.",
      p2:"RECOGNIZE — EL FARO",s2t:"Le maillon de la reconnaissance",
      s2:"Le message de détresse était rédigé à 6h31. Il n'a été envoyé qu'à 7h13, après que le capitaine a jugé qu'il n'y avait 'pas besoin' d'alarme générale malgré une voie d'eau déjà significative.",
      p3:"CHOOSE & PREPARE — SV NINA / LADY MARY",s3t:"Le maillon du choix et de la préparation",
      s3:"Nina avait cinq systèmes, tous manuels — la même faiblesse répétée. Lady Mary a activé son EPIRB, mais l'enregistrement négligé et l'absence de GPS ont retardé la localisation malgré une activation réussie.",
      p4:"ACTIVATE — TRINITY II",s4t:"Le maillon de l'exécution",
      s4:"L'équipement était présent et adéquat. Mais dans la panique de l'évacuation, les radeaux ont été gonflés sur le pont au lieu de l'eau, et personne n'a pensé à emporter l'EPIRB.",
      p5:"THE FIVE PILLARS OF SURVIVAL",s5t:"Recognize · Choose · Prepare · Activate · Learn",
      s5:"Ces cinq mots ne sont plus de simples titres de leçons. Ensemble, ils forment une méthode complète, applicable à n'importe quelle urgence future, quelle que soit sa forme exacte.",
      p6:"BUILDING YOUR PROFESSIONAL SAFETY MINDSET",s6t:"The MAP Safety Mindset",
      s6:"Recognize → Choose → Prepare → Activate → Learn → Repeat.\n\nLe Repeat est essentiel : la sécurité n'est jamais terminée. Elle se renouvelle à chaque exercice, chaque quart, chaque embarquement.",
      p7:"🎯 EXERCICE DE RECONNAISSANCE DE SCHÉMAS",p8:"⚠️ RÉTROSPECTIVE DES 4 CAS DU MODULE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 5 · FIN DU MODULE",
      sumP:["Les 4 cas isolent chacun un maillon différent de la même chaîne de survie","El Faro = Recognize · SV Nina = Choose · Lady Mary = Prepare · Trinity II = Activate","The MAP Safety Mindset : Recognize → Choose → Prepare → Activate → Learn → Repeat","Le Repeat est essentiel — la sécurité se renouvelle en continu, jamais acquise une fois pour toutes","Every accident becomes training for the next generation"],
      learnedP:["Le fil conducteur entre les 4 cas du module","Recognize, Choose, Prepare, Activate revisités","The Five Pillars of Survival","The MAP Safety Mindset et son Repeat final","Auto-évaluation honnête sur les 5 piliers"],
      safetyMsg:"Recognize the danger. Choose the right tool. Prepare it before you need it. Activate it without hesitation. Learn from those who came before you — so others never have to learn from you.",
      moduleComplete:{
        title:"EPIRB, SART & GMDSS — MODULE TERMINÉ !",
        subtitle:"5 leçons maîtrisées — The MAP Safety Mindset acquis 🆘",
        message:"Félicitations ! Tu as terminé le module EPIRB, SART & GMDSS. Tu ne connais plus seulement les systèmes de détresse — tu sais quand les reconnaître, lesquels choisir, comment les préparer, comment les activer sous pression, et ce que d'autres marins ont payé pour te l'apprendre. Safety is not a certificate you earn once. It is a discipline you practise every day you step on board.",
      },
    },
    en:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Lesson 5/5 · ⭐ Premium · 🏁 MODULE COMPLETE",
      title:"Real Search & Rescue Operations — Lessons Learned",
      intro:"This lesson introduces no new case, no new theory. It connects the four stories already studied — El Faro, SV Nina, Lady Mary, Trinity II — to reveal the complete chain of survival in distress.\n\nThe names change. The five pillars remain.",
      p0:"EVERY EMERGENCY LEAVES A LESSON",s0t:"Every accident becomes training for the next generation",
      s0:"We don't study maritime accidents out of morbid fascination — we study them because every tragedy analyzed in depth becomes a lesson for those who will go to sea after us.",
      p1:"THE CHAIN BEHIND THE FOUR ACCIDENTS",s1t:"A different link, the same survival chain",
      s1:"El Faro, SV Nina, Lady Mary and Trinity II have almost nothing in common on the surface — different vessels, eras, immediate causes. Yet each isolates exactly one link of the same chain: recognize, choose, prepare, activate.",
      p2:"RECOGNIZE — EL FARO",s2t:"The recognition link",
      s2:"The distress message was drafted at 6:31am. It was only sent at 7:13am, after the captain judged there was 'no need' for a general alarm despite already-significant flooding.",
      p3:"CHOOSE & PREPARE — SV NINA / LADY MARY",s3t:"The choice and preparation link",
      s3:"Nina had five systems, all manual — the same weakness repeated. Lady Mary activated its EPIRB, but neglected registration and lack of GPS delayed location despite a successful activation.",
      p4:"ACTIVATE — TRINITY II",s4t:"The execution link",
      s4:"The equipment was present and adequate. But in the panic of the evacuation, the liferafts were inflated on deck instead of in the water, and no one thought to bring the EPIRB.",
      p5:"THE FIVE PILLARS OF SURVIVAL",s5t:"Recognize · Choose · Prepare · Activate · Learn",
      s5:"These five words are no longer mere lesson titles. Together, they form a complete method, applicable to any future emergency, whatever its exact shape.",
      p6:"BUILDING YOUR PROFESSIONAL SAFETY MINDSET",s6t:"The MAP Safety Mindset",
      s6:"Recognize → Choose → Prepare → Activate → Learn → Repeat.\n\nThe Repeat is essential: safety is never finished. It renews with every drill, every watch, every embarkation.",
      p7:"🎯 PATTERN-RECOGNITION EXERCISE",p8:"⚠️ RETROSPECTIVE OF THE MODULE'S 4 CASES",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 5 · MODULE COMPLETE",
      sumP:["The 4 cases each isolate a different link of the same survival chain","El Faro = Recognize · SV Nina = Choose · Lady Mary = Prepare · Trinity II = Activate","The MAP Safety Mindset: Recognize → Choose → Prepare → Activate → Learn → Repeat","The Repeat is essential — safety renews continuously, never acquired once and for all","Every accident becomes training for the next generation"],
      learnedP:["The common thread across the module's 4 cases","Recognize, Choose, Prepare, Activate revisited","The Five Pillars of Survival","The MAP Safety Mindset and its final Repeat","Honest self-assessment on the 5 pillars"],
      safetyMsg:"Recognize the danger. Choose the right tool. Prepare it before you need it. Activate it without hesitation. Learn from those who came before you — so others never have to learn from you.",
      moduleComplete:{
        title:"EPIRB, SART & GMDSS — MODULE COMPLETE!",
        subtitle:"5 lessons mastered — The MAP Safety Mindset acquired 🆘",
        message:"Congratulations! You have completed the EPIRB, SART & GMDSS module. You no longer just know the distress systems — you know when to recognize them, which to choose, how to prepare them, how to activate them under pressure, and what other sailors paid to teach you that. Safety is not a certificate you earn once. It is a discipline you practise every day you step on board.",
      },
    },
    es:{
      badge:"🆘 Seguridad · EPIRB, SART y GMDSS · Lección 5/5 · ⭐ Premium · 🏁 MÓDULO COMPLETADO",
      title:"Real Search & Rescue Operations — Lessons Learned",
      intro:"Esta lección no introduce ningún caso nuevo, ninguna teoría nueva. Conecta las cuatro historias ya estudiadas — El Faro, SV Nina, Lady Mary, Trinity II — para revelar la cadena completa de la supervivencia en emergencia.\n\nLos nombres cambian. Los cinco pilares permanecen.",
      p0:"CADA EMERGENCIA DEJA UNA LECCIÓN",s0t:"Every accident becomes training for the next generation",
      s0:"No estudiamos los accidentes marítimos por fascinación morbosa — los estudiamos porque cada tragedia analizada en profundidad se convierte en una lección para quienes navegarán después de nosotros.",
      p1:"LA CADENA DETRÁS DE LOS CUATRO ACCIDENTES",s1t:"Un eslabón distinto, la misma cadena de supervivencia",
      s1:"El Faro, SV Nina, Lady Mary y Trinity II no tienen casi nada en común en la superficie — buques, épocas, causas inmediatas diferentes. Y sin embargo, cada uno aísla exactamente un eslabón de la misma cadena: reconocer, elegir, preparar, activar.",
      p2:"RECOGNIZE — EL FARO",s2t:"El eslabón del reconocimiento",
      s2:"El mensaje de socorro se redactó a las 6:31. Solo se envió a las 7:13, tras juzgar el capitán que no había 'necesidad' de alarma general pese a una vía de agua ya significativa.",
      p3:"CHOOSE & PREPARE — SV NINA / LADY MARY",s3t:"El eslabón de la elección y la preparación",
      s3:"Nina tenía cinco sistemas, todos manuales — la misma debilidad repetida. Lady Mary activó su EPIRB, pero el registro descuidado y la falta de GPS retrasaron la localización pese a una activación exitosa.",
      p4:"ACTIVATE — TRINITY II",s4t:"El eslabón de la ejecución",
      s4:"El equipo estaba presente y era adecuado. Pero en el pánico de la evacuación, las balsas se inflaron en cubierta en lugar de en el agua, y nadie pensó en llevar el EPIRB.",
      p5:"THE FIVE PILLARS OF SURVIVAL",s5t:"Recognize · Choose · Prepare · Activate · Learn",
      s5:"Estas cinco palabras ya no son simples títulos de lecciones. Juntas, forman un método completo, aplicable a cualquier emergencia futura, sea cual sea su forma exacta.",
      p6:"BUILDING YOUR PROFESSIONAL SAFETY MINDSET",s6t:"The MAP Safety Mindset",
      s6:"Recognize → Choose → Prepare → Activate → Learn → Repeat.\n\nEl Repeat es esencial: la seguridad nunca termina. Se renueva con cada ejercicio, cada guardia, cada embarque.",
      p7:"🎯 EJERCICIO DE RECONOCIMIENTO DE PATRONES",p8:"⚠️ RETROSPECTIVA DE LOS 4 CASOS DEL MÓDULO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 5 · MÓDULO COMPLETADO",
      sumP:["Los 4 casos aíslan cada uno un eslabón distinto de la misma cadena de supervivencia","El Faro = Recognize · SV Nina = Choose · Lady Mary = Prepare · Trinity II = Activate","The MAP Safety Mindset: Recognize → Choose → Prepare → Activate → Learn → Repeat","El Repeat es esencial — la seguridad se renueva continuamente, nunca adquirida de una vez por todas","Every accident becomes training for the next generation"],
      learnedP:["El hilo conductor entre los 4 casos del módulo","Recognize, Choose, Prepare, Activate revisitados","The Five Pillars of Survival","The MAP Safety Mindset y su Repeat final","Autoevaluación honesta sobre los 5 pilares"],
      safetyMsg:"Recognize the danger. Choose the right tool. Prepare it before you need it. Activate it without hesitation. Learn from those who came before you — so others never have to learn from you.",
      moduleComplete:{
        title:"EPIRB, SART Y GMDSS — ¡MÓDULO COMPLETADO!",
        subtitle:"5 lecciones dominadas — The MAP Safety Mindset adquirido 🆘",
        message:"¡Felicidades! Has completado el módulo EPIRB, SART y GMDSS. Ya no solo conoces los sistemas de socorro — sabes cuándo reconocerlos, cuáles elegir, cómo prepararlos, cómo activarlos bajo presión, y lo que otros marinos pagaron para enseñártelo. Safety is not a certificate you earn once. It is a discipline you practise every day you step on board.",
      },
    },
    pt:{
      badge:"🆘 Segurança · EPIRB, SART e GMDSS · Lição 5/5 · ⭐ Premium · 🏁 MÓDULO CONCLUÍDO",
      title:"Real Search & Rescue Operations — Lessons Learned",
      intro:"Esta lição não introduz nenhum caso novo, nenhuma teoria nova. Conecta as quatro histórias já estudadas — El Faro, SV Nina, Lady Mary, Trinity II — para revelar a cadeia completa da sobrevivência em emergência.\n\nOs nomes mudam. Os cinco pilares permanecem.",
      p0:"CADA EMERGÊNCIA DEIXA UMA LIÇÃO",s0t:"Every accident becomes training for the next generation",
      s0:"Não estudamos os acidentes marítimos por fascínio mórbido — estudamo-los porque cada tragédia analisada em profundidade se torna uma lição para quem navegará depois de nós.",
      p1:"A CADEIA POR TRÁS DOS QUATRO ACIDENTES",s1t:"Um elo diferente, a mesma cadeia de sobrevivência",
      s1:"El Faro, SV Nina, Lady Mary e Trinity II não têm quase nada em comum à superfície — navios, épocas, causas imediatas diferentes. E, no entanto, cada um isola exatamente um elo da mesma cadeia: reconhecer, escolher, preparar, ativar.",
      p2:"RECOGNIZE — EL FARO",s2t:"O elo do reconhecimento",
      s2:"A mensagem de socorro foi redigida às 6h31. Só foi enviada às 7h13, depois de o comandante ter julgado que não havia 'necessidade' de alarme geral apesar de uma via de água já significativa.",
      p3:"CHOOSE & PREPARE — SV NINA / LADY MARY",s3t:"O elo da escolha e da preparação",
      s3:"Nina tinha cinco sistemas, todos manuais — a mesma fraqueza repetida. Lady Mary ativou o seu EPIRB, mas o registo negligenciado e a falta de GPS atrasaram a localização apesar de uma ativação bem-sucedida.",
      p4:"ACTIVATE — TRINITY II",s4t:"O elo da execução",
      s4:"O equipamento estava presente e era adequado. Mas no pânico da evacuação, as jangadas foram infladas no convés em vez de na água, e ninguém pensou em levar o EPIRB.",
      p5:"THE FIVE PILLARS OF SURVIVAL",s5t:"Recognize · Choose · Prepare · Activate · Learn",
      s5:"Estas cinco palavras já não são meros títulos de lições. Juntas, formam um método completo, aplicável a qualquer emergência futura, seja qual for a sua forma exata.",
      p6:"BUILDING YOUR PROFESSIONAL SAFETY MINDSET",s6t:"The MAP Safety Mindset",
      s6:"Recognize → Choose → Prepare → Activate → Learn → Repeat.\n\nO Repeat é essencial: a segurança nunca está terminada. Renova-se a cada exercício, cada quarto, cada embarque.",
      p7:"🎯 EXERCÍCIO DE RECONHECIMENTO DE PADRÕES",p8:"⚠️ RETROSPETIVA DOS 4 CASOS DO MÓDULO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 5 · MÓDULO CONCLUÍDO",
      sumP:["Os 4 casos isolam cada um um elo diferente da mesma cadeia de sobrevivência","El Faro = Recognize · SV Nina = Choose · Lady Mary = Prepare · Trinity II = Activate","The MAP Safety Mindset: Recognize → Choose → Prepare → Activate → Learn → Repeat","O Repeat é essencial — a segurança renova-se continuamente, nunca adquirida de uma vez por todas","Every accident becomes training for the next generation"],
      learnedP:["O fio condutor entre os 4 casos do módulo","Recognize, Choose, Prepare, Activate revisitados","The Five Pillars of Survival","The MAP Safety Mindset e o seu Repeat final","Autoavaliação honesta sobre os 5 pilares"],
      safetyMsg:"Recognize the danger. Choose the right tool. Prepare it before you need it. Activate it without hesitation. Learn from those who came before you — so others never have to learn from you.",
      moduleComplete:{
        title:"EPIRB, SART E GMDSS — MÓDULO CONCLUÍDO!",
        subtitle:"5 lições dominadas — The MAP Safety Mindset adquirido 🆘",
        message:"Parabéns! Concluíste o módulo EPIRB, SART e GMDSS. Já não conheces apenas os sistemas de socorro — sabes quando os reconhecer, quais escolher, como os preparar, como os ativar sob pressão, e o que outros marítimos pagaram para to ensinar. Safety is not a certificate you earn once. It is a discipline you practise every day you step on board.",
      },
    },
  };
  return d[lang]||d.fr;
};

export default function LessonSafetyS2_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/5 🏁":lang==="en"?"Lesson 5/5 🏁":lang==="es"?"Lección 5/5 🏁":"Lição 5/5 🏁"}</div>
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

            <SL icon="📖" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📖</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔗" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔗</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:12}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌌 {lang==="fr"?"CONSTELLATION DES 4 CAS — INTERACTIF":lang==="en"?"CONSTELLATION OF THE 4 CASES — INTERACTIVE":lang==="es"?"CONSTELACIÓN DE LOS 4 CASOS — INTERACTIVO":"CONSTELAÇÃO DOS 4 CASOS — INTERATIVO"}</div><ConstellationSVG lang={lang}/></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📊 {lang==="fr"?"TABLEAU CROISÉ DES CAUSES — INTERACTIF":lang==="en"?"CROSS-CAUSE MATRIX — INTERACTIVE":lang==="es"?"MATRIZ CRUZADA DE CAUSAS — INTERACTIVO":"MATRIZ CRUZADA DE CAUSAS — INTERATIVO"}</div><CauseMatrixSVG lang={lang}/></Card>

            <SL icon="🚨" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🎯" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="⚡" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⏱️ {lang==="fr"?"FENÊTRE DE TEMPS COMPARÉE — INTERACTIF":lang==="en"?"TIME WINDOW COMPARED — INTERACTIVE":lang==="es"?"VENTANA DE TIEMPO COMPARADA — INTERACTIVO":"JANELA DE TEMPO COMPARADA — INTERATIVO"}</div><TimeWindowSVG lang={lang}/></Card>

            <SL icon="⭐" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.85))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⭐</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🧭" text={lc.p6} color={C.teal}/>
            <Card style={{marginBottom:12,border:`1px solid ${C.teal}44`,background:"linear-gradient(135deg,rgba(10,138,108,0.1),rgba(13,31,60,0.85))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.85)",lineHeight:1.9,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎡 {lang==="fr"?"AUTO-ÉVALUATION SUR LES 5 PILIERS — INTERACTIF":lang==="en"?"SELF-ASSESSMENT ON THE 5 PILLARS — INTERACTIVE":lang==="es"?"AUTOEVALUACIÓN SOBRE LOS 5 PILARES — INTERACTIVO":"AUTOAVALIAÇÃO SOBRE OS 5 PILARES — INTERATIVO"}</div><PillarWheelSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}44`,background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="🔎" text={lc.p8} color={C.red}/>
            <Card style={{marginBottom:14}}><CaseRetrospective lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final — Synthèse du Module":lang==="en"?"Final Quiz — Module Synthesis":lang==="es"?"Quiz Final — Síntesis del Módulo":"Quiz Final — Síntese do Módulo"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/5 · 🏁":"questions · Lesson 5/5 · 🏁"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20,padding:"20px 16px",borderRadius:20,background:"linear-gradient(135deg,rgba(192,57,43,0.15),rgba(201,146,42,0.1))",border:`1px solid ${C.red}44`}}>
              <div style={{fontSize:72,marginBottom:8}}>🏆</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.gold2,marginBottom:4}}>{lc.moduleComplete.title}</div>
              <div style={{fontSize:14,color:C.white,marginBottom:12}}>{lc.moduleComplete.subtitle}</div>
              <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
                {["L1","L2","L3","L4","L5"].map((l,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:10,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:C.white}}>{l}</div>
                ))}
              </div>
            </div>

            <div style={{display:"inline-flex",width:"100%",justifyContent:"center",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(201,146,42,0.15)",border:`1px solid ${C.gold}55`,fontSize:14,color:C.gold2,fontWeight:700,marginBottom:16,boxSizing:"border-box"}}>
              +250 {t.xp} ⭐ · {lang==="fr"?"Module":"Module"}: 5/5 · {lang==="fr"?"Quiz":"Quiz"} {quizScore}/5
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🆘</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <div style={{textAlign:"center",marginBottom:16,fontSize:13,color:C.gold2,fontStyle:"italic",lineHeight:1.7,maxWidth:340,marginLeft:"auto",marginRight:"auto"}}>
              {lc.moduleComplete.message}
            </div>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.gold},${C.red})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(201,146,42,0.4)",marginBottom:10}}>
              {lang==="fr"?"🎯 EXPLORER LES AUTRES MODULES →":lang==="en"?"🎯 EXPLORE OTHER MODULES →":lang==="es"?"🎯 EXPLORAR OTROS MÓDULOS →":"🎯 EXPLORAR OUTROS MÓDULOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
