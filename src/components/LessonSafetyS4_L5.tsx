import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - BOUNDARY COOLING
function BoundaryCoolingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔗", label:{fr:"Pourquoi la conduction menace tout",en:"Why conduction threatens everything",es:"Por qué la conducción amenaza todo",pt:"Por que a condução ameaça tudo"}, desc:{fr:"La chaleur traverse les cloisons et les ponts métalliques sans qu'aucune flamme ne les touche directement. Un compartiment voisin peut s'enflammer sans jamais voir le feu original.",en:"Heat travels through metal bulkheads and decks without any flame touching them directly. A neighboring compartment can ignite without ever seeing the original fire.",es:"El calor atraviesa mamparos y cubiertas metálicas sin que ninguna llama las toque directamente. Un compartimento vecino puede incendiarse sin ver nunca el fuego original.",pt:"O calor atravessa anteparos e conveses metálicos sem que nenhuma chama lhes toque diretamente. Um compartimento vizinho pode incendiar-se sem nunca ver o fogo original."} },
    { id:2, icon:"💧", label:{fr:"Refroidir, pas éteindre",en:"Cooling, not extinguishing",es:"Enfriar, no apagar",pt:"Arrefecer, não apagar"}, desc:{fr:"Le boundary cooling n'attaque pas le feu lui-même : il refroidit les cloisons et ponts adjacents pour empêcher la propagation par conduction et l'effondrement structurel.",en:"Boundary cooling doesn't attack the fire itself: it cools adjacent bulkheads and decks to prevent spread by conduction and structural collapse.",es:"El boundary cooling no ataca el fuego en sí: enfría los mamparos y cubiertas adyacentes para impedir la propagación por conducción y el colapso estructural.",pt:"O boundary cooling não ataca o fogo em si: arrefece os anteparos e conveses adjacentes para impedir a propagação por condução e o colapso estrutural."} },
    { id:3, icon:"🎯", label:{fr:"Toutes les faces exposées",en:"All exposed sides",es:"Todas las caras expuestas",pt:"Todas as faces expostas"}, desc:{fr:"Refroidir un seul côté d'un compartiment ne suffit pas : toutes les surfaces adjacentes au foyer doivent être surveillées et refroidies si nécessaire.",en:"Cooling only one side of a compartment isn't enough: every surface adjacent to the fire must be monitored and cooled if needed.",es:"Enfriar un solo lado de un compartimento no basta: hay que vigilar y enfriar todas las superficies adyacentes al foco si es necesario.",pt:"Arrefecer apenas um lado de um compartimento não basta: todas as superfícies adjacentes ao foco devem ser vigiadas e arrefecidas se necessário."} },
    { id:4, icon:"⚖️", label:{fr:"Sans noyer le navire",en:"Without flooding the ship",es:"Sin inundar el buque",pt:"Sem inundar o navio"}, desc:{fr:"L'eau utilisée pour le refroidissement doit être maîtrisée : une accumulation excessive peut menacer la stabilité du navire, un risque distinct du feu lui-même.",en:"Water used for cooling must be controlled: excessive accumulation can threaten the ship's stability, a risk distinct from the fire itself.",es:"El agua usada para enfriar debe controlarse: una acumulación excesiva puede amenazar la estabilidad del buque, un riesgo distinto del propio fuego.",pt:"A água usada para arrefecer deve ser controlada: uma acumulação excessiva pode ameaçar a estabilidade do navio, um risco distinto do próprio fogo."} },
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

// SVG 2 - COMPARTMENT INTEGRITY
function CompartmentIntegritySVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🚪", label:{fr:"Portes coupe-feu",en:"Fire doors",es:"Puertas cortafuego",pt:"Portas corta-fogo"}, desc:{fr:"Chaque porte coupe-feu maintenue fermée est une frontière qui protège le reste du navire. Une porte calée ouverte annule cette protection entière.",en:"Every fire door kept closed is a boundary protecting the rest of the ship. A door wedged open cancels that entire protection.",es:"Cada puerta cortafuego mantenida cerrada es una frontera que protege el resto del buque. Una puerta calzada abierta anula toda esa protección.",pt:"Cada porta corta-fogo mantida fechada é uma fronteira que protege o resto do navio. Uma porta calçada aberta anula toda essa proteção."} },
    { id:2, icon:"🌬️", label:{fr:"Volets et ventilation",en:"Dampers and ventilation",es:"Compuertas y ventilación",pt:"Comportas e ventilação"}, desc:{fr:"La ventilation peut transporter fumée et chaleur vers des compartiments entiers en quelques minutes si elle n'est pas coupée à temps.",en:"Ventilation can carry smoke and heat to entire compartments within minutes if not shut off in time.",es:"La ventilación puede transportar humo y calor a compartimentos enteros en minutos si no se corta a tiempo.",pt:"A ventilação pode transportar fumo e calor para compartimentos inteiros em minutos se não for cortada a tempo."} },
    { id:3, icon:"🔲", label:{fr:"Écoutilles et trappes",en:"Hatches and access points",es:"Escotillas y trampillas",pt:"Escotilhas e alçapões"}, desc:{fr:"Chaque ouverture non contrôlée est une brèche potentielle dans la frontière du compartiment, même petite.",en:"Every uncontrolled opening is a potential breach in the compartment's boundary, even a small one.",es:"Cada abertura no controlada es una brecha potencial en la frontera del compartimento, incluso pequeña.",pt:"Cada abertura não controlada é uma brecha potencial na fronteira do compartimento, mesmo pequena."} },
    { id:4, icon:"⏱️", label:{fr:"Le mauvais moment pour ouvrir",en:"The wrong moment to open",es:"El mal momento para abrir",pt:"O momento errado para abrir"}, desc:{fr:"Ouvrir une porte ou une écoutille pour 'juste regarder' peut apporter l'oxygène qui relance le feu et fait perdre tout le compartiment, pas seulement l'accès.",en:"Opening a door or hatch to 'just take a look' can bring in the oxygen that reignites the fire and loses the entire compartment, not just the access.",es:"Abrir una puerta o escotilla para 'echar un vistazo' puede aportar el oxígeno que reaviva el fuego y hacer perder todo el compartimento, no solo el acceso.",pt:"Abrir uma porta ou escotilha para 'só espreitar' pode trazer o oxigénio que reacende o fogo e fazer perder todo o compartimento, não só o acesso."} },
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

// SVG 3 - EXPOSURE PROTECTION
function ExposureProtectionSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🛢️", label:{fr:"Réservoirs carburant",en:"Fuel tanks",es:"Tanques de combustible",pt:"Tanques de combustível"}, desc:{fr:"Refroidir ou éloigner tout réservoir exposé à la chaleur avant qu'il ne devienne lui-même une source d'aggravation.",en:"Cool or move away any tank exposed to heat before it becomes a source of worsening itself.",es:"Enfriar o alejar cualquier tanque expuesto al calor antes de que se convierta él mismo en una fuente de agravamiento.",pt:"Arrefecer ou afastar qualquer tanque exposto ao calor antes de se tornar ele próprio uma fonte de agravamento."} },
    { id:2, icon:"🧯", label:{fr:"Bouteilles de gaz",en:"Gas cylinders",es:"Botellas de gas",pt:"Garrafas de gás"}, desc:{fr:"Une bouteille de gaz chauffée peut se rompre violemment : l'identifier et la protéger fait partie de la protection des expositions.",en:"A heated gas cylinder can rupture violently: identifying and protecting it is part of exposure protection.",es:"Una botella de gas calentada puede romperse violentamente: identificarla y protegerla forma parte de la protección de exposiciones.",pt:"Uma garrafa de gás aquecida pode romper-se violentamente: identificá-la e protegê-la faz parte da proteção de exposições."} },
    { id:3, icon:"⚡", label:{fr:"Tableaux électriques",en:"Electrical panels",es:"Cuadros eléctricos",pt:"Quadros elétricos"}, desc:{fr:"Un tableau électrique exposé à la chaleur ou à l'eau devient une nouvelle source de danger, distincte du feu d'origine.",en:"An electrical panel exposed to heat or water becomes a new source of danger, distinct from the original fire.",es:"Un cuadro eléctrico expuesto al calor o al agua se convierte en una nueva fuente de peligro, distinta del fuego original.",pt:"Um quadro elétrico exposto ao calor ou à água torna-se uma nova fonte de perigo, distinta do fogo original."} },
    { id:4, icon:"🏗️", label:{fr:"Compartiments et équipements voisins",en:"Neighboring compartments and equipment",es:"Compartimentos y equipos vecinos",pt:"Compartimentos e equipamentos vizinhos"}, desc:{fr:"Protéger ce qui n'a pas encore brûlé est aussi important qu'agir sur ce qui brûle déjà : c'est le cœur de la protection des expositions.",en:"Protecting what hasn't burned yet is as important as acting on what's already burning: that's the heart of exposure protection.",es:"Proteger lo que aún no ha ardido es tan importante como actuar sobre lo que ya arde: ese es el corazón de la protección de exposiciones.",pt:"Proteger o que ainda não ardeu é tão importante como agir sobre o que já arde: esse é o coração da proteção de exposições."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Protéger ce qui n'a pas encore brûlé.":lang==="en"?"Protect what hasn't burned yet.":lang==="es"?"Proteger lo que aún no ha ardido.":"Proteger o que ainda não ardeu."}</div>
    </div>
  );
}

