import { useState, useEffect } from "react";
import { shuffleQuestionOptions } from "./LessonShared";

const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f", blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)", border:"rgba(201,146,42,0.22)",
  green:"#1e8a4a", red:"#c0392b", orange:"#e67e22", teal:"#0a8a6c", purple:"#8e44ad",
};

const T = {
  fr:{ back:"◀ Retour", module:"Sécurité", xp:"XP gagnés", quiz:"QUIZ", question:"Question", ofQ:"sur", correct:"✓ Bonne réponse!", wrong:"✗ Mauvaise réponse", expl:"Explication:", next:"SUIVANT →", finish:"VOIR MON SCORE →", startQuiz:"✅ COMMENCER LE QUIZ", complete:"🏅 LEÇON TERMINÉE!", backDash:"← RETOUR AU DASHBOARD", youLearned:"Tu as appris:", readFirst:"Lis le contenu puis commence le quiz", scorePerf:"Parfait ! 🌟", scoreGreat:"Excellent ! 💪", scoreGood:"Continue ! 📚", showCorr:"Voir la correction", hideCorr:"Masquer" },
  en:{ back:"◀ Back", module:"Safety", xp:"XP earned", quiz:"QUIZ", question:"Question", ofQ:"of", correct:"✓ Correct!", wrong:"✗ Wrong answer", expl:"Explanation:", next:"NEXT →", finish:"SEE MY SCORE →", startQuiz:"✅ START QUIZ", complete:"🏅 LESSON COMPLETE!", backDash:"← BACK TO DASHBOARD", youLearned:"You learned:", readFirst:"Read the content then start the quiz", scorePerf:"Perfect! 🌟", scoreGreat:"Excellent! 💪", scoreGood:"Keep going! 📚", showCorr:"Show correction", hideCorr:"Hide" },
  es:{ back:"◀ Volver", module:"Seguridad", xp:"XP ganados", quiz:"QUIZ", question:"Pregunta", ofQ:"de", correct:"✓ ¡Correcta!", wrong:"✗ Incorrecta", expl:"Explicación:", next:"SIGUIENTE →", finish:"VER PUNTUACIÓN →", startQuiz:"✅ EMPEZAR QUIZ", complete:"🏅 ¡COMPLETADA!", backDash:"← VOLVER AL PANEL", youLearned:"Has aprendido:", readFirst:"Lee y luego comienza", scorePerf:"¡Perfecto! 🌟", scoreGreat:"¡Excelente! 💪", scoreGood:"¡Sigue! 📚", showCorr:"Ver corrección", hideCorr:"Ocultar" },
  pt:{ back:"◀ Voltar", module:"Segurança", xp:"XP ganhos", quiz:"QUIZ", question:"Pergunta", ofQ:"de", correct:"✓ Correto!", wrong:"✗ Errada", expl:"Explicação:", next:"PRÓXIMO →", finish:"VER PONTUAÇÃO →", startQuiz:"✅ COMEÇAR QUIZ", complete:"🏅 CONCLUÍDA!", backDash:"← VOLTAR AO PAINEL", youLearned:"Você aprendeu:", readFirst:"Leia o conteúdo e depois comece", scorePerf:"Perfeito! 🌟", scoreGreat:"Excelente! 💪", scoreGood:"Continue! 📚", showCorr:"Ver correção", hideCorr:"Ocultar" },
};

// SVG 1 — READY / NOT READY
function ReadyNotReadySVG({ lang }) {
  const [checked, setChecked] = useState({});
  const items = [
    { id:"reg", label:{fr:"EPIRB enregistrée et à jour",en:"EPIRB registered and up to date",es:"EPIRB registrado y actualizado",pt:"EPIRB registado e atualizado"} },
    { id:"batt", label:{fr:"Batterie non expirée",en:"Battery not expired",es:"Batería no caducada",pt:"Bateria não expirada"} },
    { id:"hru", label:{fr:"HRU valide",en:"HRU valid",es:"HRU válido",pt:"HRU válido"} },
    { id:"gps", label:{fr:"GPS programmé",en:"GPS programmed",es:"GPS programado",pt:"GPS programado"} },
    { id:"mount", label:{fr:"Montage vérifié",en:"Mounting checked",es:"Montaje verificado",pt:"Montagem verificada"} },
    { id:"test", label:{fr:"Auto-test récent effectué",en:"Recent self-test done",es:"Autoprueba reciente hecha",pt:"Autoteste recente feito"} },
  ];
  const all = items.every(it=>checked[it.id]);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>setChecked(c=>({...c,[it.id]:!c[it.id]}))}
            style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",
              background:checked[it.id]?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",
              border:`1.5px solid ${checked[it.id]?C.green:"rgba(255,255,255,0.1)"}`}}>
            <div style={{width:20,height:20,borderRadius:6,border:`1.5px solid ${checked[it.id]?C.green:C.muted}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:C.green,flexShrink:0}}>{checked[it.id]?"✓":""}</div>
            <div style={{fontSize:11,color:C.white}}>{it.label[lang]||it.label.fr}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"14px",borderRadius:12,textAlign:"center",fontWeight:800,fontFamily:"'Cinzel',serif",fontSize:14,background:all?"rgba(30,138,74,0.2)":"rgba(192,57,43,0.15)",border:`1.5px solid ${all?C.green:C.red}`,color:all?C.green:C.red}}>
        {all?"🟢 READY":"🔴 NOT READY"}
      </div>
    </div>
  );
}

// SVG 2 — INSTALLATION MATTERS
function InstallationSVG({ lang }) {
  const [side, setSide] = useState("bad");
  const d = {
    bad:{fr:"Montée sous un surplomb, entourée de gréement, difficile d'accès en urgence, chemin vers la surface obstrué en cas de gîte ou de retournement.",en:"Mounted under an overhang, surrounded by rigging, hard to reach in an emergency, path to the surface blocked in case of listing or capsize.",es:"Montado bajo un saliente, rodeado de aparejos, difícil de alcanzar en una emergencia, camino a la superficie bloqueado en caso de escora o vuelco.",pt:"Montado sob uma saliência, rodeado de cordame, difícil de alcançar numa emergência, caminho para a superfície bloqueado em caso de adornamento ou capotamento."},
    good:{fr:"Montée en position dégagée, accessible rapidement, chemin libre vers la surface même si le navire gîte ou se retourne complètement.",en:"Mounted in a clear position, quickly accessible, free path to the surface even if the vessel lists or fully capsizes.",es:"Montado en posición despejada, accesible rápidamente, camino libre a la superficie incluso si el buque escora o vuelca por completo.",pt:"Montado em posição desimpedida, acessível rapidamente, caminho livre para a superfície mesmo que o navio adorne ou capote completamente."},
  };
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["bad","good"].map(k=>(
          <button key={k} onClick={()=>setSide(k)} style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${side===k?(k==="bad"?C.red:C.green):"rgba(255,255,255,0.12)"}`,background:side===k?`${k==="bad"?C.red:C.green}22`:"rgba(255,255,255,0.04)",color:side===k?(k==="bad"?C.red:C.green):C.muted,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
            {k==="bad"?"❌":"✅"} {lang==="fr"?(k==="bad"?"MAUVAIS EMPLACEMENT":"BON EMPLACEMENT"):lang==="en"?(k==="bad"?"BAD LOCATION":"GOOD LOCATION"):lang==="es"?(k==="bad"?"MAL LUGAR":"BUEN LUGAR"):(k==="bad"?"MAU LOCAL":"BOM LOCAL")}
          </button>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderRadius:12,background:side==="bad"?"rgba(192,57,43,0.1)":"rgba(30,138,74,0.1)",border:`1px solid ${side==="bad"?C.red:C.green}44`,fontSize:12,color:C.white,lineHeight:1.7}}>{d[side][lang]||d[side].fr}</div>
    </div>
  );
}

// SVG 3 — FALSE ALARM CAUSES
function FalseAlarmSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const causes = [
    { id:"test", icon:"🧪", label:{fr:"Test mal exécuté",en:"Poorly executed test",es:"Prueba mal ejecutada",pt:"Teste mal executado"}, fix:{fr:"Toujours suivre exactement la procédure d'auto-test du fabricant, jamais improviser.",en:"Always follow the manufacturer's self-test procedure exactly, never improvise.",es:"Seguir siempre exactamente el procedimiento de autoprueba del fabricante, nunca improvisar.",pt:"Seguir sempre exatamente o procedimento de autoteste do fabricante, nunca improvisar."} },
    { id:"unplug", icon:"🔌", label:{fr:"Débranchement accidentel",en:"Accidental disconnection",es:"Desconexión accidental",pt:"Desconexão acidental"}, fix:{fr:"Vérifier la fixation du support régulièrement, surtout après des travaux à proximité.",en:"Regularly check the bracket's fixation, especially after nearby work.",es:"Comprobar regularmente la fijación del soporte, especialmente tras trabajos cercanos.",pt:"Verificar regularmente a fixação do suporte, especialmente após trabalhos próximos."} },
    { id:"storm", icon:"🌊", label:{fr:"Choc de vague en mauvais temps",en:"Wave impact in bad weather",es:"Impacto de ola con mal tiempo",pt:"Impacto de onda com mau tempo"}, fix:{fr:"Inspecter l'EPIRB après toute mer forte pour vérifier qu'elle n'a pas été activée par accident.",en:"Inspect the EPIRB after any rough sea to check it wasn't accidentally activated.",es:"Inspeccionar el EPIRB tras cualquier mar fuerte para comprobar que no se activó por accidente.",pt:"Inspecionar o EPIRB após qualquer mar bravo para verificar que não foi ativado por acidente."} },
  ];
  const sel_ = causes.find(c=>c.id===sel);
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {causes.map(c=>(
          <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",background:sel===c.id?"rgba(201,146,42,0.2)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===c.id?C.gold:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18}}>{c.icon}</div>
            <div style={{fontSize:9,fontWeight:700,color:sel===c.id?C.gold2:C.muted,marginTop:3}}>{c.label[lang]||c.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.fix[lang]||sel_.fix.fr}</div>}
    </div>
  );
}

