import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - PREPARING FOR A SAFE PATROL (THE DANGER DETERMINES THE EQUIPMENT)
function SafePatrolPrepSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"⛑️", label:{fr:"Casque",en:"Helmet",es:"Casco",pt:"Capacete"}, desc:{fr:"Protège contre les chutes d'objets et les chocs à la tête, particulièrement dans les zones de travail en hauteur ou sous des structures.",en:"Protects against falling objects and head impacts, particularly in areas with work at height or under structures.",es:"Protege contra la caída de objetos y los golpes en la cabeza, particularmente en zonas de trabajo en altura o bajo estructuras.",pt:"Protege contra a queda de objetos e os choques na cabeça, particularmente em zonas de trabalho em altura ou sob estruturas."} },
    { id:2, icon:"🥾", label:{fr:"Chaussures de sécurité",en:"Safety boots",es:"Botas de seguridad",pt:"Botas de segurança"}, desc:{fr:"Protègent contre les glissades, les perforations et l'écrasement, des risques constants sur un pont ou en salle des machines.",en:"Protect against slips, punctures, and crushing, constant risks on deck or in the engine room.",es:"Protegen contra los resbalones, las perforaciones y el aplastamiento, riesgos constantes en una cubierta o sala de máquinas.",pt:"Protegem contra escorregões, perfurações e esmagamento, riscos constantes num convés ou casa das máquinas."} },
    { id:3, icon:"🧤", label:{fr:"Gants",en:"Gloves",es:"Guantes",pt:"Luvas"}, desc:{fr:"Protègent contre les coupures, la chaleur ou les produits chimiques selon le type de gant choisi : le danger détermine le modèle, jamais l'inverse.",en:"Protect against cuts, heat, or chemicals depending on the type chosen: the danger determines the model, never the other way round.",es:"Protegen contra los cortes, el calor o los productos químicos según el tipo de guante elegido: el peligro determina el modelo, nunca al revés.",pt:"Protegem contra cortes, calor ou produtos químicos consoante o tipo escolhido: o perigo determina o modelo, nunca o contrário."} },
    { id:4, icon:"🔦", label:{fr:"Lampe (ATEX si nécessaire)",en:"Torch (ATEX if necessary)",es:"Linterna (ATEX si es necesario)",pt:"Lanterna (ATEX se necessário)"}, desc:{fr:"Permet d'inspecter des zones sombres sans créer de source d'ignition dans les zones où des gaz inflammables peuvent être présents.",en:"Allows inspecting dark areas without creating an ignition source in zones where flammable gases may be present.",es:"Permite inspeccionar zonas oscuras sin crear una fuente de ignición en zonas donde puedan estar presentes gases inflamables.",pt:"Permite inspecionar zonas escuras sem criar uma fonte de ignição em zonas onde possam estar presentes gases inflamáveis."} },
    { id:5, icon:"📻", label:{fr:"Radio",en:"Radio",es:"Radio",pt:"Rádio"}, desc:{fr:"Permet de transmettre immédiatement une anomalie ou une urgence, sans avoir à revenir physiquement vers un poste fixe.",en:"Allows immediately transmitting an anomaly or emergency, without needing to physically return to a fixed post.",es:"Permite transmitir de inmediato una anomalía o una urgencia, sin tener que volver físicamente a un puesto fijo.",pt:"Permite transmitir de imediato uma anomalia ou uma urgência, sem ter de voltar fisicamente a um posto fixo."} },
    { id:6, icon:"📢", label:{fr:"Sifflet",en:"Whistle",es:"Silbato",pt:"Apito"}, desc:{fr:"Moyen d'alerte de secours lorsque la radio est indisponible, en panne, ou dans un environnement trop bruyant pour être entendue.",en:"A backup alert method when the radio is unavailable, broken, or in an environment too loud to be heard.",es:"Medio de alerta de reserva cuando la radio no está disponible, está averiada, o en un entorno demasiado ruidoso para ser escuchada.",pt:"Meio de alerta de reserva quando o rádio está indisponível, avariado, ou num ambiente demasiado ruidoso para ser ouvido."} },
    { id:7, icon:"🦺", label:{fr:"Bandes rétro-réfléchissantes",en:"Retro-reflective bands",es:"Bandas retrorreflectantes",pt:"Faixas retrorrefletoras"}, desc:{fr:"Permettent d'être rapidement localisé de nuit, dans la fumée, ou par faible visibilité, pendant une ronde ou une intervention.",en:"Allow being quickly located at night, in smoke, or in low visibility, during a round or an intervention.",es:"Permiten ser localizado rápidamente de noche, en el humo, o con poca visibilidad, durante una ronda o una intervención.",pt:"Permitem ser rapidamente localizado de noite, no fumo, ou com pouca visibilidade, durante uma ronda ou uma intervenção."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Le danger détermine toujours l'équipement, jamais l'inverse.":lang==="en"?"The danger always determines the equipment, never the other way round.":lang==="es"?"El peligro siempre determina el equipo, nunca al revés.":"O perigo determina sempre o equipamento, nunca o contrário."}</div>
    </div>
  );
}

// SVG 2 - ATMOSPHERIC HAZARDS & CONFINED SPACES
function AtmosphericHazardsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"💨", label:{fr:"Manque d'oxygène",en:"Oxygen deficiency",es:"Falta de oxígeno",pt:"Falta de oxigénio"}, desc:{fr:"La corrosion, la combustion ou certains produits peuvent consommer l'oxygène d'un espace clos, souvent sans aucun signe visible ou olfactif.",en:"Corrosion, combustion, or certain products can consume the oxygen in an enclosed space, often with no visible or olfactory sign.",es:"La corrosión, la combustión o ciertos productos pueden consumir el oxígeno de un espacio cerrado, a menudo sin ningún signo visible u olfativo.",pt:"A corrosão, a combustão ou certos produtos podem consumir o oxigénio de um espaço fechado, muitas vezes sem qualquer sinal visível ou olfativo."} },
    { id:2, icon:"☠️", label:{fr:"H2S, CO et autres gaz toxiques",en:"H2S, CO, and other toxic gases",es:"H2S, CO y otros gases tóxicos",pt:"H2S, CO e outros gases tóxicos"}, desc:{fr:"Ces gaz peuvent être mortels à très faible concentration, parfois inodores après une brève exposition qui désensibilise l'odorat.",en:"These gases can be lethal at very low concentrations, sometimes odorless after brief exposure that desensitizes smell.",es:"Estos gases pueden ser mortales a concentraciones muy bajas, a veces inodoros tras una breve exposición que desensibiliza el olfato.",pt:"Estes gases podem ser mortais a concentrações muito baixas, por vezes inodoros após uma breve exposição que dessensibiliza o olfato."} },
    { id:3, icon:"🛢️", label:{fr:"Vapeurs d'hydrocarbures et LEL",en:"Hydrocarbon vapors and LEL",es:"Vapores de hidrocarburos y LEL",pt:"Vapores de hidrocarbonetos e LEL"}, desc:{fr:"Le seuil d'explosivité (LEL) mesure le risque d'inflammation ; un espace peut sembler sûr à l'œil tout en étant proche du seuil critique.",en:"The lower explosive limit (LEL) measures ignition risk; a space can look safe to the eye while being close to the critical threshold.",es:"El límite inferior de explosividad (LEL) mide el riesgo de ignición; un espacio puede parecer seguro a la vista mientras está cerca del umbral crítico.",pt:"O limite inferior de explosividade (LEL) mede o risco de ignição; um espaço pode parecer seguro à vista enquanto está perto do limiar crítico."} },
    { id:4, icon:"📟", label:{fr:"Le détecteur, un outil de décision",en:"The detector, a decision tool",es:"El detector, una herramienta de decisión",pt:"O detetor, uma ferramenta de decisão"}, desc:{fr:"Le détecteur de gaz n'est pas un simple équipement à porter : c'est l'outil qui autorise, ou interdit, une entrée. Sa mesure prime toujours sur l'impression visuelle.",en:"The gas detector is not just equipment to wear: it's the tool that authorizes, or forbids, an entry. Its reading always takes priority over visual impression.",es:"El detector de gas no es solo un equipo para llevar puesto: es la herramienta que autoriza, o prohíbe, una entrada. Su medición siempre prima sobre la impresión visual.",pt:"O detetor de gás não é apenas um equipamento para usar: é a ferramenta que autoriza, ou proíbe, uma entrada. A sua medição prevalece sempre sobre a impressão visual."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Ne jamais entrer dans une zone dangereuse sans avoir vérifié l'atmosphère.":lang==="en"?"Never enter a dangerous zone without having tested the atmosphere.":lang==="es"?"Nunca entrar en una zona peligrosa sin haber comprobado la atmósfera.":"Nunca entrar numa zona perigosa sem ter verificado a atmosfera."}</div>
    </div>
  );
}

