import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - WHEN TO CONSIDER MEDEVAC
function WhenMedevacSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📉", label:{fr:"Dégradation malgré traitement",en:"Deterioration despite treatment",es:"Deterioro pese al tratamiento",pt:"Deterioração apesar do tratamento"}, desc:{fr:"La tendance des constantes (L5) montre une dégradation continue malgré les gestes déjà réalisés.",en:"The trend of vitals (L5) shows continuous deterioration despite the actions already taken.",es:"La tendencia de las constantes (L5) muestra un deterioro continuo pese a los gestos ya realizados.",pt:"A tendência das constantes (L5) mostra uma deterioração contínua apesar dos gestos já realizados."} },
    { id:2, icon:"📡", label:{fr:"Recommandation du TMAS",en:"TMAS recommendation",es:"Recomendación del TMAS",pt:"Recomendação do TMAS"}, desc:{fr:"Le médecin distant (L7) juge que la situation dépasse ce que le bord peut gérer seul.",en:"The remote doctor (L7) judges the situation exceeds what the ship can manage alone.",es:"El médico remoto (L7) considera que la situación supera lo que el buque puede gestionar solo.",pt:"O médico remoto (L7) considera que a situação ultrapassa o que o navio consegue gerir sozinho."} },
    { id:3, icon:"📦", label:{fr:"Moyens à bord épuisés",en:"Onboard resources exhausted",es:"Recursos a bordo agotados",pt:"Recursos a bordo esgotados"}, desc:{fr:"La pharmacie de bord (L7) ou les compétences disponibles ne permettent plus de stabiliser davantage.",en:"The medicine chest (L7) or available skills can no longer stabilize further.",es:"El botiquín (L7) o las competencias disponibles ya no permiten estabilizar más.",pt:"A farmácia de bordo (L7) ou as competências disponíveis já não permitem estabilizar mais."} },
    { id:4, icon:"⏱️", label:{fr:"Délai jusqu'au port trop long",en:"Time to port too long",es:"Tiempo hasta el puerto demasiado largo",pt:"Tempo até ao porto demasiado longo"}, desc:{fr:"L'état de la victime ne permet pas d'attendre l'arrivée au prochain port.",en:"The casualty's condition cannot wait until arrival at the next port.",es:"El estado de la víctima no permite esperar hasta la llegada al próximo puerto.",pt:"O estado da vítima não permite esperar até à chegada ao próximo porto."} },
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

