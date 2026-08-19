import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - FIRE COMMAND STRUCTURE
function CommandStructureSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"⚓", label:{fr:"Commandant",en:"Captain",es:"Capitán",pt:"Comandante"}, desc:{fr:"Détient l'autorité finale sur toutes les décisions majeures : déclenchement d'un système fixe, évacuation, demande d'assistance extérieure.",en:"Holds final authority over all major decisions: fixed system release, evacuation, request for outside assistance.",es:"Tiene la autoridad final sobre todas las decisiones importantes: disparo de un sistema fijo, evacuación, solicitud de asistencia exterior.",pt:"Detém a autoridade final sobre todas as decisões importantes: disparo de um sistema fixo, evacuação, pedido de assistência exterior."} },
    { id:2, icon:"🎖️", label:{fr:"Chef d'intervention",en:"Incident commander on scene",es:"Jefe de intervención",pt:"Chefe de intervenção"}, desc:{fr:"Coordonne les équipes directement sur zone, transmet la situation au commandant, ajuste la tactique en temps réel.",en:"Coordinates teams directly on scene, reports the situation to the captain, adjusts tactics in real time.",es:"Coordina a los equipos directamente en la zona, informa la situación al capitán, ajusta la táctica en tiempo real.",pt:"Coordena as equipas diretamente na zona, transmite a situação ao comandante, ajusta a tática em tempo real."} },
    { id:3, icon:"👥", label:{fr:"Équipes",en:"Teams",es:"Equipos",pt:"Equipas"}, desc:{fr:"Exécutent les missions confiées, remontent l'information à leur chef d'intervention, jamais isolées dans leur propre décision.",en:"Execute assigned missions, report information up to their incident commander, never isolated in their own decision-making.",es:"Ejecutan las misiones asignadas, transmiten la información a su jefe de intervención, nunca aisladas en su propia decisión.",pt:"Executam as missões atribuídas, transmitem a informação ao seu chefe de intervenção, nunca isoladas na sua própria decisão."} },
    { id:4, icon:"📡", label:{fr:"Communications",en:"Communications",es:"Comunicaciones",pt:"Comunicações"}, desc:{fr:"Le fil qui relie chaque niveau de la chaîne. Sans communication fiable, la structure de commandement s'effondre, même avec les meilleures équipes.",en:"The thread linking every level of the chain. Without reliable communication, the command structure collapses, even with the best teams.",es:"El hilo que conecta cada nivel de la cadena. Sin comunicación fiable, la estructura de mando se derrumba, incluso con los mejores equipos.",pt:"O fio que liga cada nível da cadeia. Sem comunicação fiável, a estrutura de comando desmorona, mesmo com as melhores equipas."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"L'urgence est déjà déclarée, les équipes déjà mobilisées : ici, le sujet est la chaîne de décision.":lang==="en"?"The emergency is already declared, teams already mobilized: here, the subject is the decision chain.":lang==="es"?"La urgencia ya está declarada, los equipos ya movilizados: aquí, el tema es la cadena de decisión.":"A urgência já está declarada, as equipas já mobilizadas: aqui, o tema é a cadeia de decisão."}</div>
    </div>
  );
}

// SVG 2 - TEAM COORDINATION
function TeamCoordinationSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🎯", label:{fr:"Équipe d'attaque",en:"Attack team",es:"Equipo de ataque",pt:"Equipa de ataque"}, desc:{fr:"Engage directement le feu. Sa mission dépend entièrement du soutien et de la réserve pour rester en sécurité pendant l'action.",en:"Directly engages the fire. Its mission depends entirely on support and reserve to stay safe during the action.",es:"Se enfrenta directamente al fuego. Su misión depende por completo del apoyo y la reserva para mantenerse segura durante la acción.",pt:"Enfrenta diretamente o fogo. A sua missão depende inteiramente do apoio e da reserva para se manter segura durante a ação."} },
    { id:2, icon:"🧯", label:{fr:"Équipe de soutien",en:"Support team",es:"Equipo de apoyo",pt:"Equipa de apoio"}, desc:{fr:"Approvisionne en air, en eau, en matériel, et surveille les conditions autour de l'équipe d'attaque. Sans elle, l'attaque s'arrête d'elle-même.",en:"Supplies air, water, equipment, and monitors conditions around the attack team. Without it, the attack stops on its own.",es:"Suministra aire, agua, material, y vigila las condiciones alrededor del equipo de ataque. Sin él, el ataque se detiene por sí solo.",pt:"Fornece ar, água, material, e vigia as condições à volta da equipa de ataque. Sem ela, o ataque para por si só."} },
    { id:3, icon:"🛑", label:{fr:"Équipe de réserve",en:"Reserve team",es:"Equipo de reserva",pt:"Equipa de reserva"}, desc:{fr:"Prête à intervenir immédiatement, jamais assemblée seulement après un problème. Sa seule présence permet à l'attaque de prendre des risques calculés.",en:"Ready to intervene immediately, never assembled only after a problem occurs. Its mere presence allows the attack to take calculated risks.",es:"Lista para intervenir de inmediato, nunca reunida solo después de un problema. Su sola presencia permite al ataque tomar riesgos calculados.",pt:"Pronta a intervir de imediato, nunca reunida apenas depois de um problema. A sua simples presença permite ao ataque assumir riscos calculados."} },
    { id:4, icon:"🔗", label:{fr:"Missions différentes, une seule réponse",en:"Different missions, one single response",es:"Misiones diferentes, una sola respuesta",pt:"Missões diferentes, uma única resposta"}, desc:{fr:"Ces trois équipes ne travaillent jamais isolément : chacune dépend des deux autres pour que l'ensemble fonctionne comme une réponse cohérente.",en:"These three teams never work in isolation: each depends on the other two for the whole to function as one coherent response.",es:"Estos tres equipos nunca trabajan de forma aislada: cada uno depende de los otros dos para que el conjunto funcione como una respuesta coherente.",pt:"Estas três equipas nunca trabalham isoladamente: cada uma depende das outras duas para que o conjunto funcione como uma resposta coerente."} },
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

// SVG 3 - COMMUNICATION & RELIEF
function CommunicationReliefSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📋", label:{fr:"Rapports structurés",en:"Structured reports",es:"Informes estructurados",pt:"Relatórios estruturados"}, desc:{fr:"Chaque équipe transmet au poste de commandement selon un format clair et constant, jamais des impressions vagues.",en:"Every team reports to command post in a clear, consistent format, never vague impressions.",es:"Cada equipo informa al puesto de mando en un formato claro y constante, nunca impresiones vagas.",pt:"Cada equipa reporta ao posto de comando num formato claro e constante, nunca impressões vagas."} },
    { id:2, icon:"🔄", label:{fr:"Relève planifiée",en:"Planned relief",es:"Relevo planificado",pt:"Rendição planeada"}, desc:{fr:"La rotation des équipes est anticipée avant l'épuisement, jamais improvisée au dernier moment sous la contrainte.",en:"Team rotation is anticipated before exhaustion, never improvised at the last moment under pressure.",es:"La rotación de los equipos se anticipa antes del agotamiento, nunca se improvisa en el último momento bajo presión.",pt:"A rotação das equipas é antecipada antes do esgotamento, nunca improvisada no último momento sob pressão."} },
    { id:3, icon:"📦", label:{fr:"Transmission complète de l'information",en:"Complete information transfer",es:"Transmisión completa de la información",pt:"Transmissão completa da informação"}, desc:{fr:"Chaque détail connu sur la situation, la cargaison, les risques identifiés doit passer intégralement à l'équipe suivante.",en:"Every known detail about the situation, the cargo, the identified risks must pass entirely to the next team.",es:"Cada detalle conocido sobre la situación, la carga, los riesgos identificados debe transmitirse íntegramente al siguiente equipo.",pt:"Cada detalhe conhecido sobre a situação, a carga, os riscos identificados deve passar integralmente para a equipa seguinte."} },
    { id:4, icon:"⚠️", label:{fr:"Une relève mal faite repart de zéro",en:"A poor relief starts from zero",es:"Un relevo mal hecho empieza de cero",pt:"Uma rendição mal feita recomeça do zero"}, desc:{fr:"Si l'information ne passe pas intégralement, la nouvelle équipe recommence l'évaluation depuis le début, perdant tout l'avantage acquis.",en:"If information doesn't pass through entirely, the new team restarts the assessment from scratch, losing all the advantage gained.",es:"Si la información no pasa por completo, el nuevo equipo reinicia la evaluación desde cero, perdiendo toda la ventaja adquirida.",pt:"Se a informação não passar integralmente, a nova equipa recomeça a avaliação do zero, perdendo toda a vantagem adquirida."} },
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