// SVG 3 - HUMAN FACTORS
function HumanFactorsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"😴", label:{fr:"Fatigue",en:"Fatigue",es:"Fatiga",pt:"Fadiga"}, desc:{fr:"Réduit le temps de réaction et la capacité de jugement, un facteur sous-estimé dans une part importante des accidents maritimes documentés.",en:"Reduces reaction time and judgment capacity, a factor underestimated in a significant share of documented maritime accidents.",es:"Reduce el tiempo de reacción y la capacidad de juicio, un factor subestimado en una parte importante de los accidentes marítimos documentados.",pt:"Reduz o tempo de reação e a capacidade de julgamento, um fator subestimado numa parte importante dos acidentes marítimos documentados."} },
    { id:2, icon:"🍺", label:{fr:"Alcool et drogues",en:"Alcohol and drugs",es:"Alcohol y drogas",pt:"Álcool e drogas"}, desc:{fr:"Altèrent directement la perception du danger et la coordination, incompatibles avec toute tâche impliquant la sécurité à bord.",en:"Directly impair danger perception and coordination, incompatible with any task involving safety on board.",es:"Alteran directamente la percepción del peligro y la coordinación, incompatibles con cualquier tarea que implique la seguridad a bordo.",pt:"Alteram diretamente a perceção do perigo e a coordenação, incompatíveis com qualquer tarefa que envolva a segurança a bordo."} },
    { id:3, icon:"🔁", label:{fr:"Routine",en:"Routine",es:"Rutina",pt:"Rotina"}, desc:{fr:"Une tâche répétée des centaines de fois peut faire oublier qu'elle reste dangereuse, réduisant la vigilance sans que le risque réel ne diminue.",en:"A task repeated hundreds of times can make one forget it remains dangerous, reducing vigilance without the real risk actually decreasing.",es:"Una tarea repetida cientos de veces puede hacer olvidar que sigue siendo peligrosa, reduciendo la vigilancia sin que el riesgo real disminuya.",pt:"Uma tarefa repetida centenas de vezes pode fazer esquecer que continua perigosa, reduzindo a vigilância sem que o risco real diminua."} },
    { id:4, icon:"💪", label:{fr:"Excès de confiance",en:"Overconfidence",es:"Exceso de confianza",pt:"Excesso de confiança"}, desc:{fr:"L'expérience peut donner l'illusion de pouvoir se passer d'une vérification, précisément quand cette vérification reste indispensable.",en:"Experience can give the illusion of being able to skip a check, precisely when that check remains essential.",es:"La experiencia puede dar la ilusión de poder prescindir de una comprobación, precisamente cuando esa comprobación sigue siendo indispensable.",pt:"A experiência pode dar a ilusão de poder dispensar uma verificação, precisamente quando essa verificação continua indispensável."} },
    { id:5, icon:"📱", label:{fr:"Distraction",en:"Distraction",es:"Distracción",pt:"Distração"}, desc:{fr:"Un instant d'inattention pendant une tâche à risque suffit souvent à transformer une situation maîtrisée en accident.",en:"A moment of inattention during a risky task is often enough to turn a controlled situation into an accident.",es:"Un instante de distracción durante una tarea de riesgo suele bastar para transformar una situación controlada en un accidente.",pt:"Um instante de distração durante uma tarefa de risco basta muitas vezes para transformar uma situação controlada num acidente."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Beaucoup d'accidents sont provoqués par le comportement humain, plus que par une panne technique.":lang==="en"?"Many accidents are caused by human behavior, more than by technical failure.":lang==="es"?"Muchos accidentes son provocados por el comportamiento humano, más que por un fallo técnico.":"Muitos acidentes são provocados pelo comportamento humano, mais do que por uma falha técnica."}</div>
    </div>
  );
}

// SVG 4 - PROFESSIONAL SAFETY BEHAVIOUR
function ProfessionalBehaviourSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"📋", label:{fr:"Discipline et respect des procédures",en:"Discipline and respect for procedures",es:"Disciplina y respeto de los procedimientos",pt:"Disciplina e respeito pelos procedimentos"}, desc:{fr:"Suivre les consignes de sécurité même lorsqu'elles semblent superflues dans l'instant : elles existent pour des raisons souvent apprises à un prix élevé.",en:"Following safety instructions even when they seem superfluous in the moment: they exist for reasons often learned at a high price.",es:"Seguir las consignas de seguridad incluso cuando parecen superfluas en el momento: existen por razones a menudo aprendidas a un precio alto.",pt:"Seguir as instruções de segurança mesmo quando parecem supérfluas no momento: existem por razões muitas vezes aprendidas a um preço elevado."} },
    { id:2, icon:"🤝", label:{fr:"Prévention des conflits et de la violence",en:"Preventing conflict and violence",es:"Prevención de conflictos y violencia",pt:"Prevenção de conflitos e violência"}, desc:{fr:"Un climat tendu à bord affecte directement la vigilance collective et la qualité de la communication en situation d'urgence.",en:"A tense atmosphere on board directly affects collective vigilance and the quality of communication in an emergency.",es:"Un clima tenso a bordo afecta directamente a la vigilancia colectiva y a la calidad de la comunicación en una situación de urgencia.",pt:"Um clima tenso a bordo afeta diretamente a vigilância coletiva e a qualidade da comunicação numa situação de urgência."} },
    { id:3, icon:"📵", label:{fr:"Usage responsable du téléphone",en:"Responsible phone use",es:"Uso responsable del teléfono",pt:"Uso responsável do telefone"}, desc:{fr:"Une distraction par un téléphone pendant une tâche à risque peut avoir les mêmes conséquences qu'un manque d'attention classique.",en:"A phone distraction during a risky task can have the same consequences as a classic lack of attention.",es:"Una distracción por el teléfono durante una tarea de riesgo puede tener las mismas consecuencias que una falta de atención clásica.",pt:"Uma distração pelo telefone durante uma tarefa de risco pode ter as mesmas consequências que uma falta de atenção clássica."} },
    { id:4, icon:"🔒", label:{fr:"Confidentialité et réseaux sociaux",en:"Confidentiality and social media",es:"Confidencialidad y redes sociales",pt:"Confidencialidade e redes sociais"}, desc:{fr:"Partager position, cargaison ou opérations du navire en ligne peut créer un risque de sécurité, pas seulement une question de discrétion.",en:"Sharing the ship's position, cargo, or operations online can create a security risk, not just a matter of discretion.",es:"Compartir la posición, la carga o las operaciones del buque en línea puede crear un riesgo de seguridad, no solo una cuestión de discreción.",pt:"Partilhar a posição, a carga ou as operações do navio online pode criar um risco de segurança, não apenas uma questão de discrição."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"La sécurité est aussi une attitude, pas seulement un ensemble d'équipements.":lang==="en"?"Safety is also an attitude, not just a set of equipment.":lang==="es"?"La seguridad también es una actitud, no solo un conjunto de equipos.":"A segurança é também uma atitude, não apenas um conjunto de equipamentos."}</div>
    </div>
  );
}

// MINI CHECKLIST - PROFESSIONAL REFLEX
function MiniChecklistSVG({ lang }) {
  const items = {
    fr:["Quel est le danger ?","Quel équipement me protège ?","Mon moyen de communication fonctionne-t-il ?","Si quelque chose m'arrive, comment demander de l'aide ?"],
    en:["What is the danger?","What equipment protects me?","Does my communication device work?","If something happens to me, how do I call for help?"],
    es:["¿Cuál es el peligro?","¿Qué equipo me protege?","¿Funciona mi medio de comunicación?","Si me pasa algo, ¿cómo pido ayuda?"],
    pt:["Qual é o perigo?","Que equipamento me protege?","O meu meio de comunicação funciona?","Se algo me acontecer, como peço ajuda?"],
  };
  const list = items[lang]||items.fr;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {list.map((q,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:"rgba(201,146,42,0.08)",border:`1px solid ${C.gold}33`}}>
          <div style={{width:22,height:22,borderRadius:"50%",background:C.gold,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#1a1a1a"}}>{i+1}</div>
          <div style={{fontSize:12,color:C.white,fontWeight:600}}>{q}</div>
        </div>
      ))}
    </div>
  );
}

