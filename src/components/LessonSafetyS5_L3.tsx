import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - HRU (WHY IT EXISTS, THE LAST SAFETY NET)
function HRUSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"❓", label:{fr:"Pourquoi il existe",en:"Why it exists",es:"Por qué existe",pt:"Por que existe"}, desc:{fr:"Le HRU existe parce que les humains peuvent ne plus être capables d'agir : blessure, panique, disparition sous l'eau avant d'avoir pu larguer manuellement.",en:"The HRU exists because humans may no longer be able to act: injury, panic, disappearing underwater before manually releasing anything.",es:"El HRU existe porque los humanos pueden dejar de ser capaces de actuar: lesión, pánico, desaparición bajo el agua antes de poder largar manualmente.",pt:"O HRU existe porque os humanos podem deixar de conseguir agir: lesão, pânico, desaparecer debaixo de água antes de conseguirem largar manualmente."} },
    { id:2, icon:"💧", label:{fr:"Déclenchement par pression d'eau",en:"Triggered by water pressure",es:"Activación por presión del agua",pt:"Ativação por pressão da água"}, desc:{fr:"À une profondeur donnée, la pression de l'eau actionne le mécanisme automatiquement, sans intervention humaine nécessaire.",en:"At a given depth, water pressure actuates the mechanism automatically, with no human intervention needed.",es:"A una profundidad dada, la presión del agua acciona el mecanismo automáticamente, sin necesidad de intervención humana.",pt:"A uma dada profundidade, a pressão da água aciona o mecanismo automaticamente, sem necessidade de intervenção humana."} },
    { id:3, icon:"🔗", label:{fr:"Le maillon faible (weak link)",en:"The weak link",es:"El eslabón débil",pt:"O elo fraco"}, desc:{fr:"Un composant conçu pour rompre à une tension précise, libérant le radeau du navire qui coule sans le retenir sous l'eau.",en:"A component designed to break at a precise tension, freeing the raft from the sinking ship without holding it underwater.",es:"Un componente diseñado para romperse a una tensión precisa, liberando la balsa del buque que se hunde sin retenerla bajo el agua.",pt:"Um componente concebido para se romper a uma tensão precisa, libertando a jangada do navio que afunda sem a reter debaixo de água."} },
    { id:4, icon:"🥈", label:{fr:"Le dernier filet, pas le premier réflexe",en:"The last net, not the first reflex",es:"La última red, no el primer reflejo",pt:"A última rede, não o primeiro reflexo"}, desc:{fr:"Le HRU intervient uniquement quand personne n'a pu larguer le radeau manuellement. Il ne remplace jamais un largage volontaire et contrôlé, vu en Leçon 2.",en:"The HRU only intervenes when no one was able to release the raft manually. It never replaces a voluntary, controlled release, seen in Lesson 2.",es:"El HRU solo interviene cuando nadie ha podido largar la balsa manualmente. Nunca sustituye a una largada voluntaria y controlada, vista en la Lección 2.",pt:"O HRU só intervém quando ninguém conseguiu largar a jangada manualmente. Nunca substitui uma largada voluntária e controlada, vista na Lição 2."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Comprendre pourquoi il existe compte plus que mémoriser comment il fonctionne.":lang==="en"?"Understanding why it exists matters more than memorizing how it works.":lang==="es"?"Entender por qué existe importa más que memorizar cómo funciona.":"Compreender por que existe importa mais do que memorizar como funciona."}</div>
    </div>
  );
}

// SVG 2 - SURVIVAL EQUIPMENT BY FUNCTION
function SurvivalEquipmentSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💧", label:{fr:"Boire",en:"Drink",es:"Beber",pt:"Beber"}, desc:{fr:"Réserves d'eau et moyens de récupérer l'eau de pluie : la priorité absolue, jamais l'eau de mer.",en:"Water reserves and means of collecting rainwater: the absolute priority, never seawater.",es:"Reservas de agua y medios para recoger agua de lluvia: la prioridad absoluta, nunca agua de mar.",pt:"Reservas de água e meios para recolher água da chuva: a prioridade absoluta, nunca água do mar."} },
    { id:2, icon:"🍬", label:{fr:"Manger",en:"Eat",es:"Comer",pt:"Comer"}, desc:{fr:"Rations énergétiques conçues pour nourrir sans augmenter le besoin en eau, contrairement aux protéines et graisses.",en:"Energy rations designed to nourish without increasing water needs, unlike proteins and fats.",es:"Raciones energéticas diseñadas para nutrir sin aumentar la necesidad de agua, a diferencia de las proteínas y grasas.",pt:"Rações energéticas concebidas para alimentar sem aumentar a necessidade de água, ao contrário das proteínas e gorduras."} },
    { id:3, icon:"📡", label:{fr:"Signaler",en:"Signal",es:"Señalar",pt:"Sinalizar"}, desc:{fr:"Fusées, colorant marqueur, sifflet, lampe, miroir : chaque outil répond à une distance et un contexte différents.",en:"Flares, dye marker, whistle, lamp, mirror: each tool answers a different distance and context.",es:"Bengalas, colorante marcador, silbato, lámpara, espejo: cada herramienta responde a una distancia y un contexto diferentes.",pt:"Foguetes, corante marcador, apito, lanterna, espelho: cada ferramenta responde a uma distância e um contexto diferentes."} },
    { id:4, icon:"🔧", label:{fr:"Réparer",en:"Repair",es:"Reparar",pt:"Reparar"}, desc:{fr:"Kit de réparation pour une déchirure ou une fuite : le radeau reste un équipement fragile qui doit durer jusqu'au secours.",en:"Repair kit for a tear or leak: the raft remains fragile equipment that must last until rescue.",es:"Kit de reparación para un desgarro o una fuga: la balsa sigue siendo un equipo frágil que debe durar hasta el rescate.",pt:"Kit de reparação para um rasgão ou fuga: a jangada continua a ser um equipamento frágil que deve durar até ao socorro."} },
    { id:5, icon:"🧥", label:{fr:"Se protéger",en:"Protect oneself",es:"Protegerse",pt:"Proteger-se"}, desc:{fr:"Auvent, couvertures thermiques : contre le soleil, le froid et l'humidité, des menaces aussi réelles que la faim ou la soif.",en:"Canopy, thermal blankets: against sun, cold, and dampness, threats just as real as hunger or thirst.",es:"Toldo, mantas térmicas: contra el sol, el frío y la humedad, amenazas tan reales como el hambre o la sed.",pt:"Toldo, cobertores térmicos: contra o sol, o frio e a humidade, ameaças tão reais como a fome ou a sede."} },
    { id:6, icon:"🧭", label:{fr:"Naviguer si nécessaire",en:"Navigate if necessary",es:"Navegar si es necesario",pt:"Navegar se necessário"}, desc:{fr:"Ancre flottante, pagaies : rarement utilisées pour se déplacer loin, mais utiles pour stabiliser le radeau ou s'orienter.",en:"Sea anchor, paddles: rarely used to travel far, but useful for stabilizing the raft or getting oriented.",es:"Ancla flotante, remos: rara vez usados para desplazarse lejos, pero útiles para estabilizar la balsa u orientarse.",pt:"Âncora flutuante, remos: raramente usados para se deslocar longe, mas úteis para estabilizar a jangada ou se orientar."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Jamais un catalogue : chaque objet répond à une fonction de survie précise.":lang==="en"?"Never a catalog: each item answers a precise survival function.":lang==="es"?"Nunca un catálogo: cada objeto responde a una función de supervivencia precisa.":"Nunca um catálogo: cada objeto responde a uma função de sobrevivência precisa."}</div>
    </div>
  );
}