// SVG 2 - PACKAGING THE CASUALTY
function PackagingSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const steps = [
    { id:1, icon:"🩹", label:{fr:"Sécuriser attelles & pansements",en:"Secure splints & dressings",es:"Asegurar férulas y vendajes",pt:"Fixar talas e pensos"}, desc:{fr:"Vérifier que rien ne bougera pendant le transport, sans jamais resserrer au point de couper la circulation.",en:"Check that nothing will move during transport, without ever tightening to the point of cutting off circulation.",es:"Comprobar que nada se moverá durante el transporte, sin apretar nunca hasta el punto de cortar la circulación.",pt:"Verificar que nada se vai mexer durante o transporte, sem nunca apertar ao ponto de cortar a circulação."} },
    { id:2, icon:"🧥", label:{fr:"Protéger du froid et des éléments",en:"Protect from cold and the elements",es:"Proteger del frío y los elementos",pt:"Proteger do frio e dos elementos"}, desc:{fr:"Couvertures bien fixées, la victime ne doit pas être exposée davantage pendant l'attente et le transfert.",en:"Blankets well secured, the casualty must not be further exposed during the wait and transfer.",es:"Mantas bien fijadas, la víctima no debe quedar más expuesta durante la espera y el traslado.",pt:"Cobertores bem fixados, a vítima não deve ficar mais exposta durante a espera e a transferência."} },
    { id:3, icon:"🧍", label:{fr:"Position adaptée à la blessure",en:"Position suited to the injury",es:"Posición adaptada a la lesión",pt:"Posição adaptada à lesão"}, desc:{fr:"Certaines blessures imposent une position précise : ne jamais improviser un changement de position sans raison claire.",en:"Some injuries require a precise position: never improvise a position change without a clear reason.",es:"Algunas lesiones exigen una posición precisa: nunca improvisar un cambio de posición sin una razón clara.",pt:"Algumas lesões exigem uma posição precisa: nunca improvisar uma mudança de posição sem uma razão clara."} },
    { id:4, icon:"📓", label:{fr:"Le Medical Log reste avec le patient",en:"The Medical Log stays with the patient",es:"El Medical Log permanece con el paciente",pt:"O Medical Log fica com o paciente"}, desc:{fr:"Le Medical Log (L7) accompagne physiquement la victime, il ne doit jamais être laissé à bord.",en:"The Medical Log (L7) physically accompanies the casualty, it must never be left on board.",es:"El Medical Log (L7) acompaña físicamente a la víctima, nunca debe quedarse a bordo.",pt:"O Medical Log (L7) acompanha fisicamente a vítima, nunca deve ficar a bordo."} },
  ];
  const sel_ = steps.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {steps.map(s=>(
          <div key={s.id} onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?"rgba(230,126,34,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?C.orange:"rgba(255,255,255,0.08)"}`}}>
            <div style={{fontSize:16}}>{s.icon}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(230,126,34,0.1)",border:`1px solid ${C.orange}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// SVG 3 - SECURE THE LANDING ZONE
function LandingZoneSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🎯", label:{fr:"Sécuriser la zone d'hélitreuillage",en:"Secure the landing zone",es:"Asegurar la zona de hélitransporte",pt:"Garantir a segurança da zona de helitransporte"}, desc:{fr:"Le point de départ de toute préparation : la zone entière doit être passée en revue avant l'arrivée de l'hélicoptère.",en:"The starting point of all preparation: the entire zone must be reviewed before the helicopter arrives.",es:"El punto de partida de toda preparación: toda la zona debe revisarse antes de que llegue el helicóptero.",pt:"O ponto de partida de toda a preparação: toda a zona deve ser revista antes de o helicóptero chegar."} },
    { id:2, icon:"📦", label:{fr:"Objets mobiles",en:"Loose objects",es:"Objetos móviles",pt:"Objetos móveis"}, desc:{fr:"Arrimer ou retirer tout ce qui peut être soulevé par le souffle du rotor : caisses, bâches, seaux, tout objet léger.",en:"Secure or remove anything that can be lifted by the rotor downwash: crates, tarps, buckets, any light object.",es:"Amarrar o retirar todo lo que pueda ser levantado por el soplo del rotor: cajas, lonas, cubos, cualquier objeto ligero.",pt:"Amarrar ou retirar tudo o que possa ser levantado pelo sopro do rotor: caixotes, lonas, baldes, qualquer objeto leve."} },
    { id:3, icon:"👥", label:{fr:"Personnel",en:"Personnel",es:"Personal",pt:"Pessoal"}, desc:{fr:"Toute personne non impliquée reste à l'écart, briefée sur les zones dangereuses des rotors.",en:"Anyone not involved stays clear, briefed on the dangerous rotor zones.",es:"Toda persona no implicada permanece alejada, informada sobre las zonas peligrosas de los rotores.",pt:"Qualquer pessoa não envolvida mantém-se afastada, informada sobre as zonas perigosas dos rotores."} },
    { id:4, icon:"📻", label:{fr:"Communications",en:"Communications",es:"Comunicaciones",pt:"Comunicações"}, desc:{fr:"Contact radio établi avec le pilote avant toute manœuvre, jamais d'antenne principale baissée sans instruction.",en:"Radio contact established with the pilot before any maneuver, never lower the main antenna without instruction.",es:"Contacto radio establecido con el piloto antes de cualquier maniobra, nunca bajar la antena principal sin instrucción.",pt:"Contacto rádio estabelecido com o piloto antes de qualquer manobra, nunca baixar a antena principal sem instrução."} },
    { id:5, icon:"💨", label:{fr:"Vent",en:"Wind",es:"Viento",pt:"Vento"}, desc:{fr:"Manche à air ou pennant hissé, visible du pilote, pour indiquer la direction du vent relatif.",en:"Windsock or pennant hoisted, visible to the pilot, to indicate relative wind direction.",es:"Manga de viento o gallardete izado, visible para el piloto, para indicar la dirección del viento relativo.",pt:"Manga de vento ou galhardete içado, visível para o piloto, para indicar a direção do vento relativo."} },
    { id:6, icon:"🚧", label:{fr:"Obstacles",en:"Obstacles",es:"Obstáculos",pt:"Obstáculos"}, desc:{fr:"Antennes, mâts et gréements abaissés ou sécurisés autour de la zone d'opération.",en:"Aerials, masts, and rigging lowered or secured around the operating area.",es:"Antenas, mástiles y aparejos bajados o asegurados alrededor del área de operación.",pt:"Antenas, mastros e cordame baixados ou fixados à volta da área de operação."} },
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

// SVG 4 - THE HANDOVER SHEET
function HandoverSheetSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🪪", label:{fr:"Patient",en:"Patient",es:"Paciente",pt:"Paciente"}, desc:{fr:"Identification claire de la victime.",en:"Clear identification of the casualty.",es:"Identificación clara de la víctima.",pt:"Identificação clara da vítima."} },
    { id:2, icon:"💥", label:{fr:"Mécanisme de la blessure",en:"Mechanism of injury",es:"Mecanismo de la lesión",pt:"Mecanismo da lesão"}, desc:{fr:"Ce qui s'est passé, comment, et dans quel contexte.",en:"What happened, how, and in what context.",es:"Qué pasó, cómo, y en qué contexto.",pt:"O que aconteceu, como, e em que contexto."} },
    { id:3, icon:"📋", label:{fr:"SAMPLE",en:"SAMPLE",es:"SAMPLE",pt:"SAMPLE"}, desc:{fr:"L'historique complet vu en Leçon 5.",en:"The full history seen in Lesson 5.",es:"El historial completo visto en la Lección 5.",pt:"O historial completo visto na Lição 5."} },
    { id:4, icon:"📈", label:{fr:"Évolution des constantes",en:"Vital signs trend",es:"Evolución de las constantes",pt:"Evolução das constantes"}, desc:{fr:"Toutes les mesures horodatées, jamais une seule valeur isolée.",en:"All time-stamped measurements, never a single isolated value.",es:"Todas las mediciones con hora, nunca un valor único aislado.",pt:"Todas as medições com hora, nunca um único valor isolado."} },
    { id:5, icon:"💉", label:{fr:"Traitement donné",en:"Treatment given",es:"Tratamiento administrado",pt:"Tratamento administrado"}, desc:{fr:"Chaque geste effectué, chaque médicament administré sous instruction TMAS.",en:"Every action performed, every medication given under TMAS instruction.",es:"Cada gesto realizado, cada medicamento administrado bajo instrucción del TMAS.",pt:"Cada gesto realizado, cada medicamento administrado sob instrução do TMAS."} },
    { id:6, icon:"🕐", label:{fr:"Chronologie",en:"Time line",es:"Cronología",pt:"Cronologia"}, desc:{fr:"L'ordre exact des événements, avec les heures précises de chaque étape.",en:"The exact order of events, with precise times for each step.",es:"El orden exacto de los eventos, con las horas precisas de cada etapa.",pt:"A ordem exata dos eventos, com as horas precisas de cada etapa."} },
    { id:7, icon:"❓", label:{fr:"Questions de l'équipe médicale",en:"Questions from the medical team",es:"Preguntas del equipo médico",pt:"Perguntas da equipa médica"}, desc:{fr:"Rester disponible pour répondre, même après avoir tout transmis : l'équipe médicale peut avoir besoin de précisions.",en:"Stay available to answer, even after everything has been transmitted: the medical team may need clarification.",es:"Permanecer disponible para responder, incluso después de haberlo transmitido todo: el equipo médico puede necesitar aclaraciones.",pt:"Permanecer disponível para responder, mesmo depois de tudo ter sido transmitido: a equipa médica pode precisar de esclarecimentos."} },
  ];
  const sel_ = items.find(i=>i.id===sel);
  return (
    <div>
      <div style={{fontSize:11,color:C.green,fontFamily:"'Cinzel',serif",letterSpacing:1,marginBottom:10,textAlign:"center"}}>{lang==="fr"?"FICHE DE TRANSMISSION":lang==="en"?"HANDOVER SHEET":lang==="es"?"HOJA DE TRANSMISIÓN":"FICHA DE TRANSMISSÃO"}</div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {items.map((i,idx)=>(
          <div key={i.id}>
            <div onClick={()=>setSel(sel===i.id?null:i.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===i.id?"rgba(30,138,74,0.15)":"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===i.id?C.green:"rgba(255,255,255,0.08)"}`}}>
              <div style={{fontSize:16}}>{i.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{i.label[lang]||i.label.fr}</div>
            </div>
            {idx<items.length-1&&<div style={{textAlign:"center",fontSize:11,color:C.muted,padding:"1px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:"rgba(30,138,74,0.1)",border:`1px solid ${C.green}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
    </div>
  );
}

// EXERCISE - MEDEVAC PREPARATION DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Un hélicoptère approche. Vous êtes chargé d'aider à préparer la zone. Que faites-vous en priorité ?\na) Attendre les instructions sans rien préparer\nb) Sécuriser la zone entière : objets mobiles, personnel, communications, vent, obstacles\nc) Se concentrer uniquement sur la victime"},
      {id:"q2",q:"Vous transportez la victime vers la zone d'hélitreuillage. Que faites-vous du Medical Log ?\na) Il accompagne physiquement la victime, jamais laissé à bord\nb) Il reste dans le bureau du capitaine\nc) Il est transmis oralement uniquement, sans document"},
      {id:"q3",q:"L'équipe médicale hélitreuillée pose des questions après avoir reçu votre transmission complète. Que faites-vous ?\na) Considérer que tout a déjà été dit, ne plus répondre\nb) S'irriter de devoir répéter\nc) Rester disponible pour préciser, la transmission n'est jamais totalement figée"},
      {id:"q4",q:"L'hélicoptère vient de repartir avec la victime. Que faites-vous ensuite (Review) ?\na) Rien, la mission est terminée\nb) Compléter le Medical Log, débriefer l'équipage, réarmer le matériel\nc) Ranger immédiatement sans en reparler"},
    ],
    en:[
      {id:"q1",q:"A helicopter is approaching. You are assigned to help prepare the landing zone. What is your priority?\na) Wait for instructions without preparing anything\nb) Secure the entire zone: loose objects, personnel, communications, wind, obstacles\nc) Focus only on the casualty"},
      {id:"q2",q:"You are moving the casualty to the winching zone. What do you do with the Medical Log?\na) It physically accompanies the casualty, never left on board\nb) It stays in the captain's office\nc) It is transmitted only orally, with no document"},
      {id:"q3",q:"The winched medical team asks questions after receiving your full handover. What do you do?\na) Consider everything already said, stop answering\nb) Get irritated at having to repeat\nc) Stay available to clarify, the handover is never fully closed"},
      {id:"q4",q:"The helicopter has just left with the casualty. What do you do next (Review)?\na) Nothing, the mission is over\nb) Complete the Medical Log, debrief the crew, rearm the equipment\nc) Put everything away immediately without discussing it"},
    ],
    es:[
      {id:"q1",q:"Un helicóptero se aproxima. Te han asignado ayudar a preparar la zona. ¿Cuál es tu prioridad?\na) Esperar instrucciones sin preparar nada\nb) Asegurar toda la zona: objetos móviles, personal, comunicaciones, viento, obstáculos\nc) Concentrarse solo en la víctima"},
      {id:"q2",q:"Estás trasladando a la víctima a la zona de hélitransporte. ¿Qué haces con el Medical Log?\na) Acompaña físicamente a la víctima, nunca se queda a bordo\nb) Se queda en la oficina del capitán\nc) Se transmite solo oralmente, sin documento"},
      {id:"q3",q:"El equipo médico hélitransportado hace preguntas tras recibir tu transmisión completa. ¿Qué haces?\na) Considerar que ya se dijo todo, dejar de responder\nb) Molestarse por tener que repetir\nc) Permanecer disponible para aclarar, la transmisión nunca está totalmente cerrada"},
      {id:"q4",q:"El helicóptero acaba de partir con la víctima. ¿Qué haces después (Review)?\na) Nada, la misión ha terminado\nb) Completar el Medical Log, hacer un debriefing de la tripulación, rearmar el material\nc) Guardar todo de inmediato sin comentarlo"},
    ],
    pt:[
      {id:"q1",q:"Um helicóptero está a aproximar-se. Foste destacado para ajudar a preparar a zona. Qual é a tua prioridade?\na) Esperar por instruções sem preparar nada\nb) Garantir a segurança de toda a zona: objetos móveis, pessoal, comunicações, vento, obstáculos\nc) Concentrar-se apenas na vítima"},
      {id:"q2",q:"Estás a transportar a vítima para a zona de helitransporte. O que fazes com o Medical Log?\na) Acompanha fisicamente a vítima, nunca fica a bordo\nb) Fica no gabinete do comandante\nc) É transmitido apenas oralmente, sem documento"},
      {id:"q3",q:"A equipa médica helitransportada faz perguntas depois de receber a tua transmissão completa. O que fazes?\na) Considerar que já foi tudo dito, deixar de responder\nb) Irritar-se por ter de repetir\nc) Permanecer disponível para esclarecer, a transmissão nunca está totalmente encerrada"},
      {id:"q4",q:"O helicóptero acabou de partir com a vítima. O que fazes a seguir (Review)?\na) Nada, a missão terminou\nb) Completar o Medical Log, debriefar a tripulação, rearmar o material\nc) Arrumar tudo de imediato sem falar sobre isso"},
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

// ACCIDENT CASE - COMPOSITE CASE (THE RUSHED TRANSFER)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Transfert Précipité",teaser:"Cas composite - d'excellents soins à bord, presque compromis par un transfert bâclé",
      what:"Après d'excellents premiers soins, l'équipage se précipite pour préparer le transfert dès l'annonce de l'arrivée de l'hélicoptère. Personne n'a sécurisé le pont : le souffle du rotor déplace une caisse, une bâche et un seau, créant un danger soudain pour le personnel présent. Au moment du hélitreuillage, le sauveteur descendu reçoit une transmission orale incomplète, sans le Medical Log, et doit reposer les questions de base sous pression du temps, alors que chaque minute compte pour la suite de la prise en charge.",
      cause:"• La zone n'a pas été sécurisée avant l'arrivée de l'hélicoptère : objets mobiles laissés en place\n• La précipitation a pris le pas sur la préparation méthodique du pont\n• Le Medical Log n'a pas accompagné physiquement la victime\n• La transmission orale incomplète a forcé le sauveteur à reposer les questions de base, perdant un temps précieux",
      lessons:"✓ Treatment does not end when the helicopter arrives. A safe handover is the final treatment you give\n✓ Secure the Landing Zone est la toute première étape, jamais une réflexion après coup\n✓ Le Medical Log doit toujours accompagner physiquement la victime, jamais laissé à bord\n✓ Good Information Saves Lives (L7) s'applique aussi au moment du transfert, pas seulement à l'appel TMAS",
      link:"🔗 Ce cas illustre directement pourquoi la préparation du pont et la transmission structurée sont les deux piliers d'un MEDEVAC réussi, autant que les soins qui les précèdent."},
    en:{title:"Case Study - The Rushed Transfer",teaser:"Composite case - excellent onboard care, nearly undone by a rushed transfer",
      what:"After excellent first aid, the crew rushes to prepare the transfer as soon as the helicopter's arrival is announced. No one has secured the deck: the rotor downwash moves a crate, a tarp, and a bucket, creating a sudden hazard for the personnel present. During the hoist, the winched-down rescuer receives an incomplete verbal handover, without the Medical Log, and has to ask the basic questions again under time pressure, while every minute matters for the care that follows.",
      cause:"• The zone was not secured before the helicopter's arrival: loose objects left in place\n• Haste took priority over methodical deck preparation\n• The Medical Log did not physically accompany the casualty\n• The incomplete verbal handover forced the rescuer to ask basic questions again, losing precious time",
      lessons:"✓ Treatment does not end when the helicopter arrives. A safe handover is the final treatment you give\n✓ Secure the Landing Zone is always the very first step, never an afterthought\n✓ The Medical Log must always physically accompany the casualty, never left on board\n✓ Good Information Saves Lives (L7) also applies at the moment of transfer, not just the TMAS call",
      link:"🔗 This case directly illustrates why deck preparation and structured handover are the two pillars of a successful MEDEVAC, just as much as the care that precedes them."},
    es:{title:"Caso de estudio - El Traslado Precipitado",teaser:"Caso compuesto - excelente atención a bordo, casi arruinada por un traslado apresurado",
      what:"Tras unos excelentes primeros auxilios, la tripulación se apresura a preparar el traslado en cuanto se anuncia la llegada del helicóptero. Nadie ha asegurado la cubierta: el soplo del rotor desplaza una caja, una lona y un cubo, creando un peligro repentino para el personal presente. Durante el hélitransporte, el rescatador descendido recibe una transmisión oral incompleta, sin el Medical Log, y tiene que volver a hacer las preguntas básicas bajo presión de tiempo, mientras cada minuto cuenta para la atención posterior.",
      cause:"• La zona no fue asegurada antes de la llegada del helicóptero: objetos móviles dejados en su sitio\n• La prisa primó sobre la preparación metódica de la cubierta\n• El Medical Log no acompañó físicamente a la víctima\n• La transmisión oral incompleta obligó al rescatador a volver a hacer las preguntas básicas, perdiendo tiempo precioso",
      lessons:"✓ Treatment does not end when the helicopter arrives. A safe handover is the final treatment you give\n✓ Secure the Landing Zone es siempre el primerísimo paso, nunca una idea de último momento\n✓ El Medical Log debe acompañar siempre físicamente a la víctima, nunca quedarse a bordo\n✓ Good Information Saves Lives (L7) también se aplica en el momento del traslado, no solo en la llamada al TMAS",
      link:"🔗 Este caso ilustra directamente por qué la preparación de la cubierta y la transmisión estructurada son los dos pilares de un MEDEVAC exitoso, tanto como los cuidados que los preceden."},
    pt:{title:"Caso de estudo - A Transferência Precipitada",teaser:"Caso composto - excelentes cuidados a bordo, quase comprometidos por uma transferência apressada",
      what:"Após excelentes primeiros socorros, a tripulação apressa-se a preparar a transferência assim que é anunciada a chegada do helicóptero. Ninguém garantiu a segurança do convés: o sopro do rotor desloca um caixote, uma lona e um balde, criando um perigo súbito para o pessoal presente. Durante o helitransporte, o socorrista descido recebe uma transmissão oral incompleta, sem o Medical Log, e tem de repetir as perguntas básicas sob pressão de tempo, enquanto cada minuto conta para os cuidados seguintes.",
      cause:"• A zona não foi assegurada antes da chegada do helicóptero: objetos móveis deixados no lugar\n• A pressa teve prioridade sobre a preparação metódica do convés\n• O Medical Log não acompanhou fisicamente a vítima\n• A transmissão oral incompleta obrigou o socorrista a repetir as perguntas básicas, perdendo tempo precioso",
      lessons:"✓ Treatment does not end when the helicopter arrives. A safe handover is the final treatment you give\n✓ Secure the Landing Zone é sempre o primeiríssimo passo, nunca uma reflexão tardia\n✓ O Medical Log deve sempre acompanhar fisicamente a vítima, nunca ficar a bordo\n✓ Good Information Saves Lives (L7) também se aplica no momento da transferência, não só na chamada ao TMAS",
      link:"🔗 Este caso ilustra diretamente por que a preparação do convés e a transmissão estruturada são os dois pilares de um MEDEVAC bem-sucedido, tanto quanto os cuidados que os precedem."},
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
export const BANK = {
  fr:[
    {q:"Que signifie le principe 'Treatment does not end when the helicopter arrives' ?",opts:["Les soins s'arrêtent dès que l'hélicoptère est en vue","Un transfert bien préparé et une transmission sûre font partie intégrante du traitement, pas une simple formalité après coup","Seul le médecin à terre compte désormais","Ce principe ne concerne que la météo"],correct:1,expl:"A safe handover is the final treatment you give : la vigilance ne s'arrête jamais avant la prise en charge complète."},
    {q:"Quel facteur, vu en Leçon 5, oriente la décision de MEDEVAC ?",opts:["La couleur du pont","La tendance des constantes montrant une dégradation continue","La météo uniquement","Le nombre de membres d'équipage disponibles"],correct:1,expl:"Une dégradation confirmée par la tendance (L5), malgré le traitement, est un facteur clé de décision."},
    {q:"Quelle est la toute première étape de la préparation de la zone d'atterrissage pour un hélicoptère ?",opts:["Hisser la manche à air uniquement","Sécuriser la zone entière : objets mobiles, personnel, communications, vent, obstacles","Attendre les instructions du pilote sans rien faire","Éteindre toutes les lumières du pont"],correct:1,expl:"Secure the Landing Zone est le point de départ de toute la préparation, pas une étape isolée."},
    {q:"Pourquoi le souffle du rotor est-il dangereux dans la zone d'atterrissage ?",opts:["Il ne l'est pas vraiment","Il peut déplacer des objets légers comme une caisse, une bâche ou un seau, créant un danger soudain","Il n'affecte que les vêtements","Il concerne uniquement l'hélicoptère lui-même"],correct:1,expl:"Le cas d'étude illustre directement comment des objets non arrimés deviennent dangereux sous le souffle du rotor."},
    {q:"Que faire des attelles et pansements avant un transfert ?",opts:["Les retirer pour gagner du temps","Vérifier qu'ils sont sécurisés pour le transport, sans jamais trop serrer","Les resserrer au maximum par précaution","Ne rien vérifier, ils ont déjà été posés"],correct:1,expl:"La vérification avant transfert évite qu'un pansement ou une attelle ne bouge, sans couper la circulation."},
    {q:"Où doit se trouver le Medical Log pendant le transfert de la victime ?",opts:["Il reste à bord dans le bureau du capitaine","Il accompagne physiquement la victime, jamais laissé à bord","Il est transmis uniquement à l'oral","Il n'est plus utile à ce stade"],correct:1,expl:"Le Medical Log doit voyager avec la victime pour que l'équipe médicale suivante ait l'historique complet."},
    {q:"Que contient la fiche de transmission (Handover Sheet) présentée dans cette leçon ?",opts:["Uniquement le nom du patient","Patient, mécanisme de blessure, SAMPLE, évolution des constantes, traitement donné, chronologie, questions de l'équipe médicale","Uniquement l'heure de l'accident","Uniquement la liste des médicaments"],correct:1,expl:"Une transmission complète couvre l'ensemble de ces sept éléments, pas seulement une partie."},
    {q:"Que faire si l'équipe médicale hélitreuillée pose des questions après la transmission complète ?",opts:["Refuser de répondre, tout a déjà été dit","Rester disponible pour préciser, la transmission n'est jamais totalement figée","S'irriter de devoir répéter","Rediriger vers le TMAS uniquement"],correct:1,expl:"Rester disponible pour toute clarification fait partie intégrante d'un bon handover."},
    {q:"Que fait l'équipage après le départ de l'hélicoptère avec la victime (phase Review) ?",opts:["Rien, la mission est terminée","Compléter le Medical Log, débriefer, réarmer le matériel, préparer le navire à une nouvelle urgence","Ranger immédiatement sans en reparler","Oublier l'incident au plus vite"],correct:1,expl:"La phase Review clôt le cycle et prépare l'équipage à la prochaine urgence éventuelle."},
    {q:"Pourquoi la phase Review est-elle importante pour tout le module ?",opts:["Elle ne l'est pas particulièrement","Elle rend concret le dernier maillon du MAP Medical Mindset : Assess, Protect, Act, Monitor, Handover, Review","Elle ne concerne que la paperasse administrative","Elle remplace le besoin de contacter un médecin la prochaine fois"],correct:1,expl:"Review est officiellement la dernière étape du MAP Medical Mindset, présentée dans cette leçon."},
    {q:"Que représente le MAP Medical Mindset présenté à la fin de cette leçon ?",opts:["Une check-list valable uniquement pour le MEDEVAC","Le cycle applicable à toute urgence médicale : Assess, Protect, Act, Monitor, Handover, Review","Un document réservé aux officiers médicaux","Une méthode obsolète remplacée par les leçons suivantes"],correct:1,expl:"Every medical emergency follows this same discipline : le cycle complet s'applique à toutes les situations vues dans le module."},
    {q:"Dans le cas d'étude du Transfert Précipité, quelle erreur a directement causé la perte de temps pendant le hélitreuillage ?",opts:["Une météo trop mauvaise","Une transmission orale incomplète, sans Medical Log, forçant à reposer les questions de base","Un problème mécanique de l'hélicoptère","Un refus de la victime de collaborer"],correct:1,expl:"L'absence de transmission structurée a directement causé la perte de temps précieux."},
    {q:"Que garantit une bonne préparation du transfert selon le message de sécurité de cette leçon ?",opts:["Que le patient guérira complètement","Que le prochain intervenant peut poursuivre les soins efficacement, ce qui est la vraie mesure d'un bon secourisme","Rien de concret","Que l'hélicoptère arrivera plus vite"],correct:1,expl:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care."},
    {q:"Ce module de secourisme STCW enseigne-t-il des compétences pratiques d'opérations hélicoptère ?",opts:["Oui, un entraînement pratique complet","Non, il enseigne les principes de préparation et de sécurité, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne mentionne rien sur le sujet"],correct:1,expl:"MAP reste au niveau des principes, jamais un remplacement de la formation pratique certifiée aux opérations hélicoptère."},
    {q:"Quelle phrase clôt officiellement le module Secourisme STCW ?",opts:["Le module ne se termine pas par une phrase particulière","A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act","Toutes les urgences se ressemblent","Ce module est terminé, rien à retenir"],correct:1,expl:"Cette phrase résume la philosophie de tout le module Secourisme STCW."},
  ],
  en:[
    {q:"What does the principle 'Treatment does not end when the helicopter arrives' mean?",opts:["Care stops as soon as the helicopter is in sight","A well-prepared transfer and a safe handover are part of the treatment itself, not an afterthought","Only the doctor ashore matters now","This principle only concerns weather"],correct:1,expl:"A safe handover is the final treatment you give: vigilance never stops before care is fully handed over."},
    {q:"Which factor, seen in Lesson 5, guides the MEDEVAC decision?",opts:["The color of the deck","The trend of vitals showing continuous deterioration","Weather only","The number of available crew members"],correct:1,expl:"Confirmed deterioration through trending (L5), despite treatment, is a key decision factor."},
    {q:"What is the very first step in preparing the landing zone for a helicopter?",opts:["Only hoisting the windsock","Securing the entire zone: loose objects, personnel, communications, wind, obstacles","Waiting for the pilot's instructions without doing anything","Turning off all deck lights"],correct:1,expl:"Secure the Landing Zone is the starting point of all preparation, not an isolated step."},
    {q:"Why is rotor downwash dangerous in the landing zone?",opts:["It isn't really","It can move light objects like a crate, a tarp, or a bucket, creating a sudden hazard","It only affects clothing","It only concerns the helicopter itself"],correct:1,expl:"The case study directly illustrates how unsecured objects become dangerous under rotor downwash."},
    {q:"What do you do with splints and dressings before a transfer?",opts:["Remove them to save time","Check they are secured for transport, without ever over-tightening","Tighten them as much as possible as a precaution","Check nothing, they've already been applied"],correct:1,expl:"Checking before transfer prevents a dressing or splint from moving, without cutting off circulation."},
    {q:"Where should the Medical Log be during the casualty's transfer?",opts:["It stays on board in the captain's office","It physically accompanies the casualty, never left on board","It is only transmitted verbally","It is no longer useful at this stage"],correct:1,expl:"The Medical Log must travel with the casualty so the next medical team has the full history."},
    {q:"What does the Handover Sheet presented in this lesson contain?",opts:["Only the patient's name","Patient, mechanism of injury, SAMPLE, vitals trend, treatment given, time line, questions from the medical team","Only the time of the accident","Only the list of medications"],correct:1,expl:"A complete handover covers all seven of these elements, not just part of them."},
    {q:"What do you do if the winched medical team asks questions after the full handover?",opts:["Refuse to answer, everything was already said","Stay available to clarify, the handover is never fully closed","Get irritated at having to repeat","Redirect to TMAS only"],correct:1,expl:"Staying available for any clarification is an integral part of a good handover."},
    {q:"What does the crew do after the helicopter leaves with the casualty (Review phase)?",opts:["Nothing, the mission is over","Complete the Medical Log, debrief, rearm the equipment, prepare the ship for a new emergency","Put everything away immediately without discussing it","Forget the incident as fast as possible"],correct:1,expl:"The Review phase closes the cycle and prepares the crew for the next possible emergency."},
    {q:"Why is the Review phase important for the whole module?",opts:["It isn't particularly important","It makes concrete the final link of the MAP Medical Mindset: Assess, Protect, Act, Monitor, Handover, Review","It only concerns administrative paperwork","It replaces the need to contact a doctor next time"],correct:1,expl:"Review is officially the last step of the MAP Medical Mindset, presented in this lesson."},
    {q:"What does the MAP Medical Mindset presented at the end of this lesson represent?",opts:["A checklist valid only for MEDEVAC","The cycle applicable to any medical emergency: Assess, Protect, Act, Monitor, Handover, Review","A document reserved for medical officers","An outdated method replaced by later lessons"],correct:1,expl:"Every medical emergency follows this same discipline: the full cycle applies to all situations seen in the module."},
    {q:"In the Rushed Transfer case study, what mistake directly caused the delay during the hoist?",opts:["Very bad weather","An incomplete verbal handover, without the Medical Log, forcing basic questions to be asked again","A mechanical problem with the helicopter","The casualty refusing to cooperate"],correct:1,expl:"The lack of a structured handover directly caused the loss of precious time."},
    {q:"What does good transfer preparation actually guarantee, according to this lesson's safety message?",opts:["That the patient will fully recover","That the next responder can continue care effectively, which is the true measure of good first aid","Nothing concrete","That the helicopter will arrive faster"],correct:1,expl:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care."},
    {q:"Does this STCW first aid module teach practical helicopter operation skills?",opts:["Yes, complete practical training","No, it teaches principles of preparation and safety, never a replacement for certified practical training","Yes, but only for officers","No, it doesn't mention the subject at all"],correct:1,expl:"MAP stays at the level of principles, never a replacement for certified practical helicopter operations training."},
    {q:"Which phrase officially closes the STCW First Aid module?",opts:["The module doesn't close with any particular phrase","A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act","All emergencies look alike","This module is over, nothing to remember"],correct:1,expl:"This phrase sums up the philosophy of the entire STCW First Aid module."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Treatment does not end when the helicopter arrives'?",opts:["Los cuidados se detienen en cuanto el helicóptero está a la vista","Un traslado bien preparado y una transmisión segura forman parte del tratamiento mismo, no son un añadido posterior","Solo importa el médico en tierra a partir de ahora","Este principio solo concierne al tiempo meteorológico"],correct:1,expl:"A safe handover is the final treatment you give: la vigilancia nunca se detiene antes de la entrega completa de los cuidados."},
    {q:"¿Qué factor, visto en la Lección 5, orienta la decisión de MEDEVAC?",opts:["El color de la cubierta","La tendencia de las constantes que muestra un deterioro continuo","Solo el tiempo meteorológico","El número de tripulantes disponibles"],correct:1,expl:"Un deterioro confirmado por la tendencia (L5), pese al tratamiento, es un factor clave de decisión."},
    {q:"¿Cuál es el primerísimo paso en la preparación de la zona de aterrizaje para un helicóptero?",opts:["Solo izar la manga de viento","Asegurar toda la zona: objetos móviles, personal, comunicaciones, viento, obstáculos","Esperar las instrucciones del piloto sin hacer nada","Apagar todas las luces de la cubierta"],correct:1,expl:"Secure the Landing Zone es el punto de partida de toda la preparación, no un paso aislado."},
    {q:"¿Por qué es peligroso el soplo del rotor en la zona de aterrizaje?",opts:["No lo es realmente","Puede desplazar objetos ligeros como una caja, una lona o un cubo, creando un peligro repentino","Solo afecta a la ropa","Solo concierne al propio helicóptero"],correct:1,expl:"El caso de estudio ilustra directamente cómo los objetos no asegurados se vuelven peligrosos bajo el soplo del rotor."},
    {q:"¿Qué hacer con las férulas y vendajes antes de un traslado?",opts:["Retirarlos para ganar tiempo","Comprobar que están asegurados para el transporte, sin apretar nunca en exceso","Apretarlos al máximo por precaución","No comprobar nada, ya han sido colocados"],correct:1,expl:"La comprobación antes del traslado evita que un vendaje o férula se mueva, sin cortar la circulación."},
    {q:"¿Dónde debe estar el Medical Log durante el traslado de la víctima?",opts:["Se queda a bordo en la oficina del capitán","Acompaña físicamente a la víctima, nunca se queda a bordo","Se transmite solo de forma oral","Ya no es útil en esta etapa"],correct:1,expl:"El Medical Log debe viajar con la víctima para que el próximo equipo médico tenga el historial completo."},
    {q:"¿Qué contiene la Hoja de Transmisión (Handover Sheet) presentada en esta lección?",opts:["Solo el nombre del paciente","Paciente, mecanismo de la lesión, SAMPLE, evolución de las constantes, tratamiento administrado, cronología, preguntas del equipo médico","Solo la hora del accidente","Solo la lista de medicamentos"],correct:1,expl:"Una transmisión completa cubre estos siete elementos, no solo una parte."},
    {q:"¿Qué hacer si el equipo médico hélitransportado hace preguntas tras la transmisión completa?",opts:["Negarse a responder, ya se dijo todo","Permanecer disponible para aclarar, la transmisión nunca está totalmente cerrada","Molestarse por tener que repetir","Redirigir solo al TMAS"],correct:1,expl:"Permanecer disponible para cualquier aclaración es parte integral de un buen handover."},
    {q:"¿Qué hace la tripulación tras la partida del helicóptero con la víctima (fase Review)?",opts:["Nada, la misión ha terminado","Completar el Medical Log, hacer un debriefing, rearmar el material, preparar el buque para una nueva urgencia","Guardar todo de inmediato sin comentarlo","Olvidar el incidente lo antes posible"],correct:1,expl:"La fase Review cierra el ciclo y prepara a la tripulación para la siguiente urgencia posible."},
    {q:"¿Por qué es importante la fase Review para todo el módulo?",opts:["No es particularmente importante","Hace concreto el último eslabón del MAP Medical Mindset: Assess, Protect, Act, Monitor, Handover, Review","Solo concierne al papeleo administrativo","Sustituye la necesidad de contactar a un médico la próxima vez"],correct:1,expl:"Review es oficialmente el último paso del MAP Medical Mindset, presentado en esta lección."},
    {q:"¿Qué representa el MAP Medical Mindset presentado al final de esta lección?",opts:["Una checklist válida solo para el MEDEVAC","El ciclo aplicable a toda urgencia médica: Assess, Protect, Act, Monitor, Handover, Review","Un documento reservado para oficiales médicos","Un método obsoleto sustituido por lecciones posteriores"],correct:1,expl:"Every medical emergency follows this same discipline: el ciclo completo se aplica a todas las situaciones vistas en el módulo."},
    {q:"En el caso de estudio del Traslado Precipitado, ¿qué error causó directamente la pérdida de tiempo durante el hélitransporte?",opts:["Un tiempo meteorológico muy malo","Una transmisión oral incompleta, sin Medical Log, obligando a repetir las preguntas básicas","Un problema mecánico del helicóptero","La víctima se negaba a colaborar"],correct:1,expl:"La falta de una transmisión estructurada causó directamente la pérdida de tiempo precioso."},
    {q:"¿Qué garantiza realmente una buena preparación del traslado, según el mensaje de seguridad de esta lección?",opts:["Que el paciente se curará completamente","Que el próximo interviniente puede continuar los cuidados eficazmente, lo cual es la verdadera medida de un buen socorrismo","Nada concreto","Que el helicóptero llegará más rápido"],correct:1,expl:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care."},
    {q:"¿Este módulo de primeros auxilios STCW enseña habilidades prácticas de operaciones de helicóptero?",opts:["Sí, un entrenamiento práctico completo","No, enseña principios de preparación y seguridad, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no menciona el tema en absoluto"],correct:1,expl:"MAP se mantiene en el nivel de los principios, nunca un sustituto de la formación práctica certificada en operaciones de helicóptero."},
    {q:"¿Qué frase cierra oficialmente el módulo de Primeros Auxilios STCW?",opts:["El módulo no cierra con ninguna frase particular","A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act","Todas las urgencias se parecen","Este módulo ha terminado, nada que recordar"],correct:1,expl:"Esta frase resume la filosofía de todo el módulo de Primeros Auxilios STCW."},
  ],
  pt:[
    {q:"O que significa o princípio 'Treatment does not end when the helicopter arrives'?",opts:["Os cuidados param assim que o helicóptero está à vista","Uma transferência bem preparada e uma transmissão segura fazem parte do próprio tratamento, não são uma reflexão tardia","Só importa o médico em terra a partir de agora","Este princípio só diz respeito ao tempo meteorológico"],correct:1,expl:"A safe handover is the final treatment you give: a vigilância nunca para antes da entrega completa dos cuidados."},
    {q:"Que fator, visto na Lição 5, orienta a decisão de MEDEVAC?",opts:["A cor do convés","A tendência das constantes mostrando uma deterioração contínua","Só o tempo meteorológico","O número de tripulantes disponíveis"],correct:1,expl:"Uma deterioração confirmada pela tendência (L5), apesar do tratamento, é um fator-chave de decisão."},
    {q:"Qual é o primeiríssimo passo na preparação da zona de aterragem para um helicóptero?",opts:["Apenas içar a manga de vento","Garantir a segurança de toda a zona: objetos móveis, pessoal, comunicações, vento, obstáculos","Esperar pelas instruções do piloto sem fazer nada","Apagar todas as luzes do convés"],correct:1,expl:"Secure the Landing Zone é o ponto de partida de toda a preparação, não um passo isolado."},
    {q:"Por que é que o sopro do rotor é perigoso na zona de aterragem?",opts:["Não é realmente","Pode deslocar objetos leves como um caixote, uma lona ou um balde, criando um perigo súbito","Só afeta a roupa","Só diz respeito ao próprio helicóptero"],correct:1,expl:"O caso de estudo ilustra diretamente como objetos não fixados se tornam perigosos sob o sopro do rotor."},
    {q:"O que fazer com talas e pensos antes de uma transferência?",opts:["Retirá-los para ganhar tempo","Verificar que estão fixados para o transporte, sem nunca apertar em excesso","Apertá-los ao máximo por precaução","Não verificar nada, já foram colocados"],correct:1,expl:"A verificação antes da transferência evita que um penso ou tala se mexa, sem cortar a circulação."},
    {q:"Onde deve estar o Medical Log durante a transferência da vítima?",opts:["Fica a bordo no gabinete do comandante","Acompanha fisicamente a vítima, nunca fica a bordo","É transmitido apenas oralmente","Já não é útil nesta fase"],correct:1,expl:"O Medical Log deve viajar com a vítima para que a próxima equipa médica tenha o historial completo."},
    {q:"O que contém a Ficha de Transmissão (Handover Sheet) apresentada nesta lição?",opts:["Apenas o nome do paciente","Paciente, mecanismo da lesão, SAMPLE, evolução das constantes, tratamento administrado, cronologia, perguntas da equipa médica","Apenas a hora do acidente","Apenas a lista de medicamentos"],correct:1,expl:"Uma transmissão completa cobre estes sete elementos, não apenas uma parte."},
    {q:"O que fazer se a equipa médica helitransportada faz perguntas após a transmissão completa?",opts:["Recusar responder, já foi tudo dito","Permanecer disponível para esclarecer, a transmissão nunca está totalmente encerrada","Irritar-se por ter de repetir","Redirecionar apenas para o TMAS"],correct:1,expl:"Permanecer disponível para qualquer esclarecimento faz parte integrante de um bom handover."},
    {q:"O que faz a tripulação depois de o helicóptero partir com a vítima (fase Review)?",opts:["Nada, a missão terminou","Completar o Medical Log, debriefar, rearmar o material, preparar o navio para uma nova urgência","Arrumar tudo de imediato sem falar sobre isso","Esquecer o incidente o mais depressa possível"],correct:1,expl:"A fase Review fecha o ciclo e prepara a tripulação para a próxima urgência possível."},
    {q:"Por que a fase Review é importante para todo o módulo?",opts:["Não é particularmente importante","Torna concreto o último elo do MAP Medical Mindset: Assess, Protect, Act, Monitor, Handover, Review","Só diz respeito à papelada administrativa","Substitui a necessidade de contactar um médico da próxima vez"],correct:1,expl:"Review é oficialmente o último passo do MAP Medical Mindset, apresentado nesta lição."},
    {q:"O que representa o MAP Medical Mindset apresentado no final desta lição?",opts:["Uma checklist válida apenas para o MEDEVAC","O ciclo aplicável a qualquer urgência médica: Assess, Protect, Act, Monitor, Handover, Review","Um documento reservado a oficiais médicos","Um método obsoleto substituído por lições posteriores"],correct:1,expl:"Every medical emergency follows this same discipline: o ciclo completo aplica-se a todas as situações vistas no módulo."},
    {q:"No caso de estudo da Transferência Precipitada, que erro causou diretamente o atraso durante o helitransporte?",opts:["Um tempo meteorológico muito mau","Uma transmissão oral incompleta, sem o Medical Log, obrigando a repetir as perguntas básicas","Um problema mecânico do helicóptero","A vítima recusava-se a colaborar"],correct:1,expl:"A falta de uma transmissão estruturada causou diretamente a perda de tempo precioso."},
    {q:"O que garante realmente uma boa preparação da transferência, segundo a mensagem de segurança desta lição?",opts:["Que o paciente vai recuperar totalmente","Que o próximo interveniente pode continuar os cuidados eficazmente, o que é a verdadeira medida de um bom socorrismo","Nada de concreto","Que o helicóptero chegará mais depressa"],correct:1,expl:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care."},
    {q:"Este módulo de primeiros socorros STCW ensina competências práticas de operações de helicóptero?",opts:["Sim, um treino prático completo","Não, ensina princípios de preparação e segurança, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não menciona o assunto de todo"],correct:1,expl:"A MAP mantém-se ao nível dos princípios, nunca um substituto da formação prática certificada em operações de helicóptero."},
    {q:"Que frase encerra oficialmente o módulo de Primeiros Socorros STCW?",opts:["O módulo não encerra com nenhuma frase particular","A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act","Todas as urgências se parecem","Este módulo terminou, nada a reter"],correct:1,expl:"Esta frase resume a filosofia de todo o módulo de Primeiros Socorros STCW."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
export const QUIZ = {
  fr:[
    {q:"Quelle est la toute première étape de la préparation de la zone d'atterrissage pour un hélicoptère ?",opts:["Hisser uniquement la manche à air","Sécuriser la zone entière : objets, personnel, communications, vent, obstacles","Attendre les instructions sans rien faire","Éteindre les lumières"],correct:1,expl:"Secure the Landing Zone est le point de départ de toute la préparation."},
    {q:"Où doit se trouver le Medical Log pendant le transfert ?",opts:["Il reste à bord","Il accompagne physiquement la victime","Il est transmis à l'oral seulement","Il n'est plus utile"],correct:1,expl:"Le Medical Log voyage toujours avec la victime."},
    {q:"Que contient la fiche de transmission présentée dans cette leçon ?",opts:["Uniquement le nom du patient","Patient, mécanisme, SAMPLE, constantes, traitement, chronologie, questions","Uniquement l'heure de l'accident","Rien de précis"],correct:1,expl:"Sept éléments structurent une transmission complète."},
    {q:"Que fait l'équipage après le départ de l'hélicoptère (Review) ?",opts:["Rien","Compléter le Medical Log, débriefer, réarmer le matériel","Oublier l'incident","Ranger sans en reparler"],correct:1,expl:"La phase Review clôt le cycle du MAP Medical Mindset."},
    {q:"Quel cycle le MAP Medical Mindset présente-t-il ?",opts:["Une check-list uniquement pour le MEDEVAC","Assess, Protect, Act, Monitor, Handover, Review",  "Un document réservé aux officiers","Une méthode obsolète"],correct:1,expl:"Every medical emergency follows this same discipline."},
  ],
  en:[
    {q:"What is the very first step in preparing the landing zone for a helicopter?",opts:["Only hoisting the windsock","Securing the entire zone: objects, personnel, communications, wind, obstacles","Waiting for instructions without doing anything","Turning off the lights"],correct:1,expl:"Secure the Landing Zone is the starting point of all preparation."},
    {q:"Where should the Medical Log be during the transfer?",opts:["It stays on board","It physically accompanies the casualty","It is transmitted verbally only","It is no longer useful"],correct:1,expl:"The Medical Log always travels with the casualty."},
    {q:"What does the handover sheet presented in this lesson contain?",opts:["Only the patient's name","Patient, mechanism, SAMPLE, vitals, treatment, time line, questions","Only the time of the accident","Nothing specific"],correct:1,expl:"Seven elements structure a complete handover."},
    {q:"What does the crew do after the helicopter leaves (Review)?",opts:["Nothing","Complete the Medical Log, debrief, rearm the equipment","Forget the incident","Put things away without discussing it"],correct:1,expl:"The Review phase closes the MAP Medical Mindset cycle."},
    {q:"What cycle does the MAP Medical Mindset present?",opts:["A checklist only for MEDEVAC","Assess, Protect, Act, Monitor, Handover, Review","A document reserved for officers","An outdated method"],correct:1,expl:"Every medical emergency follows this same discipline."},
  ],
  es:[
    {q:"¿Cuál es el primerísimo paso en la preparación de la zona de aterrizaje para un helicóptero?",opts:["Solo izar la manga de viento","Asegurar toda la zona: objetos, personal, comunicaciones, viento, obstáculos","Esperar instrucciones sin hacer nada","Apagar las luces"],correct:1,expl:"Secure the Landing Zone es el punto de partida de toda la preparación."},
    {q:"¿Dónde debe estar el Medical Log durante el traslado?",opts:["Se queda a bordo","Acompaña físicamente a la víctima","Se transmite solo de forma oral","Ya no es útil"],correct:1,expl:"El Medical Log siempre viaja con la víctima."},
    {q:"¿Qué contiene la hoja de transmisión presentada en esta lección?",opts:["Solo el nombre del paciente","Paciente, mecanismo, SAMPLE, constantes, tratamiento, cronología, preguntas","Solo la hora del accidente","Nada concreto"],correct:1,expl:"Siete elementos estructuran una transmisión completa."},
    {q:"¿Qué hace la tripulación tras la partida del helicóptero (Review)?",opts:["Nada","Completar el Medical Log, hacer debriefing, rearmar el material","Olvidar el incidente","Guardar todo sin comentarlo"],correct:1,expl:"La fase Review cierra el ciclo del MAP Medical Mindset."},
    {q:"¿Qué ciclo presenta el MAP Medical Mindset?",opts:["Una checklist solo para el MEDEVAC","Assess, Protect, Act, Monitor, Handover, Review","Un documento reservado para oficiales","Un método obsoleto"],correct:1,expl:"Every medical emergency follows this same discipline."},
  ],
  pt:[
    {q:"Qual é o primeiríssimo passo na preparação da zona de aterragem para um helicóptero?",opts:["Apenas içar a manga de vento","Garantir a segurança de toda a zona: objetos, pessoal, comunicações, vento, obstáculos","Esperar pelas instruções sem fazer nada","Apagar as luzes"],correct:1,expl:"Secure the Landing Zone é o ponto de partida de toda a preparação."},
    {q:"Onde deve estar o Medical Log durante a transferência?",opts:["Fica a bordo","Acompanha fisicamente a vítima","É transmitido apenas oralmente","Já não é útil"],correct:1,expl:"O Medical Log viaja sempre com a vítima."},
    {q:"O que contém a ficha de transmissão apresentada nesta lição?",opts:["Apenas o nome do paciente","Paciente, mecanismo, SAMPLE, constantes, tratamento, cronologia, perguntas","Apenas a hora do acidente","Nada de concreto"],correct:1,expl:"Sete elementos estruturam uma transmissão completa."},
    {q:"O que faz a tripulação depois de o helicóptero partir (Review)?",opts:["Nada","Completar o Medical Log, debriefar, rearmar o material","Esquecer o incidente","Arrumar tudo sem falar sobre isso"],correct:1,expl:"A fase Review fecha o ciclo do MAP Medical Mindset."},
    {q:"Que ciclo apresenta o MAP Medical Mindset?",opts:["Uma checklist apenas para o MEDEVAC","Assess, Protect, Act, Monitor, Handover, Review","Um documento reservado a oficiais","Um método obsoleto"],correct:1,expl:"Every medical emergency follows this same discipline."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Si un helicoptere arrivait a cote de ton navire dans les dix prochaines minutes, que preparerais-tu en premier, et qu'oublierais-tu probablement ?",
    en:"If a helicopter arrived alongside your vessel in the next ten minutes, what would you prepare first, and what would you probably forget?",
    es:"Si un helicoptero llegara junto a tu buque en los proximos diez minutos, ¿que prepararias primero, y que probablemente olvidarias?",
    pt:"Se um helicoptero chegasse ao lado do teu navio nos proximos dez minutos, o que prepararias primeiro, e o que provavelmente esquecerias?",
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
      badge:"🩺 Safety · STCW First Aid · Leçon 8/8 · ⭐ Premium",
      title:"MEDEVAC - Preparing the Casualty & Handover",
      intro:"Cette dernière leçon boucle le cycle complet du module : après avoir évalué, protégé, agi et surveillé, il reste à transmettre. C'est ici que tout ce qui a été appris prend tout son sens.",
      p0:"TREATMENT DOES NOT END WHEN THE HELICOPTER ARRIVES",s0t:"Le handover est le dernier soin que tu donnes",
      s0:"Un excellent traitement à bord peut être compromis par un transfert précipité. La vigilance ne s'arrête jamais avant que la prise en charge soit réellement transmise.\n\nCOMMENT LE RECONNAÎTRE ? Dégradation malgré traitement, recommandation du TMAS, moyens épuisés, délai trop long.\nQUE FAIRE IMMÉDIATEMENT ? Conditionner la victime, sécuriser la zone, préparer une transmission complète.\nQUELLE ERREUR L'AGGRAVE ? Précipiter le transfert sans sécuriser le pont ou sans transmission structurée.\nQUAND DEMANDER DE L'AIDE MÉDICALE ? Le MEDEVAC est déjà la réponse à cette question à ce stade du parcours.",
      p1:"QUAND ENVISAGER UN MEDEVAC",s1t:"Les facteurs de décision",
      s1:"Dégradation malgré traitement, recommandation du TMAS, moyens à bord épuisés, délai jusqu'au port trop long : ces facteurs, vus tout au long du module, se rejoignent ici.",
      p2:"CONDITIONNER LA VICTIME",s2t:"Préparer pour le transport, pas seulement pour l'instant présent",
      s2:"Sécuriser attelles et pansements, protéger du froid, adapter la position, et faire voyager le Medical Log avec la victime, jamais à bord.",
      p3:"SECURE THE LANDING ZONE",s3t:"Le tout premier geste, jamais une réflexion après coup",
      s3:"Objets mobiles, personnel, communications, vent, obstacles : la zone entière est passée en revue avant l'arrivée de l'hélicoptère, dans cet ordre précis.",
      p4:"THE HANDOVER SHEET",s4t:"Une transmission structurée, pas un résumé approximatif",
      s4:"Patient, mécanisme de blessure, SAMPLE, évolution des constantes, traitement donné, chronologie, questions de l'équipe médicale : sept éléments, dans cet ordre, pour une transmission complète.",
      p5:"REVIEW",s5t:"Le dernier maillon, souvent oublié",
      s5:"Après le départ de l'hélicoptère : compléter le Medical Log, débriefer l'équipage, réarmer le matériel, préparer le navire à une nouvelle urgence. Ce n'est qu'ainsi que le cycle est réellement complet.",
      p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 8",
      sumP:["Treatment does not end when the helicopter arrives : le handover est le dernier soin","MEDEVAC : dégradation, recommandation TMAS, moyens épuisés, ou délai trop long","Secure the Landing Zone : objets, personnel, communications, vent, obstacles, dans cet ordre","The Handover Sheet : 7 éléments pour une transmission complète, Medical Log inclus","Review : compléter, débriefer, réarmer, se préparer à la prochaine urgence"],
      learnedP:["Les facteurs de décision du MEDEVAC","Le conditionnement de la victime pour le transport","La sécurisation de la zone d'hélitreuillage","La fiche de transmission structurée","La phase Review et le cycle complet du MAP Medical Mindset"],
      safetyMsg:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care.",
    },
    en:{
      badge:"🩺 Safety · STCW First Aid · Lesson 8/8 · ⭐ Premium",
      title:"MEDEVAC - Preparing the Casualty & Handover",
      intro:"This final lesson closes the module's full cycle: after assessing, protecting, acting, and monitoring, all that remains is to hand over. This is where everything learned takes on its full meaning.",
      p0:"TREATMENT DOES NOT END WHEN THE HELICOPTER ARRIVES",s0t:"The handover is the final treatment you give",
      s0:"Excellent onboard care can be undone by a rushed transfer. Vigilance never stops until care is truly handed over.\n\nHOW DO I RECOGNIZE IT? Deterioration despite treatment, TMAS recommendation, resources exhausted, too long a delay.\nWHAT DO I DO IMMEDIATELY? Package the casualty, secure the zone, prepare a complete handover.\nWHAT MISTAKE MAKES IT WORSE? Rushing the transfer without securing the deck or without a structured handover.\nWHEN MUST I ASK FOR MEDICAL ASSISTANCE? MEDEVAC is already the answer to that question at this stage of the journey.",
      p1:"WHEN TO CONSIDER MEDEVAC",s1t:"The decision factors",
      s1:"Deterioration despite treatment, TMAS recommendation, onboard resources exhausted, too long a delay to port: these factors, seen throughout the module, converge here.",
      p2:"PACKAGING THE CASUALTY",s2t:"Preparing for transport, not just for the present moment",
      s2:"Securing splints and dressings, protecting from cold, adapting position, and having the Medical Log travel with the casualty, never left on board.",
      p3:"SECURE THE LANDING ZONE",s3t:"The very first action, never an afterthought",
      s3:"Loose objects, personnel, communications, wind, obstacles: the entire zone is reviewed before the helicopter arrives, in this precise order.",
      p4:"THE HANDOVER SHEET",s4t:"A structured handover, not a rough summary",
      s4:"Patient, mechanism of injury, SAMPLE, vitals trend, treatment given, time line, questions from the medical team: seven elements, in this order, for a complete handover.",
      p5:"REVIEW",s5t:"The final link, often forgotten",
      s5:"After the helicopter leaves: complete the Medical Log, debrief the crew, rearm the equipment, prepare the ship for a new emergency. Only then is the cycle truly complete.",
      p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 8",
      sumP:["Treatment does not end when the helicopter arrives: the handover is the final treatment","MEDEVAC: deterioration, TMAS recommendation, resources exhausted, or too long a delay","Secure the Landing Zone: objects, personnel, communications, wind, obstacles, in this order","The Handover Sheet: 7 elements for a complete handover, Medical Log included","Review: complete, debrief, rearm, prepare for the next emergency"],
      learnedP:["The MEDEVAC decision factors","Packaging the casualty for transport","Securing the landing zone","The structured handover sheet","The Review phase and the full MAP Medical Mindset cycle"],
      safetyMsg:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care.",
    },
    es:{
      badge:"🩺 Safety · STCW First Aid · Lección 8/8 · ⭐ Premium",
      title:"MEDEVAC - Preparing the Casualty & Handover",
      intro:"Esta última lección cierra el ciclo completo del módulo: tras evaluar, proteger, actuar y vigilar, solo queda transmitir. Aquí es donde todo lo aprendido cobra pleno sentido.",
      p0:"TREATMENT DOES NOT END WHEN THE HELICOPTER ARRIVES",s0t:"El handover es el último cuidado que das",
      s0:"Una excelente atención a bordo puede verse arruinada por un traslado precipitado. La vigilancia nunca se detiene hasta que la atención se transmite de verdad.\n\n¿CÓMO RECONOCERLO? Deterioro pese al tratamiento, recomendación del TMAS, recursos agotados, demora demasiado larga.\n¿QUÉ HACER DE INMEDIATO? Acondicionar a la víctima, asegurar la zona, preparar una transmisión completa.\n¿QUÉ ERROR LO AGRAVA? Precipitar el traslado sin asegurar la cubierta o sin una transmisión estructurada.\n¿CUÁNDO PEDIR AYUDA MÉDICA? El MEDEVAC ya es la respuesta a esta pregunta en esta etapa del recorrido.",
      p1:"CUÁNDO CONSIDERAR UN MEDEVAC",s1t:"Los factores de decisión",
      s1:"Deterioro pese al tratamiento, recomendación del TMAS, recursos a bordo agotados, demora demasiado larga hasta el puerto: estos factores, vistos a lo largo del módulo, convergen aquí.",
      p2:"ACONDICIONAR A LA VÍCTIMA",s2t:"Preparar para el transporte, no solo para el momento presente",
      s2:"Asegurar férulas y vendajes, proteger del frío, adaptar la posición, y hacer que el Medical Log viaje con la víctima, nunca quedarse a bordo.",
      p3:"SECURE THE LANDING ZONE",s3t:"El primerísimo gesto, nunca una idea de último momento",
      s3:"Objetos móviles, personal, comunicaciones, viento, obstáculos: toda la zona se revisa antes de que llegue el helicóptero, en este orden preciso.",
      p4:"THE HANDOVER SHEET",s4t:"Una transmisión estructurada, no un resumen aproximado",
      s4:"Paciente, mecanismo de la lesión, SAMPLE, evolución de las constantes, tratamiento administrado, cronología, preguntas del equipo médico: siete elementos, en este orden, para una transmisión completa.",
      p5:"REVIEW",s5t:"El último eslabón, a menudo olvidado",
      s5:"Tras la partida del helicóptero: completar el Medical Log, hacer un debriefing de la tripulación, rearmar el material, preparar el buque para una nueva urgencia. Solo así el ciclo está realmente completo.",
      p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 8",
      sumP:["Treatment does not end when the helicopter arrives: el handover es el último cuidado","MEDEVAC: deterioro, recomendación del TMAS, recursos agotados, o demora demasiado larga","Secure the Landing Zone: objetos, personal, comunicaciones, viento, obstáculos, en este orden","The Handover Sheet: 7 elementos para una transmisión completa, Medical Log incluido","Review: completar, hacer debriefing, rearmar, prepararse para la próxima urgencia"],
      learnedP:["Los factores de decisión del MEDEVAC","El acondicionamiento de la víctima para el transporte","La seguridad de la zona de hélitransporte","La hoja de transmisión estructurada","La fase Review y el ciclo completo del MAP Medical Mindset"],
      safetyMsg:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care.",
    },
    pt:{
      badge:"🩺 Safety · STCW First Aid · Lição 8/8 · ⭐ Premium",
      title:"MEDEVAC - Preparing the Casualty & Handover",
      intro:"Esta última lição fecha o ciclo completo do módulo: depois de avaliar, proteger, agir e vigiar, resta transmitir. É aqui que tudo o que foi aprendido ganha pleno sentido.",
      p0:"TREATMENT DOES NOT END WHEN THE HELICOPTER ARRIVES",s0t:"O handover é o último cuidado que dás",
      s0:"Excelentes cuidados a bordo podem ser comprometidos por uma transferência precipitada. A vigilância nunca para até os cuidados serem realmente transmitidos.\n\nCOMO RECONHECER? Deterioração apesar do tratamento, recomendação do TMAS, recursos esgotados, demora demasiado longa.\nO QUE FAZER IMEDIATAMENTE? Acondicionar a vítima, garantir a segurança da zona, preparar uma transmissão completa.\nQUE ERRO O AGRAVA? Precipitar a transferência sem garantir a segurança do convés ou sem uma transmissão estruturada.\nQUANDO PEDIR AJUDA MÉDICA? O MEDEVAC já é a resposta a esta pergunta nesta fase do percurso.",
      p1:"QUANDO CONSIDERAR UM MEDEVAC",s1t:"Os fatores de decisão",
      s1:"Deterioração apesar do tratamento, recomendação do TMAS, recursos a bordo esgotados, demora demasiado longa até ao porto: estes fatores, vistos ao longo do módulo, convergem aqui.",
      p2:"ACONDICIONAR A VÍTIMA",s2t:"Preparar para o transporte, não apenas para o momento presente",
      s2:"Fixar talas e pensos, proteger do frio, adaptar a posição, e fazer o Medical Log viajar com a vítima, nunca a bordo.",
      p3:"SECURE THE LANDING ZONE",s3t:"O primeiríssimo gesto, nunca uma reflexão tardia",
      s3:"Objetos móveis, pessoal, comunicações, vento, obstáculos: toda a zona é revista antes de o helicóptero chegar, por esta ordem precisa.",
      p4:"THE HANDOVER SHEET",s4t:"Uma transmissão estruturada, não um resumo aproximado",
      s4:"Paciente, mecanismo da lesão, SAMPLE, evolução das constantes, tratamento administrado, cronologia, perguntas da equipa médica: sete elementos, por esta ordem, para uma transmissão completa.",
      p5:"REVIEW",s5t:"O último elo, muitas vezes esquecido",
      s5:"Depois de o helicóptero partir: completar o Medical Log, debriefar a tripulação, rearmar o material, preparar o navio para uma nova urgência. Só assim o ciclo está realmente completo.",
      p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 8",
      sumP:["Treatment does not end when the helicopter arrives: o handover é o último cuidado","MEDEVAC: deterioração, recomendação do TMAS, recursos esgotados, ou demora demasiado longa","Secure the Landing Zone: objetos, pessoal, comunicações, vento, obstáculos, por esta ordem","The Handover Sheet: 7 elementos para uma transmissão completa, Medical Log incluído","Review: completar, debriefar, rearmar, preparar para a próxima urgência"],
      learnedP:["Os fatores de decisão do MEDEVAC","O acondicionamento da vítima para o transporte","A segurança da zona de helitransporte","A ficha de transmissão estruturada","A fase Review e o ciclo completo do MAP Medical Mindset"],
      safetyMsg:"Professional first aid is not measured by how much you do. It is measured by how well you prepare the next person to continue the care.",
    },
  };
  return d[lang]||d.fr;
};

const closingMsg = {
  fr:"A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act.",
  en:"A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act.",
  es:"A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act.",
  pt:"A mariner cannot always save a life. But a well-trained mariner should never lose one because he failed to act.",
};

const mindsetLabel = {
  fr:{title:"THE MAP MEDICAL MINDSET",sub:"Every medical emergency follows this same discipline.",steps:["Assess","Protect","Act","Monitor","Handover","Review"]},
  en:{title:"THE MAP MEDICAL MINDSET",sub:"Every medical emergency follows this same discipline.",steps:["Assess","Protect","Act","Monitor","Handover","Review"]},
  es:{title:"THE MAP MEDICAL MINDSET",sub:"Every medical emergency follows this same discipline.",steps:["Assess","Protect","Act","Monitor","Handover","Review"]},
  pt:{title:"THE MAP MEDICAL MINDSET",sub:"Every medical emergency follows this same discipline.",steps:["Assess","Protect","Act","Monitor","Handover","Review"]},
};

// MAIN
export default function LessonSafetyS3_L8({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
  const t = T[lang]||T.fr;
  const quiz = QUIZ[lang]||QUIZ.fr;
  const bank = BANK[lang]||BANK.fr;
  const lc = getContent(lang);
  const ms = mindsetLabel[lang]||mindsetLabel.fr;
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 8/8":lang==="en"?"Lesson 8/8":lang==="es"?"Lección 8/8":"Lição 8/8"}</div>
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

            <SL icon="🚁" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🚁</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="📉" text={lc.p1} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📉</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📉 {lang==="fr"?"QUAND ENVISAGER UN MEDEVAC - INTERACTIF":lang==="en"?"WHEN TO CONSIDER MEDEVAC - INTERACTIVE":lang==="es"?"CUÁNDO CONSIDERAR UN MEDEVAC - INTERACTIVO":"QUANDO CONSIDERAR UM MEDEVAC - INTERATIVO"}</div><WhenMedevacSVG lang={lang}/></Card>

            <SL icon="🧳" text={lc.p2} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧳</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧳 {lang==="fr"?"CONDITIONNEMENT - INTERACTIF":lang==="en"?"PACKAGING - INTERACTIVE":lang==="es"?"ACONDICIONAMIENTO - INTERACTIVO":"ACONDICIONAMENTO - INTERATIVO"}</div><PackagingSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p3} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🎯</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🎯 {lang==="fr"?"ZONE D'HÉLITREUILLAGE - INTERACTIF":lang==="en"?"LANDING ZONE - INTERACTIVE":lang==="es"?"ZONA DE HÉLITRANSPORTE - INTERACTIVO":"ZONA DE HELITRANSPORTE - INTERATIVO"}</div><LandingZoneSVG lang={lang}/></Card>

            <SL icon="📋" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.green}44`,background:"linear-gradient(135deg,rgba(30,138,74,0.08),rgba(13,31,60,0.8))"}}><HandoverSheetSVG lang={lang}/></Card>

            <SL icon="🔄" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔄</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - MEDEVAC & Handover":lang==="en"?"Final Quiz - MEDEVAC & Handover":lang==="es"?"Quiz Final - MEDEVAC y Handover":"Quiz Final - MEDEVAC e Handover"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 8/8":"questions · Lesson 8/8"}</div>
            </div>
            <QuizComp questions={quiz} t={t} onComplete={s=>{setQuizScore(s);onQuizScored(s,quiz.length);setTimeout(()=>setPhase("done"),1200);}}/>
          </>}

          {phase==="done"&&<div style={{paddingTop:10}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:64,marginBottom:10}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>{t.complete}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:"rgba(192,57,43,0.15)",border:`1px solid ${C.red}55`,fontSize:14,color:C.gold2,fontWeight:700}}>+{quizScore>=4?200:quizScore===3?120:60} {t.xp} ⭐</div>
            </div>

            <Card style={{marginBottom:16,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.1),rgba(13,31,60,0.9))"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>🩺</span>
                <div style={{fontSize:11,color:C.gold2,letterSpacing:2,fontFamily:"'Cinzel',serif",fontWeight:700}}>SAFETY MESSAGE</div>
              </div>
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{lc.safetyMsg}</div>
            </Card>

            <Card style={{marginBottom:16}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:10,fontFamily:"'Cinzel',serif",letterSpacing:1}}>{t.youLearned}</div>
              {lc.learnedP.map((pt,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<lc.learnedP.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:12,color:C.white}}><span style={{color:C.green,fontWeight:700}}>✓</span>{pt}</div>)}
            </Card>

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
              <div style={{fontSize:13,color:C.white,lineHeight:1.8,fontStyle:"italic"}}>{closingMsg[lang]||closingMsg.fr}</div>
            </Card>

            <Card style={{marginBottom:16,textAlign:"center",border:`2px solid ${C.gold}`,background:"linear-gradient(160deg,rgba(201,146,42,0.2),rgba(13,31,60,0.95))"}}>
              <div style={{fontSize:36,marginBottom:8}}>🏅</div>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:C.gold2,letterSpacing:2,marginBottom:6}}>{lang==="fr"?"MODULE TERMINÉ":lang==="en"?"MODULE COMPLETED":lang==="es"?"MÓDULO COMPLETADO":"MÓDULO CONCLUÍDO"}</div>
              <div style={{fontSize:13,color:C.white,fontWeight:700,marginBottom:10}}>{lang==="fr"?"Secourisme STCW":lang==="en"?"STCW First Aid":lang==="es"?"Primeros Auxilios STCW":"Primeiros Socorros STCW"}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{lang==="fr"?"400 XP gagnés · 8 leçons terminées":lang==="en"?"400 XP earned · 8 lessons completed":lang==="es"?"400 XP ganados · 8 lecciones completadas":"400 XP ganhos · 8 lições concluídas"}</div>
              <div style={{fontSize:11,color:C.gold2,fontStyle:"italic"}}>{lang==="fr"?"MAP Medical Mindset débloqué":lang==="en"?"Medical Mindset Unlocked":lang==="es"?"MAP Medical Mindset desbloqueado":"MAP Medical Mindset desbloqueado"}</div>
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
