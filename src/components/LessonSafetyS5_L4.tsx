import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - THE DECISION TO ABANDON SHIP (THE LAST OPTION)
function DecisionToAbandonSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔥", label:{fr:"Lutte contre l'incendie épuisée",en:"Firefighting exhausted",es:"Lucha contra el incendio agotada",pt:"Combate ao incêndio esgotado"}, desc:{fr:"Toutes les options de confinement et d'extinction ont été tentées sans succès, comme vu dans le module Firefighting.",en:"All containment and extinguishing options have been tried without success, as seen in the Firefighting module.",es:"Se han intentado todas las opciones de contención y extinción sin éxito, como se vio en el módulo Firefighting.",pt:"Todas as opções de contenção e extinção foram tentadas sem sucesso, como visto no módulo Firefighting."} },
    { id:2, icon:"🌊", label:{fr:"Voies d'eau non maîtrisées",en:"Uncontrolled flooding",es:"Vías de agua no controladas",pt:"Vias de água não controladas"}, desc:{fr:"Le contrôle des avaries et le colmatage n'ont pas suffi à stopper l'envahissement progressif du navire.",en:"Damage control and patching have not been enough to stop the ship's progressive flooding.",es:"El control de averías y el taponamiento no han bastado para detener la inundación progresiva del buque.",pt:"O controlo de avarias e a vedação não bastaram para parar o alagamento progressivo do navio."} },
    { id:3, icon:"⚖️", label:{fr:"Stabilité compromise",en:"Stability compromised",es:"Estabilidad comprometida",pt:"Estabilidade comprometida"}, desc:{fr:"La gîte ou l'assiette du navire atteint un point où sa flottabilité et son intégrité structurelle ne sont plus garanties.",en:"The ship's list or trim reaches a point where its buoyancy and structural integrity are no longer guaranteed.",es:"La escora o el asiento del buque alcanza un punto en el que su flotabilidad e integridad estructural ya no están garantizadas.",pt:"O adornamento ou o caimento do navio atinge um ponto em que a sua flutuabilidade e integridade estrutural já não estão garantidas."} },
    { id:4, icon:"🚨", label:{fr:"L'abandon, une décision de dernier recours",en:"Abandonment, a last-resort decision",es:"El abandono, una decisión de último recurso",pt:"O abandono, uma decisão de último recurso"}, desc:{fr:"L'ordre d'abandon signifie que toutes les autres solutions ont échoué. Ce n'est jamais un premier réflexe, toujours une conclusion.",en:"The abandon order means all other solutions have failed. It is never a first reflex, always a conclusion.",es:"La orden de abandono significa que todas las demás soluciones han fallado. Nunca es un primer reflejo, siempre una conclusión.",pt:"A ordem de abandono significa que todas as outras soluções falharam. Nunca é um primeiro reflexo, sempre uma conclusão."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Une fois la décision prise, le moindre retard devient l'ennemi le plus dangereux.":lang==="en"?"Once the decision is made, any delay becomes the most dangerous enemy.":lang==="es"?"Una vez tomada la decisión, cualquier retraso se convierte en el enemigo más peligroso.":"Uma vez tomada a decisão, qualquer atraso torna-se o inimigo mais perigoso."}</div>
    </div>
  );
}

// SVG 2 - MUSTER DISCIPLINE
function MusterDisciplineSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📢", label:{fr:"Rassemblement immédiat",en:"Immediate muster",es:"Reunión inmediata",pt:"Reunião imediata"}, desc:{fr:"Chacun rejoint son poste de rassemblement dès le signal, sans détour ni délai, avec gilet de sauvetage.",en:"Everyone reaches their muster station as soon as the signal sounds, without detour or delay, wearing a life jacket.",es:"Todos llegan a su puesto de reunión en cuanto suena la señal, sin desvíos ni demoras, con chaleco salvavidas.",pt:"Cada um chega ao seu posto de reunião assim que soa o sinal, sem desvios nem atrasos, com colete salva-vidas."} },
    { id:2, icon:"📋", label:{fr:"Appel nominal complet",en:"Full head count",es:"Recuento nominal completo",pt:"Chamada nominal completa"}, desc:{fr:"L'appel nominal permet d'identifier immédiatement toute personne manquante, avant même l'embarquement.",en:"The head count immediately identifies anyone missing, even before boarding begins.",es:"El recuento nominal permite identificar de inmediato a cualquier persona ausente, incluso antes del embarque.",pt:"A chamada nominal permite identificar de imediato qualquer pessoa em falta, mesmo antes do embarque."} },
    { id:3, icon:"🚫", label:{fr:"Éviter l'embarquement désordonné",en:"Avoiding disorderly boarding",es:"Evitar el embarque desordenado",pt:"Evitar o embarque desordenado"}, desc:{fr:"Un rassemblement structuré empêche la précipitation et la surcharge d'une seule embarcation pendant que d'autres restent vides.",en:"A structured muster prevents rushing and overloading a single boat while others remain empty.",es:"Una reunión estructurada impide la precipitación y la sobrecarga de una sola embarcación mientras otras quedan vacías.",pt:"Uma reunião estruturada impede a pressa e a sobrecarga de uma única embarcação enquanto outras ficam vazias."} },
    { id:4, icon:"🗂️", label:{fr:"Préparer les responsabilités",en:"Preparing responsibilities",es:"Preparar las responsabilidades",pt:"Preparar as responsabilidades"}, desc:{fr:"C'est au rassemblement que les rôles se répartissent : qui embarque où, qui assiste qui, avant même de descendre vers les embarcations.",en:"It's at the muster station that roles are assigned: who boards where, who assists whom, even before heading toward the boats.",es:"Es en la reunión donde se reparten los roles: quién embarca dónde, quién ayuda a quién, incluso antes de bajar hacia las embarcaciones.",pt:"É na reunião que os papéis se distribuem: quem embarca onde, quem ajuda quem, mesmo antes de descer para as embarcações."} },
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
    </div>
  );
}

