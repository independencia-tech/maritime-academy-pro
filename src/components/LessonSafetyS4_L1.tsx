import { useState, useEffect } from "react";
import { C, T, Stars, Card, GLine, SL, QuizComp, QuestionBank } from "./LessonShared";

// SVG 1 - HOW HEAT SPREADS
function HeatTransferSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"🔗", label:{fr:"Conduction",en:"Conduction",es:"Conducción",pt:"Condução"}, desc:{fr:"La chaleur voyage à travers un matériau solide, comme une cloison métallique qui devient chaude d'un côté parce que l'autre côté brûle.",en:"Heat travels through a solid material, like a metal bulkhead becoming hot on one side because the other side is burning.",es:"El calor viaja a través de un material sólido, como un mamparo metálico que se calienta de un lado porque el otro lado arde.",pt:"O calor viaja através de um material sólido, como um anteparo metálico que fica quente de um lado porque o outro lado está a arder."} },
    { id:2, icon:"🌀", label:{fr:"Convection",en:"Convection",es:"Convección",pt:"Convecção"}, desc:{fr:"L'air chaud monte et se déplace, transportant la chaleur et la fumée vers les ponts supérieurs par les coursives et les gaines.",en:"Hot air rises and moves, carrying heat and smoke to upper decks through alleyways and ducts.",es:"El aire caliente sube y se desplaza, transportando calor y humo a las cubiertas superiores por pasillos y conductos.",pt:"O ar quente sobe e desloca-se, transportando calor e fumo para os conveses superiores através de corredores e condutas."} },
    { id:3, icon:"☀️", label:{fr:"Rayonnement",en:"Radiation",es:"Radiación",pt:"Radiação"}, desc:{fr:"La chaleur se propage à distance sans contact direct, comme la chaleur d'un feu qui enflamme un objet combustible à proximité.",en:"Heat spreads across a distance without direct contact, like the heat of a fire igniting a nearby combustible object.",es:"El calor se propaga a distancia sin contacto directo, como el calor de un fuego que enciende un objeto combustible cercano.",pt:"O calor propaga-se à distância sem contacto direto, como o calor de um fogo que incendeia um objeto combustível próximo."} },
    { id:4, icon:"🔥", label:{fr:"Contact direct",en:"Direct contact",es:"Contacto directo",pt:"Contacto direto"}, desc:{fr:"La flamme touche physiquement un nouveau matériau combustible et l'enflamme directement, le mode de propagation le plus visible.",en:"The flame physically touches a new combustible material and ignites it directly, the most visible way fire spreads.",es:"La llama toca físicamente un nuevo material combustible y lo enciende directamente, la forma más visible de propagación.",pt:"A chama toca fisicamente num novo material combustível e incendeia-o diretamente, a forma mais visível de propagação."} },
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

// SVG 2 - SMOKE, THE FIRST DANGER
function SmokeDangerSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"☠️", label:{fr:"Gaz toxiques",en:"Toxic gases",es:"Gases tóxicos",pt:"Gases tóxicos"}, desc:{fr:"La combustion de matériaux modernes (plastiques, mousses) libère des gaz mortels bien avant que la chaleur ne devienne insupportable.",en:"Burning modern materials (plastics, foams) releases deadly gases well before heat becomes unbearable.",es:"La combustión de materiales modernos (plásticos, espumas) libera gases mortales mucho antes de que el calor sea insoportable.",pt:"A combustão de materiais modernos (plásticos, espumas) liberta gases mortais muito antes de o calor se tornar insuportável."} },
    { id:2, icon:"👁️", label:{fr:"Perte de visibilité et désorientation",en:"Visibility loss and disorientation",es:"Pérdida de visibilidad y desorientación",pt:"Perda de visibilidade e desorientação"}, desc:{fr:"Une coursive peut devenir totalement opaque en moins d'une minute. La désorientation qui en résulte peut devenir critique avant même que les flammes ne soient visibles : on peut se perdre à quelques mètres d'une issue connue.",en:"An alleyway can become completely opaque in under a minute. The resulting disorientation can become critical before flames are even visible: you can get lost just meters from a known exit.",es:"Un pasillo puede volverse totalmente opaco en menos de un minuto. La desorientación resultante puede volverse crítica incluso antes de que las llamas sean visibles: se puede perder el rumbo a pocos metros de una salida conocida.",pt:"Um corredor pode ficar totalmente opaco em menos de um minuto. A desorientação resultante pode tornar-se crítica mesmo antes de as chamas serem visíveis: é possível perder-se a poucos metros de uma saída conhecida."} },
    { id:3, icon:"🫁", label:{fr:"Réduction de l'oxygène",en:"Reduced oxygen",es:"Reducción de oxígeno",pt:"Redução de oxigénio"}, desc:{fr:"La fumée déplace l'air respirable, provoquant une perte de conscience avant même que la victime ne ressente la chaleur des flammes.",en:"Smoke displaces breathable air, causing loss of consciousness before the casualty even feels the heat of the flames.",es:"El humo desplaza el aire respirable, provocando pérdida de conciencia antes de que la víctima sienta el calor de las llamas.",pt:"O fumo desloca o ar respirável, provocando perda de consciência antes mesmo de a vítima sentir o calor das chamas."} },
    { id:4, icon:"📈", label:{fr:"La fumée tue avant la flamme",en:"Smoke kills before flame",es:"El humo mata antes que la llama",pt:"O fumo mata antes da chama"}, desc:{fr:"La majorité des décès liés au feu résultent d'une intoxication par la fumée ou d'une désorientation fatale, pas de brûlures directes.",en:"Most fire-related deaths result from smoke inhalation or fatal disorientation, not direct burns.",es:"La mayoría de las muertes relacionadas con el fuego resultan de la inhalación de humo o de una desorientación fatal, no de quemaduras directas.",pt:"A maioria das mortes relacionadas com incêndios resulta da inalação de fumo ou de uma desorientação fatal, não de queimaduras diretas."} },
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

// SVG 3 - EARLY WARNING SIGNS
function EarlyWarningSignsSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const items = [
    { id:1, icon:"👃", label:{fr:"Odeur inhabituelle",en:"Unusual smell",es:"Olor inusual",pt:"Cheiro invulgar"}, desc:{fr:"Une odeur de brûlé, même faible et même sans source visible, ne doit jamais être ignorée ni minimisée.",en:"A burning smell, even faint and with no visible source, must never be ignored or minimized.",es:"Un olor a quemado, incluso débil y sin fuente visible, nunca debe ignorarse ni minimizarse.",pt:"Um cheiro a queimado, mesmo fraco e sem fonte visível, nunca deve ser ignorado nem minimizado."} },
    { id:2, icon:"🖐️", label:{fr:"Cloison ou porte chaude",en:"Warm bulkhead or door",es:"Mamparo o puerta caliente",pt:"Anteparo ou porta quente"}, desc:{fr:"Vérifier avec prudence à l'aide du dos de la main, sans jamais ouvrir la porte. Une chaleur anormale ou une peinture qui se décolore signale une chaleur croissante de l'autre côté.",en:"Check cautiously with the back of the hand, without opening the door. Abnormal warmth or discoloring paint signals rising heat on the other side.",es:"Comprobar con precaución con el dorso de la mano, sin abrir nunca la puerta. Un calor anormal o una pintura que se decolora señala un calor creciente al otro lado.",pt:"Verificar com cautela com as costas da mão, sem nunca abrir a porta. Um calor anormal ou tinta que descolora sinaliza calor crescente do outro lado."} },
    { id:3, icon:"🔊", label:{fr:"Crépitement",en:"Crackling sound",es:"Crepitación",pt:"Crepitação"}, desc:{fr:"Un bruit de crépitement derrière une cloison ou une porte, souvent perçu avant toute fumée visible.",en:"A crackling sound behind a bulkhead or door, often noticed before any visible smoke.",es:"Un sonido de crepitación detrás de un mamparo o puerta, a menudo percibido antes de cualquier humo visible.",pt:"Um som de crepitação atrás de um anteparo ou porta, muitas vezes percebido antes de qualquer fumo visível."} },
    { id:4, icon:"🌫️", label:{fr:"Léger voile de fumée",en:"Faint smoke haze",es:"Ligero velo de humo",pt:"Leve véu de fumo"}, desc:{fr:"Un voile discret, presque imperceptible, précède souvent un développement rapide du feu de plusieurs minutes.",en:"A discreet, almost imperceptible haze often precedes rapid fire development by several minutes.",es:"Un velo discreto, casi imperceptible, a menudo precede en varios minutos el desarrollo rápido del fuego.",pt:"Um véu discreto, quase impercetível, muitas vezes precede em vários minutos o desenvolvimento rápido do fogo."} },
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
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>{lang==="fr"?"Un seul signe suffit pour donner l'alerte, jamais besoin d'attendre les flammes.":lang==="en"?"A single sign is enough to raise the alarm, never wait for flames.":lang==="es"?"Un solo signo basta para dar la alarma, nunca esperar a las llamas.":"Um único sinal basta para dar o alarme, nunca esperar pelas chamas."}</div>
    </div>
  );
}