// SVG 4 - REKINDLING
function RekindlingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔥", label:{fr:"Points chauds cachés",en:"Hidden hot spots",es:"Puntos calientes ocultos",pt:"Pontos quentes escondidos"}, desc:{fr:"Un point chaud peut subsister derrière une cloison ou sous un revêtement, invisible, longtemps après que les flammes visibles ont disparu.",en:"A hot spot can remain behind a bulkhead or under a lining, invisible, long after visible flames have disappeared.",es:"Un punto caliente puede persistir detrás de un mamparo o bajo un revestimiento, invisible, mucho después de que desaparezcan las llamas visibles.",pt:"Um ponto quente pode persistir atrás de um anteparo ou sob um revestimento, invisível, muito depois de as chamas visíveis terem desaparecido."} },
    { id:2, icon:"🌫️", label:{fr:"Braises sous la surface",en:"Embers beneath the surface",es:"Brasas bajo la superficie",pt:"Brasas sob a superfície"}, desc:{fr:"Des braises peuvent continuer à couver sous des matériaux isolants ou dans des espaces creux, sans fumée visible.",en:"Embers can keep smoldering under insulating materials or in hollow spaces, with no visible smoke.",es:"Las brasas pueden seguir ardiendo lentamente bajo materiales aislantes o en espacios huecos, sin humo visible.",pt:"As brasas podem continuar a arder lentamente sob materiais isolantes ou em espaços ocos, sem fumo visível."} },
    { id:3, icon:"🧱", label:{fr:"Matériaux isolants trompeurs",en:"Deceptive insulating materials",es:"Materiales aislantes engañosos",pt:"Materiais isolantes enganosos"}, desc:{fr:"Certains matériaux isolants retiennent la chaleur suffisamment longtemps pour masquer une reprise de feu en préparation.",en:"Some insulating materials retain heat long enough to mask a fire building up to reignite.",es:"Algunos materiales aislantes retienen el calor lo suficiente como para enmascarar una reignición en preparación.",pt:"Alguns materiais isolantes retêm o calor tempo suficiente para mascarar uma reignição em preparação."} },
    { id:4, icon:"♻️", label:{fr:"Un feu 'éteint' peut repartir",en:"A fire that looks out can restart",es:"Un fuego 'apagado' puede reiniciarse",pt:"Um fogo 'apagado' pode reacender"}, desc:{fr:"L'absence de flammes visibles n'est jamais une preuve d'extinction complète : la surveillance continue jusqu'à confirmation reste indispensable.",en:"The absence of visible flames is never proof of complete extinction: continued monitoring until confirmation remains essential.",es:"La ausencia de llamas visibles nunca es prueba de extinción completa: la vigilancia continua hasta la confirmación sigue siendo indispensable.",pt:"A ausência de chamas visíveis nunca é prova de extinção completa: a vigilância contínua até à confirmação continua a ser indispensável."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map(i=>(
          <div key={i.id} onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(142,68,173,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.purple:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{i.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(142,68,173,0.1)",border:`1px solid ${C.purple}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE - 3 OPEN PRACTICAL EXERCISES
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a"};
  const qs = {
    fr:[
      {id:"q1",q:"Une cloison adjacente au compartiment en feu devient chaude au toucher. Que faites-vous ?\na) Rien, tant qu'il n'y a pas de flamme visible de ce côté\nb) Refroidir cette cloison avec de l'eau pour empêcher la propagation par conduction\nc) Ouvrir une porte pour vérifier ce qui se passe de l'autre côté"},
      {id:"q2",q:"Une porte coupe-feu est calée ouverte pour faciliter le passage pendant l'intervention. Que pensez-vous de cette pratique ?\na) C'est acceptable si l'intervention est rapide\nb) C'est acceptable si un membre d'équipage surveille la porte\nc) C'est dangereux : cela annule la protection de tout le compartiment, quelle que soit la raison"},
      {id:"q3",q:"Le feu semble éteint, plus aucune flamme visible. Que faites-vous ?\na) Continuer à surveiller pour détecter un point chaud ou une reprise possible\nb) Considérer l'intervention terminée immédiatement\nc) Ventiler immédiatement pour évacuer la fumée résiduelle"},
    ],
    en:[
      {id:"q1",q:"A bulkhead adjacent to the compartment on fire becomes warm to the touch. What do you do?\na) Nothing, as long as there's no visible flame on this side\nb) Cool this bulkhead with water to prevent spread by conduction\nc) Open a door to check what's happening on the other side"},
      {id:"q2",q:"A fire door is wedged open to ease movement during the intervention. What do you think of this practice?\na) It's acceptable if the intervention is quick\nb) It's acceptable if a crew member watches the door\nc) It's dangerous: it cancels the protection of the entire compartment, whatever the reason"},
      {id:"q3",q:"The fire seems out, no more visible flame. What do you do?\na) Keep monitoring to detect a possible hot spot or rekindling\nb) Consider the intervention immediately over\nc) Ventilate immediately to clear residual smoke"},
    ],
    es:[
      {id:"q1",q:"Un mamparo adyacente al compartimento en llamas se calienta al tacto. ¿Qué haces?\na) Nada, mientras no haya llama visible de ese lado\nb) Enfriar ese mamparo con agua para impedir la propagación por conducción\nc) Abrir una puerta para comprobar qué pasa al otro lado"},
      {id:"q2",q:"Una puerta cortafuego se calza abierta para facilitar el paso durante la intervención. ¿Qué opinas de esta práctica?\na) Es aceptable si la intervención es rápida\nb) Es aceptable si un tripulante vigila la puerta\nc) Es peligroso: anula la protección de todo el compartimento, sea cual sea la razón"},
      {id:"q3",q:"El fuego parece apagado, ya no hay llama visible. ¿Qué haces?\na) Seguir vigilando para detectar un posible punto caliente o reignición\nb) Considerar la intervención terminada de inmediato\nc) Ventilar de inmediato para evacuar el humo residual"},
    ],
    pt:[
      {id:"q1",q:"Um anteparo adjacente ao compartimento em chamas fica quente ao toque. O que fazes?\na) Nada, enquanto não houver chama visível desse lado\nb) Arrefecer esse anteparo com água para impedir a propagação por condução\nc) Abrir uma porta para verificar o que se passa do outro lado"},
      {id:"q2",q:"Uma porta corta-fogo é calçada aberta para facilitar a passagem durante a intervenção. O que pensas desta prática?\na) É aceitável se a intervenção for rápida\nb) É aceitável se um tripulante vigiar a porta\nc) É perigoso: anula a proteção de todo o compartimento, seja qual for a razão"},
      {id:"q3",q:"O fogo parece apagado, já não há chama visível. O que fazes?\na) Continuar a vigiar para detetar um possível ponto quente ou reacendimento\nb) Considerar a intervenção terminada de imediato\nc) Ventilar de imediato para evacuar o fumo residual"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (VEHICLE CARRIER HONOR, NTSB)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Incendie à bord du Vehicle Carrier Honor",teaser:"Rapport NTSB - boundary cooling et ventilation coupée, propagation évitée",
      what:"À bord de ce transporteur de véhicules, un feu se déclare sur un pont garage. L'équipage pulvérise de l'eau sur les cloisons extérieures et le plafond du garage pour refroidir les limites du compartiment, tout en travaillant à faire tomber les flammes visibles. La ventilation de la zone est entièrement coupée peu après le début de l'intervention. Le navire est manœuvré hors des voies de circulation et ralenti pour permettre à l'équipage de se concentrer sur la lutte contre l'incendie, et son statut est signalé comme 'non maître de sa manœuvre' aux navires environnants. Le boundary cooling, combiné à la fermeture complète de la ventilation, a vraisemblablement empêché la propagation du feu et limité les dégâts au pont d'origine.",
      cause:"• Un feu s'est déclaré sur un pont garage, avec un risque réel de propagation aux ponts et compartiments voisins\n• L'équipage a immédiatement engagé le refroidissement des cloisons extérieures et du plafond du garage\n• Toute la ventilation de la zone a été sécurisée peu après le début de l'intervention\n• Le navire a été manœuvré pour se dégager du trafic et permettre à l'équipage de se concentrer sur l'incendie",
      lessons:"✓ The Fire Doesn't Need to Be Out. It Just Needs to Stop There : le boundary cooling et la ventilation coupée ont contenu le feu au pont d'origine\n✓ Refroidir les limites du compartiment est une action aussi importante que d'attaquer les flammes elles-mêmes\n✓ Sécuriser la ventilation rapidement limite le transport de chaleur et de fumée vers d'autres espaces\n✓ Une intervention bien menée peut sauver le navire sans que le feu soit totalement éteint dans l'immédiat",
      link:"🔗 Ce cas illustre directement pourquoi le boundary cooling et l'intégrité des compartiments sont au cœur de la protection du navire, indépendamment de l'extinction complète du foyer initial."},
    en:{title:"Fire aboard Vehicle Carrier Honor",teaser:"NTSB report - boundary cooling and ventilation secured, spread prevented",
      what:"Aboard this vehicle carrier, a fire broke out on a garage deck. The crew sprayed water on the outside bulkheads and overhead of the garage to cool the compartment boundaries, while working to knock down the visible flames. Ventilation to the area was fully secured shortly after the intervention began. The vessel maneuvered out of the traffic scheme and slowed down to allow the crew to focus on fighting the fire, with its status reported as 'not under command' to surrounding vessels. Boundary cooling, combined with fully securing ventilation, likely prevented the spread of the fire and minimized damage to the original deck.",
      cause:"• A fire broke out on a garage deck, with a real risk of spreading to neighboring decks and compartments\n• The crew immediately began cooling the outside bulkheads and overhead of the garage\n• All ventilation to the area was secured shortly after the intervention began\n• The vessel maneuvered clear of traffic to allow the crew to focus on the fire",
      lessons:"✓ The Fire Doesn't Need to Be Out. It Just Needs to Stop There: boundary cooling and secured ventilation contained the fire to the original deck\n✓ Cooling the compartment's boundaries is as important an action as attacking the flames themselves\n✓ Securing ventilation quickly limits the transport of heat and smoke to other spaces\n✓ A well-conducted intervention can save the ship without the fire being fully extinguished right away",
      link:"🔗 This case directly illustrates why boundary cooling and compartment integrity are at the heart of protecting the ship, regardless of fully extinguishing the original source."},
    es:{title:"Incendio a bordo del Vehicle Carrier Honor",teaser:"Informe NTSB - boundary cooling y ventilación asegurada, propagación evitada",
      what:"A bordo de este transportador de vehículos, se declaró un incendio en una cubierta de garaje. La tripulación roció agua sobre los mamparos exteriores y el techo del garaje para enfriar los límites del compartimento, mientras trabajaba para sofocar las llamas visibles. La ventilación de la zona quedó totalmente asegurada poco después de comenzar la intervención. El buque maniobró para salir del esquema de tráfico y redujo la velocidad para permitir que la tripulación se centrara en el incendio, con su estado reportado como 'sin gobierno' a los buques cercanos. El boundary cooling, combinado con la ventilación totalmente asegurada, probablemente impidió la propagación del fuego y minimizó los daños a la cubierta original.",
      cause:"• Se declaró un incendio en una cubierta de garaje, con un riesgo real de propagación a cubiertas y compartimentos vecinos\n• La tripulación comenzó de inmediato a enfriar los mamparos exteriores y el techo del garaje\n• Toda la ventilación de la zona quedó asegurada poco después de comenzar la intervención\n• El buque maniobró para alejarse del tráfico y permitir que la tripulación se centrara en el fuego",
      lessons:"✓ The Fire Doesn't Need to Be Out. It Just Needs to Stop There: el boundary cooling y la ventilación asegurada contuvieron el fuego en la cubierta original\n✓ Enfriar los límites del compartimento es una acción tan importante como atacar las propias llamas\n✓ Asegurar la ventilación rápidamente limita el transporte de calor y humo a otros espacios\n✓ Una intervención bien realizada puede salvar el buque sin que el fuego se apague por completo de inmediato",
      link:"🔗 Este caso ilustra directamente por qué el boundary cooling y la integridad de los compartimentos son el corazón de la protección del buque, independientemente de la extinción completa del foco original."},
    pt:{title:"Incêndio a bordo do Vehicle Carrier Honor",teaser:"Relatório NTSB - boundary cooling e ventilação assegurada, propagação evitada",
      what:"A bordo deste transportador de veículos, deflagrou um incêndio num convés de garagem. A tripulação pulverizou água sobre os anteparos exteriores e o teto da garagem para arrefecer os limites do compartimento, enquanto trabalhava para abater as chamas visíveis. A ventilação da zona ficou totalmente assegurada pouco depois de a intervenção começar. O navio manobrou para sair do esquema de tráfego e reduziu a velocidade para permitir que a tripulação se concentrasse no incêndio, com o seu estado reportado como 'sem governo' aos navios vizinhos. O boundary cooling, combinado com a ventilação totalmente assegurada, provavelmente impediu a propagação do fogo e minimizou os danos ao convés original.",
      cause:"• Deflagrou um incêndio num convés de garagem, com um risco real de propagação a conveses e compartimentos vizinhos\n• A tripulação começou de imediato a arrefecer os anteparos exteriores e o teto da garagem\n• Toda a ventilação da zona ficou assegurada pouco depois de a intervenção começar\n• O navio manobrou para se afastar do tráfego e permitir que a tripulação se concentrasse no fogo",
      lessons:"✓ The Fire Doesn't Need to Be Out. It Just Needs to Stop There: o boundary cooling e a ventilação assegurada contiveram o fogo no convés original\n✓ Arrefecer os limites do compartimento é uma ação tão importante como atacar as próprias chamas\n✓ Assegurar a ventilação rapidamente limita o transporte de calor e fumo para outros espaços\n✓ Uma intervenção bem conduzida pode salvar o navio sem que o fogo seja totalmente extinto de imediato",
      link:"🔗 Este caso ilustra diretamente por que o boundary cooling e a integridade dos compartimentos estão no centro da proteção do navio, independentemente da extinção completa do foco original."},
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
    {q:"Que signifie le principe 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There' ?",opts:["Il faut toujours éteindre complètement le feu avant d'agir sur autre chose","Sauver le navire ne dépend pas toujours de l'extinction totale, mais d'empêcher la propagation","Ce principe ne concerne que les feux électriques","Il ne faut jamais tenter de contenir un feu"],correct:1,expl:"L'objectif de cette leçon est d'empêcher la propagation, pas nécessairement d'éteindre immédiatement le feu."},
    {q:"Qu'est-ce que le boundary cooling ?",opts:["Attaquer directement les flammes avec de l'eau","Refroidir les cloisons et ponts adjacents pour empêcher la propagation par conduction","Éteindre un feu électrique avec du CO2","Ventiler un compartiment après extinction"],correct:1,expl:"Le boundary cooling refroidit les limites du compartiment, sans nécessairement attaquer le feu lui-même."},
    {q:"Pourquoi la conduction est-elle dangereuse pour les compartiments voisins ?",opts:["Elle n'a aucun effet réel","La chaleur traverse les cloisons métalliques sans qu'aucune flamme ne les touche directement","Elle ne concerne que les feux électriques","Elle est toujours visible immédiatement"],correct:1,expl:"Un compartiment voisin peut s'enflammer par conduction sans jamais voir le feu original."},
    {q:"Faut-il refroidir un seul côté d'un compartiment en feu ?",opts:["Oui, un seul côté suffit toujours","Non, toutes les surfaces adjacentes exposées doivent être surveillées et refroidies si nécessaire","Non, il ne faut jamais refroidir de cloison","Oui, uniquement le côté le plus proche de l'équipage"],correct:1,expl:"Toutes les faces exposées au foyer doivent être prises en compte, pas une seule."},
    {q:"Pourquoi faut-il maîtriser la quantité d'eau utilisée pour le boundary cooling ?",opts:["Ce n'est pas important","Une accumulation excessive d'eau peut menacer la stabilité du navire","L'eau n'a aucun effet sur la stabilité","Il faut toujours utiliser le maximum d'eau possible"],correct:1,expl:"Une accumulation d'eau incontrôlée devient un risque distinct du feu lui-même."},
    {q:"Que se passe-t-il si une porte coupe-feu est calée ouverte pendant une intervention ?",opts:["Rien de particulier si l'intervention est rapide","La protection de tout le compartiment est annulée, quelle que soit la raison","Cela améliore la circulation de l'air sans risque","Cela accélère l'extinction du feu"],correct:1,expl:"Une porte coupe-feu ouverte annule entièrement la frontière de protection du compartiment."},
    {q:"Pourquoi la ventilation représente-t-elle un risque de propagation ?",opts:["Elle n'a aucun effet sur le feu","Elle peut transporter fumée et chaleur vers des compartiments entiers en quelques minutes","Elle refroidit toujours le compartiment","Elle ne concerne que les feux électriques"],correct:1,expl:"Une ventilation non coupée à temps peut propager fumée et chaleur rapidement."},
    {q:"Pourquoi ne faut-il jamais ouvrir une porte ou une écoutille pour 'juste regarder' pendant un feu contenu ?",opts:["Ce geste n'a aucune conséquence","Cela peut apporter l'oxygène qui relance le feu et faire perdre tout le compartiment","Cela accélère toujours l'extinction","Cela permet uniquement de vérifier sans risque"],correct:1,expl:"Un apport d'oxygène imprévu peut relancer un feu et faire perdre tout le compartiment, pas seulement l'accès."},
    {q:"Qu'est-ce que la protection des expositions ?",opts:["Protéger uniquement l'équipe qui combat le feu","Protéger réservoirs, bouteilles de gaz, tableaux électriques et compartiments voisins qui n'ont pas encore brûlé","Éteindre le feu avec un extincteur portatif","Une étape réservée aux systèmes fixes uniquement"],correct:1,expl:"Protéger ce qui n'a pas encore brûlé est aussi important qu'agir sur ce qui brûle déjà."},
    {q:"Pourquoi une bouteille de gaz chauffée est-elle particulièrement dangereuse ?",opts:["Elle n'a aucun risque particulier","Elle peut se rompre violemment sous l'effet de la chaleur","Elle refroidit automatiquement le compartiment","Elle ne concerne que les feux de classe A"],correct:1,expl:"Une bouteille de gaz exposée à la chaleur peut se rompre violemment, créant un danger distinct du feu initial."},
    {q:"Qu'est-ce qu'un point chaud dans le contexte de la reprise de feu (rekindling) ?",opts:["Un endroit toujours visible et facile à repérer","Une source de chaleur cachée, potentiellement derrière une cloison ou sous un revêtement, invisible longtemps après la disparition des flammes visibles","Un signe que le feu est définitivement éteint","Un phénomène qui ne concerne que l'électricité"],correct:1,expl:"Un point chaud peut rester invisible longtemps après que les flammes visibles ont disparu."},
    {q:"L'absence de flammes visibles est-elle une preuve d'extinction complète ?",opts:["Oui, systématiquement","Non, la surveillance continue jusqu'à confirmation reste indispensable","Oui, mais uniquement pour les feux électriques","Non, il faut immédiatement ventiler pour vérifier"],correct:1,expl:"L'absence de flammes visibles ne garantit jamais l'extinction complète : des braises ou points chauds peuvent subsister."},
    {q:"Dans le cas du Vehicle Carrier Honor, qu'est-ce qui a probablement empêché la propagation du feu ?",opts:["L'utilisation d'un système fixe CO2","Le boundary cooling combiné à la sécurisation complète de la ventilation","L'évacuation immédiate du navire","L'utilisation exclusive d'extincteurs portatifs"],correct:1,expl:"Le refroidissement des limites du compartiment et la ventilation coupée ont contenu le feu au pont d'origine."},
    {q:"Cette leçon aborde-t-elle la réentrée sous ARI après extinction ?",opts:["Oui, en détail","Non, ce sujet a déjà été traité dans la Leçon 4 sur les systèmes fixes","Oui, mais uniquement pour les feux électriques","Non, ce sujet n'est jamais abordé dans MAP"],correct:1,expl:"La réentrée sous ARI a été traitée en Leçon 4 ; cette leçon se concentre sur la protection du navire, pas la réentrée."},
    {q:"Quelle étape du MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cette leçon couvre-t-elle, et que signifie-t-elle ici précisément ?",opts:["Command, protéger les équipes d'intervention","Protect, protéger le navire, les compartiments et les équipements, pas encore les équipes","Fight, attaquer directement le feu avec des moyens lourds","Recover, remettre le navire en service après l'incendie"],correct:1,expl:"Cette leçon couvre Protect au sens de la protection du navire lui-même ; la protection des équipes viendra dans une leçon ultérieure."},
  ],
  en:[
    {q:"What does the principle 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There' mean?",opts:["The fire must always be fully extinguished before acting on anything else","Saving the ship doesn't always depend on total extinction, but on preventing spread","This principle only concerns electrical fires","You should never attempt to contain a fire"],correct:1,expl:"The goal of this lesson is to prevent spread, not necessarily to immediately extinguish the fire."},
    {q:"What is boundary cooling?",opts:["Directly attacking the flames with water","Cooling adjacent bulkheads and decks to prevent spread by conduction","Extinguishing an electrical fire with CO2","Ventilating a compartment after extinction"],correct:1,expl:"Boundary cooling cools the compartment's boundaries, without necessarily attacking the fire itself."},
    {q:"Why is conduction dangerous for neighboring compartments?",opts:["It has no real effect","Heat travels through metal bulkheads without any flame touching them directly","It only concerns electrical fires","It is always immediately visible"],correct:1,expl:"A neighboring compartment can ignite by conduction without ever seeing the original fire."},
    {q:"Should only one side of a compartment on fire be cooled?",opts:["Yes, one side is always enough","No, every exposed adjacent surface must be monitored and cooled if needed","No, a bulkhead should never be cooled","Yes, only the side closest to the crew"],correct:1,expl:"Every surface exposed to the fire must be accounted for, not just one."},
    {q:"Why must the amount of water used for boundary cooling be controlled?",opts:["It isn't important","Excessive water accumulation can threaten the ship's stability","Water has no effect on stability","The maximum possible amount of water should always be used"],correct:1,expl:"Uncontrolled water accumulation becomes a risk distinct from the fire itself."},
    {q:"What happens if a fire door is wedged open during an intervention?",opts:["Nothing in particular if the intervention is quick","The protection of the entire compartment is cancelled, whatever the reason","It improves airflow with no risk","It speeds up extinguishing the fire"],correct:1,expl:"An open fire door entirely cancels the compartment's protective boundary."},
    {q:"Why does ventilation represent a spread risk?",opts:["It has no effect on the fire","It can carry smoke and heat to entire compartments within minutes","It always cools the compartment","It only concerns electrical fires"],correct:1,expl:"Ventilation not shut off in time can rapidly spread smoke and heat."},
    {q:"Why should a door or hatch never be opened to 'just take a look' during a contained fire?",opts:["This action has no consequence","It can bring in oxygen that reignites the fire and loses the entire compartment","It always speeds up extinction","It only allows checking without risk"],correct:1,expl:"An unexpected supply of oxygen can reignite a fire and lose the entire compartment, not just the access."},
    {q:"What is exposure protection?",opts:["Protecting only the team fighting the fire","Protecting tanks, gas cylinders, electrical panels, and neighboring compartments that haven't burned yet","Extinguishing the fire with a portable extinguisher","A step reserved only for fixed systems"],correct:1,expl:"Protecting what hasn't burned yet is as important as acting on what's already burning."},
    {q:"Why is a heated gas cylinder particularly dangerous?",opts:["It has no particular risk","It can rupture violently under the effect of heat","It automatically cools the compartment","It only concerns class A fires"],correct:1,expl:"A gas cylinder exposed to heat can rupture violently, creating a danger distinct from the original fire."},
    {q:"What is a hot spot in the context of rekindling?",opts:["A place that is always visible and easy to spot","A hidden heat source, potentially behind a bulkhead or under a lining, invisible long after visible flames have disappeared","A sign that the fire is definitely out","A phenomenon that only concerns electricity"],correct:1,expl:"A hot spot can remain invisible long after visible flames have disappeared."},
    {q:"Is the absence of visible flames proof of complete extinction?",opts:["Yes, systematically","No, continued monitoring until confirmation remains essential","Yes, but only for electrical fires","No, you must immediately ventilate to check"],correct:1,expl:"The absence of visible flames never guarantees complete extinction: embers or hot spots can remain."},
    {q:"In the Vehicle Carrier Honor case, what likely prevented the fire from spreading?",opts:["The use of a fixed CO2 system","Boundary cooling combined with fully securing ventilation","Immediate evacuation of the ship","The exclusive use of portable extinguishers"],correct:1,expl:"Cooling the compartment's boundaries and securing ventilation contained the fire to the original deck."},
    {q:"Does this lesson cover re-entry under BA after extinction?",opts:["Yes, in detail","No, this topic was already covered in Lesson 4 on fixed systems","Yes, but only for electrical fires","No, this topic is never covered in MAP"],correct:1,expl:"Re-entry under BA was covered in Lesson 4; this lesson focuses on protecting the ship, not re-entry."},
    {q:"Which step of the MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) does this lesson cover, and what does it precisely mean here?",opts:["Command, protecting the intervention teams","Protect, protecting the ship, compartments, and equipment, not yet the teams","Fight, directly attacking the fire with heavy means","Recover, putting the ship back into service after the fire"],correct:1,expl:"This lesson covers Protect in the sense of protecting the ship itself; protecting the teams comes in a later lesson."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There'?",opts:["El fuego siempre debe apagarse por completo antes de actuar sobre cualquier otra cosa","Salvar el buque no siempre depende de la extinción total, sino de impedir la propagación","Este principio solo concierne a los fuegos eléctricos","Nunca se debe intentar contener un fuego"],correct:1,expl:"El objetivo de esta lección es impedir la propagación, no necesariamente apagar de inmediato el fuego."},
    {q:"¿Qué es el boundary cooling?",opts:["Atacar directamente las llamas con agua","Enfriar los mamparos y cubiertas adyacentes para impedir la propagación por conducción","Apagar un fuego eléctrico con CO2","Ventilar un compartimento tras la extinción"],correct:1,expl:"El boundary cooling enfría los límites del compartimento, sin necesariamente atacar el propio fuego."},
    {q:"¿Por qué es peligrosa la conducción para los compartimentos vecinos?",opts:["No tiene ningún efecto real","El calor atraviesa los mamparos metálicos sin que ninguna llama los toque directamente","Solo concierne a los fuegos eléctricos","Siempre es visible de inmediato"],correct:1,expl:"Un compartimento vecino puede incendiarse por conducción sin ver nunca el fuego original."},
    {q:"¿Hay que enfriar solo un lado de un compartimento en llamas?",opts:["Sí, un solo lado siempre basta","No, toda superficie adyacente expuesta debe vigilarse y enfriarse si es necesario","No, nunca hay que enfriar un mamparo","Sí, solo el lado más cercano a la tripulación"],correct:1,expl:"Todas las caras expuestas al foco deben tenerse en cuenta, no solo una."},
    {q:"¿Por qué hay que controlar la cantidad de agua usada para el boundary cooling?",opts:["No es importante","Una acumulación excesiva de agua puede amenazar la estabilidad del buque","El agua no tiene ningún efecto en la estabilidad","Siempre hay que usar la máxima cantidad de agua posible"],correct:1,expl:"Una acumulación de agua incontrolada se convierte en un riesgo distinto del propio fuego."},
    {q:"¿Qué ocurre si una puerta cortafuego se calza abierta durante una intervención?",opts:["Nada en particular si la intervención es rápida","Se anula la protección de todo el compartimento, sea cual sea la razón","Mejora la circulación del aire sin riesgo","Acelera la extinción del fuego"],correct:1,expl:"Una puerta cortafuego abierta anula por completo la frontera de protección del compartimento."},
    {q:"¿Por qué la ventilación representa un riesgo de propagación?",opts:["No tiene ningún efecto sobre el fuego","Puede transportar humo y calor a compartimentos enteros en minutos","Siempre enfría el compartimento","Solo concierne a los fuegos eléctricos"],correct:1,expl:"Una ventilación no cortada a tiempo puede propagar humo y calor rápidamente."},
    {q:"¿Por qué nunca hay que abrir una puerta o escotilla para 'echar un vistazo' durante un fuego contenido?",opts:["Este gesto no tiene ninguna consecuencia","Puede aportar el oxígeno que reaviva el fuego y hacer perder todo el compartimento","Siempre acelera la extinción","Solo permite comprobar sin riesgo"],correct:1,expl:"Un aporte inesperado de oxígeno puede reavivar un fuego y hacer perder todo el compartimento, no solo el acceso."},
    {q:"¿Qué es la protección de exposiciones?",opts:["Proteger solo al equipo que combate el fuego","Proteger tanques, botellas de gas, cuadros eléctricos y compartimentos vecinos que aún no han ardido","Apagar el fuego con un extintor portátil","Una etapa reservada solo a los sistemas fijos"],correct:1,expl:"Proteger lo que aún no ha ardido es tan importante como actuar sobre lo que ya arde."},
    {q:"¿Por qué es especialmente peligrosa una botella de gas calentada?",opts:["No tiene ningún riesgo particular","Puede romperse violentamente por efecto del calor","Enfría automáticamente el compartimento","Solo concierne a los fuegos de clase A"],correct:1,expl:"Una botella de gas expuesta al calor puede romperse violentamente, creando un peligro distinto del fuego inicial."},
    {q:"¿Qué es un punto caliente en el contexto de la reignición (rekindling)?",opts:["Un lugar siempre visible y fácil de detectar","Una fuente de calor oculta, potencialmente detrás de un mamparo o bajo un revestimiento, invisible mucho después de desaparecer las llamas visibles","Una señal de que el fuego está definitivamente apagado","Un fenómeno que solo concierne a la electricidad"],correct:1,expl:"Un punto caliente puede permanecer invisible mucho después de desaparecer las llamas visibles."},
    {q:"¿La ausencia de llamas visibles es prueba de extinción completa?",opts:["Sí, sistemáticamente","No, la vigilancia continua hasta la confirmación sigue siendo indispensable","Sí, pero solo para fuegos eléctricos","No, hay que ventilar de inmediato para comprobar"],correct:1,expl:"La ausencia de llamas visibles nunca garantiza la extinción completa: pueden persistir brasas o puntos calientes."},
    {q:"En el caso del Vehicle Carrier Honor, ¿qué probablemente impidió la propagación del fuego?",opts:["El uso de un sistema fijo de CO2","El boundary cooling combinado con la ventilación totalmente asegurada","La evacuación inmediata del buque","El uso exclusivo de extintores portátiles"],correct:1,expl:"Enfriar los límites del compartimento y asegurar la ventilación contuvo el fuego en la cubierta original."},
    {q:"¿Esta lección aborda la reentrada con ARI tras la extinción?",opts:["Sí, en detalle","No, este tema ya se trató en la Lección 4 sobre sistemas fijos","Sí, pero solo para fuegos eléctricos","No, este tema nunca se trata en MAP"],correct:1,expl:"La reentrada con ARI se trató en la Lección 4; esta lección se centra en proteger el buque, no en la reentrada."},
    {q:"¿Qué etapa del MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) cubre esta lección, y qué significa aquí precisamente?",opts:["Command, proteger a los equipos de intervención","Protect, proteger el buque, los compartimentos y los equipos, todavía no a los equipos","Fight, atacar directamente el fuego con medios pesados","Recover, poner de nuevo el buque en servicio tras el incendio"],correct:1,expl:"Esta lección cubre Protect en el sentido de proteger el buque en sí; la protección de los equipos llegará en una lección posterior."},
  ],
  pt:[
    {q:"O que significa o princípio 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There'?",opts:["O fogo deve sempre ser totalmente apagado antes de agir sobre qualquer outra coisa","Salvar o navio nem sempre depende da extinção total, mas de impedir a propagação","Este princípio só diz respeito a incêndios elétricos","Nunca se deve tentar conter um fogo"],correct:1,expl:"O objetivo desta lição é impedir a propagação, não necessariamente apagar de imediato o fogo."},
    {q:"O que é o boundary cooling?",opts:["Atacar diretamente as chamas com água","Arrefecer os anteparos e conveses adjacentes para impedir a propagação por condução","Apagar um fogo elétrico com CO2","Ventilar um compartimento após a extinção"],correct:1,expl:"O boundary cooling arrefece os limites do compartimento, sem necessariamente atacar o próprio fogo."},
    {q:"Por que a condução é perigosa para os compartimentos vizinhos?",opts:["Não tem qualquer efeito real","O calor atravessa os anteparos metálicos sem que nenhuma chama lhes toque diretamente","Só diz respeito a incêndios elétricos","É sempre imediatamente visível"],correct:1,expl:"Um compartimento vizinho pode incendiar-se por condução sem nunca ver o fogo original."},
    {q:"É preciso arrefecer apenas um lado de um compartimento em chamas?",opts:["Sim, um só lado basta sempre","Não, toda a superfície adjacente exposta deve ser vigiada e arrefecida se necessário","Não, nunca se deve arrefecer um anteparo","Sim, só o lado mais próximo da tripulação"],correct:1,expl:"Todas as faces expostas ao foco devem ser consideradas, não apenas uma."},
    {q:"Por que é preciso controlar a quantidade de água usada para o boundary cooling?",opts:["Não é importante","Uma acumulação excessiva de água pode ameaçar a estabilidade do navio","A água não tem qualquer efeito na estabilidade","Deve-se usar sempre a máxima quantidade de água possível"],correct:1,expl:"Uma acumulação de água descontrolada torna-se um risco distinto do próprio fogo."},
    {q:"O que acontece se uma porta corta-fogo for calçada aberta durante uma intervenção?",opts:["Nada em particular se a intervenção for rápida","A proteção de todo o compartimento é anulada, seja qual for a razão","Melhora a circulação do ar sem risco","Acelera a extinção do fogo"],correct:1,expl:"Uma porta corta-fogo aberta anula inteiramente a fronteira de proteção do compartimento."},
    {q:"Por que a ventilação representa um risco de propagação?",opts:["Não tem qualquer efeito sobre o fogo","Pode transportar fumo e calor para compartimentos inteiros em minutos","Arrefece sempre o compartimento","Só diz respeito a incêndios elétricos"],correct:1,expl:"Uma ventilação não cortada a tempo pode propagar fumo e calor rapidamente."},
    {q:"Por que nunca se deve abrir uma porta ou escotilha para 'só espreitar' durante um fogo contido?",opts:["Este gesto não tem qualquer consequência","Pode trazer o oxigénio que reacende o fogo e fazer perder todo o compartimento","Acelera sempre a extinção","Só permite verificar sem risco"],correct:1,expl:"Um aporte inesperado de oxigénio pode reacender um fogo e fazer perder todo o compartimento, não só o acesso."},
    {q:"O que é a proteção de exposições?",opts:["Proteger apenas a equipa que combate o fogo","Proteger tanques, garrafas de gás, quadros elétricos e compartimentos vizinhos que ainda não arderam","Apagar o fogo com um extintor portátil","Uma etapa reservada apenas aos sistemas fixos"],correct:1,expl:"Proteger o que ainda não ardeu é tão importante como agir sobre o que já arde."},
    {q:"Por que uma garrafa de gás aquecida é particularmente perigosa?",opts:["Não tem qualquer risco particular","Pode romper-se violentamente sob o efeito do calor","Arrefece automaticamente o compartimento","Só diz respeito a incêndios de classe A"],correct:1,expl:"Uma garrafa de gás exposta ao calor pode romper-se violentamente, criando um perigo distinto do fogo inicial."},
    {q:"O que é um ponto quente no contexto da reignição (rekindling)?",opts:["Um lugar sempre visível e fácil de detetar","Uma fonte de calor escondida, potencialmente atrás de um anteparo ou sob um revestimento, invisível muito depois de as chamas visíveis terem desaparecido","Um sinal de que o fogo está definitivamente apagado","Um fenómeno que só diz respeito à eletricidade"],correct:1,expl:"Um ponto quente pode permanecer invisível muito depois de as chamas visíveis terem desaparecido."},
    {q:"A ausência de chamas visíveis é prova de extinção completa?",opts:["Sim, sistematicamente","Não, a vigilância contínua até à confirmação continua a ser indispensável","Sim, mas só para incêndios elétricos","Não, é preciso ventilar de imediato para verificar"],correct:1,expl:"A ausência de chamas visíveis nunca garante a extinção completa: brasas ou pontos quentes podem persistir."},
    {q:"No caso do Vehicle Carrier Honor, o que provavelmente impediu a propagação do fogo?",opts:["O uso de um sistema fixo de CO2","O boundary cooling combinado com a ventilação totalmente assegurada","A evacuação imediata do navio","O uso exclusivo de extintores portáteis"],correct:1,expl:"Arrefecer os limites do compartimento e assegurar a ventilação conteve o fogo no convés original."},
    {q:"Esta lição aborda a reentrada com ARI após a extinção?",opts:["Sim, em detalhe","Não, este tema já foi tratado na Lição 4 sobre sistemas fixos","Sim, mas só para incêndios elétricos","Não, este tema nunca é tratado na MAP"],correct:1,expl:"A reentrada com ARI foi tratada na Lição 4; esta lição concentra-se em proteger o navio, não a reentrada."},
    {q:"Que etapa do MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) esta lição cobre, e o que significa aqui precisamente?",opts:["Command, proteger as equipas de intervenção","Protect, proteger o navio, os compartimentos e os equipamentos, ainda não as equipas","Fight, atacar diretamente o fogo com meios pesados","Recover, colocar o navio novamente em serviço após o incêndio"],correct:1,expl:"Esta lição cobre Protect no sentido de proteger o próprio navio; a proteção das equipas virá numa lição posterior."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There' ?",opts:["Il faut toujours éteindre complètement avant d'agir","Sauver le navire dépend d'empêcher la propagation, pas forcément de l'extinction totale","Cela ne concerne que les feux électriques","Il ne faut jamais contenir un feu"],correct:1,expl:"L'objectif est d'empêcher la propagation, pas nécessairement d'éteindre immédiatement."},
    {q:"Qu'est-ce que le boundary cooling ?",opts:["Attaquer les flammes directement","Refroidir les cloisons adjacentes pour empêcher la propagation par conduction","Éteindre avec un système fixe","Ventiler après extinction"],correct:1,expl:"Le boundary cooling refroidit les limites du compartiment."},
    {q:"Que se passe-t-il si une porte coupe-feu est calée ouverte ?",opts:["Rien de particulier","La protection de tout le compartiment est annulée","Cela accélère l'extinction","Cela améliore la ventilation sans risque"],correct:1,expl:"Une porte ouverte annule la frontière de protection."},
    {q:"L'absence de flammes visibles garantit-elle l'extinction complète ?",opts:["Oui, toujours","Non, la surveillance doit continuer jusqu'à confirmation","Oui, sauf pour l'électricité","Non, il faut ventiler immédiatement"],correct:1,expl:"Des points chauds peuvent subsister invisibles."},
    {q:"Quelle étape du MAP Fire Mindset cette leçon couvre-t-elle, et dans quel sens précis ?",opts:["Command, les équipes","Protect, le navire et les compartiments, pas encore les équipes","Fight, l'attaque directe","Recover, la remise en service"],correct:1,expl:"Cette leçon couvre Protect au sens de la protection du navire lui-même."},
  ],
  en:[
    {q:"What does 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There' mean?",opts:["You must always fully extinguish before acting","Saving the ship depends on preventing spread, not necessarily total extinction","It only concerns electrical fires","You should never contain a fire"],correct:1,expl:"The goal is to prevent spread, not necessarily to immediately extinguish."},
    {q:"What is boundary cooling?",opts:["Directly attacking the flames","Cooling adjacent bulkheads to prevent spread by conduction","Extinguishing with a fixed system","Ventilating after extinction"],correct:1,expl:"Boundary cooling cools the compartment's boundaries."},
    {q:"What happens if a fire door is wedged open?",opts:["Nothing in particular","The protection of the entire compartment is cancelled","It speeds up extinction","It improves ventilation with no risk"],correct:1,expl:"An open door cancels the protective boundary."},
    {q:"Does the absence of visible flames guarantee complete extinction?",opts:["Yes, always","No, monitoring must continue until confirmation","Yes, except for electrical fires","No, you must ventilate immediately"],correct:1,expl:"Hot spots can remain invisible."},
    {q:"Which step of the MAP Fire Mindset does this lesson cover, and in what precise sense?",opts:["Command, the teams","Protect, the ship and compartments, not yet the teams","Fight, direct attack","Recover, returning to service"],correct:1,expl:"This lesson covers Protect in the sense of protecting the ship itself."},
  ],
  es:[
    {q:"¿Qué significa 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There'?",opts:["Siempre hay que apagar por completo antes de actuar","Salvar el buque depende de impedir la propagación, no necesariamente de la extinción total","Solo concierne a los fuegos eléctricos","Nunca hay que contener un fuego"],correct:1,expl:"El objetivo es impedir la propagación, no necesariamente apagar de inmediato."},
    {q:"¿Qué es el boundary cooling?",opts:["Atacar las llamas directamente","Enfriar los mamparos adyacentes para impedir la propagación por conducción","Apagar con un sistema fijo","Ventilar tras la extinción"],correct:1,expl:"El boundary cooling enfría los límites del compartimento."},
    {q:"¿Qué ocurre si una puerta cortafuego se calza abierta?",opts:["Nada en particular","Se anula la protección de todo el compartimento","Acelera la extinción","Mejora la ventilación sin riesgo"],correct:1,expl:"Una puerta abierta anula la frontera de protección."},
    {q:"¿La ausencia de llamas visibles garantiza la extinción completa?",opts:["Sí, siempre","No, la vigilancia debe continuar hasta la confirmación","Sí, salvo para la electricidad","No, hay que ventilar de inmediato"],correct:1,expl:"Pueden persistir puntos calientes invisibles."},
    {q:"¿Qué etapa del MAP Fire Mindset cubre esta lección, y en qué sentido preciso?",opts:["Command, los equipos","Protect, el buque y los compartimentos, todavía no los equipos","Fight, el ataque directo","Recover, la puesta de nuevo en servicio"],correct:1,expl:"Esta lección cubre Protect en el sentido de proteger el buque en sí."},
  ],
  pt:[
    {q:"O que significa 'The Fire Doesn't Need to Be Out. It Just Needs to Stop There'?",opts:["Deve-se sempre apagar por completo antes de agir","Salvar o navio depende de impedir a propagação, não necessariamente da extinção total","Só diz respeito a incêndios elétricos","Nunca se deve conter um fogo"],correct:1,expl:"O objetivo é impedir a propagação, não necessariamente apagar de imediato."},
    {q:"O que é o boundary cooling?",opts:["Atacar as chamas diretamente","Arrefecer os anteparos adjacentes para impedir a propagação por condução","Apagar com um sistema fixo","Ventilar após a extinção"],correct:1,expl:"O boundary cooling arrefece os limites do compartimento."},
    {q:"O que acontece se uma porta corta-fogo for calçada aberta?",opts:["Nada em particular","A proteção de todo o compartimento é anulada","Acelera a extinção","Melhora a ventilação sem risco"],correct:1,expl:"Uma porta aberta anula a fronteira de proteção."},
    {q:"A ausência de chamas visíveis garante a extinção completa?",opts:["Sim, sempre","Não, a vigilância deve continuar até à confirmação","Sim, exceto para a eletricidade","Não, é preciso ventilar de imediato"],correct:1,expl:"Podem persistir pontos quentes invisíveis."},
    {q:"Que etapa do MAP Fire Mindset esta lição cobre, e em que sentido preciso?",opts:["Command, as equipas","Protect, o navio e os compartimentos, ainda não as equipas","Fight, o ataque direto","Recover, o regresso ao serviço"],correct:1,expl:"Esta lição cobre Protect no sentido de proteger o próprio navio."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Face a un feu que tu crois maitrise, penserais-tu naturellement a refroidir les cloisons voisines, ou seulement a attaquer les flammes elles-memes ?",
    en:"Facing a fire you believe is under control, would you naturally think to cool the neighboring bulkheads, or only to attack the flames themselves?",
    es:"Ante un fuego que crees controlado, ¿pensarias de forma natural en enfriar los mamparos vecinos, o solo en atacar las llamas?",
    pt:"Perante um fogo que acreditas estar controlado, pensarias naturalmente em arrefecer os anteparos vizinhos, ou apenas em atacar as chamas?",
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
      badge:"🔥 Safety · Firefighting · Leçon 5/7 · ⭐ Premium",
      title:"Fire Containment & Boundary Protection",
      intro:"Cette leçon ne répète ni les extincteurs (Leçon 3), ni le CO2 (Leçon 4), ni les équipements de protection individuelle. Elle enseigne comment empêcher un incendie de conquérir le reste du navire, indépendamment de son extinction complète.",
      p0:"THE FIRE DOESN'T NEED TO BE OUT. IT JUST NEEDS TO STOP THERE.",s0t:"Le principe qui structure toute la leçon",
      s0:"Sauver un navire ne dépend pas toujours de l'extinction totale du feu. L'objectif est souvent d'empêcher la propagation, de protéger les compartiments voisins, de préserver l'intégrité du navire, et de gagner du temps jusqu'à l'extinction.\n\nCOMMENT LE RECONNAÎTRE ? Un feu contenu dans un compartiment, avec des surfaces adjacentes exposées à la chaleur.\nQUE FAIRE IMMÉDIATEMENT ? Refroidir les limites, maintenir l'intégrité du compartiment, protéger ce qui n'a pas encore brûlé.\nQUELLE ERREUR L'AGGRAVE ? Ouvrir une porte ou une écoutille par simple curiosité, ou négliger un point chaud après disparition des flammes visibles.\nQUAND DEMANDER DE L'AIDE ? Dès que la propagation semble possible malgré les mesures de protection engagées.",
      p1:"BOUNDARY COOLING",s1t:"Refroidir, pas seulement attaquer",
      s1:"La chaleur voyage par conduction à travers les cloisons métalliques. Refroidir les surfaces adjacentes au foyer empêche la propagation et l'effondrement structurel, sans nécessairement attaquer le feu lui-même.",
      p2:"L'INTÉGRITÉ DES COMPARTIMENTS",s2t:"Chaque ouverture est une brèche potentielle",
      s2:"Portes coupe-feu, volets de ventilation, écoutilles : chacun de ces éléments est une frontière. Une porte calée ouverte, même brièvement, annule la protection entière du compartiment.",
      p3:"LA PROTECTION DES EXPOSITIONS",s3t:"Protéger ce qui n'a pas encore brûlé",
      s3:"Réservoirs carburant, bouteilles de gaz, tableaux électriques, compartiments voisins : les identifier et les protéger fait partie intégrante de la lutte contre l'incendie, au même titre que combattre les flammes.",
      p4:"LA REPRISE DE FEU (REKINDLING)",s4t:"Un feu 'éteint' peut toujours repartir",
      s4:"Points chauds, braises sous des matériaux isolants : l'absence de flammes visibles n'est jamais une preuve d'extinction complète. La surveillance continue jusqu'à confirmation reste indispensable.",
      p5:"🎯 EXERCICES PRATIQUES",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 5",
      sumP:["The Fire Doesn't Need to Be Out. It Just Needs to Stop There : l'objectif est d'empêcher la propagation","Boundary cooling : refroidir les cloisons adjacentes empêche la propagation par conduction","Intégrité des compartiments : une seule porte calée ouverte annule toute la protection","Protection des expositions : protéger ce qui n'a pas encore brûlé est aussi important que combattre le feu","Rekindling : l'absence de flammes visibles n'est jamais une preuve d'extinction complète"],
      learnedP:["Le boundary cooling et la conduction de la chaleur","L'intégrité des compartiments et le rôle des portes coupe-feu","La protection des expositions","La reconnaissance du risque de reprise de feu","Le sens précis de Protect dans le MAP Fire Mindset"],
      safetyMsg:"A fire that looks dead can still come back. Protect the boundaries until you are certain it is truly finished.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 5/7 · ⭐ Premium",
      title:"Fire Containment & Boundary Protection",
      intro:"This lesson does not repeat portable extinguishers (Lesson 3), CO2 (Lesson 4), or personal protective equipment. It teaches how to prevent a fire from conquering the rest of the ship, regardless of whether it is fully extinguished.",
      p0:"THE FIRE DOESN'T NEED TO BE OUT. IT JUST NEEDS TO STOP THERE.",s0t:"The principle that structures the whole lesson",
      s0:"Saving a ship doesn't always depend on fully extinguishing the fire. The goal is often to prevent spread, protect neighboring compartments, preserve the ship's integrity, and buy time until extinction.\n\nHOW DO I RECOGNIZE IT? A fire contained within a compartment, with adjacent surfaces exposed to heat.\nWHAT DO I DO IMMEDIATELY? Cool the boundaries, maintain compartment integrity, protect what hasn't burned yet.\nWHAT MISTAKE MAKES IT WORSE? Opening a door or hatch out of mere curiosity, or neglecting a hot spot after visible flames disappear.\nWHEN MUST I ASK FOR HELP? As soon as spread seems possible despite the protective measures already engaged.",
      p1:"BOUNDARY COOLING",s1t:"Cooling, not just attacking",
      s1:"Heat travels by conduction through metal bulkheads. Cooling surfaces adjacent to the fire prevents spread and structural collapse, without necessarily attacking the fire itself.",
      p2:"COMPARTMENT INTEGRITY",s2t:"Every opening is a potential breach",
      s2:"Fire doors, ventilation flaps, hatches: each of these is a boundary. A door wedged open, even briefly, cancels the entire protection of the compartment.",
      p3:"EXPOSURE PROTECTION",s3t:"Protecting what hasn't burned yet",
      s3:"Fuel tanks, gas cylinders, electrical panels, neighboring compartments: identifying and protecting them is an integral part of fighting the fire, just as much as attacking the flames.",
      p4:"REKINDLING",s4t:"A fire that looks 'out' can always come back",
      s4:"Hot spots, embers under insulating materials: the absence of visible flames is never proof of complete extinction. Continued monitoring until confirmation remains essential.",
      p5:"🎯 PRACTICAL EXERCISES",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 5",
      sumP:["The Fire Doesn't Need to Be Out. It Just Needs to Stop There: the goal is to prevent spread","Boundary cooling: cooling adjacent bulkheads prevents spread by conduction","Compartment integrity: a single wedged-open door cancels all protection","Exposure protection: protecting what hasn't burned yet is as important as fighting the fire","Rekindling: the absence of visible flames is never proof of complete extinction"],
      learnedP:["Boundary cooling and heat conduction","Compartment integrity and the role of fire doors","Exposure protection","Recognizing the risk of rekindling","The precise meaning of Protect in the MAP Fire Mindset"],
      safetyMsg:"A fire that looks dead can still come back. Protect the boundaries until you are certain it is truly finished.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 5/7 · ⭐ Premium",
      title:"Fire Containment & Boundary Protection",
      intro:"Esta lección no repite los extintores portátiles (Lección 3), el CO2 (Lección 4), ni el equipo de protección individual. Enseña cómo impedir que un incendio conquiste el resto del buque, independientemente de que se apague por completo.",
      p0:"THE FIRE DOESN'T NEED TO BE OUT. IT JUST NEEDS TO STOP THERE.",s0t:"El principio que estructura toda la lección",
      s0:"Salvar un buque no siempre depende de apagar por completo el fuego. El objetivo suele ser impedir la propagación, proteger los compartimentos vecinos, preservar la integridad del buque, y ganar tiempo hasta la extinción.\n\n¿CÓMO RECONOCERLO? Un fuego contenido dentro de un compartimento, con superficies adyacentes expuestas al calor.\n¿QUÉ HACER DE INMEDIATO? Enfriar los límites, mantener la integridad del compartimento, proteger lo que aún no ha ardido.\n¿QUÉ ERROR LO AGRAVA? Abrir una puerta o escotilla por simple curiosidad, o descuidar un punto caliente tras desaparecer las llamas visibles.\n¿CUÁNDO PEDIR AYUDA? En cuanto la propagación parezca posible pese a las medidas de protección ya activadas.",
      p1:"BOUNDARY COOLING",s1t:"Enfriar, no solo atacar",
      s1:"El calor viaja por conducción a través de los mamparos metálicos. Enfriar las superficies adyacentes al foco impide la propagación y el colapso estructural, sin necesariamente atacar el propio fuego.",
      p2:"LA INTEGRIDAD DE LOS COMPARTIMENTOS",s2t:"Cada abertura es una brecha potencial",
      s2:"Puertas cortafuego, compuertas de ventilación, escotillas: cada uno de estos elementos es una frontera. Una puerta calzada abierta, aunque sea brevemente, anula toda la protección del compartimento.",
      p3:"LA PROTECCIÓN DE EXPOSICIONES",s3t:"Proteger lo que aún no ha ardido",
      s3:"Tanques de combustible, botellas de gas, cuadros eléctricos, compartimentos vecinos: identificarlos y protegerlos forma parte integral de la lucha contra el incendio, tanto como combatir las llamas.",
      p4:"LA REIGNICIÓN (REKINDLING)",s4t:"Un fuego 'apagado' siempre puede reaparecer",
      s4:"Puntos calientes, brasas bajo materiales aislantes: la ausencia de llamas visibles nunca es prueba de extinción completa. La vigilancia continua hasta la confirmación sigue siendo indispensable.",
      p5:"🎯 EJERCICIOS PRÁCTICOS",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 5",
      sumP:["The Fire Doesn't Need to Be Out. It Just Needs to Stop There: el objetivo es impedir la propagación","Boundary cooling: enfriar los mamparos adyacentes impide la propagación por conducción","Integridad de los compartimentos: una sola puerta calzada abierta anula toda la protección","Protección de exposiciones: proteger lo que aún no ha ardido es tan importante como combatir el fuego","Rekindling: la ausencia de llamas visibles nunca es prueba de extinción completa"],
      learnedP:["El boundary cooling y la conducción del calor","La integridad de los compartimentos y el papel de las puertas cortafuego","La protección de exposiciones","El reconocimiento del riesgo de reignición","El sentido preciso de Protect en el MAP Fire Mindset"],
      safetyMsg:"A fire that looks dead can still come back. Protect the boundaries until you are certain it is truly finished.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 5/7 · ⭐ Premium",
      title:"Fire Containment & Boundary Protection",
      intro:"Esta lição não repete os extintores portáteis (Lição 3), o CO2 (Lição 4), nem o equipamento de proteção individual. Ensina como impedir que um incêndio conquiste o resto do navio, independentemente de ser totalmente apagado.",
      p0:"THE FIRE DOESN'T NEED TO BE OUT. IT JUST NEEDS TO STOP THERE.",s0t:"O princípio que estrutura toda a lição",
      s0:"Salvar um navio nem sempre depende de apagar totalmente o fogo. O objetivo é muitas vezes impedir a propagação, proteger os compartimentos vizinhos, preservar a integridade do navio, e ganhar tempo até à extinção.\n\nCOMO RECONHECER? Um fogo contido dentro de um compartimento, com superfícies adjacentes expostas ao calor.\nO QUE FAZER IMEDIATAMENTE? Arrefecer os limites, manter a integridade do compartimento, proteger o que ainda não ardeu.\nQUE ERRO O AGRAVA? Abrir uma porta ou escotilha por simples curiosidade, ou negligenciar um ponto quente depois de as chamas visíveis desaparecerem.\nQUANDO PEDIR AJUDA? Assim que a propagação parecer possível apesar das medidas de proteção já ativadas.",
      p1:"BOUNDARY COOLING",s1t:"Arrefecer, não apenas atacar",
      s1:"O calor viaja por condução através dos anteparos metálicos. Arrefecer as superfícies adjacentes ao foco impede a propagação e o colapso estrutural, sem necessariamente atacar o próprio fogo.",
      p2:"A INTEGRIDADE DOS COMPARTIMENTOS",s2t:"Cada abertura é uma brecha potencial",
      s2:"Portas corta-fogo, comportas de ventilação, escotilhas: cada um destes elementos é uma fronteira. Uma porta calçada aberta, mesmo que brevemente, anula toda a proteção do compartimento.",
      p3:"A PROTEÇÃO DE EXPOSIÇÕES",s3t:"Proteger o que ainda não ardeu",
      s3:"Tanques de combustível, garrafas de gás, quadros elétricos, compartimentos vizinhos: identificá-los e protegê-los faz parte integral da luta contra o incêndio, tanto quanto combater as chamas.",
      p4:"A REIGNIÇÃO (REKINDLING)",s4t:"Um fogo 'apagado' pode sempre reaparecer",
      s4:"Pontos quentes, brasas sob materiais isolantes: a ausência de chamas visíveis nunca é prova de extinção completa. A vigilância contínua até à confirmação continua a ser indispensável.",
      p5:"🎯 EXERCÍCIOS PRÁTICOS",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 5",
      sumP:["The Fire Doesn't Need to Be Out. It Just Needs to Stop There: o objetivo é impedir a propagação","Boundary cooling: arrefecer os anteparos adjacentes impede a propagação por condução","Integridade dos compartimentos: uma única porta calçada aberta anula toda a proteção","Proteção de exposições: proteger o que ainda não ardeu é tão importante como combater o fogo","Rekindling: a ausência de chamas visíveis nunca é prova de extinção completa"],
      learnedP:["O boundary cooling e a condução do calor","A integridade dos compartimentos e o papel das portas corta-fogo","A proteção de exposições","O reconhecimento do risco de reignição","O sentido preciso de Protect no MAP Fire Mindset"],
      safetyMsg:"A fire that looks dead can still come back. Protect the boundaries until you are certain it is truly finished.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L5({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 5/7":lang==="en"?"Lesson 5/7":lang==="es"?"Lección 5/7":"Lição 5/7"}</div>
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

            <SL icon="🛡️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="💧" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💧</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💧 {lang==="fr"?"BOUNDARY COOLING - INTERACTIF":lang==="en"?"BOUNDARY COOLING - INTERACTIVE":lang==="es"?"BOUNDARY COOLING - INTERACTIVO":"BOUNDARY COOLING - INTERATIVO"}</div><BoundaryCoolingSVG lang={lang}/></Card>

            <SL icon="🚪" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚪</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🚪 {lang==="fr"?"INTÉGRITÉ DES COMPARTIMENTS - INTERACTIF":lang==="en"?"COMPARTMENT INTEGRITY - INTERACTIVE":lang==="es"?"INTEGRIDAD DE COMPARTIMENTOS - INTERACTIVO":"INTEGRIDADE DOS COMPARTIMENTOS - INTERATIVO"}</div><CompartmentIntegritySVG lang={lang}/></Card>

            <SL icon="🛢️" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🛢️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🛢️ {lang==="fr"?"PROTECTION DES EXPOSITIONS - INTERACTIF":lang==="en"?"EXPOSURE PROTECTION - INTERACTIVE":lang==="es"?"PROTECCIÓN DE EXPOSICIONES - INTERACTIVO":"PROTEÇÃO DE EXPOSIÇÕES - INTERATIVO"}</div><ExposureProtectionSVG lang={lang}/></Card>

            <SL icon="♻️" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>♻️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>♻️ {lang==="fr"?"REPRISE DE FEU - INTERACTIF":lang==="en"?"REKINDLING - INTERACTIVE":lang==="es"?"REIGNICIÓN - INTERACTIVO":"REIGNIÇÃO - INTERATIVO"}</div><RekindlingSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.green}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p7} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p8} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Confinement & Protection":lang==="en"?"Final Quiz - Containment & Protection":lang==="es"?"Quiz Final - Confinamiento y Protección":"Quiz Final - Contenção e Proteção"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 5/7":"questions · Lesson 5/7"}</div>
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

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.red},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(192,57,43,0.4)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 6 - ARI & PROTECTION INDIVIDUELLE →":lang==="en"?"LESSON 6 - BREATHING APPARATUS & PPE →":lang==="es"?"LECCIÓN 6 - ARI Y EPP →":"LIÇÃO 6 - ARI E EPI →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
