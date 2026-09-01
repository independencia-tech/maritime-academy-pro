import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// UNIVERSAL LOGIC - RECOGNIZE > REPORT > PROTECT LIFE > PREVENT ESCALATION > CALL FOR ASSISTANCE
function UniversalLogicSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, color:C.blue2, label:{fr:"Reconnaître",en:"Recognize",es:"Reconocer",pt:"Reconhecer"}, desc:{fr:"Reconnaître qu'une situation sort du cadre normal, quelle que soit la nature de l'urgence.",en:"Recognizing that a situation is outside the normal frame, whatever the nature of the emergency.",es:"Reconocer que una situación sale del marco normal, sea cual sea la naturaleza de la urgencia.",pt:"Reconhecer que uma situação sai do quadro normal, seja qual for a natureza da urgência."} },
    { id:2, color:C.orange, label:{fr:"Alerter",en:"Report",es:"Alertar",pt:"Alertar"}, desc:{fr:"Alerter immédiatement la passerelle ou le poste de commandement, sans attendre d'avoir tout compris.",en:"Immediately alerting the bridge or command post, without waiting to fully understand everything.",es:"Alertar de inmediato al puente o al puesto de mando, sin esperar a entenderlo todo.",pt:"Alertar de imediato o passadiço ou o posto de comando, sem esperar por compreender tudo."} },
    { id:3, color:C.red, label:{fr:"Protéger les Vies",en:"Protect Life",es:"Proteger Vidas",pt:"Proteger Vidas"}, desc:{fr:"La sécurité des personnes prime toujours sur celle du navire, de la cargaison ou de l'environnement.",en:"The safety of people always comes before the ship, the cargo, or the environment.",es:"La seguridad de las personas siempre prima sobre la del buque, la carga o el medio ambiente.",pt:"A segurança das pessoas prevalece sempre sobre a do navio, da carga ou do ambiente."} },
    { id:4, color:C.gold2, label:{fr:"Prévenir l'Aggravation",en:"Prevent Escalation",es:"Prevenir el Agravamiento",pt:"Prevenir o Agravamento"}, desc:{fr:"Agir pour empêcher que la situation ne s'aggrave, sans chercher à la résoudre complètement seul.",en:"Acting to prevent the situation from worsening, without trying to fully solve it alone.",es:"Actuar para impedir que la situación empeore, sin intentar resolverla por completo solo.",pt:"Agir para impedir que a situação piore, sem tentar resolvê-la completamente sozinho."} },
    { id:5, color:C.green, label:{fr:"Appeler à l'Assistance",en:"Call for Assistance",es:"Solicitar Asistencia",pt:"Solicitar Assistência"}, desc:{fr:"Mobiliser les équipes spécialisées ou les procédures complètes qui prendront le relais.",en:"Mobilizing the specialized teams or the complete procedures that will take over.",es:"Movilizar a los equipos especializados o los procedimientos completos que tomarán el relevo.",pt:"Mobilizar as equipas especializadas ou os procedimentos completos que assumirão o seguimento."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:s.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#fff"}}>{idx+1}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1,fontFamily:"'Cinzel',serif"}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<steps.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Cette logique reste la même quelle que soit la nature de l'urgence rencontrée.":lang==="en"?"This logic stays the same whatever the nature of the emergency encountered.":lang==="es"?"Esta lógica se mantiene igual sea cual sea la naturaleza de la urgencia encontrada.":"Esta lógica mantém-se igual seja qual for a natureza da urgência encontrada."}</div>
    </div>
  );
}