// SVG 4 - DAMAGE CONTROL & RECOVERY
function DamageControlRecoverySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔍", label:{fr:"Inspection des compartiments",en:"Compartment inspection",es:"Inspección de los compartimentos",pt:"Inspeção dos compartimentos"}, desc:{fr:"Vérifier chaque espace affecté, pas seulement celui du foyer initial, avant de considérer l'incident clos.",en:"Check every affected space, not just the original fire's, before considering the incident closed.",es:"Comprobar cada espacio afectado, no solo el del foco original, antes de considerar cerrado el incidente.",pt:"Verificar cada espaço afetado, não apenas o do foco original, antes de considerar o incidente encerrado."} },
    { id:2, icon:"⚖️", label:{fr:"Vérification de la stabilité",en:"Stability check",es:"Verificación de la estabilidad",pt:"Verificação da estabilidade"}, desc:{fr:"L'eau utilisée pendant l'intervention peut avoir affecté la stabilité : une vérification s'impose si nécessaire.",en:"Water used during the intervention may have affected stability: a check is required if necessary.",es:"El agua usada durante la intervención puede haber afectado la estabilidad: se impone una verificación si es necesario.",pt:"A água usada durante a intervenção pode ter afetado a estabilidade: impõe-se uma verificação se necessário."} },
    { id:3, icon:"🔄", label:{fr:"Remise en service progressive",en:"Progressive return to service",es:"Puesta en servicio progresiva",pt:"Regresso progressivo ao serviço"}, desc:{fr:"Le navire ne redevient pas opérationnel d'un coup : chaque système est revérifié avant d'être remis en service.",en:"The ship doesn't become operational all at once: every system is rechecked before being put back into service.",es:"El buque no vuelve a estar operativo de golpe: cada sistema se vuelve a comprobar antes de ponerlo de nuevo en servicio.",pt:"O navio não volta a ficar operacional de repente: cada sistema é reverificado antes de ser posto de novo em serviço."} },
    { id:4, icon:"📝", label:{fr:"Débriefing et amélioration continue",en:"Debriefing and continuous improvement",es:"Debriefing y mejora continua",pt:"Debriefing e melhoria contínua"}, desc:{fr:"Ce qui a fonctionné, ce qui doit changer : chaque intervention nourrit la préparation de la suivante.",en:"What worked, what must change: every intervention feeds the preparation for the next one.",es:"Lo que funcionó, lo que debe cambiar: cada intervención alimenta la preparación de la siguiente.",pt:"O que funcionou, o que deve mudar: cada intervenção alimenta a preparação da seguinte."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"L'intervention n'est réellement terminée que lorsque le navire est redevenu sûr.":lang==="en"?"The intervention is only truly over when the ship has become safe again.":lang==="es"?"La intervención solo termina realmente cuando el buque ha vuelto a ser seguro.":"A intervenção só termina realmente quando o navio voltou a ser seguro."}</div>
    </div>
  );
}