// SVG 4 — VERIFY BEFORE TRUST
function VerifyWheelSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"📡", label:{fr:"Signal émis ?",en:"Signal sent?",es:"¿Señal emitida?",pt:"Sinal emitido?"}, desc:{fr:"Vérifier visuellement l'indicateur d'activation de l'EPIRB.",en:"Visually check the EPIRB's activation indicator.",es:"Comprobar visualmente el indicador de activación del EPIRB.",pt:"Verificar visualmente o indicador de ativação do EPIRB."} },
    { id:2, icon:"📍", label:{fr:"Position transmise ?",en:"Position transmitted?",es:"¿Posición transmitida?",pt:"Posição transmitida?"}, desc:{fr:"Confirmer que le GPS a bien acquis une position avant de considérer l'alerte complète.",en:"Confirm the GPS actually acquired a position before considering the alert complete.",es:"Confirmar que el GPS obtuvo una posición antes de considerar completa la alerta.",pt:"Confirmar que o GPS obteve uma posição antes de considerar o alerta completo."} },
    { id:3, icon:"✅", label:{fr:"Confirmation reçue ?",en:"Confirmation received?",es:"¿Confirmación recibida?",pt:"Confirmação recebida?"}, desc:{fr:"Ne jamais supposer qu'un signal est parti — chercher une confirmation active si possible.",en:"Never assume a signal went out — actively look for confirmation if possible.",es:"Nunca suponer que una señal salió — buscar activamente confirmación si es posible.",pt:"Nunca supor que um sinal saiu — procurar ativamente confirmação se possível."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",background:sel===s.id?"rgba(26,111,212,0.2)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:18}}>{s.icon}</div>
            <div style={{fontSize:9,fontWeight:700,color:sel===s.id?C.blue2:C.muted,marginTop:3}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(26,111,212,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous découvrez, en urgence, que la batterie de l'EPIRB est expirée, le HRU aussi, l'enregistrement date de 3 ans, et le montage semble mal fixé. Quel problème corriger/contourner EN PREMIER ?\na) L'enregistrement, ça peut attendre le retour au port\nb) Activer manuellement tout de suite plutôt que compter sur le HRU expiré\nc) Rien, il est trop tard pour agir"},
      {id:"q2",q:"Pourquoi l'activation manuelle immédiate prime-t-elle ici sur l'attente du largage automatique ?\na) Un HRU expiré n'est pas fiable — ne pas attendre un mécanisme dont la fiabilité est compromise\nb) L'activation manuelle est toujours interdite\nc) Le HRU expiré fonctionne quand même parfaitement"},
      {id:"q3",q:"Une fois l'EPIRB activée manuellement, que faut-il vérifier ensuite ?\na) Rien, l'activation suffit toujours\nb) Attendre 24h avant de vérifier quoi que ce soit\nc) Confirmer si possible que le signal et la position sont bien transmis"},
      {id:"q4",q:"Quelle est la leçon principale de ce scénario multi-défauts ?\na) Un seul défaut suffit à tout compromettre\nb) L'accumulation de plusieurs négligences de préparation peut annuler un bon choix d'équipement fait en L2\nc) La préparation n'a aucun lien avec l'issue finale"},
    ],
    en:[
      {id:"q1",q:"In an emergency you discover the EPIRB battery is expired, the HRU too, registration is 3 years old, and the mounting looks poorly fixed. Which problem to fix/bypass FIRST?\na) Registration, it can wait until back in port\nb) Manually activate right away rather than rely on the expired HRU\nc) Nothing, it's too late to act"},
      {id:"q2",q:"Why does immediate manual activation take priority over waiting for automatic release here?\na) An expired HRU is unreliable — don't wait on a mechanism whose reliability is compromised\nb) Manual activation is always forbidden\nc) The expired HRU still works perfectly"},
      {id:"q3",q:"Once the EPIRB is manually activated, what should be checked next?\na) Nothing, activation is always enough\nb) Wait 24h before checking anything\nc) Confirm if possible that the signal and position are actually transmitted"},
      {id:"q4",q:"What is the main lesson of this multi-fault scenario?\na) A single fault is enough to compromise everything\nb) The accumulation of several preparation neglects can cancel out a good equipment choice made in L2\nc) Preparation has no link to the final outcome"},
    ],
    es:[
      {id:"q1",q:"En una emergencia descubres que la batería del EPIRB está caducada, el HRU también, el registro tiene 3 años, y el montaje parece mal fijado. ¿Qué problema corregir/evitar PRIMERO?\na) El registro, puede esperar al regreso a puerto\nb) Activar manualmente de inmediato en lugar de confiar en el HRU caducado\nc) Nada, ya es tarde para actuar"},
      {id:"q2",q:"¿Por qué la activación manual inmediata prima aquí sobre esperar el largado automático?\na) Un HRU caducado no es fiable — no esperar un mecanismo cuya fiabilidad está comprometida\nb) La activación manual siempre está prohibida\nc) El HRU caducado funciona igualmente perfecto"},
      {id:"q3",q:"Una vez activado manualmente el EPIRB, ¿qué hay que comprobar después?\na) Nada, la activación siempre basta\nb) Esperar 24h antes de comprobar algo\nc) Confirmar si es posible que la señal y la posición se transmiten realmente"},
      {id:"q4",q:"¿Cuál es la lección principal de este escenario multi-fallo?\na) Un solo fallo basta para comprometerlo todo\nb) La acumulación de varias negligencias de preparación puede anular una buena elección de equipo hecha en L2\nc) La preparación no tiene relación con el resultado final"},
    ],
    pt:[
      {id:"q1",q:"Numa emergência descobres que a bateria do EPIRB expirou, o HRU também, o registo tem 3 anos, e a montagem parece mal fixada. Que problema corrigir/contornar PRIMEIRO?\na) O registo, pode esperar até voltar ao porto\nb) Ativar manualmente já, em vez de confiar no HRU expirado\nc) Nada, é tarde demais para agir"},
      {id:"q2",q:"Por que a ativação manual imediata tem prioridade aqui sobre esperar o largamento automático?\na) Um HRU expirado não é fiável — não esperar por um mecanismo cuja fiabilidade está comprometida\nb) A ativação manual está sempre proibida\nc) O HRU expirado funciona na mesma perfeitamente"},
      {id:"q3",q:"Uma vez ativado manualmente o EPIRB, o que deve ser verificado a seguir?\na) Nada, a ativação basta sempre\nb) Esperar 24h antes de verificar seja o que for\nc) Confirmar se possível que o sinal e a posição são realmente transmitidos"},
      {id:"q4",q:"Qual é a lição principal deste cenário multi-falha?\na) Uma só falha basta para comprometer tudo\nb) A acumulação de várias negligências de preparação pode anular uma boa escolha de equipamento feita em L2\nc) A preparação não tem relação com o resultado final"},
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
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ACCIDENT CASE — LADY MARY
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Lady Mary — Large du Delaware (mars 2009)",teaser:"Chalutier à coquilles Saint-Jacques · EPIRB activée mais mal enregistrée · 6 morts sur 7",
      what:"Le Lady Mary coule en quelques minutes suite à une combinaison de conditions préexistantes dangereuses. L'EPIRB s'active correctement — mais elle n'est pas correctement enregistrée et n'est pas liée au GPS, retardant considérablement la localisation par les garde-côtes. L'enquête officielle conclut que le naufrage était un événement \"survivable\" : 22 navires se trouvaient à moins de 6,5 milles nautiques, mais l'équipage n'a jamais réussi à passer un Mayday intelligible ni à tirer une fusée. Seule une partie de l'équipage a pu enfiler une combinaison de survie. Un seul membre d'équipage sur sept survit.",
      cause:"• EPIRB activée mais mal enregistrée, retardant l'identification du navire par les secours\n• Absence de liaison GPS, retardant encore la localisation précise\n• Équipage jamais suffisamment entraîné aux procédures d'urgence et d'abandon\n• Aucun Mayday intelligible ni fusée tirée malgré 22 navires à proximité immédiate",
      lessons:"✓ Une EPIRB qui s'active ne suffit pas si son enregistrement n'a pas été tenu à jour\n✓ Un événement peut rester \"survivable\" longtemps après la panne initiale, si la préparation a été faite\n✓ L'entraînement aux procédures d'urgence compte autant que l'équipement lui-même\n✓ La préparation se fait avant l'urgence — jamais pendant",
      link:"🔗 Distinct de SV Nina (L2, absence totale d'activation) : ici, l'équipement a été activé, mais la préparation en amont (enregistrement, entraînement) a annulé une grande partie de son utilité."},
    en:{title:"Lady Mary — Off the Delaware Coast (March 2009)",teaser:"Scallop trawler · EPIRB activated but poorly registered · 6 of 7 dead",
      what:"The Lady Mary sinks within minutes due to a combination of pre-existing unsafe conditions. The EPIRB activates correctly — but it is poorly registered and not GPS-linked, significantly delaying location by the Coast Guard. The official investigation concludes the sinking was a \"survivable\" event: 22 vessels were within 6.5 nautical miles, but the crew never managed an intelligible Mayday or to fire a flare. Only part of the crew managed to don survival suits. Only one of seven crew members survives.",
      cause:"• EPIRB activated but poorly registered, delaying vessel identification by rescuers\n• No GPS link, further delaying precise location\n• Crew never sufficiently trained in emergency and abandon-ship procedures\n• No intelligible Mayday or flare fired despite 22 vessels in immediate proximity",
      lessons:"✓ An EPIRB that activates isn't enough if its registration wasn't kept up to date\n✓ An event can remain \"survivable\" long after the initial failure, if preparation was done\n✓ Training in emergency procedures matters as much as the equipment itself\n✓ Preparation happens before the emergency — never during",
      link:"🔗 Distinct from SV Nina (L2, total absence of activation): here, the equipment was activated, but upstream preparation (registration, training) cancelled much of its usefulness."},
    es:{title:"Lady Mary — Frente a Delaware (marzo de 2009)",teaser:"Arrastrero de vieiras · EPIRB activado pero mal registrado · 6 de 7 muertos",
      what:"El Lady Mary se hunde en minutos por una combinación de condiciones inseguras preexistentes. El EPIRB se activa correctamente — pero está mal registrado y no está vinculado al GPS, retrasando mucho la localización por la Guardia Costera. La investigación oficial concluye que el hundimiento fue un evento \"sobrevivible\": 22 buques estaban a menos de 6,5 millas náuticas, pero la tripulación nunca logró un Mayday inteligible ni disparar una bengala. Solo parte de la tripulación logró ponerse trajes de supervivencia. Solo uno de siete tripulantes sobrevive.",
      cause:"• EPIRB activado pero mal registrado, retrasando la identificación del buque por los rescatistas\n• Sin enlace GPS, retrasando aún más la localización precisa\n• Tripulación nunca suficientemente entrenada en procedimientos de emergencia y abandono\n• Ningún Mayday inteligible ni bengala disparada pese a 22 buques en proximidad inmediata",
      lessons:"✓ Un EPIRB que se activa no basta si su registro no se mantuvo actualizado\n✓ Un evento puede seguir siendo \"sobrevivible\" mucho después del fallo inicial, si se hizo la preparación\n✓ El entrenamiento en procedimientos de emergencia importa tanto como el equipo\n✓ La preparación se hace antes de la emergencia — nunca durante",
      link:"🔗 Distinto de SV Nina (L2, ausencia total de activación): aquí el equipo se activó, pero la preparación previa (registro, entrenamiento) anuló gran parte de su utilidad."},
    pt:{title:"Lady Mary — Ao Largo do Delaware (março de 2009)",teaser:"Arrastão de vieiras · EPIRB ativado mas mal registado · 6 de 7 mortos",
      what:"O Lady Mary afunda-se em minutos devido a uma combinação de condições inseguras pré-existentes. O EPIRB ativa-se corretamente — mas está mal registado e não ligado ao GPS, atrasando muito a localização pela Guarda Costeira. A investigação oficial conclui que o naufrágio foi um evento \"sobrevivível\": 22 navios estavam a menos de 6,5 milhas náuticas, mas a tripulação nunca conseguiu um Mayday inteligível nem disparar um foguete. Só parte da tripulação conseguiu vestir fatos de sobrevivência. Só um de sete tripulantes sobrevive.",
      cause:"• EPIRB ativado mas mal registado, atrasando a identificação do navio pelos socorristas\n• Sem ligação GPS, atrasando ainda mais a localização precisa\n• Tripulação nunca suficientemente treinada em procedimentos de emergência e abandono\n• Nenhum Mayday inteligível nem foguete disparado apesar de 22 navios em proximidade imediata",
      lessons:"✓ Um EPIRB que se ativa não basta se o seu registo não foi mantido atualizado\n✓ Um evento pode continuar \"sobrevivível\" muito depois da falha inicial, se a preparação foi feita\n✓ O treino em procedimentos de emergência conta tanto quanto o equipamento\n✓ A preparação faz-se antes da emergência — nunca durante",
      link:"🔗 Distinto do SV Nina (L2, ausência total de ativação): aqui o equipamento foi ativado, mas a preparação a montante (registo, treino) anulou grande parte da sua utilidade."},
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