// DATA - 9 EMERGENCIES
const EMERGENCIES = {
  fr:[
    { id:"fire", icon:"🔥", title:"Incendie", def:"Départ de feu ou apparition de fumée à bord.",
      danger:"Un feu non maîtrisé rapidement peut se propager à d'autres compartiments en quelques minutes seulement.",
      action:"Donner l'alerte immédiatement. Isoler la zone (portes, ventilation) si possible sans se mettre en danger. Ne jamais tenter seul un feu qui dépasse un extincteur portatif.",
      mistake:"Erreur fréquente : retarder l'alerte pour 'voir si ça passe'. Ne jamais rouvrir une porte ou une cloison chaude pour vérifier ce qui se passe derrière.",
      seeAlso:"Approfondi intégralement dans S4 - Firefighting." },
    { id:"flood", icon:"🌊", title:"Voie d'eau", def:"Entrée d'eau non contrôlée dans la coque ou un compartiment.",
      danger:"Peut évoluer vers une perte de flottabilité ou de stabilité si le débit dépasse la capacité de pompage disponible.",
      action:"Localiser la source, alerter immédiatement, actionner les pompes disponibles. Tenter un colmatage temporaire (épontille bois ou métal) uniquement si la brèche est accessible et de petite taille.",
      mistake:"Erreur fréquente : sous-estimer une petite voie d'eau qui semble stable. Ne jamais s'isoler seul dans le compartiment sans en informer personne au préalable.",
      seeAlso:"Ce sujet sera approfondi dans un futur module du département Deck." },
    { id:"list", icon:"⚓", title:"Gîte anormale", def:"Inclinaison latérale du navire ne correspondant pas aux conditions normales.",
      danger:"Peut indiquer un problème de ballast, une cargaison déplacée, ou une voie d'eau, avec un risque d'aggravation rapide.",
      action:"Informer immédiatement la passerelle. Surveiller l'évolution de l'angle. Rechercher la cause probable (ballast, cargaison, voie d'eau) sans attendre.",
      mistake:"Erreur fréquente : attendre pour voir si la gîte se stabilise seule. Ne jamais assumer une stabilisation automatique sans vérification active.",
      seeAlso:"Ce sujet sera approfondi dans un futur module des départements Deck et Engine." },
    { id:"mob", icon:"👤", title:"Homme à la mer (MOB)", def:"Une personne tombe ou se retrouve à l'eau involontairement.",
      danger:"L'hypothermie et la perte du repère visuel réduisent très rapidement les chances de sauvetage.",
      action:"Crier 'Homme à la mer'. Lancer une bouée. Garder un contact visuel constant en pointant la victime du doigt sans interruption. Alerter la passerelle immédiatement.",
      mistake:"Erreur fréquente : quitter des yeux la victime, même quelques secondes, pour aller chercher de l'aide. Ne jamais interrompre le contact visuel avant qu'un relais ne soit assuré.",
      seeAlso:"Approfondi dans le module Seamanship." },
    { id:"blackout", icon:"⚡", title:"Black-out", def:"Perte totale de l'alimentation électrique du navire.",
      danger:"Perte simultanée de la propulsion, de la gouverne, et de nombreux systèmes de sécurité essentiels.",
      action:"Alerter immédiatement. Surveiller la dérive du navire. Préparer le mouillage si la zone le permet. Suivre la position par tout moyen disponible.",
      mistake:"Erreur fréquente : présumer qu'un redémarrage automatique se produira sans surveillance active. Ne jamais cesser de suivre la position pendant la panne.",
      seeAlso:"Ce sujet sera approfondi dans un futur module du département Engine." },
    { id:"steering", icon:"🧭", title:"Panne de barre", def:"Perte de contrôle de la direction du navire.",
      danger:"Le navire ne peut plus être gouverné, avec un risque de collision ou d'échouement selon la zone de navigation.",
      action:"Informer immédiatement la passerelle. Basculer sur le système de secours si disponible. Réduire la vitesse si nécessaire pour limiter les conséquences.",
      mistake:"Erreur fréquente : continuer à pleine vitesse en espérant que le problème se résolve seul. Ne jamais retarder l'information à la passerelle.",
      seeAlso:"Ce sujet sera approfondi dans un futur module du département Deck." },
    { id:"engine", icon:"⚙️", title:"Avarie moteur", def:"Perte partielle ou totale de la propulsion.",
      danger:"Risque de dérive incontrôlée, particulièrement dangereux près de la côte ou dans un trafic dense.",
      action:"Alerter la passerelle. Surveiller la dérive et la position. Préparer une demande d'assistance si la propulsion ne peut être rétablie rapidement.",
      mistake:"Erreur fréquente : tarder à informer la passerelle en espérant réparer discrètement. Ne jamais retarder l'alerte pour tenter une réparation seul sans en informer personne.",
      seeAlso:"Ce sujet sera approfondi dans un futur module du département Engine." },
    { id:"anchor", icon:"⚓", title:"Ancre qui chasse", def:"L'ancre ne tient plus le fond et le navire dérive au mouillage.",
      danger:"Peut conduire à un échouement, une collision avec un autre navire au mouillage, ou une sortie de la zone autorisée.",
      action:"Informer immédiatement la passerelle. Surveiller la position par rapport à des références fixes. Préparer la machine à répondre rapidement si nécessaire.",
      mistake:"Erreur fréquente : attendre de confirmer visuellement un déplacement important avant d'alerter. Ne jamais retarder l'alerte en cas de doute sur le mouillage.",
      seeAlso:"Ce sujet sera approfondi dans un futur module du département Deck." },
    { id:"pollution", icon:"🌍", title:"Pollution", def:"Rejet accidentel d'hydrocarbures ou de substance polluante dans l'environnement marin.",
      danger:"Responsabilité légale immédiate et impact environnemental potentiellement grave et durable.",
      action:"Arrêter la source si possible sans se mettre en danger. Contenir ce qui peut l'être. Alerter immédiatement, quelle que soit l'ampleur apparente.",
      mistake:"Erreur fréquente : minimiser un incident mineur en espérant qu'il passe inaperçu. Ne jamais dissimuler un incident de pollution, même mineur.",
      seeAlso:"Ce sujet sera approfondi dans un futur module de Specialized Operations." },
  ],
  en:[
    { id:"fire", icon:"🔥", title:"Fire", def:"A fire starting or smoke appearing on board.",
      danger:"A fire not brought under control quickly can spread to other compartments within just a few minutes.",
      action:"Raise the alarm immediately. Isolate the area (doors, ventilation) if possible without endangering yourself. Never attempt alone a fire beyond a portable extinguisher's capability.",
      mistake:"Common mistake: delaying the alarm to 'see if it passes'. Never reopen a hot door or bulkhead to check what's behind it.",
      seeAlso:"Covered in full detail in S4 - Firefighting." },
    { id:"flood", icon:"🌊", title:"Flooding", def:"Uncontrolled water ingress into the hull or a compartment.",
      danger:"Can evolve into a loss of buoyancy or stability if the inflow exceeds available pumping capacity.",
      action:"Locate the source, alert immediately, activate available pumps. Attempt temporary patching (wood or metal shoring) only if the breach is accessible and small.",
      mistake:"Common mistake: underestimating a small leak that seems stable. Never isolate yourself alone in the compartment without informing anyone beforehand.",
      seeAlso:"This topic will be covered in depth in a future Deck department module." },
    { id:"list", icon:"⚓", title:"Abnormal list", def:"A sideways tilt of the ship that doesn't match normal conditions.",
      danger:"May indicate a ballast problem, shifted cargo, or flooding, with a risk of rapid worsening.",
      action:"Inform the bridge immediately. Monitor how the angle evolves. Look for the probable cause (ballast, cargo, flooding) without delay.",
      mistake:"Common mistake: waiting to see if the list stabilizes on its own. Never assume automatic stabilization without active verification.",
      seeAlso:"This topic will be covered in depth in future Deck and Engine department modules." },
    { id:"mob", icon:"👤", title:"Man Overboard (MOB)", def:"A person falls or ends up in the water unintentionally.",
      danger:"Hypothermia and loss of visual reference very quickly reduce the chances of rescue.",
      action:"Shout 'Man overboard'. Throw a lifebuoy. Keep constant visual contact by pointing at the victim without interruption. Alert the bridge immediately.",
      mistake:"Common mistake: taking your eyes off the victim, even for a few seconds, to go get help. Never break visual contact before a relay is ensured.",
      seeAlso:"Covered in the Seamanship module." },
    { id:"blackout", icon:"⚡", title:"Blackout", def:"Total loss of the ship's electrical power.",
      danger:"Simultaneous loss of propulsion, steering, and many essential safety systems.",
      action:"Alert immediately. Monitor the ship's drift. Prepare to anchor if the zone allows it. Track position by any means available.",
      mistake:"Common mistake: assuming an automatic restart will happen without active monitoring. Never stop tracking position during the outage.",
      seeAlso:"This topic will be covered in depth in a future Engine department module." },
    { id:"steering", icon:"🧭", title:"Steering failure", def:"Loss of control over the ship's direction.",
      danger:"The ship can no longer be steered, with a risk of collision or grounding depending on the navigation area.",
      action:"Inform the bridge immediately. Switch to the backup system if available. Reduce speed if necessary to limit consequences.",
      mistake:"Common mistake: continuing at full speed hoping the problem resolves itself. Never delay informing the bridge.",
      seeAlso:"This topic will be covered in depth in a future Deck department module." },
    { id:"engine", icon:"⚙️", title:"Engine failure", def:"Partial or total loss of propulsion.",
      danger:"Risk of uncontrolled drift, particularly dangerous near the coast or in heavy traffic.",
      action:"Alert the bridge. Monitor drift and position. Prepare a request for assistance if propulsion cannot be restored quickly.",
      mistake:"Common mistake: delaying informing the bridge while hoping to quietly fix it. Never delay the alert to attempt a repair alone without informing anyone.",
      seeAlso:"This topic will be covered in depth in a future Engine department module." },
    { id:"anchor", icon:"⚓", title:"Dragging anchor", def:"The anchor no longer holds the seabed and the ship drifts at anchorage.",
      danger:"May lead to grounding, collision with another anchored vessel, or drifting out of the authorized zone.",
      action:"Inform the bridge immediately. Monitor position relative to fixed references. Prepare the engine to respond quickly if necessary.",
      mistake:"Common mistake: waiting to visually confirm significant movement before alerting. Never delay the alert in case of doubt about the anchorage.",
      seeAlso:"This topic will be covered in depth in a future Deck department module." },
    { id:"pollution", icon:"🌍", title:"Pollution", def:"Accidental discharge of oil or a polluting substance into the marine environment.",
      danger:"Immediate legal liability and potentially serious, lasting environmental impact.",
      action:"Stop the source if possible without endangering yourself. Contain what can be contained. Alert immediately, whatever the apparent scale.",
      mistake:"Common mistake: minimizing a minor incident hoping it goes unnoticed. Never conceal a pollution incident, even a minor one.",
      seeAlso:"This topic will be covered in depth in a future Specialized Operations module." },
  ],
  es:[
    { id:"fire", icon:"🔥", title:"Incendio", def:"Inicio de un fuego o aparición de humo a bordo.",
      danger:"Un fuego no controlado rápidamente puede propagarse a otros compartimentos en solo unos minutos.",
      action:"Dar la alarma de inmediato. Aislar la zona (puertas, ventilación) si es posible sin ponerse en peligro. Nunca intentar solo un fuego que supere un extintor portátil.",
      mistake:"Error frecuente: retrasar la alarma para 'ver si pasa'. Nunca volver a abrir una puerta o mamparo caliente para comprobar qué hay detrás.",
      seeAlso:"Cubierto en detalle completo en S4 - Firefighting." },
    { id:"flood", icon:"🌊", title:"Vía de agua", def:"Entrada de agua no controlada en el casco o un compartimento.",
      danger:"Puede evolucionar hacia una pérdida de flotabilidad o estabilidad si el caudal supera la capacidad de achique disponible.",
      action:"Localizar la fuente, alertar de inmediato, activar las bombas disponibles. Intentar un taponamiento temporal (puntal de madera o metal) solo si la brecha es accesible y pequeña.",
      mistake:"Error frecuente: subestimar una pequeña vía de agua que parece estable. Nunca aislarse solo en el compartimento sin informar a nadie antes.",
      seeAlso:"Este tema se profundizará en un futuro módulo del departamento Deck." },
    { id:"list", icon:"⚓", title:"Escora anormal", def:"Inclinación lateral del buque que no corresponde a las condiciones normales.",
      danger:"Puede indicar un problema de lastre, carga desplazada, o una vía de agua, con riesgo de agravamiento rápido.",
      action:"Informar de inmediato al puente. Vigilar la evolución del ángulo. Buscar la causa probable (lastre, carga, vía de agua) sin esperar.",
      mistake:"Error frecuente: esperar a ver si la escora se estabiliza sola. Nunca asumir una estabilización automática sin verificación activa.",
      seeAlso:"Este tema se profundizará en futuros módulos de los departamentos Deck y Engine." },
    { id:"mob", icon:"👤", title:"Hombre al agua (MOB)", def:"Una persona cae o acaba en el agua de forma involuntaria.",
      danger:"La hipotermia y la pérdida de la referencia visual reducen muy rápidamente las posibilidades de rescate.",
      action:"Gritar 'Hombre al agua'. Lanzar un salvavidas. Mantener contacto visual constante señalando a la víctima sin interrupción. Alertar al puente de inmediato.",
      mistake:"Error frecuente: quitar la vista de la víctima, aunque sea unos segundos, para ir a buscar ayuda. Nunca interrumpir el contacto visual antes de asegurar un relevo.",
      seeAlso:"Cubierto en el módulo Seamanship." },
    { id:"blackout", icon:"⚡", title:"Apagón", def:"Pérdida total de la alimentación eléctrica del buque.",
      danger:"Pérdida simultánea de la propulsión, el gobierno, y numerosos sistemas de seguridad esenciales.",
      action:"Alertar de inmediato. Vigilar la deriva del buque. Preparar el fondeo si la zona lo permite. Seguir la posición por cualquier medio disponible.",
      mistake:"Error frecuente: suponer que se producirá un reinicio automático sin vigilancia activa. Nunca dejar de seguir la posición durante la avería.",
      seeAlso:"Este tema se profundizará en un futuro módulo del departamento Engine." },
    { id:"steering", icon:"🧭", title:"Avería del gobierno", def:"Pérdida de control de la dirección del buque.",
      danger:"El buque ya no puede gobernarse, con riesgo de colisión o varada según la zona de navegación.",
      action:"Informar de inmediato al puente. Pasar al sistema de emergencia si está disponible. Reducir la velocidad si es necesario para limitar las consecuencias.",
      mistake:"Error frecuente: continuar a toda velocidad esperando que el problema se resuelva solo. Nunca retrasar la información al puente.",
      seeAlso:"Este tema se profundizará en un futuro módulo del departamento Deck." },
    { id:"engine", icon:"⚙️", title:"Avería del motor", def:"Pérdida parcial o total de la propulsión.",
      danger:"Riesgo de deriva incontrolada, especialmente peligroso cerca de la costa o en tráfico denso.",
      action:"Alertar al puente. Vigilar la deriva y la posición. Preparar una solicitud de asistencia si la propulsión no puede restablecerse rápidamente.",
      mistake:"Error frecuente: tardar en informar al puente esperando repararlo discretamente. Nunca retrasar la alerta para intentar una reparación solo sin informar a nadie.",
      seeAlso:"Este tema se profundizará en un futuro módulo del departamento Engine." },
    { id:"anchor", icon:"⚓", title:"Ancla garreando", def:"El ancla ya no agarra el fondo y el buque deriva en el fondeadero.",
      danger:"Puede provocar una varada, una colisión con otro buque fondeado, o una salida de la zona autorizada.",
      action:"Informar de inmediato al puente. Vigilar la posición respecto a referencias fijas. Preparar la máquina para responder rápidamente si es necesario.",
      mistake:"Error frecuente: esperar a confirmar visualmente un desplazamiento importante antes de alertar. Nunca retrasar la alerta ante la duda sobre el fondeo.",
      seeAlso:"Este tema se profundizará en un futuro módulo del departamento Deck." },
    { id:"pollution", icon:"🌍", title:"Contaminación", def:"Vertido accidental de hidrocarburos o de una sustancia contaminante al medio marino.",
      danger:"Responsabilidad legal inmediata e impacto ambiental potencialmente grave y duradero.",
      action:"Detener la fuente si es posible sin ponerse en peligro. Contener lo que se pueda. Alertar de inmediato, sea cual sea la magnitud aparente.",
      mistake:"Error frecuente: minimizar un incidente menor esperando que pase desapercibido. Nunca ocultar un incidente de contaminación, aunque sea menor.",
      seeAlso:"Este tema se profundizará en un futuro módulo de Specialized Operations." },
  ],
  pt:[
    { id:"fire", icon:"🔥", title:"Incêndio", def:"Início de um fogo ou aparecimento de fumo a bordo.",
      danger:"Um fogo não controlado rapidamente pode propagar-se a outros compartimentos em apenas alguns minutos.",
      action:"Dar o alarme de imediato. Isolar a zona (portas, ventilação) se possível sem se colocar em perigo. Nunca tentar sozinho um fogo que ultrapasse um extintor portátil.",
      mistake:"Erro frequente: atrasar o alarme para 'ver se passa'. Nunca reabrir uma porta ou anteparo quente para verificar o que está por trás.",
      seeAlso:"Coberto em detalhe completo em S4 - Firefighting." },
    { id:"flood", icon:"🌊", title:"Via de água", def:"Entrada de água não controlada no casco ou num compartimento.",
      danger:"Pode evoluir para uma perda de flutuabilidade ou estabilidade se o caudal ultrapassar a capacidade de esgoto disponível.",
      action:"Localizar a fonte, alertar de imediato, acionar as bombas disponíveis. Tentar uma vedação temporária (escora de madeira ou metal) só se a brecha for acessível e pequena.",
      mistake:"Erro frequente: subestimar uma pequena via de água que parece estável. Nunca isolar-se sozinho no compartimento sem informar ninguém antes.",
      seeAlso:"Este tema será aprofundado num futuro módulo do departamento Deck." },
    { id:"list", icon:"⚓", title:"Adornamento anormal", def:"Inclinação lateral do navio que não corresponde às condições normais.",
      danger:"Pode indicar um problema de lastro, carga deslocada, ou uma via de água, com risco de agravamento rápido.",
      action:"Informar de imediato o passadiço. Vigiar a evolução do ângulo. Procurar a causa provável (lastro, carga, via de água) sem esperar.",
      mistake:"Erro frequente: esperar para ver se o adornamento se estabiliza sozinho. Nunca assumir uma estabilização automática sem verificação ativa.",
      seeAlso:"Este tema será aprofundado em futuros módulos dos departamentos Deck e Engine." },
    { id:"mob", icon:"👤", title:"Homem ao mar (MOB)", def:"Uma pessoa cai ou fica na água involuntariamente.",
      danger:"A hipotermia e a perda da referência visual reduzem muito rapidamente as hipóteses de resgate.",
      action:"Gritar 'Homem ao mar'. Lançar uma boia. Manter contacto visual constante apontando para a vítima sem interrupção. Alertar o passadiço de imediato.",
      mistake:"Erro frequente: tirar os olhos da vítima, mesmo por alguns segundos, para ir buscar ajuda. Nunca interromper o contacto visual antes de garantir um revezamento.",
      seeAlso:"Coberto no módulo Seamanship." },
    { id:"blackout", icon:"⚡", title:"Black-out", def:"Perda total da alimentação elétrica do navio.",
      danger:"Perda simultânea da propulsão, do governo, e de numerosos sistemas de segurança essenciais.",
      action:"Alertar de imediato. Vigiar a deriva do navio. Preparar o fundeio se a zona o permitir. Seguir a posição por qualquer meio disponível.",
      mistake:"Erro frequente: presumir que ocorrerá um reinício automático sem vigilância ativa. Nunca parar de seguir a posição durante a avaria.",
      seeAlso:"Este tema será aprofundado num futuro módulo do departamento Engine." },
    { id:"steering", icon:"🧭", title:"Avaria do leme", def:"Perda de controlo da direção do navio.",
      danger:"O navio já não pode ser governado, com risco de colisão ou encalhe consoante a zona de navegação.",
      action:"Informar de imediato o passadiço. Mudar para o sistema de emergência se disponível. Reduzir a velocidade se necessário para limitar as consequências.",
      mistake:"Erro frequente: continuar a toda a velocidade à espera que o problema se resolva sozinho. Nunca atrasar a informação ao passadiço.",
      seeAlso:"Este tema será aprofundado num futuro módulo do departamento Deck." },
    { id:"engine", icon:"⚙️", title:"Avaria do motor", def:"Perda parcial ou total da propulsão.",
      danger:"Risco de deriva incontrolada, particularmente perigoso perto da costa ou em tráfego denso.",
      action:"Alertar o passadiço. Vigiar a deriva e a posição. Preparar um pedido de assistência se a propulsão não puder ser restabelecida rapidamente.",
      mistake:"Erro frequente: atrasar a informação ao passadiço à espera de reparar discretamente. Nunca atrasar o alerta para tentar uma reparação sozinho sem informar ninguém.",
      seeAlso:"Este tema será aprofundado num futuro módulo do departamento Engine." },
    { id:"anchor", icon:"⚓", title:"Âncora a garrar", def:"A âncora já não agarra o fundo e o navio deriva no fundeadouro.",
      danger:"Pode levar a um encalhe, uma colisão com outro navio fundeado, ou uma saída da zona autorizada.",
      action:"Informar de imediato o passadiço. Vigiar a posição em relação a referências fixas. Preparar a máquina para responder rapidamente se necessário.",
      mistake:"Erro frequente: esperar para confirmar visualmente um deslocamento importante antes de alertar. Nunca atrasar o alerta em caso de dúvida sobre o fundeio.",
      seeAlso:"Este tema será aprofundado num futuro módulo do departamento Deck." },
    { id:"pollution", icon:"🌍", title:"Poluição", def:"Descarga acidental de hidrocarbonetos ou de substância poluente no ambiente marinho.",
      danger:"Responsabilidade legal imediata e impacto ambiental potencialmente grave e duradouro.",
      action:"Parar a fonte se possível sem se colocar em perigo. Conter o que puder ser contido. Alertar de imediato, seja qual for a dimensão aparente.",
      mistake:"Erro frequente: minimizar um incidente menor esperando que passe despercebido. Nunca esconder um incidente de poluição, mesmo que menor.",
      seeAlso:"Este tema será aprofundado num futuro módulo de Specialized Operations." },
  ],
};