// EXERCISE - COMMAND & COORDINATION DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Une équipe d'attaque combat un feu sans équipe de réserve assemblée à proximité. Que pensez-vous de cette situation ?\na) C'est acceptable si l'équipe d'attaque est expérimentée\nb) C'est dangereux : la réserve doit être prête avant que l'attaque ne commence, jamais assemblée après un problème\nc) La réserve n'est utile que pour les très grands feux"},
      {id:"q2",q:"Une équipe est relevée après une longue intervention, mais transmet seulement un résumé oral rapide. Que risque-t-il de se passer ?\na) La nouvelle équipe repart de zéro dans son évaluation, perdant l'avantage acquis\nb) Rien de particulier, l'essentiel a été dit\nc) La relève est toujours plus efficace avec moins d'informations"},
      {id:"q3",q:"Le feu semble maîtrisé et l'équipage prépare le retour au port pour transférer l'intervention à des secours à terre. Que faut-il transmettre en priorité ?\na) Uniquement l'heure d'arrivée prévue\nb) Uniquement le nombre de membres d'équipage impliqués\nc) Toutes les informations connues sur la cargaison, les risques identifiés et les actions déjà menées"},
      {id:"q4",q:"Quand considère-t-on qu'une intervention incendie est réellement terminée ?\na) Dès que les flammes ne sont plus visibles\nb) Quand le navire est redevenu sûr : compartiments inspectés, stabilité vérifiée, systèmes remis en service, débriefing effectué\nc) Dès que le matériel est rangé"},
    ],
    en:[
      {id:"q1",q:"An attack team is fighting a fire with no reserve team assembled nearby. What do you think of this situation?\na) Acceptable if the attack team is experienced\nb) Dangerous: the reserve must be ready before the attack begins, never assembled after a problem occurs\nc) Reserve is only useful for very large fires"},
      {id:"q2",q:"A team is relieved after a long intervention but only gives a quick verbal summary. What is likely to happen?\na) The new team restarts its assessment from scratch, losing the advantage gained\nb) Nothing in particular, the essentials were said\nc) Relief is always more effective with less information"},
      {id:"q3",q:"The fire seems under control and the crew is preparing to return to port to hand over the intervention to shore-based responders. What must be transmitted as a priority?\na) Only the expected arrival time\nb) Only the number of crew members involved\nc) All known information about the cargo, identified risks, and actions already taken"},
      {id:"q4",q:"When is a fire intervention considered truly over?\na) As soon as flames are no longer visible\nb) When the ship has become safe again: compartments inspected, stability checked, systems back in service, debriefing done\nc) As soon as the equipment is put away"},
    ],
    es:[
      {id:"q1",q:"Un equipo de ataque combate un fuego sin un equipo de reserva reunido cerca. ¿Qué piensas de esta situación?\na) Aceptable si el equipo de ataque tiene experiencia\nb) Peligroso: la reserva debe estar lista antes de que empiece el ataque, nunca reunida después de un problema\nc) La reserva solo sirve para fuegos muy grandes"},
      {id:"q2",q:"Un equipo es relevado tras una larga intervención, pero solo da un resumen verbal rápido. ¿Qué es probable que ocurra?\na) El nuevo equipo reinicia su evaluación desde cero, perdiendo la ventaja adquirida\nb) Nada en particular, lo esencial se dijo\nc) El relevo siempre es más eficaz con menos información"},
      {id:"q3",q:"El fuego parece controlado y la tripulación se prepara para regresar al puerto y entregar la intervención a socorristas terrestres. ¿Qué hay que transmitir con prioridad?\na) Solo la hora prevista de llegada\nb) Solo el número de tripulantes implicados\nc) Toda la información conocida sobre la carga, los riesgos identificados y las acciones ya realizadas"},
      {id:"q4",q:"¿Cuándo se considera que una intervención de incendio ha terminado realmente?\na) En cuanto las llamas ya no son visibles\nb) Cuando el buque ha vuelto a ser seguro: compartimentos inspeccionados, estabilidad comprobada, sistemas de nuevo en servicio, debriefing realizado\nc) En cuanto se guarda el material"},
    ],
    pt:[
      {id:"q1",q:"Uma equipa de ataque combate um fogo sem uma equipa de reserva reunida por perto. O que pensas desta situação?\na) Aceitável se a equipa de ataque for experiente\nb) Perigoso: a reserva deve estar pronta antes de o ataque começar, nunca reunida depois de um problema\nc) A reserva só é útil para grandes incêndios"},
      {id:"q2",q:"Uma equipa é rendida após uma longa intervenção, mas dá apenas um resumo verbal rápido. O que é provável que aconteça?\na) A nova equipa recomeça a sua avaliação do zero, perdendo a vantagem adquirida\nb) Nada em particular, o essencial foi dito\nc) A rendição é sempre mais eficaz com menos informação"},
      {id:"q3",q:"O fogo parece controlado e a tripulação prepara-se para regressar ao porto para transferir a intervenção a socorristas terrestres. O que deve ser transmitido com prioridade?\na) Apenas a hora prevista de chegada\nb) Apenas o número de tripulantes envolvidos\nc) Toda a informação conhecida sobre a carga, os riscos identificados e as ações já realizadas"},
      {id:"q4",q:"Quando se considera que uma intervenção de incêndio terminou realmente?\na) Assim que as chamas deixam de ser visíveis\nb) Quando o navio voltou a ser seguro: compartimentos inspecionados, estabilidade verificada, sistemas de novo em serviço, debriefing feito\nc) Assim que o material é arrumado"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (M.V. ZHONGHUAFUQIANG)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - M.V. Zhonghuafuqiang",teaser:"Cas réel documenté - transfert de commandement incomplet, explosion à quai",
      what:"Pendant une traversée, un feu se déclare dans un compartiment à véhicules. Le commandant fait d'abord usage d'un extincteur sans connaître précisément la nature de la cargaison, puis fait pulvériser de l'eau après qu'un officier a signalé qu'il s'agissait de boue de silicium. Cette boue réagit avec l'eau en produisant de l'hydrogène, un gaz inflammable. L'équipage referme ensuite le compartiment et déclenche le CO2 pour éteindre le feu, puis le navire fait demi-tour vers son port de départ. À l'arrivée, le commandement de l'intervention est transféré au service d'incendie à terre. Le service à terre ouvre le compartiment pour combattre le feu, provoquant une explosion qui cause de sévères dommages au navire.",
      cause:"• De l'eau a été pulvérisée sur une cargaison qui réagit avec l'eau en produisant un gaz inflammable\n• Le compartiment a ensuite été refermé et le CO2 déclenché, avant un retour au port\n• Le commandement de l'intervention a été transféré au service d'incendie à terre à l'arrivée\n• Le service à terre a ouvert le compartiment sans connaître pleinement les risques liés à la cargaison et à l'eau déjà utilisée, provoquant une explosion",
      lessons:"✓ Equipment Controls Fire. Leadership Controls the Outcome : l'extinction initiale n'a pas suffi à éviter la catastrophe, faute d'une transmission complète\n✓ Une relève ou un transfert de commandement mal fait repart de zéro, ou pire, agit sur une information incomplète\n✓ Toute information critique sur la cargaison et les actions déjà menées doit être transmise intégralement à toute équipe qui prend le relais\n✓ Ce cas illustre directement pourquoi ce module insiste sur la communication et la relève, pas seulement sur les techniques d'extinction",
      link:"🔗 Ce cas montre qu'un incendie initialement maîtrisé peut se transformer en catastrophe si le commandement et l'information ne sont pas transmis intégralement à l'équipe suivante."},
    en:{title:"Case Study - M.V. Zhonghuafuqiang",teaser:"Real documented case - incomplete command transfer, explosion at berth",
      what:"During a voyage, a fire breaks out in a vehicle compartment. The captain first uses an extinguisher without knowing the precise nature of the cargo, then has water sprayed after an officer reports it is silicon mud. This mud reacts with water to produce hydrogen, a flammable gas. The crew then closes the compartment and releases CO2 to extinguish the fire, and the ship turns back to its departure port. On arrival, command of the intervention is transferred to the shore-based fire department. The shore department opens the compartment to fight the fire, causing an explosion that severely damages the ship.",
      cause:"• Water was sprayed onto cargo that reacts with water to produce a flammable gas\n• The compartment was then closed and CO2 released, before returning to port\n• Command of the intervention was transferred to the shore-based fire department on arrival\n• The shore department opened the compartment without fully knowing the risks related to the cargo and the water already used, causing an explosion",
      lessons:"✓ Equipment Controls Fire. Leadership Controls the Outcome: the initial extinction was not enough to prevent the disaster, for lack of a complete transfer of information\n✓ A poorly done relief or command transfer starts from zero, or worse, acts on incomplete information\n✓ Any critical information about the cargo and actions already taken must be transmitted entirely to any team taking over\n✓ This case directly illustrates why this module insists on communication and relief, not only on extinguishing techniques",
      link:"🔗 This case shows that an initially controlled fire can turn into a disaster if command and information are not fully transmitted to the next team."},
    es:{title:"Caso de estudio - M.V. Zhonghuafuqiang",teaser:"Caso real documentado - transferencia de mando incompleta, explosión en el muelle",
      what:"Durante una travesía, se declara un incendio en un compartimento de vehículos. El capitán usa primero un extintor sin conocer la naturaleza precisa de la carga, y luego hace rociar agua después de que un oficial informara de que se trataba de barro de silicio. Este barro reacciona con el agua produciendo hidrógeno, un gas inflamable. La tripulación cierra después el compartimento y libera CO2 para apagar el fuego, y el buque regresa a su puerto de salida. A la llegada, el mando de la intervención se transfiere al servicio de bomberos terrestre. El servicio terrestre abre el compartimento para combatir el fuego, provocando una explosión que causa graves daños al buque.",
      cause:"• Se roció agua sobre una carga que reacciona con el agua produciendo un gas inflamable\n• El compartimento se cerró después y se liberó CO2, antes de regresar al puerto\n• El mando de la intervención se transfirió al servicio de bomberos terrestre a la llegada\n• El servicio terrestre abrió el compartimento sin conocer plenamente los riesgos relacionados con la carga y el agua ya utilizada, provocando una explosión",
      lessons:"✓ Equipment Controls Fire. Leadership Controls the Outcome: la extinción inicial no bastó para evitar la catástrofe, por falta de una transmisión completa\n✓ Un relevo o una transferencia de mando mal hecha empieza de cero, o peor, actúa sobre información incompleta\n✓ Toda información crítica sobre la carga y las acciones ya realizadas debe transmitirse íntegramente a cualquier equipo que tome el relevo\n✓ Este caso ilustra directamente por qué este módulo insiste en la comunicación y el relevo, no solo en las técnicas de extinción",
      link:"🔗 Este caso muestra que un incendio inicialmente controlado puede convertirse en una catástrofe si el mando y la información no se transmiten por completo al siguiente equipo."},
    pt:{title:"Caso de estudo - M.V. Zhonghuafuqiang",teaser:"Caso real documentado - transferência de comando incompleta, explosão no cais",
      what:"Durante uma travessia, deflagra um incêndio num compartimento de veículos. O comandante usa primeiro um extintor sem conhecer a natureza precisa da carga, e depois manda pulverizar água depois de um oficial ter reportado tratar-se de lama de silício. Esta lama reage com a água produzindo hidrogénio, um gás inflamável. A tripulação fecha depois o compartimento e liberta CO2 para apagar o fogo, e o navio regressa ao seu porto de partida. À chegada, o comando da intervenção é transferido para o serviço de bombeiros terrestre. O serviço terrestre abre o compartimento para combater o fogo, provocando uma explosão que causa graves danos ao navio.",
      cause:"• Foi pulverizada água sobre uma carga que reage com a água produzindo um gás inflamável\n• O compartimento foi depois fechado e o CO2 libertado, antes de regressar ao porto\n• O comando da intervenção foi transferido para o serviço de bombeiros terrestre à chegada\n• O serviço terrestre abriu o compartimento sem conhecer plenamente os riscos relacionados com a carga e a água já utilizada, provocando uma explosão",
      lessons:"✓ Equipment Controls Fire. Leadership Controls the Outcome: a extinção inicial não bastou para evitar a catástrofe, por falta de uma transmissão completa\n✓ Uma rendição ou uma transferência de comando mal feita recomeça do zero, ou pior, age sobre informação incompleta\n✓ Toda a informação crítica sobre a carga e as ações já realizadas deve ser transmitida integralmente a qualquer equipa que assuma o comando\n✓ Este caso ilustra diretamente por que este módulo insiste na comunicação e na rendição, não apenas nas técnicas de extinção",
      link:"🔗 Este caso mostra que um incêndio inicialmente controlado pode transformar-se numa catástrofe se o comando e a informação não forem totalmente transmitidos à equipa seguinte."},
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
    {q:"Que signifie le principe 'Equipment Controls Fire. Leadership Controls the Outcome' ?",opts:["Le matériel seul suffit toujours à garantir une bonne issue","Le matériel agit sur le feu, mais c'est le commandement qui détermine si l'issue globale est bonne ou mauvaise","Le commandement n'a aucune influence réelle sur l'issue","Ce principe ne concerne que les feux électriques"],correct:1,expl:"Même avec le meilleur équipement, une mauvaise coordination peut transformer un incident maîtrisé en catastrophe."},
    {q:"Cette leçon commence-t-elle au moment de la découverte du feu ?",opts:["Oui, elle couvre toute la chronologie depuis la découverte","Non, elle commence quand l'urgence est déjà déclarée et les équipes déjà mobilisées","Oui, mais uniquement pour les feux électriques","Non, elle ne couvre aucune étape de l'intervention"],correct:1,expl:"La découverte, l'alerte et le choix des EPI selon le risque seront couverts par le futur module S6."},
    {q:"Qui détient l'autorité finale sur les décisions majeures comme le déclenchement d'un système fixe ?",opts:["N'importe quel membre de l'équipe présente","Le commandant","Uniquement le chef d'intervention sur zone","Aucune autorité n'est nécessaire dans l'urgence"],correct:1,expl:"Le commandant détient l'autorité finale sur les décisions majeures, comme vu en Leçon 4."},
    {q:"Que fait le chef d'intervention sur zone ?",opts:["Il remplace le commandant dans toutes les décisions","Il coordonne les équipes directement sur zone et transmet la situation au commandant","Il n'a aucun rôle de coordination","Il agit uniquement après la fin de l'incendie"],correct:1,expl:"Le chef d'intervention coordonne sur zone et fait remonter l'information, sans se substituer au commandant."},
    {q:"Pourquoi l'équipe de réserve doit-elle être prête avant que l'attaque ne commence ?",opts:["Ce n'est pas nécessaire, elle peut être assemblée après un problème","Sa présence permet à l'équipe d'attaque de prendre des risques calculés en sachant qu'un secours immédiat existe","Elle n'a aucune utilité réelle","Elle remplace l'équipe de soutien"],correct:1,expl:"Une réserve assemblée seulement après un problème arrive toujours trop tard."},
    {q:"Pourquoi les équipes d'attaque, de soutien et de réserve doivent-elles fonctionner simultanément ?",opts:["Elles peuvent travailler entièrement indépendamment les unes des autres","Chacune dépend des deux autres pour que l'ensemble forme une réponse cohérente","Seule l'équipe d'attaque compte réellement","La simultanéité n'a aucune importance"],correct:1,expl:"Ces trois équipes ont des missions différentes mais complémentaires, jamais isolées."},
    {q:"Que risque une équipe qui prend le relais après une relève mal faite ?",opts:["Rien de particulier","Elle repart de zéro dans son évaluation, perdant tout l'avantage acquis par l'équipe précédente","Elle travaille toujours plus vite qu'avant","Elle n'a besoin d'aucune information supplémentaire"],correct:1,expl:"Une relève mal faite fait perdre tout l'avantage acquis, obligeant à recommencer l'évaluation."},
    {q:"Quelles informations doivent être transmises intégralement lors d'un transfert de commandement ou d'une relève ?",opts:["Uniquement l'heure de l'incident","Tout ce qui est connu sur la situation, la cargaison et les risques identifiés","Uniquement le nombre de personnes impliquées","Aucune information n'est nécessaire si le feu semble maîtrisé"],correct:1,expl:"Le cas du M.V. Zhonghuafuqiang illustre directement les conséquences d'une transmission incomplète."},
    {q:"Que couvre le Damage Control après l'extinction du feu ?",opts:["Uniquement nettoyer et ranger le matériel","Inspection des compartiments, vérification de la stabilité, remise en service progressive, débriefing","Uniquement le débriefing","Rien de spécifique n'est nécessaire après l'extinction"],correct:1,expl:"Le Damage Control va bien au-delà du simple nettoyage : c'est un processus complet de retour à la sécurité."},
    {q:"Quand considère-t-on qu'une intervention est réellement terminée ?",opts:["Dès que les flammes ne sont plus visibles","Quand le navire est redevenu sûr, après inspection, vérification et remise en service progressive","Dès que l'équipe d'attaque quitte la zone","Dès que le rapport initial est rédigé"],correct:1,expl:"L'intervention n'est réellement terminée que lorsque le navire est redevenu sûr, pas à la disparition des flammes."},
    {q:"Dans le cas du M.V. Zhonghuafuqiang, qu'est-ce qui a provoqué l'explosion finale ?",opts:["Un système fixe défaillant","Le service d'incendie à terre a ouvert le compartiment sans connaître pleinement les risques liés à la cargaison et à l'eau déjà utilisée","Une deuxième fuite de carburant","Un problème électrique indépendant"],correct:1,expl:"L'ouverture du compartiment par l'équipe à terre, sans information complète, a provoqué l'explosion."},
    {q:"Pourquoi ce cas est-il pertinent pour une leçon sur le commandement, plutôt que sur les techniques d'extinction ?",opts:["Parce que l'extinction initiale a échoué techniquement","Parce que l'incendie était déjà maîtrisé, et c'est la transmission de commandement qui a échoué, provoquant la catastrophe","Parce qu'aucune équipe n'est intervenue","Parce que le cas ne concerne pas un incendie"],correct:1,expl:"Le feu était sous contrôle : c'est l'échec de la transmission d'information au commandement suivant qui a causé le désastre."},
    {q:"Quelle est la version officielle et complète du MAP Fire Mindset ?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Detect → Command → Fight","Detect → Command → Recover uniquement"],correct:1,expl:"C'est la version officielle et définitive du Fire Mindset pour tout le module S4."},
    {q:"Quelle est la frontière entre S4 (Firefighting) et le futur S6 (Emergency Response & Safety Operations) ?",opts:["Il n'y a aucune différence","S4 enseigne comment survivre et gérer un incendie déjà déclaré ; S6 enseignera comment répondre à n'importe quelle urgence dès sa découverte","S6 remplace entièrement S4","S4 couvre uniquement les rondes de sécurité"],correct:1,expl:"S4 reste centré sur l'incendie déjà en cours ; S6 couvrira la chronologie complète depuis la découverte de tout type d'incident."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée au commandement réel d'une intervention ?",opts:["Oui, il équivaut à une certification complète","Non, il enseigne des principes de coordination et de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les principes de coordination, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'Equipment Controls Fire. Leadership Controls the Outcome' mean?",opts:["Equipment alone always guarantees a good outcome","Equipment acts on the fire, but leadership determines whether the overall outcome is good or bad","Leadership has no real influence on the outcome","This principle only concerns electrical fires"],correct:1,expl:"Even with the best equipment, poor coordination can turn a controlled incident into a disaster."},
    {q:"Does this lesson begin at the moment the fire is discovered?",opts:["Yes, it covers the entire timeline from discovery","No, it begins when the emergency is already declared and teams already mobilized","Yes, but only for electrical fires","No, it covers no stage of the intervention"],correct:1,expl:"Discovery, raising the alarm, and choosing PPE based on risk will be covered by the future S6 module."},
    {q:"Who holds final authority over major decisions like releasing a fixed system?",opts:["Any team member present","The captain","Only the on-scene incident commander","No authority is needed in an emergency"],correct:1,expl:"The captain holds final authority over major decisions, as seen in Lesson 4."},
    {q:"What does the on-scene incident commander do?",opts:["Replaces the captain in all decisions","Coordinates teams directly on scene and reports the situation to the captain","Has no coordination role at all","Only acts after the fire is over"],correct:1,expl:"The incident commander coordinates on scene and relays information up, without replacing the captain."},
    {q:"Why must the reserve team be ready before the attack begins?",opts:["It isn't necessary, it can be assembled after a problem occurs","Its presence allows the attack team to take calculated risks knowing immediate help exists","It has no real use","It replaces the support team"],correct:1,expl:"A reserve assembled only after a problem occurs always arrives too late."},
    {q:"Why must attack, support, and reserve teams operate simultaneously?",opts:["They can work entirely independently of each other","Each depends on the other two for the whole to form a coherent response","Only the attack team really matters","Simultaneity has no importance"],correct:1,expl:"These three teams have different but complementary missions, never isolated."},
    {q:"What does a team risk when taking over after a poorly done relief?",opts:["Nothing in particular","It restarts its assessment from scratch, losing all the advantage gained by the previous team","It always works faster than before","It needs no additional information"],correct:1,expl:"A poorly done relief loses all the advantage gained, forcing the assessment to restart."},
    {q:"What information must be transmitted entirely during a command transfer or relief?",opts:["Only the time of the incident","Everything known about the situation, the cargo, and identified risks","Only the number of people involved","No information is necessary if the fire seems under control"],correct:1,expl:"The M.V. Zhonghuafuqiang case directly illustrates the consequences of incomplete transfer."},
    {q:"What does Damage Control cover after the fire is extinguished?",opts:["Only cleaning and putting away equipment","Compartment inspection, stability check, progressive return to service, debriefing","Only debriefing","Nothing specific is needed after extinction"],correct:1,expl:"Damage Control goes well beyond simple cleanup: it's a complete process of returning to safety."},
    {q:"When is an intervention considered truly over?",opts:["As soon as flames are no longer visible","When the ship has become safe again, after inspection, verification, and progressive return to service","As soon as the attack team leaves the area","As soon as the initial report is written"],correct:1,expl:"The intervention is only truly over when the ship has become safe again, not when flames disappear."},
    {q:"In the M.V. Zhonghuafuqiang case, what caused the final explosion?",opts:["A failing fixed system","The shore-based fire department opened the compartment without fully knowing the risks related to the cargo and the water already used","A second fuel leak","An unrelated electrical problem"],correct:1,expl:"The shore team opening the compartment without complete information caused the explosion."},
    {q:"Why is this case relevant to a lesson on command rather than extinguishing techniques?",opts:["Because the initial extinction technically failed","Because the fire was already under control, and it was the command transfer that failed, causing the disaster","Because no team intervened","Because the case doesn't involve a fire"],correct:1,expl:"The fire was under control: it was the failure of information transfer to the next command that caused the disaster."},
    {q:"What is the official, complete version of the MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Detect → Command → Fight","Detect → Command → Recover only"],correct:1,expl:"This is the official, definitive version of the Fire Mindset for the whole S4 module."},
    {q:"What is the boundary between S4 (Firefighting) and the future S6 (Emergency Response & Safety Operations)?",opts:["There is no difference","S4 teaches how to survive and manage a fire already declared; S6 will teach how to respond to any emergency from its discovery","S6 entirely replaces S4","S4 only covers safety rounds"],correct:1,expl:"S4 stays focused on a fire already underway; S6 will cover the full timeline from discovering any type of incident."},
    {q:"Does this module teach a replacement for certified practical BST training in actually commanding an intervention?",opts:["Yes, it is equivalent to a full certification","No, it teaches coordination and decision principles, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches coordination principles, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Equipment Controls Fire. Leadership Controls the Outcome'?",opts:["El equipo por sí solo siempre garantiza un buen resultado","El equipo actúa sobre el fuego, pero el liderazgo determina si el resultado global es bueno o malo","El liderazgo no tiene ninguna influencia real en el resultado","Este principio solo concierne a los fuegos eléctricos"],correct:1,expl:"Incluso con el mejor equipo, una mala coordinación puede convertir un incidente controlado en una catástrofe."},
    {q:"¿Esta lección empieza en el momento del descubrimiento del fuego?",opts:["Sí, cubre toda la cronología desde el descubrimiento","No, empieza cuando la urgencia ya está declarada y los equipos ya movilizados","Sí, pero solo para fuegos eléctricos","No, no cubre ninguna etapa de la intervención"],correct:1,expl:"El descubrimiento, la alerta y la elección del EPP según el riesgo se cubrirán en el futuro módulo S6."},
    {q:"¿Quién tiene la autoridad final sobre las decisiones importantes como disparar un sistema fijo?",opts:["Cualquier miembro del equipo presente","El capitán","Solo el jefe de intervención en la zona","No se necesita ninguna autoridad en la urgencia"],correct:1,expl:"El capitán tiene la autoridad final sobre las decisiones importantes, como se vio en la Lección 4."},
    {q:"¿Qué hace el jefe de intervención en la zona?",opts:["Sustituye al capitán en todas las decisiones","Coordina a los equipos directamente en la zona y transmite la situación al capitán","No tiene ningún papel de coordinación","Solo actúa después de que el incendio termine"],correct:1,expl:"El jefe de intervención coordina en la zona y transmite la información, sin sustituir al capitán."},
    {q:"¿Por qué el equipo de reserva debe estar listo antes de que empiece el ataque?",opts:["No es necesario, puede reunirse después de un problema","Su presencia permite al equipo de ataque tomar riesgos calculados sabiendo que existe ayuda inmediata","No tiene ninguna utilidad real","Sustituye al equipo de apoyo"],correct:1,expl:"Una reserva reunida solo después de un problema siempre llega demasiado tarde."},
    {q:"¿Por qué los equipos de ataque, apoyo y reserva deben funcionar simultáneamente?",opts:["Pueden trabajar de forma totalmente independiente entre sí","Cada uno depende de los otros dos para que el conjunto forme una respuesta coherente","Solo el equipo de ataque importa realmente","La simultaneidad no tiene importancia"],correct:1,expl:"Estos tres equipos tienen misiones diferentes pero complementarias, nunca aisladas."},
    {q:"¿Qué arriesga un equipo que toma el relevo tras un relevo mal hecho?",opts:["Nada en particular","Reinicia su evaluación desde cero, perdiendo toda la ventaja adquirida por el equipo anterior","Siempre trabaja más rápido que antes","No necesita ninguna información adicional"],correct:1,expl:"Un relevo mal hecho hace perder toda la ventaja adquirida, obligando a reiniciar la evaluación."},
    {q:"¿Qué información debe transmitirse íntegramente durante una transferencia de mando o un relevo?",opts:["Solo la hora del incidente","Todo lo conocido sobre la situación, la carga y los riesgos identificados","Solo el número de personas implicadas","No se necesita ninguna información si el fuego parece controlado"],correct:1,expl:"El caso del M.V. Zhonghuafuqiang ilustra directamente las consecuencias de una transferencia incompleta."},
    {q:"¿Qué cubre el Damage Control tras la extinción del fuego?",opts:["Solo limpiar y guardar el material","Inspección de los compartimentos, verificación de la estabilidad, puesta en servicio progresiva, debriefing","Solo el debriefing","No se necesita nada específico tras la extinción"],correct:1,expl:"El Damage Control va mucho más allá de la simple limpieza: es un proceso completo de retorno a la seguridad."},
    {q:"¿Cuándo se considera que una intervención ha terminado realmente?",opts:["En cuanto las llamas ya no son visibles","Cuando el buque ha vuelto a ser seguro, tras inspección, verificación y puesta en servicio progresiva","En cuanto el equipo de ataque abandona la zona","En cuanto se redacta el informe inicial"],correct:1,expl:"La intervención solo termina realmente cuando el buque ha vuelto a ser seguro, no cuando desaparecen las llamas."},
    {q:"En el caso del M.V. Zhonghuafuqiang, ¿qué provocó la explosión final?",opts:["Un sistema fijo defectuoso","El servicio de bomberos terrestre abrió el compartimento sin conocer plenamente los riesgos relacionados con la carga y el agua ya utilizada","Una segunda fuga de combustible","Un problema eléctrico independiente"],correct:1,expl:"La apertura del compartimento por el equipo terrestre, sin información completa, provocó la explosión."},
    {q:"¿Por qué este caso es pertinente para una lección sobre el mando, en lugar de sobre técnicas de extinción?",opts:["Porque la extinción inicial falló técnicamente","Porque el incendio ya estaba controlado, y fue la transferencia de mando la que falló, provocando la catástrofe","Porque ningún equipo intervino","Porque el caso no concierne a un incendio"],correct:1,expl:"El fuego estaba bajo control: fue el fallo en la transmisión de información al siguiente mando lo que causó el desastre."},
    {q:"¿Cuál es la versión oficial y completa del MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Detect → Command → Fight","Solo Detect → Command → Recover"],correct:1,expl:"Esta es la versión oficial y definitiva del Fire Mindset para todo el módulo S4."},
    {q:"¿Cuál es la frontera entre S4 (Firefighting) y el futuro S6 (Emergency Response & Safety Operations)?",opts:["No hay ninguna diferencia","S4 enseña cómo sobrevivir y gestionar un incendio ya declarado; S6 enseñará cómo responder a cualquier urgencia desde su descubrimiento","S6 sustituye por completo a S4","S4 solo cubre las rondas de seguridad"],correct:1,expl:"S4 se mantiene centrado en un incendio ya en curso; S6 cubrirá toda la cronología desde el descubrimiento de cualquier tipo de incidente."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada en el mando real de una intervención?",opts:["Sí, equivale a una certificación completa","No, enseña principios de coordinación y decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de coordinación, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'Equipment Controls Fire. Leadership Controls the Outcome'?",opts:["O equipamento por si só garante sempre um bom resultado","O equipamento atua sobre o fogo, mas a liderança determina se o resultado global é bom ou mau","A liderança não tem qualquer influência real no resultado","Este princípio só diz respeito a incêndios elétricos"],correct:1,expl:"Mesmo com o melhor equipamento, uma má coordenação pode transformar um incidente controlado numa catástrofe."},
    {q:"Esta lição começa no momento da descoberta do fogo?",opts:["Sim, cobre toda a cronologia desde a descoberta","Não, começa quando a urgência já está declarada e as equipas já mobilizadas","Sim, mas só para incêndios elétricos","Não, não cobre nenhuma etapa da intervenção"],correct:1,expl:"A descoberta, o alerta e a escolha do EPI segundo o risco serão cobertos pelo futuro módulo S6."},
    {q:"Quem detém a autoridade final sobre as decisões importantes como o disparo de um sistema fixo?",opts:["Qualquer membro da equipa presente","O comandante","Só o chefe de intervenção na zona","Nenhuma autoridade é necessária na urgência"],correct:1,expl:"O comandante detém a autoridade final sobre as decisões importantes, como visto na Lição 4."},
    {q:"O que faz o chefe de intervenção na zona?",opts:["Substitui o comandante em todas as decisões","Coordena as equipas diretamente na zona e transmite a situação ao comandante","Não tem qualquer papel de coordenação","Só age depois de o incêndio terminar"],correct:1,expl:"O chefe de intervenção coordena na zona e transmite a informação, sem substituir o comandante."},
    {q:"Por que a equipa de reserva deve estar pronta antes de o ataque começar?",opts:["Não é necessário, pode ser reunida depois de um problema","A sua presença permite à equipa de ataque assumir riscos calculados sabendo que existe ajuda imediata","Não tem qualquer utilidade real","Substitui a equipa de apoio"],correct:1,expl:"Uma reserva reunida apenas depois de um problema chega sempre tarde demais."},
    {q:"Por que as equipas de ataque, apoio e reserva devem funcionar simultaneamente?",opts:["Podem trabalhar de forma totalmente independente umas das outras","Cada uma depende das outras duas para que o conjunto forme uma resposta coerente","Só a equipa de ataque importa realmente","A simultaneidade não tem importância"],correct:1,expl:"Estas três equipas têm missões diferentes mas complementares, nunca isoladas."},
    {q:"O que arrisca uma equipa que assume o comando após uma rendição mal feita?",opts:["Nada em particular","Recomeça a sua avaliação do zero, perdendo toda a vantagem adquirida pela equipa anterior","Trabalha sempre mais depressa do que antes","Não precisa de nenhuma informação adicional"],correct:1,expl:"Uma rendição mal feita faz perder toda a vantagem adquirida, obrigando a recomeçar a avaliação."},
    {q:"Que informação deve ser transmitida integralmente durante uma transferência de comando ou uma rendição?",opts:["Apenas a hora do incidente","Tudo o que é conhecido sobre a situação, a carga e os riscos identificados","Apenas o número de pessoas envolvidas","Nenhuma informação é necessária se o fogo parecer controlado"],correct:1,expl:"O caso do M.V. Zhonghuafuqiang ilustra diretamente as consequências de uma transferência incompleta."},
    {q:"O que cobre o Damage Control após a extinção do fogo?",opts:["Só limpar e arrumar o material","Inspeção dos compartimentos, verificação da estabilidade, regresso progressivo ao serviço, debriefing","Só o debriefing","Nada de específico é necessário após a extinção"],correct:1,expl:"O Damage Control vai muito além da simples limpeza: é um processo completo de regresso à segurança."},
    {q:"Quando se considera que uma intervenção terminou realmente?",opts:["Assim que as chamas deixam de ser visíveis","Quando o navio voltou a ser seguro, após inspeção, verificação e regresso progressivo ao serviço","Assim que a equipa de ataque deixa a zona","Assim que o relatório inicial é redigido"],correct:1,expl:"A intervenção só termina realmente quando o navio voltou a ser seguro, não quando as chamas desaparecem."},
    {q:"No caso do M.V. Zhonghuafuqiang, o que provocou a explosão final?",opts:["Um sistema fixo defeituoso","O serviço de bombeiros terrestre abriu o compartimento sem conhecer plenamente os riscos relacionados com a carga e a água já utilizada","Uma segunda fuga de combustível","Um problema elétrico independente"],correct:1,expl:"A abertura do compartimento pela equipa terrestre, sem informação completa, provocou a explosão."},
    {q:"Por que este caso é pertinente para uma lição sobre comando, em vez de técnicas de extinção?",opts:["Porque a extinção inicial falhou tecnicamente","Porque o incêndio já estava controlado, e foi a transferência de comando que falhou, provocando a catástrofe","Porque nenhuma equipa interveio","Porque o caso não envolve um incêndio"],correct:1,expl:"O fogo estava sob controlo: foi a falha na transmissão de informação ao comando seguinte que causou o desastre."},
    {q:"Qual é a versão oficial e completa do MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Detect → Command → Fight","Só Detect → Command → Recover"],correct:1,expl:"Esta é a versão oficial e definitiva do Fire Mindset para todo o módulo S4."},
    {q:"Qual é a fronteira entre S4 (Firefighting) e o futuro S6 (Emergency Response & Safety Operations)?",opts:["Não há nenhuma diferença","S4 ensina como sobreviver e gerir um incêndio já declarado; S6 ensinará como responder a qualquer urgência desde a sua descoberta","S6 substitui inteiramente S4","S4 só cobre as rondas de segurança"],correct:1,expl:"S4 mantém-se centrado num incêndio já em curso; S6 cobrirá toda a cronologia desde a descoberta de qualquer tipo de incidente."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada no comando real de uma intervenção?",opts:["Sim, equivale a uma certificação completa","Não, ensina princípios de coordenação e decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de coordenação, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Equipment Controls Fire. Leadership Controls the Outcome' ?",opts:["Le matériel seul garantit toujours l'issue","Le matériel agit sur le feu, mais le commandement détermine l'issue globale","Le commandement n'a aucune influence","Cela ne concerne que l'électricité"],correct:1,expl:"Une mauvaise coordination peut transformer un incident maîtrisé en catastrophe."},
    {q:"Pourquoi la réserve doit-elle être prête avant l'attaque ?",opts:["Ce n'est pas nécessaire","Sa présence permet des risques calculés, sachant qu'un secours immédiat existe","Elle remplace le soutien","Elle n'a aucune utilité"],correct:1,expl:"Une réserve assemblée après un problème arrive toujours trop tard."},
    {q:"Que risque une équipe après une relève mal faite ?",opts:["Rien","Elle repart de zéro, perdant l'avantage acquis","Elle travaille plus vite","Elle n'a besoin de rien"],correct:1,expl:"Une relève mal faite fait perdre tout l'avantage acquis."},
    {q:"Dans le cas du M.V. Zhonghuafuqiang, qu'est-ce qui a causé l'explosion ?",opts:["Un système fixe défaillant","Le service à terre a ouvert le compartiment sans connaître pleinement les risques","Une fuite de carburant","Un problème électrique"],correct:1,expl:"L'ouverture sans information complète a provoqué l'explosion."},
    {q:"Quelle est la version officielle du MAP Fire Mindset ?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Command → Fight","Detect → Command → Recover"],correct:1,expl:"C'est la version officielle et définitive pour tout le module S4."},
  ],
  en:[
    {q:"What does 'Equipment Controls Fire. Leadership Controls the Outcome' mean?",opts:["Equipment alone always guarantees the outcome","Equipment acts on the fire, but leadership determines the overall outcome","Leadership has no influence","It only concerns electricity"],correct:1,expl:"Poor coordination can turn a controlled incident into a disaster."},
    {q:"Why must the reserve be ready before the attack?",opts:["It isn't necessary","Its presence allows calculated risks, knowing immediate help exists","It replaces support","It has no use"],correct:1,expl:"A reserve assembled after a problem always arrives too late."},
    {q:"What does a team risk after a poorly done relief?",opts:["Nothing","It restarts from scratch, losing the advantage gained","It works faster","It needs nothing"],correct:1,expl:"A poorly done relief loses all the advantage gained."},
    {q:"In the M.V. Zhonghuafuqiang case, what caused the explosion?",opts:["A failing fixed system","The shore team opened the compartment without fully knowing the risks","A fuel leak","An electrical problem"],correct:1,expl:"Opening without complete information caused the explosion."},
    {q:"What is the official version of the MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Command → Fight","Detect → Command → Recover"],correct:1,expl:"This is the official, definitive version for the whole S4 module."},
  ],
  es:[
    {q:"¿Qué significa 'Equipment Controls Fire. Leadership Controls the Outcome'?",opts:["El equipo por sí solo garantiza siempre el resultado","El equipo actúa sobre el fuego, pero el liderazgo determina el resultado global","El liderazgo no tiene influencia","Solo concierne a la electricidad"],correct:1,expl:"Una mala coordinación puede convertir un incidente controlado en una catástrofe."},
    {q:"¿Por qué la reserva debe estar lista antes del ataque?",opts:["No es necesario","Su presencia permite riesgos calculados, sabiendo que existe ayuda inmediata","Sustituye al apoyo","No tiene ninguna utilidad"],correct:1,expl:"Una reserva reunida después de un problema siempre llega demasiado tarde."},
    {q:"¿Qué arriesga un equipo tras un relevo mal hecho?",opts:["Nada","Reinicia desde cero, perdiendo la ventaja adquirida","Trabaja más rápido","No necesita nada"],correct:1,expl:"Un relevo mal hecho hace perder toda la ventaja adquirida."},
    {q:"En el caso del M.V. Zhonghuafuqiang, ¿qué causó la explosión?",opts:["Un sistema fijo defectuoso","El equipo terrestre abrió el compartimento sin conocer plenamente los riesgos","Una fuga de combustible","Un problema eléctrico"],correct:1,expl:"Abrir sin información completa provocó la explosión."},
    {q:"¿Cuál es la versión oficial del MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Command → Fight","Detect → Command → Recover"],correct:1,expl:"Esta es la versión oficial y definitiva para todo el módulo S4."},
  ],
  pt:[
    {q:"O que significa 'Equipment Controls Fire. Leadership Controls the Outcome'?",opts:["O equipamento por si só garante sempre o resultado","O equipamento atua sobre o fogo, mas a liderança determina o resultado global","A liderança não tem influência","Só diz respeito à eletricidade"],correct:1,expl:"Uma má coordenação pode transformar um incidente controlado numa catástrofe."},
    {q:"Por que a reserva deve estar pronta antes do ataque?",opts:["Não é necessário","A sua presença permite riscos calculados, sabendo que existe ajuda imediata","Substitui o apoio","Não tem qualquer utilidade"],correct:1,expl:"Uma reserva reunida depois de um problema chega sempre tarde demais."},
    {q:"O que arrisca uma equipa após uma rendição mal feita?",opts:["Nada","Recomeça do zero, perdendo a vantagem adquirida","Trabalha mais depressa","Não precisa de nada"],correct:1,expl:"Uma rendição mal feita faz perder toda a vantagem adquirida."},
    {q:"No caso do M.V. Zhonghuafuqiang, o que causou a explosão?",opts:["Um sistema fixo defeituoso","A equipa terrestre abriu o compartimento sem conhecer plenamente os riscos","Uma fuga de combustível","Um problema elétrico"],correct:1,expl:"Abrir sem informação completa provocou a explosão."},
    {q:"Qual é a versão oficial do MAP Fire Mindset?",opts:["Detect → Fight → Recover","Detect → Alarm → Contain → Fight → Protect → Command → Recover","Alarm → Command → Fight","Detect → Command → Recover"],correct:1,expl:"Esta é a versão oficial e definitiva para todo o módulo S4."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais transmettre le commandement d'une intervention a une autre equipe aujourd'hui, quelle information risquerais-tu d'oublier ?",
    en:"If you had to transfer command of an intervention to another team today, what information might you risk forgetting?",
    es:"Si tuvieras que transferir el mando de una intervencion a otro equipo hoy, ¿que informacion arriesgarias a olvidar?",
    pt:"Se tivesses de transferir o comando de uma intervencao a outra equipa hoje, que informacao arriscarias esquecer?",
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
      badge:"🔥 Safety · Firefighting · Leçon 7/7 · ⭐ Premium",
      title:"Fire Command, Teams & Damage Control",
      intro:"Cette dernière leçon ne revient pas sur les techniques déjà enseignées. L'urgence est déjà déclarée, les équipes déjà mobilisées : le sujet est désormais de transformer plusieurs intervenants en une seule équipe efficace.",
      p0:"EQUIPMENT CONTROLS FIRE. LEADERSHIP CONTROLS THE OUTCOME.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le matériel agit sur le feu. C'est le commandement qui détermine si l'issue globale est une réussite ou une catastrophe.\n\nCOMMENT LE RECONNAÎTRE ? Une situation impliquant plusieurs équipes, pas une seule intervention isolée.\nQUE FAIRE IMMÉDIATEMENT ? Établir clairement la chaîne de commandement, structurer les rapports entre équipes.\nQUELLE ERREUR L'AGGRAVE ? Une transmission de commandement ou une relève incomplète.\nQUAND DEMANDER DE L'AIDE ? Dès qu'une seule équipe ne peut plus couvrir la situation seule.",
      p1:"LA STRUCTURE DE COMMANDEMENT",s1t:"Comprendre la chaîne de décision",
      s1:"Commandant, chef d'intervention, équipes, communications : cette leçon commence quand l'urgence est déjà déclarée, sans revenir sur la découverte du feu ni le choix des EPI, qui seront couverts par le futur module S6.",
      p2:"COORDINATION DES ÉQUIPES",s2t:"Trois missions différentes, une seule réponse",
      s2:"Attaque, soutien, réserve : ces équipes ne travaillent jamais isolément. Chacune dépend des deux autres, et la réserve doit toujours être prête avant que l'attaque ne commence, jamais assemblée après un problème.",
      p3:"COMMUNICATION & RELÈVE",s3t:"Une relève mal faite repart de zéro",
      s3:"Rapports structurés, rotation planifiée, transmission complète de l'information : si un seul détail critique manque à la relève, la nouvelle équipe recommence l'évaluation depuis le début.",
      p4:"DAMAGE CONTROL & RECOVERY",s4t:"L'intervention n'est terminée que lorsque le navire est redevenu sûr",
      s4:"Inspection des compartiments, vérification de la stabilité, remise en service progressive, débriefing et amélioration continue : la fin des flammes n'est jamais la fin de l'intervention.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 7",
      sumP:["Equipment Controls Fire. Leadership Controls the Outcome : le commandement détermine l'issue, pas seulement le matériel","La réserve doit être prête avant l'attaque, jamais assemblée après un problème","Une relève ou un transfert de commandement incomplet fait repartir de zéro, ou pire","Damage Control : inspection, stabilité, remise en service progressive, débriefing","L'intervention n'est terminée que lorsque le navire est redevenu sûr"],
      learnedP:["La structure de commandement et la chaîne de décision","La coordination simultanée des équipes","La discipline de communication et de relève","Le Damage Control élargi jusqu'au retour à la sécurité complète","Le MAP Fire Mindset dans son intégralité"],
      transitionMsg:"Firefighting is not about extinguishing flames. It is about protecting lives, protecting the ship, and making the right decisions under pressure.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 7/7 · ⭐ Premium",
      title:"Fire Command, Teams & Damage Control",
      intro:"This final lesson does not revisit techniques already taught. The emergency is already declared, teams already mobilized: the subject is now transforming multiple responders into one effective team.",
      p0:"EQUIPMENT CONTROLS FIRE. LEADERSHIP CONTROLS THE OUTCOME.",s0t:"The principle that structures the whole lesson",
      s0:"Equipment acts on the fire. It is leadership that determines whether the overall outcome is a success or a disaster.\n\nHOW DO I RECOGNIZE IT? A situation involving multiple teams, not a single isolated intervention.\nWHAT DO I DO IMMEDIATELY? Clearly establish the command chain, structure reports between teams.\nWHAT MISTAKE MAKES IT WORSE? An incomplete command transfer or relief.\nWHEN MUST I ASK FOR HELP? As soon as a single team can no longer cover the situation alone.",
      p1:"FIRE COMMAND STRUCTURE",s1t:"Understanding the decision chain",
      s1:"Captain, incident commander, teams, communications: this lesson begins when the emergency is already declared, without revisiting the fire's discovery or PPE selection, which will be covered by the future S6 module.",
      p2:"TEAM COORDINATION",s2t:"Three different missions, one single response",
      s2:"Attack, support, reserve: these teams never work in isolation. Each depends on the other two, and the reserve must always be ready before the attack begins, never assembled after a problem occurs.",
      p3:"COMMUNICATION & RELIEF",s3t:"A poorly done relief starts from zero",
      s3:"Structured reports, planned rotation, complete information transfer: if a single critical detail is missing at relief, the new team restarts the assessment from the beginning.",
      p4:"DAMAGE CONTROL & RECOVERY",s4t:"The intervention is over only when the ship has become safe again",
      s4:"Compartment inspection, stability check, progressive return to service, debriefing and continuous improvement: the end of flames is never the end of the intervention.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 7",
      sumP:["Equipment Controls Fire. Leadership Controls the Outcome: leadership determines the outcome, not just equipment","The reserve must be ready before the attack, never assembled after a problem","An incomplete relief or command transfer forces a restart from zero, or worse","Damage Control: inspection, stability, progressive return to service, debriefing","The intervention is over only when the ship has become safe again"],
      learnedP:["Command structure and the decision chain","Simultaneous team coordination","Communication and relief discipline","Damage Control expanded to full return to safety","The MAP Fire Mindset in its entirety"],
      transitionMsg:"Firefighting is not about extinguishing flames. It is about protecting lives, protecting the ship, and making the right decisions under pressure.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 7/7 · ⭐ Premium",
      title:"Fire Command, Teams & Damage Control",
      intro:"Esta última lección no vuelve sobre técnicas ya enseñadas. La urgencia ya está declarada, los equipos ya movilizados: el tema ahora es transformar a varios intervinientes en un solo equipo eficaz.",
      p0:"EQUIPMENT CONTROLS FIRE. LEADERSHIP CONTROLS THE OUTCOME.",s0t:"El principio que estructura toda la lección",
      s0:"El equipo actúa sobre el fuego. Es el liderazgo el que determina si el resultado global es un éxito o una catástrofe.\n\n¿CÓMO RECONOCERLO? Una situación que implica a varios equipos, no una sola intervención aislada.\n¿QUÉ HACER DE INMEDIATO? Establecer claramente la cadena de mando, estructurar los informes entre equipos.\n¿QUÉ ERROR LO AGRAVA? Una transferencia de mando o un relevo incompletos.\n¿CUÁNDO PEDIR AYUDA? En cuanto un solo equipo ya no pueda cubrir la situación solo.",
      p1:"LA ESTRUCTURA DE MANDO",s1t:"Comprender la cadena de decisión",
      s1:"Capitán, jefe de intervención, equipos, comunicaciones: esta lección empieza cuando la urgencia ya está declarada, sin volver sobre el descubrimiento del fuego ni la elección del EPP, que se cubrirán en el futuro módulo S6.",
      p2:"COORDINACIÓN DE LOS EQUIPOS",s2t:"Tres misiones diferentes, una sola respuesta",
      s2:"Ataque, apoyo, reserva: estos equipos nunca trabajan de forma aislada. Cada uno depende de los otros dos, y la reserva siempre debe estar lista antes de que empiece el ataque, nunca reunida después de un problema.",
      p3:"COMUNICACIÓN Y RELEVO",s3t:"Un relevo mal hecho empieza de cero",
      s3:"Informes estructurados, rotación planificada, transmisión completa de la información: si falta un solo detalle crítico en el relevo, el nuevo equipo reinicia la evaluación desde el principio.",
      p4:"DAMAGE CONTROL & RECOVERY",s4t:"La intervención solo termina cuando el buque ha vuelto a ser seguro",
      s4:"Inspección de los compartimentos, verificación de la estabilidad, puesta en servicio progresiva, debriefing y mejora continua: el fin de las llamas nunca es el fin de la intervención.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 7",
      sumP:["Equipment Controls Fire. Leadership Controls the Outcome: el liderazgo determina el resultado, no solo el equipo","La reserva debe estar lista antes del ataque, nunca reunida después de un problema","Un relevo o una transferencia de mando incompletos obligan a reiniciar desde cero, o peor","Damage Control: inspección, estabilidad, puesta en servicio progresiva, debriefing","La intervención solo termina cuando el buque ha vuelto a ser seguro"],
      learnedP:["La estructura de mando y la cadena de decisión","La coordinación simultánea de los equipos","La disciplina de comunicación y relevo","El Damage Control ampliado hasta el retorno completo a la seguridad","El MAP Fire Mindset en su totalidad"],
      transitionMsg:"Firefighting is not about extinguishing flames. It is about protecting lives, protecting the ship, and making the right decisions under pressure.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 7/7 · ⭐ Premium",
      title:"Fire Command, Teams & Damage Control",
      intro:"Esta última lição não volta a técnicas já ensinadas. A urgência já está declarada, as equipas já mobilizadas: o tema agora é transformar vários intervenientes numa única equipa eficaz.",
      p0:"EQUIPMENT CONTROLS FIRE. LEADERSHIP CONTROLS THE OUTCOME.",s0t:"O princípio que estrutura toda a lição",
      s0:"O equipamento atua sobre o fogo. É a liderança que determina se o resultado global é um sucesso ou uma catástrofe.\n\nCOMO RECONHECER? Uma situação que envolve várias equipas, não uma única intervenção isolada.\nO QUE FAZER IMEDIATAMENTE? Estabelecer claramente a cadeia de comando, estruturar os relatórios entre equipas.\nQUE ERRO O AGRAVA? Uma transferência de comando ou uma rendição incompletas.\nQUANDO PEDIR AJUDA? Assim que uma única equipa já não conseguir cobrir a situação sozinha.",
      p1:"A ESTRUTURA DE COMANDO",s1t:"Compreender a cadeia de decisão",
      s1:"Comandante, chefe de intervenção, equipas, comunicações: esta lição começa quando a urgência já está declarada, sem voltar à descoberta do fogo nem à escolha do EPI, que serão cobertos pelo futuro módulo S6.",
      p2:"COORDENAÇÃO DAS EQUIPAS",s2t:"Três missões diferentes, uma única resposta",
      s2:"Ataque, apoio, reserva: estas equipas nunca trabalham isoladamente. Cada uma depende das outras duas, e a reserva deve estar sempre pronta antes de o ataque começar, nunca reunida depois de um problema.",
      p3:"COMUNICAÇÃO E RENDIÇÃO",s3t:"Uma rendição mal feita recomeça do zero",
      s3:"Relatórios estruturados, rotação planeada, transmissão completa da informação: se faltar um único detalhe crítico na rendição, a nova equipa recomeça a avaliação desde o início.",
      p4:"DAMAGE CONTROL & RECOVERY",s4t:"A intervenção só termina quando o navio voltou a ser seguro",
      s4:"Inspeção dos compartimentos, verificação da estabilidade, regresso progressivo ao serviço, debriefing e melhoria contínua: o fim das chamas nunca é o fim da intervenção.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 7",
      sumP:["Equipment Controls Fire. Leadership Controls the Outcome: a liderança determina o resultado, não apenas o equipamento","A reserva deve estar pronta antes do ataque, nunca reunida depois de um problema","Uma rendição ou uma transferência de comando incompletas obrigam a recomeçar do zero, ou pior","Damage Control: inspeção, estabilidade, regresso progressivo ao serviço, debriefing","A intervenção só termina quando o navio voltou a ser seguro"],
      learnedP:["A estrutura de comando e a cadeia de decisão","A coordenação simultânea das equipas","A disciplina de comunicação e rendição","O Damage Control alargado até ao regresso completo à segurança","O MAP Fire Mindset na sua totalidade"],
      transitionMsg:"Firefighting is not about extinguishing flames. It is about protecting lives, protecting the ship, and making the right decisions under pressure.",
    },
  };
  return d[lang]||d.fr;
};