// SVG 3 - MANAGING SURVIVAL RESOURCES (BROADER THAN RATIONING)
function ManagingResourcesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💧", label:{fr:"Eau et nourriture",en:"Water and food",es:"Agua y comida",pt:"Água e comida"}, desc:{fr:"Rationner dès le premier jour, sans attendre d'avoir soif ou faim : la discipline précède le besoin, jamais l'inverse.",en:"Ration from day one, without waiting to feel thirsty or hungry: discipline precedes need, never the reverse.",es:"Racionar desde el primer día, sin esperar a tener sed o hambre: la disciplina precede a la necesidad, nunca al revés.",pt:"Racionar desde o primeiro dia, sem esperar sentir sede ou fome: a disciplina precede a necessidade, nunca o contrário."} },
    { id:2, icon:"🔋", label:{fr:"Énergie physique",en:"Physical energy",es:"Energía física",pt:"Energia física"}, desc:{fr:"Éviter tout effort inutile : chaque geste consomme une réserve qui ne se renouvelle pas facilement en mer.",en:"Avoiding unnecessary effort: every movement consumes a reserve that isn't easily renewed at sea.",es:"Evitar todo esfuerzo inútil: cada gesto consume una reserva que no se renueva fácilmente en el mar.",pt:"Evitar todo o esforço inútil: cada gesto consome uma reserva que não se renova facilmente no mar."} },
    { id:3, icon:"🌡️", label:{fr:"Chaleur corporelle",en:"Body heat",es:"Calor corporal",pt:"Calor corporal"}, desc:{fr:"Se protéger du froid et de l'humidité fait partie de la gestion des ressources, au même titre que l'eau ou la nourriture.",en:"Protecting against cold and dampness is part of resource management, just as much as water or food.",es:"Protegerse del frío y la humedad forma parte de la gestión de recursos, tanto como el agua o la comida.",pt:"Proteger-se do frio e da humidade faz parte da gestão de recursos, tanto quanto a água ou a comida."} },
    { id:4, icon:"🤝", label:{fr:"Moral de l'équipage",en:"Crew morale",es:"Moral de la tripulación",pt:"Moral da tripulação"}, desc:{fr:"Une ressource aussi réelle que l'eau ou la nourriture : le moral s'épuise et doit être géré, encouragé, entretenu activement.",en:"A resource just as real as water or food: morale runs out and must be actively managed, encouraged, and maintained.",es:"Un recurso tan real como el agua o la comida: la moral se agota y debe gestionarse, alentarse y mantenerse activamente.",pt:"Um recurso tão real como a água ou a comida: o moral esgota-se e deve ser gerido, encorajado e mantido ativamente."} },
    { id:5, icon:"🧰", label:{fr:"Utilisation du matériel",en:"Equipment use",es:"Uso del material",pt:"Uso do material"}, desc:{fr:"Chaque objet du radeau doit être utilisé avec discernement : rien ne peut être remplacé une fois épuisé ou perdu.",en:"Every item in the raft must be used with discernment: nothing can be replaced once used up or lost.",es:"Cada objeto de la balsa debe usarse con criterio: nada puede reemplazarse una vez agotado o perdido.",pt:"Cada objeto da jangada deve ser usado com discernimento: nada pode ser substituído uma vez esgotado ou perdido."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le rationnement fait partie d'une discipline globale, pas d'un simple calcul d'eau et de nourriture.":lang==="en"?"Rationing is part of a broader discipline, not just a calculation of water and food.":lang==="es"?"El racionamiento forma parte de una disciplina global, no de un simple cálculo de agua y comida.":"O racionamento faz parte de uma disciplina global, não de um simples cálculo de água e comida."}</div>
    </div>
  );
}

// SVG 4 - RESCUE SIGNALLING (A LIMITED RESOURCE)
function RescueSignallingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📻", label:{fr:"EPIRB et SART",en:"EPIRB and SART",es:"EPIRB y SART",pt:"EPIRB e SART"}, desc:{fr:"Déjà vus dans le module précédent : ils alertent et guident les secours en continu, sans consommer de ressource limitée à chaque usage.",en:"Already seen in the previous module: they continuously alert and guide rescuers, without consuming a limited resource with each use.",es:"Ya vistos en el módulo anterior: alertan y guían al rescate de forma continua, sin consumir un recurso limitado con cada uso.",pt:"Já vistos no módulo anterior: alertam e guiam o socorro continuamente, sem consumir um recurso limitado a cada uso."} },
    { id:2, icon:"🔥", label:{fr:"Fusées et feux à main",en:"Flares and hand-held lights",es:"Bengalas y luces de mano",pt:"Foguetes e luzes de mão"}, desc:{fr:"Une ressource limitée et non renouvelable : une fusée utilisée au mauvais moment ne reviendra jamais. Le bon moment, c'est quand un moyen de secours est réellement visible, jamais au hasard.",en:"A limited, non-renewable resource: a flare used at the wrong moment will never come back. The right moment is when a rescue means is actually visible, never at random.",es:"Un recurso limitado y no renovable: una bengala usada en el mal momento nunca volverá. El buen momento es cuando un medio de rescate es realmente visible, nunca al azar.",pt:"Um recurso limitado e não renovável: um foguete usado no momento errado nunca mais voltará. O bom momento é quando um meio de socorro é realmente visível, nunca ao acaso."} },
    { id:3, icon:"🎨", label:{fr:"Colorant marqueur",en:"Dye marker",es:"Colorante marcador",pt:"Corante marcador"}, desc:{fr:"Utile depuis les airs, il colore l'eau autour du radeau pour faciliter le repérage aérien, mais reste inutile de nuit.",en:"Useful from the air, it colors the water around the raft to ease aerial spotting, but remains useless at night.",es:"Útil desde el aire, colorea el agua alrededor de la balsa para facilitar la localización aérea, pero sigue siendo inútil de noche.",pt:"Útil a partir do ar, colore a água à volta da jangada para facilitar a deteção aérea, mas continua inútil à noite."} },
    { id:4, icon:"🔊", label:{fr:"Sifflet et lampe",en:"Whistle and lamp",es:"Silbato y lámpara",pt:"Apito e lanterna"}, desc:{fr:"Utiles à courte distance ou quand un navire ou une embarcation approche déjà, jamais destinés à attirer l'attention de loin.",en:"Useful at short range or when a ship or boat is already approaching, never meant to attract attention from far away.",es:"Útiles a corta distancia o cuando un buque o embarcación ya se acerca, nunca destinados a llamar la atención desde lejos.",pt:"Úteis a curta distância ou quando um navio ou embarcação já se aproxima, nunca destinados a chamar a atenção à distância."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Choisir le bon moment compte autant que posséder le bon équipement.":lang==="en"?"Choosing the right moment matters as much as owning the right equipment.":lang==="es"?"Elegir el momento adecuado importa tanto como tener el equipo adecuado.":"Escolher o momento certo importa tanto quanto ter o equipamento certo."}</div>
    </div>
  );
}