// EMERGENCY ACCORDION
function EmergencyAccordion({ lang }) {
  const [openId, setOpenId] = useState(null);
  const list = EMERGENCIES[lang] || EMERGENCIES.fr;
  const L = {
    fr:{danger:"DANGER",action:"PREMIÈRE ACTION",mistake:"ERREUR / NE JAMAIS FAIRE",seeAlso:"VOIR AUSSI"},
    en:{danger:"DANGER",action:"FIRST ACTION",mistake:"MISTAKE / NEVER DO",seeAlso:"SEE ALSO"},
    es:{danger:"PELIGRO",action:"PRIMERA ACCIÓN",mistake:"ERROR / NUNCA HACER",seeAlso:"VER TAMBIÉN"},
    pt:{danger:"PERIGO",action:"PRIMEIRA AÇÃO",mistake:"ERRO / NUNCA FAZER",seeAlso:"VER TAMBÉM"},
  }[lang] || {danger:"DANGER",action:"PREMIÈRE ACTION",mistake:"ERREUR / NE JAMAIS FAIRE",seeAlso:"VOIR AUSSI"};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {list.map(e=>{
        const isOpen = openId===e.id;
        return (
          <div key={e.id} style={{background:"rgba(13,31,60,0.7)",border:`1.5px solid ${isOpen?C.gold+"66":"rgba(255,255,255,0.1)"}`,borderRadius:14,overflow:"hidden"}}>
            <div onClick={()=>setOpenId(isOpen?null:e.id)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22}}>{e.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.white}}>{e.title}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:1}}>{e.def}</div>
              </div>
              <span style={{fontSize:13,color:C.gold2}}>{isOpen?"▲":"▼"}</span>
            </div>
            {isOpen&&<div style={{padding:"0 14px 14px"}}>
              <div style={{padding:"9px 11px",borderRadius:10,background:"rgba(192,57,43,0.1)",border:`1px solid ${C.red}33`,marginBottom:7}}>
                <div style={{fontSize:10,color:C.red,fontWeight:700,marginBottom:3}}>🔴 {L.danger}</div>
                <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{e.danger}</div>
              </div>
              <div style={{padding:"9px 11px",borderRadius:10,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}33`,marginBottom:7}}>
                <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:3}}>🟢 {L.action}</div>
                <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{e.action}</div>
              </div>
              <div style={{padding:"9px 11px",borderRadius:10,background:"rgba(230,126,34,0.1)",border:`1px solid ${C.orange}33`,marginBottom:7}}>
                <div style={{fontSize:10,color:C.orange,fontWeight:700,marginBottom:3}}>⚠️ {L.mistake}</div>
                <div style={{fontSize:11,color:C.white,lineHeight:1.6}}>{e.mistake}</div>
              </div>
              <div style={{padding:"9px 11px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`}}>
                <div style={{fontSize:10,color:C.gold2,fontWeight:700,marginBottom:3}}>📚 {L.seeAlso}</div>
                <div style={{fontSize:11,color:C.white,lineHeight:1.6,fontStyle:"italic"}}>{e.seeAlso}</div>
              </div>
            </div>}
          </div>
        );
      })}
    </div>
  );
}