// BANK — 15 QUESTIONS (scenario-only)
const BANK = {
  fr:[
    {q:"Vous découvrez qu'une EPIRB n'a plus été inspectée depuis trois ans. Quelle est la priorité ?",opts:["Ignorer, elle a probablement encore fonctionné pendant ces 3 ans","La faire inspecter et tester avant tout départ, ne pas attendre une urgence pour le découvrir","Attendre la prochaine visite réglementaire","Remplacer uniquement si elle tombe en panne"],correct:1,expl:"Une inspection régulière doit précéder l'urgence — découvrir un défaut pendant une détresse réelle est déjà trop tard."},
    {q:"Le HRU de l'EPIRB a expiré il y a 6 mois. Que faire ?",opts:["Rien, un HRU expiré fonctionne quand même normalement","Le remplacer avant le prochain départ — sa fiabilité n'est plus garantie","Attendre qu'il soit très en retard pour le remplacer","Le laisser, ce n'est pas important"],correct:1,expl:"Un HRU expiré ne doit jamais être considéré comme fiable — il doit être remplacé avant de reprendre la mer."},
    {q:"Vous constatez que l'EPIRB est montée sous un surplomb, entourée de gréement. Quel est le risque ?",opts:["Aucun, l'emplacement n'a pas d'importance","Le chemin vers la surface peut être obstrué en cas de gîte ou de retournement","Cela améliore la portée du signal","Cela protège mieux l'EPIRB de la pluie"],correct:1,expl:"Un mauvais emplacement peut empêcher l'EPIRB de flotter librement vers la surface, surtout en cas de retournement."},
    {q:"Un test d'EPIRB a déclenché une fausse alerte. Quelle en est une cause fréquente ?",opts:["Le test a toujours été correctement exécuté","Un test mal exécuté qui n'a pas suivi exactement la procédure du fabricant","Les fausses alertes n'ont jamais de cause identifiable","L'EPIRB était neuve"],correct:1,expl:"La majorité des fausses alertes lors de tests viennent d'une procédure non suivie exactement selon les instructions du fabricant."},
    {q:"Après une mer très forte, que faut-il vérifier sur l'EPIRB ?",opts:["Rien, la mer forte n'affecte jamais l'EPIRB","Qu'elle n'a pas été activée par accident lors des chocs de vagues","Uniquement la couleur du boîtier","Le prix de l'unité"],correct:1,expl:"Les chocs de vagues en mauvais temps peuvent déclencher une activation accidentelle qu'il faut vérifier ensuite."},
    {q:"Vous devez activer une EPIRB en urgence mais le HRU est expiré depuis 6 mois. Quelle est la bonne décision ?",opts:["Attendre le largage automatique malgré tout","L'activer manuellement immédiatement sans compter sur le HRU","Ne rien faire, un HRU expiré rend l'EPIRB totalement inutilisable","Attendre l'avis du capitaine avant tout"],correct:1,expl:"Face à un HRU dont la fiabilité est compromise, l'activation manuelle immédiate est la décision la plus sûre."},
    {q:"Une fois une EPIRB activée, pourquoi ne faut-il pas simplement 'faire confiance' sans vérifier ?",opts:["Parce qu'il faut toujours vérifier activement si possible que le signal et la position sont bien transmis","Parce que l'EPIRB ne fonctionne jamais du premier coup","Parce que la vérification n'a aucune utilité","Parce que cela ralentit inutilement la procédure"],correct:0,expl:"Ne jamais supposer qu'un signal est parti sans vérification active — c'est un réflexe de sécurité essentiel."},
    {q:"Que signifie 'Prepared Before the Emergency' dans cette leçon ?",opts:["Il faut se préparer uniquement pendant l'urgence","Toute la préparation (enregistrement, batterie, HRU, GPS) doit être faite bien avant qu'une détresse ne survienne","La préparation n'a aucune importance","Seul l'équipement neuf nécessite une préparation"],correct:1,expl:"Le concept central de L3 : une urgence n'est jamais le moment de préparer son équipement, la préparation doit être antérieure."},
    {q:"Dans le cas Lady Mary, pourquoi l'EPIRB activée n'a-t-elle pas suffi à sauver l'équipage ?",opts:["Elle n'a jamais été activée","Elle était mal enregistrée et non liée au GPS, retardant gravement la localisation","Elle a explosé en mer","Le navire était trop loin des côtes"],correct:1,expl:"Un mauvais enregistrement et l'absence de liaison GPS ont retardé l'identification et la localisation malgré une activation réussie."},
    {q:"Pourquoi l'enquête sur Lady Mary qualifie-t-elle le naufrage d'événement 'survivable' ?",opts:["Parce qu'il n'y avait aucun navire à proximité","Parce que 22 navires étaient à moins de 6,5 milles nautiques, mais la préparation et l'entraînement ont manqué","Parce que l'équipage était mal payé","Parce que le navire était très ancien"],correct:1,expl:"La proximité de nombreux navires rendait un sauvetage rapide possible — mais le manque de préparation a empêché de saisir cette chance."},
    {q:"Quelle est la différence principale entre le cas SV Nina (L2) et Lady Mary (L3) ?",opts:["Il n'y a aucune différence","Nina illustre l'absence totale d'activation ; Lady Mary illustre une activation réussie mais annulée par un manque de préparation en amont","Les deux cas sont identiques en tout point","Lady Mary concerne uniquement la théorie GMDSS"],correct:1,expl:"L2 traite du choix/mode d'activation ; L3 traite de la préparation en amont qui peut annuler même une bonne activation."},
    {q:"Quel est l'objectif principal de la section 'Maintenance Saves Lives' ?",opts:["Réexpliquer le fonctionnement technique complet de l'EPIRB","Montrer que batterie expirée, HRU expiré ou antenne cassée peuvent réduire à néant un équipement pourtant bien choisi","Étudier les zones GMDSS A1-A4","Comparer les prix des équipements"],correct:1,expl:"La maintenance régulière est ce qui garantit que l'équipement bien choisi reste réellement fonctionnel le jour où il est nécessaire."},
    {q:"Vous avez plusieurs défauts à la fois (batterie expirée, HRU expiré, mauvais montage). Quelle est la priorité de raisonnement ?",opts:["Traiter tous les défauts en même temps sans ordre","Identifier lequel compromet le plus directement une activation efficace immédiate, et agir sur celui-là en premier","Ignorer tous les défauts","Attendre le retour au port pour tout régler"],correct:1,expl:"Face à plusieurs négligences cumulées, il faut prioriser celle qui menace le plus directement une activation efficace immédiate."},
    {q:"Quel est l'objectif principal de la leçon L3 dans le Safety Department ?",opts:["Réexpliquer la théorie complète du GMDSS","Apprendre à préparer et entretenir l'équipement de détresse avant l'urgence, pour que le bon choix (L2) ne soit pas annulé","Étudier l'abandon du navire","Comparer les fabricants d'EPIRB"],correct:1,expl:"L3 se concentre uniquement sur la préparation et la maintenance en amont, sans réexpliquer la théorie déjà couverte à Deck."},
    {q:"Pourquoi cette leçon ne développe-t-elle pas les procédures d'abandon du navire ?",opts:["Parce que ce sujet appartient exclusivement au futur module s5","Parce que ce n'est jamais utile","Parce que ça a déjà été vu en L1","Parce que le format ne le permet pas"],correct:0,expl:"Conformément à la règle d'architecture MAP, l'abandon du navire reste le domaine exclusif du futur module s5."},
  ],
  en:[
    {q:"You discover an EPIRB hasn't been inspected in three years. What is the priority?",opts:["Ignore it, it probably still worked during those 3 years","Have it inspected and tested before any departure, don't wait for an emergency to discover it","Wait for the next regulatory visit","Only replace it if it fails"],correct:1,expl:"Regular inspection must precede the emergency — discovering a fault during a real distress is already too late."},
    {q:"The EPIRB's HRU expired 6 months ago. What do you do?",opts:["Nothing, an expired HRU still works normally","Replace it before the next departure — its reliability is no longer guaranteed","Wait until it's very overdue to replace it","Leave it, it's not important"],correct:1,expl:"An expired HRU should never be considered reliable — it must be replaced before going back to sea."},
    {q:"You notice the EPIRB is mounted under an overhang, surrounded by rigging. What is the risk?",opts:["None, location doesn't matter","The path to the surface may be obstructed in case of listing or capsize","It improves the signal range","It better protects the EPIRB from rain"],correct:1,expl:"A poor location can prevent the EPIRB from floating freely to the surface, especially during a capsize."},
    {q:"An EPIRB test triggered a false alarm. What is a frequent cause?",opts:["The test was always correctly executed","A poorly executed test that didn't exactly follow the manufacturer's procedure","False alarms never have an identifiable cause","The EPIRB was new"],correct:1,expl:"Most false alarms during testing come from a procedure not followed exactly per manufacturer instructions."},
    {q:"After very rough seas, what should be checked on the EPIRB?",opts:["Nothing, rough seas never affect the EPIRB","That it wasn't accidentally activated by wave impacts","Only the color of the casing","The price of the unit"],correct:1,expl:"Wave impacts in bad weather can trigger accidental activation that must be checked afterward."},
    {q:"You must activate an EPIRB urgently but the HRU has been expired for 6 months. What is the correct decision?",opts:["Wait for automatic release regardless","Manually activate it immediately without relying on the HRU","Do nothing, an expired HRU makes the EPIRB totally unusable","Wait for the Captain's opinion first"],correct:1,expl:"Facing an HRU with compromised reliability, immediate manual activation is the safest decision."},
    {q:"Once an EPIRB is activated, why shouldn't you simply 'trust it' without verifying?",opts:["Because you must always actively verify, if possible, that the signal and position are actually transmitted","Because the EPIRB never works on the first try","Because verification is never useful","Because it unnecessarily slows down the procedure"],correct:0,expl:"Never assume a signal went out without active verification — this is an essential safety reflex."},
    {q:"What does 'Prepared Before the Emergency' mean in this lesson?",opts:["You should only prepare during the emergency","All preparation (registration, battery, HRU, GPS) must be done well before distress occurs","Preparation has no importance","Only new equipment needs preparation"],correct:1,expl:"L3's central concept: an emergency is never the time to prepare equipment, preparation must come beforehand."},
    {q:"In the Lady Mary case, why wasn't the activated EPIRB enough to save the crew?",opts:["It was never activated","It was poorly registered and not GPS-linked, gravely delaying location","It exploded at sea","The vessel was too far from shore"],correct:1,expl:"Poor registration and lack of GPS link delayed identification and location despite successful activation."},
    {q:"Why does the Lady Mary investigation describe the sinking as a 'survivable' event?",opts:["Because there were no vessels nearby","Because 22 vessels were within 6.5 nautical miles, but preparation and training were lacking","Because the crew was underpaid","Because the vessel was very old"],correct:1,expl:"The proximity of many vessels made rapid rescue possible — but lack of preparation prevented seizing that chance."},
    {q:"What is the main difference between the SV Nina case (L2) and Lady Mary (L3)?",opts:["There is no difference","Nina illustrates total absence of activation; Lady Mary illustrates successful activation cancelled by lack of upstream preparation","Both cases are identical in every way","Lady Mary only concerns GMDSS theory"],correct:1,expl:"L2 deals with choice/activation mode; L3 deals with upstream preparation that can cancel out even a good activation."},
    {q:"What is the main goal of the 'Maintenance Saves Lives' section?",opts:["Re-explain the full technical operation of the EPIRB","Show that an expired battery, expired HRU or broken antenna can nullify otherwise well-chosen equipment","Study GMDSS A1-A4 zones","Compare equipment prices"],correct:1,expl:"Regular maintenance is what guarantees well-chosen equipment stays actually functional the day it's needed."},
    {q:"You have several faults at once (expired battery, expired HRU, poor mounting). What is the reasoning priority?",opts:["Address all faults at once with no order","Identify which most directly compromises an immediate effective activation, and act on that first","Ignore all faults","Wait until back in port to fix everything"],correct:1,expl:"Facing several accumulated neglects, prioritize whichever most directly threatens an immediate effective activation."},
    {q:"What is the main goal of lesson L3 in the Safety Department?",opts:["Re-explain the full GMDSS theory","Learn to prepare and maintain distress equipment before the emergency, so the right choice (L2) isn't cancelled out","Study abandoning ship","Compare EPIRB manufacturers"],correct:1,expl:"L3 focuses solely on upstream preparation and maintenance, without re-explaining theory already covered at Deck."},
    {q:"Why doesn't this lesson develop abandon-ship procedures?",opts:["Because that topic exclusively belongs to the future s5 module","Because it's never useful","Because it was already covered in L1","Because the format doesn't allow it"],correct:0,expl:"Per MAP's architecture rule, abandoning ship remains the exclusive domain of the future s5 module."},
  ],
  es:[
    {q:"Descubres que un EPIRB no ha sido inspeccionado en tres años. ¿Cuál es la prioridad?",opts:["Ignorarlo, probablemente funcionó durante esos 3 años","Hacerlo inspeccionar y probar antes de cualquier salida, no esperar a una emergencia para descubrirlo","Esperar a la próxima visita reglamentaria","Reemplazarlo solo si falla"],correct:1,expl:"La inspección regular debe preceder a la emergencia — descubrir un fallo durante una emergencia real ya es demasiado tarde."},
    {q:"El HRU del EPIRB caducó hace 6 meses. ¿Qué hacer?",opts:["Nada, un HRU caducado sigue funcionando con normalidad","Reemplazarlo antes de la próxima salida — su fiabilidad ya no está garantizada","Esperar a que esté muy atrasado para reemplazarlo","Dejarlo, no es importante"],correct:1,expl:"Un HRU caducado nunca debe considerarse fiable — debe reemplazarse antes de volver al mar."},
    {q:"Notas que el EPIRB está montado bajo un saliente, rodeado de aparejos. ¿Cuál es el riesgo?",opts:["Ninguno, el lugar no importa","El camino hacia la superficie puede quedar obstruido en caso de escora o vuelco","Mejora el alcance de la señal","Protege mejor el EPIRB de la lluvia"],correct:1,expl:"Un mal emplazamiento puede impedir que el EPIRB flote libremente hacia la superficie, sobre todo en un vuelco."},
    {q:"Una prueba de EPIRB provocó una falsa alarma. ¿Cuál es una causa frecuente?",opts:["La prueba siempre se ejecutó correctamente","Una prueba mal ejecutada que no siguió exactamente el procedimiento del fabricante","Las falsas alarmas nunca tienen una causa identificable","El EPIRB era nuevo"],correct:1,expl:"La mayoría de falsas alarmas en pruebas provienen de un procedimiento no seguido exactamente según el fabricante."},
    {q:"Tras un mar muy fuerte, ¿qué hay que comprobar en el EPIRB?",opts:["Nada, el mar fuerte nunca afecta al EPIRB","Que no se haya activado accidentalmente por los golpes de las olas","Solo el color de la carcasa","El precio de la unidad"],correct:1,expl:"Los golpes de olas en mal tiempo pueden provocar una activación accidental que hay que comprobar después."},
    {q:"Debes activar un EPIRB con urgencia pero el HRU lleva 6 meses caducado. ¿Cuál es la decisión correcta?",opts:["Esperar el largado automático de todos modos","Activarlo manualmente de inmediato sin confiar en el HRU","No hacer nada, un HRU caducado inutiliza totalmente el EPIRB","Esperar la opinión del Capitán primero"],correct:1,expl:"Ante un HRU con fiabilidad comprometida, la activación manual inmediata es la decisión más segura."},
    {q:"Una vez activado un EPIRB, ¿por qué no basta simplemente 'confiar' sin verificar?",opts:["Porque siempre hay que verificar activamente, si es posible, que la señal y la posición se transmiten realmente","Porque el EPIRB nunca funciona a la primera","Porque la verificación nunca es útil","Porque ralentiza innecesariamente el procedimiento"],correct:0,expl:"Nunca suponer que una señal salió sin verificación activa — es un reflejo de seguridad esencial."},
    {q:"¿Qué significa 'Prepared Before the Emergency' en esta lección?",opts:["Solo hay que prepararse durante la emergencia","Toda la preparación (registro, batería, HRU, GPS) debe hacerse mucho antes de que ocurra una emergencia","La preparación no tiene importancia","Solo el equipo nuevo necesita preparación"],correct:1,expl:"Concepto central de L3: una emergencia nunca es el momento de preparar el equipo, la preparación debe ser previa."},
    {q:"En el caso Lady Mary, ¿por qué el EPIRB activado no bastó para salvar a la tripulación?",opts:["Nunca se activó","Estaba mal registrado y no vinculado al GPS, retrasando gravemente la localización","Explotó en el mar","El buque estaba demasiado lejos de la costa"],correct:1,expl:"Un mal registro y la falta de enlace GPS retrasaron la identificación y localización pese a una activación exitosa."},
    {q:"¿Por qué la investigación de Lady Mary califica el hundimiento de evento 'sobrevivible'?",opts:["Porque no había buques cerca","Porque 22 buques estaban a menos de 6,5 millas náuticas, pero faltó preparación y entrenamiento","Porque la tripulación estaba mal pagada","Porque el buque era muy antiguo"],correct:1,expl:"La cercanía de muchos buques hacía posible un rescate rápido — pero la falta de preparación impidió aprovechar esa oportunidad."},
    {q:"¿Cuál es la principal diferencia entre el caso SV Nina (L2) y Lady Mary (L3)?",opts:["No hay diferencia","Nina ilustra ausencia total de activación; Lady Mary ilustra una activación exitosa anulada por falta de preparación previa","Ambos casos son idénticos en todo","Lady Mary solo concierne a la teoría GMDSS"],correct:1,expl:"L2 trata de la elección/modo de activación; L3 trata de la preparación previa que puede anular incluso una buena activación."},
    {q:"¿Cuál es el objetivo principal de la sección 'Maintenance Saves Lives'?",opts:["Reexplicar el funcionamiento técnico completo del EPIRB","Mostrar que una batería caducada, un HRU caducado o una antena rota pueden anular un equipo por lo demás bien elegido","Estudiar las zonas GMDSS A1-A4","Comparar precios de equipos"],correct:1,expl:"El mantenimiento regular es lo que garantiza que un equipo bien elegido siga siendo realmente funcional el día que se necesite."},
    {q:"Tienes varios fallos a la vez (batería caducada, HRU caducado, mal montaje). ¿Cuál es la prioridad de razonamiento?",opts:["Abordar todos los fallos a la vez sin orden","Identificar cuál compromete más directamente una activación eficaz inmediata, y actuar sobre ese primero","Ignorar todos los fallos","Esperar al regreso a puerto para arreglarlo todo"],correct:1,expl:"Ante varias negligencias acumuladas, hay que priorizar la que amenace más directamente una activación eficaz inmediata."},
    {q:"¿Cuál es el objetivo principal de la lección L3 en el Safety Department?",opts:["Reexplicar toda la teoría del GMDSS","Aprender a preparar y mantener el equipo de socorro antes de la emergencia, para que la buena elección (L2) no se anule","Estudiar el abandono del buque","Comparar fabricantes de EPIRB"],correct:1,expl:"L3 se centra únicamente en la preparación y el mantenimiento previos, sin reexplicar la teoría ya cubierta en Deck."},
    {q:"¿Por qué esta lección no desarrolla los procedimientos de abandono del buque?",opts:["Porque ese tema pertenece exclusivamente al futuro módulo s5","Porque nunca es útil","Porque ya se vio en L1","Porque el formato no lo permite"],correct:0,expl:"Según la regla de arquitectura de MAP, abandonar el buque sigue siendo dominio exclusivo del futuro módulo s5."},
  ],
  pt:[
    {q:"Descobres que um EPIRB não é inspecionado há três anos. Qual é a prioridade?",opts:["Ignorar, provavelmente funcionou durante esses 3 anos","Mandá-lo inspecionar e testar antes de qualquer partida, não esperar por uma emergência para o descobrir","Esperar pela próxima visita regulamentar","Substituir só se falhar"],correct:1,expl:"A inspeção regular deve preceder a emergência — descobrir uma falha durante uma emergência real já é tarde demais."},
    {q:"O HRU do EPIRB expirou há 6 meses. O que fazer?",opts:["Nada, um HRU expirado continua a funcionar normalmente","Substituí-lo antes da próxima partida — a sua fiabilidade já não está garantida","Esperar que esteja muito atrasado para o substituir","Deixá-lo, não é importante"],correct:1,expl:"Um HRU expirado nunca deve ser considerado fiável — deve ser substituído antes de voltar ao mar."},
    {q:"Reparas que o EPIRB está montado sob uma saliência, rodeado de cordame. Qual é o risco?",opts:["Nenhum, o local não importa","O caminho para a superfície pode ficar obstruído em caso de adornamento ou capotamento","Melhora o alcance do sinal","Protege melhor o EPIRB da chuva"],correct:1,expl:"Um mau local pode impedir que o EPIRB flutue livremente para a superfície, sobretudo num capotamento."},
    {q:"Um teste de EPIRB provocou um falso alarme. Qual é uma causa frequente?",opts:["O teste foi sempre executado corretamente","Um teste mal executado que não seguiu exatamente o procedimento do fabricante","Os falsos alarmes nunca têm causa identificável","O EPIRB era novo"],correct:1,expl:"A maioria dos falsos alarmes em testes vem de um procedimento não seguido exatamente conforme o fabricante."},
    {q:"Após um mar muito bravo, o que se deve verificar no EPIRB?",opts:["Nada, o mar bravo nunca afeta o EPIRB","Que não foi ativado acidentalmente pelos impactos das ondas","Só a cor da caixa","O preço da unidade"],correct:1,expl:"Os impactos de ondas com mau tempo podem provocar uma ativação acidental que deve ser verificada depois."},
    {q:"Tens de ativar um EPIRB com urgência mas o HRU está expirado há 6 meses. Qual é a decisão correta?",opts:["Esperar pelo largamento automático mesmo assim","Ativá-lo manualmente de imediato sem confiar no HRU","Não fazer nada, um HRU expirado torna o EPIRB totalmente inutilizável","Esperar primeiro pela opinião do Comandante"],correct:1,expl:"Perante um HRU com fiabilidade comprometida, a ativação manual imediata é a decisão mais segura."},
    {q:"Uma vez ativado um EPIRB, por que não basta simplesmente 'confiar' sem verificar?",opts:["Porque é preciso sempre verificar ativamente, se possível, que o sinal e a posição são realmente transmitidos","Porque o EPIRB nunca funciona à primeira","Porque a verificação nunca é útil","Porque atrasa desnecessariamente o procedimento"],correct:0,expl:"Nunca supor que um sinal saiu sem verificação ativa — é um reflexo de segurança essencial."},
    {q:"O que significa 'Prepared Before the Emergency' nesta lição?",opts:["Só se deve preparar durante a emergência","Toda a preparação (registo, bateria, HRU, GPS) deve ser feita bem antes de ocorrer uma emergência","A preparação não tem importância","Só o equipamento novo precisa de preparação"],correct:1,expl:"Conceito central de L3: uma emergência nunca é o momento de preparar o equipamento, a preparação deve ser prévia."},
    {q:"No caso Lady Mary, por que o EPIRB ativado não bastou para salvar a tripulação?",opts:["Nunca foi ativado","Estava mal registado e não ligado ao GPS, atrasando gravemente a localização","Explodiu no mar","O navio estava longe demais da costa"],correct:1,expl:"Um mau registo e a falta de ligação GPS atrasaram a identificação e localização apesar de uma ativação bem-sucedida."},
    {q:"Por que a investigação do Lady Mary classifica o naufrágio como um evento 'sobrevivível'?",opts:["Porque não havia navios próximos","Porque 22 navios estavam a menos de 6,5 milhas náuticas, mas faltou preparação e treino","Porque a tripulação era mal paga","Porque o navio era muito antigo"],correct:1,expl:"A proximidade de muitos navios tornava possível um resgate rápido — mas a falta de preparação impediu aproveitar essa oportunidade."},
    {q:"Qual é a principal diferença entre o caso SV Nina (L2) e Lady Mary (L3)?",opts:["Não há diferença","Nina ilustra ausência total de ativação; Lady Mary ilustra uma ativação bem-sucedida anulada pela falta de preparação prévia","Ambos os casos são idênticos em tudo","Lady Mary só diz respeito à teoria GMDSS"],correct:1,expl:"L2 trata da escolha/modo de ativação; L3 trata da preparação prévia que pode anular mesmo uma boa ativação."},
    {q:"Qual é o objetivo principal da secção 'Maintenance Saves Lives'?",opts:["Reexplicar o funcionamento técnico completo do EPIRB","Mostrar que uma bateria expirada, um HRU expirado ou uma antena partida podem anular um equipamento por outro lado bem escolhido","Estudar as zonas GMDSS A1-A4","Comparar preços de equipamentos"],correct:1,expl:"A manutenção regular é o que garante que um equipamento bem escolhido continua realmente funcional no dia em que é necessário."},
    {q:"Tens várias falhas ao mesmo tempo (bateria expirada, HRU expirado, mau montagem). Qual é a prioridade de raciocínio?",opts:["Tratar todas as falhas ao mesmo tempo sem ordem","Identificar qual compromete mais diretamente uma ativação eficaz imediata, e agir nessa primeiro","Ignorar todas as falhas","Esperar pelo regresso ao porto para resolver tudo"],correct:1,expl:"Perante várias negligências acumuladas, deve priorizar-se a que ameaça mais diretamente uma ativação eficaz imediata."},
    {q:"Qual é o objetivo principal da lição L3 no Safety Department?",opts:["Reexplicar toda a teoria do GMDSS","Aprender a preparar e manter o equipamento de socorro antes da emergência, para que a boa escolha (L2) não seja anulada","Estudar o abandono do navio","Comparar fabricantes de EPIRB"],correct:1,expl:"L3 foca-se unicamente na preparação e manutenção prévias, sem reexplicar a teoria já coberta no Deck."},
    {q:"Por que esta lição não desenvolve os procedimentos de abandono do navio?",opts:["Porque esse tema pertence exclusivamente ao futuro módulo s5","Porque nunca é útil","Porque já foi visto em L1","Porque o formato não o permite"],correct:0,expl:"Segundo a regra de arquitetura da MAP, abandonar o navio continua a ser domínio exclusivo do futuro módulo s5."},
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

// QUIZ — FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Une EPIRB n'a pas été inspectée depuis 3 ans. Quelle est la priorité ?",opts:["Ignorer","La faire inspecter avant tout départ","Attendre une panne","Rien"],correct:1,expl:"La préparation doit précéder l'urgence, jamais l'inverse."},
    {q:"Le HRU est expiré. Quelle est la bonne décision en urgence ?",opts:["Attendre le largage automatique","Activer manuellement immédiatement","Ne rien faire","Attendre le capitaine"],correct:1,expl:"Un HRU expiré n'est pas fiable — l'activation manuelle immédiate est la décision la plus sûre."},
    {q:"Pourquoi vérifier après activation que le signal est bien transmis ?",opts:["Ce n'est jamais nécessaire","Ne jamais supposer qu'un signal est parti sans vérification active","Cela ralentit inutilement","Uniquement si on a le temps"],correct:1,expl:"La vérification active reste un réflexe de sécurité essentiel après toute activation."},
    {q:"Dans le cas Lady Mary, pourquoi l'EPIRB activée n'a-t-elle pas suffi ?",opts:["Elle n'a jamais été activée","Mauvais enregistrement et absence de liaison GPS ont retardé la localisation","Le navire était trop loin","Aucune raison identifiée"],correct:1,expl:"Une activation réussie ne suffit pas si la préparation en amont (enregistrement, GPS) est absente."},
    {q:"Que signifie 'Prepared Before the Emergency' ?",opts:["Se préparer pendant l'urgence","Toute la préparation doit être faite bien avant la détresse","La préparation n'a pas d'importance","Seul l'équipement neuf compte"],correct:1,expl:"Concept central de L3 : la préparation précède toujours l'urgence, jamais l'inverse."},
  ],
  en:[
    {q:"An EPIRB hasn't been inspected in 3 years. What is the priority?",opts:["Ignore it","Have it inspected before any departure","Wait for a failure","Nothing"],correct:1,expl:"Preparation must precede the emergency, never the other way around."},
    {q:"The HRU is expired. What is the correct decision in an emergency?",opts:["Wait for automatic release","Manually activate immediately","Do nothing","Wait for the Captain"],correct:1,expl:"An expired HRU is unreliable — immediate manual activation is the safest decision."},
    {q:"Why check after activation that the signal is actually transmitted?",opts:["It's never necessary","Never assume a signal went out without active verification","It slows things down unnecessarily","Only if there's time"],correct:1,expl:"Active verification remains an essential safety reflex after any activation."},
    {q:"In the Lady Mary case, why wasn't the activated EPIRB enough?",opts:["It was never activated","Poor registration and lack of GPS link delayed location","The vessel was too far away","No identified reason"],correct:1,expl:"A successful activation isn't enough if upstream preparation (registration, GPS) is missing."},
    {q:"What does 'Prepared Before the Emergency' mean?",opts:["Prepare during the emergency","All preparation must be done well before distress occurs","Preparation doesn't matter","Only new equipment matters"],correct:1,expl:"L3's central concept: preparation always precedes the emergency, never the other way around."},
  ],
  es:[
    {q:"Un EPIRB no ha sido inspeccionado en 3 años. ¿Cuál es la prioridad?",opts:["Ignorarlo","Hacerlo inspeccionar antes de cualquier salida","Esperar un fallo","Nada"],correct:1,expl:"La preparación debe preceder a la emergencia, nunca al revés."},
    {q:"El HRU está caducado. ¿Cuál es la decisión correcta en una emergencia?",opts:["Esperar el largado automático","Activar manualmente de inmediato","No hacer nada","Esperar al Capitán"],correct:1,expl:"Un HRU caducado no es fiable — la activación manual inmediata es la decisión más segura."},
    {q:"¿Por qué comprobar tras la activación que la señal se transmite realmente?",opts:["Nunca es necesario","Nunca suponer que una señal salió sin verificación activa","Ralentiza innecesariamente","Solo si hay tiempo"],correct:1,expl:"La verificación activa sigue siendo un reflejo de seguridad esencial tras cualquier activación."},
    {q:"En el caso Lady Mary, ¿por qué no bastó el EPIRB activado?",opts:["Nunca se activó","Mal registro y falta de enlace GPS retrasaron la localización","El buque estaba demasiado lejos","Ninguna razón identificada"],correct:1,expl:"Una activación exitosa no basta si falta la preparación previa (registro, GPS)."},
    {q:"¿Qué significa 'Prepared Before the Emergency'?",opts:["Prepararse durante la emergencia","Toda la preparación debe hacerse mucho antes de la emergencia","La preparación no importa","Solo importa el equipo nuevo"],correct:1,expl:"Concepto central de L3: la preparación siempre precede a la emergencia, nunca al revés."},
  ],
  pt:[
    {q:"Um EPIRB não é inspecionado há 3 anos. Qual é a prioridade?",opts:["Ignorar","Mandá-lo inspecionar antes de qualquer partida","Esperar por uma falha","Nada"],correct:1,expl:"A preparação deve preceder a emergência, nunca o contrário."},
    {q:"O HRU está expirado. Qual é a decisão correta numa emergência?",opts:["Esperar pelo largamento automático","Ativar manualmente de imediato","Não fazer nada","Esperar pelo Comandante"],correct:1,expl:"Um HRU expirado não é fiável — a ativação manual imediata é a decisão mais segura."},
    {q:"Por que verificar depois da ativação que o sinal é realmente transmitido?",opts:["Nunca é necessário","Nunca supor que um sinal saiu sem verificação ativa","Atrasa desnecessariamente","Só se houver tempo"],correct:1,expl:"A verificação ativa continua a ser um reflexo de segurança essencial após qualquer ativação."},
    {q:"No caso Lady Mary, por que o EPIRB ativado não bastou?",opts:["Nunca foi ativado","Mau registo e falta de ligação GPS atrasaram a localização","O navio estava longe demais","Nenhuma razão identificada"],correct:1,expl:"Uma ativação bem-sucedida não basta se faltar a preparação prévia (registo, GPS)."},
    {q:"O que significa 'Prepared Before the Emergency'?",opts:["Preparar-se durante a emergência","Toda a preparação deve ser feita bem antes da emergência","A preparação não importa","Só importa o equipamento novo"],correct:1,expl:"Conceito central de L3: a preparação precede sempre a emergência, nunca o contrário."},
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

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si ton navire prenait la mer ce soir, ferais-tu personnellement confiance à chaque équipement de détresse à bord sans le vérifier d'abord ? Pourquoi ?",
    en:"If your vessel sailed tonight, would you personally trust every distress device on board without checking it first? Why?",
    es:"Si tu buque zarpara esta noche, ¿confiarías personalmente en cada equipo de socorro a bordo sin comprobarlo antes? ¿Por qué?",
    pt:"Se o teu navio partisse esta noite, confiarias pessoalmente em cada equipamento de socorro a bordo sem o verificar antes? Porquê?",
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

// SHARED UI
function Stars(){const s=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,sz:Math.random()>0.7?2:1.5,dur:2+Math.random()*4,delay:Math.random()*6}));return(<><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{s.map((st,i)=><div key={i} style={{position:"absolute",left:`${st.x}%`,top:`${st.y}%`,width:st.sz,height:st.sz,borderRadius:"50%",background:"white",opacity:0,animation:`tw ${st.dur}s ease-in-out ${st.delay}s infinite`}}/>)}</div><style>{`@keyframes tw{0%,100%{opacity:0}50%{opacity:0.35}}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes correctPop{0%{transform:scale(0.85)}60%{transform:scale(1.1)}100%{transform:scale(1)}}@keyframes wrongShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style></>);}
function Card({children,style={}}){return <div style={{background:"rgba(13,31,60,0.75)",border:`1px solid ${C.border}`,borderRadius:18,padding:"16px",...style}}>{children}</div>;}
function GLine(){return <div style={{height:1,margin:"14px 0",background:`linear-gradient(90deg,transparent,${C.gold}33,${C.blue2}33,transparent)`}}/>;}
function SL({icon,text,color}){return <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0 12px"}}><span style={{fontSize:20}}>{icon}</span><div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:color||C.gold,letterSpacing:2}}>{text}</div><div style={{flex:1,height:1,background:`linear-gradient(90deg,${color||C.gold}44,transparent)`}}/></div>;}

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Leçon 3/5 · ⭐ Premium",
      title:"Activation Errors That Cost Lives",
      intro:"L1 a appris à reconnaître la détresse. L2 a appris à choisir le bon équipement. Cette leçon répond à une troisième question : comment éviter qu'un bon choix d'équipement échoue à cause d'un manque de préparation ?",
      p0:"UNE BONNE DÉCISION, MAL EXÉCUTÉE",s0t:"Le maillon faible n'est pas toujours celui qu'on croit",
      s0:"Choisir le bon système (L2) ne sert à rien s'il n'a pas été préparé, entretenu et installé correctement bien avant l'urgence.\n\nQUAND UTILISER CE SYSTÈME ? Seulement s'il a été préparé pour fonctionner le jour venu.\nPOURQUOI CELUI-CI PLUTÔT QU'UN AUTRE ? Peu importe si aucun des deux n'a été entretenu.\nQUELLE ERREUR COÛTE LE PLUS DE VIES ? Négliger la préparation en pensant qu'elle attendra.",
      p1:"PREPARED BEFORE THE EMERGENCY",s1t:"Une urgence n'est jamais le moment de préparer son équipement",
      s1:"Enregistrement EPIRB, coordonnées MMSI à jour, programmation GPS — tout doit être fait avant que la détresse ne survienne, jamais pendant.",
      p2:"INSTALLATION MATTERS",s2t:"L'emplacement compte autant que l'équipement lui-même",
      s2:"Emplacement, visibilité, accessibilité, fixation, obstacles : une EPIRB parfaitement choisie mais mal installée peut ne jamais atteindre la surface.",
      p3:"MAINTENANCE SAVES LIVES",s3t:"Batterie, HRU, antenne — ce qui expire silencieusement",
      s3:"Batterie expirée, HRU expiré, antenne cassée, EPIRB jamais testée : ces négligences silencieuses sont parmi les causes les plus fréquentes d'échec en situation réelle.",
      p4:"CONFUSION MANUEL/AUTOMATIQUE EN PLEIN STRESS",s4t:"Ne jamais présumer du mode d'activation sous pression",
      s4:"En pleine urgence, confondre le mode d'activation ou oublier de vérifier son état peut coûter un temps précieux — d'où l'importance de le connaître avant, pas de le découvrir pendant.",
      p5:"FAUSSES ALERTES PAR ERREUR DE MANIPULATION",s5t:"Comprendre les causes pour les éviter",
      s5:"Test mal exécuté, débranchement accidentel, choc de vague en mauvais temps : la plupart des fausses alertes ont une cause identifiable et évitable.",
      p6:"ERREURS FRÉQUENTES DE SÉLECTION D'ÉQUIPEMENT",s6t:"Vérifier avant de faire confiance",
      s6:"Ne jamais supposer qu'un signal est parti sans vérification active — c'est la dernière ligne de défense contre les erreurs de préparation.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS RÉEL",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION SÉCURITÉ",
      sumT:"RÉSUMÉ — LEÇON 3",
      sumP:["La préparation doit précéder l'urgence, jamais la suivre","Un mauvais emplacement peut empêcher l'EPIRB d'atteindre la surface","Batterie, HRU et antenne expirent silencieusement — vérifier régulièrement","Ne jamais présumer du mode d'activation sous pression","Toujours vérifier qu'un signal est bien parti, jamais le supposer"],
      learnedP:["Prepared Before the Emergency","Installation Matters","Maintenance Saves Lives","Manuel vs automatique sous stress","Vérifier avant de faire confiance"],
      safetyMsg:"Emergency equipment cannot compensate for neglected preparation. The safest distress signal is the one that was inspected long before it was ever needed.",
    },
    en:{
      badge:"🆘 Safety · EPIRB, SART & GMDSS · Lesson 3/5 · ⭐ Premium",
      title:"Activation Errors That Cost Lives",
      intro:"L1 taught recognizing distress. L2 taught choosing the right equipment. This lesson answers a third question: how do you prevent a good equipment choice from failing due to lack of preparation?",
      p0:"A GOOD DECISION, POORLY EXECUTED",s0t:"The weak link isn't always where you'd expect",
      s0:"Choosing the right system (L2) is useless if it wasn't prepared, maintained, and installed correctly long before the emergency.\n\nWHEN TO USE THIS SYSTEM? Only if it was prepared to work on the day it's needed.\nWHY THIS ONE RATHER THAN ANOTHER? Doesn't matter if neither was maintained.\nWHICH ERROR COSTS THE MOST LIVES? Neglecting preparation, assuming it can wait.",
      p1:"PREPARED BEFORE THE EMERGENCY",s1t:"An emergency is never the time to prepare your equipment",
      s1:"EPIRB registration, up-to-date MMSI details, GPS programming — all must be done before distress occurs, never during.",
      p2:"INSTALLATION MATTERS",s2t:"Location matters as much as the equipment itself",
      s2:"Location, visibility, accessibility, fixation, obstacles: a perfectly chosen EPIRB but poorly installed may never reach the surface.",
      p3:"MAINTENANCE SAVES LIVES",s3t:"Battery, HRU, antenna — what expires silently",
      s3:"Expired battery, expired HRU, broken antenna, never-tested EPIRB: these silent neglects are among the most frequent causes of failure in real situations.",
      p4:"MANUAL/AUTOMATIC CONFUSION UNDER STRESS",s4t:"Never assume the activation mode under pressure",
      s4:"In an emergency, confusing the activation mode or forgetting to check its state can cost precious time — hence the importance of knowing it beforehand, not discovering it during.",
      p5:"FALSE ALARMS FROM HANDLING ERRORS",s5t:"Understand the causes to avoid them",
      s5:"Poorly executed test, accidental disconnection, wave impact in bad weather: most false alarms have an identifiable, avoidable cause.",
      p6:"FREQUENT EQUIPMENT-SELECTION ERRORS",s6t:"Verify before trusting",
      s6:"Never assume a signal went out without active verification — it's the last line of defense against preparation errors.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ REAL ACCIDENT CASE",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY — LESSON 3",
      sumP:["Preparation must precede the emergency, never follow it","A poor location can prevent the EPIRB from reaching the surface","Battery, HRU and antenna expire silently — check regularly","Never assume the activation mode under pressure","Always verify a signal actually went out, never assume it"],
      learnedP:["Prepared Before the Emergency","Installation Matters","Maintenance Saves Lives","Manual vs automatic under stress","Verify before trusting"],
      safetyMsg:"Emergency equipment cannot compensate for neglected preparation. The safest distress signal is the one that was inspected long before it was ever needed.",
    },
    es:{
      badge:"🆘 Seguridad · EPIRB, SART y GMDSS · Lección 3/5 · ⭐ Premium",
      title:"Activation Errors That Cost Lives",
      intro:"L1 enseñó a reconocer la emergencia. L2 enseñó a elegir el equipo correcto. Esta lección responde a una tercera pregunta: ¿cómo evitar que una buena elección de equipo falle por falta de preparación?",
      p0:"UNA BUENA DECISIÓN, MAL EJECUTADA",s0t:"El eslabón débil no siempre es el que se cree",
      s0:"Elegir el sistema correcto (L2) no sirve de nada si no fue preparado, mantenido e instalado correctamente mucho antes de la emergencia.\n\n¿CUÁNDO USAR ESTE SISTEMA? Solo si fue preparado para funcionar el día en que se necesite.\n¿POR QUÉ ESTE Y NO OTRO? No importa si ninguno de los dos fue mantenido.\n¿QUÉ ERROR CUESTA MÁS VIDAS? Descuidar la preparación, asumiendo que puede esperar.",
      p1:"PREPARED BEFORE THE EMERGENCY",s1t:"Una emergencia nunca es el momento de preparar el equipo",
      s1:"Registro del EPIRB, datos MMSI actualizados, programación GPS — todo debe hacerse antes de que ocurra la emergencia, nunca durante.",
      p2:"INSTALLATION MATTERS",s2t:"El lugar importa tanto como el propio equipo",
      s2:"Ubicación, visibilidad, accesibilidad, fijación, obstáculos: un EPIRB perfectamente elegido pero mal instalado puede no llegar nunca a la superficie.",
      p3:"MAINTENANCE SAVES LIVES",s3t:"Batería, HRU, antena — lo que caduca en silencio",
      s3:"Batería caducada, HRU caducado, antena rota, EPIRB nunca probado: estas negligencias silenciosas están entre las causas más frecuentes de fallo en situaciones reales.",
      p4:"CONFUSIÓN MANUAL/AUTOMÁTICO BAJO ESTRÉS",s4t:"Nunca presumir el modo de activación bajo presión",
      s4:"En plena emergencia, confundir el modo de activación u olvidar comprobar su estado puede costar un tiempo precioso — de ahí la importancia de conocerlo antes, no descubrirlo durante.",
      p5:"FALSAS ALARMAS POR ERRORES DE MANIPULACIÓN",s5t:"Entender las causas para evitarlas",
      s5:"Prueba mal ejecutada, desconexión accidental, golpe de ola con mal tiempo: la mayoría de falsas alarmas tienen una causa identificable y evitable.",
      p6:"ERRORES FRECUENTES DE SELECCIÓN DE EQUIPO",s6t:"Verificar antes de confiar",
      s6:"Nunca suponer que una señal salió sin verificación activa — es la última línea de defensa contra los errores de preparación.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN — LECCIÓN 3",
      sumP:["La preparación debe preceder a la emergencia, nunca seguirla","Un mal lugar puede impedir que el EPIRB llegue a la superficie","Batería, HRU y antena caducan en silencio — comprobar regularmente","Nunca presumir el modo de activación bajo presión","Siempre verificar que una señal realmente salió, nunca suponerlo"],
      learnedP:["Prepared Before the Emergency","Installation Matters","Maintenance Saves Lives","Manual vs automático bajo estrés","Verificar antes de confiar"],
      safetyMsg:"Emergency equipment cannot compensate for neglected preparation. The safest distress signal is the one that was inspected long before it was ever needed.",
    },
    pt:{
      badge:"🆘 Segurança · EPIRB, SART e GMDSS · Lição 3/5 · ⭐ Premium",
      title:"Activation Errors That Cost Lives",
      intro:"L1 ensinou a reconhecer a emergência. L2 ensinou a escolher o equipamento certo. Esta lição responde a uma terceira pergunta: como evitar que uma boa escolha de equipamento falhe por falta de preparação?",
      p0:"UMA BOA DECISÃO, MAL EXECUTADA",s0t:"O elo fraco nem sempre é onde se pensa",
      s0:"Escolher o sistema certo (L2) não serve de nada se não foi preparado, mantido e instalado corretamente muito antes da emergência.\n\nQUANDO USAR ESTE SISTEMA? Só se foi preparado para funcionar no dia em que for necessário.\nPOR QUE ESTE E NÃO OUTRO? Não importa se nenhum dos dois foi mantido.\nQUE ERRO CUSTA MAIS VIDAS? Negligenciar a preparação, assumindo que pode esperar.",
      p1:"PREPARED BEFORE THE EMERGENCY",s1t:"Uma emergência nunca é o momento de preparar o equipamento",
      s1:"Registo do EPIRB, dados MMSI atualizados, programação GPS — tudo deve ser feito antes de a emergência ocorrer, nunca durante.",
      p2:"INSTALLATION MATTERS",s2t:"O local importa tanto quanto o próprio equipamento",
      s2:"Localização, visibilidade, acessibilidade, fixação, obstáculos: um EPIRB perfeitamente escolhido mas mal instalado pode nunca chegar à superfície.",
      p3:"MAINTENANCE SAVES LIVES",s3t:"Bateria, HRU, antena — o que expira silenciosamente",
      s3:"Bateria expirada, HRU expirado, antena partida, EPIRB nunca testado: estas negligências silenciosas estão entre as causas mais frequentes de falha em situações reais.",
      p4:"CONFUSÃO MANUAL/AUTOMÁTICO SOB STRESS",s4t:"Nunca presumir o modo de ativação sob pressão",
      s4:"Em plena emergência, confundir o modo de ativação ou esquecer de verificar o seu estado pode custar um tempo precioso — daí a importância de o conhecer antes, não o descobrir durante.",
      p5:"FALSOS ALARMES POR ERROS DE MANUSEIO",s5t:"Compreender as causas para as evitar",
      s5:"Teste mal executado, desconexão acidental, impacto de onda com mau tempo: a maioria dos falsos alarmes tem uma causa identificável e evitável.",
      p6:"ERROS FREQUENTES DE SELEÇÃO DE EQUIPAMENTO",s6t:"Verificar antes de confiar",
      s6:"Nunca supor que um sinal saiu sem verificação ativa — é a última linha de defesa contra os erros de preparação.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO REAL",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO — LIÇÃO 3",
      sumP:["A preparação deve preceder a emergência, nunca segui-la","Um mau local pode impedir o EPIRB de chegar à superfície","Bateria, HRU e antena expiram silenciosamente — verificar regularmente","Nunca presumir o modo de ativação sob pressão","Verificar sempre que um sinal realmente saiu, nunca supor"],
      learnedP:["Prepared Before the Emergency","Installation Matters","Maintenance Saves Lives","Manual vs automático sob stress","Verificar antes de confiar"],
      safetyMsg:"Emergency equipment cannot compensate for neglected preparation. The safest distress signal is the one that was inspected long before it was ever needed.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS2_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/5":lang==="en"?"Lesson 3/5":lang==="es"?"Lección 3/5":"Lição 3/5"}</div>
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

            <SL icon="📋" text={lc.p1} color={C.teal}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🟢 {lang==="fr"?"READY / NOT READY — INTERACTIF":lang==="en"?"READY / NOT READY — INTERACTIVE":lang==="es"?"READY / NOT READY — INTERACTIVO":"READY / NOT READY — INTERATIVO"}</div><ReadyNotReadySVG lang={lang}/></Card>

            <SL icon="📍" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📍 {lang==="fr"?"INSTALLATION MATTERS — INTERACTIF":lang==="en"?"INSTALLATION MATTERS — INTERACTIVE":lang==="es"?"INSTALLATION MATTERS — INTERACTIVO":"INSTALLATION MATTERS — INTERATIVO"}</div><InstallationSVG lang={lang}/></Card>

            <SL icon="🔋" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>

            <SL icon="⚙️" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>

            <SL icon="🚨" text={lc.p5} color={C.gold2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🚨 {lang==="fr"?"CAUSES DE FAUSSES ALERTES — INTERACTIF":lang==="en"?"FALSE ALARM CAUSES — INTERACTIVE":lang==="es"?"CAUSAS DE FALSAS ALARMAS — INTERACTIVO":"CAUSAS DE FALSOS ALARMES — INTERATIVO"}</div><FalseAlarmSVG lang={lang}/></Card>

            <SL icon="🔍" text={lc.p6} color={C.teal}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.teal,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔍 {lang==="fr"?"VÉRIFIER AVANT DE FAIRE CONFIANCE — INTERACTIF":lang==="en"?"VERIFY BEFORE TRUST — INTERACTIVE":lang==="es"?"VERIFICAR ANTES DE CONFIAR — INTERACTIVO":"VERIFICAR ANTES DE CONFIAR — INTERATIVO"}</div><VerifyWheelSVG lang={lang}/></Card>

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
                {lang==="fr"?"Quiz Final — Erreurs d'Activation":lang==="en"?"Final Quiz — Activation Errors":lang==="es"?"Quiz Final — Errores de Activación":"Quiz Final — Erros de Ativação"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/5":"questions · Lesson 3/5"}</div>
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
              {lang==="fr"?"LEÇON 4 — GÉRER LA CHRONOLOGIE →":lang==="en"?"LESSON 4 — MANAGING THE TIMELINE →":lang==="es"?"LECCIÓN 4 — GESTIONAR LA CRONOLOGÍA →":"LIÇÃO 4 — GERIR A CRONOLOGIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
