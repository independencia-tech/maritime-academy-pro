import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - WHEN TO CONSIDER A FIXED SYSTEM
function WhenFixedSystemSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🧯", label:{fr:"Extincteur portatif insuffisant",en:"Portable extinguisher insufficient",es:"Extintor portátil insuficiente",pt:"Extintor portátil insuficiente"}, desc:{fr:"Le feu continue de croître malgré une attaque portative correctement réalisée (Leçon 3).",en:"The fire keeps growing despite a correctly performed portable attack (Lesson 3).",es:"El fuego sigue creciendo pese a un ataque portátil correctamente realizado (Lección 3).",pt:"O fogo continua a crescer apesar de um ataque portátil corretamente realizado (Lição 3)."} },
    { id:2, icon:"📏", label:{fr:"Feu au-delà de l'attaque directe",en:"Fire beyond direct attack",es:"Fuego más allá del ataque directo",pt:"Fogo além do ataque direto"}, desc:{fr:"L'ampleur du feu dépasse ce qu'une équipe peut raisonnablement approcher en sécurité.",en:"The fire's scale exceeds what a team can reasonably approach safely.",es:"La magnitud del fuego supera lo que un equipo puede acercarse razonablemente con seguridad.",pt:"A dimensão do fogo ultrapassa o que uma equipa pode razoavelmente abordar com segurança."} },
    { id:3, icon:"🔒", label:{fr:"Un espace qui peut être scellé",en:"A space that can be sealed",es:"Un espacio que puede sellarse",pt:"Um espaço que pode ser selado"}, desc:{fr:"Salle des machines, cale : le système fixe n'a de sens que si l'espace peut être réellement fermé hermétiquement.",en:"Engine room, cargo hold: a fixed system only makes sense if the space can actually be sealed airtight.",es:"Sala de máquinas, bodega: el sistema fijo solo tiene sentido si el espacio puede cerrarse realmente hermético.",pt:"Casa das máquinas, porão: o sistema fixo só faz sentido se o espaço puder ser realmente fechado hermeticamente."} },
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