// EXERCISE - PPE & BEHAVIOUR DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"c",q3:"a",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous devez inspecter une zone présentant un risque de gaz inflammable. Quelle lampe utilisez-vous ?\na) N'importe quelle lampe disponible, l'important est d'y voir\nb) Une lampe ATEX pour éviter de créer une source d'ignition\nc) Une lampe puissante uniquement, sans autre considération"},
      {id:"q2",q:"Vous devez entrer dans un espace clos pour vérifier un problème mineur signalé. Que faites-vous en premier ?\na) Entrer rapidement, ce n'est probablement rien de grave\nb) Demander à un collègue d'entrer à votre place\nc) Tester l'atmosphère avec un détecteur de gaz avant toute entrée"},
      {id:"q3",q:"Un collègue s'effondre à l'intérieur d'un espace clos. Que faites-vous ?\na) Alerter immédiatement et ne jamais entrer sans ARI et sans avoir testé l'atmosphère\nb) Entrer immédiatement pour le sortir le plus vite possible\nc) Attendre seul sans rien faire"},
      {id:"q4",q:"Que signifie le principe 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' ?\na) Il ne faut jamais tenter de porter secours à quelqu'un\nb) Se protéger soi-même est la condition pour pouvoir réellement aider les autres, jamais une option secondaire\nc) Ce principe ne concerne que les officiers"},
    ],
    en:[
      {id:"q1",q:"You must inspect an area with a risk of flammable gas. Which torch do you use?\na) Any available torch, what matters is being able to see\nb) An ATEX torch to avoid creating an ignition source\nc) Only a powerful torch, with no other consideration"},
      {id:"q2",q:"You must enter a confined space to check a minor reported issue. What do you do first?\na) Enter quickly, it's probably nothing serious\nb) Ask a colleague to enter instead of you\nc) Test the atmosphere with a gas detector before any entry"},
      {id:"q3",q:"A colleague collapses inside a confined space. What do you do?\na) Alert immediately and never enter without BA and without having tested the atmosphere\nb) Enter immediately to get them out as fast as possible\nc) Wait alone doing nothing"},
      {id:"q4",q:"What does the principle 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' mean?\na) You should never attempt to help someone\nb) Protecting yourself first is the condition for truly being able to help others, never a secondary option\nc) This principle only concerns officers"},
    ],
    es:[
      {id:"q1",q:"Debes inspeccionar una zona con riesgo de gas inflamable. ¿Qué linterna usas?\na) Cualquier linterna disponible, lo importante es ver\nb) Una linterna ATEX para evitar crear una fuente de ignición\nc) Solo una linterna potente, sin otra consideración"},
      {id:"q2",q:"Debes entrar en un espacio cerrado para comprobar un problema menor señalado. ¿Qué haces primero?\na) Entrar rápidamente, probablemente no es nada grave\nb) Pedir a un compañero que entre en tu lugar\nc) Comprobar la atmósfera con un detector de gas antes de cualquier entrada"},
      {id:"q3",q:"Un compañero se desploma dentro de un espacio cerrado. ¿Qué haces?\na) Alertar de inmediato y no entrar nunca sin ARI y sin haber comprobado la atmósfera\nb) Entrar de inmediato para sacarlo lo más rápido posible\nc) Esperar solo sin hacer nada"},
      {id:"q4",q:"¿Qué significa el principio 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?\na) Nunca hay que intentar ayudar a nadie\nb) Protegerse a uno mismo primero es la condición para poder ayudar realmente a los demás, nunca una opción secundaria\nc) Este principio solo concierne a los oficiales"},
    ],
    pt:[
      {id:"q1",q:"Tens de inspecionar uma zona com risco de gás inflamável. Que lanterna usas?\na) Qualquer lanterna disponível, o importante é ver\nb) Uma lanterna ATEX para evitar criar uma fonte de ignição\nc) Só uma lanterna potente, sem outra consideração"},
      {id:"q2",q:"Tens de entrar num espaço confinado para verificar um problema menor sinalizado. O que fazes primeiro?\na) Entrar rapidamente, provavelmente não é nada grave\nb) Pedir a um colega para entrar no teu lugar\nc) Testar a atmosfera com um detetor de gás antes de qualquer entrada"},
      {id:"q3",q:"Um colega desmaia dentro de um espaço confinado. O que fazes?\na) Alertar de imediato e nunca entrar sem ARI e sem ter testado a atmosfera\nb) Entrar de imediato para o tirar o mais depressa possível\nc) Esperar sozinho sem fazer nada"},
      {id:"q4",q:"O que significa o princípio 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?\na) Nunca se deve tentar ajudar ninguém\nb) Proteger-se a si próprio primeiro é a condição para poder realmente ajudar os outros, nunca uma opção secundária\nc) Este princípio só diz respeito aos oficiais"},
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

// ACCIDENT CASE - REAL DOCUMENTED CASE (VIKING ISLAY, MAIB 2007)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Cas d'étude - Le Viking Islay",teaser:"Cas réel documenté (MAIB) - trois morts, dont deux sauveteurs improvisés",
      what:"Le 23 septembre 2007, à bord du navire d'intervention Viking Islay, un marin entre dans le coffre à chaîne pour fixer une chaîne d'ancre bruyante. L'atmosphère y est appauvrie en oxygène à cause d'une corrosion prolongée de la structure et de la chaîne elle-même. Le marin s'effondre. Un second membre d'équipage, réalisant qu'une aide est nécessaire, alerte la passerelle puis entre à son tour dans le coffre pour porter secours : il s'effondre également. Un troisième homme tente d'entrer avec un appareil respiratoire complet mais ne parvient pas à se glisser dans l'espace ainsi équipé. Il improvise alors avec un appareil respiratoire d'évacuation d'urgence (EEBD), conçu pour sortir d'une zone dangereuse et non pour y entrer. Sa cagoule se déplace ou se détache pendant l'intervention, et il s'effondre à son tour. Les trois hommes meurent d'une atmosphère appauvrie en oxygène.",
      cause:"• Corrosion prolongée de la structure métallique et de la chaîne d'ancre, appauvrissant progressivement l'oxygène du coffre à chaîne\n• Aucune reconnaissance préalable du coffre à chaîne comme un espace confiné potentiellement dangereux\n• Aucun test d'atmosphère effectué avant les entrées successives\n• Un appareil respiratoire d'évacuation (EEBD), inadapté à une entrée, utilisé à la place d'un appareil respiratoire complet",
      lessons:"✓ Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One : deux des trois victimes sont mortes en tentant de porter secours, sans protection adaptée\n✓ Un espace confiné n'a pas besoin de présenter un signe visible pour être mortel : la corrosion peut appauvrir l'oxygène silencieusement pendant des années\n✓ Utiliser le mauvais équipement (EEBD au lieu d'un ARI complet) pour une entrée reste aussi dangereux que ne porter aucune protection\n✓ Ce cas illustre directement pourquoi ne jamais entrer, ni tenter un sauvetage, sans test d'atmosphère et sans équipement adapté à une entrée",
      link:"🔗 Ce cas, documenté par le MAIB, reste l'une des références les plus citées pour illustrer le danger des sauvetages improvisés en espace confiné."},
    en:{title:"Case Study - The Viking Islay",teaser:"Real documented case (MAIB) - three deaths, including two would-be rescuers",
      what:"On 23 September 2007, aboard the emergency response vessel Viking Islay, a seaman entered the chain locker to secure a rattling anchor chain. The atmosphere there was oxygen-deficient due to prolonged corrosion of the structure and the chain itself. The seaman collapsed. A second crew member, realizing help was needed, alerted the bridge and then entered the locker himself to help: he also collapsed. A third man attempted to enter with full breathing apparatus but could not fit into the space while wearing it. He then improvised with an Emergency Escape Breathing Device (EEBD), designed to exit a dangerous zone rather than enter it. Its hood shifted or came loose during the attempt, and he too collapsed. All three men died from an oxygen-deficient atmosphere.",
      cause:"• Prolonged corrosion of the metal structure and anchor chain, progressively depleting the oxygen in the chain locker\n• No prior recognition of the chain locker as a potentially dangerous confined space\n• No atmosphere test performed before the successive entries\n• An escape breathing device (EEBD), unsuited for entry, used instead of full breathing apparatus",
      lessons:"✓ Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One: two of the three victims died attempting to help, without adequate protection\n✓ A confined space doesn't need a visible sign to be lethal: corrosion can silently deplete oxygen over years\n✓ Using the wrong equipment (an EEBD instead of full BA) for an entry remains as dangerous as wearing no protection at all\n✓ This case directly illustrates why one should never enter, or attempt a rescue, without an atmosphere test and equipment suited for entry",
      link:"🔗 This MAIB-documented case remains one of the most cited references illustrating the danger of improvised rescues in confined spaces."},
    es:{title:"Caso de estudio - El Viking Islay",teaser:"Caso real documentado (MAIB) - tres muertos, incluidos dos rescatadores improvisados",
      what:"El 23 de septiembre de 2007, a bordo del buque de intervención Viking Islay, un marinero entró en el pañol de cadenas para fijar una cadena de ancla ruidosa. La atmósfera allí estaba empobrecida en oxígeno debido a la corrosión prolongada de la estructura y de la propia cadena. El marinero se desplomó. Un segundo tripulante, dándose cuenta de que se necesitaba ayuda, alertó al puente y luego entró él mismo al pañol para ayudar: también se desplomó. Un tercer hombre intentó entrar con un equipo de respiración autónoma completo pero no pudo entrar en el espacio así equipado. Improvisó entonces con un equipo de respiración de escape de emergencia (EEBD), diseñado para salir de una zona peligrosa y no para entrar en ella. Su capucha se desplazó o se soltó durante el intento, y él también se desplomó. Los tres hombres murieron por una atmósfera empobrecida en oxígeno.",
      cause:"• Corrosión prolongada de la estructura metálica y de la cadena del ancla, empobreciendo progresivamente el oxígeno del pañol de cadenas\n• Ningún reconocimiento previo del pañol de cadenas como un espacio confinado potencialmente peligroso\n• Ninguna prueba de atmósfera realizada antes de las entradas sucesivas\n• Un equipo de respiración de escape (EEBD), no adecuado para una entrada, usado en lugar de un equipo de respiración completo",
      lessons:"✓ Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One: dos de las tres víctimas murieron intentando ayudar, sin protección adecuada\n✓ Un espacio confinado no necesita presentar un signo visible para ser mortal: la corrosión puede empobrecer el oxígeno silenciosamente durante años\n✓ Usar el equipo equivocado (EEBD en lugar de un ARI completo) para una entrada sigue siendo tan peligroso como no llevar ninguna protección\n✓ Este caso ilustra directamente por qué nunca hay que entrar, ni intentar un rescate, sin una prueba de atmósfera y sin equipo adecuado para una entrada",
      link:"🔗 Este caso, documentado por el MAIB, sigue siendo una de las referencias más citadas para ilustrar el peligro de los rescates improvisados en espacios confinados."},
    pt:{title:"Caso de estudo - O Viking Islay",teaser:"Caso real documentado (MAIB) - três mortos, incluindo dois socorristas improvisados",
      what:"Em 23 de setembro de 2007, a bordo do navio de intervenção Viking Islay, um marinheiro entrou no paiol de correntes para prender uma corrente de âncora ruidosa. A atmosfera ali estava empobrecida em oxigénio devido à corrosão prolongada da estrutura e da própria corrente. O marinheiro desmaiou. Um segundo tripulante, percebendo que era preciso ajuda, alertou o passadiço e depois entrou ele próprio no paiol para ajudar: também desmaiou. Um terceiro homem tentou entrar com um aparelho respiratório completo mas não conseguiu entrar no espaço assim equipado. Improvisou então com um aparelho respiratório de evacuação de emergência (EEBD), concebido para sair de uma zona perigosa e não para nela entrar. O seu capuz deslocou-se ou soltou-se durante a tentativa, e ele também desmaiou. Os três homens morreram devido a uma atmosfera empobrecida em oxigénio.",
      cause:"• Corrosão prolongada da estrutura metálica e da corrente da âncora, empobrecendo progressivamente o oxigénio do paiol de correntes\n• Nenhum reconhecimento prévio do paiol de correntes como um espaço confinado potencialmente perigoso\n• Nenhum teste de atmosfera realizado antes das entradas sucessivas\n• Um aparelho respiratório de evacuação (EEBD), inadequado para uma entrada, usado em vez de um aparelho respiratório completo",
      lessons:"✓ Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One: duas das três vítimas morreram a tentar ajudar, sem proteção adequada\n✓ Um espaço confinado não precisa de apresentar um sinal visível para ser mortal: a corrosão pode empobrecer o oxigénio silenciosamente durante anos\n✓ Usar o equipamento errado (EEBD em vez de um ARI completo) para uma entrada continua tão perigoso como não usar nenhuma proteção\n✓ Este caso ilustra diretamente por que nunca se deve entrar, nem tentar um resgate, sem um teste de atmosfera e sem equipamento adequado para uma entrada",
      link:"🔗 Este caso, documentado pelo MAIB, continua a ser uma das referências mais citadas para ilustrar o perigo dos resgates improvisados em espaços confinados."},
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
    {q:"Que signifie le principe 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' ?",opts:["Il ne faut jamais aider quelqu'un en difficulté","Se protéger soi-même est la condition pour pouvoir réellement aider les autres","Ce principe ne concerne que les officiers","Il faut toujours agir en premier sans réfléchir"],correct:1,expl:"Un sauveteur qui devient victime n'aide plus personne, il aggrave la situation."},
    {q:"Quelle est la mission exacte de cette leçon ?",opts:["Présenter une liste complète d'équipements de protection","Répondre à la question : comment un marin se protège-t-il avant d'intervenir","Enseigner l'historique des normes de sécurité","Remplacer la formation pratique aux EPI"],correct:1,expl:"La sécurité personnelle précède toujours l'intervention ; les équipements répondent à un danger identifié, jamais l'inverse."},
    {q:"Quelle est la différence entre cette leçon et L1 (Safety Patrol) ?",opts:["Il n'y a aucune différence, les deux leçons sont identiques","L1 enseigne à observer et signaler ; L3 enseigne à se préparer, choisir les protections et adopter le bon comportement","L3 remplace entièrement L1","L1 traite des EPI, L3 traite de la détection"],correct:1,expl:"Aucune redondance n'existe entre les deux leçons, chacune couvre un aspect distinct."},
    {q:"Pourquoi le danger détermine-t-il toujours l'équipement, et non l'inverse ?",opts:["Ce n'est pas vrai, l'équipement vient toujours en premier","Chaque équipement existe pour répondre à un danger précis identifié au préalable","L'équipement est choisi uniquement par habitude","Le règlement impose un équipement sans lien avec le danger réel"],correct:1,expl:"Un professionnel ne porte jamais un EPI parce que le règlement l'impose, mais parce qu'il a identifié un danger."},
    {q:"Toute ronde doit-elle obligatoirement être réalisée à deux ?",opts:["Oui, c'est une règle universelle en navigation","Non, mais certaines rondes ou inspections doivent l'être selon le niveau de risque ou les procédures de la compagnie","Non, cela n'a jamais d'utilité réelle","Oui, uniquement de nuit"],correct:1,expl:"Ce n'est pas une règle universelle, mais une organisation adaptée à certains niveaux de risque."},
    {q:"Quel est l'avantage d'une ronde à deux ou avec un veilleur désigné quand elle est requise ?",opts:["Aucun avantage réel","Une assistance immédiate en cas d'accident, une meilleure communication, un témoignage fiable","Cela ralentit uniquement la ronde sans bénéfice","Cela ne concerne que les rondes de nuit"],correct:1,expl:"Ces trois avantages justifient cette organisation quand le risque ou la procédure l'exige."},
    {q:"Que couvre la section sur les dangers atmosphériques, au-delà des espaces confinés ?",opts:["Uniquement le manque d'oxygène","Manque d'oxygène, H2S, CO, vapeurs d'hydrocarbures, LEL, et autres gaz dangereux","Uniquement les vapeurs d'hydrocarbures","Cette section ne concerne que les espaces confinés"],correct:1,expl:"Les dangers atmosphériques dépassent le seul cadre des espaces confinés."},
    {q:"Que représente réellement le détecteur de gaz ?",opts:["Un simple équipement optionnel","Un outil de décision qui autorise ou interdit une entrée, sa mesure primant toujours sur l'impression visuelle","Un accessoire de confort sans réelle utilité","Un équipement uniquement décoratif"],correct:1,expl:"Le détecteur n'est jamais un simple équipement à porter, c'est l'outil qui décide d'une entrée."},
    {q:"Quel est le message central de la section sur les dangers atmosphériques ?",opts:["Il est toujours possible d'entrer si l'espace semble sûr visuellement","Ne jamais entrer dans une zone dangereuse sans avoir vérifié l'atmosphère","Le détecteur de gaz est optionnel dans la plupart des cas","Seuls les espaces très sombres présentent un risque"],correct:1,expl:"L'apparence visuelle ne garantit jamais la sécurité réelle de l'atmosphère."},
    {q:"Quels facteurs humains cette leçon couvre-t-elle, au-delà de la fatigue, l'alcool et les drogues ?",opts:["Aucun autre facteur n'existe","La routine, l'excès de confiance, et la distraction","Uniquement les conditions météorologiques","Uniquement l'expérience professionnelle"],correct:1,expl:"Ces facteurs supplémentaires sont responsables d'une part importante des accidents."},
    {q:"Pourquoi la routine peut-elle devenir un facteur de risque ?",opts:["Elle n'a aucun effet réel sur la sécurité","Une tâche répétée peut faire oublier qu'elle reste dangereuse, réduisant la vigilance sans que le risque diminue","La routine élimine tout risque avec le temps","Elle ne concerne que les tâches nouvelles"],correct:1,expl:"Le risque réel ne diminue jamais avec la répétition, contrairement à la vigilance."},
    {q:"Que couvre le comportement professionnel de sécurité selon cette leçon ?",opts:["Uniquement le port des EPI","Discipline, respect des procédures, prévention des conflits, usage responsable du téléphone, confidentialité et réseaux sociaux","Uniquement la ponctualité aux relèves","Cette section ne concerne que les officiers"],correct:1,expl:"La sécurité est aussi une attitude, pas seulement un ensemble d'équipements."},
    {q:"Pourquoi partager la position ou la cargaison du navire sur les réseaux sociaux pose-t-il problème ?",opts:["Ce n'est qu'une question esthétique sans conséquence","Cela peut créer un risque de sécurité réel, pas seulement une question de discrétion","Cela n'a aucune importance en pratique","Seule la compagnie peut être affectée, jamais l'équipage"],correct:1,expl:"La confidentialité opérationnelle protège directement la sécurité du navire et de l'équipage."},
    {q:"Dans le cas du Viking Islay, pourquoi le troisième homme est-il mort en tentant de porter secours ?",opts:["Il portait un appareil respiratoire complet parfaitement adapté","Il a utilisé un appareil d'évacuation d'urgence (EEBD), inadapté à une entrée, dont la cagoule s'est déplacée","Il n'a jamais tenté d'entrer dans le coffre à chaîne","Il portait tout l'équipement nécessaire sans aucun problème"],correct:1,expl:"L'EEBD est conçu pour sortir d'une zone dangereuse, jamais pour y entrer."},
    {q:"Que confirme le cas du Viking Islay sur les espaces confinés ?",opts:["Ils sont toujours visiblement dangereux","Un espace confiné n'a pas besoin de présenter un signe visible pour être mortel, la corrosion pouvant appauvrir l'oxygène silencieusement","Le risque n'existe que dans les tanks de grande taille","Un test d'atmosphère n'est jamais nécessaire si l'espace semble familier"],correct:1,expl:"L'atmosphère du coffre à chaîne s'est appauvrie progressivement, sans aucun signe visible préalable."},
  ],
  en:[
    {q:"What does the principle 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' mean?",opts:["You should never help someone in trouble","Protecting yourself is the condition for truly being able to help others","This principle only concerns officers","You must always act first without thinking"],correct:1,expl:"A rescuer who becomes a victim helps no one, and worsens the situation."},
    {q:"What is the exact mission of this lesson?",opts:["Present a complete list of protective equipment","Answer the question: how does a sailor protect themselves before intervening","Teach the history of safety standards","Replace practical PPE training"],correct:1,expl:"Personal safety always precedes intervention; equipment answers an identified danger, never the reverse."},
    {q:"What is the difference between this lesson and L1 (Safety Patrol)?",opts:["There is no difference, both lessons are identical","L1 teaches observing and reporting; L3 teaches preparing, choosing protections, and adopting the right behavior","L3 entirely replaces L1","L1 covers PPE, L3 covers detection"],correct:1,expl:"No redundancy exists between the two lessons, each covers a distinct aspect."},
    {q:"Why does the danger always determine the equipment, and not the other way round?",opts:["This isn't true, equipment always comes first","Each piece of equipment exists to answer a specific danger identified beforehand","Equipment is chosen only out of habit","Regulation imposes equipment with no connection to the real danger"],correct:1,expl:"A professional never wears PPE because regulation imposes it, but because they identified a danger."},
    {q:"Must every round mandatorily be done in pairs?",opts:["Yes, it's a universal rule in navigation","No, but some rounds or inspections must be, depending on risk level or company procedures","No, it never has any real use","Yes, only at night"],correct:1,expl:"It isn't a universal rule, but an organization adapted to certain risk levels."},
    {q:"What is the benefit of a two-person round or a designated watchman when required?",opts:["No real benefit","Immediate assistance in case of accident, better communication, a reliable witness","It only slows down the round with no benefit","It only concerns night rounds"],correct:1,expl:"These three benefits justify this organization when the risk or procedure requires it."},
    {q:"What does the section on atmospheric hazards cover, beyond confined spaces?",opts:["Only oxygen deficiency","Oxygen deficiency, H2S, CO, hydrocarbon vapors, LEL, and other dangerous gases","Only hydrocarbon vapors","This section only concerns confined spaces"],correct:1,expl:"Atmospheric hazards go beyond just the confined space framework."},
    {q:"What does the gas detector actually represent?",opts:["A simple optional piece of equipment","A decision tool that authorizes or forbids an entry, its reading always taking priority over visual impression","A comfort accessory with no real use","Purely decorative equipment"],correct:1,expl:"The detector is never just equipment to wear, it's the tool that decides an entry."},
    {q:"What is the central message of the atmospheric hazards section?",opts:["It's always possible to enter if the space looks safe visually","Never enter a dangerous zone without having tested the atmosphere","The gas detector is optional in most cases","Only very dark spaces present a risk"],correct:1,expl:"Visual appearance never guarantees the actual safety of the atmosphere."},
    {q:"What human factors does this lesson cover, beyond fatigue, alcohol, and drugs?",opts:["No other factor exists","Routine, overconfidence, and distraction","Only weather conditions","Only professional experience"],correct:1,expl:"These additional factors are responsible for a significant share of accidents."},
    {q:"Why can routine become a risk factor?",opts:["It has no real effect on safety","A repeated task can make one forget it remains dangerous, reducing vigilance without the risk decreasing","Routine eliminates all risk over time","It only concerns new tasks"],correct:1,expl:"The real risk never decreases with repetition, unlike vigilance."},
    {q:"What does professional safety behavior cover according to this lesson?",opts:["Only wearing PPE","Discipline, respect for procedures, preventing conflicts, responsible phone use, confidentiality and social media","Only punctuality at watch handovers","This section only concerns officers"],correct:1,expl:"Safety is also an attitude, not just a set of equipment."},
    {q:"Why does sharing the ship's position or cargo on social media pose a problem?",opts:["It's only an aesthetic matter with no consequence","It can create a real security risk, not just a matter of discretion","It has no practical importance","Only the company can be affected, never the crew"],correct:1,expl:"Operational confidentiality directly protects the safety of the ship and crew."},
    {q:"In the Viking Islay case, why did the third man die attempting to rescue?",opts:["He wore full breathing apparatus perfectly suited to the task","He used an emergency escape breathing device (EEBD), unsuited for entry, whose hood shifted","He never attempted to enter the chain locker","He wore all necessary equipment with no problem"],correct:1,expl:"The EEBD is designed to exit a dangerous zone, never to enter one."},
    {q:"What does the Viking Islay case confirm about confined spaces?",opts:["They are always visibly dangerous","A confined space doesn't need a visible sign to be lethal, as corrosion can silently deplete oxygen","The risk only exists in very large tanks","An atmosphere test is never necessary if the space seems familiar"],correct:1,expl:"The chain locker's atmosphere progressively depleted, with no prior visible sign."},
  ],
  es:[
    {q:"¿Qué significa el principio 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?",opts:["Nunca hay que ayudar a alguien en apuros","Protegerse a uno mismo es la condición para poder ayudar realmente a los demás","Este principio solo concierne a los oficiales","Siempre hay que actuar primero sin pensar"],correct:1,expl:"Un rescatador que se convierte en víctima no ayuda a nadie, y agrava la situación."},
    {q:"¿Cuál es la misión exacta de esta lección?",opts:["Presentar una lista completa de equipos de protección","Responder a la pregunta: cómo se protege un marino antes de intervenir","Enseñar la historia de las normas de seguridad","Sustituir la formación práctica en EPP"],correct:1,expl:"La seguridad personal siempre precede a la intervención; el equipo responde a un peligro identificado, nunca al revés."},
    {q:"¿Cuál es la diferencia entre esta lección y L1 (Safety Patrol)?",opts:["No hay ninguna diferencia, ambas lecciones son idénticas","L1 enseña a observar e informar; L3 enseña a prepararse, elegir las protecciones y adoptar el comportamiento correcto","L3 sustituye por completo a L1","L1 trata del EPP, L3 trata de la detección"],correct:1,expl:"No existe redundancia entre las dos lecciones, cada una cubre un aspecto distinto."},
    {q:"¿Por qué el peligro siempre determina el equipo, y no al revés?",opts:["No es cierto, el equipo siempre va primero","Cada equipo existe para responder a un peligro preciso identificado de antemano","El equipo se elige solo por costumbre","El reglamento impone un equipo sin relación con el peligro real"],correct:1,expl:"Un profesional nunca lleva un EPP porque el reglamento lo imponga, sino porque ha identificado un peligro."},
    {q:"¿Toda ronda debe realizarse obligatoriamente en pareja?",opts:["Sí, es una regla universal en navegación","No, pero algunas rondas o inspecciones deben serlo según el nivel de riesgo o los procedimientos de la compañía","No, nunca tiene ninguna utilidad real","Sí, solo de noche"],correct:1,expl:"No es una regla universal, sino una organización adaptada a ciertos niveles de riesgo."},
    {q:"¿Cuál es la ventaja de una ronda en pareja o con un vigilante designado cuando se requiere?",opts:["Ninguna ventaja real","Asistencia inmediata en caso de accidente, mejor comunicación, un testimonio fiable","Solo ralentiza la ronda sin beneficio","Solo concierne a las rondas nocturnas"],correct:1,expl:"Estas tres ventajas justifican esta organización cuando el riesgo o el procedimiento lo exige."},
    {q:"¿Qué cubre la sección sobre los peligros atmosféricos, más allá de los espacios confinados?",opts:["Solo la falta de oxígeno","Falta de oxígeno, H2S, CO, vapores de hidrocarburos, LEL, y otros gases peligrosos","Solo los vapores de hidrocarburos","Esta sección solo concierne a los espacios confinados"],correct:1,expl:"Los peligros atmosféricos van más allá del marco único de los espacios confinados."},
    {q:"¿Qué representa realmente el detector de gas?",opts:["Un simple equipo opcional","Una herramienta de decisión que autoriza o prohíbe una entrada, cuya medición siempre prima sobre la impresión visual","Un accesorio de comodidad sin utilidad real","Un equipo puramente decorativo"],correct:1,expl:"El detector nunca es solo un equipo para llevar, es la herramienta que decide una entrada."},
    {q:"¿Cuál es el mensaje central de la sección sobre peligros atmosféricos?",opts:["Siempre es posible entrar si el espacio parece seguro visualmente","Nunca entrar en una zona peligrosa sin haber comprobado la atmósfera","El detector de gas es opcional en la mayoría de los casos","Solo los espacios muy oscuros presentan un riesgo"],correct:1,expl:"La apariencia visual nunca garantiza la seguridad real de la atmósfera."},
    {q:"¿Qué factores humanos cubre esta lección, más allá de la fatiga, el alcohol y las drogas?",opts:["Ningún otro factor existe","La rutina, el exceso de confianza, y la distracción","Solo las condiciones meteorológicas","Solo la experiencia profesional"],correct:1,expl:"Estos factores adicionales son responsables de una parte importante de los accidentes."},
    {q:"¿Por qué la rutina puede convertirse en un factor de riesgo?",opts:["No tiene ningún efecto real en la seguridad","Una tarea repetida puede hacer olvidar que sigue siendo peligrosa, reduciendo la vigilancia sin que el riesgo disminuya","La rutina elimina todo riesgo con el tiempo","Solo concierne a las tareas nuevas"],correct:1,expl:"El riesgo real nunca disminuye con la repetición, a diferencia de la vigilancia."},
    {q:"¿Qué cubre el comportamiento profesional de seguridad según esta lección?",opts:["Solo el uso del EPP","Disciplina, respeto de los procedimientos, prevención de conflictos, uso responsable del teléfono, confidencialidad y redes sociales","Solo la puntualidad en los relevos","Esta sección solo concierne a los oficiales"],correct:1,expl:"La seguridad también es una actitud, no solo un conjunto de equipos."},
    {q:"¿Por qué compartir la posición o la carga del buque en redes sociales supone un problema?",opts:["Es solo una cuestión estética sin consecuencia","Puede crear un riesgo de seguridad real, no solo una cuestión de discreción","No tiene ninguna importancia práctica","Solo la compañía puede verse afectada, nunca la tripulación"],correct:1,expl:"La confidencialidad operativa protege directamente la seguridad del buque y la tripulación."},
    {q:"En el caso del Viking Islay, ¿por qué murió el tercer hombre al intentar rescatar?",opts:["Llevaba un equipo de respiración completo perfectamente adecuado","Usó un equipo de escape de emergencia (EEBD), no adecuado para una entrada, cuya capucha se desplazó","Nunca intentó entrar en el pañol de cadenas","Llevaba todo el equipo necesario sin ningún problema"],correct:1,expl:"El EEBD está diseñado para salir de una zona peligrosa, nunca para entrar en ella."},
    {q:"¿Qué confirma el caso del Viking Islay sobre los espacios confinados?",opts:["Siempre son visiblemente peligrosos","Un espacio confinado no necesita presentar un signo visible para ser mortal, ya que la corrosión puede empobrecer el oxígeno silenciosamente","El riesgo solo existe en tanques muy grandes","Una prueba de atmósfera nunca es necesaria si el espacio parece familiar"],correct:1,expl:"La atmósfera del pañol de cadenas se empobreció progresivamente, sin ningún signo visible previo."},
  ],
  pt:[
    {q:"O que significa o princípio 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?",opts:["Nunca se deve ajudar alguém em apuros","Proteger-se a si próprio é a condição para poder realmente ajudar os outros","Este princípio só diz respeito aos oficiais","Deve-se sempre agir primeiro sem pensar"],correct:1,expl:"Um socorrista que se torna vítima não ajuda ninguém, e agrava a situação."},
    {q:"Qual é a missão exata desta lição?",opts:["Apresentar uma lista completa de equipamentos de proteção","Responder à pergunta: como é que um marítimo se protege antes de intervir","Ensinar a história das normas de segurança","Substituir a formação prática em EPI"],correct:1,expl:"A segurança pessoal precede sempre a intervenção; o equipamento responde a um perigo identificado, nunca o contrário."},
    {q:"Qual é a diferença entre esta lição e L1 (Safety Patrol)?",opts:["Não há nenhuma diferença, as duas lições são idênticas","L1 ensina a observar e reportar; L3 ensina a preparar-se, escolher as proteções e adotar o comportamento certo","L3 substitui inteiramente L1","L1 trata do EPI, L3 trata da deteção"],correct:1,expl:"Não existe redundância entre as duas lições, cada uma cobre um aspeto distinto."},
    {q:"Por que o perigo determina sempre o equipamento, e não o contrário?",opts:["Não é verdade, o equipamento vem sempre primeiro","Cada equipamento existe para responder a um perigo preciso identificado previamente","O equipamento é escolhido só por hábito","O regulamento impõe um equipamento sem relação com o perigo real"],correct:1,expl:"Um profissional nunca usa EPI porque o regulamento o impõe, mas porque identificou um perigo."},
    {q:"Toda a ronda deve obrigatoriamente ser feita a dois?",opts:["Sim, é uma regra universal em navegação","Não, mas algumas rondas ou inspeções devem ser, consoante o nível de risco ou os procedimentos da companhia","Não, nunca tem utilidade real","Sim, só de noite"],correct:1,expl:"Não é uma regra universal, mas uma organização adaptada a certos níveis de risco."},
    {q:"Qual é a vantagem de uma ronda a dois ou com um vigia designado quando é exigida?",opts:["Nenhuma vantagem real","Assistência imediata em caso de acidente, melhor comunicação, um testemunho fiável","Só atrasa a ronda sem benefício","Só diz respeito às rondas noturnas"],correct:1,expl:"Estas três vantagens justificam esta organização quando o risco ou o procedimento o exige."},
    {q:"O que cobre a secção sobre os perigos atmosféricos, além dos espaços confinados?",opts:["Só a falta de oxigénio","Falta de oxigénio, H2S, CO, vapores de hidrocarbonetos, LEL, e outros gases perigosos","Só os vapores de hidrocarbonetos","Esta secção só diz respeito aos espaços confinados"],correct:1,expl:"Os perigos atmosféricos vão além do quadro único dos espaços confinados."},
    {q:"O que representa realmente o detetor de gás?",opts:["Um simples equipamento opcional","Uma ferramenta de decisão que autoriza ou proíbe uma entrada, cuja medição prevalece sempre sobre a impressão visual","Um acessório de conforto sem utilidade real","Um equipamento puramente decorativo"],correct:1,expl:"O detetor nunca é apenas um equipamento para usar, é a ferramenta que decide uma entrada."},
    {q:"Qual é a mensagem central da secção sobre perigos atmosféricos?",opts:["É sempre possível entrar se o espaço parecer seguro visualmente","Nunca entrar numa zona perigosa sem ter verificado a atmosfera","O detetor de gás é opcional na maioria dos casos","Só os espaços muito escuros apresentam um risco"],correct:1,expl:"A aparência visual nunca garante a segurança real da atmosfera."},
    {q:"Que fatores humanos esta lição cobre, além da fadiga, do álcool e das drogas?",opts:["Nenhum outro fator existe","A rotina, o excesso de confiança, e a distração","Só as condições meteorológicas","Só a experiência profissional"],correct:1,expl:"Estes fatores adicionais são responsáveis por uma parte importante dos acidentes."},
    {q:"Por que a rotina pode tornar-se um fator de risco?",opts:["Não tem qualquer efeito real na segurança","Uma tarefa repetida pode fazer esquecer que continua perigosa, reduzindo a vigilância sem que o risco diminua","A rotina elimina todo o risco com o tempo","Só diz respeito a tarefas novas"],correct:1,expl:"O risco real nunca diminui com a repetição, ao contrário da vigilância."},
    {q:"O que cobre o comportamento profissional de segurança segundo esta lição?",opts:["Só o uso do EPI","Disciplina, respeito pelos procedimentos, prevenção de conflitos, uso responsável do telefone, confidencialidade e redes sociais","Só a pontualidade nas rendições","Esta secção só diz respeito aos oficiais"],correct:1,expl:"A segurança é também uma atitude, não apenas um conjunto de equipamentos."},
    {q:"Por que partilhar a posição ou a carga do navio nas redes sociais representa um problema?",opts:["É só uma questão estética sem consequência","Pode criar um risco de segurança real, não apenas uma questão de discrição","Não tem qualquer importância prática","Só a companhia pode ser afetada, nunca a tripulação"],correct:1,expl:"A confidencialidade operacional protege diretamente a segurança do navio e da tripulação."},
    {q:"No caso do Viking Islay, por que morreu o terceiro homem ao tentar resgatar?",opts:["Usava um aparelho respiratório completo perfeitamente adequado","Usou um aparelho de escape de emergência (EEBD), inadequado para uma entrada, cujo capuz se deslocou","Nunca tentou entrar no paiol de correntes","Usava todo o equipamento necessário sem qualquer problema"],correct:1,expl:"O EEBD é concebido para sair de uma zona perigosa, nunca para nela entrar."},
    {q:"O que confirma o caso do Viking Islay sobre os espaços confinados?",opts:["São sempre visivelmente perigosos","Um espaço confinado não precisa de apresentar um sinal visível para ser mortal, pois a corrosão pode empobrecer o oxigénio silenciosamente","O risco só existe em tanques muito grandes","Um teste de atmosfera nunca é necessário se o espaço parecer familiar"],correct:1,expl:"A atmosfera do paiol de correntes empobreceu progressivamente, sem qualquer sinal visível prévio."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' ?",opts:["Il ne faut jamais aider quelqu'un","Se protéger d'abord est la condition pour pouvoir réellement aider","Cela ne concerne que les officiers","Il faut agir sans réfléchir"],correct:1,expl:"Un sauveteur qui devient victime n'aide plus personne."},
    {q:"Pourquoi le danger détermine-t-il toujours l'équipement ?",opts:["Ce n'est pas vrai","Chaque équipement répond à un danger identifié au préalable","C'est une question d'habitude uniquement","Le règlement seul décide, sans lien avec le danger"],correct:1,expl:"Un professionnel porte un EPI parce qu'il a identifié un danger, pas par obligation aveugle."},
    {q:"Que représente le détecteur de gaz ?",opts:["Un simple accessoire optionnel","Un outil de décision qui autorise ou interdit une entrée","Un équipement décoratif","Il n'a aucune utilité réelle"],correct:1,expl:"Sa mesure prime toujours sur l'impression visuelle."},
    {q:"Pourquoi la routine peut-elle devenir un facteur de risque ?",opts:["Elle n'a aucun effet","Une tâche répétée peut faire oublier qu'elle reste dangereuse","Elle élimine tout risque avec le temps","Elle ne concerne que les débutants"],correct:1,expl:"Le risque réel ne diminue jamais, contrairement à la vigilance."},
    {q:"Dans le cas du Viking Islay, quelle erreur a causé la mort du troisième homme ?",opts:["Il portait un ARI parfaitement adapté","Il a utilisé un EEBD inadapté à une entrée, dont la cagoule s'est déplacée","Il n'a jamais tenté d'entrer","Aucune erreur n'a été commise"],correct:1,expl:"L'EEBD est conçu pour sortir, jamais pour entrer dans une zone dangereuse."},
  ],
  en:[
    {q:"What does 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One' mean?",opts:["You should never help anyone","Protecting yourself first is the condition for truly helping","It only concerns officers","You must act without thinking"],correct:1,expl:"A rescuer who becomes a victim helps no one."},
    {q:"Why does the danger always determine the equipment?",opts:["This isn't true","Each piece of equipment answers a danger identified beforehand","It's only a matter of habit","Regulation alone decides, with no link to the danger"],correct:1,expl:"A professional wears PPE because they identified a danger, not out of blind obligation."},
    {q:"What does the gas detector represent?",opts:["A simple optional accessory","A decision tool that authorizes or forbids an entry","Decorative equipment","It has no real use"],correct:1,expl:"Its reading always takes priority over visual impression."},
    {q:"Why can routine become a risk factor?",opts:["It has no effect","A repeated task can make one forget it remains dangerous","It eliminates all risk over time","It only concerns beginners"],correct:1,expl:"The real risk never decreases, unlike vigilance."},
    {q:"In the Viking Islay case, what mistake caused the third man's death?",opts:["He wore perfectly suited BA","He used an EEBD unsuited for entry, whose hood shifted","He never attempted to enter","No mistake was made"],correct:1,expl:"The EEBD is designed to exit, never to enter a dangerous zone."},
  ],
  es:[
    {q:"¿Qué significa 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?",opts:["Nunca hay que ayudar a nadie","Protegerse primero es la condición para poder ayudar realmente","Solo concierne a los oficiales","Hay que actuar sin pensar"],correct:1,expl:"Un rescatador que se convierte en víctima no ayuda a nadie."},
    {q:"¿Por qué el peligro siempre determina el equipo?",opts:["No es cierto","Cada equipo responde a un peligro identificado de antemano","Es solo cuestión de costumbre","Solo el reglamento decide, sin relación con el peligro"],correct:1,expl:"Un profesional lleva EPP porque identificó un peligro, no por obligación ciega."},
    {q:"¿Qué representa el detector de gas?",opts:["Un simple accesorio opcional","Una herramienta de decisión que autoriza o prohíbe una entrada","Un equipo decorativo","No tiene ninguna utilidad real"],correct:1,expl:"Su medición siempre prima sobre la impresión visual."},
    {q:"¿Por qué la rutina puede convertirse en un factor de riesgo?",opts:["No tiene ningún efecto","Una tarea repetida puede hacer olvidar que sigue siendo peligrosa","Elimina todo riesgo con el tiempo","Solo concierne a los principiantes"],correct:1,expl:"El riesgo real nunca disminuye, a diferencia de la vigilancia."},
    {q:"En el caso del Viking Islay, ¿qué error causó la muerte del tercer hombre?",opts:["Llevaba un ARI perfectamente adecuado","Usó un EEBD no adecuado para una entrada, cuya capucha se desplazó","Nunca intentó entrar","No se cometió ningún error"],correct:1,expl:"El EEBD está diseñado para salir, nunca para entrar en una zona peligrosa."},
  ],
  pt:[
    {q:"O que significa 'Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One'?",opts:["Nunca se deve ajudar ninguém","Proteger-se primeiro é a condição para poder ajudar realmente","Só diz respeito aos oficiais","Deve-se agir sem pensar"],correct:1,expl:"Um socorrista que se torna vítima não ajuda ninguém."},
    {q:"Por que o perigo determina sempre o equipamento?",opts:["Não é verdade","Cada equipamento responde a um perigo identificado previamente","É só questão de hábito","Só o regulamento decide, sem relação com o perigo"],correct:1,expl:"Um profissional usa EPI porque identificou um perigo, não por obrigação cega."},
    {q:"O que representa o detetor de gás?",opts:["Um simples acessório opcional","Uma ferramenta de decisão que autoriza ou proíbe uma entrada","Um equipamento decorativo","Não tem qualquer utilidade real"],correct:1,expl:"A sua medição prevalece sempre sobre a impressão visual."},
    {q:"Por que a rotina pode tornar-se um fator de risco?",opts:["Não tem qualquer efeito","Uma tarefa repetida pode fazer esquecer que continua perigosa","Elimina todo o risco com o tempo","Só diz respeito aos principiantes"],correct:1,expl:"O risco real nunca diminui, ao contrário da vigilância."},
    {q:"No caso do Viking Islay, que erro causou a morte do terceiro homem?",opts:["Usava um ARI perfeitamente adequado","Usou um EEBD inadequado para uma entrada, cujo capuz se deslocou","Nunca tentou entrar","Nenhum erro foi cometido"],correct:1,expl:"O EEBD é concebido para sair, nunca para entrar numa zona perigosa."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"Avant ta derniere intervention ou ronde, as-tu vraiment identifie le danger avant de choisir ton equipement, ou as-tu simplement suivi une habitude ?",
    en:"Before your last intervention or round, did you really identify the danger before choosing your equipment, or did you simply follow a habit?",
    es:"Antes de tu ultima intervencion o ronda, ¿identificaste realmente el peligro antes de elegir tu equipo, o simplemente seguiste una costumbre?",
    pt:"Antes da tua ultima intervencao ou ronda, identificaste realmente o perigo antes de escolher o teu equipamento, ou simplesmente seguiste um habito?",
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
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Leçon 3/6 · ⭐ Premium",
      title:"PPE, Safe Behaviour & Human Factors",
      intro:"Cette leçon ne présente pas une liste d'EPI. Elle répond à une seule question : comment un marin se protège-t-il avant d'intervenir ? Contrairement à la Leçon 1 (observer, détecter, signaler), cette leçon enseigne à se préparer, choisir les protections adaptées, et adopter le bon comportement.",
      p0:"PROTECT YOURSELF FIRST. A RESCUER WHO BECOMES A VICTIM SAVES NO ONE.",s0t:"Le principe qui structure toute la leçon",
      s0:"La sécurité personnelle précède toujours l'intervention. Les équipements ne sont jamais une finalité : ils sont la réponse à un danger identifié.\n\nCOMMENT LE RECONNAÎTRE ? Une situation où le danger n'a pas encore été clairement identifié avant d'agir.\nQUE FAIRE IMMÉDIATEMENT ? Identifier le danger, choisir l'équipement adapté, vérifier sa communication.\nQUELLE ERREUR L'AGGRAVE ? Intervenir ou tenter un sauvetage sans avoir vérifié sa propre protection.\nQUAND DEMANDER DE L'AIDE ? Dès qu'un danger dépasse ce que l'équipement disponible permet de gérer seul.",
      p1:"PREPARING FOR A SAFE PATROL",s1t:"Le danger détermine toujours l'équipement",
      s1:"Casque, chaussures de sécurité, gants, lampe ATEX, radio, sifflet, bandes rétro-réfléchissantes : chaque élément répond à une fonction précise. Ce n'est jamais un catalogue.\n\nToute ronde ne doit pas obligatoirement être réalisée à deux : ce n'est pas une règle universelle. Mais lorsque le niveau de risque ou les procédures de la compagnie l'exigent, une ronde à deux ou avec un veilleur désigné permet une assistance immédiate, une meilleure communication, et un témoignage fiable en cas d'incident.",
      p2:"ATMOSPHERIC HAZARDS & CONFINED SPACES",s2t:"Ne jamais entrer sans avoir vérifié l'atmosphère",
      s2:"Manque d'oxygène, H2S, CO, vapeurs d'hydrocarbures, LEL, et autres gaz dangereux : ces dangers vont bien au-delà des seuls espaces confinés. Le détecteur de gaz devient un outil de décision, jamais un simple équipement.",
      p3:"HUMAN FACTORS",s3t:"Le comportement humain cause plus d'accidents que la panne technique",
      s3:"Fatigue, alcool, drogues, routine, excès de confiance, distraction : ces facteurs sont responsables d'une part importante des accidents maritimes documentés.",
      p4:"PROFESSIONAL SAFETY BEHAVIOUR",s4t:"La sécurité est aussi une attitude",
      s4:"Discipline, respect des procédures, prévention des conflits, usage responsable du téléphone, confidentialité et réseaux sociaux : la sécurité collective dépend du comportement individuel de chacun.",
      p5:"✅ MINI CHECK-LIST PROFESSIONNELLE",p6:"🎯 EXERCICE OPÉRATIONNEL",p7:"⚠️ CAS D'ÉTUDE",p8:"📝 BANQUE DE 15 QUESTIONS",p9:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 3",
      sumP:["Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One","Le danger détermine toujours l'équipement, jamais l'inverse","Ne jamais entrer dans une zone dangereuse sans avoir vérifié l'atmosphère","Le comportement humain cause plus d'accidents que la panne technique","La sécurité est aussi une attitude, pas seulement un ensemble d'équipements"],
      learnedP:["La fonction précise de chaque équipement de protection","Les dangers atmosphériques au-delà des seuls espaces confinés","Les facteurs humains responsables de nombreux accidents","Le comportement professionnel attendu à bord","La check-list réflexe avant toute intervention"],
      transition:"You now know how to protect yourself. But what happens in the first minutes after you report an emergency?",
      safetyMsg:"Protect yourself first. A rescuer who becomes a victim saves no one.",
    },
    en:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lesson 3/6 · ⭐ Premium",
      title:"PPE, Safe Behaviour & Human Factors",
      intro:"This lesson does not present a list of PPE. It answers a single question: how does a sailor protect themselves before intervening? Unlike Lesson 1 (observing, detecting, reporting), this lesson teaches preparing, choosing the right protection, and adopting the right behavior.",
      p0:"PROTECT YOURSELF FIRST. A RESCUER WHO BECOMES A VICTIM SAVES NO ONE.",s0t:"The principle that structures the whole lesson",
      s0:"Personal safety always precedes intervention. Equipment is never a goal in itself: it's the answer to an identified danger.\n\nHOW DO I RECOGNIZE IT? A situation where the danger hasn't yet been clearly identified before acting.\nWHAT DO I DO IMMEDIATELY? Identify the danger, choose suitable equipment, check your communication.\nWHAT MISTAKE MAKES IT WORSE? Intervening or attempting a rescue without having checked your own protection.\nWHEN MUST I ASK FOR HELP? As soon as a danger exceeds what the available equipment can handle alone.",
      p1:"PREPARING FOR A SAFE PATROL",s1t:"The danger always determines the equipment",
      s1:"Helmet, safety boots, gloves, ATEX torch, radio, whistle, retro-reflective bands: each item answers a precise function. Never a catalog.\n\nNot every round must mandatorily be done in pairs: it isn't a universal rule. But when the risk level or company procedures require it, a two-person round or a designated watchman allows immediate assistance, better communication, and a reliable witness in case of an incident.",
      p2:"ATMOSPHERIC HAZARDS & CONFINED SPACES",s2t:"Never enter without having tested the atmosphere",
      s2:"Oxygen deficiency, H2S, CO, hydrocarbon vapors, LEL, and other dangerous gases: these hazards go well beyond confined spaces alone. The gas detector becomes a decision tool, never just equipment.",
      p3:"HUMAN FACTORS",s3t:"Human behavior causes more accidents than technical failure",
      s3:"Fatigue, alcohol, drugs, routine, overconfidence, distraction: these factors are responsible for a significant share of documented maritime accidents.",
      p4:"PROFESSIONAL SAFETY BEHAVIOUR",s4t:"Safety is also an attitude",
      s4:"Discipline, respect for procedures, preventing conflicts, responsible phone use, confidentiality and social media: collective safety depends on everyone's individual behavior.",
      p5:"✅ MINI PROFESSIONAL CHECKLIST",p6:"🎯 OPERATIONAL EXERCISE",p7:"⚠️ CASE STUDY",p8:"📝 15-QUESTION BANK",p9:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 3",
      sumP:["Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One","The danger always determines the equipment, never the other way round","Never enter a dangerous zone without having tested the atmosphere","Human behavior causes more accidents than technical failure","Safety is also an attitude, not just a set of equipment"],
      learnedP:["The precise function of each piece of protective equipment","Atmospheric hazards beyond confined spaces alone","The human factors responsible for many accidents","The professional behavior expected on board","The reflex checklist before any intervention"],
      transition:"You now know how to protect yourself. But what happens in the first minutes after you report an emergency?",
      safetyMsg:"Protect yourself first. A rescuer who becomes a victim saves no one.",
    },
    es:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lección 3/6 · ⭐ Premium",
      title:"PPE, Safe Behaviour & Human Factors",
      intro:"Esta lección no presenta una lista de EPP. Responde a una sola pregunta: ¿cómo se protege un marino antes de intervenir? A diferencia de la Lección 1 (observar, detectar, informar), esta lección enseña a prepararse, elegir la protección adecuada, y adoptar el comportamiento correcto.",
      p0:"PROTECT YOURSELF FIRST. A RESCUER WHO BECOMES A VICTIM SAVES NO ONE.",s0t:"El principio que estructura toda la lección",
      s0:"La seguridad personal siempre precede a la intervención. El equipo nunca es un fin en sí mismo: es la respuesta a un peligro identificado.\n\n¿CÓMO RECONOCERLO? Una situación donde el peligro aún no se ha identificado claramente antes de actuar.\n¿QUÉ HACER DE INMEDIATO? Identificar el peligro, elegir el equipo adecuado, comprobar tu comunicación.\n¿QUÉ ERROR LO AGRAVA? Intervenir o intentar un rescate sin haber comprobado tu propia protección.\n¿CUÁNDO PEDIR AYUDA? En cuanto un peligro supere lo que el equipo disponible puede manejar solo.",
      p1:"PREPARING FOR A SAFE PATROL",s1t:"El peligro siempre determina el equipo",
      s1:"Casco, botas de seguridad, guantes, linterna ATEX, radio, silbato, bandas retrorreflectantes: cada elemento responde a una función precisa. Nunca un catálogo.\n\nNo toda ronda debe realizarse obligatoriamente en pareja: no es una regla universal. Pero cuando el nivel de riesgo o los procedimientos de la compañía lo exigen, una ronda en pareja o con un vigilante designado permite una asistencia inmediata, una mejor comunicación, y un testimonio fiable en caso de incidente.",
      p2:"ATMOSPHERIC HAZARDS & CONFINED SPACES",s2t:"Nunca entrar sin haber comprobado la atmósfera",
      s2:"Falta de oxígeno, H2S, CO, vapores de hidrocarburos, LEL, y otros gases peligrosos: estos peligros van mucho más allá de los espacios confinados. El detector de gas se convierte en una herramienta de decisión, nunca solo un equipo.",
      p3:"HUMAN FACTORS",s3t:"El comportamiento humano causa más accidentes que el fallo técnico",
      s3:"Fatiga, alcohol, drogas, rutina, exceso de confianza, distracción: estos factores son responsables de una parte importante de los accidentes marítimos documentados.",
      p4:"PROFESSIONAL SAFETY BEHAVIOUR",s4t:"La seguridad también es una actitud",
      s4:"Disciplina, respeto de los procedimientos, prevención de conflictos, uso responsable del teléfono, confidencialidad y redes sociales: la seguridad colectiva depende del comportamiento individual de cada uno.",
      p5:"✅ MINI LISTA DE VERIFICACIÓN PROFESIONAL",p6:"🎯 EJERCICIO OPERATIVO",p7:"⚠️ CASO DE ESTUDIO",p8:"📝 BANCO DE 15 PREGUNTAS",p9:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 3",
      sumP:["Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One","El peligro siempre determina el equipo, nunca al revés","Nunca entrar en una zona peligrosa sin haber comprobado la atmósfera","El comportamiento humano causa más accidentes que el fallo técnico","La seguridad también es una actitud, no solo un conjunto de equipos"],
      learnedP:["La función precisa de cada equipo de protección","Los peligros atmosféricos más allá de los espacios confinados","Los factores humanos responsables de numerosos accidentes","El comportamiento profesional esperado a bordo","La lista de verificación refleja antes de cualquier intervención"],
      transition:"You now know how to protect yourself. But what happens in the first minutes after you report an emergency?",
      safetyMsg:"Protect yourself first. A rescuer who becomes a victim saves no one.",
    },
    pt:{
      badge:"🛡️ Safety · Ship Safety Operations & Emergency Readiness · Lição 3/6 · ⭐ Premium",
      title:"PPE, Safe Behaviour & Human Factors",
      intro:"Esta lição não apresenta uma lista de EPI. Responde a uma única pergunta: como é que um marítimo se protege antes de intervir? Ao contrário da Lição 1 (observar, detetar, reportar), esta lição ensina a preparar-se, escolher as proteções adequadas, e adotar o comportamento certo.",
      p0:"PROTECT YOURSELF FIRST. A RESCUER WHO BECOMES A VICTIM SAVES NO ONE.",s0t:"O princípio que estrutura toda a lição",
      s0:"A segurança pessoal precede sempre a intervenção. O equipamento nunca é um fim em si mesmo: é a resposta a um perigo identificado.\n\nCOMO RECONHECER? Uma situação em que o perigo ainda não foi claramente identificado antes de agir.\nO QUE FAZER IMEDIATAMENTE? Identificar o perigo, escolher o equipamento adequado, verificar a comunicação.\nQUE ERRO O AGRAVA? Intervir ou tentar um resgate sem ter verificado a própria proteção.\nQUANDO PEDIR AJUDA? Assim que um perigo ultrapassar o que o equipamento disponível pode gerir sozinho.",
      p1:"PREPARING FOR A SAFE PATROL",s1t:"O perigo determina sempre o equipamento",
      s1:"Capacete, botas de segurança, luvas, lanterna ATEX, rádio, apito, faixas retrorrefletoras: cada elemento responde a uma função precisa. Nunca um catálogo.\n\nNem toda a ronda deve ser feita obrigatoriamente a dois: não é uma regra universal. Mas quando o nível de risco ou os procedimentos da companhia o exigem, uma ronda a dois ou com um vigia designado permite uma assistência imediata, uma melhor comunicação, e um testemunho fiável em caso de incidente.",
      p2:"ATMOSPHERIC HAZARDS & CONFINED SPACES",s2t:"Nunca entrar sem ter verificado a atmosfera",
      s2:"Falta de oxigénio, H2S, CO, vapores de hidrocarbonetos, LEL, e outros gases perigosos: estes perigos vão muito além dos espaços confinados. O detetor de gás torna-se uma ferramenta de decisão, nunca apenas um equipamento.",
      p3:"HUMAN FACTORS",s3t:"O comportamento humano causa mais acidentes do que a falha técnica",
      s3:"Fadiga, álcool, drogas, rotina, excesso de confiança, distração: estes fatores são responsáveis por uma parte importante dos acidentes marítimos documentados.",
      p4:"PROFESSIONAL SAFETY BEHAVIOUR",s4t:"A segurança é também uma atitude",
      s4:"Disciplina, respeito pelos procedimentos, prevenção de conflitos, uso responsável do telefone, confidencialidade e redes sociais: a segurança coletiva depende do comportamento individual de cada um.",
      p5:"✅ MINI CHECKLIST PROFISSIONAL",p6:"🎯 EXERCÍCIO OPERACIONAL",p7:"⚠️ CASO DE ESTUDO",p8:"📝 BANCO DE 15 PERGUNTAS",p9:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 3",
      sumP:["Protect Yourself First. A Rescuer Who Becomes a Victim Saves No One","O perigo determina sempre o equipamento, nunca o contrário","Nunca entrar numa zona perigosa sem ter verificado a atmosfera","O comportamento humano causa mais acidentes do que a falha técnica","A segurança é também uma atitude, não apenas um conjunto de equipamentos"],
      learnedP:["A função precisa de cada equipamento de proteção","Os perigos atmosféricos além dos espaços confinados","Os fatores humanos responsáveis por muitos acidentes","O comportamento profissional esperado a bordo","A checklist reflexa antes de qualquer intervenção"],
      transition:"You now know how to protect yourself. But what happens in the first minutes after you report an emergency?",
      safetyMsg:"Protect yourself first. A rescuer who becomes a victim saves no one.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS6_L3({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{}, onQuizScored=(score:number,maxScore:number)=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 3/6":lang==="en"?"Lesson 3/6":lang==="es"?"Lección 3/6":"Lição 3/6"}</div>
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

            <SL icon="🦺" text={lc.p1} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🦺</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🦺 {lang==="fr"?"ÉQUIPEMENT - INTERACTIF":lang==="en"?"EQUIPMENT - INTERACTIVE":lang==="es"?"EQUIPO - INTERACTIVO":"EQUIPAMENTO - INTERATIVO"}</div><SafePatrolPrepSVG lang={lang}/></Card>

            <SL icon="☠️" text={lc.p2} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>☠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>☠️ {lang==="fr"?"DANGERS ATMOSPHÉRIQUES - INTERACTIF":lang==="en"?"ATMOSPHERIC HAZARDS - INTERACTIVE":lang==="es"?"PELIGROS ATMOSFÉRICOS - INTERACTIVO":"PERIGOS ATMOSFÉRICOS - INTERATIVO"}</div><AtmosphericHazardsSVG lang={lang}/></Card>

            <SL icon="🧠" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧠</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🧠 {lang==="fr"?"FACTEURS HUMAINS - INTERACTIF":lang==="en"?"HUMAN FACTORS - INTERACTIVE":lang==="es"?"FACTORES HUMANOS - INTERACTIVO":"FATORES HUMANOS - INTERATIVO"}</div><HumanFactorsSVG lang={lang}/></Card>

            <SL icon="🤝" text={lc.p4} color={C.green}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🤝</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.green,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🤝 {lang==="fr"?"COMPORTEMENT PROFESSIONNEL - INTERACTIF":lang==="en"?"PROFESSIONAL BEHAVIOUR - INTERACTIVE":lang==="es"?"COMPORTAMIENTO PROFESIONAL - INTERACTIVO":"COMPORTAMENTO PROFISSIONAL - INTERATIVO"}</div><ProfessionalBehaviourSVG lang={lang}/></Card>

            <SL icon="✅" text={lc.p5} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><MiniChecklistSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p6} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p7} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p8} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank} onComplete={()=>setBankDone(true)}/></Card>

            <SL icon="🪞" text={lc.p9} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - EPI & Facteurs Humains":lang==="en"?"Final Quiz - PPE & Human Factors":lang==="es"?"Quiz Final - EPP y Factores Humanos":"Quiz Final - EPI e Fatores Humanos"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 3/6":"questions · Lesson 3/6"}</div>
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
              {lang==="fr"?"LEÇON 4 - EMERGENCY REPORTING →":lang==="en"?"LESSON 4 - EMERGENCY REPORTING →":lang==="es"?"LECCIÓN 4 - EMERGENCY REPORTING →":"LIÇÃO 4 - EMERGENCY REPORTING →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