// SVG 3 - TURNING A GROUP INTO AN ORGANIZED EVACUATION
function OrganizedEvacuationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🛟", label:{fr:"Mobiliser canots et radeaux ensemble",en:"Mobilizing lifeboats and liferafts together",es:"Movilizar botes y balsas juntos",pt:"Mobilizar botes e jangadas juntos"}, desc:{fr:"Les compétences de lancement (Leçon 1) et de déploiement (Leçon 2) s'appliquent simultanément, sur plusieurs embarcations à la fois.",en:"Launching skills (Lesson 1) and deployment skills (Lesson 2) apply simultaneously, across several craft at once.",es:"Las habilidades de lanzamiento (Lección 1) y de despliegue (Lección 2) se aplican simultáneamente, en varias embarcaciones a la vez.",pt:"As competências de lançamento (Lição 1) e de implantação (Lição 2) aplicam-se simultaneamente, em várias embarcações ao mesmo tempo."} },
    { id:2, icon:"👤", label:{fr:"Un responsable par embarcation",en:"One person in charge per craft",es:"Un responsable por embarcación",pt:"Um responsável por embarcação"}, desc:{fr:"Chaque canot ou radeau a besoin d'une personne clairement identifiée pour prendre les décisions locales, sans attendre d'instructions centralisées.",en:"Every boat or raft needs one clearly identified person to make local decisions, without waiting for centralized instructions.",es:"Cada bote o balsa necesita una persona claramente identificada para tomar decisiones locales, sin esperar instrucciones centralizadas.",pt:"Cada bote ou jangada precisa de uma pessoa claramente identificada para tomar decisões locais, sem esperar instruções centralizadas."} },
    { id:3, icon:"🧩", label:{fr:"D'un groupe à une évacuation",en:"From a group to an evacuation",es:"De un grupo a una evacuación",pt:"De um grupo a uma evacuação"}, desc:{fr:"Le véritable défi n'est pas technique : c'est transformer des individus dispersés en une évacuation coordonnée, où chacun sait ce qu'il doit faire.",en:"The real challenge isn't technical: it's turning scattered individuals into a coordinated evacuation, where everyone knows what to do.",es:"El verdadero desafío no es técnico: es transformar individuos dispersos en una evacuación coordinada, donde cada uno sabe qué hacer.",pt:"O verdadeiro desafio não é técnico: é transformar indivíduos dispersos numa evacuação coordenada, onde cada um sabe o que fazer."} },
    { id:4, icon:"⏳", label:{fr:"Décider sous pression",en:"Deciding under pressure",es:"Decidir bajo presión",pt:"Decidir sob pressão"}, desc:{fr:"Le temps presse, les conditions se dégradent, et pourtant chaque décision doit rester structurée, jamais improvisée dans la panique.",en:"Time is short, conditions are worsening, and yet every decision must stay structured, never improvised in panic.",es:"El tiempo apremia, las condiciones empeoran, y sin embargo cada decisión debe seguir siendo estructurada, nunca improvisada en el pánico.",pt:"O tempo urge, as condições pioram, e ainda assim cada decisão deve permanecer estruturada, nunca improvisada em pânico."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 4 - SURVIVAL LEADERSHIP (KEEPING THE GROUP ALIVE)
function SurvivalLeadershipSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧘", label:{fr:"Maintenir le calme",en:"Maintaining calm",es:"Mantener la calma",pt:"Manter a calma"}, desc:{fr:"L'attitude du responsable influence directement celle du groupe : un ton posé rassure bien plus qu'un ordre crié.",en:"The leader's attitude directly influences the group's: a steady tone reassures far more than a shouted order.",es:"La actitud del responsable influye directamente en la del grupo: un tono sereno tranquiliza mucho más que una orden gritada.",pt:"A atitude do responsável influencia diretamente a do grupo: um tom sereno tranquiliza muito mais do que uma ordem gritada."} },
    { id:2, icon:"🤝", label:{fr:"Éviter les conflits",en:"Avoiding conflict",es:"Evitar los conflictos",pt:"Evitar conflitos"}, desc:{fr:"La tension monte naturellement dans un espace confiné et incertain : désamorcer les désaccords tôt évite qu'ils ne s'aggravent.",en:"Tension naturally rises in a confined, uncertain space: defusing disagreements early prevents them from worsening.",es:"La tensión aumenta naturalmente en un espacio confinado e incierto: desactivar los desacuerdos pronto evita que empeoren.",pt:"A tensão sobe naturalmente num espaço confinado e incerto: desarmar os desacordos cedo evita que piorem."} },
    { id:3, icon:"🕯️", label:{fr:"Préserver l'espoir",en:"Preserving hope",es:"Preservar la esperanza",pt:"Preservar a esperança"}, desc:{fr:"Sans jamais mentir sur la situation, rappeler que les secours ont été alertés et que la discipline augmente réellement les chances de survie.",en:"Without ever lying about the situation, reminding everyone that rescue has been alerted and that discipline genuinely increases survival chances.",es:"Sin mentir nunca sobre la situación, recordar que el rescate ha sido alertado y que la disciplina aumenta realmente las posibilidades de supervivencia.",pt:"Sem nunca mentir sobre a situação, lembrar que o socorro foi alertado e que a disciplina aumenta realmente as hipóteses de sobrevivência."} },
    { id:4, icon:"👁️", label:{fr:"Organiser les tours de veille",en:"Organizing watch rotations",es:"Organizar los turnos de vigilancia",pt:"Organizar os turnos de vigia"}, desc:{fr:"Répartir la surveillance et le repos évite l'épuisement de tous en même temps, tout en gardant une vigilance constante.",en:"Distributing watch and rest prevents everyone from exhausting themselves at once, while keeping constant vigilance.",es:"Repartir la vigilancia y el descanso evita que todos se agoten a la vez, manteniendo una vigilancia constante.",pt:"Distribuir a vigilância e o descanso evita que todos se esgotem ao mesmo tempo, mantendo uma vigilância constante."} },
    { id:5, icon:"⚖️", label:{fr:"Gérer les ressources",en:"Managing resources",es:"Gestionar los recursos",pt:"Gerir os recursos"}, desc:{fr:"Lien direct avec la Leçon 3 : rationnement, énergie, moral, matériel - un leader continue d'appliquer cette discipline jusqu'au secours.",en:"Direct link to Lesson 3: rationing, energy, morale, equipment - a leader keeps applying this discipline until rescue arrives.",es:"Enlace directo con la Lección 3: racionamiento, energía, moral, material - un líder sigue aplicando esta disciplina hasta el rescate.",pt:"Ligação direta com a Lição 3: racionamento, energia, moral, material - um líder continua a aplicar esta disciplina até ao socorro."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.green:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le leadership ne consiste pas seulement à donner des ordres. Il consiste à maintenir le groupe vivant.":lang==="en"?"Leadership is not just about giving orders. It is about keeping the group alive.":lang==="es"?"El liderazgo no consiste solo en dar órdenes. Consiste en mantener vivo al grupo.":"A liderança não consiste apenas em dar ordens. Consiste em manter o grupo vivo."}</div>
    </div>
  );
}

// EXERCISE - ABANDON SHIP & LEADERSHIP DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Un feu est en cours de maîtrise et les voies d'eau sont contrôlées. Le commandant doit-il envisager l'abandon du navire ?\na) Oui, systématiquement dès qu'un incident survient\nb) Non, l'abandon reste la dernière option, réservée à l'échec des autres solutions\nc) Oui, mais uniquement si l'équipage le demande"},
      {id:"q2",q:"L'ordre d'abandon vient d'être donné. Que faites-vous en priorité au poste de rassemblement ?\na) Effectuer l'appel nominal complet avant tout embarquement\nb) Se précipiter vers le premier canot disponible\nc) Attendre les instructions individuelles de chaque passager"},
      {id:"q3",q:"Vous êtes désigné responsable d'un radeau après l'évacuation. Un désaccord éclate entre deux occupants sur la répartition de l'eau. Que faites-vous ?\na) Ignorer la situation, elle se résoudra seule\nb) Laisser les deux personnes régler cela entre elles sans intervenir\nc) Désamorcer le conflit rapidement et rappeler la discipline de rationnement déjà établie"},
      {id:"q4",q:"Que signifie le principe 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' ?\na) Le leadership s'arrête dès que l'ordre d'abandon est donné\nb) Le leadership devient encore plus essentiel après l'abandon, jusqu'au secours final\nc) Ce principe ne concerne que le commandant, jamais les autres membres d'équipage"},
    ],
    en:[
      {id:"q1",q:"A fire is being brought under control and flooding is contained. Should the captain consider abandoning ship?\na) Yes, systematically as soon as an incident occurs\nb) No, abandonment remains the last option, reserved for when other solutions have failed\nc) Yes, but only if the crew requests it"},
      {id:"q2",q:"The abandon order has just been given. What do you do as a priority at the muster station?\na) Perform the full head count before any boarding\nb) Rush toward the first available boat\nc) Wait for individual instructions for each passenger"},
      {id:"q3",q:"You are designated in charge of a raft after evacuation. A disagreement breaks out between two occupants over water distribution. What do you do?\na) Ignore the situation, it will resolve itself\nb) Let the two people sort it out between themselves without intervening\nc) Quickly defuse the conflict and remind them of the rationing discipline already established"},
      {id:"q4",q:"What does the principle 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' mean?\na) Leadership stops as soon as the abandon order is given\nb) Leadership becomes even more essential after abandonment, until final rescue\nc) This principle only concerns the captain, never other crew members"},
    ],
    es:[
      {id:"q1",q:"Un fuego está siendo controlado y las vías de agua están contenidas. ¿Debe el capitán considerar el abandono del buque?\na) Sí, sistemáticamente en cuanto ocurre un incidente\nb) No, el abandono sigue siendo la última opción, reservada para cuando las demás soluciones han fallado\nc) Sí, pero solo si la tripulación lo pide"},
      {id:"q2",q:"Se acaba de dar la orden de abandono. ¿Qué haces con prioridad en el puesto de reunión?\na) Realizar el recuento nominal completo antes de cualquier embarque\nb) Correr hacia el primer bote disponible\nc) Esperar instrucciones individuales para cada pasajero"},
      {id:"q3",q:"Estás designado responsable de una balsa tras la evacuación. Estalla un desacuerdo entre dos ocupantes sobre el reparto de agua. ¿Qué haces?\na) Ignorar la situación, se resolverá sola\nb) Dejar que las dos personas lo resuelvan entre ellas sin intervenir\nc) Desactivar el conflicto rápidamente y recordar la disciplina de racionamiento ya establecida"},
      {id:"q4",q:"¿Qué significa el principio 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?\na) El liderazgo se detiene en cuanto se da la orden de abandono\nb) El liderazgo se vuelve aún más esencial tras el abandono, hasta el rescate final\nc) Este principio solo concierne al capitán, nunca a otros miembros de la tripulación"},
    ],
    pt:[
      {id:"q1",q:"Um fogo está a ser controlado e as vias de água estão contidas. O comandante deve considerar o abandono do navio?\na) Sim, sistematicamente assim que ocorre um incidente\nb) Não, o abandono continua a ser a última opção, reservada para quando as outras soluções falharam\nc) Sim, mas só se a tripulação o pedir"},
      {id:"q2",q:"A ordem de abandono acabou de ser dada. O que fazes com prioridade no posto de reunião?\na) Fazer a chamada nominal completa antes de qualquer embarque\nb) Correr para o primeiro bote disponível\nc) Esperar instruções individuais para cada passageiro"},
      {id:"q3",q:"Foste designado responsável por uma jangada após a evacuação. Rebenta um desacordo entre dois ocupantes sobre a distribuição da água. O que fazes?\na) Ignorar a situação, resolve-se sozinha\nb) Deixar que as duas pessoas resolvam isso entre elas sem intervir\nc) Desarmar o conflito rapidamente e relembrar a disciplina de racionamento já estabelecida"},
      {id:"q4",q:"O que significa o princípio 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?\na) A liderança para assim que a ordem de abandono é dada\nb) A liderança torna-se ainda mais essencial após o abandono, até ao socorro final\nc) Este princípio só diz respeito ao comandante, nunca aos outros membros da tripulação"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (COSTA CONCORDIA, 2012)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Costa Concordia",teaser:"Cas réel documenté - ordre d'abandon tardif, condamnation pénale confirmée en appel",
      what:"Le 13 janvier 2012, le paquebot Costa Concordia heurte un rocher au large de l'île du Giglio, en Italie. L'ordre d'abandon du navire n'est donné qu'environ une heure après l'impact, alors que les règles internationales prévoient une évacuation complète en 30 minutes. Ce retard laisse le temps à la gîte du navire de s'aggraver, rendant plusieurs canots inutilisables du côté incliné. Le commandant quitte le navire alors qu'environ 300 personnes s'y trouvent encore, refusant même l'ordre d'un officier des garde-côtes de remonter à bord pour superviser l'évacuation. Trente-deux personnes perdent la vie. Le commandant est reconnu coupable d'homicide involontaire, de naufrage et d'abandon de navire, condamné à 16 ans de prison, une peine confirmée par la Cour de cassation italienne en 2017.",
      cause:"• Ordre d'abandon donné avec plus d'une heure de retard après l'impact initial\n• La gîte du navire s'est aggravée pendant ce délai, rendant plusieurs canots inutilisables\n• Le commandant a quitté le navire avant la fin de l'évacuation, malgré environ 300 personnes encore à bord\n• Un officier des garde-côtes a ordonné au commandant de remonter à bord ; il a refusé",
      lessons:"✓ Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most : le leadership était exigé jusqu'au dernier instant, pas seulement jusqu'à la décision d'abandon\n✓ Un retard dans l'ordre d'abandon peut rendre inutilisables des embarcations qui auraient pu être lancées à temps\n✓ Le commandant reste responsable jusqu'à ce que l'évacuation soit complète, jamais avant\n✓ Ce cas illustre directement pourquoi la décision d'abandon et le leadership qui l'accompagne ne peuvent jamais être improvisés",
      link:"🔗 Ce cas montre qu'un abandon réussi dépend autant de la rapidité de la décision que de la discipline du commandement jusqu'au bout de l'évacuation."},
    en:{title:"Case Study - Costa Concordia",teaser:"Real documented case - delayed abandon order, criminal conviction upheld on appeal",
      what:"On January 13, 2012, the cruise ship Costa Concordia struck a rock off the coast of Giglio Island, Italy. The order to abandon ship was not given until about an hour after impact, while international rules call for a complete evacuation within 30 minutes. This delay gave time for the ship's list to worsen, rendering several lifeboats unusable on the listing side. The captain left the ship while approximately 300 people were still aboard, even refusing a coast guard officer's order to return aboard to oversee the evacuation. Thirty-two people died. The captain was found guilty of manslaughter, causing the shipwreck, and abandoning ship, sentenced to 16 years in prison, a sentence upheld by Italy's Supreme Court of Cassation in 2017.",
      cause:"• The abandon order was given more than an hour after the initial impact\n• The ship's list worsened during this delay, rendering several lifeboats unusable\n• The captain left the ship before the evacuation was complete, despite roughly 300 people still aboard\n• A coast guard officer ordered the captain to return aboard; he refused",
      lessons:"✓ Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most: leadership was required until the very last moment, not just up to the abandon decision\n✓ A delay in the abandon order can render unusable boats that could have been launched in time\n✓ The captain remains responsible until the evacuation is complete, never before\n✓ This case directly illustrates why the abandon decision and the leadership accompanying it can never be improvised",
      link:"🔗 This case shows that a successful abandonment depends as much on the speed of the decision as on the discipline of command through to the end of the evacuation."},
    es:{title:"Caso de estudio - Costa Concordia",teaser:"Caso real documentado - orden de abandono tardía, condena penal confirmada en apelación",
      what:"El 13 de enero de 2012, el crucero Costa Concordia chocó contra una roca frente a la isla de Giglio, en Italia. La orden de abandono del buque no se dio hasta cerca de una hora después del impacto, cuando las normas internacionales prevén una evacuación completa en 30 minutos. Este retraso dio tiempo a que la escora del buque empeorara, dejando inutilizables varios botes del lado inclinado. El capitán abandonó el buque mientras unas 300 personas seguían a bordo, negándose incluso a la orden de un oficial de guardacostas de volver a bordo para supervisar la evacuación. Treinta y dos personas murieron. El capitán fue declarado culpable de homicidio involuntario, de causar el naufragio y de abandonar el buque, condenado a 16 años de prisión, una pena confirmada por el Tribunal de Casación italiano en 2017.",
      cause:"• La orden de abandono se dio más de una hora después del impacto inicial\n• La escora del buque empeoró durante este retraso, dejando inutilizables varios botes\n• El capitán abandonó el buque antes de que la evacuación estuviera completa, pese a que unas 300 personas seguían a bordo\n• Un oficial de guardacostas ordenó al capitán volver a bordo; se negó",
      lessons:"✓ Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most: el liderazgo era exigido hasta el último instante, no solo hasta la decisión de abandono\n✓ Un retraso en la orden de abandono puede dejar inutilizables embarcaciones que podrían haberse lanzado a tiempo\n✓ El capitán sigue siendo responsable hasta que la evacuación esté completa, nunca antes\n✓ Este caso ilustra directamente por qué la decisión de abandono y el liderazgo que la acompaña nunca pueden improvisarse",
      link:"🔗 Este caso muestra que un abandono exitoso depende tanto de la rapidez de la decisión como de la disciplina del mando hasta el final de la evacuación."},
    pt:{title:"Caso de estudo - Costa Concordia",teaser:"Caso real documentado - ordem de abandono tardia, condenação penal confirmada em recurso",
      what:"Em 13 de janeiro de 2012, o navio de cruzeiro Costa Concordia embateu numa rocha ao largo da ilha de Giglio, na Itália. A ordem de abandono do navio só foi dada cerca de uma hora depois do impacto, quando as regras internacionais preveem uma evacuação completa em 30 minutos. Este atraso deu tempo a que o adornamento do navio piorasse, tornando vários botes inutilizáveis do lado inclinado. O comandante abandonou o navio enquanto cerca de 300 pessoas ainda estavam a bordo, recusando mesmo a ordem de um oficial da guarda costeira para regressar a bordo e supervisionar a evacuação. Trinta e duas pessoas morreram. O comandante foi considerado culpado de homicídio involuntário, de causar o naufrágio e de abandonar o navio, condenado a 16 anos de prisão, uma pena confirmada pelo Supremo Tribunal de Cassação italiano em 2017.",
      cause:"• A ordem de abandono foi dada mais de uma hora depois do impacto inicial\n• O adornamento do navio piorou durante este atraso, tornando vários botes inutilizáveis\n• O comandante abandonou o navio antes de a evacuação estar completa, apesar de cerca de 300 pessoas ainda estarem a bordo\n• Um oficial da guarda costeira ordenou ao comandante que regressasse a bordo; ele recusou",
      lessons:"✓ Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most: a liderança era exigida até ao último instante, não apenas até à decisão de abandono\n✓ Um atraso na ordem de abandono pode tornar inutilizáveis botes que poderiam ter sido lançados a tempo\n✓ O comandante continua responsável até a evacuação estar completa, nunca antes\n✓ Este caso ilustra diretamente por que a decisão de abandono e a liderança que a acompanha nunca podem ser improvisadas",
      link:"🔗 Este caso mostra que um abandono bem-sucedido depende tanto da rapidez da decisão como da disciplina do comando até ao fim da evacuação."},
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

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Que signifie le principe 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' ?",opts:["Le leadership n'a plus d'importance une fois l'ordre donné","Le leadership devient encore plus essentiel après l'abandon, jusqu'au secours final","Ce principe ne concerne que le commandant","Le leadership s'arrête à l'embarquement"],correct:1,expl:"C'est après l'abandon, pendant l'attente du secours, que le leadership compte le plus."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Présenter uniquement la procédure technique d'abandon","Répondre à la question : comment quitter un navire de manière organisée pour maximiser les chances de survie de tout l'équipage","Enseigner l'historique des naufrages célèbres","Présenter les règlements SOLAS en détail"],correct:1,expl:"Le véritable sujet est la prise de décision et le leadership sous pression, pas une simple procédure."},
    {q:"Quand l'ordre d'abandon doit-il être envisagé ?",opts:["Dès le moindre incident à bord","Uniquement quand toutes les autres solutions (incendie, voies d'eau, stabilisation) ont échoué","Chaque fois que l'équipage le demande","Systématiquement en cas de mauvais temps"],correct:1,expl:"L'abandon signifie que toutes les autres solutions ont échoué, jamais un premier réflexe."},
    {q:"Que permet le rassemblement au-delà du simple comptage ?",opts:["Rien de plus que vérifier les présences","Identifier les personnes manquantes, éviter l'embarquement désordonné, et préparer les responsabilités","Uniquement distribuer les gilets de sauvetage","Retarder l'évacuation le plus possible"],correct:1,expl:"Le rassemblement structure toute la suite de l'évacuation, bien au-delà du simple comptage."},
    {q:"Pourquoi un embarquement désordonné est-il dangereux ?",opts:["Il ne présente aucun risque réel","Il peut surcharger une seule embarcation pendant que d'autres restent vides","Il accélère toujours l'évacuation","Il ne concerne que les grands navires"],correct:1,expl:"La précipitation et la surcharge d'une seule embarcation compromettent l'ensemble de l'évacuation."},
    {q:"Que signifie transformer un groupe en une évacuation organisée ?",opts:["Attendre que chacun agisse spontanément","Coordonner les compétences de lancement et de déploiement pour que chacun sache ce qu'il doit faire","Laisser le commandant tout gérer seul","Ignorer les instructions déjà données"],correct:1,expl:"Le véritable défi n'est pas technique, c'est la coordination de personnes dispersées en une réponse cohérente."},
    {q:"Pourquoi chaque canot ou radeau a-t-il besoin d'un responsable clairement désigné ?",opts:["Ce n'est pas nécessaire si le groupe est calme","Pour prendre des décisions locales sans attendre d'instructions centralisées, impossibles une fois dispersés","Uniquement pour respecter une formalité administrative","Le commandant décide toujours pour toutes les embarcations à la fois"],correct:1,expl:"Une fois dispersées, les embarcations ne peuvent plus recevoir d'instructions centralisées en temps réel."},
    {q:"Que comprend le leadership après l'abandon, selon cette leçon ?",opts:["Uniquement donner des ordres fermes","Maintenir le calme, éviter les conflits, préserver l'espoir, organiser les tours de veille, gérer les ressources","Uniquement surveiller l'horizon","Rien de plus que la survie individuelle de chacun"],correct:1,expl:"Le leadership consiste à maintenir le groupe vivant, pas seulement à donner des instructions."},
    {q:"Pourquoi désamorcer rapidement un conflit à bord d'un radeau ou canot ?",opts:["Ce n'est pas important dans une situation de survie","La tension monte naturellement dans un espace confiné, et un désaccord non géré peut s'aggraver rapidement","Les conflits se résolvent toujours d'eux-mêmes","Uniquement pertinent pour de longs voyages"],correct:1,expl:"Un espace confiné et incertain amplifie les tensions, qu'il faut désamorcer avant qu'elles ne s'aggravent."},
    {q:"Que signifie 'préserver l'espoir sans jamais mentir sur la situation' ?",opts:["Cacher la gravité réelle de la situation au groupe","Rappeler honnêtement que les secours ont été alertés et que la discipline augmente réellement les chances","Promettre un sauvetage rapide même sans certitude","Ne jamais parler de la situation avec le groupe"],correct:1,expl:"L'espoir se construit sur des faits honnêtes, jamais sur des promesses fausses."},
    {q:"Quel est le lien entre le leadership de survie et la Leçon 3 ?",opts:["Aucun lien direct","La gestion des ressources (rationnement, énergie, moral, matériel) reste une responsabilité continue du leader jusqu'au secours","La Leçon 3 ne concerne que l'équipement technique","Le leadership remplace entièrement la gestion des ressources"],correct:1,expl:"Le leader continue d'appliquer la discipline de gestion des ressources vue en Leçon 3, jusqu'au bout."},
    {q:"Dans le cas du Costa Concordia, combien de temps s'est écoulé avant que l'ordre d'abandon ne soit donné ?",opts:["Quelques minutes seulement","Environ une heure après l'impact initial","Plusieurs jours","L'ordre a été donné immédiatement"],correct:1,expl:"L'ordre a été donné environ une heure après l'impact, bien au-delà des 30 minutes prévues par les règles internationales."},
    {q:"Quelle conséquence directe ce retard a-t-il eue sur les canots de sauvetage ?",opts:["Aucune conséquence particulière","La gîte du navire s'est aggravée pendant ce délai, rendant plusieurs canots inutilisables du côté incliné","Les canots ont fonctionné normalement malgré le retard","Le retard a permis de mieux préparer l'évacuation"],correct:1,expl:"Le retard a laissé le temps à la gîte de s'aggraver, compromettant l'usage de plusieurs canots."},
    {q:"Le commandant du Costa Concordia est-il resté à bord jusqu'à la fin de l'évacuation ?",opts:["Oui, jusqu'au dernier passager","Non, il a quitté le navire alors qu'environ 300 personnes s'y trouvaient encore, refusant même l'ordre de remonter à bord","Oui, mais uniquement après avoir supervisé l'évacuation complète","Non, mais il a été sauvé en dernier"],correct:1,expl:"Il a quitté le navire prématurément, condamné pénalement pour cette raison entre autres."},
    {q:"Quelle est la version finale du MAP Survival Mindset pour ce module ?",opts:["Detect → Alarm → Contain → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead uniquement","Launch → Deploy → Survive uniquement"],correct:1,expl:"Cette progression suit la chronologie réelle d'un abandon de navire, de la préparation jusqu'au leadership de survie."},
    {q:"Ce module enseigne-t-il un substitut à une formation SOLAS pratique certifiée à la conduite réelle d'un abandon de navire ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne des principes de décision et de leadership, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les commandants","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de décision et de leadership, jamais un remplacement de la formation SOLAS pratique."},
  ],
  en:[
    {q:"What does the principle 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' mean?",opts:["Leadership no longer matters once the order is given","Leadership becomes even more essential after abandonment, until final rescue","This principle only concerns the captain","Leadership stops at boarding"],correct:1,expl:"It is after abandonment, while awaiting rescue, that leadership matters most."},
    {q:"What is the exact mission of this lesson?",opts:["Only present the technical abandonment procedure","Answer the question: how to leave a ship in an organized way to maximize survival chances for the entire crew","Teach the history of famous shipwrecks","Present SOLAS regulations in detail"],correct:1,expl:"The real subject is decision-making and leadership under pressure, not just a procedure."},
    {q:"When should the abandon order be considered?",opts:["At the slightest incident aboard","Only when all other solutions (fire, flooding, stabilization) have failed","Whenever the crew requests it","Systematically in bad weather"],correct:1,expl:"Abandonment means all other solutions have failed, never a first reflex."},
    {q:"What does mustering allow beyond simple headcounting?",opts:["Nothing more than checking presence","Identifying missing persons, avoiding disorderly boarding, and preparing responsibilities","Only distributing life jackets","Delaying evacuation as much as possible"],correct:1,expl:"Mustering structures the whole rest of the evacuation, well beyond simple counting."},
    {q:"Why is disorderly boarding dangerous?",opts:["It presents no real risk","It can overload a single boat while others remain empty","It always speeds up evacuation","It only concerns large ships"],correct:1,expl:"Rushing and overloading a single craft compromises the entire evacuation."},
    {q:"What does turning a group into an organized evacuation mean?",opts:["Waiting for everyone to act spontaneously","Coordinating launching and deployment skills so everyone knows what to do","Letting the captain manage everything alone","Ignoring instructions already given"],correct:1,expl:"The real challenge isn't technical, it's coordinating scattered people into a coherent response."},
    {q:"Why does every boat or raft need a clearly designated person in charge?",opts:["It isn't necessary if the group is calm","To make local decisions without waiting for centralized instructions, impossible once scattered","Only to follow an administrative formality","The captain always decides for all craft at once"],correct:1,expl:"Once scattered, craft can no longer receive real-time centralized instructions."},
    {q:"What does leadership after abandonment include, according to this lesson?",opts:["Only giving firm orders","Maintaining calm, avoiding conflict, preserving hope, organizing watch rotations, managing resources","Only watching the horizon","Nothing more than each person's individual survival"],correct:1,expl:"Leadership means keeping the group alive, not just giving instructions."},
    {q:"Why quickly defuse a conflict aboard a raft or boat?",opts:["It isn't important in a survival situation","Tension naturally rises in a confined space, and an unmanaged disagreement can quickly worsen","Conflicts always resolve themselves","Only relevant for long voyages"],correct:1,expl:"A confined, uncertain space amplifies tensions, which must be defused before they worsen."},
    {q:"What does 'preserving hope without ever lying about the situation' mean?",opts:["Hiding the true severity of the situation from the group","Honestly reminding everyone that rescue has been alerted and discipline genuinely increases chances","Promising quick rescue even without certainty","Never discussing the situation with the group"],correct:1,expl:"Hope is built on honest facts, never on false promises."},
    {q:"What is the link between survival leadership and Lesson 3?",opts:["No direct link","Resource management (rationing, energy, morale, equipment) remains a continuous responsibility of the leader until rescue","Lesson 3 only concerns technical equipment","Leadership entirely replaces resource management"],correct:1,expl:"The leader keeps applying the resource management discipline seen in Lesson 3, until the end."},
    {q:"In the Costa Concordia case, how long passed before the abandon order was given?",opts:["Only a few minutes","About an hour after the initial impact","Several days","The order was given immediately"],correct:1,expl:"The order was given about an hour after impact, well beyond the 30 minutes required by international rules."},
    {q:"What direct consequence did this delay have on the lifeboats?",opts:["No particular consequence","The ship's list worsened during this delay, rendering several lifeboats unusable on the listing side","The lifeboats worked normally despite the delay","The delay allowed for better evacuation preparation"],correct:1,expl:"The delay gave time for the list to worsen, compromising the use of several lifeboats."},
    {q:"Did the Costa Concordia's captain stay aboard until the evacuation was complete?",opts:["Yes, until the last passenger","No, he left the ship while about 300 people were still aboard, even refusing an order to return aboard","Yes, but only after overseeing the complete evacuation","No, but he was rescued last"],correct:1,expl:"He left the ship prematurely, criminally convicted for this reason among others."},
    {q:"What is the final version of the MAP Survival Mindset for this module?",opts:["Detect → Alarm → Contain → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Recognize → Alert → Muster → Lead only","Launch → Deploy → Survive only"],correct:1,expl:"This progression follows the real chronology of abandoning ship, from preparation to survival leadership."},
    {q:"Does this module teach a replacement for certified practical SOLAS training in actually conducting an abandon ship scenario?",opts:["Yes, it is equivalent to a full certification","No, it teaches decision and leadership principles, never a replacement for certified practical training","Yes, but only for captains","No, it is useless without equipment"],correct:1,expl:"MAP teaches decision and leadership principles, never a replacement for practical SOLAS training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?",opts:["El liderazgo ya no importa una vez dada la orden","El liderazgo se vuelve aún más esencial tras el abandono, hasta el rescate final","Este principio solo concierne al capitán","El liderazgo termina en el embarque"],correct:1,expl:"Es después del abandono, mientras se espera el rescate, cuando el liderazgo importa más."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Presentar solo el procedimiento técnico de abandono","Responder a la pregunta: cómo dejar un buque de forma organizada para maximizar las posibilidades de supervivencia de toda la tripulación","Enseñar la historia de naufragios famosos","Presentar en detalle las normas SOLAS"],correct:1,expl:"El verdadero tema es la toma de decisiones y el liderazgo bajo presión, no un simple procedimiento."},
    {q:"¿Cuándo debe considerarse la orden de abandono?",opts:["Ante el más mínimo incidente a bordo","Solo cuando todas las demás soluciones (incendio, vías de agua, estabilización) han fallado","Cada vez que la tripulación lo pida","Sistemáticamente con mal tiempo"],correct:1,expl:"El abandono significa que todas las demás soluciones han fallado, nunca un primer reflejo."},
    {q:"¿Qué permite la reunión más allá del simple recuento?",opts:["Nada más que comprobar las presencias","Identificar a las personas ausentes, evitar el embarque desordenado, y preparar las responsabilidades","Solo distribuir los chalecos salvavidas","Retrasar la evacuación lo más posible"],correct:1,expl:"La reunión estructura todo el resto de la evacuación, mucho más allá del simple recuento."},
    {q:"¿Por qué es peligroso un embarque desordenado?",opts:["No presenta ningún riesgo real","Puede sobrecargar una sola embarcación mientras otras quedan vacías","Siempre acelera la evacuación","Solo concierne a grandes buques"],correct:1,expl:"La precipitación y la sobrecarga de una sola embarcación comprometen toda la evacuación."},
    {q:"¿Qué significa transformar un grupo en una evacuación organizada?",opts:["Esperar a que cada uno actúe espontáneamente","Coordinar las habilidades de lanzamiento y despliegue para que cada uno sepa qué hacer","Dejar que el capitán lo gestione todo solo","Ignorar las instrucciones ya dadas"],correct:1,expl:"El verdadero desafío no es técnico, es coordinar a personas dispersas en una respuesta coherente."},
    {q:"¿Por qué cada bote o balsa necesita un responsable claramente designado?",opts:["No es necesario si el grupo está tranquilo","Para tomar decisiones locales sin esperar instrucciones centralizadas, imposibles una vez dispersos","Solo por una formalidad administrativa","El capitán siempre decide por todas las embarcaciones a la vez"],correct:1,expl:"Una vez dispersas, las embarcaciones ya no pueden recibir instrucciones centralizadas en tiempo real."},
    {q:"¿Qué incluye el liderazgo tras el abandono, según esta lección?",opts:["Solo dar órdenes firmes","Mantener la calma, evitar conflictos, preservar la esperanza, organizar los turnos de vigilancia, gestionar los recursos","Solo vigilar el horizonte","Nada más que la supervivencia individual de cada uno"],correct:1,expl:"El liderazgo consiste en mantener vivo al grupo, no solo en dar instrucciones."},
    {q:"¿Por qué desactivar rápidamente un conflicto a bordo de una balsa o bote?",opts:["No es importante en una situación de supervivencia","La tensión sube naturalmente en un espacio confinado, y un desacuerdo no gestionado puede empeorar rápido","Los conflictos siempre se resuelven solos","Solo pertinente para viajes largos"],correct:1,expl:"Un espacio confinado e incierto amplifica las tensiones, que hay que desactivar antes de que empeoren."},
    {q:"¿Qué significa 'preservar la esperanza sin mentir nunca sobre la situación'?",opts:["Ocultar la gravedad real de la situación al grupo","Recordar honestamente que el rescate ha sido alertado y que la disciplina aumenta realmente las posibilidades","Prometer un rescate rápido incluso sin certeza","No hablar nunca de la situación con el grupo"],correct:1,expl:"La esperanza se construye sobre hechos honestos, nunca sobre falsas promesas."},
    {q:"¿Cuál es el vínculo entre el liderazgo de supervivencia y la Lección 3?",opts:["Ningún vínculo directo","La gestión de recursos (racionamiento, energía, moral, material) sigue siendo una responsabilidad continua del líder hasta el rescate","La Lección 3 solo concierne al equipo técnico","El liderazgo sustituye por completo a la gestión de recursos"],correct:1,expl:"El líder sigue aplicando la disciplina de gestión de recursos vista en la Lección 3, hasta el final."},
    {q:"En el caso del Costa Concordia, ¿cuánto tiempo pasó antes de que se diera la orden de abandono?",opts:["Solo unos minutos","Cerca de una hora después del impacto inicial","Varios días","La orden se dio de inmediato"],correct:1,expl:"La orden se dio cerca de una hora después del impacto, mucho más allá de los 30 minutos previstos por las normas internacionales."},
    {q:"¿Qué consecuencia directa tuvo este retraso en los botes salvavidas?",opts:["Ninguna consecuencia particular","La escora del buque empeoró durante este retraso, dejando inutilizables varios botes del lado inclinado","Los botes funcionaron con normalidad pese al retraso","El retraso permitió preparar mejor la evacuación"],correct:1,expl:"El retraso dio tiempo a que la escora empeorara, comprometiendo el uso de varios botes."},
    {q:"¿Permaneció el capitán del Costa Concordia a bordo hasta el final de la evacuación?",opts:["Sí, hasta el último pasajero","No, abandonó el buque mientras unas 300 personas seguían a bordo, negándose incluso a la orden de volver a bordo","Sí, pero solo después de supervisar la evacuación completa","No, pero fue rescatado el último"],correct:1,expl:"Abandonó el buque prematuramente, condenado penalmente por esta razón entre otras."},
    {q:"¿Cuál es la versión final del MAP Survival Mindset para este módulo?",opts:["Detect → Alarm → Contain → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Solo Recognize → Alert → Muster → Lead","Solo Launch → Deploy → Survive"],correct:1,expl:"Esta progresión sigue la cronología real de un abandono de buque, desde la preparación hasta el liderazgo de supervivencia."},
    {q:"¿Este módulo enseña un sustituto de una formación SOLAS práctica certificada en la conducción real de un abandono de buque?",opts:["Sí, equivale a una certificación completa","No, enseña principios de decisión y liderazgo, nunca un sustituto de una formación práctica certificada","Sí, pero solo para capitanes","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de decisión y liderazgo, nunca un sustituto de la formación SOLAS práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?",opts:["A liderança já não importa depois de dada a ordem","A liderança torna-se ainda mais essencial após o abandono, até ao socorro final","Este princípio só diz respeito ao comandante","A liderança para no embarque"],correct:1,expl:"É depois do abandono, enquanto se espera pelo socorro, que a liderança mais importa."},
    {q:"Qual é a missão exata desta lição?",opts:["Apresentar apenas o procedimento técnico de abandono","Responder à pergunta: como deixar um navio de forma organizada para maximizar as hipóteses de sobrevivência de toda a tripulação","Ensinar a história de naufrágios famosos","Apresentar em detalhe as regras SOLAS"],correct:1,expl:"O verdadeiro tema é a tomada de decisão e a liderança sob pressão, não um simples procedimento."},
    {q:"Quando deve ser considerada a ordem de abandono?",opts:["Ao mínimo incidente a bordo","Só quando todas as outras soluções (incêndio, vias de água, estabilização) falharam","Sempre que a tripulação o pedir","Sistematicamente com mau tempo"],correct:1,expl:"O abandono significa que todas as outras soluções falharam, nunca um primeiro reflexo."},
    {q:"O que permite a reunião além do simples recontar?",opts:["Nada mais do que verificar as presenças","Identificar as pessoas em falta, evitar o embarque desordenado, e preparar as responsabilidades","Só distribuir os coletes salva-vidas","Atrasar a evacuação o máximo possível"],correct:1,expl:"A reunião estrutura todo o resto da evacuação, muito além do simples recontar."},
    {q:"Por que um embarque desordenado é perigoso?",opts:["Não apresenta nenhum risco real","Pode sobrecarregar uma única embarcação enquanto outras ficam vazias","Sempre acelera a evacuação","Só diz respeito a grandes navios"],correct:1,expl:"A pressa e a sobrecarga de uma única embarcação comprometem toda a evacuação."},
    {q:"O que significa transformar um grupo numa evacuação organizada?",opts:["Esperar que cada um aja espontaneamente","Coordenar as competências de lançamento e implantação para que cada um saiba o que fazer","Deixar o comandante gerir tudo sozinho","Ignorar as instruções já dadas"],correct:1,expl:"O verdadeiro desafio não é técnico, é coordenar pessoas dispersas numa resposta coerente."},
    {q:"Por que cada bote ou jangada precisa de um responsável claramente designado?",opts:["Não é necessário se o grupo estiver calmo","Para tomar decisões locais sem esperar instruções centralizadas, impossíveis uma vez dispersos","Só por uma formalidade administrativa","O comandante decide sempre por todas as embarcações ao mesmo tempo"],correct:1,expl:"Uma vez dispersas, as embarcações já não podem receber instruções centralizadas em tempo real."},
    {q:"O que inclui a liderança após o abandono, segundo esta lição?",opts:["Só dar ordens firmes","Manter a calma, evitar conflitos, preservar a esperança, organizar os turnos de vigia, gerir os recursos","Só vigiar o horizonte","Nada mais do que a sobrevivência individual de cada um"],correct:1,expl:"A liderança consiste em manter o grupo vivo, não apenas em dar instruções."},
    {q:"Por que desarmar rapidamente um conflito a bordo de uma jangada ou bote?",opts:["Não é importante numa situação de sobrevivência","A tensão sobe naturalmente num espaço confinado, e um desacordo não gerido pode piorar rapidamente","Os conflitos resolvem-se sempre sozinhos","Só pertinente para viagens longas"],correct:1,expl:"Um espaço confinado e incerto amplifica as tensões, que devem ser desarmadas antes de piorarem."},
    {q:"O que significa 'preservar a esperança sem nunca mentir sobre a situação'?",opts:["Esconder a gravidade real da situação do grupo","Lembrar honestamente que o socorro foi alertado e que a disciplina aumenta realmente as hipóteses","Prometer um resgate rápido mesmo sem certeza","Nunca falar da situação com o grupo"],correct:1,expl:"A esperança constrói-se sobre factos honestos, nunca sobre falsas promessas."},
    {q:"Qual é a ligação entre a liderança de sobrevivência e a Lição 3?",opts:["Nenhuma ligação direta","A gestão de recursos (racionamento, energia, moral, material) continua a ser uma responsabilidade contínua do líder até ao socorro","A Lição 3 só diz respeito ao equipamento técnico","A liderança substitui inteiramente a gestão de recursos"],correct:1,expl:"O líder continua a aplicar a disciplina de gestão de recursos vista na Lição 3, até ao fim."},
    {q:"No caso do Costa Concordia, quanto tempo passou antes de a ordem de abandono ser dada?",opts:["Só alguns minutos","Cerca de uma hora após o impacto inicial","Vários dias","A ordem foi dada de imediato"],correct:1,expl:"A ordem foi dada cerca de uma hora após o impacto, muito além dos 30 minutos previstos pelas regras internacionais."},
    {q:"Que consequência direta este atraso teve nos botes salva-vidas?",opts:["Nenhuma consequência particular","O adornamento do navio piorou durante este atraso, tornando vários botes inutilizáveis do lado inclinado","Os botes funcionaram normalmente apesar do atraso","O atraso permitiu preparar melhor a evacuação"],correct:1,expl:"O atraso deu tempo a que o adornamento piorasse, comprometendo o uso de vários botes."},
    {q:"O comandante do Costa Concordia permaneceu a bordo até ao fim da evacuação?",opts:["Sim, até ao último passageiro","Não, abandonou o navio enquanto cerca de 300 pessoas ainda estavam a bordo, recusando mesmo a ordem de regressar a bordo","Sim, mas só depois de supervisionar a evacuação completa","Não, mas foi resgatado por último"],correct:1,expl:"Abandonou o navio prematuramente, condenado penalmente por esta razão entre outras."},
    {q:"Qual é a versão final do MAP Survival Mindset para este módulo?",opts:["Detect → Alarm → Contain → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Só Recognize → Alert → Muster → Lead","Só Launch → Deploy → Survive"],correct:1,expl:"Esta progressão segue a cronologia real de um abandono de navio, desde a preparação até à liderança de sobrevivência."},
    {q:"Este módulo ensina um substituto de uma formação SOLAS prática certificada na condução real de um abandono de navio?",opts:["Sim, equivale a uma certificação completa","Não, ensina princípios de decisão e liderança, nunca um substituto de uma formação prática certificada","Sim, mas só para comandantes","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de decisão e liderança, nunca um substituto da formação SOLAS prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' ?",opts:["Le leadership s'arrête à l'ordre d'abandon","Le leadership devient encore plus essentiel après l'abandon, jusqu'au secours","Cela ne concerne que le commandant","Le leadership s'arrête à l'embarquement"],correct:1,expl:"C'est après l'abandon que le leadership compte le plus."},
    {q:"Quand faut-il envisager l'ordre d'abandon ?",opts:["Dès le moindre incident","Uniquement quand toutes les autres solutions ont échoué","Chaque fois que demandé","Systématiquement en mauvais temps"],correct:1,expl:"L'abandon est la dernière option, jamais un premier réflexe."},
    {q:"Pourquoi chaque embarcation a-t-elle besoin d'un responsable désigné ?",opts:["Ce n'est pas nécessaire","Pour décider localement sans instructions centralisées, impossibles une fois dispersées","Uniquement une formalité","Le commandant décide pour toutes"],correct:1,expl:"Une fois dispersées, les embarcations ne reçoivent plus d'instructions centralisées."},
    {q:"Dans le cas du Costa Concordia, quel a été l'effet du retard de l'ordre d'abandon ?",opts:["Aucun effet","La gîte s'est aggravée, rendant plusieurs canots inutilisables","Les canots ont mieux fonctionné","Le retard a amélioré la préparation"],correct:1,expl:"Le retard a laissé le temps à la gîte de s'aggraver."},
    {q:"Quelle est la version finale du MAP Survival Mindset ?",opts:["Detect → Alarm → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Launch → Deploy uniquement","Recognize → Lead uniquement"],correct:1,expl:"Cette progression suit la chronologie réelle d'un abandon de navire."},
  ],
  en:[
    {q:"What does 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most' mean?",opts:["Leadership stops at the abandon order","Leadership becomes even more essential after abandonment, until rescue","It only concerns the captain","Leadership stops at boarding"],correct:1,expl:"It is after abandonment that leadership matters most."},
    {q:"When should the abandon order be considered?",opts:["At the slightest incident","Only when all other solutions have failed","Whenever requested","Systematically in bad weather"],correct:1,expl:"Abandonment is the last option, never a first reflex."},
    {q:"Why does every craft need a designated person in charge?",opts:["It isn't necessary","To decide locally without centralized instructions, impossible once scattered","Only a formality","The captain decides for all"],correct:1,expl:"Once scattered, craft no longer receive centralized instructions."},
    {q:"In the Costa Concordia case, what was the effect of the delayed abandon order?",opts:["No effect","The list worsened, rendering several lifeboats unusable","The lifeboats worked better","The delay improved preparation"],correct:1,expl:"The delay gave time for the list to worsen."},
    {q:"What is the final version of the MAP Survival Mindset?",opts:["Detect → Alarm → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Launch → Deploy only","Recognize → Lead only"],correct:1,expl:"This progression follows the real chronology of abandoning ship."},
  ],
  es:[
    {q:"¿Qué significa 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?",opts:["El liderazgo se detiene en la orden de abandono","El liderazgo se vuelve aún más esencial tras el abandono, hasta el rescate","Solo concierne al capitán","El liderazgo se detiene en el embarque"],correct:1,expl:"Es después del abandono cuando el liderazgo más importa."},
    {q:"¿Cuándo debe considerarse la orden de abandono?",opts:["Ante el más mínimo incidente","Solo cuando todas las demás soluciones han fallado","Cada vez que se pida","Sistemáticamente con mal tiempo"],correct:1,expl:"El abandono es la última opción, nunca un primer reflejo."},
    {q:"¿Por qué cada embarcación necesita un responsable designado?",opts:["No es necesario","Para decidir localmente sin instrucciones centralizadas, imposibles una vez dispersas","Solo una formalidad","El capitán decide por todas"],correct:1,expl:"Una vez dispersas, las embarcaciones ya no reciben instrucciones centralizadas."},
    {q:"En el caso del Costa Concordia, ¿cuál fue el efecto del retraso en la orden de abandono?",opts:["Ningún efecto","La escora empeoró, dejando inutilizables varios botes","Los botes funcionaron mejor","El retraso mejoró la preparación"],correct:1,expl:"El retraso dio tiempo a que la escora empeorara."},
    {q:"¿Cuál es la versión final del MAP Survival Mindset?",opts:["Detect → Alarm → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Solo Launch → Deploy","Solo Recognize → Lead"],correct:1,expl:"Esta progresión sigue la cronología real de un abandono de buque."},
  ],
  pt:[
    {q:"O que significa 'Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most'?",opts:["A liderança para na ordem de abandono","A liderança torna-se ainda mais essencial após o abandono, até ao socorro","Só diz respeito ao comandante","A liderança para no embarque"],correct:1,expl:"É depois do abandono que a liderança mais importa."},
    {q:"Quando deve ser considerada a ordem de abandono?",opts:["Ao mínimo incidente","Só quando todas as outras soluções falharam","Sempre que pedido","Sistematicamente com mau tempo"],correct:1,expl:"O abandono é a última opção, nunca um primeiro reflexo."},
    {q:"Por que cada embarcação precisa de um responsável designado?",opts:["Não é necessário","Para decidir localmente sem instruções centralizadas, impossíveis uma vez dispersas","Só uma formalidade","O comandante decide por todas"],correct:1,expl:"Uma vez dispersas, as embarcações já não recebem instruções centralizadas."},
    {q:"No caso do Costa Concordia, qual foi o efeito do atraso na ordem de abandono?",opts:["Nenhum efeito","O adornamento piorou, tornando vários botes inutilizáveis","Os botes funcionaram melhor","O atraso melhorou a preparação"],correct:1,expl:"O atraso deu tempo a que o adornamento piorasse."},
    {q:"Qual é a versão final do MAP Survival Mindset?",opts:["Detect → Alarm → Fight","Prepare → Muster → Launch → Escape → Survive → Lead","Só Launch → Deploy","Só Recognize → Lead"],correct:1,expl:"Esta progressão segue a cronologia real de um abandono de navio."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais commander une embarcation apres un abandon de navire, saurais-tu maintenir le calme du groupe sans jamais mentir sur la gravite de la situation ?",
    en:"If you had to command a craft after an abandon ship, would you be able to keep the group calm without ever lying about the severity of the situation?",
    es:"Si tuvieras que mandar una embarcacion tras un abandono de buque, ¿sabrias mantener la calma del grupo sin mentir nunca sobre la gravedad de la situacion?",
    pt:"Se tivesses de comandar uma embarcacao apos um abandono de navio, saberias manter a calma do grupo sem nunca mentir sobre a gravidade da situacao?",
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
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Leçon 4/4 · ⭐ Premium",
      title:"Abandon Ship & Survival Leadership",
      intro:"Cette dernière leçon mobilise toutes les compétences des trois précédentes : lancement d'embarcation (L1), déploiement de radeau (L2), gestion de la survie (L3). C'est ici, et seulement ici, qu'apparaissent le signal d'abandon, le rassemblement et le leadership.",
      p0:"ABANDON SHIP IS NOT THE END OF LEADERSHIP. IT IS WHERE LEADERSHIP MATTERS MOST.",s0t:"Le principe qui structure toute la leçon",
      s0:"Comment quitter un navire de manière organisée afin de maximiser les chances de survie de tout l'équipage ? Le véritable sujet est la prise de décision et le leadership sous pression, pas une simple procédure.\n\nCOMMENT LE RECONNAÎTRE ? Une situation où toutes les autres solutions ont échoué, imposant l'abandon complet.\nQUE FAIRE IMMÉDIATEMENT ? Donner l'ordre sans délai, rassembler, mobiliser canots et radeaux, désigner un responsable par embarcation.\nQUELLE ERREUR L'AGGRAVE ? Retarder l'ordre, quitter le navire avant la fin de l'évacuation.\nQUAND DEMANDER DE L'AIDE ? Dès la décision d'abandon, en coordination avec les secours extérieurs.",
      p1:"LA DÉCISION D'ABANDONNER LE NAVIRE",s1t:"La toute dernière option",
      s1:"Lutte contre l'incendie épuisée, voies d'eau non maîtrisées, stabilité compromise : l'abandon signifie que toutes les autres solutions ont échoué, jamais un premier réflexe.",
      p2:"DISCIPLINE AU POSTE DE RASSEMBLEMENT",s2t:"Bien plus qu'un simple comptage",
      s2:"Rassemblement immédiat, appel nominal complet, prévention de l'embarquement désordonné, préparation des responsabilités : le rassemblement structure toute la suite de l'évacuation.",
      p3:"D'UN GROUPE À UNE ÉVACUATION ORGANISÉE",s3t:"Le véritable défi n'est pas technique",
      s3:"Mobiliser canots et radeaux simultanément, désigner un responsable par embarcation, transformer des individus dispersés en une évacuation coordonnée, décider sous pression.",
      p4:"LEADERSHIP DE SURVIE",s4t:"Maintenir le groupe vivant",
      s4:"Maintenir le calme, éviter les conflits, préserver l'espoir sans jamais mentir, organiser les tours de veille, gérer les ressources jusqu'au secours : le leadership ne consiste pas seulement à donner des ordres.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 4",
      sumP:["Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most","L'abandon reste la dernière option, jamais un premier réflexe","Le rassemblement identifie les manquants, évite le désordre, prépare les responsabilités","Un responsable désigné par embarcation permet des décisions locales une fois dispersées","Le leadership de survie maintient le groupe vivant jusqu'au secours"],
      learnedP:["Quand envisager la décision d'abandon","La discipline complète du rassemblement","Comment transformer un groupe en évacuation organisée","Le leadership de survie jusqu'au secours final","L'ensemble du MAP Survival Mindset"],
      closingMsg:"Ships can be replaced. Lives cannot. Every lesson in this module exists for one reason: if the day ever comes when you must leave your ship, everyone should have the greatest possible chance of coming home.",
      finalTransition:"A professional mariner hopes never to abandon ship. His greatest responsibility is to prevent reaching that moment. That is why emergency preparedness begins long before the emergency itself.",
      safetyMsg:"Abandon ship is not the end of leadership. It is where leadership matters most.",
    },
    en:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lesson 4/4 · ⭐ Premium",
      title:"Abandon Ship & Survival Leadership",
      intro:"This final lesson mobilizes all the skills from the previous three: lifeboat launching (L1), liferaft deployment (L2), survival management (L3). It is here, and only here, that the abandon signal, mustering, and leadership appear.",
      p0:"ABANDON SHIP IS NOT THE END OF LEADERSHIP. IT IS WHERE LEADERSHIP MATTERS MOST.",s0t:"The principle that structures the whole lesson",
      s0:"How do you leave a ship in an organized way to maximize survival chances for the entire crew? The real subject is decision-making and leadership under pressure, not just a procedure.\n\nHOW DO I RECOGNIZE IT? A situation where all other solutions have failed, forcing full abandonment.\nWHAT DO I DO IMMEDIATELY? Give the order without delay, muster, mobilize boats and rafts, designate one person in charge per craft.\nWHAT MISTAKE MAKES IT WORSE? Delaying the order, leaving the ship before evacuation is complete.\nWHEN MUST I ASK FOR HELP? As soon as the abandonment decision is made, in coordination with outside rescue.",
      p1:"THE DECISION TO ABANDON SHIP",s1t:"The very last option",
      s1:"Firefighting exhausted, flooding uncontrolled, stability compromised: abandonment means all other solutions have failed, never a first reflex.",
      p2:"MUSTER STATION DISCIPLINE",s2t:"Far more than a simple headcount",
      s2:"Immediate muster, full head count, preventing disorderly boarding, preparing responsibilities: mustering structures the entire rest of the evacuation.",
      p3:"FROM A GROUP TO AN ORGANIZED EVACUATION",s3t:"The real challenge isn't technical",
      s3:"Mobilizing lifeboats and liferafts simultaneously, designating one person in charge per craft, turning scattered individuals into a coordinated evacuation, deciding under pressure.",
      p4:"SURVIVAL LEADERSHIP",s4t:"Keeping the group alive",
      s4:"Maintaining calm, avoiding conflict, preserving hope without ever lying, organizing watch rotations, managing resources until rescue: leadership isn't just about giving orders.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 4",
      sumP:["Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most","Abandonment remains the last option, never a first reflex","Mustering identifies the missing, avoids disorder, prepares responsibilities","A designated person in charge per craft allows local decisions once scattered","Survival leadership keeps the group alive until rescue"],
      learnedP:["When to consider the abandonment decision","The complete discipline of mustering","How to turn a group into an organized evacuation","Survival leadership until final rescue","The entire MAP Survival Mindset"],
      closingMsg:"Ships can be replaced. Lives cannot. Every lesson in this module exists for one reason: if the day ever comes when you must leave your ship, everyone should have the greatest possible chance of coming home.",
      finalTransition:"A professional mariner hopes never to abandon ship. His greatest responsibility is to prevent reaching that moment. That is why emergency preparedness begins long before the emergency itself.",
      safetyMsg:"Abandon ship is not the end of leadership. It is where leadership matters most.",
    },
    es:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lección 4/4 · ⭐ Premium",
      title:"Abandon Ship & Survival Leadership",
      intro:"Esta última lección moviliza todas las habilidades de las tres anteriores: lanzamiento de bote (L1), despliegue de balsa (L2), gestión de la supervivencia (L3). Es aquí, y solo aquí, donde aparecen la señal de abandono, la reunión y el liderazgo.",
      p0:"ABANDON SHIP IS NOT THE END OF LEADERSHIP. IT IS WHERE LEADERSHIP MATTERS MOST.",s0t:"El principio que estructura toda la lección",
      s0:"¿Cómo dejar un buque de forma organizada para maximizar las posibilidades de supervivencia de toda la tripulación? El verdadero tema es la toma de decisiones y el liderazgo bajo presión, no un simple procedimiento.\n\n¿CÓMO RECONOCERLO? Una situación donde todas las demás soluciones han fallado, forzando el abandono completo.\n¿QUÉ HACER DE INMEDIATO? Dar la orden sin demora, reunir, movilizar botes y balsas, designar un responsable por embarcación.\n¿QUÉ ERROR LO AGRAVA? Retrasar la orden, dejar el buque antes de que la evacuación esté completa.\n¿CUÁNDO PEDIR AYUDA? En cuanto se tome la decisión de abandono, en coordinación con el rescate exterior.",
      p1:"LA DECISIÓN DE ABANDONAR EL BUQUE",s1t:"La última opción",
      s1:"Lucha contra el incendio agotada, vías de agua no controladas, estabilidad comprometida: el abandono significa que todas las demás soluciones han fallado, nunca un primer reflejo.",
      p2:"DISCIPLINA EN EL PUESTO DE REUNIÓN",s2t:"Mucho más que un simple recuento",
      s2:"Reunión inmediata, recuento nominal completo, prevención del embarque desordenado, preparación de las responsabilidades: la reunión estructura todo el resto de la evacuación.",
      p3:"DE UN GRUPO A UNA EVACUACIÓN ORGANIZADA",s3t:"El verdadero desafío no es técnico",
      s3:"Movilizar botes y balsas simultáneamente, designar un responsable por embarcación, transformar individuos dispersos en una evacuación coordinada, decidir bajo presión.",
      p4:"LIDERAZGO DE SUPERVIVENCIA",s4t:"Mantener vivo al grupo",
      s4:"Mantener la calma, evitar conflictos, preservar la esperanza sin mentir nunca, organizar los turnos de vigilancia, gestionar los recursos hasta el rescate: el liderazgo no consiste solo en dar órdenes.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 4",
      sumP:["Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most","El abandono sigue siendo la última opción, nunca un primer reflejo","La reunión identifica a los ausentes, evita el desorden, prepara las responsabilidades","Un responsable designado por embarcación permite decisiones locales una vez dispersos","El liderazgo de supervivencia mantiene vivo al grupo hasta el rescate"],
      learnedP:["Cuándo considerar la decisión de abandono","La disciplina completa de la reunión","Cómo transformar un grupo en una evacuación organizada","El liderazgo de supervivencia hasta el rescate final","Todo el MAP Survival Mindset"],
      closingMsg:"Ships can be replaced. Lives cannot. Every lesson in this module exists for one reason: if the day ever comes when you must leave your ship, everyone should have the greatest possible chance of coming home.",
      finalTransition:"A professional mariner hopes never to abandon ship. His greatest responsibility is to prevent reaching that moment. That is why emergency preparedness begins long before the emergency itself.",
      safetyMsg:"Abandon ship is not the end of leadership. It is where leadership matters most.",
    },
    pt:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lição 4/4 · ⭐ Premium",
      title:"Abandon Ship & Survival Leadership",
      intro:"Esta última lição mobiliza todas as competências das três anteriores: lançamento de bote (L1), implantação de jangada (L2), gestão da sobrevivência (L3). É aqui, e só aqui, que surgem o sinal de abandono, a reunião e a liderança.",
      p0:"ABANDON SHIP IS NOT THE END OF LEADERSHIP. IT IS WHERE LEADERSHIP MATTERS MOST.",s0t:"O princípio que estrutura toda a lição",
      s0:"Como deixar um navio de forma organizada para maximizar as hipóteses de sobrevivência de toda a tripulação? O verdadeiro tema é a tomada de decisão e a liderança sob pressão, não um simples procedimento.\n\nCOMO RECONHECER? Uma situação em que todas as outras soluções falharam, obrigando ao abandono completo.\nO QUE FAZER IMEDIATAMENTE? Dar a ordem sem demora, reunir, mobilizar botes e jangadas, designar um responsável por embarcação.\nQUE ERRO O AGRAVA? Atrasar a ordem, deixar o navio antes de a evacuação estar completa.\nQUANDO PEDIR AJUDA? Assim que a decisão de abandono é tomada, em coordenação com o socorro exterior.",
      p1:"A DECISÃO DE ABANDONAR O NAVIO",s1t:"A última opção",
      s1:"Combate ao incêndio esgotado, vias de água não controladas, estabilidade comprometida: o abandono significa que todas as outras soluções falharam, nunca um primeiro reflexo.",
      p2:"DISCIPLINA NO POSTO DE REUNIÃO",s2t:"Muito mais do que um simples recontar",
      s2:"Reunião imediata, chamada nominal completa, prevenção do embarque desordenado, preparação das responsabilidades: a reunião estrutura todo o resto da evacuação.",
      p3:"DE UM GRUPO A UMA EVACUAÇÃO ORGANIZADA",s3t:"O verdadeiro desafio não é técnico",
      s3:"Mobilizar botes e jangadas simultaneamente, designar um responsável por embarcação, transformar indivíduos dispersos numa evacuação coordenada, decidir sob pressão.",
      p4:"LIDERANÇA DE SOBREVIVÊNCIA",s4t:"Manter o grupo vivo",
      s4:"Manter a calma, evitar conflitos, preservar a esperança sem nunca mentir, organizar os turnos de vigia, gerir os recursos até ao socorro: a liderança não consiste apenas em dar ordens.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 4",
      sumP:["Abandon Ship Is Not the End of Leadership. It Is Where Leadership Matters Most","O abandono continua a ser a última opção, nunca um primeiro reflexo","A reunião identifica os ausentes, evita a desordem, prepara as responsabilidades","Um responsável designado por embarcação permite decisões locais uma vez dispersos","A liderança de sobrevivência mantém o grupo vivo até ao socorro"],
      learnedP:["Quando considerar a decisão de abandono","A disciplina completa da reunião","Como transformar um grupo numa evacuação organizada","A liderança de sobrevivência até ao socorro final","Todo o MAP Survival Mindset"],
      closingMsg:"Ships can be replaced. Lives cannot. Every lesson in this module exists for one reason: if the day ever comes when you must leave your ship, everyone should have the greatest possible chance of coming home.",
      finalTransition:"A professional mariner hopes never to abandon ship. His greatest responsibility is to prevent reaching that moment. That is why emergency preparedness begins long before the emergency itself.",
      safetyMsg:"Abandon ship is not the end of leadership. It is where leadership matters most.",
    },
  };
  return d[lang]||d.fr;
};