// SVG 4 - FIRE GROWTH STAGES
function FireGrowthStagesSVG({ lang }) {
  const [sel, setSel] = useState(null);
  const stages = [
    { id:0, color:C.gold2, label:{fr:"Naissance",en:"Ignition",es:"Nacimiento",pt:"Nascimento"}, desc:{fr:"Un point chaud rencontre un combustible. Souvent silencieux, souvent invisible. La fenêtre idéale pour intervenir avec un simple extincteur.",en:"A hot point meets fuel. Often silent, often invisible. The ideal window to intervene with a simple extinguisher.",es:"Un punto caliente se encuentra con combustible. A menudo silencioso, a menudo invisible. La ventana ideal para intervenir con un simple extintor.",pt:"Um ponto quente encontra combustível. Muitas vezes silencioso, muitas vezes invisível. A janela ideal para intervir com um simples extintor."} },
    { id:1, color:C.orange, label:{fr:"Croissance",en:"Growth",es:"Crecimiento",pt:"Crescimento"}, desc:{fr:"Les flammes se développent, la fumée s'intensifie, la chaleur monte rapidement. Encore gérable, mais chaque minute compte désormais.",en:"Flames develop, smoke intensifies, heat rises quickly. Still manageable, but every minute counts now.",es:"Las llamas se desarrollan, el humo se intensifica, el calor sube rápidamente. Todavía manejable, pero cada minuto cuenta ahora.",pt:"As chamas desenvolvem-se, o fumo intensifica-se, o calor sobe rapidamente. Ainda gerível, mas cada minuto conta agora."} },
    { id:2, color:C.red, label:{fr:"Flashover - le seuil à éviter",en:"Flashover - the threshold to avoid",es:"Flashover - el umbral a evitar",pt:"Flashover - o limiar a evitar"}, desc:{fr:"Le seuil critique : passé ce point, tout l'espace s'embrase d'un coup. Extrêmement dangereux, souvent fatal pour quiconque est encore présent. L'objectif de toute cette leçon est d'agir avant que ce seuil ne soit jamais atteint.",en:"The critical threshold: past this point, the whole space ignites at once. Extremely dangerous, often fatal for anyone still present. The whole point of this lesson is to act before this threshold is ever reached.",es:"El umbral crítico: pasado este punto, todo el espacio se incendia de golpe. Extremadamente peligroso, a menudo fatal para quien esté todavía presente. El objetivo de toda esta lección es actuar antes de que se alcance este umbral.",pt:"O limiar crítico: depois deste ponto, todo o espaço incendeia-se de uma vez. Extremamente perigoso, muitas vezes fatal para quem ainda estiver presente. O objetivo de toda esta lição é agir antes de este limiar ser alguma vez atingido."} },
    { id:3, color:C.gold, label:{fr:"Développé",en:"Fully developed",es:"Desarrollado",pt:"Desenvolvido"}, desc:{fr:"Le feu consomme tout le combustible disponible à pleine intensité. À ce stade, seuls les systèmes fixes et les équipes formées peuvent agir.",en:"The fire consumes all available fuel at full intensity. At this stage, only fixed systems and trained teams can act.",es:"El fuego consume todo el combustible disponible a plena intensidad. En esta etapa, solo los sistemas fijos y los equipos formados pueden actuar.",pt:"O fogo consome todo o combustível disponível em plena intensidade. Nesta fase, só os sistemas fixos e as equipas formadas podem agir."} },
  ];
  const sel_ = stages.find(s=>s.id===sel);
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
        {stages.map((s,idx)=>(
          <div key={s.id}>
            <div onClick={()=>setSel(sel===s.id?null:s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,cursor:"pointer",background:sel===s.id?`${s.color}22`:"rgba(255,255,255,0.04)",border:`1.5px solid ${sel===s.id?s.color:"rgba(255,255,255,0.08)"}`}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:s.color,flexShrink:0}}/>
              <div style={{fontSize:11,fontWeight:700,color:C.white,flex:1}}>{s.label[lang]||s.label.fr}</div>
            </div>
            {idx<stages.length-1&&<div style={{textAlign:"center",fontSize:12,color:C.muted,padding:"2px 0"}}>↓</div>}
          </div>
        ))}
      </div>
      {sel_&&<div style={{padding:"10px 12px",borderRadius:12,background:`${sel_.color}15`,border:`1px solid ${sel_.color}44`,fontSize:11,color:C.white,lineHeight:1.7}}>{sel_.desc[lang]||sel_.desc.fr}</div>}
      <div style={{marginTop:8,fontSize:10,color:C.gold2,fontStyle:"italic",textAlign:"center"}}>
        {lang==="fr"?"L'objectif est toujours d'agir avant le flashover, jamais après.":lang==="en"?"The goal is always to act before flashover, never after.":lang==="es"?"El objetivo es siempre actuar antes del flashover, nunca después.":"O objetivo é sempre agir antes do flashover, nunca depois."}
      </div>
    </div>
  );
}