// EXERCISE - SURVIVAL MANAGEMENT DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous venez de monter à bord du radeau, personne n'a soif pour l'instant. Que faites-vous concernant l'eau ?\na) Attendre que quelqu'un ait soif avant de rationner\nb) Commencer le rationnement dès le premier jour, sans attendre le besoin\nc) Distribuer toute l'eau immédiatement pour ne plus y penser"},
      {id:"q2",q:"Vous apercevez un avion très loin à l'horizon, sans certitude qu'il vous voie. Que faites-vous ?\na) Ne pas utiliser de fusée, la distance et l'incertitude ne justifient pas de consommer cette ressource limitée\nb) Utiliser immédiatement toutes les fusées disponibles\nc) Attendre que l'avion ait disparu avant de réagir"},
      {id:"q3",q:"Le HRU s'est déclenché automatiquement pour libérer le radeau. Que cela signifie-t-il ?\na) Le largage manuel a été un échec technique\nb) C'est la méthode normale de largage dans tous les cas\nc) Personne n'a pu larguer manuellement, le HRU a agi comme dernier filet de sécurité"},
      {id:"q4",q:"Quel est le véritable sujet de cette leçon selon le principe central ?\na) La présentation technique du HRU et de l'inventaire SOLAS\nb) La gestion de la survie : l'équipement donne une chance, les décisions gardent en vie\nc) L'histoire des radeaux de sauvetage"},
    ],
    en:[
      {id:"q1",q:"You have just boarded the raft, no one is thirsty yet. What do you do about water?\na) Wait until someone is thirsty before rationing\nb) Start rationing from day one, without waiting for the need\nc) Distribute all the water immediately to stop thinking about it"},
      {id:"q2",q:"You spot a plane very far on the horizon, with no certainty it sees you. What do you do?\na) Don't use a flare, the distance and uncertainty don't justify consuming this limited resource\nb) Immediately use all available flares\nc) Wait until the plane has disappeared before reacting"},
      {id:"q3",q:"The HRU activated automatically to release the raft. What does this mean?\na) The manual release was a technical failure\nb) It's the normal release method in all cases\nc) No one was able to release it manually, the HRU acted as the last safety net"},
      {id:"q4",q:"What is the real subject of this lesson according to the central principle?\na) A technical presentation of the HRU and the SOLAS inventory\nb) Survival management: equipment gives you a chance, decisions keep you alive\nc) The history of liferafts"},
    ],
    es:[
      {id:"q1",q:"Acabas de subir a la balsa, nadie tiene sed todavía. ¿Qué haces respecto al agua?\na) Esperar a que alguien tenga sed antes de racionar\nb) Empezar a racionar desde el primer día, sin esperar la necesidad\nc) Repartir toda el agua de inmediato para no pensar más en ello"},
      {id:"q2",q:"Ves un avión muy lejos en el horizonte, sin certeza de que te vea. ¿Qué haces?\na) No usar una bengala, la distancia y la incertidumbre no justifican consumir este recurso limitado\nb) Usar de inmediato todas las bengalas disponibles\nc) Esperar a que el avión haya desaparecido antes de reaccionar"},
      {id:"q3",q:"El HRU se activó automáticamente para liberar la balsa. ¿Qué significa esto?\na) La largada manual fue un fallo técnico\nb) Es el método normal de largada en todos los casos\nc) Nadie pudo largarla manualmente, el HRU actuó como última red de seguridad"},
      {id:"q4",q:"¿Cuál es el verdadero tema de esta lección según el principio central?\na) Una presentación técnica del HRU y del inventario SOLAS\nb) La gestión de la supervivencia: el equipo da una oportunidad, las decisiones mantienen con vida\nc) La historia de las balsas salvavidas"},
    ],
    pt:[
      {id:"q1",q:"Acabaste de embarcar na jangada, ninguém tem sede por enquanto. O que fazes quanto à água?\na) Esperar que alguém tenha sede antes de racionar\nb) Começar a racionar desde o primeiro dia, sem esperar pela necessidade\nc) Distribuir toda a água de imediato para não pensar mais nisso"},
      {id:"q2",q:"Avistas um avião muito longe no horizonte, sem certeza de que te vê. O que fazes?\na) Não usar um foguete, a distância e a incerteza não justificam consumir este recurso limitado\nb) Usar de imediato todos os foguetes disponíveis\nc) Esperar que o avião tenha desaparecido antes de reagir"},
      {id:"q3",q:"O HRU ativou-se automaticamente para largar a jangada. O que significa isto?\na) A largada manual foi uma falha técnica\nb) É o método normal de largada em todos os casos\nc) Ninguém conseguiu largá-la manualmente, o HRU agiu como última rede de segurança"},
      {id:"q4",q:"Qual é o verdadeiro tema desta lição segundo o princípio central?\na) Uma apresentação técnica do HRU e do inventário SOLAS\nb) A gestão da sobrevivência: o equipamento dá uma oportunidade, as decisões mantêm vivo\nc) A história das jangadas salva-vidas"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (POON LIM, 1942-1943, WORLD RECORD)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Poon Lim",teaser:"Cas réel documenté - 133 jours de survie, record du monde encore inégalé",
      what:"En novembre 1942, le cargo britannique SS Benlomond est torpillé par un sous-marin allemand dans l'Atlantique, à environ 750 miles des terres. Poon Lim, steward du navire, saute à l'eau juste avant que le navire ne disparaisse et trouve un radeau en bois encore à flot, équipé de réserves modestes : quelques biscuits, un peu d'eau, des fusées, une lampe électrique. Il rationne immédiatement sa nourriture et son eau, calculant une autonomie d'environ un mois. Une fois les réserves épuisées, il pêche à l'aide d'un hameçon improvisé à partir du fil de sa lampe, capture des oiseaux et des requins, et boit leur sang pour compléter son hydratation. Il fait des entailles dans le bois du radeau pour compter les jours et nage deux fois par jour pour éviter l'atrophie musculaire. Après 133 jours, il est recueilli par des pêcheurs brésiliens, établissant un record de survie en radeau qui reste inégalé à ce jour.",
      cause:"• Naufrage soudain après torpillage, aucune préparation possible à l'avance\n• Équipement de survie minimal, sans provisions abondantes\n• Rationnement immédiat et discipliné dès le premier jour, sans attendre la faim ou la soif\n• Gestion active de l'énergie physique (exercice quotidien) et des ressources alimentaires (pêche, capture d'oiseaux)",
      lessons:"✓ The Equipment Gives You a Chance. Your Decisions Keep You Alive : l'équipement était minimal, la discipline a fait toute la différence\n✓ Un rationnement débuté dès le premier jour a permis de tenir plus de quatre mois, bien au-delà de toute estimation initiale\n✓ La gestion des ressources ne se limite jamais à l'eau et à la nourriture : l'énergie physique et le moral ont été activement préservés\n✓ Ce record, établi avec un équipement rudimentaire, illustre que la survie dépend davantage des décisions prises que de la quantité de matériel disponible",
      link:"🔗 Ce cas montre directement pourquoi l'équipement donne seulement une chance, tandis que ce sont les décisions de gestion qui déterminent réellement la survie."},
    en:{title:"Case Study - Poon Lim",teaser:"Real documented case - 133 days of survival, a world record still unmatched",
      what:"In November 1942, the British cargo ship SS Benlomond was torpedoed by a German submarine in the Atlantic, about 750 miles from land. Poon Lim, the ship's steward, jumped into the water just before the ship disappeared and found a wooden raft still afloat, equipped with modest supplies: a few biscuits, some water, flares, an electric torch. He immediately rationed his food and water, calculating about a month's worth of supplies. Once these ran out, he fished using a hook improvised from his torch's wire, caught birds and sharks, and drank their blood to supplement his hydration. He notched the raft's wood to track the days and swam twice a day to prevent muscle atrophy. After 133 days, he was picked up by Brazilian fishermen, setting a survival-at-sea record that remains unmatched to this day.",
      cause:"• Sudden sinking after torpedoing, no prior preparation possible\n• Minimal survival equipment, with no abundant provisions\n• Immediate, disciplined rationing from day one, without waiting for hunger or thirst\n• Active management of physical energy (daily exercise) and food resources (fishing, catching birds)",
      lessons:"✓ The Equipment Gives You a Chance. Your Decisions Keep You Alive: the equipment was minimal, discipline made all the difference\n✓ Rationing started from day one allowed him to hold out for over four months, far beyond any initial estimate\n✓ Resource management is never limited to water and food: physical energy and morale were actively preserved\n✓ This record, set with rudimentary equipment, illustrates that survival depends more on the decisions made than on the amount of gear available",
      link:"🔗 This case directly shows why equipment only gives you a chance, while it's the management decisions that truly determine survival."},
    es:{title:"Caso de estudio - Poon Lim",teaser:"Caso real documentado - 133 días de supervivencia, un récord mundial aún imbatido",
      what:"En noviembre de 1942, el carguero británico SS Benlomond fue torpedeado por un submarino alemán en el Atlántico, a unas 750 millas de tierra. Poon Lim, camarero del buque, saltó al agua justo antes de que el barco desapareciera y encontró una balsa de madera todavía a flote, equipada con reservas modestas: unas galletas, algo de agua, bengalas, una linterna. Racionó de inmediato su comida y su agua, calculando una autonomía de aproximadamente un mes. Una vez agotadas las reservas, pescó usando un anzuelo improvisado con el cable de su linterna, capturó aves y tiburones, y bebió su sangre para complementar su hidratación. Hizo muescas en la madera de la balsa para contar los días y nadó dos veces al día para evitar la atrofia muscular. Tras 133 días, fue recogido por pescadores brasileños, estableciendo un récord de supervivencia en el mar que sigue imbatido hasta hoy.",
      cause:"• Hundimiento repentino tras el torpedeo, sin ninguna preparación previa posible\n• Equipo de supervivencia mínimo, sin provisiones abundantes\n• Racionamiento inmediato y disciplinado desde el primer día, sin esperar el hambre o la sed\n• Gestión activa de la energía física (ejercicio diario) y de los recursos alimentarios (pesca, captura de aves)",
      lessons:"✓ The Equipment Gives You a Chance. Your Decisions Keep You Alive: el equipo era mínimo, la disciplina marcó toda la diferencia\n✓ Un racionamiento iniciado desde el primer día permitió resistir más de cuatro meses, mucho más allá de cualquier estimación inicial\n✓ La gestión de recursos nunca se limita al agua y la comida: la energía física y la moral se preservaron activamente\n✓ Este récord, logrado con equipo rudimentario, ilustra que la supervivencia depende más de las decisiones tomadas que de la cantidad de material disponible",
      link:"🔗 Este caso muestra directamente por qué el equipo solo da una oportunidad, mientras que son las decisiones de gestión las que realmente determinan la supervivencia."},
    pt:{title:"Caso de estudo - Poon Lim",teaser:"Caso real documentado - 133 dias de sobrevivência, um recorde mundial ainda por bater",
      what:"Em novembro de 1942, o cargueiro britânico SS Benlomond foi torpedeado por um submarino alemão no Atlântico, a cerca de 750 milhas da terra. Poon Lim, empregado de bordo do navio, saltou para a água mesmo antes de o navio desaparecer e encontrou uma jangada de madeira ainda a flutuar, equipada com reservas modestas: umas bolachas, um pouco de água, foguetes, uma lanterna elétrica. Racionou de imediato a sua comida e água, calculando uma autonomia de cerca de um mês. Depois de as reservas se esgotarem, pescou usando um anzol improvisado a partir do fio da lanterna, capturou aves e tubarões, e bebeu o seu sangue para complementar a sua hidratação. Fez entalhes na madeira da jangada para contar os dias e nadou duas vezes por dia para evitar a atrofia muscular. Após 133 dias, foi recolhido por pescadores brasileiros, estabelecendo um recorde de sobrevivência no mar que continua por bater até hoje.",
      cause:"• Naufrágio súbito após o torpedeamento, sem qualquer preparação prévia possível\n• Equipamento de sobrevivência mínimo, sem provisões abundantes\n• Racionamento imediato e disciplinado desde o primeiro dia, sem esperar pela fome ou pela sede\n• Gestão ativa da energia física (exercício diário) e dos recursos alimentares (pesca, captura de aves)",
      lessons:"✓ The Equipment Gives You a Chance. Your Decisions Keep You Alive: o equipamento era mínimo, a disciplina fez toda a diferença\n✓ Um racionamento iniciado desde o primeiro dia permitiu aguentar mais de quatro meses, muito além de qualquer estimativa inicial\n✓ A gestão de recursos nunca se limita à água e à comida: a energia física e o moral foram ativamente preservados\n✓ Este recorde, alcançado com equipamento rudimentar, ilustra que a sobrevivência depende mais das decisões tomadas do que da quantidade de material disponível",
      link:"🔗 Este caso mostra diretamente por que o equipamento apenas dá uma oportunidade, enquanto são as decisões de gestão que realmente determinam a sobrevivência."},
  };
  const c = d[lang]||d.fr;
  return (
    <div style={{background:"rgba(30,138,74,0.08)",border:`1.5px solid ${C.green}44`,borderRadius:18,overflow:"hidden"}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setExp(v=>!v)}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:22}}>🏆</span>
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
    {q:"Que signifie le principe 'The Equipment Gives You a Chance. Your Decisions Keep You Alive' ?",opts:["L'équipement suffit toujours à sauver des vies","L'équipement donne une opportunité, mais ce sont les décisions de gestion qui déterminent réellement la survie","Ce principe ne concerne que le HRU","Il ne faut jamais utiliser l'équipement de survie"],correct:1,expl:"Le matériel offre une chance ; c'est la discipline et les décisions qui font la différence."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Présenter le HRU et l'inventaire SOLAS en détail","Répondre à la question : comment augmenter ses chances de rester vivant jusqu'à l'arrivée des secours","Enseigner le signal d'abandon du navire","Présenter l'historique des radeaux de sauvetage"],correct:1,expl:"Le HRU et l'inventaire ne sont que des moyens ; le vrai sujet est la gestion de la survie."},
    {q:"Pourquoi le HRU existe-t-il ?",opts:["Pour remplacer systématiquement le largage manuel","Parce que les humains peuvent ne plus être capables d'agir : blessure, panique, disparition sous l'eau","Uniquement pour des raisons réglementaires sans utilité réelle","Pour accélérer le largage même quand tout va bien"],correct:1,expl:"Le HRU est un dernier filet de sécurité, pas le premier réflexe."},
    {q:"Le HRU remplace-t-il un largage manuel volontaire et contrôlé ?",opts:["Oui, toujours, dès qu'il est disponible","Non, il n'intervient que lorsque personne n'a pu larguer manuellement","Oui, mais uniquement en cas de mauvais temps","Non, il ne fonctionne jamais réellement"],correct:1,expl:"Le HRU est le dernier filet, pas une alternative au largage manuel vu en Leçon 2."},
    {q:"Comment l'inventaire de survie doit-il être présenté selon cette leçon ?",opts:["Comme une simple liste d'équipements à mémoriser","Par fonction : boire, manger, signaler, réparer, se protéger, naviguer si nécessaire","Comme un catalogue commercial","Il n'existe pas d'inventaire standardisé"],correct:1,expl:"Chaque objet répond à une fonction de survie précise, jamais une liste arbitraire."},
    {q:"Pourquoi les rations de survie privilégient-elles les glucides plutôt que les protéines ?",opts:["Les protéines n'ont aucun intérêt nutritif","Les protéines et graisses demandent davantage d'eau pour être digérées, augmentant la soif","Les glucides ont meilleur goût","Il n'y a aucune raison particulière"],correct:1,expl:"Les glucides fournissent de l'énergie sans augmenter significativement le besoin en eau."},
    {q:"Que couvre la gestion des ressources de survie, au-delà de l'eau et de la nourriture ?",opts:["Rien d'autre n'est concerné","L'énergie physique, la chaleur corporelle, le moral de l'équipage, et l'utilisation du matériel","Uniquement la météo","Uniquement la navigation"],correct:1,expl:"Le rationnement fait partie d'une discipline globale de gestion, pas uniquement un calcul d'eau et de nourriture."},
    {q:"Pourquoi le moral de l'équipage est-il considéré comme une ressource ?",opts:["Ce n'est pas une ressource réelle","Il s'épuise comme l'eau ou la nourriture et doit être activement géré et entretenu","Il n'a aucun impact sur la survie","Il se régénère automatiquement sans effort"],correct:1,expl:"Le moral doit être géré activement, au même titre que les ressources matérielles."},
    {q:"Quand faut-il rationner l'eau et la nourriture ?",opts:["Seulement quand la soif ou la faim se fait sentir","Dès le premier jour, sans attendre le besoin","Uniquement après plusieurs jours en mer","Jamais, il faut consommer normalement"],correct:1,expl:"La discipline précède le besoin, jamais l'inverse."},
    {q:"Pourquoi une fusée de détresse est-elle considérée comme une ressource limitée ?",opts:["Elle peut être rechargée facilement","Une fois utilisée, elle ne revient jamais ; un mauvais choix de moment la gaspille définitivement","Elle n'a aucune limite d'utilisation","Elle peut être utilisée indéfiniment"],correct:1,expl:"Chaque fusée utilisée au mauvais moment représente une perte définitive et irremplaçable."},
    {q:"Quand faut-il utiliser une fusée de détresse ?",opts:["Dès qu'on se sent découragé","Uniquement quand un moyen de secours est réellement visible, jamais au hasard","Toutes les heures pour maximiser les chances","Uniquement la nuit"],correct:1,expl:"Le bon moment est celui où un moyen de secours est effectivement visible."},
    {q:"L'EPIRB et le SART consomment-ils une ressource limitée à chaque usage, comme les fusées ?",opts:["Oui, exactement de la même manière","Non, ils alertent et guident les secours en continu sans consommer de ressource limitée à chaque usage","Oui, mais uniquement de nuit","Non, ils ne fonctionnent qu'une seule fois"],correct:1,expl:"Contrairement aux fusées, l'EPIRB et le SART fonctionnent en continu sans ce type de limitation."},
    {q:"Dans le cas de Poon Lim, combien de temps a-t-il survécu en mer ?",opts:["Environ 30 jours","133 jours, un record de survie en radeau encore inégalé","Une semaine seulement","Plus d'un an"],correct:1,expl:"133 jours de survie, un record mondial qui reste inégalé à ce jour."},
    {q:"Que démontre principalement le cas de Poon Lim ?",opts:["Qu'un équipement abondant est indispensable à la survie","Que la discipline et la gestion des ressources comptent davantage que la quantité de matériel disponible","Que la survie en mer dépend uniquement de la chance","Que le rationnement est inutile si les réserves sont limitées"],correct:1,expl:"Avec un équipement minimal, la discipline de gestion a permis un record de survie exceptionnel."},
    {q:"Cette leçon traite-t-elle du signal d'abandon du navire ou du rassemblement de l'équipage ?",opts:["Oui, en détail","Non, ces éléments restent exclusivement réservés à la dernière leçon du module, consacrée au scénario complet d'abandon","Oui, mais uniquement pour les officiers","Non, ces sujets ne sont jamais traités dans ce module"],correct:1,expl:"Cette leçon reste centrée sur la survie une fois le moyen de sauvetage disponible, pas le scénario complet d'abandon."},
  ],
  en:[
    {q:"What does the principle 'The Equipment Gives You a Chance. Your Decisions Keep You Alive' mean?",opts:["Equipment always suffices to save lives","Equipment provides an opportunity, but management decisions truly determine survival","This principle only concerns the HRU","Survival equipment should never be used"],correct:1,expl:"Equipment offers a chance; discipline and decisions make the difference."},
    {q:"What is the exact mission of this lesson?",opts:["Present the HRU and SOLAS inventory in detail","Answer the question: how to increase your chances of staying alive until rescue arrives","Teach the abandon ship signal","Present the history of liferafts"],correct:1,expl:"The HRU and inventory are only means; the real subject is survival management."},
    {q:"Why does the HRU exist?",opts:["To systematically replace manual release","Because humans may no longer be able to act: injury, panic, disappearing underwater","Only for regulatory reasons with no real use","To speed up release even when everything is fine"],correct:1,expl:"The HRU is a last safety net, not the first reflex."},
    {q:"Does the HRU replace a voluntary, controlled manual release?",opts:["Yes, always, as soon as it's available","No, it only intervenes when no one was able to release it manually","Yes, but only in bad weather","No, it never actually works"],correct:1,expl:"The HRU is the last net, not an alternative to the manual release seen in Lesson 2."},
    {q:"How should the survival inventory be presented according to this lesson?",opts:["As a simple list of equipment to memorize","By function: drink, eat, signal, repair, protect oneself, navigate if necessary","As a commercial catalog","There is no standardized inventory"],correct:1,expl:"Each item answers a precise survival function, never an arbitrary list."},
    {q:"Why do survival rations favor carbohydrates over proteins?",opts:["Proteins have no nutritional value","Proteins and fats require more water to digest, increasing thirst","Carbohydrates taste better","There is no particular reason"],correct:1,expl:"Carbohydrates provide energy without significantly increasing water needs."},
    {q:"What does survival resource management cover, beyond water and food?",opts:["Nothing else is concerned","Physical energy, body heat, crew morale, and equipment use","Only the weather","Only navigation"],correct:1,expl:"Rationing is part of a broader management discipline, not just a water and food calculation."},
    {q:"Why is crew morale considered a resource?",opts:["It isn't a real resource","It runs out like water or food and must be actively managed and maintained","It has no impact on survival","It regenerates automatically without effort"],correct:1,expl:"Morale must be actively managed, just like material resources."},
    {q:"When should water and food be rationed?",opts:["Only when thirst or hunger sets in","From day one, without waiting for the need","Only after several days at sea","Never, consume normally"],correct:1,expl:"Discipline precedes need, never the reverse."},
    {q:"Why is a distress flare considered a limited resource?",opts:["It can be easily recharged","Once used, it never comes back; a wrong choice of timing wastes it permanently","It has no limit on use","It can be used indefinitely"],correct:1,expl:"Each flare used at the wrong moment represents a permanent, irreplaceable loss."},
    {q:"When should a distress flare be used?",opts:["As soon as you feel discouraged","Only when a rescue means is actually visible, never at random","Every hour to maximize chances","Only at night"],correct:1,expl:"The right moment is when a rescue means is actually visible."},
    {q:"Do the EPIRB and SART consume a limited resource with each use, like flares?",opts:["Yes, exactly the same way","No, they continuously alert and guide rescuers without consuming a limited resource each use","Yes, but only at night","No, they only work once"],correct:1,expl:"Unlike flares, the EPIRB and SART work continuously without this type of limitation."},
    {q:"In the Poon Lim case, how long did he survive at sea?",opts:["About 30 days","133 days, a raft survival record still unmatched","Just a week","More than a year"],correct:1,expl:"133 days of survival, a world record that remains unmatched to this day."},
    {q:"What does the Poon Lim case mainly demonstrate?",opts:["That abundant equipment is essential for survival","That discipline and resource management matter more than the amount of gear available","That survival at sea depends only on luck","That rationing is useless if supplies are limited"],correct:1,expl:"With minimal equipment, management discipline enabled an exceptional survival record."},
    {q:"Does this lesson cover the abandon ship signal or crew muster?",opts:["Yes, in detail","No, these elements remain exclusively reserved for the module's last lesson, dedicated to the full abandonment scenario","Yes, but only for officers","No, these topics are never covered in this module"],correct:1,expl:"This lesson stays focused on survival once rescue means are available, not the full abandonment scenario."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The Equipment Gives You a Chance. Your Decisions Keep You Alive'?",opts:["El equipo siempre basta para salvar vidas","El equipo da una oportunidad, pero son las decisiones de gestión las que realmente determinan la supervivencia","Este principio solo concierne al HRU","Nunca hay que usar el equipo de supervivencia"],correct:1,expl:"El equipo ofrece una oportunidad; la disciplina y las decisiones marcan la diferencia."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Presentar el HRU y el inventario SOLAS en detalle","Responder a la pregunta: cómo aumentar tus posibilidades de seguir vivo hasta que llegue el rescate","Enseñar la señal de abandono del buque","Presentar la historia de las balsas salvavidas"],correct:1,expl:"El HRU y el inventario son solo medios; el verdadero tema es la gestión de la supervivencia."},
    {q:"¿Por qué existe el HRU?",opts:["Para sustituir sistemáticamente la largada manual","Porque los humanos pueden dejar de ser capaces de actuar: lesión, pánico, desaparición bajo el agua","Solo por razones reglamentarias sin utilidad real","Para acelerar la largada incluso cuando todo va bien"],correct:1,expl:"El HRU es una última red de seguridad, no el primer reflejo."},
    {q:"¿El HRU sustituye a una largada manual voluntaria y controlada?",opts:["Sí, siempre, en cuanto está disponible","No, solo interviene cuando nadie pudo largarla manualmente","Sí, pero solo con mal tiempo","No, nunca funciona realmente"],correct:1,expl:"El HRU es la última red, no una alternativa a la largada manual vista en la Lección 2."},
    {q:"¿Cómo debe presentarse el inventario de supervivencia según esta lección?",opts:["Como una simple lista de equipos para memorizar","Por función: beber, comer, señalar, reparar, protegerse, navegar si es necesario","Como un catálogo comercial","No existe un inventario estandarizado"],correct:1,expl:"Cada objeto responde a una función de supervivencia precisa, nunca una lista arbitraria."},
    {q:"¿Por qué las raciones de supervivencia priorizan los carbohidratos frente a las proteínas?",opts:["Las proteínas no tienen ningún valor nutritivo","Las proteínas y grasas requieren más agua para digerirse, aumentando la sed","Los carbohidratos saben mejor","No hay ninguna razón particular"],correct:1,expl:"Los carbohidratos proporcionan energía sin aumentar significativamente la necesidad de agua."},
    {q:"¿Qué cubre la gestión de recursos de supervivencia, más allá del agua y la comida?",opts:["Nada más está implicado","La energía física, el calor corporal, la moral de la tripulación, y el uso del material","Solo el tiempo meteorológico","Solo la navegación"],correct:1,expl:"El racionamiento forma parte de una disciplina de gestión más amplia, no solo un cálculo de agua y comida."},
    {q:"¿Por qué se considera la moral de la tripulación un recurso?",opts:["No es un recurso real","Se agota como el agua o la comida y debe gestionarse y mantenerse activamente","No tiene ningún impacto en la supervivencia","Se regenera automáticamente sin esfuerzo"],correct:1,expl:"La moral debe gestionarse activamente, igual que los recursos materiales."},
    {q:"¿Cuándo hay que racionar el agua y la comida?",opts:["Solo cuando aparece la sed o el hambre","Desde el primer día, sin esperar la necesidad","Solo después de varios días en el mar","Nunca, hay que consumir con normalidad"],correct:1,expl:"La disciplina precede a la necesidad, nunca al revés."},
    {q:"¿Por qué se considera una bengala de socorro un recurso limitado?",opts:["Puede recargarse fácilmente","Una vez usada, nunca vuelve; una mala elección del momento la desperdicia definitivamente","No tiene ningún límite de uso","Puede usarse indefinidamente"],correct:1,expl:"Cada bengala usada en el mal momento representa una pérdida definitiva e irremplazable."},
    {q:"¿Cuándo hay que usar una bengala de socorro?",opts:["En cuanto uno se sienta desanimado","Solo cuando un medio de rescate es realmente visible, nunca al azar","Cada hora para maximizar las posibilidades","Solo de noche"],correct:1,expl:"El buen momento es cuando un medio de rescate es efectivamente visible."},
    {q:"¿El EPIRB y el SART consumen un recurso limitado con cada uso, como las bengalas?",opts:["Sí, exactamente igual","No, alertan y guían el rescate de forma continua sin consumir un recurso limitado con cada uso","Sí, pero solo de noche","No, solo funcionan una vez"],correct:1,expl:"A diferencia de las bengalas, el EPIRB y el SART funcionan de forma continua sin ese tipo de limitación."},
    {q:"En el caso de Poon Lim, ¿cuánto tiempo sobrevivió en el mar?",opts:["Unos 30 días","133 días, un récord de supervivencia en balsa aún imbatido","Solo una semana","Más de un año"],correct:1,expl:"133 días de supervivencia, un récord mundial que sigue imbatido hasta hoy."},
    {q:"¿Qué demuestra principalmente el caso de Poon Lim?",opts:["Que un equipo abundante es indispensable para la supervivencia","Que la disciplina y la gestión de recursos importan más que la cantidad de material disponible","Que la supervivencia en el mar depende solo de la suerte","Que el racionamiento es inútil si las reservas son limitadas"],correct:1,expl:"Con un equipo mínimo, la disciplina de gestión permitió un récord de supervivencia excepcional."},
  ],
  pt:[
    {q:"O que significa o princípio 'The Equipment Gives You a Chance. Your Decisions Keep You Alive'?",opts:["O equipamento sempre basta para salvar vidas","O equipamento dá uma oportunidade, mas são as decisões de gestão que realmente determinam a sobrevivência","Este princípio só diz respeito ao HRU","Nunca se deve usar o equipamento de sobrevivência"],correct:1,expl:"O equipamento oferece uma oportunidade; a disciplina e as decisões fazem a diferença."},
    {q:"Qual é a missão exata desta lição?",opts:["Apresentar o HRU e o inventário SOLAS em detalhe","Responder à pergunta: como aumentar as hipóteses de permanecer vivo até o socorro chegar","Ensinar o sinal de abandono do navio","Apresentar a história das jangadas salva-vidas"],correct:1,expl:"O HRU e o inventário são apenas meios; o verdadeiro tema é a gestão da sobrevivência."},
    {q:"Por que existe o HRU?",opts:["Para substituir sistematicamente a largada manual","Porque os humanos podem deixar de conseguir agir: lesão, pânico, desaparecer debaixo de água","Só por razões regulamentares sem utilidade real","Para acelerar a largada mesmo quando tudo corre bem"],correct:1,expl:"O HRU é uma última rede de segurança, não o primeiro reflexo."},
    {q:"O HRU substitui uma largada manual voluntária e controlada?",opts:["Sim, sempre, assim que disponível","Não, só intervém quando ninguém conseguiu largá-la manualmente","Sim, mas só com mau tempo","Não, nunca funciona realmente"],correct:1,expl:"O HRU é a última rede, não uma alternativa à largada manual vista na Lição 2."},
    {q:"Como deve ser apresentado o inventário de sobrevivência segundo esta lição?",opts:["Como uma simples lista de equipamentos para memorizar","Por função: beber, comer, sinalizar, reparar, proteger-se, navegar se necessário","Como um catálogo comercial","Não existe um inventário padronizado"],correct:1,expl:"Cada objeto responde a uma função de sobrevivência precisa, nunca uma lista arbitrária."},
    {q:"Por que as rações de sobrevivência privilegiam os hidratos de carbono em vez das proteínas?",opts:["As proteínas não têm qualquer valor nutritivo","As proteínas e gorduras exigem mais água para serem digeridas, aumentando a sede","Os hidratos de carbono têm melhor sabor","Não há nenhuma razão particular"],correct:1,expl:"Os hidratos de carbono fornecem energia sem aumentar significativamente a necessidade de água."},
    {q:"O que cobre a gestão de recursos de sobrevivência, além da água e da comida?",opts:["Nada mais está envolvido","A energia física, o calor corporal, o moral da tripulação, e o uso do material","Só o tempo meteorológico","Só a navegação"],correct:1,expl:"O racionamento faz parte de uma disciplina de gestão mais ampla, não só um cálculo de água e comida."},
    {q:"Por que o moral da tripulação é considerado um recurso?",opts:["Não é um recurso real","Esgota-se como a água ou a comida e deve ser ativamente gerido e mantido","Não tem qualquer impacto na sobrevivência","Regenera-se automaticamente sem esforço"],correct:1,expl:"O moral deve ser ativamente gerido, tal como os recursos materiais."},
    {q:"Quando deve racionar-se a água e a comida?",opts:["Só quando surge a sede ou a fome","Desde o primeiro dia, sem esperar pela necessidade","Só depois de vários dias no mar","Nunca, deve-se consumir normalmente"],correct:1,expl:"A disciplina precede a necessidade, nunca o contrário."},
    {q:"Por que um foguete de socorro é considerado um recurso limitado?",opts:["Pode ser recarregado facilmente","Uma vez usado, nunca mais volta; uma má escolha do momento desperdiça-o definitivamente","Não tem qualquer limite de uso","Pode ser usado indefinidamente"],correct:1,expl:"Cada foguete usado no momento errado representa uma perda definitiva e insubstituível."},
    {q:"Quando deve usar-se um foguete de socorro?",opts:["Assim que se sentir desanimado","Só quando um meio de socorro é realmente visível, nunca ao acaso","Todas as horas para maximizar as hipóteses","Só de noite"],correct:1,expl:"O bom momento é quando um meio de socorro está efetivamente visível."},
    {q:"O EPIRB e o SART consomem um recurso limitado a cada uso, como os foguetes?",opts:["Sim, exatamente da mesma forma","Não, alertam e guiam o socorro continuamente sem consumir um recurso limitado a cada uso","Sim, mas só de noite","Não, só funcionam uma vez"],correct:1,expl:"Ao contrário dos foguetes, o EPIRB e o SART funcionam continuamente sem esse tipo de limitação."},
    {q:"No caso de Poon Lim, quanto tempo sobreviveu no mar?",opts:["Cerca de 30 dias","133 dias, um recorde de sobrevivência em jangada ainda por bater","Apenas uma semana","Mais de um ano"],correct:1,expl:"133 dias de sobrevivência, um recorde mundial que continua por bater até hoje."},
    {q:"O que demonstra principalmente o caso de Poon Lim?",opts:["Que um equipamento abundante é indispensável para a sobrevivência","Que a disciplina e a gestão de recursos importam mais do que a quantidade de material disponível","Que a sobrevivência no mar depende só da sorte","Que o racionamento é inútil se as reservas forem limitadas"],correct:1,expl:"Com um equipamento mínimo, a disciplina de gestão permitiu um recorde de sobrevivência excecional."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The Equipment Gives You a Chance. Your Decisions Keep You Alive' ?",opts:["L'équipement suffit toujours","Ce sont les décisions qui déterminent réellement la survie","Cela ne concerne que le HRU","Il ne faut jamais utiliser l'équipement"],correct:1,expl:"Le matériel offre une chance, la discipline fait la différence."},
    {q:"Pourquoi le HRU existe-t-il ?",opts:["Pour remplacer toujours le largage manuel","Parce que les humains peuvent ne plus être capables d'agir","Uniquement pour des raisons réglementaires","Pour accélérer le largage systématiquement"],correct:1,expl:"Le HRU est un dernier filet de sécurité, pas le premier réflexe."},
    {q:"Quand faut-il utiliser une fusée de détresse ?",opts:["Dès qu'on se sent découragé","Uniquement quand un moyen de secours est réellement visible","Toutes les heures","Uniquement la nuit"],correct:1,expl:"Une fusée mal utilisée est perdue définitivement."},
    {q:"Quand faut-il rationner l'eau et la nourriture ?",opts:["Seulement en cas de soif ou de faim","Dès le premier jour, sans attendre le besoin","Après plusieurs jours","Jamais"],correct:1,expl:"La discipline précède le besoin."},
    {q:"Dans le cas de Poon Lim, qu'est-ce qui a permis un record de survie de 133 jours ?",opts:["Un équipement exceptionnellement abondant","La discipline de rationnement et de gestion des ressources dès le premier jour","La chance uniquement","Un radeau moderne très équipé"],correct:1,expl:"L'équipement était minimal ; la discipline a fait toute la différence."},
  ],
  en:[
    {q:"What does 'The Equipment Gives You a Chance. Your Decisions Keep You Alive' mean?",opts:["Equipment always suffices","Decisions truly determine survival","It only concerns the HRU","Equipment should never be used"],correct:1,expl:"Equipment offers a chance, discipline makes the difference."},
    {q:"Why does the HRU exist?",opts:["To always replace manual release","Because humans may no longer be able to act","Only for regulatory reasons","To always speed up release"],correct:1,expl:"The HRU is a last safety net, not the first reflex."},
    {q:"When should a distress flare be used?",opts:["As soon as you feel discouraged","Only when a rescue means is actually visible","Every hour","Only at night"],correct:1,expl:"A poorly used flare is permanently lost."},
    {q:"When should water and food be rationed?",opts:["Only in case of thirst or hunger","From day one, without waiting for the need","After several days","Never"],correct:1,expl:"Discipline precedes need."},
    {q:"In the Poon Lim case, what allowed a 133-day survival record?",opts:["Exceptionally abundant equipment","Rationing discipline and resource management from day one","Only luck","A highly equipped modern raft"],correct:1,expl:"Equipment was minimal; discipline made all the difference."},
  ],
  es:[
    {q:"¿Qué significa 'The Equipment Gives You a Chance. Your Decisions Keep You Alive'?",opts:["El equipo siempre basta","Las decisiones realmente determinan la supervivencia","Solo concierne al HRU","Nunca hay que usar el equipo"],correct:1,expl:"El equipo ofrece una oportunidad, la disciplina marca la diferencia."},
    {q:"¿Por qué existe el HRU?",opts:["Para sustituir siempre la largada manual","Porque los humanos pueden dejar de ser capaces de actuar","Solo por razones reglamentarias","Para acelerar siempre la largada"],correct:1,expl:"El HRU es una última red de seguridad, no el primer reflejo."},
    {q:"¿Cuándo hay que usar una bengala de socorro?",opts:["En cuanto uno se sienta desanimado","Solo cuando un medio de rescate es realmente visible","Cada hora","Solo de noche"],correct:1,expl:"Una bengala mal usada se pierde definitivamente."},
    {q:"¿Cuándo hay que racionar el agua y la comida?",opts:["Solo en caso de sed o hambre","Desde el primer día, sin esperar la necesidad","Después de varios días","Nunca"],correct:1,expl:"La disciplina precede a la necesidad."},
    {q:"En el caso de Poon Lim, ¿qué permitió un récord de supervivencia de 133 días?",opts:["Un equipo excepcionalmente abundante","La disciplina de racionamiento y gestión de recursos desde el primer día","Solo la suerte","Una balsa moderna muy equipada"],correct:1,expl:"El equipo era mínimo; la disciplina marcó toda la diferencia."},
  ],
  pt:[
    {q:"O que significa 'The Equipment Gives You a Chance. Your Decisions Keep You Alive'?",opts:["O equipamento sempre basta","As decisões realmente determinam a sobrevivência","Só diz respeito ao HRU","Nunca se deve usar o equipamento"],correct:1,expl:"O equipamento oferece uma oportunidade, a disciplina faz a diferença."},
    {q:"Por que existe o HRU?",opts:["Para substituir sempre a largada manual","Porque os humanos podem deixar de conseguir agir","Só por razões regulamentares","Para acelerar sempre a largada"],correct:1,expl:"O HRU é uma última rede de segurança, não o primeiro reflexo."},
    {q:"Quando deve usar-se um foguete de socorro?",opts:["Assim que se sentir desanimado","Só quando um meio de socorro é realmente visível","Todas as horas","Só de noite"],correct:1,expl:"Um foguete mal usado perde-se definitivamente."},
    {q:"Quando deve racionar-se a água e a comida?",opts:["Só em caso de sede ou fome","Desde o primeiro dia, sem esperar pela necessidade","Após vários dias","Nunca"],correct:1,expl:"A disciplina precede a necessidade."},
    {q:"No caso de Poon Lim, o que permitiu um recorde de sobrevivência de 133 dias?",opts:["Um equipamento excecionalmente abundante","A disciplina de racionamento e gestão de recursos desde o primeiro dia","Só a sorte","Uma jangada moderna muito equipada"],correct:1,expl:"O equipamento era mínimo; a disciplina fez toda a diferença."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si tu devais gerer les ressources d'un radeau des la premiere heure, saurais-tu resister a l'envie d'utiliser tout l'equipement trop tot ?",
    en:"If you had to manage a raft's resources from the very first hour, would you be able to resist the urge to use all the equipment too soon?",
    es:"Si tuvieras que gestionar los recursos de una balsa desde la primera hora, ¿sabrias resistir la tentacion de usar todo el equipo demasiado pronto?",
    pt:"Se tivesses de gerir os recursos de uma jangada desde a primeira hora, saberias resistir a vontade de usar todo o equipamento demasiado cedo?",
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
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Leçon 3/4 · ⭐ Premium",
      title:"HRU & Survival Equipment",
      intro:"Suite directe de la Leçon 2 : le radeau est à l'eau, mais combien de temps peut-on réellement survivre à l'intérieur ? Cette leçon ne traite ni du signal d'abandon, ni du rassemblement, ni du commandement, réservés à la dernière leçon du module.",
      p0:"THE EQUIPMENT GIVES YOU A CHANCE. YOUR DECISIONS KEEP YOU ALIVE.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le HRU n'est qu'un moyen. L'inventaire n'est qu'un moyen. Le véritable sujet est la gestion de la survie : comment augmenter ses chances de rester vivant jusqu'à l'arrivée des secours.\n\nCOMMENT LE RECONNAÎTRE ? Une durée d'attente inconnue, des ressources limitées et non renouvelables.\nQUE FAIRE IMMÉDIATEMENT ? Rationner dès le premier jour, garder l'équipement de signalisation prêt mais non utilisé au hasard.\nQUELLE ERREUR L'AGGRAVE ? Boire de l'eau de mer, utiliser les fusées sans moyen de secours visible.\nQUAND DEMANDER DE L'AIDE ? Dès que le HRU ou l'équipement de survie semble défaillant, avant qu'il ne soit trop tard pour vérifier.",
      p1:"LE LARGUEUR HYDROSTATIQUE (HRU)",s1t:"Le dernier filet, pas le premier réflexe",
      s1:"Le HRU existe parce que les humains peuvent ne plus être capables d'agir. Il se déclenche par pression d'eau, via un maillon faible conçu pour rompre, uniquement quand personne n'a pu larguer manuellement.",
      p2:"L'INVENTAIRE DE SURVIE, PAR FONCTION",s2t:"Jamais un catalogue",
      s2:"Boire, manger, signaler, réparer, se protéger, naviguer si nécessaire : chaque objet répond à une fonction de survie précise, pas une simple liste à mémoriser.",
      p3:"GÉRER LES RESSOURCES DE SURVIE",s3t:"Bien plus que rationner l'eau et la nourriture",
      s3:"Énergie physique, chaleur corporelle, moral de l'équipage, utilisation du matériel : la gestion des ressources est une discipline globale, dès la première heure.",
      p4:"SIGNALISATION ET CHANCES DE SECOURS",s4t:"Une ressource qu'on ne récupère jamais",
      s4:"L'EPIRB et le SART alertent en continu, sans consommer de ressource limitée. Les fusées, elles, ne reviennent jamais une fois utilisées : choisir le bon moment compte autant que posséder le bon équipement.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 3",
      sumP:["The Equipment Gives You a Chance. Your Decisions Keep You Alive","Le HRU est le dernier filet de sécurité, jamais le premier réflexe","L'inventaire de survie répond à des fonctions précises : boire, manger, signaler, réparer, se protéger","La gestion des ressources couvre l'eau, la nourriture, l'énergie physique, le moral et le matériel","Une fusée mal utilisée est perdue pour toujours : choisir le bon moment est essentiel"],
      learnedP:["Pourquoi le HRU existe et son rôle réel","L'inventaire de survie organisé par fonction","La discipline globale de gestion des ressources","Le bon usage de la signalisation de détresse","Pourquoi la discipline compte plus que la quantité d'équipement"],
      transition:"You now know how to launch a lifeboat, deploy a liferaft, and survive at sea. But what happens when every one of those decisions must be made in just a few minutes?",
      safetyMsg:"The equipment gives you a chance. Your decisions keep you alive.",
    },
    en:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lesson 3/4 · ⭐ Premium",
      title:"HRU & Survival Equipment",
      intro:"A direct continuation of Lesson 2: the raft is in the water, but how long can you really survive inside it? This lesson does not cover the abandon ship signal, muster, or command, reserved for the module's last lesson.",
      p0:"THE EQUIPMENT GIVES YOU A CHANCE. YOUR DECISIONS KEEP YOU ALIVE.",s0t:"The principle that structures the whole lesson",
      s0:"The HRU is only a means. The inventory is only a means. The real subject is survival management: how to increase your chances of staying alive until rescue arrives.\n\nHOW DO I RECOGNIZE IT? An unknown waiting time, limited and non-renewable resources.\nWHAT DO I DO IMMEDIATELY? Ration from day one, keep signaling equipment ready but not used at random.\nWHAT MISTAKE MAKES IT WORSE? Drinking seawater, using flares without a visible rescue means.\nWHEN MUST I ASK FOR HELP? As soon as the HRU or survival equipment seems to be failing, before it's too late to check.",
      p1:"THE HYDROSTATIC RELEASE UNIT (HRU)",s1t:"The last net, not the first reflex",
      s1:"The HRU exists because humans may no longer be able to act. It triggers by water pressure, via a weak link designed to break, only when no one was able to release it manually.",
      p2:"SURVIVAL EQUIPMENT, BY FUNCTION",s2t:"Never a catalog",
      s2:"Drink, eat, signal, repair, protect oneself, navigate if necessary: each item answers a precise survival function, not a simple list to memorize.",
      p3:"MANAGING SURVIVAL RESOURCES",s3t:"Far more than rationing water and food",
      s3:"Physical energy, body heat, crew morale, equipment use: resource management is a broader discipline, starting from the first hour.",
      p4:"SIGNALLING AND RESCUE CHANCES",s4t:"A resource you never get back",
      s4:"The EPIRB and SART alert continuously, without consuming a limited resource. Flares, on the other hand, never come back once used: choosing the right moment matters as much as having the right equipment.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 3",
      sumP:["The Equipment Gives You a Chance. Your Decisions Keep You Alive","The HRU is the last safety net, never the first reflex","The survival inventory answers precise functions: drink, eat, signal, repair, protect","Resource management covers water, food, physical energy, morale, and equipment","A poorly used flare is lost forever: choosing the right moment is essential"],
      learnedP:["Why the HRU exists and its real role","The survival inventory organized by function","The broader discipline of resource management","The proper use of distress signaling","Why discipline matters more than the amount of equipment"],
      transition:"You now know how to launch a lifeboat, deploy a liferaft, and survive at sea. But what happens when every one of those decisions must be made in just a few minutes?",
      safetyMsg:"The equipment gives you a chance. Your decisions keep you alive.",
    },
    es:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lección 3/4 · ⭐ Premium",
      title:"HRU & Survival Equipment",
      intro:"Continuación directa de la Lección 2: la balsa está en el agua, ¿pero cuánto tiempo se puede sobrevivir realmente dentro? Esta lección no aborda la señal de abandono, la reunión ni el mando, reservados para la última lección del módulo.",
      p0:"THE EQUIPMENT GIVES YOU A CHANCE. YOUR DECISIONS KEEP YOU ALIVE.",s0t:"El principio que estructura toda la lección",
      s0:"El HRU es solo un medio. El inventario es solo un medio. El verdadero tema es la gestión de la supervivencia: cómo aumentar tus posibilidades de seguir vivo hasta que llegue el rescate.\n\n¿CÓMO RECONOCERLO? Un tiempo de espera desconocido, recursos limitados y no renovables.\n¿QUÉ HACER DE INMEDIATO? Racionar desde el primer día, mantener el equipo de señalización listo pero sin usarlo al azar.\n¿QUÉ ERROR LO AGRAVA? Beber agua de mar, usar bengalas sin un medio de rescate visible.\n¿CUÁNDO PEDIR AYUDA? En cuanto el HRU o el equipo de supervivencia parezca fallar, antes de que sea demasiado tarde para comprobarlo.",
      p1:"EL LARGADOR HIDROSTÁTICO (HRU)",s1t:"La última red, no el primer reflejo",
      s1:"El HRU existe porque los humanos pueden dejar de ser capaces de actuar. Se activa por presión del agua, mediante un eslabón débil diseñado para romperse, solo cuando nadie pudo largarla manualmente.",
      p2:"EL INVENTARIO DE SUPERVIVENCIA, POR FUNCIÓN",s2t:"Nunca un catálogo",
      s2:"Beber, comer, señalar, reparar, protegerse, navegar si es necesario: cada objeto responde a una función de supervivencia precisa, no una simple lista para memorizar.",
      p3:"GESTIONAR LOS RECURSOS DE SUPERVIVENCIA",s3t:"Mucho más que racionar agua y comida",
      s3:"Energía física, calor corporal, moral de la tripulación, uso del material: la gestión de recursos es una disciplina más amplia, desde la primera hora.",
      p4:"SEÑALIZACIÓN Y OPORTUNIDADES DE RESCATE",s4t:"Un recurso que nunca se recupera",
      s4:"El EPIRB y el SART alertan de forma continua, sin consumir un recurso limitado. Las bengalas, en cambio, nunca vuelven una vez usadas: elegir el momento adecuado importa tanto como tener el equipo adecuado.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 3",
      sumP:["The Equipment Gives You a Chance. Your Decisions Keep You Alive","El HRU es la última red de seguridad, nunca el primer reflejo","El inventario de supervivencia responde a funciones precisas: beber, comer, señalar, reparar, proteger","La gestión de recursos cubre el agua, la comida, la energía física, la moral y el material","Una bengala mal usada se pierde para siempre: elegir el momento adecuado es esencial"],
      learnedP:["Por qué existe el HRU y su papel real","El inventario de supervivencia organizado por función","La disciplina más amplia de gestión de recursos","El uso correcto de la señalización de socorro","Por qué la disciplina importa más que la cantidad de equipo"],
      transition:"You now know how to launch a lifeboat, deploy a liferaft, and survive at sea. But what happens when every one of those decisions must be made in just a few minutes?",
      safetyMsg:"The equipment gives you a chance. Your decisions keep you alive.",
    },
    pt:{
      badge:"🛟 Safety · Lifeboats, Liferafts & HRU · Lição 3/4 · ⭐ Premium",
      title:"HRU & Survival Equipment",
      intro:"Continuação direta da Lição 2: a jangada está na água, mas quanto tempo se pode realmente sobreviver dentro dela? Esta lição não aborda o sinal de abandono, a reunião nem o comando, reservados para a última lição do módulo.",
      p0:"THE EQUIPMENT GIVES YOU A CHANCE. YOUR DECISIONS KEEP YOU ALIVE.",s0t:"O princípio que estrutura toda a lição",
      s0:"O HRU é apenas um meio. O inventário é apenas um meio. O verdadeiro tema é a gestão da sobrevivência: como aumentar as hipóteses de permanecer vivo até o socorro chegar.\n\nCOMO RECONHECER? Um tempo de espera desconhecido, recursos limitados e não renováveis.\nO QUE FAZER IMEDIATAMENTE? Racionar desde o primeiro dia, manter o equipamento de sinalização pronto mas sem o usar ao acaso.\nQUE ERRO O AGRAVA? Beber água do mar, usar foguetes sem um meio de socorro visível.\nQUANDO PEDIR AJUDA? Assim que o HRU ou o equipamento de sobrevivência parecer falhar, antes de ser tarde demais para verificar.",
      p1:"O LARGADOR HIDROSTÁTICO (HRU)",s1t:"A última rede, não o primeiro reflexo",
      s1:"O HRU existe porque os humanos podem deixar de conseguir agir. Ativa-se por pressão da água, através de um elo fraco concebido para se romper, apenas quando ninguém conseguiu largá-la manualmente.",
      p2:"O INVENTÁRIO DE SOBREVIVÊNCIA, POR FUNÇÃO",s2t:"Nunca um catálogo",
      s2:"Beber, comer, sinalizar, reparar, proteger-se, navegar se necessário: cada objeto responde a uma função de sobrevivência precisa, não uma simples lista para memorizar.",
      p3:"GERIR OS RECURSOS DE SOBREVIVÊNCIA",s3t:"Muito mais do que racionar água e comida",
      s3:"Energia física, calor corporal, moral da tripulação, uso do material: a gestão de recursos é uma disciplina mais ampla, desde a primeira hora.",
      p4:"SINALIZAÇÃO E HIPÓTESES DE SOCORRO",s4t:"Um recurso que nunca se recupera",
      s4:"O EPIRB e o SART alertam continuamente, sem consumir um recurso limitado. Os foguetes, por sua vez, nunca voltam depois de usados: escolher o momento certo importa tanto quanto ter o equipamento certo.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 3",
      sumP:["The Equipment Gives You a Chance. Your Decisions Keep You Alive","O HRU é a última rede de segurança, nunca o primeiro reflexo","O inventário de sobrevivência responde a funções precisas: beber, comer, sinalizar, reparar, proteger","A gestão de recursos cobre a água, a comida, a energia física, o moral e o material","Um foguete mal usado perde-se para sempre: escolher o momento certo é essencial"],
      learnedP:["Por que o HRU existe e o seu papel real","O inventário de sobrevivência organizado por função","A disciplina mais ampla de gestão de recursos","O uso correto da sinalização de socorro","Por que a disciplina importa mais do que a quantidade de equipamento"],
      transition:"You now know how to launch a lifeboat, deploy a liferaft, and survive at sea. But what happens when every one of those decisions must be made in just a few minutes?",
      safetyMsg:"The equipment gives you a chance. Your decisions keep you alive.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS5_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/4":lang==="en"?"Lesson 3/4":lang==="es"?"Lección 3/4":"Lição 3/4"}</div>
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

            <SL icon="🛟" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛟</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="⚙️" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚙️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚙️ {lang==="fr"?"HRU - INTERACTIF":lang==="en"?"HRU - INTERACTIVE":lang==="es"?"HRU - INTERACTIVO":"HRU - INTERATIVO"}</div><HRUSVG lang={lang}/></Card>

            <SL icon="🎒" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎒</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎒 {lang==="fr"?"ÉQUIPEMENT PAR FONCTION - INTERACTIF":lang==="en"?"EQUIPMENT BY FUNCTION - INTERACTIVE":lang==="es"?"EQUIPO POR FUNCIÓN - INTERACTIVO":"EQUIPAMENTO POR FUNÇÃO - INTERATIVO"}</div><SurvivalEquipmentSVG lang={lang}/></Card>

            <SL icon="⚖️" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚖️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚖️ {lang==="fr"?"GESTION DES RESSOURCES - INTERACTIF":lang==="en"?"RESOURCE MANAGEMENT - INTERACTIVE":lang==="es"?"GESTIÓN DE RECURSOS - INTERACTIVO":"GESTÃO DE RECURSOS - INTERATIVO"}</div><ManagingResourcesSVG lang={lang}/></Card>

            <SL icon="📡" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📡</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📡 {lang==="fr"?"SIGNALISATION - INTERACTIF":lang==="en"?"SIGNALLING - INTERACTIVE":lang==="es"?"SEÑALIZACIÓN - INTERACTIVO":"SINALIZAÇÃO - INTERATIVO"}</div><RescueSignallingSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="🏆" text={lc.p6} color={C.green}/>
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
                {lang==="fr"?"Quiz Final - HRU & Survie":lang==="en"?"Final Quiz - HRU & Survival":lang==="es"?"Quiz Final - HRU y Supervivencia":"Quiz Final - HRU e Sobrevivência"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/4":"questions · Lesson 3/4"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(77,166,255,0.15)",border:`1px solid ${C.blue2}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
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

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onComplete} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.blue2},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(77,166,255,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 4 - ABANDON SHIP →":lang==="en"?"LESSON 4 - ABANDON SHIP →":lang==="es"?"LECCIÓN 4 - ABANDON SHIP →":"LIÇÃO 4 - ABANDON SHIP →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