const mindsetLabel = {
  fr:{title:"THE MAP SURVIVAL MINDSET",sub:"Every abandon ship scenario follows this same discipline.",steps:["Prepare","Muster","Launch","Escape","Survive","Lead"]},
  en:{title:"THE MAP SURVIVAL MINDSET",sub:"Every abandon ship scenario follows this same discipline.",steps:["Prepare","Muster","Launch","Escape","Survive","Lead"]},
  es:{title:"THE MAP SURVIVAL MINDSET",sub:"Every abandon ship scenario follows this same discipline.",steps:["Prepare","Muster","Launch","Escape","Survive","Lead"]},
  pt:{title:"THE MAP SURVIVAL MINDSET",sub:"Every abandon ship scenario follows this same discipline.",steps:["Prepare","Muster","Launch","Escape","Survive","Lead"]},
};

// MAIN
export default function LessonSafetyS5_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const ms = mindsetLabel[lang]||mindsetLabel.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/4":lang==="en"?"Lesson 4/4":lang==="es"?"Lección 4/4":"Lição 4/4"}</div>
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

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.blue2,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.blue2}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="⚓" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🚨" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🚨 {lang==="fr"?"DÉCISION D'ABANDON - INTERACTIF":lang==="en"?"DECISION TO ABANDON - INTERACTIVE":lang==="es"?"DECISIÓN DE ABANDONO - INTERACTIVO":"DECISÃO DE ABANDONO - INTERATIVO"}</div><DecisionToAbandonSVG lang={lang}/></Card>

            <SL icon="📋" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📋</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📋 {lang==="fr"?"RASSEMBLEMENT - INTERACTIF":lang==="en"?"MUSTER - INTERACTIVE":lang==="es"?"REUNIÓN - INTERACTIVO":"REUNIÃO - INTERATIVO"}</div><MusterDisciplineSVG lang={lang}/></Card>

            <SL icon="🧩" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧩</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧩 {lang==="fr"?"ÉVACUATION ORGANISÉE - INTERACTIF":lang==="en"?"ORGANIZED EVACUATION - INTERACTIVE":lang==="es"?"EVACUACIÓN ORGANIZADA - INTERACTIVO":"EVACUAÇÃO ORGANIZADA - INTERATIVO"}</div><OrganizedEvacuationSVG lang={lang}/></Card>

            <SL icon="🕯️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🕯️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🕯️ {lang==="fr"?"LEADERSHIP DE SURVIE - INTERACTIF":lang==="en"?"SURVIVAL LEADERSHIP - INTERACTIVE":lang==="es"?"LIDERAZGO DE SUPERVIVENCIA - INTERACTIVO":"LIDERANÇA DE SOBREVIVÊNCIA - INTERATIVO"}</div><SurvivalLeadershipSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p8} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(77,166,255,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:11,color:C.blue2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button onClick={()=>setPhase("quiz")} style={{width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 10px 36px rgba(77,166,255,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Abandon Ship & Leadership":lang==="en"?"Final Quiz - Abandon Ship & Leadership":lang==="es"?"Quiz Final - Abandon Ship y Liderazgo":"Quiz Final - Abandon Ship e Liderança"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/4":"questions · Lesson 4/4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1.5px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.15),rgba(13,31,60,0.95))",textAlign:"center"}}>
              <div style={{fontSize:11,color:C.gold2,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:14}}>{ms.title}</div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,marginBottom:12}}>
                {ms.steps.map((s,i)=>(
                  <div key={s} style={{width:"100%"}}>
                    <div style={{padding:"8px 0",borderRadius:10,background:"rgba(255,255,255,0.06)",fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.white,letterSpacing:1}}>{s}</div>
                    {i<ms.steps.length-1&&<div style={{fontSize:13,color:C.gold2,padding:"2px 0"}}>↓</div>}
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{ms.sub}</div>
            </Card>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛟</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16,textAlign:"center",background:"linear-gradient(135deg,rgba(77,166,255,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.blue2}33`}}>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.closingMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <Card style={{marginBottom:16,textAlign:"center",border:`2px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.2),rgba(13,31,60,0.95))"}}>
              <div style={{fontSize:36,marginBottom:8}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:C.gold2,letterSpacing:2,marginBottom:6}}>{lang==="fr"?"MODULE TERMINÉ":lang==="en"?"MODULE COMPLETED":lang==="es"?"MÓDULO COMPLETADO":"MÓDULO CONCLUÍDO"}</div>
              <div style={{fontSize:13,color:C.white,fontWeight:700,marginBottom:10}}>{lang==="fr"?"Lifeboats, Liferafts & HRU":lang==="en"?"Lifeboats, Liferafts & HRU":lang==="es"?"Lifeboats, Liferafts & HRU":"Lifeboats, Liferafts & HRU"}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{lang==="fr"?"200 XP gagnés · 4 leçons terminées":lang==="en"?"200 XP earned · 4 lessons completed":lang==="es"?"200 XP ganados · 4 lecciones completadas":"200 XP ganhos · 4 lições concluídas"}</div>
              <div style={{fontSize:11,color:C.gold2,fontStyle:"italic"}}>{lang==="fr"?"Survival Mindset débloqué":lang==="en"?"Survival Mindset Unlocked":lang==="es"?"Survival Mindset desbloqueado":"Survival Mindset desbloqueado"}</div>
            </Card>

            <div style={{textAlign:"center",fontSize:12,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.finalTransition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(77,166,255,0.35)",marginBottom:10}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
