import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - CHECK BEFORE USE
function CheckBeforeUseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📊", label:{fr:"Manomètre",en:"Pressure gauge",es:"Manómetro",pt:"Manómetro"}, desc:{fr:"L'aiguille doit se trouver dans la zone verte. Une pression insuffisante rend l'extincteur inefficace au moment critique.",en:"The needle must be in the green zone. Insufficient pressure makes the extinguisher ineffective at the critical moment.",es:"La aguja debe estar en la zona verde. Una presión insuficiente hace que el extintor sea ineficaz en el momento crítico.",pt:"A agulha deve estar na zona verde. Uma pressão insuficiente torna o extintor ineficaz no momento crítico."} },
    { id:2, icon:"🔒", label:{fr:"Goupille et scellé",en:"Pin and seal",es:"Pasador y precinto",pt:"Cavilha e selo"}, desc:{fr:"Un scellé brisé ou une goupille manquante signale un appareil déjà utilisé ou potentiellement compromis.",en:"A broken seal or missing pin signals a device that has already been used or potentially compromised.",es:"Un precinto roto o un pasador ausente señala un aparato ya utilizado o potencialmente comprometido.",pt:"Um selo partido ou uma cavilha em falta sinaliza um aparelho já utilizado ou potencialmente comprometido."} },
    { id:3, icon:"🧵", label:{fr:"État du tuyau",en:"Hose condition",es:"Estado de la manguera",pt:"Estado da mangueira"}, desc:{fr:"Un tuyau fissuré ou obstrué peut faire échouer l'attaque au pire moment. Vérifier son intégrité visuellement.",en:"A cracked or blocked hose can make the attack fail at the worst moment. Check its integrity visually.",es:"Una manguera agrietada u obstruida puede hacer fallar el ataque en el peor momento. Comprobar su integridad visualmente.",pt:"Uma mangueira rachada ou obstruída pode fazer falhar o ataque no pior momento. Verificar a sua integridade visualmente."} },
    { id:4, icon:"📅", label:{fr:"Date de contrôle",en:"Inspection date",es:"Fecha de control",pt:"Data de controlo"}, desc:{fr:"Un extincteur périmé ou non contrôlé récemment ne garantit plus une performance fiable.",en:"An expired or recently uninspected extinguisher no longer guarantees reliable performance.",es:"Un extintor caducado o no revisado recientemente ya no garantiza un rendimiento fiable.",pt:"Um extintor fora de validade ou não inspecionado recentemente já não garante um desempenho fiável."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(230,126,34,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.orange:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(230,126,34,0.1)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Quelques secondes de vérification, avant même de penser à agir.":lang==="en"?"A few seconds of checking, before even thinking about acting.":lang==="es"?"Unos segundos de comprobación, antes incluso de pensar en actuar.":"Alguns segundos de verificação, antes mesmo de pensar em agir."}</div>
    </div>
  );
}

// SVG 2 - STOP ASSESS ACT (PRE-PASS FILTER)
function StopAssessActSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stages = [
    { id:0, color:C.gold2, letter:"S", label:{fr:"STOP",en:"STOP",es:"STOP",pt:"STOP"}, desc:{fr:"Rester calme. Ne pas se précipiter sur l'extincteur avant d'avoir évalué la situation.",en:"Stay calm. Do not rush toward the extinguisher before assessing the situation.",es:"Mantener la calma. No precipitarse hacia el extintor antes de evaluar la situación.",pt:"Manter a calma. Não se precipitar para o extintor antes de avaliar a situação."} },
    { id:1, color:C.orange, letter:"A", label:{fr:"ASSESS",en:"ASSESS",es:"ASSESS",pt:"ASSESS"}, desc:{fr:"Le feu est-il encore naissant ? Ai-je une voie de repli ? Suis-je seul ? Y a-t-il une fumée importante ? Can I safely fight this fire, or is it already beyond portable firefighting ?",en:"Is the fire still nascent? Do I have a retreat path? Am I alone? Is there significant smoke? Can I safely fight this fire, or is it already beyond portable firefighting?",es:"¿El fuego todavía está naciente? ¿Tengo una vía de repliegue? ¿Estoy solo? ¿Hay humo importante? Can I safely fight this fire, or is it already beyond portable firefighting?",pt:"O fogo ainda está nascente? Tenho uma via de recuo? Estou sozinho? Há fumo importante? Can I safely fight this fire, or is it already beyond portable firefighting?"} },
    { id:2, color:C.red, letter:"A", label:{fr:"ACT",en:"ACT",es:"ACT",pt:"ACT"}, desc:{fr:"Seulement maintenant, utiliser la technique PASS. PASS est l'exécution, pas le début de la réflexion.",en:"Only now, use the PASS technique. PASS is the execution, not the start of the thinking.",es:"Solo ahora, usar la técnica PASS. PASS es la ejecución, no el inicio de la reflexión.",pt:"Só agora, usar a técnica PASS. PASS é a execução, não o início da reflexão."} },
  ];
  const sel_ = stages.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {stages.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:sel===s.id?s.color:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,flexShrink:0}}>{s.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 3 - PASS TECHNIQUE
function PassTechniqueSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🔓", letter:"P", label:{fr:"Pull - Dégoupiller",en:"Pull the pin",es:"Pull - Quitar el pasador",pt:"Pull - Retirar a cavilha"}, desc:{fr:"Retirer la goupille de sécurité pour déverrouiller la poignée de commande.",en:"Remove the safety pin to unlock the operating handle.",es:"Retirar el pasador de seguridad para desbloquear la palanca de mando.",pt:"Retirar a cavilha de segurança para destravar a alavanca de comando."} },
    { id:2, icon:"🎯", letter:"A", label:{fr:"Aim - Viser la base",en:"Aim at the base",es:"Aim - Apuntar a la base",pt:"Aim - Apontar à base"}, desc:{fr:"Viser la base des flammes, jamais le sommet : c'est là que se trouve le combustible.",en:"Aim at the base of the flames, never the top: that's where the fuel is.",es:"Apuntar a la base de las llamas, nunca a la parte superior: ahí está el combustible.",pt:"Apontar à base das chamas, nunca ao topo: é aí que está o combustível."} },
    { id:3, icon:"👊", letter:"S", label:{fr:"Squeeze - Presser",en:"Squeeze the handle",es:"Squeeze - Presionar",pt:"Squeeze - Apertar"}, desc:{fr:"Presser la poignée fermement pour libérer l'agent extincteur de façon continue.",en:"Squeeze the handle firmly to release the agent continuously.",es:"Presionar la palanca con firmeza para liberar el agente de forma continua.",pt:"Apertar a alavanca com firmeza para libertar o agente de forma contínua."} },
    { id:4, icon:"↔️", letter:"S", label:{fr:"Sweep - Balayer",en:"Sweep side to side",es:"Sweep - Barrer",pt:"Sweep - Varrer"}, desc:{fr:"Balayer d'un côté à l'autre à la base des flammes, en avançant progressivement si la situation le permet.",en:"Sweep side to side at the base of the flames, advancing gradually if the situation allows.",es:"Barrer de un lado a otro en la base de las llamas, avanzando progresivamente si la situación lo permite.",pt:"Varrer de um lado ao outro na base das chamas, avançando progressivamente se a situação o permitir."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:sel===s.id?C.blue2:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.white,flexShrink:0}}>{s.letter}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - DISTANCE & RETREAT
function DistanceRetreatSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🚪", label:{fr:"Toujours une sortie derrière soi",en:"Always an exit behind you",es:"Siempre una salida detrás de ti",pt:"Sempre uma saída atrás de ti"}, desc:{fr:"Ne jamais s'engager dans une attaque sans savoir exactement par où se retirer.",en:"Never engage in an attack without knowing exactly where to retreat.",es:"Nunca iniciar un ataque sin saber exactamente por dónde retirarse.",pt:"Nunca se envolver num ataque sem saber exatamente por onde recuar."} },
    { id:2, icon:"🚫", label:{fr:"Ne jamais laisser le feu couper la retraite",en:"Never let the fire cut off your retreat",es:"Nunca dejar que el fuego corte la retirada",pt:"Nunca deixar que o fogo corte a retirada"}, desc:{fr:"Rester positionné de façon à ce que le feu ne puisse jamais se retrouver entre soi et la sortie.",en:"Stay positioned so the fire can never end up between you and the exit.",es:"Mantenerse posicionado de forma que el fuego nunca pueda quedar entre uno mismo y la salida.",pt:"Manter-se posicionado de forma a que o fogo nunca possa ficar entre si próprio e a saída."} },
    { id:3, icon:"👃", label:{fr:"Approcher dos au vent si possible",en:"Approach with wind at your back if possible",es:"Acercarse con el viento a la espalda si es posible",pt:"Aproximar-se com o vento nas costas se possível"}, desc:{fr:"Le vent dans le dos évite d'être exposé à la fumée pendant l'attaque.",en:"Wind at your back avoids being exposed to smoke during the attack.",es:"El viento a la espalda evita estar expuesto al humo durante el ataque.",pt:"O vento nas costas evita ficar exposto ao fumo durante o ataque."} },
    { id:4, icon:"⛔", label:{fr:"Interrompre si fumée ou chaleur deviennent critiques",en:"Stop if smoke or heat become critical",es:"Interrumpir si el humo o el calor se vuelven críticos",pt:"Interromper se o fumo ou o calor se tornarem críticos"}, desc:{fr:"Si la visibilité chute fortement ou si la chaleur devient excessive, interrompre immédiatement l'attaque et se retirer. Un pompier professionnel protège toujours sa propre sécurité en premier.",en:"If visibility drops sharply or heat becomes excessive, stop the attack immediately and retreat. A professional firefighter always protects their own safety first.",es:"Si la visibilidad cae drásticamente o el calor se vuelve excesivo, interrumpir de inmediato el ataque y retirarse. Un bombero profesional siempre protege su propia seguridad primero.",pt:"Se a visibilidade cair drasticamente ou o calor se tornar excessivo, interromper de imediato o ataque e recuar. Um bombeiro profissional protege sempre a sua própria segurança primeiro."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(192,57,43,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.red:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE - PORTABLE FIREFIGHTING DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous saisissez un extincteur en urgence. Que vérifiez-vous en quelques secondes ?\na) Rien, l'urgence prime sur tout\nb) Manomètre, goupille/scellé, tuyau, date de contrôle\nc) Uniquement la couleur de l'appareil"},
      {id:"q2",q:"Avant d'utiliser la technique PASS, que devez-vous d'abord faire selon la méthode STOP-ASSESS-ACT ?\na) Vous arrêter, évaluer la situation (feu naissant, voie de repli, seul, fumée), puis seulement agir\nb) Utiliser PASS immédiatement, l'évaluation vient après\nc) Ignorer STOP-ASSESS, PASS suffit toujours"},
      {id:"q3",q:"Vous attaquez un feu et la fumée réduit fortement votre visibilité. Que faites-vous ?\na) Continuer coûte que coûte jusqu'à vider l'extincteur\nb) Ralentir légèrement mais continuer\nc) Interrompre immédiatement l'attaque et vous retirer"},
      {id:"q4",q:"Vous avez correctement utilisé un extincteur mais le feu continue de croître. Que faites-vous ?\na) Chercher un deuxième extincteur et continuer seul\nb) Escalader immédiatement : alarme, équipe incendie, système fixe ou évacuation selon la procédure\nc) Persister avec le même extincteur jusqu'à épuisement complet"},
    ],
    en:[
      {id:"q1",q:"You grab an extinguisher in an emergency. What do you check in a few seconds?\na) Nothing, urgency comes before everything\nb) Pressure gauge, pin/seal, hose, inspection date\nc) Only the color of the device"},
      {id:"q2",q:"Before using the PASS technique, what should you do first according to STOP-ASSESS-ACT?\na) Stop, assess the situation (nascent fire, retreat path, alone, smoke), then only act\nb) Use PASS immediately, assessment comes after\nc) Ignore STOP-ASSESS, PASS is always enough"},
      {id:"q3",q:"You are attacking a fire and smoke sharply reduces your visibility. What do you do?\na) Keep going no matter what until the extinguisher is empty\nb) Slow down slightly but keep going\nc) Stop the attack immediately and retreat"},
      {id:"q4",q:"You correctly used an extinguisher but the fire keeps growing. What do you do?\na) Look for a second extinguisher and keep going alone\nb) Escalate immediately: alarm, fire team, fixed system, or evacuation per procedure\nc) Persist with the same extinguisher until fully empty"},
    ],
    es:[
      {id:"q1",q:"Coges un extintor de emergencia. ¿Qué comprueba en unos segundos?\na) Nada, la urgencia prima sobre todo\nb) Manómetro, pasador/precinto, manguera, fecha de control\nc) Solo el color del aparato"},
      {id:"q2",q:"Antes de usar la técnica PASS, ¿qué debes hacer primero según STOP-ASSESS-ACT?\na) Detenerte, evaluar la situación (fuego naciente, vía de repliegue, solo, humo), y solo entonces actuar\nb) Usar PASS de inmediato, la evaluación viene después\nc) Ignorar STOP-ASSESS, PASS siempre basta"},
      {id:"q3",q:"Estás atacando un fuego y el humo reduce mucho tu visibilidad. ¿Qué haces?\na) Seguir cueste lo que cueste hasta vaciar el extintor\nb) Ralentizar un poco pero seguir\nc) Interrumpir de inmediato el ataque y retirarte"},
      {id:"q4",q:"Usaste correctamente un extintor pero el fuego sigue creciendo. ¿Qué haces?\na) Buscar un segundo extintor y seguir solo\nb) Escalar de inmediato: alarma, equipo de incendios, sistema fijo o evacuación según el procedimiento\nc) Persistir con el mismo extintor hasta vaciarlo por completo"},
    ],
    pt:[
      {id:"q1",q:"Pegas num extintor em emergência. O que verificas em poucos segundos?\na) Nada, a urgência prima sobre tudo\nb) Manómetro, cavilha/selo, mangueira, data de controlo\nc) Só a cor do aparelho"},
      {id:"q2",q:"Antes de usar a técnica PASS, o que deves fazer primeiro segundo STOP-ASSESS-ACT?\na) Parar, avaliar a situação (fogo nascente, via de recuo, sozinho, fumo), e só depois agir\nb) Usar PASS de imediato, a avaliação vem depois\nc) Ignorar STOP-ASSESS, PASS basta sempre"},
      {id:"q3",q:"Estás a atacar um fogo e o fumo reduz muito a tua visibilidade. O que fazes?\na) Continuar custe o que custar até esvaziar o extintor\nb) Abrandar ligeiramente mas continuar\nc) Interromper de imediato o ataque e recuar"},
      {id:"q4",q:"Usaste corretamente um extintor mas o fogo continua a crescer. O que fazes?\na) Procurar um segundo extintor e continuar sozinho\nb) Escalar de imediato: alarme, equipa de incêndio, sistema fixo ou evacuação segundo o procedimento\nc) Persistir com o mesmo extintor até esvaziá-lo por completo"},
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
          {showC&&<div style={{fontSize:11,marginTop:4,fontWeight:600,color:chk(q.id,ans[q.id])?C.green:C.red}}>{chk(q.id,ans[q.id])?"✓":`✗ -> ${correct[q.id]}`}</div>}
        </div>
      ))}
      <button onClick={()=>setShowC(v=>!v)} style={{width:"100%",padding:"11px 0",borderRadius:12,background:showC?"rgba(30,138,74,0.2)":"rgba(201,146,42,0.15)",border:`1px solid ${showC?C.green:C.gold}44`,color:showC?C.green:C.gold2,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Cinzel',serif"}}>
        {showC?t.hideCorr:t.showCorr}
      </button>
    </div>
  );
}