// EXERCISE - MULTI-SCENARIO FIRST DECISION
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:"",q5:"",q6:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b",q5:"a",q6:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous remarquez un début de fumée près d'un tableau électrique. Quelle est votre première décision ?\na) Chercher un extincteur immédiatement sans alerter\nb) Alerter immédiatement, puis isoler la zone si possible sans danger\nc) Ouvrir toutes les issues pour évacuer la fumée"},
      {id:"q2",q:"Vous découvrez une petite voie d'eau qui semble stable. Quelle est votre première décision ?\na) Localiser la source et alerter immédiatement, sans sous-estimer la situation\nb) Attendre de voir si ça empire avant d'alerter\nc) Colmater seul sans en informer personne"},
      {id:"q3",q:"Un black-out survient soudainement. Quelle est votre première décision ?\na) Attendre le redémarrage automatique sans surveiller\nb) Réparer immédiatement sans alerter la passerelle\nc) Alerter immédiatement et surveiller la dérive du navire"},
      {id:"q4",q:"Une personne tombe à l'eau. Quelle est votre première décision ?\na) Courir chercher de l'aide immédiatement\nb) Crier 'Homme à la mer', lancer une bouée, et garder le contact visuel constant\nc) Attendre de voir si la personne remonte seule"},
      {id:"q5",q:"Vous remarquez que le navire semble avoir dérivé au mouillage. Quelle est votre première décision ?\na) Informer immédiatement la passerelle et vérifier la position par rapport à des références fixes\nb) Attendre de confirmer visuellement un déplacement important avant d'alerter\nc) Ne rien faire, l'ancre finira par retenir le navire"},
      {id:"q6",q:"La direction du navire ne répond plus normalement. Quelle est votre première décision ?\na) Continuer à pleine vitesse en espérant que ça se résolve seul\nb) Attendre quelques minutes avant d'informer qui que ce soit\nc) Informer immédiatement la passerelle et basculer sur le système de secours si disponible"},
    ],
    en:[
      {id:"q1",q:"You notice smoke starting near an electrical panel. What is your first decision?\na) Look for an extinguisher immediately without alerting\nb) Alert immediately, then isolate the area if possible without danger\nc) Open all exits to clear the smoke"},
      {id:"q2",q:"You discover a small leak that seems stable. What is your first decision?\na) Locate the source and alert immediately, without underestimating the situation\nb) Wait to see if it worsens before alerting\nc) Patch it alone without informing anyone"},
      {id:"q3",q:"A blackout suddenly occurs. What is your first decision?\na) Wait for automatic restart without monitoring\nb) Repair it immediately without alerting the bridge\nc) Alert immediately and monitor the ship's drift"},
      {id:"q4",q:"A person falls into the water. What is your first decision?\na) Run to get help immediately\nb) Shout 'Man overboard', throw a lifebuoy, and keep constant visual contact\nc) Wait to see if the person surfaces on their own"},
      {id:"q5",q:"You notice the ship seems to have drifted at anchorage. What is your first decision?\na) Inform the bridge immediately and check position relative to fixed references\nb) Wait to visually confirm significant movement before alerting\nc) Do nothing, the anchor will eventually hold the ship"},
      {id:"q6",q:"The ship's steering no longer responds normally. What is your first decision?\na) Continue at full speed hoping it resolves itself\nb) Wait a few minutes before informing anyone\nc) Inform the bridge immediately and switch to the backup system if available"},
    ],
    es:[
      {id:"q1",q:"Notas que empieza a salir humo cerca de un cuadro eléctrico. ¿Cuál es tu primera decisión?\na) Buscar un extintor de inmediato sin alertar\nb) Alertar de inmediato, luego aislar la zona si es posible sin peligro\nc) Abrir todas las salidas para despejar el humo"},
      {id:"q2",q:"Descubres una pequeña vía de agua que parece estable. ¿Cuál es tu primera decisión?\na) Localizar la fuente y alertar de inmediato, sin subestimar la situación\nb) Esperar a ver si empeora antes de alertar\nc) Taponarla solo sin informar a nadie"},
      {id:"q3",q:"Ocurre de repente un apagón. ¿Cuál es tu primera decisión?\na) Esperar el reinicio automático sin vigilar\nb) Reparar de inmediato sin alertar al puente\nc) Alertar de inmediato y vigilar la deriva del buque"},
      {id:"q4",q:"Una persona cae al agua. ¿Cuál es tu primera decisión?\na) Correr a buscar ayuda de inmediato\nb) Gritar 'Hombre al agua', lanzar un salvavidas, y mantener contacto visual constante\nc) Esperar a ver si la persona sale sola"},
      {id:"q5",q:"Notas que el buque parece haber derivado en el fondeadero. ¿Cuál es tu primera decisión?\na) Informar de inmediato al puente y comprobar la posición respecto a referencias fijas\nb) Esperar a confirmar visualmente un desplazamiento importante antes de alertar\nc) No hacer nada, el ancla terminará por retener el buque"},
      {id:"q6",q:"El gobierno del buque ya no responde con normalidad. ¿Cuál es tu primera decisión?\na) Continuar a toda velocidad esperando que se resuelva solo\nb) Esperar unos minutos antes de informar a nadie\nc) Informar de inmediato al puente y pasar al sistema de emergencia si está disponible"},
    ],
    pt:[
      {id:"q1",q:"Notas que começa a sair fumo perto de um quadro elétrico. Qual é a tua primeira decisão?\na) Procurar um extintor de imediato sem alertar\nb) Alertar de imediato, depois isolar a zona se possível sem perigo\nc) Abrir todas as saídas para dissipar o fumo"},
      {id:"q2",q:"Descobres uma pequena via de água que parece estável. Qual é a tua primeira decisão?\na) Localizar a fonte e alertar de imediato, sem subestimar a situação\nb) Esperar para ver se piora antes de alertar\nc) Vedá-la sozinho sem informar ninguém"},
      {id:"q3",q:"Ocorre de repente um black-out. Qual é a tua primeira decisão?\na) Esperar o reinício automático sem vigiar\nb) Reparar de imediato sem alertar o passadiço\nc) Alertar de imediato e vigiar a deriva do navio"},
      {id:"q4",q:"Uma pessoa cai à água. Qual é a tua primeira decisão?\na) Correr a buscar ajuda de imediato\nb) Gritar 'Homem ao mar', lançar uma boia, e manter contacto visual constante\nc) Esperar para ver se a pessoa emerge sozinha"},
      {id:"q5",q:"Notas que o navio parece ter derivado no fundeadouro. Qual é a tua primeira decisão?\na) Informar de imediato o passadiço e verificar a posição em relação a referências fixas\nb) Esperar para confirmar visualmente um deslocamento importante antes de alertar\nc) Não fazer nada, a âncora acabará por reter o navio"},
      {id:"q6",q:"O leme do navio já não responde normalmente. Qual é a tua primeira decisão?\na) Continuar a toda a velocidade à espera que se resolva sozinho\nb) Esperar alguns minutos antes de informar alguém\nc) Informar de imediato o passadiço e mudar para o sistema de emergência se disponível"},
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

// BANK - 15 QUESTIONS
const BANK = {
  fr:[
    {q:"Que signifie le principe 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse' ?",opts:["Les cinq premières minutes suffisent toujours à résoudre l'urgence","Les cinq premières minutes déterminent surtout si la situation s'aggrave ou non, pas si elle est résolue","Ce principe ne concerne que l'incendie","Il ne faut jamais agir dans les cinq premières minutes"],correct:1,expl:"L'objectif des cinq premières minutes est de ne pas aggraver la situation, pas de la résoudre complètement."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Transformer le marin en expert de chaque urgence","Répondre à la question : quelle est la meilleure première décision pendant les cinq premières minutes","Enseigner les procédures complètes de chaque situation","Présenter l'historique des accidents maritimes"],correct:1,expl:"Le but est d'empêcher qu'une situation se dégrade avant que les procédures complètes prennent le relais."},
    {q:"Quelle est la logique universelle qui s'applique à toutes les urgences de cette leçon ?",opts:["Improviser selon la situation","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Attendre les instructions avant d'agir","Résoudre seul avant d'alerter"],correct:1,expl:"Cette logique reste la même quelle que soit la nature de l'urgence rencontrée."},
    {q:"Que signifie l'étape 'Protect Life' dans cette logique ?",opts:["La sécurité du navire prime toujours sur celle des personnes","La sécurité des personnes prime toujours sur celle du navire, de la cargaison ou de l'environnement","Cette étape ne concerne que les urgences médicales","Elle intervient après la résolution complète de l'urgence"],correct:1,expl:"Les personnes restent la priorité absolue avant toute autre considération."},
    {q:"Pourquoi ne faut-il jamais rouvrir une porte ou cloison chaude pendant un incendie ?",opts:["Ce n'est pas dangereux, uniquement une question de confort","Cela peut apporter l'oxygène qui relance ou aggrave le feu","Cela accélère toujours l'extinction","Cela permet de vérifier sans aucun risque"],correct:1,expl:"Un apport d'air imprévu peut aggraver rapidement un feu contenu."},
    {q:"Face à une petite voie d'eau qui semble stable, quelle erreur fréquente faut-il éviter ?",opts:["Alerter trop rapidement","La sous-estimer en pensant qu'elle restera stable indéfiniment","Chercher la source du problème","Actionner les pompes disponibles"],correct:1,expl:"Une voie d'eau stable peut évoluer soudainement si le débit augmente."},
    {q:"Que faut-il faire immédiatement face à une gîte anormale ?",opts:["Attendre de voir si elle se stabilise seule","Informer immédiatement la passerelle et surveiller l'évolution de l'angle","Ignorer si l'angle semble faible","Ne rien faire tant que le navire ne penche pas fortement"],correct:1,expl:"Une gîte anormale peut indiquer un problème sérieux nécessitant une action rapide."},
    {q:"Pendant un homme à la mer, que ne faut-il jamais faire ?",opts:["Lancer une bouée","Alerter la passerelle","Quitter des yeux la victime, même quelques secondes","Crier 'Homme à la mer'"],correct:2,expl:"Le contact visuel constant est essentiel jusqu'à ce qu'un relais soit assuré."},
    {q:"Pendant un black-out, quelle erreur fréquente faut-il éviter ?",opts:["Alerter immédiatement","Surveiller la dérive du navire","Présumer qu'un redémarrage automatique se produira sans surveillance active","Suivre la position par tout moyen disponible"],correct:2,expl:"La surveillance active reste indispensable même en attendant un redémarrage."},
    {q:"Face à une panne de barre, que faut-il faire immédiatement ?",opts:["Continuer à pleine vitesse en attendant que ça se résolve","Informer immédiatement la passerelle et basculer sur le système de secours si disponible","Ignorer si le navire semble encore répondre un peu","Attendre plusieurs minutes avant d'agir"],correct:1,expl:"Le risque de collision ou d'échouement impose une réaction immédiate."},
    {q:"Face à une avarie moteur, quelle erreur fréquente faut-il éviter ?",opts:["Alerter la passerelle immédiatement","Tarder à informer la passerelle en espérant réparer discrètement","Surveiller la dérive et la position","Préparer une demande d'assistance"],correct:1,expl:"Retarder l'alerte augmente le risque de dérive incontrôlée."},
    {q:"Face à une ancre qui chasse, que faut-il faire immédiatement ?",opts:["Attendre de confirmer visuellement un déplacement important","Informer immédiatement la passerelle et surveiller la position par rapport à des références fixes","Ignorer si le navire semble stable au premier regard","Ne rien faire, l'ancre finira par retenir le navire"],correct:1,expl:"Un retard dans la détection peut conduire à un échouement ou une collision."},
    {q:"Face à un incident de pollution, quelle erreur fréquente faut-il absolument éviter ?",opts:["Arrêter la source si possible","Contenir ce qui peut l'être","Dissimuler l'incident, même mineur, en espérant qu'il passe inaperçu","Alerter immédiatement"],correct:2,expl:"Dissimuler un incident de pollution aggrave la responsabilité légale et l'impact réel."},
    {q:"Pour les situations sans module MAP existant, que propose cette leçon plutôt qu'un lien vers un module inexistant ?",opts:["Aucune information n'est donnée","Une note indiquant que le sujet sera approfondi dans un futur module du département concerné","Un renvoi vers un module non lié","La leçon ignore simplement ces situations"],correct:1,expl:"Cette note évite l'impression d'un lien cassé tout en étant honnête sur l'état actuel de MAP."},
    {q:"Quelle est la responsabilité réelle du marin selon la conclusion de cette leçon ?",opts:["Résoudre seul toutes les urgences rencontrées","Prendre immédiatement la bonne première décision, pas résoudre seul toute la situation","Attendre systématiquement les équipes spécialisées sans agir","Mémoriser des procédures complètes pour chaque situation"],correct:1,expl:"C'est cette première décision qui sauve souvent les personnes, le navire, la cargaison et l'environnement."},
  ],
  en:[
    {q:"What does the principle 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse' mean?",opts:["The first five minutes always suffice to resolve the emergency","The first five minutes mainly determine whether the situation worsens or not, not whether it's resolved","This principle only concerns fire","You should never act during the first five minutes"],correct:1,expl:"The goal of the first five minutes is not to worsen the situation, not to fully resolve it."},
    {q:"What is the exact mission of this lesson?",opts:["Turn the sailor into an expert on every emergency","Answer the question: what is the best first decision during the first five minutes","Teach complete procedures for every situation","Present the history of maritime accidents"],correct:1,expl:"The goal is to prevent a situation from worsening before full procedures take over."},
    {q:"What is the universal logic that applies to all emergencies in this lesson?",opts:["Improvise depending on the situation","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Wait for instructions before acting","Solve it alone before alerting"],correct:1,expl:"This logic stays the same whatever the nature of the emergency encountered."},
    {q:"What does the 'Protect Life' step mean in this logic?",opts:["The ship's safety always comes before people's","People's safety always comes before the ship, the cargo, or the environment","This step only concerns medical emergencies","It comes after the emergency is fully resolved"],correct:1,expl:"People remain the absolute priority before any other consideration."},
    {q:"Why should a hot door or bulkhead never be reopened during a fire?",opts:["It isn't dangerous, only a matter of comfort","It can bring in the oxygen that restarts or worsens the fire","It always speeds up extinction","It allows checking with no risk at all"],correct:1,expl:"An unexpected air supply can rapidly worsen a contained fire."},
    {q:"Facing a small leak that seems stable, what common mistake should be avoided?",opts:["Alerting too quickly","Underestimating it, thinking it will stay stable indefinitely","Looking for the source of the problem","Activating available pumps"],correct:1,expl:"A stable leak can suddenly worsen if the flow increases."},
    {q:"What must be done immediately facing an abnormal list?",opts:["Wait to see if it stabilizes on its own","Inform the bridge immediately and monitor how the angle evolves","Ignore it if the angle seems small","Do nothing until the ship leans heavily"],correct:1,expl:"An abnormal list may indicate a serious problem requiring quick action."},
    {q:"During a man overboard, what must never be done?",opts:["Throw a lifebuoy","Alert the bridge","Take your eyes off the victim, even for a few seconds","Shout 'Man overboard'"],correct:2,expl:"Constant visual contact is essential until a relay is ensured."},
    {q:"During a blackout, what common mistake should be avoided?",opts:["Alerting immediately","Monitoring the ship's drift","Assuming an automatic restart will happen without active monitoring","Tracking position by any means available"],correct:2,expl:"Active monitoring remains essential even while waiting for a restart."},
    {q:"Facing a steering failure, what must be done immediately?",opts:["Continue at full speed waiting for it to resolve itself","Inform the bridge immediately and switch to the backup system if available","Ignore it if the ship still seems to respond a little","Wait several minutes before acting"],correct:1,expl:"The risk of collision or grounding requires an immediate reaction."},
    {q:"Facing an engine failure, what common mistake should be avoided?",opts:["Alerting the bridge immediately","Delaying informing the bridge while hoping to quietly fix it","Monitoring drift and position","Preparing a request for assistance"],correct:1,expl:"Delaying the alert increases the risk of uncontrolled drift."},
    {q:"Facing a dragging anchor, what must be done immediately?",opts:["Wait to visually confirm significant movement","Inform the bridge immediately and monitor position relative to fixed references","Ignore it if the ship seems stable at first glance","Do nothing, the anchor will eventually hold the ship"],correct:1,expl:"A delay in detection can lead to grounding or collision."},
    {q:"Facing a pollution incident, what common mistake must absolutely be avoided?",opts:["Stopping the source if possible","Containing what can be contained","Concealing the incident, even a minor one, hoping it goes unnoticed","Alerting immediately"],correct:2,expl:"Concealing a pollution incident worsens legal liability and the actual impact."},
    {q:"For situations without an existing MAP module, what does this lesson propose instead of a link to a non-existent module?",opts:["No information is given at all","A note indicating the topic will be covered in depth in a future module of the relevant department","A link to an unrelated module","The lesson simply ignores these situations"],correct:1,expl:"This note avoids the impression of a broken link while being honest about MAP's current state."},
    {q:"What is the sailor's real responsibility according to this lesson's conclusion?",opts:["Solve every emergency encountered alone","Immediately make the right first decision, not solve the entire situation alone","Systematically wait for specialized teams without acting","Memorize complete procedures for every situation"],correct:1,expl:"It's this first decision that often saves people, the ship, cargo, and the environment."},
  ],
  es:[
    {q:"¿Qué significa el principio 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse'?",opts:["Los primeros cinco minutos siempre bastan para resolver la urgencia","Los primeros cinco minutos determinan sobre todo si la situación empeora o no, no si se resuelve","Este principio solo concierne al incendio","Nunca hay que actuar durante los primeros cinco minutos"],correct:1,expl:"El objetivo de los primeros cinco minutos es no empeorar la situación, no resolverla por completo."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Convertir al marino en experto de cada urgencia","Responder a la pregunta: cuál es la mejor primera decisión durante los primeros cinco minutos","Enseñar procedimientos completos de cada situación","Presentar la historia de los accidentes marítimos"],correct:1,expl:"El objetivo es impedir que una situación empeore antes de que los procedimientos completos tomen el relevo."},
    {q:"¿Cuál es la lógica universal que se aplica a todas las urgencias de esta lección?",opts:["Improvisar según la situación","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Esperar instrucciones antes de actuar","Resolverlo solo antes de alertar"],correct:1,expl:"Esta lógica se mantiene igual sea cual sea la naturaleza de la urgencia encontrada."},
    {q:"¿Qué significa la etapa 'Protect Life' en esta lógica?",opts:["La seguridad del buque siempre prima sobre la de las personas","La seguridad de las personas siempre prima sobre la del buque, la carga o el medio ambiente","Esta etapa solo concierne a las urgencias médicas","Llega después de resolver por completo la urgencia"],correct:1,expl:"Las personas siguen siendo la prioridad absoluta antes de cualquier otra consideración."},
    {q:"¿Por qué nunca hay que volver a abrir una puerta o mamparo caliente durante un incendio?",opts:["No es peligroso, solo una cuestión de comodidad","Puede aportar el oxígeno que reactiva o agrava el fuego","Siempre acelera la extinción","Permite comprobar sin ningún riesgo"],correct:1,expl:"Un aporte inesperado de aire puede agravar rápidamente un fuego contenido."},
    {q:"Ante una pequeña vía de agua que parece estable, ¿qué error frecuente hay que evitar?",opts:["Alertar demasiado rápido","Subestimarla pensando que se mantendrá estable indefinidamente","Buscar el origen del problema","Accionar las bombas disponibles"],correct:1,expl:"Una vía de agua estable puede empeorar de repente si el caudal aumenta."},
    {q:"¿Qué hay que hacer de inmediato ante una escora anormal?",opts:["Esperar a ver si se estabiliza sola","Informar de inmediato al puente y vigilar la evolución del ángulo","Ignorarla si el ángulo parece pequeño","No hacer nada hasta que el buque escore fuertemente"],correct:1,expl:"Una escora anormal puede indicar un problema serio que requiere acción rápida."},
    {q:"Durante un hombre al agua, ¿qué nunca hay que hacer?",opts:["Lanzar un salvavidas","Alertar al puente","Quitar la vista de la víctima, aunque sea unos segundos","Gritar 'Hombre al agua'"],correct:2,expl:"El contacto visual constante es esencial hasta que se asegure un relevo."},
    {q:"Durante un apagón, ¿qué error frecuente hay que evitar?",opts:["Alertar de inmediato","Vigilar la deriva del buque","Suponer que se producirá un reinicio automático sin vigilancia activa","Seguir la posición por cualquier medio disponible"],correct:2,expl:"La vigilancia activa sigue siendo indispensable incluso esperando un reinicio."},
    {q:"Ante una avería del gobierno, ¿qué hay que hacer de inmediato?",opts:["Continuar a toda velocidad esperando que se resuelva","Informar de inmediato al puente y pasar al sistema de emergencia si está disponible","Ignorarlo si el buque todavía parece responder un poco","Esperar varios minutos antes de actuar"],correct:1,expl:"El riesgo de colisión o varada exige una reacción inmediata."},
    {q:"Ante una avería del motor, ¿qué error frecuente hay que evitar?",opts:["Alertar al puente de inmediato","Tardar en informar al puente esperando repararlo discretamente","Vigilar la deriva y la posición","Preparar una solicitud de asistencia"],correct:1,expl:"Retrasar la alerta aumenta el riesgo de deriva incontrolada."},
    {q:"Ante un ancla garreando, ¿qué hay que hacer de inmediato?",opts:["Esperar a confirmar visualmente un desplazamiento importante","Informar de inmediato al puente y vigilar la posición respecto a referencias fijas","Ignorarlo si el buque parece estable a primera vista","No hacer nada, el ancla terminará por retener el buque"],correct:1,expl:"Un retraso en la detección puede provocar una varada o una colisión."},
    {q:"Ante un incidente de contaminación, ¿qué error frecuente hay que evitar absolutamente?",opts:["Detener la fuente si es posible","Contener lo que se pueda","Ocultar el incidente, aunque sea menor, esperando que pase desapercibido","Alertar de inmediato"],correct:2,expl:"Ocultar un incidente de contaminación agrava la responsabilidad legal y el impacto real."},
    {q:"Para las situaciones sin módulo MAP existente, ¿qué propone esta lección en lugar de un enlace a un módulo inexistente?",opts:["No se da ninguna información","Una nota indicando que el tema se profundizará en un futuro módulo del departamento correspondiente","Un enlace a un módulo no relacionado","La lección simplemente ignora estas situaciones"],correct:1,expl:"Esta nota evita la impresión de un enlace roto siendo honesta sobre el estado actual de MAP."},
    {q:"¿Cuál es la responsabilidad real del marino según la conclusión de esta lección?",opts:["Resolver solo todas las urgencias encontradas","Tomar de inmediato la buena primera decisión, no resolver solo toda la situación","Esperar sistemáticamente a los equipos especializados sin actuar","Memorizar procedimientos completos para cada situación"],correct:1,expl:"Es esta primera decisión la que a menudo salva a las personas, el buque, la carga y el medio ambiente."},
  ],
  pt:[
    {q:"O que significa o princípio 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse'?",opts:["Os primeiros cinco minutos sempre bastam para resolver a urgência","Os primeiros cinco minutos determinam sobretudo se a situação piora ou não, não se é resolvida","Este princípio só diz respeito ao incêndio","Nunca se deve agir durante os primeiros cinco minutos"],correct:1,expl:"O objetivo dos primeiros cinco minutos é não piorar a situação, não resolvê-la por completo."},
    {q:"Qual é a missão exata desta lição?",opts:["Transformar o marítimo num especialista em cada urgência","Responder à pergunta: qual é a melhor primeira decisão durante os primeiros cinco minutos","Ensinar procedimentos completos de cada situação","Apresentar a história dos acidentes marítimos"],correct:1,expl:"O objetivo é impedir que uma situação piore antes de os procedimentos completos assumirem o seguimento."},
    {q:"Qual é a lógica universal que se aplica a todas as urgências desta lição?",opts:["Improvisar consoante a situação","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Esperar instruções antes de agir","Resolvê-la sozinho antes de alertar"],correct:1,expl:"Esta lógica mantém-se igual seja qual for a natureza da urgência encontrada."},
    {q:"O que significa a etapa 'Protect Life' nesta lógica?",opts:["A segurança do navio prevalece sempre sobre a das pessoas","A segurança das pessoas prevalece sempre sobre a do navio, da carga ou do ambiente","Esta etapa só diz respeito a urgências médicas","Vem depois de a urgência ser completamente resolvida"],correct:1,expl:"As pessoas continuam a ser a prioridade absoluta antes de qualquer outra consideração."},
    {q:"Por que nunca se deve reabrir uma porta ou anteparo quente durante um incêndio?",opts:["Não é perigoso, só uma questão de conforto","Pode trazer o oxigénio que reacende ou agrava o fogo","Acelera sempre a extinção","Permite verificar sem qualquer risco"],correct:1,expl:"Um aporte inesperado de ar pode agravar rapidamente um fogo contido."},
    {q:"Perante uma pequena via de água que parece estável, que erro frequente deve ser evitado?",opts:["Alertar demasiado depressa","Subestimá-la pensando que ficará estável indefinidamente","Procurar a origem do problema","Acionar as bombas disponíveis"],correct:1,expl:"Uma via de água estável pode piorar de repente se o caudal aumentar."},
    {q:"O que deve ser feito de imediato perante um adornamento anormal?",opts:["Esperar para ver se se estabiliza sozinho","Informar de imediato o passadiço e vigiar a evolução do ângulo","Ignorá-lo se o ângulo parecer pequeno","Não fazer nada até o navio adornar fortemente"],correct:1,expl:"Um adornamento anormal pode indicar um problema sério que exige ação rápida."},
    {q:"Durante um homem ao mar, o que nunca se deve fazer?",opts:["Lançar uma boia","Alertar o passadiço","Tirar os olhos da vítima, mesmo por alguns segundos","Gritar 'Homem ao mar'"],correct:2,expl:"O contacto visual constante é essencial até ser garantido um revezamento."},
    {q:"Durante um black-out, que erro frequente deve ser evitado?",opts:["Alertar de imediato","Vigiar a deriva do navio","Presumir que ocorrerá um reinício automático sem vigilância ativa","Seguir a posição por qualquer meio disponível"],correct:2,expl:"A vigilância ativa continua a ser indispensável mesmo à espera de um reinício."},
    {q:"Perante uma avaria do leme, o que deve ser feito de imediato?",opts:["Continuar a toda a velocidade à espera que se resolva","Informar de imediato o passadiço e mudar para o sistema de emergência se disponível","Ignorá-la se o navio ainda parecer responder um pouco","Esperar vários minutos antes de agir"],correct:1,expl:"O risco de colisão ou encalhe exige uma reação imediata."},
    {q:"Perante uma avaria do motor, que erro frequente deve ser evitado?",opts:["Alertar o passadiço de imediato","Atrasar a informação ao passadiço à espera de reparar discretamente","Vigiar a deriva e a posição","Preparar um pedido de assistência"],correct:1,expl:"Atrasar o alerta aumenta o risco de deriva incontrolada."},
    {q:"Perante uma âncora a garrar, o que deve ser feito de imediato?",opts:["Esperar para confirmar visualmente um deslocamento importante","Informar de imediato o passadiço e vigiar a posição em relação a referências fixas","Ignorá-lo se o navio parecer estável à primeira vista","Não fazer nada, a âncora acabará por reter o navio"],correct:1,expl:"Um atraso na deteção pode levar a um encalhe ou colisão."},
    {q:"Perante um incidente de poluição, que erro frequente deve ser absolutamente evitado?",opts:["Parar a fonte se possível","Conter o que puder ser contido","Esconder o incidente, mesmo que menor, esperando que passe despercebido","Alertar de imediato"],correct:2,expl:"Esconder um incidente de poluição agrava a responsabilidade legal e o impacto real."},
    {q:"Para as situações sem módulo MAP existente, o que propõe esta lição em vez de um link para um módulo inexistente?",opts:["Nenhuma informação é dada","Uma nota indicando que o tema será aprofundado num futuro módulo do departamento correspondente","Um link para um módulo não relacionado","A lição simplesmente ignora estas situações"],correct:1,expl:"Esta nota evita a impressão de um link quebrado sendo honesta sobre o estado atual da MAP."},
    {q:"Qual é a responsabilidade real do marítimo segundo a conclusão desta lição?",opts:["Resolver sozinho todas as urgências encontradas","Tomar de imediato a boa primeira decisão, não resolver sozinho toda a situação","Esperar sistematicamente pelas equipas especializadas sem agir","Memorizar procedimentos completos para cada situação"],correct:1,expl:"É esta primeira decisão que muitas vezes salva as pessoas, o navio, a carga e o ambiente."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse' ?",opts:["Elles suffisent toujours à résoudre l'urgence","Elles déterminent surtout si la situation s'aggrave ou non","Cela ne concerne que l'incendie","Il ne faut jamais agir aussi vite"],correct:1,expl:"L'objectif est de ne pas aggraver la situation, pas de la résoudre entièrement."},
    {q:"Quelle est la logique universelle enseignée dans cette leçon ?",opts:["Improviser selon la situation","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Résoudre seul avant d'alerter","Attendre les instructions"],correct:1,expl:"Cette logique s'applique à toutes les urgences couvertes."},
    {q:"Pendant un homme à la mer, que ne faut-il jamais faire ?",opts:["Lancer une bouée","Quitter des yeux la victime, même quelques secondes","Alerter la passerelle","Crier 'Homme à la mer'"],correct:1,expl:"Le contact visuel constant reste essentiel."},
    {q:"Face à une avarie moteur, quelle erreur faut-il éviter ?",opts:["Alerter la passerelle","Tarder à informer en espérant réparer discrètement","Surveiller la dérive","Préparer une demande d'assistance"],correct:1,expl:"Retarder l'alerte augmente le risque de dérive incontrôlée."},
    {q:"Quelle est la responsabilité réelle du marin selon cette leçon ?",opts:["Résoudre seul toutes les urgences","Prendre immédiatement la bonne première décision","Attendre les équipes spécialisées sans agir","Mémoriser des procédures complètes"],correct:1,expl:"C'est cette première décision qui sauve souvent les personnes, le navire, la cargaison et l'environnement."},
  ],
  en:[
    {q:"What does 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse' mean?",opts:["They always suffice to resolve the emergency","They mainly determine whether the situation worsens or not","It only concerns fire","You should never act that fast"],correct:1,expl:"The goal is not to worsen the situation, not to fully resolve it."},
    {q:"What is the universal logic taught in this lesson?",opts:["Improvise depending on the situation","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Solve it alone before alerting","Wait for instructions"],correct:1,expl:"This logic applies to all the emergencies covered."},
    {q:"During a man overboard, what must never be done?",opts:["Throw a lifebuoy","Take your eyes off the victim, even for a few seconds","Alert the bridge","Shout 'Man overboard'"],correct:1,expl:"Constant visual contact remains essential."},
    {q:"Facing an engine failure, what mistake should be avoided?",opts:["Alerting the bridge","Delaying informing while hoping to quietly fix it","Monitoring drift","Preparing a request for assistance"],correct:1,expl:"Delaying the alert increases the risk of uncontrolled drift."},
    {q:"What is the sailor's real responsibility according to this lesson?",opts:["Solve every emergency alone","Immediately make the right first decision","Wait for specialized teams without acting","Memorize complete procedures"],correct:1,expl:"It's this first decision that often saves people, the ship, cargo, and the environment."},
  ],
  es:[
    {q:"¿Qué significa 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse'?",opts:["Siempre bastan para resolver la urgencia","Determinan sobre todo si la situación empeora o no","Solo concierne al incendio","Nunca hay que actuar tan rápido"],correct:1,expl:"El objetivo es no empeorar la situación, no resolverla por completo."},
    {q:"¿Cuál es la lógica universal enseñada en esta lección?",opts:["Improvisar según la situación","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Resolverlo solo antes de alertar","Esperar instrucciones"],correct:1,expl:"Esta lógica se aplica a todas las urgencias cubiertas."},
    {q:"Durante un hombre al agua, ¿qué nunca hay que hacer?",opts:["Lanzar un salvavidas","Quitar la vista de la víctima, aunque sea unos segundos","Alertar al puente","Gritar 'Hombre al agua'"],correct:1,expl:"El contacto visual constante sigue siendo esencial."},
    {q:"Ante una avería del motor, ¿qué error hay que evitar?",opts:["Alertar al puente","Tardar en informar esperando repararlo discretamente","Vigilar la deriva","Preparar una solicitud de asistencia"],correct:1,expl:"Retrasar la alerta aumenta el riesgo de deriva incontrolada."},
    {q:"¿Cuál es la responsabilidad real del marino según esta lección?",opts:["Resolver solo todas las urgencias","Tomar de inmediato la buena primera decisión","Esperar a los equipos especializados sin actuar","Memorizar procedimientos completos"],correct:1,expl:"Es esta primera decisión la que a menudo salva a las personas, el buque, la carga y el medio ambiente."},
  ],
  pt:[
    {q:"O que significa 'The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse'?",opts:["Sempre bastam para resolver a urgência","Determinam sobretudo se a situação piora ou não","Só diz respeito ao incêndio","Nunca se deve agir tão rápido"],correct:1,expl:"O objetivo é não piorar a situação, não resolvê-la por completo."},
    {q:"Qual é a lógica universal ensinada nesta lição?",opts:["Improvisar consoante a situação","Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Resolvê-la sozinho antes de alertar","Esperar instruções"],correct:1,expl:"Esta lógica aplica-se a todas as urgências cobertas."},
    {q:"Durante um homem ao mar, o que nunca se deve fazer?",opts:["Lançar uma boia","Tirar os olhos da vítima, mesmo por alguns segundos","Alertar o passadiço","Gritar 'Homem ao mar'"],correct:1,expl:"O contacto visual constante continua a ser essencial."},
    {q:"Perante uma avaria do motor, que erro deve ser evitado?",opts:["Alertar o passadiço","Atrasar a informação à espera de reparar discretamente","Vigiar a deriva","Preparar um pedido de assistência"],correct:1,expl:"Atrasar o alerta aumenta o risco de deriva incontrolada."},
    {q:"Qual é a responsabilidade real do marítimo segundo esta lição?",opts:["Resolver sozinho todas as urgências","Tomar de imediato a boa primeira decisão","Esperar pelas equipas especializadas sem agir","Memorizar procedimentos completos"],correct:1,expl:"É esta primeira decisão que muitas vezes salva as pessoas, o navio, a carga e o ambiente."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Parmi ces neuf urgences, laquelle te semble aujourd'hui la moins familiere, celle ou tu hesiterais le plus sur la premiere decision a prendre ?",
    en:"Among these nine emergencies, which one feels least familiar to you today, the one where you would hesitate most about the first decision to make?",
    es:"De estas nueve urgencias, ¿cual te resulta hoy menos familiar, aquella en la que dudarias mas sobre la primera decision a tomar?",
    pt:"Entre estas nove urgencias, qual te parece hoje menos familiar, aquela em que hesitarias mais sobre a primeira decisao a tomar?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 2/6 · ⭐ Premium",
      title:"Common Ship Emergencies & Immediate Actions",
      intro:"Cette leçon ne cherche pas à transformer le marin en expert de chaque urgence. Elle répond à une seule question : quelle est la meilleure première décision pendant les cinq premières minutes ?",
      p0:"THE FIRST FIVE MINUTES RARELY SOLVE THE EMERGENCY. THEY DECIDE WHETHER IT GETS WORSE.",s0t:"Le principe qui structure toute la leçon",
      s0:"Le marin n'est pas censé résoudre seul toutes les urgences. Sa responsabilité est de prendre immédiatement la bonne première décision, celle qui empêche la situation de se dégrader avant que les procédures complètes et les équipes spécialisées ne prennent le relais.",
      p1:"UNE LOGIQUE UNIVERSELLE",s1t:"Le même fil conducteur pour toutes les urgences",
      s1:"Malgré leurs différences, toutes les urgences suivent la même logique : Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance.",
      p2:"🔦 NEUF FICHES DE RÉFÉRENCE RAPIDE",p3:"🎯 EXERCICE - QUELLE EST VOTRE PREMIÈRE DÉCISION ?",p4:"📝 BANQUE DE 15 QUESTIONS",p5:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 2",
      sumP:["The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse","La même logique universelle s'applique à toutes les urgences rencontrées","Neuf situations couvertes, chacune avec la même profondeur : danger, première action, erreur, renvoi","Le marin n'est pas censé résoudre seul, mais prendre la bonne première décision","Certains sujets seront approfondis dans de futurs modules, sans lien vers rien d'existant"],
      learnedP:["La logique universelle Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Les neuf urgences courantes et leur première action correcte","Les erreurs fréquentes à éviter pour chaque situation","Pourquoi la première décision compte plus que la résolution complète","Les renvois vers les modules déjà développés dans MAP"],
      transition:"You now know how to react in the first five minutes. But how do you protect yourself while doing it?",
      safetyMsg:"The first five minutes rarely solve the emergency. They decide whether it gets worse.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 2/6 · ⭐ Premium",
      title:"Common Ship Emergencies & Immediate Actions",
      intro:"This lesson does not try to turn the sailor into an expert on every emergency. It answers a single question: what is the best first decision during the first five minutes?",
      p0:"THE FIRST FIVE MINUTES RARELY SOLVE THE EMERGENCY. THEY DECIDE WHETHER IT GETS WORSE.",s0t:"The principle that structures the whole lesson",
      s0:"The sailor is not expected to solve every emergency alone. Their responsibility is to immediately make the right first decision, the one that prevents the situation from worsening before full procedures and specialized teams take over.",
      p1:"A UNIVERSAL LOGIC",s1t:"The same thread for every emergency",
      s1:"Despite their differences, all emergencies follow the same logic: Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance.",
      p2:"🔦 NINE QUICK-REFERENCE CARDS",p3:"🎯 EXERCISE - WHAT IS YOUR FIRST DECISION?",p4:"📝 15-QUESTION BANK",p5:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 2",
      sumP:["The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse","The same universal logic applies to every emergency encountered","Nine situations covered, each with the same depth: danger, first action, mistake, cross-reference","The sailor isn't expected to solve alone, but to make the right first decision","Some topics will be covered in depth in future modules, with no link to anything that exists"],
      learnedP:["The universal logic Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","The nine common emergencies and their correct first action","The common mistakes to avoid for each situation","Why the first decision matters more than complete resolution","Cross-references to modules already developed in MAP"],
      transition:"You now know how to react in the first five minutes. But how do you protect yourself while doing it?",
      safetyMsg:"The first five minutes rarely solve the emergency. They decide whether it gets worse.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 2/6 · ⭐ Premium",
      title:"Common Ship Emergencies & Immediate Actions",
      intro:"Esta lección no busca convertir al marino en experto de cada urgencia. Responde a una sola pregunta: ¿cuál es la mejor primera decisión durante los primeros cinco minutos?",
      p0:"THE FIRST FIVE MINUTES RARELY SOLVE THE EMERGENCY. THEY DECIDE WHETHER IT GETS WORSE.",s0t:"El principio que estructura toda la lección",
      s0:"No se espera que el marino resuelva solo todas las urgencias. Su responsabilidad es tomar de inmediato la buena primera decisión, la que impide que la situación empeore antes de que los procedimientos completos y los equipos especializados tomen el relevo.",
      p1:"UNA LÓGICA UNIVERSAL",s1t:"El mismo hilo conductor para todas las urgencias",
      s1:"A pesar de sus diferencias, todas las urgencias siguen la misma lógica: Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance.",
      p2:"🔦 NUEVE FICHAS DE REFERENCIA RÁPIDA",p3:"🎯 EJERCICIO - ¿CUÁL ES TU PRIMERA DECISIÓN?",p4:"📝 BANCO DE 15 PREGUNTAS",p5:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 2",
      sumP:["The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse","La misma lógica universal se aplica a todas las urgencias encontradas","Nueve situaciones cubiertas, cada una con la misma profundidad: peligro, primera acción, error, referencia","No se espera que el marino resuelva solo, sino que tome la buena primera decisión","Algunos temas se profundizarán en futuros módulos, sin enlace a nada existente"],
      learnedP:["La lógica universal Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","Las nueve urgencias comunes y su primera acción correcta","Los errores frecuentes a evitar en cada situación","Por qué la primera decisión importa más que la resolución completa","Las referencias a módulos ya desarrollados en MAP"],
      transition:"You now know how to react in the first five minutes. But how do you protect yourself while doing it?",
      safetyMsg:"The first five minutes rarely solve the emergency. They decide whether it gets worse.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 2/6 · ⭐ Premium",
      title:"Common Ship Emergencies & Immediate Actions",
      intro:"Esta lição não procura transformar o marítimo num especialista em cada urgência. Responde a uma única pergunta: qual é a melhor primeira decisão durante os primeiros cinco minutos?",
      p0:"THE FIRST FIVE MINUTES RARELY SOLVE THE EMERGENCY. THEY DECIDE WHETHER IT GETS WORSE.",s0t:"O princípio que estrutura toda a lição",
      s0:"Não se espera que o marítimo resolva sozinho todas as urgências. A sua responsabilidade é tomar de imediato a boa primeira decisão, aquela que impede a situação de piorar antes de os procedimentos completos e as equipas especializadas assumirem o seguimento.",
      p1:"UMA LÓGICA UNIVERSAL",s1t:"O mesmo fio condutor para todas as urgências",
      s1:"Apesar das suas diferenças, todas as urgências seguem a mesma lógica: Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance.",
      p2:"🔦 NOVE FICHAS DE REFERÊNCIA RÁPIDA",p3:"🎯 EXERCÍCIO - QUAL É A TUA PRIMEIRA DECISÃO?",p4:"📝 BANCO DE 15 PERGUNTAS",p5:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 2",
      sumP:["The First Five Minutes Rarely Solve the Emergency. They Decide Whether It Gets Worse","A mesma lógica universal aplica-se a todas as urgências encontradas","Nove situações cobertas, cada uma com a mesma profundidade: perigo, primeira ação, erro, referência","Não se espera que o marítimo resolva sozinho, mas que tome a boa primeira decisão","Alguns temas serão aprofundados em futuros módulos, sem link para nada existente"],
      learnedP:["A lógica universal Recognize → Report → Protect Life → Prevent Escalation → Call for Assistance","As nove urgências comuns e a sua primeira ação correta","Os erros frequentes a evitar em cada situação","Por que a primeira decisão importa mais do que a resolução completa","As referências a módulos já desenvolvidos na MAP"],
      transition:"You now know how to react in the first five minutes. But how do you protect yourself while doing it?",
      safetyMsg:"The first five minutes rarely solve the emergency. They decide whether it gets worse.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS6_L2({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 2/6":lang==="en"?"Lesson 2/6":lang==="es"?"Lección 2/6":"Lição 2/6"}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{fontSize:9,padding:"2px 7px",borderRadius:8,background:"rgba(201,146,42,0.2)",border:`1px solid ${C.gold}44`,color:C.gold,fontWeight:700}}>⭐ PREMIUM</div>
            <div style={{fontSize:11,color:C.orange,fontFamily:"'Cinzel',serif"}}>{progress}%</div>
          </div>
        </div>
        <div style={{height:3,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${C.orange},${C.gold2})`,transition:"width 0.5s ease"}}/>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px 40px",position:"relative",zIndex:1,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 0.5s ease"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>

          {phase==="content"&&<>
            <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,marginBottom:10,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.orange,fontWeight:700}}>{lc.badge}</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:C.white,lineHeight:1.3,margin:"0 0 16px"}}>{lc.title}</h1>
            <Card style={{marginBottom:14,borderLeft:`3px solid ${C.orange}`}}>
              <div style={{fontSize:14,color:"rgba(240,244,255,0.85)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.intro}</div>
            </Card>

            <SL icon="🛡️" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔗" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔗</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line",marginBottom:12}}>{lc.s1}</div><UniversalLogicSVG lang={lang}/></Card>

            <SL icon="🔦" text={lc.p2} color={C.gold}/>
            <div style={{marginBottom:14}}><EmergencyAccordion lang={lang}/></div>

            <SL icon="🎯" text={lc.p3} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="📝" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p5} color={C.purple}/>
            <div style={{marginBottom:14}}><SafetyReflection lang={lang}/></div>

            <Card style={{marginBottom:14,background:"linear-gradient(135deg,rgba(230,126,34,0.08),rgba(13,31,60,0.9))",border:`1px solid ${C.orange}33`}}>
              <div style={{fontSize:11,color:C.orange,letterSpacing:3,fontFamily:"'Cinzel',serif",marginBottom:12}}>{lc.sumT}</div>
              {lc.sumP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<lc.sumP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <button disabled={!bankDone} onClick={()=>{if(bankDone)setPhase("quiz");}} style={{opacity:bankDone?1:0.45,cursor:bankDone?"pointer":"not-allowed",width:"100%",padding:"17px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,letterSpacing:2,color:C.white,boxShadow:"0 10px 36px rgba(230,126,34,0.35)",marginTop:8}}>{t.startQuiz}</button>
            <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:8}}>{t.readFirst}</div>
          </>}

          {phase==="quiz"&&<>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:4}}>
                {lang==="fr"?"Quiz Final - Urgences Courantes":lang==="en"?"Final Quiz - Common Emergencies":lang==="es"?"Quiz Final - Emergencias Comunes":"Quiz Final - Emergências Comuns"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 2/6":"questions · Lesson 2/6"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(230,126,34,0.15)",border:`1px solid ${C.orange}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🛡️</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

            <div style={{textAlign:"center",fontSize:13,color:C.gold2,fontStyle:"italic",marginBottom:14,padding:"0 8px"}}>{lc.transition}</div>

            <button onClick={onNext} style={{width:"100%",padding:"16px 0",border:"none",borderRadius:16,background:`linear-gradient(135deg,${C.orange},${C.gold})`,fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,letterSpacing:2,color:C.white,cursor:"pointer",boxShadow:"0 8px 28px rgba(230,126,34,0.35)",marginBottom:10}}>
              {lang==="fr"?"LEÇON 3 - EPI & FACTEURS HUMAINS →":lang==="en"?"LESSON 3 - PPE & HUMAN FACTORS →":lang==="es"?"LECCIÓN 3 - EPP Y FACTORES HUMANOS →":"LIÇÃO 3 - EPI E FATORES HUMANOS →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