// SVG 2 - BEFORE RELEASE: THE NON-NEGOTIABLES
function BeforeReleaseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"👥", label:{fr:"Rassemblement et appel nominal complet",en:"Muster and full head count",es:"Reunión y recuento nominal completo",pt:"Reunião e chamada nominal completa"}, desc:{fr:"Chaque personne doit être physiquement comptabilisée avant d'envisager le déclenchement.",en:"Every person must be physically accounted for before considering release.",es:"Cada persona debe ser contabilizada físicamente antes de considerar el disparo.",pt:"Cada pessoa deve ser fisicamente contabilizada antes de considerar o disparo."} },
    { id:2, icon:"⚙️", label:{fr:"Arrêt des machines et vannes carburant",en:"Machinery and fuel valve shutdown",es:"Parada de máquinas y válvulas de combustible",pt:"Paragem das máquinas e válvulas de combustível"}, desc:{fr:"Couper les machines et fermer les vannes carburant/hydraulique à distance pour ne pas alimenter le feu davantage.",en:"Shut down machinery and close remote fuel/hydraulic valves so nothing keeps feeding the fire.",es:"Parar las máquinas y cerrar las válvulas de combustible/hidráulicas a distancia para no alimentar más el fuego.",pt:"Parar as máquinas e fechar as válvulas de combustível/hidráulicas à distância para não alimentar mais o fogo."} },
    { id:3, icon:"🌬️", label:{fr:"Fermeture de la ventilation",en:"Ventilation closure",es:"Cierre de la ventilación",pt:"Fecho da ventilação"}, desc:{fr:"Tous les volets, écoutilles et ventilateurs doivent être fermés pour permettre à l'agent d'atteindre et de maintenir la concentration nécessaire.",en:"All flaps, hatches, and fans must be closed so the agent can reach and hold the required concentration.",es:"Todas las compuertas, escotillas y ventiladores deben cerrarse para que el agente alcance y mantenga la concentración necesaria.",pt:"Todas as comportas, escotilhas e ventiladores devem ser fechados para que o agente atinja e mantenha a concentração necessária."} },
    { id:4, icon:"🔁", label:{fr:"Second appel juste avant le déclenchement",en:"Second head count just before release",es:"Segundo recuento justo antes del disparo",pt:"Segunda chamada mesmo antes do disparo"}, desc:{fr:"Un ultime contrôle, immédiatement avant d'actionner le système, pour éliminer tout risque d'oubli.",en:"One final check, immediately before actuating the system, to eliminate any risk of someone being missed.",es:"Un último control, inmediatamente antes de accionar el sistema, para eliminar cualquier riesgo de olvido.",pt:"Um último controlo, imediatamente antes de acionar o sistema, para eliminar qualquer risco de esquecimento."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(77,166,255,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.blue2:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(77,166,255,0.1)",border:`1px solid ${C.blue2}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 3 - WHEN NOT TO TRIGGER
function WhenNotToTriggerSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🚫", label:{fr:"Sans confirmation totale que l'espace est vide",en:"Without total confirmation the space is empty",es:"Sin confirmación total de que el espacio está vacío",pt:"Sem confirmação total de que o espaço está vazio"}, desc:{fr:"Le doute, même minime, sur la présence de quelqu'un impose d'attendre et de revérifier, jamais de déclencher.",en:"Any doubt, even slight, about someone's presence requires waiting and rechecking, never releasing.",es:"Cualquier duda, aunque sea mínima, sobre la presencia de alguien exige esperar y volver a comprobar, nunca disparar.",pt:"Qualquer dúvida, mesmo mínima, sobre a presença de alguém exige esperar e reverificar, nunca disparar."} },
    { id:2, icon:"🚪", label:{fr:"Sans que l'espace puisse être réellement scellé",en:"Without the space being truly sealable",es:"Sin que el espacio pueda sellarse realmente",pt:"Sem que o espaço possa ser realmente selado"}, desc:{fr:"Si une ouverture majeure (porte, rampe, écoutille) ne peut pas être fermée, le système ne pourra jamais atteindre ni maintenir la concentration nécessaire.",en:"If a major opening (door, ramp, hatch) cannot be closed, the system will never reach or hold the required concentration.",es:"Si una abertura importante (puerta, rampa, escotilla) no puede cerrarse, el sistema nunca alcanzará ni mantendrá la concentración necesaria.",pt:"Se uma abertura importante (porta, rampa, escotilha) não puder ser fechada, o sistema nunca atingirá nem manterá a concentração necessária."} },
    { id:3, icon:"⏱️", label:{fr:"Comme premier réflexe si une attaque directe suffit encore",en:"As a first reflex if direct attack still suffices",es:"Como primer reflejo si un ataque directo todavía basta",pt:"Como primeiro reflexo se um ataque direto ainda basta"}, desc:{fr:"Le système fixe reste une escalade, pas un raccourci : il ne remplace pas une évaluation honnête de la situation.",en:"A fixed system remains an escalation, not a shortcut: it does not replace an honest assessment of the situation.",es:"El sistema fijo sigue siendo una escalada, no un atajo: no sustituye a una evaluación honesta de la situación.",pt:"O sistema fixo continua a ser uma escalada, não um atalho: não substitui uma avaliação honesta da situação."} },
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

// SVG 4 - AFTER RELEASE: NO UNIVERSAL TIMER
function AfterReleaseSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔒", label:{fr:"Maintenir l'espace fermé",en:"Keep the space closed",es:"Mantener el espacio cerrado",pt:"Manter o espaço fechado"}, desc:{fr:"Aucune ouverture, aucune ventilation tant que l'extinction n'est pas confirmée.",en:"No opening, no ventilation until extinction is confirmed.",es:"Ninguna apertura, ninguna ventilación hasta que se confirme la extinción.",pt:"Nenhuma abertura, nenhuma ventilação até a extinção ser confirmada."} },
    { id:2, icon:"🌡️", label:{fr:"Surveiller températures et limites",en:"Monitor temperatures and limits",es:"Vigilar temperaturas y límites",pt:"Vigiar temperaturas e limites"}, desc:{fr:"La durée d'attente dépend du système, du volume de l'espace, du feu et des instructions du navire : il n'existe pas de délai universel.",en:"The waiting time depends on the system, the space's volume, the fire, and the ship's instructions: there is no universal delay.",es:"El tiempo de espera depende del sistema, el volumen del espacio, el fuego y las instrucciones del buque: no existe un plazo universal.",pt:"O tempo de espera depende do sistema, do volume do espaço, do fogo e das instruções do navio: não existe um prazo universal."} },
    { id:3, icon:"❄️", label:{fr:"Boundary cooling si nécessaire",en:"Boundary cooling if required",es:"Boundary cooling si es necesario",pt:"Boundary cooling se necessário"}, desc:{fr:"Refroidir les cloisons adjacentes pour éviter la propagation par conduction pendant l'attente.",en:"Cool adjacent bulkheads to prevent spread by conduction during the wait.",es:"Enfriar los mamparos adyacentes para evitar la propagación por conducción durante la espera.",pt:"Arrefecer os anteparos adjacentes para evitar a propagação por condução durante a espera."} },
    { id:4, icon:"🚫", label:{fr:"Jamais de réouverture prématurée",en:"Never a premature reopening",es:"Nunca una reapertura prematura",pt:"Nunca uma reabertura prematura"}, desc:{fr:"Le CO2 refroidit très peu : ouvrir trop tôt peut relancer un feu que l'on croyait éteint.",en:"CO2 provides very little cooling: opening too soon can restart a fire believed extinguished.",es:"El CO2 enfría muy poco: abrir demasiado pronto puede reactivar un fuego que se creía apagado.",pt:"O CO2 arrefece muito pouco: abrir demasiado cedo pode reacender um fogo que se pensava apagado."} },
    { id:5, icon:"🥽", label:{fr:"Réentrée sur autorisation uniquement",en:"Re-entry only on authorization",es:"Reentrada solo con autorización",pt:"Reentrada apenas com autorização"}, desc:{fr:"ARI/SCBA, équipe adaptée, surveillant extérieur, communications établies, contrôle atmosphérique avant toute entrée.",en:"BA/SCBA, an appropriately equipped team, an outside attendant, established communications, atmosphere testing before any entry.",es:"ARI/SCBA, equipo adaptado, vigilante exterior, comunicaciones establecidas, control atmosférico antes de cualquier entrada.",pt:"ARI/SCBA, equipa adaptada, vigia exterior, comunicações estabelecidas, controlo atmosférico antes de qualquer entrada."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Aucun délai universel : la patience se mesure aux instructions du navire, pas à l'horloge.":lang==="en"?"No universal delay: patience is measured by the ship's instructions, not the clock.":lang==="es"?"Sin plazo universal: la paciencia se mide por las instrucciones del buque, no por el reloj.":"Sem prazo universal: a paciência mede-se pelas instruções do navio, não pelo relógio."}</div>
    </div>
  );
}

// EXERCISE - FIXED SYSTEM DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"c",q2:"b",q3:"a",q4:"c"};
  const qs = {
    fr:[
      {id:"q1",q:"Un extincteur portatif vient d'échouer à contrôler un feu en salle des machines. Que faites-vous ?\na) Chercher un deuxième extincteur portatif\nb) Attendre de voir si le feu diminue seul\nc) Envisager le système fixe, en respectant les non-négociables avant tout déclenchement"},
      {id:"q2",q:"Vous préparez le déclenchement du CO2. Un membre d'équipage n'a pas encore été formellement compté. Que faites-vous ?\na) Déclencher quand même, il a probablement déjà évacué\nb) Attendre et revérifier jusqu'à confirmation totale, ne jamais déclencher dans le doute\nc) Déclencher après un délai de précaution de 2 minutes"},
      {id:"q3",q:"Une grande ouverture de l'espace (porte, rampe) ne peut pas être fermée. Que faites-vous ?\na) Ne pas déclencher : l'espace ne peut pas être scellé, le système ne pourra pas être efficace\nb) Déclencher quand même, une partie du gaz suffira peut-être\nc) Fermer partiellement et déclencher"},
      {id:"q4",q:"Le CO2 a été libéré depuis quelques minutes. Que faites-vous ?\na) Ventiler dès que la fumée semble diminuer\nb) Ouvrir pour vérifier rapidement puis refermer\nc) Maintenir l'espace fermé, surveiller les températures, attendre l'autorisation avant toute réentrée"},
    ],
    en:[
      {id:"q1",q:"A portable extinguisher has just failed to control an engine room fire. What do you do?\na) Look for a second portable extinguisher\nb) Wait to see if the fire dies down on its own\nc) Consider the fixed system, respecting the non-negotiables before any release"},
      {id:"q2",q:"You are preparing to release CO2. One crew member has not yet been formally counted. What do you do?\na) Release anyway, they've probably already evacuated\nb) Wait and recheck until total confirmation, never release in doubt\nc) Release after a 2-minute precautionary delay"},
      {id:"q3",q:"A large opening in the space (door, ramp) cannot be closed. What do you do?\na) Do not release: the space cannot be sealed, the system will not be effective\nb) Release anyway, part of the gas might be enough\nc) Partially close it and release"},
      {id:"q4",q:"CO2 was released a few minutes ago. What do you do?\na) Ventilate as soon as smoke seems to decrease\nb) Open briefly to check then close again\nc) Keep the space closed, monitor temperatures, wait for authorization before any re-entry"},
    ],
    es:[
      {id:"q1",q:"Un extintor portátil acaba de fallar en controlar un fuego en la sala de máquinas. ¿Qué haces?\na) Buscar un segundo extintor portátil\nb) Esperar a ver si el fuego disminuye solo\nc) Considerar el sistema fijo, respetando los no negociables antes de cualquier disparo"},
      {id:"q2",q:"Estás preparando el disparo del CO2. Un tripulante todavía no ha sido contado formalmente. ¿Qué haces?\na) Disparar de todos modos, probablemente ya evacuó\nb) Esperar y volver a comprobar hasta confirmación total, nunca disparar con dudas\nc) Disparar tras un retraso de precaución de 2 minutos"},
      {id:"q3",q:"Una gran abertura del espacio (puerta, rampa) no puede cerrarse. ¿Qué haces?\na) No disparar: el espacio no puede sellarse, el sistema no será eficaz\nb) Disparar de todos modos, parte del gas quizás baste\nc) Cerrar parcialmente y disparar"},
      {id:"q4",q:"El CO2 se liberó hace unos minutos. ¿Qué haces?\na) Ventilar en cuanto el humo parezca disminuir\nb) Abrir brevemente para comprobar y volver a cerrar\nc) Mantener el espacio cerrado, vigilar las temperaturas, esperar autorización antes de cualquier reentrada"},
    ],
    pt:[
      {id:"q1",q:"Um extintor portátil acabou de falhar em controlar um fogo na casa das máquinas. O que fazes?\na) Procurar um segundo extintor portátil\nb) Esperar para ver se o fogo diminui sozinho\nc) Considerar o sistema fixo, respeitando os não negociáveis antes de qualquer disparo"},
      {id:"q2",q:"Estás a preparar o disparo do CO2. Um tripulante ainda não foi contado formalmente. O que fazes?\na) Disparar mesmo assim, provavelmente já evacuou\nb) Esperar e reverificar até confirmação total, nunca disparar com dúvidas\nc) Disparar após um atraso de precaução de 2 minutos"},
      {id:"q3",q:"Uma grande abertura do espaço (porta, rampa) não pode ser fechada. O que fazes?\na) Não disparar: o espaço não pode ser selado, o sistema não será eficaz\nb) Disparar mesmo assim, parte do gás talvez baste\nc) Fechar parcialmente e disparar"},
      {id:"q4",q:"O CO2 foi libertado há alguns minutos. O que fazes?\na) Ventilar assim que o fumo parecer diminuir\nb) Abrir brevemente para verificar e fechar de novo\nc) Manter o espaço fechado, vigiar as temperaturas, esperar autorização antes de qualquer reentrada"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (GRANDE COSTA D'AVORIO, NTSB)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Incendie du Grande Costa D'Avorio",teaser:"Rapport NTSB - espace non scellé, CO2 inefficace, 2 pompiers décédés",
      what:"À bord de ce navire roulier, un incendie se déclare dans les ponts garage. Le commandant décide de déclencher le CO2 dans la zone de protection incendie incluant le pont concerné : cette décision est jugée appropriée par l'enquête. Cependant, une porte hydraulique de garage sur l'un des ponts ne pouvait être fermée que depuis l'intérieur de la zone protégée, sans commande accessible depuis l'extérieur. Les garages n'ont donc pas pu être efficacement scellés, empêchant le CO2 d'atteindre et de maintenir la concentration nécessaire pour éteindre le feu. Des pompiers venus de la terre ont ensuite été envoyés dans les ponts remplis de fumée pour tenter d'intervenir. Deux d'entre eux se sont désorientés et n'ont pas retrouvé leur chemin hors de l'un des ponts enfumés : ils sont décédés.",
      cause:"• Une porte hydraulique de garage sans commande accessible depuis l'extérieur de la zone protégée\n• Les garages n'ont pas pu être efficacement scellés malgré une décision de déclenchement CO2 appropriée\n• Le CO2 n'a pas pu atteindre ni maintenir la concentration nécessaire pour éteindre le feu\n• Des pompiers ont été envoyés dans une zone où la fumée rendait l'orientation extrêmement difficile, et deux d'entre eux sont morts",
      lessons:"✓ A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually\n✓ La décision de déclencher le CO2 était correcte ; c'est la capacité de l'espace à être scellé qui a fait défaut\n✓ Toute ouverture non fermable compromet l'efficacité entière du système, pas seulement partiellement\n✓ Envoyer du personnel dans un espace enfumé où l'agent extincteur a été utilisé exige une extrême prudence, jamais une intervention improvisée",
      link:"🔗 Ce cas, documenté par le NTSB, illustre directement pourquoi la capacité réelle à sceller l'espace est une condition de survie, pas un détail technique secondaire."},
    en:{title:"Grande Costa D'Avorio Fire",teaser:"NTSB report - unsealed space, ineffective CO2, 2 firefighters died",
      what:"Aboard this ro-ro vessel, a fire broke out on the garage decks. The captain decided to release CO2 into the fire protection zone including the affected deck: this decision was found appropriate by the investigation. However, a hydraulic garage door on one of the decks could only be closed from inside the protected zone, with no control accessible from outside. The garages could therefore not be effectively sealed, preventing the CO2 from reaching and holding the concentration needed to extinguish the fire. Land-based firefighters were then sent into the smoke-filled decks to attempt intervention. Two of them became disoriented and could not find their way out of one of the smoke-filled decks: they died.",
      cause:"• A hydraulic garage door with no control accessible from outside the protected zone\n• The garages could not be effectively sealed despite an appropriate CO2 release decision\n• The CO2 could not reach or hold the concentration needed to extinguish the fire\n• Firefighters were sent into a zone where smoke made orientation extremely difficult, and two of them died",
      lessons:"✓ A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually\n✓ The decision to release CO2 was correct; it was the space's ability to be sealed that failed\n✓ Any opening that cannot be closed compromises the entire effectiveness of the system, not just partially\n✓ Sending personnel into a smoke-filled space where the extinguishing agent has been used requires extreme caution, never an improvised intervention",
      link:"🔗 This NTSB-documented case directly illustrates why the actual ability to seal the space is a condition of survival, not a secondary technical detail."},
    es:{title:"Incendio del Grande Costa D'Avorio",teaser:"Informe NTSB - espacio no sellado, CO2 ineficaz, 2 bomberos muertos",
      what:"A bordo de este buque ro-ro, se declaró un incendio en las cubiertas de garaje. El capitán decidió liberar CO2 en la zona de protección contra incendios que incluía la cubierta afectada: la investigación consideró esta decisión apropiada. Sin embargo, una puerta hidráulica de garaje en una de las cubiertas solo podía cerrarse desde dentro de la zona protegida, sin control accesible desde el exterior. Por tanto, los garajes no pudieron sellarse eficazmente, impidiendo que el CO2 alcanzara y mantuviera la concentración necesaria para apagar el fuego. Bomberos de tierra fueron enviados después a las cubiertas llenas de humo para intentar intervenir. Dos de ellos se desorientaron y no encontraron la salida de una de las cubiertas llenas de humo: murieron.",
      cause:"• Una puerta hidráulica de garaje sin control accesible desde fuera de la zona protegida\n• Los garajes no pudieron sellarse eficazmente pese a una decisión de disparo de CO2 apropiada\n• El CO2 no pudo alcanzar ni mantener la concentración necesaria para apagar el fuego\n• Se envió a bomberos a una zona donde el humo dificultaba enormemente la orientación, y dos de ellos murieron",
      lessons:"✓ A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually\n✓ La decisión de liberar CO2 fue correcta; lo que falló fue la capacidad del espacio para sellarse\n✓ Cualquier abertura que no pueda cerrarse compromete toda la eficacia del sistema, no solo parcialmente\n✓ Enviar personal a un espacio lleno de humo donde se ha usado el agente extintor exige una extrema precaución, nunca una intervención improvisada",
      link:"🔗 Este caso documentado por el NTSB ilustra directamente por qué la capacidad real de sellar el espacio es una condición de supervivencia, no un detalle técnico secundario."},
    pt:{title:"Incêndio do Grande Costa D'Avorio",teaser:"Relatório NTSB - espaço não selado, CO2 ineficaz, 2 bombeiros mortos",
      what:"A bordo deste navio ro-ro, deflagrou um incêndio nos conveses de garagem. O comandante decidiu libertar CO2 na zona de proteção contra incêndios que incluía o convés afetado: a investigação considerou esta decisão apropriada. No entanto, uma porta hidráulica de garagem num dos conveses só podia ser fechada a partir do interior da zona protegida, sem controlo acessível a partir do exterior. As garagens não puderam, por isso, ser efetivamente seladas, impedindo o CO2 de atingir e manter a concentração necessária para apagar o fogo. Bombeiros terrestres foram depois enviados para os conveses cheios de fumo para tentar intervir. Dois deles desorientaram-se e não encontraram o caminho de saída de um dos conveses cheios de fumo: morreram.",
      cause:"• Uma porta hidráulica de garagem sem controlo acessível a partir do exterior da zona protegida\n• As garagens não puderam ser efetivamente seladas apesar de uma decisão de disparo de CO2 apropriada\n• O CO2 não conseguiu atingir nem manter a concentração necessária para apagar o fogo\n• Foram enviados bombeiros para uma zona onde o fumo dificultava extremamente a orientação, e dois deles morreram",
      lessons:"✓ A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually\n✓ A decisão de libertar CO2 foi correta; foi a capacidade do espaço para ser selado que falhou\n✓ Qualquer abertura que não possa ser fechada compromete toda a eficácia do sistema, não apenas parcialmente\n✓ Enviar pessoal para um espaço cheio de fumo onde o agente extintor foi usado exige extrema cautela, nunca uma intervenção improvisada",
      link:"🔗 Este caso documentado pelo NTSB ilustra diretamente por que a capacidade real de selar o espaço é uma condição de sobrevivência, não um detalhe técnico secundário."},
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
    {q:"Que signifie le principe 'Two Moments Decide Everything: Before You Release, and Before You Reopen' ?",opts:["Seul le moment du déclenchement compte vraiment","La même prudence s'applique avant de déclencher ET avant de rouvrir l'espace","Il ne faut jamais rouvrir un espace après un déclenchement","Ce principe ne concerne que les feux électriques"],correct:1,expl:"Les deux moments (déclenchement et réouverture) exigent la même rigueur, car chacun peut coûter des vies s'il est précipité."},
    {q:"Quand envisager un système fixe selon cette leçon ?",opts:["Dès la moindre fumée, systématiquement","Quand l'extincteur portatif est insuffisant, que le feu dépasse l'attaque directe, et que l'espace peut être scellé","Uniquement sur ordre du port","Jamais, un extincteur portatif suffit toujours"],correct:1,expl:"Ces trois conditions réunies justifient d'envisager un système fixe, jamais une seule isolément."},
    {q:"Que faut-il faire avant tout déclenchement d'un système fixe ?",opts:["Rien, le système peut être déclenché immédiatement","Rassemblement et appel nominal complet, arrêt des machines, fermeture de la ventilation, second appel juste avant","Uniquement fermer la porte principale","Attendre l'autorisation du port uniquement"],correct:1,expl:"Ces non-négociables garantissent qu'aucune personne ne reste dans l'espace au moment du déclenchement."},
    {q:"Pourquoi un second appel nominal juste avant le déclenchement ?",opts:["Ce n'est pas nécessaire si le premier appel a été fait","Pour éliminer tout risque d'oubli entre le premier appel et l'actionnement réel du système","Uniquement pour respecter une procédure administrative","Pour gagner du temps"],correct:1,expl:"Un délai existe toujours entre le premier appel et le déclenchement réel ; le second appel élimine ce risque."},
    {q:"Que ne faut-il jamais faire face au moindre doute sur la présence de quelqu'un dans l'espace ?",opts:["Déclencher quand même après un court délai","Déclencher le système","Attendre et revérifier jusqu'à confirmation totale","Demander à un collègue de vérifier rapidement puis déclencher"],correct:2,expl:"Le moindre doute impose d'attendre et de revérifier, jamais de déclencher."},
    {q:"Pourquoi une ouverture qui ne peut pas être fermée empêche-t-elle l'efficacité du système ?",opts:["Ce n'est pas un problème réel","L'agent ne peut alors ni atteindre ni maintenir la concentration nécessaire pour éteindre le feu","Cela accélère l'extinction","Uniquement un problème esthétique"],correct:1,expl:"Une ouverture non fermable compromet l'efficacité entière du système, comme illustré dans le cas d'étude."},
    {q:"Un système fixe est-il un premier réflexe même si une attaque directe reste possible ?",opts:["Oui, toujours utiliser le système fixe en priorité","Non, le système fixe reste une escalade, jamais un raccourci face à une situation encore gérable","Oui, c'est plus rapide","Non, un système fixe ne doit jamais être utilisé"],correct:1,expl:"Le système fixe est réservé aux situations qui dépassent réellement l'attaque directe."},
    {q:"Après le déclenchement, existe-t-il un délai universel avant de rouvrir l'espace ?",opts:["Oui, toujours 20 à 30 minutes","Non, la durée dépend du système, du volume de l'espace, du feu et des instructions du navire","Oui, toujours 24 heures exactement","Non, on peut rouvrir dès que la fumée diminue visuellement"],correct:1,expl:"Il n'existe pas de délai universel : chaque situation impose sa propre évaluation."},
    {q:"Pourquoi ne jamais ventiler ou rouvrir prématurément après un déclenchement CO2 ?",opts:["Ce n'est pas dangereux, seulement inutile","Le CO2 refroidit très peu, une réouverture trop tôt peut relancer un feu que l'on croyait éteint","Cela n'a aucun effet sur le feu","Il faut toujours ventiler le plus vite possible"],correct:1,expl:"Le CO2 agit par étouffement, pas par refroidissement : le risque de reprise du feu reste réel."},
    {q:"Que faut-il faire pendant l'attente après un déclenchement, si nécessaire ?",opts:["Rien du tout","Surveiller les températures et pratiquer le boundary cooling si requis","Ouvrir régulièrement pour vérifier visuellement","Envoyer immédiatement quelqu'un sans protection"],correct:1,expl:"La surveillance thermique et le refroidissement des cloisons adjacentes limitent la propagation pendant l'attente."},
    {q:"Quelles conditions sont nécessaires avant toute réentrée dans l'espace après un déclenchement ?",opts:["Aucune condition particulière","ARI/SCBA, équipe adaptée, surveillant extérieur, communications établies, contrôle atmosphérique","Uniquement un masque à poussière","Uniquement l'autorisation verbale d'un collègue"],correct:1,expl:"Toutes ces conditions réunies protègent l'équipe qui entre dans un espace potentiellement encore dangereux."},
    {q:"Dans le cas du Grande Costa D'Avorio, la décision de déclencher le CO2 était-elle appropriée ?",opts:["Non, elle n'aurait jamais dû être prise","Oui, la décision elle-même était jugée appropriée par l'enquête ; c'est la capacité à sceller l'espace qui a fait défaut","Oui, mais uniquement par chance","Non, le CO2 n'aurait jamais dû être présent à bord"],correct:1,expl:"L'enquête a jugé la décision de déclenchement appropriée ; le problème résidait dans l'impossibilité de sceller l'espace."},
    {q:"Pourquoi le CO2 n'a-t-il pas pu éteindre le feu dans ce cas ?",opts:["Il y avait trop peu de CO2 à bord","Une porte hydraulique ne pouvait être fermée que depuis l'intérieur, empêchant de sceller efficacement l'espace","Le feu était trop récent","Le CO2 était périmé"],correct:1,expl:"L'ouverture non fermable a empêché le gaz d'atteindre et de maintenir la concentration nécessaire."},
    {q:"Que signifie 'A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually' ?",opts:["Le système fonctionne toujours, quelle que soit la situation","Sceller complètement l'espace est une condition de fonctionnement, et toute entrée après déclenchement doit être extrêmement prudente","On peut entrer librement après déclenchement","Le CO2 protège automatiquement quiconque entre dans l'espace"],correct:1,expl:"Cette phrase résume le message central du cas d'étude et de la leçon."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée à l'opération réelle d'un système fixe ?",opts:["Oui, il équivaut à un entraînement pratique complet","Non, il enseigne des principes de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne les points de décision, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'Two Moments Decide Everything: Before You Release, and Before You Reopen' mean?",opts:["Only the moment of release truly matters","The same caution applies before releasing AND before reopening the space","A space should never be reopened after a release","This principle only concerns electrical fires"],correct:1,expl:"Both moments (release and reopening) require the same rigor, as each can cost lives if rushed."},
    {q:"When should a fixed system be considered according to this lesson?",opts:["At the slightest smoke, systematically","When the portable extinguisher is insufficient, the fire exceeds direct attack, and the space can be sealed","Only on the port's order","Never, a portable extinguisher is always enough"],correct:1,expl:"These three conditions combined justify considering a fixed system, never a single one in isolation."},
    {q:"What must be done before releasing a fixed system?",opts:["Nothing, the system can be released immediately","Muster and full head count, machinery shutdown, ventilation closure, second head count just before","Only close the main door","Only wait for the port's authorization"],correct:1,expl:"These non-negotiables ensure no one remains in the space at the moment of release."},
    {q:"Why a second head count just before release?",opts:["It isn't necessary if the first count was done","To eliminate any risk of someone being missed between the first count and the actual release","Only to follow an administrative procedure","To buy time"],correct:1,expl:"There is always a delay between the first count and the actual release; the second count eliminates this risk."},
    {q:"What must never be done facing the slightest doubt about someone's presence in the space?",opts:["Release anyway after a short delay","Release the system","Wait and recheck until total confirmation","Ask a colleague to check quickly then release"],correct:2,expl:"The slightest doubt requires waiting and rechecking, never releasing."},
    {q:"Why does an opening that cannot be closed prevent the system's effectiveness?",opts:["It isn't a real problem","The agent then cannot reach or hold the concentration needed to extinguish the fire","It speeds up extinction","Only an aesthetic problem"],correct:1,expl:"An unclosable opening compromises the entire effectiveness of the system, as illustrated in the case study."},
    {q:"Is a fixed system a first reflex even if direct attack remains possible?",opts:["Yes, always use the fixed system as a priority","No, a fixed system remains an escalation, never a shortcut facing a still manageable situation","Yes, it's faster","No, a fixed system should never be used"],correct:1,expl:"The fixed system is reserved for situations that truly exceed direct attack."},
    {q:"After release, is there a universal delay before reopening the space?",opts:["Yes, always 20 to 30 minutes","No, the duration depends on the system, the space's volume, the fire, and the ship's instructions","Yes, always exactly 24 hours","No, you can reopen as soon as smoke visually decreases"],correct:1,expl:"There is no universal delay: every situation requires its own assessment."},
    {q:"Why never ventilate or reopen prematurely after a CO2 release?",opts:["It isn't dangerous, only useless","CO2 provides very little cooling, reopening too soon can restart a fire believed extinguished","It has no effect on the fire","You should always ventilate as fast as possible"],correct:1,expl:"CO2 acts by smothering, not cooling: the risk of the fire restarting remains real."},
    {q:"What should be done during the wait after a release, if necessary?",opts:["Nothing at all","Monitor temperatures and perform boundary cooling if required","Open regularly to check visually","Immediately send someone in without protection"],correct:1,expl:"Thermal monitoring and cooling adjacent bulkheads limit spread during the wait."},
    {q:"What conditions are necessary before any re-entry into the space after a release?",opts:["No particular conditions","BA/SCBA, an appropriately equipped team, an outside attendant, established communications, atmosphere testing","Only a dust mask","Only a colleague's verbal authorization"],correct:1,expl:"All these conditions together protect the team entering a potentially still dangerous space."},
    {q:"In the Grande Costa D'Avorio case, was the decision to release CO2 appropriate?",opts:["No, it should never have been made","Yes, the decision itself was found appropriate by the investigation; it was the space's sealing ability that failed","Yes, but only by luck","No, CO2 should never have been on board"],correct:1,expl:"The investigation found the release decision appropriate; the problem lay in the inability to seal the space."},
    {q:"Why couldn't the CO2 extinguish the fire in this case?",opts:["There was too little CO2 on board","A hydraulic door could only be closed from inside, preventing the space from being effectively sealed","The fire was too recent","The CO2 was expired"],correct:1,expl:"The unclosable opening prevented the gas from reaching and holding the required concentration."},
    {q:"What does 'A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually' mean?",opts:["The system always works, regardless of the situation","Fully sealing the space is a condition for it to work, and any entry after release must be extremely cautious","You can freely enter after release","CO2 automatically protects anyone entering the space"],correct:1,expl:"This phrase sums up the central message of the case study and the lesson."},
    {q:"Does this module teach a replacement for certified practical BST training in actual fixed system operation?",opts:["Yes, it is equivalent to complete practical training","No, it teaches decision principles, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches decision points, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Two Moments Decide Everything: Before You Release, and Before You Reopen'?",opts:["Solo el momento del disparo importa de verdad","La misma precaución se aplica antes de disparar Y antes de reabrir el espacio","Nunca se debe reabrir un espacio tras un disparo","Este principio solo concierne a los fuegos eléctricos"],correct:1,expl:"Ambos momentos (disparo y reapertura) exigen el mismo rigor, ya que cada uno puede costar vidas si se precipita."},
    {q:"¿Cuándo considerar un sistema fijo según esta lección?",opts:["Ante el más mínimo humo, sistemáticamente","Cuando el extintor portátil es insuficiente, el fuego supera el ataque directo, y el espacio puede sellarse","Solo por orden del puerto","Nunca, un extintor portátil siempre basta"],correct:1,expl:"Estas tres condiciones combinadas justifican considerar un sistema fijo, nunca una sola aisladamente."},
    {q:"¿Qué hay que hacer antes de disparar un sistema fijo?",opts:["Nada, el sistema puede dispararse de inmediato","Reunión y recuento nominal completo, parada de máquinas, cierre de la ventilación, segundo recuento justo antes","Solo cerrar la puerta principal","Solo esperar la autorización del puerto"],correct:1,expl:"Estos no negociables garantizan que nadie permanezca en el espacio en el momento del disparo."},
    {q:"¿Por qué un segundo recuento justo antes del disparo?",opts:["No es necesario si se hizo el primer recuento","Para eliminar cualquier riesgo de olvido entre el primer recuento y el disparo real","Solo para cumplir un procedimiento administrativo","Para ganar tiempo"],correct:1,expl:"Siempre existe un retraso entre el primer recuento y el disparo real; el segundo recuento elimina este riesgo."},
    {q:"¿Qué nunca hay que hacer ante la más mínima duda sobre la presencia de alguien en el espacio?",opts:["Disparar de todos modos tras un breve retraso","Disparar el sistema","Esperar y volver a comprobar hasta confirmación total","Pedir a un compañero que compruebe rápido y luego disparar"],correct:2,expl:"La más mínima duda exige esperar y volver a comprobar, nunca disparar."},
    {q:"¿Por qué una abertura que no puede cerrarse impide la eficacia del sistema?",opts:["No es un problema real","El agente no puede entonces alcanzar ni mantener la concentración necesaria para apagar el fuego","Acelera la extinción","Solo un problema estético"],correct:1,expl:"Una abertura no cerrable compromete toda la eficacia del sistema, como se ilustra en el caso de estudio."},
    {q:"¿Es un sistema fijo un primer reflejo incluso si el ataque directo sigue siendo posible?",opts:["Sí, usar siempre el sistema fijo con prioridad","No, el sistema fijo sigue siendo una escalada, nunca un atajo ante una situación todavía manejable","Sí, es más rápido","No, nunca debe usarse un sistema fijo"],correct:1,expl:"El sistema fijo se reserva para situaciones que realmente superan el ataque directo."},
    {q:"Tras el disparo, ¿existe un plazo universal antes de reabrir el espacio?",opts:["Sí, siempre 20 a 30 minutos","No, la duración depende del sistema, el volumen del espacio, el fuego y las instrucciones del buque","Sí, siempre exactamente 24 horas","No, se puede reabrir en cuanto el humo disminuya visualmente"],correct:1,expl:"No existe un plazo universal: cada situación exige su propia evaluación."},
    {q:"¿Por qué nunca ventilar o reabrir prematuramente tras un disparo de CO2?",opts:["No es peligroso, solo inútil","El CO2 enfría muy poco, reabrir demasiado pronto puede reactivar un fuego que se creía apagado","No tiene ningún efecto sobre el fuego","Siempre hay que ventilar lo más rápido posible"],correct:1,expl:"El CO2 actúa por sofocación, no por enfriamiento: el riesgo de que el fuego se reactive sigue siendo real."},
    {q:"¿Qué hay que hacer durante la espera tras un disparo, si es necesario?",opts:["Nada en absoluto","Vigilar las temperaturas y practicar boundary cooling si es requerido","Abrir regularmente para comprobar visualmente","Enviar de inmediato a alguien sin protección"],correct:1,expl:"La vigilancia térmica y el enfriamiento de los mamparos adyacentes limitan la propagación durante la espera."},
    {q:"¿Qué condiciones son necesarias antes de cualquier reentrada al espacio tras un disparo?",opts:["Ninguna condición particular","ARI/SCBA, equipo adaptado, vigilante exterior, comunicaciones establecidas, control atmosférico","Solo una mascarilla contra el polvo","Solo la autorización verbal de un compañero"],correct:1,expl:"Todas estas condiciones juntas protegen al equipo que entra en un espacio potencialmente aún peligroso."},
    {q:"En el caso del Grande Costa D'Avorio, ¿fue apropiada la decisión de disparar el CO2?",opts:["No, nunca debería haberse tomado","Sí, la propia decisión fue considerada apropiada por la investigación; lo que falló fue la capacidad de sellar el espacio","Sí, pero solo por suerte","No, el CO2 nunca debería haber estado a bordo"],correct:1,expl:"La investigación consideró apropiada la decisión de disparo; el problema estuvo en la imposibilidad de sellar el espacio."},
    {q:"¿Por qué el CO2 no pudo apagar el fuego en este caso?",opts:["Había muy poco CO2 a bordo","Una puerta hidráulica solo podía cerrarse desde dentro, impidiendo sellar eficazmente el espacio","El fuego era demasiado reciente","El CO2 estaba caducado"],correct:1,expl:"La abertura no cerrable impidió que el gas alcanzara y mantuviera la concentración necesaria."},
    {q:"¿Qué significa 'A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually'?",opts:["El sistema siempre funciona, sea cual sea la situación","Sellar completamente el espacio es una condición de funcionamiento, y toda entrada tras el disparo debe ser extremadamente cautelosa","Se puede entrar libremente tras el disparo","El CO2 protege automáticamente a quien entra en el espacio"],correct:1,expl:"Esta frase resume el mensaje central del caso de estudio y de la lección."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada en el manejo real de un sistema fijo?",opts:["Sí, equivale a un entrenamiento práctico completo","No, enseña principios de decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña puntos de decisión, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'Two Moments Decide Everything: Before You Release, and Before You Reopen'?",opts:["Só o momento do disparo importa realmente","A mesma precaução aplica-se antes de disparar E antes de reabrir o espaço","Nunca se deve reabrir um espaço após um disparo","Este princípio só diz respeito a incêndios elétricos"],correct:1,expl:"Ambos os momentos (disparo e reabertura) exigem o mesmo rigor, pois cada um pode custar vidas se precipitado."},
    {q:"Quando considerar um sistema fixo segundo esta lição?",opts:["Ao mínimo fumo, sistematicamente","Quando o extintor portátil é insuficiente, o fogo ultrapassa o ataque direto, e o espaço pode ser selado","Só por ordem do porto","Nunca, um extintor portátil basta sempre"],correct:1,expl:"Estas três condições combinadas justificam considerar um sistema fixo, nunca uma isolada."},
    {q:"O que deve ser feito antes de disparar um sistema fixo?",opts:["Nada, o sistema pode ser disparado de imediato","Reunião e chamada nominal completa, paragem das máquinas, fecho da ventilação, segunda chamada mesmo antes","Só fechar a porta principal","Só esperar pela autorização do porto"],correct:1,expl:"Estes não negociáveis garantem que ninguém permanece no espaço no momento do disparo."},
    {q:"Por que uma segunda chamada nominal mesmo antes do disparo?",opts:["Não é necessário se a primeira chamada foi feita","Para eliminar qualquer risco de esquecimento entre a primeira chamada e o disparo real","Só para cumprir um procedimento administrativo","Para ganhar tempo"],correct:1,expl:"Existe sempre um atraso entre a primeira chamada e o disparo real; a segunda chamada elimina este risco."},
    {q:"O que nunca se deve fazer perante a mínima dúvida sobre a presença de alguém no espaço?",opts:["Disparar mesmo assim após um curto atraso","Disparar o sistema","Esperar e reverificar até confirmação total","Pedir a um colega para verificar rapidamente e depois disparar"],correct:2,expl:"A mínima dúvida exige esperar e reverificar, nunca disparar."},
    {q:"Por que uma abertura que não pode ser fechada impede a eficácia do sistema?",opts:["Não é um problema real","O agente não consegue então atingir nem manter a concentração necessária para apagar o fogo","Acelera a extinção","Só um problema estético"],correct:1,expl:"Uma abertura não fechável compromete toda a eficácia do sistema, como ilustrado no caso de estudo."},
    {q:"Um sistema fixo é um primeiro reflexo mesmo que o ataque direto continue possível?",opts:["Sim, usar sempre o sistema fixo com prioridade","Não, o sistema fixo continua a ser uma escalada, nunca um atalho perante uma situação ainda gerível","Sim, é mais rápido","Não, nunca se deve usar um sistema fixo"],correct:1,expl:"O sistema fixo é reservado para situações que realmente ultrapassam o ataque direto."},
    {q:"Após o disparo, existe um prazo universal antes de reabrir o espaço?",opts:["Sim, sempre 20 a 30 minutos","Não, a duração depende do sistema, do volume do espaço, do fogo e das instruções do navio","Sim, sempre exatamente 24 horas","Não, pode-se reabrir assim que o fumo diminuir visualmente"],correct:1,expl:"Não existe um prazo universal: cada situação exige a sua própria avaliação."},
    {q:"Por que nunca ventilar ou reabrir prematuramente após um disparo de CO2?",opts:["Não é perigoso, só inútil","O CO2 arrefece muito pouco, reabrir demasiado cedo pode reacender um fogo que se pensava apagado","Não tem qualquer efeito sobre o fogo","Deve-se sempre ventilar o mais depressa possível"],correct:1,expl:"O CO2 atua por abafamento, não por arrefecimento: o risco de o fogo reacender continua real."},
    {q:"O que fazer durante a espera após um disparo, se necessário?",opts:["Nada de todo","Vigiar as temperaturas e praticar boundary cooling se necessário","Abrir regularmente para verificar visualmente","Enviar de imediato alguém sem proteção"],correct:1,expl:"A vigilância térmica e o arrefecimento dos anteparos adjacentes limitam a propagação durante a espera."},
    {q:"Que condições são necessárias antes de qualquer reentrada no espaço após um disparo?",opts:["Nenhuma condição particular","ARI/SCBA, equipa adaptada, vigia exterior, comunicações estabelecidas, controlo atmosférico","Só uma máscara contra o pó","Só a autorização verbal de um colega"],correct:1,expl:"Todas estas condições juntas protegem a equipa que entra num espaço potencialmente ainda perigoso."},
    {q:"No caso do Grande Costa D'Avorio, a decisão de disparar o CO2 foi apropriada?",opts:["Não, nunca deveria ter sido tomada","Sim, a própria decisão foi considerada apropriada pela investigação; foi a capacidade de selar o espaço que falhou","Sim, mas só por sorte","Não, o CO2 nunca deveria ter estado a bordo"],correct:1,expl:"A investigação considerou a decisão de disparo apropriada; o problema esteve na impossibilidade de selar o espaço."},
    {q:"Por que o CO2 não conseguiu apagar o fogo neste caso?",opts:["Havia muito pouco CO2 a bordo","Uma porta hidráulica só podia ser fechada por dentro, impedindo selar eficazmente o espaço","O fogo era demasiado recente","O CO2 estava fora de validade"],correct:1,expl:"A abertura não fechável impediu o gás de atingir e manter a concentração necessária."},
    {q:"O que significa 'A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually'?",opts:["O sistema funciona sempre, seja qual for a situação","Selar completamente o espaço é uma condição de funcionamento, e qualquer entrada após o disparo deve ser extremamente cautelosa","Pode-se entrar livremente após o disparo","O CO2 protege automaticamente quem entra no espaço"],correct:1,expl:"Esta frase resume a mensagem central do caso de estudo e da lição."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada na operação real de um sistema fixo?",opts:["Sim, equivale a um treino prático completo","Não, ensina princípios de decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina pontos de decisão, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que faut-il faire avant tout déclenchement d'un système fixe ?",opts:["Rien de particulier","Appel nominal complet, arrêt machines, fermeture ventilation, second appel avant","Uniquement fermer une porte","Attendre le port"],correct:1,expl:"Ces non-négociables garantissent qu'aucune personne ne reste dans l'espace."},
    {q:"Que faire face au moindre doute sur la présence de quelqu'un ?",opts:["Déclencher après un court délai","Attendre et revérifier jusqu'à confirmation totale","Déclencher immédiatement","Demander à un collègue de vérifier vite"],correct:1,expl:"Le moindre doute impose d'attendre, jamais de déclencher."},
    {q:"Existe-t-il un délai universel avant de rouvrir l'espace après déclenchement ?",opts:["Oui, toujours 20-30 minutes","Non, cela dépend du système, du volume, du feu et des instructions du navire","Oui, toujours 24h exactement","Non, dès que la fumée diminue"],correct:1,expl:"Aucun délai universel n'existe : chaque situation impose sa propre évaluation."},
    {q:"Dans le cas du Grande Costa D'Avorio, qu'est-ce qui a empêché le CO2 d'être efficace ?",opts:["Un manque de CO2 à bord","Une porte qui ne pouvait être fermée que depuis l'intérieur, empêchant de sceller l'espace","Le feu était trop récent","Le CO2 était périmé"],correct:1,expl:"L'espace n'a pas pu être scellé efficacement à cause de cette ouverture."},
    {q:"Quelle étape du MAP Fire Mindset cette leçon couvre-t-elle principalement ?",opts:["Detect","Fight","Command","Recover"],correct:1,expl:"Cette leçon développe l'attaque avec les moyens lourds quand portable ne suffit plus."},
  ],
  en:[
    {q:"What must be done before releasing a fixed system?",opts:["Nothing in particular","Full head count, machinery shutdown, ventilation closure, second count before","Only close a door","Wait for the port"],correct:1,expl:"These non-negotiables ensure no one remains in the space."},
    {q:"What do you do facing the slightest doubt about someone's presence?",opts:["Release after a short delay","Wait and recheck until total confirmation","Release immediately","Ask a colleague to check quickly"],correct:1,expl:"The slightest doubt requires waiting, never releasing."},
    {q:"Is there a universal delay before reopening the space after release?",opts:["Yes, always 20-30 minutes","No, it depends on the system, volume, fire, and the ship's instructions","Yes, always exactly 24h","No, as soon as smoke decreases"],correct:1,expl:"No universal delay exists: every situation requires its own assessment."},
    {q:"In the Grande Costa D'Avorio case, what prevented the CO2 from being effective?",opts:["A lack of CO2 on board","A door that could only be closed from inside, preventing the space from being sealed","The fire was too recent","The CO2 was expired"],correct:1,expl:"The space could not be effectively sealed because of this opening."},
    {q:"Which step of the MAP Fire Mindset does this lesson mainly cover?",opts:["Detect","Fight","Command","Recover"],correct:1,expl:"This lesson develops the heavy-means attack when portable is no longer enough."},
  ],
  es:[
    {q:"¿Qué hay que hacer antes de disparar un sistema fijo?",opts:["Nada en particular","Recuento completo, parada de máquinas, cierre de ventilación, segundo recuento antes","Solo cerrar una puerta","Esperar al puerto"],correct:1,expl:"Estos no negociables garantizan que nadie permanezca en el espacio."},
    {q:"¿Qué hacer ante la más mínima duda sobre la presencia de alguien?",opts:["Disparar tras un breve retraso","Esperar y volver a comprobar hasta confirmación total","Disparar de inmediato","Pedir a un compañero que compruebe rápido"],correct:1,expl:"La más mínima duda exige esperar, nunca disparar."},
    {q:"¿Existe un plazo universal antes de reabrir el espacio tras el disparo?",opts:["Sí, siempre 20-30 minutos","No, depende del sistema, el volumen, el fuego y las instrucciones del buque","Sí, siempre exactamente 24h","No, en cuanto el humo disminuye"],correct:1,expl:"No existe un plazo universal: cada situación exige su propia evaluación."},
    {q:"En el caso del Grande Costa D'Avorio, ¿qué impidió que el CO2 fuera eficaz?",opts:["Falta de CO2 a bordo","Una puerta que solo podía cerrarse desde dentro, impidiendo sellar el espacio","El fuego era demasiado reciente","El CO2 estaba caducado"],correct:1,expl:"El espacio no pudo sellarse eficazmente por esta abertura."},
    {q:"¿Qué etapa del MAP Fire Mindset cubre principalmente esta lección?",opts:["Detect","Fight","Command","Recover"],correct:1,expl:"Esta lección desarrolla el ataque con medios pesados cuando el portátil ya no basta."},
  ],
  pt:[
    {q:"O que deve ser feito antes de disparar um sistema fixo?",opts:["Nada em particular","Chamada completa, paragem das máquinas, fecho da ventilação, segunda chamada antes","Só fechar uma porta","Esperar pelo porto"],correct:1,expl:"Estes não negociáveis garantem que ninguém permanece no espaço."},
    {q:"O que fazer perante a mínima dúvida sobre a presença de alguém?",opts:["Disparar após um curto atraso","Esperar e reverificar até confirmação total","Disparar de imediato","Pedir a um colega para verificar rápido"],correct:1,expl:"A mínima dúvida exige esperar, nunca disparar."},
    {q:"Existe um prazo universal antes de reabrir o espaço após o disparo?",opts:["Sim, sempre 20-30 minutos","Não, depende do sistema, do volume, do fogo e das instruções do navio","Sim, sempre exatamente 24h","Não, assim que o fumo diminui"],correct:1,expl:"Não existe um prazo universal: cada situação exige a sua própria avaliação."},
    {q:"No caso do Grande Costa D'Avorio, o que impediu o CO2 de ser eficaz?",opts:["Falta de CO2 a bordo","Uma porta que só podia ser fechada por dentro, impedindo selar o espaço","O fogo era demasiado recente","O CO2 estava fora de validade"],correct:1,expl:"O espaço não pôde ser selado eficazmente por causa desta abertura."},
    {q:"Que etapa do MAP Fire Mindset esta lição cobre principalmente?",opts:["Detect","Fight","Command","Recover"],correct:1,expl:"Esta lição desenvolve o ataque com meios pesados quando o portátil já não basta."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Saurais-tu verifier, avant meme d'envisager un declenchement, si l'espace autour de toi peut reellement etre scelle ?",
    en:"Would you know, before even considering a release, whether the space around you can actually be sealed?",
    es:"¿Sabrias comprobar, incluso antes de considerar un disparo, si el espacio a tu alrededor puede realmente sellarse?",
    pt:"Saberias verificar, mesmo antes de considerar um disparo, se o espaco a tua volta pode realmente ser selado?",
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
      badge:"🔥 Safety · Firefighting · Leçon 4/7 · ⭐ Premium",
      title:"Fixed Fire-Fighting Systems",
      intro:"Cette leçon n'enseigne pas le fonctionnement technique du système CO2, déjà couvert en détail dans Engine. Elle enseigne les points de décision : quand l'envisager, les non-négociables avant déclenchement, et surtout quand ne jamais le déclencher.",
      p0:"TWO MOMENTS DECIDE EVERYTHING",s0t:"Before You Release, and Before You Reopen",
      s0:"La même prudence protège l'équipage à deux moments distincts : avant le déclenchement, et avant la réouverture de l'espace. Précipiter l'un ou l'autre peut coûter des vies.\n\nCOMMENT LE RECONNAÎTRE ? Un feu qui dépasse l'attaque portative, dans un espace pouvant être scellé.\nQUE FAIRE IMMÉDIATEMENT ? Appel nominal complet, arrêt des machines, fermeture de la ventilation, second appel avant déclenchement.\nQUELLE ERREUR L'AGGRAVE ? Déclencher sans confirmation totale, ou rouvrir avant que l'extinction ne soit certaine.\nQUAND DEMANDER DE L'AIDE ? Avant toute décision de déclenchement, en concertation commandant/chef mécanicien.",
      p1:"QUAND ENVISAGER UN SYSTÈME FIXE",s1t:"Trois conditions réunies, jamais une seule",
      s1:"Extincteur portatif insuffisant (Leçon 3), feu au-delà de l'attaque directe, et espace pouvant réellement être scellé.",
      p2:"AVANT LE DÉCLENCHEMENT",s2t:"Les non-négociables",
      s2:"Rassemblement et appel nominal complet, arrêt des machines et vannes carburant, fermeture de la ventilation, puis un second appel juste avant le déclenchement.",
      p3:"QUAND NE JAMAIS DÉCLENCHER",s3t:"Le message le plus important de cette leçon",
      s3:"Sans confirmation totale que l'espace est vide, sans que l'espace puisse être réellement scellé, ou comme simple raccourci alors qu'une attaque directe reste possible.",
      p4:"APRÈS LE DÉCLENCHEMENT",s4t:"Aucun délai universel, seulement de la rigueur",
      s4:"Maintenir l'espace fermé, surveiller les températures, pratiquer le boundary cooling si requis, ne jamais rouvrir prématurément, et n'entrer que sur autorisation avec ARI, équipe adaptée, surveillant extérieur et contrôle atmosphérique.",
      p5:"🎯 EXERCICE OPÉRATIONNEL",p6:"⚠️ CAS D'ÉTUDE",p7:"📝 BANQUE DE 15 QUESTIONS",p8:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 4",
      sumP:["Two Moments Decide Everything : la même rigueur avant de déclencher et avant de rouvrir","Un système fixe exige trois conditions réunies : portatif insuffisant, feu au-delà, espace scellable","Non-négociables avant déclenchement : appel nominal double, machines arrêtées, ventilation fermée","Jamais de déclenchement dans le doute, jamais si l'espace ne peut être scellé","Aucun délai universel après déclenchement : surveillance, patience, réentrée uniquement autorisée et protégée"],
      learnedP:["Les conditions pour envisager un système fixe","Les non-négociables avant déclenchement","Les situations où ne jamais déclencher","La discipline après déclenchement, sans délai universel","Le lien entre capacité de sceller l'espace et efficacité réelle du système"],
      safetyMsg:"A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 4/7 · ⭐ Premium",
      title:"Fixed Fire-Fighting Systems",
      intro:"This lesson does not teach the technical operation of the CO2 system, already covered in detail in Engine. It teaches the decision points: when to consider it, the non-negotiables before release, and above all when never to release it.",
      p0:"TWO MOMENTS DECIDE EVERYTHING",s0t:"Before You Release, and Before You Reopen",
      s0:"The same caution protects the crew at two distinct moments: before release, and before reopening the space. Rushing either one can cost lives.\n\nHOW DO I RECOGNIZE IT? A fire beyond portable attack, in a space that can be sealed.\nWHAT DO I DO IMMEDIATELY? Full head count, machinery shutdown, ventilation closure, second head count before release.\nWHAT MISTAKE MAKES IT WORSE? Releasing without total confirmation, or reopening before extinction is certain.\nWHEN MUST I ASK FOR HELP? Before any release decision, in consultation with the captain and chief engineer.",
      p1:"WHEN TO CONSIDER A FIXED SYSTEM",s1t:"Three conditions combined, never a single one",
      s1:"Portable extinguisher insufficient (Lesson 3), fire beyond direct attack, and a space that can truly be sealed.",
      p2:"BEFORE RELEASE",s2t:"The non-negotiables",
      s2:"Muster and full head count, machinery and fuel valve shutdown, ventilation closure, then a second head count just before release.",
      p3:"WHEN NEVER TO RELEASE",s3t:"The most important message of this lesson",
      s3:"Without total confirmation the space is empty, without the space being truly sealable, or as a mere shortcut when direct attack remains possible.",
      p4:"AFTER RELEASE",s4t:"No universal delay, only rigor",
      s4:"Keep the space closed, monitor temperatures, perform boundary cooling if required, never reopen prematurely, and enter only on authorization with BA, an appropriately equipped team, an outside attendant, and atmosphere testing.",
      p5:"🎯 OPERATIONAL EXERCISE",p6:"⚠️ CASE STUDY",p7:"📝 15-QUESTION BANK",p8:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 4",
      sumP:["Two Moments Decide Everything: the same rigor before release and before reopening","A fixed system requires three conditions combined: portable insufficient, fire beyond, sealable space","Non-negotiables before release: double head count, machinery shut down, ventilation closed","Never release in doubt, never if the space cannot be sealed","No universal delay after release: monitoring, patience, re-entry only authorized and protected"],
      learnedP:["The conditions for considering a fixed system","The non-negotiables before release","Situations where release should never happen","Discipline after release, with no universal delay","The link between sealing ability and the system's actual effectiveness"],
      safetyMsg:"A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 4/7 · ⭐ Premium",
      title:"Fixed Fire-Fighting Systems",
      intro:"Esta lección no enseña el funcionamiento técnico del sistema CO2, ya cubierto en detalle en Engine. Enseña los puntos de decisión: cuándo considerarlo, los no negociables antes del disparo, y sobre todo cuándo nunca dispararlo.",
      p0:"TWO MOMENTS DECIDE EVERYTHING",s0t:"Before You Release, and Before You Reopen",
      s0:"La misma precaución protege a la tripulación en dos momentos distintos: antes del disparo, y antes de reabrir el espacio. Precipitar cualquiera de los dos puede costar vidas.\n\n¿CÓMO RECONOCERLO? Un fuego más allá del ataque portátil, en un espacio que puede sellarse.\n¿QUÉ HACER DE INMEDIATO? Recuento nominal completo, parada de máquinas, cierre de la ventilación, segundo recuento antes del disparo.\n¿QUÉ ERROR LO AGRAVA? Disparar sin confirmación total, o reabrir antes de que la extinción sea segura.\n¿CUÁNDO PEDIR AYUDA? Antes de cualquier decisión de disparo, en consulta con el capitán y el jefe de máquinas.",
      p1:"CUÁNDO CONSIDERAR UN SISTEMA FIJO",s1t:"Tres condiciones combinadas, nunca una sola",
      s1:"Extintor portátil insuficiente (Lección 3), fuego más allá del ataque directo, y un espacio que puede sellarse de verdad.",
      p2:"ANTES DEL DISPARO",s2t:"Los no negociables",
      s2:"Reunión y recuento nominal completo, parada de máquinas y válvulas de combustible, cierre de la ventilación, luego un segundo recuento justo antes del disparo.",
      p3:"CUÁNDO NUNCA DISPARAR",s3t:"El mensaje más importante de esta lección",
      s3:"Sin confirmación total de que el espacio está vacío, sin que el espacio pueda sellarse de verdad, o como simple atajo cuando el ataque directo sigue siendo posible.",
      p4:"DESPUÉS DEL DISPARO",s4t:"Ningún plazo universal, solo rigor",
      s4:"Mantener el espacio cerrado, vigilar las temperaturas, practicar boundary cooling si es requerido, nunca reabrir prematuramente, y entrar solo con autorización con ARI, equipo adaptado, vigilante exterior y control atmosférico.",
      p5:"🎯 EJERCICIO OPERATIVO",p6:"⚠️ CASO DE ESTUDIO",p7:"📝 BANCO DE 15 PREGUNTAS",p8:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 4",
      sumP:["Two Moments Decide Everything: el mismo rigor antes de disparar y antes de reabrir","Un sistema fijo exige tres condiciones combinadas: portátil insuficiente, fuego más allá, espacio sellable","No negociables antes del disparo: doble recuento, máquinas paradas, ventilación cerrada","Nunca disparar con dudas, nunca si el espacio no puede sellarse","Ningún plazo universal tras el disparo: vigilancia, paciencia, reentrada solo autorizada y protegida"],
      learnedP:["Las condiciones para considerar un sistema fijo","Los no negociables antes del disparo","Las situaciones donde nunca disparar","La disciplina tras el disparo, sin plazo universal","El vínculo entre la capacidad de sellar el espacio y la eficacia real del sistema"],
      safetyMsg:"A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 4/7 · ⭐ Premium",
      title:"Fixed Fire-Fighting Systems",
      intro:"Esta lição não ensina o funcionamento técnico do sistema CO2, já coberto em detalhe em Engine. Ensina os pontos de decisão: quando considerá-lo, os não negociáveis antes do disparo, e sobretudo quando nunca dispará-lo.",
      p0:"TWO MOMENTS DECIDE EVERYTHING",s0t:"Before You Release, and Before You Reopen",
      s0:"A mesma cautela protege a tripulação em dois momentos distintos: antes do disparo, e antes de reabrir o espaço. Precipitar qualquer um dos dois pode custar vidas.\n\nCOMO RECONHECER? Um fogo além do ataque portátil, num espaço que pode ser selado.\nO QUE FAZER IMEDIATAMENTE? Chamada nominal completa, paragem das máquinas, fecho da ventilação, segunda chamada antes do disparo.\nQUE ERRO O AGRAVA? Disparar sem confirmação total, ou reabrir antes de a extinção ser certa.\nQUANDO PEDIR AJUDA? Antes de qualquer decisão de disparo, em consulta com o comandante e o chefe de máquinas.",
      p1:"QUANDO CONSIDERAR UM SISTEMA FIXO",s1t:"Três condições combinadas, nunca uma só",
      s1:"Extintor portátil insuficiente (Lição 3), fogo além do ataque direto, e um espaço que pode realmente ser selado.",
      p2:"ANTES DO DISPARO",s2t:"Os não negociáveis",
      s2:"Reunião e chamada nominal completa, paragem das máquinas e válvulas de combustível, fecho da ventilação, depois uma segunda chamada mesmo antes do disparo.",
      p3:"QUANDO NUNCA DISPARAR",s3t:"A mensagem mais importante desta lição",
      s3:"Sem confirmação total de que o espaço está vazio, sem que o espaço possa ser realmente selado, ou como simples atalho quando o ataque direto continua possível.",
      p4:"APÓS O DISPARO",s4t:"Nenhum prazo universal, só rigor",
      s4:"Manter o espaço fechado, vigiar as temperaturas, praticar boundary cooling se necessário, nunca reabrir prematuramente, e entrar apenas com autorização com ARI, equipa adaptada, vigia exterior e controlo atmosférico.",
      p5:"🎯 EXERCÍCIO OPERACIONAL",p6:"⚠️ CASO DE ESTUDO",p7:"📝 BANCO DE 15 PERGUNTAS",p8:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 4",
      sumP:["Two Moments Decide Everything: o mesmo rigor antes de disparar e antes de reabrir","Um sistema fixo exige três condições combinadas: portátil insuficiente, fogo além, espaço selável","Não negociáveis antes do disparo: dupla chamada, máquinas paradas, ventilação fechada","Nunca disparar com dúvidas, nunca se o espaço não puder ser selado","Nenhum prazo universal após o disparo: vigilância, paciência, reentrada apenas autorizada e protegida"],
      learnedP:["As condições para considerar um sistema fixo","Os não negociáveis antes do disparo","As situações onde nunca disparar","A disciplina após o disparo, sem prazo universal","A ligação entre a capacidade de selar o espaço e a eficácia real do sistema"],
      safetyMsg:"A fixed gas system only works if the protected space can be fully sealed. Once gas is released, no one enters casually.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L4({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 4/7":lang==="en"?"Lesson 4/7":lang==="es"?"Lección 4/7":"Lição 4/7"}</div>
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

            <SL icon="⏳" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⏳</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🎯" text={lc.p1} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎯 {lang==="fr"?"QUAND ENVISAGER - INTERACTIF":lang==="en"?"WHEN TO CONSIDER - INTERACTIVE":lang==="es"?"CUÁNDO CONSIDERAR - INTERACTIVO":"QUANDO CONSIDERAR - INTERATIVO"}</div><WhenFixedSystemSVG lang={lang}/></Card>

            <SL icon="✅" text={lc.p2} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>✅</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>✅ {lang==="fr"?"AVANT LE DÉCLENCHEMENT - INTERACTIF":lang==="en"?"BEFORE RELEASE - INTERACTIVE":lang==="es"?"ANTES DEL DISPARO - INTERACTIVO":"ANTES DO DISPARO - INTERATIVO"}</div><BeforeReleaseSVG lang={lang}/></Card>

            <SL icon="🚫" text={lc.p3} color={C.red}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.red}`,background:"linear-gradient(135deg,rgba(192,57,43,0.12),rgba(13,31,60,0.85))"}}><WhenNotToTriggerSVG lang={lang}/></Card>

            <SL icon="🌡️" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌡️ {lang==="fr"?"APRÈS LE DÉCLENCHEMENT - INTERACTIF":lang==="en"?"AFTER RELEASE - INTERACTIVE":lang==="es"?"DESPUÉS DEL DISPARO - INTERACTIVO":"APÓS O DISPARO - INTERATIVO"}</div><AfterReleaseSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p6} color={C.red}/>
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
                {lang==="fr"?"Quiz Final - Systèmes Fixes":lang==="en"?"Final Quiz - Fixed Systems":lang==="es"?"Quiz Final - Sistemas Fijos":"Quiz Final - Sistemas Fixos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 4/7":"questions · Lesson 4/7"}</div>
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
              {lang==="fr"?"LEÇON 5 - DÉTECTION & RÉPONSE INITIALE →":lang==="en"?"LESSON 5 - DETECTION & INITIAL RESPONSE →":lang==="es"?"LECCIÓN 5 - DETECCIÓN Y RESPUESTA INICIAL →":"LIÇÃO 5 - DETEÇÃO E RESPOSTA INICIAL →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