// ACCIDENT CASE - REAL DOCUMENTED CASE (ENGINE ROOM TURBOCHARGER FIRE)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Feu du Turbocompresseur",teaser:"Cas réel documenté - extincteur insuffisant, escalade immédiate et correcte",
      what:"En mer, une alarme de basse pression carburant se déclenche. Un membre d'équipage entre en salle des machines et découvre une fuite de carburant sous haute pression projetée sur le turbocompresseur, avec une quantité importante de diesel déjà accumulée dans la cale. Le commandant, arrivé sur place, tente d'éteindre le feu naissant avec un extincteur portatif, sans succès. Sans persister, il déclenche immédiatement l'alarme générale, fait fermer les écoutilles, fait sécuriser les volets de ventilation par l'équipage, et ferme les vannes d'arrêt carburant à distance. Privé d'oxygène et de combustible, le feu s'éteint alors de lui-même.",
      cause:"• Une fuite sur un flexible carburant a projeté du combustible directement sur une surface chaude (turbocompresseur)\n• L'extincteur portatif, correctement utilisé, n'a pas suffi face à l'ampleur de la fuite\n• Décision immédiate d'escalader plutôt que de persister avec l'extincteur",
      lessons:"✓ A Portable Extinguisher Is Your First Response, Not Your Last Hope : l'extincteur a été essayé en premier, comme il se doit\n✓ Know when to stop fighting and start surviving : l'échec de l'extincteur a immédiatement déclenché l'escalade, sans hésitation ni persistance inutile\n✓ Couper la ventilation et le carburant a permis d'éteindre le feu sans avoir à l'attaquer directement davantage\n✓ Ce cas illustre une décision correcte, pas une erreur : c'est exactement le comportement attendu",
      link:"🔗 Ce cas montre directement ce que signifie reconnaître les limites d'un extincteur portatif et escalader immédiatement, sans attendre l'épuisement complet de l'appareil."},
    en:{title:"Case Study - The Turbocharger Fire",teaser:"Real documented case - extinguisher insufficient, immediate and correct escalation",
      what:"While underway, a low fuel pressure alarm sounds. A crew member enters the engine room and discovers a high-pressure fuel leak spraying onto the turbocharger, with a large quantity of diesel already accumulated in the bilge. The Master, arriving on scene, attempts to extinguish the nascent fire with a portable extinguisher, without success. Without persisting, he immediately activates the general alarm, has the hatches secured, has the crew secure the ventilation dampers, and closes the remote fuel shut-off valves. Deprived of oxygen and fuel, the fire then self-extinguishes.",
      cause:"• A leak on a fuel hose sprayed fuel directly onto a hot surface (turbocharger)\n• The portable extinguisher, correctly used, was not enough given the scale of the leak\n• Immediate decision to escalate rather than persist with the extinguisher",
      lessons:"✓ A Portable Extinguisher Is Your First Response, Not Your Last Hope: the extinguisher was tried first, as it should be\n✓ Know when to stop fighting and start surviving: the extinguisher's failure immediately triggered escalation, with no hesitation or unnecessary persistence\n✓ Cutting ventilation and fuel allowed the fire to go out without needing to attack it further directly\n✓ This case illustrates a correct decision, not a mistake: it is exactly the expected behavior",
      link:"🔗 This case directly shows what it means to recognize the limits of a portable extinguisher and escalate immediately, without waiting for the device to be fully spent."},
    es:{title:"Caso de estudio - El Fuego del Turbocompresor",teaser:"Caso real documentado - extintor insuficiente, escalada inmediata y correcta",
      what:"En el mar, suena una alarma de baja presión de combustible. Un tripulante entra en la sala de máquinas y descubre una fuga de combustible a alta presión rociando el turbocompresor, con una gran cantidad de diésel ya acumulado en la sentina. El capitán, al llegar, intenta apagar el fuego naciente con un extintor portátil, sin éxito. Sin insistir, activa de inmediato la alarma general, hace cerrar las escotillas, hace asegurar las compuertas de ventilación por la tripulación, y cierra las válvulas de corte de combustible a distancia. Privado de oxígeno y combustible, el fuego se apaga entonces por sí solo.",
      cause:"• Una fuga en una manguera de combustible roció combustible directamente sobre una superficie caliente (turbocompresor)\n• El extintor portátil, usado correctamente, no bastó ante la magnitud de la fuga\n• Decisión inmediata de escalar en lugar de insistir con el extintor",
      lessons:"✓ A Portable Extinguisher Is Your First Response, Not Your Last Hope: el extintor se probó primero, como corresponde\n✓ Know when to stop fighting and start surviving: el fallo del extintor desencadenó de inmediato la escalada, sin vacilación ni insistencia innecesaria\n✓ Cortar la ventilación y el combustible permitió que el fuego se apagara sin necesidad de atacarlo más directamente\n✓ Este caso ilustra una decisión correcta, no un error: es exactamente el comportamiento esperado",
      link:"🔗 Este caso muestra directamente lo que significa reconocer los límites de un extintor portátil y escalar de inmediato, sin esperar a que el aparato se agote por completo."},
    pt:{title:"Caso de estudo - O Fogo do Turbocompressor",teaser:"Caso real documentado - extintor insuficiente, escalada imediata e correta",
      what:"No mar, soa um alarme de baixa pressão de combustível. Um tripulante entra na casa das máquinas e descobre uma fuga de combustível a alta pressão a projetar-se sobre o turbocompressor, com uma grande quantidade de gasóleo já acumulada no porão. O comandante, ao chegar, tenta apagar o fogo nascente com um extintor portátil, sem sucesso. Sem insistir, aciona de imediato o alarme geral, manda fechar as escotilhas, manda a tripulação fixar as comportas de ventilação, e fecha as válvulas de corte de combustível à distância. Privado de oxigénio e combustível, o fogo apaga-se então sozinho.",
      cause:"• Uma fuga numa mangueira de combustível projetou combustível diretamente sobre uma superfície quente (turbocompressor)\n• O extintor portátil, usado corretamente, não bastou face à dimensão da fuga\n• Decisão imediata de escalar em vez de insistir com o extintor",
      lessons:"✓ A Portable Extinguisher Is Your First Response, Not Your Last Hope: o extintor foi tentado primeiro, como deve ser\n✓ Know when to stop fighting and start surviving: a falha do extintor desencadeou de imediato a escalada, sem hesitação nem insistência desnecessária\n✓ Cortar a ventilação e o combustível permitiu que o fogo se apagasse sem ser preciso atacá-lo mais diretamente\n✓ Este caso ilustra uma decisão correta, não um erro: é exatamente o comportamento esperado",
      link:"🔗 Este caso mostra diretamente o que significa reconhecer os limites de um extintor portátil e escalar de imediato, sem esperar que o aparelho se esgote por completo."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(30,138,74,0.08)",border:`1.5px solid ${C.green}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>✅</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.green,marginBottom:2}}>{c.title}</div><div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{c.teaser}</div></div>
          <span style={{fontSize:14,color:C.muted}}>{exp?"▲":"▼"}</span>
        </div>
      </div>
      {exp&&<div style={{padding:"0 16px 16px"}}>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,marginBottom:10}}>{c.what}</div>
        <div style={{fontSize:11,color:C.orange,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"CONTEXTE":lang==="en"?"CONTEXT":lang==="es"?"CONTEXTO":"CONTEXTO"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.cause}</div>
        <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:5,fontFamily:"'Cinzel',serif"}}>{lang==="fr"?"LEÇONS":lang==="en"?"LESSONS":lang==="es"?"LECCIONES":"LIÇÕES"}</div>
        <div style={{fontSize:12,color:C.white,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:10}}>{c.lessons}</div>
        <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.1)",border:`1px solid ${C.gold}33`,fontSize:11,color:C.gold2,lineHeight:1.6}}>{c.link}</div>
      </div>}
    </div>
  );
}

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Que signifie le principe 'A Portable Extinguisher Is Your First Response, Not Your Last Hope' ?",opts:["Il faut toujours vider l'extincteur avant d'envisager autre chose","L'extincteur portatif est le premier geste possible, jamais la seule solution disponible","Un extincteur suffit toujours à éteindre n'importe quel feu","Il ne faut jamais utiliser d'extincteur portatif"],correct:1,expl:"L'extincteur est un premier moyen d'action, pas une garantie de résoudre toute situation."},
    {q:"Que faut-il vérifier avant de saisir un extincteur en urgence ?",opts:["Rien, l'urgence prime sur tout","Manomètre, goupille/scellé, tuyau, date de contrôle","Uniquement son poids","Uniquement sa couleur"],correct:1,expl:"Ces vérifications rapides garantissent que l'appareil fonctionnera réellement au moment critique."},
    {q:"Que signifie la question 'Can I safely fight this fire, or is it already beyond portable firefighting' ?",opts:["Il faut toujours essayer, quoi qu'il arrive","Il faut évaluer honnêtement si la situation dépasse déjà les moyens portatifs avant d'agir","Cette question n'a pas d'utilité pratique","Elle ne concerne que les feux électriques"],correct:1,expl:"Cette question structure toute la décision avant même de songer à utiliser un extincteur."},
    {q:"Dans la méthode STOP-ASSESS-ACT, que fait-on pendant ASSESS ?",opts:["On utilise déjà la technique PASS","On évalue si le feu est naissant, s'il y a une voie de repli, si on est seul, si la fumée est importante","On attend sans rien faire","On appelle uniquement le TMAS"],correct:1,expl:"ASSESS structure l'évaluation de la situation avant toute action, y compris avant PASS."},
    {q:"Dans la méthode PASS, que signifie le deuxième A (Aim) ?",opts:["Viser le sommet des flammes","Viser la base des flammes, là où se trouve le combustible","Viser une direction aléatoire","Ne rien viser en particulier"],correct:1,expl:"Viser la base des flammes cible directement le combustible, pas la fumée ou la chaleur visible."},
    {q:"Pourquoi toujours garder une sortie derrière soi pendant une attaque au feu ?",opts:["Ce n'est pas nécessaire si on est confiant","Pour ne jamais se retrouver piégé si la situation se dégrade soudainement","Uniquement pour respecter une procédure administrative","Pour impressionner les autres membres d'équipage"],correct:1,expl:"Une voie de retrait connue et dégagée protège le sauveteur en cas de dégradation soudaine."},
    {q:"Que faire si la fumée réduit fortement la visibilité pendant une attaque ?",opts:["Continuer coûte que coûte","Interrompre immédiatement l'attaque et se retirer","Ralentir légèrement mais continuer","Fermer les yeux et continuer au toucher"],correct:1,expl:"Une visibilité fortement réduite impose un retrait immédiat, sans hésitation."},
    {q:"Qu'est-ce qui caractérise un feu 'au-delà des moyens portatifs' ?",opts:["Un feu qui continue de croître malgré une attaque correctement réalisée","Un feu qui s'éteint immédiatement","Un feu qui ne produit aucune fumée","Un feu situé loin de soi"],correct:1,expl:"Si le feu continue de croître malgré une attaque correcte, il faut escalader sans délai."},
    {q:"Que signifie 'Know when to stop fighting and start surviving' ?",opts:["Il faut toujours continuer à combattre le feu jusqu'au bout","Reconnaître le moment où continuer devient plus dangereux qu'escalader ou se retirer","Il ne faut jamais combattre un feu","Cette phrase ne s'applique qu'aux feux électriques"],correct:1,expl:"Ce principe rappelle que la survie prime sur l'entêtement à combattre un feu qui dépasse les moyens disponibles."},
    {q:"Un extincteur a été correctement utilisé mais le feu continue de croître. Que faire ?",opts:["Chercher un autre extincteur et continuer seul","Escalader immédiatement : alarme, équipe incendie, système fixe ou évacuation selon la procédure","Vider un deuxième extincteur avant de réagir autrement","Ignorer la situation"],correct:1,expl:"La persistance au-delà des moyens portatifs retarde une escalade nécessaire et dangereuse à retarder."},
    {q:"Dans le cas d'étude du Feu du Turbocompresseur, l'échec de l'extincteur portatif a-t-il été une erreur ?",opts:["Oui, il n'aurait jamais dû être utilisé","Non, l'essayer en premier était la bonne décision ; l'erreur aurait été de persister au lieu d'escalader","Oui, il fallait directement utiliser le système fixe","Non, mais uniquement par chance"],correct:1,expl:"Essayer l'extincteur en premier était correct ; la bonne décision a été d'escalader immédiatement après son échec."},
    {q:"Que signifient les gestes concrets d'escalade dans le cas du Feu du Turbocompresseur ?",opts:["Continuer à chercher un autre extincteur","Alarme générale, écoutilles fermées, ventilation coupée, vannes carburant fermées","Évacuer immédiatement le navire","Appeler uniquement le port le plus proche"],correct:1,expl:"Ces actions ont privé le feu d'oxygène et de combustible, permettant son extinction sans attaque directe supplémentaire."},
    {q:"Quelle étape du MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cette leçon couvre-t-elle principalement ?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Cette leçon développe le confinement initial d'un feu naissant avec les moyens portatifs."},
    {q:"Cette leçon enseigne-t-elle la chimie des agents extincteurs en détail ?",opts:["Oui, en profondeur","Non, l'accent est mis sur la vérification, la technique d'usage et la décision, déjà couvert ailleurs pour la chimie","Oui, mais uniquement pour le CO2","Non, aucun agent n'est jamais mentionné"],correct:1,expl:"Cette leçon reste centrée sur l'usage pratique et la décision, pas la chimie déjà couverte dans Engine."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée à la manipulation réelle d'un extincteur ?",opts:["Oui, il équivaut à un entraînement pratique complet","Non, il enseigne des principes de vérification et de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de décision, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'A Portable Extinguisher Is Your First Response, Not Your Last Hope' mean?",opts:["You should always empty the extinguisher before considering anything else","The portable extinguisher is the first possible action, never the only available solution","An extinguisher always suffices to put out any fire","A portable extinguisher should never be used"],correct:1,expl:"The extinguisher is a first means of action, not a guarantee of resolving every situation."},
    {q:"What should be checked before grabbing an extinguisher in an emergency?",opts:["Nothing, urgency comes before everything","Pressure gauge, pin/seal, hose, inspection date","Only its weight","Only its color"],correct:1,expl:"These quick checks ensure the device will actually work at the critical moment."},
    {q:"What does the question 'Can I safely fight this fire, or is it already beyond portable firefighting' mean?",opts:["You should always try, no matter what","You should honestly assess whether the situation already exceeds portable means before acting","This question has no practical use","It only concerns electrical fires"],correct:1,expl:"This question structures the whole decision before even thinking of using an extinguisher."},
    {q:"In the STOP-ASSESS-ACT method, what happens during ASSESS?",opts:["You already use the PASS technique","You assess whether the fire is nascent, if there's a retreat path, if you're alone, if smoke is significant","You wait and do nothing","You only call TMAS"],correct:1,expl:"ASSESS structures the situation assessment before any action, including before PASS."},
    {q:"In the PASS method, what does the second letter, Aim, mean?",opts:["Aim at the top of the flames","Aim at the base of the flames, where the fuel is","Aim in a random direction","Aim at nothing in particular"],correct:1,expl:"Aiming at the base of the flames directly targets the fuel, not the visible smoke or heat."},
    {q:"Why always keep an exit behind you during a fire attack?",opts:["It isn't necessary if you're confident","So you never get trapped if the situation suddenly worsens","Only to follow an administrative procedure","To impress other crew members"],correct:1,expl:"A known, clear retreat path protects the rescuer if the situation suddenly worsens."},
    {q:"What do you do if smoke sharply reduces visibility during an attack?",opts:["Keep going no matter what","Stop the attack immediately and retreat","Slow down slightly but keep going","Close your eyes and continue by touch"],correct:1,expl:"Sharply reduced visibility requires immediate retreat, without hesitation."},
    {q:"What characterizes a fire 'beyond portable means'?",opts:["A fire that keeps growing despite a correctly performed attack","A fire that goes out immediately","A fire producing no smoke at all","A fire located far away"],correct:1,expl:"If the fire keeps growing despite a correct attack, escalation must happen without delay."},
    {q:"What does 'Know when to stop fighting and start surviving' mean?",opts:["You must always keep fighting the fire to the end","Recognize the moment when continuing becomes more dangerous than escalating or retreating","You should never fight a fire","This phrase only applies to electrical fires"],correct:1,expl:"This principle reminds that survival takes priority over stubbornly fighting a fire beyond available means."},
    {q:"An extinguisher was correctly used but the fire keeps growing. What do you do?",opts:["Look for another extinguisher and keep going alone","Escalate immediately: alarm, fire team, fixed system, or evacuation per procedure","Empty a second extinguisher before reacting otherwise","Ignore the situation"],correct:1,expl:"Persisting beyond portable means delays a necessary escalation that becomes dangerous to delay."},
    {q:"In the Turbocharger Fire case study, was the portable extinguisher's failure a mistake?",opts:["Yes, it should never have been used","No, trying it first was the right decision; the mistake would have been persisting instead of escalating","Yes, the fixed system should have been used directly","No, but only by luck"],correct:1,expl:"Trying the extinguisher first was correct; the right decision was escalating immediately after it failed."},
    {q:"What did the concrete escalation actions consist of in the Turbocharger Fire case?",opts:["Continuing to look for another extinguisher","General alarm, hatches secured, ventilation cut, fuel valves closed","Immediately evacuating the ship","Only calling the nearest port"],correct:1,expl:"These actions starved the fire of oxygen and fuel, allowing it to go out without further direct attack."},
    {q:"Which step of the MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) does this lesson mainly cover?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"This lesson develops the initial containment of a nascent fire using portable means."},
    {q:"Does this lesson teach the chemistry of extinguishing agents in detail?",opts:["Yes, in depth","No, the focus is on checking, technique of use, and decision-making, with chemistry already covered elsewhere","Yes, but only for CO2","No, no agent is ever mentioned"],correct:1,expl:"This lesson stays focused on practical use and decision-making, not the chemistry already covered in Engine."},
    {q:"Does this module teach a replacement for certified practical BST training in actual extinguisher handling?",opts:["Yes, it is equivalent to complete practical training","No, it teaches principles of checking and decision-making, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches decision principles, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'A Portable Extinguisher Is Your First Response, Not Your Last Hope'?",opts:["Siempre hay que vaciar el extintor antes de considerar cualquier otra cosa","El extintor portátil es la primera acción posible, nunca la única solución disponible","Un extintor siempre basta para apagar cualquier fuego","Nunca se debe usar un extintor portátil"],correct:1,expl:"El extintor es un primer medio de acción, no una garantía de resolver toda situación."},
    {q:"¿Qué hay que comprobar antes de coger un extintor de emergencia?",opts:["Nada, la urgencia prima sobre todo","Manómetro, pasador/precinto, manguera, fecha de control","Solo su peso","Solo su color"],correct:1,expl:"Estas comprobaciones rápidas garantizan que el aparato funcionará realmente en el momento crítico."},
    {q:"¿Qué significa la pregunta 'Can I safely fight this fire, or is it already beyond portable firefighting'?",opts:["Siempre hay que intentarlo, pase lo que pase","Hay que evaluar honestamente si la situación ya supera los medios portátiles antes de actuar","Esta pregunta no tiene utilidad práctica","Solo concierne a los fuegos eléctricos"],correct:1,expl:"Esta pregunta estructura toda la decisión antes incluso de pensar en usar un extintor."},
    {q:"En el método STOP-ASSESS-ACT, ¿qué se hace durante ASSESS?",opts:["Ya se usa la técnica PASS","Se evalúa si el fuego es naciente, si hay una vía de repliegue, si se está solo, si el humo es importante","Se espera sin hacer nada","Solo se llama al TMAS"],correct:1,expl:"ASSESS estructura la evaluación de la situación antes de cualquier acción, incluso antes de PASS."},
    {q:"En el método PASS, ¿qué significa la segunda letra, Aim?",opts:["Apuntar a la parte superior de las llamas","Apuntar a la base de las llamas, donde está el combustible","Apuntar en una dirección aleatoria","No apuntar a nada en particular"],correct:1,expl:"Apuntar a la base de las llamas se dirige directamente al combustible, no al humo o el calor visible."},
    {q:"¿Por qué mantener siempre una salida detrás de ti durante un ataque al fuego?",opts:["No es necesario si tienes confianza","Para no quedar atrapado nunca si la situación empeora de repente","Solo para cumplir un procedimiento administrativo","Para impresionar a otros tripulantes"],correct:1,expl:"Una vía de retirada conocida y despejada protege al socorrista si la situación empeora de repente."},
    {q:"¿Qué hacer si el humo reduce mucho la visibilidad durante un ataque?",opts:["Seguir cueste lo que cueste","Interrumpir de inmediato el ataque y retirarse","Ralentizar un poco pero seguir","Cerrar los ojos y continuar al tacto"],correct:1,expl:"Una visibilidad muy reducida exige una retirada inmediata, sin dudar."},
    {q:"¿Qué caracteriza a un fuego 'más allá de los medios portátiles'?",opts:["Un fuego que sigue creciendo pese a un ataque correctamente realizado","Un fuego que se apaga de inmediato","Un fuego que no produce nada de humo","Un fuego situado lejos"],correct:1,expl:"Si el fuego sigue creciendo pese a un ataque correcto, hay que escalar sin demora."},
    {q:"¿Qué significa 'Know when to stop fighting and start surviving'?",opts:["Siempre hay que seguir combatiendo el fuego hasta el final","Reconocer el momento en que seguir se vuelve más peligroso que escalar o retirarse","Nunca hay que combatir un fuego","Esta frase solo se aplica a fuegos eléctricos"],correct:1,expl:"Este principio recuerda que la supervivencia prima sobre insistir tercamente en combatir un fuego que supera los medios disponibles."},
    {q:"Un extintor se usó correctamente pero el fuego sigue creciendo. ¿Qué hacer?",opts:["Buscar otro extintor y seguir solo","Escalar de inmediato: alarma, equipo de incendios, sistema fijo o evacuación según el procedimiento","Vaciar un segundo extintor antes de reaccionar de otra forma","Ignorar la situación"],correct:1,expl:"Persistir más allá de los medios portátiles retrasa una escalada necesaria y peligrosa de retrasar."},
    {q:"En el caso de estudio del Fuego del Turbocompresor, ¿fue el fallo del extintor portátil un error?",opts:["Sí, nunca debería haberse usado","No, probarlo primero fue la decisión correcta; el error habría sido persistir en lugar de escalar","Sí, debería haberse usado directamente el sistema fijo","No, pero solo por suerte"],correct:1,expl:"Probar el extintor primero fue correcto; la decisión correcta fue escalar de inmediato tras su fallo."},
    {q:"¿En qué consistieron las acciones concretas de escalada en el caso del Fuego del Turbocompresor?",opts:["Seguir buscando otro extintor","Alarma general, escotillas cerradas, ventilación cortada, válvulas de combustible cerradas","Evacuar de inmediato el buque","Solo llamar al puerto más cercano"],correct:1,expl:"Estas acciones privaron al fuego de oxígeno y combustible, permitiendo que se apagara sin más ataque directo."},
    {q:"¿Qué etapa del MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cubre principalmente esta lección?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Esta lección desarrolla el confinamiento inicial de un fuego naciente con medios portátiles."},
    {q:"¿Esta lección enseña la química de los agentes extintores en detalle?",opts:["Sí, en profundidad","No, el énfasis está en la comprobación, la técnica de uso y la decisión, con la química ya cubierta en otro lugar","Sí, pero solo para el CO2","No, ningún agente se menciona nunca"],correct:1,expl:"Esta lección se mantiene centrada en el uso práctico y la decisión, no en la química ya cubierta en Engine."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada en el manejo real de un extintor?",opts:["Sí, equivale a un entrenamiento práctico completo","No, enseña principios de comprobación y decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de decisión, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'A Portable Extinguisher Is Your First Response, Not Your Last Hope'?",opts:["Deve-se sempre esvaziar o extintor antes de considerar qualquer outra coisa","O extintor portátil é a primeira ação possível, nunca a única solução disponível","Um extintor sempre basta para apagar qualquer fogo","Nunca se deve usar um extintor portátil"],correct:1,expl:"O extintor é um primeiro meio de ação, não uma garantia de resolver toda a situação."},
    {q:"O que verificar antes de pegar num extintor em emergência?",opts:["Nada, a urgência prima sobre tudo","Manómetro, cavilha/selo, mangueira, data de controlo","Só o seu peso","Só a sua cor"],correct:1,expl:"Estas verificações rápidas garantem que o aparelho vai realmente funcionar no momento crítico."},
    {q:"O que significa a pergunta 'Can I safely fight this fire, or is it already beyond portable firefighting'?",opts:["Deve-se sempre tentar, aconteça o que acontecer","Deve-se avaliar honestamente se a situação já ultrapassa os meios portáteis antes de agir","Esta pergunta não tem utilidade prática","Só diz respeito a incêndios elétricos"],correct:1,expl:"Esta pergunta estrutura toda a decisão antes mesmo de pensar em usar um extintor."},
    {q:"No método STOP-ASSESS-ACT, o que se faz durante ASSESS?",opts:["Já se usa a técnica PASS","Avalia-se se o fogo está nascente, se há uma via de recuo, se se está sozinho, se o fumo é importante","Espera-se sem fazer nada","Só se chama o TMAS"],correct:1,expl:"ASSESS estrutura a avaliação da situação antes de qualquer ação, incluindo antes do PASS."},
    {q:"No método PASS, o que significa a segunda letra, Aim?",opts:["Apontar ao topo das chamas","Apontar à base das chamas, onde está o combustível","Apontar numa direção aleatória","Não apontar a nada em particular"],correct:1,expl:"Apontar à base das chamas visa diretamente o combustível, não o fumo ou o calor visível."},
    {q:"Por que manter sempre uma saída atrás de si durante um ataque ao fogo?",opts:["Não é necessário se se tiver confiança","Para nunca ficar preso se a situação piorar subitamente","Só para cumprir um procedimento administrativo","Para impressionar outros tripulantes"],correct:1,expl:"Uma via de recuo conhecida e desimpedida protege o socorrista se a situação piorar subitamente."},
    {q:"O que fazer se o fumo reduzir muito a visibilidade durante um ataque?",opts:["Continuar custe o que custar","Interromper de imediato o ataque e recuar","Abrandar ligeiramente mas continuar","Fechar os olhos e continuar ao toque"],correct:1,expl:"Uma visibilidade muito reduzida exige um recuo imediato, sem hesitar."},
    {q:"O que caracteriza um fogo 'além dos meios portáteis'?",opts:["Um fogo que continua a crescer apesar de um ataque corretamente realizado","Um fogo que se apaga de imediato","Um fogo que não produz nenhum fumo","Um fogo situado longe"],correct:1,expl:"Se o fogo continuar a crescer apesar de um ataque correto, é preciso escalar sem demora."},
    {q:"O que significa 'Know when to stop fighting and start surviving'?",opts:["Deve-se sempre continuar a combater o fogo até ao fim","Reconhecer o momento em que continuar se torna mais perigoso do que escalar ou recuar","Nunca se deve combater um fogo","Esta frase só se aplica a incêndios elétricos"],correct:1,expl:"Este princípio lembra que a sobrevivência prima sobre insistir teimosamente em combater um fogo que ultrapassa os meios disponíveis."},
    {q:"Um extintor foi usado corretamente mas o fogo continua a crescer. O que fazer?",opts:["Procurar outro extintor e continuar sozinho","Escalar de imediato: alarme, equipa de incêndio, sistema fixo ou evacuação segundo o procedimento","Esvaziar um segundo extintor antes de reagir de outra forma","Ignorar a situação"],correct:1,expl:"Persistir além dos meios portáteis atrasa uma escalada necessária e perigosa de atrasar."},
    {q:"No caso de estudo do Fogo do Turbocompressor, a falha do extintor portátil foi um erro?",opts:["Sim, nunca devia ter sido usado","Não, tentá-lo primeiro foi a decisão certa; o erro teria sido persistir em vez de escalar","Sim, devia ter-se usado diretamente o sistema fixo","Não, mas só por sorte"],correct:1,expl:"Tentar o extintor primeiro foi correto; a decisão certa foi escalar de imediato após a sua falha."},
    {q:"Em que consistiram as ações concretas de escalada no caso do Fogo do Turbocompressor?",opts:["Continuar a procurar outro extintor","Alarme geral, escotilhas fechadas, ventilação cortada, válvulas de combustível fechadas","Evacuar de imediato o navio","Só chamar o porto mais próximo"],correct:1,expl:"Estas ações privaram o fogo de oxigénio e combustível, permitindo que se apagasse sem mais ataque direto."},
    {q:"Que etapa do MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) esta lição cobre principalmente?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Esta lição desenvolve a contenção inicial de um fogo nascente com meios portáteis."},
    {q:"Esta lição ensina a química dos agentes extintores em detalhe?",opts:["Sim, em profundidade","Não, o foco está na verificação, na técnica de uso e na decisão, com a química já coberta noutro lugar","Sim, mas só para o CO2","Não, nenhum agente é alguma vez mencionado"],correct:1,expl:"Esta lição mantém-se centrada no uso prático e na decisão, não na química já coberta em Engine."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada no manuseamento real de um extintor?",opts:["Sim, equivale a um treino prático completo","Não, ensina princípios de verificação e decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de decisão, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'A Portable Extinguisher Is Your First Response, Not Your Last Hope' ?",opts:["Il faut toujours le vider avant d'agir autrement","C'est le premier geste possible, jamais la seule solution","Un extincteur éteint toujours n'importe quel feu","Il ne faut jamais l'utiliser"],correct:1,expl:"L'extincteur est un premier moyen d'action, pas une garantie universelle."},
    {q:"Dans STOP-ASSESS-ACT, quand utilise-t-on la technique PASS ?",opts:["Avant STOP","Seulement après STOP et ASSESS","PASS remplace STOP-ASSESS-ACT","Peu importe l'ordre"],correct:1,expl:"PASS est l'exécution, après avoir vérifié sa sécurité et évalué la situation."},
    {q:"Que faire si la fumée réduit fortement la visibilité pendant une attaque ?",opts:["Continuer coûte que coûte","Interrompre immédiatement et se retirer","Ralentir un peu","Fermer les yeux"],correct:1,expl:"Une visibilité fortement réduite impose un retrait immédiat."},
    {q:"Un extincteur correctement utilisé n'arrête pas la croissance du feu. Que faire ?",opts:["Chercher un autre extincteur seul","Escalader immédiatement selon la procédure","Vider un second extincteur","Ignorer et repartir"],correct:1,expl:"Know when to stop fighting and start surviving : l'escalade doit être immédiate."},
    {q:"Quelle étape du MAP Fire Mindset cette leçon couvre-t-elle principalement ?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Cette leçon développe le confinement initial avec les moyens portatifs."},
  ],
  en:[
    {q:"What does 'A Portable Extinguisher Is Your First Response, Not Your Last Hope' mean?",opts:["You must always empty it before acting otherwise","It's the first possible action, never the only solution","An extinguisher always puts out any fire","It should never be used"],correct:1,expl:"The extinguisher is a first means of action, not a universal guarantee."},
    {q:"In STOP-ASSESS-ACT, when do you use the PASS technique?",opts:["Before STOP","Only after STOP and ASSESS","PASS replaces STOP-ASSESS-ACT","Order doesn't matter"],correct:1,expl:"PASS is the execution, after checking safety and assessing the situation."},
    {q:"What do you do if smoke sharply reduces visibility during an attack?",opts:["Keep going no matter what","Stop immediately and retreat","Slow down a bit","Close your eyes"],correct:1,expl:"Sharply reduced visibility requires immediate retreat."},
    {q:"A correctly used extinguisher doesn't stop the fire's growth. What do you do?",opts:["Look for another extinguisher alone","Escalate immediately per procedure","Empty a second extinguisher","Ignore it and leave"],correct:1,expl:"Know when to stop fighting and start surviving: escalation must be immediate."},
    {q:"Which step of the MAP Fire Mindset does this lesson mainly cover?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"This lesson develops initial containment using portable means."},
  ],
  es:[
    {q:"¿Qué significa 'A Portable Extinguisher Is Your First Response, Not Your Last Hope'?",opts:["Siempre hay que vaciarlo antes de actuar de otra forma","Es la primera acción posible, nunca la única solución","Un extintor siempre apaga cualquier fuego","Nunca debe usarse"],correct:1,expl:"El extintor es un primer medio de acción, no una garantía universal."},
    {q:"En STOP-ASSESS-ACT, ¿cuándo se usa la técnica PASS?",opts:["Antes de STOP","Solo después de STOP y ASSESS","PASS sustituye a STOP-ASSESS-ACT","El orden no importa"],correct:1,expl:"PASS es la ejecución, después de comprobar la seguridad y evaluar la situación."},
    {q:"¿Qué hacer si el humo reduce mucho la visibilidad durante un ataque?",opts:["Seguir cueste lo que cueste","Interrumpir de inmediato y retirarse","Ralentizar un poco","Cerrar los ojos"],correct:1,expl:"Una visibilidad muy reducida exige una retirada inmediata."},
    {q:"Un extintor usado correctamente no detiene el crecimiento del fuego. ¿Qué hacer?",opts:["Buscar otro extintor solo","Escalar de inmediato según el procedimiento","Vaciar un segundo extintor","Ignorarlo y marcharse"],correct:1,expl:"Know when to stop fighting and start surviving: la escalada debe ser inmediata."},
    {q:"¿Qué etapa del MAP Fire Mindset cubre principalmente esta lección?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Esta lección desarrolla el confinamiento inicial con medios portátiles."},
  ],
  pt:[
    {q:"O que significa 'A Portable Extinguisher Is Your First Response, Not Your Last Hope'?",opts:["Deve-se sempre esvaziá-lo antes de agir de outra forma","É a primeira ação possível, nunca a única solução","Um extintor sempre apaga qualquer fogo","Nunca deve ser usado"],correct:1,expl:"O extintor é um primeiro meio de ação, não uma garantia universal."},
    {q:"Em STOP-ASSESS-ACT, quando se usa a técnica PASS?",opts:["Antes de STOP","Só depois de STOP e ASSESS","PASS substitui STOP-ASSESS-ACT","A ordem não importa"],correct:1,expl:"PASS é a execução, depois de verificar a segurança e avaliar a situação."},
    {q:"O que fazer se o fumo reduzir muito a visibilidade durante um ataque?",opts:["Continuar custe o que custar","Interromper de imediato e recuar","Abrandar um pouco","Fechar os olhos"],correct:1,expl:"Uma visibilidade muito reduzida exige um recuo imediato."},
    {q:"Um extintor usado corretamente não para o crescimento do fogo. O que fazer?",opts:["Procurar outro extintor sozinho","Escalar de imediato segundo o procedimento","Esvaziar um segundo extintor","Ignorar e sair"],correct:1,expl:"Know when to stop fighting and start surviving: a escalada deve ser imediata."},
    {q:"Que etapa do MAP Fire Mindset esta lição cobre principalmente?",opts:["Detect","Contain","Command","Recover"],correct:1,expl:"Esta lição desenvolve a contenção inicial com meios portáteis."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Saurais-tu reconnaitre le moment precis ou il faut arreter de combattre un feu et commencer a survivre a la place ?",
    en:"Would you know the exact moment to stop fighting a fire and start surviving instead?",
    es:"¿Sabrias reconocer el momento exacto en que hay que dejar de combatir un fuego y empezar a sobrevivir en su lugar?",
    pt:"Saberias reconhecer o momento exato em que se deve parar de combater um fogo e comecar a sobreviver em vez disso?",
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
        {lang==="fr"?"Il n'y a pas de bonne réponse - prends un instant pour y réfléchir.":lang==="en"?"There is no right answer - take a moment to reflect.":lang==="es"?"No hay una respuesta correcta - tómate un momento para reflexionar.":"Não há uma resposta certa - reserva um momento para refletir."}
      </div>
    </div>
  );
}

// TEXT CONTENT
const getContent = lang => {
  const d = {
    fr:{
      badge:"🔥 Safety · Firefighting · Leçon 3/7 · ⭐ Premium",
      title:"Portable Firefighting",
      intro:"Cette leçon n'enseigne pas la chimie des agents, déjà couverte dans Engine. Elle enseigne la décision : vérifier, agir avec méthode, et surtout reconnaître le moment où un extincteur portatif ne suffit plus.",
      p0:"A PORTABLE EXTINGUISHER IS YOUR FIRST RESPONSE, NOT YOUR LAST HOPE",s0t:"Le principe qui structure toute la leçon",
      s0:"Avant même de saisir un extincteur, une question doit toujours se poser : Can I safely fight this fire, or is it already beyond portable firefighting ? L'extincteur est un premier geste, jamais une garantie.\n\nCOMMENT LE RECONNAÎTRE ? Un feu qui continue de croître malgré une attaque correctement réalisée dépasse déjà les moyens portatifs.\nQUE FAIRE IMMÉDIATEMENT ? Vérifier l'appareil, appliquer STOP-ASSESS-ACT, puis PASS si la situation le permet.\nQUELLE ERREUR L'AGGRAVE ? Persister avec un extincteur inefficace au lieu d'escalader.\nQUAND DEMANDER DE L'AIDE ? Dès que l'extincteur ne maîtrise pas le feu en une tentative, jamais après épuisement complet sans résultat.",
      p1:"VÉRIFICATION AVANT USAGE",s1t:"Quelques secondes qui font toute la différence",
      s1:"Manomètre, goupille et scellé, état du tuyau, date de contrôle : un réflexe de vérification avant même de songer à agir.",
      p2:"STOP - ASSESS - ACT",s2t:"Le filtre mental avant PASS",
      s2:"STOP : rester calme. ASSESS : feu naissant ? voie de repli ? seul ? fumée importante ? ACT : seulement alors, utiliser PASS. PASS devient une exécution, pas le début de la réflexion.",
      p3:"LA TECHNIQUE PASS",s3t:"Pull, Aim, Squeeze, Sweep",
      s3:"Dégoupiller, viser la base des flammes, presser fermement, balayer d'un côté à l'autre. Une séquence simple, exécutée seulement après STOP-ASSESS.",
      p4:"DISTANCE ET RETRAIT",s4t:"Un pompier professionnel protège toujours sa propre sécurité",
      s4:"Toujours une sortie derrière soi, ne jamais laisser le feu couper la retraite, approcher dos au vent si possible, et interrompre immédiatement si la fumée ou la chaleur deviennent critiques.",
      p5:"CONNAÎTRE LES LIMITES",s5t:"Le message le plus fort de cette leçon",
      s5:"Un extincteur portatif est conçu pour un feu naissant. Si le feu continue de croître malgré une première attaque correctement réalisée, il faut immédiatement passer au niveau supérieur : alarme, équipe incendie, système fixe, ou évacuation selon les procédures. Le message n'est jamais de continuer jusqu'à vider complètement l'extincteur. Know when to stop fighting and start surviving.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 3",
      sumP:["A Portable Extinguisher Is Your First Response, Not Your Last Hope : jamais la seule solution possible","Vérifier avant usage : manomètre, goupille, tuyau, date de contrôle","STOP-ASSESS-ACT avant PASS : la réflexion précède toujours l'exécution","Toujours une sortie derrière soi, interrompre immédiatement si fumée ou chaleur deviennent critiques","Know when to stop fighting and start surviving : escalader dès que le feu continue de croître"],
      learnedP:["La vérification rapide avant usage","La méthode STOP-ASSESS-ACT","La technique PASS","Le positionnement et le retrait sécurisé","Reconnaître les limites d'un extincteur portatif"],
      transition:"What if a portable extinguisher is no longer enough ?",
      safetyMsg:"Know when to stop fighting and start surviving.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 3/7 · ⭐ Premium",
      title:"Portable Firefighting",
      intro:"This lesson does not teach agent chemistry, already covered in Engine. It teaches decision-making: checking, acting with method, and above all recognizing the moment a portable extinguisher is no longer enough.",
      p0:"A PORTABLE EXTINGUISHER IS YOUR FIRST RESPONSE, NOT YOUR LAST HOPE",s0t:"The principle that structures the whole lesson",
      s0:"Before even grabbing an extinguisher, a question must always be asked: Can I safely fight this fire, or is it already beyond portable firefighting? The extinguisher is a first action, never a guarantee.\n\nHOW DO I RECOGNIZE IT? A fire that keeps growing despite a correctly performed attack has already gone beyond portable means.\nWHAT DO I DO IMMEDIATELY? Check the device, apply STOP-ASSESS-ACT, then PASS if the situation allows.\nWHAT MISTAKE MAKES IT WORSE? Persisting with an ineffective extinguisher instead of escalating.\nWHEN MUST I ASK FOR HELP? As soon as the extinguisher doesn't control the fire in one attempt, never after complete exhaustion with no result.",
      p1:"CHECK BEFORE USE",s1t:"A few seconds that make all the difference",
      s1:"Pressure gauge, pin and seal, hose condition, inspection date: a checking reflex before even thinking of acting.",
      p2:"STOP - ASSESS - ACT",s2t:"The mental filter before PASS",
      s2:"STOP: stay calm. ASSESS: nascent fire? retreat path? alone? significant smoke? ACT: only then, use PASS. PASS becomes execution, not the start of the thinking.",
      p3:"THE PASS TECHNIQUE",s3t:"Pull, Aim, Squeeze, Sweep",
      s3:"Pull the pin, aim at the base of the flames, squeeze firmly, sweep side to side. A simple sequence, executed only after STOP-ASSESS.",
      p4:"DISTANCE AND RETREAT",s4t:"A professional firefighter always protects their own safety",
      s4:"Always an exit behind you, never let the fire cut off your retreat, approach with wind at your back if possible, and stop immediately if smoke or heat becomes critical.",
      p5:"KNOW YOUR LIMITS",s5t:"The strongest message of this lesson",
      s5:"A portable extinguisher is designed for a nascent fire. If the fire keeps growing despite a correctly performed first attack, immediately move to the next level: alarm, fire team, fixed system, or evacuation per procedures. The message is never to keep going until the extinguisher is fully empty. Know when to stop fighting and start surviving.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 3",
      sumP:["A Portable Extinguisher Is Your First Response, Not Your Last Hope: never the only possible solution","Check before use: pressure gauge, pin, hose, inspection date","STOP-ASSESS-ACT before PASS: thinking always precedes execution","Always an exit behind you, stop immediately if smoke or heat become critical","Know when to stop fighting and start surviving: escalate as soon as the fire keeps growing"],
      learnedP:["The quick check before use","The STOP-ASSESS-ACT method","The PASS technique","Safe positioning and retreat","Recognizing the limits of a portable extinguisher"],
      transition:"What if a portable extinguisher is no longer enough?",
      safetyMsg:"Know when to stop fighting and start surviving.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 3/7 · ⭐ Premium",
      title:"Portable Firefighting",
      intro:"Esta lección no enseña la química de los agentes, ya cubierta en Engine. Enseña a decidir: comprobar, actuar con método, y sobre todo reconocer el momento en que un extintor portátil ya no basta.",
      p0:"A PORTABLE EXTINGUISHER IS YOUR FIRST RESPONSE, NOT YOUR LAST HOPE",s0t:"El principio que estructura toda la lección",
      s0:"Incluso antes de coger un extintor, siempre hay que hacerse una pregunta: Can I safely fight this fire, or is it already beyond portable firefighting? El extintor es una primera acción, nunca una garantía.\n\n¿CÓMO RECONOCERLO? Un fuego que sigue creciendo pese a un ataque correctamente realizado ya supera los medios portátiles.\n¿QUÉ HACER DE INMEDIATO? Comprobar el aparato, aplicar STOP-ASSESS-ACT, luego PASS si la situación lo permite.\n¿QUÉ ERROR LO AGRAVA? Persistir con un extintor ineficaz en lugar de escalar.\n¿CUÁNDO PEDIR AYUDA? En cuanto el extintor no controle el fuego en un intento, nunca después de agotarlo por completo sin resultado.",
      p1:"COMPROBACIÓN ANTES DE USAR",s1t:"Unos segundos que marcan toda la diferencia",
      s1:"Manómetro, pasador y precinto, estado de la manguera, fecha de control: un reflejo de comprobación incluso antes de pensar en actuar.",
      p2:"STOP - ASSESS - ACT",s2t:"El filtro mental antes de PASS",
      s2:"STOP: mantener la calma. ASSESS: ¿fuego naciente? ¿vía de repliegue? ¿solo? ¿humo importante? ACT: solo entonces, usar PASS. PASS se convierte en ejecución, no en el inicio de la reflexión.",
      p3:"LA TÉCNICA PASS",s3t:"Pull, Aim, Squeeze, Sweep",
      s3:"Quitar el pasador, apuntar a la base de las llamas, presionar con firmeza, barrer de un lado a otro. Una secuencia simple, ejecutada solo después de STOP-ASSESS.",
      p4:"DISTANCIA Y RETIRADA",s4t:"Un bombero profesional siempre protege su propia seguridad",
      s4:"Siempre una salida detrás de ti, nunca dejar que el fuego corte tu retirada, acercarte con el viento a la espalda si es posible, e interrumpir de inmediato si el humo o el calor se vuelven críticos.",
      p5:"CONOCER LOS LÍMITES",s5t:"El mensaje más fuerte de esta lección",
      s5:"Un extintor portátil está diseñado para un fuego naciente. Si el fuego sigue creciendo pese a un primer ataque correctamente realizado, hay que pasar de inmediato al nivel superior: alarma, equipo de incendios, sistema fijo, o evacuación según los procedimientos. El mensaje nunca es seguir hasta vaciar por completo el extintor. Know when to stop fighting and start surviving.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 3",
      sumP:["A Portable Extinguisher Is Your First Response, Not Your Last Hope: nunca la única solución posible","Comprobar antes de usar: manómetro, pasador, manguera, fecha de control","STOP-ASSESS-ACT antes de PASS: la reflexión siempre precede a la ejecución","Siempre una salida detrás de ti, interrumpir de inmediato si el humo o el calor se vuelven críticos","Know when to stop fighting and start surviving: escalar en cuanto el fuego siga creciendo"],
      learnedP:["La comprobación rápida antes de usar","El método STOP-ASSESS-ACT","La técnica PASS","El posicionamiento y la retirada segura","Reconocer los límites de un extintor portátil"],
      transition:"What if a portable extinguisher is no longer enough?",
      safetyMsg:"Know when to stop fighting and start surviving.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 3/7 · ⭐ Premium",
      title:"Portable Firefighting",
      intro:"Esta lição não ensina a química dos agentes, já coberta em Engine. Ensina a decidir: verificar, agir com método, e sobretudo reconhecer o momento em que um extintor portátil já não basta.",
      p0:"A PORTABLE EXTINGUISHER IS YOUR FIRST RESPONSE, NOT YOUR LAST HOPE",s0t:"O princípio que estrutura toda a lição",
      s0:"Mesmo antes de pegar num extintor, deve sempre fazer-se uma pergunta: Can I safely fight this fire, or is it already beyond portable firefighting? O extintor é uma primeira ação, nunca uma garantia.\n\nCOMO RECONHECER? Um fogo que continua a crescer apesar de um ataque corretamente realizado já ultrapassa os meios portáteis.\nO QUE FAZER IMEDIATAMENTE? Verificar o aparelho, aplicar STOP-ASSESS-ACT, depois PASS se a situação o permitir.\nQUE ERRO O AGRAVA? Persistir com um extintor ineficaz em vez de escalar.\nQUANDO PEDIR AJUDA? Assim que o extintor não controlar o fogo numa tentativa, nunca depois de o esgotar por completo sem resultado.",
      p1:"VERIFICAÇÃO ANTES DE USAR",s1t:"Alguns segundos que fazem toda a diferença",
      s1:"Manómetro, cavilha e selo, estado da mangueira, data de controlo: um reflexo de verificação mesmo antes de pensar em agir.",
      p2:"STOP - ASSESS - ACT",s2t:"O filtro mental antes do PASS",
      s2:"STOP: manter a calma. ASSESS: fogo nascente? via de recuo? sozinho? fumo importante? ACT: só então, usar PASS. PASS torna-se uma execução, não o início da reflexão.",
      p3:"A TÉCNICA PASS",s3t:"Pull, Aim, Squeeze, Sweep",
      s3:"Retirar a cavilha, apontar à base das chamas, apertar com firmeza, varrer de um lado ao outro. Uma sequência simples, executada só depois de STOP-ASSESS.",
      p4:"DISTÂNCIA E RECUO",s4t:"Um bombeiro profissional protege sempre a sua própria segurança",
      s4:"Sempre uma saída atrás de si, nunca deixar que o fogo corte a retirada, aproximar-se com o vento nas costas se possível, e interromper de imediato se o fumo ou o calor se tornarem críticos.",
      p5:"CONHECER OS LIMITES",s5t:"A mensagem mais forte desta lição",
      s5:"Um extintor portátil é concebido para um fogo nascente. Se o fogo continuar a crescer apesar de um primeiro ataque corretamente realizado, é preciso passar de imediato ao nível superior: alarme, equipa de incêndio, sistema fixo, ou evacuação segundo os procedimentos. A mensagem nunca é continuar até esvaziar por completo o extintor. Know when to stop fighting and start surviving.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 3",
      sumP:["A Portable Extinguisher Is Your First Response, Not Your Last Hope: nunca a única solução possível","Verificar antes de usar: manómetro, cavilha, mangueira, data de controlo","STOP-ASSESS-ACT antes de PASS: a reflexão precede sempre a execução","Sempre uma saída atrás de si, interromper de imediato se o fumo ou o calor se tornarem críticos","Know when to stop fighting and start surviving: escalar assim que o fogo continue a crescer"],
      learnedP:["A verificação rápida antes de usar","O método STOP-ASSESS-ACT","A técnica PASS","O posicionamento e o recuo seguro","Reconhecer os limites de um extintor portátil"],
      transition:"What if a portable extinguisher is no longer enough?",
      safetyMsg:"Know when to stop fighting and start surviving.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/7":lang==="en"?"Lesson 3/7":lang==="es"?"Lección 3/7":"Lição 3/7"}</div>
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

            <SL icon="🧯" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔍" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔍</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🔍 {lang==="fr"?"VÉRIFICATION - INTERACTIF":lang==="en"?"CHECK - INTERACTIVE":lang==="es"?"COMPROBACIÓN - INTERACTIVO":"VERIFICAÇÃO - INTERATIVO"}</div><CheckBeforeUseSVG lang={lang}/></Card>

            <SL icon="🧠" text={lc.p2} color={C.gold}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧠</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧠 {lang==="fr"?"STOP-ASSESS-ACT - INTERACTIF":lang==="en"?"STOP-ASSESS-ACT - INTERACTIVE":lang==="es"?"STOP-ASSESS-ACT - INTERACTIVO":"STOP-ASSESS-ACT - INTERATIVO"}</div><StopAssessActSVG lang={lang}/></Card>

            <SL icon="🧯" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧯 {lang==="fr"?"TECHNIQUE PASS - INTERACTIF":lang==="en"?"PASS TECHNIQUE - INTERACTIVE":lang==="es"?"TÉCNICA PASS - INTERACTIVO":"TÉCNICA PASS - INTERATIVO"}</div><PassTechniqueSVG lang={lang}/></Card>

            <SL icon="🚪" text={lc.p4} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚪</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🚪 {lang==="fr"?"DISTANCE & RETRAIT - INTERACTIF":lang==="en"?"DISTANCE & RETREAT - INTERACTIVE":lang==="es"?"DISTANCIA Y RETIRADA - INTERACTIVO":"DISTÂNCIA E RECUO - INTERATIVO"}</div><DistanceRetreatSVG lang={lang}/></Card>

            <SL icon="🛑" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}`,background:"linear-gradient(135deg,rgba(201,146,42,0.12),rgba(13,31,60,0.85))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛑</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.green}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

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
                {lang==="fr"?"Quiz Final - Extincteurs Portatifs":lang==="en"?"Final Quiz - Portable Firefighting":lang==="es"?"Quiz Final - Extinción Portátil":"Quiz Final - Extinção Portátil"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/7":"questions · Lesson 3/7"}</div>
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
                <span style={{fontSize:20}}>🔥</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 - SYSTÈMES FIXES →":lang==="en"?"LESSON 4 - FIXED SYSTEMS →":lang==="es"?"LECCIÓN 4 - SISTEMAS FIJOS →":"LIÇÃO 4 - SISTEMAS FIXOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