const mindsetLabel = {
  fr:{title:"THE MAP FIRE MINDSET",sub:"Every fire emergency follows this same discipline.",steps:["Detect","Alarm","Contain","Fight","Protect","Command","Recover"]},
  en:{title:"THE MAP FIRE MINDSET",sub:"Every fire emergency follows this same discipline.",steps:["Detect","Alarm","Contain","Fight","Protect","Command","Recover"]},
  es:{title:"THE MAP FIRE MINDSET",sub:"Every fire emergency follows this same discipline.",steps:["Detect","Alarm","Contain","Fight","Protect","Command","Recover"]},
  pt:{title:"THE MAP FIRE MINDSET",sub:"Every fire emergency follows this same discipline.",steps:["Detect","Alarm","Contain","Fight","Protect","Command","Recover"]},
};

// MAIN
export default function LessonSafetyS4_L7({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 7/7":lang==="en"?"Lesson 7/7":lang==="es"?"Lección 7/7":"Lição 7/7"}</div>
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

            <SL icon="🎖️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="⚓" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚓</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚓ {lang==="fr"?"STRUCTURE DE COMMANDEMENT - INTERACTIF":lang==="en"?"COMMAND STRUCTURE - INTERACTIVE":lang==="es"?"ESTRUCTURA DE MANDO - INTERACTIVO":"ESTRUTURA DE COMANDO - INTERATIVO"}</div><CommandStructureSVG lang={lang}/></Card>

            <SL icon="👥" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👥</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>👥 {lang==="fr"?"COORDINATION DES ÉQUIPES - INTERACTIF":lang==="en"?"TEAM COORDINATION - INTERACTIVE":lang==="es"?"COORDINACIÓN DE EQUIPOS - INTERACTIVO":"COORDENAÇÃO DE EQUIPAS - INTERATIVO"}</div><TeamCoordinationSVG lang={lang}/></Card>

            <SL icon="📡" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📡 {lang==="fr"?"COMMUNICATION & RELÈVE - INTERACTIF":lang==="en"?"COMMUNICATION & RELIEF - INTERACTIVE":lang==="es"?"COMUNICACIÓN Y RELEVO - INTERACTIVO":"COMUNICAÇÃO E RENDIÇÃO - INTERATIVO"}</div><CommunicationReliefSVG lang={lang}/></Card>

            <SL icon="🛡️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}44`,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div><div style={{marginTop:12}}><DamageControlRecoverySVG lang={lang}/></div></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p8} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Commandement & Damage Control":lang==="en"?"Final Quiz - Command & Damage Control":lang==="es"?"Quiz Final - Mando y Damage Control":"Quiz Final - Comando e Damage Control"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 7/7":"questions · Lesson 7/7"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
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

            <Card style={{marginBottom:16,textAlign:"center",background:"linear-gradient(135deg,rgba(192,57,43,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.red}33`}}>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.transitionMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <Card style={{marginBottom:16,textAlign:"center",border:`2px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.2),rgba(13,31,60,0.95))"}}>
              <div style={{fontSize:36,marginBottom:8}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:C.gold2,letterSpacing:2,marginBottom:6}}>{lang==="fr"?"MODULE TERMINÉ":lang==="en"?"MODULE COMPLETED":lang==="es"?"MÓDULO COMPLETADO":"MÓDULO CONCLUÍDO"}</div>
              <div style={{fontSize:13,color:C.white,fontWeight:700,marginBottom:10}}>{lang==="fr"?"Firefighting":lang==="en"?"Firefighting":lang==="es"?"Firefighting":"Firefighting"}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{lang==="fr"?"350 XP gagnés · 7 leçons terminées":lang==="en"?"350 XP earned · 7 lessons completed":lang==="es"?"350 XP ganados · 7 lecciones completadas":"350 XP ganhos · 7 lições concluídas"}</div>
              <div style={{fontSize:11,color:C.gold2,fontStyle:"italic"}}>{lang==="fr"?"Fire Mindset débloqué":lang==="en"?"Fire Mindset Unlocked":lang==="es"?"Fire Mindset desbloqueado":"Fire Mindset desbloqueado"}</div>
            </Card>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {t.backDash}
            </button>
          </div>}

        </div>
      </div>
    </div>
  );
}