// EXERCISE - EARLY RECOGNITION DECISIONS
function Exercise1({ lang, t }) {
  const [ans, setAns] = useState({q1:"",q2:"",q3:"",q4:""});
  const [showC, setShowC] = useState(false);
  const correct = {q1:"b",q2:"a",q3:"c",q4:"b"};
  const qs = {
    fr:[
      {id:"q1",q:"Vous sentez une faible odeur de brûlé sans en trouver la source. Que faites-vous ?\na) Ignorer, ça arrive souvent sans gravité\nb) Signaler immédiatement, même sans confirmation visuelle\nc) Attendre de sentir l'odeur une deuxième fois avant d'agir"},
      {id:"q2",q:"Une porte est peut-être chaude. Que faites-vous ?\na) Vérifier avec prudence avec le dos de la main, sans jamais l'ouvrir\nb) L'ouvrir rapidement pour vérifier visuellement\nc) Poser la paume entière contre la porte pour être sûr"},
      {id:"q3",q:"Un feu est encore au stade de naissance, à peine visible. Quelle est la meilleure fenêtre d'action ?\na) Attendre le stade de croissance pour être sûr que c'est bien un feu\nb) Attendre le développement complet pour justifier l'alerte générale\nc) Intervenir maintenant, avec un extincteur simple si les conditions le permettent"},
      {id:"q4",q:"Vous percevez un léger voile de fumée qui semble presque imperceptible. Que faites-vous ?\na) Ne rien dire, ce n'est probablement rien\nb) Le signaler comme un signe précoce à part entière, sans minimiser\nc) Attendre de voir si le voile s'épaissit avant de réagir"},
    ],
    en:[
      {id:"q1",q:"You smell a faint burning odor without finding its source. What do you do?\na) Ignore it, this often happens without being serious\nb) Report it immediately, even without visual confirmation\nc) Wait to smell it a second time before acting"},
      {id:"q2",q:"A door might be warm. What do you do?\na) Check cautiously with the back of the hand, never opening it\nb) Open it quickly to check visually\nc) Place your whole palm against it to be sure"},
      {id:"q3",q:"A fire is still at the ignition stage, barely visible. What is the best window to act?\na) Wait for the growth stage to be sure it's really a fire\nb) Wait for full development to justify the general alarm\nc) Act now, with a simple extinguisher if conditions allow"},
      {id:"q4",q:"You notice a faint smoke haze that seems almost imperceptible. What do you do?\na) Say nothing, it's probably nothing\nb) Report it as a full early sign in its own right, without minimizing it\nc) Wait to see if the haze thickens before reacting"},
    ],
    es:[
      {id:"q1",q:"Hueles un ligero olor a quemado sin encontrar su origen. ¿Qué haces?\na) Ignorarlo, esto suele pasar sin gravedad\nb) Informar de inmediato, incluso sin confirmación visual\nc) Esperar a olerlo una segunda vez antes de actuar"},
      {id:"q2",q:"Una puerta podría estar caliente. ¿Qué haces?\na) Comprobar con precaución con el dorso de la mano, sin abrirla nunca\nb) Abrirla rápido para comprobar visualmente\nc) Apoyar toda la palma contra ella para estar seguro"},
      {id:"q3",q:"Un fuego todavía está en etapa de nacimiento, apenas visible. ¿Cuál es la mejor ventana para actuar?\na) Esperar a la etapa de crecimiento para estar seguro de que es un fuego\nb) Esperar al desarrollo completo para justificar la alarma general\nc) Actuar ahora, con un extintor simple si las condiciones lo permiten"},
      {id:"q4",q:"Percibes un ligero velo de humo casi imperceptible. ¿Qué haces?\na) No decir nada, probablemente no es nada\nb) Informarlo como un signo precoz de pleno derecho, sin minimizarlo\nc) Esperar a ver si el velo se espesa antes de reaccionar"},
    ],
    pt:[
      {id:"q1",q:"Sentes um leve cheiro a queimado sem encontrar a origem. O que fazes?\na) Ignorar, isso acontece muitas vezes sem gravidade\nb) Reportar de imediato, mesmo sem confirmação visual\nc) Esperar sentir o cheiro uma segunda vez antes de agir"},
      {id:"q2",q:"Uma porta pode estar quente. O que fazes?\na) Verificar com cautela com as costas da mão, sem nunca a abrir\nb) Abri-la rapidamente para verificar visualmente\nc) Encostar a palma inteira para ter a certeza"},
      {id:"q3",q:"Um fogo ainda está na fase de nascimento, mal visível. Qual é a melhor janela para agir?\na) Esperar pela fase de crescimento para ter certeza de que é mesmo um fogo\nb) Esperar pelo desenvolvimento completo para justificar o alarme geral\nc) Agir agora, com um extintor simples se as condições permitirem"},
      {id:"q4",q:"Percebes um leve véu de fumo quase impercetível. O que fazes?\na) Não dizer nada, provavelmente não é nada\nb) Reportá-lo como um sinal precoce de pleno direito, sem minimizar\nc) Esperar para ver se o véu engrossa antes de reagir"},
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

// ACCIDENT CASE - REAL EVENT (STAR PRINCESS 2006)
function AccidentCase({ lang }) {
  const [exp, setExp] = useState(false);
  const d = {
    fr:{title:"Incendie du Star Princess (2006)",teaser:"Croisière · Mégot mal éteint · 1 mort · Amendements SOLAS",
      what:"En mars 2006, un mégot mal éteint couve environ 20 minutes sur un balcon du Star Princess avant que des flammes n'apparaissent. Un peu plus tôt, un membre d'équipage avait senti une odeur de brûlé sur un autre pont et avait vérifié la zone sans rien trouver. Une fois établi, le feu se propage le long des balcons adjacents et atteint deux ponts supérieurs en seulement six minutes, porté par le vent et par du mobilier de balcon hautement combustible. Un passager meurt d'une intoxication à la fumée, et des dizaines de cabines sont détruites ou endommagées.",
      cause:"• Un mégot smolder pendant 20 minutes sans être détecté avant l'apparition des flammes\n• Une odeur de brûlé perçue plus tôt n'a pas conduit à trouver le foyer réel avant l'embrasement\n• Mobilier et cloisons de balcon en matériaux hautement combustibles, propagation rapide assistée par le vent\n• Absence de détecteurs de fumée et de systèmes d'extinction sur les zones extérieures à l'époque",
      lessons:"✓ If You Can Smell It, It Has Already Started : l'odeur perçue plus tôt était déjà un signal exploitable\n✓ Une vérification incomplète (chercher sans trouver) ne doit jamais clore l'alerte, elle doit l'élargir\n✓ Les matériaux combustibles en zones extérieures représentent un risque sous-estimé\n✓ Résultat : amendements SOLAS renforçant la protection incendie des balcons de navires à passagers",
      link:"🔗 Ce cas illustre directement pourquoi la reconnaissance précoce doit primer sur la confirmation visuelle des flammes."},
    en:{title:"Star Princess Fire (2006)",teaser:"Cruise ship · Discarded cigarette · 1 death · SOLAS amendments",
      what:"In March 2006, a discarded cigarette smoldered for about 20 minutes on a Star Princess balcony before flames appeared. Slightly earlier, a crew member had smelled burning on another deck and checked the area without finding anything. Once established, the fire spread along adjacent balconies and reached two upper decks in just six minutes, driven by wind and highly combustible balcony furniture. One passenger died of smoke inhalation, and dozens of cabins were destroyed or damaged.",
      cause:"• A cigarette smoldered for 20 minutes undetected before flames appeared\n• An earlier burning smell did not lead to finding the actual source before ignition\n• Highly combustible balcony furniture and partitions, rapid wind-assisted spread\n• No smoke detectors or extinguishing systems on external areas at the time",
      lessons:"✓ If You Can Smell It, It Has Already Started: the earlier smell was already an actionable signal\n✓ An incomplete check (looking without finding) should never close the alert, it should widen it\n✓ Combustible materials in external areas represent an underestimated risk\n✓ Result: SOLAS amendments strengthening fire protection on passenger ship balconies",
      link:"🔗 This case directly illustrates why early recognition must take priority over visual confirmation of flames."},
    es:{title:"Incendio del Star Princess (2006)",teaser:"Crucero · Colilla mal apagada · 1 muerto · Enmiendas SOLAS",
      what:"En marzo de 2006, una colilla mal apagada estuvo ardiendo lentamente unos 20 minutos en un balcón del Star Princess antes de que aparecieran llamas. Un poco antes, un tripulante había olido a quemado en otra cubierta y había revisado la zona sin encontrar nada. Una vez establecido, el fuego se propagó por los balcones adyacentes y alcanzó dos cubiertas superiores en solo seis minutos, impulsado por el viento y por mobiliario de balcón muy combustible. Un pasajero murió por inhalación de humo, y decenas de camarotes quedaron destruidos o dañados.",
      cause:"• Una colilla ardió lentamente 20 minutos sin ser detectada antes de que aparecieran llamas\n• Un olor a quemado percibido antes no llevó a encontrar el foco real antes de la ignición\n• Mobiliario y particiones de balcón muy combustibles, propagación rápida asistida por el viento\n• Sin detectores de humo ni sistemas de extinción en zonas exteriores en aquel momento",
      lessons:"✓ If You Can Smell It, It Has Already Started: el olor percibido antes ya era una señal accionable\n✓ Una comprobación incompleta (buscar sin encontrar) nunca debe cerrar la alerta, debe ampliarla\n✓ Los materiales combustibles en zonas exteriores representan un riesgo subestimado\n✓ Resultado: enmiendas SOLAS que refuerzan la protección contra incendios en balcones de buques de pasaje",
      link:"🔗 Este caso ilustra directamente por qué el reconocimiento precoz debe primar sobre la confirmación visual de las llamas."},
    pt:{title:"Incêndio do Star Princess (2006)",teaser:"Cruzeiro · Beata mal apagada · 1 morto · Emendas SOLAS",
      what:"Em março de 2006, uma beata mal apagada esteve a arder lentamente cerca de 20 minutos numa varanda do Star Princess antes de aparecerem chamas. Pouco antes, um tripulante tinha sentido cheiro a queimado noutro convés e tinha verificado a zona sem encontrar nada. Uma vez estabelecido, o fogo propagou-se pelas varandas adjacentes e atingiu dois conveses superiores em apenas seis minutos, impulsionado pelo vento e por mobiliário de varanda muito combustível. Um passageiro morreu por inalação de fumo, e dezenas de cabines ficaram destruídas ou danificadas.",
      cause:"• Uma beata ardeu lentamente 20 minutos sem ser detetada antes de aparecerem chamas\n• Um cheiro a queimado sentido antes não levou a encontrar o foco real antes da ignição\n• Mobiliário e partições de varanda muito combustíveis, propagação rápida assistida pelo vento\n• Sem detetores de fumo nem sistemas de extinção nas zonas exteriores na altura",
      lessons:"✓ If You Can Smell It, It Has Already Started: o cheiro sentido antes já era um sinal acionável\n✓ Uma verificação incompleta (procurar sem encontrar) nunca deve encerrar o alerta, deve alargá-lo\n✓ Os materiais combustíveis em zonas exteriores representam um risco subestimado\n✓ Resultado: emendas SOLAS reforçando a proteção contra incêndios nas varandas de navios de passageiros",
      link:"🔗 Este caso ilustra diretamente por que o reconhecimento precoce deve ter prioridade sobre a confirmação visual das chamas."},
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
    {q:"Que signifie le principe 'If You Can Smell It, It Has Already Started' ?",opts:["Il faut attendre de voir les flammes avant d'agir","Une odeur de brûlé, même faible, signifie qu'un processus de combustion est déjà en cours","L'odorat n'est pas fiable pour détecter un feu","Ce principe ne s'applique qu'aux feux électriques"],correct:1,expl:"Percevoir une odeur signifie que la combustion a déjà commencé, même sans flamme visible."},
    {q:"Qu'est-ce que la conduction dans la propagation de la chaleur ?",opts:["La chaleur qui se propage sans contact, à distance","La chaleur qui voyage à travers un matériau solide","L'air chaud qui monte et se déplace","Le contact direct entre une flamme et un matériau"],correct:1,expl:"La conduction transporte la chaleur à travers un matériau solide, comme une cloison qui devient chaude."},
    {q:"Pourquoi la fumée est-elle considérée comme le premier danger d'un feu ?",opts:["Elle est juste inconfortable, sans danger réel","Elle contient des gaz toxiques et provoque perte de visibilité et désorientation en quelques secondes, tuant souvent avant la flamme","Elle n'affecte que les yeux","Elle ralentit toujours le feu"],correct:1,expl:"La majorité des décès liés au feu résultent d'une intoxication par la fumée ou d'une désorientation fatale, pas de brûlures directes."},
    {q:"Une porte est peut-être chaude. Comment vérifiez-vous en sécurité ?",opts:["En l'ouvrant directement pour regarder","Avec prudence, à l'aide du dos de la main, sans jamais l'ouvrir","En posant la paume entière contre la porte","En attendant qu'un collègue vérifie à votre place"],correct:1,expl:"Le dos de la main permet de vérifier la chaleur sans risque de brûlure grave et sans ouvrir la porte."},
    {q:"Quel est le tout premier stade de développement d'un feu ?",opts:["Le flashover","La naissance (ignition)","Le développement complet","La croissance"],correct:1,expl:"La naissance est le stade initial, souvent silencieux et invisible, la meilleure fenêtre pour intervenir."},
    {q:"Qu'est-ce qu'un flashover ?",opts:["Un simple pic de fumée sans danger","Le seuil critique où tout un espace s'embrase presque simultanément, extrêmement dangereux","Une étape sans importance pratique","Le moment où le feu s'éteint naturellement"],correct:1,expl:"Le flashover est le seuil à éviter à tout prix, souvent fatal pour quiconque reste dans le compartiment."},
    {q:"Pourquoi agir avant le flashover plutôt qu'après ?",opts:["Ça ne fait aucune différence","Après le flashover, seuls les systèmes fixes et les équipes formées peuvent agir efficacement","Le flashover facilite l'extinction","Le flashover ne concerne que les feux électriques"],correct:1,expl:"Une fois le flashover atteint, l'intervention simple n'est plus possible, seuls les moyens lourds restent efficaces."},
    {q:"Un membre d'équipage sent une odeur de brûlé, vérifie une zone, ne trouve rien. Que faire ensuite ?",opts:["Considérer l'alerte close puisque rien n'a été trouvé","Élargir la recherche et rester vigilant, ne jamais clore l'alerte sur une vérification incomplète","Attendre de sentir l'odeur une deuxième fois","Informer uniquement à la fin du quart"],correct:1,expl:"Une vérification incomplète ne doit jamais clore une alerte, comme l'illustre le cas du Star Princess."},
    {q:"Dans le cas du Star Princess, combien de temps le mégot a-t-il couvé avant l'apparition des flammes ?",opts:["Quelques secondes","Environ 20 minutes","Plusieurs heures","Il n'y a pas eu de délai"],correct:1,expl:"Le mégot mal éteint a couvé environ 20 minutes avant que des flammes n'apparaissent."},
    {q:"Pourquoi le feu du Star Princess s'est-il propagé aussi rapidement une fois établi ?",opts:["Grâce à des systèmes de détection efficaces","À cause du mobilier de balcon hautement combustible et du vent","Grâce à l'intervention rapide de l'équipage","Il ne s'est pas propagé rapidement"],correct:1,expl:"Le mobilier combustible et le vent ont porté le feu à deux ponts supérieurs en seulement six minutes."},
    {q:"Que signifie 'Detect' dans le MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover) ?",opts:["Éteindre le feu directement","Reconnaître les signes d'un feu avant ou dès son apparition, l'objet de cette leçon","Organiser les équipes d'urgence","Documenter l'incident après coup"],correct:1,expl:"Cette leçon couvre exclusivement l'étape Detect du MAP Fire Mindset."},
    {q:"Cette leçon aborde-t-elle en détail les classes de feu et les types d'extincteurs ?",opts:["Oui, en profondeur","Non, ce sujet est déjà couvert en détail dans le département Engine, pour éviter toute redondance","Oui, mais uniquement pour la classe A","Non, ce sujet n'est traité nulle part dans MAP"],correct:1,expl:"Le module Safety reste volontairement complémentaire, sans répéter ce qui est déjà enseigné ailleurs."},
    {q:"Quelle est la seule mention du triangle du feu dans cette leçon ?",opts:["Un chapitre entier et détaillé","Un rappel bref de 2-3 minutes avant d'aborder la reconnaissance précoce","Il n'est pas mentionné du tout","Une leçon complète y est consacrée"],correct:1,expl:"Le triangle du feu reste une introduction brève, pas le cœur de cette leçon."},
    {q:"Quelle erreur aggrave le plus une situation de feu naissant ?",opts:["Donner l'alerte trop tôt","Ignorer un signe faible en pensant que 'ce n'est rien'","Vérifier une cloison chaude avec le dos de la main","Signaler une odeur de brûlé"],correct:1,expl:"Minimiser un signe faible retarde l'action au moment où elle serait la plus efficace."},
    {q:"Ce module enseigne-t-il un substitut à une formation BST pratique certifiée ?",opts:["Oui, il est équivalent à une certification BST complète","Non, il enseigne la reconnaissance et les principes de décision, jamais un substitut à une formation pratique certifiée","Oui, mais uniquement pour les officiers","Non, il ne sert à rien sans matériel"],correct:1,expl:"MAP enseigne des principes de reconnaissance, jamais un remplacement de la formation BST pratique."},
  ],
  en:[
    {q:"What does the principle 'If You Can Smell It, It Has Already Started' mean?",opts:["You must wait to see flames before acting","A burning smell, even faint, means a combustion process is already underway","Smell is not reliable for detecting fire","This principle only applies to electrical fires"],correct:1,expl:"Perceiving a smell means combustion has already begun, even without visible flame."},
    {q:"What is conduction in heat transfer?",opts:["Heat spreading without contact, at a distance","Heat traveling through a solid material","Hot air rising and moving","Direct contact between a flame and a material"],correct:1,expl:"Conduction carries heat through a solid material, like a bulkhead becoming hot."},
    {q:"Why is smoke considered the first danger of a fire?",opts:["It's just uncomfortable, no real danger","It contains toxic gases and causes visibility loss and disorientation within seconds, often killing before the flame does","It only affects the eyes","It always slows down the fire"],correct:1,expl:"Most fire-related deaths result from smoke inhalation or fatal disorientation, not direct burns."},
    {q:"A door might be warm. How do you check safely?",opts:["By opening it directly to look","Cautiously, with the back of the hand, never opening it","By placing your whole palm against the door","By waiting for a colleague to check instead"],correct:1,expl:"The back of the hand allows checking for heat without serious burn risk and without opening the door."},
    {q:"What is the very first stage of fire development?",opts:["Flashover","Ignition","Full development","Growth"],correct:1,expl:"Ignition is the initial stage, often silent and invisible, the best window to intervene."},
    {q:"What is a flashover?",opts:["A simple smoke spike with no danger","The critical threshold where an entire space ignites almost simultaneously, extremely dangerous","A stage with no practical importance","The moment the fire naturally goes out"],correct:1,expl:"Flashover is the threshold to avoid at all costs, often fatal for anyone remaining in the compartment."},
    {q:"Why act before flashover rather than after?",opts:["It makes no difference","After flashover, only fixed systems and trained teams can act effectively","Flashover makes extinguishing easier","Flashover only concerns electrical fires"],correct:1,expl:"Once flashover is reached, simple intervention is no longer possible, only heavy resources remain effective."},
    {q:"A crew member smells burning, checks an area, finds nothing. What should be done next?",opts:["Consider the alert closed since nothing was found","Widen the search and stay alert, never close an alert on an incomplete check","Wait to smell it a second time","Report only at the end of the watch"],correct:1,expl:"An incomplete check should never close an alert, as the Star Princess case illustrates."},
    {q:"In the Star Princess case, how long did the cigarette smolder before flames appeared?",opts:["A few seconds","About 20 minutes","Several hours","There was no delay"],correct:1,expl:"The discarded cigarette smoldered for about 20 minutes before flames appeared."},
    {q:"Why did the Star Princess fire spread so quickly once established?",opts:["Thanks to effective detection systems","Because of highly combustible balcony furniture and wind","Thanks to rapid crew intervention","It did not spread quickly"],correct:1,expl:"Combustible furniture and wind carried the fire to two upper decks in just six minutes."},
    {q:"What does 'Detect' mean in the MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover)?",opts:["Extinguishing the fire directly","Recognizing signs of fire before or as it appears, the focus of this lesson","Organizing emergency teams","Documenting the incident afterward"],correct:1,expl:"This lesson covers exclusively the Detect step of the MAP Fire Mindset."},
    {q:"Does this lesson cover fire classes and extinguisher types in detail?",opts:["Yes, in depth","No, this topic is already covered in detail in the Engine department, to avoid redundancy","Yes, but only for class A","No, this topic is not covered anywhere in MAP"],correct:1,expl:"The Safety module stays deliberately complementary, without repeating what's already taught elsewhere."},
    {q:"What is the only mention of the fire triangle in this lesson?",opts:["A full detailed chapter","A brief 2-3 minute reminder before moving to early recognition","It isn't mentioned at all","A whole lesson is dedicated to it"],correct:1,expl:"The fire triangle remains a brief introduction, not the core of this lesson."},
    {q:"What mistake most worsens a nascent fire situation?",opts:["Raising the alarm too early","Ignoring a faint sign thinking 'it's nothing'","Checking a warm bulkhead with the back of the hand","Reporting a burning smell"],correct:1,expl:"Minimizing a faint sign delays action exactly when it would be most effective."},
    {q:"Does this module teach a replacement for certified practical BST training?",opts:["Yes, it is equivalent to a full BST certification","No, it teaches recognition and decision principles, never a replacement for certified practical training","Yes, but only for officers","No, it is useless without equipment"],correct:1,expl:"MAP teaches recognition principles, never a replacement for practical BST training."},
  ],
  es:[
    {q:"¿Qué significa el principio 'If You Can Smell It, It Has Already Started'?",opts:["Hay que esperar a ver llamas antes de actuar","Un olor a quemado, aunque sea débil, significa que un proceso de combustión ya está en marcha","El olfato no es fiable para detectar un fuego","Este principio solo se aplica a fuegos eléctricos"],correct:1,expl:"Percibir un olor significa que la combustión ya ha comenzado, incluso sin llama visible."},
    {q:"¿Qué es la conducción en la transferencia de calor?",opts:["El calor que se propaga sin contacto, a distancia","El calor que viaja a través de un material sólido","El aire caliente que sube y se desplaza","El contacto directo entre una llama y un material"],correct:1,expl:"La conducción transporta el calor a través de un material sólido, como un mamparo que se calienta."},
    {q:"¿Por qué se considera el humo el primer peligro de un fuego?",opts:["Solo es incómodo, sin peligro real","Contiene gases tóxicos y provoca pérdida de visibilidad y desorientación en segundos, matando a menudo antes que la llama","Solo afecta a los ojos","Siempre ralentiza el fuego"],correct:1,expl:"La mayoría de las muertes relacionadas con el fuego resultan de la inhalación de humo o de una desorientación fatal, no de quemaduras directas."},
    {q:"Una puerta podría estar caliente. ¿Cómo la compruebas con seguridad?",opts:["Abriéndola directamente para mirar","Con precaución, con el dorso de la mano, sin abrirla nunca","Apoyando toda la palma contra la puerta","Esperando a que un compañero compruebe en tu lugar"],correct:1,expl:"El dorso de la mano permite comprobar el calor sin riesgo grave de quemadura y sin abrir la puerta."},
    {q:"¿Cuál es la primerísima etapa de desarrollo de un fuego?",opts:["El flashover","El nacimiento (ignición)","El desarrollo completo","El crecimiento"],correct:1,expl:"El nacimiento es la etapa inicial, a menudo silenciosa e invisible, la mejor ventana para intervenir."},
    {q:"¿Qué es un flashover?",opts:["Un simple pico de humo sin peligro","El umbral crítico donde todo un espacio se incendia casi simultáneamente, extremadamente peligroso","Una etapa sin importancia práctica","El momento en que el fuego se apaga naturalmente"],correct:1,expl:"El flashover es el umbral a evitar a toda costa, a menudo fatal para quien permanezca en el compartimento."},
    {q:"¿Por qué actuar antes del flashover en lugar de después?",opts:["No supone ninguna diferencia","Después del flashover, solo los sistemas fijos y los equipos formados pueden actuar eficazmente","El flashover facilita la extinción","El flashover solo concierne a los fuegos eléctricos"],correct:1,expl:"Una vez alcanzado el flashover, la intervención simple ya no es posible, solo quedan eficaces los medios pesados."},
    {q:"Un tripulante huele a quemado, comprueba una zona, no encuentra nada. ¿Qué hacer después?",opts:["Considerar la alerta cerrada ya que no se encontró nada","Ampliar la búsqueda y mantenerse vigilante, nunca cerrar una alerta con una comprobación incompleta","Esperar a olerlo una segunda vez","Informar solo al final del turno"],correct:1,expl:"Una comprobación incompleta nunca debe cerrar una alerta, como ilustra el caso del Star Princess."},
    {q:"En el caso del Star Princess, ¿cuánto tiempo ardió lentamente la colilla antes de que aparecieran llamas?",opts:["Unos segundos","Unos 20 minutos","Varias horas","No hubo demora"],correct:1,expl:"La colilla mal apagada ardió lentamente unos 20 minutos antes de que aparecieran llamas."},
    {q:"¿Por qué se propagó tan rápido el fuego del Star Princess una vez establecido?",opts:["Gracias a sistemas de detección eficaces","Por el mobiliario de balcón muy combustible y el viento","Gracias a la rápida intervención de la tripulación","No se propagó rápido"],correct:1,expl:"El mobiliario combustible y el viento llevaron el fuego a dos cubiertas superiores en solo seis minutos."},
    {q:"¿Qué significa 'Detect' en el MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover)?",opts:["Apagar el fuego directamente","Reconocer los signos de un fuego antes o al aparecer, el objeto de esta lección","Organizar los equipos de emergencia","Documentar el incidente después"],correct:1,expl:"Esta lección cubre exclusivamente la etapa Detect del MAP Fire Mindset."},
    {q:"¿Esta lección aborda en detalle las clases de fuego y los tipos de extintores?",opts:["Sí, en profundidad","No, este tema ya se cubre en detalle en el departamento Engine, para evitar redundancia","Sí, pero solo para la clase A","No, este tema no se trata en ninguna parte de MAP"],correct:1,expl:"El módulo Safety se mantiene deliberadamente complementario, sin repetir lo ya enseñado en otro lugar."},
    {q:"¿Cuál es la única mención del triángulo del fuego en esta lección?",opts:["Un capítulo completo y detallado","Un breve recordatorio de 2-3 minutos antes de pasar al reconocimiento precoz","No se menciona en absoluto","Se dedica una lección entera"],correct:1,expl:"El triángulo del fuego sigue siendo una introducción breve, no el núcleo de esta lección."},
    {q:"¿Qué error agrava más una situación de fuego naciente?",opts:["Dar la alarma demasiado pronto","Ignorar un signo débil pensando que 'no es nada'","Comprobar un mamparo caliente con el dorso de la mano","Informar de un olor a quemado"],correct:1,expl:"Minimizar un signo débil retrasa la acción justo cuando sería más eficaz."},
    {q:"¿Este módulo enseña un sustituto de una formación BST práctica certificada?",opts:["Sí, equivale a una certificación BST completa","No, enseña principios de reconocimiento y decisión, nunca un sustituto de una formación práctica certificada","Sí, pero solo para oficiales","No, no sirve de nada sin material"],correct:1,expl:"MAP enseña principios de reconocimiento, nunca un sustituto de la formación BST práctica."},
  ],
  pt:[
    {q:"O que significa o princípio 'If You Can Smell It, It Has Already Started'?",opts:["É preciso esperar por chamas antes de agir","Um cheiro a queimado, mesmo fraco, significa que um processo de combustão já está em curso","O olfato não é fiável para detetar um fogo","Este princípio só se aplica a incêndios elétricos"],correct:1,expl:"Perceber um cheiro significa que a combustão já começou, mesmo sem chama visível."},
    {q:"O que é a condução na transferência de calor?",opts:["O calor que se propaga sem contacto, à distância","O calor que viaja através de um material sólido","O ar quente que sobe e se desloca","O contacto direto entre uma chama e um material"],correct:1,expl:"A condução transporta o calor através de um material sólido, como um anteparo que fica quente."},
    {q:"Por que o fumo é considerado o primeiro perigo de um fogo?",opts:["É apenas desconfortável, sem perigo real","Contém gases tóxicos e provoca perda de visibilidade e desorientação em segundos, matando muitas vezes antes da chama","Só afeta os olhos","Sempre abranda o fogo"],correct:1,expl:"A maioria das mortes relacionadas com incêndios resulta da inalação de fumo ou de uma desorientação fatal, não de queimaduras diretas."},
    {q:"Uma porta pode estar quente. Como verificas com segurança?",opts:["Abrindo-a diretamente para olhar","Com cautela, com as costas da mão, sem nunca a abrir","Encostando a palma inteira contra a porta","Esperando que um colega verifique em teu lugar"],correct:1,expl:"As costas da mão permitem verificar o calor sem risco grave de queimadura e sem abrir a porta."},
    {q:"Qual é a primeiríssima fase de desenvolvimento de um fogo?",opts:["O flashover","O nascimento (ignição)","O desenvolvimento completo","O crescimento"],correct:1,expl:"O nascimento é a fase inicial, muitas vezes silenciosa e invisível, a melhor janela para intervir."},
    {q:"O que é um flashover?",opts:["Um simples pico de fumo sem perigo","O limiar crítico onde todo um espaço se incendeia quase simultaneamente, extremamente perigoso","Uma fase sem importância prática","O momento em que o fogo se apaga naturalmente"],correct:1,expl:"O flashover é o limiar a evitar a todo o custo, muitas vezes fatal para quem permanecer no compartimento."},
    {q:"Por que agir antes do flashover em vez de depois?",opts:["Não faz diferença nenhuma","Depois do flashover, só os sistemas fixos e as equipas formadas podem agir eficazmente","O flashover facilita a extinção","O flashover só diz respeito a incêndios elétricos"],correct:1,expl:"Uma vez atingido o flashover, a intervenção simples já não é possível, só os meios pesados continuam eficazes."},
    {q:"Um tripulante sente cheiro a queimado, verifica uma zona, não encontra nada. O que fazer a seguir?",opts:["Considerar o alerta encerrado já que nada foi encontrado","Alargar a busca e manter-se vigilante, nunca encerrar um alerta com uma verificação incompleta","Esperar sentir o cheiro uma segunda vez","Reportar só no final do turno"],correct:1,expl:"Uma verificação incompleta nunca deve encerrar um alerta, como ilustra o caso do Star Princess."},
    {q:"No caso do Star Princess, quanto tempo a beata ardeu lentamente antes de aparecerem chamas?",opts:["Alguns segundos","Cerca de 20 minutos","Várias horas","Não houve demora"],correct:1,expl:"A beata mal apagada ardeu lentamente cerca de 20 minutos antes de aparecerem chamas."},
    {q:"Por que o fogo do Star Princess se propagou tão depressa depois de estabelecido?",opts:["Graças a sistemas de deteção eficazes","Por causa do mobiliário de varanda muito combustível e do vento","Graças à rápida intervenção da tripulação","Não se propagou depressa"],correct:1,expl:"O mobiliário combustível e o vento levaram o fogo a dois conveses superiores em apenas seis minutos."},
    {q:"O que significa 'Detect' no MAP Fire Mindset (Detect → Alarm → Contain → Fight → Protect → Command → Recover)?",opts:["Apagar o fogo diretamente","Reconhecer sinais de um fogo antes ou ao aparecer, o foco desta lição","Organizar as equipas de emergência","Documentar o incidente depois"],correct:1,expl:"Esta lição cobre exclusivamente a etapa Detect do MAP Fire Mindset."},
    {q:"Esta lição aborda em detalhe as classes de fogo e os tipos de extintores?",opts:["Sim, em profundidade","Não, este tema já é coberto em detalhe no departamento Engine, para evitar redundância","Sim, mas só para a classe A","Não, este tema não é tratado em lado nenhum na MAP"],correct:1,expl:"O módulo Safety mantém-se deliberadamente complementar, sem repetir o que já é ensinado noutro lugar."},
    {q:"Qual é a única menção ao triângulo do fogo nesta lição?",opts:["Um capítulo completo e detalhado","Um breve lembrete de 2-3 minutos antes de passar ao reconhecimento precoce","Não é mencionado de todo","Uma lição inteira é dedicada a isso"],correct:1,expl:"O triângulo do fogo continua a ser uma introdução breve, não o cerne desta lição."},
    {q:"Que erro mais agrava uma situação de fogo nascente?",opts:["Dar o alarme cedo demais","Ignorar um sinal fraco pensando que 'não é nada'","Verificar um anteparo quente com as costas da mão","Reportar um cheiro a queimado"],correct:1,expl:"Minimizar um sinal fraco atrasa a ação exatamente quando seria mais eficaz."},
    {q:"Este módulo ensina um substituto de uma formação BST prática certificada?",opts:["Sim, equivale a uma certificação BST completa","Não, ensina princípios de reconhecimento e decisão, nunca um substituto de uma formação prática certificada","Sim, mas só para oficiais","Não, não serve de nada sem material"],correct:1,expl:"A MAP ensina princípios de reconhecimento, nunca um substituto da formação BST prática."},
  ],
};

// QUIZ - FINAL (5 QUESTIONS)
const QUIZ = {
  fr:[
    {q:"Que signifie 'If You Can Smell It, It Has Already Started' ?",opts:["Il faut voir les flammes avant d'agir","Une odeur de brûlé signifie que la combustion a déjà commencé","L'odorat n'est pas fiable","Ça ne concerne que l'électricité"],correct:1,expl:"Percevoir une odeur signifie que la combustion a déjà commencé."},
    {q:"Pourquoi la fumée est-elle le premier danger d'un feu ?",opts:["Elle est juste inconfortable","Elle provoque perte de visibilité et désorientation en secondes, tuant souvent avant la flamme","Elle ralentit toujours le feu","Elle n'a aucun impact"],correct:1,expl:"La majorité des décès liés au feu résultent de la fumée, pas des brûlures."},
    {q:"Une porte est peut-être chaude. Comment vérifier en sécurité ?",opts:["L'ouvrir directement","Avec le dos de la main, sans jamais l'ouvrir","Poser la paume dessus","Attendre un collègue"],correct:1,expl:"Le dos de la main permet une vérification sûre sans ouvrir la porte."},
    {q:"Qu'est-ce qu'un flashover ?",opts:["Un pic de fumée sans danger","Le seuil critique où tout s'embrase presque simultanément, à éviter à tout prix","Une étape sans importance","L'extinction naturelle du feu"],correct:1,expl:"Le flashover est le seuil que toute cette leçon vise à éviter."},
    {q:"Cette leçon couvre-t-elle en détail les classes de feu et extincteurs ?",opts:["Oui, en profondeur","Non, déjà couvert dans Engine pour éviter la redondance","Oui, uniquement classe A","Non, jamais traité dans MAP"],correct:1,expl:"Le module Safety reste complémentaire à Engine, sans répéter son contenu."},
  ],
  en:[
    {q:"What does 'If You Can Smell It, It Has Already Started' mean?",opts:["You must see flames before acting","A burning smell means combustion has already begun","Smell is not reliable","It only concerns electricity"],correct:1,expl:"Perceiving a smell means combustion has already begun."},
    {q:"Why is smoke the first danger of a fire?",opts:["It's just uncomfortable","It causes visibility loss and disorientation within seconds, often killing before the flame","It always slows the fire","It has no impact"],correct:1,expl:"Most fire-related deaths result from smoke, not burns."},
    {q:"A door might be warm. How do you check safely?",opts:["Open it directly","With the back of the hand, never opening it","Place your palm on it","Wait for a colleague"],correct:1,expl:"The back of the hand allows a safe check without opening the door."},
    {q:"What is a flashover?",opts:["A harmless smoke spike","The critical threshold where everything ignites almost simultaneously, to be avoided at all costs","A stage with no importance","The fire naturally going out"],correct:1,expl:"Flashover is the threshold this whole lesson aims to avoid."},
    {q:"Does this lesson cover fire classes and extinguishers in detail?",opts:["Yes, in depth","No, already covered in Engine to avoid redundancy","Yes, only class A","No, never covered in MAP"],correct:1,expl:"The Safety module stays complementary to Engine, without repeating its content."},
  ],
  es:[
    {q:"¿Qué significa 'If You Can Smell It, It Has Already Started'?",opts:["Hay que ver llamas antes de actuar","Un olor a quemado significa que la combustión ya ha comenzado","El olfato no es fiable","Solo concierne a la electricidad"],correct:1,expl:"Percibir un olor significa que la combustión ya ha comenzado."},
    {q:"¿Por qué el humo es el primer peligro de un fuego?",opts:["Solo es incómodo","Provoca pérdida de visibilidad y desorientación en segundos, matando a menudo antes que la llama","Siempre ralentiza el fuego","No tiene impacto"],correct:1,expl:"La mayoría de las muertes relacionadas con el fuego resultan del humo, no de las quemaduras."},
    {q:"Una puerta podría estar caliente. ¿Cómo comprobarlo con seguridad?",opts:["Abrirla directamente","Con el dorso de la mano, sin abrirla nunca","Apoyar la palma sobre ella","Esperar a un compañero"],correct:1,expl:"El dorso de la mano permite una comprobación segura sin abrir la puerta."},
    {q:"¿Qué es un flashover?",opts:["Un pico de humo inofensivo","El umbral crítico donde todo se incendia casi simultáneamente, a evitar a toda costa","Una etapa sin importancia","La extinción natural del fuego"],correct:1,expl:"El flashover es el umbral que toda esta lección busca evitar."},
    {q:"¿Esta lección cubre en detalle las clases de fuego y extintores?",opts:["Sí, en profundidad","No, ya cubierto en Engine para evitar redundancia","Sí, solo clase A","No, nunca tratado en MAP"],correct:1,expl:"El módulo Safety se mantiene complementario a Engine, sin repetir su contenido."},
  ],
  pt:[
    {q:"O que significa 'If You Can Smell It, It Has Already Started'?",opts:["É preciso ver chamas antes de agir","Um cheiro a queimado significa que a combustão já começou","O olfato não é fiável","Só diz respeito à eletricidade"],correct:1,expl:"Perceber um cheiro significa que a combustão já começou."},
    {q:"Por que o fumo é o primeiro perigo de um fogo?",opts:["É apenas desconfortável","Provoca perda de visibilidade e desorientação em segundos, matando muitas vezes antes da chama","Sempre abranda o fogo","Não tem impacto"],correct:1,expl:"A maioria das mortes relacionadas com incêndios resulta do fumo, não das queimaduras."},
    {q:"Uma porta pode estar quente. Como verificar com segurança?",opts:["Abri-la diretamente","Com as costas da mão, sem nunca a abrir","Encostar a palma sobre ela","Esperar por um colega"],correct:1,expl:"As costas da mão permitem uma verificação segura sem abrir a porta."},
    {q:"O que é um flashover?",opts:["Um pico de fumo inofensivo","O limiar crítico onde tudo se incendeia quase simultaneamente, a evitar a todo o custo","Uma fase sem importância","A extinção natural do fogo"],correct:1,expl:"O flashover é o limiar que toda esta lição visa evitar."},
    {q:"Esta lição cobre em detalhe as classes de fogo e extintores?",opts:["Sim, em profundidade","Não, já coberto em Engine para evitar redundância","Sim, só classe A","Não, nunca tratado na MAP"],correct:1,expl:"O módulo Safety mantém-se complementar ao Engine, sem repetir o seu conteúdo."},
  ],
};

// SAFETY REFLECTION
function SafetyReflection({ lang }) {
  const q = {
    fr:"As-tu deja senti une odeur suspecte a bord et hesite a la signaler, en pensant que ce n'etait probablement rien ?",
    en:"Have you ever smelled something suspicious on board and hesitated to report it, thinking it was probably nothing?",
    es:"¿Alguna vez has olido algo sospechoso a bordo y has dudado en informarlo, pensando que probablemente no era nada?",
    pt:"Ja alguma vez sentiste algo suspeito a bordo e hesitaste em reportar, pensando que provavelmente nao era nada?",
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
      badge:"🔥 Safety · Firefighting · Leçon 1/7 · ⭐ Premium",
      title:"Fire Behaviour & Early Fire Recognition",
      intro:"Cette leçon pose la première pierre du module Firefighting : le MAP Fire Mindset. Elle ne réenseigne pas les classes de feu ni les extincteurs, déjà couverts dans le département Engine. Elle se concentre sur ce qui compte le plus : reconnaître un feu avant les flammes.",
      p0:"IF YOU CAN SMELL IT, IT HAS ALREADY STARTED",s0t:"Le principe qui structure toute la leçon",
      s0:"La reconnaissance précoce précède toujours la réaction. Un feu ne commence jamais par des flammes visibles : il commence par une odeur, une chaleur, un bruit.\n\nCOMMENT LE RECONNAÎTRE ? Odeur inhabituelle, cloison ou porte chaude, crépitement, léger voile de fumée.\nQUE FAIRE IMMÉDIATEMENT ? Donner l'alerte dès le doute, ne jamais attendre une confirmation visuelle des flammes.\nQUELLE ERREUR L'AGGRAVE ? Ignorer un signe faible en pensant que 'ce n'est rien'.\nQUAND DEMANDER DE L'AIDE ? Dès le premier signe, jamais après confirmation des flammes.",
      p1:"RAPPEL BREF : LE TRIANGLE DU FEU",s1t:"Combustible + comburant + chaleur",
      s1:"Trois éléments réunis créent un feu. Retirer un seul côté suffit à l'éteindre. Ce module ne va pas plus loin sur ce sujet : pour les classes de feu, les agents extincteurs et le système fixe CO2, le département Engine couvre cela en profondeur.",
      p2:"MAP FIRE MINDSET",s2t:"L'identité du module Firefighting",
      s2:"Detect → Alarm → Contain → Fight → Protect → Command → Recover. Cette leçon couvre exclusivement la première étape : Detect. Les leçons suivantes développeront chacune des étapes suivantes.",
      p3:"COMMENT LA CHALEUR SE PROPAGE",s3t:"Conduction, convection, rayonnement, contact direct",
      s3:"Comprendre comment la chaleur voyage aide à anticiper où un feu isolé peut se propager avant même que ce soit visible.",
      p4:"LA FUMÉE, PREMIER DANGER",s4t:"Elle tue avant la flamme",
      s4:"Gaz toxiques, perte de visibilité et désorientation en quelques secondes, réduction de l'oxygène : la majorité des décès liés au feu résultent de la fumée, pas des brûlures.",
      p5:"SIGNES AVANT LES FLAMMES",s5t:"Ce qu'il faut repérer, en sécurité",
      s5:"Odeur, chaleur vérifiée avec prudence au dos de la main sans jamais ouvrir la porte, crépitement, léger voile : un seul signe suffit pour donner l'alerte, sans attendre confirmation.",
      p6:"LES ÉTAPES DE CROISSANCE D'UN FEU",s6t:"Agir avant le flashover",
      s6:"Naissance, croissance, flashover (le seuil critique à éviter), développement complet : plus on intervient tôt, plus les moyens simples suffisent.",
      p7:"🎯 EXERCICE OPÉRATIONNEL",p8:"⚠️ CAS D'ÉTUDE",p9:"📝 BANQUE DE 15 QUESTIONS",p10:"🪞 RÉFLEXION DE SÉCURITÉ",
      sumT:"RÉSUMÉ - LEÇON 1",
      sumP:["If You Can Smell It, It Has Already Started : la reconnaissance précoce prime sur la confirmation visuelle","Triangle du feu : rappel bref, approfondi dans le département Engine","MAP Fire Mindset : Detect → Alarm → Contain → Fight → Protect → Command → Recover, cette leçon couvre Detect","La fumée tue avant la flamme : gaz toxiques, perte de visibilité et désorientation, réduction d'oxygène","Vérifier une porte chaude toujours avec le dos de la main, sans jamais l'ouvrir, et agir avant le flashover"],
      learnedP:["Les modes de propagation de la chaleur","Pourquoi la fumée est le premier danger","Les signes avant les flammes, vérifiés en sécurité","Les 4 étapes de croissance d'un feu, dont le flashover à éviter","Le MAP Fire Mindset et sa première étape, Detect"],
      safetyMsg:"A fire is easiest to stop in the minute before anyone can see it. That minute belongs to whoever pays attention.",
    },
    en:{
      badge:"🔥 Safety · Firefighting · Lesson 1/7 · ⭐ Premium",
      title:"Fire Behaviour & Early Fire Recognition",
      intro:"This lesson lays the first stone of the Firefighting module: the MAP Fire Mindset. It does not re-teach fire classes or extinguishers, already covered in the Engine department. It focuses on what matters most: recognizing a fire before flames.",
      p0:"IF YOU CAN SMELL IT, IT HAS ALREADY STARTED",s0t:"The principle that structures the whole lesson",
      s0:"Early recognition always precedes reaction. A fire never begins with visible flames: it begins with a smell, a heat, a sound.\n\nHOW DO I RECOGNIZE IT? Unusual smell, warm bulkhead or door, crackling sound, faint smoke haze.\nWHAT DO I DO IMMEDIATELY? Raise the alarm at the slightest doubt, never wait for visual confirmation of flames.\nWHAT MISTAKE MAKES IT WORSE? Ignoring a faint sign thinking 'it's nothing'.\nWHEN MUST I ASK FOR HELP? At the first sign, never after flames are confirmed.",
      p1:"BRIEF REMINDER: THE FIRE TRIANGLE",s1t:"Fuel + oxidizer + heat",
      s1:"Three elements combined create fire. Removing just one side is enough to extinguish it. This module goes no further on this topic: for fire classes, extinguishing agents, and the fixed CO2 system, the Engine department covers this in depth.",
      p2:"MAP FIRE MINDSET",s2t:"The Firefighting module's identity",
      s2:"Detect → Alarm → Contain → Fight → Protect → Command → Recover. This lesson covers exclusively the first step: Detect. The following lessons will develop each subsequent step.",
      p3:"HOW HEAT SPREADS",s3t:"Conduction, convection, radiation, direct contact",
      s3:"Understanding how heat travels helps anticipate where an isolated fire may spread before it's even visible.",
      p4:"SMOKE, THE FIRST DANGER",s4t:"It kills before the flame",
      s4:"Toxic gases, visibility loss and disorientation within seconds, reduced oxygen: most fire-related deaths result from smoke, not burns.",
      p5:"SIGNS BEFORE FLAMES",s5t:"What to watch for, safely",
      s5:"Smell, warmth checked cautiously with the back of the hand without ever opening the door, crackling, faint haze: a single sign is enough to raise the alarm, without waiting for confirmation.",
      p6:"THE STAGES OF FIRE GROWTH",s6t:"Act before flashover",
      s6:"Ignition, growth, flashover (the critical threshold to avoid), full development: the earlier the intervention, the simpler the means needed.",
      p7:"🎯 OPERATIONAL EXERCISE",p8:"⚠️ CASE STUDY",p9:"📝 15-QUESTION BANK",p10:"🪞 SAFETY REFLECTION",
      sumT:"SUMMARY - LESSON 1",
      sumP:["If You Can Smell It, It Has Already Started: early recognition takes priority over visual confirmation","Fire triangle: a brief reminder, developed in the Engine department","MAP Fire Mindset: Detect → Alarm → Contain → Fight → Protect → Command → Recover, this lesson covers Detect","Smoke kills before flame: toxic gases, visibility loss and disorientation, reduced oxygen","Always check a warm door with the back of the hand, never opening it, and act before flashover"],
      learnedP:["How heat spreads","Why smoke is the first danger","Signs before flames, checked safely","The 4 stages of fire growth, including flashover to avoid","The MAP Fire Mindset and its first step, Detect"],
      safetyMsg:"A fire is easiest to stop in the minute before anyone can see it. That minute belongs to whoever pays attention.",
    },
    es:{
      badge:"🔥 Safety · Firefighting · Lección 1/7 · ⭐ Premium",
      title:"Fire Behaviour & Early Fire Recognition",
      intro:"Esta lección coloca la primera piedra del módulo Firefighting: el MAP Fire Mindset. No vuelve a enseñar las clases de fuego ni los extintores, ya cubiertos en el departamento Engine. Se centra en lo que más importa: reconocer un fuego antes de las llamas.",
      p0:"IF YOU CAN SMELL IT, IT HAS ALREADY STARTED",s0t:"El principio que estructura toda la lección",
      s0:"El reconocimiento precoz siempre precede a la reacción. Un fuego nunca empieza con llamas visibles: empieza con un olor, un calor, un sonido.\n\n¿CÓMO RECONOCERLO? Olor inusual, mamparo o puerta caliente, crepitación, ligero velo de humo.\n¿QUÉ HACER DE INMEDIATO? Dar la alarma ante la menor duda, nunca esperar confirmación visual de las llamas.\n¿QUÉ ERROR LO AGRAVA? Ignorar un signo débil pensando que 'no es nada'.\n¿CUÁNDO PEDIR AYUDA? Ante el primer signo, nunca después de confirmar las llamas.",
      p1:"RECORDATORIO BREVE: EL TRIÁNGULO DEL FUEGO",s1t:"Combustible + comburente + calor",
      s1:"Tres elementos combinados crean fuego. Retirar un solo lado basta para apagarlo. Este módulo no profundiza más en este tema: para las clases de fuego, los agentes extintores y el sistema fijo de CO2, el departamento Engine lo cubre en profundidad.",
      p2:"MAP FIRE MINDSET",s2t:"La identidad del módulo Firefighting",
      s2:"Detect → Alarm → Contain → Fight → Protect → Command → Recover. Esta lección cubre exclusivamente el primer paso: Detect. Las siguientes lecciones desarrollarán cada uno de los pasos siguientes.",
      p3:"CÓMO SE PROPAGA EL CALOR",s3t:"Conducción, convección, radiación, contacto directo",
      s3:"Entender cómo viaja el calor ayuda a anticipar dónde puede propagarse un fuego aislado incluso antes de que sea visible.",
      p4:"EL HUMO, EL PRIMER PELIGRO",s4t:"Mata antes que la llama",
      s4:"Gases tóxicos, pérdida de visibilidad y desorientación en segundos, reducción de oxígeno: la mayoría de las muertes relacionadas con el fuego resultan del humo, no de las quemaduras.",
      p5:"SIGNOS ANTES DE LAS LLAMAS",s5t:"Qué hay que vigilar, con seguridad",
      s5:"Olor, calor comprobado con precaución con el dorso de la mano sin abrir nunca la puerta, crepitación, ligero velo: un solo signo basta para dar la alarma, sin esperar confirmación.",
      p6:"LAS ETAPAS DEL CRECIMIENTO DE UN FUEGO",s6t:"Actuar antes del flashover",
      s6:"Nacimiento, crecimiento, flashover (el umbral crítico a evitar), desarrollo completo: cuanto antes la intervención, más simples los medios necesarios.",
      p7:"🎯 EJERCICIO OPERATIVO",p8:"⚠️ CASO DE ESTUDIO",p9:"📝 BANCO DE 15 PREGUNTAS",p10:"🪞 REFLEXIÓN DE SEGURIDAD",
      sumT:"RESUMEN - LECCIÓN 1",
      sumP:["If You Can Smell It, It Has Already Started: el reconocimiento precoz prima sobre la confirmación visual","Triángulo del fuego: un breve recordatorio, desarrollado en el departamento Engine","MAP Fire Mindset: Detect → Alarm → Contain → Fight → Protect → Command → Recover, esta lección cubre Detect","El humo mata antes que la llama: gases tóxicos, pérdida de visibilidad y desorientación, reducción de oxígeno","Comprobar siempre una puerta caliente con el dorso de la mano, sin abrirla nunca, y actuar antes del flashover"],
      learnedP:["Cómo se propaga el calor","Por qué el humo es el primer peligro","Signos antes de las llamas, comprobados con seguridad","Las 4 etapas del crecimiento de un fuego, incluido el flashover a evitar","El MAP Fire Mindset y su primera etapa, Detect"],
      safetyMsg:"A fire is easiest to stop in the minute before anyone can see it. That minute belongs to whoever pays attention.",
    },
    pt:{
      badge:"🔥 Safety · Firefighting · Lição 1/7 · ⭐ Premium",
      title:"Fire Behaviour & Early Fire Recognition",
      intro:"Esta lição lança a primeira pedra do módulo Firefighting: o MAP Fire Mindset. Não volta a ensinar as classes de fogo nem os extintores, já cobertos no departamento Engine. Concentra-se no que mais importa: reconhecer um fogo antes das chamas.",
      p0:"IF YOU CAN SMELL IT, IT HAS ALREADY STARTED",s0t:"O princípio que estrutura toda a lição",
      s0:"O reconhecimento precoce precede sempre a reação. Um fogo nunca começa com chamas visíveis: começa com um cheiro, um calor, um som.\n\nCOMO RECONHECER? Cheiro invulgar, anteparo ou porta quente, crepitação, leve véu de fumo.\nO QUE FAZER IMEDIATAMENTE? Dar o alarme perante a mínima dúvida, nunca esperar confirmação visual das chamas.\nQUE ERRO O AGRAVA? Ignorar um sinal fraco pensando que 'não é nada'.\nQUANDO PEDIR AJUDA? Ao primeiro sinal, nunca depois de confirmadas as chamas.",
      p1:"LEMBRETE BREVE: O TRIÂNGULO DO FOGO",s1t:"Combustível + comburente + calor",
      s1:"Três elementos combinados criam fogo. Retirar apenas um lado basta para o apagar. Este módulo não aprofunda mais este tema: para as classes de fogo, os agentes extintores e o sistema fixo de CO2, o departamento Engine cobre isso em profundidade.",
      p2:"MAP FIRE MINDSET",s2t:"A identidade do módulo Firefighting",
      s2:"Detect → Alarm → Contain → Fight → Protect → Command → Recover. Esta lição cobre exclusivamente o primeiro passo: Detect. As lições seguintes desenvolverão cada um dos passos seguintes.",
      p3:"COMO O CALOR SE PROPAGA",s3t:"Condução, convecção, radiação, contacto direto",
      s3:"Compreender como o calor viaja ajuda a antecipar onde um fogo isolado pode propagar-se mesmo antes de ser visível.",
      p4:"O FUMO, O PRIMEIRO PERIGO",s4t:"Mata antes da chama",
      s4:"Gases tóxicos, perda de visibilidade e desorientação em segundos, redução de oxigénio: a maioria das mortes relacionadas com incêndios resulta do fumo, não das queimaduras.",
      p5:"SINAIS ANTES DAS CHAMAS",s5t:"O que é preciso vigiar, com segurança",
      s5:"Cheiro, calor verificado com cautela com as costas da mão sem nunca abrir a porta, crepitação, leve véu: um único sinal basta para dar o alarme, sem esperar confirmação.",
      p6:"AS FASES DO CRESCIMENTO DE UM FOGO",s6t:"Agir antes do flashover",
      s6:"Nascimento, crescimento, flashover (o limiar crítico a evitar), desenvolvimento completo: quanto mais cedo a intervenção, mais simples os meios necessários.",
      p7:"🎯 EXERCÍCIO OPERACIONAL",p8:"⚠️ CASO DE ESTUDO",p9:"📝 BANCO DE 15 PERGUNTAS",p10:"🪞 REFLEXÃO DE SEGURANÇA",
      sumT:"RESUMO - LIÇÃO 1",
      sumP:["If You Can Smell It, It Has Already Started: o reconhecimento precoce tem prioridade sobre a confirmação visual","Triângulo do fogo: um breve lembrete, desenvolvido no departamento Engine","MAP Fire Mindset: Detect → Alarm → Contain → Fight → Protect → Command → Recover, esta lição cobre Detect","O fumo mata antes da chama: gases tóxicos, perda de visibilidade e desorientação, redução de oxigénio","Verificar sempre uma porta quente com as costas da mão, sem nunca a abrir, e agir antes do flashover"],
      learnedP:["Como o calor se propaga","Por que o fumo é o primeiro perigo","Sinais antes das chamas, verificados com segurança","As 4 fases do crescimento de um fogo, incluindo o flashover a evitar","O MAP Fire Mindset e a sua primeira etapa, Detect"],
      safetyMsg:"A fire is easiest to stop in the minute before anyone can see it. That minute belongs to whoever pays attention.",
    },
  };
  return d[lang]||d.fr;
};

// MAIN
export default function LessonSafetyS4_L1({ lang="fr", onBack=()=>{}, onComplete=()=>{}, onNext=()=>{} }) {
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
            <div style={{fontSize:11,color:C.muted}}>{lang==="fr"?"Leçon 1/7":lang==="en"?"Lesson 1/7":lang==="es"?"Lección 1/7":"Lição 1/7"}</div>
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

            <SL icon="👃" text={lc.p0}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>👃</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s0t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s0}</div></Card>

            <SL icon="🔺" text={lc.p1} color={C.gold2}/>
            <Card style={{marginBottom:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🔺</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s1t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s1}</div></Card>

            <SL icon="🧭" text={lc.p2} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🧭</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s2t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s2}</div></Card>

            <SL icon="🌡️" text={lc.p3} color={C.orange}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>🌡️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s3t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s3}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.orange,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>🌡️ {lang==="fr"?"PROPAGATION DE LA CHALEUR - INTERACTIF":lang==="en"?"HEAT TRANSFER - INTERACTIVE":lang==="es"?"TRANSFERENCIA DE CALOR - INTERACTIVO":"TRANSFERÊNCIA DE CALOR - INTERATIVO"}</div><HeatTransferSVG lang={lang}/></Card>

            <SL icon="💨" text={lc.p4} color={C.purple}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>💨</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s4t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s4}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.purple,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>💨 {lang==="fr"?"DANGER DE LA FUMÉE - INTERACTIF":lang==="en"?"SMOKE DANGER - INTERACTIVE":lang==="es"?"PELIGRO DEL HUMO - INTERACTIVO":"PERIGO DO FUMO - INTERATIVO"}</div><SmokeDangerSVG lang={lang}/></Card>

            <SL icon="⚠️" text={lc.p5} color={C.red}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>⚠️</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s5t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s5}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.red,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>⚠️ {lang==="fr"?"SIGNES PRÉCOCES - INTERACTIF":lang==="en"?"EARLY SIGNS - INTERACTIVE":lang==="es"?"SIGNOS PRECOCES - INTERACTIVO":"SINAIS PRECOCES - INTERATIVO"}</div><EarlyWarningSignsSVG lang={lang}/></Card>

            <SL icon="📈" text={lc.p6} color={C.blue2}/>
            <Card style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:22}}>📈</span><span style={{fontSize:14,fontWeight:700,color:C.white}}>{lc.s6t}</span></div><div style={{fontSize:13,color:"rgba(240,244,255,0.82)",lineHeight:1.85,whiteSpace:"pre-line"}}>{lc.s6}</div></Card>
            <Card style={{marginBottom:14}}><div style={{fontSize:11,color:C.blue2,letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:12}}>📈 {lang==="fr"?"CROISSANCE DU FEU - INTERACTIF":lang==="en"?"FIRE GROWTH - INTERACTIVE":lang==="es"?"CRECIMIENTO DEL FUEGO - INTERACTIVO":"CRESCIMENTO DO FOGO - INTERATIVO"}</div><FireGrowthStagesSVG lang={lang}/></Card>

            <SL icon="🎯" text={lc.p7} color={C.gold}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.gold}44`,background:"linear-gradient(135deg,rgba(201,146,42,0.08),rgba(13,31,60,0.8))"}}><Exercise1 lang={lang} t={t}/></Card>

            <SL icon="⚠️" text={lc.p8} color={C.red}/>
            <div style={{marginBottom:14}}><AccidentCase lang={lang}/></div>

            <SL icon="📝" text={lc.p9} color={C.purple}/>
            <Card style={{marginBottom:14,border:`1px solid ${C.purple}44`,background:"linear-gradient(135deg,rgba(142,68,173,0.08),rgba(13,31,60,0.8))"}}><QuestionBank lang={lang} t={t} questions={bank}/></Card>

            <SL icon="🪞" text={lc.p10} color={C.purple}/>
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
                {lang==="fr"?"Quiz Final - Reconnaissance Précoce":lang==="en"?"Final Quiz - Early Recognition":lang==="es"?"Quiz Final - Reconocimiento Precoz":"Quiz Final - Reconhecimento Precoce"}
              </div>
              <div style={{fontSize:12,color:C.muted}}>5 {lang==="fr"?"questions · Leçon 1/7":"questions · Lesson 1/7"}</div>
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
              {lang==="fr"?"LEÇON 2 - CLASSES & STRATÉGIE D'EXTINCTION →":lang==="en"?"LESSON 2 - CLASSIFICATION & STRATEGY →":lang==="es"?"LECCIÓN 2 - CLASIFICACIÓN Y ESTRATEGIA →":"LIÇÃO 2 - CLASSIFICAÇÃO E ESTRATÉGIA →"}
            </button>
            <button onClick={onBack} style={{width:"100%",padding:"12px 0",border:`1px solid rgba(255,255,255,0.15)`,borderRadius:14,background:"transparent",fontSize:13,fontWeight:600,color:C.muted,cursor:"pointer"}}>{t.backDash}</button>
          </div>}

        </div>
      </div>
    </div>
  );
}
